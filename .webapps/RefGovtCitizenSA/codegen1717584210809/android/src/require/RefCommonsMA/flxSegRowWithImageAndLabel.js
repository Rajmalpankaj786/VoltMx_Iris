define("RefCommonsMA/flxSegRowWithImageAndLabel", function() {
    return function(controller) {
        var flxSegRowWithImageAndLabel = new voltmx.ui.FlexContainer({
            "autogrowMode": voltmx.flex.AUTOGROW_NONE,
            "clipBounds": false,
            "height": "75dp",
            "id": "flxSegRowWithImageAndLabel",
            "isVisible": true,
            "layoutType": voltmx.flex.FLOW_HORIZONTAL,
            "left": "0dp",
            "isModalContainer": false,
            "skin": "slFbox",
            "top": "0dp",
            "width": "100%",
            "appName": "RefCommonsMA"
        }, {
            "paddingInPixel": false
        }, {});
        flxSegRowWithImageAndLabel.setDefaultUnit(voltmx.flex.DP);
        var imgMenuOption = new voltmx.ui.Image2({
            "centerY": "50%",
            "height": "40dp",
            "id": "imgMenuOption",
            "isVisible": true,
            "left": "10dp",
            "skin": "slImage",
            "src": "imagedrag.png",
            "width": "40dp",
            "zIndex": 1
        }, {
            "imageScaleMode": constants.IMAGE_SCALE_MODE_MAINTAIN_ASPECT_RATIO,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, {});
        var lblMenuOption = new voltmx.ui.Label({
            "centerY": "50%",
            "id": "lblMenuOption",
            "isVisible": true,
            "left": "10dp",
            "skin": "sknLblHeading2",
            "text": "Category",
            "textStyle": {
                "letterSpacing": 0,
                "strikeThrough": false
            },
            "width": voltmx.flex.USE_PREFERRED_SIZE,
            "zIndex": 1
        }, {
            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, {
            "textCopyable": false
        });
        flxSegRowWithImageAndLabel.add(imgMenuOption, lblMenuOption);
        return flxSegRowWithImageAndLabel;
    }
})