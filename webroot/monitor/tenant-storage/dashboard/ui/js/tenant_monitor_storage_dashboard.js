/*
 * Copyright (c) 2013 Juniper Networks, Inc. All rights reserved.
 */

function tenantStorageDashboardClass() {
    var self = this,
        currPage,
        dfUsageObj = {},
        clusterUsageObj = {},
        healthStatusObj = {},
        actStatusObj = {},
        monStatusObj = {},
        poolsBarGbData, poolsBarObjData,
        disksStatusData, disksClusterStatusData,
        clusterThrptData, clusterIopsData, clusterLatencyData;

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

    this.destroy = function() {
        var cGrid = $('.contrail-grid').data('contrailGrid');
        if (cGrid != null)
            cGrid.destroy();
        if (this.timerId) {
            clearInterval(this.timerId);
        }
    }
    this.setCurrPage = function(page) {
        currPage = page;
    }
    this.getCurrPage = function() {
        return currPage;
    }
    this.getClusterHealthData = function() {
        return healthStatusObj;
    }
    this.setClusterHealthData = function(data) {
        healthStatusObj = data;
        //healthStatusRefresh();
    }
    this.getClusterMonitorData = function() {
        return healthStatusObj;
    }
    this.setClusterMonitorData = function(data) {
        healthStatusObj = data;
        monitorStatusRefresh();
    }
    this.getClusterActivityData = function() {
        return actStatusObj;
    }
    this.setClusterThrptData = function(data) {
        clusterThrptData = data;
        updateStorageCharts.updateLineCharts(data, 'clusterThrptChart');
    }
    this.getClusterThrptData = function() {
        return clusterThrptData;
    }
    this.setClusterIopsData = function(data) {
        clusterIopsData = data;
        updateStorageCharts.updateLineCharts(data, 'clusterIopsChart');
    }
    this.getClusterIopsData = function() {
        return clusterIopsData;
    }
    this.setClusterLatencyData = function(data) {
        clusterLatencyData = data;
        updateStorageCharts.updateLineCharts(data, 'clusterLatencyChart');
    }
    this.getClusterLatencyData = function() {
        return clusterLatencyData;
    }
    this.getClusterMonitorData = function() {
        return monStatusObj;
    }
    this.setClusterMonitorData = function(data) {
        monStatusObj = data;
        monitorStatusRefresh();
    }
    this.getDFUsageData = function() {
        return dfUsageObj;
    }
    this.setDFUsageData = function(data) {
        dfUsageObj = data;
        this.clusterUsageDial.refresh();
    }
    this.getClusterUsageData = function() {
        return clusterUsageObj;
    }
    this.setClusterUsageData = function(data) {
        clusterUsageObj = data;
        this.clusterUsageDial.refresh();
    }
    this.setPoolsBarGbData = function(data) {
        poolsBarGbData = data;
        this.clusterPoolsGbChart.refresh(data);
    }
    this.getPoolsBarGbData = function() {
        return poolsBarGbData;
    }
    this.setPoolsBarObjData = function(data) {
        poolsBarObjData = data;
        this.clusterPoolsObjChart.refresh(data);
    }
    this.getPoolsBarObjData = function() {
        return poolsBarObjData;
    }
    this.setDisksStatusData = function(data) {
        disksStatusData = data;
        this.diskStatusChart.refresh(data);
    }
    this.getDisksStatusData = function() {
        return disksStatusData;
    }
    this.setDisksClusterStatusData = function(data) {
        disksClusterStatusData = data;
        this.diskClusterStatusChart.refresh(data);
    }
    this.getDisksClusterStatusData = function() {
        return disksClusterStatusData;
    }
    this.updateClusterDashboard = function() {
        $('#dashHealthBox .widget-header').initWidgetHeader({
            title: 'Monitor Health',
            widgetBoxId: 'dashHealth'
        });
        $('#dashUsageBox .widget-header').initWidgetHeader({
            title: 'Usage',
            widgetBoxId: 'dashUsage'
        });
        $('#dashPoolsBox .widget-header').initWidgetHeader({
            title: 'Pools',
            widgetBoxId: 'dashPools'
        });
        $('#dashDisksBox .widget-header').initWidgetHeader({
            title: 'Disks',
            widgetBoxId: 'dashDisks'
        });
        $('#dashActivityBox .widget-header').initWidgetHeader({
            title: 'Activity',
            widgetBoxId: 'dashActivity'
        });

        this.clusterUsageDial.init();
        this.clusterUsageDial.draw();

        //Cluster Pools Charts
        this.clusterPoolsGbChart.init('#poolsBarGbChart');
        this.clusterPoolsGbChart.draw();
        //this.clusterPoolsObjChart.init('#poolsBarObjChart');
        //this.clusterPoolsObjChart.draw();
        //end of Cluster Pools charts

        //Disks Bar Charts
        this.diskStatusChart.init('#diskStatusChart');
        this.diskStatusChart.draw();
        this.diskClusterStatusChart.init('#diskClusterChart');
        this.diskClusterStatusChart.draw();
        //End of Disks Bar charts

        //cluster activity charts
        $('#clusterActivityThrptLabel').text('Throughput');
        $('#clusterActivityIopsLabel').text('IOPs');
        $('#clusterActivityLatencyLabel').text('Latency');
        //End of Cluster Activity Charts

        statusDataRefresh();

    }
    this.updateMonitorDashboard = function(ds) {
        if (tenantStorageDashboardView.tabsLoaded['monitor'] == 0) {
            tenantStorageDashboardView.tabsLoaded['monitor'] = 1;

            $('#dashMonitorHealthBox .widget-header').initWidgetHeader({
                title: 'Health',
                widgetBoxId: 'dashMonHealth'
            });

            endWidgetLoading('dashMonHealth');
        } else {

        }
    }
    this.loadViewFromNode = function(hashObj) {
        if (hashObj['node'].indexOf('Monitor:') == 0) {
            oneMntrView.load({
                name: hashObj['node'].split(':')[1],
                ip: hashObj['ip'],
                tab: hashObj['tab']
            });
        } else if (hashObj['node'].indexOf('Disks:') == 0) {
            oneOSDView.load({
                name: hashObj['node'].split(':')[1],
                ip: hashObj['ip'],
                uuid: hashObj['uuid'],
                tab: hashObj['tab'],
                filters: hashObj['filters']
            });
        } else if (hashObj['node'].indexOf('Placement Groups:') == 0) {
            onePgView.load({
                name: hashObj['node'].split(':')[1],
                ip: hashObj['ip'],
                uuid: hashObj['uuid'],
                tab: hashObj['tab']
            });
        } else {
            this.setCurrPage(hashObj['node']);
            if (hashObj['node'] == 'Monitor') {
                storInfraMonView.load();
            } else if (hashObj['node'] == 'Disks')
                storInfraOSDsView.load();
            else if (hashObj['node'] == 'Placement Groups')
                storInfraPgView.load();
            else
                tenantStorageDashboardView.load();
        }
    }

    this.load = function() {
        self.updateViewByHash(layoutHandler.getURLHashParams());
    }

    this.updateViewByHash = function(obj) {
        var hashParams = ifNullOrEmptyObject(obj, {
            node: 'Dashboard'
        });

        if (hashParams['node'] != 'Dashboard') {
            var infraDashTemplate = Handlebars.compile($("#tenant-page-template").html());
            $(contentContainer).html('');
            $(contentContainer).html(infraDashTemplate);
            tenantStorageDashboardView.loadViewFromNode(hashParams);

        } else { //Load Dashboard
            var infraDashboardTemplate = Handlebars.compile($('#storage-dashboard').html());
            $(contentContainer).html('');
            $(contentContainer).html(infraDashboardTemplate);
            self.setCurrPage('Dashboard');
            tenantStorageDashboardView.updateClusterDashboard(hashParams);
        }
    }

    if (this.timerId) {
        clearInterval(this.timerId);
    } else {
        this.timerId = setInterval(function() {
            statusDataRefresh();
        }, refreshTimeout);
    }

}

