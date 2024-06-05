if (window && window.Windows && Windows && Windows.UI && Windows.UI.Popups) {
    voltmx.contact.add = function (table) {
        return PWAWrapper.ContactsAPIWrapper.addContact(getWinRTObjectArray([table]));
    }
    voltmx.contact.find = function (search, needDetails, filterKeys) {
        return PWAWrapper.ContactsAPIWrapper.findContact(getWinRTObjectArray([search, needDetails, filterKeys]));
    }
    voltmx.contact.remove = function (table) {
        return PWAWrapper.ContactsAPIWrapper.deleteContact(getWinRTObjectArray([table]));
    }
}