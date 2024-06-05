var voltmx = voltmx || {};
voltmx.api = voltmx.api || {};
voltmx.app = voltmx.app || {};
voltmx.globals = voltmx.globals || {};
voltmx.system = voltmx.system || {};
voltmx.widgets = voltmx.widgets || {};
voltmx.io = voltmx.io || {};
voltmx.apm = voltmx.apm || {};
voltmx.cop = voltmx.cop || {};
voltmx.automation = voltmx.automation || {};
voltmx.isformRenderd = true; 
voltmx.enableGetterSetters = false; 
voltmx.constants = voltmx.constants || {
            VOLTMX_WIDGET_TYPE: "kwidgettype",
            SELECTED_ITEM: "selecteditem",
            IMAGE_PATH: "images",
            RESOURCES_PATH: "resources",
            TRANSLATION_PATH: "strings",
            TRANSLATION_EXT: "js",
            MODE: "s",
            RUNMODE: "debug",
            APPSTATE: 0,
            PRINTSTUB: "@printlevel"
        };
spaAPM = null;
$KAR = null;
_voltmx = {
        mvc: {}
    };
com = {};
com.voltmx = com.voltmx || {};
voltmxchannel = "wap"; 
kiden = "useragent"; 
$KC = voltmx.cop;
$KI = voltmx.api;
$KW = voltmx.widgets;
$KG = voltmx.globals;
$KIO = voltmx.io;
$KA = voltmx.apm;
$KAU = voltmx.automation;
$KG.allforms = {};
$KG.allTemplates = {};
$KG.appbehaviors = {};
$KG.widgetPositions = {};
$KG["cwtexists"] = [];
$KG["retina"] = "";
$KG["imagecat"] = "";
$KG["uniqueId"] = 0; 
$KG["animStyleSheet"] = "";
app = {
    headers: {},
    footers: {}
}

$KI.print = voltmx.print = function(str) {
    if(voltmx.constants.RUNMODE == "debug" && voltmx.constants.PRINTSTUB !== "true") {
        
        if(voltmx.constants.MODE == "s") {
            if(typeof JSON != "undefined" && typeof str == "object")
                console.log(JSON.stringify(str, $KU.jsonReplacer));
            else
                console.log(str);
        } else {
            alert(str);
        }
    }
};

voltmx.web = {};
voltmx.web.logger = function(level, msg) {
    var shouldUseLogger = ($KG.appbehaviors.enableLoggerFramework === true && voltmx.perflog.logger) ? true : false;

    switch(level) {
        case "log":
            if(shouldUseLogger) {
                voltmx.perflog.log('info', msg);
            } else {
                voltmx.print(msg);
            }
            break;

        case "warn":
            if(shouldUseLogger) {
                voltmx.perflog.log('warn', msg);
            } else {
                console.warn(msg);
            }
            break;
        case "error":
            if(shouldUseLogger) {
                voltmx.perflog.log('error', msg);
            } else {
                console.error(msg);
            }
            break;
        case "trace":
            if(shouldUseLogger) {
                voltmx.perflog.log('trace', msg);
            } else {
                voltmx.print(msg);
            }
            break;
        case "debug":
            if(shouldUseLogger) {
                voltmx.perflog.log('debug', msg);
            } else {
                voltmx.print(msg);
            }
            break;
        case "perf":
            if(shouldUseLogger) {
                voltmx.perflog.log('perf', msg);
            } else {
                voltmx.print(msg);
            }
            break;
        default:
            if(shouldUseLogger) {
                voltmx.perflog.log('info', msg);
            } else {
                voltmx.print(msg);
            }
    }
};

voltmx.perflog = {
    logger: null,

    loggerInit: function() {
        this.logger = voltmx.logger.createNewLogger("VoltmxFrameworkLogger", new voltmx.logger.createLoggerConfig());
        if(appConfig.isDebug === true) {
            voltmx.logger.activatePersistors(voltmx.logger.consolePersistor);
            voltmx.logger.currentLogLevel = voltmx.logger.logLevel.ALL;
            this.logger.setIndirectionLevel(3);
        }
    },

    log: function(logLevel, message) {
        this.logger[logLevel](message);
    }
};




