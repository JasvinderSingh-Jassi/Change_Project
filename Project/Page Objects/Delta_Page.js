/**
 * Created by Jasvinder Singh on 25th Febraury 2021
 * Description - Assertion and functionality check for navigation bar in plan your next trip application
 */

"use strict";
let Delta_Page = function() {


    //Navigation bar
    this.Logo=element(by.css("img[alt='Delta Air Lines']"));
    this.Book=element(by.id("headPrimary1"));
    this.Check_in=element(by.id("headPrimary2"));
    this.My_trips=element(by.id("headPrimary3"));
    this.Flight_status=element(by.id("headPrimary4"));
    this.Travel_info=element(by.id("headSectab1"));
    this.Sky_miles=element(by.id("headSectab2"));
    this.Need_help=element(by.id("headSectab3"));
    this.Sign_up=element(by.css("a[href='/profile/enrolllanding.action']"));
    this.Login_in=element(by.css("form[name='loginForm']"));
    this.Notification_bar=element(by.css("div[class='feed-counter-text']"));
    this.Search=element(by.css("[class='d-none d-lg-block ng-tns-c0-0 ng-star-inserted']"));
    this.Search_input=element(by.id("search_input"));
    this.Search_click=element(by.css("[class='btn btn-search icon-search-icon d-none d-lg-block circle-outline']"));
    
    //Journey Details
    this.From=element(by.id("fromAirportName"));
    this.To=element(by.id("toAirportName"));
    this.Round_trip=element(by.id("selectTripType-val"));
    this.Depart_return=element(by.id("input_departureDate_1"));
    this.Passenger=element(by.id("passengers-val"));
    this.Submit=element(by.id("btn-book-submit"));

    //Various options
    this.Shop=element(by.id("shopWithMiles"));
    this.Refundable_fares=element(by.id("refundableFlightsOnly"));
    this.My_dates=element(by.id("chkFlexDate"));
    this.Advanced_search=element(by.id("adv-search"));

    //Header and sub-headers links
    this.Card_title_Link=element(by.css("h3[class='card-title brand-head-home']"));
    this.Card_text_Link=element(by.css("span[class='card-text brand-subhead-home']"));

    //Travel journey various options
    this.Learn_more=element(by.css("div[class='learnMore']"));
    this.Shop_hotel=element(by.css("li[class='shopping-link-1']"));
    this.Rent_car=element(by.css("span[class='desktop-text']"));
    this.Updated_bag=element(by.css("div[class='static-col right-band']"));

    //Header and sub-headers
    this.Heading=element(by.css("span[class='h4']"));
    this.Sub_Heading=element(by.css("h2[class='h1']"));

    //Various buttons to perform actions
    this.Cancel_button=element(by.css("span[alt='CAN I CANCEL/CHANGE MY FLIGHT?']"));
    this.Change_button=element(by.css("span[alt='HOW DO I CHANGE MY FLIGHT AND FIND MY ECREDITS?']"));
    this.Updates_button=element(by.css("span[alt='WHAT ARE THE LATEST TRAVEL UPDATES?']"));
    this.Safety_button=element(by.css("span[alt='COMMITTED TO YOUR SAFETY']"));
    this.Clean_button=element(by.css("span[alt='CLEAN TRAVEL EXPERIENCE']"));
    this.Download_button=element(by.css("span[alt='DOWNLOAD THE FLY DELTA APP']"));
    this.Book_button=element(by.css("span[alt='BOOK WITH CONFIDENCE']"));
    this.Search_topic=element(by.css("a[class='search-text']"));
    this.Popular_topic_button=element(by.css("div[class='footer-list-container']"));
    this.Need_help_button=element(by.css("a[class='popular-list-1']"));
    this.Coronavirus_button=element(by.css("a[class='popular-list-2']"));
    this.eCredits_button=element(by.css("a[class='popular-list-3']"));

    //Footer buttons
    this.About_delta=element(by.id("footertitle-about-delta"));
    this.Customer_service=element(by.id("footertitle-customer-service"));
    this.Site_support=element(by.id("footertitle-site-support"));
    this.Poloices=element(by.id("footertitle-policies"));

    //Feedback link
    this.Website_feedback=element(by.css("span[class='feedbackLink mx-auto']"));

    //Language and location select link
    this.Asia_pacific=element(by.css("span[class='lang-selection']"));

    //Social media links
    this.Facebook=element(by.id("footer-facebook"));
    this.Twitter=element(by.id("footer-twitter"));

    //Check-IN find your trip
    this.Confirmation_no=element(by.id("searchType-val"));
    this.Confirmation_dropdown0=element(by.id("ui-list-searchType0"));
    this.Confirmation_dropdown1=element(by.id("ui-list-searchType1"));
    this.Confirmation_dropdown2=element(by.id("ui-list-searchType2"));
    this.Confirmation_dropdown3=element(by.id("ui-list-searchType3"));
    this.Ex_Sftorb=element(by.id("confirmationNumber"));
    this.From_airport=element(by.id("departureAirport"));
    this.Submit_check_in=element(by.id("btn-checkin-submit"));

    //Flight Status
    this.Date=element(by.id("input_departureDate_1"));
    this.Flight_no=element(by.id("flightNo"));
    this.From_flight=element(by.id("departcitylink"));
    this.To_flight=element(by.id("arrivalcitylink"));
    this.Submit_status=element(by.id("btn-flight-sts-submit"));
       

};

//exporting the variables
module.exports = new Delta_Page();