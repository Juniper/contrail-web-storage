/*
 * Copyright (c) 2013 Juniper Networks, Inc. All rights reserved.
 */
var storageConfig = require('../../../common/js/storage.config.global');
var storageApi= require('../../../common/api/storage.api.constants');

var commonUtils = require(storageConfig.core_path +
                        '/src/serverroot/utils/common.utils'),
    storageRest= require('../../../common/api/storage.rest.api'),
    async = require('async'),
    jsonPath = require('JSONPath').eval,

storagePoolsApi = module.exports;

function getStoragePGPoolsSummary(req, res, appData){

    var dataObjArr = [];
    var resultJSON = [];
    urlPools = storageApi.url.pgDumpPools; //"/pg/dump_pools_json";
    commonUtils.createReqObj(dataObjArr, urlPools, null, null, 
                                         null, null, appData);

    urlDF = storageApi.url.df;
    commonUtils.createReqObj(dataObjArr, urlDF, null, null, 
                                         null, null, appData);

    async.map(dataObjArr,
                      commonUtils.getAPIServerResponse(storageRest.apiGet, true),
                      function(err, data) {
                resultJSON = parseStoragePGPoolsData(data);        
                commonUtils.handleJSONResponse(err, res, resultJSON);
            });
}



function parseStoragePGPoolsData(poolJSON){
    var resultJSON = {};
    var pools= jsonPath(poolJSON[0],"$.output")[0];
    var odf= poolJSON[1];
    var poolMapJSON = new Object();
    poolMapJSON['pools']= parsePoolsData(pools, odf);
    resultJSON = poolMapJSON;
    return resultJSON;
}

function parsePoolsData(pools, odf){
    var nodeCnt= pools.length;
    for (i = 0; i < nodeCnt; i++) { 
        var pId=jsonPath(pools,"$["+i+"].poolid")[0];
        var dfCnt = jsonPath(odf,"$.output.pools.length")[0];
        for(j=0; j< dfCnt; j++){
            var dfPoolId= jsonPath(odf,"$.output.pools["+j+"].id")[0];
            if( pId == dfPoolId){
                 pools[i]['name']=jsonPath(odf,"$.output.pools["+j+"].name")[0];
                 pools[i]['stats']=jsonPath(odf,"$.output.pools["+j+"].stats")[0];
                
            }

        }
     }
    return pools;
}

function getStoragePGPoolDetails(req, res, appData){

    var dataObjArr = [];
    var resultJSON = [];
    var pool_name = req.param('name');
    urlPools = storageApi.url.pgDumpPools;
    commonUtils.createReqObj(dataObjArr, urlPools, null, null, 
                                         null, null, appData);

    urlDF = storageApi.url.df;
    commonUtils.createReqObj(dataObjArr, urlDF, null, null, 
                                         null, null, appData);

    async.map(dataObjArr,
                      commonUtils.getAPIServerResponse(storageRest.apiGet, true),
                      function(err, data) {
                resultJSON = parseStoragePGPoolDetails(pool_name, data);        
                commonUtils.handleJSONResponse(err, res, resultJSON);
            });
}


function parseStoragePGPoolDetails(name, poolJSON){
   resultJSON = parseStoragePGPoolsData(poolJSON);
    var pDetails = jsonPath(resultJSON, "$.pools[?(@.name=='"+name+"')]")[0];
    var pJSON = {};
        pJSON['pool_details'] = pDetails;
    return pJSON;
}

/* List all public functions */
exports.getStoragePGPoolsSummary=getStoragePGPoolsSummary
exports.getStoragePGPoolDetails=getStoragePGPoolDetails



