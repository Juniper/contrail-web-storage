/*
 * Copyright (c) 2015 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'contrail-view',
    'contrail-list-model'
], function (_, ContrailView, ContrailListModel) {
    var DiskActivityStatsView = ContrailView.extend({
        el: $(contentContainer),

        render: function () {
            var self = this,
                viewConfig = this.attributes.viewConfig,
                selector = $(self.$el);

            if (viewConfig.modelConfig != null) {
                self.model = new ContrailListModel(viewConfig['modelConfig']);
                self.renderCharts();
                if (self.model.loadedFromCache || !(self.model.isRequestInProgress())) {
                    self.renderCharts();
                }

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
            self.renderView4Config(self.$el, self.model, getDiskActivityStatsViewConfig());
        }

    });

    function getDiskActivityStatsViewConfig() {
        var yFormatterFn = function (d) {
            return swu.addUnits2Latency(d, false, false, 1);
        };

        return {
            elementId: cowu.formatElementId([swl.MONITOR_DISK_ACTIVITY_STATS_ID+"raw-disk"]),
            view: "SectionView",
            viewConfig: {
                rows: [
                    {
                        columns: [
                            {
                                elementId: swl.DISK_ACTIVITY_THRPT_IOPS_CHART_ID+"raw-disk",
                                view: "LineBarWithFocusChartView",
                                title: swl.TITLE_RAW_DISK_ACTIVITY_THRPT_STATS,
                                viewConfig: {
                                    class: 'col-xs-6',
                                    widgetConfig: {
                                        elementId: swl.DISK_ACTIVITY_THRPT_IOPS_CHART_ID+"raw-disk" + '-widget',
                                        view: "WidgetView",
                                        viewConfig: {
                                            header: {
                                                title: swl.TITLE_RAW_DISK_ACTIVITY_THRPT_STATS,
                                                iconClass: false
                                            },
                                            controls: {
                                                top: {
                                                    default: {
                                                        collapseable: true
                                                    }
                                                }
                                            }
                                        }
                                    },
                                    chartOptions: {
                                        height: 250,
                                        y1AxisLabel: swl.DISK_ACTIVITY_IOPS_CHART_YAXIS_LABEL,
                                        y1Formatter: function (d) {
                                            return swu.addUnits2IOPs(d, false, false, 1);
                                        },
                                        y2AxisLabel: swl.DISK_ACTIVITY_THRPT_CHART_YAXIS_LABEL,
                                        y2Formatter: function (y2Value) {
                                            return formatBytes(y2Value, true);
                                        },
                                        showLegend: true

                                    },
                                    parseFn: swp.diskActivityThrptIOPsLineBarChartDataParser                                }
                            },
                            {
                                elementId: swl.DISK_ACTIVITY_LATENCY_CHART_ID+"raw-disk",
                                title: swl.TITLE_RAW_DISK_ACTIVITY_LATENCY_STATS,
                                view: "LineWithFocusChartView",
                                viewConfig: {
                                    class: 'col-xs-6',
                                    widgetConfig: {
                                        elementId: swl.DISK_ACTIVITY_LATENCY_CHART_ID+"raw-disk" + '-widget',
                                        view: "WidgetView",
                                        viewConfig: {
                                            header: {
                                                title: swl.TITLE_RAW_DISK_ACTIVITY_LATENCY_STATS,
                                                iconClass: false
                                            },
                                            controls: {
                                                top: {
                                                    default: {
                                                        collapseable: true
                                                    }
                                                }
                                            }
                                        }
                                    },
                                    chartOptions: {
                                        height: 250,
                                        yAxisLabel: swl.DISK_ACTIVITY_LATENCY_CHART_YAXIS_LABEL,
                                        yFormatter: function (d) {
                                            return swu.addUnits2Latency(d, false, false, 4);
                                        },
                                        y2Formatter: yFormatterFn
                                    },
                                    parseFn: swp.diskActivityLatencyLineBarChartDataParser
                                }
                            }
                        ]
                    }
                ]
            }
        };
    };

    return DiskActivityStatsView;
});
