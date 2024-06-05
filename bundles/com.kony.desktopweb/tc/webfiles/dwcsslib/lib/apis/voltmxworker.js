Object.defineProperty(voltmx, 'worker', {configurable:false, enumerable:false, writable:false, value:(function() {
    var _ns = {}, $K = voltmx.$kwebfw$;


    var _addEventListener = function Worker$_addEventListener(sName, fListener) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils;

        $KU.log({api:'worker.addEventListener', enter:true});
        if(arguments.length < 2) {
            $KU.log('addEventListener: MissingMandatoryParameter. Mandatory arguments missing');
            throw new VoltmxError(3001, 'WorkerThreadError', 'addEventListener: MissingMandatoryParameter. Mandatory arguments missing');
        }
        if(typeof sName !== 'string' || typeof fListener !== 'function') {
            $KU.log('addEventListener: InvalidParameter. Invalid arguments');
            throw new VoltmxError(3002, 'WorkerThreadError', 'addEventListener: InvalidParameter. Invalid arguments');
        }
        if(sName !== 'message' && sName !== 'error') {
            $KU.log('addEventListener: InvalidParameter. Invalid arguments');
            throw new VoltmxError(3002, 'WorkerThreadError', 'addEventListener: InvalidParameter. Invalid arguments');
        }
        $KU.log('worker.addEventListener', sName, fListener);
        fListener = fListener ? fListener : this.defaultListener;
        Worker.prototype.addEventListener.call(this.oWorker, sName, fListener, false);
        if('error' === sName) {
            Worker.prototype.removeEventListener.call(this.oWorker, 'error', this.defaultErrorListener, false);
        }

        $KU.log({api:'worker.addEventListener', exit:true});
    };


    var _hasWorkerThreadSupport = function() {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, workerSupport = true;

        $KU.log({api:'voltmx.worker.hasWorkerThreadSupport', enter:true});

        if(typeof Worker === 'undefined') {
            $KU.log('Worker not defined');
            workerSupport = false;
        }

        $KU.log({api:'voltmx.worker.hasWorkerThreadSupport', exit:true});

        return workerSupport;
    };


    var _postMessage = function Worker$_postMessage(vMsg) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils;

        $KU.log({api:'worker.postMessage', enter:true});
        if(vMsg === undefined || vMsg === null || vMsg === '') {
            $KU.log('postMessage: MissingMandatoryParameter. Message undefined');
            throw new VoltmxError(3001, 'WorkerThreadError', 'postMessage: MissingMandatoryParameter. Message undefined');
        }
        if(typeof vMsg === 'number' || typeof vMsg === 'boolean' || typeof vMsg === 'function') {
            $KU.log('postMessage: InvalidParameter. Invalid Message');
            throw new VoltmxError(3002, 'WorkerThreadError', 'postMessage: InvalidParameter. Invalid Message');
        }
        $KU.log('worker.postMessage', vMsg);
        try{
            Worker.prototype.postMessage.call(this.oWorker, vMsg);
            $KU.log({api:'worker.postMessage', exit:true});
        } catch(err) {
            $KU.log('postMessage: InvalidParameter. Invalid Message');
            voltmx.print('Error occured in WorkerThread postMessage: ' + err.message);
            throw new VoltmxError(3002, 'WorkerThreadError', 'postMessage: InvalidParameter. Invalid Message');
        }
    };


    var _removeEventListener = function Worker$_removeEventListener(sName, fListener) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils;

        $KU.log({api:'worker.removeEventListener', enter:true});
        if(arguments.length < 2) {
            $KU.log('removeEventListener: MissingMandatoryParameter. Mandatory arguments missing');
            throw new VoltmxError(3001, 'WorkerThreadError', 'removeEventListener: MissingMandatoryParameter. Mandatory arguments missing');
        }
        if(typeof sName !== 'string' || typeof fListener !== 'function') {
            $KU.log('removeEventListener: InvalidParameter. Invalid arguments');
            throw new VoltmxError(3002, 'WorkerThreadError', 'removeEventListener: InvalidParameter. Invalid arguments');
        }
        if(sName !== 'message' && sName !== 'error') {
            $KU.log('removeEventListener: InvalidParameter. Invalid arguments');
            throw new VoltmxError(3002, 'WorkerThreadError', 'removeEventListener: InvalidParameter. Invalid arguments');
        }
        $KU.log('worker.removeEventListener', sName, fListener);
        Worker.prototype.removeEventListener.call(this.oWorker, sName, fListener, false);
        if('error' === sName) {
            Worker.prototype.addEventListener.call(this.oWorker, 'error', this.defaultErrorListener, false);
        }
        $KU.log({api:'worker.removeEventListener', exit:true});
    };


    var _terminate = function Worker$_terminate() {
        var $K = voltmx.$kwebfw$, $KU = $K.utils;

        $KU.log({api:'worker.terminate', enter:true});
        Worker.prototype.terminate.call(this.oWorker);
        $KU.log({api:'worker.terminate', exit:true});
    };

    //eslint-disable-next-line no-global-assign,no-implicit-globals
    var VoltmxError = function(errorcode, name, message) {
        this.errorCode = this.errorcode = errorcode;
        this.name = name;
        this.message = message;
    };
    VoltmxError.prototype = new Error();
    VoltmxError.prototype.constructor = VoltmxError;

    var _WorkerThread = function(workerjs, fDefListener, fOnError) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KG = $K.globals, workerInstance = this,
            isFMSupported = false, workerInitPath = $KG.platform+'/lib/';

        if($K.ecmaEnable) {
            workerInitPath = $KG.platform+'/es5lib/';
        }

        $KU.log({api:'voltmx.worker.WorkerThread', enter:true});

        if(workerjs === undefined || workerjs === null || workerjs === '') {
            $KU.log('Invalid parameters');
            throw new Error(3001, 'WorkerThreadError', 'WorkerThread: MissingMandatoryParameter. Failed to construct WorkerThread');
        }
        if(typeof workerjs !== 'string') {
            $KU.log('Invalid parameters');
            throw new Error(3002, 'WorkerThreadError', 'WorkerThread: InvalidParameter. Invalid script name');
        }
        $KU.log('voltmx.worker.WorkerThread', workerjs, fDefListener, fOnError);

        if(typeof nestedWorker === 'undefined') {
            this.oWorker = new Worker(workerInitPath + 'voltmxworkerinit.js');
        } else {
            this.oWorker = new Worker('voltmxworkerinit.js');
        }


        this.oWorker.postMessage({
            moduleName: workerjs,
            platform: $KG.platform,
            kgAppMode: 'kgAppMode', // TODO
            kgAppID: 'kgAppID', // TODO
            isFMSupported: isFMSupported,
            kgUserAgent: voltmx.os.userAgent()
        }),

        workerInstance.defaultListener = fDefListener || function(event) {
            voltmx.print('Data: ' + event.data);
        };

        workerInstance.defaultErrorListener = fOnError || function(e) {
            voltmx.print(e.message + ' : in file - ' + e.filename + ' at location :' + e.lineno + ',' + e.colno);
        };

        this.oWorker.addEventListener('error', workerInstance.defaultErrorListener);


        $K.defVoltmxProp(workerInstance, [
            {keey:'addEventListener', value:_addEventListener},
            {keey:'postMessage', value:_postMessage},
            {keey:'removeEventListener', value:_removeEventListener},
            {keey:'terminate', value:_terminate}
        ]);

        $KU.log({api:'voltmx.worker.WorkerThread', exit:true});
    };


    $K.defVoltmxProp(_ns, [
        {keey:'hasWorkerThreadSupport', value:_hasWorkerThreadSupport},
        {keey:'WorkerThread', value:_WorkerThread}
    ]);


    return _ns;
}())});
