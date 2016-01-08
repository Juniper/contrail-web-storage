/*
 * Copyright (c) 2015 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'contrail-view',
    '../../../../infrastructure/ui/js/views/StorageBreadcrumbView.js'
], function (_, ContrailView, BreadcrumbView) {
    var MonitorStorageView = ContrailView.extend({
        el: $(contentContainer),

        renderDisk: function (viewConfig) {
            var self = this,
                hashParams = viewConfig.hashParams,
                fqName = (contrail.checkIfKeyExistInObject(true, hashParams, 'focusedElement.fqName') ? hashParams.focusedElement.fqName : null),
                breadcrumbView = new BreadcrumbView();

            // TBD update breadcrumb
            self.renderView4Config(this.$el, null, getDiskViewConfig(hashParams));
        },

        renderDiskList: function () {
            this.renderView4Config(this.$el, null, getDiskListConfig());
        },

        renderMonitorList: function (viewConfig) {
            var self = this;
            this.renderView4Config(self.$el, null, getStorageMonitorListViewConfig());
        },

        renderPoolList: function (viewConfig) {
            var self = this;
            this.renderView4Config(self.$el, null, getPoolListViewConfig());
        },

        renderStorageDashboard: function (viewConfig) {
            var self = this;
            this.renderView4Config(self.$el, null, getDashboardViewConfig());
        }
    });

    function getDiskViewConfig(hashParams) {
        return {
            elementId: cowu.formatElementId([swl.MONITOR_DISK_VIEW_ID]),
            view: "DiskView",
            app: cowc.APP_CONTRAIL_STORAGE,
            viewConfig: {
                disk: hashParams.focusedElement.fqName,
                storageNode: hashParams.focusedElement.fqHost,
                uuid: hashParams.focusedElement.fqUUID
            }
        };
    }

    function getDiskListConfig() {
        return {
            elementId: cowu.formatElementId([swl.MONITOR_DISK_LIST_PAGE_ID]),
            view: "DiskListView",
            app: cowc.APP_CONTRAIL_STORAGE,
            viewConfig: {}
        }
    };

    function getStorageMonitorListViewConfig() {
        return {
            elementId: cowu.formatElementId([swl.MONITOR_STORAGE_MONITOR_LIST_PAGE_ID]),
            view: "StorageMonListView",
            app: cowc.APP_CONTRAIL_STORAGE,
            viewConfig: {}
        };
    }

    function getPoolListViewConfig() {
        return {
            elementId: cowu.formatElementId([swl.MONITOR_POOL_LIST_PAGE_ID]),
            view: "PoolListView",
            app: cowc.APP_CONTRAIL_STORAGE,
            viewConfig: {}
        };
    }

    function getDashboardViewConfig() {
        return {
            elementId: cowu.formatElementId([swl.MONITOR_STORAGE_DASHBOARD_PAGE_ID]),
            view: "DashboardView",
            app: cowc.APP_CONTRAIL_STORAGE,
            viewConfig: {}
        };
    }

    return MonitorStorageView;
});