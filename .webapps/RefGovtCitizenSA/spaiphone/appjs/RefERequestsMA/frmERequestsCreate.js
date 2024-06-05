define("RefERequestsMA/frmERequestsCreate", function() {
    return function(controller) {
        function addWidgetsfrmERequestsCreate() {
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
                        "centerX": "50.00%",
                        "centerY": "50.00%",
                        "text": "Requests"
                    }
                }
            }, {
                "paddingInPixel": false,
                "overrides": {}
            }, {
                "overrides": {}
            });
            formheader.imgBack.onTouchEnd = controller.AS_Image_e74ef9a59fdc4fd09635de2f78fab4bc;
            formheader.imgMenu.onTouchEnd = controller.AS_Image_je49995bd48845c8bea691fb45c870c8;
            var createRequest = new com.hclacademy.createcomplaintorrequest({
                "height": "90%",
                "id": "createRequest",
                "isVisible": true,
                "left": "0dp",
                "masterType": constants.MASTER_TYPE_USERWIDGET,
                "isModalContainer": false,
                "skin": "slFbox",
                "top": "10%",
                "width": "100%",
                "zIndex": 1,
                "appName": "RefCommonsMA",
                "viewType": "createRequest",
                "overrides": {
                    "lblCapturePhoto": {
                        "text": "Tap here to capture photo of request"
                    },
                    "createcomplaintorrequest": {
                        "right": "viz.val_cleared",
                        "bottom": "viz.val_cleared",
                        "minWidth": "viz.val_cleared",
                        "minHeight": "viz.val_cleared",
                        "maxWidth": "viz.val_cleared",
                        "maxHeight": "viz.val_cleared",
                        "centerX": "viz.val_cleared",
                        "centerY": "viz.val_cleared"
                    }
                }
            }, {
                "paddingInPixel": false,
                "overrides": {}
            }, {
                "overrides": {}
            });
            createRequest.createComplaintOrRequest = "Request";
            createRequest.complaintOrRequestObject = {
                "CategoryID": "",
                "Name": "",
                "Phone": "",
                "Location": "",
                "Description": "",
                "Photo": "",
                "Status": "Submitted"
            };
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
            hamburgermenu.segMenu.onRowClick = controller.AS_Segment_g0419e50ba3943a4ba52503026b6589f;
            this.add(formheader, createRequest, hamburgermenu);
        };
        return [{
            "addWidgets": addWidgetsfrmERequestsCreate,
            "enabledForIdleTimeout": false,
            "id": "frmERequestsCreate",
            "layoutType": voltmx.flex.FREE_FORM,
            "needAppMenu": false,
            "skin": "sknFrm1",
            "appName": "RefERequestsMA",
            "preShow": function(eventobject) {
                controller.AS_Form_dab040edfb914172afcb161bcc3ab778(eventobject);
            },
            "info": {
                "kuid": "fd35171f4b3b47f8aeb4964823132df3"
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