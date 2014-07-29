/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

function InfraStorageUtilsMockData() {
    var mockData = {
        'parseStorageNodesDashboardData': {
            input: {
                'test1': {
                    "topology": {
                        "hosts": [{
                            "osds": [{
                                "status": "up",
                                "name": "osd.15",
                                "exists": 1,
                                "type_id": 0,
                                "reweight": "1.000000",
                                "crush_weight": "0.819992",
                                "depth": 2,
                                "type": "osd",
                                "id": 15,
                                "kb": 877609036,
                                "kb_avail": 473767792,
                                "kb_used": 403841244,
                                "fs_perf_stat": {
                                    "apply_latency_ms": 19,
                                    "commit_latency_ms": 103
                                },
                                "heartbeat_back_addr": "40.1.0.3:6826/11350",
                                "heartbeat_front_addr": "40.1.0.3:6827/11350",
                                "public_addr": "40.1.0.3:6824/11350",
                                "cluster_addr": "40.1.0.3:6825/11350",
                                "uuid": "69c67c16-9b10-4c3f-8234-a12d9c9eac8f",
                                "down_at": 0,
                                "up_from": 83,
                                "lost_at": 0,
                                "up_thru": 129,
                                "cluster_status": "in",
                                "up": 1,
                                "in": 1,
                                "state": [
                                    "exists",
                                    "up"
                                ],
                                "last_clean_begin": 0,
                                "last_clean_end": 0,
                                "osd_xinfo": {
                                    "laggy_probability": "0.000000",
                                    "down_stamp": "0.000000",
                                    "osd": 15,
                                    "laggy_interval": 0
                                }
                            }, {
                                "status": "up",
                                "name": "osd.14",
                                "exists": 1,
                                "type_id": 0,
                                "reweight": "1.000000",
                                "crush_weight": "0.819992",
                                "depth": 2,
                                "type": "osd",
                                "id": 14,
                                "kb": 877609036,
                                "kb_avail": 466263716,
                                "kb_used": 411345320,
                                "fs_perf_stat": {
                                    "apply_latency_ms": 25,
                                    "commit_latency_ms": 104
                                },
                                "heartbeat_back_addr": "40.1.0.3:6834/1009741",
                                "heartbeat_front_addr": "40.1.0.3:6835/1009741",
                                "public_addr": "40.1.0.3:6820/9741",
                                "cluster_addr": "40.1.0.3:6807/1009741",
                                "uuid": "082b5425-c612-428f-a0a3-df476be88e72",
                                "down_at": 123,
                                "up_from": 126,
                                "lost_at": 0,
                                "up_thru": 129,
                                "cluster_status": "in",
                                "up": 1,
                                "in": 1,
                                "state": [
                                    "exists",
                                    "up"
                                ],
                                "last_clean_begin": 78,
                                "last_clean_end": 124,
                                "osd_xinfo": {
                                    "laggy_probability": "0.300000",
                                    "down_stamp": "2014-07-28 10:44:16.594251",
                                    "osd": 14,
                                    "laggy_interval": 0
                                }
                            }, {
                                "status": "up",
                                "name": "osd.13",
                                "exists": 1,
                                "type_id": 0,
                                "reweight": "1.000000",
                                "crush_weight": "0.819992",
                                "depth": 2,
                                "type": "osd",
                                "id": 13,
                                "kb": 877609036,
                                "kb_avail": 426412212,
                                "kb_used": 451196824,
                                "fs_perf_stat": {
                                    "apply_latency_ms": 22,
                                    "commit_latency_ms": 109
                                },
                                "heartbeat_back_addr": "40.1.0.3:6829/1008654",
                                "heartbeat_front_addr": "40.1.0.3:6830/1008654",
                                "public_addr": "40.1.0.3:6816/8654",
                                "cluster_addr": "40.1.0.3:6828/1008654",
                                "uuid": "20b1630b-29a9-4161-9e43-e5b25837b31b",
                                "down_at": 123,
                                "up_from": 125,
                                "lost_at": 0,
                                "up_thru": 129,
                                "cluster_status": "in",
                                "up": 1,
                                "in": 1,
                                "state": [
                                    "exists",
                                    "up"
                                ],
                                "last_clean_begin": 74,
                                "last_clean_end": 123,
                                "osd_xinfo": {
                                    "laggy_probability": "0.300000",
                                    "down_stamp": "2014-07-28 10:44:16.594251",
                                    "osd": 13,
                                    "laggy_interval": 0
                                }
                            }, {
                                "status": "up",
                                "name": "osd.12",
                                "exists": 1,
                                "type_id": 0,
                                "reweight": "1.000000",
                                "crush_weight": "0.819992",
                                "depth": 2,
                                "type": "osd",
                                "id": 12,
                                "kb": 877609036,
                                "kb_avail": 416730948,
                                "kb_used": 460878088,
                                "fs_perf_stat": {
                                    "apply_latency_ms": 25,
                                    "commit_latency_ms": 112
                                },
                                "heartbeat_back_addr": "40.1.0.3:6837/1007244",
                                "heartbeat_front_addr": "40.1.0.3:6838/1007244",
                                "public_addr": "40.1.0.3:6812/7244",
                                "cluster_addr": "40.1.0.3:6836/1007244",
                                "uuid": "12206d67-abb7-4520-a4a3-8a8867e2f7eb",
                                "down_at": 123,
                                "up_from": 126,
                                "lost_at": 0,
                                "up_thru": 129,
                                "cluster_status": "in",
                                "up": 1,
                                "in": 1,
                                "state": [
                                    "exists",
                                    "up"
                                ],
                                "last_clean_begin": 70,
                                "last_clean_end": 124,
                                "osd_xinfo": {
                                    "laggy_probability": "0.300000",
                                    "down_stamp": "2014-07-28 10:44:16.594251",
                                    "osd": 12,
                                    "laggy_interval": 0
                                }
                            }, {
                                "status": "up",
                                "name": "osd.11",
                                "exists": 1,
                                "type_id": 0,
                                "reweight": "1.000000",
                                "crush_weight": "0.819992",
                                "depth": 2,
                                "type": "osd",
                                "id": 11,
                                "kb": 877609036,
                                "kb_avail": 502387120,
                                "kb_used": 375221916,
                                "fs_perf_stat": {
                                    "apply_latency_ms": 23,
                                    "commit_latency_ms": 98
                                },
                                "heartbeat_back_addr": "40.1.0.3:6840/1006202",
                                "heartbeat_front_addr": "40.1.0.3:6841/1006202",
                                "public_addr": "40.1.0.3:6808/6202",
                                "cluster_addr": "40.1.0.3:6839/1006202",
                                "uuid": "c5f818a9-b4cf-4046-b6c1-5eb295cb34e7",
                                "down_at": 123,
                                "up_from": 127,
                                "lost_at": 0,
                                "up_thru": 129,
                                "cluster_status": "in",
                                "up": 1,
                                "in": 1,
                                "state": [
                                    "exists",
                                    "up"
                                ],
                                "last_clean_begin": 65,
                                "last_clean_end": 125,
                                "osd_xinfo": {
                                    "laggy_probability": "0.300000",
                                    "down_stamp": "2014-07-28 10:44:16.594251",
                                    "osd": 11,
                                    "laggy_interval": 1
                                }
                            }, {
                                "status": "up",
                                "name": "osd.10",
                                "exists": 1,
                                "type_id": 0,
                                "reweight": "1.000000",
                                "crush_weight": "0.819992",
                                "depth": 2,
                                "type": "osd",
                                "id": 10,
                                "kb": 877609036,
                                "kb_avail": 458594040,
                                "kb_used": 419014996,
                                "fs_perf_stat": {
                                    "apply_latency_ms": 4,
                                    "commit_latency_ms": 106
                                },
                                "heartbeat_back_addr": "40.1.0.3:6832/1004885",
                                "heartbeat_front_addr": "40.1.0.3:6833/1004885",
                                "public_addr": "40.1.0.3:6804/4885",
                                "cluster_addr": "40.1.0.3:6831/1004885",
                                "uuid": "410bf52e-7c89-4309-b708-aa352c7b2aac",
                                "down_at": 123,
                                "up_from": 125,
                                "lost_at": 0,
                                "up_thru": 129,
                                "cluster_status": "in",
                                "up": 1,
                                "in": 1,
                                "state": [
                                    "exists",
                                    "up"
                                ],
                                "last_clean_begin": 61,
                                "last_clean_end": 123,
                                "osd_xinfo": {
                                    "laggy_probability": "0.300000",
                                    "down_stamp": "2014-07-28 10:44:16.594251",
                                    "osd": 10,
                                    "laggy_interval": 0
                                }
                            }, {
                                "status": "up",
                                "name": "osd.9",
                                "exists": 1,
                                "type_id": 0,
                                "reweight": "1.000000",
                                "crush_weight": "0.819992",
                                "depth": 2,
                                "type": "osd",
                                "id": 9,
                                "kb": 877609036,
                                "kb_avail": 481903312,
                                "kb_used": 395705724,
                                "fs_perf_stat": {
                                    "apply_latency_ms": 24,
                                    "commit_latency_ms": 102
                                },
                                "heartbeat_back_addr": "40.1.0.3:6802/4049",
                                "heartbeat_front_addr": "40.1.0.3:6803/4049",
                                "public_addr": "40.1.0.3:6800/4049",
                                "cluster_addr": "40.1.0.3:6801/4049",
                                "uuid": "c72abfc9-e460-43b1-bc9a-a3080672fd0f",
                                "down_at": 0,
                                "up_from": 56,
                                "lost_at": 0,
                                "up_thru": 129,
                                "cluster_status": "in",
                                "up": 1,
                                "in": 1,
                                "state": [
                                    "exists",
                                    "up"
                                ],
                                "last_clean_begin": 0,
                                "last_clean_end": 0,
                                "osd_xinfo": {
                                    "laggy_probability": "0.000000",
                                    "down_stamp": "0.000000",
                                    "osd": 9,
                                    "laggy_interval": 0
                                }
                            }],
                            "type_id": 1,
                            "type": "host",
                            "id": -3,
                            "name": "cmbu-vxa2010-17",
                            "monitor": {
                                "name": "cmbu-vxa2010-17",
                                "rank": 1,
                                "addr": "40.1.0.3:6789/0",
                                "avail_percent": 94,
                                "kb_avail": 382765796,
                                "health": "HEALTH_OK",
                                "kb_total": 406284856,
                                "last_updated": "2014-07-28 16:30:51.339093",
                                "kb_used": 2874248,
                                "latency": "0.001322",
                                "act_health": "HEALTH_OK",
                                "skew": "-0.021141"
                            },
                            "kb_total": 406284856,
                            "kb_used": 2874248,
                            "avail_percent": 94,
                            "kb_avail": 382765796,
                            "build_info": "ceph version 0.67.5-1-g09ecfd2 (09ecfd2f2b650b0036e3e42c4b8756cede7f516b)",
                            "status": "up"
                        }, {
                            "osds": [{
                                "status": "up",
                                "name": "osd.8",
                                "exists": 1,
                                "type_id": 0,
                                "reweight": "1.000000",
                                "crush_weight": "0.129990",
                                "depth": 2,
                                "type": "osd",
                                "id": 8,
                                "kb": 142255632,
                                "kb_avail": 71314100,
                                "kb_used": 70941532,
                                "fs_perf_stat": {
                                    "apply_latency_ms": 17,
                                    "commit_latency_ms": 39
                                },
                                "heartbeat_back_addr": "40.1.0.2:6818/5277",
                                "heartbeat_front_addr": "40.1.0.2:6825/5277",
                                "public_addr": "40.1.0.2:6805/5277",
                                "cluster_addr": "40.1.0.2:6809/5277",
                                "uuid": "2215c6c5-efcb-4785-8f97-94647e88ad0c",
                                "down_at": 120,
                                "up_from": 121,
                                "lost_at": 0,
                                "up_thru": 127,
                                "cluster_status": "in",
                                "up": 1,
                                "in": 1,
                                "state": [
                                    "exists",
                                    "up"
                                ],
                                "last_clean_begin": 51,
                                "last_clean_end": 118,
                                "osd_xinfo": {
                                    "laggy_probability": "0.000000",
                                    "down_stamp": "2014-07-28 10:40:22.269822",
                                    "osd": 8,
                                    "laggy_interval": 0
                                }
                            }, {
                                "status": "up",
                                "name": "osd.7",
                                "exists": 1,
                                "type_id": 0,
                                "reweight": "1.000000",
                                "crush_weight": "0.129990",
                                "depth": 2,
                                "type": "osd",
                                "id": 7,
                                "kb": 142255632,
                                "kb_avail": 85417628,
                                "kb_used": 56838004,
                                "fs_perf_stat": {
                                    "apply_latency_ms": 18,
                                    "commit_latency_ms": 42
                                },
                                "heartbeat_back_addr": "40.1.0.2:6820/5279",
                                "heartbeat_front_addr": "40.1.0.2:6827/5279",
                                "public_addr": "40.1.0.2:6800/5279",
                                "cluster_addr": "40.1.0.2:6810/5279",
                                "uuid": "5499402c-3d65-4317-8d8e-cf8a80cb82fc",
                                "down_at": 119,
                                "up_from": 121,
                                "lost_at": 0,
                                "up_thru": 126,
                                "cluster_status": "in",
                                "up": 1,
                                "in": 1,
                                "state": [
                                    "exists",
                                    "up"
                                ],
                                "last_clean_begin": 44,
                                "last_clean_end": 118,
                                "osd_xinfo": {
                                    "laggy_probability": "0.000000",
                                    "down_stamp": "2014-07-28 10:40:05.453208",
                                    "osd": 7,
                                    "laggy_interval": 0
                                }
                            }, {
                                "status": "up",
                                "name": "osd.6",
                                "exists": 1,
                                "type_id": 0,
                                "reweight": "1.000000",
                                "crush_weight": "0.909988",
                                "depth": 2,
                                "type": "osd",
                                "id": 6,
                                "kb": 975236544,
                                "kb_avail": 376983444,
                                "kb_used": 598253100,
                                "fs_perf_stat": {
                                    "apply_latency_ms": 28,
                                    "commit_latency_ms": 69
                                },
                                "heartbeat_back_addr": "40.1.0.2:6838/1005276",
                                "heartbeat_front_addr": "40.1.0.2:6849/1005276",
                                "public_addr": "40.1.0.2:6808/5276",
                                "cluster_addr": "40.1.0.2:6836/1005276",
                                "uuid": "25c24f55-39b9-47f5-9b9b-d4db03eb2f4d",
                                "down_at": 123,
                                "up_from": 124,
                                "lost_at": 0,
                                "up_thru": 127,
                                "cluster_status": "in",
                                "up": 1,
                                "in": 1,
                                "state": [
                                    "exists",
                                    "up"
                                ],
                                "last_clean_begin": 121,
                                "last_clean_end": 123,
                                "osd_xinfo": {
                                    "laggy_probability": "0.300000",
                                    "down_stamp": "2014-07-28 10:44:16.594251",
                                    "osd": 6,
                                    "laggy_interval": 0
                                }
                            }, {
                                "status": "up",
                                "name": "osd.5",
                                "exists": 1,
                                "type_id": 0,
                                "reweight": "1.000000",
                                "crush_weight": "0.909988",
                                "depth": 2,
                                "type": "osd",
                                "id": 5,
                                "kb": 975236544,
                                "kb_avail": 525185584,
                                "kb_used": 450050960,
                                "fs_perf_stat": {
                                    "apply_latency_ms": 27,
                                    "commit_latency_ms": 63
                                },
                                "heartbeat_back_addr": "40.1.0.2:6850/1005275",
                                "heartbeat_front_addr": "40.1.0.2:6851/1005275",
                                "public_addr": "40.1.0.2:6802/5275",
                                "cluster_addr": "40.1.0.2:6831/1005275",
                                "uuid": "73f45808-4ea4-4255-99ac-f1ff2aa85da1",
                                "down_at": 123,
                                "up_from": 124,
                                "lost_at": 0,
                                "up_thru": 127,
                                "cluster_status": "in",
                                "up": 1,
                                "in": 1,
                                "state": [
                                    "exists",
                                    "up"
                                ],
                                "last_clean_begin": 121,
                                "last_clean_end": 123,
                                "osd_xinfo": {
                                    "laggy_probability": "0.300000",
                                    "down_stamp": "2014-07-28 10:44:16.594251",
                                    "osd": 5,
                                    "laggy_interval": 0
                                }
                            }, {
                                "status": "up",
                                "name": "osd.4",
                                "exists": 1,
                                "type_id": 0,
                                "reweight": "1.000000",
                                "crush_weight": "0.909988",
                                "depth": 2,
                                "type": "osd",
                                "id": 4,
                                "kb": 975236544,
                                "kb_avail": 491501812,
                                "kb_used": 483734732,
                                "fs_perf_stat": {
                                    "apply_latency_ms": 28,
                                    "commit_latency_ms": 63
                                },
                                "heartbeat_back_addr": "40.1.0.2:6816/1005278",
                                "heartbeat_front_addr": "40.1.0.2:6848/1005278",
                                "public_addr": "40.1.0.2:6804/5278",
                                "cluster_addr": "40.1.0.2:6837/1005278",
                                "uuid": "ca8b1d07-4e87-4019-896b-c86f5b7f7ce4",
                                "down_at": 123,
                                "up_from": 124,
                                "lost_at": 0,
                                "up_thru": 127,
                                "cluster_status": "in",
                                "up": 1,
                                "in": 1,
                                "state": [
                                    "exists",
                                    "up"
                                ],
                                "last_clean_begin": 121,
                                "last_clean_end": 123,
                                "osd_xinfo": {
                                    "laggy_probability": "0.300000",
                                    "down_stamp": "2014-07-28 10:44:16.594251",
                                    "osd": 4,
                                    "laggy_interval": 0
                                }
                            }, {
                                "status": "up",
                                "name": "osd.3",
                                "exists": 1,
                                "type_id": 0,
                                "reweight": "1.000000",
                                "crush_weight": "0.909988",
                                "depth": 2,
                                "type": "osd",
                                "id": 3,
                                "kb": 975236544,
                                "kb_avail": 392300464,
                                "kb_used": 582936080,
                                "fs_perf_stat": {
                                    "apply_latency_ms": 12,
                                    "commit_latency_ms": 68
                                },
                                "heartbeat_back_addr": "40.1.0.2:6841/1005274",
                                "heartbeat_front_addr": "40.1.0.2:6846/1005274",
                                "public_addr": "40.1.0.2:6806/5274",
                                "cluster_addr": "40.1.0.2:6840/1005274",
                                "uuid": "1f0a8cc0-a63f-4311-aad2-0576bb173096",
                                "down_at": 123,
                                "up_from": 124,
                                "lost_at": 0,
                                "up_thru": 127,
                                "cluster_status": "in",
                                "up": 1,
                                "in": 1,
                                "state": [
                                    "exists",
                                    "up"
                                ],
                                "last_clean_begin": 121,
                                "last_clean_end": 123,
                                "osd_xinfo": {
                                    "laggy_probability": "0.300000",
                                    "down_stamp": "2014-07-28 10:44:16.594251",
                                    "osd": 3,
                                    "laggy_interval": 0
                                }
                            }, {
                                "status": "up",
                                "name": "osd.2",
                                "exists": 1,
                                "type_id": 0,
                                "reweight": "1.000000",
                                "crush_weight": "0.449997",
                                "depth": 2,
                                "type": "osd",
                                "id": 2,
                                "kb": 487099008,
                                "kb_avail": 270222852,
                                "kb_used": 216876156,
                                "fs_perf_stat": {
                                    "apply_latency_ms": 35,
                                    "commit_latency_ms": 60
                                },
                                "heartbeat_back_addr": "40.1.0.2:6853/1005271",
                                "heartbeat_front_addr": "40.1.0.2:6854/1005271",
                                "public_addr": "40.1.0.2:6803/5271",
                                "cluster_addr": "40.1.0.2:6852/1005271",
                                "uuid": "d9ea0677-6b16-4e34-ac19-697e026ec198",
                                "down_at": 123,
                                "up_from": 129,
                                "lost_at": 0,
                                "up_thru": 129,
                                "cluster_status": "in",
                                "up": 1,
                                "in": 1,
                                "state": [
                                    "exists",
                                    "up"
                                ],
                                "last_clean_begin": 121,
                                "last_clean_end": 127,
                                "osd_xinfo": {
                                    "laggy_probability": "0.300000",
                                    "down_stamp": "2014-07-28 10:44:16.594251",
                                    "osd": 2,
                                    "laggy_interval": 1
                                }
                            }, {
                                "status": "up",
                                "name": "osd.1",
                                "exists": 1,
                                "type_id": 0,
                                "reweight": "1.000000",
                                "crush_weight": "0.449997",
                                "depth": 2,
                                "type": "osd",
                                "id": 1,
                                "kb": 487099008,
                                "kb_avail": 268407120,
                                "kb_used": 218691888,
                                "fs_perf_stat": {
                                    "apply_latency_ms": 28,
                                    "commit_latency_ms": 59
                                },
                                "heartbeat_back_addr": "40.1.0.2:6842/1005270",
                                "heartbeat_front_addr": "40.1.0.2:6845/1005270",
                                "public_addr": "40.1.0.2:6807/5270",
                                "cluster_addr": "40.1.0.2:6839/1005270",
                                "uuid": "33d37596-baca-433a-8609-4f9145c5e472",
                                "down_at": 123,
                                "up_from": 124,
                                "lost_at": 0,
                                "up_thru": 127,
                                "cluster_status": "in",
                                "up": 1,
                                "in": 1,
                                "state": [
                                    "exists",
                                    "up"
                                ],
                                "last_clean_begin": 121,
                                "last_clean_end": 123,
                                "osd_xinfo": {
                                    "laggy_probability": "0.300000",
                                    "down_stamp": "2014-07-28 10:44:16.594251",
                                    "osd": 1,
                                    "laggy_interval": 0
                                }
                            }, {
                                "status": "up",
                                "name": "osd.0",
                                "exists": 1,
                                "type_id": 0,
                                "reweight": "1.000000",
                                "crush_weight": "0.449997",
                                "depth": 2,
                                "type": "osd",
                                "id": 0,
                                "kb": 487099008,
                                "kb_avail": 248147572,
                                "kb_used": 238951436,
                                "fs_perf_stat": {
                                    "apply_latency_ms": 14,
                                    "commit_latency_ms": 60
                                },
                                "heartbeat_back_addr": "40.1.0.2:6844/1005272",
                                "heartbeat_front_addr": "40.1.0.2:6847/1005272",
                                "public_addr": "40.1.0.2:6801/5272",
                                "cluster_addr": "40.1.0.2:6843/1005272",
                                "uuid": "b7591280-cd3d-4b79-9d47-21662c45e001",
                                "down_at": 123,
                                "up_from": 124,
                                "lost_at": 0,
                                "up_thru": 127,
                                "cluster_status": "in",
                                "up": 1,
                                "in": 1,
                                "state": [
                                    "exists",
                                    "up"
                                ],
                                "last_clean_begin": 121,
                                "last_clean_end": 123,
                                "osd_xinfo": {
                                    "laggy_probability": "0.300000",
                                    "down_stamp": "2014-07-28 10:44:16.594251",
                                    "osd": 0,
                                    "laggy_interval": 0
                                }
                            }],
                            "type_id": 1,
                            "type": "host",
                            "id": -2,
                            "name": "cmbu-vxa2100-proto3",
                            "monitor": {
                                "name": "cmbu-vxa2100-proto3",
                                "rank": 0,
                                "addr": "40.1.0.2:6789/0",
                                "avail_percent": 92,
                                "kb_avail": 306973708,
                                "health": "HEALTH_OK",
                                "kb_total": 331973040,
                                "last_updated": "2014-07-28 16:31:16.607725",
                                "kb_used": 8129344,
                                "latency": "0.000000",
                                "act_health": "HEALTH_OK",
                                "skew": "0.000000"
                            },
                            "kb_total": 331973040,
                            "kb_used": 8129344,
                            "avail_percent": 92,
                            "kb_avail": 306973708,
                            "build_info": "ceph version 0.67.5-1-g09ecfd2 (09ecfd2f2b650b0036e3e42c4b8756cede7f516b)",
                            "status": "up"
                        }],
                        "type_id": 6,
                        "type": "root",
                        "id": -1,
                        "name": "default",
                        "total_node": 2,
                        "total_up_node": 2,
                        "total_down_node": 0
                    }
                },
                'test2': {},
                'test3': {}
            },
            output: {
                'test1': [{
                    "x": 94,
                    "y": 387.46,
                    "available_perc": "94.00",
                    "total": "387.46 GB",
                    "size": 1.4999999999999996,
                    "shape": "circle",
                    "type": "storageNode",
                    "display_type": "Storage Node",
                    "name": "cmbu-vxa2010-17",
                    "isPartialUveMissing": false,
                    "osds": [{
                        "status": "up",
                        "name": "osd.15",
                        "exists": 1,
                        "type_id": 0,
                        "reweight": "1.000000",
                        "crush_weight": "0.819992",
                        "depth": 2,
                        "type": "osd",
                        "id": 15,
                        "kb": 877609036,
                        "kb_avail": 473767792,
                        "kb_used": 403841244,
                        "fs_perf_stat": {
                            "apply_latency_ms": 19,
                            "commit_latency_ms": 103
                        },
                        "heartbeat_back_addr": "40.1.0.3:6826/11350",
                        "heartbeat_front_addr": "40.1.0.3:6827/11350",
                        "public_addr": "40.1.0.3:6824/11350",
                        "cluster_addr": "40.1.0.3:6825/11350",
                        "uuid": "69c67c16-9b10-4c3f-8234-a12d9c9eac8f",
                        "down_at": 0,
                        "up_from": 83,
                        "lost_at": 0,
                        "up_thru": 129,
                        "cluster_status": "in",
                        "up": 1,
                        "in": 1,
                        "state": [
                            "exists",
                            "up"
                        ],
                        "last_clean_begin": 0,
                        "last_clean_end": 0,
                        "osd_xinfo": {
                            "laggy_probability": "0.000000",
                            "down_stamp": "0.000000",
                            "osd": 15,
                            "laggy_interval": 0
                        }
                    }, {
                        "status": "up",
                        "name": "osd.14",
                        "exists": 1,
                        "type_id": 0,
                        "reweight": "1.000000",
                        "crush_weight": "0.819992",
                        "depth": 2,
                        "type": "osd",
                        "id": 14,
                        "kb": 877609036,
                        "kb_avail": 466263716,
                        "kb_used": 411345320,
                        "fs_perf_stat": {
                            "apply_latency_ms": 25,
                            "commit_latency_ms": 104
                        },
                        "heartbeat_back_addr": "40.1.0.3:6834/1009741",
                        "heartbeat_front_addr": "40.1.0.3:6835/1009741",
                        "public_addr": "40.1.0.3:6820/9741",
                        "cluster_addr": "40.1.0.3:6807/1009741",
                        "uuid": "082b5425-c612-428f-a0a3-df476be88e72",
                        "down_at": 123,
                        "up_from": 126,
                        "lost_at": 0,
                        "up_thru": 129,
                        "cluster_status": "in",
                        "up": 1,
                        "in": 1,
                        "state": [
                            "exists",
                            "up"
                        ],
                        "last_clean_begin": 78,
                        "last_clean_end": 124,
                        "osd_xinfo": {
                            "laggy_probability": "0.300000",
                            "down_stamp": "2014-07-28 10:44:16.594251",
                            "osd": 14,
                            "laggy_interval": 0
                        }
                    }, {
                        "status": "up",
                        "name": "osd.13",
                        "exists": 1,
                        "type_id": 0,
                        "reweight": "1.000000",
                        "crush_weight": "0.819992",
                        "depth": 2,
                        "type": "osd",
                        "id": 13,
                        "kb": 877609036,
                        "kb_avail": 426412212,
                        "kb_used": 451196824,
                        "fs_perf_stat": {
                            "apply_latency_ms": 22,
                            "commit_latency_ms": 109
                        },
                        "heartbeat_back_addr": "40.1.0.3:6829/1008654",
                        "heartbeat_front_addr": "40.1.0.3:6830/1008654",
                        "public_addr": "40.1.0.3:6816/8654",
                        "cluster_addr": "40.1.0.3:6828/1008654",
                        "uuid": "20b1630b-29a9-4161-9e43-e5b25837b31b",
                        "down_at": 123,
                        "up_from": 125,
                        "lost_at": 0,
                        "up_thru": 129,
                        "cluster_status": "in",
                        "up": 1,
                        "in": 1,
                        "state": [
                            "exists",
                            "up"
                        ],
                        "last_clean_begin": 74,
                        "last_clean_end": 123,
                        "osd_xinfo": {
                            "laggy_probability": "0.300000",
                            "down_stamp": "2014-07-28 10:44:16.594251",
                            "osd": 13,
                            "laggy_interval": 0
                        }
                    }, {
                        "status": "up",
                        "name": "osd.12",
                        "exists": 1,
                        "type_id": 0,
                        "reweight": "1.000000",
                        "crush_weight": "0.819992",
                        "depth": 2,
                        "type": "osd",
                        "id": 12,
                        "kb": 877609036,
                        "kb_avail": 416730948,
                        "kb_used": 460878088,
                        "fs_perf_stat": {
                            "apply_latency_ms": 25,
                            "commit_latency_ms": 112
                        },
                        "heartbeat_back_addr": "40.1.0.3:6837/1007244",
                        "heartbeat_front_addr": "40.1.0.3:6838/1007244",
                        "public_addr": "40.1.0.3:6812/7244",
                        "cluster_addr": "40.1.0.3:6836/1007244",
                        "uuid": "12206d67-abb7-4520-a4a3-8a8867e2f7eb",
                        "down_at": 123,
                        "up_from": 126,
                        "lost_at": 0,
                        "up_thru": 129,
                        "cluster_status": "in",
                        "up": 1,
                        "in": 1,
                        "state": [
                            "exists",
                            "up"
                        ],
                        "last_clean_begin": 70,
                        "last_clean_end": 124,
                        "osd_xinfo": {
                            "laggy_probability": "0.300000",
                            "down_stamp": "2014-07-28 10:44:16.594251",
                            "osd": 12,
                            "laggy_interval": 0
                        }
                    }, {
                        "status": "up",
                        "name": "osd.11",
                        "exists": 1,
                        "type_id": 0,
                        "reweight": "1.000000",
                        "crush_weight": "0.819992",
                        "depth": 2,
                        "type": "osd",
                        "id": 11,
                        "kb": 877609036,
                        "kb_avail": 502387120,
                        "kb_used": 375221916,
                        "fs_perf_stat": {
                            "apply_latency_ms": 23,
                            "commit_latency_ms": 98
                        },
                        "heartbeat_back_addr": "40.1.0.3:6840/1006202",
                        "heartbeat_front_addr": "40.1.0.3:6841/1006202",
                        "public_addr": "40.1.0.3:6808/6202",
                        "cluster_addr": "40.1.0.3:6839/1006202",
                        "uuid": "c5f818a9-b4cf-4046-b6c1-5eb295cb34e7",
                        "down_at": 123,
                        "up_from": 127,
                        "lost_at": 0,
                        "up_thru": 129,
                        "cluster_status": "in",
                        "up": 1,
                        "in": 1,
                        "state": [
                            "exists",
                            "up"
                        ],
                        "last_clean_begin": 65,
                        "last_clean_end": 125,
                        "osd_xinfo": {
                            "laggy_probability": "0.300000",
                            "down_stamp": "2014-07-28 10:44:16.594251",
                            "osd": 11,
                            "laggy_interval": 1
                        }
                    }, {
                        "status": "up",
                        "name": "osd.10",
                        "exists": 1,
                        "type_id": 0,
                        "reweight": "1.000000",
                        "crush_weight": "0.819992",
                        "depth": 2,
                        "type": "osd",
                        "id": 10,
                        "kb": 877609036,
                        "kb_avail": 458594040,
                        "kb_used": 419014996,
                        "fs_perf_stat": {
                            "apply_latency_ms": 4,
                            "commit_latency_ms": 106
                        },
                        "heartbeat_back_addr": "40.1.0.3:6832/1004885",
                        "heartbeat_front_addr": "40.1.0.3:6833/1004885",
                        "public_addr": "40.1.0.3:6804/4885",
                        "cluster_addr": "40.1.0.3:6831/1004885",
                        "uuid": "410bf52e-7c89-4309-b708-aa352c7b2aac",
                        "down_at": 123,
                        "up_from": 125,
                        "lost_at": 0,
                        "up_thru": 129,
                        "cluster_status": "in",
                        "up": 1,
                        "in": 1,
                        "state": [
                            "exists",
                            "up"
                        ],
                        "last_clean_begin": 61,
                        "last_clean_end": 123,
                        "osd_xinfo": {
                            "laggy_probability": "0.300000",
                            "down_stamp": "2014-07-28 10:44:16.594251",
                            "osd": 10,
                            "laggy_interval": 0
                        }
                    }, {
                        "status": "up",
                        "name": "osd.9",
                        "exists": 1,
                        "type_id": 0,
                        "reweight": "1.000000",
                        "crush_weight": "0.819992",
                        "depth": 2,
                        "type": "osd",
                        "id": 9,
                        "kb": 877609036,
                        "kb_avail": 481903312,
                        "kb_used": 395705724,
                        "fs_perf_stat": {
                            "apply_latency_ms": 24,
                            "commit_latency_ms": 102
                        },
                        "heartbeat_back_addr": "40.1.0.3:6802/4049",
                        "heartbeat_front_addr": "40.1.0.3:6803/4049",
                        "public_addr": "40.1.0.3:6800/4049",
                        "cluster_addr": "40.1.0.3:6801/4049",
                        "uuid": "c72abfc9-e460-43b1-bc9a-a3080672fd0f",
                        "down_at": 0,
                        "up_from": 56,
                        "lost_at": 0,
                        "up_thru": 129,
                        "cluster_status": "in",
                        "up": 1,
                        "in": 1,
                        "state": [
                            "exists",
                            "up"
                        ],
                        "last_clean_begin": 0,
                        "last_clean_end": 0,
                        "osd_xinfo": {
                            "laggy_probability": "0.000000",
                            "down_stamp": "0.000000",
                            "osd": 9,
                            "laggy_interval": 0
                        }
                    }],
                    "osds_total": "5.72 TB",
                    "osds_used": "2.72 TB",
                    "monitor": {
                        "name": "cmbu-vxa2010-17",
                        "rank": 1,
                        "addr": "40.1.0.3:6789/0",
                        "avail_percent": 94,
                        "kb_avail": 382765796,
                        "health": "HEALTH_OK",
                        "kb_total": 406284856,
                        "last_updated": "2014-07-28 16:30:51.339093",
                        "kb_used": 2874248,
                        "latency": "0.001322",
                        "act_health": "HEALTH_OK",
                        "skew": "-0.021141"
                    },
                    "status": "up",
                    "color": "#7892dd",
                    "downNodeCnt": 0,
                    "isDiskOut": false,
                    "isDiskDown": false,
                    "nodeAlerts": [],
                    "alerts": [],
                    "processAlerts": [],
                    "version": "Ceph 0.67.5-1-g09ecfd2",
                    "id": "id_0",
                    "multiTooltip": true,
                    "diskCnt": 7
                }, {
                    "x": 92,
                    "y": 316.59,
                    "available_perc": "92.00",
                    "total": "316.59 GB",
                    "size": 1.4999999999999996,
                    "shape": "circle",
                    "type": "storageNode",
                    "display_type": "Storage Node",
                    "name": "cmbu-vxa2100-proto3",
                    "isPartialUveMissing": false,
                    "osds": [{
                        "status": "up",
                        "name": "osd.8",
                        "exists": 1,
                        "type_id": 0,
                        "reweight": "1.000000",
                        "crush_weight": "0.129990",
                        "depth": 2,
                        "type": "osd",
                        "id": 8,
                        "kb": 142255632,
                        "kb_avail": 71314100,
                        "kb_used": 70941532,
                        "fs_perf_stat": {
                            "apply_latency_ms": 17,
                            "commit_latency_ms": 39
                        },
                        "heartbeat_back_addr": "40.1.0.2:6818/5277",
                        "heartbeat_front_addr": "40.1.0.2:6825/5277",
                        "public_addr": "40.1.0.2:6805/5277",
                        "cluster_addr": "40.1.0.2:6809/5277",
                        "uuid": "2215c6c5-efcb-4785-8f97-94647e88ad0c",
                        "down_at": 120,
                        "up_from": 121,
                        "lost_at": 0,
                        "up_thru": 127,
                        "cluster_status": "in",
                        "up": 1,
                        "in": 1,
                        "state": [
                            "exists",
                            "up"
                        ],
                        "last_clean_begin": 51,
                        "last_clean_end": 118,
                        "osd_xinfo": {
                            "laggy_probability": "0.000000",
                            "down_stamp": "2014-07-28 10:40:22.269822",
                            "osd": 8,
                            "laggy_interval": 0
                        }
                    }, {
                        "status": "up",
                        "name": "osd.7",
                        "exists": 1,
                        "type_id": 0,
                        "reweight": "1.000000",
                        "crush_weight": "0.129990",
                        "depth": 2,
                        "type": "osd",
                        "id": 7,
                        "kb": 142255632,
                        "kb_avail": 85417628,
                        "kb_used": 56838004,
                        "fs_perf_stat": {
                            "apply_latency_ms": 18,
                            "commit_latency_ms": 42
                        },
                        "heartbeat_back_addr": "40.1.0.2:6820/5279",
                        "heartbeat_front_addr": "40.1.0.2:6827/5279",
                        "public_addr": "40.1.0.2:6800/5279",
                        "cluster_addr": "40.1.0.2:6810/5279",
                        "uuid": "5499402c-3d65-4317-8d8e-cf8a80cb82fc",
                        "down_at": 119,
                        "up_from": 121,
                        "lost_at": 0,
                        "up_thru": 126,
                        "cluster_status": "in",
                        "up": 1,
                        "in": 1,
                        "state": [
                            "exists",
                            "up"
                        ],
                        "last_clean_begin": 44,
                        "last_clean_end": 118,
                        "osd_xinfo": {
                            "laggy_probability": "0.000000",
                            "down_stamp": "2014-07-28 10:40:05.453208",
                            "osd": 7,
                            "laggy_interval": 0
                        }
                    }, {
                        "status": "up",
                        "name": "osd.6",
                        "exists": 1,
                        "type_id": 0,
                        "reweight": "1.000000",
                        "crush_weight": "0.909988",
                        "depth": 2,
                        "type": "osd",
                        "id": 6,
                        "kb": 975236544,
                        "kb_avail": 376983444,
                        "kb_used": 598253100,
                        "fs_perf_stat": {
                            "apply_latency_ms": 28,
                            "commit_latency_ms": 69
                        },
                        "heartbeat_back_addr": "40.1.0.2:6838/1005276",
                        "heartbeat_front_addr": "40.1.0.2:6849/1005276",
                        "public_addr": "40.1.0.2:6808/5276",
                        "cluster_addr": "40.1.0.2:6836/1005276",
                        "uuid": "25c24f55-39b9-47f5-9b9b-d4db03eb2f4d",
                        "down_at": 123,
                        "up_from": 124,
                        "lost_at": 0,
                        "up_thru": 127,
                        "cluster_status": "in",
                        "up": 1,
                        "in": 1,
                        "state": [
                            "exists",
                            "up"
                        ],
                        "last_clean_begin": 121,
                        "last_clean_end": 123,
                        "osd_xinfo": {
                            "laggy_probability": "0.300000",
                            "down_stamp": "2014-07-28 10:44:16.594251",
                            "osd": 6,
                            "laggy_interval": 0
                        }
                    }, {
                        "status": "up",
                        "name": "osd.5",
                        "exists": 1,
                        "type_id": 0,
                        "reweight": "1.000000",
                        "crush_weight": "0.909988",
                        "depth": 2,
                        "type": "osd",
                        "id": 5,
                        "kb": 975236544,
                        "kb_avail": 525185584,
                        "kb_used": 450050960,
                        "fs_perf_stat": {
                            "apply_latency_ms": 27,
                            "commit_latency_ms": 63
                        },
                        "heartbeat_back_addr": "40.1.0.2:6850/1005275",
                        "heartbeat_front_addr": "40.1.0.2:6851/1005275",
                        "public_addr": "40.1.0.2:6802/5275",
                        "cluster_addr": "40.1.0.2:6831/1005275",
                        "uuid": "73f45808-4ea4-4255-99ac-f1ff2aa85da1",
                        "down_at": 123,
                        "up_from": 124,
                        "lost_at": 0,
                        "up_thru": 127,
                        "cluster_status": "in",
                        "up": 1,
                        "in": 1,
                        "state": [
                            "exists",
                            "up"
                        ],
                        "last_clean_begin": 121,
                        "last_clean_end": 123,
                        "osd_xinfo": {
                            "laggy_probability": "0.300000",
                            "down_stamp": "2014-07-28 10:44:16.594251",
                            "osd": 5,
                            "laggy_interval": 0
                        }
                    }, {
                        "status": "up",
                        "name": "osd.4",
                        "exists": 1,
                        "type_id": 0,
                        "reweight": "1.000000",
                        "crush_weight": "0.909988",
                        "depth": 2,
                        "type": "osd",
                        "id": 4,
                        "kb": 975236544,
                        "kb_avail": 491501812,
                        "kb_used": 483734732,
                        "fs_perf_stat": {
                            "apply_latency_ms": 28,
                            "commit_latency_ms": 63
                        },
                        "heartbeat_back_addr": "40.1.0.2:6816/1005278",
                        "heartbeat_front_addr": "40.1.0.2:6848/1005278",
                        "public_addr": "40.1.0.2:6804/5278",
                        "cluster_addr": "40.1.0.2:6837/1005278",
                        "uuid": "ca8b1d07-4e87-4019-896b-c86f5b7f7ce4",
                        "down_at": 123,
                        "up_from": 124,
                        "lost_at": 0,
                        "up_thru": 127,
                        "cluster_status": "in",
                        "up": 1,
                        "in": 1,
                        "state": [
                            "exists",
                            "up"
                        ],
                        "last_clean_begin": 121,
                        "last_clean_end": 123,
                        "osd_xinfo": {
                            "laggy_probability": "0.300000",
                            "down_stamp": "2014-07-28 10:44:16.594251",
                            "osd": 4,
                            "laggy_interval": 0
                        }
                    }, {
                        "status": "up",
                        "name": "osd.3",
                        "exists": 1,
                        "type_id": 0,
                        "reweight": "1.000000",
                        "crush_weight": "0.909988",
                        "depth": 2,
                        "type": "osd",
                        "id": 3,
                        "kb": 975236544,
                        "kb_avail": 392300464,
                        "kb_used": 582936080,
                        "fs_perf_stat": {
                            "apply_latency_ms": 12,
                            "commit_latency_ms": 68
                        },
                        "heartbeat_back_addr": "40.1.0.2:6841/1005274",
                        "heartbeat_front_addr": "40.1.0.2:6846/1005274",
                        "public_addr": "40.1.0.2:6806/5274",
                        "cluster_addr": "40.1.0.2:6840/1005274",
                        "uuid": "1f0a8cc0-a63f-4311-aad2-0576bb173096",
                        "down_at": 123,
                        "up_from": 124,
                        "lost_at": 0,
                        "up_thru": 127,
                        "cluster_status": "in",
                        "up": 1,
                        "in": 1,
                        "state": [
                            "exists",
                            "up"
                        ],
                        "last_clean_begin": 121,
                        "last_clean_end": 123,
                        "osd_xinfo": {
                            "laggy_probability": "0.300000",
                            "down_stamp": "2014-07-28 10:44:16.594251",
                            "osd": 3,
                            "laggy_interval": 0
                        }
                    }, {
                        "status": "up",
                        "name": "osd.2",
                        "exists": 1,
                        "type_id": 0,
                        "reweight": "1.000000",
                        "crush_weight": "0.449997",
                        "depth": 2,
                        "type": "osd",
                        "id": 2,
                        "kb": 487099008,
                        "kb_avail": 270222852,
                        "kb_used": 216876156,
                        "fs_perf_stat": {
                            "apply_latency_ms": 35,
                            "commit_latency_ms": 60
                        },
                        "heartbeat_back_addr": "40.1.0.2:6853/1005271",
                        "heartbeat_front_addr": "40.1.0.2:6854/1005271",
                        "public_addr": "40.1.0.2:6803/5271",
                        "cluster_addr": "40.1.0.2:6852/1005271",
                        "uuid": "d9ea0677-6b16-4e34-ac19-697e026ec198",
                        "down_at": 123,
                        "up_from": 129,
                        "lost_at": 0,
                        "up_thru": 129,
                        "cluster_status": "in",
                        "up": 1,
                        "in": 1,
                        "state": [
                            "exists",
                            "up"
                        ],
                        "last_clean_begin": 121,
                        "last_clean_end": 127,
                        "osd_xinfo": {
                            "laggy_probability": "0.300000",
                            "down_stamp": "2014-07-28 10:44:16.594251",
                            "osd": 2,
                            "laggy_interval": 1
                        }
                    }, {
                        "status": "up",
                        "name": "osd.1",
                        "exists": 1,
                        "type_id": 0,
                        "reweight": "1.000000",
                        "crush_weight": "0.449997",
                        "depth": 2,
                        "type": "osd",
                        "id": 1,
                        "kb": 487099008,
                        "kb_avail": 268407120,
                        "kb_used": 218691888,
                        "fs_perf_stat": {
                            "apply_latency_ms": 28,
                            "commit_latency_ms": 59
                        },
                        "heartbeat_back_addr": "40.1.0.2:6842/1005270",
                        "heartbeat_front_addr": "40.1.0.2:6845/1005270",
                        "public_addr": "40.1.0.2:6807/5270",
                        "cluster_addr": "40.1.0.2:6839/1005270",
                        "uuid": "33d37596-baca-433a-8609-4f9145c5e472",
                        "down_at": 123,
                        "up_from": 124,
                        "lost_at": 0,
                        "up_thru": 127,
                        "cluster_status": "in",
                        "up": 1,
                        "in": 1,
                        "state": [
                            "exists",
                            "up"
                        ],
                        "last_clean_begin": 121,
                        "last_clean_end": 123,
                        "osd_xinfo": {
                            "laggy_probability": "0.300000",
                            "down_stamp": "2014-07-28 10:44:16.594251",
                            "osd": 1,
                            "laggy_interval": 0
                        }
                    }, {
                        "status": "up",
                        "name": "osd.0",
                        "exists": 1,
                        "type_id": 0,
                        "reweight": "1.000000",
                        "crush_weight": "0.449997",
                        "depth": 2,
                        "type": "osd",
                        "id": 0,
                        "kb": 487099008,
                        "kb_avail": 248147572,
                        "kb_used": 238951436,
                        "fs_perf_stat": {
                            "apply_latency_ms": 14,
                            "commit_latency_ms": 60
                        },
                        "heartbeat_back_addr": "40.1.0.2:6844/1005272",
                        "heartbeat_front_addr": "40.1.0.2:6847/1005272",
                        "public_addr": "40.1.0.2:6801/5272",
                        "cluster_addr": "40.1.0.2:6843/1005272",
                        "uuid": "b7591280-cd3d-4b79-9d47-21662c45e001",
                        "down_at": 123,
                        "up_from": 124,
                        "lost_at": 0,
                        "up_thru": 127,
                        "cluster_status": "in",
                        "up": 1,
                        "in": 1,
                        "state": [
                            "exists",
                            "up"
                        ],
                        "last_clean_begin": 121,
                        "last_clean_end": 123,
                        "osd_xinfo": {
                            "laggy_probability": "0.300000",
                            "down_stamp": "2014-07-28 10:44:16.594251",
                            "osd": 0,
                            "laggy_interval": 0
                        }
                    }],
                    "osds_total": "5.26 TB",
                    "osds_used": "2.72 TB",
                    "monitor": {
                        "name": "cmbu-vxa2100-proto3",
                        "rank": 0,
                        "addr": "40.1.0.2:6789/0",
                        "avail_percent": 92,
                        "kb_avail": 306973708,
                        "health": "HEALTH_OK",
                        "kb_total": 331973040,
                        "last_updated": "2014-07-28 16:31:16.607725",
                        "kb_used": 8129344,
                        "latency": "0.000000",
                        "act_health": "HEALTH_OK",
                        "skew": "0.000000"
                    },
                    "status": "up",
                    "color": "#7892dd",
                    "downNodeCnt": 0,
                    "isDiskOut": false,
                    "isDiskDown": false,
                    "nodeAlerts": [],
                    "alerts": [],
                    "processAlerts": [],
                    "version": "Ceph 0.67.5-1-g09ecfd2",
                    "id": "id_1",
                    "multiTooltip": true,
                    "diskCnt": 9
                }],
                'test2': [],
                'test3': []
            }
        }
    };
    this.getInput = function(obj) {
        if (obj['fnName'] != null && mockData[obj['fnName']] != null && mockData[obj['fnName']]['input'][obj['type']] != null)
            return mockData[obj['fnName']]['input'][obj['type']];
        else
            return null;
    }
    this.getOutput = function(obj) {
        if (obj['fnName'] != null && mockData[obj['fnName']] != null && mockData[obj['fnName']]['output'][obj['type']] != null)
            return mockData[obj['fnName']]['output'][obj['type']];
        else
            return null;
    }
}
var infraStorageUtilsMockData = new InfraStorageUtilsMockData();