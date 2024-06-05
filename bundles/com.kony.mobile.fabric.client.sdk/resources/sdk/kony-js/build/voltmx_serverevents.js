/**
 * voltmx_serverevents version 9.5.31
 */
       
//#ifdef iphone
//#define PLATFORM_NATIVE_IOS
//#endif
//#ifdef ipad
//#define PLATFORM_NATIVE_IOS
//#endif

//#ifdef android
//#define PLATFORM_NATIVE_ANDROID
//#endif
//#ifdef tabrcandroid
//#define PLATFORM_NATIVE_ANDROID
//#endif

//#ifdef winphone8
//#define PLATFORM_NATIVE_WINDOWS
//#endif
//#ifdef windows8
//#define PLATFORM_NATIVE_WINDOWS
//#endif
//#ifdef desktop_kiosk
//#define PLATFORM_NATIVE_WINDOWS
//#endif

//#ifdef spaip
//#define PLATFORM_SPA
//#endif
//#ifdef spaan
//#define PLATFORM_SPA
//#endif
//#ifdef spabb
//#define PLATFORM_SPA
//#endif
//#ifdef spabbnth
//#define PLATFORM_SPA
//#endif
//#ifdef spawinphone8
//#define PLATFORM_SPA
//#endif
//#ifdef spawindows
//#define PLATFORM_SPA
//#endif
//#ifdef spatabwindows
//#define PLATFORM_SPA
//#endif
//#ifdef spaipad
//#define PLATFORM_SPA
//#endif
//#ifdef spatabandroid
//#define PLATFORM_SPA
//#endif
//#ifdef spaplaybook
//#define PLATFORM_SPA
//#endif
//#ifdef desktopweb
//#define PLATFORM_SPA
//#endif
/**
 * Created by Inderpreet Kaur on 3/1/2020.
 * Copyright © 2020 Kony. All rights reserved.
 */

function initializeWebSocketConstants() {
    if (typeof (voltmx) === "undefined") {
        voltmx = {};
    }
    if (typeof (voltmx.sdk) === "undefined") {
        voltmx.sdk = {};
    }
    voltmx.sdk.websocket = voltmx.sdk.websocket || {};
    voltmx.sdk.websocket.constants = voltmx.sdk.websocket.constants || {};

    voltmx.sdk.websocket.constants = {
        BOOLEAN_TRUE: true,
        X_KONY_AUTHORIZATION: "X-Voltmx-Authorization",
        X_KONY_CLIENT_UUID: "clientUUID",
        EQUAL_TO: "=",

        // Callback Type Constants
        WEBSOCKET_TYPE_ONERROR: "onError",
        WEBSOCKET_TYPE_ONOPEN: "onOpen",
        WEBSOCKET_TYPE_ONCLOSE: "onClose",
        WEBSOCKET_TYPE_ONMESSAGE: "onMessage",
        WEBSOCKET_TYPE_ONPUBLISH: "onPublish",
        WEBSOCKET_TYPE_ONSUBSCRIBE: "onSubscribe",
        WEBSOCKET_TYPE_ONUNSUBSCRIBE: "onUnsubscribe",
        WEBSOCKET_TYPE_ONPUBLISH_ERROR: "onPublishError",
        WEBSOCKET_TYPE_ONSUBSCRIBE_ERROR: "onSubscribeError",
        WEBSOCKET_TYPE_ONUNSUBSCRIBE_ERROR: "onUnsubscribeError",


        WEBSOCKET_PUBLISH_EVENTS: "events",
        WEBSOCKET_SUBSCRIBE_EVENTS: "subscribe",
        WEBSOCKET_UNSUBSCRIBE_EVENTS: "unsubscribe",
        WEBSOCKET_TOPICS_EVENTS: "topics",

        //Subscribe constants
        WEBSOCKET_SUBSCRIBE_MODE: "subscribeMode",
        WEBSOCKET_MODE_PRIVATE : "private",
        WEBSOCKET_MODE_PUBLIC: "public",

        // UnSubscribe constants
        UNSUBSCRIBE_OPTION_CLOSE_CONNECTION: "closeConnection",
        WEBSOCKET_UNSUBSCRIBE_MODE: "unSubscribeMode",

        // Server Response Constants
        WEBSOCKET_RESPONSE_ACK: "ack",
        WEBSOCKET_RESPONSE_CODE: "code",
        WEBSOCKET_RESPONSE_DATA: "data",
        WEBSOCKET_RESPONSE_TOPIC: "topic",
        WEBSOCKET_RESPONSE_MESSAGE: "message",
        WEBSOCKET_RESPONSE_EVENTS_ID: "eventId",
        WEBSOCKET_RESPONSE_FAILED_EVENTS: "failedTopics",
        WEBSOCKET_RESPONSE_SUCCESSFULL_EVENTS: "successTopics",

        // Websocket log messages
        SERVER_EVENTS_NO_INTERNET_MESSAGE : "No internet available, please check device connectivity",
        SERVER_EVENTS_INITIALISING_MESSAGE : "Websocket is not initialized, initializing the socket instance",
        SERVER_EVENTS_NOT_INITIALISED_MESSAGE : "Websocket is not initialized, cannot perform unsubscribe",
        SERVER_EVENTS_CALLBACKS_ERROR_MESSAGE:"Mandatory callbacks are missing.",
        INVALID_MODE_PROVIDED_MESSAGE: "Server events mode provided is not valid.",
        INVALID_EVENT_STRING_MESSAGE: "Event string passed in event array is not valid."
    };
}
/**
 * Created by Inderpreet Kaur on 3/1/2020.
 * Copyright © 2020 Kony. All rights reserved.
 */

