/*
 * Copyright (c) 2015 Juniper Networks, Inc. All rights reserved.
 */

var swc, swgc, swcc, swl, swu, swm, swp, swvc, swdt;

require.config({
    baseUrl: '/',
    paths: {
        'monitor-storage-basedir' : 'monitor/storage/ui',
        'storage-constants': 'common/ui/js/storage.constants',
        'storage-grid-config': 'common/ui/js/storage.grid.config',
        'storage-chart-config': 'common/ui/js/storage.chart.config',
        'storage-labels': 'common/ui/js/storage.labels',
        'storage-utils': 'common/ui/js/storage.utils',
        'storage-messages': 'common/ui/js/storage.messages',
        'storage-parsers': 'common/ui/js/storage.parsers',
        'storage-init': 'common/ui/js/storage.init',
        'storage-view-config': 'common/ui/js/storage.view.config',
        'storage-detail-templates': 'common/ui/js/storage.detail.templates'
    },
    waitSeconds: 0
});

require(['storage-init'], function () {});