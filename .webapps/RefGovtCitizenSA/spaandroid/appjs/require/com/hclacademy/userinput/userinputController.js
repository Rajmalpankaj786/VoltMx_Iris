define("com/hclacademy/userinput/useruserinputController", function() {
    return {};
});
define("com/hclacademy/userinput/userinputControllerActions", {
    /* 
    This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
});
define("com/hclacademy/userinput/userinputController", ["com/hclacademy/userinput/useruserinputController", "com/hclacademy/userinput/userinputControllerActions"], function() {
    var controller = require("com/hclacademy/userinput/useruserinputController");
    var actions = require("com/hclacademy/userinput/userinputControllerActions");
    for (var key in actions) {
        controller[key] = actions[key];
    }
    return controller;
});
