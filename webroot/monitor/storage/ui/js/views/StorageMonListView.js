/*
 * Copyright (c) 2015 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'contrail-view',
    'contrail-list-model'
], function (_, ContrailView, ContrailListModel) {
    var StorageMonListView = ContrailView.extend({
        el: $(contentContainer),

        render: function () {
            var self = this,
                viewConfig = self.attributes.viewConfig,
                storageNodeName = viewConfig['storageNode'];

            var listModelConfig = {
                remote: {
                    ajaxConfig: {
                        url: storageNodeName != null ? swc.get(swc.URL_STORAGENODE_MONITOR_DETAILS, storageNodeName) : swc.URL_STORAGENODE_MONITORS_SUMMARY,
                        type: "GET"
                    },
                    dataParser: swp.storageMonitorsDataParser
                },
                cacheConfig: {
                    ucid: storageNodeName != null ? (swc.UCID_PREFIX_MS_LISTS + storageNodeName + ":monitor") : swc.UCID_ALL_MONITOR_LIST
                }
            };

            var contrailListModel = new ContrailListModel(listModelConfig);
            self.renderView4Config(self.$el, contrailListModel, getStorageMonListViewConfig());
        }
    });

    function getStorageMonListViewConfig() {
        return {
            elementId: cowu.formatElementId([swl.MONITOR_STORAGE_MONITOR_LIST_ID]),
            view: "SectionView",
            viewConfig: {
                rows: [
                    {
                        columns: [
                            {
                                elementId: swl.MONITOR_STORAGE_MONITOR_SCATTER_CHART_ID,
                                title: swl.TITLE_MONITORS,
                                view: "ZoomScatterChartView",
                                viewConfig: {
                                    loadChartInChunks: true,
                                    chartOptions: {
                                        xLabel: 'Total',
                                        xLabelFormat: function (xValue) {
                                            return formatBytes(xValue, true);
                                        },
                                        forceY: [0,10],
                                        yLabel: 'Usage (%)',
                                        yLabelFormat: d3.format(".01f"),
                                        dataParser: function (response) {
                                            return response;
                                        },
                                        tooltipConfigCB: getStorageMonitorTooltipConfig,
                                        clickCB: function (){ return; },
                                        sizeFieldName: '',
                                        margin: {left: 70},
                                        noDataMessage: "Unable to get Monitor data."
                                    }
                                }
                            },
                        ]
                    },
                    {
                        columns: [
                            {
                                elementId: swl.MONITOR_STORAGE_MONITORS_ID,
                                title: swl.TITLE_MONITORS,
                                view: "StorageMonGridView",
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

    return StorageMonListView;
});

function getStorageMonitorTooltipConfig(data) {
    var storagenodeFQNObj = data.name.split(':');

    return {
        title: {
            name: storagenodeFQNObj[0],
            type: swl.TITLE_CHART_ELEMENT_STORAGENODE_MONITOR
        },
        content: {
            iconClass: 'icon-contrail-storage-node',
            info: [
                {label: 'Available', value: data['avail_percent']},
                {label: 'Latency', value: data['latency']},
                {label: 'Clock Skew', value: data['skew']},
                {label: 'Root HD Total', value: formatBytes(data['x'])}
            ],
            actions: []
        },
        dimension: {
            width: 350
        }
    };

}