/*
 * Copyright (c) 2015 Juniper Networks, Inc. All rights reserved.
 */

define(['underscore'], function (_) {
    
    this.disksMockData = {
      "osds": [
        {
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
            "Date": "2015-10-22T02:00:42.930Z",
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
        },
        {
          "status": "up",
          "name": "osd.1",
          "type_id": 0,
          "type": "osd",
          "id": 1,
          "public_addr": "50.1.0.1:6805/6206",
          "uuid": "9b50a2d1-7672-4614-9b10-2d941f095f35",
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
            "laggy_interval": 4,
            "features": 70368744177663,
            "old_weight": 0,
            "down_stamp": "2015-10-21 14:33:01.075704",
            "osd": 1
          },
          "kb": 487099008,
          "kb_avail": 125313760,
          "kb_used": 361785248,
          "fs_perf_stat": {
            "apply_latency_ms": 44,
            "commit_latency_ms": 37
          },
          "host": "cmbu-vxa2100-proto3",
          "avg_bw": {
            "Date": "2015-10-22T02:00:42.930Z",
            "name": "cmbu-vxa2100-proto3:osd.1",
            "uuid": "\n9b50a2d1-7672-4614-9b10-2d941f095f35\nfff77db7-38e6-49b2-8f81-c2f4b68efa15\n9c671fc3-10d7-4b0e-83b5-03f56857788d"
    ,
            "sampleCnt": 100,
            "reads": 0,
            "writes": 0,
            "reads_kbytes": 0,
            "writes_kbytes": 0,
            "op_r_latency": 0,
            "op_w_latency": 0
          }
        },
        {
          "status": "up",
          "name": "osd.2",
          "type_id": 0,
          "type": "osd",
          "id": 2,
          "public_addr": "50.1.0.1:6810/8688",
          "uuid": "9a9c2436-d2a9-4198-a854-db713540c65b",
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
            "laggy_interval": 4,
            "features": 70368744177663,
            "old_weight": 0,
            "down_stamp": "2015-10-21 14:33:01.075704",
            "osd": 2
          },
          "kb": 975236544,
          "kb_avail": 94526532,
          "kb_used": 880710012,
          "fs_perf_stat": {
            "apply_latency_ms": 20,
            "commit_latency_ms": 20
          },
          "host": "cmbu-vxa2100-proto3",
          "avg_bw": {
            "Date": "2015-10-22T02:00:42.930Z",
            "name": "cmbu-vxa2100-proto3:osd.2",
            "uuid": "9a9c2436-d2a9-4198-a854-db713540c65b",
            "sampleCnt": 100,
            "reads": 0,
            "writes": 0,
            "reads_kbytes": 0,
            "writes_kbytes": 0,
            "op_r_latency": 0,
            "op_w_latency": 0
          }
        },
        {
          "status": "up",
          "name": "osd.3",
          "type_id": 0,
          "type": "osd",
          "id": 3,
          "public_addr": "50.1.0.1:6815/10575",
          "uuid": "9378d377-5531-4c1a-a184-e314373b7882",
          "down_at": 1590,
          "up_from": 1595,
          "cluster_status": "in",
          "up": 1,
          "in": 1,
          "state": [
            "exists",
            "up"
          ],
          "osd_xinfo": {
            "laggy_probability": "1.000000",
            "laggy_interval": 6,
            "features": 70368744177663,
            "old_weight": 0,
            "down_stamp": "2015-10-21 14:33:01.075704",
            "osd": 3
          },
          "kb": 975236544,
          "kb_avail": 116590804,
          "kb_used": 858645740,
          "fs_perf_stat": {
            "apply_latency_ms": 14,
            "commit_latency_ms": 14
          },
          "host": "cmbu-vxa2100-proto3",
          "avg_bw": {
            "Date": "2015-10-22T02:00:42.930Z",
            "name": "cmbu-vxa2100-proto3:osd.3",
            "uuid": "9378d377-5531-4c1a-a184-e314373b7882",
            "sampleCnt": 100,
            "reads": 0,
            "writes": 0,
            "reads_kbytes": 0,
            "writes_kbytes": 0,
            "op_r_latency": 0,
            "op_w_latency": 0
          }
        },
        {
          "status": "up",
          "name": "osd.4",
          "type_id": 0,
          "type": "osd",
          "id": 4,
          "public_addr": "50.1.0.1:6820/13934",
          "uuid": "449f6fe8-c39e-46a9-afe4-1b594662da54",
          "down_at": 1582,
          "up_from": 1586,
          "cluster_status": "in",
          "up": 1,
          "in": 1,
          "state": [
            "exists",
            "up"
          ],
          "osd_xinfo": {
            "laggy_probability": "1.000000",
            "laggy_interval": 7,
            "features": 70368744177663,
            "old_weight": 0,
            "down_stamp": "2015-10-21 13:32:13.021269",
            "osd": 4
          },
          "kb": 975236544,
          "kb_avail": 137785804,
          "kb_used": 837450740,
          "fs_perf_stat": {
            "apply_latency_ms": 44,
            "commit_latency_ms": 38
          },
          "host": "cmbu-vxa2100-proto3",
          "avg_bw": {
            "Date": "2015-10-22T02:00:42.930Z",
            "name": "cmbu-vxa2100-proto3:osd.4",
            "uuid": "449f6fe8-c39e-46a9-afe4-1b594662da54",
            "sampleCnt": 100,
            "reads": 0,
            "writes": 0,
            "reads_kbytes": 0,
            "writes_kbytes": 0,
            "op_r_latency": 0,
            "op_w_latency": 0
          }
        },
        {
          "status": "up",
          "name": "osd.5",
          "type_id": 0,
          "type": "osd",
          "id": 5,
          "public_addr": "50.1.0.1:6825/15599",
          "uuid": "67304748-9df9-4e5d-ba0e-cda366d4044c",
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
            "laggy_interval": 4,
            "features": 70368744177663,
            "old_weight": 0,
            "down_stamp": "2015-10-21 14:33:01.075704",
            "osd": 5
          },
          "kb": 975236544,
          "kb_avail": 48708008,
          "kb_used": 926528536,
          "fs_perf_stat": {
            "apply_latency_ms": 44,
            "commit_latency_ms": 37
          },
          "host": "cmbu-vxa2100-proto3",
          "avg_bw": {
            "Date": "2015-10-22T02:00:42.930Z",
            "name": "cmbu-vxa2100-proto3:osd.5",
            "uuid": "67304748-9df9-4e5d-ba0e-cda366d4044c",
            "sampleCnt": 100,
            "reads": 0,
            "writes": 0,
            "reads_kbytes": 0,
            "writes_kbytes": 0,
            "op_r_latency": 0,
            "op_w_latency": 0
          }
        },
        {
          "status": "up",
          "name": "osd.6",
          "type_id": 0,
          "type": "osd",
          "id": 6,
          "public_addr": "50.1.0.2:6800/22501",
          "uuid": "e7743633-eb8a-457d-9f12-4fe105ca9a58",
          "down_at": 1582,
          "up_from": 1588,
          "cluster_status": "in",
          "up": 1,
          "in": 1,
          "state": [
            "exists",
            "up"
          ],
          "osd_xinfo": {
            "laggy_probability": "1.000000",
            "laggy_interval": 8,
            "features": 70368744177663,
            "old_weight": 0,
            "down_stamp": "2015-10-21 13:32:13.021269",
            "osd": 6
          },
          "kb": 877609036,
          "kb_avail": 139970200,
          "kb_used": 737638836,
          "fs_perf_stat": {
            "apply_latency_ms": 30,
            "commit_latency_ms": 24
          },
          "host": "cmbu-vxa2010-17",
          "avg_bw": {
            "Date": "2015-10-22T02:00:42.930Z",
            "name": "cmbu-vxa2010-17:osd.6",
            "uuid": "e7743633-eb8a-457d-9f12-4fe105ca9a58",
            "sampleCnt": 108,
            "reads": 0,
            "writes": 0,
            "reads_kbytes": 0,
            "writes_kbytes": 0,
            "op_r_latency": 0,
            "op_w_latency": 0
          }
        },
        {
          "status": "up",
          "name": "osd.7",
          "type_id": 0,
          "type": "osd",
          "id": 7,
          "public_addr": "50.1.0.2:6805/24107",
          "uuid": "0feaf64b-8d4f-413c-b422-4f80660c8169",
          "down_at": 1576,
          "up_from": 1580,
          "cluster_status": "in",
          "up": 1,
          "in": 1,
          "state": [
            "exists",
            "up"
          ],
          "osd_xinfo": {
            "laggy_probability": "1.000000",
            "laggy_interval": 9,
            "features": 70368744177663,
            "old_weight": 0,
            "down_stamp": "2015-10-21 12:19:56.121509",
            "osd": 7
          },
          "kb": 877609036,
          "kb_avail": 122336984,
          "kb_used": 755272052,
          "fs_perf_stat": {
            "apply_latency_ms": 13,
            "commit_latency_ms": 12
          },
          "host": "cmbu-vxa2010-17",
          "avg_bw": {
            "Date": "2015-10-22T02:00:42.930Z",
            "name": "cmbu-vxa2010-17:osd.7",
            "uuid": "0feaf64b-8d4f-413c-b422-4f80660c8169",
            "sampleCnt": 108,
            "reads": 0,
            "writes": 0,
            "reads_kbytes": 0,
            "writes_kbytes": 0,
            "op_r_latency": 0,
            "op_w_latency": 0
          }
        },
        {
          "status": "up",
          "name": "osd.8",
          "type_id": 0,
          "type": "osd",
          "id": 8,
          "public_addr": "50.1.0.2:6810/26279",
          "uuid": "252e6c41-1c94-4e10-8d5f-686d9ead94e2",
          "down_at": 1576,
          "up_from": 1577,
          "cluster_status": "in",
          "up": 1,
          "in": 1,
          "state": [
            "exists",
            "up"
          ],
          "osd_xinfo": {
            "laggy_probability": "1.000000",
            "laggy_interval": 2,
            "features": 70368744177663,
            "old_weight": 0,
            "down_stamp": "2015-10-21 12:19:56.121509",
            "osd": 8
          },
          "kb": 877609036,
          "kb_avail": 145860912,
          "kb_used": 731748124,
          "fs_perf_stat": {
            "apply_latency_ms": 32,
            "commit_latency_ms": 25
          },
          "host": "cmbu-vxa2010-17",
          "avg_bw": {
            "Date": "2015-10-22T02:00:42.930Z",
            "name": "cmbu-vxa2010-17:osd.8",
            "uuid": "252e6c41-1c94-4e10-8d5f-686d9ead94e2",
            "sampleCnt": 108,
            "reads": 0,
            "writes": 0,
            "reads_kbytes": 0,
            "writes_kbytes": 0,
            "op_r_latency": 0,
            "op_w_latency": 0
          }
        },
        {
          "status": "up",
          "name": "osd.9",
          "type_id": 0,
          "type": "osd",
          "id": 9,
          "public_addr": "50.1.0.2:6815/27937",
          "uuid": "c17c4e38-ef24-4b06-af66-709a11822fe1",
          "down_at": 1582,
          "up_from": 1588,
          "cluster_status": "in",
          "up": 1,
          "in": 1,
          "state": [
            "exists",
            "up"
          ],
          "osd_xinfo": {
            "laggy_probability": "1.000000",
            "laggy_interval": 10,
            "features": 70368744177663,
            "old_weight": 0,
            "down_stamp": "2015-10-21 13:32:13.021269",
            "osd": 9
          },
          "kb": 877609036,
          "kb_avail": 200593288,
          "kb_used": 677015748,
          "fs_perf_stat": {
            "apply_latency_ms": 29,
            "commit_latency_ms": 23
          },
          "host": "cmbu-vxa2010-17",
          "avg_bw": {
            "Date": "2015-10-22T02:00:42.930Z",
            "name": "cmbu-vxa2010-17:osd.9",
            "uuid": "c17c4e38-ef24-4b06-af66-709a11822fe1",
            "sampleCnt": 108,
            "reads": 0,
            "writes": 0,
            "reads_kbytes": 0,
            "writes_kbytes": 0,
            "op_r_latency": 0,
            "op_w_latency": 0
          }
        },
        {
          "status": "up",
          "name": "osd.10",
          "type_id": 0,
          "type": "osd",
          "id": 10,
          "public_addr": "50.1.0.2:6820/29886",
          "uuid": "fff77db7-38e6-49b2-8f81-c2f4b68efa15",
          "down_at": 1582,
          "up_from": 1583,
          "cluster_status": "in",
          "up": 1,
          "in": 1,
          "state": [
            "exists",
            "up"
          ],
          "osd_xinfo": {
            "laggy_probability": "1.000000",
            "laggy_interval": 4,
            "features": 70368744177663,
            "old_weight": 0,
            "down_stamp": "2015-10-21 13:32:13.021269",
            "osd": 10
          },
          "kb": 877609036,
          "kb_avail": 188771548,
          "kb_used": 688837488,
          "fs_perf_stat": {
            "apply_latency_ms": 14,
            "commit_latency_ms": 14
          },
          "host": "cmbu-vxa2010-17",
          "avg_bw": {
            "Date": "2015-10-22T02:00:42.930Z",
            "name": "cmbu-vxa2010-17:osd.10",
            "uuid": "fff77db7-38e6-49b2-8f81-c2f4b68efa15",
            "sampleCnt": 108,
            "reads": 0,
            "writes": 0,
            "reads_kbytes": 0,
            "writes_kbytes": 0,
            "op_r_latency": 0,
            "op_w_latency": 0
          }
        },
        {
          "status": "up",
          "name": "osd.11",
          "type_id": 0,
          "type": "osd",
          "id": 11,
          "public_addr": "50.1.0.2:6825/31801",
          "uuid": "9c671fc3-10d7-4b0e-83b5-03f56857788d",
          "down_at": 1567,
          "up_from": 1568,
          "cluster_status": "in",
          "up": 1,
          "in": 1,
          "state": [
            "exists",
            "up"
          ],
          "osd_xinfo": {
            "laggy_probability": "1.000000",
            "laggy_interval": 2,
            "features": 70368744177663,
            "old_weight": 0,
            "down_stamp": "2015-10-21 11:38:13.437248",
            "osd": 11
          },
          "kb": 877609036,
          "kb_avail": 216313128,
          "kb_used": 661295908,
          "fs_perf_stat": {
            "apply_latency_ms": 29,
            "commit_latency_ms": 23
          },
          "host": "cmbu-vxa2010-17",
          "avg_bw": {
            "Date": "2015-10-22T02:00:42.930Z",
            "name": "cmbu-vxa2010-17:osd.11",
            "uuid": "9c671fc3-10d7-4b0e-83b5-03f56857788d",
            "sampleCnt": 108,
            "reads": 0,
            "writes": 0,
            "reads_kbytes": 0,
            "writes_kbytes": 0,
            "op_r_latency": 0,
            "op_w_latency": 0
          }
        }
      ]
    };
    return {
        disksMockData: disksMockData,
    };
});
