
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
