Object.defineProperty(voltmx.$kwebfw$, 'log', {configurable:false, enumerable:false, writable:false, value:(function() {
    var _ns = {}, $K = voltmx.$kwebfw$;


    //eslint-disable-next-line no-unused-vars
    var _log = function $KL_log(category, code, message, error, type) {
        if(arguments.length !== 5) {
            //eslint-disable-next-line no-console
            console.log(message);
        } else {
            //
        }
    };


    //eslint-disable-next-line no-unused-vars
    var _print = function $KL_print(log, index) {
        if(!_shouldPrint(log, index)) return;

        //
    };


    //eslint-disable-next-line no-unused-vars
    var _shouldPrint = function $KL_shouldPrint(log, index) {
        return true; //TODO::
    };


    var _debug = function $KL_debug(category, code, message, error) {
        if(arguments.length !== 4) error = null;
        _log(category, code, message, error, 'debug');
    };


    var _error = function $KL_error(category, code, message, error) {
        if(arguments.length !== 4) error = null;
        _log(category, code, message, error, 'error');
    };


    var _fatal = function $KL_fatal(category, code, message, error) {
        if(arguments.length !== 4) error = null;
        _log(category, code, message, error, 'fatal');
    };


    var _info = function $KL_info(category, code, message, error) {
        if(arguments.length !== 4) error = null;
        _log(category, code, message, error, 'info');
    };


    var _notice = function $KL_notice(category, code, message, error) {
        if(arguments.length !== 4) error = null;
        _log(category, code, message, error, 'notice');
    };


    var _trace = function $KL_trace(category, code, message, error) {
        if(arguments.length !== 4) error = null;
        _log(category, code, message, error, 'trace');
    };


    var _warn = function $KL_warn(category, code, message, error) {
        if(arguments.length !== 4) error = null;
        _log(category, code, message, error, 'warn');
    };


    $K.defVoltmxProp(_ns, [
        {keey:'debug', value:_debug},
        {keey:'error', value:_error},
        {keey:'fatal', value:_fatal},
        {keey:'info', value:_info},
        {keey:'notice', value:_notice},
        {keey:'trace', value:_trace},
        {keey:'warn', value:_warn}
    ]);


    return _ns;
}())});
