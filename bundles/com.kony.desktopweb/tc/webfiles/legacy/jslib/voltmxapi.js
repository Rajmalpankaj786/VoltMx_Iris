$KI.push = (function() {
    var module = {};
    var onsuccessfulregistration, onfailureregistration;
    var onlinenotification, offlinenotification;
    var onsuccessfulderegistration, onfailurederegistration;
    var messaging;

    (function(){
        var pusInterval = setInterval(function() {
            if(voltmx.isformRenderd) {
                clearInterval(pusInterval);
                var config = localStorage.getItem($KG["appid"] + "_" + "pushConfig");
                if(config) {
                    config = JSON.parse(config);
                    if(!messaging) {
                        firebase.initializeApp(config);
                        messaging = firebase.messaging();
                        messaging.usePublicVapidKey(config.publicKey);
                    }
                    messaging.onMessage(function(payload) {
                        voltmx.web.logger("log", 'Push notification received data is '+ JSON.stringify(payload));
                        onlinenotification && onlinenotification(payload);
                    });
                }
            }
        }, 1000);
    })();

    
    
    module.setCallbacks = function(data) {
        $KU.logExecuting('voltmx.push.setCallbacks');
        $KU.logExecutingWithParams('voltmx.push.setCallbacks', data);
        onsuccessfulregistration  = data.onsuccessfulregistration;
        onfailureregistration = data.onfailureregistration;
        onlinenotification = data.onlinenotification;
        offlinenotification = data.offlinenotification;
        onsuccessfulderegistration = data.onsuccessfulderegistration;
        onfailurederegistration = data.onfailurederegistration;
        $KU.logExecutingFinished('voltmx.push.setCallbacks');
    };

    module.register = function (config) {
        $KU.logExecuting('voltmx.push.register');
        if (!firebase.messaging.isSupported()) {
            $KU.logWarnMessage('Browser does not have the Push Notifications');
            return;
        }
        if(!messaging) {
            $KU.logExecutingWithParams('voltmx.push.register', config);
            firebase.initializeApp(config);
            messaging = firebase.messaging();
            messaging.usePublicVapidKey(config.publicKey);
            __getPermission(config);
            $KU.logExecutingFinished('voltmx.push.register');
        }
    };

    function __getPermission(config) {
        messaging.requestPermission().then(function() {
            voltmx.web.logger("log", 'Notification permission granted.');
            
            if(voltmxSwRegistration) {
                voltmx.web.logger("log", 'Service worker registration succeeded.');
                messaging.useServiceWorker(voltmxSwRegistration);
                localStorage.setItem($KG["appid"] + "_" + "pushConfig", JSON.stringify(config));
                __getToken(messaging);
            } else {
                voltmx.web.logger("log", "Service worker registration failed:"+ error);
                onfailureregistration && onfailureregistration({"errorCode": "1406",
                                                                "errormessage": "Service worker registration failed"});
            }
         }).catch(function(err) {
            voltmx.web.logger("log", "Unable to get permission to notify."+ err);
            onfailureregistration && onfailureregistration({"errorCode": "1403",
                                                            "errormessage": "permission is not available"});
        });
    }


    function __getToken(messaging) {
        messaging.getToken().then(function(token) {
            if(token) {
                localStorage.setItem($KG["appid"] + "_" + "pushId", token);
                voltmx.web.logger("log", "token is "+ token);
                messaging.onMessage(function(payload) {
                    voltmx.web.logger("log", 'Push notification received. Data is '+ JSON.stringify(payload));
                    onlinenotification && onlinenotification(payload);
                });
                onsuccessfulregistration(token);
            } else {
                voltmx.web.logger("log", "No Instance ID token available. Request permission to generate one.");
                onfailureregistration && onfailureregistration({"errorCode": "1403",
                                                                "errormessage": "Unknown Error"});
            }
        }).catch(function(err) {
            voltmx.web.logger("log", "An error occurred while retrieving token. "+ err);
            onfailureregistration && onfailureregistration({"errorCode": "1402",
                                                            "errormessage": "PNS token is not available"});

        })
    }

   module.deregister = function() {
        $KU.logExecuting('voltmx.push.deRegister');
        var config = localStorage.getItem($KG["appid"] + "_" + "pushConfig");
        config =  JSON.parse(config);
        var token =localStorage.getItem($KG["appid"] + "_" + "pushId");

        if(config && token) {
            $KU.logExecutingWithParams('voltmx.push.deRegister');
            messaging.deleteToken(token).then(function() {
                voltmx.web.logger("log", "succssfully unregistered from FCM.");
                onsuccessfulderegistration && onsuccessfulderegistration();
                localStorage.removeItem($KG["appid"] + "_" + "pushId");
                localStorage.removeItem($KG["appid"] + "_" + "pushConfig");
            }).catch(function(err) {
                $KU.logErrorMessage("unable to unregister from FCM."+ JSON.stringify(err));
                onfailurederegistration && onfailurederegistration();
            })
        } else {
            $KU.logWarnMessage('User is not subscribed for FCM');
        }
        $KU.logExecutingFinished('voltmx.push.deRegister');
    };

    return module;
}());

