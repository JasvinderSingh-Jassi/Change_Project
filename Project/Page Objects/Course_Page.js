/**
 * Created by Jasvinder Singh on 23rd Febraury 2021
 * Description - Verifies the functionality of course selection
 */

 "use strict";
  let Course_Page = function() {

  //Course Selection home page navigation bar
  this.selenium_tutorial=element(by.xpath("//a[contains(text(),'Selenium Tutorial')]"));
  this.all_courses=element(by.xpath("//a[contains(text(),'All Courses')]"));
  this.lifetimemembership=element(by.xpath("//a[contains(text(),'LIFETIME MEMBERSHIP TO ALL LIVE TRAININGS')]"));
  this.blog=element(by.xpath("//a[contains(text(),'BLOGS')]"));
  this.free_course=element(by.xpath("//a[contains(text(),'FREE COURSE')]"));
  this.login=element(by.xpath("//a[contains(text(),'Login')]"));
  this.sign_up=element(by.xpath("//a[contains(text(),'Sign Up')]"));

  //Course details
  this.Course_name=element.all(by.className("course-listing-title"));
  this.Author_name=element.all(by.className("small course-author-name"));
  this.Course_price=element.all(by.className("small course-price"));

  //Assert author dropdown
  this.dropdown =element(by.css('.course-filter:nth-child(2)'));
  
  //Search for protractor related courses
  this.search=element(by.xpath("//input[@id='search-courses']"));
 
  //Selected courses
  this.selected_course1=element(by.xpath("//div[contains(text(),'Protractor: End to End testing framework for Angul')]"));     
  this.selected_course2=element(by.xpath("//div[contains(text(),'Protractor with CucumberJS BDD on a Live Project')]"));     
  this.selected_course3=element(by.xpath("//div[contains(text(),'FREE - SDET - Selenium WebDriver with Java basics,')]"));

};

//exporting the variables
module.exports = new Course_Page();