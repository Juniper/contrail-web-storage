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
    jsonPath = require('JSONPath').eval,
    expireTime= storageApi.expireTimeSecs,
    storagePoolsApi = module.exports;

var redis = require("redis"),
    redisServerPort = (config.redis_server_port) ? config.redis_server_port : global.DFLT_REDIS_SERVER_PORT,
    redisServerIP = (config.redis_server_ip) ? config.redis_server_ip : global.DFLT_REDIS_SERVER_IP,
    redisClient = redis.createClient(redisServerPort, redisServerIP);

function getStoragePGPoolsSummary(req, res, appData){

    var dataObjArr = [];
    var resultJSON = [];

    urlOSDDump = storageApi.url.osdDump;//"/osd/dump";
    commonUtils.createReqObj(dataObjArr, urlOSDDump, null, null,
        null, null, appData);

    urlDF = storageApi.url.df;
    commonUtils.createReqObj(dataObjArr, urlDF, null, null,
                                         null, null, appData);
    cookieURL = "/api/tenant/storage/cluster/pools/summary";


    redisClient.get(cookieURL, function(error, cachedJSONStr) {
        if (error || cachedJSONStr == null) {
            async.map(dataObjArr,
                commonUtils.getAPIServerResponse(storageRest.apiGet, true),
                function(err, data) {
                    resultJSON = parseStoragePGPoolsData(data);
                    redisClient.setex(cookieURL, expireTime, JSON.stringify(resultJSON));
                    commonUtils.handleJSONResponse(err, res, resultJSON);
                });
        } else {
            commonUtils.handleJSONResponse(null, res, JSON.parse(cachedJSONStr));
        }
    });
}

function parseStoragePGPoolsData(poolJSON){
    var resultJSON = {};
        var pools = jsonPath(poolJSON[0], "$..pools");
        if(pools != undefined && pools.length >0 ) {
            var odf = poolJSON[1];
            var poolMapJSON = new Object();
            poolMapJSON.pools = parsePoolsData(pools[0], odf);
            resultJSON = poolMapJSON;
        }
    return resultJSON;
}

function parsePoolsData(pools, odf){
    var nodeCnt= pools.length;
    for (i = 0; i < nodeCnt; i++) { 
        var pId=jsonPath(pools,"$["+i+"].pool")[0];
        var dfCnt = jsonPath(odf,"$.output.pools.length")[0];
        for(j=0; j< dfCnt; j++){
            var dfPoolId= jsonPath(odf,"$.output.pools["+j+"].id")[0];
            if( pId == dfPoolId){
                 pools[i]['name']=jsonPath(odf,"$.output.pools["+j+"].name")[0];
                 pools[i]['stats']=jsonPath(odf,"$.output.pools["+j+"].stats")[0];
            }
        }
     }
    return pools;
}

function getStoragePGPoolDetails(req, res, appData){

    var dataObjArr = [];
    var resultJSON = [];
    var pool_name = req.param('name');
    urlPools = storageApi.url.pgDumpPools;
    commonUtils.createReqObj(dataObjArr, urlPools, null, null, 
                                         null, null, appData);

    urlDF = storageApi.url.df;
    commonUtils.createReqObj(dataObjArr, urlDF, null, null, 
                                         null, null, appData);

    async.map(dataObjArr,
                      commonUtils.getAPIServerResponse(storageRest.apiGet, true),
                      function(err, data) {
                resultJSON = parseStoragePGPoolDetails(pool_name, data);        
                commonUtils.handleJSONResponse(err, res, resultJSON);
            });
}


function parseStoragePGPoolDetails(name, poolJSON){
   resultJSON = parseStoragePGPoolsData(poolJSON);
    var pDetails = jsonPath(resultJSON, "$.pools[?(@.name=='"+name+"')]")[0];
    var pJSON = {};
        pJSON['pool_details'] = pDetails;
    return pJSON;
}


function getStoragePoolFlowSeries (req, res, appData) {
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
    var poolName= req.query['poolName'];

    var name = source +":"+poolName;

    var tableName, whereClause,
        selectArr = ["T", "name", "info_stats.reads", "info_stats.writes", "info_stats.read_kbytes","info_stats.write_kbytes" ];

    tableName = 'StatTable.ComputeStoragePool.info_stats';
    selectArr.push("info_stats.pool");
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
    stMonUtils.executePostQueryString(queryJSON, appData,
        commonUtils.doEnsureExecution(function(err, resultJSON)  {
            resultJSON= formatFlowSeriesForPoolStats(resultJSON, timeObj, timeGran);
            commonUtils.handleJSONResponse(err, res, resultJSON);
        }, global.DEFAULT_MIDDLEWARE_API_TIMEOUT));

}


function formatFlowSeriesForPoolStats(storageFlowSeriesData, timeObj, timeGran)
{
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
            resultJSON['summary']['uuid'] = storageFlowSeriesData['value'][0]['uuid'];
            resultJSON['summary']['pool_name'] = storageFlowSeriesData['value'][0]['info_stats.pool'];
            resultJSON['flow-series'] = formatPoolSeriesLoadXMLData(storageFlowSeriesData);
            return resultJSON;
        } catch (e) {
            logutils.logger.error("In formatFlowSeriesForPoolStats(): JSON Parse error: " + e);
            return null;
        }
    }
}

function formatPoolSeriesLoadXMLData (resultJSON)
{
    var results = [];
    var counter = 0, secTime;
    try {
        resultJSON = resultJSON['value'];
        counter = resultJSON.length;
        for (var i = 0; i < counter; i++) {
            results[i] = {};
            secTime = Math.floor(resultJSON[i]['T'] / 1000);
            results[i]['date']= new Date(secTime);
            results[i]['MessageTS'] = resultJSON[i]['T'];
            results[i]['reads'] = resultJSON[i]['info_stats.reads'];
            results[i]['writes'] = resultJSON[i]['info_stats.writes'];
            results[i]['reads_kbytes'] = resultJSON[i]['info_stats.read_kbytes'];
            results[i]['writes_kbytes'] = resultJSON[i]['info_stats.write_kbytes'];

        }
        return results;
    } catch (e) {
        logutils.logger.error("In formatPoolSeriesLoadXMLData(): JSON Parse error: " + e);
        return null;
    }
}

/* List all public functions */
exports.getStoragePGPoolsSummary=getStoragePGPoolsSummary;
exports.getStoragePGPoolDetails=getStoragePGPoolDetails;
exports.getStoragePoolFlowSeries= getStoragePoolFlowSeries;



