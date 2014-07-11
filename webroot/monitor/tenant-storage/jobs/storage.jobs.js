/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

var storageConfig = require('../../../common/js/storage.config.global');

var util = require('util'),
    qs = require('querystring'),
    async = require('async'),
    jsonPath = require('JSONPath').eval,
    storageRest= require('../../../common/api/storage.rest.api'),
    assert = require('assert'),
    redisPub = require(storageConfig.core_path +'/src/serverroot/jobs/core/redisPub');


function processStorageClusterStatus(pubChannel, saveChannelKey, jobData, done){
    
    url = "/status";
    console.log("URL"+url);
    storageRest.apiGet(url, jobData, function (error, resultJSON) {

            if(!error && (resultJSON)) {
                console.log("resultJSON"+resultJSON);
                console.log("error"+error);
                     redisPub.publishDataToRedis(pubChannel, saveChannelKey,
                        global.HTTP_STATUS_RESP_OK,
                        JSON.stringify(resultJSON),
                        JSON.stringify(resultJSON),
                        0, 0, done);
            } else {
                  redisPub.publishDataToRedis(pubChannel, saveChannelKey,
                                              global.HTTP_STATUS_INTERNAL_ERROR,
                                        global.STR_CACHE_RETRIEVE_ERROR,
                                        global.STR_CACHE_RETRIEVE_ERROR, 0,
                                        0, done);
            }
        });   
}

exports.processStorageClusterStatus = processStorageClusterStatus;
