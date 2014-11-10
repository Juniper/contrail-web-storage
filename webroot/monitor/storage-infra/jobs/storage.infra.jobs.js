/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

var storageApi= require('../../../common/api/storage.api.constants');

var commonUtils = require(process.mainModule.exports["corePath"]  + '/src/serverroot/utils/common.utils'),
    util = require('util'),
    qs = require('querystring'),
    async = require('async'),
    jsonPath = require('JSONPath').eval,
    storageRest= require('../../../common/api/storage.rest.api'),
    assert = require('assert'),
    redisPub = require(process.mainModule.exports["corePath"] +'/src/serverroot/jobs/core/redisPub'),
    infraApi= require('../api/storage.infra.api'),
    storageInfrajobspi = module.exports;

function processStorageSummaryRequestByJob(pubChannel, saveChannelKey, jobData, done){
    processStorageTopologyRawList(null, jobData, function(error,res,data){
        infraApi.parseStorageTopologyTree(data, function(resultJSON){
            if (null != error) {
                redisPub.publishDataToRedis(pubChannel, saveChannelKey,
                    global.HTTP_STATUS_INTERNAL_ERROR,
                    global.STR_CACHE_RETRIEVE_ERROR,
                    global.STR_CACHE_RETRIEVE_ERROR,
                    0, 0, done);
                return;
            }else{
                redisPub.publishDataToRedis(pubChannel, saveChannelKey,
                    global.HTTP_STATUS_RESP_OK,
                    JSON.stringify(resultJSON),
                    JSON.stringify(resultJSON),
                    1, 0, done, jobData);
            }
        });
    });
}

function processStorageTopologyRawList(res, appData, callback){
    var urlOSDList = "/cluster/topology/ceph/list";
    dataObjArr = getTopologyURLs(appData);
    async.map(dataObjArr,
        commonUtils.getAPIServerResponse(storageRest.apiGet, true),
        function(err, resultJSON) {
             callback(err,res,resultJSON);
        });
}

function processStorageTreeRawListRequestByJob(pubChannel, saveChannelKey, jobData, done){
    processStorageTopologyRawList(null, jobData, function(error,res,resultJSON){
         if (null != error) {
            redisPub.publishDataToRedis(pubChannel, saveChannelKey,
                global.HTTP_STATUS_INTERNAL_ERROR,
                global.STR_CACHE_RETRIEVE_ERROR,
                global.STR_CACHE_RETRIEVE_ERROR,
                0, 0, done);
            return;
        }else{
            redisPub.publishDataToRedis(pubChannel, saveChannelKey,
                global.HTTP_STATUS_RESP_OK,
                JSON.stringify(resultJSON),
                JSON.stringify(resultJSON),
                1, 0, done, jobData);
        }
    });
}

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

exports.processStorageSummaryRequestByJob = processStorageSummaryRequestByJob;
exports.processStorageTreeRawListRequestByJob=processStorageTreeRawListRequestByJob;
