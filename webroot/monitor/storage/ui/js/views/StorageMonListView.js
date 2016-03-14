/*
 * Copyright (c) 2015 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'contrail-view',
    'monitor-storage-basedir/js/models/MonitorListModel'
], function (_, ContrailView, MonitorListModel) {
    var StorageMonListView = ContrailView.extend({
        el: $(contentContainer),

        render: function () {
            var self = this,
                viewConfig = self.attributes.viewConfig,
                storageNodeName = viewConfig['storageNode'];
            var monListModel = new MonitorListModel(storageNodeName);
            self.renderView4Config(self.$el, monListModel, getStorageMonListViewConfig());
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
                                        yLabel: 'Total',
                                        yLabelFormat: function (xValue) {
                                            return formatBytes(xValue, true);
                                        },
                                        //forceX: [0,10],
                                        xLabel: 'Usage (%)',
                                        xLabelFormat: d3.format(".02f"),
                                        dataParser: function (response) {
                                            return response;
                                        },
                                        tooltipConfigCB: getStorageMonitorTooltipConfig,
                                        clickCB: function (){ return; },
                                        sizeFieldName: '',
                                        margin: {left: 65, right:15},
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
            iconClass: false,
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