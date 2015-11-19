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
            chartItems = viewObj.model.getItems(),
            chartOptions = viewConfig.chartOptions,
            chartOptions = $.extend(true, {}, pieChartConfig, chartOptions);

        module(cotu.formatTestModuleMessage(stm.STORAGE_DASHBOARD_PIECHART_CUSTOM_TEST, el.id));

        var chartViewTestSuite = CUnit.createTestSuite('PieChartViewTest');

        /**
         * Chart basic group test cases
         */
        var basicTestGroup = chartViewTestSuite.createTestGroup('basic');
        /**
         * Test axis labels.
         */
        basicTestGroup.registerTest(CUnit.test(stm.STORAGE_DASHBOARD_NAME_VALUE_CHECK, function () {
            expect(0);
           // equal($(el).find('.nv-linePlusBar .nv-focus .nv-y1 .nv-axislabel').text().trim(), chartOptions.y1AxisLabel,
           //     "Y1 axis title should be equal to the title set");
          //  equal($(el).find('.nv-linePlusBar .nv-focus .nv-y2 .nv-axislabel').text().trim(), chartOptions.y2AxisLabel,
           //     "Y2 axis title should be equal to the title set");
        }, cotc.SEVERITY_MEDIUM));

        chartViewTestSuite.run(suiteConfig.groups, suiteConfig.severity);

    };

    pieChartConfig = {
        donutRatio: 0.6,
        height: 200,
        showLegend: true,
        legendPosition: 'right',
        showLabels: false,
        legendRightAlign: true,
        legendPadding: 32,
        color: 'rgb(31, 119, 180)'
        //    yFormatter: function(d) { return cowu.addUnits2Bytes(d, false, false, 1, 60); },
        //    y2Formatter: function(d) { return cowu.addUnits2Bytes(d, false, false, 1, 60); }
    };

    return testSuiteClass;
});