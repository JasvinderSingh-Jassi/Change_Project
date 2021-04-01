//Accessing the variables from Delta_Page.js
let Delta_Page = require('../../Page Objects/Delta_Page');
let util = require('../../TestUtil');

describe("Assert and functionality check of navigation bar",() =>
{

  var originalTimeout;

  beforeEach(function() {
      originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
      jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000000;
  });

  afterEach(function() {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });
  
  this.getURL = () => {

    //Accessing the URL
    browser.get('https://www.delta.com/apac/en');

    //Maximize the browser window
    browser.manage().window().maximize();
       
  };
 

   beforeEach(() =>{
   this.getURL();
  });

  
it("Assert home page navigation bar",() =>{

    //Assert the logo 
    expect(Delta_Page.Logo.isPresent()).toBe(true);
    
    //Assert Book navigation bar 
    expect(Delta_Page.Book.getText()).toEqual("BOOK");
   
    //Assert Check-In navigation bar 
    expect(Delta_Page.Check_in.getText()).toEqual("CHECK-IN");

    //Assert My Trips navigation bar 
    expect(Delta_Page.My_trips.getText()).toEqual("MY TRIPS");

    //Assert Flight Status navigation bar 
    expect(Delta_Page.Flight_status.getText()).toEqual("FLIGHT STATUS");

    //Assert Travel Info navigation bar 
    expect(Delta_Page.Travel_info.getText()).toEqual("Travel Info");

    //Assert SkyMiles navigation bar 
    expect(Delta_Page.Sky_miles.getText()).toEqual("SkyMiles");

    //Assert Need Help navigation bar 
    expect(Delta_Page.Need_help.getText()).toEqual("Need Help?");

    //Assert Sign Up navigation bar 
    expect(Delta_Page.Sign_up.getText()).toEqual("SIGN UP");

    //Assert LOG IN navigation bar 
    expect(Delta_Page.Login_in.getText()).toEqual("LOG IN");

    //Assert Notification navigation bar 
    expect(Delta_Page.Notification_bar.isPresent()).toBe(true);

    //Assert Search navigation bar 
    expect(Delta_Page.Search.isPresent()).toBe(true);

})


it("Functionality of home page navigation bar",() =>{

    //Functionality of Delta navigation bar
    Delta_Page.Logo.click();

    //Functionality of Book navigation bar
    Delta_Page.Book.click();

    //Functionality of Check In navigation bar
    Delta_Page.Check_in.click();

    //Functionality of My Trips navigation bar
    Delta_Page.My_trips.click();

    //Functionality of Flight status navigation bar
    Delta_Page.Flight_status.click();

    //Functionality of Travel info navigation bar
    Delta_Page.Travel_info.click();

    //Functionality of Sky miles navigation bar
    Delta_Page.Sky_miles.click();

    //Functionality of Need help navigation bar
    Delta_Page.Need_help.click();

    //Functionality of Sign up navigation bar
    Delta_Page.Sign_up.click();

   //Wait for execution
   util.wait(Delta_Page.Login_in);

    //Functionality of Login_in navigation bar
    Delta_Page.Login_in.click();

    //Functionality of Delta navigation bar
    Delta_Page.Logo.click();

    //Functionality of Notification navigation bar
    Delta_Page.Notification_bar.click();

    //Accessing the home page
    this.getURL();

    //Functionality of Notification navigation bar
    Delta_Page.Search.click();

    //Sending value to search engine
    Delta_Page.Search_input.click().sendKeys("Coronavirus");

    //Clicking the search button
    Delta_Page.Search_click.click();

})

})