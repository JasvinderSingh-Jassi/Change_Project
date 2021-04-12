/**
 * Created by Jasvinder Singh on 11th March 2021
 * Description - Assert various functionality in WebTable Js appliaction
 * 
 */

"use strict";
let WebTable_Page = function () {

    //WebTable button
    this.webtable_button = element.all(by.css('.price_column > ul > li:nth-child(3) > a')).first();

    //table 
    this.table = element(by.css(".table"));

    //First row
    this.firstname = element(by.css(' tr:nth-child(1) > th:nth-child(1)'));
    this.lastname = element(by.css(' tr:nth-child(1) > th:nth-child(2)'));
    this.age = element(by.css(' tr:nth-child(1) > th:nth-child(3)'));
    this.email = element(by.css(' tr:nth-child(1) > th:nth-child(4)'));
    this.balance = element(by.css(' tr:nth-child(1) > th:nth-child(5)'));

    //search first name
    this.search_firstname = element(by.css("input[st-search='firstName']"));
    //search globally
    this.global_search = element(by.css("input[placeholder='global search']"));

};

module.exports = new WebTable_Page();