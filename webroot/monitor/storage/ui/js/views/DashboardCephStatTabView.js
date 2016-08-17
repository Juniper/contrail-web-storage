/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'contrail-view',
], function (_, ContrailView) {
    var DashboardCephStatTabView = ContrailView.extend({
        render: function () {
            this.renderView4Config(this.$el,
                null,
                getDashboardTabViewConfig());
        }
    });

    var getDashboardTabViewConfig = function () {
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
                                            view: "DashboardStatsCephThrptView",
                                            app: cowc.APP_CONTRAIL_STORAGE,
                                            tabConfig: {
                                                renderOnActivate: true
                                            }
                                        },
                                        {
                                            elementId: "dashboard-raw-stat-latency-tab-stats-id",
                                            title: swl.TITLE_CLUSTER_CEPH_LATENCY,
                                            view: "DashboardStatsCephLatencyView",
                                            app: cowc.APP_CONTRAIL_STORAGE,
                                            tabConfig: {
                                                renderOnActivate: true
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
    return DashboardCephStatTabView;
});
