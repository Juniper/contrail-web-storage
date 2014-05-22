/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

var storageJobApi = require('./storage.jobs');

var jobsProcess = module.exports;

jobsProcess.processStorageClusterStatusRequestByJob =
    function(pubChannel, saveChannelKey, jobData, done) {
    storageJobApi.processStorageClusterStatus(pubChannel, saveChannelKey, jobData, done);
}

