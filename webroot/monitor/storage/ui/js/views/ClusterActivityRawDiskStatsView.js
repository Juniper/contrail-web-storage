/*
 * Copyright (c) 2015 Juniper Networks, Inc. All rights reserved.
 */

define(['underscore', 'contrail-view', 'contrail-list-model'], function(_, ContrailView, ContrailListModel) {
    var ClusterActivityStatsView = ContrailView.extend({
        el: $(contentContainer),

        render: function () {
            var self = this,
                viewConfig = this.attributes.viewConfig,
                modelConfig = viewConfig.modelConfig;

            if(self.model === null) {
                self.model = new ContrailListModel(modelConfig);
            }

            if (viewConfig.modelConfig !== null) {
                self.renderCharts();

                self.model.onAllRequestsComplete.subscribe(function () {
                    self.renderCharts();
                });

                if (viewConfig.loadChartInChunks) {
                    self.model.onDataUpdate.subscribe(function () {
                        self.renderCharts();
                    });
                }
            }
        },

        renderCharts: function () {
            var self = this;
            self.renderView4Config(self.$el, self.model, getClusterActivityStatsViewConfig());
        }

    });


    function getClusterActivityStatsViewConfig(){
        return {
            elementId: cowu.formatElementId([swl.CLUSTER_DISK_ACTIVITY_LATENCY_STATS_ID, '-section']),
            view: "SectionView",
            viewConfig: {
                rows: [
                    {
                        columns: [
                            {
                                elementId: swl.CLUSTER_DISK_ACTIVITY_LATENCY_STATS_TAB_ID,
                                view: "TabsView",
                                viewConfig: {
                                    theme: 'widget-classic',
                                    active: 0,
                                    activate: function (e, ui) {
                                        var selTab = $(ui.newTab.context).text();
                                        if (selTab == swl.TITLE_CLUSTER_RAW_DISK_THROUGHPUT) {
                                            $('#' + swl.CLUSTER_RAW_DISK_ACTIVITY_THRPT_CHART_ID).find('svg').trigger('refresh');
                                        } else if (selTab == swl.TITLE_CLUSTER_RAW_DISK_LATENCY) {
                                            $('#' + swl.CLUSTER_RAW_DISK_ACTIVITY_LATENCY_CHART_ID).find('svg').trigger('refresh');
                                        }
                                    },
                                    tabs: [ 
                                        {
                                            elementId: swl.CLUSTER_RAW_DISK_ACTIVITY_THRPT_CHART_ID,
                                            title: swl.TITLE_CLUSTER_RAW_DISK_THROUGHPUT,
                                            view: "LineBarWithFocusChartView",
                                            viewConfig: {
                                                chartOptions: {
                                                    height: 300,
                                                    y2AxisLabel: swl.CLUSTER_DISK_ACTIVITY_THRPT_CHART_YAXIS_LABEL,
                                                    y1AxisLabel: swl.CLUSTER_DISK_ACTIVITY_IOPS_CHART_YAXIS_LABEL,
                                                    forceY1: [0, 10],
                                                    forceY2: [0, 1024],
                                                    y2Formatter: function (y2Value) {
                                                        return formatBytes(y2Value, true);
                                                    },
                                                    y1Formatter: function (d) {
                                                        return swu.addUnits2IOPs(d, false, false, 1);
                                                    }
                                                },
                                                parseFn: swp.diskActivityThrptIOPsLineBarChartDataParser
                                            }
                                        },
                                        {
                                            elementId: swl.CLUSTER_RAW_DISK_ACTIVITY_LATENCY_CHART_ID,
                                            title: swl.TITLE_CLUSTER_RAW_DISK_LATENCY,
                                            view: "LineWithFocusChartView",
                                            viewConfig: {
                                                chartOptions: {
                                                        height: 300,
                                                        yAxisLabel: swl.CLUSTER_DISK_ACTIVITY_LATENCY_CHART_YAXIS_LABEL,
                                                        yFormatter: function (d) {
                                                            return swu.addUnits2Latency(d, false, false, 4);
                                                        }
                                                    },
                                                    parseFn: swp.diskActivityLatencyLineBarChartDataParser
                                            }
                                        }
                                    ]
                                }
                            }
                        ]
                    }
                ]
            }
        };
    };

    return ClusterActivityStatsView;
});