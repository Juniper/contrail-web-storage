/*
 * Copyright (c) 2013 Juniper Networks, Inc. All rights reserved.
 */

var color_info = '#1F77B4',
    color_success = '#2CA02C',
    color_warn = '#FF7F0E',
    color_imp = '#D62728';

function storInfraDashboardClass () {
    var self = this,
        currPage,
        dfUsageObj = {},
        healthStatusObj = {},
        actStatusObj = {},
        monStatusObj = {},
        poolsBarGbData,poolsBarObjData,
        disksStatusData, disksClusterStatusData,
        clusterThrptData, clusterIopsData, clusterLatencyData,
        disksBubbleData;

    //Global refresh timeout in ms
    var refreshTimeout = 30000;

    //for junkData
    var t1, t2, t3, t4, v, dataRead, dataWrite, dataObj, dataLat;
    //end of junkData

    clusterActivityThrptChart = new activityLineChart();
    this.clusterActivityThrptChart = clusterActivityThrptChart;
    clusterActivityIopsChart = new activityLineChart();
    this.clusterActivityIopsChart = clusterActivityIopsChart;
    clusterActivityObjChart = new activityLineChart();
    this.clusterActivityObjChart = clusterActivityObjChart;
    clusterActivityLatencyChart = new activityLineChart();
    this.clusterActivityLatencyChart = clusterActivityLatencyChart;

    clusterUsageDial = new usageDial();
    this.clusterUsageDial = clusterUsageDial;

    clusterPoolsGbChart = new poolsBarChart();
    this.clusterPoolsGbChart = clusterPoolsGbChart;

    clusterPoolsObjChart = new poolsBarChart();
    this.clusterPoolsObjChart = clusterPoolsObjChart;

    diskStatusChart = new disksBarChart();
    this.diskStatusChart = diskStatusChart;

    diskClusterStatusChart = new disksBarChart();
    this.diskClusterStatusChart = diskClusterStatusChart;

    disksBubbleChart = new diskScatterPlot();
    this.disksBubbleChart = disksBubbleChart;

    this.destroy = function () {
        var kGrid = $('.k-grid').data('kendoGrid');
        if(kGrid != null)
            kGrid.destroy();
        if(this.timerId){
            clearInterval(this.timerId);
        }
    }
    this.setCurrPage = function(page){
        currPage = page;
    }
    this.getCurrPage = function(){
        return currPage;
    }
    this.getClusterHealthData = function(){
        return healthStatusObj;
    }
    this.setClusterHealthData = function(data){
        healthStatusObj = data;
        healthStatusRefresh();
    }
    this.getClusterMonitorData = function(){
        return healthStatusObj;
    }
    this.setClusterMonitorData = function(data){
        healthStatusObj = data;
        monitorStatusRefresh();
    }
    this.getClusterActivityData = function(){
        return actStatusObj;
    }

    this.setClusterActivityData = function(data){

        //this is a junk data generation for cluster activity chart
        if(firstTime) {
            t1 = 1;
            t2 = 1;
            t3 = 1;
            t4 = 1;
            v = 70; // start value (subscribers)
            dataRead = d3.range(50).map(nextRead);
            dataWrite = d3.range(50).map(nextWrite);
            dataObj = d3.range(50).map(nextObj);
            dataLat = d3.range(50).map(nextLat);

            firstTime = false;
        }
        else{
            dataRead.shift();
            dataRead.push(nextRead());
            dataWrite.shift();
            dataWrite.push(nextWrite());
            dataLat.shift();
            dataLat.push(nextLat());
            dataObj.shift();
            dataObj.push(nextObj());
        }
        function nextRead() {
            return {
                x: ++t1,
                y: v = ~~Math.max(10, Math.min(90, v + 10 * (Math.random() - .5)))
            };
        }
        function nextWrite() {
            return {
                x: ++t2,
                y: v = ~~Math.max(10, Math.min(90, v + 10 * (Math.random() - .5)))
            };
        }
        function nextObj() {
            return {
                x: ++t3,
                y: v = ~~Math.max(4000, Math.min(4090, 4050 + 10 * (Math.random() - .5)))
            };
        }
        function nextLat() {
            return {
                x: ++t4,
                y: v = ~~Math.max(10, Math.min(90, 40 + 10 * (Math.random() - .5)))
            };
        }

        junkThrptData = [
            {
                values: dataRead,
                key: 'Read',
                color: 'steelblue',
                area: true
            },
            {
                values: dataWrite,
                key: 'Write',
                color: '#2ca02c',
                area: true
            }
        ];
        this.setClusterThrptData(junkThrptData);

        junkIopsData = [
            {
                values: dataRead,
                key: 'Read',
                color: '#1f77b4',
                area: true
            },
            {
                values: dataWrite,
                key: 'Write',
                color: '#2ca02c',
                area: true
            }
        ];
        this.setClusterIopsData(junkIopsData);

        junkLatData = [
            {
                values: dataLat,
                key: 'Latency',
                color: '#6baed6'
            }
        ];
        this.clusterActivityLatencyChart.refresh(junkLatData);

    }
    this.setClusterThrptData = function(data){
        clusterThrptData = data;
        this.clusterActivityThrptChart.refresh(data);
    }
    this.getClusterThrptData = function(){
        return clusterThrptData;
    }
    this.setClusterIopsData = function(data){
        clusterIopsData = data;
        this.clusterActivityIopsChart.refresh(data);
    }
    this.getClusterIopsData = function(){
        return clusterIopsData;
    }
    this.setClusterLatencyData = function(data){
        clusterLatencyData = data;
        this.clusterActivityLatencyChart.refresh(data);
    }
    this.getClusterLatencyData = function(){
        return clusterLatencyData;
    }

    this.getClusterMonitorData = function(){
        return monStatusObj;
    }
    this.setClusterMonitorData = function(data){
        monStatusObj = data;
        monitorStatusRefresh();
    }
    this.getDFUsageData = function(){
        return dfUsageObj;
    }
    this.setDFUsageData = function(data){
        dfUsageObj = data;
        this.clusterUsageDial.refresh();
    }
    this.setPoolsBarGbData = function(data){
        poolsBarGbData = data;
        this.clusterPoolsGbChart.refresh(data);
    }
    this.getPoolsBarGbData = function(){
        return poolsBarGbData;
    }
    this.setPoolsBarObjData = function(data){
        poolsBarObjData = data;
        this.clusterPoolsObjChart.refresh(data);
    }
    this.getPoolsBarObjData = function(){
        return poolsBarObjData;
    }
    this.setDisksStatusData = function(data){
        disksStatusData = data;
        this.diskStatusChart.refresh(data);
    }
    this.getDisksStatusData = function(){
        return disksStatusData;
    }
    this.setDisksClusterStatusData = function(data){
        disksClusterStatusData = data;
        this.diskClusterStatusChart.refresh(data);
    }
    this.getDisksClusterStatusData = function(){
        return disksClusterStatusData;
    }

    this.setDisksBubbleData = function(data){
        disksBubbleData = data;
        this.disksBubbleChart.refresh(data);
    }
    this.getDisksBubbleData = function(){
        return disksBubbleData;
    }
    this.setDisksData = function(data){
        //disksDS.data(data);
    }

    this.getDisksData = function(){
        return disksDS.data();
    }
    this.setSingleDiskData = function(data){
        singleDiskDS.data(data);
    }

    this.updateClusterDashboard = function(){
        $('#dashHealthBox .widget-header').initWidgetHeader({title:'Health',widgetBoxId :'dashHealth'});
        $('#dashUsageBox .widget-header').initWidgetHeader({title:'Usage',widgetBoxId :'dashUsage'});
        $('#dashPoolsBox .widget-header').initWidgetHeader({title:'Pools',widgetBoxId :'dashPools'});
        $('#dashDisksBox .widget-header').initWidgetHeader({title:'Disks',widgetBoxId :'dashDisks'});
        $('#dashActivityBox .widget-header').initWidgetHeader({title:'Activity',widgetBoxId :'dashActivity'});

        this.clusterUsageDial.init();
        this.clusterUsageDial.draw();

        //Cluster Pools Charts
        $('#poolsBarTabStrip').contrailTabs({
            activate: onPoolsBarTabActivate
        });

        this.clusterPoolsGbChart.init('#poolsBarGbChart');
        this.clusterPoolsGbChart.draw();

        this.clusterPoolsObjChart.init('#poolsBarObjChart');
        this.clusterPoolsObjChart.draw();
        //end of Cluster Pools charts

        //Disks Bar Charts
        $('#disksStatusBarTabStrip').contrailTabs({});
        this.diskStatusChart.init('#diskStatusChart');
        this.diskStatusChart.draw();

        $('#disksClusterBarTabStrip').contrailTabs({});
        this.diskClusterStatusChart.init('#diskClusterChart');
        this.diskClusterStatusChart.draw();
        //End of Disks Bar charts

        //cluster activity charts
        $('#clusterActivityThrptTabStrip').contrailTabs({
            activate: onClusterActivityChartTabActivate
        })
        this.clusterActivityThrptChart.init('#clusterActivityThrptChart');
        this.clusterActivityThrptChart.draw();

        $('#clusterActivityIopsTabStrip').contrailTabs({})
        this.clusterActivityIopsChart.init('#clusterActivityIopsChart');
        this.clusterActivityIopsChart.draw();

        $('#clusterActivityLatencyTabStrip').contrailTabs({});
        this.clusterActivityLatencyChart.init('#clusterActivityLatencyChart');
        this.clusterActivityLatencyChart.draw();
        //End of Cluster Activity Charts

        statusDataRefresh();

        /*$('#clusterActivityObjTabStrip').contrailTabs({})
         this.clusterActivityObjChart.init('#clusterActivityObjChart');
         this.clusterActivityObjChart.draw();
         */


        /*
         all the widget header loading needs to stop after data is updated
         logic needs to be added to check if api call is done.
         */

        nv.utils.windowResize(function(){
            tenantStorageMonitorView.clusterPoolsGbChart.chart.update;
            //tenantStorageMonitorView.clusterPoolsObjChart.chart.update;
            tenantStorageMonitorView.clusterActivityThrptChart.chart.update;
            tenantStorageMonitorView.clusterActivityIopsChart.chart.update;
            //tenantStorageMonitorView.clusterActivityObjChart.chart.update;
            tenantStorageMonitorView.clusterActivityLatencyChart.chart.update;
            tenantStorageMonitorView.diskClusterStatusChart.chart.update;
            tenantStorageMonitorView.diskStatusChart.chart.update;
        });

    }
    this.updateMonitorDashboard = function(ds){
        if(tenantStorageMonitorView.tabsLoaded['monitor'] == 0) {
            tenantStorageMonitorView.tabsLoaded['monitor'] = 1;

            $('#dashMonitorHealthBox .widget-header').initWidgetHeader({title:'Health',widgetBoxId :'dashMonHealth'});

            endWidgetLoading('dashMonHealth');
        }
        else{

        }

    }
    this.updateDisksDashboard = function(ds){
        if(tenantStorageMonitorView.tabsLoaded['disks'] == 0) {
            tenantStorageMonitorView.tabsLoaded['disks'] = 1;

            this.disksBubbleChart.init('#disksBubble');
            this.disksBubbleChart.draw();
            this.disksBubbleChart.refresh(this.getDisksBubbleData());
        }
        else{
            this.disksBubbleChart.refresh(this.getDisksBubbleData());
        }
    }

    this.loadViewFromNode = function (hashObj){
        if(hashObj == '') {
            hashObj = {};
            hashObj['node'] = 'Dashboard';
        }
        if (hashObj['node'].indexOf('Monitor:') == 0) {
            oneMntrView.load({name:hashObj['node'].split(':')[1], ip:hashObj['ip'],tab:hashObj['tab']});
        } else if (hashObj['node'].indexOf('Disks:') == 0) {
            oneOSDView.load({name:hashObj['node'].split(':')[1], ip:hashObj['ip'], uuid:hashObj['uuid'], tab:hashObj['tab'], filters:hashObj['filters']});
        } else if (hashObj['node'].indexOf('Placement Groups:') == 0) {
            onePgView.load({name:hashObj['node'].split(':')[1], ip:hashObj['ip'], uuid:hashObj['uuid'], tab:hashObj['tab']});
        } else {
            this.setCurrPage(hashObj['node']);
            if(hashObj['node'] == 'Monitor Nodes'){
                storInfraMonView.load();
            }
            else if(hashObj['node'] == 'OSDs')
                storInfraOSDsView.load();
            else if(hashObj['node'] == 'Placement Groups')
                storInfraPgView.load();
            else
                tenantStorageMonitorView.load();
        }
    }
    this.load = function (newObj){
        var hashParams = ifNull(newObj['hashParams'],{});
        console.log(newObj['hashParams']);
        var hashParams = newObj['hashParams'];

        if(hashParams['node'] != null) {
            var infraDashTemplate = Handlebars.compile($("#monitor-page-template").html());
            $(contentContainer).html('');
            $(contentContainer).html(infraDashTemplate);
            tenantStorageMonitorView.loadViewFromNode(hashParams);

        } else {    //Load Dashboard
            var infraDashboardTemplate = Handlebars.compile($('#storage-dashboard').html());
            $(contentContainer).html('');
            $(contentContainer).html(infraDashboardTemplate);
            self.setCurrPage('Dashboard');
            tenantStorageMonitorView.updateClusterDashboard(hashParams);

            //Initialize the common stuff
            //$($('#dashboard-stats .widget-header')[0]).initWidgetHeader({title:'Logs',widgetBoxId :'logs'});
            //$($('#dashboard-stats .widget-header')[1]).initWidgetHeader({title:'System Information', widgetBoxId: 'sysinfo'});
            //$($('#dashboard-stats .widget-header')[2]).initWidgetHeader({title:'Alerts', widgetBoxId: 'alerts' });
        }
    }
    if(this.timerId){
        clearInterval(this.timerId);
    }
    else{
        this.timerId = setInterval(function() {
            var currPage = tenantStorageMonitorView.getCurrPage();
            if( currPage == 'Dashboard'){
                statusDataRefresh();
            }
            else if(currPage == 'Monitor'){
                monitorGridDataRefresh();
            }
            else if(currPage == 'Disks'){
                OSDsDataRefresh();
            }

        }, refreshTimeout);
    }
}

