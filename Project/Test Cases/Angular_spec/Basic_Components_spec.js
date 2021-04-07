//Accessing the variables from Angular_Page.js
let Angular_Page = require('../../Page Objects/Angular_Page');
let util = require('../../TestUtil');

describe("Assert Basic Components", () => {

  let originalTimeout;

  beforeEach(function () {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000000;

    //Disable AngularEnabled
    browser.waitForAngularEnabled(false);

    //Access the URL
    browser.get('https://www.globalsqa.com/angularjs-protractor-practice-site/');

    //Maximize the browser window
    browser.manage().window().maximize();

  });


  afterEach(function () {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });


  it("Assert Multiform", () => {

    //Assert multiform button
    expect(Angular_Page.multiform_button.getText()).toEqual("Multiform");

    //Click on multiform
    Angular_Page.multiform_button.click();

    //Wait for execution
    util.wait(Angular_Page.header);

    //Assert the header
    expect(Angular_Page.header.getText()).toEqual("Let's Be Friends");

    //Storing the colour after hex to Rgba conversion
    let green = util.hexToRgbA('#00BC8C');
    let black = util.hexToRgbA('#080808');

    //Assert the colour on the status button
    expect(Angular_Page.one.getCssValue('background-color')).toEqual(green);
    expect(Angular_Page.two.getCssValue('background-color')).toEqual(black);
    expect(Angular_Page.three.getCssValue('background-color')).toEqual(black);

    //Assert Name and Email
    expect(Angular_Page.Name.getText()).toEqual("Name");
    expect(Angular_Page.email.getText()).toEqual("Email");

    //Assert presence of name and email text box
    expect((Angular_Page.input_name).isPresent()).toBe(true);
    expect((Angular_Page.input_email).isPresent()).toBe(true);

    //Input name and email
    Angular_Page.input_name.click().sendKeys("Jasvinder Singh");
    Angular_Page.input_email.click().sendKeys("jasvinder1997@gmail.com");

    //Assert next button and click on it
    expect((Angular_Page.next_section).isPresent()).toBe(true);
    expect(Angular_Page.next_section.getText()).toEqual("Next Section");
    Angular_Page.next_section.click();

    //Wait for execution
    browser.sleep(5000);

    //Assert the colour on the status button
    expect(Angular_Page.one.getCssValue('background-color')).toEqual(black);
    expect(Angular_Page.two.getCssValue('background-color')).toEqual(green);
    expect(Angular_Page.three.getCssValue('background-color')).toEqual(black);

    //Wait for execution
    util.wait(Angular_Page.choice);

    //Assert Question
    expect(Angular_Page.choice.getText()).toEqual("What's Your Console of Choice?");
    expect((Angular_Page.xbox).isPresent()).toBe(true);

    //Assert provided options 
    expect(Angular_Page.xbox_ps4_text.getText()).toEqual("I like XBOX\nI like PS4");
    expect((Angular_Page.ps4).isPresent()).toBe(true);

    //Select PS4 option
    Angular_Page.ps4.click();

    //Assert next button and click on it
    expect((Angular_Page.next_section).isPresent()).toBe(true);
    expect(Angular_Page.next_section.getText()).toEqual("Next Section");
    Angular_Page.next_section.click();

    //Wait for execution
    browser.sleep(5000);

    //Assert the colour on the status button
    expect(Angular_Page.one.getCssValue('background-color')).toEqual(black);
    expect(Angular_Page.two.getCssValue('background-color')).toEqual(black);
    expect(Angular_Page.three.getCssValue('background-color')).toEqual(green);

    //Wait for execution
    util.wait(Angular_Page.description1);

    //Assert the thanking message
    expect(Angular_Page.description1.getText()).toEqual("Thanks For Your Money!");

    //Assert the submit button and click on it
    expect(Angular_Page.submit.getText()).toEqual("Submit");
    Angular_Page.submit.click();


  })

})