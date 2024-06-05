import { copyFrameworkAssets } from './copy-framework-assets.js';
import { utils } from '../utils/utils.js';


//node copy-themes-test.js --src=abc --dest=def --build=debug --automation=false --lib-mode=css


(async function() {
    const vizWorkSpaceSPath = 'D:/viz_ws/V9SP2_GA';
    const projectName = 'elinafactoria';
    const srcDir = utils.getArgVal('src')
                || (vizWorkSpaceSPath+'/bundles/com.kony.desktopweb/tc/webfiles/dwcsslib');
    const destDir = utils.getArgVal('dest')
                 || (vizWorkSpaceSPath+'/webapps/'+projectName+'/temp/desktopweb');
    const build = utils.getArgVal('build') || 'debug';
    const libmode = utils.getArgVal('lib-mode') || 'css';

    const replaceTokens = {
        BUILD_MODE: 'release',
        ECMA_ENABLED: true,
        PLATFORM_BUILT: 'desktopweb',
        PRINT_LEVEL: false,
        PUBLISHED: true,
        UWP_APIS: true,
        UWP_OFFLINE_APIS: true
    };

    let automation = utils.getArgVal('automation') || false;

    automation = (automation === 'true') ? true : false;


    copyFrameworkAssets(srcDir, destDir, build, replaceTokens, automation, libmode);
})();