var tenantStorageMonitorView = new storInfraDashboardClass();

function decideColor(origClass,color){
    if(color == 'red' || color == "#d62728"){
        return 'cell-hyperlink-text-error';
    } else {
        return 'cell-hyperlink';
    }
}

function cephIpDisplay (ip){
    //TODO just get the IP not port
    return '<span title="'+ ip +'">' + ip + '</span>';
}

function byteToGB(bytes){
    var gb = (bytes/1073741824).toFixed(2);
    return gb;
}

function kiloByteToGB(kbytes){
    var gb = (kbytes/1048576).toFixed(2);
    return gb;
}

function calcPercent(val1, val2){
    return ((val1/val2)*100).toFixed(2);
}

function getLabelClass(status){
    var labelClass;
    if (status == 'OK')
        labelClass = "label-success";
    else if (status == 'WARN')
        labelClass = "label-warning";
    else if (status == 'DOWN')
        labelClass = "label-important";
    else {
        labelClass = "label-info";
    }
    return labelClass;
}

function getIconClass(status){
    var labelClass;
    if (status == 'OK')
        labelClass = "icon-arrow-up";
    else if (status == 'WARN')
        labelClass = "icon-warning-sign";
    else if (status == 'DOWN')
        labelClass = "icon-arrow-down";
    else if (status == 'CLUSTER IDLE')
        labelClass = "icon-info-sign";
    else {
        labelClass = "icon-pause";
    }
    return labelClass;
}

