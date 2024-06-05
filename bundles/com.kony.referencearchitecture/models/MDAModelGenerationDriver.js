/**
 * Created by : Inderpreet kaur
 * Copyright : HCL America, Inc., 2021
 *
 **/

/*
    Deals with creating model directories, subsequent files and writing data to same.
 */

var fs = require('fs');
var path = require('path');
var codeGenerationEngine = require("./MDACodeGenerationEngine.js");

var schemaView, view, verbsView;

/**
 * Assign appropriate json data to respective views.
 *
 * @param metadataMap  contains object service metadata and filename map as json object
 */
voltmxModelCreateViewsFromMetadata = function (metadataMap) {
    var metadata = "";

    for (var i = 0; i < 2; i++) {
        metadata = JSON.parse(metadataMap[i].metadata.slice(metadataMap[i].metadata.indexOf("{"), metadataMap[i].metadata.lastIndexOf("}")) + "}");
        if (metadataMap[i].outputFile === "tempObjSvcMeta.txt") {
            view = metadata;
        }

        if (metadataMap[i].outputFile === "tempObjSvcVerbsMeta.txt") {
            verbsView = metadata
        }
    }
};

/**
 * Create a string for object schema in key-value pair format to be used as json later.
 *
 * @param tableName name of the table
 * @param tableView JSON data for a table
 * @param dbName    name of the object service
 */
voltmxModelCreateSchemaView = function (tableName, dbName, tableView) {
    if (schemaView === "") {
        schemaView += '{"table":"' + tableName + '","db":"' + dbName + '"' +
            (!voltmxModelIsNullOrUndefinedOrEmptyObject(tableView.verbs) ? ',"verbs":"true"' : '') + '}';
    } else {
        schemaView += "," + '{"table":"' + tableName + '","db":"' + dbName + '"' +
            (!voltmxModelIsNullOrUndefinedOrEmptyObject(tableView.verbs) ? ',"verbs":"true"' : '') + '}';
    }
};

/**
 * Write to file.
 *
 * @param fileData data to add in the file
 * @param filePath path of the file to write
 */
voltmxModelWriteDataToFile = function (fileData, filePath) {
    fs.writeFileSync(filePath, fileData, (err) => {
        if (err) throw err;
    });
};

/**
 * Create directory at given path.
 *
 * @param path where to create the directory
 * @param overwrite overwrite if the directory exists
 */
 voltmxModelCreateDirectory = function (path, overwrite) {
    if(overwrite)
    {
        if (fs.existsSync(path)) {
            fs.rmdirSync(path,{
                recursive: true
            },(err) => {
                if (err) throw err;
            });
        }
        fs.mkdirSync(path, {
            recursive: true
        }, (err) => {
            if (err) throw err;
        });
    }
    else {
        if (!fs.existsSync(path)) {
            fs.mkdirSync(path, {
                recursive: true
            }, (err) => {
                if (err) throw err;
            });
        }
    }
};

/**
 * Deletes the Old ObjectService Folders at given path.
 * 
 * @param directoryPath base path of directory to delete folders
 * @param requiredList list of object services and its meta
*/
voltmxModelDeleteUnwantedObjectServicesFolders = function(directoryPath, requiredList){
    contents = fs.readdirSync(directoryPath, { withFileTypes: true });
    contents.forEach(item => {
        if(item.isDirectory()){
            if(!requiredList[item.name])
            {
                var filePath = path.resolve(directoryPath, item.name);
                fs.rmdirSync(filePath,{
                    recursive: true
                },(err) => {
                    if (err) 
                        throw err;
                });
                console.log("Deleting directory at path :" + filePath);
            }
        }
        else if("MasterRepoManagerConfig.js" == item.name){
            var filePath = path.resolve(directoryPath, "MasterRepoManagerConfig.js");
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
                console.log("Deleting file at path :" + filePath);
            }
        }
        //console.log(item.name);
    });
};


/**
 * Parse metadata to get table view for given indices.
 *
 * @param objectSvcName   name of the object in JSON data
 * @param objectName name of the table in JSON data
 * @returns {object} returns parsed JSON data
 */
voltmxModelGetTableView = function (objectSvcName, objectName) {
    var tableView = view.objectsvc_meta[objectSvcName][objectName];

    return tableView;
};

/**
 * Parse metadata to get custom verbs view for given indices.
 *
 * @param objectSvcName   name of the object in JSON data
 * @param objectName name of the table in JSON data
 * @returns {object} returns parsed JSON data
 */
voltmxModelGetVerbsTableView = function (objectSvcName, objectName) {
    var verbsTableView = verbsView.objectsvc_verbs_meta[objectSvcName][objectName];

    return verbsTableView;
};


/**
 * Create the repository file for models.
 *
 * @param verbsTableView JSON data for custom verbs in a table
 * @param tableView      JSON data for a table
 * @returns {object}       modified tableView
 */
voltmxModelCreateRepositoryFile = function (verbsTableView, tableView) {

    //Filtering out the custom verbs as the verbs metadata has both custom and dafault verbs and
    //we require only custom verbs like "binary verbs" to generate models.
    var customView = verbsTableView.verbs.filter(x => x.operation !== 'create' && x.operation !== 'get'
        && x.operation !== 'update' && x.operation !== "delete" && x.operation !== 'partialupdate');

    if (!voltmxModelIsNullOrUndefinedOrEmptyObject(customView)) {
        tableView.verbs = customView;
        modelData = codeGenerationEngine.call(voltmxModelfetchRenderedData, path.resolve(__dirname, "MDARepositoryTemplate"), tableView);
        var repositoryPath = path.resolve(filePath, "Repository.js");
        voltmxModelWriteDataToFile(modelData, repositoryPath);
        console.log("Generating file at " + repositoryPath);
    }

    return tableView;
};

