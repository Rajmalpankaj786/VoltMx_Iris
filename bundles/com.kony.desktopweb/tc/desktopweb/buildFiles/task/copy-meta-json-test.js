import { copyMetaJsonFile } from "./copy-meta-json.js";
import {utils} from './../utils/utils.js';


const vizWorkSpaceSPath = utils.getArgVal('ws') || 'D:/DailyInstallerWorkspace/WorkSpace_V9SP4_16112021';
const projectName = utils.getArgVal('app') || 'BuildAppTest';
const src = vizWorkSpaceSPath+'/temp/'+projectName;
const dest = vizWorkSpaceSPath + '/webapps/' + projectName;
const cacheId = '724117242';
const prop = {
    'buildType': utils.getArgVal('buildType') || 'debug',
    'locales': utils.getArgVal('locales') || 'en_US',
    'seoFlag': utils.getArgVal('seo') || true,
    'appContextId': projectName
}


copyMetaJsonFile(prop, src, dest, cacheId);