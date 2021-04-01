//Accessing the variables from Course_Page.js
let Course_Page = require('../../Page Objects/Course_Page');


describe("Assert Course selection",() =>
{
  
  let originalTimeout;

  beforeEach(function() {
      originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
      jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000000;
  });

  afterEach(function() {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });
  
   beforeEach(() =>{
     
    //Disable AngularEnabled
    browser.waitForAngularEnabled(false);

    //Access the URL
    browser.get('https://www.selenium-tutorial.com/');

    //Maximize the browser window
    browser.manage().window().maximize();
  });
    
it("Print course details",() =>{

 //get author name
 let text= Course_Page.Author_name.getText();
 browser.sleep(5000);

  //print author name
  text.then(author_name =>{
    console.log(author_name);
  })
  browser.sleep(5000);
 
 //get course name
 let text1= Course_Page.Course_name.getText();
 browser.sleep(5000);

 //print course name
 text1.then(course_name =>{
  console.log(course_name );
})
browser.sleep(5000);

 //get course price
 let text2= Course_Page.Course_price.getText();
 browser.sleep(5000);

 //print course price
 text2.then(course_price =>{
   console.log(course_price);
 })
 browser.sleep(5000);
})

    
it("Print author name in dropdown",() =>{
Course_Page.all_courses.click();
browser.sleep(5000);

//Get author name
let text3=Course_Page.dropdown.click().getText();
browser.sleep(5000);

//print author name
text3.then(name=>{
console.log(name);

})
})


it("Assert all courses by searching protractor",() =>{

  //assert all_course section
  Course_Page.all_courses.click();
  browser.sleep(5000);

  //search protractor related courses
  Course_Page.search.click().sendKeys("protractor").click();
  browser.sleep(5000);

  //functionality of selected course
  Course_Page.selected_course1.click();
  browser.sleep(5000);

  //assert the all_course section
  Course_Page.all_courses.click();
  browser.sleep(5000);

  //search protractor related courses
  Course_Page.search.click().sendKeys("protractor").click();
  browser.sleep(5000);

  //functionality of selected course
  Course_Page.selected_course2.click();
  browser.sleep(5000);

  //assert the all_course section
  Course_Page.all_courses.click();
  browser.sleep(5000);

  //search protractor related courses
  Course_Page.search.click().sendKeys("protractor").click();
  browser.sleep(5000);

  //functionality of selected course
  Course_Page.selected_course3.click();
  browser.sleep(5000);

})
})