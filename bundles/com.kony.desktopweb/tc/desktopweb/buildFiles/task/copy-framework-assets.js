import fs from 'fs-extra';
import { loc } from '../utils/location.js';

async function copyFrameworkAssets(prop, srcDir, destDir, build, replaceTokens, automation, libmode) {
    let promises = [];

    console.log('Copying of framework assets starts, with parameters << build:"'+build+'", automation:'+automation+', libmode:"'+libmode+'" >>');
    console.time('Successfully copied framework assets in :');

    if(typeof build !== 'string' || !build) build = 'debug';
    if(typeof libmode !== 'string' || !libmode) libmode = 'css';
    if(typeof automation !== 'boolean') automation = false;
    if(typeof replaceTokens !== 'object' || !replaceTokens) replaceTokens = {};

    //Below lines are hardcoded, as nodejs build is only meant for desktopweb build
    replaceTokens.PLATFORM_BUILT = 'desktopweb';
    replaceTokens.PUBLISHED = true;

    if(build !== 'debug') { //This is for release build
        if(libmode === 'js') {
            promises.push(
                copyJsFrameworkLibForReleaseBuild(srcDir, destDir)
            );
        } else if(libmode === 'css') {
            promises.push(
                copyCssFrameworkLibForReleaseBuild(prop,srcDir, destDir, replaceTokens)
            );
        }

        promises.push(copyGoogleMapInfoBoxForReleaseBuild(srcDir, destDir));
    } else { //This is for debug build
        if(libmode === 'js') {
            promises.push(
                copyJsFrameworkLibForDebugBuild(srcDir, destDir)
            );
        } else if(libmode === 'css') {
            promises.push(
                copyCssFrameworkLibForDebugBuild(prop, srcDir, destDir, replaceTokens)
            );
        }

        if(automation === true) {
            if(libmode === 'js') {
                promises.push(
                    copyJsAutomationLibForDebugBuild(srcDir, destDir)
                );
            } else if(libmode === 'css') {
                promises.push(
                    copyCssAutomationLibForDebugBuild(srcDir, destDir)
                );
            }
        }

        promises.push(copyGoogleMapInfoBoxForDebugBuild(srcDir, destDir));
    }

    return Promise.all(promises).then(() => {
        console.timeEnd('Successfully copied framework assets in :');
    }).catch((err) => {
        console.log('Failed in copying framework assets.');
        throw err;
    });
}


async function copyCssAutomationLibForDebugBuild(srcDir, destDir) {
    let promises = [], promise = null;

    promise = new Promise((resolve, reject) => {
        fs.copy(
            (srcDir+'/lib/automation'),
            (destDir+'/lib/automation'),
            async err => {
                if(err) {reject(); throw err;}
                resolve();
            }
        );
    });
    promises.push(promise);

    promise = new Promise((resolve, reject) => {
        fs.copy(
            (srcDir+'/jslib/tparty/jasmine'),
            (destDir+'/jslib/tparty/jasmine'),
            async err => {
                if(err) {reject(); throw err;}
                resolve();
            }
        );
    });
    promises.push(promise);

    return Promise.all(promises);
}


async function copyCssFrameworkLibForDebugBuild(prop, srcDir, destDir, replaceTokens) {
    let promises = [], promise = null;

    //Copying </jslib/voltmxinit.js> to </jslib/voltmxframework.js>
    promise = new Promise((resolve, reject) => {
        fs.copy(
            (srcDir+'/jslib/voltmxinit.js'),
            (destDir+'/jslib/voltmxframework.js'),
            async err => {
                if(err) {reject(); throw err;}
                resolve();
            }
        );
    });
    promises.push(promise);

    //Copying </publish/fw.js> to </lib/fw.js>
    promise = new Promise((resolve, reject) => {
        fs.copy(
            (srcDir+'/publish/fw.js'),
            (destDir+'/lib/fw.js'),
            async err => {
                if(err) {reject(); throw err;}

                replaceTokensRelatedToFrameworkLib(
                    (destDir+'/lib/fw.js'), replaceTokens
                ).then(() => {
                    resolve();
                }).catch(() => {
                    reject();
                });
            }
        );
    });
    promises.push(promise);

    //Copying </lib/fw.css> to </lib/fw.css>
    promise = new Promise((resolve, reject) => {
        fs.copy((srcDir+'/lib/fw.css'), (destDir+'/lib/fw.css'), async err => {
            if(err) {reject(); throw err;}
            resolve();
        });
    });
    promises.push(promise);

    //Copying </lib/anim.css> to </lib/anim.css>
    promise = new Promise((resolve, reject) => {
        fs.copy((srcDir+'/lib/anim.css'), (destDir+'/lib/anim.css'), async err => {
            if(err) {reject(); throw err;}
            resolve();
        });
    });
    promises.push(promise);

    //Copying </lib/voltmxinit.js> to </lib/voltmxinit.js>
    promise = new Promise((resolve, reject) => {
        fs.copy((srcDir+'/lib/voltmxinit.js'), (destDir+'/lib/voltmxinit.js'), async err => {
            if(err) {reject(); throw err;}

            replaceTokensRelatedToFrameworkInit(
                (destDir+'/lib/voltmxinit.js'), replaceTokens
            ).then(() => {
                resolve();
            }).catch(() => {
                reject();
            });
        });
    });
    promises.push(promise);

    /* Below line is commented as voltmxcop is not implemented in CSS3.0 library
    promise = new Promise((resolve, reject) => {
        fs.readFile((src+'/lib/voltmxcop.js'), 'utf-8', async (err, data) => {
            if(err) {reject(); throw err;}

            fs.appendFile((dest+'/lib/fw.js'), data, 'utf8', async (err) => {
                if(err) {reject(); throw err;}
                resolve();
            });
        });
    });
    promises.push(promise);
    //*/

    return Promise.all(promises);
}


