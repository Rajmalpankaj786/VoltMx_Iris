/*
 *
 *  File      : license.js
 *  Version   : 9.5.0.1
 *  TimeStamp : 21-11-2022 06:56:33 IST
 *
 */

kony = voltmx;

voltmx.license = {};
var appConfig = undefined;
voltmx.license.disableMetricReporting = function() {
    voltmx.ds.save(["true"], "LicenseDisableFlag");
}

voltmx.licensevar = {};
voltmx.licensevar.didAppWentInBackground = false;
voltmx.license.timeoutValue = 14400 ;
voltmx.license.version = "9.5.0.1";
voltmx.licensevar.currentSessionId = "";
voltmx.licensevar.latestSessionCreationTimestamp = "";
voltmx.licensevar.maxSessionCountLimit = 100;
voltmx.licensevar.changeHandlers = [];
voltmx.licensevar.isLicenseUrlAvailable = true;
voltmx.licensevar.isISTNetworkCallProcessingInProgress = false;
voltmx.licensevar.deferredNewSessionsCounter = 0;
voltmx.licensevar.isInteractive = false;
voltmx.licensevar.isPostAppInitCalled = false;
voltmx.licensevar.timesAppBecomeInteractive = 0;
voltmx.licensevar.maxDeferSessionCount = 15;
voltmx.licensevar.appLaunch = "appLaunch";

voltmx.licensevar.appStateCallbackFunction = function () {
    voltmx.licensevar.timesAppBecomeInteractive++;
    voltmx.license.log("appStateCallbackFunction:: isPostAppInitCalled :" + voltmx.licensevar.isPostAppInitCalled + " ,isInteractive :" + voltmx.licensevar.isInteractive);
    if (voltmx.licensevar.isInteractive === false) {
        voltmx.licensevar.isInteractive = true;
        voltmx.license.log("App is in interactive state");
        if (voltmx.licensevar.isPostAppInitCalled === true) {
            /* Create a new interactive session if app got launched in silent mode and later comes to postappinit due to user
            action such as clicking the notification (isAppLaunchedForInteraction callback is invoked later)*/
            voltmx.license.log("Creating and sending a new interactive session details.");
            voltmx.license.sendNewIST();
        }
    }
    else {
        voltmx.license.log("Warning: appStateCallbackFunction is called "+voltmx.licensevar.timesAppBecomeInteractive+" times, ignoring the interactive app state event");
    }
};

voltmx.licensevar.callbacksObjList = {};
voltmx.licensevar.callbacksObjList.isAppLaunchedForInteraction = {};
voltmx.licensevar.callbacksObjList.isAppLaunchedForInteraction.appStateCallbackFunction = voltmx.licensevar.appStateCallbackFunction;

voltmx.license.maxWaitTimeToHandleMultipleNewSessions = 60;

voltmx.license.constants = {};
voltmx.license.constants.THIN_CLIENT = "thinclient";
voltmx.license.constants.LAUNCH_PARAMS = "launchparams";
voltmx.license.constants.REUSABLE_SESSION_ID = "reusable_session_id";
voltmx.license.constants.KEY_KONY_LICENSE_TIMEOUT = "konyLicenseTimeout";

/*
 *  Name      : voltmx.license.setLogging
 *  Purpose   : The API enables the logs for license.js. 
 *              It should be called via devloper who is intented to debug the license flow. It can be called in the app code or through developer tools.
 *  Scenarios : i) If voltmx.license.setLogging is invoked with boolean value true , the logs will be enabled for current launch and further launch of the app
 *              ii) If voltmx.license.setLogging is invoked with boolean value false , the logs will be disabled for current launch and further launch of the app
 */
voltmx.license.setLogging = function(boolValue){
    if(boolValue === true){
        voltmx.ds.save([true], "LicenseLoggingFlag");
    }else{
        voltmx.ds.save([false], "LicenseLoggingFlag");
    }
}

voltmx.license.log = function(msg){
    try{
        var logCondition = voltmx.ds.read("LicenseLoggingFlag");
    }catch(e){
        //This might get into exception in case of SPA due to a limitaion in implementation of FTR MADPSPA-394
    }
    if (logCondition != undefined && logCondition[0] != undefined && logCondition[0]!=null && logCondition[0]===true) {
        voltmx.print("[License] :"+msg);
    }
}

voltmx.license.isLicenseUrlAvailable = function() {
    return voltmx.licensevar.isLicenseUrlAvailable;
}

voltmx.license.setIsLicenseUrlAvailable = function(value) {
    voltmx.licensevar.isLicenseUrlAvailable = value;
}

voltmx.license.getSessionId = function() {
    return voltmx.licensevar.currentSessionId;
}

/*
  voltmxUserID encrypted and saved in datastore.Used in reporting params.
 */
