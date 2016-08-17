/*
 * Copyright (c) 2015 Juniper Networks, Inc. All rights reserved.
 */

define(
        [ 'underscore', 'contrail-view' ],
        function(
                _, ContrailView) {
            var StorageAlertGridView = ContrailView.extend({
                render: function() {
                    var self = this;
                    this.renderView4Config(self.$el,self.model,
                        getDashboardAlertGridViewConfig());
                }
            });

            function getDashboardAlertGridViewConfig() {
                return {
                    elementId : cowc.DASHBOARD_ALERTS_GRID_SECTION_ID,
                    view : "SectionView",
                    viewConfig : {
                        rows : [ {
                            columns : [ {
                                elementId : cowc.DASHBOARD_ALERTS_GRID_ID,
                                title : cowc.DASHBOARD_ALERTS_GRID_TITLE,
                                view : "GridView",
                                viewConfig : {
                                    elementConfig :
                                        getDashboardAlertGridConfig()
                                }
                            } ]
                        } ]
                    }
                };
            }

            function getDashboardAlertGridConfig() {
                var statusTemplate = contrail.getTemplate4Id('statusTemplate');
                var columns = [
                    {
                        field:'name',
                        name:'Node',
                        minWidth:150,
                        formatter: function(r,c,v,cd,dc) {
                            if(typeof(dc['sevLevel']) != "undefined"
                                && typeof(dc['name']) != "undefined") {
                                return "<span>" + statusTemplate({
                                        sevLevel: dc['sevLevel'],
                                        sevLevels: sevLevels
                                    }) + dc['name'] + "</span>";
                            } else {
                                return dc['name'];
                            }
                        }
                    },{
                        field:'type',
                        name:'Process Type',
                        minWidth:100
                    },{
                        field:'msg',
                        name:'Message',
                        minWidth:200,
                    },{
                        field:'timeStamp',
                        name:'Time',
                        minWidth:100,
                        formatter:function(r,c,v,cd,dc) {
                            if(typeof(dc['timeStamp']) != "undefined")
                                return getFormattedDate(dc['timeStamp']/1000);
                            else
                                return "";
                        }
                    }
                ];
                var gridElementConfig = {
                    header : {
                        title : {
                            text : 'Alerts',
                            cssClass : 'blue',
                        },
                        defaultControls: {
                            collapseable: false,
                            exportable: false,
                            refreshable: false,
                            searchable: false
                        },
                        customControls: []
                    },
                    columnHeader : {
                        columns : columns
                    },
                    body : {
                        options : {
                            autoRefresh: false,
                            forceFitColumns: true,
                            fixedRowHeight: 30,
                            lazyLoading: false,
                            detail: {
                                template: cowu.generateDetailTemplateHTML(getAlertDetailsTemplateConfig(), cowc.APP_CONTRAIL_STORAGE)
                            },
                            checkboxSelectable : false,
                            collapseable: false,
                        },
                        dataSource : {
                            dataView: self.model
                        }
                    },
                    footer: {
                        pager: {options: {pageSize: 10, pageSizeSelect: [5, 10, 50, 100]}}
                    }
                };
                return gridElementConfig;
            };
            function getAlertDetailsTemplateConfig() {
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
                                            class: 'row-fluid',
                                            rows: [
                                                {
                                                    title: 'Details',
                                                    templateGenerator: 'BlockListTemplateGenerator',
                                                    templateGeneratorConfig: [
                                                        {
                                                            key: 'msg',
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

            return StorageAlertGridView;
        });
