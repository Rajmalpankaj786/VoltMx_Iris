import { utils } from '../utils/utils.js';
import { prepareAppJs } from './prepare-appjs.js';


(async function() {
    const vizWorkSpaceSPath = 'D:/viz_ws/V9SP2_GA';
    const projectName = 'elinafactoria';
    const srcDir = utils.getArgVal('src')
                || (vizWorkSpaceSPath+'/'+projectName + '/jssrc');
    const destDir = utils.getArgVal('dest')
                || (vizWorkSpacePath+'/webapps/temp');
    const shouldMinify = utils.getArgVal('minify')
                || false;

    console.log("######## Preparing APPJS #######");
    prepareAppJs(srcDir, destDir);
})();