function getIconColorClass(status){
    var labelClass;
    if (status == 'OK')
        labelClass = "success-color";
    else if (status == 'WARN')
        labelClass = "warning-color";
    else if (status == 'DOWN')
        labelClass = "down-color";
    else {
        labelClass = "info-color";
    }
    return labelClass;
}

function parseClusterHealthData(result){
    var retObj={};
    if(result != null){
        var status = result['cluster_status']['overall_status'];
        if (status == 'HEALTH_WARN')
            retObj['health-status'] = 'WARN';
        else if (status == 'HEALTH_OK')
            retObj['health-status'] = 'OK';
        else
            retObj['health-status'] = status;
    }
    tenantStorageMonitorView.setClusterHealthData(retObj);
}

function parseClusterMonitorData(result){
    var retObj={};
    if(result != null){
        var status = result['overall_status'];
        console.log("Status:"+status);
        if (status == 'HEALTH_WARN'){
            retObj['monitor-status'] = 'WARN';
        }
        else if (status == 'HEALTH_OK')
            retObj['monitor-status'] = 'OK';
        else
            retObj['monitor-status'] = status;
    }
   tenantStorageMonitorView.setClusterMonitorData(retObj);
}

function parseCephClusterDFData(result){
    var retObj={};
    if(result != null){
        retObj['total_used'] = kiloByteToGB(result['total_used']);
        retObj['total_avail'] = kiloByteToGB(result['total_avail']);
        retObj['total_space'] = kiloByteToGB(result['total_space']);
        retObj['used_perc'] = ((retObj['total_used']/retObj['total_space'])*100).toFixed(2);
    }
    tenantStorageMonitorView.setDFUsageData(retObj);
}

