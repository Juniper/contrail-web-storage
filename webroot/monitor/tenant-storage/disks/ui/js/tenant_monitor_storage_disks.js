/*
 * Copyright (c) 2013 Juniper Networks, Inc. All rights reserved.
 */


cephOSDsView = function() {

    var self = this,
        errorMsg,
        osdsTree = new osdTree(),
        currOSD = null,
        osdsDV = new ContrailDataView(),
        osdDV = new ContrailDataView();

    this.osdsTree = osdsTree;
    this.currTab = null;

    this.destroy = function() {
        var cGrid = $('.contrail-grid').data('contrailGrid');
        if (cGrid != null)
            cGrid.destroy();
        if (this.timerId)
            clearInterval(this.timerId);
        if (this.currTab)
            this.currTab = null;

        // cleanup diskActivity, stop fetching individual disk stats
        diskActivity.destroy();
    }

    this.setOSDsBubbleData = function(data) {
        this.osdsBubbleData = data;
        updateDisksChart(this.osdsBubbleData);
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

    this.setOSDsData = function(data) {
        osdsDV.setData(data);
    }

    this.getOSDsData = function() {
        return osdsDV.getItems();
    }

    this.setOSDData = function(data) {
        osdDV.setData(data);
    }

    this.getOSDData = function() {
        return osdDV.getItems();
    }

    this.setCurrOSD = function(data) {
        currOSD = data;
    }

    this.getCurrOSD = function() {
        return currOSD;
    }

    this.setErrorMessage = function(msg) {
        errorMsg = msg;
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
                    lazyLoading: true,
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
                    dataView: osdsDV,
                    events: {
                        onUpdateDataCB: function() {
                            var dvGrid = $('#gridOSDs').data('contrailGrid');
                            dvGrid.removeGridLoading();
                        }
                    }
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

        if(osdsDV.getItems().length == 0) {
            getOSDs();
        } else {
            osdsDV.updateData(self.getOSDsData());
        }
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
        selTab = ifNull(ui.newTab.context.innerText, ui.newTab.context.innerHTML);
        tenantStorageDisksView.currTab = selTab;
        if (selTab == "Scatter Plot") {
            if (tenantStorageChartsInitializationStatus['disks']) {
                updateDisksChart(tenantStorageDisksView.osdsBubbleData);
                $("#gridOSDs").data("contrailGrid").refreshView()
            } else {
                populateOSDs();
            }
        } else if (selTab == "Host Tree") {
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
        } else if (selTab == "Details") {
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
    var osdArr = [];
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
    tenantStorageDisksView.setOSDsData(osdArr);
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
    tenantStorageDisksView.setOSDsData(osdArr);
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

    this.destroy = function() {
        if (this.diskTimerId)
            clearInterval(this.diskTimerId);
    }

    this.setThrptData = function(data) {
        self.thrptData = data;
        updateStorageCharts.updateLineCharts(data, 'thrptChart')
    }

    this.setIopsData = function(data) {
        self.iopsData = data;
        updateStorageCharts.updateLineCharts(data, 'iopsChart');
    }

    this.setLatencyData = function(data) {
        self.latData = data;
        updateStorageCharts.updateLineCharts(data, 'latencyChart');
    }

    this.parseDiskStats = function(data) {
        var dataThrptRead = [], dataThrptWrite = [];
        var dataIopsRead = [], dataIopsWrite = [];
        var dataLatRead = [], dataLatWrite = [];

        if(data != null && data.hasOwnProperty('flow-series')) {
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

    this.startFetchAndUpdateStats = function(obj) {
        self.fetchDiskStats(obj);
        self.diskName = obj['name'];

        if (self.diskTimerId) {
            clearInterval(self.diskTimerId);
        } else {
            self.diskTimerId = setInterval(function() {
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
            url: contrail.format(tenantMonitorStorageUrls['DISK_DETAILS'], osdName)
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
    var colorCount = {};
    var osdColorCount = osdColorArr.length;
    $.each(osdColorArr, function(idx, color) {
        /*
        * Old way of calculating host color.
        * if atleast one disk is down, the host is down

        if (color == color_imp) {
            host_color = color_imp;
            return;
        } else if (color == color_warn && host_color != color_warn && host_color != color_imp) {
            host_color = color_warn;
        } else if (color == color_success && host_color != color_warn && host_color != color_imp) {
            host_color = color_success;
        } else {}
        */
        colorCount[color] = (colorCount[color] || 0) + 1;
    });
    colorKeyCount = Object.keys(colorCount).length;
    if (colorKeyCount == 1) {
        host_color = osdColorArr[0]; //all colors are same
    } else if (colorKeyCount == 3 || colorKeyCount == 2) {
        host_color = color_warn; //all possible colors or two colors; return warn color
    } else {

    }
    return host_color;
}

function getHostStatus(statusArr) {
    var host_status = 'up';
    var downCnt = 0
    $.each(statusArr, function(idx, status) {
        // Following checks for OSD status [in, out, down]
        if (status == 'down') {
            //host_status = 'critical';
            downCnt++;
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
    if (downCnt == statusArr.length / 2)
        host_status = 'critical';

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

            if (storageTreeChartExpandedNodes.length != 0) {
                var clickedArr = storageTreeChartExpandedNodes.slice(0);
                source = selectiveCollapse(source, clickedArr);
            } else {
                source.children.forEach(collapse);
            }
            tenantStorageDisksView.osdsTree.root = source;
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
            .attr("class", function(d) {
                return  "node-" + d.type;
            })
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
                clickedArr = storageTreeChartExpandedNodes.slice(0);
                if (self.lastClickedNode.name != d.name) {
                    self.lastClickedNode._children = self.lastClickedNode.children;
                    self.lastClickedNode.children = null;
                    tenantStorageDisksView.osdsTree.update(self.lastClickedNode, false);
                    clickedArr = []; //we are only expanding one node at a time
                    clickedArr.push(d.name);
                } else {
                    clickedArr = []; //already in list; so empty it out.
                }
            } else {
                clickedArr.push(d.name);
            }
            storageTreeChartExpandedNodes = clickedArr.slice(0);
            self.lastClickedNode = d;
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
            tenantStorageDisksView.osdsTree.update(d, false);
        } else if(d.type == 'osd') {
            var currObj = {};
            currObj['name'] = d.name;
            currObj['host'] = d.parent.name;
            tenantStorageChartUtils.onDiskDrillDown(currObj);
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
                lbl: 'Membership',
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
    <svg width="26px" height="32px" viewBox="0 0 26 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns">\
        <!-- Generator: Sketch 3.0.4 (8053) - http://www.bohemiancoding.com/sketch -->\
        <title>svg-osd</title>\
        <desc>Created with Sketch.</desc>\
        <defs></defs>\
        <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage">\
            <g id="svg-osd" sketch:type="MSArtboardGroup">\
                <g id="osd-down" sketch:type="MSLayerGroup">\
                    <path d="M-0.430126031,2.59308138 C-0.430126031,2.59308138 8.86918841,4.67621713 13.3631388,4.69858375 C18.4353166,4.72382823 25.9528077,2.59308138 25.9528077,2.59308138 L25.9528077,5.78458791 C25.9528077,5.78458791 18.2948514,7.91986684 13.3631388,7.85496809 C8.73063721,7.79400679 -0.430126031,5.78458791 -0.430126031,5.78458791 L-0.430126031,2.59308138 Z" id="Path-16" fill="#D0011B" sketch:type="MSShapeGroup"></path>\
                    <path d="M-0.430126031,5.81723503 C-0.430126031,5.81723503 8.86918841,7.90037077 13.3631388,7.92273739 C18.4353166,7.94798188 25.9528077,5.81723503 25.9528077,5.81723503 L25.9528077,29.8461635 C25.9528077,29.8461635 18.2948514,31.9814425 13.3631388,31.9165437 C8.73063721,31.8555824 -0.430126031,29.8461635 -0.430126031,29.8461635 L-0.430126031,5.81723503 Z" id="Path-18" fill="#D8D8D8" sketch:type="MSShapeGroup"></path>\
                    <path d="M13.3631388,0.376935603 C8.93127243,0.306436203 -0.244816879,1.24399058 -0.244816879,1.24399058 C-0.244816879,1.24399058 8.94692546,3.27576182 13.3631388,3.34601222 C17.6504526,3.41421217 25.8456677,1.24399056 25.8456677,1.24399056 C25.8456677,1.24399056 17.6347996,0.444886551 13.3631388,0.376935603 Z" id="Path-16" fill="#D0011B" sketch:type="MSShapeGroup"></path>\
                </g>\
                <g id="osd-out" sketch:type="MSLayerGroup">\
                    <path d="M-0.430126031,5.81723503 C-0.430126031,5.81723503 8.86918841,7.90037077 13.3631388,7.92273739 C18.4353166,7.94798188 25.9528077,5.81723503 25.9528077,5.81723503 L25.9528077,29.8461635 C25.9528077,29.8461635 18.2948514,31.9814425 13.3631388,31.9165437 C8.73063721,31.8555824 -0.430126031,29.8461635 -0.430126031,29.8461635 L-0.430126031,5.81723503 Z" id="Path-20" fill="#D8D8D8" sketch:type="MSShapeGroup"></path>\
                    <path d="M-0.430126031,2.59308138 C-0.430126031,2.59308138 8.86918841,4.67621713 13.3631388,4.69858375 C18.4353166,4.72382823 25.9528077,2.59308138 25.9528077,2.59308138 L25.9528077,5.78458791 C25.9528077,5.78458791 18.2948514,7.91986684 13.3631388,7.85496809 C8.73063721,7.79400679 -0.430126031,5.78458791 -0.430126031,5.78458791 L-0.430126031,2.59308138 Z" id="Path-17" fill="#F5A628" sketch:type="MSShapeGroup"></path>\
                    <path d="M13.3631388,0.376935603 C8.93127243,0.306436203 -0.244816879,1.24399058 -0.244816879,1.24399058 C-0.244816879,1.24399058 8.94692546,3.27576182 13.3631388,3.34601222 C17.6504526,3.41421217 25.8456677,1.24399056 25.8456677,1.24399056 C25.8456677,1.24399056 17.6347996,0.444886551 13.3631388,0.376935603 Z" id="Path-19" fill="#F5A628" sketch:type="MSShapeGroup"></path>\
                </g>\
                <g id="osd-in" sketch:type="MSLayerGroup">\
                    <path d="M-0.430126031,5.81723503 C-0.430126031,5.81723503 8.86918841,7.90037077 13.3631388,7.92273739 C18.4353166,7.94798188 25.9528077,5.81723503 25.9528077,5.81723503 L25.9528077,29.8461635 C25.9528077,29.8461635 18.2948514,31.9814425 13.3631388,31.9165437 C8.73063721,31.8555824 -0.430126031,29.8461635 -0.430126031,29.8461635 L-0.430126031,5.81723503 Z" id="Path-20" fill="#D8D8D8" sketch:type="MSShapeGroup"></path>\
                    <path d="M-0.430126031,2.59308138 C-0.430126031,2.59308138 8.86918841,4.67621713 13.3631388,4.69858375 C18.4353166,4.72382823 25.9528077,2.59308138 25.9528077,2.59308138 L25.9528077,5.78458791 C25.9528077,5.78458791 18.2948514,7.91986684 13.3631388,7.85496809 C8.73063721,7.79400679 -0.430126031,5.78458791 -0.430126031,5.78458791 L-0.430126031,2.59308138 Z" id="Path-17" fill="#A0D4A0" sketch:type="MSShapeGroup"></path>\
                    <path d="M13.3631388,0.376935603 C8.93127243,0.306436203 -0.244816879,1.24399058 -0.244816879,1.24399058 C-0.244816879,1.24399058 8.94692546,3.27576182 13.3631388,3.34601222 C17.6504526,3.41421217 25.8456677,1.24399056 25.8456677,1.24399056 C25.8456677,1.24399056 17.6347996,0.444886551 13.3631388,0.376935603 Z" id="Path-19" fill="#A0D4A0" sketch:type="MSShapeGroup"></path>\
                </g>\
                <g id="osd-up" sketch:type="MSLayerGroup">\
                    <path d="M-0.430126031,5.81723503 C-0.430126031,5.81723503 8.86918841,7.90037077 13.3631388,7.92273739 C18.4353166,7.94798188 25.9528077,5.81723503 25.9528077,5.81723503 L25.9528077,29.8461635 C25.9528077,29.8461635 18.2948514,31.9814425 13.3631388,31.9165437 C8.73063721,31.8555824 -0.430126031,29.8461635 -0.430126031,29.8461635 L-0.430126031,5.81723503 Z" id="Path-20" fill="#D8D8D8" sketch:type="MSShapeGroup"></path>\
                    <path d="M-0.430126031,2.59308138 C-0.430126031,2.59308138 8.86918841,4.67621713 13.3631388,4.69858375 C18.4353166,4.72382823 25.9528077,2.59308138 25.9528077,2.59308138 L25.9528077,5.78458791 C25.9528077,5.78458791 18.2948514,7.91986684 13.3631388,7.85496809 C8.73063721,7.79400679 -0.430126031,5.78458791 -0.430126031,5.78458791 L-0.430126031,2.59308138 Z" id="Path-17" fill="#9AC2DD" sketch:type="MSShapeGroup"></path>\
                    <path d="M13.3631388,0.376935603 C8.93127243,0.306436203 -0.244816879,1.24399058 -0.244816879,1.24399058 C-0.244816879,1.24399058 8.94692546,3.27576182 13.3631388,3.34601222 C17.6504526,3.41421217 25.8456677,1.24399056 25.8456677,1.24399056 C25.8456677,1.24399056 17.6347996,0.444886551 13.3631388,0.376935603 Z" id="Path-19" fill="#9AC2DD" sketch:type="MSShapeGroup"></path>\
                </g>\
            </g>\
        </g>\
    </svg>';

var svgHost = '<?xml version="1.0" encoding="UTF-8" standalone="no"?>\
    <svg width="61px" height="11px" viewBox="-30 -5 31 6" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns">\
        <!-- Generator: Sketch 3.0.4 (8053) - http://www.bohemiancoding.com/sketch -->\
        <title>svg_host</title>\
        <desc>Created with Sketch.</desc>\
        <defs></defs>\
        <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage">\
            <g id="svg-host" sketch:type="MSArtboardGroup">\
                <g id="host-up" sketch:type="MSLayerGroup">\
                    <path d="M-1.2009505,-0.219247546 L61.0879423,-0.219247546 L61.0879423,11.1895556 L-1.2009505,11.1895556 L-1.2009505,-0.219247546 Z" id="Path-27" fill="#D8D8D8" sketch:type="MSShapeGroup"></path>\
                    <path d="M38.0057953,2.202622 L55.4621272,2.202622 L55.4621272,7.22126116 L38.0057953,7.22126116 L38.0057953,2.202622 Z" id="Path-26" stroke="#FFFFFF" fill="#9AC2DD" sketch:type="MSShapeGroup"></path>\
                </g>\
                <g id="host-active" sketch:type="MSLayerGroup">\
                    <path d="M-1.2009505,-0.219247546 L61.0879423,-0.219247546 L61.0879423,11.1895556 L-1.2009505,11.1895556 L-1.2009505,-0.219247546 Z" id="Path-29" fill="#D8D8D8" sketch:type="MSShapeGroup"></path>\
                    <path d="M38.0057953,2.202622 L55.4621272,2.202622 L55.4621272,7.22126116 L38.0057953,7.22126116 L38.0057953,2.202622 Z" id="Path-28" stroke="#FFFFFF" fill="#A0D4A0" sketch:type="MSShapeGroup"></path>\
                </g>\
                <g id="host-warn" sketch:type="MSLayerGroup">\
                    <path d="M-1.2009505,-0.219247546 L61.0879423,-0.219247546 L61.0879423,11.1895556 L-1.2009505,11.1895556 L-1.2009505,-0.219247546 Z" id="Path-29" fill="#D8D8D8" sketch:type="MSShapeGroup"></path>\
                    <path d="M38.0057953,2.202622 L55.4621272,2.202622 L55.4621272,7.22126116 L38.0057953,7.22126116 L38.0057953,2.202622 Z" id="Path-28" stroke="#FFFFFF" fill="#F5A628" sketch:type="MSShapeGroup"></path>\
                </g>\
                <g id="host-critical" sketch:type="MSLayerGroup">\
                    <path d="M-1.2009505,-0.219247546 L61.0879423,-0.219247546 L61.0879423,11.1895556 L-1.2009505,11.1895556 L-1.2009505,-0.219247546 Z" id="Path-29" fill="#D8D8D8" sketch:type="MSShapeGroup"></path>\
                    <path d="M38.0057953,2.202622 L55.4621272,2.202622 L55.4621272,7.22126116 L38.0057953,7.22126116 L38.0057953,2.202622 Z" id="Path-28" stroke="#FFFFFF" fill="#D0011B" sketch:type="MSShapeGroup"></path>\
                </g>\
            </g>\
        </g>\
    </svg>';
