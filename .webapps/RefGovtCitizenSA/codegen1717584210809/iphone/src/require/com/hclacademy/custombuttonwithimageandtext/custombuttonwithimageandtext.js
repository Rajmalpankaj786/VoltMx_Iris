define(function() {
    return function(controller) {
        var custombuttonwithimageandtext = new voltmx.ui.FlexContainer(extendConfig({
            "autogrowMode": voltmx.flex.AUTOGROW_NONE,
            "clipBounds": false,
            "isMaster": true,
            "height": "50dp",
            "id": "custombuttonwithimageandtext",
            "isVisible": true,
            "layoutType": voltmx.flex.FLOW_HORIZONTAL,
            "left": "0dp",
            "isModalContainer": false,
            "skin": "sknFlxBtnNormal",
            "top": "0dp",
            "width": "100%",
            "zIndex": 1,
            "appName": "RefCommonsMA"
        }, controller.args[0], "custombuttonwithimageandtext"), extendConfig({
            "paddingInPixel": false
        }, controller.args[1], "custombuttonwithimageandtext"), extendConfig({}, controller.args[2], "custombuttonwithimageandtext"));
        custombuttonwithimageandtext.setDefaultUnit(voltmx.flex.DP);
        var imgAction = new voltmx.ui.Image2(extendConfig({
            "centerY": "50%",
            "height": "50dp",
            "id": "imgAction",
            "isVisible": true,
            "left": "10dp",
            "skin": "slImage",
            "src": "plus.png",
            "width": "50dp",
            "zIndex": 1
        }, controller.args[0], "imgAction"), extendConfig({
            "imageScaleMode": constants.IMAGE_SCALE_MODE_MAINTAIN_ASPECT_RATIO,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, controller.args[1], "imgAction"), extendConfig({}, controller.args[2], "imgAction"));
        var lblAction = new voltmx.ui.Label(extendConfig({
            "centerY": "50%",
            "id": "lblAction",
            "isVisible": true,
            "left": "10dp",
            "skin": "sknLblDescription",
            "text": "New Request",
            "textStyle": {},
            "width": voltmx.flex.USE_PREFERRED_SIZE,
            "zIndex": 1
        }, controller.args[0], "lblAction"), extendConfig({
            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, controller.args[1], "lblAction"), extendConfig({
            "textCopyable": false,
            "wrapping": constants.WIDGET_TEXT_WORD_WRAP
        }, controller.args[2], "lblAction"));
        custombuttonwithimageandtext.add(imgAction, lblAction);
        return custombuttonwithimageandtext;
    }
})