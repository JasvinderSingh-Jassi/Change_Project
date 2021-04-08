//Accessing the variables from Amazon_Page.js
let Amazon_Page = require('../../Page Objects/Amazon_Page');
let util = require('../../TestUtil');

describe("Amazon Homepage", () => {

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


  it("Assert Home page navigation bar", () => {

    //Assert title of webpage
    browser.getTitle().then((title) => {
      expect(title).toEqual("Online Shopping site in India: Shop Online for Mobiles, Books, Watches, Shoes and More - Amazon.in");
    });

    //Assert navigation bar
    util.wait(Amazon_Page.logo);
    expect((Amazon_Page.logo).isDisplayed()).toBe(true);
    expect(Amazon_Page.address.getText()).toEqual("Select your address");
    expect((Amazon_Page.search_box).isPresent()).toBe(true);
    expect((Amazon_Page.flag).isDisplayed()).toBe(true);
    expect(Amazon_Page.signin.getText()).toEqual("Hello, Sign in");
    expect(Amazon_Page.return_orders.getText()).toEqual("Returns\n& Orders");
    expect((Amazon_Page.cart).isDisplayed()).toBe(true);

    //Assert sub-navigation bar
    expect(Amazon_Page.all.getText()).toEqual("All");
    expect(Amazon_Page.best_seller.getText()).toEqual("Best Sellers");
    expect(Amazon_Page.mobiles.getText()).toEqual("Mobiles");
    expect(Amazon_Page.todays_deal.getText()).toEqual("Today's Deals");
    expect(Amazon_Page.fashion.getText()).toEqual("Fashion");
    expect(Amazon_Page.new_releases.getText()).toEqual("New Releases");
    expect(Amazon_Page.prime.getText()).toEqual("Prime");
    expect(Amazon_Page.customer_service.getText()).toEqual("Customer Service");
    expect(Amazon_Page.amazon_pay.getText()).toEqual("Amazon Pay");
    expect((Amazon_Page.download_app).isDisplayed()).toBe(true);

  })


  it("Functionality of navigation bar", () => {

    //Redirecting to website
    Amazon_Page.logo.click();

    //Address update section
    Amazon_Page.address.click();
    util.wait(Amazon_Page.search_input);
    Amazon_Page.search_input.sendKeys("831011");
    Amazon_Page.apply.click();

    //Search bar
    Amazon_Page.search_box_dropdown.click();
    Amazon_Page.search_input_txt.sendKeys("maths rd sharma class 10").then(() => {
    Amazon_Page.search_btn.click();
    })

    //Language select section
    Amazon_Page.flag.click();

    //Signin section
    Amazon_Page.signin.click();
    browser.get('https://www.amazon.in/');

    //Return order section
    Amazon_Page.return_orders.click();
    browser.get('https://www.amazon.in/');

    //Cart section
    Amazon_Page.cart.click();

  })


  it("Functionality of sub-navigation bar", () => {

    //All items section
    Amazon_Page.all.click();
    Amazon_Page.cancel.click();

    //Best seller section
    Amazon_Page.best_seller.click();

    //Mobiles section
    util.wait(Amazon_Page.mobiles);
    Amazon_Page.mobiles.click();

    //Todays deal section
    browser.sleep(5000);
    Amazon_Page.todays_deal.click();

    //Fashion section
    browser.sleep(5000);
    Amazon_Page.fashion.click();

    //New release section
    Amazon_Page.new_releases.click();

    //Prime section
    Amazon_Page.prime.click();

    //Electronics section
    Amazon_Page.electronics.click();

    //Customer service section 
    Amazon_Page.customer_service.click();

    //Amazon pay section
    Amazon_Page.amazon_pay.click();

    //Download app section
    Amazon_Page.download_app.click();

  })

})