function parseCephPoolsData(result){
    var gbUsedKeys = [];
    var objectsKeys = [];

    if(result != null) {
        $.each(result, function (idx, item) {
            var key1 = {}, key2= {},
                obj1 = {}, obj2 = {},
                values1 = [], values2=[];
            obj1['label'] = 'GB Used';
            obj1['value'] = parseFloat(byteToGB(item['stats']['bytes_used']));
            values1.push(obj1);
            key1['key'] = item['name'];
            key1['values'] = values1;
            gbUsedKeys.push(key1);

            obj2['label'] = 'Objects';
            obj2['value'] = item['stats']['objects'];
            values2.push(obj2);
            key2['key'] = item['name'];
            key2['values'] = values2;
            objectsKeys.push(key2);
        });
    }
    tenantStorageMonitorView.setPoolsBarGbData(gbUsedKeys);
    tenantStorageMonitorView.setPoolsBarObjData(objectsKeys);
}

function parseOSDsStatusData(result){
    var statusSeries = [], clusterSeries = [];
    if(result != null){
        var osdmap = result['osd_stat']['output'];
        $.each(osdmap, function(idx, val) {
            var obj1 = {}, key1 = {};
            if (idx == 'num_up_osds') {
                var val1 = []
                obj1['label'] = 'Status';
                obj1['value'] = parseInt(val);
                val1.push(obj1);
                key1['key'] = 'UP';
                key1['values'] = val1;
                statusSeries.push(key1);
            }
            else if (idx == 'num_down_osds') {
                var val1 = [];
                obj1['label'] = 'Status';
                obj1['value'] = parseInt(val);
                val1.push(obj1);
                key1['key'] = 'DOWN';
                key1['values'] = val1;
                key1['color'] = '#D62728';
                statusSeries.push(key1);
            }
            else if (idx == 'num_in_osds'){
                var val1 = [];
                obj1['label'] = 'Cluster status';
                obj1['value'] = parseInt(val);
                val1.push(obj1);
                key1['key'] = 'IN';
                key1['values'] = val1;
                clusterSeries.push(key1);
            }
            else if (idx == 'num_out_osds') {
                var val1 = [];
                obj1['label'] = 'Cluster status';
                obj1['value'] = parseInt(val);
                val1.push(obj1);
                key1['key'] = 'OUT';
                key1['values'] = val1;
                key1['color'] = '#FF7F0E';
                clusterSeries.push(key1);
            }
            else if (idx == 'num_osds') {
                //retArr[4]['osds'] = val;
            }
            else{
                //do nothing;
            }
        });
    }
    tenantStorageMonitorView.setDisksStatusData(statusSeries);
    tenantStorageMonitorView.setDisksClusterStatusData(clusterSeries);
}

function parseCephPGData(result){
    var fields = ['Total PGs','Data GB','GB Used','GB Available', 'GB Total'];
    var retArr = [];
    $.each(fields, function(idx,val){
        var obj = {};
        obj['field'] = val;
        obj['value'] = 0;
        retArr.push(obj);
    });
    if(result != null){
        var pgmap = result['pgmap'];
        $.each(pgmap, function(idx, val){
            if (idx == 'num_pgs')
                retArr[0]['value'] = val;
            else if (idx == 'data_bytes')
                retArr[1]['value'] = byteToGB(val);
            else if (idx == 'bytes_used')
                retArr[2]['value'] = byteToGB(val);
            else if (idx == 'bytes_avail')
                retArr[3]['value'] = byteToGB(val);
            else if (idx == 'bytes_total')
                retArr[4]['value'] = byteToGB(val);
            else{
                //do nothing;
            }
        });
    }
    //console.log(retArr);
    return retArr;
}

