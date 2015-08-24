/*
 * Copyright (c) 2015 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'contrail-view',
    'contrail-list-model'
], function (_, ContrailView, ContrailListModel) {
    var ClusterActivityStatsView = ContrailView.extend({
        el: $(contentContainer),

        render: function () {
            var self = this,
                viewConfig = this.attributes.viewConfig,
                modelConfig = viewConfig.modelConfig;

            if (self.model === null) {
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

    function getClusterActivityStatsViewConfig() {
        return {
            elementId: cowu.formatElementId([swl.CLUSTER_DISK_ACTIVITY_STATS_ID, '-section']),
            view: "SectionView",
            viewConfig: {
                rows: [
                    {
                        columns: [
                            //{
                            //    elementId: swl.CLUSTER_DISK_ACTIVITY_STATS_TAB_ID,
                            //    view: "TabsView",
                            //    viewConfig: {
                            //        theme: 'widget-classic',
                            //        active: 0,
                            //        activate: function (e, ui) {
                            //            var selTab = $(ui.newTab.context).text();
                            //            if (selTab == swl.TITLE_CLUSTER_THROUGHPUT) {
                            //                $('#' + swl.CLUSTER_DISK_ACTIVITY_THRPT_IOPS_CHART_ID).find('svg').trigger('refresh');
                            //            } else if (selTab == swl.TITLE_CLUSTER_LATENCY) {
                            //                $('#' + swl.CLUSTER_DISK_ACTIVITY_LATENCY_CHART_ID).find('svg').trigger('refresh');
                            //            }
                            //        },
                            //        tabs: [
                            //            ,
                            //        ]
                            //    }
                            //}

                        ]
                    }
                ]
            }
        };
    };

    return ClusterActivityStatsView;
});
