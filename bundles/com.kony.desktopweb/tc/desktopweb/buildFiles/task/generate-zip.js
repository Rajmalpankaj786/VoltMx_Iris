import { loc } from './../utils/location.js';
import fs from 'fs-extra';
import * as adm from "adm-zip";

function generateZip(props) {
    return new Promise((resolve, reject) => {
        fs.ensureDir(loc.ipWorkSpaceTempWapPath(props)+'/build',async function(err) {
            if(err) reject(err);

            await clearZip(props);
            await createFolderStructure(props);
            deleteEmptyDirSync(loc.ipWorkSpaceTempWapPath(props)+'/build/'+props.appContextId);
            await createZip(props);
            await clearFolderStructure(props);

            resolve();
        });

        fs.remove(loc.opWebappsPath(props)+'/temp/WEB-INF', (err) => {
            if(err) return;
        });
    });
}

function clearZip(props) {
    return new Promise((resolve, reject) => {
        fs.remove(loc.ipWorkSpaceTempWapPath(props) + '/build/' + props.appContextId +'.zip', (err) => {
            if(err) {reject(); throw err;}
            resolve();
        });
    });
}

function createZip(props) {
    return new Promise((resolve,reject) => {
        try {
            const {default:AdmZip} = adm,
            structLocation = loc.ipWorkSpaceTempWapPath(props)+'/build/'+props.appContextId,
            zip = new AdmZip();
            zip.addLocalFolder(structLocation);
            zip.writeZip(structLocation+'.zip', loc.ipWorkSpaceTempWapPath(props)+'/build/');
        resolve();
        } catch(err) {
            reject(err);
        }
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

function createFolderStructure(props) {
    return new Promise((resolve, reject) => {
        fs.ensureDir(loc.ipWorkSpaceTempWapPath(props)+'/build/'+props.appContextId, async function(err) {
            if(err) reject(err);

            await copyToCacheId(props);
            await copyToNoCache(props);
            await copyToRoot(props);
            resolve();
        });
    });
}

function clearFolderStructure(props) {
    return new Promise((resolve, reject) => {
        fs.emptyDir(loc.ipWorkSpaceTempWapPath(props) + '/build/' + props.appContextId, (err) => {
            if(err) { console.log(err); return;}
            fs.rmdir(loc.ipWorkSpaceTempWapPath(props) + '/build/' + props.appContextId, (err) => {
                if(err) { console.log(err); return;}
                resolve();
            });
        });
    });
}

function copyToNoCache(props) {
    const webAppsLoc = loc.opWebappsPath(props),
    tempLoc = loc.ipWorkSpaceTempWapPath(props)+'/build/'+props.appContextId,
    promises = [];
    promises.push(copyFiles(webAppsLoc+'/temp/voltmx.manifest', tempLoc+'/nocache/desktopweb/voltmx.manifest'));
    promises.push(copyFiles(webAppsLoc+'/temp/sw-ext.js', tempLoc+'/nocache/sw-ext.js'));
    promises.push(copyFiles(webAppsLoc+'/temp/sw-helper.js', tempLoc+'/nocache/sw-helper.js'));
    if(fs.existsSync(loc.ipProjectLocationPath(props)+'/_nocache')) {
        promises.push(copyFiles(loc.ipProjectLocationPath(props)+'/_nocache', tempLoc+'/nocache', {pathName:['voltmx.manifest']}, null));
    }
    return Promise.all(promises);
}

function copyToCacheId(props) {
    const webAppsLoc = loc.opWebappsPath(props),
    tempLoc = loc.ipWorkSpaceTempWapPath(props)+'/build/'+props.appContextId,
    promises = [];
    promises.push(copyFiles(webAppsLoc+'/temp/desktopweb', tempLoc+'/'+ props.cacheId +'/desktopweb'));
    promises.push(copyFiles(webAppsLoc+'/version.html', tempLoc+'/'+ props.cacheId+'/version.html'));
    return Promise.all(promises);
}

function copyToRoot(props) {
    const webAppsLoc = loc.opWebappsPath(props),
    tempLoc = loc.ipWorkSpaceTempWapPath(props)+'/build/'+props.appContextId,
    promises = [];
    promises.push(copyFiles(webAppsLoc+'/temp/meta.json', tempLoc+'/meta.json'));
    promises.push(copyFiles(webAppsLoc+'/temp/sw.js', tempLoc+'/sw.js'));
    promises.push(copyFiles(webAppsLoc+'/temp/sitemap.xml', tempLoc+'/sitemap.xml'));
    promises.push(copyFiles(webAppsLoc+'/robots.txt', tempLoc+'/robots.txt'));
    return Promise.all(promises);
}

function deleteEmptyDirSync(path) {
    const items = fs.readdirSync(path);

    if(!items.length) {
        fs.removeSync(path);
    } else {
        items.forEach(item => {
            if(fs.statSync(path+'/'+item).isDirectory()) {
                deleteEmptyDirSync(path+'/'+item);
            }
        });
    }
}


export {generateZip}