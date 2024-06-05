_voltmx.mvc = {
    Form2: function(bconfig, lconfig, pspconfig) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, formInstance = null;

        if(!bconfig._voltmxControllerName) {
            $KU.log('warn', 'This API is applicable only for MVC projects.');
        } else {
            if(arguments.length < 3) {
                formInstance = new voltmx.ui.Form2(bconfig);
            } else {
                formInstance = new voltmx.ui.Form2(bconfig, lconfig, pspconfig);
            }

            return formInstance;
        }
    },

    showForm: function(formModel) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils;

        $KU.log({api:'_voltmx.mvc.showForm', enter:true});

        if(formModel._voltmxControllerName) {
            formModel.show({forced:true});
            $KU.log({api:'_voltmx.mvc.showForm', exit:true});
        } else {
            $KU.log('warn', 'This API is applicable only for MVC projects.');
        }
    },

    destroyForm: function(formModel) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils;

        $KU.log({api:'_voltmx.mvc.destroyForm', enter:true});

        if(formModel._voltmxControllerName && formModel) {
            formModel.destroy({forced:true});
            $KU.log({api:'_voltmx.mvc.destroyForm', exit:true});
        } else {
            $KU.log('warn', 'This API is applicable only for MVC projects.');
        }
    }
};
