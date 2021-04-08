//Accessing the variables from Amazon_Page.js
const { urlIs } = require('selenium-webdriver/lib/until');
let Amazon_Page = require('../../Page Objects/Amazon_Page');
const {
    wait
} = require('../../TestUtil');
let util = require('../../TestUtil');

describe("Assert Sub-Navigation bar sections", () => {

    let originalTimeout;

    beforeEach(function () {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 100000000;

        //Disable AngularEnabled
        browser.waitForAngularEnabled(false);

        //Access the URL
        browser.get('https://www.amazon.in/');

        //Maximize the browser window
        browser.manage().window().maximize();

    });

    afterEach(function () {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });


    it("Assert All items section", () => {

        //Click on All items section
        Amazon_Page.all.click();

        //Assert welcome message
        browser.sleep(5000);
        expect(Amazon_Page.welcome_messg.getText()).toEqual("Hello, Sign in");

        //Assert all headings in the dropdown
        expect(Amazon_Page.all_content_headings1.getText()).toEqual("Trending");
        expect(Amazon_Page.all_content_headings2.getText()).toEqual("Digital Content And Devices");
        expect(Amazon_Page.all_content_headings3.getText()).toEqual("Shop By Department");
        expect(Amazon_Page.all_content_headings4.getText()).toEqual("Programs & Features");
        Amazon_Page.cancel.click();

    });


    it("Assert Bestseller Section", () => {

        //Click on best seller section
        Amazon_Page.best_seller.click();

        //Assert all navigation bar
        expect(Amazon_Page.bestseller.getText()).toEqual("Bestsellers");
        expect(Amazon_Page.hot_new_releases.getText()).toEqual("Hot New Releases");
        expect(Amazon_Page.movers_shakers.getText()).toEqual("Movers and Shakers");
        expect(Amazon_Page.mostwishedfor.getText()).toEqual("Most Wished For");
        expect(Amazon_Page.mostgifted.getText()).toEqual("Most Gifted");
    });

    it("Assert Mobiles Section", () => {

        //Click on mobiles section
        Amazon_Page.mobiles.click();

        //Assert navigation bar
        util.wait(Amazon_Page.electronics);
        expect((Amazon_Page.electronics).isDisplayed()).toBe(true);
        expect(Amazon_Page.mobile_assessories.getText()).toEqual("Mobiles & Accessories");
        expect(Amazon_Page.laptop_assessories.getText()).toEqual("Laptops & Accessories");
        expect(Amazon_Page.tv_home.getText()).toEqual("TV & Home Entertainment");
        expect(Amazon_Page.audio.getText()).toEqual("Audio");
        expect(Amazon_Page.cameras.getText()).toEqual("Cameras");
        expect(Amazon_Page.computer_pheripherals.getText()).toEqual("Computer Peripherals");
        expect(Amazon_Page.smart_technology.getText()).toEqual("Smart Technology");
        expect(Amazon_Page.musical_instrument.getText()).toEqual("Musical Instruments");
        expect(Amazon_Page.office.getText()).toEqual("Office & Stationery");
    });
})