define("RefEComplaintsMA/userfrmEComplaintCategoriesController", {});
define("RefEComplaintsMA/frmEComplaintCategoriesControllerActions", {
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** postShow defined for frmEComplaintCategories **/
    AS_Form_id732fc0bfcb444aab538e01dd6788c6: function AS_Form_id732fc0bfcb444aab538e01dd6788c6(eventobject) {
        var self = this;

        function INVOKE_SERVICE_bc970f5294684057b9618f40224bf575_Callback(ComplaintCategory) {
            self.view.categories.segCategories.widgetDataMap = {
                "lblCategory": "Category"
            };
            self.view.categories.segCategories.setData(ComplaintCategory.records);
            voltmx.application.dismissLoadingScreen();
        }
        voltmx.application.showLoadingScreen(null, "Fetching complaint categories ...", constants.LOADING_SCREEN_POSITION_FULL_SCREEN, true, true, {});
        if (ComplaintCategory_inputparam == undefined) {
            var ComplaintCategory_inputparam = {};
        }
        ComplaintCategory_inputparam["serviceID"] = "EComplaints$ComplaintCategory$get";
        ComplaintCategory_inputparam["options"] = {
            "access": "online",
            "CRUD_TYPE": "get"
        };
        var ComplaintCategory_httpheaders = {};
        ComplaintCategory_inputparam["httpheaders"] = ComplaintCategory_httpheaders;
        var ComplaintCategory_httpconfigs = {};
        ComplaintCategory_inputparam["httpconfig"] = ComplaintCategory_httpconfigs;
        EComplaints$ComplaintCategory$get = mfobjectsecureinvokerasync(ComplaintCategory_inputparam, "EComplaints", "ComplaintCategory", INVOKE_SERVICE_bc970f5294684057b9618f40224bf575_Callback);
    },
    /** onTouchEnd defined for imgMenu **/
    AS_Image_cac4e58d220b4d07a21af3d6d807ae92: function AS_Image_cac4e58d220b4d07a21af3d6d807ae92(eventobject, x, y) {
        var self = this;

        function _i8ff1f1a84944d70a30cd631a394e82c_Callback() {}
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
            "animationEnd": _i8ff1f1a84944d70a30cd631a394e82c_Callback
        });
    },
    /** onTouchEnd defined for imgBack **/
    AS_Image_e310ed4cad51499da8f210a794972e70: function AS_Image_e310ed4cad51499da8f210a794972e70(eventobject, x, y) {
        var self = this;
        var ntf = new voltmx.mvc.Navigation("frmEComplaintsDashboard");
        ntf.navigate();
    },
    /** onRowClick defined for segCategories **/
    AS_Segment_e30f2fdff2284e47ba5496bae1d30959: function AS_Segment_e30f2fdff2284e47ba5496bae1d30959(eventobject, sectionNumber, rowNumber) {
        var self = this;
        var ntf = new voltmx.mvc.Navigation("frmEComplaintsCreate");
        ntf.navigate({
            "segCategories_selectedRowItems": self.view.categories.segCategories.selectedRowItems,
            "_meta_": {
                "eventName": "onRowClick",
                "widgetId": ""
            }
        });
    },
    /** onRowClick defined for segMenu **/
    AS_Segment_i50dab2e48b24feda1d7221c9b4958b5: function AS_Segment_i50dab2e48b24feda1d7221c9b4958b5(eventobject, sectionNumber, rowNumber) {
        var self = this;

        function _j09b73aa0a9a469796449110d3658a4f_Callback() {
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
            "animationEnd": _j09b73aa0a9a469796449110d3658a4f_Callback
        });
    }
});
define("RefEComplaintsMA/frmEComplaintCategoriesController", ["RefEComplaintsMA/userfrmEComplaintCategoriesController", "RefEComplaintsMA/frmEComplaintCategoriesControllerActions"], function() {
    var controller = require("RefEComplaintsMA/userfrmEComplaintCategoriesController");
    var controllerActions = ["RefEComplaintsMA/frmEComplaintCategoriesControllerActions"];
    return voltmx.visualizer.mixinControllerActions(controller, controllerActions);
});
