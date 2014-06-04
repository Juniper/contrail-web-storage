/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

var config = {};

config.core_path = '/usr/src/contrail/contrail-web-core';

config.ceph={}
var ipAddress = '127.0.0.1'

config.ceph.enabled=true;

/*Stroage Rest API Server and port */
config.ceph.server_ip=ipAddress;

config.ceph.server_port='5005';

// Export this as a module.
module.exports = config;
