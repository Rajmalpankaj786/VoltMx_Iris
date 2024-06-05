import fs from 'fs-extra';
import { compress } from '../utils/minify-files.js';

async function copyThemes(srcDir, destDir, themes, shouldMinify, libmode) {
    let promises = [];

    console.log('Copying of generated themes starts, with parameters << themes:"'+themes+'", minify:'+shouldMinify+', libmode:"'+libmode+'" >>');
    console.time('Successfully copied generated themes in :');

    if(typeof themes === 'string') themes = themes.split(',');
    if(typeof shouldMinify !== 'boolean') shouldMinify = false;
    if(typeof libmode !== 'string') libmode = 'css';

    if(!(themes instanceof Array)) themes = [];

    if(libmode === 'js') {
        promises.push(
            copyThemesLibModeJS(srcDir, destDir, themes, shouldMinify)
        );
    } else if(libmode === 'css') {
        promises.push(
            copyThemesLibModeCSS(srcDir, destDir, themes, shouldMinify)
        );
    }

    return Promise.all(promises).then(() => {
        console.timeEnd('Successfully copied generated themes in :');
    }).catch((err) => {
        console.log('Failed in copying generated themes.');
        throw err;
    });
}


async function copyThemesLibModeCSS(srcDir, destDir, themes, shouldMinify) {
    var promises = [], promise = null;

    themes.forEach(async theme => {
        let asset = srcDir + '/kwebthemes/' + theme;
        let destPath = destDir + '/themes/' + theme;

        promise = new Promise((resolve, reject) => {
            fs.ensureDir(destPath, err => {
                if(err) {reject(); throw err;}

                fs.copy(asset, destPath, async err => {
                    if(err) {reject(); throw err;}

                    if(!shouldMinify) {
                        resolve();
                    } else {
                        compress(
                            destPath+'/theme.css'
                        ).then(() => {
                            resolve();
                        }).catch(() => {
                            reject();
                        });
                    }

                });
            });
        });

        promises.push(promise);

    });

    promise = new Promise((resolve, reject) => {
        fs.closeSync(
            fs.openSync(
                destDir+'/voltmxdesktop.css',
                'w'
            )
        );
        console.log("Succesfully created voltmxdesktop.css");
        resolve();
    });

    promises.push(promise);


    return Promise.all(promises);
}


async function copyThemesLibModeJS(srcDir, destDir, themes, shouldMinify) {
    var promises = [];

    themes.forEach(async theme => {
        let asset = '', dest = '', promise = null;

        if(theme === 'default') {
            asset = srcDir+'/voltmxdesktop.css';

            promise = new Promise((resolve, reject) => {
                fs.copy(asset, (destDir+'/voltmxdesktop.css'), async err => {
                    if(err) {reject(); throw err;}

                    if(!shouldMinify) {
                        resolve();
                    } else {
                        compress(
                            destDir+'/voltmxdesktop.css'
                        ).then(() => {
                            resolve();
                        }).catch(() => {
                            reject();
                        });
                    }
                });
            });
        } else {
            asset = srcDir+'/'+theme;
            dest = destDir+'/'+theme;

            promise = new Promise((resolve, reject) => {
                fs.copy(asset, dest, async err => {
                    if(err) {reject(); throw err;}

                    if(!shouldMinify) {
                        resolve();
                    } else {
                        compress(
                            dest+'/voltmxdesktop.css'
                        ).then(() => {
                            resolve();
                        }).catch(() => {
                            reject();
                        });
                    }
                });
            });
        }

        promises.push(promise);
    });

    return Promise.all(promises);
}


export {copyThemes};