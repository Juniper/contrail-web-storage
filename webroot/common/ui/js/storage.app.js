/*
 * Copyright (c) 2015 Juniper Networks, Inc. All rights reserved.
 */

var swc, swgc, swcc, swl, swu, swm, swp, swvc, swdt;

require.config({
    baseUrl: strgBaseDir,
    paths: {
        'monitor-storage-basedir' : strgBaseDir + '/monitor/storage/ui',
        'storage-constants': strgBaseDir + '/common/ui/js/storage.constants',
        'storage-grid-config': strgBaseDir + '/common/ui/js/storage.grid.config',
        'storage-chart-config': strgBaseDir + '/common/ui/js/storage.chart.config',
        'storage-labels': strgBaseDir + '/common/ui/js/storage.labels',
        'storage-utils': strgBaseDir + '/common/ui/js/storage.utils',
        'storage-messages': strgBaseDir + '/common/ui/js/storage.messages',
        'storage-parsers': strgBaseDir + '/common/ui/js/storage.parsers',
        'storage-init': strgBaseDir + '/common/ui/js/storage.init',
        'storage-view-config': strgBaseDir + '/common/ui/js/storage.view.config',
        'storage-detail-templates': strgBaseDir + '/common/ui/js/storage.detail.templates'
    },
    waitSeconds: 0
});

require(['storage-init'], function () {});