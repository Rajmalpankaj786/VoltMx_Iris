//focus skin

var path = require('path');
var fs = require('fs');
var voltmxUtil = require('./utils');

var velocitytemplatesmap = require('./velocitytemplatesmap');
Engine = require('velocity').Engine;

var ns = {};
var cssUtils = require('./cssutils');
var cssconstants = require('./cssconstants').constants;

(function (ns) {
    /*
    var FSStringMap = {
        TextBoxforkborder: "SkinTextBox_textfield1040901809648113",
        butskin2: "Main_abc2,SkinButton_button1292811417407452",
        calendartransparentskin: "SkinCalendar_calendar1040901809976",
        stu7ButtonGreen: "Main_abc1,Main_abc3",
        stu7ButtonRed: "Main_button1292811417407717"
    }

    var HSStringMap = {
    "ButtonVerticalSplitFORK":"ButtonTest2_button1620715504593622",
    "butskin2":"ButtonTest2_button1620715504593943"
    }
    //*/


    var widgetSelectorMap = {
                        "TextArea" : ":focus",
                        "TextBox" : ":focus",
                        "TextArea2" : ":focus",
                        "TextBox2" : ":focus",
                        "Calendar" : ":active",
                        "HImageStrip" : "_img:active",
                        "HImageStrip2" : "_img:active",
                        "ImageGallery" : "_img:active",
                        "ImageGallery2" : "_img:active",
                        "DataGrid" : " tbody tr:active",
                        "CheckBoxGroup" : ">div:active",
                        "RadioButtonGroup" : ">div:active",
                        "Segment" : " [index]:active",
                        "Segment2" : " [index]:active",
                        "MenuBar" : "> div:hover",
                        "default" : ":active"
                    };

    var widgetSelectorMapDTW = {
                        "TextArea" : ":focus",
                        "TextBox" : ":focus",
                        "TextArea2" : ":focus",
                        "TextBox2" : ":focus",
                        "Calendar" : ":active",
                        "HImageStrip" : " * > img:active",
                        "HImageStrip2" : " * > img:active",
                        "ImageGallery" : " * > img:active",
                        "ImageGallery2" : " * > img:active",
                        "DataGrid" : " * > tr:active",
                        "CheckBoxGroup" : ">div:active",
                        "RadioButtonGroup" : ">div:active",
                        "Segment" : " [index]:active",
                        "Segment2" : " [index]:active",
                        "MenuBar" : "> div:hover",
                        "default" : ":active"
                    };

    var WidgetSelectorMapIE = {
                            "TextArea": ":hover",
                            "TextBox": ":hover",
                            "Calendar": ":hover",
                            "HImageStrip": " * > img:hover",
                            "ImageGallery": " * > img:hover",
                            "HImageStrip2": " * > img:hover",
                            "ImageGallery2": " * > img:hover",
                            "DataGrid": " * > tr:hover",
                            "CheckBoxGroup": ">div:hover",
                            "RadioButtonGroup": ">div:hover",
                            "Segment": " [index]:hover",
                            "MenuBar":"> div:hover",
                            "default": ":hover"
                        };

    ns.renderFocusSkins = function(skinsObj, formFactor, platform, cgArgs) {
        var skinBuffer = new voltmxUtil.StringBuffer();
        var FocusSkinMap = {}; //cgArgs.focusskinmap;
        var HoverskinMap = {}; //cgArgs.focusskinmap;

        try{

            var FSStringMap = cgArgs.focusSkinList;
            var HSStringMap = cgArgs.hoverSkinList;


            var sIdsSorted = Object.keys(FSStringMap);
            for(var sis = 0; sis < sIdsSorted.length; sis++) {
                var skinId = sIdsSorted[sis];
                FocusSkinMap[skinId] = [];
                if(!FSStringMap[skinId]) {
                    continue;
                }
                var widgetlist = FSStringMap[skinId].split(',');
                for(var i = 0; i < widgetlist.length; i++) {
                    if(widgetlist[i].indexOf('_linkskin') != -1)
                        widgetlist[i] = widgetlist[i].replace("_linkskin", " a");

                    if(widgetlist[i].indexOf('_linkfocusskin') != -1)
                        widgetlist[i] = widgetlist[i].replace("_linkfocusskin", " a:active");

                    FocusSkinMap[skinId].push("#"+widgetlist[i]);
                }
            }
            skinBuffer  = generateFocusSkin(FocusSkinMap, skinsObj, formFactor, platform, cgArgs, "focusskin");

            if(platform == 'desktopwebcommon' || platform == 'desktopwebie9') {
                var hoverskinBuffer = new voltmxUtil.StringBuffer();

                var sIdsSorted = Object.keys(HSStringMap);
                for(var sis = 0; sis < sIdsSorted.length; sis++) {
                    var skinId = sIdsSorted[sis];
                    HoverskinMap[skinId] = [];
                    var widgetlist = HSStringMap[skinId].split(',');
                    for(var i = 0; i < widgetlist.length; i++) {
                        HoverskinMap[skinId].push("#"+widgetlist[i]);
                    }
                }
                hoverskinBuffer  = generateFocusSkin(HoverskinMap, skinsObj, formFactor, platform, cgArgs, "hoverskin");
                skinBuffer.append(hoverskinBuffer.toString());
            }
            return skinBuffer.toString();

        } catch(e) {
            console.error("SPADW: error in renderFocusSkins function for platform "+platform+" : "+e.message);
            console.log(e.stack);
            return "";
        }
    }



    function generateFocusSkin(FocusSkinMap, skinsList, formFactor, platform, cgArgs, skinmode) {
        try{
            var result = "";
            var appObj = cgArgs.appObj;
            var skinBuffer = new voltmxUtil.StringBuffer();

            var basefont = cssUtils.processBaseFontSize(platform, formFactor, appObj);
            var wType = "";
            var skinsNameSorted = Object.keys(FocusSkinMap);

            for(var sns = 0; sns < skinsNameSorted.length; sns++) {
                var key = skinsNameSorted[sns];
                var skinMap = {};
                var focusskin = key;

                //console.trace("generating css for skin: "+key+" in renderfocusskin function");

                var appSkin = skinsList[key];

                if(formFactor) {
                    skinMap['formFactor'] = formFactor;
                }

                if(basefont) {
                    skinMap['defaultfont'] = basefont;
                }

                wType = appSkin['wType'];
                if(skinmode == "focusskin") {
                    var selector;
                    if(voltmxUtil.isplatformspa(platform)) {
                        selector = widgetSelectorMap[wType];
                    } else {
                        selector = widgetSelectorMapDTW[wType];
                    }
                    if(!selector)
                        selector = widgetSelectorMap["default"];

                    if(platform == 'desktopwebcommon' || platform == 'desktopwebie9') {
                        selector = selector+":not([kdisabled='true'])";
                    }
                } else {
                    var selector = WidgetSelectorMapIE[wType];
                    if(!selector) {
                        selector = WidgetSelectorMapIE["default"];
                    }
                }

                if(wType == "DataGrid" && voltmxUtil.isplatformspa(platform))
                    selector = selector+":not([kdisabled='true'])";

                if(platform == "spabbnth" && (wType == "TextArea" || wType == "TextBox"))
                    selector = ":active";


                var multivaluesTemp = [];
                multivaluesTemp = FocusSkinMap[key];
                var splitSize = Math.floor(multivaluesTemp.length / 25);
                //splitting huge focusskin widget values into blocks of size 25! STU649: minification issue
                for(var splitIndex = 0; splitIndex < splitSize + 1 && multivaluesTemp.length > 0; splitIndex++) {
                    var multivalues = [];
                    var fwidget = "";
                    if (splitIndex == splitSize) {
                        multivalues = multivaluesTemp.splice(0, multivaluesTemp.length);
                    } else {
                        multivalues = multivaluesTemp.splice(0, 25);
                    }


                    for(var i = 0; i < multivalues.length; i++) {
                        if(!fwidget) {
                            if(wType.toLowerCase() == "menubar") {
                                var widgettext = ""+multivalues[i];
                                fwidget = widgettext + " .KMenu li " + selector + "," + widgettext + " .KMenu li td " + selector ;
                            } else if(wType == "RichText") {
                                fwidget = multivalues[i];
                            } else if(wType == "Button" && platform == 'desktopwebie9') {
                                fwidget = multivalues[i] + selector;
                                var focusWidget = fwidget.replace(/:active/g, ":focus");
                                fwidget = fwidget+","+focusWidget;
                            } else {
                                fwidget = multivalues[i]+selector;
                            }
                        } else {
                            if(wType.toLowerCase() == "menubar") {
                                var widgettext = ""+multivalues[i];
                                fwidget = fwidget+", "+widgettext + " .KMenu li " + selector + "," + widgettext + " .KMenu li td " + selector ;
                            } else if(wType == "RichText") {
                                fwidget = fwidget+", "+multivalues[i];
                            } else if(wType == "Button" && platform == 'desktopwebie9') {
                                fwidget = fwidget+","+multivalues[i] + selector;
                                var tempFwidget = multivalues[i] + selector;
                                var focusWidget = tempFwidget.replace(/:active/g, ":focus");
                                fwidget = fwidget+","+focusWidget;
                            } else {
                                fwidget = fwidget+", "+multivalues[i]+selector;
                            }
                        }
                    }

                    if(wType == "TabPane") {
                        var skin = fwidget.replace(/:active/g, " div[active]:active");
                        skinMap["skin"] = skin;

                        var li = fwidget.replace(/:active/g, "_Header li:active");
                        skinMap["li"] = li;

                        var lia = (platform == 'desktopwebcommon' || platform == 'desktopwebie9') ? fwidget.replace(/:active/g, "_Header li div[kwidgettype]:active") : fwidget.replace(/:active/g, "_Header li a:active");
                        skinMap["lia"] = lia;

                        skinMap["focusSkin"] = true;
                    } else {
                        skinMap["skin"] = fwidget;
                        skinMap["focusSkin"] = true;
                    }

                    if(platform == "spawinphone8" && wType == "link") {
                        var skin = fwidget.replace(/:active/g, " a:active");
                        skinMap["skin"] = skin;
                        skinMap["focusSkin"] = true;
                    }

                    var templateFile = velocitytemplatesmap[platform]['appskincss'];

                    if(appSkin.forked && appSkin[cssconstants.ISCUSTOMCSSENABLED]) {
                        var customCssText = appSkin.customCSS;
                        if(customCssText) {
                            if(["Segment", "Segment2", "TabPane", "Label", "Link",
                                "DataGrid", "Switch"].indexOf(wType) != -1) {
                                skinBuffer.append(customCssText);
                            } else {
                                skinBuffer.append(skinMap.skin+"{ \n"+customCssText+" \n } \n");
                            }
                        }
                    } else {
                        var tempTemplateFile = velocitytemplatesmap[platform][wType+'appskincss'];
                        if(tempTemplateFile)
                            templateFile = tempTemplateFile;

                        skinMap["wtype"] = wType;
                        if(wType == "Switch") {
                            cssUtils.processSwitchBackGroundProperties(appSkin, skinMap);
                            cssUtils.processSwitchFontProperties(appSkin, skinMap, platform);
                            cssUtils.processBorderProperties(appSkin, skinMap, platform);
                        } else {
                            cssUtils.processBackGroundProperties(appSkin, skinMap, platform);
                            cssUtils.processFontProperties(appSkin, skinMap, platform);
                            cssUtils.processBorderProperties(appSkin, skinMap, platform);
                        }

                        if(platform === "desktopwebcommon") {
                            cssUtils.processCursorProperties(appSkin, skinMap, platform)
                        }

                        if(appSkin[cssconstants.BOX_SHADOW]) {
                            cssUtils.processShadowProperties(appSkin, skinMap);
                        }

                        if(appSkin[cssconstants.TEXT_SHADOW] && (wType == "Label" || wType == "Button")) {
                            cssUtils.processTextShadowProperties(appSkin, skinMap);
                        }

                        var repeatImage = appSkin[cssconstants.REPEAT_IMAGE];
                        if(repeatImage == true) {
                            skinMap["repeat"] = true;
                        } else {
                            skinMap["repeat"] = false;
                        }

                        if(platform != 'desktopwebcommon' && platform != 'desktopwebie9') {
                            var repeatVerticalImage = appSkin[cssconstants.REPEAT_VERTICALLY_IMAGE];
                            if(repeatVerticalImage) {
                                skinMap["verticalrepeat"] = true;
                            } else {
                                skinMap["verticalrepeat"] = false;
                            }
                        }

                        if(platform == "desktopwebcommon" || platform == "desktopwebie9") {
                            skinMap["desktopcss"] = true;
                        }

                        result = voltmxUtil.templaterenderer(templateFile, skinMap);
                        skinBuffer.append(result);
                    }

                    multivalues = [];
                }

            }
            return skinBuffer;
        } catch(e) {
            console.error("SPADW: error in renderFocusSkin function: "+ e.message);
            console.info(e.stack);
            return [];
        }
    }

})(ns);

module.exports = ns;