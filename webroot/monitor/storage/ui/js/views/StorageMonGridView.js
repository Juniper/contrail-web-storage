/*
 * Copyright (c) 2015 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'contrail-view'
], function (_, ContrailView) {
    var StorageMonGridView = ContrailView.extend({
        el: $(contentContainer),

        render: function () {
            var self = this,
                viewConfig = this.attributes.viewConfig,
                monName = viewConfig['storageNode'],
                pagerOptions = viewConfig['pagerOptions'],
                monitorRemoteConfig = {
                   url: monName != null ? swc.get(swc.URL_STORAGENODE_MONITOR_DETAILS, monName) : swc.URL_STORAGENODE_MONITORS_SUMMARY,
                   type: 'GET'
                };
                ucid = monName != null ? (swc.UCID_PREFIX_MS_LISTS + monName + ":monitor") : swc.UCID_ALL_MONITOR_LIST;
            this.renderView4Config(self.$el,
                self.model,
                getStorageMonsGridViewConfig(monitorRemoteConfig, ucid, pagerOptions),
                null,
                null,
                null,
                function() {
                    self.model.onDataUpdate.subscribe(function () {
                        if($('#'+swl.MONITOR_STORAGE_MONITOR_GRID_ID).data('contrailGrid')) {
                            $('#'+swl.MONITOR_STORAGE_MONITOR_GRID_ID).data('contrailGrid')._grid.invalidate();
                        }
                    });
            });
        }
    });

    function getStorageMonsGridViewConfig(monitorRemoteConfig, ucid, pagerOptions) {
       return {
            elementId : swl.MONITOR_STORAGE_MONITOR_GRID_ID,
            title : swl.TITLE_MONITORS,
            view : "GridView",
            viewConfig : {
                elementConfig :
                    getStorageMonsGridConfig(
                        monitorRemoteConfig, ucid, pagerOptions)
            }
        };
    };

    var getStorageMonsGridConfig = function (monitorRemoteConfig, ucid, pagerOptions) {

        var gridElementConfig = {
            header: {
                title: {
                    text: swl.TITLE_MONITOR_SUMMARY
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
                        template: cowu.generateDetailTemplateHTML(getStorageMonsDetailsTemplateConfig(), cowc.APP_CONTRAIL_STORAGE, 'rawData')
                    },
                    fixedRowHeight: 30
                },
                dataSource: {
                    remote: {
                        ajaxConfig: monitorRemoteConfig,
                        dataParser: swp.storageMonitorsDataParser
                    },
                    cacheConfig: {
                        ucid: ucid
                    }
                }
            },
            columnHeader: {
                columns: swgc.storageMonitorsColumns
            },
            footer: {
                pager: contrail.handleIfNull(pagerOptions, {options: {pageSize: 5, pageSizeSelect: [5, 10, 50, 100]}})
            }
        };
        return gridElementConfig;
    };


    function getStorageMonsDetailsTemplateConfig() {
        return {
            templateGenerator: 'RowSectionTemplateGenerator',
            templateGeneratorConfig: {
                rows: [
                    {
                        templateGenerator: 'ColumnSectionTemplateGenerator',
                        templateGeneratorConfig: {
                            columns: [
                                {
                                    class: 'col-xs-6',
                                    rows: [
                                        {
                                            title: swl.TITLE_MONITOR_DETAILS,
                                            templateGenerator: 'BlockListTemplateGenerator',
                                            templateGeneratorConfig: [
                                                {
                                                    key: 'name',
                                                    templateGenerator: 'TextGenerator'
                                                },
                                                {
                                                    key: 'rank',
                                                    templateGenerator: 'TextGenerator'
                                                },
                                                {
                                                    key: 'addr',
                                                    templateGenerator: 'TextGenerator'
                                                },
                                                {
                                                    key: 'skew',
                                                    templateGenerator: 'TextGenerator'
                                                },
                                                {
                                                    key: 'latency',
                                                    templateGenerator: 'TextGenerator'
                                                },
                                                {
                                                    key: 'details',
                                                    templateGenerator: 'TextGenerator'
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    class: 'col-xs-6',
                                    rows: [
                                        {
                                            title: swl.TITLE_ROOT_DISK_USAGE,
                                            templateGenerator: 'BlockListTemplateGenerator',
                                            templateGeneratorConfig: [
                                                {
                                                    key: 'avail_percent',
                                                    templateGenerator: 'TextGenerator'
                                                },
                                                {
                                                    key: 'used',
                                                    templateGenerator: 'TextGenerator'
                                                },
                                                {
                                                    key: 'total',
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

    return StorageMonGridView;
});
