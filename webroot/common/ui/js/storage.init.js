/*
 * Copyright (c) 2015 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'storage-constants',
    'storage-grid-config',
    'storage-chart-config',
    'storage-labels',
    'storage-utils',
    'storage-messages',
    'storage-parsers',
    'storage-view-config',
    'storage-detail-templates'
], function (_, Constants, GridConfig, ChartConfig, Labels, Utils, Messages, Parsers, ViewConfig,
            DetailTemplates) {
    swc = new Constants();
    swgc = new GridConfig();
    swcc = new ChartConfig();
    swl = new Labels();
    swu = new Utils();
    swm = new Messages();
    swp = new Parsers();
    swvc = new ViewConfig();
    swdt = new DetailTemplates();
    sInitComplete = true;

    var deferredObj = contentHandler.initFeatureAppDefObjMap[FEATURE_PCK_WEB_STORAGE];

    if(contrail.checkIfExist(deferredObj)) {
        deferredObj.resolve()
    }
});