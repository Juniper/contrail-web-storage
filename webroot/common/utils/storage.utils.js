
var commonUtils = require(process.mainModule.exports["corePath"] + '/src/serverroot/utils/common.utils'),
    config = require(process.mainModule.exports["corePath"] + '/config/config.global.js'),
    logutils = require(process.mainModule.exports["corePath"] + '/src/serverroot/utils/log.utils'),
    global = require(process.mainModule.exports["corePath"] + '/src/serverroot/common/global'),
    rest = require(process.mainModule.exports["corePath"] + '/src/serverroot/common/rest.api'),
    opApiServer = require(process.mainModule.exports["corePath"] + '/src/serverroot/common/opServer.api');

function createTimeQueryJsonObj (minsSince, endTime){
    var startTime = 0, timeObj = {};

    if ((null != minsSince) && ((null == endTime) || ('' == endTime))) {
        timeObj['start_time'] = 'now-' + minsSince +'m';
        timeObj['end_time'] = 'now';
        return timeObj;
    }

    if(('now' == endTime)){
        endTime = commonUtils.getUTCTime(new Date().getTime());
    }

    if(endTime != null && endTime != '' ) {
        try {
            endTime = parseInt(endTime);
        } catch (err) {
            endTime = commonUtils.getUTCTime(new Date().getTime());
        }
    }else{
        endTime = commonUtils.getUTCTime(new Date().getTime());
    }



    if (minsSince != -1) {
        startTime = commonUtils.getUTCTime(commonUtils.adjustDate(new Date(endTime), {'min':-minsSince}).getTime());
    }


    timeObj['start_time'] = startTime * 1000;
    timeObj['end_time'] = endTime * 1000;

    return timeObj;
}


function getQueryJSON4Table(tableName, autoSort, autoLimit){
    var queryJSON;
    if(tableName.indexOf('StatTable.') != -1) {
        queryJSON = {"table": tableName, "start_time": "", "end_time": "", "select_fields": [], "filter": [], "limit": 150000};
    } else {
        queryJSON = {"table": tableName, "start_time": "", "end_time": "", "select_fields": [], "limit": 150000};
    }
    return queryJSON;
}

function formatAndClause (objArr){
    var result = [];
    var len = objArr.length;
    result[0] = [];
    for (var i = 0; i < len; i++) {
        for (key in objArr[i]) {
            result[0].push({'name':key, 'op':1, 'value':objArr[i][key]});
        }
    }
    return result;
}

function getTimeGranByTimeSlice (timeObj, sampleCnt){
    var startTime = timeObj['start_time'];
    var endTime = timeObj['end_time'];
    if (true == isNaN(startTime)) {
        var str = 'now-';
        var pos = startTime.indexOf(str);
        if (pos != -1) {
            var mins = startTime.slice(pos + str.length);
            mins = mins.substr(0, mins.length - 1);
            mins = parseInt(mins);
        } else {
            assert(0);
        }
        var timeGran = (mins * 60) / sampleCnt;
        return Math.floor(timeGran);
    }

    var timeGran = (endTime - startTime) / (sampleCnt *
        global.MILLISEC_IN_SEC * global.MICROSECS_IN_MILL);
    if (timeGran < 1) {
        timeGran = 1;
    }
    return Math.floor(timeGran);
}
function formatQueryStringWithWhereClause (table, whereClause, selectFieldObjArr, timeObj, noSortReqd, limit, dir){
    var queryJSON = getQueryJSON4Table(table),
        selectLen = selectFieldObjArr.length;
    queryJSON['select_fields'] = [];

    for (var i = 0; i < selectLen; i++) {
        /* Every array element is one object */
        queryJSON['select_fields'][i] = selectFieldObjArr[i];
    }
    queryJSON['select_fields'][i] = 'flow_count';
    selectFieldObjArr[i] = 'flow_count';

    queryJSON['start_time'] = timeObj['start_time'];
    queryJSON['end_time'] = timeObj['end_time'];
    if ((null == noSortReqd) || (false == noSortReqd) ||
        (typeof noSortReqd === 'undefined')) {
        queryJSON['sort_fields'] = ['sum(bytes)'];
        queryJSON['sort'] = global.QUERY_STRING_SORT_DESC;
    }
    if ((limit != null) && (typeof limit != undefined) && (-1 != limit)) {
        queryJSON['limit'] = limit;
    }
    queryJSON['where'] = whereClause;

    return commonUtils.cloneObj(queryJSON);
}

function executePostQueryString (opServerPostData, appData, callback){
    var resultData, startTime = (new Date()).getTime(), endTime;
        opApiServer.apiPost(global.RUN_QUERY_URL, opServerPostData, appData,  function (error, jsonData) {
            endTime = (new Date()).getTime();
            logutils.logger.debug("Query executed in " + ((endTime - startTime) / 1000) +
                'secs ' + JSON.stringify(opServerPostData));
            callback(error, jsonData);
        });

}

function executeGetQueryString (opServerURL, appData, callback){
    var resultData, startTime = (new Date()).getTime(), endTime;
        opApiServer.apiGet(opServerURL, appData, function(error, jsonData) {
            endTime = (new Date()).getTime();
            logutils.logger.debug("opServerURL:" + ((endTime - startTime) / 1000) +'secs ' + opServerURL);
               callback(error, jsonData);
            });
}

exports.formatAndClause= formatAndClause;
exports.getQueryJSON4Table = getQueryJSON4Table;
exports.createTimeQueryJsonObj=createTimeQueryJsonObj;
exports.getTimeGranByTimeSlice = getTimeGranByTimeSlice;
exports.formatQueryStringWithWhereClause= formatQueryStringWithWhereClause;
exports.executePostQueryString =executePostQueryString;
exports.executeGetQueryString = executeGetQueryString;


Object.defineProperty(Object.prototype, "merge", {
    enumerable: false,
    value: function () {
        var override = true,
            dest = this,
            len = arguments.length,
            props, merge, i, from;

        if (typeof(arguments[arguments.length - 1]) === "boolean") {
            override = arguments[arguments.length - 1];
            len = arguments.length - 1;
        }

        for (i = 0; i < len; i++) {
            from = arguments[i];
            if (from != null) {
                Object.getOwnPropertyNames(from).forEach(function (name) {
                    var descriptor;

                    // nesting
                    if ((typeof(dest[name]) === "object" || typeof(dest[name]) === "undefined")
                            && typeof(from[name]) === "object") {

                        // ensure proper types (Array rsp Object)
                        if (typeof(dest[name]) === "undefined") {
                            dest[name] = Array.isArray(from[name]) ? [] : {};
                        }
                        if (override) {
                            if (!Array.isArray(dest[name]) && Array.isArray(from[name])) {
                                dest[name] = [];
                            }
                            else if (Array.isArray(dest[name]) && !Array.isArray(from[name])) {
                                dest[name] = {};
                            }
                        }
                        dest[name].merge(from[name], override);
                    } 

                    // flat properties
                    else if ((name in dest && override) || !(name in dest)) {
                        descriptor = Object.getOwnPropertyDescriptor(from, name);
                        if (descriptor.configurable) {
                            Object.defineProperty(dest, name, descriptor);
                        }
                    }
                });
            }
        }
        return this;
    }
});