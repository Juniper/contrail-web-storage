/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

if (!module.parent) {
    console.log("Please don't call me directly.");
    process.exit(1);
}

global = {};

/* Storage Cluster golbal variables */
global.STR_STORAGE_TYPE_CLUSTER = 'getStorageClusterStatus';

module.exports = global;

