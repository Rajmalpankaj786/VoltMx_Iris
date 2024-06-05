
voltmx.ui.Map = function(bconfig, lconfig, pspconfig) {
    if(arguments.length < 3)
        bconfig = lconfig = pspconfig = $KU.mergeDefaults(bconfig, $KU.getAllDefaults("Map"));

    voltmx.ui.Map.baseConstructor.call(this, bconfig, lconfig, pspconfig);

    this.provider = bconfig.provider || constants.MAP_PROVIDER_GOOGLE;
    this.mapApiKey = bconfig.mapKey; 
    this.mapClientId = bconfig.clientId; 
    this.navControlsImageConfig = pspconfig.navControlsImageConfig;
    this.mapSource = this.mapsrc = pspconfig.mapSource;
    this.screenLevelWidget = bconfig.screenLevelWidget;
    this.defaultpinimage = bconfig.defaultPinImage;
    this.locationdata = bconfig.locationData;
    this.zoomlevel = pspconfig.zoomLevel;
    this.showzoomcontrol = pspconfig.showZoomControl || true;
    this.markers = [];
    this.displaymaptypecontrols = true;
    this.onpinclick = bconfig.onPinClick;
    this.onselection = bconfig.onSelection;
    this.onboundschanged = bconfig.onBoundsChanged;
    this.autocenterpinonclick = bconfig.autoCenterPinOnClick;
    this.onmaploaded = bconfig.onMapLoaded;
    this.enablemultiplecallouts = bconfig.enableMultipleCallouts;
    this.containerheight = lconfig.containerHeight;
    this.containerheightreference = lconfig.containerHeightReference || constants.CONTAINER_HEIGHT_BY_FORM_REFERENCE;

    defineGetter(this, "mapKey", function() {
        return this.mapApiKey;
    });
    defineSetter(this, "mapKey", function(val) {
        this.mapApiKey = val;
    });
    defineGetter(this, "autoCenterPinOnClick", function() {
        return this.autocenterpinonclick;
    });
    defineSetter(this, "autoCenterPinOnClick", function(val) {
        this.autocenterpinonclick = val;
    });
    defineGetter(this, "containerHeight", function() {
        return this.containerheight;
    });
    defineSetter(this, "containerHeight", function(val) {
        this.containerheight = val;
        voltmx.model.updateView(this, "containerheight", val);
    });

    defineGetter(this, "displayMapTypeControls", function() {
        return this.displaymaptypecontrols;
    });
    defineSetter(this, "displayMapTypeControls", function(val) {
        this.displaymaptypecontrols = val;
    });

    defineGetter(this, "containerHeightReference", function() {
        return this.containerheightreference;
    });
    defineSetter(this, "containerHeightReference", function(val) {
        this.containerheightreference = val;
        voltmx.model.updateView(this, "containerheightreference", val);
    });


    
    this.wType = "Map";
    this.name = "voltmx.ui.Map";

    var address = pspconfig.address;
    defineGetter(this, "address", function() {
        return address;
    });
    defineSetter(this, "address", function(val) {
        address = val;
        $KW[this.wType]["updateView"](this, "address", val);
    });

    
    this.calloutPostion = bconfig.calloutPostion;

    this.widgetdatamapforcallout = bconfig.widgetDataMapForCallout; 
    defineGetter(this, "widgetDataMapForCallout", function() {
        return this.widgetdatamapforcallout;
    });
    defineSetter(this, "widgetDataMapForCallout", function(val) {
        this.widgetdatamapforcallout = val;
    });

    this.callouttemplate = bconfig.calloutTemplate;
    this.calloutwidth = bconfig.calloutWidth;
    defineGetter(this, "calloutTemplate", function() {
        return this.callouttemplate;
    });
    defineSetter(this, "calloutTemplate", function(val) {
        this.callouttemplate = val;
    });

    
    defineGetter(this, "calloutWidth", function() {
        return this.calloutwidth;
    });
    defineSetter(this, "calloutWidth", function(val) {
        this.calloutwidth = val;
        $KW.Map.setUpInteractiveCanvasMap();
    });

    var mode = pspconfig.mode || constants.MAP_VIEW_MODE_NORMAL;
    defineGetter(this, "mode", function() {
        return mode;
    });
    defineSetter(this, "mode", function(val) {
        mode = val;
        $KW[this.wType]["updateView"](this, "mode", val);
    });

    this.setGetterSetter();
    bconfig.locationData && $KW[this.wType]["updateView"](this, "locationdata", bconfig.locationData);
};

voltmx.inherits(voltmx.ui.Map, voltmx.ui.Widget);

