var storageConsoleTimer = [];
var infraMonitorStorageAlertUtils = {
    processStorageNodeAlerts : function(obj){
        var alertsList = [];
        var infoObj = {name:obj['name'],type:'Storage Node',ip:obj['ip']};
        if(obj['isDiskDown'] == true)
            alertsList.push($.extend({},{sevLevel:sevLevels['WARNING'],msg:infraAlertMsgs['DISK_DOWN']},infoObj));
        if(obj['errorStrings'] != null && obj['errorStrings'].length > 0){
            $.each(obj['errorStrings'],function(idx,errorString){
                alertsList.push($.extend({},{sevLevel:sevLevels['WARNING'],msg:errorString},infoObj));
            });
        }
        return alertsList.sort(dashboardUtils.sortInfraAlerts);
    }
}

var infraMonitorStorageUtils = {
    /**
     * Parses Storage Nodes data
     */
    parseStorageNodesDashboardData : function (result) {
        var retArr = [];
        var hosts = result.topology.hosts;
        $.each(hosts, function (idx, host) {
            var obj = {};
            obj['x'] = parseFloat(host.avail_percent);
            obj['y'] = parseFloat((host.kb_total / 1048576).toFixed(2));
            obj['available_perc'] = $.isNumeric(obj['x']) ? obj['x'].toFixed(2) : '-';
            obj['total'] = formatBytes(host.kb_total * 1024);
            obj['size'] = 1;
            obj['shape'] = 'circle';
            obj['type'] = 'storageNode';
            obj['display_type'] = 'Storage Node';
            obj['name'] = host.name;
            obj['isPartialUveMissing'] = false;
            obj['osds'] = host.osds;
            obj['monitor'] = host.monitor;
            obj['status'] = host.status;
            obj['color'] = getStorageNodeColor(host, obj);
            obj['downNodeCnt'] = 0;
            obj['nodeAlerts'] = infraMonitorStorageAlertUtils.processStorageNodeAlerts(obj);
            obj['alerts'] = obj['nodeAlerts'].sort(dashboardUtils.sortInfraAlerts);

            if (obj['color'] == d3Colors['red']) {
                obj['downNodeCnt']++;
            }
            retArr.push(obj);
        });
        retArr.sort(dashboardUtils.sortNodesByColor);
        return retArr;
    },
    getDownNodeCnt : function(data) {
        var downNodes = $.grep(data,function(obj,idx) {
            return obj['color'] == d3Colors['red'];
        });
        return downNodes.length;
    },
    clearTimers : function () {
        $.each(storageConsoleTimer, function (idx, value) {
            logMessage("clearing timer:", value);
            clearTimeout(value)
        });
        storageConsoleTimer = [];
    }
}

/**
 * populateFn for storageDS
 */
function getAllStorageNodes(defferedObj,dataSource){
    var obj = {};
    obj['transportCfg'] = {
        url: monitorInfraStorageUrls['STORAGENODES_SUMMARY'],
        type:'GET'
    }
    getOutputByPagination(dataSource,
        {transportCfg:obj['transportCfg'],
            parseFn:infraMonitorStorageUtils.parseStorageNodesDashboardData,
            loadedDeferredObj:defferedObj});
}

function getStorageNodeColor(d,obj) {
    obj = ifNull(obj,{});
    if(obj['status'] == "down")
        return d3Colors['red'];
    if(obj['status'] == "warn")
        return d3Colors['orange'];
    return d3Colors['blue'];
}

/**
 * This function takes parsed nodeData from the infra parse functions and returns object with all alerts displaying in dashboard tooltip,
 * and tooltip messages array
 */
function getNodeStatusForSummaryPages(data,page) {
    var result = {},msgs = [],tooltipAlerts = [];
    for(var i = 0;i < data['alerts'].length; i++) {
        if(data['alerts'][i]['tooltipAlert'] != false) {
            tooltipAlerts.push(data['alerts'][i]);
            msgs.push(data['alerts'][i]['msg']);
        }
    }
    //Status is pushed to messages array only if the status is "UP" and tooltip alerts(which are displaying in tooltip) are zero
    if(ifNull(data['status'],"").indexOf('Up') > -1 && tooltipAlerts.length == 0) {
        msgs.push(data['status']);
        tooltipAlerts.push({msg:data['status'],sevLevel:sevLevels['INFO']});
    } else if(ifNull(data['status'],"").indexOf('Down') > -1) {
        //Need to discuss and add the down status
        //msgs.push(data['status']);
        //tooltipAlerts.push({msg:data['status'],sevLevel:sevLevels['ERROR']})
    }
    result['alerts'] = tooltipAlerts;
    result['nodeSeverity'] = data['alerts'][0] != null ? data['alerts'][0]['sevLevel'] : sevLevels['INFO'];
    result['messages'] = msgs;
    var statusTemplate = contrail.getTemplate4Id('statusTemplate');
    if(page == 'summary')
        return statusTemplate({sevLevel:result['nodeSeverity'],sevLevels:sevLevels});
    return result;
}

