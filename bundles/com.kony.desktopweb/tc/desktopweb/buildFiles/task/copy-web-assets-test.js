import { copyWebAssets } from './copy-web-assets.js';
import { utils } from '../utils/utils.js';


//node copy-themes-test.js --src=abc --dest=def


(async function() {
    const vizWorkSpaceSPath = 'D:/viz_ws/V9SP2_GA';
    const projectName = 'elinafactoria';
    const srcDir = utils.getArgVal('src')
                || (vizWorkSpaceSPath+'/'+projectName);
    const destDir = utils.getArgVal('dest')
                 || (vizWorkSpaceSPath+'/webapps/'+projectName+'/temp/desktopweb');

    copyWebAssets(srcDir, destDir);
})();