/*
 * Copyright (c) 2015 Juniper Networks, Inc. All rights reserved.
 */

define(['underscore'], function (_) {
    
    this.poolsMockData = {
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
                "max_avail": 259411418001,
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
                "max_avail": 259411418001,
                "objects": 1059594,
                "kb_used": 2122855189
              }
            }
          ]
    };
    
    return {
        poolsMockData: poolsMockData,
    };
});
