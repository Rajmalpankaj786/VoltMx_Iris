import { generateZip } from './generate-zip.js';
import {utils} from './../utils/utils.js';
import { loc } from '../utils/location.js';

const vizWorkSpaceSPath = utils.getArgVal('ws') || 'D:/DailyInstallerWorkspace/WorkSpace_V9SP4_16112021';
const projectName = utils.getArgVal('app') || 'BuildAppTest';
const props = {
    "pluginLoc": vizWorkSpaceSPath + "/bundles/com.kony.desktopweb",
    "projectName": projectName,
    "projectLoc": vizWorkSpaceSPath + "/" + projectName,
    "webAppsLoc":vizWorkSpaceSPath + "/webapps/"+projectName,
    "webLibraryMode": utils.getArgVal('mode') || "css",
    "workSpaceTempLoc": vizWorkSpaceSPath +"/temp/"+projectName,
    "tempWapBuild":vizWorkSpaceSPath + '/temp/' + projectName + '/build/wap',
    "appContextId": 'BuildAppTest',
    "cacheId": "724117242",

}
generateZip(props);
