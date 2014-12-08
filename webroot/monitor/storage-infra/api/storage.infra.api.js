/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */
var storageApi= require('../../../common/api/storage.api.constants');
var storageGlobal = require('../../../common/config/storage.global');
var cacheApi = require(process.mainModule.exports["corePath"] +
    '/src/serverroot/web/core/cache.api'),
    commonUtils = require(process.mainModule.exports["corePath"]  +
                    '/src/serverroot/utils/common.utils'),
    storageRest= require('../../../common/api/storage.rest.api'),
    global = require(process.mainModule.exports["corePath"] + '/src/serverroot/common/global'),
    config = require(process.mainModule.exports["corePath"] + '/config/config.global.js'),
    async = require('async'),
    jsonPath = require('JSONPath').eval,
    osdApi= require('../../tenant-storage/api/storage.osd.api'),
    monsApi= require('../../tenant-storage/api/storage.mons.api'),
    dashApi= require('../../tenant-storage/api/storage.dashboard.api'),
    storageInfraApi = module.exports;

var  expireTime= storageApi.expireTimeSecs;

var redis = require("redis"),
    redisServerPort = (config.redis_server_port) ? config.redis_server_port : global.DFLT_REDIS_SERVER_PORT,
    redisServerIP = (config.redis_server_ip) ? config.redis_server_ip : global.DFLT_REDIS_SERVER_IP,
    redisClient = redis.createClient(redisServerPort, redisServerIP);


function getStorageSummary (req, res, appData)
{
    var url = '/storage-topology-summary';
    var forceRefresh = req.param('forceRefresh');
    var key = storageGlobal.STR_GET_STORAGE_SUMMARY;
    var jobRunCount=1;
    var firstRunDelay= 0;
    var nextRunDelay=storageGlobal.STORAGE_SUMM_JOB_REFRESH_TIME;

    if (null == forceRefresh) {
        forceRefresh = false;
    } else {
        forceRefresh = true;
    }
    cacheApi.queueDataFromCacheOrSendRequest(req, res,
        storageGlobal.STR_JOB_TYPE_CACHE, key,
        url, 0, jobRunCount, firstRunDelay, nextRunDelay,
        forceRefresh, null);
}

function getStorageTopologyDetails(req, res, appData){

    var reqUrl = "/storage-topology-summary";

    var reqObj = {}
    reqObj['req'] = req;
    reqObj['res'] = res;
    reqObj['jobType'] = storageGlobal.STR_JOB_TYPE_CACHE;;
    reqObj['jobName'] = storageGlobal.STR_GET_STORAGE_SUMMARY;
    reqObj['reqUrl'] = reqUrl;
    reqObj['jobRunCount'] = 1;
    reqObj['firstRunDelay'] = 0;
    reqObj['nextRunDelay'] = storageGlobal.STORAGE_SUMM_JOB_REFRESH_TIME;
    reqObj['sendToJobServerAlways'] = false;
    reqObj['appData'] = null;
    reqObj['postCallback'] = parseStorageTopologyDetails;

    cacheApi.queueDataFromCacheOrSendRequestByReqObj(reqObj)
}

function parseStorageTopologyDetails(req, res, resultJSON){
    var hostName = req.param('hostname');
    var hDetails = jsonPath(resultJSON, "$..hosts[?(@.name=='"+hostName+"')]")[0];
    var hJSON = {};
    hJSON['host_details'] = hDetails;
    commonUtils.handleJSONResponse(null, res, hJSON);
}

