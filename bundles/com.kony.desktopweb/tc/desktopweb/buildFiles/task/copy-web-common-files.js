import fs from 'fs-extra';

function copyWebCommonFiles(srcDir, destDir) {

    copyRobotsTextFile(srcDir + '/robots.txt', destDir + '/robots.txt');

    copyVersionHtmlFile(srcDir + '/version.html', destDir + '/version.html');

    copyGenericJspFile(srcDir + '/genericerror.jsp', destDir + '/genericerror.jsp');

}

const copyRobotsTextFile = (srcDir, destDir) => {

    fs.copy((srcDir), (destDir), err => {
        if(err) {
            console.log("robots.txt doesnt exists");
        }
        console.log("Successfully copied robots.txt");
    });
}

const copyVersionHtmlFile = (srcDir, destDir) => {

    fs.copy((srcDir), (destDir), err => {
        if(err) {
            console.log("version.html doesnt exists");
        }
        console.log("Successfully copied version.html")
    });
}

const copyGenericJspFile = (srcDir, destDir) => {

    fs.copy((srcDir), (destDir), err => {
        if(err) {
            console.log("genericerror.jsp doesnt exists")
        }
        console.log("Successfully copied genericerror.jsp")
    });
}

export { copyWebCommonFiles };
