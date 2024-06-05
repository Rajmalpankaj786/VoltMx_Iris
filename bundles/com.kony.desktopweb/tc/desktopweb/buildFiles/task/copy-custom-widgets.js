import fs from 'fs-extra';
import { compress } from '../utils/minify-files.js';


async function copyCustomWidgets(srcDir, destDir, shouldMinify) {
    let promises = [];

    console.log('Copying of custom widgets assets starts, with parameters << Minify:'+shouldMinify+' >>');
    console.time('Successfully copied custom widgets assets in :');

    if(typeof shouldMinify !== 'boolean') shouldMinify = false;

    promises.push(
        copyThirdPartyLibraries((srcDir+'/libraries'), (destDir+'/libraries'))
    );
    promises.push(
        copyThirdPartyWidgets((srcDir+'/widgets'), (destDir+'/widgets'), shouldMinify)
    );

    return Promise.all(promises).then(() => {
        console.timeEnd('Successfully copied custom widgets assets in :');
    }).catch((err) => {
        console.log('Failed in copying custom widgets assets.');
    });
}


async function copyThirdPartyLibraries(srcDir, destDir) {
    return new Promise((resolve, reject) => {
        fs.stat(srcDir,(err,stats) => {
            if (err) {
                console.log("No jslib/tparty libraries folder exist");
                reject();
            }
            else{
                if(stats.isDirectory()){
                    fs.copy(srcDir, destDir, err => {
                        if(err) {reject(); throw err;}
                        resolve();
                    });
                }
            }
        });
    });
}


async function copyThirdPartyWidgets(srcDir, destDir, shouldMinify) {
    return new Promise((resolve, reject) => {
        fs.stat(srcDir,(err,stats) => {
            if (err) {
                console.log("No jslib/tparty widgets folder exist");
                reject();
            }
            else{
                if(stats.isDirectory()){
                    fs.copy(srcDir, destDir, err => {
                        if(err) {reject(); throw err;}

                        if(!shouldMinify) {
                            resolve();
                        } else {

                            console.log("Minifying Custom Widgets");
                            compress(
                                (destDir),
                                (destDir),
                                ['css', 'js'], true
                            ).then(() => {
                                resolve();
                            }).catch(() => {
                                reject();
                            });
                        }
                    });
                }
            }
        });
    });
}

export {copyCustomWidgets};
