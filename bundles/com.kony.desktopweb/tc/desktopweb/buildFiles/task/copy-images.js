import fs from 'fs-extra';
import {utils} from '../utils/utils.js';
import {loc} from '../utils/location.js';
import path from 'path';

const copyImages = async (props, srcDir, dest) => {
    let destDir = '';

    console.log('Copying of images starts');
    console.time('Successfully copied images in :');

    destDir = await createImagesFolder(dest);

    await copyIosImages(loc.ipWorkSpaceTempWapPath(props), destDir);

    copyCommonImages(srcDir, destDir);
    copyVectorImages(srcDir, destDir);

    if(props.resourceNewStructure) {
        copyImagesBasedOnNewStructure(srcDir, destDir);
    } else {
        copyImagesBasedOnOldStructure(srcDir, destDir);
    }

    copyImagesFromBuildFolder(srcDir, destDir);
    copyImagesFromDesktopwebFolder(loc.opWorkSpaceTempBuildDesktopWebPath(props), destDir);
    copySplashScreenImgInLocales(srcDir, destDir, props.splashScreenImg, props.locales);
    //copyBackgroundImages(props, srcDir, destDir); To Check

    console.timeEnd('Successfully copied images in :');
}

const createImagesFolder = async (dest) => {
    return new Promise(function(resolve,reject) {
        fs.mkdir(path.join(dest, 'images'), { recursive: true }, (err) => {
            if(err) reject();
            resolve(dest+'/images');
        });
    });
}

const copyIosImages = (srcDir, destDir) => {
    return new Promise((resolve,reject) => {
        var includeList = {
            'ext':['.png','.gif']
        }
        fs.stat(srcDir+'/inputdata/webfiles/iphone',async (err,stats) => {
            if (err) {
                console.log("No iphone Images Folder exist");
                reject();
            }
            else{
                if(stats.isDirectory()){
                    await utils.copyDirectory(srcDir+'/inputdata/webfiles/iphone', destDir, null, includeList);   
                    resolve();
                }
            }
        });
    })
}

const copyCommonImages = async (srcDir, destDir) => {
    return utils.copyFS((srcDir+'/common'), destDir, {skipEmptyDir:true});
}

const copyVectorImages = (srcDir, destDir) => {
    const includeList = {
        'ext':['.svg']
     }
    fs.stat(srcDir+'/common/web/Vector',(err,stats) => {
        if (err) console.log("No Vector Images Folder exist");
        else{
            if(stats.isDirectory()){
                utils.copyDirectory(srcDir+'/common/web/Vector', destDir, null, includeList);
            }
        }
    });
}

const copyImagesBasedOnNewStructure = async (srcDir, destDir) => {
    const promises = [];

    promises.push(utils.copyFS((srcDir+'/desktop/common'), destDir, {skipEmptyDir:true}));
    promises.push(utils.copyFS((srcDir+'/desktop/web/desktopweb'), destDir, {skipEmptyDir:true}));

    return Promise.all(promises);
}

const copyImagesBasedOnOldStructure = (srcDir, destDir) => {
    fs.stat(srcDir+'/desktop/desktopweb',(err,stats) => {
        if (err) console.log("No Desktopweb Images Folder exist");
        else{
            if(stats.isDirectory()){
                utils.copyDirectory(srcDir+'/desktop/desktopweb', destDir, null, null);
            }
        }
    });

}

const copyImagesFromBuildFolder = (srcDir, destDir) => {
    fs.stat(srcDir+'/build',(err,stats) => {
        if (err) console.log("No Build Images Folder exist");
        else{
            if(stats.isDirectory()){
                utils.copyDirectory(srcDir+'/build', destDir, null, null);
            }
        }
    });

}

const copyImagesFromDesktopwebFolder = (srcDir, destDir) => {
    utils.copyDirectory(srcDir+'/images', destDir, null, null);
}

const copySplashScreenImgInLocales = (srcDir, destDir, splashScreen, locales) => {
    if(!splashScreen) return;

    locales = locales ? locales.split(',') : [];

    for(let i=0; i < locales.length; i++) {
        fs.mkdir(destDir+'/'+ locales[i], (err) => {
            if(err) throw err;

            fs.copy(destDir+'/'+splashScreen, destDir+'/'+locales[i]+'/'+splashScreen, (err) => {
                if(err) return;
            });
            fs.lstat(srcDir+'/common/'+locales[i]+'/'+splashScreen, (err, stats) => {
                if(err) return;

                if(stats.isFile()) {
                    fs.copy(srcDir+'/common/'+locales[i]+'/'+splashScreen, destDir+'/'+locales[i]+'/'+splashScreen, (err) => {
                        if(err) return;
                    });
                }
            });
            fs.lstat(srcDir+'/desktop/common/'+locales[i]+'/'+splashScreen, (err, stats) => {
                if(err) return;

                if(stats.isFile()) {
                    fs.copy(srcDir+'/desktop/common/'+locales[i]+'/'+splashScreen, destDir+'/'+locales[i]+'/'+splashScreen, (err) => {
                        if(err) return;
                    });
                }
            });
            fs.lstat(srcDir+'/desktop/web/desktopweb/'+locales[i]+'/'+splashScreen, (err, stats) => {
                if(err) return;

                if(stats.isFile()) {
                    fs.copy(srcDir+'/desktop/web/desktopweb/'+locales[i]+'/'+splashScreen, destDir+'/'+locales[i]+'/'+splashScreen, (err) => {
                        if(err) return;
                    });
                }
            });
        });
    }
}

export{copyImages};