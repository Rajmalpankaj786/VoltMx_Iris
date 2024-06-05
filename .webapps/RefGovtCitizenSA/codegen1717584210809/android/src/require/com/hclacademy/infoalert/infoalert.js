define(function() {
    return function(controller) {
        var infoalert = new voltmx.ui.FlexContainer(extendConfig({
            "autogrowMode": voltmx.flex.AUTOGROW_NONE,
            "centerX": "50%",
            "centerY": "50%",
            "clipBounds": false,
            "isMaster": true,
            "height": "100%",
            "id": "infoalert",
            "isVisible": true,
            "layoutType": voltmx.flex.FREE_FORM,
            "isModalContainer": false,
            "skin": "sknFlex4",
            "width": "100%",
            "zIndex": 1,
            "appName": "RefCommonsMA"
        }, controller.args[0], "infoalert"), extendConfig({
            "paddingInPixel": false
        }, controller.args[1], "infoalert"), extendConfig({}, controller.args[2], "infoalert"));
        infoalert.setDefaultUnit(voltmx.flex.DP);
        var flxInfoAlert = new voltmx.ui.FlexContainer(extendConfig({
            "autogrowMode": voltmx.flex.AUTOGROW_NONE,
            "centerX": "50%",
            "centerY": "50%",
            "clipBounds": false,
            "height": "200dp",
            "id": "flxInfoAlert",
            "isVisible": true,
            "layoutType": voltmx.flex.FLOW_VERTICAL,
            "isModalContainer": false,
            "skin": "sknFlexWithShadowWhiteBg",
            "width": "80%",
            "zIndex": 1,
            "appName": "RefCommonsMA"
        }, controller.args[0], "flxInfoAlert"), extendConfig({
            "paddingInPixel": false
        }, controller.args[1], "flxInfoAlert"), extendConfig({}, controller.args[2], "flxInfoAlert"));
        flxInfoAlert.setDefaultUnit(voltmx.flex.DP);
        var lblAlertTitle = new voltmx.ui.Label(extendConfig({
            "id": "lblAlertTitle",
            "isVisible": true,
            "left": "25dp",
            "skin": "sknLblHeading3",
            "text": "Complaint Submitted",
            "textStyle": {
                "letterSpacing": 0,
                "strikeThrough": false
            },
            "top": "25dp",
            "width": voltmx.flex.USE_PREFERRED_SIZE,
            "zIndex": 1
        }, controller.args[0], "lblAlertTitle"), extendConfig({
            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, controller.args[1], "lblAlertTitle"), extendConfig({
            "textCopyable": false
        }, controller.args[2], "lblAlertTitle"));
        var lblAlertMessage = new voltmx.ui.Label(extendConfig({
            "id": "lblAlertMessage",
            "isVisible": true,
            "left": "25dp",
            "skin": "sknLblDescription",
            "text": "Thank you for submitting this complaint. Your complaint number is 08949.",
            "textStyle": {
                "letterSpacing": 0,
                "strikeThrough": false
            },
            "top": "40dp",
            "width": "90%",
            "zIndex": 1
        }, controller.args[0], "lblAlertMessage"), extendConfig({
            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, controller.args[1], "lblAlertMessage"), extendConfig({
            "textCopyable": false
        }, controller.args[2], "lblAlertMessage"));
        var btnAlertOK = new voltmx.ui.Button(extendConfig({
            "bottom": 10,
            "focusSkin": "sknBtnNormal1",
            "height": "40dp",
            "id": "btnAlertOK",
            "isVisible": true,
            "onClick": controller.AS_Button_d9163928d8484284867a96aa4ef625c2,
            "right": 25,
            "skin": "sknBtnNormal1",
            "text": "OK",
            "top": 25,
            "width": "100dp",
            "zIndex": 1
        }, controller.args[0], "btnAlertOK"), extendConfig({
            "contentAlignment": constants.CONTENT_ALIGN_CENTER,
            "displayText": true,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, controller.args[1], "btnAlertOK"), extendConfig({}, controller.args[2], "btnAlertOK"));
        flxInfoAlert.add(lblAlertTitle, lblAlertMessage, btnAlertOK);
        infoalert.add(flxInfoAlert);
        return infoalert;
    }
})