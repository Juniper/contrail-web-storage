/*
 * Copyright (c) 2015 Juniper Networks, Inc. All rights reserved.
 */

var infraStoragePageLoader = new MonitorInfraStorageLoader();

function MonitorInfraStorageLoader() {
    this.load = function (paramObject) {
        var self = this, currMenuObj = globalObj.currMenuObj,
            hashParams = paramObject['hashParams'],
            rootDir = currMenuObj['resources']['resource'][0]['rootDir'],
            renderFn = paramObject['function'],
            loadingStartedDefObj = paramObject['loadingStartedDefObj'];

        check4StorageInit(function () {
            require(['mon-infra-dashboard-view'],function() {
               require(['mon-infra-storage-dashboard'], function (MonitorInfraStorageView) {
                    self.infraStorageView = new MonitorInfraStorageView({
                        el: $(contentContainer)
                    });
                    self.renderView(renderFn, hashParams);
                });
            });
        });
    };
    this.renderView = function (renderFn, hashParams) {
        
        switch (renderFn) {
            case 'renderStorageNodes':
                $(contentContainer).html("");
                if (hashParams.type == "storagenode") {
                    if (hashParams.view == "details") {
                        this.infraStorageView.renderStorageNode({hashParams: hashParams});
                    } else {
                        this.infraStorageView.renderStorageNodeList({hashParams: hashParams});
                    }
                }
                break;

            case 'renderDisks':
                $(contentContainer).html("");
                if (hashParams.type == "disk") {
                    if (hashParams.view == "details") {
                        this.infraStorageView.renderDisk({hashParams: hashParams});
                    }
                }
                break;
            case 'renderDashboard':
               // if (hashParams.type == "dashboard") {
                    el: $(contentContainer)
                    this.infraStorageView.renderDashboard();
               // }
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
