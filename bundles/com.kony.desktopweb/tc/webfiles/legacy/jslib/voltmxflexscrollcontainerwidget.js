$KW.FlexScrollContainer = (function() {
    
    

    var module = {
        initialize: function() {
            voltmx.events.addEvent("click", "FlexScrollContainer", this.eventHandler);
            voltmx.events.addEvent("onorientationchange", "FlexScrollContainer", this.orientationHandler);
        },

        initializeView: function(formId) {
            var scrollNodes = document.querySelectorAll("#" + formId + " div[kwidgettype='FlexScrollContainer']");
            $KW.Utils.initializeScrollEvents(scrollNodes);
            $KW.APIUtils.getModelForContentOffset(formId, "FlexScrollContainer");
            setTimeout(function() {
                for(var i = 0; i < scrollNodes.length; i++) {
                    var model = $KU.getModelByNode(scrollNodes[i]);
                    if(model.reverselayoutdirection) {
                        model.scrollToEnd();
                    }
                }
            }, 0);
        },

        
        updateView: function(widgetModel, propertyName, propertyValue, oldPropertyValue) {
            var element = $KU.getNodeByModel(widgetModel);
            if(!element)
                return;
            var scrolldirection = $KW.stringifyScrolldirection[widgetModel.scrolldirection];
            switch(propertyName) {
                case "enableScrolling":
                case "scrollDirection":
                    if(widgetModel.enablescrolling) {
                        if(scrolldirection == "horizontal") {
                            element.style.overflowX = "auto";
                            element.style.overflowY = "hidden";
                        } else if(scrolldirection == "vertical") {
                            element.style.overflowX = "hidden";
                            element.style.overflowY = "auto";
                        } else if(scrolldirection == "both") {
                            element.style.overflowX = "auto";
                            element.style.overflowY = "auto";
                        } else if(scrolldirection == "none") {
                            element.style.overflowX = "hidden";
                            element.style.overflowY = "hidden";
                        }
                    } else {
                        element.style.overflowX = "hidden";
                        element.style.overflowY = "hidden";
                    }
                    break;
                case "scrollDirection":
                    if(widgetModel.wType == 'Form')
                        scrolldirection = "vertical";

                    if(scrolldirection == "horizontal") {
                        element.style.overflowX = "auto";
                        element.style.overflowY = "hidden";
                    } else if(scrolldirection == "vertical") {
                        element.style.overflowX = "hidden";
                        element.style.overflowY = "auto";
                    } else if(scrolldirection == "both") {
                        element.style.overflowX = "auto";
                        element.style.overflowY = "auto";
                    } else if(scrolldirection == "none") {
                        element.style.overflowX = "hidden";
                        element.style.overflowY = "hidden";
                    }
                    break;
                case "onScrollStart":
                    var onscrollstart = widgetModel.onscrollstart;
                    
                    $KU.executeWidgetEventHandler(widgetModel, onscrollstart);
                    break;
                case "onScrollTouchReleased":
                    break;
                case "onScrolling":
                    var onscrolling = widgetModel.onscrolling;
                    
                    $KU.executeWidgetEventHandler(widgetModel, onscrolling);
                    break;
                case "onDecelerationStarted":
                    break;
                case "onScrollEnd":
                    var onscrollend = widgetModel.onscrollend;
                    
                    $KU.executeWidgetEventHandler(widgetModel, onscrollend);
                    break;
                case "contentOffset":
                    module.setContentOffSet(widgetModel, widgetModel.contentOffset, true);
                    break;
            }
        },

        getScrollStyle: function(boxModel) {
            var scrolldirection = voltmx.widgets.stringifyScrolldirection[boxModel.scrolldirection], style = '';

            if(boxModel.enableScrolling) {
                if(scrolldirection === "both") {
                    style = "overflow-x:auto; overflow-y:auto;";
                } else if(scrolldirection === "horizontal") {
                    style = "overflow-x:auto; overflow-y:hidden;";
                } else if(scrolldirection === "vertical") {
                    style = "overflow-y:auto; overflow-x:hidden;";
                } else {
                    style = "overflow-x:hidden; overflow-y:hidden;";
                }
            } else {
                style = "overflow-x:hidden; overflow-y:hidden;";
            }
            return style;
        },

        render: function(boxModel, context) {
            var boxStyle =  $KW.skins.getBaseStyle(boxModel, context);
            var computedSkin = voltmx.widgets.skins.getWidgetSkinList(boxModel, context);
            var scrolldirection = voltmx.widgets.stringifyScrolldirection[boxModel.scrolldirection];
            var style = module.getScrollStyle(boxModel);
            if(boxModel.layoutType == voltmx.flex.RESPONSIVE_GRID) {
                style += $KW.FlexUtils.getResponsiveContainerLayoutStyle(boxModel);
            } else {
                style += 'position: relative;'
            }

            var htmlString = "<div style='" + style + boxStyle + "' class ='" + computedSkin + "'" + voltmx.widgets.Utils.getBaseHtml(boxModel, context) + " swipeDirection='" + scrolldirection + "'>";
            var wArray = boxModel.widgets();
            if(wArray.length > 0) {
                htmlString += $KW.FlexContainer.renderChildren(boxModel, wArray, context);
            }
            htmlString += "</div>";
            return htmlString;
        },

        forceLayout: function(flexModel, flexNode) {
            $KW.FlexContainer.forceLayout(flexModel, flexNode);
        },

        getContentOffsetMeasured: function(flexModel) {
            var contentOffSet = {
                x: 0,
                y: 0
            };
            var flexNode = $KU.getNodeByModel(flexModel);
            if(flexNode) {
                contentOffSet.x = -flexNode.scrollLeft;
                contentOffSet.y = -flexNode.scrollTop;
            }
            return contentOffSet;
        },

        getContentSizeMeasured: function(flexModel) {
            var flexNode = $KU.getNodeByModel(flexModel);
            var contentSize = {
                width: 0,
                height: 0
            };
            if(flexNode) {
                contentSize.width = flexNode.scrollWidth;
                contentSize.height = flexNode.scrollHeight;
            }
            return contentSize;
        },

        setContentOffSet: function(flexModel, contentOffSet, animate) {
            var flexNode = $KU.getNodeByModel(flexModel);
            if(flexNode) {
                $KW.APIUtils.setfocus(flexModel);
                var offsetX = $KW.FlexUtils.getValueByParentFrame(flexModel, $KW.FlexUtils.getValueAndUnit(flexModel, contentOffSet.x), 'x', flexModel.frame);
                var offsetY = $KW.FlexUtils.getValueByParentFrame(flexModel, $KW.FlexUtils.getValueAndUnit(flexModel, contentOffSet.y), 'y', flexModel.frame);
                flexNode.scrollLeft = offsetX;
                flexNode.scrollTop = offsetY;
            }
        },

        scrollToWidget: function(flexModel, wModel, animate) {
            var flexNode = $KU.getNodeByModel(flexModel);
            if(flexNode) {
                $KW.APIUtils.setfocus(flexModel);
                var wFrame = wModel.frame;
                flexNode.scrollLeft = wFrame.x;
                flexNode.scrollTop = wFrame.y;
            }
        },

        scrollToEnd: function(flexModel, animate) {
            var flexNode = $KU.getNodeByModel(flexModel);
            if(flexNode) {
                $KW.APIUtils.setfocus(flexModel);
                switch(flexModel.scrolldirection) {
                    case voltmx.flex.SCROLL_HORIZONTAL:
                        flexNode.scrollLeft = flexNode.scrollWidth;
                        break;
                    case voltmx.flex.SCROLL_VERTICAL:
                        flexNode.scrollTop = flexNode.scrollHeight;
                        break;
                    case voltmx.flex.SCROLL_BOTH:
                        flexNode.scrollLeft = flexNode.scrollWidth;
                        flexNode.scrollTop = flexNode.scrollHeight;
                        break;
                }
            }
        }
    };


    return module;
}());
