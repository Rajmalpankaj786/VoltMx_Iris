Object.defineProperty(voltmx, 'modules', {configurable:false, enumerable:false, writable:false, value:(function() {
    var _ns = {}, $K = voltmx.$kwebfw$;


    var _loadFunctionalModule = function(/* modulename */) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils;

        $KU.log({api:'voltmx.modules.loadFunctionalModule', enter:true});

        //TODO:: loadFunctionalModule API

        $KU.log({api:'voltmx.modules.loadFunctionalModule', exit:true});
    };


    var _loadFunctionalModuleAsync = function(/* modulename, successcallback, errorcallback */) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils;

        $KU.log({api:'voltmx.modules.loadFunctionalModuleAsync', enter:true});

        //TODO:: loadFunctionalModuleAsync API

        $KU.log({api:'voltmx.modules.loadFunctionalModuleAsync', exit:true});
    };


    $K.defVoltmxProp(_ns, [
        {keey:'loadFunctionalModule', value:_loadFunctionalModule},
        {keey:'loadFunctionalModuleAsync', value:_loadFunctionalModuleAsync}
    ]);


    return _ns;
}())});
