
voltmx.ui.Browser = function(bconfig, lconfig, pspconfig) {
    if(arguments.length < 3)
        bconfig = lconfig = pspconfig = $KU.mergeDefaults(bconfig, $KU.getAllDefaults("Browser"));

    voltmx.ui.Browser.baseConstructor.call(this, bconfig, lconfig, pspconfig);

    this.onSuccess = bconfig.onSuccess; 
    this.onFailure = bconfig.onFailure; 
    this.screenLevelWidget = bconfig.screenLevelWidget; 
    this.enableZoom = bconfig.enableZoom; 
    this.detectTelNumber = bconfig.detectTelNumber; 

    this.readconfig = function(val) {
        this.url = val.URL;
        this.method = val.requestMethod;
        this.data = val.requestData;
    }

    bconfig.requestURLConfig && this.readconfig(bconfig.requestURLConfig);
    this.requesturlconfig = bconfig.requestURLConfig;
    this.htmlstring = bconfig.htmlString;


    this.containerheight = lconfig.containerHeight;
    this.containerheightreference = lconfig.containerHeightReference || constants.CONTAINER_HEIGHT_BY_FORM_REFERENCE;

    this.enablenativecommunication = bconfig.enableNativeCommunication ? true : false;


    
    this.wType = "Browser";
    this.name = "voltmx.ui.Browser";

    this.setGetterSetter();
};

voltmx.inherits(voltmx.ui.Browser, voltmx.ui.Widget);

voltmx.ui.Browser.prototype.setGetterSetter = function() {
    defineGetter(this, "htmlString", function() {
        return this.htmlstring;
    });
    defineSetter(this, "htmlString", function(val) {
        this.htmlstring = val;
        $KW[this.wType]["updateView"](this, "htmlstring", val);
    });

    defineGetter(this, "requestURLConfig", function() {
        return this.requesturlconfig;
    });
    defineSetter(this, "requestURLConfig", function(val) {
        this.requesturlconfig = val;
        this.readconfig(val);
        $KW[this.wType]["updateView"](this, "requesturlconfig", val);
    });
    defineGetter(this, "containerHeight", function() {
        return this.containerheight;
    });

    defineSetter(this, "containerHeight", function(val) {
        this.containerheight = val;
        voltmx.model.updateView(this, "containerheight", val);
    });

    defineGetter(this, "containerHeightReference", function() {
        return this.containerheightreference;
    });

    defineSetter(this, "containerHeightReference", function(val) {
        this.containerheightreference = val;
        voltmx.model.updateView(this, "containerheightreference", val);
    });

    defineGetter(this, "enableNativeCommunication", function() {
        return this.enablenativecommunication;
    });

};


voltmx.ui.Browser.prototype.isCordovaAppsEnabled =
    voltmx.ui.Browser.prototype.isHtmlPreviewEnabled =
    voltmx.ui.Browser.prototype.isWebAppDevelopmentEnabled =
    voltmx.ui.Browser.prototype.loadData =
    voltmx.ui.Browser.prototype.getHTMLFilesInWebFolder =
    voltmx.ui.Browser.prototype.canGoBack =
    voltmx.ui.Browser.prototype.canGoForward =
    voltmx.ui.Browser.prototype.clearHistory = function() {
        voltmx.web.logger("warn", "This Browser method is not supported in SPA");
    };

voltmx.ui.Browser.prototype.evaluateJavaScript = function(jscript) {
    $KW.Browser.evaluateJavaScript(this, jscript);
};

voltmx.ui.Browser.prototype.evaluateJavaScriptdepri = function(jscript) {
    voltmx.web.logger("log", "executing javascript in " + this.id + " window handler");
    var scr = document.createElement('script');
    scr.innerHTML = this.id + "Err = null; try{" + jscript + "}catch(e){" + this.id + "Err=e" + "}";
    if($KG["webView" + this.id] && !$KG["webView" + this.id].closed) {
        
        var anchor = document.createElement('a');
        anchor.href = this.url;
        if(window.location.origin != anchor.origin) {
            throw {
                "errorCode": "104",
                "name": "Not supported Error",
                "message": "Not supported Error"
            }
        }
        $KG["webView" + this.id].document.head.appendChild(scr);
        if($KG["webView" + this.id][this.id + "Err"] != null) { 
            throw {
                "errorCode": "106",
                "name": "Unknown Error",
                "message": "Unknown Error"
            }
        }
    } else {
        document.head.appendChild(scr);
        if(window[this.id + "Err"] != null) { 
            throw {
                "errorCode": "106",
                "name": "Unknown Error",
                "message": "Unknown Error"
            }
        }
    }

    return null;
};

voltmx.ui.Browser.prototype.evaluateJavaScriptAsync = function(jscript) {
    return null;
};

voltmx.ui.Browser.prototype.setResponse =
voltmx.ui.Browser.prototype.requestURLConfig = function() {
    voltmx.web.logger("warn", "This Browser method is not supported in SPA");
};

voltmx.ui.Browser.prototype.goBack = function() {
    $KW.Browser.goBack(this);
};

voltmx.ui.Browser.prototype.goForward = function() {
    $KW.Browser.goForward(this);
};

voltmx.ui.Browser.prototype.reload = function() {
    $KW.Browser.reload(this);
};
