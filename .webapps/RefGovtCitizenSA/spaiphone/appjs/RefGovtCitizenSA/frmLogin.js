define("RefGovtCitizenSA/frmLogin", function() {
    return function(controller) {
        function addWidgetsfrmLogin() {
            this.setDefaultUnit(voltmx.flex.DP);
            var imgLogo = new voltmx.ui.Image2({
                "centerX": "50%",
                "height": "200dp",
                "id": "imgLogo",
                "isVisible": true,
                "src": "hclsoftwarelogo.png",
                "top": "50dp",
                "width": "200dp",
                "zIndex": 1
            }, {
                "imageScaleMode": constants.IMAGE_SCALE_MODE_MAINTAIN_ASPECT_RATIO,
                "padding": [0, 0, 0, 0],
                "paddingInPixel": false
            }, {});
            var flxLogin = new voltmx.ui.FlexContainer({
                "autogrowMode": voltmx.flex.AUTOGROW_NONE,
                "centerX": "50%",
                "centerY": "50%",
                "clipBounds": false,
                "height": "300dp",
                "id": "flxLogin",
                "isVisible": true,
                "layoutType": voltmx.flex.FLOW_VERTICAL,
                "left": "28dp",
                "isModalContainer": false,
                "top": "241dp",
                "width": "95%",
                "zIndex": 1,
                "appName": "RefGovtCitizenSA"
            }, {
                "paddingInPixel": false
            }, {});
            flxLogin.setDefaultUnit(voltmx.flex.DP);
            var tbxUserName = new voltmx.ui.TextBox2({
                "autoCapitalize": constants.TEXTBOX_AUTO_CAPITALIZE_NONE,
                "centerX": "50%",
                "height": "50dp",
                "id": "tbxUserName",
                "isVisible": true,
                "keyBoardStyle": constants.TEXTBOX_KEY_BOARD_STYLE_DEFAULT,
                "onTextChange": controller.onTextChangeHandlerForTbxUsername,
                "placeholder": "Username",
                "secureTextEntry": false,
                "skin": "sknTbx",
                "text": "myuser@hcl.com",
                "textInputMode": constants.TEXTBOX_INPUT_MODE_ANY,
                "top": "40dp",
                "width": "90%",
                "zIndex": 1
            }, {
                "containerHeightMode": constants.TEXTBOX_FONT_METRICS_DRIVEN_HEIGHT,
                "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
                "padding": [3, 0, 0, 0],
                "paddingInPixel": false
            }, {
                "autoComplete": false,
                "autoCorrect": false
            });
            var tbxPassword = new voltmx.ui.TextBox2({
                "autoCapitalize": constants.TEXTBOX_AUTO_CAPITALIZE_NONE,
                "centerX": "50%",
                "height": "50dp",
                "id": "tbxPassword",
                "isVisible": true,
                "keyBoardStyle": constants.TEXTBOX_KEY_BOARD_STYLE_DEFAULT,
                "onTextChange": controller.onTextChangeHandlerFprTbxPassword,
                "placeholder": "Password",
                "secureTextEntry": true,
                "skin": "sknTbx",
                "text": "Volt@1234",
                "textInputMode": constants.TEXTBOX_INPUT_MODE_ANY,
                "top": "20dp",
                "width": "90%",
                "zIndex": 1
            }, {
                "containerHeightMode": constants.TEXTBOX_FONT_METRICS_DRIVEN_HEIGHT,
                "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
                "padding": [3, 0, 0, 0],
                "paddingInPixel": false
            }, {
                "autoComplete": false,
                "autoCorrect": false
            });
            var chxRememberMe = new voltmx.ui.CheckBoxGroup({
                "centerX": "50%",
                "height": "50dp",
                "id": "chxRememberMe",
                "isVisible": true,
                "masterData": [
                    ["rememberMe", "voltmx.i18n.getLocalizedString(\"rememberMe\")"]
                ],
                "skin": "sknChx1",
                "top": "20dp",
                "width": "90%",
                "zIndex": 1
            }, {
                "itemOrientation": constants.CHECKBOX_ITEM_ORIENTATION_VERTICAL,
                "padding": [0, 0, 0, 0],
                "paddingInPixel": false
            }, {});
            var btnLogin = new voltmx.ui.Button({
                "centerX": "50%",
                "focusSkin": "sknBtnFocus",
                "height": "50dp",
                "id": "btnLogin",
                "isVisible": true,
                "onClick": controller.onClickHandlerForBtnLogin,
                "skin": "sknBtnNormal",
                "i18n_text": "voltmx.i18n.getLocalizedString(\"login\")",
                "top": "20dp",
                "width": "90%",
                "zIndex": 1
            }, {
                "contentAlignment": constants.CONTENT_ALIGN_CENTER,
                "displayText": true,
                "padding": [0, 0, 0, 0],
                "paddingInPixel": false
            }, {});
            flxLogin.add(tbxUserName, tbxPassword, chxRememberMe, btnLogin);
            var lstLanguage = new voltmx.ui.ListBox({
                "focusSkin": "defListBoxFocus",
                "height": "40dp",
                "id": "lstLanguage",
                "isVisible": true,
                "masterData": [
                    ["en", "voltmx.i18n.getLocalizedString(\"english\")"],
                    ["fr", "voltmx.i18n.getLocalizedString(\"french\")"],
                    ["es", "voltmx.i18n.getLocalizedString(\"spanish\")"]
                ],
                "right": 10,
                "selectedKey": "en",
                "skin": "sknLst1",
                "top": "15dp",
                "width": "150dp",
                "zIndex": 1
            }, {
                "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
                "padding": [2, 0, 2, 0],
                "paddingInPixel": false
            }, {});
            var rtxCredits = new voltmx.ui.RichText({
                "bottom": 0,
                "id": "rtxCredits",
                "isVisible": true,
                "left": "0dp",
                "linkSkin": "defRichTextLink",
                "skin": "defRichTextNormal",
                "text": "Credits: Icons used in this app are from <a target=\"_blank\" href=\"https://icons8.com\">Icons8</a>",
                "width": "100%",
                "zIndex": 1
            }, {
                "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
                "padding": [5, 1, 0, 1],
                "paddingInPixel": false
            }, {});
            this.add(imgLogo, flxLogin, lstLanguage, rtxCredits);
        };
        return [{
            "addWidgets": addWidgetsfrmLogin,
            "allowHorizontalBounce": false,
            "allowVerticalBounce": false,
            "bounces": false,
            "enableScrolling": false,
            "enabledForIdleTimeout": false,
            "id": "frmLogin",
            "layoutType": voltmx.flex.FREE_FORM,
            "needAppMenu": false,
            "preShow": function(eventobject) {
                controller.preshowHandlerForfrmLogin(eventobject);
            },
            "skin": "sknFrm1",
            "appName": "RefGovtCitizenSA",
            "info": {
                "kuid": "id61e65640e8422fbd585e98ed70503a"
            }
        }, {
            "displayOrientation": constants.FORM_DISPLAY_ORIENTATION_PORTRAIT,
            "layoutType": voltmx.flex.FREE_FORM,
            "paddingInPixel": false
        }, {
            "retainScrollPosition": false
        }]
    }
});