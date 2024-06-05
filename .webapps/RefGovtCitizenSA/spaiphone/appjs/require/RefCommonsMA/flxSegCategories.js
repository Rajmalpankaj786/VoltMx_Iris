define("RefCommonsMA/flxSegCategories", function() {
    return function(controller) {
        var flxSegCategories = new voltmx.ui.FlexContainer({
            "autogrowMode": voltmx.flex.AUTOGROW_NONE,
            "clipBounds": false,
            "height": "40dp",
            "id": "flxSegCategories",
            "isVisible": true,
            "layoutType": voltmx.flex.FREE_FORM,
            "left": "0dp",
            "isModalContainer": false,
            "skin": "slFbox",
            "top": "0dp",
            "width": "100%",
            "appName": "RefCommonsMA"
        }, {
            "paddingInPixel": false
        }, {});
        flxSegCategories.setDefaultUnit(voltmx.flex.DP);
        var lblCategory = new voltmx.ui.Label({
            "centerY": "50%",
            "id": "lblCategory",
            "isVisible": true,
            "left": "3%",
            "skin": "sknLblHeading2",
            "text": "Category",
            "textStyle": {},
            "width": voltmx.flex.USE_PREFERRED_SIZE,
            "zIndex": 1
        }, {
            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, {
            "renderAsAnchor": false,
            "textCopyable": false
        });
        flxSegCategories.add(lblCategory);
        return flxSegCategories;
    }
})