function initializeWebSocketHandler() {
    voltmx.sdk.websocket = voltmx.sdk.websocket || {};

    var TAG = "KonyWebSocketHandler : ";

    /**
     *    Generates and returns websocket url.
     */
    voltmx.sdk.websocket.generateServerEventsURL = function () {

        var url = voltmxRef.serverEventsUrl;
        var authToken = voltmxRef.currentClaimToken;
        var clientUUID = voltmxRef.clientUUID;

        if (!voltmx.sdk.util.isNullOrEmptyString(authToken) &&
            !voltmx.sdk.util.isNullOrEmptyString(clientUUID) &&
            !voltmx.sdk.util.isNullOrEmptyString(url)) {
            url = url + "?" + voltmx.sdk.websocket.constants.X_KONY_AUTHORIZATION + voltmx.sdk.websocket.constants.EQUAL_TO + authToken +
                "&" + voltmx.sdk.websocket.constants.X_KONY_CLIENT_UUID + voltmx.sdk.websocket.constants.EQUAL_TO + clientUUID;

        } else {
            voltmx.sdk.logsdk.error(TAG + "generateServerEventsURL:: authToken or serverEventsUrl or clientUUID is null or undefined");
            return null;
        }
        return url;
    };

//#ifdef PLATFORM_SPA

    voltmx.sdk.websocket.setServerEventsCallbacks = function (onMessage, onError, onClose) {
        var LOG_PREFIX = "voltmx.sdk.webSocket.setServerEventsCallbacks";
        voltmx.sdk.logsdk.trace(" Entering " + LOG_PREFIX);

        function onMessageCallback(result) {
            voltmx.sdk.logsdk.perf("Executing onMessageCallback");
            voltmx.sdk.verifyAndCallClosure(onMessage, result);
            voltmx.sdk.logsdk.perf("Executing Finished onMessageCallback");
        }

        function onErrorCallback(error) {
            voltmx.sdk.logsdk.perf("Executing onErrorCallback");
            voltmx.sdk.logsdk.error("subscribeServerEvents::onError Error:", error);
            voltmx.sdk.verifyAndCallClosure(onError, error);
            voltmx.sdk.logsdk.perf("Executing Finished onErrorCallback");
        }

        function onCloseCallback(result) {
            voltmx.sdk.logsdk.perf("Executing onCloseCallback");
            voltmx.sdk.verifyAndCallClosure(onClose, result);
            voltmx.sdk.logsdk.perf("Executing Finished onCloseCallback");
        }

        voltmx.sdk.websocket.util.setVoltmxWebsocketCallbacks({
            "onMessage": onMessageCallback,
            "onError": onErrorCallback,
            "onClose": onCloseCallback
        });
    };

    voltmx.sdk.websocket.publishServerEvents = function (events, onPublish, publishOptions) {
        var LOG_PREFIX = "voltmx.sdk.webSocket.publishServerEvents";
        voltmx.sdk.logsdk.trace(" Entering " + LOG_PREFIX);

        function onPublishCallback(result) {
            voltmx.sdk.logsdk.perf("Executing onPublishCallback");
            voltmx.sdk.verifyAndCallClosure(onPublish, result);
            voltmx.sdk.logsdk.perf("Executing Finished onPublishCallback");
        }

        voltmx.sdk.websocket.util.setVoltmxWebsocketCallback({
            "onPublish": onPublishCallback
        });

        voltmx.sdk.websocket.util.sendWebsocketMessage(events);
    };

    voltmx.sdk.websocket.subscribeServerEvents = function (url, events, onSubscribe, subscribeOptions) {
        var LOG_PREFIX = "voltmx.sdk.webSocket.subscribeServerEvents";
        voltmx.sdk.logsdk.trace(" Entering " + LOG_PREFIX);

        function onSubscribeCallback(result) {
            voltmx.sdk.logsdk.perf("Executing onSubscribeCallback");
            voltmx.sdk.verifyAndCallClosure(onSubscribe, result);
            voltmx.sdk.logsdk.perf("Executing Finished onSubscribeCallback");
        }

        voltmx.sdk.websocket.util.setVoltmxWebsocketCallbacks({
            "onSubscribe": onSubscribeCallback
        });

        if(voltmx.sdk.websocket && !voltmx.sdk.websocket.isWebSocketAvailable()) {
            voltmx.sdk.logsdk.info(LOG_PREFIX + voltmx.sdk.websocket.constants.SERVER_EVENTS_INITIALISING_MESSAGE);
            voltmx.sdk.websocket.util.openWebSocketHandler(url, events);
        } else {
            voltmx.sdk.websocket.util.sendWebsocketMessage(events);
        }

    };

    voltmx.sdk.websocket.unSubscribeServerEvents = function (events, onUnsubscribe, unSubscribeOptions) {
        var LOG_PREFIX = "voltmx.sdk.webSocket.unSubscribeServerEvents";
        voltmx.sdk.logsdk.trace(" Entering " + LOG_PREFIX);

        if (unSubscribeOptions &&
            unSubscribeOptions[voltmx.sdk.websocket.constants.UNSUBSCRIBE_OPTION_CLOSE_CONNECTION] &&
            unSubscribeOptions[voltmx.sdk.websocket.constants.UNSUBSCRIBE_OPTION_CLOSE_CONNECTION] ===
            voltmx.sdk.websocket.constants.BOOLEAN_TRUE) {
            voltmx.sdk.websocket.util.closeWebSocket();
            return;
        }

        function onUnsubscribeCallback(result) {
            voltmx.sdk.logsdk.perf("Executing unSubscribeServerEvents");
            voltmx.sdk.verifyAndCallClosure(onUnsubscribe, result);
            voltmx.sdk.logsdk.perf("Executing Finished unSubscribeServerEvents");
        }

        voltmx.sdk.websocket.util.setVoltmxWebsocketCallbacks({
            "onUnsubscribe": onUnsubscribeCallback
        });

        if(!voltmx.sdk.util.isNullOrUndefinedOrEmptyObject(events)) {
            voltmx.sdk.websocket.util.sendWebsocketMessage(events);
        } else{
            voltmx.sdk.websocket.util.raiseError(LOG_PREFIX + "events is null or undefined");
            return;
        }

    };

    voltmx.sdk.websocket.isWebSocketAvailable = function() {
        var LOG_PREFIX = "voltmx.sdk.webSocket.isWebSocketAvailable";
        voltmx.sdk.logsdk.trace(" Entering " + LOG_PREFIX);
        return voltmx.sdk.websocket.util.isInternalWebSocketAvailable();
    };
//#endif

//#ifdef PLATFORM_NATIVE_IOS
// iOS Web socket native bindings

    voltmx.sdk.websocket.setServerEventsCallbacks = function (onMessage, onError, onClose) {
        var LOG_PREFIX = "voltmx.sdk.webSocket.setServerEventsCallbacks";
        voltmx.sdk.logsdk.trace(" Entering " + LOG_PREFIX);

        var VMXWebSocketObj = voltmx.sdk.VoltmxWebSocketClasses.import();
        var VoltmxWebSocketInstance = VMXWebSocketObj.VMXWebSocket.alloc().jsinit();
        VoltmxWebSocketInstance.setServerEventsCallbacksOnErrorOnClose(onMessage, onError, onClose);
    };

    voltmx.sdk.websocket.subscribeServerEvents = function (url, events, onSubscribe, subscribeOptions) {
        var LOG_PREFIX = "voltmx.sdk.webSocket.subscribeServerEvents";
        voltmx.sdk.logsdk.trace(" Entering " + LOG_PREFIX);

        var VMXWebSocketObj = voltmx.sdk.VoltmxWebSocketClasses.import();
        var VoltmxWebSocketInstance = VMXWebSocketObj.VMXWebSocket.alloc().jsinit();
        VoltmxWebSocketInstance.subscribeServerEventsEventsOnSubscribeSubscribeOptions(url, events, onSubscribe, subscribeOptions);
    };

    voltmx.sdk.websocket.unSubscribeServerEvents = function (events, onUnsubscribe, unSubscribeOptions) {
        var LOG_PREFIX = "voltmx.sdk.webSocket.unSubscribeServerEvents";
        voltmx.sdk.logsdk.trace(" Entering " + LOG_PREFIX);

        var VMXWebSocket = voltmx.sdk.VoltmxWebSocketClasses.import();
        var VoltmxWebSocketInstance = VMXWebSocket.VMXWebSocket.alloc().jsinit();
        VoltmxWebSocketInstance.unSubscribeServerEventsOnUnsubscribeUnSubscribeOptions(events, onUnsubscribe, unSubscribeOptions);
    };

    voltmx.sdk.websocket.isWebSocketAvailable = function() {
        var LOG_PREFIX = "voltmx.sdk.webSocket.isWebSocketAvailable";
        voltmx.sdk.logsdk.trace(" Entering " + LOG_PREFIX);

        var VMXWebSocket = voltmx.sdk.VoltmxWebSocketClasses.import();
        var VoltmxWebSocketInstance = VMXWebSocket.VMXWebSocket.alloc().jsinit();

        return VoltmxWebSocketInstance.isWebSocketAvailable();
    };
//#endif

//#ifdef PLATFORM_NATIVE_ANDROID
// android Web socket native bindings

// Converts json to HashMap
    voltmx.sdk.VoltmxWebSocketClasses.createHashMapFromJSONObject = function (json, logPrefix) {
        if (!json) {
            return null;
        }

        jsonString = JSON.stringify(json);
        voltmx.sdk.logsdk.debug(logPrefix + " : " + jsonString);
        JavaClasses = voltmx.sdk.JavaClasses.import();
        return new JavaClasses.Gson().fromJson(jsonString, JavaClasses.HashMap.class);
    };

    VoltmxWebSocketClasses = null;
// Initialization
    voltmx.sdk.VoltmxWebSocketClasses.init = function () {
        if (VoltmxWebSocketClasses == null) {
            VoltmxWebSocketClasses = voltmx.sdk.VoltmxWebSocketClasses.import();
        }
    };

    // Creates an instance of Message Callback
    voltmx.sdk.VoltmxWebSocketClasses.createMessageCallback = function (onMessageCallback, messageLog) {
        voltmx.sdk.VoltmxWebSocketClasses.init();

        onMessageMethod = function (res) {
            voltmx.sdk.logsdk.debug(messageLog);
            onMessageCallback(res);
        };

        var messageCallback = new VoltmxWebSocketClasses.MessageCallback();
        messageCallback.onMessageCallback = onMessageMethod;
        messageCallback.onMessageLog = messageLog;

        return messageCallback;
    };

    // Creates an instance of Error Callback
    voltmx.sdk.VoltmxWebSocketClasses.createErrorCallback = function (onErrorCallback, errorLog) {
        voltmx.sdk.VoltmxWebSocketClasses.init();

        onErrorMethod = function (err) {
            voltmx.sdk.logsdk.debug(errorLog);
            onErrorCallback(err);
        };

        var errorCallback = new VoltmxWebSocketClasses.ErrorCallback();
        errorCallback.onErrorCallback = onErrorMethod;
        errorCallback.onErrorLog = errorLog;

        return errorCallback;
    };

    // Creates an instance of Close Callback
    voltmx.sdk.VoltmxWebSocketClasses.createCloseCallback = function (onCloseCallback, closeLog) {
        voltmx.sdk.VoltmxWebSocketClasses.init();

        onCloseMethod = function (res) {
            voltmx.sdk.logsdk.debug(closeLog);
            onCloseCallback(res);
        };

        var closeCallback = new VoltmxWebSocketClasses.CloseCallback();
        closeCallback.onCloseCallback = onCloseMethod;
        closeCallback.onCloseLog = closeLog;

        return closeCallback;
    };

    // Creates an instance of Subscribe Callback
    voltmx.sdk.VoltmxWebSocketClasses.createSubscribeCallback = function (onSubscribeCallback, subscribeLog) {
        voltmx.sdk.VoltmxWebSocketClasses.init();

        onSubscribeMethod = function (res) {
            voltmx.sdk.logsdk.debug(subscribeLog);
            onSubscribeCallback(res);
        };

        var subscribeCallback = new VoltmxWebSocketClasses.SubscribeCallback();
        subscribeCallback.onSubscribeCallback = onSubscribeMethod;
        subscribeCallback.onSubscribeLog = subscribeLog;

        return subscribeCallback;
    };

    // Creates an instance of UnSubscribe Callback
    voltmx.sdk.VoltmxWebSocketClasses.createUnSubscribeCallback = function (onUnSubscribeCallback, unSubscribeLog) {
        voltmx.sdk.VoltmxWebSocketClasses.init();

        onUnSubscribeMethod = function (res) {
            voltmx.sdk.logsdk.debug(unSubscribeLog);
            onUnSubscribeCallback(res);
        };

        var unSubscribeCallback = new VoltmxWebSocketClasses.UnSubscribeCallback();
        unSubscribeCallback.onUnSubscribeCallback = onUnSubscribeMethod;
        unSubscribeCallback.onUnSubscribeLog = unSubscribeLog;

        return unSubscribeCallback;
    };

    voltmx.sdk.websocket.setServerEventsCallbacks = function (onMessage, onError, onClose, setupOptions) {
        var LOG_PREFIX = "voltmx.sdk.webSocket.setServerEventsCallbacks";
        voltmx.sdk.logsdk.trace(" Entering " + LOG_PREFIX);

        voltmx.sdk.VoltmxWebSocketClasses.init();
        var setServerEventsCallbacks = "setServerEventsCallbacks: ";

        var messageCallback = voltmx.sdk.VoltmxWebSocketClasses.createMessageCallback(onMessage, setServerEventsCallbacks + "onMessage Callback");
        var errorCallback = voltmx.sdk.VoltmxWebSocketClasses.createErrorCallback(onError, setServerEventsCallbacks + "onError Callback");
        var closeCallback = voltmx.sdk.VoltmxWebSocketClasses.createCloseCallback(onClose, setServerEventsCallbacks + "onClose Callback");
        var setupOptionsMap = voltmx.sdk.VoltmxWebSocketClasses.createHashMapFromJSONObject(setupOptions, "setupOptions");
        VoltmxWebSocketClasses.VoltmxWebSocketInterface.setServerEventsCallbacks(messageCallback, errorCallback, closeCallback, setupOptionsMap);
    };

    voltmx.sdk.websocket.subscribeServerEvents = function (url, events, onSubscribe, subscribeOptions) {
        var LOG_PREFIX = "voltmx.sdk.webSocket.subscribeServerEvents";
        voltmx.sdk.logsdk.trace(" Entering " + LOG_PREFIX);

        voltmx.sdk.VoltmxWebSocketClasses.init();
        var subscribeEvents = "SubscribeServerEvents: ";

        var subscribeCallback = voltmx.sdk.VoltmxWebSocketClasses.createSubscribeCallback(onSubscribe, subscribeEvents + "onSubscribe Callback");
        var subscribeOptionsMap = voltmx.sdk.VoltmxWebSocketClasses.createHashMapFromJSONObject(subscribeOptions, "subscribeOptions");
        VoltmxWebSocketClasses.VoltmxWebSocketInterface.subscribeServerEvents(url, events, subscribeCallback, subscribeOptionsMap);
    };

    voltmx.sdk.websocket.unSubscribeServerEvents = function (events, onUnSubscribe, unSubscribeOptions) {
        var LOG_PREFIX = "voltmx.sdk.webSocket.unSubscribeServerEvents";
        voltmx.sdk.logsdk.trace(" Entering " + LOG_PREFIX);

        voltmx.sdk.VoltmxWebSocketClasses.init();
        var unSubscribeEvents = "UnSubscribeServerEvents: ";

        var unSubscribeCallback = voltmx.sdk.VoltmxWebSocketClasses.createUnSubscribeCallback(onUnSubscribe,
            unSubscribeEvents + "onUnSubscribe Callback");
        var unSubscribeOptionsMap = voltmx.sdk.VoltmxWebSocketClasses.createHashMapFromJSONObject(unSubscribeOptions, "unSubscribeOptions");
        VoltmxWebSocketClasses.VoltmxWebSocketInterface.unSubscribeServerEvents(events, unSubscribeCallback, unSubscribeOptionsMap);
    };

    voltmx.sdk.websocket.isWebSocketAvailable = function() {
        var LOG_PREFIX = "voltmx.sdk.webSocket.isWebSocketAvailable";
        voltmx.sdk.logsdk.trace(" Entering " + LOG_PREFIX);
        voltmx.sdk.VoltmxWebSocketClasses.init();
        return VoltmxWebSocketClasses.VoltmxWebSocketInterface.isWebSocketAvailable();
    };
//#endif

//#ifdef PLATFORM_NATIVE_WINDOWS
    voltmx.sdk.websocket.setServerEventsCallbacks = function () {
        voltmx.sdk.logsdk.warn("voltmx.sdk.websocket.setServerEventsCallbacks:: Websocket is not supported for windows");
        return null;
    };

    voltmx.sdk.websocket.subscribeServerEvents = function () {
        voltmx.sdk.logsdk.warn("voltmx.sdk.websocket.subscribeServerEvents:: Websocket is not supported for windows");
        return null;
    };

    voltmx.sdk.websocket.unSubscribeServerEvents = function () {
        voltmx.sdk.logsdk.warn("voltmx.sdk.websocket.unSubscribeServerEvents:: Websocket is not supported for windows");
        return null;
    };

    voltmx.sdk.websocket.isWebSocketAvailable = function() {
        voltmx.sdk.logsdk.warn("voltmx.sdk.websocket.isWebSocketAvailable:: Websocket is not supported for windows");
        return false;
    };
//#endif
}
//#ifdef PLATFORM_SPA
/**
 * Created by Inderpreet Kaur on 3/1/2020.
 * Copyright © 2020 Kony. All rights reserved.
 */
