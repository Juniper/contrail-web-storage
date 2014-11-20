/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

var util = require('util'),
    async = require('async'),
    jsonPath = require('JSONPath').eval,
    storageRest= require('../../../common/api/storage.rest.api'),
    storageCommon= require('../../../common/api/storage.common.api'),
    osdApi= require('../api/storage.osd.api'),
    redisPub = require(process.mainModule.exports["corePath"] +'/src/serverroot/jobs/core/redisPub'),
    global = require(process.mainModule.exports["corePath"] + '/src/serverroot/common/global');
    storageTenantJobspi = module.exports;

function processStorageOSDsSummaryRequestByJob(pubChannel, saveChannelKey, jobData, done){
   storageCommon.processStorageTopologyRawList(null, jobData, function(error,res,data){
        osdApi.parseStorageOSDSummary(data, function(resultJSON){
            if (null != error) {
                redisPub.publishDataToRedis(pubChannel, saveChannelKey,
                    global.HTTP_STATUS_INTERNAL_ERROR,
                    global.STR_CACHE_RETRIEVE_ERROR,
                    global.STR_CACHE_RETRIEVE_ERROR,
                    0, 0, done, jobData);
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

function processStorageOSDsTreeRequestByJob(pubChannel, saveChannelKey, jobData, done){
    storageCommon.processStorageTopologyRawList(null, jobData, function(error,res,data){
        osdApi.parseStorageOSDTree(data, function(resultJSON){
            if (null != error) {
                redisPub.publishDataToRedis(pubChannel, saveChannelKey,
                    global.HTTP_STATUS_INTERNAL_ERROR,
                    global.STR_CACHE_RETRIEVE_ERROR,
                    global.STR_CACHE_RETRIEVE_ERROR,
                    0, 0, done, jobData);
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

exports.processStorageOSDsSummaryRequestByJob = processStorageOSDsSummaryRequestByJob;
exports.processStorageOSDsTreeRequestByJob=processStorageOSDsTreeRequestByJob;
