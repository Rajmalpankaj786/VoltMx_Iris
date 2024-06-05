if (window && window.Windows && Windows && Windows.UI && Windows.UI.Popups) {
    voltmx.crypto.asymmetricEncrypt = function (alias, inputstring, propertiesTable) {
        return PWAWrapper.CryptoWrapper.asymmetricEncrypt(getWinRTObjectArray([alias, inputstring, propertiesTable]));
    }
    voltmx.crypto.asymmetricDecrypt = function (alias, encryptedString, propertiesTable) {
        return PWAWrapper.CryptoWrapper.asymmetricDecrypt(getWinRTObjectArray([alias, encryptedString, propertiesTable]));
    }
    voltmx.crypto.createHash = function (algo, inputstring) {
        return PWAWrapper.CryptoWrapper.createHash(getWinRTObjectArray([algo, inputstring]));
    }
    voltmx.crypto.createPBKDF2Key = function (algo, password, salt, iteration, klen) {
        return PWAWrapper.CryptoWrapper.createPBKDF2Key(getWinRTObjectArray([algo, password, salt, iteration, klen]));
    }
    voltmx.crypto.decrypt = function (algo, generatedkey, encryptedRawbytes, propertiesTable) {
        return PWAWrapper.CryptoWrapper.decrypt(getWinRTObjectArray([algo, generatedkey, encryptedRawbytes, propertiesTable], [generatedkey, encryptedRawbytes]));
    }
    voltmx.crypto.deleteKey = function (uniqueID) {
        return PWAWrapper.CryptoWrapper.deleteKey(getWinRTObjectArray([uniqueID]));
    }
    voltmx.crypto.encrypt = function (algo, generatedkey, inputstring, propertiesTable) {
        return PWAWrapper.CryptoWrapper.encrypt(getWinRTObjectArray([algo, generatedkey, inputstring, propertiesTable], [generatedkey]));
    }
    voltmx.crypto.generateAsymmetricKeyPair = function (propertiesTable) {
        return PWAWrapper.CryptoWrapper.generateAsymmetricKeyPair(getWinRTObjectArray([propertiesTable]));
    }
    voltmx.crypto.generateSecureRandom = function (propertiesTable) {
        return PWAWrapper.CryptoWrapper.generateSecureRandom(getWinRTObjectArray([propertiesTable]));
    }
    voltmx.crypto.newKey = function (algo, keystrength, propertiesTable) {
        return PWAWrapper.CryptoWrapper.newKey(getWinRTObjectArray([algo, keystrength, propertiesTable]));
    }
    voltmx.crypto.readKey = function (uniqueID) {
        return PWAWrapper.CryptoWrapper.readKey(getWinRTObjectArray([uniqueID]));
    }
    voltmx.crypto.retrieveAsymmetricPublicKey = function (alias) {
        return PWAWrapper.CryptoWrapper.retrieveAsymmetricPublicKey(getWinRTObjectArray([alias]));
    }
    voltmx.crypto.retrievePublicKey = function (algo, inputsource, islocalresource) {
        return PWAWrapper.CryptoWrapper.retrievePublicKey(getWinRTObjectArray([algo, inputsource, islocalresource]));
    }
    voltmx.crypto.saveKey = function (name, key) {
        return PWAWrapper.CryptoWrapper.saveKey(getWinRTObjectArray([name, key], [key]));
    }
}