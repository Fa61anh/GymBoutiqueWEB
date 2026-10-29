process.env.CHROME_BIN = 'C:\\Program Files\\BraveSoftware\\Brave-Browser\\Application\\brave.exe';

module.exports = function(config) {
  config.set({
    frameworks: ['jasmine'],
    files: [
      'hooks/**/*.spec.js'
    ],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-coverage')
    ],
    reporters: ['progress', 'coverage'],
    preprocessors: {
      'hooks/**/*.spec.js': ['coverage']
    },
    coverageReporter: {
      type: 'html',
      dir: 'coverage/'
    },
    browsers: ['Chrome'],
    singleRun: true // 
  });
};