
constants = {
    
    ALERT_TYPE_CONFIRMATION: "confirmation",
    ALERT_TYPE_ERROR: "error",
    ALERT_TYPE_INFO: "info",

    
    APPLICATION_MODE_NATIVE: 1,
    APPLICATION_MODE_HYBRID: 2,
    APPLICATION_MODE_WRAPPER: 3,

    API_LEVEL: "APILevel",
    API_LEVEL_6000: 6000,
    API_LEVEL_7000: 7000,
    API_LEVEL_8200: 8200,
    API_LEVEL_8300: 8300,
    API_LEVEL_8400: 8400,
    API_LEVEL_9000: 9000,
    API_LEVEL_9100: 9100,

    
    BOX_LAYOUT_HORIZONTAL: 1,
    BOX_LAYOUT_VERTICAL: 2,
    BOX_LAYOUT_ALIGN_FROM_LEFT: 3,
    BOX_LAYOUT_ALIGN_FROM_CENTER: 4,
    BOX_LAYOUT_ALIGN_FROM_RIGHT: 5,

    BOX_POSITION_AS_HEADER: 1,
    BOX_POSTION_AS_FOOTER: 2,
    BOX_POSITION_AS_NORMAL: 3,
    BOX_POSITION_AS_SCREENLEVEL_SEG_HEADER: 4,
    BOX_POSITION_AS_SCREENLEVEL_SEG_FOOTER: 5,

    
    CHECKBOX_ITEM_ORIENTATION_VERTICAL: "vertical",
    CHECKBOX_ITEM_ORIENTATION_HORIZONTAL: 2,

    CHECKBOX_VIEW_TYPE_DEFAULTTVIEW: "defaultview",
    CHECKBOX_VIEW_TYPE_CUSTOMVIEW: "customview",


    CHECKBOX_VIEW_TYPE_LISTVIEW: 0,
    CHECKBOX_VIEW_TYPE_TABLEVIEW: "tableview",
    CHECKBOX_VIEW_TYPE_TOGGLEVIEW: "toggleview",
    CHECKBOX_VIEW_TYPE_ONSCREENWHEEL: 3,



    

    CONTAINER_HEIGHT_BY_FORM_REFERENCE: 1,
    CONTAINER_HEIGHT_BY_PARENT_WIDTH: 2,
    CONTAINER_HEIGHT_BY_DEVICE_REFERENCE: 3,


    
    CALENDAR_VIEW_TYPE_DEFAULT: "default",
    CALENDAR_VIEW_TYPE_GRID_POPUP: "popup",
    CALENDAR_VIEW_TYPE_GRID_ONSCREEN: "onscreen",
    CALENDAR_DATE_FORMAT_DEFAULT: "dd/MM/yyyy",
    CALENDAR_SELECTION_TYPE_SINGLE_SELECT: 1,
    CALENDAR_SELECTION_TYPE_MULTI_SELECT: 2,
    CALENDAR_SELECTION_TYPE_RANGE_SELECT: 3,


    
    CALENDAR_ICON_ALIGN_LEFT: "left",
    CALENDAR_ICON_ALIGN_RIGHT: "right",
    CALENDAR_ICON_ALIGN_AUTO: "auto",

    
    CAMERA_SOURCE_DEFAULT: "Front",
    CAMERA_SOURCE_FRONT: "Front",
    CAMERA_SOURCE_REAR: "Rear",
    CAMERA_SOURCE_REAR_UNAVAILABLE: 102,
    CAMERA_SOURCE_FRONT_UNAVAILABLE: 103,
    CAMERA_CAPTURE_FAILED: 104,
    CAMERA_VIDEO_RECORDING_FAILED : 105,
    CAMERA_PERMISSION_DENIED: 106,
    CAMERA_NOT_SUPPORTED:107,

    
    DEVICE_ORIENTATION_PORTRAIT: 1,
    DEVICE_ORIENTATION_LANDSCAPE: 2,

    
    DEVICE_OSNAME_ANDROID: "android",
    DEVICE_OSNAME_ANDROIDTABLET: "androidtablet",
    DEVICE_OSNAME_IPHONE: "iPhone",
    DEVICE_OSNAME_IPAD: "iPad",
    DEVICE_OSNAME_MACINTOSH: "Macintosh",
    DEVICE_OSNAME_WINDOWS: "windows",
    DEVICE_OSNAME_WINDOWSTABLET: "windowstablet",
    DEVICE_OSNAME_WINDOWPHONE: "windowsphone",
    DEVICE_OSNAME_LINUX: "Linux",
    DEVICE_OSNAME_BLACKBERRY: "blackberryNTH",
    DEVICE_OSNAME_BLACKBERRYNTH: "blackberry",

    
    FORM_TYPE_STATIC: 1,
    FORM_TYPE_DYNAMIC: 2,
    FORM_TYPE_NATIVE: 3,

    FORM_DISPLAY_ORIENTATION_PORTRAIT: 1,
    FORM_DISPLAY_ORIENTATION_LANDSCAPE: 2,
    FORM_DISPLAY_ORIENTATION_BOTH: 3,

    FORM_DEVICE_ORIENTATION_PORTRAIT: 1,
    FORM_DEVICE_ORIENTATION_LANDSCAPE: 2,

    FORM_ADJUST_RESIZE: 1,
    FORM_ADJUST_PAN: 2,

    FORM_FORWARD_NAVIGATION: 1,


    

    HTTP_METHOD_GET: "get",
    HTTP_METHOD_POST: "post",
    HTTP_RESPONSE_TYPE_TEXT: "text",
    HTTP_RESPONSE_TYPE_JSON: "json",
    HTTP_RESPONSE_TYPE_DOCUMENT: "document",
    HTTP_RESPONSE_TYPE_RAWDATA: "image/png",
    HTTP_RESPONSE_TYPE_ARRAYBUFFER: "arraybuffer",
    HTTP_RESPONSE_TYPE_BLOB: "blob",

    HTTP_READY_STATE_UNSENT: 0,
    HTTP_READY_STATE_OPENED: 1,
    HTTP_READY_STATE_HEADERS_RECEIVED: 2,
    HTTP_READY_STATE_LOADING: 3,
    HTTP_READY_STATE_DONE: 4,

    HTTP_INTEGRITY_CHECK_NOT_DONE : 0,
    HTTP_INTEGRITY_CHECK_SUCCESSFUL : 1,
    HTTP_INTEGRITY_CHECK_FAILED : 2,

    
    OPEN_URL_SUCCESS: 1,
    OPEN_URL_FAILURE: 0,
    OPEN_URL_UNKNOWN: -1,

    
    IMAGE_SCALE_MODE_FIT_TO_DIMENSIONS: 0,
    IMAGE_SCALE_MODE_MAINTAIN_ASPECT_RATIO: "maintainaspectratio",
    IMAGE_SCALE_MODE_CROP: 2,
    IMAGE_GLOSSY_EFFECT_DEFAULT: 0,
    IMAGE_GLOSSY_EFFECT_RADIAL: 1,
    IMAGE_GLOSSY_EFFECT_LINEAR: 2,

    
    LOADING_SCREEN_POSITION_FULL_SCREEN: "fullscreen",

    LOADING_SCREEN_POSITION_ONLY_CENTER: "center",

    
    LISTBOX_VIEW_TYPE_LISTVIEW: 0,
    LISTBOX_VIEW_TYPE_TABLEVIEW: 1,
    LISTBOX_VIEW_TYPE_TOGGLEVIEW: 2,
    LISTBOX_VIEW_TYPE_ONSCREENWHEEL: 3,
    LISTBOX_VIEW_TYPE_SPINNER: 4,

    
    MAP_PROVIDER_GOOGLE: "google",
    MAP_SOURCE_NON_NATIVE: "non-native",
    MAP_SOURCE_NATIVE: "native",
    MAP_SOURCE_STATIC: "static",
    MAP_VIEW_MODE_NORMAL: 1,
    MAP_VIEW_MODE_SATELLITE: 2,
    MAP_VIEW_MODE_HYBRID: 3,
    MAP_VIEW_MODE_TERRAIN: 7,
    MAP_VIEW_MODE_POLYGON: 5,
    MAP_HEIGHT_BY_FORM_REFERENCE: 1, 
    MAP_HEIGHT_BY_PARENT_WIDTH: 2, 

    
    NETWORK_TYPE_ANY: "ANY",
    NETWORK_TYPE_ETHERNET: "ETHERNET",
    NETWORK_TYPE_WIFI: "WIFI",
    NETWORK_TYPE_3G: "3G",

    
    POPUP_TYPE_NATIVE: 1,
    POPUP_TYPE_SPA: 2,
    POPUP_TYPE_TC: 3,

    

    
    RADIOGROUP_ITEM_ORIENTATION_VERTICAL: "vertical",
    RADIOGROUP_ITEM_ORIENTATION_HORIZONTAL: 2,

    RADIOBUTTON_VIEW_TYPE_DEFAULTTVIEW: "defaultview",
    RADIOBUTTON_VIEW_TYPE_CUSTOMVIEW: "customview",
    



    
    SEGUI_VIEW_TYPE_TABLEVIEW: "tableview",
    SEGUI_VIEW_TYPE_PAGEVIEW: "pageview",
    
    SEGUI_DEFAULT_BEHAVIOR: 0,
    SEGUI_SINGLE_SELECT_BEHAVIOR: 1,
    SEGUI_MULTI_SELECT_BEHAVIOR: 2,


    
    SEGUI_SCROLL_POSITION_DEFAULT: 0,
    SEGUI_SCROLL_POSITION_RETAIN: 1,
    SEGUI_SCROLL_POSITION_TOP: 2,


    
    TEXTBOX_INPUT_MODE_ANY: "A",
    TEXTBOX_INPUT_MODE_NUMERIC: "N",
    TEXTBOX_INPUT_MODE_PASSWORD: "P",

    TEXTBOX_KEY_BOARD_STYLE_DEFAULT: "A",
    TEXTBOX_KEY_BOARD_STYLE_EMAIL: "emailpad",
    TEXTBOX_KEY_BOARD_STYLE_URL: "urlpad",
    TEXTBOX_KEY_BOARD_STYLE_CHAT: "chatpad",

    TEXTBOX_KEY_BOARD_STYLE_DECIMAL: "number",
    TEXTBOX_KEY_BOARD_STYLE_NUMBER_PAD: "digitpad",
    TEXTBOX_KEY_BOARD_STYLE_PHONE_PAD: "telpad",

    TEXTBOX_VIEW_TYPE_DEFAULT: "default",
    TEXTBOX_VIEW_TYPE_SEARCH_VIEW: "search",

    TEXTBOX_AUTO_CAPITALIZE_NONE: "none",
    TEXTBOX_AUTO_CAPITALIZE_WORDS: "words",
    TEXTBOX_AUTO_CAPITALIZE_SENTENCES: "sentences",
    TEXTBOX_AUTO_CAPITALIZE_ALL: "characters",

    TEXTBOX_DEFAULT_PLATFORM_HEIGHT: 1,
    TEXTBOX_FONT_METRICS_DRIVEN_HEIGHT: 2,
    TEXTBOX_CUSTOM_HEIGHT: 3,
    CONTAINER_HEIGHT_BY_FORM_REFERENCE: 1,
    CONTAINER_HEIGHT_BY_PARENT_WIDTH: 2,
    

    
    TEXTAREA_INPUT_MODE_ANY: "A",
    TEXTAREA_INPUT_MODE_NUMERIC: "N",

    TEXTAREA_KEY_BOARD_STYLE_DEFAULT: "A",
    TEXTAREA_KEY_BOARD_STYLE_EMAIL: "emailpad",
    TEXTAREA_KEY_BOARD_STYLE_URL: "urlpad",
    TEXTAREA_KEY_BOARD_STYLE_CHAT: "chatpad",

    TEXTAREA_KEY_BOARD_STYLE_DECIMAL: "number",
    TEXTAREA_KEY_BOARD_STYLE_NUMBER_PAD: "number",
    TEXTAREA_KEY_BOARD_STYLE_PHONE_PAD: "telpad",

    TEXTAREA_AUTO_CAPITALIZE_NONE: "none",
    TEXTAREA_AUTO_CAPITALIZE_WORDS: "words",
    TEXTAREA_AUTO_CAPITALIZE_SENTENCES: "sentences",
    TEXTAREA_AUTO_CAPITALIZE_ALL: "characters",
    
    HORIZONTAL_IMAGESTRIP_VIEW_TYPE_STRIPVIEW: "stripview",
    HORIZONTAL_IMAGESTRIP_VIEW_TYPE_SLOTVIEW: "slotview",
    HORIZONTAL_IMAGESTRIP_VIEW_TYPE_PAGEVIEW: "pageview",

    
    WIDGET_ALIGN_TOP_LEFT: 1,
    WIDGET_ALIGN_TOP_CENTER: 2,
    WIDGET_ALIGN_TOP_RIGHT: 3,
    WIDGET_ALIGN_MIDDLE_LEFT: 4,
    WIDGET_ALIGN_CENTER: 5,
    WIDGET_ALIGN_MIDDLE_RIGHT: 6,
    WIDGET_ALIGN_BOTTOM_LEFT: 7,
    WIDGET_ALIGN_BOTTOM_CENTER: 8,
    WIDGET_ALIGN_BOTTOM_RIGHT: 9,

    
    CONTENT_ALIGN_TOP_LEFT: 1,
    CONTENT_ALIGN_TOP_CENTER: 2,
    CONTENT_ALIGN_TOP_RIGHT: 3,
    CONTENT_ALIGN_MIDDLE_LEFT: 4,
    CONTENT_ALIGN_CENTER: 5,
    CONTENT_ALIGN_MIDDLE_RIGHT: 6,
    CONTENT_ALIGN_BOTTOM_LEFT: 7,
    CONTENT_ALIGN_BOTTOM_CENTER: 8,
    CONTENT_ALIGN_BOTTOM_RIGHT: 9,

    GESTURE_TYPE_TAP: 1,
    GESTURE_TYPE_SWIPE: 2,
    GESTURE_TYPE_LONGPRESS: 3,
    GESTURE_TYPE_PAN: 4,
    GESTURE_TYPE_ROTATION: 5,
    GESTURE_TYPE_PINCH: 6,

    BROWSER_REQUEST_METHOD_GET: "get",
    BROWSER_REQUEST_METHOD_POST: "post",

    TABPANE_VIEW_TYPE_TABVIEW: "tabview",
    TABPANE_VIEW_TYPE_COLLAPSIBLEVIEW: "collapsibleview",

    TABPANE_VIEW_TYPE_PAGEVIEW: "pageview",

    MASTER_TYPE_DEFAULT: 0,
    MASTER_TYPE_USERWIDGET: 1,

    TABPANE_COLLAPSIBLE_IMAGE_POSITION_RIGHT: "right",
    TABPANE_COLLAPSIBLE_IMAGE_POSITION_LEFT: "left",
    TABPANE_COLLAPSIBLE_TABNAME_ALIGNMENT_RIGHT: "right",
    TABPANE_COLLAPSIBLE_TABNAME_ALIGNMENT_LEFT: "left",
    TABPANE_COLLAPSIBLE_TABNAME_ALIGNMENT_CENTER: "center",

    TAB_HEADER_POSITION_TOP: "top",
    TAB_HEADER_POSITION_BOTTOM: "bottom",
    TAB_HEADER_POSITION_LEFT: "left",
    TAB_HEADER_POSITION_RIGHT: "right",
    
    ONHOVER_MOUSE_ENTER: 0,
    ONHOVER_MOUSE_MOVE: 1,
    ONHOVER_MOUSE_LEAVE: 2,

    BREAKPOINT_MAX_VALUE: Number.MAX_VALUE,

    DATAGRID_COLUMN_TYPE_TEXT: "text",
    DATAGRID_COLUMN_TYPE_IMAGE: "image",
    DATAGRID_COLUMN_TYPE_TEMPLATE: "template",

    CONTAINER_LAYOUT_GRID: 5,
    IMAGE_GALLERY_VIEW_TYPE_PAGEVIEW: "pageview",
    LISTBOX_VIEW_TYPE_EDITVIEW: "editableview",
    DATAGRID_SCROLLBAR_NONE: 0,
    DATAGRID_SCROLLBAR_VERTICAL: 1,

    
    FILE_UPLOAD_START_STATE: 0,
    FILE_UPLOAD_PROGRESS_STATE: 1,
    FILE_UPLOAD_COMPLETE_STATE: 2,
    FILE_UPLOAD_ERROR_STATE: 3,
    UPLOAD_MAX_WAIT_TIME: 120000, 

    
    MENU_CONTAINER_VIEW_TYPE_DROPDOWNVIEW: 1,
    MENU_CONTAINER_VIEW_TYPE_DROPLINEVIEW: 2,
    MENU_CONTAINER_VIEW_TYPE_TREEVIEW: 3,
    MENU_CONTAINER_VIEW_TYPE_CONTEXTVIEW: 4,

    MENUCONTAINER_POSITION_AS_HORIZONTAL: "horizontal",
    MENUCONTAINER_POSITION_AS_VERTICAL: "vertical",

    SLIDER_HORIZONTAL_ORIENTATION: "horizontal",
    SLIDER_VERTICAL_ORIENTATION: "vertical",

    SLIDER_VIEW_TYPE_DEFAULT: "default",
    SLIDER_VIEW_TYPE_PROGRESS: "progress",

    SEGUI_SEARCH_CRITERIA_CONTAINS: "CONTAINS",
    SEGUI_SEARCH_CRITERIA_ENDSWITH: "ENDSWITH",
    SEGUI_SEARCH_CRITERIA_STARTSWITH: "STARTSWITH",
    SEGUI_SEARCH_CRITERIA_NOT_CONTAINS: "NOT_CONTAINS",
    SEGUI_SEARCH_CRITERIA_NOT_ENDSWITH: "NOT_ENDSWITH",
    SEGUI_SEARCH_CRITERIA_NOT_STARTSWITH: "NOT_STARTSWITH",
    SEGUI_SEARCH_CRITERIA_GREATER: "GREATER",
    SEGUI_SEARCH_CRITERIA_GREATER_EQUAL:"GREATER_EQUAL",
    SEGUI_SEARCH_CRITERIA_LESSER: "LESSER",
    SEGUI_SEARCH_CRITERIA_LESSER_EQUAL: "LESSER_EQUAL",
    SEGUI_SEARCH_CRITERIA_STRICT_EQUAL: "STRICT_EQUAL",
    SEGUI_SEARCH_CRITERIA_NOT_EQUAL: "NOT_EQUAL",

    SEGUI_SEARCH_CRITERIA_OPERATOR_AND: "AND",
    SEGUI_SEARCH_CRITERIA_OPERATOR_OR: "OR"

};



voltmx.flex = {
    DEFAULT_UNIT: '%',
    DP: 'dp',
    PX: 'px',
    PERCENTAGE: '%',
    FREE_FORM: 1,
    FLOW_HORIZONTAL: 2,
    FLOW_VERTICAL: 3,
    VBOX_LAYOUT: 4,
    USE_PREFERRED_SIZE: "preferred",
    USE_AVAILABLE_SPACE: "available",
    SCROLL_HORIZONTAL: 1,
    SCROLL_VERTICAL: 2,
    SCROLL_BOTH: 3,
    SCROLL_NONE: 4,
    AUTOGROW_HEIGHT: 1,
    AUTOGROW_NONE: 0,
    RESPONSIVE_GRID : "rflex",
};

voltmx.canvas = {
    SHAPE_TYPE_LINE: "line",
    LINE_STYLE_SOLID: "solidline",
    LINE_STYLE_DASHED: "dashedline",
    LINE_STYLE_DOTTED: "dottedline"
};

voltmx.anim = {
    FILL_MODE_FORWARDS: "forwards",
    FILL_MODE_BACKWARDS: "backwards",
    FILL_MODE_BOTH: "both",
    FILL_MODE_NONE: "none",

    DIRECTION_NONE: "normal",
    DIRECTION_REVERSE: "reverse",
    DIRECTION_ALTERNATE: "alternate",
    DIRECTION_ALTERNATE_REVERSE: "alternate-reverse",

    EASE: "ease",
    EASE_IN: "ease-in",
    EASE_OUT: "ease-out",
    EASE_IN_OUT: "ease-in-out",
    LINEAR: "linear"
};

voltmx.segment = {
    ADD: 0,
    REMOVE: 1,
    UPDATE: 2,
    VISIBLE: 3,
    INVISIBLE: 4,
    PORTIONS_PER_SEGMENT: 2
};

voltmx.map = {
    MAP_PROVIDER_GOOGLE: "google",
    MAP_VIEW_MODE_NORMAL: 1,
    MAP_VIEW_MODE_SATELLITE: 2,
    PIN_IMG_ANCHOR_TOP_LEFT: 3,
    PIN_IMG_ANCHOR_TOP_RIGHT: 4,
    PIN_IMG_ANCHOR_TOP_CENTER: 5,
    PIN_IMG_ANCHOR_CENTER: 6,
    PIN_IMG_ANCHOR_BOTTOM_LEFT: 7,
    PIN_IMG_ANCHOR_BOTTOM_RIGHT: 8,
    PIN_IMG_ANCHOR_BOTTOM_CENTER: 9,
    PIN_IMG_ANCHOR_MIDDLE_LEFT: 10,
    PIN_IMG_ANCHOR_MIDDLE_RIGHT: 11
};

voltmx.collectionview = {
    SINGLE_SELECT: 1,
    MULTI_SELECT: 2,
    LAYOUT_HORIZONTAL: 0,
    LAYOUT_VERTICAL: 1,
    LAYOUT_CUSTOM: 2,
    SCROLL_DIRECTION_BOTH: "both",
    SCROLL_DIRECTION_VERTICAL: "vertical",
    SCROLL_DIRECTION_HORIZONTAL: "horizontal"
};

voltmx.calendar = {
    LEGACY: "legacy",
    MODERN: "modern"
};

$KI.os.time = function() {
    var timeStr = (new Date()).toTimeString();
    return timeStr.slice(0, timeStr.indexOf(" "));
};

$KI.os.diffdatetime = function(time1, time2) {
    if(typeof(time1) !== "string" || typeof(time2) !== "string") {
        throw new Error("Invalid argument(s) to os.diffdatetime");
    }

    var t1 = time1.split(":");
    t1[2] = t1[2] - 0;
    var t2 = time2.split(":");
    t2[2] = t2[2] - 0;
    var one_day = 86400;
    var t1sec = t1[0] * 3600 + t1[1] * 60 + t1[2];
    var t2sec = t2[0] * 3600 + t2[1] * 60 + t2[2];

    return(t1sec > one_day || t2sec > one_day) ? null : t1sec - t2sec;
};

$KI.os.date = function() {
    var result;
    var currentDate = new Date();

    if(0 === arguments.length) {
        var timeStr = currentDate.toTimeString();
        result = $KI.os.padZero(currentDate.getMonth() + 1) + "/" + $KI.os.padZero(currentDate.getDate()) + "/" + $KI.os.padZero(currentDate.getFullYear() % 100) + " " + timeStr.slice(0, timeStr.indexOf(" "));
        return result;
    } else if(typeof(arguments[0]) == "string") {

        if(arguments[0].toLowerCase().indexOf("dd") != -1) {

            return $KI.os.formatDate(arguments[0], currentDate);
        } else {
            var utc = arguments[0].charAt(0) === '!';
            var index = utc ? 1 : 0;
            if('*' === arguments[0].charAt(index) && 't' === arguments[0].charAt(index + 1)) {
                var day = utc ? currentDate.getUTCDate() : currentDate.getDate();
                var mon = (utc ? currentDate.getUTCMonth() : currentDate.getMonth()) + 1;
                var year = utc ? currentDate.getUTCFullYear() : currentDate.getFullYear();

                result = new Object();
                result["year"] = year;
                result["month"] = mon;
                result["day"] = day;
                result["hour"] = utc ? currentDate.getUTCHours() : currentDate.getHours();
                result["min"] = utc ? currentDate.getUTCMinutes() : currentDate.getMinutes();
                result["sec"] = utc ? currentDate.getUTCSeconds() : currentDate.getSeconds();
                result["wday"] = utc ? currentDate.getUTCDay() : currentDate.getDay() + 1;
                result["yday"] = $KU.getDayOfYear(day, mon, year);
                result["isdst"] = utc ? false : $KI.os.checkForDst();
                return result;
            } else
                return null;
        }
    } else
        return null;
};

$KI.os.tocurrency = function(arg) {
    $KU.logExecuting('voltmx.os.toCurrency');
    arg -= 0;
    if(isNaN(arg)) {
        $KU.logErrorMessage('Invalid argument to os.tocurrency');
        throw new Error("Invalid argument to os.tocurrency");
    }
    $KU.logExecutingWithParams('voltmx.os.toCurrency', arg);
    if(arg < 0) arg *= -1;
    var str = arg.toFixed(3);
    str = str.substr(0, str.length - 1);
    var outStr = "";
    for(var i = 0; i < str.length - 4; i++) {
        outStr += str.charAt(i);
        if((str.length - i - 1) % 3 === 0) outStr += ",";
    }

    for(; i < str.length; i++) {
        outStr += str.charAt(i);
    }

    $KU.logExecutingFinished('voltmx.os.toCurrency');
    return "$" + outStr;
};

$KI.os.tonumber = function(arg) {
    $KU.logExecuting('voltmx.os.toNumber');
    if(arguments.length != 1) {
        $KU.logErrorMessage('Invalid argument to os.number');
        throw new Error("Invalid argument to os.tonumber");
    }
    $KU.logExecutingWithParams('voltmx.os.toNumber', arg);
    $KU.logExecutingFinished('voltmx.os.toNumber');
    if(typeof(arg) === "number") {
        return arg;
    } else if(typeof(arg) === "string") {

        var str = arg.replace(/^\s*/, '').replace(/\s*$/, '');
        if(str === '') {
            return null;
        } else {
            var num = str - 0;
            return(isNaN(num) ? null : num);
        }

    } else {
        $KU.logWarnMessage('Request aborted on user request');
        return null;
    }
};

$KI.os.freememory = function() {
    $KU.logExecuting('voltmx.os.freeMemory');
    $KU.logExecutingWithParams('voltmx.os.freeMemory');
    $KU.logExecutingFinished('voltmx.os.freeMemory');
    return 100 * 1024 * 1024;
};


