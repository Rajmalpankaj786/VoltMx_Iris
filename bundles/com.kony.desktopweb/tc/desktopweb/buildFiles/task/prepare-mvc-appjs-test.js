import { prepareMVCAppjs } from './prepare-mvc-appjs.js'
import { utils } from '../utils/utils.js'

(async function() {
    const vizWorkSpacePath = 'D:/viz_ws/V9SP2_GA';
    const projectName = 'elinafactoria';

    const srcDir = utils.getArgVal('src')
                || (vizWorkSpacePath+'/'+projectName + '/jssrc');
    const destDir = utils.getArgVal('dest')
                 || (vizWorkSpacePath+'/temp'+projectName+'/jsoutput/desktopweb/appjs');

    prop = {
        "workSpaceTempLoc":vizWorkSpacePath+'/temp'+projectName,
    }

    prepareMVCAppjs(prop, srcDir, destDir);
})();

