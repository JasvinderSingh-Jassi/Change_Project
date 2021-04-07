/**
 * Created by Jasvinder Singh on 15th March 2021
 * Description - Assert various functionality in ConsumptionCalculator Section
 * 
 */

"use strict";
let ConsumptionCalculator_Page = function () {

    //ConsumptionCalculator button
    this.ConsumptionCalculator_button = element(by.css('.price_column:nth-child(3) > ul > li:nth-child(4) > a'));
    this.header = element(by.css("header> h1"));
    this.day = element(by.css("header> p"));
    this.input1 = element.all(by.css("[name='quantity']")).get(0);

    this.input2 = element.all(by.css("[name='quantity']")).get(1);
    this.display1 = element.all(by.css("[class='warn ng-binding']")).get(0);
    this.display2 = element.all(by.css("[class='warn ng-binding']")).get(1);

};


module.exports = new ConsumptionCalculator_Page();