/*
 * Copyright (c) 2013 Juniper Networks, Inc. All rights reserved.
 */

var storageApi= require('../../../common/api/storage.api.constants');
var storageGlobal = require('../../../common/config/storage.global');
var cacheApi = require(process.mainModule.exports["corePath"] +
    '/src/serverroot/web/core/cache.api'),
    commonUtils = require(process.mainModule.exports["corePath"] +
                    '/src/serverroot/utils/common.utils'),
    global = require(process.mainModule.exports["corePath"] + '/src/serverroot/common/global'),
    config = require(process.mainModule.exports["corePath"] + '/config/config.global.js'),
    logutils = require(process.mainModule.exports["corePath"] + '/src/serverroot/utils/log.utils'),
    opApiServer = require(process.mainModule.exports["corePath"] + '/src/serverroot/common/opServer.api'),
    stMonUtils= require('../../../common/utils/storage.utils'),
    storageRest= require('../../../common/api/storage.rest.api'),
    async = require('async'),
    util = require('util'),
    jsonPath = require('JSONPath').eval,
    storageOsdsApi = module.exports;

var  expireTime= storageApi.expireTimeSecs;
var redis = require("redis"),
    redisServerPort = (config.redis_server_port) ? config.redis_server_port : global.DFLT_REDIS_SERVER_PORT,
    redisServerIP = (config.redis_server_ip) ? config.redis_server_ip : global.DFLT_REDIS_SERVER_IP,
    redisClient = redis.createClient(redisServerPort, redisServerIP);

