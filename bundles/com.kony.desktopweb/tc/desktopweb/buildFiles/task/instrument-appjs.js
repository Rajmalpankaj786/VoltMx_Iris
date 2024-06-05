import { execSync } from "child_process";
import {utils} from './../utils/utils.js';
import {loc} from './../utils/location.js';
import fs from "fs-extra";

const instrumentAppjs = function(props, enableAutomation, enableCodeCoverage) {
    return new Promise(async (resolve, reject) => {
        if(enableAutomation && enableCodeCoverage) {
            console.log("Instrumentation begins: ");

            const unInstrumentedFiles = loc.ipProjectLocationPath(props)+'/testresources/Jasmine/UninstrumentedFiles/desktopweb/appjs'
            await fs.mkdir(
                unInstrumentedFiles, {
                    recursive: true
                }
            );
            await fs.copy(
                loc.opAppJsPath(props),
                unInstrumentedFiles
            );

            execSync(
                loc.ipPluginPath(props)+'/tc/spacssgen/node_modules/.bin/nyc instrument --cwd '+ loc.opAppJsPath(props) +' --in-place '+ loc.opAppJsPath(props),
                { stdio: 'inherit' }
            );
            console.log("Instruentation ended ");
        }
        resolve();
    });
}

export {instrumentAppjs}