
$KW.skins = (function() {
    
    

    var module = {
        
        getBaseStyle: function(widgetModel, context) {
            var style = "";
            if(widgetModel.backgroundColor) {
                var validate = module.validateHexValue(widgetModel.backgroundColor);
                if(validate) {
                    style += "background : " + module.convertHexValuetoRGBA(widgetModel.backgroundColor) + "; ";
                }
            }
            if(widgetModel.borderColor) {
                var validate = module.validateHexValue(widgetModel.borderColor);
                if(validate) {
                    style += "border-color : " + module.convertHexValuetoRGBA(widgetModel.borderColor) + "; ";
                }
            }

            if(widgetModel.borderWidth) {
                style += "border-width : " + widgetModel.borderWidth + "px; ";
            }

            if(widgetModel.cornerRadius) {
                style += "border-radius : " + widgetModel.cornerRadius + "px; ";
            }

            if(widgetModel.cursortype) {
                style += "cursor : " + $KW.Utils.getCursorStyle(widgetModel);
            }

            style += this.getBlurStyle(widgetModel);

            return style;
        },


        

        
        getChildMarginAsPaddingSkin: function(widgetModel) {
            var parentmodel = $KU.getParentModel(widgetModel);
            if(($KG.appbehaviors["applyMarginPaddingInBCGMode"] == true))
                return "";
            var margin = widgetModel.margin;
            var i = 0;
            
            if($KU.isArray(margin) && parentmodel && parentmodel.wType == "ScrollBox" && parentmodel.orientation == constants.BOX_LAYOUT_HORIZONTAL) {
                var totalWt = parentmodel.totalWt;
                while(i < 4) {
                    margin[i] = totalWt && (margin[i] * 100) / totalWt;
                    i++;
                }
                return "padding:" + $KU.joinArray(margin, "% ") + "%;";
            }
            if($KU.isArray(margin))
                return "padding:" + $KU.joinArray(margin, "% ") + "%;";
            else
                return "";
        },



        setMarginPadding: function(element, propertyName, widgetModel, propertyValue, referenceCWt) {

        },

        
        getMarAdjustedContainerWeightSkin: function(widgetModel, referenceCWt) {
            return "";
        },

        addWidthRule: function(cwt) {
            if(cwt > 100 && $KG["cwtexists"].indexOf(cwt) == -1) {
                $KG["cwtexists"].push(cwt);
                var styleSheetObjs = window.document.styleSheets;
                var voltmxStyleSheetIndex = module.getVoltmxStyleSheetIndex(styleSheetObjs);
                if(voltmxStyleSheetIndex != -1) {
                    var styleSheetObj = styleSheetObjs[voltmxStyleSheetIndex];
                    var rules = styleSheetObj.cssRules || styleSheetObj.rules;
                    if(styleSheetObj.insertRule)
                        styleSheetObj.insertRule(".kwt" + cwt + "{width:" + cwt + "%;}", rules.length);
                    else
                        styleSheetObj.addRule(".kwt" + cwt, "width:" + cwt + "%;");
                }
            }
        },

        
        getMarPadAdjustedContainerWeightSkin: function(widgetModel, referenceCWt) {
            var cwt = referenceCWt || widgetModel.containerweight;

            if(cwt) {
                try {
                    var margin = widgetModel.margin;
                    if(margin) {
                        cwt -= (parseInt(margin[0 + IndexJL]) + parseInt(margin[2 + IndexJL]));
                    }
                    return "kwt" + cwt;
                } catch(e) {
                    voltmx.web.logger("error", "Error occured in getting container weight " + e);
                }
            } else
                return "kwt100";
        },

        
        getWidgetSkin: function(widgetModel, context) {
            var skin;
            if(context && context.container && context.container.widgetsData) {
                var data = context.container.widgetsData;
                var wData = data[widgetModel.id];
                if(wData && wData.skin)
                    skin = wData.skin;
            }
            return skin || widgetModel.skin || this.getDefaultSkin(widgetModel) || "";
        },

        getDefaultSkin: function(widgetModel) {
            var skin = "";

            if(widgetModel.wType == "Label" || widgetModel.wType == "Button" || widgetModel.wType == "DataGrid" || widgetModel.wType == "RichText" || widgetModel.wType == "CheckBoxGroup" || widgetModel.wType == "RadioButtonGroup" || widgetModel.wType == "ListBox" || widgetModel.wType == "Switch")
                skin = 'voltmxcustomcss';
            return skin;
        },

        
        getWidgetSkinList: function(widgetModel, context, data) {
            var skins = [];
            context = context || {};

            
            skins.push(this.getWidgetWeight(widgetModel, context));
            if(widgetModel.wType != "Form")
                skins.push(this.getWidgetSkin(widgetModel, context));
            if(['Calendar', 'Label', 'RichText'].indexOf(widgetModel.wType) != -1 && $KW.FlexUtils.isFlexWidget(widgetModel))
                skins.push(this.getFlexContentAlignmentSkin(widgetModel.contentalignment));
            skins.push(this.getWidgetSelectionSkin(widgetModel));

            var isFlexWidget = $KW.FlexUtils.isFlexWidget(widgetModel);
            if(!isFlexWidget && (!$KW.Utils.isWidgetVisible(widgetModel, context) || (data && data.length <= IndexJL))) 
                skins.push("hide");
            return skins.join(" ");
        },

        getVisibilitySkin: function(wModel) {
            var isFlexWidget = $KW.FlexUtils.isFlexWidget(wModel);
            return(!isFlexWidget && !wModel.isvisible) ? ' hide ' : '';
        },

        getWidgetWeight: function(widgetModel, context) {
            return "";
        },

        getWidgetSelectionSkin: function(widgetModel) {
            if(widgetModel.wType == "Label" || widgetModel.wType == "Button" || widgetModel.wType == "Line" || widgetModel.wType == "Switch" || widgetModel.wType == "ListBox" || widgetModel.wType == "CheckBoxGroup" || widgetModel.wType == "RadioButtonGroup" || widgetModel.wType == "Calendar") {
                return(widgetModel.wType == "Label" && widgetModel.textcopyable) ? "enableSelection" : "disableSelection";
            }
            return "";
        },

        getSplitSkinsBetweenWidgetAndParentDiv: function(widgetModel, context) {
            var splitSkins = new Array();
            var marginSkin = "";
            var paddingSkin = "";
            var weightSkin = "";
            if(widgetModel.wType == "HBox" || widgetModel.wType == "VBox") {
                weightSkin = this.getMarPadAdjustedContainerWeightSkin(widgetModel, 100)
            } else {
                weightSkin = module.getMarAdjustedContainerWeightSkin(widgetModel, 100);
            }
            var widgetSkin = this.getWidgetSkin(widgetModel, context);
            splitSkins[0] = marginSkin + " " + paddingSkin + " " + " " + widgetSkin + " ";
            splitSkins[1] = weightSkin;
            splitSkins[2] = marginSkin + " " + paddingSkin + " " + " " + widgetSkin + " " + weightSkin;

            return splitSkins;
        },

        getWidgetAlignmentSkin: function(widgetModel) {
            var alignment = "middlecenteralign";
            return this.getAlignment(widgetModel.widgetalign || widgetModel.widgetalignment) || alignment;
        },

        getBlurStyle: function(widgetModel) {
            var filter = '', blur = widgetModel.flexblur,
                enabled = (blur) ? blur.enabled : false,
                value = (enabled) ? blur.value : 0;

            if(enabled) {
                value = (value < 0) ? 0 : (value > 100) ? 100 : value;

                if(value) {
                    filter = 'filter:blur(' + value + 'px);';
                }
            }

            return filter;
        },

        getAlignment: function(align) {
            switch(parseInt(align)) {
                case 1:
                    return "topleftalign";

                case 2:
                    return "topcenteralign";

                case 3:
                    return "toprightalign";

                case 4:
                    return "middleleftalign";

                case 5:
                    return "middlecenteralign";

                case 6:
                    return "middlerightalign";

                case 7:
                    return "bottomleftalign";

                case 8:
                    return "bottomcenteralign";

                case 9:
                    return "bottomrightalign";
            }
            return "";
        },

        
        getFlexContentAlignmentSkin: function(align) {
            switch(parseInt(align)) {
                case 1:
                    return "cnttopleftalign";

                case 2:
                    return "cnttopcenteralign";

                case 3:
                    return "cnttoprightalign";

                case 4:
                    return "cntmiddleleftalign";

                case 5:
                    return "cntmiddlecenteralign";

                case 6:
                    return "cntmiddlerightalign";

                case 7:
                    return "cntbottomleftalign";

                case 8:
                    return "cntbottomcenteralign";

                case 9:
                    return "cntbottomrightalign";
            }
            return "";
        },

        getContentAlignment: function(widgetModel, align) {
            var align = align || widgetModel.contentalignment;
            if(widgetModel.wType == "DataGrid") {
                return this.getAlignment(align);
            }
            switch(parseInt(align)) {
                case 1:
                case 4:
                case 7:
                    return "left";

                case 2:
                case 5:
                case 8:
                    return "center";

                case 3:
                case 6:
                case 9:
                    return "right";
            }
            return "left"; 
        },


        validateHexValue: function(value) {
            return(/(^[0-9A-F]{8}$)|(^[0-9A-F]{6}$)/i.test(value));
        },


        convertHexValuetoRGBA: function(value) {
            var r = value.charAt(0) + value.charAt(1);
            var g = value.charAt(2) + value.charAt(3);
            var b = value.charAt(4) + value.charAt(5);
            var a = 0;
            if(value.length == 6) {
                return "#" + r + g + b;
            }
            if(value.length > 6 && value.length <= 8)
                a = value.charAt(6) + value.charAt(7);

            r = parseInt(r, 16);
            g = parseInt(g, 16);
            b = parseInt(b, 16);
            a = ((100 - parseInt(a, 16)) / 100).toFixed(2);
            return "rgba(" + r + "," + g + "," + b + "," + a + ")";
        },

        convertHexValuetoRGBAForMap: function(value) {
            var r = '',
                g = '',
                b = '',
                a = '';
            if(value.substr(0, 2) === '0x') {
                value = value.substr(2, value.length);
            }
            if(module.validateHexValue(value)) {
                r = value.substr(0, 2);
                g = value.substr(2, 2);
                b = value.substr(4, 2);
                a = 0;
            } else {
                voltmx.web.logger('error', 'Invalid color code');
            }
            if(value.length === 6) {
                return "#" + r + g + b;
            }
            if(value.length > 6 && value.length <= 8)
                a = value.substr(6, 2);

            r = parseInt(r, 16);
            g = parseInt(g, 16);
            b = parseInt(b, 16);
            a = (parseInt(a, 16) / 255).toFixed(2);
            return "rgba(" + r + "," + g + "," + b + "," + a + ")";
        },

        
        updateDOMSkin: function(widgetModel, newSkin, oldSkin, element) {
            if(widgetModel.wType == "Phone") {
                var childElement = element.childNodes[0];
                $KU.removeClassName(childElement, oldSkin);
                $KU.addClassName(childElement, newSkin);
            }
            if(widgetModel.wType == "Switch") {
                if($KW.Switch.isCustomSwitch(widgetModel)) {
                    var switchState = ['on', 'off'][widgetModel.selectedIndex];
                    var switchTrackElement = element.childNodes[0];
                    $KU.removeClassName(switchTrackElement, oldSkin + switchState);
                    $KU.addClassName(switchTrackElement, newSkin + switchState);
                } else {
                    var switchOnElement = element.childNodes[0];
                    $KU.removeClassName(switchOnElement, oldSkin + 'on');
                    $KU.addClassName(switchOnElement, newSkin + 'on');
                    var switchOffElement = element.childNodes[2];
                    $KU.removeClassName(switchOffElement, oldSkin + 'off');
                    $KU.addClassName(switchOffElement, newSkin + 'off');
                }
            }
            

            $KU.removeClassName(element, oldSkin);
            $KU.addClassName(element, newSkin);
        },

        
        updateFocusSkin: function(widgetModel, type) {
            if(widgetModel.isCloned == true && $KW.Utils.isBelongsToCollectionView(widgetModel)) {
                var containerModel = $KW.Utils.getContainerModel(widgetModel);
                $KW.CollectionView.Skin.applyWidgetFocusSkin(null, widgetModel, containerModel);
                return;
            }

            var focusskin = widgetModel[type];
            var focusskin2;
            if(widgetModel.wType === "TabPane")
                focusskin = widgetModel.activefocusskin;
            var classSelector, classSelector2;
            var wID = "#" + $KW.Utils.getKMasterWidgetID(widgetModel); 

            switch(widgetModel.wType) {
                case "TextArea":
                case "RichText":
                case "TextField":
                    classSelector = wID;
                    break;
                case "RadioButtonGroup":
                case "CheckBoxGroup":
                    classSelector = wID + ">div";
                    break;
                case "DataGrid":
                    classSelector = wID + " tbody tr";
                    break;
                case "Segment":
                    classSelector = wID + " [index]";
                    break;
                case "Calendar":
                    classSelector = wID;
                    break;

                case "TabPane":
                    if(widgetModel.viewtype && (widgetModel.viewtype === 'tabview')) {
                        focusskin = focusskin + "lia";
                        focusskin2 = widgetModel.activefocusskin + "li";
                        classSelector = wID + "_Header li div[kwidgettype]";
                        classSelector2 = wID + "_Header li";
                    } else {
                        classSelector = wID + " div[active]";
                    }
                    break;
                default:
                    classSelector = wID;
            }
            var pseudo = (type == "focusskin" || type == "rowfocusskin") ? ":active" : ":hover";

            
            if(widgetModel.wType == "TextField" || widgetModel.wType == "TextArea") {
                pseudo = (type == "focusskin") ? ":focus" : ":hover";
                pseudo += (pseudo == ":focus" ? ":not([kdisabled='true'])" : "");
            } else {
                pseudo = (type == "focusskin" || type == "rowfocusskin") ? ":active" : ":hover";
                pseudo += (pseudo == ":active" ? ":not([kdisabled='true'])" : "");
            }
            classSelector += pseudo;
            module.applyStyle(focusskin, classSelector, widgetModel.wType);


            if(widgetModel.viewtype && (widgetModel.viewtype == 'tabview')) {
                classSelector2 += pseudo;
                module.applyStyle(focusskin2, classSelector2);
            }
            if(widgetModel.wType == "ListBox")
                module.applyStyle(focusskin + " option", classSelector + " option");
        },

        applyStyle: function(skin, classSelector, wType) {
            var styleSheetObjs = window.document.styleSheets;
            var voltmxStyleSheetIndex = module.getVoltmxStyleSheetIndex(styleSheetObjs);
            if(voltmxStyleSheetIndex != -1) {
                var styleSheetObj = styleSheetObjs[voltmxStyleSheetIndex];
                var skinRuleIndex = module.getClassIndex(styleSheetObj, skin, wType);
                module.removeCSSRule(styleSheetObj, classSelector, wType);
                if(skinRuleIndex != -1) {
                    var rules = styleSheetObj.cssRules || styleSheetObj.rules;
                    if(styleSheetObj.insertRule)
                        styleSheetObj.insertRule(classSelector + "{" + rules.item(skinRuleIndex).style.cssText + "}", rules.length);
                    else
                        styleSheetObj.addRule(classSelector, rules.item(skinRuleIndex).style.cssText);
                } else {
                    voltmx.print("Specified skin: " + skin + " is  not defined in voltmx.css");
                }
            } else {
                voltmx.print("Style class not found!");
            }
        },

        removeCSSRule: function(styleSheetObj, classSelector) {
            var elementFocusRuleIndex = module.getClassIndex(styleSheetObj, classSelector);
            
            if(elementFocusRuleIndex != -1) {
                if(styleSheetObj.deleteRule)
                    styleSheetObj.deleteRule(elementFocusRuleIndex);
                else
                    styleSheetObj.removeRule(elementFocusRuleIndex);
            }
        },

        getVoltmxStyleSheetIndex: function(styleObjs) {
            var category = $KG["imagecat"];
            for(var k = 0; k < styleObjs.length; k++) {
                var hrefObj = styleObjs[k].href;
                if(hrefObj) {
                    var cssurl = hrefObj && hrefObj.split('/');
                    var lastname = cssurl[cssurl.length - 1];
                    if(lastname && lastname.indexOf("voltmx") != -1 && lastname.indexOf("voltmxspaiphoneretina") == -1) {
                        if(category) {
                            if(hrefObj.match(category.substring(0, category.length - 1) + ".css"))
                                return k;
                        } else
                            return k;
                    }
                }
            }
            voltmx.web.logger("warn", "SPA Stylesheet could not be loaded");
            return -1;
        },

        getClassIndex: function(styleObj, className, wType) {
            var rules = styleObj.cssRules || styleObj.rules;
            var count = 1; 
            
            var ruleNo = 0;
            if(className.indexOf("#") == -1) { 
                className = "." + className;
            }
            for(var k = 0; k < rules.length; k++) {
                if(rules[k].selectorText == className) {
                    count--;
                    ruleNo = k;
                    if(count == 0)
                        return k;
                }
            }
            return -1;
        },
    };


    return module;
}());
