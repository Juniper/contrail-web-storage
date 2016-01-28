/*
 * Copyright (c) 2015 Juniper Networks, Inc. All rights reserved.
 */
define([
    'co-test-runner',
    'strg-test-utils',
    'strg-test-messages',
    'strg-nodes-list-view-mock-data',
    'co-grid-contrail-list-model-test-suite',
    'co-grid-view-test-suite',
    'co-chart-view-zoom-scatter-test-suite',
    'strg-nodes-list-view-custom-test-suite'
], function (CUnit, stu, stm, TestMockdata, GridListModelTestSuite, GridViewTestSuite, ZoomScatterChartTestSuite, 
    CustomTestSuite) {

    var moduleId = stm.STORAGE_DISK_LIST_VIEW_COMMON_TEST_MODULE;
    var testType = cotc.VIEW_TEST;
    var fakeServerConfig = CUnit.getDefaultFakeServerConfig();

    var fakeServerResponsesConfig = function() {
        var responses = [];
//https://10.87.140.28:8143/api/admin/monitor/infrastructure/storagenode/disks?hostname=cmbu-vxa2010-17&_=1446501160023
        responses.push(CUnit.createFakeServerResponse( {
            url: /\/api\/admin\/monitor\/infrastructure\/storagenode\/disks.*$/,
            body: JSON.stringify(TestMockdata.disksMockData)
        }));
        return responses;
    };
    fakeServerConfig.getResponsesConfig = fakeServerResponsesConfig;

    var pageConfig = CUnit.getDefaultPageConfig();
    pageConfig.hashParams = {
        p: 'monitor_infra_storage',
        q: {
            view: 'list',
            type: 'storagenode',
            source:'uve'
        }
    };
    pageConfig.loadTimeout = cotc.PAGE_LOAD_TIMEOUT * 2;

    var getTestConfig = function() {
        return {
            rootView: infraStoragePageLoader.infraStorageView,
            tests: [
                {
                    viewId: swl.DISK_SCATTER_CHART_ID,
                    suites: [
                        {
                            class: ZoomScatterChartTestSuite,
                            groups: ['all'],
                            severity: cotc.SEVERITY_LOW
                        }
                    ]
                },  
                {
                    viewId: swl.MONITOR_DISKS_ID,
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
    CUnit.startTestRunner(pageTestConfig);

});