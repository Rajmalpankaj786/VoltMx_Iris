(function() {
    var $K = voltmx.$kwebfw$;

    $K.defVoltmxProp($K.ui, [
        {keey:'Button', value:{}, items:[
            {keey:'setupUIInteraction', value:function(dom, clone) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget,
                    $KD = $K.dom, tabindex = $KW.tabIndex(this, clone);

                if($KW.disabled(this)) {
                    $KD.setAttr(dom, 'disabled', 'true');
                    $KD.setAttr(dom, 'tabindex', -1);
                } else if(!$KW.interactable(this)) {
                    $KD.setAttr(dom, 'tabindex', -1);
                } else {
                    $KD.setAttr(dom, 'disabled', 'false');

                    if($KU.is(tabindex, 'integer')) {
                        $KD.setAttr(dom, 'tabindex', tabindex);
                    } else {
                        $KD.removeAttr(dom, 'tabindex');
                    }
                }
            }}
        ]}
    ]);


    //All widget file must have this variable
    //All the functions will be called in the scope of widget instance
    var _dependentPropertiesValidationMessage = {};


    //All widget file must have this variable
    //All the functions will be called in the scope of widget instance
    var _getter = {
        Button: {
            text: function Button$_getter_text() {
                var $K = voltmx.$kwebfw$, $KU = $K.utils,
                    prop = this._kwebfw_.prop, text = prop.text;

                if(prop.i18n_text) {
                    text = $KU.getI18Nvalue(prop.i18n_text);
                }

                return text;
            },

            toolTip: function Button$_getter_toolTip() {
                var $K = voltmx.$kwebfw$, $KU = $K.utils,
                    prop = this._kwebfw_.prop, toolTip = prop.toolTip;

                if(prop.i18n_toolTip) {
                    toolTip = $KU.getI18Nvalue(prop.i18n_toolTip);
                }

                return toolTip;
            }
        }
    };


    //All widget file must have this variable
    //This functions will be called in the scope of widget instance
    var _populateUnderscore = {
        Button: function Button$_populateUnderscore() {
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
                    $KU.defineProperty(_, 'ns', 'voltmx.ui.Button', null);
                }
            }
            if(!_.name) {
                if($KU.is(this.__$kwebfw$name__, 'string') && this.__$kwebfw$name__) {
                    $KU.defineProperty(_, 'name', this.__$kwebfw$name__, null);
                } else {
                    $KU.defineProperty(_, 'name', 'Button', null);
                }
            }
        }
    };


    //All widget file must have this variable
    //This function will be called in the scope of widget instance
    var _postInitialization = {
        Button: function Button$_postInitialization() {
            var $K = voltmx.$kwebfw$, $KU = $K.utils,
                _ = this._kwebfw_, prop = _.prop;

            if($KU.is(prop.padding, 'null')) {
                prop.padding = [0, 0, 0, 0];
            }

            if($KU.is(prop.skin, 'null')) {
                prop.skin = 'defBtnNormal';
            }

            if(prop.i18n_text) {
                prop.text = prop.i18n_text;
            }

            if(prop.i18n_toolTip) {
                prop.toolTip = prop.i18n_toolTip;
            }
        }
    };


    //All widget file must have this variable
    //This functions will be called in the scope of widget instance
    var _relayoutActiveTriggerer = {
        Button: function Button$_relayoutActiveTriggerer() {
            return [];
        }
    };


    //All widget file must have this variable
    //This functions will be called in the scope of widget instance
    var _relayoutPassiveTriggerer = {
        Button: function Button$_relayoutPassiveTriggerer() {
            return ['text'];
        }
    };


    //All widget file must have this variable
    //All the functions will be called in the scope of widget instance
    var _setter = {
        Button: {
            text: function Button$_setter_text(/*old*/) {
                this._kwebfw_.prop.i18n_text = '';
            },

            toolTip: function Button$_setter_toolTip(/*old*/) {
                this._kwebfw_.prop.i18n_toolTip = '';
            }
        }
    };


    //All widget file must have this variable
    //All the functions will be called in the scope of widget instance
    //These function should always return a boolean value
    var _valid = {
        Button: {
            i18n_text: function Button$_valid_i18n_text(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'string')) {
                    if(!value) {
                        flag = true;
                    } else if(value.toLowerCase().indexOf('voltmx.i18n.getlocalizedstring') === 0) {
                        flag = true;
                    }
                }

                return flag;
            },

            i18n_toolTip: function Button$_valid_i18n_toolTip(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'string')) {
                    if(!value) {
                        flag = true;
                    } else if(value.toLowerCase().indexOf('voltmx.i18n.getlocalizedstring') === 0) {
                        flag = true;
                    }
                }

                return flag;
            },

            text: function Button$_valid_text(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'string')) {
                    flag = true;
                }

                if(!flag && $K.F.EIWP) {
                    flag = ['', true];
                }

                return flag;
            },

            toolTip: function Button$_valid_toolTip(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'string')) {
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
        Button: {
            i18n_text: false,

            i18n_toolTip: false,

            text: function Button$_view_text(el/*, old*/) {
                var $K = voltmx.$kwebfw$, $KD = $K.dom;

                $KD.text(el.node, this.text);
            },

            toolTip: function Button$_view_toolTip(el /*,old*/) {
                var $K = voltmx.$kwebfw$, $KD = $K.dom;

                if(this.toolTip) {
                    $KD.setAttr(el.node, 'title', this.toolTip);
                } else {
                    $KD.removeAttr(el.node, 'title');
                }
            }
        }
    };


    Object.defineProperty(voltmx.ui, 'Button', {configurable:false, enumerable:false, writable:false, value:(function() {
        var $K = voltmx.$kwebfw$;


        /**
         * voltmx.ui.Button constructor.
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
        var Button = function Button(bconfig, lconfig, pspconfig) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils, self = this,
                dependentPropertiesValidationMessage = '', prop = null;

            if(!$KU.is(bconfig, 'object')) bconfig = {};

            if(!bconfig.isPreValidated) {
                prop = {
                    i18n_text: '',
                    i18n_toolTip: '',
                    text: '',
                    toolTip: ''
                };
            }

            _populateUnderscore.Button.call(this);

            if(!$KU.is(bconfig.id, 'string') || !bconfig.id) {
                bconfig.id = (this._kwebfw_.name+$KU.uid());
            }

            Button.base.call(this, bconfig, lconfig, pspconfig);

            if(!bconfig.isPreValidated) {
                if($KU.is(_dependentPropertiesValidationMessage.Button, 'function')) {
                    dependentPropertiesValidationMessage = _dependentPropertiesValidationMessage.Button.call(this, prop, bconfig, lconfig, pspconfig);
                }
            }

            if(dependentPropertiesValidationMessage) {
                throw new Error(dependentPropertiesValidationMessage);
            } else {
                if(!bconfig.isPreValidated) {
                    //Defaulting to platfom values specific to Button
                    $KU.each(prop, function(value, key) {
                        var $K = voltmx.$kwebfw$, $KU = $K.utils,
                            $KW = $K.widget, valid = false, message = '';

                        if(!Object.prototype.hasOwnProperty.call(bconfig, key)) {
                            bconfig[key] = value;
                        } else if($KW.getNonConstructorProperties(self._kwebfw_.name).indexOf(key) >= 0) {
                            throw new Error('<' + key + '> is a non-constructor property of <' + self._kwebfw_.ns + '> class.');
                        } else if(!$KU.is(_valid.Button[key], 'function')) {
                            throw new Error('<' + key + '> is available in default widget properties of <voltmx.ui.Button>, but not in <_valid.Button> namespace.');
                        } else {
                            valid = _valid.Button[key].call(self, bconfig[key]);
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

                //Defining Getters/Setters specific to Button
                $KU.each(_view.Button, function(value, key) {
                    var $K = voltmx.$kwebfw$, $KU = $K.utils;

                    $KU.defineProperty(self._kwebfw_.prop, key, bconfig[key], {configurable:false, enumerable:true, writable:true});

                    $KU.defineGetter(self, key, function Button$_getter() {
                        var $K = voltmx.$kwebfw$, $KU = $K.utils;

                        if($KU.is(_getter.Button[key], 'function')) {
                            return _getter.Button[key].call(this, this._kwebfw_.prop[key]);
                        }
                        return this._kwebfw_.prop[key];
                    }, true);

                    $KU.defineSetter(self, key, function Button$_setter(val) {
                        var $K = voltmx.$kwebfw$, $KU = $K.utils, old = null,
                            valid = false, $KW = $K.widget, rmodel = null,
                            final = null, message = '', el = null;

                        if(value === false) {
                            throw new Error('<'+key+'> is a readonly property of <'+this._kwebfw_.ns+'> widget.');
                        } else if(this._kwebfw_.prop[key] !== val) {
                            rmodel = $KW.rmodel(this);

                            if(rmodel && rmodel._kwebfw_.is.template && !rmodel._kwebfw_.is.cloned) {
                                throw new Error('Cannot set any value of a widget, which is either a raw template or any of its widget.');
                            } else {
                                valid = _valid.Button[key].call(this, val);
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

                                    if($KU.is(_setter.Button[key], 'function')) {
                                        _setter.Button[key].call(this, old);
                                    }

                                    if(_relayoutActiveTriggerer.Button().indexOf(key) >= 0) {
                                        $KW.markRelayout(this);
                                    }

                                    if(_relayoutPassiveTriggerer.Button().indexOf(key) >= 0) {
                                        final = this._kwebfw_.flex.final;

                                        if(!(final.height && final.width)) {
                                            $KW.markRelayout(this);
                                        }
                                    }

                                    $KW.onPropertyChange(this, key, old);

                                    if($KU.is(value, 'function')) {
                                        el = $KW.el(this);
                                        el.node && value.call(this, el, old);
                                    }
                                }
                            }
                        }
                    }, false);
                });

                if($KU.is(_postInitialization.Button, 'function')) {
                    _postInitialization.Button.call(this);
                }
            }

            pspconfig = lconfig = bconfig = null; //For GC
        };


        $K.utils.inherits(Button, voltmx.ui.BasicWidget);


        /**
         * Builds the view layer for voltmx.ui.Button widget.
         *
         * @override
         * @access      protected
         * @method      _render
         * @memberof    voltmx.ui.Button
         * @author      Goutam Sahu <goutam.sahu@voltmx.com>
         *
         * @returns     {HTMLElement} – Button view.
         */
        var button__render = function Button$_render(/*tag*/) {
            var $super = voltmx.ui.Button.base.prototype,
                $K = voltmx.$kwebfw$, $KW = $K.widget, $KD = $K.dom,
                _ = this._kwebfw_, view = _.view, el = $KW.el(view);

            if(this.isVisible || $K.F.RIVW) {
                if(!view) {
                    view = $super._render.call(this, 'BUTTON');

                    $KD.setAttr(view, 'type', 'button');

                    el = $KW.el(view);
                }

                _view.Button.toolTip.call(this, el, this.toolTip);
                _view.Button.text.call(this, el, this.text);

                $KW.accessibility(this);
            }

            return view;
        };


        var button_setFocus = function Button$_setFocus(value) {
            var $super = voltmx.ui.Button.base.prototype, $K = voltmx.$kwebfw$,
                $KU = $K.utils, $KW = $K.widget, $KD = $K.dom, el = $KW.el(this);

            if($KU.is(value, 'boolean') && el.node) {
                if(value === true) {
                    $super.setFocus.call(this, value);
                    $KD.focus(el.node);
                } else {
                    $KD.blur(el.node);
                }
            }
        };


        $K.defVoltmxProp(Button.prototype, [
            {keey:'_render', value:button__render},
            {keey:'setFocus', value:button_setFocus}
        ]);


        return Button;
    }())});
}());
