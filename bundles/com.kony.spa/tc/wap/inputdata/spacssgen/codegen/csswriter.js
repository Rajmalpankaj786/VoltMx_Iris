var path = require('path');
var fs = require('fs');
var voltmxUtil = require('./utils');

var velocitytemplatesmap = require('./velocitytemplatesmap');
var beautify_css = require('js-beautify').css;

var appSkin = require('./appskinhandler');
var focusSkin = require('./focusskinhandler');
var tcc = {};


(function(tcc) {

    tcc.generateCSSForSPA = function(cgArgs) {
        var themeName = cgArgs.themeName;
        var platform = cgArgs.platform;
        var outputdir = cgArgs.outputdir;


        if(fs.existsSync(outputdir)) {
            try {
                var themeJSONString = cgArgs.themeFile;
                var themeJSON = JSON.parse(themeJSONString);
            } catch (e) {
                console.error("SPADW: error in generateCSSForSPA method while reading themeJSON from "+themeFilePath);
                console.log(e.stack);
                return;
            }

            switch(platform) {
                case "spaip" :
                    generateIPhoneCSS(themeJSON, themeName, cgArgs);
                    break;

                case "spaan" :
                    generateAndroidCSS(themeJSON, themeName, cgArgs);
                    break;

                case "spabb" :
                    generateBBCSS(themeJSON, themeName, cgArgs);
                    break;

                case "spawinphone8":
                    generateADVIE10CSS(themeJSON, themeName, cgArgs);
                    break;

                case "spaipad":
                    generateIPadCSS(themeJSON, themeName, cgArgs);
                    break;

                case "spaandroidtablet":
                    generateAndroidTabletCSS(themeJSON, themeName, cgArgs);
                    break;

                case "spawindowstablet":
                    generateWindowsTabCSS(themeJSON, themeName, cgArgs);
                    break;

                case "desktopweb":
                    if(cgArgs.newlib == true) {
                        generateDesktopwebLibCSS(themeJSON, themeName, cgArgs);
                    } else  {
                        generateDesktopwebCommonCSS(themeJSON, themeName, cgArgs);
                    }

                    break;

                default:
                    break;
            }

        } else {
            throw new Error("SPADW: themeDir at "+ themeDir +" do not exist. CSS generation for theme "+themeName+ "is failed");
        }


    }

    //container skin from kwt0 to kwt100
    function renderCommonCSSForWidgets() {
        var widgetMarginsBuffer = new voltmxUtil.StringBuffer();
        var templateFile = velocitytemplatesmap['spa']["containerskincss"];
        var result = voltmxUtil.templaterenderer(templateFile, {});
        widgetMarginsBuffer.append(result);
        return widgetMarginsBuffer.toString();
    }



    function renderIPhoneBaseCSS() {
        try{
            var skinMap = {};
            var templateFile = velocitytemplatesmap['spaip']['iphonebasecss'];
            var result = voltmxUtil.templaterenderer(templateFile, skinMap);
            return result;
        } catch(e) {
            console.error("SPADW: error while generating base css for spa iphone. "+e.message);
            console.error("SPADW: "+ e.stack);
            return "";
        }
    }



    function generateIPhoneCSS(themeJSON, themeName, cgArgs) {
        try{
            var iphoneRetinaCSSCodeBuffer = new voltmxUtil.StringBuffer();
            var platform = cgArgs.platform;
            var formFactors = ["", "375", "414"];
            var destDir = cgArgs.outputdir;

            for(var i in formFactors) {
                var formFactor = formFactors[i];
                var iphoneCSSCodeBuffer = new voltmxUtil.StringBuffer();
                var result = "";

                result = renderCommonCSSForWidgets();
                iphoneCSSCodeBuffer.append(result);

                result = appSkin.renderApplicationSkins(themeJSON, platform, formFactor, cgArgs);

                if(result != ":::") {
                    var strArr = result.split(":::");
                    iphoneCSSCodeBuffer.append(strArr[0]);
                    if(strArr.length > 1 && strArr[1].length > 0 && (!formFactor && 0 === formFactor.length)) {
                        iphoneRetinaCSSCodeBuffer.append(strArr[1]);
                    }
                }

                result = focusSkin.renderFocusSkins(themeJSON, formFactor, platform, cgArgs);
                iphoneCSSCodeBuffer.append(result);

                result = renderIPhoneBaseCSS();
                iphoneCSSCodeBuffer.append(result);

                if(themeName != "default") {
                    destDir = cgArgs.outputdir;
                    voltmxUtil.assertDirectory(destDir, themeName);
                    destDir = path.resolve(destDir, themeName);
                }
                var cssFileName = voltmxUtil.getCSSFileName(platform, formFactor);
                var result = beautify_css(iphoneCSSCodeBuffer.toString());
                voltmxUtil.writeToFile(destDir, cssFileName, result);
                console.log("SPADW: CSS gen completed for SPA IPHONE---> For theme and formFactor: "+ themeName+ "  " + formFactor);

            }
        } catch(e) {
            console.error("SPADW: error while generating css for SPA iphone platform in generateIPhoneCSS function "+e.message);
            console.log("SPADW:" + e.stack);
        }
    }

    function renderAndroidBaseCSS() {
        try {
            var skinMap = {};
            var templateFile = velocitytemplatesmap['spaan']['andriodbasecss'];
            var result = voltmxUtil.templaterenderer(templateFile, skinMap);
            return result;
        } catch(e) {
            console.error("SPADW: error while generating base css for spa android. "+e.message);
            console.log("SPADW:" + e.stack);
            return "";
        }
    }

    function generateAndroidCSS(themeJSON, themeName, cgArgs) {
        var result = "";
        var platform = cgArgs.platform;
        var droidFormFactors = ["320","360", "400","440","480", "640", ""];
        var destDir = cgArgs.outputdir;

        try {
            for(var i = 0 ; i < droidFormFactors.length; i++) {
                var androidCSSCodeBuffer = new voltmxUtil.StringBuffer();
                var formFactor = droidFormFactors[i];
                result = renderCommonCSSForWidgets();
                androidCSSCodeBuffer.append(result);

                if(0 == formFactor.length) {

                    result = appSkin.renderApplicationSkins(themeJSON, platform, formFactor, cgArgs);
                    androidCSSCodeBuffer.append(result);

                    result = focusSkin.renderFocusSkins(themeJSON, formFactor, platform, cgArgs);
                    androidCSSCodeBuffer.append(result);

                    result = renderAndroidBaseCSS();
                    androidCSSCodeBuffer.append(result);

                } else {
                    result = appSkin.renderApplicationSkins(themeJSON, platform, formFactor, cgArgs);
                    result = result.replace(/images\//g,"images/"+formFactor+"/");
                    androidCSSCodeBuffer.append(result);

                    result = focusSkin.renderFocusSkins(themeJSON, formFactor, platform, cgArgs);
                    if(result.length > 0) {
                        result = result.replace(/images\//g,"images/"+formFactor+"/");
                        androidCSSCodeBuffer.append(result);
                    }

                    result = renderAndroidBaseCSS();
                    result = result.replace(/images\//g,"images/"+formFactor+"/");
                    androidCSSCodeBuffer.append(result);

                }

                if(themeName != "default") {
                    destDir = cgArgs.outputdir;
                    voltmxUtil.assertDirectory(destDir, themeName);
                    destDir = path.resolve(destDir, themeName);
                }
                var cssFileName = voltmxUtil.getCSSFileName(platform, formFactor);
                var result = beautify_css(androidCSSCodeBuffer.toString());
                voltmxUtil.writeToFile(destDir, cssFileName, result);
                console.log("SPADW: CSS gen completed for SPA ANDROID---> For theme and formFactor: "+ themeName+ "  " + formFactor);
            }


        } catch(e) {
            console.error("SPADW: error while generating css for SPA android platform in generateAndroidCSS function "+e.message);
            console.log(e.stack);
        }
    }

    function renderBBBaseCSS() {
        try {
            var skinMap = {};
            var templateFile = velocitytemplatesmap['spabb']['iphonebasecss'];
            var result = voltmxUtil.templaterenderer(templateFile, skinMap);
            return result;
        } catch(e) {
            console.error("SPADW: error while generating base css for spa BB. "+e.message);
            console.log(e.stack);
            return "";
        }
    }

    function generateBBCSS(themeJSON, themeName, cgArgs) {
        var result = "";
        var platform = cgArgs.platform;
        var BBFormFactors = ["320","360","400","440","480", "640", ""];
        var destDir = cgArgs.outputdir;

        try {
            for(var i = 0 ; i < BBFormFactors.length; i++) {
                var bbCSSCodeBuffer = new voltmxUtil.StringBuffer();
                var formFactor = BBFormFactors[i];
                result = renderCommonCSSForWidgets();
                bbCSSCodeBuffer.append(result);

                if(0 == formFactor.length) {
                    result = appSkin.renderApplicationSkins(themeJSON, platform, formFactor, cgArgs);
                    bbCSSCodeBuffer.append(result);

                    result = focusSkin.renderFocusSkins(themeJSON, formFactor, platform, cgArgs);
                    bbCSSCodeBuffer.append(result);

                    result = renderBBBaseCSS();
                    bbCSSCodeBuffer.append(result);

                } else {
                    result = appSkin.renderApplicationSkins(themeJSON, platform, formFactor, cgArgs);
                    result = result.replace(/images\//g,"images/"+formFactor+"/");
                    bbCSSCodeBuffer.append(result);

                    result = focusSkin.renderFocusSkins(themeJSON, formFactor, platform, cgArgs);
                    if(result.length > 0) {
                        result = result.replace(/images\//g,"images/"+formFactor+"/");
                        bbCSSCodeBuffer.append(result);
                    }

                    result = renderBBBaseCSS();
                    result = result.replace(/images\//g,"images/"+formFactor+"/");
                    bbCSSCodeBuffer.append(result);
                }

                if(themeName != "default") {
                    destDir = cgArgs.outputdir;
                    voltmxUtil.assertDirectory(destDir, themeName);
                    destDir = path.resolve(destDir, themeName);
                }
                var cssFileName = voltmxUtil.getCSSFileName(platform, formFactor);
                var result = beautify_css(bbCSSCodeBuffer.toString());
                voltmxUtil.writeToFile(destDir, cssFileName, result);
                console.log("SPADW: CSS gen completed for SPA BLACKBERRY---> For theme and formFactor: "+ themeName+ "  " + formFactor);

            }
        }catch(e) {
            console.error("SPADW: error while generating css for SPA Blackberry platform in generateBBCSS function "+e.message);
            console.log(e.stack);

        }
    }

    function renderIE10BaseCSS() {
        try {
            var skinMap = {};
            var templateFile = velocitytemplatesmap['spawinphone8']['ie10basecss'];
            var result = voltmxUtil.templaterenderer(templateFile, skinMap);
            return result;
        } catch(e) {
            console.error("SPADW: error while generating base css for spa winphone8. "+e.message);
            console.log(e.stack);
            return "";
        }
    }

    function generateADVIE10CSS(themeJSON, themeName, cgArgs) {
        var result = "";
        var platform = cgArgs.platform;
        var IEFormFactors = ["320", "480"];
        var destDir = cgArgs.outputdir;

        try {
            for(var i = 0 ; i < IEFormFactors.length; i++) {
                var ie10CSSCodeBuffer = new voltmxUtil.StringBuffer();
                var formFactor = IEFormFactors[i];

                result = renderCommonCSSForWidgets();
                ie10CSSCodeBuffer.append(result);

                result = appSkin.renderApplicationSkins(themeJSON, platform, formFactor, cgArgs);
                result = result.replace(/images\//g,"images/"+formFactor+"/");
                ie10CSSCodeBuffer.append(result);

                result = focusSkin.renderFocusSkins(themeJSON, formFactor, platform, cgArgs);
                if(result.length > 0) {
                    result = result.replace(/images\//g,"images/"+formFactor+"/");
                    ie10CSSCodeBuffer.append(result);
                }

                result = renderIE10BaseCSS();
                result = result.replace(/images\//g,"images/"+formFactor+"/");
                ie10CSSCodeBuffer.append(result);

                //writing to file
                if(themeName != "default") {
                    destDir = cgArgs.outputdir;
                    voltmxUtil.assertDirectory(destDir, themeName);
                    destDir = path.resolve(destDir, themeName);
                }
                var cssFileName = voltmxUtil.getCSSFileName(platform, formFactor);
                var result = beautify_css(ie10CSSCodeBuffer.toString());
                voltmxUtil.writeToFile(destDir, cssFileName, result);
                console.log("SPADW: CSS gen completed for SPA WINPHONE8---> For theme and formFactor: "+ themeName+ "  " + formFactor);
            }

        } catch(e) {
            console.error("SPADW: error while generating css for SPA winphone8 platform in generateADVIE10CSS function "+e.message);
            console.error(e.stack);
        }
    }

    function renderIPadBaseCSS() {
        try {
            var skinMap = {};
            var templateFile = velocitytemplatesmap['spaipad']['iphonebasecss'];
            var result = voltmxUtil.templaterenderer(templateFile, skinMap);
            return result;
        } catch(e) {
            console.error("SPADW: error while generating base css for spaipad. "+e.message);
            console.error(e.stack);
            return "";
        }
    }

    function generateIPadCSS(themeJSON, themeName, cgArgs) {
        try {
            var result = "";
            var iphoneCSSCodeBuffer = new voltmxUtil.StringBuffer();
            var iphoneRetinaCSSCodeBuffer = new voltmxUtil.StringBuffer();
            var platform = cgArgs.platform;
            var formFactor = "";
            var destDir = cgArgs.outputdir;

            result = renderCommonCSSForWidgets();
            iphoneCSSCodeBuffer.append(result);

            result = appSkin.renderApplicationSkins(themeJSON, platform, formFactor, cgArgs);

            if(result != ":::") {
                var strArr = result.split(":::");
                iphoneCSSCodeBuffer.append(strArr[0]);
                if(strArr.length > 1 && strArr[1].length > 0 && (!formFactor && 0 === formFactor.length)) {
                    iphoneRetinaCSSCodeBuffer.append(strArr[1]);
                }
            }

            result = focusSkin.renderFocusSkins(themeJSON, formFactor, platform, cgArgs);
            iphoneCSSCodeBuffer.append(result);

            result = renderIPadBaseCSS();
            iphoneCSSCodeBuffer.append(result);

            //write to file
            if(themeName != "default") {
                destDir = cgArgs.outputdir;
                voltmxUtil.assertDirectory(destDir, themeName);
                destDir = path.resolve(destDir, themeName);
            }
            var cssFileName = voltmxUtil.getCSSFileName(platform, formFactor);
            var result = beautify_css(iphoneCSSCodeBuffer.toString());
            voltmxUtil.writeToFile(destDir, cssFileName, result);

            console.log("SPADW: CSS gen completed for SPA IPAD TABLET---> For theme and formFactor: "+ themeName+ "  " + formFactor);
        } catch(e) {
            console.error("SPADW:themeName error while generating css for spaipad platform in generateIPadCSS function "+e.message);
            console.error(e.stack);
        }
    }

    function renderAndroidTabletBaseCSS() {
        try {
            var skinMap = {};
            var templateFile = velocitytemplatesmap['spaandroidtablet']['andriodbasecss'];
            var result = voltmxUtil.templaterenderer(templateFile, skinMap);
            return result;
        } catch(e) {
            console.error("SPADW: error while generating base css for spaandroidtablet. "+e.message);
            console.error(e.stack);
            return "";
        }
    }

    function generateAndroidTabletCSS(themeJSON, themeName, cgArgs) {
        var result = "";
        var platform = cgArgs.platform;
        var andVer = ["ldpi","mdpi","hdpi","xhdpi"];
        var destDir = cgArgs.outputdir;

        try {
            for(var i = 0 ; i < andVer.length; i++) {
                var androidCSSCodeBuffer = new voltmxUtil.StringBuffer();
                var formFactor = andVer[i];
                result = renderCommonCSSForWidgets();
                androidCSSCodeBuffer.append(result);

                result = appSkin.renderApplicationSkins(themeJSON, platform, formFactor, cgArgs);
                result = result.replace(/images\//g,"images/"+formFactor+"/");
                androidCSSCodeBuffer.append(result);

                result = focusSkin.renderFocusSkins(themeJSON, formFactor, platform, cgArgs);
                if(result.length > 0) {
                    result = result.replace(/images\//g,"images/"+formFactor+"/");
                    androidCSSCodeBuffer.append(result);
                }

                result = renderAndroidTabletBaseCSS();
                result = result.replace(/images\//g,"images/"+formFactor+"/");
                androidCSSCodeBuffer.append(result);

                if(themeName != "default") {
                    destDir = cgArgs.outputdir;
                    voltmxUtil.assertDirectory(destDir, themeName);
                    destDir = path.resolve(destDir, themeName);
                }
                var cssFileName = voltmxUtil.getCSSFileName(platform, formFactor);
                var result = beautify_css(androidCSSCodeBuffer.toString());
                voltmxUtil.writeToFile(destDir, cssFileName, result);
                console.log("SPADW: CSS gen completed for SPA ANDROID TABLET---> For theme and formFactor: "+ themeName+ "  " + formFactor);
            }
        } catch(e) {
            console.error("SPADW: error while generating css for spaandroidtablet platform in generateAndroidTabletCSS function "+e.message);
            console.error(e.stack);
        }
    }

    function renderWindowsTabBaseCSS() {
        try {
            var skinMap = {};
            var templateFile = velocitytemplatesmap['spawindowstablet']['ie10basecss'];
            var result = voltmxUtil.templaterenderer(templateFile, skinMap);
            return result;
        } catch(e) {
            console.error("SPADW: error while generating base css for spawindowstablet. "+e.message);
            console.error(e.stack);
            return "";
        }
    }

    function generateWindowsTabCSS(themeJSON, themeName, cgArgs) {
        var result = "";
        var platform = cgArgs.platform;
        var destDir = cgArgs.outputdir;

        try{
            var formFactor = "";
            var windowsTabCSSCodeBuffer = new voltmxUtil.StringBuffer();

            result = renderCommonCSSForWidgets();
            windowsTabCSSCodeBuffer.append(result);


            result = appSkin.renderApplicationSkins(themeJSON, platform, formFactor, cgArgs);
            windowsTabCSSCodeBuffer.append(result);

            result = focusSkin.renderFocusSkins(themeJSON, formFactor, platform, cgArgs);
            windowsTabCSSCodeBuffer.append(result);

            result = renderWindowsTabBaseCSS();
            windowsTabCSSCodeBuffer.append(result);

            if(themeName != "default") {
                destDir = cgArgs.outputdir;
                voltmxUtil.assertDirectory(destDir, themeName);
                destDir = path.resolve(destDir, themeName);
            }
            var cssFileName = voltmxUtil.getCSSFileName(platform, formFactor);
            var result = beautify_css(windowsTabCSSCodeBuffer.toString());
            voltmxUtil.writeToFile(destDir, cssFileName, result);
            console.log("SPADW: CSS gen completed for SPA WINDOWS TABLET---> For theme and formFactor: "+ themeName+ "  " + formFactor);

        } catch(e) {
            console.error("SPADW: error while generating css for spawindowstablet platform in generateWindowsTabCSS function "+e.message);
            console.error(e.stack);
        }
    }

    function renderDesktopwebCommonBaseCSS() {
        try {
            var skinMap = {};
            var templateFile = velocitytemplatesmap['desktopwebcommon']['commonbasecss'];
            var result = voltmxUtil.templaterenderer(templateFile, skinMap);
            return result;
        } catch(e) {
            console.error("SPADW: error while generating base css for desktopwebcommon. "+e.message);
            console.error(e.stack);
            return "";
        }
    }

    function generateDesktopwebCommonCSS(themeJSON, themeName, cgArgs) {
        var result = "";
        var destDir = cgArgs.outputdir;

        var platform = "desktopwebcommon";
        try {
            var formFactor = "";
            var desktopCSSCodeBuffer = new voltmxUtil.StringBuffer();

            result = renderCommonCSSForWidgets();
            desktopCSSCodeBuffer.append(result);

            result = appSkin.renderApplicationSkins(themeJSON,  platform, formFactor, cgArgs);
            desktopCSSCodeBuffer.append(result);


            result = focusSkin.renderFocusSkins(themeJSON, formFactor, platform, cgArgs);
            desktopCSSCodeBuffer.append(result);

            result = renderDesktopwebCommonBaseCSS();
            desktopCSSCodeBuffer.append(result);

            if(themeName != "default") {
                destDir = cgArgs.outputdir;
                voltmxUtil.assertDirectory(destDir, themeName);
                destDir = path.resolve(destDir, themeName);
            }
            var cssFileName = voltmxUtil.getCSSFileName(platform, formFactor);
            var result = beautify_css(desktopCSSCodeBuffer.toString());
            voltmxUtil.writeToFile(destDir, cssFileName, result);
            console.log("SPADW: CSS gen completed for DESKTOPWEB channel: ---> For theme and formFactor: "+ themeName+ "  " + formFactor);
        } catch(e) {
            console.error("SPADW: error while generating css for desktopwebcommon platform in generateDesktopwebCommonCSS function "+e.message);
            console.error(e.stack);
        }
    }

    function generateDesktopwebLibCSS(themeJSON, themeName, cgArgs) {
        var result = "";
        var destDir = cgArgs.outputdir;

        var platform = "desktopwebcommon";
        try {
            var formFactor = "";
            var desktopCSSCodeBuffer = new voltmxUtil.StringBuffer();

            result = appSkin.renderApplicationSkins(themeJSON,  platform, formFactor, cgArgs);
            desktopCSSCodeBuffer.append(result);

            destDir = cgArgs.outputdir;
            voltmxUtil.assertDirectory(destDir, 'kwebthemes');
            destDir = path.join(destDir, 'kwebthemes');
            voltmxUtil.assertDirectory(destDir, themeName);
            destDir = path.resolve(destDir, themeName);

            var cssFileName = 'theme.css';
            var result = beautify_css(desktopCSSCodeBuffer.toString());
            voltmxUtil.writeToFile(destDir, cssFileName, result);
            console.log("SPADW: CSS gen completed for DESKTOPWEB channel: ---> For theme and formFactor: "+ themeName+ "  " + formFactor);
        } catch(e) {
            console.error("SPADW: error while generating css for desktopwebcommon platform in generateDesktopwebCommonCSS function "+e.message);
            console.error(e.stack);
        }
    }

})(tcc);

module.exports = tcc;
