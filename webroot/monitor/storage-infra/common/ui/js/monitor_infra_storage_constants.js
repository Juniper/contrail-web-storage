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
var storageSummaryChartsInitializationStatus = {storageNode:false};


var monitorInfraStorageUrls = {
    STORAGENODES_SUMMARY    : '/api/admin/monitor/infrastructure/storagenodes/summary',
    STORAGENODE_DETAILS     : '/api/admin/monitor/infrastructure/storagenodes/details?hostname={0}',
    DISK_DETAILS            : '/api/tenant/storage/cluster/osd/details?name={0}'
}

/*
hack for now
monitorInfraUrls is defined in controller.
for storage only installations, define it so sysinfo widget API call pass through
 */
if( typeof monitorInfraUrls === 'undefined'){
    monitorInfraUrls = {
        'QUERY' : '/api/admin/reports/query'
    };
}

var storageInfraAlertMsgs = {
    DISK_DOWN           : "{0:Disk;Disks} down - {1}",
    DISK_DOWN_LIST      : "{0} down",
    DISK_OUT            : "{0:Disk;Disks} out of cluster - {1}",
    DISK_OUT_LIST       : "{0} out of cluster"
}
