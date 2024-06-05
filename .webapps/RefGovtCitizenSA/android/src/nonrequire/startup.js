//startup.js
var globalhttpheaders = {};
var appConfig = {
    appId: "RefGovtCitizenSA",
    appName: "RefGovtCitizenSA",
    appVersion: "1.0.0",
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
    }
};
sessionID = "";

function setAppBehaviors() {
    voltmx.application.setApplicationBehaviors({
        applyMarginPaddingInBCGMode: false,
        adherePercentageStrictly: true,
        retainSpaceOnHide: true,
        marginsIncludedInWidgetContainerWeight: true,
        isMVC: true,
        APILevel: 9500,
        isCompositeApp: true
    });
};

function themeCallBack() {
    initializeGlobalVariables();
    applicationController = require("applicationController");
    callAppMenu();
    voltmx.application.setApplicationInitializationEvents({
        init: applicationController.appInit,
        postappinit: function(eventObj) {
            return applicationController.postAppInitCallBack(eventObj);
        },
        showstartupform: function() {
            new voltmx.mvc.Navigation({
                "friendlyName": "frmLogin",
                "appName": "RefGovtCitizenSA"
            }).navigate();
        }
    });
};

function onSuccess(oldlocalname, newlocalename, info) {
    voltmx.i18n.setCurrentLocaleAsync("en", loadResources, loadResources, null);
};

function onFailure(errorcode, errormsg, info) {
    loadResources();
};

function loadResources() {
    _kony.mvc.initCompositeApp(true);
    globalhttpheaders = {};
    voltmx.os.loadLibrary({
        "javaclassname": "com.konylabs.ffi.N_KonyLogger"
    });
    voltmx.os.loadLibrary({
        "javaclassname": "com.konylabs.ffi.N_binarydata"
    });
    sdkInitConfig = {
        "appConfig": appConfig,
        "isMFApp": appConfig.isMFApp,
        "eventTypes": appConfig.eventTypes,
    }
    voltmx.theme.setCurrentTheme("default", themeCallBack, themeCallBack);
};
voltmx.application.setApplicationMode(constants.APPLICATION_MODE_NATIVE);
//This is the entry point for the application.When Locale comes,Local API call will be the entry point.
voltmx.i18n.setDefaultLocaleAsync("en", onSuccess, onFailure, null);
debugger;