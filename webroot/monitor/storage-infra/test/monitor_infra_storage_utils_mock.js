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
                                "name": "osd.3",
                                "exists": 1,
                                "type_id": 0,
                                "reweight": "1.000000",
                                "crush_weight": "0.819992",
                                "depth": 2,
                                "type": "osd",
                                "id": 3,
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
                                    "osd": 3,
                                    "laggy_interval": 0
                                }
                            }, {
                                "status": "up",
                                "name": "osd.2",
                                "exists": 1,
                                "type_id": 0,
                                "reweight": "1.000000",
                                "crush_weight": "0.819992",
                                "depth": 2,
                                "type": "osd",
                                "id": 2,
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
                                    "osd": 2,
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
                    "size": 1,
                    "shape": "circle",
                    "type": "storageNode",
                    "display_type": "Storage Node",
                    "name": "cmbu-vxa2010-17",
                    "isPartialUveMissing": false,
                    "osds": [{
                        "status": "up",
                        "name": "osd.3",
                        "exists": 1,
                        "type_id": 0,
                        "reweight": "1.000000",
                        "crush_weight": "0.819992",
                        "depth": 2,
                        "type": "osd",
                        "id": 3,
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
                            "osd": 3,
                            "laggy_interval": 0
                        }
                    }, {
                        "status": "up",
                        "name": "osd.2",
                        "exists": 1,
                        "type_id": 0,
                        "reweight": "1.000000",
                        "crush_weight": "0.819992",
                        "depth": 2,
                        "type": "osd",
                        "id": 2,
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
                            "osd": 2,
                            "laggy_interval": 0
                        }
                    }],
                    "osds_total": "1.63 TB",
                    "osds_used": "776.98 GB",
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
                    "version": "Ceph 0.67.5-1-g09ecfd2"
                }, {
                    "x": 92,
                    "y": 316.59,
                    "available_perc": "92.00",
                    "total": "316.59 GB",
                    "size": 1,
                    "shape": "circle",
                    "type": "storageNode",
                    "display_type": "Storage Node",
                    "name": "cmbu-vxa2100-proto3",
                    "isPartialUveMissing": false,
                    "osds": [{
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
                    "osds_total": "929.07 GB",
                    "osds_used": "436.44 GB",
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
                    "version": "Ceph 0.67.5-1-g09ecfd2"
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