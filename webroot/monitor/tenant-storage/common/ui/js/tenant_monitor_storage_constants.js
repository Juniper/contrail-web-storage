/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

var color_info = '#1F77B4',
    color_success = '#2CA02C',
    color_warn = '#FF7F0E',
    color_imp = '#D62728';

//Global refresh timeout in ms
var refreshTimeout = 30000;
var ACTIVITY_QUERY_TIMEOUT = 60000;

var tenantStorageChartsInitializationStatus = {
    disks: false,
    host_tree: false,
    thrptChart: false,
    iopsChart: false,
    latencyChart: false
};

var disksTabs = ['Scatter Plot', 'Host Tree', 'Details'];
var disksTabStrip = 'osdsTabStrip';
var storageTreeChartExpandedNodes = [];

$.extend(globalObj['dataSources'], {
    'storageDisksDS': {
        ongoing:false,
        lastUpdated:null,
        populateFn:['tenantStorageUtils.getAllDisks'],
        deferredObj:null,
        dataSource:null
    },
    'storageDisksTreeDS': {
        ongoing:false,
        lastUpdated:null,
        populateFn:['tenantStorageUtils.getDisksTree'],
        deferredObj:null,
        dataSource:null
    }});

var tenantMonitorStorageUrls = {
    CLUSTER_STATUS: '/api/tenant/storage/cluster/status',
    MONITORS_SUMMARY: '/api/tenant/storage/cluster/monitors/summary',
    DF_STATUS: '/api/tenant/storage/cluster/df/status',
    CLUSTER_USAGE: '/api/tenant/storage/cluster/usage',
    POOLS_SUMMARY: '/api/tenant/storage/cluster/pools/summary',
    DISK_STATUS: '/api/tenant/storage/cluster/osd/status',
    DISK_DETAILS: '/api/tenant/storage/cluster/osd/details?name={0}',
    DISKS_SUMMARY: '/api/tenant/storage/cluster/osds/summary',
    DISKS_TREE: '/api/tenant/storage/cluster/osds/tree',
    THROUGHPUT_SUMMARY: '/api/tenant/storage/cluster/throughput/summary',
    CLUSTER_LATENCY: '/api/tenant/storage/cluster/latency',
    DISK_ACTIVITY_NOW: '/api/tenant/storage/cluster/osd/flow-series?osdName={0}&minsSince=10&sampleCnt=10&hostName={1}&endTime=now',
    RAW_DISK_ACTIVITY_NOW: '/api/tenant/storage/cluster/disk/flow-series?diskName={0}&minsSince=10&sampleCnt=10&hostName={1}&endTime=now',
    CLUSTER_DISK_ACTIVITY_NOW: '/api/tenant/storage/cluster/osd/activity?minsSince=15&sampleCnt=10&endTime=now',
    CLUSTER_RAW_DISK_ACTIVITY_NOW: '/api/tenant/storage/cluster/disk/activity?minsSince=15&sampleCnt=10&endTime=now'
};
