
/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'contrail-view'
], function (_, ContrailView) {
    var DiskGridView = ContrailView.extend({
        el: $(contentContainer),

        render: function () {
            var self = this,
                viewConfig = this.attributes.viewConfig,
                storageNodeName = viewConfig['storageNode'],
                pagerOptions = viewConfig['pagerOptions'];

            var diskRemoteConfig = {
                url: storageNodeName != null ? swc.get(swc.URL_STORAGENODE_DISKS, storageNodeName) : swc.URL_DISKS_SUMMARY,
                type: 'GET'
            };

            var ucid = storageNodeName != null ? (swc.UCID_PREFIX_MS_LISTS + storageNodeName + ":disks") : swc.UCID_ALL_DISK_LIST;

            self.renderView4Config(self.$el, self.model, getDisksGridViewConfig(diskRemoteConfig, ucid, pagerOptions));

        }
    });

    function getDisksGridViewConfig(diskRemoteConfig, fetchedDiskList, ucid, pagerOptions) {
        return {
            elementId: cowu.formatElementId([swl.MONITOR_DISK_LIST_VIEW_ID]),
            view: "SectionView",
            viewConfig: {
                rows: [
                    {
                        columns: [
                            {
                                elementId: swl.MONITOR_DISK_GRID_ID,
                                title: swl.TITLE_DISKS,
                                view: "GridView",
                                viewConfig: {
                                    elementConfig: getDisksGridConfig(diskRemoteConfig, ucid, pagerOptions)
                                }
                            }
                        ]
                    }
                ]
            }
        }
    };

    var getDisksGridConfig = function (diskRemoteConfig, ucid, pagerOptions) {

        var gridElementConfig = {
            header: {
                title: {
                    text: swl.TITLE_DISK_SUMMARY
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
                        template: cowu.generateDetailTemplateHTML(getDiskDetailsTemplateConfig(), cowc.APP_CONTRAIL_STORAGE, 'rawData')
                    },
                    fixedRowHeight: 30
                },
                dataSource: {
                    remote: {
                        ajaxConfig: diskRemoteConfig,
                        dataParser: swp.disksDataParser
                    },
                    cacheConfig: {
                        ucid: ucid
                    }
                }
            },
            columnHeader: {
                columns: swgc.disksColumns
            },
            footer: {
                pager: contrail.handleIfNull(pagerOptions, {options: {pageSize: 5, pageSizeSelect: [5, 10, 50, 100]}})
            }
        };
        return gridElementConfig;
    };


    function getDiskDetailsTemplateConfig() {
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
                                    class: 'span6',
                                    rows: [
                                        {
                                            title: swl.TITLE_DISK_DETAILS,
                                            templateGenerator: 'BlockListTemplateGenerator',
                                            templateGeneratorConfig: [
                                                {
                                                    key: 'id',
                                                    templateGenerator: 'TextGenerator'
                                                },
                                                {
                                                    key: 'name',
                                                    templateGenerator: 'TextGenerator'
                                                },
                                                {
                                                    key: 'host',
                                                    templateGenerator: 'TextGenerator'
                                                },
                                                {
                                                    key: 'status_tmpl',
                                                    templateGenerator: 'TextGenerator'
                                                },
                                                {
                                                    key: 'cluster_status_tmpl',
                                                    templateGenerator: 'TextGenerator'
                                                },
                                                {
                                                    key: 'public_addr',
                                                    templateGenerator: 'TextGenerator'
                                                },
                                                {
                                                    key: 'state',
                                                    templateGenerator: 'TextGenerator'
                                                },
                                                {
                                                    key: 'uuid',
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
                                            title: swl.TITLE_DISK_USAGE,
                                            templateGenerator: 'BlockListTemplateGenerator',
                                            templateGeneratorConfig: [
                                                {
                                                    key: 'used',
                                                    templateGenerator: 'TextGenerator'
                                                },
                                                {
                                                    key: 'total',
                                                    templateGenerator: 'TextGenerator'
                                                },
                                                {
                                                    key: 'available',
                                                    templateGenerator: 'TextGenerator'
                                                },
                                                {
                                                    key: 'apply_latency',
                                                    templateGenerator: 'TextGenerator'
                                                },
                                                {
                                                    key: 'commit_latency',
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

    return DiskGridView;
});



