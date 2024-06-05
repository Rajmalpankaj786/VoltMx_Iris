define(function() {
    return function(controller) {
        var categories = new voltmx.ui.FlexContainer(extendConfig({
            "autogrowMode": voltmx.flex.AUTOGROW_NONE,
            "clipBounds": false,
            "isMaster": true,
            "height": "100%",
            "id": "categories",
            "isVisible": true,
            "layoutType": voltmx.flex.FREE_FORM,
            "left": "0dp",
            "isModalContainer": false,
            "skin": "slFbox",
            "top": "0dp",
            "width": "100%",
            "zIndex": 1,
            "appName": "RefCommonsMA"
        }, controller.args[0], "categories"), extendConfig({
            "paddingInPixel": false
        }, controller.args[1], "categories"), extendConfig({}, controller.args[2], "categories"));
        categories.setDefaultUnit(voltmx.flex.DP);
        var segCategories = new voltmx.ui.SegmentedUI2(extendConfig({
            "autogrowMode": voltmx.flex.AUTOGROW_NONE,
            "data": [{
                "lblCategory": "Category"
            }, {
                "lblCategory": "Category"
            }, {
                "lblCategory": "Category"
            }, {
                "lblCategory": "Category"
            }, {
                "lblCategory": "Category"
            }, {
                "lblCategory": "Category"
            }, {
                "lblCategory": "Category"
            }, {
                "lblCategory": "Category"
            }, {
                "lblCategory": "Category"
            }, {
                "lblCategory": "Category"
            }],
            "groupCells": false,
            "height": "100%",
            "id": "segCategories",
            "isVisible": true,
            "left": "0dp",
            "needPageIndicator": true,
            "pageOffDotImage": "pageoffdot.png",
            "pageOnDotImage": "pageondot.png",
            "retainSelection": false,
            "rowFocusSkin": "seg2Focus",
            "rowSkin": "sknSegTransparent",
            "rowTemplate": kony.mvc.resolveNameFromContext({
                "appName": "RefCommonsMA",
                "friendlyName": "flxSegCategories"
            }),
            "scrollingEvents": {},
            "sectionHeaderSkin": "sliPhoneSegmentHeader",
            "selectionBehavior": constants.SEGUI_DEFAULT_BEHAVIOR,
            "separatorColor": "aaaaaa00",
            "separatorRequired": true,
            "separatorThickness": 1,
            "showScrollbars": false,
            "top": "0dp",
            "viewType": constants.SEGUI_VIEW_TYPE_TABLEVIEW,
            "widgetDataMap": {
                "flxSegCategories": "flxSegCategories",
                "lblCategory": "lblCategory"
            },
            "width": "100%",
            "zIndex": 1,
            "appName": "RefCommonsMA"
        }, controller.args[0], "segCategories"), extendConfig({
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, controller.args[1], "segCategories"), extendConfig({}, controller.args[2], "segCategories"));
        categories.add(segCategories);
        return categories;
    }
})