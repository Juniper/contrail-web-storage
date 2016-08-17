/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'contrail-view',
    'contrail-list-model'
], function (_, ContrailView, ContrailListModel) {
    var DiskStatsTabView = ContrailView.extend({
        el: $(contentContainer),
        render: function () {
             var self = this,
                options = this.attributes.viewConfig.options,
                selector = $(self.$el);
                self.renderView4Config(self.$el, null, getDiskTabViewConfig(options));
            
        }
    });

    var getDiskTabViewConfig = function (options) {
        return {
            elementId: "dashboard-raw-stat-tab-view-id",
            view: "SectionView",
            viewConfig: {
                rows: [
                    {
                        columns: [
                            {
                                elementId: "dashboard-raw-stat-tab-id",
                                view: "TabsView",
                                viewConfig: {
                                    theme: 'overcast',
                                    active: 0,
                                    activate: function (e, ui) {
                                        var selTab = $(ui.newTab.context).text();
                                       if (selTab == swl.TITLE_CLUSTER_CEPH_LATENCY) {
                                            cowu.checkAndRefreshContrailGrids([
                                                $('#' + swl.CLUSTER_CEPH_DISK_ACTIVITY_LATENCY_CHART_ID),
                                                ]);
                                        }
                                    },
                                    tabs: [
                                        {
                                            elementId: "dashboard-raw-stat-thrpt-tab-stats-id",
                                            title: swl.TITLE_CLUSTER_CEPH_THROUGHPUT,
                                            view: "DiskThrptStatsView",
                                            app: cowc.APP_CONTRAIL_STORAGE,
                                            tabConfig: {
                                                renderOnActivate: true
                                            },
                                            viewConfig: {
                                                modelConfig: {
                                                    modelKey: swc.get(swc.UMID_DISK_UVE, options.storageNode, options.disk, options.uuid),
                                                    remote: {
                                                        ajaxConfig: {
                                                            url: swc.get(swc.URL_DISK_ACTIVITY_STATS, options.disk, options.storageNode, options.uuid),
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
                                            elementId: "dashboard-raw-stat-latency-tab-stats-id",
                                            title: swl.TITLE_CLUSTER_CEPH_LATENCY,
                                            view: "DiskLatencyStatsView",
                                            app: cowc.APP_CONTRAIL_STORAGE,
                                            tabConfig: {
                                                renderOnActivate: true
                                            },
                                            viewConfig: {
                                                modelConfig: {
                                                    modelKey: swc.get(swc.UMID_DISK_UVE, options.storageNode, options.disk, options.uuid),
                                                    remote: {
                                                        ajaxConfig: {
                                                            url: swc.get(swc.URL_DISK_ACTIVITY_STATS, options.disk, options.storageNode, options.uuid),
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
    return DiskStatsTabView;
});
