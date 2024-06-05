import { copyCustomWidgets } from './copy-custom-widgets.js';
import { utils } from '../utils/utils.js';


//node copy-themes-test.js --src=abc --dest=def --minify=false


(async function() {
    const vizWorkSpaceSPath = 'D:/viz_ws/V9SP2_GA';
    const projectName = 'elinafactoria';
    const srcDir = utils.getArgVal('src')
                || (vizWorkSpaceSPath+'/temp/'+projectName+'/jsoutput/desktopweb/jslib/tparty');
    const destDir = utils.getArgVal('dest')
                 || (vizWorkSpaceSPath+'/webapps/'+projectName+'/temp/desktopweb/jslib/tparty');

    let minify = utils.getArgVal('minify') || false;

    minify = (minify === 'true') ? true : false;


    copyCustomWidgets(srcDir, destDir, minify);
})();