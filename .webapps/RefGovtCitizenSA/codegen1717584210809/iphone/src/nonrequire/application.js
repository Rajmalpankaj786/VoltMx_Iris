voltmx.visualizer = {};
voltmx.visualizer.actions = {};

function displayMWError() {
    voltmx.ui.Alert("Middleware Error ", null, "error", null, null);
};

function displaySessionError() {
    voltmx.ui.Alert("Session Expired .. Please re-login", null, "error", null, null);
};

function displayError(code, msg) {
    // Commented for SWA: voltmx.ui.Alert("Error Code: "..code .." Message: " ..msg,null,"error",null,null);
    voltmx.ui.Alert(code + "- " + msg, null, "error", null, null);
};
var mergeHeaders = function(httpHeaders, globalHeaders) {
    for (var attrName in globalHeaders) {
        httpHeaders[attrName] = globalHeaders[attrName];
    }
    return httpHeaders;
};

function appmiddlewareinvoker(inputParam, isBlocking, indicator, datasetID) {
    var url = appConfig.url;
    var sessionIdKey = "cacheid";
    inputParam.appID = appConfig.appId;
    inputParam.appver = appConfig.appVersion;
    inputParam["channel"] = "rc";
    inputParam["platform"] = voltmx.os.deviceInfo().name;
    if (indicator) {
        inputParam["indicator"] = indicator;
    };
    if (datasetID) {
        inputParam["datasetID"] = datasetID;
    };
    inputParam[sessionIdKey] = sessionID;
    if (globalhttpheaders) {
        if (inputParam["httpheaders"]) {
            inputParam.httpheaders = mergeHeaders(inputParam.httpheaders, globalhttpheaders);
        } else {
            inputParam["httpheaders"] = globalhttpheaders;
        };
    };
    var resulttable = _invokeServiceSyncForMF_(url, inputParam, isBlocking);
    if (resulttable) {
        if (resulttable[sessionIdKey]) {
            sessionID = resulttable[sessionIdKey];
        };
    };
    return resulttable;
};

function appmiddlewaresecureinvoker(inputParam, isBlocking, indicator, datasetID) {
    var url = appConfig.secureurl;
    var sessionIdKey = "cacheid";
    inputParam.appID = appConfig.appId;
    inputParam.appver = appConfig.appVersion;
    inputParam["channel"] = "rc";
    inputParam["platform"] = voltmx.os.deviceInfo().name;
    if (indicator) {
        inputParam["indicator"] = indicator;
    };
    if (datasetID) {
        inputParam["datasetID"] = datasetID;
    };
    inputParam[sessionIdKey] = sessionID;
    if (globalhttpheaders) {
        if (inputParam["httpheaders"]) {
            inputParam.httpheaders = mergeHeaders(inputParam.httpheaders, globalhttpheaders);
        } else {
            inputParam["httpheaders"] = globalhttpheaders;
        };
    };
    var resulttable = _invokeServiceSyncForMF_(url, inputParam, isBlocking);
    if (resulttable) {
        if (resulttable[sessionIdKey]) {
            sessionID = resulttable[sessionIdKey];
        };
    };
    return resulttable;
};

function appmiddlewareinvokerasync(inputParam, callBack) {
    var url = appConfig.url;
    var sessionIdKey = "cacheid";
    inputParam.appID = appConfig.appId;
    inputParam.appver = appConfig.appVersion;
    inputParam["channel"] = "rc";
    inputParam["platform"] = voltmx.os.deviceInfo().name;
    inputParam[sessionIdKey] = sessionID;
    if (globalhttpheaders) {
        if (inputParam["httpheaders"]) {
            inputParam.httpheaders = mergeHeaders(inputParam.httpheaders, globalhttpheaders);
        } else {
            inputParam.httpheaders = globalhttpheaders;
        };
    };
    var connHandle = _invokeServiceAsyncForMF_(url, inputParam, callBack);
    return connHandle;
};

