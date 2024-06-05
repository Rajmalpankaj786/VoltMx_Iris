_voltmx.mvc = {
    Form2: function(bconfig, lconfig, pspconfig) {
        var formInstance;
        if(!bconfig._voltmxControllerName) {
            voltmx.web.logger("warn", "This API is applicable only for MVC projects");
            return;
        }
        if(arguments.length < 3) {
            formInstance = new voltmx.ui.Form2(bconfig);
        } else {
            formInstance = new voltmx.ui.Form2(bconfig, lconfig, pspconfig);
        }
        formInstance.destroy = undefined;
        return formInstance;
    },

    showForm: function(formModel) {
        if(formModel._voltmxControllerName) {
            formModel._show();
        } else {
            voltmx.web.logger("warn", "This API is applicable only for MVC projects");
        }
    },

    destroyForm: function(formModel) {
        $KU.logExecuting('voltmx.application.destroyForm');
        if(formModel._voltmxControllerName && formModel) {
            $KU.logExecutingWithParams('voltmx.application.destroyForm', formModel);
            formModel._destroy({"isMVC": true});
            $KU.logExecutingFinished('voltmx.application.destroyForm');
        } else {
            $KU.logWarnMessage("This API is applicable only for MVC projects");
        }
    }
};
