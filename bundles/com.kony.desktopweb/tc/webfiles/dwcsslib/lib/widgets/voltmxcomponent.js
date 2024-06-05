
(function() {
    var _mirrorFlexPosition = function Component$_mirrorFlexPosition(source, bconfig) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget,
            prop = source._kwebfw_.prop, paddingLeft = -1;

        if(!bconfig) bconfig = {};

        if($KW.shouldApplyRTL(source, 'flexPosition')) {
            if(!$KU.is(bconfig.left, 'undefined')) {
                prop.right = bconfig.left;
            }

            if(!$KU.is(bconfig.right, 'undefined')) {
                prop.left = bconfig.right;
            }

            if(!$KU.is(bconfig.padding, 'undefined')) {
                if(!bconfig.padding) {
                    prop.padding = null;
                } else {
                    if(!prop.padding) prop.padding = [];

                    paddingLeft = bconfig.padding[0];
                    prop.padding[1] = bconfig.padding[1];
                    prop.padding[3] = bconfig.padding[3];
                    prop.padding[0] = bconfig.padding[2];
                    prop.padding[2] = paddingLeft;
                }
            }
        } else {
            if(!$KU.is(bconfig.left, 'undefined')) {
                prop.left = bconfig.left;
            }

            if(!$KU.is(bconfig.right, 'undefined')) {
                prop.right = bconfig.right;
            }

            if(!$KU.is(bconfig.padding, 'undefined')) {
                prop.padding = bconfig.padding;
            }
        }
    };


    Object.defineProperty(voltmx.$kwebfw$, 'ComponentWithContract', {configurable:false, enumerable:false, writable:false, value:(function() {
        var ComponentWithContract = function ComponentWithContract(bconfig, lconfig, pspconfig, template) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils, proxy = null,
                args = [bconfig, lconfig, pspconfig], component = null;

            proxy = _voltmx.mvc.initializeMasterController(template, bconfig.id, args);
            proxy._kwebfw_.args = [
                ($KU.clone(bconfig, {function:false}) || {}),
                ($KU.clone(lconfig, {function:false}) || {}),
                ($KU.clone(pspconfig, {function:false}) || {})
            ];
            proxy._kwebfw_.prop.id = bconfig.id;
            proxy._kwebfw_.name = 'ComponentWithContract';

            _mirrorFlexPosition(proxy, bconfig);

            $KU.each(bconfig, function(value, name) {
                var prop = proxy._kwebfw_.prop;

                if(['left', 'right', 'padding'].indexOf(name) === -1) {
                    if(name === 'height' && typeof value === 'undefined') {
                        prop[name] = '';
                        prop.autogrowMode = voltmx.flex.AUTOGROW_HEIGHT;
                    } else if(Object.prototype.hasOwnProperty.call(prop, name)) {
                        prop[name] = value;
                    }
                }
            }, proxy);

            $KU.each(lconfig, function(value, name) {
                if(Object.prototype.hasOwnProperty.call(proxy._kwebfw_.prop, name)) {
                    proxy._kwebfw_.prop[name] = value;
                }
            }, proxy);

            $KU.each(pspconfig, function(value, name) {
                if(Object.prototype.hasOwnProperty.call(proxy._kwebfw_.prop, name)) {
                    proxy._kwebfw_.prop[name] = value;
                }
            }, proxy);

            component = new voltmx.ui.UserWidget(bconfig, lconfig, pspconfig);

            proxy._kwebfw_.ns = template;
            $KU.defineProperty(component._kwebfw_, 'proxy', proxy, null);
            $KU.defineProperty(proxy._kwebfw_, 'uwi', component, null);
            component._voltmxControllerName = proxy._voltmxControllerName;
            _voltmx.mvc.setMasterContract(component, bconfig.id, template);
            delete component._voltmxControllerName;

            pspconfig = lconfig = bconfig = null; //For GC

            return component;
        };

        return ComponentWithContract;
    }())});


    Object.defineProperty(voltmx.$kwebfw$, 'ComponentWithoutContract', {configurable:false, enumerable:false, writable:false, value:(function() {
        var ComponentWithoutContract = function ComponentWithoutContract(bconfig, lconfig, pspconfig, template) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils, model = null,
                args = [bconfig, lconfig, pspconfig], _ = null;

            model = _voltmx.mvc.initializeMasterController(template, bconfig.id, args);
            _ = model._kwebfw_;
            _.args = [
                ($KU.clone(bconfig, {function:false}) || {}),
                ($KU.clone(lconfig, {function:false}) || {}),
                ($KU.clone(pspconfig, {function:false}) || {})
            ];
            _.prop.id = bconfig.id;
            _.ns = template;
            _.name = 'ComponentWithoutContract';

            _mirrorFlexPosition(model, bconfig);

            $KU.each(bconfig, function(value, name) {
                var prop = model._kwebfw_.prop;

                if(['left', 'right', 'padding'].indexOf(name) === -1) {
                    if(name === 'height' && typeof value === 'undefined') {
                        prop[name] = '';
                        prop.autogrowMode = voltmx.flex.AUTOGROW_HEIGHT;
                    } else {
                        prop[name] = value;
                    }
                }
            }, model);

            $KU.each(lconfig, function(value, name) {
                model._kwebfw_.prop[name] = value;
            }, model);

            $KU.each(pspconfig, function(value, name) {
                model._kwebfw_.prop[name] = value;
            }, model);

            _voltmx.mvc.setMasterContract(model, model.id, template);

            pspconfig = lconfig = bconfig = null; //For GC

            return model;
        };

        return ComponentWithoutContract;
    }())});
}());