function appmiddlewaresecureinvokerasync(inputParam, callBack) {
    var url = appConfig.secureurl;
    var sessionIdKey = "cacheid";
    inputParam.appID = appConfig.appId;
    inputParam.appver = appConfig.appVersion;
    inputParam["channel"] = "rc";
    inputParam["platform"] = voltmx.os.deviceInfo().name;
    inputParam[sessionIdKey] = sessionID;
    if (globalhttpheaders) {
        if (inputParam["httpheaders"]) {
            inputParam.httpheaders = mergeHeaders(inputParam.httpheaders, globalhttpheaders);
        } else {
            inputParam["httpheaders"] = globalhttpheaders;
        };
    };
    var connHandle = _invokeServiceAsyncForMF_(url, inputParam, callBack);
    return connHandle;
};

function mfgetidentityservice(idProviderName) {
    var currentInstance = voltmx.sdk.getCurrentInstance();
    if (!currentInstance) {
        throw new Exception("INIT_FAILURE", "Please call init before getting identity provider");
    }
    return currentInstance.getIdentityService(idProviderName);
};
/**
 * @function mfidentityserviceinvoker
 * @description Invokes identity service
 * @public
 * @param {string} idProviderName
 * @param {object} params {userid : <userid>, password : <password>, browserWidget : <browserwidget>, operation : "login/logout"}
 * and other optional params like callerID and custom params in case of custom provider.
 * @param {function} successCallback
 * @param {function} failureCallback
 */
function mfidentityserviceinvoker(idProviderName, params, successCallback, failureCallback) {
    var authorizationClient = mfgetidentityservice(idProviderName);
    voltmx.print("Invoking identity service " + idProviderName + " through Foundry.");
    if (!params.operation || params.operation == "login") {
        authorizationClient.login(params, successCallback, failureCallback);
    } else {
        authorizationClient.logout(successCallback, failureCallback, params);
    }
};

function mfintegrationsecureinvokerasync(inputParam, serviceID, operationID, callBack) {
    var url = appConfig.secureurl;
    var sessionIdKey = "cacheid";
    inputParam.appID = appConfig.appId;
    inputParam.appver = appConfig.appVersion;
    inputParam["channel"] = "rc";
    inputParam["platform"] = voltmx.os.deviceInfo().name;
    inputParam[sessionIdKey] = sessionID;
    if (globalhttpheaders) {
        if (inputParam["httpheaders"]) {
            inputParam.httpheaders = mergeHeaders(inputParam.httpheaders, globalhttpheaders);
        } else {
            inputParam["httpheaders"] = mergeHeaders({}, globalhttpheaders);
        };
    };
    voltmx.print("Async : Invoking service through Foundry with url : " + url + " service id : " + serviceID + " operationid : " + operationID + "\n input params" + JSON.stringify(inputParam));
    if (voltmx.mbaas) {
        voltmx.mbaas.invokeMbaasServiceFromVoltmx(url, inputParam, serviceID, operationID, callBack);
    } else {
        alert("Unable to find the Foundry SDK for Iris. Please download the SDK from the HCL Volt MX Cloud Console and add as module to the HCL Project.");
    }
};

