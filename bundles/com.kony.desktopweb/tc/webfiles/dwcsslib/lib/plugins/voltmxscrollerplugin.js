/* global Volt MX */
(function() {
    var _default = {
        bounce: true,              //[Config Property]: -
        bounceEasing: '',          //[Config Property]: -
        bounceTime: 600,           //[Config Property]: -
        deceleration: 0.0006,      //[Config Property]: -
        direction: 'none',         //[Config Property]: - horizontal/vertical/both/none
        directionLocked: 'none',   //[Private Property]: - horizontal/vertical/both/none
        directionLockThreshold: 5, //[Config Property]: -
        enabled: true,             //[Config Property]: -
        endTime: 0,                //[Private Property] -
        eventPassthrough: true,    //[Config Property]: -
        fade: true,                //[Config Property]: -
        hScroll: false,            //[Config Property]: - Can scroll horizontally
        hScrollBar: null,          //[Private Property] - This holds the HTML Element
        inTransition: false,       //[Book Keeping Property] -
        invertWheelDirection: 1,   //[Config Property]: - Possible values are 1 or -1
        lastLeft: 0,               //[Private Property] -
        lastTop: 0,                //[Private Property] -
        maxLeft: 0,                //[Private Property] -
        maxTop: 0,                 //[Private Property] -
        momentum: true,            //[Config Property]: -
        mouseWheelSpeed: 20,       //[Config Property]: -
        moveTime: 0,               //[Private Property] -
        onEnd: null,               //[Config Property]: - Event callback
        onMove: null,              //[Config Property]: - Event callback
        onStart: null,             //[Config Property]: - Event callback
        scrolee: null,             //[Private Property] - This holds the HTML Element
        scrollBarHeight: 0,        //[Private Property] -
        scrollBarWidth: 0,         //[Private Property] -
        snapThreshold: 0.334,      //[Config Property]: -
        startTime: 0,              //[Private Property] -
        transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        vScroll: false,            //[Config Property]: - Can scroll vertically
        vScrollBar: null           //[Private Property] - This holds the HTML Element
    };

    var _map = {};

    var _attachEvents = function() {
        var $K = voltmx.$kwebfw$, $KU = $K.utils;

        var events = ['touchstart', 'pointerdown', 'MSPointerDown', 'mousedown', 'touchmove', 'pointermove', 'MSPointerMove', 'mousemove', 'touchend', 'pointerup', 'MSPointerUp', 'mouseup', 'touchcancel', 'pointercancel', 'MSPointerCancel', 'mousecancel', 'mouseout', 'mouseleave', 'orientationchange', 'resize', 'transitionend', 'webkitTransitionEnd', 'oTransitionEnd', 'MSTransitionEnd', 'wheel', 'DOMMouseScroll', 'mousewheel', 'keydown', 'click'];

        $KU.each(events, function(value) {
            this.target.addEventListener(value, this, false);
        }, this);
    };

    var _fire = function(duration) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, self = this,
            prop = _map[this.id], interval = 16, lapsed = 0;

        if(!prop.onScroll) return;

        if(duration === 0) {
            prop.onScroll.call(this);
        } else {
            prop.timer = window.setInterval(function() {
                var position = null;

                lapsed += interval;

                if(lapsed <= duration) {
                    position = _position.call(self);

                    if(position.left !== self.left || position.top !== self.top) {
                        self.left = position.left;
                        self.top = position.top;

                        prop.onScroll.call(self);
                    }

                    position = null; //For GC
                }
            }, interval);
        }
    };

    var _momentum = function(current, last, duration, maxScroll, viewportSize) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, prop = _map[this.id], destination = 0,
            distance = current - last, speed = Math.abs(distance) / duration;

        destination = current + (speed * speed) / (2 * prop.deceleration) * (distance < 0 ? -1 : 1);

        if(destination < maxScroll) {
            destination = viewportSize ? maxScroll - (viewportSize / 2.5 * (speed / 8)) : maxScroll;
            distance = Math.abs(destination - current);
            duration = distance / speed;
        } else if(destination > 0) {
            destination = viewportSize ? viewportSize / 2.5 * (speed / 8) : 0;
            distance = Math.abs(current) + destination;
            duration = distance / speed;
        } else {
            duration = speed / prop.deceleration;
        }

        return {destination:Math.round(destination), duration:duration};
    };

    var _onEnd = function(e) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, prop = _map[this.id], top = 0, left = 0,
            deltaX = 0, deltaY = 0, momentumX = 0, momentumY = 0, duration = 0;

        if(!prop.startTime) return;

        duration = new Date().getTime() - prop.startTime;
        deltaX = e.pageX - prop.pageX;
        deltaY = e.pageY - prop.pageY;
        prop.startTime = 0;
