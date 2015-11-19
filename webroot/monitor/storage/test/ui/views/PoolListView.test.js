/*
 * Copyright (c) 2015 Juniper Networks, Inc. All rights reserved.
 */
define([
    'co-test-runner',
    'strg-test-utils',
    'strg-test-messages',
    'strg-pools-list-view-mock-data',
    'co-grid-contrail-list-model-test-suite',
    'co-grid-view-test-suite',
    'co-chart-view-zoom-scatter-test-suite',
    'strg-pools-list-view-custom-test-suite'
], function (CUnit, stu, stm, TestMockdata, GridListModelTestSuite, GridViewTestSuite, ZoomScatterChartTestSuite, 
    CustomTestSuite) {

    var moduleId = stm.STORAGE_POOL_LIST_VIEW_COMMON_TEST_MODULE;
    var testType = cotc.VIEW_TEST;
    var fakeServerConfig = CUnit.getDefaultFakeServerConfig();

    var fakeServerResponsesConfig = function() {
        var responses = [];

        responses.push(CUnit.createFakeServerResponse( {
            url: stu.getRegExForUrl('/api/tenant/storage/cluster/pools/summary'),
            body: JSON.stringify(TestMockdata.poolsMockData)
        }));
        return responses;
    };
    fakeServerConfig.getResponsesConfig = fakeServerResponsesConfig;

    var pageConfig = CUnit.getDefaultPageConfig();
    pageConfig.hashParams = {
        p: 'monitor_storage_pools',
        q: {
            view: 'list',
            type: 'pool'
        }
    };
    pageConfig.loadTimeout = 2000;

    var getTestConfig = function() {
        return {
            rootView: storagePageLoader.monStorageView,
            tests: [
                {
                    viewId: swl.MONITOR_POOL_SCATTER_CHART_ID,
                    suites: [
                        {
                            class: ZoomScatterChartTestSuite,
                            groups: ['all'],
                            severity: cotc.SEVERITY_LOW
                        }
                    ]
                },
                {
                    viewId: swl.MONITOR_POOL_GRID_ID,
                    suites: [
                         {
                            class: GridViewTestSuite,
                            groups: ['all'],
                            severity: cotc.SEVERITY_LOW
                        },
                        {
                            class: GridListModelTestSuite,
                            groups: ['all'],
                            severity: cotc.SEVERITY_LOW,
                            modelConfig: {
                                dataGenerator: stu.commonGridDataGenerator,
                                dataParsers: {
                                    mockDataParseFn: stu.deleteColorSizeFieldsForListViewScatterChart,
                                    gridDataParseFn: stu.deleteColorSizeFieldsForListViewScatterChart
                                }
                            }
                        },
                        {
                            class: CustomTestSuite,
                            groups: ['all'],
                            severity: cotc.SEVERITY_LOW
                        },
                    ]
                }
            ]
        } ;

    };

    var pageTestConfig = CUnit.createPageTestConfig(moduleId, testType, fakeServerConfig, pageConfig, getTestConfig);
    console.log(pageTestConfig);
    CUnit.startTestRunner(pageTestConfig);

});