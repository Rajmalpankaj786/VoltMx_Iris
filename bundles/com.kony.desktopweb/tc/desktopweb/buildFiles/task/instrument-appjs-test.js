import {instrumentAppjs} from './instrument-appjs.js';
import {utils} from './../utils/utils.js';
//node instrument-appjs-test.js --ws=abc --app=def --automation=true --codecoverage=true

const vizWorkSpaceSPath = utils.getArgVal('ws') || 'D:/DailyInstallerWorkspace/WorkSpace_V9SP4_16112021';
const projectName = utils.getArgVal('app') || 'FreeTestApp';
const enableAutomation = utils.getArgVal('automation') || true;
const enableCodeCoverage = utils.getArgVal('instrument') || true
const props = {
    "pluginLoc": vizWorkSpaceSPath + "/bundles/com.kony.desktopweb",
    "projectName": projectName,
    "projectLoc": vizWorkSpaceSPath + "/" + projectName,
    "webAppsLoc":vizWorkSpaceSPath + "/webapps/"+projectName,
    "webLibraryMode":  utils.getArgVal('mode') || "css",
    "workSpaceTempLoc": vizWorkSpaceSPath +"/temp/FreeTestApp",
}

instrumentAppjs(props, enableAutomation, enableCodeCoverage);
