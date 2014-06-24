/*
 * Copyright (c) 2013 Juniper Networks, Inc. All rights reserved.
 */
cephMonitorView = function () {
    var self = this;
    var currMonitor = null;

    var monitorsDV = new ContrailDataView();

    this.setMonitorsDV= function(data){
        monitorsDV.setData(data);
    }
    this.getMonitorsDV = function(){
        return monitorsDV;
    }
    this.setCurrMonitorName = function(monitor){
        currMonitor = monitor;
        displayMonitorDetails(currMonitor);
    }
    this.getCurrMonitorDetailsName = function(){
        return currMonitor;
    }
    this.load = function (obj){
        //layoutHandler.setURLHashParams({node:'Monitor'},{merge:false,triggerHashChange:false});
        populateMonitorView();
    }
    this.destroy = function () {
        var cGrid = $('.k-grid').data('kendoGrid');
        if(cGrid != null)
            cGrid.destroy();
    }
    this.parseMonitorsSummary = function(result){
        var retArr = [];
        if(result != null){
            var allmons = result['monitors']
            $.each(allmons, function(idx,d){
                //initializing with HEALTH_DOWN
                // d['health'] = 'HEALTH_DOWN';
                d['hostNameColor'] = '#D62728';
              
                d['gb_total'] = kiloByteToGB(d['kb_total']);
                d['gb_used'] = kiloByteToGB(d['kb_used']);
                d['gb_avail'] = kiloByteToGB(d['kb_avail']);

                if (String(d['health']).valueOf() == "HEALTH_OK")
                    d['hostNameColor'] = 'label-success';
                else if (String(d['health']).valueOf() == "HEALTH_WARN")
                    d['hostNameColor'] = 'label-warning';
                else
                    d['hostNameColor'] = 'label-info';

                if(d['act_health'] == 'HEALTH_WARN')
                    d['healthColor'] = 'label-warning';
                else if (d['act_health'] == 'HEALTH_OK')
                    d['healthColor'] = 'label-success';
                else{
                    d['healthColor'] = 'label-important';
                }
                retArr.push(d);
            });
        }
        return retArr;
    }

    function populateMonitorView(){

        var monitorTemplate = Handlebars.compile($("#storage-monitor-template").html());
        $(pageContainer).html(monitorTemplate({}));

        $("#gridMonitors").contrailGrid({

            header : {
                title : {
                    text : 'Monitor Nodes',
                    cssClass : 'blue',
                    icon : 'icon-list',
                    iconCssClass : 'blue'
                }
            },
            columnHeader : {
                columns:[
                    {
                        field:"name",
                        name:"Host name",
                        cssClass: 'cell-hyperlink-blue',
                        events:{
                            onClick: function(e, dc){
                                tenantStorageMonitorView.setCurrMonitorName(dc.name);
                            }
                        },
                        width:200
                    },
                    {
                        field:"act-health",
                        name:"Monitor Status",
                        cssClass: 'grid-status-label',
                        formatter:function(r,c,d,cd,dc){
                            var health = '';
                            if(dc['act_health'] == 'HEALTH_OK')
                                health = 'Ok';
                            else if(dc['act_health'] == 'HEALTH_WARN')
                                health = 'Warn';
                            else if(dc['act_health'] == 'HEALTH_DOWN')
                                health = 'Down';
                            else{}
                            return '<span style= "text-align: center" class="grid-monitor label ' + dc['healthColor'] + '">' + health + '</span>';
                        },
                        width:150
                    },
                    {
                        field:"health",
                        name:"Status",
                        cssClass: 'grid-status-label',
                        formatter:function(r,c,d,cd,dc){
                            var health = '';
                            if(dc['health'] == 'HEALTH_OK')
                                health = 'Ok';
                            else if(dc['health'] == 'HEALTH_WARN')
                                health = 'Warn';
                            else if(dc['health'] == 'HEALTH_DOWN')
                                health = 'Down';
                            else{}
                            return '<span class="grid-monitor label ' + dc['hostNameColor'] + '">' + health + '</span>';
                        },
                        width:100
                    },
                    {
                        field:"gb_total",
                        name:"Total GB",
                        width:110
                    },
                    {
                        field:"gb_used",
                        name:"Used GB",
                        width:110
                    },
                    {
                        field:"avail_percent",
                        name:"Available %",
                        width:110
                    }
                ]
            },
            body : {
                options : {
                    autoHeight : true,
                    checkboxSelectable: false,
                    lazyLoading: true,
                    forceFitColumns: true,
                    detail: {
                        template: '<p>Details :</p>',
                        onInit: function(e,dc) {
                            console.log(dc);
                            setTimeout(function(){
                                $.each(dc, function(idx,val){console.log(idx,val)
                                    $(e.detailRow).append('<p><span style="color: steelblue"> ' + idx +'</span> : ' + val +'</p>');
                                });
                                $("#gridMonitors").data('contrailGrid').adjustDetailRowHeight(dc.id);
                            },1000);
                        },
                        onExpand: function(e,dc) {
                            console.log('Detail Expand: ');
                            console.log(dc);
                        },
                        onCollapse: function(e,dc) {
                            console.log('Detail Collapse: ');
                            console.log(dc);
                        }
                    }
                },
                dataSource : {
                    dataView : monitorsDV,
                    events: {
                        onUpdateDataCB: function() {
                            var dvGrid = $('#gridMonitors').data('contrailGrid');
                            dvGrid.removeGridLoading();
                        }
                    }
                }
            },
            footer : {
                pager : {
                    options : {
                        pageSize : 5,
                        pageSizeSelect : [ 5, 10, 50 ]
                    }
                }
            }

        });

        monitorGridDataRefresh();
    }
}
tenantStorageMonitorView = new cephMonitorView();

