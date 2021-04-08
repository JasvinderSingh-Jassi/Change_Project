/**
 * Created by Jasvinder Singh on 12th March 2021
 * Description - Assert various functionality in RegistrationLogin section 
 * 
 */

"use strict";
let RegistrationLogin_Page = function () {

    //RegistrationLogin section
    this.RegistrationLogin_btn = element(by.css(".price_column:nth-child(2) > ul > li:nth-child(4) > a"));

    //Login credentials
    this.username = element(by.id("username"));
    this.password = element(by.id("password"));
    this.Login = element(by.css("[type='submit']"));
    this.message = element(by.binding("flash.message"));

    //Register user
    this.register = element(by.css("[class='btn btn-link']"));
    this.firstname = element(by.id("firstName"));
    this.lastname = element(by.id("Text1"));
    this.register_user = element(by.css("[type='submit']"));
    this.LoggedIn = element(by.css(".ng-scope>p:nth-child(2)"));
    this.Logout = element(by.css(".ng-scope:nth-child(6) >a"));


};

module.exports = new RegistrationLogin_Page();