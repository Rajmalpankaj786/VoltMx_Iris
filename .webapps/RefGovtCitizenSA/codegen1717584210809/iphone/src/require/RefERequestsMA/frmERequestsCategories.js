define("RefERequestsMA/frmERequestsCategories", function() {
    return function(controller) {
        function addWidgetsfrmERequestsCategories() {
            this.setDefaultUnit(voltmx.flex.DP);
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
                        "text": "Requests"
                    }
                }
            }, {
                "paddingInPixel": false,
                "overrides": {}
            }, {
                "overrides": {}
            });
            formheader.imgBack.onTouchEnd = controller.AS_Image_c5c195b4162a4dd8b49138c837c64d5a;
            formheader.imgMenu.onTouchEnd = controller.AS_Image_hb106395d17944399318ac4e679c2701;
            var categories = new com.hclacademy.categories({
                "autogrowMode": voltmx.flex.AUTOGROW_NONE,
                "height": "100%",
                "id": "categories",
                "isVisible": true,
                "layoutType": voltmx.flex.FREE_FORM,
                "left": "0dp",
                "masterType": constants.MASTER_TYPE_DEFAULT,
                "isModalContainer": false,
                "skin": "slFbox",
                "top": "10%",
                "width": "100%",
                "zIndex": 1,
                "appName": "RefCommonsMA",
                "overrides": {
                    "categories": {
                        "top": "10%"
                    },
                    "segCategories": {
                        "data": [{
                            "lblCategory": "Birth Certificate"
                        }, {
                            "lblCategory": "Death Certificate"
                        }, {
                            "lblCategory": "Apply for Electricity Connection"
                        }, {
                            "lblCategory": "Pet License"
                        }, {
                            "lblCategory": "Apply for new Driving License"
                        }, {
                            "lblCategory": "Apply for new Passport"
                        }, {
                            "lblCategory": "Apply for new Trade License"
                        }, {
                            "lblCategory": "Passport Application Status"
                        }, {
                            "lblCategory": "Driving License Application Status"
                        }, {
                            "lblCategory": "Apply for Advertisiment"
                        }, {
                            "lblCategory": "Sign Up for DigiLocker"
                        }, {
                            "lblCategory": "Vehicle Registration Certificate"
                        }, {
                            "lblCategory": "Apply for new Electricity Connection"
                        }, {
                            "lblCategory": "Apply for new Gas Connection"
                        }],
                        "height": "90%"
                    }
                }
            }, {
                "paddingInPixel": false,
                "overrides": {}
            }, {
                "overrides": {}
            });
            categories.segCategories.onRowClick = controller.AS_Segment_becb8cdafac94bcfa6a99ecf30310a53;
            var hamburgermenu = new com.hclacademy.hamburgermenu({
                "autogrowMode": voltmx.flex.AUTOGROW_NONE,
                "height": "100%",
                "id": "hamburgermenu",
                "isVisible": true,
                "layoutType": voltmx.flex.FREE_FORM,
                "left": "-90%",
                "masterType": constants.MASTER_TYPE_DEFAULT,
                "isModalContainer": false,
                "top": "0dp",
                "width": "80%",
                "zIndex": 1,
                "appName": "RefCommonsMA",
                "overrides": {}
            }, {
                "paddingInPixel": false,
                "overrides": {}
            }, {
                "overrides": {}
            });
            hamburgermenu.segMenu.onRowClick = controller.AS_Segment_d12b50b0bcdc48d7a9b3014b05c05ee9;
            this.add(formheader, categories, hamburgermenu);
        };
        return [{
            "addWidgets": addWidgetsfrmERequestsCategories,
            "enabledForIdleTimeout": false,
            "id": "frmERequestsCategories",
            "layoutType": voltmx.flex.FREE_FORM,
            "needAppMenu": false,
            "postShow": controller.AS_Form_ffa66c70dc5c4f019a374e96e8c590c5,
            "skin": "sknFrm1",
            "appName": "RefERequestsMA",
            "info": {
                "kuid": "db5db5ca51da467a839ce5de636adebf"
            }
        }, {
            "displayOrientation": constants.FORM_DISPLAY_ORIENTATION_PORTRAIT,
            "layoutType": voltmx.flex.FREE_FORM,
            "paddingInPixel": false
        }, {
            "configureExtendBottom": false,
            "configureExtendTop": false,
            "configureStatusBarStyle": false,
            "footerOverlap": false,
            "formTransparencyDuringPostShow": "100",
            "headerOverlap": false,
            "inputAccessoryViewType": constants.FORM_INPUTACCESSORYVIEW_CANCEL,
            "needsIndicatorDuringPostShow": false,
            "retainScrollPosition": false,
            "titleBar": false,
            "titleBarSkin": "slTitleBar"
        }]
    }
});