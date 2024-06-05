

Object.defineProperty(voltmx, 'location', {configurable:false, enumerable:false, writable:false, value:(function() {
    var _ns = {}, $K = voltmx.$kwebfw$;

    var _clearWatch = function(watchId) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils;

        $KU.log({api:'voltmx.location.clearWatch', enter:true});

        if($KU.browser('supports', 'geolocation')) {
            $KU.log({api:'voltmx.location.clearWatch', exit:true});
            navigator.geolocation.clearWatch(watchId);
        }
    };


    var _getCurrentPosition = function(successCallback, errorCallback, positionOptions) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils;

        $KU.log({api:'voltmx.location.getCurrentPosition', enter:true});

        if($KU.browser('supports', 'geolocation')) {
            $KU.log({api:'voltmx.location.getCurrentPosition', exit:true});
            navigator.geolocation.getCurrentPosition(successCallback, errorCallback, positionOptions);
        }
    };

    var _watchPosition = function(successCallback, errorCallback, positionOptions) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, watchId = null;

        $KU.log({api:'voltmx.location.watchPosition', enter:true});

        if($KU.browser('supports', 'geolocation')) {
            $KU.log({api:'voltmx.location.watchPosition', exit:true});
            watchId = navigator.geolocation.watchPosition(successCallback, errorCallback, positionOptions);
        }

        return watchId;
    };


    $K.defVoltmxProp(_ns, [
        {keey:'PERMISSION_DENIED', value:1},
        {keey:'POSITION_UNAVAILABLE', value:2},
        {keey:'TIMEOUT', value:3},
        {keey:'clearWatch', value:_clearWatch},
        {keey:'getCurrentPosition', value:_getCurrentPosition},
        {keey:'watchPosition', value:_watchPosition}
    ]);


    return _ns;
}())});
