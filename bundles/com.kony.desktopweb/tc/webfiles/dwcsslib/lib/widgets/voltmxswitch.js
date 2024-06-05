(function() {
    var $K = voltmx.$kwebfw$;

    $K.defVoltmxProp($K.ui, [
        {keey:'Switch', value:{}, items:[
            {keey:'onClick', value:function(/*evt*/) {
                this.selectedIndex = Number(!this.selectedIndex);

                return false;
            }},

            {keey:'onKeyUp', value:function(evt) {
                var $K = voltmx.$kwebfw$, $KD = $K.dom,
                    code = evt.keyCode || evt.which;

                if([13, 32].indexOf(code) >= 0) {
                    $KD.preventDefault(evt);

                    if(code === 13 || code === 32) { //Enter or Space
                        this.selectedIndex = Number(!this.selectedIndex);
                    }
                }

                return false;
            }}
        ]}
    ]);


    //All widget file must have this variable
    //All the functions will be called in the scope of widget instance
    var _dependentPropertiesValidationMessage = {};


    //All widget file must have this variable
    //All the functions will be called in the scope of widget instance
    var _getter = {
        Switch: {
            leftSideText: function Switch$_getter_leftSideText(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, prop = this._kwebfw_.prop;

                if(prop.i18n_leftSideText) {
                    value = $KU.getI18Nvalue(prop.i18n_leftSideText);
                }

                return value;
            },

            rightSideText: function Switch$_getter_rightSideText(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, prop = this._kwebfw_.prop;

                if(prop.i18n_rightSideText) {
                    value = $KU.getI18Nvalue(prop.i18n_rightSideText);
                }

                return value;
            },

            thumbText: function Switch$_getter_thumbText(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, prop = this._kwebfw_.prop;

                if(prop.i18n_thumbText) {
                    value = $KU.getI18Nvalue(prop.i18n_thumbText);
                }

                return value;
            }
        }
    };


    //This functions will be called in the scope of widget instance
    var _getTheme = function Switch$_getTheme() {
        var $K = voltmx.$kwebfw$, $KU = $K.utils,
            device = $KU.browser('device'), theme = '';

        if(this.thumbHeight && this.thumbWidth
        && this.trackHeight && this.trackWidth) {
            theme = 'custom';
        } else {
            theme = 'non-ios-gt6';

            if(['ipad', 'iphone'].indexOf(device) >= 0) {
                theme = 'ios-gt6';
            }
        }

        return theme;
    };


    //All widget file must have this variable
    //This functions will be called in the scope of widget instance
    var _populateUnderscore = {
        Switch: function Switch$_populateUnderscore() {
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
                    $KU.defineProperty(_, 'ns', 'voltmx.ui.Switch', null);
                }
            }
            if(!_.name) {
                if($KU.is(this.__$kwebfw$name__, 'string') && this.__$kwebfw$name__) {
                    $KU.defineProperty(_, 'name', this.__$kwebfw$name__, null);
                } else {
                    $KU.defineProperty(_, 'name', 'Switch', null);
                }
            }

            if(typeof _.tabIndex !== 'number') {
                $KU.defineProperty(_, 'tabIndex', 0, true);
            }
        }
    };


    //All widget file must have this variable
    //This function will be called in the scope of widget instance
    var _postInitialization = {
        Switch: function Switch$_postInitialization() {
            var $K = voltmx.$kwebfw$, $KU = $K.utils,
                _ = this._kwebfw_, prop = _.prop;

            if($KU.is(prop.skin, 'null')) {
                prop.skin = 'defSwitchNormal';
            }

            if(prop.i18n_leftSideText) {
                prop.leftSideText = prop.i18n_leftSideText;
            }

            if(prop.i18n_rightSideText) {
                prop.rightSideText = prop.i18n_rightSideText;
            }

            if(prop.i18n_thumbText) {
                prop.thumbText = prop.i18n_thumbText;
            }
        }
    };


    //All widget file must have this variable
    //This functions will be called in the scope of widget instance
    var _relayoutActiveTriggerer = {
        Switch: function Switch$_relayoutActiveTriggerer() {
            return [];
        }
    };


    //All widget file must have this variable
    //This functions will be called in the scope of widget instance
    var _relayoutPassiveTriggerer = {
        Switch: function Switch$_relayoutPassiveTriggerer() {
            return [];
        }
    };


    //All widget file must have this variable
    //All the functions will be called in the scope of widget instance
    var _setter = {
        Switch: {
            leftSideText: function Switch$_setter_leftSideText(/*old*/) {
                this._kwebfw_.prop.i18n_leftSideText = '';
            },

            rightSideText: function Switch$_setter_rightSideText(/*old*/) {
                this._kwebfw_.prop.i18n_rightSideText = '';
            },

            selectedIndex: function Switch$_setter_selectedIndex(old) {
                var $K = voltmx.$kwebfw$, $KW = $K.widget;

                if(this.selectedIndex !== old) {
                    $K.apm.send(this, 'Touch', {type:(this._kwebfw_.name+'_Slide')});
                    $KW.fire(this, 'onSlide', this);
                }
            },

            thumbText: function Switch$_setter_thumbText(/*old*/) {
                this._kwebfw_.prop.i18n_thumbText = '';
            }
        }
    };


    //All widget file must have this variable
    //All the functions will be called in the scope of widget instance
    //These function should always return a boolean value
    var _valid = {
        Switch: {
            i18n_leftSideText: function Switch$_valid_i18n_leftSideText(value) {
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

            i18n_rightSideText: function Switch$_valid_i18n_rightSideText(value) {
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

            i18n_thumbText: function Switch$_valid_i18n_thumbText(value) {
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

            leftSideText: function Switch$_valid_leftSideText(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'string')) {
                    flag = true;
                }

                return flag;
            },

            onSlide: function Switch$_valid_onSlide(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'function') || $KU.is(value, 'null')) {
                    flag = true;
                }

                if(!flag && $K.F.EIWP) {
                    if($KU.is(value, 'undefined')) {
                        flag = [null, true];
                    }
                }

                return flag;
            },

            rightSideText: function Switch$_valid_rightSideText(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'string')) {
                    flag = true;
                }

                return flag;
            },

            selectedIndex: function Switch$_valid_selectedIndex(value) {
                var flag = false;

                if([0, 1].indexOf(value) >= 0) {
                    flag = true;
                }

                return flag;
            },

            thumbHeight: function Switch$_valid_thumbHeight(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'string')) {
                    flag = true;
                }

                return flag;
            },

            thumbOffset: function Switch$_valid_thumbOffset(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'integer')) {
                    flag = true;
                }

                return flag;
            },

            thumbSkin: function Switch$_valid_thumbSkin(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'object')
                || ($KU.is(value, 'string') && value.split(' ').length === 1)) {
                    flag = true;
                }

                return flag;
            },

            thumbText: function Switch$_valid_thumbText(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'string')) {
                    flag = true;
                }

                return flag;
            },

            thumbWidth: function Switch$_valid_thumbWidth(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'string')) {
                    flag = true;
                }

                return flag;
            },

            trackHeight: function Switch$_valid_trackHeight(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'string')) {
                    flag = true;
                }

                return flag;
            },

            trackWidth: function Switch$_valid_trackWidth(value) {
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
        Switch: {
            i18n_leftSideText: false,

            i18n_rightSideText: false,

            i18n_thumbText: false,

            leftSideText: function Switch$_view_leftSideText(el/*, old*/) {
                var $K = voltmx.$kwebfw$, $KD = $K.dom;

                if(_getTheme.call(this) === 'ios-gt6') {
                    $KD.text($KD.first(el.left), '');
                } else {
                    $KD.text($KD.first(el.left), this.leftSideText);
                }
            },

            onSlide: true,

            rightSideText: function Switch$_view_rightSideText(el/*, old*/) {
                var $K = voltmx.$kwebfw$, $KD = $K.dom;

                if(_getTheme.call(this) === 'ios-gt6') {
                    $KD.text($KD.first(el.right), '');
                } else {
                    $KD.text($KD.first(el.right), this.rightSideText);
                }
            },

            selectedIndex: function Switch$_view_selectedIndex(el/*, old*/) {
                var $K = voltmx.$kwebfw$, $KD = $K.dom, timeout = null;

                if(this.selectedIndex) {
                    $KD.removeAttr(el.right, 'hidden');
                    //Timeout with 500ms is causing UI distortion while toggling, converted to 0 [Ticket : MADPSPA-2314]
                    timeout = setTimeout(function() {
                        $KD.setAttr(el.left, 'hidden', true);
                        clearTimeout(timeout); timeout = null;
                    }, 0);

                    //As tranlateX is causing issue in safari14, converted to translate3d [Ticket : MADPSPA-2294]
                    $KD.style(el.left, 'transform', 'translate3d(-100%, 0, 0)');
                    $KD.style(el.thumb, 'transform', 'translate3d(-100%, 0, 0)');
                    $KD.style(el.right, 'transform', 'translate3d(-100%, 0, 0)');
                } else {
                    $KD.removeAttr(el.left, 'hidden');
                    //Timeout with 500ms is causing UI distortion while toggling, converted to 0 [Ticket : MADPSPA-2314]
                    timeout = setTimeout(function() {
                        $KD.setAttr(el.right, 'hidden', true);
                        clearTimeout(timeout); timeout = null;
                    }, 0);

                    //As tranlateX is causing issue in safari14, converted to translate3d [Ticket : MADPSPA-2294]
                    $KD.style(el.left, 'transform', 'translate3d(0%, 0, 0)');
                    $KD.style(el.thumb, 'transform', 'translate3d(0%, 0, 0)');
                    $KD.style(el.right, 'transform', 'translate3d(0%, 0, 0)');
                }

                $KD.setAttr(el.switch, 'aria-checked', (!this.selectedIndex).toString());
            },

            thumbHeight: function Switch$_view_thumbHeight(el/*, old*/) {
                var $K = voltmx.$kwebfw$, $KD = $K.dom;

                if(this.thumbHeight) {
                    $KD.style(el.thumb, 'height', this.thumbHeight);
                } else {
                    $KD.style(el.thumb, 'height', null);
                }
            },

            thumbOffset: function Switch$_view_thumbOffset(el/*, old*/) {
                var $K = voltmx.$kwebfw$, $KD = $K.dom;

                $KD.style(el.thumb, {
                    marginLeft: (this.thumbOffset+'px'),
                    marginRight: (this.thumbOffset+'px')
                });
            },

            thumbSkin: function Switch$_view_thumbSkin(el, old) {
                var $K = voltmx.$kwebfw$, $KW = $K.widget;

                $KW.removeSkin(old, el.thumb);
                $KW.addSkin(this.thumbSkin, el.thumb);
            },

            thumbText: function Switch$_view_thumbText(el/*, old*/) {
                var $K = voltmx.$kwebfw$, $KD = $K.dom;

                $KD.text(el.thumb, ((_getTheme.call(this) === 'ios-gt6') ? '' : this.thumbText));
            },

            thumbWidth: function Switch$_view_thumbWidth(el/*, old*/) {
                var $K = voltmx.$kwebfw$, left = null,
                    $KD = $K.dom, right = null;

                left = $KD.first(el.left); right = $KD.first(el.right);

                if(this.thumbWidth) {
                    $KD.style(el.thumb, 'width', this.thumbWidth);
                    $KD.style(left, 'width', 'calc(100% - '+this.thumbWidth+')');
                    $KD.style(right, 'width', 'calc(100% - '+this.thumbWidth+')');
                } else {
                    $KD.style(el.thumb, 'width', null);
                    $KD.style(left, 'width', null);
                    $KD.style(right, 'width', null);
                }
            },

            trackHeight: function Switch$_view_trackHeight(el/*, old*/) {
                var $K = voltmx.$kwebfw$, $KD = $K.dom;

                if(this.trackHeight) {
                    $KD.style(el.switch, 'height', this.trackHeight);
                } else {
                    $KD.style(el.switch, 'height', null);
                }
            },

            trackWidth: function Switch$_view_trackWidth(el/*, old*/) {
                var $K = voltmx.$kwebfw$, $KD = $K.dom;

                if(this.trackWidth) {
                    $KD.style(el.switch, 'width', this.trackWidth);
                } else {
                    $KD.style(el.switch, 'width', null);
                }
            }
        }
    };


    Object.defineProperty(voltmx.ui, 'Switch', {configurable:false, enumerable:false, writable:false, value:(function() {
        var $K = voltmx.$kwebfw$;


        /**
         * voltmx.ui.Switch constructor.
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
        var Switch = function Switch(bconfig, lconfig, pspconfig) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils, self = this,
                dependentPropertiesValidationMessage = '', prop = null;

            if(!$KU.is(bconfig, 'object')) bconfig = {};

            if(!bconfig.isPreValidated) {
                prop = {
                    i18n_leftSideText: '',
                    i18n_rightSideText: '',
                    i18n_thumbText: '',
                    leftSideText: 'ON',
                    onSlide: null,
                    rightSideText: 'OFF',
                    selectedIndex: 1,
                    thumbHeight: '',
                    thumbOffset: 0,
                    thumbSkin: '',
                    thumbText: '',
                    thumbWidth: '',
                    trackHeight: ''
                };
            }

            _populateUnderscore.Switch.call(this);

            if(!$KU.is(bconfig.id, 'string') || !bconfig.id) {
                bconfig.id = (this._kwebfw_.name + $KU.uid());
            }

            Switch.base.call(this, bconfig, lconfig, pspconfig);

            if(!bconfig.isPreValidated) {
                if($KU.is(_dependentPropertiesValidationMessage.Switch, 'function')) {
                    dependentPropertiesValidationMessage = _dependentPropertiesValidationMessage.Switch.call(this, prop, bconfig, lconfig, pspconfig);
                }
            }

            if(dependentPropertiesValidationMessage) {
                throw new Error(dependentPropertiesValidationMessage);
            } else {
                if(!bconfig.isPreValidated) {
                    //Defaulting to platfom values specific to Switch
                    $KU.each(prop, function(value, key) {
                        var $K = voltmx.$kwebfw$, $KU = $K.utils,
                            $KW = $K.widget, valid = false, message = '';

                        if(!Object.prototype.hasOwnProperty.call(bconfig, key)) {
                            bconfig[key] = value;
                        } else if($KW.getNonConstructorProperties(self._kwebfw_.name).indexOf(key) >= 0) {
                            throw new Error('<' + key + '> is a non-constructor property of <' + self._kwebfw_.ns + '> class.');
                        } else if(!$KU.is(_valid.Switch[key], 'function')) {
                            throw new Error('<' + key + '> is available in default widget properties of <voltmx.ui.Switch>, but not in <_valid.Switch> namespace.');
                        } else {
                            valid = _valid.Switch[key].call(self, bconfig[key]);
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

                //Defining Getters/Setters specific to Switch
                $KU.each(_view.Switch, function(value, key) {
                    var $K = voltmx.$kwebfw$, $KU = $K.utils;

                    $KU.defineProperty(self._kwebfw_.prop, key, bconfig[key], {configurable:false, enumerable:true, writable:true});

                    $KU.defineGetter(self, key, function Switch$_getter() {
                        var $K = voltmx.$kwebfw$, $KU = $K.utils;

                        if($KU.is(_getter.Switch[key], 'function')) {
                            return _getter.Switch[key].call(this, this._kwebfw_.prop[key]);
                        }
                        return this._kwebfw_.prop[key];
                    }, true);

                    $KU.defineSetter(self, key, function Switch$_setter(val) {
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
                                valid = _valid.Switch[key].call(this, val);
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

                                    if($KU.is(_setter.Switch[key], 'function')) {
                                        _setter.Switch[key].call(this, old);
                                    }

                                    if(_relayoutActiveTriggerer.Switch().indexOf(key) >= 0) {
                                        $KW.markRelayout(this);
                                    }

                                    if(_relayoutPassiveTriggerer.Switch().indexOf(key) >= 0) {
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

                if($KU.is(_postInitialization.Switch, 'function')) {
                    _postInitialization.Switch.call(this);
                }
            }

            pspconfig = lconfig = bconfig = null; //For GC
        };


        $K.utils.inherits(Switch, voltmx.ui.BasicWidget);


        /**
         * Builds the view layer for voltmx.ui.Switch widget.
         *
         * @override
         * @access      protected
         * @method      _render
         * @memberof    voltmx.ui.Switch
         * @author      Goutam Sahu <goutam.sahu@voltmx.com>
         *
         * @returns     {HTMLElement} – Switch view.
         */
        var switch__render = function Switch$_render(tag) {
            var $super = voltmx.ui.Switch.base.prototype, _ = this._kwebfw_,
                left = null, view = _.view, $K = voltmx.$kwebfw$,
                $KW = $K.widget, $KD = $K.dom, el = $KW.el(view),
                $switch = null, right = null, holder = null, thumb = null;

            if(this.isVisible || $K.F.RIVW) {
                if(!view) {
                    $switch = $KD.create('DIV', {kr:'switch'});
                    left = $KD.create('DIV', {kr:'left'});
                    right = $KD.create('DIV', {kr:'right'});
                    holder = $KD.create('DIV', {kr:'holder'});
                    thumb = $KD.create('DIV', {kr:'thumb'});

                    $KD.setAttr(holder, 'kwh-click', 'onClick');
                    $KD.setAttr($switch, 'role', 'switch');
                    $KD.setAttr($switch, 'kwh-keyup', 'onKeyUp');
                    $KD.setAttr($switch, 'aria-label', (this.selectedIndex ? this.rightSideText : this.leftSideText));

                    $KD.add($switch, left);
                    $KD.add($switch, right);
                    $KD.add(left, $KD.create('LABEL'));
                    $KD.add(right, $KD.create('LABEL'));
                    $KD.add(holder, thumb);

                    view = $super._render.call(this, tag, [$switch, holder]);

                    el = $KW.el(view);

                    $KD.setAttr(view, 'kt', _getTheme.call(this));

                    _view.Switch.selectedIndex.call(this, el, this.selectedIndex);
                    _view.Switch.thumbHeight.call(this, el, this.thumbHeight);
                    _view.Switch.thumbOffset.call(this, el, this.thumbOffset);
                    _view.Switch.thumbSkin.call(this, el, this.thumbSkin);
                    _view.Switch.thumbWidth.call(this, el, this.thumbWidth);
                    _view.Switch.trackHeight.call(this, el, this.trackHeight);
                    _view.Switch.trackWidth.call(this, el, this.trackWidth);
                }

                _view.Switch.leftSideText.call(this, el, this.leftSideText);
                _view.Switch.rightSideText.call(this, el, this.rightSideText);
                _view.Switch.thumbText.call(this, el, this.thumbText);

                $KW.accessibility(this);
            }

            return view;
        };


        $K.defVoltmxProp(Switch.prototype, [
            {keey:'_render', value:switch__render}
        ]);


        return Switch;
    }())});
}());
