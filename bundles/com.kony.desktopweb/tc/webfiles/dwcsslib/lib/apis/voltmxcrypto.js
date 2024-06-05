/* global CryptoJS */
Object.defineProperty(voltmx, 'crypto', {configurable:false, enumerable:false, writable:false, value:(function() {
    var _ns = {}, $K = voltmx.$kwebfw$;


    var _createHash = function(algo, str, options) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, msg = '';

        $KU.log({api:'voltmx.crypto.createHash', enter:true});

        if(!$KU.is(str, 'string')) {
            return {
                errcode: 100,
                errmessage: 'invalid input parameters'
            };
        }

        try {
            if ($K.behavior.strictMode) {
                switch(algo.toLowerCase()) {
                    case 'sha256':
                        msg = CryptoJS.SHA256(str);
                        break;
                    case 'sha512':
                        msg = CryptoJS.SHA512(str);
                        break;
                    default:
                        msg = {
                            errcode: 101,
                            errmessage: 'unsupported algorithm'
                        };
                        break;
                    }
            }else{
                switch(algo.toLowerCase()) {
                    case 'md5':
                        msg = CryptoJS.MD5(str);
                        break;
                    case 'sha256':
                        msg = CryptoJS.SHA256(str);
                        break;
                    case 'sha1':
                        msg = CryptoJS.SHA1(str);
                        break;
                    case 'sha512':
                        msg = CryptoJS.SHA512(str);
                        break;
                    default:
                        msg = {
                            errcode: 101,
                            errmessage: 'unsupported algorithm'
                        };
                        break;
                    }
            }

            if(!$KU.is(msg, 'string')) {
                if($KU.is(options, 'object')) {
                    if(options.returnBase64String === 'true') {
                        msg = msg.toString(CryptoJS.enc.Base64);
                    } else {
                        msg = msg.toString(CryptoJS.enc.UTF8);
                    }
                } else {
                    msg = msg.toString(CryptoJS.enc.UTF8);
                }
            }

            $KU.log({api:'voltmx.crypto.createHash', exit:true});

            return msg;
        } catch(ex) {
            return {
                errcode: 102,
                errmessage: 'unknown  error'
            };
        }
    };

    var _createHashToUpperCase = function(algo, str) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils,
            hashValueToUpperCase = _createHash(algo, str);

        if($KU.is(hashValueToUpperCase, 'string')) {
            hashValueToUpperCase = hashValueToUpperCase.toUpperCase();
        }

        return hashValueToUpperCase;
    };

    var _createPBKDF2Key = function(algo, password, salt, iteration, klen) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, key, hashFun;

        $KU.log({api:'voltmx.crypto._createPBKDF2Key', enter:true});

        if(!$KU.is(password, 'string')) {
            return {
                errcode: 100,
                errmessage: 'invalid input parameters'
            };
        }

        try {
            if ($K.behavior.strictMode) {
                switch(algo.toLowerCase()) {
                    case 'sha256':
                        hashFun = CryptoJS.algo.SHA256;
                        break;
                    case 'sha512':
                        hashFun = CryptoJS.algo.SHA512;
                        break;
                    default:
                        break;
                    }
            }else{
                switch(algo.toLowerCase()) {
                    case 'md5':
                        hashFun = CryptoJS.algo.MD5;
                        break;
                    case 'sha256':
                        hashFun = CryptoJS.algo.SHA256;
                        break;
                    case 'sha1':
                        hashFun = CryptoJS.algo.SHA1;
                        break;
                    case 'sha512':
                        hashFun = CryptoJS.algo.SHA512;
                        break;
                    default:
                        break;
                }
            }

            if(hashFun) {
                klen = klen ? klen/32 : 256/32;
                key = CryptoJS.PBKDF2(password, salt, {keySize: klen, iterations: iteration, hasher: hashFun});
                return key.toString();
            }

            $KU.log({api:'voltmx.crypto.createPBKDF2Key', exit:true});

            return {
                errcode: 101,
                errmessage: 'unsupported  algo'
            };
        } catch(err) {
            return {
                errcode: 102,
                errmessage: 'unknown  error'
            };
        }
    };

    var _decrypt = function(algo, generatedkey, encryptedRawbytes, propertiesTable) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils,
            mode = CryptoJS.mode.CBC, msg = '',
            padding = CryptoJS.pad.Pkcs7;

        $KU.log({api:'voltmx.crypto.decrypt', enter:true});

        if(!$KU.is(algo, 'string') && encryptedRawbytes && generatedkey) {
            $KU.log({api:'voltmx.crypto.decrypt', exit:true});

            return {
                errcode: 100,
                errmessage: 'invalid input parameters'
            };
        }

        try{
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
                        default:
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
                        default:
                            break;
                    }
                }
            }

            encryptedRawbytes = _parse(encryptedRawbytes);

            if(algo.toLowerCase() === 'aes') {
                msg = CryptoJS.AES.decrypt(encryptedRawbytes, generatedkey, {
                    mode: mode,
                    padding: padding
                });

                $KU.log({api:'voltmx.crypto.decrypt', exit:true});

                return msg.toString(CryptoJS.enc.Utf8);
            } else if(algo.toLowerCase() === 'tripledes') {
                msg = CryptoJS.TripleDES.decrypt(
                    encryptedRawbytes,
                    generatedkey, {
                        mode: mode,
                        padding: padding
                    }
                );

                $KU.log({api:'voltmx.crypto.decrypt', exit:true});

                return msg.toString(CryptoJS.enc.Utf8);
            }
            $KU.log({api:'voltmx.crypto.decrypt', exit:true});

            return {
                errcode: 101,
                errmessage: 'unsupported algorithm'
            };
        } catch(err) {
            return {
                errcode: 102,
                errmessage: 'unknown  error'
            };
        }
    };


    var _deleteKey = function(uid) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, store = $K.store;

        $KU.log({api:'voltmx.crypto.deleteKey', enter:true});
        store.remove('local', uid);
        $KU.log({api:'voltmx.crypto.deleteKey', exit:true});
    };


    var _encrypt = function(algo, generatedkey, str, propertiesTable) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, mode = CryptoJS.mode.CBC,
            encryptedObj = null, padding = CryptoJS.pad.Pkcs7;

        $KU.log({api:'voltmx.crypto.createHash', enter:true});

        if(!$KU.is(algo, 'string') && str && generatedkey) {
            $KU.log({api:'voltmx.crypto.encrypt', exit:true});

            return {
                errcode: 100,
                errmessage: 'invalid input parameters'
            };
        }

        try{
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
                        default:
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
                        default:
                            break;
                    }
                }
            }

            if(algo.toLowerCase() === 'aes') {
                encryptedObj = CryptoJS.AES.encrypt(str, generatedkey, {
                    mode: mode,
                    padding: padding
                });

                $KU.log({api:'voltmx.crypto.encrypt', exit:true});

                return _stringify(encryptedObj);
            } else if(algo.toLowerCase() === 'tripledes') {
                encryptedObj = CryptoJS.TripleDES.encrypt(str, generatedkey, {
                    mode: mode,
                    padding: padding,
                    format: _jsonFormatter
                });

                $KU.log({api:'voltmx.crypto.encrypt', exit:true});

                return _stringify(encryptedObj);
            }
            $KU.log({api:'voltmx.crypto.encrypt', exit:true});

            return {
                errcode: 101,
                errmessage: 'unsupported algorithm'
            };
        } catch(ex) {
            return {
                errcode: 102,
                errmessage: 'unknown  error'
            };
        }
    };


    var _generateRandomNumber = function(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);

        return Math.floor(Math.random() * (max - min + 1)) + min;
    };


    var _generateRandomString = function() {
        var possibleString = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
            randomLength = _generateRandomNumber(8, 16), i = 0,
            possibleLength = possibleString.length, randomString = '';

        for(i=0; i< randomLength; i++) {
            randomString += possibleString.charAt(Math.floor(Math.random() * possibleLength));
        }

        return randomString.toUpperCase();
    };


    var _generateSecureRandom = function(config) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, salt = null;

        if(!$KU.is(config, 'object')) {
            config = {type:'base64', size:36};
        } else {
            if(['base64'].indexOf(config.type) === -1) {
                config.type = 'base64';
            }

            if(!$KU.is(config.size, 'integer') || config.size < 0) {
                config.size = 36;
            }
        }

        salt = CryptoJS.lib.WordArray.random(config.size);

        return (config.type === 'base64')
            ? salt.toString(CryptoJS.enc.Base64)
            : salt.toString(CryptoJS.enc.Hex);
    };


    var _jsonFormatter = function() {
        //Not available in SPA repo too. Ask Shankar about it.
    };


    var _newKey = function(algo, keystrength, algoObject) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils;

        $KU.log({api:'voltmx.crypto.newKey', enter:true});

        try{
            if(algo !== 'passphrase') {
                $KU.log({api:'voltmx.crypto.newKey', exit:true});

                return {
                    errcode: 100,
                    errmessage: 'invalid input parameters'
                };
            } else if(!algoObject.subalgo) {
                $KU.log({api:'voltmx.crypto.newKey', exit:true});

                return {
                    errcode: 105,
                    errmessage: 'subalgo parameter is missing'
                };
            }
            if(algoObject.subalgo.toLowerCase() === 'aes'
            || algoObject.subalgo.toLowerCase() === 'tripledes') {
                $KU.log({api:'voltmx.crypto.newKey', exit:true});

                return algoObject.passphrasetext[0];
            }
            $KU.log({api:'voltmx.crypto.newKey', exit:true});

            return {
                errcode: 101,
                errmessage: 'unsupported algorithm'
            };
        } catch(ex) {
            return {
                errcode: 102,
                errmessage: 'unknown error'
            };
        }
    };


    var _parse = function(str) {
        var json = JSON.parse(str), cipher = null;

        //Extract ciphertext from json object, and create cipher params object
        cipher = CryptoJS.lib.CipherParams.create({
            ciphertext: CryptoJS.enc.Base64.parse(json.ct)
        });

        // optionally extract iv and salt
        if(json.iv) {
            cipher.iv = CryptoJS.enc.Hex.parse(json.iv);
        }

        if(json.s) {
            cipher.salt = CryptoJS.enc.Hex.parse(json.s);
        }

        return cipher;
    };


    var _readKey = function(uid) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils,
            store = $K.store, dataobj = null;

        $KU.log({api:'voltmx.crypto.readKey', enter:true});

        if($KU.is(uid, 'undefined')) {
            $KU.log({api:'voltmx.crypto.readKey', enter:true});

            return {
                errcode: 100,
                errmsg: 'Invalid input parameters'
            };
        }

        try{
            if(localStorage) {
                dataobj = JSON.parse(store.fetch('local', uid) || 'null');

                if(dataobj === null) {
                    $KU.log({api:'voltmx.crypto.readKey', exit:true});

                    return {
                        errcode: 101,
                        errmsg: 'unable to find the key with the specified unique ID'
                    };
                }
                $KU.log({api:'voltmx.crypto.readKey', exit:true});

                return dataobj;
            }
            $KU.log({api:'voltmx.crypto.readKey', exit:true});

            return {
                errcode: 102,
                errmsg: 'unknown error, storage not supported'
            };
        } catch(err) {
            //
        }
    };


    var _saveKey = function(name, key) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, store = $K.store;

        $KU.log({api:'voltmx.crypto.saveKey', enter:true});

        if($KU.is(name, 'undefined') || $KU.is(key, 'undefined')) {
            $KU.log({api:'voltmx.crypto.saveKey', exit:true});

            return {
                errcode: 100,
                errmsg: 'Invalid input parameters'
            };
        }

        store.put('local', name, JSON.stringify(key));
        $KU.log({api:'voltmx.crypto.saveKey', exit:true});
        return name;
    };


    var _stringify = function(obj) {
        // create json object with ciphertext
        var jsonObj = {
            ct: obj.ciphertext.toString(CryptoJS.enc.Base64)
        };

        // optionally add iv and salt
        if(obj.iv) {
            jsonObj.iv = obj.iv.toString();
        }

        if(obj.salt) {
            jsonObj.s = obj.salt.toString();
        }

        // stringify json object
        return JSON.stringify(jsonObj);
    };


    $K.defVoltmxProp(_ns, [
        {keey:'createHash', value:_createHash},
        {keey:'createHashToUpperCase', value:_createHashToUpperCase},
        {keey:'createPBKDF2Key', value:_createPBKDF2Key},
        {keey:'decrypt', value:_decrypt},
        {keey:'deleteKey', value:_deleteKey},
        {keey:'encrypt', value:_encrypt},
        {keey:'generateRandomNumber', value:_generateRandomNumber},
        {keey:'generateRandomString', value:_generateRandomString},
        {keey:'generateSecureRandom', value:_generateSecureRandom},
        {keey:'newKey', value:_newKey},
        {keey:'readKey', value:_readKey},
        {keey:'saveKey', value:_saveKey}
    ]);


    return _ns;
}())});
