import { loc } from './../utils/location.js';
import { utils } from './../utils/utils.js';
import fs from 'fs-extra';


async function copyPWAFiles(props) {
    const cssmode = (props.webLibraryMode === 'css');
    if(!props.enableProgressiveWeb) {
        deleteSWRelatedFiles(loc.opWebappsPath(props)+'/temp');
    } else {
        await deleteManifestFile(loc.opWebappsPath(props)+'/temp/voltmx.manifest');
        await copyServiceWorkerFolder(loc.opWorkSpaceTempBuildPath(props)+'/wap/inputdata/webfiles/js/serviceworker', loc.opWebappsPath(props)+'/temp');
        await copyServiceWorkerFile(props.serviceWorkerFile, loc.opWebappsPath(props)+'/temp', props.serviceWorkerHelperFile, props.cacheVersion, cssmode);
        await replaceServiceWorkerExt(loc.opWebappsPath(props)+'/temp/sw-ext.js', props.cacheId, props.enablePushNotificationsDW, props.fcmSenderId);
    }
}

async function deleteManifestFile(file) {
    const fileExist =await fs.exists(file);
    if(fileExist) {
        await fs.remove(file);
    }
}

function copyServiceWorkerFolder(srcDir, destDir) {
    return copyFiles(srcDir, destDir);
}


async function copyServiceWorkerFile(src, dest, serviceWorkerHelperFile, cacheversion, cssmode) {
    let fileExist = src && await fs.exists(src), replaceTokensVal = {
        '@cssmode@': cssmode,
        '@buildtype@':'zip'
    };
    if(fileExist) {
        await utils.copyDirectory(src, dest+'/sw.js');
    } else if(await fs.exists(dest+'/sw.js')){
        replaceTokensVal['@cacheversion@'] = cacheversion;
        fileExist = await fs.exists(serviceWorkerHelperFile);
        if(fileExist) {
            replaceTokensVal['@isSWHelperAvailable@'] = true
            await utils.copyDirectory(serviceWorkerHelperFile, dest+'/sw-helper.js');
        } else {
            replaceTokensVal['@isSWHelperAvailable@'] = false
        }
        await replaceTokens(dest+'/sw.js', replaceTokensVal);
    }
}

async function replaceServiceWorkerExt(file, cacheId, enablePushNotificationsDW, fcmsenderid) {
    const replaceTokensVal = {};
    replaceTokensVal['@cacheid@'] = cacheId;
    if(enablePushNotificationsDW) {
        replaceTokensVal['@fcmsenderid@'] = fcmsenderid;
    } else {
        replaceTokensVal['@fcmsenderid@'] = '';
    }
    await replaceTokens(file, replaceTokensVal)
}

function deleteSWRelatedFiles(src) {
    deleteFile(src+'/sw.js');
    deleteFile(src+'/sw-ext.js');
    deleteFile(src+'/sw-helper.js');
}

async function deleteFile(file) {
    const fileExist =await fs.exists(file);
    if(fileExist) {
        await fs.remove(file);
    }
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

function copyFiles(src, dest) {
    return new Promise((resolve, reject) => {
        fs.stat(src, (err, stat) => {
            if(err) {resolve(); return};

            if(stat.isFile()) {
                fs.ensureFile(dest, (err) => {
                    if(err) {reject(); throw err;}
                    fs.copy(src, dest, err => {
                        if(err) {reject(); throw err;}
                        resolve();
                    });
                });
            } else if(stat.isDirectory()) {
                fs.ensureDir(dest, (err) => {
                    if(err) {reject(); throw err;}
                    fs.copy(src, dest, err => {
                        if(err) {reject(); throw err;}
                        resolve();
                    });
                });
            }
        });
    });
}

export {copyPWAFiles}