$KI.os.comparedates = function(d1, d2, frmt) {
    if(d1 == null || d2 == null || frmt == null || !$KU.isValidDate(d1, frmt) || !$KU.isValidDate(d2, frmt))
        return null

    var date1 = $KU.getDate(d1, frmt);
    var date2 = $KU.getDate(d2, frmt);
    var oneday = 24 * 60 * 60 * 1000;

    return parseInt((date1.getTime() - date2.getTime()) / oneday);
};



$KI.os.addtodate = function(d1, frmt, unt, cnt) {
    if(d1 == null || frmt == null || unt == null || cnt == null) {
        return null;
    }
    var inputDate = d1;
    var fmt = frmt.split(" ")[0];
    var unit = unt;
    var count = cnt;
    var parts = inputDate.split(" ");
    var dateParts = parts[0].split("/");
    var time = parts[1];

    if(!$KU.isValidDate(parts[0], fmt))
        return null;

    if(time) {
        var t = time.split(":");
        var one_day = 86400;
        var tSec = t[0] * 3600 + t[1] * 60 + (t[2] - 0);
        if(tSec > one_day) return null;
    }

    var dateObj = $KU.getDate(inputDate, fmt);

    if(dateObj) {
        switch(unit) {
            case "years":
                dateObj.setFullYear(dateObj.getFullYear() + count);
                break;
            case "months":
                dateObj.setMonth(dateObj.getMonth() + count);
                break;
            case "days":
                dateObj.setDate(dateObj.getDate() + count);
                break;
            case "hours":
                dateObj.setHours(dateObj.getHours() + count);
                break;
            case "minutes":
                dateObj.setMinutes(dateObj.getMinutes() + count);
                break;
            default:
                break;
        }
        if($KI.os.isleapyear([d1, fmt]) && dateObj.getMonth() >= 1 && (unit == "years" || (unit == "months" && (count == -12 || count == 12))))
            dateObj.setDate(dateObj.getDate() - 1);

        return $KI.os.formatDate(fmt, dateObj) + (time ? " " + dateObj.toTimeString().split(" ")[0] : "");
    }
    return null;
};


$KI.os.isleapyear = function(d1, frmt) {
    var year;
    var date = new Date(); 
    year = date.getFullYear();

    if(typeof(d1) == "string" && typeof(frmt) == "string") {

        if(!$KU.isValidDate(d1, frmt))
            return false;

        var yearPart = d1.split("/")[2];
        year = (yearPart.length == 2) ? parseInt(date.getFullYear().toString().substr(0, 2) + yearPart) : parseInt(yearPart);
    }

    if((year % 400 == 0) || ((year % 4 == 0) && (year % 100 != 0))) {
        return true;
    } else {
        return false;
    }
};


$KI.os.formatdate = function(d1, sfrmt, tgtfrmt) {
    var year;
    if(d1 == null || sfrmt == null || tgtfrmt == null) {
        return null;
    } else if(typeof(d1) === "string" && typeof(sfrmt) === "string" && typeof(tgtfrmt) === "string") {

        var inputDate = d1
        var srcfmt = sfrmt;
        var targetfmt = tgtfrmt;

        var datePos = srcfmt.indexOf("dd");
        var monthPos = srcfmt.indexOf("mm");
        var yearPos = (srcfmt.indexOf("yyyy") != -1) ? srcfmt.indexOf("yyyy") : srcfmt.indexOf("yy");

        if((srcfmt == "dd/mm/yyyy" && !$KU.isValidDate(inputDate, srcfmt)) || datePos == -1 || monthPos == -1 || yearPos == -1 || srcfmt.indexOf("ddd") != -1 || srcfmt.indexOf("mmm") != -1) {
            return null;
        }

        var dateStrSep = srcfmt.charAt(datePos - 1);
        var dateEndSep = srcfmt.charAt(datePos + 2);
        dateEndSep = (dateEndSep == "(") ? "" : dateEndSep;

        var monthStrSep = srcfmt.charAt(monthPos - 1);
        var monthEndSep = srcfmt.charAt(monthPos + 2);

        var yearStrSep = srcfmt.charAt(yearPos - 1);
        var yearEndSep = srcfmt.charAt(yearPos + 4);

        var startDateIndex = (dateStrSep == "") ? inputDate.indexOf(dateStrSep, datePos - 1) : inputDate.indexOf(dateStrSep, datePos - 2) + 1;
        var startMonthIndex = (monthStrSep == "") ? inputDate.indexOf(monthStrSep, monthPos - 1) : inputDate.indexOf(monthStrSep, monthPos - 2) + 1;
        var startYearIndex = (yearStrSep == "") ? inputDate.indexOf(yearStrSep, yearPos - 1) : ((inputDate.indexOf(yearStrSep, yearPos - 2) != -1) ? inputDate.indexOf(yearStrSep, yearPos - 2) + 1 : inputDate.indexOf(yearStrSep, yearPos - 4) + 1);

        var endDateIndex = (dateEndSep != "") ? inputDate.indexOf(dateEndSep, datePos) : inputDate.indexOf(dateEndSep, datePos + 2);
        var endMonthIndex = (monthEndSep != "") ? inputDate.indexOf(monthEndSep, monthPos) : inputDate.indexOf(monthEndSep, monthPos + 2);
        var endYearIndex = (yearEndSep != "") ? inputDate.indexOf(yearEndSep, yearPos) : inputDate.indexOf(yearEndSep, yearPos + 4);

        var dateVal = inputDate.substring(startDateIndex, endDateIndex);
        var monthVal = inputDate.substring(startMonthIndex, endMonthIndex);
        var yearVal = inputDate.substring(startYearIndex, endYearIndex);

        if((yearVal.length == 2 && targetfmt.indexOf("yyyy") != -1))
            var fullyr = new Date().getFullYear().toString().substr(0, 2) + yearVal;

        targetfmt = targetfmt.replace(/dd/, $KI.os.padZero(parseInt(dateVal, 10)));
        targetfmt = targetfmt.replace(/mm/, $KI.os.padZero(parseInt(monthVal, 10)));
        targetfmt = targetfmt.replace(/(yyyy|yy)/, fullyr ? fullyr : ((targetfmt.indexOf("yyyy") == -1 && yearVal.length == 4) ? yearVal.substr(2, 2) : yearVal));

        return targetfmt;
    }
    return null;
};


$KI.os.isvaliddate = function(date, frmt) {
    return(arguments.length != 2 || date == null || frmt == null) ? false : $KU.isValidDate(date, frmt);
};

$KI.os.checkForDst = function() {
    var rightNow = new Date();
    var jan1 = new Date(rightNow.getFullYear(), 0, 1, 0, 0, 0, 0);
    var temp = jan1.toGMTString();
    var jan2 = new Date(temp.substring(0, temp.lastIndexOf(" ") - 1));
    var std_time_offset = (jan1 - jan2) / (1000 * 60 * 60);

    var june1 = new Date(rightNow.getFullYear(), 6, 1, 0, 0, 0, 0);
    temp = june1.toGMTString();
    var june2 = new Date(temp.substring(0, temp.lastIndexOf(" ") - 1));
    var daylight_time_offset = (june1 - june2) / (1000 * 60 * 60);
    var dst;
    if(std_time_offset == daylight_time_offset) {
        
        return false;
    } else {
        
        return true;
    }
};



$KI.os.datecomponents = function(date, frmt) {
    var result;
    var dateObject;
    if(arguments.length == 0) {
        dateObject = new Date();
    } else if(date != null && frmt != null) {
        if(!$KU.isValidDate(date, frmt))
            return null;
        dateObject = $KU.getDate(date, frmt);
        var yearfmt = frmt.split("/")[2];
    }
    if(dateObject) {

        var day = dateObject.getDate();
        var mon = dateObject.getMonth() + 1;
        var year = (yearfmt && yearfmt.length == 2) ? parseInt(dateObject.getFullYear().toString().substr(2, 2)) : dateObject.getFullYear();

        result = new Object();
        result["year"] = year;
        result["month"] = mon;
        result["day"] = day;
        result["hour"] = dateObject.getHours();
        result["min"] = dateObject.getMinutes();
        result["sec"] = dateObject.getSeconds();
        result["wday"] = dateObject.getDay() + 1;
        result["yday"] = $KU.getDayOfYear(day, mon, year);
        result["isdst"] = $KI.os.checkForDst();
        return result;
    } else
        return null;

};

$KI.os.padZero = function(num) {
    return num < 10 ? ("0" + num) : num;
};

$KI.os.formatDate = function(fmt, dateObj) {
    fmt = fmt.toLowerCase();
    fmt = fmt.replace(/dd/, $KI.os.padZero(dateObj.getDate()));
    fmt = fmt.replace(/mm/, $KI.os.padZero(dateObj.getMonth() + 1));
    return fmt.replace(/(yyyy|yy)/, fmt.indexOf("yyyy") == -1 ? dateObj.getFullYear().toString().substr(2, 2) : dateObj.getFullYear());
};

$KI.os.getappcontext = function() {
    var appcontext = {};
    var flag = "standalone" in window.navigator && window.navigator.standalone ? 1 : 0;
    $KU.logExecuting('voltmx.os.getAppContext');
    $KU.logExecutingWithParams('voltmx.os.getAppContext');
    $KU.logExecutingFinished('voltmx.os.getAppContext');
    appcontext["launchmode"] = flag;
    return appcontext;
};

$KI.os.hasgpssupport = function() {
    $KU.logExecuting('voltmx.os.hasGPSSupport');
    $KU.logExecutingWithParams('voltmx.os.hasGPSSupport');
    $KU.logExecutingFinished('voltmx.os.hasGPSSupport');
    return 'navigator' in window && 'geolocation' in navigator;
};

($KI.os.hascamerasupport = function() {
    if(navigator.mediaDevices && navigator.mediaDevices.enumerateDevices) {
        navigator.mediaDevices.enumerateDevices().then(function(device) {
            var i = 0;
            for(i; i < device.length; i++) {
                if(device[i].kind === 'videoinput') {
                    voltmx.appinit.isCameraSupported = true;
                }
            }
        });
    }
})();

$KI.os.hastouchsupport = function() {
    $KU.logExecuting('voltmx.os.hasTouchSupport');
    $KU.logExecutingWithParams('voltmx.os.hasTouchSupport');
    $KU.logExecutingFinished('voltmx.os.hasTouchSupport');
    $KU.logErrorMessage('hasTouchSupport failed');
    return false;
};

$KI.os.hasorientationsupport = function() {
    $KU.logExecuting('voltmx.os.hasOrientationSupport');
    $KU.logExecutingWithParams('voltmx.os.hasOrientationSupport');
    $KU.logExecutingFinished('voltmx.os.hasOrientationSupport');
    $KU.logErrorMessage('hasOrientationSupport failed');
    return false;
};

$KI.os.hasaccelerometersupport = function() {
    return false;
};

$KI.os.httpheaders = function() {
    if($KG["httpheaders"])
        return JSON.stringify($KG["httpheaders"]);
};

$KI.os.getdevicecurrentorientation = function() {
    $KU.logExecuting('voltmx.os.getDeviceCurrentOrientation');
    $KU.logExecutingWithParams('voltmx.os.getDeviceCurrentOrientation');
    var orientation = $KU.detectOrientation();
    $KU.logExecutingFinished('voltmx.os.getDeviceCurrentOrientation');
    return(orientation == "portrait") ? constants.DEVICE_ORIENTATION_PORTRAIT : constants.DEVICE_ORIENTATION_LANDSCAPE;
};


$KI.os.setapplicationscrollmode = function(paramObj) {
    if(!paramObj)
        return;

    var platform = $KU.getPlatform();
    var platformName = platform.name.toLowerCase();
    var platformVersion = platform.version;

    if(platformName == "blackberryNTH" || (platformName == "windowsphone" && $KU.isIE9))
        return;

    var custom = paramObj.customscroll;
    var mixed = paramObj.mixedscroll;
    var native2 = paramObj.nativescroll;
    var nomodify;

    
    if(mixed) {
        var platforms = mixed.platforms;
        if(platforms) {
            for(var i = IndexJL; i < platforms.length; i++) {
                var platform = platforms[i];
                if(platformName == platform.name.toLowerCase()) {
                    
                    var useragents = platform.useragents;
                    if(useragents) {
                        for(var j = IndexJL; j < useragents.length; j++) {
                            if(navigator.userAgent.toLowerCase().indexOf(useragents[j].toLowerCase()) != -1) {
                                $KG["useMixedScroll"] = true;
                                nomodify = true;
                                break;
                            }
                        }
                        if(nomodify)
                            break;
                    }

                    
                    var versions = platform.versions;
                    if((!useragents && !versions) || versions[IndexJL] == -1) {
                        $KG["useMixedScroll"] = true;
                        break;
                    }
                    for(var j = IndexJL; j < versions.length; j++) {
                        if(platformVersion == versions[j]) {
                            $KG["useMixedScroll"] = true;
                            break;
                        }
                    }
                }
            }
        }
    }
    
    if(native2 && !nomodify) {
        var platforms = native2.platforms;
        if(platforms) {
            for(var i = IndexJL; i < platforms.length; i++) {
                var platform = platforms[i];
                if(platformName == platform.name.toLowerCase()) {
                    
                    var useragents = platform.useragents;
                    if(useragents) {
                        for(var j = IndexJL; j < useragents.length; j++) {
                            if(navigator.userAgent.toLowerCase().indexOf(useragents[j].toLowerCase()) != -1) {
                                $KG["useNativeScroll"] = true;
                                $KG["useMixedScroll"] = false;
                                nomodify = true;
                                break;
                            }
                        }
                        if(nomodify)
                            break;
                    }

                    
                    var versions = platform.versions;
                    if((!useragents && !versions) || versions[IndexJL] == -1) {
                        if(!$KG["useMixedScroll"])
                            $KG["useNativeScroll"] = true;
                        break;
                    }
                    for(var j = IndexJL; j < versions.length; j++) {
                        if(platformVersion == versions[j]) {
                            $KG["useNativeScroll"] = true;
                            $KG["useMixedScroll"] = false;
                            break;
                        }
                    }
                }
            }
        }
    }
    
    if(!$KG["useMixedScroll"] && !$KG["useNativeScroll"])
        $KG["useCustomScroll"] = true;
};

$KI.os.print = function(container, autoClose) {
    $KU.logExecuting('voltmx.os.print');
    $KU.logExecutingWithParams('voltmx.os.print', container, container);
    if(container && container.id && !(container.wType === "Form")) {
        var domNode = document.getElementById(container.id);
        if(!domNode)
            domNode = $KU.getNodeByModel(container);
        if(domNode) {
            var printContents = domNode.outerHTML;
            var headTag = document.getElementsByTagName("head")[0];
            var baseTag;
            for(var i = 0; i < headTag.childNodes.length; i++) {
                if(headTag.childNodes[i].nodeName == "BASE") {
                    baseTag = headTag.childNodes[i];
                    break;
                }
            }

            var w = window.open();
            if(w) {
                w.document.write('<!DOCTYPE html><html>');
                w.document.write('<head>');
                
                
                if(baseTag) {
                    w.document.write("<base href='");
                    w.document.write(baseTag.href);
                    w.document.write("' target = '_blank'>");
                }
                var tempCSS = document.styleSheets;
                for(var i = 0; i < tempCSS.length; i++) {
                    if(tempCSS[i].href) {
                        w.document.write("<link rel='stylesheet' href='");
                        w.document.write(tempCSS[i].href);
                        w.document.write("' type='text/css'></link>");
                    }
                }
                if(voltmx.appinit.isSafari)
                    w.document.write('<style>table{table-layout: auto !important;} .ktable {table-layout: auto !important;} .kcell {display: table !important;}</style>');
                w.document.write('</head>');
                if(voltmx.appinit.isSafari)
                    w.document.write("<body style='" + window.document.body.style.cssText + "' >");
                else
                    w.document.write('<body>');
                w.document.write(printContents);
                
                setTimeout(function() {
                    w.document.write('</body>');
                    w.document.write('</html>');
                    w.document.close(); 
                    w.focus();
                    w.print();
                }, 1000);

                setTimeout(function() {
                    w.close();
                }, 2000); 
            } else {
                voltmx.print("Allow popup to open for this site.");
            }
        }
    } else if(container && !(container.wType && container.wType === "Form")) {
        var w = window.open();
        if(w) {
            w.document.write(container);
            w.onload = new function() {
                w.document.close();
                w.focus();
                w.print();
            }

            if(autoClose) {
                setTimeout(function() {
                    w.close();
                }, 2000); 
            }
        } else {
            voltmx.print("Allow popup to open for this site.");
        }

    } else {
        window.print();
    }
    $KU.logExecutingFinished('voltmx.os.print');
};

$KI.os.addbookmark = function(url, title, params) {
    var url = url || window.location.href.split("#")[0];
    url = url.split("?")[0];
    if(params && params instanceof Object) {
        var searchStr = "";
        for(var prop in params) {
            searchStr += escape(prop) + "=" + escape(params[prop]) + "&";
        }
        searchStr && (searchStr = searchStr.substring(0, searchStr.length - 1))
    }
    try {
        title = title || document.title;
        url += searchStr ? ("?" + searchStr) : "";
        if((typeof window.sidebar == "object") && (typeof window.sidebar.addPanel == "function")) {
            window.sidebar.addPanel(title, url, ""); 
        } else if(voltmx.appinit.isIE && typeof window.external == "object") {
            window.external.AddFavorite(url, title); 
        } else if(voltmx.appinit.isOpera) {
            var elem = document.createElement('a');
            elem.setAttribute('href', url);
            elem.setAttribute('title', title);
            elem.setAttribute('rel', 'sidebar');
            elem.click();
        }
    } catch(err) {
        voltmx.web.logger("log", err);
    }
};



$KIO.FileSystem = $KIO.fs = {
    callback: function() {}, 

    ieFileUploadObj: {},

    init: function() {
        if(!$KU.isAjaxUploadSupported) {
            var htmlString = "<iframe id='voltmxiframeElem' name='voltmxiframeElem' src='about:blank' style='opacity:0;width:0px;height:0px;' ></iframe>";
            var wrapper = document.createElement('div');
            wrapper.innerHTML = htmlString;
            document.body.appendChild(wrapper);
        }
    },

    browse: function(browseConfig, browseCallback) { 

        if(!browseConfig instanceof Object || !browseCallback instanceof Function)
            return;

        this.callback = browseCallback;
        var htmlString = "";

        if($KU.isAjaxUploadSupported) {
            var fileElement = document.getElementById("voltmxFileElem");
            if(!fileElement) {
                htmlString = "<form name='uploadForm'><input type='file' multiple id='voltmxFileElem' onchange='$KIO.fs.afterBrowse(arguments[0])' onclick='uploadForm.reset();' style='opacity:0;width:0px;height:0px;display:none;' /></form>";
                var wrapper = document.createElement('div');
                wrapper.innerHTML = htmlString;
                document.body.appendChild(wrapper);
                fileElement = document.getElementById("voltmxFileElem");
            }

            if(browseConfig.selectMultipleFiles == false)
                fileElement.removeAttribute("multiple");
            else
                fileElement.setAttribute("multiple", "multiple");
            if(browseConfig.filter)
                fileElement.setAttribute("accept", browseConfig.filter.join(","));
            else
                fileElement.removeAttribute("accept");

            fileElement.click();
        } else {
            var iFrameWindow = document.getElementById("voltmxiframeElem").contentWindow || document.getElementById("voltmxiframeElem").documentWindow;
            var frmElem = iFrameWindow.document.getElementById("uploadForm");
            if(!frmElem) {
                var wrapper = document.createElement('div');
                wrapper.innerHTML = '<form id="uploadForm" method="POST" action="" enctype="multipart/form-data" ></form>';
                if(iFrameWindow.document.body) iFrameWindow.document.body.appendChild(wrapper);
                frmElem = iFrameWindow.document.getElementById("uploadForm");
            }
            var unique = new Date().getTime();
            var fileInput = document.createElement('input');
            fileInput.setAttribute('type', 'file');
            fileInput.setAttribute('name', 'file_' + unique);
            fileInput.setAttribute('id', 'file_' + unique);
            fileInput.setAttribute('onchange', 'window.parent.$KIO.fs.afterBrowse(this)');
            fileInput.setAttribute('onclick', 'uploadForm.reset()');
            frmElem.appendChild(fileInput);

            var file = iFrameWindow.document.getElementsByTagName("input");
            file = file[file.length - 1];
            if(file) file.click();
        }
    },

    afterBrowse: function(event) { 

        var fileList = [];
        if($KU.isAjaxUploadSupported) {
            for(var i = 0, f; f = event.target.files[i]; ++i) {
                fileList.push(new $KIO.File(f)); 
            }
        } else {
            var path = event.value;
            var fName = path.substring(path.lastIndexOf('\\') + 1);
            var pName = path.substring(0, path.lastIndexOf('\\')); 
            pName = pName.substring(pName.lastIndexOf('\\') + 1); 
            fileList.push(new $KIO.File({
                name: fName,
                fullPath: path,
                parent: pName,
                file: event
            }));
        }
        $KIO.fs.callback(event, fileList); 
    },

    uploadFiles: function(URL, fileList, upLoadCallBack, upLoadConfig) { 
        if(!URL || !fileList || (fileList && fileList.length < 1))
            return;

        var uploadState = [];
        for(var i = 0, f; f = fileList[i]; ++i) {
            uploadState.push({
                file: f,
                status: null,
                uploadBytes: null
            });
        }
        if($KU.isAjaxUploadSupported) {
            for(var index = 0; index < uploadState.length; index++) {
                this.uploadFile(URL, uploadState, index, upLoadCallBack, upLoadConfig); 
            }
        } else {
            var voltmxFrame = document.getElementById("voltmxiframeElem");
            if($KU.isIE) {
                voltmxFrame.attachEvent("onload", $KIO.fs.ieCallback);
                voltmxFrame.attachEvent("onerror", $KIO.fs.ieErrorCallback);
            } else {
                voltmxFrame.onload = $KIO.fs.ieCallback;
                voltmxFrame.onerror = $KIO.fs.ieErrorCallback;
            }

            $KIO.fs.ieFileUploadObj.state = uploadState;
            $KIO.fs.ieFileUploadObj.url = URL;
            $KIO.fs.ieFileUploadObj.callback = upLoadCallBack;

            var re = /^(http|https):\/\/?/;
            if(!re.test(URL)) {
                $KIO.fs.ieErrorCallback();
                return;
            } 

            var frame = document.getElementById('voltmxiframeElem');
            var iFrameWindow = frame.contentWindow || frame.documentWindow;
            var form = iFrameWindow.document.getElementById("uploadForm");
            form.action = URL;
            form.submit();
        }
    },

    uploadFile: function(url, uploadObj, fIndex, callback, config) { 
        try {
            var f = uploadObj[fIndex].file;
            var formData = new FormData();
            formData.append(f.name, f.file); 

            var re = /^(http|https):\/\/?/;
            if(!re.test(url)) {
                uploadObj[fIndex].status = constants.FILE_UPLOAD_ERROR_STATE;
                callback && callback(url, uploadObj);
                return;
            } 

            var xhr = new XMLHttpRequest();
            xhr.open('POST', url, true);

            xhr.upload.onloadstart = function(e) {
                uploadObj[fIndex].status = constants.FILE_UPLOAD_START_STATE;
                uploadObj[fIndex].uploadBytes = 0;
                callback && callback(url, uploadObj);
            }
            xhr.upload.onprogress = function(e) { 
                if(e.lengthComputable) {
                    uploadObj[fIndex].uploadBytes = e.loaded;
                }
                uploadObj[fIndex].status = constants.FILE_UPLOAD_PROGRESS_STATE;
                callback && callback(url, uploadObj);
            };
            xhr.upload.onerror = function(e) { 
                uploadObj[fIndex].status = constants.FILE_UPLOAD_ERROR_STATE;
                uploadObj[fIndex].uploadBytes = 0;
                callback && callback(url, uploadObj);
            };
            xhr.upload.onabort = function(e) { 
                uploadObj[fIndex].status = constants.FILE_UPLOAD_ERROR_STATE;
                callback && callback(url, uploadObj);
            };
            xhr.onload = function(e) {
                if(this.status == 200) { 
                    uploadObj[fIndex].status = constants.FILE_UPLOAD_COMPLETE_STATE;
                    uploadObj[fIndex].uploadBytes = uploadObj[fIndex].file.size;
                    callback && callback(url, uploadObj);
                }
            };
            xhr.onerror = function(e) { 
                uploadObj[fIndex].status = constants.FILE_UPLOAD_ERROR_STATE;
                uploadObj[fIndex].uploadBytes = 0;
                callback && callback(url, uploadObj);
            };
            var requestTimer = setTimeout(function() { 
                xhr.abort();
            }, constants.UPLOAD_MAX_WAIT_TIME);
            xhr.onreadystatechange = function() { 
                if(xhr.readyState != 4) {
                    return;
                }
                clearTimeout(requestTimer);
                if(xhr.status != 200) {
                    uploadObj[fIndex].status = constants.FILE_UPLOAD_ERROR_STATE;
                    uploadObj[fIndex].uploadBytes = 0;
                    callback && callback(url, uploadObj);
                }
            };
            xhr.send(formData); 
        } catch(e) {
            voltmx.web.logger("log", e.message);
        }
    },

    ieCallback: function() {
        var uObj = $KIO.fs.ieFileUploadObj;
        try {
            var response = document.getElementById("voltmxiframeElem").contentWindow.document.body.innerHTML;
            if(response) {
                for(var i = 0; i < uObj.state.length; i++)
                    uObj.state[i].status = constants.FILE_UPLOAD_COMPLETE_STATE;
                uObj.callback && uObj.callback(uObj.url, uObj.state);
                voltmx.web.logger("log", response);
            }
        } catch(e) {
            voltmx.web.logger("log", e.message);
            for(var i = 0; i < uObj.state.length; i++)
                uObj.state[i].status = constants.FILE_UPLOAD_ERROR_STATE;
            uObj.callback && uObj.callback(uObj.url, uObj.state);
        }
    },

    ieErrorCallback: function() {
        var uObj = $KIO.fs.ieFileUploadObj;
        for(var i = 0; i < uObj.state.length; i++)
            uObj.state[i].status = constants.FILE_UPLOAD_ERROR_STATE;
        uObj.callback && uObj.callback(uObj.url, uObj.state);
    },

    copyBundledRawFileTo : tobeimplemented,
    getAppGroupDirectoryPath : tobeimplemented,
    getApplicationDirectoryPath : tobeimplemented,
    getCacheDirectoryPath : tobeimplemented,
    getDatabaseDirectoryPath : tobeimplemented,
    getDataDirectoryPath : tobeimplemented,
    getExternalStorageDirectoryPath : tobeimplemented,
    getFile : tobeimplemented,
    getRawDirectoryPath : tobeimplemented,
    getSupportDirectoryPath : tobeimplemented,
    isExternalStorageAvailable : tobeimplemented

};



