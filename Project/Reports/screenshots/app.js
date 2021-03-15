var app = angular.module('reportingApp', []);

//<editor-fold desc="global helpers">

var isValueAnArray = function (val) {
    return Array.isArray(val);
};

var getSpec = function (str) {
    var describes = str.split('|');
    return describes[describes.length - 1];
};
var checkIfShouldDisplaySpecName = function (prevItem, item) {
    if (!prevItem) {
        item.displaySpecName = true;
    } else if (getSpec(item.description) !== getSpec(prevItem.description)) {
        item.displaySpecName = true;
    }
};

var getParent = function (str) {
    var arr = str.split('|');
    str = "";
    for (var i = arr.length - 2; i > 0; i--) {
        str += arr[i] + " > ";
    }
    return str.slice(0, -3);
};

var getShortDescription = function (str) {
    return str.split('|')[0];
};

var countLogMessages = function (item) {
    if ((!item.logWarnings || !item.logErrors) && item.browserLogs && item.browserLogs.length > 0) {
        item.logWarnings = 0;
        item.logErrors = 0;
        for (var logNumber = 0; logNumber < item.browserLogs.length; logNumber++) {
            var logEntry = item.browserLogs[logNumber];
            if (logEntry.level === 'SEVERE') {
                item.logErrors++;
            }
            if (logEntry.level === 'WARNING') {
                item.logWarnings++;
            }
        }
    }
};

var convertTimestamp = function (timestamp) {
    var d = new Date(timestamp),
        yyyy = d.getFullYear(),
        mm = ('0' + (d.getMonth() + 1)).slice(-2),
        dd = ('0' + d.getDate()).slice(-2),
        hh = d.getHours(),
        h = hh,
        min = ('0' + d.getMinutes()).slice(-2),
        ampm = 'AM',
        time;

    if (hh > 12) {
        h = hh - 12;
        ampm = 'PM';
    } else if (hh === 12) {
        h = 12;
        ampm = 'PM';
    } else if (hh === 0) {
        h = 12;
    }

    // ie: 2013-02-18, 8:35 AM
    time = yyyy + '-' + mm + '-' + dd + ', ' + h + ':' + min + ' ' + ampm;

    return time;
};

var defaultSortFunction = function sortFunction(a, b) {
    if (a.sessionId < b.sessionId) {
        return -1;
    } else if (a.sessionId > b.sessionId) {
        return 1;
    }

    if (a.timestamp < b.timestamp) {
        return -1;
    } else if (a.timestamp > b.timestamp) {
        return 1;
    }

    return 0;
};

//</editor-fold>

