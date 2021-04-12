/**
 * Created by Jasvinder Singh on 15th March 2021
 * Description - Assert various functionality in SimpleCalculation Section
 * 
 */

"use strict";
let SimpleCalculator_Page = function () {

    //SimpleCalculator button
    this.SimpleCalculator_button = element(by.css('.price_column:nth-child(3) > ul > li:nth-child(3) > a'));
    this.header = element(by.css("body>h1"));
    this.inputText1 = element(by.css("[ng-model='a']"));
    this.inputText2 = element(by.css("[ng-model='b']"));
    this.operator = element(by.css("[ng-model='operation']"));
    this.result = element(by.css("[class='result ng-binding']"));
    this.increment1 = element(by.css("[ng-click='inca()']"));
    this.decrement1 = element(by.css("[ng-click='deca()']"));
    this.increment2 = element(by.css("[ng-click='incb()']"));
    this.decrement2 = element(by.css("[ng-click='decb()']"));
};


module.exports = new SimpleCalculator_Page();