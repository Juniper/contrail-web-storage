/*
 * Copyright (c) 2015 Juniper Networks, Inc. All rights reserved.
 */

define([
    'contrail-list-model',
], function (ContrailListModel) {
    var DiskListModel = function (storageNodeName) {
        //console.log(StorageInfraParsers);
         var listModelConfig = {
                remote: {
                    ajaxConfig: {
                        url: storageNodeName != null ? swc.get(swc.URL_STORAGENODE_DISKS, storageNodeName) : swc.URL_DISKS_SUMMARY,
                        type: "GET"
                    },
                    onAllRequestsCompleteCB: function(diskListModel) {
                        var fetchContrailListModel = new ContrailListModel({
                            remote : {
                                ajaxConfig : {
                                   url: storageNodeName != null ? swc.get(swc.URL_STORAGENODE_DISKS, storageNodeName) : swc.URL_DISKS_SUMMARY + '?forceRefresh',
                                },
                                onAllRequestsCompleteCB: function(fetchedDiskListModel) {
                                    var data = fetchedDiskListModel.getItems();
                                    diskListModel.setData(data);
                                },
                                dataParser: swp.disksDataParser
                            },
                        });
                    },
                    dataParser: swp.disksDataParser
                },
                cacheConfig: {
                    ucid: storageNodeName != null ? (swc.UCID_PREFIX_MS_LISTS + storageNodeName + ":disks") : swc.UCID_ALL_DISK_LIST
                }
            };
        return ContrailListModel(listModelConfig);
    };
    return DiskListModel;
    }
);

