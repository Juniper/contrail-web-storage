/*
 * Copyright (c) 2015 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'contrail-view'
], function (_, ContrailView) {
    var PoolGridView = ContrailView.extend({
        el: $(contentContainer),

        render: function () {
            var self = this,
                viewConfig = this.attributes.viewConfig,
                poolName = viewConfig['pool'],
                pagerOptions = viewConfig['pagerOptions'];

            var monitorRemoteConfig = {
                url: poolName != null ? swc.get(swc.URL_POOL_DETAILS, poolName) : swc.URL_POOLS_SUMMARY,
                type: 'GET'
            };

            var ucid = poolName != null ? (swc.UCID_PREFIX_MS_LISTS + poolName + ":pool") : swc.UCID_ALL_POOL_LIST;

            self.renderView4Config(self.$el, self.model, getPoolsGridViewConfig(monitorRemoteConfig, ucid, pagerOptions));

        }
    });

    var getPoolsGridViewConfig = function (monitorRemoteConfig, ucid, pagerOptions) {
        return {
            elementId: cowu.formatElementId([swl.MONITOR_POOL_LIST_VIEW_ID]),
            view: "SectionView",
            viewConfig: {
                rows: [
                    {
                        columns: [
                            {
                                elementId: swl.MONITOR_POOL_GRID_ID,
                                title: swl.TITLE_POOLS,
                                view: "GridView",
                                viewConfig: {
                                    elementConfig: getPoolsGridConfig(monitorRemoteConfig, ucid, pagerOptions)
                                }
                            }
                        ]
                    }
                ]
            }
        }
    };

    var getPoolsGridConfig = function (monitorRemoteConfig, ucid, pagerOptions) {

        var gridElementConfig = {
            header: {
                title: {
                    text: swl.TITLE_POOL_SUMMARY
                },
                defaultControls: {
                    collapseable: false,
                    exportable: true,
                    refreshable: true,
                    searchable: true
                }
            },
            body: {
                options: {
                    autoRefresh: false,
                    checkboxSelectable: false,
                    detail: {
                        template: cowu.generateDetailTemplateHTML(getPoolsDetailTemplateConfig(), cowc.APP_CONTRAIL_STORAGE, '{{{formatGridJSON2HTML this.rawData}}}')
                    },
                    fixedRowHeight: 30
                },
                dataSource: {
                    remote: {
                        ajaxConfig: monitorRemoteConfig,
                        dataParser: swp.poolsDataParser
                    },
                    cacheConfig: {
                        ucid: ucid
                    }
                }
            },
            columnHeader: {
                columns: swgc.poolsColumns
            },
            footer: {
                pager: contrail.handleIfNull(pagerOptions, {options: {pageSize: 5, pageSizeSelect: [5, 10, 50, 100]}})
            }
        };
        return gridElementConfig;
    };


    function getPoolsDetailTemplateConfig() {
        return {
            templateGenerator: 'RowSectionTemplateGenerator',
            templateGeneratorConfig: {
                rows: [
                    {
                        templateGenerator: 'ColumnSectionTemplateGenerator',
                        templateGeneratorConfig: {
                            columns: [
                                {
                                    class: 'span6',
                                    rows: [
                                        {
                                            title: swl.TITLE_POOL_DETAILS,
                                            templateGenerator: 'BlockListTemplateGenerator',
                                            templateGeneratorConfig: [
                                                {
                                                    key: 'name',
                                                    templateGenerator: 'TextGenerator'
                                                },
                                                {
                                                    key: 'pool',
                                                    templateGenerator: 'TextGenerator'
                                                },
                                                {
                                                    key: 'pg_num',
                                                    templateGenerator: 'TextGenerator'
                                                },
                                                {
                                                    key: 'snap_mode',
                                                    templateGenerator: 'TextGenerator'
                                                },
                                                {
                                                    key: 'cache_mode',
                                                    templateGenerator: 'TextGenerator'
                                                },
                                                {
                                                    key: 'crush_ruleset',
                                                    templateGenerator: 'TextGenerator'
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    class: 'span6',
                                    rows: [
                                        {
                                            title: swl.TITLE_POOL_STATS,
                                            templateGenerator: 'BlockListTemplateGenerator',
                                            templateGeneratorConfig: [
                                                {
                                                    key: 'used',
                                                    templateGenerator: 'TextGenerator'
                                                },
                                                {
                                                    key: 'max_avail',
                                                    templateGenerator: 'TextGenerator'
                                                },
                                                {
                                                    key: 'objects',
                                                    templateGenerator: 'TextGenerator'
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    }
                ]
            }
        };
    };

    return PoolGridView;
});
