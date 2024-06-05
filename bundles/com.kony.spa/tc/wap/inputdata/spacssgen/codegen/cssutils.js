//css utils



var path = require('path');
var fs = require('fs');
var voltmxutil = require('./utils');

var cssconstants = require('./cssconstants').constants;
var skinconstants = require('./skinconstantshandler');

var velocitytemplatesmap = require('./velocitytemplatesmap');
Engine = require('velocity').Engine;

var ns = {};

(function (ns) {

    /*
      Name : processBaseFontSize
      Returns : String
      Input Params :     1. platform (String)
                         2. category (String)
                         3. appObj (object)

      Output : String output after rendering a template.
      Use: To get Default font size for a platform+category from appObj.
    */


    ns.processBaseFontSize = function(platform, category, appObj) {
        var platformsMap = {
            "spaip" : "ip",
            "spaan" : "android",
            "spabb" : "bb",
            "spabbnth" : "nth",
            "spawinphone8" : "winphone",
            "spaipad" : "spaipad",
            "spaandroidtablet" : "spaandroidtab",
            "spawindowstablet" : "spawindowstab",
            "desktopwebcommon" : "desktopweb",
            "desktopwebie9" : "desktopweb"
        };
        var keyString, defaultfont;

        if(platformsMap[platform] == 'desktopweb') {
            keyString = "desktopwebbasefontsize";
        }
        else if(platform == "spaip") {
            keyString = "wap_ip_fontsize";
        } else {
            keyString = "wap_" + platformsMap[platform] + category + "_fontsize";
        }


        var fontDefaults = {
            "wap_ip_fontsize" : 12,
            "wap_android_fontsize" : 12,
            "wap_android320_fontsize" : 12,
            "wap_android360_fontsize" : 13,
            "wap_android400_fontsize" : 14,
            "wap_android440_fontsize" : 15,
            "wap_android480_fontsize" : 16,
            "wap_android640_fontsize" : 19,
            "wap_bb_fontsize" : 12,
            "wap_bb320_fontsize" : 15,
            "wap_bb360_fontsize" : 13,
            "wap_bb400_fontsize" : 14,
            "wap_bb440_fontsize" : 15,
            "wap_bb480_fontsize" : 17,
            "wap_nth_fontsize" : 12,
            "wap_nth320_fontsize" : 15,
            "wap_nth360_fontsize" : 13,
            "wap_nth400_fontsize" : 14,
            "wap_nth440_fontsize" : 15,
            "wap_nth480_fontsize" : 17,
            "wap_winphone320_fontsize" : 12,
            "wap_winphone480_fontsize" : 12,
            "wap_spaipad_fontsize" : 17,
            "wap_spaandroidtabldpi_fontsize" : 17,
            "wap_spaandroidtabmdpi_fontsize" : 14,
            "wap_spaandroidtabhdpi_fontsize" : 16,
            "wap_spaandroidtabxhdpi_fontsize" : 18,
            "wap_spawindowstab_fontsize" : 17,
            "desktopwebbasefontsize" : 16
        };

        defaultfont = (appObj[keyString] || fontDefaults[keyString]);
        defaultfont = parseInt(defaultfont);

        if(platform == "spaip") {
            if(category == "375") {
                defaultfont = defaultfont*1.171875;
            }
            else if(category == "414") {
                defaultfont = defaultfont*1.29375;
            }
            defaultfont = defaultfont.toFixed(2);
        }

        return defaultfont || 12;
    }


    skinColorToCssColor = function(skinColor, property, styleMap, rgbaPropName) {

        if(skinColor.includes('var(--')) {
            return styleMap[property] = skinColor;
        }

        //skinColor is of pattern: 'rrggbbaa', the alpha channel is also expected to be in hex (00-FF, mapped to , 0-1)
        if (!((skinColor.length === 6)  || (skinColor.length === 8))) {
            throw new Error('SPADW: Expected skin color to be of length 6 or 8, but given: ' + skinColor);
        }

        var rgba = 'rgba';
        if(rgbaPropName) {
            rgba = rgbaPropName;
        }

        var startIndexes = [0, 2, 4];
        var colors = startIndexes.map(function (i) {
            var decColor = parseInt(skinColor.substr(i, 2), 16);
            return (decColor.length == 1) ? "0"+decColor : decColor;
        });

        if (skinColor.length === 8 && skinColor.substr(6, 2) != "00") {
            //fiddling with alpha channel
            //making alpha channel to be in the range 0.0 to 1.0
            var opacity = skinColor.substr(6,2);
            var alpha = (100-parseInt(opacity,16))/100;
            if((alpha === 1) || (alpha === 0)) {
                colors.push(alpha.toFixed(1));
            }
            else {
                colors.push(alpha);
            }
            styleMap[property] = ['rgba(', colors.reduce(function (p, c) { return p + ", " + c; }), ')'].join('');
            styleMap[rgba] = "true";
        } else {
            styleMap[property] = skinColor.substr(0, 6);
        }
    };

    function processColorOnly (skinColor) {

        if(skinColor.includes('var(--')) {
            return skinColor;
        }

        if (!((skinColor.length === 6)  || (skinColor.length === 8))) {
            throw new Error('SPADW: Expected skin color to be of length 6 or 8, but given: ' + skinColor);
        }

        var startIndexes = [0, 2, 4];
        var colors = startIndexes.map(function (i) {
            var decColor = parseInt(skinColor.substr(i, 2), 16);
            return (decColor.length == 1) ? "0"+decColor : decColor;
        });

        if (skinColor.length === 8 && skinColor.substr(6, 2) != "00") {
            //fiddling with alpha channel
            //making alpha channel to be in the range 0.0 to 1.0
            var opacity = skinColor.substr(6,2);
            var alpha = (100-parseInt(opacity,16))/100;
            if((alpha === 1) || (alpha === 0)) {
                colors.push(alpha.toFixed(1));
            } else {
                colors.push(alpha);
            }
            return ['rgba(', colors.reduce(function (p, c) { return p + ", " + c; }), ')'].join('');
        } else {
            return "#"+skinColor.substr(0, 6);
        }
    }

    ns.processTintProperties  = function(skin, styleMap) {
        var enabletint = skin['enable_tint'];
        if(enabletint) {
            styleMap["enabletint"] = enabletint;
            var tint_color = skin['tint_color'];
            if(tint_color.trim().length > 0) {
                skinColorToCssColor(tint_color, 'tint_color', styleMap);
            }
        }
    }

    ns.processCursorProperties = function(skin, styleMap) {
        var cursortype = skin[cssconstants.CURSOR_TYPE];
        if(cursortype) {
            styleMap['cursor-type'] = cursortype;
            if(cursortype == "url") {
                var cursorimage = skin['cursor_image'];
                if(cursorimage) {
                    styleMap['cursor-image'] = cursorimage;
                }
            }
        }
    }

    ns.processBackGroundProperties = function(skin, styleMap, platform, themeConstants) {
        try{
            var formFactor = styleMap['formFactor'];
            var backgroundstyle = skin[cssconstants.BACKGROUND_TYPE];
            var backgroundgradient = skin[cssconstants.BACKGROUND_STYLE];
            if(skin && skin[cssconstants.BACKGROUND_CONSTANT] && themeConstants) {
                skinconstants.processBackGroundConstantSkin(skin, styleMap, themeConstants);
            } else if(backgroundstyle && backgroundstyle == "one") {
                var skinAttrb = skin[cssconstants.BACKGROUND_COLOR];
                if(skinAttrb && skinAttrb.trim().length > 0) {
                    skinColorToCssColor(skinAttrb, 'background-color', styleMap);
                }
            } else if(backgroundstyle && backgroundstyle == "two") {
                if(platform == "desktopwebcommon") {
                    var topcolor = processColorOnly(skin[cssconstants.BACKGROUND_GRADIENT_TOP_COLOR]);
                    var bottomcolor = processColorOnly(skin[cssconstants.BACKGROUND_GRADIENT_BOTTOM_COLOR]);
                    var percentage = (backgroundgradient == "vs" || backgroundgradient == "hs") ? '50%' : '';
                    var msgString = 'to ' + ['bottom', 'bottom', 'right', 'right'][["vg", "vs", "hg", "hs"].indexOf(backgroundgradient)]+ ",";
                    msgString = msgString + topcolor+ ' '+ percentage +',' + bottomcolor + ' '+ percentage;
                    msgString = msgString.replace(/,\s*$/, "");
                    styleMap["bg-grad-split-ms"] = "true";
                    styleMap["background-ms-gradient"] = "true";
                    styleMap["background-ms-color"] = msgString;
                } else {
                    styleMap['bg-grad-split-ms'] = true;
                    if(backgroundgradient && backgroundgradient == "vg") {
                        styleMap['background-gradient'] = "true";
                    } else if(backgroundgradient && backgroundgradient == "vs") {
                        styleMap['background-split'] = "true";
                    } else if(backgroundgradient && backgroundgradient == "hg") {
                        styleMap['background-horizontal-gradient'] = "true";
                    } else if(backgroundgradient && backgroundgradient == "hs") {
                        styleMap['background-horizontal-split'] = "true";
                    }
                    styleMap['topcolor'] = processColorOnly(skin[cssconstants.BACKGROUND_GRADIENT_TOP_COLOR]);
                    styleMap['bottomcolor'] = processColorOnly(skin[cssconstants.BACKGROUND_GRADIENT_BOTTOM_COLOR]);
                }

            } else if(backgroundstyle && backgroundstyle == "image") {
                var skinAttrb = skin[cssconstants.BACKGROUND_IMAGE];
                //TODO .svg concatination is not written. Didn't understood the logic of pattern matching

                if(skinAttrb && formFactor) {
                    if(formFactor == "375") {
                        skinAttrb = skinAttrb.replace(".png", "@2x.png");
                    }
                    if(formFactor == "414") {
                        skinAttrb = skinAttrb.replace(".png", "@3x.png");
                    }
                }
                styleMap['background-image'] = skinAttrb;
                ns.processTintProperties(skin, styleMap);
                var width, height;


                if(skin[cssconstants.BACKGROUND_IMAGE_DIMENSIONS] && skin[cssconstants.BACKGROUND_IMAGE_DIMENSIONS][formFactor]) {
                    width = skin[cssconstants.BACKGROUND_IMAGE_DIMENSIONS][formFactor]['width'];
                } else if(skin[cssconstants.BACKGROUND_IMAGE_DIMENSIONS] && skin[cssconstants.BACKGROUND_IMAGE_DIMENSIONS]['common']) {
                    width = skin[cssconstants.BACKGROUND_IMAGE_DIMENSIONS]['common']['width'];
                }


                if(skin[cssconstants.BACKGROUND_IMAGE_DIMENSIONS] && skin[cssconstants.BACKGROUND_IMAGE_DIMENSIONS][formFactor]) {
                    height = skin[cssconstants.BACKGROUND_IMAGE_DIMENSIONS][formFactor]['height'];
                } else if(skin[cssconstants.BACKGROUND_IMAGE_DIMENSIONS] && skin[cssconstants.BACKGROUND_IMAGE_DIMENSIONS]['common']) {
                    height = skin[cssconstants.BACKGROUND_IMAGE_DIMENSIONS]['common']['height'];
                }

                if(platform == "spaip") {
                    if(formFactor == "375") {
                        if(width) {
                            width = parseFloat((width*1.171875).toFixed(2));
                        }

                        if(height) {
                            height = parseFloat((height*1.171875).toFixed(2));
                        }
                    } else if(formFactor == "414") {
                        if(width) {
                            width = parseFloat((width*1.29375).toFixed(2));
                        }

                        if(height) {
                            height = parseFloat((height*1.29375).toFixed(2));
                        }
                    }
                }

                if(typeof width == "number" && typeof height == "number") {
                    styleMap['width'] = width;
                    styleMap['height'] = height;
                }


                var enable_bg_size = skin[cssconstants.ENABLE_BG_SIZE];
                if(enable_bg_size)
                    styleMap["enable_bg_size"] = ""+enable_bg_size;


            } else if(backgroundstyle && backgroundstyle == "ms_gradient") {
                styleMap["bg-grad-split-ms"] = "true";
                styleMap["background-ms-gradient"] = "true";
                var backgroundObj = skin[cssconstants.BACKGROUND_COLOR];
                var colors_msg = backgroundObj['colors'];
                var percent_msg = backgroundObj['cs'];
                var angle_msg = backgroundObj['angle'];
                var msgString = "";
                if(platform == "desktopwebcommon") {
                    var colorInHex = "";
                    var colorInRGBA = "";
                    var colorinCssString = "";
                    msgString = 'to ' + ['top', 'right', 'bottom', 'left'][[0, 90, 180, 270].indexOf(angle_msg)]+ ",";

                    for(var i = 0; i < colors_msg.length && i < percent_msg.length; i++) {
                        colorInHex = colors_msg[i];
                        colorInRGBA = processColorOnly(colorInHex);
                        msgString = msgString + colorInRGBA+ ' '+ percent_msg[i]+"%,";
                    }
                    msgString = msgString.replace(/,\s*$/, "");
                    msgString = voltmxutil.removeTrailingComma(msgString);
                    styleMap["background-ms-color"] = msgString;
                } else {
                    msgString = angle_msg+",";
                    for(var i = 0; i < colors_msg.length && i < percent_msg.length; i++) {
                        msgString = msgString + colors_msg[i] +" "+ percent_msg[i]+"%,"
                    }
                    var skinAttrb = msgString.replace(/,\s*$/, "");
                    skinAttrb = skinAttrb.replace(/%/g, "");
                    var attrbArray = skinAttrb.split(",");
                    if(platform == 'spawinphone8' || platform == 'spawindowstablet') {
                        var skinAttrbNew="";
                        var skinAttrbDeg = "";
                        for (var i = 0; i < attrbArray.length; i++) {
                            if (i == 0) {
                                if(attrbArray[i].indexOf("to") != -1) {
                                  skinAttrbDeg = skinAttrbNew.concat(attrbArray[i] + ",");
                                }else{
                                    var angle = parseInt(attrbArray[i].trim());
                                    switch(angle) {
                                        case 0:
                                            skinAttrbDeg = skinAttrbNew.concat("90deg,");
                                            break;
                                        case 90:
                                            skinAttrbDeg = skinAttrbNew.concat("0deg,");
                                            break;
                                        case 180:
                                            skinAttrbDeg = skinAttrbNew.concat("270deg,");
                                            break;
                                        default:
                                            skinAttrbDeg = skinAttrbNew.concat("180deg,");
                                            break;
                                    }
                                }
                            } else {
                                var color = attrbArray[i].substring(0, 8);
                                color = processColorOnly(color);
                                color = color.concat(attrbArray[i].substring(8, attrbArray[i].length));
                                if (color.indexOf("%") != -1) {
                                    skinAttrbNew = (skinAttrbNew.concat(color + ","));
                                } else {
                                    skinAttrbNew = (skinAttrbNew.concat(color + "%,"));
                                }
                            }
                        }
                        skinAttrbNew = voltmxutil.removeTrailingComma(skinAttrbDeg.concat(skinAttrbNew));
                        styleMap["background-ms-color"] = skinAttrbNew;
                    } else if(platform == "desktopwebie9") {
                        var topcolor = attrbArray[1].substring(0, 8);
                            topcolor = processColorOnly(topcolor);
                            //topcolor = topcolor.concat(attrbArray[1].substring(8, attrbArray[1].length));
                        //styleMap["topcolor"] = topcolor;
                        var bottomcolor = attrbArray[(attrbArray.length)-1].substring(0, 8);
                            bottomcolor = processColorOnly(bottomcolor);
                        var angle = parseInt(attrbArray[0].trim());
                        var iemsStyle = "vg";
                        switch (angle) {
                            case 270:
                                iemsStyle = "hg";
                                styleMap["iemsStyle"] = iemsStyle;
                                styleMap["bottomcolor"] = topcolor;
                                styleMap["topcolor"] = bottomcolor;
                                break;
                            case 90:
                                iemsStyle = "hg";
                                styleMap["iemsStyle"] = iemsStyle;
                                styleMap["bottomcolor"] = bottomcolor;
                                styleMap["topcolor"] = topcolor;
                                break;
                            case 0:
                                iemsStyle = "vg";
                                styleMap["iemsStyle"] = iemsStyle;
                                styleMap["bottomcolor"] = topcolor;
                                styleMap["topcolor"] = bottomcolor;
                                break;
                            default:
                                iemsStyle = "vg";
                                styleMap["iemsStyle"] = iemsStyle;
                                styleMap["bottomcolor"] = bottomcolor;
                                styleMap["topcolor"] = topcolor;
                        }
                    } else {
                        var startpercentage = attrbArray[1].substring(8, attrbArray[1].length).trim();
                        var endpercentage = attrbArray[attrbArray.length - 1].substring(8, attrbArray[attrbArray.length - 1].length).trim();
                        var percentagestring = "";
                        var angle = parseInt(attrbArray[0].trim());
                        switch (angle) {
                            case 180:
                                percentagestring = "0% " + startpercentage + "% , 0% " + endpercentage + "%";
                                break;
                            case 90:
                                percentagestring = startpercentage + "% 0% , " + endpercentage + "% 0%";
                                break;
                            case 0:
                                percentagestring = "0% " + (100 - parseInt(startpercentage)) + "% , 0% " + (100 - parseInt(endpercentage)) + "%";
                                break;
                            default :
                                percentagestring = (100 - parseInt(startpercentage)) + "% 0%, " + (100 - parseInt(endpercentage)) + "% 0%";
                                break;
                        }

                        var startcolor = attrbArray[1].substring(0, 8);
                        startcolor = processColorOnly(startcolor);
                        var endcolor = attrbArray[attrbArray.length - 1].substring(0, 8);
                        endcolor = processColorOnly(endcolor);

                        startcolor = "from(" + startcolor + ")";
                        endcolor = "to(" + endcolor + ")";

                        var colorstops = "";
                        for (var i = 2; i < attrbArray.length - 1; i++) {
                            var color = attrbArray[i].substring(0, 8);
                            color = processColorOnly(color);
                            var percentage = attrbArray[i].substring(8, attrbArray[i].length).trim();
                            //percentage = Float.toString((float) parseInt(percentage) / 100);
                            percentage =""+parseFloat(percentage) / 100;


                            colorstops = colorstops.concat("color-stop(" + percentage + "," + color + "),");
                        }

                        var skinAttrbNew = percentagestring + "," + startcolor + "," + endcolor + "," + colorstops;
                        skinAttrbNew = voltmxutil.removeTrailingComma(skinAttrbNew);

                        styleMap["background-ms-color"] = skinAttrbNew;
                    }
                }
            } else if(!backgroundstyle) {
                styleMap['transparent'] = "inherit";
            }
        } catch(e) {
            console.error("SPADW: error while generating background properties for skin "+styleMap['skin']+". In function processBackGroundProperties in themetocssconverter.js file");
            console.error("SPADW:" + e.stack);
        }
    }

    ns.processSwitchBackGroundProperties = function(skin, styleMap) {
        var backgroundstyle = skin[cssconstants.BACKGROUND_TYPE];
        if(backgroundstyle && backgroundstyle == "one") {
            var lskinAttrb = skin[cssconstants.LEFT_BACKGROUND_COLOR];
            if(lskinAttrb && lskinAttrb.trim().length > 0) {
                skinColorToCssColor(lskinAttrb, 'left-background-color', styleMap, "left_rgba", "left");
            }
            var rskinAttrb = skin[cssconstants.RIGHT_BACKGROUND_COLOR];
            if(rskinAttrb && rskinAttrb.trim().length > 0) {
                skinColorToCssColor(rskinAttrb, 'right-background-color', styleMap, "right_rgba", "right");
            }
        }else if(backgroundstyle && backgroundstyle == "two") {
            if ( leftbackgroundgradient!= null && leftbackgroundgradient.toUpperCase() == "vg".toUpperCase()) {
                styleMap['left-background-gradient'] = "true";
            }else if ( leftbackgroundgradient!= null && leftbackgroundgradient.toUpperCase() == "vs".toUpperCase()) {
                styleMap['left-background-split'] = "true";
            }
            skinColorToCssColor(skin.left_background_gradient_top_color, "lefttopcolor", styleMap);
            skinColorToCssColor(skin.left_background_gradient_bottom_color, "leftbottomcolor", styleMap);
            skinColorToCssColor(skin.right_background_gradient_top_color, "righttopcolor", styleMap);
            skinColorToCssColor(skin.right_background_gradient_bottom_color, "rightbottomcolor", styleMap);
        }else if (backgroundstyle && backgroundstyle == "image") {
            var lskinAttrb = skin['left_background_image'];
            styleMap['left-background-image'] = lskinAttrb;
            var rskinAttrb = skin['right_background_image'];
            styleMap['right-background-image'] = rskinAttrb;
        }else if(!backgroundstyle || backgroundstyle.length == 0) {
            styleMap['transparent'] = 'inherit';
        }
    }



    ns.processFontProperties = function(skin, styleMap, platform, themeConstants) {
        if(skin && themeConstants && skin[cssconstants.FONT_CONSTANT]) {
            skinconstants.processFontConstantSkin(skin, styleMap, themeConstants)
        } else {
            processFontSizes(skin, styleMap);

            //processFontColor
            if(skin && skin[cssconstants.FONT_COLOR]) {
                var skinAttrb = skin[cssconstants.FONT_COLOR];
                skinColorToCssColor(skinAttrb, "color", styleMap, 'rgba_font');
            } else {
                styleMap['color'] = "000000";
            }

            //processFontWeight
            if(skin && skin[cssconstants.FONT_WEIGHT]) {
                styleMap['font-weight'] = skin[cssconstants.FONT_WEIGHT];
            } else {
                styleMap['font-weight'] = "normal";
            }

            //processFontStyle
            if(skin && skin[cssconstants.FONT_STYLE]) {
                var fontStyle = skin[cssconstants.FONT_STYLE];
                if(themeConstants && fontStyle.includes('var(--')) {
                    var styleVal = fontStyle.match(/var\(--([^\s]*)\)/)[1];
                    styleVal = styleVal ? themeConstants[styleVal] : '';
                    if(styleVal === 'normal' || styleVal === 'italic') {
                        styleMap['styleFlag'] = "true";
                    }
                }
                styleMap['font-style'] = fontStyle;
            } else {
                styleMap['font-style'] = "normal";
            }

            //processFontFamily
            if(skin && skin[cssconstants.FONT_NAME]) {
                styleMap['font-family'] = skin[cssconstants.FONT_NAME];

            } else {
                styleMap['font-family'] = "Helvetica";
            }

            removeFontsForInvalidWidgets(styleMap, platform);
        }
    }

    function processFontSizes(skin, styleMap) {
        var setFontSize = skin[cssconstants.FONT_SIZE];
        var defaultFont = styleMap["defaultfont"];

        if(typeof setFontSize === 'string' && setFontSize.includes('var(--')) {
            styleMap["font-size"] = setFontSize;
        } else {
            setFontSize = parseInt(setFontSize);
            if(!setFontSize && setFontSize != 0) {
                styleMap["font-size"] = (Math.round(defaultFont * 10) / 10).toFixed(1)+"px" ;
                return;
            }

            var suggestedFontSize = (setFontSize * defaultFont) /100;
            suggestedFontSize = (Math.round(suggestedFontSize * 10)/10).toFixed(1);
            styleMap["font-size"] = (suggestedFontSize || defaultFont)+"px" ;
        }
    }

    function removeFontsForInvalidWidgets(styleMap, platform) {
        var mNonFontWidgetsList = ["HImageStrip","HImageStrip2","ImageGallery2",
        "ImageGallery","Camera","layout","Video","SignatureCapture","Popup","PickerView",
        "Image2","Image","FlexContainer","FlexScrollContainer","FlexFormContainer","HBox","VBox","Form", "Form2"];
        if(platform == "desktopwebcommon") {
            mNonFontWidgetsList.push('Phone');
            mNonFontWidgetsList.push('MenuBar');
        }

        var widgetType = styleMap['wtype'] || "";

        if(mNonFontWidgetsList.indexOf(widgetType) != -1) {
            delete styleMap["font-size"];
            delete styleMap['font-style'];
            delete styleMap['font-weight'];
            delete styleMap['font-family'];
        }
    }



    ns.processSwitchFontProperties = function(skin, styleMap, platform, themeConstants) {
        //processSwitchFontSizes
        var lsetFontSize = skin["font_size"];
        var defaultFont = styleMap["defaultfont"];
        if(typeof lsetFontSize === 'string' && lsetFontSize.includes('var(--')) {
            styleMap["left-font-size"] = lsetFontSize;
            styleMap["right-font-size"] = lsetFontSize;
        } else {
            var lsuggestedFontSize = (lsetFontSize * defaultFont) /100;
            lsuggestedFontSize = Math.round(lsuggestedFontSize*10)/10;
            styleMap["left-font-size"] = (lsuggestedFontSize || defaultFont)+"px" ;
            styleMap["right-font-size"] = (lsuggestedFontSize || defaultFont)+"px" ;
        }

        //processSwitchFontColor
        var lskinAttrb = skin[cssconstants.LEFT_FONT_COLOR];
        if(lskinAttrb && 0 !== lskinAttrb.length) {
            skinColorToCssColor(lskinAttrb, 'leftcolor', styleMap, 'rgba_left_font');
        } else {
            styleMap['leftcolor'] = "000000";
        }

        var rskinAttrb = skin[cssconstants.RIGHT_FONT_COLOR];
        if(rskinAttrb && 0 !== rskinAttrb.length) {
            skinColorToCssColor(rskinAttrb, 'rightcolor', styleMap, 'rgba_right_font');
        } else {
            styleMap['rightcolor'] = "000000";
        }

        //processSwitchFontWeight
        var skinAttrb = skin[cssconstants.FONT_WEIGHT];
        if(skinAttrb && 0 !== skinAttrb.length) {
            styleMap['left-font-weight'] = skinAttrb;
            styleMap['right-font-weight'] = skinAttrb;
        } else {
            styleMap['left-font-weight'] = "normal";
            styleMap['right-font-weight'] = "normal";
        }

        //processSwitchFontStyle
        skinAttrb = skin[cssconstants.FONT_STYLE];
        if(skinAttrb && 0 !== skinAttrb.length) {
            if(themeConstants && skinAttrb.includes('var(--')) {
                var styleVal = skinAttrb.match(/var\(--([^\s]*)\)/)[1];
                styleVal = styleVal ? themeConstants[styleVal] : '';
                if(styleVal === 'normal' || styleVal === 'italic') {
                    styleMap['styleFlag'] = "true";
                }
            }
            styleMap['left-font-style'] = skinAttrb;
            styleMap['right-font-style'] = skinAttrb;
        } else {
            styleMap['left-font-style'] = "normal";
            styleMap['right-font-style'] = "normal";
        }

        //processSwitchFontFamily
        var skinAttrbFamily = skin[cssconstants.FONT_NAME];
        if(skinAttrbFamily && 0 !== skinAttrbFamily.length) {
            styleMap['left-font-family'] = skinAttrbFamily;
            styleMap['right-font-family'] = skinAttrbFamily;
        } else {
            styleMap['left-font-family'] = "Helvetica";
            styleMap['right-font-family'] = "Helvetica";
        }

    }


    ns.processBorderProperties = function(skin, styleMap, platform, themeConstants) {
        var forked = skin[cssconstants.IS_FORKED];
        if(skin[cssconstants.BORDER_CONSTANT] && themeConstants) {
            skinconstants.processBorderConstantSkin(skin, styleMap, themeConstants);
        } else if(forked) {
            processSpecificBorderColor(skin, styleMap, platform);
            processSpecificBorderWidth(skin, styleMap, platform);
            processSpecificBorderStyle(skin, styleMap, platform);
            styleMap['forking'] = true;
        } else {
            processBorderColor(skin, styleMap, platform);
            processBorderWidth(skin, styleMap, platform);
            processBorderStyle(skin, styleMap, platform);
        }
    }

    //process BorderColor
    function processBorderColor(skin, styleMap, platform) {
       var skinAttrb = skin[cssconstants.BORDER_COLOR];
        if(skinAttrb && 0 !== skinAttrb.length) {
            skinColorToCssColor(skinAttrb, 'border-color', styleMap, 'rgba_border');
        } else {
            styleMap['border-color'] = "000000";
        }
    }

    //process BorderWidth
    function processBorderWidth(skin, styleMap, platform) {
        if(skin[cssconstants.BORDER_WIDTH] != undefined) {
            var skinAttrb = ""+skin[cssconstants.BORDER_WIDTH];
            if(skinAttrb && 0 !== skinAttrb.length) {
                styleMap['border-width'] = ""+skinAttrb;
                styleMap['border-style'] = "solid";
            }
        }
    }

    //process BorderStyle
    function processBorderStyle(skin, styleMap, platform) {
        var borderstyle = skin[cssconstants.BORDER_STYLE];
        if(borderstyle && borderstyle.toUpperCase() == "rc".toUpperCase()) {
            styleMap['border-style'] = borderstyle;
            var radius = skin[cssconstants.BORDER_RADIUS];
            if(radius != undefined) {
                styleMap['border-radius'] = ""+radius;
            }
        } else if(borderstyle && borderstyle.toUpperCase() == "custom".toUpperCase()) {
            var radius = skin[cssconstants.BORDER_RADIUS];
            if(radius != undefined) {
                styleMap['border-style'] = borderstyle;
                styleMap['border-radius'] = ""+radius;
            }
        }
    }

    //process forked skin border color
    function processSpecificBorderColor(skin, styleMap, platform) {
        var topcolor = skin[cssconstants.BORDER_TOP_COLOR];
        var rightcolor = skin[cssconstants.BORDER_RIGHT_COLOR];
        var bottomcolor = skin[cssconstants.BORDER_BOTTOM_COLOR];
        var leftcolor = skin[cssconstants.BORDER_LEFT_COLOR];
        if(topcolor && 0 !== topcolor.length) {
            skinColorToCssColor(topcolor, "border-top-color", styleMap, "rgba_top_border");
        } else {
            styleMap['border-top-color'] = "000000";
        }

        if(rightcolor && 0 !== rightcolor.length) {
            skinColorToCssColor(rightcolor, "border-right-color", styleMap, "rgba_right_border");
        } else {
            styleMap['border-right-color'] = "000000";
        }

        if(bottomcolor && 0 !== bottomcolor.length) {
            skinColorToCssColor(bottomcolor, "border-bottom-color", styleMap, "rgba_bottom_border");
        } else {
            styleMap['border-bottom-color'] = "000000";
        }

        if(leftcolor && 0 !== leftcolor.length) {
            skinColorToCssColor(leftcolor, "border-left-color", styleMap, "rgba_left_border");
        } else {
            styleMap['border-left-color'] = "000000";
        }


    }

    //process forked skin border width
    function processSpecificBorderWidth(skin, styleMap, platform) {

        var topwidth = ""+skin[cssconstants.BORDER_TOP_WIDTH];
        var rightwidth = ""+skin[cssconstants.BORDER_RIGHT_WIDTH];
        var bottomwidth = ""+skin[cssconstants.BORDER_BOTTOM_WIDTH];
        var leftwidth = ""+skin[cssconstants.BORDER_LEFT_WIDTH];

        if(topwidth && 0 !== topwidth.length && parseInt(topwidth) > 0) {
            styleMap['border-top-width'] = topwidth;
            styleMap['border-style'] = "solid";
        }

        if(rightwidth && 0 !== rightwidth.length && parseInt(rightwidth) > 0) {
            styleMap['border-right-width'] = rightwidth;
            styleMap['border-style'] = "solid";
        }

        if(bottomwidth && 0 !== bottomwidth.length && parseInt(bottomwidth) > 0) {
            styleMap['border-bottom-width'] = bottomwidth;
            styleMap['border-style'] = "solid";
        }

        if(leftwidth && 0 !== leftwidth.length && parseInt(leftwidth) > 0) {
            styleMap['border-left-width'] = leftwidth;
            styleMap['border-style'] = "solid";
        }

    }

    //process forked skin border style
    function processSpecificBorderStyle(skin, styleMap, platform) {

        var topleftstyle = skin[cssconstants.TOP_LEFT_BORDER_STYLE];
        var toprightstyle = skin[cssconstants.TOP_RIGHT_BORDER_STYLE];
        var bottomleftstyle = skin[cssconstants.BOTTOM_LEFT_BORDER_STYLE];
        var bottomrightstyle = skin[cssconstants.BOTTOM_RIGHT_BORDER_STYLE];

        if(topleftstyle && topleftstyle.toUpperCase() == "rc".toUpperCase()) {
            var topleftradius = ""+skin[cssconstants.TOP_LEFT_BORDER_RADIUS];
            if(topleftradius && 0 !== topleftradius && parseInt(topleftradius) > 0) {
                styleMap['border-top-left-style'] = topleftstyle;
                styleMap['border-top-left-radius'] = topleftradius;
            }
        }

        if(toprightstyle && toprightstyle.toUpperCase() == "rc".toUpperCase()) {

            var toprightradius = ""+skin[cssconstants.TOP_RIGHT_BORDER_RADIUS];
            if(toprightradius && 0 !== toprightradius && parseInt(toprightradius) > 0 ) {
                styleMap['border-top-right-style'] = toprightstyle;
                styleMap['border-top-right-radius'] = toprightradius;
            }
        }

        if(bottomleftstyle && bottomleftstyle.toUpperCase() == "rc".toUpperCase()) {
            var bottomleftradius = ""+skin[cssconstants.BOTTOM_LEFT_BORDER_RADIUS];
            if(bottomleftradius && 0 !== bottomleftradius && parseInt(bottomleftradius) > 0) {
                styleMap['border-bottom-left-style'] = bottomleftstyle;
                styleMap['border-bottom-left-radius'] = bottomleftradius;
            }
        }

        if(bottomrightstyle && bottomrightstyle.toUpperCase() == "rc".toUpperCase()) {
            var bottomrightradius = ""+skin[cssconstants.BOTTOM_RIGHT_BORDER_RADIUS];
            if(bottomrightradius && 0 !== bottomrightradius && parseInt(bottomrightradius) > 0) {
                styleMap['border-bottom-right-style'] = bottomrightstyle;
                styleMap['border-bottom-right-radius'] = bottomrightradius;
            }
        }

        //Passing Rounded corner values to child nodes in case of segment.
        if(skin['wType'] == "Segment" || skin['wType'] == "Segment2") {
            if(topleftstyle && topleftstyle.toUpperCase() == "rc".toUpperCase()) {
                var childtopleftradius = skin['child_border_top_left_radius'];
                styleMap['child_border-top-left-radius'] = childtopleftradius;
            }

            if(toprightstyle && toprightstyle.toUpperCase() == "rc".toUpperCase()) {
                var childtoprightradius = skin['child_border_top_right_radius'];
                styleMap['child_border-top-right-radius'] = childtoprightradius;
            }

            if(bottomleftstyle && bottomleftstyle.toUpperCase() == "rc".toUpperCase()) {
                var childbottomleftradius = skin['child_border_bottom_left_radius'];
                styleMap['child_border-bottom-left-radius'] = childbottomleftradius;
            }

            if(bottomrightstyle && bottomrightstyle.toUpperCase() == "rc".toUpperCase()) {
                var childbottomrightradius = skin['child_border_bottom_right_radius'];
                styleMap['child_border-bottom-right-radius'] = childbottomrightradius;
            }
        }

    }



    ns.processShadowProperties = function(skin, styleMap) {
        var shadowObj = skin[cssconstants.BOX_SHADOW];
        if(skin[cssconstants.BOX_SHADOW_CONSTANT]) {
            skinconstants.processShadowConstantSkin(skin, styleMap);
        } else {
            if(shadowObj['x'] != undefined) {
                var xoffset = ""+shadowObj['x'];
            }

            if(shadowObj['y'] != undefined) {
                var yoffset = ""+shadowObj['y'];
            }

            if(shadowObj['br'] != undefined) {
                var shadowradius = ""+shadowObj['br'];
            }

            var shadowcolor = shadowObj['color'];
            var innershadow = shadowObj['inner'];

            if(innershadow == true) {
                styleMap["inner"] = "true";
            }else{
                styleMap["inner"] = "false";
            }

            if (xoffset && xoffset.length != 0) {
                styleMap['shadowoffsetx'] = xoffset+"px";
            }else{
                styleMap['shadowoffsetx'] = "0px";
            }

            if (yoffset && yoffset.length != 0) {
                styleMap['shadowoffsety'] = yoffset+"px";
            }else{
                styleMap['shadowoffsety'] = "0px";
            }

            if (shadowradius && shadowradius.length != 0) {
                styleMap['shadowblurradius'] = shadowradius+"px";
            }else{
                styleMap['shadowblurradius'] = "0px";
            }

            if (shadowcolor && shadowcolor.length != 0) {
                skinColorToCssColor(shadowcolor,"shadowcolor", styleMap, "rgba_shadow");
            }
        }
    }

    ns.processTextShadowProperties = function(skin, styleMap) {
        var textShadowObj = skin[cssconstants.TEXT_SHADOW];
        if(skin[cssconstants.TEXT_SHADOW_CONSTANT]) {
            skinconstants.processTextShadowConstantSkin(skin, styleMap);
        } else {
            if(textShadowObj['x'] != undefined)
                var txtxoffset = ""+textShadowObj['x'];

            if(textShadowObj['y'] != undefined)
                var txtyoffset = ""+textShadowObj['y'];

            if(textShadowObj['br'] != undefined)
                var txtshadowradius = ""+textShadowObj['br'];

            var txtshadowcolor = textShadowObj['color'];

            if (txtxoffset && txtxoffset.trim().length != 0) {
                styleMap['txtshadowoffsetx'] = txtxoffset+"px";
            }else{
                styleMap['txtshadowoffsetx'] = "0px";
            }

            if (txtyoffset && txtyoffset.trim().length != 0) {
                styleMap['txtshadowoffsety'] = txtyoffset+"px";
            }else{
                styleMap['txtshadowoffsety'] = "0px";
            }

            if (txtshadowradius && txtshadowradius.trim().length != 0) {
                styleMap['txtshadowblurradius'] = txtshadowradius+"px";
            }else{
                styleMap['txtshadowblurradius'] = "0px";
            }

            if (txtshadowcolor && txtshadowcolor.trim().length != 0) {
                skinColorToCssColor(txtshadowcolor, "txtshadowcolor", styleMap, "rgba_shadow");
            }
        }
    }

})(ns);

module.exports = ns;