if (window && window.Windows && Windows && Windows.UI && Windows.UI.Popups) {
    var WinRTOfflineSDKObject = function () {
        var _OfflineSDKObject_ = {};
        var wirtSdkSyncObject = new PWAOfflineObjectsWrapper.OfflineSDKObject();
        _OfflineSDKObject_.createSDKObjectSync = function (name) {
            //TODO :Commenting below log as this method is common and will be called n number of times.
            // var LOG_PREFIX = "voltmx.sdk.KNYObj.createSDKObjectSync";
            // voltmx.sdk.logsdk.trace(" Entering "+LOG_PREFIX);
            // voltmx.sdk.logsdk.error("createSDKObjectSync is not available for Windows OfflineObjects");
        };
        _OfflineSDKObject_.startSync = function (knyObj, syncConfig, successCallback, failureCallback, progressCallback) {
            var events = new PWAOfflineObjectsWrapper.CallbackEvents();
            events.addEventListener("success", getWinRTFunctionObject(successCallback));
            events.addEventListener("failure", getWinRTFunctionObject(failureCallback));
            events.addEventListener("progress", getWinRTFunctionObject(progressCallback));
            return wirtSdkSyncObject.startSync(getWinRTObject(knyObj), getWinRTObject(syncConfig), events);
        };
        _OfflineSDKObject_.create = function (knyObj, record, options, successCallback, failureCallback) {
            var events = new PWAOfflineObjectsWrapper.CallbackEvents();
            events.addEventListener("success", getWinRTFunctionObject(successCallback));
            events.addEventListener("failure", getWinRTFunctionObject(failureCallback));
            return wirtSdkSyncObject.create(getWinRTObject(knyObj), getWinRTObject(record), getWinRTObject(options), events);
        };
        _OfflineSDKObject_.updateByPK = function (knyObj, record, options, successCallback, failureCallback) {
            var events = new PWAOfflineObjectsWrapper.CallbackEvents();
            events.addEventListener("success", getWinRTFunctionObject(successCallback));
            events.addEventListener("failure", getWinRTFunctionObject(failureCallback));
            return wirtSdkSyncObject.updateByPK(getWinRTObject(knyObj), getWinRTObject(record), getWinRTObject(options), events);
        };
        _OfflineSDKObject_.update = function (knyObj, record, options, successCallback, failureCallback) {
            var events = new PWAOfflineObjectsWrapper.CallbackEvents();
            events.addEventListener("success", getWinRTFunctionObject(successCallback));
            events.addEventListener("failure", getWinRTFunctionObject(failureCallback));
            return wirtSdkSyncObject.update(getWinRTObject(knyObj), getWinRTObject(record), getWinRTObject(options), events);
        };
        _OfflineSDKObject_.deleteByPK = function (knyObj, options, successCallback, failureCallback) {
            var events = new PWAOfflineObjectsWrapper.CallbackEvents();
            events.addEventListener("success", getWinRTFunctionObject(successCallback));
            events.addEventListener("failure", getWinRTFunctionObject(failureCallback));
            return wirtSdkSyncObject.deleteByPK(getWinRTObject(knyObj), getWinRTObject(options), events);
        };
        _OfflineSDKObject_.delete = function (knyObj, options, successCallback, failureCallback) {
            var events = new PWAOfflineObjectsWrapper.CallbackEvents();
            events.addEventListener("success", getWinRTFunctionObject(successCallback));
            events.addEventListener("failure", getWinRTFunctionObject(failureCallback));
            return wirtSdkSyncObject.delete(getWinRTObject(knyObj), getWinRTObject(options), events);
        };
        _OfflineSDKObject_.get = function (knyObj, options, successCallback, failureCallback) {
            var events = new PWAOfflineObjectsWrapper.CallbackEvents();
            events.addEventListener("success", getWinRTFunctionObject(successCallback));
            events.addEventListener("failure", getWinRTFunctionObject(failureCallback));
            return wirtSdkSyncObject.get(getWinRTObject(knyObj), getWinRTObject(options), events);
        };
        _OfflineSDKObject_.rollback = function (knyObj, primaryKeyValueMap, successCallback, failureCallback) {
            var events = new PWAOfflineObjectsWrapper.CallbackEvents();
            events.addEventListener("success", getWinRTFunctionObject(successCallback));
            events.addEventListener("failure", getWinRTFunctionObject(failureCallback));
            return wirtSdkSyncObject.rollback(getWinRTObject(knyObj), getWinRTObject(primaryKeyValueMap), events);
        };
        _OfflineSDKObject_.getBinary = function (knyObj, options, fileDownloadStartedCompletionBlock, chunkDownloadCompletedCompletionBlock, streamDownloadCompletionBlock, fileDownloadCompletedCompletionBlock, downloadFailureCompletionBlock) {
            //getBinary is not available for Windows OfflineObjects
        };
        _OfflineSDKObject_.getBinaryStatus = function (knyObj, options, successCallback, failureCallback) {
            //getBinaryStatus is not available for Windows OfflineObjects
        };
        _OfflineSDKObject_.markForUpload = function (knyObj, options, successCallback, failureCallback) {
            var events = new PWAOfflineObjectsWrapper.CallbackEvents();
            events.addEventListener("success", getWinRTFunctionObject(successCallback));
            events.addEventListener("failure", getWinRTFunctionObject(failureCallback));
            return wirtSdkSyncObject.markForUpload(getWinRTObject(knyObj), getWinRTObject(options), events);
        };
        _OfflineSDKObject_.cancelSync = function (knyObj, options, successCallback, failureCallback) {
            var events = new PWAOfflineObjectsWrapper.CallbackEvents();
            events.addEventListener("success", getWinRTFunctionObject(successCallback));
            events.addEventListener("failure", getWinRTFunctionObject(failureCallback));
            return wirtSdkSyncObject.cancelSync(getWinRTObject(knyObj), getWinRTObject(options), events);
        };
        _OfflineSDKObject_.getUploadDeferredRecordKeys = function (knyObj, successCallback, failureCallback) {
            var events = new PWAOfflineObjectsWrapper.CallbackEvents();
            events.addEventListener("success", getWinRTFunctionObject(successCallback));
            events.addEventListener("failure", getWinRTFunctionObject(failureCallback));
            return wirtSdkSyncObject.getUploadDeferredRecordKeys(getWinRTObject(knyObj), events);
        };
        _OfflineSDKObject_.getPendingRecordsForUpload = function (knyObj, options, successCallback, failureCallback) {
            var events = new PWAOfflineObjectsWrapper.CallbackEvents();
            events.addEventListener("success", getWinRTFunctionObject(successCallback));
            events.addEventListener("failure", getWinRTFunctionObject(failureCallback));
            return wirtSdkSyncObject.getPendingRecordsForUpload(getWinRTObject(knyObj), getWinRTObject(options), events);
        };
        _OfflineSDKObject_.clearOfflineData = function (knyObj, options, successCallback, failureCallback) {
            var events = new PWAOfflineObjectsWrapper.CallbackEvents();
            events.addEventListener("success", getWinRTFunctionObject(successCallback));
            events.addEventListener("failure", getWinRTFunctionObject(failureCallback));
            return wirtSdkSyncObject.clearOfflineData(getWinRTObject(knyObj), getWinRTObject(options), event);
        };
        return _OfflineSDKObject_;
    };
}