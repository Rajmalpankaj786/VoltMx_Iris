define(function() {
    return function(controller) {
        var createcomplaintorrequest = new voltmx.ui.FlexContainer(extendConfig({
            "autogrowMode": voltmx.flex.AUTOGROW_NONE,
            "clipBounds": false,
            "isMaster": true,
            "height": "100%",
            "id": "createcomplaintorrequest",
            "isVisible": true,
            "layoutType": voltmx.flex.FREE_FORM,
            "left": "0dp",
            "isModalContainer": false,
            "preShow": function(eventobject) {
                controller.AS_FlexContainer_f0f289bfda5c40c5912d866b8e2eb58d(eventobject);
            },
            "skin": "slFbox",
            "top": "0dp",
            "width": "100%",
            "zIndex": 1,
            "appName": "RefCommonsMA"
        }, controller.args[0], "createcomplaintorrequest"), extendConfig({
            "paddingInPixel": false
        }, controller.args[1], "createcomplaintorrequest"), extendConfig({}, controller.args[2], "createcomplaintorrequest"));
        createcomplaintorrequest.setDefaultUnit(voltmx.flex.DP);
        var flxMainContent = new voltmx.ui.FlexContainer(extendConfig({
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
            "appName": "RefCommonsMA"
        }, controller.args[0], "flxMainContent"), extendConfig({
            "paddingInPixel": false
        }, controller.args[1], "flxMainContent"), extendConfig({}, controller.args[2], "flxMainContent"));
        flxMainContent.setDefaultUnit(voltmx.flex.DP);
        var flxPhoto = new voltmx.ui.FlexContainer(extendConfig({
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
            "appName": "RefCommonsMA"
        }, controller.args[0], "flxPhoto"), extendConfig({
            "paddingInPixel": false
        }, controller.args[1], "flxPhoto"), extendConfig({}, controller.args[2], "flxPhoto"));
        flxPhoto.setDefaultUnit(voltmx.flex.DP);
        var imgPhoto = new voltmx.ui.Image2(extendConfig({
            "height": "100%",
            "id": "imgPhoto",
            "isVisible": false,
            "left": "0dp",
            "skin": "slImage",
            "src": "imagedrag.png",
            "top": "0dp",
            "width": "100%",
            "zIndex": 1
        }, controller.args[0], "imgPhoto"), extendConfig({
            "imageScaleMode": constants.IMAGE_SCALE_MODE_FIT_TO_DIMENSIONS,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, controller.args[1], "imgPhoto"), extendConfig({}, controller.args[2], "imgPhoto"));
        var camCapturePhoto = new voltmx.ui.Camera(extendConfig({
            "centerX": "50%",
            "centerY": "45%",
            "height": "100dp",
            "id": "camCapturePhoto",
            "isVisible": true,
            "onCapture": controller.AS_Camera_f8e18a5014db4f6d8abce83b43035ad0,
            "skin": "sknCamWithImage",
            "width": "100dp",
            "zIndex": 1
        }, controller.args[0], "camCapturePhoto"), extendConfig({
            "contentAlignment": constants.CONTENT_ALIGN_CENTER,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, controller.args[1], "camCapturePhoto"), extendConfig({
            "accessMode": constants.CAMERA_IMAGE_ACCESS_MODE_PUBLIC,
            "enableOverlay": false,
            "nativeUserInterface": true
        }, controller.args[2], "camCapturePhoto"));
        var lblCapturePhoto = new voltmx.ui.Label(extendConfig({
            "centerX": "50%",
            "centerY": "65%",
            "id": "lblCapturePhoto",
            "isVisible": true,
            "skin": "sknLblHeading2",
            "text": "Tap here to capture photo of complaint",
            "textStyle": {},
            "width": voltmx.flex.USE_PREFERRED_SIZE,
            "zIndex": 1
        }, controller.args[0], "lblCapturePhoto"), extendConfig({
            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, controller.args[1], "lblCapturePhoto"), extendConfig({
            "textCopyable": false,
            "wrapping": constants.WIDGET_TEXT_WORD_WRAP
        }, controller.args[2], "lblCapturePhoto"));
        flxPhoto.add(imgPhoto, camCapturePhoto, lblCapturePhoto);
        var lblTitle = new voltmx.ui.Label(extendConfig({
            "centerX": "50%",
            "id": "lblTitle",
            "isVisible": true,
            "skin": "sknLblHeading2",
            "text": "Report Flooding Complaint",
            "textStyle": {},
            "top": "20dp",
            "width": voltmx.flex.USE_PREFERRED_SIZE,
            "zIndex": 1
        }, controller.args[0], "lblTitle"), extendConfig({
            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, controller.args[1], "lblTitle"), extendConfig({
            "textCopyable": false,
            "wrapping": constants.WIDGET_TEXT_WORD_WRAP
        }, controller.args[2], "lblTitle"));
        var inputLocation = new com.hclacademy.userinput(extendConfig({
            "autogrowMode": voltmx.flex.AUTOGROW_NONE,
            "centerX": "50%",
            "height": "10%",
            "id": "inputLocation",
            "isVisible": true,
            "layoutType": voltmx.flex.FLOW_VERTICAL,
            "masterType": constants.MASTER_TYPE_DEFAULT,
            "isModalContainer": false,
            "skin": "slFbox",
            "top": "10dp",
            "width": "90%",
            "zIndex": 1,
            "appName": "RefCommonsMA",
            "overrides": {
                "lblInputTitle": {
                    "text": "Location"
                },
                "tbxInput": {
                    "placeholder": "Enter address"
                },
                "userinput": {
                    "centerX": "50%",
                    "left": "viz.val_cleared",
                    "top": "10dp",
                    "width": "90%"
                }
            }
        }, controller.args[0], "inputLocation"), extendConfig({
            "paddingInPixel": false,
            "overrides": {}
        }, controller.args[1], "inputLocation"), extendConfig({
            "overrides": {}
        }, controller.args[2], "inputLocation"));
        var inputDescription = new com.hclacademy.userinput(extendConfig({
            "autogrowMode": voltmx.flex.AUTOGROW_NONE,
            "centerX": "50%",
            "height": "10%",
            "id": "inputDescription",
            "isVisible": true,
            "layoutType": voltmx.flex.FLOW_VERTICAL,
            "masterType": constants.MASTER_TYPE_DEFAULT,
            "isModalContainer": false,
            "skin": "slFbox",
            "top": "10dp",
            "width": "90%",
            "zIndex": 1,
            "appName": "RefCommonsMA",
            "overrides": {
                "lblInputTitle": {
                    "text": "Description"
                },
                "tbxInput": {
                    "placeholder": "Enter description"
                },
                "userinput": {
                    "centerX": "50%",
                    "left": "viz.val_cleared",
                    "top": "10dp",
                    "width": "90%"
                }
            }
        }, controller.args[0], "inputDescription"), extendConfig({
            "paddingInPixel": false,
            "overrides": {}
        }, controller.args[1], "inputDescription"), extendConfig({
            "overrides": {}
        }, controller.args[2], "inputDescription"));
        var inputName = new com.hclacademy.userinput(extendConfig({
            "autogrowMode": voltmx.flex.AUTOGROW_NONE,
            "centerX": "50%",
            "height": "10%",
            "id": "inputName",
            "isVisible": true,
            "layoutType": voltmx.flex.FLOW_VERTICAL,
            "masterType": constants.MASTER_TYPE_DEFAULT,
            "isModalContainer": false,
            "skin": "slFbox",
            "top": "10dp",
            "width": "90%",
            "zIndex": 1,
            "appName": "RefCommonsMA",
            "overrides": {
                "lblInputTitle": {
                    "text": "Name"
                },
                "tbxInput": {
                    "placeholder": "Enter your name"
                },
                "userinput": {
                    "centerX": "50%",
                    "left": "viz.val_cleared",
                    "top": "10dp",
                    "width": "90%"
                }
            }
        }, controller.args[0], "inputName"), extendConfig({
            "paddingInPixel": false,
            "overrides": {}
        }, controller.args[1], "inputName"), extendConfig({
            "overrides": {}
        }, controller.args[2], "inputName"));
        var inputPhone = new com.hclacademy.userinput(extendConfig({
            "autogrowMode": voltmx.flex.AUTOGROW_NONE,
            "centerX": "50%",
            "height": "10%",
            "id": "inputPhone",
            "isVisible": true,
            "layoutType": voltmx.flex.FLOW_VERTICAL,
            "masterType": constants.MASTER_TYPE_DEFAULT,
            "isModalContainer": false,
            "skin": "slFbox",
            "top": "10dp",
            "width": "90%",
            "zIndex": 1,
            "appName": "RefCommonsMA",
            "overrides": {
                "lblInputTitle": {
                    "text": "Phone"
                },
                "tbxInput": {
                    "placeholder": "Enter phone number"
                },
                "userinput": {
                    "centerX": "50%",
                    "left": "viz.val_cleared",
                    "top": "10dp",
                    "width": "90%"
                }
            }
        }, controller.args[0], "inputPhone"), extendConfig({
            "paddingInPixel": false,
            "overrides": {}
        }, controller.args[1], "inputPhone"), extendConfig({
            "overrides": {}
        }, controller.args[2], "inputPhone"));
        var btnCreate = new voltmx.ui.Button(extendConfig({
            "centerX": "50%",
            "focusSkin": "sknBtnFocus",
            "height": "40dp",
            "id": "btnCreate",
            "isVisible": true,
            "onClick": controller.AS_Button_e9c7259bf6494f758143a18ce8a31461,
            "skin": "sknBtnNormal",
            "text": "Submit",
            "top": "15dp",
            "width": "200dp",
            "zIndex": 1
        }, controller.args[0], "btnCreate"), extendConfig({
            "contentAlignment": constants.CONTENT_ALIGN_CENTER,
            "displayText": true,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, controller.args[1], "btnCreate"), extendConfig({
            "showProgressIndicator": true
        }, controller.args[2], "btnCreate"));
        flxMainContent.add(flxPhoto, lblTitle, inputLocation, inputDescription, inputName, inputPhone, btnCreate);
        var infoalert = new com.hclacademy.infoalert(extendConfig({
            "autogrowMode": voltmx.flex.AUTOGROW_NONE,
            "centerX": "50%",
            "centerY": "50%",
            "height": "100%",
            "id": "infoalert",
            "isVisible": false,
            "layoutType": voltmx.flex.FREE_FORM,
            "masterType": constants.MASTER_TYPE_DEFAULT,
            "isModalContainer": false,
            "skin": "sknFlex4",
            "width": "100%",
            "zIndex": 1,
            "appName": "RefCommonsMA",
            "overrides": {
                "infoalert": {
                    "isVisible": false
                }
            }
        }, controller.args[0], "infoalert"), extendConfig({
            "paddingInPixel": false,
            "overrides": {}
        }, controller.args[1], "infoalert"), extendConfig({
            "overrides": {}
        }, controller.args[2], "infoalert"));
        createcomplaintorrequest.add(flxMainContent, infoalert);
        return createcomplaintorrequest;
    }
})