/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

var storageApi= require('../../../common/api/storage.api.constants');

var commonUtils = require(process.mainModule.exports["corePath"]  + '/src/serverroot/utils/common.utils'),
    util = require('util'),
    qs = require('querystring'),
    async = require('async'),
    storageRest= require('../../../common/api/storage.rest.api'),
    storageCommon= require('../../../common/api/storage.common.api'),
    assert = require('assert'),
    redisPub = require(process.mainModule.exports["corePath"] +'/src/serverroot/jobs/core/redisPub'),
    infraApi= require('../api/storage.infra.api'),
    storageInfrajobspi = module.exports;

function processStorageSummaryRequestByJob(pubChannel, saveChannelKey, jobData, done){
    storageCommon.processStorageTopologyRawList(null, jobData, function(error,res,data){
        infraApi.parseStorageTopologyTree(data, function(resultJSON){
            if (null != error) {
                redisPub.publishDataToRedis(pubChannel, saveChannelKey,
                    global.HTTP_STATUS_INTERNAL_ERROR,
                    global.STR_CACHE_RETRIEVE_ERROR,
                    global.STR_CACHE_RETRIEVE_ERROR,
                    0, 0, done,jobData);
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



exports.processStorageSummaryRequestByJob = processStorageSummaryRequestByJob;
