/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

var global = {};

global.STR_JOB_TYPE_CACHE = 'cache';

/* Storage Cluster golbal variables */
global.STR_STORAGE_TYPE_CLUSTER = 'getStorageClusterStatus';

global.STR_GET_STORAGE_SUMMARY = 'getStorageSummary';

global.STR_GET_STORAGE_OSD_SUMMARY = 'getStorageOSDsSummary';

global.STR_GET_STORAGE_OSD_TREE = 'getStorageOSDsTree';

global.STORAGE_SUMM_JOB_REFRESH_TIME = 5 * 60 * 1000;

global.STORAGE_STATUS_JOB_REFRESH_TIME = 5 * 60 * 1000;

module.exports = global;
