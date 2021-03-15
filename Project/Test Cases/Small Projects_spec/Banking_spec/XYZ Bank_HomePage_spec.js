//Accessing the variables from XYZ_Bank_Page.js
let XYZ_Bank_Page = require('../../../Page Objects/Banking_Page');
let util = require('../../../TestUtil');
let tc = require('../../../TestConstant');

describe("XYZ Bank Home Page", () => {

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

    //Wait for execution
    util.wait(XYZ_Bank_Page.Banking_button);

    //Assert multiform button
    expect(XYZ_Bank_Page.Banking_button.getText()).toEqual("Banking");

    //Click on multiform
    XYZ_Bank_Page.Banking_button.click();

  });

  afterEach(function () {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });


  it("click Home Page", () => {

    //Wait for execution
    util.wait(XYZ_Bank_Page.home);

    //click on the home button
    XYZ_Bank_Page.home.click();

    //Verifying the home page heading
    expect(XYZ_Bank_Page.header.getText()).toEqual("XYZ Bank");

    //click on the customer login
    XYZ_Bank_Page.Customer_Login.click();

    //click on home page
    XYZ_Bank_Page.home.click();

    //click on the manager login
    XYZ_Bank_Page.Manager_Login.click();

    //click on home page
    XYZ_Bank_Page.home.click();
  })

})