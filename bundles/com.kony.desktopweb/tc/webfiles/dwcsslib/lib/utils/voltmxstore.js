Object.defineProperty(voltmx.$kwebfw$, 'store', {configurable:false, enumerable:false, writable:false, value:(function() {
    var _ns = {}, $K = voltmx.$kwebfw$;


    var _ = {
        local: {
            clear: function() {
                if(window.localStorage) {
                    localStorage.clear();
                } else {
                    //LOG:: LOG WARNING - 'localStorage is not available.'
                }
            },

            fetch: function(key) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, data = null;

                if(window.localStorage) {
                    data = localStorage.getItem(key);
                    data = ($KU.is(data, 'string')) ? data : null;
                } else {
                    //LOG:: LOG WARNING - 'localStorage is not available.'
                }

                return data;
            },

            put: function(key, value) {
                var success = true;

                if(window.localStorage) {
                    try{
                        localStorage.setItem(key, value);
                    } catch(err) {
                        success = false;

                        if(err.name === 'QUOTA_EXCEEDED_ERR'
                        || err.name === 'QuotaExceededError') {
                            if(localStorage.length === 0) {
                                //LOG:: LOG WARNING - 'Private Browsing is switched ON.'
                            } else {
                                //LOG:: LOG WARNING - 'Local storage limit has exceeded.'
                            }
                        } else {
                            //LOG:: LOG ERROR - 'Unexpected error encountered.'
                        }
                    }
                } else {
                    success = false;
                    //LOG:: LOG WARNING - 'localStorage is not available.'
                }

                return success;
            },

            remove: function(key) {
                if(window.localStorage) {
                    localStorage.removeItem(key);
                } else {
                    //LOG:: LOG WARNING - 'localStorage is not available.'
                }
            }
        },


        session: {
            clear: function() {
                if(window.sessionStorage) {
                    sessionStorage.clear();
                } else {
                    //LOG:: LOG WARNING - 'sessionStorage is not available.'
                }
            },

            fetch: function(key) {
                if(window.sessionStorage) {
                    return sessionStorage.getItem(key);
                }
                //LOG:: LOG WARNING - 'sessionStorage is not available.'

                return null;
            },

            put: function(key, value) {
                if(window.sessionStorage) {
                    try{
                        sessionStorage.setItem(key, value);
                    } catch(err) {
                        if(err.name === 'QUOTA_EXCEEDED_ERR'
                        || err.name === 'QuotaExceededError') {
                            if(sessionStorage.length === 0) {
                                //LOG:: LOG WARNING - 'Private Browsing is switched ON.'
                            } else {
                                //LOG:: LOG WARNING - 'Session storage limit has exceeded.'
                            }
                        } else {
                            //LOG:: LOG ERROR - 'Unexpected error encountered.'
                        }
                    }
                } else {
                    //LOG:: LOG WARNING - 'sessionStorage is not available.'
                }
            },

            remove: function(key) {
                if(window.sessionStorage) {
                    sessionStorage.removeItem(key);
                } else {
                    //LOG:: LOG WARNING - 'sessionStorage is not available.'
                }
            }
        }
    };


    var _clear = function(type) {
        _[type] && _[type].clear();
    };


    var _fetch = function(type, key) {
        if(_[type]) return _[type].fetch(key);
        return null;
    };


    var _put = function(type, key, value) {
        if(_[type]) return _[type].put(key, value);
        return false;
    };


    var _remove = function(type, key) {
        _[type] && _[type].remove(key);
    };


    $K.defVoltmxProp(_ns, [
        {keey:'clear', value:_clear},
        {keey:'fetch', value:_fetch},
        {keey:'put', value:_put},
        {keey:'remove', value:_remove}
    ]);


    return _ns;
}())});
