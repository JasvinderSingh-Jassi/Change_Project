//Accessing the variables from WebTable_Page.js
let WebTable_Page = require('../../Page Objects/WebTable_Page');
let util = require('../../TestUtil');
let tc = require('../../TestConstant');

describe("Assert WebTable Section", () => {

  let originalTimeout;

  beforeEach(function () {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000000;

    //Disable AngularEnabled
    browser.waitForAngularEnabled(false);

    //Access the URL
    browser.get(tc.URL);

    //Maximize the browser window
    browser.manage().window().maximize();

  });


  afterEach(function () {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });


  it("Assert various searches and data in WebTable", () => {

    //Wait for execution
    util.wait(WebTable_Page.webtable_button);

    //Assert webtable button
    expect(WebTable_Page.webtable_button.getText()).toEqual("WebTable");

    //Click on webtable
    WebTable_Page.webtable_button.click();

    //Assert table
    expect((WebTable_Page.table).isPresent()).toBe(true);

    //Assert first row
    expect(WebTable_Page.firstname.getText()).toEqual("firstName");
    expect(WebTable_Page.lastname.getText()).toEqual("lastName");
    expect(WebTable_Page.age.getText()).toEqual("age");
    expect(WebTable_Page.email.getText()).toEqual("email");
    expect(WebTable_Page.balance.getText()).toEqual("balance");

    //Assert firstName search
    expect((WebTable_Page.search_firstname).isPresent()).toBe(true);
    WebTable_Page.search_firstname.sendKeys("Pol");

    //Asser global search
    expect((WebTable_Page.global_search).isPresent()).toBe(true);
    WebTable_Page.global_search.sendKeys("bjip");

  })
})