/*
 * Copyright (c) 2015 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'co-test-utils',
    'co-test-constants',
    'co-test-unit',
    'strg-test-messages',
], function (_, cotu, cotc, CUnit, stm) {

    var testSuiteClass = function (viewObj, suiteConfig) {

        var viewConfig = cotu.getViewConfigObj(viewObj),
            el = viewObj.el,
            gridData = $(el).data('contrailGrid'),
            gridItems = gridData._dataView.getItems();

        var viewConfigHeader = viewConfig.elementConfig.header,
            viewConfigColHeader = viewConfig.elementConfig.columnHeader,
            viewConfigBody = viewConfig.elementConfig.body,
            viewConfigFooter = viewConfig.elementConfig.footer;

        module(cotu.formatTestModuleMessage(stm.STORAGE_MON_LIST_VIEW_CUSTOM_TEST, el.id));

        var gridViewCustomTestSuite = CUnit.createTestSuite('GridViewCustomTestSuite');

        /**
         * Grid Body group Custom test cases
         */

        var bodyTestGroup = gridViewCustomTestSuite.createTestGroup('body');


        /**
         * This is a sample custom test for network list grid.
         * In this testcase, we'll check for second row Traffic in/out value (5th Column).
         */

        bodyTestGroup.registerTest(CUnit.test(stm.STORAGE_MON_GRID_COLUMN_VALUE_CHECK, function() {
            expect(1);
            equal($($(el).find('.grid-body .slick_row_id_1 .slick-cell')[4]).text().trim(), "ok",
                "Custom test to assert 2nd row 5th col value");

        }, cotc.SEVERITY_MEDIUM));

        gridViewCustomTestSuite.run(suiteConfig.groups, suiteConfig.severity);

    };

    return testSuiteClass;
});