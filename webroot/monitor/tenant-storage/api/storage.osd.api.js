/*
 * Copyright (c) 2013 Juniper Networks, Inc. All rights reserved.
 */

var storageConfig = require('../../../common/js/storage.config.global');
var storageApi= require('../../../common/api/storage.api.constants');

var commonUtils = require(storageConfig.core_path +
                    '/src/serverroot/utils/common.utils'),
    global = require(storageConfig.core_path + '/src/serverroot/common/global'),
    logutils = require(storageConfig.core_path + '/src/serverroot/utils/log.utils'),
    stMonUtils= require('../../../common/api/utils/storage.utils'),
    storageRest= require('../../../common/api/storage.rest.api'),
    async = require('async'),
    jsonPath = require('JSONPath').eval,
    storageOsdsApi = module.exports;

function getStorageOSDStatus(req, res, appData){
    url = storageApi.url.osdStat;//"/osd/stat";
     storageRest.apiGet(url, appData, function (error, resultJSON) {
            if(!error && (resultJSON)) {
                var resultJSON = parseStorageOSDStatus(resultJSON);
                commonUtils.handleJSONResponse(null, res, resultJSON);
            } else {
                commonUtils.handleJSONResponse(error, res, null);
            }
        });     
}

function parseStorageOSDStatus(osdJSON){
    var osdMapJSON ={};    
    var num_osds= jsonPath(osdJSON, "$.output.num_osds")[0];
    var num_up_osds= jsonPath(osdJSON, "$.output.num_up_osds")[0];
    var num_in_osds= jsonPath(osdJSON, "$.output.num_in_osds")[0];
    var num_down_osds = num_osds - num_up_osds;
    var num_out_osds = num_osds - num_in_osds;
   
    var obj = jsonPath(osdJSON, "$.output")[0];
    obj['num_down_osds'] = num_down_osds;
    obj['num_out_osds'] = num_out_osds;
    //c = obj;
    osdMapJSON['osd_stat']= osdJSON;
    return osdMapJSON;
}

function getStorageOSDSummary(req, res, appData){
    var resultJSON = [];
    dataObjArr = getOSDListURLs(appData);
     async.map(dataObjArr,
                      commonUtils.getAPIServerResponse(storageRest.apiGet, true),
                      function(err, data) {
                resultJSON = parseStorageOSDSummary(data);        
                commonUtils.handleJSONResponse(err, res, resultJSON);
            });

}

function parseStorageOSDSummary(osdJSON){
    var emptyObj = {};  
    var osdList={};
    var osdPG= osdJSON[0];
    var osdTree= osdJSON[1];
    var osdDump= osdJSON[2];
    var osds = jsonPath(osdTree, "$..nodes[?(@.type=='osd')]");
    var hostMap = jsonPath(osdTree, "$..nodes[?(@.type=='host')]");
    
    if (osds.length > 0) {
        var osdMapJSON = new Object();
        parseOSDFromPG(osds,osdPG);
        parseOSDFromDump(osds,osdDump);
        appendHostToOSD(osds,hostMap);
        osdMapJSON["osds"]= osds;
        osdList= osdMapJSON;
        return osdList;
    }
    return emptyObj;
}

function appendHostToOSD(osds,hostJSON){

 var hstCnt= hostJSON.length;
    for(i=0;i< hstCnt;i++){       
        var cldCnt= hostJSON[i].children.length;
        for(j=0;j< cldCnt; j++){
            var chlId= hostJSON[i].children[j];
            for(k=0;k< osds.length;k++){
                var osdId= osds[k].id;
                if(chlId==osdId){
                    osds[k].host = hostJSON[i].name;
                }
            }
        }
    }

}

function getOSDVersion(req, res, appData){
    var osdName= req.param('name'),
        url = storageApi.url.osdVersion;
    url = url.replace(":osdName", osdName);
    storageRest.apiGet(url, appData, function (error, resultJSON) {
        if(!error && (resultJSON)) {
            // var resultJSON = parseStorageOSDStatus(resultJSON);
            commonUtils.handleJSONResponse(null, res, resultJSON);
        } else {
            commonUtils.handleJSONResponse(error, res, null);
        }
    });
}

function getStorageOSDDetails(req, res, appData){
    var resultJSON = [];
    var osd_name = req.param('name');
    dataObjArr = getOSDListURLs(appData);
    async.map(dataObjArr,
                      commonUtils.getAPIServerResponse(storageRest.apiGet, true),
                      function(err, data) {
                resultJSON = parseStorageOSDDetails(osd_name,data);        
                commonUtils.handleJSONResponse(err, res, resultJSON);
            });

}

