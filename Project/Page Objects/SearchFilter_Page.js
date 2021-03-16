/**
 * Created by Jasvinder Singh on 11th March 2021
 * Description - Assert various functionality in SearchFilter appliaction
 * 
 */

"use strict";
let SearchFilter_Page = function () {

    //Searchfilter Components
    this.searchfilter = element(by.css('.price_column:nth-child(1) > ul > li:nth-child(4) > a'));

    //Search Payee column
    this.searchPayee = element(by.css('label[for="input1"]'));
    this.searchPayee_Text = element(by.css('#input1'));

    //Search Account column
    this.searchAccount = element(by.css("label[for='input2']"));
    this.searchAccount_Text = element(by.css('#input2'));

    //table 
    this.table = element(by.css(".table"));

    //Search Type column
    this.searchType = element(by.css("label[for='input3']"));
    this.searchType_Text = element(by.css('#input3'));

    //expenditure column
    this.expenditure = element(by.css("label[for='input4']"));
    this.expenditure_Text = element(by.css('#input4'));

    //search Results
    this.searchResult = element(by.css("body > div > h3"));

    //1st row
    this.text = element(by.css('th:nth-child(1)'));
    this.account = element(by.css('th:nth-child(2)'));
    this.type = element(by.css('th:nth-child(3)'));
    this.payee = element(by.css('th:nth-child(4)'));
    this.amount = element(by.css('th:nth-child(5)'));

};

module.exports = new SearchFilter_Page();