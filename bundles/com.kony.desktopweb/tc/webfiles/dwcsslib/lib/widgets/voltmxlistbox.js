(function() {
    var $K = voltmx.$kwebfw$, _renderListBox = {};

    $K.defVoltmxProp($K.ui, [
        {keey:'ListBox', value:{}, items:[
            {keey:'onChange', value:function(evt) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget,
                    prop = this._kwebfw_.prop, options = [], o = 0, olen = 0;

                if(evt.target.tagName === 'SELECT') {
                    options = evt.target.options;
                    olen = options.length;
                    prop.selectedKey = null;
                    prop.selectedKeyValue = null;
                    prop.selectedKeys = null;
                    prop.selectedKeyValues = null;

                    for(o=0; o<olen; o++) {
                        if(options[o].selected) {
                            if(!$KU.is(prop.selectedKeys, 'array')) {
                                prop.selectedKeys = [];
                                prop.selectedKeyValues = [];
                            }

                            prop.selectedKeys.push(options[o].value);
                            prop.selectedKeyValues.push($KW.getGroupSelectedKeyValueByKey(this, options[o].value));
                        }
                    }

                    if(prop.selectedKeys) {
                        prop.selectedKey = prop.selectedKeys[(prop.selectedKeys.length -1)];
                        prop.selectedKeyValue = prop.selectedKeyValues[(prop.selectedKeyValues.length -1)];
                        $KW.onPropertyChange(this, 'selectedKeys');
                    }

                    $KW.onPropertyChange(this, 'selectedKey');
                    $K.apm.send(this, 'Touch', {type:(this._kwebfw_.name+'_Selection')});
                    $KW.fire(this, 'onSelection', this);
                }

                return false;
            }},

            {keey:'onFocusOut', value:function(/* evt */) {
                var timeout = null, self = this;

                timeout = setTimeout(function() {
                    _closePicker.call(self);

                    clearTimeout(timeout); self = timeout = null; //For GC
                }, 160);

                return false;
            }},

            {keey:'onItemSelection', value:function(evt) {
                var $K = voltmx.$kwebfw$, $KW = $K.widget, $KD = $K.dom,
                    li = $KD.closest(evt.target, 'tag', 'LI'), el = null,
                    key = '', prop = this._kwebfw_.prop, disabledkeys = prop.disabledKeys || [];

                if(li) {
                    el = $KW.el(this);
                    key = $KD.getAttr(li, 'value');
                    if(disabledkeys.indexOf(key) === -1) {
                        this.selectedKey = $KD.getAttr(li, 'value');
                        $KD.setAttr(el.input, 'value', this.selectedKeyValue[1]);
                        _closePicker.call(this);
                        $KD.focus(el.input);
                    }
                }

                return false;
            }},

            {keey:'onIconClick', value:function(/* evt */) {
                var $K = voltmx.$kwebfw$, $KW = $K.widget,
                    $KD = $K.dom, el = $KW.el(this);

                if(!this._kwebfw_.picker) {
                    _openPicker.call(this);
                } else {
                    _closePicker.call(this);
                }

                if($KD.hasAttr(el.icon, 'tabindex')) {
                    $KD.focus(el.icon);
                }

                return false;
            }},

            {keey:'onIconKeyDown', value:function(evt) {
                var $K = voltmx.$kwebfw$, $KD = $K.dom, _ = this._kwebfw_,
                    li = null, code = evt.keyCode || evt.which, skin = '';

                if([27, 38, 40].indexOf(code) >= 0) { //Escape, Up Arrow or Down Arrow
                    $KD.preventDefault(evt);

                    if(code === 27) { //Escape
                        _closePicker.call(this);
                    } else if([38, 40].indexOf(code) >= 0) { //Up Arrow or Down Arrow
                        if(_.picker) {
                            if(code === 38) { //Up Arrow
                                if(!_.option) {
                                    li = $KD.last(_.picker);
                                } else {
                                    li = $KD.prev(_.option);
                                    li = _updateDisableItemOption.call(this, li, code);
                                    if(!li) li = $KD.last(_.picker);
                                }
                            } else if(code === 40) { //Down Arrow
                                if(!_.option) {
                                    li = $KD.first(_.picker);
                                } else {
                                    li = $KD.next(_.option);
                                    li = _updateDisableItemOption.call(this, li, code);
                                    if(!li) li = $KD.first(_.picker);
                                }
                            }
                            li = _updateDisableItemOption.call(this, li, code);

                            if(li && li !== _.option) {
                                skin = _getHoverSkinForListItem.call(this);

                                if(_.option) {
                                    $KD.removeCls(_.option, skin + '-hover');
                                }
                                $KD.addCls(li, skin + '-hover');
                                li.scrollIntoView({behavior: 'smooth', block: 'nearest'});
                                _.option = li;
                            }
                        }
                    }
                }

                return false;
            }},

            {keey:'onIconKeyUp', value:function(evt) {
                var $K = voltmx.$kwebfw$, $KD = $K.dom, _ = this._kwebfw_, $KW = $K.widget,
                    $KU = $K.utils, code = evt.keyCode || evt.which, el = $KW.el(this),
                    isValidValue = false, key = null;

                if([13, 32].indexOf(code) >= 0) { //Enter or Space
                    $KD.preventDefault(evt);

                    if(_.option) {
                        $KD.setAttr(el.input, 'value', _.option.innerText);
                        this.selectedKey = $KD.getAttr(_.option, 'value');
                    }

                    $KU.each(this.masterData, function(data) {
                        if(data[1] === el.input.value) {
                            isValidValue = true;
                            key = data[0];
                        }
                    }, this);

                    if(_.picker && isValidValue) {
                        this.selectedKey = key;
                        _closePicker.call(this);
                    } else {
                        _openPicker.call(this);
                    }
                }

                return false;
            }},

            {keey:'onInputKeyDown', value:function(evt) {
                var $K = voltmx.$kwebfw$, $KD = $K.dom, _ = this._kwebfw_,
                    li = null, code = evt.keyCode || evt.which, skin = '';

                if([27, 38, 40].indexOf(code) >= 0) { //Escape, Up Arrow or Down Arrow
                    $KD.preventDefault(evt);

                    if(code === 27) { //Escape
                        _closePicker.call(this);
                    } else if([38, 40].indexOf(code) >= 0) { //Up Arrow or Down Arrow
                        if(_.picker) {
                            if(code === 38) { //Up Arrow
                                if(!_.option) {
                                    li = $KD.last(_.picker);
                                } else {
                                    li = $KD.prev(_.option);
                                    li = _updateDisableItemOption.call(this, li, code);
                                    if(!li) li = $KD.last(_.picker);
                                }
                            } else if(code === 40) { //Down Arrow
                                if(!_.option) {
                                    li = $KD.first(_.picker);
                                } else {
                                    li = $KD.next(_.option);
                                    li = _updateDisableItemOption.call(this, li, code);
                                    if(!li) li = $KD.first(_.picker);
                                }
                            }
                            li = _updateDisableItemOption.call(this, li, code);

                            if(li && li !== _.option) {
                                skin = _getHoverSkinForListItem.call(this);

                                if(_.option) {
                                    $KD.removeCls(_.option, skin + '-hover');
                                }
                                $KD.addCls(li, skin + '-hover');
                                li.scrollIntoView({behavior: 'smooth', block: 'nearest'});
                                _.option = li;
                            }
                        }
                    }
                }

                return false;
            }},

            {keey:'onInputKeyUp', value:function(evt) {
                var $K = voltmx.$kwebfw$, $KD = $K.dom, _ = this._kwebfw_, $KW = $K.widget, $KU = $K.utils,
                    code = evt.keyCode || evt.which, el = $KW.el(this), isValidValue = false, key = null;

                if(code === 13) { //Enter
                    if(_.option) {
                        $KD.setAttr(el.input, 'value', _.option.innerText);
                        this.selectedKey = $KD.getAttr(_.option, 'value');
                    }

                    $KU.each(this.masterData, function(data) {
                        if(data[1] === el.input.value) {
                            isValidValue = true;
                            key = data[0];
                        }
                    }, this);

                    if(_.picker && isValidValue) {
                        this.selectedKey = key;
                        _closePicker.call(this);
                    } else {
                        _openPicker.call(this);
                    }
                } else if([38, 40].indexOf(code) === -1) {
                    _closePicker.call(this);
                    _openPicker.call(this);
                }

                return false;
            }},


            {keey:'setupUIInteraction', value:function(dom, clone) {
                var $K = voltmx.$kwebfw$, $KW = $K.widget,
                    $KD = $K.dom, el = $KW.el(this), tabindex = '';

                if(!$KW.interactable(this)) {
                    if($KW.disabled(this)) {
                        $KD.setAttr(dom, 'disabled', 'disabled');
                    } else {
                        $KD.setAttr(dom, 'readonly', 'readonly');
                    }

                    $KD.setAttr(dom, 'tabindex', -1);

                    if(this.viewType === constants.LISTBOX_VIEW_TYPE_EDITVIEW) {
                        $KD.removeAttr(el.icon, 'tabindex');
                    }
                } else {
                    tabindex = $KW.tabIndex(this, clone);
                    $KD.removeAttr(dom, 'disabled');

                    $KD.setAttr(dom, 'tabindex', tabindex);

                    if(this.viewType === constants.LISTBOX_VIEW_TYPE_EDITVIEW) {
                        $KD.setAttr(el.icon, 'tabindex', tabindex);
                    }
                }
            }}
        ]}
    ]);


    //remove and set skin on option of listbox
    var _applySkinOnListItem = function ListBox$_applySkinOnListItem(prop, option) {
        var $K = voltmx.$kwebfw$, $KD = $K.dom, disabledkeys = prop.disabledKeys || [],
            itemNormalSkin = prop.itemNormalSkin, itemDisabledSkin = prop.itemDisabledSkin || '-voltmx-option-disabled';

        $KD.removeAttr(option, 'class');
        if(disabledkeys.length !== 0 && disabledkeys.indexOf(option.getAttribute('value')) !== -1) {
            $KD.addCls(option, itemDisabledSkin);//if the option is disabled
            if(itemDisabledSkin === '-voltmx-option-disabled') {
                $KD.addCls(option, itemNormalSkin);
            }
        } else if(itemNormalSkin !== '') {
            $KD.addCls(option, itemNormalSkin);
        } else if(prop.viewType === constants.LISTBOX_VIEW_TYPE_EDITVIEW) {
            $KD.addCls(option, prop.skin);
        }
    };

    //This functions will be called in the scope of widget instance
    var _closePicker = function ListBox$_closePicker() {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget,
            $KD = $K.dom, _ = this._kwebfw_, el = null;

        if($KU.is(_.picker, 'dom')) {
            delete _.option;
            $KD.remove(_.picker);
            delete _.picker;
            el = $KW.el(this);
            $KD.setAttr(el.icon, 'aria-expanded', 'false');

            $KW.dismissPicker(this);
        }
    };


    //All widget file must have this variable
    //All the functions will be called in the scope of widget instance
    var _dependentPropertiesValidationMessage = {
        ListBox: function ListBox$_dependentPropertiesValidationMessage(prop, bconfig, lconfig, pspconfig) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils, message = '', keys = [],
                disabledKeys = (pspconfig && pspconfig.disabledKeys) || bconfig.disabledKeys,
                masterData = (pspconfig && pspconfig.masterData) || bconfig.masterData,
                masterDataMap = (pspconfig && pspconfig.masterDataMap) || bconfig.masterDataMap,
                multiSelect = (pspconfig && pspconfig.multiSelect) || bconfig.multiSelect,
                selectedKey = (pspconfig && pspconfig.selectedKey) || bconfig.selectedKey,
                selectedKeys = (pspconfig && pspconfig.selectedKeys) || bconfig.selectedKeys;

            disabledKeys = ($KU.is(disabledKeys, 'null') || $KU.is(disabledKeys, 'array')) ? disabledKeys : prop.disabledKeys;
            masterData = ($KU.is(masterData, 'null') || $KU.is(masterData, 'array')) ? masterData : prop.masterData;
            masterDataMap = ($KU.is(masterDataMap, 'null') || $KU.is(masterDataMap, 'array')) ? masterDataMap : prop.masterDataMap;
            multiSelect = ($KU.is(multiSelect, 'boolean')) ? multiSelect : prop.multiSelect;
            selectedKey = ($KU.is(selectedKey, 'null') || $KU.is(selectedKey, 'string')) ? selectedKey : prop.selectedKey;
            selectedKeys = ($KU.is(selectedKeys, 'null') || $KU.is(selectedKeys, 'array')) ? selectedKeys : prop.selectedKeys;

            if($KU.is(selectedKeys, 'array') && $KU.is(selectedKey, 'string')) {
                if(!multiSelect && selectedKeys.length > 1) {
                    message += '<selectedKeys> must hold only one key for non-multiselect ListBox.';
                } else if(selectedKeys[(selectedKeys.length - 1)] !== selectedKey) {
                    message += '<selectedKey> must be the last key of <selectedKeys> of ListBox.';
                }
            } else if((masterData || masterDataMap)
            && ($KU.is(selectedKey, 'string') || selectedKeys)) {
                $KU.each((masterData || masterDataMap), function(data) {
                    var $K = voltmx.$kwebfw$, $KU = $K.utils;

                    keys.push(($KU.is(data, 'array')) ? data[0] : data[masterDataMap[1]]);
                });

                if($KU.is(selectedKey, 'string')
                && keys.indexOf(selectedKey) === -1) {
                    message += 'Invalid selectedKey <'+selectedKey+'>.';
                }

                $KU.each(selectedKeys, function(name) {
                    if(keys.indexOf(name) === -1) {
                        message += 'Invalid selectedKey(s) <'+name+'>.';
                        return true;
                    }
                });
            } else if((masterData || masterDataMap)
            && ($KU.is(disabledKeys, 'null') || $KU.is(disabledKeys, 'array'))) {
                $KU.each((masterData || masterDataMap), function(data) {
                    var $K = voltmx.$kwebfw$, $KU = $K.utils;

                    keys.push(($KU.is(data, 'array')) ? data[0] : data[masterDataMap[1]]);
                });

                $KU.each(disabledKeys, function(name) {
                    if(keys.indexOf(name) === -1) {
                        message += 'Invalid disabledKey(s) <'+name+'>.';
                        return true;
                    }
                });
            }

            return message;
        }
    };


    //All widget file must have this variable
    //All the functions will be called in the scope of widget instance
    var _getter = {
        ListBox: {
            disabledKeys: function ListBox$_getter_disabledKeys(value) {
                return (value) ? value.slice(0) : null;
            },

            masterData: function ListBox$_getter_masterData(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, data = null;

                if(value) {
                    data = [];

                    $KU.each(value, function(item) {
                        var $K = voltmx.$kwebfw$, $KU = $K.utils,
                            $KW = $K.widget, val = [item[0], item[1]];

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

            masterDataMap: function ListBox$_getter_masterDataMap(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget,
                    data = null, keyName = '', valName = '', masterDataMap = null;

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
                    masterDataMap = [data, keyName, valName];
                }

                return masterDataMap;
            },

            selectedKeys: function ListBox$_getter_selectedKeys(value) {
                return (value) ? value.slice(0) : null;
            },

            selectedKeyValue: function ListBox$_getter_selectedKeyValue(value) {
                return (value) ? value.slice(0) : null;
            },

            selectedKeyValues: function ListBox$_getter_selectedKeyValues(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils;

                return $KU.clone(value);
            }
        }
    };

    //This functions will be called in the scope of widget instance
    var _getHoverSkinForListItem = function ListBox$_getHoverSkinForListItem() {
        var _ = this._kwebfw_, prop = _.prop, skin = '';

        if(prop.itemHoverSkin !== '') {
            skin = prop.itemHoverSkin;
        } else {
            skin = prop.hoverSkin;
        }

        return skin;
    };

    //This functions will be called in the scope of widget instance
    var _getValueByKey = function ListBox$_getValueByKey(ki) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, value = '', k = '', v = '',
            prop = this._kwebfw_.prop, masterdata = prop.masterData;

        if(!masterdata && prop.masterDataMap) {
            masterdata = [];
            k = prop.masterDataMap[1];
            v = prop.masterDataMap[2];

            $KU.each(prop.masterDataMap[0], function(data) {
                masterdata.push([data[k], data[v]]);
            });
        }

        $KU.each(masterdata, function(data) {
            if(ki === data[0]) {
                value = data[1];
                return true;
            }
        });

        return value;
    };


    //This functions will be called in the scope of widget instance
    //iterate list option nodes
    var _iterateListItemNodes = function ListBox$_iterateListItemNodes(el) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KD = $K.dom,
            prop = this._kwebfw_.prop, options = null;

        options = $KD.find(el.node, 'option');
        if(this.viewType === constants.LISTBOX_VIEW_TYPE_LISTVIEW) {
            if(options.length) {
                $KU.each(options, function(option) {
                    _applySkinOnListItem(prop, option);
                });
            }
        }
    };


    //This functions will be called in the scope of widget instance
    var _openPicker = function ListBox$_openPicker() {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget,
            $KD = $K.dom, _ = this._kwebfw_, el = null, pel = null,
            pickers = {}, picker = {};

        if(!$KU.is(_.picker, 'dom')) {
            pickers = $KW.pickers(this);

            pickers[_.uid] = _.uid;
            picker = _.picker = _renderPicker.call(this);

            el = $KW.el(this);

            $KD.style(picker, {
                left: (el.node.offsetLeft + 'px'),
                top: (el.node.offsetTop + el.node.offsetHeight + 'px'),
                width: (el.node.offsetWidth + 'px')
            });

            $KD.setAttr(el.icon, 'aria-expanded', 'true');
            pel = $KW.el($KW.pmodel(this));
            $KW.addToView((pel.scrolee || pel.viewport || pel.node), picker);
        }
    };

    //All widget file must have this variable
    //This functions will be called in the scope of widget instance
    var _populateUnderscore = {
        ListBox: function ListBox$_populateUnderscore() {
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
                    $KU.defineProperty(_, 'ns', 'voltmx.ui.ListBox', null);
                }
            }
            if(!_.name) {
                if($KU.is(this.__$kwebfw$name__, 'string') && this.__$kwebfw$name__) {
                    $KU.defineProperty(_, 'name', this.__$kwebfw$name__, null);
                } else {
                    $KU.defineProperty(_, 'name', 'ListBox', null);
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
        ListBox: function ListBox$_postInitialization() {
            var $K = voltmx.$kwebfw$, $KU = $K.utils,
                $KW = $K.widget, prop = this._kwebfw_.prop;

            $KW.normalizeGroupMasterData(this);

            if(!prop.multiSelect && $KU.is(prop.selectedKey, 'null')
            && prop.masterData && prop.masterData.length > 0) {
                prop.selectedKey = prop.masterData[0][0];
            }

            if(this.viewType === constants.LISTBOX_VIEW_TYPE_EDITVIEW) {
                prop.multiSelect = false;
                prop.multiSelectRows = null;

                if($KU.is(prop.selectedKeys, 'array')
                && prop.selectedKeys.length > 1) {
                    prop.selectedKeys.splice(0, (prop.selectedKeys.length - 1));
                }

                if($KU.is(prop.selectedKeyValues, 'array')
                && prop.selectedKeyValues.length > 1) {
                    prop.selectedKeyValues.splice(0, (prop.selectedKeyValues.length - 1));
                }
            }

            if($KU.is(prop.padding, 'null')) {
                prop.padding = [3, 0, 0, 0];
            }

            if($KU.is(prop.skin, 'null')) {
                prop.skin = 'defListBoxNormal';
            }

            if($KU.is(prop.selectedKey, 'null')) {
                prop.selectedKeyValue = null;
            }

            if($KU.is(prop.selectedKeys, 'null')) {
                prop.selectedKeyValues = null;
            } else if($KU.is(prop.selectedKeys, 'array')) {
                prop.selectedKeyValues = [];
            }

            if(prop.multiSelect) {
                if($KU.is(prop.selectedKey, 'null')
                && $KU.is(prop.selectedKeys, 'array') && prop.selectedKeys.length) {
                    prop.selectedKey = prop.selectedKeys[(prop.selectedKeys.length - 1)];
                    prop.selectedKeyValues = [];

                    $KU.each(prop.selectedKeys, function(selectedKey) {
                        var $K = voltmx.$kwebfw$, $KW = $K.widget,
                            selectedKeyValue = $KW.getGroupSelectedKeyValueByKey(this, selectedKey);

                        prop.selectedKeyValues.push(selectedKeyValue);
                    }, this);

                    prop.selectedKeyValue = prop.selectedKeyValues[(prop.selectedKeyValues.length - 1)];
                } else if($KU.is(prop.selectedKey, 'string')
                && $KU.is(prop.selectedKeys, 'null')) {
                    prop.selectedKeys = [prop.selectedKey];
                    prop.selectedKeyValue = $KW.getGroupSelectedKeyValueByKey(this, prop.selectedKey);
                    prop.selectedKeyValues = [prop.selectedKeyValue];
                }
            } else if($KU.is(prop.selectedKey, 'string')
            && $KU.is(prop.selectedKeys, 'null')) {
                prop.selectedKeys = [prop.selectedKey];
                prop.selectedKeyValue = $KW.getGroupSelectedKeyValueByKey(this, prop.selectedKey);
                prop.selectedKeyValues = [prop.selectedKeyValue];
            }
        }
    };


    //All widget file must have this variable
    //This functions will be called in the scope of widget instance
    var _relayoutActiveTriggerer = {
        ListBox: function ListBox$_relayoutActiveTriggerer() {
            return [];
        }
    };


    //All widget file must have this variable
    //This functions will be called in the scope of widget instance
    var _relayoutPassiveTriggerer = {
        ListBox: function ListBox$_relayoutPassiveTriggerer() {
            return [];
        }
    };


    //This function will be called in the scope of widget instance
    _renderListBox[constants.LISTBOX_VIEW_TYPE_LISTVIEW] = function ListBox$_renderListBox_listview() {
        var $K = voltmx.$kwebfw$, $KU = $K.utils,
            $KD = $K.dom, prop = null, masterdata = null,
            $KW = $K.widget, $super = voltmx.ui.ListBox.base.prototype,
            el = null, _ = this._kwebfw_, view = _.view;

        view = $super._render.call(this, 'SELECT');
        el = $KW.el(view);

        $KD.setAttr(view, 'kv', this.viewType);
        $KD.setAttr(view, 'kwh-change', 'onChange');

        if(view) {
            prop = this._kwebfw_.prop;
            masterdata = this.masterData;

            if(!masterdata && prop.masterDataMap) {
                masterdata = this.masterDataMap[0];
            }

            $KD.html(view, '');
            view.multiple = this.multiSelect;

            $KU.each(masterdata, function(data) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, $KD = $K.dom, key = '',
                    prop = this._kwebfw_.prop, option = null, value = '', a11y = null;

                key = ($KU.is(data, 'array')) ? data[0] : data[prop.masterDataMap[1]];
                value = ($KU.is(data, 'array')) ? data[1] : data[prop.masterDataMap[2]];
                a11y = ($KU.is(data, 'array')) ? data[2] : data['accessibilityConfig'];

                option = $KD.create('OPTION', {value:key});
                option.text = ($KU.is(value, 'i18n') ? $KU.getI18Nvalue(value) : value);
                $KW.applyGroupA11Y(option, a11y, value, (_.uid+'_'+key+'_hint'));

                //TODO: disabled true based on the widget model.

                $KD.add(view, option);
            }, this);
        }

        if(this.multiSelect) {
            _view.ListBox.selectedKeys.call(this, el, _.prop.selectedKeys);
            _view.ListBox.multiSelectRows.call(this, el, this.multiSelectRows);
        } else {
            _view.ListBox.selectedKey.call(this, el, _.prop.selectedKey);
        }
        _view.ListBox.disabledKeys.call(this, el);
        _view.ListBox.itemNormalSkin.call(this, el);
        return view;
    };


    //This function will be called in the scope of widget instance
    _renderListBox[constants.LISTBOX_VIEW_TYPE_EDITVIEW] = function ListBox$_renderListBox_editview() {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KD = $K.dom,
            prop = this._kwebfw_.prop, masterdata = null, icon = null,
            $KW = $K.widget, $super = voltmx.ui.ListBox.base.prototype,
            el = null, _ = this._kwebfw_, view = _.view, input = null;

        input = $KD.create('INPUT', {
            type:'text', autocomplete:'off'
        });

        icon = $KD.create('IMG', {
            alt:'ListBox Icon', role:'button',
            loading:'lazy'
        });
        $KD.on(icon, 'mousedown', 'image', function(e) {
            $KD.preventDefault(e);
        });
        $KD.setAttr(icon, 'aria-label', 'ListBox Icon');
        $KD.setAttr(icon, 'aria-haspopup', 'true');
        $KD.setAttr(icon, 'aria-expanded', 'false');
        $KD.setAttr(icon, 'kwh-focusout', 'onFocusOut');
        $KD.setAttr(icon, 'kwh-click', 'onIconClick');
        $KD.setAttr(icon, 'kwh-keyup', 'onIconKeyUp');
        $KD.setAttr(icon, 'kwh-keydown', 'onIconKeyDown');
        $KD.setAttr(input, 'kwh-focusout', 'onFocusOut');
        $KD.setAttr(input, 'kwh-keydown', 'onInputKeyDown');
        $KD.setAttr(input, 'kwh-keyup', 'onInputKeyUp');
        $KD.setAttr(icon, 'src', $KU.getImageURL('select_arrow.gif'));

        view = $super._render.call(this, 'DIV', [input, icon]);
        el = $KW.el(view);

        $KD.setAttr(view, 'kv', this.viewType);

        if(view) {
            prop = this._kwebfw_.prop;
            masterdata = this.masterData;

            if(!masterdata && prop.masterDataMap) {
                masterdata = this.masterDataMap[0];
            }
        }

        _view.ListBox.selectedKey.call(this, el, _.prop.selectedKey);

        return view;
    };


    //This function will be called in the scope of widget instance
    var _renderPicker = function ListBox$_renderPicker() {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KD = $K.dom,
            _ = this._kwebfw_, prop = _.prop,
            uid = _.uid, masterdata = prop.masterData, picker = null;

        if(!masterdata && prop.masterDataMap) {
            masterdata = this.masterDataMap[0];
        }

        picker = $KD.create('ul', {
            id:(uid+'_picker'), kwf:uid
        }, {
            position:'absolute',
            listStyleType:'none',
            maxHeight:'200px',
            overflowX:'hidden',
            overflowY:'auto',
            zIndex:2147483647
        });


        $KU.each(masterdata, function(data) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils, $KD = $K.dom, $KW = $K.widget,
                prop = this._kwebfw_.prop, el = $KW.el(this),
                option = null, key = '', value = '', a11y = null;

            key = ($KU.is(data, 'array')) ? data[0] : data[prop.masterDataMap[1]];
            value = ($KU.is(data, 'array')) ? data[1] : data[prop.masterDataMap[2]];
            a11y = ($KU.is(data, 'array')) ? data[2] : data['accessibilityConfig'];

            if(!el.input.value || value.toLowerCase().indexOf(el.input.value.toLowerCase()) >= 0) {
                option = $KD.create('LI', {
                    kr:'option',
                    value:key, role:'option'
                });
                $KD.text(option, ($KU.is(value, 'i18n') ? $KU.getI18Nvalue(value) : value));
                $KD.setAttr(option, 'kwh-click', 'onItemSelection');
                $KW.applyGroupA11Y(option, a11y, value, (_.uid+'_'+key+'_hint'));

                _applySkinOnListItem(prop, option);

                //TODO: disabled true based on the widget model.
                $KD.add(picker, option);
            }
        }, this);

        return picker;
    };


    //All widget file must have this variable
    //All the functions will be called in the scope of widget instance
    var _setter = {
        ListBox: {
            multiSelect: function ListBox$_setter_multiSelect(old) {
                var prop = this._kwebfw_.prop, count = -1;

                if(old && prop.selectedKeys && prop.selectedKeys.length > 1) {
                    count = (prop.selectedKeys.length - 1);
                    prop.selectedKeys.splice(0, count);
                    prop.selectedKeyValues.splice(0, count);
                }
            },

            masterData: function ListBox$_setter_masterData(/* old */) {
                var prop = this._kwebfw_.prop;

                prop.disabledKeys = null;
                prop.selectedKey = null;
                prop.selectedKeys = null;
                prop.selectedKeyValue = null;
                prop.selectedKeyValues = null;
            },

            masterDataMap: function ListBox$_setter_masterDataMap(/* old */) {
                var prop = this._kwebfw_.prop;

                if(!prop.masterData) {
                    prop.disabledKeys = null;
                    prop.selectedKey = null;
                    prop.selectedKeys = null;
                    prop.selectedKeyValue = null;
                    prop.selectedKeyValues = null;
                }
            },

            selectedKey: function ListBox$_setter_selectedKey(/* old */) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget,
                    index = -1, _ = this._kwebfw_, prop = _.prop;

                if($KU.is(prop.selectedKey, 'null')) {
                    prop.selectedKeys = null;
                    prop.selectedKeyValue = null;
                    prop.selectedKeyValues = null;
                } else {
                    prop.selectedKeyValue = $KW.getGroupSelectedKeyValueByKey(this, prop.selectedKey);

                    if($KU.is(prop.selectedKeys, 'null')) {
                        prop.selectedKeys = [prop.selectedKey];
                        prop.selectedKeyValues = [prop.selectedKeyValue];
                    } else {
                        if(!prop.multiSelect) {
                            prop.selectedKeys = [prop.selectedKey];
                            prop.selectedKeyValues = [prop.selectedKeyValue];
                        } else {
                            index = prop.selectedKeys.indexOf(prop.selectedKey);

                            if(index >= 0) {
                                prop.selectedKeys.splice(index, 1);
                                prop.selectedKeyValues.splice(index, 1);
                            }

                            prop.selectedKeys.push(prop.selectedKey);
                            prop.selectedKeyValues.push(prop.selectedKeyValue);
                        }
                    }
                }
            },

            selectedKeys: function ListBox$_setter_selectedKeys(/* old */) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, prop = this._kwebfw_.prop;

                if(!prop.selectedKeys) {
                    prop.selectedKey = null;
                    prop.selectedKeyValue = null;
                    prop.selectedKeyValues = null;
                } else if(!prop.selectedKeys.length) {
                    prop.selectedKeyValues = [];
                    prop.selectedKey = null;
                    prop.selectedKeyValue = null;
                } else {
                    prop.selectedKeyValues = [];

                    $KU.each(prop.selectedKeys, function(value) {
                        var $K = voltmx.$kwebfw$, $KW = $K.widget, prop = this._kwebfw_.prop,
                            keyval = $KW.getGroupSelectedKeyValueByKey(this, value);

                        prop.selectedKeyValues.push(keyval);
                    }, this);

                    prop.selectedKey = prop.selectedKeys[(prop.selectedKeys.length - 1)];
                    prop.selectedKeyValue = prop.selectedKeyValues[(prop.selectedKeyValues.length - 1)];
                }
            }
        }
    };


    //update hover and li on input key down
    var _updateDisableItemOption = function ListBox$_updateDisableItemOption(li, code) {
        var $K = voltmx.$kwebfw$, $KD = $K.dom, _ = this._kwebfw_, prop = _.prop,
            disabledkeys = prop.disabledKeys || [], option = null;
        if(li && disabledkeys.indexOf($KD.getAttr(li, 'value')) !== -1) {
            if(code === 40) {
                option = $KD.next(li);
                option = _updateDisableItemOption.call(this, option, code);
            } else if(code === 38) {
                option = $KD.prev(li);
                option = _updateDisableItemOption.call(this, option, code);
            }
        } else if(li) {
            option = li;
        } else {
            option = null;
        }
        return option;
    };


    //All widget file must have this variable
    //All the functions will be called in the scope of widget instance
    //These function should always return a boolean value
    var _valid = {
        ListBox: {

            disabledKeys: function ListBox$_valid_disabledKeys(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false,
                    prop = this._kwebfw_.prop, keys = [];

                if($KU.is(value, 'null')) {
                    flag = true;
                } else if($KU.is(value, 'array')) {
                    flag = true;

                    if(flag && value) {
                        if((Object.prototype.hasOwnProperty.call(prop, 'masterData') && prop.masterData)
                        || (Object.prototype.hasOwnProperty.call(prop, 'masterDataMap') && prop.masterDataMap)) {
                            $KU.each((prop.masterData || prop.masterDataMap[0]), function(data) {
                                var $K = voltmx.$kwebfw$, $KU = $K.utils;

                                keys.push(($KU.is(data, 'array')) ? data[0] : data[prop.masterDataMap[1]]);
                            });

                            $KU.each(value, function(name) {
                                if(keys.indexOf(name) === -1) {
                                    flag = false;
                                    return true;
                                }
                            });
                        }
                    }
                }
            },

            itemHoverSkin: function ListBox$_valid_itemHoverSkin(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'string') && value.split(' ').length === 1) {
                    flag = true;
                }

                return flag;
            },

            itemDisabledSkin: function ListBox$_valid_itemHoverSkin(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'string') && value.split(' ').length === 1) {
                    flag = true;
                }

                return flag;
            },

            itemNormalSkin: function ListBox$_valid_itemNormalSkin(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'string') && value.split(' ').length === 1) {
                    flag = true;
                }

                return flag;
            },

            masterData: function ListBox$_valid_masterData(value) {
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

            masterDataMap: function ListBox$_valid_masterDataMap(value) {
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

            multiSelect: function ListBox$_valid_multiSelect(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'boolean')) {
                    flag = true;
                }

                if(flag && value && this.viewType === constants.LISTBOX_VIEW_TYPE_EDITVIEW) {
                    flag = false;
                }

                return flag;
            },

            multiSelectRows: function ListBox$_valid_multiSelectRows(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if(($KU.is(value, 'integer') && value >= 0) || $KU.is(value, 'null')) {
                    flag = true;
                }

                if(flag && value && this.viewType === constants.LISTBOX_VIEW_TYPE_EDITVIEW) {
                    flag = false;
                }

                return flag;
            },

            selectedKey: function ListBox$_valid_selectedKey(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false,
                    prop = this._kwebfw_.prop, keys = [];

                if($KU.is(value, 'string') || $KU.is(value, 'null')) {
                    flag = true;
                }

                if(flag && $KU.is(value, 'string')
                && (Object.prototype.hasOwnProperty.call(prop, 'masterData'))
                && (Object.prototype.hasOwnProperty.call(prop, 'masterDataMap'))) {
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

            selectedKeys: function ListBox$_valid_selectedKeys(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false,
                    prop = this._kwebfw_.prop, keys = [];

                if($KU.is(value, 'null')) {
                    flag = true;
                } else if($KU.is(value, 'array')) {
                    flag = true;

                    if((Object.prototype.hasOwnProperty.call(prop, 'multiSelect'))
                        && !prop.multiSelect && value.length > 1) {
                        flag = false;
                    }

                    if(flag && value
                    && (Object.prototype.hasOwnProperty.call(prop, 'masterData'))
                    && (Object.prototype.hasOwnProperty.call(prop, 'masterDataMap'))) {
                        if(prop.masterData || prop.masterDataMap) {
                            $KU.each((prop.masterData || prop.masterDataMap[0]), function(data) {
                                var $K = voltmx.$kwebfw$, $KU = $K.utils;

                                keys.push(($KU.is(data, 'array')) ? data[0] : data[prop.masterDataMap[1]]);
                            });

                            $KU.each(value, function(name) {
                                if(keys.indexOf(name) === -1) {
                                    flag = false;
                                    return true;
                                }
                            });
                        }
                    }
                }

                return flag;
            },

            selectedKeyValue: function ListBox$_valid_selectedKeyValue(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'array') || $KU.is(value, 'null')) {
                    flag = true;
                }

                return flag;
            },

            selectedKeyValues: function ListBox$_valid_selectedKeyValues(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'array') || $KU.is(value, 'null')) {
                    flag = true;
                }

                return flag;
            },

            viewType: function ListBox$_valid_viewType(value) {
                var flag = false, options = [
                    constants.LISTBOX_VIEW_TYPE_EDITVIEW,
                    constants.LISTBOX_VIEW_TYPE_LISTVIEW
                ];

                if(options.indexOf(value) >= 0) {
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
        ListBox: {
            disabledKeys: function ListBox$_view_disableKeys(el/* , old */) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, $KD = $K.dom,
                    prop = this._kwebfw_.prop, options = null,
                    disabledkeys = prop.disabledKeys || [];

                if(this.viewType === constants.LISTBOX_VIEW_TYPE_LISTVIEW) {
                    options = $KD.find(el.node, 'option');
                    if(options.length) {
                        $KU.each(options, function(option) {
                            option.disabled = false;
                            _applySkinOnListItem(prop, option);
                            if(disabledkeys.indexOf(option.getAttribute('value')) !== -1) {
                                option.disabled = true;
                            }
                        });
                    }
                }
            },

            itemHoverSkin: function ListBox$_view_itemHoverSkin(/* el, old */) {},

            itemDisabledSkin: function ListBox$_view_itemDisabledSkin(el/* , old */) {
                _iterateListItemNodes.call(this, el);
            },

            itemNormalSkin: function ListBox$_view_itemNormalSkin(el/* , old */) {
                _iterateListItemNodes.call(this, el);
            },

            masterData: function ListBox$_view_masterData(el/* , old */) {
                var $K=voltmx.$kwebfw$, $KW = $K.widget;

                $KW.normalizeGroupMasterData(this);
                _renderListBox[this.viewType].call(this, el.node);
            },

            masterDataMap: function ListBox$_view_masterDataMap(el/* , old */) {
                var $K=voltmx.$kwebfw$, $KW = $K.widget;

                $KW.normalizeGroupMasterDataMap(this);
                _renderListBox[this.viewType].call(this, el.node);
            },

            multiSelect: false,

            multiSelectRows: function ListBox$_view_multiSelectRows(el/* , old */) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, $KD = $K.dom;

                if(this.multiSelect && $KU.is(this.multiSelectRows, 'integer')) {
                    $KD.setAttr(el.node, 'size', this.multiSelectRows);
                } else {
                    $KD.removeAttr(el.node, 'size');
                }
            },

            selectedKey: function ListBox$_view_selectedKey(el/* , old */) {
                var $K = voltmx.$kwebfw$, $KD = $K.dom;

                if(this.viewType === constants.LISTBOX_VIEW_TYPE_LISTVIEW) {
                    el.node.value = this.selectedKey;
                } else if(this.viewType === constants.LISTBOX_VIEW_TYPE_EDITVIEW) {
                    if(this.selectedKey !== null) {
                        $KD.setAttr(el.input, 'value', _getValueByKey.call(this, this.selectedKey));
                    } else {
                        $KD.setAttr(el.input, 'value', '');
                    }
                }
            },

            selectedKeys: function ListBox$_view_selectedKeys(el/* , old */) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils,
                    $KD = $K.dom, prop = this._kwebfw_.prop;

                if(prop.viewType === constants.LISTBOX_VIEW_TYPE_LISTVIEW) {
                    $KU.each($KD.find(el.node, 'option'), function(option) {
                        var $K = voltmx.$kwebfw$, $KU = $K.utils, prop = this._kwebfw_.prop;

                        if(!$KU.is(prop.selectedKeys, 'array')) {
                            option.selected = false;
                        } else {
                            option.selected = (prop.selectedKeys.indexOf(option.value) !== -1);
                        }
                    }, this);
                } else if(prop.viewType === constants.LISTBOX_VIEW_TYPE_EDITVIEW) {
                    if($KU.is(prop.selectedKeys, 'array') && prop.selectedKeys.length === 1) {
                        $KD.setAttr(el.input, 'value', _getValueByKey.call(this, prop.selectedKeys[0]));
                    } else {
                        $KD.setAttr(el.input, 'value', '');
                    }
                }
            },

            selectedKeyValue: false,

            selectedKeyValues: false,

            viewType: function ListBox$_view_viewType(/* el, old */) {
                var $K = voltmx.$kwebfw$, $KW = $K.widget, $KD = $K.dom, view = null,
                    append = false, next = $KD.next(this._kwebfw_.view);

                if(!next) {
                    append = true;
                    next = $KW.holder(this.parent);
                }

                if(next) {
                    $KD.remove(this._kwebfw_.view);
                    this._kwebfw_.view = null;
                    view = _renderListBox[this.viewType].call(this);

                    if(append) {
                        $KD.add(next, view);
                    } else {
                        $KD.before(next, view);
                    }
                }
            }
        }
    };


    Object.defineProperty(voltmx.ui, 'ListBox', {configurable:false, enumerable:false, writable:false, value:(function() {
        var $K = voltmx.$kwebfw$;


        /**
        * voltmx.ui.ListBox constructor.
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
        var ListBox = function ListBox(bconfig, lconfig, pspconfig) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils, self = this,
                dependentPropertiesValidationMessage = '', prop = null, p = null;

            if(!$KU.is(bconfig, 'object')) bconfig = {};

            if(!bconfig.isPreValidated) {
                prop = {
                    disabledKeys: null,
                    itemHoverSkin: '',
                    itemDisabledSkin: '',
                    itemNormalSkin: '',
                    masterData: null,
                    masterDataMap: null,
                    multiSelect: false,
                    multiSelectRows: null,
                    selectedKey: null,
                    selectedKeys: null,
                    selectedKeyValue: null,
                    selectedKeyValues: null,
                    viewType: constants.LISTBOX_VIEW_TYPE_LISTVIEW
                };
            }

            _populateUnderscore.ListBox.call(this);

            if(!$KU.is(bconfig.id, 'string') || !bconfig.id) {
                bconfig.id = (this._kwebfw_.name+$KU.uid());
            }

            ListBox.base.call(this, bconfig, lconfig, pspconfig);

            if(!bconfig.isPreValidated) {
                if($KU.is(_dependentPropertiesValidationMessage.ListBox, 'function')) {
                    dependentPropertiesValidationMessage = _dependentPropertiesValidationMessage.ListBox.call(this, prop, bconfig, lconfig, pspconfig);
                }
            }

            if(dependentPropertiesValidationMessage) {
                throw new Error(dependentPropertiesValidationMessage);
            } else {
                if(!bconfig.isPreValidated) {
                    //Defaulting to platfom values specific to ListBox
                    $KU.each(prop, function(value, key) {
                        var $K = voltmx.$kwebfw$, $KU = $K.utils,
                            $KW = $K.widget, valid = false, message = '';

                        if(!(Object.prototype.hasOwnProperty.call(bconfig, key))) {
                            bconfig[key] = value;
                        } else if($KW.getNonConstructorProperties(self._kwebfw_.name).indexOf(key) >= 0) {
                            throw new Error('<' + key + '> is a non-constructor property of <' + self._kwebfw_.ns + '> class.');
                        } else if(!$KU.is(_valid.ListBox[key], 'function')) {
                            throw new Error('<' + key + '> is available in default widget properties of <voltmx.ui.ListBox>, but not in <_valid.ListBox> namespace.');
                        } else {
                            valid = _valid.ListBox[key].call(self, bconfig[key]);
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

                //Defining Getters/Setters specific to ListBox
                $KU.each(_view.ListBox, function(value, key) {
                    var $K = voltmx.$kwebfw$, $KU = $K.utils;

                    $KU.defineProperty(self._kwebfw_.prop, key, bconfig[key], {configurable:false, enumerable:true, writable:true});

                    $KU.defineGetter(self, key, function ListBox$_getter() {
                        var $K = voltmx.$kwebfw$, $KU = $K.utils;

                        if($KU.is(_getter.ListBox[key], 'function')) {
                            return _getter.ListBox[key].call(this, this._kwebfw_.prop[key]);
                        }
                        return this._kwebfw_.prop[key];
                    }, true);

                    $KU.defineSetter(self, key, function ListBox$_setter(val) {
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
                                valid = _valid.ListBox[key].call(this, val);
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

                                    if($KU.is(_setter.ListBox[key], 'function')) {
                                        _setter.ListBox[key].call(this, old);
                                    }

                                    if(_relayoutActiveTriggerer.ListBox().indexOf(key) >= 0) {
                                        $KW.markRelayout(this);
                                    }

                                    if(_relayoutPassiveTriggerer.ListBox().indexOf(key) >= 0) {
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

                if($KU.is(_postInitialization.ListBox, 'function')) {
                    _postInitialization.ListBox.call(this);
                }
            }

            pspconfig = lconfig = bconfig = null; //For GC
        };


        $K.utils.inherits(ListBox, voltmx.ui.GroupWidget);


        /**
        * Builds the view layer for voltmx.ui.ListBox widget.
        *
        * @override
        * @access      protected
        * @method      _render
        * @memberof    voltmx.ui.ListBox
        * @author      Goutam Sahu <goutam.sahu@voltmx.com>
        *
        * @returns     {HTMLElement} – SampleWidget view.
        */
        var listbox__render = function ListBox$_render(/* tag */) {
            var $K = voltmx.$kwebfw$, $KW = $K.widget, $KD = $K.dom,
                _ = this._kwebfw_, view = _.view, el = $KW.el(view);

            if(this.isVisible || $K.F.RIVW) {
                view = _renderListBox[this.viewType].call(this);
                el = $KW.el(view);

                if(this.viewType === constants.LISTBOX_VIEW_TYPE_EDITVIEW) {
                    $KD.setAttr(el.icon, 'aria-expanded', 'false');
                }

                $KW.accessibility(this);
            }

            return view;
        };


        var listbox_setFocus = function ListBox$_setFocus(value) {
            var $super = voltmx.ui.ListBox.base.prototype, $K = voltmx.$kwebfw$,
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


        $K.defVoltmxProp(ListBox.prototype, [
            {keey:'_render', value:listbox__render},
            {keey:'setFocus', value:listbox_setFocus}
        ]);


        return ListBox;
    }())});
}());