var tenantStorageDashboardView = new tenantStorageDashboardClass();

function parseClusterHealthData(result) {
    var retObj = {};
    if (result != null) {
        var status = result['cluster_status']['overall_status'];
        if (status == 'HEALTH_WARN')
            retObj['health-status'] = 'WARN';
        else if (status == 'HEALTH_OK')
            retObj['health-status'] = 'OK';
        else
            retObj['health-status'] = status;
    }
    tenantStorageDashboardView.setClusterHealthData(retObj);
}

function parseClusterMonitorData(result) {
    var retObj = {};
    if (result != null) {
        var status = result['overall_status'];
        if (status == 'HEALTH_WARN') {
            retObj['monitor-status'] = 'WARN';
        } else if (status == 'HEALTH_OK')
            retObj['monitor-status'] = 'OK';
        else
            retObj['monitor-status'] = status;
    }
    tenantStorageDashboardView.setClusterMonitorData(retObj);
}

function parseClusterUsageData(data) {
    var retObj = {};
    if (data != null) {
        var osd_summary = data['usage_summary']['osd_summary'];

        osd_summary['near_full_ratio'] = (osd_summary['near_full_ratio'] * 100).toFixed(2);
        osd_summary['full_ratio'] = (osd_summary['full_ratio'] * 100).toFixed(2);

        retObj['usage_data'] = {
            kb_used: osd_summary['kb_used'],
            kb_avail: osd_summary['kb_avail'],
            kb_total: osd_summary['kb'],
            total_used: formatBytes(osd_summary['kb_used'] * 1024),
            total_avail: formatBytes(osd_summary['kb_avail'] * 1024),
            total_space: formatBytes(osd_summary['kb'] * 1024),
            used_perc: ((osd_summary['kb_used'] / osd_summary['kb']) * 100).toFixed(2)
        }
        retObj['usage_perc_data'] = [{
            name: "Used",
            value: Math.ceil(retObj['usage_data']['used_perc']),
            tooltip_data: [{
                lbl: "Used",
                value: retObj['usage_data']['total_used']
            }, {
                lbl: "Percentage",
                value: retObj['usage_data']['used_perc'] + "%"
            }]
        }, {
            name: "Available",
            value: 100 - Math.ceil(retObj['usage_data']['used_perc']),
            tooltip_data: [{
                lbl: "Available",
                value: retObj['usage_data']['total_avail']
            }, {
                lbl: "Percentage",
                value: (100 - retObj['usage_data']['used_perc']) + "%"
            }]
        }];

        retObj['status_data'] = [{
            name: "Normal Ratio",
            status: "Normal",
            value: parseInt(osd_summary['near_full_ratio']),
            tooltip_data: [{
                lbl: "Range",
                value: '0 - ' + osd_summary['near_full_ratio'] + ' %'
            }]
        }, {
            name: "Near Full Ratio",
            status: "Warning",
            value: parseInt(osd_summary['full_ratio'] - osd_summary['near_full_ratio']),
            tooltip_data: [{
                lbl: "Range",
                value: osd_summary['near_full_ratio'] + ' - ' + osd_summary['full_ratio'] + ' %'
            }]
        }, {
            name: "Full Ratio",
            status: "Critical",
            value: parseInt(100 - osd_summary['full_ratio']),
            tooltip_data: [{
                lbl: "Range",
                value: osd_summary['full_ratio'] + ' - 100 %'
            }]
        }];

        if (retObj['usage_data']['used_perc'] < osd_summary['near_full_ratio']) {
            retObj['status_flag'] = "Normal";
        } else if (retObj['usage_data']['used_perc'] > osd_summary['near_full_ratio'] &&
            retObj['usage_data']['used_perc'] < osd_summary['full_ratio']) {
            retObj['status_flag'] = "Warning";
        } else {
            retObj['status_flag'] = "Critical";
        }
    }
    tenantStorageDashboardView.setClusterUsageData(retObj);
}

