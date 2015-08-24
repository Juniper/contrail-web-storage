/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

var coreBaseDir = "/base/contrail-web-core/webroot",
    sBaseDir = "/base/contrail-web-storage/webroot",
    pkgBaseDir = sBaseDir,
    featurePkg = 'webStorage';

var swu, swc, swgc, swl, swm, swp, swvc;

require([
    coreBaseDir + '/js/core-app-utils.js',
    coreBaseDir + '/test/ui/js/co.test.app.utils.js'
], function () {
    globalObj = {'env': "test"};

    requirejs.config({
        baseUrl: sBaseDir,
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

        storageTestAppPathObj["s-test-utils"] = ctBaseDir + "/test/ui/ct.test.utils";
        storageTestAppPathObj["s-test-messages"] = ctBaseDir + "/test/ui/ct.test.messages";

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