function mfintegrationsecureinvokersync(inputParam, serviceID, operationID) {
    var url = appConfig.secureurl;
    var sessionIdKey = "cacheid";
    var resulttable;
    inputParam.appID = appConfig.appId;
    inputParam.appver = appConfig.appVersion;
    inputParam["channel"] = "rc";
    inputParam["platform"] = voltmx.os.deviceInfo().name;
    inputParam[sessionIdKey] = sessionID;
    if (globalhttpheaders) {
        if (inputParam["httpheaders"]) {
            inputParam.httpheaders = mergeHeaders(inputParam.httpheaders, globalhttpheaders);
        } else {
            inputParam["httpheaders"] = mergeHeaders({}, globalhttpheaders);
        };
    };
    voltmx.print("Invoking service through Foundry with url : " + url + " service id : " + serviceID + " operationid : " + operationID + "\n input params" + JSON.stringify(inputParam));
    if (voltmx.mbaas) {
        resulttable = voltmx.mbaas.invokeMbaasServiceFromVoltmxSync(url, inputParam, serviceID, operationID);
        voltmx.print("Result table for service id : " + serviceID + " operationid : " + operationID + " : " + JSON.stringify(resulttable));
    } else {
        alert("Unable to find the Foundry SDK for Iris. Please download the SDK from the Iris Cloud Console and add as module to the Iris Project.");
    }
    return resulttable;
};
_invokeServiceAsyncForMF_ = function(url, inputParam, callBack, info) {
    var operationID = inputParam["serviceID"];
    if (!operationID) {
        resulttable = voltmx.net.invokeServiceAsync(url, inputParam, callBack, info);
    } else {
        var _mfServicesMap_ = {};
        voltmx.print("Getting serviceID for : " + operationID);
        var serviceID = _mfServicesMap_[operationID] && _mfServicesMap_[operationID]["servicename"];
        voltmx.print("Got serviceID for : " + operationID + " : " + serviceID);
        voltmx.print("Async : Invoking service through Foundry with url : " + url + " service id : " + serviceID + " operationid : " + operationID + "\n input params" + JSON.stringify(inputParam));
        if (serviceID && operationID) {
            var url = appConfig.secureurl;
            if (voltmx.mbaas) {
                voltmx.mbaas.invokeMbaasServiceFromVoltmx(url, inputParam, serviceID, operationID, callBack, info);
            } else {
                alert("Unable to find the Foundry SDK for Iris. Please download the SDK from the Iris Cloud Console and add as module to the Iris Project.");
            }
        } else {
            resulttable = voltmx.net.invokeServiceAsync(url, inputParam, callBack, info);
        }
    }
};
_invokeServiceSyncForMF_ = function(url, inputParam, isBlocking, info) {
    var resulttable;
    var operationID = inputParam["serviceID"];
    if (!operationID) {
        resulttable = voltmx.net.invokeService(url, inputParam, isBlocking);
    } else {
        var _mfServicesMap_ = {};
        voltmx.print("Getting serviceID for : " + operationID);
        var serviceID = _mfServicesMap_[operationID] && _mfServicesMap_[operationID]["servicename"];
        voltmx.print("Got serviceID for : " + operationID + " : " + serviceID);
        voltmx.print("Invoking service through Foundry with url : " + url + " service id : " + serviceID + " operationid : " + operationID + "\n input params" + JSON.stringify(inputParam));
        if (serviceID && operationID) {
            var url = appConfig.secureurl;
            if (voltmx.mbaas) {
                resulttable = voltmx.mbaas.invokeMbaasServiceFromVoltmxSync(url, inputParam, serviceID, operationID, info);
                voltmx.print("Result table for service id : " + serviceID + " operationid : " + operationID + " : " + JSON.stringify(resulttable));
            } else {
                alert("Unable to find the Foundry SDK for Iris. Please download the SDK from the Iris Console and add as module to the Iris.");
            }
        } else {
            resulttable = voltmx.net.invokeService(url, inputParam, isBlocking);
        }
    }
    return resulttable;
};
/*
   Sample invocation code
   var inputparam = {};
   inputparam.options = {
       "access": "online",
       "CRUD_TYPE": "get",//get/create..
       "odataurl": "$filter=UserId eq xxx",
       "data" : {a:1,b:2}//in case of create/update
   };
*/
function mfobjectsecureinvokerasync(inputParam, serviceID, objectID, callBack) {
    var options = {
        "access": inputParam.options.access
    };
    var serviceObj = voltmx.sdk.getCurrentInstance().getObjectService(serviceID, options);
    var CRUD_TYPE = inputParam.options.CRUD_TYPE;
    var dataObject = new voltmx.sdk.dto.DataObject(objectID);
    var headers = inputParam.httpheaders || {};
    switch (CRUD_TYPE) {
        case 'get':
            if (inputParam.options && inputParam.options.odataurl) dataObject.setOdataUrl(inputParam.options.odataurl.toString());
            options = {
                "dataObject": dataObject,
                "headers": headers
            };
            serviceObj.fetch(options, callBack, callBack);
            break;
        case 'create':
            var data = inputParam.options && inputParam.options.data || {};
            var key;
            for (key in data) {
                dataObject.addField(key, data[key]);
            }
            options = {
                "dataObject": dataObject,
                "headers": headers
            };
            serviceObj.create(options, callBack, callBack);
            break;
        case 'update':
            var data = inputParam.options && inputParam.options.data || {};
            var key;
            for (key in data) {
                dataObject.addField(key, data[key]);
            }
            options = {
                "dataObject": dataObject,
                "headers": headers
            };
            serviceObj.update(options, callBack, callBack);
            break;
        case 'partialupdate':
            var data = inputParam.options && inputParam.options.data || {};
            var key;
            for (key in data) {
                dataObject.addField(key, data[key]);
            }
            options = {
                "dataObject": dataObject,
                "headers": headers
            };
            serviceObj.partialUpdate(options, callBack, callBack);
            break;
        case 'delete':
            var data = inputParam.options && inputParam.options.data || {};
            var key;
            for (key in data) {
                dataObject.addField(key, data[key]);
            }
            options = {
                "dataObject": dataObject,
                "headers": headers
            };
            serviceObj.deleteRecord(options, callBack, callBack);
            break;
        default:
            // Custom verbs
            var data = inputParam.options && inputParam.options.data || {};
            var key;
            for (key in data) {
                dataObject.addField(key, data[key]);
            }
            options = {
                "dataObject": dataObject,
                "headers": headers
            };
            serviceObj.customVerb(CRUD_TYPE, options, callBack, callBack);
    }
};

