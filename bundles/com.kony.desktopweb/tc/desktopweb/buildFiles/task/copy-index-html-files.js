import fs from 'fs-extra';
import path from 'path';


function copyIndexFiles(src, dest) {
    const srcFile  = src;
    const destFile = dest + '/temp/desktopweb';
    const includeList = ['head.html', 'body.html'];

    return new Promise((resolve, reject) => {
        fs.copy(srcFile, destFile, {
            overwrite:true,
            filter: file => {
                if (file === srcFile) {
                    return true;
                }
                return path.extname(file) === '.html'
                && includeList.indexOf(path.basename(file)) > -1;
            }
        }, (err) => {
            if(err) {reject(); throw err;}

            resolve();
        });
    });
}

export {copyIndexFiles};