define(function() {
    return function(controller) {
        var hamburgermenu = new voltmx.ui.FlexContainer(extendConfig({
            "autogrowMode": voltmx.flex.AUTOGROW_NONE,
            "clipBounds": false,
            "isMaster": true,
            "height": "100%",
            "id": "hamburgermenu",
            "isVisible": true,
            "layoutType": voltmx.flex.FREE_FORM,
            "left": "-90%",
            "isModalContainer": false,
            "skin": "sknFlexWithShadowPrimaryGradientBg",
            "top": "0dp",
            "width": "80%",
            "zIndex": 1,
            "appName": "RefCommonsMA"
        }, controller.args[0], "hamburgermenu"), extendConfig({
            "paddingInPixel": false
        }, controller.args[1], "hamburgermenu"), extendConfig({}, controller.args[2], "hamburgermenu"));
        hamburgermenu.setDefaultUnit(voltmx.flex.DP);
        var flxTitle = new voltmx.ui.FlexContainer(extendConfig({
            "autogrowMode": voltmx.flex.AUTOGROW_NONE,
            "clipBounds": false,
            "height": "150dp",
            "id": "flxTitle",
            "isVisible": true,
            "layoutType": voltmx.flex.FREE_FORM,
            "left": "0dp",
            "isModalContainer": false,
            "skin": "sknFlx2",
            "top": "0dp",
            "width": "100%",
            "zIndex": 1,
            "appName": "RefCommonsMA"
        }, controller.args[0], "flxTitle"), extendConfig({
            "paddingInPixel": false
        }, controller.args[1], "flxTitle"), extendConfig({}, controller.args[2], "flxTitle"));
        flxTitle.setDefaultUnit(voltmx.flex.DP);
        var flxProfilePhoto = new voltmx.ui.FlexContainer(extendConfig({
            "autogrowMode": voltmx.flex.AUTOGROW_NONE,
            "clipBounds": true,
            "height": "100dp",
            "id": "flxProfilePhoto",
            "isVisible": true,
            "layoutType": voltmx.flex.FREE_FORM,
            "left": 10,
            "isModalContainer": false,
            "skin": "sknFlx5",
            "top": 10,
            "width": "100dp",
            "zIndex": 1,
            "appName": "RefCommonsMA"
        }, controller.args[0], "flxProfilePhoto"), extendConfig({
            "paddingInPixel": false
        }, controller.args[1], "flxProfilePhoto"), extendConfig({}, controller.args[2], "flxProfilePhoto"));
        flxProfilePhoto.setDefaultUnit(voltmx.flex.DP);
        var imgUserPhoto = new voltmx.ui.Image2(extendConfig({
            "centerX": "50%",
            "centerY": "50%",
            "height": "100%",
            "id": "imgUserPhoto",
            "isVisible": true,
            "skin": "slImage",
            "src": "userprofile.png",
            "width": "100%",
            "zIndex": 1
        }, controller.args[0], "imgUserPhoto"), extendConfig({
            "imageScaleMode": constants.IMAGE_SCALE_MODE_FIT_TO_DIMENSIONS,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, controller.args[1], "imgUserPhoto"), extendConfig({}, controller.args[2], "imgUserPhoto"));
        flxProfilePhoto.add(imgUserPhoto);
        var lblUserName = new voltmx.ui.Label(extendConfig({
            "id": "lblUserName",
            "isVisible": true,
            "left": "20dp",
            "skin": "sknLblHeading3",
            "text": "Citizen User",
            "textStyle": {
                "letterSpacing": 0,
                "strikeThrough": false
            },
            "top": "120dp",
            "width": voltmx.flex.USE_PREFERRED_SIZE,
            "zIndex": 1
        }, controller.args[0], "lblUserName"), extendConfig({
            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, controller.args[1], "lblUserName"), extendConfig({
            "textCopyable": false
        }, controller.args[2], "lblUserName"));
        flxTitle.add(flxProfilePhoto, lblUserName);
        var segMenu = new voltmx.ui.SegmentedUI2(extendConfig({
            "autogrowMode": voltmx.flex.AUTOGROW_NONE,
            "data": [{
                "imgMenuOption": "overview.png",
                "lblMenuOption": "Dashboard"
            }, {
                "imgMenuOption": "erequest.png",
                "lblMenuOption": "Requests"
            }, {
                "imgMenuOption": "ecomplaint.png",
                "lblMenuOption": "Complaints"
            }, {
                "imgMenuOption": "weatheralert.png",
                "lblMenuOption": "Weather Alert"
            }, {
                "imgMenuOption": "userprofile.png",
                "lblMenuOption": "User Profile"
            }, {
                "imgMenuOption": "userpreferences.png",
                "lblMenuOption": "User Preferences"
            }],
            "groupCells": false,
            "height": "100%",
            "id": "segMenu",
            "isVisible": true,
            "left": "0%",
            "needPageIndicator": true,
            "onRowClick": controller.AS_Segment_ff281e5d63c84b0fad38895ba3bd529b,
            "pageOffDotImage": "pageoffdot.png",
            "pageOnDotImage": "pageondot.png",
            "retainSelection": false,
            "rowFocusSkin": "seg2Focus",
            "rowSkin": "sknSegTransparent",
            "rowTemplate": kony.mvc.resolveNameFromContext({
                "appName": "RefCommonsMA",
                "friendlyName": "flxSegRowWithImageAndLabel"
            }),
            "scrollingEvents": {},
            "sectionHeaderSkin": "sliPhoneSegmentHeader",
            "selectionBehavior": constants.SEGUI_DEFAULT_BEHAVIOR,
            "separatorColor": "aaaaaa00",
            "separatorRequired": true,
            "separatorThickness": 1,
            "showScrollbars": false,
            "top": "150dp",
            "viewType": constants.SEGUI_VIEW_TYPE_TABLEVIEW,
            "widgetDataMap": {
                "flxSegRowWithImageAndLabel": "flxSegRowWithImageAndLabel",
                "imgMenuOption": "imgMenuOption",
                "lblMenuOption": "lblMenuOption"
            },
            "width": "100%",
            "zIndex": 1,
            "appName": "RefCommonsMA"
        }, controller.args[0], "segMenu"), extendConfig({
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, controller.args[1], "segMenu"), extendConfig({}, controller.args[2], "segMenu"));
        hamburgermenu.add(flxTitle, segMenu);
        return hamburgermenu;
    }
})