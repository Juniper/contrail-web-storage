/*
 * Copyright (c) 2015 Juniper Networks, Inc. All rights reserved.
 */

define([
    'contrail-list-model',
], function (ContrailListModel) {
    var StorageDashboardListModel = function () {
        //console.log(StorageInfraParsers);
         var listModelConfig = {
                remote: {
                    ajaxConfig: {
                        url: swc.get(swc.URL_STORAGENODES_SUMMARY),
                        type: "GET"
                    },
                    onAllRequestsCompleteCB: function(storageListModel) {
                        var fetchContrailListModel = new ContrailListModel({
                            remote : {
                                ajaxConfig : {
                                    url : swc.get(swc.URL_STORAGENODES_SUMMARY) + '?forceRefresh'
                                },
                                onAllRequestsCompleteCB: function(fetchedStorageListModel) {
                                    var data = fetchedStorageListModel.getItems();
                                    storageListModel.setData(data);
                                },
                               dataParser: swp.storagenodeDataParser
                            },
                        });
                    },
                    dataParser: swp.storagenodeDataParser
                 },
                cacheConfig: {
                    ucid: swc.UCID_ALL_STORAGENODE_LIST
                }
            };
        return ContrailListModel(listModelConfig);
    };
    return StorageDashboardListModel;
    }
);

