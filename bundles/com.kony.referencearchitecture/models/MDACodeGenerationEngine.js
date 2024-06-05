/**
 * Created by : Inderpreet kaur
 * Copyright : HCL America, Inc., 2021
 *
 **/

/*
    Generates data for each file using templates and views.
 */

var fs = require('fs');
var Mustache = require('mustache');
var utils = require("./MDAModelUtils");

var templateDataMap = {};

/**
 * Create a mapping with template name and its data read from file for reusing it with different objects.
 *
 * @param templateFileName name of template file
 * @returns {string}   template data
 */
voltmxModelCreateTemplateDataMap = function(templateFileName) {
    if(voltmxModelIsNullOrUndefinedOrEmptyObject(templateDataMap[templateFileName])) {
        try {
            templateDataMap[templateFileName] = fs.readFileSync(templateFileName, 'utf8');
        } catch (exception) {
            throw exception
        }
    }
    return templateDataMap[templateFileName];
};

/**
 * Use mustache to render template with view data.
 *
 * @param templateData data for generating template
 * @param tableView    parsed JSON data for file generation
 * @returns {string}   rendered data
 */
voltmxModelRenderModelFromTemplateAndData = function (templateData, tableView) {
    return Mustache.render(templateData, tableView);
};

/**
 * Get model data for a table view parsed from object metadata.
 *
 * @param templateFileName   name of the template
 * @param tableView   parsed JSON data for file generation
 * @returns {string}  generated model to be read for file generation
 */
voltmxModelfetchRenderedData = function (templateFileName, tableView) {
    try {
        var templateData = voltmxModelCreateTemplateDataMap(templateFileName);
    } catch (exception) {
        throw exception
    }

    return voltmxModelRenderModelFromTemplateAndData(templateData, tableView);
};

module.exports = voltmxModelfetchRenderedData;