function parseStorageTopologyTree(osdJSON, callback){
    var osdList={};
    var osdPG= osdJSON[0];
    var osdTree= osdJSON[1];
    var osdDump= osdJSON[2];
    var status= osdJSON[3];

    //var rootMap = jsonPath(osdTree, "$..nodes[?(@.name=='default')]");
    var rootMap = jsonPath(osdTree, "$..nodes[?(@.type=='root')]");
    var hostMap = jsonPath(osdTree, "$..nodes[?(@.type=='host')]");
    var tOSDs = jsonPath(osdTree, "$..nodes[?(@.type=='osd')]");
    var osds = jsonPath(osdDump, "$..osds");
    var monsJSON = jsonPath(monsApi.consolidateMonitors(status), "$..monitors")[0];
    var mons_total = jsonPath(status, "$..monmap.mons.length")[0];
    var mons_active = jsonPath(status, "$..health.health_services..mons.length")[0];

    if (osds != undefined && osds.length > 0) {
        var osdName='undefined';
        for(i=0; i < tOSDs.length;i++){
            if(tOSDs[i].status == "up"){
                osdName= tOSDs[i].name;
                break;
            }
        }
        osdApi.parseOSDVersion(osdName, function(version) {
            osds=osdApi.parseOSDFromTree(osdDump,tOSDs);
            /*
               Add a ceph_crush_name deafult values as 'default' all osd's
            */
            for(i=0; i < osds.length;i++){
                  osds[i]['ceph_crush_name']= "default";
            }
            osdApi.parseOSDFromPG(osds, osdPG);
            hostMap = parseMonitorWithHost(monsJSON, hostMap);
            osdApi.getAvgBWHostToOSD(osds,hostMap, function(osds){
                hostMap = osdApi.parseHostFromOSD(hostMap, osds, version, true);
                var treeList ={};
                treeList= parseRootFromHost(rootMap, hostMap);
                var defaultList = jsonPath(treeList, "$..[?(@.name=='default')]")[0];
                /*
                   Get all the ssd-root osds from tree and compare with default-tree osds,
                   replace the ceph_crush_name to 'ssd'
                */
                var ssdList = jsonPath(treeList, "$..[?(@.name=='ssd')]")[0];
                var ssdOsdList= jsonPath(treeList, "$..[?(@.name=='ssd')]..osds[*].name");
                if(ssdOsdList != undefined && ssdOsdList.length > 0){
                  for(i=0;i< ssdOsdList.length;i++){
                    var osdName= ssdOsdList[i];
                    for(j=0;j< defaultList.hosts.length; j++){
                        for(k=0;k< defaultList.hosts[j].osds.length; k++){
                            if(osdName == defaultList.hosts[j].osds[k].name){
                              defaultList.hosts[j].osds[k]['ceph_crush_name']="ssd";
                            }
                        }
                    }
                  }
                }
                /*
                   Get all the hdd-root osds from tree and compare with default-tree osds,
                   replace the ceph_crush_name to 'hdd'
                */
                var hddList = jsonPath(treeList, "$..[?(@.name=='hdd')]")[0];
                var hddOsdList= jsonPath(treeList, "$..[?(@.name=='hdd')]..osds[*].name");
                if(hddOsdList != undefined && hddOsdList.length > 0){
                  for(i=0;i< hddOsdList.length;i++){
                  var osdName= hddOsdList[i];
                    for(j=0;j< defaultList.hosts.length; j++){
                      for(k=0;k< defaultList.hosts[j].osds.length; k++){
                              if(osdName == defaultList.hosts[j].osds[k].name){
                              defaultList.hosts[j].osds[k]['ceph_crush_name']="hdd";
                            }
                        }
                    }
                  }
                }
                var tempDefaultList =[];
                tempDefaultList[0]= defaultList;
                osdList.topology= tempDefaultList;
                osdList.cluster_status = jsonPath(dashApi.parseStorageHealthStatusData(status), "$.cluster_status")[0];
                osdList.cluster_status.monitor_count= JSON.parse(mons_total);
                osdList.cluster_status.monitor_active= JSON.parse(mons_active);
                callback(osdList);
            });
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

function parseRootFromHost(rootJSON, hostJSON){
   var rootCnt = rootJSON.length;
   for(q=0;q<rootCnt; q++) {
       var total_up_node =0;
       var total_down_node =0;
       var total_warn_node =0;

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
                   var hostStatus = "warn";
                   var osdUp = 0, osdDown = 0;
                   for (k = 0; k < osdCnt; k++) {
                       var osdStatus = osdStatusJSON[k];
                       if (osdStatus == "down") {
                           osdDown = osdDown+1;
                       }else if(osdStatus=="up"){
                           osdUp= osdUp+1;
                       }
                   }
                   if(osdDown == 0){
                       hostStatus = "up";
                   } else if(osdCnt ==osdDown){
                       hostStatus = "down";
                   }
                   hostJSON[j].status = hostStatus;
                   if (hostStatus == "up") {
                       total_up_node = total_up_node + 1;
                   } else if (hostStatus == "warn") {
                       total_warn_node = total_warn_node + 1;
                   } else{
                       total_down_node = total_down_node + 1;
                   }
               }
           }
           rootJSON[q].total_node = chldCnt;
           rootJSON[q].total_up_node = total_up_node;
           rootJSON[q].total_warn_node = total_warn_node;
           rootJSON[q].total_down_node = total_down_node;
       }
   }
    var jsonstr = JSON.stringify(rootJSON);
    var new_jsonstr = jsonstr.replace(/children/g, "hosts");
    rootJSON = JSON.parse(new_jsonstr);
    return rootJSON;
}

/* List all public functions */
exports.getStorageTopologyDetails= getStorageTopologyDetails;
exports.getStorageSummary= getStorageSummary;
exports.parseStorageTopologyTree=parseStorageTopologyTree;



