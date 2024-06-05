
var path = require('path');
var fs = require('fs');
var cssgen = require('./codegen/csswriter');

var spaindexgen = require('./codegen/spaindexwriter');
//var dwindexgen = require('./codegen/desktopindexwriter');

var generatecode = {};
var preprocessorConst = [];
(function (generatecode) {

    //Generation of CSS for SPA & DW platforms
    generatecode.generateCSSCodeForSPA = function (config) {

        try {
            var codegenerated = true;
            var themesList = config.themesList;
            var codegenSuccess = [];

            var cgArgs = {};
            cgArgs.platform = config.platform;
            cgArgs.readFileOptions =  {
                                            encoding: 'utf8'
                                      };
            cgArgs.outputdir = config.outputdir;
            cgArgs.projectName = config.projectName;
            cgArgs.projectdir = config.projectdir;
            cgArgs.focusSkinList = config.focusSkinList;
            cgArgs.hoverSkinList = config.hoverSkinList;
            cgArgs.newlib = false;

            console.log("SPADW: CSS Generation Started for platform:  " + config.platform + " ");

            var projectProperties = fs.readFileSync(config.projectProperties);
            cgArgs.appObj = JSON.parse(projectProperties);

            if(cgArgs.appObj.webLibraryMode === 'css' && config.platform === 'desktopweb')  {
                cgArgs.newlib = true;
                console.log("SPADW: CSS Generation for new Lib");
            }

            for (var i=0; i <themesList.length; i++) {
                var themeName = themesList[i];
                console.log("SPADW: CSS gen Started ---> For theme "+ themeName);
                var themePath = path.resolve(config["inputdir"], themeName);
                var themeFile = fs.readFileSync(themePath);
                cgArgs.themeFile = themeFile;
                cgArgs.themeName = themeName.replace(".theme", "");
                cssgen.generateCSSForSPA(cgArgs);
                console.log("SPADW: CSS Generation completed ----> For theme: "+ themeName);
            }
            console.log("SPADW: CSS Generation completed ----> For Platform "+ config.platform);
        }
        catch(err) {
            console.error("SPADW: CSS Generation Failed for platform:  " + config.platform + " ");
            throw new Error(err);
        }

    };

    //Generation of index.jsp for SPA & DW platforms
    generatecode.generateIndexCodeForSPA = function(config) {
        try {
            console.log("SPADW: Index.jsp generation started ----> For Platform:: "+ config.platform);
            config.readFileOptions =  {encoding: 'utf8'};
            spaindexgen.generateIndexForSPA(config);
            console.log("SPADW: Index.jsp generation completed ----> For Platform:: "+ config.platform);
        }
        catch (err) {
            console.error("SPADW: Index.jsp generation failed for platform:  " + config.platform + " ");
            throw new Error(err);
        }

    }

})(generatecode);


//List of Platforms
/*
    var platformspa = ["spaan", "spaip","spawinphone8","spaipad","spaandroidtablet",
        "spawindowstablet","spabb", "spabbnth","spawindows"];
*/
function main() {
    var config = {};
    config['projectName'] = 'SkinTesting';
    config['projectProperties'] = 'input/Project1/appprops.json';
    config['themesList'] = ["default.theme", "red.theme", "green.theme"];
    config['inputdir'] = 'input/Project1/';
    config['outputdir'] = 'output/Project1/';

    config['platform'] = 'desktopweb';
    config['newlib'] = true;
    generatecode.generateCSSCodeForSPA(config);

}

function main1() {
    var config = {};
    config['projectName'] = 'SkinTesting';
    config['projectProperties'] = 'input/Project1/appprops.json';
    config['outputdir'] = 'output/Project1/';

    config['platform'] = 'desktopweb';
    generatecode.generateIndexCodeForSPA(config);
}

if (require.main === module) {
    main();
}  else {
    module.exports = generatecode;
}