async function copyCssFrameworkLibForReleaseBuild(prop, srcDir, destDir, replaceTokens) {
    let promises = [], promise = null;

    promise = new Promise((resolve, reject) => {
        fs.copy((srcDir+'/publish/fw.min.js'), (destDir+'/lib/fw.js'), async err => {
            if(err) {reject(); throw err;}

            replaceTokensRelatedToFrameworkLib(
                (destDir+'/lib/fw.js'), replaceTokens
            ).then(() => {
                resolve();
            }).catch(() => {
                reject();
            });
        });
    });
    promises.push(promise);

    promise = new Promise((resolve, reject) => {
        fs.copy((srcDir+'/lib/fw.min.css'), (destDir+'/lib/fw.css'), async err => {
            if(err) {reject(); throw err;}
            resolve();
        });
    });
    promises.push(promise);

    promise = new Promise((resolve, reject) => {
        fs.copy((srcDir+'/lib/anim.css'), (destDir+'/lib/anim.css'), async err => {
            if(err) {reject(); throw err;}
            resolve();
        });
    });
    promises.push(promise);

    promise = new Promise((resolve, reject) => {
        fs.copy((srcDir+'/lib/voltmxinit.min.js'), (destDir+'/lib/voltmxinit.js'), async err => {
            if(err) {reject(); throw err;}

            replaceTokensRelatedToFrameworkInit(
                (destDir+'/lib/voltmxinit.js'), replaceTokens
            ).then(() => {
                resolve();
            }).catch(() => {
                reject();
            });
        });
    });
    promises.push(promise);

    promise = new Promise((resolve, reject) => {
        fs.copy(
            (srcDir+'/jslib/voltmxframework.js'),
            (destDir+'/jslib/voltmxframework.js'),
            async err => {
                if(err) {reject(); throw err;}
                resolve();
            }
        );
    });
    promises.push(promise);


    return Promise.all(promises);
}

async function copyGoogleMapInfoBoxForDebugBuild(srcDir, destDir) {
    return new Promise((resolve, reject) => {
        fs.copy(
            (srcDir+'/jslib/tparty/googlemaps/infobox.js'),
            (destDir+'/jslib/tparty/googlemaps/infobox.js'),
            async err => {
                if(err) {reject(); throw err;}
                resolve();
            }
        );
    });
}


async function copyGoogleMapInfoBoxForReleaseBuild(srcDir, destDir) {
    return new Promise((resolve, reject) => {
        fs.copy(
            (srcDir+'/jslib/tparty/googlemaps/infobox-min.js'),
            (destDir+'/jslib/tparty/googlemaps/infobox.js'),
            async err => {
                if(err) {reject(); throw err;}
                resolve();
            }
        );
    });
}


async function copyJsAutomationLibForDebugBuild(srcDir, destDir) {
    let promises = [], promise = null;

    promise = new Promise((resolve, reject) => {
        fs.readFile(
            (src+'/jslib/automation/voltmxautomationutils.js'),
            'utf-8', async (err, data) => {
                if(err) {reject(); throw err;}

                fs.appendFile(
                    (dest+'/jslib/voltmxframework.js'),
                    data, 'utf8', async (err) => {
                        if(err) {reject(); throw err;}
                        resolve();
                    }
                );
            }
        );
    });
    promises.push(promise);

    promise = new Promise((resolve, reject) => {
        fs.readFile(
            (src+'/jslib/automation/voltmxautomationwidgets.js'),
            'utf-8', async (err, data) => {
                if(err) {reject(); throw err;}

                fs.appendFile(
                    (dest+'/jslib/voltmxframework.js'),
                    data, 'utf8', async (err) => {
                        if(err) {reject(); throw err;}
                        resolve();
                    }
                );
            }
        );
    });
    promises.push(promise);

    promise = new Promise((resolve, reject) => {
        fs.readFile(
            (src+'/jslib/automation/voltmxautomationtouchevents.js'),
            'utf-8', async (err, data) => {
                if(err) {reject(); throw err;}

                fs.appendFile(
                    (dest+'/jslib/voltmxframework.js'),
                    data, 'utf8', async (err) => {
                        if(err) {reject(); throw err;}
                        resolve();
                    }
                );
            }
        );
    });
    promises.push(promise);

    promise = new Promise((resolve, reject) => {
        fs.readFile(
            (src+'/jslib/automation/voltmxautomationrecorder.js'),
            'utf-8', async (err, data) => {
                if(err) {reject(); throw err;}

                fs.appendFile(
                    (dest+'/jslib/voltmxframework.js'),
                    data, 'utf8', async (err) => {
                        if(err) {reject(); throw err;}
                        resolve();
                    }
                );
            }
        );
    });
    promises.push(promise);

    return Promise.all(promises);
}


