/* FILE PATH :: 'lib/utils/voltmxutils.js' */
Object.defineProperty(voltmx.$kwebfw$, 'utils', {configurable:false, enumerable:false, writable:false, value:(function() {
    var _ns = {}, $K = voltmx.$kwebfw$, __uid = null,
        __browser = {supports:{}}, __is = {
            argument: function(datatype) {
                return (datatype === 'argument');
            },

            array: function(datatype) {
                return (datatype === 'array');
            },

            boolean: function(datatype) {
                return (datatype === 'boolean');
            },

            color: function(datatype, obj) {
                var flag = false;

                if(datatype === 'string') {
                    flag = (!obj) ? true : (/(^[0-9A-F]{8}$)|(^[0-9A-F]{6}$)/i.test(obj));

                    if(!flag && obj.indexOf('$') === 0) flag = true; //Color constants support

                    return flag;
                }
                return flag;
            },

            date: function(datatype, obj) {
                if(datatype === 'date') {
                    return true;
                } else if(datatype === 'array' && [3, 6].indexOf(obj.length) >= 0) {
                    return _isDateString((obj[2]+'-'+obj[1]+'-'+obj[0]+' '+(obj[3] || 0)+':'+(obj[4] || 0)+':'+(obj[5] || 0)));
                }
                return false;
            },

            decimal: function(datatype, obj) {
                return (datatype === 'number' && !__is.integer(datatype, obj));
            },

            document: function(datatype) {
                return (datatype === 'document');
            },

            dom: function(datatype) {
                return (datatype === 'node');
            },

            empty: function(datatype, obj) {
                var k = '';

                if(datatype === 'null' || datatype === 'undefined') {
                    return true;
                } else if(datatype === 'string' || __is.list(datatype, obj)) {
                    return (obj.length === 0);
                } else if(datatype === 'object') {
                    for(k in obj) {
                        if(Object.prototype.hasOwnProperty.call(obj, k)) {
                            return false;
                        }
                    }
                    return true;
                }
                return false;
            },

            equals: function(datatype, obj, a) {
                var i = 0, k = '', adatatype = _datatype(a);

                if(datatype !== adatatype) {
                    return false;
                } else if(__is.list(adatatype, a)) {
                    if(obj.length !== a.length) {
                        return false;
                    }
                    for(i=0; i<a.length; i++) {
                        if(!__is.equals(_datatype(obj[i]), obj[i], a[i])) {
                            return false;
                        }
                    }
                    return true;
                } else if(adatatype === 'object') {
                    if(_size(a) !== _size(obj)) {
                        return false;
                    }
                    for(k in a) {
                        if(Object.prototype.hasOwnProperty.call(a, k)) {
                            if(!__is.equals(_datatype(obj[k]), obj[k], a[k])) {
                                return false;
                            }
                        }
                    }
                    return true;
                }
                return (obj === a);
            },

            event: function(datatype) {
                return (['event', 'touch'].indexOf(datatype) >= 0);
            },

            fragment: function(datatype) {
                return (datatype === 'fragment');
            },

            function: function(datatype) {
                return (datatype === 'function');
            },

            i18n: function(datatype, obj) {
                return (datatype === 'string' && obj.indexOf('voltmx.i18n.getLocalizedString(') === 0);
            },

            integer: function(datatype, obj) {
                return (datatype === 'number' && Math.ceil(obj) === Math.floor(obj));
            },

            leapyear: function(datatype, obj) {
                if(datatype === 'number' && obj >= 1000 && obj <= 9999) {
                    obj = new Date(obj, 1, 29, 0, 0, 0);
                    return (obj.getMonth() === 1) ? true : false;
                } else if(datatype === 'date') {
                    obj = new Date(obj.getFullYear(), 1, 29, 0, 0, 0);
                    return (obj.getMonth() === 1) ? true : false;
                }
                return false;
            },

            list: function(datatype) {
                return ([
                    'argument',
                    'array',
                    'cssrulelist',
                    'nodelist',
                    'stylesheetlist',
                    'filelist',
                    'touchlist'
                ].indexOf(datatype) >= 0);
            },

            null: function(datatype) {
                return (datatype === 'null');
            },

            number: function(datatype) {
                return (datatype === 'number');
            },

            numeric: function(datatype, obj) {
                var regexp = /^\s*(\+|-)?((\d+(\.\d+)?)|(\.\d+))\s*$/;
                return (datatype === 'string' && regexp.test(obj));
            },

            object: function(datatype) {
                return (['object', 'widget'].indexOf(datatype) >= 0);
            },

            size: function(datatype, obj, arg2) {
                if(datatype === 'number') {
                    if(arg2 === true) { //Only +ve number
                        return (obj >= 0);
                    } else if(arg2 === false) { //Only -ve number
                        return (obj <= 0);
                    } //Both +ve/-ve number
                    return true;
                } else if(datatype === 'string') {
                    if(!obj) {
                        return true;
                    } else if(__is.numeric(datatype, obj)) {
                        return false;
                    } else if(arg2 === true) { //Only +ve number
                        return (/^([0-9]+)(\.[0-9]+)?(px|%|dp)?$/.test(obj));
                    } else if(arg2 === false) { //Only -ve number
                        return (/^[-]([0-9]+)(\.[0-9]+)?(px|%|dp)?$/.test(obj));
                    } //Both +ve/-ve number
                    return (/^[-+]?([0-9]+)(\.[0-9]+)?(px|%|dp)?$/.test(obj));
                }
                return false;
            },

            skinningConstant: function(datatype, value) {
                return (datatype === 'string' && value.indexOf('$') === 0);
            },

            string: function(datatype) {
                return (datatype === 'string');
            },

            undefined: function(datatype) {
                return (datatype === 'undefined');
            },

            widget: function(datatype, obj, arg2) {
                if(datatype !== 'widget') {
                    return false;
                }
                if(!arg2) { //arg2 is expected to be a "string"
                    return true;
                } else if(arg2 === 'component') {
                    if((obj instanceof voltmx.ui.UserWidget
                        || obj instanceof voltmx.ui.FlexContainer
                        || obj instanceof voltmx.ui.FlexScrollContainer)
                        && _datatype(obj._kwebfw_.is.component) === 'object') {
                        return true;
                    }
                    return false;
                } else if(arg2 === 'inherited') {
                    if(obj.__$kwebfw$ns__ && obj.__$kwebfw$name__
                        && !Object.prototype.hasOwnProperty.call(obj, '__$kwebfw$ns__')
                        && !Object.prototype.hasOwnProperty.call(obj, '__$kwebfw$name__')) {
                        return true;
                    }
                    return false;
                } else if(obj instanceof voltmx.ui[arg2]
                    && (obj.__$kwebfw$name__ === arg2
                    || obj._kwebfw_.ns === ('voltmx.ui.'+arg2))) {
                    return true;
                }
                return false;
            },

            window: function(datatype) {
                return (datatype === 'window');
            }
        };


    var _accessorDescriptor = function $KU_accessorDescriptor(configurable, prop, fn) {
        var desc = {enumerable:true, configurable:configurable};

        desc[prop] = fn;

        return desc;
    };

    var _convertPlainObjectToWidgetInstance = function $KU_convertPlainObjectToWidgetInstance(obj) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget, c = 0,
            _ = null, widget = null, klass = null, child = null, clen = -1;

        if(obj) {
            _ = obj._kwebfw_; delete obj._kwebfw_;
            klass = _get(_.ns, window);

            if($KU.is(klass, 'function')) {
                obj.isPreValidated = true;
                widget = (_.tpwp) ? (new klass(obj, {}, _.tpwp)) : (new klass(obj));

                delete widget._kwebfw_.isPreValidated;
                widget._kwebfw_.is.cloned = true;
                if(_.is.template) widget._kwebfw_.is.template = true;

                if(widget._kwebfw_.is.component) {
                    widget._kwebfw_.is.cloned = true;

                    $KW.iterate($KW.proxy(widget), function(child) {
                        child._kwebfw_.is.cloned = true;
                    });
                } else if($KW.isContainer(widget)) {
                    clen = _.children.length;

                    for(c=0; c<clen; c++) {
                        child = _.children[c];
                        child = _convertPlainObjectToWidgetInstance(child);
                        child && widget.add(child);
                    }
                }

                _ = null; //For GC
            }
        }

        return widget;
    };


    var _convertWidgetInstanceToPlainObject = function $KU_convertWidgetInstanceToPlainObject(widget, prefix) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget, _ = widget._kwebfw_,
            prop = _.prop, obj = {_kwebfw_:{ns:_.ns, name:_.name, is:{}}},
            child = null, children = null, c = 0, clen = 0, escapeProps = null;

        if(!$KW.isClonable(widget)) {
            obj = null;
        } else {
            if(_.tpwp) {
                obj._kwebfw_.tpwp = {};

                $KU.each(_.tpwp, function(value, key) {
                    obj._kwebfw_.tpwp[key] = value;
                });
            }

            $KU.each($KW.inheritedProperties(widget), function(value, key) {
                obj[key] = value;
            });

            escapeProps = _deduceEscapeProperties(widget);

            if($KU.is(_.args, 'array')
            && _.args.length === 3
            && $KU.is(_.args[0], 'object')
            && $KU.is(_.args[1], 'object')
            && $KU.is(_.args[2], 'object')) {
                $KU.each(_.args, function(config) {
                    var $K = voltmx.$kwebfw$, $KU = $K.utils;

                    $KU.each(config, function(value, key) {
                        obj[key] = (key === 'id') ? (prefix+value) : value;
                    });
                });
            } else {
                $KU.each(prop, function(value, key) {
                    if(escapeProps.indexOf(key) === -1) {
                        obj[key] = (key === 'id') ? (prefix+value) : value;
                    }
                });
            }

            if(_.is.template === true) {
                obj._kwebfw_.is.template = true;
            }

            if($KW.isContainer(widget)) {
                children = $KW.children(widget);
                clen = children.length;
                obj._kwebfw_.children = [];

                for(c=0; c<clen; c++) {
                    child = _convertWidgetInstanceToPlainObject(children[c], prefix);
                    child && obj._kwebfw_.children.push(child);
                }
            }
        }

        return obj;
    };


    var _deduceEscapeProperties = function $KU_deduceEscapeProperties(widget) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget, _ = widget._kwebfw_,
            prop = _.prop, escapeProps = $KW.getNonConstructorProperties($KW.name(widget));

        if(_escapeProperties[$KW.name(widget)]) {
            escapeProps = escapeProps.concat(_escapeProperties[$KW.name(widget)]);
        }

        escapeProps.push('parent', 'frame', '_voltmxControllerName');
        if($KU.is(prop.focusSkin, 'null')) escapeProps.push('focusSkin');
        if($KU.is(prop.padding, 'null')) escapeProps.push('padding');
        if($KU.is(prop.skin, 'null')) escapeProps.push('skin');


        if($KU.is(widget, 'widget', 'SegmentedUI2')) {
            if($KU.is(prop.contentOffset, 'object')) {
                escapeProps.push('contentOffset');
            }

            if($KU.is(prop.contentOffsetMeasured, 'object')) {
                escapeProps.push('contentOffsetMeasured');
            }

            if($KU.is(prop.selectionBehaviorConfig, 'null')) {
                escapeProps.push('selectionBehaviorConfig');
            }

            if($KU.is(prop.rowTemplate, 'null')) {
                escapeProps.push('rowTemplate');
            }

            if($KU.is(prop.sectionHeaderTemplate, 'null')) {
                escapeProps.push('sectionHeaderTemplate');
            }
            return escapeProps;
        }

        if($KU.is(prop.selectedValue, 'null')
            && $KU.is(widget, 'widget', 'Slider')) {
            escapeProps.push('selectedValue');
            return escapeProps;
        }

        if($KU.is(widget, 'widget', 'Camera')) {
            if($KU.is(prop.videoDuration, 'null')) {
                escapeProps.push('videoDuration');
            }

            if($KU.is(prop.rawBytes, 'null')) {
                escapeProps.push('rawBytes');
            }

            return escapeProps;
        }

        if($KU.is(widget, 'widget', 'Map')) {
            if($KU.is(prop.navControlsImageConfig, 'string')) {
                escapeProps.push('navControlsImageConfig');
            }

            if($KU.is(prop.onBoundsChanged, 'string')) {
                escapeProps.push('onBoundsChanged');
            }

            if($KU.is(prop.onMapLoaded, 'string')) {
                escapeProps.push('onMapLoaded');
            }

            if($KU.is(prop.onPinClick, 'string')) {
                escapeProps.push('onPinClick');
            }

            if($KU.is(prop.onSelection, 'string')) {
                escapeProps.push('onSelection');
            }

            if($KU.is(prop.widgetDataMapForCallout, 'string')) {
                escapeProps.push('widgetDataMapForCallout');
            }
            return escapeProps;
        }

        if($KU.is(widget, 'widget', 'CollectionView')) {
            if($KU.is(prop.contentOffset, 'object')) {
                escapeProps.push('contentOffset');
            }

            if($KU.is(prop.contentOffsetMeasured, 'object')) {
                escapeProps.push('contentOffsetMeasured');
            }

            if($KU.is(prop.pullToRefreshView, 'null')) {
                escapeProps.push('pullToRefreshView');
            }

            if($KU.is(prop.pushToRefreshView, 'null')) {
                escapeProps.push('pushToRefreshView');
            }

            if($KU.is(prop.releaseToPullRefreshView, 'null')) {
                escapeProps.push('releaseToPullRefreshView');
            }

            if($KU.is(prop.releaseToPushRefreshView, 'null')) {
                escapeProps.push('releaseToPushRefreshView');
            }

            if($KU.is(prop.selectedItemindex, 'array')) {
                escapeProps.push('selectedItemindex');
            }

            if($KU.is(prop.selectionBehaviorConfig, 'array')) {
                escapeProps.push('selectionBehaviorConfig');
            }
            return escapeProps;
        }

        return escapeProps;
    };


    var _debounce = function(func, delay) {
        var debounceTimer = null;
        return function() {
            var context = this;
            var args = arguments;
            debounceTimer && clearTimeout(debounceTimer);
            debounceTimer = setTimeout(function() {
                func.apply(context, args);
            }, delay);
        };
    };


    var _deserializeDate = function $KU_deserializeDate(value) {
        var date = '', time = '';

        if(_isDateString(value)) {
            value = value.split(' ');
            date = value[0].split('-');
            time = value[1].split(':');

            return new Date(parseInt(date[0], 10), (parseInt(date[1], 10)-1), parseInt(date[2], 10), parseInt(time[0], 10), parseInt(time[1], 10), parseInt(time[2], 10));
        }
        return value;
    };


    var _deserializeFunction = function $KU_deserializeFunction(value) {
        //*
        var fn = null, args = '', body = '';

        if(_isFunctionString(value)) {
            args = value.substring((value.indexOf('(') + 1), (value.indexOf(')')));
            body = value.substring((value.indexOf('{') + 1), (value.lastIndexOf('}')));
            fn = new Function(args, body);
        } else {
            fn = value;
        }
        //*/

        /*
        var $K = voltmx.$kwebfw$, $KU = $K.utils, regexp = '', fn = '', matches = null, name = '', args = '', body = '';

        if(_isFunctionString(value)) {
            regexp = /^function\s*([^\s(]*)\s*\(([^)]*)\)[^{]*\{([^]*)\}$/gi;
            fn = value.replace(/^\s|\s$/g, '');
            matches = regexp.exec(fn);

            if(matches && matches.length) {
                name = matches[1] || '';
                args = matches[2].replace(/\s+/g,'').split(',');
                body = matches[3] || '';

                fn = Function.prototype.constructor.apply(this, [].concat(args, body));
            } else {
                fn = value;
            }
        } else {
            fn = value;
        }
        //*/

        return fn;
    };


    var _deserializeWidget = function $KU_deserializeWidget(value) {
        if(_isWidgetString(value)) {
            value = value.slice(20, (value.length-1));
            value = JSON.parse(value);
            value = _convertPlainObjectToWidgetInstance(value);
        } else {
            value = null;
        }

        return value;
    };


    var _escapeProperties = {
        Calendar: ['day', 'month', 'year', 'hour', 'minutes', 'seconds']
    };


    var _isDateString = function $KU_isDateString(value) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, isValid = false, regexp = null;

        if($KU.is(value, 'string') && value) {
            regexp = new RegExp(/^\d\d\d\d-(0?[1-9]|1[0-2])-(0?[1-9]|[12][0-9]|3[01]) (00|[0-9]|1[0-9]|2[0-3]):([0-9]|[0-5][0-9]):([0-9]|[0-5][0-9])$/g);
            isValid = regexp.test(value);
        }

        return isValid;
    };


    var _isFunctionString = function $KU_isFunctionString(value) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, isValid = false;

        if($KU.is(value, 'string')) {
            if(value.substr(0, 8) === 'function') {
                isValid = true;
            }
        }

        return isValid;
    };


    var _isWidgetString = function $KU_isWidgetString(value) {
        var flag = false;

        if(value.substr(0, 21) === 'voltmx.ui.BasicWidget({'
        && value.substr((value.length-2), 2) === '})') {
            flag = true;
        }

        return flag;
    };


    var _serializeDate = function $KU_serializeDate(value) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, yyyy = '', mm = '', dt = '', hr = '', min = '', sec = '';

        if($KU.is(value, 'date')) {
            yyyy = value.getFullYear().toString();
            mm = (value.getMonth()+1); mm = (mm < 10) ? ('0'+mm) : mm.toString();
            dt = value.getDate(); dt = (dt < 10) ? ('0'+dt) : dt.toString();
            hr = value.getHours(); hr = (hr < 10) ? ('0'+hr) : hr.toString();
            min = value.getMinutes(); min = (min < 10) ? ('0'+min) : min.toString();
            sec = value.getSeconds(); sec = (sec < 10) ? ('0'+sec) : sec.toString();

            return (yyyy+'-'+mm+'-'+dt+' '+hr+':'+min+':'+sec);
        }
        return value;
    };


    var _serializeFunction = function $KU_serializeFunction(value) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils;

        if($KU.is(value, 'function')) {
            return value.toString();
        }
        return value;
    };


    var _serializeWidget = function $KU_serializeWidget(value) {
        value = _convertWidgetInstanceToPlainObject(value);

        return (value) ? ('voltmx.ui.BasicWidget(' + JSON.stringify(value) + ')') : '';
    };

    /* -------------------------------------------------------------------------- */

    var _angle = function $KU_angle(endPoint, startPoint) {
        var deltaX = 0, deltaY = 0, angle = 0;

        if(_is(endPoint, 'object') && _is(startPoint, 'object')) {
            deltaX = endPoint.x - startPoint.x;
            deltaY = endPoint.y - startPoint.y;
        } else if(_is(endPoint, 'number') && _is(startPoint, 'number')) {
            deltaX = endPoint;
            deltaY = startPoint;
        }

        angle = (Math.atan2(deltaY, deltaX) * 180) / Math.PI;

        return angle;
    };

    var _browser = function $KU_browser(info, supports) {
        var ua = navigator.userAgent.toLowerCase(), index = -1,
            name = '', os = '', version = '', channel = '',
            orientation = null, bodyHeight = 0, bodyWidth = 0;

        if(_is(info, 'string') && info) info = info.toLowerCase();
        if(_is(supports, 'string') && supports) supports = supports.toLowerCase();

        if(ua.indexOf('edg/') >= 0) {
            ua = ua.replace('edg/', 'edge/');
        } else if(ua.indexOf('trident/') >= 0
        && ua.indexOf('rv:11.0') >= 0) {
            ua = ua.replace('rv:11.0', 'msie/11.0');
        }

        if(info === 'orientation') {
            orientation = screen.orientation || screen.mozOrientation || screen.msOrientation;

            if(window.ScreenOrientation
            && orientation instanceof ScreenOrientation) {
                if(orientation.type === 'portrait-primary'
                || orientation.type === 'portrait-secondary') {
                    return 'portrait';
                } else if(orientation.type === 'landscape-primary'
                || orientation.type === 'landscape-secondary') {
                    return 'landscape';
                }
                return 'portrait';
            } else if(typeof window.orientation === 'number') {
                if(window.orientation === 0 || window.orientation === 180) {
                    if(_browser('os') === 'android'
                    && _browser('channel') === 'tablet') {
                        return 'landscape';
                    }
                    return 'portrait';
                } else if(window.orientation === 90 || window.orientation === -90) {
                    if(_browser('os') === 'android'
                    && _browser('channel') === 'tablet') {
                        return 'portrait';
                    }
                    return 'landscape';
                }
                return 'portrait';
            } else if(window.matchMedia) {
                if(window.matchMedia('(orientation: portrait)').matches) {
                    return 'portrait';
                } else if(window.matchMedia('(orientation: landscape)').matches) {
                    return 'landscape';
                }
                return 'portrait';
            }
            bodyHeight = document.body.offsetHeight;
            bodyWidth = document.body.offsetWidth;
            if(bodyHeight > bodyWidth) {
                return 'portrait';
            } else if(bodyHeight < bodyWidth) {
                return 'landscape';
            }
            return 'portrait';
        } else if(info === 'channel') {
            if(!Object.prototype.hasOwnProperty.call(__browser, info)) {
                os = _browser('os');
                if(ua.indexOf('mobile') >= 0) {
                    if(os === 'ios') {
                        __browser[info] = (ua.indexOf('iphone') >= 0)
                            ? 'mobile' : (ua.indexOf('ipad') >= 0)
                                ? 'tablet' : 'desktop';
                    } else if(os === 'windows') {
                        __browser[info] = (ua.indexOf('phone') >= 0)
                            ? 'mobile' : (ua.indexOf('tablet') >= 0)
                                ? 'tablet' : 'desktop';
                    } else {
                        __browser[info] = 'mobile';
                    }
                } else if(ua.indexOf('tablet') >= 0) {
                    __browser[info] = 'tablet';
                } else {
                    __browser[info] = 'desktop';
                }
            }
        } else if(info === 'os') {
            if(!Object.prototype.hasOwnProperty.call(__browser, info)) {
                if(ua.indexOf('mac os') >= 0) {
                    __browser[info] = 'ios';
                } else if(ua.indexOf('windows') >= 0) {
                    __browser[info] = 'windows';
                } else if(ua.indexOf('android') >= 0) {
                    __browser[info] = 'android';
                } else {
                    __browser[info] = 'unknown';
                }
            }
        } else if(info === 'osversion') {
            if(!Object.prototype.hasOwnProperty.call(__browser, info)) {
                os = _browser('os');
            }
        } else if(info === 'name') {
            if(!Object.prototype.hasOwnProperty.call(__browser, info)) {
                //NOTE:: Order of if/else condition matters
                if(ua.indexOf('edge') >= 0) {
                    __browser[info] = 'edge';
                } else if(ua.indexOf('msie') >= 0) {
                    __browser[info] = 'msie';
                } else if(ua.indexOf('chrome') >= 0) {
                    __browser[info] = 'chrome';
                } else if(ua.indexOf('firefox') >= 0) {
                    __browser[info] = 'firefox';
                } else if(ua.indexOf('safari') >= 0) {
                    __browser[info] = 'safari';
                } else {
                    __browser[info] = 'unknown';
                }
            }
        } else if(info === 'device') {
            if(!Object.prototype.hasOwnProperty.call(__browser, info)) {
                os = _browser('os');
                channel = _browser('channel');

                if(channel === 'desktop') {
                    __browser[info] = 'desktop';
                } else if(os === 'android') {
                    __browser[info] = (channel === 'tablet')
                        ? 'androidtablet' : 'android';
                } else if(os === 'ios') {
                    __browser[info] = (channel === 'tablet') ? 'ipad'
                        : (channel === 'mobile') ? 'iphone' : 'mac';
                } else if(os === 'windows') {
                    __browser[info] = (channel === 'tablet') ? 'windowstablet'
                        : (channel === 'mobile') ? 'windowsphone' : 'pc';
                }
            }
        } else if(info === 'version') {
            if(!Object.prototype.hasOwnProperty.call(__browser, info)) {
                name = _browser('name');
                index = ua.indexOf(name+'/');
                if(index >= 0) {
                    index += (name.length + 1);
                    while(index < ua.length && ['.', '-', '_', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].indexOf(ua[index]) >= 0) {
                        version += ua[index];
                        index++;
                    }
                }
                __browser[info] = (version) ? version : 'unknown';
            }
        } else if(info === 'engine') {
            if(!Object.prototype.hasOwnProperty.call(__browser, info)) {
                name = _browser('name');
                if(['chrome', 'safari', 'edge'].indexOf(name) >= 0) {
                    __browser[info] = 'webkit';
                } else if(name === 'firefox') {
                    __browser[info] = 'moz';
                } else if(name === 'msie') {
                    __browser[info] = 'ms';
                } else {
                    __browser[info] = 'unknown';
                }
            }
        } else if(info === 'devicememory') {
            if(!Object.prototype.hasOwnProperty.call(__browser, info)) {
                __browser[info] = navigator.deviceMemory;
            }
        } else if(info === 'language') {
            if(!Object.prototype.hasOwnProperty.call(__browser, info)) {
                __browser[info] = navigator.language
                               || navigator.userLanguage
                               || navigator.browserLanguage;
            }
        } else if(info === 'supports') {
            if(supports === 'cookies') {
                if(!Object.prototype.hasOwnProperty.call(__browser[info], supports)) {
                    __browser[info][supports] = navigator.cookieEnabled;
                }
            } else if(supports === 'cache') {
                if(Object.prototype.hasOwnProperty.call(__browser[info], supports)) {
                    __browser[info][supports] = (window.caches
                                              && window.caches instanceof CacheStorage)
                        ? true : false;
                }
            } else if(supports === 'appcache') {
                if(!Object.prototype.hasOwnProperty.call(__browser[info], supports)) {
                    __browser[info][supports] = (window.applicationCache
                                              && window.applicationCache instanceof ApplicationCache)
                        ? true : false;
                }
            } else if(supports === 'battery') {
                if(!Object.prototype.hasOwnProperty.call(__browser[info], supports)) {
                    __browser[info][supports] = (_is(navigator.getBattery, 'function'))
                        ? true : false;
                }
            } else if(supports === 'bluetooth') {
                if(!Object.prototype.hasOwnProperty.call(__browser[info], supports)) {
                    __browser[info][supports] = '//TODO::';
                }
            } else if(supports === 'usb') {
                if(!Object.prototype.hasOwnProperty.call(__browser[info], supports)) {
                    __browser[info][supports] = '//TODO::';
                }
            } else if(supports === 'clipboard') {
                if(!Object.prototype.hasOwnProperty.call(__browser[info], supports)) {
                    __browser[info][supports] = '//TODO::';
                }
            } else if(supports === 'connection') {
                if(!Object.prototype.hasOwnProperty.call(__browser[info], supports)) {
                    __browser[info][supports] = (navigator.connection instanceof NetworkInformation)
                        ? true : false;
                }
            } else if(supports === 'displaymedia') {
                if(!Object.prototype.hasOwnProperty.call(__browser[info], supports)) {
                    __browser[info][supports] = (_is(navigator.mediaDevices.getDisplayMedia, 'function'))
                        ? true : false;
                }
            } else if(supports === 'fullscreen') {
                if(!Object.prototype.hasOwnProperty.call(__browser[info], supports)) {
                    __browser[info][supports] = document.fullscreenEnabled;
                }
            } else if(supports === 'geolocation') {
                if(!Object.prototype.hasOwnProperty.call(__browser[info], supports)) {
                    __browser[info][supports] = navigator.geolocation ? true : false;
                }
            } else if(supports === 'orientation') {
                if(!Object.prototype.hasOwnProperty.call(__browser[info], supports)) {
                    __browser[info][supports] = ('onorientationchange' in window);
                }
            } else if(supports === 'touch') {
                if(!Object.prototype.hasOwnProperty.call(__browser[info], supports)) {
                    __browser[info][supports] = ('ontouchstart' in window);
                }
            } else if(supports === 'localstorage') {
                if(!Object.prototype.hasOwnProperty.call(__browser[info], supports)) {
                    __browser[info][supports] = (localStorage
                                              && localStorage instanceof Storage)
                        ? true : false;
                }
            } else if(supports === 'mediarecorder') {
                if(!Object.prototype.hasOwnProperty.call(__browser[info], supports)) {
                    __browser[info][supports] = (_is(window.MediaRecorder, 'function'))
                        ? true : false;
                }
            } else if(supports === 'sessionstorage') {
                if(!Object.prototype.hasOwnProperty.call(__browser[info], supports)) {
                    __browser[info][supports] = (sessionStorage
                                              && sessionStorage instanceof Storage)
                        ? true : false;
                }
            } else if(supports === 'usermedia') {
                if(!Object.prototype.hasOwnProperty.call(__browser[info], supports)) {
                    __browser[info][supports] = (navigator.mediaDevices
                                              && _is(navigator.mediaDevices.getUserMedia, 'function'))
                        ? true : false;
                }
            } else if(supports === 'webshare') {
                if(!Object.prototype.hasOwnProperty.call(__browser[info], supports)) {
                    __browser[info][supports] = (_is(navigator.share, 'function'))
                        ? true : false;
                }
            } else if(supports === 'speechrecognition') {
                if(!Object.prototype.hasOwnProperty.call(__browser[info], supports)) {
                    __browser[info][supports] = (_is(window.webkitSpeechRecognition, 'function'))
                        ? true : false;
                }
            } else if(supports === 'contacts') {
                if(!Object.prototype.hasOwnProperty.call(__browser[info], supports)) {
                    __browser[info][supports] = (_is(navigator.contacts, 'function'))
                        ? true : false;
                }
            } else if(supports === 'getwakelock') {
                if(!Object.prototype.hasOwnProperty.call(__browser[info], supports)) {
                    __browser[info][supports] = (_is(navigator.getWakeLock, 'function'))
                        ? true : false;
                }
            }
        }

        if(_is(info, 'string') && info) {
            return (info === 'supports' && _is(supports, 'string') && supports)
                ? __browser[info][supports] : __browser[info];
        }
        return __browser;
    };

    var _clone = function $KU_clone(obj, prefix) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget, type = '';

        if(_is(obj, 'dom')) {
            return (_is(obj.cloneNode, 'function')) ? obj.cloneNode(true) : obj;
        } else if(_is(obj, 'widget')) {
            if($KW.isClonable(obj)) {
                if(!_is(prefix, 'string')) {
                    prefix = '';
                }

                obj = _convertWidgetInstanceToPlainObject(obj, prefix);

                if($KU.is(obj, 'object') && !$KU.is(obj, 'widget')) {
                    obj = _convertPlainObjectToWidgetInstance(obj);

                    if(obj) {
                        if($KW.isContainer(obj)) {
                            if(obj._kwebfw_.is.template === true) type = 'template';
                            //NOTE:: TabPane and Tab clone is not yet tested
                            else if(obj._kwebfw_.is.tab === true) type = 'tab';

                            if(type) {
                                $KW.root(obj, type);
                            } else {
                                $KW.iterate(obj, function(widget) {
                                    var $K = voltmx.$kwebfw$, $KU = $K.utils;

                                    if($KU.is(widget, 'widget', 'component')) {
                                        return true; //No need to loop over its children
                                    }
                                }, {tabs:false});
                            }
                        }
                    }
                }
            }

            return obj;
        }
        return _deserialize(_serialize(obj, prefix));
    };


    var _convertHexToRGBA = function $KU_convertHexToRGBA(value) {
        var r = value.charAt(0) + value.charAt(1),
            g = value.charAt(2) + value.charAt(3),
            b = value.charAt(4) + value.charAt(5),
            a = 0, rgba = '';

        if(value.length === 6) {
            rgba = '#' + r + g + b;
        } else if(value.length === 8) {
            a = value.charAt(6) + value.charAt(7);

            r = parseInt(r, 16);
            g = parseInt(g, 16);
            b = parseInt(b, 16);

            a = parseInt(a, 16);
            a = ((100 - a) / 100).toFixed(2);
            a = parseFloat(a, 10);
            a = (a < 0) ? 0 : (a > 1) ? 1 : a;

            rgba = 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
        }

        return rgba;
    };


    var _copy = function $KU_copy(obj) {
        if(_is(obj, 'array')) {
            var arr = []; for(var i=0; i<obj.length; i++) {
                arr.push(_copy(obj[i]));
            }
            return arr;
        } else if(_is(obj, 'object')) {
            var o = {}, k = '';
            for(k in obj) {
                o[k] = _copy(obj[k]);
            }
            return o;
        } else if(_is(obj, 'date')) {
            return new Date(obj.getTime());
        } else if(obj && obj.tagName) {
            return obj.cloneNode(true);
        } else if(_is(obj, 'function')) {
            return function() {
                obj.apply(obj, arguments);
            };
        } else if(_is(obj, 'string') || _is(obj, 'number') || _is(obj, 'boolean')) {
            return obj;
        }
    };

    var _datatype = function $KU_datatype(obj, arg1) {
        var objStr = '';
        if((voltmx.ui.BasicWidget && obj instanceof voltmx.ui.BasicWidget)
        || (voltmx.ui.UserWidget && obj instanceof voltmx.ui.UserWidget)) {
            return 'widget';
        }
        objStr = Object.prototype.toString.call(obj);

        if(objStr === '[object Boolean]' || obj instanceof Boolean) {
            return 'boolean';
        } else if(objStr === '[object String]' || obj instanceof String) {
            return 'string';
        } else if(objStr === '[object Function]' || obj instanceof Function) {
            return 'function';
        } else if(objStr === '[object Undefined]' || obj === arg1) {
            return 'undefined';
        } else if(objStr === '[object Number]' && !isNaN(obj)) {
            return 'number';
        } else if(objStr === '[object Object]') { // || obj instanceof Object
            return 'object';
        } else if(objStr === '[object Array]' || obj instanceof Array) {
            return 'array';
        } else if(objStr === '[object Null]' || obj === null) {
            return 'null';
        } else if(objStr === '[object NodeList]' || objStr === '[object HTMLCollection]'
            || obj instanceof NodeList || obj instanceof HTMLCollection) {
            return 'nodelist';
        } else if(objStr === '[object StyleSheetList]' || obj instanceof StyleSheetList) {
            return 'stylesheetlist';
        } else if(objStr === '[object CSSRuleList]' || obj instanceof CSSRuleList) {
            return 'cssrulelist';
        } else if(objStr === '[object FileList]' || obj instanceof FileList) {
            return 'filelist';
        } else if(objStr === '[object TouchList]') {
            return 'touchlist';
        } else if((objStr === '[object Date]' || obj instanceof Date)
            && (obj.toDateString() !== 'Invalid Date' || !isNaN(obj.getTime()))) {
            return 'date';
        } else if(objStr === '[object Arguments]') {
            return 'argument';
        } else if(obj && obj.tagName) {
            return 'node';
        } else if(obj && obj.type) {
            return 'event';
        } else if(objStr === '[object Touch]') {
            return 'touch';
        } else if(objStr === '[object HTMLDocument]' || objStr === '[object Document]'
            || obj instanceof HTMLDocument || obj instanceof Document) {
            return 'document';
        } else if(objStr === '[object DocumentFragment]' || obj instanceof DocumentFragment) {
            return 'fragment';
        } else if(objStr === '[object global]' || objStr === '[object Window]' || obj === window) {
            return 'window';
        }
        return '';

    };

    var _deduceRoute = function $KU_deduceRoute() {
        var $K = voltmx.$kwebfw$, $KU = $K.utils,
            hash = location.hash,
            formId = null, deeplink = null;

        if(hash.startsWith('#_')) {
            hash = hash.split('/'),
            formId = hash[0];
            deeplink = hash[1];
            formId = formId.substr(2, (formId.length-2));
        } else {
            hash = hash.substr(2, (hash.length)).split('/');
            formId = hash[1];
            deeplink = hash[2];
        }

        if(!$KU.is(formId, 'string')) {
            formId = '';
        }

        if($KU.is(deeplink, 'string') && deeplink) {
            deeplink = deeplink.trim();

            if(deeplink[0] === '{' && deeplink[(deeplink.length-1)] === '}') {
                try{
                    deeplink = decodeURI(deeplink);
                    deeplink = JSON.parse(deeplink);
                } catch(e) {
                    deeplink = null;
                }
            }
        } else {
            deeplink = null;
        }

        return {formId:formId, deeplinkParams:deeplink};
    };


    var _defaults = function $KU_defaults(sub, sup) {
        var k = '';

        if(_is(sub, 'object') && _is(sup, 'object')) {
            for(k in sup) {
                if(!Object.prototype.hasOwnProperty.call(sub, k)
                && Object.prototype.hasOwnProperty.call(sup, k)) {
                    sub[k] = sup[k];
                }
            }
        }

        return sub;
    };

    //NOTE:: defineGetter must be called before defineSetter
    var _defineGetter = function $KU_defineGetter(obj, prop, get, configurable) {
        if(typeof configurable !== 'boolean') configurable = true;

        if(Object.defineProperty) {
            return Object.defineProperty(obj, prop, _accessorDescriptor(configurable, 'get', get));
        } else if(Object.prototype.__defineGetter__) {
            return obj.__defineGetter__(prop, get);
        }
        //Throw Error
    };


    var _defineProperty = function $KU_defineProperty(obj, prop, value, arg3) {
        var descriptor = {configurable:false, enumerable:false, value:value, writable:false};

        //NOTE:: When a function scope is changed using bind API.
        //Then that new function does not contain "prototype" property
        if(typeof value === 'function') {
            value.toLocaleString = value.__proto__.toLocaleString;
            value.toSource = value.__proto__.toSource;
            value.toString = value.__proto__.toString;
        }

        //Pass null as 4th argument, if none of the if condition to be met
        if(arguments.length === 3) {
            descriptor.configurable = true;
            descriptor.writable = true;
        } else if(arguments.length === 4) {
            if(typeof arg3 === 'boolean') {
                descriptor.writable = arg3;
            } else if(arg3 && typeof arg3 === 'object') {
                descriptor = arg3;
                descriptor.value = value;
            }
        }

        Object.defineProperty(obj, prop, descriptor);
    };


    //NOTE:: defineSetter must be called after defineGetter
    var _defineSetter = function $KU_defineSetter(obj, prop, set, configurable) {
        if(typeof configurable !== 'boolean') configurable = true;

        if(Object.defineProperty) {
            return Object.defineProperty(obj, prop, _accessorDescriptor(configurable, 'set', set));
        } else if(Object.prototype.__defineSetter__) {
            return obj.__defineSetter__(prop, set);
        }
        //Throw Error
    };

    var _deserialize = function $KU_deserialize(text) {
        if(!_is(text, 'string')) {
            return text;
        }
        if((text[0] === '{' && text[text.length-1] === '}')
            || (text[0] === '[' || text[text.length-1] === ']')) {
            try{
                return JSON.parse(text, function(key, value) {
                    var $K = voltmx.$kwebfw$, $KU = $K.utils;

                    if($KU.is(value, 'string') && value) {
                        if(_isDateString(value)) {
                            return _deserializeDate(value);
                        } else if(_isFunctionString(value)) {
                            return _deserializeFunction(value);
                        }
                        return value;
                    }
                    return value;
                });
            } catch(e) {
                return text;
            }
        } else if(_isWidgetString(text)) {
            return _deserializeWidget(text);
        } else if(_isDateString(text)) {
            return _deserializeDate(text);
        } else if(_isFunctionString(text)) {
            return _deserializeFunction(text);
        } else {
            return text;
        }
    };


    var _direction = function $KU_direction(movedPoint, startPoint) {
        var direction = '', angle = _angle(movedPoint, startPoint);

        if(angle >= 45 && angle < 135) {
            direction = 'down';
        } else if(angle >= 135 || angle <= -135) {
            direction = 'left';
        } else if(angle < -45 && angle > -135) {
            direction = 'up';
        } else if(angle >= -45 && angle <= 45) {
            direction = 'right';
        }

        return direction;
    };


    //Return boolean TRUE to break the looping
    var _each = function $KU_each(variable, callback, scope) {
        var k = '', len = 0, output = null;

        if(!_is(callback, 'function')) return;

        if(_is(variable, 'list')) {
            len = variable.length - 1;

            for(k=0; k<=len; k++) {
                if(arguments.length === 3) {
                    output = callback.call(scope, variable[k], k, len);
                } else if(arguments.length === 2) {
                    output = callback(variable[k], k, len);
                }

                if(output === true) {
                    break;
                }
            }
        } else if(_is(variable, 'object')) {
            for(k in variable) {
                if(Object.prototype.hasOwnProperty.call(variable, k)) {
                    if(arguments.length === 3) {
                        output = callback.call(scope, variable[k], k);
                    } else if(arguments.length === 2) {
                        output = callback(variable[k], k);
                    }

                    if(output === true) {
                        break;
                    }
                }
            }
        }
    };


    var _error = function VoltmxError(errorcode, name, message) {
        this.errorCode = errorcode;
        this.name = name;
        this.message = message;
    };


    var _escapeHTML = function $KU_escapeHTML(str) {
        var div = null;

        if(_is(str, 'string')) {
            if(document && _is(document.createElement, 'function')) {
                div = document.createElement('div');
                div.appendChild(document.createTextNode(str));
                return div.innerHTML;
            }
            //eslint-disable-next-line no-useless-escape
            return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\"/g, '&quot;').replace(/\'/g, '&#39;');
        }
        return str;
    };


    var _get = function $KU_get(key, root) {
        var k = 0, klen = 0, value = null;

        if(arguments.length === 1) root = window;
        if(_is(key, 'string') && key) key = key.split('.');

        if(_is(key, 'array') && (_is(root, 'object') || root === window)) {
            klen = key.length-1; value = root;

            for(k=0; k<klen; k++) { //Here klen = key.length-1;
                if((_is(root, 'object') || root === window)
                && Object.prototype.hasOwnProperty.call(value, key[k])) {
                    value = value[key[k]];
                } else {
                    break;
                }
            }

            if((_is(root, 'object') || root === window)
            && Object.prototype.hasOwnProperty.call(value, key[klen])) {
                value = value[key[klen]];
            } else {
                value = undefined;
            }
        }

        return value;
    };


    var _getI18Nvalue = function $KU_getI18Nvalue(value) {
        var regexp = null, matches = null, key = '';

        if(_is(value, 'i18n')) {
            //eslint-disable-next-line no-useless-escape
            regexp = /\((\'|\")([^)]+)(\'|\")\)/;
            matches = regexp.exec(value);
            key = (matches && matches[2]) ? matches[2] : '';
        }

        return (key) ? voltmx.i18n.getLocalizedString(key) : '';
    };


    var _getImageURL = function $KU_getImageURL(src) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils,
            $KG = $K.globals, $KA = $K.app, path = '';

        if($KU.is(src, 'string') && src) {
            if(src.indexOf('http') === 0) {
                path = src;
            } else {
                if((src.match(/^([^.]+)$/) !== null)) {
                    src = src + '.svg';
                }

                if($KA.staticContentPath) {
                    path += $KA.staticContentPath;
                }

                if($KG.platform) {
                    path += ($KG.platform + '/');
                }

                path += 'images/';

                if($K.device.resolution) {
                    path += ($K.device.resolution + '/');
                }

                path += src;
            }
        }

        return path;
    };

    var _getLocalStorage = function $KU_getLocalStorage() {
        var $K = voltmx.$kwebfw$, $KA = $K.app, store = null,
            data = localStorage.getItem($KA.id);

        if(typeof data === 'string' && data) {
            try{
                store = JSON.parse(data);
            } catch(e) {
                store = data;
            }
        }

        return store;
    };

    /**
    * For given src (any asset e.g. image, font) and path would be folder (e.g. web/localfiles).
    * returns proper relative URL wrt runtime.
    *
    * This utility doesn't check for existence of actual asset in that folder.
    */
    var _getRelativeURL = function $KU_getRelativeURL(src, path) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils,
            $KG = $K.globals, $KA = $K.app, relativepath = '';

        if($KU.is(src, 'string') && src
        && $KU.is(path, 'string') && path) {
            if($KA.staticContentPath) {
                relativepath += $KA.staticContentPath;
            }

            if($KG.platform) {
                relativepath += ($KG.platform + '/');
            }

            relativepath += path;

            relativepath += src;
        }

        return relativepath;
    };

    var _getResourceURL = function(src) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils,
            path = '';

        if($KU.is(src, 'string') && src) {
            if(src.indexOf('blob') === 0) {
                path = src;
            } else {
                path = _getImageURL(src);
            }
        }

        return path;
    };

    var _getThemeStyleSheet = function $KU_getThemeStyleSheet(identifier) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, stylesheet = null;

        $KU.each(document.styleSheets, function(sheet) {
            if(sheet.ownerNode.tagName === 'LINK'
            && sheet.ownerNode.hasAttribute('ktheme')) {
                if(sheet.ownerNode.getAttribute('ktheme') === identifier) {
                    stylesheet = sheet;
                    return true;
                }
            }
        });

        return stylesheet;
    };


    var _getValueUnitByWidgetFrame = function $KU_getValueUnitByWidgetFrame(value, axis, widgetFrame) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KF = voltmx.flex,
            len = 0, unit = null;

        if($KU.is(value, 'string')) {
            len = value.length;
            if(value.substr((len-1), 1) === $KF.PERCENTAGE) {
                value = parseFloat(value.replace($KF.PERCENTAGE, ''), 10);
                if(axis === 'x') {
                    value = (value * widgetFrame.width) / 100;
                } else if(axis === 'y') {
                    value = (value * widgetFrame.height) / 100;
                }
                unit = $KF.PERCENTAGE;
            } else if(value.substr((len-2), 2) === $KF.PX) {
                value = (parseFloat(value.replace($KF.PX, ''), 10) / $K.device.DPI);
                value = Math.round(value);
                unit = $KF.PX;
            } else if(value.substr((len-2), 2) === $KF.DP) {
                value = parseFloat(value.replace($KF.DP, ''), 10);
                unit = $KF.DP;
            }
        }

        return {'value': value, 'unit': unit};
    };

    var _hasEventProperty = function(model, key) {
        var isEvent = false, events = ['onClick', 'onTextChange', 'onDone', 'onSelection', 'onSlide'],
            touchEvent = [ 'onTouchStart', 'onTouchEnd', 'onTouchMove'], widgetType = model._kwebfw_.name,
            clickWidgets = ['Button', 'FlexContainer', 'FlexScrollContainer', 'RichText'],
            onSlideWidgets = ['Switch', 'Slider'],
            onSelectionWidgets = ['CheckBoxGroup', 'ListBox', 'RadioButtonGroup', 'Calendar', 'Slider'],
            textChangeWidgets = ['TextBox2', 'TextArea2'];

        if(touchEvent.indexOf(key) !== -1) {
            isEvent = true;
        }

        if(events.indexOf(key) !== -1) {
            if((key === 'onClick' && clickWidgets.indexOf(widgetType) !== -1)
            || (key === 'onSelection' && onSelectionWidgets.indexOf(widgetType) !== -1)
            || (key === 'onSlide' && onSlideWidgets.indexOf(widgetType) !== -1)
            || ((key === 'onTextChange' || key === 'onDone')
            && textChangeWidgets.indexOf(widgetType) !== -1)
            || (key === 'onDownloadComplete' && widgetType === 'Image2')) {
                isEvent = true;
            }
        }

        return isEvent;
    };


    var _inherits = function $KU_inherits(child, parent) {
        var Inherit = null;

        if(typeof Object.create === 'function') {
            child.prototype = Object.create(parent.prototype);
        } else {
            Inherit = function() {};
            Inherit.prototype = parent.prototype;
            child.prototype = new Inherit();
            child.prototype.constructor = child;
        }

        child.base = parent;
    };

    var _is = function $KU_is(obj, type, arg2) {
        var flag = false, datatype = '';

        if(__is[type]) {
            datatype = _datatype(obj);

            flag = (arg2 !== undefined && datatype !== undefined)
                ? __is[type](datatype, obj, arg2)
                : __is[type](datatype, obj);
        }

        return flag;
    };

    var _loadedFromOtherFramework = function $KU_loadedFromOtherFramework() {
        var flag = false, $KG = $K.globals;

        if($KG.kof.loadedFromOtherFramework) {
            flag = true;
        }

        return flag;
    };

    var _loadScript = function $KU_loadScript(src, attr, onsuccess, onerror, arg4) {
        var head = arg4 || document.head, key = '',
            script = document.createElement('SCRIPT');

        if(attr === true) {
            script.async = false;
        } else if(typeof attr === 'object' && attr) {
            if(attr.sync === true) {
                script.async = false;
                delete attr.sync;
            }
        }

        script.type = 'text/javascript';
        script.src = src;

        if(typeof attr === 'object' && attr) {
            for(key in attr) {
                if(Object.prototype.hasOwnProperty.call(attr, key) && attr[key]) {
                    script.setAttribute(key, attr[key]);
                }
            }
        }

        script.onload = function() {
            script.onload = script.onerror = null; //For GC

            if(typeof onsuccess === 'function') {
                onsuccess.call(this);
            }
        };

        script.onerror = function() {
            script.onload = script.onerror = null; //For GC

            if(typeof onerror === 'function') {
                onerror.call(this);
            }
        };

        head.appendChild(script);
    };


    var _loadStyle = function $KU_loadStyle(src, attr, onsuccess, onerror, arg4) {
        var link = document.createElement('link'),
            key = '', media = 'all', head = arg4;

        if(arguments.length === 4
        && typeof onerror !== 'function') {
            head = onerror;
            onerror = function() {};
        }

        if(typeof attr === 'string') {
            media = attr;
        }

        if(!head) {
            head = document.head;
        }

        link.href = src;
        link.media = 'none';
        link.type = 'text/css';
        link.rel = 'stylesheet';

        if(typeof attr === 'object' && attr) {
            for(key in attr) {
                if(Object.prototype.hasOwnProperty.call(attr, key) && attr[key]) {
                    link.setAttribute(key, attr[key]);
                }
            }
        }

        link.onload = function() {
            link.onload = link.onerror = null; //For GC

            if(typeof onsuccess === 'function') {
                onsuccess.call(this);
            }

            if(this.media === 'none') {
                this.media = media;
            }
        };

        link.onerror = function() {
            link.onload = link.onerror = null; //For GC

            if(typeof onerror === 'function') {
                onerror.call(this);
            }
        };

        head.appendChild(link);
    };

    //meta = {api:'', enter|exit:true|false}
    //meta = {api:'', params:[]}
    var _log = function $KU_log(meta, arg1) {
        var $K = voltmx.$kwebfw$, $KA = $K.app, msg = '',
            $KB = $K.behavior, argLen = arguments.length;

        if(_is(meta, 'object') && Object.prototype.hasOwnProperty.call(meta, 'api')
        && (Object.prototype.hasOwnProperty.call(meta, 'enter')
        || Object.prototype.hasOwnProperty.call(meta, 'exit')
        || Object.prototype.hasOwnProperty.call(meta, 'params'))) {
            if(_is(meta.params, 'list')) {
                msg = 'PARAMS:: ' + meta.api + '(';
                //TODO:: meta.params.join(' ')
                msg += ').';
            } else if(_is(meta.enter, 'boolean')) {
                msg = 'ENTER:: ' + meta.api + '().';
            } else if(_is(meta.exit, 'boolean')) {
                msg = 'EXIT:: ' + meta.api + '().';
            }
            _trace(msg);
        } else if(argLen >= 2) {
            msg = arg1;

            if(argLen === 2 && typeof meta === 'string'
            && console && typeof console[msg] === 'function' //eslint-disable-line no-console
            && typeof console[meta] !== 'function') { //eslint-disable-line no-console
                console[msg](meta); //eslint-disable-line no-console
            } else if($KB.enableLoggerFramework === true
            && $KA.logger && $KA.logger[meta]) {
                $KA.logger[meta](msg);
            } else voltmx.print(msg);
        } else if(arguments.length === 1) {
            console.log(meta); //eslint-disable-line no-console
        }
    };

    //This function returns a new Array/Object, does not change the passed Array/Object
    var _removeFromIndexes = function $KU_removeFromIndexes(obj, indexes) {
        var items = null, i=0, len = 0, index = -1, count = 0;

        if(_is(indexes, 'array')) {
            len = indexes.length;

            if(_is(obj, 'array')) {
                items = []; for(i=0; i<len; i++) {
                    index = indexes[i] - count;
                    if(index >= 0 && index < obj.length) {
                        items.push(obj.splice(index, 1)[0]);
                        count++;
                    }
                }

                return items;
            } else if(_is(obj, 'object')) {
                items = {}; for(i in obj) {
                    if(indexes.indexOf(i) < 0) {
                        items[i] = obj[i];
                    }
                }

                return items;
            }
        }

        return obj;
    };


    var _scrollType = function $KU_scrollType() {
        return 'native'; //native/custom
    };


    var _serialize = function $KU_serialize(obj, opt) {
        if(!_is(opt, 'object')) opt = {};

        if(_is(obj, 'string') || _is(obj, 'number')
        || _is(obj, 'boolean') || _is(obj, 'null')) {
            return obj;
        } else if(_is(obj, 'function')) {
            return _serializeFunction(obj);
        } else if(_is(obj, 'date')) {
            return _serializeDate(obj);
        } else if(_is(obj, 'widget')) {
            return _serializeWidget(obj);
        } else if(_is(obj, 'object') || _is(obj, 'array')) {
            return JSON.stringify(obj, function(key, value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils;

                if($KU.is(value, 'function')) {
                    return (opt.function === false) ? value : _serializeFunction(value);
                } else if($KU.is(value, 'date')) {
                    return _serializeDate(value);
                } else if($KU.is(value, 'widget')) {
                    return _serializeWidget(value);
                }
                return value;
            });
        }
        throw new Error('Passed data cannot be serialized.');
    };


    var _set = function $KU_set(key, value, root) {
        var k = 0, klen = 0, err = 'A part of the path is already defined, and its datatype is not <object>.';

        if(_is(key, 'string') && key) {
            key = key.split('.');
        }

        if(_is(key, 'array') && _is(root, 'object')) {
            klen = key.length-1; value = root;

            for(k=0; k<klen; k++) { //Here klen = key.length-1;
                if(_is(value, 'object')) {
                    if(!Object.prototype.hasOwnProperty.call(value, key[k])) {
                        value[key[k]] = {};
                    }

                    value = value[key[k]];
                } else {
                    throw new Error(err);
                }
            }

            if(_is(value, 'object')) {
                if(!Object.prototype.hasOwnProperty.call(value, key[klen])) {
                    value[key[klen]] = value;
                } else {
                    throw new Error(err);
                }
            } else {
                throw new Error(err);
            }
        }
    };


    var _shouldApplyA11Y = function $KW_shouldApplyA11Y() {
        var flag = true;

        //NOTE:: It is decided that it is always true
        //We are keeping it, in case in future any such requirement arises

        return flag;
    };


    var _size = function $KU_size(obj) {
        var i = 0, k = null;

        if(_is(obj, 'string') || _is(obj, 'list')) {
            return obj.length;
        } else if(_is(obj, 'object')) {
            for(k in obj) {
                if(Object.prototype.hasOwnProperty.call(obj, k)) {
                    i++;
                }
            }
            return i;
        }
    };


    var _trace = function(msg) {
        var $K = voltmx.$kwebfw$, $KA = $K.app;

        if($K.behavior.enableLoggerFramework === true
        && $KA.logger && $KA.logger.trace) {
            $KA.logger.trace('KFW-'+msg);
        } else voltmx.print('KFW-'+msg);
    };

    var _uid = function $KU_uid() {
        var time = null;

        if(__uid === null) {
            time = new Date().getTime().toString();
            __uid = parseInt(time, 10);
        } else {
            __uid++;
        }
        return __uid.toString();
    };

    var _unescapeHTML = function $KU_unescapeHTML(str) {
        var div = null, child = null;

        if(_is(str, 'string')) {
            if(document && _is(document.createElement, 'function')) {
                document.createElement('div');
                div.innerHTML = str;
                child = div.childNodes[0];
                return child ? child.nodeValue : '';
            }
            //eslint-disable-next-line no-useless-escape
            return str.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '\"').replace(/&#39;/g, '\'');
        }
        return str;
    };


    var _unsupportedAPI = function(api, channel) {
        if(typeof channel === 'string') {
            channel = channel.toLowerCase();

            if(channel === 'spa') {
                channel = 'SPA';
            } else if(channel === 'desktop'
            || channel === 'desktopweb') {
                channel = 'Desktop';
            }
        } else {
            channel = 'SPA & Desktop';
        }
        //eslint-disable-next-line no-console
        console.log('API <' + api + '()> is not supported in ' + channel + ' channel.');
    };

    var _uuid = function $KU_uuid() {
        var uuid = '';

        if(window.crypto) {
            uuid = ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, function(c) {
                //eslint-disable-next-line no-undef
                return (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16);
            });
        } else {
            uuid = new Date().getTime();

            if(window.performance && typeof performance.now === 'function') {
                uuid += performance.now();
            }

            uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                var r = (uuid + Math.random() * 16) % 16 | 0;

                uuid = Math.floor(uuid / 16);

                return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
            });
        }

        return uuid.toUpperCase();
    };
    _inherits(_error, Error);

    $K.defVoltmxProp(_ns, [
        {keey:'angle', value:_angle},
        {keey:'browser', value:_browser},
        {keey:'clone', value:_clone},
        {keey:'convertHexToRGBA', value:_convertHexToRGBA},
        {keey:'copy', value:_copy},
        {keey:'datatype', value:_datatype},
        {keey:'debounce', value:_debounce},
        {keey:'deduceRoute', value:_deduceRoute},
        {keey:'defaults', value:_defaults},
        {keey:'defineGetter', value:_defineGetter},
        {keey:'defineProperty', value:_defineProperty},
        {keey:'defineSetter', value:_defineSetter},
        {keey:'deserialize', value:_deserialize},
        {keey:'direction', value:_direction},
        {keey:'each', value:_each},
        {keey:'error', value:_error},
        {keey:'escapeHTML', value:_escapeHTML},
        {keey:'get', value:_get},
        {keey:'getI18Nvalue', value:_getI18Nvalue},
        {keey:'getImageURL', value:_getImageURL},
        {keey:'getLocalStorage', value:_getLocalStorage},
        {keey:'getRelativeURL', value:_getRelativeURL},
        {keey:'getThemeStyleSheet', value:_getThemeStyleSheet},
        {keey:'getValueUnitByWidgetFrame', value:_getValueUnitByWidgetFrame},
        {keey:'getResourceURL', value:_getResourceURL},
        {keey:'hasEventProperty', value:_hasEventProperty},
        {keey:'inherits', value:_inherits},
        {keey:'is', value:_is},
        {keey:'loadedFromOtherFramework', value:_loadedFromOtherFramework},
        {keey:'loadScript', value:_loadScript},
        {keey:'loadStyle', value:_loadStyle},
        {keey:'log', value:_log},
        {keey:'removeFromIndexes', value:_removeFromIndexes},
        {keey:'scrollType', value:_scrollType},
        {keey:'serialize', value:_serialize},
        {keey:'set', value:_set},
        {keey:'shouldApplyA11Y', value:_shouldApplyA11Y},
        {keey:'size', value:_size},
        {keey:'uid', value:_uid},
        {keey:'unescapeHTML', value:_unescapeHTML},
        {keey:'unsupportedAPI', value:_unsupportedAPI},
        {keey:'uuid', value:_uuid}
    ]);


    return _ns;
}())});