$KIO.File = function(file) {
    if($KU.isAjaxUploadSupported) {
        this.name = file.name;
        this.file = file; 
    } else {
        for(var prop in file) this[prop] = file[prop];
    }
    this.readable = true;
    this.writable = false;
    if(file.lastModifiedDate)
        this.modificationTime = new Date(file.lastModifiedDate).toISOString();
    if(file.size)
        this.size = file.size;
    return this;
};

voltmx.system = (function() {
    
    

    var module = {
        activity: {
            activityCounter: 0,

            increment: function() {
                this.activityCounter++;
            },

            decrement: function() {
                if(this.activityCounter != 0)
                    this.activityCounter--;
            },

            hasActivity: function() {
                if(this.activityCounter > 0)
                    return true;
                else
                    return false;
            }
        },

        timers: {
            timerActions: new Array(),

            TimerAction: function(actionName, frequency) {
                this.actionName = actionName;
                this.frequency = frequency;
                this.timer = null;
                
                this.elapsedTimeSinceLastCall = 0;
            },

            registerTimerAction: function(timerAction) {
                if(this.timerActions.containsTimerAction(timerAction) === false) {
                    this.timerActions.push(timerAction);
                }
            },

            executeTimerActions: function() {
                if(this.timerActions.length > 0) {
                    for(var i = 0; i < this.timerActions.length; i++) {
                        var timerAction = this.timerActions[i];
                        timerAction.timer = setInterval(timerAction.actionName, timerAction.frequency);
                    }
                }
            },

            removeTimerAction: function(timerAction) {
                var tempActions = new Array();
                if(this.timerActions.length > 0) {
                    for(var i = 0; i < this.timerActions.length; i++) {
                        if(this.timerActions[i].actionName !== timerAction.actionName) {
                            tempActions.push(this.timerActions[i]);
                        }
                    }

                    this.timerActions = tempActions;
                }
            },

            clearTimerAction: function(timerAction) {
                if(this.timerActions.length > 0) {
                    for(var i = 0; i < this.timerActions.length; i++) {
                        timerAction = this.timerActions[i];
                        clearTimeout(timerAction.timer);
                    }
                }
            }
        }
    };


    return module;
}());

$KI.net = {

    integrityProperties: null,

    postdataparams: function(postobj) {
        var postdata = "",
            value;

        for(var i in postobj) {

            if(postobj.hasOwnProperty(i) && i != "httpheaders") {
                value = postobj[i];
                voltmx.print("postdataparams:key  = " + i + "  value  =  " + value);
                postdata += i + '=' + encodeURIComponent(value);
                postdata += "&";
            }
        }
        return postdata;
    },
    
    FormData: function(formdataparam) {

        function makeIterator(_formdata, arg) {
            var arrKey = Object.keys(_formdata);
            var index =0;
            var index1=0;
            if(arg == "entries") {
                return {
                    next: function() {
                        if(index < arrKey.length && index1 >= _formdata[arrKey[index]].length) {
                            index1 = 0;
                            index++;
                        }
                        return (index < arrKey.length)? {done: false, value: [arrKey[index],_formdata[arrKey[index]][index1++]]} : {done: true, value: undefined};
                    }
                };
            } else if (arg == "keys") {
                return {
                    next: function() {
                        return (index < arrKey.length)? {done: false, value: arrKey[index++]} : {done: true, value: undefined};
                    }
                };
            } else if(arg == "values") {
                return {
                    next: function() {
                        if(index < arrKey.length && index1 >= _formdata[arrKey[index]].length) {
                            index1 = 0;
                            index++;
                        }
                        return (index < arrKey.length)? {done: false, value: _formdata[arrKey[index]][index1++]} : {done: true, value: undefined};
                    }
                };
            }
        }
        $KU.logExecuting('voltmx.net.FormData');
        if(formdataparam && formdataparam.isMultiPart && (window.FormData != undefined)) {
            $KU.logExecutingWithParams('voltmx.net.FormData', formdataparam);
            $KU.logExecutingFinished('voltmx.net.FormData VIA if (formdataparam && formdataparam.isMultiPart && (window.FormData != undefined)) is true');
            return new FormData();
        } else {
            $KU.logExecutingWithParams('voltmx.net.FormData', formdataparam);
            var _formdata = {},
            that = this;
            that.append = function(key, value) {
                if(key == "undefined" || key == "") {
                    $KU.logErrorMessage('FormData append Error: key cannot be empty');
                    throw new Error("FormData append Error: key cannot be empty");
                }
                
                
                if(!$KG.appbehaviors.doNotEncodeFormValue) {
                    value = encodeURIComponent(value);
                }
                if(!_formdata[key]) {
                    _formdata[key] = [value];
                } else {
                    _formdata[key].push(value);
                }
            },
            that.toString = function() {
                var formdata = "";
                for(var key in _formdata) {
                    if(formdata == "") {
                        formdata = key + '=' + _formdata[key].join('&' + key + '=');
                    } else {
                        formdata += '&' + key + '=' + _formdata[key].join('&' + key + '=');
                    }
                }
                return formdata;
            },
            that.delete = function(key) {
                delete _formdata[key];
            },
            that.entries = function() {
                return makeIterator(_formdata, "entries");
            },
            that.get = function(key) {
                return _formdata[key][0];
            },
            that.getAll = function(key) {
                return _formdata[key];
            },
            that.has = function(key) {
                return _formdata.hasOwnProperty(key);
            },
            that.keys = function() {
                return makeIterator(_formdata, "keys");
            },
            that.set = function(key, value) {
                if(_formdata.hasOwnProperty(key)) {
                    delete _formdata[key];
                }
                _formdata[key] = [value];
            },
            that.values = function() {
                return makeIterator(_formdata, "values");
            }
            $KU.logExecutingFinished('voltmx.net.FormData VIA VIA if (formdataparam && formdataparam.isMultiPart && (window.FormData != undefined)) is false');
        }
    },

    HttpRequest: function() {
        var _openflag = false,
            _requestMethod = null,
            _sendcount = 0,
            that = this,
            _xhr = null,
            _isIntegrityCheckRequired = false,
            _url = null,
            _xhrtimeout = null;
        $KU.logExecuting('voltmx.net.HttpRequest');
        $KU.logExecutingWithParams('voltmx.net.HttpRequest');
        if(window.XMLHttpRequest) {
            _xhr = new XMLHttpRequest();
        } else {
            _xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }

        that.onReadyStateChange = null;
        that.disableIntegrityCheck = false;
        that.readyState = undefined;
        that.response = "";
        that._ismultipartorbinary = false;
        that.responseType = "";
        that.status = null;
        that.statusText = null;
        that.timeout = 0;
        that.enableWithCredentials = false; 
        that.randomString = '';
        that.integrityStatus = constants.HTTP_INTEGRITY_CHECK_NOT_DONE;

        _xhr.onreadystatechange = function() {
            
            that.status = _xhr.status;
            switch(_xhr.readyState) {
                case 0: 
                case 1: 
                case 2: 
                case 3: 
                    that.readyState = _xhr.readyState;
                    that.response = "";
                    !!that.onReadyStateChange && that.onReadyStateChange(that);
                    break;

                case 4: 
                    that.statusText = "Request Completed";
                    that.readyState = _xhr.readyState;
                    
                    if(_xhr.responseType == "" || _xhr.responseType == "text") {
                        that.response = _xhr.responseText;
                    } else {
                        that.response = _xhr.response;
                    }
                    if(_isIntegrityCheckRequired) {
                        $KI.net.generateResponseCheckSumAndCheckIntegrity($KI.net.integrityProperties, that, that.response);
                    }
                    if(_xhr.status === 200) {
                        that.statusText += ": OK";
                        if(_xhrtimeout) clearTimeout(_xhrtimeout);
                    }
                    if(_xhr.status === 400) {
                        that.statusText += ": Error";
                        if(_xhrtimeout) clearTimeout(_xhrtimeout);
                    }!!that.onReadyStateChange && that.onReadyStateChange(that); 
                    break;

                default:
                    $KU.logErrorMessage('Unknown Error : XMLHttpRequest error');
                    throw new Error("Unknown Error : XMLHttpRequest Error");
            }
        };

        that.timeoutFunction = function() {
            that.abort();
            that.readyState = _xhr.readyState;
            that.status = 0;
            that.statusText = "Request timed out";
            that.response = "";
            !!that.onReadyStateChange && that.onReadyStateChange();
        };

        that.open = function(requestMethod, url, async, username, password) {
            if(!requestMethod && requestMethod !== "GET" && requestMethod !== "POST") {
                $KU.logErrorMessage('Syntax Error : Request Method is not defined');
                throw new Error("Syntax Error : Request Method is not defined");
                return;
            }
            if(!url) {
                $KU.logErrorMessage('Syntax Error : URL is not defined');
                throw new Error("Syntax Error : URL is not defined");
                return;
            }
            _url = url;
            async = ((async === true) || (async === false)) && async || true;
            _requestMethod = requestMethod;
            _openflag = true;
            _xhr.open(_requestMethod, url, async, username, password);
        };

        that.send = function(data) {
            if(_openflag === false) {
                $KU.logErrorMessage("InvalidStateError : 'send' called before 'open'");
                throw new Error("InvalidStateError : 'send' called before 'open' ");
                return;
            }

            if(_sendcount > 1) {
                $KU.logErrorMessage("InvalidStateError : 'send' called more than once ");
                throw new Error("InvalidStateError : 'send' called more than once ");
                return;
            }

            if(data instanceof voltmx.net.FormData) {
                data = data.toString(); 
            } else if(!data) {
                data = "";
            } else if((window.FormData !== undefined) && data instanceof window.FormData) {
                that._ismultipartorbinary = true;
            }

            if(that.enableWithCredentials) {
                _xhr.withCredentials = true;
            }
            _sendcount++;
            _xhr.timeout = !!that.timeout && that.timeout;
            if(_xhr.timeout) {
                _xhrtimeout = setTimeout(that.timeoutFunction, that.timeout);
            }
            _xhr.responseType = that.responseType;
            _isIntegrityCheckRequired = $KI.net.isIntegrityCheckRequired(_url, that.disableIntegrityCheck);
            if(_isIntegrityCheckRequired) {
                $KI.net.generateRequestCheckSumAndSetRequestHeader($KI.net.integrityProperties, that, data);
            }
            _xhr.send(data);
        };

        that.abort = function() {
            _xhr.abort();
        };

        that.setRequestHeader = function(header, value) {
            var binaryFormats = ['application/octet-stream', 'multipart/form-data'];

            if(_openflag === false) {
                $KU.logErrorMessage("InvalidStateError : 'setRequestHeader' called before 'open' ");
                throw new Error("InvalidStateError : 'setRequestHeader' called before 'open' ");
                return;
            }
            if(_sendcount > 1) {
                $KU.logErrorMessage("InvalidStateError : 'setRequestHeader' called after 'send' ");
                throw new Error("InvalidStateError : 'setRequestHeader' called after 'send' ");
                return;
            }

            if(header && header.toLowerCase() === 'content-type'
            && value && binaryFormats.indexOf(value.toLowerCase()) !== -1) {
                that._ismultipartorbinary = true;
            }

            _xhr.setRequestHeader(header, value);

        };
        that.getResponseHeader = function(headerfield) {
            return !!_xhr.getResponseHeader(headerfield) && _xhr.getResponseHeader(headerfield) || null;
        };
        that.getAllResponseHeaders = function() {
            var headers, arr, parts, header, value, line, count = 0,
                headerMap = {}; 
            headers = !!_xhr.getAllResponseHeaders() && _xhr.getAllResponseHeaders() || null;
            
            if($KG.appbehaviors.isResponseHeaderString) {
                return headers;
            }
            
            
            if(headers) {
                arr = headers.trim().split(/[\r\n]+/);
                for(count = 0; count < arr.length; count++) {
                    line = arr[count];
                    parts = line.split(': ');
                    header = parts.shift();
                    value = parts.join(': ');
                    headerMap[header] = value;
                }
            }
            return headerMap;
        };
        $KU.logExecutingFinished('voltmx.net.HttpRequest');
    },

    generateRequestCheckSumAndSetRequestHeader: function(integrityProperties, ajaxobj, data) {
        var algo = integrityProperties.algo, salt = integrityProperties.salt,
            headerName = integrityProperties.headerName, createCheckSumOnReq = null,
            requestChecksum = '', headerValue = '' ;

        ajaxobj.randomString = $KI.crypto.generateRandomString();
        if(ajaxobj._ismultipartorbinary) {
            createCheckSumOnReq = ajaxobj.randomString;
        }

        requestChecksum = $KI.net.generateRequestCheckSum(algo, salt, data, ajaxobj, createCheckSumOnReq);
        headerValue = ajaxobj.randomString + ";" + requestChecksum;
        ajaxobj.setRequestHeader(headerName, headerValue);
    },

    generateResponseCheckSumAndCheckIntegrity: function(integrityProperties, ajaxobj, response) {
        var responseChecksum = '', headers = {}, createCheckSumOnResp = null,
            integrityHeaderName = integrityProperties.headerName,
            passthroughHeaderName = integrityProperties.passthroughHeaderName,
            responseContentTypes = ["application/text", "application/json", "application/xml",
            "text/xml", "text/html", "application/rss+xml", "text/plain"];

        var _getResponseHeader = function(headerName) {
            var headerVal = '';
            if(headerName
            && (headers.hasOwnProperty(headerName) || headers.hasOwnProperty(headerName.toLowerCase()))) {
                headerVal = ajaxobj.getResponseHeader(headerName);
            }
            return headerVal;
        };

        if(integrityProperties.validateResp) {
            headers = ajaxobj.getAllResponseHeaders();
            if(_getResponseHeader(passthroughHeaderName).trim().toLowerCase() == 'true') {
                createCheckSumOnResp = ajaxobj.randomString;
            } else if(responseContentTypes.indexOf(_getResponseHeader('Content-Type').split(';')[0]) == -1) {
                createCheckSumOnResp = ajaxobj.randomString;
            }
            responseChecksum = $KI.net.generateResponseCheckSum(integrityProperties.algo, integrityProperties.salt, response, ajaxobj.randomString, createCheckSumOnResp);
            $KI.net.setIntegrityStatus(responseChecksum, _getResponseHeader(integrityHeaderName), ajaxobj);
        }
    },

    isIntegrityCheckRequired: function(url, userDisabledIntegrityCheck) {
        var returnCheckRequired = false, properties = $KI.net.integrityProperties,
            currHost = null, hyperLink = null;

        if(properties && !userDisabledIntegrityCheck) {
            if(properties.hostNamesList) {
                if(typeof document !== 'undefined') {
                    hyperLink = document.createElement('a');
                    hyperLink.href = url;
                    currHost = hyperLink.host;
                } else {
                    currHost = url.replace('http://', '').replace('https://', '').replace('wwww.','').split('/')[0];
                }
                currHost = currHost.toLowerCase();
                returnCheckRequired = $KI.net.isIntegrityCheckRequiredForThisHost(properties.hostNamesList, currHost);
            } else {
                returnCheckRequired = true;
            }
        }

        return returnCheckRequired;
    },

    isIntegrityCheckRequiredForThisHost: function(hostNamesList, currHost) {
        var i = 0, host = '', hostsLen = 0, returnCheckRequired = false;

        hostsLen = hostNamesList.length;
        if(hostsLen > 0) {
            for(i = 0; i < hostsLen; i++) {
                host = hostNamesList[i];
                if(host.startsWith('*.')) {
                    host = host.replace('*.', '').toLowerCase();
                    if(currHost.endsWith(host)) {
                        returnCheckRequired = true;
                        break;
                    }
                } else if(host == currHost) {
                    returnCheckRequired = true;
                    break;
                }
            }
        } else {
            returnCheckRequired = true;
        }

        return returnCheckRequired;
    },


    setIntegrityStatus: function(responseChecksum, checkSum, ajaxobj) {
        if(responseChecksum == checkSum) {
            voltmx.print("Integrity Successful");
            ajaxobj.integrityStatus = constants.HTTP_INTEGRITY_CHECK_SUCCESSFUL;
        } else {
            ajaxobj.integrityStatus = constants.HTTP_INTEGRITY_CHECK_FAILED;
        }
    },

    checkIntegrityPropertyType: function(propertyName, propertyValue, propertyType) {
        if(typeof propertyValue != propertyType) {
            throw new VoltmxError("100", "Error", "Invalid argument :- " + propertyName);
        }
        return true;
    },

    validateHostNamesList: function(properties) {
        var i = 0, j = 0, domain = null, domainArr = null, domainLen = 0,
            regex = /^[A-Za-z0-9\\\-]+$/;

        if(typeof properties.hostNamesList !== 'undefined' && properties.hostNamesList !== 'null') {
            if(!$KU.isArray(properties.hostNamesList)) {
                throw new VoltmxError('100', 'Error', 'Invalid argument :- hostNamesList');
            }
            for (i = properties.hostNamesList.length - 1; i >= 0; i--) {
                domain = properties.hostNamesList[i];
                if(typeof domain === 'undefined' || domain === null || domain.trim() === '') {
                    throw new VoltmxError('100', 'Error', 'Invalid argument :- hostNamesList');
                }
                if(domain.startsWith('*.')){
                    domain = domain.replace('*.', '');
                }
                domainArr = domain.split('.');
                domainLen = domainArr.length;
                if(domainLen <= 1) {
                     throw new VoltmxError('100', 'Error', 'Invalid argument :- hostNamesList');
                }
                for (j = domainLen - 1; j >= 0; j--) {
                    if(!regex.test(domainArr[j])) {
                        throw new VoltmxError('100', 'Error', 'Invalid argument :- hostNamesList');
                    }
                }
            }
        }
    },

    validateIntegrityParams: function(properties) {
        var algoList;

        if(Object.keys(properties).length > 0) {
            if(($KI.net.checkIntegrityPropertyType('validateResp', properties.validateResp, 'boolean'))
            &&($KI.net.checkIntegrityPropertyType('algo', properties.algo, 'string'))
            &&($KI.net.checkIntegrityPropertyType('salt', properties.salt, 'string'))
            &&($KI.net.checkIntegrityPropertyType('headerName', properties.headerName, 'string'))) {
                
                algoList = ($KG.appbehaviors.strictMode)?['sha256', 'sha512']:['md5', 'sha1', 'sha256', 'sha512'];
                if((algoList.indexOf(properties.algo.toLowerCase())) == -1) {
                    throw new VoltmxError("100", "Error", "Invalid argument" + properties.algo);
                }

                if(properties.salt.length > 1024) {
                    properties.salt = properties.salt.substring(0, 1024);
                }

                if(properties.headerName.length > 64) {
                    properties.headerName = properties.headerName.substring(0, 64);
                }

                if(properties.passthroughHeaderName) {
                    $KI.net.checkIntegrityPropertyType('passthroughHeaderName', properties.passthroughHeaderName, 'string');
                    if(properties.passthroughHeaderName.length > 64) {
                        properties.passthroughHeaderName = properties.passthroughHeaderName.substring(0, 64);
                    }
                }

                $KI.net.validateHostNamesList(properties);
            }

        } else {
            throw new VoltmxError("101", "Error", "Invalid number of arguments");
        }
        return true;
    },

    generateRequestCheckSum: function(algo, salt, requestBody, ajaxobj, passThroughOrFileMultipart) {
      var requestCheckSum, toHash,
          requestBodyHash = 'EMPTY_BODY';

      if(passThroughOrFileMultipart !== null) {
          requestBodyHash = passThroughOrFileMultipart;
      } else if(requestBody) {
          requestBodyHash = $KI.crypto.createHashToUpperCase(algo, requestBody);
      }

      toHash = "Request:" + salt + ":" + ajaxobj.randomString + ":" + requestBodyHash;
      requestCheckSum = $KI.crypto.createHashToUpperCase(algo, toHash);
      return requestCheckSum;
    },

    generateResponseCheckSum: function(algo, salt, responseBody, randomString, passThroughOrFileMultipart) {
      var responseBodyHash, responseCheckSum, toHash,
          responseBodyHash = 'EMPTY_BODY';

        if(passThroughOrFileMultipart !== null) {
            responseBodyHash = passThroughOrFileMultipart;
        } else if(responseBody) {
            responseBodyHash = $KI.crypto.createHashToUpperCase(algo, responseBody);
        }
      toHash = "Response:" + salt + ":" + randomString + ":" + responseBodyHash;
      responseCheckSum = $KI.crypto.createHashToUpperCase(algo, toHash);
      return responseCheckSum;
    },

    setIntegrityCheck: function(properties) {
        var checkIntegrityParams = $KI.net.validateIntegrityParams(properties);
        $KU.logExecuting('voltmx.net.setIntegrityCheck');
        if(checkIntegrityParams) {
            $KU.logExecutingWithParams('voltmx.net.setIntegrityCheck', properties);
            $KI.net.integrityProperties = properties;
        }
        $KU.logExecutingFinished('voltmx.net.setIntegrityCheck');
    },

    removeIntegrityCheck: function() {
        $KU.logExecuting('voltmx.net.removeIntegrityCheck');
        $KU.logExecutingWithParams('voltmx.net.removeIntegrityCheck');
        $KI.net.integrityProperties = null;
        $KU.logExecutingFinished('voltmx.net.removeIntegrityCheck');
    },

    sethttpheaders: function(ajaxobj, headers) {

        var headerdata = [],
            value, index = 0;

        for(var i in headers) {
            if(headers.hasOwnProperty(i) && headers[i]) {
                value = headers[i] ? headers[i] : "";
                headerdata.push(i);
                voltmx.print("sethttpheaders: key: " + i + "value: " + value);
                ajaxobj.setRequestHeader(i, value);
            }
        }
        return headerdata;
    },

    loadJSFile: function(fileurl, async, callback) {
        var status = 0;
        var timeout = 30000;
        var options = {
            type: "GET",
            url: fileurl,
            timeout: timeout,
            paramstr: null,
            callback: callback,
            info: ""
        };
        voltmx.print("loadJSFile: options: " + options);

        return(function ajax() {

            function invokecallback(callback) {
                if(callback) callback();
            };

            var requestDone = false; 
            var ajaxobj = new XMLHttpRequest(); 
            ajaxobj.open(options.type, options.url, async);
            ajaxobj.onLoaded = function() {
                if(this.userCancelled) {
                    voltmx.print(" onLoaded: on Abort Mission");
                    this.onAbort();
                }
            };

            ajaxobj.onInteractive = function() {
                if(this.userCancelled) {
                    voltmx.print(" onInteractive: on Abort Mission");
                    this.onAbort();
                } else
                if(!this.firstByte) {
                    this.firstByte = true;
                }
            };

            
            ajaxobj.onAbort = function(transport) {

                
                voltmx.print(" onInteractive: <- Abort Mission");
                if(this.userCancelled) {

                    this.userCancelled = false;
                    this.ignoreCallback = true;
                    rettable = {
                        "opstatus": 1,
                        "errcode": 1022,
                        "errmsg": "Request cancelled by user"
                    };
                    voltmx.print(" onInteractive: Abort Mission Success");
                }
                voltmx.print(" onInteractive: -> Abort Mission");
            };

            ajaxobj.onTimeout = function() {

                requestDone = true;
                rettable = {
                    "opstatus": 1,
                    "errcode": 1014,
                    "errmsg": "Request timed out"
                };
                voltmx.print("Request timed out.");
            };

            ajaxobj.onreadystatechange = function() {
                
                switch(!this.ignoreCallback && ajaxobj.readyState) {

                    case 1:
                        voltmx.print("onreadystatechange: ReadyState 1");
                        ajaxobj.onLoaded(ajaxobj);
                        break;

                    case 2:
                        voltmx.print("onreadystatechange: ReadyState 2");
                        ajaxobj.onInteractive(ajaxobj);
                        break;

                    case 3:
                        voltmx.print("onreadystatechange: ReadyState 3");
                        ajaxobj.onAbort(ajaxobj);
                        break;

                    case 4:
                        voltmx.print("onreadystatechange: ReadyState 4");
                        if(!requestDone) {
                            ajaxobj.onComplete(ajaxobj);
                            
                            ajaxobj = null;
                        }
                        break;

                    default:
                        voltmx.print("onreadystatechange: ReadyState Invalid: " + ajaxobj.readyState);
                }
            };

            ajaxobj.addResponseText = function(transport) {
                
                rettable = transport.responseText;
                
                if(typeof document != "undefined") {
                    var script = document.createElement('script');
                    script.type = "text/javascript";
                    script.text = transport.responseText;
                    document.getElementsByTagName('head')[0].appendChild(script);
                    if(options.callback) options.callback();
                    document.getElementsByTagName('head')[0].removeChild(script);
                }
            };

            ajaxobj.onComplete = function(transport) {

                
                window.clearTimeout(transport.timeoutid);
                voltmx.print("status: " + transport.status + "readystate: " + transport.readyState);

                this.firstByte = false;

                if(this.userCancelled) {
                    voltmx.print(" onComplete: on Abort Mission");
                    this.onAbort();
                    return;
                }

                if(transport.status == 200) {
                    if(transport.responseText && transport.responseText.length > 0) {
                        if(options.callback) {
                            options.callback(transport.responseText);
                        }
                    }
                    
                    else {
                        voltmx.print("errcode: 1013, No JS Code");
                        rettable = {
                            "opstatus": "1",
                            "errcode": "1013",
                            "errmsg": "Request returned no JS code"
                        };
                    }
                } else {
                    
                    if(transport.status == 0 || (/5+/.test(transport.status.toString()) == true)) {
                        
                        if(transport.responseText && transport.responseText.length > 0) {
                            if(options.callback) {
                                options.callback(transport.responseText);
                            }
                            return;
                        }
                        voltmx.print("errcode: 1012, Request Failed");
                        rettable = {
                            "opstatus": 1,
                            "errcode": "1012",
                            "errmsg": "Request Failed"
                        };
                    } else {
                        
                        if(/4+/.test(transport.status.toString()) == true) {
                            voltmx.print("errcode: 1012, Request Failed");
                            rettable = {
                                "opstatus": 1,
                                "errcode": "1015",
                                "errmsg": "Request Failed"
                            };
                        } else {
                            if(transport.responseText != "") {
                                voltmx.print("Status != 200 but response exists");
                                rettable = transport.responseText;
                            } else
                                voltmx.print("Empty response received.");
                        }
                    }
                }
            };

            
            ajaxobj.timeoutid = setTimeout(ajaxobj.onTimeout, options.timeout);
            ajaxobj.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            
            if(typeof(headerobj) == "object")
                options.httpheaders = $KI.net.sethttpheaders(ajaxobj, headerobj);

            
            ajaxobj.send(options.paramstr);

            return ajaxobj;
        })();
    },

    invokeserviceasync: function(posturl, postdata, Callback, info, method, timeout) {
        var status = 0;
        var rettable = null;
        var usertimeout = timeout || 60000; 
        var origin = window.location.protocol + "//" + window.location.host;
        var proxyurl = "";
        var postorigin = "";
        var appmode = $KG["appmode"];
        var middlewarecontext = $KI.props.getProperty(null, 'appmiddlewarecontext') || ((typeof appConfig != "undefined") && appConfig && appConfig.middlewareContext) || ((typeof config != "undefined") && config && config.middlewarecontext) || "middleware";

        voltmx.print("invokeServiceAsync<- " + posturl);
        voltmx.print("middlewarecontext<- " + middlewarecontext);
        if(appmode == constants.APPLICATION_MODE_NATIVE) {

            var i = posturl.indexOf(middlewarecontext);
            if(i != -1) {
                postorigin = posturl.slice(0, i);
            }
            
            if($KG["skipproxy"] || ($KI.net.checkOriginandPostOrigin(origin, postorigin) && posturl)) {
                proxyurl = origin + "/" + middlewarecontext + "/MWServlet"; 
            } else {
                proxyurl = origin + "/" + $KG["appid"] + "/spa";
                voltmx.print("using proxy: URL " + proxyurl);

                if(postdata) {
                    postdata["_desturl"] = posturl;
                } else {
                    postdata = {};
                    postdata["_desturl"] = posturl;
                    voltmx.print("Without postdata " + posturl);
                }
            }
            postdata["rcid"] = $KG["rcid"] || "";
        }

        var headerobj = postdata && postdata["httpheaders"];
        var postdatastr = (postdata && $KI.net.postdataparams(postdata)) || "";

        voltmx.print("invokeServiceAsync: URL: " + posturl);
        voltmx.print("invokeServiceAsync: Args are: " + postdatastr);
        voltmx.print("middleware origin: " + postorigin);
        voltmx.print("location origin: " + origin);

        
        if(posturl && posturl.indexOf("/IST") != -1 || posturl.indexOf("/CMS") != -1) {
            proxyurl = posturl;
        } else if(posturl) {
            if(typeof document != "undefined") {
                var anchor = document.createElement('a');
                anchor.href = posturl;
                
                var posturlorigin = anchor.protocol + "//" + anchor.host;
                if($KI.net.checkOriginandPostOrigin(posturlorigin, origin)) {
                    proxyurl = posturl;
                }
            }
        }

        if(appmode == constants.APPLICATION_MODE_HYBRID || appmode == constants.APPLICATION_MODE_WRAPPER) {
            proxyurl = posturl;
            voltmx.print("!!!!!!!!!!appmode hybrid/wrapper: " + proxyurl);
        }

        var httpconfig = postdata && postdata["httpconfig"];
        if(httpconfig && httpconfig.timeout && !isNaN(httpconfig.timeout))
            usertimeout = parseInt(httpconfig.timeout) * 1000;

        var options = {
            type: "POST",
            url: proxyurl,
            timeout: usertimeout,
            paramstr: postdatastr,
            callback: Callback,
            info: info || null
        };

        if(method && typeof method != "undefined" && "GET".toLowerCase() === method.toLowerCase()) {
            options.type = "GET";
            options.url = options.url + "?" + postdatastr;
        }

        voltmx.print("invokeServiceAsync: options: " + options);
        voltmx.system.activity.increment();

        return(function ajax() {

            
            if(spaAPM !== null) {
                var timeTaken = new Date().getTime();
                var urlOrID = null;
                if(postdata["serviceID"])
                    urlOrID = postdata["serviceID"];
                else
                    urlOrID = options.url;
                spaAPM.sendMsg(urlOrID, 'servicerequest');
            }

            function invokecallback(callback, status, rettable, info) {
                
                voltmx.system.activity.decrement();
                if(!voltmx.system.activity.hasActivity()) {
                    if(typeof $KW !== "undefined") {
                        $KW.unLoadWidget();
                    }
                }
                
                if(callback) {
                    callback(status, rettable, info);
                    $KU.onEventHandler();
                }

                
                if(spaAPM !== null) {
                    if(timeTaken)
                        var ts = new Date().getTime() - timeTaken;
                    else
                        var ts = null;
                    spaAPM.sendMsg(urlOrID, 'serviceresponse', {
                        "opstatus": (rettable && rettable.opstatus) ? rettable.opstatus : null,
                        "httpcode": status ? status : null,
                        "resptime": ts
                    });
                }
            };

            var requestDone = false; 
            var ajaxobj = new XMLHttpRequest(); 
            ajaxobj.open(options.type, options.url, true);
            ajaxobj.onLoaded = function() {
                if(this.userCancelled) {
                    voltmx.print(" onLoaded: on Abort Mission");
                    this.onAbort();
                } else
                    invokecallback(options.callback, 100, null);
            };

            ajaxobj.onInteractive = function() {
                if(this.userCancelled) {
                    voltmx.print(" onInteractive: on Abort Mission");
                    this.onAbort();
                } else
                if(!this.firstByte) {
                    this.firstByte = true;
                    invokecallback(options.callback, 200, null);
                }
            };

            
            ajaxobj.onAbort = function(transport) {

                
                voltmx.print(" onInteractive: <- Abort Mission");
                if(this.userCancelled) {

                    this.userCancelled = false;
                    this.ignoreCallback = true;
                    rettable = {
                        "opstatus": 1,
                        "errcode": 1022,
                        "errmsg": "Request cancelled by user"
                    };
                    invokecallback(options.callback, 300, rettable);
                    voltmx.print(" onInteractive: Abort Mission Success");
                }
                voltmx.print(" onInteractive: -> Abort Mission");
            };

            ajaxobj.onTimeout = function() {
                if(ajaxobj.userCancelled) {
                    ajaxobj.onAbort();
                } else {
                    requestDone = true;
                    rettable = {
                        "opstatus": 1,
                        "errcode": 1014,
                        "errmsg": "Request timed out"
                    };
                    invokecallback(options.callback, 400, rettable);
                }
            };

            ajaxobj.onreadystatechange = function() {
                
                switch(!this.ignoreCallback && ajaxobj.readyState) {

                    case 1:
                        voltmx.print("onreadystatechange: ReadyState 1");
                        ajaxobj.onLoaded(ajaxobj);
                        break;

                    case 2:
                        voltmx.print("onreadystatechange: ReadyState 2");
                        ajaxobj.onInteractive(ajaxobj);
                        break;

                    case 3:
                        voltmx.print("onreadystatechange: ReadyState 3");
                        ajaxobj.onAbort(ajaxobj);
                        break;

                    case 4:
                        voltmx.print("onreadystatechange: ReadyState 4");
                        if(!requestDone) {
                            ajaxobj.onComplete(ajaxobj);
                            
                            ajaxobj = null; 
                        }
                        break;

                    default:
                        voltmx.print("onreadystatechange: ReadyState Invalid: " + ajaxobj.readyState);
                }
            };

            ajaxobj.onComplete = function(transport) {

                
                window.clearTimeout(transport.timeoutid);
                voltmx.print("status: " + transport.status + "readystate: " + transport.readyState + "res: " + transport.response);

                this.firstByte = false;

                if(this.userCancelled) {
                    voltmx.print(" onComplete: on Abort Mission");
                    this.onAbort();
                    return;
                }

                if(transport.status == 200) {
                    if(transport.responseText && transport.responseText.length > 0) {
                        
                        rettable = transport.responseText;
                        try {
                            if(IndexJL == 1)
                                rettable = $KU.convertjsontoluaobject(rettable);
                            else
                                rettable = JSON.parse(rettable);
                        } catch(error) {
                            voltmx.print("errcode: 1013, Invalid JSON string - Unable to parse the returned JSON from server");
                            
                            rettable = {
                                "opstatus": "1",
                                "errcode": "1013",
                                "errmsg": "Middleware returned invalid JSON string",
                                "response": rettable
                            };
                        }
                        

                    }
                    
                    else {
                        voltmx.print("errcode: 1013, Invalid JSON string");
                        rettable = {
                            "opstatus": "1",
                            "errcode": "1013",
                            "errmsg": "Middleware returned invalid JSON string"
                        };
                    }
                } else {
                    
                    
                    if(transport.status == 0 || transport.status == 12200 || (/5+/.test(transport.status.toString()) == true)) {
                        if(typeof navigator.onLine !== "undefined" && !navigator.onLine) {
                            voltmx.print("errcode: 1011, Device has no WIFI or mobile connectivity. Please try the operation after establishing connectivity.");
                            rettable = {
                                "opstatus": 1,
                                "errcode": "1011",
                                "errmsg": "Device has no WIFI or mobile connectivity. Please try the operation after establishing connectivity."
                            };
                        } else {
                            voltmx.print("errcode: 1012, Request Failed");
                            rettable = {
                                "opstatus": 1,
                                "errcode": "1012",
                                "errmsg": "Request Failed"
                            };
                        }
                    } else {
                        
                        if(/4+/.test(transport.status.toString()) == true) {
                            voltmx.print("errcode: 1015, Cannot find host");
                            rettable = {
                                "opstatus": 1,
                                "errcode": "1015",
                                "errmsg": "Cannot find host"
                            };
                        } else {
                            if(transport.responseText != "") {
                                voltmx.print("Status != 200 but response exists");
                                rettable = transport.responseText;
                            } else
                                voltmx.print("Empty response received.");
                        }
                    }
                }
                invokecallback(options.callback, 400, rettable, options.info);
            };

            
            ajaxobj.timeoutid = setTimeout(ajaxobj.onTimeout, options.timeout);
            
            if(typeof(headerobj) == "object") {
                if(options.url.indexOf("/spa") > 0) {
                    ajaxobj.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                    var contentType = headerobj["Content-Type"];
                    if(typeof contentType != "undefined")
                        delete headerobj["Content-Type"];
                } else {
                    if(typeof headerobj["Content-Type"] == "undefined") {
                        headerobj["Content-Type"] = "application/x-www-form-urlencoded";
                    }
                }
                options.httpheaders = $KI.net.sethttpheaders(ajaxobj, headerobj);
                if(options.httpheaders.length > 0 && options.url.indexOf("/spa") > 0) {
                    if(typeof contentType != "undefined") {
                        options.httpheaders["Content-Type"] = contentType;
                    }
                    options.paramstr = options.paramstr + "kCustomHeaders=" + options.httpheaders;
                }
            }


            if("POST".toLowerCase() === (options.type).toLowerCase()) {
                
                ajaxobj.send(options.paramstr);
            } else {
                ajaxobj.send();
            }

            return ajaxobj;
        })();
        voltmx.print("invokeServiceAsync-> ");
    },
    
    invokeService: function(posturl, postdata, Callback, info, timeout) {
        var status = 0;
        var rettable = null;
        var usertimeout = timeout || 60000; 
        var origin = window.location.protocol + "//" + window.location.host;
        var proxyurl = "";
        var postorigin = "";
        var appmode = $KG["appmode"];
        var middlewarecontext = $KI.props.getProperty(null, 'appmiddlewarecontext') || ((typeof appConfig != "undefined") && appConfig && appConfig.middlewareContext) || ((typeof config != "undefined") && config && config.middlewarecontext) || "middleware";

        voltmx.print("invokeServiceAsync<- ");
        if(appmode == constants.APPLICATION_MODE_NATIVE) {

            var i = posturl.indexOf(middlewarecontext);
            if(i != -1) {
                postorigin = posturl.slice(0, i);
            }
            
            if($KG["skipproxy"] || ($KI.net.checkOriginandPostOrigin(origin, postorigin) && posturl)) {
                proxyurl = origin + "/" + middlewarecontext + "/MWServlet"; 
            } else {
                proxyurl = origin + "/" + $KG["appid"] + "/spa";
                voltmx.print("using proxy: URL " + proxyurl);

                if(postdata) {
                    postdata["_desturl"] = posturl;
                } else {
                    postdata = {};
                    postdata["_desturl"] = posturl;
                    voltmx.print("Without postdata " + posturl);
                }
            }
            postdata["rcid"] = $KG["rcid"] || "";
        }

        var headerobj = postdata && postdata["httpheaders"];
        var postdatastr = (postdata && $KI.net.postdataparams(postdata)) || "";

        
        if(posturl.indexOf("/IST") != -1 || posturl.indexOf("/CMS") != -1) {
            proxyurl = posturl;
        }

        voltmx.print("invokeServiceAsync: URL: " + posturl);
        voltmx.print("invokeServiceAsync: Args are: " + postdatastr);
        voltmx.print("middleware origin: " + postorigin);
        voltmx.print("location origin: " + origin);

        if(appmode == constants.APPLICATION_MODE_HYBRID || appmode == constants.APPLICATION_MODE_WRAPPER) {
            proxyurl = posturl;
            voltmx.print("!!!!!!!!!!appmode hybrid/wrapper: " + proxyurl);
        }

        var options = {
            type: "POST",
            url: proxyurl,
            timeout: usertimeout,
            paramstr: postdatastr,
            callback: Callback,
            info: info || null
        };

        voltmx.system.activity.increment();


        var requestDone = false; 
        var ajaxobj = new XMLHttpRequest(); 
        ajaxobj.open(options.type, options.url, false);

        if(typeof(headerobj) == "object") {
            if(options.url.indexOf("/spa") > 0) {
                ajaxobj.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                var contentType = headerobj["Content-Type"];
                if(typeof contentType != "undefined")
                    delete headerobj["Content-Type"];
            } else {
                if(typeof headerobj["Content-Type"] == "undefined") {
                    headerobj["Content-Type"] = "application/x-www-form-urlencoded";
                }
            }
            options.httpheaders = $KI.net.sethttpheaders(ajaxobj, headerobj);
            if(options.httpheaders.length > 0 && options.url.indexOf("/spa") > 0) {
                if(typeof contentType != "undefined") {
                    options.httpheaders["Content-Type"] = contentType;
                }
                options.paramstr = options.paramstr + "kCustomHeaders=" + options.httpheaders;
            }
        }

        
        if(spaAPM !== null) {
            var timeTaken = new Date().getTime();
            var urlOrID = null;
            if(postdata["serviceID"])
                urlOrID = postdata["serviceID"];
            else
                urlOrID = options.url;
            spaAPM.sendMsg(urlOrID, 'servicerequest');
        }

        
        ajaxobj.send(options.paramstr);

        voltmx.print("status: " + ajaxobj.status + "readystate: " + ajaxobj.readyState + "res: " + ajaxobj.response);

        if(ajaxobj.status == 200) {
            if(ajaxobj.responseText && ajaxobj.responseText.length > 0) {
                voltmx.print(" onComplete: JSON obj: " + ajaxobj.responseText);
                rettable = ajaxobj.responseText;
                try {
                    if(IndexJL == 1)
                        rettable = $KU.convertjsontoluaobject(rettable);
                    else
                        rettable = JSON.parse(rettable);

                    voltmx.print(" onComplete: Lua obj: " + JSON.stringify(rettable));
                } catch(error) {
                    voltmx.print("errcode: 1013, Invalid JSON string - Unable to parse the returned JSON from server");
                    
                    rettable = {
                        "opstatus": "1",
                        "errcode": "1013",
                        "errmsg": "Middleware returned invalid JSON string",
                        "response": rettable
                    };
                }
            }
            
            else {
                voltmx.print("errcode: 1013, Invalid JSON string");
                rettable = {
                    "opstatus": "1",
                    "errcode": "1013",
                    "errmsg": "Middleware returned invalid JSON string"
                };
            }
        } else {
            
            if(ajaxobj.status == 0 || (/5+/.test(ajaxobj.status.toString()) == true)) {
                if(typeof navigator.onLine !== "undefined" && !navigator.onLine) {
                    voltmx.print("errcode: 1011, Device has no WIFI or mobile connectivity. Please try the operation after establishing connectivity.");
                    rettable = {
                        "opstatus": 1,
                        "errcode": "1011",
                        "errmsg": "Device has no WIFI or mobile connectivity. Please try the operation after establishing connectivity."
                    };
                } else {
                    voltmx.print("errcode: 1012, Request Failed");
                    rettable = {
                        "opstatus": 1,
                        "errcode": "1012",
                        "errmsg": "Request Failed"
                    };
                }
            } else {
                
                if(/4+/.test(ajaxobj.status.toString()) == true) {
                    voltmx.print("errcode: 1015, Cannot find host");
                    rettable = {
                        "opstatus": 1,
                        "errcode": "1015",
                        "errmsg": "Cannot find host"
                    };
                } else {
                    if(ajaxobj.responseText != "") {
                        voltmx.print("Status != 200 but response exists");
                        rettable = ajaxobj.responseText;
                    } else
                        voltmx.print("Empty response received.");
                }
            }
        }

        if(typeof $KW !== "undefined") {
            $KW.unLoadWidget();
        }
        
        if(spaAPM !== null) {
            if(timeTaken)
                var ts = new Date().getTime() - timeTaken;
            else
                var ts = null;
            spaAPM.sendMsg(urlOrID, 'serviceresponse', {
                "opstatus": (rettable && rettable.opstatus) ? rettable.opstatus : null,
                "httpcode": status ? status : null,
                "resptime": ts
            });
        }

        return rettable;
    },

    cancel: function(nwhndl) {
        $KU.logExecuting('voltmx.net.cancel');
        voltmx.print("networkcancel<- ");
        
        if(nwhndl) {
            
            $KU.logExecutingWithParams('voltmx.net.cancel', nwhndl);
            nwhndl.userCancelled = true;
            nwhndl.abort();
            $KU.logWarnMessage('Request aborted on user request');
            voltmx.print("Request aborted on user request");
        }
        voltmx.print("networkcancel-> ");
        $KU.logExecutingFinished('voltmx.net.cancel');
    },

    checkOriginandPostOrigin: function(origin, postorigin) {
        return origin.replace(/([^=]*):(80|443){1}(.*)/, '$1$3') == postorigin.replace(/([^=]*):(80|443){1}(.*)/, '$1$3') ? true : false;
    },

    
    isNetworkAvailable: function(connectionType) {
        $KU.logExecuting('voltmx.net.isNetworkAvailable');
        if(!!connectionType) {
            $KU.logExecutingWithParams('voltmx.net.isNetworkAvailable', connectionType);
            if(connectionType === constants.NETWORK_TYPE_ANY) {
                if(typeof navigator.onLine !== "undefined") {
                    $KU.logExecutingFinished('voltmx.net.isNetworkAvailable');
                    return navigator.onLine;
                } else {
                    $KU.logWarnMessage('navigator.online is undefined');
                    return false;
                }
            } else if(connectionType === constants.NETWORK_TYPE_3G ||connectionType === constants.NETWORK_TYPE_WIFI || connectionType === constants.NETWORK_TYPE_ETHERNET) {
                $KU.logWarnMessage('Invalid connectionType');
                return false;
            } else {
                $KU.logErrorMessage('Invalid Network Type or connectionType');
                throw new Error("Invalid Network Type");
            }
        } else {
            $KU.logErrorMessage('Invalid arguments');
            throw new Error("Invalid Network Type");
        }
    },

    setNetworkCallbacks: function(config) {
        $KU.logExecuting('voltmx.net.setNetworkCallbacks');
        if(config && config.statusChange) {
            $KU.logExecutingWithParams('voltmx.net.setNetworkCallbacks', config);
            if(typeof window.ononline === "object") {
                window.addEventListener("online", function() {
                    config.statusChange(navigator.onLine)
                }, false);
            }
            if(typeof window.onoffline === "object") {
                window.addEventListener("offline", function() {
                    config.statusChange(navigator.onLine)
                }, false);
            }
            $KU.logExecutingFinished('voltmx.net.setNetworkCallbacks');
        } else {
            $KU.logErrorMessage('Invalid argument or argument is not of valid type');
            throw new Error("Invalid Input : config is not of valid type");
        }
    },

    getActiveNetworkType: function() {
        $KU.logExecuting('voltmx.net.getActiveNetworkType');
        $KU.logExecutingWithParams('voltmx.net.getActiveNetworkType');
        $KU.logExecutingFinished('voltmx.net.getActiveNetworkType');
        if(typeof navigator.onLine === "undefined") {
            return constants.NETWORK_TYPE_ANY;
        } else {
            if(navigator.onLine) {
                return constants.NETWORK_TYPE_ANY;
            } else {
                $KU.logWarnMessage('problem with network status');
                return null;
            }
        }
    },

    
    getCookies: function(url) {
        $KU.logExecuting('voltmx.net.getCookies');
        if(url) {
            $KU.logExecutingWithParams('voltmx.net.getCookies', url);
            if(window && url.indexOf(window.location.origin) != -1) {
                var allCookies = document && document.cookie;
                if(allCookies && allCookies.length > 0) {
                    $KU.logExecutingFinished('voltmx.net.getCookies');
                    return allCookies.split(";");
                }
            }
        }
        $KU.logWarnMessage('Invalid argument');
        return null;
    },

    clearCookies: function(url, cookies) {
        $KU.logExecuting('voltmx.net.clearCookies');
        var allCookies = document && document.cookie.split(";");
        url = url || document.URL;
        if(window && url.indexOf(window.location.origin) != -1) {
            cookies = cookies || allCookies;
            if(cookies) {
                $KU.logExecutingWithParams('voltmx.net.clearCookies', url, cookies);
                var pathBits = window.location.pathname.split("/");
                for(var i = 0; i < cookies.length; i++) {
                    var pathCurrent = "/";
                    var cookieName = cookies[i].trim();
                    if(document.cookie.indexOf(cookieName) != -1)
                        for(var j = 0; j < pathBits.length; j++) {
                            pathCurrent += ((pathCurrent.substr(-1) != '/') ? '/' : '') + pathBits[j];
                            if(cookieName.indexOf('=') != -1) {
                                document.cookie = cookieName + '; expires=Thu, 01-Jan-1970 00:00:01 GMT;path=' + pathCurrent + ';';
                            } else
                                document.cookie = cookieName + '=; expires=Thu, 01-Jan-1970 00:00:01 GMT;path=' + pathCurrent + ';';
                            if(document.cookie.indexOf(cookieName) == -1)
                                break;
                        }
                }
            }
            $KU.logExecutingFinished('voltmx.net.clearCookies');
        } else {
            $KU.logErrorMessage('Invalid input url');
            throw new VoltmxError(1005, "invalid input url", "invalid input url");
        }
    },

    loadClientCertificate: function() {
        $KU.logWarnMessage('The loadClientCertificate API is not supported.');
    },

    removeClientCertificate: function() {
        $KU.logWarnMessage('The removeClientCertificate API is not supported.');
    },

    removeAllCachedResponses: function() {
        $KU.logWarnMessage('The removeAllCachedResponses API is not supported.');
    },

    urlDecode: function() {
        $KU.logWarnMessage('The urlDecode API is not supported.');
    },

    urlEncode: function() {
        $KU.logWarnMessage('The urlEncode API is not supported.');
    }
};


