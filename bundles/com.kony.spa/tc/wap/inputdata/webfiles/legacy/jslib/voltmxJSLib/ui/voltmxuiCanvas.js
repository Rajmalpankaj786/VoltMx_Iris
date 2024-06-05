
voltmx.ui.Canvas = function(bconfig, lconfig, pspconfig) {
    if(arguments.length < 3)
        bconfig = lconfig = pspconfig = $KU.mergeDefaults(bconfig, $KU.getAllDefaults("Canvas"));

    voltmx.ui.Canvas.baseConstructor.call(this, bconfig, lconfig, pspconfig);
    this.shapesdata = bconfig.shapesData;

    
    this.wType = "Canvas";
    this.name = "voltmx.ui.Canvas";

    this.setGetterSetter();
};

voltmx.inherits(voltmx.ui.Canvas, voltmx.ui.Widget);

voltmx.ui.Canvas.prototype.setGetterSetter = function() {
    defineGetter(this, "shapesData", function() {
        return this.shapesdata;
    });
    defineSetter(this, "shapesData", function(val) {
        this.shapesdata = val;
        $KW[this.wType]["updateView"](this, "shapesdata", val);
    });
};


voltmx.ui.Canvas.prototype.addShapes = function(shapesData) {
    $KW.Canvas.addShapes(this, shapesData);
};

voltmx.ui.Canvas.prototype.updateShapes = function(shapesData) {
    $KW.Canvas.updateShapes(this, shapesData);
};

voltmx.ui.Canvas.prototype.removeShapes = function(shapeIds) {
    $KW.Canvas.removeShapes(this, shapeIds);
};

voltmx.ui.Canvas.prototype.clear = function() {
    $KW.Canvas.clear(this);
};
