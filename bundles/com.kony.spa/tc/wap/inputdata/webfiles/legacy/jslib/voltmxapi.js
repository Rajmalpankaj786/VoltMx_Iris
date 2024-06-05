
$KI.setappevents = function(eventobj) {
    $KU.logExecuting('voltmx.application.setApplicationInitializationEvents');
    $KU.logExecutingWithParams('voltmx.application.setApplicationInitializationEvents', eventobj);
    
    if($KG["appmode"] == constants.APPLICATION_MODE_HYBRID) {
        var initfunc;
        if(IndexJL)
            initfunc = window["appinit"];
        else
            initfunc = window["appInit"];

        initfunc && initfunc();
        $KU.detectDevice();
        $KU.logExecutingFinished('voltmx.application.setApplicationInitializationEvents VIA $KG["appmode"] == constants.APPLICATION_MODE_HYBRID ');
        return;
    }

    $KG["__voltmxappevents"] = eventobj;
    
    var preappinit = eventobj["preappinit"] || null;
    var appinit = eventobj["init"] || null;
    var postappinit = eventobj["postappinit"] || null;
    var appservice = eventobj["appservice"] || null;
    var showstartref = eventobj["showstartupform"] || null;
    var deepfunc = eventobj["deeplink"] || null;
    var launchparams = {};
    var startform = null;
    var launchobj = {};
    launchobj["launchparams"] = {};
    var formmodel;
    var testAutomationScriptURL, voltmxAutomationPath;
    var hash = location.hash, formId = '';

    
    if(voltmx.appinit.isSafari) {
        var metTag = document.querySelector("meta[name=viewport]");
        var oldContent = metTag.getAttribute('content');
        metTag.setAttribute('content', oldContent + ', shrink-to-fit=no');
    }


    if(window.location.hash) {
        
        
        

        var appType = location.hash.substr(0,2);
        if(appType == '#_') {
            formId = voltmx.bm.getFormId(window.location.hash);
        } else {
            hash = hash.substr(2, (hash.length)).split('/');
            formId = hash[1];
        }
        if(formId) {
            launchparams['formID'] = formId;
            var formState = voltmx.bm.getBMState(formId);
            if(formState) {
                for(var k in formState) {
                    launchparams[k] = formState[k];
                }
            }
        }

    }

    launchobj["launchmode"] = $KG["__launchmode"];

    if($KG["kdeepobj"]) {
        launchobj["launchparams"] = $KG["kdeepobj"];
    }

    
    
    for(var prop in launchparams) {
        launchobj["launchparams"][prop] = launchparams[prop];
    }
    
    $KU.getInnerHeight($KU.isIDevice ? 0 : 200);
    $KU.isAndroid && setTimeout(function() {
        $KG['__viewportHeight'] = window.innerHeight;
    }, 200);

    preappinit && preappinit(launchobj);

    if($KC.isRecording == true) {
        $KC.widgetDataRecording = true;
    }

    $KU.detectDevice();


    appinit = $KU.returnEventReference(appinit);
    appinit && appinit(launchparams);


    if(appConfig.testAutomation) {
        var params = window.location.search, protocol = null,
        testresources = null;
        window._voltmx.automation = {}; 
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
            voltmxAutomationPath = appConfig.testAutomation.scriptsURL;
            if($KU.isMob) {
                voltmxAutomationPath = testAutomationScriptURL + "Mobile";
            } else if($KU.isTablet) {
                voltmxAutomationPath = testAutomationScriptURL + "Tablet";
            }

            setTimeout(function() {
                $KAR && $KAR.invokeJasmineAutomation(voltmxAutomationPath);
            }, 1000);
        } else {
            voltmx.web.logger('log', 'Invalid test automation configuration.');
        }
    }

    voltmx.appinit.migrateLocalStorage();
    voltmx.appinit.disableForceRepaint();

    $KG.isMVC = $KG.appbehaviors.isMVC || false;
    launchparams["isRefresh"] = false;
    launchparams["isNewSPASession"] = (voltmx.appinit.isNewSession == "true") ? true : false;
    if(window.location.hash) {
        var formObj = window[window.location.hash.substring(2)];
        if(formObj && !launchparams["isNewSPASession"]) {
            launchparams["isRefresh"] = true;
            launchparams["refreshForm"] = formObj;
        }
    }
    for(var prop in launchparams) {
        launchobj["launchparams"][prop] = launchparams[prop];
    }



    if(postappinit) {
        startform = postappinit(launchobj);
    }
    
    if(voltmx.appinit.isiPhone && voltmx.appinit.isSafari) {
        document.addEventListener('focusout', function() {
            if(window.scrollY) {
                window.scrollTo(0, 0);
            }
        });
    }

    if(deepfunc || appservice) {
        
        if(appservice) {
            startform = appservice(launchobj);
        } else if(deepfunc) {
            startform = deepfunc($KG["kdeepobj"]);
        }
    }

    if((startform == null) || (startform.length == 0)) {
        showstartref && showstartref(launchobj);
    } else {
        if(typeof startform == "string") {
            var homeform = $KU.getFormModel(startform);
            if(homeform) {
                homeform.show();
            } else {
                 _voltmx.mvc.navigate(startform);
            }

        } else {
            formmodel = startform;
            formmodel && formmodel.show();
        }

    }
    
    document.body.setAttribute('aria-busy', 'false');
    if($KG.appbehaviors["responsive"] === true) {
        $KU.addClassName(document.documentElement, 'responsive');
    }
    $KU.logExecutingFinished('voltmx.application.setApplicationInitializationEvents VIA end of the function ');
};