$KI.props = {
    getProperty: function(group, key) {
        $KU.logExecuting('voltmx.props.getProperty');
        $KU.logExecutingWithParams('voltmx.props.getProperty', group, key);
        if(typeof _voltmxAppProperties != "undefined" && _voltmxAppProperties != null && key) {
            $KU.logExecutingFinished('voltmx.props.getProperty');
            return _voltmxAppProperties[key] || null;
        }
    }
};

$KI.timer = (function() {
    
    

    var module = {
        timerinfo: {},

        callbackclosure: function(id) {
            var tid = id;
            return function() {
                var repeat, _timerInfo, cb = module.timerinfo[tid]["cb"];
                typeof cb == "function" && cb();
                _timerInfo = module.timerinfo[tid];
                if(_timerInfo) {
                    repeat = _timerInfo["repeat"];
                    !repeat && module.cancel(tid);
                }
            };
        },

        schedule: function(id, cb, interval, repeat) {
            $KU.logExecuting('voltmx.timer.schedule');
            $KU.logExecutingWithParams('voltmx.timer.schedule', id, cb, interval, repeat);
            var tinfo = module.timerinfo;

            if(id && !tinfo[id]) {
                tinfo[id] = {};
                tinfo[id]["cb"] = cb;
                tinfo[id]["repeat"] = repeat;

                var tcb = module.callbackclosure(id);
                var frequency = interval * 1000; 
                var func = (repeat === true) ? "setInterval" : "setTimeout";

                timerid = window[func](tcb, frequency);
                tinfo[id]["timerid"] = timerid;
                $KU.logExecutingFinished('voltmx.timer.schedule');
            } else
                $KU.logErrorMessage('timerId is mandatory or duplicate timer id');
        },

        cancel: function(id) {
            $KU.logExecuting('voltmx.timer.cancel');
            $KU.logExecutingWithParams('voltmx.timer.cancel', id);
            var tinfo = module.timerinfo;
            if(tinfo[id]) {
                var timerid = tinfo[id].timerid;
                var func = (tinfo[id]["repeat"] === true) ? "clearInterval" : "clearTimeout";
                $KU.logExecutingFinished('voltmx.timer.cancel');
                window[func](timerid);
                tinfo[id] = null

            } else {
                $KU.logErrorMessage('timerId is mandatory');
                return null;
            }
        },

        setcallback: function(id, cb) {
            $KU.logExecuting('voltmx.timer.setCallBack');
            $KU.logExecutingWithParams('voltmx.timer.setCallBack', id, cb);
            var tinfo = module.timerinfo;
            if(tinfo[id]) {
                tinfo[id].cb = cb;
            }
            $KU.logExecutingFinished('voltmx.timer.setCallBack');
        }
    };


    return module;
}());

