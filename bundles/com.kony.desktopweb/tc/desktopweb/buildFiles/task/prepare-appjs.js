import fs from 'fs-extra';
import { utils } from '../utils/utils.js';
import { rjsTask } from '../utils/rjs.js';
import { mvcAppjs } from './mvc-app-js.js';
import { nonMvcAppjs } from './non-mvc.js';
import { compress } from '../utils/minify-files.js';

const  prepareAppJs = async (prop, jssrcPath, webappsTempPath, shouldMinify) => {
    return new Promise(async function(resolve, reject) {

        console.log("Preparing APPJS ");

        if(typeof shouldMinify !== 'boolean') shouldMinify = false;

        //await populateFileIncludeVariables(); TODO: CHECK FROM VIZ
        await cleanAppJs(jssrcPath,webappsTempPath, prop);

        await createAppJsFolder(webappsTempPath,prop);

        await populateJssrc(jssrcPath);

        await concatRequireModuleListFunction(jssrcPath);

        var fileName = 'sparequirefileslist'
        await rjsTask(jssrcPath+'/require', webappsTempPath+'/appjs', fileName);

        // replaceStringKvmodules(); //Was a fix for Functional Modules - TOCHECK:

        if(prop.mvcFlag) {
            await mvcAppjs(prop, jssrcPath, webappsTempPath+'/appjs');
        } else {
            await nonMvcAppjs(prop);
        }

        if(shouldMinify) {
            console.log("Minifying AppJs ");
            await minifyAppJs(
                webappsTempPath+'/appjs',
                ['js'],
                true
            ).then(() => {
                console.log("Successfully Minified AppJS");
            })

        }

        console.log("Succesfully Created APPJS");
        resolve();
    });
}

const cleanAppJs = async (jssrcPath,webappsTempPath) => {
    return new Promise(async function(resolve, reject) {

        fs.stat(jssrcPath+'/require', (err, stats) => {
            if(err) {
                reject();
            } else if(stats.isDirectory()) {
                utils.deleteDirectory(webappsTempPath);
                resolve();
            }
        });
    });
}

const createAppJsFolder = function(webappsTempPath, prop) {
    return new Promise(function(resolve, reject) {
        fs.mkdir(webappsTempPath+'/appjs', { recursive: true },(err) => {
            if (err) reject();
            else {
                console.log('Appjs Directory Created');
                resolve();
            }
        });
    });
}

const populateJssrc = async (jssrcPath) => {
    return new Promise(async (resolve, reject) => {
        fs.stat(jssrcPath+'/default/sparequirefileslist.js', async (err,stats) => {
            if (err) {
                console.log("sparequirefileslist.js not found in default folder");
                resolve();
            } else {
                if(stats.isFile()) {

                    const replaceTokensVal = {
                        'getSPARequireModulesList': 'spaRequireModulesList',
                        'return': 'require(',
                        ']; ': '],function(){});'
                    };

                    await replaceTokens(
                        jssrcPath+'/default/sparequirefileslist.js',
                        replaceTokensVal)
                    .then(() => {
                        resolve();
                    }).catch((err) => {
                        reject(err);
                    });

                    await utils.copyDirectory(
                        jssrcPath+'/default',
                        jssrcPath+'/require',
                        {},
                        {'pathName' : ['sparequirefileslist.js'] }
                    );
                    resolve();
                } else {
                    console.log("sparequirefileslist.js is not present in default folder");
                }
            }
        });
    });
}

const concatRequireModuleListFunction = (jssrcPath) => {
    return new Promise(async (resolve, reject) => {
        var data = "function getSPARequireModulesList(){ return ['kvmodules']; }\n"
        await fs.promises.appendFile(jssrcPath+'/startup/startup.js', data);
        resolve();
    });
}


const minifyAppJs = (webappsTempAppjsPath, type, recursive) => {
    return new Promise(async (resolve, reject) => {
        await compress(
            webappsTempAppjsPath,
            webappsTempAppjsPath,
            type,
            recursive
        );
        resolve();
    })
}

function replaceTokens(filePath, replaceTokenValues) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8',(err, data) => {
            if(err) {reject(); throw err;}

            for(let key in replaceTokenValues) {
                let keyG = new RegExp(key, 'g');
                data = data.replace(keyG, replaceTokenValues[key]);
            }

            fs.writeFile(filePath, data, 'utf8', err => {
                if(err) {reject(); throw err;}
                resolve();
            });
        });
    });
}

export{ prepareAppJs };
