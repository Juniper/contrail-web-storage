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
        "start_time": "2016-01-25T19:49:46.000Z",
        "end_time": "2016-01-25T20:49:46.000Z",
        "timeGran_microsecs": 60000000,
        "name": "ubuntu14-compute1:osd.0",
        "uuid": "b537ba07-203f-40f6-948a-6ccbda2c5420",
        "osd_name": "osd.0"
      },
      "flow-series": [
        {
          "date": "2016-01-25T19:49:47.859Z",
          "MessageTS": 1453751387859282,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T19:49:59.826Z",
          "MessageTS": 1453751399826367,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T19:50:11.794Z",
          "MessageTS": 1453751411794652,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T19:50:23.751Z",
          "MessageTS": 1453751423751383,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T19:50:35.727Z",
          "MessageTS": 1453751435727896,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T19:50:47.712Z",
          "MessageTS": 1453751447712540,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T19:50:59.683Z",
          "MessageTS": 1453751459683452,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T19:51:11.659Z",
          "MessageTS": 1453751471659125,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T19:51:23.629Z",
          "MessageTS": 1453751483629725,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T19:51:35.592Z",
          "MessageTS": 1453751495592930,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T19:51:47.578Z",
          "MessageTS": 1453751507578143,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T19:51:59.551Z",
          "MessageTS": 1453751519551452,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T19:52:11.513Z",
          "MessageTS": 1453751531513490,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T19:52:23.479Z",
          "MessageTS": 1453751543479718,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T19:52:35.448Z",
          "MessageTS": 1453751555448179,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T19:52:47.415Z",
          "MessageTS": 1453751567415917,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T19:52:59.507Z",
          "MessageTS": 1453751579507598,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T19:53:11.492Z",
          "MessageTS": 1453751591492845,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T19:53:23.469Z",
          "MessageTS": 1453751603469223,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T19:53:35.446Z",
          "MessageTS": 1453751615446250,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T19:53:47.425Z",
          "MessageTS": 1453751627425571,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T19:53:59.401Z",
          "MessageTS": 1453751639401416,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T19:54:11.363Z",
          "MessageTS": 1453751651363434,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T19:54:23.347Z",
          "MessageTS": 1453751663347088,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T19:54:35.344Z",
          "MessageTS": 1453751675344020,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T19:54:47.311Z",
          "MessageTS": 1453751687311966,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T19:54:59.285Z",
          "MessageTS": 1453751699285307,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T19:55:11.260Z",
          "MessageTS": 1453751711260641,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T19:55:23.247Z",
          "MessageTS": 1453751723247360,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T19:55:35.206Z",
          "MessageTS": 1453751735206893,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T19:55:47.182Z",
          "MessageTS": 1453751747182584,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T19:55:59.147Z",
          "MessageTS": 1453751759147724,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T19:56:11.118Z",
          "MessageTS": 1453751771118371,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T19:56:23.103Z",
          "MessageTS": 1453751783103655,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T19:56:35.075Z",
          "MessageTS": 1453751795075660,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T19:56:47.061Z",
          "MessageTS": 1453751807061536,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T19:56:59.046Z",
          "MessageTS": 1453751819046296,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T19:57:11.023Z",
          "MessageTS": 1453751831023344,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T19:57:23.003Z",
          "MessageTS": 1453751843003560,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T19:57:34.975Z",
          "MessageTS": 1453751854975936,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T19:57:46.950Z",
          "MessageTS": 1453751866950965,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T19:57:58.906Z",
          "MessageTS": 1453751878906367,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T19:58:10.880Z",
          "MessageTS": 1453751890880120,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T19:58:22.858Z",
          "MessageTS": 1453751902858834,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T19:58:34.834Z",
          "MessageTS": 1453751914834563,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T19:58:46.811Z",
          "MessageTS": 1453751926811666,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T19:58:58.783Z",
          "MessageTS": 1453751938783094,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T19:59:10.748Z",
          "MessageTS": 1453751950748822,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T19:59:22.711Z",
          "MessageTS": 1453751962711453,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T19:59:34.682Z",
          "MessageTS": 1453751974682413,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T19:59:46.662Z",
          "MessageTS": 1453751986662305,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T19:59:58.624Z",
          "MessageTS": 1453751998624393,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:00:10.583Z",
          "MessageTS": 1453752010583998,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:00:22.563Z",
          "MessageTS": 1453752022563379,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:00:34.543Z",
          "MessageTS": 1453752034543215,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:00:46.511Z",
          "MessageTS": 1453752046511357,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:00:58.480Z",
          "MessageTS": 1453752058480621,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:01:10.441Z",
          "MessageTS": 1453752070441721,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:01:22.413Z",
          "MessageTS": 1453752082413500,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:01:34.388Z",
          "MessageTS": 1453752094388275,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:01:46.352Z",
          "MessageTS": 1453752106352849,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:01:58.336Z",
          "MessageTS": 1453752118336210,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:02:10.311Z",
          "MessageTS": 1453752130311686,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:02:22.305Z",
          "MessageTS": 1453752142305158,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:02:34.286Z",
          "MessageTS": 1453752154286834,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:02:46.272Z",
          "MessageTS": 1453752166272636,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:02:58.237Z",
          "MessageTS": 1453752178237431,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:03:10.201Z",
          "MessageTS": 1453752190201292,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:03:22.177Z",
          "MessageTS": 1453752202177986,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:03:34.253Z",
          "MessageTS": 1453752214253144,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:03:46.232Z",
          "MessageTS": 1453752226232510,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:03:58.213Z",
          "MessageTS": 1453752238213227,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:04:10.191Z",
          "MessageTS": 1453752250191134,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:04:22.188Z",
          "MessageTS": 1453752262188270,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:04:34.163Z",
          "MessageTS": 1453752274163358,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:04:46.147Z",
          "MessageTS": 1453752286147350,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:04:58.137Z",
          "MessageTS": 1453752298137759,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:05:10.127Z",
          "MessageTS": 1453752310127329,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:05:22.103Z",
          "MessageTS": 1453752322103578,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:05:34.188Z",
          "MessageTS": 1453752334188985,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:05:46.165Z",
          "MessageTS": 1453752346165134,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:05:58.141Z",
          "MessageTS": 1453752358141953,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:06:10.127Z",
          "MessageTS": 1453752370127165,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:06:22.114Z",
          "MessageTS": 1453752382114881,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:06:34.193Z",
          "MessageTS": 1453752394193595,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:06:46.171Z",
          "MessageTS": 1453752406171691,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:06:58.149Z",
          "MessageTS": 1453752418149876,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:07:10.123Z",
          "MessageTS": 1453752430123261,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:07:22.088Z",
          "MessageTS": 1453752442088145,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:07:34.051Z",
          "MessageTS": 1453752454051347,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:07:46.008Z",
          "MessageTS": 1453752466008006,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:07:57.969Z",
          "MessageTS": 1453752477969802,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:08:09.924Z",
          "MessageTS": 1453752489924776,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:08:21.883Z",
          "MessageTS": 1453752501883752,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:08:33.861Z",
          "MessageTS": 1453752513861187,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:08:45.843Z",
          "MessageTS": 1453752525843176,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:08:57.822Z",
          "MessageTS": 1453752537822000,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:09:09.805Z",
          "MessageTS": 1453752549805873,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:09:21.808Z",
          "MessageTS": 1453752561808942,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:09:33.781Z",
          "MessageTS": 1453752573781990,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:09:45.740Z",
          "MessageTS": 1453752585740041,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:09:57.702Z",
          "MessageTS": 1453752597702928,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:10:09.670Z",
          "MessageTS": 1453752609670220,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:10:21.649Z",
          "MessageTS": 1453752621649249,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:10:33.620Z",
          "MessageTS": 1453752633620642,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:10:45.590Z",
          "MessageTS": 1453752645590596,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:10:57.558Z",
          "MessageTS": 1453752657558192,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:11:09.540Z",
          "MessageTS": 1453752669540320,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:11:21.526Z",
          "MessageTS": 1453752681526802,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:11:33.508Z",
          "MessageTS": 1453752693508274,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:11:45.489Z",
          "MessageTS": 1453752705489566,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:11:57.470Z",
          "MessageTS": 1453752717470162,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:12:09.443Z",
          "MessageTS": 1453752729443592,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:12:21.427Z",
          "MessageTS": 1453752741427449,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:12:33.406Z",
          "MessageTS": 1453752753406280,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:12:45.386Z",
          "MessageTS": 1453752765386126,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:12:57.379Z",
          "MessageTS": 1453752777379781,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:13:09.470Z",
          "MessageTS": 1453752789470307,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:13:21.438Z",
          "MessageTS": 1453752801438349,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:13:33.398Z",
          "MessageTS": 1453752813398200,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:13:45.359Z",
          "MessageTS": 1453752825359352,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:13:57.320Z",
          "MessageTS": 1453752837320452,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:14:09.298Z",
          "MessageTS": 1453752849298770,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:14:21.283Z",
          "MessageTS": 1453752861283716,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:14:33.262Z",
          "MessageTS": 1453752873262146,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:14:45.246Z",
          "MessageTS": 1453752885246161,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:14:57.201Z",
          "MessageTS": 1453752897201512,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:15:09.255Z",
          "MessageTS": 1453752909255371,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:15:21.227Z",
          "MessageTS": 1453752921227295,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:15:33.194Z",
          "MessageTS": 1453752933194954,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:15:45.156Z",
          "MessageTS": 1453752945156538,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:15:57.122Z",
          "MessageTS": 1453752957122434,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:16:09.090Z",
          "MessageTS": 1453752969090679,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:16:21.045Z",
          "MessageTS": 1453752981045781,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:16:33.010Z",
          "MessageTS": 1453752993010117,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:16:45.099Z",
          "MessageTS": 1453753005099767,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:16:57.059Z",
          "MessageTS": 1453753017059705,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:17:09.116Z",
          "MessageTS": 1453753029116707,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:17:21.079Z",
          "MessageTS": 1453753041079611,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:17:33.051Z",
          "MessageTS": 1453753053051368,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:17:45.040Z",
          "MessageTS": 1453753065040053,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:17:57.007Z",
          "MessageTS": 1453753077007406,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:18:09.017Z",
          "MessageTS": 1453753089017133,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:18:20.989Z",
          "MessageTS": 1453753100989032,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:18:32.966Z",
          "MessageTS": 1453753112966443,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:18:44.941Z",
          "MessageTS": 1453753124941188,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:18:56.921Z",
          "MessageTS": 1453753136921527,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:19:09.005Z",
          "MessageTS": 1453753149005676,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:19:20.985Z",
          "MessageTS": 1453753160985767,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:19:32.970Z",
          "MessageTS": 1453753172970278,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:19:44.951Z",
          "MessageTS": 1453753184951593,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:19:56.935Z",
          "MessageTS": 1453753196935644,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:20:08.922Z",
          "MessageTS": 1453753208922136,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:20:20.890Z",
          "MessageTS": 1453753220890247,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:20:32.879Z",
          "MessageTS": 1453753232879649,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:20:44.867Z",
          "MessageTS": 1453753244867777,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:20:56.850Z",
          "MessageTS": 1453753256850471,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:21:08.926Z",
          "MessageTS": 1453753268926452,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:21:20.893Z",
          "MessageTS": 1453753280893676,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:21:32.848Z",
          "MessageTS": 1453753292848562,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:21:44.808Z",
          "MessageTS": 1453753304808742,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:21:56.781Z",
          "MessageTS": 1453753316781385,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:22:08.774Z",
          "MessageTS": 1453753328774343,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:22:20.761Z",
          "MessageTS": 1453753340761338,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:22:32.746Z",
          "MessageTS": 1453753352746360,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:22:44.714Z",
          "MessageTS": 1453753364714457,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:22:56.687Z",
          "MessageTS": 1453753376687259,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:23:08.677Z",
          "MessageTS": 1453753388677736,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:23:20.655Z",
          "MessageTS": 1453753400655685,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:23:32.646Z",
          "MessageTS": 1453753412646164,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:23:44.615Z",
          "MessageTS": 1453753424615616,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:23:56.574Z",
          "MessageTS": 1453753436574865,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:24:08.551Z",
          "MessageTS": 1453753448551864,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:24:20.516Z",
          "MessageTS": 1453753460516621,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:24:32.476Z",
          "MessageTS": 1453753472476478,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:24:44.444Z",
          "MessageTS": 1453753484444890,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:24:56.527Z",
          "MessageTS": 1453753496527341,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:25:08.496Z",
          "MessageTS": 1453753508496735,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:25:20.465Z",
          "MessageTS": 1453753520465523,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:25:32.453Z",
          "MessageTS": 1453753532453307,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:25:44.442Z",
          "MessageTS": 1453753544442407,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:25:56.433Z",
          "MessageTS": 1453753556433771,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:26:08.420Z",
          "MessageTS": 1453753568420826,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:26:20.390Z",
          "MessageTS": 1453753580390949,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:26:32.365Z",
          "MessageTS": 1453753592365502,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:26:44.363Z",
          "MessageTS": 1453753604363045,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:26:56.348Z",
          "MessageTS": 1453753616348148,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:27:08.424Z",
          "MessageTS": 1453753628424876,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:27:20.399Z",
          "MessageTS": 1453753640399462,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:27:32.363Z",
          "MessageTS": 1453753652363594,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:27:44.346Z",
          "MessageTS": 1453753664346514,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:27:56.329Z",
          "MessageTS": 1453753676329229,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:28:08.302Z",
          "MessageTS": 1453753688302087,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:28:20.283Z",
          "MessageTS": 1453753700283052,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:28:32.263Z",
          "MessageTS": 1453753712263211,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:28:44.252Z",
          "MessageTS": 1453753724252032,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:28:56.212Z",
          "MessageTS": 1453753736212881,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:29:08.190Z",
          "MessageTS": 1453753748190598,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:29:20.197Z",
          "MessageTS": 1453753760197306,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:29:32.175Z",
          "MessageTS": 1453753772175792,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:29:44.159Z",
          "MessageTS": 1453753784159015,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:29:56.129Z",
          "MessageTS": 1453753796129118,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:30:08.095Z",
          "MessageTS": 1453753808095010,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:30:20.072Z",
          "MessageTS": 1453753820072944,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:30:32.039Z",
          "MessageTS": 1453753832039507,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:30:44.022Z",
          "MessageTS": 1453753844022475,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:30:56.012Z",
          "MessageTS": 1453753856012306,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:31:07.988Z",
          "MessageTS": 1453753867988621,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:31:19.967Z",
          "MessageTS": 1453753879967911,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:31:31.949Z",
          "MessageTS": 1453753891949625,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:31:43.932Z",
          "MessageTS": 1453753903932140,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:31:55.909Z",
          "MessageTS": 1453753915909692,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:32:07.893Z",
          "MessageTS": 1453753927893906,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:32:19.884Z",
          "MessageTS": 1453753939884839,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:32:31.860Z",
          "MessageTS": 1453753951860475,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:32:43.822Z",
          "MessageTS": 1453753963822219,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:32:55.785Z",
          "MessageTS": 1453753975785664,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:33:07.751Z",
          "MessageTS": 1453753987751538,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:33:19.734Z",
          "MessageTS": 1453753999734993,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:33:31.742Z",
          "MessageTS": 1453754011742558,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:33:43.716Z",
          "MessageTS": 1453754023716695,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:33:55.690Z",
          "MessageTS": 1453754035690528,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:34:07.690Z",
          "MessageTS": 1453754047690568,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:34:19.675Z",
          "MessageTS": 1453754059675375,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:34:31.655Z",
          "MessageTS": 1453754071655583,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:34:43.621Z",
          "MessageTS": 1453754083621861,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:34:55.588Z",
          "MessageTS": 1453754095588516,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:35:07.571Z",
          "MessageTS": 1453754107571792,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:35:19.529Z",
          "MessageTS": 1453754119529255,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:35:31.484Z",
          "MessageTS": 1453754131484755,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:35:43.473Z",
          "MessageTS": 1453754143473564,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:35:55.430Z",
          "MessageTS": 1453754155430831,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
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
        "start_time": "2016-01-25T19:49:46.000Z",
        "end_time": "2016-01-25T20:49:46.000Z",
        "timeGran_microsecs": 60000000,
        "name": "ubuntu14-compute1:vdb",
        "uuid": "234d0cf7-ca32-4afe-817d-0c4383b66d03",
        "osd_name": "osd.0"
      },
      "flow-series": [
        {
          "date": "2016-01-25T19:49:52.928Z",
          "MessageTS": 1453751392928433,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T19:50:04.893Z",
          "MessageTS": 1453751404893626,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T19:50:16.855Z",
          "MessageTS": 1453751416855884,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T19:50:28.819Z",
          "MessageTS": 1453751428819005,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T19:50:40.804Z",
          "MessageTS": 1453751440804691,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T19:50:52.781Z",
          "MessageTS": 1453751452781513,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T19:51:04.752Z",
          "MessageTS": 1453751464752786,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T19:51:16.726Z",
          "MessageTS": 1453751476726456,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T19:51:28.692Z",
          "MessageTS": 1453751488692960,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T19:51:40.665Z",
          "MessageTS": 1453751500665198,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T19:51:52.652Z",
          "MessageTS": 1453751512652086,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T19:52:04.614Z",
          "MessageTS": 1453751524614986,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T19:52:16.578Z",
          "MessageTS": 1453751536578954,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T19:52:28.547Z",
          "MessageTS": 1453751548547093,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T19:52:40.515Z",
          "MessageTS": 1453751560515491,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T19:52:52.597Z",
          "MessageTS": 1453751572597357,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T19:53:04.578Z",
          "MessageTS": 1453751584578759,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T19:53:16.566Z",
          "MessageTS": 1453751596566190,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T19:53:28.542Z",
          "MessageTS": 1453751608542720,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T19:53:40.519Z",
          "MessageTS": 1453751620519915,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T19:53:52.499Z",
          "MessageTS": 1453751632499314,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T19:54:04.465Z",
          "MessageTS": 1453751644465297,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T19:54:16.438Z",
          "MessageTS": 1453751656438548,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T19:54:28.436Z",
          "MessageTS": 1453751668436463,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T19:54:40.409Z",
          "MessageTS": 1453751680409043,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T19:54:52.381Z",
          "MessageTS": 1453751692381424,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T19:55:04.352Z",
          "MessageTS": 1453751704352392,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T19:55:16.330Z",
          "MessageTS": 1453751716330656,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T19:55:28.311Z",
          "MessageTS": 1453751728311240,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T19:55:40.269Z",
          "MessageTS": 1453751740269382,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T19:55:52.245Z",
          "MessageTS": 1453751752245428,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T19:56:04.217Z",
          "MessageTS": 1453751764217951,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T19:56:16.201Z",
          "MessageTS": 1453751776201587,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T19:56:28.170Z",
          "MessageTS": 1453751788170771,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T19:56:40.151Z",
          "MessageTS": 1453751800151864,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T19:56:52.139Z",
          "MessageTS": 1453751812139823,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T19:57:04.116Z",
          "MessageTS": 1453751824116176,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T19:57:16.096Z",
          "MessageTS": 1453751836096625,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T19:57:28.071Z",
          "MessageTS": 1453751848071256,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T19:57:40.046Z",
          "MessageTS": 1453751860046302,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T19:57:52.012Z",
          "MessageTS": 1453751872012730,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T19:58:03.970Z",
          "MessageTS": 1453751883970589,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T19:58:15.951Z",
          "MessageTS": 1453751895951732,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T19:58:27.930Z",
          "MessageTS": 1453751907930849,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T19:58:39.905Z",
          "MessageTS": 1453751919905088,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T19:58:51.882Z",
          "MessageTS": 1453751931882359,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T19:59:03.849Z",
          "MessageTS": 1453751943849299,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T19:59:15.812Z",
          "MessageTS": 1453751955812883,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T19:59:27.779Z",
          "MessageTS": 1453751967779831,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T19:59:39.758Z",
          "MessageTS": 1453751979758292,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T19:59:51.730Z",
          "MessageTS": 1453751991730919,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:00:03.689Z",
          "MessageTS": 1453752003689248,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:00:15.652Z",
          "MessageTS": 1453752015652192,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:00:27.633Z",
          "MessageTS": 1453752027633546,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:00:39.613Z",
          "MessageTS": 1453752039613179,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:00:51.583Z",
          "MessageTS": 1453752051583686,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:01:03.544Z",
          "MessageTS": 1453752063544020,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:01:15.511Z",
          "MessageTS": 1453752075511615,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:01:27.481Z",
          "MessageTS": 1453752087481222,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:01:39.457Z",
          "MessageTS": 1453752099457441,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:01:51.424Z",
          "MessageTS": 1453752111424316,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:02:03.406Z",
          "MessageTS": 1453752123406475,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:02:15.394Z",
          "MessageTS": 1453752135394095,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:02:27.379Z",
          "MessageTS": 1453752147379613,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:02:39.363Z",
          "MessageTS": 1453752159363832,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:02:51.340Z",
          "MessageTS": 1453752171340989,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:03:03.300Z",
          "MessageTS": 1453752183300946,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:03:15.272Z",
          "MessageTS": 1453752195272995,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:03:27.349Z",
          "MessageTS": 1453752207349891,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:03:39.321Z",
          "MessageTS": 1453752219321168,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:03:51.309Z",
          "MessageTS": 1453752231309410,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:04:03.284Z",
          "MessageTS": 1453752243284822,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:04:15.273Z",
          "MessageTS": 1453752255273231,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:04:27.255Z",
          "MessageTS": 1453752267255672,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:04:39.237Z",
          "MessageTS": 1453752279237181,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:04:51.225Z",
          "MessageTS": 1453752291225998,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:05:03.220Z",
          "MessageTS": 1453752303220948,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:05:15.202Z",
          "MessageTS": 1453752315202761,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:05:27.281Z",
          "MessageTS": 1453752327281318,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:05:39.263Z",
          "MessageTS": 1453752339263855,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:05:51.240Z",
          "MessageTS": 1453752351240593,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:06:03.217Z",
          "MessageTS": 1453752363217908,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:06:15.204Z",
          "MessageTS": 1453752375204929,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:06:27.285Z",
          "MessageTS": 1453752387285789,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:06:39.263Z",
          "MessageTS": 1453752399263801,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:06:51.244Z",
          "MessageTS": 1453752411244877,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:07:03.222Z",
          "MessageTS": 1453752423222277,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:07:15.187Z",
          "MessageTS": 1453752435187075,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:07:27.154Z",
          "MessageTS": 1453752447154698,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:07:39.114Z",
          "MessageTS": 1453752459114973,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:07:51.073Z",
          "MessageTS": 1453752471073310,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:08:03.030Z",
          "MessageTS": 1453752483030469,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:08:14.987Z",
          "MessageTS": 1453752494987165,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:08:26.959Z",
          "MessageTS": 1453752506959605,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:08:38.932Z",
          "MessageTS": 1453752518932118,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:08:50.916Z",
          "MessageTS": 1453752530916127,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:09:02.885Z",
          "MessageTS": 1453752542885935,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:09:14.889Z",
          "MessageTS": 1453752554889133,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:09:26.878Z",
          "MessageTS": 1453752566878722,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:09:38.843Z",
          "MessageTS": 1453752578843513,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:09:50.805Z",
          "MessageTS": 1453752590805717,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:10:02.769Z",
          "MessageTS": 1453752602769368,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:10:14.743Z",
          "MessageTS": 1453752614743184,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:10:26.719Z",
          "MessageTS": 1453752626719199,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:10:38.688Z",
          "MessageTS": 1453752638688666,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:10:50.653Z",
          "MessageTS": 1453752650653511,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:11:02.632Z",
          "MessageTS": 1453752662632228,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:11:14.611Z",
          "MessageTS": 1453752674611456,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:11:26.598Z",
          "MessageTS": 1453752686598364,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:11:38.578Z",
          "MessageTS": 1453752698578694,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:11:50.566Z",
          "MessageTS": 1453752710566764,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:12:02.539Z",
          "MessageTS": 1453752722539626,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:12:14.513Z",
          "MessageTS": 1453752734513518,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:12:26.499Z",
          "MessageTS": 1453752746499054,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:12:38.473Z",
          "MessageTS": 1453752758473681,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:12:50.470Z",
          "MessageTS": 1453752770470150,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:13:02.560Z",
          "MessageTS": 1453752782560283,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:13:14.538Z",
          "MessageTS": 1453752794538832,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:13:26.501Z",
          "MessageTS": 1453752806501754,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:13:38.462Z",
          "MessageTS": 1453752818462190,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:13:50.418Z",
          "MessageTS": 1453752830418615,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:14:02.391Z",
          "MessageTS": 1453752842391292,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:14:14.372Z",
          "MessageTS": 1453752854372486,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:14:26.352Z",
          "MessageTS": 1453752866352607,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:14:38.344Z",
          "MessageTS": 1453752878344789,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:14:50.305Z",
          "MessageTS": 1453752890305890,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:15:02.361Z",
          "MessageTS": 1453752902361086,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:15:14.325Z",
          "MessageTS": 1453752914325563,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:15:26.291Z",
          "MessageTS": 1453752926291946,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:15:38.259Z",
          "MessageTS": 1453752938259946,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:15:50.218Z",
          "MessageTS": 1453752950218916,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:16:02.196Z",
          "MessageTS": 1453752962196542,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:16:14.153Z",
          "MessageTS": 1453752974153497,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:16:26.108Z",
          "MessageTS": 1453752986108301,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:16:38.189Z",
          "MessageTS": 1453752998189699,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:16:50.165Z",
          "MessageTS": 1453753010165132,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:17:02.224Z",
          "MessageTS": 1453753022224757,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:17:14.184Z",
          "MessageTS": 1453753034184141,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:17:26.154Z",
          "MessageTS": 1453753046154140,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:17:38.133Z",
          "MessageTS": 1453753058133341,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:17:50.106Z",
          "MessageTS": 1453753070106914,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:18:02.095Z",
          "MessageTS": 1453753082095428,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:18:14.088Z",
          "MessageTS": 1453753094088776,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:18:26.061Z",
          "MessageTS": 1453753106061743,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:18:38.035Z",
          "MessageTS": 1453753118035729,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:18:50.015Z",
          "MessageTS": 1453753130015925,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:19:02.095Z",
          "MessageTS": 1453753142095545,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:19:14.077Z",
          "MessageTS": 1453753154077915,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:19:26.065Z",
          "MessageTS": 1453753166065317,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:19:38.045Z",
          "MessageTS": 1453753178045682,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:19:50.028Z",
          "MessageTS": 1453753190028020,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:20:02.018Z",
          "MessageTS": 1453753202018372,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:20:13.986Z",
          "MessageTS": 1453753213986593,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:20:25.971Z",
          "MessageTS": 1453753225971848,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:20:37.961Z",
          "MessageTS": 1453753237961284,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:20:49.938Z",
          "MessageTS": 1453753249938214,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:21:02.020Z",
          "MessageTS": 1453753262020285,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:21:13.994Z",
          "MessageTS": 1453753273994377,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:21:25.954Z",
          "MessageTS": 1453753285954866,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:21:37.913Z",
          "MessageTS": 1453753297913381,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:21:49.874Z",
          "MessageTS": 1453753309874923,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:22:01.858Z",
          "MessageTS": 1453753321858835,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:22:13.851Z",
          "MessageTS": 1453753333851237,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:22:25.842Z",
          "MessageTS": 1453753345842433,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:22:37.818Z",
          "MessageTS": 1453753357818181,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:22:49.781Z",
          "MessageTS": 1453753369781300,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:23:01.761Z",
          "MessageTS": 1453753381761875,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:23:13.752Z",
          "MessageTS": 1453753393752311,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:23:25.740Z",
          "MessageTS": 1453753405740653,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:23:37.714Z",
          "MessageTS": 1453753417714295,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:23:49.675Z",
          "MessageTS": 1453753429675870,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:24:01.646Z",
          "MessageTS": 1453753441646251,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:24:13.621Z",
          "MessageTS": 1453753453621023,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:24:25.579Z",
          "MessageTS": 1453753465579131,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:24:37.544Z",
          "MessageTS": 1453753477544667,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:24:49.617Z",
          "MessageTS": 1453753489617484,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:25:01.599Z",
          "MessageTS": 1453753501599064,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:25:13.562Z",
          "MessageTS": 1453753513562615,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:25:25.537Z",
          "MessageTS": 1453753525537458,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:25:37.523Z",
          "MessageTS": 1453753537523635,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:25:49.524Z",
          "MessageTS": 1453753549524941,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:26:01.504Z",
          "MessageTS": 1453753561504457,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:26:13.491Z",
          "MessageTS": 1453753573491880,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:26:25.460Z",
          "MessageTS": 1453753585460380,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:26:37.450Z",
          "MessageTS": 1453753597450340,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:26:49.434Z",
          "MessageTS": 1453753609434315,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:27:01.519Z",
          "MessageTS": 1453753621519629,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:27:13.493Z",
          "MessageTS": 1453753633493767,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:27:25.463Z",
          "MessageTS": 1453753645463691,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:27:37.431Z",
          "MessageTS": 1453753657431122,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:27:49.420Z",
          "MessageTS": 1453753669420121,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:28:01.396Z",
          "MessageTS": 1453753681396016,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:28:13.378Z",
          "MessageTS": 1453753693378219,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:28:25.351Z",
          "MessageTS": 1453753705351445,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:28:37.341Z",
          "MessageTS": 1453753717341089,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:28:49.317Z",
          "MessageTS": 1453753729317583,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:29:01.281Z",
          "MessageTS": 1453753741281423,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:29:13.260Z",
          "MessageTS": 1453753753260844,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:29:25.267Z",
          "MessageTS": 1453753765267518,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:29:37.246Z",
          "MessageTS": 1453753777246090,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:29:49.229Z",
          "MessageTS": 1453753789229802,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:30:01.195Z",
          "MessageTS": 1453753801195325,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:30:13.169Z",
          "MessageTS": 1453753813169313,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:30:25.137Z",
          "MessageTS": 1453753825137417,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:30:37.106Z",
          "MessageTS": 1453753837106973,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:30:49.103Z",
          "MessageTS": 1453753849103658,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:31:01.083Z",
          "MessageTS": 1453753861083458,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:31:13.059Z",
          "MessageTS": 1453753873059221,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:31:25.036Z",
          "MessageTS": 1453753885036178,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:31:37.020Z",
          "MessageTS": 1453753897020974,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:31:49.001Z",
          "MessageTS": 1453753909001793,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:32:00.984Z",
          "MessageTS": 1453753920984700,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:32:12.983Z",
          "MessageTS": 1453753932983992,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:32:24.953Z",
          "MessageTS": 1453753944953882,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:32:36.924Z",
          "MessageTS": 1453753956924954,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:32:48.884Z",
          "MessageTS": 1453753968884192,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:33:00.851Z",
          "MessageTS": 1453753980851578,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:33:12.826Z",
          "MessageTS": 1453753992826004,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:33:24.833Z",
          "MessageTS": 1453754004833845,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:33:36.812Z",
          "MessageTS": 1453754016812357,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:33:48.783Z",
          "MessageTS": 1453754028783664,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:34:00.783Z",
          "MessageTS": 1453754040783423,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:34:12.768Z",
          "MessageTS": 1453754052768699,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:34:24.751Z",
          "MessageTS": 1453754064751878,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:34:36.724Z",
          "MessageTS": 1453754076724550,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:34:48.684Z",
          "MessageTS": 1453754088684291,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:35:00.673Z",
          "MessageTS": 1453754100673027,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:35:12.634Z",
          "MessageTS": 1453754112634972,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:35:24.591Z",
          "MessageTS": 1453754124591384,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:35:36.557Z",
          "MessageTS": 1453754136557487,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:35:48.533Z",
          "MessageTS": 1453754148533636,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
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
        },
        {
          "date": "2016-01-25T20:42:32.162Z",
          "MessageTS": 1453754552162623,
          "reads": 0,
          "writes": 18,
          "reads_kbytes": 0,
          "writes_kbytes": 28751,
          "op_r_latency": 0,
          "op_w_latency": 4831
        },
        {
          "date": "2016-01-25T20:42:44.281Z",
          "MessageTS": 1453754564281816,
          "reads": 0,
          "writes": 21,
          "reads_kbytes": 0,
          "writes_kbytes": 26749,
          "op_r_latency": 0,
          "op_w_latency": 2328
        },
        {
          "date": "2016-01-25T20:42:56.438Z",
          "MessageTS": 1453754576438998,
          "reads": 0,
          "writes": 18,
          "reads_kbytes": 0,
          "writes_kbytes": 31818,
          "op_r_latency": 0,
          "op_w_latency": 2228
        },
        {
          "date": "2016-01-25T20:43:08.562Z",
          "MessageTS": 1453754588562754,
          "reads": 0,
          "writes": 14,
          "reads_kbytes": 0,
          "writes_kbytes": 17475,
          "op_r_latency": 0,
          "op_w_latency": 1077
        },
        {
          "date": "2016-01-25T20:43:20.775Z",
          "MessageTS": 1453754600775981,
          "reads": 0,
          "writes": 35,
          "reads_kbytes": 0,
          "writes_kbytes": 21070,
          "op_r_latency": 0,
          "op_w_latency": 3656
        },
        {
          "date": "2016-01-25T20:44:28.491Z",
          "MessageTS": 1453754668491530,
          "reads": 0,
          "writes": 3,
          "reads_kbytes": 1,
          "writes_kbytes": 1042,
          "op_r_latency": 0,
          "op_w_latency": 3451
        },
        {
          "date": "2016-01-25T20:44:40.642Z",
          "MessageTS": 1453754680642827,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:44:52.774Z",
          "MessageTS": 1453754692774805,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:45:04.918Z",
          "MessageTS": 1453754704918527,
          "reads": 39,
          "writes": 0,
          "reads_kbytes": 15395,
          "writes_kbytes": 0,
          "op_r_latency": 560,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:45:17.045Z",
          "MessageTS": 1453754717045888,
          "reads": 41,
          "writes": 0,
          "reads_kbytes": 16419,
          "writes_kbytes": 0,
          "op_r_latency": 3160,
          "op_w_latency": 0
        },
        {
          "date": "2016-01-25T20:45:30.092Z",
          "MessageTS": 1453754730092795,
          "reads": 12,
          "writes": 37,
          "reads_kbytes": 4122,
          "writes_kbytes": 23602,
          "op_r_latency": 922,
          "op_w_latency": 3200
        },
        {
          "date": "2016-01-25T20:45:46.000Z",
          "MessageTS": 1453754746000280,
          "reads": 8,
          "writes": 28,
          "reads_kbytes": 3084,
          "writes_kbytes": 21614,
          "op_r_latency": 1248,
          "op_w_latency": 1339
        },
        {
          "date": "2016-01-25T20:46:00.026Z",
          "MessageTS": 1453754760026968,
          "reads": 20,
          "writes": 19,
          "reads_kbytes": 6187,
          "writes_kbytes": 18505,
          "op_r_latency": 1075,
          "op_w_latency": 1631
        },
        {
          "date": "2016-01-25T20:46:15.537Z",
          "MessageTS": 1453754775537748,
          "reads": 14,
          "writes": 17,
          "reads_kbytes": 6159,
          "writes_kbytes": 15407,
          "op_r_latency": 1603,
          "op_w_latency": 890
        },
        {
          "date": "2016-01-25T20:46:29.219Z",
          "MessageTS": 1453754789219285,
          "reads": 5,
          "writes": 15,
          "reads_kbytes": 1048,
          "writes_kbytes": 13331,
          "op_r_latency": 2089,
          "op_w_latency": 1149
        },
        {
          "date": "2016-01-25T20:46:43.136Z",
          "MessageTS": 1453754803136132,
          "reads": 16,
          "writes": 15,
          "reads_kbytes": 6165,
          "writes_kbytes": 12314,
          "op_r_latency": 1230,
          "op_w_latency": 1244
        },
        {
          "date": "2016-01-25T20:46:55.827Z",
          "MessageTS": 1453754815827990,
          "reads": 4,
          "writes": 15,
          "reads_kbytes": 1034,
          "writes_kbytes": 9293,
          "op_r_latency": 2661,
          "op_w_latency": 1716
        },
        {
          "date": "2016-01-25T20:47:09.127Z",
          "MessageTS": 1453754829127868,
          "reads": 5,
          "writes": 53,
          "reads_kbytes": 2056,
          "writes_kbytes": 29785,
          "op_r_latency": 1018,
          "op_w_latency": 1771
        },
        {
          "date": "2016-01-25T20:47:21.930Z",
          "MessageTS": 1453754841930274,
          "reads": 20,
          "writes": 33,
          "reads_kbytes": 2173,
          "writes_kbytes": 9644,
          "op_r_latency": 300,
          "op_w_latency": 1720
        },
        {
          "date": "2016-01-25T20:47:35.285Z",
          "MessageTS": 1453754855285944,
          "reads": 7,
          "writes": 17,
          "reads_kbytes": 2067,
          "writes_kbytes": 17508,
          "op_r_latency": 736,
          "op_w_latency": 584
        },
        {
          "date": "2016-01-25T20:47:49.051Z",
          "MessageTS": 1453754869051645,
          "reads": 8,
          "writes": 10,
          "reads_kbytes": 3083,
          "writes_kbytes": 11285,
          "op_r_latency": 2337,
          "op_w_latency": 961
        },
        {
          "date": "2016-01-25T20:48:02.124Z",
          "MessageTS": 1453754882124928,
          "reads": 9,
          "writes": 13,
          "reads_kbytes": 3094,
          "writes_kbytes": 11292,
          "op_r_latency": 1560,
          "op_w_latency": 720
        },
        {
          "date": "2016-01-25T20:48:16.766Z",
          "MessageTS": 1453754896766949,
          "reads": 11,
          "writes": 47,
          "reads_kbytes": 5138,
          "writes_kbytes": 29774,
          "op_r_latency": 1654,
          "op_w_latency": 1598
        },
        {
          "date": "2016-01-25T20:48:29.701Z",
          "MessageTS": 1453754909701835,
          "reads": 2,
          "writes": 39,
          "reads_kbytes": 14,
          "writes_kbytes": 22578,
          "op_r_latency": 258,
          "op_w_latency": 1558
        },
        {
          "date": "2016-01-25T20:48:43.394Z",
          "MessageTS": 1453754923394985,
          "reads": 4,
          "writes": 18,
          "reads_kbytes": 1034,
          "writes_kbytes": 17517,
          "op_r_latency": 1118,
          "op_w_latency": 1000
        },
        {
          "date": "2016-01-25T20:48:57.687Z",
          "MessageTS": 1453754937687803,
          "reads": 8,
          "writes": 10,
          "reads_kbytes": 2066,
          "writes_kbytes": 10306,
          "op_r_latency": 1310,
          "op_w_latency": 1128
        },
        {
          "date": "2016-01-25T20:49:09.801Z",
          "MessageTS": 1453754949801457,
          "reads": 5,
          "writes": 41,
          "reads_kbytes": 1044,
          "writes_kbytes": 25702,
          "op_r_latency": 2667,
          "op_w_latency": 1905
        },
        {
          "date": "2016-01-25T20:49:24.233Z",
          "MessageTS": 1453754964233525,
          "reads": 37,
          "writes": 53,
          "reads_kbytes": 5322,
          "writes_kbytes": 25031,
          "op_r_latency": 270,
          "op_w_latency": 845
        }
      ]
    };
    return {
        diskMockData: diskMockData,
        flowSeriesForFrontendDiskMockData: flowSeriesForFrontendDiskMockData,
        flowSeriesForFrontendRawDiskMockData: flowSeriesForFrontendRawDiskMockData,
    };
});
