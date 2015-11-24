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
        {pattern: 'contrail-web-storage/webroot/common/ui/css/*.css', included: false},



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
                    outputFile: __dirname + '/reports/tests/stgm/views/',
                    outputFile: 'storage-node-list-view-test-results.xml',
                    suite: 'infraStorageNodeListView',
                    useBrowserName: false
                },
                htmlReporter: {
                    outputFile: __dirname + '/reports/tests/stgm/views/storage-node-list-view-test-results.html'
                },
                coverageReporter: {
                    type: 'html',
                    dir: __dirname + '/reports/coverage/stgm/views/infraStorageNodeListView/',
                    subdir: browserSubdirFn
                },
                feature: 'stgm'
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
                    outputFile: __dirname + '/reports/tests/stgm/views/',
                    outputFile: 'storage-dashboard-view-test-results.xml',
                    suite: 'storageDashboardView',
                    useBrowserName: false
                },
                htmlReporter: {
                    outputFile: __dirname + '/reports/tests/stgm/views/storage-dashboard-view-test-results.html'
                },
                coverageReporter: {
                    type: 'html',
                    dir: __dirname + '/reports/coverage/stgm/views/storageDashboardView/',
                    subdir: browserSubdirFn
                },
                feature: 'stgm'
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
                    outputDir: __dirname + '/reports/tests/stgm/views/',
                    outputFile: 'storage-disk-list-view-test-results.xml',
                    suite: 'storageDiskListView',
                    useBrowserName: false
                },
                htmlReporter: {
                    outputFile: __dirname + '/reports/tests/stgm/views/storage-disk-list-view-test-results.html'
                },
                coverageReporter: {
                    type: 'html',
                    dir: __dirname + '/reports/coverage/stgm/views/storageDiskListView/',
                    subdir: browserSubdirFn
                },
                feature: 'stgm'
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
                    outputDir: __dirname + '/reports/tests/stgm/views/',
                    outputFile: 'storage-disk-view-test-results.xml',
                    suite: 'storageDiskView',
                    useBrowserName: false
                },
                htmlReporter: {
                    outputFile: __dirname + '/reports/tests/stgm/views/storage-disk-view-test-results.html'
                },
                coverageReporter: {
                    type: 'html',
                    dir: __dirname + '/reports/coverage/stgm/views/storageDiskView/',
                    subdir: browserSubdirFn
                },
                feature: 'stgm'
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
                    outputDir: __dirname + '/reports/tests/stgm/views/',
                    outputFile: 'storage-pool-list-view-test-results.xml',
                    suite: 'storagePoolListView',
                    useBrowserName: false
                },
                htmlReporter: {
                    outputFile: __dirname + '/reports/tests/stgm/views/storage-pool-list--view-test-results.html'
                },
                coverageReporter: {
                    type: 'html',
                    dir: __dirname + '/reports/coverage/stgm/views/storagePoolListView/',
                    subdir: browserSubdirFn
                },
                feature: 'stgm'

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
                    outputDir: __dirname + '/reports/tests/stgm/views/',
                    outputFile: 'storage-monitor-list-view-test-results.xml',
                    suite: 'storageMonitorListView',
                    useBrowserName: false
                },
                htmlReporter: {
                    outputFile: __dirname + '/reports/tests/stgm/views/storage-monitor-list--view-test-results.html'
                },
                coverageReporter: {
                    type: 'html',
                    dir: __dirname + '/reports/coverage/stgm/views/storageMonitorListView/',
                    subdir: browserSubdirFn
                },
                feature: 'stgm'
            }
        },

        stgmUnit: {
            options: {
                files: [
                    {
                        pattern: 'contrail-web-storage/webroot/monitor/storage/test/ui/unit/stgm.unit.test.js',
                        included: false
                    }
                ],
                preprocessors: {
                    'contrail-web-storage/webroot/monitor/storage/ui/js/*.js': ['coverage']
                },
                junitReporter: {
                    outputDir: __dirname + '/reports/tests/stgm/unit/',
                    outputFile: 'stgm-unit-test-results.xml',
                    suite: 'unit',
                    useBrowserName: false
                },
                htmlReporter: {
                    outputFile: __dirname + '/reports/tests/stgm/unit/stgm-unit-test-results.html'
                },
                coverageReporter: {
                    type: 'html',
                    dir: __dirname + '/reports/coverage/stgm/unit/',
                    subdir: browserSubdirFn
                },
                feature: 'stgm'
            }
        }
    };

    var allTestFiles = [],
        allStgmTestFiles = [];

    for (var target in karmaConfig) {
        if (target != 'options') {
            allTestFiles = allTestFiles.concat(karmaConfig[target]['options']['files']);
            var feature = karmaConfig[target]['options']['feature'];
            if (feature == 'stgm') {
                allStgmTestFiles = allStgmTestFiles.concat(karmaConfig[target]['options']['files']);
            }
            karmaConfig[target]['options']['files'] = commonFiles.concat(karmaConfig[target]['options']['files']);
        }
    }

    karmaConfig['runAllStgmTests'] = {
        options: {
            files: [],
            preprocessors: {
                'contrail-web-core/webroot/js/**/*.js': ['coverage'],
                'contrail-web-storage/webroot/monitor/storage/ui/js/**/*.js': ['coverage']
            },
            junitReporter: {
                outputDir: __dirname + '/reports/tests/nm/',
                outputFile: 'stgm-test-results.xml',
                suite: 'stgm',
                useBrowserName: false
            },
            htmlReporter: {
                outputFile: __dirname + '/reports/tests/stgm/stgm-test-results.html'
            },
            coverageReporter: {
                reporters: [
                    {
                        type: 'html',
                        dir: __dirname + '/reports/coverage/stgm/',
                        subdir: browserSubdirFn
                    },
                    {
                        type: 'json',
                        dir: __dirname + '/reports/coverage/stgm/',
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
                'contrail-web-core/webroot/js/**/*.js': ['coverage'],
                'contrail-web-storage/webroot/monitor/**/ui/js/**/*.js': ['coverage']
            },
            junitReporter: {
                outputDir: __dirname + '/reports/tests/',
                outputFile: 'web-storage-test-results.xml',
                suite: 'webStorage',
                useBrowserName: false
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
    karmaConfig['runAllStgmTests']['options']['files'] = commonFiles.concat(allStgmTestFiles);
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
        stgmNoMerge : {
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
        grunt.warn('No Task specified. \n To run all the tests, run:\n grunt run \n\n ' +
            'To run specific feature (for eg: stgm) tests, run:\n grunt run:stgm\n    OR \n grunt stgm\n\n');
    });

    grunt.registerTask('run', 'Web Storage Test Cases', function (feature) {
        if (feature == null) {
            grunt.log.writeln('>>>>>>>> No feature specified. will run all the feature tests. <<<<<<<');
            grunt.log.writeln('If you need to run specific feature tests only; then run: grunt run:stgm\n\n');
            grunt.task.run('karma:runAllTests');
            grunt.log.writeln('Test results: ' + karmaConfig['runAllTests']['options']['htmlReporter']['outputFile']);
            printCoverageReportLoc(karmaConfig['runAllTests']['options']['coverageReporter'])

        } else if (feature == 'stgm') {
            grunt.log.writeln('>>>>>>>> Running Storage Monitoring feature tests. <<<<<<<');
            grunt.task.run('karma:runAllStgmTests');
            grunt.log.writeln('Test results: ' + karmaConfig['runAllStgmTests']['options']['htmlReporter']['outputFile']);
            printCoverageReportLoc(karmaConfig['runAllStgmTests']['options']['coverageReporter']);
        }
    });



    grunt.registerTask('stgm', 'Storage Monitoring Test Cases', function (target) {
        grunt.log.writeln(target);
        grunt.log.writeln("********************");
        if (target == null) {
            grunt.log.writeln('>>>>>>>> Running Storage Monitoring feature tests. <<<<<<<');
            grunt.task.run('karma:runAllStgmTests');
            grunt.log.writeln('Test results: ' + karmaConfig['runAllStgmTests']['options']['htmlReporter']['outputFile']);
            printCoverageReportLoc(karmaConfig['runAllStgmTests']['options']['coverageReporter']);
        } else if (target == 'infraStorageNodeListView') {
            grunt.task.run('karma:infraStorageNodeListView');
        }else if (target == 'storageDashboardView') {
            grunt.task.run('karma:storageDashboardView');
        }else if (target == 'storageDiskListView') {
            grunt.task.run('karma:storageDiskListView');
        }else if (target == 'storageDiskView') {
            grunt.task.run('karma:storageDiskView');
        }else if (target == 'storagePoolListView') {
            grunt.task.run('karma:storagePoolListView');
        }else if (target == 'storageMonitorListView') {
            grunt.task.run('karma:storageMonitorListView');
        } else if (target == 'unit') {
            grunt.task.run('karma:stgmUnit');
        } else if (target == 'runAllNoMerge') {
            grunt.log.writeln('>>>>>>> Running all Storage Monitoring tests one by one. Results will not be Merged. <<<<<<');
            grunt.task.run(['karma:storageNodeListView', 'karma:storageDashboardView', 'karma:storageDiskListView', 
                'karma:storageDiskView', 'karma:storagePoolListView', 'karma:storageMonitorListView']);
        }
    });
};