function getStorageOSDStatus(req, res, appData){
    var urlOSDStatus = storageApi.url.osdStat;//"/osd/stat";
    redisClient.get(urlOSDStatus, function(error, cachedJSONStr) {
        if (error || cachedJSONStr == null) {
            storageRest.apiGet(urlOSDStatus, appData, function (error, resultJSON) {
                if(!error && (resultJSON)) {
                    var resultJSON = parseStorageOSDStatus(resultJSON);
                    if(!resultJSON) {
                        resultJSON = [];
                    }
                    redisClient.setex(urlOSDStatus, expireTime, JSON.stringify(resultJSON));
                    commonUtils.handleJSONResponse(null, res, resultJSON);
                } else {
                    commonUtils.handleJSONResponse(error, res, null);
                }
            });
        } else {
            commonUtils.handleJSONResponse(null, res, JSON.parse(cachedJSONStr));
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
    osdMapJSON['osd_stat']['last_updated_time']= new Date();
    return osdMapJSON;
}

function getStorageOSDTree(req, res, appData){
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

function getStorageOSDsSummary (req, res, appData) {
    var url = '/storage-osds-summary';
    var forceRefresh = req.param('forceRefresh');
    var key = storageGlobal.STR_GET_STORAGE_OSD_SUMMARY;
    var jobRunCount=1;
    var firstRunDelay= 0;
    var nextRunDelay=storageGlobal.STORAGE_SUMM_JOB_REFRESH_TIME;
    var objData = {};

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


function parseStorageOSDSummary(osdJSON, callback){
    var emptyObj = {};  
    var osdList={};
    var osdPG= osdJSON[0];
    var osdTree= osdJSON[1];
    var osdDump= osdJSON[2];
    var osds = jsonPath(osdDump, "$..osds");
    var hostMap = jsonPath(osdTree, "$..nodes[?(@.type=='host')]");

    if (osds != undefined && osds.length > 0) {
        var osdMapJSON = new Object();
        var tOSDs = jsonPath(osdTree, "$..nodes[?(@.type=='osd')]");
        osds=parseOSDFromTree(osdDump,tOSDs);
        parseOSDFromPG(osds,osdPG);
        appendHostToOSD(osds,hostMap);
        getAvgBWHostToOSD(osds,hostMap, function(osds){
            osdMapJSON["osds"]= osds;
            osdList= osdMapJSON;
            callback(osdList);
        });

    }
    return emptyObj;
}


function getStorageOSDDetails(req, res, appData){

    var reqUrl = "/storage-osds-summary";

    var reqObj = {}
    reqObj['req'] = req;
    reqObj['res'] = res;
    reqObj['jobType'] = storageGlobal.STR_JOB_TYPE_CACHE;;
    reqObj['jobName'] = storageGlobal.STR_GET_STORAGE_OSD_SUMMARY;
    reqObj['reqUrl'] = reqUrl;
    reqObj['jobRunCount'] = 1;
    reqObj['firstRunDelay'] = 0;
    reqObj['nextRunDelay'] = storageGlobal.STORAGE_SUMM_JOB_REFRESH_TIME;
    reqObj['sendToJobServerAlways'] = false;
    reqObj['appData'] = null;
    reqObj['postCallback'] = parseStorageOSDDetails;

    cacheApi.queueDataFromCacheOrSendRequestByReqObj(reqObj)
}

function parseStorageOSDDetails(req, res, resultJSON){
    var osd_name = req.param('name');
    //resultJSON = JSON.parse(resultJSON);
    var osdDetails = jsonPath(resultJSON, "$..osds[?(@.name=='"+osd_name+"')]")[0];
    var osdJSON = {};
    osdJSON['osd_details'] = osdDetails;
    commonUtils.handleJSONResponse(null, res, osdJSON);

}

function parseOSDFromTree(osdDump, osdTree){
    var osds = jsonPath(osdDump, "$..osds")[0];
    var osdCnt= osds.length;
    var treeCnt = osdTree.length;
    var osdList=[];
    var osdDumpCnt = jsonPath(osdDump,"$.output.osds.length")[0];
        for(j=0; j< osdDumpCnt; j++){
            var dumpOSDId= jsonPath(osdDump,"$.output.osds["+j+"].osd")[0];
            var temp = new Object();
            var tmpOsdTree = {};
            var tmpId;
            for(k=0; k < treeCnt; k++){
                treeId=osdTree[k].id;
                if( treeId == dumpOSDId){
                    tmpId= osdTree[k].id;
                    tmpOsdTree =osdTree[k];
                    break;
                }
            }

            if( tmpId == dumpOSDId){
                var status= tmpOsdTree.status;
                temp['status'] = tmpOsdTree.status;
                temp['name'] = tmpOsdTree.name;
                temp['type_id'] = tmpOsdTree.type_id;
                temp['type'] = tmpOsdTree.type;
                temp['id'] = tmpOsdTree.id;
                temp['public_addr']=jsonPath(osdDump, "$.output.osds["+j+"].public_addr")[0];
                temp['uuid']=jsonPath(osdDump, "$.output.osds["+j+"].uuid")[0];
                temp['down_at']=jsonPath(osdDump, "$.output.osds["+j+"].down_at")[0];
                temp['up_from']=jsonPath(osdDump, "$.output.osds["+j+"].up_from")[0];
                var custer_status= jsonPath(osdDump, "$.output.osds["+j+"].in")[0];
                if(custer_status=="1"){
                    temp['cluster_status']='in';
                }else{
                    temp['cluster_status']='out';
                }
                temp['up']=jsonPath(osdDump, "$.output.osds["+j+"].up")[0];
                temp['in']=jsonPath(osdDump, "$.output.osds["+j+"].in")[0];
                temp['state']=jsonPath(osdDump, "$.output.osds["+j+"].state")[0];
                var dumpOSDId= jsonPath(osdDump,"$.output.osd_xinfo["+j+"].osd")[0];
                if( treeId == dumpOSDId){
                    temp['osd_xinfo']=jsonPath(osdDump,"$.output.osd_xinfo["+j+"]")[0];

                }
                osdList.push(temp);
            }
        }

    
    return osdList;
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


function parseRootFromHost(rootJSON, hostJSON, treeReplace){
    var rootCnt = rootJSON.length;
    for(q=0;q<rootCnt; q++) {
        var chldCnt = rootJSON[q].children.length;
        for (i = 0; i < chldCnt; i++) {
            var chldId = rootJSON[q].children[i];
            var hostCnt = hostJSON.length;
            for (j = 0; j < hostCnt; j++) {
                var hostId = hostJSON[j].id;
                if (chldId == hostId) {
                    rootJSON[q].children[i] = hostJSON[j];
                }
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
                    var temp = osdsJSON[k];
                    hostJSON[i].children[j] = temp;
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



function getAvgBWHostToOSD(osds,hostJSON, callback){
    postParseStorageOSDAvgBW(function(resultJSON){
        var hstCnt= hostJSON.length;
        for(i=0;i< hstCnt;i++){
            var cldCnt= hostJSON[i].children.length;
            for(j=0;j< cldCnt; j++){
                var chlId= hostJSON[i].children[j];
                for(k=0;k< osds.length;k++){
                    var osdId= osds[k].id;
                    if(chlId==osdId){
                        osds[k].host = hostJSON[i].name;
                        var results = new Object();
                           results['Date']= new Date();
                           results['name']= hostJSON[i].name+":"+osds[k].name;
                           results['reads']= "Not Available";
                           results['writes']= "Not Available";
                           results['reads_kbytes']= "Not Available";
                           results['writes_kbytes']= "Not Available";
                           results['op_r_latency']= "Not Available";
                           results['op_w_latency']= "Not Available";
                        osds[k].avg_bw =results;
                   }
                }
            }
        }
        var osdLen = osds.length;
        for(i=0; i< osdLen; i++){
            var osdName = osds[i].avg_bw.name;
            var avgBWLen = resultJSON.length;
            for(j=0;j< avgBWLen;j++){
                   if(osdName == resultJSON[j].name){
                    osds[i].avg_bw = resultJSON[j];
                   }
            }
        }
        callback(osds);
    });
}

function parseOSDVersion(name, callback){
    var osdVersion ;
    if(name !== 'undefined') {
        var url = storageApi.url.osdVersion, appData = {};
        url = url.replace(":osdName", name);
        cookieCephVersion = "storage_cephversion";
        redisClient.get(cookieCephVersion, function (error, cachedJSONStr) {
            if (error || cachedJSONStr == null) {
                storageRest.apiGet(url, appData, function (error, resultJSON) {
                    if (!error && (resultJSON)) {
                        osdVersion = jsonPath(resultJSON, "$.output.version")[0];
                        if (!osdVersion) {
                            osdVersion = [];
                        }
                        redisClient.setex(cookieCephVersion, 360000, JSON.stringify(osdVersion));
                        callback(osdVersion);
                    } else {
                        callback(JSON.parse(cachedJSONStr));
                    }
                });
            } else {
                callback(JSON.parse(cachedJSONStr));
            }
        });
    }
}

function parseOSDFromPG(osdTree, osdPG ){
    var nodeCnt= osdTree.length;
    for (i = 0; i < nodeCnt; i++) {
        var treeId=osdTree[i].id;
        var pgOsdCnt = jsonPath(osdPG,"$.output.length")[0];
        for(j=0; j< pgOsdCnt; j++){
            var pgOSDId= jsonPath(osdPG,"$.output["+j+"].osd")[0];
            if( treeId == pgOSDId){
                osdTree[i]['kb']=jsonPath(osdPG,"$.output["+j+"].kb")[0];
                osdTree[i]['kb_avail']=jsonPath(osdPG, "$.output["+j+"].kb_avail")[0];
                osdTree[i]['kb_used']=jsonPath(osdPG, "$.output["+j+"].kb_used")[0];
                osdTree[i]['fs_perf_stat']=jsonPath(osdPG, "$.output["+j+"].fs_perf_stat")[0];
            }
        }
    }
    return osdTree;
}

function getStorageOSDFlowSeries (req, res, appData) {
    var sampleCnt = req.query['sampleCnt'];
    if(typeof sampleCnt == "undefined"){
        sampleCnt =10;
    }else if(isNaN(sampleCnt)){
        sampleCnt =10;
    }

    var minsSince = req.query['minsSince'];
    if(typeof minsSince == "undefined"){
        minsSince =30;
    }else if(isNaN(minsSince)){
        minsSince =30;
    }

    var endTime = req.query['endTime'];
    if(typeof endTime == "undefined"){
        endTime ='now';
    }
    var source = req.query['hostName'];
    var osdName= req.query['osdName'];
    var uuid= req.query['uuid'];

    var name = source +":"+osdName;

    var tableName, whereClause,
        selectArr = ["T", "name", "info_stats.reads", "info_stats.writes", "info_stats.read_kbytes","info_stats.write_kbytes"];

    tableName = 'StatTable.ComputeStorageOsd.info_stats';
    selectArr.push("UUID");
    selectArr.push("info_stats.op_r_latency");
    selectArr.push("info_stats.op_w_latency");

    whereClause = [
        {'Source':source},
        {'uuid':uuid}
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
            resultJSON= formatFlowSeriesForOsdStats(resultJSON, timeObj, timeGran,osdName);
            commonUtils.handleJSONResponse(err, res, resultJSON);
        }, global.DEFAULT_MIDDLEWARE_API_TIMEOUT));
}

function getStorageOsdDiskFlowSeries (req, res, appData) {
    var sampleCnt = req.query['sampleCnt'];
    if(typeof sampleCnt == "undefined"){
        sampleCnt =10;
    }else if(isNaN(sampleCnt)){
        sampleCnt =10;
    }

    var minsSince = req.query['minsSince'];
    if(typeof minsSince == "undefined"){
        minsSince =30;
    }else if(isNaN(minsSince)){
        minsSince =30;
    }

    var endTime = req.query['endTime'];
    if(typeof endTime == "undefined"){
        endTime ='now';
    }
    var source = req.query['hostName'];
    var osdName= req.query['osdName'];
    var uuid= req.query['uuid'];

    var name = source +":"+osdName;

    var tableName, whereClause,
        selectArr = ["T", "name", "info_stats.reads", "info_stats.writes", "info_stats.read_kbytes","info_stats.write_kbytes"];

    tableName = 'StatTable.ComputeStorageDisk.info_stats';
    selectArr.push("UUID");
    selectArr.push("info_stats.op_r_latency");
    selectArr.push("info_stats.op_w_latency");

    whereClause = [
        {'Source':source},
        {'uuid':uuid}
    ];

    whereClause = stMonUtils.formatAndClause(whereClause);
    var timeObj = stMonUtils.createTimeQueryJsonObj(minsSince, endTime);
    var timeGran = stMonUtils.getTimeGranByTimeSlice(timeObj, sampleCnt);
    var queryJSON = stMonUtils.formatQueryStringWithWhereClause(tableName, whereClause, selectArr, timeObj, true);
    delete queryJSON['limit'];
    delete queryJSON['dir'];
    var selectEleCnt = queryJSON['select_fields'].length;
    queryJSON['select_fields'].splice(selectEleCnt - 1, 1);
    console.log("............."+queryJSON);

    stMonUtils.executeQueryString(queryJSON,
        commonUtils.doEnsureExecution(function(err, resultJSON)  {
            resultJSON= formatFlowSeriesForOsdStats(resultJSON, timeObj, timeGran,osdName);
            commonUtils.handleJSONResponse(err, res, resultJSON);
        }, global.DEFAULT_MIDDLEWARE_API_TIMEOUT));
}

function formatFlowSeriesForOsdStats(storageFlowSeriesData, timeObj, timeGran,osdName){
    var len = 0, secTime;
    var resultJSON = {};
    if(storageFlowSeriesData !== undefined && storageFlowSeriesData['value']!== undefined && storageFlowSeriesData['value'].length > 0) {
        try {
            resultJSON['summary'] = {};
            secTime = Math.floor(timeObj['start_time'] / 1000);
            resultJSON['summary']['start_time'] = new Date(secTime);

            secTime = Math.floor(timeObj['end_time'] / 1000);
            resultJSON['summary']['end_time'] = new Date(secTime);
            resultJSON['summary']['timeGran_microsecs'] = Math.floor(timeGran) * global.MILLISEC_IN_SEC * global.MICROSECS_IN_MILL;
            resultJSON['summary']['name'] = storageFlowSeriesData['value'][0]['name'];
            resultJSON['summary']['uuid'] = storageFlowSeriesData['value'][0]['UUID'];
            resultJSON['summary']['osd_name'] = osdName;
            resultJSON['flow-series'] = formatOsdSeriesLoadXMLData(storageFlowSeriesData);
            return resultJSON;
        } catch (e) {
            logutils.logger.error("In formatFlowSeriesForOsdStats(): JSON Parse error: " + e);
            return null;
        }
    }
}

function formatOsdSeriesLoadXMLData (resultJSON) {
    var results = [];
    var counter = 0,secTime;
    try {
        if(resultJSON !== undefined && resultJSON['value']!== undefined && resultJSON['value'].length > 0) {
            resultJSON = resultJSON['value'];
            counter = resultJSON.length;
            for (var i = 0; i < counter; i++) {
                results[i] = {};
                secTime = Math.floor(resultJSON[i]['T'] / 1000);
                results[i]['date'] = new Date(secTime);
                results[i]['MessageTS'] = resultJSON[i]['T'];
                results[i]['reads'] = resultJSON[i]['info_stats.reads'];
                results[i]['writes'] = resultJSON[i]['info_stats.writes'];
                results[i]['reads_kbytes'] = resultJSON[i]['info_stats.read_kbytes'];
                results[i]['writes_kbytes'] = resultJSON[i]['info_stats.write_kbytes'];
                results[i]['op_r_latency'] = resultJSON[i]['info_stats.op_r_latency'];
                results[i]['op_w_latency'] = resultJSON[i]['info_stats.op_w_latency'];
            }
        }
        return results;
    } catch (e) {
        logutils.logger.error("In formatOsdSeriesLoadXMLData(): JSON Parse error: " + e);
        return null;
    }
}

function getStorageOSDAvgBW(req, res,appData){
    var source = req.query['hostName'];
    var osdName= req.query['osdName'];
    parseStorageOSDAvgBW(osdName, source, function(resultJSON){
        commonUtils.handleJSONResponse(null, res, resultJSON);
    });
}


function parseStorageOSDAvgBW(osdName, source, callback){
    var sampleCnt = 10, minsSince = 30, endTime ='now';
    var intervalSecs = 3600;
    var emptyObj = {};

    var tableName, whereClause=[],
        selectArr = ["name", "uuid", "SUM(info_stats.reads)", "SUM(info_stats.writes)", "SUM(info_stats.read_kbytes)",
            "SUM(info_stats.write_kbytes)", "SUM(info_stats.op_r_latency)", "SUM(info_stats.op_w_latency)", "COUNT(info_stats)" ];

    tableName = 'StatTable.ComputeStorageOsd.info_stats';



    var name = source +":"+osdName;

    whereClause = [
        {'Source':source},
        {'name':name}
    ];
    whereClause = stMonUtils.formatAndClause(whereClause);
    var timeObj = stMonUtils.createTimeQueryJsonObj(minsSince, endTime);
    var queryJSON = stMonUtils.formatQueryStringWithWhereClause(tableName, whereClause, selectArr, timeObj, true);
    delete queryJSON['limit'];
    delete queryJSON['dir'];
    var selectEleCnt = queryJSON['select_fields'].length;
    queryJSON['select_fields'].splice(selectEleCnt - 1, 1);
    stMonUtils.executeQueryString(queryJSON,
        commonUtils.doEnsureExecution(function(err, resultJSON)  {
            if(resultJSON !== 'undefined' && typeof resultJSON['value'] !== "undefined") {
                resultJSON = formatOsdAvgBWLoadXMLData(resultJSON);
                if(resultJSON.length > 0){
                    callback(resultJSON[0]);
                }else{
                   results = new Object();
                   results['Date']= new Date();
                   results['name']= name;
                   results['reads']= "Not Available";
                   results['writes']= "Not Available";
                   results['reads_kbytes']= "Not Available";
                   results['writes_kbytes']= "Not Available";
                   results['op_r_latency']= "Not Available";
                   results['op_w_latency']= "Not Available";
                   callback(results);
                }
            }else{
               results = new Object();
               results['Date']= new Date();
               results['name']= name;
               results['reads']= "Not Available";
               results['writes']= "Not Available";
               results['reads_kbytes']= "Not Available";
               results['writes_kbytes']= "Not Available";
               results['op_r_latency']= "Not Available";
               results['op_w_latency']= "Not Available";
               callback(results);

            }
        }, global.DEFAULT_MIDDLEWARE_API_TIMEOUT));
}

function formatOsdAvgBWLoadXMLData(resultJSON){
    var results = [];
    var counter = 0,secTime;
    try {
        resultJSON = resultJSON['value'];
        counter = resultJSON.length;

        for (var i = 0; i < counter; i++) {
            results[i] = {};
            results[i]['Date']= new Date();

            results[i]['name'] = resultJSON[i]['name'];
            results[i]['uuid'] = resultJSON[i]['uuid'];

            var count = resultJSON[i]['COUNT(info_stats)'];

            results[i]['sampleCnt'] = count;
            var reads = resultJSON[i]['SUM(info_stats.reads)'];
            results[i]['reads'] = reads/count;

            var writes= resultJSON[i]['SUM(info_stats.writes)'];
            results[i]['writes'] = writes/count;

            var reads_kbytes= resultJSON[i]['SUM(info_stats.read_kbytes)'];
            results[i]['reads_kbytes'] = reads_kbytes/count;

            var writes_kbytes= resultJSON[i]['SUM(info_stats.write_kbytes)'];
            results[i]['writes_kbytes'] = writes_kbytes/count;

            var op_r_latency = resultJSON[i]['SUM(info_stats.op_r_latency)'];
            results[i]['op_r_latency'] = op_r_latency/count;

            var op_w_latency = resultJSON[i]['SUM(info_stats.op_w_latency)'];
            results[i]['op_w_latency'] = op_w_latency/count;
        }
       
        return results;
    } catch (e) {
        logutils.logger.error("In formatOsdAvgBWLoadXMLData(): JSON Parse error: " + e);
        return null;
    }
}

function getStorageOsdsUVEsList (req, res){
    postParseStorageOSDAvgBW(function(resultJSON){
            commonUtils.handleJSONResponse(null, res, resultJSON);
        });
}
function processStorgaeOsdsNames(callback){
     var results = [];
    var url = '/analytics/uves/storage-osds';

    opServer.api.get(url, function(err, data) {
        if (err || (null == data)) {
            callback(results)
        } else {
            callback(jsonPath(data,"$..name"));
        }
    });
}
function createClause(fieldName, fieldValue, operator){
    var whereClause = {};
    if (fieldValue != null) {
        whereClause = {};
        whereClause.name = fieldName;
        whereClause.value = fieldValue;
        whereClause.op = operator;
    }
    return whereClause;
}

function postParseStorageOSDAvgBW(callback){
    var sampleCnt = 10, minsSince = 30, endTime ='now';
    var intervalSecs = 3600;
    var emptyObj = {};

    var tableName, whereClause=[],
        selectArr = ["name", "uuid", "SUM(info_stats.reads)", "SUM(info_stats.writes)", "SUM(info_stats.read_kbytes)",
            "SUM(info_stats.write_kbytes)", "SUM(info_stats.op_r_latency)", "SUM(info_stats.op_w_latency)", "COUNT(info_stats)" ];

    tableName = 'StatTable.ComputeStorageOsd.info_stats';
    processStorgaeOsdsNames(function(sourceJSON){
            if (sourceJSON != undefined && sourceJSON.length > 0) {
                var count = sourceJSON.length;
                for (i = 0; i < count; i += 1) {
                    var whereClauseArray = [];
                    whereClauseArray.push(createClause('name', sourceJSON[i], 1));
                    whereClause.push(whereClauseArray);
                }
                var timeObj = stMonUtils.createTimeQueryJsonObj(minsSince, endTime);
                var timeGran = stMonUtils.getTimeGranByTimeSlice(timeObj, sampleCnt);
                var queryJSON = stMonUtils.formatQueryStringWithWhereClause(tableName, whereClause, selectArr, timeObj, true);
                delete queryJSON['limit'];
                delete queryJSON['dir'];
                var selectEleCnt = queryJSON['select_fields'].length;
                queryJSON['select_fields'].splice(selectEleCnt - 1, 1);
                queryJSON['select_fields'].splice(selectEleCnt - 1, 1);
                stMonUtils.executeQueryString(queryJSON,
                commonUtils.doEnsureExecution(function(err, resultJSON)  {
                    if(resultJSON !== 'undefined' && typeof resultJSON['value'] !== "undefined") {
                        resultJSON = formatOsdAvgBWLoadXMLData(resultJSON);
                        callback(resultJSON);
                    }
                }, global.DEFAULT_MIDDLEWARE_API_TIMEOUT));
            }else{
                callback(emptyObj);
            }
        });
}




/* List all public functions */
exports.getStorageOSDsSummary=getStorageOSDsSummary;
exports.parseStorageOSDSummary=parseStorageOSDSummary;

exports.getStorageOSDStatus=getStorageOSDStatus;

exports.getStorageOSDTree=getStorageOSDTree;

exports.getStorageOSDDetails=getStorageOSDDetails;

exports.getOSDVersion = getOSDVersion;
exports.parseOSDFromTree=parseOSDFromTree;
exports.parseOSDVersion=parseOSDVersion;
exports.parseOSDFromPG = parseOSDFromPG;
exports.parseHostFromOSD=parseHostFromOSD;
exports.parseRootFromHost=parseRootFromHost;
exports.getStorageOSDFlowSeries= getStorageOSDFlowSeries;
exports.getStorageOsdDiskFlowSeries=getStorageOsdDiskFlowSeries;
exports.getStorageOSDAvgBW= getStorageOSDAvgBW;
exports.getAvgBWHostToOSD=getAvgBWHostToOSD;

exports.getStorageOsdsUVEsList=getStorageOsdsUVEsList;





