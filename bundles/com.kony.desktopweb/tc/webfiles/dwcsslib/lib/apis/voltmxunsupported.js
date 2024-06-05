

(function() {
    var $K = voltmx.$kwebfw$, $KU = $K.utils,
        _notSupported = function(api, channel) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils;
            $KU.unsupportedAPI(api, channel);
        };

    $K.defVoltmxProp(voltmx, [
        {keey:'accelerometer', value:{}}
    ]);

    $K.defVoltmxProp(voltmx, [
        {keey:'actionExtension', value:{}}
    ]);
    $K.defVoltmxProp(voltmx, [
        {keey:'backgroundtasks', value:{}}
    ]);
    $K.defVoltmxProp(voltmx, [
        {keey:'camera', value:{}}
    ]);
    $K.defVoltmxProp(voltmx, [
        {keey:'contact', value:{}}
    ]);
    $K.defVoltmxProp(voltmx, [
        {keey:'dragdrop', value:{}}
    ]);
    $K.defVoltmxProp(voltmx, [
        {keey:'filter', value:{}}
    ]);
    $K.defVoltmxProp(voltmx, [
        {keey:'forcetouch', value:{}}
    ]);
    $K.defVoltmxProp(voltmx, [
        {keey:'image', value:{}}
    ]);
    $K.defVoltmxProp(voltmx, [
        {keey:'iMessageExtensions', value:{}}
    ]);
    $K.defVoltmxProp(voltmx, [
        {keey:'intentExtension', value:{}}
    ]);
    $K.defVoltmxProp(voltmx, [
        {keey:'keychain', value:{}}
    ]);
    $K.defVoltmxProp(voltmx, [
        {keey:'lang', value:{}}
    ]);
    $K.defVoltmxProp(voltmx, [
        {keey:'localAuthentication', value:{}}
    ]);
    $K.defVoltmxProp(voltmx, [
        {keey:'localnotifications', value:{}}
    ]);
    $K.defVoltmxProp(voltmx, [
        {keey:'map', value:{}}
    ]);
    $K.defVoltmxProp(voltmx.net, [
        {keey:'cache', value:{}}
    ]);
    $K.defVoltmxProp(voltmx, [
        {keey:'notificationContentExtension', value:{}}
    ]);
    $K.defVoltmxProp(voltmx, [
        {keey:'notificationsettings', value:{}}
    ]);
    $K.defVoltmxProp(voltmx, [
        {keey:'payment', value:{}}
    ]);
    $K.defVoltmxProp(voltmx, [
        {keey:'reactNative', value:{}}
    ]);
    $K.defVoltmxProp(voltmx, [
        {keey:'shareExtensions', value:{}}
    ]);
    $K.defVoltmxProp(voltmx, [
        {keey:'stream', value:{}}
    ]);
    $K.defVoltmxProp(voltmx, [
        {keey:'todayExtension', value:{}}
    ]);
    $K.defVoltmxProp(voltmx, [
        {keey:'types', value:{}}
    ]);
    $K.defVoltmxProp(voltmx, [
        {keey:'web', value:{}}
    ]);
    $K.defVoltmxProp(window, [
        {keey:'com', value:{}, items:[
            {keey:'voltmx', value:{}}
        ]}
    ]);

    $KU.defineProperty(voltmx.application, 'getCurrentSettingsMenu', function() {
        _notSupported('voltmx.application.getCurrentSettingsMenu');
    });

    $KU.defineProperty(voltmx.io.FileSystem, 'copyBundledRawFileTo', function() {
        _notSupported('voltmx.io.FileSystem.copyBundledRawFileTo');
    });
    $KU.defineProperty(voltmx.io.FileSystem, 'getDataDirectoryPath', function() {
        _notSupported('voltmx.io.FileSystem.getDataDirectoryPath');
    }); 

    $KU.defineProperty(voltmx.io.File.prototype, 'copyTo', function() {
        _notSupported('voltmx.io.File.copyTo');
    });
    $KU.defineProperty(voltmx.io.File.prototype, 'createDirectory', function() {
        _notSupported('voltmx.io.File.createDirectory');
    });
    $KU.defineProperty(voltmx.io.File.prototype, 'createFile', function() {
        _notSupported('voltmx.io.File.createFile');
    });
    $KU.defineProperty(voltmx.io.File.prototype, 'exists', function() {
        _notSupported('voltmx.io.File.exists');
    });
    $KU.defineProperty(voltmx.io.File.prototype, 'getFilesList', function() {
        _notSupported('voltmx.io.File.getFilesList');
    });
    $KU.defineProperty(voltmx.io.File.prototype, 'isDirectory', function() {
        _notSupported('voltmx.io.File.isDirectory');
    });
    $KU.defineProperty(voltmx.io.File.prototype, 'isFile', function() {
        _notSupported('voltmx.io.File.isFile');
    });
    $KU.defineProperty(voltmx.io.File.prototype, 'moveTo', function() {
        _notSupported('voltmx.io.File.moveTo');
    });
    $KU.defineProperty(voltmx.io.File.prototype, 'read', function() {
        _notSupported('voltmx.io.File.read');
    });
    $KU.defineProperty(voltmx.io.File.prototype, 'readAsText', function() {
        _notSupported('voltmx.io.File.readAsText');
    });
    $KU.defineProperty(voltmx.io.File.prototype, 'remove', function() {
        _notSupported('voltmx.io.File.remove');
    });
    $KU.defineProperty(voltmx.io.File.prototype, 'rename', function() {
        _notSupported('voltmx.io.File.rename');
    });
    $KU.defineProperty(voltmx.io.File.prototype, 'write', function() {
        _notSupported('voltmx.io.File.write');
    });

    $KU.defineProperty(voltmx.accelerometer, 'registerAccelerationEvents', function() {
        _notSupported('voltmx.accelerometer.registerAccelerationEvents');
    });
    $KU.defineProperty(voltmx.accelerometer, 'retrieveCurrentAcceleration', function() {
        _notSupported('voltmx.accelerometer.retrieveCurrentAcceleration');
    });
    $KU.defineProperty(voltmx.accelerometer, 'startMonitoringAcceleration', function() {
        _notSupported('voltmx.accelerometer.startMonitoringAcceleration');
    });
    $KU.defineProperty(voltmx.accelerometer, 'stopMonitoringAcceleration', function() {
        _notSupported('voltmx.accelerometer.stopMonitoringAcceleration');
    });
    $KU.defineProperty(voltmx.accelerometer, 'unregisterAccelerationEvents', function() {
        _notSupported('voltmx.accelerometer.unregisterAccelerationEvents');
    });

    $KU.defineProperty(voltmx.actionExtension, 'setExtensionsCallbacks', function() {
        _notSupported('voltmx.actionExtension.setExtensionsCallbacks');
    });

    $KU.defineProperty(voltmx.application, 'addSettingsMenuItemAt', function() {
        _notSupported('voltmx.application.addSettingsMenuItemAt');
    });
    $KU.defineProperty(voltmx.application, 'beginBackgroundTask', function() {
        _notSupported('voltmx.application.beginBackgroundTask');
    });
    $KU.defineProperty(voltmx.application, 'createSettingsMenu', function() {
        _notSupported('voltmx.application.createSettingsMenu');
    });
    $KU.defineProperty(voltmx.application, 'endBackgroundTask', function() {
        _notSupported('voltmx.application.endBackgroundTask');
    });
    $KU.defineProperty(voltmx.application, 'getSettingValue', function() {
        _notSupported('voltmx.application.getSettingValue');
    });
    $KU.defineProperty(voltmx.application, 'getApplicationBadgeValue', function() {
        _notSupported('voltmx.application.getApplicationBadgeValue');
    });
    $KU.defineProperty(voltmx.application, 'getAppMenuBadgeValue', function() {
        _notSupported('voltmx.application.getAppMenuBadgeValue');
    });
    $KU.defineProperty(voltmx.application, 'isInMultiWindowMode', function() {
        _notSupported('voltmx.application.isInMultiWindowMode');
    });
    $KU.defineProperty(voltmx.application, 'openApplicationSettings', function() {
        _notSupported('voltmx.application.openApplicationSettings');
    });
    $KU.defineProperty(voltmx.application, 'registerOnKeyPress', function() {
        _notSupported('voltmx.application.registerOnKeyPress');
    });
    $KU.defineProperty(voltmx.application, 'removeSettingsMenuItemAt', function() {
        _notSupported('voltmx.application.removeSettingsMenuItemAt');
    });
    $KU.defineProperty(voltmx.application, 'removeSecondaryTile', function() {
        _notSupported('voltmx.application.removeSecondaryTile');
    });
    $KU.defineProperty(voltmx.application, 'requestReview', function() {
        _notSupported('voltmx.application.requestReview');
    });
    $KU.defineProperty(voltmx.application, 'setCheckBoxSelectionImageAlignment', function() {
        _notSupported('voltmx.application.setCheckBoxSelectionImageAlignment');
    });
    $KU.defineProperty(voltmx.application, 'setCurrentAppMenuFont', function() {
        _notSupported('voltmx.application.setCurrentAppMenuFont');
    });
    $KU.defineProperty(voltmx.application, 'setDefaultListboxPadding', function() {
        _notSupported('voltmx.application.setDefaultListboxPadding');
    });
    $KU.defineProperty(voltmx.application, 'setDefaultTextboxPadding', function() {
        _notSupported('voltmx.application.setDefaultTextboxPadding');
    });
    $KU.defineProperty(voltmx.application, 'setApplicationBadgeValue', function() {
        _notSupported('voltmx.application.setApplicationBadgeValue');
    });
    $KU.defineProperty(voltmx.application, 'setApplicationProperties', function() {
        _notSupported('voltmx.application.setApplicationProperties');
    });
    $KU.defineProperty(voltmx.application, 'setAppMenuBadgeValue', function() {
        _notSupported('voltmx.application.setAppMenuBadgeValue');
    });
    $KU.defineProperty(voltmx.application, 'setCurrentSettingsMenu', function() {
        _notSupported('voltmx.application.setCurrentSettingsMenu');
    });
    $KU.defineProperty(voltmx.application, 'seAppTitle', function() {
        _notSupported('voltmx.application.seAppTitle');
    });
    $KU.defineProperty(voltmx.application, 'setSecondaryTile', function() {
        _notSupported('voltmx.application.setSecondaryTile');
    });
    $KU.defineProperty(voltmx.application, 'setZoomedOutView', function() {
        _notSupported('voltmx.application.setZoomedOutView');
    });
    $KU.defineProperty(voltmx.application, 'zoomIn', function() {
        _notSupported('voltmx.application.zoomIn');
    });

    $KU.defineProperty(voltmx.backgroundtasks, 'startTask', function() {
        _notSupported('voltmx.backgroundtasks.startTask');
    });
    $KU.defineProperty(voltmx.backgroundtasks, 'stopTask', function() {
        _notSupported('voltmx.backgroundtasks.stopTask');
    });
    $KU.defineProperty(voltmx.backgroundtasks, 'getTaskDetails', function() {
        _notSupported('voltmx.backgroundtasks.getTaskDetails');
    });

    $KU.defineProperty(voltmx.camera, 'releaseRawBytes', function() {
        _notSupported('voltmx.camera.releaseRawBytes');
    });

    $KU.defineProperty(voltmx.contact, 'add', function() {
        _notSupported('voltmx.contact.add');
    });
    $KU.defineProperty(voltmx.contact, 'details', function() {
        _notSupported('voltmx.contact.details');
    });
    $KU.defineProperty(voltmx.contact, 'find', function() {
        _notSupported('voltmx.contact.find');
    });
    $KU.defineProperty(voltmx.contact, 'remove', function() {
        _notSupported('voltmx.contact.remove');
    });

    $KU.defineProperty(voltmx.crypto, 'createHMacHash', function() {
        _notSupported('voltmx.crypto.createHMacHash');
    });

    $KU.defineProperty(voltmx.dragdrop, 'DragInteraction', function() {
        _notSupported('voltmx.dragdrop.DragInteraction');
    });
    $KU.defineProperty(voltmx.dragdrop, 'DropInteraction', function() {
        _notSupported('voltmx.dragdrop.DropInteraction');
    });
    $KU.defineProperty(voltmx.dragdrop, 'removeDragInteraction', function() {
        _notSupported('voltmx.dragdrop.removeDragInteraction');
    });
    $KU.defineProperty(voltmx.dragdrop, 'removeDropInteraction', function() {
        _notSupported('voltmx.dragdrop.removeDropInteraction');
    });

    $KU.defineProperty(voltmx.filter, 'createFilter', function() {
        _notSupported('voltmx.filter.createFilter');
    });

    $KU.defineProperty(voltmx.forcetouch, 'getQuickActionItems', function() {
        _notSupported('voltmx.forcetouch.getQuickActionItems');
    });
    $KU.defineProperty(voltmx.forcetouch, 'getStaticQuickActionItems', function() {
        _notSupported('voltmx.forcetouch.getStaticQuickActionItems');
    });
    $KU.defineProperty(voltmx.forcetouch, 'removeQuickActionItems', function() {
        _notSupported('voltmx.forcetouch.removeQuickActionItems');
    });
    $KU.defineProperty(voltmx.forcetouch, 'setQuickActionItems', function() {
        _notSupported('voltmx.forcetouch.setQuickActionItems');
    });

    $KU.defineProperty(voltmx.image, 'createImage', function() {
        _notSupported('voltmx.image.createImage');
    });
    $KU.defineProperty(voltmx.image, 'createImageFromSnapShot', function() {
        _notSupported('voltmx.image.createImageFromSnapShot');
    });
    $KU.defineProperty(voltmx.image, 'cropImageInTiles', function() {
        _notSupported('voltmx.image.cropImageInTiles');
    });
    $KU.defineProperty(voltmx.image, 'cropImageInTilesForRects', function() {
        _notSupported('voltmx.image.cropImageInTilesForRects');
    });

    $KU.defineProperty(voltmx.iMessageExtensions, 'setExtensionsCallbacks', function() {
        _notSupported('voltmx.iMessageExtensions.setExtensionsCallbacks');
    });

    $KU.defineProperty(voltmx.intentExtension, 'setExtensionsCallbacks', function() {
        _notSupported('voltmx.intentExtension.setExtensionsCallbacks');
    });

    /*$KU.defineProperty(voltmx.io, 'FileList', {});
    $KU.defineProperty(voltmx.io.FileList, 'item', function() {
        _notSupported('voltmx.io.FileList.item');
    });*/

    $KU.defineProperty(voltmx.io.FileSystem, 'getAppGroupDirectoryPath', function() {
        _notSupported('voltmx.io.FileSystem.getAppGroupDirectoryPath');
    });
    $KU.defineProperty(voltmx.io.FileSystem, 'getApplicationDirectoryPath', function() {
        _notSupported('voltmx.io.FileSystem.getApplicationDirectoryPath');
    });
    $KU.defineProperty(voltmx.io.FileSystem, 'getCacheDirectoryPath', function() {
        _notSupported('voltmx.io.FileSystem.getCacheDirectoryPath');
    });
    $KU.defineProperty(voltmx.io.FileSystem, 'getDatabaseDirectoryPath', function() {
        _notSupported('voltmx.io.FileSystem.getDatabaseDirectoryPath');
    });
    $KU.defineProperty(voltmx.io.FileSystem, 'getExternalStorageDirectoryPath', function() {
        _notSupported('voltmx.io.FileSystem.getExternalStorageDirectoryPath');
    });
    $KU.defineProperty(voltmx.io.FileSystem, 'getFile', function() {
        _notSupported('voltmx.io.FileSystem.getFile');
    });
    $KU.defineProperty(voltmx.io.FileSystem, 'getRawDirectoryPath', function() {
        _notSupported('voltmx.io.FileSystem.getRawDirectoryPath');
    });
    $KU.defineProperty(voltmx.io.FileSystem, 'getSupportDirectoryPath', function() {
        _notSupported('voltmx.io.FileSystem.getSupportDirectoryPath');
    });
    $KU.defineProperty(voltmx.io.FileSystem, 'isExternalStorageAvailable', function() {
        _notSupported('voltmx.io.FileSystem.isExternalStorageAvailable');
    });

    $KU.defineProperty(voltmx.keychain, 'remove', function() {
        _notSupported('voltmx.keychain.remove');
    });
    $KU.defineProperty(voltmx.keychain, 'retrieve', function() {
        _notSupported('voltmx.keychain.retrieve');
    });
    $KU.defineProperty(voltmx.keychain, 'save', function() {
        _notSupported('voltmx.keychain.save');
    });

    $KU.defineProperty(voltmx.lang, 'getUncaughtExceptionHandler', function() {
        _notSupported('voltmx.lang.getUncaughtExceptionHandler');
    });
    $KU.defineProperty(voltmx.lang, 'setUncaughtExceptionHandler', function() {
        _notSupported('voltmx.lang.setUncaughtExceptionHandler');
    });

    $KU.defineProperty(voltmx.localAuthentication, 'authenticate', function() {
        _notSupported('voltmx.localAuthentication.authenticate');
    });
    $KU.defineProperty(voltmx.localAuthentication, 'getBiometryType', function() {
        _notSupported('voltmx.localAuthentication.getBiometryType');
    });
    $KU.defineProperty(voltmx.localAuthentication, 'cancelAuthentication', function() {
        _notSupported('voltmx.localAuthentication.cancelAuthentication');
    });
    $KU.defineProperty(voltmx.localAuthentication, 'getStatusForAuthenticationMode', function() {
        _notSupported('voltmx.localAuthentication.getStatusForAuthenticationMode');
    });

    $KU.defineProperty(voltmx.localnotifications, 'cancel', function() {
        _notSupported('voltmx.localnotifications.cancel');
    });
    $KU.defineProperty(voltmx.localnotifications, 'create', function() {
        _notSupported('voltmx.localnotifications.create');
    });
    $KU.defineProperty(voltmx.localnotifications, 'getNotifications', function() {
        _notSupported('voltmx.localnotifications.getNotifications');
    });
    $KU.defineProperty(voltmx.localnotifications, 'setCallbacks', function() {
        _notSupported('voltmx.localnotifications.setCallbacks');
    });

    $KU.defineProperty(voltmx.map, 'containsLocation', function() {
        _notSupported('voltmx.map.containsLocation');
    });
    $KU.defineProperty(voltmx.map, 'distanceBetween', function() {
        _notSupported('voltmx.map.distanceBetween');
    });
    $KU.defineProperty(voltmx.map, 'decode', function() {
        _notSupported('voltmx.map.decode');
    });
    $KU.defineProperty(voltmx.map, 'searchRoutes', function() {
        _notSupported('voltmx.map.searchRoutes');
    });    

    $KU.defineProperty(voltmx.media, 'createFromFile', function() {
        _notSupported('voltmx.media.createFromFile');
    });
    $KU.defineProperty(voltmx.media, 'createFromUri', function() {
        _notSupported('voltmx.media.createFromUri');
    });

    $KU.defineProperty(voltmx.net, 'urlDecode', function() {
        _notSupported('voltmx.net.urlDecode');
    });
    $KU.defineProperty(voltmx.net, 'urlEncode', function() {
        _notSupported('voltmx.net.urlEncode');
    });

    $KU.defineProperty(voltmx.net.cache, 'setMemoryAndDiskCapacity', function() {
        _notSupported('voltmx.net.cache.setMemoryAndDiskCapacity');
    });
    $KU.defineProperty(voltmx.net.cache, 'getMemoryCapacity', function() {
        _notSupported('voltmx.net.cache.getMemoryCapacity');
    });
    $KU.defineProperty(voltmx.net.cache, 'getDiskCapacity', function() {
        _notSupported('voltmx.net.cache.getDiskCapacity');
    });
    $KU.defineProperty(voltmx.net.cache, 'getCurrentDiskUsage', function() {
        _notSupported('voltmx.net.cache.getCurrentDiskUsage');
    });
    $KU.defineProperty(voltmx.net.cache, 'getCurrentMemoryUsage', function() {
        _notSupported('voltmx.net.cache.getCurrentMemoryUsage');
    });
    $KU.defineProperty(voltmx.net.cache, 'setCacheConfig', function() {
        _notSupported('voltmx.net.cache.setCacheConfig');
    });

    $KU.defineProperty(voltmx.notificationContentExtension, 'setExtensionsCallbacks', function() {
        _notSupported('voltmx.notificationContentExtension.setExtensionsCallbacks');
    });

    $KU.defineProperty(voltmx.notificationsettings, 'createAction', function() {
        _notSupported('voltmx.notificationsettings.createAction');
    });
    $KU.defineProperty(voltmx.notificationsettings, 'createCategory', function() {
        _notSupported('voltmx.notificationsettings.createCategory');
    });
    $KU.defineProperty(voltmx.notificationsettings, 'registerCategory', function() {
        _notSupported('voltmx.notificationsettings.registerCategory');
    });
    $KU.defineProperty(voltmx.os, 'getDeviceId', function() {
        _notSupported('voltmx.os.getDeviceId');
    });
    $KU.defineProperty(voltmx.os, 'hasAccelerometerSupport', function() {
        _notSupported('voltmx.os.hasAccelerometerSupport');
    });
    $KU.defineProperty(voltmx.os, 'registerSpeechRecognizer', function() {
        _notSupported('voltmx.os.registerSpeechRecognizer');
    });
    $KU.defineProperty(voltmx.os, 'startSpeechRecognition', function() {
        _notSupported('voltmx.os.startSpeechRecognition');
    });
    $KU.defineProperty(voltmx.os, 'stopSpeechRecognition', function() {
        _notSupported('voltmx.os.stopSpeechRecognition');
    });
    $KU.defineProperty(voltmx.os, 'unregisterSpeechRecognizer', function() {
        _notSupported('voltmx.os.unregisterSpeechRecognizer');
    });
    $KU.defineProperty(voltmx.os, 'getBatteryLevel', function() {
        _notSupported('voltmx.os.getBatteryLevel');
    });
    $KU.defineProperty(voltmx.os, 'registerBatteryChange', function() {
        _notSupported('voltmx.os.registerBatteryChange');
    });
    $KU.defineProperty(voltmx.os, 'unregisterBatteryChange', function() {
        _notSupported('voltmx.os.unregisterBatteryChange');
    });

    $KU.defineProperty(voltmx.payment, 'canWeMakePayment', function() {
        _notSupported('voltmx.payment.canWeMakePayment');
    });
    $KU.defineProperty(voltmx.payment, 'getPaymentData', function() {
        _notSupported('voltmx.payment.getPaymentData');
    });
    $KU.defineProperty(voltmx.payment, 'getSupportedPaymentNetworks', function() {
        _notSupported('voltmx.payment.getSupportedPaymentNetworks');
    });
    $KU.defineProperty(voltmx.payment, 'updateTransactionResponse', function() {
        _notSupported('voltmx.payment.updateTransactionResponse');
    });

    $KU.defineProperty(voltmx.phone, 'addCalendarEvent', function() {
        _notSupported('voltmx.phone.addCalendarEvent');
    });
    $KU.defineProperty(voltmx.phone, 'cancelVibration', function() {
        _notSupported('voltmx.phone.cancelVibration');
    });
    $KU.defineProperty(voltmx.phone, 'findCalendarEvents', function() {
        _notSupported('voltmx.phone.findCalendarEvents');
    });
    $KU.defineProperty(voltmx.phone, 'getRemoveEventOptions', function() {
        _notSupported('voltmx.phone.getRemoveEventOptions');
    });
    $KU.defineProperty(voltmx.phone, 'hasVibratorSupport', function() {
        _notSupported('voltmx.phone.hasVibratorSupport');
    });
    $KU.defineProperty(voltmx.phone, 'openEmail', function() {
        _notSupported('voltmx.phone.openEmail');
    });
    $KU.defineProperty(voltmx.phone, 'performHapticFeedback', function() {
        _notSupported('voltmx.phone.performHapticFeedback');
    });
    $KU.defineProperty(voltmx.phone, 'removeCalendarEvent', function() {
        _notSupported('voltmx.phone.removeCalendarEvent');
    });
    $KU.defineProperty(voltmx.phone, 'sendSMS', function() {
        _notSupported('voltmx.phone.sendSMS');
    });
    $KU.defineProperty(voltmx.phone, 'startVibration', function() {
        _notSupported('voltmx.phone.startVibration');
    });

    $KU.defineProperty(voltmx.reactNative, 'setCallback', function() {
        _notSupported('voltmx.reactNative.setCallback');
    });
    $KU.defineProperty(voltmx.reactNative, 'sendResult', function() {
        _notSupported('voltmx.reactNative.sendResult');
    });

    $KU.defineProperty(voltmx.shareExtensions, 'popConfigurationViewController', function() {
        _notSupported('voltmx.shareExtensions.popConfigurationViewController');
    });
    $KU.defineProperty(voltmx.shareExtensions, 'pushConfigurationViewController', function() {
        _notSupported('voltmx.shareExtensions.pushConfigurationViewController');
    });
    $KU.defineProperty(voltmx.shareExtensions, 'setExtensionsCallbacks', function() {
        _notSupported('voltmx.shareExtensions.setExtensionsCallbacks');
    });

    $KU.defineProperty(voltmx.stream, 'registerDataStream', function() {
        _notSupported('voltmx.stream.registerDataStream');
    });
    $KU.defineProperty(voltmx.stream, 'deregisterDataStream', function() {
        _notSupported('voltmx.stream.deregisterDataStream');
    });
    $KU.defineProperty(voltmx.stream, 'setCallback', function() {
        _notSupported('voltmx.stream.setCallback');
    });

    $KU.defineProperty(voltmx.todayExtension, 'setExtensionsCallbacks', function() {
        _notSupported('voltmx.todayExtension.setExtensionsCallbacks');
    });

    $KU.defineProperty(voltmx.types, 'RawBytes', function() {
        _notSupported('voltmx.types.RawBytes');
    });
    $KU.defineProperty(voltmx.types.RawBytes.prototype, 'readAsText', function() {
        _notSupported('voltmx.types.RawBytes.readAsText');
    });
    $KU.defineProperty(voltmx.web, 'WebAuthenticationSession', function() {
        _notSupported('voltmx.web.WebAuthenticationSession');
    });

    $KU.defineProperty(com.voltmx, 'BeaconRegion', function() {
        _notSupported('com.voltmx.BeaconRegion');
    });
    $KU.defineProperty(com.voltmx, 'PeripheralManager', function() {
        _notSupported('com.voltmx.PeripheralManager');
    });
    $KU.defineProperty(com.voltmx, 'isPassLibraryAvailable', function() {
        _notSupported('com.voltmx.isPassLibraryAvailable');
    });

    $KU.defineProperty(com.voltmx, 'Beacon', function() {
        _notSupported('com.voltmx.Beacon');
    });
    $KU.defineProperty(com.voltmx.Beacon.prototype, 'getrssi', function() {
        _notSupported('com.voltmx.Beacon.getrssi');
    });
    $KU.defineProperty(com.voltmx.Beacon.prototype, 'getMajor', function() {
        _notSupported('com.voltmx.Beacon.getMajor');
    });
    $KU.defineProperty(com.voltmx.Beacon.prototype, 'getMinor', function() {
        _notSupported('com.voltmx.Beacon.getMinor');
    });
    $KU.defineProperty(com.voltmx.Beacon.prototype, 'getAccuracy', function() {
        _notSupported('com.voltmx.Beacon.getAccuracy');
    });
    $KU.defineProperty(com.voltmx.Beacon.prototype, 'getProximity', function() {
        _notSupported('com.voltmx.Beacon.getProximity');
    });
    $KU.defineProperty(com.voltmx.Beacon.prototype, 'getProximityUUIDString', function() {
        _notSupported('com.voltmx.Beacon.getProximityUUIDString');
    });

    $KU.defineProperty(com.voltmx, 'BeaconManager', function() {
        _notSupported('com.voltmx.BeaconManager');
    });
    $KU.defineProperty(com.voltmx.BeaconManager.prototype, 'getRangedRegions', function() {
        _notSupported('com.voltmx.BeaconManager.getRangedRegions');
    });
    $KU.defineProperty(com.voltmx.BeaconManager.prototype, 'authorizationStatus', function() {
        _notSupported('com.voltmx.BeaconManager.authorizationStatus');
    });
    $KU.defineProperty(com.voltmx.BeaconManager.prototype, 'getMonitoredRegions', function() {
        _notSupported('com.voltmx.BeaconManager.getMonitoredRegions');
    });
    $KU.defineProperty(com.voltmx.BeaconManager.prototype, 'requestStateForRegion', function() {
        _notSupported('com.voltmx.BeaconManager.requestStateForRegion');
    });
    $KU.defineProperty(com.voltmx.BeaconManager.prototype, 'stopRangingBeaconsInRegion', function() {
        _notSupported('com.voltmx.BeaconManager.stopRangingBeaconsInRegion');
    });
    $KU.defineProperty(com.voltmx.BeaconManager.prototype, 'startMonitoringBeaconRegion', function() {
        _notSupported('com.voltmx.BeaconManager.startMonitoringBeaconRegion');
    });
    $KU.defineProperty(com.voltmx.BeaconManager.prototype, 'startRangingBeaconsInRegion', function() {
        _notSupported('com.voltmx.BeaconManager.startRangingBeaconsInRegion');
    });
    $KU.defineProperty(com.voltmx.BeaconManager.prototype, 'stopMonitoringBeaconsRegion', function() {
        _notSupported('com.voltmx.BeaconManager.stopMonitoringBeaconsRegion');
    });
    $KU.defineProperty(com.voltmx.BeaconManager.prototype, 'isRangingAvailableForBeaconRegions', function() {
        _notSupported('com.voltmx.BeaconManager.isRangingAvailableForBeaconRegions');
    });
    $KU.defineProperty(com.voltmx.BeaconManager.prototype, 'setAuthorizationStatusChangedCallback', function() {
        _notSupported('com.voltmx.BeaconManager.setAuthorizationStatusChangedCallback');
    });
    $KU.defineProperty(com.voltmx.BeaconManager.prototype, 'setMonitoringStartedForRegionCallback', function() {
        _notSupported('com.voltmx.BeaconManager.setMonitoringStartedForRegionCallback');
    });
    $KU.defineProperty(com.voltmx.BeaconManager.prototype, 'isMonitoringAvailableForBeaconRegions', function() {
        _notSupported('com.voltmx.BeaconManager.isMonitoringAvailableForBeaconRegions');
    });

    $KU.defineProperty(com.voltmx, 'PeripheralManager', function() {
        _notSupported('com.voltmx.PeripheralManager');
    });
    $KU.defineProperty(com.voltmx.PeripheralManager.prototype, 'isAdvertising', function() {
        _notSupported('com.voltmx.PeripheralManager.isAdvertising');
    });
    $KU.defineProperty(com.voltmx.PeripheralManager.prototype, 'stopAdvertising', function() {
        _notSupported('com.voltmx.PeripheralManager.stopAdvertising');
    });
    $KU.defineProperty(com.voltmx.PeripheralManager.prototype, 'authorizationStatus', function() {
        _notSupported('com.voltmx.PeripheralManager.authorizationStatus');
    });
    $KU.defineProperty(com.voltmx.PeripheralManager.prototype, 'startAdvertisingWithMeasuredPower', function() {
        _notSupported('com.voltmx.PeripheralManager.startAdvertisingWithMeasuredPower');
    });

    $KU.defineProperty(com.voltmx, 'PassLibrary', function() {
        _notSupported('com.voltmx.PassLibrary');
    });
    $KU.defineProperty(com.voltmx.PassLibrary.prototype, 'addPassWithCompletionCallback', function() {
        _notSupported('com.voltmx.PassLibrary.addPassWithCompletionCallback');
    });
    $KU.defineProperty(com.voltmx.PassLibrary.prototype, 'addPassesWithCompletionCallback', function() {
        _notSupported('com.voltmx.PassLibrary.addPassesWithCompletionCallback');
    });
    $KU.defineProperty(com.voltmx.PassLibrary.prototype, 'containsPass', function() {
        _notSupported('com.voltmx.PassLibrary.containsPass');
    });
    $KU.defineProperty(com.voltmx.PassLibrary.prototype, 'getPassWithTypeIdentifierAndSerialNumber', function() {
        _notSupported('com.voltmx.PassLibrary.getPassWithTypeIdentifierAndSerialNumber');
    });
    $KU.defineProperty(com.voltmx.PassLibrary.prototype, 'getPasses', function() {
        _notSupported('com.voltmx.PassLibrary.getPasses');
    });
    $KU.defineProperty(com.voltmx.PassLibrary.prototype, 'removePass', function() {
        _notSupported('com.voltmx.PassLibrary.removePass');
    });
    $KU.defineProperty(com.voltmx.PassLibrary.prototype, 'replacePassWithPass', function() {
        _notSupported('com.voltmx.PassLibrary.replacePassWithPass');
    });

    $KU.defineProperty(voltmx, 'runOnMainThread', function() {
        _notSupported('voltmx.runOnMainThread');
    });
    $KU.defineProperty(voltmx, 'runOnWorkerThread', function() {
        _notSupported('voltmx.runOnWorkerThread');
    });

}());