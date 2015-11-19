/*
 * Copyright (c) 2015 Juniper Networks, Inc. All rights reserved.
 */

define(['underscore'], function (_) {
    
    this.disksMockData = {
      "osds": [
        {
          "status": "up",
          "name": "osd.11",
          "type_id": 0,
          "type": "osd",
          "id": 11,
          "public_addr": "50.1.0.2:6825/31801",
          "uuid": "9c671fc3-10d7-4b0e-83b5-03f56857788d",
          "down_at": 1773,
          "up_from": 1780,
          "cluster_status": "in",
          "up": 1,
          "in": 1,
          "state": [
            "exists",
            "up"
          ],
          "osd_xinfo": {
            "laggy_probability": "1.000000",
            "laggy_interval": 3,
            "features": 70368744177663,
            "old_weight": 0,
            "down_stamp": "2015-10-30 17:24:59.643961",
            "osd": 11
          },
          "ceph_crush_name": "default",
          "kb": 877609036,
          "kb_avail": 216303244,
          "kb_used": 661305792,
          "fs_perf_stat": {
            "apply_latency_ms": 17,
            "commit_latency_ms": 10
          },
          "host": "cmbu-vxa2010-17",
          "avg_bw": {
            "Date": "2015-11-02T21:49:34.559Z",
            "name": "cmbu-vxa2010-17:osd.11",
            "uuid": "9c671fc3-10d7-4b0e-83b5-03f56857788d",
            "sampleCnt": 106,
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
          "down_at": 1773,
          "up_from": 1779,
          "cluster_status": "in",
          "up": 1,
          "in": 1,
          "state": [
            "exists",
            "up"
          ],
          "osd_xinfo": {
            "laggy_probability": "1.000000",
            "laggy_interval": 3,
            "features": 70368744177663,
            "old_weight": 0,
            "down_stamp": "2015-10-30 17:24:59.643961",
            "osd": 10
          },
          "ceph_crush_name": "default",
          "kb": 877609036,
          "kb_avail": 188766612,
          "kb_used": 688842424,
          "fs_perf_stat": {
            "apply_latency_ms": 29,
            "commit_latency_ms": 23
          },
          "host": "cmbu-vxa2010-17",
          "avg_bw": {
            "Date": "2015-11-02T21:49:34.559Z",
            "name": "cmbu-vxa2010-17:osd.10",
            "uuid": "fff77db7-38e6-49b2-8f81-c2f4b68efa15",
            "sampleCnt": 106,
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
          "down_at": 1773,
          "up_from": 1775,
          "cluster_status": "in",
          "up": 1,
          "in": 1,
          "state": [
            "exists",
            "up"
          ],
          "osd_xinfo": {
            "laggy_probability": "1.000000",
            "laggy_interval": 1,
            "features": 70368744177663,
            "old_weight": 0,
            "down_stamp": "2015-10-30 17:24:59.643961",
            "osd": 9
          },
          "ceph_crush_name": "default",
          "kb": 877609036,
          "kb_avail": 200575856,
          "kb_used": 677033180,
          "fs_perf_stat": {
            "apply_latency_ms": 29,
            "commit_latency_ms": 23
          },
          "host": "cmbu-vxa2010-17",
          "avg_bw": {
            "Date": "2015-11-02T21:49:34.559Z",
            "name": "cmbu-vxa2010-17:osd.9",
            "uuid": "c17c4e38-ef24-4b06-af66-709a11822fe1",
            "sampleCnt": 106,
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
          "down_at": 1773,
          "up_from": 1774,
          "cluster_status": "in",
          "up": 1,
          "in": 1,
          "state": [
            "exists",
            "up"
          ],
          "osd_xinfo": {
            "laggy_probability": "1.000000",
            "laggy_interval": 1,
            "features": 70368744177663,
            "old_weight": 0,
            "down_stamp": "2015-10-30 17:24:59.643961",
            "osd": 8
          },
          "ceph_crush_name": "default",
          "kb": 877609036,
          "kb_avail": 145859272,
          "kb_used": 731749764,
          "fs_perf_stat": {
            "apply_latency_ms": 31,
            "commit_latency_ms": 25
          },
          "host": "cmbu-vxa2010-17",
          "avg_bw": {
            "Date": "2015-11-02T21:49:34.559Z",
            "name": "cmbu-vxa2010-17:osd.8",
            "uuid": "252e6c41-1c94-4e10-8d5f-686d9ead94e2",
            "sampleCnt": 106,
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
          "down_at": 1773,
          "up_from": 1778,
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
            "down_stamp": "2015-10-30 17:24:59.643961",
            "osd": 7
          },
          "ceph_crush_name": "default",
          "kb": 877609036,
          "kb_avail": 122324056,
          "kb_used": 755284980,
          "fs_perf_stat": {
            "apply_latency_ms": 15,
            "commit_latency_ms": 15
          },
          "host": "cmbu-vxa2010-17",
          "avg_bw": {
            "Date": "2015-11-02T21:49:34.559Z",
            "name": "cmbu-vxa2010-17:osd.7",
            "uuid": "0feaf64b-8d4f-413c-b422-4f80660c8169",
            "sampleCnt": 106,
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
          "down_at": 1785,
          "up_from": 1786,
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
            "down_stamp": "2015-10-30 17:25:14.383481",
            "osd": 6
          },
          "ceph_crush_name": "default",
          "kb": 877609036,
          "kb_avail": 139956332,
          "kb_used": 737652704,
          "fs_perf_stat": {
            "apply_latency_ms": 30,
            "commit_latency_ms": 24
          },
          "host": "cmbu-vxa2010-17",
          "avg_bw": {
            "Date": "2015-11-02T21:49:34.559Z",
            "name": "cmbu-vxa2010-17:osd.6",
            "uuid": "e7743633-eb8a-457d-9f12-4fe105ca9a58",
            "sampleCnt": 106,
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
