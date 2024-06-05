define("RefERequestsMA/userfrmERequestsDashboardController", {});
define("RefERequestsMA/frmERequestsDashboardControllerActions", {
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** onTouchEnd defined for imgBack **/
    AS_Image_ab5dc6c87b8546d4b9564a9f63982f8f: function AS_Image_ab5dc6c87b8546d4b9564a9f63982f8f(eventobject, x, y) {
        var self = this;
        var ntf = new voltmx.mvc.Navigation({
            "appName": "RefGovtCitizenSA",
            "friendlyName": "frmDashboard"
        });
        ntf.navigate();
    },
    /** onTouchEnd defined for imgMenu **/
    AS_Image_de42f79df6c7435b8081bd43388aa2f5: function AS_Image_de42f79df6c7435b8081bd43388aa2f5(eventobject, x, y) {
        var self = this;

        function _de925999d57141ce8233edad8303414e_Callback() {}
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
            "animationEnd": _de925999d57141ce8233edad8303414e_Callback
        });
    },
    /** onRowClick defined for segMenu **/
    AS_Segment_gc072928b8d64ba8af80a9c6f18e5a0f: function AS_Segment_gc072928b8d64ba8af80a9c6f18e5a0f(eventobject, sectionNumber, rowNumber) {
        var self = this;

        function _gfa8d149643849eab5c680a8aa0aec91_Callback() {
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
            "animationEnd": _gfa8d149643849eab5c680a8aa0aec91_Callback
        });
    },
    /** onTouchEnd defined for btnNewRequest **/
    AS_UWI_d80368c95f884823b85bce5b7f4494cd: function AS_UWI_d80368c95f884823b85bce5b7f4494cd(eventobject, x, y) {
        var self = this;
        var ntf = new voltmx.mvc.Navigation("frmERequestsCategories");
        ntf.navigate();
    },
    /** onTouchEnd defined for btnPreviousRequests **/
    AS_UWI_f6ebef8695694c05b8c3f96e8b6a310b: function AS_UWI_f6ebef8695694c05b8c3f96e8b6a310b(eventobject, x, y) {
        var self = this;
        var ntf = new voltmx.mvc.Navigation("frmERequestsFetch");
        ntf.navigate();
    }
});
define("RefERequestsMA/frmERequestsDashboardController", ["RefERequestsMA/userfrmERequestsDashboardController", "RefERequestsMA/frmERequestsDashboardControllerActions"], function() {
    var controller = require("RefERequestsMA/userfrmERequestsDashboardController");
    var controllerActions = ["RefERequestsMA/frmERequestsDashboardControllerActions"];
    return voltmx.visualizer.mixinControllerActions(controller, controllerActions);
});