function parseClusterThroughput(response){
    console.log(response);
    var firstTime = new Boolean();
    firstTime = true;
    var t1,t2,v;
    if(firstTime) {
        t1 = 1;
        t2 = 1;
        v = 70; // start value (subscribers)
        dataRead = d3.range(50).map(nextRead);
        dataWrite = d3.range(50).map(nextWrite);

        firstTime = false;
    }
    else{
        dataRead.shift();
        dataRead.push(nextRead());
        dataWrite.shift();
        dataWrite.push(nextWrite());
    }
    function nextRead() {
        return {
            x: ++t1,
            y: v = ~~Math.max(10, Math.min(90, v + 10 * (Math.random() - .5)))
        };
    }
    function nextWrite() {
        return {
            x: ++t2,
            y: v = ~~Math.max(10, Math.min(90, v + 10 * (Math.random() - .5)))
        };
    }

    junkThrptData = [
        {
            values: dataRead,
            key: 'Read',
            color: 'steelblue',
            area: true
        },
        {
            values: dataWrite,
            key: 'Write',
            color: '#2ca02c',
            area: true
        }
    ];
    tenantStorageMonitorView.setClusterThrptData(junkThrptData);
    tenantStorageMonitorView.setClusterIopsData(junkThrptData);
}

function parseClusterLatency(response){
    console.log(response);
    var firstTime = new Boolean();
    firstTime = true;
    var t1,t2,v;
    if(firstTime) {
        t1 = 1;
        t2 = 1;
        v = 70; // start value (subscribers)
        dataRead = d3.range(50).map(nextRead);
        dataWrite = d3.range(50).map(nextWrite);

        firstTime = false;
    }
    else{
        dataRead.shift();
        dataRead.push(nextRead());
        dataWrite.shift();
        dataWrite.push(nextWrite());
    }
    function nextRead() {
        return {
            x: ++t1,
            y: v = ~~Math.max(10, Math.min(90, v + 10 * (Math.random() - .5)))
        };
    }
    function nextWrite() {
        return {
            x: ++t2,
            y: v = ~~Math.max(10, Math.min(90, v + 10 * (Math.random() - .5)))
        };
    }

    junkThrptData = [
        {
            values: dataRead,
            key: 'Read',
            color: 'steelblue',
            area: false
        },
        {
            values: dataWrite,
            key: 'Write',
            color: '#2ca02c',
            area: false
        }
    ];
    tenantStorageMonitorView.setClusterLatencyData(junkThrptData);

}

function getClusterHealthStatus(){
    startWidgetLoading('dashHealth');
    $.ajax({
        url: '/api/tenant/storage/cluster/status',
        dataType: "json",
        cache: false

    }).done(function(response){
        parseClusterHealthData(response);
        endWidgetLoading('dashHealth');

    }).fail(function(result) {

    });
}

function getClusterMonitorStatus(){
    startWidgetLoading('dashHealth');
    $.ajax({
        url: '/api/tenant/storage/cluster/monitors/summary',
        dataType: "json",
        cache: false

    }).done(function(response){
        parseClusterMonitorData(response);
        endWidgetLoading('dashHealth');
    }).fail(function(result) {

    });

}

function getClusterDFStatus(){
    startWidgetLoading('dashUsage');
    $.ajax({
        url: '/api/tenant/storage/cluster/df/status',
        dataType: "json",
        cache: false

    }).done(function(response){
        parseCephClusterDFData(response['utilization_stats']['output']['stats']);
        endWidgetLoading('dashUsage');
    }).fail(function(result) {

    });

}

function getClusterPools(){
    startWidgetLoading('dashPools')
    $.ajax({
        url: '/api/tenant/storage/cluster/pools/summary',
        dataType: "json",
        cache: false

    }).done(function(response){
        parseCephPoolsData(response['pools']);
        endWidgetLoading('dashPools');

    }).fail(function(result) {
        //flash error message;
    });

}

function getOSDsStatus(){
    startWidgetLoading('dashDisks');
    $.ajax({
        url: '/api/tenant/storage/cluster/osd/status',
        dataType: "json",
        cache: false

    }).done(function(response){
        parseOSDsStatusData(response);
        endWidgetLoading('dashDisks');
    }).fail(function(result) {
        //flash error message;
    });

}

function getClusterActivity(){
    startWidgetLoading('dashActivity');
    var deferredObjs = [];
    var thrptDeferred = $.Deferred(),
        latDeferred = $.Deferred();

    deferredObjs.push(thrptDeferred);
    deferredObjs.push(latDeferred);

    getClusterThroughput(thrptDeferred);
    getClusterLatency(latDeferred);

    $.when.apply(window, deferredObjs).done(function(){
        endWidgetLoading('dashActivity');
    });

}

function getClusterThroughput(deferredObj){

    $.ajax({
        url: '/api/tenant/storage/cluster/throughput/summary',
        dataType: "json",
        cache: false

    }).done(function(response){
        parseClusterThroughput(response);
        deferredObj.resolve();
    }).fail(function(result) {

    });

}