/* FILE PATH :: 'lib/apis/voltmx.js' */
(function() {
    var $K = voltmx.$kwebfw$;

    //Available on SPA and DesktopWeb
    var _convertToBase64 = function voltmx_convertToBase64(rawbytes) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils;
        var b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
        var o1, o2, o3, h1, h2, h3, h4, bits, i = 0, ac = 0, enc='', tmp_arr = [];

        $KU.log({api:'voltmx.convertToBase64', enter:true});

        if(!rawbytes) {
            enc = rawbytes;
        } else if('btoa' in window) {
            enc = window.btoa(unescape(encodeURIComponent(rawbytes)));
        } else {
            do{ //Pack three octets into four hexets
                o1 = rawbytes.charCodeAt(i++) & 0xff;
                o2 = rawbytes.charCodeAt(i++) & 0xff;
                o3 = rawbytes.charCodeAt(i++) & 0xff;

                bits = o1<<16 | o2<<8 | o3;

                h1 = bits>>18 & 0x3f;
                h2 = bits>>12 & 0x3f;
                h3 = bits>>6 & 0x3f;
                h4 = bits & 0x3f;

                tmp_arr[ac++] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
            } while(i < rawbytes.length);

            enc = tmp_arr.join('');

            switch(rawbytes.length % 3) {
                case 1: enc = enc.slice(0, -2) + '==';
                    break;
                case 2: enc = enc.slice(0, -1) + '=';
                    break;
                default: break;
            }
        }

        $KU.log({api:'voltmx.convertToBase64', exit:true});

        return enc;
    };

    //Available on SPA but not on except DesktopWeb
    //On SPA, reading base64 from an image src is not supported.
    //But you can read the base64 from an image which is displayed through base64.
    //eslint-disable-next-line no-unused-vars
    var _convertToRawBytes = function voltmx_convertToRawBytes(base64String) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils;

        $KU.log({api:'voltmx.convertToRawBytes', enter:true});
        $KU.log({api:'voltmx.convertToRawBytes', exit:true});

        return null; //Dummy implementation
    };


    var _getError = function voltmx_getError(error) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils;

        $KU.log({api:'voltmx.getError', enter:true});
        $KU.log({api:'voltmx.getError', exit:true});

        return error;
    };


    var _getProperty = function(group, key) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, value = null;

        $KU.log({api:'voltmx.getProperty', enter:true});

        if(arguments.length === 2) {
            if(typeof _voltmxAppProperties === 'object' && _voltmxAppProperties
            && typeof key === 'string' && key) {
                value = _voltmxAppProperties[key] || null;
            }
        }

        $KU.log({api:'voltmx.getProperty', exit:true});

        return value;
    };


    var _screenshot = function voltmx_screenshot(config) {
        var $K = voltmx.$kwebfw$, $KD = $K.dom, $KW = $K.widget, $KA = $K.app,
            $KU = $K.utils, parent = $KW.model($KA.currentFormUID),
            pel = $KD.parent($KW.el(parent, 'node')), cssscript = '',
            filereader = new FileReader(), viewportMain = $KW.el(parent, 'viewport'),
            viewportHeight = viewportMain.scrollHeight, i = 0, j = 0,
            viewportWidth = viewportMain.scrollWidth, data = '', svg = [],
            tempCSS = document.styleSheets, Script = '', formMain = null, csstext = '';

        if($KU.browser('name') === 'msie' || $KU.browser('name') === 'unknown') {
            return;
        }

        formMain = $KD.first(pel);
        csstext = formMain.style.cssText;
        $KD.setAttr(formMain, 'style', csstext +'height:'+ viewportHeight.toString() + 'px !important;' + 'width:' + viewportWidth.toString() + 'px !important;');

        for(i = 0; i < tempCSS.length; i++) {
            if(tempCSS[i].href) {
                for(j = 0; j < tempCSS[i].rules.length; j++) {
                    cssscript = cssscript + tempCSS[i].rules[j].cssText;
                }
            }
        }

        for(i = 0; i < pel.childNodes.length; i++) {
            Script = Script + (new XMLSerializer).serializeToString(pel.childNodes[i]);
        }

        data = '<svg xmlns="http://www.w3.org/2000/svg" width="' + viewportWidth + '" height="' + viewportHeight + '">'
                + '<foreignObject width="100%" height="100%">'
                + '<div xmlns="http://www.w3.org/1999/xhtml" style="font-size:40px" >'
                + '<style>'
                + cssscript
                + '</style>'
                +Script
                + '</div>'
                + '</foreignObject>'
                + '</svg>';
        svg = new Blob([data], {type: 'image/svg+xml;charset=utf-8'});
        filereader.readAsDataURL(svg);
        filereader.onload = function() {
            var img = $KD.create('IMG');
            this.onload = null;
            $KD.setAttr(img, 'crossOrigin', 'anonymous');
            $KD.setAttr(img, 'src', filereader.result);
            $KD.setAttr(img, 'height', viewportHeight);
            $KD.setAttr(img, 'width', viewportWidth);
            $KD.style(img, 'display', 'none');
            $KD.add($KD.body(), img);
            img.onload = function() {
                var canvas = $KD.create('canvas'),
                    ctx = [];
                this.onload = null;
                $KD.setAttr(canvas, 'src', filereader.result);
                $KD.setAttr(canvas, 'height', viewportHeight);
                $KD.setAttr(canvas, 'width', viewportWidth);
                $KD.style(canvas, 'display', 'none');
                $KD.add($KD.body(), canvas);
                ctx = canvas.getContext('2d');
                ctx.imageSmoothingEnabled = true;
                ctx.drawImage(img, 0, 0);
                $KD.remove(img);
                $KD.remove(canvas);
                config.callback && config.callback(canvas.toDataURL().split(',')[1]);
            };
        };

        $KD.setAttr(formMain, 'style', csstext);
    };

    var _print = function voltmx_print(str) {
        //eslint-disable-next-line no-console
        if(console && typeof console.log === 'function'
        && constants.PRINTSTUB !== 'true') {
            if(typeof str === 'string'
            || typeof str === 'number'
            || typeof str === 'boolean'
            || str === null || str === undefined) {
                //eslint-disable-next-line no-console
                console.log(str);
            } else if(typeof str === 'object' && str) {
                if(JSON) {
                    //eslint-disable-next-line no-console
                    console.log(JSON.stringify(str));
                } else if(typeof str.toString === 'function') {
                    //eslint-disable-next-line no-console
                    console.log(str.toString());
                }
            }
        }
    };


    var _type = function voltmx_type(variable) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget, datatype = '';

        $KU.log({api:'voltmx.type', enter:true});

        if($KU.is(variable, 'string')) {
            datatype = 'string';
        } else if($KU.is(variable, 'number')) {
            datatype = 'number';
        } else if($KU.is(variable, 'function')) {
            datatype = 'function';
        } else if($KU.is(variable, 'null')) {
            datatype = 'null';
        } else if($KU.is(variable, 'widget')) {
            variable = $KW.proxy(variable);
            datatype = (variable) ? variable._kwebfw_.ns : 'userdata';
        } else {
            datatype = 'userdata';
        }

        $KU.log({api:'voltmx.type', exit:true});

        return datatype;
    };

    $K.defVoltmxProp(voltmx, [
        {keey:'convertToBase64', value:_convertToBase64},
        {keey:'convertToRawBytes', value:_convertToRawBytes},
        {keey:'getError', value:_getError},
        {keey:'screenshot', value:_screenshot},
        {keey:'print', value:_print, writable: true},
        {keey:'type', value:_type}
    ]);


    $K.defVoltmxProp(voltmx.props, [
        {keey:'getProperty', value:_getProperty}
    ]);
}());