//console.error('duration = ' + duration + ' :: ' + 'deltaX = ' + deltaX + ' :: ' + 'deltaY = ' + deltaY);
        if(Math.abs(deltaX) > 10 || Math.abs(deltaY) > 10) {
            prop.pageX = e.pageX;
            prop.pageY = e.pageY;

            top = this.top + deltaY;
            left = this.left + deltaX;

            if(!prop.momentum || duration >= 300) {
                this.scrollTo(left, top);
            } else { //With momentum
                momentumX = _momentum.call(this, left, this.left, duration, prop.maxLeft, prop.maxWidth);
                momentumY = _momentum.call(this, top, this.top, duration, prop.maxTop, prop.maxHeight);
//console.error('momentumX:'+JSON.stringify(momentumX) +' :: '+ 'momentumY:'+JSON.stringify(momentumY));
                duration = Math.max(momentumX.duration, momentumY.duration);
                top = momentumY.destination;
                left = momentumX.destination;

                this.scrollTo(left, top, duration);
                _hideScrollBar.call(this);
            }
        }
    };

    var _onKeyDown = function(e) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, prop = _map[this.id];

        if(!prop.enabled) return;

        //
    };

    var _onMouseWheel = function(e) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, prop = _map[this.id];

        if(!prop.enabled) return;

        //
    };

    var _onMove = function(e) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, prop = _map[this.id],
            duration = 0, deltaX = 0, deltaY = 0, top = 0, left = 0;

        if(!prop.startTime) return;

        duration = new Date().getTime() - prop.startTime;

        e.preventDefault();
        e = e.touches ? e.touches[0] : e;

        deltaX = e.pageX - prop.pageX;
        deltaY = e.pageY - prop.pageY;

        if(Math.abs(deltaX) > 10 || Math.abs(deltaY) > 10) {
            if(duration >= 300) {
                prop.pageX = e.pageX;
                prop.pageY = e.pageY;

                top = this.top + deltaY;
                left = this.left + deltaX;

                this.scrollTo(left, top);
            }
        }
    };

    var _onResize = function(e) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, prop = _map[this.id];

        //
    };

    var _onStart = function(e) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, prop = _map[this.id];

        e = e.touches ? e.touches[0] : e;

        this.refresh();

        prop.startTime = new Date().getTime();

        if(prop.isInTransition) {
            _stop.call(this);
        }

        prop.pageX = e.pageX;
        prop.pageY = e.pageY;

        _showScrollBar.call(this);
    };

    var _onTransitionEnd = function(e) {
        var prop = _map[this.id];

        if(!prop.isTransition) return;

        _stop.call(this);
        _hideScrollBar.call(this);
    };

    var _position = function() {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, prop = _map[this.id], top = 0,
            matrix = window.getComputedStyle(prop.scrolee, null), left = 0;

        matrix = matrix.transform.split(')')[0].split(', ');

        left = +(matrix[12] || matrix[4]);
        top = +(matrix[13] || matrix[5]);

        return {left:left, top:top};
    };

    var _showScrollBar = function() {
        //
    };

    var _hideScrollBar = function() {
        //
    };

    var _stop = function() {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, prop = _map[this.id], position = null;

        if(prop.inTransition) {
            prop.inTransition = false;

            prop.scrolee.style.transitionDuration = '0ms';
            position = _position.call(this);
            this.scrollTo(position.left, position.top);
        }
    };


    voltmx.$kwebfw$.plugins.Scroller = function(target, left, top, config) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KD = $K.dom, prop = null;

        //START:: Normalizing arguments
        if(arguments.length === 1) {
            left = 0; top = 0; config = {};
        } else if(arguments.length === 2) {
            if($KU.is(left, 'number')) {
                top = 0; config = {};
            } else if($KU.is(left, 'object')) {
                config = left;
                left = 0; top = 0;
            }
        } else if(arguments.length === 3) {
            if($KU.is(top, 'number')) {
                config = {};
            } else if($KU.is(top, 'object')) {
                config = top; top = 0;
            }
        }
        //END:: Normalizing arguments

        this.top = top;
        this.left = left;
        this.target = target;
        this.id = ($KU.is(config, 'object') && $KU.is(config.id, 'string') && config.id) ? config.id : 'K'+$KU.uid();

        if(_map.hasOwnProperty(this.id)) {
            //Throw Error
            return;
        }

        window.goutam = _map[this.id] = {};
        prop = _map[this.id];

        $KU.each(_default, function(value, key) {
            prop[key] = (config.hasOwnProperty(key)) ? config[key] : value;
        });

        prop.scrolee = $KD.first(target);
        prop.hScrollBar = $KD.next(prop.scrolee);
        prop.vScrollBar = $KD.next(prop.hScrollBar);

        this.refresh();

        prop.scrolee.style.transitionDuration = '0ms';
        prop.scrolee.style.transform = 'translate('+this.left+'px, '+this.top+'px)';
        prop.scrolee.style.transitionTimingFunction = prop.transitionTimingFunction;

        _attachEvents.call(this);
    };

    voltmx.$kwebfw$.plugins.Scroller.prototype = {
        _get: function(property) {
            return _map[this.id][property];
        },

        destroy: function() {
            delete  _map[this.id];
        },

        disable: function() {
            var prop = _map[this.id];

            prop.enabled = false;
        },

        enable: function() {
            var prop = _map[this.id];

            prop.enabled = true;
        },

        handleEvent: function(e) {
            var prop = _map[this.id];
console.error(e.type);
            if(!prop.enabled) return;

            switch(e.type) {
            case 'touchstart':
            case 'pointerdown':
            case 'MSPointerDown':
            case 'mousedown':
                _onStart.call(this, e);
                break;

            case 'touchmove':
            case 'pointermove':
            case 'MSPointerMove':
            case 'mousemove':
                _onMove.call(this, e);
                break;

            case 'touchend':
            case 'pointerup':
            case 'MSPointerUp':
            case 'mouseup':
            case 'touchcancel':
            case 'pointercancel':
            case 'MSPointerCancel':
            case 'mousecancel':
            case 'mouseout':
            case 'mouseleave':
                _onEnd.call(this, e);
                break;

                case 'orientationchange':
                case 'resize':
                    _onResize.call(this, e);
                break;

                case 'transitionend':
                case 'webkitTransitionEnd':
                case 'oTransitionEnd':
                case 'MSTransitionEnd':
                    _onTransitionEnd.call(this, e);
                break;

                case 'wheel':
                case 'DOMMouseScroll':
                case 'mousewheel':
                    _onMouseWheel.call(this, e);
                break;

                case 'keydown':
                    _onKeyDown.call(this, e);
                break;

                case 'click':
                    if(this.enabled && !e._constructed) {
                        e.preventDefault();
                        e.stopPropagation();
                    }
                break;
            }
        },

        refresh: function() {
            var $K = voltmx.$kwebfw$, $KD = $K.dom, prop = _map[this.id];

            prop.maxWidth = this.target.offsetWidth;
            prop.maxHeight = this.target.offsetHeight;
            prop.maxTop = prop.scrolee.offsetHeight - prop.maxHeight;
            prop.maxLeft = prop.scrolee.offsetWidth - prop.maxWidth;

            $KD.style(prop.hScrollBar, {width:('px')});
            $KD.style(prop.vScrollBar, {height:('px')});
        },

        scrollBy: function(left, top, duration) {
            this.scrollTo((this.left+left), (this.top+top), duration);
        },

        scrollTo: function(left, top, duration) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils, prop = _map[this.id];

            if(!prop.enabled) return;
            if(this.left === left && this.top === top) return;

            if(!$KU.is(duration, 'number')) duration = 0;

            this.top = Math.round(top);
            this.left = 0; //Math.round(left);
            duration = Math.round(duration);
            prop.inTransition = (duration > 0) ? true : false;
//console.log('duration = ' + duration + ' AND ' + 'this.left = ' + this.left + ' AND ' + 'this.top = ' + this.top);
            prop.scrolee.style.transitionDuration = duration + 'ms';
            prop.scrolee.style.transform = 'translate(' + this.left + 'px, ' + this.top + 'px)';

            _fire.call(this, duration);
        },

        scrollToElement: function(el, duration) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils, $KD = $K.dom,
                prop = _map[this.id], top = 0, left = 0;

            if(!$KD.contains(prop.scrolee, el)) return;

            //TODO:: Find left and top of el wrt prop.scrolee

            this.scrollTo(left, top, duration);
        }
    };
}());
