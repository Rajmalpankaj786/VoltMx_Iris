var path = require('path');
var fs = require('fs');
var voltmxutil = require('./utils');

var velocitytemplatesmap = require('./velocitytemplatesmap');
Engine = require('velocity').Engine;

var ns = {};

(function (ns) {

    ns.processSkinsbasedOnWidget = function(themeJSON) {
        var skinsObj = themeJSON;
        var widgetSkinsObj = {};

        if(Object.keys(skinsObj).length > 0) {
            for(var skinName in skinsObj) {
                var skinObj = skinsObj[skinName];
                var wtype = skinObj.wType;
                if(wtype == "TextField") {
                    wtype = "TextBox2";
                    skinObj.wType = "TextBox2";
                }
                if(!widgetSkinsObj[wtype]) {
                    widgetSkinsObj[wtype] = {};
                }

                widgetSkinsObj[wtype][skinName] = skinObj;
            }
        }

        return widgetSkinsObj;
    }


}(ns));

module.exports = ns;