/* FILE PATH :: 'lib/apis/voltmxapplication.js' */
Object.defineProperty(voltmx, 'application', {configurable:false, enumerable:false, writable:false, value:(function() {
    var _ns = {}, $K = voltmx.$kwebfw$, _lastFocusedElement = null;


    var _addApplicationCallbacks = function $KAPP_addApplicationCallbacks() {
        //
    };

    //TODO:: addBMState
    //
    var _addBMState = function $KAPP_addBMState(/*formId, keey, value*/) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils;

        $KU.log({api:'voltmx.application.addBMState', enter:true});

        //

        $KU.log({api:'voltmx.application.addBMState', exit:true});
    };


    //TODO:: addGestureRecognizerForAllForms
    var _addGestureRecognizerForAllForms = function $KAPP_addGestureRecognizerForAllForms(gestureType, gestureConfigParams, onGestureClosure) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, id = $KU.uid(), gesture = null;

        $KU.log({api:'voltmx.application.addGestureRecognizerForAllForms', enter:true});

        if(!$KU.is($K.app.gesture, 'object')) {
            gesture = $K.app.gesture = {};
        }
        if(!$KU.is(gesture[gestureType], 'array')) {
            gesture[gestureType] = [];
        }

        gesture = gesture[gestureType];

        gesture.push({cb:onGestureClosure, id:id, opt:gestureConfigParams});

        $KU.log({api:'voltmx.application.addGestureRecognizerForAllForms', exit:true});

        return id;
    };


    var _checkPermission = function $KAPP_checkPermission(resourceId/*, options*/) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, permission = null;

        $KU.log({api:'voltmx.application.checkPermission', enter:true});

        switch(resourceId) {
            case voltmx.os.RESOURCE_LOCATION:
            case voltmx.os.RESOURCE_CAMERA:
            case voltmx.os.RESOURCE_PHOTO_GALLERY:
            case voltmx.os.RESOURCE_CALENDAR:
                permission = {status:voltmx.application.PERMISSION_GRANTED, canRequestPermission:false};
                break;
            case voltmx.os.RESOURCE_CONTACTS:
            case voltmx.os.RESOURCE_EXTERNAL_STORAGE:
            default:
                permission = {status:voltmx.application.RESOURCE_NOT_SUPPORTED, canRequestPermission:false};
                break;
        }

        $KU.log({api:'voltmx.application.checkPermission', exit:true});

        return permission;
    };


    var _dismissLoadingScreen = function $KAPP_dismissLoadingScreen() {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KD = $K.dom,
            $KA = $K.app, $KG = $K.globals;

        $KU.log({api:'voltmx.application.dismissLoadingScreen', enter:true});

        if($KU.is($KA.blocked, 'boolean')) {
            $KD.setAttr($KG.appBlocker, 'hidden', true);
            $KD.removeAttr($KG.appBlocker, 'class');
            $KD.removeAttr($KG.appBlocker, 'tabindex');

            $KD.style($KG.appBlocker, {
                left: null,
                top: null,
                width: null,
                height: null,
                transform: null,
                'pointer-events': null
            });

            if(_lastFocusedElement) {
                $KD.focus(_lastFocusedElement);
                _lastFocusedElement = null; //For GC
            }

            $KA.blocked = null;
        }

        $KU.log({api:'voltmx.application.dismissLoadingScreen', exit:true});
    };


    //This is defined in voltmxmvc_sdk.js file
    //var _destroyForm = function $KAPP_destroyForm(formId) {};


    //Available only on SPA
    var _exit = function $KAPP_exit() {
        var $K = voltmx.$kwebfw$, $KU = $K.utils;

        $KU.log({api:'voltmx.application.exit', enter:true});

        window.open('about:blank', '_self', '');

        $KU.log({api:'voltmx.application.exit', exit:true});

        window.close();
    };


    var _getApplicationBehavior = function $KAPP_getApplicationBehavior(behavior) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, value = null;

        $KU.log({api:'voltmx.application.getApplicationBehavior', enter:true});

        if($KU.is(behavior, 'string') && behavior) {
            value = $K.behavior[behavior];
        }

        $KU.log({api:'voltmx.application.getApplicationBehavior', exit:true});

        return value;
    };


    var _getApplicationMode = function $KAPP_getApplicationMode() {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KA = $K.app;

        $KU.log({api:'voltmx.application.getApplicationMode', enter:true});
        $KU.log({api:'voltmx.application.getApplicationMode', exit:true});

        return $KA.mode;
    };


    var _getBaseURL = function $KAPP_getBaseURL() {
        var $K = voltmx.$kwebfw$, $KU = $K.utils;
        $KU.log({api:'voltmx.application.getBaseURL', enter:true});
        $KU.log({api:'voltmx.application.getBaseURL', exit:true});

        return window.location.host + window.location.pathname;
    };


    //TODO:: getBMState
    var _getBMState = function $KAPP_getBMState(/*formId*/) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils;

        $KU.log({api:'voltmx.application.getBMState', enter:true});

        //

        $KU.log({api:'voltmx.application.getBMState', exit:true});
    };


    var _getBrowserProtocol = function $KAPP_getBrowserProtocol() {
        var $K = voltmx.$kwebfw$, $KU = $K.utils;
        $KU.log({api:'voltmx.application.getBrowserProtocol', enter:true});
        $KU.log({api:'voltmx.application.getBrowserProtocol', exit:true});
        return window.location.protocol;
    };


    var _getCurrentBreakpoint = function $KAPP_getCurrentBreakpoint() {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KA = $K.app;

        $KU.log({api:'voltmx.application.getCurrentBreakpoint', enter:true});
        $KU.log({api:'voltmx.application.getCurrentBreakpoint', exit:true});

        return $KA.currentBreakpoint;
    };

    var _getCurrentForm = function $KAPP_getCurrentForm() {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget, $KA = $K.app;

        $KU.log({api:'voltmx.application.getCurrentForm', enter:true});
        $KU.log({api:'voltmx.application.getCurrentForm', exit:true});

        return $KW.model($KA.currentFormUID);
    };

    var _getPreviousForm = function $KAPP_getPreviousForm() {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KA = $K.app, $KW = $K.widget;

        $KU.log({api:'voltmx.application.getPreviousForm', enter:true});
        $KU.log({api:'voltmx.application.getPreviousForm', exit:true});

        return $KW.model($KA.previousFormUID);
    };


    var _getWebAssetRelativeURL = function $KAPP_getWebAssetRelativeURL(src, path) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, relativePath = src;

        $KU.log({api:'voltmx.application.getWebAssetRelativeURL', enter:true});

        if($KU.is(src, 'string') && src
        && !(src.indexOf('//') === 0 || src.indexOf('://') > 0)) {
            if(path === 'weblocal') {
                relativePath = $KU.getRelativeURL(src, 'web/localfiles/');
            } else {
                relativePath = $KU.getImageURL(src);
            }
        }

        $KU.log({api:'voltmx.application.getWebAssetRelativeURL', exit:true});

        return relativePath;
    };


    var _isImageTurnedOff = function $KAPP_isImageTurnedOff(callback) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KD = $K.dom,
            $KG = $K.globals, timeout = null, image = null;

        $KU.log({api:'voltmx.application.isImageTurnedOff', enter:true});

        if($KU.is(callback, 'function')) {
            image = $KD.create('IMG');
            image.src = $KU.getImageURL('loading.gif');
            image.style.visibility = 'hidden';
            $KD.on(image, 'mousedown', 'image', function(e) {
                $KD.preventDefault(e);
            });
            $KD.add($KG.appScrap, image);

            timeout = setTimeout(function() {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, $KD = $K.dom;

                clearTimeout(timeout);

                if(image.complete) {
                    callback(false);
                } else {
                    callback(true);
                }

                $KD.remove(image);

                $KU.log({api:'voltmx.application.isImageTurnedOff', exit:true});
            }, 1000);
        }
    };


    var _isPopupBlocked = function $KAPP_isPopupBlocked(callback) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, timeout = null, win = null;

        $KU.log({api:'voltmx.application.isPopupBlocked', enter:true});

        if($KU.is(callback, 'function')) {
            timeout = setTimeout(function() {
                clearTimeout(timeout);
                win = window.open(null);

                try{
                    win.close();
                    callback(false); //popups are enabled;
                } catch(e) {
                    callback(true); //popups are disabled;
                }

                $KU.log({api:'voltmx.application.isPopupBlocked', exit:true});
            }, 2000);
        }
    };


    //Supported for DesktopWeb, not for SPA
    var _openMediaURL = function $KAPP_openMediaURL(url, params, name) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils;

        $KU.log({api:'voltmx.application.openMediaURL', enter:true});

        _openURL(url, params, name);

        $KU.log({api:'voltmx.application.openMediaURL', exit:true});
    };


    var _openURL = function $KAPP_openURL(url, params, name) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, options = null;

        $KU.log({api:'voltmx.application.openURL', enter:true});

        if(arguments.length === 1) {
            name = '_blank';
            params = null;
        } else if(arguments.length === 2) {
            if($KU.is(params, 'string')) {
                name = params;
                params = null;
            }
        }

        if($KU.is(url, 'string') && url) {
            if(!($KU.is(name, 'string') && name)) {
                name = '_blank';
            }

            if(!$KU.is(params, 'object')) {
                window.open(url);
            } else { //Supported for DesktopWeb, not for SPA
                if(params.innewwindow !== true) {
                    window.open(url);
                } else {
                    options = [];

                    if($KU.is(params.width, 'number')) {
                        options.push('width=' + params.width + 'px');
                    }
                    if($KU.is(params.height, 'number')) {
                        options.push('height=' + params.height + 'px');
                    }
                    if(!params.menubar === false) {
                        options.push('menubar=no');
                    }
                    if(!params.statusbar === false) {
                        options.push('statusbar=no');
                    }
                    if(!params.toolbar === false) {
                        options.push('toolbar=no');
                    }
                    if(!params.titlebar === false) {
                        options.push('titlebar=no');
                    }

                    window.open(url, '_blank', options.join(', '));
                }
            }
        }

        $KU.log({api:'voltmx.application.openURL', exit:true});
    };


    var _openURLAsync = function $KAPP_openURLAsync(config) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils;

        $KU.log({api:'voltmx.application.openURLAsync', enter:true});

        if(config.isSameWindow === true) {
            return window.open(config.url, '_self');
        } else if(config.isSameWindow === false) {
            return window.open(config.url, '_blank');
        }
        window.open(config.url, '_blank');


        if($KU.is(config.callback, 'function')) {
            config.callback(constants.OPEN_URL_UNKNOWN);
        }

        $KU.log({api:'voltmx.application.openURLAsync', exit:true});
    };


    var _populateLaunchParams = function $KAPP_populateLaunchParams(launch) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils,
            $KG = $K.globals, route = $KU.deduceRoute();

        if(route.formId) {
            $KG.deeplinkParams.formID = route.formId;

            //JSON based deeplink parameters
            $KU.each(route.deeplinkParams, function(value, keey) {
                launch.params[keey] = value;
            });
        }

        launch.launchmode = $KG.launchmode;

        //QueryString based deeplink parameters
        $KU.each($KG.deeplinkParams, function(value, keey) {
            launch.params[keey] = value;
        });

        if($K.F.EIWP) {
            launch.launchparams = launch.params;
        }
    };


    var _prepareLoadingScreen = function() {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KD = $K.dom,
            $KG = $K.globals, image ='', label = '', body = document.body;

        $KG.appForms = $KD.find(body, '[kr="app_forms"]')[0];
        $KG.appDialogs = $KD.find(body, '[kr="app_dialogs"]')[0];
        $KG.appScrap = $KD.find(body, '[kr="app_scrap"]')[0];
        $KG.appBlocker = $KD.find(body, '[kr="app_blocker"]')[0];

        $KD.on($KG.appBlocker, 'blur', 'abblur', function(e) {
            var $K = voltmx.$kwebfw$, $KD = $K.dom, $KA = $K.app;

            if($KA.blocked === true && !$KD.hasAttr(e.target, 'hidden')) {
                $KD.preventDefault(e);
                $KD.focus(e.target);
            }
        });

        image = ('<img loading="lazy" onmousedown="return false;" src="'+$KU.getImageURL('loading.gif')+'" alt=""/>');
        label = '<label></label>';

        $KD.html($KG.appBlocker, (image+label));
    };


    var _registerForIdleTimeout = function $KAPP_registerForIdleTimeout(delay, callback) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget, $KA = $K.app;

        $KU.log({api:'voltmx.application.registerForIdleTimeout', enter:true});

        if($KU.is(delay, 'number') && delay > 0 && $KU.is(callback, 'function')) {
            $KA.idleTime = (delay * 60 * 1000);
            $KA.idleCallback = callback;
            $KW.registerForIdleTimeout();
        } else if($KA.idleTimeout) {
            clearTimeout($KA.idleTimeout);
            $KA.lastInteractionAt = $KA.idleTimeout = null;
        }

        $KU.log({api:'voltmx.application.registerForIdleTimeout', exit:true});
    };


    var _registerMaster = function $KAPP_registerMaster(config) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils;

        $KU.log({api:'voltmx.application.registerMaster', enter:true});

        _registerUserWidget(config);

        $KU.log({api:'voltmx.application.registerMaster', exit:true});
    };


    var _registerUserWidget = function $KAPP_registerUserWidget(config) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils,
            classname = '', name = '', namespace = '', n = 0,
            namspaceArr = null, userWidgetNamespace = window,
            nlen = 0, getNSObj = function(userNS1, userNS2) {
                if(!userNS1[userNS2]) {
                    userNS1[userNS2] = {};
                }

                return userNS1[userNS2];
            };

        $KU.log({api:'voltmx.application.registerUserWidget', enter:true});

        if(!config) return 100;
        if(typeof config !== 'object') return 101;

        classname = config.classname;
        name = config.name;
        namespace = config.namespace;

        if(classname === null || classname.length <= 0) return 102;
        if(name === null || name.length <= 0) return 102;

        if(namespace !== null && namespace !== '') {
            namspaceArr = namespace.split('.');
            nlen = namspaceArr.length;

            for(n=0; n<nlen; n++) {
                userWidgetNamespace = getNSObj(userWidgetNamespace, namspaceArr[n]);
            }
        }

        if(userWidgetNamespace[classname]) return 103;

        userWidgetNamespace[classname] = function(bconfig, lconfig, pspconfig) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils, model = null;

            if(!$KU.is(lconfig, 'object')) lconfig = {};
            if(!$KU.is(pspconfig, 'object')) pspconfig = {};

            if(bconfig.masterType === constants.MASTER_TYPE_USERWIDGET) {
                bconfig.isMaster = true;
                model = voltmx.$kwebfw$.ComponentWithContract(bconfig, lconfig, pspconfig, name);
            } else {
                model = voltmx.$kwebfw$.ComponentWithoutContract(bconfig, lconfig, pspconfig, name);
            }

            return model;
        };

        $KU.log({api:'voltmx.application.registerUserWidget', exit:true});

        return 0;
    };


    var _removeApplicationCallbacks = function $KAPP_removeApplicationCallbacks() {
        //
    };


    //TODO:: removeBMState
    var _removeBMState = function $KAPP_removeBMState(/*formId, keey*/) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils;

        $KU.log({api:'voltmx.application.removeBMState', enter:true});

        //

        $KU.log({api:'voltmx.application.removeBMState', exit:true});
    };


    //TODO:: removeGestureRecognizerForAllForms
    var _removeGestureRecognizerForAllForms = function $KAPP_removeGestureRecognizerForAllForms(uid) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, list = null, position = -1;

        $KU.log({api:'voltmx.application.removeGestureRecognizerForAllForms', enter:true});

        $KU.each($K.app.gesture, function(gesture) {
            list = gesture; position = -1;

            $KU.each(gesture, function(value, index) {
                if(value.id === uid) {
                    position = index;
                }
            });
        });

        if($KU.is(list, 'array') && position !== -1) {
            list.splice(position, 1);
        }

        $KU.log({api:'voltmx.application.removeGestureRecognizerForAllForms', exit:true});
    };


    var _removeQueryParamsByKey = function $KAPP_removeQueryParamsByKey(param) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils,
            baseURL, path, hashValue, searchstring,
            queryParams, finalParams, i, finalurl;

        $KU.log({api:'voltmx.application.removeQueryParamsByKey', enter:true});

        if(window.location.search.length > 0) {
            baseURL = window.location.href.split('?')[0];
            path = window.location.href.split('?')[1];
            hashValue = path.split('#')[1];
            searchstring = window.location.search.slice(1);
            queryParams = searchstring.split('&');
            finalParams = '';
            for(i = queryParams.length-1; i >= 0; i--) {
                if(queryParams[i].indexOf(param) !== -1) {
                    queryParams.splice(i, 1);
                }
            }

            finalParams = queryParams.join('&');
            if(hashValue) {
                if(queryParams.length === 0) {
                    finalurl = baseURL + '#' + hashValue;
                } else {
                    finalurl = baseURL + '?' + finalParams + '#' + hashValue;
                }
            } else {
                if(queryParams.length === 0) {
                    finalurl = baseURL;
                } else {
                    finalurl = baseURL + '?' + finalParams;
                }
            }
            history.replaceState(null, '', finalurl);
        }

        $KU.log({api:'voltmx.application.removeQueryParamsByKey', exit:true});
    };


    var _removeSeoDataReadyFlag = function $KAPP_removeSeoDataReadyFlag() {
        var $K = voltmx.$kwebfw$, $KU = $K.utils,
            $KD = $K.dom, body = $KD.body();

        $KU.log({api:'voltmx.application.removeSeoDataReadyFlag', enter:true});
        $KD.removeAttr(body, 'data-ready');
        $KU.log({api:'voltmx.application.removeSeoDataReadyFlag', exit:true});
    };


    var _requestPermission = function $KAPP_requestPermission(resourceId, callback/*, options*/) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, permission = null;

        $KU.log({api:'voltmx.application.requestPermission', enter:true});

        if($KU.is(callback, 'function')) {
            switch(resourceId) {
                case voltmx.os.RESOURCE_LOCATION:
                case voltmx.os.RESOURCE_CAMERA:
                case voltmx.os.RESOURCE_PHOTO_GALLERY:
                case voltmx.os.RESOURCE_CALENDAR:
                    permission = {status:voltmx.application.PERMISSION_GRANTED, canRequestPermission:false};
                    break;
                case voltmx.os.RESOURCE_CONTACTS:
                case voltmx.os.RESOURCE_EXTERNAL_STORAGE:
                default:
                    permission = {status:voltmx.application.RESOURCE_NOT_SUPPORTED, canRequestPermission:false};
            }
        }

        callback(permission);

        $KU.log({api:'voltmx.application.requestPermission', exit:true});
    };


    //TODO:: resetBMState
    var _resetBMState = function $KAPP_resetBMState() {
        var $K = voltmx.$kwebfw$, $KU = $K.utils;

        $KU.log({api:'voltmx.application.resetBMState', enter:true});

        //

        $KU.log({api:'voltmx.application.resetBMState', exit:true});
    };


    var _resetBodyHTML = function() {
        _appendTag({'id':'skip'}, 'z-index:2147483647 !important;', true);
        _appendTag({'kr':'app_forms'}, 'z-index:2147483647 !important;', false);
        _appendTag({'kr':'app_dialogs'}, 'z-index:2147483647 !important;', false);
        _appendTag({'kr':'app_scrap'}, 'z-index:2147483647 !important;', false);
        _appendTag({'kr':'app_blocker', 'aria-hidden': true}, 'z-index:2147483647 !important;', true);

    };

    var _kofInitTags = function() {
        var $KG = $K.globals, $KW = $K.widget, $KD = $K.dom, body = document.body;

        _appendTag({'kr':'app_dialogs'}, 'z-index:2147483647 !important;', false);
        _appendTag({'kr':'app_scrap'}, 'z-index:2147483647 !important;', false);
        _appendTag({'kr':'app_blocker', 'aria-hidden': true}, 'z-index:2147483647 !important;', true);

        $KG.appDialogs = $KD.find(body, '[kr="app_dialogs"]')[0];
        $KG.appScrap = $KD.find(body, '[kr="app_scrap"]')[0];
        $KG.appBlocker = $KD.find(body, '[kr="app_blocker"]')[0];

        $KW.registerEvents($KG.appDialogs);
    };

    var _appendTag = function(attrs, style, hidden) {
        var el = '', body = document.body, key = null;

        el = document.createElement('div');
        el.style = style;

        for(key in attrs) {
            el.setAttribute(key, attrs[key]);
        }

        if(hidden) {
            el.hidden = hidden;
        }

        body.appendChild(el);
    };


    var _setApplicationBehaviors = function $KAPP_setApplicationBehaviors(behaviors) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils;

        $KU.log({api:'voltmx.application.setApplicationBehaviors', enter:true});

        $KU.each(behaviors, function(value, keey) {
            if($KU.is(keey, 'string') && keey) {
                if($KU.is(value, 'undefined')) {
                    delete $K.behavior[keey];
                } else {
                    $K.behavior[keey] = value;
                }
            }
        });

        $KU.log({api:'voltmx.application.setApplicationBehaviors', exit:true});
    };

    var _setApplicationInitializationEvents = function $KAPP_setApplicationInitializationEvents(evt) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, launch = {params:{}}, home = null,
            $KAR = $K.automation.recorder, testresources = null,
            testAutomationScriptURL = null, voltmxAutomationPath = null,
            params = window.location.search, protocol = null;

        $KU.log({api:'voltmx.application.setApplicationInitializationEvents', enter:true});

        _populateLaunchParams(launch);

        if($KU.is(evt.preappinit, 'function')) {
            evt.preappinit(launch);
        }

        if($KU.is(evt.init, 'function')) {
            evt.init(launch);
        }

        /* What is this, why it is required before firing "postappinit" and after "appinit" ???
        $K.behavior.isMVC || false;

        launch.params.isRefresh = false;
        launch.params.isNewSPASession = (voltmx.appinit.isNewSession === 'true');

        if(window.location.hash) {
            var formObj = window[window.location.hash.substring(2)];
            if(formObj && !launch.params.isNewSPASession) {
                launch.params.isRefresh = true;
                launch.params.refreshForm = formObj;
            }
        }
        //*/
        //eslint-disable-next-line no-undef
        if(appConfig.testAutomation) {
            window._voltmx.automation = {}; // for IntegrationTests object to be available globally
            //eslint-disable-next-line no-undef
            testAutomationScriptURL = appConfig.testAutomation.scriptsURL;
            if(params) {
                _voltmx.automation.params = {};
                params = new URLSearchParams(params);
                protocol = params.get('protocol');
                testresources = params.get('testurl');
                params.forEach(function(value, key) {
                    _voltmx.automation.params[key] = value;
                });
                if(protocol && testresources) {
                    testAutomationScriptURL = protocol + '://' + testresources;
                }
            }

            if(testAutomationScriptURL && testAutomationScriptURL.length !== 0
            && testAutomationScriptURL.startsWith('http')) {
                voltmxAutomationPath = testAutomationScriptURL + 'Desktop';
                setTimeout(function() {
                    $KAR && $KAR.invokeJasmineAutomation(voltmxAutomationPath);
                }, 1000);
            } else {
                $KU.log('Invalid test automation configuration.');
            }
        }

        if($KU.is(evt.postappinit, 'function')) {
            home = evt.postappinit(launch);
        }

        if($KU.is(evt.appServiceAsync, 'function')) {
            evt.appServiceAsync(launch, function(launchParams) {
                if(!$KU.loadedFromOtherFramework()) {
                    _showForm(evt, home, launchParams);
                } else {
                    _kofInitTags();
                }
            });
        } else {
            if(!$KU.loadedFromOtherFramework()) {
                _showForm(evt, home, launch);
            } else {
                _kofInitTags();
            }
        }

        $KU.log({api:'voltmx.application.setApplicationInitializationEvents', exit:true});
    };

    var _setApplicationMode = function $KAPP_setApplicationMode(mode) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KA = $K.app,
            supportedModes = [
                constants.APPLICATION_MODE_NATIVE,
                constants.APPLICATION_MODE_HYBRID,
                constants.APPLICATION_MODE_WRAPPER
            ];

        $KU.log({api:'voltmx.application.setApplicationMode', enter:true});
        $KA.mode = (supportedModes.indexOf() === -1) ? constants.APPLICATION_MODE_NATIVE : mode;
        $KU.log({api:'voltmx.application.setApplicationMode', exit:true});
    };


    //TODO:: setBMState
    var _setBMState = function $KAPP_setBMState(/*formId, state*/) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils;

        $KU.log({api:'voltmx.application.setBMState', enter:true});

        //

        $KU.log({api:'voltmx.application.setBMState', exit:true});
    };


    var _showForm = function(evt, home, launch) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget,
            $KG = $K.globals, $KD = $K.dom, body = $KD.body(), form = null;

        if($KU.is(evt.deeplink, 'function')
        || $KU.is(evt.appservice, 'function')) {
            if(evt.appservice) {
                home = evt.appservice(launch);
            } else if(evt.deeplink) {
                home = evt.deeplink($KG.deeplinkParams);
            }
        }

        _resetBodyHTML();
        _prepareLoadingScreen();

        if(home) {
            if($KU.is(home, 'string')) {
                form = $KW.root(home);

                if(!form || form._voltmxControllerName) {
                    _voltmx.mvc.navigate(home);
                } else {
                    form.show();
                }
            } else {
                home.show();
            }
        } else if($KU.is(evt.showstartupform, 'function')) {
            evt.showstartupform(launch);
        }

        $KD.removeAttr(body, 'aria-busy');
    };


    //TODO:: setGestureRecognizerForAllForms
    var _setGestureRecognizerForAllForms = function $KAPP_setGestureRecognizerForAllForms() {
        var $K = voltmx.$kwebfw$, $KU = $K.utils;

        $KU.log({api:'voltmx.application.setGestureRecognizerForAllForms', enter:true});

        //

        $KU.log({api:'voltmx.application.setGestureRecognizerForAllForms', exit:true});
    };


    var _setSeoDataReadyFlag = function $KAPP_setSeoDataReadyFlag() {
        var $K = voltmx.$kwebfw$, $KU = $K.utils,
            $KD = $K.dom, body = $KD.body();

        $KU.log({api:'voltmx.application.setSeoDataReadyFlag', enter:true});
        $KD.setAttr(body, 'data-ready', 1);
        $KU.log({api:'voltmx.application.setSeoDataReadyFlag', exit:true});
    };


    var _setupWidgetDataRecording = function $KAPP_setupWidgetDataRecording() {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KA = $K.app;

        $KU.log({api:'voltmx.application.setupWidgetDataRecording', enter:true});
        $KA.behavior.recording = true;
        $KU.log({api:'voltmx.application.setupWidgetDataRecording', exit:true});
    };


    var _showLoadingScreen = function $KAPP_showLoadingScreen(skin, text, position, isBlocked, showProgressIndicator/*, properties*/) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KD = $K.dom,
            $KA = $K.app, $KG = $K.globals, image = null,
            label = null, supportedPositions = [
                constants.LOADING_SCREEN_POSITION_FULL_SCREEN,
                constants.LOADING_SCREEN_POSITION_ONLY_CENTER
            ];

        $KU.log({api:'voltmx.application.showLoadingScreen', enter:true});

        if(!$KU.is($KA.blocked, 'boolean')) {
            if(!$KU.is(skin, 'string')) skin = '';
            if(!$KU.is(text, 'string')) text = '';
            if(!$KU.is(isBlocked, 'boolean')) isBlocked = true;
            if(!$KU.is(showProgressIndicator, 'boolean')) {
                showProgressIndicator = true;
            }
            if(supportedPositions.indexOf(position) === -1) {
                position = constants.LOADING_SCREEN_POSITION_FULL_SCREEN;
            }

            $KA.blocked = isBlocked;
            image = $KD.first($KG.appBlocker);
            label = $KD.last($KG.appBlocker);

            $KG.appBlocker.className = ((skin) ? skin : '-voltmx-loading');
            $KD.setAttr(image, 'hidden', !showProgressIndicator);
            $KD.html(label, ''); $KD.text(label, text);
            $KD.setAttr(label, 'hidden', !text);

            if(!isBlocked) {
                if(position === constants.LOADING_SCREEN_POSITION_FULL_SCREEN) {
                    $KD.style($KG.appBlocker, {
                        pointerEvents: 'none'
                    });
                } else if(position === constants.LOADING_SCREEN_POSITION_ONLY_CENTER) {
                    $KD.style($KG.appBlocker, {
                        left: '50%',
                        top: '50%',
                        width: 'auto',
                        height: 'auto',
                        transform: 'translate(-50%, -50%)'
                    });
                }
            }

            $KD.setAttr($KG.appBlocker, 'hidden', false);
            _lastFocusedElement = $KD.active();
            $KD.setAttr($KG.appBlocker, 'tabindex', -1);
            $KD.focus($KG.appBlocker);
        }

        $KU.log({api:'voltmx.application.showLoadingScreen', exit:true});
    };


    var _unregisterForIdleTimeout = function $KAPP_unregisterForIdleTimeout() {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KA = $K.app;

        $KU.log({api:'voltmx.application.unregisterForIdleTimeout', enter:true});

        if($KA.idleTimeout) {
            $KA.idleTime = 0;
            $KA.idleCallback = null;
            clearTimeout($KA.idleTimeout);
            $KA.lastInteractionAt = $KA.idleTimeout = null;
        }

        $KU.log({api:'voltmx.application.unregisterForIdleTimeout', exit:true});
    };


    $K.defVoltmxProp(_ns, [
        {keey:'addApplicationCallbacks', value:_addApplicationCallbacks},
        {keey:'addBMState', value:_addBMState},
        {keey:'addGestureRecognizerForAllForms', value:_addGestureRecognizerForAllForms},
        {keey:'checkPermission', value:_checkPermission},
        {keey:'dismissLoadingScreen', value:_dismissLoadingScreen},
        //{keey:'destroyForm', value:_destroyForm}, //This is defined in voltmxmvc_sdk.js file
        {keey:'exit', value:_exit},
        {keey:'getApplicationBehavior', value:_getApplicationBehavior},
        {keey:'getApplicationMode', value:_getApplicationMode},
        {keey:'getBaseURL', value: _getBaseURL},
        {keey:'getBMState', value:_getBMState},
        {keey:'getBrowserProtocol', value:_getBrowserProtocol},
        {keey:'getCurrentBreakpoint', value:_getCurrentBreakpoint},
        {keey:'getCurrentForm', value:_getCurrentForm},
        {keey:'getPreviousForm', value:_getPreviousForm},
        {keey:'getWebAssetRelativeURL', value:_getWebAssetRelativeURL},
        {keey:'openMediaURL', value:_openMediaURL},
        {keey:'isImageTurnedOff', value:_isImageTurnedOff},
        {keey:'isPopupBlocked', value:_isPopupBlocked},
        {keey:'openURL', value:_openURL},
        {keey:'openURLAsync', value:_openURLAsync},
        {keey:'registerForIdleTimeout', value:_registerForIdleTimeout},
        {keey:'registerMaster', value:_registerMaster},
        {keey:'registerUserWidget', value:_registerUserWidget},
        {keey:'removeApplicationCallbacks', value:_removeApplicationCallbacks},
        {keey:'removeBMState', value:_removeBMState},
        {keey:'removeGestureRecognizerForAllForms', value:_removeGestureRecognizerForAllForms},
        {keey:'removeQueryParamsByKey', value:_removeQueryParamsByKey},
        {keey:'removeSeoDataReadyFlag', value:_removeSeoDataReadyFlag},
        {keey:'requestPermission', value:_requestPermission},
        {keey:'resetBMState', value:_resetBMState},
        {keey:'setApplicationBehaviors', value:_setApplicationBehaviors},
        {keey:'setApplicationInitializationEvents', value:_setApplicationInitializationEvents, writable:true},
        {keey:'setApplicationMode', value:_setApplicationMode},
        {keey:'setBMState', value:_setBMState},
        {keey:'setGestureRecognizerForAllForms', value:_setGestureRecognizerForAllForms},
        {keey:'setSeoDataReadyFlag', value:_setSeoDataReadyFlag},
        {keey:'setupWidgetDataRecording', value:_setupWidgetDataRecording},
        {keey:'showLoadingScreen', value:_showLoadingScreen},
        {keey:'unregisterForIdleTimeout', value:_unregisterForIdleTimeout}
    ]);

    return _ns;
}())});


