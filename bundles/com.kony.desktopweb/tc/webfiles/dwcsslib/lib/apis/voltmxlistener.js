(function() {
    /**
     * voltmx.listener.create('some_name');
     * var id = voltmx.listener.subscribe('some_name', function(payload) {}, scope);
     * voltmx.listener.broadcast('some_name', payload);
     * voltmx.listener.unsubscribe(id);
     * voltmx.listener.destroy('some_name');
     */

    Object.defineProperty(voltmx, 'listener', {configurable:false, enumerable:false, writable:false, value:(function() {
        var _ns = {}, $K = voltmx.$kwebfw$, _listeners = {}, _map = {};

        var _broadcast = function(name, payload) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils;

            payload = (arguments.length === 1) ?  {}: {data:payload};
            
            if(_listeners[name]) {
                $KU.each(_listeners[name], function(subscription, id) {
                    subscription.call(_map[id].scope, payload);
                });
            }
        };

        var _create = function(name) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils;

            if(name && $KU.is(name, 'string')) {
                if(Object.prototype.hasOwnProperty.call(_listeners, name)) {
                    throw new Error("voltmx error: listener already exists.");
                } else {
                    _listeners[name] = {};
                }
            }
        };

        var _destroy = function(name) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils;

            if(_listeners[name]) {
                $KU.each(_listeners[name], function(subscription, id) {
                    delete _map[id];
                });

                delete _listeners[name];
            }
        };

        var _subscribe = function(name, callback, scope) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils, id = '';

            if(_listeners[name] && $KU.is(callback, 'function')) {
                if(arguments.length === 2) scope = null;

                id = $KU.uid();
                _map[id] = {name:name, scope:scope};
                _listeners[name][id] = callback;
            }

            return id;
        };

        var _unsubscribe = function(id) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils, name = '';

            if(id && $KU.is(id, 'string')) {
                name = (_map[id] && _map[id].name) || '';

                if(name) {
                    delete _map[id];
                    delete _listeners[name][id];
                }
            }
        };

        $K.defVoltmxProp(_ns, [
            {keey:'broadcast', value:_broadcast},
            {keey:'create', value:_create},
            {keey:'destroy', value:_destroy},
            {keey:'subscribe', value:_subscribe},
            {keey:'unsubscribe', value:_unsubscribe}
        ]);

        return _ns;
    }())});
}());