var voltmxUserID = function () {

    var dataStorekeys = {};
    dataStorekeys.encryptedVoltmxuserId = "voltmxUserID_ENC";
    dataStorekeys.voltmxuserId = "voltmxUserID";
    var encryptionSalt = "voltmxUserID_ENC";
    var encryptionAlgo = "aes";

    /*
     *  Name      : get
     *  Purpose   : Returns array with one element encrypted userID.
     *              Removes old key "voltmxUserID" and add new key with encrypted userid to data store for migration from old version.
     *
     *  Scenarios : i) UserID must be encrypted and saved with key voltmxUserID_ENC.
     *              ii) For upagrade to 8.4 check if all both encrypted and non-encrpyted data are going to Mf
     */
    var getVoltmxUserID = function () {
        var userInfo = new Array();
        var userId = voltmx.ds.read(dataStorekeys.encryptedVoltmxuserId);
        if (userId === undefined || userId === null || userId[0] === undefined) {
            userId = voltmx.ds.read(dataStorekeys.voltmxuserId);
            if (userId != undefined && userId != null && userId[0] != undefined) {
                userId = userId[0];
                setVoltmxUserID(userId);
                voltmx.ds.remove(dataStorekeys.voltmxuserId);
            }
            else {
                return null;
            }

        }
        else {
            userId = decryptText(userId[0], encryptionSalt, encryptionAlgo);
        }

        userInfo.push(userId);
        return userInfo;
    };

    /*
     *  Name      : set
     *  Purpose   : Saves encrypted userID in datastore
     *
     *  Scenarios : i) UserID must be encrypted and saved with key voltmxUserID_ENC
     *              ii) For upagrade to 8.4 check if all both encrypted and non-encrpyted data are going to Mf
     */
    var setVoltmxUserID = function (userId) {
        if (userId == undefined || userId == null || typeof userId !== 'string') {
            return;
        }

        var userId = encryptText(userId, encryptionSalt, encryptionAlgo);
        var userInfo = new Array();
        userInfo.push(userId);
        voltmx.ds.save(userInfo, dataStorekeys.encryptedVoltmxuserId);
    };

    /**
     * Name     : generateSecureKeyFromText
     * Purpose  : Generates key for encryption.
     */
    function generateSecureKeyFromText(salt) {
        var secureKey = salt;

        if (salt != undefined || salt != null) {
            secureKey = voltmx.crypto.newKey("passphrase", 128, {
                passphrasetext: salt,
                subalgo: encryptionAlgo,
                passphrasehashalgo: "md5"
            });
        }
        return secureKey;
    }

    /**
     * Name     : encryptText
     * Purpose  : Encrypts text with the given salt and encryptionAlgo.
     *            Channel specific  behaviour:
     *            SPA     : Saving encrypted object to DS, as convertToRawbytes not supported in SPA
     */
    function encryptText(text, salt, encryptionAlgo) {
        var channel = voltmx.os.deviceInfo().name.toString().toLowerCase();
        var secureSalt = generateSecureKeyFromText([ salt ]);
        var encryptedText = voltmx.crypto.encrypt(encryptionAlgo, secureSalt, text, {});
        if(channel !== "thinclient") {
            encryptedText = voltmx.convertToBase64(encryptedText);
        }
        return encryptedText;
    }

    /**
     * Name     : decryptText
     * Purpose  : Decrypts text with the given salt and encryptionAlgo.
     */
    function decryptText(text, salt, decryptionAlgo) {
        var channel = voltmx.os.deviceInfo().name.toString().toLowerCase();
        var secureSalt = generateSecureKeyFromText([ salt ]);
        var rawBytes = text;
        if(channel !== "thinclient") {
            rawBytes = voltmx.convertToRawBytes(text);
        }

        var decryptText =voltmx.crypto.decrypt(decryptionAlgo, secureSalt, rawBytes, {});
        return decryptText;
    }

    return {"set": setVoltmxUserID, "get": getVoltmxUserID};
}

voltmx.license.registerChangeListener = function(changeHandler) {

    if (!changeHandler) {
        return;
    }
    // We give the initial values once
    var changes = {};
    var userId = voltmxUserID().get.call(this)
    changes["sessionId"] = voltmx.licensevar.currentSessionId;
    if (userId != undefined && userId[0] != undefined && userId[0]!=null) {
        changes["userId"] = userId[0];
    }

    // Add to my listeners first and then call changeHandler with any changes
    voltmx.licensevar.changeHandlers.push(changeHandler);

    if (!voltmx.license.isNullOrUndefined(voltmx.licensevar.currentSessionId)) {
        try {
            changeHandler(changes);
        } catch (e) {
            voltmx.license.log("exception caught while calling changeHandler with changes-" + JSON.stringify(changes));
        }
    }
};

voltmx.license.notifyChangesToListeners = function() {
    for (var i = 0; i < voltmx.licensevar.changeHandlers.length; i++) {
        var changes = {};
        var userId = voltmxUserID().get.call(this);
        changes["sessionId"] = voltmx.licensevar.currentSessionId;
        if (userId != undefined && userId[0] != undefined && userId[0]!=null) {
            changes["userId"] = userId[0];
        }
        var changeHandler = voltmx.licensevar.changeHandlers[i];
        changeHandler(changes);
    }
};

/*
*  Name      : processDeferredNewSessions
*  Author    : None
*  Purpose   : Helper method to process deferred new sessions
*/

voltmx.license.processDeferredNewSessions = function () {
    voltmx.license.log("sending deferred launch date - "+voltmx.licensevar.currentSessionId);
    voltmx.licensevar.isISTNetworkCallProcessingInProgress = false;
    voltmx.licensevar.deferredNewSessionsCounter = 0;
    voltmx.license.pushVoltmxSessionsToServer(true);
}

/**
 * This function takes a value as input to check for undefined or null
 * @param value
 * @returns {boolean}
 */
 voltmx.license.isNullOrUndefined = function (value) {
    var isNullOrUndefined = false;
    if (value === undefined || value === null) {
        isNullOrUndefined = true;
    }
    return isNullOrUndefined;
}

/*
 *  Name      : voltmx.license.startLicenseService
 *  Author    : None
 *  Purpose   : Single global function which contains definitions of all required functions for session tracking.
 */