function updateStorageChartsForSummary(dsData, nodeType) {
    var title,key,chartId,isChartInitialized = false,tooltipFn;
    var nodeData = dsData;
    var data = [];
    if(nodeData != null){
        data = updateCharts.setUpdateParams($.extend(true,[],nodeData));
    }
    if(nodeType == 'storageNodes'){
        title = 'Storage Nodes';
        key = 'Storage Nodes';
        chartId = 'storageNodes-bubble';
        tooltipFn = dashboardUtils.storageNodeTooltipFn;
    }
    var chartsData = [{title:title,d:[{key:key,values:data}],xLbl:'Available (%)',yLbl:'Total Storage (GB)',chartOptions:{tooltipFn:storageChartUtils.storageNodeTooltipFn, clickFn:storageChartUtils.onStorageNodeDrillDown,xPositive:true,addDomainBuffer:true},link:{hashParams:{p:'mon_bgp',q:{node:'storageNode'}}},widgetBoxId:'recent'}];
    var chartObj = {},nwObj = {};
    if(!storageSummaryChartsInitializationStatus[key]){
        $('#' + chartId).initScatterChart(chartsData[0]);
        storageSummaryChartsInitializationStatus[key] = true;
    }  else {
        chartObj['selector'] = $('#content-container').find('#' + chartId + ' > svg').first()[0];
        chartObj['data'] = [{key:key,values:data}];
        chartObj['type'] = 'infrabubblechart';
        updateCharts.updateView(chartObj);
    }
}

function getStorageNodeTooltipContents(currObj) {
    var tooltipContents = [
        {lbl: 'Host Name', value: currObj['name']},
        {lbl: 'Total Space', value: currObj['total']},
        {lbl: 'Available', value: $.isNumeric(currObj['available_perc']) ? currObj['available_perc'] + '%' : currObj['available_perc']}
    ];
    return tooltipContents;
}

var storageChartUtils = {
    onStorageNodeDrillDown:function(currObj) {
         layoutHandler.setURLHashParams({node: 'Storage Nodes:' + currObj['name'], tab:''}, {p:'mon_infra_storage'});
    },
    onDiskDrillDown:function(currObj) {
         layoutHandler.setURLHashParams({node:'Storage Nodes:' + currObj['hostname'], tab:'disks:details:' + currObj['name']}, {p:'mon_infra_storage'});
    },
    storageNodeTooltipFn: function(currObj) {
        var tooltipContents = [
            {lbl: 'Disks', value: currObj['osds'].length}
        ]; 
        return getStorageNodeTooltipContents(currObj).concat(tooltipContents);
    },
    diskTooltipFn: function(currObj) {
        var tooltipContents = [
            {lbl: 'Status', value: currObj['status'] + '&' + currObj['cluster_status']}
        ];
        return getStorageNodeTooltipContents(currObj).concat(tooltipContents);
    },
    getTooltipContents: function (e) {
    //Get the count of overlapping bubbles
    var series = e['series'];
    var processDetails = e['point']['processDetails'];
    var tooltipContents = [
        {lbl: 'Host Name', value: e['point']['name']},
        {lbl: 'Total Space', value: e['point']['total']},
        {lbl: 'Available', value: $.isNumeric(e['point']['available_perc']) ? e['point']['available_perc'] + '%' : e['point']['available_perc']}
    ];
    if (e['point']['type'] == 'storageNode') {
        tooltipContents.push(
            {lbl: 'Disks', value: e['point']['osds'].length}
        );
        $.each(e['point']['alerts'], function (idx, obj) {
            if (obj['tooltipAlert'] != false)
                tooltipContents.push({lbl: ifNull(obj['tooltipLbl'], 'Events'), value: obj['msg']});
        });
    } else if (e['point']['type'] == 'disk') {
        tooltipContents.push(
            {lbl: 'Status', value: e['point']['status'] + '&' + e['point']['cluster_status']}
        );
        $.each(e['point']['alerts'], function (idx, obj) {
            if (obj['tooltipAlert'] != false)
                tooltipContents.push({lbl: ifNull(obj['tooltipLbl'], 'Events'), value: obj['msg']});
        });
    }
    return tooltipContents;
    },

}
