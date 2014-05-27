
var infraMonitorStorageUtils = {
    /**
     * Parses Storage Nodes data
     */
    parseStorageNodesDashboardData : function (result) {
        var retArr = [];
        //Reset the counter
        infraMonitorView.downNodeCnt['storageNode'] = 0;
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
            obj['nodeAlerts'] = self.processStorageNodeAlerts(obj);
            obj['alerts'] = obj['nodeAlerts'].sort(bgpMonitor.sortInfraAlerts);

            if (obj['color'] == d3Colors['red']) {
                obj['downNodeCnt']++;
            }
            retArr.push(obj);
        });
        infraMonitorView.downNodeCnt['storageNode'] = result.topology.total_down_node;
        infraViewModel.storageNodeDownCnt(infraMonitorView.downNodeCnt['storageNode']);
        infraViewModel.storageNodeUpCnt(result.topology.total_node - infraMonitorView.downNodeCnt['storageNode']);
        retArr.sort(bgpMonitor.sortNodesByColor);
        dashboardDataObj.storageNodesData(retArr);
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

