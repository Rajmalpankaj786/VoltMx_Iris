
$KW.Label = (function() {
    
    

    var module = {
        initialize: function() {
            voltmx.events.addEvent("click", "Label", this.eventHandler);
        },

        initializeView: function(formId) {
            module.updateTextStyle(formId);
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
                
                case "textstyle":
                    this.updateWidgetTextStyle(widgetModel, element);
                    break;
                case "textcopyable":
                    if(propertyValue && !widgetModel.disabled) {
                        $KU.addClassName(element, "enableSelection");
                        $KU.removeClassName(element, "disableSelection");
                    } else {
                        $KU.addClassName(element, "disableSelection");
                        $KU.removeClassName(element, "enableSelection");
                    }
                    break;

                case "text":
                    if(!element.firstChild)
                        element.innerHTML = $KU.escapeHTMLSpecialEntities(propertyValue);
                    else
                        element.firstChild.nodeValue = propertyValue;

                    break;
            }
        },

        updateTextStyle: function(formId) {
            var labelNodes = document.querySelectorAll("#" + formId + " div[kwidgettype='Label']");
            for(var i = 0; i < labelNodes.length; i++) {
                var labelNode = labelNodes[i];
                var widgetModel = $KU.getModelByNode(labelNode);
                $KW.Label.updateWidgetTextStyle(widgetModel, labelNode);
            }
        },

        updateWidgetTextStyle: function(widgetModel, element) {
            var styleConfig = widgetModel.textstyle, fontSize  = null;
            if(element && styleConfig) {
                if(styleConfig.hasOwnProperty('lineSpacing')) {
                    fontSize = parseInt($KU.getStyle(element, "font-size"), 10);
                    element.style.lineHeight = (fontSize + parseInt(styleConfig.lineSpacing, 10)) + "px";
                } else {
                     element.style.lineHeight = "";
                }

                if(styleConfig.hasOwnProperty('letterSpacing')) {
                    element.style.letterSpacing = styleConfig.letterSpacing+'px';
                } else {
                    element.style.removeProperty('letter-spacing');
                }

                if(styleConfig.strikeThrough === true) {
                    element.style.textDecoration = 'line-through';
                } else {
                    element.style.removeProperty('text-decoration');
                }

                $KW.FlexUtils.setLayoutConfig(widgetModel, styleConfig, null);
            }
        },

        render: function(labelModel, context) {
            var computedSkin = $KW.skins.getWidgetSkinList(labelModel, context);
            var cAlign = $KW.skins.getContentAlignment(labelModel);
            var htmlString = "";
            htmlString = "<div" + $KW.Utils.getBaseHtml(labelModel, context) + "class = '" + computedSkin + "' style='text-align:" + cAlign + ";" + $KW.skins.getBaseStyle(labelModel, context);

            if(context.ispercent === false)
                htmlString += "display:inline-block;" + (context.layoutDir ? ("float:" + context.layoutDir) : "");

            htmlString += "'";
            htmlString += ">" + $KU.escapeHTMLSpecialEntities(labelModel.text) + "</div>";
            return htmlString;
        },

        eventHandler: function(eventObject, target) {
            var labWidgetModel = $KU.getModelByNode(target),
                containerId = target.getAttribute("kcontainerID");

            $KAR && $KAR.sendRecording(labWidgetModel, 'click', {'target': target, 'eventType': 'uiAction'});
            
            if(containerId) {
                $KW.Utils.updateContainerData(labWidgetModel, target, true);
            } else {
                var executed = voltmx.events.executeBoxEvent(labWidgetModel);
                var tabId = target.getAttribute("ktabid");
                if(!executed && tabId) {
                    $KW.TabPane && $KW.TabPane.executeTabEvent(labWidgetModel, target, true);
                }
            }
        }
    };


    return module;
}());
