if (window && window.Windows && Windows && Windows.UI && Windows.UI.Popups) {
    voltmx.store.clear = function () {
        return PWAWrapper.IO.StoreWrapper.clear();
    }
    voltmx.store.getItem = function (keyname) {
        var returnValue = PWAWrapper.IO.StoreWrapper.getItem(getWinRTObjectArray([keyname]));
        return getJSArray(returnValue);
    }
    voltmx.store.removeItem = function (keyname) {
        return PWAWrapper.IO.StoreWrapper.removeItem(getWinRTObjectArray([keyname]));
    }
    voltmx.store.setItem = function (key, value) {
        return PWAWrapper.IO.StoreWrapper.setItem(getWinRTObjectArray([key, value]));
    }
    voltmx.store.key = function (index) {
        return PWAWrapper.IO.StoreWrapper.key(getWinRTObjectArray([index]));
    }
    voltmx.store.length = function () {
        return PWAWrapper.IO.StoreWrapper.lengthOfItems();
    }

    voltmx.ds.read = function (name, storeContext) {
        var returnValue = PWAWrapper.IO.DataStoreWrapper.read(getWinRTObjectArray([name, storeContext]));
        return getJSArray(returnValue);
    }
    voltmx.ds.remove = function (name, storeContext) {
        return PWAWrapper.IO.DataStoreWrapper.remove(getWinRTObjectArray([name, storeContext]));
    }
    voltmx.ds.save = function (inputtable, name, metainfo, storeContext) {
        return PWAWrapper.IO.DataStoreWrapper.save(getWinRTObjectArray([inputtable, name, metainfo, storeContext]));
    }
}