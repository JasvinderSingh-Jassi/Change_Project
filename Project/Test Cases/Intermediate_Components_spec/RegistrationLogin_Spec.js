//Accessing the variables from RegistrationLogin_Page.js
let RegistrationLogin_Page = require('../../Page Objects/RegistrationLogin_Page');
let util = require('../../TestUtil');
let tc = require('../../TestConstant');

describe("Assert RegistrationLogin Section", () => {

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
        util.wait(RegistrationLogin_Page.RegistrationLogin_btn);

        //Assert RegistrationLogin button
        expect(RegistrationLogin_Page.RegistrationLogin_btn.getText()).toEqual("RegistrationLogin");

        //Click on RegistrationLogin
        util.waitClick(RegistrationLogin_Page.RegistrationLogin_btn);

    });


    afterEach(function () {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });


    it("Signin with invalid username and password and assert the error labels", () => {


        //Wait for execution
        util.wait(RegistrationLogin_Page.username);

        //Provide login credentials
        RegistrationLogin_Page.username.sendKeys(tc.Email);
        RegistrationLogin_Page.password.sendKeys(tc.Password);


        //Submit login credentials
        util.waitClick(RegistrationLogin_Page.Login);

        browser.sleep(5000);

        //Assert invalid login credentials message
        expect(RegistrationLogin_Page.message.getText()).toEqual("Username or password is incorrect");
    })


    it("Assert login is successful, and assert the labels shown ", () => {

        //Wait for execution
        browser.sleep(5000);

        //Click on register
        RegistrationLogin_Page.register.click();

        //Wait for execution
        util.wait(RegistrationLogin_Page.firstname);

        //Register User
        RegistrationLogin_Page.firstname.sendKeys(tc.fname);
        RegistrationLogin_Page.lastname.sendKeys(tc.lname);
        RegistrationLogin_Page.username.sendKeys(tc.Email);
        RegistrationLogin_Page.password.sendKeys(tc.Password);
        RegistrationLogin_Page.register_user.click();

        //Wait for execution
        util.wait(RegistrationLogin_Page.message);

        //Assert invalid login credentials message
        expect(RegistrationLogin_Page.message.getText()).toEqual("Registration successful");

        //Wait for execution
        util.wait(RegistrationLogin_Page.username);

        //Provide login credentials
        RegistrationLogin_Page.username.sendKeys(tc.Email);
        RegistrationLogin_Page.password.sendKeys(tc.Password);


        //Submit login credentials
        util.waitClick(RegistrationLogin_Page.Login);

        //Wait for execution
        util.wait(RegistrationLogin_Page.LoggedIn);

        //Assert invalid login credentials message
        expect(RegistrationLogin_Page.LoggedIn.getText()).toEqual("You're logged in!!");

        //Logout
        util.waitClick(RegistrationLogin_Page.Logout);

    })




})