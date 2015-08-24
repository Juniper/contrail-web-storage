/*
 * Copyright (c) 2015 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'contrail-view',
    './StorageBreadcrumbView.js'
], function (_, ContrailView, BreadcrumbView) {
    var MonitorStorageView = ContrailView.extend({
        el: $(contentContainer),

        renderStorageNode: function (viewConfig) {
            var self = this,
                hashParams = viewConfig.hashParams,
                fqName = (contrail.checkIfKeyExistInObject(true, hashParams, 'focusedElement.fqName') ? hashParams.focusedElement.fqName : null),
                breadcrumbView = new BreadcrumbView();

            breadcrumbView.renderDomainBreadcrumbDropdown(fqName, function (domainSelectedValueData, domainBreadcrumbChanged) {

            });
            self.renderView4Config(this.$el, null, getStorageNodeViewConfig(hashParams));
        },

        renderStorageNodeList: function () {
            cowu.renderView4Config(this.$el, null, getStorageNodeListConfig());
        },

        renderDisk: function (viewConfig) {
            var self = this,
                hashParams = viewConfig.hashParams,
                fqName = (contrail.checkIfKeyExistInObject(true, hashParams, 'focusedElement.fqName') ? hashParams.focusedElement.fqName : null);

            //TBD breadcrumb update

            self.renderView4Config(self.$el, null, getDiskViewConfig(hashParams));
        }
    });

    function getStorageNodeListConfig() {
        return {
            elementId: cowu.formatElementId([swl.MONITOR_STORAGENODE_LIST_PAGE_ID]),
            viewPathPrefix: 'monitor/infrastructure/ui/js/views/',
            view: "StorageNodeListView",
            app: cowc.APP_CONTRAIL_STORAGE,
            viewConfig: {}
        }
    };

    function getStorageNodeViewConfig(hashParams) {
        return {
            elementId: cowu.formatElementId([swl.MONITOR_STORAGENODE_VIEW_ID]),
            viewPathPrefix: 'monitor/infrastructure/ui/js/views/',
            view: "StorageNodeView",
            app: cowc.APP_CONTRAIL_STORAGE,
            viewConfig: {
                storageNode: hashParams.focusedElement.fqName
            }
        }
    };

    function getDiskViewConfig(hashParams) {
        return {
            elementId: cowu.formatElementId([swl.MONITOR_DISK_VIEW_ID]),
            view: "DiskView",
            app: cowc.APP_CONTRAIL_STORAGE,
            viewConfig: {
                disk: hashParams.focusedElement.fqName,
                storageNode: hashParams.focusedElement.fqHost
            }
        };
    }

    return MonitorStorageView;
});