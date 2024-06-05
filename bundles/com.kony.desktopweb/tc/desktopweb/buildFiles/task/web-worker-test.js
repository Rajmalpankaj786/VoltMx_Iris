import { populatedWebWorkers } from './web-workers.js';
import { utils } from '../utils/utils.js';

//node copy-images-test.js --src=abc --dest=def

(async function() {
    const vizWorkSpaceSPath = 'D:/installer/voltmxworkspace';
    const projectName = '/VoltmxOLB';
    const srcDir = utils.getArgVal('src')
                || (vizWorkSpaceSPath+'/temp'+projectName+'/jsoutput/desktopweb/workerthreads');
    const destDir = utils.getArgVal('dest')
                || (vizWorkSpaceSPath+'/webapps'+projectName+'/temp/desktopweb');
    const libmode = utils.getArgVal('libmode') || 'css';
    
    var props = {
        "workSpaceTempLoc":vizWorkSpaceSPath+'/temp'+projectName,
        "pluginLoc":vizWorkSpaceSPath+'/bundles/com.kony.desktopweb',
        "buildType":'debug',
        "minifyFlag":false,
        "protectedModeFlag":true
    }
    populatedWebWorkers(props, srcDir, destDir, libmode);
})();