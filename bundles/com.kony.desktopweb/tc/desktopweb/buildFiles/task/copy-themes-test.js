import { copyThemes } from './copy-themes.js';
import { utils } from '../utils/utils.js';


//node copy-themes-test.js --src=abc --dest=def --themes= --minify=false --lib-mode=css


(async function() {
    const vizWorkSpaceSPath = 'D:/viz_ws/V9SP2_GA';
    const projectName = 'elinafactoria';
    const srcDir = utils.getArgVal('src')
                || (vizWorkSpaceSPath+'/temp/'+projectName+'/jsoutput/desktopweb');
    const destDir = utils.getArgVal('dest')
                 || (vizWorkSpaceSPath+'/webapps/'+projectName+'/temp/desktopweb');
    const themes = utils.getArgVal('themes') || 'default';
    const libmode = utils.getArgVal('lib-mode') || 'css';

    let minify = utils.getArgVal('minify') || false;

    minify = (minify === 'true') ? true : false;


    copyThemes(srcDir, destDir, themes, minify, libmode);
})();