function parseCephClusterDFData(result) {
    var retObj = {};
    if (result != null) {
        retObj['total_used'] = result['total_used'];
        retObj['total_avail'] = result['total_avail'];
        retObj['total_space'] = result['total_space'];
        retObj['used_perc'] = ((retObj['total_used'] / retObj['total_space']) * 100).toFixed(2);
    }
    tenantStorageDashboardView.setDFUsageData(retObj);
}

function parseCephPoolsData(result) {
    var gbUsedKeys = [];
    var objectsKeys = [];

    if (result != null) {
        $.each(result, function(idx, item) {
            var key1 = {},
                key2 = {},
                obj1 = {},
                obj2 = {},
                values1 = [],
                values2 = [];
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
    tenantStorageDashboardView.setPoolsBarGbData(gbUsedKeys);
    //tenantStorageDashboardView.setPoolsBarObjData(objectsKeys);
}

function parseOSDsStatusData(result) {
    var statusSeries = [],
        clusterSeries = [];
    if (result != null) {
        var osdmap = result['osd_stat']['output'];
        $.each(osdmap, function(idx, val) {
            var obj1 = {},
                key1 = {};
            if (idx == 'num_up_osds') {
                var val1 = []
                obj1['label'] = 'Status';
                obj1['value'] = parseInt(val);
                val1.push(obj1);
                key1['key'] = 'UP';
                key1['values'] = val1;
                key1['color'] = '#6baed6';
                statusSeries.push(key1);
            } else if (idx == 'num_down_osds') {
                var val1 = [];
                obj1['label'] = 'Status';
                obj1['value'] = -Math.abs(parseInt(val));
                val1.push(obj1);
                key1['key'] = 'DOWN';
                key1['values'] = val1;
                key1['color'] = '#D62728';
                statusSeries.push(key1);
            } else if (idx == 'num_in_osds') {
                var val1 = [];
                obj1['label'] = 'Membership';
                obj1['value'] = parseInt(val);
                val1.push(obj1);
                key1['key'] = 'IN';
                key1['values'] = val1;
                key1['color'] = '#6baed6';
                clusterSeries.push(key1);
            } else if (idx == 'num_out_osds') {
                var val1 = [];
                obj1['label'] = 'Membership';
                obj1['value'] = -Math.abs(parseInt(val));
                val1.push(obj1);
                key1['key'] = 'OUT';
                key1['values'] = val1;
                key1['color'] = '#FF7F0E';
                clusterSeries.push(key1);
            } else if (idx == 'num_osds') {
                //retArr[4]['osds'] = val;
            } else {
                //do nothing;
            }
        });
    }
    tenantStorageDashboardView.setDisksStatusData(statusSeries);
    tenantStorageDashboardView.setDisksClusterStatusData(clusterSeries);
}

function parseCephPGData(result) {
    var fields = ['Total PGs', 'Data GB', 'GB Used', 'GB Available', 'GB Total'];
    var retArr = [];
    $.each(fields, function(idx, val) {
        var obj = {};
        obj['field'] = val;
        obj['value'] = 0;
        retArr.push(obj);
    });
    if (result != null) {
        var pgmap = result['pgmap'];
        $.each(pgmap, function(idx, val) {
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
            else {
                //do nothing;
            }
        });
    }
    //console.log(retArr);
    return retArr;
}

function parseClusterDiskActivity(data) {
    var dataThrptRead = [],
        dataThrptWrite = [];
    var dataIopsRead = [],
        dataIopsWrite = [];
    var dataLatRead = [],
        dataLatWrite = [];

    if (data != null && data.hasOwnProperty('flow-series')) {
        $.each(data['flow-series'], function(idx, sample) {
            //Throughput Data
            dataThrptRead.push({
                'x': sample['MessageTS'],
                'y': sample['reads_kbytes'] * 1024
            });
            dataThrptWrite.push({
                'x': sample['MessageTS'],
                'y': sample['writes_kbytes'] * 1024
            });

            //IOPS Data
            dataIopsRead.push({
                'x': sample['MessageTS'],
                'y': sample['reads']
            });
            dataIopsWrite.push({
                'x': sample['MessageTS'],
                'y': sample['writes']
            });

            //Latency Data
            dataLatRead.push({
                'x': sample['MessageTS'],
                'y': sample['op_r_latency']
            });
            dataLatWrite.push({
                'x': sample['MessageTS'],
                'y': sample['op_w_latency']
            });
        });
    }

    var retThrptData = [{
        values: dataThrptRead,
        key: 'Read',
        color: 'steelblue'
    }, {
        values: dataThrptWrite,
        key: 'Write',
        color: '#2ca02c'
    }];

    var retIopsData = [{
        values: dataIopsRead,
        key: 'Read',
        color: 'steelblue'
    }, {
        values: dataIopsWrite,
        key: 'Write',
        color: '#2ca02c'
    }];

    var retLatData = [{
        values: dataLatRead,
        key: 'Read',
        color: 'steelblue'
    }, {
        values: dataLatWrite,
        key: 'Write',
        color: '#2ca02c'
    }];

    return [retThrptData, retIopsData, retLatData];
}

function getClusterHealthStatus() {
    startWidgetLoading('dashHealth');
    $.ajax({
        url: '/api/tenant/storage/cluster/status',
        dataType: "json",
        cache: false

    }).done(function(response) {
        parseClusterHealthData(response);
    }).fail(function(result) {

    }).always(function() {
        endWidgetLoading('dashHealth');
    });
}

function getClusterMonitorStatus() {
    startWidgetLoading('dashHealth');
    $.ajax({
        url: '/api/tenant/storage/cluster/monitors/summary',
        dataType: "json",
        cache: false

    }).done(function(response) {
        parseClusterMonitorData(response);
    }).fail(function(result) {

    }).always(function() {
        endWidgetLoading('dashHealth');
    });

}

function getClusterDFStatus() {
    startWidgetLoading('dashUsage');
    $.ajax({
        url: '/api/tenant/storage/cluster/df/status',
        dataType: "json",
        cache: false

    }).done(function(response) {
        parseCephClusterDFData(response['utilization_stats']['output']['stats']);
    }).fail(function(result) {

    }).always(function() {
        endWidgetLoading('dashUsage');
    });

}

function getClusterUsage() {
    startWidgetLoading('dashUsage');
    $.ajax({
        url: contrail.format(tenantMonitorStorageUrls['CLUSTER_USAGE']),
        dataType: "json",
        cache: false
    }).done(function(response) {
        parseClusterUsageData(response);
    }).fail(function(result) {

    }).always(function() {
        endWidgetLoading('dashUsage');
    });
}

function getClusterPools() {
    startWidgetLoading('dashPools')
    $.ajax({
        url: '/api/tenant/storage/cluster/pools/summary',
        dataType: "json",
        cache: false

    }).done(function(response) {
        parseCephPoolsData(response['pools']);

    }).fail(function(result) {
        //flash error message;
    }).always(function() {
        endWidgetLoading('dashPools');
    });

}

function getOSDsStatus() {
    startWidgetLoading('dashDisks');
    $.ajax({
        url: '/api/tenant/storage/cluster/osd/status',
        dataType: "json",
        cache: false

    }).done(function(response) {
        parseOSDsStatusData(response);
    }).fail(function(result) {
        //flash error message;
    }).always(function() {
        endWidgetLoading('dashDisks');
    });
}

function getClusterDiskActivity(obj) {
    startWidgetLoading('dashActivity');
    $.ajax({
        url: tenantMonitorStorageUrls['CLUSTER_DISK_ACTIVITY_NOW']
    }).done(function(response) {
        parsedResp = parseClusterDiskActivity(response);
        tenantStorageDashboardView.setClusterThrptData(parsedResp[0]);
        tenantStorageDashboardView.setClusterIopsData(parsedResp[1]);
        tenantStorageDashboardView.setClusterLatencyData(parsedResp[2]);
    }).always(function() {
        endWidgetLoading('dashActivity');
    });
}

function healthStatusRefresh() {
    var healthStatusObj = tenantStorageDashboardView.getClusterHealthData();
    $("#health-status").text(healthStatusObj['health-status']);
    $("#health-status-icon").addClass(getIconClass(healthStatusObj['health-status']));
    $("#health-status-icon").addClass(getIconColorClass(healthStatusObj['health-status']));
}

function activityStatusRefresh() {
    var actStatusObj = tenantStorageDashboardView.getClusterActivityData();
    $("#activity-status").text(actStatusObj['activity-status']);
    $("#activity-status-icon").addClass(getIconClass(actStatusObj['activity-status']));
    $("#activity-status-icon").addClass(getIconColorClass(actStatusObj['activity-status']));
}

function monitorStatusRefresh() {
    var monStatusObj = tenantStorageDashboardView.getClusterMonitorData();
    var options = {};
    $("#monitor-status").text(monStatusObj['monitor-status']);
    $("#monitor-status").parent().on("click", function() {
        layoutHandler.setURLHashObj({
            p: 'mon_storage_monitor'
        });
    });
    $("#monitor-status-icon").addClass(getIconClass(monStatusObj['monitor-status']));
    $("#monitor-status-icon").addClass(getIconColorClass(monStatusObj['monitor-status']));
}

function usageDial() {
    var self = this;

    this.init = function() {

        this.statusData = [{
            name: "Normal",
            value: 75
        }, {
            name: "Warning",
            value: 15
        }, {
            name: "Critical",
            value: 10
        }];

        dfUsageObj = {
            'total_used': 0,
            'total_avail': 0,
            'total_space': 0,
            'used_perc': 0.00
        };

        this.usageData = [{
            name: "used",
            value: 0
        }, {
            name: "available",
            value: 100
        }];

        this.usageTooltip = nv.tooltip;
        this.statusTooltip = nv.tooltip;

        this.statusColorBright = d3.scale.ordinal()
            .range(["#2CA02C", "#FF7F0E", "#D62728"]);
        this.usageColor = d3.scale.ordinal()
            .range(["#1F77B4", "#C6DBEF", "#ADD6FB", "#6BAED6", "#D6EBFD", "#5DAEF8"]);

        var margin = {
            top: 20,
            right: 20,
            bottom: 20,
            left: 30
        };
        width = 200 - margin.left - margin.right;
        height = width - margin.top - margin.bottom;

        this.usageDialChart = d3.select("#usage-dial")
            .append('svg')
            .append("g")
            .attr("transform", "translate(" + ((width / 2)) + "," + ((height / 2) + margin.top) + ")");

        var radius = Math.min(width, height) / 2;

        this.statusArc = d3.svg.arc()
            .outerRadius(radius)
            .innerRadius(radius - 5);

        this.usageArc = d3.svg.arc()
            .outerRadius(radius - 7)
            .innerRadius(radius - 20);

        this.pie = d3.layout.pie()
            .sort(null)
            .startAngle(2 * Math.PI)
            .endAngle(4 * Math.PI)
            .value(function(d) {
                return d.value;
            });
    }

    this.draw = function() {

        usageColor = this.usageColor;
        statusColorBright = this.statusColorBright;
        usageData = this.usageData;
        usageArc = this.usageArc;
        statusTooltip = this.statusTooltip;
        usageTooltip = this.usageTooltip;

        this.statusPathGroup = this.usageDialChart.selectAll(".status-arc")
            .data(this.pie(this.statusData))
            .enter().append("g")
            .attr("class", "status-arc")
            .append("path")
            .style("fill", function(d) {
                return statusColorBright(d.data.name);
            })
            .style("opacity", function(d) {
                return 0.5;
            })
            .attr("d", this.statusArc)
            .each(function(d) {
                this._current = d;
            }).on("mouseover", function(d) {
                var pos = [d3.event.pageX, d3.event.pageY];
                var content = formatSmallLblValueTooltip(tenantStorageChartUtils.statusDialTooltipFn(d));
                statusTooltip.show([pos[0], pos[1]], content, null, null, null);
            }).on("mouseout", function(d) {
                statusTooltip.cleanup();
            });

        usageArcEnter = this.usageDialChart.selectAll(".usage-arc")
            .data(this.pie(this.usageData))
            .enter().append("g")
            .attr("class", "usage-arc");

        this.usagePathGroup = usageArcEnter.append("path")
            .style("fill", function(d) {
                return usageColor(d.data.name);
            })
            .attr("d", usageArc)
            .each(function(d) {
                this._current = d;
            }).on("mouseover", function(d) {
                var pos = [d3.event.pageX, d3.event.pageY];
                var content = formatSmallLblValueTooltip(tenantStorageChartUtils.usageDialTooltipFn(d));
                usageTooltip.show([pos[0], pos[1]], content, null, null, null);
            }).on("mouseout", function(d) {
                usageTooltip.cleanup();
            });
    }

    this.refresh = function(data) {
        var clusterUsageObj = ifNull(data, tenantStorageDashboardView.getClusterUsageData());
        var usageData = clusterUsageObj['usage_perc_data'];
        var statusData = clusterUsageObj['status_data'];
        var statusFlag = clusterUsageObj['status_flag'];
        statusColorBright = this.statusColorBright;
        statusArc = this.statusArc;
        usageArc = this.usageArc;

        $("#df-used-perc").text(clusterUsageObj['usage_data']['used_perc'] + "%");
        $("#df-used").text(clusterUsageObj['usage_data']['total_used']);
        $("#df-total").text(clusterUsageObj['usage_data']['total_space']);

        this.usagePathGroup = this.usagePathGroup.data(this.pie(usageData));
        this.usagePathGroup.transition().duration(750).attrTween("d", usageArcTween);

        if (statusFlag == "Warning") {
            $("#df-used-perc").removeClass("usage-perc-label");
            $("#df-used-perc").addClass("usage-perc-warn-label");
        } else if (statusFlag == "Critical") {
            $("#df-used-perc").removeClass("usage-perc-label");
            $("#df-used-perc").addClass("usage-perc-crit-label");
        }
        this.statusPathGroup = this.statusPathGroup.data(this.pie(statusData));
        this.statusPathGroup.transition().duration(750)
            .attrTween("d", statusArcTween)
            .style("fill", function(d) {
                return statusColorBright(d.data.status);
            })
            .style("stroke", function(d) {
                if (d.data.status == statusFlag)
                    return statusColorBright(d.data.status);
            })
            .style("stroke-width", function(d) {
                if (d.data.status == statusFlag)
                    return 1.5;
            })
            .style("opacity", function(d) {
                if (d.data.status == statusFlag)
                    return 1;
                else
                    return 0.5;
            });

        function usageArcTween(a) {
            var i = d3.interpolate(this._current, a);
            this._current = i(0);
            return function(t) {
                return usageArc(i(t));
            };
        }

        function statusArcTween(a) {
            var i = d3.interpolate(this._current, a);
            this._current = i(0);
            return function(t) {
                return statusArc(i(t));
            };
        }
    }
}

function poolsBarChart() {
    var chart;

    this.init = function(chartId) {

        this.d3ChartElem = d3.select(chartId).append('svg');

        var barColor = d3.scale.ordinal()
            .range(['#9e9ac8', '#6baed6', '#8ca252', '#7f7f7f', '#bd9e39']);

        var chart = nv.models.multiBarHorizontalChart()
            .x(function(d) {
                return d.label
            })
            .y(function(d) {
                return d.value
            })
            .margin({
                top: 30,
                right: 20,
                bottom: 10,
                left: 12
            })
            .showLegend(true)
            .showValues(false)
            .stacked(true)
            .showControls(false)
            .tooltips(true)
            .color(function(d) {
                return barColor(d.key)
            });


        if (chartId == '#poolsBarObjChart')
            chart.yAxis.tickFormat(d3.format('.0f'));

        if (chartId == '#poolsBarGbChart')
            chart.yAxis.tickFormat(d3.format(',.2f'));

        chart.xAxis
            .tickPadding(12);

        chart.multibar.dispatch.on('elementMouseover.tooltip', function(e) {
            e.pos = [d3.event.pageX, d3.event.pageY];
            var content = formatSmallLblValueTooltip(tenantStorageChartUtils.poolsBarTooltipFn(e));
            nv.tooltip.show([e.pos[0], e.pos[1]], content, null, null, null);
        });

        this.chart = chart;

    }
    this.draw = function() {
        nv.addGraph(function() {
            return this.chart
        });
    }
    this.refresh = function(data) {

        this.d3ChartElem
            .datum(data)
            .transition().duration(500)
            .call(this.chart);

        //nv.utils.windowResize(this.chart.update);
    }
}

function disksBarChart() {
    var chart;
    this.init = function(chartId) {
        var chart = nv.models.multiBarHorizontalChart()
            .x(function(d) {
                return d.label
            })
            .y(function(d) {
                return d.value
            })
            .margin({
                top: 30,
                right: 20,
                bottom: 10,
                left: 5
            })
            .showValues(false)
            .tooltips(true)
            .stacked(true)
            .showControls(false);

        chart.yAxis
            .tickFormat(d3.format('.0f'));

        chart.multibar.dispatch.on('elementMouseover.tooltip', function(e) {
            e.pos = [d3.event.pageX, d3.event.pageY];
            var content = formatSmallLblValueTooltip(tenantStorageChartUtils.disksBarTooltipFn(e));
            nv.tooltip.show([e.pos[0], e.pos[1]], content, null, null, null);
        });

        this.chart = chart;

        this.d3ChartElem = d3.select(chartId).append('svg');

    }
    this.draw = function() {
        nv.addGraph(function() {
            return this.chart
        });
    }
    this.refresh = function(data) {
        this.d3ChartElem
            .datum(data)
            .transition().duration(500)
            .call(this.chart);

        //d3.select(".nv-legendWrap")
        //    .attr("transform", "translate(-100,100)");

        //nv.utils.windowResize(this.chart.update);
    }
}

function statusDataRefresh() {

    getClusterHealthStatus();
    getClusterMonitorStatus();
    //getClusterDFStatus();
    getClusterUsage();
    getClusterPools();
    getOSDsStatus();
    getClusterDiskActivity();

}