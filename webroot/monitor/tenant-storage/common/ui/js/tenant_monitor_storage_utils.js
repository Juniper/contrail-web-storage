function decideColor(origClass, color) {
    if (color == 'red' || color == "#d62728") {
        return 'cell-hyperlink-text-error';
    } else {
        return 'cell-hyperlink';
    }
}

function cephIpDisplay(ip) {
    //TODO just get the IP not port
    return '<span title="' + ip + '">' + ip + '</span>';
}

function byteToGB(bytes) {
    var gb = (bytes / 1073741824).toFixed(2);
    return gb;
}

function kiloByteToGB(kbytes) {
    var gb = (kbytes / 1048576).toFixed(2);
    return gb;
}

function calcPercent(val1, val2) {
    return ((val1 / val2) * 100).toFixed(2);
}

function getLabelClass(status) {
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

function getIconClass(status) {
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

function getIconColorClass(status) {
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

function getOSDColor(d, obj) {
    if (d['status'] == 'up') {
        if (d['cluster_status'] == 'in')
            return d3Colors['green'];
        else if (d['cluster_status'] == 'out')
            return d3Colors['orange']
        else
            return d3Colors['blue']
    } else if (d['status'] == 'down')
        return d3Colors['red']
    else {}
}

var tenantStorageChartUtils = {
    onDiskDrillDown: function(currObj) {
        layoutHandler.setURLHashParams({
            node: currObj['host'],
            tab: 'details:' + currObj['name']
        }, {
            p: 'mon_storage_disks'
        });
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
        if (e['point']['type'] == 'disk') {
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
    },
    thrptActivityTooltipFn: function(key, currObj) {
        var tooltipContents = [{
            lbl: 'Name',
            value: 'Throughput'
        }, {
            lbl: key,
            value: formatBytes(currObj['origY'])
        }, {
            lbl: 'Date',
            value: d3.time.format('%c')(new Date(currObj['x'] / 1000))
        }];
        return tooltipContents;
    },
    iopsActivityTooltipFn: function(key, currObj) {
        var tooltipContents = [{
            lbl: 'Name',
            value: 'IOPS'
        }, {
            lbl: key,
            value: currObj['y']
        }, {
            lbl: 'Date',
            value: d3.time.format('%c')(new Date(currObj['x'] / 1000))
        }];
        return tooltipContents;
    },
    latencyActivityTooltipFn: function(key, currObj) {
        var tooltipContents = [{
            lbl: 'Name',
            value: 'Latency'
        }, {
            lbl: key,
            value: (currObj['y']).toFixed(2) + ' ms'
        }, {
            lbl: 'Date',
            value: d3.time.format('%c')(new Date(currObj['x'] / 1000))
        }];
        return tooltipContents;
    },
    tickFormatFloatFn: function(d){
        return d3.format(',.2f')(d);
    },
    tickFormatIntFn: function(d){
        return d3.format(',0.0f')(d);
    }
}

function updateTenantStorageCharts(data, nodeType) {
    var chartsData = ifNull(data, {});
    var nodeData = data['d'];
    var d = [];
    var chartOptions = ifNull(data['chartOptions'], {});
    if (nodeData != null) {
        d = updateCharts.setUpdateParams($.extend(true, [], nodeData));
    }
    if (nodeType == 'disks') {
        chartsData['title'] = ifNull(data['title'], 'Disks');
        chartsData['key'] = ifNull(data['key'], 'disks');
        chartsData['chartId'] = ifNull(data['chartId'], 'osds-bubble');
        chartOptions['tooltipFn'] = ifNull(data['chartOptions']['tooltipFn'], tenantStorageChartUtils.diskTooltipFn);
        chartOptions['clickFn'] = ifNull(data['chartOptions']['clickFn'], tenantStorageChartUtils.onDiskDrillDown);
        chartOptions['xPositive'] = ifNull(data['chartOptions']['xPositive'], true);
        chartOptions['addDomainBuffer'] = ifNull(data['chartOptions']['addDomainBuffer'], true);
        chartsData['d'] = d;
        chartsData['link'] = ifNull(data['link'], {});
        chartsData['link']['hashParams'] = {
            p: 'mon_storage_disks',
            q: {
                node: 'Disks'
            }
        };
        chartsData['type'] = 'storageBubbleChart';
    }
    chartsData['chartOptions'] = chartOptions;
    chartsData['widgetBoxId'] = 'recent';
    var chartObj = {};
    if (!tenantStorageChartsInitializationStatus[chartsData['key']]) {
        $('#' + chartsData['chartId']).initScatterChart(chartsData);
        tenantStorageChartsInitializationStatus[chartsData['key']] = true;
    } else {
        chartObj['selector'] = $('#content-container').find('#' + chartsData['chartId'] + ' > svg').first()[0];
        chartObj['data'] = chartsData['d'];
        chartObj['type'] = chartsData['type'];
        updateStorageCharts.updateView(chartObj);
    }
}

var tenantStorageGridUtils = {
    onDisksRowSelChange: function(currObj) {
        layoutHandler.setURLHashParams({
            node: currObj['host'],
            tab: 'details:' + currObj['name']
        }, {
            p: 'mon_storage_disks'
        });
    },
}

function addTab(selector, newTabAnchor, newTabTitle, defaultContent) {
    var tabs = $("#" + selector).tabs();
    var ul = tabs.find("ul");
    $("<li><a href='#" + newTabAnchor + "'>" + newTabTitle + "</a></li>").appendTo(ul);
    $("<div id='" + newTabAnchor + "'><p>" + defaultContent + "</p></div>").appendTo(tabs);
    tabs.tabs("refresh");
}

function getMonitorNodeHealthStatusTmpl(obj) {
    var statusTmpl = contrail.getTemplate4Id('storage-status-template');
    if (obj == "HEALTH_OK")
        return "<span> " + statusTmpl({
            sevLevel: sevLevels['INFO'],
            sevLevels: sevLevels
        }) + " ok</span>";
    else if (obj == "HEALTH_WARN")
        return "<span> " + statusTmpl({
            sevLevel: sevLevels['WARNING'],
            sevLevels: sevLevels
        }) + " warn</span>";
    else if (obj == "HEALTH_CRIT")
        return "<span> " + statusTmpl({
            sevLevel: sevLevels['ERROR'],
            sevLevels: sevLevels
        }) + " critical</span>";
    else
        return "<span> " + statusTmpl({
            sevLevel: sevLevels['NOTICE'],
            sevLevels: sevLevels
        }) + " N/A</span>";
}

function getDiskStatusTmpl(obj) {
    var statusTmpl = contrail.getTemplate4Id('storage-status-template');
    if (obj == "in")
        return "<span> " + statusTmpl({
            sevLevel: sevLevels['INFO'],
            sevLevels: sevLevels
        }) + " in</span>";
    else if (obj == "out")
        return "<span> " + statusTmpl({
            sevLevel: sevLevels['WARNING'],
            sevLevels: sevLevels
        }) + " out</span>";
    else if (obj == "down")
        return "<span> " + statusTmpl({
            sevLevel: sevLevels['ERROR'],
            sevLevels: sevLevels
        }) + " down</span>";
    else if (obj == "up")
        return "<span> " + statusTmpl({
            sevLevel: sevLevels['NOTICE'],
            sevLevels: sevLevels
        }) + " up</span>";
    else
        return "<span> N/A</span>";
}

function getHostStatusTmpl(obj) {
    var statusTmpl = contrail.getTemplate4Id('storage-status-template');
    if (obj == "active")
        return "<span> " + statusTmpl({
            sevLevel: sevLevels['INFO'],
            sevLevels: sevLevels
        }) + " active</span>";
    else if (obj == "warn")
        return "<span> " + statusTmpl({
            sevLevel: sevLevels['WARNING'],
            sevLevels: sevLevels
        }) + " warn</span>";
    else if (obj == "critical")
        return "<span> " + statusTmpl({
            sevLevel: sevLevels['ERROR'],
            sevLevels: sevLevels
        }) + " critical</span>";
    else
        return "<span> N/A</span>";
}


function formatTreeLblValueTooltip(infoObj) {
    var tooltipTemplateSel = 'tree-lblval-tooltip-template';
    var tooltipTemplate = contrail.getTemplate4Id(tooltipTemplateSel);
    return tooltipTemplate(infoObj);
}

function isStorageChartInitialized(selector) {
    if ($(selector + ' > svg').length > 0)
        return true;
    else
        return false;
}

/**
 * TooltipFn for storage line chart
 */
function lineChartTooltipFn(key, x, y, e, chart, tooltipFormatFn) {
    var tooltipContents = [];
    if (typeof(tooltipFormatFn) == 'function') {
        tooltipContents = tooltipFormatFn(key, e['point']);
    }
    //Format the alerts to display in tooltip
    $.each(ifNull(e['point']['alerts'], []), function(idx, obj) {
        if (obj['tooltipAlert'] != false)
            tooltipContents.push({
                lbl: ifNull(obj['tooltipLbl'], 'Events'),
                value: obj['msg']
            });
    });
    return formatLblValueTooltip(tooltipContents);
}

var updateStorageCharts = {
    updateView: function(obj) {
        if (obj['type'] == 'storageActivityLineChart') {
            if (obj['selector'] != null && $(obj['selector']).parent('div') != null) {
                var chart = $(obj['selector']).parent('div').data('chart');
                d3.select(obj['selector']).datum(obj['data']);
                if (chart != null)
                    chart.update();
            }
        }
    },
    refreshView: function(selector) {
        if (selector != null){
            selector = $('#content-container').find(selector + ' > svg').first()[0];
            $(selector).parent('div').data('chart').update();
        }
    },
    updateLineCharts: function(data, chartId) {
        var chartObj = {},
            selector;
        if (chartId == 'thrptChart') {
            var formattedData = formatByteAxis(data);
            var chartsData = {
                title: 'Disk Throughput',
                d: formattedData['data'],
                chartOptions: {
                    tooltipFn: tenantStorageChartUtils.thrptActivityTooltipFn,
                    tickFormatFn: tenantStorageChartUtils.tickFormatFloatFn,
                    yLbl: formattedData['yLbl']
                }
            };
            selector = '#diskActivityThrptChart';

        } else if (chartId == 'iopsChart') {
            var chartsData = {
                title: 'Disk IOPS',
                d: data,
                chartOptions: {
                    tooltipFn: tenantStorageChartUtils.iopsActivityTooltipFn,
                    tickFormatFn: tenantStorageChartUtils.tickFormatIntFn
                }
            };
            selector = '#diskActivityIopsChart'

        } else if (chartId == 'latencyChart') {
            var chartsData = {
                title: 'Disk Latency',
                d: data,
                chartOptions: {
                    tooltipFn: tenantStorageChartUtils.latencyActivityTooltipFn,
                    tickFormatFn: tenantStorageChartUtils.tickFormatFloatFn
                }
            };
            selector = '#diskActivityLatencyChart'

        } else if (chartId == 'clusterThrptChart') {
            var formattedData = formatByteAxis(data);
            var chartsData = {
                title: 'Disk Throughput',
                d: formattedData['data'],
                chartOptions: {
                    tooltipFn: tenantStorageChartUtils.thrptActivityTooltipFn,
                    tickFormatFn: tenantStorageChartUtils.tickFormatFloatFn,
                    yLbl: formattedData['yLbl']
                }
            };
            selector = '#clusterActivityThrptChart'

        } else if (chartId == 'clusterIopsChart') {
            var chartsData = {
                title: 'Disk IOPS',
                d: data,
                chartOptions: {
                    tooltipFn: tenantStorageChartUtils.iopsActivityTooltipFn,
                    tickFormatFn: tenantStorageChartUtils.tickFormatIntFn
                }
            };
            selector = '#clusterActivityIopsChart'

        } else if (chartId == 'clusterLatencyChart') {
            var chartsData = {
                title: 'Disk Latency',
                d: data,
                chartOptions: {
                    tooltipFn: tenantStorageChartUtils.latencyActivityTooltipFn,
                    tickFormatFn: tenantStorageChartUtils.tickFormatFloatFn
                }
            };
            selector = '#clusterActivityLatencyChart'

        } else {

        }

        if (!isStorageChartInitialized(selector)) {
            $(selector).storageActivityLineChart(chartsData);
            tenantStorageChartsInitializationStatus[chartId] = true;
        } else {
            chartObj['selector'] = $('#content-container').find(selector + ' > svg').first()[0];
            chartObj['data'] = data;
            chartObj['type'] = 'storageActivityLineChart';
            updateStorageCharts.updateView(chartObj);
        }
    }
};

(function($) {
    $.extend($.fn, {
        storageActivityLineChart: function(data) {
            var selector = $(this),
                chartOptions = ifNull(data['chartOptions'], {});

            nv.addGraph(function() {
                chart = nv.models.lineChart()
                    .margin({
                        top: 20,
                        right: 30,
                        bottom: 20,
                        left: 50
                    })
                    .interpolate("monotone")
                    .showLegend(true)
                    .showYAxis(true)
                    .showXAxis(true);


                chart.xAxis.axisLabel(ifNull(chartOptions['xLbl'],''))
                    .tickFormat(function(d) {
                        return d3.time.format('%H:%M:%S')(new Date(d / 1000));
                     });

                chart.yAxis.axisLabel(ifNull(chartOptions['yLbl'],''))
                    .tickFormat(ifNull(chartOptions['tickFormatFn'], tenantStorageChartUtils.tickFormatIntFn));
                chart.lines.forceY([0]);

                if (chartOptions['tooltipFn'] == null) {
                    chartOptions['tooltipFn'] = function(key, x, y, e, graph) {
                        return '<h3> ' + key + ' </h3>' +
                            '<p>' + e.point.y + ' ms</p>';
                    };
                }

                var tooltipFn = chartOptions['tooltipFn'];
                chartOptions['tooltipFn'] = function(key, x, y, e, graph) {
                    return lineChartTooltipFn(key, x, y, e, graph, tooltipFn)
                }
                chart.tooltipContent(chartOptions['tooltipFn']);

                $(selector).data('chart', chart);
                $(selector).append('<svg></svg>');

                d = ifNull(data['d'], []);

                if (!($(selector).is(':visible'))) {
                    $(selector).find('svg').bind("refresh", function() {
                        d3.select($(selector)[0]).select('svg').datum(d).call(chart);
                    });
                } else {
                    d3.select($(selector)[0]).select('svg').datum(d).call(chart);
                }

                nv.utils.windowResize(function() {
                    updateChartOnResize(selector, chart);
                });

                return chart
            });
        }
    })
})(jQuery);