$KI.window = {
    openURL: function(url, params, name) {
        
        
        $KU.logExecuting('voltmx.application.openURL');
        $KU.logExecutingWithParams('voltmx.application.openURL', url, params, name);
        $KW.unLoadWidget();
        if(!name) name = "_blank";
        $KU.logExecutingFinished('voltmx.application.openURL');
        window.open(url, name);
    },

    openURLAsync: function(config) {
        $KU.logExecuting('voltmx.application.openURLAsync');
        var url, callback;
        if(!config) {
            $KU.logErrorMessage('Invalid parameter');
            return;
        }
        $KU.logExecutingWithParams('voltmx.application.openURLAsync', config);
        url = config.url;
        callback = config.callback;
        window.open(url, "_blank");
        $KU.logExecutingFinished('voltmx.application.openURLAsync');
        callback && callback(constants.OPEN_URL_UNKNOWN);
    },

    alert: function(message, alertHandler, alertType) {
        if(message === null) return;

        var msgstr = message;
        var hndlr = alertHandler || null;
        var alerttype = alertType || null;

        if(message.message || message.alerttype || message.alertType) {
            alerttype = message.alerttype || message.alertType;
            msgstr = message.message;
            hndlr = message.alerthandler || message.alertHandler || null;
        }

        if(alerttype === constants.ALERT_TYPE_INFO || alerttype === constants.ALERT_TYPE_ERROR || !alerttype) {
            alert(msgstr);
            hndlr && hndlr();
        } else if(alerttype === constants.ALERT_TYPE_CONFIRMATION) {
            var answer = confirm(msgstr);
            hndlr && hndlr(answer);
        }
    },

    openMediaURL: function() {
        $KU.logWarnMessage('openMediaURL not supported in SPA');
    },

    
    showLoadingScreen: function() {
        $KU.logExecuting('voltmx.application.showLoadingScreen');
        $KU.logExecutingWithParams('voltmx.application.showLoadingScreen');
        $KG.__dismissed = false;
        var skin = arguments[0];
        var text = arguments[1] || "";
        var position = arguments[2] || constants.LOADING_SCREEN_POSITION_FULL_SCREEN;
        var isBlocked = (arguments[3] === false) ? false : true;
        var showProgressIndicator = (arguments[4] === false) ? false : true;
        var indicator = showProgressIndicator ? "<img src='" + $KU.getImageURL("loading.gif") + "' style='vertical-align:middle'/>" : "";
        text = text ? "<label style='padding:10px; xfont-size: 16px;color:" + (skin ? ' inherit;' : 'white;') + (!showProgressIndicator ? "display: block;" : "") + "'>" + text + "</label>" : "";

        
        $KU.createa11yDynamicElement();

        var loadingDiv = document.getElementById("__loadingScreenDiv");
        var divTag = loadingDiv || document.createElement("div");
        
        if($KU.isWindowsPhone) {
            divTag.onclick = function() {
                var event = window.event;
                if(event) {
                    voltmx.events.preventDefault(event);
                    voltmx.events.stopPropagation(event);
                }
            }

        }
        divTag.id = "__loadingScreenDiv";
        divTag.style.zIndex = "100";
        divTag.style.visibility = "hidden";
        divTag.style.backgroundColor = "";
        var topPos = "50%";
        $KG.bgImgHeight = 0;
        divTag.className = "";

        var setLoadingPosition = function(event) {
            if($KG.__dismissed)
                return;

            if(!event)
                event = window.event;
            if(event && event.type == 'error')
                document.body.appendChild(divTag);
            else {
                var tagName, wrapDiv = "";
                if(event && event.type == 'load') {
                    tagName = event.srcElement.tagName;
                    $KG.bgImgHeight = event.srcElement.naturalHeight;
                } else
                    wrapDiv = document.querySelector("div[id='__wrapperDiv']");

                var bgPos, posY, screenH;
                var scrolledHeight = 0;
                if($KG.nativeScroll) {
                    
                    var mainContainerHeight = document.getElementById("__MainContainer").clientHeight;
                    if(mainContainerHeight < (window.innerHeight || document.body.clientHeight))
                        divTag.style.height = (window.innerHeight || document.body.clientHeight) + "px";
                    else
                        divTag.style.height = mainContainerHeight + "px";
                    if($KU.isIDevice)
                        scrolledHeight = document.body.scrollTop || window.pageYOffset; 
                }

                
                document.body.appendChild(divTag);
                
                screenH = $KG["__innerHeight"] || window.innerHeight || document.body.clientHeight;
                divTag.style.display = "";
                divTag.style.visibility = "visible";
                var bias;
                var innerDiv = divTag.firstChild;
                if(tagName && tagName.toLowerCase() == "img") {
                    bias = event.srcElement.naturalHeight;
                } else if(wrapDiv) {
                    
                    if(wrapDiv.firstChild && wrapDiv.firstChild.tagName.toLowerCase() == "img") {
                        bias = wrapDiv.firstChild.naturalHeight;
                    } else { 
                        bias = $KG.bgImgHeight || innerDiv.clientHeight || 0;
                    }
                } else {
                    bias = innerDiv.clientHeight;
                }

                posY = Math.round(scrolledHeight + (screenH - bias) / 2) + "px";
                bgPos = "50% " + parseInt(posY, 10) + "px";
                divTag.style.backgroundPosition = bgPos;
                topPos = posY;
                innerDiv.style.top = posY;
                var labelEle = document.querySelector("#__loadingScreenDiv label");
                labelEle = labelEle && labelEle.textContent;
                labelEle && $KU.changea11yDynamicElement(labelEle);
                
                
            }
        };

        var orientationEvent = ($KU.isOrientationSupported && !$KU.isAndroid) ? "onorientationchange" : "onresize";
        voltmx.events.addEvent(orientationEvent, "loadingScreen", function() {
            setTimeout(setLoadingPosition, $KU.orientationDelay)
        });
        
        if(position == constants.LOADING_SCREEN_POSITION_FULL_SCREEN || isBlocked) {
            divTag.className = "popuplayer absoluteContainer ";
            if($KG.nativeScroll && !$KU.isIDevice)
                divTag.style.position = "fixed";
            divTag.style.top = 0;
            if(position == constants.LOADING_SCREEN_POSITION_FULL_SCREEN) {
                divTag.style.backgroundPosition = "center";
                divTag.className += skin;
                var bgColor = $KU.getCSSPropertyFromRule(skin, 'background-color');
                if(bgColor && bgColor != "initial" && bgColor != "inherit") {
                    if($KU.isWindowsPhone && bgColor == "transparent") 
                        divTag.style.background = "url(data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7)";
                    else
                        divTag.style.backgroundColor = bgColor;
                }
            }
        }

        var wrapperDiv = "<div id ='__wrapperDiv'>";
        
        var style = "xcolor:white;position:absolute;width:100%;z-index:100;text-align:center;";
        if($KG["nativeScroll"] && $KU.isBlackBerryNTH) {
            style = "xcolor:white;position:fixed;width:100%;z-index:100;text-align:center;";
        }
        var className = "";
        if(position == constants.LOADING_SCREEN_POSITION_ONLY_CENTER) {
            var height = $KU.getCSSPropertyFromRule(skin, 'height');
            if(height) {
                height = height.replace("%", "");
                height = parseInt((height * (window.innerHeight) / 100), 10);
                style += "height:" + height + "px !important";
            }
            className = skin;
            style += "background-position: center;";
        }

        divTag.innerHTML = "<div id='__innerDiv' class='" + className + "' style='" + style + "'>" + wrapperDiv + indicator + text + "</div></div>";
        var backgroundImage = "";

        if(showProgressIndicator) {
            
            backgroundImage = $KU.getImageURL("loading.gif");
            $KU.imagePreloader(backgroundImage, setLoadingPosition);
        } else {
            
            backgroundImage = $KU.getCSSPropertyFromRule(skin, 'background-image');
            if(backgroundImage && backgroundImage != "none" && backgroundImage != "initial" && backgroundImage != "inherit") {
                backgroundImage = backgroundImage.split("/").pop().split(')')[0].split('"')[0];
                backgroundImage = $KU.getImageURL(backgroundImage);
                $KU.imagePreloader(backgroundImage, setLoadingPosition);
            } else
                setLoadingPosition();
        }

        
        if(!loadingDiv && $KG["nativeScroll"]) {
            function preventScroll(e) {
                var evt = e || window.event;
                voltmx.events.preventDefault(evt);
                voltmx.events.stopPropagation(evt);
                return false;
            }

            voltmx.events.addEventListener(divTag, $KU.isTouchSupported ? 'touchstart' : 'mousedown', preventScroll);
            voltmx.events.addEventListener(divTag, $KU.isTouchSupported ? 'touchmove' : 'mousemove', preventScroll);

        }
        $KU.logExecutingFinished('voltmx.application.showLoadingScreen');
    },

    dismissLoadingScreen: function() {
        $KU.logExecuting('voltmx.application.dismissLoadingScreen');
        $KU.logExecutingWithParams('voltmx.application.dismissLoadingScreen');
        var loadingDiv = document.getElementById("__loadingScreenDiv");
        if(loadingDiv)
            loadingDiv.style.display = "none";
        $KG.__dismissed = true;
        $KU.logExecutingFinished('voltmx.application.dismissLoadingScreen');
    },

};

