
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

var tenantStorageChartUtils = {
    onDiskDrillDown:function(currObj) {
         layoutHandler.setURLHashParams({node:currObj['host'] , tab:'details:' + currObj['name']}, {p:'mon_storage_disks'});
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
        if (e['point']['type'] == 'disk') {
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

function updateTenantStorageCharts(dsData, nodeType) {
    var title,key,chartId,isChartInitialized = false,tooltipFn;
    var nodeData = dsData;
    var data = [];
    if(nodeData != null){
        data = updateCharts.setUpdateParams($.extend(true,[],nodeData));
    }
    if(nodeType == 'disks'){
        title = 'Disks';
        key = 'disks';
        chartId = 'osds-bubble';
        tooltipFn = tenantStorageChartUtils.diskTooltipFn;
        clickFn = tenantStorageChartUtils.onDiskDrillDown;
        linkHash = {p:'mon_storage_disks',q:{node:'Disks'}};
    }
    var chartsData = [{
                        title: title,
                        d:[{key:key,values:data}],
                        xLbl: 'Available (%)',
                        yLbl: 'Total Storage (GB)',
                        chartOptions:{
                            tooltipFn: tooltipFn,
                            clickFn: clickFn,
                            xPositive: true,
                            addDomainBuffer: true
                        },
                        link:{
                            hashParams: linkHash
                        },
                        widgetBoxId:'recent'
                    }];
    var chartObj = {},nwObj = {};
    if(!tenantStorageChartsInitializationStatus[key]){
        $('#' + chartId).initScatterChart(chartsData[0]);
        tenantStorageChartsInitializationStatus[key] = true;
    }  else {
        chartObj['selector'] = $('#content-container').find('#' + chartId + ' > svg').first()[0];
        chartObj['data'] = [{key:key,values:data}];
        chartObj['type'] = 'infrabubblechart';
        updateCharts.updateView(chartObj);
    }
}

var tenantStorageGridUtils = {
    onDisksRowSelChange: function(currObj) {
        layoutHandler.setURLHashParams({node:currObj['host'] , tab:'details:' + currObj['name']}, {p:'mon_storage_disks'});
    },
}

function addTab(selector, newTabAnchor, newTabTitle, defaultContent){
    var tabs = $("#"+selector).tabs();
    var ul = tabs.find("ul");
    $( "<li><a href='#"+ newTabAnchor + "'>" + newTabTitle + "</a></li>" ).appendTo( ul );
    $( "<div id='" + newTabAnchor + "'><p>" + defaultContent + "</p></div>" ).appendTo( tabs );
    tabs.tabs( "refresh" );
}

function getMonitorNodeHealthStatusTmpl(obj){
    var statusTmpl = contrail.getTemplate4Id('storage-status-template');
    if(obj == "HEALTH_OK")
        return "<span> "+statusTmpl({sevLevel:sevLevels['INFO'],sevLevels:sevLevels})+" ok</span>";
    else if(obj == "HEALTH_WARN")
        return "<span> "+statusTmpl({sevLevel:sevLevels['WARNING'],sevLevels:sevLevels})+" warn</span>";
    else if(obj == "HEALTH_CRIT")
        return "<span> "+statusTmpl({sevLevel:sevLevels['ERROR'],sevLevels:sevLevels})+" critical</span>";
    else
        return "<span> "+statusTmpl({sevLevel:sevLevels['NOTICE'],sevLevels:sevLevels})+" N/A</span>";
}

function getDiskStatusTmpl(obj) {
    var statusTmpl = contrail.getTemplate4Id('storage-status-template');
    if(obj == "in")
        return "<span> "+statusTmpl({sevLevel:sevLevels['INFO'],sevLevels:sevLevels})+" in</span>";
    else if(obj == "out")
        return "<span> "+statusTmpl({sevLevel:sevLevels['WARNING'],sevLevels:sevLevels})+" out</span>";
    else if(obj == "down")
        return "<span> "+statusTmpl({sevLevel:sevLevels['ERROR'],sevLevels:sevLevels})+" down</span>";
    else if(obj == "up")
        return "<span> "+statusTmpl({sevLevel:sevLevels['NOTICE'],sevLevels:sevLevels})+" up</span>";
    else
        return "<span> N/A</span>";
}

function getHostStatusTmpl(obj) {
    var statusTmpl = contrail.getTemplate4Id('storage-status-template');
    if(obj == "active")
        return "<span> "+statusTmpl({sevLevel:sevLevels['INFO'],sevLevels:sevLevels})+" active</span>";
    else if(obj == "warn")
        return "<span> "+statusTmpl({sevLevel:sevLevels['WARNING'],sevLevels:sevLevels})+" warn</span>";
    else if(obj == "critical")
        return "<span> "+statusTmpl({sevLevel:sevLevels['ERROR'],sevLevels:sevLevels})+" critical</span>";
    else
        return "<span> N/A</span>";
}


function formatTreeLblValueTooltip(infoObj) {
    var tooltipTemplateSel = 'tree-lblval-tooltip-template';
    var tooltipTemplate = contrail.getTemplate4Id(tooltipTemplateSel);
    return tooltipTemplate(infoObj);
}
