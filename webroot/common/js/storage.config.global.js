/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

var config = {};

config.ceph={}
/* Ceph Rest API default IP Address */
var ipAddress = '127.0.0.1';
config.ceph.enabled=true;

/*Stroage Rest API Server and port */
config.ceph.server_ip=ipAddress;

/* Ceph Rest API default Port */
config.ceph.server_port='5005';

// Export this as a module.
module.exports = config;
