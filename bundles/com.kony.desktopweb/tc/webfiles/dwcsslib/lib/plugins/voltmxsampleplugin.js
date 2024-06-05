/* global Volt MX */
(function() {
    var _default = {};

    var _map = {};


    voltmx.$kwebfw$.plugins.Sample = function(el, config) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KD = $K.dom, prop = null;
        this.id = 'K'+$KU.uid();

        if(_map.hasOwnProperty(this.id)) {
            //Throw Error
            return;
        }

        _map[this.id] = {};
        prop = _map[this.id];

        $KU.each(_default, function(value, key) {
            prop[key] = (config.hasOwnProperty(key)) ? config[key] : value;
        });
    };

    voltmx.$kwebfw$.plugins.Sample.prototype = {
        _get: function(property) {
            return _map[this.id][property];
        },

        destroy: function() {
            delete  _map[this.id];
        },

        disable: function() {
            //
        },

        enable: function() {
            //
        },

        handleEvent: function(e) {
            switch(e.type) {
            case 'touchstart':
            case 'pointerdown':
            case 'MSPointerDown':
            case 'mousedown':
                //_onStart.call(this, e);
                break;

            case 'touchmove':
            case 'pointermove':
            case 'MSPointerMove':
            case 'mousemove':
                //_onMove.call(this, e);
                break;

            case 'touchend':
            case 'pointerup':
            case 'MSPointerUp':
            case 'mouseup':
            case 'touchcancel':
            case 'pointercancel':
            case 'MSPointerCancel':
            case 'mousecancel':
                //_onEnd.call(this, e);
                break;
            }
        }
    };
}());
