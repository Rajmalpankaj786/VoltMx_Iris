(function() {
    var $K = voltmx.$kwebfw$;

    $K.defVoltmxProp($K.ui, [
        {keey:'RadioButtonGroup', value:{}, items:[
            {keey:'onChange', value:function(evt) {
                var $K = voltmx.$kwebfw$, $KW = $K.widget, $KD = $K.dom,
                    _ = this._kwebfw_, prop = _.prop, payload = null;

                if(evt.target.tagName === 'INPUT'
                && $KD.getAttr(evt.target, 'type', 'radio')) {
                    payload = {checked:evt.target.checked, key:evt.target.value};

                    prop.selectedKey = payload.key;
                    prop.selectedKeyValue = $KW.getGroupSelectedKeyValueByKey(this, payload.key);

                    $KW.onPropertyChange(this, 'selectedKey');
                    $K.apm.send(this, 'Touch', {type:(this._kwebfw_.name+'_Selection')});
                    $KW.fire(this, 'onSelection', this);
                }

                return false;
            }},

            {keey:'onKeyDown', value:function(evt) {
                var $K = voltmx.$kwebfw$, $KD = $K.dom, radiobutton = null,
                    code = evt.keyCode || evt.which;

                if([39, 40].indexOf(code) >= 0) {
                    radiobutton = $KD.first(evt.target);

                    if(radiobutton) {
                        $KD.preventDefault(evt);

                        radiobutton = $KD.first(radiobutton);
                        $KD.removeAttr(radiobutton, 'tabindex');
                        $KD.focus(radiobutton);
                    }
                }

                return false;
            }},

            {keey:'onRadioButtonBlur', value:function(evt) {
                var $K = voltmx.$kwebfw$, $KD = $K.dom, $KW = $K.widget;

                $KD.setAttr(evt.target, 'tabindex', -1);
                $KW.fire(this, 'onBlur', this);
                return false;
            }},

            {keey:'onRadioButtonFocus', value:function(evt) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget,
                    $KD = $K.dom, tabindex = $KW.tabIndex(this);

                if($KU.is(tabindex, 'integer') && tabindex >= 0) {
                    $KD.removeAttr(evt.target, 'tabindex');
                } else {
                    $KD.blur(evt.target);
                }

                $KW.fire(this, 'onFocus', this);
                return false;
            }},

            {keey:'onRadioButtonKeyDown', value:function(evt) {
                var $K = voltmx.$kwebfw$, $KD = $K.dom,
                    radio = null, code = evt.keyCode || evt.which;

                if([37, 38, 39, 40].indexOf(code) >= 0) {
                    radio = $KD.parent(evt.target);

                    if([37, 38].indexOf(code) >= 0) {
                        radio = $KD.prev(radio);
                    } else if([39, 40].indexOf(code) >= 0) {
                        radio = $KD.next(radio);
                    }

                    if(radio) {
                        $KD.preventDefault(evt);

                        radio = $KD.first(radio);
                        $KD.focus(radio);
                    }
                }

                return false;
            }},

            {keey:'setupUIInteraction', value:function(dom, clone) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget, $KD = $K.dom,
                    tabindex = '', radios = $KD.find(dom, 'input[type="radio"]');

                if($KW.disabled(this)) {
                    $KD.setAttr(dom, 'aria-disabled', 'true');
                    $KD.removeAttr(dom, 'tabindex');

                    $KU.each(radios, function(radio) {
                        radio.disabled = true;
                    });
                } else if(!$KW.interactable(this)) {
                    $KD.removeAttr(dom, 'tabindex');

                    $KU.each(radios, function(radio) {
                        var $K = voltmx.$kwebfw$, $KD = $K.dom,
                            parent = $KD.parent(radio),
                            modal = $KD.create('DIV');

                        $KD.removeAttr(radio, 'tabindex');

                        $KD.style(parent, {
                            position:'relative',
                            top:'0px', left:'0px'
                        });

                        $KD.style(modal, {
                            position:'absolute',
                            top:'0px', left:'0px',
                            height:'100%', width:'100%'
                        });

                        $KD.add(parent, modal);
                    });
                } else {
                    tabindex = $KW.tabIndex(this, clone);
                    $KD.removeAttr(dom, 'aria-disabled');

                    $KU.each(radios, function(radio) {
                        var $K = voltmx.$kwebfw$, $KD = $K.dom,
                            parent = $KD.parent(radio),
                            modal = $KD.last(parent);

                        radio.disabled = false;

                        $KD.style(parent, {
                            position:null,
                            top:null, left:null
                        });

                        if(modal && modal.tagName === 'DIV') {
                            $KD.remove(modal);
                        }
                    });

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
    var _dependentPropertiesValidationMessage = {
        RadioButtonGroup: function RadioButtonGroup$_dependentPropertiesValidationMessage(prop, bconfig, lconfig, pspconfig) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils, message = '', keys = [],
                masterData = (pspconfig && pspconfig.masterData) || bconfig.masterData,
                masterDataMap = (pspconfig && pspconfig.masterDataMap) || bconfig.masterDataMap,
                selectedKey = (pspconfig && pspconfig.selectedKey) || bconfig.selectedKey;

            masterData = ($KU.is(masterData, 'null') || $KU.is(masterData, 'array')) ? masterData : prop.masterData;
            masterDataMap = ($KU.is(masterDataMap, 'null') || $KU.is(masterDataMap, 'array')) ? masterDataMap : prop.masterDataMap;
            selectedKey = ($KU.is(selectedKey, 'null') || $KU.is(selectedKey, 'string')) ? selectedKey : prop.selectedKey;

            if($KU.is(selectedKey, 'string') && (masterData || masterDataMap)) {
                $KU.each((masterData || masterDataMap), function(data) {
                    var $K = voltmx.$kwebfw$, $KU = $K.utils;

                    keys.push(($KU.is(data, 'array')) ? data[0] : data[masterDataMap[1]]);
                });

                if($KU.is(selectedKey, 'string')
                && keys.indexOf(selectedKey) === -1) {
                    message += 'Invalid selectedKey <'+selectedKey+'>.';
                }
            }

            return message;
        }
    };


    //All widget file must have this variable
    //All the functions will be called in the scope of widget instance
    var _getter = {
        RadioButtonGroup: {
            masterData: function RadioButtonGroup$_getter_masterData(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget, data = null;

                if(value) {
                    data = [];

                    $KU.each(value, function(item) {
                        var $K = voltmx.$kwebfw$, $KU = $K.utils,
                            val = [item[0], item[1]];

                        if($KU.is(item[2], 'object')) {
                            val.push($KW.getAccessibilityConfig(item[2]));
                        }

                        if($KU.is(val[1], 'i18n')) {
                            val[1] = $KU.getI18Nvalue(val[1]);
                        }

                        data.push(val);
                    });
                }

                return data;
            },

            masterDataMap: function RadioButtonGroup$_getter_masterDataMap(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget,
                    data = null, keyName = '', valName = '';

                if(value) {
                    data = [];
                    keyName = value[1];
                    valName = value[2];

                    $KU.each(value[0], function(item) {
                        var $K = voltmx.$kwebfw$, $KU = $K.utils, val = {};

                        val[keyName] = item[keyName];
                        val[valName] = item[valName];

                        if($KU.is(item.accessibilityConfig, 'object')) {
                            val.accessibilityConfig = $KW.getAccessibilityConfig(item.accessibilityConfig);
                        }

                        if($KU.is(val[valName], 'string')
                        && val[valName].toLowerCase().indexOf('voltmx.i18n.getlocalizedstring') !== -1) {
                            val[valName] = $KU.getI18Nvalue(val[valName]);
                        }

                        data.push(val);
                    });
                }

                return [data, keyName, valName];
            },

            selectedKeyValue: function RadioButtonGroup$_getter_selectedKeyValue(value) {
                return (value) ? value.slice(0) : null;
            },

            toolTip: function RadioButtonGroup$_getter_toolTip() {
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
        RadioButtonGroup: function RadioButtonGroup$_populateUnderscore() {
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
                    $KU.defineProperty(_, 'ns', 'voltmx.ui.RadioButtonGroup', null);
                }
            }
            if(!_.name) {
                if($KU.is(this.__$kwebfw$name__, 'string') && this.__$kwebfw$name__) {
                    $KU.defineProperty(_, 'name', this.__$kwebfw$name__, null);
                } else {
                    $KU.defineProperty(_, 'name', 'RadioButtonGroup', null);
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
        RadioButtonGroup: function RadioButtonGroup$_postInitialization() {
            var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget,
                _ = this._kwebfw_, prop = _.prop;

            $KW.normalizeGroupMasterData(this);

            if($KU.is(prop.skin, 'null')) {
                prop.skin = 'slRadioButtonGroup';
            }

            if($KU.is(prop.padding, 'null')) {
                prop.padding = [0, 0, 0, 0];
            }

            if(prop.i18n_toolTip) {
                prop.toolTip = prop.i18n_toolTip;
            }

            _setter[_.name].selectedKey.call(this, prop.selectedKey);
        }
    };


    //All widget file must have this variable
    //This functions will be called in the scope of widget instance
    var _relayoutActiveTriggerer = {
        RadioButtonGroup: function RadioButtonGroup$_relayoutActiveTriggerer() {
            return [];
        }
    };


    //All widget file must have this variable
    //This functions will be called in the scope of widget instance
    var _relayoutPassiveTriggerer = {
        RadioButtonGroup: function RadioButtonGroup$_relayoutPassiveTriggerer() {
            return [];
        }
    };


    //This functions will be called in the scope of widget instance
    var _renderRadioButtonGroup = function RadioButtonGroup$_renderRadioButtonGroup(holder) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KD = $K.dom,
            $KW = $K.widget, _ = this._kwebfw_, prop = _.prop,
            masterdata = this.masterData;

        if(!masterdata && prop.masterDataMap) {
            masterdata = this.masterDataMap[0];
        }

        $KD.html(holder, '');

        $KU.each(masterdata, function(data) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget,
                $KD = $K.dom, div = $KD.create('DIV', {kr:'option'}), key = '', val = '',
                _ = this._kwebfw_, prop = _.prop, input = null, txt = null, a11y = null;

            key = ($KU.is(data, 'array')) ? data[0] : data[prop.masterDataMap[1]];
            val = ($KU.is(data, 'array')) ? data[1] : data[prop.masterDataMap[2]];
            a11y = ($KU.is(data, 'array')) ? data[2] : data['accessibilityConfig'];

            txt = document.createTextNode(($KU.is(val, 'i18n') ? $KU.getI18Nvalue(val) : val));
            input = $KD.create('INPUT', {type:'radio', name:this._kwebfw_.uid, value:key, tabindex:-1});

            $KD.setAttr(input, 'kwh-focusin', 'onRadioButtonFocus');
            $KD.setAttr(input, 'kwh-focusout', 'onRadioButtonBlur');
            $KD.setAttr(input, 'kwh-keydown', 'onRadioButtonKeyDown');

            $KW.applyGroupA11Y(input, a11y, val, (_.uid+'_'+key+'_hint'));

            if(prop.itemOrientation === constants.RADIOGROUP_ITEM_ORIENTATION_VERTICAL) {
                $KD.setAttr(holder, 'ko', 'vertical');
            } else if(prop.itemOrientation === constants.RADIOGROUP_ITEM_ORIENTATION_HORIZONTAL) {
                $KD.setAttr(holder, 'ko', 'horizontal');
            }

            $KD.add(div, input);
            $KD.add(div, txt);
            $KW.addToView(holder, div);
        }, this);

        $KW.accessibility(this);
    };


    //All widget file must have this variable
    //All the functions will be called in the scope of widget instance
    var _setter = {
        RadioButtonGroup: {
            masterData: function RadioButtonGroup$_setter_masterData(old) {
                var $K = voltmx.$kwebfw$, $KW = $K.widget, prop = this._kwebfw_.prop;

                prop.selectedKey = null;
                prop.selectedKeyValue = null;
                $KW.clearGroupA11y(this, old, prop.masterDataMap);
            },

            masterDataMap: function RadioButtonGroup$_setter_masterDataMap(old) {
                var $K = voltmx.$kwebfw$, $KW = $K.widget, prop = this._kwebfw_.prop;

                if(!prop.masterData) {
                    prop.selectedKey = null;
                    prop.selectedKeyValue = null;
                }

                $KW.clearGroupA11y(this, prop.masterData, old);
            },

            selectedKey: function RadioButtonGroup$_setter_selectedKey(/* old */) {
                var $K = voltmx.$kwebfw$, $KW = $K.widget, prop = this._kwebfw_.prop;

                prop.selectedKeyValue = $KW.getGroupSelectedKeyValueByKey(this, prop.selectedKey);
            },

            toolTip: function RadioButtonGroup$_setter_toolTip(/* old */) {
                this._kwebfw_.prop.i18n_toolTip = '';
            }
        }
    };


    //All widget file must have this variable
    //All the functions will be called in the scope of widget instance
    //These function should always return a boolean value
    var _valid = {
        RadioButtonGroup: {
            itemOrientation: function RadioButtonGroup$_valid_itemOrientation(value) {
                var options = [
                        constants.RADIOGROUP_ITEM_ORIENTATION_HORIZONTAL,
                        constants.RADIOGROUP_ITEM_ORIENTATION_VERTICAL
                    ], flag = (options.indexOf(value) >= 0);

                return flag;
            },

            i18n_toolTip: function RadioButtonGroup$_valid_i18n_toolTip(value) {
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

            masterData: function RadioButtonGroup$_valid_masterData(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'array') || $KU.is(value, 'null')) {
                    flag = true;

                    $KU.each(value, function(item) {
                        var $K = voltmx.$kwebfw$, $KU = $K.utils;

                        if(!$KU.is(item, 'array')) {
                            flag = false;
                            return true;
                        }
                    });
                }

                return flag;
            },

            masterDataMap: function RadioButtonGroup$_valid_masterDataMap(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'null')) {
                    flag = true;
                } else if($KU.is(value[0], 'array')
                && $KU.is(value[1], 'string') && value[1]
                && value[2] && $KU.is(value[2], 'string')) {
                    flag = true;

                    $KU.each(value[0], function(item) {
                        var $K = voltmx.$kwebfw$, $KU = $K.utils;

                        if(!$KU.is(item, 'object')) {
                            flag = false;
                            return true;
                        }
                    });
                }

                return flag;
            },

            selectedKey: function RadioButtonGroup$_valid_selectedKey(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false,
                    prop = this._kwebfw_.prop, keys = [];

                if($KU.is(value, 'string') || $KU.is(value, 'null')) {
                    flag = true;
                }

                if(flag && $KU.is(value, 'string')) {
                    if(prop.masterData || prop.masterDataMap) {
                        $KU.each((prop.masterData || prop.masterDataMap[0]), function(data) {
                            var $K = voltmx.$kwebfw$, $KU = $K.utils;

                            keys.push(($KU.is(data, 'array')) ? data[0] : data[prop.masterDataMap[1]]);
                        });

                        if(keys.indexOf(value) === -1) {
                            flag = false;
                        }
                    }
                }

                return flag;
            },

            selectedKeyValue: function RadioButtonGroup$_valid_selectedKeyValue(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'array') || $KU.is(value, 'null')) {
                    flag = true;
                }

                return flag;
            },

            toolTip: function RadioButtonGroup$_valid_toolTip(value) {
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
        RadioButtonGroup: {
            itemOrientation: false,

            i18n_toolTip: false,

            masterData: function RadioButtonGroup$_view_masterData(el/* , old */) {
                var $K=voltmx.$kwebfw$, $KW = $K.widget;

                $KW.normalizeGroupMasterData(this);
                _renderRadioButtonGroup.call(this, el.node);
            },

            masterDataMap: function RadioButtonGroup$_view_masterDataMap(el/* , old */) {
                var $K=voltmx.$kwebfw$, $KW = $K.widget;

                $KW.normalizeGroupMasterDataMap(this);
                _renderRadioButtonGroup.call(this, el.node);
            },

            selectedKey: function RadioButtonGroup$_view_selectedKey(el/* , old */) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, $KD = $K.dom;

                $KU.each($KD.find(el.node, 'input'), function(radio) {
                    radio.checked = (this.selectedKey === radio.value);
                }, this);
            },

            selectedKeyValue: false,

            toolTip: function RadioButtonGroup$_view_toolTip(el/* , old */) {
                var $K = voltmx.$kwebfw$, $KD = $K.dom;

                if(this.toolTip) {
                    $KD.setAttr(el.node, 'title', this.toolTip);
                } else {
                    $KD.removeAttr(el.node, 'title');
                }
            }
        }
    };


    Object.defineProperty(voltmx.ui, 'RadioButtonGroup', {configurable:false, enumerable:false, writable:false, value:(function() {
        var $K = voltmx.$kwebfw$;


        /**
         * voltmx.ui.RadioButtonGroup constructor.
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
        var RadioButtonGroup = function RadioButtonGroup(bconfig, lconfig, pspconfig) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils, self = this,
                dependentPropertiesValidationMessage = '', prop = null, p = null;

            if(!$KU.is(bconfig, 'object')) bconfig = {};

            if(!bconfig.isPreValidated) {
                prop = {
                    itemOrientation: constants.RADIOGROUP_ITEM_ORIENTATION_VERTICAL,
                    i18n_toolTip: '',
                    masterData: null,
                    masterDataMap: null,
                    selectedKey: null,
                    selectedKeyValue: null,
                    toolTip: ''
                };
            }

            _populateUnderscore.RadioButtonGroup.call(this);

            if(!$KU.is(bconfig.id, 'string') || !bconfig.id) {
                bconfig.id = (this._kwebfw_.name + $KU.uid());
            }

            RadioButtonGroup.base.call(this, bconfig, lconfig, pspconfig);

            if(!bconfig.isPreValidated) {
                if($KU.is(_dependentPropertiesValidationMessage.RadioButtonGroup, 'function')) {
                    dependentPropertiesValidationMessage = _dependentPropertiesValidationMessage.RadioButtonGroup.call(this, prop, bconfig, lconfig, pspconfig);
                }
            }

            if(dependentPropertiesValidationMessage) {
                throw new Error(dependentPropertiesValidationMessage);
            } else {
                if(!bconfig.isPreValidated) {
                    //Defaulting to platfom values specific to RadioButtonGroup
                    $KU.each(prop, function(value, key) {
                        var $K = voltmx.$kwebfw$, $KU = $K.utils,
                            $KW = $K.widget, valid = false, message = '';

                        if(!Object.prototype.hasOwnProperty.call(bconfig, key)) {
                            bconfig[key] = value;
                        } else if($KW.getNonConstructorProperties(self._kwebfw_.name).indexOf(key) >= 0) {
                            throw new Error('<' + key + '> is a non-constructor property of <' + self._kwebfw_.ns + '> class.');
                        } else if(!$KU.is(_valid.RadioButtonGroup[key], 'function')) {
                            throw new Error('<' + key + '> is available in default widget properties of <voltmx.ui.RadioButtonGroup>, but not in <_valid.RadioButtonGroup> namespace.');
                        } else {
                            valid = _valid.RadioButtonGroup[key].call(self, bconfig[key]);
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

                //Defining Getters/Setters specific to RadioButtonGroup
                $KU.each(_view.RadioButtonGroup, function(value, key) {
                    var $K = voltmx.$kwebfw$, $KU = $K.utils;

                    $KU.defineProperty(self._kwebfw_.prop, key, bconfig[key], {configurable:false, enumerable:true, writable:true});

                    $KU.defineGetter(self, key, function RadioButtonGroup$_getter() {
                        var $K = voltmx.$kwebfw$, $KU = $K.utils;

                        if($KU.is(_getter.RadioButtonGroup[key], 'function')) {
                            return _getter.RadioButtonGroup[key].call(this, this._kwebfw_.prop[key]);
                        }
                        return this._kwebfw_.prop[key];
                    }, true);

                    $KU.defineSetter(self, key, function RadioButtonGroup$_setter(val) {
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
                                valid = _valid.RadioButtonGroup[key].call(this, val);
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

                                    if($KU.is(_setter.RadioButtonGroup[key], 'function')) {
                                        _setter.RadioButtonGroup[key].call(this, old);
                                    }

                                    if(_relayoutActiveTriggerer.RadioButtonGroup().indexOf(key) >= 0) {
                                        $KW.markRelayout(this);
                                    }

                                    if(_relayoutPassiveTriggerer.RadioButtonGroup().indexOf(key) >= 0) {
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


                if(bconfig.isPreValidated) {
                    p = this._kwebfw_.prop;

                    p.masterDataMap = null;
                }

                if($KU.is(_postInitialization.RadioButtonGroup, 'function')) {
                    _postInitialization.RadioButtonGroup.call(this);
                }
            }

            pspconfig = lconfig = bconfig = null; //For GC
        };


        $K.utils.inherits(RadioButtonGroup, voltmx.ui.GroupWidget);


        /**
         * Builds the view layer for voltmx.ui.RadioButtonGroup widget.
         *
         * @override
         * @access      protected
         * @method      _render
         * @memberof    voltmx.ui.RadioButtonGroup
         * @author      Goutam Sahu <goutam.sahu@voltmx.com>
         *
         * @returns     {HTMLElement} – SampleWidget view.
         */
        var radiobuttongroup__render = function RadioButtonGroup$_render(tag) {
            var $super = voltmx.ui.RadioButtonGroup.base.prototype,
                _ = this._kwebfw_, view = _.view, $K = voltmx.$kwebfw$,
                $KW = $K.widget, $KD = $K.dom, el = $KW.el(view);

            if(this.isVisible || $K.F.RIVW) {
                if(!view) {
                    view = $super._render.call(this, tag);

                    $KD.setAttr(view, 'kwh-change', 'onChange');
                    $KD.setAttr(view, 'kwh-keydown', 'onKeyDown');
                }

                el = $KW.el(view);

                _renderRadioButtonGroup.call(this, view);
                _view.RadioButtonGroup.selectedKey.call(this, el, this._kwebfw_.prop.selectedKey);
                _view.RadioButtonGroup.toolTip.call(this, el, this.toolTip);
            }

            return view;
        };


        $K.defVoltmxProp(RadioButtonGroup.prototype, [
            {keey:'_render', value:radiobuttongroup__render}
        ]);


        return RadioButtonGroup;
    }())});
}());
