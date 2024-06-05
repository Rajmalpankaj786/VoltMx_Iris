import { copyFonts } from './copy-fonts.js';
import { utils } from '../utils/utils.js';


//node copy-images-test.js --src=abc --dest=def


(async function() {
    const vizWorkSpaceSPath = 'D:/BuildChanges/NodeBuildTest';
    const projectName = '/NodeBuildTestProj';
    const srcDir = utils.getArgVal('src')
                || (vizWorkSpaceSPath+projectName+'/resources/fonts');
    const destDir = utils.getArgVal('dest')
                || (vizWorkSpaceSPath+'/webapps'+projectName+'/temp');
    const libmode = utils.getArgVal('libmode') || 'css'

    var props = {
        "workSpaceTempLoc":vizWorkSpaceSPath+'/temp'+projectName,
        "fontsFolder":"Desktop_web"
    }
    copyFonts(props, srcDir, destDir, libmode);
})();