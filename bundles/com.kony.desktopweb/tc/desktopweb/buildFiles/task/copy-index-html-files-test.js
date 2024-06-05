import { copyIndexFiles } from "./copy-index-html-files";
import {utils} from './../utils/utils.js';


const vizWorkSpaceSPath = utils.getArgVal('ws') || 'D:/DailyInstallerWorkspace/WorkSpace_V9SP4_16112021';
const projectName = utils.getArgVal('app') || 'BuildAppTest';
const src = vizWorkSpaceSPath + '/temp/' + projectName + '/jsoutput/desktopweb';
const dest = vizWorkSpaceSPath + '/webapps/' + projectName;


copyIndexFiles(src, dest, cacheId);