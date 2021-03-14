//Accessing the variables from SearchFilter_Page.js
let SearchFilter_Page = require('../../Page Objects/SearchFilter_Page');
let util = require('../../TestUtil');
let tc = require('../../TestConstant');

describe("Assert SearchFilter Section", () => {

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

        //click on Multiform button
        SearchFilter_Page.searchfilter.click();

        //Assert the page Text
        expect(SearchFilter_Page.searchPayee.getText()).toEqual("Search by Payee");
        expect(SearchFilter_Page.searchAccount.getText()).toEqual("Search By Account");
        expect(SearchFilter_Page.searchType.getText()).toEqual("Search By Type");
        expect(SearchFilter_Page.expenditure.getText()).toEqual("Search by Expenditure Payees");


        //Assert Table
        expect(SearchFilter_Page.table.isPresent()).toBe(true);
        expect(SearchFilter_Page.searchResult.getText()).toEqual("Search Results");

        //Assert 1st row
        expect(SearchFilter_Page.text.getText()).toEqual("#");
        expect(SearchFilter_Page.account.getText()).toEqual("Account");
        expect(SearchFilter_Page.type.getText()).toEqual("Type");
        expect(SearchFilter_Page.payee.getText()).toEqual("Payee");
        expect(SearchFilter_Page.amount.getText()).toEqual("Amount");


        //Assert Search Payee column
        expect(SearchFilter_Page.searchPayee_Text.isPresent()).toBe(true);
        SearchFilter_Page.searchPayee_Text.sendKeys("InternetBill");

        //Assert Search Account column
        expect(SearchFilter_Page.searchAccount_Text.isPresent()).toBe(true);
        SearchFilter_Page.searchAccount_Text.sendKeys("cash");

        //Assert Search Type column
        expect(SearchFilter_Page.searchType_Text.isPresent()).toBe(true);
        SearchFilter_Page.searchType_Text.sendKeys("expenditure");

        //Assert Search by Expenditure Payee column
        expect(SearchFilter_Page.expenditure_Text.isPresent()).toBe(true);
        SearchFilter_Page.expenditure_Text.sendKeys("InternetBill");


    })
})