var ns = {};
var voltmxUtil = require('./utils');
var cssconstants = require('./cssconstants').constants;

(function(ns) {

    //All the Constants are generated and root is created
    ns.processSkinningConstants = function(cgArgs, skinsList, skinsObj, basefont) {
        var isNewLib = cgArgs.newlib, result = {};

        try {
            toolTofwConst(skinsObj.theme_styles);
            if(isNewLib) {
                result = processConstantsToRoot(skinsObj.theme_styles, basefont);
                for(var i = 0; i < skinsList.length; i++) {
                    skin = skinsObj[skinsList[i]];
                    skinVarProcess(skin);
                }
            } else {
                result['result'] = '';
                var flatThemeConstants = {};
                for(var type in skinsObj.theme_styles) {
                    Object.assign(flatThemeConstants, skinsObj.theme_styles[type]);
                }
                processConstantValues(skinsObj.theme_styles, flatThemeConstants);
                for(var i = 0; i < skinsList.length; i++) {
                    skin = skinsObj[skinsList[i]];
                    skinVarToValueProcess(skin, flatThemeConstants);
                }
            }

        } catch(e) {
            console.error("SPADW: error in processSkinningConstants function."+e.message);
            console.error("SPADW:" + e.stack);
            result = '';
        }

        return result;
    }

    //Applying background css variable for a skin
    ns.processBackGroundConstantSkin = function(skin, styleMap, themeConstants) {
        var colorConst = skin[cssconstants.BACKGROUND_CONSTANT];
        styleMap[cssconstants.BACKGROUND_CONSTANT] = 'var(--' +colorConst+ ')';
        if(themeConstants[colorConst+'-width'] && themeConstants[colorConst+'-height']) {
            styleMap['img_constant'] = "true";
            styleMap['width'] = 'var(--' +colorConst+ '-width)';
            styleMap['height'] = 'var(--' +colorConst+ '-height)';
        }
    }

    //Applying font css variable for a skin
    ns.processFontConstantSkin = function(skin, styleMap, themeConstants) {
        var fontConst = skin[cssconstants.FONT_CONSTANT];
        if(fontConst) {
            if(themeConstants[fontConst + '-font-color']) {
                styleMap['color'] = 'var(--' +fontConst+ '-font-color)';
            }
            if(themeConstants[fontConst + '-font-weight']) {
                styleMap['font-weight'] = 'var(--' +fontConst+ '-font-weight)';
            }
            if(themeConstants[fontConst + '-font-size']) {
                styleMap['font-size'] = 'var(--' +fontConst+ '-font-size)';
            }
            if(themeConstants[fontConst + '-font-style']) {
                var fontStyle = themeConstants[fontConst + '-font-style'];
                if(fontStyle === 'normal' || fontStyle === 'italic') {
                    styleMap['styleFlag'] = "true";
                }
                styleMap['font-style'] = 'var(--' +fontConst+ '-font-style)';
            }
            if(themeConstants[fontConst + '-font-family']) {
                styleMap['font-family'] = 'var(--' +fontConst+ '-font-family)';
            }
        }
    }

    //Applying border css variable for a skin
    ns.processBorderConstantSkin = function(skin, styleMap, themeConstants) {
        var borderConst = skin[cssconstants.BORDER_CONSTANT];
        styleMap['is_border_constant'] = 'true';
        if(themeConstants[borderConst]) {
            styleMap[cssconstants.BORDER_CONSTANT] = 'var(--'+skin[cssconstants.BORDER_CONSTANT]+')';
        }
        if(themeConstants[borderConst+'-border-radius']) {
            styleMap['border_radius'] = 'var(--'+borderConst+'-border-radius)';
        }
        if(themeConstants[borderConst+'-border-bottom']) {
            styleMap['border_bottom'] = 'var(--'+borderConst+'-border-bottom)';
        }
        if(themeConstants[borderConst+'-border-top']) {
            styleMap['border_top'] = 'var(--'+borderConst+'-border-top)';
        }
        if(themeConstants[borderConst+'-border-left']) {
            styleMap['border_left'] = 'var(--'+borderConst+'-border-left)';
        }
        if(themeConstants[borderConst+'-border-right']) {
            styleMap['border_right'] = 'var(--'+borderConst+'-border-right)';
        }
        if(themeConstants[borderConst+'-border-top-left-radius']) {
            styleMap['border-top-left-radius'] = 'var(--'+borderConst+'-border-top-left-radius)';
        }
        if(themeConstants[borderConst+'-border-top-right-radius']) {
            styleMap['border-top-right-radius'] = 'var(--'+borderConst+'-border-top-right-radius)';
        }
        if(themeConstants[borderConst+'-border-bottom-left-radius']) {
            styleMap['border-bottom-left-radius'] = 'var(--'+borderConst+'-border-bottom-left-radius)';
        }
        if(themeConstants[borderConst+'-border-bottom-right-radius']) {
            styleMap['border-bottom-right-radius'] = 'var(--'+borderConst+'-border-bottom-right-radius)';
        }
    }

    //Applying shadow css variable for a skin
    ns.processShadowConstantSkin = function(skin, styleMap) {
        styleMap[cssconstants.BOX_SHADOW_CONSTANT] = 'var(--'+skin[cssconstants.BOX_SHADOW_CONSTANT]+')';
    }

    //Applying textShadow css variable for a skin
    ns.processTextShadowConstantSkin = function(skin, styleMap) {
        styleMap[cssconstants.TEXT_SHADOW_CONSTANT] = 'var(--'+skin[cssconstants.TEXT_SHADOW_CONSTANT]+')';
    }

    //Coverting tools constants to codegen constants
    function toolTofwConst(themeStyles) {
        var mappings = {
            'color': {
                'type' : cssconstants.BACKGROUND_TYPE,
                'color' : cssconstants.BACKGROUND_COLOR,
                'style': cssconstants.BACKGROUND_STYLE,
                'single': 'one',
                'twoStep': 'two',
                'multiStep': 'ms_gradient',
                'color_stops': 'cs'
            },
            'font': {
                'font_family' : cssconstants.FONT_NAME
            }
        };

        var constantsMapper = function(type, skinConstant, mappings) {
            var renameProp = null, propValue = null;

            for (var prop in skinConstant) {
                if(mappings[type] && mappings[type][prop]) {
                    renameProp = mappings[type][prop];
                    propValue = skinConstant[prop];
                    if(mappings[type][propValue]) {
                        propValue = mappings[type][propValue];
                    }
                    skinConstant[renameProp] = propValue;
                    delete skinConstant[prop];
                }
            }
        };

        var mapColorConstants = function(type, constants,mappings) {

            for(var skin in constants) {
                if (constants[skin]['type'] === 'single') {
                    constants[skin]['cst_value'] = constants[skin]['color'];
                } else if (constants[skin]['type'] === 'multiStep') {
                    var colorObj = {};
                    for(var prop in constants[skin]) {
                        if(['angle', 'color_stops', 'color'].indexOf(prop) >= 0) {
                            if(prop == 'color') {
                                colorObj['colors'] = constants[skin][prop];
                            } else if(mappings[type][prop]) {
                                colorObj[mappings[type][prop]] =  constants[skin][prop];
                            } else {
                                colorObj[prop] = constants[skin][prop];
                            }
                            delete constants[skin][prop];
                        }
                    }
                    constants[skin]['background_color'] = colorObj;
                } else if (constants[skin]['type'] === 'twoStep') {
                    constants[skin][cssconstants.BACKGROUND_GRADIENT_TOP_COLOR] = constants[skin]['color'][0];
                    constants[skin][cssconstants.BACKGROUND_GRADIENT_BOTTOM_COLOR] = constants[skin]['color'][1];
                    delete constants[skin]['color'];
                } else if(constants[skin]['type'] === 'image') {
                    constants[skin][cssconstants.BACKGROUND_IMAGE_DIMENSIONS] = {
                        'common': {
                            'height': constants[skin]['height'],
                            'width': constants[skin]['width']
                        }
                    };
                    delete constants[skin]['height'];
                    delete constants[skin]['width'];
                }
                constantsMapper(type, constants[skin], mappings);
            }
        };

        var mapFontConstants = function(type, constants, mappings) {

            for(var skin in constants) {
                if (typeof constants[skin] === 'object') {
                    constantsMapper(type, constants[skin], mappings);
                }
            }
        };

        var mapBackgroundConstants = function(type, constants, mappings) {
            for(var skin in constants) {
                if(typeof constants[skin][cssconstants.BACKGROUND_COLOR] == "object") {
                    constants[skin] = constants[skin][cssconstants.BACKGROUND_COLOR];
                }
            }
            mapColorConstants('color', constants, mappings);
        };

        for(var type in themeStyles) {
            if (type === 'color'){
                mapColorConstants(type, themeStyles[type], mappings);
            } else if(type === 'background') {
                mapBackgroundConstants(type, themeStyles[type], mappings);
            } else if(type === 'font') {
                mapFontConstants(type, themeStyles[type], mappings);
            }
        }
    }

    function processConstantsToRoot(themeConstants, basefont) {
        var conStr = ':root { \n', background = null, colors = null,
        fonts = null, textShadow = null, shadow = null, border = null,
        processThemeContants = {}, constSkins = {};

        background = themeConstants.background;
        colors = themeConstants.color;
        fonts = themeConstants.font;
        textShadow = themeConstants.text_shadow;
        shadow = themeConstants.shadow;
        border = themeConstants.border;

        //Colors processing to result
        if(colors && Object.keys(colors).length > 0) {
            for(var ckey in colors) {
                skinVarProcess(colors[ckey]);
                var pVal = processColorConstant(colors[ckey]);
                for(var subkey in pVal) {
                    if (subkey == 'color') {
                        conStr += '--'+ckey+' : \ '+ pVal[subkey] +'; \n';
                        processThemeContants[ckey] = pVal[subkey];
                    } else {
                        conStr += '--'+ckey+'-'+subkey+' : \ '+pVal[subkey]+'; \n';
                        processThemeContants[ckey + '-' + subkey] = pVal[subkey];
                    }
                }
            }
        }

        //background processing to result
        if(background && Object.keys(background).length > 0) {
            for(var bkey in background) {
                skinVarProcess(background[bkey]);
                var pVal = processColorConstant(background[bkey]);
                for(var subkey in pVal) {
                    if (subkey == 'color') {
                        conStr += '--'+bkey+' : \ '+ pVal[subkey] +'; \n';
                        processThemeContants[bkey] = pVal[subkey];
                    } else {
                        conStr += '--'+bkey+'-'+subkey+' : \ '+pVal[subkey]+'; \n';
                        processThemeContants[bkey + '-' + subkey] = pVal[subkey];
                    }
                }
            }
        }

        //Fonts processing to result
        if(fonts && Object.keys(fonts).length > 0) {
            for(var fkey in fonts) {
                skinVarProcess(fonts[fkey]);
                var pVal = processFontConstant(fonts[fkey], basefont);
                for(var subkey in pVal) {
                    conStr += '--'+fkey+'-'+subkey+' : \ '+pVal[subkey]+'; \n';
                    processThemeContants[fkey + '-' + subkey] = pVal[subkey];
                }
            }
        }

        //textShadow processing to result
        if(textShadow && Object.keys(textShadow).length > 0) {
            for(var tskey in textShadow) {
                skinVarProcess(textShadow[tskey]);
                var pVal = processShadowConstant(textShadow[tskey]);
                conStr += '--'+tskey+' : \ '+ pVal +'; \n';
                processThemeContants[tskey] = pVal;
            }
        }

        //shadow processing to result
        if(shadow && Object.keys(shadow).length > 0) {
            for(var skey in shadow) {
                skinVarProcess(shadow[skey]);
                var pVal = processShadowConstant(shadow[skey]);
                conStr += '--'+skey+' : \ '+ pVal +'; \n';
                processThemeContants[skey] = pVal;
            }
        }

        //border processing to result
        if(border && Object.keys(border).length > 0) {
            for(var bkey in border) {
                skinVarProcess(border[bkey]);
                var pVal = processBorderConstant(border[bkey]);
                for(var subkey in pVal) {
                    if (subkey == 'border') {
                        conStr += '--'+bkey+' : \ '+ pVal[subkey] +'; \n';
                        processThemeContants[bkey] = pVal[subkey];
                    } else {
                        conStr += '--'+bkey+'-'+subkey+' : \ '+pVal[subkey]+'; \n';
                        processThemeContants[bkey + '-' + subkey] = pVal[subkey];
                    }
                }
            }
        }

        conStr += '\n}';

        constSkins['result'] = conStr;
        constSkins['processThemeConstants'] = processThemeContants;

        return constSkins;
    };

    //Replacing $ with var in the skins
    function skinVarProcess(skin) {
        for(var skinprop in skin) {
            var sknVal = skin[skinprop];
            if(typeof sknVal === 'string' && sknVal.startsWith('$')) {
                skin[skinprop] = 'var(--'+ sknVal.replace('$', '')+')';
            } else if(sknVal instanceof Array) {
                for(var i = 0; i < sknVal.length; i++) {
                    if(typeof sknVal[i] === 'string' && sknVal[i].startsWith('$')) {
                        skin[skinprop][i] = 'var(--'+ sknVal[i].replace('$', '')+')';
                    }
                }
            } else if(typeof sknVal === 'object') {
                skinVarProcess(sknVal);
            }
        }
    };

    //Replacing constant with value for oldlib
    function skinVarToValueProcess(skin, flatThemeConstants) {
        var skinConstants = ['bg_constant',
        'font_constant','border_constant',
        'text_shadow_constant','shadow_constant'];

        for(var skinprop in skin) {
            var sknVal = skin[skinprop];
            if(skinConstants.indexOf(skinprop) >= 0) {
                if(skinprop == 'text_shadow_constant') {
                    var constObj = {};
                    constObj[cssconstants.TEXT_SHADOW] = flatThemeConstants[sknVal];
                    Object.assign(skin, constObj)
                } else if(skinprop == 'shadow_constant') {
                    var constObj = {};
                    constObj[cssconstants.BOX_SHADOW] = flatThemeConstants[sknVal];
                    Object.assign(skin, constObj)
                } else {
                    Object.assign(skin, flatThemeConstants[sknVal]);
                }
                delete skin[skinprop];
            }
        }
        deduceVarValue(skin, flatThemeConstants);
    };

    //Getting the value for constant
    function deduceVarValue(skin, constants) {
        for(var prop in skin) {
            var sknVal = skin[prop];
            if(typeof sknVal === 'string'
            && sknVal.startsWith('$')){
                if(constants[sknVal.replace('$', '')]['cst_value']) {
                    skin[prop] = constants[sknVal.replace('$', '')]['cst_value'];
                } else {
                    Object.assign(skin, constants[sknVal.replace('$', '')]);
                    delete skin[prop];
                }
            } else if(sknVal instanceof Array) {
                for(var i = 0; i < sknVal.length; i++) {
                    if(typeof sknVal[i] === 'string'
                    && sknVal[i].startsWith('$')) {
                        if(constants[sknVal[i].replace('$', '')]['cst_value']) {
                            skin[prop][i] = constants[sknVal[i].replace('$', '')]['cst_value'];
                        }
                    }
                }
            } else if(typeof sknVal === 'object') {
                deduceVarValue(sknVal, constants);
            }
        }
    };

    //Process nested constants
    function processConstantValues(themeConstants, flatThemeConstants) {
        for(var type in themeConstants) {
            for(var skin in themeConstants[type]) {
                deduceVarValue(themeConstants[type][skin], flatThemeConstants);
            }
        }
    };

    //process the color constant
    function processColorConstant(colorObj) {
        var type = colorObj[cssconstants.BACKGROUND_TYPE], msgString = '', resultObj = {};
        if (type === 'one') {
            msgString += voltmxUtil.processColorOnly(colorObj[cssconstants.BACKGROUND_COLOR]);
        } else if(type === 'two') {
            var topColor = voltmxUtil.processColorOnly(colorObj[cssconstants.BACKGROUND_GRADIENT_TOP_COLOR]);
            var bottomColor = voltmxUtil.processColorOnly(colorObj[cssconstants.BACKGROUND_GRADIENT_BOTTOM_COLOR]);
            var gradientStyle = colorObj[cssconstants.BACKGROUND_STYLE];
            var percentage = (gradientStyle == "vs" || gradientStyle == "hs") ? '50%' : '';
            msgString += 'linear-gradient(to ' + ['bottom', 'bottom', 'right', 'right'][["vg", "vs", "hg", "hs"].indexOf(gradientStyle)]+ ",";
            msgString += topColor+ ' '+ percentage +',' + bottomColor + ' '+ percentage + ')';
            msgString = msgString.replace(/,\s*$/, "");
        } else if(type === 'ms_gradient') {
            var colorInHex = null, colorInRGBA = null;
            var backgroundObj = colorObj[cssconstants.BACKGROUND_COLOR];
            var angle = backgroundObj['angle'];
            var colorArray = backgroundObj['colors'];
            var colorStops = backgroundObj['cs'];
            msgString = 'linear-gradient(to ' + ['top', 'right', 'bottom', 'left'][[0, 90, 180, 270].indexOf(angle)]+ ",";
            for(var i = 0; i < colorArray.length && i < colorStops.length; i++) {
                colorInHex = colorArray[i];
                colorInRGBA = voltmxUtil.processColorOnly(colorInHex);
                msgString = msgString + colorInRGBA+ ' '+ colorStops[i]+"%,";
            }
            msgString = msgString.replace(/,\s*$/, "");
            msgString = voltmxUtil.removeTrailingComma(msgString);
            msgString +=  ')';
        } else if(type === 'image') {
            msgString+= 'url(../../images/';
            msgString+= colorObj[cssconstants.BACKGROUND_IMAGE];
            msgString+= ') no-repeat';
            var dimensions = colorObj[cssconstants.BACKGROUND_IMAGE_DIMENSIONS];
            var factor = dimensions['common'];
            resultObj['width'] = factor['width'] +'px';
            resultObj['height'] = factor['height']+'px';
        } else {
            msgString += voltmxUtil.processColorOnly(colorObj[cssconstants.BACKGROUND_COLOR]);
        }
        resultObj['color'] = msgString;
        return resultObj;
    };

    //process the font constant
    function processFontConstant(fontObj, basefont) {
        var resultObj = {};
        if(fontObj[cssconstants.FONT_COLOR]) {
            resultObj['font-color'] = voltmxUtil.processColorOnly(fontObj[cssconstants.FONT_COLOR]);
        }
        if(fontObj[cssconstants.FONT_NAME]) {
            resultObj['font-family'] = fontObj[cssconstants.FONT_NAME];
        }
        if(fontObj[cssconstants.FONT_WEIGHT]) {
            resultObj['font-weight'] = fontObj[cssconstants.FONT_WEIGHT];
        }
        if(fontObj[cssconstants.FONT_STYLE]) {
            resultObj['font-style'] = fontObj[cssconstants.FONT_STYLE];
        }
        if(fontObj[cssconstants.FONT_SIZE]) {
            var fontSize = parseInt(fontObj[cssconstants.FONT_SIZE]);
            var suggestedFontSize = (fontSize * basefont) /100;
            suggestedFontSize = (Math.round(suggestedFontSize * 10)/10).toFixed(1);
            resultObj['font-size'] = suggestedFontSize + 'px';
        }
        return resultObj;
    };

    //process the shadow constant to css value
    function processShadowConstant(ShadowObj) {
        var msgString = '';
        var offsetx = ShadowObj['x'] || 0;
        msgString+= offsetx+'px ';
        var offsety = ShadowObj['y'] || 0;
        msgString+= offsety+'px ';
        var shadowblurradius = ShadowObj['br'] || 0;
        msgString+= shadowblurradius+'px ';
        var color = voltmxUtil.processColorOnly(ShadowObj['color']);
        msgString+= color;
        var inner = ShadowObj['inner'];
        if(inner) {
            msgString+= ' inset';
        }
        return msgString;
    };

    //process the border constant to css value
    function processBorderConstant(borderObj) {
        var resultObj = {};
        if(borderObj[cssconstants.BORDER_COLOR]) {
            processNormalBorder(borderObj, resultObj);
        } else {
            processSpecificBorder(borderObj, resultObj);
            processSpecificBorderStyles(borderObj, resultObj);
        }
        return resultObj;
    };

    function processNormalBorder(borderObj, resultObj) {
        var msgString='';
        var width = borderObj[cssconstants.BORDER_WIDTH]+'px ';
        msgString+= width;
        msgString+= 'solid ';
        var color = voltmxUtil.processColorOnly(borderObj[cssconstants.BORDER_COLOR]);
        msgString+= color;
        if(borderObj[cssconstants.BORDER_STYLE] == 'rc') {
            resultObj['border-radius'] = '10px';
        } else if(borderObj[cssconstants.BORDER_STYLE] == 'custom') {
            resultObj['border-radius'] = borderObj[cssconstants.BORDER_RADIUS]+'px';
        }
        resultObj['border'] = msgString;
    };

    function processSpecificBorder(borderObj, resultObj) {
        if(borderObj[cssconstants.BORDER_BOTTOM_COLOR]) {
            var bottomCss = '';
            var bottomWidth = borderObj[cssconstants.BORDER_BOTTOM_WIDTH]+'px ';
            bottomCss+= bottomWidth;
            bottomCss+= 'solid ';
            var bottomColor = voltmxUtil.processColorOnly(borderObj[cssconstants.BORDER_BOTTOM_COLOR]);
            bottomCss+= bottomColor;
            resultObj['border-bottom'] = bottomCss;
        }
        if(borderObj[cssconstants.BORDER_TOP_COLOR]) {
            var topCss = '';
            var topWidth = borderObj[cssconstants.BORDER_TOP_WIDTH]+'px ';
            topCss+= topWidth;
            topCss+= 'solid ';
            var topColor = voltmxUtil.processColorOnly(borderObj[cssconstants.BORDER_TOP_COLOR]);
            topCss+= topColor;
            resultObj['border-top'] = topCss;
        }
        if(borderObj[cssconstants.BORDER_LEFT_COLOR]) {
            var leftCss = '';
            var leftWidth = borderObj[cssconstants.BORDER_LEFT_WIDTH]+'px ';
            leftCss+= leftWidth;
            leftCss+= 'solid ';
            var leftColor = voltmxUtil.processColorOnly(borderObj[cssconstants.BORDER_LEFT_COLOR]);
            leftCss+= leftColor;
            resultObj['border-left'] = leftCss;
        }
        if(borderObj[cssconstants.BORDER_RIGHT_COLOR]) {
            var rightCss = '';
            var rightWidth = borderObj[cssconstants.BORDER_RIGHT_WIDTH]+'px ';
            rightCss+= rightWidth;
            rightCss+= 'solid ';
            var rightColor = voltmxUtil.processColorOnly(borderObj[cssconstants.BORDER_RIGHT_COLOR]);
            rightCss+= rightColor;
            resultObj['border-right'] = rightCss;
        }
    };

    function processSpecificBorderStyles(borderObj, resultObj) {
        if(borderObj[cssconstants.TOP_LEFT_BORDER_STYLE] == 'rc') {
            resultObj['border-top-left-radius'] = borderObj[cssconstants.TOP_LEFT_BORDER_RADIUS]+'px';
        }
        if(borderObj[cssconstants.TOP_RIGHT_BORDER_STYLE] == 'rc') {
            resultObj['border-top-right-radius'] = borderObj[cssconstants.TOP_RIGHT_BORDER_RADIUS]+'px';
        }
        if(borderObj[cssconstants.BOTTOM_LEFT_BORDER_STYLE] == 'rc') {
            resultObj['border-bottom-left-radius'] = borderObj[cssconstants.BOTTOM_LEFT_BORDER_RADIUS]+'px';
        }
        if(borderObj[cssconstants.BOTTOM_RIGHT_BORDER_STYLE] == 'rc') {
            resultObj['border-bottom-right-radius'] = borderObj[cssconstants.BOTTOM_RIGHT_BORDER_RADIUS]+'px';
        }
    };

})(ns)

module.exports = ns;