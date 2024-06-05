define("RefCommonsMA/userflxMapWeatherCalloutController", {
    //Type your controller code here 
});
define("RefCommonsMA/flxMapWeatherCalloutControllerActions", {
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
});
define("RefCommonsMA/flxMapWeatherCalloutController", ["RefCommonsMA/userflxMapWeatherCalloutController", "RefCommonsMA/flxMapWeatherCalloutControllerActions"], function() {
    var controller = require("RefCommonsMA/userflxMapWeatherCalloutController");
    var controllerActions = ["RefCommonsMA/flxMapWeatherCalloutControllerActions"];
    return voltmx.visualizer.mixinControllerActions(controller, controllerActions);
});