$KI.HoverInit = function(widgetModel) {
    var node = this.node = $KU.getNodeByModel(widgetModel);
    if(node) {
        var nodeList = document.querySelectorAll("#" + node.id);
        for(var i = 0; i < nodeList.length; i++) {
            nodeList[i].onmouseenter = nodeList[i].onmousemove = nodeList[i].onmouseout = this.eventListener.bind(this);
        }
    }
};

$KI.HoverInit.prototype = {
    eventListener: function(event) {
        $KI.HoverEvent.executeHoverEvent(event, this.node);
    }
};

$KI.HoverEvent = {
    mouseOut: function(target, totg) {
        if(target == totg) return false;
        var node = totg;
        while(node) {
            node = node.parentNode;
            if(node == target) return false;
        }
        return true;
    },

    mouseIn: function(target, fromtg, totg) {

        if(target.contains(fromtg))
            return false;
        else
            return true;
    },

    executeHoverEvent: function(event, node) {
        var event = event || window.event;
        var target = event.currentTarget || node;
        if(!target) return;

        var widgetModel = $KU.getModelByNode(target),
            containerId = target.getAttribute("kcontainerID");
        if(!widgetModel) return;

        if(containerId) {
            var containerNode = $KU.getParentByAttributeValue(target, "kwidgettype", "Segment");
            if(!containerNode) {
                containerNode = $KU.getParentByAttributeValue(target, "kwidgettype", "DataGrid");
            }
            if(!containerNode) {
                
                voltmx.events.removeEventListener(target, 'mouseenter');
                voltmx.events.removeEventListener(target, 'mousemove');
                voltmx.events.removeEventListener(target, 'mouseout');
                return;
            }
        }

        if(event.type === "mouseout") {
            var totg = event.relatedTarget;
            var fromtg = event.target;
        } else if(event.type === "mouseenter") {
            var totg = event.target;
            var fromtg = event.relatedTarget;
        }

        if(event.type == "mousemove" || (event.type == "mouseenter" && $KI.HoverEvent.mouseIn(target, fromtg, totg)) ||
            (event.type == "mouseout" && $KI.HoverEvent.mouseOut(target, totg))) {
            

            var context = {};
            context.event = event.type;
            if(event.type === "mouseenter") {
                context.eventType = 0;
            } else if(event.type === "mousemove") {
                context.eventType = 1;
            } else if(event.type === "mouseout") {
                context.eventType = 2;
            }
            context.pageX = event.pageX || event.clientX;
            context.pageY = event.pageY || event.clientY;
            context.screenX = event.clientX || null;
            context.screenY = event.clientY || null;

            if(containerId) {
                var containerModel = $KW.Utils.getContainerModelById(target, containerId);
                if(!containerModel)
                    return;
                var eventReference = $KU.returnEventReference(widgetModel.onhover);

                if(containerModel.wType == "DataGrid") {
                    var indexNode = $KU.getParentByAttribute(target, "colindex");
                    var headerNode = $KU.getParentByAttribute(target, "index");
                    if(headerNode && headerNode.getAttribute("index")) {
                        if(parseInt(headerNode.getAttribute("index")) == 0) {
                            context.rowIndex = -1;
                        } else {
                            context.rowIndex = parseInt(indexNode.getAttribute("colindex").split(",")[0]);
                        }
                        context.columnIndex = parseInt(indexNode.getAttribute("colindex").split(",")[1]);
                    }

                    
                    var colheadInfo = containerModel.columnids[context.columnIndex];
                    var coldata = context.rowIndex == -1 ? containerModel.columnHeadersConfig[context.columnIndex] : containerModel.data[context.rowIndex][colheadInfo];
                    var widgetData = context.rowIndex == -1 ? coldata.columnheadertemplate.data : (containerModel.widgetdatamap ? coldata[containerModel.widgetdatamap[widgetModel.id]] : coldata[widgetModel.id]);
                    
                    if(widgetData && widgetData.onHover) {
                        eventReference = widgetData.onHover;
                    }

                } else if(containerModel.wType == "Segment") {
                    if(containerModel.viewtype == "pageview") {
                        var parentIndexNode = $KU.getParentByAttribute(target, "index");
                        context.sectionIndex = 0;
                        context.rowIndex = parentIndexNode.getAttribute("index");
                    } else {
                        var parentIndexNode = $KU.getParentByTagName(target, 'li');
                        if(parentIndexNode.getAttribute("secindex")) {
                            context.sectionIndex = parentIndexNode.getAttribute("secindex") ? parseInt(parentIndexNode.getAttribute("secindex").split(",")[0]) : "";
                            context.rowIndex = parentIndexNode.getAttribute("secindex") ? parseInt(parentIndexNode.getAttribute("secindex").split(",")[1]) : "";
                        } else if(parentIndexNode.getAttribute("index")) {
                            context.sectionIndex = 0;
                            context.rowIndex = parentIndexNode.getAttribute("index") ? parseInt(parentIndexNode.getAttribute("index").split(",")[0]) : "";
                        }
                        if((containerModel.selectionbehavior == constants.SEGUI_SINGLE_SELECT_BEHAVIOR) || (containerModel.selectionbehavior == constants.SEGUI_MULTI_SELECT_BEHAVIOR)) {
                            context.selectionState = false;
                            var selectedIndices = containerModel.selectedIndices;
                            if(selectedIndices) {
                                for(var i = 0; i < selectedIndices.length; i++) {
                                    if(context.sectionIndex == selectedIndices[i][0]) {
                                        var selectedRowArray = selectedIndices[i][1];
                                        for(var j = 0; j < selectedRowArray.length; j++) {
                                            if(context.rowIndex == selectedRowArray[j])
                                                context.selectionState = true;
                                        }
                                    }
                                }
                            }
                        }
                    }

                    
                    var rowdata = containerModel.hasSections ? (context.rowIndex == -1 ? containerModel.data[context.sectionIndex][IndexJL + 0] : containerModel.data[context.sectionIndex][IndexJL + 1][context.rowIndex]) : containerModel.data[context.rowIndex];
                    var widgetData = containerModel.widgetdatamap ? rowdata[containerModel.widgetdatamap[widgetModel.id]] : rowdata[widgetModel.id];
                    
                    if(widgetData && widgetData.onHover) {
                        eventReference = widgetData.onHover;
                    }

                }
                eventReference && $KU.executeWidgetEventHandler(widgetModel, eventReference, context);

            } else {
                if(widgetModel.onhover) {
                    widgetModel.onhover(widgetModel, context);
                }
            }
        }
    }
};

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

    preappinit && preappinit(launchobj);

    if($KC.isRecording == true) {
        $KC.widgetDataRecording = true;
    }


    $KU.setorientationDelay();

    appinit = $KU.returnEventReference(appinit);
    appinit && appinit(launchparams);

    if($KG.appbehaviors &&  $KG.appbehaviors[constants.API_LEVEL] >= constants.API_LEVEL_9000) {
        $KG.appbehaviors["stopLoadingScreenDismissOnFormNavigation"] = true;
    }
    if($KG.appbehaviors && $KG.appbehaviors["stopLoadingScreenDismissOnFormNavigation"] === true && !($KU.getElementById("__MainContainer"))) {
        document.body.innerHTML = "<div id='__MainContainer'></div>";
    }

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
            voltmxAutomationPath = appConfig.testAutomation.scriptsURL + "Desktop";

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
            $KG["__appservice"] = appservice; 
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
        if(params) {
            if(params.innewwindow == true) {
                var newurl = "_blank";
                var newurloptions = "";
                newurloptions = (params.width ? "width =" + params.width + "px," : "") + (params.height ? "height=" + params.height + "px," : "");
                if(!params.menubar && typeof params.menubar !== "undefined")
                    newurloptions = newurloptions + "menubar = no, ";
                if(!params.statusbar && typeof params.statusbar !== "undefined")
                    newurloptions = newurloptions + "statusbar = no, ";
                if(!params.toolbar && typeof params.toolbar !== "undefined")
                    newurloptions = newurloptions + "toolbar = no, ";
                if(!params.titlebar && typeof params.titlebar !== "undefined")
                    newurloptions = newurloptions + "titlebar = no";
                $KU.logExecutingFinished('voltmx.application.openURL');

                window.open(url, newurl, newurloptions);
            } else {
                $KU.logExecutingFinished('voltmx.application.openURL');
                window.open(url);
            }
        } else {
            $KU.logExecutingFinished('voltmx.application.openURL');
            window.open(url);
        }
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
        var skin = arguments[0];
        var text = arguments[1] || "";
        var position = arguments[2] || "fullscreen";
        var isBlocked = (arguments[3] === false) ? false : true;
        var showProgressIndicator = (arguments[4] === false) ? false : true;

        text = text ? "<label style='padding-left:20px; font-size: 16px; text-align:center;width:100%;display:inline-block'>" + text + "</label>" : "";
        var wrapperDiv = "<div id ='__wrapperDiv' style='top:50%;width:100%;position:fixed;'>";
        var loadingDiv = document.getElementById("__loadingScreenDiv");
        var divTag = loadingDiv || document.createElement("div");
        divTag.id = "__loadingScreenDiv";
        divTag.setAttribute("style", "");
        divTag.style.zIndex = "100";
        divTag.style.backgroundPosition = "center";
        divTag.style.width = "100%";
        divTag.style.position = "fixed";
        divTag.style.outline = "none";
        if(!skin && showProgressIndicator) {
            divTag.style.backgroundImage = "url('" + $KU.getImageURL("loading.gif") + "')";
            divTag.style.backgroundRepeat = "no-repeat";
        }

        divTag.innerHTML = wrapperDiv + text + "</div>";
        divTag.style.display = "block";

        var mainContainer = document.getElementById("__MainContainer");
        if($KG.appbehaviors && $KG.appbehaviors["stopLoadingScreenDismissOnFormNavigation"] === true) {
            document.body.appendChild(divTag);
        } else {
            if(mainContainer) {
                mainContainer.appendChild(divTag);
            } else {
                return;
            }
        };
        var wrapper = divTag.childNodes[0];
        if(wrapper.childNodes[0])
            wrapper.style.marginTop = -(wrapper.childNodes[0].offsetHeight / 2) + "px";

        if(position == "fullscreen" || isBlocked) {
            divTag.className = skin || "";
            divTag.style.top = 0;
            divTag.style.left = 0;
            divTag.style.bottom = 0;
            divTag.style.height = "100%";
        } else {
            wrapper.className = skin || "";
            divTag.style.top = "50%";
        }
        divTag.tabIndex = -1;
        divTag.focus();
        
        voltmx.events.addEventListener(document, "keydown", $KI.window.preventBGFocus);
    },

    preventBGFocus: function(event) {
        if(!event)
            event = window.event;
        var dialog = document.getElementById('__loadingScreenDiv');
        if(dialog && dialog.style.display != "none") {
            voltmx.events.preventDefault(event);
            
            
        }
    },

    dismissLoadingScreen: function() {
        var loadingDiv = document.getElementById("__loadingScreenDiv");
        if(loadingDiv) {
            loadingDiv.style.display = "none";
        }
        
        voltmx.events.removeEventListener(document, "keydown", $KI.window.preventBGFocus);

    }
};

