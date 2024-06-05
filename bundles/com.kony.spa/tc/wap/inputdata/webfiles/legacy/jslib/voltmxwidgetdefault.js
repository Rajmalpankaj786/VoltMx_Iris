var voltmx = voltmx || {};

var constants = constants || {};

voltmx.defaults = {};
voltmx.defaults.widget = {};


voltmx.defaults.merge = function(config1, config2, config3) {
    var merge = {};

    for(x in config1) {
        merge[x] = config1[x];
    }
    for(x in config2) {
        merge[x] = config2[x];
    }
    for(x in config3) {
        merge[x] = config3[x];
    }

    return merge;
};

voltmx.defaults.getAllDefaults = function(widget) {
    var defaultValues = voltmx.defaults["widget"][widget];
    
    defaultValues.id = null;
    
    if(defaultValues.data)
        defaultValues.data = null;
    if(defaultValues.masterData)
        defaultValues.masterData = null;
    return defaultValues;
};



voltmx.defaults.Form2 = function(config1, config2, config3) {
    voltmx.formDefaults = voltmx.defaults.merge(config1, config2, config3);
    voltmx.defaults.widget.Form2 = voltmx.formDefaults;
};

voltmx.defaults.Form09ed48c1d517041 = new voltmx.defaults.Form2({
    "id": "Form2",
    "type": constants.FORM_TYPE_NATIVE,
    "title": null,
    "skin": "slForm",
    "needAppMenu": true,
    "enabledForIdleTimeout": false,
    "addWidgets": null,
    "init": null,
    "preShow": null,
    "postShow": null,
    "onHide": null,
    "onOrientationChange": null,
    "onDestroy": null
}, {
    "displayOrientation": constants.FORM_DISPLAY_ORIENTATION_PORTRAIT,
    "padding": [0, 0, 0, 0],
    "paddingInPixel": false
}, {
    "titleBar": true,
    "titleBarSkin": "slTitleBar",
    "titleBarConfig": {
        "renderTitleText": true,
        "titleBarLeftSideView": "button",
        "labelLeftSideView": "Back",
        "titleBarRightSideView": "button",
        "labelRightSideView": "Edit"
    },
    "menuPosition": constants.FORM_MENU_POSITION_AFTER_APPMENU,
    "windowSoftInputMode": constants.FORM_ADJUST_RESIZE,
    "onDeviceBack": null,
    "onDeviceMenu": null,
    "footerOverlap": false,
    "headerOverlap": false,
    "retainScrollPosition": false,
    "inTransitionConfig": {
        "formTransition": "None"
    },
    "outTransitionConfig": {
        "formTransition": "None"
    },
    "configureExtendTop": false,
    "configureExtendBottom": false,
    "configureStatusBarStyle": false,
    "bounces": true
});





voltmx.defaults.TextArea2 = function(config1, config2, config3) {
    voltmx.textAreaDefaults = voltmx.defaults.merge(config1, config2, config3);
    voltmx.defaults.widget.TextArea2 = voltmx.textAreaDefaults;
};

voltmx.defaults.TextArea0a4bbfc9a405e43 = new voltmx.defaults.TextArea2({
    "id": "TextArea2",
    "skin": "slTextArea",
    "onDone": null,
    "isVisible": true,
    "text": "Textarea text ",
    "textInputMode": constants.TEXTAREA_INPUT_MODE_ANY,
    "keyBoardStyle": constants.TEXTAREA_KEY_BOARD_STYLE_DEFAULT,
    "secureTextEntry": false,
    "onTextChange": null,
    "autoCapitalize": constants.TEXTAREA_AUTO_CAPITALIZE_NONE,
    "placeholder": null,
    "numberOfVisibleLines": 3
}, {
    "widgetAlignment": constants.WIDGET_ALIGN_CENTER,
    "contentAlignment": constants.CONTENT_ALIGN_TOP_LEFT,
    "containerWeight": 100,
    "padding": [2, 2, 2, 2],
    "paddingInPixel": false,
    "margin": [2, 2, 2, 2],
    "marginInPixel": false,
    "hExpand": true
}, {
    "onBeginEditing": null,
    "onEndEditing": null
});






