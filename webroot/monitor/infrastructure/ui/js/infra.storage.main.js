/*
 * Copyright (c) 2015 Juniper Networks, Inc. All rights reserved.
 */

var infraStoragePageLoader = new MonitorInfraStorageLoader();

function MonitorInfraStorageLoader() {
    this.load = function (paramObject) {
        var self = this, currMenuObj = globalObj.currMenuObj,
            hashParams = paramObject['hashParams'],
            rootDir = currMenuObj['resources']['resource'][0]['rootDir'],
            pathMSView = rootDir + '/js/views/MonitorInfraStorageView.js',
            renderFn = paramObject['function'],
            loadingStartedDefObj = paramObject['loadingStartedDefObj'];

        check4StorageInit(function () {
            requirejs([pathMSView], function (MonitorInfraStorageView) {
                self.infraStorageView = new MonitorInfraStorageView();
                self.renderView(renderFn, hashParams);
                if(contrail.checkIfExist(loadingStartedDefObj)) {
                    loadingStartedDefObj.resolve();
                }
            });
        });
    };
    this.renderView = function (renderFn, hashParams) {
        $(contentContainer).html("");
        switch (renderFn) {
            case 'renderStorageNodes':
                if (hashParams.type == "storagenode") {
                    if (hashParams.view == "details") {
                        this.infraStorageView.renderStorageNode({hashParams: hashParams});
                    } else {
                        this.infraStorageView.renderStorageNodeList({hashParams: hashParams});
                    }
                }
                break;

            case 'renderDisks':
                if (hashParams.type == "disk") {
                    if (hashParams.view == "details") {
                        this.infraStorageView.renderDisk({hashParams: hashParams});
                    }
                }
                break;
        }
    };
    this.updateViewByHash = function (hashObj, lastHashObj) {
        var renderFn;

        if (hashObj.type == "storagenode") {
            renderFn = "renderStorageNodes";
        } else if (hashObj.type == "disk") {
            renderFn = "renderDisks";
        } else if (hashObj.type == "monitor") {
            renderFn = "renderMonitors";
        } else if (hashObj.type == "dashboard") {
            renderFn = "renderDashboard";
        }

        this.load({hashParams: hashObj, 'function': renderFn});
    };

    this.destroy = function () {
    };
};
