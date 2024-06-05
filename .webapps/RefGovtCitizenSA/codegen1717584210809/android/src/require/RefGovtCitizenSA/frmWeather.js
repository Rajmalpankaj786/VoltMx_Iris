define("RefGovtCitizenSA/frmWeather", function() {
    return function(controller) {
        function addWidgetsfrmWeather() {
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
                        "centerY": "50.00%",
                        "right": 5
                    },
                    "lblCompanyName": {
                        "text": "e-Governance"
                    }
                }
            }, {
                "paddingInPixel": false,
                "overrides": {}
            }, {
                "overrides": {}
            });
            formheader.imgBack.onTouchEnd = controller.onTouchEndHandlerForImgBackOnFrmWeather;
            formheader.imgMenu.onTouchEnd = controller.onTouchEndHandlerForImgMenuOnFrmWeather;
            var mapWeather = new voltmx.ui.Map({
                "calloutTemplate": kony.mvc.resolveNameFromContext({
                    "appName": "RefCommonsMA",
                    "friendlyName": "flxMapWeatherCallout"
                }),
                "calloutWidth": 80,
                "defaultPinImage": "pinb.png",
                "height": "90%",
                "id": "mapWeather",
                "isVisible": true,
                "left": "0dp",
                "provider": constants.MAP_PROVIDER_GOOGLE,
                "top": "0%",
                "widgetDataMapForCallout": {
                    "flxCountry": "flxCountry",
                    "flxDescription": "flxDescription",
                    "flxMapWeatherCallout": "flxMapWeatherCallout",
                    "flxMaxTemp": "flxMaxTemp",
                    "flxMinTemp": "flxMinTemp",
                    "flxState": "flxState",
                    "flxWeatherDetails": "flxWeatherDetails",
                    "imgWeather": "imgWeather",
                    "lblCountry": "lblCountry",
                    "lblCountryValue": "lblCountryValue",
                    "lblDescription": "lblDescription",
                    "lblDescriptionValue": "lblDescriptionValue",
                    "lblMaxTemp": "lblMaxTemp",
                    "lblMaxTempValue": "lblMaxTempValue",
                    "lblMinTemp": "lblMinTemp",
                    "lblMinTempValue": "lblMinTempValue",
                    "lblState": "lblState",
                    "lblStateValue": "lblStateValue"
                },
                "width": "100%",
                "zIndex": 1
            }, {}, {
                "mode": constants.MAP_VIEW_MODE_NORMAL,
                "showZoomControl": true,
                "zoomLevel": 4
            });
            flxMainContent.add(formheader, mapWeather);
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
            hamburgermenu.segMenu.onRowClick = controller.onRowClickHandlerForSegMenuOnFrmWeather;
            this.add(flxMainContent, hamburgermenu);
        };
        return [{
            "addWidgets": addWidgetsfrmWeather,
            "enabledForIdleTimeout": false,
            "id": "frmWeather",
            "layoutType": voltmx.flex.FREE_FORM,
            "needAppMenu": false,
            "postShow": controller.AS_Form_cecaa69d0e994da9bca00128c0b57281,
            "skin": "sknFrm1",
            "appName": "RefGovtCitizenSA",
            "info": {
                "kuid": "e0e62c55c46744abbf8df19b5749c8ae"
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