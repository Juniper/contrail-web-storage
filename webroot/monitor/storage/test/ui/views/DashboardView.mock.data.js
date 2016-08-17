/*
 * Copyright (c) 2015 Juniper Networks, Inc. All rights reserved.
 */

define(['underscore'], function (_) {
    
    this.clusterStatusMockData = {
      "cluster_status": {
        "last_updated_time": "2015-10-28T22:50:51.356Z",
        "overall_status": "HEALTH_ERR",
        "pg": {
          "pg_summary": {
            "num_pg_by_state": [
              {
                "num": 5704,
                "name": "active+clean"
              }
            ],
            "io_sec": 3,
            "num_pgs": 5704,
            "raw_bytes": 479965509304320,
            "num_bytes": 88667365810,
            "read_bytes_sec": 0,
            "version": 127717,
            "raw_bytes_used": 181717057536,
            "write_bytes_sec": 4554,
            "raw_bytes_avail": 479783792246784
          },
          "status": "OK",
          "state": [
            "active+clean"
          ],
          "count": "5704/5704"
        },
        "health": {
          "details": [
            "osd.5 is full at 95%",
            "osd.2 is near full at 90%",
            "osd.3 is near full at 88%",
            "osd.4 is near full at 85%",
            "osd.7 is near full at 86%"
          ],
          "summary": [
            {
              "severity": "HEALTH_ERR",
              "summary": "1 full osd(s)"
            },
            {
              "severity": "HEALTH_WARN",
              "summary": "4 near full osd(s)"
            }
          ]
        }
      }
    };

    this.clusterOSDStatusMockData = {
      "osd_stat": {
        "status": "OK",
        "output": {
          "full": true,
          "nearfull": false,
          "num_osds": 12,
          "num_up_osds": 12,
          "epoch": 1720,
          "num_in_osds": 12,
          "num_down_osds": 0,
          "num_out_osds": 0
        },
        "last_updated_time": "2015-10-28T22:50:51.657Z"
      }
    };
    
    this.clusterUsageMockData = {
      "usage_summary": {
        "osd_status": {
          "status": "OK",
          "output": {
            "full": true,
            "nearfull": false,
            "num_osds": 12,
            "num_up_osds": 12,
            "epoch": 1720,
            "num_in_osds": 12,
            "num_down_osds": 0,
            "num_out_osds": 0
          },
          "last_updated_time": "2015-10-28T21:35:26.169Z"
        },
        "osd_summary": {
          "snap_trim_queue_len": 0,
          "kb": 10140798408,
          "fs_perf_stat": {
            "apply_latency_ms": 346,
            "commit_latency_ms": 299
          },
          "hb_in": [],
          "num_snap_trimming": 0,
          "hb_out": [],
          "kb_avail": 1637102692,
          "kb_used": 8503695716,
          "op_queue_age_hist": {
            "upper_bound": 1,
            "histogram": []
          },
          "full_ratio": "0.950000",
          "near_full_ratio": "0.850000"
        }
      }
    };

    this.clusterPoolSummaryMockData ={
      "pools": [
        {
          "cache_target_full_ratio_micro": 800000,
          "stripe_width": 0,
          "flags_names": "hashpspool",
          "tier_of": -1,
          "pg_placement_num": 360,
          "quota_max_bytes": 0,
          "erasure_code_profile": "",
          "expected_num_objects": 0,
          "size": 2,
          "snap_seq": 0,
          "auid": 18446744073709552000,
          "cache_min_flush_age": 0,
          "hit_set_period": 0,
          "min_read_recency_for_promote": 0,
          "target_max_objects": 0,
          "pg_num": 360,
          "type": 1,
          "crush_ruleset": 0,
          "pool_name": "volumes",
          "cache_min_evict_age": 0,
          "snap_mode": "selfmanaged",
          "cache_mode": "none",
          "min_size": 2,
          "crash_replay_interval": 0,
          "object_hash": 2,
          "write_tier": -1,
          "cache_target_dirty_ratio_micro": 400000,
          "pool": 1,
          "removed_snaps": "[]",
          "tiers": [],
          "hit_set_params": {
            "type": "none"
          },
          "last_force_op_resend": "0",
          "pool_snaps": [],
          "quota_max_objects": 0,
          "hit_set_count": 0,
          "flags": 1,
          "target_max_bytes": 0,
          "snap_epoch": 0,
          "last_change": "87",
          "read_tier": -1,
          "name": "volumes",
          "stats": {
            "bytes_used": 2173805764680,
            "max_avail": 259210544555,
            "objects": 1059595,
            "kb_used": 2122857193
          }
        },
        {
          "cache_target_full_ratio_micro": 800000,
          "stripe_width": 0,
          "flags_names": "hashpspool",
          "tier_of": -1,
          "pg_placement_num": 360,
          "quota_max_bytes": 0,
          "erasure_code_profile": "",
          "expected_num_objects": 0,
          "size": 2,
          "snap_seq": 0,
          "auid": 18446744073709552000,
          "cache_min_flush_age": 0,
          "hit_set_period": 0,
          "min_read_recency_for_promote": 0,
          "target_max_objects": 0,
          "pg_num": 360,
          "type": 1,
          "crush_ruleset": 0,
          "pool_name": "images",
          "cache_min_evict_age": 0,
          "snap_mode": "selfmanaged",
          "cache_mode": "none",
          "min_size": 2,
          "crash_replay_interval": 0,
          "object_hash": 2,
          "write_tier": -1,
          "cache_target_dirty_ratio_micro": 400000,
          "pool": 2,
          "removed_snaps": "[]",
          "tiers": [],
          "hit_set_params": {
            "type": "none"
          },
          "last_force_op_resend": "0",
          "pool_snaps": [],
          "quota_max_objects": 0,
          "hit_set_count": 0,
          "flags": 1,
          "target_max_bytes": 0,
          "snap_epoch": 0,
          "last_change": "73",
          "read_tier": -1,
          "name": "images",
          "stats": {
            "bytes_used": 2173803713136,
            "max_avail": 259210544555,
            "objects": 1059594,
            "kb_used": 2122855189
          }
        }
      ]
    };

    this.flowSeriesForClusterOsdActivityMockData ={
      "summary": {
        "start_time": "2016-01-25T19:48:39.000Z",
        "end_time": "2016-01-25T20:48:39.000Z",
        "timeGran_microsecs": 60000000,
        "average_interval": "60 Seconds",
        "sources": [
          "ubuntu14-compute1",
          "ubuntu14-compute2"
        ]
      },
      "flow-series": [
        {
          "Date": "2016-01-25T19:48:00.000Z",
          "MessageTS": 1453751280000000,
          "sampleCnt": 2,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "Date": "2016-01-25T19:49:00.000Z",
          "MessageTS": 1453751340000000,
          "sampleCnt": 5,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "Date": "2016-01-25T19:50:00.000Z",
          "MessageTS": 1453751400000000,
          "sampleCnt": 5,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "Date": "2016-01-25T19:51:00.000Z",
          "MessageTS": 1453751460000000,
          "sampleCnt": 5,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "Date": "2016-01-25T19:52:00.000Z",
          "MessageTS": 1453751520000000,
          "sampleCnt": 5,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "Date": "2016-01-25T19:53:00.000Z",
          "MessageTS": 1453751580000000,
          "sampleCnt": 5,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "Date": "2016-01-25T19:54:00.000Z",
          "MessageTS": 1453751640000000,
          "sampleCnt": 5,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "Date": "2016-01-25T19:55:00.000Z",
          "MessageTS": 1453751700000000,
          "sampleCnt": 5,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "Date": "2016-01-25T19:56:00.000Z",
          "MessageTS": 1453751760000000,
          "sampleCnt": 5,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "Date": "2016-01-25T19:57:00.000Z",
          "MessageTS": 1453751820000000,
          "sampleCnt": 5,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "Date": "2016-01-25T19:58:00.000Z",
          "MessageTS": 1453751880000000,
          "sampleCnt": 5,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "Date": "2016-01-25T19:59:00.000Z",
          "MessageTS": 1453751940000000,
          "sampleCnt": 5,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "Date": "2016-01-25T20:00:00.000Z",
          "MessageTS": 1453752000000000,
          "sampleCnt": 5,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "Date": "2016-01-25T20:01:00.000Z",
          "MessageTS": 1453752060000000,
          "sampleCnt": 5,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "Date": "2016-01-25T20:02:00.000Z",
          "MessageTS": 1453752120000000,
          "sampleCnt": 5,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "Date": "2016-01-25T20:03:00.000Z",
          "MessageTS": 1453752180000000,
          "sampleCnt": 5,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "Date": "2016-01-25T20:04:00.000Z",
          "MessageTS": 1453752240000000,
          "sampleCnt": 5,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "Date": "2016-01-25T20:05:00.000Z",
          "MessageTS": 1453752300000000,
          "sampleCnt": 5,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "Date": "2016-01-25T20:06:00.000Z",
          "MessageTS": 1453752360000000,
          "sampleCnt": 5,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "Date": "2016-01-25T20:07:00.000Z",
          "MessageTS": 1453752420000000,
          "sampleCnt": 5,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "Date": "2016-01-25T20:08:00.000Z",
          "MessageTS": 1453752480000000,
          "sampleCnt": 5,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "Date": "2016-01-25T20:09:00.000Z",
          "MessageTS": 1453752540000000,
          "sampleCnt": 5,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "Date": "2016-01-25T20:10:00.000Z",
          "MessageTS": 1453752600000000,
          "sampleCnt": 5,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "Date": "2016-01-25T20:11:00.000Z",
          "MessageTS": 1453752660000000,
          "sampleCnt": 5,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "Date": "2016-01-25T20:12:00.000Z",
          "MessageTS": 1453752720000000,
          "sampleCnt": 5,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "Date": "2016-01-25T20:13:00.000Z",
          "MessageTS": 1453752780000000,
          "sampleCnt": 5,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "Date": "2016-01-25T20:14:00.000Z",
          "MessageTS": 1453752840000000,
          "sampleCnt": 5,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "Date": "2016-01-25T20:15:00.000Z",
          "MessageTS": 1453752900000000,
          "sampleCnt": 5,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "Date": "2016-01-25T20:16:00.000Z",
          "MessageTS": 1453752960000000,
          "sampleCnt": 5,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "Date": "2016-01-25T20:17:00.000Z",
          "MessageTS": 1453753020000000,
          "sampleCnt": 5,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "Date": "2016-01-25T20:18:00.000Z",
          "MessageTS": 1453753080000000,
          "sampleCnt": 5,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "Date": "2016-01-25T20:19:00.000Z",
          "MessageTS": 1453753140000000,
          "sampleCnt": 5,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "Date": "2016-01-25T20:20:00.000Z",
          "MessageTS": 1453753200000000,
          "sampleCnt": 5,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "Date": "2016-01-25T20:21:00.000Z",
          "MessageTS": 1453753260000000,
          "sampleCnt": 5,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "Date": "2016-01-25T20:22:00.000Z",
          "MessageTS": 1453753320000000,
          "sampleCnt": 5,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "Date": "2016-01-25T20:23:00.000Z",
          "MessageTS": 1453753380000000,
          "sampleCnt": 5,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "Date": "2016-01-25T20:24:00.000Z",
          "MessageTS": 1453753440000000,
          "sampleCnt": 5,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "Date": "2016-01-25T20:25:00.000Z",
          "MessageTS": 1453753500000000,
          "sampleCnt": 5,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "Date": "2016-01-25T20:26:00.000Z",
          "MessageTS": 1453753560000000,
          "sampleCnt": 5,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "Date": "2016-01-25T20:27:00.000Z",
          "MessageTS": 1453753620000000,
          "sampleCnt": 5,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "Date": "2016-01-25T20:28:00.000Z",
          "MessageTS": 1453753680000000,
          "sampleCnt": 5,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "Date": "2016-01-25T20:29:00.000Z",
          "MessageTS": 1453753740000000,
          "sampleCnt": 5,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "Date": "2016-01-25T20:30:00.000Z",
          "MessageTS": 1453753800000000,
          "sampleCnt": 5,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "Date": "2016-01-25T20:31:00.000Z",
          "MessageTS": 1453753860000000,
          "sampleCnt": 5,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "Date": "2016-01-25T20:32:00.000Z",
          "MessageTS": 1453753920000000,
          "sampleCnt": 5,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "Date": "2016-01-25T20:33:00.000Z",
          "MessageTS": 1453753980000000,
          "sampleCnt": 5,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "Date": "2016-01-25T20:34:00.000Z",
          "MessageTS": 1453754040000000,
          "sampleCnt": 5,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "Date": "2016-01-25T20:35:00.000Z",
          "MessageTS": 1453754100000000,
          "sampleCnt": 5,
          "reads": 0,
          "writes": 3,
          "reads_kbytes": 0,
          "writes_kbytes": 12168,
          "op_r_latency": 0,
          "op_w_latency": 886.5999999999999
        },
        {
          "Date": "2016-01-25T20:36:00.000Z",
          "MessageTS": 1453754160000000,
          "sampleCnt": 5,
          "reads": 0,
          "writes": 10,
          "reads_kbytes": 0,
          "writes_kbytes": 45149.6,
          "op_r_latency": 0,
          "op_w_latency": 3206.6000000000004
        },
        {
          "Date": "2016-01-25T20:37:00.000Z",
          "MessageTS": 1453754220000000,
          "sampleCnt": 5,
          "reads": 0,
          "writes": 11,
          "reads_kbytes": 0,
          "writes_kbytes": 46027.799999999996,
          "op_r_latency": 0,
          "op_w_latency": 3552
        },
        {
          "Date": "2016-01-25T20:38:00.000Z",
          "MessageTS": 1453754280000000,
          "sampleCnt": 5,
          "reads": 0,
          "writes": 9,
          "reads_kbytes": 0,
          "writes_kbytes": 45137.2,
          "op_r_latency": 0,
          "op_w_latency": 3782.3999999999996
        },
        {
          "Date": "2016-01-25T20:39:00.000Z",
          "MessageTS": 1453754340000000,
          "sampleCnt": 5,
          "reads": 0,
          "writes": 12,
          "reads_kbytes": 0,
          "writes_kbytes": 49279.40000000001,
          "op_r_latency": 0,
          "op_w_latency": 3775.2
        },
        {
          "Date": "2016-01-25T20:40:00.000Z",
          "MessageTS": 1453754400000000,
          "sampleCnt": 5,
          "reads": 0,
          "writes": 11,
          "reads_kbytes": 0,
          "writes_kbytes": 47850.200000000004,
          "op_r_latency": 0,
          "op_w_latency": 3828.8
        },
        {
          "Date": "2016-01-25T20:41:00.000Z",
          "MessageTS": 1453754460000000,
          "sampleCnt": 4,
          "reads": 0,
          "writes": 12,
          "reads_kbytes": 0,
          "writes_kbytes": 50048.5,
          "op_r_latency": 0,
          "op_w_latency": 3713
        },
        {
          "Date": "2016-01-25T20:42:00.000Z",
          "MessageTS": 1453754520000000,
          "sampleCnt": 5,
          "reads": 0,
          "writes": 11,
          "reads_kbytes": 0,
          "writes_kbytes": 49721.2,
          "op_r_latency": 0,
          "op_w_latency": 3591.8
        },
        {
          "Date": "2016-01-25T20:43:00.000Z",
          "MessageTS": 1453754580000000,
          "sampleCnt": 3,
          "reads": 0,
          "writes": 8,
          "reads_kbytes": 0,
          "writes_kbytes": 35780.333333333336,
          "op_r_latency": 0,
          "op_w_latency": 3383.3333333333335
        },
        {
          "Date": "2016-01-25T20:44:00.000Z",
          "MessageTS": 1453754640000000,
          "sampleCnt": 4,
          "reads": 7,
          "writes": 4,
          "reads_kbytes": 27100,
          "writes_kbytes": 14068.5,
          "op_r_latency": 35.25,
          "op_w_latency": 1452.75
        },
        {
          "Date": "2016-01-25T20:45:00.000Z",
          "MessageTS": 1453754700000000,
          "sampleCnt": 5,
          "reads": 4,
          "writes": 6,
          "reads_kbytes": 18301.8,
          "writes_kbytes": 24195.2,
          "op_r_latency": 981.8,
          "op_w_latency": 2864.2
        },
        {
          "Date": "2016-01-25T20:46:00.000Z",
          "MessageTS": 1453754760000000,
          "sampleCnt": 4,
          "reads": 2,
          "writes": 8,
          "reads_kbytes": 13436.25,
          "writes_kbytes": 39226.5,
          "op_r_latency": 1172.5,
          "op_w_latency": 4388.5
        },
        {
          "Date": "2016-01-25T20:47:00.000Z",
          "MessageTS": 1453754820000000,
          "sampleCnt": 5,
          "reads": 3,
          "writes": 9,
          "reads_kbytes": 11135,
          "writes_kbytes": 35618.200000000004,
          "op_r_latency": 1219.4,
          "op_w_latency": 3809.2
        },
        {
          "Date": "2016-01-25T20:48:00.000Z",
          "MessageTS": 1453754880000000,
          "sampleCnt": 2,
          "reads": 0,
          "writes": 2,
          "reads_kbytes": 2819,
          "writes_kbytes": 8606,
          "op_r_latency": 512.5,
          "op_w_latency": 886
        }
      ]
    };
    
    this.flowSeriesForClusterRawActivityMockData ={
      "summary": {
        "start_time": "2016-01-25T19:46:18.000Z",
        "end_time": "2016-01-25T20:46:18.000Z",
        "timeGran_microsecs": 60000000,
        "average_interval": "60 Seconds",
        "sources": [
          "ubuntu14-compute1",
          "ubuntu14-compute2"
        ]
      },
      "flow-series": [
        {
          "Date": "2016-01-25T19:46:00.000Z",
          "MessageTS": 1453751160000000,
          "sampleCnt": 3,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "Date": "2016-01-25T19:47:00.000Z",
          "MessageTS": 1453751220000000,
          "sampleCnt": 5,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "Date": "2016-01-25T19:48:00.000Z",
          "MessageTS": 1453751280000000,
          "sampleCnt": 5,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "Date": "2016-01-25T19:49:00.000Z",
          "MessageTS": 1453751340000000,
          "sampleCnt": 5,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "Date": "2016-01-25T19:50:00.000Z",
          "MessageTS": 1453751400000000,
          "sampleCnt": 5,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "Date": "2016-01-25T19:51:00.000Z",
          "MessageTS": 1453751460000000,
          "sampleCnt": 5,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "Date": "2016-01-25T19:52:00.000Z",
          "MessageTS": 1453751520000000,
          "sampleCnt": 5,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "Date": "2016-01-25T19:53:00.000Z",
          "MessageTS": 1453751580000000,
          "sampleCnt": 5,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "Date": "2016-01-25T19:54:00.000Z",
          "MessageTS": 1453751640000000,
          "sampleCnt": 5,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "Date": "2016-01-25T19:55:00.000Z",
          "MessageTS": 1453751700000000,
          "sampleCnt": 5,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "Date": "2016-01-25T19:56:00.000Z",
          "MessageTS": 1453751760000000,
          "sampleCnt": 20,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "Date": "2016-01-25T19:57:00.000Z",
          "MessageTS": 1453751820000000,
          "sampleCnt": 5,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "Date": "2016-01-25T19:58:00.000Z",
          "MessageTS": 1453751880000000,
          "sampleCnt": 5,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "Date": "2016-01-25T19:59:00.000Z",
          "MessageTS": 1453751940000000,
          "sampleCnt": 5,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "Date": "2016-01-25T20:00:00.000Z",
          "MessageTS": 1453752000000000,
          "sampleCnt": 20,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "Date": "2016-01-25T20:01:00.000Z",
          "MessageTS": 1453752060000000,
          "sampleCnt": 20,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "Date": "2016-01-25T20:02:00.000Z",
          "MessageTS": 1453752120000000,
          "sampleCnt": 20,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "Date": "2016-01-25T20:03:00.000Z",
          "MessageTS": 1453752180000000,
          "sampleCnt": 20,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "Date": "2016-01-25T20:04:00.000Z",
          "MessageTS": 1453752240000000,
          "sampleCnt": 20,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "Date": "2016-01-25T20:05:00.000Z",
          "MessageTS": 1453752300000000,
          "sampleCnt": 20,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "Date": "2016-01-25T20:06:00.000Z",
          "MessageTS": 1453752360000000,
          "sampleCnt": 20,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "Date": "2016-01-25T20:07:00.000Z",
          "MessageTS": 1453752420000000,
          "sampleCnt": 20,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "Date": "2016-01-25T20:08:00.000Z",
          "MessageTS": 1453752480000000,
          "sampleCnt": 20,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "Date": "2016-01-25T20:09:00.000Z",
          "MessageTS": 1453752540000000,
          "sampleCnt": 20,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "Date": "2016-01-25T20:10:00.000Z",
          "MessageTS": 1453752600000000,
          "sampleCnt": 5,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "Date": "2016-01-25T20:11:00.000Z",
          "MessageTS": 1453752660000000,
          "sampleCnt": 5,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "Date": "2016-01-25T20:12:00.000Z",
          "MessageTS": 1453752720000000,
          "sampleCnt": 5,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "Date": "2016-01-25T20:13:00.000Z",
          "MessageTS": 1453752780000000,
          "sampleCnt": 5,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "Date": "2016-01-25T20:14:00.000Z",
          "MessageTS": 1453752840000000,
          "sampleCnt": 5,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "Date": "2016-01-25T20:15:00.000Z",
          "MessageTS": 1453752900000000,
          "sampleCnt": 20,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "Date": "2016-01-25T20:16:00.000Z",
          "MessageTS": 1453752960000000,
          "sampleCnt": 20,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "Date": "2016-01-25T20:17:00.000Z",
          "MessageTS": 1453753020000000,
          "sampleCnt": 5,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "Date": "2016-01-25T20:18:00.000Z",
          "MessageTS": 1453753080000000,
          "sampleCnt": 5,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "Date": "2016-01-25T20:19:00.000Z",
          "MessageTS": 1453753140000000,
          "sampleCnt": 5,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "Date": "2016-01-25T20:20:00.000Z",
          "MessageTS": 1453753200000000,
          "sampleCnt": 5,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "Date": "2016-01-25T20:21:00.000Z",
          "MessageTS": 1453753260000000,
          "sampleCnt": 5,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "Date": "2016-01-25T20:22:00.000Z",
          "MessageTS": 1453753320000000,
          "sampleCnt": 5,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "Date": "2016-01-25T20:23:00.000Z",
          "MessageTS": 1453753380000000,
          "sampleCnt": 5,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "Date": "2016-01-25T20:24:00.000Z",
          "MessageTS": 1453753440000000,
          "sampleCnt": 5,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "Date": "2016-01-25T20:25:00.000Z",
          "MessageTS": 1453753500000000,
          "sampleCnt": 5,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "Date": "2016-01-25T20:26:00.000Z",
          "MessageTS": 1453753560000000,
          "sampleCnt": 5,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "Date": "2016-01-25T20:27:00.000Z",
          "MessageTS": 1453753620000000,
          "sampleCnt": 20,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "Date": "2016-01-25T20:28:00.000Z",
          "MessageTS": 1453753680000000,
          "sampleCnt": 20,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "Date": "2016-01-25T20:29:00.000Z",
          "MessageTS": 1453753740000000,
          "sampleCnt": 20,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "Date": "2016-01-25T20:30:00.000Z",
          "MessageTS": 1453753800000000,
          "sampleCnt": 20,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "Date": "2016-01-25T20:31:00.000Z",
          "MessageTS": 1453753860000000,
          "sampleCnt": 20,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "Date": "2016-01-25T20:32:00.000Z",
          "MessageTS": 1453753920000000,
          "sampleCnt": 20,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "Date": "2016-01-25T20:33:00.000Z",
          "MessageTS": 1453753980000000,
          "sampleCnt": 5,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "Date": "2016-01-25T20:34:00.000Z",
          "MessageTS": 1453754040000000,
          "sampleCnt": 5,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "Date": "2016-01-25T20:35:00.000Z",
          "MessageTS": 1453754100000000,
          "sampleCnt": 20,
          "reads": 0,
          "writes": 5,
          "reads_kbytes": 0,
          "writes_kbytes": 5343.4,
          "op_r_latency": 0,
          "op_w_latency": 374645.75
        },
        {
          "Date": "2016-01-25T20:36:00.000Z",
          "MessageTS": 1453754160000000,
          "sampleCnt": 20,
          "reads": 0,
          "writes": 20,
          "reads_kbytes": 0,
          "writes_kbytes": 24326,
          "op_r_latency": 0,
          "op_w_latency": 4652164.55
        },
        {
          "Date": "2016-01-25T20:37:00.000Z",
          "MessageTS": 1453754220000000,
          "sampleCnt": 20,
          "reads": 0,
          "writes": 19,
          "reads_kbytes": 0,
          "writes_kbytes": 23101.949999999997,
          "op_r_latency": 0,
          "op_w_latency": 3713.0999999999995
        },
        {
          "Date": "2016-01-25T20:38:00.000Z",
          "MessageTS": 1453754280000000,
          "sampleCnt": 18,
          "reads": 0,
          "writes": 20,
          "reads_kbytes": 0,
          "writes_kbytes": 24256,
          "op_r_latency": 0,
          "op_w_latency": 3698.277777777778
        },
        {
          "Date": "2016-01-25T20:39:00.000Z",
          "MessageTS": 1453754340000000,
          "sampleCnt": 5,
          "reads": 0,
          "writes": 80,
          "reads_kbytes": 0,
          "writes_kbytes": 104817.6,
          "op_r_latency": 0,
          "op_w_latency": 15474.400000000001
        },
        {
          "Date": "2016-01-25T20:40:00.000Z",
          "MessageTS": 1453754400000000,
          "sampleCnt": 18,
          "reads": 0,
          "writes": 22,
          "reads_kbytes": 0,
          "writes_kbytes": 24686.27777777778,
          "op_r_latency": 0,
          "op_w_latency": 3474.333333333333
        },
        {
          "Date": "2016-01-25T20:41:00.000Z",
          "MessageTS": 1453754460000000,
          "sampleCnt": 20,
          "reads": 0,
          "writes": 22,
          "reads_kbytes": 0,
          "writes_kbytes": 28821.100000000002,
          "op_r_latency": 0,
          "op_w_latency": 3942.6
        },
        {
          "Date": "2016-01-25T20:42:00.000Z",
          "MessageTS": 1453754520000000,
          "sampleCnt": 20,
          "reads": 0,
          "writes": 22,
          "reads_kbytes": 0,
          "writes_kbytes": 28740.4,
          "op_r_latency": 0,
          "op_w_latency": 4388
        },
        {
          "Date": "2016-01-25T20:43:00.000Z",
          "MessageTS": 1453754580000000,
          "sampleCnt": 4,
          "reads": 0,
          "writes": 24,
          "reads_kbytes": 0,
          "writes_kbytes": 21000,
          "op_r_latency": 0,
          "op_w_latency": 3760.5
        },
        {
          "Date": "2016-01-25T20:44:00.000Z",
          "MessageTS": 1453754640000000,
          "sampleCnt": 3,
          "reads": 67,
          "writes": 5,
          "reads_kbytes": 24655,
          "writes_kbytes": 391.3333333333333,
          "op_r_latency": 9407.333333333332,
          "op_w_latency": 14361.333333333334
        },
        {
          "Date": "2016-01-25T20:45:00.000Z",
          "MessageTS": 1453754700000000,
          "sampleCnt": 4,
          "reads": 62,
          "writes": 76,
          "reads_kbytes": 23367,
          "writes_kbytes": 49080,
          "op_r_latency": 5458,
          "op_w_latency": 6295.25
        },
        {
          "Date": "2016-01-25T20:46:00.000Z",
          "MessageTS": 1453754760000000,
          "sampleCnt": 1,
          "reads": 22,
          "writes": 17,
          "reads_kbytes": 7209,
          "writes_kbytes": 15393,
          "op_r_latency": 1644,
          "op_w_latency": 816
        }
      ]
    };



    return {
      clusterStatusMockData: clusterStatusMockData,
        clusterOSDStatusMockData: clusterOSDStatusMockData,
        clusterUsageMockData: clusterUsageMockData,
        clusterPoolSummaryMockData: clusterPoolSummaryMockData,
        flowSeriesForClusterOsdActivityMockData: flowSeriesForClusterOsdActivityMockData,
        flowSeriesForClusterRawActivityMockData: flowSeriesForClusterRawActivityMockData

    };
});