function getClusterLatency(deferredObj){

    $.ajax({
        url: '/api/tenant/storage/cluster/latency',
        dataType: "json",
        cache: false

    }).done(function(response){
        parseClusterLatency(response);
        deferredObj.resolve();
    }).fail(function(result) {

    });

}

function healthStatusRefresh(){
    var healthStatusObj = tenantStorageMonitorView.getClusterHealthData();
    $("#health-status").text(healthStatusObj['health-status']);
    $("#health-status-icon").addClass(getIconClass(healthStatusObj['health-status']));
    $("#health-status-icon").addClass(getIconColorClass(healthStatusObj['health-status']));
}

function activityStatusRefresh(){
    var actStatusObj = tenantStorageMonitorView.getClusterActivityData();
    $("#activity-status").text(actStatusObj['activity-status']);
    $("#activity-status-icon").addClass(getIconClass(actStatusObj['activity-status']));
    $("#activity-status-icon").addClass(getIconColorClass(actStatusObj['activity-status']));
}

function monitorStatusRefresh(){
    var monStatusObj = tenantStorageMonitorView.getClusterMonitorData();
    var options = {};
    $("#monitor-status").text(monStatusObj['monitor-status']);
    $("#monitor-status-icon").addClass(getIconClass(monStatusObj['monitor-status']));
    $("#monitor-status-icon").addClass(getIconColorClass(monStatusObj['monitor-status']));
}

function usageDial(){
    var self = this;

    this.init = function(){

        this.statusData = [ {name: "Normal", value: 75},
            {name: "Warning", value:  15},
            {name: "Critical", value: 10}];

        dfUsageObj = {'total_used':0, 'total_avail':0, 'total_space':0, 'used_perc':0.00};

        this.usageData = [ {name: "used", value: 0},
            {name: "available", value: 100}];

        this.labelUsedData = [{name: "used"}];
        this.labelUsedData[0].value = dfUsageObj['total_used'];

        this.labelTotalData = [{name: "available"}];
        this.labelTotalData[0].value = dfUsageObj['total_space'];

        this.labelPercData = [{name: "used_perc"}];
        this.labelPercData[0].value = dfUsageObj['used_perc'];
        /*
         this.initStatusColor = d3.scale.ordinal()
         .range(["#D5EDD4", "#FFE5CF", "#F3BEBE"]);
         this.statusColorNormal  = d3.scale.ordinal()
         .range(["#2CA02C", "#FFE5CF", "#F3BEBE"]);
         this.statusColorWarn    = d3.scale.ordinal()
         .range(["#D5EDD4", "#FF7F0E", "#F3BEBE"]);
         this.statusColorCritcal = d3.scale.ordinal()
         .range(["#D5EDD4", "#FFE5CF", "#D62728"]);
         */
        this.statusColorBright = d3.scale.ordinal()
            .range(["#2CA02C", "#FF7F0E", "#D62728"]);
        this.usageColor = d3.scale.ordinal()
            .range(["#1F77B4", "#C6DBEF","#ADD6FB", "#6BAED6", "#D6EBFD", "#5DAEF8"]);

        var margin = {top: 20, right: 20, bottom: 20, left: 30};
        width = 200 - margin.left - margin.right;
        height = width - margin.top - margin.bottom;

        this.usageDialChart = d3.select("#usage-dial")
            .append('svg')
            //.attr("width", width + margin.left + margin.right)
            //.attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + ((width/2)) + "," + ((height/2)+margin.top) + ")");

        var radius = Math.min(width, height) / 2;

        this.statusArc = d3.svg.arc()
            .outerRadius(radius)
            .innerRadius(radius - 5);

        this.usageArc = d3.svg.arc()
            .outerRadius(radius-7)
            .innerRadius(radius - 20);

        this.pie = d3.layout.pie()
            .sort(null)
            .startAngle(2*Math.PI)
            .endAngle(4*Math.PI)
            .value(function(d) { return d.value; });
    }

    this.draw = function(){

        usageColor = this.usageColor;
        statusColorBright = this.statusColorBright;
        usageData = this.usageData;
        usageArc = this.usageArc;

        this.statusPathGroup = this.usageDialChart.selectAll(".status-arc")
            .data(this.pie(this.statusData))
            .enter().append("g")
            .attr("class", "status-arc")
            .append("path")
            .style("fill", function(d) { return statusColorBright(d.data.name); })
            .style("opacity", function(d) { return 0.5; })
            .attr("d", this.statusArc);

        usageArcEnter = this.usageDialChart.selectAll(".usage-arc")
            .data(this.pie(this.usageData))
            .enter().append("g")
            .attr("class", "usage-arc");

        this.usagePathGroup = usageArcEnter.append("path")
            .style("fill", function(d) { return usageColor(d.data.name); })
            .attr("d", usageArc)
            .each(function(d) { this._current = d; });

        this.statusPathGroup.transition().delay(function(d, i) { return i * 500; }).duration(1800)
            .style("fill", function(d) { return statusColorBright(d.data.name); })
            .style("opacity", function(d) { return 0.5; });

    }

    this.refresh = function(){

        var dfUsageObj = tenantStorageMonitorView.getDFUsageData();
        var usageData = [ {name: "used"},{name: "available"}];
        var status_flag = '';
        statusColorBright = this.statusColorBright;

        //test
        //dfUsageObj['used_perc'] = 80.00;
        //dfUsageObj['used_perc'] = 91.00;
        //dfUsageObj['used_perc'] = 60.00;

        $("#df-used-perc").text(dfUsageObj['used_perc'] + "%");
        $("#df-used").text(dfUsageObj['total_used'] +" GB");
        $("#df-total").text(dfUsageObj['total_space'] + " GB");

        this.labelPercData[0].value = dfUsageObj['used_perc'];

        usageData[0].value = Math.ceil(dfUsageObj['used_perc']);
        usageData[1].value = 100 - usageData[0].value;

        this.labelUsedData[0].value = dfUsageObj['total_used'];
        this.labelTotalData[0].value = dfUsageObj['total_space'];

        usageArc = this.usageArc;
        this.usagePathGroup = this.usagePathGroup.data(this.pie(usageData));
        this.usagePathGroup.transition().duration(750).attrTween("d", arcTween);;

        function arcTween(a) {
            var i = d3.interpolate(this._current, a);
            this._current = i(0);
            return function(t) {
                return usageArc(i(t));
            };
        }

        if (dfUsageObj['used_perc'] < 75){
            status_flag = "Normal";
        }
        else if (dfUsageObj['used_perc'] > 75 && dfUsageObj['used_perc'] < 90){
            status_flag = "Warning";
            $("#df-used-perc").removeClass("usage-perc-label");
            $("#df-used-perc").addClass("usage-perc-warn-label");
        }
        else{
            status_flag = "Critical";
            $("#df-used-perc").removeClass("usage-perc-label");
            $("#df-used-perc").addClass("usage-perc-crit-label");
        }
        this.statusPathGroup.transition().delay(function(d, i) { return i * 500; }).duration(1800)
            .style("fill", function(d) { return statusColorBright(d.data.name); })
            .style("stroke", function(d) { if (d.data.name == status_flag) return statusColorBright(d.data.name); })
            .style("stroke-width", function(d) { if (d.data.name == status_flag) return 1.5; })
            .style("opacity", function(d){ if (d.data.name == status_flag) return 1; else return 0.5;});
    }
}

