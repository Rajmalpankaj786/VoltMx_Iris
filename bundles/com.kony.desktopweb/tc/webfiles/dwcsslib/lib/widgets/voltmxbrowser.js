(function() {
    var $K = voltmx.$kwebfw$;

    $K.defVoltmxProp($K.ui, [
        {keey:'Browser', value:{}, items:[
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
        Browser: {
            requestURLConfig: function Browser$_getter_requestURLConfig(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils;

                return $KU.clone(value);
            }
        }
    };


    //This functions will be called in the scope of widget instance
    var _loadLocalFile = function Browser$_loadLocalFile(view) {
        var $K = voltmx.$kwebfw$, $KD = $K.dom, $KG = $K.globals,
            prop = this._kwebfw_.prop, url = '', iframe = null;

        url += $KG.platform + '/' + 'web/localfiles/' + prop.requestURLConfig.URL;
        iframe = $KD.create('IFRAME', {src:url});
        view.style.overflow = 'hidden';

        $KD.on(iframe, 'load', 'iload', function(/*e*/) {
            var $K = voltmx.$kwebfw$, $KW = $K.widget,
                $KD = $K.dom, script = null, text = '',
                browser = $KW.model($KD.parent(this));

            if(browser) {
                script = $KD.create('SCRIPT', {type:'text/javascript'});
                text = 'if(typeof(voltmx) == \'undefined\' || voltmx){voltmx={}; kony = voltmx};';
                text += 'var context = function(callback){';

                if(browser.enableNativeCommunication) {
                    text += 'var pdoc = parent.document,';
                    text += 'stag = pdoc.createElement(\'script\');';
                    text += 'stag.text=callback;';
                    text += 'pdoc.head.appendChild(stag);';
                } else {
                    text += 'throw (\'<enableNativeCommunciation> property';
                    text += ' of the browser widget is set to false.\\nPlease';
                    text += ' set to true before invoking voltmx.executeInNativeContext !\');';
                }

                script.text = (text + '};voltmx.evaluateJavaScriptInNativeContext=context;');
                this.contentDocument.head.appendChild(script);
            }
        });

        $KD.add(view, iframe);
    };


    //This functions will be called in the scope of widget instance
    var _openUrl = function Browser$_openUrl(url, data, name) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils,
            prop = this._kwebfw_.prop, args = [];

        if(url.indexOf('www.') === 0) {
            url = ('https://'+prop.requestURLConfig.URL);
        }

        $KU.each(data, function(value) {
            args.push((value[0]+'='+value[1]));
        });

        if(args.length) url = (url+'?'+args.join('&'));

        return window.open(url, name);
    };


    //All widget file must have this variable
    //This functions will be called in the scope of widget instance
    var _populateUnderscore = {
        Browser: function Browser$_populateUnderscore() {
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
                    $KU.defineProperty(_, 'ns', 'voltmx.ui.Browser', null);
                }
            }
            if(!_.name) {
                if($KU.is(this.__$kwebfw$name__, 'string') && this.__$kwebfw$name__) {
                    $KU.defineProperty(_, 'name', this.__$kwebfw$name__, null);
                } else {
                    $KU.defineProperty(_, 'name', 'Browser', null);
                }
            }
        }
    };


    //All widget file must have this variable
    //This function will be called in the scope of widget instance
    var _postInitialization = {};


    //All widget file must have this variable
    //This functions will be called in the scope of widget instance
    var _relayoutActiveTriggerer = {
        Browser: function Browser$_relayoutActiveTriggerer() {
            return [];
        }
    };


    //All widget file must have this variable
    //This functions will be called in the scope of widget instance
    var _relayoutPassiveTriggerer = {
        Browser: function Browser$_relayoutPassiveTriggerer() {
            return [];
        }
    };


    //All widget file must have this variable
    //All the functions will be called in the scope of widget instance
    var _setter = {
        Browser: {
            property: function Browser$_setter_property(/*old*/) {
                //
            }
        }
    };


    //All widget file must have this variable
    //All the functions will be called in the scope of widget instance
    //These function should always return a boolean value
    var _valid = {
        Browser: {
            enableNativeCommunication: function Browser$_valid_enableNativeCommunication(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'boolean')) {
                    flag = true;
                }

                return flag;
            },

            htmlString: function Browser$_valid_htmlString(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'string')) {
                    flag = true;
                }

                return flag;
            },

            requestURLConfig: function Browser$_valid_requestURLConfig(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'null')) {
                    flag = true;
                } else if($KU.is(value, 'object')
                && $KU.is(value.URL, 'string') && value.URL
                && (!Object.prototype.hasOwnProperty.call(value, 'requestMethod') || value.requestMethod === constants.BROWSER_REQUEST_METHOD_GET
                || value.requestMethod === constants.BROWSER_REQUEST_METHOD_POST)
                && (!Object.prototype.hasOwnProperty.call(value, 'requestData') || $KU.is(value.requestData, 'array'))) {
                    flag = true;

                    $KU.each(value.requestData, function(data) {
                        var $K = voltmx.$kwebfw$, $KU = $K.utils;

                        if(!($KU.is(data, 'array') && data.length === 2
                        && $KU.is(data[0], 'string') && data[0])) {
                            flag = false;
                            return true;
                        }
                    });
                }

                return flag;
            }
        }
    };


    //All widget file must have this variable
    //All the functions will be called in the scope of widget instance
    //Any property here, which is set to "false", will not create a setter
    var _view = {
        Browser: {
            enableNativeCommunication: false,

            htmlString: function Browser$_view_htmlString(el/*, old*/) {
                var $K = voltmx.$kwebfw$, $KD = $K.dom, prop = this._kwebfw_.prop;

                $KD.html(el.node, prop.htmlString);
            },

            requestURLConfig: function Browser$_view_requestURLConfig(el/*, old*/) {
                var $K = voltmx.$kwebfw$, $KD = $K.dom, prop = this._kwebfw_.prop, url='';

                $KD.html(el.node, '');

                if(prop.requestURLConfig && prop.requestURLConfig.URL) {
                    url = prop.requestURLConfig.URL.toLowerCase();

                    if(url.indexOf('http://') === 0
                    || url.indexOf('https://') === 0
                    || url.indexOf('www.') === 0) {
                        _openUrl.call(this, url, prop.requestURLConfig.requestData, this._kwebfw_.uid);
                    } else {
                        _loadLocalFile.call(this, el.node);
                    }
                }
            }
        }
    };


    Object.defineProperty(voltmx.ui, 'Browser', {configurable:false, enumerable:false, writable:false, value:(function() {
        var $K = voltmx.$kwebfw$;


        /**
         * voltmx.ui.Browser constructor.
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
        var Browser = function Browser(bconfig, lconfig, pspconfig) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils, self = this,
                dependentPropertiesValidationMessage = '', prop = null;

            if(!$KU.is(bconfig, 'object')) bconfig = {};

            if(!bconfig.isPreValidated) {
                prop = {
                    enableNativeCommunication: false,
                    htmlString: '',
                    requestURLConfig: null
                };
            }

            _populateUnderscore.Browser.call(this);

            if(!$KU.is(bconfig.id, 'string') || !bconfig.id) {
                bconfig.id = (this._kwebfw_.name + $KU.uid());
            }

            Browser.base.call(this, bconfig, lconfig, pspconfig);

            if(!bconfig.isPreValidated) {
                if($KU.is(_dependentPropertiesValidationMessage.Browser, 'function')) {
                    dependentPropertiesValidationMessage = _dependentPropertiesValidationMessage.Browser.call(this, prop, bconfig, lconfig, pspconfig);
                }
            }

            if(dependentPropertiesValidationMessage) {
                throw new Error(dependentPropertiesValidationMessage);
            } else {
                if(!bconfig.isPreValidated) {
                //Defaulting to platfom values specific to Browser
                    $KU.each(prop, function(value, key) {
                        var $K = voltmx.$kwebfw$, $KU = $K.utils,
                            $KW = $K.widget, valid = false, message = '';

                        if(!Object.prototype.hasOwnProperty.call(bconfig, key)) {
                            bconfig[key] = value;
                        } else if($KW.getNonConstructorProperties(self._kwebfw_.name).indexOf(key) >= 0) {
                            throw new Error('<' + key + '> is a non-constructor property of <' + self._kwebfw_.ns + '> class.');
                        } else if(!$KU.is(_valid.Browser[key], 'function')) {
                            throw new Error('<' + key + '> is available in default widget properties of <voltmx.ui.Browser>, but not in <_valid.Browser> namespace.');
                        } else {
                            valid = _valid.Browser[key].call(self, bconfig[key]);
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

                //Defining Getters/Setters specific to Browser
                $KU.each(_view.Browser, function(value, key) {
                    var $K = voltmx.$kwebfw$, $KU = $K.utils;

                    $KU.defineProperty(self._kwebfw_.prop, key, bconfig[key], {configurable:false, enumerable:true, writable:true});

                    $KU.defineGetter(self, key, function Browser$_getter() {
                        var $K = voltmx.$kwebfw$, $KU = $K.utils;

                        if($KU.is(_getter.Browser[key], 'function')) {
                            return _getter.Browser[key].call(this, this._kwebfw_.prop[key]);
                        }
                        return this._kwebfw_.prop[key];
                    }, true);

                    $KU.defineSetter(self, key, function Browser$_setter(val) {
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
                                valid = _valid.Browser[key].call(this, val);
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

                                    if($KU.is(_setter.Browser[key], 'function')) {
                                        _setter.Browser[key].call(this, old);
                                    }

                                    if(_relayoutActiveTriggerer.Browser().indexOf(key) >= 0) {
                                        $KW.markRelayout(this);
                                    }

                                    if(_relayoutPassiveTriggerer.Browser().indexOf(key) >= 0) {
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

                if($KU.is(_postInitialization.Browser, 'function')) {
                    _postInitialization.Browser.call(this);
                }
            }


            pspconfig = lconfig = bconfig = null; //For GC
        };


        $K.utils.inherits(Browser, voltmx.ui.BasicWidget);


        /**
         * Builds the view layer for voltmx.ui.Browser widget.
         *
         * @override
         * @access      protected
         * @method      _render
         * @memberof    voltmx.ui.Browser
         * @author      Goutam Sahu <goutam.sahu@voltmx.com>
         *
         * @returns     {HTMLElement} – Browser view.
         */
        var browser__render = function Browser$_render(tag) {
            var $super = voltmx.ui.Browser.base.prototype,
                _ = this._kwebfw_, view = _.view, prop = _.prop,
                $K = voltmx.$kwebfw$, $KW = $K.widget, el = null;

            if(this.isVisible || $K.F.RIVW) {
                if(!view) {
                    view = $super._render.call(this, tag);
                    el = $KW.el(view);

                    if(prop.htmlString) {
                        _view.Browser.htmlString.call(this, el, prop.htmlString);
                    } else if(prop.requestURLConfig) {
                        _view.Browser.requestURLConfig.call(this, el, prop.requestURLConfig);
                    }
                }

                $KW.accessibility(this);
            }

            return view;
        };


        //EvaluateJavaScript
        var browser_evaluateJavaScript = function Browser$evaluateJavaScript(jsScript) {
            var $K = voltmx.$kwebfw$, $KW = $K.widget, $KU = $K.utils,
                $KD = $K.dom, localIframe = $KW.el(this).iframe,
                iframeHead = null, appendHead = null, iframeScript = null;

            if(localIframe) {
                $KU.log('Executing javascript in ' + this.id + ' window handler');
                iframeHead = localIframe.contentDocument.head;
                if(iframeHead === null || iframeHead === undefined) {
                    appendHead = $KD.create('HEAD');
                    localIframe.contentDocument.appendChild(appendHead);
                }
                iframeScript = localIframe.contentDocument.createElement('script');
                iframeScript.text = jsScript;
                iframeHead.appendChild(iframeScript);
            }
        };


        var browser_evaluateJavaScriptAsync = function Browser$evaluateJavaScriptAsync() {
            return null;
        };


        var browser_goBack = function Browser$goBack() {
            var $K = voltmx.$kwebfw$, $KW = $K.widget, el = $KW.el(this);

            if(el.iframe) el.iframe.contentWindow.history.back();
        };


        var browser_goForward = function Browser$goForward() {
            var $K = voltmx.$kwebfw$, $KW = $K.widget, el = $KW.el(this);

            if(el.iframe) el.iframe.contentWindow.history.forward();
        };


        var browser_reload = function Browser$reload() {
            var $K = voltmx.$kwebfw$, $KW = $K.widget, el = $KW.el(this);

            if(el.iframe) el.iframe.contentWindow.location.reload(true);
        };


        $K.defVoltmxProp(Browser.prototype, [
            {keey:'_render', value:browser__render},
            {keey:'evaluateJavaScript', value:browser_evaluateJavaScript},
            {keey:'evaluateJavaScriptAsync', value:browser_evaluateJavaScriptAsync},
            {keey:'goBack', value:browser_goBack},
            {keey:'goForward', value:browser_goForward},
            {keey:'reload', value:browser_reload}
        ]);


        return Browser;
    }())});
}());
