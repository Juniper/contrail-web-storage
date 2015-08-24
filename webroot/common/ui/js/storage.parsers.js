/*
 * Copyright (c) 2015 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore'
], function (_) {
    var SParsers = function () {
        var self = this;

        this.storagenodeDataParser = function (response) {
            var retArr = [], def_topology = {};

            // with multi-backend support, there are different topology output in response.
            // currently only using 'default' type which is the common pool.
            $.each(response.topology, function (idx, topology) {
                if (topology['name'] == 'default') {
                    def_topology = topology;
                } else {
                    def_topology['hosts'] = [];
                }
            });

            $.each(def_topology.hosts, function (idx, host) {
                var obj = {};
                obj['rawData'] = $.extend(true, {}, host);
                obj['available_perc'] = $.isNumeric(host['avail_percent']) ? host['avail_percent'].toFixed(2) : '-';
                obj['total'] = formatBytes(host['kb_total'] * 1024);
                obj['size'] = 1;
                obj['shape'] = 'circle';
                obj['type'] = 'storageNode';
                obj['display_type'] = 'Storage Node';
                obj['name'] = host['name'];
                obj['isPartialUveMissing'] = false;
                obj['osds'] = host['osds'];
                obj['osds_count'] = obj['osds'].length;
                obj['osds_total'] = 0;
                obj['osds_used'] = 0;
                obj['osds_up'] = 0;
                obj['osds_down'] = 0;
                obj['osds_in'] = 0;
                obj['osds_out'] = 0;
                obj['tot_avg_bw'] = 0;
                obj['tot_avg_read_kb'] = 0;
                obj['tot_avg_write_kb'] = 0;
                $.each(host.osds, function (idx, osd) {
                    if (osd.hasOwnProperty('kb') && osd.hasOwnProperty('kb_used')) {
                        obj['osds_total'] += osd['kb'] * 1024;
                        obj['osds_used'] += osd['kb_used'] * 1024;
                    }
                    if (!isEmptyObject(osd['avg_bw'])) {
                        if ($.isNumeric(osd['avg_bw']['reads_kbytes']) && $.isNumeric(osd['avg_bw']['writes_kbytes'])) {
                            obj['tot_avg_bw'] += osd['avg_bw']['reads_kbytes'] + osd['avg_bw']['writes_kbytes'];
                            obj['tot_avg_read_kb'] += osd['avg_bw']['reads_kbytes'];
                            obj['tot_avg_write_kb'] += osd['avg_bw']['writes_kbytes'];
                        } else {
                            osd['avg_bw']['read'] = 'N/A';
                            osd['avg_bw']['write'] = 'N/A';
                        }
                    }
                    if (osd['status'] == 'up')
                        ++obj['osds_up'];
                    else if (osd['status'] == 'down')
                        ++obj['osds_down'];
                    if (osd['cluster_status'] == 'in')
                        ++obj['osds_in'];
                    else if (osd['cluster_status'] == 'out')
                        ++obj['osds_out'];
                });
                obj['osds_status'] = "up: " + obj['osds_up'] + ", down: " + obj['osds_down'] + " / in: " + obj['osds_in'] + ", out: " + obj['osds_out'];
                obj['osds_available_perc'] = swu.calcPercent((obj['osds_total'] - obj['osds_used']), obj['osds_total']);
                obj['osds_used_perc'] = 100.00 - obj['osds_available_perc'];
                obj['x'] = parseFloat((100 - obj['osds_available_perc']).toFixed(2));
                obj['y'] = parseFloat(obj['tot_avg_bw'].toFixed(2)) * 1024;
                obj['osds_available'] = formatBytes(obj['osds_total'] - obj['osds_used']) + " (" + obj['osds_available_perc'] + "%)";
                obj['osds_total'] = formatBytes(obj['osds_total']);
                obj['osds_used'] = formatBytes(obj['osds_used']);
                obj['monitor'] = host['monitor'];
                obj['status'] = host['status'];
                //obj['color'] = swu.getStorageNodeColor(host, obj);
                obj['downNodeCnt'] = 0;
                //initialize for alerts
                obj['isDiskDown'] = obj['isDiskOut'] = false;
                obj['nodeAlerts'] = swu.processStorageNodeAlerts(obj);
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
            clusterObj['nodeAlerts'] = swu.processStorageHealthAlerts(response['cluster_status']);
            clusterObj['alerts'] = clusterObj['nodeAlerts'].sort(dashboardUtils.sortInfraAlerts);
            clusterObj['processAlerts'] = [];
            /*
             * total monitor count to display on the infobox.
             * this includes monitor only and storage + monitor nodes.
             */
            clusterObj['monitor_count'] = response['cluster_status']['monitor_count'];
            clusterObj['monitor_active'] = response['cluster_status']['monitor_active'];
            //adding clusterObj to the top of the returned array
            //retArr.unshift(clusterObj);

            retArr.sort(dashboardUtils.sortNodesByColor);
            return retArr;
        };

        this.diskDataParser = function (response) {
            var osdObj = response,
                statusTemplate = contrail.getTemplate4Id("disk-status-template");

            osdObj.rawData = $.extend(true, {}, osdObj);
            //osdObj.skip_osd_bubble = false;
            osdObj.public_addr = swu.formatIpPort(osdObj.public_addr);
            if (osdObj.kb) {
                osdObj.available_perc = swu.calcPercent(osdObj.kb_avail, osdObj.kb);
                osdObj.used_perc = 100.00 - osdObj.available_perc;
                osdObj.x = parseFloat(100 - osdObj.available_perc);
                osdObj.gb = swu.kiloByteToGB(osdObj.kb);
                osdObj.total = formatBytes(osdObj.kb * 1024);
                osdObj.used = formatBytes(osdObj.kb_used * 1024);
                osdObj.available = formatBytes(osdObj.kb_avail * 1024) + " (" + osdObj.available_perc + "%)";
                osdObj.gb_used = swu.kiloByteToGB(osdObj.kb_used);
                osdObj.color = swu.getDiskColorByStatus(osdObj);
                osdObj.shape = 'circle';
                osdObj.size = 1;
            } else {
                //osdObj.skip_osd_bubble = true;
                osdObj.gb = 'N/A';
                osdObj.total = 'N/A';
                osdObj.used = 'N/A';
                osdObj.gb_used = 'N/A';
                osdObj.available = 'N/A';
                osdObj.available_perc = 'N/A';
                osdObj.x = 'N/A';
            }

            if(!isEmptyObject(osdObj.fs_perf_stat)) {
                osdObj.apply_latency = osdObj.fs_perf_stat.apply_latency_ms + " ms";
                osdObj.commit_latency = osdObj.fs_perf_stat.commit_latency_ms + " ms";
            }

            if (!isEmptyObject(osdObj.avg_bw)) {
                if ($.isNumeric(osdObj.avg_bw.reads_kbytes) && $.isNumeric(osdObj.avg_bw.writes_kbytes)) {
                    osdObj.y = (osdObj.avg_bw.reads_kbytes + osdObj.avg_bw.writes_kbytes) * 1024;
                    osdObj.tot_avg_bw = formatBytes(osdObj.y);
                    osdObj.avg_bw.read = formatBytes(osdObj.avg_bw.reads_kbytes * 1024);
                    osdObj.avg_bw.write = formatBytes(osdObj.avg_bw.writes_kbytes * 1024);
                } else {
                    osdObj.tot_avg_bw = 'N/A';
                    osdObj.y = 0;
                    osdObj.avg_bw.read = 'N/A';
                    osdObj.avg_bw.write = 'N/A';
                }
            }

            // osd status template UP/DOWN
            osdObj.status_tmpl = "<span> " + statusTemplate({
                sevLevel: sevLevels['NOTICE'],
                sevLevels: sevLevels
            }) + " up</span>";

            if (osdObj.status == 'down')
                osdObj.status_tmpl = "<span> " + statusTemplate({
                    sevLevel: sevLevels['ERROR'],
                    sevLevels: sevLevels
                }) + " down</span>";

            // osd cluster membership template IN?OUT
            osdObj.cluster_status_tmpl = "<span> " + statusTemplate({
                sevLevel: sevLevels['INFO'],
                sevLevels: sevLevels
            }) + " in</span>";

            if (osdObj.cluster_status == 'out')
                osdObj.cluster_status_tmpl = "<span> " + statusTemplate({
                    sevLevel: sevLevels['WARNING'],
                    sevLevels: sevLevels
                }) + " out</span>";

            return osdObj;
        };

        this.disksDataParser = function (response) {
            var formattedResponse = [], osdErrArr = [],
                osdChartArr = [], osdArr = [],
                osdUpInArr = [], osdDownArr = [],
                osdUpOutArr = [], skip_osd_bubble = new Boolean(),
                osds;

            if (response != null) {
                osds = response.osds;
                $.each(osds, function (idx, osdObj) {
                    osdObj = self.diskDataParser(osdObj);
                    // Add to OSD scatter chart data of flag is not set
                    //if (!osdObj.skip_osd_bubble) {
                        if (osdObj.status == "up") {
                            if (osdObj.cluster_status == "in") {
                                osdUpInArr.push(osdObj);
                            } else if (osdObj.cluster_status == "out") {
                                osdUpOutArr.push(osdObj);
                            } else {
                            }
                        } else if (osdObj.status == "down") {
                            osdDownArr.push(osdObj);
                        } else {
                        }
                    //} else {
                    //    osdErrArr.push(osdObj.name);
                    //}
                    // All OSDs data should be pushed here for List grid
                    osdArr.push(osdObj);
                });

                var upInGroup = {}, upOutGroup = {}, downGroup = {};

                //UP & IN OSDs
                upInGroup.key = "UP & IN ";
                upInGroup.values = osdUpInArr;
                upInGroup.color = swc.DISK_OKAY_COLOR;
                osdChartArr.push(upInGroup);

                //UP & OUT OSDs
                upOutGroup.key = "UP & OUT";
                upOutGroup.values = osdUpOutArr;
                upOutGroup.color = swc.DISK_WARNING_COLOR;
                osdChartArr.push(upOutGroup);

                //Down OSDs
                downGroup.key = "Down";
                downGroup.values = osdDownArr;
                downGroup.color = swc.DISK_ERROR_COLOR;
                osdChartArr.push(downGroup);
            }

            formattedResponse.push({
                disksGrid: osdArr,
                disksChart: osdChartArr,
                disksError: osdErrArr
            });

            return osdArr;
        };

        this.disksStatusDonutChartDataParser = function (response) {
            var retArr = [];
            if (response != null) {
                var output = response.osd_stat.output;
                retArr.push({
                    label: "Up",
                    value: output.num_up_osds,
                    color: d3Colors.blue
                });
                retArr.push({
                    label: "Down",
                    value: output.num_down_osds,
                    color: d3Colors.red
                });
                retArr.push({
                    label: "In",
                    value: output.num_in_osds,
                    color: d3Colors.green
                });
                retArr.push({
                    label: "Out",
                    value: output.num_out_osds,
                    color: d3Colors.orange
                });
            }
            return retArr;
        };

        this.diskActivityStatsParser = function (response) {
            var readThrptData = {
                    values: [],
                    key: 'Read',
                    color: d3_category5[1]
                },
                writeThrptData = {
                    values: [],
                    key: 'Write',
                    color: d3_category5[0]
                },
                readIopsData = {
                    values: [],
                    key: 'Read',
                    color: d3_category5[1]
                },
                writeIopsData = {
                    values: [],
                    key: 'Write',
                    color: d3_category5[0]
                },
                readLatData = {
                    values: [],
                    key: 'Read',
                    color: d3_category5[1]
                },
                writeLatData = {
                    values: [],
                    key: 'Write',
                    color: d3_category5[0]
                };

            if (response != null && response.hasOwnProperty('flow-series')) {
                $.each(response['flow-series'], function (idx, sample) {
                    var ts = Math.floor(sample['MessageTS'] / 1000);
                    //Throughput Data
                    readThrptData.values.push({
                        'x': ts,
                        'y': sample['reads_kbytes'] * 1024
                    });
                    writeThrptData.values.push({
                        'x': ts,
                        'y': sample['writes_kbytes'] * 1024
                    });

                    //IOPS Data
                    readIopsData.values.push({
                        'x': ts,
                        'y': sample['reads']
                    });
                    writeIopsData.values.push({
                        'x': ts,
                        'y': sample['writes']
                    });

                    //Latency Data
                    readLatData.values.push({
                        'x': ts,
                        'y': sample['op_r_latency']
                    });
                    writeLatData.values.push({
                        'x': ts,
                        'y': sample['op_w_latency']
                    });
                });
            }

            var retThrptData = [readThrptData, writeThrptData],
                retIopsData = [readIopsData, writeIopsData],
                retLatData = [readLatData, writeLatData];

            return [retThrptData, retIopsData, retLatData];
        };

        this.diskActivityThrptLineChartDataParser = function (responseArray) {
            if (responseArray.length == 0) {
                return [];
            } else {
                return responseArray[0];
            }
        };

        this.diskActivityThrptIOPsLineBarChartDataParser = function (responseArray) {
            if (responseArray.length == 0) {
                return [];
            } else {
                var thrptWrite = {key: "Throughput Write", values: [], color: d3_category5[2]},
                    thrptRead = {key: "Throughput Read", values: [], color: d3_category5[3]},
                    iopsWrite = {key: "IOPs Write", values: [], bar: true, color: d3_category5[0]},
                    iopsRead = {key: "IOPs Read", values: [], bar: true, color: d3_category5[1]},
                    chartData = [thrptWrite, thrptRead, iopsWrite, iopsRead];

                $.each(responseArray[0], function (idx, thrpt) {
                    if (thrpt.key == 'Read') {
                        thrptRead.values = thrpt.values;
                    } else if (thrpt.key == 'Write') {
                        thrptWrite.values = thrpt.values;
                    } else {
                    }
                });

                $.each(responseArray[1], function (idx, iops) {
                    if (iops.key == 'Read') {
                        iopsRead.values = iops.values;
                    } else if (iops.key == 'Write') {
                        iopsWrite.values = iops.values;
                    } else {
                    }
                });
                return chartData;
            }
        };

        this.diskActivityIOPsLineChartDataParser = function (responseArray) {
            if (responseArray.length == 0) {
                return [];
            } else {
                return responseArray[1];
            }
        };

        this.diskActivityLatencyLineChartDataParser = function (responseArray) {
            if (responseArray.length == 0) {
                return [];
            } else {
                return responseArray[2];
            }
        };

        this.diskActivityLatencyLineBarChartDataParser = function (responseArray) {
            if (responseArray.length == 0) {
                return [];
            } else {
                $.each(responseArray[2], function (idx, latency) {
                    if (latency.key == 'Read') {
                        latency.key = "Read Latency";
                    } else if (latency.key == 'Write') {
                        latency.key = "Write Latency";
                    } else {
                    }
                });
                return responseArray[2];
            }
        };

        this.storageMonitorDataParser = function (response) {
            var monObj = response;
            monObj.rawData = $.extend(true, {}, monObj);
            monObj['addr'] = swu.formatIpPort(monObj['addr']);
            monObj['hostNameColor'] = '#D62728';
            monObj['x'] = monObj['kb_total'] * 1024;
            monObj['y'] = 100.00 - monObj['avail_percent'];
            monObj['total'] = formatBytes(monObj['kb_total'] * 1024);
            monObj['used'] = formatBytes(monObj['kb_used'] * 1024);
            monObj['available'] = formatBytes(monObj['kb_avail'] * 1024);
            monObj['avail_percent'] = monObj['avail_percent'] + " %";
            monObj['latency'] = monObj['latency'] + " ms";
            monObj['skew'] = monObj['skew'] + " ms";

            if (String(monObj['health']).valueOf() == "HEALTH_OK") {
                monObj['hostNameColor'] = 'label-success';
            } else if (String(monObj['health']).valueOf() == "HEALTH_WARN") {
                monObj['hostNameColor'] = 'label-warning';
            } else {
                monObj['hostNameColor'] = 'label-info';
            }

            if (monObj['act_health'] == 'HEALTH_WARN') {
                monObj['healthColor'] = 'label-warning';
            } else if (monObj['act_health'] == 'HEALTH_OK') {
                monObj['healthColor'] = 'label-success';
            } else {
                monObj['healthColor'] = 'label-important';
            }

            return monObj;
        };

        this.storageMonitorsDataParser = function (response) {
            var retArr = [];
            if (response != null) {
                var allmons = response['monitors']
                $.each(allmons, function (idx, mon) {
                    mon = self.storageMonitorDataParser(mon);
                    retArr.push(mon);
                });
            }
            return retArr;
        };

        this.poolDataParser = function (response) {
            var poolObj = response;
            poolObj['rawData'] = $.extend(true, {}, poolObj);
            poolObj['x'] = swu.calcPercent(poolObj['stats']['bytes_used'], poolObj['stats']['max_avail']);
            poolObj['y'] = poolObj['stats']['objects'];
            poolObj['used'] = formatBytes(poolObj['stats']['bytes_used']);
            poolObj['max_avail'] = formatBytes(poolObj['stats']['max_avail']);
            poolObj['objects'] = formatNumberByCommas(poolObj['stats']['objects']);
            return poolObj;
        };

        this.poolsDataParser = function (response) {
            var retArr = [];
            if (response != null) {
                $.each(response.pools, function (idx, pool) {
                    pool = self.poolDataParser(pool);
                    retArr.push(pool);
                });
            }
            return retArr;

        };

        this.poolsBarChartDataParser = function (response) {
            var usageKeys = [],
                objectKeys = [],
                replicaArr = [];

            if (response != null) {
                $.each(response, function(idx, pool) {
                    var usageItem = {
                        key: pool['pool_name'],
                        values: [
                            {
                                label: 'Usage',
                                value: pool['stats']['bytes_used'] / pool['size']
                            }
                        ]
                    };
                    usageKeys.push(usageItem);
                    /*
                    var objItem = {
                        key: pool['pool_name'],
                        values: [
                            {
                                label: 'Objects',
                                value: pool['stats']['objects'] / pool['size']
                            }
                        ]
                    };
                    objectKeys.push(objItem);

                    replicaArr.push(pool['size']);
                    */
                });
            }
            //return {usage: usageKeys, objects: objectKeys, replica: replicaArr};
            return usageKeys;
        };

        this.poolsDonutChartDataParser = function (response) {
            var retArr = [];
            if(response != null) {
                $.each(response, function(idx, pool) {
                    retArr.push({
                        label: pool['pool_name'],
                        value: pool['stats']['bytes_used'] / pool['size']
                    });
                });
            }
            return retArr;
        };

        this.clusterReplicaFactorParser = function (response) {
            var replicaArr = [];
            $.each(response.pools, function (idx, pool) {
                replicaArr.push(pool['size']);
            });
            return [getMaxNumericValueInArray(replicaArr)];
        }

        this.clusterUsageDataParser = function (response) {
            var usage = {};
            if (response != null) {
                usage['rawData'] = response;
                var osd_summary = response['usage_summary']['osd_summary'];
                usage['kb'] = osd_summary['kb'];
                usage['kb_used'] = osd_summary['kb_used'];
                usage['kb_avail'] = osd_summary['kb_avail'];
                usage['near_full_ratio'] = parseFloat((osd_summary['near_full_ratio'] * 100).toFixed(2));
                usage['full_ratio'] = parseFloat((osd_summary['full_ratio'] * 100).toFixed(2));
                usage['total_used'] = formatBytes(usage['kb_used'] * 1024);
                usage['total_avail'] = formatBytes(usage['kb_avail'] * 1024);
                usage['total_space'] = formatBytes(usage['kb'] * 1024);
                usage['used_perc'] = parseFloat(swu.calcPercent(usage['kb_used'], usage['kb']));
                return [usage];
            }
        };

        this.clusterUsageWithReplicaFactor = function (usage, clusterReplicaFactor) {
            if (usage != null && clusterReplicaFactor != null) {
                usage = usage[0];
                usage['cluster_replica_factor'] = clusterReplicaFactor;
                usage['kb'] = usage['kb'] / clusterReplicaFactor;
                usage['kb_used'] = usage['kb_used'] / clusterReplicaFactor;
                usage['kb_avail'] = usage['kb_avail'] / clusterReplicaFactor;
                usage['total_used'] = formatBytes(usage['kb_used'] * 1024);
                usage['total_avail'] = formatBytes(usage['kb_avail'] * 1024);
                usage['total_space'] = formatBytes(usage['kb'] * 1024);
                usage['used_perc'] = parseFloat(swu.calcPercent(usage['kb_used'], usage['kb']));
                return [usage];
            }
        }

        this.clusterUsageDonutChartParser = function (response) {
            var retObj = {},
                response = response[0],
                current_status = "";
            if (response != null) {
                if (response['used_perc'] < response['near_full_ratio']) {
                    current_status = "Normal";
                } else if ((response['used_perc'] > response['near_full_ratio']) &&
                    (response['used_perc'] < response['full_ratio'])) {
                    current_status = "Warning";
                } else {
                    current_status = "Critical";
                }

                retObj['innerData'] = [
                    {
                        name: "Used",
                        value: Math.ceil(response['used_perc']),
                        tooltip_data: [
                            {
                                lbl: "Used",
                                value: response['total_used']
                            },
                            {
                                lbl: "Percentage",
                                value: response['used_perc'] + "%"
                            }
                        ]
                    },
                    {
                        name: "Available",
                        value: 100 - Math.ceil(response['used_perc']),
                        tooltip_data: [
                            {
                                lbl: "Available",
                                value: response['total_avail']
                            },
                            {
                                lbl: "Percentage",
                                value: (100 - response['used_perc']).toFixed(2) + "%"
                            }
                        ]
                    }
                ];

                retObj['outerData'] = [
                    {
                        name: "Normal Ratio",
                        status: "Normal",
                        value: parseInt(response['near_full_ratio']),
                        current_status: current_status,
                        tooltip_data: [
                            {
                                lbl: "Range",
                                value: '0 - ' + response['near_full_ratio'] + ' %'
                            }
                        ]
                    },
                    {
                        name: "Near Full Ratio",
                        status: "Warning",
                        value: parseInt(response['full_ratio'] - response['near_full_ratio']),
                        current_status: current_status,
                        tooltip_data: [
                            {
                                lbl: "Range",
                                value: response['near_full_ratio'] + ' - ' + response['full_ratio'] + ' %'
                            }
                        ]
                    },
                    {
                        name: "Full Ratio",
                        status: "Critical",
                        value: parseInt(100 - response['full_ratio']),
                        current_status: current_status,
                        tooltip_data: [
                            {
                                lbl: "Range",
                                value: response['full_ratio'] + ' - 100 %'
                            }
                        ]
                    }
                ];

                retObj['detailsData'] = {
                    percentage: response['used_perc'] + "%",
                    used: response['total_used'],
                    available: response['total_avail']
                };

                retObj['flagKey'] = current_status;
            }
            return retObj;
        };

        this.clusterStatusDataParser = function (response) {
            var retObj = [];
            if (response != null) {
                retObj.push({
                    health_status: swu.getClusterHealthTitle(response['cluster_status']['overall_status']),
                    health: response['cluster_status']['health'],
                    alerts: swu.processStorageHealthAlerts(response['cluster_status'])
                });
            }
            return retObj;
        }
    };


    return SParsers;
});
