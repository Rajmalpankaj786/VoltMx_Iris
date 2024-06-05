if (window && window.Windows && Windows && Windows.UI && Windows.UI.Popups) {
    var WinRTOfflineSDKObjectService = function () {
        var _OfflineSDKObjectService_ = {};
        var wirtSdkSyncServiceObject = new PWAOfflineObjectsWrapper.OfflineSDKObjectService();
        _OfflineSDKObjectService_.createSDKObjectServiceSync = function (name) {
            //createSDKObjectServiceSync is not available for Windows OfflineObjects
        };
        _OfflineSDKObjectService_.startSync = function (knyObjSvc, syncConfig, successCallback, failureCallback, progressCallback) {
            var events = new PWAOfflineObjectsWrapper.CallbackEvents();
            events.addEventListener("success", getWinRTFunctionObject(successCallback));
            events.addEventListener("failure", getWinRTFunctionObject(failureCallback));
            events.addEventListener("progress", getWinRTFunctionObject(progressCallback));
            return wirtSdkSyncServiceObject.startSync(getWinRTObject(knyObjSvc), getWinRTObject(syncConfig), events);
        };
        _OfflineSDKObjectService_.rollback = function (knyObjSvc, successCallback, failureCallback) {
            var events = new PWAOfflineObjectsWrapper.CallbackEvents();
            events.addEventListener("success", getWinRTFunctionObject(successCallback));
            events.addEventListener("failure", getWinRTFunctionObject(failureCallback));
            return wirtSdkSyncServiceObject.rollback(getWinRTObject(knyObjSvc), events);
        };
        _OfflineSDKObjectService_.cancelSync = function (knyObjSvc, options, successCallback, failureCallback) {
            var events = new PWAOfflineObjectsWrapper.CallbackEvents();
            events.addEventListener("success", getWinRTFunctionObject(successCallback));
            events.addEventListener("failure", getWinRTFunctionObject(failureCallback));
            return wirtSdkSyncServiceObject.cancelSync(getWinRTObject(knyObjSvc), getWinRTObject(options), events);
        };
        _OfflineSDKObjectService_.clearOfflineData = function (knyObjSvc, options, successCallback, failureCallback) {
            var events = new PWAOfflineObjectsWrapper.CallbackEvents();
            events.addEventListener("success", getWinRTFunctionObject(successCallback));
            events.addEventListener("failure", getWinRTFunctionObject(failureCallback));
            return wirtSdkSyncServiceObject.clearOfflineData(getWinRTObject(knyObjSvc), getWinRTObject(options), events);
        };
        return _OfflineSDKObjectService_;
    };
}