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
                alertsList.push($.extend({}, {
                    ip: osd['public_addr'],
                    sevLevel: sevLevels['ERROR'],
                    msg: (storageInfraAlertMsgs['DISK_DOWN_LIST']).format(osd['name']),
                    timeStamp: new Date(osd['osd_xinfo']['down_stamp']).getTime() * 1000
                }, infoObj));
            }
            if (osd['cluster_status'] == 'out') {
                if (!obj['isDiskOut']) {
                    obj['disk_out_list'] = []
                    obj['isDiskOut'] = true
                }
                obj['disk_out_list'].push(' ' + osd['name'])
            }
        });

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
    },
    processStorageHealthAlerts: function(obj) {
        var alertsList = [];
        var timeStamp = new Date(obj['last_updated_time']).getTime() * 1000;
        var defInfoObj = {
            name: 'Storage Cluster',
            type: 'Storage',
            ip: '',
            timeStamp: timeStamp
        };

        $.each(obj['health']['details'], function(idx, msg) {
            var msgArr = msg.split(" ");
            if (msgArr.slice(0,1)[0].indexOf("mon") > -1) {
                alertsList.push({
                    name: msgArr[0].split(".")[1],
                    type: 'Storage Monitor',
                    ip: msgArr[2],
                    sevLevel: sevLevels['WARNING'],
                    msg: msgArr.slice(3).join(" "),
                    timeStamp: timeStamp
                });
            } else {
                alertsList.push($.extend({}, {
                    sevLevel: sevLevels['INFO'],
                    msg: msg
                }, defInfoObj));
            }
        });

        $.each(obj['health']['summary'], function(idx, msg) {
            alertsList.push($.extend({}, {
                sevLevel: sevLevels[infraMonitorStorageUtils.getHealthSevLevelLbl(msg['severity'])],
                msg: msg['summary']
            }, defInfoObj));
        });

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
            obj['tot_avg_bw'] = 0;
            obj['tot_avg_read_kb'] = 0;
            obj['tot_avg_write_kb'] = 0;
            $.each(host.osds, function(idx, osd) {
                if (osd.hasOwnProperty('kb') && osd.hasOwnProperty('kb_used')) {
                    obj['osds_total'] += osd['kb'] * 1024;
                    obj['osds_used'] += osd['kb_used'] * 1024;
                }
                if (!cowu.isEmptyObject(osd['avg_bw'])){
                    if($.isNumeric(osd['avg_bw']['reads_kbytes']) && $.isNumeric(osd['avg_bw']['writes_kbytes'])){
                        obj['tot_avg_bw'] += osd['avg_bw']['reads_kbytes'] + osd['avg_bw']['writes_kbytes'];
                        obj['tot_avg_read_kb'] += osd['avg_bw']['reads_kbytes'];
                        obj['tot_avg_write_kb'] += osd['avg_bw']['writes_kbytes'];
                    } else {
                        osd['avg_bw']['read'] = 'N/A';
                        osd['avg_bw']['write'] = 'N/A';
                    }
                }
            });
            obj['osds_available_perc'] = calcPercent((obj['osds_total'] - obj['osds_used']), obj['osds_total']);
            obj['x'] = parseFloat((100 - obj['osds_available_perc']).toFixed(2));
            //obj['y'] = parseFloat(byteToGB(obj['osds_total']));
            obj['y'] = parseFloat(obj['tot_avg_bw'].toFixed(2)) * 1024;
            obj['osds_available'] = formatBytes(obj['osds_total'] - obj['osds_used']);
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
            /*
            * build_info response holds version string or could be empty array.
             */
            if (host['build_info'].length > 0) {
                var versionArr = host['build_info'].split(" ");
                obj['version'] = "Ceph " + versionArr[2];
            } else {
                obj['version'] = "Ceph N/A";
            }
            if (obj['color'] == d3Colors['red']) {
                obj['downNodeCnt']++;
            }
            retArr.push(obj);
        });

        /*
        * Cluster health is getting passed from storage nodes summary API.
        * separate object entry is created with name CLUSTER_HEALTH so it can be filtered out
        * for charts and other cases that only require storage node details.
         */
        var clusterObj = {};
        clusterObj['name'] = 'CLUSTER_HEALTH';
        clusterObj['nodeAlerts'] = infraMonitorStorageAlertUtils.processStorageHealthAlerts(result['cluster_status']);
        clusterObj['alerts'] = clusterObj['nodeAlerts'].sort(dashboardUtils.sortInfraAlerts);
        clusterObj['processAlerts'] = [];
        /*
        * total monitor count to display on the infobox.
        * this includes monitor only and storage + monitor nodes.
         */
        clusterObj['monitor_count'] = result['cluster_status']['monitor_count'];
        clusterObj['monitor_active'] = result['cluster_status']['monitor_active'];
        //adding clusterObj to the top of the returned array
        retArr.unshift(clusterObj);

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
    },
    getHealthSevLevelLbl: function(obj) {
        if(obj == 'HEALTH_OK' || obj == 'OK' || obj == 'up')
            return 'INFO';
        else if (obj == 'HEALTH_WARN' || obj == 'warn')
            return 'WARNING';
        else if(obj == 'HEALTH_ERR' || obj == 'HEALTH_CRIT' || obj == 'down')
            return 'ERROR';
        else
            return 'NOTICE';
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
function getAllStorageNodes(defferedObj, dataSource, dsObj) {
  var obj = {};
    if(!dsObj['clean']){
        obj['transportCfg'] = {
            url: monitorInfraStorageUrls['STORAGENODES_SUMMARY'],
            type: 'GET'
        }
    defferedObj.done(function(){
            manageDataSource.refreshDataSource('storageNodeDS');
        });
    } else {
        obj['transportCfg'] = {
                url: monitorInfraStorageUrls['STORAGENODES_SUMMARY'] + '?forceRefresh',
                type:'GET',
                //set the default timeout as 5 mins
                timeout:300000
        }
    }
    getOutputByPagination(dataSource,
                        {transportCfg:obj['transportCfg'],
                        parseFn:infraMonitorStorageUtils.parseStorageNodesDashboardData,
                        loadedDeferredObj:defferedObj});
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
    else if (obj == "warn")
        return "<span> " + statusTmpl({
            sevLevel: sevLevels['WARNING'],
            sevLevels: sevLevels
        }) + " warn</span>";
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
    var title, key, chartId, tooltipFn, clickFn;
    var nodeData = dsData;
    var data = [];
    if (nodeData != null) {
        data = updateCharts.setUpdateParams($.extend(true, [], nodeData));
    }
    if (nodeType == 'storageNodes') {
        title = 'Storage Nodes';
        key = 'storageNodes';
        chartId = 'storageNodes-bubble';
        tooltipFn = storageChartUtils.storageNodeTooltipFn;
        clickFn = storageChartUtils.onStorageNodeDrillDown;
    }
    var chartsData = {
        title: title,
        chartOptions: {
            xLbl: 'Used (%)',
            xLblFormat: d3.format('.02f'),
            yLbl: 'Avg 30 Min BW (Read + Write)',
            yDataType: 'bytes',
            xPositive: true,
            tooltipFn: tooltipFn,
            clickFn: clickFn,
            addDomainBuffer: true
        },
        d: [{
            key: key,
            values: data
        }]
    };
    var chartObj = {};
    if (!storageChartsInitializationStatus[key]) {
        $('#' + chartId).initScatterChart(chartsData);
        storageChartsInitializationStatus[key] = true;
    } else {
        chartsData['selector'] = $('#content-container').find('#' + chartId + ' > svg').first()[0];
        var chart = $(chartsData['selector']).parent('div').data('chart');
        var result = formatByteAxis(chartsData['d']);
        chartsData['data'] = result['data'];
        chart.yAxis.axisLabel(chartsData['chartOptions']['yLbl']+" "+result['yLbl']);
        d3.select(chartObj['selector']).datum(chartsData['data']);
        if(chart != null)
            chart.update();
    }
}

function formatLblValueTooltip(infoObj) {
    var tooltipTemplateSel = 'title-lblval-tooltip-template';
    if (infoObj[0]['lbl'] == "Storage Node")
        return formatHostLblValueTooltip(infoObj);
    if (infoObj[0]['lbl'] == "Storage Disk")
        return formatDiskLblValueTooltip(infoObj);
    var tooltipTemplate = contrail.getTemplate4Id(tooltipTemplateSel);
    return tooltipTemplate(infoObj);
}

function formatHostLblValueTooltip(infoObj) {
    var tooltipTemplateSel = 'host-lblval-tooltip-template';
    var tooltipTemplate = contrail.getTemplate4Id(tooltipTemplateSel);
    return tooltipTemplate(infoObj);
}

function formatDiskLblValueTooltip(infoObj) {
    var tooltipTemplateSel = 'disk-lblval-tooltip-template';
    var tooltipTemplate = contrail.getTemplate4Id(tooltipTemplateSel);
    return tooltipTemplate(infoObj);
}



function getStorageNodeTooltipContents(currObj) {
    var tooltipContents = [{
        lbl: 'Storage Node',
        value: currObj['name']
    }, {
        lbl: 'Total Space',
        value: currObj['osds_total']
    }, {
        lbl: 'Available',
        value: currObj['osds_available'] + ' [ ' + currObj['osds_available_perc'] + '%' + ' ]'
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
        }, {
            lbl: 'Avg 30Min BW',
            value: formatBytes(currObj['tot_avg_bw'] * 1024) +
                ' [ Read ' + formatBytes(currObj['tot_avg_read_kb'] * 1024) + ', Write ' +
                formatBytes(currObj['tot_avg_write_kb'] * 1024) + ']'
        }];
        return getStorageNodeTooltipContents(currObj).concat(tooltipContents);
    },
    diskTooltipFn: function(currObj) {
        var tooltipContents = [{
            lbl: 'Storage Disk',
            value: currObj['name']
        }, {
            lbl: 'Total Space',
            value: currObj['total']
        }, {
            lbl: 'Available',
            value: formatBytes((currObj['kb'] - currObj['kb_used']) * 1024) +
                ' [ ' + currObj['available_perc'] + '%' + ' ]'
        }, {
            lbl: 'Avg 30Min BW',
            value: currObj['tot_avg_bw'] + ' [ Read ' +
            currObj['avg_bw']['read'] + ', Write ' + currObj['avg_bw']['write'] + ' ]'
        }, {
            lbl: 'Status',
            value: currObj['status'] + '&' + currObj['cluster_status']
        }];
        return tooltipContents;
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

String.prototype.newFormat = function() {
    var args = arguments;
    var retStr = this.toString();
    var formatHolders = this.toString().match(/{[a-zA-Z0-9<>/:; ]*}/g);
    for(var argIdx=0; argIdx < args.length ; argIdx++) {
        if(formatHolders[argIdx] == null)
            continue;
        var currHolder = formatHolders[argIdx].replace(/[{}\d:]+/g,'');
        var currValue = args[argIdx];
        var strVariants = currHolder.split(';');
        if((currHolder.length > 0) && (strVariants.length > 0)) {
            if(args[argIdx] > 1)
                currValue += ' ' + strVariants[1];
            else
                currValue += ' ' + strVariants[0];
        }
        retStr = retStr.replace(formatHolders[argIdx],currValue);
    }
    return retStr;
};