$KI.exit = function() {
    $KU.logExecuting('voltmx.application.exit');
    $KU.logExecutingWithParams('voltmx.application.exit');
    if($KU.isIDevice || !$KU.isMob) {
        window.open('', '_self', '');
        $KU.logExecutingFinished('voltmx.application.exit');
        window.close();
    }

};

$KI.appreset = function() {
    voltmx.web.logger("warn", "appreset not supported in SPA");
};

$KI.assert = function(arg1, arg2) {
    if(null === args1 || false === args2) {
        if(arguments.length > 1) {
            if(typeof(args2) === "string") {
                throw new Error(args2);
            } else {
                throw new Error("Invalid argument to assert");
            }
        } else {
            throw new Error("Assertion failed");
        }
    } else {
        return arg1;
    }
};

$KI.type = function(arg) {
    var result;

    if(typeof(arg) == "undefined" || arg + "" == "null") {
        result = IndexJL ? "nil" : "null";
    } else
    if(typeof(arg) === "boolean") {
        result = "boolean";
    } else
    if(typeof(arg) === "number") {
        result = "number";
    } else
    if(typeof(arg) === "string") {
        result = "string";
    } else
    if(typeof(arg) === "function") {
        result = "function";
    } else {
        result = IndexJL ? "table" : "object";
    }
    return result;
};