function parseStorageOSDDetails(name, resultJSON){
    resultJSON = parseStorageOSDSummary(resultJSON);
    var osdDetails = jsonPath(resultJSON, "$..osds[?(@.name=='"+name+"')]")[0];
    var osdJSON = {};
        osdJSON['osd_details'] = osdDetails;
    return osdJSON;
}

function getOSDListURLs(appData){
    var dataObjArr = [];
    urlOSDsFromPG = storageApi.url.pgDumpOSDs;//"/pg/dump?dumpcontents=osds";
    commonUtils.createReqObj(dataObjArr, urlOSDsFromPG, null, null, 
                                         null, null, appData);
    urlOSDTree = storageApi.url.osdTree;//"/osd/tree";
    commonUtils.createReqObj(dataObjArr, urlOSDTree, null, null, 
                                         null, null, appData);
    urlOSDDump = storageApi.url.osdDump;//"/osd/dump";
    commonUtils.createReqObj(dataObjArr, urlOSDDump, null, null, 
                                         null, null, appData);
    return dataObjArr;
}

function parseRootFromHost(rootJSON, hostJSON, treeReplace){
    var chldCnt= rootJSON[0].children.length;
   // console.log("chldCnt:"+chldCnt);
     for(i=0;i< chldCnt;i++){ 
        var chldId= rootJSON[0].children[i];
        // console.log("chlId:"+chldId);
        var hostCnt= hostJSON.length;
        for(j=0;j< hostCnt;j++){
            var hostId= hostJSON[j].id;
            if(chldId == hostId){
                rootJSON[0].children[i] = hostJSON[j];
/*              console.log("chlId:"+chldId);
                console.log("hostId:"+hostId);*/
            }
        }
    }
    if(treeReplace){
        var jsonstr = JSON.stringify(rootJSON);
        var new_jsonstr = jsonstr.replace(/children/g, "hosts");
        rootJSON = JSON.parse(new_jsonstr);
    }

    return rootJSON;
}

function parseHostFromOSD(hostJSON,osdsJSON, version, treeReplace) {
    var hstCnt = hostJSON.length;
    for (i = 0; i < hstCnt; i++) {
        var cldCnt = hostJSON[i].children.length;
        hostJSON[i]['build_info'] = version;
        for (j = 0; j < cldCnt; j++) {
            var chlId = hostJSON[i].children[j];
            for (k = 0; k < osdsJSON.length; k++) {
                var osdId = osdsJSON[k].id;
                if (chlId == osdId) {
                    /*  console.log("hstCnt:"+hostJSON[i].name);
                     console.log("hstlength:"+cldCnt);
                     console.log("chlId:"+chlId);
                     console.log("osdId:"+osdId);*/
                    hostJSON[i].children[j] = osdsJSON[k];
                }
            }
        }
    }

    if (treeReplace) {
        var jsonstr = JSON.stringify(hostJSON);
        var new_jsonstr = jsonstr.replace(/children/g, "osds");
        hostJSON = JSON.parse(new_jsonstr);
    }
    return hostJSON;
}

function getStorageOSDTree(req, res, appData){
    dataObjArr = getOSDListURLs(appData);
    async.map(dataObjArr,
                      commonUtils.getAPIServerResponse(storageRest.apiGet, true),
                      function(err, data) {
                          parseStorageOSDTree(data, function(resultJSON){
                              commonUtils.handleJSONResponse(err, res, resultJSON);
                          });
            });
 
}

function parseStorageOSDTree(osdJSON, callback){
    var emptyObj = {};  
    var osdList={};
    var osdPG= osdJSON[0];
    var osdTree= osdJSON[1];
    var osdDump= osdJSON[2];
    var rootMap = jsonPath(osdTree, "$..nodes[?(@.type=='root')]");
    var hostMap = jsonPath(osdTree, "$..nodes[?(@.type=='host')]");
    var osds = jsonPath(osdTree, "$..nodes[?(@.type=='osd')]");
    if (osds.length > 0) {
        parseOSDVersion(osds[0].name, function(version){
            var osdMapJSON = new Object();
            parseOSDFromPG(osds,osdPG);
            parseOSDFromDump(osds,osdDump);
            hostMap = parseHostFromOSD(hostMap,osds, version, true);
            osdMapJSON["osd_tree"]= parseRootFromHost(rootMap,hostMap,true);
            osdList= osdMapJSON;
            callback(osdList);

        });
    }
}

