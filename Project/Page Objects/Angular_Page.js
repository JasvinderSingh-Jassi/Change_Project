/**
 * Created by Jasvinder Singh on 10th March 2021
 * Description - Assert various functionality in Angular Js appliaction
 * 
 */

"use strict";
let Angular_Page = function () {

    //Multiform 
    this.multiform_button = element(by.css('.price_column > ul > li:nth-child(2) > a'));

    //Profile Section
    this.header = element(by.css('.page-header > h2'));
    this.one = element(by.css("[ui-sref='.profile'] > span"));
    this.two = element(by.css("[ui-sref='.interests'] > span"));
    this.three = element(by.css("[ui-sref='.payment'] > span"));
    this.Name = element(by.css('label[for="name"]'));
    this.email = element(by.css('label[for="email"]'));
    this.input_name = element(by.css('input[name="name"]'));
    this.input_email = element(by.css('input[name="email"]'));
    this.next_section = element(by.css('.btn'));
    this.description = element(by.css('.ng-binding'));

    //Interests Section
    this.choice = element(by.css("label[class='ng-scope']"));
    this.xbox = element(by.css("input[value='xbox']"));
    this.ps4 = element(by.css("input[value='ps']"));
    this.xbox_ps4_text = element(by.css("[class='form-group ng-scope']"));

    //Payment Section
    this.description1 = element(by.css('#form-views > div > h3'));
    this.submit = element(by.css("[type='submit']"));





};

module.exports = new Angular_Page();