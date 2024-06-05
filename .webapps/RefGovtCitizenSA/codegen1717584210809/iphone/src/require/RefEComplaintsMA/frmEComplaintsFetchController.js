define("RefEComplaintsMA/userfrmEComplaintsFetchController", {});
define("RefEComplaintsMA/frmEComplaintsFetchControllerActions", {
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** postShow defined for frmEComplaintsFetch **/
    AS_Form_g18e135d74bd404b82a73d7fc136d534: function AS_Form_g18e135d74bd404b82a73d7fc136d534(eventobject) {
        var self = this;

        function INVOKE_SERVICE_ceb1915e3b6e41efb67d0073ea0d7890_Callback(Complaint) {
            voltmx.application.dismissLoadingScreen();
            self.view.segPreviousComplaints.widgetDataMap = {
                "lblIDValue": "ComplaintID",
                "lblCategoryValue": "CategoryID",
                "lblDescriptionValue": "Description",
                "lblAddressValue": "Location",
                "lblCreateDateTimeValue": "CreatedDateTime",
                "lblStatusValue": "Status",
                "lblAssignedToValue": "AssignedTo",
                "lblCreatedByValue": "CreatedBy",
                "lblID": "lblID",
                "lblCategory": "lblCategory",
                "lblDescription": "lblDescription",
                "lblAddress": "lblAddress",
                "lblCreateDateTime": "lblCreateDateTime",
                "lblStatus": "lblStatus",
                "lblAssignedTo": "lblAssignedTo",
                "lblCreatedBy": "lblCreatedBy"
            };
            for (i = 0; i < Complaint.records.length; i++) {
                Complaint.records[i].lblID = "ID";
                Complaint.records[i].lblCategory = "Category";
                Complaint.records[i].lblDescription = "Description";
                Complaint.records[i].lblAddress = "Address";
                Complaint.records[i].lblCreateDateTime = "CreateDateTime";
                Complaint.records[i].lblStatus = "Status";
                Complaint.records[i].lblAssignedTo = "AssignedTo";
                Complaint.records[i].lblCreatedBy = "CreatedBy";
            }
            self.view.segPreviousComplaints.setData(Complaint.records);
        }
        voltmx.application.showLoadingScreen(null, "Fetching your list of complaints ...", constants.LOADING_SCREEN_POSITION_FULL_SCREEN, true, true, {});
        if (Complaint_inputparam == undefined) {
            var Complaint_inputparam = {};
        }
        Complaint_inputparam["serviceID"] = "EComplaints$Complaint$get";
        Complaint_inputparam["options"] = {
            "access": "online",
            "CRUD_TYPE": "get"
        };
        var odataParams = [];
        odataParams.push("$filter=" + "(SoftDeleteFlag ne true) or (SoftDeleteFlag eq null) and (CreatedBy eq " + gblLoggedInUserID + ")");
        Complaint_inputparam["options"]["odataurl"] = odataParams.join("&");
        var Complaint_httpheaders = {};
        Complaint_inputparam["httpheaders"] = Complaint_httpheaders;
        var Complaint_httpconfigs = {};
        Complaint_inputparam["httpconfig"] = Complaint_httpconfigs;
        EComplaints$Complaint$get = mfobjectsecureinvokerasync(Complaint_inputparam, "EComplaints", "Complaint", INVOKE_SERVICE_ceb1915e3b6e41efb67d0073ea0d7890_Callback);
    },
    /** onTouchEnd defined for imgMenu **/
    AS_Image_d8684756152740ac812611f2625b76e4: function AS_Image_d8684756152740ac812611f2625b76e4(eventobject, x, y) {
        var self = this;

        function _a6f32a1d0cf942549d43a8aafe8fade3_Callback() {}
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
            "animationEnd": _a6f32a1d0cf942549d43a8aafe8fade3_Callback
        });
    },
    /** onTouchEnd defined for imgBack **/
    AS_Image_fd5cf2814d904502ad174e48d7d8c66f: function AS_Image_fd5cf2814d904502ad174e48d7d8c66f(eventobject, x, y) {
        var self = this;
        var ntf = new voltmx.mvc.Navigation("frmEComplaintsDashboard");
        ntf.navigate();
    },
    /** onRowClick defined for segMenu **/
    AS_Segment_f5e6363b195c4c438b29b154d981333a: function AS_Segment_f5e6363b195c4c438b29b154d981333a(eventobject, sectionNumber, rowNumber) {
        var self = this;

        function _d1482c1e334f428493254a30d392095d_Callback() {
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
            "animationEnd": _d1482c1e334f428493254a30d392095d_Callback
        });
    }
});
define("RefEComplaintsMA/frmEComplaintsFetchController", ["RefEComplaintsMA/userfrmEComplaintsFetchController", "RefEComplaintsMA/frmEComplaintsFetchControllerActions"], function() {
    var controller = require("RefEComplaintsMA/userfrmEComplaintsFetchController");
    var controllerActions = ["RefEComplaintsMA/frmEComplaintsFetchControllerActions"];
    return voltmx.visualizer.mixinControllerActions(controller, controllerActions);
});
