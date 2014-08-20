var storageConsoleTimer = [];
var infraMonitorStorageAlertUtils = {
    processStorageNodeAlerts: function(obj) {
        var alertsList = [];
        var infoObj = {
            name: obj['name'],
            type: 'Storage Node',
            ip: obj['ip']
        };

        $.each(obj['osds'], function(idx, osd) {
            if (osd['status'] == 'down') {
                if (!obj['isDiskDown']) {
                    obj['disk_down_list'] = []
                    obj['isDiskDown'] = true
                }
                obj['disk_down_list'].push(osd['name'])
            }
            if (osd['cluster_status'] == 'out') {
                if (!obj['isDiskOut']) {
                    obj['disk_out_list'] = []
                    obj['isDiskOut'] = true
                }
                obj['disk_out_list'].push(osd['name'])
            }
        });

        if (obj['isDiskDown'] == true)
            alertsList.push($.extend({}, {
                sevLevel: sevLevels['ERROR'],
                msg: (storageInfraAlertMsgs['DISK_DOWN']).format(obj['disk_down_list'].length, obj['disk_down_list'])
            }, infoObj));

        if (obj['isDiskOut'] == true)
            alertsList.push($.extend({}, {
                sevLevel: sevLevels['WARNING'],
                msg: (storageInfraAlertMsgs['DISK_OUT']).format(obj['disk_out_list'].length, obj['disk_out_list'])
            }, infoObj));

        if (obj['errorStrings'] != null && obj['errorStrings'].length > 0) {
            $.each(obj['errorStrings'], function(idx, errorString) {
                alertsList.push($.extend({}, {
                    sevLevel: sevLevels['WARNING'],
                    msg: errorString
                }, infoObj));
            });
        }
        return alertsList.sort(dashboardUtils.sortInfraAlerts);
    }
};

var infraMonitorStorageUtils = {
    /**
     * Parses Storage Nodes data
     */
    parseStorageNodesDashboardData: function(result) {
        var retArr = [],
            def_topology = {};

        /*
        * with multi-backend support, there are different topology output in response.
        * currently only using 'default' type which is the common pool.
         */
        $.each(result.topology, function(idx, topology) {
           if (topology['name'] == 'default') {
               def_topology = topology;
           } else {
               def_topology['hosts'] = [];
           }
        });

        $.each(def_topology.hosts, function(idx, host) {
            var obj = {};
            obj['available_perc'] = $.isNumeric(host['avail_percent']) ? host['avail_percent'].toFixed(2) : '-';
            obj['total'] = formatBytes(host['kb_total'] * 1024);
            obj['size'] = 1;
            obj['shape'] = 'circle';
            obj['type'] = 'storageNode';
            obj['display_type'] = 'Storage Node';
            obj['name'] = host['name'];
            obj['isPartialUveMissing'] = false;
            obj['osds'] = host['osds'];
            obj['osds_total'] = 0;
            obj['osds_used'] = 0;
            $.each(host.osds, function(idx, osd) {
                if (osd.hasOwnProperty('kb') && osd.hasOwnProperty('kb_used')) {
                    obj['osds_total'] += osd['kb'] * 1024;
                    obj['osds_used'] += osd['kb_used'] * 1024;
                }
            });
            obj['x'] = parseFloat(calcPercent((obj['osds_total'] - obj['osds_used']), obj['osds_total']));
            obj['y'] = parseFloat(byteToGB(obj['osds_total']));
            obj['osds_total'] = formatBytes(obj['osds_total']);
            obj['osds_used'] = formatBytes(obj['osds_used']);
            obj['monitor'] = host['monitor'];
            obj['status'] = host['status'];
            obj['color'] = getStorageNodeColor(host, obj);
            obj['downNodeCnt'] = 0;
            //initialize for alerts
            obj['isDiskDown'] = obj['isDiskOut'] = false;
            obj['nodeAlerts'] = infraMonitorStorageAlertUtils.processStorageNodeAlerts(obj);
            obj['alerts'] = obj['nodeAlerts'].sort(dashboardUtils.sortInfraAlerts);
            //currently we are not tracking any storage process alerts.
            obj['processAlerts'] = [];
            var versionArr = host['build_info'].split(" ");
            obj['version'] = "Ceph " + versionArr[2];

            if (obj['color'] == d3Colors['red']) {
                obj['downNodeCnt']++;
            }
            retArr.push(obj);
        });
        retArr.sort(dashboardUtils.sortNodesByColor);
        return retArr;
    },
    getDownNodeCnt: function(data) {
        var downNodes = $.grep(data, function(obj, idx) {
            return obj['color'] == d3Colors['red'];
        });
        return downNodes.length;
    },
    clearTimers: function() {
        $.each(storageConsoleTimer, function(idx, value) {
            logMessage("clearing timer:", value);
            clearTimeout(value)
        });
        storageConsoleTimer = [];
    }
};

