voltmx.model = (function() {
    
    

    var module = {
        
        update: function(model, prop, value) {
            if(model == undefined || model == null) {
                voltmx.print("voltmx.model.update:Error in Model,value is undefined or null");
                return;
            }
            if(model["wType"] == undefined || (model[prop] && model[prop]["wType"])) {
                model[prop] = value;
            } else {
                var widgetModel = model;
                var wType = widgetModel.wType;
                if(wType == "TPW") {
                    var nsArr = widgetModel.widgetName.split('.');
                    var namespace = window;
                    for(var j = 0; j < nsArr.length; j++) {
                        namespace = namespace[nsArr[j]];
                    }
                    namespace["modelChange"] && namespace["modelChange"](model, prop, value);
                } else {
                    prop = prop.toLowerCase();
                    var oldValue = widgetModel[prop];
                    $KI.i18n && $KI.i18n.checkI18nStatus(widgetModel, prop);
                    widgetModel[prop] = value;
                    this.updateView(widgetModel, prop, value, oldValue);
                }
            }
        },

        updateView: function(widgetModel, propertyName, propertyValue, oldPropertyValue) {
            var element;
            if(widgetModel.wType == "Form")
                element = document.getElementById(widgetModel.id);
            else if(widgetModel.wType == "Popup")
                element = document.getElementById(widgetModel.id + "_body");
            else
                element = $KU.getNodeByModel(widgetModel);

            if(widgetModel.wType == "TabPane" && widgetModel.viewtype == constants.TABPANE_VIEW_TYPE_TABVIEW)
                element = document.getElementById(widgetModel.pf + "_" + widgetModel.id + "_Body"); 

            element = $KW.Utils.getClonedTemplateNode(element, widgetModel, propertyName);

            switch(propertyName) {
                case "onhover":
                    new $KI.HoverInit(widgetModel);
                    break;

                case "skin":
                    this.updateWidgetSkin(widgetModel, element, propertyValue, oldPropertyValue);
                    break;

                case "focusskin":
                case "rowfocusskin":
                case "activefocusskin":
                    $KW.skins.updateFocusSkin(widgetModel, widgetModel.rowfocusskin ? "rowfocusskin" : "focusskin");
                    break;
                case "hoverskin":
                    $KW.skins.updateFocusSkin(widgetModel, "hoverskin");
                    break;

                case "tooltip":
                    element && (element.title = propertyValue);
                    break;

                case "isvisible":
                    $KW.APIUtils.setvisibility(widgetModel, propertyValue);
                    break;

                case "margin":
                    if(element && !$KW.FlexUtils.isFlexWidget(widgetModel)) {
                        $KW.skins.setMarginPadding(element, propertyName, widgetModel, propertyValue);
                    }
                    break;

                case "padding":
                    this.updateWidgetPadding(widgetModel, element, propertyValue, oldPropertyValue);
                    break;

                case "containerweight":
                    this.updateWidgetContainerWeight(widgetModel, element, propertyValue, oldPropertyValue);
                    break;

                case "containerheightreference":
                case "containerheight":
                    this.updateContainerHeight(widgetModel, element, propertyValue, oldPropertyValue);
                    break;

                case "backgroundimage":
                    $KW.Utils.updateNormalImage(widgetModel);
                    break;

                case "contentalignment":
                    this.updateWidgetContentAlignment(widgetModel, element, propertyValue, oldPropertyValue);
                    break;

                case "accessibilityConfig":
                    if(!element || widgetModel.wType == "RadioButtonGroup" || widgetModel.wType == "CheckBoxGroup") return;

                    $KU.addAriatoElement(element, propertyValue, widgetModel, oldPropertyValue);

                    break;

                case "zindex":
                case "opacity":
                case "transform":
                case "anchorpoint":
                case "backgroundcolor":
                case "bordercolor":
                    this.updateLayoutProps(widgetModel, propertyName, propertyValue);
                    break;

                
                case "touchstart":
                case "touchmove":
                case "touchend":
                    if(widgetModel.touches && widgetModel.touches[propertyName] && widgetModel.touches[propertyName].callback === propertyValue)
                        break;
                    $KW.Utils.removetouch(widgetModel, propertyName, false);
                    $KW.Utils.updateModelWithTouches(widgetModel, propertyName, propertyValue);
                    var element = $KW.Utils.getWidgetNode(widgetModel);
                    if(element && widgetModel.touches[propertyName]) {
                        
                        if(element.id && element.id.indexOf("_scroller") > 0) {
                            element = element.childNodes[0];
                        }
                        widgetModel.touches[propertyName]["instance"] = new $KW.touch.TouchEvents(widgetModel, element, propertyName, propertyValue);
                    }
                    break;

                case "borderwidth":
                case "cornerradius":
                    var element = $KW.Utils.getWidgetNode(widgetModel);
                    element = $KW.Utils.getClonedTemplateNode(element, widgetModel, propertyName);

                    
                    
                    if(widgetModel.wType === 'FlexContainer') {
                       element = element.firstChild;
                    }

                    if(propertyName == "borderwidth")
                        element && (element.style.borderWidth = propertyValue + "px");
                    if(propertyName == "cornerradius")
                        element && (element.style.borderRadius = propertyValue + "px");
                    break;

                case "shadowcolor":
                case "shadowoffset":
                case "shadowradius":
                    this.updateShadowProps(widgetModel, propertyName);
                    break;

                case "cursortype":
                    element && this.updateWidgetCursor(widgetModel, element);
                    break;
                case "flexblur":
                    if(element) {
                        if(widgetModel.wType == "FlexContainer") element = element.parentNode;

                        var blur = $KW.skins.getBlurStyle(widgetModel);

                        if(blur) {
                            blur = blur.replace('filter:', '').replace(';', '');
                            element.style.filter = blur;
                        } else {
                            element.style.removeProperty('filter');
                        }
                    }
                    break;
                case "widgetSwipeMove":
                    element && $KW.Utils.applyGesturestoDOM(widgetModel, element);
                    break;

                default:
                    var wType = (widgetModel.wType == "Tab") ? "TabPane" : widgetModel.wType;
                    var widget = $KW[wType];
                    widget["updateView"] && widget["updateView"](widgetModel, propertyName, propertyValue, oldPropertyValue);
            }
        },

        updateWidgetCursor: function(widgetModel, element) {
            var cursor = $KW.Utils.getCursorStyle(widgetModel);
            if(cursor) {
                element.style.cursor = cursor;
            }
        },

        updateShadowProps: function(widgetModel, propertyName) {
            var element = $KW.Utils.getWidgetNode(widgetModel);
            if(!element)
                return;
            element = $KW.Utils.getClonedTemplateNode(element, widgetModel, propertyName);
            var boxStyle = $KW.Utils.getBoxShadowStyle(widgetModel);

            if($KW.FlexUtils.isFlexWidget(widgetModel))
                element.parentNode.style["box-shadow"] = boxStyle;
            else
                element.style["box-shadow"] = boxStyle;
        },

        updateLayoutProps: function(widgetModel, propertyName, propertyValue, node, animType) {
            var element = node || $KW.Utils.getWidgetNode(widgetModel);
            element = $KW.Utils.getClonedTemplateNode(element, widgetModel, propertyName);
            switch(propertyName) {
                case "zindex":
                    if(element) {
                        if($KW.FlexUtils.isFlexWidget(widgetModel))
                            element.parentNode.style.zIndex = propertyValue;
                        else
                            element.style.zIndex = propertyValue;
                    }
                    break;

                case "opacity":
                    if(element) {
                        if($KW.FlexUtils.isFlexWidget(widgetModel))
                            element.parentNode.style.opacity = propertyValue;
                        else
                            element.style.opacity = propertyValue;
                    }
                    break;

                case "transform":
                    if(element) {
                        var style = $KW.animUtils.applyTransform(widgetModel, propertyValue);
                        var target;
                        if(animType == 'segmentRow')
                            target = element;
                        else {
                            if($KW.FlexUtils.isFlexWidget(widgetModel))
                                target = element.parentNode;
                            else
                                target = element;
                        }

                        target.style[vendor + "Transform"] = style;
                        target.style["transform"] = style;
                    }
                    break;

                case "anchorpoint":
                    if(element) {
                        var target;
                        if(animType == 'segmentRow')
                            target = element;
                        else {
                            if($KW.FlexUtils.isFlexWidget(widgetModel))
                                target = element.parentNode;
                            else
                                target = element;
                        }
                        if(propertyValue) {
                            if((propertyValue.x < 0) || (propertyValue.x > 1) || (propertyValue.y < 0) || (propertyValue.y > 1))
                                return;
                            target.style[vendor + "TransformOrigin"] = (propertyValue.x * 100) + "% " + (propertyValue.y * 100) + "% ";
                        } else {
                            target.style[vendor + "TransformOrigin"] = "50% 50%";
                        }
                    }
                    break;

                case "backgroundcolor":
                case "bordercolor":
                    var validate = $KW.skins.validateHexValue(propertyValue);
                    if(validate) {
                        var result = $KW.skins.convertHexValuetoRGBA(propertyValue);
                    }
                    var element = $KW.Utils.getWidgetNode(widgetModel);
                    element = $KW.Utils.getClonedTemplateNode(element, widgetModel, propertyName);

                    
                    
                    if(widgetModel.wType === 'FlexContainer') {
                        element = element.firstChild;
                    }

                    if(propertyName == "backgroundcolor")
                        element && (element.style.background = result);
                    else if(propertyName == "bordercolor")
                        element && (element.style.borderColor = result);
                    break;
            }
        },

        
        updateWidgetSkin: function(widgetModel, element, propertyValue, oldPropertyValue) {
            if(widgetModel.wType == "Form") {
                var formNode;
                if(!$KG.needScroller && !$KU.isBlackBerryNTH)
                    document.body.className = propertyValue || "";
                else if($KU.isBlackBerryNTH)
                    formNode = document.getElementById(widgetModel.id + "_container");
                else
                    formNode = document.getElementById(widgetModel.id + "_scroller");

                if(formNode) {
                    $KU.removeClassName(formNode, oldPropertyValue);
                    $KU.addClassName(formNode, propertyValue);
                }
            } else if(widgetModel.wType == "Tab")
                element = $KU.getElementById(widgetModel.pf + '_' + widgetModel.id + '_Body');
            else if(element && widgetModel.wType == "Image")
                element = element.parentNode;
            if(element) {
                var widgets = ["Phone", "Switch"];
                var wType = widgetModel.wType;
                if((widgets.indexOf(wType)) == -1) {
                    var defaultSkin = $KW.skins.getDefaultSkin(widgetModel);
                    $KU.removeClassName(element, oldPropertyValue || defaultSkin);
                    $KU.addClassName(element, propertyValue || defaultSkin);

                    if(widgetModel.wType == "Line")
                        $KW.Line.applySkin(element, propertyValue);
                    if(widgetModel.wType == "Calendar")
                        element.children[0].style.color = "inherit";

                    if($KW.FlexUtils.isFlexWidget(widgetModel) && !(widgetModel.wType == 'FlexContainer' && !widgetModel.clipbounds)) {
                        element = $KW.Utils.getWidgetNodeFromNodeByModel(widgetModel, element).parentNode;
                        if(!element) return;
                        $KU.removeClassName(element, oldPropertyValue || defaultSkin);
                        $KU.addClassName(element, propertyValue || defaultSkin);
                    }
                } else {
                    $KW.skins.updateDOMSkin(widgetModel, propertyValue, oldPropertyValue, element);
                }
            }

            
            if(widgetModel.wType == "Label") {
                $KW.Label.updateView(widgetModel, "linespacing", widgetModel.linespacing);
            }
        },

        
        updateWidgetPadding: function(widgetModel, element, propertyValue, oldPropertyValue) {
            if($KW.FlexUtils.isFlexContainer(widgetModel) || widgetModel.wType == 'Slider' || widgetModel.wType == 'Switch')
                return;
            var propertyName = "padding";
            var unit = (widgetModel.paddingInPixel) ? 'px' : '%';
            if(widgetModel.wType == "Segment") {
                if(widgetModel.viewtype == constants.SEGUI_VIEW_TYPE_PAGEVIEW && element) {
                    var segRows = element.childNodes[0].childNodes;
                    
                    for(var i = IndexJL; i < segRows.length; i++) {
                        element = segRows[i].childNodes[0];
                        element.style[propertyName] = $KU.joinArray(propertyValue, (unit+" ")) + unit;
                    }
                    return; 
                }
            }
            if(widgetModel.wType == "DataGrid" && element) {
                var isFlexWidget = $KW.FlexUtils.isFlexWidget(widgetModel);
                var rows = element.rows;
                for(var i = 0; i < rows.length; i++) {
                    for(var j = 0; j < rows[i].cells.length; j++) {
                        if(isFlexWidget)
                            $KW.FlexUtils.setPaddingByParent(widgetModel, rows[i].cells[j]);
                        else
                            rows[i].cells[j].style[propertyName] = $KU.joinArray(propertyValue, (unit+" ")) + unit;
                    }
                }
                return;
            }

            if(widgetModel.wType == "Image" && element)
                element = element.parentNode;
            if(element) {
                var e = element;
                element = (widgetModel.wType == "Form") ? element.parentNode : element;
                if($KW.FlexUtils.isFlexWidget(widgetModel))
                    $KW.FlexUtils.setPaddingByParent(widgetModel, element);
                else
                    element.style[propertyName] = $KU.joinArray(propertyValue, (unit+" ")) + unit;
            }
        },

        
        updateWidgetContainerWeight: function(widgetModel, element, propertyValue, oldPropertyValue) {
            return;
        },

        updateContainerHeight: function(widgetModel, element, propertyValue, oldPropertyValue) {

        },

        updateWidgetContentAlignment: function(widgetModel, element, propertyValue, oldPropertyValue) {
            var childNodes, cAlign = $KW.skins.getContentAlignment(widgetModel);
            if(element) {
                if(['Calendar', 'Label'].indexOf(widgetModel.wType) != -1 && $KW.FlexUtils.isFlexWidget(widgetModel)) {
                    var oldAlignClass = $KW.skins.getFlexContentAlignmentSkin(oldPropertyValue);
                    var newAlignClass = $KW.skins.getFlexContentAlignmentSkin(propertyValue);
                    if($KU.hasClassName(element, oldAlignClass)) {
                        $KU.removeClassName(element, oldAlignClass);
                    }
                    $KU.addClassName(element, newAlignClass);
                    if(widgetModel.wType === "Calendar" && widgetModel.calendarIconAlignment === constants.CALENDAR_ICON_ALIGN_AUTO) {
                        childNodes = element.childNodes;
                        if((propertyValue === constants.CONTENT_ALIGN_MIDDLE_LEFT || propertyValue === constants.CONTENT_ALIGN_CENTER)
                           && childNodes[0].tagName === "IMG") {
                            element.insertBefore(childNodes[0], childNodes[2]);
                        } else if(propertyValue === constants.CONTENT_ALIGN_MIDDLE_RIGHT && childNodes[1].tagName === "IMG") {
                            element.insertBefore(childNodes[1], childNodes[0]);
                        }

                    }
                } else {
                    element.style.textAlign = cAlign;
                }
            }
        },

        
        getWidgetModel: function(formID, widgetID, immediateParentID, tabID) {
            if(!formID)
                return null;

            var formModel = module.getWidgetRef(formID); 
            if(immediateParentID && formModel) {
                if(widgetID) {
                    var widgetModel = formModel[immediateParentID];
                    if(tabID)
                        return widgetModel[tabID]["header"][widgetID];
                    else
                        return widgetModel[widgetID];
                }
            }

            if(widgetID && formID != widgetID) {
                
                var widgetModel;
                if(typeof formModel != "undefined")
                    widgetModel = formModel[widgetID];
                else
                    widgetModel = window[widgetID];
                return widgetModel;
            }

            return formModel;
        },

        getWidgetRef: function(widgetID) {
            var obj = $KU.getFormModel(widgetID);
            var appName = $KU.getMicroAppName();
            if(obj && ["Form", "Form2"].contains(obj.wType))
                return obj;
            else
                return($KG[widgetID] || window[widgetID] || $KU.getTemplateModel(widgetID, appName));
        }
    };


    return module;
}());
