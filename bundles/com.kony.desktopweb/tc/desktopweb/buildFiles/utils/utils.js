import fs from 'fs-extra';
import path from 'path';
import {globbySync} from 'globby';
import PropertiesReader from 'properties-reader';
import pkg from '@babel/core';


const {transformFileAsync} = pkg;
var utils = {};


/*
*   Check if entry in exclude list then dont copy so return false.
*
*   If no exclude list then return true.
*   If no extension or no pathname in excludeList then shud not break..
*   If extension object empty then dont return.
*/
var validateExcludeList = (entry, excludeList) => {
    if(excludeList) {
        if(excludeList.ext && excludeList.ext.length > 0 && excludeList.ext.indexOf(path.extname(entry)) > -1)
            return false;
        if(excludeList.pathName && excludeList.pathName.length > 0 && excludeList.pathName.indexOf(path.basename(entry)) > -1)
            return false;
    }
    return true;
};


/*
  Check entry in include list and matches then return true else return false

  if in include list then only that file has to be copied and rest to be ignored
  if there is no include list then return true
*/
var validateIncludeList = (entry, includeList) => {
    if(includeList) {
        if(includeList.ext && includeList.ext.length > 0 && includeList.ext.indexOf(path.extname(entry)) > -1)
            return true;
        else if(includeList.pathName && includeList.pathName.length > 0 && includeList.pathName.indexOf(path.basename(entry)) > -1)
            return true;
        else
            return false;
    }
    return true;
};


//Will be removed . Make neessary changes in other files.
utils.createDirectory = function(dir) {
    return new Promise(function(resolve, reject) {
        fs.mkdir(dir, {
                recursive: true
            },
            (err) => {
                if(err)
                    reject();
                else {
                    //console.log(dir + ' : Directory Created');
                    resolve();
                }
            });
    });
};


//Will be removed .Pranay to make neessary changes.
utils.createFile = function(filepath, fileName, content) {
    return new Promise(function(resolve, reject) {
        /*Todo: write replace function*/
        var fl = path.join(filepath, fileName);
        fs.writeFile(fl, JSON.stringify(content), 'utf8', function(err) {
            if(err) {
                reject(err)
            } else {
                console.log(fileName + ': Created successfully.');
                resolve();
            }
        });
    });
};


utils.createProjectProperties = function(filePath) {
    return new Promise(async function(resolve, reject) {
        try {
            let buildProp = PropertiesReader(filePath)._properties;
            let projProp = {
                //'voltmxwebstudioLoc' : buildProp.voltmxwebstudioLoc,
                'appContextId': buildProp["appid"],
                'appVersion':buildProp["appVersion"],
                'buildType': buildProp["build.option"],
                'cacheId': buildProp["web.cacheid"],
                'cacheVersion':buildProp["web.cacheversion"],
                'category': buildProp["category"], //To check weather all the time same in diff channel builds.
                'enableAutomation': (buildProp["enableAutomation"] === 'true'),
                'enableCodeCoverage': (buildProp["enableCodeCoverage"] === 'true'),
                'enableProgressiveWeb': (buildProp["enableProgressiveWeb"] === 'true'),
                'enableSyncFlag': (buildProp["enableasyncdesktopweb"] === 'true'),
                'enableAsyncDesktopwebFlag': (buildProp["enableasyncdesktopweb"] === 'true'),
                'enablePushNotificationsDW': (buildProp["enablePushNotificationsDW"] === 'true'),
                'es5build': (buildProp["es5build"] === 'true'),
                'fontsFolder': buildProp["desktopweb.fonts.folder"] || buildProp["nativewin.fonts.folder"] || buildProp["nativemac.fonts.folder"],
                'fcmSenderId': buildProp["fcmsenderid"],
                'locales': buildProp["locales"],
                'minifyFlag': (typeof buildProp["minify"] === 'boolean')
                         ? buildProp["minify"]
                         : (buildProp["build.option"] === 'release')
                         ? true : false,
                'mvcFlag': (buildProp["isMVC"] === 'true'),
                'pluginLoc': buildProp["desktopweb.plugin.loc"],
                'projectName': buildProp["appname"],
                'projectLoc': buildProp["project.loc"],
                'protectedModeFlag': (buildProp["protectedmodeenabled.web"] === 'true'),
                'resourceFolder': buildProp["resfolder"],
                'resourceNewStructure': (buildProp["resources.new.structure"] === 'true'),
                'splashScreenImg': buildProp['desktopwebsplash'],
                'setPrintLevel': (buildProp["setprintlevel"] === 'false'),
                'seoFlag': buildProp["enableseo"],
                'serviceWorkerHelperFile': buildProp["serviceWorkerHelperFile"],
                'themeNames': buildProp["theme.names"],
                'webAppsLoc': buildProp["webapps.loc"] + '/' + buildProp['projname'], //Webapps folder
                'webCommonsLoc': buildProp["webcommons.plugin.loc"],
                'webLibraryMode': buildProp["webLibraryMode"],
                'workSpaceLoc': buildProp["workspace.loc"],
                'workSpaceTempLoc': buildProp["appfolder"]
            };

            //default theme in themes list
            projProp.themeNames = 'default'+ (projProp.themeNames ? ','+projProp.themeNames: '');

            if(fs.existsSync(projProp['projectLoc'] + '/custombuild/spadw.properties')) {
                let spadwProps = PropertiesReader(
                    projProp['projectLoc'] + '/custombuild/spadw.properties'
                )._properties;

                if(spadwProps['minify'] === 'true') projProp.minifyFlag = true;
                else if(spadwProps['minify'] === 'false') projProp.minifyFlag = false;

            }
            //Write clearProjProp function
            //Make necessary changes wrt to createFile();
            await utils.createFile(
                (projProp.pluginLoc + '/tc/desktopweb/buildFiles/input'),
                'projectproperties.json', projProp
            );
            resolve(projProp);
        } catch (err) {
            reject(err);
        }
    });
};


