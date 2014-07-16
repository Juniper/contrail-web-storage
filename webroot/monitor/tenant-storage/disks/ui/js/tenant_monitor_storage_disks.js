/*
 * Copyright (c) 2013 Juniper Networks, Inc. All rights reserved.
 */


cephOSDsView = function() {

    var self = this;
    var errorMsg;
    osdsBubble = new osdScatterPlot();
    this.osdsBubble = osdsBubble;
    osdsTree = new osdTree();
    this.osdsTree = osdsTree;
    var currOSD = null;
    var osdsDV = new ContrailDataView();

    singleOSDDS = new ContrailDataView();

    this.currTab = null;

    this.destroy = function() {
        var cGrid = $('.contrail-grid').data('contrailGrid');
        if (cGrid != null)
            cGrid.destroy();
        if (this.timerId)
            clearInterval(this.timerId);
        if (this.diskTimerId)
            clearInterval(this.diskTimerId);
        if (this.currTab)
            this.currTab = null;
    }

    this.setOSDsBubbleData = function(data) {
        this.osdsBubbleData = data;
        updateDisksChart(this.osdsBubbleData);
        //this.osdsBubble.refresh(this.osdsBubbleData);
    }

    this.setOSDsTreeData = function(data) {
        this.osdsTreeData = data;
        this.osdsTree.update(this.osdsTreeData, true);
        /*
         if(!treeRoot) {
         treeRoot = true;
         this.osdsTree.update(this.osdsTreeData, treeRoot);
         }
         else{
         this.osdsTree.update(this.osdsTreeData, true);
         }*/
    }

    this.setOSDsDetailsData = function(data) {
        osdsDV.setData(data);
        /*if( currOSD == null)
         showOSDDetails();
         */
    }

    this.getOSDsDetailsData = function() {
        return osdsDV.getItems();
    }

    this.setSingleOSDData = function(data) {
        singleOSDDS.data(data);
    }

    this.setCurrOSD = function(data) {
        currOSD = data;
        showOSDDetails(currOSD);
    }

    this.getCurrOSD = function() {
        return currOSD;
    }

    this.setErrorMessage = function(msg) {
        errorMsg = msg;
        $('#scatter-log-message').text(errorMsg);
    }

    function populateOSDs() {

        $("#gridOSDs").contrailGrid({

            header: {
                title: {
                    text: 'Disks',
                    cssClass: 'blue',
                    icon: 'icon-list',
                    iconCssClass: 'blue'
                }
            },
            columnHeader: {
                columns: [{
                    field: "id",
                    name: "ID",
                    width: 20
                }, {
                    field: "status",
                    name: "Status",
                    formatter: function(r, c, v, cd, dc) {
                        return dc['status_tmpl'];
                    },
                    minWidth: 30
                }, {
                    field: "cluster_status",
                    name: "Membership",
                    formatter: function(r, c, v, cd, dc) {
                        return dc['cluster_status_tmpl'];
                    },
                    cssClass: 'grid-status-label',
                    minWidth: 40
                }, {
                    field: "name",
                    name: "Disk name",
                    events: {
                        onClick: function(e, dc) {
                            tenantStorageGridUtils.onDisksRowSelChange(dc);
                        }
                    },
                    cssClass: 'cell-hyperlink-blue',
                    minWidth: 30
                }, {
                    field: "host",
                    name: "Hostname",
                    minWidth: 150
                }, {
                    field: "total",
                    name: "Total",
                    minWidth: 100
                }, {
                    field: "used",
                    name: "Used",
                    minWidth: 100
                }, {
                    field: "available_perc",
                    name: "Available %",
                    minWidth: 100
                }]
            },
            body: {
                options: {
                    autoHeight: true,
                    checkboxSelectable: false,
                    enableAsyncPostRender: true,
                    forceFitColumns: true,
                    detail: {
                        template: '',
                        onInit: function(e, dc) {
                            var noDataStr = "N/A";
                            setTimeout(function() {
                                var detailsInfo = [{
                                    lbl: 'UUID',
                                    value: dc['uuid']
                                }, {
                                    lbl: 'Hostname',
                                    value: dc['host']
                                }, {
                                    lbl: 'State',
                                    value: dc['state']
                                }, {
                                    lbl: 'Apply Latency',
                                    value: (function() {
                                        try {
                                            var perf = ifNullOrEmpty(dc['fs_perf_stat']['apply_latency_ms'], noDataStr);
                                            if (perf != noDataStr) {
                                                return perf + ' ms';
                                            }
                                            return noDataStr;
                                        } catch (e) {
                                            return noDataStr;
                                        }
                                    })
                                }, {
                                    lbl: 'Commit Latency',
                                    value: (function() {
                                        try {
                                            var perf = ifNullOrEmpty(dc['fs_perf_stat']['commit_latency_ms'], noDataStr);
                                            if (perf != noDataStr) {
                                                return perf + ' ms';
                                            }
                                            return noDataStr;
                                        } catch (e) {
                                            return noDataStr;
                                        }
                                    })
                                }];
                                var moreLink = '#p=mon_storage_disks&q[node]=' + dc['host'] + '&q[tab]=details:' + dc['name'];
                                var detailsTmpl = contrail.getTemplate4Id('disk-grid-details-template');
                                $(e.detailRow).html(detailsTmpl({
                                    d: detailsInfo,
                                    detailLink: moreLink
                                }));
                                $("#gridOSDs").data('contrailGrid').adjustDetailRowHeight(dc.id);
                            }, 1000);
                        },
                        onExpand: function(e, dc) {

                        },
                        onCollapse: function(e, dc) {

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
                        pageSizeSelect: [5, 10, 50]
                    }
                }
            }
        });

        getOSDs();
        tenantStorageChartsInitializationStatus['disks'] = true;
    }

    this.load = function(obj) {
        var disksTemplate = Handlebars.compile($("#storage-disks-template").html());
        $(pageContainer).html(disksTemplate({}));

        $('#osdsTabStrip').contrailTabs({
            activate: onTabActivate
        });

        /**
         * init host tree svg
         */
        tenantStorageDisksView.osdsTree.init();

        self.updateViewByHash(layoutHandler.getURLHashParams());
    };

    this.updateViewByHash = function(obj) {
        var hashParams = ifNullOrEmptyObject(obj, {
            tab: ''
        });

        if (hashParams['tab'].indexOf('details:') == 0) {
            /**
             * show details of a single disk
             */
            populateDiskDetailsTab(hashParams);

        } else {
            /**
             * show all OSDs
             */
            populateOSDs();
        }
    }

    function onTabActivate(e, ui) {
        selTab = ui.newTab.context.innerText;
        tenantStorageDisksView.currTab = selTab;
        if (selTab == "Scatter Plot") {
            if (tenantStorageChartsInitializationStatus['disks']) {
                updateDisksChart(tenantStorageDisksView.osdsBubbleData);
                $("#gridOSDs").data("contrailGrid").refreshView()
            } else {
                populateOSDs();
            }
        } else if (selTab == 'Host Tree') {
            if (tenantStorageChartsInitializationStatus['host_tree']) {
                if (tenantStorageDisksView.osdsTreeData == null)
                    getOSDsTree();
                else
                    tenantStorageDisksView.osdsTree.update(tenantStorageDisksView.osdsTreeData, true);
            } else {
                if (tenantStorageDisksView.osdsTree.svgTree == '')
                    tenantStorageDisksView.osdsTree.init();
                getOSDsTree();
            }
        } else if (selTab == 'Details') {
            if(tenantStorageChartsInitializationStatus['thrptChart'])
                updateStorageCharts.refreshView('#diskActivityThrptChart');
            if(tenantStorageChartsInitializationStatus['iopsChart'])
                updateStorageCharts.refreshView('#diskActivityIopsChart');
        }
    }

    if (this.timerId) {
        clearInterval(this.timerId);
    } else {
        this.timerId = setInterval(function() {
            OSDsDataRefresh();
        }, refreshTimeout);
    }
}

tenantStorageDisksView = new cephOSDsView();

function updateDisksChart(data) {
    var chartsData = {
        title: 'Disks',
        xLbl: 'Available (%)',
        yLbl: 'Total Storage (GB)',
        chartOptions: {
            xPositive: true,
            tooltipFn: tenantStorageChartUtils.diskTooltipFn,
            clickFn: tenantStorageChartUtils.onDiskDrillDown,
            addDomainBuffer: true,
        },
        d: data
    };
    var yvals = [];
    $.each(data, function(idx, grp) {
        $.each(grp.values, function(i, osd) {
            yvals.push(parseFloat(osd.y));
        });
    });
    var yscale = d3.extent(yvals);

    yscale[0] = yscale[0] - 150;
    yscale[1] = yscale[1] + 150;

    var xvals = [];
    $.each(data, function(idx, grp) {
        $.each(grp.values, function(i, osd) {
            xvals.push(parseFloat(osd.x));
        });
    });
    var xscale = d3.extent(xvals);
    //xscale[0] = parseFloat((xscale[0] - 5).toFixed(2));
    //xscale[1] = (xscale[1] >= 95.5) ? 100.00 : parseFloat((xscale[1] + 0.5).toFixed(2));
    if(xscale[1] >= 95){
        xscale[1] = 100.00;
        xscale[0] = parseFloat((xscale[0] - 5).toFixed(2));
    }
    chartsData['forceX'] = xscale;
    chartsData['forceY'] = yscale;

    if (!isScatterChartInitialized('#osds-bubble')) {
        $('#osds-bubble').initScatterChart(chartsData);
        tenantStorageChartsInitializationStatus['disks'] = true;
    } else {
        updateTenantStorageCharts(chartsData, 'disks');
    }
}

function parseOSDsDataSingleSeries(data) {
    var retArr = [],
        osdErrArr = [];
    var osdArr = [],
        osdUpInArr = [],
        osdDownArr = [],
        osdUpOutArr = [];
    var skip_osd_bubble = new Boolean();
    var statusTemplate = contrail.getTemplate4Id("disk-status-template");

    if (data != null) {
        var osds = data.osds;
        $.each(osds, function(idx, osd) {
            skip_osd_bubble = false;

            if (osd.kb) {
                osd.available_perc = calcPercent(osd.kb_avail, osd.kb);
                osd.x = parseFloat(osd.available_perc);
                osd.gb = kiloByteToGB(osd.kb);
                osd.total = formatBytes(osd.kb * 1024);
                osd.y = parseFloat(osd.gb);
                osd.gb_avail = kiloByteToGB(osd.kb_avail);
                osd.gb_used = kiloByteToGB(osd.kb_used);
                osd.color = getOSDColor(osd);
                osd.shape = 'circle';
                osd.size = 1;
            } else {
                skip_osd_bubble = true;
                osd.gb = 'Not Available';
                osd.gb_used = 'Not Available';
                osd.gb_avail = 'Not Available';
                osd.available_perc = 'Not Available';
            }

            /**
             * osd status template UP?DOWN
             */
            osd.status_tmpl = "<span> " + statusTemplate({
                sevLevel: sevLevels['NOTICE'],
                sevLevels: sevLevels
            }) + " up</span>";
            if (osd.status == 'down')
                osd.status_tmpl = "<span> " + statusTemplate({
                    sevLevel: sevLevels['ERROR'],
                    sevLevels: sevLevels
                }) + " down</span>";
            /**
             * osd cluster membership template IN?OUT
             */
            osd.cluster_status_tmpl = "<span> " + statusTemplate({
                sevLevel: sevLevels['INFO'],
                sevLevels: sevLevels
            }) + " in</span>";
            if (osd.cluster_status == 'out')
                osd.cluster_status_tmpl = "<span> " + statusTemplate({
                    sevLevel: sevLevels['WARNING'],
                    sevLevels: sevLevels
                }) + " out</span>";

            // Add to OSD scatter chart data of flag is not set
            if (!skip_osd_bubble) {
                retArr.push(osd)
            } else {
                osdErrArr.push(osd.name);
            }

            // All OSDs data should be pushed here for List grid
            osdArr.push(osd);
        });
    }
    tenantStorageDisksView.setOSDsDetailsData(osdArr);
    tenantStorageDisksView.setOSDsBubbleData(retArr);
}

function parseOSDsData(data) {
    var retArr = [],
        osdErrArr = [];
    var osdArr = [],
        osdUpInArr = [],
        osdDownArr = [],
        osdUpOutArr = [];
    var skip_osd_bubble = new Boolean();
    var statusTemplate = contrail.getTemplate4Id("disk-status-template");

    if (data != null) {
        var osds = data.osds;
        $.each(osds, function(idx, osd) {
            skip_osd_bubble = false;

            if (osd.kb) {
                osd.available_perc = calcPercent(osd.kb_avail, osd.kb);
                osd.x = parseFloat(osd.available_perc);
                osd.gb = kiloByteToGB(osd.kb);
                osd.y = parseFloat(osd.gb);
                osd.total = formatBytes(osd.kb * 1024);
                osd.used = formatBytes(osd.kb_used * 1024);
                osd.gb_avail = kiloByteToGB(osd.kb_avail);
                osd.gb_used = kiloByteToGB(osd.kb_used);
                osd.color = getOSDColor(osd);
                osd.shape = 'circle';
                osd.size = 1;
            } else {
                skip_osd_bubble = true;
                osd.gb = 'N/A';
                osd.total = 'N/A';
                osd.used = 'N/A';
                osd.gb_used = 'N/A';
                osd.gb_avail = 'N/A';
                osd.available_perc = 'N/A';
            }
            /**
             * osd status template UP?DOWN
             */
            osd.status_tmpl = "<span> " + statusTemplate({
                sevLevel: sevLevels['NOTICE'],
                sevLevels: sevLevels
            }) + " up</span>";
            if (osd.status == 'down')
                osd.status_tmpl = "<span> " + statusTemplate({
                    sevLevel: sevLevels['ERROR'],
                    sevLevels: sevLevels
                }) + " down</span>";
            /**
             * osd cluster membership template IN?OUT
             */
            osd.cluster_status_tmpl = "<span> " + statusTemplate({
                sevLevel: sevLevels['INFO'],
                sevLevels: sevLevels
            }) + " in</span>";
            if (osd.cluster_status == 'out')
                osd.cluster_status_tmpl = "<span> " + statusTemplate({
                    sevLevel: sevLevels['WARNING'],
                    sevLevels: sevLevels
                }) + " out</span>";

            // Add to OSD scatter chart data of flag is not set
            if (!skip_osd_bubble) {
                if (osd.status == "up") {
                    if (osd.cluster_status == "in") {
                        osdUpInArr.push(osd);
                    } else if (osd.cluster_status == "out") {
                        osdUpOutArr.push(osd);
                    } else {}
                } else if (osd.status == "down") {
                    osdDownArr.push(osd);
                } else {}
            } else {
                osdErrArr.push(osd.name);
            }
            // All OSDs data should be pushed here for List grid
            osdArr.push(osd);
        });

        upInGroup = {}, upOutGroup = {}, downGroup = {};
        //UP & IN OSDs
        upInGroup.key = "UP & IN ";
        upInGroup.values = osdUpInArr;
        upInGroup.color = color_success;
        retArr.push(upInGroup);
        //UP & OUT OSDs
        upOutGroup.key = "UP & OUT";
        upOutGroup.values = osdUpOutArr;
        upOutGroup.color = color_warn;
        retArr.push(upOutGroup);
        //Down OSDs
        downGroup.key = "Down";
        downGroup.values = osdDownArr;
        downGroup.color = color_imp;
        retArr.push(downGroup);
    }
    tenantStorageDisksView.setOSDsDetailsData(osdArr);
    tenantStorageDisksView.setOSDsBubbleData(retArr);
    if (osdErrArr.length != 0) {
        var msg = ' Following OSDs were not added to Scatter Chart due to insufficient data ';
        $.each(osdErrArr, function(idx, osd) {
            msg = msg + " " + osd + " ";
        });
        tenantStorageDisksView.setErrorMessage(msg);
    } else {
        tenantStorageDisksView.setErrorMessage('None');
    }
}

function getOSDs() {
    $.ajax({
        url: tenantMonitorStorageUrls['DISKS_SUMMARY'],
        dataType: "json",
        cache: false

    }).done(function(response) {
        parseOSDsData(response);

    }).fail(function(result) {

    });

}

function osdScatterPlot() {
    var self = this;
    var chart;

    this.init = function() {
        var chart = nv.models.scatterChart()
            .margin({
                top: 20,
                right: 20,
                bottom: 50,
                left: 80
            })
            .showDistX(true)
            .showDistY(true)
            .showLegend(true)
            .tooltips(true)
            //.transitionDuration(350)
            .size(25).sizeRange([200, 200])
            .shape("circle")
            .x(function(d) {
                return d.available_perc
            })
            .y(function(d) {
                return d.gb
            })
            .tooltipContent(function(key, x, y, e, graph) {
                return '<h3>' + e.point.name + '</h3>' +
                    '<p> Status: ' + e.point.status + '</p>' +
                    '<p> Host: ' + e.point.host + '</p>' +
                    '<p> GB Avail: ' + e.point.gb_avail + '</p>';
            })
            .color(function(d) {
                return d.color
            });

        //Axis settings
        chart.xAxis
            .tickFormat(d3.format('.02f'))
            .axisLabel('Available Percentage');
        //.axisLabelDistance(5);

        chart.yAxis
            .tickFormat(d3.format('.02f'))
            .axisLabel('Total space (GB)')

        chart.scatter.dispatch.on('elementClick', function(e) {
            showOSDDetails(e.point.name);
        });
        //chart.scatter.dispatch.on('elementMouseover', function(){ /*console.log(d3.select(this).attr());*/});

        this.chart = chart;

    }

    this.draw = function() {
        nv.addGraph(function() {
            return this.chart
        });
    }

    this.refresh = function(data) {

        /*var q = d3.geom.quadtree(nodes),
         i = 0,
         n = nodes.length;

         while (++i < n) {
         q.visit(collide(nodes[i]));
         }

         this.chart.selectAll("circle")
         .attr("cx", function(d) { return d.x; })
         .attr("cy", function(d) { return d.y; });
         */

        // retrieves all the data from chart
        //d3.selectAll('g.nv-wrap.nv-scatter').data()

        /* calculating X and Y axis ranges.
         extent of gb and available_perc of all OSDs in all groups
         is taken and padding is added to eliminate circles shown on chart margin
         */

        var yvals = [];
        $.each(data, function(idx, grp) {
            $.each(grp.values, function(i, osd) {
                yvals.push(parseFloat(osd.gb));
            });
        });
        var yscale = d3.extent(yvals);

        yscale[0] = yscale[0] - 150;
        yscale[1] = yscale[1] + 150;

        var xvals = [];
        $.each(data, function(idx, grp) {
            $.each(grp.values, function(i, osd) {
                xvals.push(parseFloat(osd.available_perc));
            });
        });
        var xscale = d3.extent(xvals);
        xscale[0] = xscale[0] - 0.2;
        xscale[1] = (xscale[1] >= 95.5) ? 100.00 : xscale[1] + 0.5;

        this.chart.forceX(xscale)
            .forceY(yscale)

        d3.select('#osd-bubble svg')
            .datum(data)
            .call(this.chart);

        nv.utils.windowResize(this.chart.update);


    }

    function collide(node) {
        var r = node.radius + 16,
            nx1 = node.x - r,
            nx2 = node.x + r,
            ny1 = node.y - r,
            ny2 = node.y + r;
        return function(quad, x1, y1, x2, y2) {
            if (quad.point && (quad.point !== node)) {
                var x = node.x - quad.point.x,
                    y = node.y - quad.point.y,
                    l = Math.sqrt(x * x + y * y),
                    r = node.radius + quad.point.radius;
                if (l < r) {
                    l = (l - r) / l * .5;
                    node.x -= x *= l;
                    node.y -= y *= l;
                    quad.point.x += x;
                    quad.point.y += y;
                }
            }
            return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
        };
    }
}

function populateDiskActivityClass() {

    var self = this;
    this.deferredObj = $.Deferred();
    this.thrptData = this.iopsData = this.latData = null;
    this.diskName = null;

    this.init = function() {

        $('#diskActivityStats .widget-header').initWidgetHeader({
            title: 'Activity Statistics',
            widgetBoxId: 'diskActivity'
        });

        //disk activity charts label
        $('#diskActivityThrptLabel').text('Throughput')
        $('#diskActivityIopsLabel').text('IOPs');
        $('#diskActivityLatencyLabel').text('Latency');
        //End of disk Activity Chart
    }

    this.setThrptData = function(data) {
        self.thrptData = data;
        self.updateLineCharts(data, 'thrptChart')
    }

    this.setIopsData = function(data) {
        self.iopsData = data;
        self.updateLineCharts(data, 'iopsChart');
    }

    this.setLatencyData = function(data) {
        self.latData = data;
        self.updateLineCharts(data, 'latencyChart');
    }

    this.parseDiskStats = function(data) {
        var retThrptData = [], retIopsData = [], retLatData = [];
        var dataThrptRead = [], dataThrptWrite = [];
        var dataIopsRead = [], dataIopsWrite = [];
        var dataLatRead = [], dataLatWrite = [];

        $.each(data['flow-series'], function(idx, sample) {
            var thrptReadObj = {}, thrptWriteObj = {},
                iopsReadObj = {}, iopsWriteObj = {},
                latReadObj = {}, latWriteObj = {};
            thrptReadObj['x'] = thrptWriteObj['x'] = sample['MessageTS'];
            iopsReadObj['x'] = iopsWriteObj['x'] = sample['MessageTS'];
            latReadObj['x'] = latWriteObj['x'] = sample['MessageTS'];

            //Throughput Data
            thrptReadObj['y'] = sample['reads_kbytes'];
            thrptWriteObj['y'] = sample['writes_kbytes'];
            dataThrptRead.push(thrptReadObj);
            dataThrptWrite.push(thrptWriteObj);

            //IOPS Data
            iopsReadObj['y'] = sample['reads'];
            iopsWriteObj['y'] = sample['writes'];
            dataIopsRead.push(iopsReadObj);
            dataIopsWrite.push(iopsWriteObj);

            //Latency Data
            latReadObj['y'] = sample['op_r_latency'];
            latWriteObj['y'] = sample['op_w_latency'];
            dataLatRead.push(latReadObj);
            dataLatWrite.push(latWriteObj);
        });

        retThrptData = [{
            values: dataThrptRead,
            key: 'Read',
            color: 'steelblue'
        }, {
            values: dataThrptWrite,
            key: 'Write',
            color: '#2ca02c'
        }];

        retIopsData = [{
            values: dataIopsRead,
            key: 'Read',
            color: 'steelblue'
        }, {
            values: dataIopsWrite,
            key: 'Write',
            color: '#2ca02c'
        }];

        retLatData = [{
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

    this.startFetchAndUpdateStats = function(obj) {
        self.fetchDiskStats(obj);
        self.diskName = obj['name'];

        if (tenantStorageDisksView.diskTimerId) {
            clearInterval(tenantStorageDisksView.diskTimerId);
        } else {
            tenantStorageDisksView.diskTimerId = setInterval(function() {
                self.fetchDiskStats(obj);
            }, refreshTimeout);
        }
    }

    this.fetchDiskStats = function(obj) {
        startWidgetLoading('diskActivity');
        $.ajax({
            url: contrail.format(tenantMonitorStorageUrls['DISK_ACTIVITY_NOW'], obj['name'], obj['node'])
        }).done(function(response) {
            parsedResp = self.parseDiskStats(response);
            self.setThrptData(parsedResp[0]);
            self.setIopsData(parsedResp[1]);
            self.setLatencyData(parsedResp[2]);
        }).always(function(){
            endWidgetLoading('diskActivity');
        });
    }

    this.updateLineCharts = function(data, chartId) {
        var chartObj = {},
            selector;
        if (chartId == 'thrptChart') {
            var chartsData = {
                title: 'Disk Throughput',
                d: data,
                chartOptions: {
                    tooltipFn: tenantStorageChartUtils.thrptActivityTooltipFn
                }
            };
            selector = '#diskActivityThrptChart';

        } else if (chartId == 'iopsChart') {
            var chartsData = {
                title: 'Disk IOPS',
                d: data,
                chartOptions: {
                    tooltipFn: tenantStorageChartUtils.iopsActivityTooltipFn
                }
            };
            selector = '#diskActivityIopsChart'

        } else if (chartId == 'latencyChart') {
            var chartsData = {
                title: 'Disk Latency',
                d: data,
                chartOptions: {
                    tooltipFn: tenantStorageChartUtils.latencyActivityTooltipFn
                }
            };
            selector = '#diskActivityLatencyChart'

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

}
var diskActivity = new populateDiskActivityClass();

function populateDiskDetailsTab(obj) {
    var deferredObj = $.Deferred();

    if ($("#osdsTabStrip").tabs().find("#diskDetailsTab").length == 0) {
        addTab(disksTabStrip, 'diskDetailsTab', 'Details', 'loading..');
    } else {
        $("#osdsTabStrip").tabs().find("#diskDetailsTab").html("");
    }

    $('#diskDetailsTab').html(contrail.getTemplate4Id('disk-details-template'));

    selectTab(disksTabStrip, disksTabs.indexOf('details'));

    if (obj['tab'] == "" || obj['tab'].split(':')[0] == null) {
        $.ajax({
            url: contrail.format(monitorInfraStorageUrls['STORAGENODE_DETAILS'], obj['node'])
        }).done(function(response) {
            var osds = response.host_details.osds;
            obj['tab'] = 'details:' + osds[0].name;
            deferredObj.resolve();
        });
    } else {
        deferredObj.resolve();
    }

    deferredObj.done(function() {
        var osdName = obj['tab'].split(':')[1];
        var diskDashTemplate = contrail.getTemplate4Id('dashboard-template');
        $('#disk-dashboard').html(diskDashTemplate({
            title: 'Disk',
            colCount: 2,
            showSettings: true,
            widgetBoxId: 'diskDash'
        }));
        startWidgetLoading('diskDash');

        /**
         * since deferedObj is resolved we have the Disk name.
         * now start populating the acitivity charts.
         */
        diskActivity.init();
        diskActivity.startFetchAndUpdateStats({
            name: osdName,
            node: obj['node']
        });

        $.ajax({
            url: contrail.format(monitorInfraStorageUrls['DISK_DETAILS'], osdName)
        }).done(function(response) {
            var diskData = response.osd_details;
            var noDataStr = "N/A",
                diskDashboardInfo;

            diskDashboardInfo = [{
                lbl: 'Name',
                value: diskData['name']
            }, {
                lbl: 'Hostname',
                value: diskData['host']
            }, {
                lbl: 'IP Address',
                value: (function() {
                    try {
                        var ip = ifNullOrEmpty(diskData['public_addr'], noDataStr);
                        return ip.split(':')[0] + ', Port: ' + ip.split(':')[1];
                    } catch (e) {
                        return noDataStr;
                    }
                })()
            }, {
                lbl: 'Status',
                value: (function() {
                    var statusTmpl = contrail.getTemplate4Id('storage-status-template');
                    if (diskData['status'] == "up")
                        return "<span> " + statusTmpl({
                            sevLevel: sevLevels['NOTICE'],
                            sevLevels: sevLevels
                        }) + " up</span>";
                    else if (diskData['status'] == "down")
                        return "<span> " + statusTmpl({
                            sevLevel: sevLevels['ERROR'],
                            sevLevels: sevLevels
                        }) + " down</span>";
                    else
                        return noDataStr;
                })()
            }, {
                lbl: 'Cluster Membership',
                value: (function() {
                    var statusTmpl = contrail.getTemplate4Id('storage-status-template');
                    if (diskData['cluster_status'] == "in")
                        return "<span> " + statusTmpl({
                            sevLevel: sevLevels['INFO'],
                            sevLevels: sevLevels
                        }) + " in</span>";
                    else if (diskData['cluster_status'] == "out")
                        return "<span> " + statusTmpl({
                            sevLevel: sevLevels['WARNING'],
                            sevLevels: sevLevels
                        }) + " out</span>";
                    else
                        return noDataStr;
                })()
            }, {
                lbl: 'Total Space',
                value: (function() {
                    try {
                        if (diskData['kb'])
                            return formatBytes(diskData['kb'] * 1024);
                    } catch (e) {
                        return noDataStr;
                    }
                })()
            }, {
                lbl: 'Used',
                value: (function() {
                    try {
                        if (diskData['kb_used'])
                            return formatBytes(diskData['kb_used'] * 1024);
                    } catch (e) {
                        return noDataStr;
                    }
                })()
            }, {
                lbl: 'Available',
                value: (function() {
                    try {
                        if (diskData['kb_avail'])
                            return formatBytes(diskData['kb_avail'] * 1024) + ' ( ' + parseFloat(((diskData['kb_avail'] / diskData['kb']) * 100).toFixed(2)) + "% )";
                    } catch (e) {
                        return noDataStr;
                    }
                })()
            }, {
                lbl: 'UUID',
                value: diskData['uuid']
            }, {
                lbl: 'Apply Latency',
                value: (function() {
                    try {
                        var perf = ifNullOrEmpty(diskData['fs_perf_stat']['apply_latency_ms'], noDataStr);
                        if (perf != noDataStr) {
                            return perf + ' ms';
                        }
                        return noDataStr;
                    } catch (e) {
                        return noDataStr;
                    }
                })
            }, {
                lbl: 'Commit Latency',
                value: (function() {
                    try {
                        var perf = ifNullOrEmpty(diskData['fs_perf_stat']['commit_latency_ms'], noDataStr);
                        if (perf != noDataStr) {
                            return perf + ' ms';
                        }
                        return noDataStr;
                    } catch (e) {
                        return noDataStr;
                    }
                })
            }];
            var dashboardBodyTemplate = Handlebars.compile($("#dashboard-body-template").html());
            $('#dashboard-box .widget-body').html(dashboardBodyTemplate({
                colCount: 2,
                d: diskDashboardInfo,
                nodeData: diskData,
                showSettings: true
            }));
            endWidgetLoading('diskDash');

        });
    });
}

function showOSDDetails(osd_name) {
    var retArr = [];

    osds = tenantStorageDisksView.getOSDsDetailsData();

    var fields = ['Name', 'Host', 'UUID', 'Public Address', 'Reweight', 'Crush Weight', 'Depth',
        'Total GB', 'Available GB', 'Used GB', 'Apply Latency ms', 'Commit Latency ms', 'Down Stamp', 'Cluster Status', 'Status'
    ];

    $.each(fields, function(idx, val) {
        var obj = {};
        obj['field'] = val;
        obj['value'] = '';
        retArr.push(obj);
    });

    if (osd_name == null) {
        osd_name = 'osd.0';
    }

    if (osds != null) {
        $.each(osds, function(idx, osd) {
            if (osd.name == osd_name) {
                retArr[0]['value'] = osd.name;
                retArr[1]['value'] = osd.host;
                retArr[2]['value'] = osd.uuid;
                retArr[3]['value'] = osd.public_addr;
                retArr[4]['value'] = osd.reweight;
                retArr[5]['value'] = osd.crush_weight;
                retArr[6]['value'] = osd.depth;
                retArr[7]['value'] = osd.gb;
                retArr[8]['value'] = osd.gb_avail;
                retArr[9]['value'] = osd.gb_used;
                retArr[10]['value'] = osd.fs_perf_stat.apply_latency_ms;
                retArr[11]['value'] = osd.fs_perf_stat.commit_latency_ms;
                retArr[12]['value'] = osd.osd_xinfo.down_stamp;
                retArr[13]['value'] = osd.cluster_status;
                retArr[14]['value'] = osd.status;
            }
        });
    }
    $("#osd-details").removeClass("osd-details-default");
    $("#osd-details").addClass("osd-details");
    tenantStorageDisksView.setSingleOSDData(retArr);
    return retArr;
}

function getOSDsTree() {
    $.ajax({
        url: tenantMonitorStorageUrls['DISKS_TREE'],
        dataType: "json",
        cache: false

    }).done(function(response) {
        parseOSDsTreeData(response);

    }).fail(function(result) {

    });

}

function getHostColor(osdColorArr) {
    var host_color = color_info;
    $.each(osdColorArr, function(idx, color) {
        if (color == color_imp) {
            host_color = color_imp;
            return;
        } else if (color == color_warn && host_color != color_warn && host_color != color_imp) {
            host_color = color_warn;
        } else if (color == color_success && host_color != color_warn && host_color != color_imp) {
            host_color = color_success;
        } else {}
    });
    return host_color;
}

function getHostStatus(statusArr) {
    var host_status = 'up';
    $.each(statusArr, function(idx, status) {
        // Following checks for OSD status [in, out, down]
        if (status == 'down') {
            host_status = 'critical';
            return;
        } else if (status == 'out' && host_status != 'critical') {
            host_status = 'warn';
        } else if (status == 'in' && host_status != 'warn' && host_status != 'critical') {
            host_status = 'active';
        }
        // Following checks for Host status itself [critical, warn, active]
        else if (status == 'critical') {
            host_status = 'critical';
        } else if (status == 'warn' && host_status != 'critical') {
            host_status = 'warn';
        } else if (status == 'active' && host_status != 'warn' && host_status != 'critical') {
            host_status = 'active';
        } else {}
    });
    return host_status;
}

function parseOSDsTreeData(data) {
    root = data.osd_tree[0];
    var osdColorArr, osdStatusArr,
        hostColorArr = []
    hostStatusArr = [];

    root.children = root.hosts;

    $.each(root.children, function(idx, host) {
        osdColorArr = [];
        osdStatusArr = [];
        host.children = host.osds;
        $.each(host.children, function(idx, osd) {
            osd.color = getOSDColor(osd);
            osdColorArr.push(osd.color);
            osdStatusArr.push(osd.status);
            osdStatusArr.push(osd.cluster_status);
        });
        host.color = getHostColor(osdColorArr);
        hostColorArr.push(host.color);
        host.status = getHostStatus(osdStatusArr);
        hostStatusArr.push(host.status);
    });

    root.color = getHostColor(hostColorArr);
    root.status = getHostStatus(hostStatusArr);
    tenantStorageDisksView.setOSDsTreeData(root);
}

function osdTree() {
    var self = this;
    this.margin = {
        top: 20,
        right: 120,
        bottom: 20,
        left: 120
    };
    this.lastClickedNode = null;
    this.width = 960 - self.margin.right - self.margin.left;
    this.height = 500 - self.margin.top - self.margin.bottom;
    this.duration = 750;
    this.expandedNodes = [];
    this.root = null;
    this.svgTree = '';

    this.tree = d3.layout.cluster()
        .size([this.height, this.width]);

    this.diagonal = d3.svg.diagonal()
        .projection(function(d) {
            return [d.y, d.x];
        });

    this.infoTooltip = nv.tooltip;

    this.init = function() {
        var tree = tenantStorageDisksView.osdsTree
        d3.select("#osd-tree").html('');
        tenantStorageDisksView.osdsTree.svgTree = d3.select("#osd-tree").append("svg")
            .attr("width", tree.width + tree.margin.right + tree.margin.left)
            .attr("height", tree.height + tree.margin.top + tree.margin.bottom)
            .append("g")
            .attr("transform", "translate(" + tree.margin.left + "," + tree.margin.top + ")");

        // SVGs for Tree chart
        $("#svg-osd-tree-osd").html(svgOsd).contents();
        $("#svg-osd-tree-host").html(svgHost).contents();

        tenantStorageChartsInitializationStatus['host_tree'] = true;
    }

    function collapse(d) {
        if (d.children) {
            d._children = d.children;
            d._children.forEach(collapse);
            d.children = null;
        }
    }

    function selectiveCollapse(d, expansionArr) {
        $.each(d.children, function(idx, host) {
            var found = $.inArray(host.name, expansionArr);
            if (found < 0) {
                if (host.children) {
                    host._children = host.children;
                    host._children.forEach(collapse);
                    host.children = null;
                }
            }
        });
        return d;
    }

    this.update = function(source, root_flag) {
        if (root_flag && source != null) {
            source.x0 = tenantStorageDisksView.osdsTree.height / 2;
            source.y0 = 0;
            var duration = 750;
            diagonal = tenantStorageDisksView.osdsTree.diagonal;

            if (tenantStorageDisksView.osdsTree.expandedNodes.length != 0) {
                var clickedArr = tenantStorageDisksView.osdsTree.expandedNodes.slice(0);
                source = selectiveCollapse(source, clickedArr);
                tenantStorageDisksView.osdsTree.root = source;
            } else {
                source.children.forEach(collapse);
                tenantStorageDisksView.osdsTree.root = source;
            }

        }

        // Compute the new tree layout.
        nodes = tenantStorageDisksView.osdsTree.tree.nodes(tenantStorageDisksView.osdsTree.root).reverse();
        links = tenantStorageDisksView.osdsTree.tree.links(nodes);

        // Normalize for fixed-depth.
        nodes.forEach(function(d) {
            d.y = d.depth * 180;
        });

        // Update the nodes…
        var node = tenantStorageDisksView.osdsTree.svgTree.selectAll("g.node")
            .data(nodes, function(d) {
                return d.id;
            });

        // Enter any new nodes at the parent's previous position.
        var nodeEnter = node.enter().append("g")
            .attr("class", "node")
            .attr("transform", function(d) {
                return "translate(" + source.y0 + "," + source.x0 + ")";
            });

        /*
         nodeEnter.append("circle")
         .attr("r", 1e-6)
         .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });
         */
        nodeEnter.append("use")
            .attr("xlink:href", function(d) {
                if (d.type == 'osd') {
                    if (d.status == 'up')
                        return "#" + d.type + "-" + d.cluster_status;
                    else
                        return "#" + d.type + "-" + d.status;
                } else if (d.type == 'host') {
                    return "#" + d.type + "-" + d.status;
                } else if (d.type == 'root') {
                    return "#host" + "-" + d.status;
                } else {}
            })
            .attr("transform", "translate(0,-10)")
            .style("opacity", 0.9)
            .on("click", nodeClick)
            .on("mouseover", nodeMouseover)
            .on("mouseout", nodeMouseout);

        nodeEnter.append("text")
            .attr("x", function(d) {
                return d.children || d._children ? -24 : 35;
            })
            .attr("dy", ".35em")
            .attr("text-anchor", function(d) {
                return d.children || d._children ? "end" : "start";
            })
            .text(function(d) {
                return d.name;
            })
            .style("fill-opacity", 1e-6);

        // Transition nodes to their new position.
        var nodeUpdate = node.transition()
            .duration(duration)
            .attr("transform", function(d) {
                return "translate(" + d.y + "," + d.x + ")";
            });

        nodeUpdate.select("use")
            .style("fill", function(d) {
                return d._children ? "lightsteelblue" : "#fff";
            });

        nodeUpdate.select("text")
            .style("fill-opacity", 1);

        // Transition exiting nodes to the parent's new position.
        var nodeExit = node.exit().transition()
            .duration(duration)
            .attr("transform", function(d) {
                return "translate(" + source.y + "," + source.x + ")";
            })
            .remove();

        nodeExit.select("use")
            .style("opacity", 0);

        nodeExit.select("text")
            .style("fill-opacity", 1e-6);

        // Update the links…
        var link = this.svgTree.selectAll("path.link")
            .data(links, function(d) {
                return d.target.id;
            });

        // Enter any new links at the parent's previous position.
        link.enter().insert("path", "g")
            .attr("class", "link")
            .style("stroke", function(d) {
                return d.target.color;
            })
            .attr("d", function(d) {
                var o = {
                    x: source.x0,
                    y: source.y0
                };
                return diagonal({
                    source: o,
                    target: o
                });
            });

        // Transition links to their new position.
        link.transition()
            .duration(duration)
            .attr("d", diagonal);

        // Transition exiting nodes to the parent's new position.
        link.exit().transition()
            .duration(duration)
            .attr("d", function(d) {
                var o = {
                    x: source.x,
                    y: source.y
                };
                return diagonal({
                    source: o,
                    target: o
                });
            })
            .remove();

        // Stash the old positions for transition.
        nodes.forEach(function(d) {
            d.x0 = d.x;
            d.y0 = d.y;
        });

    }
    nodeClick = function(d) {
        var clickedArr = [];

        if (d.type == "host") {
            if (self.lastClickedNode != null) {
                if (self.lastClickedNode.name != d.name) {
                    self.lastClickedNode._children = self.lastClickedNode.children;
                    self.lastClickedNode.children = null;
                    tenantStorageDisksView.osdsTree.update(self.lastClickedNode, false);
                    self.lastClickedNode = d;
                }
            } else {
                self.lastClickedNode = d;
            }

            if (tenantStorageDisksView.osdsTree.expandedNodes.length != 0) {
                clickedArr = tenantStorageDisksView.osdsTree.expandedNodes.slice(0);
            }
            if (d.children) {
                d._children = d.children;
                d.children = null;
                var found = $.inArray(d.name, clickedArr);
                if (found >= 0) {
                    clickedArr.splice(found, 1);
                }
            } else {
                d.children = d._children;
                d._children = null;
                clickedArr.push(d.name);

            }
            /*if (clickedArr.length != 0) {
                tenantStorageDisksView.osdsTree.expandedNodes = clickedArr.slice(0);
            }*/
            if (self.lastClickedNode != null) {
                tenantStorageDisksView.osdsTree.expandedNodes = [];
                tenantStorageDisksView.osdsTree.expandedNodes.push(self.lastClickedNode.name);
            } else {
                tenantStorageDisksView.osdsTree.expandedNodes = [];
            }
            tenantStorageDisksView.osdsTree.update(d, false);
        }

    }
    nodeMouseover = function(d) {
        var infoTooltip = tenantStorageDisksView.osdsTree.infoTooltip;
        var tooltipClass;

        var tooltipContents = [{
            lbl: 'Name',
            value: d['name']
        }];

        if (d.type == 'host' || d.type == 'root') {
            tooltipContents.push({
                lbl: 'Status',
                value: (function() {
                    return getHostStatusTmpl(d['status'])
                })()
            });
            tooltipClass = 'tree-host-tip';
        }

        if (d.type == 'osd') {
            tooltipContents.push({
                lbl: 'Status',
                value: (function() {
                    return getDiskStatusTmpl(d['status'])
                })()
            });
            tooltipContents.push({
                lbl: 'Cluster Membership',
                value: (function() {
                    return getDiskStatusTmpl(d['cluster_status'])
                })()
            });
            tooltipContents.push({
                lbl: 'IP Address',
                value: d['cluster_addr']
            });
            tooltipContents.push({
                lbl: 'UUID',
                value: d['uuid']
            });
            if (d['status'] != 'down') {
                tooltipContents.push({
                    lbl: 'Apply Latency',
                    value: d['fs_perf_stat']['apply_latency_ms'] + ' ms'
                });
                tooltipContents.push({
                    lbl: 'Commit Latency',
                    value: d['fs_perf_stat']['commit_latency_ms'] + ' ms'
                });
            }
            tooltipClass = 'tree-disk-tip';
        }
        var content = formatTreeLblValueTooltip(tooltipContents);
        infoTooltip.show([d3.event.pageX, d3.event.pageY], content, 'n', 10, $('#osd-tree svg')[0], tooltipClass);

    }
    nodeMouseout = function(d) {
        var infoTooltip = tenantStorageDisksView.osdsTree.infoTooltip;
        infoTooltip.cleanup();
    }
}

/* experimental
function jointTree () {
    var graph = new joint.dia.Graph;

    var paper = new joint.dia.Paper({
        el: $('#jTree'),
        width: 600,
        height: 200,
        model: graph,
        gridSize: 1
    });

    var rect = new joint.shapes.basic.Rect({
        position: { x: 100, y: 30 },
        size: { width: 100, height: 30 },
        attrs: { rect: { fill: 'blue' }, text: { text: 'my box', fill: 'white' } }
    });

    var rect2 = rect.clone();
    rect2.translate(300);

    var link = new joint.dia.Link({
        source: { id: rect.id },
        target: { id: rect2.id }
    });

    graph.addCells([rect, rect2, link]);
}*/


function OSDsDataRefresh() {
    if (tenantStorageDisksView.currTab == 'Scatter Plot') {
        getOSDs();
    } else if (tenantStorageDisksView.currTab == 'Host Tree') {
        getOSDsTree();
    } else {

    }
}

// Following SVG elemets are used int the tree plot. [osd-in, osd-out, osd-down] [host-active, host-warn, host-critical, host-up]

var svgOsd = '<?xml version="1.0" encoding="UTF-8" standalone="no"?>\
<!-- Created with Inkscape (http://www.inkscape.org/) -->\
\
<svg\
   xmlns:dc="http://purl.org/dc/elements/1.1/"\
   xmlns:cc="http://creativecommons.org/ns#"\
   xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"\
   xmlns:svg="http://www.w3.org/2000/svg"\
   xmlns="http://www.w3.org/2000/svg"\
   xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"\
   xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"\
   width="23.558245"\
   height="24.036367"\
   id="svg-osd"\
   version="1.1"\
   inkscape:version="0.48.2 r9819"\
   sodipodi:docname="osd_in.svg">\
  <defs\
     id="defs4" />\
  <sodipodi:namedview\
     id="base"\
     pagecolor="#ffffff"\
     bordercolor="#666666"\
     borderopacity="1.0"\
     inkscape:pageopacity="0.0"\
     inkscape:pageshadow="2"\
     inkscape:zoom="1.4"\
     inkscape:cx="268.98731"\
     inkscape:cy="131.20387"\
     inkscape:document-units="px"\
     inkscape:current-layer="layer1"\
     showgrid="false"\
     inkscape:window-width="1428"\
     inkscape:window-height="832"\
     inkscape:window-x="122"\
     inkscape:window-y="209"\
     inkscape:window-maximized="0"\
     fit-margin-top="0"\
     fit-margin-left="0"\
     fit-margin-right="0"\
     fit-margin-bottom="0" />\
  <metadata\
     id="metadata7">\
    <rdf:RDF>\
      <cc:Work\
         rdf:about="">\
        <dc:format>image/svg+xml</dc:format>\
        <dc:type\
           rdf:resource="http://purl.org/dc/dcmitype/StillImage" />\
        <dc:name />\
      </cc:Work>\
    </rdf:RDF>\
  </metadata>\
  <g\
     inkscape:label="Layer 1"\
     inkscape:groupmode="layer"\
     id="osd-in"\
     style="display:inline"\
     transform="translate(-7.7631987e-7,-1028.3258)">\
    <g\
       id="g4185"\
       style="fill:#1f77b4; opacity:0.5"\
       transform="matrix(0.767342,0,0,0.7889846,-170.94185,826.90093)">\
      <g\
         transform="matrix(0.09598435,0,0,0.07112623,201.26825,244.0475)"\
         id="g3147"\
         style="fill:#1f77b4;">\
        <g\
           id="g3144"\
           style="fill:#1f77b4;" />\
      </g>\
      <g\
         id="g12"\
         transform="matrix(0.06196776,0,0,-0.04969585,216.35724,287.25507)"\
         style="fill:#1f77b4;">\
        <g\
           id="g3169"\
           style="fill:#1f77b4;">\
          <g\
             id="g3163"\
             style="fill:#1f77b4;">\
            <g\
               id="g3158"\
               style="fill:#1f77b4;">\
              <g\
                 id="g3154"\
                 style="fill:#1f77b4;">\
                <g\
                   id="g3151"\
                   style="fill:#1f77b4;">\
                  <path\
                     sodipodi:nodetypes="csccccsccccc"\
                     d="m 598.68268,528.21905 c -13.926,-38.313 -110.496,-61.25 -246.621,-61.25 -136.121,0 -229.18,26.25 -246.621,63.445 l 0.254,0.305 0.125,-431.675998 -0.25,-0.305 c 0,-40.124517 114.78455,-68.679893 250.90955,-68.679893 136.121,0 242.07845,28.555376 242.07845,68.679893 l 0,0 0.262,0.305 0.125,429.476998 -0.262,-0.301"\
                     inkscape:connector-curvature="0"\
                     id="path14"\
                     style="fill:#1f77b4;;fill-rule:evenodd;stroke:none" />\
                </g>\
              </g>\
            </g>\
          </g>\
        </g>\
        <path\
           style="fill:#2ca02c;;fill-rule:evenodd;stroke:none"\
           id="path16"\
           inkscape:connector-curvature="0"\
           d="m 596.492,579.375 c 0,35.254 -110.379,63.711 -246.504,63.711 -136.121,0 -246.48,-28.457 -246.48,-63.711 0,-35.137 110.359,-63.727 246.48,-63.727 136.125,0 246.504,28.59 246.504,63.727 l 0,0" />\
      </g>\
      <path\
         inkscape:connector-curvature="0"\
         id="path4158"\
         d="m 234.01786,285.55097 c -5.85856,-0.51157 -9.46184,-1.36749 -10.61606,-2.52171 l -0.45537,-0.45537 0,-10.72106 0,-10.72106 0.40178,0.36738 c 1.20917,1.10563 4.48098,1.9636 9.10771,2.38832 3.08,0.28273 11.8722,0.11481 14.47111,-0.27639 2.3957,-0.36061 4.73406,-1.02755 5.66653,-1.61618 l 0.71001,-0.44822 0,10.61137 0,10.61137 -0.53293,0.44843 c -0.99172,0.83448 -3.36388,1.53913 -6.7885,2.01652 -1.79245,0.24987 -10.18512,0.47196 -11.96428,0.3166 z"\
         style="fill:#1f77b4; opacity:0.5" />\
    </g>\
  </g>\
  \
  <g\
     inkscape:label="Layer 1"\
     inkscape:groupmode="layer"\
     id="osd-out"\
     style="display:inline"\
     transform="translate(-7.7631987e-7,-1028.3258)">\
    <g\
       id="g4185"\
       style="fill:#1f77b4;"\
       transform="matrix(0.767342,0,0,0.7889846,-170.94185,826.90093)">\
      <g\
         transform="matrix(0.09598435,0,0,0.07112623,201.26825,244.0475)"\
         id="g3147"\
         style="fill:#1f77b4;">\
        <g\
           id="g3144"\
           style="fill:#1f77b4;" />\
      </g>\
      <g\
         id="g12"\
         transform="matrix(0.06196776,0,0,-0.04969585,216.35724,287.25507)"\
         style="fill:#1f77b4;">\
        <g\
           id="g3169"\
           style="fill:#1f77b4;">\
          <g\
             id="g3163"\
             style="fill:#1f77b4;">\
            <g\
               id="g3158"\
               style="fill:#1f77b4;">\
              <g\
                 id="g3154"\
                 style="fill:#1f77b4;">\
                <g\
                   id="g3151"\
                   style="fill:#1f77b4;">\
                  <path\
                     sodipodi:nodetypes="csccccsccccc"\
                     d="m 598.68268,528.21905 c -13.926,-38.313 -110.496,-61.25 -246.621,-61.25 -136.121,0 -229.18,26.25 -246.621,63.445 l 0.254,0.305 0.125,-431.675998 -0.25,-0.305 c 0,-40.124517 114.78455,-68.679893 250.90955,-68.679893 136.121,0 242.07845,28.555376 242.07845,68.679893 l 0,0 0.262,0.305 0.125,429.476998 -0.262,-0.301"\
                     inkscape:connector-curvature="0"\
                     id="path14"\
                     style="fill:#1f77b4;;fill-rule:evenodd;stroke:none" />\
                </g>\
              </g>\
            </g>\
          </g>\
        </g>\
        <path\
           style="fill:#ff7f0e;;fill-rule:evenodd;stroke:none"\
           id="path16"\
           inkscape:connector-curvature="0"\
           d="m 596.492,579.375 c 0,35.254 -110.379,63.711 -246.504,63.711 -136.121,0 -246.48,-28.457 -246.48,-63.711 0,-35.137 110.359,-63.727 246.48,-63.727 136.125,0 246.504,28.59 246.504,63.727 l 0,0" />\
      </g>\
      <path\
         inkscape:connector-curvature="0"\
         id="path4158"\
         d="m 234.01786,285.55097 c -5.85856,-0.51157 -9.46184,-1.36749 -10.61606,-2.52171 l -0.45537,-0.45537 0,-10.72106 0,-10.72106 0.40178,0.36738 c 1.20917,1.10563 4.48098,1.9636 9.10771,2.38832 3.08,0.28273 11.8722,0.11481 14.47111,-0.27639 2.3957,-0.36061 4.73406,-1.02755 5.66653,-1.61618 l 0.71001,-0.44822 0,10.61137 0,10.61137 -0.53293,0.44843 c -0.99172,0.83448 -3.36388,1.53913 -6.7885,2.01652 -1.79245,0.24987 -10.18512,0.47196 -11.96428,0.3166 z"\
         style="fill:#1f77b4;" />\
    </g>\
  </g>\
  \
  <g\
     inkscape:label="Layer 1"\
     inkscape:groupmode="layer"\
     id="osd-up"\
     style="display:inline"\
     transform="translate(-7.7631987e-7,-1028.3258)">\
    <g\
       id="g4185"\
       style="fill:#1f77b4;"\
       transform="matrix(0.767342,0,0,0.7889846,-170.94185,826.90093)">\
      <g\
         transform="matrix(0.09598435,0,0,0.07112623,201.26825,244.0475)"\
         id="g3147"\
         style="fill:#1f77b4;">\
        <g\
           id="g3144"\
           style="fill:#1f77b4;" />\
      </g>\
      <g\
         id="g12"\
         transform="matrix(0.06196776,0,0,-0.04969585,216.35724,287.25507)"\
         style="fill:#1f77b4;">\
        <g\
           id="g3169"\
           style="fill:#1f77b4;">\
          <g\
             id="g3163"\
             style="fill:#1f77b4;">\
            <g\
               id="g3158"\
               style="fill:#1f77b4;">\
              <g\
                 id="g3154"\
                 style="fill:#1f77b4;">\
                <g\
                   id="g3151"\
                   style="fill:#1f77b4;">\
                  <path\
                     sodipodi:nodetypes="csccccsccccc"\
                     d="m 598.68268,528.21905 c -13.926,-38.313 -110.496,-61.25 -246.621,-61.25 -136.121,0 -229.18,26.25 -246.621,63.445 l 0.254,0.305 0.125,-431.675998 -0.25,-0.305 c 0,-40.124517 114.78455,-68.679893 250.90955,-68.679893 136.121,0 242.07845,28.555376 242.07845,68.679893 l 0,0 0.262,0.305 0.125,429.476998 -0.262,-0.301"\
                     inkscape:connector-curvature="0"\
                     id="path14"\
                     style="fill:#1f77b4;;fill-rule:evenodd;stroke:none" />\
                </g>\
              </g>\
            </g>\
          </g>\
        </g>\
        <path\
           style="fill:#1F77B4;;fill-rule:evenodd;stroke:none"\
           id="path16"\
           inkscape:connector-curvature="0"\
           d="m 596.492,579.375 c 0,35.254 -110.379,63.711 -246.504,63.711 -136.121,0 -246.48,-28.457 -246.48,-63.711 0,-35.137 110.359,-63.727 246.48,-63.727 136.125,0 246.504,28.59 246.504,63.727 l 0,0" />\
      </g>\
      <path\
         inkscape:connector-curvature="0"\
         id="path4158"\
         d="m 234.01786,285.55097 c -5.85856,-0.51157 -9.46184,-1.36749 -10.61606,-2.52171 l -0.45537,-0.45537 0,-10.72106 0,-10.72106 0.40178,0.36738 c 1.20917,1.10563 4.48098,1.9636 9.10771,2.38832 3.08,0.28273 11.8722,0.11481 14.47111,-0.27639 2.3957,-0.36061 4.73406,-1.02755 5.66653,-1.61618 l 0.71001,-0.44822 0,10.61137 0,10.61137 -0.53293,0.44843 c -0.99172,0.83448 -3.36388,1.53913 -6.7885,2.01652 -1.79245,0.24987 -10.18512,0.47196 -11.96428,0.3166 z"\
         style="fill:#1f77b4;" />\
    </g>\
  </g>\
  \
  <g\
     inkscape:label="Layer 1"\
     inkscape:groupmode="layer"\
     id="osd-down"\
     style="display:inline"\
     transform="translate(-7.7631987e-7,-1028.3258)">\
    <g\
       id="g4185"\
       style="fill:#1f77b4;"\
       transform="matrix(0.767342,0,0,0.7889846,-170.94185,826.90093)">\
      <g\
         transform="matrix(0.09598435,0,0,0.07112623,201.26825,244.0475)"\
         id="g3147"\
         style="fill:#1f77b4;">\
        <g\
           id="g3144"\
           style="fill:#1f77b4;" />\
      </g>\
      <g\
         id="g12"\
         transform="matrix(0.06196776,0,0,-0.04969585,216.35724,287.25507)"\
         style="fill:#1f77b4;">\
        <g\
           id="g3169"\
           style="fill:#1f77b4;">\
          <g\
             id="g3163"\
             style="fill:#1f77b4;">\
            <g\
               id="g3158"\
               style="fill:#1f77b4;">\
              <g\
                 id="g3154"\
                 style="fill:#1f77b4;">\
                <g\
                   id="g3151"\
                   style="fill:#1f77b4;">\
                  <path\
                     sodipodi:nodetypes="csccccsccccc"\
                     d="m 598.68268,528.21905 c -13.926,-38.313 -110.496,-61.25 -246.621,-61.25 -136.121,0 -229.18,26.25 -246.621,63.445 l 0.254,0.305 0.125,-431.675998 -0.25,-0.305 c 0,-40.124517 114.78455,-68.679893 250.90955,-68.679893 136.121,0 242.07845,28.555376 242.07845,68.679893 l 0,0 0.262,0.305 0.125,429.476998 -0.262,-0.301"\
                     inkscape:connector-curvature="0"\
                     id="path14"\
                     style="fill:#1f77b4;;fill-rule:evenodd;stroke:none" />\
                </g>\
              </g>\
            </g>\
          </g>\
        </g>\
        <path\
           style="fill:#D62728;;fill-rule:evenodd;stroke:none"\
           id="path16"\
           inkscape:connector-curvature="0"\
           d="m 596.492,579.375 c 0,35.254 -110.379,63.711 -246.504,63.711 -136.121,0 -246.48,-28.457 -246.48,-63.711 0,-35.137 110.359,-63.727 246.48,-63.727 136.125,0 246.504,28.59 246.504,63.727 l 0,0" />\
      </g>\
      <path\
         inkscape:connector-curvature="0"\
         id="path4158"\
         d="m 234.01786,285.55097 c -5.85856,-0.51157 -9.46184,-1.36749 -10.61606,-2.52171 l -0.45537,-0.45537 0,-10.72106 0,-10.72106 0.40178,0.36738 c 1.20917,1.10563 4.48098,1.9636 9.10771,2.38832 3.08,0.28273 11.8722,0.11481 14.47111,-0.27639 2.3957,-0.36061 4.73406,-1.02755 5.66653,-1.61618 l 0.71001,-0.44822 0,10.61137 0,10.61137 -0.53293,0.44843 c -0.99172,0.83448 -3.36388,1.53913 -6.7885,2.01652 -1.79245,0.24987 -10.18512,0.47196 -11.96428,0.3166 z"\
         style="fill:#1f77b4;" />\
    </g>\
  </g>\
</svg>';

var svgHost = '<?xml version="1.0" encoding="UTF-8" standalone="no"?>\
<!-- Created with Inkscape (http://www.inkscape.org/) -->\
\
<svg\
   xmlns:dc="http://purl.org/dc/elements/1.1/"\
   xmlns:cc="http://creativecommons.org/ns#"\
   xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"\
   xmlns:svg="http://www.w3.org/2000/svg"\
   xmlns="http://www.w3.org/2000/svg"\
   xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"\
   xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"\
   width="46.517853"\
   height="13.169642"\
   id="svg-host"\
   version="1.1"\
   inkscape:version="0.48.2 r9819"\
   sodipodi:docname="host.svg">\
  <defs\
     id="defs4" />\
  <sodipodi:namedview\
     id="base"\
     pagecolor="#ffffff"\
     bordercolor="#666666"\
     borderopacity="1.0"\
     inkscape:pageopacity="0.0"\
     inkscape:pageshadow="2"\
     inkscape:zoom="0.98994949"\
     inkscape:cx="252.94643"\
     inkscape:cy="352.80815"\
     inkscape:document-units="px"\
     inkscape:current-layer="layer1"\
     showgrid="false"\
     inkscape:window-width="1656"\
     inkscape:window-height="974"\
     inkscape:window-x="85"\
     inkscape:window-y="71"\
     inkscape:window-maximized="0"\
     fit-margin-top="0"\
     fit-margin-left="0"\
     fit-margin-right="0"\
     fit-margin-bottom="0" />\
  <metadata\
     id="metadata7">\
    <rdf:RDF>\
      <cc:Work\
         rdf:about="">\
        <dc:format>image/svg+xml</dc:format>\
        <dc:type\
           rdf:resource="http://purl.org/dc/dcmitype/StillImage" />\
        <dc:name></dc:name>\
      </cc:Work>\
    </rdf:RDF>\
  </metadata>\
  <g\
     inkscape:label="Layer 1"\
     inkscape:groupmode="layer"\
     id="host-warn"\
     transform="translate(0,-1039.1925)">\
    <rect\
       style="fill:#8c564b;fill-opacity:1"\
       id="rect4280"\
       width="46.517853"\
       height="13.169642"\
       x="0"\
       y="1039.1925" />\
    <rect\
       style="fill:#ff7f0e;fill-opacity:1"\
       id="rect4282"\
       width="17.74563"\
       height="5.3064327"\
       x="24.992325"\
       y="1041.8243" />\
  </g>\
  \
  <g\
     inkscape:label="Layer 1"\
     inkscape:groupmode="layer"\
     id="host-critical"\
     transform="translate(0,-1039.1925)">\
    <rect\
       style="fill:#636363;fill-opacity:1"\
       id="rect4280"\
       width="46.517853"\
       height="13.169642"\
       x="0"\
       y="1039.1925" />\
    <rect\
       style="fill:#D62728;fill-opacity:1"\
       id="rect4282"\
       width="17.74563"\
       height="5.3064327"\
       x="24.992325"\
       y="1041.8243" />\
  </g>\
  \
  <g\
     inkscape:label="Layer 1"\
     inkscape:groupmode="layer"\
     id="host-active"\
     transform="translate(0,-1039.1925)">\
    <rect\
       style="fill:#7f7f7f;fill-opacity:1"\
       id="rect4280"\
       width="46.517853"\
       height="13.169642"\
       x="0"\
       y="1039.1925" />\
    <rect\
       style="fill:#2ca02c;fill-opacity:1"\
       id="rect4282"\
       width="17.74563"\
       height="5.3064327"\
       x="24.992325"\
       y="1041.8243" />\
  </g>\
  \
  <g\
     inkscape:label="Layer 1"\
     inkscape:groupmode="layer"\
     id="host-up"\
     transform="translate(0,-1039.1925)">\
    <rect\
       style="fill:#c7c7c7;fill-opacity:1"\
       id="rect4280"\
       width="46.517853"\
       height="13.169642"\
       x="0"\
       y="1039.1925" />\
    <rect\
       style="fill:#1F77B4;fill-opacity:1"\
       id="rect4282"\
       width="17.74563"\
       height="5.3064327"\
       x="24.992325"\
       y="1041.8243" />\
  </g>\
</svg>';