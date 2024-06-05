import { populateResources } from './copy-resources.js';
import { utils } from '../utils/utils.js';


//node copy-images-test.js --src=abc --dest=def


(async function() {
    const vizWorkSpaceSPath = 'D:/BuildChanges/NodeBuildTest';
    const projectName = '/NodeBuildTestProj';
    const srcDir = utils.getArgVal('src')
                || (vizWorkSpaceSPath+projectName+'/resources');
    const destDir = utils.getArgVal('dest')
                 || (vizWorkSpaceSPath+'/webapps'+projectName+'/temp');

    var props = {
        "workSpaceTempLoc":vizWorkSpaceSPath+'/temp'+projectName,
        "webLibraryMode":'css',
        "fontsFolder":"/Desktop_web"
    
    }
    populateResources(props, srcDir, destDir);
})();