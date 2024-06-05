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