/* FILE PATH :: 'lib/apis/voltmxconstants.js' */
Object.defineProperty(window, 'constants', {configurable:false, enumerable:false, writable:true, value:(function() {
    var _ns = {}, $K = voltmx.$kwebfw$;

    $K.defVoltmxProp(_ns, [
        {keey:'ALERT_TYPE_CONFIRMATION', value:'confirmation'},
        {keey:'ALERT_TYPE_ERROR', value:'error'},
        {keey:'ALERT_TYPE_INFO', value:'info'},
        {keey:'API_LEVEL', value:'APILevel'},
        {keey:'API_LEVEL_8200', value:8200},
        {keey:'API_LEVEL_8300', value:8300},
        {keey:'API_LEVEL_8400', value:8400},
        {keey:'API_LEVEL_9200', value:9200},
        {keey:'APPLICATION_MODE_HYBRID', value:'hybrid'},
        {keey:'APPLICATION_MODE_NATIVE', value:'native'},
        {keey:'APPLICATION_MODE_WRAPPER', value:'wrapper'},
        {keey:'BREAKPOINT_MAX_VALUE', value:Number.MAX_VALUE},
        {keey:'BROWSER_REQUEST_METHOD_GET', value:'get'},
        {keey:'BROWSER_REQUEST_METHOD_POST', value:'post'},
        {keey:'CALENDAR_DATE_FORMAT_DEFAULT', value:'dd/MM/yyyy'},
        {keey:'CALENDAR_ICON_ALIGN_AUTO', value:'auto'},
        {keey:'CALENDAR_ICON_ALIGN_LEFT', value:'left'},
        {keey:'CALENDAR_ICON_ALIGN_RIGHT', value:'right'},
        {keey:'CALENDAR_SELECTION_TYPE_MULTI_SELECT', value:'multiselect'},
        {keey:'CALENDAR_SELECTION_TYPE_RANGE_SELECT', value:'rangeselect'},
        {keey:'CALENDAR_SELECTION_TYPE_SINGLE_SELECT', value:'singleselect'},
        {keey:'CALENDAR_VIEW_TYPE_DEFAULT', value:'default'},
        {keey:'CALENDAR_VIEW_TYPE_GRID_ONSCREEN', value:'onscreen'},
        {keey:'CALENDAR_VIEW_TYPE_GRID_POPUP', value:'popup'},
        {keey:'CAMERA_CAPTURE_FAILED', value:'capturefailed'},
        {keey:'CAMERA_NOT_SUPPORTED', value:'notsupported'},
        {keey:'CAMERA_PERMISSION_DENIED', value:'permissiondenied'},
        {keey:'CAMERA_SOURCE_DEFAULT', value:'front'},
        {keey:'CAMERA_SOURCE_FRONT', value:'front'},
        {keey:'CAMERA_SOURCE_FRONT_UNAVAILABLE', value:'frontunavailable'},
        {keey:'CAMERA_SOURCE_REAR', value:'rear'},
        {keey:'CAMERA_SOURCE_REAR_UNAVAILABLE', value:'rearunavailable'},
        {keey:'CAMERA_VIDEO_RECORDING_FAILED', value:'recordingfailed'},
        {keey:'CHECKBOX_ITEM_ORIENTATION_HORIZONTAL', value:'horizontal'},
        {keey:'CHECKBOX_ITEM_ORIENTATION_VERTICAL', value:'vertical'},
        {keey:'CHECKBOX_VIEW_TYPE_CUSTOMVIEW', value:'customview'},
        {keey:'CHECKBOX_VIEW_TYPE_DEFAULTTVIEW', value:'defaultview'},
        {keey:'CHECKBOX_VIEW_TYPE_LISTVIEW', value:'listview'},
        {keey:'CHECKBOX_VIEW_TYPE_ONSCREENWHEEL', value:'onscreenwheel'},
        {keey:'CHECKBOX_VIEW_TYPE_TABLEVIEW', value:'tableview'},
        {keey:'CHECKBOX_VIEW_TYPE_TOGGLEVIEW', value:'toggleview'},
        {keey:'CONTENT_ALIGN_BOTTOM_CENTER', value:'bottomcenter'},
        {keey:'CONTENT_ALIGN_BOTTOM_LEFT', value:'bottomleft'},
        {keey:'CONTENT_ALIGN_BOTTOM_RIGHT', value:'bottomright'},
        {keey:'CONTENT_ALIGN_MIDDLE_LEFT', value:'middleleft'},
        {keey:'CONTENT_ALIGN_MIDDLE_RIGHT', value:'middleright'},
        {keey:'CONTENT_ALIGN_TOP_CENTER', value:'topcenter'},
        {keey:'CONTENT_ALIGN_TOP_LEFT', value:'topleft'},
        {keey:'CONTENT_ALIGN_TOP_RIGHT', value:'topright'},
        {keey:'CONTENT_ALIGN_CENTER', value:'middlecenter'},
        {keey:'DATAGRID_COLUMN_TYPE_IMAGE', value:'image'},
        {keey:'DATAGRID_COLUMN_TYPE_TEMPLATE', value:'template'},
        {keey:'DATAGRID_COLUMN_TYPE_TEXT', value:'text'},
        {keey:'DATAGRID_SCROLLBAR_NONE', value:'none'},
        {keey:'DATAGRID_SCROLLBAR_VERTICAL', value:'vertical'},
        {keey:'DEVICE_ORIENTATION_LANDSCAPE', value:'landscape'},
        {keey:'DEVICE_ORIENTATION_PORTRAIT', value:'portrait'},
        {keey:'DEVICE_OSNAME_ANDROID', value:'android'},
        {keey:'DEVICE_OSNAME_ANDROIDTABLET', value:'androidtablet'},
        {keey:'DEVICE_OSNAME_IPHONE', value:'iPhone'},
        {keey:'DEVICE_OSNAME_IPAD', value:'iPad'},
        {keey:'DEVICE_OSNAME_MACINTOSH', value:'Macintosh'},
        {keey:'DEVICE_OSNAME_WINDOWS', value:'windows'},
        {keey:'DEVICE_OSNAME_WINDOWSTABLET', value:'windowstablet'},
        {keey:'DEVICE_OSNAME_WINDOWPHONE', value:'windowsphone'},
        {keey:'DEVICE_OSNAME_LINUX', value:'Linux'},
        {keey:'FILE_UPLOAD_COMPLETE_STATE', value:'complete'},
        {keey:'FILE_UPLOAD_ERROR_STATE', value:'error'},
        {keey:'FILE_UPLOAD_PROGRESS_STATE', value:'progress'},
        {keey:'FILE_UPLOAD_START_STATE', value:'start'},
        {keey:'FORM_ADJUST_RESIZE', value:'resize'},
        {keey:'FORM_ADJUST_PAN', value:'pan'},
        {keey:'FORM_DEVICE_ORIENTATION_LANDSCAPE', value:'landscape'},
        {keey:'FORM_DEVICE_ORIENTATION_PORTRAIT', value:'portrait'},
        {keey:'FORM_DISPLAY_ORIENTATION_BOTH', value:'both'},
        {keey:'FORM_DISPLAY_ORIENTATION_LANDSCAPE', value:'landscape'},
        {keey:'FORM_DISPLAY_ORIENTATION_PORTRAIT', value:'portrait'},
        {keey:'FORM_FORWARD_NAVIGATION', value:'forward'},
        {keey:'FORM_TYPE_DYNAMIC', value:'dynamic'},
        {keey:'FORM_TYPE_NATIVE', value:'native'},
        {keey:'FORM_TYPE_STATIC', value:'static'},
        {keey:'GESTURE_TYPE_LONGPRESS', value:'longpress'},
        {keey:'GESTURE_TYPE_PAN', value:'pan'},
        {keey:'GESTURE_TYPE_PINCH', value:'pinch'},
        {keey:'GESTURE_TYPE_ROTATION', value:'rotation'},
        {keey:'GESTURE_TYPE_SWIPE', value:'swipe'},
        {keey:'GESTURE_TYPE_TAP', value:'tap'},
        {keey:'HTTP_INTEGRITY_CHECK_FAILED', value:2},
        {keey:'HTTP_INTEGRITY_CHECK_NOT_DONE', value:0},
        {keey:'HTTP_INTEGRITY_CHECK_SUCCESSFUL', value:1},
        {keey:'HTTP_METHOD_GET', value:'get'},
        {keey:'HTTP_METHOD_POST', value:'post'},
        {keey:'HTTP_RESPONSE_TYPE_ARRAYBUFFER', value:'arraybuffer'},
        {keey:'HTTP_RESPONSE_TYPE_BLOB', value:'blob'},
        {keey:'HTTP_RESPONSE_TYPE_DOCUMENT', value:'document'},
        {keey:'HTTP_RESPONSE_TYPE_JSON', value:'json'},
        {keey:'HTTP_RESPONSE_TYPE_RAWDATA', value:'image/png'},
        {keey:'HTTP_RESPONSE_TYPE_TEXT', value:'text'},
        {keey:'HTTP_READY_STATE_DONE', value:'done'},
        {keey:'HTTP_READY_STATE_HEADERS_RECEIVED', value:'headersreceived'},
        {keey:'HTTP_READY_STATE_LOADING', value:'loading'},
        {keey:'HTTP_READY_STATE_OPENED', value:'opened'},
        {keey:'HTTP_READY_STATE_UNSENT', value:'unsent'},
        {keey:'IMAGE_GALLERY_VIEW_TYPE_PAGEVIEW', value:'pageview'},
        {keey:'IMAGE_GLOSSY_EFFECT_DEFAULT', value:'default'},
        {keey:'IMAGE_GLOSSY_EFFECT_LINEAR', value:'linear'},
        {keey:'IMAGE_GLOSSY_EFFECT_RADIAL', value:'radial'},
        {keey:'IMAGE_SCALE_MODE_CROP', value:'crop'},
        {keey:'IMAGE_SCALE_MODE_FIT_TO_DIMENSIONS', value:'fittodimensions'},
        {keey:'IMAGE_SCALE_MODE_MAINTAIN_ASPECT_RATIO', value:'maintainaspectratio'},
        {keey:'LISTBOX_VIEW_TYPE_EDITVIEW', value:'editableview'},
        {keey:'LISTBOX_VIEW_TYPE_LISTVIEW', value:'listview'},
        {keey:'LISTBOX_VIEW_TYPE_ONSCREENWHEEL', value:'onscreenwheel'},
        {keey:'LISTBOX_VIEW_TYPE_TABLEVIEW', value:'tableview'},
        {keey:'LISTBOX_VIEW_TYPE_TOGGLEVIEW', value:'toggleview'},
        {keey:'LISTBOX_VIEW_TYPE_SPINNER', value:'spinner'},
        {keey:'LOADING_SCREEN_POSITION_FULL_SCREEN', value:'fullscreen'},
        {keey:'LOADING_SCREEN_POSITION_ONLY_CENTER', value:'center'},
        {keey:'MAP_PROVIDER_GOOGLE', value:'google'},
        {keey:'MAP_SOURCE_NATIVE', value:'native'},
        {keey:'MAP_SOURCE_NON_NATIVE', value:'non-native'},
        {keey:'MAP_SOURCE_STATIC', value:'static'},
        {keey:'MAP_VIEW_MODE_HYBRID', value:'hybrid'},
        {keey:'MAP_VIEW_MODE_POLYGON', value:'polygon'},
        {keey:'MAP_VIEW_MODE_NORMAL', value:'normal'},
        {keey:'MAP_VIEW_MODE_SATELLITE', value:'satellite'},
        {keey:'MAP_VIEW_MODE_TERRAIN', value:'terrain'},
        {keey:'MAP_HEIGHT_BY_FORM_REFERENCE', value:'formreference'}, // form height
        {keey:'MAP_HEIGHT_BY_PARENT_WIDTH', value:'parentwidth'}, // ref to parent width
        {keey:'MASTER_TYPE_DEFAULT', value:'withoutcontract'},
        {keey:'MASTER_TYPE_USERWIDGET', value:'withcontract'},
        {keey:'NETWORK_TYPE_3G', value:'3G'},
        {keey:'NETWORK_TYPE_ANY', value:'ANY'},
        {keey:'NETWORK_TYPE_ETHERNET', value:'ETHERNET'},
        {keey:'NETWORK_TYPE_WIFI', value:'WIFI'},
        {keey:'ONHOVER_MOUSE_ENTER', value:'enter'},
        {keey:'ONHOVER_MOUSE_LEAVE', value:'leave'},
        {keey:'ONHOVER_MOUSE_MOVE', value:'move'},
        {keey:'OPEN_URL_SUCCESS', value:'success'},
        {keey:'OPEN_URL_FAILURE', value:'failure'},
        {keey:'OPEN_URL_UNKNOWN', value:'unknown'},
        {keey:'PRINTSTUB', value:'@printlevel'},
        {keey:'RADIOGROUP_ITEM_ORIENTATION_HORIZONTAL', value:'horizontal'},
        {keey:'RADIOGROUP_ITEM_ORIENTATION_VERTICAL', value:'vertical'},
        {keey:'RADIOBUTTON_VIEW_TYPE_CUSTOMVIEW', value:'customview'},
        {keey:'RADIOBUTTON_VIEW_TYPE_DEFAULTTVIEW', value:'defaultview'},
        {keey:'SEGUI_DEFAULT_BEHAVIOR', value:'default'},
        {keey:'SEGUI_MULTI_SELECT_BEHAVIOR', value:'multiselect'},
        {keey:'SEGUI_SCROLL_POSITION_DEFAULT', value:'default'},
        {keey:'SEGUI_SCROLL_POSITION_RETAIN', value:'retain'},
        {keey:'SEGUI_SCROLL_POSITION_TOP', value:'top'},
        {keey:'SEGUI_SEARCH_CRITERIA_CONTAINS', value:'CONTAINS'},
        {keey:'SEGUI_SEARCH_CRITERIA_ENDSWITH', value:'ENDSWITH'},
        {keey:'SEGUI_SEARCH_CRITERIA_GREATER', value:'GREATER'},
        {keey:'SEGUI_SEARCH_CRITERIA_GREATER_EQUAL', value:'GREATER_EQUAL'},
        {keey:'SEGUI_SEARCH_CRITERIA_LESSER', value:'LESSER'},
        {keey:'SEGUI_SEARCH_CRITERIA_LESSER_EQUAL', value:'LESSER_EQUAL'},
        {keey:'SEGUI_SEARCH_CRITERIA_NOT_CONTAINS', value:'NOT_CONTAINS'},
        {keey:'SEGUI_SEARCH_CRITERIA_NOT_EQUAL', value:'NOT_EQUAL'},
        {keey:'SEGUI_SEARCH_CRITERIA_NOT_ENDSWITH', value:'NOT_ENDSWITH'},
        {keey:'SEGUI_SEARCH_CRITERIA_NOT_STARTSWITH', value:'NOT_STARTSWITH'},
        {keey:'SEGUI_SEARCH_CRITERIA_OPERATOR_AND', value:'AND'},
        {keey:'SEGUI_SEARCH_CRITERIA_OPERATOR_OR', value:'OR'},
        {keey:'SEGUI_SEARCH_CRITERIA_STARTSWITH', value:'STARTSWITH'},
        {keey:'SEGUI_SEARCH_CRITERIA_STRICT_EQUAL', value:'STRICT_EQUAL'},
        {keey:'SEGUI_SINGLE_SELECT_BEHAVIOR', value:'singleselect'},
        {keey:'SEGUI_VIEW_TYPE_PAGEVIEW', value:'pageview'},
        {keey:'SEGUI_VIEW_TYPE_TABLEVIEW', value:'tableview'},
        {keey:'SLIDER_HORIZONTAL_ORIENTATION', value:'horizontal'},
        {keey:'SLIDER_VERTICAL_ORIENTATION', value:'vertical'},
        {keey:'SLIDER_VIEW_TYPE_DEFAULT', value:'default'},
        {keey:'SLIDER_VIEW_TYPE_PROGRESS', value:'progress'},
        {keey:'TAB_HEADER_POSITION_BOTTOM', value:'bottom'},
        {keey:'TAB_HEADER_POSITION_LEFT', value:'left'},
        {keey:'TAB_HEADER_POSITION_RIGHT', value:'right'},
        {keey:'TAB_HEADER_POSITION_TOP', value:'top'},
        {keey:'TABPANE_COLLAPSIBLE_IMAGE_POSITION_LEFT', value:'left'},
        {keey:'TABPANE_COLLAPSIBLE_IMAGE_POSITION_RIGHT', value:'right'},
        {keey:'TABPANE_COLLAPSIBLE_TABNAME_ALIGNMENT_CENTER', value:'center'},
        {keey:'TABPANE_COLLAPSIBLE_TABNAME_ALIGNMENT_LEFT', value:'left'},
        {keey:'TABPANE_COLLAPSIBLE_TABNAME_ALIGNMENT_RIGHT', value:'right'},
        {keey:'TABPANE_VIEW_TYPE_COLLAPSIBLEVIEW', value:'collapsibleview'},
        {keey:'TABPANE_VIEW_TYPE_PAGEVIEW', value:'pageview'},
        {keey:'TABPANE_VIEW_TYPE_TABVIEW', value:'tabview'},
        {keey:'TEXTBOX_AUTO_CAPITALIZE_ALL', value:'characters'},
        {keey:'TEXTBOX_AUTO_CAPITALIZE_NONE', value:'none'},
        {keey:'TEXTBOX_AUTO_CAPITALIZE_SENTENCES', value:'sentences'},
        {keey:'TEXTBOX_AUTO_CAPITALIZE_WORDS', value:'words'},
        {keey:'TEXTBOX_CUSTOM_HEIGHT', value:'custom'},
        {keey:'TEXTBOX_DEFAULT_PLATFORM_HEIGHT', value:'default'},
        {keey:'TEXTBOX_FONT_METRICS_DRIVEN_HEIGHT', value:'fontmetrics'},
        {keey:'TEXTBOX_INPUT_MODE_ANY', value:'any'},
        {keey:'TEXTBOX_INPUT_MODE_NUMERIC', value:'numeric'},
        {keey:'TEXTBOX_INPUT_MODE_PASSWORD', value:'password'},
        {keey:'TEXTBOX_KEY_BOARD_STYLE_CHAT', value:'chat'},
        {keey:'TEXTBOX_KEY_BOARD_STYLE_DECIMAL', value:'decimal'},
        {keey:'TEXTBOX_KEY_BOARD_STYLE_DEFAULT', value:'text'},
        {keey:'TEXTBOX_KEY_BOARD_STYLE_EMAIL', value:'email'},
        {keey:'TEXTBOX_KEY_BOARD_STYLE_NONE', value:'none'},
        {keey:'TEXTBOX_KEY_BOARD_STYLE_NUMBER_PAD', value:'numeric'},
        {keey:'TEXTBOX_KEY_BOARD_STYLE_PHONE_PAD', value:'tel'},
        {keey:'TEXTBOX_KEY_BOARD_STYLE_SEARCH', value:'search'},
        {keey:'TEXTBOX_KEY_BOARD_STYLE_URL', value:'url'},
        {keey:'TEXTBOX_VIEW_TYPE_DEFAULT', value:'default'},
        {keey:'TEXTBOX_VIEW_TYPE_SEARCH_VIEW', value:'search'},
        {keey:'TEXTAREA_INPUT_MODE_ANY', value:'any'},
        {keey:'TEXTAREA_INPUT_MODE_NUMERIC', value:'numeric'},
        {keey:'TEXTAREA_KEY_BOARD_STYLE_CHAT', value:'chat'},
        {keey:'TEXTAREA_KEY_BOARD_STYLE_DECIMAL', value:'decimal'},
        {keey:'TEXTAREA_KEY_BOARD_STYLE_DEFAULT', value:'text'},
        {keey:'TEXTAREA_KEY_BOARD_STYLE_EMAIL', value:'email'},
        {keey:'TEXTAREA_KEY_BOARD_STYLE_NONE', value:'none'},
        {keey:'TEXTAREA_KEY_BOARD_STYLE_NUMBER_PAD', value:'numeric'},
        {keey:'TEXTAREA_KEY_BOARD_STYLE_PHONE_PAD', value:'tel'},
        {keey:'TEXTAREA_KEY_BOARD_STYLE_SEARCH', value:'search'},
        {keey:'TEXTAREA_KEY_BOARD_STYLE_URL', value:'url'},
        {keey:'TEXTAREA_AUTO_CAPITALIZE_ALL', value:'characters'},
        {keey:'TEXTAREA_AUTO_CAPITALIZE_NONE', value:'none'},
        {keey:'TEXTAREA_AUTO_CAPITALIZE_SENTENCES', value:'sentences'},
        {keey:'TEXTAREA_AUTO_CAPITALIZE_WORDS', value:'words'},
        {keey:'UPLOAD_MAX_WAIT_TIME', value:120000}, // 2 mins
        {keey:'WIDGET_ALIGN_BOTTOM_CENTER', value:'bottomcenter'},
        {keey:'WIDGET_ALIGN_BOTTOM_LEFT', value:'bottomleft'},
        {keey:'WIDGET_ALIGN_BOTTOM_RIGHT', value:'bottomright'},
        {keey:'WIDGET_ALIGN_CENTER', value:'middlecenter'},
        {keey:'WIDGET_ALIGN_MIDDLE_LEFT', value:'middleleft'},
        {keey:'WIDGET_ALIGN_MIDDLE_RIGHT', value:'middleright'},
        {keey:'WIDGET_ALIGN_TOP_CENTER', value:'topcenter'},
        {keey:'WIDGET_ALIGN_TOP_LEFT', value:'topleft'},
        {keey:'WIDGET_ALIGN_TOP_RIGHT', value:'topright'},
        {keey:'WIDGET_DIRECTION_LTR', value:'ltr'},
        {keey:'WIDGET_DIRECTION_RTL', value:'rtl'}
    ]);

    return _ns;
}())});

