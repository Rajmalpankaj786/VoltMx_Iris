define("RefGovtCitizenSA/frmUserPreferences", function() {
    return function(controller) {
        function addWidgetsfrmUserPreferences() {
            this.setDefaultUnit(voltmx.flex.DP);
            var flxMainContent = new voltmx.ui.FlexContainer({
                "autogrowMode": voltmx.flex.AUTOGROW_NONE,
                "clipBounds": false,
                "height": "100%",
                "id": "flxMainContent",
                "isVisible": true,
                "layoutType": voltmx.flex.FLOW_VERTICAL,
                "left": "0dp",
                "isModalContainer": false,
                "skin": "slFbox",
                "top": "0dp",
                "width": "100%",
                "zIndex": 1,
                "appName": "RefGovtCitizenSA"
            }, {
                "paddingInPixel": false
            }, {});
            flxMainContent.setDefaultUnit(voltmx.flex.DP);
            var formheader = new com.hclacademy.formheader({
                "autogrowMode": voltmx.flex.AUTOGROW_NONE,
                "height": "10%",
                "id": "formheader",
                "isVisible": true,
                "layoutType": voltmx.flex.FREE_FORM,
                "left": "0dp",
                "masterType": constants.MASTER_TYPE_DEFAULT,
                "isModalContainer": false,
                "skin": "slFbox",
                "top": "0dp",
                "width": "100%",
                "zIndex": 1,
                "appName": "RefCommonsMA",
                "overrides": {
                    "flxProfilePhoto": {
                        "isVisible": false
                    },
                    "formheader": {
                        "centerY": "viz.val_cleared",
                        "top": "0dp"
                    },
                    "imgBack": {
                        "right": 5
                    },
                    "lblCompanyName": {
                        "text": voltmx.i18n.getLocalizedString("eGovernance")
                    }
                }
            }, {
                "paddingInPixel": false,
                "overrides": {}
            }, {
                "overrides": {}
            });
            formheader.imgBack.onTouchEnd = controller.onTouchEndHandlerForImgBackOnFrmUserPreferences;
            formheader.imgMenu.onTouchEnd = controller.onTouchEndHandlerForImgMenuOnFrmUserPreferences;
            var flxProfileDetails = new voltmx.ui.FlexContainer({
                "autogrowMode": voltmx.flex.AUTOGROW_NONE,
                "clipBounds": false,
                "height": "225dp",
                "id": "flxProfileDetails",
                "isVisible": true,
                "layoutType": voltmx.flex.FLOW_VERTICAL,
                "left": "0dp",
                "isModalContainer": false,
                "skin": "sknFlexTransparent",
                "top": "0dp",
                "width": "100%",
                "zIndex": 1,
                "appName": "RefGovtCitizenSA"
            }, {
                "paddingInPixel": false
            }, {});
            flxProfileDetails.setDefaultUnit(voltmx.flex.DP);
            var lblProfileDetails = new voltmx.ui.Label({
                "id": "lblProfileDetails",
                "isVisible": true,
                "left": 10,
                "skin": "sknLblHeading2",
                "text": voltmx.i18n.getLocalizedString("userPreferences"),
                "textStyle": {
                    "letterSpacing": 0,
                    "strikeThrough": false
                },
                "top": 10,
                "width": voltmx.flex.USE_PREFERRED_SIZE,
                "zIndex": 1
            }, {
                "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
                "padding": [0, 0, 0, 0],
                "paddingInPixel": false
            }, {
                "textCopyable": false
            });
            var flxNewsPreference = new voltmx.ui.FlexContainer({
                "autogrowMode": voltmx.flex.AUTOGROW_NONE,
                "centerX": "50%",
                "clipBounds": false,
                "height": "40dp",
                "id": "flxNewsPreference",
                "isVisible": true,
                "layoutType": voltmx.flex.FLOW_HORIZONTAL,
                "isModalContainer": false,
                "skin": "slFbox",
                "top": "10dp",
                "width": "80%",
                "zIndex": 1,
                "appName": "RefGovtCitizenSA"
            }, {
                "paddingInPixel": false
            }, {});
            flxNewsPreference.setDefaultUnit(voltmx.flex.DP);
            var lblNewsPreference = new voltmx.ui.Label({
                "centerY": "50%",
                "id": "lblNewsPreference",
                "isVisible": true,
                "left": 10,
                "skin": "sknLblHeading3",
                "text": voltmx.i18n.getLocalizedString("newsType"),
                "textStyle": {
                    "letterSpacing": 0,
                    "strikeThrough": false
                },
                "width": "100dp",
                "zIndex": 1
            }, {
                "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
                "padding": [0, 0, 0, 0],
                "paddingInPixel": false
            }, {
                "textCopyable": false
            });
            var lstNewsPreference = new voltmx.ui.ListBox({
                "centerY": "50%",
                "focusSkin": "defListBoxFocus",
                "height": "40dp",
                "id": "lstNewsPreference",
                "isVisible": true,
                "left": "50dp",
                "masterData": [
                    ["Technology", "Technology"],
                    ["World", "World"],
                    ["Sports", "Sports"],
                    ["Health", "Health"]
                ],
                "selectedKey": "Technology",
                "selectedKeyValue": ["Technology", "Technology"],
                "skin": "sknLst1",
                "width": "150dp",
                "zIndex": 1
            }, {
                "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
                "padding": [3, 0, 0, 0],
                "paddingInPixel": false
            }, {
                "applySkinsToPopup": false,
                "placeholder": "Please Select",
                "viewType": constants.LISTBOX_VIEW_TYPE_LISTVIEW
            });
            flxNewsPreference.add(lblNewsPreference, lstNewsPreference);
            var flxThemePreference = new voltmx.ui.FlexContainer({
                "autogrowMode": voltmx.flex.AUTOGROW_NONE,
                "centerX": "50%",
                "clipBounds": false,
                "height": "40dp",
                "id": "flxThemePreference",
                "isVisible": true,
                "layoutType": voltmx.flex.FLOW_HORIZONTAL,
                "isModalContainer": false,
                "skin": "slFbox",
                "top": "10dp",
                "width": "80%",
                "zIndex": 1,
                "appName": "RefGovtCitizenSA"
            }, {
                "paddingInPixel": false
            }, {});
            flxThemePreference.setDefaultUnit(voltmx.flex.DP);
            var lblThemePreference = new voltmx.ui.Label({
                "id": "lblThemePreference",
                "isVisible": true,
                "left": 10,
                "skin": "sknLblHeading3",
                "text": voltmx.i18n.getLocalizedString("theme"),
                "textStyle": {
                    "letterSpacing": 0,
                    "strikeThrough": false
                },
                "top": 10,
                "width": "100dp",
                "zIndex": 1
            }, {
                "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
                "padding": [0, 0, 0, 0],
                "paddingInPixel": false
            }, {
                "textCopyable": false
            });
            var lstThemePreference = new voltmx.ui.ListBox({
                "centerY": "50%",
                "focusSkin": "defListBoxFocus",
                "height": "40dp",
                "id": "lstThemePreference",
                "isVisible": true,
                "left": "50dp",
                "masterData": [
                    ["default", "defaultTheme"],
                    ["KyeMehTheme", "KyeMehTheme"]
                ],
                "selectedKey": "default",
                "selectedKeyValue": ["default", "defaultTheme"],
                "skin": "sknLst1",
                "width": "150dp",
                "zIndex": 1
            }, {
                "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
                "padding": [3, 0, 0, 0],
                "paddingInPixel": false
            }, {
                "applySkinsToPopup": false,
                "placeholder": "Please Select",
                "viewType": constants.LISTBOX_VIEW_TYPE_LISTVIEW
            });
            flxThemePreference.add(lblThemePreference, lstThemePreference);
            var btnSaveUserPreferences = new voltmx.ui.Button({
                "centerX": "50%",
                "focusSkin": "sknBtnFocus",
                "height": "40dp",
                "id": "btnSaveUserPreferences",
                "isVisible": true,
                "skin": "sknBtnNormal",
                "text": voltmx.i18n.getLocalizedString("saveUserPreferences"),
                "top": "20dp",
                "width": "50%",
                "zIndex": 1
            }, {
                "contentAlignment": constants.CONTENT_ALIGN_CENTER,
                "displayText": true,
                "padding": [0, 0, 0, 0],
                "paddingInPixel": false
            }, {});
            flxProfileDetails.add(lblProfileDetails, flxNewsPreference, flxThemePreference, btnSaveUserPreferences);
            flxMainContent.add(formheader, flxProfileDetails);
            var hamburgermenu = new com.hclacademy.hamburgermenu({
                "autogrowMode": voltmx.flex.AUTOGROW_NONE,
                "height": "100%",
                "id": "hamburgermenu",
                "isVisible": true,
                "layoutType": voltmx.flex.FREE_FORM,
                "left": "-90%",
                "masterType": constants.MASTER_TYPE_DEFAULT,
                "isModalContainer": false,
                "skin": "sknFlexWithShadowPrimaryGradientBg",
                "top": "0dp",
                "width": "80%",
                "zIndex": 1,
                "appName": "RefCommonsMA",
                "overrides": {
                    "segMenu": {
                        "data": [{
                            "imgMenuOption": "overview.png",
                            "lblMenuOption": "Dashboard"
                        }, {
                            "imgMenuOption": "erequest.png",
                            "lblMenuOption": "Requests"
                        }, {
                            "imgMenuOption": "ecomplaint.png",
                            "lblMenuOption": "Complaints"
                        }, {
                            "imgMenuOption": "weatheralert.png",
                            "lblMenuOption": "Weather Alert"
                        }, {
                            "imgMenuOption": "userprofile.png",
                            "lblMenuOption": "User Profile"
                        }, {
                            "imgMenuOption": "userpreferences.png",
                            "lblMenuOption": "User Preferences"
                        }]
                    }
                }
            }, {
                "paddingInPixel": false,
                "overrides": {}
            }, {
                "overrides": {}
            });
            hamburgermenu.segMenu.onRowClick = controller.onRowClickHandlerForSegMenuOnFrmUserPreferences;
            this.add(flxMainContent, hamburgermenu);
        };
        return [{
            "addWidgets": addWidgetsfrmUserPreferences,
            "enabledForIdleTimeout": false,
            "id": "frmUserPreferences",
            "layoutType": voltmx.flex.FREE_FORM,
            "needAppMenu": false,
            "skin": "sknFrm1",
            "appName": "RefGovtCitizenSA",
            "info": {
                "kuid": "a3e680d6d47046518ff3a57e2831c43a"
            }
        }, {
            "displayOrientation": constants.FORM_DISPLAY_ORIENTATION_PORTRAIT,
            "layoutType": voltmx.flex.FREE_FORM,
            "paddingInPixel": false
        }, {
            "footerOverlap": false,
            "headerOverlap": false,
            "menuPosition": constants.FORM_MENU_POSITION_AFTER_APPMENU,
            "retainScrollPosition": false,
            "titleBar": true,
            "titleBarSkin": "slTitleBar",
            "windowSoftInputMode": constants.FORM_ADJUST_RESIZE
        }]
    }
});