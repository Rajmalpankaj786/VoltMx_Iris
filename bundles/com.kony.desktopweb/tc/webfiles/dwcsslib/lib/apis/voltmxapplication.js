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
