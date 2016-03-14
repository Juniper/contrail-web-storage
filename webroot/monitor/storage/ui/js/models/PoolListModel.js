/*
 * Copyright (c) 2015 Juniper Networks, Inc. All rights reserved.
 */

define([
    'contrail-list-model',
], function (ContrailListModel) {
    var PoolListModel = function (poolName) {
          var listModelConfig = {
                remote: {
                    ajaxConfig: {
                        url: poolName != null ? swc.get(swc.URL_POOL_DETAILS, poolName) : swc.URL_POOLS_SUMMARY,
                        type: "GET"
                    },
                    dataParser: swp.poolsDataParser
                },
                cacheConfig: {
                    ucid: poolName != null ? (swc.UCID_PREFIX_MS_LISTS + poolName + ":pool") : swc.UCID_ALL_POOL_LIST
                }
            };
        return ContrailListModel(listModelConfig);
    };
    return PoolListModel;
    }
);

