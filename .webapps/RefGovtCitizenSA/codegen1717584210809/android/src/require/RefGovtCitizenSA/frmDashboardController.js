define("RefGovtCitizenSA/userfrmDashboardController", {});
define("RefGovtCitizenSA/frmDashboardControllerActions", {
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** postShow defined for frmDashboard **/
    AS_Form_ic671ad9d51e45908e50452cdff85652: function AS_Form_ic671ad9d51e45908e50452cdff85652(eventobject) {
        var self = this;

        function INVOKE_SERVICE_c8258f312a43488c82d524aee0d59a6f_Callback(status, getNews) {
            voltmx.application.dismissLoadingScreen();
            if ((getNews !== null) && (getNews.opstatus === 0)) {
                if ((getNews.channel !== null) && (getNews.channel.length > 0)) {
                    self.view.newsarticles.segLatestNews.widgetDataMap = {
                        "lblTitle": "title",
                        "imgDisplayPic": "media"
                    };
                    self.view.newsarticles.segLatestNews.setData(getNews.channel);
                } else {
                    voltmx.print("### No news articles returned.");
                }
            } else {
                voltmx.print("### Error occurred in Foundry layer while fetching news. OPSTATUS: " + getNews.opstatus);
            }
        }
        voltmx.application.showLoadingScreen(null, "Fetching news articles ...", constants.LOADING_SCREEN_POSITION_FULL_SCREEN, true, true, {});
        if (getNews_inputparam == undefined) {
            var getNews_inputparam = {};
        }
        getNews_inputparam["serviceID"] = "VMXBootcampNewsFeed$getNews";
        getNews_inputparam["newsType"] = gblNewsPreference;
        var getNews_httpheaders = {};
        getNews_inputparam["httpheaders"] = getNews_httpheaders;
        var getNews_httpconfigs = {};
        getNews_inputparam["httpconfig"] = getNews_httpconfigs;
        VMXBootcampNewsFeed$getNews = mfintegrationsecureinvokerasync(getNews_inputparam, "VMXBootcampNewsFeed", "getNews", INVOKE_SERVICE_c8258f312a43488c82d524aee0d59a6f_Callback);
    },
    /** onRowClick defined for segMenu **/
    onRowClickHandlerForSegMenuOnFrmDashboard: function onRowClickHandlerForSegMenuOnFrmDashboard(eventobject, sectionNumber, rowNumber) {
        var self = this;

        function MOVE_ACTION_d2969e5f760746ec95ebee8fe1e28744_Callback() {
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
            "animationEnd": MOVE_ACTION_d2969e5f760746ec95ebee8fe1e28744_Callback
        });
    },
    /** onTouchEnd defined for btnGrievances **/
    onTouchEndHandlerForBtnGrievancesOnFrmDashboard: function onTouchEndHandlerForBtnGrievancesOnFrmDashboard(eventobject, x, y) {
        var self = this;
        var ntf = new voltmx.mvc.Navigation({
            "appName": "RefEComplaintsMA",
            "friendlyName": "frmEComplaintsDashboard"
        });
        ntf.navigate();
    },
    /** onTouchEnd defined for btnRequests **/
    onTouchEndHandlerForBtnRequestsOnFrmDashboard: function onTouchEndHandlerForBtnRequestsOnFrmDashboard(eventobject, x, y) {
        var self = this;
        var ntf = new voltmx.mvc.Navigation({
            "appName": "RefERequestsMA",
            "friendlyName": "frmERequestsDashboard"
        });
        ntf.navigate();
    },
    /** onTouchEnd defined for btnWeatherAlert **/
    onTouchEndHandlerForBtnWeatherAlertOnFrmDashboard: function onTouchEndHandlerForBtnWeatherAlertOnFrmDashboard(eventobject, x, y) {
        var self = this;
        var ntf = new voltmx.mvc.Navigation("frmWeather");
        ntf.navigate();
    },
    /** onTouchEnd defined for imgMenu **/
    onTouchEndHandlerForImgMenuOnFrmDahshboard: function onTouchEndHandlerForImgMenuOnFrmDahshboard(eventobject, x, y) {
        var self = this;

        function MOVE_ACTION_f15e1aab6f2046a19c88fb9222132bfe_Callback() {}
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
            "animationEnd": MOVE_ACTION_f15e1aab6f2046a19c88fb9222132bfe_Callback
        });
    },
    /** preShow defined for frmDashboard **/
    preShowHandlerForFrmDashboard: function preShowHandlerForFrmDashboard(eventobject) {
        var self = this;

        function GET_USER_PROFILE_de81d739a2e74e66b3343ccb17d2675d_Success(response) {
            var profile = JSON.parse(response._provider_profile);
            self.view.lblWelcomeMessage.text = "Welcome " + profile.firstName + " " + profile.lastName;
        }

        function GET_USER_PROFILE_de81d739a2e74e66b3343ccb17d2675d_Failure(error) {}
        if ((this.getPreviousForm() === "frmLogin") && this.navigationContext && this.navigationContext._meta_ && (this.navigationContext._meta_.widgetId === "btnLogin") && (this.navigationContext._meta_.eventName === "onClick")) {
            gblLoggedInUserID = this.navigationContext.tbxUserName_text;
        }
        var identitySvc = voltmx.sdk.getCurrentInstance().getIdentityService("VMXBootcampIdentity");
        identitySvc.getUserAttributes(GET_USER_PROFILE_de81d739a2e74e66b3343ccb17d2675d_Success, GET_USER_PROFILE_de81d739a2e74e66b3343ccb17d2675d_Failure);
    }
});
define("RefGovtCitizenSA/frmDashboardController", ["RefGovtCitizenSA/userfrmDashboardController", "RefGovtCitizenSA/frmDashboardControllerActions"], function() {
    var controller = require("RefGovtCitizenSA/userfrmDashboardController");
    var controllerActions = ["RefGovtCitizenSA/frmDashboardControllerActions"];
    return voltmx.visualizer.mixinControllerActions(controller, controllerActions);
});
