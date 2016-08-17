/*
 * Copyright (c) 2015 Juniper Networks, Inc. All rights reserved.
 */


define(['underscore', 'contrail-view'], function(_, ContrailView) {
    var DashboardStatsRawThrptView = ContrailView.extend({
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
                                                    elementId: swl.CLUSTER_RAW_DISK_ACTIVITY_THRPT_IOPS_CHART_ID,
                                                    title: swl.TITLE_CLUSTER_RAW_DISK_THROUGHPUT,
                                                    view: "LineBarWithFocusChartView",
                                                    viewConfig: {
                                                        modelConfig: {
                                                            modelKey: swc.UMID_CLUSTER_RAW_DISK_THRPT_UVE,
                                                            remote: {
                                                                ajaxConfig: {
                                                                    url: swc.URL_CLUSTER_RAW_DISK_ACTIVITY_STATS,
                                                                    type: 'GET'
                                                                },
                                                                dataParser: swp.diskActivityStatsParser
                                                            },
                                                            cacheConfig: {
                                                                ucid: swc.UCID_CLUSTER_RAW_DISK_THRPT_STATS
                                                            }
                                                        },
                                                        chartOptions: {
                                                            //height: 190,
                                                            y1AxisLabel: swl.CLUSTER_DISK_ACTIVITY_IOPS_CHART_YAXIS_LABEL,
                                                            y2AxisLabel: swl.CLUSTER_DISK_ACTIVITY_THRPT_CHART_YAXIS_LABEL,
                                                            xAxisTicksCnt: 10,
                                                            //forceY1: [0, 10],
                                                            //forceY2: [0, 1024],
                                                            y2AxisWidth: 50,
                                                            //focusEnable: false,
                                                            //height: 250,
                                                            showLegend: true,
                                                            margin: {top: 20, right: 50, bottom: 40, left: 70},
                                                            defaultDataStatusMessage: false,
                                                            xFormatter: function (xValue) {
                                                               // Same function is called for
                                                               // axis ticks and the tool tip
                                                               // title
                                                               var date = new Date(xValue);
                                                               return d3.time.format('%H:%M')(date);
                                                            },
                                                            y2Formatter: function (y2Value) {
                                                                return formatBytes(y2Value, true);
                                                            },
                                                            y1Formatter: function (d) {
                                                                return swu.addUnits2IOPs(d, false, false, 1);
                                                            }
                                                        },
                                                        parseFn: swp.diskActivityThrptIOPsLineBarChartDataParser
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
    return DashboardStatsRawThrptView;
});