/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */
/*jshint node:true */
module.exports = function( grunt ) {

    grunt.loadNpmTasks( "grunt-contrib-jshint" );
    grunt.loadNpmTasks( "grunt-contrib-qunit" );
    grunt.loadNpmTasks('grunt-qunit-junit');
    grunt.loadNpmTasks('grunt-karma');
    //this option is to avoid interruption of test case execution on failure of one in sequence
    grunt.option('force',true);
    var commonFiles = [
        "contrail-web-core/webroot/js/contrail-all-1.js",
        "contrail-web-core/webroot/js/contrail-all-2.js",
        "contrail-web-core/webroot/js/contrail-all-3.js",
        "contrail-web-core/webroot/js/contrail-all-4.js",
        "contrail-web-core/webroot/js/contrail-all-5.js",
        "contrail-web-core/webroot/js/test/utils_mock.js",
        "contrail-web-storage/webroot/monitor/storage-infra/common/ui/js/monitor_infra_storage_constants.js",
        "contrail-web-storage/webroot/monitor/storage-infra/common/ui/js/monitor_infra_storage_utils.js"
        ];

    grunt.initConfig({
        pkg: grunt.file.readJSON( "../../../contrail-web-core/package.json" ),
        karma: {
                options:{
                    configFile:'karma.conf.js',
                },
                monitor_storage_infra: {
                    options: {
                        files:commonFiles.concat([
                            /* STORAGE UTILS */
                            "contrail-web-storage/webroot/monitor/storage-infra/test/monitor_infra_storage_utils_mock.js",
                            "contrail-web-storage/webroot/monitor/storage-infra/test/monitor_infra_storage_utils_test.js",

                            /* STORAGE DASHBOARD */
                            "contrail-web-storage/webroot/monitor/storage-infra/dashboard/ui/js/monitor_infra_storage_dashboard.js",
                            "contrail-web-storage/webroot/monitor/storage-infra/test/monitor_infra_storage_dashboard_mock.js",
                            "contrail-web-storage/webroot/monitor/storage-infra/test/monitor_infra_storage_dashboard_test.js",
                            
                            /* MONITOR INFRA STORAGENODE */
                            "contrail-web-storage/webroot/monitor/storage-infra/storagenode/ui/js/monitor_infra_storagenode.js",
                            "contrail-web-storage/webroot/monitor/storage-infra/test/monitor_infra_storagenode_mock.js",
                            "contrail-web-storage/webroot/monitor/storage-infra/test/monitor_infra_storagenode_test.js",

                            ]),
                        preprocessors: {
                            'contrail-web-storage/webroot/monitor/storage-infra/dashboard/ui/js/*.js': ['coverage'],
                            'contrail-web-storage/webroot/monitor/storage-infra/storagenode/ui/js/*.js': ['coverage']
                        }
                    }
                },
                monitor_tenant_storage :{
                    options: {
                        files: commonFiles.concat([
                            "contrail-web-storage/webroot/monitor/tenant-storage/common/ui/js/tenant_monitor_storage_utils.js",
                            "contrail-web-storage/webroot/monitor/tenant-storage/common/ui/js/tenant_monitor_storage_constants.js",
                            "contrail-web-storage/webroot/monitor/tenant-storage/dashboard/ui/js/tenant_monitor_storage_dashboard.js",
                            "contrail-web-storage/webroot/monitor/tenant-storage/disks/ui/js/tenant_monitor_storage_disks.js",
                            "contrail-web-storage/webroot/monitor/tenant-storage/monitor/ui/js/tenant_monitor_storage_monitor.js",
                            "contrail-web-storage/webroot/monitor/tenant-storage/test/tenant_monitor_storage_mock.js",
                            "contrail-web-storage/webroot/monitor/tenant-storage/test/tenant_monitor_storage_test.js",
                        ]),
                        preprocessors: {
                            'contrail-web-storage/webroot/monitor/tenant-storage/common/ui/js/*.js': ['coverage'],
                            'contrail-web-storage/webroot/monitor/tenant-storage/dashboard/ui/js/*.js': ['coverage'],
                            'contrail-web-storage/webroot/monitor/tenant-storage/disks/ui/js/*.js': ['coverage'],
                            'contrail-web-storage/webroot/monitor/tenant-storage/monitor/ui/js/*.js': ['coverage']
                        }
                    }
                }
        },
        jshint: {
            options: {
                jshintrc: ".jshintrc"
            },
            files: [ "Gruntfile.js"]
        },
    });
};
