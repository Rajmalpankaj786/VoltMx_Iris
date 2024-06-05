define("RefGovtCitizenSA/frmInterstitial", function() {
    return function(controller) {
        function addWidgetsfrmInterstitial() {
            this.setDefaultUnit(voltmx.flex.DP);
            this.add();
        };
        return [{
            "addWidgets": addWidgetsfrmInterstitial,
            "enabledForIdleTimeout": false,
            "id": "frmInterstitial",
            "layoutType": voltmx.flex.FREE_FORM,
            "needAppMenu": false,
            "skin": "sknFrm1",
            "appName": "RefGovtCitizenSA",
            "info": {
                "kuid": "acee5f4c13d846d7b0bc81f40cfe003d"
            }
        }, {
            "displayOrientation": constants.FORM_DISPLAY_ORIENTATION_PORTRAIT,
            "layoutType": voltmx.flex.FREE_FORM,
            "paddingInPixel": false
        }, {
            "footerOverlap": false,
            "headerOverlap": false,
            "menuPosition": constants.FORM_MENU_POSITION_AFTER_APPMENU,
            "retainScrollPosition": false,
            "titleBar": true,
            "titleBarSkin": "slTitleBar",
            "windowSoftInputMode": constants.FORM_ADJUST_RESIZE
        }]
    }
});