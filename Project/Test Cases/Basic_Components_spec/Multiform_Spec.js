//Accessing the variables from Multiform_Page.js
let Multiform_Page = require('../../Page Objects/Multiform_Page');
let util = require('../../TestUtil');
let tc = require('../../TestConstant');

describe("Assert Multiform Section", () => {

  //Storing the colour after hex to Rgba conversion
  let green = util.hexToRgbA('#00BC8C');
  let black = util.hexToRgbA('#080808');

  let originalTimeout;

  beforeEach(function () {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000000;

    //Disable AngularEnabled
    browser.waitForAngularEnabled(false);

    //Access the URL
    browser.get(tc.URL);

    //Maximize the browser window
    browser.manage().window().maximize();



  });


  afterEach(function () {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });


  it("Assert various Multiform", () => {
    browser.sleep(5000);

    //Assert multiform button
    expect(Multiform_Page.multiform_button.getText()).toEqual("Multiform");

    //Click on multiform
    Multiform_Page.multiform_button.click();

    //Wait for execution
    util.wait(Multiform_Page.header);

    //Assert the header
    expect(Multiform_Page.header.getText()).toEqual("Let's Be Friends");

    //Assert the colour on the status button
    expect(Multiform_Page.one.getCssValue('background-color')).toEqual(green);
    expect(Multiform_Page.two.getCssValue('background-color')).toEqual(black);
    expect(Multiform_Page.three.getCssValue('background-color')).toEqual(black);

    //Assert Name and Email
    expect(Multiform_Page.Name.getText()).toEqual("Name");
    expect(Multiform_Page.email.getText()).toEqual("Email");

    //Assert presence of name and email text box
    expect((Multiform_Page.input_name).isPresent()).toBe(true);
    expect((Multiform_Page.input_email).isPresent()).toBe(true);

    //Input name and email
    Multiform_Page.input_name.click().sendKeys(tc.Name);
    Multiform_Page.input_email.click().sendKeys(tc.Email);

    //Assert next button and click on it
    expect((Multiform_Page.next_section).isPresent()).toBe(true);
    expect(Multiform_Page.next_section.getText()).toEqual("Next Section");
    Multiform_Page.next_section.click();

    //Wait for execution
    browser.wait(function () {
      return Multiform_Page.one.getCssValue('background-color').then(function (bgColor) {
        return bgColor == black;

      });
    }, 5000);

    //Assert the colour on the status button
    expect(Multiform_Page.one.getCssValue('background-color')).toEqual(black);
    expect(Multiform_Page.two.getCssValue('background-color')).toEqual(green);
    expect(Multiform_Page.three.getCssValue('background-color')).toEqual(black);

    //Wait for execution
    util.wait(Multiform_Page.choice);

    //Assert Question
    expect(Multiform_Page.choice.getText()).toEqual("What's Your Console of Choice?");
    expect((Multiform_Page.xbox).isPresent()).toBe(true);

    //Assert provided options 
    expect(Multiform_Page.xbox_ps4_text.getText()).toEqual("I like XBOX\nI like PS4");
    expect((Multiform_Page.ps4).isPresent()).toBe(true);

    //Select PS4 option
    Multiform_Page.ps4.click();

    //Assert next button and click on it
    expect((Multiform_Page.next_section).isPresent()).toBe(true);
    expect(Multiform_Page.next_section.getText()).toEqual("Next Section");
    Multiform_Page.next_section.click();

    //Wait for execution
    browser.wait(function () {
      return Multiform_Page.two.getCssValue('background-color').then(function (bgColor) {
        return bgColor == black;

      });
    }, 5000);

    //Assert the colour on the status button
    expect(Multiform_Page.one.getCssValue('background-color')).toEqual(black);
    expect(Multiform_Page.two.getCssValue('background-color')).toEqual(black);
    expect(Multiform_Page.three.getCssValue('background-color')).toEqual(green);

    //Wait for execution
    util.wait(Multiform_Page.description1);

    //Assert the thanking message
    expect(Multiform_Page.description1.getText()).toEqual("Thanks For Your Money!");

    //Wait for execution
    util.wait(Multiform_Page.submit);

    //Assert the submit button and click on it
    expect(Multiform_Page.submit.getText()).toEqual("Submit");
    Multiform_Page.submit.click();

    //Functionality of accept alert button
    browser.driver.switchTo().alert().accept();

  })

})