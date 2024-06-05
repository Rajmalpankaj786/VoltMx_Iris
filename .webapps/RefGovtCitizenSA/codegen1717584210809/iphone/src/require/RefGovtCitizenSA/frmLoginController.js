define("RefGovtCitizenSA/userfrmLoginController", {});
define("RefGovtCitizenSA/frmLoginControllerActions", {
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** onClick defined for btnLogin **/
    onClickHandlerForBtnLogin: function onClickHandlerForBtnLogin(eventobject) {
        var self = this;

        function INVOKE_SERVICE_h9a0969fa83e4038be1fa3ee3a0af6f2_Success(response) {
            voltmx.application.dismissLoadingScreen();
            var ntf = new voltmx.mvc.Navigation("frmDashboard");
            ntf.navigate({
                "tbxUserName_text": self.view.tbxUserName.text,
                "_meta_": {
                    "eventName": "onClick",
                    "widgetId": ""
                }
            });
        }

        function INVOKE_SERVICE_h9a0969fa83e4038be1fa3ee3a0af6f2_Failure(error) {
            voltmx.application.dismissLoadingScreen();

            function SHOW_ALERT_f331a3a494644d1c9fb617c2ec62f6c1_Callback() {
                SHOW_ALERT_f331a3a494644d1c9fb617c2ec62f6c1_True();
            }
            voltmx.ui.Alert({
                "alertType": constants.ALERT_TYPE_ERROR,
                "alertTitle": "Login",
                "yesLabel": "OK",
                "message": "Invalid Credentials.",
                "alertHandler": SHOW_ALERT_f331a3a494644d1c9fb617c2ec62f6c1_Callback
            }, {
                "iconPosition": constants.ALERT_ICON_POSITION_LEFT
            });
        }

        function SHOW_ALERT_f331a3a494644d1c9fb617c2ec62f6c1_True() {}
        voltmx.application.showLoadingScreen(null, "Identity service call in progress ...", constants.LOADING_SCREEN_POSITION_FULL_SCREEN, true, true, {});
        if (login_inputparam == undefined) {
            var login_inputparam = {};
        }
        login_inputparam["serviceID"] = "VMXBootcampIdentity$login";
        login_inputparam["operation"] = "login";
        login_inputparam["userid"] = self.view.tbxUserName.text;
        login_inputparam["password"] = self.view.tbxPassword.text;
        VMXBootcampIdentity$login = mfidentityserviceinvoker("VMXBootcampIdentity", login_inputparam, INVOKE_SERVICE_h9a0969fa83e4038be1fa3ee3a0af6f2_Success, INVOKE_SERVICE_h9a0969fa83e4038be1fa3ee3a0af6f2_Failure);
    },
    /** onTextChange defined for tbxUserName **/
    onTextChangeHandlerForTbxUsername: function onTextChangeHandlerForTbxUsername(eventobject, changedtext) {
        var self = this;
        var userName = "";
        var password = "\"";
        userName = self.view.tbxUserName.text;
        password = self.view.tbxPassword.text;
        if ((userName == "") && (userName == undefined) && (password == "") && (password == undefined)) {
            this.view.btnLogin.setEnabled(false);
        } else {
            this.view.btnLogin.setEnabled(true);
        }
    },
    /** onTextChange defined for tbxPassword **/
    onTextChangeHandlerFprTbxPassword: function onTextChangeHandlerFprTbxPassword(eventobject, changedtext) {
        var self = this;
        var userName = "";
        var password = "\"";
        userName = self.view.tbxUserName.text;
        password = self.view.tbxPassword.text;
        if ((userName == "") && (userName == undefined) && (password == "") && (password == undefined)) {
            this.view.btnLogin.setEnabled(false);
        } else {
            this.view.btnLogin.setEnabled(true);
        }
    },
    /** preShow defined for frmLogin **/
    preshowHandlerForfrmLogin: function preshowHandlerForfrmLogin(eventobject) {
        var self = this;
        this.view.btnLogin.setEnabled(false);
    }
});
define("RefGovtCitizenSA/frmLoginController", ["RefGovtCitizenSA/userfrmLoginController", "RefGovtCitizenSA/frmLoginControllerActions"], function() {
    var controller = require("RefGovtCitizenSA/userfrmLoginController");
    var controllerActions = ["RefGovtCitizenSA/frmLoginControllerActions"];
    return voltmx.visualizer.mixinControllerActions(controller, controllerActions);
});