$KI.appevents = (function() {
    var idletimeout = {
        id: null,
        value: 0,
        cb: null,
        enabled: false,
        expired: false,
        lastInteraction: 0
    };

    return {
        timercb: function() {
            var currentform = $KW.Form.getCurrentForm();
            var cb = null;

            idletimeout.expired = true;
            idletimeout.enabled = false;

            if(currentform.enabledforidletimeout) {
                
                
                if(idletimeout.cb) {
                    cb = idletimeout.cb;
                    idletimeout.cb = null;
                    cb(currentform);
                }
            }
        },

        registerforidletimeout: function(time, cb) {
            $KU.logExecuting('voltmx.application.registerForIdleTimeout');
            $KU.logExecutingWithParams('voltmx.application.registerForIdleTimeout', time, cb);
            if(!idletimeout.enabled) {
                
                idletimeout.value = time * 60 * 1000;
                idletimeout.id = setTimeout($KI.appevents.timercb, idletimeout.value);
                idletimeout.lastInteraction = new Date().getTime();
                idletimeout.enabled = true;
                idletimeout.expired = false;
                idletimeout.cb = cb;
                $KG["__idletimeout"] = idletimeout;
                $KU.logExecutingFinished('voltmx.application.registerForIdleTimeout');
            }
        },

        unregisterforidletimeout: function() {
            $KU.logExecuting('voltmx.application.unregisterForIdleTimeout');
            $KU.logExecutingWithParams('voltmx.application.unregisterForIdleTimeout');
            clearTimeout(idletimeout.id);
            idletimeout.enabled = false;
            $KG["__idletimeout"] = "";
            $KU.logExecutingFinished('voltmx.application.unregisterForIdleTimeout');
        },

        resettimer: function() {
            
            var curTime = new Date().getTime();
            if((curTime - idletimeout.lastInteraction) >= idletimeout.value) {
                $KI.appevents.timercb();
                return;
            } else {
                clearTimeout(idletimeout.id);
                idletimeout.id = setTimeout($KI.appevents.timercb, idletimeout.value);
                idletimeout.lastInteraction = curTime;
            }
        }
    };
})();

$KI.db = {
    changeversion: function(db, oldver, newver, transcb, ecb, vcb) {
        $KU.logExecuting('voltmx.db.changeVersion');
        $KU.logExecutingWithParams('voltmx.db.changeVersion', db, oldver, newver, transcb, ecb, vcb);
        if(window.openDatabase) {
            if(db) {
                db.changeVersion(oldver, newver, transcb, ecb, vcb);
            }
        } else {
            $KU.logWarnMessage('Web Databases not supported');
            voltmx.print("Web Databases not supported");
        }
        $KU.logExecutingFinished('voltmx.db.changeVersion');
    },

    executesql: function(transid, sqlstmt, args, scb, ecb) {
        $KU.logExecuting('voltmx.db.executeSql');
        $KU.logExecutingWithParams('voltmx.db.executeSql', transid, sqlstmt, args, scb, ecb);
        if(window.openDatabase) {
            if(transid) {
                if(args && args[0] === null) {
                    args = args.slice(1);
                }
                transid.executeSql(sqlstmt, args, scb, ecb);
            }
        } else {
            $KU.logWarnMessage('Web Databases not supported');
            voltmx.print("Web Databases not supported");
        }
        $KU.logExecutingFinished('voltmx.db.executeSql');
    },

    opendatabase: function(name, version, dname, size, cb) {
        var db = this.db || null;
        cb = cb || voltmx_dummyForDBCallback;
        $KU.logExecuting('voltmx.db.openDatabase');
        $KU.logExecutingWithParams('voltmx.db.openDatabase', name, version, dname, size, cb);
        try {
            if(window.openDatabase) {
                if(!db) {
                    db = openDatabase(name, version, dname, size, cb);
                    this.db = db;
                }
            } else {
                $KU.logWarnMessage('Web Databases not supported');
                voltmx.print("Web Databases not supported");
            }
        } catch(e) {
            if(e == 2) {
                
                $KU.logErrorMessage('opendatabase:Invalid database version.');
                voltmx.print("opendatabase:Invalid database version.");
            } else {
                $KU.logErrorMessage('opendatabase:Unknown error ' + e + '.');
                voltmx.print("opendatabase:Unknown error " + e + ".");
            }
            $KU.logErrorMessage('Invalid database version or Unknown error');
            return null;
        }
        $KU.logExecutingFinished('voltmx.db.openDatabase');
        return db;
    },

    readtransaction: function(db, transcb, ecb, vcb) {
        $KU.logExecuting('voltmx.db.readTransaction');
        $KU.logExecutingWithParams('voltmx.db.readTransaction', db, transcb, ecb, vcb);
        if(window.openDatabase) {
            if(db) {
                db.readTransaction(transcb, ecb, vcb);
            }
        } else {
            $KU.logWarnMessage('Web Databases not supported');
            voltmx.print("Web Databases not supported");
        }
        $KU.logExecutingFinished('voltmx.db.readTransaction');
    },

    sqlresultsetrowitem: function(transid, sqlresultset, index) {
        $KU.logExecuting('voltmx.db.sqlResultsetRowItem');
        $KU.logExecutingWithParams('voltmx.db.sqlResultsetRowItem', transid, sqlresultset, index);
        if(window.openDatabase) {
            
            if(index < sqlresultset.rows.length) {
                $KU.logExecutingFinished('voltmx.db.sqlResultsetRowItem VIA if index < sqlresultset.rows.length');
                return sqlresultset.rows.item(index);
            } else {
                $KU.logErrorMessage('Index position exceeds row length');
                return null;
            }
        } else {
            $KU.logWarnMessage('Web Databases not supported');
            voltmx.print("Web Databases not supported");
        }
        $KU.logExecutingFinished('voltmx.db.sqlResultsetRowItem VIA end of the function');
    },

    transaction: function(db, transcb, ecb, vcb) {
        $KU.logExecuting('voltmx.db.transaction');

        if(window.openDatabase) {
            if(db) {
                $KU.logExecutingWithParams('voltmx.db.transaction', db, transcb, ecb, vcb);
                db.transaction(transcb, ecb, vcb);
            }
        } else {
            $KU.logWarnMessage('Web Databases not supported');
            voltmx.print("Web Databases not supported");
        }
        $KU.logExecutingFinished('voltmx.db.transaction');
    }
};

function voltmx_dummyForDBCallback() {}






$KI.crypto = (function() {
    
    var _generateRandomNumber = function(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    var _generateRandomString = function() {
        var randomLength = 0, randomString = '', i = 0,
            possibleString = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        randomLength = _generateRandomNumber(8, 16);
        for(i = 0; i < randomLength; i++) {
          randomString += possibleString.charAt(Math.floor(Math.random() * possibleString.length));
        }
        return randomString.toUpperCase();
    };

    var _createHashToUpperCase = function(algo, toHash) {
        var hashValueToUpperCase = $KI.crypto.createhash(algo, toHash);

        if(typeof hashValueToUpperCase == 'string') {
            hashValueToUpperCase = hashValueToUpperCase.toUpperCase();
        }
        return hashValueToUpperCase;
    };
    

    var module = {
        stringify: function(cipherParams) {
            
            var jsonObj = {
                ct: cipherParams.ciphertext.toString(CryptoJS.enc.Base64)
            };
            
            if(cipherParams.iv) {
                jsonObj.iv = cipherParams.iv.toString();
            }
            if(cipherParams.salt) {
                jsonObj.s = cipherParams.salt.toString();
            }
            
            return JSON.stringify(jsonObj);
        },

        parse: function(jsonStr) {
            
            var jsonObj = JSON.parse(jsonStr);
            
            var cipherParams = CryptoJS.lib.CipherParams.create({
                ciphertext: CryptoJS.enc.Base64.parse(jsonObj.ct)
            });
            
            if(jsonObj.iv) {
                cipherParams.iv = CryptoJS.enc.Hex.parse(jsonObj.iv)
            }
            if(jsonObj.s) {
                cipherParams.salt = CryptoJS.enc.Hex.parse(jsonObj.s)
            }
            return cipherParams;
        },

        
        createhash: function(algotype, inputmessage, options) {
            var msg;
            var statuscode;
            $KU.logExecuting('voltmx.crypto.createhash');
            if(typeof(inputmessage) != "string") {
                $KU.logErrorMessage('invalid input ' + inputmessage);
                return {
                    errcode: 100,
                    errmessage: "invalid input parameters"
                };
            }
            $KU.logExecutingWithParams('voltmx.crypto.createhash', algotype, inputmessage);
            try {
                if($KG.appbehaviors.strictMode){
                    switch(algotype.toLowerCase()) {
                        case "sha256":
                            msg = CryptoJS.SHA256(inputmessage);
                            break;
                        case "sha512":
                            msg = CryptoJS.SHA512(inputmessage);
                            break;
                        default:
                            $KU.logErrorMessage('unsupported algorithm');
                            msg = {
                                errcode: 101,
                                errmessage: "unsupported algorithm"
                            }
                            break;
                    }

                }else{
                    switch(algotype.toLowerCase()) {
                        case "md5":
                            msg = CryptoJS.MD5(inputmessage);
                            break;
                        case "sha256":
                            msg = CryptoJS.SHA256(inputmessage);
                            break;
                        case "sha1":
                            msg = CryptoJS.SHA1(inputmessage);
                            break;
                        case "sha512":
                            msg = CryptoJS.SHA512(inputmessage);
                            break;
                        default:
                            $KU.logErrorMessage('unsupported algorithm');
                            msg = {
                                errcode: 101,
                                errmessage: "unsupported algorithm"
                            }
                            break;
                    }
                }
                if (typeof msg != 'string') {
                    if (typeof options === 'object' && options.returnBase64String === 'true') {
                        msg = msg.toString(CryptoJS.enc.Base64);
                    } else {
                        msg = msg.toString(CryptoJS.enc.UTF8);
                    }
                }
                $KU.logExecutingFinished('voltmx.crypto.createhash');
                return msg;
            } catch(ex) {
                $KU.logErrorMessage('unknown error' + ex);
                return {
                    errcode: 102,
                    errmessage: "unknown  error"
                };
            }
        },

        encrypt: function(algo, generatedkey, inputstring, propertiesTable) {
            $KU.logExecuting('voltmx.crypto.encrypt');
            if(typeof(algo) != "string" && inputstring && generatedkey) {
                $KU.logErrorMessage('invalid input parameters');
                return {
                    errcode: 100,
                    errmessage: "invalid input parameters"
                };
            }
            $KU.logExecutingWithParams('voltmx.crypto.encrypt', algo, generatedkey, inputstring, propertiesTable);
            var mode = CryptoJS.mode.CBC;
            var padding = CryptoJS.pad.Pkcs7;
            try {
                if(propertiesTable) {
                    if(propertiesTable.mode) {
                        switch(propertiesTable.mode.toLowerCase()) {
                            case 'cfb':
                                mode = CryptoJS.mode.CFB;
                                break;
                            case 'ctr':
                                mode = CryptoJS.mode.CTR;
                                break;
                            case 'ofb':
                                mode = CryptoJS.mode.OFB;
                                break;
                            case 'ecb':
                                mode = CryptoJS.mode.ECB;
                                break;
                        }
                    }
                    if(propertiesTable.padding) {
                        switch(propertiesTable.padding.toLowerCase()) {
                            case 'iso97971':
                                padding = CryptoJS.pad.Iso97971;
                                break;
                            case 'iso10126':
                                padding = CryptoJS.pad.Iso10126;
                                break;
                            case 'zeropadding':
                                padding = CryptoJS.pad.ZeroPadding;
                                break;
                            case 'nopadding':
                                padding = CryptoJS.pad.NoPadding;
                                break;
                        }
                    }
                }
                if(algo.toLowerCase() == "aes") {
                    var encryptedObj = CryptoJS.AES.encrypt(inputstring, generatedkey, {
                        mode: mode,
                        padding: padding
                    });
                    $KU.logExecutingFinished('voltmx.crypto.encrypt VIA encrypting using AES algorithm');
                    return module.stringify(encryptedObj);
                } else if(algo.toLowerCase() == "tripledes") {
                    var encryptedObj = CryptoJS.TripleDES.encrypt(inputstring, generatedkey, {
                        mode: mode,
                        padding: padding,
                        format: module.JsonFormatter
                    });
                    $KU.logExecutingFinished('voltmx.crypto.encrypt VIA encrypting using TripleDES algorithm');
                    return module.stringify(encryptedObj);
                } else {
                    $KU.logErrorMessage('unsupported algorithm');
                    return {
                        errcode: 101,
                        errmessage: "unsupported algorithm"
                    };
                }
            } catch(ex) {
                $KU.logErrorMessage('unknown error');
                return {
                    errcode: 102,
                    errmessage: "unknown  error"
                };
            }
        },

        decrypt: function(algo, generatedkey, inputstring, propertiesTable) {
            $KU.logExecuting('voltmx.crypto.decrypt');
            if(typeof(algo) != "string" && inputstring && generatedkey) {
                $KU.logErrorMessage('invalid input parameters');
                return {
                    errcode: 100,
                    errmessage: "invalid input parameters"
                };
            }
            $KU.logExecutingWithParams('voltmx.crypto.decrypt', algo, generatedkey, inputstring, propertiesTable);
            var mode = CryptoJS.mode.CBC;
            var padding = CryptoJS.pad.Pkcs7;
            try {
                if(propertiesTable) {
                    if(propertiesTable.mode) {
                        switch(propertiesTable.mode.toLowerCase()) {
                            case 'cfb':
                                mode = CryptoJS.mode.CFB;
                                break;
                            case 'ctr':
                                mode = CryptoJS.mode.CTR;
                                break;
                            case 'ofb':
                                mode = CryptoJS.mode.OFB;
                                break;
                            case 'ecb':
                                mode = CryptoJS.mode.ECB;
                                break;
                        }
                    }
                    if(propertiesTable.padding) {
                        switch(propertiesTable.padding.toLowerCase()) {
                            case 'iso97971':
                                padding = CryptoJS.pad.Iso97971;
                                break;
                            case 'iso10126':
                                padding = CryptoJS.pad.Iso10126;
                                break;
                            case 'zeropadding':
                                padding = CryptoJS.pad.ZeroPadding;
                                break;
                            case 'nopadding':
                                padding = CryptoJS.pad.NoPadding;
                                break;
                        }
                    }
                }
                inputstring = module.parse(inputstring);
                if(algo.toLowerCase() == "aes") {
                    var message = CryptoJS.AES.decrypt(inputstring, generatedkey, {
                        mode: mode,
                        padding: padding
                    });
                    $KU.logExecutingFinished('voltmx.crypto.decrypt VIA decryting using AES algorithm');
                    return message.toString(CryptoJS.enc.Utf8)
                } else if(algo.toLowerCase() == "tripledes") {
                    var message = CryptoJS.TripleDES.decrypt(inputstring, generatedkey, {
                        mode: mode,
                        padding: padding
                    });
                    $KU.logExecutingFinished('voltmx.crypto.decrypt VIA decryting using TripleDES algorithm');
                    return message.toString(CryptoJS.enc.Utf8)
                } else {
                    $KU.logErrorMessage('unsupported algorithm');
                    return {
                        errcode: 101,
                        errmessage: "unsupported algorithm"
                    }
                }
            } catch(ex) {
                $KU.logErrorMessage('unknown  error' + ex);
                return {
                    errcode: 102,
                    errmessage: "unknown  error"
                }
            }
        },

        retrievepublickey: function() {
            $KU.logWarnMessage('retrievepublickey is not supported in SPA');
            return;
        },

        newkey: function(phrase, optionalBits, algoObject) {
            $KU.logExecuting('voltmx.crypto.newKey');
            try {
                if(phrase != "passphrase") {
                    $KU.logErrorMessage('invalid input parameters');
                    return {
                        errcode: 100,
                        errmessage: "invalid input parameters"
                    };
                } else if(!algoObject.subalgo) {
                    $KU.logErrorMessage('subalgo parameter is missing');
                    return {
                        errcode: 105,
                        errmessage: "subalgo parameter is missing"
                    };
                }
                $KU.logExecutingWithParams('voltmx.crypto.newKey', phrase, optionalBits, algoObject);
                if(algoObject.subalgo.toLowerCase() == "aes" || algoObject.subalgo.toLowerCase() == "tripledes") {
                    $KU.logExecutingFinished('voltmx.crypto.newKey');
                    return algoObject.passphrasetext[IndexJL];
                } else {
                    $KU.logErrorMessage('unsupported algorithm');
                    return {
                        errcode: 101,
                        errmessage: "unsupported algorithm"
                    };
                }
            } catch(ex) {
                $KU.logErrorMessage('unknown error' + ex);
                return {
                    errcode: 102,
                    errmessage: "unknown error"
                };
            }
        },

        savekey: function(name, key, metainfo) {
            $KU.logExecuting('voltmx.crypto.saveKey');
            if(name == undefined || key == undefined) {
                $KU.logErrorMessage('Invalid input parameters');
                return {
                    "errcode": 100,
                    "errmsg": "Invalid input parameters"
                };
            }
            $KU.logExecutingWithParams('voltmx.crypto.saveKey', name, key, metainfo);

            try {
                if(localStorage) {
                    try {
                        localStorage.setItem(name, JSON.stringify(key));
                        $KU.logExecutingFinished('voltmx.crypto.saveKey');
                        return name;
                    } catch(e) {
                        if(e.name == "QUOTA_EXCEEDED_ERR") {
                            var errcode = 0,
                                errmsg = "";
                            if(localStorage.length === 0) {
                                $KU.logErrorMessage('Private Browsing is switched ON');
                                errcode = 102;
                                errmsg = "Private Browsing is switched ON";
                            } else {
                                $KU.logErrorMessage('unable to save the key with the specified name');
                                errcode = 101;
                                errmsg = "unable to save the key with the specified name";
                            }

                            return {
                                "errcode": errcode,
                                "errmsg": errmsg
                            };
                        }
                    }
                } else {
                    $KU.logErrorMessage('unknown error, storage not supported');
                    return {
                        "errcode": 102,
                        "errmsg": "unknown error, storage not supported"
                    };
                }
            } catch(err) {
                $KU.logErrorMessage('unknown error ' + err);
            }
        },

        readkey: function(uniqid) {
            $KU.logExecuting('voltmx.crypto.readKey');
            if(uniqid == undefined) {
                $KU.logErrorMessage('Invalid input parameters');
                return {
                    "errcode": 100,
                    "errmsg": "Invalid input parameters"
                };
            }
            $KU.logExecutingWithParams('voltmx.crypto.readKey', uniqid);

            try {
                if(localStorage) {
                    var dataobj = JSON.parse(localStorage.getItem(uniqid) || "null");
                    if(dataobj == null) {
                        $KU.logErrorMessage('unable to find the key with the specified unique ID');
                        return {
                            "errcode": 101,
                            "errmsg": "unable to find the key with the specified unique ID"
                        };
                    } else
                        $KU.logExecutingFinished('voltmx.crypto.readKey');
                        return dataobj;
                } else {
                    voltmx.print("crypto readkey failed");
                    $KU.logErrorMessage('unknown error, storage not supported');
                    return {
                        "errcode": 102,
                        "errmsg": "unknown error, storage not supported"
                    };
                }

            } catch(err) {
                $KU.logErrorMessage('unknown error ' + err);
            }

        },

        deletekey: function(uniqid) {

            $KU.logExecuting('voltmx.crypto.deleteKey');
            $KU.logExecutingWithParams('voltmx.crypto.deleteKey', uniqid);
            try {
                if(localStorage)
                    localStorage.removeItem(uniqid);
                else
                    voltmx.print("crypto delete failed");
                $KU.logExecutingFinished('voltmx.crypto.deleteKey');
            } catch(err) {
                $KU.logErrorMessage('unknown error' + err);
            }
        },

        generateSecureRandom: function (config) {
            if (!(typeof config === 'object')) {
                config = { type: 'base64', size: 36 };
            } else {
                if (['base64'].indexOf(config.type) === -1) {
                    config.type = 'base64';
                }

                if (!Number.isInteger(config.size) || config.size < 0) {
                    config.size = 36;
                }
            }

            let salt = CryptoJS.lib.WordArray.random(config.size);

            return (config.type === 'base64') ? salt.toString(CryptoJS.enc.Base64) : salt.toString(CryptoJS.enc.Hex);
        },

        createHMacHash: function() {
            voltmx.web.logger("warn", "The createHMacHash API is not supported.");
        },

        createPBKDF2Key: function() {
            voltmx.web.logger("warn", "The createPBKDF2Key API is not supported.");
        },

        getRandomNumber: function(min, max) {
            return _generateRandomNumber(min, max);
        },

        generateRandomString: function() {
            return _generateRandomString();
        },

        createHashToUpperCase: function(algo, toHash) {
            return _createHashToUpperCase(algo, toHash);
        }
    };

    return module;
}());



var CryptoJS = CryptoJS || function (p, h) {
        var i = {}, l = i.lib = {}, r = l.Base = function () {
            function a() {}
            return {
                extend: function (e) {
                    a.prototype = this;
                    var c = new a;
                    e && c.mixIn(e);
                    c.$super = this;
                    return c
                },
                create: function () {
                    var a = this.extend();
                    a.init.apply(a, arguments);
                    return a
                },
                init: function () {},
                mixIn: function (a) {
                    for (var c in a) a.hasOwnProperty(c) && (this[c] = a[c]);
                    a.hasOwnProperty("toString") && (this.toString = a.toString)
                },
                clone: function () {
                    return this.$super.extend(this)
                }
            }
        }(),
            o = l.WordArray = r.extend({
                init: function (a, e) {
                    a = this.words = a || [];
                    this.sigBytes = e != h ? e : 4 * a.length
                },
                toString: function (a) {
                    return (a || s).stringify(this)
                },
                concat: function (a) {
                    var e = this.words,
                        c = a.words,
                        b = this.sigBytes,
                        a = a.sigBytes;
                    this.clamp();
                    if (b % 4) for (var d = 0; d < a; d++) e[b + d >>> 2] |= (c[d >>> 2] >>> 24 - 8 * (d % 4) & 255) << 24 - 8 * ((b + d) % 4);
                    else if (65535 < c.length) for (d = 0; d < a; d += 4) e[b + d >>> 2] = c[d >>> 2];
                    else e.push.apply(e, c);
                    this.sigBytes += a;
                    return this
                },
                clamp: function () {
                    var a = this.words,
                        e = this.sigBytes;
                    a[e >>> 2] &= 4294967295 << 32 - 8 * (e % 4);
                    a.length = p.ceil(e / 4)
                },
                clone: function () {
                    var a = r.clone.call(this);
                    a.words = this.words.slice(0);
                    return a
                },
                random: function (a) {
                    for (var e = [], c = 0; c < a; c += 4) e.push(4294967296 * p.random() | 0);
                    return o.create(e, a)
                }
            }),
            m = i.enc = {}, s = m.Hex = {
                stringify: function (a) {
                    for (var e = a.words, a = a.sigBytes, c = [], b = 0; b < a; b++) {
                        var d = e[b >>> 2] >>> 24 - 8 * (b % 4) & 255;
                        c.push((d >>> 4).toString(16));
                        c.push((d & 15).toString(16))
                    }
                    return c.join("")
                },
                parse: function (a) {
                    for (var e = a.length, c = [], b = 0; b < e; b += 2) c[b >>> 3] |= parseInt(a.substr(b, 2), 16) << 24 - 4 * (b % 8);
                    return o.create(c, e / 2)
                }
            }, n = m.Latin1 = {
                stringify: function (a) {
                    for (var e = a.words, a = a.sigBytes, c = [], b = 0; b < a; b++) c.push(String.fromCharCode(e[b >>> 2] >>> 24 - 8 * (b % 4) & 255));
                    return c.join("")
                },
                parse: function (a) {
                    for (var e = a.length, c = [], b = 0; b < e; b++) c[b >>> 2] |= (a.charCodeAt(b) & 255) << 24 - 8 * (b % 4);
                    return o.create(c, e)
                }
            }, k = m.Utf8 = {
                stringify: function (a) {
                    try {
                        return decodeURIComponent(escape(n.stringify(a)))
                    } catch (e) {
                        throw Error("Malformed UTF-8 data");
                    }
                },
                parse: function (a) {
                    return n.parse(unescape(encodeURIComponent(a)))
                }
            }, f = l.BufferedBlockAlgorithm = r.extend({
                reset: function () {
                    this._data = o.create();
                    this._nDataBytes = 0
                },
                _append: function (a) {
                    "string" == typeof a && (a = k.parse(a));
                    this._data.concat(a);
                    this._nDataBytes += a.sigBytes
                },
                _process: function (a) {
                    var e = this._data,
                        c = e.words,
                        b = e.sigBytes,
                        d = this.blockSize,
                        q = b / (4 * d),
                        q = a ? p.ceil(q) : p.max((q | 0) - this._minBufferSize, 0),
                        a = q * d,
                        b = p.min(4 * a, b);
                    if (a) {
                        for (var j = 0; j < a; j += d) this._doProcessBlock(c, j);
                        j = c.splice(0, a);
                        e.sigBytes -= b
                    }
                    return o.create(j, b)
                },
                clone: function () {
                    var a = r.clone.call(this);
                    a._data = this._data.clone();
                    return a
                },
                _minBufferSize: 0
            });
        l.Hasher = f.extend({
            init: function () {
                this.reset()
            },
            reset: function () {
                f.reset.call(this);
                this._doReset()
            },
            update: function (a) {
                this._append(a);
                this._process();
                return this
            },
            finalize: function (a) {
                a && this._append(a);
                this._doFinalize();
                return this._hash
            },
            clone: function () {
                var a = f.clone.call(this);
                a._hash = this._hash.clone();
                return a
            },
            blockSize: 16,
            _createHelper: function (a) {
                return function (e, c) {
                    return a.create(c).finalize(e)
                }
            },
            _createHmacHelper: function (a) {
                return function (e, c) {
                    return g.HMAC.create(a, c).finalize(e)
                }
            }
        });
        var g = i.algo = {};
        return i
    }(Math);
(function () {
    var p = CryptoJS,
        h = p.lib.WordArray;
    p.enc.Base64 = {
        stringify: function (i) {
            var l = i.words,
                h = i.sigBytes,
                o = this._map;
            i.clamp();
            for (var i = [], m = 0; m < h; m += 3) for (var s = (l[m >>> 2] >>> 24 - 8 * (m % 4) & 255) << 16 | (l[m + 1 >>> 2] >>> 24 - 8 * ((m + 1) % 4) & 255) << 8 | l[m + 2 >>> 2] >>> 24 - 8 * ((m + 2) % 4) & 255, n = 0; 4 > n && m + 0.75 * n < h; n++) i.push(o.charAt(s >>> 6 * (3 - n) & 63));
            if (l = o.charAt(64)) for (; i.length % 4;) i.push(l);
            return i.join("")
        },
        parse: function (i) {
            var i = i.replace(/\s/g, ""),
                l = i.length,
                r = this._map,
                o = r.charAt(64);
            o && (o = i.indexOf(o), - 1 != o && (l = o));
            for (var o = [], m = 0, s = 0; s < l; s++) if (s % 4) {
                var n = r.indexOf(i.charAt(s - 1)) << 2 * (s % 4),
                    k = r.indexOf(i.charAt(s)) >>> 6 - 2 * (s % 4);
                o[m >>> 2] |= (n | k) << 24 - 8 * (m % 4);
                m++
            }
            return h.create(o, m)
        },
        _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
    }
})();
(function (p) {
    function h(f, g, a, e, c, b, d) {
        f = f + (g & a | ~g & e) + c + d;
        return (f << b | f >>> 32 - b) + g
    }
    function i(f, g, a, e, c, b, d) {
        f = f + (g & e | a & ~e) + c + d;
        return (f << b | f >>> 32 - b) + g
    }
    function l(f, g, a, e, c, b, d) {
        f = f + (g ^ a ^ e) + c + d;
        return (f << b | f >>> 32 - b) + g
    }
    function r(f, g, a, e, c, b, d) {
        f = f + (a ^ (g | ~e)) + c + d;
        return (f << b | f >>> 32 - b) + g
    }
    var o = CryptoJS,
        m = o.lib,
        s = m.WordArray,
        m = m.Hasher,
        n = o.algo,
        k = [];
    (function () {
        for (var f = 0; 64 > f; f++) k[f] = 4294967296 * p.abs(p.sin(f + 1)) | 0
    })();
    n = n.MD5 = m.extend({
        _doReset: function () {
            this._hash = s.create([1732584193, 4023233417,
            2562383102, 271733878])
        },
        _doProcessBlock: function (f, g) {
            for (var a = 0; 16 > a; a++) {
                var e = g + a,
                    c = f[e];
                f[e] = (c << 8 | c >>> 24) & 16711935 | (c << 24 | c >>> 8) & 4278255360
            }
            for (var e = this._hash.words, c = e[0], b = e[1], d = e[2], q = e[3], a = 0; 64 > a; a += 4) 16 > a ? (c = h(c, b, d, q, f[g + a], 7, k[a]), q = h(q, c, b, d, f[g + a + 1], 12, k[a + 1]), d = h(d, q, c, b, f[g + a + 2], 17, k[a + 2]), b = h(b, d, q, c, f[g + a + 3], 22, k[a + 3])) : 32 > a ? (c = i(c, b, d, q, f[g + (a + 1) % 16], 5, k[a]), q = i(q, c, b, d, f[g + (a + 6) % 16], 9, k[a + 1]), d = i(d, q, c, b, f[g + (a + 11) % 16], 14, k[a + 2]), b = i(b, d, q, c, f[g + a % 16], 20, k[a + 3])) : 48 > a ? (c = l(c, b, d, q, f[g + (3 * a + 5) % 16], 4, k[a]), q = l(q, c, b, d, f[g + (3 * a + 8) % 16], 11, k[a + 1]), d = l(d, q, c, b, f[g + (3 * a + 11) % 16], 16, k[a + 2]), b = l(b, d, q, c, f[g + (3 * a + 14) % 16], 23, k[a + 3])) : (c = r(c, b, d, q, f[g + 3 * a % 16], 6, k[a]), q = r(q, c, b, d, f[g + (3 * a + 7) % 16], 10, k[a + 1]), d = r(d, q, c, b, f[g + (3 * a + 14) % 16], 15, k[a + 2]), b = r(b, d, q, c, f[g + (3 * a + 5) % 16], 21, k[a + 3]));
            e[0] = e[0] + c | 0;
            e[1] = e[1] + b | 0;
            e[2] = e[2] + d | 0;
            e[3] = e[3] + q | 0
        },
        _doFinalize: function () {
            var f = this._data,
                g = f.words,
                a = 8 * this._nDataBytes,
                e = 8 * f.sigBytes;
            g[e >>> 5] |= 128 << 24 - e % 32;
            g[(e + 64 >>> 9 << 4) + 14] = (a << 8 | a >>> 24) & 16711935 | (a << 24 | a >>> 8) & 4278255360;
            f.sigBytes = 4 * (g.length + 1);
            this._process();
            f = this._hash.words;
            for (g = 0; 4 > g; g++) a = f[g], f[g] = (a << 8 | a >>> 24) & 16711935 | (a << 24 | a >>> 8) & 4278255360
        }
    });
    o.MD5 = m._createHelper(n);
    o.HmacMD5 = m._createHmacHelper(n)
})(Math);
(function () {
    var p = CryptoJS,
        h = p.lib,
        i = h.Base,
        l = h.WordArray,
        h = p.algo,
        r = h.EvpKDF = i.extend({
            cfg: i.extend({
                keySize: 4,
                hasher: h.MD5,
                iterations: 1
            }),
            init: function (i) {
                this.cfg = this.cfg.extend(i)
            },
            compute: function (i, m) {
                for (var h = this.cfg, n = h.hasher.create(), k = l.create(), f = k.words, g = h.keySize, h = h.iterations; f.length < g;) {
                    a && n.update(a);
                    var a = n.update(i).finalize(m);
                    n.reset();
                    for (var e = 1; e < h; e++) a = n.finalize(a), n.reset();
                    k.concat(a)
                }
                k.sigBytes = 4 * g;
                return k
            }
        });
    p.EvpKDF = function (i, l, h) {
        return r.create(h).compute(i,
        l)
    }
})();
CryptoJS.lib.Cipher || function (p) {
    var h = CryptoJS,
        i = h.lib,
        l = i.Base,
        r = i.WordArray,
        o = i.BufferedBlockAlgorithm,
        m = h.enc.Base64,
        s = h.algo.EvpKDF,
        n = i.Cipher = o.extend({
            cfg: l.extend(),
            createEncryptor: function (b, d) {
                return this.create(this._ENC_XFORM_MODE, b, d)
            },
            createDecryptor: function (b, d) {
                return this.create(this._DEC_XFORM_MODE, b, d)
            },
            init: function (b, d, a) {
                this.cfg = this.cfg.extend(a);
                this._xformMode = b;
                this._key = d;
                this.reset()
            },
            reset: function () {
                o.reset.call(this);
                this._doReset()
            },
            process: function (b) {
                this._append(b);
                return this._process()
            },
            finalize: function (b) {
                b && this._append(b);
                return this._doFinalize()
            },
            keySize: 4,
            ivSize: 4,
            _ENC_XFORM_MODE: 1,
            _DEC_XFORM_MODE: 2,
            _createHelper: function () {
                return function (b) {
                    return {
                        encrypt: function (a, q, j) {
                            return ("string" == typeof q ? c : e).encrypt(b, a, q, j)
                        },
                        decrypt: function (a, q, j) {
                            return ("string" == typeof q ? c : e).decrypt(b, a, q, j)
                        }
                    }
                }
            }()
        });
    i.StreamCipher = n.extend({
        _doFinalize: function () {
            return this._process(!0)
        },
        blockSize: 1
    });
    var k = h.mode = {}, f = i.BlockCipherMode = l.extend({
        createEncryptor: function (b, a) {
            return this.Encryptor.create(b,
            a)
        },
        createDecryptor: function (b, a) {
            return this.Decryptor.create(b, a)
        },
        init: function (b, a) {
            this._cipher = b;
            this._iv = a
        }
    }),
        k = k.CBC = function () {
            function b(b, a, d) {
                var c = this._iv;
                c ? this._iv = p : c = this._prevBlock;
                for (var e = 0; e < d; e++) b[a + e] ^= c[e]
            }
            var a = f.extend();
            a.Encryptor = a.extend({
                processBlock: function (a, d) {
                    var c = this._cipher,
                        e = c.blockSize;
                    b.call(this, a, d, e);
                    c.encryptBlock(a, d);
                    this._prevBlock = a.slice(d, d + e)
                }
            });
            a.Decryptor = a.extend({
                processBlock: function (a, d) {
                    var c = this._cipher,
                        e = c.blockSize,
                        f = a.slice(d, d + e);
                    c.decryptBlock(a, d);
                    b.call(this, a, d, e);
                    this._prevBlock = f
                }
            });
            return a
        }(),
        g = (h.pad = {}).Pkcs7 = {
            pad: function (b, a) {
                for (var c = 4 * a, c = c - b.sigBytes % c, e = c << 24 | c << 16 | c << 8 | c, f = [], g = 0; g < c; g += 4) f.push(e);
                c = r.create(f, c);
                b.concat(c)
            },
            unpad: function (b) {
                b.sigBytes -= b.words[b.sigBytes - 1 >>> 2] & 255
            }
        };
    i.BlockCipher = n.extend({
        cfg: n.cfg.extend({
            mode: k,
            padding: g
        }),
        reset: function () {
            n.reset.call(this);
            var b = this.cfg,
                a = b.iv,
                b = b.mode;
            if (this._xformMode == this._ENC_XFORM_MODE) var c = b.createEncryptor;
            else c = b.createDecryptor,
            this._minBufferSize = 1;
            this._mode = c.call(b, this, a && a.words)
        },
        _doProcessBlock: function (b, a) {
            this._mode.processBlock(b, a)
        },
        _doFinalize: function () {
            var b = this.cfg.padding;
            if (this._xformMode == this._ENC_XFORM_MODE) {
                b.pad(this._data, this.blockSize);
                var a = this._process(!0)
            } else a = this._process(!0), b.unpad(a);
            return a
        },
        blockSize: 4
    });
    var a = i.CipherParams = l.extend({
        init: function (a) {
            this.mixIn(a)
        },
        toString: function (a) {
            return (a || this.formatter).stringify(this)
        }
    }),
        k = (h.format = {}).OpenSSL = {
            stringify: function (a) {
                var d = a.ciphertext,
                    a = a.salt,
                    d = (a ? r.create([1398893684, 1701076831]).concat(a).concat(d) : d).toString(m);
                return d = d.replace(/(.{64})/g, "$1\n")
            },
            parse: function (b) {
                var b = m.parse(b),
                    d = b.words;
                if (1398893684 == d[0] && 1701076831 == d[1]) {
                    var c = r.create(d.slice(2, 4));
                    d.splice(0, 4);
                    b.sigBytes -= 16
                }
                return a.create({
                    ciphertext: b,
                    salt: c
                })
            }
        }, e = i.SerializableCipher = l.extend({
            cfg: l.extend({
                format: k
            }),
            encrypt: function (b, d, c, e) {
                var e = this.cfg.extend(e),
                    f = b.createEncryptor(c, e),
                    d = f.finalize(d),
                    f = f.cfg;
                return a.create({
                    ciphertext: d,
                    key: c,
                    iv: f.iv,
                    algorithm: b,
                    mode: f.mode,
                    padding: f.padding,
                    blockSize: b.blockSize,
                    formatter: e.format
                })
            },
            decrypt: function (a, c, e, f) {
                f = this.cfg.extend(f);
                c = this._parse(c, f.format);
                return a.createDecryptor(e, f).finalize(c.ciphertext)
            },
            _parse: function (a, c) {
                return "string" == typeof a ? c.parse(a) : a
            }
        }),
        h = (h.kdf = {}).OpenSSL = {
            compute: function (b, c, e, f) {
                f || (f = r.random(8));
                b = s.create({
                    keySize: c + e
                }).compute(b, f);
                e = r.create(b.words.slice(c), 4 * e);
                b.sigBytes = 4 * c;
                return a.create({
                    key: b,
                    iv: e,
                    salt: f
                })
            }
        }, c = i.PasswordBasedCipher = e.extend({
            cfg: e.cfg.extend({
                kdf: h
            }),
            encrypt: function (a, c, f, j) {
                j = this.cfg.extend(j);
                f = j.kdf.compute(f, a.keySize, a.ivSize);
                j.iv = f.iv;
                a = e.encrypt.call(this, a, c, f.key, j);
                a.mixIn(f);
                return a
            },
            decrypt: function (a, c, f, j) {
                j = this.cfg.extend(j);
                c = this._parse(c, j.format);
                f = j.kdf.compute(f, a.keySize, a.ivSize, c.salt);
                j.iv = f.iv;
                return e.decrypt.call(this, a, c, f.key, j)
            }
        })
}();
(function () {
    var p = CryptoJS,
        h = p.lib.BlockCipher,
        i = p.algo,
        l = [],
        r = [],
        o = [],
        m = [],
        s = [],
        n = [],
        k = [],
        f = [],
        g = [],
        a = [];
    (function () {
        for (var c = [], b = 0; 256 > b; b++) c[b] = 128 > b ? b << 1 : b << 1 ^ 283;
        for (var d = 0, e = 0, b = 0; 256 > b; b++) {
            var j = e ^ e << 1 ^ e << 2 ^ e << 3 ^ e << 4,
                j = j >>> 8 ^ j & 255 ^ 99;
            l[d] = j;
            r[j] = d;
            var i = c[d],
                h = c[i],
                p = c[h],
                t = 257 * c[j] ^ 16843008 * j;
            o[d] = t << 24 | t >>> 8;
            m[d] = t << 16 | t >>> 16;
            s[d] = t << 8 | t >>> 24;
            n[d] = t;
            t = 16843009 * p ^ 65537 * h ^ 257 * i ^ 16843008 * d;
            k[j] = t << 24 | t >>> 8;
            f[j] = t << 16 | t >>> 16;
            g[j] = t << 8 | t >>> 24;
            a[j] = t;
            d ? (d = i ^ c[c[c[p ^ i]]], e ^= c[c[e]]) : d = e = 1
        }
    })();
    var e = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54],
        i = i.AES = h.extend({
            _doReset: function () {
                for (var c = this._key, b = c.words, d = c.sigBytes / 4, c = 4 * ((this._nRounds = d + 6) + 1), i = this._keySchedule = [], j = 0; j < c; j++) if (j < d) i[j] = b[j];
                else {
                    var h = i[j - 1];
                    j % d ? 6 < d && 4 == j % d && (h = l[h >>> 24] << 24 | l[h >>> 16 & 255] << 16 | l[h >>> 8 & 255] << 8 | l[h & 255]) : (h = h << 8 | h >>> 24, h = l[h >>> 24] << 24 | l[h >>> 16 & 255] << 16 | l[h >>> 8 & 255] << 8 | l[h & 255], h ^= e[j / d | 0] << 24);
                    i[j] = i[j - d] ^ h
                }
                b = this._invKeySchedule = [];
                for (d = 0; d < c; d++) j = c - d, h = d % 4 ? i[j] : i[j - 4], b[d] = 4 > d || 4 >= j ? h : k[l[h >>> 24]] ^ f[l[h >>> 16 & 255]] ^ g[l[h >>> 8 & 255]] ^ a[l[h & 255]]
            },
            encryptBlock: function (a, b) {
                this._doCryptBlock(a, b, this._keySchedule, o, m, s, n, l)
            },
            decryptBlock: function (c, b) {
                var d = c[b + 1];
                c[b + 1] = c[b + 3];
                c[b + 3] = d;
                this._doCryptBlock(c, b, this._invKeySchedule, k, f, g, a, r);
                d = c[b + 1];
                c[b + 1] = c[b + 3];
                c[b + 3] = d
            },
            _doCryptBlock: function (a, b, d, e, f, h, i, g) {
                for (var l = this._nRounds, k = a[b] ^ d[0], m = a[b + 1] ^ d[1], o = a[b + 2] ^ d[2], n = a[b + 3] ^ d[3], p = 4, r = 1; r < l; r++) var s = e[k >>> 24] ^ f[m >>> 16 & 255] ^ h[o >>> 8 & 255] ^ i[n & 255] ^ d[p++],
                    u = e[m >>> 24] ^ f[o >>> 16 & 255] ^ h[n >>> 8 & 255] ^ i[k & 255] ^ d[p++],
                    v = e[o >>> 24] ^ f[n >>> 16 & 255] ^ h[k >>> 8 & 255] ^ i[m & 255] ^ d[p++],
                    n = e[n >>> 24] ^ f[k >>> 16 & 255] ^ h[m >>> 8 & 255] ^ i[o & 255] ^ d[p++],
                    k = s,
                    m = u,
                    o = v;
                s = (g[k >>> 24] << 24 | g[m >>> 16 & 255] << 16 | g[o >>> 8 & 255] << 8 | g[n & 255]) ^ d[p++];
                u = (g[m >>> 24] << 24 | g[o >>> 16 & 255] << 16 | g[n >>> 8 & 255] << 8 | g[k & 255]) ^ d[p++];
                v = (g[o >>> 24] << 24 | g[n >>> 16 & 255] << 16 | g[k >>> 8 & 255] << 8 | g[m & 255]) ^ d[p++];
                n = (g[n >>> 24] << 24 | g[k >>> 16 & 255] << 16 | g[m >>> 8 & 255] << 8 | g[o & 255]) ^ d[p++];
                a[b] = s;
                a[b + 1] = u;
                a[b + 2] = v;
                a[b + 3] = n
            },
            keySize: 8
        });
    p.AES = h._createHelper(i)
})();



