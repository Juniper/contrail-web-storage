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

storagePoolsApi = module.exports;

function getStoragePGPoolsSummary(req, res, appData){

    var dataObjArr = [];
    var resultJSON = [];
    urlPools = storageApi.url.pgDumpPools; //"/pg/dump_pools_json";
    commonUtils.createReqObj(dataObjArr, urlPools, null, null, 
                                         null, null, appData);

    urlDF = storageApi.url.df;
    commonUtils.createReqObj(dataObjArr, urlDF, null, null, 
                                         null, null, appData);

    async.map(dataObjArr,
                      commonUtils.getAPIServerResponse(storageRest.apiGet, true),
                      function(err, data) {
                resultJSON = parseStoragePGPoolsData(data);        
                commonUtils.handleJSONResponse(err, res, resultJSON);
            });
}



function parseStoragePGPoolsData(poolJSON){
    var resultJSON = {};
    var pools= jsonPath(poolJSON[0],"$.output")[0];
    var odf= poolJSON[1];
    var poolMapJSON = new Object();
    poolMapJSON['pools']= parsePoolsData(pools, odf);
    resultJSON = poolMapJSON;
    return resultJSON;
}

function parsePoolsData(pools, odf){
    var nodeCnt= pools.length;
    for (i = 0; i < nodeCnt; i++) { 
        var pId=jsonPath(pools,"$["+i+"].poolid")[0];
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
    var source = req.query['hostName'];
    var sampleCnt = req.query['sampleCnt'];
    var minsSince = req.query['minsSince'];
    var endTime = req.query['endTime'];
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
    stMonUtils.executeQueryString(queryJSON,
        commonUtils.doEnsureExecution(function(err, resultJSON)  {
            resultJSON= formatFlowSeriesForPoolStats(resultJSON, timeObj, timeGran);
            commonUtils.handleJSONResponse(err, res, resultJSON);
        }, global.DEFAULT_MIDDLEWARE_API_TIMEOUT));

}


function formatFlowSeriesForPoolStats(storageFlowSeriesData, timeObj, timeGran)
{
    var len = 0;
    var resultJSON = {};
    if(storageFlowSeriesData['value'].length > 0) {
        try {
            resultJSON['summary'] = {};
            resultJSON['summary']['start_time'] = timeObj['start_time'];
            resultJSON['summary']['end_time'] = timeObj['end_time'];
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



