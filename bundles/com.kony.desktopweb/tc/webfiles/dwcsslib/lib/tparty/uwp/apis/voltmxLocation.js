if (window && window.Windows && Windows && Windows.UI && Windows.UI.Popups) {
    voltmx.location.getCurrentPosition = function (successcallback, errorcallback, positionoptions) {
        var positionoptionsFinal = null;
        var events = new PWAWrapper.CallbackEvents();
        events.addEventListener("success", getWinRTFunctionObject(successcallback));
        if (typeof errorcallback == "function") {
            events.addEventListener("failure", getWinRTFunctionObject(errorcallback));
        }
        else if (typeof errorcallback == "object") {
            positionoptionsFinal = errorcallback;
        }
        if (typeof positionoptions == "object") {
            positionoptionsFinal = positionoptions;
        }
        PWAWrapper.LocationWrapper.getCurrentPosition(events, getWinRTObject(positionoptionsFinal));
    }
    voltmx.location.watchPosition = function (successcallback, errorcallback, positionoptions) {
        var positionoptionsFinal = null;
        var events = new PWAWrapper.CallbackEvents();
        events.addEventListener("success", getWinRTFunctionObject(successcallback));
        if (typeof errorcallback == "function") {
            events.addEventListener("failure", getWinRTFunctionObject(errorcallback));
        }
        else if (typeof errorcallback == "object") {
            positionoptionsFinal = errorcallback;
        }
        if (typeof positionoptions == "object") {
            positionoptionsFinal = positionoptions;
        }
        var returnValue = PWAWrapper.LocationWrapper.watchPosition(events, getWinRTObject(positionoptionsFinal));
        return returnValue;
    }
    voltmx.location.clearWatch = function (watchID) {
        PWAWrapper.LocationWrapper.clearWatch(getWinRTObject(watchID));
    }
    voltmx.location.mylocation = function (successcallback, errorcallback, positionoptions) {
        var positionoptionsFinal = null;
        var events = new PWAWrapper.CallbackEvents();
        events.addEventListener("success", getWinRTFunctionObject(successcallback));
        if (typeof errorcallback == "function") {
            events.addEventListener("failure", getWinRTFunctionObject(errorcallback));
        }
        else if (typeof errorcallback == "object") {
            positionoptionsFinal = errorcallback;
        }
        if (typeof positionoptions == "object") {
            positionoptionsFinal = positionoptions;
        }
        PWAWrapper.LocationWrapper.getCurrentPosition(events, getWinRTObject(positionoptionsFinal));
    }
    voltmx.location.createGeofences = function (positionoptions) {
        PWAWrapper.LocationWrapper.createGeofences(getWinRTObject(positionoptions));
    }
    voltmx.location.clearAllGeofences = function () {
        PWAWrapper.LocationWrapper.clearAllGeofences();
    }
    voltmx.location.setGeofencesCallback = function (EntryExitCallback, ErrorCallback) {
        var events = new PWAWrapper.CallbackEvents();
        events.addEventListener("success", getWinRTFunctionObject(EntryExitCallback));
        events.addEventListener("failure", getWinRTFunctionObject(ErrorCallback));
        PWAWrapper.LocationWrapper.setGeofencesCallback(events);
    }
}