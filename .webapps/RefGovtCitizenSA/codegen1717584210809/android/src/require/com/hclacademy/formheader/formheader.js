define(function() {
    return function(controller) {
        var formheader = new voltmx.ui.FlexContainer(extendConfig({
            "autogrowMode": voltmx.flex.AUTOGROW_NONE,
            "clipBounds": false,
            "isMaster": true,
            "height": "10%",
            "id": "formheader",
            "isVisible": true,
            "layoutType": voltmx.flex.FREE_FORM,
            "left": "0dp",
            "isModalContainer": false,
            "skin": "slFbox",
            "top": "0dp",
            "width": "100%",
            "zIndex": 1,
            "appName": "RefCommonsMA"
        }, controller.args[0], "formheader"), extendConfig({
            "paddingInPixel": false
        }, controller.args[1], "formheader"), extendConfig({}, controller.args[2], "formheader"));
        formheader.setDefaultUnit(voltmx.flex.DP);
        var imgMenu = new voltmx.ui.Image2(extendConfig({
            "centerY": "50%",
            "height": "40dp",
            "id": "imgMenu",
            "isVisible": true,
            "left": "5dp",
            "skin": "slImage",
            "src": "menu.png",
            "width": "40dp",
            "zIndex": 1
        }, controller.args[0], "imgMenu"), extendConfig({
            "imageScaleMode": constants.IMAGE_SCALE_MODE_MAINTAIN_ASPECT_RATIO,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, controller.args[1], "imgMenu"), extendConfig({}, controller.args[2], "imgMenu"));
        var imgBack = new voltmx.ui.Image2(extendConfig({
            "centerY": "50%",
            "height": "40dp",
            "id": "imgBack",
            "isVisible": true,
            "right": 50,
            "skin": "slImage",
            "src": "backarrow.png",
            "width": "40dp",
            "zIndex": 1
        }, controller.args[0], "imgBack"), extendConfig({
            "imageScaleMode": constants.IMAGE_SCALE_MODE_MAINTAIN_ASPECT_RATIO,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, controller.args[1], "imgBack"), extendConfig({}, controller.args[2], "imgBack"));
        var lblCompanyName = new voltmx.ui.Label(extendConfig({
            "centerX": "50%",
            "centerY": "50%",
            "id": "lblCompanyName",
            "isVisible": true,
            "skin": "sknLblHeading1",
            "text": "HCLSOFTWARE",
            "textStyle": {
                "letterSpacing": 0,
                "strikeThrough": false
            },
            "width": voltmx.flex.USE_PREFERRED_SIZE,
            "zIndex": 1
        }, controller.args[0], "lblCompanyName"), extendConfig({
            "contentAlignment": constants.CONTENT_ALIGN_CENTER,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, controller.args[1], "lblCompanyName"), extendConfig({
            "textCopyable": false
        }, controller.args[2], "lblCompanyName"));
        var flxProfilePhoto = new voltmx.ui.FlexContainer(extendConfig({
            "autogrowMode": voltmx.flex.AUTOGROW_NONE,
            "centerY": "50%",
            "clipBounds": true,
            "height": "40dp",
            "id": "flxProfilePhoto",
            "isVisible": true,
            "layoutType": voltmx.flex.FREE_FORM,
            "isModalContainer": false,
            "right": 5,
            "skin": "sknFlx5",
            "width": "40dp",
            "zIndex": 1,
            "appName": "RefCommonsMA"
        }, controller.args[0], "flxProfilePhoto"), extendConfig({
            "paddingInPixel": false
        }, controller.args[1], "flxProfilePhoto"), extendConfig({}, controller.args[2], "flxProfilePhoto"));
        flxProfilePhoto.setDefaultUnit(voltmx.flex.DP);
        var imgProfile = new voltmx.ui.Image2(extendConfig({
            "centerX": "50%",
            "centerY": "50%",
            "height": "100%",
            "id": "imgProfile",
            "isVisible": true,
            "skin": "slImage",
            "src": "userprofile.png",
            "width": "100%",
            "zIndex": 1
        }, controller.args[0], "imgProfile"), extendConfig({
            "imageScaleMode": constants.IMAGE_SCALE_MODE_FIT_TO_DIMENSIONS,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, controller.args[1], "imgProfile"), extendConfig({}, controller.args[2], "imgProfile"));
        flxProfilePhoto.add(imgProfile);
        formheader.add(imgMenu, imgBack, lblCompanyName, flxProfilePhoto);
        return formheader;
    }
})