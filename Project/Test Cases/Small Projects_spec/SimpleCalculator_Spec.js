//Accessing the variables from Scrollable_Page.js
let SimpleCalculator_Page = require('../../Page Objects/SimpleCalculator_Page');
let util = require('../../TestUtil');
let tc = require('../../TestConstant');

describe("Assert UploadImage Section", () => {

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


    it("Simple Calculations", () => {

        //Wait for execution
        util.wait(SimpleCalculator_Page.SimpleCalculator_button);

        //Assert SimpleCalculator button
        expect(SimpleCalculator_Page.SimpleCalculator_button.getText()).toEqual("Simple Calculator");

        //Click on SimpleCalculator
        util.waitClick(SimpleCalculator_Page.SimpleCalculator_button);

        //Assert header
        expect(SimpleCalculator_Page.header.getText()).toEqual("AngularJS calculator");

        //Enter 1st value
        SimpleCalculator_Page.inputText1.sendKeys("50");

        //Enter 2nd value
        SimpleCalculator_Page.inputText2.sendKeys("30");

        //Select operator
        SimpleCalculator_Page.operator.click().sendKeys("-").click();

        //Assert calculation
        expect(SimpleCalculator_Page.result.getText()).toEqual("50 - 30 = 20");

        browser.sleep(5000);
    })
})