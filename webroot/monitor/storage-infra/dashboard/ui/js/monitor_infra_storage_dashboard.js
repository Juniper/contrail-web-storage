/**
 * Storage Nodes Tab
 */

var infraMonitorStorageDashView = (function() {
    var self = this;
    this.load = function(obj) {
        var hashParams = ifNull(obj['hashParams'], {});
        addStorageTabs();
        infraDashboardView.selectTabByHash();
    }
    return {
        load: self.load
    }
})();

function addStorageTabs() {
    /**
     * Storage Nodes Tab
     */
    storNodesDashboardTab = (function() {
        var storageNodesViewModel = function() {
            var self = this;
            self.data = ko.observableArray([]);
            self.downCnt = ko.computed(function() {
                return infraMonitorStorageUtils.getDownNodeCnt(self.data());
            });
            self.upCnt = ko.computed(function() {
                /*
                * parsed data includes cluster wide health data and this is not a node level info.
                * total count of storagenodes = self.data() - 1
                * Only subtract 1 if the array length is > 0 otherwise infobox will show -1 on 0 storage nodes.
                 */
                var nodeCnt = self.data().length;
                if (nodeCnt != 0)
                    nodeCnt -= 1;
                return (nodeCnt - self.downCnt());
            });
            self.totalCnt = ko.computed(function() {
                return self.upCnt() === '' ? '' : self.upCnt() + self.downCnt();
            });
        }
        var viewModel = new storageNodesViewModel();
        viewModel.data.subscribe(function(newValue) {
            updateView(newValue);
        })

        var updateView = function(data) {
            var nodeData = $.map(data, function(val, idx) {
               if (val['name'] != 'CLUSTER_HEALTH')
                    return val;
            });
            var chartObj = {};
            var chartsData = {
                title: 'Storage Nodes',
                chartOptions: {
                    xLbl: 'Used (%)',
                    xLblFormat: d3.format('.02f'),
                    yLbl: 'Avg 30 Min BW (Read + Write)',
                    yDataType: 'bytes',
                    xPositive: true,
                    tooltipFn: storageChartUtils.storageNodeTooltipFn,
                    clickFn: function(chartConfig) {
                        var storageNodeFQN = chartConfig['name'];
                        var hashObj = {
                            type: "storagenode",
                            view: "details",
                            focusedElement: {
                                fqName: storageNodeFQN,
                                type: 'storagenode'
                            }
                        };
                        layoutHandler.setURLHashParams(hashObj, {p: "monitor_infra_storage", merge: false, triggerHashChange: true});
                    },
                    addDomainBuffer: true
                },
                d: [{
                    key: 'Storage Nodes',
                    values: nodeData
                }]
            };

            if (!storageChartsInitializationStatus['storageDashboard']) {
                $('#storageNodeStats-header').initWidgetHeader({
                    title: 'Storage Nodes',
                    link: {
                        hashParams: {
                            p: 'mon_infra_storage',
                            q: {
                                node: 'Storage Nodes'
                            }
                        }
                    }
                });
                $('#storageNode-bubble').initScatterChart(chartsData);
                storageChartsInitializationStatus['storageDashboard'] = true;
            } else {
                nodeData = updateCharts.setUpdateParams(nodeData);
                chartObj['selector'] = $('#content-contailner').find('#storageNode-bubble > svg').first()[0];
                chartObj['data'] = [{key: 'storageNode', values: nodeData}];
                chartObj['type'] = 'infrabubblechart';
                updateCharts.updateView(chartObj);
            }
            self.updateStorageInfoBoxes(data);
        }

        this.updateStorageInfoBoxes = function(data) {

            var nodeData = [],
                totMonCnt = 0,
                totActiveMonCnt = 0;

            $.map(data, function(val, idx) {
                if (val['name'] != 'CLUSTER_HEALTH') {
                    nodeData.push(val);
                } else {
                    totMonCnt = val['monitor_count'];
                    totActiveMonCnt = val['monitor_active'];
                }
            });

            var diskBuckets,
                monBuckets,
                diskCnt = 0,
                monCnt = 0;

            var storageCF = crossfilter(nodeData);
            $.each(nodeData, function(idx, obj) {
                diskCnt += obj['osds'].length;
                obj.diskCnt = obj['osds'].length;
                if (obj.hasOwnProperty('monitor')) {
                    if (!isEmptyObject(obj['monitor']) && obj['monitor'] != "Not Available") {
                        monCnt += 1;
                        obj['monCnt'] = 1;
                    } else {
                        obj['monCnt'] = 0;
                    }
                }
            });
            diskBuckets = bucketizeCFData(storageCF, function(d) {
                return d.diskCnt
            });
            monBuckets = bucketizeCFData(storageCF, function(d) {
                return d.monCnt;
            })
            var sparklinesStorData = {
                disks: {
                    title: 'Disks',
                    data: []
                },
                mons: {
                    title: 'Monitor',
                    data: []
                }
            };

            $.each(ifNull(diskBuckets['data'], []), function(key, val) {
                sparklinesStorData['disks']['data'].push(val);
            });

            $.each(ifNull(monBuckets['data'], []), function(key, val) {
                sparklinesStorData['mons']['data'].push(val);
            });

            $('#sparkLineStorageStats').html('');
            var sparkLineTemplate = contrail.getTemplate4Id('sparkline-template');
            var diskElem = $('<div></div>').html(sparkLineTemplate({
                title: 'Disks',
                totalCnt: diskCnt,
                id: 'infobox-disks'
            }));

            var sparkLineMonTemplate = contrail.getTemplate4Id('sparkline-monitor-template');
            var monElem = $('<div></div>').html(sparkLineMonTemplate({
                title: monCnt > 1 ? 'Monitors':'Monitor',
                totalCnt: monCnt,
                monOnlyCnt: totActiveMonCnt - monCnt,
                downCnt: totMonCnt - totActiveMonCnt,
                id: 'infobox-mons'
            }));

            $('#sparkLineStorageStats').append(diskElem);
            $('#sparkLineStorageStats').append(monElem);

            $.each(sparklinesStorData, function(key, val) {
                drawSparkLineBar('#infobox-' + key + ' .sparkline', val);
            })

            d3.select('#infobox-disks .sparkline')
                .selectAll("rect")
                .on("mouseover", function(d, i) {
                    $('body').find('.nvtooltip').remove();
                    var div = d3.select('body').append("div")
                        .attr("class", "nvtooltip");

                    div.transition().duration(10);

                    div.html('<span class="lbl">' +
                        '{0:</span> Host;</span> Hosts}'.newFormat(d.value) + ' with <span class="lbl">' +
                        d.name + '</span> ' + sparklinesStorData.disks.title)
                        .style("left", (d3.event.pageX) + "px")
                        .style("top", (d3.event.pageY - 28) + "px");
                })
                .on("mouseout", function(d) {
                    $('body').find('.nvtooltip').remove();
                });

            d3.select('#infobox-mons .sparkline')
                .selectAll("rect")
                .on("mouseover", function(d, i) {
                    $('body').find('.nvtooltip').remove();
                    var div = d3.select('body').append("div")
                        .attr("class", "nvtooltip");

                    div.transition().duration(10);

                    div.html('<span class="lbl">' +
                        '{0:</span> Host;</span> Hosts}'.newFormat(d.value) + ' with <span class="lbl">' +
                        ('{0:</span> ' + sparklinesStorData.mons.title + ';</span> ' +
                        sparklinesStorData.mons.title + 's }').newFormat(d.name))
                        .style("left", (d3.event.pageX) + "px")
                        .style("top", (d3.event.pageY - 28) + "px");
                })
                .on("mouseout", function(d) {
                    $('body').find('.nvtooltip').remove();
                });

            if($('#infoboxMonOnlyCnt').length) {
                $('#infoboxMonCnt, #infoboxMonOnlyCnt').hover(
                    function(event) {
                        $('body').find('.nvtooltip').remove();
                        var div = d3.select('body').append("div")
                            .attr("class", "nvtooltip");
                        div.transition().duration(10);

                        var content = "Storage Node with Monitor";

                        if (event.target.id == 'infoboxMonOnlyCnt')
                            content = "Monitor only Node";

                        div.html('<span class="lbl">' + content +'</span>')
                            .style("left", (event.pageX) + "px")
                            .style("top", (event.pageY - 50) + "px");

                    }, function() {
                        $('body').find('.nvtooltip').remove();
                    }
                );
            }

            if($('#infoboxMonDownCnt').length) {
                $('#infoboxMonDownCnt').hover(
                    function(event) {
                        $('body').find('.nvtooltip').remove();
                        var div = d3.select('body').append("div")
                            .attr("class", "nvtooltip");
                        div.transition().duration(10);

                        var content = "Monitor Down. Check alerts for more details..";

                        div.html('<span class="lbl">' + content +'</span>')
                            .style("left", (event.pageX) + "px")
                            .style("top", (event.pageY - 50) + "px");

                    }, function() {
                        $('body').find('.nvtooltip').remove();
                    }
                );
            }

        }

        infraDashboardView.addInfoBox({
            title: 'Storage Nodes',
            dataSourceObj: 'storageNodeDS',
            template: 'storageNode-dashboard-tab',
            viewModel: viewModel,
            tabId: 'storageNode'
        });

    }());
}