function byteToGB(bytes) {
    return (bytes / 1073741824).toFixed(2);
}

function calcPercent(val1, val2) {
    return ((val1 / val2) * 100).toFixed(2);
}

/**
 * populateFn for storageDS
 */
function getAllStorageNodes(defferedObj, dataSource) {
    var obj = {};
    obj['transportCfg'] = {
        url: monitorInfraStorageUrls['STORAGENODES_SUMMARY'],
        type: 'GET'
    }
    getOutputByPagination(dataSource, {
        transportCfg: obj['transportCfg'],
        parseFn: infraMonitorStorageUtils.parseStorageNodesDashboardData,
        loadedDeferredObj: defferedObj
    });
}

function getStorageNodeColor(d, obj) {
    obj = ifNull(obj, {});
    if (obj['status'] == "down")
        return d3Colors['red'];
    if (obj['status'] == "warn")
        return d3Colors['orange'];
    return d3Colors['blue'];
}

function getStorageNodeStatusTmpl(obj) {
    var statusTmpl = contrail.getTemplate4Id('storage-status-template');
    if (obj == "up")
        return "<span> " + statusTmpl({
            sevLevel: sevLevels['INFO'],
            sevLevels: sevLevels
        }) + " up</span>";
    else if (obj == "down")
        return "<span> " + statusTmpl({
            sevLevel: sevLevels['ERROR'],
            sevLevels: sevLevels
        }) + " down</span>";
    else
        return "<span> " + statusTmpl({
            sevLevel: sevLevels['NOTICE'],
            sevLevels: sevLevels
        }) + " N/A</span>";
}

/**
 * This function takes parsed nodeData from the infra parse functions and returns object
 * with all alerts displaying in dashboard tooltip and tooltip messages array
 */
function getNodeStatusForSummaryPages(data, page) {
    var result = {},
        msgs = [],
        tooltipAlerts = [];
    for (var i = 0; i < data['alerts'].length; i++) {
        if (data['alerts'][i]['tooltipAlert'] != false) {
            tooltipAlerts.push(data['alerts'][i]);
            msgs.push(data['alerts'][i]['msg']);
        }
    }
    //Status is pushed to messages array only if the status is "UP" and tooltip alerts(which are displaying in tooltip) are zero
    if (ifNull(data['status'], "").indexOf('Up') > -1 && tooltipAlerts.length == 0) {
        msgs.push(data['status']);
        tooltipAlerts.push({
            msg: data['status'],
            sevLevel: sevLevels['INFO']
        });
    } else if (ifNull(data['status'], "").indexOf('Down') > -1) {
        //Need to discuss and add the down status
        //msgs.push(data['status']);
        //tooltipAlerts.push({msg:data['status'],sevLevel:sevLevels['ERROR']})
    }
    result['alerts'] = tooltipAlerts;
    result['nodeSeverity'] = data['alerts'][0] != null ? data['alerts'][0]['sevLevel'] : sevLevels['INFO'];
    result['messages'] = msgs;
    var statusTemplate = contrail.getTemplate4Id('statusTemplate');
    if (page == 'summary')
        return statusTemplate({
            sevLevel: result['nodeSeverity'],
            sevLevels: sevLevels
        });
    return result;
}

