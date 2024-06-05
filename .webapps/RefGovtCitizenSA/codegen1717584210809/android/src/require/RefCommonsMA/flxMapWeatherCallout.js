define("RefCommonsMA/flxMapWeatherCallout", function() {
    return function(controller) {
        var flxMapWeatherCallout = new voltmx.ui.FlexContainer({
            "autogrowMode": voltmx.flex.AUTOGROW_NONE,
            "clipBounds": false,
            "height": "150dp",
            "id": "flxMapWeatherCallout",
            "isVisible": true,
            "layoutType": voltmx.flex.FLOW_HORIZONTAL,
            "left": "0dp",
            "isModalContainer": false,
            "skin": "sknFlexWithShadowPrimaryGradient1",
            "top": "0dp",
            "width": "80%",
            "appName": "RefCommonsMA"
        }, {
            "paddingInPixel": false
        }, {});
        flxMapWeatherCallout.setDefaultUnit(voltmx.flex.DP);
        var imgWeather = new voltmx.ui.Image2({
            "centerY": "50%",
            "height": "64dp",
            "id": "imgWeather",
            "isVisible": true,
            "left": "10dp",
            "skin": "slImage",
            "src": "weatherreport.png",
            "width": "64dp",
            "zIndex": 1
        }, {
            "imageScaleMode": constants.IMAGE_SCALE_MODE_MAINTAIN_ASPECT_RATIO,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, {});
        var flxWeatherDetails = new voltmx.ui.FlexContainer({
            "autogrowMode": voltmx.flex.AUTOGROW_NONE,
            "centerY": "50%",
            "clipBounds": false,
            "height": "100%",
            "id": "flxWeatherDetails",
            "isVisible": true,
            "layoutType": voltmx.flex.FLOW_VERTICAL,
            "left": "10dp",
            "isModalContainer": false,
            "skin": "slFbox",
            "width": "40%",
            "zIndex": 1,
            "appName": "RefCommonsMA"
        }, {
            "paddingInPixel": false
        }, {});
        flxWeatherDetails.setDefaultUnit(voltmx.flex.DP);
        var flxMinTemp = new voltmx.ui.FlexContainer({
            "autogrowMode": voltmx.flex.AUTOGROW_NONE,
            "clipBounds": false,
            "height": "20dp",
            "id": "flxMinTemp",
            "isVisible": true,
            "layoutType": voltmx.flex.FLOW_HORIZONTAL,
            "left": "0dp",
            "isModalContainer": false,
            "skin": "slFbox",
            "top": "13dp",
            "width": "100%",
            "zIndex": 1,
            "appName": "RefCommonsMA"
        }, {
            "paddingInPixel": false
        }, {});
        flxMinTemp.setDefaultUnit(voltmx.flex.DP);
        var lblMinTemp = new voltmx.ui.Label({
            "id": "lblMinTemp",
            "isVisible": true,
            "left": "0dp",
            "skin": "sknLblDescription",
            "text": "Min.Temp",
            "textStyle": {
                "letterSpacing": 0,
                "strikeThrough": false
            },
            "top": "0dp",
            "width": "100dp",
            "zIndex": 1
        }, {
            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, {
            "textCopyable": false
        });
        var lblMinTempValue = new voltmx.ui.Label({
            "id": "lblMinTempValue",
            "isVisible": true,
            "left": "0dp",
            "skin": "sknLblDescription",
            "text": "30.5",
            "textStyle": {
                "letterSpacing": 0,
                "strikeThrough": false
            },
            "top": "0dp",
            "width": voltmx.flex.USE_PREFERRED_SIZE,
            "zIndex": 1
        }, {
            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, {
            "textCopyable": false
        });
        flxMinTemp.add(lblMinTemp, lblMinTempValue);
        var flxMaxTemp = new voltmx.ui.FlexContainer({
            "autogrowMode": voltmx.flex.AUTOGROW_NONE,
            "clipBounds": false,
            "height": "20dp",
            "id": "flxMaxTemp",
            "isVisible": true,
            "layoutType": voltmx.flex.FLOW_HORIZONTAL,
            "left": "0dp",
            "isModalContainer": false,
            "skin": "slFbox",
            "top": "5dp",
            "width": "100%",
            "zIndex": 1,
            "appName": "RefCommonsMA"
        }, {
            "paddingInPixel": false
        }, {});
        flxMaxTemp.setDefaultUnit(voltmx.flex.DP);
        var lblMaxTemp = new voltmx.ui.Label({
            "id": "lblMaxTemp",
            "isVisible": true,
            "left": "0dp",
            "skin": "sknLblDescription",
            "text": "Max.Temp",
            "textStyle": {
                "letterSpacing": 0,
                "strikeThrough": false
            },
            "top": "0dp",
            "width": "100dp",
            "zIndex": 1
        }, {
            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, {
            "textCopyable": false
        });
        var lblMaxTempValue = new voltmx.ui.Label({
            "id": "lblMaxTempValue",
            "isVisible": true,
            "left": "0dp",
            "skin": "sknLblDescription",
            "text": "30.5",
            "textStyle": {
                "letterSpacing": 0,
                "strikeThrough": false
            },
            "top": "0dp",
            "width": voltmx.flex.USE_PREFERRED_SIZE,
            "zIndex": 1
        }, {
            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, {
            "textCopyable": false
        });
        flxMaxTemp.add(lblMaxTemp, lblMaxTempValue);
        var flxDescription = new voltmx.ui.FlexContainer({
            "autogrowMode": voltmx.flex.AUTOGROW_NONE,
            "clipBounds": false,
            "height": "20dp",
            "id": "flxDescription",
            "isVisible": true,
            "layoutType": voltmx.flex.FLOW_HORIZONTAL,
            "left": "0dp",
            "isModalContainer": false,
            "skin": "slFbox",
            "top": "5dp",
            "width": "100%",
            "zIndex": 1,
            "appName": "RefCommonsMA"
        }, {
            "paddingInPixel": false
        }, {});
        flxDescription.setDefaultUnit(voltmx.flex.DP);
        var lblDescription = new voltmx.ui.Label({
            "id": "lblDescription",
            "isVisible": true,
            "left": "0dp",
            "skin": "sknLblDescription",
            "text": "Description",
            "textStyle": {
                "letterSpacing": 0,
                "strikeThrough": false
            },
            "top": "0dp",
            "width": "100dp",
            "zIndex": 1
        }, {
            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, {
            "textCopyable": false
        });
        var lblDescriptionValue = new voltmx.ui.Label({
            "id": "lblDescriptionValue",
            "isVisible": true,
            "left": "0dp",
            "skin": "sknLblDescription",
            "text": "Cloudy",
            "textStyle": {
                "letterSpacing": 0,
                "strikeThrough": false
            },
            "top": "0dp",
            "width": voltmx.flex.USE_PREFERRED_SIZE,
            "zIndex": 1
        }, {
            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, {
            "textCopyable": false
        });
        flxDescription.add(lblDescription, lblDescriptionValue);
        var flxState = new voltmx.ui.FlexContainer({
            "autogrowMode": voltmx.flex.AUTOGROW_NONE,
            "clipBounds": false,
            "height": "20dp",
            "id": "flxState",
            "isVisible": true,
            "layoutType": voltmx.flex.FLOW_HORIZONTAL,
            "left": "0dp",
            "isModalContainer": false,
            "skin": "slFbox",
            "top": "5dp",
            "width": "100%",
            "zIndex": 1,
            "appName": "RefCommonsMA"
        }, {
            "paddingInPixel": false
        }, {});
        flxState.setDefaultUnit(voltmx.flex.DP);
        var lblState = new voltmx.ui.Label({
            "id": "lblState",
            "isVisible": true,
            "left": "0dp",
            "skin": "sknLblDescription",
            "text": "State",
            "textStyle": {
                "letterSpacing": 0,
                "strikeThrough": false
            },
            "top": "0dp",
            "width": "100dp",
            "zIndex": 1
        }, {
            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, {
            "textCopyable": false
        });
        var lblStateValue = new voltmx.ui.Label({
            "id": "lblStateValue",
            "isVisible": true,
            "left": "0dp",
            "skin": "sknLblDescription",
            "text": "Telangana",
            "textStyle": {
                "letterSpacing": 0,
                "strikeThrough": false
            },
            "top": "0dp",
            "width": voltmx.flex.USE_PREFERRED_SIZE,
            "zIndex": 1
        }, {
            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, {
            "textCopyable": false
        });
        flxState.add(lblState, lblStateValue);
        var flxCountry = new voltmx.ui.FlexContainer({
            "autogrowMode": voltmx.flex.AUTOGROW_NONE,
            "clipBounds": false,
            "height": "20dp",
            "id": "flxCountry",
            "isVisible": true,
            "layoutType": voltmx.flex.FLOW_HORIZONTAL,
            "left": "0dp",
            "isModalContainer": false,
            "skin": "slFbox",
            "top": "5dp",
            "width": "100%",
            "zIndex": 1,
            "appName": "RefCommonsMA"
        }, {
            "paddingInPixel": false
        }, {});
        flxCountry.setDefaultUnit(voltmx.flex.DP);
        var lblCountry = new voltmx.ui.Label({
            "id": "lblCountry",
            "isVisible": true,
            "left": "0dp",
            "skin": "sknLblDescription",
            "text": "Country",
            "textStyle": {
                "letterSpacing": 0,
                "strikeThrough": false
            },
            "top": "0dp",
            "width": "100dp",
            "zIndex": 1
        }, {
            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, {
            "textCopyable": false
        });
        var lblCountryValue = new voltmx.ui.Label({
            "id": "lblCountryValue",
            "isVisible": true,
            "left": "0dp",
            "skin": "sknLblDescription",
            "text": "India",
            "textStyle": {
                "letterSpacing": 0,
                "strikeThrough": false
            },
            "top": "0dp",
            "width": voltmx.flex.USE_PREFERRED_SIZE,
            "zIndex": 1
        }, {
            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, {
            "textCopyable": false
        });
        flxCountry.add(lblCountry, lblCountryValue);
        flxWeatherDetails.add(flxMinTemp, flxMaxTemp, flxDescription, flxState, flxCountry);
        flxMapWeatherCallout.add(imgWeather, flxWeatherDetails);
        return flxMapWeatherCallout;
    }
})