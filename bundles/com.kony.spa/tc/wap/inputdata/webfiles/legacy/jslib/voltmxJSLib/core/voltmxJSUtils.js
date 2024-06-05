voltmx.type = function(arg) {
	$KU.logExecuting('voltmx.type');
	$KU.logExecutingWithParams('voltmx.type', arg);
    var result  = $KI.type(arg);

    if (result == "table" || result == "object") {
          result = arg.name == undefined ? result : arg.name;
    }
    $KU.logExecutingFinished('voltmx.type');
    return result;
};
