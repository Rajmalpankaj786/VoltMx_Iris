import fs from 'fs-extra';

async function copyWebAssets(srcDir, destDir) {
    console.log('Copying of web assets starts, with parameters >>');
    console.time('Successfully copied web assets in :');

    return new Promise((resolve, reject) => {
        fs.copy((srcDir+'/web'), (destDir+'/web'), async err => {
            if(err) {reject(); throw err;}

            resolve();
        });
    }).then(() => {
        console.timeEnd('Successfully copied web assets in :');
    }).catch((err) => {
        console.log('Failed in copying web assets.');
        throw err;
    });
}
//copyModules here..

export {copyWebAssets};
