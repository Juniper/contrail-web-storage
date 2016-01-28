/*
 * Copyright (c) 2015 Juniper Networks, Inc. All rights reserved.
 */

define(['underscore'], function (_) {

    this.diskMockData = {
      "osd_details": {
        "status": "up",
        "name": "osd.0",
        "type_id": 0,
        "type": "osd",
        "id": 0,
        "public_addr": "50.1.0.1:6800/3850",
        "uuid": "d2fa6491-6a99-408b-8666-531719d77457",
        "down_at": 1590,
        "up_from": 1591,
        "cluster_status": "in",
        "up": 1,
        "in": 1,
        "state": [
          "exists",
          "up"
        ],
        "osd_xinfo": {
          "laggy_probability": "1.000000",
          "laggy_interval": 0,
          "features": 70368744177663,
          "old_weight": 0,
          "down_stamp": "2015-10-21 14:33:01.075704",
          "osd": 0
        },
        "kb": 487099008,
        "kb_avail": 100387352,
        "kb_used": 386711656,
        "fs_perf_stat": {
          "apply_latency_ms": 45,
          "commit_latency_ms": 37
        },
        "host": "cmbu-vxa2100-proto3",
        "avg_bw": {
          "Date": "2015-10-22T02:20:49.550Z",
          "name": "cmbu-vxa2100-proto3:osd.0",
          "uuid": "d2fa6491-6a99-408b-8666-531719d77457",
          "sampleCnt": 100,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        }
      }
    };

    this.flowSeriesForFrontendDiskMockData = {
      "summary": {
        "start_time": "2016-01-25T20:36:07.708Z",
        "end_time": "2016-01-25T20:49:31.591Z",
        "timeGran_microsecs": 60000000,
        "name": "ubuntu14-compute1:osd.0",
        "uuid": "b537ba07-203f-40f6-948a-6ccbda2c5420",
        "osd_name": "osd.0"
      },
      "flow-series": [
        {
          "date": "2016-01-25T20:36:07.708Z",
          "MessageTS": 1453754167708464,
          "reads": 0,
          "writes": 2,
          "reads_kbytes": 0,
          "writes_kbytes": 10011,
          "op_r_latency": 0,
          "op_w_latency": 560
        },
        {
          "date": "2016-01-25T20:36:19.840Z",
          "MessageTS": 1453754179840517,
          "reads": 0,
          "writes": 3,
          "reads_kbytes": 0,
          "writes_kbytes": 13167,
          "op_r_latency": 0,
          "op_w_latency": 1288
        },
        {
          "date": "2016-01-25T20:36:32.601Z",
          "MessageTS": 1453754192601200,
          "reads": 0,
          "writes": 4,
          "reads_kbytes": 0,
          "writes_kbytes": 17345,
          "op_r_latency": 0,
          "op_w_latency": 777
        },
        {
          "date": "2016-01-25T20:36:44.973Z",
          "MessageTS": 1453754204973961,
          "reads": 0,
          "writes": 2,
          "reads_kbytes": 0,
          "writes_kbytes": 10590,
          "op_r_latency": 0,
          "op_w_latency": 746
        },
        {
          "date": "2016-01-25T20:36:56.997Z",
          "MessageTS": 1453754216997170,
          "reads": 0,
          "writes": 3,
          "reads_kbytes": 0,
          "writes_kbytes": 16349,
          "op_r_latency": 0,
          "op_w_latency": 1006
        },
        {
          "date": "2016-01-25T20:37:09.128Z",
          "MessageTS": 1453754229128217,
          "reads": 0,
          "writes": 3,
          "reads_kbytes": 0,
          "writes_kbytes": 14857,
          "op_r_latency": 0,
          "op_w_latency": 871
        },
        {
          "date": "2016-01-25T20:37:21.239Z",
          "MessageTS": 1453754241239424,
          "reads": 0,
          "writes": 3,
          "reads_kbytes": 0,
          "writes_kbytes": 14550,
          "op_r_latency": 0,
          "op_w_latency": 1091
        },
        {
          "date": "2016-01-25T20:37:33.345Z",
          "MessageTS": 1453754253345538,
          "reads": 0,
          "writes": 3,
          "reads_kbytes": 0,
          "writes_kbytes": 12515,
          "op_r_latency": 0,
          "op_w_latency": 1133
        },
        {
          "date": "2016-01-25T20:37:45.590Z",
          "MessageTS": 1453754265590837,
          "reads": 0,
          "writes": 3,
          "reads_kbytes": 0,
          "writes_kbytes": 13045,
          "op_r_latency": 0,
          "op_w_latency": 1237
        },
        {
          "date": "2016-01-25T20:37:59.840Z",
          "MessageTS": 1453754279840322,
          "reads": 0,
          "writes": 2,
          "reads_kbytes": 0,
          "writes_kbytes": 10065,
          "op_r_latency": 0,
          "op_w_latency": 1058
        },
        {
          "date": "2016-01-25T20:38:11.944Z",
          "MessageTS": 1453754291944162,
          "reads": 0,
          "writes": 3,
          "reads_kbytes": 0,
          "writes_kbytes": 14884,
          "op_r_latency": 0,
          "op_w_latency": 1006
        },
        {
          "date": "2016-01-25T20:38:23.962Z",
          "MessageTS": 1453754303962268,
          "reads": 0,
          "writes": 2,
          "reads_kbytes": 0,
          "writes_kbytes": 11931,
          "op_r_latency": 0,
          "op_w_latency": 783
        },
        {
          "date": "2016-01-25T20:38:36.566Z",
          "MessageTS": 1453754316566327,
          "reads": 0,
          "writes": 3,
          "reads_kbytes": 0,
          "writes_kbytes": 15924,
          "op_r_latency": 0,
          "op_w_latency": 911
        },
        {
          "date": "2016-01-25T20:38:48.686Z",
          "MessageTS": 1453754328686015,
          "reads": 0,
          "writes": 2,
          "reads_kbytes": 0,
          "writes_kbytes": 10816,
          "op_r_latency": 0,
          "op_w_latency": 784
        },
        {
          "date": "2016-01-25T20:39:01.221Z",
          "MessageTS": 1453754341221819,
          "reads": 0,
          "writes": 3,
          "reads_kbytes": 0,
          "writes_kbytes": 12418,
          "op_r_latency": 0,
          "op_w_latency": 865
        },
        {
          "date": "2016-01-25T20:39:16.226Z",
          "MessageTS": 1453754356226010,
          "reads": 0,
          "writes": 3,
          "reads_kbytes": 0,
          "writes_kbytes": 13653,
          "op_r_latency": 0,
          "op_w_latency": 1031
        },
        {
          "date": "2016-01-25T20:39:28.348Z",
          "MessageTS": 1453754368348661,
          "reads": 0,
          "writes": 4,
          "reads_kbytes": 0,
          "writes_kbytes": 17566,
          "op_r_latency": 0,
          "op_w_latency": 773
        },
        {
          "date": "2016-01-25T20:39:40.892Z",
          "MessageTS": 1453754380892846,
          "reads": 0,
          "writes": 2,
          "reads_kbytes": 0,
          "writes_kbytes": 9145,
          "op_r_latency": 0,
          "op_w_latency": 1071
        },
        {
          "date": "2016-01-25T20:39:53.032Z",
          "MessageTS": 1453754393032035,
          "reads": 0,
          "writes": 4,
          "reads_kbytes": 0,
          "writes_kbytes": 16537,
          "op_r_latency": 0,
          "op_w_latency": 919
        },
        {
          "date": "2016-01-25T20:40:05.123Z",
          "MessageTS": 1453754405123534,
          "reads": 0,
          "writes": 2,
          "reads_kbytes": 0,
          "writes_kbytes": 10157,
          "op_r_latency": 0,
          "op_w_latency": 1009
        },
        {
          "date": "2016-01-25T20:40:17.153Z",
          "MessageTS": 1453754417153382,
          "reads": 0,
          "writes": 3,
          "reads_kbytes": 0,
          "writes_kbytes": 15667,
          "op_r_latency": 0,
          "op_w_latency": 956
        },
        {
          "date": "2016-01-25T20:40:32.142Z",
          "MessageTS": 1453754432142135,
          "reads": 0,
          "writes": 2,
          "reads_kbytes": 0,
          "writes_kbytes": 11477,
          "op_r_latency": 0,
          "op_w_latency": 1131
        },
        {
          "date": "2016-01-25T20:40:45.791Z",
          "MessageTS": 1453754445791439,
          "reads": 0,
          "writes": 3,
          "reads_kbytes": 0,
          "writes_kbytes": 15007,
          "op_r_latency": 0,
          "op_w_latency": 944
        },
        {
          "date": "2016-01-25T20:40:58.183Z",
          "MessageTS": 1453754458183123,
          "reads": 0,
          "writes": 2,
          "reads_kbytes": 0,
          "writes_kbytes": 11569,
          "op_r_latency": 0,
          "op_w_latency": 1178
        },
        {
          "date": "2016-01-25T20:41:10.242Z",
          "MessageTS": 1453754470242211,
          "reads": 0,
          "writes": 3,
          "reads_kbytes": 0,
          "writes_kbytes": 14269,
          "op_r_latency": 0,
          "op_w_latency": 1007
        },
        {
          "date": "2016-01-25T20:41:22.248Z",
          "MessageTS": 1453754482248141,
          "reads": 0,
          "writes": 3,
          "reads_kbytes": 0,
          "writes_kbytes": 12960,
          "op_r_latency": 0,
          "op_w_latency": 1136
        },
        {
          "date": "2016-01-25T20:41:34.557Z",
          "MessageTS": 1453754494557051,
          "reads": 0,
          "writes": 3,
          "reads_kbytes": 0,
          "writes_kbytes": 14314,
          "op_r_latency": 0,
          "op_w_latency": 1068
        },
        {
          "date": "2016-01-25T20:41:49.509Z",
          "MessageTS": 1453754509509464,
          "reads": 0,
          "writes": 2,
          "reads_kbytes": 0,
          "writes_kbytes": 12052,
          "op_r_latency": 0,
          "op_w_latency": 1108
        },
        {
          "date": "2016-01-25T20:42:01.672Z",
          "MessageTS": 1453754521672547,
          "reads": 0,
          "writes": 3,
          "reads_kbytes": 0,
          "writes_kbytes": 14819,
          "op_r_latency": 0,
          "op_w_latency": 729
        },
        {
          "date": "2016-01-25T20:42:14.521Z",
          "MessageTS": 1453754534521830,
          "reads": 0,
          "writes": 3,
          "reads_kbytes": 0,
          "writes_kbytes": 12753,
          "op_r_latency": 0,
          "op_w_latency": 1261
        },
        {
          "date": "2016-01-25T20:42:27.074Z",
          "MessageTS": 1453754547074341,
          "reads": 0,
          "writes": 3,
          "reads_kbytes": 0,
          "writes_kbytes": 13053,
          "op_r_latency": 0,
          "op_w_latency": 704
        },
        {
          "date": "2016-01-25T20:42:39.097Z",
          "MessageTS": 1453754559097933,
          "reads": 0,
          "writes": 3,
          "reads_kbytes": 0,
          "writes_kbytes": 13285,
          "op_r_latency": 0,
          "op_w_latency": 738
        },
        {
          "date": "2016-01-25T20:42:51.339Z",
          "MessageTS": 1453754571339223,
          "reads": 0,
          "writes": 3,
          "reads_kbytes": 0,
          "writes_kbytes": 15394,
          "op_r_latency": 0,
          "op_w_latency": 902
        },
        {
          "date": "2016-01-25T20:43:03.362Z",
          "MessageTS": 1453754583362360,
          "reads": 0,
          "writes": 3,
          "reads_kbytes": 0,
          "writes_kbytes": 14989,
          "op_r_latency": 0,
          "op_w_latency": 868
        },
        {
          "date": "2016-01-25T20:43:15.690Z",
          "MessageTS": 1453754595690513,
          "reads": 0,
          "writes": 3,
          "reads_kbytes": 0,
          "writes_kbytes": 14619,
          "op_r_latency": 0,
          "op_w_latency": 965
        },
        {
          "date": "2016-01-25T20:44:00.165Z",
          "MessageTS": 1453754640165866,
          "reads": 0,
          "writes": 2,
          "reads_kbytes": 0,
          "writes_kbytes": 11169,
          "op_r_latency": 0,
          "op_w_latency": 921
        },
        {
          "date": "2016-01-25T20:44:23.272Z",
          "MessageTS": 1453754663272630,
          "reads": 0,
          "writes": 2,
          "reads_kbytes": 0,
          "writes_kbytes": 11475,
          "op_r_latency": 0,
          "op_w_latency": 1338
        },
        {
          "date": "2016-01-25T20:44:35.424Z",
          "MessageTS": 1453754675424786,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:44:47.587Z",
          "MessageTS": 1453754687587114,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:44:59.725Z",
          "MessageTS": 1453754699725332,
          "reads": 2,
          "writes": 0,
          "reads_kbytes": 11133,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:45:11.863Z",
          "MessageTS": 1453754711863227,
          "reads": 1,
          "writes": 0,
          "reads_kbytes": 7762,
          "writes_kbytes": 0,
          "op_r_latency": 50,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:45:24.022Z",
          "MessageTS": 1453754724022070,
          "reads": 3,
          "writes": 0,
          "reads_kbytes": 14492,
          "writes_kbytes": 2696,
          "op_r_latency": 65,
          "op_w_latency": 1214
        },
        {
          "date": "2016-01-25T20:45:39.309Z",
          "MessageTS": 1453754739309975,
          "reads": 0,
          "writes": 3,
          "reads_kbytes": 2410,
          "writes_kbytes": 12855,
          "op_r_latency": 285,
          "op_w_latency": 1095
        },
        {
          "date": "2016-01-25T20:45:52.941Z",
          "MessageTS": 1453754752941339,
          "reads": 0,
          "writes": 2,
          "reads_kbytes": 2103,
          "writes_kbytes": 10818,
          "op_r_latency": 571,
          "op_w_latency": 1083
        },
        {
          "date": "2016-01-25T20:46:07.216Z",
          "MessageTS": 1453754767216711,
          "reads": 1,
          "writes": 2,
          "reads_kbytes": 4305,
          "writes_kbytes": 10909,
          "op_r_latency": 333,
          "op_w_latency": 1448
        },
        {
          "date": "2016-01-25T20:46:22.926Z",
          "MessageTS": 1453754782926148,
          "reads": 0,
          "writes": 2,
          "reads_kbytes": 2606,
          "writes_kbytes": 9646,
          "op_r_latency": 400,
          "op_w_latency": 1203
        },
        {
          "date": "2016-01-25T20:46:36.861Z",
          "MessageTS": 1453754796861815,
          "reads": 0,
          "writes": 2,
          "reads_kbytes": 3232,
          "writes_kbytes": 10580,
          "op_r_latency": 90,
          "op_w_latency": 792
        },
        {
          "date": "2016-01-25T20:46:50.519Z",
          "MessageTS": 1453754810519411,
          "reads": 1,
          "writes": 2,
          "reads_kbytes": 5097,
          "writes_kbytes": 11096,
          "op_r_latency": 294,
          "op_w_latency": 1111
        },
        {
          "date": "2016-01-25T20:47:03.930Z",
          "MessageTS": 1453754823930566,
          "reads": 0,
          "writes": 2,
          "reads_kbytes": 1249,
          "writes_kbytes": 10938,
          "op_r_latency": 750,
          "op_w_latency": 1142
        },
        {
          "date": "2016-01-25T20:47:16.720Z",
          "MessageTS": 1453754836720782,
          "reads": 0,
          "writes": 2,
          "reads_kbytes": 2503,
          "writes_kbytes": 10639,
          "op_r_latency": 875,
          "op_w_latency": 1532
        },
        {
          "date": "2016-01-25T20:47:29.483Z",
          "MessageTS": 1453754849483825,
          "reads": 0,
          "writes": 3,
          "reads_kbytes": 3530,
          "writes_kbytes": 12839,
          "op_r_latency": 636,
          "op_w_latency": 1395
        },
        {
          "date": "2016-01-25T20:47:43.203Z",
          "MessageTS": 1453754863203285,
          "reads": 0,
          "writes": 2,
          "reads_kbytes": 2686,
          "writes_kbytes": 10149,
          "op_r_latency": 0,
          "op_w_latency": 963
        },
        {
          "date": "2016-01-25T20:47:56.435Z",
          "MessageTS": 1453754876435061,
          "reads": 0,
          "writes": 2,
          "reads_kbytes": 3095,
          "writes_kbytes": 11454,
          "op_r_latency": 300,
          "op_w_latency": 1141
        },
        {
          "date": "2016-01-25T20:48:10.216Z",
          "MessageTS": 1453754890216238,
          "reads": 0,
          "writes": 2,
          "reads_kbytes": 1486,
          "writes_kbytes": 10106,
          "op_r_latency": 400,
          "op_w_latency": 1167
        },
        {
          "date": "2016-01-25T20:48:24.043Z",
          "MessageTS": 1453754904043417,
          "reads": 0,
          "writes": 3,
          "reads_kbytes": 2962,
          "writes_kbytes": 12738,
          "op_r_latency": 600,
          "op_w_latency": 1339
        },
        {
          "date": "2016-01-25T20:48:36.871Z",
          "MessageTS": 1453754916871053,
          "reads": 0,
          "writes": 2,
          "reads_kbytes": 1916,
          "writes_kbytes": 10221,
          "op_r_latency": 571,
          "op_w_latency": 1447
        },
        {
          "date": "2016-01-25T20:48:51.223Z",
          "MessageTS": 1453754931223173,
          "reads": 0,
          "writes": 3,
          "reads_kbytes": 1997,
          "writes_kbytes": 12555,
          "op_r_latency": 571,
          "op_w_latency": 1208
        },
        {
          "date": "2016-01-25T20:49:04.615Z",
          "MessageTS": 1453754944615805,
          "reads": 0,
          "writes": 2,
          "reads_kbytes": 2446,
          "writes_kbytes": 8870,
          "op_r_latency": 285,
          "op_w_latency": 1024
        },
        {
          "date": "2016-01-25T20:49:17.752Z",
          "MessageTS": 1453754957752948,
          "reads": 0,
          "writes": 2,
          "reads_kbytes": 2182,
          "writes_kbytes": 11226,
          "op_r_latency": 285,
          "op_w_latency": 774
        },
        {
          "date": "2016-01-25T20:49:31.591Z",
          "MessageTS": 1453754971591866,
          "reads": 0,
          "writes": 3,
          "reads_kbytes": 3255,
          "writes_kbytes": 13320,
          "op_r_latency": 363,
          "op_w_latency": 1066
        }
      ]
    };

    this.flowSeriesForFrontendRawDiskMockData ={
      "summary": {
        "start_time": "2016-01-25T20:36:00.614Z",
        "end_time": "2016-01-25T20:42:19.705Z",
        "timeGran_microsecs": 60000000,
        "name": "ubuntu14-compute1:vdb",
        "uuid": "234d0cf7-ca32-4afe-817d-0c4383b66d03",
        "osd_name": "osd.0"
      },
      "flow-series": [
        {
          "date": "2016-01-25T20:36:00.614Z",
          "MessageTS": 1453754160614838,
          "reads": 0,
          "writes": 5,
          "reads_kbytes": 0,
          "writes_kbytes": 4105,
          "op_r_latency": 0,
          "op_w_latency": 41997716
        },
        {
          "date": "2016-01-25T20:36:12.902Z",
          "MessageTS": 1453754172902676,
          "reads": 0,
          "writes": 24,
          "reads_kbytes": 0,
          "writes_kbytes": 32821,
          "op_r_latency": 0,
          "op_w_latency": 38697135
        },
        {
          "date": "2016-01-25T20:36:25.035Z",
          "MessageTS": 1453754185035299,
          "reads": 0,
          "writes": 21,
          "reads_kbytes": 0,
          "writes_kbytes": 25701,
          "op_r_latency": 0,
          "op_w_latency": 2022
        },
        {
          "date": "2016-01-25T20:36:37.778Z",
          "MessageTS": 1453754197778157,
          "reads": 0,
          "writes": 12,
          "reads_kbytes": 0,
          "writes_kbytes": 13349,
          "op_r_latency": 0,
          "op_w_latency": 3877
        },
        {
          "date": "2016-01-25T20:36:50.057Z",
          "MessageTS": 1453754210057304,
          "reads": 0,
          "writes": 38,
          "reads_kbytes": 0,
          "writes_kbytes": 46465,
          "op_r_latency": 0,
          "op_w_latency": 4751
        },
        {
          "date": "2016-01-25T20:37:02.202Z",
          "MessageTS": 1453754222202409,
          "reads": 0,
          "writes": 21,
          "reads_kbytes": 0,
          "writes_kbytes": 35907,
          "op_r_latency": 0,
          "op_w_latency": 4777
        },
        {
          "date": "2016-01-25T20:37:14.305Z",
          "MessageTS": 1453754234305554,
          "reads": 0,
          "writes": 21,
          "reads_kbytes": 0,
          "writes_kbytes": 24693,
          "op_r_latency": 0,
          "op_w_latency": 1443
        },
        {
          "date": "2016-01-25T20:37:26.428Z",
          "MessageTS": 1453754246428685,
          "reads": 0,
          "writes": 21,
          "reads_kbytes": 0,
          "writes_kbytes": 32843,
          "op_r_latency": 0,
          "op_w_latency": 3202
        },
        {
          "date": "2016-01-25T20:37:38.540Z",
          "MessageTS": 1453754258540566,
          "reads": 0,
          "writes": 20,
          "reads_kbytes": 0,
          "writes_kbytes": 25704,
          "op_r_latency": 0,
          "op_w_latency": 1418
        },
        {
          "date": "2016-01-25T20:37:50.816Z",
          "MessageTS": 1453754270816246,
          "reads": 0,
          "writes": 20,
          "reads_kbytes": 0,
          "writes_kbytes": 21851,
          "op_r_latency": 0,
          "op_w_latency": 6854
        },
        {
          "date": "2016-01-25T20:38:05.016Z",
          "MessageTS": 1453754285016567,
          "reads": 0,
          "writes": 19,
          "reads_kbytes": 0,
          "writes_kbytes": 24678,
          "op_r_latency": 0,
          "op_w_latency": 2213
        },
        {
          "date": "2016-01-25T20:38:17.037Z",
          "MessageTS": 1453754297037450,
          "reads": 0,
          "writes": 16,
          "reads_kbytes": 0,
          "writes_kbytes": 26672,
          "op_r_latency": 0,
          "op_w_latency": 8144
        },
        {
          "date": "2016-01-25T20:38:29.166Z",
          "MessageTS": 1453754309166799,
          "reads": 0,
          "writes": 20,
          "reads_kbytes": 0,
          "writes_kbytes": 27751,
          "op_r_latency": 0,
          "op_w_latency": 727
        },
        {
          "date": "2016-01-25T20:38:41.753Z",
          "MessageTS": 1453754321753853,
          "reads": 0,
          "writes": 11,
          "reads_kbytes": 0,
          "writes_kbytes": 18469,
          "op_r_latency": 0,
          "op_w_latency": 7604
        },
        {
          "date": "2016-01-25T20:38:53.926Z",
          "MessageTS": 1453754333926492,
          "reads": 0,
          "writes": 18,
          "reads_kbytes": 0,
          "writes_kbytes": 22624,
          "op_r_latency": 0,
          "op_w_latency": 595
        },
        {
          "date": "2016-01-25T20:39:06.310Z",
          "MessageTS": 1453754346310618,
          "reads": 0,
          "writes": 18,
          "reads_kbytes": 0,
          "writes_kbytes": 30793,
          "op_r_latency": 0,
          "op_w_latency": 6225
        },
        {
          "date": "2016-01-25T20:39:21.421Z",
          "MessageTS": 1453754361421476,
          "reads": 0,
          "writes": 43,
          "reads_kbytes": 0,
          "writes_kbytes": 51661,
          "op_r_latency": 0,
          "op_w_latency": 2793
        },
        {
          "date": "2016-01-25T20:39:33.442Z",
          "MessageTS": 1453754373442401,
          "reads": 0,
          "writes": 13,
          "reads_kbytes": 0,
          "writes_kbytes": 22578,
          "op_r_latency": 0,
          "op_w_latency": 3918
        },
        {
          "date": "2016-01-25T20:39:46.094Z",
          "MessageTS": 1453754386094833,
          "reads": 0,
          "writes": 22,
          "reads_kbytes": 0,
          "writes_kbytes": 26766,
          "op_r_latency": 0,
          "op_w_latency": 2146
        },
        {
          "date": "2016-01-25T20:39:58.118Z",
          "MessageTS": 1453754398118086,
          "reads": 0,
          "writes": 15,
          "reads_kbytes": 0,
          "writes_kbytes": 24645,
          "op_r_latency": 0,
          "op_w_latency": 3194
        },
        {
          "date": "2016-01-25T20:40:10.203Z",
          "MessageTS": 1453754410203761,
          "reads": 0,
          "writes": 21,
          "reads_kbytes": 0,
          "writes_kbytes": 23674,
          "op_r_latency": 0,
          "op_w_latency": 365
        },
        {
          "date": "2016-01-25T20:40:22.340Z",
          "MessageTS": 1453754422340595,
          "reads": 0,
          "writes": 16,
          "reads_kbytes": 0,
          "writes_kbytes": 29762,
          "op_r_latency": 0,
          "op_w_latency": 2054
        },
        {
          "date": "2016-01-25T20:40:37.346Z",
          "MessageTS": 1453754437346400,
          "reads": 0,
          "writes": 24,
          "reads_kbytes": 0,
          "writes_kbytes": 30854,
          "op_r_latency": 0,
          "op_w_latency": 2011
        },
        {
          "date": "2016-01-25T20:40:50.871Z",
          "MessageTS": 1453754450871214,
          "reads": 0,
          "writes": 22,
          "reads_kbytes": 0,
          "writes_kbytes": 13733,
          "op_r_latency": 0,
          "op_w_latency": 2127
        },
        {
          "date": "2016-01-25T20:41:03.291Z",
          "MessageTS": 1453754463291388,
          "reads": 0,
          "writes": 25,
          "reads_kbytes": 0,
          "writes_kbytes": 32895,
          "op_r_latency": 0,
          "op_w_latency": 2772
        },
        {
          "date": "2016-01-25T20:41:15.335Z",
          "MessageTS": 1453754475335250,
          "reads": 0,
          "writes": 20,
          "reads_kbytes": 0,
          "writes_kbytes": 31818,
          "op_r_latency": 0,
          "op_w_latency": 7276
        },
        {
          "date": "2016-01-25T20:41:27.503Z",
          "MessageTS": 1453754487503989,
          "reads": 0,
          "writes": 18,
          "reads_kbytes": 0,
          "writes_kbytes": 19572,
          "op_r_latency": 0,
          "op_w_latency": 1786
        },
        {
          "date": "2016-01-25T20:41:39.873Z",
          "MessageTS": 1453754499873423,
          "reads": 0,
          "writes": 16,
          "reads_kbytes": 0,
          "writes_kbytes": 29760,
          "op_r_latency": 0,
          "op_w_latency": 3966
        },
        {
          "date": "2016-01-25T20:41:54.728Z",
          "MessageTS": 1453754514728750,
          "reads": 0,
          "writes": 17,
          "reads_kbytes": 0,
          "writes_kbytes": 23687,
          "op_r_latency": 0,
          "op_w_latency": 1130
        },
        {
          "date": "2016-01-25T20:42:06.766Z",
          "MessageTS": 1453754526766941,
          "reads": 0,
          "writes": 14,
          "reads_kbytes": 0,
          "writes_kbytes": 27717,
          "op_r_latency": 0,
          "op_w_latency": 5398
        },
        {
          "date": "2016-01-25T20:42:19.705Z",
          "MessageTS": 1453754539705580,
          "reads": 0,
          "writes": 24,
          "reads_kbytes": 0,
          "writes_kbytes": 19912,
          "op_r_latency": 0,
          "op_w_latency": 4827
        }
      ]
    };
    return {
        diskMockData: diskMockData,
        flowSeriesForFrontendDiskMockData: flowSeriesForFrontendDiskMockData,
        flowSeriesForFrontendRawDiskMockData: flowSeriesForFrontendRawDiskMockData,
    };
});
