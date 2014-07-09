/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */
var storageConfig = require('../../../common/js/storage.config.global');

var storageGlobal = require('../../../common/js/storage.global');
var storageApi= require('../../../common/api/storage.api.constants');

var cacheApi = require(storageConfig.core_path +
                    '/src/serverroot/web/core/cache.api'),
    logutils = require(storageConfig.core_path + '/src/serverroot/utils/log.utils'),
    global = require(storageConfig.core_path + '/src/serverroot/common/global'),
    logutils = require(storageConfig.core_path + '/src/serverroot/utils/log.utils'),
    stMonUtils= require('../../../common/api/utils/storage.utils'),
    commonUtils = require(storageConfig.core_path +
                        '/src/serverroot/utils/common.utils'),
    storageRest= require('../../../common/api/storage.rest.api'),
    async = require('async'),
    jsonPath = require('JSONPath').eval,

storageDashboardApi = module.exports;

function getStorageClusterStatus(req, res ){
    url = storageApi.url.status;//"/status";
    logutils.logger.debug("get data:"+url);
    cacheApi.queueDataFromCacheOrSendRequest(req, res, storageGlobal.STR_JOB_TYPE_CACHE,
        storageGlobal.STR_STORAGE_TYPE_CLUSTER, url,
                                             0, 1, 0, -1, true, null);
}


function getStorageClusterHealthStatus(req, res, appData){
    url = storageApi.url.health;//"/health";
   storageRest.apiGet(url, appData, function (error, resultJSON) {
        if(!error && (resultJSON)) {
            var resultJSON = parseStorageHealthStatusData(resultJSON);
            commonUtils.handleJSONResponse(null, res, resultJSON);
        } else {
            commonUtils.handleJSONResponse(error, res, null);
        }
    });
   
}

function parseStorageHealthStatusData(resultJSON){
    var emptyObj = {};  
        var healthJSON = {};
        var status = jsonPath(resultJSON, "$..status");
        var summary= jsonPath(resultJSON, "$..summary");
        var details= jsonPath(resultJSON, "$..detail");
        if (status.length > 0 ) {
            var temp = new Object();
            temp["overall_status"] = status[0];
            temp["details"] = details[0];
            temp["summary"] = summary[0];
            healthJSON['cluster_status']= temp;
            return healthJSON;
        }
        return emptyObj;
}

function getStorageClusterUsageData(req, res, appData){
    url = storageApi.url.df;//"/df";
    storageRest.apiGet(url, appData, function (error, resultJSON) {
        if(!error && (resultJSON)) {
            var resultJSON = parseStorageClusterUsageData(resultJSON);
            commonUtils.handleJSONResponse(null, res, resultJSON);
        } else {
            commonUtils.handleJSONResponse(error, res, null);
        }
    });  
}

function parseStorageClusterUsagaeData(usageJSON){
   return usageJSON;
}



function getStorageClusterDFStatus(req, res, appData){
    url = storageApi.url.df;
    storageRest.apiGet(url, appData, function (error, resultJSON) {
        if(!error && (resultJSON)) {
            var resultJSON = parseStorageDFData(resultJSON);
            commonUtils.handleJSONResponse(null, res, resultJSON);
        } else {
            commonUtils.handleJSONResponse(error, res, null);
        }
    });
}

function parseStorageDFData(dfDataJSON){
    var dfJSON ={};
    dfJSON['utilization_stats']= dfDataJSON;
    return dfJSON;
}

function splitString2Array(strValue, delimiter)
{
    var strArray = strValue.split(delimiter),
        count = strArray.length;
    for (var i = 0; i < count; i++) {
        strArray[i] = strArray[i].trim();
    }
    return strArray;
};

function createClause(fieldName, fieldValue, operator)
{
    var whereClause = {};
    if (fieldValue != null) {
        whereClause = {};
        whereClause.name = fieldName;
        whereClause.value = fieldValue;
        whereClause.op = operator;
    }
    return whereClause;
};

