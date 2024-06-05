define("com/hclacademy/formheader/userformheaderController", function() {
    return {};
});
define("com/hclacademy/formheader/formheaderControllerActions", {
    /* 
    This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
});
define("com/hclacademy/formheader/formheaderController", ["com/hclacademy/formheader/userformheaderController", "com/hclacademy/formheader/formheaderControllerActions"], function() {
    var controller = require("com/hclacademy/formheader/userformheaderController");
    var actions = require("com/hclacademy/formheader/formheaderControllerActions");
    for (var key in actions) {
        controller[key] = actions[key];
    }
    return controller;
});
