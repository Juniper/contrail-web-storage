/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'contrail-view',
], function (_, ContrailView) {
    var DashboardRawStatTabView = ContrailView.extend({
        render: function () {
            this.renderView4Config(this.$el,
                null,
                getDashboardTabViewConfig());
        }
    });

    var getDashboardTabViewConfig = function () {
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
                                    //theme: 'overcast',
                                    active: 0,
                                    activate: function (e, ui) {
                                        var selTab = $(ui.newTab.context).text();
                                       if (selTab == swl.TITLE_CLUSTER_RAW_DISK_LATENCY) {
                                            cowu.checkAndRefreshContrailGrids([
                                                    $('#' + swl.CLUSTER_RAW_DISK_ACTIVITY_LATENCY_CHART_ID)
                                            ]);
                                        }else{
                                            cowu.checkAndRefreshContrailGrids([
                                                    $('#' + swl.CLUSTER_RAW_DISK_ACTIVITY_THRPT_IOPS_CHART_ID)
                                            ]);
                                        }
                                    },
                                    tabs: [
                                        {
                                            elementId: "dashboard-ceph-stat-tab-thrpt-stats-id",
                                            title: swl.TITLE_CLUSTER_RAW_DISK_THROUGHPUT,
                                            view: "DashboardStatsRawThrptView",
                                            app: cowc.APP_CONTRAIL_STORAGE,
                                            tabConfig: {
                                                renderOnActivate: true
                                            }
                                        },
                                        {
                                            elementId: "dashboard-ceph-stat-tab-latency-stats-id",
                                            title: swl.TITLE_CLUSTER_RAW_DISK_LATENCY,
                                            view: "DashboardStatsRawLatencyView",
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
    return DashboardRawStatTabView;
});
