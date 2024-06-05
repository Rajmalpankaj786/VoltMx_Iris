
var fs = require('fs');
var path = require('path');
var voltmxUtil = require('./utils');

var velocitytemplatesmap = require('./velocitytemplatesmap');
var constants = require('./appconstants').constants;
var beautify_css = require('js-beautify').css;

var tcc = {};


(function(tcc) {

    var librarymode, appName, buildWar;
    var indexMFMap = {};

    function generateDesktopMetaJSON(indexMap, metadata) {
        var desktopProps = {}
        var props = ['headPageFileName', 'bodyPageFileName',
            'baseTag', 'ieMetaTag', 'htmlAttrs', 'bodyAttrs'];

        for(var i = 0; i < props.length; i++) {
            desktopProps[props[i]] = indexMap[props[i]];
        }
        return desktopProps;

    }

    function generateMetaJSON(cgArgs, platform, indexMap) {
        console.log("SPADW: generating Meta json for platform: "+ platform);
        var outputdir = cgArgs.outputdir;
        outputdir = path.dirname(cgArgs.outputdir);
        var metajson = path.resolve(outputdir, "meta.json");
        var category = voltmxUtil.getFuncPreviewFolderName(platform);
        var channel = platform;
        /* This check added for changing of the platform value in 8.3 vs 8.4 versions.
           In war model platform value is "spaandroidtablet"(tools changed the value) and
           ZIP model platform value is "spatabandroid"(8.3).
        */
        if(channel == "spaandroidtablet") {
            channel = "spatabandroid";
        } else if(channel == "spawindowstablet") {
            channel = "spatabwindows";
        }
        indexMap["platform"] = channel;

        if(!fs.existsSync(metajson)) {
            voltmxUtil.writeToFile(outputdir, metajson, "");
        }

        var metadata = fs.readFileSync(metajson);
        if(metadata && metadata.length > 0) {
            metadata = JSON.parse(metadata);
            metadata[category] = indexMap;
        }
        else {
            metadata = {};
            metadata[category] = indexMap;
        }

        if(platform == "desktopweb") {
            var desktopProps = generateDesktopMetaJSON(indexMap, metadata);
            metadata["indexPage"] = desktopProps;
        }

        metadata = JSON.stringify(metadata);
        voltmxUtil.writeToFile(outputdir, metajson, metadata);
        indexMap["platform"] = platform;
        console.log("SPADW: generation of Meta json is successful for platform: "+ platform);
    }

    // Web manifest for android devices
    function createWebManifest(manifest, platform, outputdir, indexMap) {
        var manifestContent = fs.readFileSync(manifest)
        ,manifestJson = JSON.parse(manifestContent)
        ,imageLoc, icons, i, item, name;

        if(manifestJson["theme_color"] && platform == constants.DESKTOP_PLATFORM) {
            indexMap["themecolor"] = manifestJson["theme_color"];
        }

        if(manifestJson["icons"]) {
            icons = manifestJson["icons"];
            if(platform === constants.SPA_ANDROID_PLATFORM) {
                imageLoc = "320";
            }
            if(platform === constants.SPA_ANDROIDTAB_PLATFORM) {
                imageLoc = "hdpi";
            }
            for(i=0; i < icons.length; i++) {
                item = icons[i];
                name = item["src"];
                if(platform === constants.DESKTOP_PLATFORM) {
                    if(i === 0) {
                        indexMap["appleicon"] = name;
                    }
                    name = "images/"+name;
                } else {
                    name = "images/"+imageLoc+"/"+name;
                }
                delete item["src"];
                item["src"] = name;
            }
        }

        if(manifestJson["start_url"] && platform != constants.DESKTOP_PLATFORM) {
            delete manifestJson["start_url"];
        }

        //writing of webmanifest.js
        voltmxUtil.writeToFile(outputdir, "webmanifest.js", JSON.stringify(manifestJson));

    }

    //TODO: Parsing the splash screen properties.
    function parseSplashScreenProps(appJson, platform, indexMap) {
        var spalshScreenObj= null, imageheight = null, imagewidth = null;
        var color = null, splashImage = null, psImage = null;

        indexMap["category"] = voltmxUtil.getFuncPreviewFolderName(platform) + "/";
        spalshScreenObj = appJson["splashScreen"];
        if(!spalshScreenObj) {
            return;
        }

        if(["spaip", "spaan", "spabb", "spawinphone8"].indexOf(platform) != -1) {
            spalshScreenObj = spalshScreenObj["mobile"];
            color = spalshScreenObj["spa"]["backgroundColor"];
            psImage = spalshScreenObj[platform];
            splashImage = spalshScreenObj["splashImage"];
            if(psImage && psImage["splashImage"]) {
                splashImage = psImage["splashImage"];
            }
        }
        else if(["spaipad", "spaandroidtablet", "spawindowstablet"].indexOf(platform) != -1) {
            spalshScreenObj = spalshScreenObj["tablet"];
            color = spalshScreenObj["spa"]["backgroundColor"];
            psImage = spalshScreenObj[platform];
            splashImage = spalshScreenObj["splashImage"];
            if(psImage && psImage["splashImage"]) {
                splashImage = psImage["splashImage"];
            }
        }
        else if(platform == "desktopweb" || platform === "nativemac" || platform === "nativewin")  {
            spalshScreenObj = spalshScreenObj["desktop"];
            if (spalshScreenObj[platform]) {
                color = spalshScreenObj[platform]["backgroundColor"];
                psImage = spalshScreenObj[platform];
                splashImage = spalshScreenObj["splashImage"];
                if(psImage && psImage["splashImage"]) {
                    splashImage = psImage["splashImage"];
                }
                var customSplashEnabled = spalshScreenObj[platform]["isCustomSplashConfigEnabled"];
                if(customSplashEnabled) {
                    indexMap["customSplashEnabled"] = customSplashEnabled;
                }
    
                //custom splash screen
                var splashhtml = spalshScreenObj[platform]["splashHtml"];
                var splashcss = spalshScreenObj[platform]["splashCss"];
                if(splashhtml) {
                    indexMap["splashhtml"] = splashhtml;
                }
                if(splashcss) {
                    indexMap["splashcss"] = splashcss;
                }    
            }
        } 
        
        if(color) {
            color = voltmxUtil.processColorOnly(color);
            indexMap["bgcolor"] =  color;
        } else {
            indexMap["bgcolor"] =   "#ffffff";
        }
        if(splashImage) {
            indexMap["splashImage"] = splashImage;
        }


    }

    function processCustomFonts(appJson, indexMap) {

        var customFonts = appJson["customFonts"];
        var i, customFontsList = [], customFontsUrlList = [], fontPath = "";
        var font, fontsObj = {};

        if(customFonts && customFonts.length > 0) {
            customFonts = customFonts.split(",");
            for(i = 0; i < customFonts.length; i++) {
                font = customFonts[i];
                font = font.replace(".ttf", "");
                customFontsList.push(font);

                fontPath = "url('desktopweb/"+ font + ".ttf'), url('desktopweb/"+ font + ".eot')";

                customFontsUrlList.push(fontPath);
                fontsObj[font] = fontPath;
            }
        }
        indexMap['cssLazyLoad'] = true;
        indexMap['customFontsList'] = customFontsList;
        indexMap['customFontsUrlList'] = customFontsUrlList;
        indexMap['fontsObj'] = fontsObj;
    }


    function prepareStyleForDesktop(appJson, indexMap) {
        var width, option, align = "left",
            style = "width: 100%; margin: 0px; padding: 0px;";
        var bodyAttrs = "";


        //parsing the width
        if(appJson["enableResponsive"] === false) {
            width = appJson["desktopwebwidthval"];
            if(!width) {
                width = 100;
            }
            option = appJson["desktopwebwidthoption"];
            if(option === "Pixel") {
                option = "px";
            }
            else {
                option = "%";
            }
            style = "width:" + width + option + "; ";

            //Parsing the alignment
            align = appJson["desktopwebaligenmentoption"];
            if(align === "center") {
                style = style + "margin:0 auto;";
            } else if(align === "right") {
                style = style + "position : absolute; right: 0px;";
            } else {
                align = "left";
                style += "margin: 0px; padding: 0px;";
            }
        }

        indexMap["style"] = style;
        indexMap["bodyalign"] = align;
        if(appJson["enableResponsive"] === false) {

            bodyAttrs = 'style = "'+ style+'" bodyalign = "'+align+'"';
        } else  {
            bodyAttrs = 'style = "'+ style+'" ';
        }

        bodyAttrs += ' aria-busy="true" aria-live="polite" aria-relevant="additions" aria-atomic="false"';
        indexMap['bodyAttrs'] = bodyAttrs;
    }


    function PrepareLocaleArrayAsString (locales) {
        var processedLocales = "";

        if(locales && locales.length > 0) {
            processedLocales = '[\"' + locales.join('\",\"') + '\"]';
        }

        return processedLocales;
    }

    function changeImgPathToWebStructure(metatags, platform, category) {
        var imgRegex = /['|"][a-zA-Z0-9\-_]*(.png|.svg|.jpeg)+['|"]/gi;
        var imgPath = "images/";
        var results = [], i;

        results = metatags.match(imgRegex) || [];

        if([constants.SPA_ANDROID_PLATFORM, constants.SPA_BB_PLATFORM,
            constants.SPA_WINDOWS_PLATFORM, constants.SPA_WINPHONE8_PLATFORM].indexOf(platform) != -1) {
            imgPath = "images/320/";
        } else if(platform === constants.SPA_ANDROIDTAB_PLATFORM) {
            imgPath =  "images/hdpi/";
        }
        for(i = 0; i < results.length; i++) {
            metatags = metatags.replace(results[i], results[i][0] + category + imgPath + results[i].substring(1));
        }
        return metatags;
    }

    function parseNewMFIndexProps(appJson, indexMap) {
        var htmlAttrs = "";

        if(indexMap["enableProgressiveWeb"] != "true" &&
            indexMap["isDebug"] == "true") {
            if(buildWar == "false") {
                htmlAttrs = 'manifest="/apps/'+appName+'/nocache/desktopweb/voltmx.manifest"';
            } else  {
                htmlAttrs = "manifest='desktopweb/voltmx.manifest'";
            }

        }
        indexMap["htmlAttrs"] = htmlAttrs;
        var ieMetaTag = '<meta http-equiv="X-UA-Compatble" content="IE=edge">';
        indexMap["ieMetaTag"] = ieMetaTag;

        var cacheId = "@cacheid@";

        var headPageFileName = cacheId +"/desktopweb/head.html";
        var bodyPageFileName = cacheId + "/desktopweb/body.html";
        indexMap["headPageFileName"] = headPageFileName;
        indexMap["bodyPageFileName"] = bodyPageFileName;

        var targetAttr = appJson['baseTarget'] || '_blank';


        var baseTag = '<base href= "/apps/'+ appName
            +'/'+cacheId +'/" target = "'+ targetAttr +'"/>';

        var baseLocalTag = '<base href= "./" target = "'+ targetAttr +'"/>';

        indexMap["baseTag"] = baseTag;
        indexMap["baseLocalTag"] = baseLocalTag;

    }

    function handleManifestFiles(platform, indexMap, appJson, outputdir) {
        var webmanifest;
        if(platform == "spaan") {
            webmanifest = appJson["spaandroid_manifest_json"];
        }
        else if(platform == "spaandroidtablet" || platform == "spaandroidtab") {
            webmanifest = appJson["spaandroidtablet_manifest_json"];
        }

        if(webmanifest) {
            indexMap["webmanifest"] = "webmanifest";
            createWebManifest(webmanifest, platform, outputdir, indexMap);
        }

        var pwamanifest = appJson["desktopweb_desktopwebmanifestjson"];
        if(platform == "desktopweb" && pwamanifest) {
            indexMap["webmanifest"] = "webmanifest";
            createWebManifest(pwamanifest, platform, outputdir, indexMap);
        }


    }

    //Generation of index.jsp, index.html, index_min.jsp
    tcc.generateIndexForSPA = function(cgArgs) {
        var indexFileName = "index.jsp";
        var platform = cgArgs.platform;
        var outputdir = cgArgs.outputdir;
        var indexMap = {};
        var templateFile = "tpspaindexhtml.vm";
        var importjsfiles = [];
        if(platform == constants.DESKTOP_PLATFORM) {
            templateFile = "tpdesktopindexhtml.vm"
        }

        if(fs.existsSync(outputdir)) {
            try{
                var appJsonString = fs.readFileSync(cgArgs.projectProperties);
                var appJson = JSON.parse(appJsonString);
            } catch (e) {
                console.error("SPADW: Error in generateIndexForSPA method while reading application json from ");
                console.error("SPADW: " + e.stack);
                return;
            }
            librarymode = appJson["webLibraryMode"];
            appName = appJson["appidkey"];
            buildWar = appJson["buildWarCompatability"];

            indexMap["platform"] = platform;
            indexMap['indexjl'] = "js";
            indexMap['appName'] = appName;
            indexMap['buildWar'] = buildWar;

            if(platform == constants.DESKTOP_PLATFORM) {
                indexMap["librarymode"] = librarymode;
                if(librarymode == "css") {
                    templateFile = "tpdesktoplibindexhtml.vm"
                }
            }

            if((platform == "spaip" || platform == "spaipad") && appJson[constants.APPLE_ICON]) {
                indexMap["appleicon"] = appJson[constants.APPLE_ICON];
            }

            if(appJson[constants.DEVICE_MESSAGE]) {
                indexMap["devicemessage"] = appJson[constants.DEVICE_MESSAGE];
            }

            if(appJson[constants.DEVICE_EXCEPTION]) {
                indexMap["deviceexception"] = appJson[constants.DEVICE_EXCEPTION];
            }


            handleManifestFiles(platform, indexMap, appJson, outputdir);

            if(platform == "desktopweb") {
                var enablepwa = appJson[constants.DW_ENABLE_PROGRESSIVE_WEB];
                if(enablepwa) {
                    indexMap["enableProgressiveWeb"] = "true";
                }

                //push notifcations.
                var enablepush = appJson["enablePushNotificationsDW"];
                if(enablepush) {
                    indexMap["enablepush"] = "true";
                }

                if(enablepush && enablepwa) {
                    importjsfiles.push("https://www.gstatic.com/firebasejs/5.5.3/firebase-app.js");
                    importjsfiles.push("https://www.gstatic.com/firebasejs/5.5.3/firebase-messaging.js");
                }
            }
            indexMap["importjsfiles"] = importjsfiles;

            var locales = appJson[constants.LOCALES];
            locales = PrepareLocaleArrayAsString(locales);
            if(locales != null && locales != "") {
                var defaultlocale = appJson[constants.DEFAULT_LOCALE];
                indexMap["defaultLocale"] = defaultlocale;
                indexMap["default_locale"] = defaultlocale;
                indexMap["locales"] = locales;
            }

            var disableTelephoneDetection = appJson["disabletelephonedetection"];
            if(disableTelephoneDetection == "true") {
                indexMap["disabletelephonedetection"] = disableTelephoneDetection;
            }

            var disableAddressDetection = appJson["disableAddressDetection"];
            if(disableAddressDetection) {
                indexMap["disableAddressDetection"] = disableAddressDetection;
            }

            if(platform == constants.DESKTOP_PLATFORM) {
                var noscriptmessage = appJson[constants.DW_NOSCRIPT_MESSAGE];
                if(noscriptmessage && noscriptmessage.length > 0) {
                    indexMap["javascripterrormsg"] = noscriptmessage;
                }
            } else  {
                var noscriptmessage = appJson[constants.SPA_NOSCRIPT_MESSAGE];
                if(noscriptmessage && noscriptmessage.length > 0) {
                    indexMap["noscriptmessage"] = noscriptmessage;
                }
            }


            var favicon;
            if(platform == constants.DESKTOP_PLATFORM) {
                favicon = appJson[constants.DW_FAVICON_KEY];
                if(favicon) {
                    indexMap["favicon"] = favicon;
                }
            } else {
                favicon = appJson[constants.FAVICON_KEY];
                if(favicon) {
                    indexMap["favicon"] = favicon;
                }
            }

            var apptitle = "";
            if(platform == constants.DESKTOP_PLATFORM) {
                apptitle = appJson["desktopwebtitle"];
            } else {
                apptitle = appJson["apptitle"];
            }

            if(apptitle != "") {
                indexMap["apptitle"] = apptitle;
            }


            var version = appJson[constants.APP_VERSION];
            if(version != "") {
                indexMap["version"] = version;
            } else {
                indexMap["version"] = "1.00";
            }
            
            const oldPlat = platform;
            if (cgArgs.realplatform == 'nativemac' || cgArgs.realplatform == 'nativewin') {
                platform = cgArgs.realplatform;
            }
            //Parsing splash image dimensions.
            parseSplashScreenProps(appJson, platform, indexMap);
            platform = oldPlat;

            if(platform == constants.DESKTOP_PLATFORM) {
                processCustomFonts(appJson, indexMap);
                prepareStyleForDesktop(appJson, indexMap);
            }



            var enablexfs = "false";
            if(platform == constants.DESKTOP_PLATFORM) {
                enablexfs = appJson[constants.DW_ENABLE_XFS];
                indexMap["enablexfsdw"] = enablexfs; //for apps model
            } else {
                enablexfs = appJson[constants.SPA_ENABLE_XFS];
                indexMap["enablexfsspa"] = enablexfs; //for apps model
            }
            if(enablexfs) {
                indexMap["enablexfs"] = "true"; //for war model
            } else {
                indexMap["enablexfs"] = "false"; //for war model
            }


            var buildOptions = appJson["build"];
            if(buildOptions && buildOptions == "debug") {
                indexMap["isDebug"] = "false";
            }
            else {
                indexMap["isDebug"] = "true";
            }



            //parsing custom widget files
            var libraryfiles = appJson["library"];
            var tpwrapperfiles = appJson["tpwrapper"];
            var jslist = [];
            var csslist = [];

            if(libraryfiles.length > 0) {
                libraryfiles = libraryfiles.split(',')
                for (var i = 0; i < libraryfiles.length; i++) {
                    if(libraryfiles[i].indexOf(".js") > 0) {
                        jslist.push(libraryfiles[i]);
                    } else if(libraryfiles[i].indexOf(".css") > 0) {
                        csslist.push(libraryfiles[i]);
                    }
                }
            }

            if(tpwrapperfiles.length > 0) {
                tpwrapperfiles = tpwrapperfiles.split(',')
                for (var i = 0; i < tpwrapperfiles.length; i++) {
                    if(tpwrapperfiles[i].indexOf(".js") > 0) {
                        jslist.push(tpwrapperfiles[i]);
                    } else if(tpwrapperfiles[i].indexOf(".css") > 0) {
                        csslist.push(tpwrapperfiles[i]);
                    }
                }
            }
            indexMap["csslist"] = csslist;
            indexMap["jslist"] = jslist;

            var enableViewportZooming = appJson["enableViewportZooming"];
            if(enableViewportZooming == true) {
                indexMap["enableViewportZooming"] = true;
            } else {
                indexMap["enableViewportZooming"] = false;
            }

            var metatags = appJson[constants.METATAGS];
            if (metatags) {
                metatags = changeImgPathToWebStructure(metatags, platform, indexMap["category"]);
                indexMap[constants.METATAGS] = metatags;
            }

            var webAssets = {};
            if(appJson["webAssets"]) {
                if(["spaip", "spaan", "spabb", "spawinphone8"].indexOf(platform) != -1) {
                    webAssets = appJson["webAssets"]["mobile"];
                } else if(["spaipad", "spaandroidtablet", "spawindowstablet"].indexOf(platform) != -1) {
                    webAssets = appJson["webAssets"]["tablet"];
                } else if(platform == "desktopweb") {
                    webAssets = appJson["webAssets"]["desktop"];
                }

                if(webAssets && webAssets[constants.WEBCSSLIST]) {
                    indexMap[constants.WEBCSSLIST] = webAssets[constants.WEBCSSLIST];
                }

                if(webAssets && webAssets[constants.WEBJSLIST]) {
                    indexMap[constants.WEBJSLIST] = webAssets[constants.WEBJSLIST];
                }

                if(webAssets && webAssets[constants.WEBHEADERTAGS]) {
                    indexMap[constants.WEBHEADERTAGS] = webAssets[constants.WEBHEADERTAGS];
                }
            }

            if(platform == constants.DESKTOP_PLATFORM) {
                parseNewMFIndexProps(appJson, indexMap);
            }

            generateMetaJSON(cgArgs, platform, indexMap);

            //Generation of index.jsp
            indexMap["minified"] = "false";
            indexMap["jspgeneration"] = "true";
            var resultinJSP = voltmxUtil.templaterenderer(templateFile, indexMap);
            voltmxUtil.writeToFile(outputdir, "index.jsp", resultinJSP);

            //Generation of index.html
            delete indexMap["jspgeneration"];
            var resultinHTML = voltmxUtil.templaterenderer(templateFile, indexMap);
            voltmxUtil.writeToFile(outputdir, "index.html", resultinHTML);


            //Generation of index_min.jsp
            indexMap["minified"] = "true";
            indexMap["jspgeneration"] = "true";
            var result_mininJSP = voltmxUtil.templaterenderer(templateFile, indexMap);
            voltmxUtil.writeToFile(outputdir, "index_min.jsp", result_mininJSP);


            //Generation of manifest file.
            var timeStamp = new Date().getTime();
            indexMap["timestamp"] = timeStamp;

            var manifest = voltmxUtil.templaterenderer("tpspamanifestfile.vm", indexMap);
            voltmxUtil.writeToFile(outputdir, "voltmx.manifest", manifest);

            var manifest_min = voltmxUtil.templaterenderer("tpspamanifestfile_min.vm", indexMap);
            voltmxUtil.writeToFile(outputdir, "voltmx.manifest_min", manifest_min);

            templateFile = velocitytemplatesmap['spa']['minify'];
            var minifyproperties = voltmxUtil.templaterenderer(templateFile, indexMap);
            voltmxUtil.writeToFile(outputdir, "minifyfile", minifyproperties);

            //Generating of head.html and body.html for apps model.
            if(platform == constants.DESKTOP_PLATFORM) {
                delete indexMap["jspgeneration"];
                if(librarymode == "css") {

                    templateFile = 'tpdesktoplibindexheadercontent.vm';
                    var headcontent = voltmxUtil.templaterenderer(templateFile, indexMap);
                    voltmxUtil.writeToFile(outputdir, "head.html", headcontent)

                    templateFile = 'tpdesktoplibindexbodycontent.vm';
                    var bodycontent = voltmxUtil.templaterenderer(templateFile, indexMap);
                    voltmxUtil.writeToFile(outputdir, "body.html", bodycontent);

                } else  {
                    templateFile = 'tpdesktopindexheadercontent.vm';
                    var headcontent = voltmxUtil.templaterenderer(templateFile, indexMap);
                    voltmxUtil.writeToFile(outputdir, "head.html", headcontent)

                    templateFile = 'tpdesktopindexbodycontent.vm';
                    var bodycontent = voltmxUtil.templaterenderer(templateFile, indexMap);
                    voltmxUtil.writeToFile(outputdir, "body.html", bodycontent);
                }
            }

        } else {
            throw new Error("SPADW: Index.JSP Generation Failed for platform:  " + platform + " ");
        }
    }
})(tcc);

module.exports = tcc;
