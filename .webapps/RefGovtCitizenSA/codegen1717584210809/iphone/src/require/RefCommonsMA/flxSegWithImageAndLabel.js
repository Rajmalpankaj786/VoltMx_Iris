define("RefCommonsMA/flxSegWithImageAndLabel", function() {
    return function(controller) {
        var flxSegWithImageAndLabel = new voltmx.ui.FlexContainer({
            "autogrowMode": voltmx.flex.AUTOGROW_HEIGHT,
            "clipBounds": false,
            "id": "flxSegWithImageAndLabel",
            "isVisible": true,
            "layoutType": voltmx.flex.FLOW_VERTICAL,
            "left": "0dp",
            "isModalContainer": false,
            "skin": "sknFlx1",
            "top": "0dp",
            "width": "100%",
            "appName": "RefCommonsMA"
        }, {
            "paddingInPixel": false
        }, {});
        flxSegWithImageAndLabel.setDefaultUnit(voltmx.flex.DP);
        var lblTitle = new voltmx.ui.Label({
            "id": "lblTitle",
            "isVisible": true,
            "left": "10dp",
            "skin": "sknLblDescription",
            "text": "Label",
            "textStyle": {},
            "top": "35dp",
            "width": "95%",
            "zIndex": 2
        }, {
            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, {
            "textCopyable": false,
            "wrapping": constants.WIDGET_TEXT_WORD_WRAP
        });
        var imgDisplayPic = new voltmx.ui.Image2({
            "zoomEnabled": false,
            "zoomValue": 5,
            "id": "imgDisplayPic",
            "isVisible": true,
            "left": 10,
            "skin": "slImage",
            "src": "imagedrag.png",
            "top": 5,
            "width": "95%",
            "zIndex": 1,
            "blur": {
                "enabled": false,
                "value": 100
            }
        }, {
            "imageScaleMode": constants.IMAGE_SCALE_MODE_MAINTAIN_ASPECT_RATIO,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, {});
        flxSegWithImageAndLabel.add(lblTitle, imgDisplayPic);
        return flxSegWithImageAndLabel;
    }
})