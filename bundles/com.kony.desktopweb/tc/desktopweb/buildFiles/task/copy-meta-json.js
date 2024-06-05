import fs from 'fs-extra';


function copyMetaJsonFile(prop, src, dest, cacheId) {
    const srcFile  = src + '/jsoutput/meta.json';
    const destFile = dest + '/temp/meta.json';

    console.time('Successfully copied meta.json file in :');

    return new Promise((resolve, reject) => {
        fs.copy(srcFile, destFile, async (err) => {
            const replaceTokensVal = {'@cacheid@': cacheId};
            const platforms = prop.seoFlag === true ? 'desktopweb,spabot': 'desktopweb';
            const appConfigProps = {
                'buildoption': prop.buildType,
                'applocales': prop.locales,
                'spa': platforms,
                'appid': prop.appContextId,
                'devicedblookup':'false',
                'smsecure':'',
                'cacheId': cacheId,
                'cacheUrl': prop.appContextId+'/'+cacheId
            }

            if(err) {reject(); throw err;}

            replaceTokens(destFile, replaceTokensVal).then(() => {
                fs.readFile(destFile, (err, data) => {
                    if(err) {reject(); throw err;}
                    const jsonData = JSON.parse(data)
                    jsonData['appconfig'] = appConfigProps;
                    fs.writeFile(destFile, JSON.stringify(jsonData), (err) => {
                        if(err) {reject(); throw err;}
                        resolve();
                    });
                });
            }).catch((err) => {
                reject(err);
            });
        });
    }).then(() => {
        console.timeEnd('Successfully copied meta.json file in :');
    }).catch((err) => {
        console.log('Failed in copying meta.json file.');
        throw err;
    });
}


function replaceTokens(filePath, replaceTokenValues) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8',(err, data) => {
            if(err) {reject(); throw err;}

            for(let key in replaceTokenValues) {
                let keyG = new RegExp(key, 'g');
                data = data.replace(keyG, replaceTokenValues[key]);
            }

            fs.writeFile(filePath, data, 'utf8', err => {
                if(err) {reject(); throw err;}
                resolve();
            });
        });
    });
}


export {copyMetaJsonFile};