

var storageApi= require('./storage.api.constants');

var commonUtils = require(process.mainModule.exports["corePath"]  + '/src/serverroot/utils/common.utils'),
    util = require('util'),
    qs = require('querystring'),
    async = require('async'),
    jsonPath = require('JSONPath').eval,
    storageRest= require('./storage.rest.api'),
    assert = require('assert'),
    storageCommonapi = module.exports;

function processClusterStorageHealth(res, appData, callback){
    var urlOSDList = "/cluster/storage/health/list";
    dataObjArr = getClusterHealthURLs(appData);
    async.map(dataObjArr,
        commonUtils.getAPIServerResponse(storageRest.apiGet, true),
        function(err, resultJSON) {
             callback(err,res,resultJSON);
        });
}
function getClusterHealthURLs(appData){
    var dataObjArr = [];
    urlHealth = storageApi.url.health;
    commonUtils.createReqObj(dataObjArr, urlHealth, null, null,
        null, null, appData);
    urlPGStat = storageApi.url.pgStat;
    commonUtils.createReqObj(dataObjArr, urlPGStat, null, null,
        null, null, appData);
    return dataObjArr;
}


function processStorageTopologyRawList(res, appData, callback){
    var urlOSDList = "/cluster/topology/ceph/list";
    dataObjArr = getTopologyURLs(appData);
    async.map(dataObjArr,
        commonUtils.getAPIServerResponse(storageRest.apiGet, true),
        function(err, resultJSON) {
             callback(err,res,resultJSON);
        });
}

function getTopologyURLs(appData){
    var dataObjArr = [];
    urlOSDsFromPG = storageApi.url.pgDumpOSDs;
    commonUtils.createReqObj(dataObjArr, urlOSDsFromPG, null, null,
        null, null, appData);
    urlOSDTree = storageApi.url.osdTree;
    commonUtils.createReqObj(dataObjArr, urlOSDTree, null, null,
        null, null, appData);
    urlOSDDump = storageApi.url.osdDump;
    commonUtils.createReqObj(dataObjArr, urlOSDDump, null, null,
        null, null, appData);
    urlStatus = storageApi.url.status;
    commonUtils.createReqObj(dataObjArr, urlStatus, null, null,
        null, null, appData);

    return dataObjArr;
}

exports.processStorageTopologyRawList = processStorageTopologyRawList;
exports.getTopologyURLs=getTopologyURLs;
exports.processClusterStorageHealth=processClusterStorageHealth;
