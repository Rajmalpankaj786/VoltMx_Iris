
import {copyFonts} from './copy-fonts.js';
import { copyImages } from './copy-images.js';
import { copyi18nFiles} from './copy-i18n-files.js'

const populateResources = async (props,srcDir,destDir) => {
    //srcDir is resourceFolder , destDir is WA/temp

    console.log("Copying of Resources starts")

    copyImages(props, srcDir, destDir);
    copyFonts(props, srcDir+'/fonts', destDir, props.webLibraryMode);
    copyi18nFiles(srcDir, destDir);
};

export {populateResources};