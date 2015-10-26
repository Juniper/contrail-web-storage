/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

var coreBaseDir = "/base/contrail-web-core/webroot",
    strgBaseDir = "/base/contrail-web-storage/webroot",
    pkgBaseDir = strgBaseDir,
    featurePkg = 'webStorage';

var swu, swc, swgc, swl, swm, swp, swvc;

require([
    coreBaseDir + '/js/common/core.app.utils.js',
    coreBaseDir + '/test/ui/js/co.test.app.utils.js'
], function () {
    globalObj = {'env': "test"};

    requirejs.config({
        baseUrl: strgBaseDir,
        paths: getStorageTestAppPaths(coreBaseDir),
        map: coreAppMap,
        shim: getStorageTestAppShim(),
        waitSeconds: 0
    });

    require(['co-test-init'], function () {
        setFeaturePkgAndInit(featurePkg);
    });

    function getStorageTestAppPaths(coreBaseDir) {
        var storageTestAppPathObj = {};

        var coreAppPaths = getCoreAppPaths(coreBaseDir);
        var coreTestAppPaths = getCoreTestAppPaths(coreBaseDir);

        for (var key in coreAppPaths) {
            if (coreAppPaths.hasOwnProperty(key)) {
                var value = coreAppPaths[key];
                storageTestAppPathObj[key] = value;
            }
        }

        for (var key in coreTestAppPaths) {
            if (coreTestAppPaths.hasOwnProperty(key)) {
                var value = coreTestAppPaths[key];
                storageTestAppPathObj[key] = value;
            }
        }

        storageTestAppPathObj["strg-test-utils"] = strgBaseDir + "/test/ui/strg.test.utils";
        storageTestAppPathObj["strg-test-messages"] = strgBaseDir + "/test/ui/strg.test.message";

        //Storage Disks Page
        storageTestAppPathObj["strg-disks-list-view-mock-data"] = strgBaseDir + "/monitor/storage/ui/test/ui/DiskListView.mock.data";
        storageTestAppPathObj["strg-disks-list-view-custom-test-suite"] = strgBaseDir + "/monitor/storage/ui/test/ui/DiskListView.custom.test.suite";
        
        //Storage Disk Details page
        storageTestAppPathObj["strg-disk-view-mock-data"] = strgBaseDir + "/monitor/storage/ui/test/ui/DiskView.mock.data";

       //Storage Pools Page
        storageTestAppPathObj["strg-pools-list-view-mock-data"] = strgBaseDir + "/monitor/storage/ui/test/ui/PoolListView.mock.data";
        storageTestAppPathObj["strg-pools-list-view-custom-test-suite"] = strgBaseDir + "/monitor/storage/ui/test/ui/PoolListView.custom.test.suite";

        // Storage Monitors Page
        storageTestAppPathObj["strg-mons-list-view-mock-data"] = strgBaseDir + "/monitor/storage/ui/test/ui/StorageMonListView.mock.data";
        storageTestAppPathObj["strg-mons-list-view-custom-test-suite"] = strgBaseDir + "/monitor/storage/ui/test/ui/StorageMonListView.custom.test.suite";

        return storageTestAppPathObj;
    };

    function getStorageTestAppShim() {
        var storageTestAppShim = {};

        for (var key in coreAppShim) {
            if (coreAppShim.hasOwnProperty(key)) {
                var value = coreAppShim[key];
                storageTestAppShim[key] = value;
            }
        }

        for (var key in coreTestAppShim) {
            if (coreTestAppShim.hasOwnProperty(key)) {
                var value = coreTestAppShim[key];
                storageTestAppShim[key] = value;
            }
        }

        return storageTestAppShim;
    }
});