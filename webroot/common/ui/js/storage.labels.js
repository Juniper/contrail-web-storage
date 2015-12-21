/*
 * Copyright (c) 2015 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore'
], function (_) {
    var SLabels = function () {
        this.get = function (key) {
            var keyArray, newKey;
            if (_.has(labelMap, key)) {
                return labelMap[key];
            } else {
                keyArray = key.split('.');
                newKey = keyArray[keyArray.length - 1];
                if (keyArray.length > 1 && _.has(labelMap, newKey)) {
                    return labelMap[newKey];
                } else {
                    return newKey.charAt(0).toUpperCase() + newKey.slice(1);
                }
            }
        };

        this.isExistKey = function (key) {
            var keyArray, newKey;
            if (_.has(labelMap, key)) {
                return true;
            } else {
                keyArray = key.split('.');
                newKey = keyArray[keyArray.length - 1];
                if (keyArray.length > 1 && _.has(labelMap, newKey)) {
                    return true;
                }
            }

            return false;
        };

        var labelMap = {
            /* Storage Node Details */
            name: 'Name',
            osds_total: 'Total',
            osds_used: 'Used',
            osds_count: 'Disk Count',
            osds_status: 'Status',
            status_tmpl: 'Status',
            cluster_status_tmpl: 'Membership',
            public_addr: 'Public Address',
            uuid: 'UUID',
            /* Disk Details */
            apply_latency: 'Apply Latency',
            commit_latency: 'Commit Latency',
            /* Storage Monitor Details */
            avail_percent: 'Available',
            addr: 'IP Address',
            skew: 'Clock Skew',
            /* Pool Details */
            max_avail: 'Max Available',
            pg_num: 'Placement Group',
            pool: 'Pool ID',
            crush_ruleset: 'Crush Ruleset',
            snap_mode: 'Snapshot Mode',
            cache_mode: 'Cache Mode',
            /*Cluster status*/
            overall_health: 'Overall Health',
            HEALTH_ERR: 'Error',
            HEALTH_CRIT: 'Crtical',
            HEALTH_WARN: 'Warning'
        };

        this.MONITOR_STORAGENODE_LIST_PAGE_ID = "monitor-storagenode-list-page"
        this.MONITOR_STORAGENODE_LIST_ID = "monitor-storagenode-list";
        this.MONITOR_STORAGENODE_LIST_VIEW_ID = "monitor-storagenode-list-view";
        this.MONITOR_STORAGENODE_VIEW_ID = "monitor-storagenode-view";
        this.MONITOR_STORAGENODES_ID = "monitor-storagenodes";

        this.MONITOR_DISKS_ID = "monitor-disks";
        this.MONITOR_DISK_LIST_PAGE_ID = "monitor-disk-list-page";
        this.MONITOR_DISK_LIST_VIEW_ID = "monitor-disk-list-view";
        this.MONITOR_DISK_VIEW_ID = "monitor-disk-view";
        this.MONITOR_DISK_LIST_ID = "monitor-disk-list";
        this.MONITOR_DISK_GRID_ID = "monitor-disk-grid";
        this.MONITOR_DISK_ACTIVITY_STATS_ID = "monitor-disk-activity-stats";
        this.MONITOR_DISK_SCATTER_CHART_ID ='disk-scatter-chart'

        this.MONITOR_STORAGE_MONITORS_ID = "monitor-storagemons";
        this.MONITOR_STORAGE_MONITOR_LIST_PAGE_ID = "monitor-storagemon-list-page";
        this.MONITOR_STORAGE_MONITOR_LIST_VIEW_ID = "monitor-storagemon-list-view";
        this.MONITOR_STORAGE_MONITOR_LIST_ID = "monitor-storagemon-list";
        this.MONITOR_STORAGE_MONITOR_GRID_ID = "monitor-storagemon-grid";
        this.MONITOR_STORAGE_MONITOR_SCATTER_CHART_ID = "monitor-storagemon-scatter-chart";

        this.MONITOR_POOLS_ID = "monitor-pools";
        this.MONITOR_POOL_LIST_PAGE_ID = "monitor-pool-list-page";
        this.MONITOR_POOL_LIST_VIEW_ID = "monitor-pool-list-view";
        this.MONITOR_POOL_LIST_ID = "monitor-pool-list";
        this.MONITOR_POOL_GRID_ID = "monitor-pool-grid";
        this.MONITOR_POOL_STATS_ID = "monitor-pool-stats";
        this.MONITOR_POOL_SCATTER_CHART_ID ='pool-scatter-chart'

        this.MONITOR_STORAGE_DASHBOARD_SECTION_ID ="storage-dashboard-section";
        this.MONITOR_STORAGE_DASHBOARD_PAGE_ID = "monitor-storage-dashboard-page";
        this.MONITOR_STORAGE_DASHBOARD_LIST_ID = "monitor-storage-dashboard-list";
        this.MONITOR_STORAGE_DASHBOARD_USAGE_SECTION_ID = "monitor-storage-dashboard-usage-section";
        this.MONITOR_STORAGE_DASHBOARD_CLUSTER_USAGE_ID = "monitor-storage-dashboard-usage";
        this.MONITOR_STORAGE_DASHBOARD_CLUSTER_STATS_ID = "monitor-storage-dashboard-stats";


        this.STORAGENODE_SUMMARY_SCATTERCHART_SECTION_ID ="storage-nodes-scatterchart-section";
        this.STORAGENODE_DASHBOARD_SECTION_ID="storage-dashboard-section";
        this.STORAGENODE_DASHBOARD_SPARKLINE_ID="storage-dashboard-sparkline";
        this.STORAGENODE_SUMMARY_TITLE="Storage Nodes";
        this.STORAGENODE_DASHBOARD_CHART_ID ="storage-dashboard-chart";


        this.MONITOR_CLUSTER_USAGE_ID = "monitor-storage-cluster-usage";

        this.TITLE_STORAGENODES = "Storage Nodes";
        this.TITLE_STORAGENODES_SUMMARY = "Storage Nodes Summary";
        this.TITLE_STORAGENODE = "Storage Node";
        this.TITLE_STORAGENODE_DETAILS = "Storage Node Details";

        this.TITLE_DISKS = "Disks";
        this.TITLE_DISK_SUMMARY = "Disk Summary";
        this.TITLE_DISK_STATUS = "Disk Status";
        this.TITLE_DISK_DETAILS = "Disk Details";
        this.TITLE_DISK_USAGE = "Disk Usage";
        this.TITLE_DISK_STATUS = "Disk Status";
        this.TITLE_DISK_ACTIVITY_STATS = "Disk Activity";
        this.TITLE_DISK_ACTIVITY_THRPT_STATS = "Disk Throughput";
        this.TITLE_DISK_ACTIVITY_IOPS_STATS = "Disk IOPs";
        this.TITLE_DISK_ACTIVITY_LATENCY_STATS = "Disk Latency";

        this.TITLE_MONITORS = "Storage Monitors";
        this.TITLE_MONITOR_SUMMARY = "Storage Monitor Summary";
        this.TITLE_MONITOR_DETAILS = "Storage Monitor Details";
        this.TITLE_ROOT_DISK_USAGE = "Root Disk Usage";

        this.TITLE_POOLS = "Pools";
        this.TITLE_POOL_SUMMARY = "Pool Summary";
        this.TITLE_POOL_DETAILS = "Pool Details";
        this.TITLE_POOL_STATS = "Pool Stats";

        this.TITLE_CLUSTER_USAGE = "Cluster Usage";
        this.TITLE_CLUSTER_THROUGHPUT = "Cluster Throughput";
        this.TITLE_CLUSTER_LATENCY = "Cluster Latency";
        this.TITLE_CLUSTER_REPLICA_FACTOR = "Replication Factor: ";

        this.TITLE_CHART_ELEMENT_STORAGENODE = "storage node";
        this.TITLE_CHART_ELEMENT_STORAGENODE_MONITOR = "storage node monitor";
        this.TITLE_CHART_ELEMENT_DISK = "disk";
        this.TITLE_CHART_ELEMENT_POOL = "pool";

        this.STORAGENODE_TAB_VIEW_ID = "storagenode-tab-view";
        this.STORAGENODE_TAB_ID = "storagenode";
        this.STORAGENODES_SCATTER_CHART_ID  = "storagenodes-scatter-chart";
        this.STORAGENODES_GRID_ID = "storagenodes-grid";

        this.DISK_TAB_ID = "disk";
        this.DISK_TAB_VIEW_ID = "disk-tab-view";
        this.DISK_SCATTER_CHART_ID = "disk-scatter-chart";
        this.DISK_DETAILS_ID = "disk-details";
        this.DISK_STATUS_CHART_ID = "disk-status-chart";
        this.DISK_ACTIVITY_STATS_ID = "disk-activity-stats";
        this.DISK_ACTIVITY_VIEW_ID = "disk-activity-view";
        this.DISK_ACTIVITY_THRPT_CHART_ID =  "disk-activity-thrpt-chart";
        this.DISK_ACTIVITY_IOPS_CHART_ID =  "disk-activity-iops-chart";
        this.DISK_ACTIVITY_LATENCY_CHART_ID =  "disk-activity-latency-chart";
        this.DISK_ACTIVITY_THRPT_IOPS_CHART_ID =  "disk-activity-thrpt-iops-chart";

        this.DISK_ACTIVITY_THRPT_CHART_YAXIS_LABEL = "Throughput";
        this.DISK_ACTIVITY_IOPS_CHART_YAXIS_LABEL = "IOPs";
        this.DISK_ACTIVITY_LATENCY_CHART_YAXIS_LABEL = "Latency";

        this.CLUSTER_STATUS_ID = "cluster-status";
        this.TITLE_CLUSTER_STATUS = "Cluster Status";

        this.CLUSTER_DISK_ACTIVITY_STATS_ID = "cluster-disk-activity-stats";
        this.CLUSTER_DISK_ACTIVITY_STATS_TAB_ID = "cluster-disk-activity-stats-tab";
        this.CLUSTER_DISK_ACTIVITY_VIEW_ID = "cluster-disk-activity-view";
        this.CLUSTER_DISK_ACTIVITY_THRPT_CHART_ID =  "cluster-disk-activity-thrpt-chart";
        this.CLUSTER_DISK_ACTIVITY_IOPS_CHART_ID =  "cluster-disk-activity-iops-chart";
        this.CLUSTER_DISK_ACTIVITY_LATENCY_CHART_ID =  "cluster-disk-activity-latency-chart";
        this.CLUSTER_DISK_ACTIVITY_THRPT_IOPS_CHART_ID =  "cluster-disk-activity-thrpt-iops-chart";

        this.CLUSTER_DISK_ACTIVITY_THRPT_CHART_YAXIS_LABEL = "Throughput";
        this.CLUSTER_DISK_ACTIVITY_IOPS_CHART_YAXIS_LABEL = "IOPs";
        this.CLUSTER_DISK_ACTIVITY_LATENCY_CHART_YAXIS_LABEL = "Latency";

        this.POOL_SCATTER_CHART_ID = "pool-scatter-chart";
        this.POOL_BAR_CHART_ID = "pool-bar-chart";
        this.POOL_STATS_CHART_ID = "pool-stats-chart";

        this.CLUSTER_USAGE_CHART_ID = "cluster-usage-chart";
        this.CLUSTER_REPLICA_FACTOR_ID = "cluster-replica-factor";

    };
    return SLabels;
});
