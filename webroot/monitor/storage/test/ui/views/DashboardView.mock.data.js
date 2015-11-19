/*
 * Copyright (c) 2015 Juniper Networks, Inc. All rights reserved.
 */

define(['underscore'], function (_) {
    
    this.clusterStatusMockData = {
      "cluster_status": {
        "last_updated_time": "2015-10-28T22:50:51.356Z",
        "overall_status": "HEALTH_ERR",
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
        "start_time": "2015-10-28T20:35:45.000Z",
        "end_time": "2015-10-28T21:35:45.000Z",
        "timeGran_microsecs": 60000000,
        "average_interval": "60 Seconds",
        "sources": [
          "cmbu-vxa2100-proto3",
          "cmbu-vxa2010-17"
        ]
      },
      "flow-series": [
        {
          "Date": "2015-10-28T20:36:00.000Z",
          "MessageTS": 1446064560000000,
          "sampleCnt": 42,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "Date": "2015-10-28T20:37:00.000Z",
          "MessageTS": 1446064620000000,
          "sampleCnt": 39,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "Date": "2015-10-28T20:38:00.000Z",
          "MessageTS": 1446064680000000,
          "sampleCnt": 45,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "Date": "2015-10-28T20:39:00.000Z",
          "MessageTS": 1446064740000000,
          "sampleCnt": 38,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "Date": "2015-10-28T20:40:00.000Z",
          "MessageTS": 1446064800000000,
          "sampleCnt": 42,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "Date": "2015-10-28T20:41:00.000Z",
          "MessageTS": 1446064860000000,
          "sampleCnt": 46,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "Date": "2015-10-28T20:42:00.000Z",
          "MessageTS": 1446064920000000,
          "sampleCnt": 36,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "Date": "2015-10-28T20:43:00.000Z",
          "MessageTS": 1446064980000000,
          "sampleCnt": 44,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "Date": "2015-10-28T20:44:00.000Z",
          "MessageTS": 1446065040000000,
          "sampleCnt": 41,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "Date": "2015-10-28T20:45:00.000Z",
          "MessageTS": 1446065100000000,
          "sampleCnt": 41,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "Date": "2015-10-28T20:46:00.000Z",
          "MessageTS": 1446065160000000,
          "sampleCnt": 43,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "Date": "2015-10-28T20:47:00.000Z",
          "MessageTS": 1446065220000000,
          "sampleCnt": 41,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "Date": "2015-10-28T20:48:00.000Z",
          "MessageTS": 1446065280000000,
          "sampleCnt": 42,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "Date": "2015-10-28T20:49:00.000Z",
          "MessageTS": 1446065340000000,
          "sampleCnt": 36,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "Date": "2015-10-28T20:50:00.000Z",
          "MessageTS": 1446065400000000,
          "sampleCnt": 48,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "Date": "2015-10-28T20:51:00.000Z",
          "MessageTS": 1446065460000000,
          "sampleCnt": 38,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "Date": "2015-10-28T20:52:00.000Z",
          "MessageTS": 1446065520000000,
          "sampleCnt": 40,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "Date": "2015-10-28T20:53:00.000Z",
          "MessageTS": 1446065580000000,
          "sampleCnt": 48,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "Date": "2015-10-28T20:54:00.000Z",
          "MessageTS": 1446065640000000,
          "sampleCnt": 36,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "Date": "2015-10-28T20:55:00.000Z",
          "MessageTS": 1446065700000000,
          "sampleCnt": 42,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "Date": "2015-10-28T20:56:00.000Z",
          "MessageTS": 1446065760000000,
          "sampleCnt": 42,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "Date": "2015-10-28T20:57:00.000Z",
          "MessageTS": 1446065820000000,
          "sampleCnt": 42,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "Date": "2015-10-28T20:58:00.000Z",
          "MessageTS": 1446065880000000,
          "sampleCnt": 40,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "Date": "2015-10-28T20:59:00.000Z",
          "MessageTS": 1446065940000000,
          "sampleCnt": 44,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "Date": "2015-10-28T21:00:00.000Z",
          "MessageTS": 1446066000000000,
          "sampleCnt": 42,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "Date": "2015-10-28T21:01:00.000Z",
          "MessageTS": 1446066060000000,
          "sampleCnt": 36,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "Date": "2015-10-28T21:02:00.000Z",
          "MessageTS": 1446066120000000,
          "sampleCnt": 48,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "Date": "2015-10-28T21:03:00.000Z",
          "MessageTS": 1446066180000000,
          "sampleCnt": 38,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "Date": "2015-10-28T21:04:00.000Z",
          "MessageTS": 1446066240000000,
          "sampleCnt": 41,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "Date": "2015-10-28T21:05:00.000Z",
          "MessageTS": 1446066300000000,
          "sampleCnt": 47,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "Date": "2015-10-28T21:06:00.000Z",
          "MessageTS": 1446066360000000,
          "sampleCnt": 36,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "Date": "2015-10-28T21:07:00.000Z",
          "MessageTS": 1446066420000000,
          "sampleCnt": 43,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "Date": "2015-10-28T21:08:00.000Z",
          "MessageTS": 1446066480000000,
          "sampleCnt": 42,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "Date": "2015-10-28T21:09:00.000Z",
          "MessageTS": 1446066540000000,
          "sampleCnt": 41,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "Date": "2015-10-28T21:10:00.000Z",
          "MessageTS": 1446066600000000,
          "sampleCnt": 44,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "Date": "2015-10-28T21:11:00.000Z",
          "MessageTS": 1446066660000000,
          "sampleCnt": 40,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "Date": "2015-10-28T21:12:00.000Z",
          "MessageTS": 1446066720000000,
          "sampleCnt": 42,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "Date": "2015-10-28T21:13:00.000Z",
          "MessageTS": 1446066780000000,
          "sampleCnt": 42,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "Date": "2015-10-28T21:14:00.000Z",
          "MessageTS": 1446066840000000,
          "sampleCnt": 42,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "Date": "2015-10-28T21:15:00.000Z",
          "MessageTS": 1446066900000000,
          "sampleCnt": 36,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "Date": "2015-10-28T21:16:00.000Z",
          "MessageTS": 1446066960000000,
          "sampleCnt": 45,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "Date": "2015-10-28T21:17:00.000Z",
          "MessageTS": 1446067020000000,
          "sampleCnt": 40,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "Date": "2015-10-28T21:18:00.000Z",
          "MessageTS": 1446067080000000,
          "sampleCnt": 41,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "Date": "2015-10-28T21:19:00.000Z",
          "MessageTS": 1446067140000000,
          "sampleCnt": 47,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "Date": "2015-10-28T21:20:00.000Z",
          "MessageTS": 1446067200000000,
          "sampleCnt": 37,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "Date": "2015-10-28T21:21:00.000Z",
          "MessageTS": 1446067260000000,
          "sampleCnt": 42,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "Date": "2015-10-28T21:22:00.000Z",
          "MessageTS": 1446067320000000,
          "sampleCnt": 41,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "Date": "2015-10-28T21:23:00.000Z",
          "MessageTS": 1446067380000000,
          "sampleCnt": 43,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "Date": "2015-10-28T21:24:00.000Z",
          "MessageTS": 1446067440000000,
          "sampleCnt": 41,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "Date": "2015-10-28T21:25:00.000Z",
          "MessageTS": 1446067500000000,
          "sampleCnt": 43,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "Date": "2015-10-28T21:26:00.000Z",
          "MessageTS": 1446067560000000,
          "sampleCnt": 42,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "Date": "2015-10-28T21:27:00.000Z",
          "MessageTS": 1446067620000000,
          "sampleCnt": 36,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "Date": "2015-10-28T21:28:00.000Z",
          "MessageTS": 1446067680000000,
          "sampleCnt": 44,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "Date": "2015-10-28T21:29:00.000Z",
          "MessageTS": 1446067740000000,
          "sampleCnt": 40,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "Date": "2015-10-28T21:30:00.000Z",
          "MessageTS": 1446067800000000,
          "sampleCnt": 42,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "Date": "2015-10-28T21:31:00.000Z",
          "MessageTS": 1446067860000000,
          "sampleCnt": 41,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "Date": "2015-10-28T21:32:00.000Z",
          "MessageTS": 1446067920000000,
          "sampleCnt": 43,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "Date": "2015-10-28T21:33:00.000Z",
          "MessageTS": 1446067980000000,
          "sampleCnt": 42,
          "reads": 0,
          "writes": 0,
          "reads_kbytes": 0,
          "writes_kbytes": 0,
          "op_r_latency": 0,
          "op_w_latency": 0
        },
        {
          "Date": "2015-10-28T21:34:00.000Z",
          "MessageTS": 1446068040000000,
          "sampleCnt": 38,
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
      clusterStatusMockData: clusterStatusMockData,
        clusterOSDStatusMockData: clusterOSDStatusMockData,
        clusterUsageMockData: clusterUsageMockData,
        clusterPoolSummaryMockData: clusterPoolSummaryMockData,
        flowSeriesForClusterOsdActivityMockData: flowSeriesForClusterOsdActivityMockData

    };
});
