var fs = require('fs');
var path = require('path');
var beautify = require('js-beautify');
var constants = require('./appconstants').constants;

var ns = {};


(function (ns) {

    ns.processColorOnly = function(skinColor) {

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

    loadtemplatefile = function(templateFile) {
        var templateFilePath = path.resolve(__dirname, '..', 'csstemplates', templateFile);
        if(fs.existsSync(templateFilePath)) {
            templateContent = fs.readFileSync(templateFilePath, {
                                          encoding: 'utf8'
                                    });
            return templateContent;
        } else {
            throw new Error("SPADW: template : " + templateFilePath + "do not exist");
        }
    }

    ns.templaterenderer= function(templateFile, map) {
        try {
            var templateContent = loadtemplatefile(templateFile);
            var engine = new Engine({
                'template' : templateContent,
                'context' : map,
                'root' : path.resolve(__dirname, '..', 'csstemplates')
            });
            var resultString = engine.render(map);
            return resultString;
        } catch(e) {
            console.log("SPADW: error in rendering template " + templateFile + ". error is: "+ e.message);
            console.error(e.stack);
            return "";
        }
    }

    ns.StringBuffer = function() {
        this.__strings__ = [];
    };

    ns.StringBuffer.prototype.append = function(str) {
        this.__strings__.push(str);
    };

    ns.StringBuffer.prototype.toString = function() {
        return this.__strings__.join("");
    };

    ns.StringBuffer.prototype.insert = function(idx, str) {
      this.__strings__.splice(idx, 0, str);
    }

    ns.isplatformspa = function(platform) {
        var platformspa = ["spaan", "spaip","spawinphone8","spaipad","spaandroidtablet",
            "spawindowstablet","spabb", "spabbnth","spawindows"];

        if(platformspa.indexOf(platform) !== -1)
            return true;

        return false;
    }

    ns.getUniqueValuesArray = function(arr) {
        var modArr = arr.filter(function(value, index, self) {
            return value != null ? self.indexOf(value) === index : false;
        });
        return modArr;
    }

    ns.collectItemsRecursivesly = function(root, imagesList) {
        var entries = ns.readdirSync(root);
        entries.map(function(f) {
            if(!ieUtils.isHiddenEntry(f)) {
                var p = path.resolve(root, f);
                var stat = fs.statSync(p);
                if (stat.isDirectory()) {
                    ns.collectItemsRecursivesly(p, imagesList);
                } else if(stat.isFile()) {
                    if(ns.isValidResource(f)) {
                        imagesList[f] = true;
                    }
                } else {
                    console.log('SPADW: Unexpected Entry: ' + p);
                }
            }
        });
    };

    ns.assertDirectory = function(root, dirstring) {
        var dirs = dirstring.split(path.sep),
            head = dirs.splice(0,1).toString();

        if(!fs.existsSync(path.resolve(root,head))) {
            fs.mkdirSync(path.resolve(root,head));
        }
        if(dirs.length !== 0)
            ns.assertDirectory(path.resolve(root,head), dirs.join(path.sep));
    };

    ns.getFuncPreviewOutputDir = function (outdir, platform, type) {
        var foldername = ns.getFuncPreviewFolderName(platform);
        var retDir = "";

        if(ns.isplatformspa(platform) || platform == 'desktopweb') {
            if(type === "index") {
                retDir = path.resolve(outdir, foldername);
                ns.assertDirectory(outdir, foldername);
            } else if(type === "theme") {
                retDir = path.resolve(outdir, foldername);
                ns.assertDirectory(outdir, foldername);
            } else if(type === "spatheme") {
                retDir = path.resolve(outdir, foldername, "themes");
                ns.assertDirectory(outdir, foldername + path.sep +"themes");
            } else if(type === "manifest") {
                retDir = path.resolve(outdir, foldername);
                ns.assertDirectory(outdir, foldername);
            }
        }

        return retDir;

    };

    ns.StringEndsWith = function(inputString,suffix) {
        return inputString.indexOf(suffix, this.length - suffix.length) !== -1;
    };


    ns.writeToFile = function(outDir, fileName, result) {
        if(ns.StringEndsWith(fileName,".jsp")) {
          fs.writeFileSync(path.resolve(outDir,fileName),result, {encoding: 'utf8'});
        } else if((ns.StringEndsWith(fileName,".js") && fileName !== "KAnnoatations.js")
            || ns.StringEndsWith(fileName,".theme") ) {
          fs.writeFileSync(path.resolve(outDir,fileName), beautify.js_beautify(result, {
                          preserve_newlines: false
                      }), {encoding: 'utf8'});
         } else {
             fs.writeFileSync(path.resolve(outDir,fileName), result, {encoding: 'utf8'});
         }
    };

    ns.getCSSFileName = function(platform, category) {
        var foldernames = {
            'spaip' : 'voltmxspaiphone',
            'spaan' : 'voltmxspaandroid',
            'spabb' : 'voltmxspabb',
            'spawinphone8' : 'voltmxspawindows',
            'spabbnth' : 'voltmxspabbnth',
            'spawindows' : 'spawindows',
            'spaipad' : 'voltmxspatabletiphone',
            'spaandroidtablet' : 'voltmxspatabletandroid',
            'spawindowstablet' : 'voltmxspawindowstablet',
            'desktopweb' : 'voltmx',
            'desktopwebcommon' : 'voltmxdesktop'
        };

        var fileName = "";
        if(category == 'webkit') {
            fileName = foldernames[platform]+'desktop.css';
        } else {
            fileName = foldernames[platform]+category+'.css';
        }
        return fileName || "";
    };

    ns.getFuncPreviewFolderName = function(platform) {
        var foldernames = {
            'spaip' : 'spaiphone',
            'spaan' : 'spaandroid',
            'spawinphone8' : 'spawinphone8',
            'spabb' : 'spablackberry',
            'spabbnth' : 'spabbnth',
            'spawindows' : 'spawindows',
            'spaipad' : 'spaipad',
            'spaandroidtablet' : 'spaandroidtablet',
            'spawindowstablet' : 'spawindowstablet',
            'desktopweb' : 'desktopweb'
        };
        return foldernames[platform];
    }

    ns.moveFile = function(source, target) {
        fs.writeFileSync(target, fs.readFileSync(source));
        fs.unlinkSync(source);
    }

    ns.removeTrailingComma = function(text)
    {
        if (text.trim().endsWith(",")) {
            var result = text.substring(0, text.lastIndexOf(","));
            return result;
        } else {
            return text;
        }
    }

    ns.getChannel = function(platform) {
        //TODO
        switch(platform) {
            case constants.SPA_DESKTOP_PLATFORM :
                return 'desktop';

            case constants.SPA_IPHONE_PLATFORM :
            case constants.SPA_ANDROID_PLATFORM :
            case constants.SPA_BB_PLATFORM :
            case constants.SPA_WINPHONE8_PLATFORM :
                return 'mobile';

            case constants.SPA_ANDROIDTAB_PLATFORM :
            case constants.SPA_IPAD_PLATFORM :
            case constants.SPA_WINDOWSTAB_PLATFORM :
                return 'tablet';
        }
    }
    ns.readdirSync = function(dirPath) {
        //TODO encoding
        return fs.readdirSync(dirPath, {});
    }

}(ns));

module.exports = ns;