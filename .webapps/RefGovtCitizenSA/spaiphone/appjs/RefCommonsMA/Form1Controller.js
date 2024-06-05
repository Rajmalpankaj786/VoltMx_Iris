define("RefCommonsMA/userForm1Controller", {
    //Type your controller code here 
});
define("RefCommonsMA/Form1ControllerActions", {
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
});
define("RefCommonsMA/Form1Controller", ["RefCommonsMA/userForm1Controller", "RefCommonsMA/Form1ControllerActions"], function() {
    var controller = require("RefCommonsMA/userForm1Controller");
    var controllerActions = ["RefCommonsMA/Form1ControllerActions"];
    return voltmx.visualizer.mixinControllerActions(controller, controllerActions);
});