$KI.converttobase64 = function(rawbytes) {
    $KU.logExecuting('voltmx.convertToBase64');
    $KU.logExecutingWithParams('voltmx.convertToBase64', rawbytes);
    $KU.logExecutingFinished('voltmx.convertToBase64');
    return $KU.getBase64(rawbytes);
};

$KI.converttorawbytes = function() {
    $KU.logWarnMessage('converttorawbytes api not supported in SPA');
};

$KI.setappheaders = function(headers) {
    voltmx.app.headers = {};

    if(IndexJL) headers.splice(0, 1);

    for(i = 0; i < headers.length; i++) {
        voltmx.app.headers[headers[i].id] = headers[i];
        _voltmxConstNS.Form2.prototype.createFormLevelHierarchy.call(headers[i], headers[i].ownchildrenref);
    }
};

$KI.setappfooters = function(footers) {
    voltmx.app.footers = {};

    if(IndexJL) footers.splice(0, 1);

    for(i = 0; i < footers.length; i++) {
        voltmx.app.footers[footers[i].id] = footers[i];
        _voltmxConstNS.Form2.prototype.createFormLevelHierarchy.call(footers[i], footers[i].ownchildrenref);
    }
};

$KI.setapplicationcallbacks = function() {
    voltmx.web.logger("warn", "setApplicationCallbacks API is not supported on SPA, DesktopWeb and Responsive Web");
};

