define("RefGovtCitizenSA/frmDashboard", function() {
    return function(controller) {
        function addWidgetsfrmDashboard() {
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
                    "imgBack": {
                        "isVisible": false
                    },
                    "imgMenu": {
                        "src": "menu.png"
                    },
                    "imgProfile": {
                        "src": "userprofile.png"
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
            formheader.imgMenu.onTouchEnd = controller.onTouchEndHandlerForImgMenuOnFrmDahshboard;
            var newsarticles = new com.hclacademy.newsarticles({
                "height": "220dp",
                "id": "newsarticles",
                "isVisible": true,
                "layoutType": voltmx.flex.FREE_FORM,
                "left": "40dp",
                "masterType": constants.MASTER_TYPE_DEFAULT,
                "isModalContainer": false,
                "skin": "sknFlexWithShadow",
                "top": "10dp",
                "width": "80%",
                "zIndex": 1,
                "appName": "RefCommonsMA",
                "overrides": {
                    "lblNewsAdvisor": {
                        "text": "Technology News"
                    },
                    "newsarticles": {
                        "isVisible": true
                    },
                    "segLatestNews": {
                        "isVisible": true
                    }
                }
            }, {
                "paddingInPixel": false,
                "overrides": {}
            }, {
                "overrides": {}
            });
            var lblWelcomeMessage = new voltmx.ui.Label({
                "id": "lblWelcomeMessage",
                "isVisible": true,
                "left": "40dp",
                "skin": "sknLblHeading2",
                "text": "Welcome Fabio!",
                "textStyle": {
                    "letterSpacing": 0,
                    "strikeThrough": false
                },
                "top": 25,
                "width": voltmx.flex.USE_PREFERRED_SIZE,
                "zIndex": 1
            }, {
                "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
                "padding": [0, 0, 0, 0],
                "paddingInPixel": false
            }, {
                "textCopyable": false
            });
            var lblHelpMsg = new voltmx.ui.Label({
                "id": "lblHelpMsg",
                "isVisible": true,
                "left": "40dp",
                "skin": "sknLblHeading3",
                "text": voltmx.i18n.getLocalizedString("welcomeQuestion"),
                "textStyle": {
                    "letterSpacing": 0,
                    "strikeThrough": false
                },
                "top": "10dp",
                "width": voltmx.flex.USE_PREFERRED_SIZE,
                "zIndex": 1
            }, {
                "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
                "padding": [0, 0, 0, 0],
                "paddingInPixel": false
            }, {
                "textCopyable": false
            });
            var btnRequests = new com.hclacademy.custombuttonwithimageandtext({
                "autogrowMode": voltmx.flex.AUTOGROW_NONE,
                "height": "50dp",
                "id": "btnRequests",
                "isVisible": true,
                "layoutType": voltmx.flex.FLOW_HORIZONTAL,
                "left": "40dp",
                "masterType": constants.MASTER_TYPE_DEFAULT,
                "isModalContainer": false,
                "onTouchEnd": controller.onTouchEndHandlerForBtnRequestsOnFrmDashboard,
                "skin": "sknFlxBtnNormal",
                "top": "20dp",
                "width": "80%",
                "zIndex": 1,
                "appName": "RefCommonsMA",
                "overrides": {
                    "custombuttonwithimageandtext": {
                        "height": "50dp",
                        "left": "40dp",
                        "top": "20dp",
                        "width": "80%"
                    },
                    "imgAction": {
                        "height": "40dp",
                        "src": "erequest.png"
                    },
                    "lblAction": {
                        "text": voltmx.i18n.getLocalizedString("requests")
                    }
                }
            }, {
                "paddingInPixel": false,
                "overrides": {}
            }, {
                "overrides": {}
            });
            btnRequests.onTouchEnd = controller.onTouchEndHandlerForBtnRequestsOnFrmDashboard;
            var btnGrievances = new com.hclacademy.custombuttonwithimageandtext({
                "autogrowMode": voltmx.flex.AUTOGROW_NONE,
                "height": "50dp",
                "id": "btnGrievances",
                "isVisible": true,
                "layoutType": voltmx.flex.FLOW_HORIZONTAL,
                "left": "40dp",
                "masterType": constants.MASTER_TYPE_DEFAULT,
                "isModalContainer": false,
                "onTouchEnd": controller.onTouchEndHandlerForBtnGrievancesOnFrmDashboard,
                "skin": "sknFlxBtnNormal",
                "top": "20dp",
                "width": "80%",
                "zIndex": 1,
                "appName": "RefCommonsMA",
                "overrides": {
                    "custombuttonwithimageandtext": {
                        "height": "50dp",
                        "left": "40dp",
                        "top": "20dp",
                        "width": "80%"
                    },
                    "imgAction": {
                        "src": "ecomplaint.png"
                    },
                    "lblAction": {
                        "text": voltmx.i18n.getLocalizedString("complaints")
                    }
                }
            }, {
                "paddingInPixel": false,
                "overrides": {}
            }, {
                "overrides": {}
            });
            btnGrievances.onTouchEnd = controller.onTouchEndHandlerForBtnGrievancesOnFrmDashboard;
            var btnWeatherAlert = new com.hclacademy.custombuttonwithimageandtext({
                "autogrowMode": voltmx.flex.AUTOGROW_NONE,
                "height": "50dp",
                "id": "btnWeatherAlert",
                "isVisible": true,
                "layoutType": voltmx.flex.FLOW_HORIZONTAL,
                "left": "40dp",
                "masterType": constants.MASTER_TYPE_DEFAULT,
                "isModalContainer": false,
                "onTouchEnd": controller.onTouchEndHandlerForBtnWeatherAlertOnFrmDashboard,
                "skin": "sknFlxBtnNormal",
                "top": "20dp",
                "width": "80%",
                "zIndex": 1,
                "appName": "RefCommonsMA",
                "overrides": {
                    "custombuttonwithimageandtext": {
                        "height": "50dp",
                        "isVisible": true,
                        "left": "40dp",
                        "top": "20dp",
                        "width": "80%"
                    },
                    "imgAction": {
                        "centerY": "50%",
                        "height": "40dp",
                        "left": "10dp",
                        "src": "weatheralert.png",
                        "width": "50dp"
                    },
                    "lblAction": {
                        "text": voltmx.i18n.getLocalizedString("weather")
                    }
                }
            }, {
                "paddingInPixel": false,
                "overrides": {}
            }, {
                "overrides": {}
            });
            btnWeatherAlert.onTouchEnd = controller.onTouchEndHandlerForBtnWeatherAlertOnFrmDashboard;
            var btnTaxManagement = new com.hclacademy.custombuttonwithimageandtext({
                "autogrowMode": voltmx.flex.AUTOGROW_NONE,
                "height": "50dp",
                "id": "btnTaxManagement",
                "isVisible": false,
                "layoutType": voltmx.flex.FLOW_HORIZONTAL,
                "left": "40dp",
                "masterType": constants.MASTER_TYPE_DEFAULT,
                "isModalContainer": false,
                "skin": "sknFlxBtnNormal",
                "top": "20dp",
                "width": "80%",
                "zIndex": 1,
                "appName": "RefCommonsMA",
                "overrides": {
                    "custombuttonwithimageandtext": {
                        "height": "50dp",
                        "isVisible": false,
                        "left": "40dp",
                        "top": "20dp",
                        "width": "80%"
                    },
                    "imgAction": {
                        "centerY": "50%",
                        "height": "35dp",
                        "left": "10dp",
                        "src": "tax.png",
                        "width": "50dp"
                    },
                    "lblAction": {
                        "text": "Tax"
                    }
                }
            }, {
                "paddingInPixel": false,
                "overrides": {}
            }, {
                "overrides": {}
            });
            var btnDisasterManagement = new com.hclacademy.custombuttonwithimageandtext({
                "autogrowMode": voltmx.flex.AUTOGROW_NONE,
                "height": "50dp",
                "id": "btnDisasterManagement",
                "isVisible": false,
                "layoutType": voltmx.flex.FLOW_HORIZONTAL,
                "left": "40dp",
                "masterType": constants.MASTER_TYPE_DEFAULT,
                "isModalContainer": false,
                "skin": "sknFlxBtnNormal",
                "top": "20dp",
                "width": "80%",
                "zIndex": 1,
                "appName": "RefCommonsMA",
                "overrides": {
                    "custombuttonwithimageandtext": {
                        "isVisible": false,
                        "left": "40dp",
                        "top": "20dp",
                        "width": "80%"
                    },
                    "imgAction": {
                        "height": "40dp",
                        "src": "disastermanagement.png"
                    },
                    "lblAction": {
                        "text": "Disaster Management"
                    }
                }
            }, {
                "paddingInPixel": false,
                "overrides": {}
            }, {
                "overrides": {}
            });
            flxMainContent.add(formheader, newsarticles, lblWelcomeMessage, lblHelpMsg, btnRequests, btnGrievances, btnWeatherAlert, btnTaxManagement, btnDisasterManagement);
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
                "overrides": {
                    "hamburgermenu": {
                        "left": "-90%"
                    },
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
            hamburgermenu.segMenu.onRowClick = controller.onRowClickHandlerForSegMenuOnFrmDashboard;
            this.add(flxMainContent, hamburgermenu);
        };
        return [{
            "addWidgets": addWidgetsfrmDashboard,
            "enabledForIdleTimeout": false,
            "id": "frmDashboard",
            "layoutType": voltmx.flex.FREE_FORM,
            "needAppMenu": false,
            "postShow": controller.AS_Form_ic671ad9d51e45908e50452cdff85652,
            "preShow": function(eventobject) {
                controller.preShowHandlerForFrmDashboard(eventobject);
            },
            "skin": "sknFrm1",
            "appName": "RefGovtCitizenSA",
            "info": {
                "kuid": "fcbc1ed742fd42bfba1f4b347c731809"
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
            "windowSoftInputMode": constants.FORM_ADJUST_RESIZE
        }]
    }
});