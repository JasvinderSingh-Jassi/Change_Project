//Accessing the variables from Delta_Page.js
let Delta_Page = require('../../Page Objects/Delta_Page');
let util = require('../../TestUtil');

describe("Assert and functionality check of Journey Details",() =>
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

  
it("Assert home page Journey Details",() =>{

 
  //Assert Your Destination in Journey Details
  expect(Delta_Page.To.getText()).toEqual("To\nDestination Airport or City\nYour Destination");
  
  //Assert Your Trip in Journey Details
  expect(Delta_Page.Round_trip.getText()).toEqual("Round Trip");
  
  //Assert Your Depart and Return in Journey Details
  expect(Delta_Page.Depart_return.getText()).toEqual("Depart and Return Calendar Use enter to open, escape to close the calendar, page down for next month and page up for previous month, Depart date not selected Return date not selected\nDepart\nReturn");
 
  //Assert Your Trip in Journey Details
  expect(Delta_Page.Passenger.getText()).toEqual("1 Passenger");
  


})


})