$KI.addapplicationcallbacks = function() {
    voltmx.web.logger("warn", "addApplicationCallbacks API is not supported on SPA, DesktopWeb and Responsive Web");
};

$KI.removeapplicationcallbacks = function() {
    voltmx.web.logger("warn", "removeApplicationCallbacks API is not supported on SPA, DesktopWeb and Responsive Web");
};

$KI.setapplicationbehaviors = function(appbehavior) {
    var prop, FORMCONTROLLERSYNCLOAD = 'FormControllerSyncLoad';
    $KU.logExecuting('voltmx.application.setApplicationBehaviors');
    $KU.logExecutingWithParams('voltmx.application.setApplicationBehaviors', appbehavior);
    if(!$KG.appbehaviors) {
        $KG.appbehaviors = appbehavior;
    } else {
        for(prop in appbehavior) {
            if(FORMCONTROLLERSYNCLOAD === prop && undefined === $KG.appbehaviors[prop]) {
                Object.defineProperty($KG.appbehaviors, FORMCONTROLLERSYNCLOAD, {
                    value: appbehavior[prop],
                    writable: false
                });
            } else {
                $KG.appbehaviors[prop] = appbehavior[prop];
            }
        }
    }
    $KU.logExecutingFinished('voltmx.application.setApplicationBehaviors');
};

$KI.getapplicationbehavior = function(prop) {
    return $KG.appbehaviors && $KG.appbehaviors[prop];
};

$KI.setupWidgetDataRecording = function(XMLmode) {
    
    if(appConfig.isDebug && (XMLmode.mode === 0 || XMLmode.mode === 1)) {
        var XMLbutton = document.createElement("BUTTON");
        XMLbutton.innerHTML = "Generate XML";
        XMLbutton.style.zIndex = 100000;
        XMLbutton.style.position = "fixed";
        XMLbutton.style.top = "0px";
        document.body.appendChild(XMLbutton);
        XMLbutton.addEventListener('click', function() {
            console.log($KC.generateXMLFormJSON());
        });
        $KC.isRecording = true;
    }
};

