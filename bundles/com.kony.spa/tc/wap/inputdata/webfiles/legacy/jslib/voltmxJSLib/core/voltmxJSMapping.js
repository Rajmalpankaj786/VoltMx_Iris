
if($KI.crypto) {
    voltmx.crypto = {
            newKey: $KI.crypto.newkey,
            saveKey: $KI.crypto.savekey,
            createHash: $KI.crypto.createhash,
            retrievePublicKey: $KI.crypto.retrievepublickey,
            deleteKey: $KI.crypto.deletekey,
            readKey: $KI.crypto.readkey,
            encrypt: $KI.crypto.encrypt,
            decrypt: $KI.crypto.decrypt,
            createHMacHash: $KI.crypto.createHMacHash,
            createPBKDF2Key: $KI.crypto.createPBKDF2Key,
            generateSecureRandom: $KI.crypto.generateSecureRandom
    };
}


if ($KI.db) {
    voltmx.db = {
        openDatabase: $KI.db.opendatabase,
        transaction: $KI.db.transaction,
        readTransaction: $KI.db.readtransaction,
        executeSql: $KI.db.executesql,
        sqlResultsetRowItem:$KI.db.sqlresultsetrowitem,
        changeVersion: $KI.db.changeversion
    };
}


if($KI.ds) {
    voltmx.ds = {
        "delete" : $KI.ds.Delete,
        remove: $KI.ds.Delete,
        read : $KI.ds.read,
        save : $KI.ds.save
    };
}


if($KI.i18n) {
    voltmx.i18n = {
        deleteResourceBundle: $KI.i18n.deleteresourcebundle,
        getLocalizedString: $KI.i18n.getlocalizedstring,
        getCurrentLocale: $KI.i18n.getcurrentlocale,
        isResourceBundlePresent: $KI.i18n.isresourcebundlepresent,
        setCurrentLocale: $KI.i18n.setcurrentlocale,
        setCurrentLocaleAsync: $KI.i18n.setcurrentlocaleasync,
        setDefaultLocale: $KI.i18n.setdefaultlocale,
        setDefaultLocaleAsync: $KI.i18n.setdefaultlocaleasync,
        setResourceBundle: $KI.i18n.setresourcebundle,
        updateResourceBundle:$KI.i18n.updateresourcebundle,
        getCurrentDeviceLocale:$KI.i18n.getcurrentdevicelocale,
        getSupportedLocales:$KI.i18n.getsupportedlocales,
        isLocaleSupportedByDevice:$KI.i18n.islocalesupportedbydevice,
        setLocaleLayoutConfig:$KI.i18n.setlocalelayoutconfig
    };
}


if($KI.localstorage) {
    voltmx.store = {
        key: $KI.localstorage.key,
        getItem: $KI.localstorage.getitem,
        removeItem: $KI.localstorage.removeitem,
        setItem: $KI.localstorage.setitem,
        clear: $KI.localstorage.clear,
        length: $KI.localstorage.length
    };
}


if($KI.geolocation) {
    voltmx.location = {
        clearWatch: $KI.geolocation.clearwatch,
        getCurrentPosition: $KI.geolocation.getcurrentposition,
        watchPosition: $KI.geolocation.watchposition,
        PERMISSION_DENIED: 1,
        POSITION_UNAVAILABLE: 2,
        TIMEOUT: 3
    };
}




