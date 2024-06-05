import { copyPWAFiles } from "./copy-pwa-files.js";
import {utils} from './../utils/utils.js';


const vizWorkSpaceSPath = utils.getArgVal('ws') || 'D:/DailyInstallerWorkspace/WorkSpace_V9SP4_16112021';
const projectName = utils.getArgVal('app') || 'BuildAppTest';
const props = {
    "pluginLoc": vizWorkSpaceSPath + "/bundles/com.kony.desktopweb",
    "projectName": projectName,
    "projectLoc": vizWorkSpaceSPath + "/" + projectName,
    "webAppsLoc":vizWorkSpaceSPath + "/webapps/"+projectName,
    "webLibraryMode": utils.getArgVal('mode') || "css",
    "workSpaceTempLoc": vizWorkSpaceSPath +"/temp/"+projectName,
    "cssmode": utils.getArgVal('cssmode') || true,
    "enableProgressiveWeb" : utils.getArgVal('pwa') || true,
    "serviceWorkerFile" : utils.getArgVal('swf') || '',
    "serviceWorkerHelperFile" : utils.getArgVal('swhf') ||'',
    "cacheversion" : 509882227,
    "enablePushNotificationsDW" : true,
    "fcmsenderid" : '',
    "cacheId" : 724117242
}
copyPWAFiles(props);