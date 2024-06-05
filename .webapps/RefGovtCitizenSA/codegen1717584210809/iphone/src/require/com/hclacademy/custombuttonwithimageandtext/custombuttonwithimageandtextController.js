define("com/hclacademy/custombuttonwithimageandtext/usercustombuttonwithimageandtextController", function() {
    return {};
});
define("com/hclacademy/custombuttonwithimageandtext/custombuttonwithimageandtextControllerActions", {
    /* 
    This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
});
define("com/hclacademy/custombuttonwithimageandtext/custombuttonwithimageandtextController", ["com/hclacademy/custombuttonwithimageandtext/usercustombuttonwithimageandtextController", "com/hclacademy/custombuttonwithimageandtext/custombuttonwithimageandtextControllerActions"], function() {
    var controller = require("com/hclacademy/custombuttonwithimageandtext/usercustombuttonwithimageandtextController");
    var actions = require("com/hclacademy/custombuttonwithimageandtext/custombuttonwithimageandtextControllerActions");
    for (var key in actions) {
        controller[key] = actions[key];
    }
    return controller;
});