voltmx.defaults.TextBox2 = function(config1, config2, config3) {
    voltmx.textBoxDefaults = voltmx.defaults.merge(config1, config2, config3);
    voltmx.defaults.widget.TextBox2 = voltmx.textBoxDefaults;
};

voltmx.defaults.TextField04aca556080344f = new voltmx.defaults.TextBox2({
    "id": "TextBox2",
    "skin": "slTextBox",
    "onDone": null,
    "isVisible": true,
    "text": "to verify the text field",
    "textInputMode": constants.TEXTBOX_INPUT_MODE_ANY,
    "keyBoardStyle": constants.TEXTBOX_KEY_BOARD_STYLE_DEFAULT,
    "secureTextEntry": false,
    "onTextChange": null,
    "autoCapitalize": constants.TEXTBOX_AUTO_CAPITALIZE_NONE,
    "placeholder": null
}, {
    "widgetAlignment": constants.WIDGET_ALIGN_CENTER,
    "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
    "containerWeight": 100,
    "padding": [3, 6, 1, 6],
    "paddingInPixel": false,
    "margin": [0, 0, 0, 0],
    "marginInPixel": false,
    "hExpand": true,
    "containerHeightMode": constants.TEXTBOX_FONT_METRICS_DRIVEN_HEIGHT,
    "containerHeight": null
}, {
    "autoFilter": false
});







voltmx.defaults.Button = function(config1, config2, config3) {
    voltmx.buttonDefaults = voltmx.defaults.merge(config1, config2, config3);
    voltmx.defaults.widget.Button = voltmx.buttonDefaults;
};


voltmx.defaults.Button06920f593d51b4c = new voltmx.defaults.Button({
    "id": "Button",
    "skin": "btnNormal",
    "focusSkin": "btnFocus",
    "onClick": null,
    "isVisible": true,
    "text": "Testthis"
}, {
    "widgetAlignment": constants.WIDGET_ALIGN_CENTER,
    "contentAlignment": constants.CONTENT_ALIGN_CENTER,
    "containerWeight": 100,
    "padding": [4, 4, 4, 4],
    "paddingInPixel": false,
    "margin": [6, 6, 6, 6],
    "marginInPixel": false,
    "hExpand": true,
    "vExpand": false,
    "displayText": true
}, {});




voltmx.defaults.CheckBoxGroup = function(config1, config2, config3) {
    voltmx.checkBoxGroupDefaults = voltmx.defaults.merge(config1, config2, config3);
    voltmx.defaults.widget.CheckBoxGroup = voltmx.checkBoxGroupDefaults;

}



voltmx.defaults.CheckBoxGroup0e0355477e5b741 = new voltmx.defaults.CheckBoxGroup({
    "id": "CheckBoxGroup",
    "skin": "slCheckBoxGroup",
    "onSelection": null,
    "isVisible": true,
    "masterData": [
        ["cbg1", "Checkbox One"],
        ["cbg2", "Checkbox Two"],
        ["cbg3", "Checkbox Three"]
    ],
    "selectedKeys": null,
    "selectedKeyValues": null
}, {
    "widgetAlignment": constants.WIDGET_ALIGN_CENTER,
    "containerWeight": 100,
    "padding": [0, 0, 0, 0],
    "paddingInPixel": false,
    "margin": [0, 0, 0, 0],
    "marginInPixel": false,
    "itemOrientation": constants.CHECKBOX_ITEM_ORIENTATION_VERTICAL
}, {});



voltmx.defaults.ListBox = function(config1, config2, config3) {
    voltmx.listBoxDefaults = voltmx.defaults.merge(config1, config2, config3);
    voltmx.defaults.widget.ListBox = voltmx.listBoxDefaults;

}