Object.defineProperty(voltmx, 'anim', {configurable:false, enumerable:false, writable:true, value:(function() {
    var _ns = {}, $K = voltmx.$kwebfw$;

    $K.defVoltmxProp(_ns, [
        {keey:'DIRECTION_ALTERNATE', value:'alternate'},
        {keey:'DIRECTION_ALTERNATE_REVERSE', value:'alternate-reverse'},
        {keey:'DIRECTION_NONE', value:'normal'},
        {keey:'DIRECTION_REVERSE', value:'reverse'},
        {keey:'EASE', value:'ease'},
        {keey:'EASE_IN', value:'ease-in'},
        {keey:'EASE_IN_OUT', value:'ease-in-out'},
        {keey:'EASE_OUT', value:'ease-out'},
        {keey:'FILL_MODE_BACKWARDS', value:'backwards'},
        {keey:'FILL_MODE_BOTH', value:'both'},
        {keey:'FILL_MODE_FORWARDS', value:'forwards'},
        {keey:'FILL_MODE_NONE', value:'none'},
        {keey:'LINEAR', value:'linear'}
    ]);

    return _ns;
}())});


Object.defineProperty(voltmx, 'calendar', {configurable:false, enumerable:false, writable:true, value:(function() {
    var _ns = {}, $K = voltmx.$kwebfw$;

    $K.defVoltmxProp(_ns, [
        {keey:'LEGACY', value:'legacy'},
        {keey:'MODERN', value:'modern'}
    ]);

    return _ns;
}())});

Object.defineProperty(voltmx, 'canvas', {configurable:false, enumerable:false, writable:true, value:(function() {
    var _ns = {}, $K = voltmx.$kwebfw$;

    $K.defVoltmxProp(_ns, [
        {keey:'SHAPE_TYPE_LINE', value:'line'},
        {keey:'LINE_STYLE_SOLID', value:'solidline'},
        {keey:'LINE_STYLE_DASHED', value:'dashedline'},
        {keey:'LINE_STYLE_DOTTED', value:'dottedline'}
    ]);

    return _ns;
}())});

Object.defineProperty(voltmx, 'collectionview', {configurable:false, enumerable:false, writable:true, value:(function() {
    var _ns = {}, $K = voltmx.$kwebfw$;

    $K.defVoltmxProp(_ns, [
        {keey:'LAYOUT_CUSTOM', value:'custom'},
        {keey:'LAYOUT_HORIZONTAL', value:'horizontal'},
        {keey:'LAYOUT_VERTICAL', value:'vertical'},
        {keey:'MULTI_SELECT', value:'multiselect'},
        {keey:'SCROLL_DIRECTION_BOTH', value:'both'},
        {keey:'SCROLL_DIRECTION_HORIZONTAL', value:'horizontal'},
        {keey:'SCROLL_DIRECTION_VERTICAL', value:'vertical'},
        {keey:'SINGLE_SELECT', value:'singleselect'}
    ]);

    return _ns;
}())});


Object.defineProperty(voltmx, 'flex', {configurable:false, enumerable:false, writable:true, value:(function() {
    var _ns = {}, $K = voltmx.$kwebfw$;

    $K.defVoltmxProp(_ns, [
        {keey:'AUTOGROW_HEIGHT', value:'height'},
        {keey:'AUTOGROW_NONE', value:'none'},
        {keey:'DEFAULT_UNIT', value:'%'},
        {keey:'DP', value:'dp'},
        {keey:'FLOW_HORIZONTAL', value:'hflex'},
        {keey:'FLOW_VERTICAL', value:'vflex'},
        {keey:'FREE_FORM', value:'fflex'},
        {keey:'PERCENTAGE', value:'%'},
        {keey:'PX', value:'px'},
        {keey:'RESPONSIVE_GRID', value:'rflex'},
        {keey:'SCROLL_BOTH', value:'both'},
        {keey:'SCROLL_HORIZONTAL', value:'horizontal'},
        {keey:'SCROLL_NONE', value:'none'},
        {keey:'SCROLL_VERTICAL', value:'vertical'},
        {keey:'USE_AVAILABLE_SPACE', value:'available'},
        {keey:'USE_PREFERRED_SIZE', value:''},
        {keey:'ZINDEX_AUTO', value:'auto'}
    ]);

    return _ns;
}())});


Object.defineProperty(voltmx, 'map', {configurable:false, enumerable:false, writable:true, value:(function() {
    var _ns = {}, $K = voltmx.$kwebfw$;

    $K.defVoltmxProp(_ns, [
        {keey:'PIN_IMG_ANCHOR_BOTTOM_CENTER', value:'bottomcenter'},
        {keey:'PIN_IMG_ANCHOR_BOTTOM_LEFT', value:'bottomleft'},
        {keey:'PIN_IMG_ANCHOR_BOTTOM_RIGHT', value:'bottomright'},
        {keey:'PIN_IMG_ANCHOR_CENTER', value:'middlecenter'},
        {keey:'PIN_IMG_ANCHOR_MIDDLE_LEFT', value:'middleleft'},
        {keey:'PIN_IMG_ANCHOR_MIDDLE_RIGHT', value:'middleright'},
        {keey:'PIN_IMG_ANCHOR_TOP_CENTER', value:'topcenter'},
        {keey:'PIN_IMG_ANCHOR_TOP_LEFT', value:'topleft'},
        {keey:'PIN_IMG_ANCHOR_TOP_RIGHT', value:'topright'},
        {keey:'MAP_PROVIDER_GOOGLE', value:'google'},
        {keey:'MAP_VIEW_MODE_NORMAL', value:'normal'},
        {keey:'MAP_VIEW_MODE_SATELLITE', value:'satellite'}
    ]);

    return _ns;
}())});


Object.defineProperty(voltmx, 'segment', {configurable:false, enumerable:false, writable:true, value:(function() {
    var _ns = {}, $K = voltmx.$kwebfw$;

    $K.defVoltmxProp(_ns, [
        {keey:'ADD', value:'add'},
        {keey:'INVISIBLE', value:'invisible'},
        {keey:'REMOVE', value:'remove'},
        {keey:'UPDATE', value:'update'},
        {keey:'VISIBLE', value:'visible'}
    ]);

    return _ns;
}())});


Object.defineProperty(voltmx, 'skin', {configurable:false, enumerable:false, writable:true, value:(function() {
    var _ns = {}, $K = voltmx.$kwebfw$;

    $K.defVoltmxProp(_ns, [
        {keey:'BACKGROUND_TYPE_IMAGE', value:'bgimage'},
        {keey:'BACKGROUND_TYPE_MULTI_STEP_GRADIENT', value:'bgmsgradient'},
        {keey:'BACKGROUND_TYPE_SINGLE_COLOR', value:'bgsinglecolor'},
        {keey:'BACKGROUND_TYPE_TWO_STEP_GRADIENT', value:'bgtwostepgradient'},
        {keey:'BORDER_TYPE_MULTI_STEP_GRADIENT', value:'bordermsgradient'},
        {keey:'BORDER_TYPE_SINGLE_COLOR', value:'bordersinglecolor'},
        {keey:'BORDER_STYLE_COMPLETE_ROUNDED_CORNER', value:'borderstylecompleteroundedcorner'},
        {keey:'BORDER_STYLE_CUSTOM', value:'borderstylecustom'},
        {keey:'BORDER_STYLE_PLAIN', value:'borderstyleplain'},
        {keey:'BORDER_STYLE_ROUNDED_CORNER', value:'borderstyleroundedcorner'},
        {keey:'FONT_STYLE_ITALIC', value:'italic'},
        {keey:'FONT_STYLE_NONE', value:'normal'},
        {keey:'FONT_STYLE_UNDERLINE', value:'underline'},
        {keey:'FONT_WEIGHT_BOLD', value:'bold'},
        {keey:'FONT_WEIGHT_NORMAL', value:'normal'},
        {keey:'MULTI_STEP_GRADIENT_TYPE_CUSTOM', value:'msgradientcustom'},
        {keey:'MULTI_STEP_GRADIENT_TYPE_TO_BOTTOM', value:'msgradientbottom'},
        {keey:'MULTI_STEP_GRADIENT_TYPE_TO_LEFT', value:'msgradientleft'},
        {keey:'MULTI_STEP_GRADIENT_TYPE_TO_RIGHT', value:'msgradientright'},
        {keey:'MULTI_STEP_GRADIENT_TYPE_TO_TOP', value:'msgradienttop'},
        {keey:'TWO_STEP_GRADIENT_STYLE_HORIZONTAL_GRADIENT', value:'hg'},
        {keey:'TWO_STEP_GRADIENT_STYLE_HORIZONTAL_SPLIT', value:'hs'},
        {keey:'TWO_STEP_GRADIENT_STYLE_VERTICAL_GRADIENT', value:'vg'},
        {keey:'TWO_STEP_GRADIENT_STYLE_VERTICAL_SPLIT', value:'vs'}
    ]);

    return _ns;
}())});


/* FILE PATH :: 'lib/apis/voltmxcrypto.js' */
/* global CryptoJS */
Object.defineProperty(voltmx, 'crypto', {configurable:false, enumerable:false, writable:false, value:(function() {
    var _ns = {}, $K = voltmx.$kwebfw$;


    var _createHash = function(algo, str, options) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, msg = '';

        $KU.log({api:'voltmx.crypto.createHash', enter:true});

        if(!$KU.is(str, 'string')) {
            return {
                errcode: 100,
                errmessage: 'invalid input parameters'
            };
        }

        try {
            if ($K.behavior.strictMode) {
                switch(algo.toLowerCase()) {
                    case 'sha256':
                        msg = CryptoJS.SHA256(str);
                        break;
                    case 'sha512':
                        msg = CryptoJS.SHA512(str);
                        break;
                    default:
                        msg = {
                            errcode: 101,
                            errmessage: 'unsupported algorithm'
                        };
                        break;
                    }
            }else{
                switch(algo.toLowerCase()) {
                    case 'md5':
                        msg = CryptoJS.MD5(str);
                        break;
                    case 'sha256':
                        msg = CryptoJS.SHA256(str);
                        break;
                    case 'sha1':
                        msg = CryptoJS.SHA1(str);
                        break;
                    case 'sha512':
                        msg = CryptoJS.SHA512(str);
                        break;
                    default:
                        msg = {
                            errcode: 101,
                            errmessage: 'unsupported algorithm'
                        };
                        break;
                    }
            }

            if(!$KU.is(msg, 'string')) {
                if($KU.is(options, 'object')) {
                    if(options.returnBase64String === 'true') {
                        msg = msg.toString(CryptoJS.enc.Base64);
                    } else {
                        msg = msg.toString(CryptoJS.enc.UTF8);
                    }
                } else {
                    msg = msg.toString(CryptoJS.enc.UTF8);
                }
            }

            $KU.log({api:'voltmx.crypto.createHash', exit:true});

            return msg;
        } catch(ex) {
            return {
                errcode: 102,
                errmessage: 'unknown  error'
            };
        }
    };

    var _createHashToUpperCase = function(algo, str) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils,
            hashValueToUpperCase = _createHash(algo, str);

        if($KU.is(hashValueToUpperCase, 'string')) {
            hashValueToUpperCase = hashValueToUpperCase.toUpperCase();
        }

        return hashValueToUpperCase;
    };

    var _createPBKDF2Key = function(algo, password, salt, iteration, klen) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, key, hashFun;

        $KU.log({api:'voltmx.crypto._createPBKDF2Key', enter:true});

        if(!$KU.is(password, 'string')) {
            return {
                errcode: 100,
                errmessage: 'invalid input parameters'
            };
        }

        try {
            if ($K.behavior.strictMode) {
                switch(algo.toLowerCase()) {
                    case 'sha256':
                        hashFun = CryptoJS.algo.SHA256;
                        break;
                    case 'sha512':
                        hashFun = CryptoJS.algo.SHA512;
                        break;
                    default:
                        break;
                    }
            }else{
                switch(algo.toLowerCase()) {
                    case 'md5':
                        hashFun = CryptoJS.algo.MD5;
                        break;
                    case 'sha256':
                        hashFun = CryptoJS.algo.SHA256;
                        break;
                    case 'sha1':
                        hashFun = CryptoJS.algo.SHA1;
                        break;
                    case 'sha512':
                        hashFun = CryptoJS.algo.SHA512;
                        break;
                    default:
                        break;
                }
            }

            if(hashFun) {
                klen = klen ? klen/32 : 256/32;
                key = CryptoJS.PBKDF2(password, salt, {keySize: klen, iterations: iteration, hasher: hashFun});
                return key.toString();
            }

            $KU.log({api:'voltmx.crypto.createPBKDF2Key', exit:true});

            return {
                errcode: 101,
                errmessage: 'unsupported  algo'
            };
        } catch(err) {
            return {
                errcode: 102,
                errmessage: 'unknown  error'
            };
        }
    };

    var _decrypt = function(algo, generatedkey, encryptedRawbytes, propertiesTable) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils,
            mode = CryptoJS.mode.CBC, msg = '',
            padding = CryptoJS.pad.Pkcs7;

        $KU.log({api:'voltmx.crypto.decrypt', enter:true});

        if(!$KU.is(algo, 'string') && encryptedRawbytes && generatedkey) {
            $KU.log({api:'voltmx.crypto.decrypt', exit:true});

            return {
                errcode: 100,
                errmessage: 'invalid input parameters'
            };
        }

        try{
            if(propertiesTable) {
                if(propertiesTable.mode) {
                    switch(propertiesTable.mode.toLowerCase()) {
                        case 'cfb':
                            mode = CryptoJS.mode.CFB;
                            break;
                        case 'ctr':
                            mode = CryptoJS.mode.CTR;
                            break;
                        case 'ofb':
                            mode = CryptoJS.mode.OFB;
                            break;
                        case 'ecb':
                            mode = CryptoJS.mode.ECB;
                            break;
                        default:
                            break;
                    }
                }

                if(propertiesTable.padding) {
                    switch(propertiesTable.padding.toLowerCase()) {
                        case 'iso97971':
                            padding = CryptoJS.pad.Iso97971;
                            break;
                        case 'iso10126':
                            padding = CryptoJS.pad.Iso10126;
                            break;
                        case 'zeropadding':
                            padding = CryptoJS.pad.ZeroPadding;
                            break;
                        case 'nopadding':
                            padding = CryptoJS.pad.NoPadding;
                            break;
                        default:
                            break;
                    }
                }
            }

            encryptedRawbytes = _parse(encryptedRawbytes);

            if(algo.toLowerCase() === 'aes') {
                msg = CryptoJS.AES.decrypt(encryptedRawbytes, generatedkey, {
                    mode: mode,
                    padding: padding
                });

                $KU.log({api:'voltmx.crypto.decrypt', exit:true});

                return msg.toString(CryptoJS.enc.Utf8);
            } else if(algo.toLowerCase() === 'tripledes') {
                msg = CryptoJS.TripleDES.decrypt(
                    encryptedRawbytes,
                    generatedkey, {
                        mode: mode,
                        padding: padding
                    }
                );

                $KU.log({api:'voltmx.crypto.decrypt', exit:true});

                return msg.toString(CryptoJS.enc.Utf8);
            }
            $KU.log({api:'voltmx.crypto.decrypt', exit:true});

            return {
                errcode: 101,
                errmessage: 'unsupported algorithm'
            };
        } catch(err) {
            return {
                errcode: 102,
                errmessage: 'unknown  error'
            };
        }
    };


    var _deleteKey = function(uid) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, store = $K.store;

        $KU.log({api:'voltmx.crypto.deleteKey', enter:true});
        store.remove('local', uid);
        $KU.log({api:'voltmx.crypto.deleteKey', exit:true});
    };


    var _encrypt = function(algo, generatedkey, str, propertiesTable) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, mode = CryptoJS.mode.CBC,
            encryptedObj = null, padding = CryptoJS.pad.Pkcs7;

        $KU.log({api:'voltmx.crypto.createHash', enter:true});

        if(!$KU.is(algo, 'string') && str && generatedkey) {
            $KU.log({api:'voltmx.crypto.encrypt', exit:true});

            return {
                errcode: 100,
                errmessage: 'invalid input parameters'
            };
        }

        try{
            if(propertiesTable) {
                if(propertiesTable.mode) {
                    switch(propertiesTable.mode.toLowerCase()) {
                        case 'cfb':
                            mode = CryptoJS.mode.CFB;
                            break;
                        case 'ctr':
                            mode = CryptoJS.mode.CTR;
                            break;
                        case 'ofb':
                            mode = CryptoJS.mode.OFB;
                            break;
                        case 'ecb':
                            mode = CryptoJS.mode.ECB;
                            break;
                        default:
                            break;
                    }
                }

                if(propertiesTable.padding) {
                    switch(propertiesTable.padding.toLowerCase()) {
                        case 'iso97971':
                            padding = CryptoJS.pad.Iso97971;
                            break;
                        case 'iso10126':
                            padding = CryptoJS.pad.Iso10126;
                            break;
                        case 'zeropadding':
                            padding = CryptoJS.pad.ZeroPadding;
                            break;
                        case 'nopadding':
                            padding = CryptoJS.pad.NoPadding;
                            break;
                        default:
                            break;
                    }
                }
            }

            if(algo.toLowerCase() === 'aes') {
                encryptedObj = CryptoJS.AES.encrypt(str, generatedkey, {
                    mode: mode,
                    padding: padding
                });

                $KU.log({api:'voltmx.crypto.encrypt', exit:true});

                return _stringify(encryptedObj);
            } else if(algo.toLowerCase() === 'tripledes') {
                encryptedObj = CryptoJS.TripleDES.encrypt(str, generatedkey, {
                    mode: mode,
                    padding: padding,
                    format: _jsonFormatter
                });

                $KU.log({api:'voltmx.crypto.encrypt', exit:true});

                return _stringify(encryptedObj);
            }
            $KU.log({api:'voltmx.crypto.encrypt', exit:true});

            return {
                errcode: 101,
                errmessage: 'unsupported algorithm'
            };
        } catch(ex) {
            return {
                errcode: 102,
                errmessage: 'unknown  error'
            };
        }
    };


    var _generateRandomNumber = function(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);

        return Math.floor(Math.random() * (max - min + 1)) + min;
    };


    var _generateRandomString = function() {
        var possibleString = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
            randomLength = _generateRandomNumber(8, 16), i = 0,
            possibleLength = possibleString.length, randomString = '';

        for(i=0; i< randomLength; i++) {
            randomString += possibleString.charAt(Math.floor(Math.random() * possibleLength));
        }

        return randomString.toUpperCase();
    };


    var _generateSecureRandom = function(config) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, salt = null;

        if(!$KU.is(config, 'object')) {
            config = {type:'base64', size:36};
        } else {
            if(['base64'].indexOf(config.type) === -1) {
                config.type = 'base64';
            }

            if(!$KU.is(config.size, 'integer') || config.size < 0) {
                config.size = 36;
            }
        }

        salt = CryptoJS.lib.WordArray.random(config.size);

        return (config.type === 'base64')
            ? salt.toString(CryptoJS.enc.Base64)
            : salt.toString(CryptoJS.enc.Hex);
    };


    var _jsonFormatter = function() {
        //Not available in SPA repo too. Ask Shankar about it.
    };


    var _newKey = function(algo, keystrength, algoObject) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils;

        $KU.log({api:'voltmx.crypto.newKey', enter:true});

        try{
            if(algo !== 'passphrase') {
                $KU.log({api:'voltmx.crypto.newKey', exit:true});

                return {
                    errcode: 100,
                    errmessage: 'invalid input parameters'
                };
            } else if(!algoObject.subalgo) {
                $KU.log({api:'voltmx.crypto.newKey', exit:true});

                return {
                    errcode: 105,
                    errmessage: 'subalgo parameter is missing'
                };
            }
            if(algoObject.subalgo.toLowerCase() === 'aes'
            || algoObject.subalgo.toLowerCase() === 'tripledes') {
                $KU.log({api:'voltmx.crypto.newKey', exit:true});

                return algoObject.passphrasetext[0];
            }
            $KU.log({api:'voltmx.crypto.newKey', exit:true});

            return {
                errcode: 101,
                errmessage: 'unsupported algorithm'
            };
        } catch(ex) {
            return {
                errcode: 102,
                errmessage: 'unknown error'
            };
        }
    };


    var _parse = function(str) {
        var json = JSON.parse(str), cipher = null;

        //Extract ciphertext from json object, and create cipher params object
        cipher = CryptoJS.lib.CipherParams.create({
            ciphertext: CryptoJS.enc.Base64.parse(json.ct)
        });

        // optionally extract iv and salt
        if(json.iv) {
            cipher.iv = CryptoJS.enc.Hex.parse(json.iv);
        }

        if(json.s) {
            cipher.salt = CryptoJS.enc.Hex.parse(json.s);
        }

        return cipher;
    };


    var _readKey = function(uid) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils,
            store = $K.store, dataobj = null;

        $KU.log({api:'voltmx.crypto.readKey', enter:true});

        if($KU.is(uid, 'undefined')) {
            $KU.log({api:'voltmx.crypto.readKey', enter:true});

            return {
                errcode: 100,
                errmsg: 'Invalid input parameters'
            };
        }

        try{
            if(localStorage) {
                dataobj = JSON.parse(store.fetch('local', uid) || 'null');

                if(dataobj === null) {
                    $KU.log({api:'voltmx.crypto.readKey', exit:true});

                    return {
                        errcode: 101,
                        errmsg: 'unable to find the key with the specified unique ID'
                    };
                }
                $KU.log({api:'voltmx.crypto.readKey', exit:true});

                return dataobj;
            }
            $KU.log({api:'voltmx.crypto.readKey', exit:true});

            return {
                errcode: 102,
                errmsg: 'unknown error, storage not supported'
            };
        } catch(err) {
            //
        }
    };


    var _saveKey = function(name, key) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, store = $K.store;

        $KU.log({api:'voltmx.crypto.saveKey', enter:true});

        if($KU.is(name, 'undefined') || $KU.is(key, 'undefined')) {
            $KU.log({api:'voltmx.crypto.saveKey', exit:true});

            return {
                errcode: 100,
                errmsg: 'Invalid input parameters'
            };
        }

        store.put('local', name, JSON.stringify(key));
        $KU.log({api:'voltmx.crypto.saveKey', exit:true});
        return name;
    };


    var _stringify = function(obj) {
        // create json object with ciphertext
        var jsonObj = {
            ct: obj.ciphertext.toString(CryptoJS.enc.Base64)
        };

        // optionally add iv and salt
        if(obj.iv) {
            jsonObj.iv = obj.iv.toString();
        }

        if(obj.salt) {
            jsonObj.s = obj.salt.toString();
        }

        // stringify json object
        return JSON.stringify(jsonObj);
    };


    $K.defVoltmxProp(_ns, [
        {keey:'createHash', value:_createHash},
        {keey:'createHashToUpperCase', value:_createHashToUpperCase},
        {keey:'createPBKDF2Key', value:_createPBKDF2Key},
        {keey:'decrypt', value:_decrypt},
        {keey:'deleteKey', value:_deleteKey},
        {keey:'encrypt', value:_encrypt},
        {keey:'generateRandomNumber', value:_generateRandomNumber},
        {keey:'generateRandomString', value:_generateRandomString},
        {keey:'generateSecureRandom', value:_generateSecureRandom},
        {keey:'newKey', value:_newKey},
        {keey:'readKey', value:_readKey},
        {keey:'saveKey', value:_saveKey}
    ]);


    return _ns;
}())});


/* FILE PATH :: 'lib/apis/voltmxdb.js' */
Object.defineProperty(voltmx, 'db', {configurable:false, enumerable:false, writable:false, value:(function() {
    var _ns = {}, $K = voltmx.$kwebfw$;


    var _changeVersion = function(db, oldver, newver, transcb, ecb, vcb) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils;

        $KU.log({api:'voltmx.db.changeVersion', enter:true});

        if(window.openDatabase) {
            db && db.changeVersion(oldver, newver, transcb, ecb, vcb);
            $KU.log({api:'voltmx.db.changeVersion', exit:true});
        } else {
            voltmx.print('Web Databases not supported.');
        }
    };


    var _executeSql = function(transid, sqlstmt, args, scb, ecb) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils;

        $KU.log({api:'voltmx.db.executeSql', enter:true});

        if(window.openDatabase) {
            if(transid) {
                if(args && args[0] === null) {
                    args = args.slice(1);
                }

                transid.executeSql(sqlstmt, args, scb, ecb);
            }

            $KU.log({api:'voltmx.db.executeSql', exit:true});
        } else {
            voltmx.print('Web Databases not supported.');
        }
    };


    var _openDatabase = function(name, version, dname, size, cb) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, db = this.db || null;

        $KU.log({api:'voltmx.db.openDatabase', enter:true});

        if(!$KU.is(cb, 'function')) {
            cb = function() {};
        }

        try{
            if(window.openDatabase) {
                if(!db) {
                    db = openDatabase(name, version, dname, size, cb);
                    this.db = db;
                }

                $KU.log({api:'voltmx.db.openDatabase', exit:true});
            } else {
                voltmx.print('Web Databases not supported.');
            }
        } catch(e) {
            if(e === 2) {
                // Version number mismatch.
                voltmx.print('opendatabase:Invalid database version.');
            } else {
                voltmx.print('opendatabase:Unknown error ' + e + '.');
            }

            return null;
        }

        return db;
    };


    var _readTransaction = function(db, transcb, ecb, vcb) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils;

        $KU.log({api:'voltmx.db.readTransaction', enter:true});

        if(window.openDatabase) {
            db && db.readTransaction(transcb, ecb, vcb);
            $KU.log({api:'voltmx.db.readTransaction', exit:true});
        } else {
            voltmx.print('Web Databases not supported.');
        }
    };


    var _sqlResultsetRowItem = function(transid, sqlresultset, index) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, item = null;

        $KU.log({api:'voltmx.db.sqlResultsetRowItem', enter:true});

        if(window.openDatabase) {
            if(index < sqlresultset.rows.length) {
                item = sqlresultset.rows.item(index);
            }
        } else {
            voltmx.print('Web Databases not supported.');
        }

        $KU.log({api:'voltmx.db.sqlResultsetRowItem', exit:true});
        return item;
    };


    var _transaction = function(db, transcb, ecb, vcb) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils;

        $KU.log({api:'voltmx.db.transaction', enter:true});

        if(window.openDatabase) {
            db && db.transaction(transcb, ecb, vcb);
            $KU.log({api:'voltmx.db.transaction', exit:true});
        } else {
            voltmx.print('Web Databases not supported.');
        }
    };


    $K.defVoltmxProp(_ns, [
        {keey:'changeVersion', value:_changeVersion},
        {keey:'executeSql', value:_executeSql},
        {keey:'openDatabase', value:_openDatabase},
        {keey:'readTransaction', value:_readTransaction},
        {keey:'sqlResultsetRowItem', value:_sqlResultsetRowItem},
        {keey:'transaction', value:_transaction}
    ]);


    return _ns;
}())});


/* FILE PATH :: 'lib/apis/voltmxds.js' */
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


