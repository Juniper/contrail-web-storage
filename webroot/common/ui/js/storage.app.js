/*
 * Copyright (c) 2015 Juniper Networks, Inc. All rights reserved.
 */

var swc, swgc, swcc, swl, swu, swm, swp, swvc, swdt,
    strgBuildDir, strgWebDir;

/**
 * strgBaseDir: Apps Root directory.
 * strgWebDir: Root directory from the contents will be served. Either built or source depending on env.
 *
 * storage-srcdir: Require path id pointing to root directory for the source files which are delivered.
 * in a 'prod' env to use the file in source form (i.e not minified version), use path with prefix 'storage-srcdir'
 * eg: use 'storage-srcdir/monitor/infrastructure/ui/js/views/StorageBreadcrumbView' as path
 * to access StorageBreadcrumbView source instead of minified js file.
 */
if (typeof strgBaseDir !== 'undefined') {
    strgBuildDir = '';
    strgWebDir = strgBaseDir; // will initialize the webDir with baseDir
    if ((typeof globalObj !== 'undefined') && globalObj.hasOwnProperty('buildBaseDir')) {
        strgBuildDir = globalObj['buildBaseDir'];
    }

    require.config({
        baseUrl: strgBaseDir,
        paths: getStorageAppPaths(strgBaseDir, strgBuildDir),
        waitSeconds: 0
    });

    require(['storage-init'], function () {});
}

function getStorageAppPaths (strgBaseDir, strgBuildDir) {
    strgWebDir = strgBaseDir + strgBuildDir;

    return {
        'storage-srcdir': strgBaseDir,
        'storage-basedir': strgWebDir,
        'monitor-storage-basedir' : strgWebDir + '/monitor/storage/ui',
        'storage-constants': strgWebDir + '/common/ui/js/storage.constants',
        'storage-grid-config': strgWebDir + '/common/ui/js/storage.grid.config',
        'storage-chart-config': strgWebDir + '/common/ui/js/storage.chart.config',
        'storage-labels': strgWebDir + '/common/ui/js/storage.labels',
        'storage-utils': strgWebDir + '/common/ui/js/storage.utils',
        'storage-messages': strgWebDir + '/common/ui/js/storage.messages',
        'storage-parsers': strgWebDir + '/common/ui/js/storage.parsers',
        'storage-init': strgWebDir + '/common/ui/js/storage.init',
        'storage-view-config': strgWebDir + '/common/ui/js/storage.view.config',
        'storage-detail-templates': strgWebDir + '/common/ui/js/storage.detail.templates',
        'storage-bread-crumb-view': strgWebDir + '/monitor/infrastructure/ui/js/views/StorageBreadcrumbView',
        'storage-dashboard-view': strgWebDir + '/monitor/infrastructure/ui/js/views/StorageDashboardView',
        'mon-infra-storage-dashboard': strgWebDir + '/monitor/infrastructure/ui/js/views/MonitorInfraStorageView',
        'storage-dashboard-model': strgWebDir + '/monitor/infrastructure/ui/js/model/StorageDashboardListModel',
        'storage-node-scatter-chart-view': strgWebDir + '/monitor/infrastructure/ui/js/views/StorageNodeScatterChartView',
        'storage-bar-chart-info-view': strgWebDir + '/monitor/infrastructure/ui/js/views/StorageBarChartInfoView'
    };
}

if (typeof exports !== 'undefined' && module.exports) {
    exports = module.exports;
    exports.getStorageAppPaths = getStorageAppPaths;
}