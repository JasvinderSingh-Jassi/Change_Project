var HtmlReporter = require('protractor-beautiful-reporter');


exports.config = {
  directConnect: true,

  seleniumAddress: 'http://localhost:4444/wd/hub',

  //Running in chrome browser
  capabilities: {
    browserName: 'chrome',
  },

  //Running in chrome and firefox browser parallerly
  /**multiCapabilities: [
     {'browserName': 'chrome'},
     {'browserName': 'firefox'},
     ],*/

  framework: 'jasmine',

  specs: ['Test Cases//Basic_Components_spec//*.js', 'Test Cases//Intermediate_Components_spec//*.js', 'Test Cases//Small Projects_spec//Banking_spec//*.js', 'Test Cases//Small Projects_spec//*.js', 'Test Cases//Course_Selection_spec//*.js', 'Test Cases//Delta_Homepage_spec//*.js', 'Test Cases//Angular_spec//*.js'],

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