app.controller('ScreenshotReportController', ['$scope', '$http', 'TitleService', function ($scope, $http, titleService) {
    var that = this;
    var clientDefaults = {};

    $scope.searchSettings = Object.assign({
        description: '',
        allselected: true,
        passed: true,
        failed: true,
        pending: true,
        withLog: true
    }, clientDefaults.searchSettings || {}); // enable customisation of search settings on first page hit

    this.warningTime = 1400;
    this.dangerTime = 1900;
    this.totalDurationFormat = clientDefaults.totalDurationFormat;
    this.showTotalDurationIn = clientDefaults.showTotalDurationIn;

    var initialColumnSettings = clientDefaults.columnSettings; // enable customisation of visible columns on first page hit
    if (initialColumnSettings) {
        if (initialColumnSettings.displayTime !== undefined) {
            // initial settings have be inverted because the html bindings are inverted (e.g. !ctrl.displayTime)
            this.displayTime = !initialColumnSettings.displayTime;
        }
        if (initialColumnSettings.displayBrowser !== undefined) {
            this.displayBrowser = !initialColumnSettings.displayBrowser; // same as above
        }
        if (initialColumnSettings.displaySessionId !== undefined) {
            this.displaySessionId = !initialColumnSettings.displaySessionId; // same as above
        }
        if (initialColumnSettings.displayOS !== undefined) {
            this.displayOS = !initialColumnSettings.displayOS; // same as above
        }
        if (initialColumnSettings.inlineScreenshots !== undefined) {
            this.inlineScreenshots = initialColumnSettings.inlineScreenshots; // this setting does not have to be inverted
        } else {
            this.inlineScreenshots = false;
        }
        if (initialColumnSettings.warningTime) {
            this.warningTime = initialColumnSettings.warningTime;
        }
        if (initialColumnSettings.dangerTime) {
            this.dangerTime = initialColumnSettings.dangerTime;
        }
    }


    this.chooseAllTypes = function () {
        var value = true;
        $scope.searchSettings.allselected = !$scope.searchSettings.allselected;
        if (!$scope.searchSettings.allselected) {
            value = false;
        }

        $scope.searchSettings.passed = value;
        $scope.searchSettings.failed = value;
        $scope.searchSettings.pending = value;
        $scope.searchSettings.withLog = value;
    };

    this.isValueAnArray = function (val) {
        return isValueAnArray(val);
    };

    this.getParent = function (str) {
        return getParent(str);
    };

    this.getSpec = function (str) {
        return getSpec(str);
    };

    this.getShortDescription = function (str) {
        return getShortDescription(str);
    };
    this.hasNextScreenshot = function (index) {
        var old = index;
        return old !== this.getNextScreenshotIdx(index);
    };

    this.hasPreviousScreenshot = function (index) {
        var old = index;
        return old !== this.getPreviousScreenshotIdx(index);
    };
    this.getNextScreenshotIdx = function (index) {
        var next = index;
        var hit = false;
        while (next + 2 < this.results.length) {
            next++;
            if (this.results[next].screenShotFile && !this.results[next].pending) {
                hit = true;
                break;
            }
        }
        return hit ? next : index;
    };

    this.getPreviousScreenshotIdx = function (index) {
        var prev = index;
        var hit = false;
        while (prev > 0) {
            prev--;
            if (this.results[prev].screenShotFile && !this.results[prev].pending) {
                hit = true;
                break;
            }
        }
        return hit ? prev : index;
    };

    this.convertTimestamp = convertTimestamp;


    this.round = function (number, roundVal) {
        return (parseFloat(number) / 1000).toFixed(roundVal);
    };


    this.passCount = function () {
        var passCount = 0;
        for (var i in this.results) {
            var result = this.results[i];
            if (result.passed) {
                passCount++;
            }
        }
        return passCount;
    };


    this.pendingCount = function () {
        var pendingCount = 0;
        for (var i in this.results) {
            var result = this.results[i];
            if (result.pending) {
                pendingCount++;
            }
        }
        return pendingCount;
    };

    this.failCount = function () {
        var failCount = 0;
        for (var i in this.results) {
            var result = this.results[i];
            if (!result.passed && !result.pending) {
                failCount++;
            }
        }
        return failCount;
    };

    this.totalDuration = function () {
        var sum = 0;
        for (var i in this.results) {
            var result = this.results[i];
            if (result.duration) {
                sum += result.duration;
            }
        }
        return sum;
    };

    this.passPerc = function () {
        return (this.passCount() / this.totalCount()) * 100;
    };
    this.pendingPerc = function () {
        return (this.pendingCount() / this.totalCount()) * 100;
    };
    this.failPerc = function () {
        return (this.failCount() / this.totalCount()) * 100;
    };
    this.totalCount = function () {
        return this.passCount() + this.failCount() + this.pendingCount();
    };


    var results = [
    {
        "description": "Assert various Multiform|Assert Multiform Section",
        "passed": true,
        "pending": false,
        "os": "Windows",
        "instanceId": 21536,
        "browser": {
            "name": "chrome",
            "version": "89.0.4389.82"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://www.globalsqa.com/wp-content/cache/minify/72cc3.default.include.306296.js 0:0 Uncaught ReferenceError: jQuery is not defined",
                "timestamp": 1615819046580,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js 66:467 Uncaught P: adsbygoogle.push() error: Only one 'enable_page_level_ads' allowed per page.",
                "timestamp": 1615819049849,
                "type": ""
            }
        ],
        "screenShotFile": "images\\00570042-0059-0065-009c-0078000e0024.png",
        "timestamp": 1615819043498,
        "duration": 20916
    },
    {
        "description": "Assert various search boxes and search result|Assert SearchFilter Section",
        "passed": true,
        "pending": false,
        "os": "Windows",
        "instanceId": 21536,
        "browser": {
            "name": "chrome",
            "version": "89.0.4389.82"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://www.globalsqa.com/wp-content/cache/minify/72cc3.default.include.306296.js 0:0 Uncaught ReferenceError: jQuery is not defined",
                "timestamp": 1615819065606,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js 223:117 Uncaught P: adsbygoogle.push() error: Only one 'enable_page_level_ads' allowed per page.",
                "timestamp": 1615819065828,
                "type": ""
            }
        ],
        "screenShotFile": "images\\00af0037-007e-00df-003b-001900d50067.png",
        "timestamp": 1615819064926,
        "duration": 4948
    },
    {
        "description": "Assert various searches and data in WebTable|Assert WebTable Section",
        "passed": true,
        "pending": false,
        "os": "Windows",
        "instanceId": 21536,
        "browser": {
            "name": "chrome",
            "version": "89.0.4389.82"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js 223:117 Uncaught P: adsbygoogle.push() error: Only one 'enable_page_level_ads' allowed per page.",
                "timestamp": 1615819071293,
                "type": ""
            }
        ],
        "screenShotFile": "images\\009e0010-007b-0013-003e-0082004200e5.png",
        "timestamp": 1615819070270,
        "duration": 3258
    },
    {
        "description": "Signin with invalid username and password and assert the error labels|Assert RegistrationLogin Section",
        "passed": true,
        "pending": false,
        "os": "Windows",
        "instanceId": 21536,
        "browser": {
            "name": "chrome",
            "version": "89.0.4389.82"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js 223:117 Uncaught P: adsbygoogle.push() error: Only one 'enable_page_level_ads' allowed per page.",
                "timestamp": 1615819075171,
                "type": ""
            }
        ],
        "screenShotFile": "images\\009a0063-00bc-0000-0029-001b00a40034.png",
        "timestamp": 1615819073964,
        "duration": 9977
    },
    {
        "description": "Assert login is successful, and assert the labels shown |Assert RegistrationLogin Section",
        "passed": true,
        "pending": false,
        "os": "Windows",
        "instanceId": 21536,
        "browser": {
            "name": "chrome",
            "version": "89.0.4389.82"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://www.globalsqa.com/wp-content/cache/minify/72cc3.default.include.306296.js 0:0 Uncaught ReferenceError: jQuery is not defined",
                "timestamp": 1615819084712,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js 223:117 Uncaught P: adsbygoogle.push() error: Only one 'enable_page_level_ads' allowed per page.",
                "timestamp": 1615819084810,
                "type": ""
            }
        ],
        "screenShotFile": "images\\000500a6-005d-00ce-0023-0072003d00ad.png",
        "timestamp": 1615819084249,
        "duration": 10724
    },
    {
        "description": "Assert various search boxes and search result|Assert Scrollable Section",
        "passed": true,
        "pending": false,
        "os": "Windows",
        "instanceId": 21536,
        "browser": {
            "name": "chrome",
            "version": "89.0.4389.82"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://www.globalsqa.com/wp-content/cache/minify/72cc3.default.include.306296.js 0:0 Uncaught ReferenceError: jQuery is not defined",
                "timestamp": 1615819096170,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js 223:117 Uncaught P: adsbygoogle.push() error: Only one 'enable_page_level_ads' allowed per page.",
                "timestamp": 1615819096351,
                "type": ""
            }
        ],
        "screenShotFile": "images\\00630044-0083-002f-00d3-00d300b00066.png",
        "timestamp": 1615819095316,
        "duration": 4466
    },
    {
        "description": "Assert and upload image|Assert UploadImage Section",
        "passed": true,
        "pending": false,
        "os": "Windows",
        "instanceId": 21536,
        "browser": {
            "name": "chrome",
            "version": "89.0.4389.82"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://www.globalsqa.com/wp-content/cache/minify/72cc3.default.include.306296.js 0:0 Uncaught ReferenceError: jQuery is not defined",
                "timestamp": 1615819101258,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js 223:117 Uncaught P: adsbygoogle.push() error: Only one 'enable_page_level_ads' allowed per page.",
                "timestamp": 1615819101365,
                "type": ""
            }
        ],
        "screenShotFile": "images\\000b00bb-0026-0077-005f-0097003a00f6.png",
        "timestamp": 1615819100164,
        "duration": 3497
    },
    {
        "description": "Functionality of Customer Transaction|Functionality of XYZ Bank Customer login",
        "passed": true,
        "pending": false,
        "os": "Windows",
        "instanceId": 21536,
        "browser": {
            "name": "chrome",
            "version": "89.0.4389.82"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js 223:117 Uncaught P: adsbygoogle.push() error: Only one 'enable_page_level_ads' allowed per page.",
                "timestamp": 1615819116137,
                "type": ""
            }
        ],
        "screenShotFile": "images\\00f30082-0062-004d-006b-001e001500db.png",
        "timestamp": 1615819104027,
        "duration": 20002
    },
    {
        "description": "Functionality of Customer Deposit|Functionality of XYZ Bank Customer login",
        "passed": true,
        "pending": false,
        "os": "Windows",
        "instanceId": 21536,
        "browser": {
            "name": "chrome",
            "version": "89.0.4389.82"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js 223:117 Uncaught P: adsbygoogle.push() error: Only one 'enable_page_level_ads' allowed per page.",
                "timestamp": 1615819125082,
                "type": ""
            }
        ],
        "screenShotFile": "images\\00c700df-0023-00ac-0071-00dc00650028.png",
        "timestamp": 1615819124363,
        "duration": 2991
    },
    {
        "description": "Functionality of Customer Deposit|Functionality of XYZ Bank Customer login",
        "passed": true,
        "pending": false,
        "os": "Windows",
        "instanceId": 21536,
        "browser": {
            "name": "chrome",
            "version": "89.0.4389.82"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://www.globalsqa.com/wp-content/cache/minify/72cc3.default.include.306296.js 0:0 Uncaught ReferenceError: jQuery is not defined",
                "timestamp": 1615819128209,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js 223:117 Uncaught P: adsbygoogle.push() error: Only one 'enable_page_level_ads' allowed per page.",
                "timestamp": 1615819128411,
                "type": ""
            }
        ],
        "screenShotFile": "images\\00560010-0063-00ac-00da-00c600e2001c.png",
        "timestamp": 1615819127682,
        "duration": 2921
    },
    {
        "description": "click Home Page|XYZ Bank Home Page",
        "passed": true,
        "pending": false,
        "os": "Windows",
        "instanceId": 21536,
        "browser": {
            "name": "chrome",
            "version": "89.0.4389.82"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://www.globalsqa.com/wp-content/cache/minify/72cc3.default.include.306296.js 0:0 Uncaught ReferenceError: jQuery is not defined",
                "timestamp": 1615819131648,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js 223:117 Uncaught P: adsbygoogle.push() error: Only one 'enable_page_level_ads' allowed per page.",
                "timestamp": 1615819131824,
                "type": ""
            }
        ],
        "screenShotFile": "images\\006c004d-00ae-0091-00b0-007400d30053.png",
        "timestamp": 1615819130965,
        "duration": 1779
    },
    {
        "description": "AddCustomer section|click XYZ Bank Manager login",
        "passed": true,
        "pending": false,
        "os": "Windows",
        "instanceId": 21536,
        "browser": {
            "name": "chrome",
            "version": "89.0.4389.82"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://www.globalsqa.com/wp-content/cache/minify/72cc3.default.include.306296.js 0:0 Uncaught ReferenceError: jQuery is not defined",
                "timestamp": 1615819133720,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js 223:117 Uncaught P: adsbygoogle.push() error: Only one 'enable_page_level_ads' allowed per page.",
                "timestamp": 1615819133851,
                "type": ""
            }
        ],
        "screenShotFile": "images\\009300d3-00ab-00c8-002d-00c700b60051.png",
        "timestamp": 1615819133131,
        "duration": 2200
    },
    {
        "description": "OpenAccount section|click XYZ Bank Manager login",
        "passed": true,
        "pending": false,
        "os": "Windows",
        "instanceId": 21536,
        "browser": {
            "name": "chrome",
            "version": "89.0.4389.82"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://www.globalsqa.com/wp-content/cache/minify/72cc3.default.include.306296.js 0:0 Uncaught ReferenceError: jQuery is not defined",
                "timestamp": 1615819136529,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js 223:117 Uncaught P: adsbygoogle.push() error: Only one 'enable_page_level_ads' allowed per page.",
                "timestamp": 1615819136665,
                "type": ""
            }
        ],
        "screenShotFile": "images\\001c0093-008f-002d-00ad-00d8004500a9.png",
        "timestamp": 1615819135714,
        "duration": 2453
    },
    {
        "description": "Customers section|click XYZ Bank Manager login",
        "passed": true,
        "pending": false,
        "os": "Windows",
        "instanceId": 21536,
        "browser": {
            "name": "chrome",
            "version": "89.0.4389.82"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://www.globalsqa.com/wp-content/cache/minify/72cc3.default.include.306296.js 0:0 Uncaught ReferenceError: jQuery is not defined",
                "timestamp": 1615819139067,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js 223:117 Uncaught P: adsbygoogle.push() error: Only one 'enable_page_level_ads' allowed per page.",
                "timestamp": 1615819139191,
                "type": ""
            }
        ],
        "screenShotFile": "images\\009d00f5-0012-00ca-0049-007a00480032.png",
        "timestamp": 1615819138552,
        "duration": 2263
    },
    {
        "description": "Valid Consumption Calculations|Assert UploadImage Section",
        "passed": true,
        "pending": false,
        "os": "Windows",
        "instanceId": 21536,
        "browser": {
            "name": "chrome",
            "version": "89.0.4389.82"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://www.globalsqa.com/wp-content/cache/minify/72cc3.default.include.306296.js 0:0 Uncaught ReferenceError: jQuery is not defined",
                "timestamp": 1615819142276,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js 223:117 Uncaught P: adsbygoogle.push() error: Only one 'enable_page_level_ads' allowed per page.",
                "timestamp": 1615819142385,
                "type": ""
            }
        ],
        "screenShotFile": "images\\005a0092-0080-000a-0009-008600db001f.png",
        "timestamp": 1615819141207,
        "duration": 5136
    },
    {
        "description": "Invalid Consumption Calculations|Assert UploadImage Section",
        "passed": true,
        "pending": false,
        "os": "Windows",
        "instanceId": 21536,
        "browser": {
            "name": "chrome",
            "version": "89.0.4389.82"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://www.globalsqa.com/wp-content/cache/minify/72cc3.default.include.306296.js 0:0 Uncaught ReferenceError: jQuery is not defined",
                "timestamp": 1615819147170,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js 223:117 Uncaught P: adsbygoogle.push() error: Only one 'enable_page_level_ads' allowed per page.",
                "timestamp": 1615819147364,
                "type": ""
            }
        ],
        "screenShotFile": "images\\00bd00b8-0013-0039-00ca-00ed0085005e.png",
        "timestamp": 1615819146664,
        "duration": 3521
    },
    {
        "description": "Valid Simple Calculations|Assert UploadImage Section",
        "passed": true,
        "pending": false,
        "os": "Windows",
        "instanceId": 21536,
        "browser": {
            "name": "chrome",
            "version": "89.0.4389.82"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js 223:117 Uncaught P: adsbygoogle.push() error: Only one 'enable_page_level_ads' allowed per page.",
                "timestamp": 1615819151401,
                "type": ""
            }
        ],
        "screenShotFile": "images\\008a00bc-0010-00b1-00db-0041000500e5.png",
        "timestamp": 1615819150564,
        "duration": 3678
    },
    {
        "description": "Invalid Simple Calculations|Assert UploadImage Section",
        "passed": true,
        "pending": false,
        "os": "Windows",
        "instanceId": 21536,
        "browser": {
            "name": "chrome",
            "version": "89.0.4389.82"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://www.globalsqa.com/wp-content/cache/minify/72cc3.default.include.306296.js 0:0 Uncaught ReferenceError: jQuery is not defined",
                "timestamp": 1615819155754,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js 223:117 Uncaught P: adsbygoogle.push() error: Only one 'enable_page_level_ads' allowed per page.",
                "timestamp": 1615819155925,
                "type": ""
            }
        ],
        "screenShotFile": "images\\00770091-00fe-00ed-0030-007f00630061.png",
        "timestamp": 1615819154555,
        "duration": 2544
    }
];

    this.sortSpecs = function () {
        this.results = results.sort(function sortFunction(a, b) {
    if (a.sessionId < b.sessionId) return -1;else if (a.sessionId > b.sessionId) return 1;

    if (a.timestamp < b.timestamp) return -1;else if (a.timestamp > b.timestamp) return 1;

    return 0;
});

    };

    this.setTitle = function () {
        var title = $('.report-title').text();
        titleService.setTitle(title);
    };

    // is run after all test data has been prepared/loaded
    this.afterLoadingJobs = function () {
        this.sortSpecs();
        this.setTitle();
    };

    this.loadResultsViaAjax = function () {

        $http({
            url: './combined.json',
            method: 'GET'
        }).then(function (response) {
                var data = null;
                if (response && response.data) {
                    if (typeof response.data === 'object') {
                        data = response.data;
                    } else if (response.data[0] === '"') { //detect super escaped file (from circular json)
                        data = CircularJSON.parse(response.data); //the file is escaped in a weird way (with circular json)
                    } else {
                        data = JSON.parse(response.data);
                    }
                }
                if (data) {
                    results = data;
                    that.afterLoadingJobs();
                }
            },
            function (error) {
                console.error(error);
            });
    };


    if (clientDefaults.useAjax) {
        this.loadResultsViaAjax();
    } else {
        this.afterLoadingJobs();
    }

}]);