function callAppMenu() {
    applicationController = require("applicationController");
    var appMenu = [
        ["appmenuitemid1", "Item 1", "option1.png", applicationController.appmenuseq, {}],
        ["appmenuitemid2", "Item 2", "option2.png", applicationController.appmenuseq, {}],
        ["appmenuitemid3", "Item 3", "option3.png", applicationController.appmenuseq, {}],
        ["appmenuitemid4", "Item 4", "option4.png", applicationController.appmenuseq, {}]
    ];
    voltmx.application.createAppMenu("sampAppMenu", appMenu, "", "");
    voltmx.application.setCurrentAppMenu("sampAppMenu");
};

function makeCall(eventobject) {
    voltmx.phone.dial(eventobject.text);
};

function initializeGlobalVariables() {
    gblProfilePhoto = null;
    gblNewsPreference = "Technology";
    gblLoggedInUserID = null;
};
voltmx.visualizer.toBoolean = function(output) {
    try {
        if (typeof output === "string") {
            if (output && output.toLowerCase() === "true") {
                output = true;
            } else {
                output = false;
            }
        } else if (typeof output === "number") {
            output = Boolean(output);
        }
    } catch (e) {
        voltmx.print('Error while converting the value to boolean datatype: ' + e);
    }
    return output;
};
voltmx.visualizer.toNumber = function(output) {
    try {
        if (typeof output === "string") {
            if (!output || isNaN(Number(output))) {
                voltmx.print('The value [' + output + '] after data type conversion is not a number(NaN)');
            } else {
                output = Number(output);
            }
        } else if (typeof output === "boolean") {
            output = Number(output);
        }
    } catch (e) {
        voltmx.print('Error while converting the value to number datatype: ' + e);
    }
    return output;
};
voltmx.visualizer.toString = function(output) {
    try {
        if (["number", "boolean"].indexOf(typeof output) !== -1) {
            output = (output).toString();
        }
    } catch (e) {
        voltmx.print('Error while converting the value to string datatype: ' + e);
    }
    return output;
};
/** conversion to calendar date format (dd/mm/yyyy)
 *@param {String} output
 */
voltmx.visualizer.toCalendarDateFormat = function(output) {
    try {
        var date = new Date(output);
        output = date.toLocaleDateString('en-GB');
    } catch (e) {
        voltmx.print('Error while converting ' + output + ' to date(dd/mm/yyyy) format: ' + e);
    }
    return output;
};
/**conversion to server response date format
 *@param {String} output
 */
voltmx.visualizer.toISODateFormat = function(output) {
    try {
        //check if output is already in ISO dateformat and if yes, return it.
        if (output.split("-").length === 3 && new Date(output).toString() !== "Invalid Date") {
            return output;
        }
        var date = output.split("/");
        if (date.length === 3 && new Date(date[2], date[1] - 1, date[0]).toString() !== "Invalid Date") {
            output = new Date(date[2], date[1] - 1, date[0]).toISOString();
            return output;
        }
        throw "Invalid Date format";
    } catch (e) {
        voltmx.print('Error while converting ' + output + ' to ISO format string: ' + e);
    }
    return output;
};
/**
 * Util to return value of the widget property with the {propertyName}
 * @param {Object/String} output
 * @param {String} propertyName
 * @returns {Object/String} - Returns value of {propertyName} if present, else it returns {output} as it is.
 */
