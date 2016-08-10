/*
 * Copyright (c) 2015 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'contrail-view'
], function (_, ContrailView) {
    var StorageNodeGridView = ContrailView.extend({
        el: $(contentContainer),

        render: function () {
            var self = this,
                viewConfig = self.attributes.viewConfig,
                pagerOptions = viewConfig['pagerOptions'],
                ucid = swc.UCID_ALL_STORAGENODE_LIST,
                storageNodesRemoteConfig = {
                    url: swc.get(swc.URL_STORAGENODES_SUMMARY),
                    type: "GET"
                };
            this.renderView4Config(self.$el,
                self.model,
                getStorageNodeGridViewConfig(storageNodesRemoteConfig, ucid, pagerOptions),
                null,
                null,
                null,
                function() {
                    self.model.onDataUpdate.subscribe(function () {
                        if($('#'+swl.STORAGENODES_GRID_ID).data('contrailGrid')) {
                            $('#'+swl.STORAGENODES_GRID_ID).data('contrailGrid')._grid.invalidate();
                        }
                    });
            });
        }
    });

    var getStorageNodeGridViewConfig = function (storagenodesRemoteConfig, ucid, pagerOptions) {
        return {
            elementId : swl.STORAGENODES_GRID_ID,
            title : swl.TITLE_STORAGENODES_SUMMARY,
            view : "GridView",
            viewConfig : {
                elementConfig :
                    getStorageNodeGridConfig(
                        storagenodesRemoteConfig, ucid, pagerOptions)
            }
        };
    };

    var getStorageNodeGridConfig = function (storageNodesRemoteConfig, ucid, pagerOptions) {
        var gridElementConfig = {
            header: {
                title: {
                    text: swl.TITLE_STORAGENODES_SUMMARY,
                    cssClass: 'blue'
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
                    rowHeight: 30,
                    autoHeight: true,
                    enableAsyncPostRender: true,
                    forceFitColumns: true,
                    checkboxSelectable: false,
                    detail: {
                        template: cowu.generateDetailTemplateHTML(getStorageNodeDetailsTemplateConfig(), cowc.APP_CONTRAIL_STORAGE, 'rawData')
                    }
                },
                dataSource: {
                    remote: {
                        ajaxConfig: storageNodesRemoteConfig,
                        dataParser: swp.storagenodeDataParser
                    },
                    cacheConfig: ucid
                },
                statusMessages: {
                    loading: {
                        text: 'Loading Storage Nodes..'
                    },
                    empty: {
                        text: 'No storage nodes to display.'
                    },
                    errorGettingData: {
                        type: 'error',
                        iconClasses: 'fa fa-warning',
                        text: 'Error in getting Data.'
                    }
                }
            },
            columnHeader: {
                columns: swgc.storageNodeColumns
            },
            footer: {
                pager: contrail.handleIfNull(pagerOptions, {options: {pageSize: 8, pageSizeSelect: [8, 50, 100]}})
            }
        };
        return gridElementConfig;
    };

    function getStorageNodeDetailsTemplateConfig() {
        //TODO: Complete
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
                                            title: swl.TITLE_STORAGENODE_DETAILS,
                                            templateGenerator: 'BlockListTemplateGenerator',
                                            templateGeneratorConfig: [
                                                {
                                                    key: 'name',
                                                    templateGenerator: 'TextGenerator'
                                                },
                                                {
                                                    key: 'version',
                                                    templateGenerator: 'TextGenerator'
                                                },
                                                {
                                                    key: 'status',
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
                                            title: swl.TITLE_DISK_DETAILS,
                                            templateGenerator: 'BlockListTemplateGenerator',
                                            templateGeneratorConfig: [
                                                {
                                                    key: 'osds_count',
                                                    templateGenerator: 'TextGenerator'
                                                },
                                                {
                                                    key: 'osds_used',
                                                    templateGenerator: 'TextGenerator'
                                                },
                                                {
                                                    key: 'osds_total',
                                                    templateGenerator: 'TextGenerator'
                                                },
                                                {
                                                    key: 'osds_status',
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

    return StorageNodeGridView;
});
