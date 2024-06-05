(function() {
    //This function must be called in the scope of widget instance
    var _deduceTagName = function FlexContainer$_deduceTagName(tag) {
        var a11y = this._kwebfw_.prop.accessibilityConfig;

        tag = (a11y && a11y.tagName) ? a11y.tagName.toLowerCase() : 'div';

        return tag;
    };


    //All widget file must have this variable
    //All the functions will be called in the scope of widget instance
    var _dependentPropertiesValidationMessage = {};


    //All widget file must have this variable
    //All the functions will be called in the scope of widget instance
    var _getter = {
        FlexContainer: {
            //
        }
    };


    //All widget file must have this variable
    //This functions will be called in the scope of widget instance
    var _populateUnderscore = {
        FlexContainer: function FlexContainer$_populateUnderscore() {
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
                    $KU.defineProperty(_, 'ns', 'voltmx.ui.FlexContainer', true);
                }
            }
            if(!_.name) {
                if($KU.is(this.__$kwebfw$name__, 'string') && this.__$kwebfw$name__) {
                    $KU.defineProperty(_, 'name', this.__$kwebfw$name__, null);
                } else {
                    $KU.defineProperty(_, 'name', 'FlexContainer', true);
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
        FlexContainer: function FlexContainer$_relayoutActiveTriggerer() {
            return [];
        }
    };


    //All widget file must have this variable
    //This functions will be called in the scope of widget instance
    var _relayoutPassiveTriggerer = {
        FlexContainer: function FlexContainer$_relayoutPassiveTriggerer() {
            return [];
        }
    };


    //All widget file must have this variable
    //All the functions will be called in the scope of widget instance
    var _setter = {
        FlexContainer: {
            clipBounds: function FlexContainer$_setter_clipBounds(/*old*/) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, prop = this._kwebfw_.prop;

                if($KU.is(this, 'widget', 'FlexScrollContainer')) {
                    prop.enableScrolling = !prop.enableScrolling;
                    this.enableScrolling = !prop.enableScrolling;
                }
            }
        }
    };


    //All widget file must have this variable
    //All the functions will be called in the scope of widget instance
    //These function should always return a boolean value
    var _valid = {
        FlexContainer: {
            clipBounds: function FlexContainer$_valid_clipBounds(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'boolean')) {
                    flag = true;
                }

                return flag;
            },

            isMaster: function FlexContainer$_valid_isMaster(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'boolean')) {
                    flag = true;
                }

                return flag;
            },

            isModalContainer: function FlexContainer$_valid_isModalContainer(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'boolean')) {
                    flag = true;
                }

                return flag;
            },

            masterType: function FlexContainer$_valid_masterType(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if(value === constants.MASTER_TYPE_DEFAULT
                || value === constants.MASTER_TYPE_USERWIDGET
                || $KU.is(value, 'null')) {
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
        FlexContainer: {
            clipBounds: function FlexContainer$_view_clipBounds(el/*, old*/) {
                var $K = voltmx.$kwebfw$, $KW = $K.widget, $KD = $K.dom;

                if($KW.name(this) === 'FlexContainer') {
                    if(this.clipBounds) {
                        $KD.style(el.node, {overflowX:'hidden', overflowY:'hidden'});
                    } else {
                        $KD.style(el.node, {overflowX:'visible', overflowY:'visible'});
                    }
                }
            },

            isMaster: false,

            isModalContainer: function FlexContainer$_view_isModalContainer(/*el, old*/) {
                var $K = voltmx.$kwebfw$, $KW = $K.widget, $KA = $K.app,
                    fmodel = $KW.fmodel(this), modal = null, deduce = false;

                if(fmodel && fmodel === $KW.model($KA.currentFormUID)) {
                    modal = fmodel._kwebfw_.modalContainer;

                    if(this.isModalContainer) {
                        if(!modal) { //Then, "this" will be the only possible modalContainer
                            $KW.updateModalContainer(fmodel, this);
                        } else if($KW.contains(modal, this, false)) {
                            $KW.updateModalContainer(fmodel, this);
                        } else if($KW.pmodel(this) === $KW.pmodel(modal)
                        && this.zIndex > modal.zIndex) {
                            deduce = true;
                        } else if(!$KW.contains(this, modal, false)) {
                            deduce = true;
                        }
                    } else if(this === modal) {
                        deduce = true;
                    }

                    if(deduce) {
                        modal = $KW.deduceModalContainer(fmodel);
                        $KW.updateModalContainer(fmodel, modal);
                    }
                }
            },

            masterType: false
        }
    };


    Object.defineProperty(voltmx.ui, 'FlexContainer', {configurable:false, enumerable:false, writable:false, value:(function() {
        var $K = voltmx.$kwebfw$;


        /**
         * voltmx.ui.FlexContainer constructor.
         *
         * @class
         * @namespace   voltmx.ui
         * @extends     voltmx.ui.ContainerWidget
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
        var FlexContainer = function FlexContainer(bconfig, lconfig, pspconfig) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils, self = this,
                dependentPropertiesValidationMessage = '', prop = null;

            if(!$KU.is(bconfig, 'object')) bconfig = {};

            if(!bconfig.isPreValidated) {
                prop = {
                    clipBounds: true,
                    isMaster: false,
                    isModalContainer: false,
                    masterType: null
                };
            }

            _populateUnderscore.FlexContainer.call(this);

            if(!$KU.is(bconfig.id, 'string') || !bconfig.id) {
                bconfig.id = (this._kwebfw_.name+$KU.uid());
            }

            FlexContainer.base.call(this, bconfig, lconfig, pspconfig);

            if(!bconfig.isPreValidated) {
                if($KU.is(_dependentPropertiesValidationMessage.FlexContainer, 'function')) {
                    dependentPropertiesValidationMessage = _dependentPropertiesValidationMessage.FlexContainer.call(this, prop, bconfig, lconfig, pspconfig);
                }
            }

            if(dependentPropertiesValidationMessage) {
                throw new Error(dependentPropertiesValidationMessage);
            } else {
                if(!bconfig.isPreValidated) {
                //Defaulting to platfom values specific to FlexContainer
                    $KU.each(prop, function(value, key) {
                        var $K = voltmx.$kwebfw$, $KU = $K.utils,
                            $KW = $K.widget, valid = false, message = '';

                        if(!Object.prototype.hasOwnProperty.call(bconfig, key)) {
                            bconfig[key] = value;
                        } else if($KW.getNonConstructorProperties(self._kwebfw_.name).indexOf(key) >= 0) {
                            throw new Error('<'+key+'> is a non-constructor property of <'+self._kwebfw_.ns+'> class.');
                        } else if(!$KU.is(_valid.FlexContainer[key], 'function')) {
                            throw new Error('<'+key+'> is available in default widget properties of <voltmx.ui.FlexContainer>, but not in <_valid.FlexContainer> namespace.');
                        } else {
                            valid = _valid.FlexContainer[key].call(self, bconfig[key]);
                            if($KU.is(valid, 'array')) {
                                bconfig[key] = valid[0]; valid = valid[1];
                            }

                            if(valid === false || ($KU.is(valid, 'string') && valid)) {
                                message = ('Invalid value passed to property <'+key+'> of widget <'+self._kwebfw_.ns+'>.');

                                if($KU.is(valid, 'string')) {
                                    message += ('\n' + valid);
                                }

                                throw new Error(message);
                            }
                        }
                    });
                }

                //Defining Getters/Setters specific to FlexContainer
                $KU.each(_view.FlexContainer, function(value, key) {
                    var $K = voltmx.$kwebfw$, $KU = $K.utils;

                    $KU.defineProperty(self._kwebfw_.prop, key, bconfig[key], {configurable:false, enumerable:true, writable:true});

                    $KU.defineGetter(self, key, function FlexContainer$_getter() {
                        var $K = voltmx.$kwebfw$, $KU = $K.utils;

                        if($KU.is(_getter.FlexContainer[key], 'function')) {
                            return _getter.FlexContainer[key].call(this, this._kwebfw_.prop[key]);
                        }
                        return this._kwebfw_.prop[key];
                    }, true);

                    $KU.defineSetter(self, key, function FlexContainer$_setter(val) {
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
                                valid = _valid.FlexContainer[key].call(this, val);
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

                                    if($KU.is(_setter.FlexContainer[key], 'function')) {
                                        _setter.FlexContainer[key].call(this, old);
                                    }

                                    if(_relayoutActiveTriggerer.FlexContainer().indexOf(key) >= 0) {
                                        $KW.markRelayout(this);
                                    }

                                    if(_relayoutPassiveTriggerer.FlexContainer().indexOf(key) >= 0) {
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

                if($KU.is(_postInitialization.FlexContainer, 'function')) {
                    _postInitialization.FlexContainer.call(this);
                }
            }

            pspconfig = lconfig = bconfig = null; //For GC
        };


        $K.utils.inherits(FlexContainer, voltmx.ui.ContainerWidget);


        /**
         * Builds the view layer for voltmx.ui.FlexContainer widget.
         *
         * @override
         * @access      protected
         * @method      _render
         * @memberof    voltmx.ui.FlexContainer
         * @author      Goutam Sahu <goutam.sahu@voltmx.com>
         *
         * @returns     {HTMLElement} – FlexContainer view.
         */
        var flexcontainer__render = function FlexContainer$_render(tag, children) {
            var $super = voltmx.ui.FlexContainer.base.prototype,
                _ = this._kwebfw_, $K = voltmx.$kwebfw$, $KU = $K.utils,
                $KW = $K.widget, view = _.view, el = $KW.el(view);

            if(this.isVisible || $K.F.RIVW) {
                if(!view) {
                    view = $super._render.call(this, _deduceTagName.call(this, tag), children);

                    el = $KW.el(view);

                    _view.FlexContainer.clipBounds.call(this, el, this.clipBounds);
                }

                $KW.accessibility(this);

                $KU.each($KW.children(this), function(cmodel/*, index*/) {
                    if(cmodel.isVisible || $K.F.RIVW) {
                        $KW.addToView(view, cmodel._render());
                    }
                });
            }

            return view;
        };


        $K.defVoltmxProp(FlexContainer.prototype, [
            {keey:'_render', value:flexcontainer__render}
        ]);


        return FlexContainer;
    }())});
}());
