define(function() {
    return function(controller) {
        var userinput = new voltmx.ui.FlexContainer(extendConfig({
            "autogrowMode": voltmx.flex.AUTOGROW_NONE,
            "clipBounds": false,
            "isMaster": true,
            "height": "10%",
            "id": "userinput",
            "isVisible": true,
            "layoutType": voltmx.flex.FLOW_VERTICAL,
            "left": "0dp",
            "isModalContainer": false,
            "skin": "slFbox",
            "top": "0dp",
            "width": "100%",
            "zIndex": 1,
            "appName": "RefCommonsMA"
        }, controller.args[0], "userinput"), extendConfig({
            "paddingInPixel": false
        }, controller.args[1], "userinput"), extendConfig({}, controller.args[2], "userinput"));
        userinput.setDefaultUnit(voltmx.flex.DP);
        var lblInputTitle = new voltmx.ui.Label(extendConfig({
            "id": "lblInputTitle",
            "isVisible": true,
            "left": "10dp",
            "skin": "sknLblHeading3",
            "text": "Label",
            "textStyle": {},
            "top": "10dp",
            "width": "90%",
            "zIndex": 1
        }, controller.args[0], "lblInputTitle"), extendConfig({
            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, controller.args[1], "lblInputTitle"), extendConfig({
            "renderAsAnchor": false,
            "textCopyable": false
        }, controller.args[2], "lblInputTitle"));
        var tbxInput = new voltmx.ui.TextBox2(extendConfig({
            "autoCapitalize": constants.TEXTBOX_AUTO_CAPITALIZE_NONE,
            "focusSkin": "sknTbx1",
            "height": "40dp",
            "id": "tbxInput",
            "isVisible": true,
            "keyBoardStyle": constants.TEXTBOX_KEY_BOARD_STYLE_DEFAULT,
            "left": "10dp",
            "placeholder": "Placeholder",
            "secureTextEntry": false,
            "skin": "sknTbx1",
            "textInputMode": constants.TEXTBOX_INPUT_MODE_ANY,
            "top": "0dp",
            "width": "90%",
            "zIndex": 1
        }, controller.args[0], "tbxInput"), extendConfig({
            "containerHeightMode": constants.TEXTBOX_FONT_METRICS_DRIVEN_HEIGHT,
            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, controller.args[1], "tbxInput"), extendConfig({
            "autoComplete": false,
            "autoCorrect": false,
            "placeholderSkin": "sknTbx1"
        }, controller.args[2], "tbxInput"));
        var flxInput = new voltmx.ui.FlexContainer(extendConfig({
            "autogrowMode": voltmx.flex.AUTOGROW_NONE,
            "clipBounds": false,
            "height": "2dp",
            "id": "flxInput",
            "isVisible": true,
            "layoutType": voltmx.flex.FREE_FORM,
            "left": "10dp",
            "isModalContainer": false,
            "skin": "sknFlx3",
            "top": "-5dp",
            "width": "90%",
            "zIndex": 1,
            "appName": "RefCommonsMA"
        }, controller.args[0], "flxInput"), extendConfig({
            "paddingInPixel": false
        }, controller.args[1], "flxInput"), extendConfig({}, controller.args[2], "flxInput"));
        flxInput.setDefaultUnit(voltmx.flex.DP);
        flxInput.add();
        userinput.add(lblInputTitle, tbxInput, flxInput);
        return userinput;
    }
})