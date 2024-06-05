import fs from 'fs-extra';
import { prepareMVCAppjs } from './prepare-mvc-appjs.js';
import { utils } from '../utils/utils.js';
import {loc} from '../utils/location.js';

async function mvcAppjs(prop, jssrcPath, webappsTempPath) {
    return new Promise(async function(resolve, reject){
        let appjsDir = loc.opDesktopWebJsOutputPath(prop) + '/appjs';

        await prepareMVCAppjs(prop, jssrcPath, appjsDir);
        await copyAppJsToWebapps(appjsDir, webappsTempPath);
        await copyVoltmxLibrary(jssrcPath + '/default', webappsTempPath);

        if(prop.enableAsyncDesktopwebFlag) {
            await loadInduvidualSpaFileListToAppJs(jssrcPath + '/require', webappsTempPath);
        }

        resolve();
    })
}

async function copyAppJsToWebapps(appjsDir, webappsTempPath) {
    return new Promise(async (resolve, reject) => {
        await utils.copyDirectory(appjsDir, webappsTempPath, null, null);
        resolve();
    });
}

async function copyVoltmxLibrary(jssrcPath, webappsTempPath) {
    return new Promise((resolve, reject) => {
        fs.copyFile(jssrcPath + '/voltmxlibrary.js', (webappsTempPath + '/voltmxlibrary.js'), (err) => {
            if (err) reject(err);
            else resolve();
        });
    });
}

async function loadInduvidualSpaFileListToAppJs(srcDir, destDir) {
    return new Promise(async (resolve, reject) => {
        var filesList = await readFile(srcDir + '/spaindividualfilelist.js');

        if(!filesList) {resolve(); return;}

        filesList = filesList.split(",");

        for(let index=0; index < filesList.length; index++) {
            await fs.copy(srcDir + '/' + filesList[index], destDir + '/' + filesList[index]);
        }
        resolve();
    });
}

function readFile(filepath) {
    return new Promise(function (resolve, reject) {
        fs.readFile(filepath, { encoding: 'utf-8' }, (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data);
            }
        });
    });
  }

export { mvcAppjs }