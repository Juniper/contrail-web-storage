/*
 * Copyright (c) 2015 Juniper Networks, Inc. All rights reserved.
 */

define([
    'contrail-list-model',
], function (ContrailListModel) {
    var MonitoristModel = function (monitorName) {
         var listModelConfig = {
                remote: {
                    ajaxConfig: {
                        url: monitorName != null ? swc.get(swc.URL_STORAGENODE_MONITOR_DETAILS, monitorName) : swc.URL_STORAGENODE_MONITORS_SUMMARY,
                        type: "GET"
                    },
                    dataParser: swp.storageMonitorsDataParser
                },
                cacheConfig: {
                    ucid: monitorName != null ? (swc.UCID_PREFIX_MS_LISTS + monitorName + ":monitor") : swc.UCID_ALL_MONITOR_LIST
                }
            };
        return ContrailListModel(listModelConfig);
    };
    return MonitoristModel;
    }
);

