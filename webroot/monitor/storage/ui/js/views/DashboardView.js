/*
 * Copyright (c) 2015 Juniper Networks, Inc. All rights reserved.
 */


define(['underscore', 'contrail-view'], function(_, ContrailView) {
    var DashboardView = ContrailView.extend({
     el: $(contentContainer),
       render: function() {
           this.renderView4Config(this.$el,
           null,
           getDashboardViewConfig());
       }
    });

    function getDashboardViewConfig() {
        return {
            elementId: cowu.formatElementId([swl.MONITOR_STORAGE_DASHBOARD_LIST_ID]),
            view: "SectionView",
            viewConfig: {
                rows: [
                    {
                        columns: [
                            {
                                elementId: cowu.formatElementId([swl.MONITOR_STORAGE_DASHBOARD_USAGE_SECTION_ID]),
                                view: "SectionView",
                                viewConfig: {
                                    rows: [
                                        {
                                            columns: [
                                                {
                                                    elementId: swl.CLUSTER_STATUS_ID+ '-rtd',
                                                    view: "DetailsView",
                                                    viewConfig: {
                                                        class: 'col-xs-4',
                                                        templateConfig: swdt.getClusterStausDetailTemplate(cowc.THEME_DETAIL_WIDGET, null),
                                                        app: cowc.APP_CONTRAIL_STORAGE,
                                                        ajaxConfig: {
                                                            url: swc.URL_CLUSTER_STATUS,
                                                            type: 'GET'
                                                        },
                                                        dataParser: swp.clusterStatusDataParser
                                                    }
                                                },
                                                {
                                                    elementId: swl.MONITOR_CLUSTER_USAGE_ID,
                                                    title: swl.TITLE_CLUSTER_USAGE,
                                                    view: "ClusterUsageView",
                                                    app: cowc.APP_CONTRAIL_STORAGE,
                                                    viewConfig: {
                                                        class: 'col-xs-4',
                                                        modelConfig: {
                                                            remote: {
                                                                ajaxConfig: {
                                                                    url: swc.URL_CLUSTER_USAGE,
                                                                    type: 'GET'
                                                                },
                                                                dataParser: swp.clusterUsageDataParser
                                                            },
                                                            cacheConfig: {
                                                                ucid: swc.UCID_CLUSTER_USAGE
                                                            }
                                                        }
                                                    }
                                                },
                                                /*{
                                                    elementId: swl.POOL_STATS_CHART_ID,
                                                    view: "DonutChartView",
                                                    viewPathPrefix: "core-basedir/js/views/",
                                                    app: cowc.APP_CONTRAIL_STORAGE,
                                                    viewConfig: {
                                                        class: 'col-xs-3',
                                                        widgetConfig: {
                                                            elementId: swl.POOL_STATS_CHART_ID + '-widget',
                                                            view: "WidgetView",
                                                            viewConfig: {
                                                                header: {
                                                                    title: swl.TITLE_POOL_STATS,
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
                                                        modelConfig: {
                                                            remote: {
                                                                ajaxConfig: {
                                                                    url: swc.URL_POOLS_SUMMARY,
                                                                    type: 'GET'
                                                                },
                                                                dataParser: swp.poolsDataParser
                                                            },
                                                            cacheConfig: {
                                                                ucid: swc.UCID_ALL_POOL_LIST
                                                            }
                                                        },
                                                        loadChartInChunks: true,
                                                        parseFn: swp.poolsDonutChartDataParser,
                                                        chartOptions: {
                                                            //margin: {top: 10, right: 10, bottom: 20, left: 40},
                                                            donutRatio: 0.6,
                                                            height: 200,
                                                            showLegend: true,
                                                            legendPosition: 'right',
                                                            showLabels: false,
                                                            legendRightAlign: true,
                                                            legendPadding: 32,
                                                            noDataMessage: "Unable to get pool data.",
                                                            valueFormat: formatBytes

                                                        }
                                                    }
                                                },*/
                                                {
                                                    elementId: swl.DISK_STATUS_CHART_ID,
                                                    view: "DonutChartView",
                                                    viewPathPrefix: "core-basedir/js/views/",
                                                    app: cowc.APP_CONTRAIL_STORAGE,
                                                    viewConfig: {
                                                        class: 'col-xs-4',
                                                        widgetConfig: {
                                                            elementId: swl.DISK_STATUS_CHART_ID + '-widget',
                                                            view: "WidgetView",
                                                            viewConfig: {
                                                                header: {
                                                                    title: swl.TITLE_DISK_STATUS,
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
                                                        modelConfig: {
                                                            remote: {
                                                                ajaxConfig: {
                                                                    url: swc.URL_DISK_STATUS,
                                                                    type: 'GET'
                                                                },
                                                                dataParser: swp.disksStatusDonutChartDataParser
                                                            },
                                                            cacheConfig: {
                                                                ucid: swc.UCID_ALL_DISK_STATUS_LIST
                                                            }
                                                        },
                                                        loadChartInChunks: true,
                                                        chartOptions: {
                                                            donutRatio: 0.6,
                                                            height: 200,
                                                            showLegend: true,
                                                            legendPosition: 'right',
                                                            showLabels: false,
                                                            legendRightAlign: true,
                                                            legendPadding: 32,
                                                            noDataMessage: "Unable to get disk stats data.",
                                                            valueFormat: swu.addUnits2Disks
                                                        }
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            columns: [{
                                                elementId: cowu.formatElementId([swl.MONITOR_STORAGE_DASHBOARD_USAGE_SECTION_ID+"-chart"]),
                                                view: "SectionView",
                                                viewConfig: {
                                                    //class: 'col-xs-3',
                                                    rows: [
                                                        {
                                                            columns: [
                                                                {
                                                                    elementId: "dashboard-ceph-tab-view",
                                                                    view: "DashboardCephStatTabView",
                                                                    app: cowc.APP_CONTRAIL_STORAGE,
                                                                    viewConfig: {
                                                                       class: 'col-xs-6',
                                                                    }
                                                                },{
                                                                    elementId: "dashboard-raw-tab-view",
                                                                    view: "DashboardRawStatTabView",
                                                                    app: cowc.APP_CONTRAIL_STORAGE,
                                                                    viewConfig: {
                                                                        class: 'col-xs-6',
                                                                    }
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                }
                                            }]
                                        }
                                    ]
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
        var diskFQNObj = data.name.split(':');

        return {
            title: {
                name: diskFQNObj[0],
                type: swl.TITLE_CHART_ELEMENT_DISK
            },
            content: {
                iconClass: 'icon-contrail-storage-disk',
                info: [
                    {label: 'Available', value: data['available']},
                    {label: 'Total', value: data['total']},
                    {label: 'Avg. Bandwidth', value: formatThroughput(data['y'])}
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
        return swu.getDiskTooltipConfig({data: data, actions: {linkCallbackFn: onScatterChartClick}});
    };

    return DashboardView;
});