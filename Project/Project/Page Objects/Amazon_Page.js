/**
 * Created by Jasvinder Singh on 6th April 2021
 * Description - Assert various functionality in Amazon ecommerce website
 * 
 */

"use strict";
let Amazon_Page = function () {

    //Homepage navigation bar
    this.logo = element(by.id("nav-logo-sprites"));
    this.address = element(by.id("glow-ingress-line2"));
    this.search_box = element(by.id("nav-search-bar-form"));
    this.flag = element(by.id("icp-nav-flyout"));
    this.signin = element(by.id("nav-link-accountList-nav-line-1"));
    this.return_orders = element(by.id("nav-orders"));
    this.cart = element(by.id("nav-cart-count"));
    this.search_input = element(by.id("GLUXZipUpdateInput"));
    this.apply = element(by.css("#GLUXZipUpdate>span>input"));
    this.search_box_dropdown = element(by.css("#searchDropdownBox>option:nth-child(11)"));
    this.search_input_txt = element(by.id("twotabsearchtextbox"));
    this.search_btn = element(by.id("nav-search-submit-button"));
    this.language_select = element(by.css("[class='a-column a-span7']>div:nth-child(1)>div>label>span"));
    this.save_changes = element(by.css("#icp-btn-save>span>input"));


    //Homepage sub-navigation bar
    this.all = element(by.css(".hm-icon-label"));
    this.best_seller = element(by.css("#nav-xshop > a:nth-child(2)"));
    this.mobiles = element(by.css("#nav-xshop > a:nth-child(3)"));
    this.todays_deal = element(by.css("#nav-xshop > a:nth-child(4)"));
    this.fashion = element(by.css("#nav-xshop > a:nth-child(5)"));
    this.new_releases = element(by.css("#nav-xshop > a:nth-child(6)"));
    this.prime = element(by.css("#nav-xshop > a:nth-child(7)>span:nth-child(1)"));
    this.electronics = element(by.css("#nav-xshop > a:nth-child(8)"));
    this.customer_service = element(by.css("#nav-xshop > a:nth-child(9)"));
    this.amazon_pay = element(by.css("#nav-xshop > a:nth-child(10)"));
    this.download_app = element(by.id("navSwmHoliday"));

    //All items section
    this.cancel = element(by.css("#hmenu-canvas-background>div"));
    this.welcome_messg = element(by.id("hmenu-customer-name"));
    this.all_content_headings1 = element(by.css("#hmenu-content>ul>li:nth-child(1)>div"));
    this.all_content_headings2 = element(by.css("#hmenu-content>ul>li:nth-child(6)>div"));
    this.all_content_headings3 = element(by.css("#hmenu-content>ul>li:nth-child(14)>div"));
    this.all_content_headings4 = element(by.css("#hmenu-content>ul:nth-child(1)>li:nth-child(22)>div"));
    this.all_content_headings5 = element(by.css("#hmenu-content>ul>li:nth-child(27)>div"));

    //Best seller section
    this.bestseller = element(by.css("#zg_tabs>ul>li>div>a"));
    this.hot_new_releases = element(by.css("#zg_tabs>ul>li:nth-child(2)>div>a"));
    this.movers_shakers = element(by.css("#zg_tabs>ul>li:nth-child(3)>div>a"));
    this.mostwishedfor = element(by.css("#zg_tabs>ul>li:nth-child(4)>div>a"));
    this.mostgifted = element(by.css("#zg_tabs>ul>li:nth-child(5)>div>a"));

    //Mobiles section
    this.mobile_assessories = element(by.css("#nav-subnav>a:nth-child(2)>span:nth-child(1)"));
    this.laptop_assessories = element(by.css("#nav-subnav>a:nth-child(3)>span:nth-child(1)"));
    this.tv_home = element(by.css("#nav-subnav>a:nth-child(4)>span:nth-child(1)"));
    this.audio = element(by.css("#nav-subnav>a:nth-child(5)>span:nth-child(1)"));
    this.cameras = element(by.css("#nav-subnav>a:nth-child(6)>span:nth-child(1)"));
    this.computer_pheripherals = element(by.css("#nav-subnav>a:nth-child(7)>span:nth-child(1)"));
    this.smart_technology = element(by.css("#nav-subnav>a:nth-child(8)>span:nth-child(1)"));
    this.musical_instrument = element(by.css("#nav-subnav>a:nth-child(9)>span:nth-child(1)"));
    this.office = element(by.css("#nav-subnav>a:nth-child(10)>span:nth-child(1)"));
};

module.exports = new Amazon_Page();