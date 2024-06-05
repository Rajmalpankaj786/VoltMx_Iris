if (window && window.Windows && Windows && Windows.UI && Windows.UI.Popups) {
    voltmx.net = voltmx.net || {};
    voltmx.net.urlDecode = function (queryParams) {
        var returnValue = PWAWrapper.NetworkWrapper.urlDecode(getWinRTObjectArray([queryParams]));
        return returnValue;
    }
    voltmx.net.urlEncode = function (queryParams) {
        var returnValue = PWAWrapper.NetworkWrapper.urlEncode(getWinRTObjectArray([queryParams]));
        return returnValue;
    }
}
