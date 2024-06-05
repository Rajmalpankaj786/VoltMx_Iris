

voltmx.ui.Camera = function(bconfig, lconfig, pspconfig) {
    if(arguments.length < 3)
        bconfig = lconfig = pspconfig = $KU.mergeDefaults(bconfig, $KU.getAllDefaults("Camera"));

    voltmx.ui.Camera.baseConstructor.call(this, bconfig, lconfig, pspconfig);
    this.wType = "Camera";
};

voltmx.inherits(voltmx.ui.Camera, voltmx.ui.Widget);

voltmx.ui.Camera.prototype.startVideoCapture =
voltmx.ui.Camera.prototype.stopVideoCapture =
voltmx.ui.Camera.prototype.takePicture =
voltmx.ui.Camera.prototype.getSupportedCameraSources =
voltmx.ui.Camera.prototype.releaseRawBytes =
voltmx.ui.Camera.prototype.openCamera =
voltmx.ui.Camera.prototype.closeCamera = function() {
    voltmx.web.logger("warn", "This Camera method is not supported in SPA");
};