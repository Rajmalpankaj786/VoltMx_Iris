
voltmx.worker = (function() {
    
    

    var module = {
        
        WorkerThread: function(sURL, fDefListener, fOnError) {
            $KU.logExecuting('voltmx.worker.WorkerThread');
            if(sURL === undefined || sURL === null || sURL === '') {
                $KU.logErrorMessage('Invalid parameters');
                throw new VoltmxError(3001, "WorkerThreadError", "WorkerThread: MissingMandatoryParameter. Failed to construct WorkerThread");
            }
            if(typeof sURL !== "string") {
                $KU.logErrorMessage('Invalid parameters');
                throw new VoltmxError(3002, "WorkerThreadError", "WorkerThread: InvalidParameter. Invalid script name");
            }
            $KU.logExecutingWithParams('voltmx.worker.WorkerThread', sURL, fDefListener, fOnError);
            var oInstance = this, workerBasePath = '';
            
            if(typeof nestedWorker === "undefined") {
                workerBasePath = voltmx.appinit.getStaticContentPath() + $KG["platformver"] + "jslib/";
            } else {
                workerBasePath = 'jslib/';
            }

            this.oWorker = new Worker(workerBasePath + "voltmxworkerinit.js");

            var kgAppMode = $KG["appmode"] || "";
            var kgAppID = $KG["appid"] || "";
            var kgSkipProxy = $KG["skipproxy"] || "";
            var kgRcid = $KG["rcid"] || "";
            var isFMSupported = false;
            var kgUserAgent = voltmx.os.userAgent();
            if(typeof $KG["functionalModules"] !== "undefined")
                isFMSupported = true;

            
            this.oWorker.postMessage({
                    moduleName: sURL,
                    contextPath: workerBasePath,
                    kgAppMode: kgAppMode,
                    kgAppID: kgAppID,
                    kgSkipProxy: kgSkipProxy,
                    kgRcid: kgRcid,
                    isFMSupported: isFMSupported,
                    kgUserAgent: kgUserAgent
                }),
                
                oInstance.defaultListener = fDefListener || function(event) {
                    voltmx.print("Data: " + event.data)
                };
            
            oInstance.defaultErrorListener = fOnError || function(e) {
                voltmx.print(e.message + " : in file - " + e.filename + " at location :" + e.lineno + "," + e.colno);
            };
            this.oWorker.addEventListener("error", oInstance.defaultErrorListener);


            
            $KU.logExecutingFinished('voltmx.worker.WorkerThread');
        },

        hasWorkerThreadSupport: function() {
            $KU.logExecuting('voltmx.worker.hasWorkerThreadSupport');
            $KU.logExecutingWithParams('voltmx.worker.hasWorkerThreadSupport');
            if(typeof Worker === "undefined") {
                $KU.logErrorMessage('Worker not defined');
                return false;
            }
            $KU.logExecutingFinished('voltmx.worker.hasWorkerThreadSupport');
            return true;
        }
    };

    
    module.WorkerThread.prototype.postMessage = function(vMsg) {
        $KU.logExecuting('worker.postMessage');
        if(vMsg === undefined || vMsg === null || vMsg === '') {
            $KU.logErrorMessage('postMessage: MissingMandatoryParameter. Message undefined');
            throw new VoltmxError(3001, "WorkerThreadError", "postMessage: MissingMandatoryParameter. Message undefined");
        }
        if(typeof vMsg === "number" || typeof vMsg === "boolean" || typeof vMsg === "function") {
            $KU.logErrorMessage('postMessage: InvalidParameter. Invalid Message');
            throw new VoltmxError(3002, "WorkerThreadError", "postMessage: InvalidParameter. Invalid Message");
        }
        $KU.logExecutingWithParams('worker.postMessage', vMsg);
        try {
            Worker.prototype.postMessage.call(this.oWorker, vMsg);
            $KU.logExecutingFinished('worker.postMessage');
        } catch(err) {
            $KU.logErrorMessage('postMessage: InvalidParameter. Invalid Message');
            voltmx.print("Error occured in WorkerThread postMessage: " + err.message);
            throw new VoltmxError(3002, "WorkerThreadError", "postMessage: InvalidParameter. Invalid Message");
        }
    };

    
    module.WorkerThread.prototype.terminate = function() {
        $KU.logExecuting('worker.terminate');
        $KU.logExecutingWithParams('worker.terminate');
        Worker.prototype.terminate.call(this.oWorker);
        $KU.logExecutingFinished('worker.terminate');
    };

    
    module.WorkerThread.prototype.addEventListener = function(sName, fListener) {
        $KU.logExecuting('worker.addEventListener');
        if(arguments.length < 2) {
            $KU.logErrorMessage('addEventListener: MissingMandatoryParameter. Mandatory arguments missing');
            throw new VoltmxError(3001, "WorkerThreadError", "addEventListener: MissingMandatoryParameter. Mandatory arguments missing"); 
        }
        if(typeof arguments[0] != "string" || typeof arguments[1] != "function") {
            $KU.logErrorMessage('addEventListener: InvalidParameter. Invalid arguments');
            throw new VoltmxError(3002, "WorkerThreadError", "addEventListener: InvalidParameter. Invalid arguments");
        }
        if(sName != "message" && sName != "error") {
            $KU.logErrorMessage('addEventListener: InvalidParameter. Invalid arguments');
            throw new VoltmxError(3002, "WorkerThreadError", "addEventListener: InvalidParameter. Invalid arguments");
        }
        $KU.logExecutingWithParams('worker.addEventListener', sName, fListener);
        fListener = fListener ? fListener : this.defaultListener;
        Worker.prototype.addEventListener.call(this.oWorker, sName, fListener, false);
        if("error" === sName) {
            Worker.prototype.removeEventListener.call(this.oWorker, "error", this.defaultErrorListener, false);
        }
        $KU.logExecutingFinished('worker.addEventListener');
    };

    
    module.WorkerThread.prototype.removeEventListener = function(sName, fListener) {
        $KU.logExecuting('worker.removeEventListener');
        if(arguments.length < 2) {
            $KU.logErrorMessage('removeEventListener: MissingMandatoryParameter. Mandatory arguments missing');
            throw new VoltmxError(3001, "WorkerThreadError", "removeEventListener: MissingMandatoryParameter. Mandatory arguments missing"); 
        }
        if(typeof arguments[0] != "string" || typeof arguments[1] != "function") {
            $KU.logErrorMessage('removeEventListener: InvalidParameter. Invalid arguments');
            throw new VoltmxError(3002, "WorkerThreadError", "removeEventListener: InvalidParameter. Invalid arguments");
        }
        if(sName != "message" && sName != "error") {
            $KU.logErrorMessage('removeEventListener: InvalidParameter. Invalid arguments');
            throw new VoltmxError(3002, "WorkerThreadError", "removeEventListener: InvalidParameter. Invalid arguments");
        }
        $KU.logExecutingWithParams('worker.removeEventListener', sName, fListener);
        Worker.prototype.removeEventListener.call(this.oWorker, sName, fListener, false);
        if("error" === sName) {
            Worker.prototype.addEventListener.call(this.oWorker, "error", this.defaultErrorListener, false);
        }
        $KU.logExecutingFinished('worker.removeEventListener');
    };


    return module;
}());