//Will be removed . Make neessary changes in other files.
utils.deleteDirectory = function(folderpath) {
    var deleteDirectoryRecursive = function(folderpath) {
        if(fs.existsSync(folderpath)) {
            fs.readdirSync(folderpath).forEach(function(file, index) {
                var curPath = path.resolve(folderpath, file);
                if(fs.lstatSync(curPath).isDirectory()) { // recurse
                    deleteDirectoryRecursive(curPath);
                } else { // delete file
                    fs.removeSync(curPath);
                }
            });
            fs.rmdirSync(folderpath);
        }
    };
    deleteDirectoryRecursive(folderpath);
};


//Will be removed . Make neessary changes in other files.
utils.isDir = function(dirPath) {
    if(dirPath && fs.existsSync(dirPath)) {
        var stat = fs.lstatSync(dirPath);
        return (stat.isDirectory());
    } else {
        //console.log('Directory is not present :' + path.basename(dirPath));
        return false;
    }
};


var assertDirectory = (dirPath, flag) => {
    if(utils.isDir(dirPath)) {
        return true;
    } else {
        if(flag) {
            throw (new Error('Should have existed: ' + dirPath));
        } else {
            utils.createDirectory(dirPath); //Only called here inside assert
            return true;
        }
    }
};


/*
*   Util to Copy a Directory from src to dest
*   includeList/excludeList = {
*       'ext':[<List of extensions to include/exclude>]
*       'pathName':[<List of files to include/exclude>]
*   }
*/
utils.copyDirectory = (srcDir, destDir, excludeList, includeList, fileConflictCallback) => {
    return new Promise(function(resolve, reject) {

        var fileConflictCallback = (err) => {
            if (err) {
              console.log("Error Found:", err);
            }
          }
          if(srcDir && destDir) {

            //assertDirectory (destDir, false); //As dest can be created  so added flag in assert to create dir.

            if(assertDirectory(srcDir, true)) {
              var entries = fs.readdirSync(srcDir);
              entries.forEach(function(entry) {

                var srcItem = path.resolve(srcDir, entry);
                var destItem = path.resolve(destDir, entry);

                if (fs.statSync(srcItem).isFile()) {
                  if(validateExcludeList(entry, excludeList) && validateIncludeList(entry, includeList) ) {
                    fs.copyFile(srcItem, destItem, fileConflictCallback);
                  }
                } else if(validateExcludeList(entry, excludeList)) {
                    utils.copyDirectory(srcItem, destItem, excludeList, includeList, fileConflictCallback);
                }
                });

                resolve();
            } else {
                reject();
            }
        }
    });
};


