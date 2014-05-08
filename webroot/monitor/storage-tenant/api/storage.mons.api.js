/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

var global   = require('../../../common/global'),
    commonUtils = require('../../../utils/common.utils'),
    rest = require('../../../common/rest.api'),
    storageRest= require('./storage.server.api'),
    storageUtils= require('../../../common/api/utils/storage.utils'),
    async = require('async'),
    jsonPath = require('JSONPath').eval,
    util = require('util'),
    storageMonsApi = module.exports;


function getMonitorSummary(req, res, appData){
     url = "/status";
     storageRest.apiGet(url, appData,function (error, resultJSON) {
            if(!error && (resultJSON)) {
                var resultJSON = parseMonitorSummary(resultJSON);
                commonUtils.handleJSONResponse(null, res, resultJSON);
            } else {
                commonUtils.handleJSONResponse(error, res, null);
            }
        });   
}

function parseMonitorSummary(resultJSON){
    return consolidateMonitors(resultJSON);;
}

function getMonitorDetails(req, res, appData){
    var mon_name = req.param('name');
     url = "/status";
     storageRest.apiGet(url, appData,function (error, resultJSON) {
            if(!error && (resultJSON)) {
                var resultJSON = parseMonitorDetails(mon_name,resultJSON);
                commonUtils.handleJSONResponse(null, res, resultJSON);
            } else {
                commonUtils.handleJSONResponse(error, res, null);
            }
        });   
}

function parseMonitorDetails(name, resultJSON){
    resultJSON = consolidateMonitors(resultJSON);
    var monDetails = jsonPath(resultJSON, "$..monitors[?(@.name=='"+name+"')]")[0];
    var monJSON = {};
        monJSON['monitor_details'] = monDetails;
    return monJSON;
}



function consolidateMonitors(resultJSON){
    var emptyObj = {};  
        var monJSON = {};
        var monitor = jsonPath(resultJSON, "$..mons");
         if(monitor.length >2){
             var status= jsonPath(resultJSON, "$..overall_status")[0];
                var monitors = monitor[0];
                monitors.merge(monitor[1]);
                monitors.merge(monitor[2]);
                monJSON['overall_status'] = status;
                monJSON['monitors'] = monitors;

                return monJSON;
         }

     return emptyObj;
}


/* List all public functions */
exports.getMonitorSummary = getMonitorSummary;
exports.getMonitorDetails = getMonitorDetails;
exports.consolidateMonitors=consolidateMonitors;




