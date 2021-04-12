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

        //Wait for execution
        util.wait(SimpleCalculator_Page.SimpleCalculator_button);

        //Assert SimpleCalculator button
        expect(SimpleCalculator_Page.SimpleCalculator_button.getText()).toEqual("Simple Calculator");

        //Click on SimpleCalculator
        util.waitClick(SimpleCalculator_Page.SimpleCalculator_button);

        //Assert header
        expect(SimpleCalculator_Page.header.getText()).toEqual("AngularJS calculator");
    });


    afterEach(function () {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });
  
  
    it("Valid Simple Calculations", () => {

        //Enter 1st value
        SimpleCalculator_Page.inputText1.sendKeys("50");

        for (i = 1; i <= 5; i++) {

            //Increment value by 5
            SimpleCalculator_Page.increment1.click();
        }
        //Decrement value by 1
        SimpleCalculator_Page.decrement1.click();

        //Enter 2nd value
        SimpleCalculator_Page.inputText2.sendKeys("30");

        for (i = 1; i <= 3; i++) {
            //Increment value by 3
            SimpleCalculator_Page.increment2.click();
        }

        //Decrement value by 1
        SimpleCalculator_Page.decrement2.click();

        //Select operator
        SimpleCalculator_Page.operator.click().sendKeys("-").click();

        //Assert calculation
        expect(SimpleCalculator_Page.result.getText()).toEqual("54 - 32 = 22");

    })


    it("Invalid Simple Calculations", () => {

        //Enter 1st value
        SimpleCalculator_Page.inputText1.sendKeys("a");

        for (i = 1; i <= 5; i++) {

            //Increment value by 5
            SimpleCalculator_Page.increment1.click();
        }
        //Decrement value by 1
        SimpleCalculator_Page.decrement1.click();

        //Text field empty
        expect(SimpleCalculator_Page.inputText1.getText()).toEqual("");

        //Enter 2nd value
        SimpleCalculator_Page.inputText2.sendKeys("c");

        for (i = 1; i <= 4; i++) {
            //Increment value by 4
            SimpleCalculator_Page.increment2.click();
        }

        //Decrement value by 1
        SimpleCalculator_Page.decrement2.click();

        //Text field empty
        expect(SimpleCalculator_Page.inputText2.getText()).toEqual("");

        //Select operator
        SimpleCalculator_Page.operator.click().sendKeys("+").click();

        //Assert invalid calculation
        expect(SimpleCalculator_Page.result.getText()).toEqual("null + null = null");

    })
})