/*
 * Copyright (c) 2015 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'contrail-view',
    'contrail-list-model'
], function (_, ContrailView, ContrailListModel) {
    var RawDiskThrptStatsView = ContrailView.extend({
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
            self.renderView4Config(self.$el, self.model, getRawDiskActivityStatsViewConfig());
        }

    });

    function getRawDiskActivityStatsViewConfig() {
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
                                    chartOptions: {
                                        //height: 250,
                                        y1AxisLabel: swl.DISK_ACTIVITY_IOPS_CHART_YAXIS_LABEL,
                                        xAxisTicksCnt: 10,
                                        //forceY1: [0, 10],
                                        //forceY2: [0, 1024],
                                        y2AxisWidth: 50,
                                        //focusEnable: false,
                                        //height: 250,
                                        showLegend: true,
                                        margin: {top: 20, right: 50, bottom: 40, left: 70},
                                        defaultDataStatusMessage: false,
                                        xFormatter: function (xValue, tickCnt) {
                                           // Same function is called for
                                           // axis ticks and the tool tip
                                           // title
                                           var date = new Date(xValue);
                                           return d3.time.format('%H:%M')(date);
                                        },
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
                            }
                        ]
                    }
                ]
            }
        };
    };

    return RawDiskThrptStatsView;
});