if($KI.os) {
    voltmx.os = {
        toNumber: $KI.os.tonumber,
        toCurrency: $KI.os.tocurrency,
        freeMemory: $KI.os.freememory,
        userAgent: $KI.os.useragent,
        deviceInfo: $KI.os.platform,  
        hasGPSSupport: $KI.os.hasgpssupport,  
        hasCameraSupport: $KI.os.hascamerasupport,
        hasTouchSupport: $KI.os.hastouchsupport,
        hasOrientationSupport: $KI.os.hasorientationsupport,
        hasAccelerometerSupport: $KI.os.hasaccelerometersupport,
        getDeviceCurrentOrientation: $KI.os.getdevicecurrentorientation,
        httpheaders: $KI.os.httpheaders,
        getApplicationMode : $KI.os.getapplicationmode,
        setApplicationMode : $KI.os.setapplicationmode,
        setApplicationScrollMode : $KI.os.setapplicationscrollmode,
        getAppContext: $KI.os.getappcontext,
        print: tobeimplemented,
        addHiddenField : tobeimplemented,
        getBatteryLevel : tobeimplemented,
        getBatteryState : tobeimplemented,
        readHiddenField : tobeimplemented,
        registerBatteryChange : tobeimplemented,
        removeAllMetaTags : tobeimplemented,
        removeMetaTag  : tobeimplemented,
        startSecureTransaction : tobeimplemented,
        unregisterBatteryChange : tobeimplemented,

        
        RESOURCE_LOCATION : 0,
        RESOURCE_CAMERA : 1,
        RESOURCE_PHOTO_GALLERY : 2,
        RESOURCE_CONTACTS : 3,
        RESOURCE_CALENDAR : 4,
        RESOURCE_EXTERNAL_STORAGE : 5
    };
}


if($KI.net) {
    voltmx.net = {
        HttpRequest : $KI.net.HttpRequest,
        FormData : $KI.net.FormData,
        MultipartFormData : $KI.net.MultipartFormData,
        invokeServiceAsync : $KI.net.invokeserviceasync,
        invokeService : $KI.net.invokeService,
        cancel : $KI.net.cancel,
        isNetworkAvailable : $KI.net.isNetworkAvailable,
        setNetworkCallbacks : $KI.net.setNetworkCallbacks,
        getActiveNetworkType : $KI.net.getActiveNetworkType,
        getCookies : $KI.net.getCookies,
        clearCookies : $KI.net.clearCookies,
        loadClientCertificate : $KI.net.loadClientCertificate,
        removeAllCachedResponses : $KI.net.removeAllCachedResponses,
        removeIntegrityCheck : $KI.net.removeIntegrityCheck,
        setIntegrityCheck : $KI.net.setIntegrityCheck,
        urlDecode : $KI.net.urlDecode,
        urlEncode : $KI.net.urlEncode
    };
}


if($KI.phone) {
    voltmx.phone = {
        dial: $KI.phone.dial,
        openMediaGallery: $KI.phone.openmediagallery, 
        addCalendarEvent: $KI.phone.addCalendarEvent,
        findCalendarEvents: $KI.phone.findCalendarEvents,
        openEmail: $KI.phone.openEmail,
        removeCalendarEvent: $KI.phone.removeCalendarEvent,
        sendSMS: $KI.phone.sendSMS
    };
}




if($KI.string) {
    voltmx.string = {
        rep: $KI.string.rep,
        reverse: $KI.string.reverse,
        trim: $KI.string.trim,
        equalsIgnoreCase: $KI.string.equalsignorecase,
        startsWith: $KI.string.startswith,
        endsWith: $KI.string.endswith,
        isNumeric: $KI.string.isnumeric,
        containsChars: $KI.string.containschars,
        containsOnlyGivenChars: $KI.string.containsonlygivenchars,
        containsNoGivenChars: $KI.string.containsnogivenchars,
        isAsciiAlpha: $KI.string.isasciialpha,
        isAsciiAlphaNumeric: $KI.string.isasciialphanumeric,
        isValidEmail: $KI.string.isvalidemail
    };
}


if($KI.timer) {
    voltmx.timer = {
        schedule: $KI.timer.schedule,
        cancel: $KI.timer.cancel,
        setCallBack: $KI.timer.setcallback
    };
}


if($KI.themes) {
    voltmx.theme = {
        createTheme: $KI.themes.createtheme,
        deleteTheme: $KI.themes.deletetheme,
        getCurrentThemeData: $KI.themes.getcurrentthemedata,
        getCurrentTheme: $KI.themes.getcurrenttheme,
        getAllThemes: $KI.themes.allthemes,
        isThemePresent: $KI.themes.isthemepresent,
        setCurrentTheme: $KI.themes.setcurrenttheme,
        packagedthemes:$KI.themes.packagedthemes
    };
}

voltmx.convertToBase64 = $KI.converttobase64;
voltmx.convertToRawBytes = $KI.converttorawbytes;

