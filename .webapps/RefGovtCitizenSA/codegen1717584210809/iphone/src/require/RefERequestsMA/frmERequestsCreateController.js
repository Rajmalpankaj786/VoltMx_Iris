define("RefERequestsMA/userfrmERequestsCreateController", {});
define("RefERequestsMA/frmERequestsCreateControllerActions", {
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** onMapping defined for frmERequestsCreate **/
    AS_Form_dab040edfb914172afcb161bcc3ab778: function AS_Form_dab040edfb914172afcb161bcc3ab778(eventobject) {
        var self = this;
        this.view.createRequest.lblTitleText = "Request " + this.navigationContext.segCategories_selectedRowItems[0].Category + ".";
        this.view.createRequest.lblCapturePhotoText = "Tap here to capture photo of request.";
        this.view.createRequest.complaintOrRequestObject.CategoryID = this.navigationContext.segCategories_selectedRowItems[0].CategoryID;
    },
    /** onTouchEnd defined for imgBack **/
    AS_Image_e74ef9a59fdc4fd09635de2f78fab4bc: function AS_Image_e74ef9a59fdc4fd09635de2f78fab4bc(eventobject, x, y) {
        var self = this;
        var ntf = new voltmx.mvc.Navigation("frmERequestsDashboard");
        ntf.navigate();
    },
    /** onTouchEnd defined for imgMenu **/
    AS_Image_je49995bd48845c8bea691fb45c870c8: function AS_Image_je49995bd48845c8bea691fb45c870c8(eventobject, x, y) {
        var self = this;

        function _b0a755f3f78d41119d3d76340088ee35_Callback() {}
        self.view.hamburgermenu.animate(voltmx.ui.createAnimation({
            "100": {
                "left": "0dp",
                "stepConfig": {
                    "timingFunction": voltmx.anim.EASE
                }
            }
        }), {
            "delay": 0,
            "iterationCount": 1,
            "fillMode": voltmx.anim.FILL_MODE_FORWARDS,
            "duration": 1
        }, {
            "animationEnd": _b0a755f3f78d41119d3d76340088ee35_Callback
        });
    },
    /** onRowClick defined for segMenu **/
    AS_Segment_g0419e50ba3943a4ba52503026b6589f: function AS_Segment_g0419e50ba3943a4ba52503026b6589f(eventobject, sectionNumber, rowNumber) {
        var self = this;

        function _cc55524b391e4538a6f18a65437d474f_Callback() {
            if (self.view.hamburgermenu.segMenu.selectedRowItems[0].lblMenuOption === "Dashboard") {
                var ntf = new voltmx.mvc.Navigation({
                    "appName": "RefGovtCitizenSA",
                    "friendlyName": "frmDashboard"
                });
                ntf.navigate();
            } else if (self.view.hamburgermenu.segMenu.selectedRowItems[0].lblMenuOption === "Complaints") {
                var ntf = new voltmx.mvc.Navigation({
                    "appName": "RefEComplaintsMA",
                    "friendlyName": "frmEComplaintsDashboard"
                });
                ntf.navigate();
            } else if (self.view.hamburgermenu.segMenu.selectedRowItems[0].lblMenuOption === "Weather Alert") {
                var ntf = new voltmx.mvc.Navigation({
                    "appName": "RefGovtCitizenSA",
                    "friendlyName": "frmWeather"
                });
                ntf.navigate();
            } else if (self.view.hamburgermenu.segMenu.selectedRowItems[0].lblMenuOption === "User Profile") {
                var ntf = new voltmx.mvc.Navigation({
                    "appName": "RefGovtCitizenSA",
                    "friendlyName": "frmUserProfile"
                });
                ntf.navigate();
            } else if (self.view.hamburgermenu.segMenu.selectedRowItems[0].lblMenuOption === "User Preferences") {
                var ntf = new voltmx.mvc.Navigation({
                    "appName": "RefGovtCitizenSA",
                    "friendlyName": "frmUserPreferences"
                });
                ntf.navigate();
            } else if (self.view.hamburgermenu.segMenu.selectedRowItems[0].lblMenuOption === "Requests") {
                var ntf = new voltmx.mvc.Navigation("frmERequestsDashboard");
                ntf.navigate();
            }
        }
        self.view.hamburgermenu.animate(voltmx.ui.createAnimation({
            "100": {
                "left": "-90%",
                "stepConfig": {
                    "timingFunction": voltmx.anim.EASE
                }
            }
        }), {
            "delay": 0,
            "iterationCount": 1,
            "fillMode": voltmx.anim.FILL_MODE_FORWARDS,
            "duration": 1
        }, {
            "animationEnd": _cc55524b391e4538a6f18a65437d474f_Callback
        });
    }
});
define("RefERequestsMA/frmERequestsCreateController", ["RefERequestsMA/userfrmERequestsCreateController", "RefERequestsMA/frmERequestsCreateControllerActions"], function() {
    var controller = require("RefERequestsMA/userfrmERequestsCreateController");
    var controllerActions = ["RefERequestsMA/frmERequestsCreateControllerActions"];
    return voltmx.visualizer.mixinControllerActions(controller, controllerActions);
});