/* FILE PATH :: 'lib/apis/voltmxi18n.js' */
Object.defineProperty(voltmx, 'i18n', {configurable:false, enumerable:false, writable:false, value:(function() {
    var _ns = {}, $K = voltmx.$kwebfw$;


    var _cleanupI18nCache = function $KI18N_cleanupI18nCache() {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KA = $K.app;

        $KU.log({api:'voltmx.i18n.cleanupI18nCache', enter:true});

        $KU.each($KA.supportedLocales, function(locale) {
            var $K = voltmx.$kwebfw$, $KA = $K.app, $KS = $K.store,
                $KL = $K.locale, key = ($KA.id+'_'+locale);

            $KS.remove('local', key);
            delete $KL[locale];
        });

        $KU.log({api:'voltmx.i18n.cleanupI18nCache', exit:true});
    };


    var _deleteResourceBundle = function $KI18N_deleteResourceBundle(locale) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KA = $K.app, $KL = $K.locale,
            $KS = $K.store, key = ($KA.id+'_'+locale), index = -1;

        $KU.log({api:'voltmx.i18n.deleteResourceBundle', enter:true});

        $KS.remove('local', key);
        delete $KL[locale];

        index = $KA.supportedLocales.indexOf(locale);
        if(index >= 0) $KA.supportedLocales.splice(index, 1);

        $KU.log({api:'voltmx.i18n.deleteResourceBundle', exit:true});
    };


    var _determineCurrentLocale = function $KI18N_determineCurrentLocale() {
        var $K = voltmx.$kwebfw$, $KA = $K.app, locales = $KA.supportedLocales,
            deviceLocale = _getBrowserLanguage(), current = $KA.defaultLocale;

        deviceLocale = deviceLocale.replace('-', '_');

        if(locales.indexOf(deviceLocale) >= 0) {
            current = deviceLocale;
        } else {
            deviceLocale = deviceLocale.split('_')[0];

            if(locales.indexOf(deviceLocale) >= 0) {
                current = deviceLocale;
            }
        }

        return current;
    };


    var _getBrowserLanguage = function $KI18N_getBrowserLanguage() {
        var $K = voltmx.$kwebfw$, $KG = $K.globals, $KA = $K.app,
            httpheaders = $KG.httpheaders, language = '';

        if(httpheaders && httpheaders['Accept-Language']) {
            language = httpheaders['Accept-Language'].split(',')[0];
        } else {
            language = navigator.language || navigator.userLanguage || $KA.defaultLocale;
        }

        return language;
    };


    var _getCurrentDeviceLocale = function $KI18N_getCurrentDeviceLocale() {
        var $K = voltmx.$kwebfw$, $KU = $K.utils,
            lang = _getBrowserLanguage(),
            list = lang.split('-');

        $KU.log({api:'voltmx.i18n.getCurrentDeviceLocale', enter:true});
        $KU.log({api:'voltmx.i18n.getCurrentDeviceLocale', exit:true});

        return {language:list[0], country:list[1], name:lang};
    };


    var _getCurrentLocale = function $KI18N_getCurrentLocale() {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KA = $K.app;

        $KU.log({api:'voltmx.i18n.getCurrentLocale', enter:true});
        $KU.log({api:'voltmx.i18n.getCurrentLocale', exit:true});

        return $KA.currentLocale;
    };


    var _getLocalizedString = function $KI18N_getLocalizedString(i18nKey) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KL = $K.locale,
            $KA = $K.app, i18nValue = $KL[$KA.currentLocale];

        $KU.log({api:'voltmx.i18n.getLocalizedString', enter:true});

        if(i18nValue) i18nValue = i18nValue[i18nKey];

        $KU.log({api:'voltmx.i18n.getLocalizedString', exit:true});

        return ($KU.is(i18nValue, 'undefined')) ? '' : i18nValue;
    };


    var _getResource = function $KI18N_getResource(locale, initializeFn, successcallback, errorcallback, info) {
        var $K = voltmx.$kwebfw$, $KG = $K.globals,
            $KU = $K.utils, filePath = '', timer = '';

        filePath = $K.constants.RESOURCES_PATH + '/'
                 + $K.constants.TRANSLATION_PATH + '/'
                 + locale + '.' + $K.constants.TRANSLATION_EXT
                 + '?ver=' + $KG.version;

        filePath = ($KG.platform + '/' + filePath);

        timer = setTimeout(function() {
            var $K = voltmx.$kwebfw$, $KU = $K.utils, $KA = $K.app;

            if(timer) {
                clearTimeout(timer);
                timer = '';
            }

            $KU.log('error', 'Timeout while loading resource bundle.');
            $KA.localeInitialized = true;
            initializeFn && initializeFn();
        }, 60000);

        $KU.loadScript(filePath, false,
            function() { //Success Callback
                var $K = voltmx.$kwebfw$, $KU = $K.utils, $KD = $K.dom,
                    $KA = $K.app, $KL = $K.locale, $KS = $K.store,
                    success = true, key = ($KA.id+'_'+locale);

                //Resource file exists so store it in the database
                //voltmx.print('i18n resource loaded successfully');
                if(timer) {
                    clearTimeout(timer);
                    timer = '';
                }

                $KA.localeInitialized = true;
                $KA.currentLocale = locale;
                $KD.setAttr($KD.find(document, 'html')[0],
                    'lang', locale.split('_')[0].toLowerCase());

                if(window.i18nObject) { //STARTS:: Saving to localstore
                    success = $KS.put('local', key,
                        ($KU.is(window.i18nObject, 'object')
                            ? JSON.stringify(window.i18nObject)
                            : window.i18nObject
                        )
                    );

                    if(!success) {
                        $KS.remove('local', ($KA.id+'_'+'i18nVersion'));
                    }

                    $KL[locale] = (
                        $KU.is(window.i18nObject, 'object')
                            ? window.i18nObject
                            : JSON.parse(window.i18nObject)
                    );

                    window.i18nObject = null;
                } //ENDS:: Saving to localstore

                initializeFn && initializeFn();

                if($KU.is(successcallback, 'function')) {
                    successcallback($KA.previousLocale, $KA.currentLocale, info);
                }
            },

            function() { //Error Callback
                var $K = voltmx.$kwebfw$, $KU = $K.utils, $KA = $K.app;

                $KU.log('error', 'An error has occurred while loading i18 locales');

                if(timer) {
                    clearTimeout(timer);
                    timer = '';
                }

                $KA.localeInitialized = true;
                initializeFn && initializeFn();

                if($KU.is(errorcallback, 'function')) {
                    errorcallback($KA.previousLocale, $KA.currentLocale, info);
                }
            }
        );
    };


    //Returns only current locale instead of all locales supported by the browser
    var _getSupportedLocales = function $KI18N_getSupportedLocales() {
        var $K = voltmx.$kwebfw$, $KU =$K.utils, lang = '';

        $KU.log({api:'voltmx.i18n.getSupportedLocales', enter:true});
        $KU.log('warn', 'getsupportedlocales: Not supported!');
        lang = _getBrowserLanguage();
        $KU.log({api:'voltmx.i18n.getSupportedLocales', exit:true});

        return [lang];
    };


    var _initializeI18n = function $KI18N_initializeI18n(locale, initializeFn, successcallback, errorcallback, info) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KD = $K.dom, $KA = $K.app,
            $KS = $K.store, $KL = $K.locale, key = ($KA.id+'_'+locale), value = '';

        value = $KS.fetch('local', key);

        if(!value) {
            _getResource(locale, initializeFn, successcallback, errorcallback, info);
        } else {
            value = JSON.parse(value);
            $KA.localeInitialized = true;
            $KA.currentLocale = locale;
            $KL[locale] = value;

            $KD.setAttr($KD.find(document, 'html')[0],
                'lang', locale.split('_')[0].toLowerCase());

            initializeFn && initializeFn();

            if($KU.is(successcallback, 'function')) {
                successcallback($KA.previousLocale, locale, info);
            }
        }
    };


    var _isResourceBundlePresent = function $KI18N_isResourceBundlePresent(locale) {
        var $K = voltmx.$kwebfw$, $KA = $K.app;

        return ($KA.supportedLocales.indexOf(locale) >= 0);
    };


    var _setCurrentLocaleAsync = function $KI18N_setCurrentLocaleAsync(localename, onsuccesscallback, onfailurecallback, info) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KA = $K.app, locales = $KA.supportedLocales;

        $KU.log({api:'voltmx.i18n.setCurrentLocaleAsync', enter:true});

        if($KU.is(localename, 'string') && localename
        && locales.indexOf(localename) >= 0) {
            if($KA.currentLocale !== localename) {
                $KA.previousLocale = $KA.currentLocale;
                _initializeI18n(localename, null, onsuccesscallback, onfailurecallback, info);
            } else if($KU.is(onsuccesscallback, 'function')) {
                onsuccesscallback($KA.previousLocale, localename, info);
            }
        } else {
            //LOG:: LOG WARNING
        }

        $KU.log({api:'voltmx.i18n.setCurrentLocaleAsync', exit:true});
    };


    var _setDefaultLocale = function $KI18N_setDefaultLocale(localename, onsuccesscallback, onerrorcallback, initializeFn) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KA = $K.app,
            $KS = $K.store, locales = $KA.supportedLocales,
            version = '', key = ($KA.id+'_i18nVersion');

        $KU.log({api:'voltmx.i18n.setDefaultLocale', enter:true});

        if(!localename) localename = '';
        if(!onsuccesscallback) onsuccesscallback = null;
        if(!onerrorcallback) onerrorcallback = null;
        if(!initializeFn) initializeFn = null;

        if((!$KA.currentLocale || $KA.defaultLocale !== localename)
        && $KU.is(localename, 'string') && localename
        && locales.indexOf(localename) >= 0) {
            if(initializeFn) {
                version = $KS.fetch('local', key) || '';

                if(version !== $KA.i18nVersion) {
                    $KS.put('local', key, $KA.i18nVersion);
                    _cleanupI18nCache();
                }
            }

            $KA.defaultLocale = localename;

            _initializeI18n(_determineCurrentLocale(), initializeFn, onsuccesscallback, onerrorcallback);
        } else {
            //LOG:: LOG WARNING
        }

        $KU.log({api:'voltmx.i18n.setDefaultLocale', exit:true});
    };


    var _setDefaultLocaleAsync = function $KI18N_setDefaultLocaleAsync(localename, onsuccesscallback, onfailurecallback, info) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KA = $K.app, $KS = $K.store,
            locales = $KA.supportedLocales, version = '', key = ($KA.id+'_i18nVersion');

        $KU.log({api:'voltmx.i18n.setDefaultLocaleAsync', enter:true});

        if((!$KA.currentLocale || $KA.defaultLocale !== localename)
        && $KU.is(localename, 'string') && localename
        && locales.indexOf(localename) >= 0) {
            version = $KS.fetch('local', key) || '';

            if(version !== $KA.i18nVersion) {
                $KS.put('local', key, $KA.i18nVersion);
                _cleanupI18nCache();
            }

            $KA.defaultLocale = localename;

            _initializeI18n(_determineCurrentLocale(), null, onsuccesscallback, onfailurecallback, info);
        } else {
            //LOG:: LOG WARNING
        }

        $KU.log({api:'voltmx.i18n.setDefaultLocaleAsync', exit:true});
    };


    var _setLocaleLayoutConfig = function $KI18N_setLocaleLayoutConfig(config) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KA = $K.app;

        $KU.log({api:'voltmx.i18n.setLocaleLayoutConfig', enter:true});

        if($KU.is(config, 'object')) {
            $KA.localeLayoutConfig = config;
        }

        $KU.log({api:'voltmx.i18n.setLocaleLayoutConfig', exit:true});
    };


    var _setResourceBundle = function $KI18N_setResourceBundle(inputtable, locale) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KA = $K.app,
            $KL = $K.locale, $KS = $K.store, key = ($KA.id+'_'+locale);

        $KU.log({api:'voltmx.i18n.setResourceBundle', enter:true});

        if($KU.is(inputtable, 'object') && $KU.is(locale, 'string') && locale) {
            $KS.put('local', key, JSON.stringify(inputtable)); // overrides existing key
            $KL[locale] = inputtable;

            if($KA.supportedLocales.indexOf(locale) === -1) {
                $KA.supportedLocales.push(locale);
            }
        }

        $KU.log({api:'voltmx.i18n.setResourceBundle', exit:true});
    };


    var _updateResourceBundle = function $KI18N_updateResourceBundle(inputtable, locale) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KA = $K.app, bundle = null,
            $KL = $K.locale, $KS = $K.store, key = ($KA.id+'_'+locale);

        $KU.log({api:'voltmx.i18n.updateResourceBundle', enter:true});

        if($KU.is(inputtable, 'object') && $KU.is(locale, 'string') && locale) {
            bundle = $KS.fetch('local', key);
            bundle = JSON.parse(bundle);

            $KU.each(inputtable, function(value, keey) {
                bundle[keey] = value;
            });

            $KS.put('local', key, JSON.stringify(bundle)); //Overrides existing key
            $KL[locale] = bundle;

            if($KA.supportedLocales.indexOf(locale) === -1) {
                $KA.supportedLocales.push(locale);
            }
        }

        $KU.log({api:'voltmx.i18n.updateResourceBundle', exit:true});
    };


    $K.defVoltmxProp(_ns, [
        {keey:'deleteResourceBundle', value:_deleteResourceBundle},
        {keey:'getCurrentDeviceLocale', value:_getCurrentDeviceLocale},
        {keey:'getCurrentLocale', value:_getCurrentLocale},
        {keey:'getLocalizedString', value:_getLocalizedString},
        {keey:'getSupportedLocales', value:_getSupportedLocales},
        {keey:'isResourceBundlePresent', value:_isResourceBundlePresent},
        {keey:'setCurrentLocaleAsync', value:_setCurrentLocaleAsync},
        {keey:'setDefaultLocale', value:_setDefaultLocale},
        {keey:'setDefaultLocaleAsync', value:_setDefaultLocaleAsync},
        {keey:'setLocaleLayoutConfig', value:_setLocaleLayoutConfig},
        {keey:'setResourceBundle', value:_setResourceBundle},
        {keey:'updateResourceBundle', value:_updateResourceBundle}
    ]);


    return _ns;
}())});


/* FILE PATH :: 'lib/apis/voltmxio.js' */
Object.defineProperty(voltmx, 'io', {configurable:false, enumerable:false, writable:false, value:(function() {
    var _ns = {}, $K = voltmx.$kwebfw$, _iframe = null,
        _form = null, _input = null, _scrap = null;


    var _ajaxBrowse = function(e, callback) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, files = [];

        $KU.each(this.files, function(file) {
            files.push(new File(file));
        });

        callback(e, files);
    };


    var _ajaxUpload = function(url, state, index, callback/*, config*/) {
        var xhr = new XMLHttpRequest(), formData = new FormData();

        formData.append(state.file.name, state.file.file);
        if(!url.match(new RegExp(/^(http|https):\/\/?/))) {
            state.status = constants.FILE_UPLOAD_ERROR_STATE;
            callback && callback(url, state);
            return;
        }

        xhr.open('POST', url, true);

        xhr.upload.onloadstart = function(/*e*/) {
            state.status = constants.FILE_UPLOAD_START_STATE;
            state.uploadBytes = 0;
            callback && callback(url, state);
        };
        xhr.upload.onprogress = function(e) {
            if(e.lengthComputable) {
                state.uploadBytes = e.loaded;
            }
            state.status = constants.FILE_UPLOAD_PROGRESS_STATE;
            callback && callback(url, state);
        };
        xhr.upload.onerror = function(/*e*/) {
            state.status = constants.FILE_UPLOAD_ERROR_STATE;
            state.uploadBytes = 0;
            callback && callback(url, state);
        };
        xhr.upload.onabort = function(/*e*/) {
            state.status = constants.FILE_UPLOAD_ERROR_STATE;
            callback && callback(url, state);
        };
        xhr.onload = function(/*e*/) {
            if(this.status === 200) {
                state.status = constants.FILE_UPLOAD_COMPLETE_STATE;
                state.uploadBytes = state.file.size;
                callback && callback(url, state);
            }
        };
        xhr.onerror = function(/*e*/) {
            state.status = constants.FILE_UPLOAD_ERROR_STATE;
            state.uploadBytes = 0;
            callback && callback(url, state);
        };
        xhr.onreadystatechange = function() {
            if(xhr.readyState !== 4)
                return;
            clearTimeout(setTimeout(function() {
                xhr.abort();
            }, constants.UPLOAD_MAX_WAIT_TIME));
            if(xhr.status !== 200) {
                state.status = constants.FILE_UPLOAD_ERROR_STATE;
                state.uploadBytes = 0;
                callback && callback(url, state);
            }
        };
        xhr.send(formData);
    };

    var _iframeBrowse = function(e, callback) {
        var path = e.value, files = [],
            name = path.substring(path.lastIndexOf('\\') + 1),
            parent = path.substring(0, path.lastIndexOf('\\')); // get path of parent directory

        parent = parent.substring(parent.lastIndexOf('\\') + 1); // name of parent directory

        files.push(new File({name:name, fullPath:path, parent:parent, file:e}));

        callback(e, files);
    };


    var _iframeUpload = function() {
        //
    };

    var File = function(file) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils;

        $KU.log({api:'voltmx.io.File', enter:true});

        if(_isAjaxUploadSupported()) {
            $KU.defineProperty(this, 'name', file.name);
            $KU.defineProperty(this, 'file', file); // original file object return via browser
        } else {
            $KU.each(file, function(value, key) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils;

                $KU.defineProperty(this, key, value);
            });
        }

        $KU.defineProperty(this, 'readable', true);
        $KU.defineProperty(this, 'writable', false);

        if(file.lastModifiedDate) {
            $KU.defineProperty(this, 'modificationTime', new Date(file.lastModifiedDate).toISOString());
        }

        if(file.size) {
            $KU.defineProperty(this, 'size', file.size);
        }

        $KU.log({api:'voltmx.io.File', exit:true});
    };


    var FileSystem_browse = function(config, callback) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KD = $K.dom, $KG = $K.globals;

        $KU.log({api:'voltmx.io.FileSystem.browse', enter:true});

        if(!_scrap) _scrap = $KG.appScrap;

        if($KU.is(config, 'object') && $KU.is(callback, 'function')) {
            _form = $KD.create('form');
            _input = $KD.create('input', {type:'file'});

            $KD.on(_input, 'click', 'upload', function(/*e*/) {
                var $K = voltmx.$kwebfw$, $KD = $K.dom;

                $KD.parent(this).reset();
            });

            $KD.add(_form, _input);

            if(_isAjaxUploadSupported()) {
                if(config.selectMultipleFiles === true) {
                    $KD.setAttr(_input, 'multiple', 'multiple');
                } else {
                    $KD.removeAttr(_input, 'multiple');
                }

                if($KU.is(config.filter, 'array')) {
                    $KD.setAttr(_input, 'accept', config.filter.join(','));
                } else {
                    $KD.removeAttr(_input, 'accept');
                }

                $KD.on(_input, 'change', 'upload', function(e) {
                    var $K = voltmx.$kwebfw$, $KD = $K.dom;

                    _ajaxBrowse.call(this, e, callback);
                    $KD.remove($KD.parent(e.target));
                });

                if(!$KD.contains(_scrap, _form)) {
                    $KD.add($KG.appScrap, _form);
                }
            } else {
                if(!_iframe) {
                    _iframe = $KD.create('iframe');
                    $KD.add(_iframe.document.body, _form);

                    $KD.add(_scrap, _iframe);
                }

                $KD.setAttr(_form, 'method', 'POST');
                $KD.setAttr(_form, 'enctype', 'multipart/form-data');

                $KD.on(_input, 'click', 'upload', function(e) {
                    _iframeBrowse.call(this, e, callback);
                });
            }

            $KD.fire(_input, 'click');
        }

        $KU.log({api:'voltmx.io.FileSystem.browse', exit:true});
    };


    var FileSystem_uploadFiles = function(url, files, callBack, config) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils;

        $KU.log({api:'voltmx.io.FileSystem.uploadFiles', enter:true});

        if($KU.is(url, 'string') && url
        && $KU.is(files, 'array') && files.length > 0) {
            $KU.each(files, function(file, index) {
                var state = {file:file, status:null, uploadBytes:null};

                if(_isAjaxUploadSupported()) {
                    _ajaxUpload(url, state, index, callBack, config);
                } else {
                    _iframeUpload();
                }
            });
        }

        $KU.log({api:'voltmx.io.FileSystem.uploadFiles', exit:true});
    };


    var _isAjaxUploadSupported = function() {
        if(window.File && window.FileList
        && new XMLHttpRequest().upload) {
            return true;
        } return false;
    };


    $K.defVoltmxProp(_ns, [
        {keey:'File', value:File},
        {keey:'FileSystem', value:{}, items:[
            {keey:'browse', value:FileSystem_browse},
            {keey:'uploadFiles', value:FileSystem_uploadFiles}
        ]}
    ]);


    return _ns;
}())});


/* FILE PATH :: 'lib/apis/voltmxlocation.js' */


Object.defineProperty(voltmx, 'location', {configurable:false, enumerable:false, writable:false, value:(function() {
    var _ns = {}, $K = voltmx.$kwebfw$;

    var _clearWatch = function(watchId) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils;

        $KU.log({api:'voltmx.location.clearWatch', enter:true});

        if($KU.browser('supports', 'geolocation')) {
            $KU.log({api:'voltmx.location.clearWatch', exit:true});
            navigator.geolocation.clearWatch(watchId);
        }
    };


    var _getCurrentPosition = function(successCallback, errorCallback, positionOptions) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils;

        $KU.log({api:'voltmx.location.getCurrentPosition', enter:true});

        if($KU.browser('supports', 'geolocation')) {
            $KU.log({api:'voltmx.location.getCurrentPosition', exit:true});
            navigator.geolocation.getCurrentPosition(successCallback, errorCallback, positionOptions);
        }
    };

    var _watchPosition = function(successCallback, errorCallback, positionOptions) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, watchId = null;

        $KU.log({api:'voltmx.location.watchPosition', enter:true});

        if($KU.browser('supports', 'geolocation')) {
            $KU.log({api:'voltmx.location.watchPosition', exit:true});
            watchId = navigator.geolocation.watchPosition(successCallback, errorCallback, positionOptions);
        }

        return watchId;
    };


    $K.defVoltmxProp(_ns, [
        {keey:'PERMISSION_DENIED', value:1},
        {keey:'POSITION_UNAVAILABLE', value:2},
        {keey:'TIMEOUT', value:3},
        {keey:'clearWatch', value:_clearWatch},
        {keey:'getCurrentPosition', value:_getCurrentPosition},
        {keey:'watchPosition', value:_watchPosition}
    ]);


    return _ns;
}())});


/* FILE PATH :: 'lib/apis/voltmxmodules.js' */
Object.defineProperty(voltmx, 'modules', {configurable:false, enumerable:false, writable:false, value:(function() {
    var _ns = {}, $K = voltmx.$kwebfw$;


    var _loadFunctionalModule = function(/* modulename */) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils;

        $KU.log({api:'voltmx.modules.loadFunctionalModule', enter:true});

        //TODO:: loadFunctionalModule API

        $KU.log({api:'voltmx.modules.loadFunctionalModule', exit:true});
    };


    var _loadFunctionalModuleAsync = function(/* modulename, successcallback, errorcallback */) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils;

        $KU.log({api:'voltmx.modules.loadFunctionalModuleAsync', enter:true});

        //TODO:: loadFunctionalModuleAsync API

        $KU.log({api:'voltmx.modules.loadFunctionalModuleAsync', exit:true});
    };


    $K.defVoltmxProp(_ns, [
        {keey:'loadFunctionalModule', value:_loadFunctionalModule},
        {keey:'loadFunctionalModuleAsync', value:_loadFunctionalModuleAsync}
    ]);


    return _ns;
}())});


