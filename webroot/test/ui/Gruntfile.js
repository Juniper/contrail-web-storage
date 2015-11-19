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
        
        {pattern: 'contrail-web-storage/webroot/monitor/infrastructure/ui/js/**/*.js', included: false},
        {pattern: 'contrail-web-storage/webroot/monitor/infrastructure/ui/js/*.js', included: false},

        {pattern: 'contrail-web-storage/webroot/monitor/storage-infra/**/*.js', included: false},
        {pattern: 'contrail-web-storage/webroot/monitor/storage-infra/**/*.view', included: false},

       // {pattern: 'contrail-web-storage/webroot/monitor/infrastructure/ui/js/**/*.js', included: false},
        {pattern: 'contrail-web-storage/webroot/monitor/storage/ui/js/**/*.js', included: false},

        {pattern: 'contrail-web-storage/webroot/config/linklocalservices/**/*.js', included: false},
        {pattern: 'contrail-web-storage/webroot/*.xml', included: false},



        {pattern: 'contrail-web-core/webroot/js/**/*.js', included: false},
        {pattern: 'contrail-web-core/webroot/templates/*.tmpl', included: false},
        
        {pattern: 'contrail-web-storage/webroot/monitor/infrastructure/test/ui/views/*.mock.data.js', included: false},
  
        {pattern: 'contrail-web-storage/webroot/monitor/storage/test/ui/views/*.mock.data.js', included: false}
    ];
    
    function browserSubdirFn(browser, platform) {
        // normalization process to keep a consistent browser name
        return browser.toLowerCase().split(' ')[0];
    };

    var karmaConfig = {
        options: {
            configFile: 'karma.config.js'
        },
       infraStorageNodeListView: {
            options: {
                files: [
                    {
                        pattern: 'contrail-web-storage/webroot/monitor/infrastructure/test/ui/views/StorageNodeListView.custom.test.suite.js', 
                        included: false
                    },
                    {
                        pattern: 'contrail-web-storage/webroot/monitor/infrastructure/test/ui/views/StorageNodeListView.test.js', 
                        included: false
                    }
                ],
                preprocessors: {
                    'contrail-web-storage/webroot/monitor/infrastructure/ui/js/**//*.js': ['coverage']
                },
                junitReporter: {
                    outputFile: __dirname + '/reports/tests/sm/views/storage-node-list-view-test-results.xml',
                    suite: 'infraStorageNodeListView'
                },
                htmlReporter: {
                    outputFile: __dirname + '/reports/tests/sm/views/storage-node-list-view-test-results.html'
                },
                coverageReporter: {
                    type: 'html',
                    dir: __dirname + '/reports/coverage/sm/views/infraStorageNodeListView/',
                    subdir: browserSubdirFn
                },
                feature: 'infrasm'
            }
        },
        storageDashboardView: {
            options: {
                files: [
                    {
                        pattern: 'contrail-web-storage/webroot/monitor/storage/test/ui/views/ClusterStatusView.custom.test.suite.js', 
                        included: false
                    },
                    {
                        pattern: 'contrail-web-storage/webroot/monitor/storage/test/ui/views/PieChartView.custom.test.suite.js', 
                        included: false
                    },
                    {
                        pattern: 'contrail-web-storage/webroot/monitor/storage/test/ui/views/DashboardView.test.js', 
                        included: false
                    }
                ],
                preprocessors: {
                    'contrail-web-storage/webroot/monitor/storage/ui/js/**/*.js': ['coverage']
                },
                junitReporter: {
                    outputFile: __dirname + '/reports/tests/sm/views/storage-dashboard-view-test-results.xml',
                    suite: 'storageDashboardView'
                },
                htmlReporter: {
                    outputFile: __dirname + '/reports/tests/sm/views/storage-dashboard-view-test-results.html'
                },
                coverageReporter: {
                    type: 'html',
                    dir: __dirname + '/reports/coverage/sm/views/storageDashboardView/',
                    subdir: browserSubdirFn
                },
                feature: 'sm'
            }
        },
        storageDiskListView: {
            options: {
                files: [
                    {
                        pattern: 'contrail-web-storage/webroot/monitor/storage/test/ui/views/DiskListView.custom.test.suite.js', 
                        included: false
                    },
                    {
                        pattern: 'contrail-web-storage/webroot/monitor/storage/test/ui/views/DiskListView.test.js', 
                        included: false
                    }
                ],
                preprocessors: {
                    'contrail-web-storage/webroot/monitor/storage/ui/js/**/*.js': ['coverage']
                },
                junitReporter: {
                    outputFile: __dirname + '/reports/tests/sm/views/storage-disk-list-view-test-results.xml',
                    suite: 'storageDiskListView'
                },
                htmlReporter: {
                    outputFile: __dirname + '/reports/tests/sm/views/storage-disk-list-view-test-results.html'
                },
                coverageReporter: {
                    type: 'html',
                    dir: __dirname + '/reports/coverage/sm/views/storageDiskListView/',
                    subdir: browserSubdirFn
                },
                feature: 'sm'
            }
        },
        storageDiskView: {
            options: {
                files: [
                    {
                        pattern: 'contrail-web-storage/webroot/monitor/storage/test/ui/views/DiskView.test.js', 
                        included: false
                    }
                ],
                preprocessors: {
                    'contrail-web-storage/webroot/monitor/storage/ui/js/**/*.js': ['coverage']
                },
                junitReporter: {
                    outputFile: __dirname + '/reports/tests/sm/views/storage-disk-view-test-results.xml',
                    suite: 'storageDiskView'
                },
                htmlReporter: {
                    outputFile: __dirname + '/reports/tests/sm/views/storage-disk-view-test-results.html'
                },
                coverageReporter: {
                    type: 'html',
                    dir: __dirname + '/reports/coverage/sm/views/storageDiskView/',
                    subdir: browserSubdirFn
                },
                feature: 'sm'
            }
        },
        storagePoolListView: {
            options: {
                files: [
                    {
                        pattern: 'contrail-web-storage/webroot/monitor/storage/test/ui/views/PoolListView.custom.test.suite.js', 
                        included: false
                    },
                    {
                        pattern: 'contrail-web-storage/webroot/monitor/storage/test/ui/views/PoolListView.test.js', 
                        included: false
                    }
                ],
                preprocessors: {
                    'contrail-web-storage/webroot/monitor/storage/ui/js/**/*.js': ['coverage']
                },
                junitReporter: {
                    outputFile: __dirname + '/reports/tests/sm/views/storage-pool-list-view-test-results.xml',
                    suite: 'storagePoolListView'
                },
                htmlReporter: {
                    outputFile: __dirname + '/reports/tests/sm/views/storage-pool-list-view-test-results.html'
                },
                coverageReporter: {
                    type: 'html',
                    dir: __dirname + '/reports/coverage/sm/views/storagePoolListView/',
                    subdir: browserSubdirFn
                },
                feature: 'sm'
            }
        },
        storageMonitorListView: {
            options: {
                files: [
                    {
                        pattern: 'contrail-web-storage/webroot/monitor/storage/test/ui/views/StorageMonListView.custom.test.suite.js', 
                        included: false
                    },
                    {
                        pattern: 'contrail-web-storage/webroot/monitor/storage/test/ui/views/StorageMonListView.test.js', 
                        included: false
                    }
                ],
                preprocessors: {
                    'contrail-web-storage/webroot/monitor/storage/ui/js/**/*.js': ['coverage']
                },
                junitReporter: {
                    outputFile: __dirname + '/reports/tests/sm/views/storage-monitor-list-view-test-results.xml',
                    suite: 'storageMonitorListView'
                },
                htmlReporter: {
                    outputFile: __dirname + '/reports/tests/sm/views/storage-monitor-list--view-test-results.html'
                },
                coverageReporter: {
                    type: 'html',
                    dir: __dirname + '/reports/coverage/sm/views/storageMonitorListView/',
                    subdir: browserSubdirFn
                },
                feature: 'sm'
            }
        }
    };

    var allTestFiles = [],
        allSMTestFiles = [];

    for (var target in karmaConfig) {
        if (target != 'options') {
            allTestFiles = allTestFiles.concat(karmaConfig[target]['options']['files']);
            var feature = karmaConfig[target]['options']['feature'];
            if (feature == 'sm') {
                allSMTestFiles = allSMTestFiles.concat(karmaConfig[target]['options']['files']);
            }
            karmaConfig[target]['options']['files'] = commonFiles.concat(karmaConfig[target]['options']['files']);
        }
    }

    karmaConfig['runAllSMTests'] = {
        options: {
            files: [],
            preprocessors: {
                'contrail-web-storage/webroot/monitor/storage/ui/js/**/*.js': ['coverage']
            },
            junitReporter: {
                outputFile: __dirname + '/reports/tests/sm/sm-test-results.xml',
                suite: 'storageMonitoring',
            },
            htmlReporter: {
                outputFile: __dirname + '/reports/tests/sm/sm-test-results.html'
            },
            coverageReporter: {
                reporters: [
                    {
                        type: 'html',
                        dir: __dirname + '/reports/coverage/sm/',
                        subdir: browserSubdirFn
                    },
                    {
                        type: 'json',
                        dir: __dirname + '/reports/coverage/sm/',
                        subdir: browserSubdirFn
                    }
                ]
            }
        }
    };
    karmaConfig['runAllTests'] = {
        options: {
            files: [],
            preprocessors: {
                'contrail-web-storage/webroot/monitor/**/ui/js/**/*.js': ['coverage']
            },
            junitReporter: {
                outputFile: __dirname + '/reports/tests/web-storage-test-results.xml',
                suite: 'webStorage',
            },
            htmlReporter: {
                outputFile: __dirname + '/reports/tests/web-storage-test-results.html'
            },
            coverageReporter: {
                type: 'html',
                dir: __dirname + '/reports/coverage/webStorage/',
                subdir: browserSubdirFn
            }
        }
    };
    // Now add the test files along with common files.
    karmaConfig['runAllSMTests']['options']['files'] = commonFiles.concat(allSMTestFiles);
    karmaConfig['runAllTests']['options']['files'] = commonFiles.concat(allTestFiles);

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
            infraStorageNodeListView:'infraStorageNodeListView',
            storageDiskListView: 'storageDiskListView',
            storageDiskView: 'storageDiskView',
            storagePoolListView: 'storagePoolListView',
            storageMonitorListView: 'storageMonitorListView',
            storageDashboardView: 'storageDashboardView'
        }
    });

    function printCoverageReportLoc(reporter) {
        grunt.log.writeln('Coverage Reports: ');
        var reporters = reporter['reporters'] ? reporter['reporters'] : [reporter]
        for (var i = 0; i < reporters.length; i++) {
            grunt.log.writeln('Type: ' + reporters[i]['type']);
            grunt.log.writeln('Dir: ' + reporters[i]['dir']);
        }
    };

    grunt.registerTask('default', function () {
        grunt.warn('No Task specified. \n To run all the tests, run:\n grunt runAllTests \n\n ' +
            'To run specific feature (for eg: sm) tests, run:\n grunt runAllTests:sm\n    OR \n grunt sm\n\n');
    });

    grunt.registerTask('runAllTests', 'Web Storage Test Cases', function (feature) {
        if (feature == null) {
            grunt.log.writeln('>>>>>>>> No feature specified. will run all the feature tests. <<<<<<<');
            grunt.log.writeln('If you need to run specific feature tests only; then run: grunt sm:runAllTests\n\n');
            grunt.task.run('karma:runAllTests');
            grunt.log.writeln('Test results: ' + karmaConfig['runAllTests']['options']['htmlReporter']['outputFile']);
            printCoverageReportLoc(karmaConfig['runAllTests']['options']['coverageReporter'])

        } else if (feature == 'sm') {
            grunt.log.writeln('>>>>>>>> Running Storage Monitoring feature tests. <<<<<<<');
            grunt.task.run('karma:runAllSMTests');
            grunt.log.writeln('Test results: ' + karmaConfig['runAllSMTests']['options']['htmlReporter']['outputFile']);
            printCoverageReportLoc(karmaConfig['runAllSMTests']['options']['coverageReporter']);
        }
    });



    grunt.registerMultiTask('sm', 'Storage Monitoring Test Cases', function () {
        if (target == null) {
            grunt.log.writeln('>>>>>>>> Running Storage Monitoring feature tests. <<<<<<<');
            grunt.task.run('karma:runAllSMTests');
            grunt.log.writeln('Test results: ' + karmaConfig['runAllSMTests']['options']['htmlReporter']['outputFile']);
            printCoverageReportLoc(karmaConfig['runAllSMTests']['options']['coverageReporter']);
        } else if (this.target == 'infraStorageNodeListView') {
            grunt.task.run('karma:infraStorageNodeListView');
        }else if (this.target == 'storageDashboardView') {
            grunt.task.run('karma:storageDashboardView');
        }else if (this.target == 'storageDiskListView') {
            grunt.task.run('karma:storageDiskListView');
        }else if (this.target == 'storageDiskView') {
            grunt.task.run('karma:storageDiskView');
        }else if (this.target == 'storagePoolListView') {
            grunt.task.run('karma:storagePoolListView');
        }else if (this.target == 'storageMonitorListView') {
            grunt.task.run('karma:storageMonitorListView');
        } else if (target == 'runAllNoMerge') {
            grunt.log.writeln('>>>>>>> Running all Storage Monitoring tests one by one. Results will not be Merged. <<<<<<');
            grunt.task.run(['karma:storageNodeListView', 'karma:storageDashboardView', 'karma:storageDiskListView', 
                'karma:storageDiskView', 'karma:storagePoolListView', 'karma:storageMonitorListView']);
        }
    });
};