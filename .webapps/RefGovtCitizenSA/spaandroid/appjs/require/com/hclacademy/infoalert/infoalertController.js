define("com/hclacademy/infoalert/userinfoalertController", function() {
    return {};
});
define("com/hclacademy/infoalert/infoalertControllerActions", {
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** onClick defined for btnAlertOK **/
    AS_Button_d9163928d8484284867a96aa4ef625c2: function AS_Button_d9163928d8484284867a96aa4ef625c2(eventobject) {
        var self = this;
        self.view.isVisible = false;
    }
});
define("com/hclacademy/infoalert/infoalertController", ["com/hclacademy/infoalert/userinfoalertController", "com/hclacademy/infoalert/infoalertControllerActions"], function() {
    var controller = require("com/hclacademy/infoalert/userinfoalertController");
    var actions = require("com/hclacademy/infoalert/infoalertControllerActions");
    for (var key in actions) {
        controller[key] = actions[key];
    }
    return controller;
});
