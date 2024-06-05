




$KI.crypto = (function() {
    
    var _generateRandomNumber = function(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    var _generateRandomString = function() {
        var randomLength = 0, randomString = '', i = 0,
            possibleString = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        randomLength = _generateRandomNumber(8, 16);
        for(i = 0; i < randomLength; i++) {
          randomString += possibleString.charAt(Math.floor(Math.random() * possibleString.length));
        }
        return randomString.toUpperCase();
    };

    var _createHashToUpperCase = function(algo, toHash) {
        var hashValueToUpperCase = $KI.crypto.createhash(algo, toHash);

        if(typeof hashValueToUpperCase == 'string') {
            hashValueToUpperCase = hashValueToUpperCase.toUpperCase();
        }
        return hashValueToUpperCase;
    };
    

    var module = {
        stringify: function(cipherParams) {
            
            var jsonObj = {
                ct: cipherParams.ciphertext.toString(CryptoJS.enc.Base64)
            };
            
            if(cipherParams.iv) {
                jsonObj.iv = cipherParams.iv.toString();
            }
            if(cipherParams.salt) {
                jsonObj.s = cipherParams.salt.toString();
            }
            
            return JSON.stringify(jsonObj);
        },

        parse: function(jsonStr) {
            
            var jsonObj = JSON.parse(jsonStr);
            
            var cipherParams = CryptoJS.lib.CipherParams.create({
                ciphertext: CryptoJS.enc.Base64.parse(jsonObj.ct)
            });
            
            if(jsonObj.iv) {
                cipherParams.iv = CryptoJS.enc.Hex.parse(jsonObj.iv)
            }
            if(jsonObj.s) {
                cipherParams.salt = CryptoJS.enc.Hex.parse(jsonObj.s)
            }
            return cipherParams;
        },

        
        createhash: function(algotype, inputmessage, options) {
            var msg;
            var statuscode;
            $KU.logExecuting('voltmx.crypto.createhash');
            if(typeof(inputmessage) != "string") {
                $KU.logErrorMessage('invalid input ' + inputmessage);
                return {
                    errcode: 100,
                    errmessage: "invalid input parameters"
                };
            }
            $KU.logExecutingWithParams('voltmx.crypto.createhash', algotype, inputmessage);
            try {
                if($KG.appbehaviors.strictMode){
                    switch(algotype.toLowerCase()) {
                        case "sha256":
                            msg = CryptoJS.SHA256(inputmessage);
                            break;
                        case "sha512":
                            msg = CryptoJS.SHA512(inputmessage);
                            break;
                        default:
                            $KU.logErrorMessage('unsupported algorithm');
                            msg = {
                                errcode: 101,
                                errmessage: "unsupported algorithm"
                            }
                            break;
                    }

                }else{
                    switch(algotype.toLowerCase()) {
                        case "md5":
                            msg = CryptoJS.MD5(inputmessage);
                            break;
                        case "sha256":
                            msg = CryptoJS.SHA256(inputmessage);
                            break;
                        case "sha1":
                            msg = CryptoJS.SHA1(inputmessage);
                            break;
                        case "sha512":
                            msg = CryptoJS.SHA512(inputmessage);
                            break;
                        default:
                            $KU.logErrorMessage('unsupported algorithm');
                            msg = {
                                errcode: 101,
                                errmessage: "unsupported algorithm"
                            }
                            break;
                    }
                }
                if (typeof msg != 'string') {
                    if (typeof options === 'object' && options.returnBase64String === 'true') {
                        msg = msg.toString(CryptoJS.enc.Base64);
                    } else {
                        msg = msg.toString(CryptoJS.enc.UTF8);
                    }
                }
                $KU.logExecutingFinished('voltmx.crypto.createhash');
                return msg;
            } catch(ex) {
                $KU.logErrorMessage('unknown error' + ex);
                return {
                    errcode: 102,
                    errmessage: "unknown  error"
                };
            }
        },

        encrypt: function(algo, generatedkey, inputstring, propertiesTable) {
            $KU.logExecuting('voltmx.crypto.encrypt');
            if(typeof(algo) != "string" && inputstring && generatedkey) {
                $KU.logErrorMessage('invalid input parameters');
                return {
                    errcode: 100,
                    errmessage: "invalid input parameters"
                };
            }
            $KU.logExecutingWithParams('voltmx.crypto.encrypt', algo, generatedkey, inputstring, propertiesTable);
            var mode = CryptoJS.mode.CBC;
            var padding = CryptoJS.pad.Pkcs7;
            try {
                if(propertiesTable) {
                    if(propertiesTable.mode) {
                        switch(propertiesTable.mode.toLowerCase()) {
                            case 'cfb':
                                mode = CryptoJS.mode.CFB;
                                break;
                            case 'ctr':
                                mode = CryptoJS.mode.CTR;
                                break;
                            case 'ofb':
                                mode = CryptoJS.mode.OFB;
                                break;
                            case 'ecb':
                                mode = CryptoJS.mode.ECB;
                                break;
                        }
                    }
                    if(propertiesTable.padding) {
                        switch(propertiesTable.padding.toLowerCase()) {
                            case 'iso97971':
                                padding = CryptoJS.pad.Iso97971;
                                break;
                            case 'iso10126':
                                padding = CryptoJS.pad.Iso10126;
                                break;
                            case 'zeropadding':
                                padding = CryptoJS.pad.ZeroPadding;
                                break;
                            case 'nopadding':
                                padding = CryptoJS.pad.NoPadding;
                                break;
                        }
                    }
                }
                if(algo.toLowerCase() == "aes") {
                    var encryptedObj = CryptoJS.AES.encrypt(inputstring, generatedkey, {
                        mode: mode,
                        padding: padding
                    });
                    $KU.logExecutingFinished('voltmx.crypto.encrypt VIA encrypting using AES algorithm');
                    return module.stringify(encryptedObj);
                } else if(algo.toLowerCase() == "tripledes") {
                    var encryptedObj = CryptoJS.TripleDES.encrypt(inputstring, generatedkey, {
                        mode: mode,
                        padding: padding,
                        format: module.JsonFormatter
                    });
                    $KU.logExecutingFinished('voltmx.crypto.encrypt VIA encrypting using TripleDES algorithm');
                    return module.stringify(encryptedObj);
                } else {
                    $KU.logErrorMessage('unsupported algorithm');
                    return {
                        errcode: 101,
                        errmessage: "unsupported algorithm"
                    };
                }
            } catch(ex) {
                $KU.logErrorMessage('unknown error');
                return {
                    errcode: 102,
                    errmessage: "unknown  error"
                };
            }
        },

        decrypt: function(algo, generatedkey, inputstring, propertiesTable) {
            $KU.logExecuting('voltmx.crypto.decrypt');
            if(typeof(algo) != "string" && inputstring && generatedkey) {
                $KU.logErrorMessage('invalid input parameters');
                return {
                    errcode: 100,
                    errmessage: "invalid input parameters"
                };
            }
            $KU.logExecutingWithParams('voltmx.crypto.decrypt', algo, generatedkey, inputstring, propertiesTable);
            var mode = CryptoJS.mode.CBC;
            var padding = CryptoJS.pad.Pkcs7;
            try {
                if(propertiesTable) {
                    if(propertiesTable.mode) {
                        switch(propertiesTable.mode.toLowerCase()) {
                            case 'cfb':
                                mode = CryptoJS.mode.CFB;
                                break;
                            case 'ctr':
                                mode = CryptoJS.mode.CTR;
                                break;
                            case 'ofb':
                                mode = CryptoJS.mode.OFB;
                                break;
                            case 'ecb':
                                mode = CryptoJS.mode.ECB;
                                break;
                        }
                    }
                    if(propertiesTable.padding) {
                        switch(propertiesTable.padding.toLowerCase()) {
                            case 'iso97971':
                                padding = CryptoJS.pad.Iso97971;
                                break;
                            case 'iso10126':
                                padding = CryptoJS.pad.Iso10126;
                                break;
                            case 'zeropadding':
                                padding = CryptoJS.pad.ZeroPadding;
                                break;
                            case 'nopadding':
                                padding = CryptoJS.pad.NoPadding;
                                break;
                        }
                    }
                }
                inputstring = module.parse(inputstring);
                if(algo.toLowerCase() == "aes") {
                    var message = CryptoJS.AES.decrypt(inputstring, generatedkey, {
                        mode: mode,
                        padding: padding
                    });
                    $KU.logExecutingFinished('voltmx.crypto.decrypt VIA decryting using AES algorithm');
                    return message.toString(CryptoJS.enc.Utf8)
                } else if(algo.toLowerCase() == "tripledes") {
                    var message = CryptoJS.TripleDES.decrypt(inputstring, generatedkey, {
                        mode: mode,
                        padding: padding
                    });
                    $KU.logExecutingFinished('voltmx.crypto.decrypt VIA decryting using TripleDES algorithm');
                    return message.toString(CryptoJS.enc.Utf8)
                } else {
                    $KU.logErrorMessage('unsupported algorithm');
                    return {
                        errcode: 101,
                        errmessage: "unsupported algorithm"
                    }
                }
            } catch(ex) {
                $KU.logErrorMessage('unknown  error' + ex);
                return {
                    errcode: 102,
                    errmessage: "unknown  error"
                }
            }
        },

        retrievepublickey: function() {
            $KU.logWarnMessage('retrievepublickey is not supported in SPA');
            return;
        },

        newkey: function(phrase, optionalBits, algoObject) {
            $KU.logExecuting('voltmx.crypto.newKey');
            try {
                if(phrase != "passphrase") {
                    $KU.logErrorMessage('invalid input parameters');
                    return {
                        errcode: 100,
                        errmessage: "invalid input parameters"
                    };
                } else if(!algoObject.subalgo) {
                    $KU.logErrorMessage('subalgo parameter is missing');
                    return {
                        errcode: 105,
                        errmessage: "subalgo parameter is missing"
                    };
                }
                $KU.logExecutingWithParams('voltmx.crypto.newKey', phrase, optionalBits, algoObject);
                if(algoObject.subalgo.toLowerCase() == "aes" || algoObject.subalgo.toLowerCase() == "tripledes") {
                    $KU.logExecutingFinished('voltmx.crypto.newKey');
                    return algoObject.passphrasetext[IndexJL];
                } else {
                    $KU.logErrorMessage('unsupported algorithm');
                    return {
                        errcode: 101,
                        errmessage: "unsupported algorithm"
                    };
                }
            } catch(ex) {
                $KU.logErrorMessage('unknown error' + ex);
                return {
                    errcode: 102,
                    errmessage: "unknown error"
                };
            }
        },

        savekey: function(name, key, metainfo) {
            $KU.logExecuting('voltmx.crypto.saveKey');
            if(name == undefined || key == undefined) {
                $KU.logErrorMessage('Invalid input parameters');
                return {
                    "errcode": 100,
                    "errmsg": "Invalid input parameters"
                };
            }
            $KU.logExecutingWithParams('voltmx.crypto.saveKey', name, key, metainfo);

            try {
                if(localStorage) {
                    try {
                        localStorage.setItem(name, JSON.stringify(key));
                        $KU.logExecutingFinished('voltmx.crypto.saveKey');
                        return name;
                    } catch(e) {
                        if(e.name == "QUOTA_EXCEEDED_ERR") {
                            var errcode = 0,
                                errmsg = "";
                            if(localStorage.length === 0) {
                                $KU.logErrorMessage('Private Browsing is switched ON');
                                errcode = 102;
                                errmsg = "Private Browsing is switched ON";
                            } else {
                                $KU.logErrorMessage('unable to save the key with the specified name');
                                errcode = 101;
                                errmsg = "unable to save the key with the specified name";
                            }

                            return {
                                "errcode": errcode,
                                "errmsg": errmsg
                            };
                        }
                    }
                } else {
                    $KU.logErrorMessage('unknown error, storage not supported');
                    return {
                        "errcode": 102,
                        "errmsg": "unknown error, storage not supported"
                    };
                }
            } catch(err) {
                $KU.logErrorMessage('unknown error ' + err);
            }
        },

        readkey: function(uniqid) {
            $KU.logExecuting('voltmx.crypto.readKey');
            if(uniqid == undefined) {
                $KU.logErrorMessage('Invalid input parameters');
                return {
                    "errcode": 100,
                    "errmsg": "Invalid input parameters"
                };
            }
            $KU.logExecutingWithParams('voltmx.crypto.readKey', uniqid);

            try {
                if(localStorage) {
                    var dataobj = JSON.parse(localStorage.getItem(uniqid) || "null");
                    if(dataobj == null) {
                        $KU.logErrorMessage('unable to find the key with the specified unique ID');
                        return {
                            "errcode": 101,
                            "errmsg": "unable to find the key with the specified unique ID"
                        };
                    } else
                        $KU.logExecutingFinished('voltmx.crypto.readKey');
                        return dataobj;
                } else {
                    voltmx.print("crypto readkey failed");
                    $KU.logErrorMessage('unknown error, storage not supported');
                    return {
                        "errcode": 102,
                        "errmsg": "unknown error, storage not supported"
                    };
                }

            } catch(err) {
                $KU.logErrorMessage('unknown error ' + err);
            }

        },

        deletekey: function(uniqid) {

            $KU.logExecuting('voltmx.crypto.deleteKey');
            $KU.logExecutingWithParams('voltmx.crypto.deleteKey', uniqid);
            try {
                if(localStorage)
                    localStorage.removeItem(uniqid);
                else
                    voltmx.print("crypto delete failed");
                $KU.logExecutingFinished('voltmx.crypto.deleteKey');
            } catch(err) {
                $KU.logErrorMessage('unknown error' + err);
            }
        },

        generateSecureRandom: function (config) {
            if (!(typeof config === 'object')) {
                config = { type: 'base64', size: 36 };
            } else {
                if (['base64'].indexOf(config.type) === -1) {
                    config.type = 'base64';
                }

                if (!Number.isInteger(config.size) || config.size < 0) {
                    config.size = 36;
                }
            }

            let salt = CryptoJS.lib.WordArray.random(config.size);

            return (config.type === 'base64') ? salt.toString(CryptoJS.enc.Base64) : salt.toString(CryptoJS.enc.Hex);
        },

        createHMacHash: function() {
            voltmx.web.logger("warn", "The createHMacHash API is not supported.");
        },

        createPBKDF2Key: function() {
            voltmx.web.logger("warn", "The createPBKDF2Key API is not supported.");
        },

        getRandomNumber: function(min, max) {
            return _generateRandomNumber(min, max);
        },

        generateRandomString: function() {
            return _generateRandomString();
        },

        createHashToUpperCase: function(algo, toHash) {
            return _createHashToUpperCase(algo, toHash);
        }
    };

    return module;
}());