function initializeWebSocketManager() {
    if (typeof (voltmx) === "undefined") {
        voltmx = {};
    }
    if (typeof(voltmx.sdk) === "undefined") {
        voltmx.sdk = {};
    }
    voltmx.sdk.websocket = voltmx.sdk.websocket || {};
    voltmx.sdk.websocket.util = voltmx.sdk.websocket.util || {};

    voltmx.sdk.websocket.onMessage = null;
    voltmx.sdk.websocket.onError = null;
    voltmx.sdk.websocket.onClose = null;
    voltmx.sdk.websocket.onSubscribe = null;
    voltmx.sdk.websocket.onPublish = null;
    voltmx.sdk.websocket.onUnsubscribe = null;

    var voltmxWebSocket = null;

    /**
     *    Defines callback for onMessage, onError and onClose for websockets.
     */
    voltmx.sdk.websocket.util.setVoltmxWebsocketCallbacks = function(callback) {
        voltmx.sdk.logsdk.perf("Executing voltmx.sdk.websocket.util.setVoltmxWebsocketCallback");
        for (var key in callback) {
            switch (key) {
                case voltmx.sdk.websocket.constants.WEBSOCKET_TYPE_ONMESSAGE:
                    voltmx.sdk.websocket.onMessage = callback[key];
                    break;
                case voltmx.sdk.websocket.constants.WEBSOCKET_TYPE_ONERROR:
                    voltmx.sdk.websocket.onError = callback[key];
                    break;
                case voltmx.sdk.websocket.constants.WEBSOCKET_TYPE_ONCLOSE:
                    voltmx.sdk.websocket.onClose = callback[key];
                    break;
                case voltmx.sdk.websocket.constants.WEBSOCKET_TYPE_ONSUBSCRIBE:
                    voltmx.sdk.websocket.onSubscribe = callback[key];
                    break;
                case voltmx.sdk.websocket.constants.WEBSOCKET_TYPE_ONPUBLISH:
                    voltmx.sdk.websocket.onPublish = callback[key];
                    break;
                case voltmx.sdk.websocket.constants.WEBSOCKET_TYPE_ONUNSUBSCRIBE:
                    voltmx.sdk.websocket.onUnsubscribe = callback[key];
                    break;
                default:
                    voltmx.sdk.logsdk.warn("Invalid key passed while setting websocket callback : ", key);
            }
        }
        voltmx.sdk.logsdk.perf("Executing Finished voltmx.sdk.websocket.util.setVoltmxWebsocketCallback");
    };

    /**
     *    Opens and handles websocket after the connection is established.
     */
    voltmx.sdk.websocket.util.openWebSocketHandler = function(url, events) {
        voltmx.sdk.logsdk.perf("Executing voltmx.sdk.websocket.util.openWebSocketHandler");

        if ((!voltmx.sdk.isNullOrUndefined(voltmxWebSocket) && (voltmxWebSocket.readyState === WebSocket.OPEN))) {
            voltmx.sdk.logsdk.info("Websocket is already initialized.");
            return;
        }

        if (window.WebSocket) {
            voltmx.sdk.logsdk.info("Websocket is supported by this browser!");
            try {
                voltmxWebSocket = new WebSocket(url);
            } catch (error) {
                voltmx.sdk.logsdk.error("openWebSocketHandler:: Error while opening websocket, Error : ", error);
                voltmx.sdk.websocket.util.parseMessageForTypeAndCallCommonCallback(voltmx.sdk.websocket.constants.WEBSOCKET_TYPE_ONERROR,
                    "Error while opening websocket, Error : " + error);
                return;
            }

            voltmxWebSocket.onopen = function() {
                voltmx.sdk.logsdk.perf("Executing Websocket onopen eventHandler.");
                voltmx.sdk.logsdk.info("WebSocket is connected.");
                voltmx.sdk.websocket.util.parseMessageForTypeAndCallCommonCallback(voltmx.sdk.websocket.constants.WEBSOCKET_TYPE_ONOPEN,
                    "WebSocket connection established");
                voltmx.sdk.websocket.util.sendWebsocketMessage(events);
                voltmx.sdk.logsdk.perf("Executing Finished Websocket onopen eventHandler.");
            };

            voltmxWebSocket.onmessage = function(event) {
                voltmx.sdk.logsdk.perf("Executing Websocket onmessage eventHandler.");
                var message = event.data;
                voltmx.sdk.logsdk.info("Event Message Recieved.");
                voltmx.sdk.websocket.util.parseServerResponseAndCallLocalCallback(message);
                voltmx.sdk.logsdk.perf("Executing Finished Websocket onmessage eventHandler.");
            };

            voltmxWebSocket.onerror = function(error) {
                voltmx.sdk.logsdk.perf("Executing Websocket onerror eventHandler.");
                voltmx.sdk.logsdk.error("openWebSocketHandler:: Websocket Failed With Error :" + error);
                voltmxWebSocket = null;
                voltmx.sdk.websocket.util.parseMessageForTypeAndCallCommonCallback(voltmx.sdk.websocket.constants.WEBSOCKET_TYPE_ONERROR,
                    "Websocket Failed With Error : " + error);
                voltmx.sdk.logsdk.perf("Executing Finished Websocket onerror eventHandler.");
            };

            voltmxWebSocket.onclose = function() {
                voltmx.sdk.logsdk.perf("Executing Websocket onclose eventHandler.");
                voltmxWebSocket = null;
                voltmx.sdk.logsdk.info("WebSocket is closed.");
                voltmx.sdk.websocket.util.parseMessageForTypeAndCallCommonCallback(voltmx.sdk.websocket.constants.WEBSOCKET_TYPE_ONCLOSE,
                    "All Topics Unsubscribed and WebSocket connection closed.");
                voltmx.sdk.logsdk.perf("Executing Finished Websocket onclose eventHandler.");
            };
        } else {
            voltmx.sdk.logsdk.error("openWebSocketHandler:: WebSocket is not supported by this browser.");
            voltmx.sdk.websocket.util.parseMessageForTypeAndCallCommonCallback(voltmx.sdk.websocket.constants.WEBSOCKET_TYPE_ONERROR,
                "WebSocket is not supported by this browser");
        }
        voltmx.sdk.logsdk.perf("Executing Finished voltmx.sdk.websocket.util.openWebSocketHandler");
    };

    /**
     *    Sending the acknowledgement after getting the response from server.
     *    @param eventID event id from server side.
     */
    voltmx.sdk.websocket.util.sendAcknowledgementToServer = function(eventID){
        var ackPayLoad = {};
        var ack = {};
        ack[voltmx.sdk.websocket.constants.WEBSOCKET_RESPONSE_EVENTS_ID] = eventID;
        ackPayLoad[voltmx.sdk.websocket.constants.WEBSOCKET_RESPONSE_ACK] = ack;
        var ackString = JSON.stringify(ackPayLoad);
        voltmx.sdk.websocket.util.sendWebsocketMessage(ackString);
    };

    /**
     *    Sends message through the WebSocket connection using WebSocket instance.
     */
    voltmx.sdk.websocket.util.sendWebsocketMessage = function(events) {
        voltmx.sdk.logsdk.perf("Executing voltmx.sdk.websocket.util.sendWebsocketMessage");

        if (voltmx.sdk.isNullOrUndefined(voltmxWebSocket)) {
            voltmx.sdk.logsdk.error("sendWebsocketMessage:: Websocket is not initialized.");
            voltmx.sdk.websocket.util.parseMessageForTypeAndCallCommonCallback(voltmx.sdk.websocket.constants.WEBSOCKET_TYPE_ONERROR,
                "Websocket is not initialized.");
            return;
        }

        voltmx.sdk.logsdk.info("Websocket ready State is " + voltmxWebSocket.readyState);
        if (voltmxWebSocket.readyState === WebSocket.OPEN) {
            voltmx.sdk.logsdk.info("Sending events using webSocket.");
            voltmxWebSocket.send(events);
        } else {
            voltmx.sdk.logsdk.error("sendWebsocketMessage:: Websocket is not open.");
            voltmx.sdk.websocket.util.parseMessageForTypeAndCallCommonCallback(voltmx.sdk.websocket.constants.WEBSOCKET_TYPE_ONERROR,
                "Websocket is not open.");
            return;
        }

        voltmx.sdk.logsdk.perf("Executing Finished voltmx.sdk.websocket.util.sendWebsocketMessage");
    };

    /**
     *    Closes the WebSocket connection, if any. If the connection is already closed, this api does nothing.
     */
    voltmx.sdk.websocket.util.closeWebSocket = function() {
        voltmx.sdk.logsdk.perf("Executing Finished voltmx.sdk.websocket.util.ned) {closeWebSocket");

        if (voltmx.sdk.isNullOrUndefined(voltmxWebSocket)) {
            voltmx.sdk.logsdk.error("closeWebSocket:: Websocket is not initialized.");
            voltmx.sdk.websocket.util.parseMessageForTypeAndCallCommonCallback(voltmx.sdk.websocket.constants.WEBSOCKET_TYPE_ONERROR,
                "Websocket is not initialized.");
            return;
        } else {
            voltmx.sdk.logsdk.info("Websocket ready State is " + voltmxWebSocket.readyState);
            if (voltmxWebSocket.readyState === WebSocket.OPEN) {
                voltmx.sdk.logsdk.info("Closing the Websocket.");
                voltmxWebSocket.close();
            } else {
                voltmx.sdk.logsdk.error("closeWebSocket:: Websocket is not open.");
                voltmx.sdk.websocket.util.parseMessageForTypeAndCallCommonCallback(voltmx.sdk.websocket.constants.WEBSOCKET_TYPE_ONERROR,
                    "Websocket is not open.");
            }
        }

        voltmx.sdk.logsdk.perf("Executing Finished voltmx.sdk.websocket.util.closeWebSocket");
    };

    /**
     *  Checks and returns if websocket instance is available.
     */
    voltmx.sdk.websocket.util.isInternalWebSocketAvailable = function () {
        return !voltmx.sdk.isNullOrUndefined(voltmxWebSocket);
    };
}
//#endif
//#ifdef PLATFORM_SPA
/**
 * Created by Inderpreet Kaur on 3/1/2020.
 * Copyright © 2020 Kony. All rights reserved.
 */
