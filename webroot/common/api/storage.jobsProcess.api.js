/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */
var storageConfig = require('../config/storage.config.global.js');


var storageJobApi = require('../../monitor/tenant-storage/jobs/storage.jobs.js');
var storageInfraJobApi = require('../../monitor/storage-infra/jobs/storage.infra.jobs.js');
var jobsProcess = module.exports;

jobsProcess.processStorageClusterStatusRequestByJob =
    function(pubChannel, saveChannelKey, jobData, done) {
    storageJobApi.processStorageClusterStatus(pubChannel, saveChannelKey, jobData, done);
}


jobsProcess.processStorageSummaryRequestByJob =
    function(pubChannel, saveChannelKey, jobData, done) {
        storageInfraJobApi.processStorageSummaryRequestByJob(pubChannel, saveChannelKey, jobData, done);
    }
