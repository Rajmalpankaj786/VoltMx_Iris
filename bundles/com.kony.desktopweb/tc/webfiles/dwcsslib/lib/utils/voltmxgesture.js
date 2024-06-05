(function() {
    //All sliders knob sliding
    /*
    Iterate over DOM till you encounter attribute kwg or kw
    If kwg is encountered, then find "kw" attribute and match their vlaues.
    If values are matched, then perform task
    //*/
    var $K = voltmx.$kwebfw$, $KD = $K.dom, body = $KD.body(), touchStartFired = false;

    $KD.on(body, ['mousedown', 'touchstart'], 'tapgesture', function(evt) {
        var $K = voltmx.$kwebfw$, $KW = $K.widget, $KD = $K.dom,
            $KA = $K.app, target = null, model = null;
        //eslint-disable-next-line no-unused-vars
        var moveEvent = '';
        //eslint-disable-next-line no-unused-vars
        var endEvent = '';

        if(evt.type === 'touchstart') touchStartFired = true;

        if(touchStartFired && evt.type === 'mousedown') {
            touchStartFired = false;
        } else {
            if(evt.type === 'touchstart') {
                moveEvent = ['touchmove'];
                endEvent = ['touchend', 'touchcancel'];
            } else {
                moveEvent = ['mousemove'];
                endEvent = ['mouseup', 'mouseout'];
            }

            //console.error(evt.type+' :: '+touchStartFired); //Don't delete this line
            $KA.lastInteractionAt = new Date();
            $KW.registerForIdleTimeout();

            target = $KD.closest(evt.target, function(node) {
                var $K = voltmx.$kwebfw$, $KD = $K.dom;

                if($KD.hasAttr(node, 'kwg')) {
                    return true;
                } else if($KD.hasAttr(node, 'kw')) {
                    return false;
                }
            });

            if(target) {
                model = $KD.closest(target, 'kw');

                if(model && $KD.getAttr(target, 'kwg') === $KD.getAttr(model, 'kw')) {
                    model = $KW.model(model);

                    if(model) { //Here evt.type === 'mousedown/touchstart'
                        //
                    }
                }
            }
        }
    }, {passive:false});
}());


(function() {
    //All images pinch n zoom
    /*
    Iterate over DOM till you encounter attribute kwg or kw
    If kwg is encountered, then find "kw" attribute and match their vlaues.
    If values are matched, then perform task
    //*/
}());


Object.defineProperty(voltmx.$kwebfw$, 'gesture', {configurable:false, enumerable:false, writable:false, value:(function() {
    var _ns = {}, $K = voltmx.$kwebfw$;


    var _longpress = function $KG_longpress() {
        //
    };


    var _pan = function $KG_pan() {
        //
    };


    var _pinch = function $KG_pinch() {
        //
    };


    var _rotation = function $KG_rotation() {
        //
    };


    var _swipe = function $KG_swipe() {
        //
    };


    var _tap = function $KG_tap() {
        //
    };


    $K.defVoltmxProp(_ns, [
        {keey:'longpress', value:_longpress},
        {keey:'pan', value:_pan},
        {keey:'pinch', value:_pinch},
        {keey:'rotation', value:_rotation},
        {keey:'swipe', value:_swipe},
        {keey:'tap', value:_tap}
    ]);


    return _ns;
}())});
