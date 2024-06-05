//import * as fm from "./functionalModules.js";
import { loc } from './../utils/location.js';
import { utils } from './../utils/utils.js';
import fs from 'fs-extra';

const nonMvcAppjs = async function(props){
   //populateIncludeFileList(); //COUlD NOT FIND
   //cleanAppjs();
   //fm.functionalModules();//WONT DO:
   const tempDir = loc.opDesktopWebJsOutputPath(props)+'/appjstemp';
   fs.mkdir(tempDir,async (err) => {
      await copyDefaultFiles(loc.ipDefaultFolderPath(props), tempDir);
      await copyStartupFile(loc.ipStartupFolderPath(props), tempDir);
      await copyGeneratedFiles(loc.ipGeneratedFolderPath(props), tempDir);
      await copyNonGeneratedFiles(loc.ipNonGeneratedFolderPath(props), tempDir);
      await copyNonGeneratedFilesToAppJS(loc.ipNonGeneratedFolderPath(props), loc.opAppJsJsOutputPath(props));
      await deleteAppjsFile(loc.opAppJsJsOutputPath(props)+'/app.js');
      await concatToAppjsFile(tempDir, loc.opAppJsJsOutputPath(props)+'/app.js');
      await copyAppJsToWebApps(loc.opAppJsJsOutputPath(props),loc.opWebappsTempPath(props)+'/appjs');
   });
}

const copyDefaultFiles =async function(srcDir, destDir) {
   const excludeList = {
      'pathName': ['appmodel.js','sparequirefileslist.js','spaindividualfilelist.js']
   }, includeList = {
      'ext':['.js']
   }
   const folderExist = await fs.exists(srcDir)
   if(folderExist) {
      await utils.copyDirectory(srcDir, destDir,excludeList, includeList);
   }
}

const copyStartupFile =async function(srcDir, destDir) {
   const excludeList = {
      'pathName': ['appmodel.js','sparequirefileslist.js','spaindividualfilelist.js']
   }, includeList = {
      'ext':['.js']
   }
   await utils.copyDirectory(srcDir, destDir,excludeList, includeList);
}

const copyGeneratedFiles =async function(srcDir, destDir) {
   const excludeList = {
      'pathName': ['appmodel.js','sparequirefileslist.js','spaindividualfilelist.js']
   }, includeList = {
      'ext':['.js']
   }
   await utils.copyDirectory(srcDir, destDir,excludeList, includeList);
}

const copyNonGeneratedFiles =async function(srcDir, destDir) {
   const excludeList = {
      'pathName': ['appmodel.js','sparequirefileslist.js','spaindividualfilelist.js']
   }, includeList = {
      'ext':['.js']
   }
   await utils.copyDirectory(srcDir, destDir,excludeList, includeList);
}

const copyNonGeneratedFilesToAppJS =async function(srcDir, destDir) {
   const excludeList = null,
   includeList = {
      'pathName': ["voltmxlibrary.js"]
   }
   await utils.copyDirectory(srcDir, destDir,excludeList, includeList);
}

const deleteAppjsFile =async function(file) {
   const fileExist =await fs.exists(file);
   if(fileExist) {
      await fs.remove(file);
   }
}

const concatToAppjsFile =async function(srcDir, destDir) {
   const excludeList = {
      'pathName':["appmodel.js","require.js"]// TODO:: should add studio.exludes
   }, includeList = {
      'ext':['.js']
   }
   await utils.concatData(srcDir,destDir, excludeList, includeList);
}

const copyAppJsToWebApps =async function(srcDir, destDir) {
   const excludeList = null,
   includeList = {
      'ext':['.js']
   }
   await utils.copyDirectory(srcDir, destDir, excludeList, includeList);
}

export {nonMvcAppjs};
