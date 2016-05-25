/*
 * Copyright (c) 2015 Juniper Networks, Inc. All rights reserved.
 */
define([
    'co-test-constants',
    'co-test-runner',
    'strg-test-utils',
    'strg-test-messages',
    'strg-disk-view-mock-data',
    'co-grid-contrail-list-model-test-suite',
    'co-grid-view-test-suite',
    'co-details-view-test-suite',
    'co-chart-view-line-bar-test-suite',
    'co-chart-view-line-test-suite',
], function (cotc, CUnit, stu, stm, TestMockdata, GridListModelTestSuite, GridViewTestSuite, DetailsViewTestSuite, 
    LineWithFocusBarChartViewTestSuite, LineWithFocusChartViewTestSuite) {

    var moduleId = stm.STORAGE_DETAILS_VIEW_COMMON_TEST_MODULE;
    var testType = cotc.VIEW_TEST;
    var fakeServerConfig = CUnit.getDefaultFakeServerConfig();

    var fakeServerResponsesConfig = function() {
        var responses = [];

        /*
         /api/tenant/storage/cluster/osd/details?name=osd.0&_=1445480521756
         /api/tenant/storage/cluster/osd/flow-series?osdName=osd.0&minsSince=60&sampleCnt=60&hostName=cmbu-vxa2100-proto3&endTime=now&_=1445480521763                                                                                           done
         */

        responses.push(CUnit.createFakeServerResponse({
            url: /\/api\/tenant\/storage\/cluster\/osd\/details.*$/,
            body: JSON.stringify(TestMockdata.diskMockData)
        }));

        responses.push(CUnit.createFakeServerResponse({
            url: /\/api\/tenant\/storage\/cluster\/osd\/flow\-series.*$/,
            body: JSON.stringify(TestMockdata.flowSeriesForFrontendDiskMockData)
        }));
        responses.push(CUnit.createFakeServerResponse({
            url: /\/api\/tenant\/storage\/cluster\/osd-raw-disk\/flow\-series.*$/,
            body: JSON.stringify(TestMockdata.flowSeriesForFrontendRawDiskMockData)
        }));
        return responses;
    };
    fakeServerConfig.getResponsesConfig = fakeServerResponsesConfig;

    var pageConfig = CUnit.getDefaultPageConfig();
    pageConfig.hashParams = {
        p: 'monitor_storage_disks',
        q: {
            view: 'details',
            type: 'disk',
            "focusedElement": {
                "fqName": "osd.0",
                "fqHost":"cmbu-vxa2100-proto3",
                "type": "disk-details"
            }
        }
    };
    pageConfig.loadTimeout = cotc.PAGE_LOAD_TIMEOUT * 5;

    var getTestConfig = function() {
        return {
            rootView: storagePageLoader.monStorageView,
            tests: [
               
                {
                    viewId: swl.DISK_DETAILS_ID+"-summary",
                    suites: [
                        {
                            class: DetailsViewTestSuite,
                            groups: ['all'],
                            severity: cotc.SEVERITY_LOW,
                            modelConfig: {
                                dataGenerator: stu.commonDetailsDataGenerator
                            }
                        }
                    ]
                },{
                    viewId: swl.DISK_DETAILS_ID+"-status",
                    suites: [
                        {
                            class: DetailsViewTestSuite,
                            groups: ['all'],
                            severity: cotc.SEVERITY_LOW,
                            modelConfig: {
                                dataGenerator: stu.commonDetailsDataGenerator
                            }
                        }
                    ]
                },
                {
                    viewId: swl.DISK_ACTIVITY_THRPT_IOPS_CHART_ID,
                    suites: [
                        {
                            class: LineWithFocusBarChartViewTestSuite,
                            groups: ['all'],
                            severity: cotc.SEVERITY_LOW
                        }
                    ]
                },
                {
                    viewId: swl.DISK_ACTIVITY_LATENCY_CHART_ID,
                    suites: [
                        {
                            class: LineWithFocusChartViewTestSuite,
                            groups: ['all'],
                            severity: cotc.SEVERITY_LOW
                        }
                    ]
                },
                {
                    viewId: swl.DISK_ACTIVITY_THRPT_IOPS_CHART_ID+"raw-disk",
                    suites: [
                        {
                            class: LineWithFocusBarChartViewTestSuite,
                            groups: ['all'],
                            severity: cotc.SEVERITY_LOW
                        }
                    ]
                },
                {
                    viewId: swl.DISK_ACTIVITY_LATENCY_CHART_ID+"raw-disk",
                    suites: [
                        {
                            class: LineWithFocusChartViewTestSuite,
                            groups: ['all'],
                            severity: cotc.SEVERITY_LOW
                        }
                    ]
                }

            ]
        } ;

    };



    var pageTestConfig = CUnit.createPageTestConfig(moduleId, testType, fakeServerConfig, pageConfig, getTestConfig);

    CUnit.startTestRunner(pageTestConfig);

});