//Though it returns a Promise, internally it is all sync under the hood
utils.copyFS = (srcDir, destDir, filter, config) => {
    var paths = null, promises = [];

    //STARTS:: Normalization
    if(!(config && typeof config === 'object')) config = {};

    if(filter && typeof filter === 'object') {
        config = filter;
    }

    if(typeof filter !== 'function') {
        filter = () => {return true;};
    }

    if(config.skipEmptyDir !== true) config.skipEmptyDir = false;
    if(typeof config.allowRegExp !== 'string') config.allowRegExp = '';
    if(typeof config.skipRegExp !== 'string') config.skipRegExp = '';
    if(typeof config.allowExtensions !== 'string') config.allowExtensions = '';
    if(typeof config.skipExtensions !== 'string') config.skipExtensions = '';
    if(typeof config.globbyPattern !== 'string') config.globbyPattern = '';
    if(!(config.globbyOptions && typeof config.globbyOptions === 'object')) {
        config.globbyOptions = {};
    }

    config.skipExtensions = config.skipExtensions.toLowerCase();
    config.allowExtensions = config.allowExtensions.toLowerCase();
    //ENDS:: Normalization

    if(config.globbyPattern) {
        //To use this feature/option You must know globby pattern
        config.globbyOptions.cwd = srcDir;
        paths = globbySync(config.globbyPattern, config.globbyOptions);

        paths.forEach((srcPath) => {
            promises.push(new Promise((resolve, reject) => {
                try {
                    fs.copySync(srcPath, destDir, {
                        filter: (item) => {
                            let skip = false, contents = null,
                                stat = fs.statSync(item);

                            if(stat.isDirectory()) {
                                if(config.skipEmptyDir) {
                                    contents = fs.readdirSync(item);
                                    if(!contents.length) skip = true;
                                }
                            }

                            if(!skip) {
                                skip = !(filter(item, stat) === true);
                            }

                            return !skip;
                        }
                    });

                    resolve();
                } catch(err) {
                    reject(err);
                }
            }));
        });

        return Promise.all(promises);
    } else {
        return new Promise((resolve, reject) => {
            try {
                fs.copySync(srcDir, destDir, {
                    filter: (item) => {
                        let skip = false, contents = null, extn = '',
                            extns = null, stat = fs.statSync(item);

                        //First, skip by regexp pattern
                        if(config.allowRegExp && !config.skipRegExp) {
                            if(!(new RegExp(config.allowRegExp/*, 'g'*/).test(item))) {
                                skip = true;
                            }
                        } else if(config.skipRegExp && !config.allowRegExp) {
                            if(new RegExp(config.skipRegExp/*, 'g'*/).test(item)) {
                                skip = true;
                            }
                        }

                        //Second, if not skipped by regexp pattern
                        if(!skip && stat.isDirectory()) {
                            if(config.skipEmptyDir) {
                                contents = fs.readdirSync(item);
                                if(!contents.length) skip = true;
                            }
                        } else if(!skip && stat.isFile()) {
                            extn = path.extname(item).toLowerCase();
                            extn = extn.substring(1, extn.length);

                            if((config.allowExtensions || config.skipExtensions)
                            && !config.allowRegExp && !config.skipRegExp) {
                                if(config.allowExtensions
                                && !config.skipExtensions) {
                                    extns = config.allowExtensions.split(',');
                                    if(extns.indexOf(extn) === -1) skip = true;
                                } else if(config.skipExtensions
                                && !config.allowExtensions) {
                                    extns = config.skipExtensions.split(',');
                                    if(extns.indexOf(extn) >= 0) skip = true;
                                }
                            }
                        }

                        if(!skip) {
                            skip = !(filter(item, stat) === true);
                        }

                        return !skip;
                    }
                });

                resolve();
            } catch(err) {
                reject(err);
            }
        });
    }
};


//Will be removed . Make neessary changes in other files.
utils.isFile = function(filePath) {
    return new Promise(function(resolve, reject) {
        fs.stat(filePath, async (err, stats) => {
            if(stats.isFile()) {
                console.log('File is being validated :' + filePath);
                resolve(true);
            } else {
                reject(err);
            }
        });
    });
};


