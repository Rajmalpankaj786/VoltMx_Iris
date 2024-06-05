$KI.geolocation = (function() {
    
    

    var module = {
        getcurrentposition: function(successCallback, errorCalback, positionOptions) {
            $KU.logExecuting('voltmx.location.getCurrentPosition');
            $KU.logExecutingWithParams('voltmx.location.getCurrentPosition', successCallback, errorCalback, positionOptions);

            if(navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(successCallback, errorCalback, positionOptions);
            }

            $KU.logExecutingFinished('voltmx.location.getCurrentPosition');
        },

        watchposition: function(successCallback, errorCalback, positionOptions) {
            $KU.logExecuting('voltmx.location.watchPosition');
            $KU.logExecutingWithParams('voltmx.location.watchPosition', successCallback, errorCalback, positionOptions);
            if(navigator.geolocation) {
                $KU.logExecutingFinished('voltmx.location.watchPosition');
                return(navigator.geolocation.watchPosition(successCallback, errorCalback, positionOptions));
            }
        },

        clearwatch: function(watchid) {
            $KU.logExecuting('voltmx.location.clearWatch');
            $KU.logExecutingWithParams('voltmx.location.clearWatch', watchid);
            if(navigator.geolocation) {
                navigator.geolocation.clearWatch(watchid);
            }
            $KU.logExecutingFinished('voltmx.location.clearWatch');
        }
    };


    return module;
}());
