/*
 * Copyright (c) 2015 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore'
], function (_) {
    var SChartConfig = function () {
        this.setStorageNodeURLHashParams = function(hashParams, fqName, triggerHashChange) {
            var hashObj = {
                type: "storagenode",
                view: "details",
                focusedElement: {
                    fqName: fqName,
                    type: swc.CHART_ELEMENT_STORAGENODE
                }
            };

            if(contrail.checkIfKeyExistInObject(true, hashParams, 'clickedElement')) {
                hashObj.clickedElement = hashParams.clickedElement;
            }

            layoutHandler.setURLHashParams(hashObj, {p: "monitor_infra_storage", merge: false, triggerHashChange: triggerHashChange});

        };

        this.setDiskURLHashParams = function (hashParams, fqObj, triggerHashChange) {
            var curHashObj = layoutHandler.getURLHashObj();
            var hashObj = {
                type: "disk",
                view: "details",
                focusedElement: {
                    fqName: fqObj.fqName,
                    fqHost: fqObj.fqHost,
                    type: swc.DETAILS_ELEMENT_DISK
                }
            };

            if (contrail.checkIfKeyExistInObject(true, hashParams, 'clickedElement')) {
                hashObj.clickedElement = hashParams.clickedElement;
            }

            layoutHandler.setURLHashParams(hashObj, {
                p: curHashObj.p,
                merge: false,
                triggerHashChange: triggerHashChange
            });
        }
    };
    return SChartConfig;
});
