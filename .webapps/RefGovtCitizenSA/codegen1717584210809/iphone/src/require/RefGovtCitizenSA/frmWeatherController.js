define("RefGovtCitizenSA/userfrmWeatherController", {});
define("RefGovtCitizenSA/frmWeatherControllerActions", {
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** postShow defined for frmWeather **/
    AS_Form_cecaa69d0e994da9bca00128c0b57281: function AS_Form_cecaa69d0e994da9bca00128c0b57281(eventobject) {
        var self = this;

        function INVOKE_SERVICE_c70a35f3d1c6467fa803f474e516f0b5_Callback(status, getWeatherDetails) {
            voltmx.application.dismissLoadingScreen();
            var locationData = [];
            locationData = [{
                lat: getWeatherDetails.lat,
                lon: getWeatherDetails.lon,
                name: getWeatherDetails.state,
                desc: getWeatherDetails.description,
                calloutData: {
                    "lblMinTempValue": getWeatherDetails.temp_min,
                    "lblMaxTempValue": getWeatherDetails.temp_max,
                    "lblDescriptionValue": getWeatherDetails.description,
                    "lblStateValue": getWeatherDetails.state,
                    "lblCountryValue": getWeatherDetails.country,
                    "imgWeather": "weatherreport.png"
                }
            }];
            self.view.mapWeather.widgetDataMapForCallout = {
                "lblMinTempValue": "lblMinTempValue",
                "lblMaxTempValue": "lblMaxTempValue",
                "lblDescriptionValue": "lblDescriptionValue",
                "lblStateValue": "lblStateValue",
                "lblCountryValue": "lblCountryValue",
                "imgWeather": "imgWeather",
            };
            self.view.mapWeather.locationData = locationData;
        }
        voltmx.application.showLoadingScreen(null, "Fetching weather details ...", constants.LOADING_SCREEN_POSITION_FULL_SCREEN, true, true, {});
        if (getWeatherDetails_inputparam == undefined) {
            var getWeatherDetails_inputparam = {};
        }
        getWeatherDetails_inputparam["serviceID"] = "VMXBootcampWeatherByLocation$getWeatherDetails";
        getWeatherDetails_inputparam["lat"] = voltmx.visualizer.toString("47.60799140597074");
        getWeatherDetails_inputparam["lon"] = voltmx.visualizer.toString("-122.3389692401529");
        var getWeatherDetails_httpheaders = {};
        getWeatherDetails_inputparam["httpheaders"] = getWeatherDetails_httpheaders;
        var getWeatherDetails_httpconfigs = {};
        getWeatherDetails_inputparam["httpconfig"] = getWeatherDetails_httpconfigs;
        VMXBootcampWeatherByLocation$getWeatherDetails = mfintegrationsecureinvokerasync(getWeatherDetails_inputparam, "VMXBootcampWeatherByLocation", "getWeatherDetails", INVOKE_SERVICE_c70a35f3d1c6467fa803f474e516f0b5_Callback);
    },
    /** onRowClick defined for segMenu **/
    onRowClickHandlerForSegMenuOnFrmWeather: function onRowClickHandlerForSegMenuOnFrmWeather(eventobject, sectionNumber, rowNumber) {
        var self = this;

        function _cd4ee820aa7341d5a5a4ab297448eee0_Callback() {
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
            "animationEnd": _cd4ee820aa7341d5a5a4ab297448eee0_Callback
        });
    },
    /** onTouchEnd defined for imgBack **/
    onTouchEndHandlerForImgBackOnFrmWeather: function onTouchEndHandlerForImgBackOnFrmWeather(eventobject, x, y) {
        var self = this;
        var ntf = new voltmx.mvc.Navigation("frmDashboard");
        ntf.navigate();
    },
    /** onTouchEnd defined for imgMenu **/
    onTouchEndHandlerForImgMenuOnFrmWeather: function onTouchEndHandlerForImgMenuOnFrmWeather(eventobject, x, y) {
        var self = this;

        function _fb151c6f0a894facb573e7ba3a7ef4f0_Callback() {}
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
            "animationEnd": _fb151c6f0a894facb573e7ba3a7ef4f0_Callback
        });
    }
});
define("RefGovtCitizenSA/frmWeatherController", ["RefGovtCitizenSA/userfrmWeatherController", "RefGovtCitizenSA/frmWeatherControllerActions"], function() {
    var controller = require("RefGovtCitizenSA/userfrmWeatherController");
    var controllerActions = ["RefGovtCitizenSA/frmWeatherControllerActions"];
    return voltmx.visualizer.mixinControllerActions(controller, controllerActions);
});
