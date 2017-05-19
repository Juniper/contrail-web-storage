/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

/*****************************************************************************

* Ceph Rest API configuration

*****************************************************************************/
var config = {};

config.ceph = {};
config.ceph.server_ip = '127.0.0.1';
config.ceph.server_port = '5005';

// Export this as a module.
module.exports = config;
