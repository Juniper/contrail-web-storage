/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

globalObj['dataSources']['storageNodeDS'] = {
    ongoing:false,
    lastUpdated:null,
    populateFn:['getAllStorageNodes'],
    deferredObj:null,
    dataSource:null
};

var storageNodeTabs = ['details', 'disks', 'monitor'];
var storageNodesDashboardChartInitialized = false;
summaryChartsInitializationStatus['storageNode'] =false;

var monitorInfraStorageUrls = {
    STORAGENODES_SUMMARY    : '/api/admin/monitor/infrastructure/storagenodes/summary',
    STORAGENODE_DETAILS     : '/api/admin/monitor/infrastructure/storagenodes/details?hostname={0}'
}