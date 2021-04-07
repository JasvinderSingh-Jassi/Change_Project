/**
 * Created by Jasvinder Singh on 11th March 2021
 * Description - Assert various functionality in UploadImage Section
 * 
 */

"use strict";
let UploadImage_Page = function () {

    //UploadImage section
    this.UploadImage = element(by.css(".price_column:nth-child(2) > ul > li:nth-child(3) > a"));

    //Image upload process
    this.selectImage = element(by.css("input[type='file']"));
    this.assertUpload = element(by.css("[ng-controller='UploadController '] >i"));
    this.progressbar = element(by.css("[ng-controller='UploadController '] >progress"));
    this.chooseImage = element(by.css("[ng-hide='imageSrc']"));

};


module.exports = new UploadImage_Page();