if(typeof console === "undefined") {
    var alertFallback = false;
    var warnFallback = false;
    var errorFallback = false;

    console = {};
    console.log = function(msg) {
        alertFallback && alert(msg);
    };
    console.warn = function(msg) {
        warnFallback && alert(msg);
    };
    console.error = function(msg) {
        errorFallback && alert(msg);
    };
}
voltmx.appinit = {
    index: 0,
    JSMapFileCount: 0,
    head: document.getElementsByTagName('head')[0],
    debugFilesCount: 0,
    foldertype: "JSFiles",


    vendor: (/trident/gi).test(navigator.userAgent) ? 'ms' : ((/webkit/i).test(navigator.userAgent) && !(/edge/i).test(navigator.userAgent)) ? 'webkit' : (/firefox/i).test(navigator.userAgent) ? 'Moz' : 'opera' in window ? 'o' : ((/msie/i).test(navigator.userAgent) || (/rv:([1][1-9])/i).test(navigator.userAgent)) ? 'ms' : '',
    isIE: window.navigator.appVersion.match(/MSIE (\d+)/) != null || (/rv:([1][1-9])/i).test(navigator.userAgent),
    isIE7: window.navigator.appVersion.match(/MSIE (\d+)/) != null && RegExp.$1 == "7",
    isIE8: window.navigator.appVersion.match(/MSIE (\d+)/) != null && RegExp.$1 == "8",
    isIE9: window.navigator.appVersion.match(/MSIE (\d+)/) != null && RegExp.$1 == "9",
    isIE10: navigator.userAgent.match(/MSIE (\d+)/) != null && RegExp.$1 == "10",
    isIE11: (/rv:([1][1-9])/i).test(navigator.userAgent),
    isEdge: (/edge/gi).test(navigator.userAgent),
    isFirefox: window.navigator.userAgent.indexOf("Firefox") >= 0,
    isChrome: window.navigator.userAgent.indexOf("Chrome") >= 0,
    isSafari: (window.navigator.userAgent.indexOf("Safari") >= 0) && !((window.navigator.userAgent.indexOf("Chrome") >= 0) || (window.navigator.userAgent.indexOf("CriOS") >= 0) || (window.navigator.userAgent.indexOf("GSA") >= 0)), 
    isOpera: window.navigator.userAgent.indexOf("Opera") >= 0,
    isAndroid: (/android/gi).test(navigator.userAgent) && !((/trident/gi).test(navigator.userAgent)) && !((/edge/gi).test(navigator.userAgent)),
    isIDevice: (/iphone|ipad/gi).test(navigator.userAgent) && !((/trident/gi).test(navigator.userAgent)),
    isiPhone: (/iphone/gi).test(navigator.userAgent) && !((/trident/gi).test(navigator.userAgent)),
    isiPod: (/ipod/gi).test(navigator.userAgent),
    isiPad: (/ipad/gi).test(navigator.userAgent),
    isPlaybook: (/playbook/gi).test(navigator.userAgent),
    isBlackBerry: ((/bb10/gi).test(navigator.userAgent) || (/blackberry/gi).test(navigator.userAgent)) && typeof bbnth == "undefined",
    isBlackBerry10: (/bb10/gi).test(navigator.userAgent),
    isBlackBerryNTH: (/blackberry/gi).test(navigator.userAgent) && typeof bbnth != "undefined" && bbnth,
    isTouchPad: (/hp-tablet/gi).test(navigator.userAgent),
    isWindowsPhone: (/Windows Phone/gi).test(navigator.userAgent),
    isWindowsTouch: (/Windows/gi).test(navigator.userAgent) && (/Touch/gi).test(navigator.userAgent) || ((/trident/gi).test(navigator.userAgent)),
    isWindowsTablet: (/Windows NT/gi).test(navigator.userAgent) && (/Touch/gi).test(navigator.userAgent),
    isTablet: (/hp-tablet|ipad|playbook/gi).test(navigator.userAgent) || ((/android/gi).test(navigator.userAgent) && !(/mobile/gi).test(navigator.userAgent)),
    isMob: (/mobile/gi).test(navigator.userAgent),
    transition: ((/edge/gi).test(navigator.userAgent)) ? "transition" : "Transition",

    syncFiles: ["jslib/voltmxtextfieldwidget.js"],
    syncJSFiles: ["jslib/voltmxconstants.js", "jslib/voltmxwidgetdefault.js",
         "jslib/voltmxJSLib/ui/voltmxuiBaseClasses.js", "jslib/voltmxJSLib/ui/voltmxuiForm.js"
    ], 
    syncLuaFiles: ["jslib/voltmxLuaLib/ui/windowBaseClasses.js", "jslib/voltmxLuaLib/ui/windowForm.js",
         "jslib/voltmxLuaLib/ui/windowBox.js"
    ],
    asyncViewFiles: ["jslib/voltmxconstcommon.js", "jslib/voltmxmodel.js", "jslib/voltmxcore.js",
        "jslib/voltmxsystem.js", "jslib/voltmxapi.js", "jslib/voltmxmodule.js",
        "jslib/voltmxtableapi.js", "jslib/voltmxosapi.js", "jslib/voltmxmathapi.js",
        "jslib/voltmxutils.js", "jslib/voltmxi18n.js", "jslib/voltmxwidgets.js",
        "jslib/voltmxskinutils.js", "jslib/voltmxflexutils.js", "jslib/voltmxwidgetapiutils.js",
        "jslib/voltmximageutils.js", "jslib/voltmxtouchwidgets.js", "jslib/voltmxformwidget.js",
        "jslib/voltmxappmenu.js", "jslib/voltmxnetwork.js", "jslib/voltmxworker.js",
        "jslib/voltmxlabelwidget.js", "jslib/voltmxbuttonwidget.js", "jslib/voltmxsliderwidget.js",
        "jslib/voltmxtextfieldautocomplete.js", "jslib/voltmxtextfieldpassword.js",
        "jslib/voltmxradiobuttongroup.js", "jslib/voltmxlistboxgroup.js", "jslib/voltmxtextareawidget.js",
        "jslib/voltmxcheckboxgroup.js",  "jslib/voltmxflexlayoutengine.js", "jslib/voltmxflexcontainerwidget.js",
        "jslib/voltmxflexscrollcontainerwidget.js", "jslib/voltmxlinewidget.js", "jslib/voltmxsegmentwidget.js",
        "jslib/voltmximagewidget.js", "jslib/voltmxslotviewwidget.js", "jslib/voltmxbrowserwidget.js",
        "jslib/voltmxcanvaswidget.js", "jslib/voltmxdatagridwidget.js", "jslib/voltmxmapwidget.js",
        "jslib/voltmxtabwidget.js", "jslib/voltmxswitchwidget.js", "jslib/voltmxphone.js",
        "jslib/voltmxscrollerwidget.js", "jslib/voltmxrichtextwidget.js", "jslib/voltmxmediawidget.js",
        "jslib/voltmxthemesapi.js", "jslib/voltmxcalendarwidget.js", "jslib/voltmxanimations.js", "jslib/voltmxhybridapi.js",
        "jslib/voltmxdatabaseapi.js", "jslib/voltmxdatastoreapi.js", "jslib/voltmxgeolocationapi.js",
        "jslib/voltmxphoneapi.js", "jslib/voltmxtimerapi.js", "jslib/voltmxapm.js",
        "jslib/voltmxcrypto.js", "jslib/tparty/crypto/cryptojslib-min.js", "jslib/tparty/requirejs/require.js",
        "jslib/voltmxmvc.js", "jslib/voltmxuserwidget.js", "jslib/voltmxcollectionview.js", "jslib/voltmxnosqlapi.js",
        "jslib/voltmximagepinchzoom.js", "jslib/voltmxcamerawidget.js", "jslib/voltmxcop.js"
    ],
    asyncDebugFiles: ["jslib/tparty/jasmine/jasmine.js", "jslib/tparty/jasmine/jamsinecucumber.js",
        "jslib/tparty/jasmine/jasmine-feature-runner.js", "jslib/tparty/jasmine/testDefinitions.js",
        "jslib/automation/voltmxautomationutils.js", "jslib/automation/voltmxautomationwidgets.js",
        "jslib/automation/voltmxautomationtouchevents.js", "jslib/automation/voltmxautomationrecorder.js"
    ],
    asyncJSFiles: ["jslib/voltmxJSLib/core/voltmxJSUtils.js", "jslib/voltmxJSLib/ui/voltmxuiBasicWidgets.js",
        "jslib/voltmxJSLib/ui/voltmxuiFlexContainer.js", "jslib/voltmxJSLib/ui/voltmxuiCalendar.js",
        "jslib/voltmxJSLib/ui/voltmxuiDataGrid.js", "jslib/voltmxJSLib/ui/voltmxuiGroupWidgets.js",
        "jslib/voltmxJSLib/ui/voltmxuiImage.js", "jslib/voltmxJSLib/ui/voltmxuiMap.js",
        "jslib/voltmxJSLib/ui/voltmxuiBrowser.js", "jslib/voltmxJSLib/ui/voltmxuiCanvas.js",
        "jslib/voltmxJSLib/ui/voltmxuiRichText.js", "jslib/voltmxJSLib/ui/voltmxuiSegmentedUI.js",
        "jslib/voltmxJSLib/ui/voltmxuiCollectionView.js", "jslib/voltmxJSLib/ui/voltmxuiText.js",
        "jslib/voltmxJSLib/ui/voltmxuiTabPane.js", "jslib/voltmxJSLib/ui/voltmxuiSlider.js",
        "jslib/voltmxJSLib/ui/voltmxuiVideo.js", "jslib/voltmxJSLib/ui/voltmxuiUserWidget.js",
        "jslib/voltmxJSLib/ui/voltmxuiCamera.js"
    ],
    JSMapList: ["jslib/voltmxJSLib/core/voltmxJSMapping.js", "jslib/voltmxJSLib/core/voltmxapplication.js",
        "jslib/voltmxmvc_sdk.js", "jslib/voltmxhotreload.js"
    ],
    isLocalBuild: false,
    setPlatformName: function() {
        var platform;
        var rcid;
        if(this.isiPhone) {
            platform = "spaiphone";
            rcid = "spaiphone";
        } else if(this.isAndroid && this.isTablet) {
            platform = "spaandroidtablet";
            rcid = "spaandroidtab";
        } else if(this.isAndroid) {
            platform = "spaandroid";
            rcid = "spaandroid";
        } else if(this.isBlackBerry) {
            platform = "spablackberry";
            rcid = "spabb";
        } else if(this.isiPad) {
            platform = "spaipad";
            rcid = "spaipad";
        } else if(this.isBlackBerryNTH) {
            platform = "spabbnth";
            rcid = "spabbnth";
        } else if(this.isPlaybook) {
            platform = "spaplaybook";
            rcid = "spaother";
        } else if(this.isWindowsPhone && this.isIE10) {
            platform = "spawinphone8";
            rcid = "spawinphone8";
        } else if(this.isWindowsTablet) {
            platform = "spawindowstablet";
            rcid = "spawindowstablet";
        } else if(this.isWindowsPhone) {
            platform = "spawindows";
            rcid = "spawindows";
        } else {
            platform = "";
            rcid = "spaother";
        }

        if(typeof spaMarkup != "undefined" && spaMarkup) {
            platform = spaMarkup;
            rcid = spaMarkup;
        }

        $KG["platformver"] = platform + "/";
        $KG["rcid"] = rcid;

        if(this.isiPhone && window.devicePixelRatio == 2)
            $KG["retina"] = "retina/";
        else
            $KG["retina"] = "";
    },

    initializeWidgets: function() {
        
        var widgetsSupported = [$KW.Form, $KW.Button, $KW.Image, $KW.Label, $KW.TextField, $KW.ListBox, $KW.RichText, $KW.CheckBoxGroup, $KW.RadioButtonGroup, $KW.Map, $KW.Phone, $KW.Segment, $KW.Appmenu, $KW.TabPane, $KW.Calendar, $KW.Switch, $KW.TextArea, $KW.DataGrid, $KW.FlexScrollContainer, $KW.Slider, $KW.Line, $KW.FlexContainer, $KW.FlexScrollContainer, $KW.Camera];
        for(var i = 0; i < widgetsSupported.length; i++) {
            if(widgetsSupported[i]) {
                widgetsSupported[i].initialize && widgetsSupported[i].initialize();
            }
        }
    },

    loadlibrarysync: function() {
        
        var appInit = voltmx.appinit;
        if(!($KI.themes)) {

            if(appInit.index > 0)
                voltmx.web.logger("log", "File loaded in sync: " + appInit.syncFiles[appInit.index - 1] + "  number: " + appInit.index);

            if(appInit.index == appInit.syncFiles.length) {
                appInit.loadlibraryasync(appInit.asyncViewFiles, appInit.ondone);
                return;
            }
            voltmx.appinit.loadScript(voltmx.appinit.syncFiles[voltmx.appinit.index], voltmx.appinit.loadlibrarysync);
            appInit.index++;
        } else {
            $KG["skipproxy"] = true;
            appInit.verifyhref(true);

        }
    },

    ondone: function() {
        var appInit = voltmx.appinit;
        voltmx.web.logger("log", "File loaded in async: " + appInit.asyncViewFiles[appInit.index] + "  number: " + appInit.index);
        appInit.index++;
        if(appInit.index == appInit.asyncViewFiles.length) {
            
            IndexJL ? appInit.verifyhref() : voltmx.appinit.loadJSMap();
            return;
        }
    },

    loadlibraryasync: function(files, cb) {
        var appInit = voltmx.appinit;
        appInit.index = 0;
        for(var i = 0; i < files.length; i++) {
            appInit.loadScript(files[i], cb);
        }
    },

    loadJSMap: function() {
        var appInit = voltmx.appinit;

        appInit.JSMapList[appInit.JSMapFileCount] && appInit.loadScript(appInit.JSMapList[appInit.JSMapFileCount], appInit.loadJSMap);
        appInit.JSMapFileCount++;
        (appInit.JSMapFileCount == appInit.JSMapList.length) && appInit.verifyhref();
    },

    
    getStaticContentPath: function() {
        return $KG["staticContentPath"] ? $KG["staticContentPath"] : "";
    },

    loadScript: function(src, callback) {
        var script = document.createElement('script');
        script.src = voltmx.appinit.getStaticContentPath() + $KG["platformver"] + src;
        script.type = "text/javascript";
        if(!script.addEventListener) {
            script.onreadystatechange = function() {
                (this.readyState == 'complete' || this.readyState == 'loaded') && callback();
            };
        } else
            script.onload = callback;
        voltmx.appinit.head.appendChild(script);
    },

    mergeDownloadLists: function() {
        var appInit = voltmx.appinit;
        var synctype = "sync" + appInit.foldertype;
        var asynctype = "async" + appInit.foldertype;
        appInit.syncFiles = appInit.syncFiles.concat(appInit[synctype]);
        appInit.asyncViewFiles = appInit.asyncViewFiles.concat(appInit[asynctype]);
    },


    appcacheeventhndlr: function(event) {
        if(!event)
            event = window.event;

        switch(event.type) {
            case "checking":
                voltmx.web.logger("log", "Checking for Manifest Version");
                break;

            case "downloading":
                voltmx.web.logger("log", "Downloading of Manifest Resources");
                break;

            case "progress":
                break;

            case "cached":
                voltmx.web.logger("log", "Manifest Resources loading done");
                break;

            case "noupdate":
                voltmx.web.logger("log", "No Change in Manifest File");
                break;

            case "updateready":
                voltmx.web.logger("log", "New manifest resources downloaded,swap the cache");
                try {
                    window.applicationCache.swapCache();
                    window.location.reload();
                } catch(e) {
                    voltmx.web.logger("log", "invalid state: swapping the cache");
                }
                break;

            case "obsolete":
                voltmx.web.logger("warn", "Cache Manifest file not found. So deleting app cache");
                break;

            case "error":
                voltmx.web.logger("warn", "Error while loading app cache");
                
                break;

            default:
                voltmx.web.logger("warn", "Appcache Event not supported");
        }
    },

    
    
    verifyhref: function(skiploadappjs) {
        

        
        var voltmxappprops = document.getElementsByName('_voltmxAppProperties')[0];
        if(voltmxappprops && voltmxappprops.value && voltmxappprops.value !== 'null') {
            try {
                window["_voltmxAppProperties"] = JSON.parse(voltmxappprops.value); 
            } catch(e) {
                voltmx.web.logger("warn", "Error while loading application properties. i.e <appId>.properties");
            }
        } else
            window["_voltmxAppProperties"] = undefined;
        var voltmxParams = document.getElementsByName('_reqParams')[0];
        if(voltmxParams && voltmxParams.value && voltmxParams.value !== 'null') {
            voltmx.globals["voltmxParams"] = JSON.parse($KU.getDecodedPropValue(voltmxParams.value))
        }
        var reqhdrs = document.getElementsByName('_reqHeaders')[0];
        if(reqhdrs && reqhdrs.value && reqhdrs.value !== 'null') {
            var keys = [];
            var headersJSON = "";
            headersJSON = JSON.parse($KU.getDecodedPropValue(reqhdrs.value).replace(/"="/g, "\":\""));
            for(p in headersJSON) {
                headersJSON[p] = decodeURIComponent(headersJSON[p]);
            }
            voltmx.globals["httpheaders"] = headersJSON;
            if(Object.keys)
                keys = Object.keys(voltmx.globals["httpheaders"]);
            else
                for(var j in voltmx.globals["httpheaders"])
                    keys.push(j);

            for(var i = 0; i < keys.length; i++)
                voltmx.globals["httpheaders"][keys[i]] = unescape(voltmx.globals["httpheaders"][keys[i]]);
        }

        var searchstr = window.location.search.slice(1);
        
        if(searchstr == "") {
            var hash = window.location.hash.slice(2);
            var lform = null;
            try {
                lform = sessionStorage.getItem("klastform");
            } catch(err) {}
            
            $KG["__launchmode"] = 1;

            if(hash != "") {
                
                if(lform == hash) {
                    voltmx.logfer("log", "verifyhref:Last Form Stored: " + lform);
                } else {
                    voltmx.web.logger("log", "verifyhref:Last Form Stored: " + lform + " Hash: " + hash);
                }

                if(skiploadappjs)
                    voltmx.appinit.hashflowshowform();
                else
                    voltmx.appinit.loadappjs(voltmx.appinit.hashflowshowform);
                

            } else {
                
                if(lform != null) {
                    
                    try {
                        sessionStorage.removeItem("klastform");
                        sessionStorage.removeItem("kmodel");
                    } catch(err) {}
                    voltmx.print("verifyhref: Deleted Existing sessionStorage");
                }


                if(skiploadappjs)
                    voltmx.appinit.deeplinkflow();
                else
                    voltmx.appinit.loadappjs(voltmx.appinit.deeplinkflow);

            }
        } else {
            
            $KG["__launchmode"] = 3;

            if(skiploadappjs)
                voltmx.appinit.deeplinkflow();
            else
                voltmx.appinit.loadappjs(voltmx.appinit.deeplinkflow);

        }
    },

    restorespamodel: function() {
        
        try {
            var modelstr = sessionStorage.getItem("kmodel");
            var modelobj = "";
        } catch(err) {}
        if(modelstr)
            modelobj = JSON.parse(modelstr);

        if(modelobj) {
            
            voltmx.print("restorespamodel:Model Reloaded");
            
            return true;
        } else {
            voltmx.print("restorespamodel:Case of Corrupt Model");
            
            return true;
        }
    },

    appstartup: function() {
        
        setTimeout(function() {
            voltmx.appinit.disablesplash();
        }, 100);
    },

    hashflowshowform: function() {
        var form = null;
        try {
            form = sessionStorage.getItem("klastform");
        } catch(err) {}
        
        if(voltmx.appinit.restorespamodel() && form) {
            var formobj = $KU.getFormModel(form);
            voltmx.print("hashflowshowform: Display Form " + formobj.id);
            formobj && $KW.Form.show(formobj);
        } else {
            voltmx.print("hashflowshowform:ERROR recovering model so landing on Home Page");
            
            voltmx.appinit.deeplinkflow();
        }
    },

    deeplinkflow: function() {
        
        var searchstring = window.location.search.slice(1);

        var deepobj = {};
        var queryString = searchstring.split("&");

        voltmx.print("deeplinkflow: args:" + queryString.join());

        for(var i = 0; i < queryString.length; i++) {
            var s = queryString[i].replace(/\+/g, ' ').split("=");
            var key = decodeURIComponent(s[0]);
            var value = decodeURIComponent(s[1]);
            if(key) deepobj[key] = value;
        }

        var path = window.location.href.split("?");
        var sessionflag = searchstring.search("kdeeplink=");

        deepobj["deeplinkpath"] = path[0];
        
        deepobj["deepLinkPath"] = path[0];
        
        deepobj['reqheaders'] = voltmx.globals["httpheaders"];
        if(voltmx.globals["voltmxParams"]) {
            for(var param in voltmx.globals["voltmxParams"])
                deepobj[param] = voltmx.globals["voltmxParams"][param];
        }
        $KG["kdeepobj"] = deepobj;

        if(sessionflag == -1)
            voltmx.print("deeplinkflow:newsession");
        else
            voltmx.print("deeplinkflow:insession");

        setTimeout(function() {
            voltmx.appinit.disablesplash();
        }, 100);

    },

    
    loadappjs: function(cb) {
        voltmx.appinit.loadScript("jslib/voltmxlicense.js");
        voltmx.appinit.loadScript("appjs/app.js", cb);
    },

    initLocalStorage: function() {
        try {
            if(typeof(localStorage) === "object") {
                var store = $KU.getLocalStorage(),
                    l = 0,
                    len = 0,
                    key = '',
                    value = '';

                if(typeof store === 'object' && store &&
                    store.migrated === true &&
                    $KU.isArray(store.data)) {
                    return;
                } else if(store !== '' && store !== null) {
                    $KG.localStorageBackup = store; 
                }

                store = $KU.createBlankLocalStorage();
                localStorage.setItem($KG.appid, JSON.stringify(store));
            }
        } catch(e) {}
    },

    migrateLocalStorage: function() {
        try {
            if(typeof(localStorage) === "object") {
                var store = $KU.getLocalStorage(),
                    keysToBeRemoved = [],
                    l = 0,
                    len = 0,
                    parsed = null,
                    key = '',
                    value = '';

                
                
                if(store.migrated === true) return;

                store.migrated = true;

                if($KG.appbehaviors[constants.API_LEVEL] < constants.API_LEVEL_8200) {
                    localStorage.removeItem("i18nVersion");

                    len = localStorage.length;
                    for(l = 0; l < len; l++) {
                        key = localStorage.key(l);

                        if(key === $KG.appid) {
                            if($KG.hasOwnProperty('localStorageBackup')) {
                                
                                store.data.push({
                                    key: key,
                                    value: $KG.localStorageBackup
                                });
                            }
                        } else {
                            
                            if(key.indexOf($KG.appid + '_') !== 0 &&
                                key.split('_').length < 2) {
                                value = localStorage.getItem(key);
                                try {
                                    parsed = JSON.parse(value);
                                } catch(e) {
                                    parsed = value;
                                }

                                
                                if(!(typeof parsed === 'object' && parsed &&
                                        parsed.migrated === true &&
                                        $KU.isArray(parsed.data))) {
                                    keysToBeRemoved.push(key);
                                    store.data.push({
                                        key: key,
                                        value: parsed
                                    });
                                }
                            }
                        }
                    }

                    
                    len = keysToBeRemoved.length;
                    for(l = 0; l < len; l++) {
                        localStorage.removeItem(keysToBeRemoved[l]);
                    }
                }

                localStorage.setItem($KG.appid, JSON.stringify(store));
            }
        } catch(e) {}
    },

    disableForceRepaint: function() {
        if(($KG.appbehaviors["disableForceRepaint"] != true) && (voltmx.appinit.isiPhone || voltmx.appinit.isiPad)) {
            var styleSheet = $KG["animStyleSheet"];
            styleSheet.insertRule('div[kwidgettype="FlexContainer"], div[kwidgettype="FlexScrollContainer"] {transform: translateZ(0);}', styleSheet.cssRules.length);
        }
    },

    disablesplash: function() {
        voltmx.print("disabling splash");
        $KG["animStyleSheet"] = $KU.createStyleSheet("animSheet"); 
        
        voltmx.appinit.initializeheaders();
        var eventobj = $KG["__voltmxappevents"];
        voltmx.appinit.initLocalStorage();
        
        voltmx.appinit.voltmxLoadFunctionalModules();
        voltmx.print("appmode:not hybrid,invoking initializeapp");
        voltmx.perflog.loggerInit();
        if(appConfig.testAutomation && voltmx.appinit.isLocalBuild) {
            voltmx.appinit.loadlibraryasync(voltmx.appinit.asyncDebugFiles, voltmx.appinit.debugfilesonDone);
        } else {
            initializeApp && initializeApp();
        }
    },
    debugfilesonDone: function() {
        var appInit = voltmx.appinit;
        voltmx.web.logger("log", "File loaded in async: " + appInit.asyncDebugFiles[appInit.debugFilesCount] + "  number: " + appInit.debugFilesCount);
        appInit.debugFilesCount++;
        if(appInit.debugFilesCount == appInit.asyncDebugFiles.length) {
            initializeApp && initializeApp();
        }
    },

    setAppHeaderRef: function() {
        var setRef = function(headers) {
            for(var hbox in headers) {
                var header = headers[hbox];
                var box = headers[hbox] = window[header][hbox];
                $KU.setChildren(header, box, box.children);
            }
        }
        var headers = voltmx.app.headers;
        headers && setRef(headers);

        var footers = voltmx.app.footers;
        footers && setRef(footers);
    },

    setChildren: function(header, box, children) {
        if(children && children.length > 0) {
            for(var i = 0; i < children.length; i++) {
                box[children[i]] = window[header][children[i]];
                this.setChildren(header, box, window[header][children[i]].children);
            }
        }
    },

    setImageBasedDP: function() {
        var imageCat = "";

        if($KU.isAndroid) {
            var dpratio = window.devicePixelRatio;
            if(!$KU.isTablet) {
                if(dpratio <= 1)
                    imageCat = "320/";
                else if(dpratio > 1 && dpratio <= 1.5)
                    imageCat = "360/";
                else if(dpratio > 1.5 && dpratio <= 2)
                    imageCat = "400/";
                else if(dpratio > 2)
                    imageCat = "440/";
            } else {
                if(dpratio <= 1) {
                    imageCat = "mdpi/";
                } else if(dpratio <= 1.5) {
                    imageCat = "hdpi/";
                } else if(dpratio > 1.5) {
                    imageCat = "xhdpi/";
                }
            }
        }
        
        else if($KU.isWindowsPhone) {

            imageCat = "320/";
        } else if($KU.isBlackBerry || $KU.isBlackBerryNTH) {
            var orientation = window.orientation;
            var imageCat = window.innerWidth + "/";
            if(orientation)
                imageCat = Math.min(window.innerWidth, window.innerHeight);
            if(orientation && parseInt(imageCat, 10) > 250)
                imageCat = "360/"
            else if(orientation || parseInt(imageCat, 10) < 340)
                imageCat = "320/";
            else
                imageCat = "360/";

            if(window.devicePixelRatio > 2)
                imageCat = "440/";
        }
        if(typeof spaMarkup != "undefined" &&
            spaMarkup && spaMarkup === "spaiphone") {
            imageCat = "";
        }

        
        $KG["imagecat"] = imageCat;

        
        if($KG["imagewhiledownloading"])
            new Image().src = $KU.getImageURL($KG["imagewhiledownloading"]);
        new Image().src = $KU.getImageURL("imgload.gif");
    },

    initializeheaders: function(eventObject) {
        if(voltmx.constants.APPSTATE == 0) {
            voltmx.constants.APPSTATE = 1;
            voltmx.appinit.setImageBasedDP();
            voltmx.appinit.initializeMainContainer();
            voltmx.app && voltmx.appinit.setAppHeaderRef();
            voltmx.appinit.setPlatformName();
        }
    },

    initializeMainContainer: function() {
        var main = $KU.getElementById('__MainContainer');
        if(!main) {
            
            var mainContainerEle = document.createElement('div');
            mainContainerEle.setAttribute("id", "__MainContainer");
            document.body.appendChild(mainContainerEle);
        }
        voltmx.events.registerDocumentEvents();
    },

    prepareHttpHeaders: function() {
        
        var isnewsession = document.getElementById("isnewsession");
        if(isnewsession != null) {
            voltmx.appinit.isNewSession = isnewsession.innerHTML;
        }
    },

    initappcache: function() {
        voltmx.appinit.prepareHttpHeaders();

        voltmx.appinit.setPlatformName();

        voltmx.appinit.mergeDownloadLists();
        
        
        
        if(document.documentElement.getAttribute("manifest") && !!window.applicationCache) {
            var appcacheevents = ["checking", "downloading", "progress", "cached", "noupdate", "updateready", "obsolete", "error"];

            for(var i = 0; i < appcacheevents.length; i++) {
                window.applicationCache.addEventListener(appcacheevents[i], voltmx.appinit.appcacheeventhndlr, false);
            }
        } else {
            
        }
        voltmx.appinit.isLocalBuild = true;
        voltmx.appinit.loadlibrarysync();
    },

    
    voltmxLoadFunctionalModules: function() {
        if($KG["functionalModules"]) {
            var fms = $KG["functionalModules"];
            for(var fm in fms) {
                if(fm && (fm !== "VoltmxdefaultModules") && (fms[fm].cache || fms[fm].loadOnStartUp)) {
                    voltmx.modules.loadModule(fm);
                }
            }
        }
    },

    setApplicationMetaConfiguration: function(ckey, cval) {
        var putIntoAppConfig = function(id, val) {
            if(id === 'appid') voltmx.globals[id] = val;
            else if(id === 'locales') voltmx.globals[id] = val;
            else if(id === 'build') voltmx.globals[id] = val;
            else if(id === 'i18nArray') {
                voltmx.globals[id] = val;
            } else {
                voltmx.globals[id] = val;
            }
        };

        if(typeof ckey === 'string') {
            putIntoAppConfig(ckey, cval);
        } else if(typeof ckey === 'object' && ckey) {
            for(var k in ckey) {if(ckey.hasOwnProperty(k)) {
                putIntoAppConfig(k, ckey[k]);
            }}
        }
    },

    
    isPWAStandalone: function() {
        if((window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) || window.navigator.standalone) {
            return true;
        } else {
            return false;
        }
    }
};

