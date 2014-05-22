/*
 * Copyright (c) 2013 Juniper Networks, Inc. All rights reserved.
 */

storageNodesView = function(){
    this.load = function(obj){
        layoutHandler.setURLHashParams({node:'Storage Nodes'},{merge:false,triggerHashChange:false});
        populateStorageNodes();
    }
    function populateStorageNodes(){

        infraMonitorView.clearTimers();
        summaryChartsInitializationStatus['storageNode'] = false;
        var storNodesTemplate = contrail.getTemplate4Id("storagenodes-template");
        $(pageContainer).html(storNodesTemplate({}));
        var storageNodeDS = new SingleDataSource('storageNodeDS');
        var storageNodesResult = storageNodeDS.getDataSourceObj();
        var storageNodesDataSource = storageNodesResult['dataSource'];
        var storageDeferredObj = storageNodesResult['deferredObj'];
        //Initialize widget header
        $('#storageNodes-header').initWidgetHeader({title:'Storage Nodes',widgetBoxId :'recent'});
        $(storageNodeDS).on('change',function() {
            updateChartsForSummary(storageNodesDataSource.getItems(),'storage');
        });
        $('#gridStorageNodes').contrailGrid({
            header : {
                title : {
                    text : 'Storage Nodes',
                    cssClass : 'blue'
                },
                customControls: []
            },
            body: {
                options: {
                    rowHeight : 30,
                    autoHeight : true,
                    enableAsyncPostRender: true,
                    forceFitColumns: true
                },
                dataSource: {
                    dataView: storageNodesDataSource
                },
                statusMessages: {
                    loading: {
                        text: 'Loading Storage Nodes..'
                    },
                    empty: {
                        text: 'No Storage Nodes to display'
                    },
                    errorGettingData: {
                        type: 'error',
                        iconClasses: 'icon-warning',
                        text: 'Error in getting Data.'
                    }
                }
            },
            footer : {
                pager : {
                    options : {
                        pageSize : 50,
                        pageSizeSelect : [10, 50, 100, 200, 500 ]
                    }
                }
            },
            columnHeader: {
                columns:[
                    {
                        field:"name",
                        name:"Host name",
                        formatter:function(r,c,v,cd,dc) {
                            return cellTemplateLinks({cellText:'name',name:'name',statusBubble:true,rowData:dc});
                        },
                        events: {
                            onClick: function(e,dc){
                                onStorNodeRowSelChange(dc);
                            }
                        },
                        cssClass: 'cell-hyperlink-blue',
                        minWidth:200
                    },
                    {
                        field:"status",
                        name:"Status",
                        minWidth:50
                    },
                    {
                        field:"",
                        name:"Disks",
                        minWidth:50,
                        formatter:function(r,c,v,cd,dc){
                            return dc['osds'].length;
                        }
                    },
                    {
                        field:"total",
                        name:"Total Space (GB)",
                        minWidth:110
                    },
                    {
                        field:"available_perc",
                        name:"Available (%)",
                        minWidth:150
                    }
                ],
            }
        });
        var storNodesGrid = $('#gridStorageNodes').data('contrailGrid');
        storageDeferredObj.done(function() {
            storNodesGrid.removeGridLoading();
        });
        storageDeferredObj.fail(function() {
            storNodesGrid.showGridMessage('errorGettingData');
        });
        if(storageNodesResult['lastUpdated'] != null && (storageNodesResult['error'] == null || storageNodesResult['error']['errTxt'] == 'abort')){
            triggerDatasourceEvents(storageNodeDS);
        } else {
            storNodesGrid.showGridMessage('loading');
        }
    }
    function onStorNodeRowSelChange(dc) {
        var storNodesGrid = $('#gridStorageNodes').data('contrailGrid');
        storNodeView.load({name:dc['name']});
    }

}
storageNodeView = function(){
    var self = this;
    var storNodeTabStrip = "storage_tabstrip";
    var storageNodeTabs = ['details', 'disks', 'monitor'];
    this.load = function(obj){
        pushBreadcrumb([obj['name']]);
        storNodeInfo = obj;
        if((storNodeInfo == null || storNodeInfo.name ==  null ||  storNodeInfo.name == '') && storNodeInfo.name != null){
            var storageNodeDeferredObj = $.Deferred();
            self.getStorageNodeDetails(storageNodeDeferredObj,storNodeInfo);
            storageNodeDeferredObj.done(function(data) {
                try{
                    storNodeInfo['name'] = data.name;
                }catch(e){}
                self.populateStorageNode(storNodeInfo);
            });
        } else {
            self.populateStorageNode(storNodeInfo);
        }
    }

    this.destroy = function () {

    }

    this.getStorageNodeDetails = function(deferredObj,obj) {
        $.ajax({
            url:'/api/admin/monitor/infrastructure/storagenodes/details?hostname=' + obj['name']
        }).done(function(response) {
            deferredObj.resolve(response);
        });
    }

    this.populateStorageNode = function(obj){
        if(obj['tab'] == null)
            obj['tab'] = '';
        if (!isInitialized('#storage_tabstrip')) {
            var storNodeTemplate = Handlebars.compile($("#storagenode-template").html());
            $(pageContainer).html(storNodeTemplate(storNodeInfo));

            $("#storage_tabstrip").contrailTabs({
                activate:function (e, ui) {
                    infraMonitorView.clearTimers();
                    var selTab = ui.newTab.context.innerText;
                    if (selTab == 'Disks') {
                        populateDisksTab(storNodeInfo);
                        //$('#gridPeers').data('contrailGrid').refreshView();
                    } else if (selTab == 'Monitor') {
                        populateMonitorTab(storNodeInfo);
                        //$('#gridRoutes').data('contrailGrid').refreshView();
                    } else if (selTab == 'Details') {
                        populateDetailsTab(storNodeInfo);
                    }
                }
            });
        }
        if (obj['tab'] != '' && obj['tab'] != 'details') {
            selectTab(storNodeTabStrip,storageNodeTabs.indexOf(obj['tab'].split(':')[0]));
            if (obj['tab'].split(':')[0] == 'disks') {
                populateDisksTab(obj);
            }
            else if (obj['tab'].split(':')[0] == 'monitor') {
                populateMonitorTab(obj);
            }
        } else {

            var tabIdx = $.inArray(obj['tab'], storageNodeTabs);
            if (tabIdx == -1) {
                tabIdx = 0;
                populateDetailsTab(storNodeInfo);
            }
            //If any tab is stored in URL,select it else select the first tab
            selectTab(storNodeTabStrip, tabIdx);
        }
    }

    this.processOSDAlerts = function(obj){
        var alertsList = [];
        var infoObj = {name:obj['name'],type:'Storage Node',ip:obj['ip']};
        if(obj['isDiskDown'] == true)
            alertsList.push($.extend({},{sevLevel:sevLevels['WARNING'],msg:infraAlertMsgs['DISK_DOWN']},infoObj));
        if(obj['errorStrings'] != null && obj['errorStrings'].length > 0){
            $.each(obj['errorStrings'],function(idx,errorString){
                alertsList.push($.extend({},{sevLevel:sevLevels['WARNING'],msg:errorString},infoObj));
            });
        }
        return alertsList.sort(bgpMonitor.sortInfraAlerts);
    }

    function populateDisksTab(obj){
        if(obj['tab'].split(':')[1] == 'all' || obj['tab'].split(':')[1] == null){
            layoutHandler.setURLHashParams({tab: 'disks:all', node: 'Storage Nodes:' + obj['name']}, {triggerHashChange: false});
            $.ajax({
                url: '/api/admin/monitor/infrastructure/storagenodes/details?hostname=' + obj['name']
            }).done(function (response) {
                var osds = response.host_details.osds;
                var hostname = obj['name'];
                var osdArr = [];
                var osdsDV = new ContrailDataView();
                $.each(osds, function (idx, osd) {
                    if (osd.kb) {
                        osd.avail_percent = parseFloat(((osd.kb_avail / osd.kb) * 100).toFixed(2));
                        osd.gb = formatBytes(osd.kb * 1024);
                        osd.gb_avail = formatBytes(osd.kb_avail * 1024);
                        osd.gb_used = formatBytes(osd.kb_used * 1024);
                    }
                    else {
                        osd.gb = 'N/A';
                        osd.gb_used = 'N/A';
                        osd.gb_avail = 'N/A';
                        osd.avail_percent = 'N/A';
                    }
                    osd.hostname = hostname;
                    osdArr.push(osd);
                });
                osdsDV.setData(osdArr);

                $("#gridDisksDash").contrailGrid({

                    header: {
                        title: {
                            text: 'Disks',
                            cssClass: 'blue',
                            icon: 'icon-list',
                            iconCssClass: 'blue'
                        }
                    },
                    columnHeader: {
                        columns: [
                            {
                                field: "id",
                                name: "ID",
                                width: 50
                            },
                            {
                                field: "status",
                                name: "Status",
                                formatter: function (r, c, d, cd, dc) {
                                    if (dc.status == "up")
                                        return '<span class="grid-osd label label-info">up</span>';
                                    else if (dc.status == "down")
                                        return '<span class="grid-osd label label-important">down</span>';
                                },
                                cssClass: 'grid-status-label',
                                width: 50
                            },
                            {
                                field: "cluster_status",
                                name: "Cluster Status",
                                formatter: function (r, c, d, cd, dc) {
                                    if (dc.cluster_status == "in")
                                        return '<span class="grid-osd label label-success">in</span>';
                                    else if (dc.cluster_status == "out")
                                        return '<span class="grid-osd label label-warning">out</span>';
                                },
                                cssClass: 'grid-status-label',
                                width: 100
                            },
                            {
                                field: "name",
                                name: "OSD name",
                                width: 80
                            },
                            {
                                field: "gb",
                                name: "Total GB",
                                width: 100
                            },
                            {
                                field: "gb_used",
                                name: "Used GB",
                                width: 100
                            },
                            {
                                field: "avail_percent",
                                name: "Available %",
                                width: 100
                            }
                        ]
                    },
                    body: {
                        options: {
                            autoHeight: true,
                            checkboxSelectable: false,
                            enableAsyncPostRender: true,
                            forceFitColumns: true,
                            detail: {
                                template: '<p>Details :</p>',
                                onInit: function (e, dc) {
                                    console.log(dc);
                                    setTimeout(function () {
                                        $.each(dc, function (idx, val) {
                                            console.log(idx, val)
                                            $(e.detail).addClass('basicDetails');
                                            $(e.detailRow).append('<p><span style="color: steelblue"> ' + idx + '</span> : ' + val + '</p>');
                                        });
                                        $("#gridDisksDash").data('contrailGrid').adjustDetailRowHeight(dc.id);
                                    }, 1000);
                                },
                                onExpand: function (e, dc) {
                                    console.log('Detail Expand: ');
                                    console.log(dc);
                                },
                                onCollapse: function (e, dc) {
                                    console.log('Detail Collapse: ');
                                    console.log(dc);
                                }
                            }
                        },
                        dataSource: {
                            dataView: osdsDV
                        },
                        statusMessages: {
                            loading: {
                                text: 'Loading Disks..'
                            },
                            empty: {
                                text: 'No Disks to display'
                            },
                            errorGettingData: {
                                type: 'error',
                                iconClasses: 'icon-warning',
                                text: 'Error in getting Data.'
                            }
                        }
                    },
                    footer: {
                        pager: {
                            options: {
                                pageSize: 5,
                                pageSizeSelect: [ 5, 10, 50 ]
                            }
                        }
                    }
                });

            }).fail(function (result) {

            });
            var dvGrid = $("#gridDisksDash").data('contrailGrid');
            console.log($("#gridDisksDash").data('contrailGrid'));

        }
        else{
            $('#gridDisksDash').hide();
            $('#disk-dashboard').show();
            layoutHandler.setURLHashParams({tab: obj['tab'], node: 'Storage Nodes:' + obj['name']}, {triggerHashChange: false});
            var osdName = obj['tab'].split(':')[1];
            var diskDashTemplate = contrail.getTemplate4Id('dashboard-template');
            $('#disk-dashboard').html(diskDashTemplate({title:'Disk',colCount:2, showSettings:true, widgetBoxId:'diskDash'}));
            startWidgetLoading('diskDash');
            $.ajax({
                url: '/api/tenant/storage/cluster/osd/details?name=' + osdName
            }).done(function (response) {
                console.log(response);

                var diskData = response.osd_details;
                var noDataStr = "N/A",
                    diskDashboardInfo;

                diskDashboardInfo = [
                    {lbl:'Name', value:diskData['name']},
                    {lbl:'Hostname', value:diskData['host']},
                    {lbl:'IP Address',value:(function(){
                        try{
                            var ip = ifNullOrEmpty(diskData['public_addr'],noDataStr);
                            return ip.split(':')[0] +', Port: '+ ip.split(':')[1];
                        } catch(e){return noDataStr;}
                    })()},
                    {lbl:'Status', value:diskData['status'] != '-' ? diskData['status'] : noDataStr},
                    {lbl:'Cluster Status', value:diskData['cluster_status'] != '-' ? diskData['cluster_status'] : noDataStr},
                    {lbl:'Total Space', value:formatBytes(diskData['kb']*1024)},
                    {lbl:'Used', value:formatBytes(diskData['kb_used']*1024)},
                    {lbl:'Available', value: formatBytes(diskData['kb_avail']*1024) + ' ( ' + parseFloat(((diskData['kb_avail'] / diskData['kb']) * 100).toFixed(2)) +"% )"},
                    {lbl:'UUID', value: diskData['uuid']},
                    {lbl:'Apply Latency', value:(function(){
                        try{
                            var perf = ifNullOrEmpty(diskData['fs_perf_stat']['apply_latency_ms'],noDataStr);
                            if(perf){
                                return perf + ' ms' ;
                            }
                            return noDataStr;
                        } catch(e){return noDataStr;}
                    })},
                    {lbl:'Commit Latency', value:(function(){
                        try{
                            var perf = ifNullOrEmpty(diskData['fs_perf_stat']['commit_latency_ms'],noDataStr);
                            if(perf){
                                return perf + ' ms';
                            }
                            return noDataStr;
                        } catch(e){return noDataStr;}
                    })}
                ];
                var dashboardBodyTemplate = Handlebars.compile($("#dashboard-body-template").html());
                $('#dashboard-box .widget-body').html(dashboardBodyTemplate({colCount:2, d:diskDashboardInfo, nodeData:diskData, showSettings:true}));
                endWidgetLoading('diskDash');

            });


        }

    }

    function populateMonitorTab(obj){
        layoutHandler.setURLHashParams({tab:'Monitor', node:'Storage Nodes:' + obj['name']},{triggerHashChange:false});
    }

    function populateDetailsTab(obj){
        layoutHandler.setURLHashParams({tab:'details', node:'Storage Nodes:' + obj['name']},{triggerHashChange:false});
        var dashboardTemplate = contrail.getTemplate4Id('dashboard-template');
        $('#storagenode-dashboard').html(dashboardTemplate({title:'Storage Node',colCount:2, showSettings:true, widgetBoxId:'dashboard'}));
        $('#storage-sparklines-box .widget-header').initWidgetHeader({title:'Components',widgetBoxId :'storageSparklines'});
        $('#disks-chart-box .widget-header').initWidgetHeader({title:'Disks',widgetBoxId :'disksChart'});
        startWidgetLoading('dashboard');
        $.ajax({
            url:'/api/admin/monitor/infrastructure/storagenodes/details?hostname=' + obj['name']
        }).done(function (response) {
            var storNodeData = response.host_details;
            var noDataStr = "--";
            var noMonitor = "N/A",
                storNodeDashboardInfo;

                storNodeDashboardInfo = [
                    {lbl:'Hostname', value:obj['name']},
                    {lbl:'IP Address',value:(function(){
                        try{
                            var ip = ifNullOrEmpty(storNodeData['ip'],noDataStr);
                            return ip;
                        } catch(e){return noDataStr;}
                    })()},
                    {lbl:'Status', value:storNodeData['status'] != '-' ? storNodeData['status'] : noDataStr},
                    {lbl:'Total Space', value:formatBytes(storNodeData['kb_total']*1024)},
                    {lbl:'Used', value:formatBytes(storNodeData['kb_used']*1024)},
                    {lbl:'Available', value: storNodeData['avail_percent']+"%"},
                    {lbl:'Disks', value: storNodeData['osds'].length},
                    {lbl:'Monitor', value:(function(){
                        try{
                            var mntr = ifNullOrEmpty(storNodeData['monitor'],noDataStr);
                            if(mntr['health']){
                                return '<i class="icon-check-sign"></i>' ;
                            }
                            return noMonitor
                        } catch(e){return noMonitor;}
                    })}
                ];
            var dashboardBodyTemplate = Handlebars.compile($("#dashboard-body-template").html());
            $('#dashboard-box .widget-body').html(dashboardBodyTemplate({colCount:2, d:storNodeDashboardInfo, nodeData:storNodeData, showSettings:true}));
            endWidgetLoading('dashboard');

            var osds = storNodeData['osds'];

            var retArr = [], xvals = [],yvals = [],
                clusterSeries = [], statusSeries=[],
                upCnt=0,downCnt=0,inCnt=0,outCnt=0;

            $.each(osds, function(idx,osd){
                osd['x'] = parseFloat(((osd.kb_avail/osd.kb)*100).toFixed(2));
                osd['y'] = parseFloat((osd.kb/1048576).toFixed(2));
                osd['available_perc'] = $.isNumeric(osd['x']) ? osd['x'] : '-';
                osd['total'] = formatBytes(osd.kb*1024);
                osd['size'] = 1;
                osd['shape'] = 'circle';
                osd['type'] = 'disk';
                osd['display_type'] = 'Disk';
                osd['name'] = osd.name;
                osd['hostname'] = obj['name'];
                osd['isPartialUveMissing'] = false;
                osd['color'] = getOSDColor(osd);
                osd['downNodeCnt'] = 0;
                osd['nodeAlerts'] = self.processOSDAlerts(osd);
                osd['alerts'] = osd['nodeAlerts'].sort(bgpMonitor.sortInfraAlerts);
                if(!isNaN(osd['x']))
                    xvals.push(osd['x']);
                if(!isNaN(osd['y']))
                    yvals.push(osd['y']);
                retArr.push(osd);

                if(osd.status == 'up')
                    ++upCnt;
                else if(osd.status == 'down')
                    ++downCnt;
                if(osd.cluster_status == 'in')
                    ++inCnt;
                else if(osd.cluster_status == 'out')
                    ++outCnt;
            });
            /*
             in some cases when osd is down kb info is not coming in API.
             to avoid chart display getting distorted, we are setting x,y axis to
             the min values of series and tooltip info is returned to --
             */
            var xscale = d3.extent(xvals);
            xscale[0] = xscale[0] - 0.2;
            xscale[1] = (xscale[1] >= 95.5)? 100.00:xscale[1]+0.5;
            var yscale = d3.extent(yvals);
            yscale[0] = yscale[0] - 150;
            yscale[1] = yscale[1] + 150;

            $.each(retArr, function(idx,osd){
                if(isNaN(osd.x))
                    osd.x = xscale[0];
                if(isNaN(osd.y))
                    osd.y= yscale[0];
            });
            retArr.sort(bgpMonitor.sortNodesByColor);
            var deferredObj = $.Deferred();
            initDeferred({renderFn:'initScatterChart',selector:$('#disks-bubble'),parseFn:function(response) {
                return {title:'Disks',xLbl:'Available (%)',yLbl:'Total Storage (GB)',
                    forceX: xscale, forceY: yscale,
                    chartOptions:{xPositive:true,addDomainBuffer:true},
                    d:[{key:'Disks',values:retArr}]};
            }});
            endWidgetLoading('storageSparklines');

            var keys = [
                [{'key': 'IN'},
                {'values': [
                    {'label':'Cluster Status'},
                    {'value': inCnt}
                    ]}
                ],
                [{'key': 'OUT'},
                    {'values': [
                        {'label':'Cluster Status'},
                        {'value': outCnt}
                    ]}
                ]
            ];
            clusterSeries.push(keys);
            keys = [
                [{'key': 'UP'},
                    {'values': [
                        {'label':'Status'},
                        {'value': upCnt}
                    ]}
                ],
                [{'key': 'DOWN'},
                    {'values': [
                        {'label':'Status'},
                        {'value': downCnt}
                    ]}
                ]
            ];
            statusSeries.push(keys);

            $('#storDisksTotal').text(retArr.length);
            $('#storDiskUpDown').html(function() {
                    var content = '';
                    content = content + upCnt + ' / ';
                    if (outCnt > 0)
                        content = content + '</span><span style="color: ' + d3Colors['red'] + ';">' + downCnt ;
                    else
                        content = content + downCnt;
                    return content;
                }
            );
            $('#storDiskInOut').html(function() {
                    var content = '';
                    content = content + inCnt + ' / ';
                    if (outCnt > 0)
                        content = content + '</span><span style="color: ' + d3Colors['orange'] + ';">' + outCnt ;
                    else
                        content = content + outCnt;
                    return content;
                }
            );
            $('#storMonitorHealth').html(function() {
                var monHealth = storNodeData.monitor.health;
                if (monHealth == 'HEALTH_OK')
                    return '<span class="label label-status" style= "background: ' + d3Colors['green'] + ';">OK</span>';
                else if (monHealth == 'HEALTH_WARN')
                    return '<span class="label label-status" style= "background: ' + d3Colors['orange'] + ';">WARN</span>';
                else if (monHealth == 'HEALTH_CRIT')
                    return '<span class="label label-status" style= "background: ' + d3Colors['red'] + ';">CRITICAL</span>';
                else
                    return 'N/A';
            });
            endWidgetLoading('disksChart');
        });

    }
    function getOSDColor(d,obj){
        if(d['status'] == 'up' ){
            if(d['cluster_status'] == 'in')
                return d3Colors['green'];
            else if(d['cluster_status'] == 'out')
                return d3Colors['orange']
            else
                return d3Colors['blue']
        }
        else if (d['status'] == 'down')
            return d3Colors['red']
        else{}
    }


}
function drawDisksBarChart(selector, data, chart, chartOptions){

    nv.addGraph(function(){
        var chart = nv.models.multiBarHorizontalChart()
                .x(function(d) { return d.label })
                .y(function(d) { return d.value })
                .margin({top: 30, right: 20, bottom: 10, left: 5})
                .height(65)
                .showValues(false)
                .tooltips(true)
                .stacked(false)
                .showControls(false);


        chart.yAxis.tickFormat(d3.format('.0f'));

        $(selector).append('<svg></svg>');
        console.log($(selector), data.length);

        /*
        chart.dispatch.on('stateChange', chartOptions['stateChangeFunction']);
        chart.scatter.dispatch.on('elementClick', chartOptions['elementClickFunction']);
        chart.scatter.dispatch.on('elementMouseout',chartOptions['elementMouseoutFn']);
        chart.scatter.dispatch.on('elementMouseover',chartOptions['elementMouseoverFn']);
        */
        if(!($(selector).is(':visible'))) {
            $(selector).find('svg').bind("refresh", function() {
                d3.select($(selector)[0]).select('svg').datum(data).call(chart);
            });
        } else {
            console.log("holaaa");
            d3.select($(selector)[0]).select('svg').datum(data).call(chart);
        }

        nv.utils.windowResize(function(){
            updateChartOnResize(selector,chart);

        return chart;
        });

    });
}


storNodesView = new storageNodesView();
storNodeView = new storageNodeView();
