/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'contrail-view-model'
], function (_, ContrailViewModel) {
    var SViewConfig = function () {
        var self = this;

        self.getTabsViewConfig = function (tabType, elementObj) {
            var config = {};
            switch (tabType) {
                case swc.TAB_ELEMENT_STORAGENODE:
                    var options = {
                        storageNode: elementObj.storageNode
                    };
                    config = {
                        elementId: swl.MONITOR_STORAGENODE_VIEW_ID,
                        viewPathPrefix: 'monitor/infrastructure/ui/js/views/',
                        view: "StorageNodeTabView",
                        app: cowc.APP_CONTRAIL_STORAGE,
                        viewConfig: options
                    };
                    break;
                case swc.TAB_ELEMENT_DISK:
                    var options = {
                        disk: elementObj.disk,
                        storageNode: elementObj.storageNode,
                        uuid: elementObj.uuid
                    };
                    config = {
                        elementId: swl.MONITOR_DISK_VIEW_ID,
                        view: "DiskTabView",
                        app: cowc.APP_CONTRAIL_STORAGE,
                        viewConfig: options
                    };
                    break;
            }
            return config;
        };

        self.getStorageNodeTabViewConfig = function (viewConfig) {
            var storageNodeName = viewConfig.storageNode,
                uuid= viewConfig.uuid,
                tabsToDisplay = viewConfig.tabsToDisplay,
                tabObjs = [];

            var allTabs = [
                {
                    elementId: swl.STORAGENODE_TAB_ID,
                    title: swl.TITLE_STORAGENODE_DETAILS,
                    view: "DiskListView",
                    app: cowc.APP_CONTRAIL_STORAGE,
                    viewConfig: {
                        storageNode: storageNodeName,
                        uuid: uuid
                    }
                },
            ];

            if (tabsToDisplay == null) {
                tabObjs = allTabs;
            } else if (typeof tabsToDisplay == 'string' || $.isArray(tabsToDisplay)) {
                if (typeof tabsToDisplay == 'string') {
                    tabsToDisplay = [tabsToDisplay];
                }
                for (var i = 0; i < tabsToDisplay.length; i++) {
                    $.each(allTabs, function (idx, obj) {
                        if (obj['view'] == tabsToDisplay[i])
                            tabObjs.push(obj);
                    });
                }
            }

            return {
                elementId: swl.STORAGENODE_TAB_VIEW_ID,
                view: "TabsView",
                viewConfig: {
                    theme: 'overlay',
                    active: 1,
                    activate: function (e, ui) {
                        var selTab = $(ui.newTab.context).text();
                        if (selTab == swl.TITLE_STORAGENODE_DETAILS) {
                            $('#' + swl.MONITOR_DISK_GRID_ID).data('contrailGrid').refreshView();
                        }
                    },
                    tabs: tabObjs
                }
            };
        };

        self.getDiskTabViewConfig = function (viewConfig) {
            var diskName = viewConfig.disk,
                storageNodeName = viewConfig.storageNode,
                uuid= viewConfig.uuid,
                tabsToDisplay = viewConfig.tabsToDisplay,
                tabObjs = [];

            var allTabs = [
                {
                    elementId: swl.DISK_TAB_ID,
                    title: swl.TITLE_DISK_DETAILS,
                    view: "DiskDetailsView",
                    app: cowc.APP_CONTRAIL_STORAGE,
                    viewConfig: {
                        disk: diskName,
                        storageNode: storageNodeName,
                        uuid: uuid
                    }
                },
            ];

            if (tabsToDisplay == null) {
                tabObjs = allTabs;
            } else if (typeof tabsToDisplay == 'string' || $.isArray(tabsToDisplay)) {
                if (typeof tabsToDisplay == 'string') {
                    tabsToDisplay = [tabsToDisplay];
                }
                for (var i = 0; i < tabsToDisplay.length; i++) {
                    $.each(allTabs, function (idx, obj) {
                        if (obj['view'] == tabsToDisplay[i])
                            tabObjs.push(obj);
                    });
                }
            }

            return {
                elementId: swl.DISK_TAB_VIEW_ID,
                view: "TabsView",
                viewConfig: {
                    theme: 'overlay',
                    active: 1,
                    activate: function (e, ui) {
                        var selTab = $(ui.newTab.context).text();
                        //TBD refresh disk details view
                    },
                    tabs: tabObjs
                }
            };
        };

        self.getDetailsViewConfig = function (type, elementObj) {
            var config = {};
            switch (type) {
                case swc.DETAILS_ELEMENT_DISK:
                    var options = {
                        disk: elementObj.disk,
                        storageNode: elementObj.storageNode,
                        uuid: elementObj.uuid
                    };
                    config = {
                        elementId: cowu.formatElementId([swl.MONITOR_DISK_VIEW_ID]),
                        view: "SectionView",
                        viewConfig: {
                            rows: [
                                {
                                    columns: [
                                        {

                                            elementId: swl.DISK_DETAILS_ID+"-summary",
                                            title: swl.TITLE_DISK_DETAILS,
                                            view: "DetailsView",
                                            viewConfig: {
                                                class: 'col-xs-6',
                                                ajaxConfig: {
                                                    url: swc.get(swc.URL_DISK_DETAILS, options.disk),
                                                    type: 'GET'
                                                },
                                                templateConfig: swdt.getDiskSummaryDetailsTemplate(cowc.THEME_DETAIL_WIDGET, null),
                                                app: cowc.APP_CONTRAIL_STORAGE,
                                                dataParser: function (response) {
                                                    return (response.length != 0) ? swp.diskDataParser(response.osd_details) : {};
                                                }
                                            }
                                        },
                                        {
                                            elementId: swl.DISK_DETAILS_ID+"-status",
                                            title: swl.TITLE_DISK_DETAILS,
                                            view: "DetailsView",
                                            viewConfig: {
                                                class: 'col-xs-6',
                                                ajaxConfig: {
                                                    url: swc.get(swc.URL_DISK_DETAILS, options.disk),
                                                    type: 'GET'
                                                },
                                                templateConfig: swdt.getDiskStatusDetailsTemplate(cowc.THEME_DETAIL_WIDGET, null),
                                                app: cowc.APP_CONTRAIL_STORAGE,
                                                dataParser: function (response) {
                                                    return (response.length != 0) ? swp.diskDataParser(response.osd_details) : {};
                                                }
                                            }
                                        }
                                        ]
                                },
                                {
                                    columns: [
                                        {
                                            elementId: swl.DISK_ACTIVITY_STATS_ID,
                                            title: swl.TITLE_DISK_ACTIVITY_STATS,
                                            view: "DiskStatsTabView",
                                            viewPathPrefix: "monitor/storage/ui/js/views/",
                                            app: cowc.APP_CONTRAIL_STORAGE,
                                            viewConfig: {
                                                options: options,
                                                 class: 'col-xs-6',
                                            }
                                        },
                                        {
                                            elementId: swl.DISK_ACTIVITY_STATS_ID+"raw-disk",
                                            title: swl.TITLE_DISK_ACTIVITY_STATS+"raw-disk",
                                            view: "RawDiskStatsTabView",
                                            viewPathPrefix: "monitor/storage/ui/js/views/",
                                            app: cowc.APP_CONTRAIL_STORAGE,
                                            viewConfig: {
                                                options: options,
                                                 class: 'col-xs-6',
                                            }
                                        }
                                    ]
                                }
                            ]
                        }
                    };
                    break;
            }
            return config;
        };
    }
    return SViewConfig;
})
