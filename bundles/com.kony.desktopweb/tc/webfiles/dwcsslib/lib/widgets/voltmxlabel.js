(function() {
    //This function must be called in the scope of widget instance
    var _deduceTagName = function Label$_deduceTagName(tag) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, ariaLevel = -1,
            a11y = this._kwebfw_.prop.accessibilityConfig;

        tag = 'label';

        if(a11y && a11y.tagName) {
            tag = a11y.tagName.toLowerCase();
        } else if(a11y && a11y.a11yARIA) {
            if(a11y.a11yARIA.role === 'heading') {
                tag = 'h1';
                ariaLevel = a11y.a11yARIA['aria-level'];

                if($KU.is(ariaLevel, 'numeric')) {
                    ariaLevel = parseFloat(ariaLevel, 10);
                }

                if($KU.is(ariaLevel, 'integer')
                && ariaLevel >= 1 && ariaLevel <= 6) {
                    tag = ('h'+ariaLevel);
                }
            }
        }

        return tag;
    };


    //All widget file must have this variable
    //All the functions will be called in the scope of widget instance
    var _dependentPropertiesValidationMessage = {};


    //All widget file must have this variable
    //All the functions will be called in the scope of widget instance
    var _getter = {
        Label: {
            text: function Label$_getter_text() {
                var $K = voltmx.$kwebfw$, $KU = $K.utils,
                    prop = this._kwebfw_.prop, text = prop.text;

                if(prop.i18n_text) {
                    text = $KU.getI18Nvalue(prop.i18n_text);
                }

                return text;
            },

            textStyle: function Label$_getter_textStyle() {
                var $K = voltmx.$kwebfw$, $KU = $K.utils,
                    prop = this._kwebfw_.prop, textStyle = null;

                if(prop.textStyle) {
                    textStyle = $KU.clone(prop.textStyle);
                }

                return textStyle;
            },

            toolTip: function Label$_getter_toolTip() {
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
        Label: function Label$_populateUnderscore() {
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
                    $KU.defineProperty(_, 'ns', 'voltmx.ui.Label', null);
                }
            }
            if(!_.name) {
                if($KU.is(this.__$kwebfw$name__, 'string') && this.__$kwebfw$name__) {
                    $KU.defineProperty(_, 'name', this.__$kwebfw$name__, null);
                } else {
                    $KU.defineProperty(_, 'name', 'Label', null);
                }
            }
        }
    };


    //All widget file must have this variable
    //This function will be called in the scope of widget instance
    var _postInitialization = {
        Label: function Label$_postInitialization() {
            var $K = voltmx.$kwebfw$, $KU = $K.utils,
                _ = this._kwebfw_, prop = _.prop;

            if($KU.is(prop.padding, 'null')) {
                prop.padding = [0, 0, 0, 0];
            }

            if($KU.is(prop.skin, 'null')) {
                prop.skin = 'defLabel';
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
        Label: function Label$_relayoutActiveTriggerer() {
            return [];
        }
    };


    //All widget file must have this variable
    //This functions will be called in the scope of widget instance
    var _relayoutPassiveTriggerer = {
        Label: function Label$_relayoutPassiveTriggerer() {
            return ['text', 'textStyle'];
        }
    };


    //All widget file must have this variable
    //All the functions will be called in the scope of widget instance
    var _setter = {
        Label: {
            text: function Label$_setter_text(/*old*/) {
                this._kwebfw_.prop.i18n_text = '';
            },

            toolTip: function Label$_setter_toolTip(/*old*/) {
                this._kwebfw_.prop.i18n_toolTip = '';
            }
        }
    };


    //All widget file must have this variable
    //All the functions will be called in the scope of widget instance
    //These function should always return a boolean value
    var _valid = {
        Label: {
            i18n_text: function Label$_valid_i18n_text(value) {
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

            i18n_toolTip: function Label$_valid_i18n_toolTip(value) {
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

            text: function Label$_valid_text(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'string')) {
                    flag = true;
                }

                if(!flag && $K.F.EIWP) {
                    flag = ['', true];
                }

                return flag;
            },

            textCopyable: function Label$_valid_textCopyable(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'boolean')) {
                    flag = true;
                }

                return flag;
            },

            textStyle: function Label$_valid_textStyle(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'null')) {
                    flag = true;
                } else if($KU.is(value, 'object')
                && (!Object.prototype.hasOwnProperty.call(value, 'lineSpacing')
                    || ($KU.is(value.lineSpacing, 'integer')
                        && value.lineSpacing >= 0))
                && (!Object.prototype.hasOwnProperty.call(value, 'letterSpacing')
                    || $KU.is(value.letterSpacing, 'integer'))
                && (!Object.prototype.hasOwnProperty.call(value, 'strikeThrough')
                    || $KU.is(value.strikeThrough, 'boolean'))) {
                    flag = true;
                }

                return flag;
            },

            toolTip: function Label$_valid_toolTip(value) {
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
        Label: {
            i18n_text: false,

            i18n_toolTip: false,

            text: function Label$_view_text(el/*, old*/) {
                var $K = voltmx.$kwebfw$, $KD = $K.dom;

                $KD.text(el.node, this.text);
            },

            textCopyable: function Label$_view_textCopyable(el/*, old*/) {
                var $K = voltmx.$kwebfw$, $KD = $K.dom;

                if(this.textCopyable) {
                    $KD.style(el.node, 'userSelect', 'text');
                } else {
                    $KD.style(el.node, 'user-select', null);
                }
            },

            textStyle: function Label$_view_textStyle(el/*, old*/) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget, $KD = $K.dom,
                    fontSize = 0, value = this._kwebfw_.prop.textStyle;

                if(!value) {
                    $KD.style(el.node, 'line-height', null);
                    $KD.style(el.node, 'letter-spacing', null);
                    $KD.style(el.node, 'text-decoration', null);
                } else {
                    if(Object.prototype.hasOwnProperty.call(value, 'lineSpacing')) {
                        if($KW.isRendered(this)) {
                            //Similar IF block can be found in voltmxwidget.js file _onrender widget based function
                            fontSize = $KD.style(this._kwebfw_.view, 'font-size').replace('px', '');

                            if($KU.is(fontSize, 'numeric')) {
                                fontSize = parseInt(fontSize, 10);
                                $KD.style(el.node, 'lineHeight', ((fontSize+value.lineSpacing)+'px'));
                            } else {
                                $KD.style(el.node, 'line-height', null);
                            }
                        }
                    } else {
                        $KD.style(el.node, 'line-height', null);
                    }

                    if(Object.prototype.hasOwnProperty.call(value, 'letterSpacing')) {
                        $KD.style(el.node, 'letterSpacing', (value.letterSpacing+'px'));
                    } else {
                        $KD.style(el.node, 'letter-spacing', null);
                    }

                    if(value.strikeThrough === true) {
                        $KD.style(el.node, 'textDecoration', 'line-through');
                    } else {
                        $KD.style(el.node, 'text-decoration', null);
                    }
                }
            },

            toolTip: function Label$_view_toolTip(el/*, old*/) {
                var $K = voltmx.$kwebfw$, $KD = $K.dom;

                if(this.toolTip) {
                    $KD.setAttr(el.node, 'title', this.toolTip);
                } else {
                    $KD.removeAttr(el.node, 'title');
                }
            }
        }
    };


    Object.defineProperty(voltmx.ui, 'Label', {configurable:false, enumerable:false, writable:false, value:(function() {
        var $K = voltmx.$kwebfw$;


        /**
         * voltmx.ui.Label constructor.
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
        var Label = function Label(bconfig, lconfig, pspconfig) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils, self = this,
                dependentPropertiesValidationMessage = '', prop = null;

            if(!$KU.is(bconfig, 'object')) bconfig = {};

            if(!bconfig.isPreValidated) {
                prop = {
                    i18n_text: '',
                    i18n_toolTip: '',
                    text: '',
                    textCopyable: false,
                    textStyle: null,
                    toolTip: ''
                };
            }

            _populateUnderscore.Label.call(this);

            if(!$KU.is(bconfig.id, 'string') || !bconfig.id) {
                bconfig.id = (this._kwebfw_.name + $KU.uid());
            }

            Label.base.call(this, bconfig, lconfig, pspconfig);

            if(!bconfig.isPreValidated) {
                if($KU.is(_dependentPropertiesValidationMessage.Label, 'function')) {
                    dependentPropertiesValidationMessage = _dependentPropertiesValidationMessage.Label.call(this, prop, bconfig, lconfig, pspconfig);
                }
            }

            if(dependentPropertiesValidationMessage) {
                throw new Error(dependentPropertiesValidationMessage);
            } else {
                if(!bconfig.isPreValidated) {
                    //Defaulting to platfom values specific to Label
                    $KU.each(prop, function(value, key) {
                        var $K = voltmx.$kwebfw$, $KU = $K.utils,
                            $KW = $K.widget, valid = false, message = '';

                        if(!Object.prototype.hasOwnProperty.call(bconfig, key)) {
                            bconfig[key] = value;
                        } else if($KW.getNonConstructorProperties(self._kwebfw_.name).indexOf(key) >= 0) {
                            throw new Error('<' + key + '> is a non-constructor property of <' + self._kwebfw_.ns + '> class.');
                        } else if(!$KU.is(_valid.Label[key], 'function')) {
                            throw new Error('<' + key + '> is available in default widget properties of <voltmx.ui.Label>, but not in <_valid.Label> namespace.');
                        } else {
                            valid = _valid.Label[key].call(self, bconfig[key]);
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

                //Defining Getters/Setters specific to Label
                $KU.each(_view.Label, function(value, key) {
                    var $K = voltmx.$kwebfw$, $KU = $K.utils;

                    $KU.defineProperty(self._kwebfw_.prop, key, bconfig[key], {configurable:false, enumerable:true, writable:true});

                    $KU.defineGetter(self, key, function Label$_getter() {
                        var $K = voltmx.$kwebfw$, $KU = $K.utils;

                        if($KU.is(_getter.Label[key], 'function')) {
                            return _getter.Label[key].call(this, this._kwebfw_.prop[key]);
                        }
                        return this._kwebfw_.prop[key];
                    }, true);

                    $KU.defineSetter(self, key, function Label$_setter(val) {
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
                                valid = _valid.Label[key].call(this, val);
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

                                    if($KU.is(_setter.Label[key], 'function')) {
                                        _setter.Label[key].call(this, old);
                                    }

                                    if(_relayoutActiveTriggerer.Label().indexOf(key) >= 0) {
                                        $KW.markRelayout(this);
                                    }

                                    if(_relayoutPassiveTriggerer.Label().indexOf(key) >= 0) {
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

                if($KU.is(_postInitialization.Label, 'function')) {
                    _postInitialization.Label.call(this);
                }
            }

            pspconfig = lconfig = bconfig = null; //For GC
        };


        $K.utils.inherits(Label, voltmx.ui.BasicWidget);


        /**
         * Builds the view layer for voltmx.ui.Label widget.
         *
         * @override
         * @access      protected
         * @method      _render
         * @memberof    voltmx.ui.Label
         * @author      Goutam Sahu <goutam.sahu@voltmx.com>
         *
         * @returns     {HTMLElement} – Label view.
         */
        var label__render = function Label$_render(tag) {
            var $super = voltmx.ui.Label.base.prototype, _ = this._kwebfw_,
                $K = voltmx.$kwebfw$, $KW = $K.widget, view = _.view, el = $KW.el(view);

            if(this.isVisible || $K.F.RIVW) {
                if(!view) {
                    view = $super._render.call(this, _deduceTagName.call(this, tag));
                    el = $KW.el(view);

                    _view.Label.textCopyable.call(this, el, this.textCopyable);
                    _view.Label.textStyle.call(this, el, this.textStyle);
                }

                _view.Label.toolTip.call(this, el, this.toolTip);
                _view.Label.text.call(this, el, this.text);

                $KW.accessibility(this);
            }

            return view;
        };


        $K.defVoltmxProp(Label.prototype, [
            {keey:'_render', value:label__render}
        ]);


        return Label;
    }())});
}());