voltmx.defaults.ListBox02f4edc04ce8c44 = new voltmx.defaults.ListBox({
    "id": "ListBox",
    "skin": "slListBox",
    "onSelection": null,
    "isVisible": true,
    "masterData": [
        ["lb1", "Listbox One"],
        ["lb2", "Listbox Two"],
        ["lb3", "Listbox Three"]
    ],
    "selectedKey": "lb1",
    "selectedKeyValue": ["lb1", "Listbox One"],
    "onDone": null
}, {
    "widgetAlignment": constants.WIDGET_ALIGN_CENTER,
    "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
    "containerWeight": 100,
    "padding": [0, 0, 0, 0],
    "paddingInPixel": false,
    "margin": [0, 0, 0, 0],
    "marginInPixel": false,
    "hExpand": true,
    "vExpand": false
}, {
    "applySkinsToPopup": true,
    "viewType": constants.LISTBOX_VIEW_TYPE_LISTVIEW,
    "placeholder": null
});





voltmx.defaults.Label = function(config1, config2, config3) {
    voltmx.labelDefaults = voltmx.defaults.merge(config1, config2, config3);
    voltmx.defaults.widget.Label = voltmx.labelDefaults;
}


voltmx.defaults.Label011bd5c1421a849 = new voltmx.defaults.Label({
    "id": "Label",
    "skin": "defLabel",
    "text": "Label",
    "isVisible": true
}, {
    "widgetAlignment": constants.WIDGET_ALIGN_CENTER,
    "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
    "containerWeight": 100,
    "padding": [0, 0, 0, 0],
    "paddingInPixel": false,
    "margin": [1, 1, 1, 1],
    "marginInPixel": false,
    "hExpand": true,
    "vExpand": false
}, {
    "textCopyable": false
});






voltmx.defaults.RadioButtonGroup = function(config1, config2, config3) {
    voltmx.radioButtonGroupDefaults = voltmx.defaults.merge(config1, config2, config3);
    voltmx.defaults.widget.RadioButtonGroup = voltmx.radioButtonGroupDefaults;

}


voltmx.defaults.RadioButtonGroup07b5a00f7a5464a = new voltmx.defaults.RadioButtonGroup({
    "id": "RadioButtonGroup",
    "skin": "slRadioButtonGroup",
    "onSelection": null,
    "isVisible": true,
    "masterData": [
        ["rbg1", "Table view of iTems on Radio button"],
        ["rbg2", "Radiobutton Two"],
        ["rbg3", "Radiobutton Three"]
    ],
    "selectedKey": null,
    "selectedKeyValue": null
}, {
    "widgetAlignment": constants.WIDGET_ALIGN_CENTER,
    "containerWeight": 100,
    "padding": [0, 0, 0, 0],
    "paddingInPixel": false,
    "margin": [0, 0, 0, 0],
    "marginInPixel": false,
    "hExpand": true,
    "vExpand": false,
    "itemOrientation": constants.RADIOGROUP_ITEM_ORIENTATION_VERTICAL
}, {});





voltmx.defaults.SegmentedUI2 = function(config1, config2, config3) {
    voltmx.segmentedUI2Defaults = voltmx.defaults.merge(config1, config2, config3);
    voltmx.defaults.widget.SegmentedUI2 = voltmx.segmentedUI2Defaults;
}


