define("RefEComplaintsMA/userfrmEComplaintsCreateController", {});
define("RefEComplaintsMA/frmEComplaintsCreateControllerActions", {
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** onMapping defined for frmEComplaintsCreate **/
    AS_Form_f0bda912cfee4e32964c1949d3b87b62: function AS_Form_f0bda912cfee4e32964c1949d3b87b62(eventobject) {
        var self = this;
        this.view.createComplaint.lblTitleText = "Report " + this.navigationContext.segCategories_selectedRowItems[0].Category + " Complaint.";
        this.view.createComplaint.lblCapturePhotoText = "Tap here to capture photo of complaint.";
        this.view.createComplaint.complaintOrRequestObject.CategoryID = this.navigationContext.segCategories_selectedRowItems[0].CategoryID;
    },
    /** onTouchEnd defined for imgMenu **/
    AS_Image_d9c820d6e39d482ab4345198bb6887f3: function AS_Image_d9c820d6e39d482ab4345198bb6887f3(eventobject, x, y) {
        var self = this;

        function _ea442e98faa04b4e852c083e24cf78db_Callback() {}
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
            "animationEnd": _ea442e98faa04b4e852c083e24cf78db_Callback
        });
    },
    /** onTouchEnd defined for imgBack **/
    AS_Image_i22ad1d47ed4478384add660529b0ad2: function AS_Image_i22ad1d47ed4478384add660529b0ad2(eventobject, x, y) {
        var self = this;
        var ntf = new voltmx.mvc.Navigation("frmEComplaintsDashboard");
        ntf.navigate();
    },
    /** onRowClick defined for segMenu **/
    AS_Segment_jf5a798ab2b542f394267d60ec9a814d: function AS_Segment_jf5a798ab2b542f394267d60ec9a814d(eventobject, sectionNumber, rowNumber) {
        var self = this;

        function _b92e67725b674db2bd732eed7d4cd684_Callback() {
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
            "animationEnd": _b92e67725b674db2bd732eed7d4cd684_Callback
        });
    }
});
define("RefEComplaintsMA/frmEComplaintsCreateController", ["RefEComplaintsMA/userfrmEComplaintsCreateController", "RefEComplaintsMA/frmEComplaintsCreateControllerActions"], function() {
    var controller = require("RefEComplaintsMA/userfrmEComplaintsCreateController");
    var controllerActions = ["RefEComplaintsMA/frmEComplaintsCreateControllerActions"];
    return voltmx.visualizer.mixinControllerActions(controller, controllerActions);
});
