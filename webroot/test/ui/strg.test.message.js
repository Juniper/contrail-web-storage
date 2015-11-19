/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore'
], function (_) {
    var TMessages = function() {
        //Storage Dashboard Constants
        this.STORAGE_DASHBOARD_COMMON_TEST_MODULE = 'Storage Dashboard view - Common Tests';
        this.STORAGE_DASHBOARD_PIECHART_CUSTOM_TEST = "Storage Dashboard view - Custom Tests";
        this.STORAGE_DASHBOARD_NAME_VALUE_CHECK = "Storage Dashboard Piechart grid check for a particular column value equality";
        
        this.STORAGE_DASHBOARD_CLUSTER_STATUS_CUSTOM_TEST = "Storage Dashboard view - Custom Tests";
        this.STORAGE_DASHBOARD_CLUSTER_STATUS_DETAILSVIEW ="Storage Cluster Status Details View";

        //Disk Constants
        this.STORAGE_DISK_GRID_MODULE  = 'Storage Disk Grid -  SM Tests';
        this.STORAGE_DISK_LIST_VIEW_COMMON_TEST_MODULE = 'Storage Disks List view - Common Tests';
        this.STORAGE_DISK_LIST_VIEW_CUSTOM_TEST = 'Storage Disks List view - Custom Tests';
        this.STORAGE_DISK_GRID_COLUMN_VALUE_CHECK = "Storage Disks grid check for a particular column value equality";


        this.STORAGE_DETAILS_VIEW_COMMON_TEST_MODULE = 'Storage Disk Details View - Common Tests';

        //Pool  Constants
        this.STORAGE_POOLS_GRID_MODULE = 'Storage Pools Grid -  SM Tests';
        this.STORAGE_POOL_LIST_VIEW_COMMON_TEST_MODULE = 'Storage Pools List view - Common Tests';
        this.STORAGE_POOLS_LIST_VIEW_CUSTOM_TEST = 'Storage Pools List view - Custom Tests';
        this.STORAGE_POOLS_GRID_COLUMN_VALUE_CHECK = "Storage Pools grid check for a particular column value equality";

        // Monitors Constants
        this.STORAGE_MON_GRID_MODULE  = 'Monitors Grid -  SM Tests';
        this.STORAGE_MON_LIST_VIEW_COMMON_TEST_MODULE = 'Storage Monitors List view - Common Tests';
        this.STORAGE_MON_LIST_VIEW_CUSTOM_TEST = 'Storage Monitors List view - Custom Tests';
        this.STORAGE_MON_GRID_COLUMN_VALUE_CHECK = "Storage Montiors grid check for a particular column value equality";

        this.get = function () {
            var args = arguments;
            return args[0].replace(/\{(\d+)\}/g, function (m, n) {
                n = parseInt(n) + 1;
                return args[n];
            });
        };
    };
    return new TMessages();
});