const HtmlReporter = require('protractor-beautiful-reporter');
const browserConfig = require('./browserConfig');

exports.config = {
  directConnect: true,

  seleniumAddress: 'http://localhost:4444/wd/hub',


  //Running in desired browser
  capabilities: browserConfig['chrome'],

  //Running in desired browser parallerly
  // multiCapabilities: browserConfig['firefox_chrome_count2'],

  //Run test in multiple browser parallerly by entering the no of browser


  framework: 'jasmine',

  specs: ['Test Cases//Basic_Components_spec//*.js', 'Test Cases//Intermediate_Components_spec//*.js', 'Test Cases//Small Projects_spec//Banking_spec//*.js', 'Test Cases//Small Projects_spec//*.js', 'Test Cases//Course_Selection_spec//*.js', 'Test Cases//Delta_Homepage_spec//*.js','Test Cases//Amazon_spec//*.js','Test Cases//Angular_spec//*.js'],

  allScriptsTimeout: 100000000,


  onPrepare: function () {

    // Add a screenshot reporter and store screenshots to `/Reports/screenshots/images`:
    jasmine.getEnv().addReporter(new HtmlReporter({

      baseDirectory: 'Reports/screenshots',

      screenshotsSubfolder: 'images',

      jsonsSubfolder: 'jsons'

    }).getJasmine2Reporter());

  },

  jasmineNodeOpts: {
    defaultTimeOutInterval: 100000000
  }
}