/* FILE PATH :: 'lib/apis/voltmxnet.js' */
Object.defineProperty(voltmx, 'net', {configurable:false, enumerable:false, writable:false, value:(function() {
    var _ns = {}, $K = voltmx.$kwebfw$, $KU = $K.utils, _http = {},
        _integrityProperties = null;


    var _cancel = function(connection) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils;

        $KU.log({api:'voltmx.net.cancel', enter:true});

        if($KU.is(connection, 'object')
        && $KU.is(connection.abort, 'function')) {
            connection.userCancelled = true;
            connection.abort();
        }

        $KU.log({api:'voltmx.net.cancel', exit:true});
    };


    var _clearCookies = function(url, cookies) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils,
            allCookies = document && document.cookie.split(';'),
            pathBits = null, i = 0, ilen = 0, pathCurrent = '/',
            cookieName = '', j = 0, jlen = 0;

        $KU.log({api:'voltmx.net.clearCookies', enter:true});

        url = url || document.URL;

        if(window && url.indexOf(window.location.origin) !== -1) {
            cookies = cookies || allCookies;

            if(cookies) {
                pathBits = window.location.pathname.split('/');
                ilen = cookies.length;

                for(i=0; i<ilen; i++) {
                    cookieName = cookies[i].trim();

                    if(document.cookie.indexOf(cookieName) !== -1) {
                        jlen = pathBits.length;

                        for(j=0; j<jlen; j++) {
                            pathCurrent += ((pathCurrent.substr(-1) !== '/') ? '/' : '') + pathBits[j];

                            if(cookieName.indexOf('=') !== -1) {
                                document.cookie = cookieName + '; expires=Thu, 01-Jan-1970 00:00:01 GMT;path=' + pathCurrent + ';';
                            } else {
                                document.cookie = cookieName + '=; expires=Thu, 01-Jan-1970 00:00:01 GMT;path=' + pathCurrent + ';';
                            }

                            if(document.cookie.indexOf(cookieName) === -1) break;
                        }
                    }
                }
            }

            $KU.log({api:'voltmx.net.clearCookies', exit:true});
        } else {
            throw new $KU.error(1005, 'invalid input url', 'invalid input url');
        }
    };


    var _FormData = function(param) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, _formdata = {};

        $KU.log({api:'voltmx.net.FormData', enter:true});

        if($KU.is(param, 'object')
        && param.isMultiPart && window.FormData) {
            return new FormData();
        }
        this.append = function(key, value) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils, $KB = $K.behavior;

            if($KU.is(key, 'string') && key) {
                if(!$KB.doNotEncodeFormValue) {
                    value = encodeURIComponent(value);
                }

                if(!_formdata[key]) {
                    _formdata[key] = [value];
                } else {
                    _formdata[key].push(value);
                }
            } else {
                throw new Error('FormData append Error: key cannot be empty');
            }
        };

        this.toString = function() {
            var formdata = '', key = '';

            for(key in _formdata) {
                if(formdata === '') {
                    formdata = key + '=' + _formdata[key].join('&' + key + '=');
                } else {
                    formdata += '&' + key + '=' + _formdata[key].join('&' + key + '=');
                }
            }

            return formdata;
        };

        this.delete = function(key) {
            delete _formdata[key];
        };

        this.entries = function() {
            return _iterator(_formdata, 'entries');
        };

        this.get = function(key) {
            return _formdata[key][0];
        };

        this.getAll = function(key) {
            return _formdata[key];
        };

        this.has = function(key) {
            //eslint-disable-next-line no-prototype-builtins
            return _formdata.hasOwnProperty(key);
        };

        this.keys = function() {
            return _iterator(_formdata, 'keys');
        };

        this.set = function(key, value) {
            _formdata[key] = [value];
        };

        this.values = function() {
            return _iterator(_formdata, 'values');
        };

        $KU.log({api:'voltmx.net.FormData', exit:true});
    };


    var _getActiveNetworkType = function() {
        var $K = voltmx.$kwebfw$, $KU = $K.utils;

        $KU.log({api:'voltmx.net.getActiveNetworkType', enter:true});

        if($KU.is(navigator.onLine, 'undefined')) {
            $KU.log({api:'voltmx.net.getActiveNetworkType', exit:true});
            return constants.NETWORK_TYPE_ANY;
        }
        if(navigator.onLine) {
            $KU.log({api:'voltmx.net.getActiveNetworkType', exit:true});
            return constants.NETWORK_TYPE_ANY;
        }
        $KU.log({api:'voltmx.net.getActiveNetworkType', exit:true});
        return null;
    };


    var _getCookies = function(url) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, allCookies = null;

        $KU.log({api:'voltmx.net.getCookies', enter:true});

        if($KU.is(url, 'string') && url) {
            if(url.indexOf(window.location.origin) !== -1) {
                allCookies = document && document.cookie;

                if(allCookies && allCookies.length > 0) {
                    allCookies = allCookies.split(';');
                }
            }
        }

        $KU.log({api:'voltmx.net.getCookies', exit:true});

        return allCookies;
    };

    var _getResponseHeader = function(headerfield) {
        var xhr = this.xhr;

        if(xhr.getResponseHeader(headerfield)) {
            return xhr.getResponseHeader(headerfield);
        }
        return null;
    };

    var _getAllResponseHeaders = function() {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KB = $K.behavior,
            xhr = this.xhr, headers = null, arr, parts, header,
            value, line, count = 0, len = 0, map = {};

        if(xhr.getAllResponseHeaders()) {
            headers = xhr.getAllResponseHeaders();
        }

        if(!$KB.isResponseHeaderString && $KU.is(headers, 'string')) {
            // Convert the header string into an array
            // of individual headers
            arr = headers.trim().split(/[\r\n]+/);
            len = arr.length;

            for(count=0; count<len; count++) {
                line = arr[count];
                parts = line.split(': ');
                header = parts.shift();
                value = parts.join(': ');
                map[header] = value;
            }

            headers = map;
        }
        return headers;
    };


    var _HttpRequest = function() {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, id = $KU.uid();

        $KU.log({api:'voltmx.net.HttpRequest', enter:true});

        _http[id] = {
            disableIntegrityCheck: false,
            enableWithCredentials: false,
            integrityCheckRequired: false,
            integrityStatus: constants.HTTP_INTEGRITY_CHECK_NOT_DONE,
            isMultiPartOrBinary: false,
            onReadyStateChange: function() {},
            randomString: null,
            response: '',
            responseType: '',
            status: null,
            statusText: null,
            timeout: 0,
            url: null,
            xhr: new XMLHttpRequest()

        };

        _http[id].xhr.onreadystatechange = function() {
            var $K = voltmx.$kwebfw$, $KW = $K.widget, $KA = $K.app,
                http = _http[id], xhr = http.xhr, cf = null;

            http.status = xhr.status;
            http.readyState = xhr.readyState;

            switch(xhr.readyState) {
                case 0: // UNINITIALIZED
                case 1: // LOADING
                case 2: // LOADED
                case 3: // INTERACTIVE
                    http.readyState = xhr.readyState;
                    http.statusText = (xhr.readyState === 0)
                        ? 'Request Uninitialised'
                        : (xhr.readyState === 1)
                            ? 'Request Loading'
                            : (xhr.readyState === 2)
                                ? 'Request Loaded'
                                : (xhr.readyState === 3)
                                    ? 'Request Interactive' : '';
                    http.onReadyStateChange({
                        enableWithCredentials: http.enableWithCredentials,
                        integrityStatus: http.integrityStatus,
                        readyState: http.readyState,
                        response: http.response,
                        responseType: http.responseType,
                        status: http.status,
                        statusText: http.statusText,
                        timeout: http.timeout
                    });
                    break;

                case 4: // COMPLETED
                    http.readyState = xhr.readyState;
                    http.statusText = 'Request Completed';

                    if(xhr.responseType === '' || xhr.responseType === 'text') {
                        http.response = xhr.responseText;
                    } else {
                        http.response = xhr.response;
                    }

                    if(http.integrityCheckRequired) {
                        _integrity.generateResponseCheckSumAndCheckIntegrity.call(http, http.response);
                    }

                    if(xhr.status === 200) {
                        http.statusText += ': OK';

                        if(http.timeout) {
                            clearTimeout(http.timeout);
                        }
                    }

                    if(xhr.status === 400) {
                        http.statusText += ': Error';

                        if(http.timeout) {
                            clearTimeout(http.timeout);
                        }
                    }

                    http.onReadyStateChange({
                        enableWithCredentials: http.enableWithCredentials,
                        integrityStatus: http.integrityStatus,
                        readyState: http.readyState,
                        response: http.response,
                        responseType: http.responseType,
                        status: http.status,
                        statusText: http.statusText,
                        timeout: http.timeout
                    }); //MADPSPA-425: SDK expecting result obj in callback handler

                    cf = $KW.model($KA.currentFormUID);
                    cf && cf.forceLayout();

                    xhr = http = null; //For GC
                    delete _http[id];
                    break;

                default:
                    xhr = http = null; //For GC
                    delete _http[id];
                    //$KU.logErrorMessage('Unknown Error: XMLHttpRequest Error');
            }
        };

        $KU.defineProperty(this, 'id', id);

        $KU.defineGetter(this, 'disableIntegrityCheck', function() {
            return _http[this.id].disableIntegrityCheck;
        });
        $KU.defineSetter(this, 'disableIntegrityCheck', function(value) {
            if(typeof value === 'boolean') {
                _http[this.id].disableIntegrityCheck = value;
            }
        });

        $KU.defineGetter(this, 'enableWithCredentials', function() {
            return _http[this.id].enableWithCredentials;
        });
        $KU.defineSetter(this, 'enableWithCredentials', function(value) {
            if(typeof value === 'boolean') {
                _http[this.id].enableWithCredentials = value;
            }
        });

        $KU.defineGetter(this, 'integrityStatus', function() {
            return _http[this.id].integrityStatus;
        });
        //eslint-disable-next-line no-unused-vars
        $KU.defineSetter(this, 'integrityStatus', function(value) {
            //Readonly:: Throw error
        });

        $KU.defineGetter(this, 'onReadyStateChange', function() {
            return _http[this.id].onReadyStateChange;
        });
        $KU.defineSetter(this, 'onReadyStateChange', function(value) {
            if(typeof value === 'function') {
                _http[this.id].onReadyStateChange = value;
            }
        });

        $KU.defineGetter(this, 'readyState', function() {
            return _http[this.id].readyState;
        });
        //eslint-disable-next-line no-unused-vars
        $KU.defineSetter(this, 'readyState', function(value) {
            //Readonly:: Throw error
        });

        $KU.defineGetter(this, 'response', function() {
            return _http[this.id].response;
        });
        //eslint-disable-next-line no-unused-vars
        $KU.defineSetter(this, 'response', function(value) {
            //Readonly:: Throw error
        });

        $KU.defineGetter(this, 'responseType', function() {
            return _http[this.id].responseType;
        });
        $KU.defineSetter(this, 'responseType', function(value) {
            _http[this.id].responseType = value;
        });

        $KU.defineGetter(this, 'status', function() {
            return _http[this.id].status;
        });
        //eslint-disable-next-line no-unused-vars
        $KU.defineSetter(this, 'status', function(value) {
            //Readonly:: Throw error
        });

        $KU.defineGetter(this, 'statusText', function() {
            return _http[this.id].statusText;
        });
        //eslint-disable-next-line no-unused-vars
        $KU.defineSetter(this, 'statusText', function(value) {
            //Readonly:: Throw error
        });

        $KU.defineGetter(this, 'timeout', function() {
            return _http[this.id].timeout;
        });
        $KU.defineSetter(this, 'timeout', function(value) {
            if(typeof value === 'number' && !isNaN(value)) {
                _http[this.id].timeout = value;
            }
        });

        $KU.log({api:'voltmx.net.HttpRequest', exit:true});
    };

    $KU.defineProperty(_HttpRequest.prototype, 'abort', function() {
        var $K = voltmx.$kwebfw$, $KU = $K.utils,
            http = _http[this.id], xhr = http.xhr;

        $KU.log({api:'voltmx.net.HttpRequest.abort', enter:true});

        if(http.timeout) {
            clearTimeout(http.timeout);
        }

        xhr.abort();
        delete _http[this.id];

        $KU.log({api:'voltmx.net.HttpRequest.abort', exit:true});
    });

    $KU.defineProperty(_HttpRequest.prototype, 'getAllResponseHeaders', function() {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, http = _http[this.id], headers = null;

        $KU.log({api:'voltmx.net.HttpRequest.getAllResponseHeaders', enter:true});

        headers = _getAllResponseHeaders.call(http);

        $KU.log({api:'voltmx.net.HttpRequest.getAllResponseHeaders', exit:true});

        return headers;
    });

    $KU.defineProperty(_HttpRequest.prototype, 'getResponseHeader', function(headerfield) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, http = _http[this.id], header = null;

        $KU.log({api:'voltmx.net.HttpRequest.getResponseHeader', enter:true});

        header = _getResponseHeader.call(http, headerfield);

        $KU.log({api:'voltmx.net.HttpRequest.getResponseHeader', exit:true});

        return header;
    });

    $KU.defineProperty(_HttpRequest.prototype, 'open', function(method, url, async, username, password) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils,
            http = _http[this.id], xhr = http.xhr;

        $KU.log({api:'voltmx.net.HttpRequest.open', enter:true});

        if($KU.is(method, 'string')) {
            method = method.toUpperCase();
        }

        if($KU.is(url, 'string') && url) {
            http.url = url;
            http.open = true;
            http.method = method;
            async = ($KU.is(async, 'boolean')) ? async : true;

            xhr.open(method, url, async, username, password);
        }

        $KU.log({api:'voltmx.net.HttpRequest.open', exit:true});
    });

    $KU.defineProperty(_HttpRequest.prototype, 'send', function(data) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils,
            http = _http[this.id], xhr = http.xhr, self = null;

        $KU.log({api:'voltmx.net.HttpRequest.send', enter:true});

        if(data instanceof voltmx.net.FormData) {
            //Calling toString() if it is Voltmx.net.FormData
            //otherwise send the data directly to send method.
            data = data.toString();
        } else if(!data) {
            data = '';
        } else if((window.FormData !== undefined) && data instanceof window.FormData) {
            http.isMultiPartOrBinary = true;
        }

        if(this.enableWithCredentials) {
            xhr.withCredentials = true;
        }

        xhr.count++;
        xhr.timeout = !!this.timeout && this.timeout;

        if(xhr.timeout) {
            self = this;

            http.timeout = setTimeout(function() {
                self.abort();
                self.readyState = xhr.readyState;
                self.status = 0;
                self.statusText = 'Request timed out';
                self.response = '';

                self.onReadyStateChange();
            }, this.timeout);
        }

        if(this.responseType) {
            xhr.responseType = this.responseType;
        }


        http.integrityCheckRequired = _integrity.isIntegrityCheckRequired(http.url, http.disableIntegrityCheck);

        if(http.integrityCheckRequired) {
            _integrity.generateRequestCheckSumAndSetRequestHeader.call(http, data);
        }
        xhr.send(data);

        $KU.log({api:'voltmx.net.HttpRequest.send', exit:true});
    });

    $KU.defineProperty(_HttpRequest.prototype, 'setRequestHeader', function(header, value) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils,
            http = _http[this.id],
            binaryFormats = ['application/octet-stream', 'multipart/form-data'];

        $KU.log({api:'voltmx.net.HttpRequest.setRequestHeader', enter:true});

        if(header && header.toLowerCase() === 'content-type'
        && value && binaryFormats.indexOf(value.toLowerCase()) !== -1) {
            http.isMultiPartOrBinary = true;
        }

        _setRequestHeader.call(http, header, value);

        $KU.log({api:'voltmx.net.HttpRequest.setRequestHeader', exit:true});
    });


    //Dummy implementation
    //eslint-disable-next-line no-unused-vars
    var _invokeService = function(url, inputParamTable, isblocking) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils;

        $KU.log({api:'voltmx.net.invokeService', enter:true});
        $KU.log({api:'voltmx.net.invokeService', exit:true});
    };


    //Dummy implementation
    //eslint-disable-next-line no-unused-vars
    var _invokeServiceAsync = function(url, inputParamTable, callback, info) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils;

        $KU.log({api:'voltmx.net.invokeServiceAsync', enter:true});
        $KU.log({api:'voltmx.net.invokeServiceAsync', exit:true});
    };

    var _integrity = {

        //This function will be called in the scope of http instance
        generateRequestCheckSum: function Integrity$generateRequestCheckSum(data, passThroughOrFileMultipart) {
            var requestCheckSum = null, toHash = null, requestBodyHash = 'EMPTY_BODY';

            if(passThroughOrFileMultipart !== null) {
                requestBodyHash = passThroughOrFileMultipart;
            } else if(data) {
                requestBodyHash = voltmx.crypto.createHashToUpperCase(_integrityProperties.algo, data);
            }

            toHash = 'Request:' + _integrityProperties.salt + ':' + this.randomString + ':' + requestBodyHash;
            requestCheckSum = voltmx.crypto.createHashToUpperCase(_integrityProperties.algo, toHash);
            return requestCheckSum;
        },

        //This function will be called in the scope of http instance
        generateResponseCheckSum: function Integrity$generateResponseCheckSum(data, passThroughOrFileMultipart) {
            var responseCheckSum = null, toHash = null, responseBodyHash = 'EMPTY_BODY';

            if(passThroughOrFileMultipart !== null) {
                responseBodyHash = passThroughOrFileMultipart;
            } else if(data) {
                responseBodyHash = voltmx.crypto.createHashToUpperCase(_integrityProperties.algo, data);
            }
            toHash = ('Response:' + _integrityProperties.salt + ':' + this.randomString + ':' + responseBodyHash);
            responseCheckSum = voltmx.crypto.createHashToUpperCase(_integrityProperties.algo, toHash);

            return responseCheckSum;
        },

        //This function will be called in the scope of http instance
        generateRequestCheckSumAndSetRequestHeader: function Integrity$generateRequestCheckSumAndSetRequestHeader(data) {
            var createCheckSumOnReq = null, requestChecksum = null, headerValue = null;

            this.randomString = voltmx.crypto.generateRandomString();

            if(this.isMultiPartOrBinary) {
                createCheckSumOnReq = this.randomString;
            }

            requestChecksum = _integrity.generateRequestCheckSum.call(this, data, createCheckSumOnReq);
            headerValue = (this.randomString + ';' + requestChecksum);

            _setRequestHeader.call(this, _integrityProperties.headerName, headerValue);
        },

        //This function will be called in the scope of http instance
        generateResponseCheckSumAndCheckIntegrity: function Integrity$generateResponseCheckSumAndCheckIntegrity(data) {
            var responseChecksum = null, responseHeaders = null, checkSum =null,
                passthroughHeaderVal = null, createCheckSumOnResp = null,
                responseContentTypes = ['application/text', 'application/json', 'application/xml',
                    'text/xml', 'text/html', 'application/rss+xml', 'text/plain'];

            var getHeaderValue = function(http, headers, headerName) {
                var headerVal = '';
                //eslint-disable-next-line no-prototype-builtins
                if(headerName && (headers.hasOwnProperty(headerName) || headers.hasOwnProperty(headerName.toLowerCase()))) {
                    headerVal = _getResponseHeader.call(http, headerName);
                }
                return headerVal;
            };

            if(_integrityProperties.validateResp) {
                responseHeaders = _getAllResponseHeaders.call(this);
                passthroughHeaderVal = getHeaderValue(this, responseHeaders, _integrityProperties.passthroughHeaderName);
                if(passthroughHeaderVal.trim().toLowerCase() === 'true') {
                    createCheckSumOnResp = this.randomString;
                } else if(responseContentTypes.indexOf(_getResponseHeader.call(this, 'Content-Type').split(';')[0]) === -1) {
                    createCheckSumOnResp = this.randomString;
                }
                responseChecksum = _integrity.generateResponseCheckSum.call(this, data, createCheckSumOnResp);
                checkSum = getHeaderValue(this, responseHeaders, _integrityProperties.headerName);
                _integrity.setIntegrityStatus.call(this, responseChecksum, checkSum);
            }
        },


        isIntegrityCheckRequired: function Integrity$isIntegrityCheckRequired(url, userDisabledIntegrityCheck) {
            var isIntegrityRequired = false, currHost = null, hyperLink = null;

            if(_integrityProperties && !userDisabledIntegrityCheck) {
                if(_integrityProperties.hostNamesList) {
                    if(typeof document !== 'undefined') {
                        hyperLink = document.createElement('a');
                        hyperLink.href = url;
                        currHost = hyperLink.host;
                    } else {
                        currHost = url.replace('http://', '').replace('https://', '').replace('wwww.', '').split('/')[0];
                    }
                    currHost = currHost.toLowerCase();
                    isIntegrityRequired = _integrity.isIntegrityCheckRequiredForThisHost(currHost);
                } else {
                    isIntegrityRequired = true;
                }
            }

            return isIntegrityRequired;
        },

        isIntegrityCheckRequiredForThisHost: function Integrity$isIntegrityCheckRequiredForThisHost(currHost) {
            var i = 0, host = '', hostsLen = 0, isIntegrityRequired = false,
                hostNamesList = _integrityProperties.hostNamesList;

            hostsLen = hostNamesList.length;
            if(hostsLen > 0) {
                for(i = 0; i < hostsLen; i++) {
                    host = hostNamesList[i];
                    if(host.startsWith('*.')) {
                        host = host.replace('*.', '').toLowerCase();
                        if(currHost.endsWith(host)) {
                            isIntegrityRequired = true;
                            break;
                        }
                    } else if(host === currHost) {
                        isIntegrityRequired = true;
                        break;
                    }
                }
            } else {
                isIntegrityRequired = true;
            }

            return isIntegrityRequired;
        },

        //This function will be called in the scope of http instance
        setIntegrityStatus: function Integrity$setIntegrityStatus(responseChecksum, checkSum) {
            if(responseChecksum === checkSum) {
                voltmx.print('Integrity Successful');
                this.integrityStatus = constants.HTTP_INTEGRITY_CHECK_SUCCESSFUL;
            } else {
                this.integrityStatus = constants.HTTP_INTEGRITY_CHECK_FAILED;
            }
        },

        validateHostNamesList: function Integrity$validateHostNamesList(hostNamesList) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils, i = 0, j = 0, domain = null,
                domainArr = null, domainLen = 0;

            //eslint-disable-next-line no-useless-escape
            var regex = /^[A-Za-z0-9\\\-]+$/;

            if(!$KU.is(hostNamesList, 'undefined') && !$KU.is(hostNamesList, 'null')) {
                if(!$KU.is(hostNamesList, 'array')) {
                    throw new $KU.error('100', 'Error', 'Invalid argument :- hostNamesList');
                }

                for(i = hostNamesList.length - 1; i >= 0; i--) {
                    domain = hostNamesList[i];
                    if(typeof domain === 'undefined' || domain === null || domain.trim() === '') {
                        throw new $KU.error('100', 'Error', 'Invalid argument :- hostNamesList');
                    }
                    if(domain.startsWith('*.')) {
                        domain = domain.replace('*.', '');
                    }
                    domainArr = domain.split('.');
                    domainLen = domainArr.length;
                    if(domainLen <= 1) {
                        throw new $KU.error('100', 'Error', 'Invalid argument :- hostNamesList');
                    }
                    for(j = domainLen - 1; j >= 0; j--) {
                        if(!regex.test(domainArr[j])) {
                            throw new $KU.error('100', 'Error', 'Invalid argument :- hostNamesList');
                        }
                    }
                }
            }
        },

        validateIntegrityParams: function Integrity$validateIntegrityParams(properties) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils,
                algoList = ($K.behavior.strictMode)?['sha256', 'sha512']:['md5', 'sha1', 'sha256', 'sha512'];

            if(Object.keys(properties).length > 0) {
                _integrity.validateIntegrityPropertyType('validateResp', properties.validateResp, 'boolean');
                _integrity.validateIntegrityPropertyType('algo', properties.algo, 'string');
                _integrity.validateIntegrityPropertyType('salt', properties.salt, 'string');
                _integrity.validateIntegrityPropertyType('headerName', properties.headerName, 'string');

                if((algoList.indexOf(properties.algo.toLowerCase())) === -1) {
                    throw new $KU.error('100', 'Error', 'Invalid argumment' + properties.algo);
                }

                if(properties.salt.length > 1024) {
                    properties.salt = properties.salt.substring(0, 1024);
                }

                if(properties.headerName.length > 64) {
                    properties.headerName = properties.headerName.substring(0, 64);
                }

                if(properties.passthroughHeaderName) {
                    _integrity.validateIntegrityPropertyType('passthroughHeaderName', properties.passthroughHeaderName, 'string');
                    if(properties.passthroughHeaderName.length > 64) {
                        properties.passthroughHeaderName = properties.passthroughHeaderName.substring(0, 64);
                    }
                }

                _integrity.validateHostNamesList(properties.hostNamesList);
            } else {
                throw new $KU.error('101', 'Error', 'Invalid number of arguments');
            }

            return true;
        },

        validateIntegrityPropertyType: function Integrity$validateIntegrityPropertyType(propertyName, propertyValue, propertyType) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils;

            if(typeof propertyValue !== propertyType) {
                throw new $KU.error('100', 'Error', 'Invalid argument' + propertyName);
            }

            return true;
        }

    };


    var _iterator = function(data, arg) {
        var keys = Object.keys(data),
            keyIndex = 0, valueIndex = 0;

        if(arg === 'entries') {
            return {
                next: function() {
                    var key = '', value = null;

                    if(keyIndex < keys.length) {
                        key = keys[keyIndex];
                        value = data[key];

                        if(valueIndex >= value.length) {
                            valueIndex = 0;
                            keyIndex++;
                        }

                        return {
                            done: false,
                            value: [key, value[valueIndex++]]
                        };
                    }
                    return {
                        done: true,
                        value: undefined
                    };
                }
            };
        } else if(arg === 'keys') {
            return {
                next: function() {
                    if(keyIndex < keys.length) {
                        return {
                            done: false,
                            value: keys[keyIndex++]
                        };
                    }
                    return {
                        done: true,
                        value: undefined
                    };
                }
            };
        } else if(arg === 'values') {
            return {
                next: function() {
                    var key = '', value = null;

                    if(keyIndex < keys.length) {
                        key = keys[keyIndex];
                        value = data[key];

                        if(valueIndex >= value.length) {
                            valueIndex = 0;
                            keyIndex++;
                        }
                        return {
                            done: false,
                            value: value[valueIndex++]
                        };
                    }
                    return {
                        done: true,
                        value: undefined
                    };
                }
            };
        }
    };


    var _isNetworkAvailable = function(networkType) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils;

        $KU.log({api:'voltmx.net.isNetworkAvailable', enter:true});

        if(networkType) {
            if(networkType === constants.NETWORK_TYPE_ANY) {
                if(!$KU.is(navigator.onLine, 'undefined')) {
                    $KU.log({api:'voltmx.net.isNetworkAvailable', exit:true});
                    return navigator.onLine;
                }
                $KU.log({api:'voltmx.net.isNetworkAvailable', exit:true});
                return false;
            } else if(networkType === constants.NETWORK_TYPE_3G
            || networkType === constants.NETWORK_TYPE_WIFI
            || networkType === constants.NETWORK_TYPE_ETHERNET) {
                $KU.log({api:'voltmx.net.isNetworkAvailable', exit:true});
                return false;
            }
            throw new Error('Invalid Network Type');
        } else {
            throw new Error('Invalid Network Type');
        }
    };


    var _loadClientCertificate = function() {
        var $K = voltmx.$kwebfw$, $KU = $K.utils;

        $KU.unsupportedAPI('voltmx.net.loadClientCertificate');
    };


    var _removeAllCachedResponses = function() {
        var $K = voltmx.$kwebfw$, $KU = $K.utils;

        $KU.unsupportedAPI('voltmx.net.removeAllCachedResponses');
    };


    var _removeClientCertificate = function() {
        var $K = voltmx.$kwebfw$, $KU = $K.utils;

        $KU.unsupportedAPI('voltmx.net.removeClientCertificate');
    };


    var _removeIntegrityCheck = function() {
        var $K = voltmx.$kwebfw$, $KU = $K.utils;

        $KU.log({api:'voltmx.net.removeIntegrityCheck', enter:true});

        _integrityProperties = null;

        $KU.log({api:'voltmx.net.removeIntegrityCheck', exit:true});
    };


    //This function will be called in the scope of http instance
    var _setRequestHeader = function(header, value) {
        var xhr = this.xhr;

        xhr.setRequestHeader(header, value);
    };


    var _setIntegrityCheck = function(properties) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils;

        $KU.log({api:'voltmx.net.setIntegrityCheck', enter:true});

        if(_integrity.validateIntegrityParams(properties)) {
            $KU.log('voltmx.net.setIntegrityCheck', properties);

            _integrityProperties = properties;
        }

        $KU.log({api:'voltmx.net.setIntegrityCheck', exit:true});
    };


    var _setNetworkCallbacks = function(config) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils;

        $KU.log({api:'voltmx.net.setNetworkCallbacks', enter:true});

        if($KU.is(config, 'object') && $KU.is(config.statusChange, 'function')) {
            if($KU.is(window.ononline, 'object')) {
                window.addEventListener('online', function() {
                    config.statusChange(navigator.onLine);
                }, false);
            }
            if($KU.is(window.onoffline, 'object')) {
                window.addEventListener('offline', function() {
                    config.statusChange(navigator.onLine);
                }, false);
            }

            $KU.log({api:'voltmx.net.setNetworkCallbacks', enter:true});
        } else {
            throw new Error('Invalid Input : config is not of valid type');
        }
    };

    $K.defVoltmxProp(_ns, [
        {keey:'cancel', value:_cancel},
        {keey:'clearCookies', value:_clearCookies},
        {keey:'FormData', value:_FormData},
        {keey:'getActiveNetworkType', value:_getActiveNetworkType},
        {keey:'getCookies', value:_getCookies},
        {keey:'HttpRequest', value:_HttpRequest},
        {keey:'invokeService', value:_invokeService},
        {keey:'invokeServiceAsync', value:_invokeServiceAsync, writable:true},
        {keey:'isNetworkAvailable', value:_isNetworkAvailable},
        {keey:'loadClientCertificate', value:_loadClientCertificate},
        {keey:'removeAllCachedResponses', value:_removeAllCachedResponses},
        {keey:'removeClientCertificate', value:_removeClientCertificate},
        {keey:'removeIntegrityCheck', value:_removeIntegrityCheck},
        {keey:'setIntegrityCheck', value:_setIntegrityCheck},
        {keey:'setNetworkCallbacks', value:_setNetworkCallbacks}
    ]);


    return _ns;
}())});


