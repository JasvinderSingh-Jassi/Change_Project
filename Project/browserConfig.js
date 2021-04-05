//Running tests in chrome browser
const chrome = {
    'browserName': 'chrome',

};

//Running tests in chrome browser parallelly with 3 browser instance
const chrome_count3 = {
    'browserName': 'chrome',
    'shardTestFiles': false,

    //Browser instance count
    'maxInstances': 3
};

//Running tests in firefox browser
const firefox = {
    'browserName': 'firefox',

};

//Running tests in firefox browser parallelly with 2 browser instance
const firefox_count2 = {
    'browserName': 'firefox',
    'shardTestFiles': true,

    //Browser instance count
    'maxInstances': 2

};

//Running tests in chrome and firefox browser parallelly
const firefox_chrome = [{
        'browserName': 'chrome'
    },
    {
        'browserName': 'firefox'
    },
];

//Running tests in chrome and firefox browser parallelly with 2 browser instance for each
const firefox_chrome_count2 = [{
        'browserName': 'chrome',
        'shardTestFiles': true,

        //Browser instance count
        'maxInstances': 2
    },
    {
        'browserName': 'firefox',
        'shardTestFiles': true,

        //Browser instance count
        'maxInstances': 2
        
    },


];

module.exports = {
    chrome,
    firefox,
    firefox_chrome,
    chrome_count3,
    firefox_count2,
    firefox_chrome_count2
}