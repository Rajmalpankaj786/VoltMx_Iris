import {prepareAppJs} from './prepare-appjs.js';
import {loc} from '../utils/location.js'
import {copyFrameworkAssets} from './copy-framework-assets.js';
import {copyThemes} from './copy-themes.js';
import { copyMetaJsonFile } from './copy-meta-json.js';
import { copyManifestFile } from './copy-manifest-file.js';
import { copyIndexFiles } from './copy-index-html-files.js';
import { copyPWAFiles } from './copy-pwa-files.js';
import { copyWebCommonFiles } from './copy-web-common-files.js';
import { copyWebManifestFile } from './copy-web-manifest.js';

const prepareWebapp = async (prop, jssrcPath, webappsTempPath) => {

    await prepareAppJs(
            prop,
            jssrcPath,
            webappsTempPath,
            prop.minifyFlag
        );

    copyThemes(
        loc.opDesktopWebJsOutputPath(prop),
        webappsTempPath,
        prop.themeNames,
        prop.minifyFlag,
        prop.webLibraryMode
    );

    const replaceTokens = {
        BUILD_MODE: prop.buildType,
        ECMA_ENABLED: prop.es5build,
        PRINT_LEVEL: prop.setPrintLevel,
        UWP_APIS: false, //TODO:: Get it from prop
        UWP_OFFLINE_APIS: false //TODO:: Get it from prop
    };

    copyFrameworkAssets(
        prop,
        loc.ipPluginLibraryFilesPath(prop),
        webappsTempPath,
        prop.buildType,
        replaceTokens,
        prop.enableAutomation,
        prop.webLibraryMode
    );

    copyIndexFiles(
        loc.opDesktopWebJsOutputPath(prop),
        loc.opWebappsPath(prop),
    );

    await copyManifestFile(
        loc.opDesktopWebJsOutputPath(prop),
        loc.opWebappsPath(prop),
        prop.cacheId
    );

    copyWebManifestFile(
        loc.opDesktopWebJsOutputPath(prop),
        loc.opWebappsTempPath(prop)
    );

    copyMetaJsonFile(
        prop,
        loc.opWorkSpaceTempPath(prop),
        loc.opWebappsPath(prop),
        prop.cacheId
    );

    copyPWAFiles(prop);

    //The below module must be invoked when createWebApp target dependency is removed from web-commons build.xml file.

    /*
        copyWebCommonFiles(
            loc.ipWebCommonFilesPath(prop) + '/src',
            loc.opWebappsPath(prop),
        );
    */


}


export {prepareWebapp};