function onClusterActivityChartTabActivate(e, ui){
    var selTab = ui.newTab.context.innerText;
    if(selTab == "Throughput"){
        tenantStorageMonitorView.clusterActivityThrptChart.refresh(tenantStorageMonitorView.getClusterThrptData());
    }
    else if(selTab == "IOPs"){
        tenantStorageMonitorView.clusterActivityIopsChart.refresh(tenantStorageMonitorView.getClusterIopsData());
    }else{}

}

function onPoolsBarTabActivate(e, ui){
    var selTab = ui.newTab.context.innerText;
    if(selTab == "GB Used"){
        tenantStorageMonitorView.clusterPoolsGbChart.refresh(tenantStorageMonitorView.getPoolsBarGbData());
    }
    else if(selTab == "Objects"){
        tenantStorageMonitorView.clusterPoolsObjChart.refresh(tenantStorageMonitorView.getPoolsBarObjData());
    }else{}

}

function poolsBarChart(){
    var chart;

    this.init = function(chartId){

        this.d3ChartElem = d3.select(chartId).append('svg');

        var barColor = d3.scale.ordinal()
            .range(['#7f7f7f', '#bd9e39', '#8ca252','#9e9ac8','#6baed6']);

        var chart = nv.models.multiBarHorizontalChart()
            .x(function(d) { return d.label })
            .y(function(d) { return d.value })
            .margin({top: 30, right: 20, bottom: 10, left: 12})
            .showLegend(true)
            .showValues(false)
            .stacked(true)
            .showControls(false)
            .tooltips(true)
            .color(function(d){return barColor(d.key)});


        if(chartId == '#poolsBarObjChart' )
            chart.yAxis.tickFormat(d3.format('.0f'));

        if(chartId == '#poolsBarGbChart' )
            chart.yAxis.tickFormat(d3.format(',.2f'));

        chart.xAxis
            .tickPadding(12);

        chart.multibar.dispatch.on('elementMouseover.tooltip', function(e) {
            e.pos = [e.e.x, e.e.y];
            var content = '<h3> ' + e.series.key +' </h3>' +
                '<p>' + e.point.value + ' ' + e.point.label + '</p>' ;
            nv.tooltip.show([e.pos[0], e.pos[1]], content, null, null, null);
        });

        this.chart = chart;

    }
    this.draw = function(){
        nv.addGraph(function(){ return this.chart});
    }
    this.refresh = function(data){

        this.d3ChartElem
            .datum(data)
            .transition().duration(500)
            .call(this.chart);

        //nv.utils.windowResize(this.chart.update);
    }
}

function disksBarChart(){
    var chart;
    this.init = function(chartId){
        var chart = nv.models.multiBarHorizontalChart()
            .x(function(d) { return d.label })
            .y(function(d) { return d.value })
            .margin({top: 30, right: 20, bottom: 10, left: 5})
            .showValues(false)
            .tooltips(true)
            .stacked(false)
            .showControls(false);

        chart.yAxis
            .tickFormat(d3.format('.0f'));

        this.chart = chart;

        this.d3ChartElem = d3.select(chartId).append('svg');

    }
    this.draw = function(){
        nv.addGraph(function(){ return this.chart});
    }
    this.refresh = function(data){
        this.d3ChartElem
            .datum(data)
            .transition().duration(500)
            .call(this.chart);

        //d3.select(".nv-legendWrap")
        //    .attr("transform", "translate(-100,100)");

        //nv.utils.windowResize(this.chart.update);
    }
}

