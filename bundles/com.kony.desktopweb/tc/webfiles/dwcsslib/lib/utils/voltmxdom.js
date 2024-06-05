
Object.defineProperty(voltmx.$kwebfw$, 'dom', {configurable:false, enumerable:false, writable:false, value:(function() {
    var _ns = {}, $K = voltmx.$kwebfw$, __event = {}, _keyCodeMap = {
        '8':  'Backspace',
        '9':  'Tab',
        '13': 'Enter',
        '16': 'ShiftLeft',
        '17': 'ControlLeft',
        '18': 'AltLeft',
        '20': 'CapsLock',
        '27': 'Escape',
        '32': 'Space',
        '33': 'PageUp',
        '34': 'PageDown',
        '35': 'End',
        '36': 'Home',
        '37': 'ArrowLeft',
        '38': 'ArrowUp',
        '39': 'ArrowRight',
        '40': 'ArrowDown',
        '45': 'Insert',
        '46': 'Delete',
        '48': 'Digit0',
        '49': 'Digit1',
        '50': 'Digit2',
        '51': 'Digit3',
        '52': 'Digit4',
        '53': 'Digit5',
        '54': 'Digit6',
        '55': 'Digit7',
        '56': 'Digit8',
        '57': 'Digit9',
        '65': 'KeyA',
        '66': 'KeyB',
        '67': 'KeyC',
        '68': 'KeyD',
        '69': 'KeyE',
        '70': 'KeyF',
        '71': 'KeyG',
        '72': 'KeyH',
        '73': 'KeyI',
        '74': 'KeyJ',
        '75': 'KeyK',
        '76': 'KeyL',
        '77': 'KeyM',
        '78': 'KeyN',
        '79': 'KeyO',
        '80': 'KeyP',
        '81': 'KeyQ',
        '82': 'KeyR',
        '83': 'KeyS',
        '84': 'KeyT',
        '85': 'KeyU',
        '86': 'KeyV',
        '87': 'KeyW',
        '88': 'KeyX',
        '89': 'KeyY',
        '90': 'KeyZ',
        '91': 'MetaLeft',
        '112': 'F1',
        '113': 'F2',
        '114': 'F3',
        '115': 'F4',
        '116': 'F5',
        '117': 'F6',
        '118': 'F7',
        '119': 'F8',
        '120': 'F9',
        '121': 'F10',
        '122': 'F11',
        '123': 'F12',
        '186': 'Semicolon',
        '187': 'Equal',
        '188': 'Comma',
        '189': 'Minus',
        '190': 'Period',
        '191': 'Slash',
        '192': 'Backquote',
        '219': 'BracketLeft',
        '220': 'Backslash',
        '221': 'BracketRight',
        '222': 'Quote',
        '255': 'WakeUp'
    }; //window.ge = __event; //For testing purpose only


    var _addEvent = function $KD_addEvent(el, type, name, cb, config) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KD = $K.dom,
            eid = '', emap = null, option = null;

        if($KU.is(config, 'boolean')) config = {capture:config};
        if(!$KU.is(config, 'object')) config = {capture:false};
        if(!$KU.is(config.capture, 'boolean')) config.capture = false;
        if(!Object.prototype.hasOwnProperty.call(config, 'scope')) config.scope = el;

        if($KU.is(el, 'dom') && !$KD.hasAttr(el, 'ke')) {
            $KD.setAttr(el, 'ke', $KU.uid());
        }

        eid = (el === document) ? 'document' : (el === window) ? 'window' : $KD.getAttr(el, 'ke');

        if(!__event[eid]) __event[eid] = {};

        emap = __event[eid];

        if(!$KU.is(emap[type], 'object')) emap[type] = {};

        emap[type][name] = function(e) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils, $KD = $K.dom;

            if(!e.target && e.srcElement) e.target = e.srcElement; //IE fix
            if('data' in config) e.data = config.data;
            if(type === 'contextmenu') $KD.preventDefault(e);

            e.isCtrlPressed = e.ctrlKey || e.metaKey; //MAC fix
            e.isShiftPressed = e.shiftKey; e.isAltPressed = e.altKey;

            if(config.sp === true || ($KU.is(config.sp, 'function') && config.sp(e) === true)) {
                $KD.stopPropagation(e);
            }

            if(config.sip === true || ($KU.is(config.sip, 'function') && config.sip(e) === true)) {
                $KD.stopImmediatePropagation(e);
            }

            if(config.pd === true || ($KU.is(config.pd, 'function') && config.pd(e) === true)) {
                $KD.preventDefault(e);
            }

            if(el.tagName === 'INPUT' && type === 'change' && el.type === 'file') {
                if(e.fileChangeEventFired !== true) {
                    e.fileChangeEventFired = true;
                    cb.call(e.target, e);
                }
            } else {
                cb.call(config.scope, e);
            }
        };

        if(_passiveEventSupported) {
            option = {capture:config.capture};
            option.passive = ($KU.is(config.passive, 'boolean')) ? config.passive : false;
            option.once = ($KU.is(config.once, 'boolean')) ? config.once : false;
        }

        if($KU.is(el.addEventListener, 'function')) {
            el.addEventListener(type, emap[type][name], (option || config.capture));
        } else if($KU.is(el.attachEvent, 'function')) {
            el.attachEvent(type, emap[type][name], (option || config.capture));
        } else {
            el['on'+type] = emap[type][name];
        }
    };


    var _addGesture = function $KD_addGesture(el, type, name, cb, config) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KD = $K.dom,
            touchStartFired = false, moveEvent = '', endEvent = '';

        if(($KU.is(el, 'dom') || el === document)
        && ($KU.is(type, 'string') && type && _gesture[type] && $KU.is(_gesture[type].add, 'function'))
        && ($KU.is(name, 'string') && name) && ($KU.is(cb, 'function'))) {
            if(!$KU.is(config, 'object')) config = {};
            if(!$KU.is(config.data, 'object')) config.data = {};
            if(!Object.prototype.hasOwnProperty.call(config, 'scope')) config.scope = el;
            if(!Object.prototype.hasOwnProperty.call(config, 'boundary')) config.boundary = document;

            //Registering START_HANDLER
            $KD.on(el, 'mousedown touchstart', type+'-'+name+'-gst', function(e) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, $KD = $K.dom,
                    g = {type:e.data.type, name:e.data.name, callback:e.data.callback, target:e.target, event:{}},
                    mvnm = (g.type+'-'+g.name+'-gmv'), ndnm = (g.type+'-'+g.name+'-gnd'), startExecuted = false,
                    movedPosition = null, currentPosition = null, delta = null, absdelta = null, distance = null,
                    displacement = null, lastMovedAt = null, startTime = new Date(), startPosition = $KD.position(e);

                if(e.type === 'mousedown' && $KU.is(e.which, 'number') && e.which !== 1) return;
                if(e.type === 'touchstart') touchStartFired = true;

                if(touchStartFired && e.type === 'mousedown') {
                    touchStartFired = false;
                } else {
                    if(e.type === 'touchstart') {
                        moveEvent = 'touchmove';
                        endEvent = 'touchend touchcancel';
                    } else {
                        moveEvent = 'mousemove';
                        endEvent = 'mouseup';
                    }

                    g.absdelta = {x:0, y:0};
                    g.angle = 0;
                    g.delta = {x:0, y:0};
                    g.direction = '';
                    g.displacement = {x:0, y:0};
                    g.distance = {x:0, y:0};
                    g.duration = 0;
                    g.event.start = e;
                    g.status = 'started';
                    g.zoom = 1;

                    lastMovedAt = startTime;
                    $KU.defaults(g, e.data.config);

                    //Populating g.delay
                    g.delay = ($KU.is(g.delay, 'number') && g.delay >= 0) ? g.delay : 17;

                    //Populating g.minimum
                    if($KU.is(g.minimum, 'number')) {
                        g.minimum = (g.minimum >= 0) ? {x:g.minimum, y:g.minimum} : {x:0, y:0};
                    } else if($KU.is(g.minimum, 'object')) {
                        if(!$KU.is(g.minimum.x, 'number') || g.minimum.x < 0) {
                            g.minimum.x = 0;
                        }
                        if(!$KU.is(g.minimum.y, 'number') || g.minimum.y < 0) {
                            g.minimum.y = 0;
                        }
                    } else {
                        g.minimum = {x:0, y:0};
                    }

                    delete e.data;

                    //Registering MOVE_HANDLER
                    $KD.on(config.boundary, moveEvent, mvnm, function(e) {
                        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KD = $K.dom;

                        if($KU.is(g, 'undefined') || $KU.is(g, 'null') || g.status === 'ended') {
                            //Removing MOVE_HANDLER and END_HANDLER
                            $KD.off(config.boundary, moveEvent, mvnm);
                            $KD.off(config.boundary, endEvent, ndnm);

                            return;
                        }

                        if(g.delay > 0) {
                            var now = new Date();
                            if((now - lastMovedAt) <= g.delay) {
                                return;
                            }
                            lastMovedAt = now;
                        }

                        currentPosition = $KD.position(e);
                        movedPosition = (g.event.move) ? $KD.position(g.event.move) : {x:startPosition.x, y:startPosition.y};
                        distance = {x:(currentPosition.x - startPosition.x), y:(currentPosition.y - startPosition.y)};
                        displacement = {x:Math.abs(distance.x), y:Math.abs(distance.y)};

                        if(displacement.x >= g.minimum.x || displacement.y >= g.minimum.y) {
                            if(!startExecuted) {
                                startExecuted = true;
                                g.callback.call(g.scope, g);
                            }

                            delta = {x:(currentPosition.x - movedPosition.x), y:(currentPosition.y - movedPosition.y)};
                            absdelta = {x:Math.abs(delta.x), y:Math.abs(delta.y)};
                            g.absdelta = absdelta;
                            g.angle = 0; //TODO::
                            g.delta = delta;
                            g.direction = $KU.direction(currentPosition, movedPosition);
                            g.displacement = displacement;
                            g.distance = distance;
                            g.duration = new Date() - startTime;
                            g.event.move = e;
                            g.status = 'moving';
                            g.zoom = {x:(g.delta.x < 0) ? -1 : 1, y:(g.delta.y < 0) ? -1 : 1};

                            g.callback.call(g.scope, g);
                        }
                    });

                    //Registering END_HANDLER
                    $KD.on(config.boundary, endEvent, ndnm, function(e) {
                        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KD = $K.dom;

                        if($KU.is(g, 'undefined') || $KU.is(g, 'null') || g.status === 'ended') {
                            //Removing MOVE_HANDLER and END_HANDLER
                            $KD.off(config.boundary, moveEvent, mvnm);
                            $KD.off(config.boundary, endEvent, ndnm);

                            return;
                        }

                        currentPosition = $KD.position(e);
                        movedPosition = (g.event.move) ? $KD.position(g.event.move) : (g.event.start) ? {x:startPosition.x, y:startPosition.y} : {x:0, y:0};
                        delta = {x:(currentPosition.x - movedPosition.x), y:(currentPosition.y - movedPosition.y)};
                        absdelta = {x:Math.abs(delta.x), y:Math.abs(delta.y)};
                        distance = {x:(currentPosition.x - startPosition.x), y:(currentPosition.y - startPosition.y)};
                        displacement = {x:Math.abs(distance.x), y:Math.abs(distance.y)};

                        if(!startExecuted) {
                            startExecuted = true;
                            g.callback.call(g.scope, g);
                        }

                        delta = {x:(currentPosition.x - movedPosition.x), y:(currentPosition.y - movedPosition.y)};
                        absdelta = {x:Math.abs(delta.x), y:Math.abs(delta.y)};
                        g.absdelta = absdelta;
                        g.angle = 0; //TODO::
                        g.delta = delta;
                        g.direction = $KU.direction(currentPosition, movedPosition);
                        g.displacement = displacement;
                        g.distance = distance;
                        g.duration = new Date() - startTime;
                        g.event.end = e;
                        g.status = 'ended';
                        g.zoom = {x:(g.delta.x < 0) ? -1 : 1, y:(g.delta.y < 0) ? -1 : 1};

                        g.callback.call(g.scope, g);

                        //Removing MOVE_HANDLER and END_HANDLER
                        $KD.off(document, moveEvent, mvnm);
                        $KD.off(document, endEvent, ndnm);
                    });
                }
            }, {data:{type:type, name:name, callback:cb, config:config}});
        }
    };


    var _gesture = {
        basic: {
            add: function(el, name, cb, config) {
                _addGesture(el, 'basic', name, function(g) {
                    cb.call(g.scope, g);
                }, config);
            },
            remove : function(el, name) {
                _removeGesture(el, 'basic', name);
            }
        },

        longpress: {
            add: function(el, name, cb, config) {
                _addGesture(el, 'longpress', name, cb, config);
            },
            remove: function(el, name) {
                _removeGesture(el, 'longpress', name);
            }
        },

        pan: {
            add: function(el, name, cb, config) {
                _addGesture(el, 'pan', name, function() {
                //
                }, config);
            },
            remove: function(el, name) {
                _removeGesture(el, 'pan', name);
            }
        },

        pinch: {
            add: function(el, name, cb, config) {
                _addGesture(el, 'pinch', name, function() {
                    //
                }, config);
            },
            remove: function(el, name) {
                _removeGesture(el, 'pinch', name);
            }
        },

        rotation: {
            add: function(el, name, cb, config) {
                _addGesture(el, 'rotation', name, function() {
                    //
                }, config);
            },
            remove: function(el, name) {
                _removeGesture(el, 'rotation', name);
            }
        },

        swipe: {
            add: function(el, name, cb, config) {
                _addGesture(el, 'swipe', name, function(g) {
                    cb.call(g.scope, {type:g.type, name:g.name, status:g.status,
                        target:g.target, data:g.data, distance: g.distance});
                }, config);
            },
            remove: function(el, name) {
                _removeGesture(el, 'swipe', name);
            }
        },

        tap: {
            add: function(el, name, cb, config) {
                _addGesture(el, 'tap', name, function(g) {
                    var $K = voltmx.$kwebfw$, $KU = $K.utils, scope = g.scope;

                    if(g.status === 'ended' && $KU.is(cb, 'function')) {
                        if(g.event.start.target === g.event.end.target) {
                            cb.call(scope, {type:g.type, name:g.name, target:g.target, data:g.data});
                        } else {
                            //voltmx.print('g.event.start.target !== g.event.end.target');
                        }
                    }
                }, config);
            }, remove: function(el, name) {
                _removeGesture(el, 'tap', name);
            }
        }
    };


    var _passiveEventSupported = false;


    var _removeEvent = function $KD_removeEvent(el, type, name) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KD = $K.dom, eid = '', emap = null;

        if(($KU.is(el, 'dom') || el === document || el === 'window')) {
            eid = (el === document) ? 'document' : (el === window) ? 'window' : $KD.getAttr(el, 'ke');

            emap = ($KU.is(eid, 'string')) ? __event[eid] : null;

            if($KU.is(emap, 'object')) {
                if($KU.is(type, 'string') && type) {
                    if($KU.is(name, 'string') && name) {
                        if(emap[type] && emap[type][name] && $KU.is(emap[type][name], 'function')) {
                            if($KU.is(el.removeEventListener, 'function')) {
                                el.removeEventListener(type, emap[type][name], false);
                            } else if($KU.is(el.detachEvent, 'function')) {
                                el.detachEvent(type, emap[type][name], false);
                            } else {
                                delete el['on'+type];
                            }

                            delete emap[type][name];

                            if(!$KU.size(emap[type])) {
                                delete emap[type];
                            }

                            if(!$KU.size(emap)) {
                                delete __event[eid];

                                if(['document', 'window'].indexOf(eid) === -1) {
                                    $KD.removeAttr(el, 'ke');
                                }
                            }
                        }
                    } else {
                        $KU.each(emap[type], function(v, k) {
                            var $K = voltmx.$kwebfw$, $KU = $K.utils;

                            if($KU.is(v, 'function')) {
                                _removeEvent(el, type, k);
                            }
                        });
                    }
                } else {
                    $KU.each(emap, function(value, key) {
                        var $K = voltmx.$kwebfw$, $KU = $K.utils;

                        if($KU.is(value, 'object')) {
                            $KU.each(value, function(v, k) {
                                var $K = voltmx.$kwebfw$, $KU = $K.utils;

                                if($KU.is(v, 'function')) {
                                    _removeEvent(el, key, k);
                                }
                            });
                        }
                    });
                }
            }
        }
    };


    var _removeGesture = function $KD_removeGesture(el, type, name) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KD = $K.dom;

        if(($KU.is(el, 'dom') || el === document) && $KU.is(name, 'string') && name) {
            $KD.off(el, 'mousedown touchstart', (type+'-'+name+'-gst'));
            //$KD.off(document, 'mousemove touchmove', (type+'-'+name+'-gmv'));
            //$KD.off(document, 'mouseup mouseout touchend touchcancel', (type+'-'+name+'-gnd'));
        }
    };


    //Detect is passive event listener is supported or not
    (function(div) {
        var on = '';

        if(typeof div.addEventListener === 'function') {
            on = 'addEventListener';
        } else if(typeof div.attachEvent === 'function') {
            on = 'attachEvent';
        }

        if(on) {
            //*
            div[on]('test', function() {}, {
                get passive() {
                    _passiveEventSupported = true;
                    return false;
                }
            });
            //*/
            /*
            div[on]('test', function() {},
                Object.defineProperty({}, 'passive', {
                    get: function() {
                        _passiveEventSupported = true;
                        return false;
                    }
                })
            );
            //*/
        }
    }(document.createElement('div')));


    if(!window.requestAnimationFrame) {
        window.requestAnimationFrame = window.webkitRequestAnimationFrame
                                        || window.mozRequestAnimationFrame
                                        || window.oRequestAnimationFrame
                                        || window.msRequestAnimationFrame
                                        || function(callback) {
                                            var id = window.setInterval(function() {
                                                callback();
                                            }, 16);

                                            return id;
                                        };
    }
    if(!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = window.webkitCancelAnimationFrame
                                        || window.mozCancelAnimationFrame
                                        || window.oCancelAnimationFrame
                                        || window.msCancelAnimationFrame
                                        || function(id) {
                                            window.clearInterval(id);
                                        };
    }


    var _active = function $KD_active() {
        if(!document.activeElement) {
            _body().focus();
        }

        return document.activeElement;
    };


    var _add = function $KD_add(el, newElement) {
        el.appendChild(newElement);
    };


    var _addAt = function $KD_addAt(el, newElement, index) {
        var ref = _childAt(el, index);

        ref && _before(ref, newElement);
    };


    var _addCls = function $KD_addCls(el, names) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils;

        names = names.replace(/\s+/g, ' ');
        names = names.split(' ');
        //eslint-disable-next-line no-unused-vars
        $KU.each(names, function(value, index) {
            value && el.classList.add(value);
        });
    };


    var _after = function $KD_after(el, newElement) {
        var parent = null, next = _next(el);

        if(next) {
            _before(next, newElement);
        } else {
            parent = _parent(el);
            parent && _add(parent, newElement);
        }
    };


    var _before = function $KD_before(el, newElement) {
        var parent = _parent(el);

        parent && parent.insertBefore(newElement, el);
    };


    var _blur = function $KD_blur(el) {
        el.blur();
    };


    var _body = function $KD_body() {
        return document.body || document.getElementsByTagName('BODY')[0];
    };


    var _childAt = function $KD_childAt(el, index) {
        var children = _children(el);

        return (index >= 0 && index < children.length) ? children[index] : null;
    };


    var _children = function $KD_children(el) {
        return el.children || el.childNodes;
    };


    var _closest = function $KD_closest(el, name, value) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, closest = null;

        while(el) {
            if(name === 'class') {
                if(_hasCls(el, value)) {
                    closest = el;
                    break;
                }
            } else if(name === 'tag') {
                if(el.tagName === value.toUpperCase()) {
                    closest = el;
                    break;
                }
            } else if($KU.is(name, 'function')) {
                if(name(el) === true) {
                    closest = el;
                    break;
                } else if(name(el) === false) {
                    closest = null;
                    break;
                }
            } else if($KU.is(name, 'string') && name) {
                if(arguments.length === 2) {
                    if(_hasAttr(el, name)) {
                        closest = el;
                        break;
                    }
                } else if(arguments.length === 3) {
                    if($KU.is(value, 'function')) {
                        if(value(el) === true) {
                            closest = el;
                            break;
                        } else if(value(el) === false) {
                            closest = null;
                            break;
                        }
                    } else if($KU.is(value, 'string')) {
                        if(value === _getAttr(el, name)) {
                            closest = el;
                            break;
                        }
                    }
                }
            }

            el = _parent(el);
        }

        return closest;
    };


    var _contains = function $KD_contains(el, ref) {
        return el.contains(ref);
    };


    var _create = function $KD_create(tag, attr, style) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, fragment = null;

        if(arguments.length > 0) {
            if(arguments.length === 1) {
                attr = {}; style = {};
            }
            if(arguments.length === 2) {
                style = {};
            }

            if($KU.is(tag, 'string') && tag && $KU.is(attr, 'object') && $KU.is(style, 'object')) {
                if(tag[0] === '<' && tag[tag.length-1] === '>') {
                    fragment = document.createDocumentFragment();
                    fragment.innerHTML = tag;

                    $KU.each(fragment.childNodes, function(el) {
                        if($KU.is(el, 'dom')) {
                            $KU.each(attr, function(val, key) {
                                el.setAttribute(key, val);
                            });

                            $KU.each(style, function(val, key) {
                                el.style[key] = val;
                            });
                        }
                    });
                } else {
                    fragment = document.createElement(tag.toUpperCase());

                    $KU.each(attr, function(val, key) {
                        fragment.setAttribute(key, val);
                    });

                    $KU.each(style, function(val, key) {
                        fragment.style[key] = val;
                    });
                }
            }
        } else {
            fragment = document.createDocumentFragment();
        }

        return fragment;
    };

    //eslint-disable-next-line no-unused-vars
    var _event = function $KD_event(type) {
        var names = '';

        return names;
    };


    var _find = function $KD_find(el, selector) {
        selector = selector.trim();

        if(el === document && selector === 'html') {
            return [document.documentElement];
        } else if(el === document && selector === 'body') {
            return [document.body];
        }
        if(selector[0] === '#'
            && (selector.indexOf(' ') < 0
            || selector.indexOf(',') < 0
            || selector.indexOf('>') < 0
            || selector.indexOf('+') < 0
            || selector.indexOf('~') < 0)) {
            return [document.getElementById(selector.substr(1, (selector.length-1)))];
        }
        if(el) return el.querySelectorAll(selector);
    };


    var _fire = function $KD_fire(el, type, payload) {
        var evt = null;

        if(type === 'click') {
            el[type] && el[type]();
        } else if(document.createEventObject) {
            evt = document.createEventObject();

            if(arguments.length > 2) {
                evt.data = payload;
            }

            return el.fireEvent('on' + type, evt);
        } else {
            evt = document.createEvent('HTMLEvents');

            if(arguments.length > 2) {
                evt.data = payload;
            }

            evt.initEvent(type, true, true);

            return !el.dispatchEvent(evt);
        }
    };


    var _first = function $KD_first(el) {
        return el.firstElementChild;
    };


    var _focus = function $KD_focus(el) {
        el.focus();
    };


    var _focusable = function $KD_focusable(el) {
        var flag = false;

        if(['A', 'BODY', 'BUTTON', 'IFRAME', 'INPUT', 'SELECT', 'TEXTAREA'].indexOf(el.tagName) >= 0) {
            if(['BUTTON', 'INPUT', 'SELECT', 'TEXTAREA'].indexOf(el.tagName) >= 0) {
                flag = !el.disabled;
            } else {
                flag = true;
            }
        } else if(_hasAttr(el, 'tabindex')) {
            flag = true;
        }

        return flag;
    };


    var _getAttr = function $KD_getAttr(el, attr) {
        if(attr === 'value'
        && ['INPUT', 'SELECT', 'TEXTAREA'].indexOf(el.tagName) >= 0) {
            return el.value;
        }
        return el.getAttribute(attr);
    };


    var _hasAttr = function $KD_hasAttr(el, attr) {
        return el.hasAttribute(attr);
    };


    var _hasCls = function $KD_hasCls(el, name) {
        return el.classList.contains(name);
    };


    var _head = function $KD_head() {
        return document.head || document.getElementsByTagName('HEAD')[0];
    };


    var _hide = function $KD_hide(el) {
        el.hidden = true;
    };

    //eslint-disable-next-line no-unused-vars
    var _hotkey = function $KD_hotkey(el, keys, cb) {
        //TODO::
    };


    var _html = function $KD_html(el, str) {
        el.innerHTML = str;
    };


    var _index = function $KD_index(el) {
        var prev = el, index = -1;

        while(prev) {
            index += 1;
            prev = _prev(prev);
        }

        return index;
    };


    var _keyCode = function $KD_keyCode(evt) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, code = null;

        if(evt instanceof Event) {
            if(Object.prototype.hasOwnProperty.call(evt, 'code')) {
                code = evt.code;
            } else if($KU.is(evt.keyCode, 'number')
            && Object.prototype.hasOwnProperty.call(_keyCodeMap, evt.keyCode.toString())) {
                code = _keyCodeMap[evt.keyCode.toString()];
            }
        }

        return code;
    };


    var _last = function $KD_last(el) {
        return el.lastElementChild;
    };


    var _next = function $KD_next(el) {
        return el.nextElementSibling;
    };


    var _off = function $KD_off(el, types, name) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils;

        if(($KU.is(el, 'dom') || el === document || el === window)) {
            if(($KU.is(types, 'string') && types) || $KU.is(types, 'array')) {
                if($KU.is(types, 'string') && types) {
                    types = types.replace(/\s+/g, ' ');
                    types = types.split(' ');
                }

                if($KU.is(types, 'array')) {
                    $KU.each(types, function(value) {
                        if(_gesture[value] && $KU.is(_gesture[value].remove, 'function')) {
                            _gesture[value].remove(el, value, name);
                        } else if($KU.is(name, 'string') && name) {
                            _removeEvent(el, value, name);
                        } else {
                            _removeEvent(el, value);
                        }
                    });
                }
            } else {
                _removeEvent(el);
            }
        }
    };

    //eslint-disable-next-line no-unused-vars
    var _offset = function $KD_offset(el, scroll) {
        //TODO::
    };


    var _on = function $KD_on(el, types, name, cb, config) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils;

        if(el && ($KU.is(el, 'dom') || el === document || el === window)
        && (($KU.is(types, 'string') && types) || $KU.is(types, 'array'))
        && $KU.is(name, 'string') && name && $KU.is(cb, 'function')) {
            if($KU.is(types, 'string')) {
                types = types.replace(/\s+/g, ' ');
                types = types.split(' ');
            }

            if($KU.is(types, 'array')) {
                $KU.each(types, function(value) {
                    value = value.trim();

                    if(_gesture[value] && $KU.is(_gesture[value].add, 'function')) {
                        _gesture[value].add(el, name, cb, config);
                    } else {
                        _addEvent(el, value, name, cb, config);
                    }
                });
            }
        }
    };


    var _parent = function $KD_parent(el) {
        return el.parentElement;
    };


    var _point = function $KD_point(el) {
        var point = {x:0, y:0}, html = document.documentElement;

        if(el.getBoundingClientRect) {
            point = el.getBoundingClientRect();
        }

        point.x = (point.x + window.pageXOffset - html.clientLeft);
        point.y = (point.y + window.pageYOffset - html.clientTop);

        return point;
    };


    var _position = function $KD_position(evt) {
        var position = null;

        evt = (evt.touches && evt.touches[0])
        || (evt.changedTouches && evt.changedTouches[0])
        || evt;

        if(evt instanceof Event || evt instanceof Touch) {
            position = {x:evt.pageX, y:evt.pageY};
        }

        return position;
    };


    var _prev = function $KD_prev(el) {
        return el.previousElementSibling;
    };


    var _preventDefault = function $KD_preventDefault(evt) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils;

        if(evt instanceof Event && $KU.is(evt.preventDefault, 'function')) {
            evt.preventDefault();
        }

        if(evt instanceof Event && 'returnValue' in evt) {
            evt.returnValue = false;
        }
    };


    var _remove = function $KD_remove(el) {
        var parent = _parent(el);

        parent && parent.removeChild(el);
    };


    var _removeAt = function $KD_removeAt(el, index) {
        var child = _childAt(el, index);

        child && _remove(child);
    };


    var _removeAttr = function $KD_removeAttr(el, attr) {
        if(['checked', 'disabled', 'hidden', 'selected'].indexOf(attr) >= 0) {
            el[attr] = false;
            el.removeAttribute(('aria-'+attr));
        } else if(['readonly'].indexOf(attr) >= 0) {
            el.readOnly = false;
            el.removeAttribute(('aria-'+attr));
        } else if(['placeholder'].indexOf(attr) >= 0) {
            el.removeAttribute(attr);
            el.removeAttribute(('aria-'+attr));
        } else {
            el.removeAttribute(attr);
        }
    };


    var _removeCls = function $KD_removeCls(el, name) {
        name && el.classList.remove(name);
    };


    var _replace = function $KD_replace(newElement, oldElement) {
        var parent = _parent(oldElement);

        parent && parent.replaceChild(newElement, oldElement);
    };


    var _replaceCls = function $KD_replaceCls(el, oldName, newName) {
        if(oldName !== newName) {
            _removeCls(el, oldName);
            _addCls(el, newName);
        }
    };

    //eslint-disable-next-line no-unused-vars
    var _scrollLeft = function $KD_scrollLeft(el) {
        //TODO::
    };

    //eslint-disable-next-line no-unused-vars
    var _scrollTop = function $KD_scrollTop(el) {
        //TODO::
    };


    var _setAttr = function $KD_setAttr(el, attr, value) {
        if(['checked', 'disabled', 'hidden', 'selected'].indexOf(attr) >= 0) {
            if(!value || value === 'false') {
                el[attr] = false;
                el.removeAttribute(('aria-'+attr));
            } else {
                el[attr] = true;
                el.setAttribute(('aria-'+attr), true);
            }
        } else if(['readonly'].indexOf(attr) >= 0) {
            if(!value || value === 'false') {
                el.readOnly = false;
                el.removeAttribute(('aria-'+attr));
            } else {
                el.readOnly = true;
                el.setAttribute(('aria-'+attr), true);
            }
        } else if(['placeholder'].indexOf(attr) >= 0) {
            el.setAttribute(attr, value);
            el.setAttribute(('aria-'+attr), value);
        } else if(attr === 'value') {
            if(['INPUT', 'SELECT', 'TEXTAREA'].indexOf(el.tagName) >= 0) {
                if(['SELECT'].indexOf(el.tagName) === -1) {
                    el.setAttribute('value', value);
                }

                el.value = value;
            }
        } else {
            el.setAttribute(attr, value);
        }
    };


    var _show = function $KD_show(el) {
        el.hidden = false;
    };


    var _stopImmediatePropagation = function $KD_stopImmediatePropagation(evt) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils;

        if(evt instanceof Event && $KU.is(evt.stopImmediatePropagation, 'function')) {
            evt.stopImmediatePropagation();
        }
    };


    var _stopPropagation = function $KD_stopPropagation(evt) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils;

        if(evt instanceof Event && $KU.is(evt.stopPropagation, 'function')) {
            evt.stopPropagation();
        }
        if(evt instanceof Event && 'cancelBubble' in evt) {
            evt.cancelBubble = true;
        }
    };


    var _style = function $KD_style(el, key, value) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, style = null;

        if(arguments.length === 3 && $KU.is(key, 'string')) {
            if(value === null) { //key must be hyphenated
                el.style.removeProperty(key);
            } else { //key must be camel-cased
                el.style[key] = value;
            }
        } else if(arguments.length === 2 && $KU.is(key, 'object')) {
            $KU.each(key, function(val, k) {
                if(val === null) { //k must be hyphenated
                    el.style.removeProperty(k);
                } else if(k.indexOf('-') >= 0) { //k must be hyphenated
                    el.style.setProperty(k, val);
                } else { //k must be camel-cased
                    el.style[k] = val;
                }
            });
        } else if((arguments.length === 1 && $KU.is(el, 'dom'))
        || (arguments.length === 2 && $KU.is(key, 'string'))) {
            style = getComputedStyle(el);

            if(key) { //key must be hyphenated
                style = style.getPropertyValue(key);
            }

            return style;
        }
    };


    var _text = function $KD_text(el, str) {
        el.innerText = str;
    };


    var _toggle = function $KD_toggle(el) {
        if(el.style.display === 'none') {
            _show(el);
        } else {
            _hide(el);
        }
    };

    var _toggleCls = function $KD_toggleCls(el, name) {
        name && el.classList.toggle(name);
    };

    //eslint-disable-next-line no-unused-vars
    var _wrap = function $KD_wrap(el, ref) {
        //TODO::
    };


    $K.defVoltmxProp(_ns, [
        {keey:'active', value:_active},
        {keey:'add', value:_add},
        {keey:'addAt', value:_addAt},
        {keey:'addCls', value:_addCls},
        {keey:'after', value:_after},
        {keey:'before', value:_before},
        {keey:'blur', value:_blur},
        {keey:'body', value:_body},
        {keey:'childAt', value:_childAt},
        {keey:'children', value:_children},
        {keey:'closest', value:_closest},
        {keey:'contains', value:_contains},
        {keey:'create', value:_create},
        {keey:'event', value:_event},
        {keey:'find', value:_find},
        {keey:'fire', value:_fire},
        {keey:'first', value:_first},
        {keey:'focus', value:_focus},
        {keey:'focusable', value:_focusable},
        {keey:'getAttr', value:_getAttr},
        {keey:'hasAttr', value:_hasAttr},
        {keey:'hasCls', value:_hasCls},
        {keey:'head', value:_head},
        {keey:'hide', value:_hide},
        {keey:'hotkey', value:_hotkey},
        {keey:'html', value:_html},
        {keey:'index', value:_index},
        {keey:'keyCode', value:_keyCode},
        {keey:'last', value:_last},
        {keey:'next', value:_next},
        {keey:'off', value:_off},
        {keey:'offset', value:_offset},
        {keey:'on', value:_on},
        {keey:'parent', value:_parent},
        {keey:'point', value:_point},
        {keey:'position', value:_position},
        {keey:'prev', value:_prev},
        {keey:'preventDefault', value:_preventDefault},
        {keey:'remove', value:_remove},
        {keey:'removeAt', value:_removeAt},
        {keey:'removeAttr', value:_removeAttr},
        {keey:'removeCls', value:_removeCls},
        {keey:'replace', value:_replace},
        {keey:'replaceCls', value:_replaceCls},
        {keey:'scrollLeft', value:_scrollLeft},
        {keey:'scrollTop', value:_scrollTop},
        {keey:'setAttr', value:_setAttr},
        {keey:'show', value:_show},
        {keey:'stopImmediatePropagation', value:_stopImmediatePropagation},
        {keey:'stopPropagation', value:_stopPropagation},
        {keey:'style', value:_style},
        {keey:'text', value:_text},
        {keey:'toggle', value:_toggle},
        {keey:'toggleCls', value:_toggleCls},
        {keey:'wrap', value:_wrap}
    ]);


    return _ns;
}())});
