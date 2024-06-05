import {nonMvcAppjs} from './non-mvc.js';
import {utils} from './../utils/utils.js';
//node non-mvc-test.js --ws=abc --app=def --mode=css

const vizWorkSpaceSPath = utils.getArgVal('ws') || 'D:/DailyInstallerWorkspace/WorkSpace_V9SP4_16112021';
const projectName = utils.getArgVal('app') || 'FreeTestApp';
const props = {
    "pluginLoc": vizWorkSpaceSPath + "/bundles/com.kony.desktopweb",
    "projectName": projectName,
    "projectLoc": vizWorkSpaceSPath + "/" + projectName,
    "webAppsLoc":vizWorkSpaceSPath + "/webapps/"+projectName,
    "webLibraryMode": utils.getArgVal('mode') || "css",
    "workSpaceTempLoc": vizWorkSpaceSPath +"/temp/FreeTestApp",
}

nonMvcAppjs(props);
