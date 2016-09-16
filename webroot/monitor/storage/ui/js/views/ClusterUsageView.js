   /*
 * Copyright (c) 2015 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'contrail-view',
    'contrail-list-model',
    'chart-utils',
    'monitor-storage-basedir/js/models/UsageAndStatusDonutChartModel'
], function (_, ContrailView, ContrailListModel, chUtils, UsageAndStatusDonutChart) {
    var ClusterUsageView = ContrailView.extend({
        el: $(contentContainer),

        render: function () {
            var self = this, viewConfig = self.attributes.viewConfig,
                selector = $(self.$el),
                clusterUsageTemplate = contrail.getTemplate4Id(swc.TMPL_CLUSTER_USAGE_STATS);

            $(selector).append(clusterUsageTemplate({
                title: swl.TITLE_CLUSTER_USAGE,
                usageChartId: swl.CLUSTER_USAGE_CHART_ID,
                replicaFactorId: swl.CLUSTER_REPLICA_FACTOR_ID,
                replicaFactorTitle: swl.TITLE_CLUSTER_REPLICA_FACTOR
            }));

            var defaultModelConfig = {
                modelKey: swc.UMID_CLUSTER_USAGE,
                remote: {
                    ajaxConfig: {
                        url: swc.URL_CLUSTER_USAGE,
                        type: 'GET'
                    },
                    dataParser: swp.clusterUsageDataParser
                },
                cacheConfig: {
                    ucid: swc.UCID_CLUSTER_USAGE
                },
                vlRemoteConfig: {
                    vlRemoteList: [{
                        getAjaxConfig: function (response) {
                            var lazyAjaxConfig = {
                                url: swc.URL_POOLS_SUMMARY,
                                type: 'GET'
                            };
                            return lazyAjaxConfig;
                        },
                        dataParser: swp.clusterReplicaFactorParser,
                        successCallback: function (clusterReplicationFactor, contrailListModel) {
                            var usageSummary = contrailListModel.getItems();
                            contrailListModel.updateData(swp.clusterUsageWithReplicaFactor(usageSummary, clusterReplicationFactor))
                        }
                    }]
                }
            };

            viewConfig.modelConfig = $.extend(true, {}, viewConfig.modelConfig, defaultModelConfig);

            var chartOptions = {
                margin: {top: 15, right: 30, bottom: 20, left: 60},
                height: 150,
                outerArc: {
                    tooltipFn: getClusterStatusTooltip
                },
                innerArc: {
                    tooltipFn: getClusterUsageTooltip
                },
                clickCB: function () {
                    return;
                },
                detailsTemplate: swc.TMPL_CLUSTER_USAGE_DETAILS,
                noDataMessage: "Unable to get cluster usage data."
            };
            viewConfig.chartOptions = $.extend(true, {}, viewConfig.chartOptions, chartOptions);

            if (!contrail.checkIfExist(viewConfig.parseFn)) {
                viewConfig.parseFn = swp.clusterUsageDonutChartParser;
            }

            self.model = new ContrailListModel(viewConfig.modelConfig);

            if (self.model !== null) {
                if (self.model.loadedFromCache || !(self.model.isRequestInProgress())) {
                    var chartData = self.model.getItems();
                    selector = swu.getSelector4Id(swl.CLUSTER_REPLICA_FACTOR_ID);
                    self.renderReplicaFactor(selector, viewConfig, chartData);

                    selector = swu.getSelector4Id(swl.CLUSTER_USAGE_CHART_ID);
                    self.renderChart(selector, viewConfig, chartData);
                }

                self.model.onAllRequestsComplete.subscribe(function () {
                    var chartData = self.model.getItems();
                    selector = swu.getSelector4Id(swl.CLUSTER_REPLICA_FACTOR_ID);
                    self.renderReplicaFactor(selector, viewConfig, chartData);

                    selector = swu.getSelector4Id(swl.CLUSTER_USAGE_CHART_ID);
                    self.renderChart(selector, viewConfig, chartData);
                });
            }
        },

        renderReplicaFactor: function (selector, viewConfig, data) {
            $(selector).text(data[0]['cluster_replica_factor']);
        },

        renderChart: function (selector, viewConfig, data) {
            var chartViewConfig, chartModel, chartData, chartOptions, svgHeight;

            if (contrail.checkIfFunction(viewConfig['parseFn'])) {
                data = viewConfig['parseFn'](data);
            }

            chartOptions = ifNull(viewConfig['chartOptions'], {});

            chartViewConfig = getChartViewConfig(data, chartOptions);
            chartData = chartViewConfig['chartData'];
            chartOptions = chartViewConfig['chartOptions'];
            chartModel = new UsageAndStatusDonutChart(chartOptions);
            this.chartModel = chartModel;
            svgHeight = chartOptions.height + 40;

            if ($(selector).find("svg") != null) {
                $(selector).empty();
            }

            $(selector).append("<svg style='height:" + svgHeight + "px;'></svg>");

            //Store the chart object as a data attribute so that the chart can be updated dynamically
            $(selector).data('chart', chartModel);

            if (!($(selector).is(':visible'))) {
                $(selector).find('svg').bind("refresh", function () {
                    d3.select($(selector)[0]).select('svg').datum(chartData).call(chartModel);
                });
            } else {
                d3.select($(selector)[0]).select('svg').datum(chartData).call(chartModel);
            }

            if (contrail.checkIfExist(chartOptions.detailsTemplate)) {
                var detailsTemplate = contrail.getTemplate4Id(chartOptions.detailsTemplate);
                $(selector).find(".usage-details-container").empty();
                $(selector).append(detailsTemplate(chartData.detailsData));
            }

            nv.utils.windowResize(function () {
                chUtils.updateChartOnResize(selector, chartModel);
            });

            if (chartOptions['deferredObj'] != null)
                chartOptions['deferredObj'].resolve();

            $(selector).find('.loading-spinner').remove();
        }
    });

    function getChartViewConfig(chartData, chartOptions) {
        var chartViewConfig = {};

        var chartDefaultOptions = {
            margin: {top: 20, right: 0, bottom: 20, left: 0},
            width: 150,
            height: 150,
            innerArc: {
                color: d3.scale.ordinal().range(["#1F77B4", "#C6DBEF", "#ADD6FB", "#6BAED6", "#D6EBFD", "#5DAEF8"]),
                opacity: 0,
                tooltipFn: function (d) {
                    return {
                        series: [{
                            key: d.data.name,
                            value: '',
                            color: d.data.color
                        }]
                    };
                }
            },
            outerArc: {
                color: d3.scale.ordinal().range(["#2CA02C", "#FF7F0E", "#D62728"]),
                opacity: 0.5,
                tooltipFn: function (d) {
                    return {
                        series: [{
                            key: d.data.name,
                            value: '',
                            color: d.data.color
                        }]
                    };
                },
                flagKey: 'Normal'
            }
        };
        var chartDefaultData = {
            innerData: [{
                name: "used",
                value: 0
            }, {
                name: "available",
                value: 100
            }],
            outerData: [{
                name: "Normal",
                value: 75
            }, {
                name: "Warning",
                value: 15
            }, {
                name: "Critical",
                value: 10
            }]
        };

        var chartOptions = $.extend(true, {}, chartDefaultOptions, chartOptions);
        var chartData = $.extend(true, {}, chartDefaultData, chartData);

        chartViewConfig['chartData'] = chartData;
        chartViewConfig['chartOptions'] = chartOptions;

        return chartViewConfig;
    };

    function getClusterStatusTooltip(currObj) {
        var tooltipContent = {series: []};
        tooltipContent.series.push({
            key: currObj.data.name,
            color: currObj.data.color,
            value: currObj.data.tooltip_data[0].value
        });
        tooltipContent.series.push({
            key: "Status",
            value: currObj.data.status
        });
        return tooltipContent;
    }

    function getClusterUsageTooltip(currObj) {
        var tooltipContent = {series: []};
        tooltipContent.series.push({
            key: currObj.data.name,
            color: currObj.data.color,
            value: currObj.data.tooltip_data[0].value + " (" + currObj.data.tooltip_data[1].value + ")"
        });
        return tooltipContent;
    };

    return ClusterUsageView;
});
