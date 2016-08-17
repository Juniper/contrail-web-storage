/*
 * Copyright (c) 2015 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore'
], function (_) {
    var SDetailTemplates = function () {
        this.getClusterStausDetailTemplate = function (detailTheme, detailActions) {
            var detailTheme = contrail.checkIfExist(detailTheme) ? detailTheme : cowc.THEME_DETAIL_DEFAULT;
            return {
                advancedViewOptions: false,
                templateGenerator: 'ColumnSectionTemplateGenerator',
                templateGeneratorConfig: {
                    columns: [
                        {
                            rows: [
                                {
                                    templateGenerator: 'BlockListTemplateGenerator',
                                    advancedViewOptions: false,
                                    title: swl.TITLE_CLUSTER_HEALTH,
                                    theme: detailTheme,
                                    templateGeneratorData: 'rawData',
                                    templateGeneratorConfig: [
                                        {
                                            key: 'overall_health',
                                            label: 'Overall Health',
                                            templateGenerator: 'TextGenerator',
                                            templateGeneratorConfig: {
                                                formatter: "HealthStatusFormatter",
                                                iconClass: 'fa fa-exclamation-triangle'
                                            },
                                            events: {
                                                click: function(event, detailsData) {
                                                    swu.showStorageAlertsPopup(detailsData['alerts']);
                                                }
                                            }
                                        },
                                        {
                                            key: 'health_summary.HEALTH_ERR',
                                            label: 'Error',
                                            templateGenerator: 'TextGenerator',
                                            templateGeneratorConfig: {
                                                formatter: "StatusFormatter",
                                            }
                                        },
                                        {
                                            key: 'health_summary.HEALTH_WARN',
                                            label: 'Warning',
                                            templateGenerator: 'TextGenerator',
                                            templateGeneratorConfig: {
                                                formatter: "StatusFormatter",
                                            }
                                        }
                                    ]
                                },{
                                    templateGenerator: 'BlockListTemplateGenerator',
                                    advancedViewOptions: false,
                                    title: "Placement Group Status",
                                    theme: detailTheme,
                                    templateGeneratorData: 'rawData',
                                    templateGeneratorConfig: [
                                        {
                                            key: 'pg_status',
                                            label: 'Overall',
                                            templateGenerator: 'TextGenerator',
                                            templateGeneratorConfig: {
                                                formatter: 'PGStatusInfoFormatter',
                                                iconClass: 'fa fa-info-circle'
                                            },
                                            events: {
                                                click: function(event, detailsData) {
                                                    swu.showStoragePGStatusPopup(detailsData['pg']);
                                                }
                                            }
                                        },{
                                            key: 'pg.state',
                                            label: 'State',
                                            templateGenerator: 'TextGenerator',
                                            templateGeneratorConfig: {
                                                formatter: "StatusFormatter",
                                            }
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            };
        };

        this.getDiskSummaryDetailsTemplate = function (detailTheme, detailActions) {
            var detailTheme = contrail.checkIfExist(detailTheme) ? detailTheme : cowc.THEME_DETAIL_DEFAULT;
            return {
                advancedViewOptions: false,
                templateGenerator: 'ColumnSectionTemplateGenerator',
                templateGeneratorConfig: {
                    columns: [
                        {
                            rows: [
                                {
                                    templateGenerator: 'BlockListTemplateGenerator',
                                    title: swl.TITLE_DISK_SUMMARY,
                                    theme: detailTheme,
                                    templateGeneratorData: 'rawData',
                                    templateGeneratorConfig: [
                                        {
                                            key: 'name',
                                            templateGenerator: 'TextGenerator'
                                        },
                                        {
                                            key: 'host',
                                            templateGenerator: 'TextGenerator'
                                        },
                                        {
                                            key: 'uuid',
                                            templateGenerator: 'TextGenerator'
                                        },
                                        {
                                            key: 'public_addr',
                                            templateGenerator: 'TextGenerator'
                                        },
                                        {
                                            key: 'state',
                                            templateGenerator: 'TextGenerator'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            };
        };


        this.getDiskStatusDetailsTemplate = function (detailTheme, detailActions) {
            var detailTheme = contrail.checkIfExist(detailTheme) ? detailTheme : cowc.THEME_DETAIL_DEFAULT;
            return {
                advancedViewOptions: false,
                templateGenerator: 'ColumnSectionTemplateGenerator',
                templateGeneratorConfig: {
                    columns: [
                        {
                            rows: [
                                {
                                    templateGenerator: 'BlockListTemplateGenerator',
                                    title: swl.TITLE_DISK_STATUS,
                                    theme: detailTheme,
                                    templateGeneratorData: 'rawData',
                                    templateGeneratorConfig: [
                                        {
                                            key: 'cluster_status_tmpl',
                                            templateGenerator: 'TextGenerator'
                                        },
                                        {
                                            key: 'status_tmpl',
                                            templateGenerator: 'TextGenerator'
                                        },
                                        {
                                            key: 'available',
                                            templateGenerator: 'TextGenerator'
                                        },
                                        {
                                            key: 'used',
                                            templateGenerator: 'TextGenerator'
                                        },
                                        {
                                            key: 'total',
                                            templateGenerator: 'TextGenerator'
                                        },
                                        {
                                            key: 'apply_latency',
                                            templateGenerator: 'TextGenerator'
                                        },
                                        {
                                            key: 'commit_latency',
                                            templateGenerator: 'TextGenerator'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            };
        };

    };
    this.PGStatusInfoFormatter = function(value, obj, iconClass, key) {
        var iconHTML = (contrail.checkIfExist(iconClass) ?
                    '<i class="' + iconClass + ' pull-right padding-3-0"></i>' : '');
        if (value === 'critical') {
            return '<span class="red ' + key + '-value" style="font-size: large;">'
                + value + iconHTML +
                '</span>';
        } else  if (value === 'WARN') {
            return '<span class="orange ' + key + '-value" style="font-size: large; ">'
                + value + iconHTML +
                '</span>';
        } else if (value === 'OK') {
            return '<span class="green ' + key + '-value" style="font-size: large; ">'
                + value + iconHTML +
                '</span>';
        } else {
            return '<span class=" ' + key + '-value" style="font-size: large; ">'
                + value + iconHTML +
                '</span>';
        }
    };

    this.HealthStatusFormatter = function(value, obj, iconClass, key) {
        var iconHTML = (contrail.checkIfExist(iconClass) ?
                    '<i class="' + iconClass + ' pull-right padding-3-0"></i>' : '');
        if (value === 'critical') {
            return '<span class="red ' + key + '-value" style="font-size: large; word-wrap:break-word;" >'
                + value + iconHTML +
                '</span>';
        } else  if (value === 'warn') {
            return '<span class="orange ' + key + '-value" style="font-size: large; word-wrap:break-word; " >'
                + value + iconHTML +
                '</span>';
        } else if (value === 'ok') {
            return '<span class="green" style="font-size: large;" >OK</span>';
        } else {
            return value
        }
    };

    this.StatusFormatter = function(value, obj, key) {
            return '<span style="word-wrap:break-word;" >' + value + '</span>';
    };

    return SDetailTemplates;
})
