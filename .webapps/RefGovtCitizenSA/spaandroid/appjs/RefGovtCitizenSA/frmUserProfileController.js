define("RefGovtCitizenSA/userfrmUserProfileController", {});
define("RefGovtCitizenSA/frmUserProfileControllerActions", {
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** onRowClick defined for segMenu **/
    onRowClickHandlerForSegMenuOnFrmUserProfile: function onRowClickHandlerForSegMenuOnFrmUserProfile(eventobject, sectionNumber, rowNumber) {
        var self = this;

        function _f6cf6afbc11742ff92a4d61e15ca079e_Callback() {
            if (self.view.hamburgermenu.segMenu.selectedRowItems[0].lblMenuOption === "Dashboard") {
                var ntf = new voltmx.mvc.Navigation("frmDashboard");
                ntf.navigate();
            } else if (self.view.hamburgermenu.segMenu.selectedRowItems[0].lblMenuOption === "Complaints") {
                var ntf = new voltmx.mvc.Navigation({
                    "appName": "RefEComplaintsMA",
                    "friendlyName": "frmEComplaintsDashboard"
                });
                ntf.navigate();
            } else if (self.view.hamburgermenu.segMenu.selectedRowItems[0].lblMenuOption === "Weather Alert") {
                var ntf = new voltmx.mvc.Navigation("frmWeather");
                ntf.navigate();
            } else if (self.view.hamburgermenu.segMenu.selectedRowItems[0].lblMenuOption === "User Profile") {
                var ntf = new voltmx.mvc.Navigation("frmUserProfile");
                ntf.navigate();
            } else if (self.view.hamburgermenu.segMenu.selectedRowItems[0].lblMenuOption === "User Preferences") {
                var ntf = new voltmx.mvc.Navigation("frmUserPreferences");
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
            "animationEnd": _f6cf6afbc11742ff92a4d61e15ca079e_Callback
        });
    },
    /** onTouchEnd defined for imgBack **/
    onTouchEndHandlerForImgBackOnFrmUserProfile: function onTouchEndHandlerForImgBackOnFrmUserProfile(eventobject, x, y) {
        var self = this;
        var ntf = new voltmx.mvc.Navigation("frmDashboard");
        ntf.navigate();
    },
    /** onTouchEnd defined for imgMenu **/
    onTouchEndHandlerForImgMenuOnFrmUserProfile: function onTouchEndHandlerForImgMenuOnFrmUserProfile(eventobject, x, y) {
        var self = this;

        function _fde419fe042347e2adf535137a72bee7_Callback() {}
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
            "animationEnd": _fde419fe042347e2adf535137a72bee7_Callback
        });
    }
});
define("RefGovtCitizenSA/frmUserProfileController", ["RefGovtCitizenSA/userfrmUserProfileController", "RefGovtCitizenSA/frmUserProfileControllerActions"], function() {
    var controller = require("RefGovtCitizenSA/userfrmUserProfileController");
    var controllerActions = ["RefGovtCitizenSA/frmUserProfileControllerActions"];
    return voltmx.visualizer.mixinControllerActions(controller, controllerActions);
});
