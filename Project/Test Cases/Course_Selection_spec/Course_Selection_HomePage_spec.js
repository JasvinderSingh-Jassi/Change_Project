//Accessing the variables from Course_Page.js
let Course_Page = require('../../Page Objects/Course_Page');
let util = require('../../TestUtil');

describe("Assert Course selection home Page",() =>
{

  
  let originalTimeout;

  beforeEach(function() {
      originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
      jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000000;
  });

  afterEach(function() {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });

  this.getURL = () => {

    //Disable AngularEnabled
    browser.waitForAngularEnabled(false);

    //Access the URL
    browser.get('https://www.selenium-tutorial.com/');

    //Maximize the browser window
    browser.manage().window().maximize();
       
  };
 

   beforeEach(() =>{
   this.getURL();
  });

  
it("Assert home page navigation bar",() =>{

  //assert selenium tutorial navigation bar
   expect(Course_Page.selenium_tutorial.getText()).toEqual("Selenium Tutorial");

   //Wait for execution
   let until = protractor.ExpectedConditions;
   browser.wait(until.presenceOf(Course_Page.selenium_tutorial), 5000);
   
   //assert all course navigation bar
    expect(Course_Page.all_courses.getText()).toEqual("All Courses");
  
    //assert lifetimemembership navigation bar
    expect(Course_Page.lifetimemembership.getText()).toEqual("LIFETIME MEMBERSHIP TO ALL LIVE TRAININGS");
  
    //assert blog navigation bar
    expect(Course_Page.blog.getText()).toEqual("BLOGS");

    //assert free course navigation bar
    expect(Course_Page.free_course.getText()).toEqual("FREE COURSE");

    //assert login navigation bar
    expect(Course_Page.login.getText()).toEqual("Login");
     
    //assert sign up navigation bar
    expect(Course_Page.sign_up.getText()).toEqual("Sign Up");
   
})


it("functionality of home page navigation bar",() =>{

   //functionality of selenium tutorial navigation bar
   Course_Page.selenium_tutorial.click();
  
   //Wait for execution
   let until = protractor.ExpectedConditions;
   browser.wait(until.presenceOf(Course_Page.selenium_tutorial), 5000);
   
   //functionality of all_course navigation bar
    Course_Page.all_courses.click();
  
    //functionality of lifetimemembership navigation bar
    Course_Page.lifetimemembership.click();

    //Access the URL of home page
    this.getURL();
  
    //functionality of blog navigation bar
    Course_Page.blog.click();
   
    //functionality of free course navigation bar
    Course_Page.free_course.click();
   
    //functionality of login navigation bar
    Course_Page.login.click();
    browser.sleep(5000);

    //Access the URL of home page
    this.getURL();
     
    //functionality of sign up navigation bar
    Course_Page.sign_up.click();
   
})
})