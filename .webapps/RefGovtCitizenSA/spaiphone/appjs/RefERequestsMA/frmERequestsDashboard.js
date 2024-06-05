define("RefERequestsMA/frmERequestsDashboard", function() {
    return function(controller) {
        function addWidgetsfrmERequestsDashboard() {
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
                "appName": "RefERequestsMA"
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
                    "imgMenu": {
                        "centerY": "50%",
                        "left": "5dp",
                        "src": "menu.png"
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
            formheader.imgBack.onTouchEnd = controller.AS_Image_ab5dc6c87b8546d4b9564a9f63982f8f;
            formheader.imgMenu.onTouchEnd = controller.AS_Image_de42f79df6c7435b8081bd43388aa2f5;
            var btnNewRequest = new com.hclacademy.custombuttonwithimageandtext({
                "autogrowMode": voltmx.flex.AUTOGROW_NONE,
                "height": "50dp",
                "id": "btnNewRequest",
                "isVisible": true,
                "layoutType": voltmx.flex.FLOW_HORIZONTAL,
                "left": "40dp",
                "masterType": constants.MASTER_TYPE_DEFAULT,
                "isModalContainer": false,
                "onTouchEnd": controller.AS_UWI_d80368c95f884823b85bce5b7f4494cd,
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
                        "src": "plus.png"
                    },
                    "lblAction": {
                        "text": "New Request"
                    }
                }
            }, {
                "paddingInPixel": false,
                "overrides": {}
            }, {
                "overrides": {}
            });
            btnNewRequest.onTouchEnd = controller.AS_UWI_d80368c95f884823b85bce5b7f4494cd;
            var btnPreviousRequests = new com.hclacademy.custombuttonwithimageandtext({
                "autogrowMode": voltmx.flex.AUTOGROW_NONE,
                "height": "50dp",
                "id": "btnPreviousRequests",
                "isVisible": true,
                "layoutType": voltmx.flex.FLOW_HORIZONTAL,
                "left": "40dp",
                "masterType": constants.MASTER_TYPE_DEFAULT,
                "isModalContainer": false,
                "onTouchEnd": controller.AS_UWI_f6ebef8695694c05b8c3f96e8b6a310b,
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
                        "src": "pencil.png"
                    },
                    "lblAction": {
                        "text": "My Previous Requests"
                    }
                }
            }, {
                "paddingInPixel": false,
                "overrides": {}
            }, {
                "overrides": {}
            });
            btnPreviousRequests.onTouchEnd = controller.AS_UWI_f6ebef8695694c05b8c3f96e8b6a310b;
            flxMainContent.add(formheader, btnNewRequest, btnPreviousRequests);
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
            hamburgermenu.segMenu.onRowClick = controller.AS_Segment_gc072928b8d64ba8af80a9c6f18e5a0f;
            this.add(flxMainContent, hamburgermenu);
        };
        return [{
            "addWidgets": addWidgetsfrmERequestsDashboard,
            "enabledForIdleTimeout": false,
            "id": "frmERequestsDashboard",
            "layoutType": voltmx.flex.FREE_FORM,
            "needAppMenu": false,
            "skin": "sknFrm1",
            "appName": "RefERequestsMA",
            "info": {
                "kuid": "f4b558b9954c4827a0c787dd5ca87fbf"
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