
$KW.FlexContainer = (function() {
    
    

    var module = {
        initialize: function() {
            voltmx.events.addEvent("click", "FlexContainer", this.eventHandler);
            voltmx.events.addEvent("keydown", "FlexContainer", this.keydownEventHandler);
            voltmx.events.addEvent("onorientationchange", "FlexContainer", this.orientationHandler);
        },

        initializeView: function(formId) {
        },

        orientationHandler: function(formId, orientation) {
        },

        
        updateView: function(widgetModel, propertyName, propertyValue, oldPropertyValue) {
            var element = $KU.getNodeByModel(widgetModel);

            $KW.Utils.updateMasterData({
                "widgetModel": widgetModel,
                'widgetNode': element,
                'propertyName': propertyName
            });

            if(!element)
                return;

            switch(propertyName) {
                case "clipbounds":
                    var isFlexWidget = $KW.FlexUtils.isFlexContainer(widgetModel);
                    if(isFlexWidget) {
                        var wrapperNode = element.parentNode.parentNode;
                        if(propertyValue == false) {
                            element.style.overflow = "visible";
                            wrapperNode.style.overflow = "visible";
                        } else {
                            element.style.overflow = "hidden";
                            element.style.boxShadow = "none";
                            wrapperNode.style.overflow = "hidden";
                        }
                    }
                    break;

                case "layouttype":
                    $KW.FlexUtils.cleanUpFlexLayout(widgetModel, element);
                    module.adjustFlexContainer(widgetModel);
                    break;
            }
        },

        render: function(flexModel, context) {
            return this.renderTableLayout(flexModel, context);
        },

        renderTableLayout: function(flexModel, context) {
            var computedSkin = $KW.skins.getWidgetSkinList(flexModel, context);

            var overflow = "";

            if(flexModel.clipbounds == true) {
                overflow = "overflow:hidden; box-shadow:none;";
            }
            var boxstyle = " position:relative; z-index:" + flexModel.zindex + ";" + overflow;
            var style = (flexModel.parent && flexModel.parent.wType == 'TabPane') ? '' : $KW.skins.getBaseStyle(flexModel, context);

            if(flexModel.layouttype === voltmx.flex.RESPONSIVE_GRID) {
                boxstyle += $KW.FlexUtils.getResponsiveContainerLayoutStyle(flexModel);
            }

            var htmlString = "";
            htmlString += "<div id='flexcontainer_wrapper' class=' ' style='width:100%; " + "'>";
            htmlString += "<div class = 'kwt100 " + computedSkin + "'" + $KW.Utils.getBaseHtml(flexModel, context) + " style='" + boxstyle + style + "'>";


            var wArrary = flexModel.widgets();
            if(wArrary.length > 0) {
                htmlString += this.renderChildren(flexModel, wArrary, context);
            }

            htmlString += "</div></div>";
            return htmlString;
        },

        renderChildren: function(flexModel, wArrary, context) {
            var htmlString = "";
            for(var i = 0; i < wArrary.length; i++) {
                var childModel = wArrary[i];
                if($KG.appbehaviors["lazyLoadDOM"] == true && childModel.isvisible == false) {
                    continue;
                }
                var css = "kcell " + (childModel.wType == "TPW" ? "voltmxcustomcss " : "") + (childModel.isvisible ? "" : "hide ");
                var style = $KW.FlexUtils.getFlexLayoutStyle(childModel);
                if(flexModel.layouttype == voltmx.flex.RESPONSIVE_GRID) {
                    style = $KW.FlexUtils.getResponsiveGridLayoutStyle(childModel);
                }
                var overflow = "";
                if((['FlexContainer', 'FlexScrollContainer', 'KComponent'].indexOf(childModel.wType) != -1)
                && !$KW.Utils.getActualWidgetModel(wArrary[i]).clipbounds) {
                    overflow = ';overflow:visible';
                } else {
                    overflow = ';overflow:hidden';
                    overflow += ((['FlexContainer', 'FlexScrollContainer', 'KComponent'].indexOf(childModel.wType) != -1) && childModel.clipbounds) ? ";" + $KU.cssPrefix + "box-shadow:none" : "";
                    css += childModel.skin;
                }
                htmlString += "<div class = '" + css + "' style='" + style + overflow + ((childModel.wType == 'TextArea' || childModel.wType == 'Switch' || childModel.wType == 'Image') ? ';font-size:0px' : '') + "'>";
                htmlString += $KW[childModel.wType].render(childModel, context);
                htmlString += "</div>";
            }
            return htmlString;
        },

        adjustFlexContainers: function(containerModel, containerNode) {
            if(containerModel.wType == 'Segment') {
                $KW.Segment.adjustFlexContainersInSegment(containerModel, containerNode);
            }
            if(containerModel.wType == 'CollectionView') {
                $KW.CollectionView.adjustFlexContainersInCollectionView(containerModel, containerNode);
                if(containerModel.layouttype != voltmx.collectionview.LAYOUT_CUSTOM)
                    $KW.CollectionView.applyLineSpaceAndItemSpace(containerModel, containerNode);
            }
        },

        adjustFlexContainer: function(flexModel, flexNode) {
            if(!flexNode) {
                if(flexModel.wType == 'Form')
                    flexNode = document.getElementById(flexModel.id + "_scroller") || document.getElementById(flexModel.id);
                else
                    flexNode = flexNode || $KW.Utils.getWidgetNode(flexModel);
            }
            if(!flexNode)
                return;
            if(flexModel.wType == 'FlexContainer' && flexModel.autogrowHeight) {
                flexModel.layoutConfig.children = true;
            }
            var widgets = flexModel.widgets();
            $KW.FlexLayoutEngine.performFlexLayout(flexModel.layouttype, flexModel, flexNode, widgets);
        },

        forceLayout: function(flexModel, flexNode) {
            if(flexModel.wType == 'Form')
                flexNode = document.getElementById(flexModel.id + "_scroller") || document.getElementById(flexModel.id);
            else
                flexNode = flexNode || $KW.Utils.getWidgetNode(flexModel);

            if(flexNode && flexModel.isvisible) {
                var containerId = (flexModel.wType == 'FlexContainer') ? flexNode.childNodes[0].getAttribute("kcontainerID") : flexNode.getAttribute("kcontainerID");
                containerId && $KW.Utils.updateContainerDataInDOM(flexNode, containerId);

                if((flexModel.parent && !$KW.FlexUtils.isFlexWidget(flexModel) && flexModel.wType != 'Form') || (flexModel.wType == 'FlexContainer' && !flexModel.parent)) {
                    var containerModel = flexNode.dataObj && flexNode.dataObj.containerModel;
                    if(containerModel && containerModel.wType == 'CollectionView' && containerModel.layouttype == voltmx.collectionview.LAYOUT_CUSTOM) {
                        flexModel.finalFrame = {};
                        $KW.FlexLayoutEngine.computeLayoutValues(flexModel, flexNode, containerModel.frame);
                        $KW.FlexLayoutEngine.determineSize($KU.getNodeByModel(containerModel), flexModel, flexNode);
                        var dimensions = $KW.FlexUtils.getWidgetDimensions(flexModel, flexNode);
                        $KW.FlexLayoutEngine.determineX(flexModel, dimensions, flexNode, containerModel.frame);
                        $KW.FlexLayoutEngine.determineY(flexModel, dimensions, flexNode, containerModel.frame);
                        $KW.FlexUtils.setWidgetPosition(flexModel, flexModel.finalFrame, flexNode);
                        flexModel.frame = $KW.FlexLayoutEngine.getWidgetFrame(flexModel, dimensions, flexModel.finalFrame);
                    } else {
                        $KW.FlexUtils.setFlexContainerStyle(flexModel, flexNode);
                        flexModel.frame = $KW.FlexUtils.getWidgetFrame(flexModel, flexNode);
                    }
                    flexModel.dolayout && $KU.executeWidgetEventHandler(flexModel, flexModel.dolayout);
                }
                if(flexModel.wType == 'Form') {
                    flexModel.frame = $KW.FlexUtils.getWidgetFrame(flexModel, flexNode);
                }
                if(flexModel.wType == 'FlexContainer') {
                    
                    
                    var computedStyle = $KU.getComputedStyle(flexNode.firstChild);
                    if(computedStyle) {
                        flexModel.hBorder = parseInt(computedStyle["border-left-width"], 10) + parseInt(computedStyle["border-right-width"], 10);
                        flexModel.vBorder = parseInt(computedStyle["border-top-width"], 10) + parseInt(computedStyle["border-bottom-width"], 10);
                    }
                }
                this.adjustFlexContainer(flexModel, flexNode);
            }
        },

        keydownEventHandler: function(eventObject, target) {
            var keyCode = eventObject.keyCode;
            if(keyCode == 32 || keyCode == 13) {
                $KW.FlexContainer.eventHandler(eventObject, target);
            }
        },

        eventHandler: function(eventObject, target) {
            var widgetModel = $KU.getModelByNode(target),
            containerId = target.getAttribute("kcontainerID");
            widgetModel = $KW.Utils.getActualWidgetModel(widgetModel);

            $KAR && $KAR.sendRecording(widgetModel, 'click', {'target': target, 'eventType': 'uiAction'});

            spaAPM && spaAPM.sendMsg(widgetModel, 'onclick');
            
            if(containerId) {
                $KW.Utils.updateContainerData(widgetModel, target, true);
            } else {
                var executed = voltmx.events.executeBoxEvent(widgetModel);
                var tabId = target.getAttribute("ktabid");
                if(!executed && tabId) {
                    $KW.TabPane && $KW.TabPane.executeTabEvent(widgetModel, target, true);
                }
            }
        },

        attachDragEvent: function(wModel) {
            if(wModel.onDrag) {
                var node = $KU.getNodeByModel(wModel);
                node = node.parentNode;
                new $KW.touch.Drag(wModel, node, node, '', this.dragEvent, node);
            }
        },

        dragEvent: function(dragNode, x, y, type) {
            dragNode = dragNode.getAttribute("kwidgettype") ? dragNode : dragNode.childNodes[0];
            var flexModel = $KU.getModelByNode(dragNode);
            flexModel.onDrag && flexModel.onDrag(flexModel, x, y, type);
        },

        executeOnParent: function(flexModel, callback, args) {
            if(!flexModel._voltmxControllerName)
                return;
            var formModel = $KG["__currentForm"];
            if($KU.checkHeaderFooterTemplate(formModel, flexModel)) {
                var parentModel = formModel;
            } else {
                var widgetModel = $KU.getWidgetModelByID(flexModel.formPathId);
                if(!widgetModel) {
                    voltmx.web.logger("warn", "widgetModel is not available");
                    return;
                } else {
                    var parentModel = widgetModel;
                    while(parentModel) {
                        parentModel = parentModel.parent;
                        if(parentModel._voltmxControllerName)
                            break;
                    }
                }
            }
            _voltmx.mvc.executeInJsContext(parentModel, callback, args);
        },


        addChild: function(boxModel, wArray) {
            if($KG.__hotReload) return;
            var box = $KU.getNodeByModel(boxModel);

            if(box && wArray.length > 0) {
                if(!$KW.FlexUtils.isWidgetAllowedIntoResponsive(boxModel, wArray)) {
                    throw new VoltmxError(100, "Error",
                            "Invalid Input, trying to add a invalid widget added to FlexContainer responsive layout");
                }
                voltmx.events.executeActionOnComponent(wArray, {
                        "eventType" : "preshow",
                        "execActionBeforeChildFlag" : true
                        });
                $KU.updatei18nProperties(wArray);
                var wrapper = document.createElement("div");
                wrapper.innerHTML = module.appendChildren(boxModel, wArray);

                while(wrapper.children.length > 0) {
                    box.appendChild(wrapper.children[0]);
                }

                $KU.layoutNewWidgets(boxModel, wArray);
                $KW.Utils.initializeNewWidgets(wArray);
                voltmx.events.executeActionOnComponent(wArray, {
                        "eventType" : "postshow",
                        "execActionBeforeChildFlag" : false
                        });
            }
        },

        addChildat: function(boxModel, wArray, index, counter) {
            if($KG.__hotReload) return;
            var box = $KU.getNodeByModel(boxModel);
            if(box) {
                if(!$KW.FlexUtils.isWidgetAllowedIntoResponsive(boxModel, wArray)) {
                    throw new VoltmxError(100, "Error",
                            "Invalid Input, trying to add a invalid widget added to FlexContainer responsive layout");
                }
                voltmx.events.executeActionOnComponent(wArray, {
                        "eventType" : "preshow",
                        "execActionBeforeChildFlag" : true
                        });
                $KU.updatei18nProperties(wArray);
                var wrapper = document.createElement("div");
                wrapper.innerHTML = module.appendChildren(boxModel, wArray);
                index = index < 0 ? 0 : index;
                box.insertBefore(wrapper.childNodes[0], box.childNodes[index] || null);

                $KU.layoutNewWidgets(boxModel, wArray);
                $KW.Utils.initializeNewWidgets(wArray);
                voltmx.events.executeActionOnComponent(wArray, {
                        "eventType" : "postshow",
                        "execActionBeforeChildFlag" : false
                        });
            }
        },

        appendChildren: function(boxModel, wArray) {
            var context = new $KW.WidgetGenerationContext(boxModel.pf);
            return $KW.FlexContainer.renderChildren(boxModel, wArray, context);

        },

        
        add: function() {
            var boxobj = arguments[0];

            if(boxobj && "add" in boxobj) {
                var widarray = [].slice.call(arguments, 1);
                boxobj.add(widarray);
            }
        },

        addAt: function(boxModel, widgetref, index) {
            if(widgetref == null) return;
            boxModel && boxModel.addAt(widgetref, index);
        },

        remove: function(boxModel, widgetref) {
            boxModel && boxModel.remove(widgetref);
        },

        removeAt: function(boxModel, index) {
            return boxModel && boxModel.removeAt(index);
        },

        widgets: function(boxModel) {
            return boxModel && boxModel.widgets();
        },

        DOMremove: function(boxModel, widgetref) {
            var box = $KU.getNodeByModel(boxModel);
            if(box && widgetref) {
                for(var i = 0; i < boxModel.children.length; i++) {
                    if(widgetref.id == boxModel.children[i]) {
                        box.removeChild(box.children[i]);
                        break;
                    }
                }
            }
        },

        DOMremoveAll: function(boxModel) {
            var box = $KU.getNodeByModel(boxModel);
            if(box) {
                box.innerHTML = "";
            }
        }
    };


    return module;
}());
