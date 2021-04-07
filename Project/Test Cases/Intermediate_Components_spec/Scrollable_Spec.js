//Accessing the variables from Scrollable_Page.js
let Scrollable_Page = require('../../Page Objects/Scrollable_Page');
let util = require('../../TestUtil');
let tc = require('../../TestConstant');

describe("Assert Scrollable Section", () => {

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


    it("Assert various search boxes and search result", () => {

        //Wait for execution
        util.wait(Scrollable_Page.scrollable);

        //Assert scrollable button
        expect(Scrollable_Page.scrollable.getText()).toEqual("Scrollable");

        //Click on scrollable
        util.waitClick(Scrollable_Page.scrollable);

        //Assert first row
        expect(Scrollable_Page.firstname.getText()).toEqual("first name");
        expect(Scrollable_Page.lastname.getText()).toEqual("last name");
        expect(Scrollable_Page.birthdate.getText()).toEqual("birth date");
        expect(Scrollable_Page.balance.getText()).toEqual("balance");
        expect(Scrollable_Page.email.getText()).toEqual("email");

        //Assert firstName search
        expect((Scrollable_Page.search_firstname).isPresent()).toBe(true);
        Scrollable_Page.search_firstname.sendKeys("POL");

        //Asser global search
        expect((Scrollable_Page.global_search).isPresent()).toBe(true);
        Scrollable_Page.global_search.sendKeys("bjip");

      
    })
})