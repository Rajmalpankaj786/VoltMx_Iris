define("RefERequestsMA/userfrmERequestsFetchController", {});
define("RefERequestsMA/frmERequestsFetchControllerActions", {
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** postShow defined for frmERequestsFetch **/
    AS_Form_h669fea56895494c9b76e115c5c8b046: function AS_Form_h669fea56895494c9b76e115c5c8b046(eventobject) {
        var self = this;

        function INVOKE_SERVICE_cf9ac559f1464fe3934ff8ac8180fe7d_Callback(Request) {
            voltmx.application.dismissLoadingScreen();
            self.view.segPreviousRequests.widgetDataMap = {
                "lblIDValue": "RequestID",
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
            for (i = 0; i < Request.records.length; i++) {
                Request.records[i].lblID = "ID";
                Request.records[i].lblCategory = "Category";
                Request.records[i].lblDescription = "Description";
                Request.records[i].lblAddress = "Address";
                Request.records[i].lblCreateDateTime = "CreateDateTime";
                Request.records[i].lblStatus = "Status";
                Request.records[i].lblAssignedTo = "AssignedTo";
                Request.records[i].lblCreatedBy = "CreatedBy";
            }
            self.view.segPreviousRequests.setData(Request.records);
        }
        voltmx.application.showLoadingScreen(null, "Fetching your list of requests ...", constants.LOADING_SCREEN_POSITION_FULL_SCREEN, true, true, {});
        if (Request_inputparam == undefined) {
            var Request_inputparam = {};
        }
        Request_inputparam["serviceID"] = "ERequests$Request$get";
        Request_inputparam["options"] = {
            "access": "online",
            "CRUD_TYPE": "get"
        };
        var odataParams = [];
        odataParams.push("$filter=" + "(SoftDeleteFlag ne true) or (SoftDeleteFlag eq null) and (CreatedBy eq " + gblLoggedInUserID + ")");
        Request_inputparam["options"]["odataurl"] = odataParams.join("&");
        var Request_httpheaders = {};
        Request_inputparam["httpheaders"] = Request_httpheaders;
        var Request_httpconfigs = {};
        Request_inputparam["httpconfig"] = Request_httpconfigs;
        ERequests$Request$get = mfobjectsecureinvokerasync(Request_inputparam, "ERequests", "Request", INVOKE_SERVICE_cf9ac559f1464fe3934ff8ac8180fe7d_Callback);
    },
    /** onTouchEnd defined for imgBack **/
    AS_Image_a485d184e23d41c7a18df6ecbd3db96f: function AS_Image_a485d184e23d41c7a18df6ecbd3db96f(eventobject, x, y) {
        var self = this;
        var ntf = new voltmx.mvc.Navigation("frmERequestsDashboard");
        ntf.navigate();
    },
    /** onTouchEnd defined for imgMenu **/
    AS_Image_e61503b5b0964d9f9c10128c527a8f86: function AS_Image_e61503b5b0964d9f9c10128c527a8f86(eventobject, x, y) {
        var self = this;

        function _a1b2b9cea4db4118b2ba74cd899b99d9_Callback() {}
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
            "animationEnd": _a1b2b9cea4db4118b2ba74cd899b99d9_Callback
        });
    },
    /** onRowClick defined for segMenu **/
    AS_Segment_f9089078f0be4c7f914411969afee867: function AS_Segment_f9089078f0be4c7f914411969afee867(eventobject, sectionNumber, rowNumber) {
        var self = this;

        function _j94dacf5495340408245cf1bdb72a100_Callback() {
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
            "animationEnd": _j94dacf5495340408245cf1bdb72a100_Callback
        });
    }
});
define("RefERequestsMA/frmERequestsFetchController", ["RefERequestsMA/userfrmERequestsFetchController", "RefERequestsMA/frmERequestsFetchControllerActions"], function() {
    var controller = require("RefERequestsMA/userfrmERequestsFetchController");
    var controllerActions = ["RefERequestsMA/frmERequestsFetchControllerActions"];
    return voltmx.visualizer.mixinControllerActions(controller, controllerActions);
});
