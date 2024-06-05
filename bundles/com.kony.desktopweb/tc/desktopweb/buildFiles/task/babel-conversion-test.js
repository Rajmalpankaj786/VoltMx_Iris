import { babelConvert } from './babel-conversion.js'
import { loc } from '../utils/location.js';
import { utils } from '../utils/utils.js';


const defaultProperties = {
    "webAppsLoc": "C:/Users/pranay.harinarithini/Desktop/es6samples"
};
const buildweb = utils.getArgVal('buildweb') || loc.opWebappsPath(defaultProperties);
const webAppsFolder = utils.getArgVal('webAppsFolder') || buildweb + '/temp/desktopweb/';

const options = {
    "plugins": [
        [
            "@babel/plugin-transform-runtime",
            {
                "absoluteRuntime": false,
                "corejs": false,
                "helpers": true,
                "regenerator": true,
                "version": "7.0.0-beta.0"
            }
        ]
    ],
    "presets": ["@babel/preset-env"],
    "sourceType": "script"
};
babelConvert(webAppsFolder, buildweb, options);