voltmx.license.startLicenseService = function() {
        "use strict";
        var deviceInfo = voltmx.os.deviceInfo();
        voltmx.license.log("startLicenseService deviceInfo " + JSON.stringify(deviceInfo));
        /*
         *  Name      : getLicenseUrl
         *  Author    : None
         *  Purpose   : Internal function to get the appropriate IST url for session calls
         */

        function getLicenseUrl() {
            var url = "";
            if (appConfig.isturlbase) {
                url = appConfig.isturlbase + "/IST";
            } else if (appConfig.secureurl) {
                url = getFromServerUrl(appConfig.secureurl, "IST");
            } else if (appConfig.url) {
                url = getFromServerUrl(appConfig.url, "IST");
            }
            return url;
        }

       
        /*
         *  Name      : getFromServerUrl
         *  Author    : None
         *  Purpose   : Helper method to form a proper url
         */

        function getFromServerUrl(url, path) {
            if (!url) {
                return null;
            }
            // ServerURL for non-mf has /mwservlet appended after the context path.
            // We need to remove it to get the base server url
            voltmx.license.log("Entering into getfromserverurl when IST-base url is not defined");
            if (deviceInfo.name === "thinclient") {
                url = url.replace(/mwservlet\/*$/i, "");
                return url + path;
            } else {
                var exactSubString = url.match(/mwservlet/i);
                var newUrl = null;
                if (exactSubString) {
                    var exactSubStringLength = "mwservlet".length;
                    var lastSubStringIndex = url.lastIndexOf(exactSubString);
                    var subString = url.slice(0, lastSubStringIndex);
                    var index = (lastSubStringIndex + exactSubStringLength);
                    var subString2 = url.slice(index, url.length);
                    var has = /[a-zA-Z0-9]/.test(subString2);
                    if (!has) {
                        newUrl = subString;
                    } else {
                        newUrl = url;
                    }
                } else {
                    newUrl = url;
                }
                return newUrl + path;
            }
        }

        function getApplicationType(name) {
            if (name === "thinclient") {
                return "spa";
            }
            var appMode = voltmx.application.getApplicationMode();
            if (appMode === constants.APPLICATION_MODE_NATIVE) {
                return "native";
            } else if (appMode === constants.APPLICATION_MODE_HYBRID) {
                return "hybrid";
            } else if (appMode === constants.APPLICATION_MODE_WRAPPER) {
                return "mixedmode";
            } else {
                return "";
            }
        }

        /*
         *  Name       : voltmx.setUserID
         *  Author     : None
         *  Purpose    : Stores the userID in device local, once set.
         *  Scenarios :  i) If voltmx.setUserID api is invoked by the developer, the userId set won't be overriden regardless 
         *                   of any number of logins.
         *               ii) If voltmx.setUserID is called from login flow, then the userId of login will be set and will 
         *                    be overriden for every subsequent login calls and direct invocation of voltmx.setUserID.
         *               iii) voltmx.setUserID api is invoked by the developer the userId for ex: 'X' will be set, again if voltmx.setUserID 
         *                    api is invoked with value ex : 'Y' then the previous value will be overriden and 
         *                    current userId will be set to 'Y'.
         */

        voltmx.setUserID = function(userId,fromLoginFlag) {
            /* fromLoginFlag is introduced to know whether the call is made from
               login flow or directly voltmx.setUserID api is invoked */
			if(fromLoginFlag == undefined || fromLoginFlag == null){
				fromLoginFlag = false;
			}

            var userIDflagGet = voltmx.ds.read("userIDFromLicenseFlag");
             /* If userIDflagGet is true ie. it is being set by invoking voltmx.setUserID directly and this function 
               is invoked from login flow, then no need to override, just return */
            if(userIDflagGet && (userIDflagGet[0] == "true") && fromLoginFlag) {
                return;
            }

            /* If the invocation is directly through calling api and not through login flow,
               set userIDFromLicenseFlag key to true so that it is not overriden by any other invocations from login flow*/

            /* userIDFromLicenseFlag is set to true only when voltmx.setUserID api is directly invoked by the developer */
            if(!fromLoginFlag) {
                var userIDflagSet = new Array;
                userIDflagSet.push("true");
                voltmx.ds.save(userIDflagSet,"userIDFromLicenseFlag");
            }

            /* sets userID in device local */
            voltmxUserID().set.call(this, userId);
            voltmx.license.notifyChangesToListeners();
        }

        voltmx.license.generateUUID = function() {
                var S4 = function() {
                    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
                };
                return (new Date().getTime() + '-' + S4() + '-' + S4() + '-' + S4());
        }
        /*
         *  Name      : voltmx.license.isCloud
         *  Author    : None
         *  Purpose   : Returns true if it is cloud enviroment, else returns false.
         */
        voltmx.license.isCloud = function() {
                //starting 6.0 the licensing approach is also applicable for On-Prem customers.Hence the license usage posting 
                //will be enabled for on-prem customers as well. So removing the check for the Kony Cloud URLs.

                var isLicenseEnabled = true;
                var LicenseCheck = voltmx.ds.read("LicenseDisableFlag");
                if (LicenseCheck && (LicenseCheck[0] === "true" || LicenseCheck === "true" ))  {
                    isLicenseEnabled = false;
                }
                if (voltmx.license.isLicenseUrlAvailable() === false) {
                    isLicenseEnabled = false;
                }
                return isLicenseEnabled;
        }

        /*
         *  Name      : voltmx.license.getCurrentDateTime
         *  Author    : None
         *  Purpose   : Returns current date and time details in required string format for service input.
         */
        voltmx.license.getCurrentDateTime = function() {
                voltmx.license.log("getCurrentDateTime..");
                var nowDate, month, formatDate;
                nowDate = new Date();
                month = nowDate.getUTCMonth() + 1;
                formatDate = (("00" + nowDate.getUTCFullYear()).slice(-4)) + "-" + (("00" + month).slice(-2)) + "-" + (("00" + nowDate.getUTCDate()).slice(-2)) + " " + (("00" + nowDate.getUTCHours()).slice(-2)) + ":" + (("00" + nowDate.getUTCMinutes()).slice(-2)) + ":" + (("00" + nowDate.getUTCSeconds()).slice(-2));
                return formatDate;
        }

        /*
         *  Name      : voltmx.license.appendLicenseTrackingKeys
         *  Author    : None
         *  Purpose   : Returns input object after appending the required tracking keys for provided input object.
         */

        voltmx.license.appendLicenseTrackingKeys = function(requestType,reportData) {
                voltmx.license.log("appendLicenseTrackingKeys deviceinfo ---> " + JSON.stringify(deviceInfo));
                var inputParams = {};
                 if (voltmx.license.isCloud() === true) {
                    inputParams.plat = deviceInfo.name;
                    if (typeof(voltmx.sdk) !== "undefined"){
                        inputParams.chnl = voltmx.sdk.getChannelType();
                        inputParams.did = voltmx.sdk.getDeviceId();
                        inputParams.plat = voltmx.sdk.getPlatformName();    
                    }
                    else{
                        //In absense of sdk [ MFSDK-2377 ],since for 7.0 viz we do not package SDK, so sdk namespace won't be available
                        //We should be okay with this hardcoding because in absence of SDK, IST call also doesn't make sense
                        //We are making this fix just for Backward compatibility of Viz Starter 7.0 Apps.
                        inputParams.chnl = "fpApp";
                        inputParams.did = "fp-"+voltmx.license.generateUUID();
                        inputParams.plat = "fp";
                    }
                    
                    inputParams.aid = appConfig.appId;
                    inputParams.aver = appConfig.appVersion;
                    inputParams.aname = appConfig.appName;
                    //adding mfaid, mfaname if konyref is available.
                    if (typeof voltmxRef !== "undefined" && voltmxRef != null && voltmxRef.mainRef) {
                        inputParams.mfaid = voltmxRef.mainRef.appId;
                        inputParams.mfbaseid = voltmxRef.mainRef.baseId;
                        inputParams.mfaname = voltmxRef.mainRef.name;
                    }
                    if (voltmx.application.getCurrentForm()) {
                        var fid = voltmx.application.getCurrentForm().id;
                        if (fid) {
                            inputParams.fid = fid;
                        }
                    }
                    inputParams.atype = getApplicationType(deviceInfo.name);
                    inputParams.os = deviceInfo.version;
                    inputParams.stype = "b2c";
                    inputParams.dm = deviceInfo.model;
                    inputParams.ua = voltmx.os.userAgent();
                    inputParams.sessiontype = voltmx.licensevar.isInteractive === true ? "I" : "NI";
                     var userId = voltmxUserID().get.call(this);
                    if (userId !== undefined && userId !== null && userId.length > 0) {
                        inputParams.kuid = userId[0];
                    } else {
                        inputParams.kuid = "";
                    }
                    if (requestType === "session") {
                        voltmx.license.checkAndCreateSession();
                        if(voltmx.licensevar.isISTNetworkCallProcessingInProgress === true || voltmx.licensevar.deferredNewSessionsCounter > 0){
                            //In case of first app laucn the voltmx.licensevar.deferredNewSessionsCounter would be 0 , so we don't need to cancel the uncommenced timer
                            if(voltmx.licensevar.deferredNewSessionsCounter > 0) {
                                try{
                                    voltmx.license.log("cancelling the previous timer, as in span of "
                                        +voltmx.license.maxWaitTimeToHandleMultipleNewSessions+ " seconds, a new IST was fired immediately");
                                    voltmx.timer.cancel("konySession"+(voltmx.licensevar.deferredNewSessionsCounter-1));
                                } catch(erObj) {
                                    voltmx.license.log("error - "+JSON.stringify(erObj)+",  while cancelling the deferred session timer" +
                                        " to send launch dates with timer id"+(voltmx.licensevar.deferredNewSessionsCounter-1));
                                }
                            }
                            voltmx.timer.schedule(("konySession"+(voltmx.licensevar.deferredNewSessionsCounter++)),
                                voltmx.license.processDeferredNewSessions, voltmx.license.maxWaitTimeToHandleMultipleNewSessions, false);
                                voltmx.license.log("another session is in progress , we will try again");
                            return {}; //returning empty voltmxReportingParams as we dont want another IST call while one IST call is in progress
                        }
                        
                        var offlineData = voltmx.license.getStoredSession();
                        inputParams.launchDates = offlineData;
                        voltmx.licensevar.isISTNetworkCallProcessingInProgress = true;
                        inputParams.svcid = "RegisterKonySession";
                        voltmx.license.log("---------->LaunchDates : " + inputParams.launchDates);
                    } else {
                        var uuid = voltmx.ds.read("konyUUID");
                        if (uuid !== undefined && uuid !== null && uuid.length > 0) {
                            inputParams.rsid = uuid[0];
                        } else {
                            inputParams.rsid = voltmx.license.generateUUID().toString();
                        }
                    }
                }
                voltmx.license.log("input params in appendLicenseTrackingKeys are " + JSON.stringify(inputParams));
                return inputParams;
            
        }

        /*
         *  Name      : voltmx.license.checkAndCreateSession
         *  Author    : None
         *  Purpose   : creates a new session (if session is not created).
         */
        voltmx.license.checkAndCreateSession = function() {
                voltmx.license.log("check and create session..");
                var uuid = voltmx.ds.read("konyUUID");
                if (uuid !== undefined && uuid !== null && uuid.length > 0) {
                   voltmx.licensevar.currentSessionId = uuid[0];
                } else {
                   voltmx.license.createSession();
                } 
        }

        voltmx.licensevar.sdkTimerCounter = 0;
        /**
         * This function prepares timer event for 4 hour delayed license call.
         * If another timer has to be scheduled, this function takes care of cancelling previous timer.
         */
        voltmx.license.prepare4HoursTimer = function () {
            voltmx.license.log("Entering prepare4HoursTimer, counter value-" + voltmx.licensevar.sdkTimerCounter);
            //In case of first app launch the voltmx.licensevar.sdkTimerCounter would be 0 , so we don't need to cancel the uncommenced timer
            if (voltmx.licensevar.sdkTimerCounter !== 0) {
                try {
                    var timerIdToCancel = voltmx.license.constants.KEY_KONY_LICENSE_TIMEOUT + (voltmx.licensevar.sdkTimerCounter - 1);
                    voltmx.timer.cancel(timerIdToCancel);
                } catch (erObj) {
                    voltmx.license.log("the error object while cancelling the timer is" + erObj);
                }
            }
        }

        /**
         * This function takes care of creating a new timer id and scheduling a new timed event
         * for new IST session to be created after 4 hours
         */
        voltmx.license.schedule4HoursTimer = function () {
            voltmx.license.log("Entering schedule4HoursTimer, counter value-" + voltmx.licensevar.sdkTimerCounter);
            var timerIdToSchedule = voltmx.license.constants.KEY_KONY_LICENSE_TIMEOUT + (voltmx.licensevar.sdkTimerCounter++);
            voltmx.timer.schedule(timerIdToSchedule, voltmx.license.sendNewIST, voltmx.license.timeoutValue, false);
        }

        /*
         *  Name      : voltmx.license.createSession
         *  Author    : None
         *  Purpose   : creates a new session (if session is not created) and sets the counter for 4hrs to call IST.
         */
        voltmx.license.createSession = function() {
            voltmx.license.prepare4HoursTimer();
            var uuid = new Array();
            voltmx.licensevar.currentSessionId = voltmx.license.generateUUID().toString();
            voltmx.licensevar.latestSessionCreationTimestamp = voltmx.license.getCurrentDateTime();
            uuid.push(voltmx.licensevar.currentSessionId);
            voltmx.ds.save(uuid, "konyUUID");
            voltmx.license.storeSession();
            voltmx.license.notifyChangesToListeners();
            voltmx.license.schedule4HoursTimer();
        }

        voltmx.license.storeSession = function(){
            var uuid = voltmx.licensevar.currentSessionId;
            var offlineData = voltmx.license.getStoredSession();
            if (offlineData === undefined || offlineData === null) {
                offlineData = new Array();
            }
            var currentSession = new Array();
            currentSession.push(uuid);
            currentSession.push(voltmx.licensevar.latestSessionCreationTimestamp);
            var sessionType = voltmx.licensevar.isInteractive === true ? "I" : "NI";
            currentSession.push(sessionType);

            if(offlineData.length === 0 || offlineData[(offlineData.length-1)][0] !== currentSession[0]){
                if(offlineData.length > 0 && voltmx.licensevar.deferredNewSessionsCounter > 0){
                    //we are dropping rapidly created sessions while already a network call is in progress. We will send only recent session.
                    offlineData.pop();
                }
                offlineData.push(currentSession);
            }else{
                voltmx.license.log("Ignoring duplicate session: "+JSON.stringify(currentSession));
                offlineData[offlineData.length - 1][2] = voltmx.licensevar.isInteractive.toString();
            }
            if(offlineData.length > voltmx.licensevar.maxSessionCountLimit){
                voltmx.license.log("Trimming to latest " + voltmx.licensevar.maxSessionCountLimit + " records, total records found - " + offlineData.length);
                var sliceValue = offlineData.length - voltmx.licensevar.maxSessionCountLimit;
                offlineData = offlineData.slice(sliceValue);
            }
            voltmx.ds.save(offlineData, "konyOfflineAccessData");
            voltmx.license.log("offlineData saved");
        };

        voltmx.license.getStoredSession = function(){
            return voltmx.ds.read("konyOfflineAccessData");
        };
            
        voltmx.license.sendNewIST = function() {
            voltmx.license.createSession();
            voltmx.license.pushVoltmxSessionsToServer(true);           
        }

        /*
         *  Name      : voltmx.license.handleISTInvocation
         *  Author    : KH2293
         *  Purpose   : handles whether or not to invoke the IST call based on session type and other parameters
         */
        voltmx.license.handleISTInvocation = function(sessionURL, input, options) {
                var storedSessions = voltmx.license.getStoredSession();
                if((!voltmx.licensevar.isInteractive && storedSessions && (storedSessions.length >= voltmx.licensevar.maxDeferSessionCount)) || voltmx.licensevar.isInteractive) {
                   voltmx.license.invokeIST(sessionURL, input, voltmx.license.licenseUsageServiceSuccessCallback, voltmx.license.licenseUsageServiceFailureCallback, options);
                } else {
                   voltmx.licensevar.isISTNetworkCallProcessingInProgress = false;
                }
        }

        /*
         *  Name      : voltmx.license.licenseUsageServiceSuccessCallback
         *  Author    : KH2321
         *  Purpose   : handles the success behaviour of IST call and clear the offline stored failed sid
         */
        voltmx.license.licenseUsageServiceSuccessCallback = function (result){
                voltmx.licensevar.isISTNetworkCallProcessingInProgress = false;
                voltmx.license.log("launch dates sent successfully. result - "+JSON.stringify(result));
                //If launchDetails are successfully logged at server. Removing offline access details.
                voltmx.ds.remove("konyOfflineAccessData");
                voltmx.ds.remove("konyOfflineSessionsCount");
        }

        /*
         *  Name      : voltmx.license.licenseUsageServiceFailureCallback
         *  Author    : KH2321
         *  Purpose   : handles the error behaviour of IST call and stores failed sid
         */
        voltmx.license.licenseUsageServiceFailureCallback = function(result)
        {       
                voltmx.licensevar.isISTNetworkCallProcessingInProgress = false;
                voltmx.license.log("launch dates weren't sent successfully. result - "+JSON.stringify(result));
                //Storing offline access time details in case of network/service issues.
                var count, offlineCount;
                //Storing the offline sessions count.
                offlineCount = voltmx.ds.read("konyOfflineSessionsCount");
                if (offlineCount === undefined || offlineCount === null || offlineCount.length < 1) {
                    offlineCount = new Array();
                    offlineCount.push(1);
                } else if (!(offlineCount[0] >= 500)) {
                    //Stop updating the count if greater than 500
                    count = offlineCount[0] + 1;
                    offlineCount[0] = count;
                }
                voltmx.ds.save(offlineCount, "konyOfflineSessionsCount");
            }

        voltmx.license.captureVoltmxLicenseUsage = function(newLaunch) {
            // we are maintaining this for FP app made on earlier release for backward compatibility
            voltmx.license.pushVoltmxSessionsToServer(newLaunch);
        }

        /*
         *  Name      : voltmx.license.pushVoltmxSessionsToServer
         *  Author    : None
         *  Purpose   : Makes service call for session tracking if the app is built with cloud environment and last access is made 30 minutes ago.
         *              Sends required tracking keys for the service.
         */
        voltmx.license.pushVoltmxSessionsToServer = function(newLaunch) {
                voltmx.license.log("capturing license information..");
                //Count session only if the time difference between last access and current access is more than 1 minute (30 minutes)
                var nowDate, lastDate, diff, sessionURL;
                var timeCheck = 1800000;
                var isNewSession = true;
                if (newLaunch === undefined || newLaunch === null) {
                    newLaunch = false;
                } else if (newLaunch !== true) {
                    newLaunch = false;
                }
                if (voltmx.license.isCloud() === false) {
                    voltmx.license.log("session tracking is turned off");
                    isNewSession = false;
                }
                if (voltmx.ds.read("konyLastAccessTime") !== undefined && voltmx.ds.read("konyLastAccessTime") !== null) {
                    nowDate = new Date();
                    lastDate = new Date(voltmx.ds.read("konyLastAccessTime")[0]);
                    diff = nowDate.getTime() - lastDate.getTime();
                    if (diff < timeCheck && newLaunch === false) {
                        isNewSession = false;
                    } else {
                        voltmx.ds.remove("konyLastAccessTime");
                    }
                }

                if (isNewSession === true) {
                    var input = {};
                    var options = {};
                    if (deviceInfo.name !== "thinclient") {
                        options["httpRequestOptions"] = [];
                        options["httpRequestOptions"]["timeoutIntervalForRequest"]=60;  
                    }
                    sessionURL = getLicenseUrl();
                    input.konyreportingparams = JSON.stringify(voltmx.license.appendLicenseTrackingKeys("session"),null);
                    options["disableIntegrity"] = true;
                    if(input.konyreportingparams !== "{}"){
                    	voltmx.license.handleISTInvocation(sessionURL, input, options);
                    }
                }
        }

        /*
         *  Name      : voltmx.license.backgroundTimeCapture
         *  Author    : None
         *  Purpose   : Stores the time stamp when app is sent to background.
         */
        voltmx.license.backgroundTimeCapture = function() {
                voltmx.license.log("app is going to background..");
                if (voltmx.license.isCloud() === true) {
                    var accessDetails = new Array();
                    accessDetails.push(new Date().toString());
                    voltmx.ds.save(accessDetails, "konyLastAccessTime");
                }
        }

        /*
         *  Name      : voltmx.license.clearLastAccess
         *  Author    : None
         *  Purpose   : Clears last access details on the termination of app.
         */
        voltmx.license.clearLastAccess = function() {
                voltmx.license.log("clear last access..");
                if (voltmx.license.isCloud() === true) {
                    voltmx.ds.remove("konyLastAccessTime");
                }
        }

        /*
         *  Name      : voltmx.license.setAppCallbacksOverride
         *  Author    : None
         *  Purpose   : Overrides the API setApplicationCallbacks. Prepends onforeground, onbackground and onappterminate events with required
         *              session tracking methods.
         */
        voltmx.license.setAppCallbacksOverride = function() {
                voltmx.license.log("overriding voltmx.application.setApplicationCallbacks..");
                var oldImplementation = voltmx.application.setApplicationCallbacks;

                function newImplementation(eventsDefinition) {
                    if (voltmx.license.isCloud() === true) {
                        if (eventsDefinition !== undefined && eventsDefinition !== null) {
                            if (eventsDefinition.onforeground !== undefined && eventsDefinition.onforeground !== null) {
                                var userForeFunction = eventsDefinition.onforeground;
                                var newForeFunction = function() {
                                    if(voltmx.licensevar.didAppWentInBackground === true){
                                        voltmx.license.pushVoltmxSessionsToServer(false);
                                    }
                                    if (deviceInfo.name !== "thinclient " && typeof(voltmx.sync) !== "undefined") {
                                        voltmx.sync.isAppInBackground = false;
                                    }
                                    voltmx.licensevar.didAppWentInBackground = false;
                                    userForeFunction();
                                };
                                eventsDefinition.onforeground = newForeFunction;
                            }
                            if (eventsDefinition.onbackground !== undefined && eventsDefinition.onbackground !== null) {
                                var userBackFunction = eventsDefinition.onbackground;
                                var newBackFunction = function() {
                                    voltmx.licensevar.didAppWentInBackground = true;
                                    voltmx.license.backgroundTimeCapture();
                                    if (typeof(voltmx.sdk) !== "undefined" && typeof(voltmx.sdk.metric) !== "undefined") {
                                        voltmx.sdk.metric.saveInDS();
                                    }
                                    if (deviceInfo.name !== "thinclient " && typeof(voltmx.sync) !== "undefined") {
                                        voltmx.sync.isAppInBackground = true;
                                    }
                                    userBackFunction();
                                };
                                eventsDefinition.onbackground = newBackFunction;
                            }
                            if (eventsDefinition.onappterminate !== undefined && eventsDefinition.onappterminate !== null) {
                                var userTerminateFunction = eventsDefinition.onappterminate;
                                var newTerminateFunction = function() {
                                    voltmx.license.clearLastAccess();
                                    if (typeof(voltmx.sdk) !== "undefined" && typeof(voltmx.sdk.metric) !== "undefined") {
                                        voltmx.sdk.metric.saveInDS();
                                    }
                                    userTerminateFunction();
                                };
                                eventsDefinition.onappterminate = newTerminateFunction;
                            }
                        }
                    }
                    return oldImplementation(eventsDefinition);
                }
                voltmx.application.setApplicationCallbacks = newImplementation;
                if (deviceInfo.name !== "thinclient ") {
                    var callbackEvents = {
                        onforeground: function() {},
                        onbackground: function() {},
                        onappterminate: function() {}
                    };

                    voltmx.application.setApplicationCallbacks(callbackEvents);
                }
        }

        /*
         *  Name      : voltmx.license.invokeServiceAsyncOverride
         *  Author    : None
         *  Purpose   : Overrides the API invokeServiceAsync. Appends tracking keys to the input param.
         */
        voltmx.license.invokeServiceAsyncOverride = function() {
                voltmx.license.log("overriding voltmx.net.invokeServiceAsync..");
                var oldImplementation = voltmx.net.invokeServiceAsync;

                function newImplementation(url, input, callback, config, requestType, reportData) {
                    if (voltmx.license.isCloud() === true) {
                        if (input === undefined || input === null) {
                            input = {};
                        }
                        if (input !== undefined && input !== null && !isGetRequest(input)) {
                            if (requestType !== undefined && requestType !== null) {
                                input.konyreportingparams = processVoltmxReportingParams(input.konyreportingparams, requestType, reportData);
                            } else {
                                input.konyreportingparams = processVoltmxReportingParams(input.konyreportingparams, null, null);
                            }
                        }
                    }
                    return oldImplementation(url, input, callback, config);

                    function processVoltmxReportingParams(params, requestType, reportData) {
                        var params2 = voltmx.license.appendLicenseTrackingKeys(requestType, reportData);
                        if (!params) {
                            return JSON.stringify(params2);
                        } else {
                            try {
                                if (typeof(params) === "string") {
                                    params = JSON.parse(params);
                                }
                                for (var key in params2) {
                                    if (typeof(params[key]) === "undefined") {
                                        params[key] = params2[key];
                                    }
                                }
                                return JSON.stringify(params);
                            } catch (e) {
                                voltmx.license.log("unable to parse params " + params);
                                return JSON.stringify(params2);
                            }


                        }
                    }

                    function isGetRequest(inputParams) {
                        if (inputParams && inputParams.httpconfig && inputParams.httpconfig.method && inputParams.httpconfig.method === "get") {
                            return true;
                        }
                        return false;
                    }
                }
                voltmx.net.invokeServiceAsync = newImplementation;
        }

        /*
         *  Name      : voltmx.license.invokeServiceSyncOverride
         *  Author    : None
         *  Purpose   : Overrides the API invokeServiceSync. Appends tracking keys to the input param.
         */
        voltmx.license.invokeServiceSyncOverride = function() {
                voltmx.license.log("overriding voltmx.net.invokeServiceSync..");
                var oldImplementation = voltmx.net.invokeServiceSync;

                function newImplementation(url, input, isblocking) {
                    if (voltmx.license.isCloud() === true) {
                        if (input === undefined || input === null) {
                            input = {};
                        }
                        if (input !== undefined && input !== null) {
                            input.konyreportingparams = JSON.stringify(voltmx.license.appendLicenseTrackingKeys(null));
                        }
                    }
                    return oldImplementation(url, input, isblocking);
                }
                voltmx.net.invokeServiceSync = newImplementation;
        }

        //The below function gets defined only in thinclient channels due to APPPLT-7291
        if (voltmx.os.deviceInfo().name === voltmx.license.constants.THIN_CLIENT) {
            /**
             * This function reads post app init argument and tries to find
             * for availability of code in params for recovery against last session.
             * In case of non-availability , this function cleans any stored resuable session
             * @param eventObject
             * @returns {boolean}
             */
            voltmx.license.doesLaunchParamsHaveCode = function (eventObject) {
                voltmx.license.log("Entering doesLaunchParamsHaveCode");
                var isCodePresentInQueryParams = !voltmx.license.isNullOrUndefined(eventObject)
                                                 && !voltmx.license.isNullOrUndefined(eventObject[voltmx.license.constants.LAUNCH_PARAMS])
                                                 && !voltmx.license.isNullOrUndefined(eventObject[voltmx.license.constants.LAUNCH_PARAMS].code);

                if (!isCodePresentInQueryParams) {
                    voltmx.license.log("code was not present in launch params");
                    voltmx.license.removeReusableSession();
                }

                voltmx.license.log("code was present in launch params");
                return isCodePresentInQueryParams;
            }

            /**
             * This function saves current session to be used in next continued app launch for login
             */
            voltmx.license.saveCurrentSessionForReuse = function () {
                voltmx.license.log("Entering saveCurrentSessionForReuse");
                var singleStoredSession = [voltmx.licensevar.currentSessionId];
                voltmx.ds.save(singleStoredSession, voltmx.license.constants.REUSABLE_SESSION_ID);
            }

            /**
             * This function does following function
             * 1.consume previously saved session in last launch & notify all listeners with this session
             * always cleans any stored resuable session
             * @returns {boolean} returns true if session was restored successfully
             */
            voltmx.license.reuseLastSession = function () {
                voltmx.license.log("Entering reuseLastSession");
                var wasAbleToReuseLastSession = false;
                var singleStoredSession = voltmx.ds.read(voltmx.license.constants.REUSABLE_SESSION_ID);

                if (!voltmx.license.isNullOrUndefined(singleStoredSession)
                    && !voltmx.license.isNullOrUndefined(singleStoredSession[0]))
                {
                    voltmx.license.log("successfully reused session");
                    voltmx.license.prepare4HoursTimer();
                    voltmx.licensevar.currentSessionId = singleStoredSession[0];
                    voltmx.license.notifyChangesToListeners();
                    wasAbleToReuseLastSession = true;
                    voltmx.license.schedule4HoursTimer();
                }

                voltmx.license.removeReusableSession();
                return wasAbleToReuseLastSession;
            }

            /**
             * This function removes single stored session from storage for clean up
             */
            voltmx.license.removeReusableSession = function (){
                voltmx.license.log("removing reusable session");
                voltmx.ds.remove(voltmx.license.constants.REUSABLE_SESSION_ID);
            }
        }


        /**
         * This function primarily sets session id & capture app launch event
         * @param postAppInitArgument
         */
        voltmx.license.prepareLicenseSessionOnPostAppInit = function (postAppInitArgument) {
            voltmx.license.log("Entering prepareLicenseSessionOnPostAppInit");
            /* MFSDK-4266 Saving app launch key-value to detect
            application launch to reset locks on application reload
            */
            voltmx.ds.save([true], voltmx.licensevar.appLaunch);

            //only for thinclient channels e.g SPA,DW
            if (voltmx.os.deviceInfo().name === voltmx.license.constants.THIN_CLIENT
                && voltmx.license.doesLaunchParamsHaveCode(postAppInitArgument))
            {
                var wasAbleToReuseLastSession =  voltmx.license.reuseLastSession();
                if(wasAbleToReuseLastSession){
                    voltmx.license.log("last session reused inside postappinit");
                    return;
                }
            }

            //sdk will not create session any more since we have to avoid creating session when SPA app is relaunched for single window login
            //license will be self sufficient to create session on post-app init from now on
            voltmx.license.log("creating new session inside postappinit");
            voltmx.license.createSession();
            
            voltmx.license.pushVoltmxSessionsToServer(true);
        }

        /*
         *  Name      : voltmx.license.setAppInitializationEventsOverride
         *  Author    : None
         *  Purpose   : Overrides the API setApplicationInitializationEvents. Prepends postappinit event with required session tracking method.
         *              If postappinit is undefiend, sets postappinit with required session tracking method.
         */
        voltmx.license.setAppInitializationEventsOverride = function() {
                var oldImplementation = voltmx.application.setApplicationInitializationEvents;
                function newImplementation(eventsDefinition) {
                    voltmx.license.log("setApplicationInitializationEvents events " + eventsDefinition);
                    voltmx.licensevar.isPostAppInitCalled = true;
                    if (voltmx.license.isCloud() === true) {
                        if (eventsDefinition !== undefined && eventsDefinition !== null) {
                            var userFunction = eventsDefinition.postappinit;
                            if (!voltmx.license.isNullOrUndefined(userFunction)) {
                                var wrapperPostAppInit = function (postAppInitArgument) {
                                    voltmx.license.prepareLicenseSessionOnPostAppInit(postAppInitArgument);
                                    var userForm = userFunction.apply(this,arguments);
                                    if (userForm !== undefined || userForm !== null) {
                                        return userForm;
                                    }
                                };
                                eventsDefinition.postappinit = wrapperPostAppInit;
                            } else {
                                eventsDefinition.postappinit = voltmx.license.prepareLicenseSessionOnPostAppInit;
                            }
                            
                            /*The below function gets defined only in thinclient channels due to APPPLT-7291
                            Below function defines appServiceAsync function, the license.js will be able to know
                            whether app was launched with code as launch params, and will ask sdk to do login.
                            The sdk will perform login and send result to license.
                            License would append login result in appServiceAsync eventObject
                             */
                            if (voltmx.os.deviceInfo().name === voltmx.license.constants.THIN_CLIENT) {
                                function doLoginWithCode(appServiceEventObjectArgument, doneCallback) {
                                    voltmx.license.log("Entering doLoginWithCode");
                                    if (!voltmx.license.doesLaunchParamsHaveCode(appServiceEventObjectArgument)) {
                                        voltmx.license.log("no code launch param found, skipping login for same window login");
                                        doneCallback();
                                    } else {
                                        voltmx.license.log("code launch param found, requesting sdk to complete login");
                                        var code = appServiceEventObjectArgument[voltmx.license.constants.LAUNCH_PARAMS].code;
                                        voltmx.sdk.completeSingleWindowLogin(code, doneCallback);
                                    }
                                }

                                var appServiceAsyncFunction = function (appServiceEventObjectArgument, callback) {
                                    voltmx.license.log("Entering appServiceAsyncFunction");
                                    doLoginWithCode(appServiceEventObjectArgument, function (loginResponse) {
                                        if (!voltmx.license.isNullOrUndefined(loginResponse)) {
                                            voltmx.license.log("appending loginResponse in eventObject");
                                            appServiceEventObjectArgument.loginResponse = loginResponse;
                                        }

                                        voltmx.license.log("Exiting appServiceAsyncFunction");
                                        callback(appServiceEventObjectArgument);
                                    })
                                };
                                
                                eventsDefinition.appServiceAsync = appServiceAsyncFunction;
                            }
                        }
                    }
                    return oldImplementation(eventsDefinition);
                }
                voltmx.application.setApplicationInitializationEvents = newImplementation;
        }
        /*
         *  Name      : voltmx.license.apiOverride
         *  Author    : None
         *  Purpose   : Sets initial application callbacks. Calls the API overriding functions
         */
       voltmx.license.apiOverride =function() {
                voltmx.license.log("Entering apiOverride..");
                //Overriding APIs
                if (deviceInfo.name !== "thinclient") {
                    voltmx.license.setAppCallbacksOverride();
                } else {
                    //in SPA/DW voltmx.application.addApplicationCallbacks function is a stub.
                    voltmx.licensevar.isInteractive = true;
                }
                voltmx.license.invokeServiceAsyncOverride();
                voltmx.license.invokeServiceSyncOverride();
                voltmx.license.setAppInitializationEventsOverride();
        }

        voltmx.license.apiOverride();
        voltmx.application.addApplicationCallbacks(voltmx.licensevar.callbacksObjList);
        if (deviceInfo.name !== "thinclient") {
            Object.seal(voltmx.license);
            Object.freeze(voltmx.license);
        }
        voltmx.license.log("license loading completed");
}

//License Network Layer
voltmx.license.invokeIST = function(url, params, successCallback, failureCallback, options) {
    if(typeof(url)==="undefined" || url === undefined || url === null || url === ""){
        failureCallback("license url can't be null or empty");
        return;
    }

    var headers = {"Content-Type":"application/x-www-form-urlencoded"};
    //voltmx.sdk can be undefined in case where sdk is absent in project eg.(fp apps of 7.x versions) or unable to load
    if(voltmx.hasOwnProperty("sdk") && voltmx.sdk.getCurrentInstance && voltmx.sdk.getCurrentInstance()){
        url = voltmx.sdk.getCurrentInstance().appendGlobalParams(url, headers, params);
    }

    var httpRequest = new voltmx.net.HttpRequest();
    if(options && options["httpRequestOptions"] && options["httpRequestOptions"] instanceof Object && options["httpRequestOptions"]["timeoutIntervalForRequest"]){
        httpRequest.timeout = options["httpRequestOptions"]["timeoutIntervalForRequest"] * 1000;
    }
    httpRequest.open("POST", url);

    function localRequestCallback(result) {
        var readyState = Number(httpRequest.readyState.toString());
        var status = Number(httpRequest.status.toString());
        voltmx.license.log("localRequestCallback in state :"+readyState+" with status :"+status);
        var response = null;
        if (readyState === 4) {
            var isFailure = true;
            if ((status >= 200 && status < 300)|| status === 504) {
                if (status!== 504){
                    try{
                        response = JSON.parse(JSON.stringify(httpRequest.response)); //copying response
                        if(typeof(response) === "string"){
                            response = JSON.parse(response);	
                        }
                        response.url = url;
                        if(response && (typeof(response.opstatus) === "undefined" || response.opstatus == 0)){
                            isFailure = false;
                        }
                    } catch (e){
                        voltmx.license.log("error while extracting response :"+e);
                    } 
                } else{
                    isFailure = false;
                }
            }
            if( isFailure === true){
                var errorResponse = {
                    "error": "failure in sending IST call with status as :" + status,
                    "url" : url
                };
                failureCallback(errorResponse);
            } else{
                successCallback(response);
            }
        }
    }

    //setting params
    paramsTable = new voltmx.net.FormData();
    for (var key in params) {
        if (typeof(params[key]) != "undefined") {
            if (typeof(params[key]) !== "string") {
                params[key] = JSON.stringify(params[key]);
            }
            paramsTable.append((key), (params[key]));
        }
    }
    voltmx.license.log("paramsTable formed is "+paramsTable.toString());
    //setting headers
    for (var headerKey in headers ) {
        if(headers.hasOwnProperty(headerKey)){
            httpRequest.setRequestHeader(headerKey , headers[headerKey]);
        }
    }   
    //setting listener
    httpRequest.onReadyStateChange = localRequestCallback;
    //disabling integrity as integrity is never supported in IST,
    //for consistency we should also not send req headers containing integrity headers even though the headers will be ignored by MW
    //This should have been done as a part of MFSDK-4957
    if (httpRequest.hasOwnProperty("disableIntegrityCheck")) {
        httpRequest.disableIntegrityCheck = true;
    }
    //sending IST
    httpRequest.send(paramsTable);
    
}


function cloudSessionCallback() {
    voltmx.license.log("Cloud session timed out.");
    voltmx.ds.remove("konyLastAccessTime");
    voltmx.ds.remove("konyUUID");
    voltmx.ds.remove("konyCustomReportData");
    voltmx.ds.remove("konyOfflineAccessData");
    voltmx.license.pushVoltmxSessionsToServer();
    voltmx.cloud.appevents.unregisterforidletimeout();
    voltmx.cloud.appevents.registerforidletimeout(30, cloudSessionCallback);
}

voltmx.license.startLicenseService();
