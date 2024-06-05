define("com/hclacademy/hamburgermenu/userhamburgermenuController", function() {
    return {
        /*
         * This function is responsible for navigation 
         * from hamburger menu
         */
        hamburgerMenuCallback: function() {
            var selectedMenuOption = this.view.segMenu.selectedRowItems[0].lblMenuOption;
            var navigationConfig = {
                "appName": "GovtCitizenSA",
                "friendlyName": "frmDashboard"
            };
            var dashboard = voltmx.i18n.getLocalizedString("dashboard");
            var requests = voltmx.i18n.getLocalizedString("requests");
            var complaints = voltmx.i18n.getLocalizedString("complaints");
            var weather = voltmx.i18n.getLocalizedString("weather");
            var userProfile = voltmx.i18n.getLocalizedString("userProfile");
            var userPreferences = voltmx.i18n.getLocalizedString("userPreferences");
            if (dashboard === selectedMenuOption) {
                navigationConfig.appName = "GovtCitizenSA";
                navigationConfig.friendlyName = "frmDashboard";
            } else if (requests === selectedMenuOption) {
                navigationConfig.appName = "ERequestsMA";
                navigationConfig.friendlyName = "frmERequestsDashboard";
            } else if (complaints === selectedMenuOption) {
                navigationConfig.appName = "EComplaintsMA";
                navigationConfig.friendlyName = "frmEComplaintsDashboard";
            } else if (weather === selectedMenuOption) {
                navigationConfig.appName = "GovtCitizenSA";
                navigationConfig.friendlyName = "frmWeather";
            } else if (userProfile === selectedMenuOption) {
                navigationConfig.appName = "GovtCitizenSA";
                navigationConfig.friendlyName = "frmUserProfile";
            } else if (userPreferences === selectedMenuOption) {
                navigationConfig.appName = "GovtCitizenSA";
                navigationConfig.friendlyName = "frmUserPreferences";
            }
            var navigationManager = new voltmx.mvc.Navigation(navigationConfig);
            navigationManager.navigate();
        }
    };
});
define("com/hclacademy/hamburgermenu/hamburgermenuControllerActions", {
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** onRowClick defined for segMenu **/
    AS_Segment_ff281e5d63c84b0fad38895ba3bd529b: function AS_Segment_ff281e5d63c84b0fad38895ba3bd529b(eventobject, sectionNumber, rowNumber) {
        var self = this;

        function MOVE_ACTION_ce23dc7eb4e24dfc87c7b4f5715f39fb_Callback() {
            self.hamburgerMenuCallback.call(this);
        }
        self.view.animate(voltmx.ui.createAnimation({
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
            "animationEnd": MOVE_ACTION_ce23dc7eb4e24dfc87c7b4f5715f39fb_Callback
        });
    }
});
define("com/hclacademy/hamburgermenu/hamburgermenuController", ["com/hclacademy/hamburgermenu/userhamburgermenuController", "com/hclacademy/hamburgermenu/hamburgermenuControllerActions"], function() {
    var controller = require("com/hclacademy/hamburgermenu/userhamburgermenuController");
    var actions = require("com/hclacademy/hamburgermenu/hamburgermenuControllerActions");
    for (var key in actions) {
        controller[key] = actions[key];
    }
    return controller;
});
