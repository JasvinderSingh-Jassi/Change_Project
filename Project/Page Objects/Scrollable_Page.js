/**
 * Created by Jasvinder Singh on 12th March 2021
 * Description - Assert various functionality in Scrollable section 
 * 
 */

"use strict";
let Scrollable_Page = function () {

    this.scrollable = element(by.css(".price_column:nth-child(2) > ul > li:nth-child(2) > a"));

    //First row
    this.firstname = element(by.css(' tr:nth-child(1) > th:nth-child(1)'));
    this.lastname = element(by.css(' tr:nth-child(1) > th:nth-child(2)'));
    this.birthdate = element(by.css(' tr:nth-child(1) > th:nth-child(3)'));
    this.balance = element(by.css(' tr:nth-child(1) > th:nth-child(4)'));
    this.email = element(by.css(' tr:nth-child(1) > th:nth-child(5)'));

    //search first name
    this.search_firstname = element(by.css("input[st-search='firstName']"));

    //search globally
    this.global_search = element(by.css("input[placeholder='global search']"));

    this.scroll= element.all(by.css(".ng-scope"));
    
};

module.exports = new Scrollable_Page();