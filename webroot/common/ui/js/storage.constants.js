/*
 * Copyright (c) 2015 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore'
], function (_) {
    var SConstants = function () {
        this.URL_STORAGENODES_SUMMARY = '/api/admin/monitor/infrastructure/storagenodes/summary';
        this.URL_STORAGENODE_DETAILS = '/api/admin/monitor/infrastructure/storagenodes/details?hostname={0}';
        this.URL_STORAGENODE_DISKS = '/api/admin/monitor/infrastructure/storagenode/disks?hostname={0}';

        this.URL_DISKS_SUMMARY = '/api/tenant/storage/cluster/osds/summary';
        this.URL_DISK_DETAILS = '/api/tenant/storage/cluster/osd/details?name={0}';
        this.URL_DISK_STATUS = '/api/tenant/storage/cluster/osd/status';
        this.URL_DISK_ACTIVITY_STATS = '/api/tenant/storage/cluster/osd/flow-series?osdName={0}&minsSince=60&sampleCnt=60&hostName={1}&endTime=now';

        this.URL_STORAGENODE_MONITORS_SUMMARY = '/api/tenant/storage/cluster/monitors/summary';
        this.URL_STORAGENODE_MONITOR_DETAILS = '/api/tenant/storage/cluster/monitor/details?name={0}'; //TBD

        this.URL_POOLS_SUMMARY = '/api/tenant/storage/cluster/pools/summary';
        this.URL_POOL_DETAILS = '/api/tenant/storage/cluster/pool/details?name={0}'; //TBD

        this.URL_CLUSTER_USAGE = '/api/tenant/storage/cluster/usage';
        this.URL_CLUSTER_STATUS = '/api/tenant/storage/cluster/status';
        this.URL_CLUSTER_THROUGHPUT_SUMMARY = '/api/tenant/storage/cluster/throughput/summary';
        this.URL_CLUSTER_DISK_ACTIVITY_STATS = '/api/tenant/storage/cluster/osd/activity?minsSince=60&sampleCnt=60&endTime=now';
        this.URL_CLUSTER_RAW_DISK_ACTIVITY_STATS = '/api/tenant/storage/cluster/disk/activity?minsSince=60&sampleCnt=60&endTime=now';

        this.POOL_PREFIX = {
            VOLUME: 'volumes_',
            IMAGE: 'images_'
        };

        this.POOL_NAMES = {
            DEFAULT: 'volumes, images',
            HDD: 'volumes, images, ' + this.POOL_PREFIX['VOLUME'] + 'hdd',
            SSD: this.POOL_PREFIX['VOLUME'] + 'ssd'
        };

        this.get = function () {
            var args = arguments;
            return cowu.getValueFromTemplate(args);
        };

        this.UMID_DISK_UVE = "uve:{0}:{1}";
        this.UMID_CLUSTER_DISK_UVE = "uve:cluster:disk";
        this.UMID_CLUSTER_USAGE = "uve:cluster:usage"

        this.UCID_PREFIX_MS = "monitor-storage";
        this.UCID_PREFIX_CHARTS = "charts";
        this.UCID_PREFIX_LISTS = "lists";
        this.UCID_PREFIX_MS_LISTS = this.UCID_PREFIX_MS + ":" + this.UCID_PREFIX_LISTS + ":";
        this.UCID_PREFIX_MS_CHARTS = this.UCID_PREFIX_MS + ":" + this.UCID_PREFIX_CHARTS + ":";

        this.UCID_ALL_STORAGENODE_LIST = this.UCID_PREFIX_MS_LISTS + 'all-storagenodes';
        this.UCID_ALL_DISK_LIST = this.UCID_PREFIX_MS_LISTS + "all-disks";
        this.UCID_ALL_DISK_STATUS_LIST = this.UCID_PREFIX_MS_LISTS + "all-disks-status";
        this.UCID_DISK_STATS = this.UCID_PREFIX_MS_CHARTS + "{0}:{1}:disk_stats";
        this.UCID_ALL_MONITOR_LIST = this.UCID_PREFIX_MS_LISTS + "all-monitors";
        this.UCID_ALL_POOL_LIST = this.UCID_PREFIX_MS_LISTS + "all-pools";
        this.UCID_CLUSTER_STATUS_LIST = this.UCID_PREFIX_MS_LISTS + "cluster-status";
        this.UCID_CLUSTER_DISK_STATS = this.UCID_PREFIX_MS_CHARTS + "cluster-disk-stats";
        this.UCID_CLUSTER_USAGE = this.UCID_PREFIX_MS_CHARTS + "cluster-usage"

        this.CHART_ELEMENT_STORAGENODE = 'storagenode';

        this.TAB_ELEMENT_STORAGENODE = 'storagenode';
        this.TAB_ELEMENT_DISK = 'disk';

        this.DETAILS_ELEMENT_DISK = 'disk-details';

        this.TMPL_BASIC_STATS_WIDGET = 'basic-stats-widget-template';
        this.TMPL_DISK_ACTIVITY_STATS = 'disk-activity-stats-template';
        this.TMPL_POOL_STATS = this.TMPL_BASIC_STATS_WIDGET;
        this.TMPL_CLUSTER_USAGE_STATS = 'cluster-usage-widget-template';
        this.TMPL_CLUSTER_USAGE_DETAILS = 'cluster-usage-details-template';
        this.TMPL_CLUSTER_STATUS = 'cluster-status-template';

        this.DISK_USAGE_WARN = 85.00;
        this.DISK_USAGE_CRITICAL = 95.00;
        this.DISK_OKAY_COLOR = 'okay';
        this.DISK_WARNING_COLOR = 'warning';
        this.DISK_ERROR_COLOR = 'error';
        this.DISK_DEFAULT_COLOR = 'default';
    };

    return SConstants;
});
