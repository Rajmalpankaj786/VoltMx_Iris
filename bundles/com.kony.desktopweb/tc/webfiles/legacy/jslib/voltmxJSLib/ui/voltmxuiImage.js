
voltmx.ui.Image2 = function(bconfig, lconfig, pspconfig) {
    if(arguments.length < 3)
        bconfig = lconfig = pspconfig = $KU.mergeDefaults(bconfig, $KU.getAllDefaults("Image2"));

    voltmx.ui.Image2.baseConstructor.call(this, bconfig, lconfig, pspconfig);

    this.ondownloadcomplete = bconfig.onDownloadComplete;
    this.imageWhileDownloading = this.imagewhiledownloading = bconfig.imageWhileDownloading;
    this.imageWhenFailed = this.imagewhenfailed = bconfig.imageWhenFailed;
    this.referencewidth = lconfig.referenceWidth;
    this.referenceheight = lconfig.referenceHeight;
    this.imagescalemode = (typeof lconfig.imageScaleMode == "undefined") ? constants.IMAGE_SCALE_MODE_MAINTAIN_ASPECT_RATIO : lconfig.imageScaleMode;
    
    this.canUpdateUI = true;
    this.skin = bconfig.skin;

    
    this.wType = "Image";
    this.name = "voltmx.ui.Image2";

    var src = bconfig.src;
    if(src) this.srcType = 1;

    defineGetter(this, "src", function() {
        return src;
    });

    defineSetter(this, "src", function(val) {
        this.srctype = 1;
        var oldsrc = this.src;
        src = val;
        this.canUpdateUI && $KW[this.wType]["updateView"](this, "src", val, oldsrc);
    });


    var base64 = null;
    defineGetter(this, "base64", function() {
        return base64;
    });
    defineSetter(this, "base64", function(val) {
        this.srcType = 2;
        base64 = val;
        $KW[this.wType]["updateView"](this, "base64", val);
    });

    var rawBytes = null;
    defineGetter(this, "rawBytes", function() {
        return rawBytes;
    });
    defineSetter(this, "rawBytes", function(val) {
        this.srcType = 3;
        rawBytes = val;
        $KW[this.wType]["updateView"](this, "rawBytes", val);
    });
    this.tooltip = pspconfig.toolTip;

    defineGetter(this, "toolTip", function() {
        return this.tooltip;
    });

    defineSetter(this, "toolTip", function(val) {
        this.tooltip = val;
        voltmx.model.updateView(this, "tooltip", val);
    });
    this.setGetterSetter();
};

voltmx.inherits(voltmx.ui.Image2, voltmx.ui.Widget);

voltmx.ui.Image2.prototype.setGetterSetter = function() {
    defineGetter(this, "imageScaleMode", function() {
        return this.imagescalemode;
    });
    defineSetter(this, "imageScaleMode", function(val) {
        this.imagescalemode = val;
        $KW[this.wType]["updateView"](this, "imagescalemode", val);
    });

    defineGetter(this, "referenceHeight", function() {
        return this.referenceheight;
    });
    defineSetter(this, "referenceHeight", function(val) {
        this.referenceheight = val;
        $KW[this.wType]["updateView"](this, "referenceheight", val);
    });

    defineGetter(this, "referenceWidth", function() {
        return this.referencewidth;
    });
    defineSetter(this, "referenceWidth", function(val) {
        this.referencewidth = val;
        $KW[this.wType]["updateView"](this, "referencewidth", val);
    });

    defineGetter(this, "onDownloadComplete", function() {
        return this.ondownloadcomplete;
    });
    defineSetter(this, "onDownloadComplete", function(val) {
        this.ondownloadcomplete = val;
    });
};


voltmx.ui.Image = function(bconfig, lconfig, pspconfig) {
    voltmx.ui.Image.baseConstructor.call(this, bconfig, lconfig, pspconfig);

    
    this.scaleMode = this.scalemode = pspconfig.scaleMode;
    this.heightwidth = pspconfig.heightWidth;
    this.imageWhileDownloading = this.imagewhiledownloading = pspconfig.imageWhileDownloading;
    this.imageWhenFailed = this.imagewhenfailed = pspconfig.imageWhenFailed;
    this.skin = bconfig.skin;

    this.name = "voltmx.ui.Image";

};
voltmx.inherits(voltmx.ui.Image, voltmx.ui.Image2);

voltmx.ui.Image2.prototype.scale =
voltmx.ui.Image2.prototype.cropToRect =
voltmx.ui.Image2.prototype.getImageWidth =
voltmx.ui.Image2.prototype.getImageHeight =
voltmx.ui.Image2.prototype.getImageAsRawBytes = function() {
    voltmx.web.logger("warn", "This Image method is not supported in SPA");
};
