import { minify } from 'terser';
import CleanCSS from 'clean-css';
import fs from 'fs-extra';
import path from 'path';


async function compress(src, dest, types, recursive) {
    if(typeof dest !== 'string' || !dest) dest = src;
    if(typeof recursive !== 'boolean') recursive = false;
    if(typeof types === 'string') types = types.split(',');
    if(!(types instanceof Array)) types = [];

    return new Promise((resolve, reject) => {
        fs.stat(src, async (err, stats) => {
            let extn = '';

            if(err) {reject(); throw err;}

            if(stats.isDirectory()) {
                minifyDir(src, dest, types, recursive).then(() => {
                    resolve();
                }).catch(err => {
                    reject();
                    throw err;
                });
            } else if(stats.isFile()) {
                extn = src.split('.');
                extn = extn[extn.length-1].toLowerCase();

                if(types.length && !(types.indexOf(extn) > -1)) {
                    console.error('Invalid file extension to minify.');
                    resolve();
                } else {
                    switch(extn) {
                        case 'js':
                            await minifyJS(src, dest).then(() => {
                                console.log("Successfully minified : " + path.basename(src));
                                resolve();
                            }).catch(err => {
                                reject();
                                throw err;
                            });
                            break;
                        case 'css':
                            await minifyCSS(src, dest).then(() => {
                                console.log("Successfully minified : " + path.basename(src));
                                resolve();
                            }).catch(err => {
                                reject();
                                throw err;
                            });
                            break;
                        default:
                            console.error('Invalid file extension to minify.');
                            resolve();
                            break;
                    }
                }
            }
        });
    });
}


async function minifyCSS(src, dest) {
    return new Promise((resolve, reject) => {
        fs.readFile(src, 'utf8', async (err, data) => {
            if(err) {reject(); throw err;}

            data = new CleanCSS({}).minify(data);

            fs.writeFile(dest, data.styles, 'utf8', err => {
                if(err) {reject(); throw err;}
                resolve();
            });
        });
    });
}


async function minifyDir(src, dest, types, recursive) {
    var promises = [];

    if(typeof dest !== 'string' || !dest) dest = src;

    fs.readdir(src, async (err, items) => {
        if(err) throw err;

        items.forEach(async item => {
            let itemSrc = (src+'/'+item);
            let itemDest = (dest+'/'+item);

            let promise = new Promise((resolve, reject) => {
                fs.stat(itemSrc, async (err, stats) => {
                    let extn = '';

                    if(err) {reject(); throw err;}

                    if(recursive && stats.isDirectory()) {
                        minifyDir(itemSrc, itemDest, types, recursive).then(() => {
                            resolve();
                        }).catch(() => {
                            reject();
                        });
                    } else if(stats.isFile()) {
                        extn = item.split('.');
                        extn = extn[extn.length-1].toLowerCase();

                        if(!types.length) {
                            compress(itemSrc, itemDest).then(() => {
                                resolve();
                            }).catch(() => {
                                reject();
                            });
                        } else {
                            if(types.indexOf(extn) >= -1) {
                                compress(itemSrc, itemDest, types, recursive).then(() => {
                                    resolve();
                                }).catch(() => {
                                    reject();
                                });
                            }
                        }
                    }
                });
            });

            promises.push(promise);
        });
    });

    return Promise.all(promises);
}


async function minifyJS(src, dest) {
    return new Promise((resolve, reject) => {
        fs.readFile(src, 'utf8', async (err, data) => {
            if(err) {reject(); throw err;}

            data = await minify(data, {
                mangle: true,
                compress: true,
                format: {
                    comments: false
                }
            });

            fs.writeFile(dest, data.code, 'utf8', err => {
                if(err) {reject(); throw err;}
                resolve();
            });
        });
    });
}


export {compress};