async function copyJsFrameworkLibForDebugBuild(srcDir, destDir) {
    let promises = [], promise = null;

    //Copying </publish/voltmxframework.js> to </jslib/voltmxframework.js>
    promise = new Promise((resolve, reject) => {
        fs.copy(
            (srcDir+'/publish/voltmxframework.js'),
            (destDir+'/jslib/voltmxframework.js'),
            async err => {
                if(err) {reject(); throw err;}
                resolve();
            }
        );
    });
    promises.push(promise);

    promises.push(
        copyJsFrameworkWebWorkerForDebugBuild(srcDir, destDir)
    );

    //Appending content of </jslib/voltmxcop.js> to </jslib/voltmxframework.js>
    promise = new Promise((resolve, reject) => {
        fs.readFile((srcDir+'/jslib/voltmxcop.js'), 'utf-8', async (err, data) => {
            if(err) {reject(); throw err;}

            fs.appendFile(
                (destDir+'/jslib/voltmxframework.js'),
                data, 'utf8', async (err) => {
                    if(err) {reject(); throw err;}
                    resolve();
                }
            );
        });
    });
    promises.push(promise);

    return Promise.all(promises);
}


async function copyJsFrameworkLibForReleaseBuild(srcDir, destDir) {
    let promises = [], promise = null;

    promise = new Promise((resolve, reject) => {
        fs.copy(
            (srcDir+'/publish/voltmxframeworkmin.js'),
            (destDir+'/jslib/voltmxframework.js'),
            async err => {
                if(err) {reject(); throw err;}
                resolve();
            }
        );
    });
    promises.push(promise);

    promises.push(
        copyJsFrameworkWebWorkerForReleaseBuild(srcDir, destDir)
    );

    return Promise.all(promises);
}


async function copyJsFrameworkWebWorkerForDebugBuild(srcDir, destDir) {
    return new Promise((resolve, reject) => {
        fs.copy(
            (srcDir+'/jslib/voltmxworkerinit.js'),
            (destDir+'/jslib/voltmxworkerinit.js'),
            async err => {
                if(err) {reject(); throw err;}
                resolve();
            }
        );
    });
}


async function copyJsFrameworkWebWorkerForReleaseBuild(srcDir, destDir) {
    return copyJsFrameworkWebWorkerForDebugBuild(srcDir, destDir);
}


//This function takes care of voltmxinit.js and voltmxworkerinit.js files
//@param alias - will say if it is a "init" file or "workerinit" file etc.
async function replaceTokensRelatedToFrameworkInit(filePath, replaceTokens, alias) {
    if(typeof alias !== 'string') alias = 'init';

    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', async (err, data) => {
            if(err) {reject(); throw err;}

            if(alias === 'init' && replaceTokens.BUILD_MODE !== 'debug') {
                data = data.replace('BUILD = \'debug\'',
                    ('BUILD = \'' + replaceTokens.BUILD_MODE + '\'')
                );
            }

            if(alias === 'init') {
                data = data.replace('PLATFORMBUILT = \'-- platform --\'',
                    ('PLATFORMBUILT = \'' + replaceTokens.PLATFORM_BUILT + '\'')
                );
            }

            if(replaceTokens.PUBLISHED === true) {
                data = data.replace('PUBLISH = false',
                    ('PUBLISH = ' + replaceTokens.PUBLISHED)
                );
            }

            if(replaceTokens.ECMA_ENABLED) {
                data = data.replace('"@ECMAENABLE"',
                    replaceTokens.ECMA_ENABLED.toString()
                );
            }

            data = data.replace('-- UWPAPIS --',
                replaceTokens.UWP_APIS.toString()
            );

            data = data.replace('-- UWPOFFLINEAPIS --',
                replaceTokens.UWP_OFFLINE_APIS.toString()
            );

            fs.writeFile(filePath, data, 'utf8', err => {
                if(err) {reject(); throw err;}
                resolve();
            });
        });
    });
}


async function replaceTokensRelatedToFrameworkLib(filePath, replaceTokens) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', async (err, data) => {
            if(err) {reject(); throw err;}

            if(replaceTokens.PRINT_LEVEL) {
                data = data.replace('@printlevel',
                    replaceTokens.PRINT_LEVEL.toString()
                );
            }

            fs.writeFile(filePath, data, 'utf8', err => {
                if(err) {reject(); throw err;}
                resolve();
            });
        });
    });
}


export{copyFrameworkAssets};