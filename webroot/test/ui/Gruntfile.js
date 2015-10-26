/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */
/*jshint node:true */
module.exports = function (grunt) {
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-qunit");
    grunt.loadNpmTasks('grunt-qunit-junit');
    grunt.loadNpmTasks('grunt-karma');
    //this option is to avoid interruption of test case execution on failure of one in sequence
    //grunt.option('force',true);
    grunt.option('stack', true);

    var commonFiles = [
       {pattern: 'contrail-web-core/webroot/assets/**/!(tests)/*.js', included: false},

        {pattern: 'contrail-web-core/webroot/assets/**/*.css', included: false},
        {pattern: 'contrail-web-core/webroot/css/**/*.css', included: false},
        {pattern: 'contrail-web-core/webroot/css/**/*.ttf', included: false},
        {pattern: 'contrail-web-core/webroot/css/**/*.woff', included: false},
        {pattern: 'contrail-web-core/webroot/test/ui/**/*.css', included: false},

        {pattern: 'contrail-web-core/webroot/assets/**/*.woff', included: false},
        {pattern: 'contrail-web-core/webroot/assets/**/*.ttf', included: false},

        {pattern: 'contrail-web-core/webroot/img/**/*.png', included: false},
        {pattern: 'contrail-web-core/webroot/css/**/*.png', included: false},
        {pattern: 'contrail-web-core/webroot/assets/select2/styles/**/*.png', included: false},
        {pattern: 'contrail-web-core/webroot/css/**/*.gif', included: false},

        //Everything except library test suites and test files.
        {pattern: 'contrail-web-core/webroot/test/ui/js/**/{!(*.test.js), !(*.lib.test.suite.js)}', included: false},

        {pattern: 'contrail-web-storage/webroot/test/ui/strg.test.app.js'},
        {pattern: 'contrail-web-storage/webroot/test/ui/*.js', included: false},
        {pattern: 'contrail-web-storage/webroot/monitor/**/*.tmpl', included: false},
        {pattern: 'contrail-web-storage/webroot/common/ui/templates/*.tmpl', included: false},
        {pattern: 'contrail-web-storage/webroot/common/**/*.js', included: false},
        {pattern: 'contrail-web-storage/webroot/monitor/infrastructure/**/*.js', included: false},


        {pattern: 'contrail-web-storage/webroot/monitor/storage/ui/js/**/*.js', included: false},

        {pattern: 'contrail-web-storage/webroot/config/linklocalservices/**/*.js', included: false},
        {pattern: 'contrail-web-storage/webroot/*.xml', included: false},



        {pattern: 'contrail-web-core/webroot/js/**/*.js', included: false},
        {pattern: 'contrail-web-core/webroot/templates/*.tmpl', included: false},

        {pattern: 'contrail-web-storage/webroot/monitor/storage/ui/test/ui/*.mock.data.js', included: false}
    ];
    var karmaConfig = {
        options: {
            configFile: 'karma.config.js'
        },
        storageDiskListView: {
            options: {
                files: [
                    {pattern: 'contrail-web-storage/webroot/monitor/storage/ui/test/ui/DiskListView.custom.test.suite.js', included: false},
                    {pattern: 'contrail-web-storage/webroot/monitor/storage/ui/test/ui/DiskListView.test.js', included: false}
                ],
                preprocessors: {
                    'contrail-web-storage/webroot/monitor/storage/ui/js/**/*.js': ['coverage']
                }
            }
        },
        storageDiskView: {
            options: {
                files: [
                    {pattern: 'contrail-web-storage/webroot/monitor/storage/ui/test/ui/DiskView.test.js', included: false}
                ],
                preprocessors: {
                    'contrail-web-storage/webroot/monitor/storage/ui/js/**/*.js': ['coverage']
                }
            }
        },
        storagePoolListView: {
            options: {
                files: [
                    {pattern: 'contrail-web-storage/webroot/monitor/storage/ui/test/ui/PoolListView.custom.test.suite.js', included: false},
                    {pattern: 'contrail-web-storage/webroot/monitor/storage/ui/test/ui/PoolListView.test.js', included: false}
                ],
                preprocessors: {
                    'contrail-web-storage/webroot/monitor/storage/ui/js/**/*.js': ['coverage']
                }
            }
        },
        storageMonitorListView: {
            options: {
                files: [
                    {pattern: 'contrail-web-storage/webroot/monitor/storage/ui/test/ui/StorageMonListView.custom.test.suite.js', included: false},
                    {pattern: 'contrail-web-storage/webroot/monitor/storage/ui/test/ui/StorageMonListView.test.js', included: false}
                ],
                preprocessors: {
                    'contrail-web-storage/webroot/monitor/storage/ui/js/**/*.js': ['coverage']
                }
            }
        }
    };

    for (var feature in karmaConfig) {
        if (feature != 'options') {
            karmaConfig[feature]['options']['files'] = commonFiles.concat(karmaConfig[feature]['options']['files']);
        }
    }

    grunt.initConfig({
        pkg: grunt.file.readJSON(__dirname + "/../../../../contrail-web-core/package.json"),
        karma: karmaConfig,
        jshint: {
            options: {
                jshintrc: ".jshintrc"
            },
            files: ["Gruntfile.js"]
        },
        sm : {
            storageDiskListView: 'storageDiskListView',
            storageDiskView: 'storageDiskView',
            storagePoolListView: 'storagePoolListView',
            storageMonitorListView: 'storageMonitorListView'
        }
    });

    grunt.registerMultiTask('sm', 'Storage Monitoring Test Cases', function () {
        if (this.target == 'storageDiskListView') {
            grunt.task.run('karma:storageDiskListView');
        }else if (this.target == 'storageDiskView') {
            grunt.task.run('karma:storageDiskView');
        }else if (this.target == 'storagePoolListView') {
            grunt.task.run('karma:storagePoolListView');
        }else if (this.target == 'storageMonitorListView') {
            grunt.task.run('karma:storageMonitorListView');
        }
    });
};