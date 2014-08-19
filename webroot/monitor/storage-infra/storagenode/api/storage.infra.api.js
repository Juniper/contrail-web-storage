/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */
var storageApi= require('../../../../common/api/storage.api.constants');
var 
    commonUtils = require(process.mainModule.exports["corePath"]  +
                    '/src/serverroot/utils/common.utils'),
    storageRest= require('../../../../common/api/storage.rest.api'),
    global = require(process.mainModule.exports["corePath"] + '/src/serverroot/common/global'),
    config = require(process.mainModule.exports["corePath"] + '/config/config.global.js'),
    async = require('async'),
    jsonPath = require('JSONPath').eval,
    osdApi= require('../../../tenant-storage/api/storage.osd.api'),
    monsApi= require('../../../tenant-storage/api/storage.mons.api'),
    storageInfraApi = module.exports;

var  expireTime= storageApi.expireTimeSecs;

var redis = require("redis"),
    redisServerPort = (config.redis_server_port) ? config.redis_server_port : global.DFLT_REDIS_SERVER_PORT,
    redisServerIP = (config.redis_server_ip) ? config.redis_server_ip : global.DFLT_REDIS_SERVER_IP,
    redisClient = redis.createClient(redisServerPort, redisServerIP);

function getTopologyURLs(appData){
    var dataObjArr = [];
    urlOSDsFromPG = storageApi.url.pgDumpOSDs;
    commonUtils.createReqObj(dataObjArr, urlOSDsFromPG, null, null, 
                                         null, null, appData);
    urlOSDTree = storageApi.url.osdTree;
    commonUtils.createReqObj(dataObjArr, urlOSDTree, null, null, 
                                         null, null, appData);
    urlOSDDump = storageApi.url.osdDump;
    commonUtils.createReqObj(dataObjArr, urlOSDDump, null, null, 
                                         null, null, appData);
    urlStatus = storageApi.url.status;
    commonUtils.createReqObj(dataObjArr, urlStatus, null, null,
        null, null, appData);

    return dataObjArr;
}
function processStorageTopologyRawList(res, appData, callback){
    var urlOSDList = "/cluster/topology/ceph/list";
    dataObjArr = getTopologyURLs(appData);
    redisClient.get(urlOSDList, function(error, cachedJSONStr) {
        if (error || cachedJSONStr == null) {
            async.map(dataObjArr,
                commonUtils.getAPIServerResponse(storageRest.apiGet, true),
                function(err, resultJSON) {
                    redisClient.setex(urlOSDList, expireTime, JSON.stringify(resultJSON));
                    callback(err,res,resultJSON);
                });
        } else {
            callback(null, res, JSON.parse(cachedJSONStr));
        }
    });
}
function getStorageTopology(req, res, appData){
    processStorageTopologyRawList(res, appData, function(error,res,data){
        parseStorageTopologyTree(data, function(resultJSON){
            commonUtils.handleJSONResponse(error, res, resultJSON);
        });
    });
}

function parseStorageTopologyTree(osdJSON, callback){
    var osdList={};
    var osdPG= osdJSON[0];
    var osdTree= osdJSON[1];
    var osdDump= osdJSON[2];
    var status= osdJSON[3];

    var rootMap = jsonPath(osdTree, "$..nodes[?(@.type=='root')]");
    var hostMap = jsonPath(osdTree, "$..nodes[?(@.type=='host')]");
    var osds = jsonPath(osdTree, "$..nodes[?(@.type=='osd')]");
    var monsJSON = jsonPath(monsApi.consolidateMonitors(status), "$..monitors")[0];
    if (osds.length > 0) {
        var osdName='undefined';
        for(i=0; i < osds.length;i++){
            if(osds[i].status == "up"){
                osdName= osds[i].name;
                break;
            }
        }
        osdApi.parseOSDVersion(osdName, function(version) {
            osdApi.parseOSDFromPG(osds, osdPG);
            osdApi.parseOSDFromDump(osds, osdDump);
            hostMap = parseMonitorWithHost(monsJSON, hostMap);
            hostMap = osdApi.parseHostFromOSD(hostMap, osds, version, true);
            osdList.topology = parseRootFromHost(rootMap, hostMap);
            callback(osdList);
        });
    }
}

function parseMonitorWithHost(monsJSON, hostJSON){
     var hstCnt= hostJSON.length;
    for(i=0;i< hstCnt;i++){       
        var hostName= hostJSON[i].name;
        var monCnt = monsJSON.length;
        hostJSON[i].monitor = "Not Available";
        hostJSON[i].kb_total= "Not Available";
        hostJSON[i].kb_used = "Not Available";
        hostJSON[i].avail_percent= "Not Available";
        hostJSON[i].kb_avail= "Not Available";
       for(j=0;j< monCnt; j++){
            var monName= monsJSON[j].name;
            if(hostName == monName){
                hostJSON[i].kb_total= monsJSON[j].kb_total;
                hostJSON[i].kb_used = monsJSON[j].kb_used;
                hostJSON[i].avail_percent= monsJSON[j].avail_percent;
                hostJSON[i].kb_avail= monsJSON[j].kb_avail;
                hostJSON[i].monitor = monsJSON[j];
            }
            
        }
    }
   return hostJSON;
}

function getStorageTopologyDetails(req, res, appData){
    var hostName = req.param('hostname');
    processStorageTopologyRawList(res, appData, function(error,res,data){
        parseStorageTopologyDetails(hostName, data, function(resultJSON){
            commonUtils.handleJSONResponse(error, res, resultJSON);
        });
    });
}

function parseStorageTopologyDetails(name, resultJSON, callback){

    parseStorageTopologyTree(resultJSON, function(resultJSON){
        var hDetails = jsonPath(resultJSON, "$..hosts[?(@.name=='"+name+"')]")[0];
        var hJSON = {};
        hJSON['host_details'] = hDetails;
        callback(hJSON);
    });
}

function parseRootFromHost(rootJSON, hostJSON){
   var rootCnt = rootJSON.length;
   for(q=0;q<rootCnt; q++) {
       var total_up_node =0;
       var total_down_node =0;
       var chldCnt = rootJSON[q].children.length;
       for (i = 0; i < chldCnt; i++) {
           var chldId = rootJSON[q].children[i];
           var hostCnt = hostJSON.length;
           for (j = 0; j < hostCnt; j++) {
               var hostId = hostJSON[j].id;
               if (chldId == hostId) {
                   rootJSON[q].children[i] = hostJSON[j];
                   var osdStatusJSON = jsonPath(hostJSON[j], "$.osds[*].status");
                   var osdCnt = osdStatusJSON.length
                   var hostStatus = "up";

                   for (k = 0; k < osdCnt; k++) {
                       var osdStatus = osdStatusJSON[k];
                       if (osdStatus == "down") {
                           hostStatus = "down";
                       }
                   }
                   hostJSON[j].status = hostStatus;
                   if (hostStatus == "up") {
                       total_up_node = total_up_node + 1;
                   } else {
                       total_down_node = total_down_node + 1;
                   }
               }
           }
           rootJSON[q].total_node = chldCnt;
           rootJSON[q].total_up_node = total_up_node;
           rootJSON[q].total_down_node = total_down_node;
       }
   }
    var jsonstr = JSON.stringify(rootJSON);
    var new_jsonstr = jsonstr.replace(/children/g, "hosts");
    rootJSON = JSON.parse(new_jsonstr);
    return rootJSON;
}

/* List all public functions */
exports.getStorageTopology = getStorageTopology;
exports.getStorageTopologyDetails= getStorageTopologyDetails;




