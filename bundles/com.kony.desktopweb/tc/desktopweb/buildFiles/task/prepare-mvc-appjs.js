import  fs from 'fs-extra';
import {utils} from '../utils/utils.js';
import path from 'path'
import {loc} from '../utils/location.js'

async function prepareMVCAppjs(prop, jssrcPath, appjsDir) {
    return new Promise(async (resolve, reject) => {

        console.log("Preparing app.js ");

        const excludes =  { 'pathName':["appmodel.js","sparequirefileslist.js","spaindividualfilelist.js"]};
        const fromFolder = ["startup","default"];

        let appjsPath = appjsDir + '/app.js';

        await deleteAppJS(appjsPath)
        await createFile(appjsDir, 'app.js', "");
        await concatSyncAsyncFilesToAppJs(prop, appjsPath);

        await concatJSSrcToAppJS(jssrcPath, fromFolder, excludes, appjsPath);

        console.log("Succesfully generated app.js");

        resolve();
    });
}

async function deleteAppJS(srcFile) {
    return new Promise(async (resolve, reject) => {
        await fs.remove(srcFile);
        resolve();
    });
}

function createFile(filepath, fileName, content) {
    return new Promise(function(resolve, reject) {
        var fl = path.join(filepath, fileName);
        fs.open('file.txt', 'w', (err, file) => {
            if(err){
                reject(err)
            } else {
                //console.log("File is created.");
                resolve();
            }
        });
    });
}

async function concatSyncAsyncFilesToAppJs(prop, appjsPath) {
    return new Promise(async (resolve, reject) => {
        const srcDir = loc.ipWorkSpaceTempWapPath(prop)+'/inputdata/webfiles/js';

        if (prop.enableAsyncDesktopwebFlag) {
            await utils.concatData((srcDir+'/async'), appjsPath);
            resolve();
        } else {
            await utils.concatData((srcDir+'/sync'), appjsPath);
            resolve();
        }
    });
}

async function  concatJSSrcToAppJS(jssrcPath, fromFolder, excludes, appjsPath) {
    return new Promise(async (resolve, reject) => {
        await utils.concatData(jssrcPath+'/'+fromFolder[0], appjsPath, excludes, null);
        await utils.concatData(jssrcPath+'/'+fromFolder[1], appjsPath, excludes, null);
        //Refactor the code above
        resolve();
    });
}

export { prepareMVCAppjs }