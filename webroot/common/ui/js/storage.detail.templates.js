/*
 * Copyright (c) 2015 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore'
], function (_) {
    var SDetailTemplates = function () {
        this.getDiskDetailsTemplate = function (detailTheme, detailActions) {
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
                                },
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
    return SDetailTemplates;
})
