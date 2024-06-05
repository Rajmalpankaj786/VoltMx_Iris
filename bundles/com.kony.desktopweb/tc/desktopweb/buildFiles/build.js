import fs from 'fs-extra';
import { utils } from './utils/utils.js';
import { loc } from './utils/location.js';
import { instrumentAppjs } from './task/instrument-appjs.js';
import { prepareWebapp } from './task/prepare-webapp.js';
import { populatedWebWorkers } from './task/web-workers.js';
import { copyCustomWidgets } from './task/copy-custom-widgets.js';
import { populateResources } from './task/copy-resources.js';
//import { copyManifestIndexFile } from './task/copy-html-manifest.js';
import { copyWebAssets } from './task/copy-web-assets.js';
import { babelConvert } from './task/babel-conversion.js';
import { generateZip } from './task/generate-zip.js';


//node build.js --ws=D:/viz_ws/V9SP3_GA --app=accessibilityApp
// OR
//node build.js --test=false --path=D:/viz_ws/V9SP3_GA/temp/accessibilityApp/build/spabuild.properties


const workspace = utils.getArgVal('ws');
const project = utils.getArgVal('app');
const propFilePath = utils.getArgVal('path');
const test = utils.getArgVal('test');
const settings = (workspace && project)
               ? await utils.createProjectProperties(workspace+'/temp/'+project+'/build/spabuild.properties')
               : (typeof test === 'string' && test.toLowerCase() === 'true')
               ? await utils.getProperty(propFilePath)
               : await utils.createProjectProperties(propFilePath);



const populateWebapp = async (prop) => {
    return new Promise(async (resolve, reject) => {

        let webWorkerDir = loc.opDesktopWebJsOutputPath(prop);

        fs.stat(webWorkerDir+'/workerthreads', (err,stats) => {
            if (err) console.log("No Worker Threads present");
            else{
                if(stats.isDirectory()){
                    populatedWebWorkers(
                        prop,
                        webWorkerDir,
                        loc.opWebappsTempPath(prop),
                        prop.webLibraryMode
                    );
                }
            }
        });

        await copyWebAssets(
            loc.ipProjectLocationPath(prop),
            loc.opWebappsTempPath(prop),
        );

        copyCustomWidgets(
            loc.opDesktopWebJsOutputPath(prop)+'/jslib/tparty',
            loc.opWebappsTempPath(prop)+'/jslib/tparty',
            prop.minifyFlag
        );

        populateResources(
            prop,
            prop.resourceFolder,
            loc.opWebappsTempPath(prop)
        );

        const options = {
            "presets": [prop.pluginLoc+"/tc/spacssgen/node_modules/@babel/preset-env"],
            "sourceType": "script"
        };

        if(prop.es5build) {
            babelConvert(
                prop,
                loc.opWebappsTempPath(prop),
                loc.opWebappsTempPath(prop),
                options
            );
        }

        instrumentAppjs(
            prop,
            prop.enableAutomation,
            prop.enableCodeCoverage
        )

        resolve(); //TODO:: To check when to resolve in refactoring
    })
};


const startProcess = async (prop) => {
    console.time('Successfully completed desktopweb build in :');
    console.log('Desktopweb build started ');

    /*
        The below module must be invoked when createWebApp target dependency is removed from web-commons build.xml file.

        await createTempFolder(
            loc.opWebappsPath(prop)
        ).then(() => {
            console.log("Successfully created Temp Folder");
        }).catch(() => {
            console.log("Failed creating Temp Folder");
            throw err;
        });
    */

    await prepareWebapp(
        prop,
        loc.ipJssrcPath(prop),
        loc.opWebappsTempPath(prop)
    );

    await populateWebapp(prop);
    await generateZip(prop);

    console.timeEnd('Successfully completed desktopweb build in :');
};

const createTempFolder = async (dest) => {
    return new Promise(function(resolve, reject) {
        fs.mkdir((dest+'/temp'), { recursive: true }, (err) => {
            if(err)  reject();
            resolve();
        });
    });
}

await startProcess(settings);