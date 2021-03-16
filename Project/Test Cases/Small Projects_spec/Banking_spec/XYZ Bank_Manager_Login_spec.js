//Accessing the variables from XYZ_Bank_Page.js
let XYZ_Bank_Page = require('../../../Page Objects/Banking_Page');
let util = require('../../../TestUtil');
let tc = require('../../../TestConstant');

describe("click XYZ Bank Manager login", () => {

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

    //Manager login section
    util.waitClick(XYZ_Bank_Page.Manager_Login);
  });

  afterEach(function () {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });


  it("AddCustomer section", () => {

    //Functionality of add customer section
    util.waitClick(XYZ_Bank_Page.AddCustomer);

    //Wait for execution
    util.wait(XYZ_Bank_Page.Fname);

    //Enter the first name
    XYZ_Bank_Page.Fname.sendKeys(tc.fname);

    //Enter the last name
    XYZ_Bank_Page.Lname.sendKeys(tc.lname);

    //Enter the Pin code
    XYZ_Bank_Page.Pcode.sendKeys(tc.Pincode);

    //Functionality of add customer button
    XYZ_Bank_Page.Add_Customer.click();

    //Functionality of accept alert button
    browser.driver.switchTo().alert().accept();

  })


  it("OpenAccount section", () => {

    //Functionality of open account section
    util.waitClick(XYZ_Bank_Page.Open_Acc);

    //Wait for execution
    util.wait(XYZ_Bank_Page.Select_User);

    //Select user from the dropdown
    XYZ_Bank_Page.Select_User.click().sendKeys("Ron Weasly").click();

    //Enter the currency type
    XYZ_Bank_Page.Select_Currency.click().sendKeys("Rupee").click();

    //Functionality of process button
    XYZ_Bank_Page.Process.click();

    //Functionality of accept alert button
    browser.driver.switchTo().alert().accept();

  })


  it("Customers section", () => {

    //Functionality of customer section
    util.waitClick(XYZ_Bank_Page.Customers);

    //Wait for execution
    util.wait(XYZ_Bank_Page.Search);

    //Enter the name to be searched
    XYZ_Bank_Page.Search.sendKeys("Ron");

    //Delete the selected user record
    XYZ_Bank_Page.Delete.click();

    //Functionality of home page
    XYZ_Bank_Page.home.click();

  })
})