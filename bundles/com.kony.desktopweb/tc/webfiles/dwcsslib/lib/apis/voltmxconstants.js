Object.defineProperty(window, 'constants', {configurable:false, enumerable:false, writable:true, value:(function() {
    var _ns = {}, $K = voltmx.$kwebfw$;

    $K.defVoltmxProp(_ns, [
        {keey:'ALERT_TYPE_CONFIRMATION', value:'confirmation'},
        {keey:'ALERT_TYPE_ERROR', value:'error'},
        {keey:'ALERT_TYPE_INFO', value:'info'},
        {keey:'API_LEVEL', value:'APILevel'},
        {keey:'API_LEVEL_8200', value:8200},
        {keey:'API_LEVEL_8300', value:8300},
        {keey:'API_LEVEL_8400', value:8400},
        {keey:'API_LEVEL_9200', value:9200},
        {keey:'APPLICATION_MODE_HYBRID', value:'hybrid'},
        {keey:'APPLICATION_MODE_NATIVE', value:'native'},
        {keey:'APPLICATION_MODE_WRAPPER', value:'wrapper'},
        {keey:'BREAKPOINT_MAX_VALUE', value:Number.MAX_VALUE},
        {keey:'BROWSER_REQUEST_METHOD_GET', value:'get'},
        {keey:'BROWSER_REQUEST_METHOD_POST', value:'post'},
        {keey:'CALENDAR_DATE_FORMAT_DEFAULT', value:'dd/MM/yyyy'},
        {keey:'CALENDAR_ICON_ALIGN_AUTO', value:'auto'},
        {keey:'CALENDAR_ICON_ALIGN_LEFT', value:'left'},
        {keey:'CALENDAR_ICON_ALIGN_RIGHT', value:'right'},
        {keey:'CALENDAR_SELECTION_TYPE_MULTI_SELECT', value:'multiselect'},
        {keey:'CALENDAR_SELECTION_TYPE_RANGE_SELECT', value:'rangeselect'},
        {keey:'CALENDAR_SELECTION_TYPE_SINGLE_SELECT', value:'singleselect'},
        {keey:'CALENDAR_VIEW_TYPE_DEFAULT', value:'default'},
        {keey:'CALENDAR_VIEW_TYPE_GRID_ONSCREEN', value:'onscreen'},
        {keey:'CALENDAR_VIEW_TYPE_GRID_POPUP', value:'popup'},
        {keey:'CAMERA_CAPTURE_FAILED', value:'capturefailed'},
        {keey:'CAMERA_NOT_SUPPORTED', value:'notsupported'},
        {keey:'CAMERA_PERMISSION_DENIED', value:'permissiondenied'},
        {keey:'CAMERA_SOURCE_DEFAULT', value:'front'},
        {keey:'CAMERA_SOURCE_FRONT', value:'front'},
        {keey:'CAMERA_SOURCE_FRONT_UNAVAILABLE', value:'frontunavailable'},
        {keey:'CAMERA_SOURCE_REAR', value:'rear'},
        {keey:'CAMERA_SOURCE_REAR_UNAVAILABLE', value:'rearunavailable'},
        {keey:'CAMERA_VIDEO_RECORDING_FAILED', value:'recordingfailed'},
        {keey:'CHECKBOX_ITEM_ORIENTATION_HORIZONTAL', value:'horizontal'},
        {keey:'CHECKBOX_ITEM_ORIENTATION_VERTICAL', value:'vertical'},
        {keey:'CHECKBOX_VIEW_TYPE_CUSTOMVIEW', value:'customview'},
        {keey:'CHECKBOX_VIEW_TYPE_DEFAULTTVIEW', value:'defaultview'},
        {keey:'CHECKBOX_VIEW_TYPE_LISTVIEW', value:'listview'},
        {keey:'CHECKBOX_VIEW_TYPE_ONSCREENWHEEL', value:'onscreenwheel'},
        {keey:'CHECKBOX_VIEW_TYPE_TABLEVIEW', value:'tableview'},
        {keey:'CHECKBOX_VIEW_TYPE_TOGGLEVIEW', value:'toggleview'},
        {keey:'CONTENT_ALIGN_BOTTOM_CENTER', value:'bottomcenter'},
        {keey:'CONTENT_ALIGN_BOTTOM_LEFT', value:'bottomleft'},
        {keey:'CONTENT_ALIGN_BOTTOM_RIGHT', value:'bottomright'},
        {keey:'CONTENT_ALIGN_MIDDLE_LEFT', value:'middleleft'},
        {keey:'CONTENT_ALIGN_MIDDLE_RIGHT', value:'middleright'},
        {keey:'CONTENT_ALIGN_TOP_CENTER', value:'topcenter'},
        {keey:'CONTENT_ALIGN_TOP_LEFT', value:'topleft'},
        {keey:'CONTENT_ALIGN_TOP_RIGHT', value:'topright'},
        {keey:'CONTENT_ALIGN_CENTER', value:'middlecenter'},
        {keey:'DATAGRID_COLUMN_TYPE_IMAGE', value:'image'},
        {keey:'DATAGRID_COLUMN_TYPE_TEMPLATE', value:'template'},
        {keey:'DATAGRID_COLUMN_TYPE_TEXT', value:'text'},
        {keey:'DATAGRID_SCROLLBAR_NONE', value:'none'},
        {keey:'DATAGRID_SCROLLBAR_VERTICAL', value:'vertical'},
        {keey:'DEVICE_ORIENTATION_LANDSCAPE', value:'landscape'},
        {keey:'DEVICE_ORIENTATION_PORTRAIT', value:'portrait'},
        {keey:'DEVICE_OSNAME_ANDROID', value:'android'},
        {keey:'DEVICE_OSNAME_ANDROIDTABLET', value:'androidtablet'},
        {keey:'DEVICE_OSNAME_IPHONE', value:'iPhone'},
        {keey:'DEVICE_OSNAME_IPAD', value:'iPad'},
        {keey:'DEVICE_OSNAME_MACINTOSH', value:'Macintosh'},
        {keey:'DEVICE_OSNAME_WINDOWS', value:'windows'},
        {keey:'DEVICE_OSNAME_WINDOWSTABLET', value:'windowstablet'},
        {keey:'DEVICE_OSNAME_WINDOWPHONE', value:'windowsphone'},
        {keey:'DEVICE_OSNAME_LINUX', value:'Linux'},
        {keey:'FILE_UPLOAD_COMPLETE_STATE', value:'complete'},
        {keey:'FILE_UPLOAD_ERROR_STATE', value:'error'},
        {keey:'FILE_UPLOAD_PROGRESS_STATE', value:'progress'},
        {keey:'FILE_UPLOAD_START_STATE', value:'start'},
        {keey:'FORM_ADJUST_RESIZE', value:'resize'},
        {keey:'FORM_ADJUST_PAN', value:'pan'},
        {keey:'FORM_DEVICE_ORIENTATION_LANDSCAPE', value:'landscape'},
        {keey:'FORM_DEVICE_ORIENTATION_PORTRAIT', value:'portrait'},
        {keey:'FORM_DISPLAY_ORIENTATION_BOTH', value:'both'},
        {keey:'FORM_DISPLAY_ORIENTATION_LANDSCAPE', value:'landscape'},
        {keey:'FORM_DISPLAY_ORIENTATION_PORTRAIT', value:'portrait'},
        {keey:'FORM_FORWARD_NAVIGATION', value:'forward'},
        {keey:'FORM_TYPE_DYNAMIC', value:'dynamic'},
        {keey:'FORM_TYPE_NATIVE', value:'native'},
        {keey:'FORM_TYPE_STATIC', value:'static'},
        {keey:'GESTURE_TYPE_LONGPRESS', value:'longpress'},
        {keey:'GESTURE_TYPE_PAN', value:'pan'},
        {keey:'GESTURE_TYPE_PINCH', value:'pinch'},
        {keey:'GESTURE_TYPE_ROTATION', value:'rotation'},
        {keey:'GESTURE_TYPE_SWIPE', value:'swipe'},
        {keey:'GESTURE_TYPE_TAP', value:'tap'},
        {keey:'HTTP_INTEGRITY_CHECK_FAILED', value:2},
        {keey:'HTTP_INTEGRITY_CHECK_NOT_DONE', value:0},
        {keey:'HTTP_INTEGRITY_CHECK_SUCCESSFUL', value:1},
        {keey:'HTTP_METHOD_GET', value:'get'},
        {keey:'HTTP_METHOD_POST', value:'post'},
        {keey:'HTTP_RESPONSE_TYPE_ARRAYBUFFER', value:'arraybuffer'},
        {keey:'HTTP_RESPONSE_TYPE_BLOB', value:'blob'},
        {keey:'HTTP_RESPONSE_TYPE_DOCUMENT', value:'document'},
        {keey:'HTTP_RESPONSE_TYPE_JSON', value:'json'},
        {keey:'HTTP_RESPONSE_TYPE_RAWDATA', value:'image/png'},
        {keey:'HTTP_RESPONSE_TYPE_TEXT', value:'text'},
        {keey:'HTTP_READY_STATE_DONE', value:'done'},
        {keey:'HTTP_READY_STATE_HEADERS_RECEIVED', value:'headersreceived'},
        {keey:'HTTP_READY_STATE_LOADING', value:'loading'},
        {keey:'HTTP_READY_STATE_OPENED', value:'opened'},
        {keey:'HTTP_READY_STATE_UNSENT', value:'unsent'},
        {keey:'IMAGE_GALLERY_VIEW_TYPE_PAGEVIEW', value:'pageview'},
        {keey:'IMAGE_GLOSSY_EFFECT_DEFAULT', value:'default'},
        {keey:'IMAGE_GLOSSY_EFFECT_LINEAR', value:'linear'},
        {keey:'IMAGE_GLOSSY_EFFECT_RADIAL', value:'radial'},
        {keey:'IMAGE_SCALE_MODE_CROP', value:'crop'},
        {keey:'IMAGE_SCALE_MODE_FIT_TO_DIMENSIONS', value:'fittodimensions'},
        {keey:'IMAGE_SCALE_MODE_MAINTAIN_ASPECT_RATIO', value:'maintainaspectratio'},
        {keey:'LISTBOX_VIEW_TYPE_EDITVIEW', value:'editableview'},
        {keey:'LISTBOX_VIEW_TYPE_LISTVIEW', value:'listview'},
        {keey:'LISTBOX_VIEW_TYPE_ONSCREENWHEEL', value:'onscreenwheel'},
        {keey:'LISTBOX_VIEW_TYPE_TABLEVIEW', value:'tableview'},
        {keey:'LISTBOX_VIEW_TYPE_TOGGLEVIEW', value:'toggleview'},
        {keey:'LISTBOX_VIEW_TYPE_SPINNER', value:'spinner'},
        {keey:'LOADING_SCREEN_POSITION_FULL_SCREEN', value:'fullscreen'},
        {keey:'LOADING_SCREEN_POSITION_ONLY_CENTER', value:'center'},
        {keey:'MAP_PROVIDER_GOOGLE', value:'google'},
        {keey:'MAP_SOURCE_NATIVE', value:'native'},
        {keey:'MAP_SOURCE_NON_NATIVE', value:'non-native'},
        {keey:'MAP_SOURCE_STATIC', value:'static'},
        {keey:'MAP_VIEW_MODE_HYBRID', value:'hybrid'},
        {keey:'MAP_VIEW_MODE_POLYGON', value:'polygon'},
        {keey:'MAP_VIEW_MODE_NORMAL', value:'normal'},
        {keey:'MAP_VIEW_MODE_SATELLITE', value:'satellite'},
        {keey:'MAP_VIEW_MODE_TERRAIN', value:'terrain'},
        {keey:'MAP_HEIGHT_BY_FORM_REFERENCE', value:'formreference'}, // form height
        {keey:'MAP_HEIGHT_BY_PARENT_WIDTH', value:'parentwidth'}, // ref to parent width
        {keey:'MASTER_TYPE_DEFAULT', value:'withoutcontract'},
        {keey:'MASTER_TYPE_USERWIDGET', value:'withcontract'},
        {keey:'NETWORK_TYPE_3G', value:'3G'},
        {keey:'NETWORK_TYPE_ANY', value:'ANY'},
        {keey:'NETWORK_TYPE_ETHERNET', value:'ETHERNET'},
        {keey:'NETWORK_TYPE_WIFI', value:'WIFI'},
        {keey:'ONHOVER_MOUSE_ENTER', value:'enter'},
        {keey:'ONHOVER_MOUSE_LEAVE', value:'leave'},
        {keey:'ONHOVER_MOUSE_MOVE', value:'move'},
        {keey:'OPEN_URL_SUCCESS', value:'success'},
        {keey:'OPEN_URL_FAILURE', value:'failure'},
        {keey:'OPEN_URL_UNKNOWN', value:'unknown'},
        {keey:'PRINTSTUB', value:'@printlevel'},
        {keey:'RADIOGROUP_ITEM_ORIENTATION_HORIZONTAL', value:'horizontal'},
        {keey:'RADIOGROUP_ITEM_ORIENTATION_VERTICAL', value:'vertical'},
        {keey:'RADIOBUTTON_VIEW_TYPE_CUSTOMVIEW', value:'customview'},
        {keey:'RADIOBUTTON_VIEW_TYPE_DEFAULTTVIEW', value:'defaultview'},
        {keey:'SEGUI_DEFAULT_BEHAVIOR', value:'default'},
        {keey:'SEGUI_MULTI_SELECT_BEHAVIOR', value:'multiselect'},
        {keey:'SEGUI_SCROLL_POSITION_DEFAULT', value:'default'},
        {keey:'SEGUI_SCROLL_POSITION_RETAIN', value:'retain'},
        {keey:'SEGUI_SCROLL_POSITION_TOP', value:'top'},
        {keey:'SEGUI_SEARCH_CRITERIA_CONTAINS', value:'CONTAINS'},
        {keey:'SEGUI_SEARCH_CRITERIA_ENDSWITH', value:'ENDSWITH'},
        {keey:'SEGUI_SEARCH_CRITERIA_GREATER', value:'GREATER'},
        {keey:'SEGUI_SEARCH_CRITERIA_GREATER_EQUAL', value:'GREATER_EQUAL'},
        {keey:'SEGUI_SEARCH_CRITERIA_LESSER', value:'LESSER'},
        {keey:'SEGUI_SEARCH_CRITERIA_LESSER_EQUAL', value:'LESSER_EQUAL'},
        {keey:'SEGUI_SEARCH_CRITERIA_NOT_CONTAINS', value:'NOT_CONTAINS'},
        {keey:'SEGUI_SEARCH_CRITERIA_NOT_EQUAL', value:'NOT_EQUAL'},
        {keey:'SEGUI_SEARCH_CRITERIA_NOT_ENDSWITH', value:'NOT_ENDSWITH'},
        {keey:'SEGUI_SEARCH_CRITERIA_NOT_STARTSWITH', value:'NOT_STARTSWITH'},
        {keey:'SEGUI_SEARCH_CRITERIA_OPERATOR_AND', value:'AND'},
        {keey:'SEGUI_SEARCH_CRITERIA_OPERATOR_OR', value:'OR'},
        {keey:'SEGUI_SEARCH_CRITERIA_STARTSWITH', value:'STARTSWITH'},
        {keey:'SEGUI_SEARCH_CRITERIA_STRICT_EQUAL', value:'STRICT_EQUAL'},
        {keey:'SEGUI_SINGLE_SELECT_BEHAVIOR', value:'singleselect'},
        {keey:'SEGUI_VIEW_TYPE_PAGEVIEW', value:'pageview'},
        {keey:'SEGUI_VIEW_TYPE_TABLEVIEW', value:'tableview'},
        {keey:'SLIDER_HORIZONTAL_ORIENTATION', value:'horizontal'},
        {keey:'SLIDER_VERTICAL_ORIENTATION', value:'vertical'},
        {keey:'SLIDER_VIEW_TYPE_DEFAULT', value:'default'},
        {keey:'SLIDER_VIEW_TYPE_PROGRESS', value:'progress'},
        {keey:'TAB_HEADER_POSITION_BOTTOM', value:'bottom'},
        {keey:'TAB_HEADER_POSITION_LEFT', value:'left'},
        {keey:'TAB_HEADER_POSITION_RIGHT', value:'right'},
        {keey:'TAB_HEADER_POSITION_TOP', value:'top'},
        {keey:'TABPANE_COLLAPSIBLE_IMAGE_POSITION_LEFT', value:'left'},
        {keey:'TABPANE_COLLAPSIBLE_IMAGE_POSITION_RIGHT', value:'right'},
        {keey:'TABPANE_COLLAPSIBLE_TABNAME_ALIGNMENT_CENTER', value:'center'},
        {keey:'TABPANE_COLLAPSIBLE_TABNAME_ALIGNMENT_LEFT', value:'left'},
        {keey:'TABPANE_COLLAPSIBLE_TABNAME_ALIGNMENT_RIGHT', value:'right'},
        {keey:'TABPANE_VIEW_TYPE_COLLAPSIBLEVIEW', value:'collapsibleview'},
        {keey:'TABPANE_VIEW_TYPE_PAGEVIEW', value:'pageview'},
        {keey:'TABPANE_VIEW_TYPE_TABVIEW', value:'tabview'},
        {keey:'TEXTBOX_AUTO_CAPITALIZE_ALL', value:'characters'},
        {keey:'TEXTBOX_AUTO_CAPITALIZE_NONE', value:'none'},
        {keey:'TEXTBOX_AUTO_CAPITALIZE_SENTENCES', value:'sentences'},
        {keey:'TEXTBOX_AUTO_CAPITALIZE_WORDS', value:'words'},
        {keey:'TEXTBOX_CUSTOM_HEIGHT', value:'custom'},
        {keey:'TEXTBOX_DEFAULT_PLATFORM_HEIGHT', value:'default'},
        {keey:'TEXTBOX_FONT_METRICS_DRIVEN_HEIGHT', value:'fontmetrics'},
        {keey:'TEXTBOX_INPUT_MODE_ANY', value:'any'},
        {keey:'TEXTBOX_INPUT_MODE_NUMERIC', value:'numeric'},
        {keey:'TEXTBOX_INPUT_MODE_PASSWORD', value:'password'},
        {keey:'TEXTBOX_KEY_BOARD_STYLE_CHAT', value:'chat'},
        {keey:'TEXTBOX_KEY_BOARD_STYLE_DECIMAL', value:'decimal'},
        {keey:'TEXTBOX_KEY_BOARD_STYLE_DEFAULT', value:'text'},
        {keey:'TEXTBOX_KEY_BOARD_STYLE_EMAIL', value:'email'},
        {keey:'TEXTBOX_KEY_BOARD_STYLE_NONE', value:'none'},
        {keey:'TEXTBOX_KEY_BOARD_STYLE_NUMBER_PAD', value:'numeric'},
        {keey:'TEXTBOX_KEY_BOARD_STYLE_PHONE_PAD', value:'tel'},
        {keey:'TEXTBOX_KEY_BOARD_STYLE_SEARCH', value:'search'},
        {keey:'TEXTBOX_KEY_BOARD_STYLE_URL', value:'url'},
        {keey:'TEXTBOX_VIEW_TYPE_DEFAULT', value:'default'},
        {keey:'TEXTBOX_VIEW_TYPE_SEARCH_VIEW', value:'search'},
        {keey:'TEXTAREA_INPUT_MODE_ANY', value:'any'},
        {keey:'TEXTAREA_INPUT_MODE_NUMERIC', value:'numeric'},
        {keey:'TEXTAREA_KEY_BOARD_STYLE_CHAT', value:'chat'},
        {keey:'TEXTAREA_KEY_BOARD_STYLE_DECIMAL', value:'decimal'},
        {keey:'TEXTAREA_KEY_BOARD_STYLE_DEFAULT', value:'text'},
        {keey:'TEXTAREA_KEY_BOARD_STYLE_EMAIL', value:'email'},
        {keey:'TEXTAREA_KEY_BOARD_STYLE_NONE', value:'none'},
        {keey:'TEXTAREA_KEY_BOARD_STYLE_NUMBER_PAD', value:'numeric'},
        {keey:'TEXTAREA_KEY_BOARD_STYLE_PHONE_PAD', value:'tel'},
        {keey:'TEXTAREA_KEY_BOARD_STYLE_SEARCH', value:'search'},
        {keey:'TEXTAREA_KEY_BOARD_STYLE_URL', value:'url'},
        {keey:'TEXTAREA_AUTO_CAPITALIZE_ALL', value:'characters'},
        {keey:'TEXTAREA_AUTO_CAPITALIZE_NONE', value:'none'},
        {keey:'TEXTAREA_AUTO_CAPITALIZE_SENTENCES', value:'sentences'},
        {keey:'TEXTAREA_AUTO_CAPITALIZE_WORDS', value:'words'},
        {keey:'UPLOAD_MAX_WAIT_TIME', value:120000}, // 2 mins
        {keey:'WIDGET_ALIGN_BOTTOM_CENTER', value:'bottomcenter'},
        {keey:'WIDGET_ALIGN_BOTTOM_LEFT', value:'bottomleft'},
        {keey:'WIDGET_ALIGN_BOTTOM_RIGHT', value:'bottomright'},
        {keey:'WIDGET_ALIGN_CENTER', value:'middlecenter'},
        {keey:'WIDGET_ALIGN_MIDDLE_LEFT', value:'middleleft'},
        {keey:'WIDGET_ALIGN_MIDDLE_RIGHT', value:'middleright'},
        {keey:'WIDGET_ALIGN_TOP_CENTER', value:'topcenter'},
        {keey:'WIDGET_ALIGN_TOP_LEFT', value:'topleft'},
        {keey:'WIDGET_ALIGN_TOP_RIGHT', value:'topright'},
        {keey:'WIDGET_DIRECTION_LTR', value:'ltr'},
        {keey:'WIDGET_DIRECTION_RTL', value:'rtl'}
    ]);

    return _ns;
}())});