voltmx.defaults.Segment0d6ae5ed6c4e14d = new voltmx.defaults.SegmentedUI2({
    "id": "SegmentedUI2",
    "rowSkin": "seg2Normal",
    "rowFocusSkin": "seg2Focus",
    "sectionHeaderSkin": "sliPhoneSegmentHeader",
    "widgetDataMap": null,
    "rowTemplate": null,
    "isVisible": true,
    "sectionHeaderTemplate": null,
    "data": null,
    "separatorRequired": true,
    "separatorThickness": 1,
    "separatorColor": "E9E9E900",
    "viewType": constants.SEGUI_VIEW_TYPE_TABLEVIEW,
    "onRowClick": null,
    "screenLevelWidget": false,
    "groupCells": false,
    "retainSelection": false,
    "needPageIndicator": true,
    "pageOnDotImage": "pageOnDot.png",
    "pageOffDotImage": "pageOffDot.png",
    "onSwipe": null,
    "showScrollbars": false,
    "scrollingEvents": {
        "onPull": null,
        "onPush": null,
        "onReachingBegining": null,
        "onReachingEnd": null
    },
    "selectionBehavior": constants.SEGUI_DEFAULT_BEHAVIOR,
    "selectedIndex": null,
    "selectedItems": null,
    "selectedIndices": null
}, {
    "margin": [0, 0, 0, 0],
    "marginInPixel": false,
    "padding": [0, 0, 0, 0],
    "paddingInPixel": false,
    "widgetAlignment": constants.WIDGET_ALIGN_CENTER,
    "containerWeight": 100
}, {
    "indicator": constants.SEGUI_ROW_SELECT,
    "enableDictionary": false,
    "showProgressIndicator": false,
    "progressIndicatorColor": constants.PROGRESS_INDICATOR_COLOR_WHITE,
    "bounces": true,
    "searchCriteria": constants.SEGUI_SEARCH_CRITERIA_STARTSWITH,
    "editStyle": constants.SEGUI_EDITING_STYLE_NONE,
    "onEditing": null
});





voltmx.defaults.Browser = function(config1, config2, config3) {
    voltmx.Browser = voltmx.defaults.merge(config1, config2, config3);
    voltmx.defaults.widget.Browser = voltmx.Browser;
}

voltmx.defaults.Browser0d2862f0e24a549 = new voltmx.defaults.Browser({
    "id": "Browser",
    "onSuccess": null,
    "onFailure": null,
    "htmlString": null,
    "screenLevelWidget": false,
    "enableZoom": false,
    "detectTelNumber": true,
    "isVisible": true
}, {
    "containerWeight": 100,
    "margin": [0, 0, 0, 0],
    "marginInPixel": false
}, {});




voltmx.defaults.Canvas = function(config1, config2, config3) {
    voltmx.Canvas = voltmx.defaults.merge(config1, config2, config3);
    voltmx.defaults.widget.Canvas = voltmx.Canvas;
}

voltmx.defaults.Canvas0d2862f0e24a549 = new voltmx.defaults.Canvas({
    "id": "Canvas",
    "isVisible": true
}, {
    "containerWeight": 100,
    "margin": [0, 0, 0, 0],
    "marginInPixel": false
}, {});




voltmx.defaults.Camera = function(config1, config2, config3) {
    voltmx.Camera = voltmx.defaults.merge(config1, config2, config3);
    voltmx.defaults.widget.Camera = voltmx.Camera;
}

voltmx.defaults.Camera01313e592e53c4e = new voltmx.defaults.Camera({
    "id": "Camera",
    "skin": "slCamera",
    "text": "Camera",
    "isVisible": true,
    "onCapture": null
}, {
    "widgetAlignment": constants.WIDGET_ALIGN_CENTER,
    "contentAlignment": constants.CONTENT_ALIGN_CENTER,
    "containerWeight": 100,
    "padding": [0, 0, 0, 0],
    "paddingInPixel": false,
    "margin": [0, 0, 0, 0],
    "marginInPixel": false,
    "hExpand": true,
    "vExpand": false
}, {
    "enableOverlay": false,
    "accessMode": constants.CAMERA_IMAGE_ACCESS_MODE_PUBLIC,
    "enablePhotoCropFeature": false,
    "nativeUserInterface": true
});






voltmx.defaults.Phone = function(config1, config2, config3) {
    voltmx.Phone = voltmx.defaults.merge(config1, config2, config3);
    voltmx.defaults.widget.Phone = voltmx.Phone;
}

voltmx.defaults.Phone0e0761018182e43 = new voltmx.defaults.Phone({
    "id": "Phone",
    "skin": "slPhone",
    "onClick": null,
    "isVisible": true,
    "text": "+91-999-999-8888"
}, {
    "widgetAlignment": constants.WIDGET_ALIGN_CENTER,
    "contentAlignment": constants.CONTENT_ALIGN_CENTER,
    "containerWeight": 100,
    "padding": [2, 2, 2, 2],
    "paddingInPixel": false,
    "margin": [3, 3, 3, 3],
    "marginInPixel": false,
    "hExpand": true,
    "vExpand": false,
    "displayText": true
}, {

    "glowEffect": false,
    "showProgressIndicator": false

});






