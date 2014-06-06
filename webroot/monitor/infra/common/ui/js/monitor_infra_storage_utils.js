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
        return alertsList.sort(bgpMonitor.sortInfraAlerts);
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
            obj['alerts'] = obj['nodeAlerts'].sort(bgpMonitor.sortInfraAlerts);

            if (obj['color'] == d3Colors['red']) {
                obj['downNodeCnt']++;
            }
            retArr.push(obj);
        });
        retArr.sort(bgpMonitor.sortNodesByColor);
        return retArr;
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