$KI.exit = function() {
    $KU.logExecuting('voltmx.application.exit');
    $KU.logExecutingWithParams('voltmx.application.exit');
    if($KU.isIDevice || !$KU.isMob) {
        window.open('about:blank', '_self', '');
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

$KI.screenrecorder = (function() {
    var ScreenRecorder = [];
    var videoData = [];
    var tracks = [];
    var module = {
        start: function(config) {
            $KU.logExecuting('voltmx.screenrecorder.start');
            var framerate = 30;
            if(config && config.frameRate) {
                framerate = config.frameRate;
            }
            var constraints = { video: { frameRate: framerate } };
            if(!(navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia && typeof MediaRecorder != 'undefined')) {
                config.onFailure && config.onFailure('ScreenRecorder API is not supported by your browser');
            } else {
                navigator.mediaDevices.getDisplayMedia(constraints).then(function(stream) {
                    ScreenRecorder = new MediaRecorder(stream);
                    ScreenRecorder.start();
                    voltmx.web.logger('info', 'Recording Screen');
                    Videotracks = ScreenRecorder.stream.getVideoTracks();
                    Videotracks[0].onended = function() {
                        if(ScreenRecorder.state === 'recording'){
                            module.stop();
                        } else if (ScreenRecorder.state === 'paused') {
                            module.resume();
                            module.stop();
                        }
                    }
                    $KU.logExecutingFinished('voltmx.screenrecorder.start');
                }).catch( function(err) {
                    config.onFailure && config.onFailure(err);
                });
            }
        },

        stop: function() {
            var i = 0;
            if(ScreenRecorder && !(ScreenRecorder.state === 'inactive')) {
                $KU.logExecuting('voltmx.screenrecorder.stop');
                ScreenRecorder.stop();
                voltmx.web.logger('info', 'Recording stopped');
                tracks = ScreenRecorder.stream.getTracks();
                ScreenRecorder.ondataavailable = function(e) {
                    videoData.push(e.data);
                }
                for(i = 0; i < tracks.length; i++) {
                    tracks[i].stop();
                }
                $KU.logExecutingFinished('voltmx.screenrecorder.stop')
            }
        },

        pause: function() {
            if(ScreenRecorder && ScreenRecorder.state === 'recording') {
                $KU.logExecuting('voltmx.screenrecorder.pause');
                ScreenRecorder.pause();
                $KU.logExecutingFinished('voltmx.screenrecorder.pause');
            }
        },

        resume: function() {
            if(ScreenRecorder && ScreenRecorder.state === 'paused') {
                $KU.logExecuting('voltmx.screenrecorder.resume');
                ScreenRecorder.resume();
                $KU.logExecutingFinished('voltmx.screenrecorder.resume');
            }
        }
    }
    module.getrecordeddata = function() {
        if(ScreenRecorder && ScreenRecorder.state && ScreenRecorder.state === 'inactive') {
            $KU.logExecuting('voltmx.screenrecorder.getrecordeddata');
            var blob = new Blob(videoData, { type:'video/webm' });
            window.URL = window.URL || window.webkitURL;
            var videoBlobURL = window.URL.createObjectURL(blob);
            $KU.logExecutingFinished('voltmx.screenrecorder.getrecordeddata');
            return videoBlobURL;
        }
    }
    module.getrecordingstate = function() {
        $KU.logExecuting('voltmx.screenrecorder.getrecordingstate');
        if(ScreenRecorder && ScreenRecorder.state) {
            $KU.logExecutingFinished('voltmx.screenrecorder.getrecordingstate VIA screenrecorder played atleast Once');
            return ScreenRecorder.state;
        } else {
            $KU.logExecutingFinished('voltmx.screenrecorder.getrecordingstate VIA screenrecorder not played atleast once');
            return "inactive";
        }
    }
    return module;
}());

$KI.screenshot = function(config) {
    var filereader = new FileReader();
    var cssscript = '',
        i = 0,
        j = 0,
        data = '',
        svg = [];
    var formModel = voltmx.application.getCurrentForm(),
        formNode = $KU.getNodeByModel(formModel),
        clone = formNode.cloneNode([true]),
        headerNode = document.getElementById('header_container'),
        footerNode = document.getElementById('footer_container'),
        appmenuNode = document.getElementById('voltmxappmenudiv');
    var sWidth = formNode.scrollWidth;
    var sHeight = formNode.scrollHeight;
    var Script = '';
    var tempCSS = document.styleSheets;
    if(voltmx.appinit.isIE11) {
        return;
    }
    for(i = 0; i < tempCSS.length; i++) {
        if(tempCSS[i].href) {
            for(j = 0; j < tempCSS[i].rules.length; j++) {
                cssscript = cssscript + tempCSS[i].rules[j].cssText;
            }
        }
    }
    if(headerNode) {
        sHeight = sHeight + headerNode.clientHeight;
        Script = Script + (new XMLSerializer).serializeToString(headerNode);
    }
    for(i = 0; i < clone.childNodes.length; i++) {
        Script = Script + (new XMLSerializer).serializeToString(clone.childNodes[i]);
    }
    if(footerNode) {
        sHeight = sHeight + footerNode.clientHeight;
        Script = Script + (new XMLSerializer).serializeToString(footerNode);
    }
    if(appmenuNode) {
        sHeight = sHeight + appmenuNode.clientHeight;
        Script = Script + (new XMLSerializer).serializeToString(appmenuNode.parentElement);
    }
    data =  '<svg xmlns="http://www.w3.org/2000/svg" width="' + sWidth + '" height="' + sHeight + '">' +
            '<foreignObject width="100%" height="100%">' +
            '<div xmlns="http://www.w3.org/1999/xhtml" style="font-size:40px">' +
            '<style>' +
            cssscript +
            '</style>'+
            Script +
            '</div>' +
            '</foreignObject>' +
            '</svg>';
    svg = new Blob([data], {type: 'image/svg+xml;charset=utf-8'});
    filereader.readAsDataURL(svg);
    filereader.onload = function() {
        var img = new Image();
        img.setAttribute('crossOrigin', 'anonymous');
        img.src = filereader.result;
        img.height = sHeight;
        img.width = sWidth;
        img.style.display = 'none';
        document.body.appendChild(img);
        img.onload = function() {
                var canvas = document.createElement('canvas'),
                    ctx = [];
                canvas.width = img.width ;
                canvas.height = img.height;
                canvas.style.display = 'none';
                document.body.appendChild(canvas);
                ctx = canvas.getContext('2d');
                ctx.imageSmoothingEnabled = true;
                ctx.drawImage(img, 0, 0);
                document.body.removeChild(img);
                document.body.removeChild(canvas);
                config.callback && config.callback(canvas.toDataURL().split(",")[1]);
        }
    }
}