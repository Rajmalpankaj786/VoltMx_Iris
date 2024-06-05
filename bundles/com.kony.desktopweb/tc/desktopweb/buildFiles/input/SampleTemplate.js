import {utils} from './utils/utils.js';
import path from 'path';
import { argv } from 'process';

const moduleName = async (args) => {
    try{
        validateModuleName(args);
    } catch(e){
        console.log(e);
    }
};

var validateModuleName = (argv) => {
    /* 
        Internal Debuggin code 
        Checking of arguments sent during Internal Debugging.
    */
    if(argv.length > 2 && ((path.basename(argv[1])) ==='moduleName')) {
        var args = {
            outputDir : utils.getArgVal(argv, '-op'),
        } 
    }
    executeModuleName(args);

}

const executeModuleName = async (outputDir) => {
    /* 
        Logic of the module..
        Invokation of submodules..
        Remaining functions 
    */
}

/* 
    To prevent runnning of the module at the time of importing it at Tool invoked build.
*/
if (((path.basename(argv[1])) ==='moduleName passed as argument')) 
    moduleName(argv);

export {moduleName};