voltmx.defaults.PickerView = function(config1, config2, config3) {
    voltmx.PickerView = voltmx.defaults.merge(config1, config2, config3);
    voltmx.defaults.widget.PickerView = voltmx.PickerView;
}

voltmx.defaults.PickerView0356232459d694c = new voltmx.defaults.PickerView({
    "id": "PickerView",
    "skin": "slPickerView",
    "masterData": [
        [
            ["y1", "2009"],
            ["y2", "2010"],
            ["y3", "2011"], 40
        ],
        [
            ["m1", "Jan"],
            ["m2", "Feb"],
            ["m3", "Mar"],
            ["m4", "Apr"],
            ["m5", "May"],
            ["m6", "Jun"],
            ["m7", "Jul"], 60
        ]
    ],
    "isVisible": true,
    "onSelection": null,
    "selectedKeyValues": ["2009", "Jan"],
    "selectedKeys": null
}, {
    "widgetAlignment": constants.WIDGET_ALIGN_CENTER,
    "containerWeight": 100,
    "margin": [0, 0, 0, 0],
    "marginInPixel": false,
    "hExpand": true
}, {});





voltmx.defaults.Switch = function(config1, config2, config3) {
    voltmx.Switch = voltmx.defaults.merge(config1, config2, config3);
    voltmx.defaults.widget.Switch = voltmx.Switch;
}

voltmx.defaults.Switch09683e5aca10244 = new voltmx.defaults.Switch({
    "id": "Switch",
    "skin": "slSwitch",
    "leftSideText": "ON",
    "rightSideText": "OFF",
    "onSlide": null,
    "selectedIndex": 0,
    "isVisible": true
}, {
    "containerWeight": 100,
    "widgetAlignment": constants.WIDGET_ALIGN_CENTER,
    "margin": [0, 0, 0, 0],
    "marginInPixel": false,
    "padding": [0, 0, 0, 0],
    "paddingInPixel": false
}, {});







voltmx.defaults.Image2 = function(config1, config2, config3) {
    voltmx.Image2 = voltmx.defaults.merge(config1, config2, config3);
    voltmx.defaults.widget.Image2 = voltmx.Image2;
}

voltmx.defaults.Image01ec4259a156040 = new voltmx.defaults.Image2({
    "id": "Image2",
    "isVisible": true,
    "onDownloadComplete": null,
    "src": "imagedrag.png"
}, {
    "padding": [0, 0, 0, 0],
    "paddingInPixel": false,
    "margin": [0, 0, 0, 0],
    "marginInPixel": false,
    "imageScaleMode": constants.IMAGE_SCALE_MODE_MAINTAIN_ASPECT_RATIO,
    "containerWeight": 100,
    "widgetAlignment": constants.WIDGET_ALIGN_CENTER
}, {});





voltmx.defaults.Line = function(config1, config2, config3) {
    voltmx.Line = voltmx.defaults.merge(config1, config2, config3);
    voltmx.defaults.widget.Line = voltmx.Line;
}


voltmx.defaults.Line014280b6840c84d = new voltmx.defaults.Line({
    "id": "Line",
    "skin": "slLine",
    "isVisible": true
}, {
    "margin": [0, 0, 0, 0],
    "marginInPixel": false,
    "thickness": 1
}, {});







voltmx.defaults.RichText = function(config1, config2, config3) {
    voltmx.RichText = voltmx.defaults.merge(config1, config2, config3);
    voltmx.defaults.widget.RichText = voltmx.RichText;
}

voltmx.defaults.RichText0af113743c6c049 = new voltmx.defaults.RichText({
    "id": "RichText",
    "skin": "slRichText",
    "onClick": null,
    "text": "RichText",
    "isVisible": true
}, {
    "widgetAlignment": constants.WIDGET_ALIGN_CENTER,
    "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
    "containerWeight": 100,
    "padding": [0, 0, 0, 0],
    "paddingInPixel": false,
    "margin": [0, 0, 0, 0],
    "marginInPixel": false,
    "hExpand": true,
    "vExpand": false
}, {});






