/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

var config = {};

config.ceph={}
var ipAddress = '10.87.140.28'

config.ceph.enabled=true;

/*Stroage Rest API Server and port */
config.ceph.server_ip=ipAddress;

config.ceph.server_port='5005';

/* Storage Web UI HTTP port for NodeJS Server. */
config.ceph.http_port = '9090';

/* Storage Web UI HTTPS port for NodeJS Server. */
config.ceph.https_port = '9143';


/* Configure level of logs */
config.logs = {};
config.logs.level = 'debug';

// Export this as a module.
module.exports = config;
