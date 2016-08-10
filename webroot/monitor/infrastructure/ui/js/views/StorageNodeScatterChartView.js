/*
 * Copyright (c) 2015 Juniper Networks, Inc. All rights reserved.
 */

define(['underscore', 'contrail-view'], function(_, ContrailView) {
    var StorageNodeListView = ContrailView.extend({
        render: function() {
            var widgetConfig = getValueByJsonPath(this,'attributes;viewConfig;widgetConfig');
            if(widgetConfig != null) {
                this.renderView4Config(this.$el,
                this.model,
                widgetConfig
                );
            }
           this.renderView4Config(this.$el,
           this.model,
           getStorageNodeListViewConfig());
       }
    });
    var getStorageNodeListViewConfig = function () {
        return {
            elementId: swl.STORAGENODE_SUMMARY_SCATTERCHART_SECTION_ID,
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