Object.defineProperty(voltmx, 'anim', {configurable:false, enumerable:false, writable:true, value:(function() {
    var _ns = {}, $K = voltmx.$kwebfw$;

    $K.defVoltmxProp(_ns, [
        {keey:'DIRECTION_ALTERNATE', value:'alternate'},
        {keey:'DIRECTION_ALTERNATE_REVERSE', value:'alternate-reverse'},
        {keey:'DIRECTION_NONE', value:'normal'},
        {keey:'DIRECTION_REVERSE', value:'reverse'},
        {keey:'EASE', value:'ease'},
        {keey:'EASE_IN', value:'ease-in'},
        {keey:'EASE_IN_OUT', value:'ease-in-out'},
        {keey:'EASE_OUT', value:'ease-out'},
        {keey:'FILL_MODE_BACKWARDS', value:'backwards'},
        {keey:'FILL_MODE_BOTH', value:'both'},
        {keey:'FILL_MODE_FORWARDS', value:'forwards'},
        {keey:'FILL_MODE_NONE', value:'none'},
        {keey:'LINEAR', value:'linear'}
    ]);

    return _ns;
}())});


Object.defineProperty(voltmx, 'calendar', {configurable:false, enumerable:false, writable:true, value:(function() {
    var _ns = {}, $K = voltmx.$kwebfw$;

    $K.defVoltmxProp(_ns, [
        {keey:'LEGACY', value:'legacy'},
        {keey:'MODERN', value:'modern'}
    ]);

    return _ns;
}())});

