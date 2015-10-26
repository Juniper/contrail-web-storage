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
        "start_time": "2015-10-22T01:22:01.000Z",
        "end_time": "2015-10-22T02:22:01.000Z",
        "timeGran_microsecs": 60000000,
        "name": "cmbu-vxa2100-proto3:osd.0",
        "uuid": "c5308048-0c00-46ca-9c54-32709bf2a5f9",
        "osd_name": "osd.0"
      },
      "flow-series": [
        {
          "date": "2015-10-22T01:22:01.373Z",
          "MessageTS": 1445476921373757,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T01:22:19.462Z",
          "MessageTS": 1445476939462322,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T01:22:37.550Z",
          "MessageTS": 1445476957550679,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T01:22:55.447Z",
          "MessageTS": 1445476975447201,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T01:23:13.431Z",
          "MessageTS": 1445476993431638,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T01:23:31.511Z",
          "MessageTS": 1445477011511034,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T01:23:49.496Z",
          "MessageTS": 1445477029496508,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T01:24:07.488Z",
          "MessageTS": 1445477047488175,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T01:24:25.475Z",
          "MessageTS": 1445477065475473,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T01:24:43.459Z",
          "MessageTS": 1445477083459450,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T01:25:01.542Z",
          "MessageTS": 1445477101542712,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T01:25:19.521Z",
          "MessageTS": 1445477119521496,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T01:25:37.398Z",
          "MessageTS": 1445477137398451,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T01:25:55.378Z",
          "MessageTS": 1445477155378088,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T01:26:13.353Z",
          "MessageTS": 1445477173353905,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T01:26:31.229Z",
          "MessageTS": 1445477191229838,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T01:26:49.312Z",
          "MessageTS": 1445477209312436,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T01:27:07.290Z",
          "MessageTS": 1445477227290591,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T01:27:25.373Z",
          "MessageTS": 1445477245373904,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T01:27:43.365Z",
          "MessageTS": 1445477263365329,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T01:28:01.158Z",
          "MessageTS": 1445477281158421,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T01:28:19.051Z",
          "MessageTS": 1445477299051940,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T01:28:37.144Z",
          "MessageTS": 1445477317144434,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T01:28:55.231Z",
          "MessageTS": 1445477335231492,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T01:29:13.215Z",
          "MessageTS": 1445477353215490,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T01:29:31.306Z",
          "MessageTS": 1445477371306004,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T01:29:49.094Z",
          "MessageTS": 1445477389094894,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T01:30:07.376Z",
          "MessageTS": 1445477407376894,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T01:30:25.356Z",
          "MessageTS": 1445477425356958,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T01:30:43.251Z",
          "MessageTS": 1445477443251197,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T01:31:01.241Z",
          "MessageTS": 1445477461241308,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T01:31:19.222Z",
          "MessageTS": 1445477479222409,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T01:31:37.207Z",
          "MessageTS": 1445477497207640,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T01:31:55.194Z",
          "MessageTS": 1445477515194183,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T01:32:13.278Z",
          "MessageTS": 1445477533278242,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T01:32:30.963Z",
          "MessageTS": 1445477550963339,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T01:32:49.058Z",
          "MessageTS": 1445477569058881,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T01:33:07.246Z",
          "MessageTS": 1445477587246282,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T01:33:25.430Z",
          "MessageTS": 1445477605430531,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T01:33:43.320Z",
          "MessageTS": 1445477623320610,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T01:34:01.306Z",
          "MessageTS": 1445477641306540,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T01:34:19.303Z",
          "MessageTS": 1445477659303407,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T01:34:37.390Z",
          "MessageTS": 1445477677390502,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T01:34:55.481Z",
          "MessageTS": 1445477695481771,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T01:35:13.366Z",
          "MessageTS": 1445477713366196,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T01:35:31.357Z",
          "MessageTS": 1445477731357178,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T01:35:49.243Z",
          "MessageTS": 1445477749243965,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T01:36:07.118Z",
          "MessageTS": 1445477767118963,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T01:36:24.999Z",
          "MessageTS": 1445477784999220,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T01:36:42.979Z",
          "MessageTS": 1445477802979998,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T01:37:00.857Z",
          "MessageTS": 1445477820857818,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T01:37:18.939Z",
          "MessageTS": 1445477838939672,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T01:37:36.925Z",
          "MessageTS": 1445477856925125,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T01:37:54.914Z",
          "MessageTS": 1445477874914848,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T01:38:12.903Z",
          "MessageTS": 1445477892903470,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T01:38:30.886Z",
          "MessageTS": 1445477910886361,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T01:38:48.867Z",
          "MessageTS": 1445477928867555,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T01:39:06.948Z",
          "MessageTS": 1445477946948076,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T01:39:24.931Z",
          "MessageTS": 1445477964931849,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T01:39:43.020Z",
          "MessageTS": 1445477983020861,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T01:40:01.105Z",
          "MessageTS": 1445478001105428,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T01:40:18.694Z",
          "MessageTS": 1445478018694782,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T01:40:36.779Z",
          "MessageTS": 1445478036779550,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T01:40:54.661Z",
          "MessageTS": 1445478054661182,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T01:41:12.948Z",
          "MessageTS": 1445478072948553,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T01:41:30.933Z",
          "MessageTS": 1445478090933606,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T01:41:48.812Z",
          "MessageTS": 1445478108812628,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T01:42:06.696Z",
          "MessageTS": 1445478126696655,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T01:42:24.771Z",
          "MessageTS": 1445478144771431,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T01:42:42.755Z",
          "MessageTS": 1445478162755048,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T01:43:00.938Z",
          "MessageTS": 1445478180938372,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T01:43:18.725Z",
          "MessageTS": 1445478198725717,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T01:43:36.712Z",
          "MessageTS": 1445478216712400,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T01:43:54.801Z",
          "MessageTS": 1445478234801325,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T01:44:12.782Z",
          "MessageTS": 1445478252782024,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T01:44:30.660Z",
          "MessageTS": 1445478270660375,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T01:44:48.839Z",
          "MessageTS": 1445478288839606,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T01:45:06.922Z",
          "MessageTS": 1445478306922551,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T01:45:24.802Z",
          "MessageTS": 1445478324802261,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T01:45:42.983Z",
          "MessageTS": 1445478342983447,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T01:46:01.168Z",
          "MessageTS": 1445478361168510,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T01:46:19.047Z",
          "MessageTS": 1445478379047125,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T01:46:37.031Z",
          "MessageTS": 1445478397031094,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T01:46:54.908Z",
          "MessageTS": 1445478414908037,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T01:47:12.895Z",
          "MessageTS": 1445478432895004,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T01:47:30.880Z",
          "MessageTS": 1445478450880017,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T01:47:48.963Z",
          "MessageTS": 1445478468963487,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T01:48:06.942Z",
          "MessageTS": 1445478486942981,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T01:48:24.923Z",
          "MessageTS": 1445478504923346,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T01:48:43.100Z",
          "MessageTS": 1445478523100864,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T01:49:00.777Z",
          "MessageTS": 1445478540777540,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T01:49:18.655Z",
          "MessageTS": 1445478558655050,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T01:49:36.737Z",
          "MessageTS": 1445478576737335,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T01:49:54.915Z",
          "MessageTS": 1445478594915425,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T01:50:12.787Z",
          "MessageTS": 1445478612787998,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T01:50:30.769Z",
          "MessageTS": 1445478630769366,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T01:50:48.850Z",
          "MessageTS": 1445478648850578,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T01:51:06.830Z",
          "MessageTS": 1445478666830929,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T01:51:24.806Z",
          "MessageTS": 1445478684806476,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T01:51:42.793Z",
          "MessageTS": 1445478702793701,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T01:52:00.779Z",
          "MessageTS": 1445478720779713,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T01:52:18.964Z",
          "MessageTS": 1445478738964380,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T01:52:36.945Z",
          "MessageTS": 1445478756945861,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T01:52:54.935Z",
          "MessageTS": 1445478774935605,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T01:53:12.818Z",
          "MessageTS": 1445478792818238,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T01:53:30.800Z",
          "MessageTS": 1445478810800161,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T01:53:48.887Z",
          "MessageTS": 1445478828887051,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T01:54:06.784Z",
          "MessageTS": 1445478846784748,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T01:54:24.773Z",
          "MessageTS": 1445478864773921,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T01:54:42.762Z",
          "MessageTS": 1445478882762666,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T01:55:00.744Z",
          "MessageTS": 1445478900744894,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T01:55:18.838Z",
          "MessageTS": 1445478918838993,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T01:55:36.516Z",
          "MessageTS": 1445478936516214,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T01:55:54.706Z",
          "MessageTS": 1445478954706157,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T01:56:12.593Z",
          "MessageTS": 1445478972593236,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T01:56:30.673Z",
          "MessageTS": 1445478990673980,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T01:56:48.756Z",
          "MessageTS": 1445479008756880,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T01:57:06.638Z",
          "MessageTS": 1445479026638897,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T01:57:24.624Z",
          "MessageTS": 1445479044624179,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T01:57:42.701Z",
          "MessageTS": 1445479062701032,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T01:58:00.686Z",
          "MessageTS": 1445479080686726,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T01:58:18.773Z",
          "MessageTS": 1445479098773827,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T01:58:36.661Z",
          "MessageTS": 1445479116661166,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T01:58:54.743Z",
          "MessageTS": 1445479134743252,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T01:59:12.639Z",
          "MessageTS": 1445479152639549,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T01:59:30.528Z",
          "MessageTS": 1445479170528326,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T01:59:48.510Z",
          "MessageTS": 1445479188510711,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T02:00:06.888Z",
          "MessageTS": 1445479206888143,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T02:00:24.967Z",
          "MessageTS": 1445479224967776,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T02:00:42.847Z",
          "MessageTS": 1445479242847543,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T02:01:00.934Z",
          "MessageTS": 1445479260934031,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T02:01:18.920Z",
          "MessageTS": 1445479278920551,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T02:01:37.007Z",
          "MessageTS": 1445479297007404,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T02:01:54.992Z",
          "MessageTS": 1445479314992960,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T02:02:12.785Z",
          "MessageTS": 1445479332785725,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T02:02:30.774Z",
          "MessageTS": 1445479350774978,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T02:02:48.755Z",
          "MessageTS": 1445479368755305,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T02:03:06.738Z",
          "MessageTS": 1445479386738103,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T02:03:25.827Z",
          "MessageTS": 1445479405827983,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T02:03:43.714Z",
          "MessageTS": 1445479423714099,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T02:04:02.100Z",
          "MessageTS": 1445479442100798,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T02:04:20.078Z",
          "MessageTS": 1445479460078098,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T02:04:38.061Z",
          "MessageTS": 1445479478061323,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T02:04:56.350Z",
          "MessageTS": 1445479496350894,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T02:05:14.338Z",
          "MessageTS": 1445479514338758,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T02:05:32.326Z",
          "MessageTS": 1445479532326011,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T02:05:50.310Z",
          "MessageTS": 1445479550310659,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T02:06:08.189Z",
          "MessageTS": 1445479568189121,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T02:06:26.270Z",
          "MessageTS": 1445479586270711,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T02:06:44.250Z",
          "MessageTS": 1445479604250365,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T02:07:02.232Z",
          "MessageTS": 1445479622232544,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T02:07:20.113Z",
          "MessageTS": 1445479640113719,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T02:07:37.889Z",
          "MessageTS": 1445479657889386,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T02:07:55.867Z",
          "MessageTS": 1445479675867182,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T02:08:13.948Z",
          "MessageTS": 1445479693948328,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T02:08:32.031Z",
          "MessageTS": 1445479712031145,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T02:08:50.317Z",
          "MessageTS": 1445479730317336,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T02:09:08.198Z",
          "MessageTS": 1445479748198660,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T02:09:26.278Z",
          "MessageTS": 1445479766278913,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T02:09:44.161Z",
          "MessageTS": 1445479784161432,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T02:10:02.142Z",
          "MessageTS": 1445479802142516,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T02:10:20.127Z",
          "MessageTS": 1445479820127977,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T02:10:38.315Z",
          "MessageTS": 1445479838315013,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T02:10:56.105Z",
          "MessageTS": 1445479856105330,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T02:11:14.200Z",
          "MessageTS": 1445479874200450,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T02:11:32.391Z",
          "MessageTS": 1445479892391218,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T02:11:50.379Z",
          "MessageTS": 1445479910379158,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T02:12:08.357Z",
          "MessageTS": 1445479928357612,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T02:12:26.437Z",
          "MessageTS": 1445479946437255,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T02:12:44.418Z",
          "MessageTS": 1445479964418597,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T02:13:02.398Z",
          "MessageTS": 1445479982398850,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T02:13:20.473Z",
          "MessageTS": 1445480000473507,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T02:13:38.555Z",
          "MessageTS": 1445480018555984,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T02:13:56.738Z",
          "MessageTS": 1445480036738994,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T02:14:14.423Z",
          "MessageTS": 1445480054423316,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T02:14:32.612Z",
          "MessageTS": 1445480072612474,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T02:14:50.497Z",
          "MessageTS": 1445480090497931,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T02:15:08.585Z",
          "MessageTS": 1445480108585053,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T02:15:26.572Z",
          "MessageTS": 1445480126572986,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T02:15:44.656Z",
          "MessageTS": 1445480144656399,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T02:16:02.738Z",
          "MessageTS": 1445480162738828,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T02:16:20.715Z",
          "MessageTS": 1445480180715255,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T02:16:38.698Z",
          "MessageTS": 1445480198698061,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T02:16:56.778Z",
          "MessageTS": 1445480216778454,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T02:17:14.655Z",
          "MessageTS": 1445480234655684,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T02:17:32.632Z",
          "MessageTS": 1445480252632261,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T02:17:50.805Z",
          "MessageTS": 1445480270805871,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T02:18:08.883Z",
          "MessageTS": 1445480288883226,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T02:18:26.970Z",
          "MessageTS": 1445480306970292,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T02:18:45.057Z",
          "MessageTS": 1445480325057757,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T02:19:03.040Z",
          "MessageTS": 1445480343040090,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T02:19:21.420Z",
          "MessageTS": 1445480361420695,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T02:19:39.400Z",
          "MessageTS": 1445480379400131,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T02:19:57.378Z",
          "MessageTS": 1445480397378690,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T02:20:15.361Z",
          "MessageTS": 1445480415361098,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T02:20:33.040Z",
          "MessageTS": 1445480433040091,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T02:20:50.918Z",
          "MessageTS": 1445480450918238,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T02:21:09.197Z",
          "MessageTS": 1445480469197644,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T02:21:27.176Z",
          "MessageTS": 1445480487176460,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2015-10-22T02:21:45.065Z",
          "MessageTS": 1445480505065909,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        }
      ]
    };

    return {
        diskMockData: diskMockData,
        flowSeriesForFrontendDiskMockData: flowSeriesForFrontendDiskMockData,
    };
});