app.filter('bySearchSettings', function () {
    return function (items, searchSettings) {
        var filtered = [];
        if (!items) {
            return filtered; // to avoid crashing in where results might be empty
        }
        var prevItem = null;

        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            item.displaySpecName = false;

            var isHit = false; //is set to true if any of the search criteria matched
            countLogMessages(item); // modifies item contents

            var hasLog = searchSettings.withLog && item.browserLogs && item.browserLogs.length > 0;
            if (searchSettings.description === '' ||
                (item.description && item.description.toLowerCase().indexOf(searchSettings.description.toLowerCase()) > -1)) {

                if (searchSettings.passed && item.passed || hasLog) {
                    isHit = true;
                } else if (searchSettings.failed && !item.passed && !item.pending || hasLog) {
                    isHit = true;
                } else if (searchSettings.pending && item.pending || hasLog) {
                    isHit = true;
                }
            }
            if (isHit) {
                checkIfShouldDisplaySpecName(prevItem, item);

                filtered.push(item);
                prevItem = item;
            }
        }

        return filtered;
    };
});

//formats millseconds to h m s
app.filter('timeFormat', function () {
    return function (tr, fmt) {
        if(tr == null){
            return "NaN";
        }

        switch (fmt) {
            case 'h':
                var h = tr / 1000 / 60 / 60;
                return "".concat(h.toFixed(2)).concat("h");
            case 'm':
                var m = tr / 1000 / 60;
                return "".concat(m.toFixed(2)).concat("min");
            case 's' :
                var s = tr / 1000;
                return "".concat(s.toFixed(2)).concat("s");
            case 'hm':
            case 'h:m':
                var hmMt = tr / 1000 / 60;
                var hmHr = Math.trunc(hmMt / 60);
                var hmMr = hmMt - (hmHr * 60);
                if (fmt === 'h:m') {
                    return "".concat(hmHr).concat(":").concat(hmMr < 10 ? "0" : "").concat(Math.round(hmMr));
                }
                return "".concat(hmHr).concat("h ").concat(hmMr.toFixed(2)).concat("min");
            case 'hms':
            case 'h:m:s':
                var hmsS = tr / 1000;
                var hmsHr = Math.trunc(hmsS / 60 / 60);
                var hmsM = hmsS / 60;
                var hmsMr = Math.trunc(hmsM - hmsHr * 60);
                var hmsSo = hmsS - (hmsHr * 60 * 60) - (hmsMr*60);
                if (fmt === 'h:m:s') {
                    return "".concat(hmsHr).concat(":").concat(hmsMr < 10 ? "0" : "").concat(hmsMr).concat(":").concat(hmsSo < 10 ? "0" : "").concat(Math.round(hmsSo));
                }
                return "".concat(hmsHr).concat("h ").concat(hmsMr).concat("min ").concat(hmsSo.toFixed(2)).concat("s");
            case 'ms':
                var msS = tr / 1000;
                var msMr = Math.trunc(msS / 60);
                var msMs = msS - (msMr * 60);
                return "".concat(msMr).concat("min ").concat(msMs.toFixed(2)).concat("s");
        }

        return tr;
    };
});