voltmx.print = $KI.print;
voltmx.props = {};
voltmx.props.getProperty = $KI.props.getProperty;



if(!voltmx.stream) voltmx.stream = {};

voltmx.stream.registerDataStream = tobeimplemented;
voltmx.stream.deregisterDataStream = tobeimplemented;
voltmx.stream.setCallback = tobeimplemented;


if(!voltmx.accelerometer) voltmx.accelerometer = {};

voltmx.accelerometer.registerAccelerationEvents = tobeimplemented;
voltmx.accelerometer.retrieveCurrentAcceleration = tobeimplemented;
voltmx.accelerometer.startMonitoringAcceleration = tobeimplemented;
voltmx.accelerometer.stopMonitoringAcceleration = tobeimplemented;
voltmx.accelerometer.unregisterAccelerationEvents = tobeimplemented;


if(!voltmx.forcetouch) voltmx.forcetouch = {};

voltmx.forcetouch.getQuickActionItems = tobeimplemented;
voltmx.forcetouch.getStaticQuickActionItems = tobeimplemented;
voltmx.forcetouch.removeQuickActionItems = tobeimplemented;
voltmx.forcetouch.removeQuickActionItems = tobeimplemented;
voltmx.forcetouch.setQuickActionItems = tobeimplemented;


if(!voltmx.keychain) voltmx.keychain = {};

voltmx.keychain.remove = tobeimplemented;
voltmx.keychain.retrieve = tobeimplemented;
voltmx.keychain.save = tobeimplemented;


if(!voltmx.localAuthentication) voltmx.localAuthentication = {};

voltmx.localAuthentication.authenticate = tobeimplemented;
voltmx.localAuthentication.getBiometryType = tobeimplemented;
voltmx.localAuthentication.cancelAuthentication = tobeimplemented;
voltmx.localAuthentication.getStatusForAuthenticationMode = tobeimplemented;


if(!voltmx.media) voltmx.media = {};

voltmx.media.createFromFile = tobeimplemented;
voltmx.media.createFromUri = tobeimplemented;
voltmx.media.record = tobeimplemented;


if(!voltmx.localnotifications) voltmx.localnotifications = {};

voltmx.localnotifications.cancel = tobeimplemented;
voltmx.localnotifications.create = tobeimplemented;
voltmx.localnotifications.getNotifications = tobeimplemented;
voltmx.localnotifications.setCallbacks = tobeimplemented;


if(!voltmx.notificationsettings) voltmx.notificationsettings = {};

voltmx.notificationsettings.createAction = tobeimplemented;
voltmx.notificationsettings.createCategory = tobeimplemented;
voltmx.notificationsettings.registerCategory = tobeimplemented;


if(!voltmx.push) voltmx.push = {};
voltmx.push.deRegister = tobeimplemented;
voltmx.push.register = tobeimplemented;
voltmx.push.setCallbacks = tobeimplemented;

if(!voltmx.contact) voltmx.contact = {};

voltmx.contact.add = tobeimplemented;
voltmx.contact.details = tobeimplemented;
voltmx.contact.find = tobeimplemented;
voltmx.contact.remove = tobeimplemented;


if(!voltmx.lang) voltmx.lang = {};

voltmx.lang.setUncaughtExceptionHandler = $KI.setUncaughtExceptionHandler;
voltmx.lang.getUncaughtExceptionHandler = $KI.getUncaughtExceptionHandler;


if(!voltmx.map) voltmx.map = {};

voltmx.map.containsLocation  = tobeimplemented;
voltmx.map.distanceBetween = tobeimplemented;
voltmx.map.decode = tobeimplemented;
voltmx.map.searchRoutes = tobeimplemented;


if(!voltmx.filter) voltmx.filter = {};

voltmx.filter.createFilter = tobeimplemented;


if(!voltmx.image) voltmx.image = {};

voltmx.image.createImage = tobeimplemented;
voltmx.image.createImageFromSnapShot = tobeimplemented;
voltmx.image.cropImageInTiles = tobeimplemented;
voltmx.image.cropImageInTilesForRects = tobeimplemented;


if(!voltmx.camera) voltmx.camera = {};

voltmx.camera.releaseRawBytes = tobeimplemented;


