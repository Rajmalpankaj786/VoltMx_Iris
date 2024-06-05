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