voltmx.defaults.Slider = function(config1, config2, config3) {
    voltmx.Slider = voltmx.defaults.merge(config1, config2, config3);
    voltmx.defaults.widget.Slider = voltmx.Slider;
}


voltmx.defaults.Slider054a9c1893eae41 = new voltmx.defaults.Slider({
    "id": "Slider",
    "min": 0,
    "max": 100,
    "step": 1,
    "selectedValue": 40,
    "onSlide": null,
    "onSelection": null,
    "leftSkin": "voltmxsliderleft",
    "rightSkin": "voltmxsliderright",
    "thumbImage": "slider.png",
    "isVisible": true
}, {
    "widgetAlignment": constants.WIDGET_ALIGN_CENTER,
    "containerWeight": 100,
    "margin": [0, 0, 0, 0],
    "marginInPixel": false,
    "hExpand": true,
    "vExpand": false
}, {
    "thickness": 15
});






voltmx.defaults.Calendar = function(config1, config2, config3) {
    voltmx.Calendar = voltmx.defaults.merge(config1, config2, config3);
    voltmx.defaults.widget.Calendar = voltmx.Calendar;
}


voltmx.defaults.Calendar08566e3be5ea045 = new voltmx.defaults.Calendar({
    "id": "Calendar",
    "skin": "calNormal",
    "isVisible": true,
    "date": [1, 8, 2014],
    "day": 1,
    "month": 8,
    "year": 2014,
    "hour": 12,
    "minutes": 59,
    "seconds": 59,
    "dateComponents": [1, 8, 2014, 12, 59, 59],
    "dateFormat": "dd/MM/yyyy",
    "formattedDate": "",
    "calendarIcon": "calbtn.png",
    "viewType": constants.CALENDAR_VIEW_TYPE_DEFAULT,
    "onSelection": null
}, {
    "widgetAlignment": constants.WIDGET_ALIGN_CENTER,
    "contentAlignment": constants.CONTENT_ALIGN_CENTER,
    "containerWeight": 100,
    "padding": [0, 0, 0, 0],
    "paddingInPixel": false,
    "margin": [0, 0, 0, 0],
    "marginInPixel": false,
    "hExpand": true,
    "vExpand": false
}, {});






voltmx.defaults.DataGrid = function(config1, config2, config3) {
    voltmx.DataGrid = voltmx.defaults.merge(config1, config2, config3);
    voltmx.defaults.widget.DataGrid = voltmx.DataGrid;
}


voltmx.defaults.DataGrid05af006b031d349 = new voltmx.defaults.DataGrid({
    "id": "DataGrid",
    "isVisible": true,
    "headerSkin": "slDataGridHead",
    "rowNormalSkin": "slDataGridRow",
    "rowFocusSkin": "slDataGridFocusedRow",
    "rowAlternateSkin": "slDataGridAltRow",
    "showColumnHeaders": true,
    "columnHeadersConfig": [{
        "columnContentAlignment": constants.CONTENT_ALIGN_CENTER,
        "columnHeaderText": "Col 1",
        "columnID": "col1",
        "columnOnClick": null,
        "columnType": constants.DATAGRID_COLUMN_TYPE_TEXT,
        "columnWidthInPercentage": 33,
        "isColumnSortable": false
    }, {
        "columnContentAlignment": constants.CONTENT_ALIGN_CENTER,
        "columnHeaderText": "Col 2",
        "columnID": "col2",
        "columnOnClick": null,
        "columnType": constants.DATAGRID_COLUMN_TYPE_TEXT,
        "columnWidthInPercentage": 34,
        "isColumnSortable": false
    }, {
        "columnContentAlignment": constants.CONTENT_ALIGN_CENTER,
        "columnHeaderText": "Col 3",
        "columnID": "col3",
        "columnOnClick": null,
        "columnType": constants.DATAGRID_COLUMN_TYPE_TEXT,
        "columnWidthInPercentage": 33,
        "isColumnSortable": false
    }, ],
    "onRowSelected": null,
    "isMultiSelect": false,
    "selectedItem": {
        "col1": "RC 41",
        "col2": "RC 42",
        "col3": "RC 43"
    },
    "selectedItems": [{
        "col1": "RC 41",
        "col2": "RC 42",
        "col3": "RC 43"
    }],
    "selectedIndices": [3],
    "selectedIndex": 3,
    "rowCount": 4,
    "data": [{
        "col1": "RC 11",
        "col2": "RC 12",
        "col3": "RC 13"
    }, {
        "col1": "RC 21",
        "col2": "RC 22",
        "col3": "RC 23"
    }, {
        "col1": "RC 31",
        "col2": "RC 32",
        "col3": "RC 33"
    }, {
        "col1": "RC 41",
        "col2": "RC 42",
        "col3": "RC 43"
    }]
}, {
    "widgetAlignment": constants.WIDGET_ALIGN_CENTER,
    "contentAlignment": constants.CONTENT_ALIGN_CENTER,
    "containerWeight": 100,
    "margin": [0, 0, 0, 0],
    "padding": [4, 4, 4, 4],
    "marginInPixel": false,
    "paddingInPixel": false
}, {
    "gridlineColor": "F4F4F4"
});







