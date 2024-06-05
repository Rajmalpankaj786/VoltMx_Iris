(function() {
    //All widget file must have this variable
    //All the functions will be called in the scope of widget instance
    var _dependentPropertiesValidationMessage = {};


    //All widget file must have this variable
    //All the functions will be called in the scope of widget instance
    var _getter = {
        FlexScrollContainer: {
            contentOffset: function FlexScrollContainer$_getter_contentOffset(value) {
                return {x:value.x, y:value.y};
            },

            contentOffsetMeasured: function FlexScrollContainer$_getter_contentOffsetMeasured(value) {
                var scroll = this._kwebfw_.ui.scroll;

                value.x = scroll.x;
                value.y = scroll.y;

                return {x:value.x, y:value.y};
            },

            contentSize: function FlexScrollContainer$_getter_contentSize(value) {
                return {width:value.width, height:value.height};
            },

            contentSizeMeasured: function FlexScrollContainer$_getter_contentSizeMeasured(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, el = null,
                    $KW = $K.widget, _ = this._kwebfw_, scroll = _.ui.scroll;

                if($KU.scrollType() === 'native') {
                    el = $KW.el(this);

                    scroll.width = el.viewport ? el.viewport.scrollWidth : -1;
                    scroll.height = el.viewport ? el.viewport.scrollHeight : -1;
                }

                value.width = scroll.width;
                value.height = scroll.height;

                return {width:value.width, height:value.height};
            },

            scrollingEvents: function FlexScrollContainer$_getter_scrollingEvents(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils,
                    scrollingEvents = value ? {} : null;

                $KU.each(value, function(val, key) {
                    scrollingEvents[key] = val;
                });

                return scrollingEvents;
            }
        }
    };


    //This function will be called in the scope of widget instance
    var _handleScrollBar = function FlexScrollContainer$_handleScrollBar() {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget,
            $KD = $K.dom, prop = this._kwebfw_.prop, el = $KW.el(this);

        if($KU.scrollType() === 'native') {
            if(!prop.enableScrolling || prop.scrollDirection === voltmx.flex.SCROLL_NONE) {
                $KD.style(el.node, {overflowX:'hidden', overflowY:'hidden'});
            } else { //Scrolling Enabled
                if(prop.scrollDirection === voltmx.flex.SCROLL_VERTICAL) {
                    $KD.style(el.node, {overflowX:'hidden', overflowY:'auto'});
                } else if(prop.scrollDirection === voltmx.flex.SCROLL_HORIZONTAL) {
                    $KD.style(el.node, {overflowX:'auto', overflowY:'hidden'});
                } else if(prop.scrollDirection === voltmx.flex.SCROLL_BOTH) {
                    $KD.style(el.node, {overflowX:'auto', overflowY:'auto'});
                }
            }
        } else { //Custom Scroll
            if(!prop.enableScrolling || prop.scrollDirection === voltmx.flex.SCROLL_NONE) {
                $KD.style(el.hScroll, 'visibility', 'hidden');
                $KD.style(el.vScroll, 'visibility', 'hidden');
            } else { //Scrolling Enabled
                if(prop.horizontalScrollIndicator) {
                    $KD.style(el.hScroll, 'visibility', null);
                } else {
                    $KD.style(el.hScroll, 'visibility', 'hidden');
                }

                if(prop.verticalScrollIndicator) {
                    $KD.style(el.vScroll, 'visibility', null);
                } else {
                    $KD.style(el.vScroll, 'visibility', 'hidden');
                }

                if(prop.horizontalScrollIndicator
                && prop.scrollDirection === voltmx.flex.SCROLL_VERTICAL) {
                    $KD.style(el.hScroll, 'visibility', 'hidden');
                } else if(prop.verticalScrollIndicator
                && prop.scrollDirection === voltmx.flex.SCROLL_HORIZONTAL) {
                    $KD.style(el.vScroll, 'visibility', 'hidden');
                }
            }
        }
    };


    //All widget file must have this variable
    //This functions will be called in the scope of widget instance
    var _populateUnderscore = {
        FlexScrollContainer: function FlexScrollContainer$_populateUnderscore() {
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
                    $KU.defineProperty(_, 'ns', 'voltmx.ui.FlexScrollContainer', true);
                }
            }
            if(!_.name) {
                if($KU.is(this.__$kwebfw$name__, 'string') && this.__$kwebfw$name__) {
                    $KU.defineProperty(_, 'name', this.__$kwebfw$name__, null);
                } else {
                    $KU.defineProperty(_, 'name', 'FlexScrollContainer', true);
                }
            }

            if(!_.ui) $KU.defineProperty(_, 'ui', {}, null);
            $KU.defineProperty(_.ui, 'scroll', {x:0, y:0, width:-1, height:-1, minX:-1, maxX:-1, minY:-1, maxY:-1, status:'ended'}, true);
        }
    };


    //All widget file must have this variable
    //This function will be called in the scope of widget instance
    var _postInitialization = {
        FlexScrollContainer: function FlexScrollContainer$_postInitialization() {
            var $K = voltmx.$kwebfw$, $KU = $K.utils, prop = this._kwebfw_.prop;

            if(!prop.clipBounds) prop.clipBounds = true;

            if($KU.is(prop.padding, 'null')) {
                prop.padding = [0, 0, 0, 0];
            }

            if($KU.is(prop.skin, 'null')) {
                prop.skin = 'slFSbox';
            }
        }
    };


    //All widget file must have this variable
    //This functions will be called in the scope of widget instance
    var _relayoutActiveTriggerer = {
        FlexScrollContainer: function FlexScrollContainer$_relayoutActiveTriggerer() {
            return [];
        }
    };


    //All widget file must have this variable
    //This functions will be called in the scope of widget instance
    var _relayoutPassiveTriggerer = {
        FlexScrollContainer: function FlexScrollContainer$_relayoutPassiveTriggerer() {
            return [];
        }
    };


    //All widget file must have this variable
    //All the functions will be called in the scope of widget instance
    var _setter = {
        FlexScrollContainer: {
            property: function FlexScrollContainer$_setter_property(/*old*/) {
                //
            }
        }
    };


    //All widget file must have this variable
    //All the functions will be called in the scope of widget instance
    //These function should always return a boolean value
    var _valid = {
        FlexScrollContainer: {
            allowHorizontalBounce: function FlexScrollContainer$_valid_allowHorizontalBounce(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'boolean')) {
                    flag = true;
                }

                return flag;
            },

            allowVerticalBounce: function FlexScrollContainer$_valid_allowVerticalBounce(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'boolean')) {
                    flag = true;
                }

                return flag;
            },

            animateIcons: function FlexScrollContainer$_valid_animateIcons(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'boolean')) {
                    flag = true;
                }

                return flag;
            },

            bounces: function FlexScrollContainer$_valid_bounces(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'boolean')) {
                    flag = true;
                }

                return flag;
            },

            contentOffset: function FlexScrollContainer$_valid_contentOffset(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'object')
                && $KU.is(value.x, 'size')
                && $KU.is(value.y, 'size')) {
                    flag = true;
                }

                return flag;
            },

            contentOffsetMeasured: function FlexScrollContainer$_valid_contentOffsetMeasured(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'object')
                && $KU.is(value.x, 'integer') && value.x >= 0
                && $KU.is(value.y, 'integer') && value.y >= 0) {
                    flag = true;
                }

                return flag;
            },

            contentSize: function FlexScrollContainer$_valid_contentSize(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'object')
                && $KU.is(value.width, 'string')
                && $KU.is(value.width, 'size')
                && $KU.is(value.height, 'string')
                && $KU.is(value.height, 'size')) {
                    flag = true;
                }

                return flag;
            },

            contentSizeMeasured: function FlexScrollContainer$_valid_contentSizeMeasured(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'object')
                && $KU.is(value.height, 'integer') && value.height >= 0
                && $KU.is(value.width, 'integer') && value.width >= 0) {
                    flag = true;
                }

                return flag;
            },

            enableOnScrollWidgetPositionForSubwidgets: function FlexScrollContainer$_valid_enableOnScrollWidgetPositionForSubwidgets(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'boolean')) {
                    flag = true;
                }

                return flag;
            },

            enableScrolling: function FlexScrollContainer$_valid_enableScrolling(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'boolean')) {
                    flag = true;
                }

                return flag;
            },

            horizontalScrollIndicator: function FlexScrollContainer$_valid_horizontalScrollIndicator(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'boolean')) {
                    flag = true;
                }

                return flag;
            },

            onScrollStart: function FlexScrollContainer$_valid_onScrollStart(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'function')
                || $KU.is(value, 'null')) {
                    flag = true;
                }

                return flag;
            },

            onScrollTouchReleased: function FlexScrollContainer$_valid_onScrollTouchReleased(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'function')
                || $KU.is(value, 'null')) {
                    flag = true;
                }

                return flag;
            },

            onScrolling: function FlexScrollContainer$_valid_onScrolling(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'function')
                || $KU.is(value, 'null')) {
                    flag = true;
                }

                return flag;
            },

            onDecelerationStarted: function FlexScrollContainer$_valid_onDecelerationStarted(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'function')
                || $KU.is(value, 'null')) {
                    flag = true;
                }

                return flag;
            },

            onScrollEnd: function FlexScrollContainer$_valid_onScrollEnd(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'function')
                || $KU.is(value, 'null')) {
                    flag = true;
                }

                return flag;
            },

            pullToRefreshI18NKey: function FlexScrollContainer$_valid_pullToRefreshI18NKey(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'string')) {
                    flag = true;
                }

                return flag;
            },

            pullToRefreshIcon: function FlexScrollContainer$_valid_pullToRefreshIcon(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'string')) {
                    flag = true;
                }

                return flag;
            },

            pullToRefreshSkin: function FlexScrollContainer$_valid_pullToRefreshSkin(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'object')
                || ($KU.is(value, 'string') && value.split(' ').length === 1)) {
                    flag = true;
                }

                return flag;
            },

            pushToRefreshI18NKey: function FlexScrollContainer$_valid_pushToRefreshI18NKey(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'string')) {
                    flag = true;
                }

                return flag;
            },

            pushToRefreshIcon: function FlexScrollContainer$_valid_pushToRefreshIcon(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'string')) {
                    flag = true;
                }

                return flag;
            },

            pushToRefreshSkin: function FlexScrollContainer$_valid_pushToRefreshSkin(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'object')
                || ($KU.is(value, 'string') && value.split(' ').length === 1)) {
                    flag = true;
                }

                return flag;
            },

            releaseToPullRefreshI18NKey: function FlexScrollContainer$_valid_releaseToPullRefreshI18NKey(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'string')) {
                    flag = true;
                }

                return flag;
            },

            releaseToPushRefreshI18NKey: function FlexScrollContainer$_valid_releaseToPushRefreshI18NKey(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'string')) {
                    flag = true;
                }

                return flag;
            },

            retainScrollPosition: function FlexScrollContainer$_valid_retainScrollPosition(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'boolean')) {
                    flag = true;
                }

                return flag;
            },

            scrollDirection: function FlexScrollContainer$_valid_scrollDirection(value) {
                var flag = false, options = [
                    voltmx.flex.SCROLL_BOTH,
                    voltmx.flex.SCROLL_HORIZONTAL,
                    voltmx.flex.SCROLL_NONE,
                    voltmx.flex.SCROLL_VERTICAL
                ];

                if(options.indexOf(value) >= 0) {
                    flag = true;
                }

                return flag;
            },

            scrollingEvents: function FlexScrollContainer$_valid_scrollingEvents(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false, subflag = true,
                    names = ['onPush', 'onPull', 'onReachingBegining', 'onReachingEnd'];

                if($KU.is(value, 'null')) {
                    flag = true;
                } else if($KU.is(value, 'object')) {
                    flag = true;

                    $KU.each(names, function(name) {
                        var $K = voltmx.$kwebfw$, $KU = $K.utils;

                        if(Object.prototype.hasOwnProperty.call(value, name)
                        && !$KU.is(value[name], 'function')) {
                            subflag = false;
                            return true;
                        }
                    });
                }

                return (flag && subflag);
            },

            verticalScrollIndicator: function FlexScrollContainer$_valid_verticalScrollIndicator(value) {
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
        FlexScrollContainer: {
            allowHorizontalBounce: true,

            allowVerticalBounce: true,

            animateIcons: true,

            bounces: true,

            contentOffset: function FlexScrollContainer$_view_contentOffset(/*el, old*/) {
                this.setContentOffset(this.contentOffset, true);
            },

            contentOffsetMeasured: false,

            contentSize: function FlexScrollContainer$_view_contentSize(/*el, old*/) {},

            contentSizeMeasured: false,

            enableOnScrollWidgetPositionForSubwidgets: true,

            enableScrolling: function FlexScrollContainer$_view_enableScrolling(/*el, old*/) {
                _handleScrollBar.call(this);
            },

            horizontalScrollIndicator: function FlexScrollContainer$_view_horizontalScrollIndicator(/*el, old*/) {
                _handleScrollBar.call(this);
            },

            onScrollStart: true,

            onScrollTouchReleased: true,

            onScrolling: true,

            onDecelerationStarted: true,

            onScrollEnd: true,

            pullToRefreshI18NKey: true,

            pullToRefreshIcon: true,

            pullToRefreshSkin: true,

            pushToRefreshI18NKey: true,

            pushToRefreshIcon: true,

            pushToRefreshSkin: true,

            releaseToPullRefreshI18NKey: true,

            releaseToPushRefreshI18NKey: true,

            retainScrollPosition: true,

            scrollDirection: function FlexScrollContainer$_view_scrollDirection(/*el, old*/) {
                _handleScrollBar.call(this);
            },

            scrollingEvents: true,

            verticalScrollIndicator: function FlexScrollContainer$_view_verticalScrollIndicator(/*el, old*/) {
                _handleScrollBar.call(this);
            }
        }
    };


    Object.defineProperty(voltmx.ui, 'FlexScrollContainer', {configurable:false, enumerable:false, writable:false, value:(function() {
        var $K = voltmx.$kwebfw$;


        /**
         * voltmx.ui.FlexScrollContainer constructor.
         *
         * @class
         * @namespace   voltmx.ui
         * @extends     voltmx.ui.FlexContainer
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
        var FlexScrollContainer = function FlexScrollContainer(bconfig, lconfig, pspconfig) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils, self = this,
                dependentPropertiesValidationMessage = '', prop = null, p = null;

            if(!$KU.is(bconfig, 'object')) bconfig = {};

            if(!bconfig.isPreValidated) {
                prop = {
                    allowHorizontalBounce: true, //The "bounces" property takes precedence over this property.
                    allowVerticalBounce: true, //The "bounces" property takes precedence over this property.
                    animateIcons: true,
                    bounces: true,
                    contentOffset: {x: '0dp', y: '0dp'},
                    contentSize: {width: '100%', height: '100%'},
                    contentOffsetMeasured: {x: 0, y: 0}, //Must be in dp unit
                    contentSizeMeasured: {height: 0, width: 0}, //Must be in dp unit
                    enableOnScrollWidgetPositionForSubwidgets: false,
                    enableScrolling: true,
                    horizontalScrollIndicator: true,
                    onScrollStart: null,
                    onScrollTouchReleased: null,
                    onScrolling: null,
                    onDecelerationStarted: null,
                    onScrollEnd: null,
                    pullToRefreshI18NKey: '',
                    pullToRefreshIcon: '',
                    pullToRefreshSkin: '',
                    pushToRefreshI18NKey: '',
                    pushToRefreshIcon: '',
                    pushToRefreshSkin: '',
                    releaseToPullRefreshI18NKey: '',
                    releaseToPushRefreshI18NKey: '',
                    retainScrollPosition: false,
                    scrollDirection: voltmx.flex.SCROLL_HORIZONTAL,
                    scrollingEvents: null,
                    verticalScrollIndicator: true
                };
            }

            _populateUnderscore.FlexScrollContainer.call(this);

            if(!$KU.is(bconfig.id, 'string') || !bconfig.id) {
                bconfig.id = (this._kwebfw_.name + $KU.uid());
            }

            FlexScrollContainer.base.call(this, bconfig, lconfig, pspconfig);

            if(!bconfig.isPreValidated) {
                if($KU.is(_dependentPropertiesValidationMessage.FlexScrollContainer, 'function')) {
                    dependentPropertiesValidationMessage = _dependentPropertiesValidationMessage.FlexScrollContainer.call(this, prop, bconfig, lconfig, pspconfig);
                }
            }

            if(dependentPropertiesValidationMessage) {
                throw new Error(dependentPropertiesValidationMessage);
            } else {
                if(!bconfig.isPreValidated) {
                    //Defaulting to platfom values specific to FlexScrollContainer
                    $KU.each(prop, function(value, key) {
                        var $K = voltmx.$kwebfw$, $KU = $K.utils,
                            $KW = $K.widget, valid = false, message = '';

                        if(!Object.prototype.hasOwnProperty.call(bconfig, key)) {
                            bconfig[key] = value;
                        } else if($KW.getNonConstructorProperties(self._kwebfw_.name).indexOf(key) >= 0) {
                            throw new Error('<' + key + '> is a non-constructor property of <' + self._kwebfw_.ns + '> class.');
                        } else if(!$KU.is(_valid.FlexScrollContainer[key], 'function')) {
                            throw new Error('<' + key + '> is available in default widget properties of <voltmx.ui.FlexScrollContainer>, but not in <_valid.FlexScrollContainer> namespace.');
                        } else {
                            valid = _valid.FlexScrollContainer[key].call(self, bconfig[key]);
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

                //Defining Getters/Setters specific to FlexScrollContainer
                $KU.each(_view.FlexScrollContainer, function(value, key) {
                    var $K = voltmx.$kwebfw$, $KU = $K.utils;

                    $KU.defineProperty(self._kwebfw_.prop, key, bconfig[key], {configurable:false, enumerable:true, writable:true});

                    $KU.defineGetter(self, key, function FlexScrollContainer$_getter() {
                        var $K = voltmx.$kwebfw$, $KU = $K.utils;

                        if($KU.is(_getter.FlexScrollContainer[key], 'function')) {
                            return _getter.FlexScrollContainer[key].call(this, this._kwebfw_.prop[key]);
                        }
                        return this._kwebfw_.prop[key];
                    }, true);

                    $KU.defineSetter(self, key, function FlexScrollContainer$_setter(val) {
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
                                valid = _valid.FlexScrollContainer[key].call(this, val);
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

                                    if($KU.is(_setter.FlexScrollContainer[key], 'function')) {
                                        _setter.FlexScrollContainer[key].call(this, old);
                                    }

                                    if(_relayoutActiveTriggerer.FlexScrollContainer().indexOf(key) >= 0) {
                                        $KW.markRelayout(this);
                                    }

                                    if(_relayoutPassiveTriggerer.FlexScrollContainer().indexOf(key) >= 0) {
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

                    p.contentOffsetMeasured = {x: 0, y: 0};
                    p.contentSizeMeasured= {height: 0, width: 0};
                }

                if($KU.is(_postInitialization.FlexScrollContainer, 'function')) {
                    _postInitialization.FlexScrollContainer.call(this);
                }
            }

            pspconfig = lconfig = bconfig = null; //For GC
        };


        $K.utils.inherits(FlexScrollContainer, voltmx.ui.FlexContainer);


        /**
         * Takes care of flushing out the widget reference to clean memory.
         *
         * @override
         * @access      protected
         * @method      _flush
         * @memberof    voltmx.ui.FlexScrollContainer
         * @author      Goutam Sahu <goutam.sahu@voltmx.com>
         *
         * @returns     void
         */
        var flexscrollcontainer__flush = function FlexScrollContainer$_flush(config) {
            var $super = voltmx.ui.FlexScrollContainer.base.prototype,
                $K = voltmx.$kwebfw$, $KW = $K.widget, $KD = $K.dom, el = $KW.el(this);

            el.viewport && $KD.off(el.viewport); //Remove all event listeners to avoid memory leaks
            $super._flush.call(this, config);
        };


        var flexscrollcontainer__render = function FlexScrollContainer$_render(tag) {
            var $super = voltmx.ui.FlexScrollContainer.base.prototype,
                scrolee = null, _ = this._kwebfw_, view = _.view,
                $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget,
                $KD = $K.dom, hScroll = null, vScroll = null, el = $KW.el(view);

            if(this.isVisible || $K.F.RIVW) {
                if(!view) {
                    if($KU.scrollType() === 'native') {
                        view = $super._render.call(this, tag);
                    } else {
                        scrolee = $KD.create('DIV', {kr:'scrolee'});
                        hScroll = $KD.create('DIV', {kr:'h-scroll'});
                        vScroll = $KD.create('DIV', {kr:'v-scroll'});
                        view = $super._render.call(this, tag, [scrolee, hScroll, vScroll]);
                    }

                    _handleScrollBar.call(this);
                    $KW.registerNativeScrollEvent(this);

                    el = $KW.el(view);
                }

                $KW.accessibility(this);

                $KU.each($KW.children(this), function(cmodel/*, index*/) {
                    if(cmodel.isVisible || $K.F.RIVW) {
                        $KW.addToView((el.scrolee || view), cmodel._render());
                    }
                });
            }

            return view;
        };


        var flexscrollcontainer_setZoomScale = function FlexScrollContainer$setZoomScale() {
            var $K = voltmx.$kwebfw$, $KU = $K.utils;

            $KU.unsupportedAPI('voltmx.ui.FlexScrollContainer.setZoomScale');
        };


        $K.defVoltmxProp(FlexScrollContainer.prototype, [
            {keey:'_flush', value:flexscrollcontainer__flush},
            {keey:'_render', value:flexscrollcontainer__render},
            {keey:'setZoomScale', value:flexscrollcontainer_setZoomScale}
        ]);


        return FlexScrollContainer;
    }())});
}());
