/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

var 
    commonUtils = require('../../../utils/common.utils'),
    storageRest= require('../common/api/storage.rest.api'),
    async = require('async'),
    jsonPath = require('JSONPath').eval,
    osdApi= require('../storage-tenant/storage.osd.api'),
    monsApi= require('../storage-tenant/storage.mons.api'),
    storageInfraApi = module.exports;

function getTopologyURLs(appData){
    var dataObjArr = [];
    urlOSDsFromPG = "/pg/dump?dumpcontents=osds";
    commonUtils.createReqObj(dataObjArr, urlOSDsFromPG, null, null, 
                                         null, null, appData);
    urlOSDTree = "/osd/tree";
    commonUtils.createReqObj(dataObjArr, urlOSDTree, null, null, 
                                         null, null, appData);
    urlOSDDump = "/osd/dump";
    commonUtils.createReqObj(dataObjArr, urlOSDDump, null, null, 
                                         null, null, appData);
    urlMons = "/status";
    commonUtils.createReqObj(dataObjArr, urlMons, null, null, 
                                         null, null, appData);
    return dataObjArr;
}

function getStorageTopology(req, res, appData){
    var resultJSON = [];
    dataObjArr = getTopologyURLs(appData);
    async.map(dataObjArr,
                      commonUtils.getAPIServerResponse(storageRest.apiGet, true),
                      function(err, data) {
                resultJSON = parseStorageTopologyTree(data);        
                commonUtils.handleJSONResponse(err, res, resultJSON);
            });
}

function parseStorageTopologyTree(osdJSON){
    var emptyObj = {};  
    var osdList={};
    var osdPG= osdJSON[0];
    var osdTree= osdJSON[1];
    var osdDump= osdJSON[2];
    var monStatus= osdJSON[3];

    var rootMap = jsonPath(osdTree, "$..nodes[?(@.type=='root')]");
    var hostMap = jsonPath(osdTree, "$..nodes[?(@.type=='host')]");
    var osds = jsonPath(osdTree, "$..nodes[?(@.type=='osd')]");
    var monsJSON = jsonPath(monsApi.consolidateMonitors(monStatus), "$..monitors")[0];
    if (osds.length > 0) {
        osdApi.parseOSDFromPG(osds,osdPG);
        osdApi.parseOSDFromDump(osds,osdDump);
        hostMap = parseMonitorWithHost(monsJSON, hostMap);
        hostMap = osdApi.parseHostFromOSD(hostMap,osds, true);

        osdList.topology= parseRootFromHost(rootMap,hostMap)[0];
        return osdList;
    }
    return emptyObj;
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
    dataObjArr = getTopologyURLs(appData);
    async.map(dataObjArr,
                      commonUtils.getAPIServerResponse(storageRest.apiGet, true),
                      function(err, data) {
                resultJSON = parseStorageTopologyDetails(hostName,data);        
                commonUtils.handleJSONResponse(err, res, resultJSON);
            });
}

function parseStorageTopologyDetails(name, resultJSON){
    resultJSON = parseStorageTopologyTree(resultJSON);
    var hDetails = jsonPath(resultJSON, "$..hosts[?(@.name=='"+name+"')]")[0];
    var hJSON = {};
        hJSON['host_details'] = hDetails;
    return hJSON;
}

function parseRootFromHost(rootJSON, hostJSON){
    var chldCnt= rootJSON[0].children.length;
   // console.log("chldCnt:"+chldCnt);
   var total_up_node =0;
   var total_down_node =0;
     for(i=0;i< chldCnt;i++){ 
        var chldId= rootJSON[0].children[i];
        // console.log("chlId:"+chldId);
        var hostCnt= hostJSON.length;
        for(j=0;j< hostCnt;j++){
            var hostId= hostJSON[j].id;
            if(chldId == hostId){
                rootJSON[0].children[i] = hostJSON[j];
                var osdStatusJSON = jsonPath(hostJSON[j], "$.osds[*].status");
             //   console.log("osdStatusJSON:"+osdStatusJSON);
                var osdCnt = osdStatusJSON.length
                var hostStatus="up";

                for (k=0;k< osdCnt; k++){
                    var osdStatus = osdStatusJSON[k];
                    //console.log("osdStatus:"+osdStatus);
                    if(osdStatus == "down"){
                        hostStatus ="down";
                        //console.log("hostStatus:"+hostStatus);
                    }
                } 

                hostJSON[j].status= hostStatus;
                if(hostStatus== "up"){
                    total_up_node = total_up_node+1;
                }else{
                    total_down_node = total_down_node+1;
                }
            }
        }
        rootJSON[0].total_node=chldCnt;
        rootJSON[0].total_up_node =total_up_node;
        rootJSON[0].total_down_node=total_down_node;
    }
    var jsonstr = JSON.stringify(rootJSON);
    var new_jsonstr = jsonstr.replace(/children/g, "hosts");
    rootJSON = JSON.parse(new_jsonstr);

    return rootJSON;
}

/* List all public functions */
exports.getStorageTopology = getStorageTopology;
exports.getStorageTopologyDetails= getStorageTopologyDetails;




