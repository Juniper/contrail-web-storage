/*
 * Copyright (c) 2015 Juniper Networks, Inc. All rights reserved.
 */

define(
    ['underscore', 'contrail-view', 'storage-dashboard-model'],
    function(_, ContrailView, StorageDashboardListModel) {
    var StorageNodeListView = ContrailView.extend({
        el: $(contentContainer),

        render: function () {
            var self = this, viewConfig = this.attributes.viewConfig;

          var sDashBoardListModel = new StorageDashboardListModel();
            self.renderView4Config(this.$el, sDashBoardListModel, getStorageNodeListViewConfig());
        }
    });

    var getStorageNodeListViewConfig = function () {
        return {
            elementId: cowu.formatElementId([swl.MONITOR_STORAGENODE_LIST_ID]),
            view: "SectionView",
            viewConfig: {
                rows: [
                    {
                        columns: [
                            {
                                elementId: swl.STORAGENODES_SCATTER_CHART_ID,
                                title: swl.TITLE_STORAGENODES,
                                view: "ZoomScatterChartView",
                                viewConfig: {
                                    loadChartInChunks: true,
                                    chartOptions: {
                                        xLabel: 'Used (%)',
                                        xLabelFormat: d3.format(".03f"),
                                        //forceX: [0, 1],
                                        forceY: [0, 10],
                                        yLabel: 'Avg. Bandwidth [Last 30 mins.]',
                                        yLabelFormat: function(yValue) {
                                            var formattedValue = formatThroughput(yValue, true);
                                            return formattedValue;
                                        },
                                        dataParser: function (response) {
                                            var nodeData = $.map(response, function(val, idx) {
                                                if (val['name'] != 'CLUSTER_HEALTH')
                                                    return val;
                                            });
                                            return nodeData;
                                        },
                                        tooltipConfigCB: getStorageNodeTooltipConfig,
                                        clickCB: onScatterChartClick,
                                        sizeFieldName: 'osds_used_perc',
                                        margin: {left: 65, right:15},
                                        noDataMessage: "Unable to get any storage node details."
                                     }
                                }
                            },
                        ]
                    },
                    {
                        columns: [
                            {
                                elementId: swl.MONITOR_STORAGENODES_ID,
                                title: swl.TITLE_STORAGENODES,
                                viewPathPrefix: 'monitor/infrastructure/ui/js/views/',
                                view: "StorageNodeGridView",
                                app: cowc.APP_CONTRAIL_STORAGE,
                                viewConfig: {pagerOptions: { options: { pageSize: 8, pageSizeSelect: [8, 50, 100] } }}
                            }
                        ]
                    }
                ]
            }
        }
    };

    function onScatterChartClick(chartConfig) {
        var storagenodeFQN = chartConfig['name'];
        swcc.setStorageNodeURLHashParams(null, storagenodeFQN, true);
    };

    function getStorageNodeTooltipConfig(data) {
        var storageNodeFQNObj = data.name.split(':');

        return {
            title: {
                name: storageNodeFQNObj[0],
                type: swl.TITLE_CHART_ELEMENT_STORAGENODE
            },
            content: {
                iconClass: false,
                info: [
                    {label:'Disk Count', value: data['osds'].length},
                    {label:'Available', value: data['osds_available']},
                    {label:'Total', value: data['osds_total']},
                    {label:'Avg. Bandwidth [Last 30 mins.]', value:formatThroughput(data['y'])}
                ],
                actions: [
                    {
                        type: 'link',
                        text: 'View',
                        iconClass: 'fa fa-external-link',
                        callback: onScatterChartClick
                    }
                ]
            },
            dimension: {
                width: 350
            }
        };
    };

    return StorageNodeListView;
});