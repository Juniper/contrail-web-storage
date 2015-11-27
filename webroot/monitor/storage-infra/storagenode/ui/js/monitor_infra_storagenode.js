/*
 * Copyright (c) 2013 Juniper Networks, Inc. All rights reserved.
 */

storageNodesView = function() {
    var self = this;
    this.load = function(obj) {
        var hashParams = ifNullOrEmptyObject(obj['hashParams'], {
            node: ''
        });
        if (hashParams['node'].indexOf('Storage Nodes:') == 0) {
            storNodeView.load({
                name: hashParams['node'].split(':')[1],
                tab: hashParams['tab']
            });
        } else {
            layoutHandler.setURLHashParams({
                node: 'Storage Nodes'
            }, {
                merge: false,
                triggerHashChange: false
            });
            populateStorageNodes();
        }
    }

    this.updateViewByHash = function(hashObj, lastHashObj) {
        this.load({
            hashParams: hashObj
        });
    }

    this.destroy = function() {
        storageChartsInitializationStatus['storageNodes'] = false;
        var cGrid = $('.contrail-grid').data('contrailGrid');
        if(cGrid != null)
            cGrid.destroy();
    }

    function populateStorageNodes() {

        infraMonitorStorageUtils.clearTimers();
        var storNodesTemplate = contrail.getTemplate4Id("storagenodes-template");
        $(pageContainer).html(storNodesTemplate({}));

        var storageNodeDS = new SingleDataSource('storageNodeDS'),
            storageNodesDSObj = storageNodeDS.getDataSourceObj(),
            storageNodesDV = new ContrailDataView(),
            storageNodesDataSource,
            storageNodesDeferredObj = $.Deferred();

        //Initialize widget header
        $('#storageNodes-header').initWidgetHeader({
            title: 'Storage Nodes',
            widgetBoxId: 'recent'
        });
        $(storageNodeDS).on('change', function() {
            storageNodesDataSource = storageNodesDSObj['dataSource'];
            storageNodesDeferredObj = storageNodesDSObj['deferredObj'];
            var nodeData = $.map(storageNodesDataSource.getItems(), function(val, idx) {
                if (val['name'] != 'CLUSTER_HEALTH')
                    return val;
            });
            storageNodesDV.setData(nodeData);
            updateStorageChartsForSummary(nodeData, 'storageNodes');
        });
        $('#gridStorageNodes').contrailGrid({
            header: {
                title: {
                    text: 'Storage Nodes',
                    cssClass: 'blue'
                },
                customControls: []
            },
            body: {
                options: {
                    rowHeight: 30,
                    autoHeight: true,
                    enableAsyncPostRender: true,
                    forceFitColumns: true
                },
                dataSource: {
                    dataView: storageNodesDV
                },
                statusMessages: {
                    loading: {
                        text: 'Loading Storage Nodes..'
                    },
                    empty: {
                        text: 'No Storage Nodes to display'
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
                        pageSize: 50,
                        pageSizeSelect: [10, 50, 100, 200, 500]
                    }
                }
            },
            columnHeader: {
                columns: [{
                    field: "name",
                    name: "Host name",
                    formatter: function(r, c, v, cd, dc) {
                        return cellTemplateLinks({
                            cellText: 'name',
                            name: 'name',
                            statusBubble: false,
                            rowData: dc
                        });
                    },
                    events: {
                        onClick: function(e, dc) {
                            onStorNodeRowSelChange(dc);
                        }
                    },
                    cssClass: 'cell-hyperlink-blue',
                    minWidth: 150
                }, {
                    field: "status",
                    name: "Status",
                    formatter: function(r, c, v, cd, dc) {
                        return getStorageNodeStatusTmpl(dc['status'])
                    },
                    minWidth: 50
                }, {
                    field: "",
                    name: "Disks",
                    minWidth: 20,
                    formatter: function(r, c, v, cd, dc) {
                        return dc['osds'].length;
                    }
                }, {
                    field: "osds_total",
                    name: "Disks Space",
                    minWidth: 60,
                }, {
                    field: "osds_used",
                    name: "Disks Used Space",
                    minWidth: 60,
                }, {
                    field: "osds_available_perc",
                    name: "Disks Available %",
                    minWidth: 60,
                }],
            }
        });
        var storNodesGrid = $('#gridStorageNodes').data('contrailGrid');
        storageNodesDeferredObj.done(function() {
            storNodesGrid.removeGridLoading();
        });
        storageNodesDeferredObj.fail(function() {
            storNodesGrid.showGridMessage('errorGettingData');
        });
        if (storageNodesDSObj['lastUpdated'] != null &&
            (storageNodesDSObj['error'] == null || storageNodesDSObj['error']['errTxt'] == 'abort')) {
            triggerDatasourceEvents(storageNodeDS);
        } else {
            storNodesGrid.showGridMessage('loading');
        }
    }

    function onStorNodeRowSelChange(dc) {
        storNodeView.load({
            name: dc['name']
        });
    }

}
storageNodeView = function() {
    var self = this;
    var storNodeTabStrip = "storage-tabstrip";
    var storNodeTabs = ['details', 'disks', 'monitor'];
    var storNodeDisksTabStrip = "storage-disks-tabstrip";
    var storNodeDisksTabs = ['summary', 'details'];
    this.load = function(obj) {
        pushBreadcrumb([obj['name']]);
        storNodeInfo = obj;
        if ((storNodeInfo == null || storNodeInfo.name == null || storNodeInfo.name == '') &&
            storNodeInfo.name != null) {
            var storageNodeDeferredObj = $.Deferred();
            self.getStorageNodeDetails(storageNodeDeferredObj, storNodeInfo);
            storageNodeDeferredObj.done(function(data) {
                try {
                    storNodeInfo['name'] = data.name;
                } catch (e) {}
                self.populateStorageNode(storNodeInfo);
            });
        } else {
            self.populateStorageNode(storNodeInfo);
        }
    }

    this.destroy = function() {

    }

    this.getStorageNodeDetails = function(deferredObj, obj) {
        $.ajax({
            url: contrail.format(monitorInfraStorageUrls['STORAGENODE_DETAILS'], obj['name'])
        }).done(function(response) {
            deferredObj.resolve(response);
        });
    }

    this.populateStorageNode = function(obj) {
        if (obj['tab'] == null)
            obj['tab'] = '';
        if (!isInitialized('#storage-tabstrip')) {
            var storNodeTemplate = Handlebars.compile($("#storagenode-template").html());
            $(pageContainer).html(storNodeTemplate(storNodeInfo));

            $("#storage-tabstrip").contrailTabs({
                activate: function(e, ui) {
                    var selTab = ifNull(ui.newTab.context.innerText, ui.newTab.context.innerHTML);
                    if (selTab == 'Disks') {
                        populateDisksSummaryTab(storNodeInfo);
                    } else if (selTab == 'Monitor') {
                        populateMonitorTab(storNodeInfo);
                    } else if (selTab == 'Details') {
                        populateDetailsTab(storNodeInfo);
                    }
                }
            });
        }
        if (obj['tab'] != '' && obj['tab'] != 'details') {
            selectTab(storNodeTabStrip, storNodeTabs.indexOf(obj['tab'].split(':')[0]));
            if (obj['tab'].split(':')[0] == 'disks') {
                populateDisksSummaryTab(obj);
            } else if (obj['tab'].split(':')[0] == 'monitor') {
                populateMonitorTab(obj);
            }
        } else {

            var tabIdx = $.inArray(obj['tab'], storageNodeTabs);
            //If any tab is stored in URL,select it else select the first tab
            if (tabIdx == -1)
                tabIdx = 0;
            selectTab(storNodeTabStrip, tabIdx);
            populateDetailsTab(storNodeInfo);
        }
    }

    this.processOSDAlerts = function(obj) {
        var alertsList = [];
        var infoObj = {
            name: obj['name'],
            type: 'Storage Node',
            ip: obj['ip']
        };
        if (obj['isDiskDown'] == true)
            alertsList.push($.extend({}, {
                sevLevel: sevLevels['WARNING'],
                msg: infraAlertMsgs['DISK_DOWN']
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

    function populateDisksTab(obj) {
        if (!isInitialized('#storage-disks-tabstrip')) {
            $("#storage-disks-tabstrip").contrailTabs({
                activate: function(e, ui) {
                    var selTab = ui.newTab.context.innerText;
                    if (selTab == 'Summary') {
                        populateDisksSummaryTab(storNodeInfo);
                    } else if (selTab == 'Details') {
                        populateDiskDetailsTab(storNodeInfo);
                    }
                }
            });
        }

        if (obj['tab'].split(':')[1] == 'summary' || obj['tab'].split(':')[1] == null) {
            populateDisksSummaryTab(obj);
        } else {
            populateDiskDetailsTab(obj);
        }
    }

    function populateDisksSummaryTab(obj) {
        //selectTab(storNodeDisksTabStrip,storNodeDisksTabs.indexOf('summary'));
        layoutHandler.setURLHashParams({
            tab: 'disks:summary',
            node: 'Storage Nodes:' + obj['name']
        }, {
            triggerHashChange: false
        });
        $.ajax({
            url: contrail.format(monitorInfraStorageUrls['STORAGENODE_DETAILS'], obj['name'])
        }).done(function(response) {
            var osds = response.host_details.osds;
            var hostname = obj['name'];
            var osdArr = [];
            var osdsDV = new ContrailDataView();
            var statusTemplate = contrail.getTemplate4Id("storage-status-template");
            $.each(osds, function(idx, osd) {
                if (osd.kb) {
                    osd.avail_percent = parseFloat(((osd.kb_avail / osd.kb) * 100).toFixed(2));
                    osd.gb = formatBytes(osd.kb * 1024);
                    osd.gb_avail = formatBytes(osd.kb_avail * 1024);
                    osd.gb_used = formatBytes(osd.kb_used * 1024);
                } else {
                    osd.gb = 'N/A';
                    osd.gb_used = 'N/A';
                    osd.gb_avail = 'N/A';
                    osd.avail_percent = 'N/A';
                }
                osd.hostname = hostname;

                osd.status_tmpl = "<span> " + statusTemplate({
                    sevLevel: sevLevels['NOTICE'],
                    sevLevels: sevLevels
                }) + " up</span>";
                if (osd.status == 'down')
                    osd.status_tmpl = "<span> " + statusTemplate({
                        sevLevel: sevLevels['ERROR'],
                        sevLevels: sevLevels
                    }) + " down</span>";
                osd.cluster_status_tmpl = "<span> " + statusTemplate({
                    sevLevel: sevLevels['INFO'],
                    sevLevels: sevLevels
                }) + " in</span>";
                if (osd.cluster_status == 'out')
                    osd.cluster_status_tmpl = "<span> " + statusTemplate({
                        sevLevel: sevLevels['WARNING'],
                        sevLevels: sevLevels
                    }) + " out</span>";

                if(osd.ceph_crush_name == 'default') {
                    osd.disk_pool = pools_name['DEFAULT'];
                } else if(osd.ceph_crush_name == 'hdd') {
                    osd.disk_pool = pools_name['HDD'];
                } else if(osd.ceph_crush_name == 'ssd') {
                    osd.disk_pool = pools_name['SSD'];
                } else {
                    osd.disk_pool = "N/A"
                }

                osdArr.push(osd);
            });

            $("#gridDisksDash").contrailGrid({

                header: {
                    title: {
                        text: 'Summary',
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
                        name: "Disk",
                        events: {
                            onClick: function(e, dc) {
                                onDisksRowSelChange(dc);
                            }
                        },
                        cssClass: 'cell-hyperlink-blue',
                        minWidth: 40
                    }, {
                        field: "disk_pool",
                        name: "Pool",
                        minWidth: 200
                    }, {
                        field: "gb",
                        name: "Total",
                        minWidth: 100
                    }, {
                        field: "gb_used",
                        name: "Used",
                        minWidth: 100
                    }, {
                        field: "avail_percent",
                        name: "Available %",
                        minWidth: 100
                    }]
                },
                body: {
                    options: {
                        autoHeight: true,
                        lazyLoading: true,
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
                                        value: dc['hostname']
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
                                    var moreLink = '#p=mon_storage_disks&q[tab]=details:' + dc['name'] + '&q[node]=' + dc['hostname'];
                                    var detailsTmpl = contrail.getTemplate4Id('storage-grid-details-template');
                                    $(e.detailRow).html(detailsTmpl({
                                        d: detailsInfo,
                                        detailLink: moreLink
                                    }));
                                    $("#gridDisksDash").data('contrailGrid').adjustDetailRowHeight(dc.cgrid);
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
                            onDataUpdateCB: function() {
                                var dvGrid = $("#gridDisksDash").data('contrailGrid');
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
                            pageSize: 10,
                            pageSizeSelect: [5, 10, 50]
                        }
                    }
                }
            });

            if(osdArr.length != 0) {
                osdsDV.setData(osdArr);
            }


        }).fail(function(result) {

        });

        function onDisksRowSelChange(dc) {
            layoutHandler.setURLHashParams({
                tab: 'details:' + dc['name'],
                node: obj['name']
            }, {
                p: 'mon_storage_disks'
            }, {
                triggerHashChange: true
            });
        }


    }

    function populateDiskDetailsTab(obj) {
        var deferredObj = $.Deferred();
        selectTab(storNodeDisksTabStrip, storNodeDisksTabs.indexOf('details'));

        if (obj['tab'] == "" || obj['tab'].split(':')[0] == null) {
            $.ajax({
                url: contrail.format(monitorInfraStorageUrls['STORAGENODE_DETAILS'], obj['name'])
            }).done(function(response) {
                var osds = response.host_details.osds;
                obj['tab'] = 'disks:details:' + osds[0].name;
                deferredObj.resolve();
            });
        } else {
            deferredObj.resolve();
        }

        deferredObj.done(function() {
            layoutHandler.setURLHashParams({
                tab: obj['tab'],
                node: 'Storage Nodes:' + obj['name']
            }, {
                triggerHashChange: false
            });
            var osdName = obj['tab'].split(':')[2];
            var diskDashTemplate = contrail.getTemplate4Id('dashboard-template');
            $('#disk-dashboard').html(diskDashTemplate({
                title: 'Disk',
                colCount: 2,
                showSettings: true,
                widgetBoxId: 'diskDash'
            }));
            startWidgetLoading('diskDash');
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

    function populateMonitorTab(obj) {
        layoutHandler.setURLHashParams({
            tab: 'Monitor',
            node: 'Storage Nodes:' + obj['name']
        }, {
            triggerHashChange: false
        });
    }

    function populateDetailsTab(obj) {
        layoutHandler.setURLHashParams({
            tab: 'details',
            node: 'Storage Nodes:' + obj['name']
        }, {
            triggerHashChange: false
        });
        var dashboardTemplate = contrail.getTemplate4Id('dashboard-template');
        $('#storagenode-dashboard').html(dashboardTemplate({
            title: 'Storage Node',
            colCount: 2,
            showSettings: true,
            widgetBoxId: 'dashboard'
        }));
        $('#storage-sparklines-box .widget-header').initWidgetHeader({
            title: 'Disks',
            widgetBoxId: 'storageSparklines'
        });
        startWidgetLoading('dashboard');
        $.ajax({
            url: contrail.format(monitorInfraStorageUrls['STORAGENODE_DETAILS'], obj['name'])
        }).done(function(response) {
            var storNodeData = response.host_details;
            var noDataStr = "--";
            var noMonitor = "N/A",
                storNodeDashboardInfo;

            storNodeData['osds_total'] = 0;
            storNodeData['osds_used'] = 0;
            $.each(storNodeData.osds, function(idx, osd) {
                if (osd.hasOwnProperty('kb') && osd.hasOwnProperty('kb_used')) {
                    storNodeData['osds_total'] += osd.kb;
                    storNodeData['osds_used'] += osd.kb_used;
                }
            });

            storNodeDashboardInfo = [{
                lbl: 'Hostname',
                value: obj['name']
            }, {
                lbl: 'IP Address',
                value: (function() {
                    try {
                        var ip = ifNullOrEmpty(storNodeData['ip'], noDataStr);
                        return ip;
                    } catch (e) {
                        return noDataStr;
                    }
                })()
            }, {
                lbl: 'Status',
                value: storNodeData['status'] != '-' ? storNodeData['status'] : noDataStr
            }, {
                lbl: 'Disks',
                value: ' '
            }, {
                lbl: INDENT_RIGHT + 'Total',
                value: storNodeData['osds'].length
            }, {
                lbl: INDENT_RIGHT + 'Total Space',
                value: formatBytes(storNodeData['osds_total'] * 1024)
            }, {
                lbl: INDENT_RIGHT + 'Used',
                value: formatBytes(storNodeData['osds_used'] * 1024)
            }, {
                lbl: 'Monitor',
                value: (function() {
                    try {
                        var mntr = ifNullOrEmpty(storNodeData['monitor'], noDataStr);
                        if (mntr['health']) {
                            var monHealth = storNodeData.monitor.health;
                            var statusTmpl = contrail.getTemplate4Id('storage-status-template');
                            if (monHealth == 'HEALTH_OK')
                                return "<span> " + statusTmpl({
                                    sevLevel: sevLevels['INFO'],
                                    sevLevels: sevLevels
                                }) + " ok</span>";
                            else if (monHealth == 'HEALTH_WARN')
                                return "<span> " + statusTmpl({
                                    sevLevel: sevLevels['WARNING'],
                                    sevLevels: sevLevels
                                }) + " warn</span>";
                            else if (monHealth == 'HEALTH_CRIT')
                                return "<span> " + statusTmpl({
                                    sevLevel: sevLevels['ERROR'],
                                    sevLevels: sevLevels
                                }) + " critical</span>";
                            else
                                return 'N/A';
                        }
                        return noMonitor
                    } catch (e) {
                        return noMonitor;
                    }
                })
            }];
            var dashboardBodyTemplate = Handlebars.compile($("#dashboard-body-template").html());
            $('#dashboard-box .widget-body').html(dashboardBodyTemplate({
                colCount: 2,
                d: storNodeDashboardInfo,
                nodeData: storNodeData,
                showSettings: true
            }));
            endWidgetLoading('dashboard');

            var osds = storNodeData['osds'];

            var retArr = [],
                xvals = [],
                yvals = [],
                clusterSeries = [],
                statusSeries = [],
                upCnt = 0,
                downCnt = 0,
                inCnt = 0,
                outCnt = 0;

            $.each(osds, function(idx, osd) {
                osd['x'] = parseFloat((100 -((osd.kb_avail / osd.kb) * 100)).toFixed(2));
                if (!cowu.isEmptyObject(osd['avg_bw'])){
                    if($.isNumeric(osd['avg_bw']['reads_kbytes']) && $.isNumeric(osd['avg_bw']['writes_kbytes'])){
                        osd['y'] = (osd['avg_bw']['reads_kbytes'] + osd['avg_bw']['writes_kbytes']) * 1024;
                        osd['tot_avg_bw'] = formatBytes(osd['y']);
                        osd['avg_bw']['read'] = formatBytes(osd['avg_bw']['reads_kbytes'] * 1024);
                        osd['avg_bw']['write'] = formatBytes(osd['avg_bw']['writes_kbytes'] * 1024);
                    } else {
                        osd['tot_avg_bw'] = 'N/A';
                        osd['y'] = 'N/A';
                        osd['avg_bw']['read'] = 'N/A';
                        osd['avg_bw']['write'] = 'N/A';
                    }
                }

                osd['available_perc'] = $.isNumeric(osd['x']) ? osd['x'] : 'N/A';
                osd['total'] = osd.hasOwnProperty('kb') ? formatBytes(osd.kb * 1024) : 'N/A';
                osd['size'] = 1;
                osd['shape'] = 'circle';
                osd['type'] = 'disk';
                osd['display_type'] = 'Disk';
                osd['name'] = osd.name;
                osd['hostname'] = obj['name'];
                osd['isPartialUveMissing'] = false;
                osd['color'] = getOSDColor(osd);
                osd['downNodeCnt'] = 0;
                osd['nodeAlerts'] = self.processOSDAlerts(osd);
                osd['alerts'] = osd['nodeAlerts'].sort(dashboardUtils.sortInfraAlerts);
                if (!isNaN(osd['x']))
                    xvals.push(osd['x']);
                if (!isNaN(osd['y']))
                    yvals.push(osd['y']);
                retArr.push(osd);

                if (osd.status == 'up')
                ++upCnt;
                else if (osd.status == 'down')
                ++downCnt;
                if (osd.cluster_status == 'in')
                ++inCnt;
                else if (osd.cluster_status == 'out')
                ++outCnt;
            });
            /*
             in some cases when osd is down kb info is not coming in API.
             to avoid chart display getting distorted, we are setting x,y axis to
             the min values of series and tooltip info is returned to --
             */
            var xscale = d3.extent(xvals);
            xscale[1] = (xscale[1] >= 95.5) ? 100.00 : xscale[1] + 0.5;
            var yscale = d3.extent(yvals);

            $.each(retArr, function(idx, osd) {
                if (isNaN(osd.x))
                    osd.x = xscale[0];
                if (isNaN(osd.y))
                    osd.y = yscale[0];
            });
            retArr.sort(dashboardUtils.sortNodesByColor);
            initDeferred({
                renderFn: 'initScatterChart',
                selector: $('#disks-bubble'),
                parseFn: function(response) {
                    return {
                        title: 'Disks',
                        chartOptions: {
                            xLbl: 'Used (%)',
                            xLblFormat: d3.format('.02f'),
                            yLbl: 'Avg 30 Min BW (Read + Write) ',
                            forceX: xscale,
                            yDataType: 'bytes',
                            xPositive: true,
                            tooltipFn: storageChartUtils.diskTooltipFn,
                            clickFn: storageChartUtils.onDiskDrillDown,
                            addDomainBuffer: true
                        },
                        d: [{
                            key: 'Disks',
                            values: retArr
                        }]
                    };
                }
            });

            var keys = [
                [{
                    'key': 'IN'
                }, {
                    'values': [{
                        'label': 'Cluster Status'
                    }, {
                        'value': inCnt
                    }]
                }],
                [{
                    'key': 'OUT'
                }, {
                    'values': [{
                        'label': 'Cluster Status'
                    }, {
                        'value': outCnt
                    }]
                }]
            ];
            clusterSeries.push(keys);
            keys = [
                [{
                    'key': 'UP'
                }, {
                    'values': [{
                        'label': 'Status'
                    }, {
                        'value': upCnt
                    }]
                }],
                [{
                    'key': 'DOWN'
                }, {
                    'values': [{
                        'label': 'Status'
                    }, {
                        'value': downCnt
                    }]
                }]
            ];
            statusSeries.push(keys);

            $('#storDiskUpDown').html(function() {
                var content = '';
                content = content + '<span style="color: ' + d3Colors['blue'] + ';">' + upCnt + ' up </span> , ';
                if (outCnt > 0)
                    content = content + '<span style="color: ' + d3Colors['red'] + ';">' + downCnt + ' down</span>';
                else
                    content = content + '<span>' + downCnt + ' down</span>';
                return content;
            });
            $('#storDiskInOut').html(function() {
                var content = '';
                content = content + '<span style="color: ' + d3Colors['green'] + ';">' + inCnt + ' in </span> , ';
                if (outCnt > 0)
                    content = content + '<span style="color: ' + d3Colors['orange'] + ';">' + outCnt + ' out </span>';
                else
                    content = content + '<span>' + outCnt + ' out </span>';
                return content;
            });
            endWidgetLoading('storageSparklines');
        });

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


}

function drawDisksBarChart(selector, data, chart, chartOptions) {

    nv.addGraph(function() {
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
            .height(65)
            .showValues(false)
            .tooltips(true)
            .stacked(false)
            .showControls(false);


        chart.yAxis.tickFormat(d3.format('.0f'));

        $(selector).append('<svg></svg>');
        console.log($(selector), data.length);

        /*
         chart.dispatch.on('stateChange', chartOptions['stateChangeFunction']);
         chart.scatter.dispatch.on('elementClick', chartOptions['elementClickFunction']);
         chart.scatter.dispatch.on('elementMouseout',chartOptions['elementMouseoutFn']);
         chart.scatter.dispatch.on('elementMouseover',chartOptions['elementMouseoverFn']);
         */
        if (!($(selector).is(':visible'))) {
            $(selector).find('svg').bind("refresh", function() {
                d3.select($(selector)[0]).select('svg').datum(data).call(chart);
            });
        } else {
            console.log("holaaa");
            d3.select($(selector)[0]).select('svg').datum(data).call(chart);
        }

        nv.utils.windowResize(function() {
            chUtils.updateChartOnResize(selector, chart);

            return chart;
        });

    });
}


storNodesView = new storageNodesView();
storNodeView = new storageNodeView();