//Accessing the variables from ConsumptionCalculator_Page.js
let ConsumptionCalculator_Page = require('../../Page Objects/ConsumptionCalculator_Page');
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
        util.wait(ConsumptionCalculator_Page.ConsumptionCalculator_button);

        //Assert ConsumptionCalculator button
        expect(ConsumptionCalculator_Page.ConsumptionCalculator_button.getText()).toEqual("Consumption Calculator");

        //Click on ConsumptionCalculator
        util.waitClick(ConsumptionCalculator_Page.ConsumptionCalculator_button);

        //Assert header
        expect(ConsumptionCalculator_Page.header.getText()).toEqual("Angular Consumption Calculator");

        //Assert Day
        expect(ConsumptionCalculator_Page.day.getText()).toEqual("Today,");
    });


    afterEach(function () {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });


    it("Valid Consumption Calculations", () => {

        //Enter 1st value
        ConsumptionCalculator_Page.input1.sendKeys("3");

        //Wait for execution
        browser.wait(function () {
            return ConsumptionCalculator_Page.display1.getAttribute('style').then(function (value) {
                return value == "display: none;";

            });
        }, 5000);

        //Assert valid daily limit of caffeine
        expect(ConsumptionCalculator_Page.display1.getAttribute('style')).toEqual('display: none;');

        //Enter 2nd value
        ConsumptionCalculator_Page.input2.sendKeys("2");

        //Wait for execution
        browser.wait(function () {
            return ConsumptionCalculator_Page.display1.getAttribute('style').then(function (value) {
                return value == "display: none;";

            });
        }, 5000);

        //Assert valid daily limit of tar
        expect(ConsumptionCalculator_Page.display2.getAttribute('style')).toEqual('display: none;');


    })


    it("Invalid Consumption Calculations", () => {

        //Enter 1st value
        ConsumptionCalculator_Page.input1.sendKeys("5");

        //Wait for execution
        browser.wait(function () {
            return ConsumptionCalculator_Page.display1.getAttribute('style').then(function (value) {
                return value != "display: none;";

            });
        }, 5000);

        //Assert invalid daily limit of caffeine
        expect(ConsumptionCalculator_Page.display1.getAttribute('style')).toEqual('');

        //Assert invalid display message
        expect(ConsumptionCalculator_Page.display1.getText()).toEqual('You have exceeded the daily maximum intake of 400mg.');

        //Enter 2nd value
        ConsumptionCalculator_Page.input2.sendKeys("4");

        //Wait for execution
        browser.wait(function () {
            return ConsumptionCalculator_Page.display1.getAttribute('style').then(function (value) {
                return value != "display: none;";

            });
        }, 5000);

        //Assert invalid daily limit of tar
        expect(ConsumptionCalculator_Page.display2.getAttribute('style')).toEqual('');

        //Assert invalid display message
        expect(ConsumptionCalculator_Page.display2.getText()).toEqual('You have exceeded the daily maximum intake of 30mg.');

    })
})