import { mvcAppjs } from './mvc-app-js'
import { loc } from '../utils/location.js'
import { utils } from '../utils/utils.js'

(async function() {
    const vizWorkSpacePath = 'D:/viz_ws/V9SP2_GA';
    const projectName = 'elinafactoria';

    const srcDir = utils.getArgVal('src')
                || (vizWorkSpacePath+'/'+projectName + '/jssrc');
    const destDir = utils.getArgVal('dest')
                 || (vizWorkSpacePath+'/webapps/temp');

    prop = {
        "workSpaceTempLoc":vizWorkSpacePath+'/temp'+projectName,
    }

    mvcAppjs(prop,srcDir, destDir);
})();
