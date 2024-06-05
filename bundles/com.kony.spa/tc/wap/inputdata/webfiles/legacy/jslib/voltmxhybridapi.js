if(typeof(hybrid) === "undefined") {
    hybridfunc = function(funcname, params) {
        var arg = [];
        if(params.length) {
            var paramslength = IndexJL ? params.length + 1 : params.length;
            for(i = IndexJL; i < params.length; i++) {
                arg[i] = params[i];
            }
        }
        var funcobj = window[funcname];
        funcobj && funcobj(arg[IndexJL], arg[IndexJL + 1], arg[IndexJL + 2], arg[IndexJL + 3], arg[IndexJL + 4], arg[IndexJL + 5], arg[IndexJL + 6], arg[IndexJL + 7], arg[IndexJL + 8], arg[IndexJL + 9], arg[IndexJL + 10]);
    };

    hybrid = {};
    voltmx.hybrid = {};

    voltmx.hybrid.executeFunctionInSPAContext = hybrid.executefunctioninspacontext = hybridfunc;
    voltmx.hybrid.executeFunctionInTCContext = hybrid.executefunctionintccontext = function(funcname, params) {
        voltmx.print("hybrid.executefunctionintccontext <-");
        if($KG["appmode"] == constants.APPLICATION_MODE_HYBRID || $KG["appmode"] == constants.APPLICATION_MODE_WRAPPER) {
            voltmx.print("invoked internal.executefunctionintccontext");
            internal && internal.executefunctionintccontext(funcname, params)
        } else {
            hybridfunc(funcname, params);
        }
        voltmx.print("hybrid.executefunctionintccontext ->");

    };

    voltmx.hybrid.executeFunctionInNativeContext = hybrid.executefunctioninnativecontext = function(funcname, params) {
        voltmx.print("hybrid.executefunctioninnativecontext <--");
        if($KG["appmode"] == constants.APPLICATION_MODE_HYBRID || $KG["appmode"] == constants.APPLICATION_MODE_WRAPPER) {
            voltmx.print("invoked internal.executefunctioninnativecontext");
            internal && internal.executefunctioninnativecontext(funcname, params);

        } else {
            hybridfunc(funcname, params);
        }
        voltmx.print("hybrid.executefunctioninnativecontext ->");
    };
}


if(typeof(voltmxhybrid) === "undefined") {
    var voltmxhybrid = {
        
        
        showspaform: function(formid) {
            voltmx.print("showspaform <- :formid: " + formid);
            if(typeof(formid) == "string") {
                var formmodel = $KU.getFormModel(formid);
                if(formmodel) {
                    $KW.Form.handleshow(formmodel);
                }
            }
            voltmx.print("showspaform ->");
        }
    };
}
