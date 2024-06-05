if (window && window.Windows && Windows && Windows.UI && Windows.UI.Popups) {
    voltmx.os.registerSpeechRecognizer = function (args) {
        var events = new PWAWrapper.CallbackEvents();
        events.addEventListener("success", getWinRTFunctionObject(args.resultGenerated));
        PWAWrapper.Speech2TextWrapper.registerSpeechRecognizer(events, getWinRTObject(args.timeouts));
    }
    voltmx.os.unregisterSpeechRecognizer = function () {
        PWAWrapper.Speech2TextWrapper.unregisterSpeechRecognizer();
    }
    voltmx.os.startSpeechRecognition = function (successcallback, errorcallback) {
        var events = new PWAWrapper.CallbackEvents();
        events.addEventListener("success", getWinRTFunctionObject(successcallback));
        events.addEventListener("failure", getWinRTFunctionObject(errorcallback));
        PWAWrapper.Speech2TextWrapper.startSpeechRecognition(events);
    }
    voltmx.os.stopSpeechRecognition = function (successcallback, errorcallback) {
        var events = new PWAWrapper.CallbackEvents();
        events.addEventListener("success", getWinRTFunctionObject(successcallback));
        events.addEventListener("failure", getWinRTFunctionObject(errorcallback));
        PWAWrapper.Speech2TextWrapper.stopSpeechRecognition(events);
    }
}