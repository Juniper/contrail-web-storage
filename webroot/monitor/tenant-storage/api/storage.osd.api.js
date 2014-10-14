/*
 * Copyright (c) 2013 Juniper Networks, Inc. All rights reserved.
 */

var storageApi= require('../../../common/api/storage.api.constants');

var commonUtils = require(process.mainModule.exports["corePath"] +
                    '/src/serverroot/utils/common.utils'),
    global = require(process.mainModule.exports["corePath"] + '/src/serverroot/common/global'),
    config = require(process.mainModule.exports["corePath"] + '/config/config.global.js'),
    logutils = require(process.mainModule.exports["corePath"] + '/src/serverroot/utils/log.utils'),
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

function processStorageOSDList(res, appData, callback){
    var urlOSDList = "/cluster/osd/ceph/summary/list";
    dataObjArr = getOSDListURLs(appData);
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


function getStorageOSDSummary(req, res, appData){
    processStorageOSDList(res, appData, function(error,res,data){
        parseStorageOSDSummary(data, function(resultJSON){
            commonUtils.handleJSONResponse(error, res, resultJSON);
        });
    });
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

function parseOSDFromTree(osdDump, osdTree){
    var osds = jsonPath(osdDump, "$..osds")[0];
    var nodeCnt= osds.length;
    var osdList=[];
    var osdDumpCnt = jsonPath(osdDump,"$.output.osds.length")[0];

    for (i = 0; i < nodeCnt; i++) {
        var treeId=osdTree[i].id;
        for(j=0; j< osdDumpCnt; j++){
            var dumpOSDId= jsonPath(osdDump,"$.output.osds["+j+"].osd")[0];
            var temp = new Object();
            if( treeId == dumpOSDId){
                var status= osdTree[i].status;
                temp['status'] = osdTree[i].status;
                temp['name'] = osdTree[i].name;
                temp['exists'] = osdTree[i].exists;
                temp['type_id'] = osdTree[i].type_id;
                temp['reweight'] = osdTree[i].reweight;
                temp['crush_weight'] = osdTree[i].crush_weight;
                temp['depth'] = osdTree[i].depth;
                temp['type'] = osdTree[i].type;
                temp['id'] = osdTree[i].id;

                temp['heartbeat_back_addr']=jsonPath(osdDump,"$.output.osds["+j+"].heartbeat_back_addr")[0];
                temp['heartbeat_front_addr']=jsonPath(osdDump, "$.output.osds["+j+"].heartbeat_front_addr")[0];
                temp['public_addr']=jsonPath(osdDump, "$.output.osds["+j+"].public_addr")[0];
                temp['cluster_addr']=jsonPath(osdDump, "$.output.osds["+j+"].cluster_addr")[0];
                temp['uuid']=jsonPath(osdDump, "$.output.osds["+j+"].uuid")[0];
                temp['down_at']=jsonPath(osdDump, "$.output.osds["+j+"].down_at")[0];
                temp['up_from']=jsonPath(osdDump, "$.output.osds["+j+"].up_from")[0];
                temp['lost_at']=jsonPath(osdDump, "$.output.osds["+j+"].lost_at")[0];
                temp['up_thru']=jsonPath(osdDump, "$.output.osds["+j+"].up_thru")[0];
                custer_status= jsonPath(osdDump, "$.output.osds["+i+"].in")[0]

                if(custer_status==1){
                    temp['cluster_status']='in';
                }else{
                    temp['cluster_status']='out';
                }
                temp['up']=jsonPath(osdDump, "$.output.osds["+i+"].up")[0];
                temp['in']=custer_status;
                temp['state']=jsonPath(osdDump, "$.output.osds["+i+"].state")[0];
                temp['last_clean_begin']=jsonPath(osdDump, "$.output.osds["+i+"].last_clean_begin")[0];
                temp['last_clean_end']=jsonPath(osdDump, "$.output.osds["+i+"].last_clean_end")[0];

                var dumpOSDId= jsonPath(osdDump,"$.output.osd_xinfo["+j+"].osd")[0];
                if( treeId == dumpOSDId){
                    temp['osd_xinfo']=jsonPath(osdDump,"$.output.osd_xinfo["+j+"]")[0];

                }
                osdList.push(temp);
            }
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

function getStorageOSDDetails(req, res, appData){
    var resultJSON = [];
    var osd_name = req.param('name');
    processStorageOSDList(res, appData, function(error,res,data){
        parseStorageOSDSummary(data, function(resultJSON){
            var osdDetails = jsonPath(resultJSON, "$..osds[?(@.name=='"+osd_name+"')]")[0];
            var osdJSON = {};
            osdJSON['osd_details'] = osdDetails;
            commonUtils.handleJSONResponse(error, res, osdJSON);
        });
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

function getStorageOSDTree(req, res, appData){
    processStorageOSDList(res, appData, function(error,res,data){
        parseStorageOSDTree(data, function(resultJSON){
            commonUtils.handleJSONResponse(error, res, resultJSON);
        });
    });
 
}

function parseStorageOSDTree(osdJSON, callback){
    var emptyObj = {};  
    var osdList={};
    var osdPG= osdJSON[0];
    var osdTree= osdJSON[1];
    var osdDump= osdJSON[2];
    var rootMap = jsonPath(osdTree, "$..nodes[?(@.name=='default')]");
    var hostMap = jsonPath(osdTree, "$..nodes[?(@.type=='host')]");
    var tOSDs = jsonPath(osdTree, "$..nodes[?(@.type=='osd')]");
    var osds = jsonPath(osdDump, "$..osds");

    if (osds != undefined && osds.length > 0) {
        var osdName='undefined';
        for(i=0; i < tOSDs.length;i++){
            if(tOSDs[i].status == "up"){
                osdName= tOSDs[i].name;
                break;
            }
        }
        parseOSDVersion(osdName, function(version){
            var osdMapJSON = new Object();
            osds=parseOSDFromTree(osdDump,tOSDs);
            parseOSDFromPG(osds,osdPG);
            parseOSDFromDump(osds,osdDump);
            getAvgBWHostToOSD(osds,hostMap, function(osds){
                hostMap = parseHostFromOSD(hostMap,osds, version, true);
                osdMapJSON["osd_tree"]= parseRootFromHost(rootMap,hostMap,true);
                osdList= osdMapJSON;
                callback(osdList);
            });
       });
    }
}

function getAvgBWHostToOSD(osds,hostJSON, callback){
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
    async.map(osds, praseStorageOsds, function(err, osds){
        callback(osds);
    });
}

function praseStorageOsds(osd, callback){
    parseStorageOSDAvgBW(osd.name, osd.host, function(resultJSON){
        osd['avg_bw'] = resultJSON;
        callback(null, osd);
    });


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

function parseOSDFromDump(osdTree, osdDump){
    var nodeCnt= osdTree.length;
    var osdDumpCnt = jsonPath(osdDump,"$.output.osds.length")[0];
    for (i = 0; i < nodeCnt; i++) {
        var treeId=osdTree[i].id;
        for(j=0; j< osdDumpCnt; j++){
            var dumpOSDId= jsonPath(osdDump,"$.output.osds["+j+"].osd")[0];
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
                if (custer_status == 1) {
                    osdTree[i]['cluster_status'] = 'in';
                } else {
                    osdTree[i]['cluster_status'] = 'out';
                }
                osdTree[i]['up']=jsonPath(osdDump, "$.output.osds["+i+"].up")[0];
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

    var name = source +":"+osdName;

    var tableName, whereClause,
        selectArr = ["T", "name", "info_stats.reads", "info_stats.writes", "info_stats.read_kbytes","info_stats.write_kbytes"];

    tableName = 'StatTable.ComputeStorageOsd.info_stats';
    selectArr.push("UUID");
    selectArr.push("info_stats.op_r_latency");
    selectArr.push("info_stats.op_w_latency");

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
            resultJSON= formatFlowSeriesForOsdStats(resultJSON, timeObj, timeGran,osdName);
            commonUtils.handleJSONResponse(err, res, resultJSON);
        }, global.DEFAULT_MIDDLEWARE_API_TIMEOUT));

}


function formatFlowSeriesForOsdStats(storageFlowSeriesData, timeObj, timeGran,osdName){
    var len = 0, secTime;
    var resultJSON = {};
    if(storageFlowSeriesData != undefined && storageFlowSeriesData['value']!= undefined && storageFlowSeriesData['value'].length > 0) {
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

function formatOsdSeriesLoadXMLData (resultJSON)
{
    var results = [];
    var counter = 0,secTime;
    try {
        if(resultJSON != undefined && resultJSON['value']!= undefined && resultJSON['value'].length > 0) {
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
            if(resultJSON !== 'undefined' && resultJSON.length > 0) {
                resultJSON = formatOsdAvgBWLoadXMLData(resultJSON);
                callback(resultJSON[0]);
            }else{
                callback(emptyObj);
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
exports.getStorageOSDAvgBW= getStorageOSDAvgBW;





