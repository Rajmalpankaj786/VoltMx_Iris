
var ns = {};

(function(ns) {

    ns.constants = {

        /* APP Settings constants*/
        APP_VERSION : "appversionkey",
        APPID : "appidkey",
        BUILD : "build",
        DEVICE_MESSAGE : "devicemsg",
        DEVICE_EXCEPTION : "deviceexception",
        CURRENT_GA_VERSION : "currentgaversion",
        CREATED_VIZ_VERSION : "createdVizVersion",
        DEFAULT_THEME : "defaulttheme",
        APP_TITLE : "apptitle",
        DEFAULT_LOCALE : "defaultlocalekey",
        LOCALES : "locales",

        /*base font  constants */
        IPHONE_BASE_FONT : "wap_ip_fontsize",
        ANDORID_BASE_FONTSIZE : "wap_android_fontsize",
        ANDROID320_BASE_FONTSIZE : "wap_android320_fontsize",
        ANDROID360_BASE_FONTSIZE : "wap_android360_fontsize",
        ANDROID400_BASE_FONTSIZE : "wap_android400_fontsize",
        ANDROID440_BASE_FONTSIZE : "wap_android440_fontsize",
        ANDROID480_BASE_FONTSIZE : "wap_android480_fontsize",
        ANDROID640_BASE_FONTSIZE : "wap_android640_fontsize",

        BB240_BASE_FONTSIZE : "wap-bb240-fontsize",
        BB320_BASE_FONTSIZE : "wap-bb320-fontsize",
        BB360_BASE_FONTSIZE : "wap-bb360-fontsize",
        BB400_BASE_FONTSIZE : "wap-bb400-fontsize",
        BB480_BASE_FONTSIZE : "wap-bb480-fontsize",
        BB640_BASE_FONTSIZE : "wap-bb640-fontsize",

        IPAD_TABLET_FONTSIZE : "spaipadbasefontsize",
        ANDROID_TABLET_FONTSIZE : "wap_spaandroidtab_fontsize",
        ANDROID_TABLET_LDPI_FONTSIZE : "wap_spaandroidtabldpi_fontsize",
        ANDROID_TABLET_MDPI_FONTSIZE : "wap_spaandroidtabmdpi_fontsize",
        ANDROID_TABLET_HDPI_FONTSIZE : "wap_spaandroidtabhdpi_fontsize",


        /*SPA and Desktopweb settings constants */

        PHONE_FORMAT : "tcphoneformatindicator",
        GPS_ENABLED : "tcrequiresGPSfuctionality",

        APPLE_ICON : "appleicon",
        FAVICON_KEY : "favicon",
        DW_FAVICON_KEY : "desktopwebfavico",

        MANIFEST_JSON : "manifest_json",
        DESKTOPWEB_MANIFEST_JSON : "dwmanifest_json",
        SPA_ENABLE_XFS : "enablexfsspa",
        SPA_NOSCRIPT_MESSAGE : "noscriptmessage",
        SPA_ENABLE_OFFLINE : "enableOfflineObjectsSpa",
        SPA_MANIFEST_JSON : "spamanifestjson",

        DW_TITLE : "desktopwebtitle",
        DW_ALIGN_OPTION : "desktopwebaligenmentoption",
        DW_BASE_FONT_SIZE : "desktopwebbasefontsize",
        DW_SCREEN_WIDTH_OPTION : "desktopwebwidthoption",
        DW_SCREEN_WIDTH : "desktopwebwidthval",

        DW_MANIFEST_JSON : "desktopwebmanifestjson",
        DW_ENABLE_RESPONSIVE_WEB : "enableResponsive",
        DW_ENABLE_PROGRESSIVE_WEB : "enableProgressiveWeb",
        DW_ENABLE_XFS : "enablexfsdw",
        DW_ENABLE_OFFLINE : "enableOfflineObjectsDW",
        DW_NOSCRIPT_MESSAGE : "desktopwebnoscriptmessage",
        METATAGS : "metatags",
        WEBCSSLIST : "webcsslist",
        WEBJSLIST : "webjslist",
        WEBHEADERTAGS : "webheadertags",

        /* List of Channels */
        SPA_PLATFORM : "spa",
        DESKTOP_PLATFORM : "desktopweb",
        SPA_IPHONE_PLATFORM : "spaip",
        SPA_ANDROID_PLATFORM : "spaan",
        SPA_BB_PLATFORM : "spabb",
        SPA_NTH_PLATFORM : "spabbnth",
        SPA_WINDOWS_PLATFORM : "spawindows",
        SPA_WINPHONE8_PLATFORM : "spawinphone8",
        SPA_WRAPPER_IPHONE_PLATFORM : "ipwrapper",
        SPA_WRAPPER_IPAD_PLATFORM : "ipadwrapper",
        SPA_WRAPPER_ANDROID_PLATFORM : "anwrapper",
        SPA_WRAPPER_ANDROIDTAB_PLATFORM : "tabandroidwrapper",
        SPA_WRAPPER_BB_PLATFORM : "bbwrapper",
        SPA_MIXED_IPHONE_PLATFORM : "iphybrid",
        SPA_MIXED_IPAD_PLATFORM : "ipadhybrid",
        SPA_MIXED_ANDROID_PLATFORM : "anhybrid",
        SPA_MIXED_ANDROIDTAB_PLATFORM : "tabandroidhybrid",
        SPA_MIXED_BB_PLATFORM : "bbhybrid",
        SPA_IPAD_PLATFORM : "spaipad",
        SPA_ANDROIDTAB_PLATFORM : "spatabandroid",
        SPA_PLAYBOOK_PLATFORM : "spaplaybook",
        SPA_WINDOWSTAB_PLATFORM : "spatabwindows"
    }

})(ns);

module.exports = ns;