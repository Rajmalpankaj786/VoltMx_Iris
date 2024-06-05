import fs from 'fs-extra';
import path from 'path';
import {utils} from '../utils/utils.js'

async function babelConvert(prop, webAppFolder, buildWeb, options) {
    var promises = [];
    options = (options === undefined) ? getDefaultOptions(prop) : options;
    promises.push(convert(buildWeb + "/appjs", webAppFolder + "/es5appjs", options));
    promises.push(convert(webAppFolder + "/lib", webAppFolder + "/es5lib", options));
    if(fs.existsSync(webAppFolder + "/jslib/tparty/widgets")) {
        promises.push(convert(webAppFolder + "/jslib/tparty/widgets", webAppFolder + "/jslib/tparty/widgets", options));
    }

    return Promise.all(promises).then(values => {
        console.log("Babel Conversion Completed");
    }).catch(err => {
        console.log("Babel Conversion Failed : " + err);
    });
}

async function convert(src, dest, options) {
    var promises = [];
    if (fs.statSync(src).isDirectory()) {
       
        fs.ensureDirSync(dest);

        var entries = fs.readdirSync(src);
        entries.forEach(function (entry) {

            var srcItem = path.resolve(src, entry);
            var destItem = path.resolve(dest, entry);

            if (fs.statSync(srcItem).isFile()) {
                if(path.extname(srcItem) === '.js') {
                    promises.push(utils.convertFile(srcItem, destItem, options));
                }
            } else {
                promises.push(convert(srcItem , dest + '/' + entry, options));
            }
        });
    } else {
        if(path.extname(src) === '.js') {
            promises.push(utils.convertFile(src, dest, options));
        }
    }
    return Promise.all(promises);
}

function getDefaultOptions(prop) {
    return {
        "presets": [prop.pluginLoc+"/tc/spacssgen/node_modules/@babel/preset-env"],
        "sourceType": "script"
    };
}

export { babelConvert }