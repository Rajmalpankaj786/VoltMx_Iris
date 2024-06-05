//import {prop} from './utils.js';

var loc  = {}

loc.ipInputDirPath = (prop) => {
    return 'input';
}

loc.ipCustomBuildPath = (prop) => {
    return prop.projectLoc + '/custombuild';
}

loc.spaDotWebappsFilesList = (prop) => {
    return prop.workSpaceLoc + '/.webapps/' + prop.projectName + '/desktopweb/appjs/require';
}

loc.opDesktopWebJsOutputPath = (prop) => {
    return loc.opWorkSpaceTempPath(prop) + '/jsoutput/desktopweb';
}

loc.opWebappsPath = (prop) => {
    return prop.webAppsLoc;
}

loc.opWebappsTempPath = (prop) => {
    return loc.opWebappsPath(prop) + '/temp/desktopweb';
}

loc.opAppJsPath = (prop) => {
    return loc.opWebappsTempPath(prop) + '/appjs';
}

loc.opAppJsJsOutputPath = (prop) => {
    return loc.opDesktopWebJsOutputPath(prop) + '/appjs';
}

loc.opAppJsWebappPath = (prop) => {
    return loc.opWebappsPath(prop) + '/desktopweb/appjs';
}

loc.ipProjectLocationPath = (prop) => {
    return prop.projectLoc;
}

loc.ipJssrcPath = (prop) => {
    return loc.ipProjectLocationPath(prop) + '/jssrc/desktopweb';
}
//Remove all the slash at the end of location
loc.ipDefaultFolderPath = (prop) => {
    return loc.ipJssrcPath(prop) + '/default';
}

loc.ipGeneratedFolderPath = (prop) => {
    return loc.ipJssrcPath(prop) + '/generated';
}

loc.ipNonGeneratedFolderPath = (prop) => {
    return loc.ipJssrcPath(prop) + '/nongenerated';
}

loc.ipRequireFolderPath = (prop) => {
    return loc.ipJssrcPath(prop) + '/require';
}

loc.ipStartupFolderPath = (prop) => {
    return loc.ipJssrcPath(prop) + '/startup';
}

loc.ipPluginPath = (prop) => {
    return prop.pluginLoc;
}

loc.ipPluginCssLibPath = (prop) => {
    return loc.ipPluginPath(prop)+'/tc/webfiles/dwcsslib';
}

loc.ipPluginJsLibPath = (prop) => {
    return loc.ipPluginPath(prop)+'/tc/webfiles/legacy';
}

loc.ipWebCommonPath = (prop) => {
    return prop.webCommonsLoc;
}

loc.ipWebCommonFilesPath = (prop) => {
    return loc.ipWebCommonPath(prop) + '/common/wap/inputdata/webfiles'
}

loc.ipPluginLibraryFilesPath = (prop) => { //basically the library which is present in the bundles after building.
    if(prop.webLibraryMode === 'css') {
        return loc.ipPluginCssLibPath(prop);
    } else {
        return loc.ipPluginJsLibPath(prop);
    }
}

loc.opWorkSpaceTempPath = (prop) => {
    return prop.workSpaceTempLoc;
}

loc.opWorkSpaceTempBuildPath = (prop) => {
    return loc.opWorkSpaceTempPath(prop)+'/build';
}

loc.ipWorkSpaceTempWapPath = (prop) => {
    return loc.opWorkSpaceTempBuildPath(prop)+'/wap';
}

loc.opWorkSpaceTempBuildDesktopWebPath = (prop) => {
    return loc.opWorkSpaceTempBuildPath(prop)+'/desktopweb';
}

loc.opResourceFolderPath = (prop) => {
    return loc.opWebappsTempPath(props)+'/resources'
}

export {loc};