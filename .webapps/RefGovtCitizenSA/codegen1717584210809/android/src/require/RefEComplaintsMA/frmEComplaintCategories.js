define("RefEComplaintsMA/frmEComplaintCategories", function() {
    return function(controller) {
        function addWidgetsfrmEComplaintCategories() {
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
                        "text": "Complaints"
                    }
                }
            }, {
                "paddingInPixel": false,
                "overrides": {}
            }, {
                "overrides": {}
            });
            formheader.imgBack.onTouchEnd = controller.AS_Image_e310ed4cad51499da8f210a794972e70;
            formheader.imgMenu.onTouchEnd = controller.AS_Image_cac4e58d220b4d07a21af3d6d807ae92;
            var categories = new com.hclacademy.categories({
                "autogrowMode": voltmx.flex.AUTOGROW_NONE,
                "height": "90%",
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
                        "height": "90%",
                        "top": "10%"
                    },
                    "segCategories": {
                        "data": [{
                            "lblCategory": "Engineering"
                        }, {
                            "lblCategory": "Electrical"
                        }, {
                            "lblCategory": "Health and Sanitation"
                        }, {
                            "lblCategory": "Entomology"
                        }, {
                            "lblCategory": "Veterinary"
                        }, {
                            "lblCategory": "Town Planning"
                        }, {
                            "lblCategory": "Urban Biodiversity"
                        }, {
                            "lblCategory": "Advertisement"
                        }, {
                            "lblCategory": "Estates"
                        }, {
                            "lblCategory": "Sports"
                        }, {
                            "lblCategory": "Urban Community Development"
                        }, {
                            "lblCategory": "Revenue (Property Tax)"
                        }, {
                            "lblCategory": "Elections"
                        }, {
                            "lblCategory": "Information Technology"
                        }, {
                            "lblCategory": "Land Acquisition"
                        }, {
                            "lblCategory": "Parking"
                        }, {
                            "lblCategory": "Fire Prevention Wing"
                        }, {
                            "lblCategory": "Construction and Demolition Waste"
                        }]
                    }
                }
            }, {
                "paddingInPixel": false,
                "overrides": {}
            }, {
                "overrides": {}
            });
            categories.segCategories.onRowClick = controller.AS_Segment_e30f2fdff2284e47ba5496bae1d30959;
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
                    "segMenu": {
                        "data": [{
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
            hamburgermenu.segMenu.onRowClick = controller.AS_Segment_i50dab2e48b24feda1d7221c9b4958b5;
            this.add(formheader, categories, hamburgermenu);
        };
        return [{
            "addWidgets": addWidgetsfrmEComplaintCategories,
            "enabledForIdleTimeout": false,
            "id": "frmEComplaintCategories",
            "layoutType": voltmx.flex.FREE_FORM,
            "needAppMenu": false,
            "postShow": controller.AS_Form_id732fc0bfcb444aab538e01dd6788c6,
            "skin": "sknFrm1",
            "appName": "RefEComplaintsMA",
            "info": {
                "kuid": "aa3a8d906c9946c2b289f049ed23b43d"
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