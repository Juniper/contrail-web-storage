/*
 * Copyright (c) 2015 Juniper Networks, Inc. All rights reserved.
 */
define([
    'co-test-constants',
    'co-test-runner',
    'strg-test-utils',
    'strg-test-messages',
    'strg-dashboard-view-mock-data',
    'co-grid-contrail-list-model-test-suite',
    'co-grid-view-test-suite',
    'co-chart-view-line-bar-test-suite',
    'co-chart-view-line-test-suite',
    'strg-dashboard-piechart-custom-test-suite',
    'strg-dashboard-cluster-status-custom-test-suite'
], function (cotc, CUnit, stu, stm, TestMockdata, GridListModelTestSuite, GridViewTestSuite, LineWithFocusBarChartViewTestSuite, 
    LineWithFocusChartViewTestSuite, CustomTestSuite1, CustomTestSuite2) {

    var moduleId = stm.STORAGE_DASHBOARD_COMMON_TEST_MODULE;
    var testType = cotc.VIEW_TEST;
    var fakeServerConfig = CUnit.getDefaultFakeServerConfig();

    var fakeServerResponsesConfig = function() {
    
        var responses = [];

        responses.push(CUnit.createFakeServerResponse( {
            url: stu.getRegExForUrl('/api/tenant/storage/cluster/status'),
            body: JSON.stringify(TestMockdata.clusterStatusMockData)
        }));
        
        responses.push(CUnit.createFakeServerResponse( {
            url: stu.getRegExForUrl('/api/tenant/storage/cluster/usage'),
            body: JSON.stringify(TestMockdata.clusterUsageMockData)
        }));

        responses.push(CUnit.createFakeServerResponse( {
            url: stu.getRegExForUrl('/api/tenant/storage/cluster/pools/summary'),
            body: JSON.stringify(TestMockdata.clusterPoolSummaryMockData)
        }));

        responses.push(CUnit.createFakeServerResponse( {
            url: stu.getRegExForUrl('/api/tenant/storage/cluster/osd/status'),
            body: JSON.stringify(TestMockdata.clusterOSDStatusMockData)
        }));
   
        responses.push(CUnit.createFakeServerResponse({
            url: /\/api\/tenant\/storage\/cluster\/ceph\/activity.*$/,
            body: JSON.stringify(TestMockdata.flowSeriesForClusterOsdActivityMockData)
        }));
        responses.push(CUnit.createFakeServerResponse({
            url: /\/api\/tenant\/storage\/cluster\/raw\/disk\/activity.*$/,
            body: JSON.stringify(TestMockdata.flowSeriesForClusterRawActivityMockData)
        }));

        return responses;
    };
    fakeServerConfig.getResponsesConfig = fakeServerResponsesConfig;

    var pageConfig = CUnit.getDefaultPageConfig();
    pageConfig.hashParams = {
        p: 'monitor_storage_dashboard',
        q: {
            view: 'dashboard',
            type: 'storage'
        }
    };
    pageConfig.loadTimeout = cotc.PAGE_LOAD_TIMEOUT * 5;

    var getTestConfig = function() {
        return {
            rootView: storagePageLoader.monStorageView,
            tests: [
                {
                    viewId: swl.CLUSTER_CEPH_DISK_ACTIVITY_THRPT_IOPS_CHART_ID,
                    suites: [
                        {
                            class: LineWithFocusBarChartViewTestSuite,
                            groups: ['all'],
                            severity: cotc.SEVERITY_LOW
                        }
                    ]
                },
                {
                    viewId: swl.CLUSTER_RAW_DISK_ACTIVITY_THRPT_IOPS_CHART_ID,
                    suites: [
                        {
                            class: LineWithFocusBarChartViewTestSuite,
                            groups: ['all'],
                            severity: cotc.SEVERITY_LOW
                        }
                    ]
                },/*,
                {
                    viewId: swl.POOL_STATS_CHART_ID,
                    suites: [
                        {
                            class: CustomTestSuite1,
                            groups: ['all'],
                            severity: cotc.SEVERITY_LOW
                        }
                    ]
                },*/
                {
                    viewId: swl.DISK_STATUS_CHART_ID,
                    suites: [
                        {
                            class: CustomTestSuite1,
                            groups: ['all'],
                            severity: cotc.SEVERITY_LOW
                        }
                    ]
                },
                {
                    viewId: swl.CLUSTER_STATUS_ID+ '-rtd',
                    suites: [
                        {
                            class: CustomTestSuite2,
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