Object.defineProperty(voltmx, 'canvas', {configurable:false, enumerable:false, writable:true, value:(function() {
    var _ns = {}, $K = voltmx.$kwebfw$;

    $K.defVoltmxProp(_ns, [
        {keey:'SHAPE_TYPE_LINE', value:'line'},
        {keey:'LINE_STYLE_SOLID', value:'solidline'},
        {keey:'LINE_STYLE_DASHED', value:'dashedline'},
        {keey:'LINE_STYLE_DOTTED', value:'dottedline'}
    ]);

    return _ns;
}())});

Object.defineProperty(voltmx, 'collectionview', {configurable:false, enumerable:false, writable:true, value:(function() {
    var _ns = {}, $K = voltmx.$kwebfw$;

    $K.defVoltmxProp(_ns, [
        {keey:'LAYOUT_CUSTOM', value:'custom'},
        {keey:'LAYOUT_HORIZONTAL', value:'horizontal'},
        {keey:'LAYOUT_VERTICAL', value:'vertical'},
        {keey:'MULTI_SELECT', value:'multiselect'},
        {keey:'SCROLL_DIRECTION_BOTH', value:'both'},
        {keey:'SCROLL_DIRECTION_HORIZONTAL', value:'horizontal'},
        {keey:'SCROLL_DIRECTION_VERTICAL', value:'vertical'},
        {keey:'SINGLE_SELECT', value:'singleselect'}
    ]);

    return _ns;
}())});


