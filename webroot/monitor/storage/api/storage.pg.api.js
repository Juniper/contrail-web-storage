/*
 * Copyright (c) 2013 Juniper Networks, Inc. All rights reserved.
 */

var storageApi= require('../../../common/api/storage.api.constants');


var commonUtils = require(process.mainModule.exports["corePath"] +
                        '/src/serverroot/utils/common.utils'),
    storageRest= require('../../../common/api/storage.rest.api'),
    async = require('async'),
    jsonPath = require('JSONPath').eval,
    storagePGsApi = module.exports;

function getStoragePGSummary(req, res, appData){
    var dataObjArr = [];
    var resultJSON = [];
    urlStatus = storageApi.url.status;
    commonUtils.createReqObj(dataObjArr, urlStatus, null, null, 
                                         null, null, appData);

    urlPGSummary = storageApi.url.pgDumpSummary;//"/pg/dump?dumpcontents=summary";
    commonUtils.createReqObj(dataObjArr, urlPGSummary, null, null, 
                                         null, null, appData);
     async.map(dataObjArr,
                      commonUtils.getAPIServerResponse(storageRest.apiGet, true),
                      function(err, data) {
                resultJSON = parseStoragePGData(data);        
                commonUtils.handleJSONResponse(err, res, resultJSON);
            });
}

function parseStoragePGData(pgJSON){
    var emptyObj = {};  
    var pgMapJSON ={};
    var pgStatusJson= pgJSON[0];
    var pgSummary= pgJSON[1];
    var pgMap = jsonPath(pgStatusJson, "$..pgmap");
    var pgDelta = jsonPath(pgSummary, "$..pg_stats_delta")[0];
    var pgSum= jsonPath(pgSummary, "$..pg_stats_sum")[0];
    var osdSum= jsonPath(pgSummary, "$..osd_stats_sum")[0];

    if (pgMap.length > 0) {
        pgMapJSON['pg_overview']= pgMap[0];
        pgMapJSON['pg_stats_delta']=pgDelta;
        pgMapJSON['pg_stats_sum']=pgSum;
        pgMapJSON['osd_stats_sum']=osdSum;
        pgMapJSON['stamp'] =jsonPath(pgSummary, "$.output.stamp")[0];
        return pgMapJSON;
    }
    return emptyObj;
}

function getStoragePGStuck(req, res, appData){
    url = storageApi.url.pgDumpStuck;//;"/pg/dump_stuck";
     storageRest.apiGet(url, appData, function (error, resultJSON) {
            if(!error && (resultJSON)) {
                var resultJSON = parseStoragePGStuckData(resultJSON);
                commonUtils.handleJSONResponse(null, res, resultJSON);
            } else {
                commonUtils.handleJSONResponse(error, res, null);
            }
        });
}

function parseStoragePGStuckData(pgStuckJSON){
    var resultJSON ={};
   // resultJSON['pg_pools_info']= jsonPath(poolsJSON, "$..output")[0];
    return pgStuckJSON;
}

/* List all public functions */
exports.getStoragePGSummary = getStoragePGSummary;
exports.getStoragePGStuck=getStoragePGStuck;




