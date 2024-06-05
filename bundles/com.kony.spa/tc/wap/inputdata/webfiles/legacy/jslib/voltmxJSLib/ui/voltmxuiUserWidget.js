voltmx.ui.KMasterTemplate = function(bconfig, lconfig, pspconfig, template) {
    var args = [];
    if(arguments.length < 3) {
        bconfig = lconfig = pspconfig = $KU.mergeDefaults(bconfig, $KU.getAllDefaults("UserWidget"));
        args.push(bconfig);
    } else {
        args.push(bconfig);
        args.push(lconfig);
        args.push(pspconfig);
    }

    var wModel = _voltmx.mvc.initializeMasterController(template, bconfig.id, args);

    var requireFlexRTL = $KW.FlexUtils.shouldApplyRTL(wModel, "flexPosition");
    for(var prop in bconfig) {
        if(requireFlexRTL) {
            if(prop == "left") {
                wModel["right"] = bconfig["left"];
            } else if(prop == "right") {
                wModel["left"] = bconfig["right"];
            } else {
                wModel[prop] = bconfig[prop];
            }
        } else {
            wModel[prop] = bconfig[prop];
        }
    }
    wModel.isMaster = true;
    
    if(wModel.children) {
        for(var i = 0; i < wModel.children.length; i++) {
            var childModel = wModel[wModel.children[i]];
            updateImmediateMasterToChilds(childModel, wModel);
        }
    }
    wModel.__bconfig = bconfig;
    wModel.className = template;
    _voltmx.mvc.setMasterContract(wModel, wModel.id, template);
    return wModel;
};

voltmx.ui.KComponentTemplate = function(bconfig, lconfig, pspconfig, template) {
    var args = [];
    if(arguments.length < 3) {
        bconfig = lconfig = pspconfig = $KU.mergeDefaults(bconfig, $KU.getAllDefaults("KComponent"));
        args.push(bconfig);
    } else {
        args.push(bconfig);
        args.push(lconfig);
        args.push(pspconfig);
    }
    var userWidgetinstance = new voltmx.ui.KComponent(bconfig, lconfig, pspconfig);
    var userWidgetobj = _voltmx.mvc.initializeMasterController(template, userWidgetinstance.id, args);
    var requireFlexRTL = $KW.FlexUtils.shouldApplyRTL(userWidgetobj, "flexPosition");
    var doNotOverrideProps = ['preShow', 'postShow', 'destroy', 'onHide']; 

    for(var prop in bconfig) {
        if(doNotOverrideProps.indexOf(prop) == -1) {
            if(requireFlexRTL) {
                if(prop == "left") {
                    userWidgetobj["right"] = bconfig["left"]; 
                } else if(prop == "right") {
                    userWidgetobj["left"] = bconfig["right"];
                } else {
                    userWidgetobj[prop] = bconfig[prop];
                }
            } else {
                userWidgetobj[prop] = bconfig[prop];
            }
        }
	}
    userWidgetobj['height'] = bconfig['height']; 
    userWidgetobj._userWidget = true;
    userWidgetobj.isMaster = true;
    userWidgetinstance.userWidgetProxyObject = userWidgetobj;
    userWidgetinstance._voltmxControllerName = userWidgetobj._voltmxControllerName;
    $KU.invokeAddWidgets(userWidgetobj);

    var overrideProps = ["accessibilityConfig", "margin", "padding", "skin", "left", "right", "top", "bottom", "width", "height", "minWidth", "maxWidth", "minHeight", "maxHeight", "centerX", "centerY", "zIndex", "doLayout", "opacity", "transform", "anchorPoint", "backgroundColor", "borderWidth", "borderColor", "cornerRadius", "enableScrolling", "scrollDirection", "contentOffset", "contentSize", "contentOffsetMeasured", "contentSizeMeasured", "bounces", "allowHorizontalBounce", "allowVerticalBounce", "horizontalScrollIndicator", "verticalScrollIndicator", "pagineEnabled", "dragging", "tracking", "decelerating", "onScrollStart", "onScrollTouchReleased", "onScrolling", "onDecelerationStarted", "onScrollEnd", "layoutType", "clipBounds", "contentAlignment", "containerWeight", "focusSkin", "isVisible", "onClick", "onTouchStart", "onTouchMove", "onTouchEnd"];
    var tmpController = _voltmx.mvc.getControllerName2ControllerMap(userWidgetinstance._voltmxControllerName);   
    var keys = Object.keys(tmpController[userWidgetinstance._voltmxControllerName]);
    for(var i=0; i<keys.length; i++){
           if(overrideProps.includes(keys[i])){
               overrideProps.splice((overrideProps.indexOf(keys[i])),1);
           }
    } 
    for(var val in overrideProps) {
        (function(prop) {
            Object.defineProperty(userWidgetinstance, prop, {
                get: function() {
                    return userWidgetinstance.userWidgetProxyObject[prop];
                },
                set: function(newVal) {
                    userWidgetinstance.userWidgetProxyObject[prop] = newVal;
                }
            });
        })(overrideProps[val]);
    }

    _voltmx.mvc.setMasterContract(userWidgetinstance, userWidgetinstance.id, template);

    return userWidgetinstance;
};


voltmx.ui.KComponent = function(bconfig, lconfig, pspconfig) {

    if(arguments.length < 3)
        bconfig = lconfig = pspconfig = $KU.mergeDefaults(bconfig, $KU.getAllDefaults("KComponent"));

    voltmx.ui.KComponent.baseConstructor.call(this, bconfig, lconfig, pspconfig);
    this.wType = "KComponent";
    this.name = "voltmx.ui.KComponent";

    
    this.ownchildrenref = [];
    this.children = [];
    this.allboxes = [];

};

voltmx.inherits(voltmx.ui.KComponent, voltmx.ui.FlexContainer);

voltmx.ui.KComponent.prototype.forceLayout = function() {
    $KW.KComponent.forceLayout(this);
};