$KI.setSeoDataReadyFlag = function() {
    $KU.logExecuting('voltmx.application.setSeoDataReadyFlag');
    $KU.logExecutingWithParams('voltmx.application.setSeoDataReadyFlag');
    document.body.setAttribute('data-ready', 1);
    $KU.logExecutingFinished('voltmx.application.setSeoDataReadyFlag');
};

$KI.removeSeoDataReadyFlag = function() {
    $KU.logExecuting('voltmx.application.removeSeoDataReadyFlag');
    $KU.logExecutingWithParams('voltmx.application.removeSeoDataReadyFlag');
    document.body.removeAttribute('data-ready');
    $KU.logExecutingFinished('voltmx.application.removeSeoDataReadyFlag');
};

VoltmxError = function(errorcode, name, message) {
    this.errorCode = this.errorcode = errorcode;
    this.name = name;
    this.message = message;
};


VoltmxError.prototype = new Error();
VoltmxError.prototype.constructor = VoltmxError;

voltmx.getError = function(e) {
    $KU.logExecuting('voltmx.getError');
    $KU.logExecutingWithParams('voltmx.getError', e);
    $KU.logExecutingFinished('voltmx.getError');
    return e;
};

voltmx.bm = {
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    

    
    
    FORM_PREFIX: '#_',
    GSTATE_PREFIX: '/',

    __global_state__: {},
    __check_args__: function(args, count) {
        if(args.length != count) {
            $KU.logErrorMessage("Invalid number of arguments. Expected: " + count + ", Given: " + args.length);
            throw new Error("Invalid number of arguments. Expected: " + count + ", Given: " + args.length);
        }

        
        
        
        for(var i in args) {
            if(typeof(args[i]) === 'undefined') {
                throw new Error("Invalid arg[" + i + "] in " + args);
            }
        }
    },

    


    __initialized__: false,
    
    
    __init__: function() {
        var hp = window.location.href;
        if(hp.indexOf("http") == 0) {
            hp = voltmx.bm.__get_hash__(hp);
        }
        var stateStr = voltmx.bm.__get_raw_state__(hp);
        if(stateStr) {
            voltmx.bm.__global_state__ = JSON.parse(decodeURI(stateStr));
        }
        voltmx.bm.__initialized__ = true;
    },

    
    
    __update_hash__: function() {
        var jsonStr = JSON.stringify(voltmx.bm.__global_state__);
        var currentFormId = voltmx.bm.getFormId(window.location.hash);
        window.location.hash = voltmx.bm.FORM_PREFIX + currentFormId + voltmx.bm.GSTATE_PREFIX + encodeURI(jsonStr);
    },

    __get_hash__: function(href) {
        return href.substr(href.indexOf(voltmx.bm.FORM_PREFIX));
    },

    __get_raw_state__: function(hash_part) {
        var hp = hash_part; 
        var indexOfStateBegin = hp.indexOf(voltmx.bm.GSTATE_PREFIX);
        var rawState = ""; 
        if(indexOfStateBegin > 0) { 
            rawState = hp.substr(hp.indexOf(voltmx.bm.GSTATE_PREFIX) + voltmx.bm.GSTATE_PREFIX.length);
        }
        return rawState;
    },


    
    

    getFormId: function(hash_part) {
        var hp = hash_part; 
        if(!hp) { 
            hp = location.hash;
        }
        var formAndState = hp.substr(hp.indexOf(voltmx.bm.FORM_PREFIX) + voltmx.bm.FORM_PREFIX.length);
        var indexOfStateBegin = formAndState.indexOf(voltmx.bm.GSTATE_PREFIX);

        var formId;
        if(indexOfStateBegin < 0) { 
            formId = formAndState;
        } else {
            formId = formAndState.substr(0, indexOfStateBegin);
        }
        return formId;
    },

    
    

    
    
    
    
    
    setBMState: function(formId, json) {
        $KU.logExecuting('voltmx.application.setBMState');
        $KU.logExecutingWithParams("voltmx.application.setBMState", formId, json);
        voltmx.bm.__check_args__(arguments, 2);
        if(!voltmx.bm.__initialized__) {
            voltmx.bm.__init__();
        }
        voltmx.bm.__global_state__[formId] = json;
        voltmx.bm.__update_hash__();
        $KU.logExecutingFinished('voltmx.application.setBMState');
    },

    
    
    resetBMState: function(formId) {
        $KU.logExecuting('voltmx.application.resetBMState');
        $KU.logExecutingWithParams('voltmx.application.resetBMState', formId);
        voltmx.bm.__check_args__(arguments, 1);
        if(!voltmx.bm.__initialized__) {
            voltmx.bm.__init__();
        }
        delete voltmx.bm.__global_state__[formId];
        voltmx.bm.__update_hash__();
        $KU.logExecutingFinished('voltmx.application.resetBMState');
    },

    
    
    
    
    
    
    addBMState: function(formId, name, value) {
        $KU.logExecuting('voltmx.application.addBMState');
        voltmx.bm.__check_args__(arguments, 3);
        if(!voltmx.bm.__initialized__) {
            voltmx.bm.__init__();
        }
        $KU.logExecutingWithParams('voltmx.application.addBMState', formId, name, value);
        var s = voltmx.bm.getBMState(formId);
        if(!s) {
            s = {};
            voltmx.bm.setBMState(formId, s);
        }
        s[name] = value;
        voltmx.bm.__update_hash__();
        $KU.logExecutingFinished('voltmx.application.addBMState');
    },

    
    
    
    removeBMState: function(formId, name) {
        $KU.logExecuting('voltmx.application.removeBMState');
        $KU.logExecutingWithParams('voltmx.application.removeBMState', formId, name);
        voltmx.bm.__check_args__(arguments, 2);

        if(!voltmx.bm.__initialized__) {
            voltmx.bm.__init__();
        }
        var s = voltmx.bm.getBMState(formId);
        if(s) {
            delete s[name];
            voltmx.bm.__update_hash__();
        }
        $KU.logExecutingFinished('voltmx.application.removeBMState');
    },

    
    
    getBMState: function(formId) {
        $KU.logExecuting('voltmx.application.getBMState');
        $KU.logExecutingWithParams('voltmx.application.getBMState', formId);
        voltmx.bm.__check_args__(arguments, 1);

        if(!voltmx.bm.__initialized) {
            voltmx.bm.__init__();
        }
        $KU.logExecutingFinished('voltmx.application.getBMState');
        return voltmx.bm.__global_state__[formId];
    }
};

