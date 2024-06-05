define("com/hclacademy/newsarticles/usernewsarticlesController", function() {
    return {};
});
define("com/hclacademy/newsarticles/newsarticlesControllerActions", {
    /* 
    This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
});
define("com/hclacademy/newsarticles/newsarticlesController", ["com/hclacademy/newsarticles/usernewsarticlesController", "com/hclacademy/newsarticles/newsarticlesControllerActions"], function() {
    var controller = require("com/hclacademy/newsarticles/usernewsarticlesController");
    var actions = require("com/hclacademy/newsarticles/newsarticlesControllerActions");
    for (var key in actions) {
        controller[key] = actions[key];
    }
    return controller;
});
