define("RefEComplaintsMA/userfrmEComplaintsDashboardController", {});
define("RefEComplaintsMA/frmEComplaintsDashboardControllerActions", {
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** onTouchEnd defined for imgBack **/
    AS_Image_d7d6917d5d714aaf911cff58cff1583e: function AS_Image_d7d6917d5d714aaf911cff58cff1583e(eventobject, x, y) {
        var self = this;
        var ntf = new voltmx.mvc.Navigation({
            "appName": "RefGovtCitizenSA",
            "friendlyName": "frmDashboard"
        });
        ntf.navigate();
    },
    /** onTouchEnd defined for imgMenu **/
    AS_Image_f50b09db2b1945de8ed31ac35027eb6f: function AS_Image_f50b09db2b1945de8ed31ac35027eb6f(eventobject, x, y) {
        var self = this;

        function _da6999e9702f42e094ce47d5cfae989f_Callback() {}
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
            "animationEnd": _da6999e9702f42e094ce47d5cfae989f_Callback
        });
    },
    /** onRowClick defined for segMenu **/
    AS_Segment_dad0b862a2fb404785f83f69d316f3be: function AS_Segment_dad0b862a2fb404785f83f69d316f3be(eventobject, sectionNumber, rowNumber) {
        var self = this;

        function _c3e6b4402057446c8dec7af114640980_Callback() {
            if (self.view.hamburgermenu.segMenu.selectedRowItems[0].lblMenuOption === "Dashboard") {
                var ntf = new voltmx.mvc.Navigation({
                    "appName": "RefGovtCitizenSA",
                    "friendlyName": "frmDashboard"
                });
                ntf.navigate();
            } else if (self.view.hamburgermenu.segMenu.selectedRowItems[0].lblMenuOption === "Complaints") {
                var ntf = new voltmx.mvc.Navigation("frmEComplaintsDashboard");
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
                var ntf = new voltmx.mvc.Navigation({
                    "appName": "RefERequestsMA",
                    "friendlyName": "frmERequestsDashboard"
                });
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
            "animationEnd": _c3e6b4402057446c8dec7af114640980_Callback
        });
    },
    /** onTouchEnd defined for btnPreviousComplaints **/
    AS_UWI_ae4c5f30957542279bb34b3b236f8bec: function AS_UWI_ae4c5f30957542279bb34b3b236f8bec(eventobject, x, y) {
        var self = this;
        var ntf = new voltmx.mvc.Navigation("frmEComplaintsFetch");
        ntf.navigate();
    },
    /** onTouchEnd defined for btnNewComplaint **/
    AS_UWI_b1e9e1ee47964c9e92d20e1b86d4ddf7: function AS_UWI_b1e9e1ee47964c9e92d20e1b86d4ddf7(eventobject, x, y) {
        var self = this;
        var ntf = new voltmx.mvc.Navigation("frmEComplaintCategories");
        ntf.navigate();
    }
});
define("RefEComplaintsMA/frmEComplaintsDashboardController", ["RefEComplaintsMA/userfrmEComplaintsDashboardController", "RefEComplaintsMA/frmEComplaintsDashboardControllerActions"], function() {
    var controller = require("RefEComplaintsMA/userfrmEComplaintsDashboardController");
    var controllerActions = ["RefEComplaintsMA/frmEComplaintsDashboardControllerActions"];
    return voltmx.visualizer.mixinControllerActions(controller, controllerActions);
});