function initializeWebSocketResponseHandler() {
    if (typeof (voltmx) === "undefined") {
        voltmx = {};
    }

    if (typeof (voltmx.sdk) === "undefined") {
        voltmx.sdk = {};
    }
    voltmx.sdk.websocket = voltmx.sdk.websocket || {};
    voltmx.sdk.websocket.util = voltmx.sdk.websocket.util || {};

    /**
     * Parse the response message from server.
     */
    voltmx.sdk.websocket.util.parseServerResponseAndCallLocalCallback = function(response) {
        voltmx.sdk.logsdk.perf("Executing voltmx.sdk.websocket.util.parseServerResponseAndCallLocalCallback");
        const msg = "Error while parsing response from server.";
        try {
            var parsedResponse = JSON.parse(response);
        } catch (error) {
            voltmx.sdk.logsdk.error("parseAndGetLocalResponse:: " + msg);
            voltmx.sdk.websocket.util.raiseError(msg + ": " + error);
            return;
        }

        if(voltmx.sdk.util.isNullOrUndefinedOrEmptyObject(parsedResponse)) {
            voltmx.sdk.logsdk.error("parseAndGetLocalResponse:: " + msg);
            voltmx.sdk.websocket.util.raiseError(msg);
            return;
        }
        voltmx.sdk.websocket.util.handleServerResponseAndCallbackResponse(parsedResponse);
        voltmx.sdk.logsdk.perf("Executing Finished voltmx.sdk.websocket.util.parseAndGetLocalResponse");
    };

    /**
     * Method gets response and invokes callback.
     */
    voltmx.sdk.websocket.util.parseMessageForTypeAndCallCommonCallback = function(type, response) {
        voltmx.sdk.logsdk.perf("Executing voltmx.sdk.websocket.util.parseMessageForTypeAndCallCommonCallback");

        const finalMessage = voltmx.sdk.websocket.util.getResponseMessageForType(type, response);

        if(voltmx.sdk.util.isNullOrUndefinedOrEmptyObject(finalMessage)) {
            const msg = "Error in creating response for parseMessageForTypeAndCallCommonCallback";
            voltmx.sdk.logsdk.error(msg);
            voltmx.sdk.websocket.util.raiseError(msg);
            return;
        }

        if(type === voltmx.sdk.websocket.constants.WEBSOCKET_TYPE_ONOPEN) {
            voltmx.sdk.verifyAndCallClosure(voltmx.sdk.websocket.onMessage, finalMessage);
        }

        if(type === voltmx.sdk.websocket.constants.WEBSOCKET_TYPE_ONCLOSE) {
            voltmx.sdk.verifyAndCallClosure(voltmx.sdk.websocket.onClose, finalMessage);
        }

        if(type === voltmx.sdk.websocket.constants.WEBSOCKET_TYPE_ONERROR) {
            voltmx.sdk.verifyAndCallClosure(voltmx.sdk.websocket.onError, finalMessage);
        }
    };

    /**
     * Invoke respective callback based on response received from server.
     */
    voltmx.sdk.websocket.util.handleServerResponseAndCallbackResponse = function(response) {
        voltmx.sdk.logsdk.perf("Executing voltmx.sdk.websocket.util.handleServerResponseAndCallbackResponse");

        const code = response[voltmx.sdk.websocket.constants.WEBSOCKET_RESPONSE_CODE];
        if(code === voltmx.sdk.websocket.util.ServerCodeType.ON_MESSAGE){
            voltmx.sdk.logsdk.info("OnMessage type response received.");

            voltmx.sdk.logsdk.info("Sending acknowledgment to the server.");
            voltmx.sdk.websocket.util.sendAcknowledgementToServer(response[voltmx.sdk.websocket.constants.WEBSOCKET_RESPONSE_EVENTS_ID]);

            const finalMessage = voltmx.sdk.websocket.util.getResponseMessageForOnMessage(response);
            voltmx.sdk.verifyAndCallClosure(voltmx.sdk.websocket.onMessage, finalMessage);

        } else if(code >= voltmx.sdk.websocket.util.ServerCodeType.SERVER_ON_ERROR_INVALID_USER &&
            code <= voltmx.sdk.websocket.util.ServerCodeType.SERVER_ON_ERROR_ERROR_REQUEST_PAYLOAD) {

            voltmx.sdk.logsdk.info("Response message type received: ON_ERROR");
            voltmx.sdk.logsdk.debug("Error: " + response[voltmx.sdk.websocket.constants.WEBSOCKET_RESPONSE_MESSAGE]);

            var errorMessage = "Please Re-Subscribe/Unsubscribe.";
            if (code === voltmx.sdk.websocket.util.ServerCodeType.SERVER_ON_ERROR_INVALID_USER) {
                errorMessage = "Authentication failed, " + errorMessage;
            }
            voltmx.sdk.websocket.util.raiseError(errorMessage);

        } else {
            const message = response[voltmx.sdk.websocket.constants.WEBSOCKET_RESPONSE_MESSAGE];
            const successTopics = response[voltmx.sdk.websocket.constants.WEBSOCKET_RESPONSE_SUCCESSFULL_EVENTS];
            const failedTopics = response[voltmx.sdk.websocket.constants.WEBSOCKET_RESPONSE_FAILED_EVENTS];

            const finalMessage = voltmx.sdk.websocket.util.getResponseMessageForCode(code, message, successTopics, failedTopics);

            if (voltmx.sdk.util.isNullOrUndefinedOrEmptyObject(finalMessage)) {
                const msg = "Error in creating response for handleServerResponseAndCallbackResponse";
                voltmx.sdk.logsdk.error(msg);
                voltmx.sdk.websocket.util.raiseError(msg);
                return;
            }

            switch (code) {
                case voltmx.sdk.websocket.util.ServerCodeType.SUBSCRIBE_SUCCESS:
                case voltmx.sdk.websocket.util.ServerCodeType.SUBSCRIBE_ERROR:
                case voltmx.sdk.websocket.util.ServerCodeType.SUBSCRIBE_PARTIAL_SUCCESS:
                    voltmx.sdk.logsdk.info("Response message type received: SUBSCRIBE");
                    voltmx.sdk.verifyAndCallClosure(voltmx.sdk.websocket.onSubscribe, finalMessage);
                    break;
                case voltmx.sdk.websocket.util.ServerCodeType.UNSUBSCRIBE_SUCCESS:
                case voltmx.sdk.websocket.util.ServerCodeType.UNSUBSCRIBE_ERROR:
                case voltmx.sdk.websocket.util.ServerCodeType.UNSUBSCRIBE_PARTIAL_SUCCESS:
                    voltmx.sdk.logsdk.info("Response message type received: UNSUBSCRIBE");
                    voltmx.sdk.verifyAndCallClosure(voltmx.sdk.websocket.onUnsubscribe, finalMessage);
                    break;
                case voltmx.sdk.websocket.util.ServerCodeType.PUBLISH_SUCCESS:
                case voltmx.sdk.websocket.util.ServerCodeType.PUBLISH_ERROR:
                case voltmx.sdk.websocket.util.ServerCodeType.PUBLISH_PARTIAL_SUCCESS:
                    voltmx.sdk.logsdk.info("Response message type received: PUBLISH");
                    voltmx.sdk.verifyAndCallClosure(voltmx.sdk.websocket.onPublish, finalMessage);
                    break;
                default:
                    voltmx.sdk.logsdk.error("Invalid code passed in response, message: ", finalMessage);
                    voltmx.sdk.websocket.util.raiseError("Invalid response received, response : " + finalMessage);
                    break;
            }
        }
    };

    voltmx.sdk.websocket.util.raiseError = function(message) {
        voltmx.sdk.logsdk.perf("Executing voltmx.sdk.websocket.util.raiseError");
        const finalErrorMessage = voltmx.sdk.websocket.util.getResponseMessageForType(voltmx.sdk.websocket.constants.WEBSOCKET_TYPE_ONERROR, message);
        voltmx.sdk.verifyAndCallClosure(voltmx.sdk.websocket.onError,  finalErrorMessage);
    };
}
//#endif
//#ifdef PLATFORM_SPA
/**
 * Created by Inderpreet Kaur on 3/1/2020.
 * Copyright © 2020 Kony. All rights reserved.
 */
