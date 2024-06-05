define("RefEComplaintsMA/frmEComplaintsDashboard", function() {
    return function(controller) {
        function addWidgetsfrmEComplaintsDashboard() {
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
                "appName": "RefEComplaintsMA"
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
                        "text": "Complaints"
                    }
                }
            }, {
                "paddingInPixel": false,
                "overrides": {}
            }, {
                "overrides": {}
            });
            formheader.imgBack.onTouchEnd = controller.AS_Image_d7d6917d5d714aaf911cff58cff1583e;
            formheader.imgMenu.onTouchEnd = controller.AS_Image_f50b09db2b1945de8ed31ac35027eb6f;
            var btnNewComplaint = new com.hclacademy.custombuttonwithimageandtext({
                "autogrowMode": voltmx.flex.AUTOGROW_NONE,
                "height": "50dp",
                "id": "btnNewComplaint",
                "isVisible": true,
                "layoutType": voltmx.flex.FLOW_HORIZONTAL,
                "left": "40dp",
                "masterType": constants.MASTER_TYPE_DEFAULT,
                "isModalContainer": false,
                "onTouchEnd": controller.AS_UWI_b1e9e1ee47964c9e92d20e1b86d4ddf7,
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
                    "lblAction": {
                        "text": "New Complaint"
                    }
                }
            }, {
                "paddingInPixel": false,
                "overrides": {}
            }, {
                "overrides": {}
            });
            btnNewComplaint.onTouchEnd = controller.AS_UWI_b1e9e1ee47964c9e92d20e1b86d4ddf7;
            var btnPreviousComplaints = new com.hclacademy.custombuttonwithimageandtext({
                "autogrowMode": voltmx.flex.AUTOGROW_NONE,
                "height": "50dp",
                "id": "btnPreviousComplaints",
                "isVisible": true,
                "layoutType": voltmx.flex.FLOW_HORIZONTAL,
                "left": "40dp",
                "masterType": constants.MASTER_TYPE_DEFAULT,
                "isModalContainer": false,
                "onTouchEnd": controller.AS_UWI_ae4c5f30957542279bb34b3b236f8bec,
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
                        "text": "My Previous Complaints"
                    }
                }
            }, {
                "paddingInPixel": false,
                "overrides": {}
            }, {
                "overrides": {}
            });
            btnPreviousComplaints.onTouchEnd = controller.AS_UWI_ae4c5f30957542279bb34b3b236f8bec;
            flxMainContent.add(formheader, btnNewComplaint, btnPreviousComplaints);
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
            hamburgermenu.segMenu.onRowClick = controller.AS_Segment_dad0b862a2fb404785f83f69d316f3be;
            this.add(flxMainContent, hamburgermenu);
        };
        return [{
            "addWidgets": addWidgetsfrmEComplaintsDashboard,
            "enabledForIdleTimeout": false,
            "id": "frmEComplaintsDashboard",
            "layoutType": voltmx.flex.FREE_FORM,
            "needAppMenu": false,
            "skin": "sknFrm1",
            "appName": "RefEComplaintsMA",
            "info": {
                "kuid": "i8f5021dc1ca49a499f141fa7086e1db"
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
            "titleBar": false
        }]
    }
});