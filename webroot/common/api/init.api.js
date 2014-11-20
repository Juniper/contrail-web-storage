/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */


var jobsApi = require(process.mainModule.exports["corePath"]  +'/src/serverroot/jobs/core/jobs.api'),
	storageGlobal = require('../config/storage.global'),
	initApi = module.exports;

function createStorageSummaryJob (){
    var appData = {};
    var jobObj = {};
    var url = '/storage-summary';
    jobObj['jobName'] = storageGlobal.STR_GET_STORAGE_SUMMARY;
    jobObj['url'] = url;
    jobObj['firstRunDelay'] = 2 * 60 * 1000;
    jobObj['runCount'] = 0;
    jobObj['orchModel'] = 'openstack';
    jobObj['nextRunDelay'] = storageGlobal.STORAGE_SUMM_JOB_REFRESH_TIME;
    jobObj['appData'] = appData;
    jobsApi.createJobAtInit(jobObj);
}

function createStorageOSDsJob (){
    var appData = {};
    var jobObj = {};
    var url = '/storage-osds-summary';
    jobObj['jobName'] = storageGlobal.STR_GET_STORAGE_OSD_SUMMARY;
    jobObj['url'] = url;
    jobObj['firstRunDelay'] = 2 * 60 * 1000;
    jobObj['runCount'] = 0;
    jobObj['orchModel'] = 'openstack';
    jobObj['nextRunDelay'] = storageGlobal.STORAGE_SUMM_JOB_REFRESH_TIME;
    jobObj['appData'] = appData;
    jobsApi.createJobAtInit(jobObj);
}


function featureInit(){
    createStorageSummaryJob();
    createStorageOSDsJob();
}

exports.createStorageSummaryJob = createStorageSummaryJob;
exports.createStorageOSDsJob = createStorageOSDsJob;
exports.featureInit = featureInit;