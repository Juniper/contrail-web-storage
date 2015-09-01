/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'contrail-view',
    'contrail-list-model'
], function (_, ContrailView, ContrailListModel) {
    var DiskListView = ContrailView.extend({
        el: $(contentContainer),

        render: function () {
            var self = this,
                viewConfig = self.attributes.viewConfig,
                storageNodeName = viewConfig['storageNode'];

            var listModelConfig = {
                remote: {
                    ajaxConfig: {
                        url: storageNodeName != null ? swc.get(swc.URL_STORAGENODE_DISKS, storageNodeName) : swc.URL_DISKS_SUMMARY,
                        type: "GET"
                    },
                    dataParser: swp.disksDataParser
                },
                cacheConfig: {
                    ucid: storageNodeName != null ? (swc.UCID_PREFIX_MS_LISTS + storageNodeName + ":disks") : swc.UCID_ALL_DISK_LIST
                }
            };

            var contrailListModel = new ContrailListModel(listModelConfig);
            self.renderView4Config(self.$el, contrailListModel, getDiskListViewConfig());
        }
    });

    function getDiskListViewConfig() {
        return {
            elementId: cowu.formatElementId([swl.MONITOR_DISK_LIST_ID]),
            view: "SectionView",
            viewConfig: {
                rows: [
                    {
                        columns: [
                            {
                                elementId: swl.DISK_SCATTER_CHART_ID,
                                title: swl.TITLE_DISKS,
                                view: "ZoomScatterChartView",
                                viewConfig: {
                                    loadChartInChunks: true,
                                    chartOptions: {
                                        xLabel: 'Usage (%)',
                                        yLabel: 'Avg. Bandwidth [R + W] ',
                                        forceX: [0, 100],
                                        forceY: [0, 10],
                                        yLabelFormat: function (yValue) {
                                            var formattedValue = formatThroughput(yValue, true);
                                            return formattedValue;
                                        },
                                        tooltipConfigCB: getDiskTooltipConfig,
                                        clickCB: onScatterChartClick,
                                        controlPanelConfig: {
                                            filter: {
                                                enable: true,
                                                viewConfig: getControlPanelFilterConfig()
                                            },
                                            legend: {
                                                enable: true,
                                                viewConfig: getControlPanelLegendConfig()
                                            }
                                        },
                                        sizeFieldName: 'used_perc',
                                        margin: {left: 70},
                                        noDataMessage: "No Disk data found."
                                    }
                                }
                            },
                        ]
                    },
                    {
                        columns: [
                            {
                                elementId: swl.MONITOR_DISKS_ID,
                                title: swl.TITLE_DISKS,
                                view: "DiskGridView",
                                app: cowc.APP_CONTRAIL_STORAGE,
                                viewConfig: {
                                    storageNode: null,
                                    parentType: 'storageNode',
                                    pagerOptions: {options: {pageSize: 10, pageSizeSelect: [10, 50, 100]}}
                                }
                            }
                        ]
                    }
                ]
            }
        }
    };

    function onScatterChartClick(chartConfig) {
        var diskFQN = chartConfig['name'],
            storagenodeFQN = chartConfig['host'];
        swcc.setDiskURLHashParams(null, {fqName: diskFQN, fqHost: storagenodeFQN}, true);
    };

    function getDiskTooltipConfig(data) {
        return swu.getDiskTooltipConfig({data: data, actions: {linkCallbackFn: onScatterChartClick}});
    };

    function getControlPanelFilterConfig() {
        return {
            groups: [
                {
                    id: 'by-node-color',
                    title: false,
                    type: 'checkbox-circle',
                    items: [
                        {
                            text: 'Up & In',
                            labelCssClass: 'okay',
                            filterFn: function(d) { return d['status'] === 'up' && d['cluster_status'] === 'in'; }
                        },
                        {
                            text: 'Up & Out',
                            labelCssClass: 'medium',
                            filterFn: function(d) { return d['status'] === 'up' && d['cluster_status'] === 'out'; }
                        },
                        {
                            text: 'Down',
                            labelCssClass: 'error',
                            filterFn: function(d) { return d['status'] === 'down'; }
                        }
                    ]
                }
            ]
        };
    };

    function getControlPanelLegendConfig() {
        return {
            groups: [
                {
                    id: 'by-node-color',
                    title: 'Disk Color',
                    items: [
                        {
                            text: 'Up & In',
                            labelCssClass: 'icon-circle okay',
                            events: {
                                click: function (event) {}
                            }
                        },
                        {
                            text: 'Up & Out',
                            labelCssClass: 'icon-circle medium',
                            events: {
                                click: function (event) {}
                            }
                        },
                        {
                            text: 'Down',
                            labelCssClass: 'icon-circle error',
                            events: {
                                click: function (event) {}
                            }
                        }
                    ]
                },
                {
                    id: 'by-node-size',
                    title: 'Disk Size',
                    items: [
                        {
                            text: 'Total Disk Memory',
                            labelCssClass: 'icon-circle',
                            events: {
                                click: function (event) {}
                            }
                        }
                    ]
                }
            ]
        };
    };

    return DiskListView;
});