function getStorageClusterOSDActivity(req, res,appData){
    var source = req.query['source'];
    var selectArray = splitString2Array(source, ',');
    var sampleCnt = req.query['sampleCnt'];
    var minsSince = req.query['minsSince'];
    var endTime = req.query['endTime'];

    var tableName, whereClause=[],
        selectArr = ["T=60", "SUM(info_stats.reads)", "SUM(info_stats.writes)", "SUM(info_stats.read_kbytes)","SUM(info_stats.write_kbytes)",
            "SUM(info_stats.op_r_latency)", "SUM(info_stats.op_w_latency)"];

    tableName = 'StatTable.ComputeStorageOsd.info_stats';

    var count = selectArray.length;
    for (i = 0; i < count; i += 1) {
        var whereClauseArray=[];
        whereClauseArray.push(createClause('Source', selectArray[i], 1));
        whereClause.push(whereClauseArray);
    }

    var timeObj = stMonUtils.createTimeQueryJsonObj(minsSince, endTime);
    var timeGran = stMonUtils.getTimeGranByTimeSlice(timeObj, sampleCnt);
    var queryJSON = stMonUtils.formatQueryStringWithWhereClause(tableName, whereClause, selectArr, timeObj, true);
    delete queryJSON['limit'];
    delete queryJSON['dir'];
    var selectEleCnt = queryJSON['select_fields'].length;
    queryJSON['select_fields'].splice(selectEleCnt - 1, 1);
    stMonUtils.executeQueryString(queryJSON,
        commonUtils.doEnsureExecution(function(err, resultJSON)  {
            resultJSON= parseStorageClusterOSDActivityData(resultJSON, timeObj, timeGran);
            commonUtils.handleJSONResponse(err, res, resultJSON);
        }, global.DEFAULT_MIDDLEWARE_API_TIMEOUT));

}

function parseStorageClusterOSDActivityData(activityJSON, timeObj, timeGran){
    var len = 0;
    var resultJSON = {};
    if(activityJSON['value'].length > 0) {
       try {
           resultJSON['summary'] = {};
           resultJSON['summary']['start_time'] = timeObj['start_time'];
           resultJSON['summary']['end_time'] = timeObj['end_time'];
           resultJSON['summary']['timeGran_microsecs'] = Math.floor(timeGran) * global.MILLISEC_IN_SEC * global.MICROSECS_IN_MILL;
           resultJSON['summary']['aggregation_slot']='60 Seconds';
              resultJSON['flow-series'] = formatOsdSeriesLoadXMLData(activityJSON);
              return resultJSON;
            } catch (e) {
                logutils.logger.error("In parseStorageClusterOSDActivityData(): JSON Parse error: " + e);
                return null;
            }
       }
}

function formatOsdSeriesLoadXMLData(resultJSON){
    var results = [];
    var counter = 0,secTime;
    try {
        resultJSON = resultJSON['value'];
        counter = resultJSON.length;
        for (var i = 0; i < counter; i++) {
            results[i] = {};
            secTime = Math.floor(resultJSON[i]['T='] / 1000);
            results[i]['Date']= new Date(secTime);
            results[i]['MessageTS'] = resultJSON[i]['T'];
            results[i]['total_reads'] = resultJSON[i]['SUM(info_stats.reads)'];
            results[i]['total_writes'] = resultJSON[i]['SUM(info_stats.writes)'];
            results[i]['total_reads_kbytes'] = resultJSON[i]['SUM(info_stats.read_kbytes)'];
            results[i]['total_writes_kbytes'] = resultJSON[i]['SUM(info_stats.write_kbytes)'];
            results[i]['total_op_r_latency'] = resultJSON[i]['SUM(info_stats.op_r_latency)'];
            results[i]['total_op_w_latency'] = resultJSON[i]['SUM(info_stats.op_w_latency)'];
        }
        return results;
    } catch (e) {
        logutils.logger.error("In formatOsdSeriesLoadXMLData(): JSON Parse error: " + e);
        return null;
    }
}

