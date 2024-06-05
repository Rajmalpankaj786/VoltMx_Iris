import fs from 'fs-extra';


function copyWebManifestFile(src, dest) {
    const srcFile  = src + '/webmanifest.js';
    const destFile = dest + '/webmanifest.js';

    console.time('Successfully copied webmanifest.js file in :');

    return new Promise((resolve, reject) => {
        fs.stat(srcFile, (err, stats) => {
            if(err) { resolve(); return;}
            fs.copy(srcFile, destFile, async (err) => {
                if(err) {reject(); throw err;}

                resolve();
                console.timeEnd('Successfully copied webmanifest.js file in :');
            })
        });
    });
}

export {copyWebManifestFile};