function PbrStackModalController($scope, $rootScope) {
    var ctrl = this;
    ctrl.rootScope = $rootScope;
    ctrl.getParent = getParent;
    ctrl.getShortDescription = getShortDescription;
    ctrl.convertTimestamp = convertTimestamp;
    ctrl.isValueAnArray = isValueAnArray;
    ctrl.toggleSmartStackTraceHighlight = function () {
        var inv = !ctrl.rootScope.showSmartStackTraceHighlight;
        ctrl.rootScope.showSmartStackTraceHighlight = inv;
    };
    ctrl.applySmartHighlight = function (line) {
        if ($rootScope.showSmartStackTraceHighlight) {
            if (line.indexOf('node_modules') > -1) {
                return 'greyout';
            }
            if (line.indexOf('  at ') === -1) {
                return '';
            }

            return 'highlight';
        }
        return '';
    };
}


app.component('pbrStackModal', {
    templateUrl: "pbr-stack-modal.html",
    bindings: {
        index: '=',
        data: '='
    },
    controller: PbrStackModalController
});

function PbrScreenshotModalController($scope, $rootScope) {
    var ctrl = this;
    ctrl.rootScope = $rootScope;
    ctrl.getParent = getParent;
    ctrl.getShortDescription = getShortDescription;

    /**
     * Updates which modal is selected.
     */
    this.updateSelectedModal = function (event, index) {
        var key = event.key; //try to use non-deprecated key first https://developer.mozilla.org/de/docs/Web/API/KeyboardEvent/keyCode
        if (key == null) {
            var keyMap = {
                37: 'ArrowLeft',
                39: 'ArrowRight'
            };
            key = keyMap[event.keyCode]; //fallback to keycode
        }
        if (key === "ArrowLeft" && this.hasPrevious) {
            this.showHideModal(index, this.previous);
        } else if (key === "ArrowRight" && this.hasNext) {
            this.showHideModal(index, this.next);
        }
    };

    /**
     * Hides the modal with the #oldIndex and shows the modal with the #newIndex.
     */
    this.showHideModal = function (oldIndex, newIndex) {
        const modalName = '#imageModal';
        $(modalName + oldIndex).modal("hide");
        $(modalName + newIndex).modal("show");
    };

}

