if (window && window.Windows && Windows && Windows.UI && Windows.UI.Popups) {
	voltmx.os.getBatteryState = function () {
	  return PWAWrapper.BatteryAPIWrapper.getBatteryState();
	}
	voltmx.os.getBatteryLevel = function () {
	  return PWAWrapper.BatteryAPIWrapper.getBatteryLevel();
	}
	voltmx.os.registerBatteryService = function (callBack) {
	  var events = new PWAWrapper.CallbackEvents();
	  events.addEventListener("callback", getWinRTFunctionObject(callBack));
	  PWAWrapper.BatteryAPIWrapper.registerBatteryService(events);
	}
	voltmx.os.unregisterBatteryService = function () {
	  PWAWrapper.BatteryAPIWrapper.unregisterBatteryService();
	}
}