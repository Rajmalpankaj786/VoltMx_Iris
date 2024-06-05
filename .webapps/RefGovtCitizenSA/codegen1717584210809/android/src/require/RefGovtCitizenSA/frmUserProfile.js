define("RefGovtCitizenSA/frmUserProfile", function() {
    return function(controller) {
        function addWidgetsfrmUserProfile() {
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
            formheader.imgBack.onTouchEnd = controller.onTouchEndHandlerForImgBackOnFrmUserProfile;
            formheader.imgMenu.onTouchEnd = controller.onTouchEndHandlerForImgMenuOnFrmUserProfile;
            var flxPhoto = new voltmx.ui.FlexContainer({
                "autogrowMode": voltmx.flex.AUTOGROW_NONE,
                "clipBounds": false,
                "height": "225dp",
                "id": "flxPhoto",
                "isVisible": true,
                "layoutType": voltmx.flex.FREE_FORM,
                "left": "0dp",
                "isModalContainer": false,
                "skin": "sknFlx2",
                "top": "0dp",
                "width": "100%",
                "zIndex": 1,
                "appName": "RefGovtCitizenSA"
            }, {
                "paddingInPixel": false
            }, {});
            flxPhoto.setDefaultUnit(voltmx.flex.DP);
            var flxProfilePhoto = new voltmx.ui.FlexContainer({
                "autogrowMode": voltmx.flex.AUTOGROW_NONE,
                "centerX": "50%",
                "centerY": "50%",
                "clipBounds": true,
                "height": "150dp",
                "id": "flxProfilePhoto",
                "isVisible": false,
                "layoutType": voltmx.flex.FREE_FORM,
                "isModalContainer": false,
                "skin": "sknFlx5",
                "width": "150dp",
                "zIndex": 1,
                "appName": "RefGovtCitizenSA"
            }, {
                "paddingInPixel": false
            }, {});
            flxProfilePhoto.setDefaultUnit(voltmx.flex.DP);
            var imgPhoto = new voltmx.ui.Image2({
                "centerX": "50%",
                "centerY": "50%",
                "zoomEnabled": false,
                "zoomValue": 2,
                "height": "100%",
                "id": "imgPhoto",
                "isVisible": true,
                "skin": "slImage",
                "src": "userprofile.png",
                "width": "100%",
                "zIndex": 1
            }, {
                "imageScaleMode": constants.IMAGE_SCALE_MODE_FIT_TO_DIMENSIONS,
                "padding": [0, 0, 0, 0],
                "paddingInPixel": false
            }, {});
            flxProfilePhoto.add(imgPhoto);
            var camCapturePhoto = new voltmx.ui.Camera({
                "cameraSource": constants.CAMERA_SOURCE_FRONT,
                "centerX": "50%",
                "centerY": "45%",
                "height": "100dp",
                "id": "camCapturePhoto",
                "isVisible": true,
                "skin": "sknCamWithImage",
                "width": "100dp",
                "zIndex": 1
            }, {
                "contentAlignment": constants.CONTENT_ALIGN_CENTER,
                "padding": [0, 0, 0, 0],
                "paddingInPixel": false
            }, {
                "accessMode": constants.CAMERA_IMAGE_ACCESS_MODE_PUBLIC,
                "enableOverlay": false,
                "enablePhotoCropFeature": false
            });
            var lblCapturePhoto = new voltmx.ui.Label({
                "centerX": "50%",
                "centerY": "75%",
                "id": "lblCapturePhoto",
                "isVisible": true,
                "skin": "sknLblHeading2",
                "text": voltmx.i18n.getLocalizedString("takePhotoLabel"),
                "textStyle": {
                    "letterSpacing": 0,
                    "strikeThrough": false
                },
                "width": voltmx.flex.USE_PREFERRED_SIZE,
                "zIndex": 1
            }, {
                "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
                "padding": [0, 0, 0, 0],
                "paddingInPixel": false
            }, {
                "textCopyable": false
            });
            flxPhoto.add(flxProfilePhoto, camCapturePhoto, lblCapturePhoto);
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
                "text": voltmx.i18n.getLocalizedString("profileDetails"),
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
            var flxFirstName = new voltmx.ui.FlexContainer({
                "autogrowMode": voltmx.flex.AUTOGROW_NONE,
                "centerX": "50%",
                "clipBounds": false,
                "height": "40dp",
                "id": "flxFirstName",
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
            flxFirstName.setDefaultUnit(voltmx.flex.DP);
            var lblFirstName = new voltmx.ui.Label({
                "id": "lblFirstName",
                "isVisible": true,
                "left": 10,
                "skin": "sknLblHeading3",
                "text": voltmx.i18n.getLocalizedString("firstName"),
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
            var lblFirstNameValue = new voltmx.ui.Label({
                "id": "lblFirstNameValue",
                "isVisible": true,
                "left": 50,
                "skin": "sknLblHeading3",
                "text": "Profile details",
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
            flxFirstName.add(lblFirstName, lblFirstNameValue);
            var flxLastName = new voltmx.ui.FlexContainer({
                "autogrowMode": voltmx.flex.AUTOGROW_NONE,
                "centerX": "50%",
                "clipBounds": false,
                "height": "40dp",
                "id": "flxLastName",
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
            flxLastName.setDefaultUnit(voltmx.flex.DP);
            var lblLastName = new voltmx.ui.Label({
                "id": "lblLastName",
                "isVisible": true,
                "left": 10,
                "skin": "sknLblHeading3",
                "text": voltmx.i18n.getLocalizedString("lastName"),
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
            var lblLastNameValue = new voltmx.ui.Label({
                "id": "lblLastNameValue",
                "isVisible": true,
                "left": 50,
                "skin": "sknLblHeading3",
                "text": "Profile details",
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
            flxLastName.add(lblLastName, lblLastNameValue);
            var flxEmail = new voltmx.ui.FlexContainer({
                "autogrowMode": voltmx.flex.AUTOGROW_NONE,
                "centerX": "50%",
                "clipBounds": false,
                "height": "40dp",
                "id": "flxEmail",
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
            flxEmail.setDefaultUnit(voltmx.flex.DP);
            var lblEmail = new voltmx.ui.Label({
                "id": "lblEmail",
                "isVisible": true,
                "left": 10,
                "skin": "sknLblHeading3",
                "text": voltmx.i18n.getLocalizedString("email"),
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
            var lblEmailValue = new voltmx.ui.Label({
                "id": "lblEmailValue",
                "isVisible": true,
                "left": 50,
                "skin": "sknLblHeading3",
                "text": "Profile details",
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
            flxEmail.add(lblEmail, lblEmailValue);
            flxProfileDetails.add(lblProfileDetails, flxFirstName, flxLastName, flxEmail);
            flxMainContent.add(formheader, flxPhoto, flxProfileDetails);
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
            hamburgermenu.segMenu.onRowClick = controller.onRowClickHandlerForSegMenuOnFrmUserProfile;
            this.add(flxMainContent, hamburgermenu);
        };
        return [{
            "addWidgets": addWidgetsfrmUserProfile,
            "enabledForIdleTimeout": false,
            "id": "frmUserProfile",
            "layoutType": voltmx.flex.FREE_FORM,
            "needAppMenu": false,
            "skin": "sknFrm1",
            "appName": "RefGovtCitizenSA",
            "info": {
                "kuid": "hf1a0fe4870543778f7bfec064abe14e"
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