/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'contrail-view',
    'contrail-list-model'
], function (_, ContrailView, ContrailListModel) {
    var DiskRawStatsTabView = ContrailView.extend({
        el: $(contentContainer),
        render: function () {
             var self = this,
                options = this.attributes.viewConfig.options,
                selector = $(self.$el);
                self.renderView4Config(self.$el, null, getRawDiskTabViewConfig(options));
            
        }
    });

    var getRawDiskTabViewConfig = function (options) {
        return {
            elementId: "dashboard-ceph-stat-tab-view-id",
            view: "SectionView",
            viewConfig: {
                rows: [
                    {
                        columns: [
                            {
                                elementId: "dashboard-ceph-stat-tab-id",
                                view: "TabsView",
                                viewConfig: {
                                    theme: 'overcast',
                                    active: 0,
                                    activate: function (e, ui) {
                                        var selTab = $(ui.newTab.context).text();
                                       if (selTab == swl.TITLE_RAW_DISK_ACTIVITY_LATENCY_STATS) {
                                            cowu.checkAndRefreshContrailGrids([
                                                    $('#' + swl.DISK_ACTIVITY_LATENCY_CHART_ID+"raw-disk")
                                            ]);
                                        }else{
                                            cowu.checkAndRefreshContrailGrids([
                                                    $('#' + swl.DISK_ACTIVITY_THRPT_IOPS_CHART_ID+"raw-disk")
                                            ]);
                                        }
                                    },
                                    tabs: [
                                        {
                                            elementId: "dashboard-ceph-stat-tab-thrpt-stats-id",
                                            title: swl.TITLE_CLUSTER_RAW_DISK_THROUGHPUT,
                                            view: "RawDiskThrptStatsView",
                                            app: cowc.APP_CONTRAIL_STORAGE,
                                            tabConfig: {
                                                renderOnActivate: true
                                            },
                                            viewConfig: {
                                                modelConfig: {
                                                    modelKey: swc.get(swc.UMID_DISK_UVE, options.storageNode, options.disk, options.uuid),
                                                    remote: {
                                                        ajaxConfig: {
                                                            url: swc.get(swc.URL_RAW_DISK_ACTIVITY_STATS, options.disk, options.storageNode, options.uuid),
                                                            type: 'GET'
                                                        },
                                                        dataParser: swp.diskActivityStatsParser
                                                    },
                                                    cacheConfig: {
                                                        ucid: swc.get(swc.UCID_DISK_STATS, options.storageNode, options.disk, options.uuid)
                                                    }
                                                }
                                            }
                                        },
                                        {
                                            elementId: "dashboard-ceph-stat-tab-latency-stats-id",
                                            title: swl.TITLE_CLUSTER_RAW_DISK_LATENCY,
                                            view: "RawDiskLatencyStatsView",
                                            app: cowc.APP_CONTRAIL_STORAGE,
                                            tabConfig: {
                                                renderOnActivate: true
                                            },
                                            viewConfig: {
                                                modelConfig: {
                                                    modelKey: swc.get(swc.UMID_DISK_UVE, options.storageNode, options.disk, options.uuid),
                                                    remote: {
                                                        ajaxConfig: {
                                                            url: swc.get(swc.URL_RAW_DISK_ACTIVITY_STATS, options.disk, options.storageNode, options.uuid),
                                                            type: 'GET'
                                                        },
                                                        dataParser: swp.diskActivityStatsParser
                                                    },
                                                    cacheConfig: {
                                                        ucid: swc.get(swc.UCID_DISK_STATS, options.storageNode, options.disk, options.uuid)
                                                    }
                                                }
                                            }
                                        }
                                    ]
                                }
                            }
                        ]
                    }
                ]
            }
        }
    };
    return DiskRawStatsTabView;
});
