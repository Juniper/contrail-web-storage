/*
 * Copyright (c) 2015 Juniper Networks, Inc. All rights reserved.
 */

define(['underscore'], function (_) {
    var SUtils = function () {
        var self = this;

        self.getDownNodeCnt = function (data) {
            var downNodes = $.grep(data, function (obj, idx) {
                return obj['color'] == d3Colors['red'];
            });
            return downNodes.length;
        };

        self.clearTimers = function () {
            $.each(storageConsoleTimer, function (idx, value) {
                logMessage("clearing timer:", value);
                clearTimeout(value)
            });
            storageConsoleTimer = [];
        };

        self.getHealthSevLevelLbl = function (obj) {
            if (obj == 'HEALTH_OK' || obj == 'OK' || obj == 'up')
                return 'INFO';
            else if (obj == 'HEALTH_WARN' || obj == 'warn')
                return 'WARNING';
            else if (obj == 'HEALTH_ERR' || obj == 'HEALTH_CRIT' || obj == 'down')
                return 'ERROR';
            else
                return 'NOTICE';
        };

        self.getClusterHealthTitle = function (status) {
            if (status == 'HEALTH_WARN')
                retStatus = 'warn';
            else if (status == 'HEALTH_OK' || status == 'OK')
                retStatus = 'ok';
            else if (status == 'HEALTH_CRIT' || status == 'HEALTH_ERR')
                retStatus = 'critical';
            else
                retStatus = status;
            return retStatus;
        };

        self.getHealthIconClass = function (status) {
            var labelClass;
            if (status == 'OK')
                labelClass = "icon-arrow-up";
            else if (status == 'WARN' || status == 'CRITICAL')
                labelClass = "icon-warning-sign";
            else if (status == 'DOWN')
                labelClass = "icon-arrow-down";
            else if (status == 'CLUSTER IDLE')
                labelClass = "icon-info-sign";
            else {
                labelClass = "icon-pause";
            }
            return labelClass;
        };

        self.getHealthIconColorClass = function (status) {
            var labelClass;
            if (status == 'OK')
                labelClass = "success-color";
            else if (status == 'WARN')
                labelClass = "warning-color";
            else if (status == 'DOWN' || status == 'CRITICAL')
                labelClass = "down-color";
            else {
                labelClass = "info-color";
            }
            return labelClass;
        };

        self.byteToGB = function (bytes) {
            return (bytes / 1073741824).toFixed(2);
        };

        self.calcPercent = function (val1, val2) {
            return ((val1 / val2) * 100).toFixed(2);
        };

        self.formatIpPort = function (ip) {
            return ip.split(':')[0] + ', Port: ' + ip.split(':')[1];
        }

        self.getDiskColorByStatus = function (disk) {
            if (disk['status'] == 'up') {
                if (disk['cluster_status'] == 'in') {
                    return swc.DISK_OKAY_COLOR;
                } else if (disk['cluster_status'] == 'out') {
                    return swc.DISK_WARNING_COLOR;
                } else {
                    return swc.DISK_DEFAULT_COLOR;
                }
            } else if (disk['status'] == 'down') {
                return swc.DISK_ERROR_COLOR;
            }
        };

        self.getDiskColorByStatusAndUsage = function (disk) {
            if (disk['status'] == 'up') {
                if (disk['cluster_status'] == 'in') {
                    //Check usage now
                    if (disk['used_perc'] >= swc.DISK_USAGE_CRITICAL) {
                        return swc.DISK_ERROR_COLOR;
                    } else if (disk['used_perc'] >= swc.DISK_USAGE_WARN) {
                        return swc.DISK_WARNING_COLOR;
                    } else {
                        return swc.DISK_OKAY_COLOR;
                    }
                } else if (disk['cluster_status'] == 'out') {
                    return swc.DISK_WARNING_COLOR;
                } else {
                    return swc.DISK_DEFAULT_COLOR;
                }
            } else if (disk['status'] == 'down') {
                return swc.DISK_ERROR_COLOR;
            }
        };

        self.getDiskTooltipConfig = function (obj) {
            var data = obj.data;
            var diskFQNObj = data.name.split(':');

            return {
                title: {
                    name: diskFQNObj[0],
                    type: swl.TITLE_CHART_ELEMENT_DISK
                },
                content: {
                    iconClass: 'icon-contrail-storage-disk',
                    info: [
                        {label: 'Total', value: data['total']},
                        {label: 'Used', value: data['used']},
                        {label: 'Available', value: data['available']},
                        {label: 'Avg BW (Read+Write)', value: formatThroughput(data['y'])}
                    ],
                    actions: [
                        {
                            type: 'link',
                            text: 'View',
                            iconClass: 'icon-external-link',
                            callback: obj.actions.linkCallbackFn
                        }
                    ]
                },
                dimension: {
                    width: 350
                }
            };
        };

        self.getStorageNodeColor = function (d, obj) {
            obj = ifNull(obj, {});
            if (obj['status'] == "down")
                return d3Colors['red'];
            if (obj['status'] == "warn")
                return d3Colors['orange'];
            return d3Colors['blue'];
        };

        self.getStorageNodeStatusTmpl = function (obj) {
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
        };

        self.getMonitorNodeHealthStatusTmpl = function (obj) {
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
        };

        self.processStorageNodeAlerts = function (obj) {
            var alertsList = [];
            var infoObj = {
                tooltipAlert: false,
                name: obj['name'],
                pName: obj['display_type'],
                ip: obj['ip']
            };

            $.each(obj['osds'], function (idx, osd) {
                if (osd['status'] == 'down') {
                    alertsList.push($.extend({}, {
                        ip: osd['public_addr'],
                        type: 'Storage Disk',
                        sevLevel: sevLevels['ERROR'],
                        msg: swm.DISK_DOWN_LIST.format(osd['name']),
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
                    type: 'Storage Disk',
                    sevLevel: sevLevels['WARNING'],
                    msg: swm.DISK_OUT.format(obj['disk_out_list'].length, obj['disk_out_list'])
                }, infoObj));

            if (obj['errorStrings'] != null && obj['errorStrings'].length > 0) {
                $.each(obj['errorStrings'], function (idx, errorString) {
                    alertsList.push($.extend({}, {
                        sevLevel: sevLevels['WARNING'],
                        msg: errorString
                    }, infoObj));
                });
            }
            return alertsList.sort(dashboardUtils.sortInfraAlerts);
        };

        self.processStorageHealthAlerts = function (obj) {
            var alertsList = [];
            var _this = self;
            var timeStamp = new Date(obj['last_updated_time']).getTime() * 1000;
            var defInfoObj = {
                tooltipAlert: false,
                name: 'Storage Cluster',
                ip: '',
                timeStamp: timeStamp
            };

            $.each(obj['health']['details'], function (idx, msg) {
                var msgArr = msg.split(" ");
                if (msgArr.slice(0, 1)[0].indexOf("mon") > -1) {
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

            $.each(obj['health']['summary'], function (idx, msg) {
                alertsList.push($.extend({}, {
                    type: 'Health',
                    sevLevel: sevLevels[_this.getHealthSevLevelLbl(msg['severity'])],
                    msg: msg['summary']
                }, defInfoObj));
            });

            return alertsList.sort(dashboardUtils.sortInfraAlerts);
        };

        self.showStorageAlertsPopup = function (alerts) {

            if (! globalObj['dataSources'].hasOwnProperty('alertsDS')) {
                globalObj['dataSources']['alertsDS'] = {
                    dataSource: new ContrailDataView(),
                    //depends: ['storageNodeDS'],
                    deferredObj: $.Deferred()
                };
            }
            var alertsDS = globalObj['dataSources']['alertsDS'];

            /*
             * will create alerts only from cluster health. will not append to existing msgs.
             */
            /*
             var origAlerts = alertsDS['dataSource'].getItems();
             $.each(alerts, function(idx, alert) {
                origAlerts.push(alert);
             });
             */
            alertsDS['dataSource'].setData(alerts);
            loadAlertsContent();
        };

        self.byteToGB = function (bytes) {
            var gb = (bytes / 1073741824).toFixed(2);
            return gb;
        };

        self.kiloByteToGB = function (kbytes) {
            var gb = (kbytes / 1048576).toFixed(2);
            return gb;
        };

        self.getSelector4Id = function (id) {
            if (id != null) {
                return $('#' + id);
            }
        };

        self.addUnits2IOPs = function (data, noDecimal, maxPrecision, precision) {
            var dataPrefixes = ['IOPs', 'K IOPs', 'M IOPs', 'B IOPs', 'T IOPs'],
                formatStr = '', decimalDigits = 2, size = 1000;

            if (!$.isNumeric(data)) {
                return '-';
            } else if (data == 0) {
                return '0 IOPs';
            }

            if ((maxPrecision != null) && (maxPrecision == true)) {
                decimalDigits = 6;
            } else if (precision != null) {
                decimalDigits = precision < 7 ? precision : 6;
            }

            if (noDecimal != null && noDecimal == true)
                decimalDigits = 0;


            data = parseInt(data);
            data = makePositive(data);

            $.each(dataPrefixes, function (idx, prefix) {
                if (data < size) {
                    formatStr = contrail.format('{0} {1}', parseFloat(data.toFixed(decimalDigits)), prefix);
                    return false;
                } else {
                    //last iteration
                    if (idx == (dataPrefixes.length - 1))
                        formatStr = contrail.format('{0} {1}', parseFloat(data.toFixed(decimalDigits)), prefix);
                    else
                        data = data / size;
                }
            });
            return formatStr;
        };

        self.addUnits2Latency = function (data, noDecimal, maxPrecision, precision) {
            var dataPrefixes = ['s', 'm', 'hr'],
                formatStr = '', decimalDigits = 4, size = 60;

            if (!$.isNumeric(data)) {
                return '-';
            } else if (data == 0) {
                return '0 ms';
            }

            if ((maxPrecision != null) && (maxPrecision == true)) {
                decimalDigits = 6;
            } else if (precision != null) {
                decimalDigits = precision < 7 ? precision : 6;
            }

            if (noDecimal != null && noDecimal == true)
                decimalDigits = 0;


            data = parseInt(data);
            data = makePositive(data) / 1000;
            $.each(dataPrefixes, function (idx, prefix) {
                if (data < size) {
                    formatStr = contrail.format('{0} {1}', parseFloat(data.toFixed(decimalDigits)), prefix);
                    return false;
                } else {
                    //last iteration
                    if (idx == (dataPrefixes.length - 1))
                        formatStr = contrail.format('{0} {1}', parseFloat(data.toFixed(decimalDigits)), prefix);
                    else
                        data = data / size;
                }
            });
            return formatStr;
        };

        self.addUnits2Number = function(data, noDecimal, maxPrecision, precision, label) {
            var dataPrefixes = ['', 'K', 'M', 'B', 'T'],
                formatStr = '', decimalDigits = 2, size = 1000;

            if (label != null) {
                dataPrefixes = $.map(dataPrefixes, function(unit) {
                    if (unit != '') {
                        return unit + " " + label;
                    } else {
                        return label;
                    }
                });
            }

            if (!$.isNumeric(data)) {
                return '-';
            } else if (data == 0) {
                if (label != null) {
                    return '0 ' + label;
                }
                return '0 ';
            }

            if ((maxPrecision != null) && (maxPrecision == true)) {
                decimalDigits = 6;
            } else if(precision != null) {
                decimalDigits = precision < 7 ? precision : 6;
            }

            if (noDecimal != null && noDecimal == true)
                decimalDigits = 0;


            data = parseInt(data);
            data = makePositive(data);

            $.each(dataPrefixes, function (idx, prefix) {
                if (data < size) {
                    formatStr = contrail.format('{0} {1}', parseFloat(data.toFixed(decimalDigits)), prefix);
                    return false;
                } else {
                    //last iteration
                    if (idx == (dataPrefixes.length - 1))
                        formatStr = contrail.format('{0} {1}', parseFloat(data.toFixed(decimalDigits)), prefix);
                    else
                        data = data / size;
                }
            });
            return formatStr;
        };

        self.addUnits2Disks = function(data) {
            if (!$.isNumeric(data)) {
                return '-';
            } else {
                return "{disk;disks}".format(data);
            }
        };

        self.renderView = function (renderConfig, renderCallback) {
            var parentElement = renderConfig['parentElement'],
                viewName = renderConfig['viewName'],
                viewPathPrefix,viewPath,
                model = renderConfig['model'],
                viewAttributes = renderConfig['viewAttributes'],
                modelMap = renderConfig['modelMap'],
                rootView = renderConfig['rootView'],
                onAllViewsRenderCompleteCB = renderConfig['onAllViewsRenderCompleteCB'],
                onAllRenderCompleteCB = renderConfig['onAllRenderCompleteCB'],
                lazyRenderingComplete  = renderConfig['lazyRenderingComplete'],
                elementView;

            /**
             * if views are dynamically loaded using viewPathPrefix in a viewConfig, the path should prefix
             * with 'storage-basedir' as depending on the env, the root dir from which the files are served changes.
             */
            if (contrail.checkIfExist(renderConfig['viewPathPrefix'])){
                viewPathPrefix = renderConfig['viewPathPrefix'];
                // If viewPathPrefix doesn't start with core-basedir or storage-basedir add storage-basedir
                if (!(viewPathPrefix.slice(0, 'core-basedir'.length) === 'core-basedir') &&
                    !(viewPathPrefix.slice(0, 'storage-basedir'.length) === 'storage-basedir')) {
                    viewPathPrefix =  'storage-basedir/' + viewPathPrefix;
                }
            } else {
                viewPathPrefix =  'storage-basedir/monitor/storage/ui/js/views/';
            }
            viewPath =  viewPathPrefix + viewName;

            require([viewPath], function(ElementView) {
                elementView = new ElementView({el: parentElement, model: model, attributes: viewAttributes, rootView: rootView, onAllViewsRenderCompleteCB: onAllViewsRenderCompleteCB, onAllRenderCompleteCB: onAllRenderCompleteCB});
                elementView.viewName = viewName;
                elementView.modelMap = modelMap;
                elementView.beginMyViewRendering();
                elementView.render();
                if(contrail.checkIfFunction(renderCallback)) {
                    renderCallback(elementView);
                }

                if(lazyRenderingComplete == null || !lazyRenderingComplete) {
                    elementView.endMyViewRendering();
                }
            });
        };
        /**
         * As "Alerts" link in header can be clicked from any page,it need to know the list
         * of nodeListModels to loop through to generate alerts.
         * Return the require Aliases/URLs of all listModels for which alerts need to be processed
         */
        self.getNodeListModelsForAlerts = function(defObj) {
            return ['storage-dashboard-model'];
        }

    };

    return SUtils;
});