function getStorageClusterPoolActivity(req, res,appData){
    var source = req.query['source'];
    var selectArray = splitString2Array(source, ',');
    var sampleCnt = req.query['sampleCnt'];
    var minsSince = req.query['minsSince'];
    var endTime = req.query['endTime'];


    var tableName, whereClause=[],
        selectArr = ["T=60", "SUM(info_stats.reads)", "SUM(info_stats.writes)", "SUM(info_stats.read_kbytes)","SUM(info_stats.write_kbytes)" ];

    tableName = 'StatTable.ComputeStoragePool.info_stats';

    var count = selectArray.length;
    for (i = 0; i < count; i += 1) {
        var whereClauseArray=[];
        whereClauseArray.push(createClause('Source', selectArray[i], 1));
        whereClause.push(whereClauseArray);
    }

    var timeObj = stMonUtils.createTimeQueryJsonObj(minsSince, endTime);
    var timeGran = stMonUtils.getTimeGranByTimeSlice(timeObj, sampleCnt);
    var queryJSON = stMonUtils.formatQueryStringWithWhereClause(tableName, whereClause, selectArr, timeObj, true);
    delete queryJSON['limit'];
    delete queryJSON['dir'];
    var selectEleCnt = queryJSON['select_fields'].length;
    queryJSON['select_fields'].splice(selectEleCnt - 1, 1);
    stMonUtils.executeQueryString(queryJSON,
        commonUtils.doEnsureExecution(function(err, resultJSON)  {
            resultJSON= parseStorageClusterPoolActivityData(resultJSON, timeObj, timeGran);
            commonUtils.handleJSONResponse(err, res, resultJSON);
        }, global.DEFAULT_MIDDLEWARE_API_TIMEOUT));

}

function parseStorageClusterPoolActivityData(activityJSON, timeObj, timeGran){
    var len = 0;
    var resultJSON = {};
    if(activityJSON['value'].length > 0) {
        try {
            resultJSON['summary'] = {};
            resultJSON['summary']['start_time'] = timeObj['start_time'];
            resultJSON['summary']['end_time'] = timeObj['end_time'];
            resultJSON['summary']['timeGran_microsecs'] = Math.floor(timeGran) * global.MILLISEC_IN_SEC * global.MICROSECS_IN_MILL;
            resultJSON['summary']['aggregation_slot']='60 Seconds';
            resultJSON['flow-series'] = formatPoolSeriesLoadXMLData(activityJSON);
            return resultJSON;
        } catch (e) {
            logutils.logger.error("In parseStorageClusterPoolActivityData(): JSON Parse error: " + e);
            return null;
        }
    }
}

function formatPoolSeriesLoadXMLData(resultJSON){
    var results = [];
    var counter = 0,secTime;
    try {
        resultJSON = resultJSON['value'];
        counter = resultJSON.length;
        for (var i = 0; i < counter; i++) {
            results[i] = {};
            secTime = Math.floor(resultJSON[i]['T='] / 1000);
            results[i]['Date']= new Date(secTime);
            results[i]['MessageTS'] = resultJSON[i]['T'];
            results[i]['reads'] = resultJSON[i]['SUM(info_stats.reads)'];
            results[i]['writes'] = resultJSON[i]['SUM(info_stats.writes)'];
            results[i]['reads_kbytes'] = resultJSON[i]['SUM(info_stats.read_kbytes)'];
            results[i]['writes_kbytes'] = resultJSON[i]['SUM(info_stats.write_kbytes)'];
        }
        return results;
    } catch (e) {
        logutils.logger.error("In formatPoolSeriesLoadXMLData(): JSON Parse error: " + e);
        return null;
    }
}
function getStorageClusterDiskActivity(req, res,appData){
    var source = req.query['source'];
    var selectArray = splitString2Array(source, ',');
    var sampleCnt = req.query['sampleCnt'];
    var minsSince = req.query['minsSince'];
    var endTime = req.query['endTime'];

    var tableName, whereClause=[],
        selectArr = ["T=60", "SUM(info_stats.reads)", "SUM(info_stats.writes)", "SUM(info_stats.read_kbytes)",
            "SUM(info_stats.write_kbytes)", "SUM(info_stats.iops)","SUM(info_stats.bw)" ];

    tableName = 'StatTable.ComputeStorageDisk.info_stats';

    var count = selectArray.length;
    for (i = 0; i < count; i += 1) {
        var whereClauseArray=[];
        whereClauseArray.push(createClause('Source', selectArray[i], 1));
        whereClause.push(whereClauseArray);
    }

    var timeObj = stMonUtils.createTimeQueryJsonObj(minsSince, endTime);
    var timeGran = stMonUtils.getTimeGranByTimeSlice(timeObj, sampleCnt);
    var queryJSON = stMonUtils.formatQueryStringWithWhereClause(tableName, whereClause, selectArr, timeObj, true);
    delete queryJSON['limit'];
    delete queryJSON['dir'];
    var selectEleCnt = queryJSON['select_fields'].length;
    queryJSON['select_fields'].splice(selectEleCnt - 1, 1);
    stMonUtils.executeQueryString(queryJSON,
        commonUtils.doEnsureExecution(function(err, resultJSON)  {
            resultJSON= parseStorageClusterDiskActivityData(resultJSON, timeObj, timeGran);
            commonUtils.handleJSONResponse(err, res, resultJSON);
        }, global.DEFAULT_MIDDLEWARE_API_TIMEOUT));

}

