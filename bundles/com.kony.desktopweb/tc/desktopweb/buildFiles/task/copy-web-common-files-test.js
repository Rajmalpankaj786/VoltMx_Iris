import { copyWebCommonFiles } from './copy-web-common-files.js'
import {utils} from '../utils/utils.js';


const vizWorkSpaceSPath = utils.getArgVal('ws') || 'D:/DailyInstallerWorkspace/WorkSpace_V9SP4_16112021';
const projectName = utils.getArgVal('app') || 'BuildAppTest';
const src = vizWorkSpaceSPath+'/bundles/com.kony.webcommons/common/wap/inputdata/webfiles/src';
const dest = vizWorkSpaceSPath + '/webapps/' + projectName;



copyWebCommonFiles(src, dest);