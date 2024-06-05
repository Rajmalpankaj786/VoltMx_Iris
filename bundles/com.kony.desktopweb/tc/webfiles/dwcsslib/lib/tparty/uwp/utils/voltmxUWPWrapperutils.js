if (window && window.Windows && Windows && Windows.UI && Windows.UI.Popups) {
    function getWinRTObject(jsobject) {
        if (typeof (jsobject) === "string") {
            return String(jsobject);
        }
        else if (typeof (jsobject) === "number") {
            return Number(jsobject);
        }
        else if (typeof (jsobject) === "boolean") {
            return Boolean(jsobject);
        }
        else if (Array.isArray(jsobject)) {
            var array = [];
            for (var i = 0; i < jsobject.length; i++) {
                array.push(getWinRTObject(jsobject[i]));
            }
            return array;
        }
        else if (jsobject !== undefined && jsobject !== null && typeof (jsobject) === 'object') {
            var ps = new Windows.Foundation.Collections.PropertySet();
            for (var key in jsobject) {
                if (jsobject.hasOwnProperty(key)) {
                    var value = jsobject[key];
                    if (typeof (value) === 'object' || Array.isArray(value)) {
                        ps[key] = getWinRTObject(value);
                    }
                    else {
                        ps[key] = value;
                    }
                }
            }
            return ps;
        }
        else {
            return null;
        }
    }
    function getWinRTFunctionObject(callback) {
        if (null === callback)
            return null;
        else {
            var Callback = function (e) {
                callback.apply(null, e.args);
            };
            return Callback;
        }
    }
    function getWinRTObjectArray(params, ignoreparams) {
        var retValues = [];
        for (let param of params) {
            if (param === undefined)
                break;
            if (ignoreparams !== undefined && ignoreparams !== null && ignoreparams.includes(param))
                retValues.push(param);
            else
                retValues.push(getWinRTObject(param));
        }
        return retValues;
    }
    function getJSArray(jsobject) {
        if (null === jsobject)
            return null;
        var array = [];
        if (jsobject.length > 0) {
            for (var i = 0; i < jsobject.length; i++) {
                array.push(jsobject[i]);
            }
        }
        return array;
    }
    function initializePWA() {
        PWAWrapper.PWAApplication.initialize();
    }
    function initializeConstants() {
        //File
        constants.FILE_PATH_SEPARATOR = "\\";
    }
    alert = function (msg) {
        PWAWrapper.PWAApplication.alert(getWinRTObject(msg));
    };
    voltmx.print = function (msg) {
        PWAWrapper.PWAApplication.print(getWinRTObject(msg));
    };
    var defineProperty_RO = function (object, property, wrapperObj) {
        Object.defineProperty(object, property,
            {
                get: function () {
                    return wrapperObj.getProperty(getWinRTObjectArray([property]));
                }
            });
    };
    var defineProperty_RW = function (object, property, wrapperObj) {
        Object.defineProperty(object, property,
            {
                get: function () {
                    return wrapperObj.getProperty(getWinRTObjectArray([property]));
                },
                set: function (value) {
                    wrapperObj.setProperty(getWinRTObjectArray([property, value]));
                }
            });
    };
    initializeConstants();
    initializePWA();
}