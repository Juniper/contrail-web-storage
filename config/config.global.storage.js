/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

 /*****************************************************************************

  * Ceph Rest API configuration

  *****************************************************************************/
 var config = {};

 config.ceph = {};
 config.ceph.server_ip = '10.84.29.252';
 config.ceph.server_port = '5005';
 config.ceph.statusURL = '/api/v0.1/status';

 // Export this as a module.
 module.exports = config;
