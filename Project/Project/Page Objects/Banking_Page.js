/**
 * Created by Jasvinder Singh on 12th March 2021
 * Description - Verifies the functionality of XYZ Bank application
 */

"use strict";
let XYZ_Bank_Object = function () {

  //Banking button
  this.Banking_button = element(by.css('.price_column:nth-child(3) > ul > li:nth-child(2) > a'));

  //home page
  this.home = element(by.xpath("//button[contains(text(),'Home')]"));
  this.header = element(by.xpath("//strong[contains(text(),'XYZ Bank')]"));
  this.Customer_Login = element(by.css("button[ng-click='customer()']"));
  this.Manager_Login = element(by.css("button[ng-click='manager()']"));

  //Customer login page
  this.Select_User = element(by.xpath("//select[@id='userSelect']"));
  this.Login = element(by.css("button[type='submit']"));
  this.welcome_messg = element(by.xpath("//span[contains(text(),'Ron Weasly')]"));
  this.acc_select = element(by.xpath("//select[@id='accountSelect']"));

  //Customer transaction page
  this.Customer_Transaction = element(by.css("button[ng-click='transactions()']"))
  this.Back = element(by.css("button[ng-click='back()']"));

  //Customer deposit page
  this.Customer_Deposit = element(by.css("button[ng-click='deposit()']"));
  this.amount = element(by.model("amount"));
  this.Deposit_button = element(by.className("btn btn-default"));
  this.Check_Deposit = element(by.css("span[ng-show='message']"))

  //Customer withdrawl page
  this.Customer_Withdrawl = element(by.css("button[ng-click='withdrawl()']"));
  this.Withdrawl_button = element(by.className("btn btn-default"));
  this.Check_Withdrawl = element(by.css("span[ng-show='message']"));
  this.Logout = element(by.css("button[ng-click='byebye()']"));

  //Add customer page
  this.AddCustomer = element(by.css("button[ng-click='addCust()']"));
  this.Fname = element(by.model("fName"));
  this.Lname = element(by.model("lName"));
  this.Pcode = element(by.model("postCd"));
  this.Add_Customer = element(by.className("btn btn-default"));

  //Open account page
  this.Open_Acc = element(by.css("button[ng-click='openAccount()']"));
  this.Select_Currency = element(by.xpath("//select[@id='currency']"));
  this.Process = element(by.css("button[type='submit']"));

  //Customer detail page
  this.Customers = element(by.css("button[ng-click='showCust()']"));
  this.Search = element(by.model("searchCustomer"));
  this.Delete = element(by.css("button[ng-click='deleteCust(cust)']"));


};

module.exports = new XYZ_Bank_Object();