Object.defineProperty(voltmx, 'flex', {configurable:false, enumerable:false, writable:true, value:(function() {
    var _ns = {}, $K = voltmx.$kwebfw$;

    $K.defVoltmxProp(_ns, [
        {keey:'AUTOGROW_HEIGHT', value:'height'},
        {keey:'AUTOGROW_NONE', value:'none'},
        {keey:'DEFAULT_UNIT', value:'%'},
        {keey:'DP', value:'dp'},
        {keey:'FLOW_HORIZONTAL', value:'hflex'},
        {keey:'FLOW_VERTICAL', value:'vflex'},
        {keey:'FREE_FORM', value:'fflex'},
        {keey:'PERCENTAGE', value:'%'},
        {keey:'PX', value:'px'},
        {keey:'RESPONSIVE_GRID', value:'rflex'},
        {keey:'SCROLL_BOTH', value:'both'},
        {keey:'SCROLL_HORIZONTAL', value:'horizontal'},
        {keey:'SCROLL_NONE', value:'none'},
        {keey:'SCROLL_VERTICAL', value:'vertical'},
        {keey:'USE_AVAILABLE_SPACE', value:'available'},
        {keey:'USE_PREFERRED_SIZE', value:''},
        {keey:'ZINDEX_AUTO', value:'auto'}
    ]);

    return _ns;
}())});