﻿(function () {
    
    var C = CryptoJS;
    var C_lib = C.lib;
    var WordArray = C_lib.WordArray;
    var BlockCipher = C_lib.BlockCipher;
    var C_algo = C.algo;

    
    var PC1 = [
        57, 49, 41, 33, 25, 17, 9,  1,
        58, 50, 42, 34, 26, 18, 10, 2,
        59, 51, 43, 35, 27, 19, 11, 3,
        60, 52, 44, 36, 63, 55, 47, 39,
        31, 23, 15, 7,  62, 54, 46, 38,
        30, 22, 14, 6,  61, 53, 45, 37,
        29, 21, 13, 5,  28, 20, 12, 4
    ];

    
    var PC2 = [
        14, 17, 11, 24, 1,  5,
        3,  28, 15, 6,  21, 10,
        23, 19, 12, 4,  26, 8,
        16, 7,  27, 20, 13, 2,
        41, 52, 31, 37, 47, 55,
        30, 40, 51, 45, 33, 48,
        44, 49, 39, 56, 34, 53,
        46, 42, 50, 36, 29, 32
    ];

    
    var BIT_SHIFTS = [1,  2,  4,  6,  8,  10, 12, 14, 15, 17, 19, 21, 23, 25, 27, 28];

    
    var SBOX_P = [
        {
            0x00000000: 0x00808200, 0x10000000: 0x00008000, 0x20000000: 0x00808002, 0x30000000: 0x00000002,
            0x40000000: 0x00000200, 0x50000000: 0x00808202, 0x60000000: 0x00800202, 0x70000000: 0x00800000,
            0x80000000: 0x00000202, 0x90000000: 0x00800200, 0xa0000000: 0x00008200, 0xb0000000: 0x00808000,
            0xc0000000: 0x00008002, 0xd0000000: 0x00800002, 0xe0000000: 0x00000000, 0xf0000000: 0x00008202,
            0x08000000: 0x00000000, 0x18000000: 0x00808202, 0x28000000: 0x00008202, 0x38000000: 0x00008000,
            0x48000000: 0x00808200, 0x58000000: 0x00000200, 0x68000000: 0x00808002, 0x78000000: 0x00000002,
            0x88000000: 0x00800200, 0x98000000: 0x00008200, 0xa8000000: 0x00808000, 0xb8000000: 0x00800202,
            0xc8000000: 0x00800002, 0xd8000000: 0x00008002, 0xe8000000: 0x00000202, 0xf8000000: 0x00800000,
            0x00000001: 0x00008000, 0x10000001: 0x00000002, 0x20000001: 0x00808200, 0x30000001: 0x00800000,
            0x40000001: 0x00808002, 0x50000001: 0x00008200, 0x60000001: 0x00000200, 0x70000001: 0x00800202,
            0x80000001: 0x00808202, 0x90000001: 0x00808000, 0xa0000001: 0x00800002, 0xb0000001: 0x00008202,
            0xc0000001: 0x00000202, 0xd0000001: 0x00800200, 0xe0000001: 0x00008002, 0xf0000001: 0x00000000,
            0x08000001: 0x00808202, 0x18000001: 0x00808000, 0x28000001: 0x00800000, 0x38000001: 0x00000200,
            0x48000001: 0x00008000, 0x58000001: 0x00800002, 0x68000001: 0x00000002, 0x78000001: 0x00008202,
            0x88000001: 0x00008002, 0x98000001: 0x00800202, 0xa8000001: 0x00000202, 0xb8000001: 0x00808200,
            0xc8000001: 0x00800200, 0xd8000001: 0x00000000, 0xe8000001: 0x00008200, 0xf8000001: 0x00808002
        },
        {
            0x00000000: 0x40084010, 0x01000000: 0x00004000, 0x02000000: 0x00080000, 0x03000000: 0x40080010,
            0x04000000: 0x40000010, 0x05000000: 0x40084000, 0x06000000: 0x40004000, 0x07000000: 0x00000010,
            0x08000000: 0x00084000, 0x09000000: 0x40004010, 0x0a000000: 0x40000000, 0x0b000000: 0x00084010,
            0x0c000000: 0x00080010, 0x0d000000: 0x00000000, 0x0e000000: 0x00004010, 0x0f000000: 0x40080000,
            0x00800000: 0x40004000, 0x01800000: 0x00084010, 0x02800000: 0x00000010, 0x03800000: 0x40004010,
            0x04800000: 0x40084010, 0x05800000: 0x40000000, 0x06800000: 0x00080000, 0x07800000: 0x40080010,
            0x08800000: 0x00080010, 0x09800000: 0x00000000, 0x0a800000: 0x00004000, 0x0b800000: 0x40080000,
            0x0c800000: 0x40000010, 0x0d800000: 0x00084000, 0x0e800000: 0x40084000, 0x0f800000: 0x00004010,
            0x10000000: 0x00000000, 0x11000000: 0x40080010, 0x12000000: 0x40004010, 0x13000000: 0x40084000,
            0x14000000: 0x40080000, 0x15000000: 0x00000010, 0x16000000: 0x00084010, 0x17000000: 0x00004000,
            0x18000000: 0x00004010, 0x19000000: 0x00080000, 0x1a000000: 0x00080010, 0x1b000000: 0x40000010,
            0x1c000000: 0x00084000, 0x1d000000: 0x40004000, 0x1e000000: 0x40000000, 0x1f000000: 0x40084010,
            0x10800000: 0x00084010, 0x11800000: 0x00080000, 0x12800000: 0x40080000, 0x13800000: 0x00004000,
            0x14800000: 0x40004000, 0x15800000: 0x40084010, 0x16800000: 0x00000010, 0x17800000: 0x40000000,
            0x18800000: 0x40084000, 0x19800000: 0x40000010, 0x1a800000: 0x40004010, 0x1b800000: 0x00080010,
            0x1c800000: 0x00000000, 0x1d800000: 0x00004010, 0x1e800000: 0x40080010, 0x1f800000: 0x00084000
        },
        {
            0x00000000: 0x00000104, 0x00100000: 0x00000000, 0x00200000: 0x04000100, 0x00300000: 0x00010104,
            0x00400000: 0x00010004, 0x00500000: 0x04000004, 0x00600000: 0x04010104, 0x00700000: 0x04010000,
            0x00800000: 0x04000000, 0x00900000: 0x04010100, 0x00a00000: 0x00010100, 0x00b00000: 0x04010004,
            0x00c00000: 0x04000104, 0x00d00000: 0x00010000, 0x00e00000: 0x00000004, 0x00f00000: 0x00000100,
            0x00080000: 0x04010100, 0x00180000: 0x04010004, 0x00280000: 0x00000000, 0x00380000: 0x04000100,
            0x00480000: 0x04000004, 0x00580000: 0x00010000, 0x00680000: 0x00010004, 0x00780000: 0x00000104,
            0x00880000: 0x00000004, 0x00980000: 0x00000100, 0x00a80000: 0x04010000, 0x00b80000: 0x00010104,
            0x00c80000: 0x00010100, 0x00d80000: 0x04000104, 0x00e80000: 0x04010104, 0x00f80000: 0x04000000,
            0x01000000: 0x04010100, 0x01100000: 0x00010004, 0x01200000: 0x00010000, 0x01300000: 0x04000100,
            0x01400000: 0x00000100, 0x01500000: 0x04010104, 0x01600000: 0x04000004, 0x01700000: 0x00000000,
            0x01800000: 0x04000104, 0x01900000: 0x04000000, 0x01a00000: 0x00000004, 0x01b00000: 0x00010100,
            0x01c00000: 0x04010000, 0x01d00000: 0x00000104, 0x01e00000: 0x00010104, 0x01f00000: 0x04010004,
            0x01080000: 0x04000000, 0x01180000: 0x00000104, 0x01280000: 0x04010100, 0x01380000: 0x00000000,
            0x01480000: 0x00010004, 0x01580000: 0x04000100, 0x01680000: 0x00000100, 0x01780000: 0x04010004,
            0x01880000: 0x00010000, 0x01980000: 0x04010104, 0x01a80000: 0x00010104, 0x01b80000: 0x04000004,
            0x01c80000: 0x04000104, 0x01d80000: 0x04010000, 0x01e80000: 0x00000004, 0x01f80000: 0x00010100
        },
        {
            0x00000000: 0x80401000, 0x00010000: 0x80001040, 0x00020000: 0x00401040, 0x00030000: 0x80400000,
            0x00040000: 0x00000000, 0x00050000: 0x00401000, 0x00060000: 0x80000040, 0x00070000: 0x00400040,
            0x00080000: 0x80000000, 0x00090000: 0x00400000, 0x000a0000: 0x00000040, 0x000b0000: 0x80001000,
            0x000c0000: 0x80400040, 0x000d0000: 0x00001040, 0x000e0000: 0x00001000, 0x000f0000: 0x80401040,
            0x00008000: 0x80001040, 0x00018000: 0x00000040, 0x00028000: 0x80400040, 0x00038000: 0x80001000,
            0x00048000: 0x00401000, 0x00058000: 0x80401040, 0x00068000: 0x00000000, 0x00078000: 0x80400000,
            0x00088000: 0x00001000, 0x00098000: 0x80401000, 0x000a8000: 0x00400000, 0x000b8000: 0x00001040,
            0x000c8000: 0x80000000, 0x000d8000: 0x00400040, 0x000e8000: 0x00401040, 0x000f8000: 0x80000040,
            0x00100000: 0x00400040, 0x00110000: 0x00401000, 0x00120000: 0x80000040, 0x00130000: 0x00000000,
            0x00140000: 0x00001040, 0x00150000: 0x80400040, 0x00160000: 0x80401000, 0x00170000: 0x80001040,
            0x00180000: 0x80401040, 0x00190000: 0x80000000, 0x001a0000: 0x80400000, 0x001b0000: 0x00401040,
            0x001c0000: 0x80001000, 0x001d0000: 0x00400000, 0x001e0000: 0x00000040, 0x001f0000: 0x00001000,
            0x00108000: 0x80400000, 0x00118000: 0x80401040, 0x00128000: 0x00000000, 0x00138000: 0x00401000,
            0x00148000: 0x00400040, 0x00158000: 0x80000000, 0x00168000: 0x80001040, 0x00178000: 0x00000040,
            0x00188000: 0x80000040, 0x00198000: 0x00001000, 0x001a8000: 0x80001000, 0x001b8000: 0x80400040,
            0x001c8000: 0x00001040, 0x001d8000: 0x80401000, 0x001e8000: 0x00400000, 0x001f8000: 0x00401040
        },
        {
            0x00000000: 0x00000080, 0x00001000: 0x01040000, 0x00002000: 0x00040000, 0x00003000: 0x20000000,
            0x00004000: 0x20040080, 0x00005000: 0x01000080, 0x00006000: 0x21000080, 0x00007000: 0x00040080,
            0x00008000: 0x01000000, 0x00009000: 0x20040000, 0x0000a000: 0x20000080, 0x0000b000: 0x21040080,
            0x0000c000: 0x21040000, 0x0000d000: 0x00000000, 0x0000e000: 0x01040080, 0x0000f000: 0x21000000,
            0x00000800: 0x01040080, 0x00001800: 0x21000080, 0x00002800: 0x00000080, 0x00003800: 0x01040000,
            0x00004800: 0x00040000, 0x00005800: 0x20040080, 0x00006800: 0x21040000, 0x00007800: 0x20000000,
            0x00008800: 0x20040000, 0x00009800: 0x00000000, 0x0000a800: 0x21040080, 0x0000b800: 0x01000080,
            0x0000c800: 0x20000080, 0x0000d800: 0x21000000, 0x0000e800: 0x01000000, 0x0000f800: 0x00040080,
            0x00010000: 0x00040000, 0x00011000: 0x00000080, 0x00012000: 0x20000000, 0x00013000: 0x21000080,
            0x00014000: 0x01000080, 0x00015000: 0x21040000, 0x00016000: 0x20040080, 0x00017000: 0x01000000,
            0x00018000: 0x21040080, 0x00019000: 0x21000000, 0x0001a000: 0x01040000, 0x0001b000: 0x20040000,
            0x0001c000: 0x00040080, 0x0001d000: 0x20000080, 0x0001e000: 0x00000000, 0x0001f000: 0x01040080,
            0x00010800: 0x21000080, 0x00011800: 0x01000000, 0x00012800: 0x01040000, 0x00013800: 0x20040080,
            0x00014800: 0x20000000, 0x00015800: 0x01040080, 0x00016800: 0x00000080, 0x00017800: 0x21040000,
            0x00018800: 0x00040080, 0x00019800: 0x21040080, 0x0001a800: 0x00000000, 0x0001b800: 0x21000000,
            0x0001c800: 0x01000080, 0x0001d800: 0x00040000, 0x0001e800: 0x20040000, 0x0001f800: 0x20000080
        },
        {
            0x00000000: 0x10000008, 0x00000100: 0x00002000, 0x00000200: 0x10200000, 0x00000300: 0x10202008,
            0x00000400: 0x10002000, 0x00000500: 0x00200000, 0x00000600: 0x00200008, 0x00000700: 0x10000000,
            0x00000800: 0x00000000, 0x00000900: 0x10002008, 0x00000a00: 0x00202000, 0x00000b00: 0x00000008,
            0x00000c00: 0x10200008, 0x00000d00: 0x00202008, 0x00000e00: 0x00002008, 0x00000f00: 0x10202000,
            0x00000080: 0x10200000, 0x00000180: 0x10202008, 0x00000280: 0x00000008, 0x00000380: 0x00200000,
            0x00000480: 0x00202008, 0x00000580: 0x10000008, 0x00000680: 0x10002000, 0x00000780: 0x00002008,
            0x00000880: 0x00200008, 0x00000980: 0x00002000, 0x00000a80: 0x10002008, 0x00000b80: 0x10200008,
            0x00000c80: 0x00000000, 0x00000d80: 0x10202000, 0x00000e80: 0x00202000, 0x00000f80: 0x10000000,
            0x00001000: 0x10002000, 0x00001100: 0x10200008, 0x00001200: 0x10202008, 0x00001300: 0x00002008,
            0x00001400: 0x00200000, 0x00001500: 0x10000000, 0x00001600: 0x10000008, 0x00001700: 0x00202000,
            0x00001800: 0x00202008, 0x00001900: 0x00000000, 0x00001a00: 0x00000008, 0x00001b00: 0x10200000,
            0x00001c00: 0x00002000, 0x00001d00: 0x10002008, 0x00001e00: 0x10202000, 0x00001f00: 0x00200008,
            0x00001080: 0x00000008, 0x00001180: 0x00202000, 0x00001280: 0x00200000, 0x00001380: 0x10000008,
            0x00001480: 0x10002000, 0x00001580: 0x00002008, 0x00001680: 0x10202008, 0x00001780: 0x10200000,
            0x00001880: 0x10202000, 0x00001980: 0x10200008, 0x00001a80: 0x00002000, 0x00001b80: 0x00202008,
            0x00001c80: 0x00200008, 0x00001d80: 0x00000000, 0x00001e80: 0x10000000, 0x00001f80: 0x10002008
        },
        {
            0x00000000: 0x00100000, 0x00000010: 0x02000401, 0x00000020: 0x00000400, 0x00000030: 0x00100401,
            0x00000040: 0x02100401, 0x00000050: 0x00000000, 0x00000060: 0x00000001, 0x00000070: 0x02100001,
            0x00000080: 0x02000400, 0x00000090: 0x00100001, 0x000000a0: 0x02000001, 0x000000b0: 0x02100400,
            0x000000c0: 0x02100000, 0x000000d0: 0x00000401, 0x000000e0: 0x00100400, 0x000000f0: 0x02000000,
            0x00000008: 0x02100001, 0x00000018: 0x00000000, 0x00000028: 0x02000401, 0x00000038: 0x02100400,
            0x00000048: 0x00100000, 0x00000058: 0x02000001, 0x00000068: 0x02000000, 0x00000078: 0x00000401,
            0x00000088: 0x00100401, 0x00000098: 0x02000400, 0x000000a8: 0x02100000, 0x000000b8: 0x00100001,
            0x000000c8: 0x00000400, 0x000000d8: 0x02100401, 0x000000e8: 0x00000001, 0x000000f8: 0x00100400,
            0x00000100: 0x02000000, 0x00000110: 0x00100000, 0x00000120: 0x02000401, 0x00000130: 0x02100001,
            0x00000140: 0x00100001, 0x00000150: 0x02000400, 0x00000160: 0x02100400, 0x00000170: 0x00100401,
            0x00000180: 0x00000401, 0x00000190: 0x02100401, 0x000001a0: 0x00100400, 0x000001b0: 0x00000001,
            0x000001c0: 0x00000000, 0x000001d0: 0x02100000, 0x000001e0: 0x02000001, 0x000001f0: 0x00000400,
            0x00000108: 0x00100400, 0x00000118: 0x02000401, 0x00000128: 0x02100001, 0x00000138: 0x00000001,
            0x00000148: 0x02000000, 0x00000158: 0x00100000, 0x00000168: 0x00000401, 0x00000178: 0x02100400,
            0x00000188: 0x02000001, 0x00000198: 0x02100000, 0x000001a8: 0x00000000, 0x000001b8: 0x02100401,
            0x000001c8: 0x00100401, 0x000001d8: 0x00000400, 0x000001e8: 0x02000400, 0x000001f8: 0x00100001
        },
        {
            0x00000000: 0x08000820, 0x00000001: 0x00020000, 0x00000002: 0x08000000, 0x00000003: 0x00000020,
            0x00000004: 0x00020020, 0x00000005: 0x08020820, 0x00000006: 0x08020800, 0x00000007: 0x00000800,
            0x00000008: 0x08020000, 0x00000009: 0x08000800, 0x0000000a: 0x00020800, 0x0000000b: 0x08020020,
            0x0000000c: 0x00000820, 0x0000000d: 0x00000000, 0x0000000e: 0x08000020, 0x0000000f: 0x00020820,
            0x80000000: 0x00000800, 0x80000001: 0x08020820, 0x80000002: 0x08000820, 0x80000003: 0x08000000,
            0x80000004: 0x08020000, 0x80000005: 0x00020800, 0x80000006: 0x00020820, 0x80000007: 0x00000020,
            0x80000008: 0x08000020, 0x80000009: 0x00000820, 0x8000000a: 0x00020020, 0x8000000b: 0x08020800,
            0x8000000c: 0x00000000, 0x8000000d: 0x08020020, 0x8000000e: 0x08000800, 0x8000000f: 0x00020000,
            0x00000010: 0x00020820, 0x00000011: 0x08020800, 0x00000012: 0x00000020, 0x00000013: 0x00000800,
            0x00000014: 0x08000800, 0x00000015: 0x08000020, 0x00000016: 0x08020020, 0x00000017: 0x00020000,
            0x00000018: 0x00000000, 0x00000019: 0x00020020, 0x0000001a: 0x08020000, 0x0000001b: 0x08000820,
            0x0000001c: 0x08020820, 0x0000001d: 0x00020800, 0x0000001e: 0x00000820, 0x0000001f: 0x08000000,
            0x80000010: 0x00020000, 0x80000011: 0x00000800, 0x80000012: 0x08020020, 0x80000013: 0x00020820,
            0x80000014: 0x00000020, 0x80000015: 0x08020000, 0x80000016: 0x08000000, 0x80000017: 0x08000820,
            0x80000018: 0x08020820, 0x80000019: 0x08000020, 0x8000001a: 0x08000800, 0x8000001b: 0x00000000,
            0x8000001c: 0x00020800, 0x8000001d: 0x00000820, 0x8000001e: 0x00020020, 0x8000001f: 0x08020800
        }
    ];

    
    var SBOX_MASK = [
        0xf8000001, 0x1f800000, 0x01f80000, 0x001f8000,
        0x0001f800, 0x00001f80, 0x000001f8, 0x8000001f
    ];

    
    var DES = C_algo.DES = BlockCipher.extend({
        _doReset: function () {
            
            var key = this._key;
            var keyWords = key.words;

            
            var keyBits = [];
            for (var i = 0; i < 56; i++) {
                var keyBitPos = PC1[i] - 1;
                keyBits[i] = (keyWords[keyBitPos >>> 5] >>> (31 - keyBitPos % 32)) & 1;
            }

            
            var subKeys = this._subKeys = [];
            for (var nSubKey = 0; nSubKey < 16; nSubKey++) {
                
                var subKey = subKeys[nSubKey] = [];

                
                var bitShift = BIT_SHIFTS[nSubKey];

                
                for (var i = 0; i < 24; i++) {
                    
                    subKey[(i / 6) | 0] |= keyBits[((PC2[i] - 1) + bitShift) % 28] << (31 - i % 6);

                    
                    subKey[4 + ((i / 6) | 0)] |= keyBits[28 + (((PC2[i + 24] - 1) + bitShift) % 28)] << (31 - i % 6);
                }

                
                
                
                subKey[0] = (subKey[0] << 1) | (subKey[0] >>> 31);
                for (var i = 1; i < 7; i++) {
                    subKey[i] = subKey[i] >>> ((i - 1) * 4 + 3);
                }
                subKey[7] = (subKey[7] << 5) | (subKey[7] >>> 27);
            }

            
            var invSubKeys = this._invSubKeys = [];
            for (var i = 0; i < 16; i++) {
                invSubKeys[i] = subKeys[15 - i];
            }
        },

        encryptBlock: function (M, offset) {
            this._doCryptBlock(M, offset, this._subKeys);
        },

        decryptBlock: function (M, offset) {
            this._doCryptBlock(M, offset, this._invSubKeys);
        },

        _doCryptBlock: function (M, offset, subKeys) {
            
            this._lBlock = M[offset];
            this._rBlock = M[offset + 1];

            
            exchangeLR.call(this, 4,  0x0f0f0f0f);
            exchangeLR.call(this, 16, 0x0000ffff);
            exchangeRL.call(this, 2,  0x33333333);
            exchangeRL.call(this, 8,  0x00ff00ff);
            exchangeLR.call(this, 1,  0x55555555);

            
            for (var round = 0; round < 16; round++) {
                
                var subKey = subKeys[round];
                var lBlock = this._lBlock;
                var rBlock = this._rBlock;

                
                var f = 0;
                for (var i = 0; i < 8; i++) {
                    f |= SBOX_P[i][((rBlock ^ subKey[i]) & SBOX_MASK[i]) >>> 0];
                }
                this._lBlock = rBlock;
                this._rBlock = lBlock ^ f;
            }

            
            var t = this._lBlock;
            this._lBlock = this._rBlock;
            this._rBlock = t;

            
            exchangeLR.call(this, 1,  0x55555555);
            exchangeRL.call(this, 8,  0x00ff00ff);
            exchangeRL.call(this, 2,  0x33333333);
            exchangeLR.call(this, 16, 0x0000ffff);
            exchangeLR.call(this, 4,  0x0f0f0f0f);

            
            M[offset] = this._lBlock;
            M[offset + 1] = this._rBlock;
        },

        keySize: 64/32,

        ivSize: 64/32,

        blockSize: 64/32
    });

    
    function exchangeLR(offset, mask) {
        var t = ((this._lBlock >>> offset) ^ this._rBlock) & mask;
        this._rBlock ^= t;
        this._lBlock ^= t << offset;
    }

    function exchangeRL(offset, mask) {
        var t = ((this._rBlock >>> offset) ^ this._lBlock) & mask;
        this._lBlock ^= t;
        this._rBlock ^= t << offset;
    }

    
    C.DES = BlockCipher._createHelper(DES);

    
    var TripleDES = C_algo.TripleDES = BlockCipher.extend({
        _doReset: function () {
            
            var key = this._key;
            var keyWords = key.words;

            
            this._des1 = DES.createEncryptor(WordArray.create(keyWords.slice(0, 2)));
            this._des2 = DES.createEncryptor(WordArray.create(keyWords.slice(2, 4)));
            this._des3 = DES.createEncryptor(WordArray.create(keyWords.slice(4, 6)));
        },

        encryptBlock: function (M, offset) {
            this._des1.encryptBlock(M, offset);
            this._des2.decryptBlock(M, offset);
            this._des3.encryptBlock(M, offset);
        },

        decryptBlock: function (M, offset) {
            this._des3.decryptBlock(M, offset);
            this._des2.encryptBlock(M, offset);
            this._des1.decryptBlock(M, offset);
        },

        keySize: 192/32,

        ivSize: 64/32,

        blockSize: 64/32
    });

    
    C.TripleDES = BlockCipher._createHelper(TripleDES);
}());