function initializeWebSocketResponseMessage() {
    if (typeof (voltmx) === "undefined") {
        voltmx = {};
    }

    if (typeof (voltmx.sdk) === "undefined") {
        voltmx.sdk = {};
    }
    voltmx.sdk.websocket = voltmx.sdk.websocket || {};
    voltmx.sdk.websocket.util = voltmx.sdk.websocket.util || {};

    const ServerCodeType = {
        SUBSCRIBE_SUCCESS: 620001,
        SUBSCRIBE_ERROR: 620002,
        SUBSCRIBE_PARTIAL_SUCCESS: 620003,
        PUBLISH_SUCCESS: 620004,
        PUBLISH_ERROR: 620005,
        PUBLISH_PARTIAL_SUCCESS: 620006,
        UNSUBSCRIBE_SUCCESS: 620007,
        UNSUBSCRIBE_ERROR: 620008,
        UNSUBSCRIBE_PARTIAL_SUCCESS: 620009,
        ON_MESSAGE: 620010,
        SERVER_ON_ERROR_INVALID_USER: 620011,
        SERVER_ON_ERROR_MISSING_MANDATORY_PARAM: 620012,
        SERVER_ON_ERROR_UPDATING_WEBSOCKET_SESSION: 620013,
        SERVER_ON_ERROR_ERROR_REQUEST_PAYLOAD: 620014,

    };
    Object.freeze(ServerCodeType);
    voltmx.sdk.websocket.util.ServerCodeType = ServerCodeType;

    const ClientCodeType = {
        SUBS_SUCCESS: 6201,
        SUBS_ERROR: 6202,
        SUBS_PARTIAL_SUCCESS: 6203,
        UNSUBS_SUCCESS: 6207,
        UNSUBS_ERROR: 6208,
        UNSUBS_PARTIAL_SUCCESS: 6209,
        PUB_SUCCESS: 6204,
        PUB_ERROR: 6205,
        PUB_PARTIAL_SUCCESS: 6206,
        ON_MESSAGE: 6210,
        ON_OPEN: 7200,
        ON_ERROR: 7201,
        ON_CLOSE: 7202
    };
    Object.freeze(ClientCodeType);
    voltmx.sdk.websocket.util.ClientCodeType = ClientCodeType;

    /**
     Creating client and server code dictionary. Dictionary contains both  server code enum type or code type
     as string for key with respective client codes as pair.
     **/
    var responseCodeLookUp = {};

    responseCodeLookUp[ServerCodeType.SUBSCRIBE_SUCCESS]  = ClientCodeType.SUBS_SUCCESS;
    responseCodeLookUp[ServerCodeType.SUBSCRIBE_PARTIAL_SUCCESS]  = ClientCodeType.SUBS_PARTIAL_SUCCESS;
    responseCodeLookUp[ServerCodeType.SUBSCRIBE_ERROR]  = ClientCodeType.SUBS_ERROR;
    responseCodeLookUp[ServerCodeType.UNSUBSCRIBE_SUCCESS]  = ClientCodeType.UNSUBS_SUCCESS;
    responseCodeLookUp[ServerCodeType.UNSUBSCRIBE_PARTIAL_SUCCESS]  = ClientCodeType.UNSUBS_PARTIAL_SUCCESS;
    responseCodeLookUp[ServerCodeType.UNSUBSCRIBE_ERROR]  = ClientCodeType.UNSUBS_ERROR;
    responseCodeLookUp[ServerCodeType.PUBLISH_SUCCESS]  = ClientCodeType.PUB_SUCCESS;
    responseCodeLookUp[ServerCodeType.PUBLISH_PARTIAL_SUCCESS]  = ClientCodeType.PUB_PARTIAL_SUCCESS;
    responseCodeLookUp[ServerCodeType.PUBLISH_ERROR]  = ClientCodeType.PUB_ERROR;
    responseCodeLookUp[voltmx.sdk.websocket.constants.WEBSOCKET_TYPE_ONOPEN] = ClientCodeType.ON_OPEN;
    responseCodeLookUp[voltmx.sdk.websocket.constants.WEBSOCKET_TYPE_ONMESSAGE]  = ClientCodeType.ON_MESSAGE;
    responseCodeLookUp[voltmx.sdk.websocket.constants.WEBSOCKET_TYPE_ONCLOSE]  = ClientCodeType.ON_CLOSE;
    responseCodeLookUp[voltmx.sdk.websocket.constants.WEBSOCKET_TYPE_ONERROR]  = ClientCodeType.ON_ERROR;


    voltmx.sdk.websocket.util.setKeyAndValueForFinalMessage = function(finalMessageJSON, message, successTopics, failedTopics) {
        voltmx.sdk.logsdk.perf("Executing voltmx.sdk.websocket.util.setKeyAndValueForFinalmessage");

        if(!voltmx.sdk.util.isNullOrUndefinedOrEmptyObject(message)) {
            finalMessageJSON[voltmx.sdk.websocket.constants.WEBSOCKET_RESPONSE_MESSAGE] = message;
        }

        if(!voltmx.sdk.util.isNullOrUndefinedOrEmptyObject(successTopics)) {
            finalMessageJSON[voltmx.sdk.websocket.constants.WEBSOCKET_RESPONSE_SUCCESSFULL_EVENTS] = successTopics;
        }
        if(!voltmx.sdk.util.isNullOrUndefinedOrEmptyObject(failedTopics)) {
            finalMessageJSON[voltmx.sdk.websocket.constants.WEBSOCKET_RESPONSE_FAILED_EVENTS] = failedTopics;
        }
    };

    voltmx.sdk.websocket.util.getResponseMessageForOnMessage = function(message){
        var finalMessageJSON ={};

        var clientCode = responseCodeLookUp[voltmx.sdk.websocket.constants.WEBSOCKET_TYPE_ONMESSAGE];
        finalMessageJSON[voltmx.sdk.websocket.constants.WEBSOCKET_RESPONSE_CODE] = clientCode;
        finalMessageJSON[voltmx.sdk.websocket.constants.WEBSOCKET_RESPONSE_DATA] = message[voltmx.sdk.websocket.constants.WEBSOCKET_RESPONSE_DATA];
        finalMessageJSON[voltmx.sdk.websocket.constants.WEBSOCKET_RESPONSE_TOPIC] = message[voltmx.sdk.websocket.constants.WEBSOCKET_RESPONSE_TOPIC];

        var responseString = JSON.stringify(finalMessageJSON);
        return responseString;
    };

    /**
     * Create response message string depending on type of message.
     */
    voltmx.sdk.websocket.util.getResponseMessageForType = function(type, message) {
        voltmx.sdk.logsdk.perf("Executing voltmx.sdk.websocket.util.getResponseMessageForType");

        const finalMessageJSON = {};
        const clientCode = responseCodeLookUp[type];

        if(clientCode <= 0) {
            voltmx.sdk.logsdk.error("Invalid Code found in response for getResponseMessageForType");
            return null;
        }

        finalMessageJSON[voltmx.sdk.websocket.constants.WEBSOCKET_RESPONSE_CODE] = clientCode;

        if(type === voltmx.sdk.websocket.constants.WEBSOCKET_TYPE_ONCLOSE ||
            type === voltmx.sdk.websocket.constants.WEBSOCKET_TYPE_ONOPEN) {
            voltmx.sdk.logsdk.info("Message type received : " + type);
            voltmx.sdk.websocket.util.setKeyAndValueForFinalMessage(finalMessageJSON, message, null, null);
        } else if(type === voltmx.sdk.websocket.constants.WEBSOCKET_TYPE_ONERROR) {
            voltmx.sdk.logsdk.info("Message type received : " + type);
            message = "Error Occurred in Server events, Error :" + message;
            voltmx.sdk.websocket.util.setKeyAndValueForFinalMessage(finalMessageJSON, message, null, null);
        } else {
            voltmx.sdk.logsdk.debug("Invalid Callback type found");
            return null;
        }
        var responseString = JSON.stringify(finalMessageJSON)
        return responseString;
    };

    /**
     * Create response message string depending on the code.
     */
    voltmx.sdk.websocket.util.getResponseMessageForCode = function(code, message, successTopics, failedTopics) {
        voltmx.sdk.logsdk.perf("Executing voltmx.sdk.websocket.util.getResponseMessageForCode");

        const finalMessageJSON = {};
        const clientCode = responseCodeLookUp[code];

        if(clientCode <= 0) {
            voltmx.sdk.logsdk.error("Invalid Code found in response for getResponseMessageForCode");
            return null;
        }

        finalMessageJSON[voltmx.sdk.websocket.constants.WEBSOCKET_RESPONSE_CODE] = clientCode;

        switch(code) {
            case ServerCodeType.SUBSCRIBE_SUCCESS:
            case ServerCodeType.PUBLISH_SUCCESS:
            case ServerCodeType.UNSUBSCRIBE_SUCCESS:
                voltmx.sdk.logsdk.info("Message type received for : " + voltmx.sdk.util.getKeyByValue(ClientCodeType, clientCode));
                voltmx.sdk.websocket.util.setKeyAndValueForFinalMessage(finalMessageJSON, message, successTopics, null);
                break;
            case ServerCodeType.SUBSCRIBE_ERROR:
            case ServerCodeType.PUBLISH_ERROR:
            case ServerCodeType.UNSUBSCRIBE_ERROR:
                voltmx.sdk.logsdk.info("Message type received for : " + voltmx.sdk.util.getKeyByValue(ClientCodeType, clientCode));
                voltmx.sdk.websocket.util.setKeyAndValueForFinalMessage(finalMessageJSON, message, null, failedTopics);
                break;
            case ServerCodeType.SUBSCRIBE_PARTIAL_SUCCESS:
            case ServerCodeType.PUBLISH_PARTIAL_SUCCESS:
            case ServerCodeType.UNSUBSCRIBE_PARTIAL_SUCCESS:
                voltmx.sdk.logsdk.info("Message type received for partial success : " + voltmx.sdk.util.getKeyByValue(ClientCodeType, clientCode));
                voltmx.sdk.websocket.util.setKeyAndValueForFinalMessage(finalMessageJSON, message, successTopics, failedTopics);
                break;

            default:
                voltmx.sdk.logsdk.error("Invalid code passed in response, message: ", message);
                return null;
        }

        try {
            var responseString = JSON.stringify(finalMessageJSON)
        } catch (error) {
            voltmx.sdk.logsdk.error("Error in creating response message, error: " + error);
            return null;
        }
        return responseString;
    };
}
//#endif
/**
 * Created by Inderpreet Kaur on 3/1/2020.
 * Copyright © 2020 Kony. All rights reserved.
 */
