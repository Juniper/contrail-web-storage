/*
 * Copyright (c) 2015 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore'
], function (_) {
    var SMessages = function () {
        this.DISK_DOWN = "{0:Disk;Disks} down - {1}";
        this.DISK_DOWN_LIST = "{0} down";
        this.DISK_OUT = "{0:Disk;Disks} out of cluster - {1}";
        this.DISK_OUT_LIST = "{0} out of cluster";
    };
    return SMessages;
});