/**
 * Create directory, files, generate models and save models generated to respective files.
 *
 * @param metadataMap                    service and verb metadata for object service mapped to file name
 * @param targetDirectoryForModels       base path of directory to save files
 * @returns {boolean}    true/exception for model generation success/failure
 */
voltmxModelGenerateModels = function (metadataMap, targetDirectoryForModels) {
    var tableView = {};
    var objectSvcName, objectName, noOfObjectSvc, noOfObjects;
    schemaView = "";

    voltmxModelCreateViewsFromMetadata(metadataMap);

    noOfObjectSvc = Object.keys(view.objectsvc_meta).length;
    console.log(noOfObjectSvc + " object services found.");
    try {
        for (var i = 0; i < noOfObjectSvc; i++) {
            objectSvcName = Object.keys(view.objectsvc_meta)[i];
            noOfObjects = Object.keys(view.objectsvc_meta[Object.keys(view.objectsvc_meta)[i]]).length;

            voltmxModelCreateDirectory(path.resolve(targetDirectoryForModels, objectSvcName),true);

            for (var j = 0; j < noOfObjects; j++) {
                objectName = Object.keys(view.objectsvc_meta[Object.keys(view.objectsvc_meta)[i]])[j];
                tableView = voltmxModelGetTableView(objectSvcName, objectName);
                verbsTableView = voltmxModelGetVerbsTableView(objectSvcName, objectName);

                filePath = path.resolve(targetDirectoryForModels, objectSvcName, objectName);
                console.log("path : " + filePath);
                voltmxModelCreateDirectory(filePath,true);

                tableView = voltmxModelCreateRepositoryFile(verbsTableView, tableView);
                voltmxModelCreateSchemaView(objectName, objectSvcName, tableView);

                modelData = codeGenerationEngine.call(voltmxModelfetchRenderedData, path.resolve(__dirname, "MDAModelTemplate"), tableView);
                var modelPath = path.resolve(filePath, "Model.js");
                voltmxModelWriteDataToFile(modelData, modelPath);
                console.log("Generating file at " + modelPath);

                modelData = codeGenerationEngine.call(voltmxModelfetchRenderedData, path.resolve(__dirname, "MDAMappingTemplate"), tableView);
                var mfConfigPath = path.resolve(filePath, "MF_Config.js");
                voltmxModelWriteDataToFile(modelData, mfConfigPath);
                console.log("Generating file at " + mfConfigPath);
            }
        }

        voltmxModelDeleteUnwantedObjectServicesFolders(targetDirectoryForModels, view.objectsvc_meta);

        // Saving original schema for RepoConfig.js
        var tempSchemaView = schemaView;

        schemaView = '{"objectsvc_meta":[' + schemaView + "]}";
        modelData = codeGenerationEngine.call(voltmxModelfetchRenderedData, path.resolve(__dirname, "MDARepoManagerConfig"), JSON.parse(schemaView));
        var repoManagerPath = path.resolve(targetDirectoryForModels, "RepoManagerConfig.js");
        voltmxModelWriteDataToFile(modelData, repoManagerPath);
        
        // Caching repo manager config data for Master repo manager config file generation
        var configPath = path.resolve(targetDirectoryForModels, "RepoConfig.js");
        voltmxModelWriteDataToFile(tempSchemaView, configPath);
        console.log("Generating file at " + repoManagerPath);
        return true;
    } catch (exception) {
        return exception;
    }
};

/**
 * Generate Master RepoManager file, from all the sources directory RepoConfig.js to destination directory.
 *
 * @param sources      Source directories for config files
 * @param destination  destination directory to save master respo manager config
 * @returns {boolean}  true/exception for generation of master repo success/failure
 */
voltmxModelMasterRepoManagerGenerator = function(sources, destination) {

    var scheme = "";
    try {
        for (var i = 0; i < sources.length; i++) {
            var filePath = path.resolve(sources[i], "RepoConfig.js")
            var obj = fs.readFileSync(filePath, 'utf8');
            
            if(!voltmxModelIsNullOrUndefinedOrEmptyObject(obj)) {
                scheme = scheme + "," + obj;
            } else {
                console.log("Empty RepoConfig.js found at: " + filePath);
            }
        }

        if(voltmxModelIsNullOrUndefinedOrEmptyObject(scheme.substring(1))) {
            console.log("Generation of Master RepoConfig file failed");
            return "Generation of Master RepoConfig Failed.";
        }

        scheme = '{"objectsvc_meta":[' + scheme.substring(1) + "]}";
        modelData = codeGenerationEngine.call(voltmxModelfetchRenderedData, path.resolve(__dirname, "MDARepoManagerConfig"), JSON.parse(scheme));

        voltmxModelCreateDirectory(destination,false);
        var repoManagerPath = path.resolve(destination, "MasterRepoManagerConfig.js");

        voltmxModelWriteDataToFile(modelData, repoManagerPath);
        console.log("Generated Master RepoConfig file at " + repoManagerPath);

        return true;
    } catch (exception) {
        return exception;
    }
}

module.exports = {
    voltmxModelGenerateModels,
    voltmxModelMasterRepoManagerGenerator
};