function parseStorageClusterDiskActivityData(activityJSON, timeObj, timeGran){
    var len = 0;
    var resultJSON = {};
    if(activityJSON['value'].length > 0) {
        try {
            resultJSON['summary'] = {};
            resultJSON['summary']['start_time'] = timeObj['start_time'];
            resultJSON['summary']['end_time'] = timeObj['end_time'];
            resultJSON['summary']['timeGran_microsecs'] = Math.floor(timeGran) * global.MILLISEC_IN_SEC * global.MICROSECS_IN_MILL;
            resultJSON['summary']['aggregation_slot']='60 Seconds';
            resultJSON['flow-series'] = formatDiskSeriesLoadXMLData(activityJSON);
            return resultJSON;
        } catch (e) {
            logutils.logger.error("In parseStorageClusterDiskActivityData(): JSON Parse error: " + e);
            return null;
        }
    }
}

function formatDiskSeriesLoadXMLData(resultJSON){
    var results = [];
    var counter = 0,secTime;
    try {
        resultJSON = resultJSON['value'];
        counter = resultJSON.length;
        for (var i = 0; i < counter; i++) {
            results[i] = {};
            secTime = Math.floor(resultJSON[i]['T='] / 1000);
            results[i]['Date']= new Date(secTime);
            results[i]['MessageTS'] = resultJSON[i]['T='];
            results[i]['reads'] = resultJSON[i]['SUM(info_stats.reads)'];
            results[i]['writes'] = resultJSON[i]['SUM(info_stats.writes)'];
            results[i]['reads_kbytes'] = resultJSON[i]['SUM(info_stats.read_kbytes)'];
            results[i]['writes_kbytes'] = resultJSON[i]['SUM(info_stats.write_kbytes)'];
            results[i]['iops'] = resultJSON[i]['SUM(info_stats.iops)'];
            results[i]['bw'] = resultJSON[i]['SUM(info_stats.bw)'];
        }
        return results;
    } catch (e) {
        logutils.logger.error("In formatDiskSeriesLoadXMLData(): JSON Parse error: " + e);
        return null;
    }
}

/* List all public functions */
exports.getStorageClusterStatus = getStorageClusterStatus;
exports.getStorageClusterDFStatus = getStorageClusterDFStatus;
exports.getStorageClusterHealthStatus = getStorageClusterHealthStatus;
exports.getStorageClusterOSDActivity = getStorageClusterOSDActivity;
exports.getStorageClusterPoolActivity = getStorageClusterPoolActivity;
exports.getStorageClusterDiskActivity = getStorageClusterDiskActivity;
exports.getStorageClusterUsageData = getStorageClusterUsageData;