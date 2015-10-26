/*
 * Copyright (c) 2015 Juniper Networks, Inc. All rights reserved.
 */

define(['underscore'], function (_) {
    
    this.strMonsMockData = {
          "overall_status": "HEALTH_ERR",
          "details": false,
          "monitors": [
            {
              "name": "cmbu-vxa2100-proto3",
              "rank": 0,
              "addr": "50.1.0.1:6789/0",
              "skew": "0.000000",
              "health": "HEALTH_OK",
              "last_updated": "2015-09-21 13:43:56.419439",
              "avail_percent": 90,
              "latency": "0.000000",
              "kb_used": 16070416,
              "store_stats": {
                "bytes_sst": 0,
                "bytes_misc": 86436956,
                "last_updated": "0.000000",
                "bytes_log": 1879277,
                "bytes_total": 88316233
              },
              "kb_total": 331973040,
              "act_health": "HEALTH_OK",
              "kb_avail": 299016252
            },
            {
              "name": "cmbu-vxa2010-17",
              "rank": 1,
              "addr": "50.1.0.2:6789/0",
              "skew": "-0.000000",
              "health": "HEALTH_OK",
              "last_updated": "2015-09-21 13:43:52.516572",
              "avail_percent": 93,
              "latency": "0.004859",
              "kb_used": 4479092,
              "store_stats": {
                "bytes_sst": 0,
                "bytes_misc": 86214090,
                "last_updated": "0.000000",
                "bytes_log": 2815224,
                "bytes_total": 89029314
              },
              "kb_total": 406284856,
              "act_health": "HEALTH_OK",
              "kb_avail": 381144568
            }
          ]
    };
    
    return {
        strMonsMockData: strMonsMockData,
    };
});
