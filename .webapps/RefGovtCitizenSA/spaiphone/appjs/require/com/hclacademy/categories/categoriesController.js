define("com/hclacademy/categories/usercategoriesController", function() {
    return {};
});
define("com/hclacademy/categories/categoriesControllerActions", {
    /* 
    This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
});
define("com/hclacademy/categories/categoriesController", ["com/hclacademy/categories/usercategoriesController", "com/hclacademy/categories/categoriesControllerActions"], function() {
    var controller = require("com/hclacademy/categories/usercategoriesController");
    var actions = require("com/hclacademy/categories/categoriesControllerActions");
    for (var key in actions) {
        controller[key] = actions[key];
    }
    return controller;
});
