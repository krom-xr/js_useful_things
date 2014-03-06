// Karma configuration


module.exports = function(config) {
    config.set({

        // base path, that will be used to resolve files and exclude
        basePath: '..',

        frameworks: ['jasmine'],
        preprocessors: { 
            'src/useful_things.js': ['coverage'],
        },

        // list of files / patterns to load in the browser
        files: [
          'http://code.jquery.com/jquery-1.11.0.min.js',
          'src/useful_things.js',
          'tests/useful_thingsSpec.js',
        ],

        //frameworks = ["jasmine"]

        // list of files to exclude
        exclude: [],


        // test results reporter to use
        // possible values: 'dots', 'progress', 'junit'
        reporters: ['dots', 'coverage'],


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera
        // - Safari (only Mac)
        // - PhantomJS
        // - IE (only Windows)
        //browsers = ['Chrome', 'Firefox'];
        browsers: ['Chrome'],


        // If browser does not capture in given timeout [ms], kill it
        captureTimeout: 60000,


        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: false,

    });
};