voltmx.defaults.Map = function(config1, config2, config3) {
    voltmx.Map = voltmx.defaults.merge(config1, config2, config3);
    voltmx.defaults.widget.Map = voltmx.Map;
}

voltmx.defaults.Map05662dfdfdfa642 = new voltmx.defaults.Map({
    "id": "Map",
    "provider": constants.MAP_PROVIDER_GOOGLE,
    "defaultPinImage": "pinb.png",
    "isVisible": true,
    "onSelection": null,
    "onPinClick": null,
    "onClick": null,
    "locationData": [{
        "desc": "Phoenix infocity, Gachibowli",
        "lat": "17.447326",
        "lon": "78.371358",
        "name": "Hcl(New)"
    }, {
        "desc": "Mindspace, Hitech City",
        "lat": "17.441839",
        "lon": "78.380928",
        "name": "Hcl(Old)"
    }, {
        "desc": "Jaihind Enclave, Madhapur",
        "lat": "17.450378",
        "lon": "78.388398",
        "name": "My Residence"
    }],
    "screenLevelWidget": false,
    "calloutWidth": 80
}, {
    "margin": [0, 0, 0, 0],
    "marginInPixel": false,
    "containerWeight": 100
}, {
    "showZoomControl": true,
    "zoomLevel": 15,
    "mode": constants.MAP_VIEW_MODE_NORMAL
});






voltmx.defaults.TabPane = function(config1, config2, config3) {
    voltmx.TabPane = voltmx.defaults.merge(config1, config2, config3);
    voltmx.defaults.widget.TabPane = voltmx.TabPane;
}

voltmx.defaults.TabPane0d9081410504040 = new voltmx.defaults.TabPane({
    "id": "TabPane",
    "activeSkin": "tabCanvas",
    "inactiveSkin": "tabCanvasInactive",
    "isVisible": true,
    "viewType": constants.TABPANE_VIEW_TYPE_TABVIEW,
    "viewConfig": {
        "collapsibleViewConfig": {
            "collapsedImage": "",
            "collapsedimage": "",
            "expandedImage": "",
            "expandedimage": "",
            "imagePosition": constants.TABPANE_COLLAPSIBLE_IMAGE_POSITION_RIGHT,
            "imageposition": "right",
            "tabNameAlignment": constants.TABPANE_COLLAPSIBLE_TABNAME_ALIGNMENT_LEFT,
            "tabnamealignment": "left",
            "toggleTabs": false,
            "toggletabs": false
        },
        "collapsibleviewconfig": {
            "collapsedImage": "",
            "collapsedimage": "",
            "expandedImage": "",
            "expandedimage": "",
            "imagePosition": constants.TABPANE_COLLAPSIBLE_IMAGE_POSITION_RIGHT,
            "imageposition": "right",
            "tabNameAlignment": constants.TABPANE_COLLAPSIBLE_TABNAME_ALIGNMENT_LEFT,
            "tabnamealignment": "left",
            "toggleTabs": false,
            "toggletabs": false
        },
        "pageViewConfig": {
            "needPageIndicator": true,
            "pageOffDotImage": "",
            "pageOnDotImage": ""
        },
        "panoramaViewConfig": {
            "panoramaImage": "",
            "panoramaTitle": "",
            "panoramaTitleImage": ""
        },
        "tabViewConfig": {
            "headerPosition": constants.TAB_HEADER_POSITION_TOP,
            "image1": "arrow-left.png",
            "image2": "arrow-right.png"
        },
    },
    "screenLevelWidget": false,
    "activeTabs": [0]
}, {
    "margin": [0, 0, 0, 0],
    "marginInPixel": false,
    "padding": [0, 0, 0, 0],
    "paddingInPixel": false,
    "widgetAlignment": constants.WIDGET_ALIGN_CENTER,
    "layoutType": constants.CONTAINER_LAYOUT_BOX,
    "containerWeight": 100
}, {
    "tabHeaderHeight": 64
});