(function (Math) {
    
    var C = CryptoJS;
    var C_lib = C.lib;
    var WordArray = C_lib.WordArray;
    var Hasher = C_lib.Hasher;
    var C_algo = C.algo;

    
    var T = [];

    
    (function () {
        for (var i = 0; i < 64; i++) {
            T[i] = (Math.abs(Math.sin(i + 1)) * 0x100000000) | 0;
        }
    }());

    
    var MD5 = C_algo.MD5 = Hasher.extend({
        _doReset: function () {
            this._hash = WordArray.create([0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476]);
        },

        _doProcessBlock: function (M, offset) {
            
            for (var i = 0; i < 16; i++) {
                
                var offset_i = offset + i;
                var M_offset_i = M[offset_i];

                
                M[offset_i] = (
                    (((M_offset_i << 8)  | (M_offset_i >>> 24)) & 0x00ff00ff) |
                    (((M_offset_i << 24) | (M_offset_i >>> 8))  & 0xff00ff00)
                );
            }

            
            var H = this._hash.words;

            
            var a = H[0];
            var b = H[1];
            var c = H[2];
            var d = H[3];

            
            for (var i = 0; i < 64; i += 4) {
                if (i < 16) {
                    a = FF(a, b, c, d, M[offset + i],     7,  T[i]);
                    d = FF(d, a, b, c, M[offset + i + 1], 12, T[i + 1]);
                    c = FF(c, d, a, b, M[offset + i + 2], 17, T[i + 2]);
                    b = FF(b, c, d, a, M[offset + i + 3], 22, T[i + 3]);
                } else if (i < 32) {
                    a = GG(a, b, c, d, M[offset + ((i + 1) % 16)],  5,  T[i]);
                    d = GG(d, a, b, c, M[offset + ((i + 6) % 16)],  9,  T[i + 1]);
                    c = GG(c, d, a, b, M[offset + ((i + 11) % 16)], 14, T[i + 2]);
                    b = GG(b, c, d, a, M[offset + (i % 16)],        20, T[i + 3]);
                } else if (i < 48) {
                    a = HH(a, b, c, d, M[offset + ((i * 3 + 5) % 16)],  4,  T[i]);
                    d = HH(d, a, b, c, M[offset + ((i * 3 + 8) % 16)],  11, T[i + 1]);
                    c = HH(c, d, a, b, M[offset + ((i * 3 + 11) % 16)], 16, T[i + 2]);
                    b = HH(b, c, d, a, M[offset + ((i * 3 + 14) % 16)], 23, T[i + 3]);
                } else  {
                    a = II(a, b, c, d, M[offset + ((i * 3) % 16)],      6,  T[i]);
                    d = II(d, a, b, c, M[offset + ((i * 3 + 7) % 16)],  10, T[i + 1]);
                    c = II(c, d, a, b, M[offset + ((i * 3 + 14) % 16)], 15, T[i + 2]);
                    b = II(b, c, d, a, M[offset + ((i * 3 + 5) % 16)],  21, T[i + 3]);
                }
            }

            
            H[0] = (H[0] + a) | 0;
            H[1] = (H[1] + b) | 0;
            H[2] = (H[2] + c) | 0;
            H[3] = (H[3] + d) | 0;
        },

        _doFinalize: function () {
            
            var data = this._data;
            var dataWords = data.words;

            var nBitsTotal = this._nDataBytes * 8;
            var nBitsLeft = data.sigBytes * 8;

            
            dataWords[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);
            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 14] = (
                (((nBitsTotal << 8)  | (nBitsTotal >>> 24)) & 0x00ff00ff) |
                (((nBitsTotal << 24) | (nBitsTotal >>> 8))  & 0xff00ff00)
            );
            data.sigBytes = (dataWords.length + 1) * 4;

            
            this._process();

            
            var H = this._hash.words;

            
            for (var i = 0; i < 4; i++) {
                
                var H_i = H[i];

                
                H[i] = (((H_i << 8)  | (H_i >>> 24)) & 0x00ff00ff) |
                       (((H_i << 24) | (H_i >>> 8))  & 0xff00ff00);
            }
        }
    });

    function FF(a, b, c, d, x, s, t) {
        var n = a + ((b & c) | (~b & d)) + x + t;
        return ((n << s) | (n >>> (32 - s))) + b;
    }

    function GG(a, b, c, d, x, s, t) {
        var n = a + ((b & d) | (c & ~d)) + x + t;
        return ((n << s) | (n >>> (32 - s))) + b;
    }

    function HH(a, b, c, d, x, s, t) {
        var n = a + (b ^ c ^ d) + x + t;
        return ((n << s) | (n >>> (32 - s))) + b;
    }

    function II(a, b, c, d, x, s, t) {
        var n = a + (c ^ (b | ~d)) + x + t;
        return ((n << s) | (n >>> (32 - s))) + b;
    }

    
    C.MD5 = Hasher._createHelper(MD5);

    
    C.HmacMD5 = Hasher._createHmacHelper(MD5);
}(Math));






(function (undefined) {
    
    var C = CryptoJS;
    var C_lib = C.lib;
    var Base = C_lib.Base;
    var X32WordArray = C_lib.WordArray;

    
    var C_x64 = C.x64 = {};

    
    var X64Word = C_x64.Word = Base.extend({
        
        init: function (high, low) {
            this.high = high;
            this.low = low;
        }

        
        
            
            

            
        

        
        
            
            

            
        

        
        
            
            

            
        

        
        
            
            

            
        

        
        
            
                
                
            
                
                
            

            
        

        
        
            
                
                
            
                
                
            

            
        

        
        
            
        

        
        
            
        

        
        
            
            
            

            
        
    });

    
    var X64WordArray = C_x64.WordArray = Base.extend({
        
        init: function (words, sigBytes) {
            words = this.words = words || [];

            if (sigBytes != undefined) {
                this.sigBytes = sigBytes;
            } else {
                this.sigBytes = words.length * 8;
            }
        },

        
        toX32: function () {
            
            var x64Words = this.words;
            var x64WordsLength = x64Words.length;

            
            var x32Words = [];
            for (var i = 0; i < x64WordsLength; i++) {
                var x64Word = x64Words[i];
                x32Words.push(x64Word.high);
                x32Words.push(x64Word.low);
            }

            return X32WordArray.create(x32Words, this.sigBytes);
        },

        
        clone: function () {
            var clone = Base.clone.call(this);

            
            var words = clone.words = this.words.slice(0);

            
            var wordsLength = words.length;
            for (var i = 0; i < wordsLength; i++) {
                words[i] = words[i].clone();
            }

            return clone;
        }
    });
}());





(function () {
    
    var C = CryptoJS;
    var C_lib = C.lib;
    var WordArray = C_lib.WordArray;
    var Hasher = C_lib.Hasher;
    var C_algo = C.algo;

    
    var W = [];

    
    var SHA1 = C_algo.SHA1 = Hasher.extend({
        _doReset: function () {
            this._hash = WordArray.create([0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476, 0xc3d2e1f0]);
        },

        _doProcessBlock: function (M, offset) {
            
            var H = this._hash.words;

            
            var a = H[0];
            var b = H[1];
            var c = H[2];
            var d = H[3];
            var e = H[4];

            
            for (var i = 0; i < 80; i++) {
                if (i < 16) {
                    W[i] = M[offset + i] | 0;
                } else {
                    var n = W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16];
                    W[i] = (n << 1) | (n >>> 31);
                }

                var t = ((a << 5) | (a >>> 27)) + e + W[i];
                if (i < 20) {
                    t += ((b & c) | (~b & d)) + 0x5a827999;
                } else if (i < 40) {
                    t += (b ^ c ^ d) + 0x6ed9eba1;
                } else if (i < 60) {
                    t += ((b & c) | (b & d) | (c & d)) - 0x70e44324;
                } else  {
                    t += (b ^ c ^ d) - 0x359d3e2a;
                }

                e = d;
                d = c;
                c = (b << 30) | (b >>> 2);
                b = a;
                a = t;
            }

            
            H[0] = (H[0] + a) | 0;
            H[1] = (H[1] + b) | 0;
            H[2] = (H[2] + c) | 0;
            H[3] = (H[3] + d) | 0;
            H[4] = (H[4] + e) | 0;
        },

        _doFinalize: function () {
            
            var data = this._data;
            var dataWords = data.words;

            var nBitsTotal = this._nDataBytes * 8;
            var nBitsLeft = data.sigBytes * 8;

            
            dataWords[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);
            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 15] = nBitsTotal;
            data.sigBytes = dataWords.length * 4;

            
            this._process();
        }
    });

    
    C.SHA1 = Hasher._createHelper(SHA1);

    
    C.HmacSHA1 = Hasher._createHmacHelper(SHA1);
}());


(function (Math) {
    
    var C = CryptoJS;
    var C_lib = C.lib;
    var WordArray = C_lib.WordArray;
    var Hasher = C_lib.Hasher;
    var C_algo = C.algo;

    
    var H = [];
    var K = [];

    
    (function () {
        function isPrime(n) {
            var sqrtN = Math.sqrt(n);
            for (var factor = 2; factor <= sqrtN; factor++) {
                if (!(n % factor)) {
                    return false;
                }
            }

            return true;
        }

        function getFractionalBits(n) {
            return ((n - (n | 0)) * 0x100000000) | 0;
        }

        var n = 2;
        var nPrime = 0;
        while (nPrime < 64) {
            if (isPrime(n)) {
                if (nPrime < 8) {
                    H[nPrime] = getFractionalBits(Math.pow(n, 1 / 2));
                }
                K[nPrime] = getFractionalBits(Math.pow(n, 1 / 3));

                nPrime++;
            }

            n++;
        }
    }());

    
    var W = [];

    
    var SHA256 = C_algo.SHA256 = Hasher.extend({
        _doReset: function () {
            this._hash = WordArray.create(H.slice(0));
        },

        _doProcessBlock: function (M, offset) {
            
            var H = this._hash.words;

            
            var a = H[0];
            var b = H[1];
            var c = H[2];
            var d = H[3];
            var e = H[4];
            var f = H[5];
            var g = H[6];
            var h = H[7];

            
            for (var i = 0; i < 64; i++) {
                if (i < 16) {
                    W[i] = M[offset + i] | 0;
                } else {
                    var gamma0x = W[i - 15];
                    var gamma0  = ((gamma0x << 25) | (gamma0x >>> 7))  ^
                                  ((gamma0x << 14) | (gamma0x >>> 18)) ^
                                   (gamma0x >>> 3);

                    var gamma1x = W[i - 2];
                    var gamma1  = ((gamma1x << 15) | (gamma1x >>> 17)) ^
                                  ((gamma1x << 13) | (gamma1x >>> 19)) ^
                                   (gamma1x >>> 10);

                    W[i] = gamma0 + W[i - 7] + gamma1 + W[i - 16];
                }

                var ch  = (e & f) ^ (~e & g);
                var maj = (a & b) ^ (a & c) ^ (b & c);

                var sigma0 = ((a << 30) | (a >>> 2)) ^ ((a << 19) | (a >>> 13)) ^ ((a << 10) | (a >>> 22));
                var sigma1 = ((e << 26) | (e >>> 6)) ^ ((e << 21) | (e >>> 11)) ^ ((e << 7)  | (e >>> 25));

                var t1 = h + sigma1 + ch + K[i] + W[i];
                var t2 = sigma0 + maj;

                h = g;
                g = f;
                f = e;
                e = (d + t1) | 0;
                d = c;
                c = b;
                b = a;
                a = (t1 + t2) | 0;
            }

            
            H[0] = (H[0] + a) | 0;
            H[1] = (H[1] + b) | 0;
            H[2] = (H[2] + c) | 0;
            H[3] = (H[3] + d) | 0;
            H[4] = (H[4] + e) | 0;
            H[5] = (H[5] + f) | 0;
            H[6] = (H[6] + g) | 0;
            H[7] = (H[7] + h) | 0;
        },

        _doFinalize: function () {
            
            var data = this._data;
            var dataWords = data.words;

            var nBitsTotal = this._nDataBytes * 8;
            var nBitsLeft = data.sigBytes * 8;

            
            dataWords[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);
            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 15] = nBitsTotal;
            data.sigBytes = dataWords.length * 4;

            
            this._process();
        }
    });

    
    C.SHA256 = Hasher._createHelper(SHA256);

    
    C.HmacSHA256 = Hasher._createHmacHelper(SHA256);
}(Math));



