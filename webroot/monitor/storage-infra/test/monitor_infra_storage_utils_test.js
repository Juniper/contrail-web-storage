/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */
module("Infra Storage Utils", {
    setup: function() {

    },
    teardown: function() {

    }
});

test("testParseStorageNodesDashboardData", function() {
    expect(1);
    //Test1
    deepEqual(infraMonitorStorageUtils.parseStorageNodesDashboardData(
            infraStorageUtilsMockData.getInput({
                fnName: 'parseStorageNodesDashboardData',
                type: 'test1'
            })
        ),
        infraStorageUtilsMockData.getOutput({
            fnName: 'parseStorageNodesDashboardData',
            type: 'test1'
        }),
        'Test parseStorageNodesDashboardData with valid data'
    );
});