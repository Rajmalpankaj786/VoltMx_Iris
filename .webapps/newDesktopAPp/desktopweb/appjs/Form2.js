define("Form2", function() {
    return function(controller) {
        function addWidgetsForm2() {
            this.setDefaultUnit(voltmx.flex.DP);
            var flxUserLogin = new voltmx.ui.FlexContainer({
                "autogrowMode": voltmx.flex.AUTOGROW_NONE,
                "clipBounds": false,
                "height": "100%",
                "id": "flxUserLogin",
                "isVisible": true,
                "layoutType": voltmx.flex.FREE_FORM,
                "left": "0%",
                "masterType": constants.MASTER_TYPE_USERWIDGET,
                "isModalContainer": false,
                "top": "0%",
                "width": "100%",
                "zIndex": 1,
                "appName": "newDesktopAPp"
            }, {
                "paddingInPixel": false
            }, {});
            flxUserLogin.setDefaultUnit(voltmx.flex.DP);
            var flxLogo = new voltmx.ui.FlexContainer({
                "autogrowMode": voltmx.flex.AUTOGROW_NONE,
                "centerX": "50%",
                "clipBounds": true,
                "height": "100dp",
                "id": "flxLogo",
                "isVisible": true,
                "layoutType": voltmx.flex.FREE_FORM,
                "left": "38.90%",
                "masterType": constants.MASTER_TYPE_USERWIDGET,
                "isModalContainer": false,
                "top": "28.60%",
                "width": "100dp",
                "zIndex": 1,
                "appName": "newDesktopAPp"
            }, {
                "paddingInPixel": false
            }, {});
            flxLogo.setDefaultUnit(voltmx.flex.DP);
            var imgLogo = new voltmx.ui.Image2({
                "centerX": "50%",
                "centerY": "50%",
                "height": "100%",
                "id": "imgLogo",
                "isVisible": true,
                "left": "77dp",
                "skin": "slImage0e7b87770954443",
                "src": "logo.png",
                "top": "49dp",
                "width": "100%",
                "zIndex": 1,
                "blur": {
                    "enabled": false,
                    "value": 0
                }
            }, {
                "imageScaleMode": constants.IMAGE_SCALE_MODE_MAINTAIN_ASPECT_RATIO,
                "padding": [0, 0, 0, 0],
                "paddingInPixel": false
            }, {});
            flxLogo.add(imgLogo);
            var flexUserName = new voltmx.ui.FlexContainer({
                "autogrowMode": voltmx.flex.AUTOGROW_NONE,
                "centerX": "50%",
                "clipBounds": true,
                "height": "50dp",
                "id": "flexUserName",
                "isVisible": true,
                "layoutType": voltmx.flex.FREE_FORM,
                "masterType": constants.MASTER_TYPE_USERWIDGET,
                "isModalContainer": false,
                "skin": "sknLoginFlex0fa872d06104f44",
                "top": "46.33%",
                "width": "335dp",
                "zIndex": 1,
                "appName": "newDesktopAPp"
            }, {
                "paddingInPixel": false
            }, {});
            flexUserName.setDefaultUnit(voltmx.flex.DP);
            var txtUserName = new voltmx.ui.TextBox2({
                "autoCapitalize": constants.TEXTBOX_AUTO_CAPITALIZE_NONE,
                "bottom": "0dp",
                "centerX": "50%",
                "focusSkin": "sknLoginTextBox0a1c50fef13a24a",
                "height": "100%",
                "id": "txtUserName",
                "isVisible": true,
                "keyBoardStyle": constants.TEXTBOX_KEY_BOARD_STYLE_DEFAULT,
                "left": "5%",
                "placeholder": "Username",
                "right": "5%",
                "secureTextEntry": false,
                "skin": "sknLoginTextBox0a1c50fef13a24a",
                "textInputMode": constants.TEXTBOX_INPUT_MODE_ANY,
                "width": "100%",
                "zIndex": 1
            }, {
                "containerHeightMode": constants.TEXTBOX_FONT_METRICS_DRIVEN_HEIGHT,
                "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
                "padding": [3, 0, 0, 0],
                "paddingInPixel": false
            }, {
                "autoCorrect": false,
                "placeholderSkin": "sknLoginTextBoxPlaceholder0ge75010bf1814c"
            });
            flexUserName.add(txtUserName);
            var flexPassword = new voltmx.ui.FlexContainer({
                "autogrowMode": voltmx.flex.AUTOGROW_NONE,
                "centerX": "50%",
                "clipBounds": true,
                "height": "50dp",
                "id": "flexPassword",
                "isVisible": true,
                "layoutType": voltmx.flex.FREE_FORM,
                "masterType": constants.MASTER_TYPE_USERWIDGET,
                "isModalContainer": false,
                "skin": "sknLoginFlex0fa872d06104f44",
                "top": "54.10%",
                "width": "335dp",
                "zIndex": 1,
                "appName": "newDesktopAPp"
            }, {
                "paddingInPixel": false
            }, {});
            flexPassword.setDefaultUnit(voltmx.flex.DP);
            var txtPassword = new voltmx.ui.TextBox2({
                "autoCapitalize": constants.TEXTBOX_AUTO_CAPITALIZE_NONE,
                "bottom": "0dp",
                "centerX": "50%",
                "focusSkin": "sknLoginTextBox0a1c50fef13a24a",
                "height": "100%",
                "id": "txtPassword",
                "isVisible": true,
                "keyBoardStyle": constants.TEXTBOX_KEY_BOARD_STYLE_DEFAULT,
                "left": "5%",
                "placeholder": "Password",
                "right": "5%",
                "secureTextEntry": true,
                "skin": "sknLoginTextBox0a1c50fef13a24a",
                "textInputMode": constants.TEXTBOX_INPUT_MODE_ANY,
                "width": "100%",
                "zIndex": 1
            }, {
                "containerHeightMode": constants.TEXTBOX_FONT_METRICS_DRIVEN_HEIGHT,
                "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
                "padding": [3, 0, 0, 0],
                "paddingInPixel": false
            }, {
                "autoCorrect": false,
                "placeholderSkin": "sknLoginTextBoxPlaceholder0ge75010bf1814c"
            });
            flexPassword.add(txtPassword);
            var btnSignin = new voltmx.ui.Button({
                "centerX": "50%",
                "focusSkin": "sknLoginButtonFocus0ff2bfdaba02944",
                "height": "46dp",
                "id": "btnSignin",
                "isVisible": true,
                "skin": "sknLoginButton0def7a443090141",
                "text": "LOGIN",
                "top": "65%",
                "width": "335dp",
                "zIndex": 1
            }, {
                "contentAlignment": constants.CONTENT_ALIGN_CENTER,
                "displayText": true,
                "padding": [0, 0, 0, 0],
                "paddingInPixel": false
            }, {});
            flxUserLogin.add(flxLogo, flexUserName, flexPassword, btnSignin);
            this.breakpointResetData = {};
            this.breakpointData = {
                maxBreakpointWidth: 1380,
                "1024": {
                    "flxUserLogin": {
                        "centerX": {
                            "type": "string",
                            "value": "50%"
                        },
                        "segmentProps": []
                    },
                    "flxLogo": {
                        "segmentProps": []
                    },
                    "flexUserName": {
                        "segmentProps": []
                    },
                    "flexPassword": {
                        "segmentProps": []
                    },
                    "btnSignin": {
                        "segmentProps": []
                    }
                },
                "1380": {
                    "flxUserLogin": {
                        "centerX": {
                            "type": "string",
                            "value": "50%"
                        },
                        "layoutType": voltmx.flex.FREE_FORM,
                        "skin": "s8cc395fe328452e8d4b98b478badaab",
                        "width": {
                            "type": "string",
                            "value": "100%"
                        },
                        "segmentProps": []
                    },
                    "flxLogo": {
                        "skin": "s4423f24357a487aa37952fc19b513f1",
                        "segmentProps": []
                    },
                    "imgLogo": {
                        "segmentProps": []
                    },
                    "flexUserName": {
                        "segmentProps": []
                    },
                    "txtUserName": {
                        "segmentProps": []
                    },
                    "flexPassword": {
                        "segmentProps": []
                    },
                    "txtPassword": {
                        "segmentProps": []
                    },
                    "btnSignin": {
                        "segmentProps": []
                    }
                }
            }
            this.compInstData = {}
            this.add(flxUserLogin);
        };
        return [{
            "addWidgets": addWidgetsForm2,
            "enabledForIdleTimeout": false,
            "id": "Form2",
            "layoutType": voltmx.flex.FREE_FORM,
            "needAppMenu": false,
            "skin": "slForm",
            "onBreakpointHandler": onBreakpointHandler,
            "breakpoints": [640, 1024, 1200, 1366, 1380],
            "appName": "newDesktopAPp",
            "info": {
                "kuid": "cb871b1e1100439095ec130779bbf01e"
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