function parseOSDVersion(name, callback){
    var osdVersion ;
    if(name !== 'undefined') {
        var url = storageApi.url.osdVersion, appData ={};
        url = url.replace(":osdName", name);
        storageRest.apiGet(url, appData,function(err, resultJSON) {
            if(!err && (resultJSON)) {
                osdVersion = jsonPath(resultJSON, "$.output.version")[0];
                callback(osdVersion);
            }

        });
    }

}

function parseOSDFromPG(osdTree, osdPG ){
    var nodeCnt= osdTree.length;
    //log.console("count:"+nodeCnt);
    for (i = 0; i < nodeCnt; i++) {
        var treeId=osdTree[i].id;
        var pgOsdCnt = jsonPath(osdPG,"$.output.length")[0];
        for(j=0; j< pgOsdCnt; j++){
            var pgOSDId= jsonPath(osdPG,"$.output["+j+"].osd")[0];
            if( treeId == pgOSDId){
              /*  console.log("treeId:"+treeId);
                console.log("pgOSDId:"+pgOSDId);*/
                osdTree[i]['kb']=jsonPath(osdPG,"$.output["+j+"].kb")[0];
                osdTree[i]['kb_avail']=jsonPath(osdPG, "$.output["+j+"].kb_avail")[0];
                osdTree[i]['kb_used']=jsonPath(osdPG, "$.output["+j+"].kb_used")[0];
                osdTree[i]['fs_perf_stat']=jsonPath(osdPG, "$.output["+j+"].fs_perf_stat")[0];
            }   
        }
    }
    return osdTree;
}

function parseOSDFromDump(osdTree, osdDump){
    var nodeCnt= osdTree.length;
    var osdDumpCnt = jsonPath(osdDump,"$.output.osds.length")[0];
   // console.log("Dump count:"+osdDumpCnt);
    for (i = 0; i < nodeCnt; i++) {
        var treeId=osdTree[i].id;
        for(j=0; j< osdDumpCnt; j++){
            var dumpOSDId= jsonPath(osdDump,"$.output.osds["+j+"].osd")[0];
            /*console.log("treeId:"+treeId);
            console.log("dumpOSDId:"+dumpOSDId);
            */
            if( treeId == dumpOSDId){
                osdTree[i]['heartbeat_back_addr']=jsonPath(osdDump,"$.output.osds["+j+"].heartbeat_back_addr")[0];
                osdTree[i]['heartbeat_front_addr']=jsonPath(osdDump, "$.output.osds["+j+"].heartbeat_front_addr")[0];
                osdTree[i]['public_addr']=jsonPath(osdDump, "$.output.osds["+j+"].public_addr")[0];
                osdTree[i]['cluster_addr']=jsonPath(osdDump, "$.output.osds["+j+"].cluster_addr")[0];
                osdTree[i]['uuid']=jsonPath(osdDump, "$.output.osds["+j+"].uuid")[0];
                osdTree[i]['down_at']=jsonPath(osdDump, "$.output.osds["+j+"].down_at")[0];
                osdTree[i]['up_from']=jsonPath(osdDump, "$.output.osds["+j+"].up_from")[0];
                osdTree[i]['lost_at']=jsonPath(osdDump, "$.output.osds["+j+"].lost_at")[0];
                osdTree[i]['up_thru']=jsonPath(osdDump, "$.output.osds["+j+"].up_thru")[0];
                custer_status= jsonPath(osdDump, "$.output.osds["+i+"].in")[0]
           
                if(custer_status==1){
                     osdTree[i]['cluster_status']='in';
                }else{
                     osdTree[i]['cluster_status']='out';
                }
                osdTree[i]['up']=jsonPath(osdDump, "$.output.osds["+i+"].up")[0];;
                osdTree[i]['in']=custer_status;
                osdTree[i]['state']=jsonPath(osdDump, "$.output.osds["+i+"].state")[0];
                osdTree[i]['last_clean_begin']=jsonPath(osdDump, "$.output.osds["+i+"].last_clean_begin")[0];
                osdTree[i]['last_clean_end']=jsonPath(osdDump, "$.output.osds["+i+"].last_clean_end")[0];
            }   
            var dumpOSDId= jsonPath(osdDump,"$.output.osd_xinfo["+j+"].osd")[0];
            if( treeId == dumpOSDId){
                osdTree[i]['osd_xinfo']=jsonPath(osdDump,"$.output.osd_xinfo["+j+"]")[0];
            }
        }

    }
    return osdTree;
}

