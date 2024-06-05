(function() {
    var $K = voltmx.$kwebfw$;

    $K.defVoltmxProp($K.ui, [
        {keey:'TextBox2', value:{}, items:[
            {keey:'onInput', value:function(evt) {
                var $K = voltmx.$kwebfw$, $KW = $K.widget, _ = this._kwebfw_,
                    prop = _.prop, restrictCharSet = prop.restrictCharactersSet,
                    target = null, value = null, text = '', caret = -1;

                if(!restrictCharSet) {
                    text = evt.target.value;
                } else {
                    target = evt.target;
                    caret = target.selectionStart;
                    value = target.value;
                    text = value[(caret-1)];

                    if(restrictCharSet.indexOf(text) === -1) {
                        text = value;
                    } else {
                        text = value.slice(0, (caret-1));
                        text += value.slice(caret, value.length);
                        target.value = text; //This line is important
                        target.selectionStart = target.selectionEnd = (caret - 1);
                    }
                }

                if(prop.text !== text) {
                    this.text = text;
                    $KW.fire(this, 'onTextChange', this);
                }

                return false;
            }},

            {keey:'onFocusIn', value:function(evt) {
                var $K = voltmx.$kwebfw$, $KW = $K.widget;

                this._kwebfw_.prop.text = evt.target.value;

                $K.apm.send(this, 'Touch', {type:(this._kwebfw_.name+'_Edit')});
                $KW.fire(this, 'onFocus', this);
                $KW.fire(this, 'onBeginEditing', this);

                return false;
            }},

            {keey:'onFocusOut', value:function(evt) {
                var $K = voltmx.$kwebfw$, $KW = $K.widget;

                this._kwebfw_.prop.text = evt.target.value;

                $KW.fire(this, 'onBlur', this);
                $KW.fire(this, 'onEndEditing', this);

                return false;
            }},

            {keey:'onKeyDown', value:function(evt) {
                var $K = voltmx.$kwebfw$, $KW = $K.widget, $KD = $K.dom,
                    propagate = true;

                if(this.onKeyDown) {
                    propagate = false;

                    $KW.fire(this, 'onKeyDown', this, {
                        altKey: (evt.altKey || false),
                        ctrlKey: (evt.ctrlKey || false),
                        metaKey: (evt.metaKey || false),
                        shiftKey: (evt.shiftKey || false),
                        keyCode: $KD.keyCode(evt)
                    });
                }

                return propagate;
            }},

            {keey:'onKeyUp', value:function(evt) {
                var $K = voltmx.$kwebfw$, $KW = $K.widget, $KD = $K.dom,
                    code = evt.keyCode || evt.which, propagate = true;

                if(code === 13) {
                    $KD.preventDefault(evt);
                    propagate = false;

                    if(code === 13) {
                        $KW.fire(this, 'onDone', this);
                    }
                }

                if(this.onKeyUp) {
                    propagate = false;
                    $KW.fire(this, 'onKeyUp', this, this, {
                        altKey: (evt.altKey || false),
                        ctrlKey: (evt.ctrlKey || false),
                        metaKey: (evt.metaKey || false),
                        shiftKey: (evt.shiftKey || false),
                        keyCode: $KD.keyCode(evt)
                    });
                }

                return propagate;
            }},

            {keey:'setupUIInteraction', value:function(dom, clone) {
                var $K = voltmx.$kwebfw$, $KW = $K.widget,
                    $KD = $K.dom, tabindex = '';

                if($KW.disabled(this)) {
                    $KD.setAttr(dom, 'disabled', 'disabled');
                    $KD.setAttr(dom, 'tabindex', -1);
                } else if(!$KW.interactable(this)) {
                    $KD.setAttr(dom, 'readonly', 'readonly');
                    $KD.setAttr(dom, 'tabindex', -1);
                } else {
                    tabindex = $KW.tabIndex(this, clone);

                    $KD.removeAttr(dom, 'disabled');
                    $KD.removeAttr(dom, 'readonly');
                    $KD.setAttr(dom, 'tabindex', tabindex);
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
        TextBox2: {
            placeholder: function TextBox2$_getter_placeholder() {
                var $K = voltmx.$kwebfw$, $KU = $K.utils,
                    prop = this._kwebfw_.prop, placeholder = prop.placeholder;

                if(prop.i18n_placeholder) {
                    placeholder = $KU.getI18Nvalue(prop.i18n_placeholder);
                }

                return placeholder;
            },

            text: function TextBox2$_getter_text() {
                var $K = voltmx.$kwebfw$, $KU = $K.utils,
                    prop = this._kwebfw_.prop, text = prop.text;

                if(prop.i18n_text) {
                    text = $KU.getI18Nvalue(prop.i18n_text);
                }

                return text;
            },

            toolTip: function TextBox2$_getter_toolTip() {
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
        TextBox2: function TextBox2$_populateUnderscore() {
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
                    $KU.defineProperty(_, 'ns', 'voltmx.ui.TextBox2', null);
                }
            }
            if(!_.name) {
                if($KU.is(this.__$kwebfw$name__, 'string') && this.__$kwebfw$name__) {
                    $KU.defineProperty(_, 'name', this.__$kwebfw$name__, null);
                } else {
                    $KU.defineProperty(_, 'name', 'TextBox2', null);
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
        TextBox2: function TextBox2$_postInitialization() {
            var $K = voltmx.$kwebfw$, $KU = $K.utils,
                _ = this._kwebfw_, prop = _.prop;

            if($KU.is(prop.skin, 'null')) {
                prop.skin = 'defTextBoxNormal';
            }

            if($KU.is(prop.padding, 'null')) {
                prop.padding = [0, 0, 0, 0];
            }

            if(prop.i18n_placeholder) {
                prop.placeholder = prop.i18n_placeholder;
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
        TextBox2: function TextBox2$_relayoutActiveTriggerer() {
            return [];
        }
    };


    //All widget file must have this variable
    //This functions will be called in the scope of widget instance
    var _relayoutPassiveTriggerer = {
        TextBox2: function TextBox2$_relayoutPassiveTriggerer() {
            return [];
        }
    };

    //This functions will be called in the scope of widget instance
    var _registerCutCopyPasteEvents = function TextBox2$_registerCutCopyPasteEvents(el) {
        var $K = voltmx.$kwebfw$, $KD = $K.dom;

        $KD.on(el.node, 'copy paste cut', 'textbox', function(e) {
            var $K = voltmx.$kwebfw$, $KD = $K.dom, $KW = $K.widget,
                widget = $KW.el(this), prop = null;

            if(widget.node) {
                widget = $KW.model(widget.node);
                prop = widget._kwebfw_.prop;
                if(!prop.textCopyable) {
                    $KD.preventDefault(e);
                }
            }
        }, {passive:false});
    };


    //This functions will be called in the scope of widget instance
    var _setInputType = function TextBox2$_setInputType(input) {
        var $K = voltmx.$kwebfw$, $KD = $K.dom;

        if(this.secureTextEntry) {
            $KD.setAttr(input, 'type', 'password');
        } else if(this.textInputMode === constants.TEXTBOX_INPUT_MODE_NUMERIC) {
            $KD.setAttr(input, 'type', 'number');
        } else {
            $KD.setAttr(input, 'type', 'text');
        }
    };


    //All widget file must have this variable
    //All the functions will be called in the scope of widget instance
    var _setter = {
        TextBox2: {
            placeholder: function TextBox2$_setter_placeholder(/* old */) {
                this._kwebfw_.prop.i18n_placeholder = '';
            },

            text: function TextBox2$_setter_text(/* old */) {
                this._kwebfw_.prop.i18n_text = '';
            },

            toolTip: function TextBox2$_setter_toolTip(/* old */) {
                this._kwebfw_.prop.i18n_toolTip = '';
            }
        }
    };


    //All widget file must have this variable
    //All the functions will be called in the scope of widget instance
    //These function should always return a boolean value
    var _valid = {
        TextBox2: {
            autoCapitalize: function TextBox2$_valid_autoCapitalize(value) {
                var options = [
                        constants.TEXTBOX_AUTO_CAPITALIZE_ALL,
                        constants.TEXTBOX_AUTO_CAPITALIZE_NONE,
                        constants.TEXTBOX_AUTO_CAPITALIZE_SENTENCES,
                        constants.TEXTBOX_AUTO_CAPITALIZE_WORDS
                    ], flag = (options.indexOf(value) >= 0);

                return flag;
            },

            autoComplete: function TextBox2$_valid_autoComplete(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'boolean')) {
                    flag = true;
                } else if($KU.is(value, 'string') && value) {
                    flag = true;
                }

                return flag;
            },

            autoCorrect: function TextBox2$_valid_autoCorrect(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'boolean')) {
                    flag = true;
                }

                return flag;
            },

            i18n_placeholder: function TextBox2$_valid_i18n_placeholder(value) {
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

            i18n_text: function TextBox2$_valid_i18n_text(value) {
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

            i18n_toolTip: function TextBox2$_valid_i18n_toolTip(value) {
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

            isSensitiveText: function TextBox2$_valid_isSensitiveText(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'boolean')) {
                    flag = true;
                }

                return flag;
            },

            keyBoardStyle: function TextBox2$_valid_keyBoardStyle(value) {
                var options = [
                        constants.TEXTBOX_KEY_BOARD_STYLE_CHAT,
                        constants.TEXTBOX_KEY_BOARD_STYLE_DECIMAL,
                        constants.TEXTBOX_KEY_BOARD_STYLE_DEFAULT,
                        constants.TEXTBOX_KEY_BOARD_STYLE_EMAIL,
                        constants.TEXTBOX_KEY_BOARD_STYLE_NONE,
                        constants.TEXTBOX_KEY_BOARD_STYLE_NUMBER_PAD,
                        constants.TEXTBOX_KEY_BOARD_STYLE_PHONE_PAD,
                        constants.TEXTBOX_KEY_BOARD_STYLE_SEARCH,
                        constants.TEXTBOX_KEY_BOARD_STYLE_URL
                    ], flag = (options.indexOf(value) >= 0);

                return flag;
            },

            maxTextLength: function TextBox2$_valid_maxTextLength(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if(($KU.is(value, 'integer') && value >= 0) || value === '') {
                    flag = true;
                }

                if(!flag && $K.F.EIWP) {
                    if($KU.is(value, 'null')) {
                        flag = ['', true];
                    }
                }

                return flag;
            },

            onBeginEditing: function TextBox2$_valid_onBeginEditing(value) {
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

            onDone: function TextBox2$_valid_onDone(value) {
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

            onEndEditing: function TextBox2$_valid_onEndEditing(value) {
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

            onKeyDown: function TextBox2$_valid_onKeyDown(value) {
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

            onKeyUp: function TextBox2$_valid_onKeyUp(value) {
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

            onTextChange: function TextBox2$_valid_onTextChange(value) {
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

            pattern: function TextBox2$_valid_pattern(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'string')) {
                    flag = true;
                }

                return flag;
            },

            placeholder: function TextBox2$_valid_placeholder(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'string')) {
                    flag = true;
                }

                return flag;
            },

            placeholderSkin: function TextBox2$_valid_placeholderSkin(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'object')
                || ($KU.is(value, 'string') && value.split(' ').length === 1)) {
                    flag = true;
                }

                return flag;
            },

            restrictCharactersSet: function TextBox2$_valid_restrictCharactersSet(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'string')) {
                    flag = true;
                }

                return flag;
            },

            secureTextEntry: function TextBox2$_valid_secureTextEntry(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'boolean')) {
                    flag = true;
                }

                return flag;
            },

            text: function TextBox2$_valid_text(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'string')) {
                    flag = true;
                }

                return flag;
            },

            textCopyable: function TextBox2$_valid_textCopyable(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'boolean')) {
                    flag = true;
                }

                return flag;
            },

            textInputMode: function TextBox2$_valid_textInputMode(value) {
                var options = [
                        constants.TEXTBOX_INPUT_MODE_ANY,
                        constants.TEXTBOX_INPUT_MODE_NUMERIC,
                        constants.TEXTBOX_INPUT_MODE_PASSWORD
                    ], flag = (options.indexOf(value) >= 0);

                return flag;
            },

            toolTip: function TextBox2$_valid_toolTip(value) {
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
        TextBox2: {
            autoCapitalize: function TextBox2$_view_autoCapitalize(el/* , old */) {
                var $K = voltmx.$kwebfw$, $KD = $K.dom, value = '';

                if(this.autoCapitalize === 'words') {
                    value = 'capitalize';
                } else if(this.autoCapitalize === 'characters') {
                    value = 'uppercase';
                }
                value && $KD.style(el.node, 'text-transform', value);
                $KD.setAttr(el.node, 'autocapitalize', this.autoCapitalize);
            },

            autoComplete: false,

            autoCorrect: function TextBox2$_view_autoCorrect(el/* , old */) {
                var $K = voltmx.$kwebfw$, $KD = $K.dom;

                $KD.setAttr(el.node, 'autocorrect', (this.autoCorrect ? 'on' : 'off'));
            },

            i18n_placeholder: false,

            i18n_text: false,

            i18n_toolTip: false,

            isSensitiveText: true,

            keyBoardStyle: function TextBox2$_view_keyBoardStyle(el/* , old */) {
                var $K = voltmx.$kwebfw$, $KD = $K.dom,
                    ks = this.keyBoardStyle, ipmode = '';

                if(ks === constants.TEXTBOX_KEY_BOARD_STYLE_CHAT) {
                    ipmode = 'text';
                } else {
                    ipmode = ks;
                }

                $KD.setAttr(el.node, 'inputmode', ipmode);
            },

            maxTextLength: function TextBox2$_view_maxTextLength(el/* , old */) {
                var $K = voltmx.$kwebfw$, $KD = $K.dom;

                if(this.maxTextLength === '') {
                    $KD.removeAttr(el.node, 'maxlength');
                } else {
                    $KD.setAttr(el.node, 'maxlength', this.maxTextLength);
                }
            },

            onBeginEditing: true,

            onDone: true,

            onEndEditing: true,

            onKeyDown: true,

            onKeyUp: true,

            onTextChange: true,

            pattern: function TextBox2$_view_pattern(el/* , old */) {
                var $K = voltmx.$kwebfw$, $KD = $K.dom;

                if(this.pattern) {
                    $KD.setAttr(el.node, 'pattern', this.pattern);
                } else {
                    $KD.removeAttr(el.node, 'pattern');
                }
            },

            placeholder: function TextBox2$_view_placeholder(el/* , old */) {
                var $K = voltmx.$kwebfw$, $KD = $K.dom;

                $KD.setAttr(el.node, 'placeholder', this.placeholder);
            },

            placeholderSkin: function TextBox2$_view_placeholderSkin(el/* , old */) {
                var $K = voltmx.$kwebfw$, $KD = $K.dom;
                $KD.setAttr(el.node, 'kplaceholderSkin', this.placeholderSkin);
            },

            restrictCharactersSet: true,

            secureTextEntry: function TextBox2$_view_secureTextEntry(el/* , old */) {
                _setInputType.call(this, el.node);
            },

            text: function TextBox2$_view_text(el/* , old */) {
                var $K = voltmx.$kwebfw$, $KD = $K.dom,
                    value = $KD.getAttr(el.node, 'value');

                //This if condition handles setting of same text to the node value onInput(onTextChange) event
                if(value !== this.text) {
                    $KD.setAttr(el.node, 'value', this.text);
                }
            },

            textCopyable: true,

            textInputMode: function TextBox2$_view_textInputMode(el/* , old */) {
                _setInputType.call(this, el.node);
            },

            toolTip: function TextBox2$_view_toolTip(el/* , old */) {
                var $K = voltmx.$kwebfw$, $KD = $K.dom;

                if(this.toolTip) {
                    $KD.setAttr(el.node, 'title', this.toolTip);
                } else {
                    $KD.removeAttr(el.node, 'title');
                }
            }
        }
    };


    Object.defineProperty(voltmx.ui, 'TextBox2', {configurable:false, enumerable:false, writable:false, value:(function() {
        var $K = voltmx.$kwebfw$;


        /**
         * voltmx.ui.TextBox2 constructor.
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
        var TextBox2 = function TextBox2(bconfig, lconfig, pspconfig) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils, self = this,
                dependentPropertiesValidationMessage = '', prop = null;

            if(!$KU.is(bconfig, 'object')) bconfig = {};

            if(!bconfig.isPreValidated) {
                prop = {
                    autoCapitalize: constants.TEXTBOX_AUTO_CAPITALIZE_NONE,
                    autoComplete: false,
                    autoCorrect: false,
                    i18n_placeholder: '',
                    i18n_text: '',
                    i18n_toolTip: '',
                    isSensitiveText: false,
                    keyBoardStyle: constants.TEXTBOX_KEY_BOARD_STYLE_DEFAULT,
                    maxTextLength: '',
                    onBeginEditing: null,
                    onDone: null,
                    onEndEditing: null,
                    onKeyDown: null,
                    onKeyUp: null,
                    onTextChange: null,
                    pattern: '',
                    placeholder: '',
                    placeholderSkin: '',
                    restrictCharactersSet: '',
                    secureTextEntry: false,
                    text: '',
                    textCopyable: true,
                    textInputMode: constants.TEXTBOX_INPUT_MODE_ANY,
                    toolTip: ''
                };
            }

            _populateUnderscore.TextBox2.call(this);

            if(!$KU.is(bconfig.id, 'string') || !bconfig.id) {
                bconfig.id = (this._kwebfw_.name + $KU.uid());
            }

            TextBox2.base.call(this, bconfig, lconfig, pspconfig);

            if(!bconfig.isPreValidated) {
                if($KU.is(_dependentPropertiesValidationMessage.TextBox2, 'function')) {
                    dependentPropertiesValidationMessage = _dependentPropertiesValidationMessage.TextBox2.call(this, prop, bconfig, lconfig, pspconfig);
                }
            }

            if(dependentPropertiesValidationMessage) {
                throw new Error(dependentPropertiesValidationMessage);
            } else {
                if(!bconfig.isPreValidated) {
                    //Defaulting to platfom values specific to TextBox2
                    $KU.each(prop, function(value, key) {
                        var $K = voltmx.$kwebfw$, $KU = $K.utils,
                            $KW = $K.widget, valid = false, message = '';

                        if(!Object.prototype.hasOwnProperty.call(bconfig, key)) {
                            bconfig[key] = value;
                        } else if($KW.getNonConstructorProperties(self._kwebfw_.name).indexOf(key) >= 0) {
                            throw new Error('<' + key + '> is a non-constructor property of <' + self._kwebfw_.ns + '> class.');
                        } else if(!$KU.is(_valid.TextBox2[key], 'function')) {
                            throw new Error('<' + key + '> is available in default widget properties of <voltmx.ui.TextBox2>, but not in <_valid.TextBox2> namespace.');
                        } else {
                            valid = _valid.TextBox2[key].call(self, bconfig[key]);
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

                //Defining Getters/Setters specific to TextBox2
                $KU.each(_view.TextBox2, function(value, key) {
                    var $K = voltmx.$kwebfw$, $KU = $K.utils;

                    $KU.defineProperty(self._kwebfw_.prop, key, bconfig[key], {configurable:false, enumerable:true, writable:true});

                    $KU.defineGetter(self, key, function TextBox2$_getter() {
                        var $K = voltmx.$kwebfw$, $KU = $K.utils;

                        if($KU.is(_getter.TextBox2[key], 'function')) {
                            return _getter.TextBox2[key].call(this, this._kwebfw_.prop[key]);
                        }
                        return this._kwebfw_.prop[key];
                    }, true);

                    $KU.defineSetter(self, key, function TextBox2$_setter(val) {
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
                                valid = _valid.TextBox2[key].call(this, val);
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

                                    if($KU.is(_setter.TextBox2[key], 'function')) {
                                        _setter.TextBox2[key].call(this, old);
                                    }

                                    if(_relayoutActiveTriggerer.TextBox2().indexOf(key) >= 0) {
                                        $KW.markRelayout(this);
                                    }

                                    if(_relayoutPassiveTriggerer.TextBox2().indexOf(key) >= 0) {
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

                if($KU.is(_postInitialization.TextBox2, 'function')) {
                    _postInitialization.TextBox2.call(this);
                }
            }

            pspconfig = lconfig = bconfig = null; //For GC
        };


        $K.utils.inherits(TextBox2, voltmx.ui.BasicWidget);


        /**
         * Builds the view layer for voltmx.ui.TextBox2 widget.
         *
         * @override
         * @access      protected
         * @method      _render
         * @memberof    voltmx.ui.TextBox2
         * @author      Goutam Sahu <goutam.sahu@voltmx.com>
         *
         * @returns     {HTMLElement} – TextBox2 view.
         */
        var textbox2__render = function TextBox2$_render(/* tag */) {
            var $super = voltmx.ui.TextBox2.base.prototype, ac = '',
                _ = this._kwebfw_, view = _.view, $K = voltmx.$kwebfw$,
                $KW = $K.widget, $KD = $K.dom, el = $KW.el(view);

            if(this.isVisible || $K.F.RIVW) {
                if(!view) {
                    view = $super._render.call(this, 'INPUT');
                    el = $KW.el(view);

                    $KD.setAttr(view, 'kwh-focusin', 'onFocusIn');
                    $KD.setAttr(view, 'kwh-focusout', 'onFocusOut');
                    $KD.setAttr(view, 'kwh-input', 'onInput');
                    $KD.setAttr(view, 'kwh-keydown', 'onKeyDown');
                    $KD.setAttr(view, 'kwh-keyup', 'onKeyUp');

                    if(this.autoComplete === true) {
                        ac = 'on';
                    } else if(this.autoComplete === false) {
                        ac = 'off';
                    } else {
                        ac = this.autoComplete;
                    }
                    $KD.setAttr(view, 'autocomplete', ac);

                    _setInputType.call(this, view);
                    _registerCutCopyPasteEvents.call(this, el);

                    _view.TextBox2.autoCapitalize.call(this, el, this.autoCapitalize);
                    _view.TextBox2.autoCorrect.call(this, el, this.autoCorrect);
                    _view.TextBox2.maxTextLength.call(this, el, this.maxTextLength);
                    _view.TextBox2.pattern.call(this, el, this.pattern);
                    _view.TextBox2.placeholderSkin.call(this, el, this.placeholderSkin);
                }

                _view.TextBox2.placeholder.call(this, el, this.placeholder);
                _view.TextBox2.text.call(this, el, this.text);
                _view.TextBox2.keyBoardStyle.call(this, el, this.keyBoardStyle);
                _view.TextBox2.toolTip.call(this, el, this.toolTip);

                $KW.accessibility(this);
            }

            return view;
        };


        var textbox2_getSelection = function TextBox2$getSelection() {
            var $K = voltmx.$kwebfw$, $KD = $K.dom, $KW = $K.widget,
                view = this._kwebfw_.view, selection = null;

            if($KW.isRendered(this)) {
                if(view === $KD.active()) {
                    selection = {
                        startIndex: view.selectionStart,
                        endIndex: view.selectionEnd
                    };
                } else {
                    selection = {startIndex:0, endIndex:0};
                }
            }

            return selection;
        };


        var textbox2_setFocus = function TextBox2$setFocus(value) {
            var $super = voltmx.ui.TextBox2.base.prototype, $K = voltmx.$kwebfw$,
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


        var textbox2_setSelection = function TextBox2$setSelection(startIndex, endIndex) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils, $KD = $K.dom,
                $KW = $K.widget, view = this._kwebfw_.view;

            if($KW.isRendered(this) && $KU.is(startIndex, 'integer')) {
                if(startIndex < 0) startIndex = 0;
                else if(startIndex > this.text.length) startIndex = this.text.length;

                if(!$KU.is(endIndex, 'integer')) endIndex = startIndex;
                else if(endIndex < 0) endIndex = 0;

                if(endIndex > startIndex) endIndex = startIndex;

                this.setFocus();
                $KD.focus(view);
                view.setSelectionRange(startIndex, endIndex);
            }
        };


        $K.defVoltmxProp(TextBox2.prototype, [
            {keey:'_render', value:textbox2__render},
            {keey:'getSelection', value:textbox2_getSelection},
            {keey:'setFocus', value:textbox2_setFocus},
            {keey:'setSelection', value:textbox2_setSelection}
        ]);


        return TextBox2;
    }())});
}());
