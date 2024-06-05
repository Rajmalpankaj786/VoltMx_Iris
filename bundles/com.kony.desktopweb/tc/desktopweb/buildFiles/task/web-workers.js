import {utils} from '../utils/utils.js';
import fs from 'fs-extra';
import { loc } from '../utils/location.js'
import path from 'path';

const populatedWebWorkers = async (prop, srcDir, destDir, libmode) => {
    //srcDir - workerthreads || destDir - webappsTempPath

    console.log('Copying of WebWorkers starts, with parameters :: libmode:"'+libmode+'" >>');

    if(typeof libmode !== 'string' || !libmode) libmode = 'css';

    var workerTempPath = await createWorkerTemp(destDir);

    if(libmode === 'css'){

        let cssPluginPath = loc.ipPluginCssLibPath(prop);
        await copyWebWorkerAssets(
                cssPluginPath,
                workerTempPath,
                cssPluginPath+'/lib');
    } else {

        let jsPluginPath = loc.ipPluginJsLibPath(prop);
        await copyWebWorkerAssets(
                jsPluginPath,
                workerTempPath,
                jsPluginPath+'/jslib');
    }

    await replaceTokensOfWorkerAssets(workerTempPath+'/voltmxworkerinit.js');

    await concatVoltmxLibraryToWorkerMin(
            destDir,
            workerTempPath);

    //FModulesConcatenation();//to check wether to do or not
    var compressFlag = true;

    if(prop.buildType === 'debug' || !prop.minifyFlag || prop.protectedModeFlag) {

        compressFlag = false;
    }

    await copyWorkerTempToWebapps(
            workerTempPath,
            destDir,
            compressFlag);

    console.log("Copying workers js to appjs folder")

    await copyWorkerThreads(
            srcDir,
            destDir,
            compressFlag);

    await deleteWorkerTemp(workerTempPath);
}

const createWorkerTemp = (destDir) => {
    return new Promise(function(resolve,reject) {
        fs.mkdir(
            path.join(destDir,'/workertemp'),
            { recursive: true },
            (err) => {
                if(err) reject();
                resolve(destDir+'/workertemp');
            }
        );
    });
}

const copyWebWorkerAssets = async (pluginPath, workerTempPath, pluginLibPath) => {
    let promises = [], promise = null;

    promise = new Promise((resolve, reject) => {
        fs.copy(
            pluginPath + '/publish/voltmxwebworkermin.js',
            workerTempPath + '/voltmxwebworkermin.js',
            async err => {
                if(err) {reject(); throw err;}
                resolve();
            }
        );
    });
    promises.push(promise);

    promise = new Promise((resolve, reject) => {

        fs.copy(
            pluginLibPath + '/voltmxworkerinit.js',
            workerTempPath + '/voltmxworkerinit.js',
            async err => {
                if(err) {reject(); throw err;}
                resolve();
            }
        );
    });

    promises.push(promise);

    return Promise.all(promises);
}

const replaceTokensOfWorkerAssets = (filePath) => {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8',
            async (err, data) => {
                if(err) {reject(); throw err;}

                    data = data.replace("PUBLISH = false",
                        ("PUBLISH = true")
                    );

                fs.writeFile(
                    filePath, data, 'utf8',
                    err => {
                        if(err) {reject(); throw err;}
                        resolve();
                    }
                );
            }
        );
    });
}

const concatVoltmxLibraryToWorkerMin = async (destDir, workerTempPath) => {
   await utils.concatData(
                    destDir+'/appjs/voltmxlibrary.js',
                    workerTempPath+'/voltmxwebworkermin.js')
}

const copyWorkerTempToWebapps = (workerTempPath, destDir, compressFlag) => {
    return new Promise((resolve, reject) => {
        fs.copy(
            workerTempPath,
            destDir,
            async err => {
                if(err) {reject(); throw err;}
                if(!compressFlag) {
                    resolve();
                } else {
                    compress(
                        (workerTempPath),
                        (destDir),
                        true
                    ).then(() => {
                        resolve();
                    }).catch(() => {
                        reject();
                    });
                }
            }
        );
    });
}

const copyWorkerThreads = (srcDir, destDir, compressFlag) => {
    return new Promise((resolve, reject) => {
        //Check if destDir requires .js includeList
        fs.copy(
            srcDir,
            destDir + '/appjs/worker',
                async err => {
                if(err) {reject(); throw err;}
                if(!compressFlag) {
                    resolve();
                } else {
                    compress(
                        (scrDir),
                        (destDir),
                        true
                    ).then(() => {
                        resolve();
                    }).catch(() => {
                        reject();
                    });
                }
            }
        );
    });
}

const deleteWorkerTemp = async (src) => {
    return new Promise((resolve,reject) => {
        fs.rm(
            src,
            { recursive: true },
            async err => {
                if(err){reject();throw err;};
                console.log('Worker Temp Deleted');
                resolve();
            }
        );
    })
}

export {populatedWebWorkers};