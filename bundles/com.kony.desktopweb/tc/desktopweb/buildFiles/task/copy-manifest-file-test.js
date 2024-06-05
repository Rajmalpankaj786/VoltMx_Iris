import { copyManifestFile } from "./copy-manifest-file.js";
import {utils} from './../utils/utils.js';


const vizWorkSpaceSPath = utils.getArgVal('ws') || 'D:/DailyInstallerWorkspace/WorkSpace_V9SP4_16112021';
const projectName = utils.getArgVal('app') || 'BuildAppTest';
const src = vizWorkSpaceSPath + '/temp/' + projectName + '/jsoutput/desktopweb';
const dest = vizWorkSpaceSPath + '/webapps/' + projectName;
const cacheId = '724117242';


copyManifestFile(src, dest, cacheId);