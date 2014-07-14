/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

var storageConfig = require('../js/storage.config.global');

var storageApi= require('./storage.api.constants');

var rest  = require(process.mainModule.exports["corePath"] + '/src/serverroot/common/rest.api'),
    global = require(process.mainModule.exports["corePath"] + '/src/serverroot/common/global'),
    assert = require('assert');

var serverIp = global.DFLT_SERVER_IP;
var serverPort = '5005';
//var serverUrlVersion= storageApi.rest.serverVersion;


if (storageConfig.ceph.server_ip) {
    if (storageConfig.ceph.server_ip) {
        serverIp = storageConfig.ceph.server_ip;
    }
    if (storageConfig.ceph.server_port) {
        serverPort = storageConfig.ceph.server_port;
    }
}

storageServer = rest.getAPIServer({apiName:global.label.CEPH_API_SERVER,
                             server: serverIp, port: serverPort
                             });

function apiGet (url, appData, callback)
{
    var headers = {};
    headers['Accept'] = 'application/json';
    url = storageApi.rest.serverVersion + url;
    
    storageServer.api.get(url, function(err, data) {
        callback(err, data);
    }, headers);
}

function apiPut (url, putData, appData, callback)
{
    storageServer.api.get(url, putData, function(err, data) {
        callback(err, data);
    });
}

function apiPost (url, postData, appData, callback)
{
    storageServer.api.post(url, postData, function(err, data) {
        callback(err, data);
    });
}

function apiDelete (url, appData, allback)
{
    storageServer.api.delete(url, function(err, data) {
        callback(err, data);
    });
}

exports.apiGet = apiGet;
exports.apiPut = apiPut;
exports.apiPost = apiPost;
exports.apiDelete = apiDelete;

