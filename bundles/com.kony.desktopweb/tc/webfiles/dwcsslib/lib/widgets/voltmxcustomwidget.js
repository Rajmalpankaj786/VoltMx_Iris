(function() {
    var $K = voltmx.$kwebfw$;

    $K.defVoltmxProp($K.ui, [
        {keey:'CustomWidget', value:{}, items:[
            {keey:'onRender', value:function() {
                var view = this._kwebfw_.view,
                    ns = _namespace.call(this),
                    config = {};

                config['uniqueId'] = this._kwebfw_.wap.replace(/_/g, '');
                ns && ns.initializeWidget(view, this, config);
            }}
        ]}
    ]);

    //All widget file must have this variable
    //All the functions will be called in the scope of widget instance
    var _dependentPropertiesValidationMessage = {};


    //All widget file must have this variable
    //All the functions will be called in the scope of widget instance
    var _getter = {
        CustomWidget: {
            //
        }
    };


    //This functions will be called in the scope of widget instance
    var _namespace = function CustomWidget$_namespace() {
        var $K = voltmx.$kwebfw$, $KU = $K.utils;
        return $KU.get(this.widgetName, window);
    };


    //All widget file must have this variable
    //This functions will be called in the scope of widget instance
    var _populateUnderscore = {
        CustomWidget: function CustomWidget$_populateUnderscore() {
            var $K = voltmx.$kwebfw$, $KU = $K.utils, _ = null;

            if(!$KU.is(this._kwebfw_, 'object')) {
                $KU.defineProperty(this, '_kwebfw_', {}, null);
            }
            _ = this._kwebfw_;

            //NOTE:: Any changes to _ (underscore) may need a change in
            //       _cleanUnderscore function of voltmxui.js file.
            if(!_.ns) {
                if($KU.is(this.__$kwebfw$ns__, 'string') && this.__$kwebfw$ns__) {
                    $KU.defineProperty(_, 'ns', this.__$kwebfw$ns__, null);
                } else {
                    $KU.defineProperty(_, 'ns', 'voltmx.ui.CustomWidget', null);
                }
            }
            if(!_.name) {
                if($KU.is(this.__$kwebfw$name__, 'string') && this.__$kwebfw$name__) {
                    $KU.defineProperty(_, 'name', this.__$kwebfw$name__, null);
                } else {
                    $KU.defineProperty(_, 'name', 'CustomWidget', null);
                }
            }

            if(!_.tpwp) $KU.defineProperty(_, 'tpwp', {}, null);
        }
    };


    //All widget file must have this variable
    //This function will be called in the scope of widget instance
    var _postInitialization = {};


    //All widget file must have this variable
    //This functions will be called in the scope of widget instance
    var _relayoutActiveTriggerer = {
        CustomWidget: function CustomWidget$_relayoutActiveTriggerer() {
            return [];
        }
    };


    //All widget file must have this variable
    //This functions will be called in the scope of widget instance
    var _relayoutPassiveTriggerer = {
        CustomWidget: function CustomWidget$_relayoutPassiveTriggerer() {
            return [];
        }
    };


    //All widget file must have this variable
    //All the functions will be called in the scope of widget instance
    var _setter = {
        CustomWidget: {
            //
        }
    };


    //All widget file must have this variable
    //All the functions will be called in the scope of widget instance
    //These function should always return a boolean value
    var _valid = {
        CustomWidget: {
            clipBounds: function CustomWidget$_valid_clipBounds(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'boolean')) {
                    flag = true;
                }

                return flag;
            }
        }
    };


    //All widget file must have this variable
    //All the functions will be called in the scope of widget instance
    //Any property here, which is set to "false", will not create a setter
    var _view = {
        CustomWidget: {
            clipBounds: function CustomWidget$_view_clipBounds(el/*, old*/) {
                var $K = voltmx.$kwebfw$, $KD = $K.dom;

                if(this.clipBounds) {
                    $KD.style(el.node, {overflowX:'hidden', overflowY:'hidden'});
                } else {
                    $KD.style(el.node, {overflowX:'visible', overflowY:'visible'});
                }
            }
        }
    };


    Object.defineProperty(voltmx.ui, 'CustomWidget', {configurable:false, enumerable:false, writable:false, value:(function() {
        var $K = voltmx.$kwebfw$;


        /**
         * voltmx.ui.CustomWidget constructor.
         *
         * @class
         * @namespace   voltmx.ui
         * @extends     voltmx.ui.BasicWidget
         * @author      Goutam Sahu <goutam.sahu@voltmx.com>
         *
         * @param       {object} bconfig - An object with basic properties.
         * @param       {object} lconfig - An object with layout properties.
         * @param       {object} pspconfig - An object with platform specific properties.
         *
         * @throws      {InvalidArgumentException} - Invalid argument is passed.
         * @throws      {InvalidPropertyException} - Invalid property or invalid value of a property is passed.
         *
         * @classdesc   A brief description about the class.
         *              -
         *              -
         *
         * @todo        Anything that thought for but not yet implemented.
         *              -
         *              -
         */
        var CustomWidget = function CustomWidget(bconfig, lconfig, pspconfig) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils, self = this,
                dependentPropertiesValidationMessage = '', prop = null;

            if(!($KU.is(pspconfig.widgetName, 'string') && pspconfig.widgetName)) {
                throw new Error('Invalid value of property "widgetName" passed for <CustomWidget> with id="'+bconfig.id+'"');
            } else {
                if(!bconfig.isPreValidated) {
                    prop = {
                        clipBounds: true
                    };
                }

                _populateUnderscore.CustomWidget.call(this);

                CustomWidget.base.call(this, bconfig, lconfig, {});

                if(!bconfig.isPreValidated) {
                    if($KU.is(_dependentPropertiesValidationMessage.CustomWidget, 'function')) {
                        dependentPropertiesValidationMessage = _dependentPropertiesValidationMessage.CustomWidget.call(this, prop, bconfig, lconfig, pspconfig);
                    }
                }

                if(dependentPropertiesValidationMessage) {
                    throw new Error(dependentPropertiesValidationMessage);
                } else {
                    if(!bconfig.isPreValidated) {
                        //Defaulting to platfom values specific to CustomWidget
                        $KU.each(prop, function(value, key) {
                            var $K = voltmx.$kwebfw$, $KU = $K.utils,
                                $KW = $K.widget, valid = false, message = '';

                            if(!Object.prototype.hasOwnProperty.call(bconfig, key)) {
                                bconfig[key] = value;
                            } else if($KW.getNonConstructorProperties(self._kwebfw_.name).indexOf(key) >= 0) {
                                throw new Error('<' + key + '> is a non-constructor property of <' + self._kwebfw_.ns + '> class.');
                            } else if(!$KU.is(_valid.CustomWidget[key], 'function')) {
                                throw new Error('<' + key + '> is available in default widget properties of <voltmx.ui.CustomWidget>, but not in <_valid.CustomWidget> namespace.');
                            } else {
                                valid = _valid.CustomWidget[key].call(self, bconfig[key]);
                                if($KU.is(valid, 'array')) {
                                    bconfig[key] = valid[0]; valid = valid[1];
                                }

                                if(valid === false || ($KU.is(valid, 'string') && valid)) {
                                    message = ('Invalid value passed to property <' + key + '> of widget <' + self._kwebfw_.ns + '>.');

                                    if($KU.is(valid, 'string')) {
                                        message += ('\n' + valid);
                                    }

                                    throw new Error(message);
                                }
                            }
                        });
                    }

                    //Defining Getters/Setters specific to CustomWidget
                    $KU.each(_view.CustomWidget, function(value, key) {
                        var $K = voltmx.$kwebfw$, $KU = $K.utils;

                        $KU.defineProperty(self._kwebfw_.prop, key, bconfig[key], {configurable:false, enumerable:true, writable:true});

                        $KU.defineGetter(self, key, function CustomWidget$_getter() {
                            var $K = voltmx.$kwebfw$, $KU = $K.utils;

                            if($KU.is(_getter.CustomWidget[key], 'function')) {
                                return _getter.CustomWidget[key].call(this, this._kwebfw_.prop[key]);
                            }
                            return this._kwebfw_.prop[key];
                        }, true);

                        $KU.defineSetter(self, key, function CustomWidget$_setter(val) {
                            var $K = voltmx.$kwebfw$, $KU = $K.utils, old = null, valid = false,
                                $KW = $K.widget, rmodel = null, final = null, message = '';

                            if(value === false) {
                                throw new Error('<'+key+'> is a readonly property of <'+this._kwebfw_.ns+'> widget.');
                            } else if(this._kwebfw_.prop[key] !== val) {
                                rmodel = $KW.rmodel(this);

                                if(rmodel && rmodel._kwebfw_.is.template && !rmodel._kwebfw_.is.cloned) {
                                    throw new Error('Cannot set any value of a widget, which is either a raw template or any of its widget.');
                                } else {
                                    valid = _valid.CustomWidget[key].call(this, val);
                                    if($KU.is(valid, 'array')) {
                                        val = valid[0]; valid = valid[1];
                                    }

                                    if(valid === false || ($KU.is(valid, 'string') && valid)) {
                                        message = ('Invalid value passed to property <'+key+'> of widget <'+self._kwebfw_.ns+'>.');

                                        if($KU.is(valid, 'string')) {
                                            message += ('\n' + valid);
                                        }

                                        throw new Error(message);
                                    } else {
                                        old = this._kwebfw_.prop[key];
                                        this._kwebfw_.prop[key] = val;

                                        if($KU.is(_setter.CustomWidget[key], 'function')) {
                                            _setter.CustomWidget[key].call(this, old);
                                        }

                                        if(_relayoutActiveTriggerer.CustomWidget().indexOf(key) >= 0) {
                                            $KW.markRelayout(this);
                                        }

                                        if(_relayoutPassiveTriggerer.CustomWidget().indexOf(key) >= 0) {
                                            final = this._kwebfw_.flex.final;

                                            if(!(final.height && final.width)) {
                                                $KW.markRelayout(this);
                                            }
                                        }

                                        $KW.onPropertyChange(this, key, old);

                                        if($KU.is(value, 'function')) {
                                            value.call(this, old);
                                        }
                                    }
                                }
                            }
                        }, false);
                    });

                    if($KU.is(_postInitialization.CustomWidget, 'function')) {
                        _postInitialization.CustomWidget.call(this);
                    }
                }

                //Defining Getters/Setters specific to CustomWidget
                $KU.each(pspconfig, function(value, key) {
                    var $K = voltmx.$kwebfw$, $KU = $K.utils;

                    $KU.defineProperty(self._kwebfw_.tpwp, key, value, {configurable:false, enumerable:true, writable:true});

                    $KU.defineGetter(self, key, function CustomWidget$_getter() {
                        return this._kwebfw_.tpwp[key];
                    }, true);

                    $KU.defineSetter(self, key, function CustomWidget$_setter(val) {
                        var $K = voltmx.$kwebfw$, $KW = $K.widget,
                            rmodel = $KW.rmodel(this), ns = null;

                        if(rmodel && rmodel._kwebfw_.is.template && !rmodel._kwebfw_.is.cloned) {
                            throw new Error('Cannot set any value of a widget, which is either a raw template or any of its widget.');
                        } else {
                            this._kwebfw_.tpwp[key] = val;

                            ns = _namespace.call(this);
                            ns && ns.modelChange(this, key, val);
                        }
                    }, false);
                });
            }

            pspconfig = lconfig = bconfig = null; //For GC
        };


        $K.utils.inherits(CustomWidget, voltmx.ui.BasicWidget);


        /**
         * Builds the view layer for voltmx.ui.CustomWidget widget.
         *
         * @override
         * @access      protected
         * @method      _render
         * @memberof    voltmx.ui.CustomWidget
         * @author      Goutam Sahu <goutam.sahu@voltmx.com>
         *
         * @returns     {HTMLElement} – CustomWidget view.
         */
        var custom__render = function CustomWidget$_render(tag) {
            var $super = voltmx.ui.CustomWidget.base.prototype, _ = this._kwebfw_,
                $K = voltmx.$kwebfw$, $KW = $K.widget, view = _.view, el = $KW.el(view);

            if(this.isVisible || $K.F.RIVW) {
                if(!view) {
                    view = $super._render.call(this, tag);

                    el = $KW.el(view);

                    _view.CustomWidget.clipBounds.call(this, el, this.clipBounds);
                }

                $KW.accessibility(this);
            }

            return view;
        };


        $K.defVoltmxProp(CustomWidget.prototype, [
            {keey:'_render', value:custom__render}
        ]);


        return CustomWidget;
    }())});
}());
