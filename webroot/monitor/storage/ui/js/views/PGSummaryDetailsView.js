/*
 * Copyright (c) 2015 Juniper Networks, Inc. All rights reserved.
 */

define(
        [ 'underscore', 'contrail-view','contrail-list-model' ],
        function(
                _, ContrailView, ContrailListModel) {
            var PGSummaryDetailsView = ContrailView.extend({
                render: function() {
                    var self = this;
                    this.renderView4Config(self.$el,self.model,
                        getPGSummaryDetailsViewConfig());
                }
            });

        function getPGSummaryDetailsViewConfig() {
            return {
                elementId : "PG_Summary_Info_Grid_ID",
                view : "SectionView",
                viewConfig : {
                    rows : [ 
 {
                        columns: [
                            {

                                elementId: 'PG_Summary_Section_ID',
                                view: "SectionView",
                                viewConfig: {
                                    class: "col-xs-6",
                                    rows: [
                                        {
                                            columns: [
                                                {
                                                    elementId: "PG_Section_Element_ID",
                                                    view: "DetailsView",
                                                    viewConfig: {
                                                        //data: data,
                                                        ajaxConfig: {
                                                            url: swc.get(swc.URL_PG_SUMMARY),
                                                            type: 'GET'
                                                        },
                                                        templateConfig: getDetailsViewTemplateConfig(),
                                                        app: cowc.APP_CONTRAIL_STORAGE,
                                                        dataParser: function (response) {
                                                            return (response.length != 0) ? swp.pgSummaryParser(response.pg_overview) : {};
                                                        }
                                                    }
                                                }
                                            ]
                                        }
                                    ]
                                }
                            },
                            {
                                elementId: "PG_Summary_State_Section_ID",
                                view: "SectionView",
                                viewConfig: {
                                    class: "col-xs-6",
                                    rows: [
                                        {
                                            columns: [
                                                {
                                                    elementId: "PG_Section_State_Element_ID",
                                                    view: "GridView",
                                                    viewConfig: {
                                                        elementConfig: getStateGridConfig()
                                                    }
                                                }
                                            ]
                                        }
                                    ]
                                }
                            }
                        ]
                    }
                  ]
                }
            };
        };
        function getDetailsViewTemplateConfig() {
            return {
                advancedViewOptions: false,
                templateGenerator: 'ColumnSectionTemplateGenerator',
                templateGeneratorConfig: {
                    columns: [
                        {
                            rows: [
                                {
                                    title: 'Summary',
                                    keyClass: 'label-blue',
                                    templateGenerator: 'BlockListTemplateGenerator',
                                    theme: cowc.THEME_DETAIL_DEFAULT,
                                    templateGeneratorData: 'rawData',
                                    templateGeneratorConfig: getSummaryTemplateGeneratorConfig()
                                }
                            ]
                        }
                    ]
                }
            };
        };

        function getSummaryTemplateGeneratorConfig(){
            var templateGeneratorConfig = [];
            templateGeneratorConfig = templateGeneratorConfig.concat([
               {
                    key: 'num_pgs',
                    label: 'Count',
                    templateGenerator: 'TextGenerator'
                },
                {
                    key: 'num_bytes',
                    //label: 'Num-Bytes',
                    templateGenerator: 'TextGenerator'
                },
                {
                    key: 'raw_bytes_used',
                    //label: 'Raw-bytes used',
                    templateGenerator: 'TextGenerator'
                },{
                    key: 'raw_bytes_avail',
                    //label: 'Raw-Bytes avail',
                    templateGenerator: 'TextGenerator',
                },
                {
                    key: 'raw_bytes',
                    //label: 'Raw-Bytes',
                    templateGenerator: 'TextGenerator'
                },
                {
                    key: 'version',
                    label: 'Version',
                    templateGenerator: 'TextGenerator'
                }
            ]);
            return templateGeneratorConfig;
        }
    
        function getStateTemplateGeneratorConfig(){
            var templateGeneratorConfig = [];
            templateGeneratorConfig = templateGeneratorConfig.concat([
                {
                    key: 'count',
                    label: 'Count',
                    templateGenerator: 'TextGenerator'
                },
                {
                    key: 'status',
                    label: 'Status',
                    templateGenerator: 'TextGenerator'
                },
                {
                    key: 'pg_summary.num_bytes',
                    label: 'Num bytes',
                    templateGenerator: 'TextGenerator'
                },
                {
                    key: 'pg_summary.raw_bytes_used',
                    label: 'raw bytes used',
                    templateGenerator: 'TextGenerator'
                },{
                    key: 'pg_summary.raw_bytes_avail',
                    label: 'raw bytes avail',
                    templateGenerator: 'TextGenerator'
                },
                {
                    key: 'pg_summary.raw_bytes',
                    label: 'raw bytes',
                    templateGenerator: 'TextGenerator'
                }
            ]);
            return templateGeneratorConfig;
        }

        function getStateGridConfig() {
                var statusTemplate = contrail.getTemplate4Id('statusTemplate');
                var columns = [
                    {
                        field:'name',
                        name:'Name',
                        minWidth:150
                    },{
                        field:'num',
                        name:'Number',
                        minWidth:100,
                    }
                ];
                var gridElementConfig = {
                    header : {
                        title : {
                            text : 'State',
                        },
                        defaultControls: {
                            collapseable: false,
                            exportable: false,
                            refreshable: false,
                            searchable: false
                        }
                    },
                    columnHeader : {
                        columns : columns
                    },
                    body : {
                        options : {
                            detail: false,
                            checkboxSelectable: false
                        },
                        dataSource : {
                            remote: {
                                ajaxConfig: {
                                    url: swc.get(swc.URL_PG_STATE),
                                    type: 'GET'
                                },
                                dataParser: swp.pgStateParser
                            },
                        }
                    },
                    footer: {
                        pager: {options: {pageSize: 5, pageSizeSelect: [5, 10, 50, 100]}}
                    }
                };
                return gridElementConfig;
            };

            function getStates(data){
                var pg = data;
                var stateList = pg.pg_summary.num_pg_by_state;
                //var alertListModel = 
                self.model= new ContrailListModel({data:stateList});
                return stateList;
            }

        return PGSummaryDetailsView;
    });