function activityLineChart(){
    var chart;

    this.init = function(chartId){

        chart = nv.models.lineChart()
            .margin({top: 30, right: 20, bottom: 20, left: 5})
            //.useInteractiveGuideline(false)
            //.transitionDuration(350)
            .showLegend(false)
            .showYAxis(false)
            .showXAxis(true);

        if(chartId == '#clusterActivityThrptChart') {
            chart.tooltipContent(function (key, x, y, e, graph) {
                return '<h3> ' + key + ' Throughput </h3>' +
                    '<p>' + e.point.y + ' Mbps</p>';
            });
            chart.yAxis.tickFormat(d3.format('.02f'));
        }
        else if(chartId == '#clusterActivityIopsChart') {
            chart.tooltipContent(function (key, x, y, e, graph) {
                return '<h3> ' + key + ' IOPs</h3>' +
                    '<p>' + e.point.y + ' </p>';
            });
        }
        else if(chartId == '#clusterActivityObjChart') {
            chart.tooltipContent(function (key, x, y, e, graph) {
                return '<h3> ' + key + ' </h3>' +
                    '<p>' + e.point.y + '</p>';
            });
        }
        else if(chartId == '#clusterActivityLatencyChart') {
            chart.tooltipContent(function (key, x, y, e, graph) {
                return '<h3> ' + key + ' </h3>' +
                    '<p>' + e.point.y + ' ms</p>';
            });
        }
        else{
            chart.yAxis.tickFormat(d3.format('.0f'));
        }
        chart.xAxis
            .axisLabel('')
            .tickFormat(d3.format(',.0f'));

        this.chart = chart;
        this.chartId = chartId;
        this.d3ChartElem = d3.select(this.chartId).append('svg');

    }
    this.draw = function(){
        nv.addGraph(function(){ return this.chart});
    }
    this.refresh = function(data){
        this.d3ChartElem
            .datum(data)
            .call(this.chart);

        //nv.utils.windowResize(function() { this.chart.update });
    }
}

/* Disks Scatter Plot

 */

function diskScatterPlot(){
    var self = this;
    var chart;

    this.init = function(chartId){
        this.chartId = chartId;

        var chart = nv.models.scatterChart()
            .margin({top: 20, right: 20, bottom: 50, left: 80})
            .showDistX(true)
            .showDistY(true)
            .showLegend(true)
            .transitionDuration(350)
            .size(25).sizeRange([200,200])
            .shape("circle")
            .x(function(d){return d.avail_percent})
            .y(function(d){return d.gb})
            .tooltipContent(function(key, x, y, e, graph){
                return '<h3>' + e.point.name + '</h3>' +
                    '<p> Status: ' + e.point.status + '</p>' +
                    '<p> Host: ' + e.point.host + '</p>' +
                    '<p> GB Avail: ' + e.point.gb_avail+ '</p>';})
            .color(function(d){return d.color});

        //Axis settings
        chart.xAxis
            .tickFormat(d3.format('.02f'))
            .axisLabel('Available Percentage')
            .axisLabelDistance(5);

        chart.yAxis
            .tickFormat(d3.format('.02f'))
            .axisLabel('Total space (GB)')

        chart.scatter.dispatch.on('elementClick', function(e){ showOSDDetails(e.point.name);});
        chart.scatter.dispatch.on('elementMouseover', function(){ /*console.log(d3.select(this).attr());*/});

        this.chart = chart;

        this.d3ChartElem = d3.select(this.chartId).append('svg');

    }

    this.draw = function(){
        nv.addGraph(function() { return this.chart});
    }

    this.refresh = function(data){

        /* calculating X and Y axis ranges.
         extent of gb and avail_percent of all OSDs in all groups
         is taken and padding is added to eliminate circles shown on chart margin
         */
        var yvals = [];
        $.each(data, function(idx,grp){
            $.each(grp.values, function(i,osd){
                yvals.push(parseFloat(osd.gb));
            });
        });
        var yscale = d3.extent(yvals);

        yscale[0] = yscale[0] - 150;
        yscale[1] = yscale[1] + 150;

        var xvals = [];
        $.each(data, function(idx,grp){
            $.each(grp.values, function(i,osd){
                xvals.push(parseFloat(osd.avail_percent));
            });
        });
        var xscale = d3.extent(xvals);
        xscale[0] = xscale[0] - 0.2;
        xscale[1] = (xscale[1] >= 95.5)? 100.00:xscale[1]+0.5;

        this.chart.forceX(xscale)
            .forceY(yscale)

        this.d3ChartElem
            .datum(data)
            .call(this.chart);

        nv.utils.windowResize(this.chart.update);

    }
}


/* End of Disks Scatter Plot

 */

function statusDataRefresh(){

    getClusterHealthStatus();
    getClusterMonitorStatus();
    getClusterDFStatus();
    getClusterPools();
    getOSDsStatus();
    getClusterActivity();

}
