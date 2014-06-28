/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

var color_info = '#1F77B4',
    color_success = '#2CA02C',
    color_warn = '#FF7F0E',
    color_imp = '#D62728';

//Global refresh timeout in ms
var refreshTimeout = 30000;

var tenantStorageChartsInitializationStatus = {
    disks       : false,
    host_tree   : false
}

disksTabs = ['Scatter Plot', 'Host Tree', 'Details'];
disksTabStrip = 'osdsTabStrip';

var tenantMonitorStorageUrls = {
    CLUSTER_STATUS          : '/api/tenant/storage/cluster/status',
    MONITORS_SUMMARY        : '/api/tenant/storage/cluster/monitors/summary',
    DF_STATUS               : '/api/tenant/storage/cluster/df/status',
    POOLS_SUMMARY           : '/api/tenant/storage/cluster/pools/summary',
    DISK_STATUS             : '/api/tenant/storage/cluster/osd/status',
    DISKS_SUMMARY           : '/api/tenant/storage/cluster/osds/summary',
    DISKS_TREE              : '/api/tenant/storage/cluster/osds/tree',
    THROUGHPUT_SUMMARY      : '/api/tenant/storage/cluster/throughput/summary',
    CLUSTER_LATENCY         : '/api/tenant/storage/cluster/latency',
}