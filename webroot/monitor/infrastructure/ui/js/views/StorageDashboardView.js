/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore', 
    'contrail-view', 
    'storage-dashboard-model',
    'storage-node-scatter-chart-view',
    ],
    function(_, ContrailView, StorageDashboardListModel, StorageNodeScatterChartView) {
        var StorageDashboardView = ContrailView.extend(
           (function() {
                var self = this;
                //Returning inside IIFE to make private static variable
                var totalCntModel = new Backbone.Model({
                    //diskCnt:'',
                    monOnlyCnt:'',
                    downCnt:''
                });
                return {
                        render: function() {
                            var self = this;
                            var sDashBoardListModel = new StorageDashboardListModel();

                            this.renderView4Config(self.$el,
                                sDashBoardListModel,
                                getStorageDashboardListViewConfig({totalCntModel:totalCntModel}),null,null,null,
                                function() {
                                    updateMonCnt(totalCntModel);
                                });
                        }
                    }
            })()
        );
        function updateMonCnt(totalCntModel) {
            var self = this;
            $.ajax({
                    url: swc.get(swc.URL_STORAGENODES_SUMMARY) ,
                    type:'get',
                }).done(function(response) {

                    if(response != null) {
                        var nodeData = [],
                            totMonCnt = 0,
                            monCnt = 0,
                            totActiveMonCnt = 0,
                            monOnlyCnt = 0;
                        $.map(response, function(val, idx) {
                            if (val['name'] == 'CLUSTER_HEALTH') {
                               // nodeData.push(val);
                            } else {
                                totMonCnt = val['monitor_count'];
                                totActiveMonCnt = val['monitor_active'];
                            }
                        });
                        
                        nodeData = swp.storagenodeDataParser(response);
                        $.each(nodeData, function(idx, obj) {
                            if (obj.hasOwnProperty('monitor')) {
                                if (!cowu.isEmptyObject(obj['monitor']) && obj['monitor'] != "Not Available") {
                                    monCnt += 1;
                                } 
                            }
                        });

                        monOnlyCnt = totActiveMonCnt - monCnt;
                        if(monOnlyCnt > 0){
                            monCnt1 = totMonCnt+' + '+ monOnlyCnt ;
                        }else{
                            monCnt1 = totMonCnt;
                        }
                        downCnt = totMonCnt - totActiveMonCnt,

                        totalCntModel.set({monOnlyCnt:monOnlyCnt, downCnt:downCnt});
                    }
                });
        }
    
        function getStorageDashboardListViewConfig(cfgObj) {
            return {
                elementId: cowu.formatElementId([
                    'storage-dashboard-section'
                    //ctwl.VROUTER_DASHBOARD_SECTION_ID
                ]),
                view: "SectionView",
                viewConfig: {
                    rows: [{
                        columns: [
                        {
                            elementId: 'storage-dashboard-sparkline',//ctwl.VROUTER_DASHBOARD_SPARKLINE_ID,
                            title: 'Storage Nodes',//ctwl.VROUTER_SUMMARY_TITLE,
                            view: "StorageBarChartInfoView",
                            viewConfig: {
                                // class:' width:155px
                                display:'block',
                                float:'left',
                                width: '155px',
                                config:[{
                                    field:'diskCnt',
                                    title:'Disks',
                                    id:'infobox-mons',
                                    yLbl: 'Hosts',
                                },{
                                    field:'monCnt',
                                    monOnly: 'monOnlyCnt',
                                    downCnt: 'downCnt',
                                    title:'Monitor',
                                    id: 'infobox-mons',
                                    yLbl: 'Hosts',
                                }],
                                totalCntModel: cfgObj['totalCntModel']
                            },
                            viewPathPrefix: "monitor/infrastructure/" +
                                "ui/js/views/",
                            app: cowc.APP_CONTRAIL_STORAGE,
                        },
                        {
                            elementId: 'storage-dashboard-chart',//ctwl.VROUTER_DASHBOARD_CHART_ID,
                            title: 'Storage Nodes',//ctwl.VROUTER_SUMMARY_TITLE,
                            view: "StorageNodeScatterChartView",
                            viewConfig : {
                                // class: 'span9'
                                'margin-left': '160px'
                            },
                             viewPathPrefix: "monitor/infrastructure/" +
                                "ui/js/views/",
                            app: cowc.APP_CONTRAIL_STORAGE,
                        }]
                    }]
                }
            };
        };
        return StorageDashboardView;
    });
