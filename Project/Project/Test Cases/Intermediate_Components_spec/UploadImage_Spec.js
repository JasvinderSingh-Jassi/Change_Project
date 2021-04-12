//Accessing the variables from Scrollable_Page.js
let UploadImage_Page = require('../../Page Objects/UploadImage_Page');
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


    it("Assert and upload image", () => {

        //Wait for execution
        util.wait(UploadImage_Page.UploadImage);

        //Assert UploadImage button
        expect(UploadImage_Page.UploadImage.getText()).toEqual("Upload Image");

        //Click on upload image button
        util.waitClick(UploadImage_Page.UploadImage);

        //Assert Preview
        expect(UploadImage_Page.chooseImage.getText()).toEqual("No image choosed");

        //Wait for execution
        browser.wait(function () {
            return UploadImage_Page.progressbar.getAttribute('value').then(function (value) {
                return value == 0;
            });
        }, 5000);

        //Assert progressbar before uploading image
        expect(UploadImage_Page.progressbar.getAttribute('value')).toEqual('0');

        //Wait and upload image from local path
        util.wait(UploadImage_Page.selectImage);
        UploadImage_Page.selectImage.sendKeys("C://Users//mindfire//Downloads//pp.jpg");
        browser.ignoreSynchronization = true;

        //Assert progressbar visibility
        var EC = protractor.ExpectedConditions;
        browser.wait(EC.visibilityOf(UploadImage_Page.progressbar), 5000, "No progress animation is visible");

        //Wait for execution
        browser.wait(function () {
            return UploadImage_Page.progressbar.getAttribute('value').then(function (value) {
                return value == 1;
            });
        }, 5000);

        //Assert progressbar after uploading image
        expect(UploadImage_Page.progressbar.getAttribute('value')).toEqual('1');

    })
})