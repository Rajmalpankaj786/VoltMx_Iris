(function() {
    var _clean = function(namespace, arg1) {
        var $K = voltmx.$kwebfw$, $KA = $K.app,
            $KU = $K.utils, store = $KU.getLocalStorage();

        if($KU.is(store, 'object') && store.migrated === true) {
            if(arg1 === true) {
                store[namespace] = [];
            } else if(store.ns[namespace]
            && store.ns[namespace].length) {
                store.ns[namespace] = [];
            }

            $K.store.put('local', $KA.id, JSON.stringify(store));
        } else {
            $K.store.clear('local'); //For backward compatibility
            $K.store.put('local', $KA.id, JSON.stringify($KU.createBlankLocalStorage()));
        }
    };


    var _delete = function(key, namespace, arg2) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KA = $K.app, data = null,
            store = $KU.getLocalStorage(), i = 0, index = -1, len = 0;

        if(arg2 === true) {
            data = store[namespace];
        } else {
            data = store.ns[namespace];
        }

        if($KU.is(data, 'array')) {
            len = data.length;

            for(i = 0; i < len; i++) {
                if(data[i].key === key) {
                    index = i;
                    break;
                }
            }
        }

        if(index >= 0) {
            data.splice(index, 1);
            $K.store.put('local', $KA.id, JSON.stringify(store));
        }
    };


    var _fetch = function(key, namespace, arg2) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils,
            store = $KU.getLocalStorage(), i = 0,
            len = 0, item = null, data = null;

        if(arg2 === true) {
            data = store[namespace];
        } else {
            data = store.ns[namespace];
        }

        if($KU.is(data, 'array')) {
            len = data.length;

            for(i = 0; i < len; i++) {
                if(data[i].key === key) {
                    item = data[i].value;
                    break;
                }
            }
        }

        return item;
    };


    var _getLength = function(namespace, arg1) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils,
            store = $KU.getLocalStorage(), data = null;

        if(arg1 === true) {
            data = store[namespace];
        } else {
            data = store.ns[namespace];
        }

        return ($KU.is(data, 'array')) ? data.length : 0;
    };


    var _keyAt = function(index, namespace, arg2) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils,
            store = $KU.getLocalStorage(), data = null;

        if(arg2 === true) {
            data = store[namespace];
        } else {
            data = store.ns[namespace];
        }

        if($KU.is(data, 'array')) data = data[index];

        return (data) ? data.key : null;
    };


    var _put = function(key, value, namespace, arg3) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KA = $K.app, data = null,
            store = $KU.getLocalStorage(), i = 0, index = -1, len = 0;

        if(arg3 === true) {
            data = store[namespace];
        } else {
            if(!$KU.is(store.ns[namespace], 'array')) {
                store.ns[namespace] = [];
            }

            data = store.ns[namespace];
        }

        if($KU.is(data, 'array')) {
            len = data.length;

            for(i = 0; i < len; i++) {
                if(data[i].key === key) {
                    index = i;
                    break;
                }
            }

            if(index === -1) { //New key
                data.push({
                    key: key,
                    value: value
                });
            } else { //Existing key
                data[index].value = value;
            }

            $K.store.put('local', $KA.id, JSON.stringify(store));
        }
    };


    Object.defineProperty(voltmx, 'ds', {configurable:false, enumerable:false, writable:false, value:(function() {
        var _ns = {}, $K = voltmx.$kwebfw$;


        var _read = function(name, storeContext) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils;

            $KU.log({api:'voltmx.ds.read', enter:true});

            if(typeof storeContext === 'string' && storeContext) {
                $KU.log({api:'voltmx.ds.read', exit:true});
                return _fetch(name, storeContext);
            }
            $KU.log({api:'voltmx.ds.read', exit:true});
            return _fetch(name, 'ds', true);
        };


        var _remove = function(name, storeContext) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils;

            $KU.log({api:'voltmx.ds.remove', enter:true});

            if(typeof storeContext === 'string' && storeContext) {
                _delete(name, storeContext);
            } else {
                _delete(name, 'ds', true);
            }

            $KU.log({api:'voltmx.ds.remove', exit:true});

            return true;
        };


        var _save = function(inputtable, name, metainfo /*, storeContext*/) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils;

            $KU.log({api:'voltmx.ds.save', enter:true});

            if(typeof metainfo === 'string' && metainfo) {
                _put(name, inputtable, metainfo);
            } else if(arguments.length === 2
            || (typeof metainfo === 'object' && metainfo)) {
                _put(name, inputtable, 'ds', true);
            }

            $KU.log({api:'voltmx.ds.save', exit:true});
        };


        $K.defVoltmxProp(_ns, [
            {keey:'read', value:_read},
            {keey:'remove', value:_remove},
            {keey:'save', value:_save}
        ]);


        return _ns;
    }())});


    Object.defineProperty(voltmx, 'store', {configurable:false, enumerable:false, writable:false, value:(function() {
        var _ns = {}, $K = voltmx.$kwebfw$;


        var _clear = function(arg0) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils;

            $KU.log({api:'voltmx.store.clear', enter:true});

            //eslint-disable-next-line no-undef
            if(typeof storeContext === 'string' && storeContext) {
                _clean(arg0);
            } else {
                _clean('store', true);
            }

            $KU.log({api:'voltmx.store.clear', exit:true});
        };


        var _getItem = function(key, arg1) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils;

            $KU.log({api:'voltmx.store.getItem', enter:true});

            if(typeof arg1 === 'string' && arg1) {
                $KU.log({api:'voltmx.store.getItem', exit:true});
                return _fetch(key, arg1);
            }
            $KU.log({api:'voltmx.store.getItem', exit:true});
            return _fetch(key, 'store', true);
        };


        var _key = function(index, arg1) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils;

            $KU.log({api:'voltmx.store.key', enter:true});

            if(typeof arg1 === 'string' && arg1) {
                $KU.log({api:'voltmx.store.key', exit:true});
                return _keyAt(index, arg1);
            }
            $KU.log({api:'voltmx.store.key', exit:true});
            return _keyAt(index, 'store', true);
        };


        var _length = function(arg0) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils;

            $KU.log({api:'voltmx.store.length', enter:true});

            if(typeof arg0 === 'string' && arg0) {
                $KU.log({api:'voltmx.store.length', exit:true});
                return _getLength(arg0);
            }
            $KU.log({api:'voltmx.store.length', exit:true});
            return _getLength('store', true);
        };


        var _removeItem = function(keey, arg1) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils;

            $KU.log({api:'voltmx.store.removeItem', enter:true});

            if(typeof arg1 === 'string' && arg1) {
                _delete(keey, arg1);
            } else {
                _delete(keey, 'store', true);
            }

            $KU.log({api:'voltmx.store.removeItem', exit:true});
        };


        var _setItem = function(keey, value, arg2) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils;

            $KU.log({api:'voltmx.store.setItem', enter:true});

            if(typeof arg2 === 'string' && arg2) {
                _put(keey, value, arg2);
            } else {
                _put(keey, value, 'store', true);
            }

            $KU.log({api:'voltmx.store.setItem', exit:true});
        };


        $K.defVoltmxProp(_ns, [
            {keey:'clear', value:_clear},
            {keey:'getItem', value:_getItem},
            {keey:'key', value:_key},
            {keey:'length', value:_length},
            {keey:'removeItem', value:_removeItem},
            {keey:'setItem', value:_setItem}
        ]);


        return _ns;
    }())});
}());
