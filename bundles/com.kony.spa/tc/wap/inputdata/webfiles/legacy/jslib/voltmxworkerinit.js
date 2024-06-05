
voltmx = $KI = {};
$KIO = {};
$KU = {
    log: function(msg) {
        voltmx.print(msg);
    },

    logExecuting: function(apiName) {
        voltmx.print('ENTER '+ apiName);
    },

    logExecutingWithParams: function(apiName) {
    },

    logExecutingFinished: function(apiName) {
        voltmx.print( 'EXIT '+ apiName);
    }
};
voltmx.os = new Object();
voltmx.system = new Object();
var PUBLISH = false;
var IndexJL = 0;

voltmx.print = function(msg, type) {
    if(typeof console !== "undefined") {
        if(type === 'warn') console.warn(msg);
        else console.log(msg);
    }
};

tobeimplemented = function() {
    voltmx.print('to be implemented', 'warn');
}


VoltmxError = function(errorcode, name, message) {
    this.errorCode = this.errorcode = errorcode;
    this.name = name;
    this.message = message;
};
VoltmxError.prototype = new Error();
VoltmxError.prototype.constructor = VoltmxError;

voltmx.getError = function(e) {
    return e;
};


onmessage = function(oEvent) {
    var data = oEvent.data,
        basePath = self.location.href.split('/jslib/')[0] + '/appjs/worker/';

    if(typeof data.moduleName === "undefined")
        return;

    $KG = {
        "appmode": data.kgAppMode,
        "appid": data.kgAppID,
        "rcid": data.kgRcid,
        "skipproxy": data.kgSkipProxy
    };
    window = self;
    nestedWorker = true;

    if(PUBLISH) {
        importScripts('voltmxwebworkermin.js');
    } else {
        importScripts('voltmxtimerapi.js', 'voltmxconstants.js', 'voltmxosapi.js', 'voltmxsystem.js', 'voltmxnetwork.js');
        importScripts('voltmxworker.js', 'voltmxdatabaseapi.js', 'voltmxcrypto.js', 'tparty/crypto/cryptojslib.js');
        if(data.isFMSupported) {
            importScripts('voltmxFunctionalModules.js', 'voltmxmodule.js', 'tparty/requirejs/require.js');
        }
    }

    
    if($KI.db) {
        voltmx.db = {
            openDatabase: $KI.db.opendatabase,
            transaction: $KI.db.transaction,
            readTransaction: $KI.db.readtransaction,
            executeSql: $KI.db.executesql,
            sqlResultsetRowItem: $KI.db.sqlresultsetrowitem,
            changeVersion: $KI.db.changeversion
        }
    }


    
    if($KI.os) {
        voltmx.os = {
            toNumber: $KI.os.tonumber,
            toCurrency: $KI.os.tocurrency,
            freeMemory: $KI.os.freememory,
            userAgent: function() {
                return data.kgUserAgent;
            }
        }
    }


    
    if($KI.net) {
        voltmx.net = {
            HttpRequest: $KI.net.HttpRequest,
            invokeServiceAsync: $KI.net.invokeserviceasync,
            invokeService: $KI.net.invokeService,
            cancel: $KI.net.cancel,
            isNetworkAvailable: $KI.net.isNetworkAvailable,
            
            getActiveNetworkType: $KI.net.getActiveNetworkType,
            checkOriginandPostOrigin: $KI.net.checkOriginandPostOrigin,
            postdataparams: $KI.net.postdataparams
        }
    }

    
    if($KI.crypto) {
        voltmx.crypto = {
            newKey: $KI.crypto.newkey,
            
            stringify: $KI.crypto.stringify,
            parse: $KI.crypto.parse,
            createHash: $KI.crypto.createhash,
            retrievePublicKey: $KI.crypto.retrievepublickey,
            
            
            encrypt: $KI.crypto.encrypt,
            decrypt: $KI.crypto.decrypt
        }
    }

    
    if($KI.timer) {
        voltmx.timer = {
            schedule: $KI.timer.schedule,
            cancel: $KI.timer.cancel,
            setCallBack: $KI.timer.setcallback,
            callbackclosure: $KI.timer.callbackclosure,
            timerinfo: $KI.timer.timerinfo
        }
    }

    
    if(voltmx.worker) {
        voltmx.worker = {
            WorkerThread: voltmx.worker.WorkerThread
        }
    }

    
    _importScripts = importScripts;
    _addEventListener = addEventListener;
    _removeEventListener = removeEventListener;
    _postMessage = postMessage;

    importScripts = function() {
        for(i = 0; i < arguments.length; i++) {
            if(typeof arguments[i] !== "string") {
                throw new VoltmxError(3002, "WorkerThreadError", "importScripts: InvalidParameter. Invalid script name.");
            }
            try {
                _importScripts(arguments[i]);
            } catch(e) {
                if((e.name && e.name == "NetworkError") || (e.message && (/network/i).test(e.message)) || (e.message && (/Script file not found/i).test(e.message))) {
                    throw new VoltmxError(3002, "WorkerThreadError", "importScripts: InvalidParameter. Unable to import script. " + arguments[i]);
                } else {
                    throw e;
                }
            }
        }
    }

    addEventListener = function(sName, fListener) {
        if(arguments.length < 2) {
            throw new VoltmxError(3001, "WorkerThreadError", "addEventListener: MissingMandatoryParameter. Mandatory arguments missing"); 
        }
        if(typeof arguments[0] != "string" || typeof arguments[1] != "function") {
            throw new VoltmxError(3002, "WorkerThreadError", "addEventListener: InvalidParameter. Invalid arguments");
        }
        if(sName != "message" && sName != "error") {
            throw new VoltmxError(3002, "WorkerThreadError", "addEventListener: InvalidParameter. Invalid arguments");
        }
        _addEventListener(sName, fListener);
    }

    removeEventListener = function(sName, fListener) {
        if(arguments.length < 2) {
            throw new VoltmxError(3001, "WorkerThreadError", "removeEventListener: MissingMandatoryParameter. Mandatory arguments missing"); 
        }
        if(typeof arguments[0] != "string" || typeof arguments[1] != "function") {
            throw new VoltmxError(3002, "WorkerThreadError", "removeEventListener: InvalidParameter. Invalid arguments");
        }
        if(sName != "message" && sName != "error") {
            throw new VoltmxError(3002, "WorkerThreadError", "removeEventListener: InvalidParameter. Invalid arguments");
        }
        _removeEventListener(sName, fListener);
    }

    postMessage = function(vMsg) {
        if(vMsg === undefined || vMsg === null || vMsg === '') {
            throw new VoltmxError(3001, "WorkerThreadError", "postMessage: MissingMandatoryParameter. Message undefined");
        }
        if(typeof vMsg === "number" || typeof vMsg === "boolean" || typeof vMsg === "function") {
            throw new VoltmxError(3002, "WorkerThreadError", "postMessage: InvalidParameter. Invalid Message");
        }
        try {
            _postMessage(vMsg);
        } catch(err) {
            voltmx.print("Error occured in WorkerThread postMessage: " + err.message);
            throw new VoltmxError(3002, "WorkerThreadError", "postMessage: InvalidParameter. Invalid Message");
        }
    }

    try {
        if(data.moduleName.indexOf(".js") > 0) {
            _importScripts(basePath + data.moduleName);
        } else {
            var modLoaded = false;
            if(data.isFMSupported) {
                modLoaded = voltmx.modules.loadFunctionalModule(data.moduleName);
            }
            
            if(!modLoaded) {
                throw new Error("WorkerThread: InvalidParameter. WorkerThread script not found");
            }
        }
    } catch(e) {
        if((e.name && e.name == "NetworkError") || (e.message && (/network/i).test(e.message)) || (e.message && (/Script file not found/i).test(e.message))) {
            throw new Error("WorkerThread: InvalidParameter. WorkerThread script not found");
        } else {
            throw e;
        }
    }
    self.onmessage = null;
};