(function () {
    
    var C = CryptoJS;
    var C_lib = C.lib;
    var Hasher = C_lib.Hasher;
    var C_x64 = C.x64;
    var X64Word = C_x64.Word;
    var X64WordArray = C_x64.WordArray;
    var C_algo = C.algo;

    function X64Word_create() {
      return X64Word.create.apply(X64Word, arguments);
    }

    
    var K = [
        X64Word_create(0x428a2f98, 0xd728ae22), X64Word_create(0x71374491, 0x23ef65cd),
        X64Word_create(0xb5c0fbcf, 0xec4d3b2f), X64Word_create(0xe9b5dba5, 0x8189dbbc),
        X64Word_create(0x3956c25b, 0xf348b538), X64Word_create(0x59f111f1, 0xb605d019),
        X64Word_create(0x923f82a4, 0xaf194f9b), X64Word_create(0xab1c5ed5, 0xda6d8118),
        X64Word_create(0xd807aa98, 0xa3030242), X64Word_create(0x12835b01, 0x45706fbe),
        X64Word_create(0x243185be, 0x4ee4b28c), X64Word_create(0x550c7dc3, 0xd5ffb4e2),
        X64Word_create(0x72be5d74, 0xf27b896f), X64Word_create(0x80deb1fe, 0x3b1696b1),
        X64Word_create(0x9bdc06a7, 0x25c71235), X64Word_create(0xc19bf174, 0xcf692694),
        X64Word_create(0xe49b69c1, 0x9ef14ad2), X64Word_create(0xefbe4786, 0x384f25e3),
        X64Word_create(0x0fc19dc6, 0x8b8cd5b5), X64Word_create(0x240ca1cc, 0x77ac9c65),
        X64Word_create(0x2de92c6f, 0x592b0275), X64Word_create(0x4a7484aa, 0x6ea6e483),
        X64Word_create(0x5cb0a9dc, 0xbd41fbd4), X64Word_create(0x76f988da, 0x831153b5),
        X64Word_create(0x983e5152, 0xee66dfab), X64Word_create(0xa831c66d, 0x2db43210),
        X64Word_create(0xb00327c8, 0x98fb213f), X64Word_create(0xbf597fc7, 0xbeef0ee4),
        X64Word_create(0xc6e00bf3, 0x3da88fc2), X64Word_create(0xd5a79147, 0x930aa725),
        X64Word_create(0x06ca6351, 0xe003826f), X64Word_create(0x14292967, 0x0a0e6e70),
        X64Word_create(0x27b70a85, 0x46d22ffc), X64Word_create(0x2e1b2138, 0x5c26c926),
        X64Word_create(0x4d2c6dfc, 0x5ac42aed), X64Word_create(0x53380d13, 0x9d95b3df),
        X64Word_create(0x650a7354, 0x8baf63de), X64Word_create(0x766a0abb, 0x3c77b2a8),
        X64Word_create(0x81c2c92e, 0x47edaee6), X64Word_create(0x92722c85, 0x1482353b),
        X64Word_create(0xa2bfe8a1, 0x4cf10364), X64Word_create(0xa81a664b, 0xbc423001),
        X64Word_create(0xc24b8b70, 0xd0f89791), X64Word_create(0xc76c51a3, 0x0654be30),
        X64Word_create(0xd192e819, 0xd6ef5218), X64Word_create(0xd6990624, 0x5565a910),
        X64Word_create(0xf40e3585, 0x5771202a), X64Word_create(0x106aa070, 0x32bbd1b8),
        X64Word_create(0x19a4c116, 0xb8d2d0c8), X64Word_create(0x1e376c08, 0x5141ab53),
        X64Word_create(0x2748774c, 0xdf8eeb99), X64Word_create(0x34b0bcb5, 0xe19b48a8),
        X64Word_create(0x391c0cb3, 0xc5c95a63), X64Word_create(0x4ed8aa4a, 0xe3418acb),
        X64Word_create(0x5b9cca4f, 0x7763e373), X64Word_create(0x682e6ff3, 0xd6b2b8a3),
        X64Word_create(0x748f82ee, 0x5defb2fc), X64Word_create(0x78a5636f, 0x43172f60),
        X64Word_create(0x84c87814, 0xa1f0ab72), X64Word_create(0x8cc70208, 0x1a6439ec),
        X64Word_create(0x90befffa, 0x23631e28), X64Word_create(0xa4506ceb, 0xde82bde9),
        X64Word_create(0xbef9a3f7, 0xb2c67915), X64Word_create(0xc67178f2, 0xe372532b),
        X64Word_create(0xca273ece, 0xea26619c), X64Word_create(0xd186b8c7, 0x21c0c207),
        X64Word_create(0xeada7dd6, 0xcde0eb1e), X64Word_create(0xf57d4f7f, 0xee6ed178),
        X64Word_create(0x06f067aa, 0x72176fba), X64Word_create(0x0a637dc5, 0xa2c898a6),
        X64Word_create(0x113f9804, 0xbef90dae), X64Word_create(0x1b710b35, 0x131c471b),
        X64Word_create(0x28db77f5, 0x23047d84), X64Word_create(0x32caab7b, 0x40c72493),
        X64Word_create(0x3c9ebe0a, 0x15c9bebc), X64Word_create(0x431d67c4, 0x9c100d4c),
        X64Word_create(0x4cc5d4be, 0xcb3e42b6), X64Word_create(0x597f299c, 0xfc657e2a),
        X64Word_create(0x5fcb6fab, 0x3ad6faec), X64Word_create(0x6c44198c, 0x4a475817)
    ];

    
    var W = [];
    (function () {
        for (var i = 0; i < 80; i++) {
            W[i] = X64Word_create();
        }
    }());

    
    var SHA512 = C_algo.SHA512 = Hasher.extend({
        _doReset: function () {
            this._hash = X64WordArray.create([
                X64Word_create(0x6a09e667, 0xf3bcc908), X64Word_create(0xbb67ae85, 0x84caa73b),
                X64Word_create(0x3c6ef372, 0xfe94f82b), X64Word_create(0xa54ff53a, 0x5f1d36f1),
                X64Word_create(0x510e527f, 0xade682d1), X64Word_create(0x9b05688c, 0x2b3e6c1f),
                X64Word_create(0x1f83d9ab, 0xfb41bd6b), X64Word_create(0x5be0cd19, 0x137e2179)
            ]);
        },

        _doProcessBlock: function (M, offset) {
            
            var H = this._hash.words;

            var H0 = H[0];
            var H1 = H[1];
            var H2 = H[2];
            var H3 = H[3];
            var H4 = H[4];
            var H5 = H[5];
            var H6 = H[6];
            var H7 = H[7];

            var H0h = H0.high;
            var H0l = H0.low;
            var H1h = H1.high;
            var H1l = H1.low;
            var H2h = H2.high;
            var H2l = H2.low;
            var H3h = H3.high;
            var H3l = H3.low;
            var H4h = H4.high;
            var H4l = H4.low;
            var H5h = H5.high;
            var H5l = H5.low;
            var H6h = H6.high;
            var H6l = H6.low;
            var H7h = H7.high;
            var H7l = H7.low;

            
            var ah = H0h;
            var al = H0l;
            var bh = H1h;
            var bl = H1l;
            var ch = H2h;
            var cl = H2l;
            var dh = H3h;
            var dl = H3l;
            var eh = H4h;
            var el = H4l;
            var fh = H5h;
            var fl = H5l;
            var gh = H6h;
            var gl = H6l;
            var hh = H7h;
            var hl = H7l;

            
            for (var i = 0; i < 80; i++) {
                
                var Wi = W[i];

                
                if (i < 16) {
                    var Wih = Wi.high = M[offset + i * 2]     | 0;
                    var Wil = Wi.low  = M[offset + i * 2 + 1] | 0;
                } else {
                    
                    var gamma0x  = W[i - 15];
                    var gamma0xh = gamma0x.high;
                    var gamma0xl = gamma0x.low;
                    var gamma0h  = ((gamma0xl << 31) | (gamma0xh >>> 1)) ^ ((gamma0xl << 24) | (gamma0xh >>> 8)) ^ (gamma0xh >>> 7);
                    var gamma0l  = ((gamma0xh << 31) | (gamma0xl >>> 1)) ^ ((gamma0xh << 24) | (gamma0xl >>> 8)) ^ ((gamma0xh << 25) | (gamma0xl >>> 7));

                    
                    var gamma1x  = W[i - 2];
                    var gamma1xh = gamma1x.high;
                    var gamma1xl = gamma1x.low;
                    var gamma1h  = ((gamma1xl << 13) | (gamma1xh >>> 19)) ^ ((gamma1xh << 3) | (gamma1xl >>> 29)) ^ (gamma1xh >>> 6);
                    var gamma1l  = ((gamma1xh << 13) | (gamma1xl >>> 19)) ^ ((gamma1xl << 3) | (gamma1xh >>> 29)) ^ ((gamma1xh << 26) | (gamma1xl >>> 6));

                    
                    var Wi7  = W[i - 7];
                    var Wi7h = Wi7.high;
                    var Wi7l = Wi7.low;

                    var Wi16  = W[i - 16];
                    var Wi16h = Wi16.high;
                    var Wi16l = Wi16.low;

                    
                    var Wil = gamma0l + Wi7l;
                    var Wih = gamma0h + Wi7h + ((Wil >>> 0) < (gamma0l >>> 0) ? 1 : 0);
                    var Wil = Wil + gamma1l;
                    var Wih = Wih + gamma1h + ((Wil >>> 0) < (gamma1l >>> 0) ? 1 : 0);
                    var Wil = Wil + Wi16l;
                    var Wih = Wih + Wi16h + ((Wil >>> 0) < (Wi16l >>> 0) ? 1 : 0);

                    Wi.high = Wih;
                    Wi.low  = Wil;
                }

                
                var chh  = (eh & fh) ^ (~eh & gh);
                var chl  = (el & fl) ^ (~el & gl);

                
                var majh = (ah & bh) ^ (ah & ch) ^ (bh & ch);
                var majl = (al & bl) ^ (al & cl) ^ (bl & cl);

                
                var sigma0h = ((al << 4) | (ah >>> 28)) ^ ((ah << 30) | (al >>> 2)) ^ ((ah << 25) | (al >>> 7));
                var sigma0l = ((ah << 4) | (al >>> 28)) ^ ((al << 30) | (ah >>> 2)) ^ ((al << 25) | (ah >>> 7));

                
                var sigma1h = ((el << 18) | (eh >>> 14)) ^ ((el << 14) | (eh >>> 18)) ^ ((eh << 23) | (el >>> 9));
                var sigma1l = ((eh << 18) | (el >>> 14)) ^ ((eh << 14) | (el >>> 18)) ^ ((el << 23) | (eh >>> 9));

                
                var Ki  = K[i];
                var Kih = Ki.high;
                var Kil = Ki.low;

                
                var t1l = hl + sigma1l;
                var t1h = hh + sigma1h + ((t1l >>> 0) < (hl >>> 0) ? 1 : 0);
                var t1l = t1l + chl;
                var t1h = t1h + chh + ((t1l >>> 0) < (chl >>> 0) ? 1 : 0);
                var t1l = t1l + Kil;
                var t1h = t1h + Kih + ((t1l >>> 0) < (Kil >>> 0) ? 1 : 0);
                var t1l = t1l + Wil;
                var t1h = t1h + Wih + ((t1l >>> 0) < (Wil >>> 0) ? 1 : 0);

                
                var t2l = sigma0l + majl;
                var t2h = sigma0h + majh + ((t2l >>> 0) < (sigma0l >>> 0) ? 1 : 0);

                
                hh = gh;
                hl = gl;
                gh = fh;
                gl = fl;
                fh = eh;
                fl = el;
                el = (dl + t1l) | 0;
                eh = (dh + t1h + ((el >>> 0) < (dl >>> 0) ? 1 : 0)) | 0;
                dh = ch;
                dl = cl;
                ch = bh;
                cl = bl;
                bh = ah;
                bl = al;
                al = (t1l + t2l) | 0;
                ah = (t1h + t2h + ((al >>> 0) < (t1l >>> 0) ? 1 : 0)) | 0;
            }

            
            H0l = H0.low = (H0l + al) | 0;
            H0.high = (H0h + ah + ((H0l >>> 0) < (al >>> 0) ? 1 : 0)) | 0;
            H1l = H1.low = (H1l + bl) | 0;
            H1.high = (H1h + bh + ((H1l >>> 0) < (bl >>> 0) ? 1 : 0)) | 0;
            H2l = H2.low = (H2l + cl) | 0;
            H2.high = (H2h + ch + ((H2l >>> 0) < (cl >>> 0) ? 1 : 0)) | 0;
            H3l = H3.low = (H3l + dl) | 0;
            H3.high = (H3h + dh + ((H3l >>> 0) < (dl >>> 0) ? 1 : 0)) | 0;
            H4l = H4.low = (H4l + el) | 0;
            H4.high = (H4h + eh + ((H4l >>> 0) < (el >>> 0) ? 1 : 0)) | 0;
            H5l = H5.low = (H5l + fl) | 0;
            H5.high = (H5h + fh + ((H5l >>> 0) < (fl >>> 0) ? 1 : 0)) | 0;
            H6l = H6.low = (H6l + gl) | 0;
            H6.high = (H6h + gh + ((H6l >>> 0) < (gl >>> 0) ? 1 : 0)) | 0;
            H7l = H7.low = (H7l + hl) | 0;
            H7.high = (H7h + hh + ((H7l >>> 0) < (hl >>> 0) ? 1 : 0)) | 0;
        },

        _doFinalize: function () {
            
            var data = this._data;
            var dataWords = data.words;

            var nBitsTotal = this._nDataBytes * 8;
            var nBitsLeft = data.sigBytes * 8;

            
            dataWords[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);
            dataWords[(((nBitsLeft + 128) >>> 10) << 5) + 31] = nBitsTotal;
            data.sigBytes = dataWords.length * 4;

            
            this._process();

            
            this._hash = this._hash.toX32();
        },

        blockSize: 1024/32
    });

    
    C.SHA512 = Hasher._createHelper(SHA512);

    
    C.HmacSHA512 = Hasher._createHmacHelper(SHA512);
}());



CryptoJS.mode.CFB = (function () {
    var CFB = CryptoJS.lib.BlockCipherMode.extend();

    CFB.Encryptor = CFB.extend({
        processBlock: function (words, offset) {
            
            var cipher = this._cipher;
            var blockSize = cipher.blockSize;

            generateKeystreamAndEncrypt.call(this, words, offset, blockSize, cipher);

            
            this._prevBlock = words.slice(offset, offset + blockSize);
        }
    });

    CFB.Decryptor = CFB.extend({
        processBlock: function (words, offset) {
            
            var cipher = this._cipher;
            var blockSize = cipher.blockSize;

            
            var thisBlock = words.slice(offset, offset + blockSize);

            generateKeystreamAndEncrypt.call(this, words, offset, blockSize, cipher);

            
            this._prevBlock = thisBlock;
        }
    });

    function generateKeystreamAndEncrypt(words, offset, blockSize, cipher) {
        
        var iv = this._iv;

        
        if (iv) {
            var keystream = iv.slice(0);

            
            this._iv = undefined;
        } else {
            var keystream = this._prevBlock;
        }
        cipher.encryptBlock(keystream, 0);

        
        for (var i = 0; i < blockSize; i++) {
            words[offset + i] ^= keystream[i];
        }
    }

    return CFB;
}());


CryptoJS.mode.ECB = (function () {
    var ECB = CryptoJS.lib.BlockCipherMode.extend();

    ECB.Encryptor = ECB.extend({
        processBlock: function (words, offset) {
            this._cipher.encryptBlock(words, offset);
        }
    });

    ECB.Decryptor = ECB.extend({
        processBlock: function (words, offset) {
            this._cipher.decryptBlock(words, offset);
        }
    });

    return ECB;
}());


CryptoJS.mode.OFB = (function () {
    var OFB = CryptoJS.lib.BlockCipherMode.extend();

    var Encryptor = OFB.Encryptor = OFB.extend({
        processBlock: function (words, offset) {
            
            var cipher = this._cipher
            var blockSize = cipher.blockSize;
            var iv = this._iv;
            var keystream = this._keystream;

            
            if (iv) {
                keystream = this._keystream = iv.slice(0);

                
                this._iv = undefined;
            }
            cipher.encryptBlock(keystream, 0);

            
            for (var i = 0; i < blockSize; i++) {
                words[offset + i] ^= keystream[i];
            }
        }
    });

    OFB.Decryptor = Encryptor;

    return OFB;
}());

CryptoJS.mode.CTR = (function () {
    var CTR = CryptoJS.lib.BlockCipherMode.extend();

    var Encryptor = CTR.Encryptor = CTR.extend({
        processBlock: function (words, offset) {
            
            var cipher = this._cipher
            var blockSize = cipher.blockSize;
            var iv = this._iv;
            var counter = this._counter;

            
            if (iv) {
                counter = this._counter = iv.slice(0);

                
                this._iv = undefined;
            }
            var keystream = counter.slice(0);
            cipher.encryptBlock(keystream, 0);

            
            counter[blockSize - 1] = (counter[blockSize - 1] + 1) | 0

            
            for (var i = 0; i < blockSize; i++) {
                words[offset + i] ^= keystream[i];
            }
        }
    });

    CTR.Decryptor = Encryptor;

    return CTR;
}());



CryptoJS.pad.ZeroPadding = {
    pad: function (data, blockSize) {
        
        var blockSizeBytes = blockSize * 4;

        
        data.clamp();
        data.sigBytes += blockSizeBytes - ((data.sigBytes % blockSizeBytes) || blockSizeBytes);
    },

    unpad: function (data) {
        
        var dataWords = data.words;

        
        var i = data.sigBytes - 1;
        while (!((dataWords[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff)) {
            i--;
        }
        data.sigBytes = i + 1;
    }
};





CryptoJS.pad.NoPadding = {
    pad: function () {
    },

    unpad: function () {
    }
};


CryptoJS.pad.Iso97971 = {
    pad: function (data, blockSize) {
        
        data.concat(CryptoJS.lib.WordArray.create([0x80000000], 1));

        
        CryptoJS.pad.ZeroPadding.pad(data, blockSize);
    },

    unpad: function (data) {
        
        CryptoJS.pad.ZeroPadding.unpad(data);

        
        data.sigBytes--;
    }
};



CryptoJS.pad.Iso10126 = {
    pad: function (data, blockSize) {
        
        var blockSizeBytes = blockSize * 4;

        
        var nPaddingBytes = blockSizeBytes - data.sigBytes % blockSizeBytes;

        
        data.concat(CryptoJS.lib.WordArray.random(nPaddingBytes - 1)).
             concat(CryptoJS.lib.WordArray.create([nPaddingBytes << 24], 1));
    },

    unpad: function (data) {
        
        var nPaddingBytes = data.words[(data.sigBytes - 1) >>> 2] & 0xff;

        
        data.sigBytes -= nPaddingBytes;
    }
};



voltmx.worker = (function() {
    
    

    var module = {
        
        WorkerThread: function(sURL, fDefListener, fOnError) {
            $KU.logExecuting('voltmx.worker.WorkerThread');
            if(sURL === undefined || sURL === null || sURL === '') {
                $KU.logErrorMessage('Invalid parameters');
                throw new VoltmxError(3001, "WorkerThreadError", "WorkerThread: MissingMandatoryParameter. Failed to construct WorkerThread");
            }
            if(typeof sURL !== "string") {
                $KU.logErrorMessage('Invalid parameters');
                throw new VoltmxError(3002, "WorkerThreadError", "WorkerThread: InvalidParameter. Invalid script name");
            }
            $KU.logExecutingWithParams('voltmx.worker.WorkerThread', sURL, fDefListener, fOnError);
            var oInstance = this, workerBasePath = '';
            
            if(typeof nestedWorker === "undefined") {
                workerBasePath = voltmx.appinit.getStaticContentPath() + $KG["platformver"] + "jslib/";
            } else {
                workerBasePath = 'jslib/';
            }

            this.oWorker = new Worker(workerBasePath + "voltmxworkerinit.js");

            var kgAppMode = $KG["appmode"] || "";
            var kgAppID = $KG["appid"] || "";
            var kgSkipProxy = $KG["skipproxy"] || "";
            var kgRcid = $KG["rcid"] || "";
            var isFMSupported = false;
            var kgUserAgent = voltmx.os.userAgent();
            if(typeof $KG["functionalModules"] !== "undefined")
                isFMSupported = true;

            
            this.oWorker.postMessage({
                    moduleName: sURL,
                    contextPath: workerBasePath,
                    kgAppMode: kgAppMode,
                    kgAppID: kgAppID,
                    kgSkipProxy: kgSkipProxy,
                    kgRcid: kgRcid,
                    isFMSupported: isFMSupported,
                    kgUserAgent: kgUserAgent
                }),
                
                oInstance.defaultListener = fDefListener || function(event) {
                    voltmx.print("Data: " + event.data)
                };
            
            oInstance.defaultErrorListener = fOnError || function(e) {
                voltmx.print(e.message + " : in file - " + e.filename + " at location :" + e.lineno + "," + e.colno);
            };
            this.oWorker.addEventListener("error", oInstance.defaultErrorListener);


            
            $KU.logExecutingFinished('voltmx.worker.WorkerThread');
        },

        hasWorkerThreadSupport: function() {
            $KU.logExecuting('voltmx.worker.hasWorkerThreadSupport');
            $KU.logExecutingWithParams('voltmx.worker.hasWorkerThreadSupport');
            if(typeof Worker === "undefined") {
                $KU.logErrorMessage('Worker not defined');
                return false;
            }
            $KU.logExecutingFinished('voltmx.worker.hasWorkerThreadSupport');
            return true;
        }
    };

    
    module.WorkerThread.prototype.postMessage = function(vMsg) {
        $KU.logExecuting('worker.postMessage');
        if(vMsg === undefined || vMsg === null || vMsg === '') {
            $KU.logErrorMessage('postMessage: MissingMandatoryParameter. Message undefined');
            throw new VoltmxError(3001, "WorkerThreadError", "postMessage: MissingMandatoryParameter. Message undefined");
        }
        if(typeof vMsg === "number" || typeof vMsg === "boolean" || typeof vMsg === "function") {
            $KU.logErrorMessage('postMessage: InvalidParameter. Invalid Message');
            throw new VoltmxError(3002, "WorkerThreadError", "postMessage: InvalidParameter. Invalid Message");
        }
        $KU.logExecutingWithParams('worker.postMessage', vMsg);
        try {
            Worker.prototype.postMessage.call(this.oWorker, vMsg);
            $KU.logExecutingFinished('worker.postMessage');
        } catch(err) {
            $KU.logErrorMessage('postMessage: InvalidParameter. Invalid Message');
            voltmx.print("Error occured in WorkerThread postMessage: " + err.message);
            throw new VoltmxError(3002, "WorkerThreadError", "postMessage: InvalidParameter. Invalid Message");
        }
    };

    
    module.WorkerThread.prototype.terminate = function() {
        $KU.logExecuting('worker.terminate');
        $KU.logExecutingWithParams('worker.terminate');
        Worker.prototype.terminate.call(this.oWorker);
        $KU.logExecutingFinished('worker.terminate');
    };

    
    module.WorkerThread.prototype.addEventListener = function(sName, fListener) {
        $KU.logExecuting('worker.addEventListener');
        if(arguments.length < 2) {
            $KU.logErrorMessage('addEventListener: MissingMandatoryParameter. Mandatory arguments missing');
            throw new VoltmxError(3001, "WorkerThreadError", "addEventListener: MissingMandatoryParameter. Mandatory arguments missing"); 
        }
        if(typeof arguments[0] != "string" || typeof arguments[1] != "function") {
            $KU.logErrorMessage('addEventListener: InvalidParameter. Invalid arguments');
            throw new VoltmxError(3002, "WorkerThreadError", "addEventListener: InvalidParameter. Invalid arguments");
        }
        if(sName != "message" && sName != "error") {
            $KU.logErrorMessage('addEventListener: InvalidParameter. Invalid arguments');
            throw new VoltmxError(3002, "WorkerThreadError", "addEventListener: InvalidParameter. Invalid arguments");
        }
        $KU.logExecutingWithParams('worker.addEventListener', sName, fListener);
        fListener = fListener ? fListener : this.defaultListener;
        Worker.prototype.addEventListener.call(this.oWorker, sName, fListener, false);
        if("error" === sName) {
            Worker.prototype.removeEventListener.call(this.oWorker, "error", this.defaultErrorListener, false);
        }
        $KU.logExecutingFinished('worker.addEventListener');
    };

    
    module.WorkerThread.prototype.removeEventListener = function(sName, fListener) {
        $KU.logExecuting('worker.removeEventListener');
        if(arguments.length < 2) {
            $KU.logErrorMessage('removeEventListener: MissingMandatoryParameter. Mandatory arguments missing');
            throw new VoltmxError(3001, "WorkerThreadError", "removeEventListener: MissingMandatoryParameter. Mandatory arguments missing"); 
        }
        if(typeof arguments[0] != "string" || typeof arguments[1] != "function") {
            $KU.logErrorMessage('removeEventListener: InvalidParameter. Invalid arguments');
            throw new VoltmxError(3002, "WorkerThreadError", "removeEventListener: InvalidParameter. Invalid arguments");
        }
        if(sName != "message" && sName != "error") {
            $KU.logErrorMessage('removeEventListener: InvalidParameter. Invalid arguments');
            throw new VoltmxError(3002, "WorkerThreadError", "removeEventListener: InvalidParameter. Invalid arguments");
        }
        $KU.logExecutingWithParams('worker.removeEventListener', sName, fListener);
        Worker.prototype.removeEventListener.call(this.oWorker, sName, fListener, false);
        if("error" === sName) {
            Worker.prototype.addEventListener.call(this.oWorker, "error", this.defaultErrorListener, false);
        }
        $KU.logExecutingFinished('worker.removeEventListener');
    };


    return module;
}());