Object.defineProperty(voltmx, 'map', {configurable:false, enumerable:false, writable:true, value:(function() {
    var _ns = {}, $K = voltmx.$kwebfw$;

    $K.defVoltmxProp(_ns, [
        {keey:'PIN_IMG_ANCHOR_BOTTOM_CENTER', value:'bottomcenter'},
        {keey:'PIN_IMG_ANCHOR_BOTTOM_LEFT', value:'bottomleft'},
        {keey:'PIN_IMG_ANCHOR_BOTTOM_RIGHT', value:'bottomright'},
        {keey:'PIN_IMG_ANCHOR_CENTER', value:'middlecenter'},
        {keey:'PIN_IMG_ANCHOR_MIDDLE_LEFT', value:'middleleft'},
        {keey:'PIN_IMG_ANCHOR_MIDDLE_RIGHT', value:'middleright'},
        {keey:'PIN_IMG_ANCHOR_TOP_CENTER', value:'topcenter'},
        {keey:'PIN_IMG_ANCHOR_TOP_LEFT', value:'topleft'},
        {keey:'PIN_IMG_ANCHOR_TOP_RIGHT', value:'topright'},
        {keey:'MAP_PROVIDER_GOOGLE', value:'google'},
        {keey:'MAP_VIEW_MODE_NORMAL', value:'normal'},
        {keey:'MAP_VIEW_MODE_SATELLITE', value:'satellite'}
    ]);

    return _ns;
}())});


