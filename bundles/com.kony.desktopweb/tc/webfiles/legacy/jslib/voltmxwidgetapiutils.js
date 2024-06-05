
$KW.APIUtils = (function() {
    
    

    var module = {
        setvisibility: function(widgetModel, value) {
            if(widgetModel) {
                widgetModel = $KW.Utils.getActualWidgetModel(widgetModel);
                if(widgetModel.parent && widgetModel.parent.wType == "TabPane") 
                    return;

                widgetModel.isvisible = value;
                var element, element2, tabpaneWidgetModel;

                if(widgetModel.wType == "Tab") {
                    if(widgetModel.kmasterid) {
                        tabpaneWidgetModel = $KU.getWidgetModelByID(widgetModel.id);
                    } else {
                        tabpaneWidgetModel = voltmx.model.getWidgetModel(widgetModel.pf, widgetModel.parent && widgetModel.parent.id);
                    }
                    if(tabpaneWidgetModel.view === 'tabview') {
                        element = $KU.getElementById($KW.Utils.getKMasterWidgetID(widgetModel) + "_Li");
                        element2 = $KU.getElementById($KW.Utils.getKMasterWidgetID(widgetModel) + "_Body");
                    } else
                        element = $KU.getNodeByModel(widgetModel);
                } else
                    element = $KW.Utils.getWidgetNode(widgetModel);

                element = $KW.Utils.getClonedTemplateNode(element, widgetModel, "isvisible");

                if(element) {
                    var isFlexWidget = $KW.FlexUtils.isFlexWidget(widgetModel);
                    if(widgetModel.wType == 'CheckBoxGroup' || widgetModel.wType == 'RadioButtonGroup' || widgetModel.wType == 'ListBox' || (widgetModel.wType == 'Segment' && !isFlexWidget)) {

                        var data = widgetModel.masterdata || widgetModel.data || $KW.Utils.getMasterData(widgetModel);
                        if(!data || (data && data.length <= 0))
                            value = false;
                    }

                    
                    var displayNode = isFlexWidget ? element.parentNode : element;
                    if(value.toString() == "false") {
                        $KU.addClassName(displayNode, "hide");
                    } else {
                        $KU.removeClassName(displayNode, "hide");
                        if(widgetModel.wType == "Tab" && tabpaneWidgetModel.view === 'tabview' || widgetModel.wType === "TPW") {
                            element.style.display = "inline";
                        }
                    }

                    this.onVisibilityChange(widgetModel, value);

                    if(widgetModel.viewtype && widgetModel.viewtype == "pageview") {
                        
                        widgetModel.isvisible && $KW.touch.computeWidths($KU.getNodeByModel(widgetModel), widgetModel);
                    }

                    if(value && widgetModel.wType === "Switch") { 
                        $KW.Switch.adjustWidth(widgetModel, element, false);
                        $KW.Switch.adjustHeight(widgetModel, element);
                    }

                    if(value && widgetModel.wType === "Calendar") { 
                        $KW.Calendar.setCalElementStyle(element.childNodes[0], true);
                        value && $KW.Calendar.adjustCalendars(widgetModel);
                    }

                    if(value && widgetModel.wType == "Slider") {
                        var slider = $KU.getNodeByModel(widgetModel);
                        $KW.Slider.imgLoad(slider.childNodes[0]);
                    }

                    value && widgetModel.ownchildrenref && $KW.Utils.reinitializeWidgets(widgetModel);
                    if(typeof google != "undefined")
                        $KW.Utils.resizeMap(widgetModel);
                } else {
                    if(widgetModel.kmasterid) {
                        tabpaneWidgetModel = $KU.getWidgetModelByID(widgetModel.id);
                    } else {
                        tabpaneWidgetModel = voltmx.model.getWidgetModel(widgetModel.pf, widgetModel.parent && widgetModel.parent.id);
                    }
                    if(tabpaneWidgetModel && tabpaneWidgetModel.viewtype === 'tabview') {
                        element = $KU.getElementById($KW.Utils.getKMasterWidgetID(widgetModel) + "_Li");
                        element2 = $KU.getElementById($KW.Utils.getKMasterWidgetID(widgetModel) + "_Body");

                        if(value.toString() == "false")
                            $KU.addClassName(element, "hide");
                        else {
                            $KU.removeClassName(element, "hide");
                            if(tabpaneWidgetModel.viewtype === 'tabview') {
                                element.style.display = "inline";
                            }
                        }
                    } else
                        element = $KU.getNodeByModel(widgetModel);
                }

                if(element2) {
                    var index = element.getAttribute("index");
                    if(value == false || value == "false")
                        $KU.addClassName(element2, "hide");
                    else {
                        if(tabpaneWidgetModel && ((tabpaneWidgetModel.activetab - IndexJL) == parseInt(index))) {
                            $KU.removeClassName(element2, "hide");
                        }
                    }
                }
                

                if(value) {
                    if(widgetModel.id) {
                        var currentFormId = widgetModel.pf || "";
                        var widgetElement = $KU.getElementById(currentFormId + "_" + widgetModel.id);
                        var lineNodes = widgetElement && widgetElement.querySelectorAll("#" + currentFormId + " div[kwidgettype='Line'][direction='V']");
                        if(lineNodes && lineNodes.length > 0) {
                            $KW.Line.initializeView(currentFormId);
                        }
                    }
                    if(widgetModel.wType == "FlexContainer" || widgetModel.wType == "FlexScrollContainer") {
                        setTimeout(function() {
                            $KG.isUILayedOut = false;
                            widgetModel.forceLayout();
                            $KW.Image.imgOrientationHandler(widgetModel);
                            $KG.isUILayedOut = true;
                        }, 1);
                    }
                }
                
                setTimeout(function() {
                    $KW.Map && $KW.Map.map && google.maps.event.trigger($KW.Map.map, 'resize');
                }, 1);
            }
        },

        
        onVisibilityChange: function(wModel, value) {
            $KW.FlexUtils.updateLayoutConfig(wModel);
            $KW.FlexUtils.updateAutoGrowFlexConfig(wModel);
            value && wModel.ownchildrenref && $KW.FlexUtils.updateWidgetsConfig(wModel, wModel.ownchildrenref);
        },

        setenabled: function(widgetModel, value) {
            if(!widgetModel || typeof value != "boolean")
                return;

            widgetModel.disabled = !value;
            var id = $KW.Utils.getKMasterWidgetID(widgetModel); 
            if((widgetModel.wType == "Tab" || widgetModel.name == "voltmx.ui.Tab")) {
                if(widgetModel.parent.viewtype == "tabview") {
                    var tabHeader = $KU.getElementById(id + "_A");
                    if(tabHeader) {
                        tabHeader.disabled = !value;
                        tabHeader.setAttribute("kdisabled", !value);
                        var tabBody = $KU.getElementById(id + "_Body");
                        tabBody.setAttribute("kdisabled", !value);
                        id = id + "_Body";
                    }
                }
                if(widgetModel.parent.viewtype == "collapsibleview") {
                    id = id + "_Tab";
                }
            }
            var children = document.querySelectorAll("#" + id + ", #" + id + " [kwidgettype]");
            var node, widgettype, tpwidgettype, notinmodal;
            for(i = 0; i < children.length; i++) {
                node = children[i];
                widgettype = node.getAttribute("kwidgettype");
                tpwidgettype = node.getAttribute("tpwidgettype");
                
                if($KU.isWindowsPhone && $KU.isIE9 && node.tagName == 'SELECT') {
                    for(var j = 0; j < node.childNodes.length; j++) {
                        node.children[j].disabled = !value;
                    }
                }
                notinmodal = node.getAttribute('notinmodal');
                if(!notinmodal) {
                    if(widgettype != "Label") { 
                        node.disabled = !value;
                    }
                }
                
                if(widgettype == "RichText")
                    var aEle = document.querySelectorAll("#" + node.id + " a");
                if(widgettype == "RichText" && aEle && !value) {
                    node.ishref = true;
                    node.innerHTML = node.innerHTML.replace(/href=["'].*?["']/g, "href='javascript:void(0)'");
                } else if(node.ishref) {
                    node.innerHTML = widgetModel.text;
                }
                if((widgettype == "RadioButtonGroup" || widgettype == "CheckBoxGroup") && node.tagName == "INPUT" && widgetModel.itemorientation == "vertical") 
                    node.parentNode.setAttribute("kdisabled", !value);

                if(widgetModel.wType == "Label") {
                    var propertyValue = !!(value && widgetModel.textCopyable) ? "text" : "none";
                    if('MozUserSelect' in node.style) {
                        node.style.MozUserSelect = propertyValue;
                    } else if('webkitUserSelect' in node.style) {
                        node.style.webkitUserSelect = propertyValue;
                    } else if('msUserSelect' in node.style) {
                        node.style.msUserSelect = propertyValue;
                    }
                }
                if(widgettype == "Video") {

                    if(value) {
                        node.oncontextmenu = "";
                        node.playing && node.paused && node.play();
                        if(widgetModel.controls)
                            node.setAttribute("controls", "controls");
                    } else {
                        node.playing && node.pause();
                        node.removeAttribute("controls");
                        node.oncontextmenu = function() {
                            return false
                        };
                    }
                }

                node.setAttribute("kdisabled", !value); 

                
                if(widgetModel.wType === "Map" && (node.getAttribute("kwidgettype") === "Map" || node.getAttribute("kwidgettype") === "googlemap")) {
                    widgetModel.disabled = !value;
                    $KW.Map.setEnabledMap(widgetModel, node);
                }
            }
        },

        setfocus: function(widgetModel, popupModel, element, needToSetCursor) {
            var widgetHTMLObj = (element) ? element : $KU.getNodeByModel(widgetModel);
            if(widgetModel.wType == "TextArea" || widgetModel.wType == "TextField") {
                widgetHTMLObj && widgetHTMLObj.focus();
            } else {
                widgetHTMLObj && $KW.Utils.scrollToElement(widgetModel, widgetHTMLObj);
            }
        },

        
        
        
        
        getContentOffsetMeasured: function(model, widgetNode) {
            var contentOffSet = {
                x: 0,
                y: 0
            };

            var node = widgetNode || $KU.getNodeByModel(model);
            if(model.wType == 'Segment' && model.viewType == 'pageview') {
                if(node) {
                    contentOffSet.x = model.data.length * model.swipeContext.imageWidth - node.scrollWidth;
                    contentOffSet.y = 0;
                }
            } else {
                if(node) {
                    contentOffSet.x = node.scrollLeft;
                    contentOffSet.y = node.scrollTop;
                }
            }
            return contentOffSet;
        },

        getModelForContentOffset: function(formId, widgetType) {
            var widgetNodes = document.querySelectorAll("#" + formId + " div[kwidgettype='" + widgetType + "']");
            for(var i = 0; i < widgetNodes.length; i++) {
                var model = $KU.getModelByNode(widgetNodes[i]);
                model.contentoffset && module.setContentOffSet(model, model.contentoffset, false);
            };
        },

        setContentOffSet: function(model, contentOffSet, animate) {
            _setTopLeftToNode = function(model, node, left, top) {
                module.setfocus(model);
                node.scrollLeft = left;
                node.scrollTop = top;
            }
            var scrollerInstance;
            var element = $KU.getNodeByModel(model);
            var left = 0,
                top = 0;
            left = $KW.FlexUtils.getValueByParentFrame(model, $KW.FlexUtils.getValueAndUnit(model, contentOffSet.x), 'x', model.frame);
            top = $KW.FlexUtils.getValueByParentFrame(model, $KW.FlexUtils.getValueAndUnit(model, contentOffSet.y), 'y', model.frame);

            if(model.wType == 'Segment' && model.viewType == constants.SEGUI_VIEW_TYPE_PAGEVIEW && model.swipeContext) {
                var pageIndex = left && parseInt(left / model.swipeContext.imageWidth);
                if(pageIndex < 0) pageIndex = 0;
                if(pageIndex > model.data.length) pageIndex = model.data.length - 1;
                var imgsElement = element.children[0];
                $KW.touch.scrollImages(imgsElement, model.swipeContext.imageWidth * pageIndex, $KU.swipeDuration, false);
                model.swipeContext.currentPage = pageIndex;
                $KW.touch.updatePageIndicator(element, model.swipeContext, model);
                return;
            }
            var node = $KU.getNodeByModel(model);
            if(model.wType == 'Segment' && $KW.Segment.isLazyLoadingApplicable(model)) {
                node && $KW.Segment.generateAndAdjustSegmentTillContentOffSetReached(model, node, top);
            }
            if(node) {
                _setTopLeftToNode(model, node, left, top);
            }
        },

        getOnScrollWidgets: function(widgetModel, onScrollWidgets) {
            var childModel = null,
                i = 0,
                length = 0,
                children = [];

            if($KW.FlexUtils.isFlexContainer(widgetModel)) {
                children = widgetModel.widgets();
            }

            length = children.length;

            for(i = 0; i < length; i++) {
                childModel = children[i];

                if(childModel.onscrollwidgetposition) {
                    onScrollWidgets.push(childModel);
                }

                if($KW.FlexUtils.isFlexContainer(childModel)) {
                    this.getOnScrollWidgets(childModel, onScrollWidgets);
                }
            }

            return onScrollWidgets;
        },

        executeOnScrollingWidgetPosition: function(parentModel) {
            var onScrollWidgets, parentNode, i, widgetModel, widgetNode, pos, onScrollWidgetPositionEvent;

            onScrollWidgets = this.getOnScrollWidgets(parentModel, []);
            parentNode = $KU.getNodeByModel(parentModel);

            for(i = 0; i < onScrollWidgets.length; i++) {
                widgetModel = onScrollWidgets[i];
                widgetNode = $KU.getNodeByModel(widgetModel);
                pos = $KW.Utils.getPosition(widgetNode);
                onScrollWidgetPositionEvent = widgetModel.onscrollwidgetposition;
                onScrollWidgetPositionEvent && $KU.executeWidgetEventHandler(widgetModel, onScrollWidgetPositionEvent, pos.left, pos.top, widgetModel.frame.x, widgetModel.frame.y);
            }
            $KW.FlexContainer.forceLayout(parentModel);
        }
    };


    return module;
}());
