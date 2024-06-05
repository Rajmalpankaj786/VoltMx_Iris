import {utils} from '../utils/utils.js';
import path from 'path';
import { argv } from 'process';

const es5 = async () => {
    try{
        validateES5();
    } catch(e){
        console.log(e);
    }
};

var validateES5 = async () => {
    /* 
        Internal Debuggin code 
        Checking of arguments sent during Internal Debugging.
    */
    if(argv.length > 2 && ((path.basename(argv[1])) ==='es5')) {
        var args = {
            outputDir : await utils.getArgVal(argv, '-op'),
        } 
    }
    executeES5();

}

const executeES5 = async () => {
    /* 
        Logic of the module..
        Invokation of submodules..
        Remaining functions 
    */
        //linkbabel();
        //babelConvertion();
}

/* 
    To prevent runnning of the module at the time of importing it at Tool invoked build.
*/
if (((path.basename(argv[1])) ==='es5')) 
    es5(argv);

export {es5};