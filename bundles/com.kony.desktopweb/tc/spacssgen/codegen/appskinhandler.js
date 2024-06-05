//css app skin handler

var path = require('path');
var fs = require('fs');
var voltmxUtil = require('./utils');

var velocitytemplatesmap = require('./velocitytemplatesmap');
Engine = require('velocity').Engine;

var ns = {};

var cssUtils = require('./cssutils');
var skinconstants = require('./skinconstantshandler');
var cssconstants = require('./cssconstants').constants;
var appconstants = require('./appconstants').constants;

(function (ns) {

    ns.renderApplicationSkins = function(skinsObj, platform, formFactor, cgArgs) {
        try {
            var skinBuffer = new voltmxUtil.StringBuffer();
            var retinaskinBuffer = new voltmxUtil.StringBuffer();
            var basecssMap = {};

            var basefont = cssUtils.processBaseFontSize(platform, formFactor, cgArgs.appObj);
            basecssMap = generateBasecssMap(basefont);
            var skinsNameSorted = Object.keys(skinsObj);
            var themeName = cgArgs.themeName;

            if(skinsObj.theme_styles
            && Object.keys(skinsObj.theme_styles).length > 0) {
                var {result, processThemeConstants} = skinconstants.processSkinningConstants(cgArgs, skinsNameSorted, skinsObj, basefont);
                skinBuffer.append(result);
            }

            //process custom fonts if any.
            result = ns.processCustomFonts(cgArgs, skinsNameSorted, skinsObj, themeName, processThemeConstants);
            skinBuffer.append(result);

            //Generate Base css for all skins.
            var SkinsByWidgetMap = processSkinsbasedOnWidget(skinsObj);
            var result = generateBaseCSSforWidgetSkins(SkinsByWidgetMap, basecssMap, platform);
            skinBuffer.append(result);

            //Processing skins by iterating theme json.
            for(var snsIdx = 0; snsIdx < skinsNameSorted.length; snsIdx++) {

                var skinName = skinsNameSorted[snsIdx];
                var appSkin = skinsObj[skinName];
                var skinMap = {};

                var wType = skinsObj[skinName]['wType'];
                /*
                if(skinName == "sknsegf7f7f7hover") {
                    console.log(skinName);
                }
                */

                if(cgArgs.newlib === true) {
                    skinMap['skin'] = populateSkinName(appSkin, skinName);
                    skinMap['newlib'] = "true";
                } else  {
                    skinMap['skin'] = skinName;
                    if(skinName === 'theme_styles') {
                        continue;
                    }
                }
                skinMap['classname'] = skinName;


                if(formFactor) {
                    skinMap['formFactor'] = formFactor;
                }
                if(basefont) {
                    skinMap['defaultfont'] = basefont;
                }

                if(voltmxUtil.isplatformspa(platform)) {
                  skinMap['__isspa__'] = true;
                }

                if(platform == appconstants.SPA_IPHONE_PLATFORM) {
                    skinMap['spaip'] = true;
                }

                if(appSkin.forked) {
                    skinMap['forking'] = true;
                }

                if(wType == "progress indicator") {
                    //TODO: handling of progress skin
                    //Currently this option is missing in the Iris.

                } else if(wType == "Blocked UI") {
                    var templateFile = velocitytemplatesmap[platform]['featureskins'];
                    skinMap['blocked_ui'] = "true";
                    var BlockingUIImageName = appSkin[cssconstants.BIMAGE];
                    if(BlockingUIImageName)
                        skinMap['bimgname'] = BlockingUIImageName;

                    var WidthofBlockUiImage = "";
                    if(appSkin[cssconstants.BACKGROUND_IMAGE_DIMENSIONS]
                        && appSkin[cssconstants.BACKGROUND_IMAGE_DIMENSIONS][formFactor]) {
                        WidthofBlockUiImage = appSkin[cssconstants.BACKGROUND_IMAGE_DIMENSIONS][formFactor]['width'];
                    } else if(appSkin[cssconstants.BACKGROUND_IMAGE_DIMENSIONS]
                        && appSkin[cssconstants.BACKGROUND_IMAGE_DIMENSIONS]['common']) {
                        WidthofBlockUiImage = appSkin[cssconstants.BACKGROUND_IMAGE_DIMENSIONS]['common']['width'];
                    }

                    if(WidthofBlockUiImage) {
                        skinMap['width'] = WidthofBlockUiImage;
                    }

                    var HeightofBlockUIImage = "";
                    if(appSkin[cssconstants.BACKGROUND_IMAGE_DIMENSIONS]
                        && appSkin[cssconstants.BACKGROUND_IMAGE_DIMENSIONS][formFactor]) {
                        HeightofBlockUIImage = appSkin[cssconstants.BACKGROUND_IMAGE_DIMENSIONS][formFactor]['height'];
                    } else if(appSkin[cssconstants.BACKGROUND_IMAGE_DIMENSIONS]
                        && appSkin[cssconstants.BACKGROUND_IMAGE_DIMENSIONS]['common']) {
                        HeightofBlockUIImage = appSkin[cssconstants.BACKGROUND_IMAGE_DIMENSIONS]['common']['height'];
                    }

                    if(HeightofBlockUIImage) {
                        skinMap['height'] = HeightofBlockUIImage;
                    }

                    var BlockingUIImageLocation = appSkin[cssconstants.BIMAGELOCATION];
                    if(BlockingUIImageLocation) {
                        skinMap['bimgloc'] = BlockingUIImageLocation;
                    }

                    cssUtils.processBackGroundProperties(appSkin, skinMap, platform, processThemeConstants);
                    result = voltmxUtil.templaterenderer(templateFile, skinMap);
                    skinBuffer.append(result);

                } else {
                    if(appSkin.forked && appSkin[cssconstants.ISCUSTOMCSSENABLED]) {
                        var customCssText = appSkin.customCSS;
                        if(customCssText) {
                            if(["Segment", "Segment2", "TabPane", "Label", "Link",
                                "DataGrid", "Switch"].indexOf(wType) != -1) {
                                skinBuffer.append(customCssText);
                            } else {
                                skinBuffer.append("."+skinMap['skin']+"{ \n"+customCssText+" \n } \n");
                            }
                            continue;
                        }
                    }

                    skinMap['wtype'] = wType;
                    var templateFile = getTemplateName(platform, wType, cgArgs.newlib);


                    if(wType == "Image") {
                        cssUtils.processTintProperties(appSkin, skinMap);
                    }

                    if(["Form", "HBox","VBox" ].indexOf(wType) != -1) {
                        skinMap['wtype'] = "layout";
                        var borderstyle = appSkin[cssconstants.BORDER_STYLE];
                        var backgroundType = appSkin[cssconstants.BACKGROUND_TYPE];

                        if(wType == "HBox") {
                            var progressIndicatorImageName = appSkin['pimage'];
                            if(progressIndicatorImageName) {
                                skinMap['pimgexists'] = "true";
                                skinMap['pimgname'] = progressIndicatorImageName;
                            }

                            var progressIndicatorImageLocation = appSkin['pimagelocation'];
                            if(progressIndicatorImageLocation) {
                                skinMap['pimgloc'] = progressIndicatorImageLocation;
                            }
                        }

                        if(backgroundType) {
                            if(wType == "HBox" && backgroundType == 'image') {
                                var repeatImage = appSkin[cssconstants.REPEAT_IMAGE];
                                if(!repeatImage) {
                                    skinMap['repeatimage'] = "false";
                                }
                            }
                        }
                        if(borderstyle == "rc") {
                            skinMap['rounded'] = "true";
                        }
                    } else if(["Segment", "Segment2", "Link", "HImageStrip", "HImageStrip2",
                            "ImageGallery", "TextBox", "Calendar", "RichText", "TextArea"].indexOf(wType) != -1) {

                        setProgressSkinProperties(skinMap, appSkin);

                        if(appSkin[cssconstants.BORDER_STYLE] == "rc") {
                            skinMap['rounded'] = "true";
                        }
                    } else if(wType == "Button") {
                        setProgressSkinProperties(skinMap, appSkin);
                        if(appSkin[cssconstants.BORDER_STYLE] == "rc") {
                            skinMap['rounded'] = "true";
                        }
                        var backgroundType = appSkin[cssconstants.BACKGROUND_TYPE];
                        if(backgroundType == 'image') {
                            var repeatImage = appSkin[cssconstants.REPEAT_IMAGE];
                            if(!repeatImage) {
                                skinMap['repeatimage'] = "false";
                            } else {
                                skinMap['repeatimage'] = repeatImage;
                            }
                        }
                    } else if(["CheckBoxGroup", "RadioButtonGroup"].indexOf(wType) != -1) {
                        skinMap['checkbox'] = "true";
                    }

                    if(wType == "Appmenu") {
                        skinMap['appmenu'] = "layout";
                    }

                    if(wType == "Switch") {
                        cssUtils.processSwitchBackGroundProperties(appSkin, skinMap);
                        cssUtils.processSwitchFontProperties(appSkin, skinMap, platform, processThemeConstants);
                        cssUtils.processBorderProperties(appSkin, skinMap, platform, processThemeConstants);
                    } else {
                        cssUtils.processBackGroundProperties(appSkin, skinMap, platform, processThemeConstants);
                        cssUtils.processFontProperties(appSkin, skinMap, platform, processThemeConstants);
                        cssUtils.processBorderProperties(appSkin, skinMap, platform, processThemeConstants);
                    }

                    if(platform === "desktopwebcommon") {
                        cssUtils.processCursorProperties(appSkin, skinMap, platform)
                    }

                    if(appSkin[cssconstants.BOX_SHADOW] || appSkin[cssconstants.BOX_SHADOW_CONSTANT]) {
                        cssUtils.processShadowProperties(appSkin, skinMap);
                    }

                    if((appSkin[cssconstants.TEXT_SHADOW] || appSkin[cssconstants.TEXT_SHADOW_CONSTANT])
                    && (wType == "Label" || wType == "Button")) {
                       cssUtils.processTextShadowProperties(appSkin, skinMap);
                    }

                    if(wType == "TextBox") {
                        skinMap["textfield"] = true;
                    }

                    var repeatImage = appSkin[cssconstants.REPEAT_IMAGE];
                    if(repeatImage) {
                        skinMap["repeat"] = true;
                    } else {
                        skinMap["repeat"] = false;
                    }

                    var repeatVerticalImage = appSkin[cssconstants.REPEAT_VERTICALLY_IMAGE];
                    if(repeatVerticalImage) {
                        skinMap["verticalrepeat"] = true;
                    } else {
                        skinMap["verticalrepeat"] = false;
                    }

                    if(platform == "spabbnth") {
                        skinMap['isbbnth'] = true;
                    }

                    skinMap = removeRedundantKeysfromSkinMap(skinMap, basecssMap, basefont);

                    if(platform == "desktopwebcommon") {
                        skinMap['desktopcss'] = true;
                    }

                    var result = voltmxUtil.templaterenderer(templateFile, skinMap);

                    if(result.includes("var(")) {
                        result = result.replace(/#var\(/g,"var(");
                        result = processSkinPropertyforIE(result, processThemeConstants);
                    }

                    skinBuffer.append(result);

                    var retinaimage = appSkin['enable_retina_image'];
                    if(retinaimage) {
                        templateFile = velocitytemplatesmap[platform]['Retinaappskincss'];
                        var backgroundretinaimage = appSkin['retina_image'];
                        skinMap['backgroundretinaimage'] = backgroundretinaimage;

                        var retinarepeatImage = appSkin['repeat_retina_image'];
                        if(retinarepeatImage)
                            skinMap['retinarepeatImage'] = retinarepeatImage;

                        var width = appSkin['width'];
                        var height = appSkin['height'];

                        if(width && height) {
                            skinMap['width'] = width+"px";
                            skinMap['height'] = height+"px";
                        }

                        result = voltmxUtil.templaterenderer(templateFile, skinMap);
                        retinaskinBuffer.append(result);
                    }
                }
            }

            if(platform == 'spaip') {
                //skinBuffer.append(":::").append(retinaskinBuffer.toString());
                skinBuffer.append(":::");
                skinBuffer.append(retinaskinBuffer.toString());
            }
            return skinBuffer.toString();
        } catch(e) {
            console.error("SPADW: error in renderApplicationSkins function for platform "+ platform +". error message is: "+e.message);
            console.error("SPADW: " + e.stack);
            return "";
        }
    }

    function getTemplateName(platform, wType, isNewLib) {
        var templateFile = velocitytemplatesmap[platform]['appskincss'];


        var tempTemplateFile = velocitytemplatesmap[platform][wType+'appskincss'];
        if(tempTemplateFile) {
            templateFile = tempTemplateFile;
        }

        if(isNewLib === true) {
            if(wType == "Switch") {
                templateFile = "tpdesktopcommonswitchcsslib.vm";
            } else if(wType == 'TabPane' || wType == 'Segment') {
                templateFile = "tpdesktopcommongenericcss.vm";
            }
        }

        return templateFile;
    }

    function populateSkinName(appSkin, skinName) {
        var wType = appSkin['wType'];

        if(wType === 'CheckBoxGroup' || wType === 'RadioButtonGroup') {
            skinName += ", [kw=" + wType + "]>div." + skinName + "-hover, "
                        + "[kw=" + wType + "]>div." + skinName + "-focus, "
                        + "[kw=" + wType + "]." + skinName + "-active, "
                        + "[kw=" + wType + "]>div." + skinName + "-active";
        } else if(wType === 'ListBox') {
            skinName += ", [kw]." + skinName + "-hover, "
                        + "[kw]." + skinName + "-focus, "
                        + "[kw]." + skinName + "-active, "
                        + "div[kw='ListBox'][kv='editableview'] ~ ul>li." + skinName + "-hover";
        } else if(wType === 'DataGrid') {
            skinName += ", [kw=" + wType + "]>ul." + skinName + "-active";
        } else if(wType === 'Image') {
            skinName += ", [kw = 'Image2']>img." + skinName + "-active";
        } else if(wType === 'Segment') {
            skinName += ", li[kr='item']." + skinName + "-focus, "
                        + "div[kr='item']." + skinName + "-focus, "
                        + "[kw = 'SegmentedUI2']>ul." + skinName + "-active";
        } else if(wType === 'Slider') {
            skinName += ", [kw=" + wType + "]." + skinName + "-hover, "
                        + "[kw=" + wType + "]." + skinName + "-focus, "
                        + "[kw=" + wType + "]>[ko='horizontal'] img[kr='thumb']." + skinName + "-active";
        } else if(wType === 'TabPane') {
            skinName += ", [kw= '" + wType + "'][kv = 'collapsibleview'] div[tabid]."+ skinName + "-focus, "
                        + "[kw= '" + wType + "'][kv = 'tabview'] ul[kr='tabs']>li[tabid]." +skinName + "-focus, "
                        + "[kw]." + skinName + "-active";
        } else if(wType === 'Video') {
            skinName += ", [kw=" + wType + "]>video." + skinName + "-active";
        } else {
            skinName += ", [kw]." + skinName + "-hover, "
                        + "[kw]." + skinName + "-focus, "
                        + "[kw]." + skinName + "-active";
        }

        if(wType === 'RichText') {
            skinName += ", [kw=" + wType + "]."+ skinName +"-link a ,"
                        + "[kw=" + wType + "]."+ skinName +"-linkfocus a:active";
        }

        return skinName;
    }

    function generateBasecssMap(basefont) {
        var fontsize = basefont+"px";
        return {
            'font-size' : fontsize,
            'color' : '000000',
            'transparent' : 'inherit',
            'border-width' : '0',
            'border-color' : '000000'
        }
    }

    //Creating a hashmap for skins based on widget Type.
    function processSkinsbasedOnWidget(themeJSON) {
        var skinsObj = themeJSON;
        var widgetSkinsObj = {};

        if(Object.keys(skinsObj).length > 0) {
            for(var skinName in skinsObj) {
                var skinObj = skinsObj[skinName];
                var wType = skinObj.wType;
                if(wType == "TextField") {
                    wType = "TextBox2";
                    skinObj.wType = "TextBox2";
                }
                if(!widgetSkinsObj[wType])
                    widgetSkinsObj[wType] = {};

                widgetSkinsObj[wType][skinName] = skinObj;
            }
        }

        return widgetSkinsObj;
    }

    function generateBaseCSSforWidgetSkins(skinsObj, basecssMap, platform) {
        var resultBuffer = new voltmxUtil.StringBuffer();
        var WidgetList = ["Button", "Calendar", "RichText", "CheckBoxGroup",
            "RadioButtonGroup", "HBox", "VBox", "Form", "Link", "Label", "Phone", "HImageStrip","HImageStrip2","ImageGallery2",
            "ImageGallery", "TextBox", "TextBox2","TextArea","TextArea2", "Camera", "ListBox", "ComboBox", "Popup", "Appmenu","layout"];

        var id = "";
        var baseSkins = [];
        var skinIds = new voltmxUtil.StringBuffer();

        var widgetKeysSorted = Object.keys(skinsObj);
        for(var keyIdx = 0; keyIdx < widgetKeysSorted.length; keyIdx++) {
            var key = widgetKeysSorted[keyIdx];
            if(WidgetList.indexOf(key) != -1) {
                var skinNamesSorted = Object.keys(skinsObj[key]);
                for(var idx = 0; idx < skinNamesSorted.length; idx++) {

                    var id = skinNamesSorted[idx];
                    var tempSkin = skinsObj[key][id];
                    if(tempSkin[cssconstants.ISCUSTOMCSSENABLED]) {
                        continue;
                    }
                    baseSkins.push(id);
                }
            }
        }

        var length = baseSkins.length;
        if(length) skinIds.append('.voltmxfw_baseskincss,');
        for(var i = 0; i < length; i++) {
            id = baseSkins[i];

            if( i < length-1) {
                skinIds.append(" ."+id+",")
            } else {
                skinIds.append(" ."+id);
            }
        }

        basecssMap['skinIds'] = skinIds.toString();
        var templateFile = velocitytemplatesmap[platform]["baseskincss"];
        var result = voltmxUtil.templaterenderer(templateFile, basecssMap);
        return result;
    }

    //Parsing progresskin properties
    function setProgressSkinProperties(skinMap, appSkin) {
        var progressIndicatorImageName = appSkin["bimage"];
        if(progressIndicatorImageName) {
            skinMap["pimgexists"] = "true";
            skinMap["pimgname"] = progressIndicatorImageName;
        }

        var pimagelocation = appSkin["bimagelocation"];
        if(pimagelocation) {
            skinMap["pimgloc"] = pimagelocation;
        }

        var borderstyle = appSkin[cssconstants.BORDER_STYLE];
        if(borderstyle == "rc") {
            skinMap["rounded"] = "true";
        }

        var pgcolor = skinMap["pionecolor"];
        if(pgcolor && pgcolor.trim().length > 0) {
            pgcolor = voltmxUtil.processColorOnly(pgcolor);
            if(pgcolor.contains("rgba")) {
                skinMap["pirgba"] = "true";
            }
            skinMap["picolor"] = "pgcolor";
        }

    }

    function removeRedundantKeysfromSkinMap(skinMap, basecssMap, basefont) {
        var WidgetList = ["Button", "Calendar", "RichText", "CheckBoxGroup",
            "RadioButtonGroup", "HBox", "VBox", "Form", "Link", "Label", "Phone", "HImageStrip","HImageStrip2","ImageGallery2",
            "ImageGallery", "TextBox", "TextBox2","TextArea","TextArea2", "Camera", "ListBox", "ComboBox", "Popup", "Appmenu","layout"];

        var wType = skinMap["wtype"];
        if(WidgetList.indexOf(wType) != -1) {
            for(var key in basecssMap) {
                var basecssMapkey = basecssMap[key];
                if(skinMap[key]) {
                    var skinMapKey = skinMap[key];
                    if(basecssMapkey == skinMapKey) {
                        delete skinMap[key];
                    }
                }
            }
        }

        if(!skinMap["font-size"]) {
            skinMap["base-font"] = basefont+"px";
        }

        return skinMap;
    }

    function processSkinPropertyforIE(result, constants) {
        var finalStr = result, index = 0, skin = null, prop = null, varprop = null,
            sknsArray = null, start = null, end = null, sknProps = null, i = 0,
            deduceConstant = function(value) {
                var separator = ',';
                if(value.includes('var(')) {
                    var valuesArray = value.split(separator);
                    if(valuesArray.length == 1) {
                        separator = ' ';
                        valuesArray = value.split(separator);
                    }
                    for(var l=0; l<valuesArray.length;l++) {
                        if(valuesArray[l].includes('var(')) {
                            var matchArr = valuesArray[l].match(/var\(([^\s]*)\)/);
                            valuesArray[l] = valuesArray[l].replace(matchArr[0], constants[matchArr[1].replace('--','')]);
                        }
                    }
                    if(valuesArray.join(separator).includes('var(')) {
                        return deduceConstant(valuesArray.join(separator));
                    } else {
                        return valuesArray.join(separator);
                    }
                } else {
                    return value;
                }
            };

        sknsArray = result.match(/{([^}]+)}/g);
        if(sknsArray != null) {
            for(i = 0; i<sknsArray.length; i++) {
                start = sknsArray[i].indexOf("{") + 1;
                end = sknsArray[i].indexOf("}");
                skin = sknsArray[i];
                sknProps = sknsArray[i].substring(start,end).split(';');
                for (index = 0; index < sknProps.length; index++) {
                    prop = sknProps[index].trim();
                    if(prop.includes('var(')) {
                        varprop = prop.split(':');
                        var constValue = deduceConstant(varprop[1]);
                        skin = skin.replace(prop, varprop[0] +':'+ constValue + ';\n'+prop);
                    }
                }
                finalStr = finalStr.replace(sknsArray[i], skin);
            }
        }
        return finalStr;
    }

    //process custom fonts
    ns.processCustomFonts = function(cgArgs, skinsList, skinsObj, themeName, themeConstants) {
        //TODO handling of custom fonts
        var customfonts = cgArgs.appObj["customFonts"];
        var isNewLib = cgArgs.newlib;
        var font, skin;
        var result = "", fontName = "";
        var customFontsInApp = [], customFontsInUse = [];
        try {
            if(customfonts && customfonts.length > 0) {
                customfonts = customfonts.split(",");
                for(var i = 0; i < customfonts.length; i++) {
                    font = customfonts[i];
                    font = font.replace(".ttf", "");
                    customFontsInApp.push(font);
                }

                for(var i = 0; i < skinsList.length; i++) {
                    skin = skinsObj[skinsList[i]];
                    fontName = skin["font_constant"] || skin["font_name"];
                    if(themeConstants && typeof fontName === 'string') {
                        fontName = themeConstants[fontName+'-font-family'] || fontName;
                    }
                    if(fontName && customFontsInApp.indexOf(fontName) != -1) {
                        customFontsInUse.push(fontName);
                    }
                }

                var map = {};
                if(isNewLib == true) {
                    map['newlib'] = "true";
                }
                map['ext'] = ".ttf";
                map["ext2"] = ".eot";
                map["themeName"] = themeName;
                customFontsInUse = voltmxUtil.getUniqueValuesArray(customFontsInUse); //removing duplicates
                map["customfontsinuse"] = customFontsInUse;
                var templateFile = velocitytemplatesmap.spa.customfonts;
                var result = voltmxUtil.templaterenderer(templateFile, map);
            }
            return result;
        } catch(e) {
            console.error("SPADW: error in processCustomFonts function."+e.message);
            console.error("SPADW:" + e.stack);
            return "";
        }
    }

    //TO DO Custom fonts
    ns.generateCustomFontsList = function(platform) {
        var result = [];
        return result;
        //TODO: this function
       var fontsDir = path.resolve(projectdir, "resources", "fonts");
       var fontfoldernames = {
                'spaip' : 'SPA iPhone',
                'spaan' : 'SPA Android',
                'spabb' : 'SPA Blackberry',
                'spabbnth' : 'SPA BlackberryNth',
                'spawinphone8' : 'SPA Windows',
                'spaipad' : 'SPA iPad',
                'spaandroidtablet' : 'SPA Android Tablet',
                'spawindowstablet' : 'SPA Windows Tablet',
                'desktopwebcommon' : 'Desktop_web',
                'desktopwebie9' : 'Desktop_web'
        }

        var customFontsList = {};

        if(fs.existsSync(fontsDir)) {
            var platformfontsdirname = fontfoldernames[platform];
            if(platformfontsdirname) {
                var platformfontsdir = path.resolve(fontsDir, platformfontsdirname);
                if(fs.existsSync(platformfontsdir)) {
                    voltmxUtil.collectItemsRecursivesly(platformfontsdir, customFontsList);
                    result = Object.keys(customFontsList)
                }
            }
        }
        return result;
    }

})(ns);

module.exports = ns;