function tobeimplemented(str) {
    str = (typeof str === 'string') ? str : "";
    voltmx.web.logger("warn", str + "  API is either not implemented or unsupported");
}


$KI.os = {
    platform: function() {
        $KU.logExecuting('voltmx.os.deviceInfo');
        $KU.logExecutingWithParams('voltmx.os.deviceInfo');
        var params = {};

        var imagecat = $KG["imagecat"];
        imagecat = imagecat.substring(0, imagecat.length - 1);
        var platform = $KU.getPlatform();
        if(platform.name == "iphone")
            if(window.devicePixelRatio == 1)
                imagecat = "320";
            else
                imagecat = "640";

        params["name"] = "thinclient";
        params["model"] = ""
        params["version"] = platform.version;
        params["deviceWidth"] = screen.availWidth;
        params["deviceHeight"] = screen.availHeight;
        params["screenWidth"] = $KU.getWindowWidth();
        params["screenHeight"] = $KU.getWindowHeight();
        params["hascamera"] = false;
        params["hasgps"] = (navigator.geolocation != undefined ? true : false);
        params["hastouchsupport"] = $KU.isTouchSupported;
        params["hasorientationsupport"] = $KU.isOrientationSupported;
        params["iswifiavailable"] = (navigator.onLine != undefined ? navigator.onLine : true);
        params["type"] = "spa";
        params["imagecat"] = imagecat;
        params["deviceid"] = $KU.getDeviceId();
        params["category"] = platform.name;
        params["userAgent"] = navigator.userAgent;

        params["ip"] = "";
        if($KG["httpheaders"])
            params["httpheaders"] = JSON.stringify($KG["httpheaders"]);

        $KU.logExecutingFinished('voltmx.os.deviceInfo');
        return params;
    },

    useragent: function() {
        $KU.logExecuting('voltmx.os.userAgent');
        $KU.logExecutingWithParams('voltmx.os.userAgent');
        $KU.logExecutingFinished('voltmx.os.userAgent');
        return navigator.userAgent;
    },

    setapplicationmode: function(mode) {
        $KU.logExecuting('voltmx.application.setApplicationMode');
        $KU.logExecutingWithParams('voltmx.application.setApplicationMode', mode);
        $KG["appmode"] = mode;
        if(mode == 2 || mode == 3) {
            $KG["platformver"] = "";
        }
        $KU.logExecutingFinished('voltmx.application.setApplicationMode');
    },

    getapplicationmode: function(mode) {
        $KU.logExecuting('voltmx.application.getApplicationMode');
        $KU.logExecutingWithParams('voltmx.application.getApplicationMode', mode);
        var mode = $KG["appmode"];
        $KU.logExecutingFinished('voltmx.application.getApplicationMode');
        return !!mode ? mode : 1;
    }
};

voltmx.decrement = function(num) {
    if(typeof(num) === "number") {
        return num - 1;
    } else {
        return num;
    }
};

voltmx.increment = function(num) {
    if(typeof(num) === "number") {
        return num + 1;
    } else {
        return num;
    }
};

voltmx.decrementIndices = function(arr) {
    var tArr = [];
    for(var i = 0; i < arr.length; i++) {
        tArr[i] = arr[i] - 1;
    }
    return tArr;
};

voltmx.incrementIndices = function(arr) {
    var tArr = [];
    for(var i = 0; i < arr.length; i++) {
        tArr[i] = arr[i] + 1;
    }
    return tArr;
};