utils.getProperty = function(path) {
    return new Promise(function(resolve, reject) {
        fs.readFile(path, {
            encoding: 'utf-8'
        }, (err, data) => {
            if(err) {
                reject(err)
            } else {
                resolve(JSON.parse(data));
            }
        });
    });
};


utils.getArgVal = function(key, prefix, postfix) {
    var a = 0,
        value = '';

    if(typeof prefix !== 'string') prefix = '';
    if(typeof postfix !== 'string') postfix = '';

    if(typeof key === 'number') {
        prefix = postfix = '';
    } else {
        if(!prefix) prefix = '--';
        if(!postfix) postfix = '=';
    }

    if(!prefix && !postfix && typeof key === 'number') {
        value = process.argv[key + 1];
    } else {
        for(a = 2; a < process.argv.length; a++) {
            if(process.argv[a].indexOf(prefix + key + postfix) === 0) {
                value = process.argv[a].replace((prefix + key + postfix), '');
                break;
            }
        }
    }
    return value;
};


//Will be removed . Make neessary changes in other files.
utils.replaceFileContent = function(filePath, fileName, token, replaceToken) {
    return new Promise(function(resolve, reject) {
        var formattedText = ''; //use typeof
        if(utils.isFile(filePath + fileName) && (token instanceof Array ||
                token instanceof String) && (replaceToken instanceof Array ||
                replaceToken instanceof String)) {
            fs.readFile(filePath + fileName, {
                encoding: 'utf-8'
            }, (err, data) => {
                if(err) {
                    reject(err);
                } else {
                    formattedText = data;
                    console.log('TEXT IS' + data);
                    if(token instanceof Array) {
                        let index = 0;
                        token.forEach(element => {
                            formattedText = formattedText.replace(element, replaceToken[index++]);
                        });
                        console.log('FORMATTED TEXT IS ' + formattedText)
                    } else {
                        formattedText = data.replace(token, replaceToken);
                        console.log('FORMATTED TEXT IS ' + formattedText)
                    }

                    fs.writeFile(filePath + fileName, formattedText, 'utf8', function(err) {
                        if(err) return console.log(err);
                    });
                    console.log('Replace Successful');
                    resolve(data);
                }

            });
        }
    });
};


utils.concatData = (src, dest, excludeList, includeList) => {
    return new Promise(async function(resolve, reject) {
        if(fs.existsSync(dest) && fs.lstatSync(dest).isDirectory()) {
            reject("Concatination Destination should be a file");
        } else if(!(src && dest)) {
            reject("Provide Src and Desination");
        } else {
            if(fs.existsSync(dest) && fs.lstatSync(dest).isFile() && !fs.lstatSync(src).isDirectory()) {
                var data = fs.readFileSync(src, 'utf-8');
                fs.appendFileSync(dest, data);
            } else {
                var entries = fs.readdirSync(src).sort();

                entries.forEach(async (entry) => {
                    var srcItem = path.resolve(src, entry);
                    var destItem = path.resolve(dest);
                    if(fs.statSync(srcItem).isFile()) {
                        if(validateExcludeList(entry, excludeList)
                        && validateIncludeList(entry, includeList)) {
                            var data = fs.readFileSync(srcItem, 'utf-8');
                            fs.appendFileSync(destItem, data + '\n');
                        }
                    } else if(validateExcludeList(entry, excludeList)) {
                        await utils.concatData(srcItem, destItem, excludeList, includeList);
                    }
                });
            }

            resolve();
        }
    });
}

//Will be removed . Pranay to make neessary changes.
utils.readFile = function(filepath) {
    return new Promise(function(resolve, reject) {
        fs.readFile(filepath, {
            encoding: 'utf-8'
        }, (err, data) => {
            if(err) {
                reject(err)
            } else {
                resolve(data);
            }
        });
    });
};


utils.convertFile = function(src, dest, options) {
    return new Promise(function(resolve, reject) {
        transformFileAsync(src, options).then(result => {
            fs.writeFile(dest, result.code, 'utf8').then(function(err) {
                if(err) {
                    reject();
                } else {
                    resolve();
                }
            });
        });
    });
};


export {utils};