voltmx.visualizer.getPropertyValue = function(output, propertyName) {
    if (typeof output === "object") {
        if (output.hasOwnProperty(propertyName)) {
            return output[propertyName];
        } else {
            voltmx.print(JSON.stringify(output) + ' does not have ' + propertyName + ' property');
        }
    }
    return output;
};
/*
	This API is used to merge User controller and controller action of Form.
 */
voltmx.visualizer.mixinControllerActions = function(controller, controllerActions) {
    for (var i = 0; i < controllerActions.length; i++) {
        var actions = require(controllerActions[i]);
        for (var key in actions) {
            /*If the user has defined action in formController then that takes priority 
            	over the action generated in controllerActions.
            	Example: onNavigate
            */
            if (typeof controller[key] === "undefined") {
                controller[key] = actions[key];
            }
        }
    }
    return controller;
};
voltmx.visualizer.i18nKeyObject = {
    "text": "i18n_text",
    "placeholder": "i18n_placeholder",
    "tabName": "i18n_tabName",
    "leftSideText": "i18n_leftSideText",
    "rightSideText": "i18n_rightSideText"
};
voltmx.visualizer.getI18nAttrb = function(property) {
    return voltmx.visualizer.i18nKeyObject[property];
};
//To set the passthrough properties at constructor level
function extendConfig(config, controllerConfig, id) {
    var __extendOverrides__ = function(config, currentOverrides, isTopLevelSrc) {
        Object.keys(currentOverrides).forEach(function(property) {
            var FLEX_PROPS_SANS_ZINDEX = ["left", "right", "top", "bottom", "width", "height", "minWidth", "minHeight", "maxWidth", "maxHeight", "centerX", "centerY"];
            /*If height is preferred,
                For autogrowmode supported widgets, set autogrowmode and delete height from config.
                For other widgets, delete height from config.
            */
            if (property === "autogrowMode" && isTopLevelSrc) {
                delete config["height"];
                config[property] = currentOverrides[property];
            } else if (FLEX_PROPS_SANS_ZINDEX.indexOf(property) !== -1 && isTopLevelSrc) {
                if (currentOverrides[property] == 'viz.val_cleared' || (property === "height" && currentOverrides.hasOwnProperty(property) && currentOverrides[property] == voltmx.flex.USE_PREFERRED_SIZE)) {
                    delete config[property];
                } else {
                    config[property] = currentOverrides[property];
                }
            } else if (config[voltmx.visualizer.getI18nAttrb(property)] && isTopLevelSrc) {
                delete config[voltmx.visualizer.getI18nAttrb(property)];
                config[property] = currentOverrides[property];
            } else {
                config[property] = currentOverrides[property];
            }
        });
    };
    var __parseComponentId__ = function(wgtOverrideId) {
        //sample wgtOverrideId: "comp2.comp1.btnId"
        var parentIdArr = wgtOverrideId.split('.');
        return {
            rootId: parentIdArr.splice(0, 1)[0],
            childId: parentIdArr.join(".")
        };
    };
    var widgetsOverrides = (controllerConfig && controllerConfig.overrides);
    for (var wgtOverrides in widgetsOverrides) {
        var currentOverrides = widgetsOverrides[wgtOverrides];
        var idObj = __parseComponentId__(wgtOverrides);
        var rootId = idObj.rootId;
        var childId = idObj.childId;
        if (rootId === id) {
            if (config.overrides && childId) {
                if (config.overrides[childId]) {
                    __extendOverrides__(config.overrides[childId], currentOverrides);
                } else {
                    config.overrides[childId] = currentOverrides;
                }
            } else {
                //isTopLevelSrc is to indicate that this is the root source widget (without any nesting)
                var isTopLevelSrc = true;
                __extendOverrides__(config, currentOverrides, isTopLevelSrc);
            }
        }
    }
    return config;
};