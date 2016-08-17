/*
 * Copyright (c) 2015 Juniper Networks, Inc. All rights reserved.
 */


define(['underscore', 'contrail-view'], function(_, ContrailView) {
    var DashboardStatsRawLatencyView = ContrailView.extend({
     el: $(contentContainer),
       render: function() {
           this.renderView4Config(this.$el,
           null,
           getDashboardViewConfig());
       }
    });

    function getDashboardViewConfig() {
        return {
            elementId: cowu.formatElementId([swl.MONITOR_STORAGE_DASHBOARD_LIST_ID]),
            view: "SectionView",
            viewConfig: {
                class: 'col-xs-6',
                rows: [
                    {
                        columns: [
                            {
                                elementId: cowu.formatElementId([swl.MONITOR_STORAGE_DASHBOARD_USAGE_SECTION_ID+'-graph']),
                                view: "SectionView",
                                viewConfig: {
                                    rows: [
                                        {
                                            columns: [
                                                {
                                                    elementId: swl.CLUSTER_RAW_DISK_ACTIVITY_LATENCY_CHART_ID,
                                                    title: swl.TITLE_CLUSTER_RAW_DISK_LATENCY,
                                                    view: "LineWithFocusChartView",
                                                    viewConfig: {
                                                        modelConfig: {
                                                            modelKey: swc.UMID_CLUSTER_RAW_DISK_LATENCY_UVE,
                                                            remote: {
                                                                ajaxConfig: {
                                                                    url: swc.URL_CLUSTER_RAW_DISK_ACTIVITY_STATS,
                                                                    type: 'GET'
                                                                },
                                                                dataParser: swp.diskActivityStatsParser
                                                            },
                                                            cacheConfig: {
                                                                ucid: swc.UCID_CLUSTER_RAW_DISK_LATENCY_STATS
                                                            }
                                                        },
                                                        chartOptions: {
                                                            //height: 225,
                                                            yAxisLabel: swl.CLUSTER_DISK_ACTIVITY_LATENCY_CHART_YAXIS_LABEL,
                                                            focusEnable: false,
                                                            margin: {top: 20, right: 50, bottom: 40, left: 70},
                                                            yFormatter: function (d) {
                                                                return swu.addUnits2Latency(d, false, false, 4);
                                                            }
                                                        },
                                                        parseFn: swp.diskActivityLatencyLineBarChartDataParser
                                                    }
                                                }
                                            ]
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
    return DashboardStatsRawLatencyView;
});