if(!voltmx.backgroundtasks) voltmx.backgroundtasks = {};

voltmx.backgroundtasks.startTask = tobeimplemented;
voltmx.backgroundtasks.stopTask = tobeimplemented;
voltmx.backgroundtasks.getTaskDetails = tobeimplemented;


if(!voltmx.shareExtensions) voltmx.shareExtensions = {};

voltmx.shareExtensions.popConfigurationViewController = tobeimplemented;
voltmx.shareExtensions.pushConfigurationViewController = tobeimplemented;
voltmx.shareExtensions.setExtensionsCallbacks = tobeimplemented;

if(!voltmx.todayExtension) voltmx.todayExtension = {};
voltmx.todayExtension.setExtensionsCallbacks = tobeimplemented ;

if(!voltmx.actionExtension) voltmx.actionExtension = {};
voltmx.actionExtension.setExtensionsCallbacks = tobeimplemented ;

if(!voltmx.intentExtension) voltmx.intentExtension = {};
voltmx.intentExtension.setExtensionsCallbacks = tobeimplemented ;

if(!voltmx.iMessageExtensions) voltmx.iMessageExtensions = {};
voltmx.iMessageExtensions.setExtensionsCallbacks = tobeimplemented ;

if(!voltmx.notificationContentExtension) voltmx.notificationContentExtension = {};
voltmx.notificationContentExtension.setExtensionsCallbacks = tobeimplemented ;


voltmx.runOnMainThread = tobeimplemented ;
voltmx.runOnWorkerThread = tobeimplemented ;

if(!com) com = {};
if(!com.voltmx) com.voltmx = {};

com.voltmx.Beacon = tobeimplemented;
com.voltmx.BeaconManager = tobeimplemented;
com.voltmx.BeaconRegion = tobeimplemented;
com.voltmx.PeripheralManager = tobeimplemented;
com.voltmx.isPassLibraryAvailable = tobeimplemented;
com.voltmx.PassLibrary = tobeimplemented;

com.voltmx.Beacon.prototype.getrssi =
com.voltmx.Beacon.prototype.getMajor =
com.voltmx.Beacon.prototype.getMinor =
com.voltmx.Beacon.prototype.getAccuracy =
com.voltmx.Beacon.prototype.getProximity =
com.voltmx.Beacon.prototype.getProximityUUIDString =

com.voltmx.BeaconManager.prototype.getRangedRegions =
com.voltmx.BeaconManager.prototype.authorizationStatus =
com.voltmx.BeaconManager.prototype.getMonitoredRegions =
com.voltmx.BeaconManager.prototype.requestStateForRegion =
com.voltmx.BeaconManager.prototype.stopRangingBeaconsInRegion =
com.voltmx.BeaconManager.prototype.startMonitoringBeaconRegion =
com.voltmx.BeaconManager.prototype.startRangingBeaconsInRegion =
com.voltmx.BeaconManager.prototype.stopMonitoringBeaconsRegion =
com.voltmx.BeaconManager.prototype.isRangingAvailableForBeaconRegions =
com.voltmx.BeaconManager.prototype.setAuthorizationStatusChangedCallback =
com.voltmx.BeaconManager.prototype.setMonitoringStartedForRegionCallback =
com.voltmx.BeaconManager.prototype.isMonitoringAvailableForBeaconRegions =

com.voltmx.PeripheralManager.prototype.isAdvertising =
com.voltmx.PeripheralManager.prototype.stopAdvertising =
com.voltmx.PeripheralManager.prototype.authorizationStatus =
com.voltmx.PeripheralManager.prototype.startAdvertisingWithMeasuredPower =

com.voltmx.PassLibrary.prototype.addPassWithCompletionCallback =
com.voltmx.PassLibrary.prototype.addPassesWithCompletionCallback =
com.voltmx.PassLibrary.prototype.containsPass =
com.voltmx.PassLibrary.prototype.getPassWithTypeIdentifierAndSerialNumber =
com.voltmx.PassLibrary.prototype.getPasses =
com.voltmx.PassLibrary.prototype.removePass =
com.voltmx.PassLibrary.prototype.replacePassWithPass = tobeimplemented;
