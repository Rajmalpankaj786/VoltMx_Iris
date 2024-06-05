(function() {
    var $K = voltmx.$kwebfw$;

    $K.defVoltmxProp($K.ui, [
        {keey:'RichText', value:{}, items:[
            {keey:'setupUIInteraction', value:function(dom, clone) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget,
                    $KD = $K.dom, tabindex = '';

                if($KW.disabled(this)) {
                    $KD.setAttr(dom, 'aria-disabled', true);
                    $KD.removeAttr(dom, 'tabindex');
                    $KW.toggleChildren(this);
                } else if(!$KW.interactable(this)) {
                    $KD.removeAttr(dom, 'tabindex');
                    $KW.toggleChildren(this);
                } else {
                    tabindex = $KW.tabIndex(this, clone);
                    $KD.removeAttr(dom, 'aria-disabled');

                    if($KU.is(tabindex, 'integer')) {
                        $KD.setAttr(dom, 'tabindex', tabindex);
                    } else {
                        $KD.removeAttr(dom, 'tabindex');
                    }

                    $KW.toggleChildren(this);
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
        RichText: {
            text: function RichText$_getter_text(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, prop = this._kwebfw_.prop;

                if(prop.i18n_text) {
                    value = $KU.getI18Nvalue(prop.i18n_text);
                }

                return value;
            },

            toolTip: function RichText$_getter_toolTip() {
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
        RichText: function RichText$_populateUnderscore() {
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
                    $KU.defineProperty(_, 'ns', 'voltmx.ui.RichText', null);
                }
            }
            if(!_.name) {
                if($KU.is(this.__$kwebfw$name__, 'string') && this.__$kwebfw$name__) {
                    $KU.defineProperty(_, 'name', this.__$kwebfw$name__, null);
                } else {
                    $KU.defineProperty(_, 'name', 'RichText', null);
                }
            }
        }
    };


    //All widget file must have this variable
    //This function will be called in the scope of widget instance
    var _postInitialization = {
        RichText: function RichText$_postInitialization() {
            var $K = voltmx.$kwebfw$, $KU = $K.utils,
                _ = this._kwebfw_, prop = _.prop;

            if($KU.is(prop.skin, 'null')) {
                prop.skin = 'defRichTextNormal';
            }

            if($KU.is(prop.padding, 'null')) {
                prop.padding = [0, 0, 0, 0];
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
        RichText: function RichText$_relayoutActiveTriggerer() {
            return [];
        }
    };


    //All widget file must have this variable
    //This functions will be called in the scope of widget instance
    var _relayoutPassiveTriggerer = {
        RichText: function RichText$_relayoutPassiveTriggerer() {
            return ['text'];
        }
    };


    //All widget file must have this variable
    //All the functions will be called in the scope of widget instance
    var _setter = {
        RichText: {
            text: function RichText$_setter_text(/*old*/) {
                this._kwebfw_.prop.i18n_text = '';
            },

            toolTip: function RichText$_setter_toolTip(/*old*/) {
                this._kwebfw_.prop.i18n_toolTip = '';
            }
        }
    };


    //All widget file must have this variable
    //All the functions will be called in the scope of widget instance
    //These function should always return a boolean value
    var _valid = {
        RichText: {
            i18n_text: function RichText$_valid_i18n_text(value) {
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

            i18n_toolTip: function RichText$_valid_i18n_toolTip(value) {
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

            linkFocusSkin: function RichText$_valid_linkFocusSkin(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'object')
                || ($KU.is(value, 'string') && value.split(' ').length === 1)) {
                    flag = true;
                }

                return flag;
            },

            linkSkin: function RichText$_valid_linkSkin(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'object')
                || ($KU.is(value, 'string') && value.split(' ').length === 1)) {
                    flag = true;
                }

                return flag;
            },

            text: function RichText$_valid_text(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'string')) {
                    flag = true;
                }

                if(!flag && $K.F.EIWP) {
                    flag = ['', true];
                }

                return flag;
            },

            toolTip: function RichText$_valid_toolTip(value) {
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
        RichText: {
            i18n_text: false,

            i18n_toolTip: false,

            linkFocusSkin: function RichText$_view_linkFocusSkin(el, old) {
                var $K = voltmx.$kwebfw$, $KW = $K.widget,
                    prop = this._kwebfw_.prop;

                if(this.linkFocusSkin) {
                    $KW.removeSkin(old + '-linkfocus', el.node);
                    $KW.addSkin(prop.linkFocusSkin + '-linkfocus', el.node);
                } else {
                    $KW.removeSkin(old + '-linkfocus', el.node);
                }
            },

            linkSkin: function RichText$_view_linkSkin(el, old) {
                var $K = voltmx.$kwebfw$, $KW = $K.widget,
                    prop = this._kwebfw_.prop;

                if(this.linkSkin) {
                    $KW.removeSkin(old + '-link', el.node);
                    $KW.addSkin(prop.linkSkin + '-link', el.node);
                } else {
                    $KW.removeSkin(old + '-link', el.node);
                }
            },

            text: function RichText$_view_text(el/*, old*/) {
                var $K = voltmx.$kwebfw$, $KD = $K.dom;
                let value = "<div>" + this.text + "</div>";

                $KD.html(el.node, value);
            },

            toolTip: function RichText$_view_toolTip(el/*, old*/) {
                var $K = voltmx.$kwebfw$, $KD = $K.dom;

                if(this.toolTip) {
                    $KD.setAttr(el.node, 'title', this.toolTip);
                } else {
                    $KD.removeAttr(el.node, 'title');
                }
            }
        }
    };


    Object.defineProperty(voltmx.ui, 'RichText', {configurable:false, enumerable:false, writable:false, value:(function() {
        var $K = voltmx.$kwebfw$;


        /**
         * voltmx.ui.RichText constructor.
         *
         * @class
         * @namespace   voltmx.ui
         * @extends     voltmx.ui.BasicWidget
         * @author      Maruthi Doradla <maruthi.doradala@voltmx.com>
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
        var RichText = function RichText(bconfig, lconfig, pspconfig) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils, self = this,
                dependentPropertiesValidationMessage = '', prop = null;

            if(!$KU.is(bconfig, 'object')) bconfig = {};

            if(!bconfig.isPreValidated) {
                prop = {
                    i18n_text: '',
                    i18n_toolTip: '',
                    linkFocusSkin: 'defRichTextNormal',
                    linkSkin: 'defRichTextLink',
                    text: '',
                    toolTip: ''
                };
            }

            _populateUnderscore.RichText.call(this);

            if(!$KU.is(bconfig.id, 'string') || !bconfig.id) {
                bconfig.id = (this._kwebfw_.name + $KU.uid());
            }

            RichText.base.call(this, bconfig, lconfig, pspconfig);

            if(!bconfig.isPreValidated) {
                if($KU.is(_dependentPropertiesValidationMessage.RichText, 'function')) {
                    dependentPropertiesValidationMessage = _dependentPropertiesValidationMessage.RichText.call(this, prop, bconfig, lconfig, pspconfig);
                }
            }

            if(dependentPropertiesValidationMessage) {
                throw new Error(dependentPropertiesValidationMessage);
            } else {
                if(!bconfig.isPreValidated) {
                    //Defaulting to platfom values specific to RichText
                    $KU.each(prop, function(value, key) {
                        var $K = voltmx.$kwebfw$, $KU = $K.utils,
                            $KW = $K.widget, valid = false, message = '';

                        if(!Object.prototype.hasOwnProperty.call(bconfig, key)) {
                            bconfig[key] = value;
                        } else if($KW.getNonConstructorProperties(self._kwebfw_.name).indexOf(key) >= 0) {
                            throw new Error('<' + key + '> is a non-constructor property of <' + self._kwebfw_.ns + '> class.');
                        } else if(!$KU.is(_valid.RichText[key], 'function')) {
                            throw new Error('<' + key + '> is available in default widget properties of <voltmx.ui.RichText>, but not in <_valid.RichText> namespace.');
                        } else {
                            valid = _valid.RichText[key].call(self, bconfig[key]);
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

                //Defining Getters/Setters specific to RichText
                $KU.each(_view.RichText, function(value, key) {
                    var $K = voltmx.$kwebfw$, $KU = $K.utils;

                    $KU.defineProperty(self._kwebfw_.prop, key, bconfig[key], {configurable:false, enumerable:true, writable:true});

                    $KU.defineGetter(self, key, function RichText$_getter() {
                        var $K = voltmx.$kwebfw$, $KU = $K.utils;

                        if($KU.is(_getter.RichText[key], 'function')) {
                            return _getter.RichText[key].call(this, this._kwebfw_.prop[key]);
                        }
                        return this._kwebfw_.prop[key];
                    }, true);

                    $KU.defineSetter(self, key, function RichText$_setter(val) {
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
                                valid = _valid.RichText[key].call(this, val);
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

                                    if($KU.is(_setter.RichText[key], 'function')) {
                                        _setter.RichText[key].call(this, old);
                                    }

                                    if(_relayoutActiveTriggerer.RichText().indexOf(key) >= 0) {
                                        $KW.markRelayout(this);
                                    }

                                    if(_relayoutPassiveTriggerer.RichText().indexOf(key) >= 0) {
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

                if($KU.is(_postInitialization.RichText, 'function')) {
                    _postInitialization.RichText.call(this);
                }
            }

            pspconfig = lconfig = bconfig = null; //For GC
        };


        $K.utils.inherits(RichText, voltmx.ui.BasicWidget);


        /**
         * Builds the view layer for voltmx.ui.RichText widget.
         *
         * @override
         * @access      protected
         * @method      _render
         * @memberof    voltmx.ui.RichText
         * @author      Maruthi Doradla <maruthi.doradala@voltmx.com>
         *
         * @returns     {HTMLElement} – RichText view.
         */
        var richtext__render = function RichText$_render(tag) {
            var $super = voltmx.ui.RichText.base.prototype,
                $K = voltmx.$kwebfw$, $KW = $K.widget,
                _ = this._kwebfw_, view = _.view, el = $KW.el(view);

            if(this.isVisible || $K.F.RIVW) {
                if(!view) {
                    view = $super._render.call(this, tag);
                    el = $KW.el(view);

                    _view.RichText.text.call(this, el, this.text);
                    _view.RichText.linkSkin.call(this, el, this.linkSkin);
                    _view.RichText.linkFocusSkin.call(this, el, this.linkFocusSkin);
                }

                _view.RichText.toolTip.call(this, el, this.toolTip);

                $KW.accessibility(this);
            }

            return view;
        };


        $K.defVoltmxProp(RichText.prototype, [
            {keey:'_render', value:richtext__render}
        ]);


        return RichText;
    }())});
}());