$KI.setUncaughtExceptionHandler = function(uncaughtExceptionHandler) {
    if(uncaughtExceptionHandler === null) {
        $KI.uncaughtExceptionHandler = null;
    } else if(typeof uncaughtExceptionHandler === 'function') {
        $KI.uncaughtExceptionHandler = uncaughtExceptionHandler;
    }
};

$KI.getUncaughtExceptionHandler = function() {
    return $KI.uncaughtExceptionHandler;
};

window.onerror = function(message, url, line, column, error) {
    var exceptionObject, stack;

    if($KI.uncaughtExceptionHandler) {
        exceptionObject = {
            "message": message,
            "sourceURL": url,
            "line": line,
            "column": column,
            "error": error
        };

        $KI.uncaughtExceptionHandler(exceptionObject);
    } else if(spaAPM) {
        spaAPM.apmErrorHandler(message, url, line, column, error);
    }

    if(appConfig.isDebug && appConfig.testAutomation && window.jasmineOnError) {
        if(arguments instanceof VoltmxError) {
            window.jasmineOnError(arguments);
        } else {
            stack = error ? error.stack : null;
            window.jasmineOnError({
                'name': 'jasmineException',
                'errorCode': '200', 
                'message': message,
                'sourceURL': url,
                'line': line,
                'stack': stack
            });
        }
    }
};
