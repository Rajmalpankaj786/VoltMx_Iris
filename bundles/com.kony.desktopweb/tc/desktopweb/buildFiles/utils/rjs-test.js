import { rjsTask } from './rjs';

const rjsTaskTest = async (src,dest) => {

    const vizWorkSpacePath = 'D:/viz_ws/V9SP2_GA';
    const projectName = 'elinafactoria';

    let jssrcSrc = utils.getArgVal(src)
                || (vizWorkSpacePath+projectName+'/jssrc');
    let tempDest = utils.getArgVal(dest)
                || (vizWorkSpacePath+'/temp');
    let fileName = utils.getArgVal(fileName)
                || jssrcSrc+'/desktopweb/require/sparequirefileslist';

    rjsTask(jssrcSrc, tempDest, fileName);
}
//node rjs-test --src=../input/ --dest=../output/outputRJS.js --fileName='../input/sparequirefileslist'

rjsTaskTest();
