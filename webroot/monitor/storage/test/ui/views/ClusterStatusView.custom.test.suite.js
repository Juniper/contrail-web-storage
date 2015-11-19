/*
 * Copyright (c) 2015 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'co-test-utils',
    'co-test-messages',
    'co-test-constants',
    'co-test-runner',
    'strg-test-messages',
], function (_, cotu, cotm, cotc, CUnit, stm) {

      var testSuiteClass = function (viewObj, suiteConfig){
        var viewConfig = cotu.getViewConfigObj(viewObj),
            el = viewObj.el,
            data = viewConfig.data,
            app = viewConfig.app;
           

        module(cotu.formatTestModuleMessage(stm.STORAGE_DASHBOARD_CLUSTER_STATUS_CUSTOM_TEST, el.id));

        var detailsViewTestSuite = CUnit.createTestSuite('ClusterStatusViewTest');

        /**
         * Basic test group
         */
        var basicTestGroup = detailsViewTestSuite.createTestGroup('basic');
        basicTestGroup.registerTest(CUnit.test(stm.STORAGE_DASHBOARD_CLUSTER_STATUS_DETAILSVIEW, function() {
                expect(1);
                //check basic view icon

                equal($(el).find('.list-view .item-list .inline ').length,
                    3, "Basic Cluster status display rows check");

        }, cotc.SEVERITY_LOW));

        
        detailsViewTestSuite.run(suiteConfig.groups, suiteConfig.severity);

    };

    return testSuiteClass;
});