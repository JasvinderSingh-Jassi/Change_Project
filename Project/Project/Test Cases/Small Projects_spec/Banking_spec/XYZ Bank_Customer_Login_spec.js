//Accessing the variables from XYZ_Bank_Page.js
let XYZ_Bank_Page = require('../../../Page Objects/Banking_Page');
let util = require('../../../TestUtil');
let tc = require('../../../TestConstant');

describe("Functionality of XYZ Bank Customer login", () => {

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

    //Assert banking button
    expect(XYZ_Bank_Page.Banking_button.getText()).toEqual("Banking");

    //Click on banking
    XYZ_Bank_Page.Banking_button.click();

    //Functionality of Customer Login section
    util.waitClick(XYZ_Bank_Page.Customer_Login);

    //Wait for execution
    util.wait(XYZ_Bank_Page.Select_User);

    //Functionality of user in the dropdown
    XYZ_Bank_Page.Select_User.click().sendKeys("Ron Weasly").click();

    //Functionality of the customer login button
    XYZ_Bank_Page.Login.click();

    //Wait for execution
    util.wait(XYZ_Bank_Page.welcome_messg);

    //Functionality of the Welcome message 
    expect(XYZ_Bank_Page.welcome_messg.getText()).toEqual("Ron Weasly");

    //Select the account from the dropdown
    XYZ_Bank_Page.acc_select.click().sendKeys("1007").click();

  });

  afterEach(function () {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });


  it("Functionality of Customer Transaction", () => {

    //Functionality of customer transaction section
    XYZ_Bank_Page.Customer_Transaction.click();

    //Wait for execution
    util.wait(XYZ_Bank_Page.Back);

    //Functionality of Back button
    XYZ_Bank_Page.Back.click();

  })


  it("Functionality of Customer Deposit", () => {

    //Functionality of customer deposit section
    XYZ_Bank_Page.Customer_Deposit.click();

    //Wait for execution
    util.wait(XYZ_Bank_Page.amount);

    //Enter the deposit amount
    XYZ_Bank_Page.amount.sendKeys("500");

    //Functionality of deposit button
    XYZ_Bank_Page.Deposit_button.click();

    //Functionality of the message after deposit
    expect(XYZ_Bank_Page.Check_Deposit.getText()).toEqual("Deposit Successful");

  })


  it("Functionality of Customer Deposit", () => {

    //Functionality of customer withdrawl section
    XYZ_Bank_Page.Customer_Withdrawl.click();

    //Wait for execution
    util.wait(XYZ_Bank_Page.amount);

    //Enter the withdrawl amount
    XYZ_Bank_Page.amount.sendKeys("100");

    //Functionality of withdrawl button
    XYZ_Bank_Page.Withdrawl_button.click();

    //Functionality of the message after withdrawl
    expect(XYZ_Bank_Page.Check_Withdrawl.getText()).toEqual("Transaction successful");

    //Functionality of logout
    XYZ_Bank_Page.Logout.click();

    //Functionality of home button
    XYZ_Bank_Page.home.click();

  })
})