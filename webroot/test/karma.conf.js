/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */
module.exports = function(config) {
  config.set({
    basePath: '../../..',    //"contrail-web-storage" directory
    autoWatch: true,
    frameworks: ['qunit'],
    files: [
        //{pattern:"webroot/monitor/storage-infra/test/monitor_infra_storage_dashboard.html",watched:false},
    ],
    plugins:[
        'karma-phantomjs-launcher',
        'karma-coverage',
        'karma-qunit',
        'karma-htmlfile-reporter',
        'karma-junit-reporter',
        'karma-html2js-preprocessor',
        'karma-firefox-launcher',
        'karma-chrome-launcher',
    ],
    browsers: [
        'PhantomJS'
        //'Firefox',
        //'Chrome'
        ],

    reporters: ['progress','html','coverage','junit'],
    // the default configuration
    junitReporter: {
      outputFile: 'test-results.xml',
      suite: ''
    },
    preprocessors: { 
        'webroot/monitor/storage-infra/dashboard/ui/js/*.js': ['coverage'],
        'webroot/monitor/storage-infra/dashboard/ui/views/*.view' : ['html2js'],
        'webroot/monitor/storage-infra/storagenode/ui/js/*.js': ['coverage'],
        'webroot/monitor/storage-infra/storagenode/ui/views/*.view' : ['html2js'],
        'webroot/monitor/tenant-storage/common/ui/js/*.js': ['coverage'],
        'webroot/monitor/tenant-storage/common/ui/views/*.view' : ['html2js'],
        'webroot/monitor/tenant-storage/dashboard/ui/js/*.js': ['coverage'],
        'webroot/monitor/tenant-storage/dashboard/ui/views/*.view' : ['html2js'],
        'webroot/monitor/tenant-storage/disks/ui/js/*.js': ['coverage'],
        'webroot/monitor/tenant-storage/disks/ui/views/*.view' : ['html2js'],
        'webroot/monitor/tenant-storage/monitor/ui/js/*.js': ['coverage'],
		'webroot/monitor/tenant-storage/monitor/ui/views/*.view' : ['html2js'],
        '*.html': []
        },
    htmlReporter: {
      outputFile: './tests/units.html'
    },
    singleRun: true
  });
};