function getStorageOSDFlowSeries (req, res, appData) {
    var source = req.query['hostName'];
    var sampleCnt = req.query['sampleCnt'];
    var minsSince = req.query['minsSince'];
    var endTime = req.query['endTime'];
    var osdName= req.query['osdName'];

    var name = source +":"+osdName;

    var tableName, whereClause,
        selectArr = ["T", "name"];

    tableName = 'StatTable.ComputeStorageOsd.osd_stats';
    selectArr.push("osd_stats.uuid");
    selectArr.push("osd_stats.osd_name");
    selectArr.push("osd_stats.reads");
    selectArr.push("osd_stats.writes");
    selectArr.push("osd_stats.read_kbytes");
    selectArr.push("osd_stats.write_kbytes");
    whereClause = [
        {'Source':source},
        {'name':name}
    ];

    whereClause = stMonUtils.formatAndClause(whereClause);
    var timeObj = stMonUtils.createTimeQueryJsonObj(minsSince, endTime);
    var timeGran = stMonUtils.getTimeGranByTimeSlice(timeObj, sampleCnt);
    var queryJSON = stMonUtils.formatQueryStringWithWhereClause(tableName, whereClause, selectArr, timeObj, true);
    delete queryJSON['limit'];
    delete queryJSON['dir'];
    var selectEleCnt = queryJSON['select_fields'].length;
    queryJSON['select_fields'].splice(selectEleCnt - 1, 1);
    stMonUtils.executeQueryString(queryJSON,
        commonUtils.doEnsureExecution(function(err, resultJSON)  {
            resultJSON= formatFlowSeriesForOsdStats(resultJSON, timeObj, timeGran);
            commonUtils.handleJSONResponse(err, res, resultJSON);
        }, global.DEFAULT_MIDDLEWARE_API_TIMEOUT));

}


function formatFlowSeriesForOsdStats(storageFlowSeriesData, timeObj, timeGran)
{
    var len = 0;
    var resultJSON = {};
    try{
        resultJSON['summary'] = {};
        resultJSON['summary']['start_time'] = timeObj['start_time'];
        resultJSON['summary']['end_time'] = timeObj['end_time'];
        resultJSON['summary']['timeGran_microsecs'] = Math.floor(timeGran) * global.MILLISEC_IN_SEC * global.MICROSECS_IN_MILL;
        resultJSON['summary']['name'] = storageFlowSeriesData['value'][0]['name'];
        resultJSON['summary']['uuid'] = storageFlowSeriesData['value'][0]['osd_stats.uuid'];
        resultJSON['summary']['osd_name'] = storageFlowSeriesData['value'][0]['osd_stats.osd_name'];
        resultJSON['flow-series'] = formatOsdSeriesLoadXMLData(storageFlowSeriesData);
        return resultJSON;
    } catch (e) {
        logutils.logger.error("In formatFlowSeriesForOsdStats(): JSON Parse error: " + e);
        return null;
    }
}

function formatOsdSeriesLoadXMLData (resultJSON)
{
    var results = [];
    var counter = 0;
    try {
        resultJSON = resultJSON['value'];
        counter = resultJSON.length;
       for (var i = 0; i < counter; i++) {
            results[i] = {};
            results[i]['MessageTS'] = resultJSON[i]['T'];
            results[i]['reads'] = resultJSON[i]['osd_stats.reads'];
            results[i]['writes'] = resultJSON[i]['osd_stats.writes'];
            results[i]['reads_kbytes'] = resultJSON[i]['osd_stats.read_kbytes'];
            results[i]['writes_kbytes'] = resultJSON[i]['osd_stats.write_kbytes'];
        }
        return results;
    } catch (e) {
        logutils.logger.error("In formatOsdSeriesLoadXMLData(): JSON Parse error: " + e);
        return null;
    }
}

/* List all public functions */
exports.getStorageOSDSummary=getStorageOSDSummary;
exports.getStorageOSDStatus=getStorageOSDStatus;
exports.getStorageOSDTree=getStorageOSDTree;
exports.getStorageOSDDetails=getStorageOSDDetails;
exports.getOSDVersion = getOSDVersion;

exports.parseOSDVersion=parseOSDVersion;
exports.parseOSDFromPG = parseOSDFromPG;
exports.parseOSDFromDump= parseOSDFromDump;
exports.parseHostFromOSD=parseHostFromOSD;
exports.parseRootFromHost=parseRootFromHost;
exports.getStorageOSDFlowSeries= getStorageOSDFlowSeries;