app.component('pbrScreenshotModal', {
    templateUrl: "pbr-screenshot-modal.html",
    bindings: {
        index: '=',
        data: '=',
        next: '=',
        previous: '=',
        hasNext: '=',
        hasPrevious: '='
    },
    controller: PbrScreenshotModalController
});

app.factory('TitleService', ['$document', function ($document) {
    return {
        setTitle: function (title) {
            $document[0].title = title;
        }
    };
}]);


app.run(
    function ($rootScope, $templateCache) {
        //make sure this option is on by default
        $rootScope.showSmartStackTraceHighlight = true;
        
  $templateCache.put('pbr-screenshot-modal.html',
    '<div class="modal" id="imageModal{{$ctrl.index}}" tabindex="-1" role="dialog"\n' +
    '     aria-labelledby="imageModalLabel{{$ctrl.index}}" ng-keydown="$ctrl.updateSelectedModal($event,$ctrl.index)">\n' +
    '    <div class="modal-dialog modal-lg m-screenhot-modal" role="document">\n' +
    '        <div class="modal-content">\n' +
    '            <div class="modal-header">\n' +
    '                <button type="button" class="close" data-dismiss="modal" aria-label="Close">\n' +
    '                    <span aria-hidden="true">&times;</span>\n' +
    '                </button>\n' +
    '                <h6 class="modal-title" id="imageModalLabelP{{$ctrl.index}}">\n' +
    '                    {{$ctrl.getParent($ctrl.data.description)}}</h6>\n' +
    '                <h5 class="modal-title" id="imageModalLabel{{$ctrl.index}}">\n' +
    '                    {{$ctrl.getShortDescription($ctrl.data.description)}}</h5>\n' +
    '            </div>\n' +
    '            <div class="modal-body">\n' +
    '                <img class="screenshotImage" ng-src="{{$ctrl.data.screenShotFile}}">\n' +
    '            </div>\n' +
    '            <div class="modal-footer">\n' +
    '                <div class="pull-left">\n' +
    '                    <button ng-disabled="!$ctrl.hasPrevious" class="btn btn-default btn-previous" data-dismiss="modal"\n' +
    '                            data-toggle="modal" data-target="#imageModal{{$ctrl.previous}}">\n' +
    '                        Prev\n' +
    '                    </button>\n' +
    '                    <button ng-disabled="!$ctrl.hasNext" class="btn btn-default btn-next"\n' +
    '                            data-dismiss="modal" data-toggle="modal"\n' +
    '                            data-target="#imageModal{{$ctrl.next}}">\n' +
    '                        Next\n' +
    '                    </button>\n' +
    '                </div>\n' +
    '                <a class="btn btn-primary" href="{{$ctrl.data.screenShotFile}}" target="_blank">\n' +
    '                    Open Image in New Tab\n' +
    '                    <span class="glyphicon glyphicon-new-window" aria-hidden="true"></span>\n' +
    '                </a>\n' +
    '                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</div>\n' +
     ''
  );

  $templateCache.put('pbr-stack-modal.html',
    '<div class="modal" id="modal{{$ctrl.index}}" tabindex="-1" role="dialog"\n' +
    '     aria-labelledby="stackModalLabel{{$ctrl.index}}">\n' +
    '    <div class="modal-dialog modal-lg m-stack-modal" role="document">\n' +
    '        <div class="modal-content">\n' +
    '            <div class="modal-header">\n' +
    '                <button type="button" class="close" data-dismiss="modal" aria-label="Close">\n' +
    '                    <span aria-hidden="true">&times;</span>\n' +
    '                </button>\n' +
    '                <h6 class="modal-title" id="stackModalLabelP{{$ctrl.index}}">\n' +
    '                    {{$ctrl.getParent($ctrl.data.description)}}</h6>\n' +
    '                <h5 class="modal-title" id="stackModalLabel{{$ctrl.index}}">\n' +
    '                    {{$ctrl.getShortDescription($ctrl.data.description)}}</h5>\n' +
    '            </div>\n' +
    '            <div class="modal-body">\n' +
    '                <div ng-if="$ctrl.data.trace.length > 0">\n' +
    '                    <div ng-if="$ctrl.isValueAnArray($ctrl.data.trace)">\n' +
    '                        <pre class="logContainer" ng-repeat="trace in $ctrl.data.trace track by $index"><div ng-class="$ctrl.applySmartHighlight(line)" ng-repeat="line in trace.split(\'\\n\') track by $index">{{line}}</div></pre>\n' +
    '                    </div>\n' +
    '                    <div ng-if="!$ctrl.isValueAnArray($ctrl.data.trace)">\n' +
    '                        <pre class="logContainer"><div ng-class="$ctrl.applySmartHighlight(line)" ng-repeat="line in $ctrl.data.trace.split(\'\\n\') track by $index">{{line}}</div></pre>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '                <div ng-if="$ctrl.data.browserLogs.length > 0">\n' +
    '                    <h5 class="modal-title">\n' +
    '                        Browser logs:\n' +
    '                    </h5>\n' +
    '                    <pre class="logContainer"><div class="browserLogItem"\n' +
    '                                                   ng-repeat="logError in $ctrl.data.browserLogs track by $index"><div><span class="label browserLogLabel label-default"\n' +
    '                                                                                                                             ng-class="{\'label-danger\': logError.level===\'SEVERE\', \'label-warning\': logError.level===\'WARNING\'}">{{logError.level}}</span><span class="label label-default">{{$ctrl.convertTimestamp(logError.timestamp)}}</span><div ng-repeat="messageLine in logError.message.split(\'\\\\n\') track by $index">{{ messageLine }}</div></div></div></pre>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '            <div class="modal-footer">\n' +
    '                <button class="btn btn-default"\n' +
    '                        ng-class="{active: $ctrl.rootScope.showSmartStackTraceHighlight}"\n' +
    '                        ng-click="$ctrl.toggleSmartStackTraceHighlight()">\n' +
    '                    <span class="glyphicon glyphicon-education black"></span> Smart Stack Trace\n' +
    '                </button>\n' +
    '                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</div>\n' +
     ''
  );

    });