/* FILE PATH :: 'lib/apis/voltmxos.js' */
Object.defineProperty(voltmx, 'os', {configurable:false, enumerable:false, writable:false, value:(function() {
    var _ns = {}, $K = voltmx.$kwebfw$;

    var _buildPrintWindow = function(win, widget, width) {
        var htmlAttrs = document.documentElement.attributes, shim = null,
            doc = win.document, docstylesheets = document.styleSheets,
            html = doc.documentElement, cssText = '', ilen = htmlAttrs.length,
            meta = doc.createElement('META'), i = 0, link = null, view = null,
            shimstyle = {}, stylesheet = 0, style = doc.createElement('STYLE'),
            checkIsWidget = function(obj) {
                var value = false;
                if(typeof obj === 'object' && (typeof obj._kwebfw_ === 'object' && obj._kwebfw_)
                && (typeof obj._kwebfw_.ns === 'string' && obj._kwebfw_.ns)
                && (typeof obj._kwebfw_.name === 'string' && obj._kwebfw_.name)) {
                    value = true;
                }
                return value;
            };

        style.setAttribute('type', 'text/css');
        for(i=0; i<ilen; i++) {
            if(htmlAttrs[i].name !== 'style') {
                html.setAttribute(htmlAttrs[i].name, htmlAttrs[i].value);
            }
        }

        meta.setAttribute('http-equiv', 'Content-Type');
        meta.setAttribute('content', 'text/html; charset=UTF-8');
        style.innerHTML = '*{box-sizing:border-box !important;user-select:none;cursor:inherit;margin:0px;padding:0px;}';
        doc.head.appendChild(meta);
        doc.head.appendChild(style);

        for(stylesheet = 0; stylesheet < docstylesheets.length; stylesheet++) {
            link = null;

            if(docstylesheets[stylesheet].href
            && docstylesheets[stylesheet].href.indexOf('desktopweb/lib/anim.css') === -1
            && docstylesheets[stylesheet].href.indexOf('desktopweb/voltmxdesktop.css') === -1) {
                link = doc.createElement('LINK');
                link.setAttribute('rel', 'stylesheet');
                link.setAttribute('type', 'text/css');

                link.href = docstylesheets[stylesheet].href;
                doc.head.appendChild(link);
            }
        }

        if(checkIsWidget(widget)) {
            view = widget._kwebfw_.view;
            width = (width + 'px !important;');

            cssText += ' top: 0px !important; bottom: 0px !important;';
            cssText += ' left: 0px !important; right: 0px !important;';
            cssText += ' margin-top: 0px !important; margin-bottom: 0px !important;';
            cssText += ' margin-left: 0px !important; margin-right: 0px !important;';
            cssText += (' width: '+width+' min-width: '+width+' max-width: '+width);

            doc.body.innerHTML = view.outerHTML;
            doc.body.firstElementChild.style.cssText = (view.style.cssText+cssText);
        } else if(typeof widget === 'string') {
            doc.body.innerHTML = widget;
        }

        shim = doc.createElement('DIV');
        shimstyle = {
            position:'absolute',
            top:'0px', left:'0px',
            width:'100%', height:'100%',
            zIndex:2147483647,
            backgroundColor:'transparent'
        };

        for(i in shimstyle) {
            shim.style[i] = shimstyle[i];
        }


        doc.body.appendChild(shim);
    };


    var _createUUID = function() {
        var $K = voltmx.$kwebfw$, $KU = $K.utils;

        return $KU.uuid();
    };

    var _deviceInfo = function() {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, info = {};

        $KU.log({api:'voltmx.os.deviceInfo', enter:true});

        info.category = $KU.browser('name');
        if(info.category === 'msie') info.category = 'IE';
        else info.category = info.category[0].toUpperCase()+info.category.substr(1);
        info.deviceid = (function() {
            var $K = voltmx.$kwebfw$, $KU = $K.utils, $KA = $K.app,
                id = '', store = null, data = null;

            if(window.localStorage && typeof localStorage.getItem === 'function') {
                data = localStorage.getItem($KA.id);

                if(typeof data === 'string' && data) {
                    try{
                        store = JSON.parse(data);
                    } catch(e) {
                        store = data;
                    }
                }

                if(typeof store === 'object' && store) {
                    if(typeof store.deviceId === 'string' && store.deviceId) {
                        id = store.deviceId;
                    } else {
                        store.deviceId = id = $KU.uuid();
                        localStorage.setItem($KA.id, JSON.stringify(store));
                    }
                }
            } else if(typeof $KA.id === 'string' && $KA.id) {
                id = $KU.uuid();
            }

            return id;
        }());
        info.deviceHeight = screen.availHeight;
        info.deviceWidth = screen.availWidth;
        info.hascamera = $KU.browser('supports', 'usermedia');
        info.hasgps = $KU.browser('supports', 'geolocation');
        info.hastouchsupport = $KU.browser('supports', 'touch');
        info.hasorientationsupport = $KU.browser('supports', 'orientation');
        info.httpheaders = '//TODO::';
        info.imagecat = $K.device.resolution;
        info.ip = '';
        info.iswifiavailable = ($KU.is(navigator.onLine, 'boolean') ? navigator.onLine : true);
        info.model = '';
        info.name = 'thinclient';
        info.screenHeight = (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight);
        info.screenWidth = (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth);
        info.type = 'spa';
        info.userAgent = navigator.userAgent;
        info.version = $KU.browser('version');

        $KU.log({api:'voltmx.os.deviceInfo', exit:true});

        return info;
    };

    var _freeMemory = function() {
        var $K = voltmx.$kwebfw$, $KU = $K.utils;

        $KU.log({api:'voltmx.os.freeMemory', enter:true});
        $KU.log({api:'voltmx.os.freeMemory', exit:true});

        return 0; //Dummy Implementation
    };


    var _getBatteryState = function() {
        var $K = voltmx.$kwebfw$, $KU = $K.utils;

        $KU.log({api:'voltmx.os.getBatteryState', enter:true});
        $KU.log({api:'voltmx.os.getBatteryState', exit:true});

        return voltmx.os.BATTERY_STATE_UNKNOWN;
    };


    var _getDeviceCurrentOrientation = function() {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, orientation = '';

        $KU.log({api:'voltmx.os.getDeviceCurrentOrientation', enter:true});

        orientation = $KU.browser('orientation');

        $KU.log({api:'voltmx.os.getDeviceCurrentOrientation', exit:true});

        return (orientation === 'portrait') ? constants.DEVICE_ORIENTATION_PORTRAIT
            : constants.DEVICE_ORIENTATION_LANDSCAPE;
    };


    var _handlePrint = {
        Form2: function(win, info) {
            var _ = this._kwebfw_, uid = _.uid, id = '', k = '', cssText = '',
                dom = win.document.getElementById(uid), cview = null;

            cssText = dom.style.cssText;
            cssText += ' height: auto !important;';
            cssText += ' max-height: none !important;';
            cssText += ' overflow-x: visible !important;';
            cssText += ' overflow-y: visible !important;';
            dom.style.cssText = cssText;

            dom = dom.firstElementChild; //header
            cssText = dom.style.cssText;
            cssText += ' position: relative !important;';
            cssText += ' top: 0px !important;';
            cssText += ' bottom: auto !important;';
            dom.style.cssText = cssText;

            dom = dom.nextElementSibling; //viewport
            cssText = dom.style.cssText;
            cssText += ' position: relative !important;';
            cssText += ' bottom: auto !important;';
            if(this.layoutType === voltmx.flex.FREE_FORM) {
                cssText += ' height: '+info[uid].scrollHeight+'px !important;';
            }
            dom.style.cssText = cssText;

            for(id in info) {
                cview = win.document.getElementById(id);

                for(k in info[id]) {
                    cview.style[k] = info[id][k];
                }
            }

            dom = dom.nextElementSibling; //footer
            cssText = dom.style.cssText;
            cssText += ' position: relative !important;';
            cssText += ' top: 0px !important;';
            cssText += ' bottom: auto !important;';
            dom.style.cssText = cssText;
        }
    };


    var _hasCameraSupport = function() {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

        $KU.log({api:'voltmx.os.hasCameraSupport', enter:true});
        flag = $KU.browser('supports', 'usermedia');
        $KU.log({api:'voltmx.os.hasCameraSupport', exit:true});

        return flag;
    };


    var _hasGPSSupport = function() {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, gps = false;

        $KU.log({api:'voltmx.os.hasGPSSupport', enter:true});
        gps = $KU.browser('supports', 'geolocation');
        $KU.log({api:'voltmx.os.hasGPSSupport', exit:true});

        return gps;
    };


    var _hasOrientationSupport = function() {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, hasOrientation = false;

        $KU.log({api:'voltmx.os.hasOrientationSupport', enter:true});
        hasOrientation = $KU.browser('supports', 'orientation');
        $KU.log({api:'voltmx.os.hasOrientationSupport', exit:true});

        return hasOrientation;
    };


    var _hasTouchSupport = function() {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

        $KU.log({api:'voltmx.os.hasTouchSupport', enter:true});
        flag = $KU.browser('supports', 'touch');
        $KU.log({api:'voltmx.os.hasTouchSupport', exit:true});

        return flag;
    };


    //Applicable only on DesktopWeb
    //Auto-Close is nomore supported, facing technical challenge.
    //TODO:: In IE11 doesn't work, will raise a bug.
    var _print = function(widgetId) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget,
            $KA = $K.app, info = {}, cf = $KW.model($KA.currentFormUID),
            win = null, widget = null, el = null;

        $KU.log({api:'voltmx.os.print', enter:true});

        win = window.open();

        if(!win) {
            voltmx.print('Allow popup to open for this site.');
        } else if($KU.is(widgetId, 'string') && widgetId) {
            widget = (cf) ? cf[widgetId] : null;

            if(!widget) {
                _buildPrintWindow(win, widgetId);
            } else {
                el = $KW.el(widget);
                _buildPrintWindow(win, widget, el.node.offsetWidth);

                if(_handlePrint[$KW.name(widget)]) {
                    _handlePrint[$KW.name(widget)].call(widget, win);
                }
            }
        } else if(cf) {
            el = $KW.el(cf);
            _buildPrintWindow(win, cf, el.scrolee.clientWidth);

            if(_handlePrint.Form2) {
                $KU.each($KW.children(cf), function(cmodel) {
                    var _ = cmodel._kwebfw_, uid = _.uid,
                        final = _.flex.final, view = _.view;

                    if(final.height && final.height.indexOf('%') > 0) {
                        if(!info[uid]) info[uid] = {};
                        info[uid].height = (view.offsetHeight+'px');
                    }

                    if(cf.layoutType === voltmx.flex.FLOW_VERTICAL) {
                        if(final.top && final.top[0] !== '-'
                        && _.viewPrev && final.top.indexOf('%') > 0) {
                            if(!info[uid]) info[uid] = {};
                            info[uid].marginTop = (_.viewPrev.offsetHeight+'px');
                        }

                        if(final.bottom && final.bottom[0] !== '-'
                        && _.viewNext && final.bottom.indexOf('%') > 0) {
                            if(!info[uid]) info[uid] = {};
                            info[uid].marginBottom = (_.viewNext.offsetHeight+'px');
                        }
                    }
                });

                if(cf.layoutType === voltmx.flex.FREE_FORM) {
                    if(!info[cf._kwebfw_.uid]) {
                        info[cf._kwebfw_.uid] = {};
                    }

                    info[cf._kwebfw_.uid].scrollHeight = el.scrolee.scrollHeight;
                    _handlePrint.Form2.call(cf, win, info);
                } else {
                    _handlePrint.Form2.call(cf, win, info);
                }
            }
        }

        if(win) {
            setTimeout(function() {
                win.print();win.document.close();
                win.focus();win.close();win = null;
            }, 250);
        }

        $KU.log({api:'voltmx.os.print', exit:true});
    };

    var _userAgent = function() {
        var $K = voltmx.$kwebfw$, $KU = $K.utils;

        $KU.log({api:'voltmx.os.userAgent', enter:true});
        $KU.log({api:'voltmx.os.userAgent', exit:true});

        return navigator.userAgent;
    };

    $K.defVoltmxProp(_ns, [
        {keey:'BATTERY_STATE_UNKNOWN', value:'unknown'},
        {keey:'createUUID', value:_createUUID},
        {keey:'deviceInfo', value:_deviceInfo},
        {keey:'freeMemory', value:_freeMemory},
        {keey:'getBatteryState', value:_getBatteryState},
        {keey:'getDeviceCurrentOrientation', value:_getDeviceCurrentOrientation},
        {keey:'hasCameraSupport', value:_hasCameraSupport},
        {keey:'hasGPSSupport', value:_hasGPSSupport},
        {keey:'hasOrientationSupport', value:_hasOrientationSupport},
        {keey:'hasTouchSupport', value:_hasTouchSupport},
        {keey:'print', value:_print},
        {keey:'userAgent', value:_userAgent}
    ]);

    return _ns;
}())});


/* FILE PATH :: 'lib/apis/voltmxphone.js' */
/* global FileError */
/* global Uint8Array */

Object.defineProperty(voltmx, 'phone', {configurable:false, enumerable:false, writable:false, value:(function() {
    var _ns = {}, $K = voltmx.$kwebfw$, _form = null, _input = null, _scrap = null;


    var _dial = function(phoneno) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils,
            version = $KU.browser('osversion'),
            device = $KU.browser('device'), href = '';

        $KU.log({api:'voltmx.phone.dial', enter:true});

        if(device === 'iphone' && version >= 5 && version < 8) {
            href = ('tel://' + phoneno);
        } else {
            href = ('tel:' + phoneno);
        }

        window.location.href = href;

        $KU.log({api:'voltmx.phone.dial', exit:true});
    };


    var _openMediaGallery = function(onselectioncallback, querycontext/*, widgetref*/) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KD = $K.dom, $KG = $K.globals;

        $KU.log({api:'voltmx.phone.openMediaGallery', enter:true});

        if(window.File && window.FileReader && window.FileList) {
            if(!_scrap) _scrap = $KG.appScrap;

            if(!_form && !_input) {
                _form = $KD.create('form');
                _input = $KD.create('input', {type:'file'});

                $KD.on(_input, 'change', 'change', function(/*e*/) {
                    var $K = voltmx.$kwebfw$, $KU = $K.utils;

                    if($KU.is(onselectioncallback, 'function')) {
                        var reader = new FileReader(), info = null,
                            file = this.files[0], mimetype = file.type;

                        reader.readAsArrayBuffer(file);

                        reader.onload = function(evt) {
                            var chars = new Uint8Array(evt.target.result),
                                CHUNK_SIZE = 0x8000, index = 0, result = '', slice;

                            while(index < chars.length) {
                                slice = chars.subarray(index, Math.min(index + CHUNK_SIZE, chars.length));
                                result += String.fromCharCode.apply(null, slice);
                                index += CHUNK_SIZE;
                            }

                            info = new voltmx.utils.voltmxRawBytes(result, 'utf8');

                            onselectioncallback(info, voltmx.application.PERMISSION_GRANTED, mimetype);
                        };

                        reader.onerror = function(evt) {
                            if(evt.target.error instanceof FileError) { // Read error code in case of error is of FileError type
                                switch(evt.target.error.code) {
                                    case FileError.NOT_FOUND_ERR:
                                        voltmx.print('openMediaGallery error:: The file resource couldn\'t be found at the time the read was processed.');
                                        break;
                                    case FileError.NOT_READABLE_ERR:
                                        voltmx.print('openMediaGallery error:: 2101, The resource couldn\'t be read. Insufficient Permissions.');
                                        break;
                                    case FileError.ENCODING_ERR:
                                        voltmx.print('openMediaGallery error:: The resource couldn\'t be encoded.');
                                        break;
                                    case FileError.SECURITY_ERR:
                                    default:
                                        voltmx.print('openMediaGallery error:: The file resource is unsafe/changed/other unspecified security error.');
                                }
                            } else { //Read error name & message in case error is of DOMError type
                                voltmx.print('openMediaGallery error:: ' + evt.target.error.name + ', ' + evt.target.error.message);
                            }
                        };
                    }
                });

                $KD.add(_form, _input);
                $KD.add(_scrap, _form);
            }

            if(querycontext && querycontext.mimetype) { //add mime type
                $KD.setAttr(_input, 'accept', querycontext.mimetype);
            } else {
                $KD.removeAttr(_input, 'accept');
            }

            _input.click();

            $KU.log({api:'voltmx.phone.openMediaGallery', exit:true});
        } else {
            voltmx.print('openMediaGallery error:: 2103, Cannot open media gallery. Not supported.');
        }
    };


    $K.defVoltmxProp(_ns, [
        {keey:'dial', value:_dial},
        {keey:'openMediaGallery', value:_openMediaGallery}
    ]);


    return _ns;
}())});


/* FILE PATH :: 'lib/apis/voltmxtheme.js' */
Object.defineProperty(voltmx, 'theme', {configurable:false, enumerable:false, writable:false, value:(function() {
    var _ns = {}, _remoteUrl = {}, _appLoadThemeCall = true, $K = voltmx.$kwebfw$;


    var _applyStyleSheet = function(identifier) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KA = $K.app,
            index = $KA.supportedThemes.indexOf(identifier),
            enabled = false, disabled = false;

        if(index >= 0 && identifier !== $KA.currentTheme) {
            $KU.each(document.styleSheets, function(sheet) {
                var $K = voltmx.$kwebfw$, $KA = $K.app, theme = '';

                if(sheet.ownerNode.tagName === 'LINK'
                && sheet.ownerNode.hasAttribute('ktheme')) {
                    theme = sheet.ownerNode.getAttribute('ktheme');

                    if(enabled && disabled) {
                        return true;
                    }
                    if(theme === identifier) {
                        enabled = true;
                        sheet.disabled = false;
                    } else if($KA.currentTheme === theme) {
                        disabled = true;
                        sheet.disabled = true;
                    }
                }
            });

            $KA.currentTheme = identifier;
        }
    };


    var _createTheme = function(url, identifier, onsuccesscallback, onerrorcallback) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KA = $K.app;

        $KU.log({api:'voltmx.theme.createTheme', enter:true});

        //NOTE:: From VIZ, sometime we get 'defaultTheme' and sometime 'default'
        if(identifier === 'defaultTheme') identifier = 'default';

        if($KA.supportedThemes.indexOf(identifier) >= 0) {
            $KU.log({api:'voltmx.theme.createTheme', exit:true});

            if($KU.is(onsuccesscallback, 'function')) {
                onsuccesscallback();
            }
        } else {
            $KU.loadStyle(url, {ktheme:identifier},
                function() {
                    var $K = voltmx.$kwebfw$, $KU = $K.utils, $KA = $K.app,
                        stylesheet = $KU.getThemeStyleSheet(identifier);

                    if(stylesheet) {
                        stylesheet.disabled = true;
                        _remoteUrl[identifier] = url;
                        $KA.supportedThemes.push(identifier);
                        $KU.log({api:'voltmx.theme.createTheme', exit:true});

                        if($KU.is(onsuccesscallback, 'function')) {
                            onsuccesscallback();
                        }
                    } else {
                        $KU.log({api:'voltmx.theme.createTheme', exit:true});

                        if($KU.is(onerrorcallback, 'function')) {
                            onerrorcallback();
                        }
                    }
                },

                function() {
                    var $K = voltmx.$kwebfw$, $KU = $K.utils;

                    $KU.log({api:'voltmx.theme.createTheme', exit:true});

                    if($KU.is(onerrorcallback, 'function')) {
                        onerrorcallback();
                    }
                }
            );
        }
    };


    var _deleteTheme = function(identifier, onsuccesscallback, onerrorcallback) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils,
            $KA = $K.app, link = null, index = -1;

        $KU.log({api:'voltmx.theme.deleteTheme', enter:true});

        if(_remoteUrl[identifier]) {
            delete _remoteUrl[identifier];
            $KA.supportedThemes.splice(index, 1);

            if(identifier === $KA.currentTheme) {
                _setCurrentTheme('default');
            }

            link = document.head.querySelector('link[ktheme="'+identifier+'"]');
            link && document.head.removeChild(link);
            $KU.log({api:'voltmx.theme.deleteTheme', exit:true});

            if($KU.is(onsuccesscallback, 'function')) {
                onsuccesscallback();
            }
        } else {
            if($KU.is(onerrorcallback, 'function')) {
                onerrorcallback();
            }
            $KU.log({api:'voltmx.theme.deleteTheme', exit:true});
        }
    };


    var _getAllThemes = function() {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KA = $K.app;

        $KU.log({api:'voltmx.theme.getAllThemes', enter:true});
        $KU.log({api:'voltmx.theme.getAllThemes', exit:true});

        return $KA.supportedThemes.slice(0);
    };


    var _getCurrentTheme = function() {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KA = $K.app;

        $KU.log({api:'voltmx.theme.getCurrentTheme', enter:true});
        $KU.log({api:'voltmx.theme.getCurrentTheme', exit:true});

        return $KA.currentTheme;
    };


    var _getCurrentThemeData = function() {
        var $K = voltmx.$kwebfw$, $KU = $K.utils;

        $KU.log({api:'voltmx.theme.getCurrentThemeData', enter:true});
        $KU.log({api:'voltmx.theme.getCurrentThemeData', exit:true});

        return null;
    };

    var _isThemePresent = function(identifier) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KA = $K.app;

        $KU.log({api:'voltmx.theme.isThemePresent', enter:true});
        //NOTE:: From VIZ, sometime we get 'defaultTheme' and sometime 'default'
        if(identifier === 'defaultTheme') identifier = 'default';
        $KU.log({api:'voltmx.theme.isThemePresent', exit:true});

        return ($KA.supportedThemes.indexOf(identifier) >= 0) ? true : false;
    };


    var _packagedthemes = function(themes) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KA = $K.app, index = -1;

        $KU.log({api:'voltmx.theme.packagedthemes', enter:true});

        //NOTE:: From VIZ, sometime we get 'defaultTheme' and sometime 'default'
        index = themes.indexOf('defaultTheme');

        if(index !== -1) {
            themes.splice(index, 1);

            if(themes.indexOf('default') === -1) {
                themes.splice(index, 0, 'default');
            }
        }

        $KA.supportedThemes = themes;

        $KU.log({api:'voltmx.theme.packagedthemes', exit:true});
    };


    var _setCurrentTheme = function(identifier, onsuccesscallback, onerrorcallback) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils,
            $KG = $K.globals, $KA = $K.app, src = '', kofUrl = '';

        $KU.log({api:'voltmx.theme.setCurrentTheme', enter:true});

        //NOTE:: From VIZ, sometime we get 'defaultTheme' and sometime 'default'
        if(identifier === 'defaultTheme') identifier = 'default';

        if($KA.supportedThemes.indexOf(identifier) === -1) {
            $KU.log({api:'voltmx.theme.setCurrentTheme', exit:true});

            if($KU.is(onerrorcallback, 'function')) {
                onerrorcallback(); //Theme not supported
            }
        } else if(identifier === $KA.currentTheme) {
            $KU.log({api:'voltmx.theme.setCurrentTheme', exit:true});

            if($KU.is(onsuccesscallback, 'function')) {
                onsuccesscallback(); //Asked theme is same as current theme
            }
        } else if($KU.getThemeStyleSheet(identifier)) {
            _applyStyleSheet(identifier); //Theme was used once previously
            $KU.log({api:'voltmx.theme.setCurrentTheme', exit:true});

            if($KU.is(onsuccesscallback, 'function')) {
                onsuccesscallback();
            }
        } else { //Theme was never used, so loading it from network
            src = ($KG.platform + '/themes/' + identifier + '/theme.css');

            if($KU.loadedFromOtherFramework()) {
                kofUrl = $KG.kof.appUrl+'/desktopweb';
                src = (kofUrl + '/themes/' + identifier + '/theme.css');
            }

            $KU.loadStyle(src, {ktheme:identifier},
                function() {
                    var $K = voltmx.$kwebfw$, $KU = $K.utils;

                    _applyStyleSheet(identifier);
                    $KU.log({api:'voltmx.theme.setCurrentTheme', exit:true});

                    if(!_appLoadThemeCall && $KU.is(onsuccesscallback, 'function')) {
                        onsuccesscallback(); //Successfully loaded theme from network
                    }

                    _appLoadThemeCall = false;
                },

                function() {
                    var $K = voltmx.$kwebfw$, $KU = $K.utils;

                    $KU.log({api:'voltmx.theme.setCurrentTheme', exit:true});

                    if(!_appLoadThemeCall && $KU.is(onerrorcallback, 'function')) {
                        onerrorcallback(); //Failed to load theme from network
                    }

                    _appLoadThemeCall = false;
                }
            );

            if(_appLoadThemeCall && $KU.is(onsuccesscallback, 'function')) {
                onsuccesscallback();
            }
        }
    };

    var _setSkinsProperties = function(skinObj) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KA = $K.app, $KW = $K.widget,
            stylesheet = null, rules, skins = Object.keys(skinObj),
            _handlers = $KW.skinHandlers();

        stylesheet = $KU.getThemeStyleSheet($KA.currentTheme);

        rules = stylesheet.cssRules || stylesheet.rules;
        $KU.each(skins, function(skin) {
            $KU.each(rules, function(rule) {
                if(rule.selectorText && rule.selectorText.indexOf(skin + ',') === 1) {
                    $KU.each(skinObj[skin], function(value, keey) {
                        _handlers[keey] && _handlers[keey]({rule: rule, config: value});
                    });
                    return true;
                }
            });
        });
    };

    $K.defVoltmxProp(_ns, [
        {keey:'createTheme', value:_createTheme},
        {keey:'deleteTheme', value:_deleteTheme},
        {keey:'getAllThemes', value:_getAllThemes},
        {keey:'getCurrentTheme', value:_getCurrentTheme},
        {keey:'getCurrentThemeData', value:_getCurrentThemeData},
        {keey:'isThemePresent', value:_isThemePresent},
        {keey:'packagedthemes', value:_packagedthemes},
        {keey:'setCurrentTheme', value:_setCurrentTheme},
        {keey:'setSkinsProperties', value:_setSkinsProperties}
    ]);


    return _ns;
}())});


/* FILE PATH :: 'lib/apis/voltmxtimer.js' */
Object.defineProperty(voltmx, 'timer', {configurable:false, enumerable:false, writable:false, value:(function() {
    var _ns = {}, _map = {}, $K = voltmx.$kwebfw$;


    var _cancel = function(id) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, timer = null, func = null;

        $KU.log({api:'voltmx.timer.cancel', enter:true});

        if((($KU.is(id, 'string') && id) || $KU.is(id, 'number'))) {
            id = ('' + id);

            if(Object.prototype.hasOwnProperty.call(_map, id)) {
                timer = _map[id];
                func = (timer.repeat) ? 'clearInterval' : 'clearTimeout';

                window[func](timer.id);
                delete _map[id];
                $KU.log({api:'voltmx.timer.cancel', exit:true});
            } else {
                $KU.log('warn', 'No timer found with id="'+id+'".');
                $KU.log({api:'voltmx.timer.cancel', exit:true});
                return null;
            }
        } else {
            $KU.log({api:'voltmx.timer.cancel', exit:true});
        }
    };


    var _schedule = function(id, callback, interval, repeat) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, func = null;

        $KU.log({api:'voltmx.timer.schedule', enter:true});

        if((($KU.is(id, 'string') && id)
                || $KU.is(id, 'number'))
        && $KU.is(callback, 'function')
        && $KU.is(interval, 'number')) {
            id = ('' + id);

            if(!$KU.is(repeat, 'boolean')) {
                repeat = false;
            }

            _map[id] = {callback:callback, repeat:repeat};
            func = (repeat) ? 'setInterval' : 'setTimeout';

            _map[id].id = window[func](function() {
                _map[id] && _map[id].callback();
                !repeat && _cancel(id);
            }, (interval*1000));
        }

        $KU.log({api:'voltmx.timer.schedule', exit:true});
    };


    var _setCallBack = function(id, callback) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, timer = null;

        $KU.log({api:'voltmx.timer.setCallBack', enter:true});

        if((($KU.is(id, 'string') && id)
                || $KU.is(id, 'number'))
        && $KU.is(callback, 'function')) {
            timer = _map[(''+id)];

            if(timer) {
                timer.callback = callback;
            } else {
                //LOG:: WARN
            }
        }

        $KU.log({api:'voltmx.timer.setCallBack', exit:true});
    };


    $K.defVoltmxProp(_ns, [
        {keey:'cancel', value:_cancel},
        {keey:'schedule', value:_schedule},
        {keey:'setCallBack', value:_setCallBack}
    ]);


    return _ns;
}())});


/* FILE PATH :: 'lib/apis/voltmxworker.js' */
Object.defineProperty(voltmx, 'worker', {configurable:false, enumerable:false, writable:false, value:(function() {
    var _ns = {}, $K = voltmx.$kwebfw$;


    var _addEventListener = function Worker$_addEventListener(sName, fListener) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils;

        $KU.log({api:'worker.addEventListener', enter:true});
        if(arguments.length < 2) {
            $KU.log('addEventListener: MissingMandatoryParameter. Mandatory arguments missing');
            throw new VoltmxError(3001, 'WorkerThreadError', 'addEventListener: MissingMandatoryParameter. Mandatory arguments missing');
        }
        if(typeof sName !== 'string' || typeof fListener !== 'function') {
            $KU.log('addEventListener: InvalidParameter. Invalid arguments');
            throw new VoltmxError(3002, 'WorkerThreadError', 'addEventListener: InvalidParameter. Invalid arguments');
        }
        if(sName !== 'message' && sName !== 'error') {
            $KU.log('addEventListener: InvalidParameter. Invalid arguments');
            throw new VoltmxError(3002, 'WorkerThreadError', 'addEventListener: InvalidParameter. Invalid arguments');
        }
        $KU.log('worker.addEventListener', sName, fListener);
        fListener = fListener ? fListener : this.defaultListener;
        Worker.prototype.addEventListener.call(this.oWorker, sName, fListener, false);
        if('error' === sName) {
            Worker.prototype.removeEventListener.call(this.oWorker, 'error', this.defaultErrorListener, false);
        }

        $KU.log({api:'worker.addEventListener', exit:true});
    };


    var _hasWorkerThreadSupport = function() {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, workerSupport = true;

        $KU.log({api:'voltmx.worker.hasWorkerThreadSupport', enter:true});

        if(typeof Worker === 'undefined') {
            $KU.log('Worker not defined');
            workerSupport = false;
        }

        $KU.log({api:'voltmx.worker.hasWorkerThreadSupport', exit:true});

        return workerSupport;
    };


    var _postMessage = function Worker$_postMessage(vMsg) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils;

        $KU.log({api:'worker.postMessage', enter:true});
        if(vMsg === undefined || vMsg === null || vMsg === '') {
            $KU.log('postMessage: MissingMandatoryParameter. Message undefined');
            throw new VoltmxError(3001, 'WorkerThreadError', 'postMessage: MissingMandatoryParameter. Message undefined');
        }
        if(typeof vMsg === 'number' || typeof vMsg === 'boolean' || typeof vMsg === 'function') {
            $KU.log('postMessage: InvalidParameter. Invalid Message');
            throw new VoltmxError(3002, 'WorkerThreadError', 'postMessage: InvalidParameter. Invalid Message');
        }
        $KU.log('worker.postMessage', vMsg);
        try{
            Worker.prototype.postMessage.call(this.oWorker, vMsg);
            $KU.log({api:'worker.postMessage', exit:true});
        } catch(err) {
            $KU.log('postMessage: InvalidParameter. Invalid Message');
            voltmx.print('Error occured in WorkerThread postMessage: ' + err.message);
            throw new VoltmxError(3002, 'WorkerThreadError', 'postMessage: InvalidParameter. Invalid Message');
        }
    };


    var _removeEventListener = function Worker$_removeEventListener(sName, fListener) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils;

        $KU.log({api:'worker.removeEventListener', enter:true});
        if(arguments.length < 2) {
            $KU.log('removeEventListener: MissingMandatoryParameter. Mandatory arguments missing');
            throw new VoltmxError(3001, 'WorkerThreadError', 'removeEventListener: MissingMandatoryParameter. Mandatory arguments missing');
        }
        if(typeof sName !== 'string' || typeof fListener !== 'function') {
            $KU.log('removeEventListener: InvalidParameter. Invalid arguments');
            throw new VoltmxError(3002, 'WorkerThreadError', 'removeEventListener: InvalidParameter. Invalid arguments');
        }
        if(sName !== 'message' && sName !== 'error') {
            $KU.log('removeEventListener: InvalidParameter. Invalid arguments');
            throw new VoltmxError(3002, 'WorkerThreadError', 'removeEventListener: InvalidParameter. Invalid arguments');
        }
        $KU.log('worker.removeEventListener', sName, fListener);
        Worker.prototype.removeEventListener.call(this.oWorker, sName, fListener, false);
        if('error' === sName) {
            Worker.prototype.addEventListener.call(this.oWorker, 'error', this.defaultErrorListener, false);
        }
        $KU.log({api:'worker.removeEventListener', exit:true});
    };


    var _terminate = function Worker$_terminate() {
        var $K = voltmx.$kwebfw$, $KU = $K.utils;

        $KU.log({api:'worker.terminate', enter:true});
        Worker.prototype.terminate.call(this.oWorker);
        $KU.log({api:'worker.terminate', exit:true});
    };

    //eslint-disable-next-line no-global-assign,no-implicit-globals
    var VoltmxError = function(errorcode, name, message) {
        this.errorCode = this.errorcode = errorcode;
        this.name = name;
        this.message = message;
    };
    VoltmxError.prototype = new Error();
    VoltmxError.prototype.constructor = VoltmxError;

    var _WorkerThread = function(workerjs, fDefListener, fOnError) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KG = $K.globals, workerInstance = this,
            isFMSupported = false, workerInitPath = $KG.platform+'/lib/';

        if($K.ecmaEnable) {
            workerInitPath = $KG.platform+'/es5lib/';
        }

        $KU.log({api:'voltmx.worker.WorkerThread', enter:true});

        if(workerjs === undefined || workerjs === null || workerjs === '') {
            $KU.log('Invalid parameters');
            throw new Error(3001, 'WorkerThreadError', 'WorkerThread: MissingMandatoryParameter. Failed to construct WorkerThread');
        }
        if(typeof workerjs !== 'string') {
            $KU.log('Invalid parameters');
            throw new Error(3002, 'WorkerThreadError', 'WorkerThread: InvalidParameter. Invalid script name');
        }
        $KU.log('voltmx.worker.WorkerThread', workerjs, fDefListener, fOnError);

        if(typeof nestedWorker === 'undefined') {
            this.oWorker = new Worker(workerInitPath + 'voltmxworkerinit.js');
        } else {
            this.oWorker = new Worker('voltmxworkerinit.js');
        }


        this.oWorker.postMessage({
            moduleName: workerjs,
            platform: $KG.platform,
            kgAppMode: 'kgAppMode', // TODO
            kgAppID: 'kgAppID', // TODO
            isFMSupported: isFMSupported,
            kgUserAgent: voltmx.os.userAgent()
        }),

        workerInstance.defaultListener = fDefListener || function(event) {
            voltmx.print('Data: ' + event.data);
        };

        workerInstance.defaultErrorListener = fOnError || function(e) {
            voltmx.print(e.message + ' : in file - ' + e.filename + ' at location :' + e.lineno + ',' + e.colno);
        };

        this.oWorker.addEventListener('error', workerInstance.defaultErrorListener);


        $K.defVoltmxProp(workerInstance, [
            {keey:'addEventListener', value:_addEventListener},
            {keey:'postMessage', value:_postMessage},
            {keey:'removeEventListener', value:_removeEventListener},
            {keey:'terminate', value:_terminate}
        ]);

        $KU.log({api:'voltmx.worker.WorkerThread', exit:true});
    };


    $K.defVoltmxProp(_ns, [
        {keey:'hasWorkerThreadSupport', value:_hasWorkerThreadSupport},
        {keey:'WorkerThread', value:_WorkerThread}
    ]);


    return _ns;
}())});


