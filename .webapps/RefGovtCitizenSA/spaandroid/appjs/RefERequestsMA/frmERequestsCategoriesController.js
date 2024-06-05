define("RefERequestsMA/userfrmERequestsCategoriesController", {});
define("RefERequestsMA/frmERequestsCategoriesControllerActions", {
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** postShow defined for frmERequestsCategories **/
    AS_Form_ffa66c70dc5c4f019a374e96e8c590c5: function AS_Form_ffa66c70dc5c4f019a374e96e8c590c5(eventobject) {
        var self = this;

        function INVOKE_SERVICE_d970044a9c044d70831ce082f7d82f03_Callback(RequestCategory) {
            self.view.categories.segCategories.widgetDataMap = {
                "lblCategory": "Category"
            };
            self.view.categories.segCategories.setData(RequestCategory.records);
            voltmx.application.dismissLoadingScreen();
        }
        voltmx.application.showLoadingScreen(null, "Fetching request categories ...", constants.LOADING_SCREEN_POSITION_FULL_SCREEN, true, true, {});
        if (RequestCategory_inputparam == undefined) {
            var RequestCategory_inputparam = {};
        }
        RequestCategory_inputparam["serviceID"] = "ERequests$RequestCategory$get";
        RequestCategory_inputparam["options"] = {
            "access": "online",
            "CRUD_TYPE": "get"
        };
        var RequestCategory_httpheaders = {};
        RequestCategory_inputparam["httpheaders"] = RequestCategory_httpheaders;
        var RequestCategory_httpconfigs = {};
        RequestCategory_inputparam["httpconfig"] = RequestCategory_httpconfigs;
        ERequests$RequestCategory$get = mfobjectsecureinvokerasync(RequestCategory_inputparam, "ERequests", "RequestCategory", INVOKE_SERVICE_d970044a9c044d70831ce082f7d82f03_Callback);
    },
    /** onTouchEnd defined for imgBack **/
    AS_Image_c5c195b4162a4dd8b49138c837c64d5a: function AS_Image_c5c195b4162a4dd8b49138c837c64d5a(eventobject, x, y) {
        var self = this;
        var ntf = new voltmx.mvc.Navigation("frmERequestsDashboard");
        ntf.navigate();
    },
    /** onTouchEnd defined for imgMenu **/
    AS_Image_hb106395d17944399318ac4e679c2701: function AS_Image_hb106395d17944399318ac4e679c2701(eventobject, x, y) {
        var self = this;

        function _h82bc160e1724a5b954c0ffac3c9c1f0_Callback() {}
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
            "animationEnd": _h82bc160e1724a5b954c0ffac3c9c1f0_Callback
        });
    },
    /** onRowClick defined for segCategories **/
    AS_Segment_becb8cdafac94bcfa6a99ecf30310a53: function AS_Segment_becb8cdafac94bcfa6a99ecf30310a53(eventobject, sectionNumber, rowNumber) {
        var self = this;
        var ntf = new voltmx.mvc.Navigation("frmERequestsCreate");
        ntf.navigate({
            "segCategories_selectedRowItems": self.view.categories.segCategories.selectedRowItems,
            "_meta_": {
                "eventName": "onRowClick",
                "widgetId": ""
            }
        });
    },
    /** onRowClick defined for segMenu **/
    AS_Segment_d12b50b0bcdc48d7a9b3014b05c05ee9: function AS_Segment_d12b50b0bcdc48d7a9b3014b05c05ee9(eventobject, sectionNumber, rowNumber) {
        var self = this;

        function _i6eb0ab3e2e84ef6a9d677da619d7c27_Callback() {
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
            "animationEnd": _i6eb0ab3e2e84ef6a9d677da619d7c27_Callback
        });
    }
});
define("RefERequestsMA/frmERequestsCategoriesController", ["RefERequestsMA/userfrmERequestsCategoriesController", "RefERequestsMA/frmERequestsCategoriesControllerActions"], function() {
    var controller = require("RefERequestsMA/userfrmERequestsCategoriesController");
    var controllerActions = ["RefERequestsMA/frmERequestsCategoriesControllerActions"];
    return voltmx.visualizer.mixinControllerActions(controller, controllerActions);
});