Object.defineProperty(voltmx, 'segment', {configurable:false, enumerable:false, writable:true, value:(function() {
    var _ns = {}, $K = voltmx.$kwebfw$;

    $K.defVoltmxProp(_ns, [
        {keey:'ADD', value:'add'},
        {keey:'INVISIBLE', value:'invisible'},
        {keey:'REMOVE', value:'remove'},
        {keey:'UPDATE', value:'update'},
        {keey:'VISIBLE', value:'visible'}
    ]);

    return _ns;
}())});


Object.defineProperty(voltmx, 'skin', {configurable:false, enumerable:false, writable:true, value:(function() {
    var _ns = {}, $K = voltmx.$kwebfw$;

    $K.defVoltmxProp(_ns, [
        {keey:'BACKGROUND_TYPE_IMAGE', value:'bgimage'},
        {keey:'BACKGROUND_TYPE_MULTI_STEP_GRADIENT', value:'bgmsgradient'},
        {keey:'BACKGROUND_TYPE_SINGLE_COLOR', value:'bgsinglecolor'},
        {keey:'BACKGROUND_TYPE_TWO_STEP_GRADIENT', value:'bgtwostepgradient'},
        {keey:'BORDER_TYPE_MULTI_STEP_GRADIENT', value:'bordermsgradient'},
        {keey:'BORDER_TYPE_SINGLE_COLOR', value:'bordersinglecolor'},
        {keey:'BORDER_STYLE_COMPLETE_ROUNDED_CORNER', value:'borderstylecompleteroundedcorner'},
        {keey:'BORDER_STYLE_CUSTOM', value:'borderstylecustom'},
        {keey:'BORDER_STYLE_PLAIN', value:'borderstyleplain'},
        {keey:'BORDER_STYLE_ROUNDED_CORNER', value:'borderstyleroundedcorner'},
        {keey:'FONT_STYLE_ITALIC', value:'italic'},
        {keey:'FONT_STYLE_NONE', value:'normal'},
        {keey:'FONT_STYLE_UNDERLINE', value:'underline'},
        {keey:'FONT_WEIGHT_BOLD', value:'bold'},
        {keey:'FONT_WEIGHT_NORMAL', value:'normal'},
        {keey:'MULTI_STEP_GRADIENT_TYPE_CUSTOM', value:'msgradientcustom'},
        {keey:'MULTI_STEP_GRADIENT_TYPE_TO_BOTTOM', value:'msgradientbottom'},
        {keey:'MULTI_STEP_GRADIENT_TYPE_TO_LEFT', value:'msgradientleft'},
        {keey:'MULTI_STEP_GRADIENT_TYPE_TO_RIGHT', value:'msgradientright'},
        {keey:'MULTI_STEP_GRADIENT_TYPE_TO_TOP', value:'msgradienttop'},
        {keey:'TWO_STEP_GRADIENT_STYLE_HORIZONTAL_GRADIENT', value:'hg'},
        {keey:'TWO_STEP_GRADIENT_STYLE_HORIZONTAL_SPLIT', value:'hs'},
        {keey:'TWO_STEP_GRADIENT_STYLE_VERTICAL_GRADIENT', value:'vg'},
        {keey:'TWO_STEP_GRADIENT_STYLE_VERTICAL_SPLIT', value:'vs'}
    ]);

    return _ns;
}())});