voltmx.defaults.Video = function(config1, config2, config3) {
    voltmx.Video = voltmx.defaults.merge(config1, config2, config3);
    voltmx.defaults.widget.Video = voltmx.Video;
}

voltmx.defaults.Video0ec83655440d845 = new voltmx.defaults.Video({
    "id": "Video",
    "isVisible": true,
    "skin": "slVideo",
    "text": "Video"
}, {
    "widgetAlignment": constants.WIDGET_ALIGN_CENTER,
    "containerWeight": 100,
    "margin": [0, 0, 0, 0],
    "padding": [0, 0, 0, 0],
    "marginInPixel": false,
    "paddingInPixel": false
}, {
    "controls": true,
    "poster": "defvideoposter.png"
});




voltmx.defaults.FlexContainer = function(config1, config2, config3) {
    voltmx.FlexContainer = voltmx.defaults.merge(config1, config2, config3);
    voltmx.defaults.widget.FlexContainer = voltmx.FlexContainer;
}


voltmx.defaults.FlexContainer08a3676260d2e546 = new voltmx.defaults.FlexContainer({
    "id": "FlexContainer",
    "isVisible": true,
    "skin": "slFbox",
    "layoutType": voltmx.flex.FREE_FORM,
    "clipBounds": true,
    "onSwipe": null
}, {
    "widgetAlignment": constants.WIDGET_ALIGN_TOP_LEFT,
    "containerWeight": 100,
    "padding": [0, 0, 0, 0],
    "hExpand": true,
    "vExpand": false,
    "layoutType": voltmx.flex.FREE_FORM
}, {});






voltmx.defaults.FlexScrollContainer = function(config1, config2, config3) {
    voltmx.FlexScrollContainer = voltmx.defaults.merge(config1, config2, config3);
    voltmx.defaults.widget.FlexScrollContainer = voltmx.FlexScrollContainer;
}


voltmx.defaults.FlexScroll08a3353460d2e546 = new voltmx.defaults.FlexScrollContainer({
    "id": "FlexScrollContainer",
    "isVisible": true,
    "skin": "slFSbox",
    "enableScrolling": true,
    "scrollDirection": voltmx.flex.SCROLL_HORIZONTAL,
    "horizontalScrollIndicator": true,
    "verticalScrollIndicator": true,
    "left": "159dp",
    "top": "215dp",
    "width": "150dp",
    "height": "200dp",
    "zIndex": 1,
    "layoutType": voltmx.flex.FREE_FORM,
    "clipBounds": true,
    "bounces": true,
    "allowHorizontalBounce": true,
    "allowVerticalBounce": true,
    "onSwipe": null
}, {
    "widgetAlignment": constants.WIDGET_ALIGN_TOP_LEFT,
    "containerWeight": 100,
    "padding": [0, 0, 0, 0],
    "hExpand": true,
    "vExpand": false,
    "layoutType": voltmx.flex.FREE_FORM
}, {});


