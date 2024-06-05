if (window && window.Windows && Windows && Windows.UI && Windows.UI.Popups) {
    WindowsOfflineObjects = {

        //Offline Objects
        setToken: function (token) {
            PWAOfflineObjectsWrapper.OfflineObjectsWrapper.setToken(getWinRTObject(token));
        },
        setCookie: function (fabricUrl, rawCookie) {
            PWAOfflineObjectsWrapper.OfflineObjectsWrapper.setCookie(getWinRTObject(fabricUrl), getWinRTObject(rawCookie));
        },
        setReportingParams: function (reportingParams) {
            PWAOfflineObjectsWrapper.OfflineObjectsWrapper.setReportingParams(getWinRTObject(reportingParams));
        },
        setup: function (objServiceList, options, successCallback, failureCallback) {
            var events = new PWAOfflineObjectsWrapper.CallbackEvents();
            events.addEventListener("success", getWinRTFunctionObject(successCallback));
            events.addEventListener("failure", getWinRTFunctionObject(failureCallback));
            PWAOfflineObjectsWrapper.OfflineObjectsWrapper.syncSetup(getWinRTObject(objServiceList), getWinRTObject(options), events);
        },
        startSync: function (options, successCallback, failureCallback, progressCallback) {
            var events = new PWAOfflineObjectsWrapper.CallbackEvents();
            events.addEventListener("success", getWinRTFunctionObject(successCallback));
            events.addEventListener("failure", getWinRTFunctionObject(failureCallback));
            events.addEventListener("progress", getWinRTFunctionObject(progressCallback));
            PWAOfflineObjectsWrapper.OfflineObjectsWrapper.startSync(getWinRTObject(options), events);
        },
        reset: function (objServiceList, options, successCallback, failureCallback) {
            var events = new PWAOfflineObjectsWrapper.CallbackEvents();
            events.addEventListener("success", getWinRTFunctionObject(successCallback));
            events.addEventListener("failure", getWinRTFunctionObject(failureCallback));
            PWAOfflineObjectsWrapper.OfflineObjectsWrapper.syncReset(getWinRTObject(objServiceList), getWinRTObject(options), events);
        },
        drop: function (options, successCallback, failureCallback) {
            var events = new PWAOfflineObjectsWrapper.CallbackEvents();
            events.addEventListener("success", getWinRTFunctionObject(successCallback));
            events.addEventListener("failure", getWinRTFunctionObject(failureCallback));
            PWAOfflineObjectsWrapper.OfflineObjectsWrapper.syncDrop(getWinRTObject(options), events);
        },
        rollback: function (successCallback, failureCallback) {
            var events = new PWAOfflineObjectsWrapper.CallbackEvents();
            events.addEventListener("success", getWinRTFunctionObject(successCallback));
            events.addEventListener("failure", getWinRTFunctionObject(failureCallback));
            PWAOfflineObjectsWrapper.OfflineObjectsWrapper.syncRollback(events);
        },
        executeSelectQuery: function (query, successCallback, failureCallback) {
            var events = new PWAOfflineObjectsWrapper.CallbackEvents();
            events.addEventListener("success", getWinRTFunctionObject(successCallback));
            events.addEventListener("failure", getWinRTFunctionObject(failureCallback));
            PWAOfflineObjectsWrapper.OfflineObjectsWrapper.executeSelectQuery(getWinRTObject(query), events);
        },

        //KNYObj
        OfflineSDKObject: function () {
            return new WinRTOfflineSDKObject();
        },

        //KNYObjSvc
        OfflineSDKObjectService: function () {
            return new WinRTOfflineSDKObjectService();
        },

        //HTTPIntegrity
        setIntegrityCheck: function (properties) {
            return PWAOfflineObjectsWrapper.OfflineObjectsWrapper.setIntegrityCheck(getWinRTObject(properties));
        },
        removeIntegrityCheck: function () {
            return PWAOfflineObjectsWrapper.OfflineObjectsWrapper.removeIntegrityCheck();
        }
    };
}