function displayMonitorDetails(monitorName){
    var monitorData = tenantStorageMonitorView.getMonitorDSData().getItems();
    var retArr = [];

    var fields = ['Rank', 'Name', 'IP Address', 'Used GB', 'Available GB',
        'Total GB', 'Available Percent', 'Skew', 'Latency', 'Activity Health',
        'Details', 'Overall Health', 'Last Updated'];

    $.each(fields, function(idx,val){
        var obj = {};
        obj['field'] = val;
        obj['value'] = '';
        retArr.push(obj);
    });
    if (monitorData != null){
        if(monitorName !=null){
            $.each(monitorData, function(idx,item){
                if (item['name'] == monitorName){
                    retArr[0]['value'] = item['rank'];
                    retArr[1]['value'] = item['name'];
                    retArr[2]['value'] = item['addr'];
                    retArr[3]['value'] = item['gb_used'];
                    retArr[4]['value'] = item['gb_avail'];
                    retArr[5]['value'] = item['gb_total'];
                    retArr[6]['value'] = item['avail_percent'];
                    retArr[7]['value'] = item['skew'];
                    retArr[8]['value'] = item['latency'];
                    retArr[9]['value'] = item['act-health'];
                    retArr[10]['value'] = item['details'];
                    retArr[11]['value'] = item['health'];
                    retArr[12]['value'] = item['last_updated'];
                }
            });
        }
        else{
            retArr[0]['value'] = monitorData[0]['rank'];
            retArr[1]['value'] = monitorData[0]['name'];
            retArr[2]['value'] = monitorData[0]['addr'];
            retArr[3]['value'] = monitorData[0]['gb_used'];
            retArr[4]['value'] = monitorData[0]['gb_avail'];
            retArr[5]['value'] = monitorData[0]['gb_total'];
            retArr[6]['value'] = monitorData[0]['avail_percent'];
            retArr[7]['value'] = monitorData[0]['skew'];
            retArr[8]['value'] = monitorData[0]['latency'];
            retArr[9]['value'] = monitorData[0]['act-health'];
            retArr[10]['value'] = monitorData[0]['details'];
            retArr[11]['value'] = monitorData[0]['health'];
            retArr[12]['value'] = monitorData[0]['last_updated'];
        }
        tenantStorageMonitorView.setMonitorDetailsData(retArr);
        //console.log(retArr);
    }
}

function onMonitorSummaryRowSelChange(e,dc){
    console.log('test....')
    tenantStorageMonitorView.setCurrMonitorName(dc.name);
}

function getMonitorsSummary(){

    $.ajax({
        url: '/api/tenant/storage/cluster/monitors/summary',
        dataType: "json",
        cache: false

    }).done(function(response){
        var dataResponse = tenantStorageMonitorView.parseMonitorsSummary(response);
        tenantStorageMonitorView.setMonitorsDV(dataResponse);

    }).fail(function(errObj) {
        var cGrid = $(contentContainer).find('#gridMonitors').data('contrailGrid');
        if(cGrid != null)
            if(errObj['errTxt'] != null)
                showGridMessage(cGrid, errObj['errTxt']);
            else
                showGridMessage(cGrid, 'Error in fetching Monitor Node details');
    });
}

function monitorGridDataRefresh(){
    getMonitorsSummary();
}
