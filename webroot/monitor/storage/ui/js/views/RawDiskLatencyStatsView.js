/*
 * Copyright (c) 2015 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'contrail-view',
    'contrail-list-model'
], function (_, ContrailView, ContrailListModel) {
    var RawDiskLatencyStatsView = ContrailView.extend({
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
                                elementId: swl.DISK_ACTIVITY_LATENCY_CHART_ID+"raw-disk",
                                title: swl.TITLE_RAW_DISK_ACTIVITY_LATENCY_STATS,
                                view: "LineWithFocusChartView",
                                viewConfig: {
                                    chartOptions: {
                                        //height: 250,
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

    return RawDiskLatencyStatsView;
});
