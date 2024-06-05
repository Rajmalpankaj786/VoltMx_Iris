import fs from 'fs-extra';
import {utils} from '../utils/utils.js';
import path from 'path';

const copyi18nFiles = async (srcDir, dest) => {
    console.log('Copying of i18n files starts');
    console.time('Successfully copied i18n files in :');

    return new Promise(function(resolve, reject) {
        createResourcesFolder(dest).then((destDir) => {
            copyi18NFilesFromResources(srcDir, destDir).then(() => {
                resolve();
            }).catch((err) => {
                reject(err);
            });
        }).catch((err) => {
            reject(err);
        });
    }).then(() => {
        console.timeEnd('Successfully copied i18n files in :');
    }).catch((err) => {
        console.log('Failed in copying i18n files.');
        throw err;
    });
}


const createResourcesFolder = async (dest) => {
    return new Promise(function(resolve, reject) {
        fs.mkdir(path.join(dest, 'resources/strings'), { recursive: true }, (err) => {
            if(err)  reject();
            resolve(dest+'/resources/strings');
        });
    });
}


const copyi18NFilesFromResources = async (srcDir, destDir) => {
    return new Promise(function(resolve, reject) {
        const includeList = {'ext':['.js']};

        utils.copyDirectory(
            (srcDir+'/i18n/spa'), destDir, {}, includeList
        ).then(() => {
            resolve();
        }).catch((err) => {
            reject();
        });
    });
}


export{copyi18nFiles};