voltmx.ui.Map.prototype.setGetterSetter = function() {
    defineGetter(this, "zoomLevel", function() {
        return this.zoomlevel;
    });
    defineSetter(this, "zoomLevel", function(val) {
        this.zoomlevel = val;
        $KW[this.wType]["updateView"](this, "zoomlevel", val);
    });

    defineGetter(this, "showZoomControl", function() {
        return this.showzoomcontrol;
    });
    defineSetter(this, "showZoomControl", function(val) {
        this.showzoomcontrol = val;
        $KW[this.wType]["updateView"](this, "showzoomcontrol", val);
    });

    defineGetter(this, "locationData", function() {
        return this.locationdata;
    });
    defineSetter(this, "locationData", function(val) {
        this.locationdata = val;
        $KW[this.wType]["updateView"](this, "locationdata", val);
    });

    defineGetter(this, "defaultPinImage", function() {
        return this.defaultpinimage;
    });
    defineSetter(this, "defaultPinImage", function(val) {
        this.defaultpinimage = val;
        $KW[this.wType]["updateView"](this, "defaultpinimage", val);
    });

    defineGetter(this, "onPinClick", function() {
        return this.onpinclick;
    });
    defineSetter(this, "onPinClick", function(val) {
        this.onpinclick = val;
    });

    defineGetter(this, "onSelection", function() {
        return this.onselection;
    });
    defineSetter(this, "onSelection", function(val) {
        this.onselection = val;
    });

    defineGetter(this, "onBoundsChanged", function() {
        return this.onboundschanged;
    });
    defineSetter(this, "onBoundsChanged", function(val) {
        this.onboundschanged = val;
    });
    defineGetter(this, "onMapLoaded", function() {
        return this.onmaploaded;
    });
    defineSetter(this, "onMapLoaded", function(val) {
        this.onmaploaded = val;
    });
    defineGetter(this, "enableMultipleCallouts", function() {
        return this.enablemultiplecallouts;
    });
    defineSetter(this, "enableMultipleCallouts", function(val) {
        this.enablemultiplecallouts = val;
    });
};


voltmx.ui.Map.prototype.navigateTo = function(index, showcallout) {
    $KW.Map.navigateTo(this, index, showcallout);
};

voltmx.ui.Map.prototype.navigateToLocation = function(locationData, showcallout, dropPin) {
    $KW.Map.navigateToLocation(this, locationData, showcallout, dropPin);
};
voltmx.ui.Map.prototype.routeLocations = function(startLocation, endLocation, locations, routeConfig) {
    $KW.Map.routeLocations(this, startLocation, endLocation, locations, routeConfig);
};
voltmx.ui.Map.prototype.dismissCallout = function(mapid, location) {
    $KW.Map.dismissCallout(this, mapid, location);
};
voltmx.ui.Map.prototype.setCalloutVisibility = function(visibilityFlag, pindataArr) {
    $KW.Map.setCalloutVisibility(this, visibilityFlag, pindataArr);
};
voltmx.ui.Map.prototype.addPin = function(pindata) {
    $KW.Map.addPin(this, pindata);
};
voltmx.ui.Map.prototype.addPins = function(pindataArr) {
    $KW.Map.addPins(this, pindataArr);
};
voltmx.ui.Map.prototype.updatePin = function(pindata) {
    $KW.Map.updatePin(this, pindata);
};
voltmx.ui.Map.prototype.updatePins = function(pindataArr) {
    $KW.Map.updatePins(this, pindataArr);
};
voltmx.ui.Map.prototype.removePin = function(pindata) {
    $KW.Map.removePin(this, pindata, true);
};
voltmx.ui.Map.prototype.removePins = function(pindataArr) {
    $KW.Map.removePins(this, pindataArr);
};
voltmx.ui.Map.prototype.addPolygon = function(polydata) {
    $KW.Map.addPolygon(this, polydata);
};
voltmx.ui.Map.prototype.addPolyline = function(polylinedata) {
    $KW.Map.addPolyline(this, polylinedata);
};
voltmx.ui.Map.prototype.addCircle = function(circleData) {
    this.locationdata = [circleData.centerLocation];
    $KW.Map.addCircle(this, circleData);
};
voltmx.ui.Map.prototype.clear = function() {
    $KW.Map.clear(this);
};
voltmx.ui.Map.prototype.removeCircle = function(circleID) {
    $KW.Map.removeCircle(this, circleID);
};
voltmx.ui.Map.prototype.removePolygon = function(polygonID) {
    $KW.Map.removePolygon(this, polygonID);
};
voltmx.ui.Map.prototype.removePolyline = function(polylineID) {
    $KW.Map.removePolyline(this, polylineID);
};
