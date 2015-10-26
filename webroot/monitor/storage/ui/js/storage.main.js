/*
 * Copyright (c) 2015 Juniper Networks, Inc. All rights reserved.
 */

var storagePageLoader = new MonitorStorageLoader();

function MonitorStorageLoader() {
    this.load = function (paramObject) {
        var self = this, currMenuObj = globalObj.currMenuObj,
            hashParams = paramObject['hashParams'],
           // rootDir = currMenuObj['resources']['resource'][0]['rootDir'],
            pathMSView = strgBaseDir + '/monitor/storage/ui/js/views/MonitorStorageView.js',
            renderFn = paramObject['function'],
            loadingStartedDefObj = paramObject['loadingStartedDefObj'];

        requirejs([pathMSView], function (MonitorStorageView) {
            self.monStorageView = new MonitorStorageView();
            self.renderView(renderFn, hashParams);
            if(contrail.checkIfExist(loadingStartedDefObj)) {
                loadingStartedDefObj.resolve();
            }
        });
    };

    this.renderView = function (renderFn, hashParams) {
        $(contentContainer).html("");
        switch (renderFn) {
            case 'renderDisks':
                if (hashParams.type == "disk") {
                    if (hashParams.view == "details") {
                        this.monStorageView.renderDisk({hashParams: hashParams});

                    } else {
                        this.monStorageView.renderDiskList({hashParams: hashParams});
                    }
                }
                break;
            case 'renderMonitors':
                if (hashParams.type == "monitor") {
                    if (hashParams.view == "details") {
                        //TBD for single storage monitor page.
                    } else {
                        this.monStorageView.renderMonitorList({hashParams: hashParams});
                    }
                }
                break;
            case 'renderPools':
                if (hashParams.type == "pool") {
                    if (hashParams.view == "details") {
                        //TBD for single pool page.
                    } else {
                        this.monStorageView.renderPoolList({hashParams: hashParams});
                    }
                }
                break;

            case 'renderStorageDashboard':
                if (hashParams.type == "storage") {
                    if (hashParams.view == "dashboard") {
                        this.monStorageView.renderStorageDashboard({hashParams: hashParams});
                    } else {
                        //TODO
                    }
                }
                break;
        }
    };
    this.updateViewByHash = function (hashObj, lastHashObj) {
        var renderFn;

        if (hashObj.type == "disk") {
            renderFn = "renderDisks";
        } else if (hashObj.type == "monitor") {
            renderFn = "renderMonitors";
        } else if (hashObj.type == "pool") {
            renderFn = "renderPools";
        } else if (hashObj.type == "storage") {
            renderFn = "renderStorageDashboard";
        }

        this.load({hashParams: hashObj, 'function': renderFn});
    };

    this.destroy = function () {
    };
};