if (typeof (voltmx) === "undefined") {
    voltmx = {};
}
if (typeof(voltmx.sdk) === "undefined") {
    voltmx.sdk = {};
}

// voltmx.serverEvents is a flag to know whether VoltmxServerEvents:.js file is loaded or not.
voltmx.serverEvents = true;

function initializeServerEvents() {

    var onErrorCallback = null;
    var eventCallbackFlag = false;
    var failureCallbackFlag = false;
    var TAG = "KonyServerEvents :: ";

    const ErrorCodes = {
        ON_ERROR: 7201,
        ON_UNSUBSCRIBE_ERROR: 6208,
        ON_SUBS_ERROR: 6202
    };
    Object.freeze(ErrorCodes);

    var callbackErrorInvoker = function (type, message, callback) {
        var finalMessage = {};

        switch(type) {
            case voltmx.sdk.websocket.constants.WEBSOCKET_TYPE_ONERROR :
                finalMessage.code = ErrorCodes.ON_ERROR;
                break;
            case voltmx.sdk.websocket.constants.WEBSOCKET_TYPE_ONUNSUBSCRIBE_ERROR :
                finalMessage.code = ErrorCodes.ON_UNSUBSCRIBE_ERROR;
                break;
            case voltmx.sdk.websocket.constants.WEBSOCKET_TYPE_ONSUBSCRIBE_ERROR :
                finalMessage.code = ErrorCodes.ON_SUBS_ERROR;
                break;
            default :
                finalMessage.code = ErrorCodes.ON_ERROR;
                break;
        }

        finalMessage.message = message;

        if((!callback || (finalMessage.code === ErrorCodes.ON_ERROR)) && onErrorCallback) {
            finalMessage.code = ErrorCodes.ON_ERROR;
            voltmx.sdk.verifyAndCallClosure(onErrorCallback, JSON.stringify(finalMessage));
        } else if(callback) {
            voltmx.sdk.verifyAndCallClosure(callback, JSON.stringify(finalMessage));
        }
    };

    /**
     * Create events string payload.
     * @param events,  the value to be used for events object
     * @param mode, value, either it may be Public or Private
     * @param type, it is the type of events- subscribe or unsubscribe
     * @returns {string}
     */
    var createEventsPayloadString = function (events, mode, type) {
        var payload = {};
        var finalPayload = {};
        var scope = {};
        if(voltmx.sdk.util.isValidString(events)) {

            var eventsArray = [];
            eventsArray.push(events);
            scope[mode] = eventsArray

        } else if(voltmx.sdk.isArray(events) && events.length >0) {
            for(var e in  events){
                if(!voltmx.sdk.util.isValidString(events[e])) {
                    voltmx.sdk.logsdk.error(TAG + "createEventsPayloadString:: " + voltmx.sdk.websocket.constants.INVALID_EVENT_STRING_MESSAGE);
                    return;
                }
            }

            scope[mode] = events;
        } else{
            voltmx.sdk.logsdk.error(TAG + "createEventsPayloadString:: " + voltmx.sdk.websocket.constants.INVALID_EVENT_STRING_MESSAGE);
            return;
        }

        payload[voltmx.sdk.websocket.constants.X_KONY_AUTHORIZATION] = voltmxRef.currentClaimToken;
        payload[voltmx.sdk.websocket.constants.X_KONY_CLIENT_UUID] = voltmxRef.clientUUID;
        payload[voltmx.sdk.websocket.constants.WEBSOCKET_TOPICS_EVENTS] = scope;

        if(type === voltmx.sdk.websocket.constants.WEBSOCKET_SUBSCRIBE_EVENTS) {
            finalPayload[voltmx.sdk.websocket.constants.WEBSOCKET_SUBSCRIBE_EVENTS] = payload;
        } else{
            finalPayload[voltmx.sdk.websocket.constants.WEBSOCKET_UNSUBSCRIBE_EVENTS] = payload
        }

        var eventsString = JSON.stringify(finalPayload);
        return eventsString;
    };

    /**
     * Segregating the mode from options.
     * @param options, the value to be used for events object
     * @param type, it is the type of events- subscribe or unsubscribe
     * @returns {string}
     */
    var segregateEventModes = function(options, type){
        var mode = null;

        if(type === voltmx.sdk.websocket.constants.WEBSOCKET_SUBSCRIBE_EVENTS) {

            mode = options[voltmx.sdk.websocket.constants.WEBSOCKET_SUBSCRIBE_MODE];
        } else {

            mode = options[voltmx.sdk.websocket.constants.WEBSOCKET_UNSUBSCRIBE_MODE];
        }

        if (voltmx.sdk.isNullOrUndefined(mode)) {
            return voltmx.sdk.websocket.constants.WEBSOCKET_MODE_PRIVATE ;

        } else if(mode.toLowerCase() === voltmx.sdk.websocket.constants.WEBSOCKET_MODE_PRIVATE
            || mode.toLowerCase() === voltmx.sdk.websocket.constants.WEBSOCKET_MODE_PUBLIC ){

            return mode;
        } else {
            voltmx.sdk.logsdk.error(TAG + "segregatingEventModes:: " + voltmx.sdk.websocket.constants.INVALID_MODE_PROVIDED_MESSAGE);
            return;
        }
    };

    /**
     * Method isServerEventsCallbackAssigned, checking the mandatory callbacks setup.
     * @returns {boolean}
     */
    var isServerEventsCallbackAssigned = function(){
        if (eventCallbackFlag === false || failureCallbackFlag === false) {
            return false;
        } else {
            return true;
        }
    };

    /**
     * isOptionObjectValid, method to validate obj to be function.
     * @param obj
     * @returns {boolean}
     */
    var isOptionObjectValid = function(obj){
        if(voltmx.sdk.isNullOrUndefined(obj) || !typeof obj === 'function'){
            return false;
        } else {
            return true;
        }
    };

    /**
     * isOncloseConnectionValid, method to validate onCloseConnection key
     * @param obj
     * @returns {boolean}
     */
    var isOncloseConnectionValid = function(obj){

        if (!(obj === true || obj === false)) {
            return false;
        }
        return true;
    };

    /**
     * Method setServerEventsCallbacks, setting the common callbacks
     *
     * @param options, contains callback functions
     */
    voltmx.sdk.prototype.setServerEventsCallbacks = function (options) {

        if(!voltmx.sdk.util.isNullOrUndefinedOrEmptyObject(options)) {

            if(!isOptionObjectValid(options.onFailureCallback)) {
                voltmx.sdk.logsdk.error(TAG + "setServerEventsCallbacks:: onFailureCallback callback is null or undefined");
                return;
            } else {
                failureCallbackFlag = true;
                onErrorCallback = options.onFailureCallback;
            }

            if(!isOptionObjectValid(options.onEventCallback)) {
                voltmx.sdk.logsdk.error(TAG + "subscribeServerEvents:: onEventCallback callback is null or undefined");
                callbackErrorInvoker(voltmx.sdk.websocket.constants.WEBSOCKET_TYPE_ONERROR,
                    "onEventCallback callback is null or undefined.", onErrorCallback);
                return;
            } else {
                eventCallbackFlag = true;
            }

            if(!options.onCloseCallback) {
                options.onCloseCallback = null;
            }

            voltmx.sdk.websocket.setServerEventsCallbacks(options.onEventCallback, options.onFailureCallback, options.onCloseCallback);

        } else {
            voltmx.sdk.logsdk.error(TAG + "setServerEventsCallbacks:: options are null or undefined");
            return;
        }

    };

    /**
     * Subscribe to server events.
     *
     * example : ["transaction/deposit",
     *            "transaction/withdraw"]
     * @param events            events string to be sent to the server
     * @param subscribeOptions additional options for subscribing
     */
    voltmx.sdk.prototype.subscribeServerEvents = function (events, subscribeOptions) {
        if(!isServerEventsCallbackAssigned()){
            voltmx.sdk.logsdk.error(TAG + "subscribeServerEvents:: " +
                voltmx.sdk.websocket.constants.SERVER_EVENTS_CALLBACKS_ERROR_MESSAGE);
            return;
        }

        if(voltmx.sdk.util.isNullOrUndefinedOrEmptyObject(subscribeOptions)) {
            subscribeOptions = {};
        }

        if (!voltmx.sdk.isNetworkAvailable()) {
            voltmx.sdk.logsdk.error(TAG + "subscribeServerEvents:: " + voltmx.sdk.websocket.constants.SERVER_EVENTS_NO_INTERNET_MESSAGE);
            callbackErrorInvoker(voltmx.sdk.websocket.constants.WEBSOCKET_TYPE_ONERROR,
                voltmx.sdk.websocket.constants.SERVER_EVENTS_NO_INTERNET_MESSAGE, onErrorCallback);
            return;
        }

        if (voltmx.sdk.util.isNullOrUndefinedOrEmptyObject(events)) {
            voltmx.sdk.logsdk.error(TAG + "subscribeServerEvents:: Events to be subscribed for are null or undefined or empty.");
            callbackErrorInvoker(voltmx.sdk.websocket.constants.WEBSOCKET_TYPE_ONERROR,
                "Events to be subscribed are null or undefined or empty.", onErrorCallback);
            return;
        }

        voltmx.sdk.claimsRefresh(function () {
            voltmx.sdk.logsdk.info(TAG + "subscribeServerEvents:: " + "Generating websocket url");

            var url = voltmx.sdk.websocket.generateServerEventsURL();


            if(voltmx.sdk.isNullOrUndefined(url)){
                voltmx.sdk.websocket.util.raiseError(TAG + "subscribeServerEvents:: Error in generating websocket url.");
                return;
            }

            try {

                var mode = segregateEventModes(subscribeOptions, voltmx.sdk.websocket.constants.WEBSOCKET_SUBSCRIBE_EVENTS);

                if(voltmx.sdk.isNullOrUndefined(mode)){

                    voltmx.sdk.logsdk.error(TAG + "subscribeServerEvents:: Event mode passed is not valid.");
                    callbackErrorInvoker(voltmx.sdk.websocket.constants.WEBSOCKET_TYPE_ONERROR,
                        voltmx.sdk.websocket.constants.INVALID_MODE_PROVIDED_MESSAGE, onErrorCallback);
                    return;
                }

                var eventsString = createEventsPayloadString(events, mode, voltmx.sdk.websocket.constants.WEBSOCKET_SUBSCRIBE_EVENTS);

                if(voltmx.sdk.isNullOrUndefined(eventsString)){

                    voltmx.sdk.logsdk.error(TAG + "subscribeServerEvents:: Event string passed is not valid.");
                    callbackErrorInvoker(voltmx.sdk.websocket.constants.WEBSOCKET_TYPE_ONERROR,
                        voltmx.sdk.websocket.constants.INVALID_EVENT_STRING_MESSAGE, onErrorCallback);
                    return;
                }

            } catch (error) {
                voltmx.sdk.logsdk.error(TAG + "subscribeServerEvents:: Error : ", error);
                callbackErrorInvoker(voltmx.sdk.websocket.constants.WEBSOCKET_TYPE_ONERROR, error, onErrorCallback);
                return;
            }

            if(isOptionObjectValid(subscribeOptions.onSubscribeCallback)) {
                voltmx.sdk.websocket.subscribeServerEvents(url, eventsString, subscribeOptions.onSubscribeCallback, subscribeOptions);
            } else {
                voltmx.sdk.websocket.subscribeServerEvents(url, eventsString, null, subscribeOptions);
            }

        }, function (error) {
            voltmx.sdk.logsdk.error(TAG + "subscribeServerEvents::onFailure Error:", error);
            callbackErrorInvoker(voltmx.sdk.websocket.constants.WEBSOCKET_TYPE_ONERROR, error, onErrorCallback);
        });
    };

    /**
     * Unsubscribe from server events.
     *
     * example : ["transaction/deposit",
     *            "transaction/withdraw"]
     * @param events             events string to unsubscribe
     * @param unSubscribeOptions additional options to unsubscribe
     */
    voltmx.sdk.prototype.unSubscribeServerEvents = function (events, unSubscribeOptions) {
        if(!isServerEventsCallbackAssigned()){
            voltmx.sdk.logsdk.error(TAG + "unSubscribeServerEvents:: " +
                voltmx.sdk.websocket.constants.SERVER_EVENTS_CALLBACKS_ERROR_MESSAGE);
            return;
        }
        if(voltmx.sdk.util.isNullOrUndefinedOrEmptyObject(unSubscribeOptions)) {
            unSubscribeOptions = {};
        }

        if (!voltmx.sdk.isNetworkAvailable()) {
            voltmx.sdk.logsdk.error(TAG + "unSubscribeServerEvents:: " +
                voltmx.sdk.websocket.constants.SERVER_EVENTS_NO_INTERNET_MESSAGE);
            callbackErrorInvoker(voltmx.sdk.websocket.constants.WEBSOCKET_TYPE_ONERROR,
                voltmx.sdk.websocket.constants.SERVER_EVENTS_NO_INTERNET_MESSAGE, onErrorCallback);
            return;
        }

        if(voltmx.sdk.websocket && !voltmx.sdk.websocket.isWebSocketAvailable()) {
            voltmx.sdk.logsdk.error(TAG + "unSubscribeServerEvents:: " + voltmx.sdk.websocket.constants.SERVER_EVENTS_NOT_INITIALISED_MESSAGE);
            callbackErrorInvoker(voltmx.sdk.websocket.constants.WEBSOCKET_TYPE_ONERROR,
                voltmx.sdk.websocket.constants.SERVER_EVENTS_NOT_INITIALISED_MESSAGE, onErrorCallback);
            return;
        }

        var eventsString = null;

        if(!voltmx.sdk.util.isNullOrUndefinedOrEmptyObject(unSubscribeOptions[voltmx.sdk.websocket.constants.UNSUBSCRIBE_OPTION_CLOSE_CONNECTION])){

            if(!isOncloseConnectionValid(unSubscribeOptions[voltmx.sdk.websocket.constants.UNSUBSCRIBE_OPTION_CLOSE_CONNECTION])){

                voltmx.sdk.logsdk.error(TAG + "unSubscribeServerEvents:: CloseConnection value type is invalid.");
                callbackErrorInvoker(voltmx.sdk.websocket.constants.WEBSOCKET_TYPE_ONERROR,
                    "CloseConnection value type is invalid.", onErrorCallback);
                return;
            }

            if(unSubscribeOptions[voltmx.sdk.websocket.constants.UNSUBSCRIBE_OPTION_CLOSE_CONNECTION] === voltmx.sdk.websocket.constants.BOOLEAN_TRUE) {

                voltmx.sdk.logsdk.info(TAG + "unSubscribeServerEvents:: Closing the webSocket connection.");
                voltmx.sdk.websocket.unSubscribeServerEvents(eventsString, null, unSubscribeOptions);
                return;
            }

        }

        if(!voltmx.sdk.util.isNullOrUndefinedOrEmptyObject(events)) {

            var mode = segregateEventModes(unSubscribeOptions, voltmx.sdk.websocket.constants.WEBSOCKET_UNSUBSCRIBE_EVENTS);

            if (voltmx.sdk.isNullOrUndefined(mode)) {

                voltmx.sdk.logsdk.error(TAG + "unSubscribeServerEvents:: Event mode passed is not valid.");
                callbackErrorInvoker(voltmx.sdk.websocket.constants.WEBSOCKET_TYPE_ONERROR,
                    voltmx.sdk.websocket.constants.INVALID_MODE_PROVIDED_MESSAGE, onErrorCallback);
                return;
            }

            voltmx.sdk.claimsRefresh(function () {

                eventsString = createEventsPayloadString(events, mode, voltmx.sdk.websocket.constants.WEBSOCKET_UNSUBSCRIBE_EVENTS);

                if (voltmx.sdk.isNullOrUndefined(eventsString)) {

                    voltmx.sdk.logsdk.error(TAG + "unSubscribeServerEvents:: Event string passed is not valid.");
                    callbackErrorInvoker(voltmx.sdk.websocket.constants.WEBSOCKET_TYPE_ONERROR,
                        voltmx.sdk.websocket.constants.INVALID_EVENT_STRING_MESSAGE, onErrorCallback);
                    return;
                }

                if (isOptionObjectValid(unSubscribeOptions.onUnsubscribeCallback)) {
                    voltmx.sdk.websocket.unSubscribeServerEvents(eventsString, unSubscribeOptions.onUnsubscribeCallback, unSubscribeOptions);
                } else {
                    voltmx.sdk.websocket.unSubscribeServerEvents(eventsString, null, unSubscribeOptions);
                }

            }, function (error) {
                voltmx.sdk.logsdk.error(TAG + "unSubscribeServerEvents::onFailure Error:", error);
                callbackErrorInvoker(voltmx.sdk.websocket.constants.WEBSOCKET_TYPE_ONERROR, error, onErrorCallback);
            });
        } else{

            voltmx.sdk.logsdk.error(TAG + "unSubscribeServerEvents:: Events to be unsubscribed for are null or undefined or empty.");
            callbackErrorInvoker(voltmx.sdk.websocket.constants.WEBSOCKET_TYPE_ONERROR,
                "Events to be Unsubscribed are null or undefined or empty.", onErrorCallback);
            return;
        }

    };

    // Initialise serverEvents
    initializeWebSocketConstants();
    initializeWebSocketHandler();

    //#ifdef PLATFORM_SPA
    initializeWebSocketManager();
    initializeWebSocketResponseMessage();
    initializeWebSocketResponseHandler();
    //#endif
}
