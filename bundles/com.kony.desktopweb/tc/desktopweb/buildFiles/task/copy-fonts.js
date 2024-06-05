import fs from 'fs-extra';
import {utils} from '../utils/utils.js';
import path from 'path';

const copyFonts = async (prop, srcDir, destDir, libmode) => {
    let promises = [];

    console.log('Copying of fonts starts, with parameters << libmode:"'+libmode +'" >>');
    console.time('Successfully copied fonts in :');

    if(typeof libmode !== 'string' || !libmode) libmode = 'css';

    promises.push(createFontFolder(destDir));

    if(libmode === 'js') {
        promises.push(copyFontsForJsLib(prop, srcDir, destDir));
    } else if(libmode === 'css') {
        promises.push(copyFontsForCssLib(prop, srcDir, destDir + '/fonts', libmode));
    }

    return Promise.all(promises).then(() => {
        console.timeEnd('Successfully copied fonts in :');
    }).catch((err) => {
        console.log('Failed in copying fonts.');
        throw err;
    });
}

const createFontFolder = async (destDir) => {
    return new Promise(function(resolve, reject) {
        fs.mkdir(path.join(destDir, 'fonts'), { recursive: true }, (err) => {
            if(err) {reject(); throw err;}
            resolve();
        });
    });
}

const copyFontsForJsLib = async (prop, srcDir, destDir) => {
    return new Promise(function(resolve, reject) {
        const includeList = {
            'ext':['.eot','.ttf','.otf']
        };

        fs.stat(srcDir, (err, stats) => {
            let promises = [], promise = null;

            if(err) {
                resolve();
            } else if(!stats.isDirectory()) {
                resolve();
            } else {
                promise = utils.copyDirectory(
                    srcDir, destDir, null, includeList
                );
                promises.push(promise);

                promise = utils.copyDirectory(
                    (srcDir + '/'+ prop.fontsFolder),
                    destDir, null, includeList
                );
                promises.push(promise);

                Promise.all(promises).then(() => {
                    resolve();
                }).catch(() => {
                    reject();
                });
            }
        });
    });
}

const copyFontsForCssLib = async (prop, srcDir, destDir) => {
    return new Promise(function(resolve, reject) {
        const includeList = {
            'ext':['.eot','.ttf','.otf']
        };

        fs.stat(srcDir, (err, stats) => {
            if(err) {
                resolve();
            } else if(!stats.isDirectory()) {
                resolve();
            } else {
                //utils.copyDirectory(srcDir, destDir, null, includeList);
                utils.copyDirectory(
                    (srcDir +'/'+ prop.fontsFolder),
                    destDir, null, includeList
                ).then(() => {
                    resolve();
                }).catch(() => {
                    reject();
                });
            }
        });
    });
}

export{copyFonts};