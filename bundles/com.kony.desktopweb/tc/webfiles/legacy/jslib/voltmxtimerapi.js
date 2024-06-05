$KI.timer = (function() {
    
    

    var module = {
        timerinfo: {},

        callbackclosure: function(id) {
            var tid = id;
            return function() {
                var repeat, _timerInfo, cb = module.timerinfo[tid]["cb"];
                typeof cb == "function" && cb();
                _timerInfo = module.timerinfo[tid];
                if(_timerInfo) {
                    repeat = _timerInfo["repeat"];
                    !repeat && module.cancel(tid);
                }
            };
        },

        schedule: function(id, cb, interval, repeat) {
            $KU.logExecuting('voltmx.timer.schedule');
            $KU.logExecutingWithParams('voltmx.timer.schedule', id, cb, interval, repeat);
            var tinfo = module.timerinfo;

            if(id && !tinfo[id]) {
                tinfo[id] = {};
                tinfo[id]["cb"] = cb;
                tinfo[id]["repeat"] = repeat;

                var tcb = module.callbackclosure(id);
                var frequency = interval * 1000; 
                var func = (repeat === true) ? "setInterval" : "setTimeout";

                timerid = window[func](tcb, frequency);
                tinfo[id]["timerid"] = timerid;
                $KU.logExecutingFinished('voltmx.timer.schedule');
            } else
                $KU.logErrorMessage('timerId is mandatory or duplicate timer id');
        },

        cancel: function(id) {
            $KU.logExecuting('voltmx.timer.cancel');
            $KU.logExecutingWithParams('voltmx.timer.cancel', id);
            var tinfo = module.timerinfo;
            if(tinfo[id]) {
                var timerid = tinfo[id].timerid;
                var func = (tinfo[id]["repeat"] === true) ? "clearInterval" : "clearTimeout";
                $KU.logExecutingFinished('voltmx.timer.cancel');
                window[func](timerid);
                tinfo[id] = null

            } else {
                $KU.logErrorMessage('timerId is mandatory');
                return null;
            }
        },

        setcallback: function(id, cb) {
            $KU.logExecuting('voltmx.timer.setCallBack');
            $KU.logExecutingWithParams('voltmx.timer.setCallBack', id, cb);
            var tinfo = module.timerinfo;
            if(tinfo[id]) {
                tinfo[id].cb = cb;
            }
            $KU.logExecutingFinished('voltmx.timer.setCallBack');
        }
    };


    return module;
}());

$KI.appevents = (function() {
    var idletimeout = {
        id: null,
        value: 0,
        cb: null,
        enabled: false,
        expired: false,
        lastInteraction: 0
    };

    return {
        timercb: function() {
            var currentform = $KW.Form.getCurrentForm();
            var cb = null;

            idletimeout.expired = true;
            idletimeout.enabled = false;

            if(currentform.enabledforidletimeout) {
                
                
                if(idletimeout.cb) {
                    cb = idletimeout.cb;
                    idletimeout.cb = null;
                    cb(currentform);
                }
            }
        },

        registerforidletimeout: function(time, cb) {
            $KU.logExecuting('voltmx.application.registerForIdleTimeout');
            $KU.logExecutingWithParams('voltmx.application.registerForIdleTimeout', time, cb);
            if(!idletimeout.enabled) {
                
                idletimeout.value = time * 60 * 1000;
                idletimeout.id = setTimeout($KI.appevents.timercb, idletimeout.value);
                idletimeout.lastInteraction = new Date().getTime();
                idletimeout.enabled = true;
                idletimeout.expired = false;
                idletimeout.cb = cb;
                $KG["__idletimeout"] = idletimeout;
                $KU.logExecutingFinished('voltmx.application.registerForIdleTimeout');
            }
        },

        unregisterforidletimeout: function() {
            $KU.logExecuting('voltmx.application.unregisterForIdleTimeout');
            $KU.logExecutingWithParams('voltmx.application.unregisterForIdleTimeout');
            clearTimeout(idletimeout.id);
            idletimeout.enabled = false;
            $KG["__idletimeout"] = "";
            $KU.logExecutingFinished('voltmx.application.unregisterForIdleTimeout');
        },

        resettimer: function() {
            
            var curTime = new Date().getTime();
            if((curTime - idletimeout.lastInteraction) >= idletimeout.value) {
                $KI.appevents.timercb();
                return;
            } else {
                clearTimeout(idletimeout.id);
                idletimeout.id = setTimeout($KI.appevents.timercb, idletimeout.value);
                idletimeout.lastInteraction = curTime;
            }
        }
    };
})();
