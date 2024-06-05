
voltmx.ui.Video = function(bconfig, lconfig, pspconfig) {
    if(arguments.length < 3)
        bconfig = lconfig = pspconfig = $KU.mergeDefaults(bconfig, $KU.getAllDefaults("Video"));

    voltmx.ui.Video.baseConstructor.call(this, bconfig, lconfig, pspconfig);

    
    this.wType = "Video";
    this.name = "voltmx.ui.Video";


    var source = bconfig.source;
    defineGetter(this, "source", function() {
        return source;
    });
    defineSetter(this, "source", function(val) {
        source = val;
        $KW[this.wType]["updateView"](this, "source", val);
    });

    
    var controls = pspconfig.controls || bconfig.controls;
    this.controls = pspconfig.controls || bconfig.controls;
    defineGetter(this, "controls", function() {
        return controls;
    });
    defineSetter(this, "controls", function(val) {
        controls = val;
        $KW[this.wType]["updateView"](this, "controls", val);
    });

    var poster = pspconfig.poster || bconfig.poster;
    defineGetter(this, "poster", function() {
        return poster;
    });
    defineSetter(this, "poster", function(val) {
        poster = val;
        $KW[this.wType]["updateView"](this, "poster", val);
    });


};
voltmx.inherits(voltmx.ui.Video, voltmx.ui.Widget);

voltmx.ui.Video.prototype.setSource = function(source) {
    this.source = source;
};

voltmx.ui.Video.prototype.play = function() {
    $KW.Video.play(this);
};

voltmx.ui.Video.prototype.pause = function(source) {
    $KW.Video.pause(this);
};

voltmx.ui.Video.prototype.resume = function(source) {
    $KW.Video.resume(this);
};

voltmx.ui.Video.prototype.stop = function(source) {
    $KW.Video.stop(this);
};

voltmx.ui.Video.prototype.seekTo = function(seekTime) {
    $KW.Video.seekTo(this, seekTime);
};

voltmx.ui.Video.prototype.isPlaying = function() {
    return $KW.Video.isPlaying(this);
};

voltmx.ui.Video.prototype.getCurrentPosition = function() {
    return $KW.Video.getCurrentPosition(this);
};

voltmx.ui.Video.prototype.getDuration = function() {
    return $KW.Video.getDuration(this);
};

voltmx.ui.Video.prototype.getBufferPercentage = function() {
    return $KW.Video.getBufferPercentage(this);
};