function updateStorageChartsForSummary(dsData, nodeType) {
    var title, key, chartId, isChartInitialized = false,
        tooltipFn;
    var nodeData = dsData;
    var data = [];
    if (nodeData != null) {
        data = updateCharts.setUpdateParams($.extend(true, [], nodeData));
    }
    if (nodeType == 'storageNodes') {
        title = 'Storage Nodes';
        key = 'Storage Nodes';
        chartId = 'storageNodes-bubble';
        tooltipFn = dashboardUtils.storageNodeTooltipFn;
    }
    var chartsData = [{
        title: title,
        d: [{
            key: key,
            values: data
        }],
        xLbl: 'Available (%)',
        yLbl: 'Total Storage (GB)',
        chartOptions: {
            tooltipFn: storageChartUtils.storageNodeTooltipFn,
            clickFn: storageChartUtils.onStorageNodeDrillDown,
            xPositive: true,
            addDomainBuffer: true
        },
        link: {
            hashParams: {
                p: 'mon_bgp',
                q: {
                    node: 'storageNode'
                }
            }
        },
        widgetBoxId: 'recent'
    }];
    var chartObj = {},
        nwObj = {};
    if (!storageSummaryChartsInitializationStatus[key]) {
        $('#' + chartId).initScatterChart(chartsData[0]);
        storageSummaryChartsInitializationStatus[key] = true;
    } else {
        chartObj['selector'] = $('#content-container').find('#' + chartId + ' > svg').first()[0];
        chartObj['data'] = [{
            key: key,
            values: data
        }];
        chartObj['type'] = 'infrabubblechart';
        updateCharts.updateView(chartObj);
    }
}

function getStorageNodeTooltipContents(currObj) {
    var tooltipContents = [{
        lbl: 'Host Name',
        value: currObj['name']
    }, {
        lbl: 'Total Space',
        value: currObj['total']
    }, {
        lbl: 'Available',
        value: $.isNumeric(currObj['available_perc']) ? currObj['available_perc'] + '%' : currObj['available_perc']
    }];
    return tooltipContents;
}

var storageChartUtils = {
    onStorageNodeDrillDown: function(currObj) {
        layoutHandler.setURLHashParams({
            node: 'Storage Nodes:' + currObj['name'],
            tab: 'details'
        }, {
            p: 'mon_infra_storage'
        });
    },
    onDiskDrillDown: function(currObj) {
        layoutHandler.setURLHashParams({
            node: currObj['hostname'],
            tab: 'details:' + currObj['name']
        }, {
            p: 'mon_storage_disks'
        });
    },
    storageNodeTooltipFn: function(currObj) {
        var tooltipContents = [{
            lbl: 'Disks',
            value: currObj['osds'].length
        }];
        return getStorageNodeTooltipContents(currObj).concat(tooltipContents);
    },
    diskTooltipFn: function(currObj) {
        var tooltipContents = [{
            lbl: 'Status',
            value: currObj['status'] + '&' + currObj['cluster_status']
        }];
        return getStorageNodeTooltipContents(currObj).concat(tooltipContents);
    },
    getTooltipContents: function(e) {
        //Get the count of overlapping bubbles
        var series = e['series'];
        var processDetails = e['point']['processDetails'];
        var tooltipContents = [{
            lbl: 'Host Name',
            value: e['point']['name']
        }, {
            lbl: 'Total Space',
            value: e['point']['total']
        }, {
            lbl: 'Available',
            value: $.isNumeric(e['point']['available_perc']) ? e['point']['available_perc'] + '%' : e['point']['available_perc']
        }];
        if (e['point']['type'] == 'storageNode') {
            tooltipContents.push({
                lbl: 'Disks',
                value: e['point']['osds'].length
            });
            $.each(e['point']['alerts'], function(idx, obj) {
                if (obj['tooltipAlert'] != false)
                    tooltipContents.push({
                        lbl: ifNull(obj['tooltipLbl'], 'Events'),
                        value: obj['msg']
                    });
            });
        } else if (e['point']['type'] == 'disk') {
            tooltipContents.push({
                lbl: 'Status',
                value: e['point']['status'] + '&' + e['point']['cluster_status']
            });
            $.each(e['point']['alerts'], function(idx, obj) {
                if (obj['tooltipAlert'] != false)
                    tooltipContents.push({
                        lbl: ifNull(obj['tooltipLbl'], 'Events'),
                        value: obj['msg']
                    });
            });
        }
        return tooltipContents;
    }
};