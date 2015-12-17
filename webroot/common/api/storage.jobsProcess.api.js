/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

var storageTenantJobApi = require('../../monitor/storage/jobs/storage.tenant.jobs.js');
var storageInfraJobApi = require('../../monitor/infrastructure/jobs/storage.infra.jobs.js');
var jobsProcess = module.exports;

jobsProcess.processStorageClusterStatusRequestByJob =
    function(pubChannel, saveChannelKey, jobData, done) {
    storageTenantJobApi.processStorageClusterStatus(pubChannel, saveChannelKey, jobData, done);
}

jobsProcess.processStorageOSDsSummaryRequestByJob =
    function(pubChannel, saveChannelKey, jobData, done) {
    storageTenantJobApi.processStorageOSDsSummaryRequestByJob(pubChannel, saveChannelKey, jobData, done);
}

jobsProcess.processStorageOSDsTreeRequestByJob =
    function(pubChannel, saveChannelKey, jobData, done) {
        storageTenantJobApi.processStorageOSDsTreeRequestByJob(pubChannel, saveChannelKey, jobData, done);
    }


jobsProcess.processStorageSummaryRequestByJob =
    function(pubChannel, saveChannelKey, jobData, done) {
        storageInfraJobApi.processStorageSummaryRequestByJob(pubChannel, saveChannelKey, jobData, done);
    }
