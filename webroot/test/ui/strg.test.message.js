/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore'
], function (_) {
    var TMessages = function() {
        this.POOLS_LIST_VIEW_COMMON_TEST_MODULE = 'Pools List view - Common Tests';
        this.POOLS_GRID_MODULE = 'Pools Grid -  NM Tests';
        this.POOLS_LIST_VIEW_CUSTOM_TEST = 'Pools List view - Custom Tests';
        this.POOLS_GRID_COLUMN_VALUE_CHECK = "Pools grid check for a particular column value equality";
        this.get = function () {
            var args = arguments;
            return args[0].replace(/\{(\d+)\}/g, function (m, n) {
                n = parseInt(n) + 1;
                return args[n];
            });
        };
    };
    return new TMessages();
});