define(function() {
    return function(controller) {
        var newsarticles = new voltmx.ui.FlexContainer(extendConfig({
            "clipBounds": false,
            "isMaster": true,
            "height": "220dp",
            "id": "newsarticles",
            "isVisible": true,
            "layoutType": voltmx.flex.FREE_FORM,
            "left": "40dp",
            "isModalContainer": false,
            "skin": "sknFlexWithShadow",
            "top": "10dp",
            "width": "80%",
            "zIndex": 1,
            "appName": "RefCommonsMA"
        }, controller.args[0], "newsarticles"), extendConfig({
            "paddingInPixel": false
        }, controller.args[1], "newsarticles"), extendConfig({}, controller.args[2], "newsarticles"));
        newsarticles.setDefaultUnit(voltmx.flex.DP);
        var lblNewsAdvisor = new voltmx.ui.Label(extendConfig({
            "id": "lblNewsAdvisor",
            "isVisible": true,
            "left": "10dp",
            "skin": "sknLblNormal1",
            "text": "Latest News",
            "textStyle": {},
            "top": "10dp",
            "width": voltmx.flex.USE_PREFERRED_SIZE,
            "zIndex": 2
        }, controller.args[0], "lblNewsAdvisor"), extendConfig({
            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
            "padding": [1, 1, 1, 1],
            "paddingInPixel": false
        }, controller.args[1], "lblNewsAdvisor"), extendConfig({
            "textCopyable": false,
            "wrapping": constants.WIDGET_TEXT_WORD_WRAP
        }, controller.args[2], "lblNewsAdvisor"));
        var segLatestNews = new voltmx.ui.SegmentedUI2(extendConfig({
            "autogrowMode": voltmx.flex.AUTOGROW_NONE,
            "centerX": "50%",
            "centerY": "50%",
            "data": [{
                "imgDisplayPic": "weather1.jpg",
                "lblTitle": "Microsoft Bets Big on the Creator of ChatGPT in Race to Dominate A.I."
            }, {
                "imgDisplayPic": "weather2.jpg",
                "lblTitle": "Don’t Ban ChatGPT in Schools. Teach With It."
            }, {
                "imgDisplayPic": "weather3.jpg",
                "lblTitle": "SEC Charges Crypto Companies With Offering Unregistered Securities"
            }, {
                "imgDisplayPic": "weather4.jpg",
                "lblTitle": "A Teacher Who Loves ChatGPT and Is ‘M3GAN’ Real?"
            }, {
                "imgDisplayPic": "weather5.jpg",
                "lblTitle": "Alarmed by A.I. Chatbots, Universities Start Revamping How They Teach"
            }],
            "groupCells": false,
            "height": "100%",
            "id": "segLatestNews",
            "isVisible": true,
            "needPageIndicator": true,
            "pageOffDotImage": "pageoffdot.png",
            "pageOnDotImage": "pageondot.png",
            "retainSelection": false,
            "rowTemplate": kony.mvc.resolveNameFromContext({
                "appName": "RefCommonsMA",
                "friendlyName": "flxSegWithImageAndLabel"
            }),
            "scrollingEvents": {},
            "selectionBehavior": constants.SEGUI_DEFAULT_BEHAVIOR,
            "separatorRequired": false,
            "showScrollbars": false,
            "viewType": constants.SEGUI_VIEW_TYPE_PAGEVIEW,
            "widgetDataMap": {
                "flxSegWithImageAndLabel": "flxSegWithImageAndLabel",
                "imgDisplayPic": "imgDisplayPic",
                "lblTitle": "lblTitle"
            },
            "widgetSkin": "sknSegWithRoundedCorners",
            "width": "100%",
            "zIndex": 1,
            "appName": "RefCommonsMA"
        }, controller.args[0], "segLatestNews"), extendConfig({
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, controller.args[1], "segLatestNews"), extendConfig({
            "bounces": false,
            "editStyle": constants.SEGUI_EDITING_STYLE_NONE,
            "enableDictionary": false,
            "indicator": constants.SEGUI_NONE,
            "progressIndicatorColor": constants.PROGRESS_INDICATOR_COLOR_WHITE,
            "showProgressIndicator": true
        }, controller.args[2], "segLatestNews"));
        newsarticles.add(lblNewsAdvisor, segLatestNews);
        return newsarticles;
    }
})