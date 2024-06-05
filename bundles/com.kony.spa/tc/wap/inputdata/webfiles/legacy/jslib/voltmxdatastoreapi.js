$KI.ds = (function() {
    var module = null;

    var _clear = function() {
        localStorage.clear(); 
        localStorage.setItem(voltmx.globals.appid, JSON.stringify($KU.createBlankLocalStorage()));
    };

    var _getItem = function(key) {
        var store = $KU.getLocalStorage(),
            data = store.data,
            i = 0,
            item = null,
            len = data.length;

        for(i = 0; i < len; i++) {
            if(data[i].key === key) {
                item = data[i].value;
                break;
            }
        }

        return item;
    };

    var _getKeyAt = function(index) {
        var store = $KU.getLocalStorage(),
            data = store.data[index];
        return(data) ? data.key : null;
    };

    var _getLength = function() {
        var store = $KU.getLocalStorage();
        return store.data.length;
    };

    var _getValueAt = function(index) {
        var store = $KU.getLocalStorage(),
            data = store.data[index];
        return(data) ? data.value : null;
    };

    var _removeItem = function(key) {
        var store = $KU.getLocalStorage(),
            data = store.data,
            i = 0,
            index = -1,
            len = data.length;

        for(i = 0; i < len; i++) {
            if(data[i].key === key) {
                index = i;
                break;
            }
        }
        
        if(index >= 0) {
            store.data.splice(index, 1);
            localStorage.setItem(voltmx.globals.appid, JSON.stringify(store));
        }
    };

    var _setItem = function(key, value) {
        var store = $KU.getLocalStorage(),
            data = store.data,
            i = 0,
            index = -1,
            len = data.length;

        for(i = 0; i < len; i++) {
            if(data[i].key === key) {
                index = i;
                break;
            }
        }

        if(index === -1) { 
            store.data.push({
                key: key,
                value: value
            });
        } else { 
            store.data[index].value = value;
        }

        localStorage.setItem(voltmx.globals.appid, JSON.stringify(store));
    };

    try {
        if(typeof(localStorage) === "object") {
            module = {
                save: function(tbl, dbname, metainfo) {
                    $KU.logExecuting('voltmx.ds.save');
                    if(localStorage) {
                        try {
                            $KU.logExecutingWithParams('voltmx.ds.save', tbl, dbname, metainfo);
                            _setItem(dbname, tbl);
                        } catch(e) {
                            if(e.name == "QUOTA_EXCEEDED_ERR") {
                                var errcode = 0,
                                    errmsg = "";

                                if(localStorage.length === 0) {
                                    $KU.logErrorMessage('Private Browsing is switched ON');
                                    errcode = 707;
                                    errmsg = "Private Browsing is switched ON";
                                } else {
                                    $KU.logErrorMessage('Data storage limit has exceeded');
                                    errcode = 708;
                                    errmsg = "Data storage limit has exceeded";
                                }
                                return {
                                    "errcode": errcode,
                                    "errmsg": errmsg
                                };
                            }
                        }
                    } else {
                        $KU.logWarnMessage('localstorage is not supported');
                        voltmx.print("localStorage not supported");
                    }
                    $KU.logExecutingFinished('voltmx.ds.save');
                },

                read: function(dbname) {
                    $KU.logExecuting('voltmx.ds.read');
                    $KU.logExecutingWithParams('voltmx.ds.read', dbname);
                    if(localStorage) {
                        $KU.logExecutingFinished('voltmx.ds.read');
                        return _getItem(dbname);
                    } else {
                        $KU.logWarnMessage('localStorage readitem failed');
                        voltmx.print("localStorage readitem failed");
                        return null;
                    }
                },

                Delete: function(dbname) {
                    if(localStorage) {
                        _removeItem(dbname);
                        return true;
                    } else {
                        voltmx.print("localStorage delete failed");
                        return false;
                    }
                }
            };

            $KI.localstorage = {
                key: function(index) {
                    $KU.logExecuting('voltmx.store.key');
                    $KU.logExecutingWithParams('voltmx.store.key', index);
                    $KU.logExecutingFinished('voltmx.store.key');
                    return _getKeyAt(index);
                },

                getitem: function(keyname) {
                    $KU.logExecuting('voltmx.store.getItem');
                    $KU.logExecutingWithParams('voltmx.store.getItem', keyname);
                    $KU.logExecutingFinished('voltmx.store.getItem');
                    return _getItem(keyname);
                },

                setitem: function(keyname, value) {
                    $KU.logExecuting('voltmx.store.setitem');
                    $KU.logExecutingWithParams('voltmx.store.setitem', keyname, value);
                    try {
                        _setItem(keyname, value);
                    } catch(e) {
                        if(e.name == "QUOTA_EXCEEDED_ERR") {
                            if(localStorage.length === 0) {
                                voltmx.web.logger("warn", "Private Browsing is switched ON");
                            } else {
                                voltmx.web.logger("warn", "Data storage limit has exceeded");
                            }
                        }
                    }
                    $KU.logExecutingFinished('voltmx.store.setitem');
                },

                removeitem: function(keyname) {
                    $KU.logExecuting('voltmx.store.removeitem');
                    $KU.logExecutingWithParams('voltmx.store.removeitem', keyname);
                    $KU.logExecutingFinished('voltmx.store.removeitem');
                    _removeItem(keyname);
                },

                clear: function() {
                    _clear();
                },

                length: function() {
                    $KU.logExecuting('voltmx.store.length');
                    $KU.logExecutingWithParams('voltmx.store.length');
                    $KU.logExecutingFinished('voltmx.store.length');
                    return _getLength();
                }
            };
        } else {
            voltmx.print("localStorage not supported");
        }
    } catch(e) {
        module = {
            save: function() {},
            read: function(dbname) {},
            Delete: function(dbname) {}
        };
    }


    return module;
}());
