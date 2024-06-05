voltmx.appinit.setApplicationMetaConfiguration("appid", "RefGovtCitizenSA");
voltmx.appinit.setApplicationMetaConfiguration("build", "debug");
voltmx.appinit.setApplicationMetaConfiguration("defaultLocale", "en");
voltmx.appinit.setApplicationMetaConfiguration("locales", ["en", "es", "fr"]);
voltmx.appinit.setApplicationMetaConfiguration("i18nArray", []);
voltmx.appinit.setApplicationMetaConfiguration("localization", "true");
voltmx.appinit.setApplicationMetaConfiguration("i18nVersion", "1249838494");
//startup.js
var appConfig = {
    appId: "RefGovtCitizenSA",
    appName: "RefGovtCitizenSA",
    appVersion: "1.0.0",
    isDebug: true,
    hotReloadURL: "ws://192.168.0.116:9099",
    isMFApp: false,
    eventTypes: [],
    microApps: {
        "RefCommonsMA": {
            "appVersion": "1.0.0",
            "appId": "RefCommonsMA",
            "appName": "RefCommonsMA"
        },
        "RefEComplaintsMA": {
            "appVersion": "1.0.0",
            "appId": "RefEComplaintsMA",
            "appName": "RefEComplaintsMA"
        },
        "RefERequestsMA": {
            "appVersion": "1.0.0",
            "appId": "RefERequestsMA",
            "appName": "RefERequestsMA"
        },
        "RefGovtCitizenSA": {
            "appVersion": "1.0.0",
            "appId": "RefGovtCitizenSA",
            "appName": "RefGovtCitizenSA"
        }
    },
};
sessionID = "";

function setAppBehaviors() {
    voltmx.application.setApplicationBehaviors({
        applyMarginPaddingInBCGMode: false,
        adherePercentageStrictly: true,
        retainSpaceOnHide: true,
        isMVC: true,
        APILevel: 9500,
        FormControllerSyncLoad: false,
        strictMode: false,
        isCompositeApp: true
    })
};

function themeCallBack() {
    initializeGlobalVariables();
    requirejs.config({
        baseUrl: voltmx.appinit.getStaticContentPath() + 'spaiphone/appjs'
    });
    require(['kvmodules'], function() {
        applicationController = require("applicationController");
        callAppMenu();
        voltmx.application.setApplicationInitializationEvents({
            init: applicationController.appInit,
            postappinit: applicationController.postAppInitCallBack,
            showstartupform: function() {
                new voltmx.mvc.Navigation({
                    "friendlyName": "frmLogin",
                    "appName": "RefGovtCitizenSA"
                }).navigate();
            }
        });
    });
};

function onSuccess(oldlocalname, newlocalename, info) {
    loadResources();
};

function onFailure(errorcode, errormsg, info) {
    loadResources();
};

function loadResources() {
    _kony.mvc.initCompositeApp(true);
    voltmx.theme.packagedthemes(["default"]);
    globalhttpheaders = {};
    sdkInitConfig = {
        "appConfig": appConfig,
        "isMFApp": appConfig.isMFApp,
        "eventTypes": appConfig.eventTypes,
    }
    voltmx.theme.setCurrentTheme("default", themeCallBack, themeCallBack);
};

function initializeApp() {
    voltmx.application.setApplicationMode(constants.APPLICATION_MODE_NATIVE);
    //This is the entry point for the application.When Locale comes,Local API call will be the entry point.
    voltmx.i18n.setDefaultLocaleAsync("en", onSuccess, onFailure, null);
};
debugger;