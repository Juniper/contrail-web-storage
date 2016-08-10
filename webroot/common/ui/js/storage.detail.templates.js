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
                                            templateGenerator: 'TextGenerator'
                                        },
                                        {
                                            key: 'health_summary.HEALTH_WARN',
                                            label: 'Warning',
                                            templateGenerator: 'TextGenerator'
                                        }
                                    ]
                                },
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
                                        },
                                        {
                                            key: 'state',
                                            templateGenerator: 'TextGenerator'
                                        },
                                        {
                                            key: 'cluster_status_tmpl',
                                            templateGenerator: 'TextGenerator'
                                        },
                                        {
                                            key: 'status_tmpl',
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

    this.HealthStatusFormatter = function(value, obj, iconClass, key) {
        var iconHTML = (contrail.checkIfExist(iconClass) ?
                    '<i class="' + iconClass + ' pull-right padding-3-0"></i>' : '');
        if (value === 'critical') {
            return '<span class="red ' + key + '-value" style="font-size: large;">'
                + value + iconHTML +
                '</span>';
        } else  if (value === 'warn') {
            return '<span class="orange ' + key + '-value" style="font-size: large; ">'
                + value + iconHTML +
                '</span>';
        } else if (value === 'ok') {
            return '<span class="green" style="font-size: large">' + value + '</span>';
        } else {
            return value
        }
    };
    return SDetailTemplates;
})
