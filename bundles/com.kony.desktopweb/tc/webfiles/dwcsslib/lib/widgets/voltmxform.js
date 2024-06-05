(function() {
    var $K = voltmx.$kwebfw$, _navigated = false;

    Object.defineProperty(voltmx.$kwebfw$.flag, 'navigated', {
        enumerable:false, configurable:true,
        get:function() {
            return _navigated;
        }
    });
    Object.defineProperty(voltmx.$kwebfw$.flag, 'navigated', {
        enumerable:false, configurable:false, set:function(/*val*/) {}
    });


    $K.defVoltmxProp($K.ui, [
        {keey:'Form2', value:{}, items:[
            {keey:'onOrientation', value:function(/*evt*/) {
                var $K = voltmx.$kwebfw$, $KD = $K.dom, device = $K.device;

                device.height = $KD.body().offsetHeight;
                device.width = $KD.body().offsetWidth;

                this.forceLayout(true);
            }},

            {keey:'onResize', value:function(/*evt*/) {
                var $K = voltmx.$kwebfw$, $KW = $K.widget,
                    $KD = $K.dom, device = $K.device, height = -1, width = -1;

                height = $KD.body().offsetHeight;
                width = $KD.body().offsetWidth;
                //* DONOT DELETE:: This block or below block
                device.height = height;
                device.width = width;
                //*/
                /* DONOT DELETE:: This block or above block
                if(height !== device.height && width !== device.width) {
                    //Orientation might have changed
                    //TODO:: We need a better condition
                    device.height = height;
                    device.width = width;
                //} else if(width === device.width && height !== device.height) {
                    //Keyboard might have opened or something else
                    //We can even check if document.activeElement is...
                    //...textbox(not button or submit)/textarea/contentEditable
                }
                //*/

                if($K.behavior.responsive === true) {
                    if(_hasBreakpointChanged.call(this, device.width)) {
                        //Framework should do something for ResponsiveLayout

                        __relayoutResponsiveContainers(this);
                        $KW.invokeLifeCycleEvent(this, 'onBreakpointHandler', true);
                        $KW.invokeLifeCycleEvent(this, 'onBreakpointChange', true);
                    }

                    $KW.fire(this, 'onResize', this);
                }
                this.forceLayout(true);
            }}
        ]}
    ]);


    var _deduceAnimationDetails = function(current, previous) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils,
            anim = {}, effect = null, inTrans = current.inTransitionConfig,
            outTrans = previous.outTransitionConfig, inAnim = -1, outAnim = -1,
            formIn = {
                'topCenter': 'slidetopin',
                'bottomCenter': 'slidebottomin',
                'rightCenter': 'sliderightin',
                'leftCenter': 'slideleftin',
                'fadeAnimation': 'fadein',
                'anim1': 'slidetopin',
                'anim2': 'sliderightin',
                'anim3': 'slideleftin',
                'anim4': 'sliderightin',
                'anim5': 'slideleftin',
                'anim6': 'scalein',
                'anim7': 'slidetoprightin',
                'anim8': 'slidebottomleftin',
                'anim9': 'expandvertically',
                'anim10': 'slidebottomin'
            }, formOut = {
                'rightCenter': 'sliderightout',
                'leftCenter': 'slideleftout',
                'topCenter': 'slidetopout',
                'bottomCenter': 'slidebottomout',
                'fadeAnimation': 'fadeout',
                'anim1': 'slidetopout',
                'anim2': 'sliderightout',
                'anim3': 'slideleftout',
                'anim4': 'sliderightout',
                'anim5': 'slideleftout',
                'anim6': 'scaleout',
                'anim7': 'slidetoprightout',
                'anim8': 'slidebottomleftout',
                'anim9': 'shrinkvertically',
                'anim10': 'slidebottomout'
            };

        if(inTrans && ($KU.is(inTrans.formAnimation, 'number')
        || $KU.is(inTrans.formanimation, 'number'))) {
            inAnim = ($KU.is(inTrans.formAnimation, 'number') ? inTrans.formAnimation : inTrans.formanimation);
            if(inAnim > 0) {
                anim = {in:{effect:formIn[('anim'+inAnim.toString())], duration:'0.5s'}};
            }

            if(outTrans && ($KU.is(outTrans.formAnimation, 'number')
            || $KU.is(outTrans.formanimation, 'number'))) {
                outAnim = ($KU.is(outTrans.formAnimation, 'number') ? outTrans.formAnimation : outTrans.formanimation);
                if(outAnim > 0) {
                    anim.out = {effect:formOut[('anim'+outAnim.toString())], duration:'0.5s'};
                }
            }
        } else {
            if(inTrans) {
                effect = inTrans.formTransition || inTrans.formtransition;

                if(effect && effect !== 'none') {
                    anim.in = {effect:formIn[effect], duration:'0.5s'};
                }
            }
            if(outTrans) {
                effect = outTrans.formTransition || outTrans.formtransition;

                if(effect && effect !== 'none') {
                    anim.out = {effect:formOut[effect], duration:'0.5s'};
                }
            }
        }

        return anim;
    };


    //All widget file must have this variable
    //All the functions will be called in the scope of widget instance
    var _dependentPropertiesValidationMessage = {};


    //This function will be called in the scope of widget instance
    var _getCurrentBreakpoint = function Form2$_getCurrentBreakpoint(width) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils,
            breakpoints = this._kwebfw_.prop.breakpoints, bp = -1;

        if($K.behavior.responsive === true) {
            if(!($KU.is(breakpoints, 'array') && breakpoints.length > 0)) {
                breakpoints = $K.behavior.breakpoints;

                if(!($KU.is(breakpoints, 'array') && breakpoints.length > 0)) {
                    breakpoints = null;
                }
            }

            if($KU.is(breakpoints, 'array') && breakpoints.length > 0) {
                if(width > breakpoints[(breakpoints.length - 1)]) {
                    bp = constants.BREAKPOINT_MAX_VALUE;
                } else if(width <= breakpoints[0]) {
                    bp = breakpoints[0];
                } else {
                    $KU.each(breakpoints, function(breakpoint) {
                        if(width <= breakpoint) {
                            bp = breakpoint;
                            return true;
                        }
                    });
                }
            }
        }

        return bp;
    };


    var __relayoutResponsiveContainers = function(formModel) {
        var $K = voltmx.$kwebfw$, $KW = $K.widget;

        $KW.iterate(formModel, function(widget) {
            if(widget._kwebfw_.is.component) {
                widget = $KW.proxy(widget);
            }

            if(widget.layoutType === voltmx.flex.RESPONSIVE_GRID
            || (widget.parent && widget.parent.layoutType === voltmx.flex.RESPONSIVE_GRID)) {
                $KW.markRelayout(widget);
            }
        });
    };


    //All widget file must have this variable
    //All the functions will be called in the scope of widget instance
    var _getter = {
        Form2: {
            breakpoints: function Form2$_getter_breakpoints(value) {
                return value.slice(0);
            },

            contentOffset: function Form2$_getter_contentOffset(value) {
                return {x:value.x, y:value.y};
            },

            contentOffsetMeasured: function Form2$_getter_contentOffsetMeasured(value) {
                var scroll = this._kwebfw_.ui.scroll;

                value.x = scroll.x;
                value.y = scroll.y;

                return {x:value.x, y:value.y};
            },

            contentSize: function Form2$_getter_contentSize(value) {
                return {width:value.width, height:value.height};
            },

            contentSizeMeasured: function Form2$_getter_contentSizeMeasured(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, el = null,
                    $KW = $K.widget, _ = this._kwebfw_, scroll = _.ui.scroll;

                if($KU.scrollType() === 'native') {
                    el = $KW.el(this);

                    scroll.width = el.viewport.scrollWidth;
                    scroll.height = el.viewport.scrollHeight;
                }

                value.width = scroll.width;
                value.height = scroll.height;

                return {width:value.width, height:value.height};
            },

            footers: function Form2$_getter_footers(value) {
                return (value) ? value.slice(0) : value;
            },

            headers: function Form2$_getter_headers(value) {
                return (value) ? value.slice(0) : value;
            },

            title: function Form2$_getter_title(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, prop = this._kwebfw_.prop;

                if(prop.i18n_title) {
                    value = $KU.getI18Nvalue(prop.i18n_title);
                }

                return value;
            }
        }
    };


    var _handleAnimation = function Form2$_handleAnimation(cform, cview, pform, pview) {
        var $K = voltmx.$kwebfw$, $KD = $K.dom, $KG = $K.globals, timeout = null,
            anim = _deduceAnimationDetails(cform, pform), duration = 0;

        if(anim.in) {
            duration = parseFloat(anim.in.duration);
            if(anim.out) {
                duration = Math.max(duration || parseFloat(anim.out.duration));
            }

            _renderCurrentForm.call(cform, $KG.appForms, cview, false);

            if(pview && anim.out) {
                $KD.addCls(pview, '-voltmx-form-trans');
                $KD.style(pview, {
                    animationName: anim.out.effect,
                    animationDuration: anim.out.duration
                });
            }
            $KD.addCls(cview, '-voltmx-form-trans');
            $KD.style(cview, {
                animationName: anim.in.effect,
                animationDuration: anim.in.duration
            });

            timeout = setTimeout(function() {
                var $K = voltmx.$kwebfw$, $KD = $K.dom, $KW = $K.widget, $KA = $K.app,
                    cform = $KW.model($KA.currentFormUID), cview = cform._kwebfw_.view,
                    pform = $KW.model($KA.previousFormUID), pview = pform._kwebfw_.view;

                clearTimeout(timeout); timeout = null;

                if(pview && anim.out) {
                    $KD.style(pview, 'animation-name', null);
                    $KD.style(pview, 'animation-duration', null);
                    $KD.style(pview, {position:null, left:null, top:null});
                }

                $KD.style(cview, 'animation-name', null);
                $KD.style(cview, 'animation-duration', null);
                $KD.removeCls(cview, '-voltmx-form-trans');
                $KD.removeCls(pview, '-voltmx-form-trans');

                _removePreviousForm.call(pform);
                $K.apm.send(cform, 'FormEntry');

                $KW.invokeLifeCycleEvent(cform, 'postShow', true);
                if($KW.isFlexContainer(cform)) cform.forceLayout();
            }, (duration*1000));
        } else {
            _renderCurrentForm.call(cform, $KG.appForms, cview, true);
        }
    };


    //This function will be called in the scope of widget instance
    var _handleScrollBar = function Form2$_handleScrollBar() {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget,
            $KD = $K.dom, prop = this._kwebfw_.prop, el = $KW.el(this);

        if($KU.scrollType() === 'native') {
            if(!prop.enableScrolling || prop.scrollDirection === voltmx.flex.SCROLL_NONE) {
                $KD.style(el.viewport, {overflowX:'hidden', overflowY:'hidden'});
            } else { //Scrolling Enabled
                if(prop.scrollDirection === voltmx.flex.SCROLL_VERTICAL) {
                    $KD.style(el.viewport, {overflowX:'hidden', overflowY:'auto'});
                } else if(prop.scrollDirection === voltmx.flex.SCROLL_HORIZONTAL) {
                    $KD.style(el.viewport, {overflowX:'auto', overflowY:'hidden'});
                } else if(prop.scrollDirection === voltmx.flex.SCROLL_BOTH) {
                    $KD.style(el.viewport, {overflowX:'auto', overflowY:'auto'});
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


    //This function will be called in the scope of widget instance
    var _hasBreakpointChanged = function Form2$_hasBreakpointChanged(width) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KA = $K.app,
            previous = -1, current = -1, changed = false;

        if($KU.is($KA.currentBreakpoint, 'integer') && $KA.currentBreakpoint >= 0) {
            previous = $KA.currentBreakpoint;
        }

        current = _getCurrentBreakpoint.call(this, width);

        if(previous !== current) {
            changed = true;
            $KA.currentBreakpoint = current;
        }

        return changed;
    };


    //All widget file must have this variable
    //This functions will be called in the scope of widget instance
    var _populateUnderscore = {
        Form2: function Form2$_populateUnderscore() {
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
                    $KU.defineProperty(_, 'ns', 'voltmx.ui.Form2', null);
                }
            }
            if(!_.name) {
                if($KU.is(this.__$kwebfw$name__, 'string') && this.__$kwebfw$name__) {
                    $KU.defineProperty(_, 'name', this.__$kwebfw$name__, null);
                } else {
                    $KU.defineProperty(_, 'name', 'Form2', null);
                }
            }

            if(!_.name) $KU.defineProperty(_, 'modalContainer', null, true);
            if(!_.ui) $KU.defineProperty(_, 'ui', {}, null);
            $KU.defineProperty(_.ui, 'scroll', {x:0, y:0, width:-1, height:-1, minX:-1, maxX:-1, minY:-1, maxY:-1, status:'ended'}, true);
        }
    };


    //All widget file must have this variable
    //This function will be called in the scope of widget instance
    var _postInitialization = {
        Form2: function Form2$_postInitialization() {
            var $K = voltmx.$kwebfw$, $KU = $K.utils,
                _ = this._kwebfw_, prop = _.prop;

            if(prop.i18n_title) {
                prop.text = prop.i18n_title;
            }

            if($KU.is(prop.skin, 'null')) {
                prop.skin = 'slForm';
            }

            $KU.each(prop.footers, function(tpl) {
                var $K = voltmx.$kwebfw$, $KW = $K.widget;
                //This will create hierarchy if not created
                $KW.getTemplate(null, tpl);
            });

            $KU.each(prop.headers, function(tpl) {
                var $K = voltmx.$kwebfw$, $KW = $K.widget;
                //This will create hierarchy if not created
                $KW.getTemplate(null, tpl);
            });

        }
    };


    //All widget file must have this variable
    //This functions will be called in the scope of widget instance
    var _relayoutActiveTriggerer = {
        Form2: function Form2$_relayoutActiveTriggerer() {
            return [];
        }
    };


    //All widget file must have this variable
    //This functions will be called in the scope of widget instance
    var _relayoutPassiveTriggerer = {
        Form2: function Form2$_relayoutPassiveTriggerer() {
            return [];
        }
    };


    //This function must be called in the scope of widget instance
    var _removePreviousForm = function Form2$_removePreviousForm() {
        var $K = voltmx.$kwebfw$, $KD = $K.dom, scroll = this._kwebfw_.ui.scroll;

        $KD.remove(this._kwebfw_.view);

        if(!this.retainScrollPosition) {
            scroll.x = scroll.y = 0;
        }
    };


    //This function must be called in the scope of widget instance
    var _renderCurrentForm = function Form2$_renderCurrentForm(holder, view, removePrevForm) {
        var $K = voltmx.$kwebfw$, $KW = $K.widget, $KD = $K.dom,
            $KA = $K.app, _ = this._kwebfw_, el = $KW.el(view), previousForm = null;

        $KD.add(holder, view);
        $KD.style(el.viewport, {
            top:(el.header.offsetHeight+'px'),
            bottom:(el.footer.offsetHeight+'px')
        });

        if($KW.isFlexContainer(this)) {
            _navigated = true;
            this.forceLayout(true);
            _navigated = false;
        }

        _view[_.name].title.call(this, el, _.prop.title);
        $KD.style(view, 'visibility', 'visible');

        $KW.registerForIdleTimeout();
        $KW.onRender(view);

        //NOTE:: If <removePrevForm> is not a boolean, then
        //       Form.show() of current form has happened
        if(removePrevForm === true || removePrevForm !== false) {
            previousForm = $KW.model($KA.previousFormUID);

            if(removePrevForm === true && previousForm) {
                _removePreviousForm.call(previousForm);
            }

            $K.apm.send(this, 'FormEntry');

            //Incase of form animation, "postShow" is fired on "animationEnd" event
            $KW.invokeLifeCycleEvent(this, 'postShow', true);
            if($KW.isFlexContainer(this)) this.forceLayout();
        }
    };


    //All widget file must have this variable
    //All the functions will be called in the scope of widget instance
    var _setter = {
        Form2: {
            title: function Form2$_setter_title(/*old*/) {
                this._kwebfw_.prop.i18n_title = '';
            }
        }
    };


    //All the functions will be called in the scope of widget instance
    var _updateURLhash = function Form2$_updateURLhash(pf) {
        var flag = (!pf || this.id !== pf.id);

        if($K.behavior.isCompositeApp && (flag || this.appName !== pf.appName)) {
            location.hash = ('#/' + this.appName+'/'+this.id);
        } else if(flag) {
            location.hash = ('#_' + this.id);
        }
    };


    //All widget file must have this variable
    //All the functions will be called in the scope of widget instance
    //These function should always return a boolean value
    var _valid = {
        Form2: {
            allowHorizontalBounce: function Form2$_valid_allowHorizontalBounce(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'boolean')) {
                    flag = true;
                }

                return flag;
            },

            allowVerticalBounce: function Form2$_valid_allowVerticalBounce(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'boolean')) {
                    flag = true;
                }

                return flag;
            },

            bounces: function Form2$_valid_bounces(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'boolean')) {
                    flag = true;
                }

                return flag;
            },

            breakpoints: function Form2$_valid_breakpoints(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils,
                    i = 0, ilen = 0, flag = false;

                if($KU.is(value, 'array')) {
                    ilen = value.length;

                    for(i=0; i<ilen; i++) {
                        if($KU.is(value[i], 'integer') && value[i] > 0) {
                            if(i === 0) {
                                flag = true;
                            } else if(value[i] > value[i-1]) {
                                flag = true;
                            } else {
                                flag = false;
                                break;
                            }
                        } else {
                            flag = false;
                            break;
                        }
                    }
                }

                return flag;
            },

            contentOffset: function Form2$_valid_contentOffset(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'object')
                && $KU.is(value.x, 'size')
                && $KU.is(value.y, 'size')) {
                    flag = true;
                }

                return flag;
            },

            contentOffsetMeasured: function Form2$_valid_contentOffsetMeasured(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'object')
                && $KU.is(value.x, 'integer') && value.x >= 0
                && $KU.is(value.y, 'integer') && value.y >= 0) {
                    flag = true;
                }

                return flag;
            },

            contentSize: function Form2$_valid_contentSize(value) {
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

            contentSizeMeasured: function Form2$_valid_contentSizeMeasured(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'object')
                && $KU.is(value.height, 'integer') && value.height >= 0
                && $KU.is(value.width, 'integer') && value.width >= 0) {
                    flag = true;
                }

                return flag;
            },

            displayOrientation: function Form2$_valid_displayOrientation(value) {
                var flag = false, options = [
                    constants.FORM_DISPLAY_ORIENTATION_BOTH,
                    constants.FORM_DISPLAY_ORIENTATION_LANDSCAPE,
                    constants.FORM_DISPLAY_ORIENTATION_PORTRAIT
                ];

                if(options.indexOf(value) >= 0) {
                    flag = true;
                }

                return flag;
            },

            enabledForIdleTimeout: function Form2$_valid_enabledForIdleTimeout(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'boolean')) {
                    flag = true;
                }

                return flag;
            },

            enableOnScrollWidgetPositionForSubwidgets: function Form2$_valid_enableOnScrollWidgetPositionForSubwidgets(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'boolean')) {
                    flag = true;
                }

                return flag;
            },

            enableScrolling: function Form2$_valid_enableScrolling(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'boolean')) {
                    flag = true;
                }

                return flag;
            },

            footers: function Form2$_valid_footers(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils,
                    i = 0, ilen = 0, flag = false;

                if($KU.is(value, 'null')) {
                    flag = true;
                } else if($KU.is(value, 'array')) {
                    flag = true;
                    ilen = value.length;

                    for(i=0; i<ilen; i++) {
                        if(!$KU.is(value[i], 'widget', 'FlexContainer')) {
                            flag = false;
                            break;
                        }
                    }
                }

                return flag;
            },

            headers: function Form2$_valid_headers(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils,
                    i = 0, ilen = 0, flag = false;

                if($KU.is(value, 'null')) {
                    flag = true;
                } else if($KU.is(value, 'array')) {
                    flag = true;
                    ilen = value.length;

                    for(i=0; i<ilen; i++) {
                        if(!$KU.is(value[i], 'widget', 'FlexContainer')) {
                            flag = false;
                            break;
                        }
                    }
                }

                return flag;
            },

            horizontalScrollIndicator: function Form2$_valid_horizontalScrollIndicator(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'boolean')) {
                    flag = true;
                }

                return flag;
            },

            i18n_title: function Form2$_valid_i18n_title(value) {
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

            inTransitionConfig: function Form2$_valid_inTransitionConfig(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, options = null, flag = false;

                if($KU.is(value, 'null')) {
                    flag = true;
                } else if($KU.is(value, 'object')) {
                    if(Object.prototype.hasOwnProperty.call(value, 'formTransition')) {
                        if($KU.is(value.formTransition, 'string')) {
                            options = ['none', 'topcenter', 'bottomcenter', 'rightcenter', 'leftcenter'];
                            flag = (options.indexOf(value.formTransition.toLowerCase()) >= 0) ? true : false;
                        }
                    } else if(Object.prototype.hasOwnProperty.call(value, 'formAnimation')) {
                        if($KU.is(value.formAnimation, 'number')) {
                            options = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
                            flag = (options.indexOf(value.formAnimation) >= 0) ? true : false;
                        }
                    }
                }

                return flag;
            },

            needAppMenu: function Form2$_valid_needAppMenu(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'boolean')) {
                    flag = true;
                }

                return flag;
            },

            onDeviceBack: function Form2$_valid_onDeviceBack(value) {
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


            onOrientationChange: function Form2$_valid_onOrientationChange(value) {
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

            onResize: function Form2$_valid_onResize(value) {
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

            onScrollEnd: function Form2$_valid_onScrollEnd(value) {
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

            onScrolling: function Form2$_valid_onScrolling(value) {
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

            onScrollStart: function Form2$_valid_onScrollStart(value) {
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

            onScrollTouchReleased: function Form2$_valid_onScrollTouchReleased(value) {
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

            outTransitionConfig: function Form2$_valid_outTransitionConfig(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, options = null, flag = false;

                if($KU.is(value, 'null')) {
                    flag = true;
                } else if($KU.is(value, 'object')) {
                    if(Object.prototype.hasOwnProperty.call(value, 'formTransition')) {
                        if($KU.is(value.formTransition, 'string')) {
                            options = ['none', 'topcenter', 'bottomcenter', 'rightcenter', 'leftcenter'];
                            flag = (options.indexOf(value.formTransition.toLowerCase()) >= 0) ? true : false;
                        }
                    } else if(Object.prototype.hasOwnProperty.call(value, 'formAnimation')) {
                        if($KU.is(value.formAnimation, 'number')) {
                            options = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
                            flag = (options.indexOf(value.formAnimation) >= 0) ? true : false;
                        }
                    }
                }

                return flag;
            },

            retainScrollPosition: function Form2$_valid_retainScrollPosition(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'boolean')) {
                    flag = true;
                }

                return flag;
            },

            scrollDirection: function Form2$_valid_scrollDirection(value) {
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

            title: function Form2$_valid_title(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'string')) {
                    flag = true;
                }

                return flag;
            },

            verticalScrollIndicator: function Form2$_valid_verticalScrollIndicator(value) {
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
        Form2: {
            allowHorizontalBounce: true,

            allowVerticalBounce: true,

            bounces: true,

            breakpoints: false,

            contentOffset: function Form2$_view_contentOffset(/*el, old*/) {
                this.setContentOffset(this.contentOffset, true);
            },

            contentOffsetMeasured: false,

            contentSize: function Form2$_view_contentSize(/*el, old*/) {},

            contentSizeMeasured: false,

            displayOrientation: false,

            enabledForIdleTimeout: function Form2$_view_enabledForIdleTimeout(/*el, old*/) {
                var $K = voltmx.$kwebfw$, $KW = $K.widget, $KA = $K.app,
                    cf = $KW.model($KA.currentFormUID);

                if(this === cf) $KW.registerForIdleTimeout();
            },

            enableOnScrollWidgetPositionForSubwidgets: true,

            enableScrolling: function Form2$_view_enableScrolling(/*el, old*/) {
                _handleScrollBar.call(this);
            },

            footers: false,

            headers: false,

            horizontalScrollIndicator: function Form2$_view_horizontalScrollIndicator(/*el, old*/) {
                _handleScrollBar.call(this);
            },

            i18n_title: false,

            inTransitionConfig: true,

            needAppMenu: false, //TODO::

            onDeviceBack: true,

            onOrientationChange: true,

            onScrollEnd: true,

            onScrolling: true,

            onScrollStart: true,

            onScrollTouchReleased: true,

            outTransitionConfig: true,

            retainScrollPosition: true,

            scrollDirection: function Form2$_view_scrollDirection(/*el, old*/) {
                _handleScrollBar.call(this);
            },

            title: function Form2$_view_title(/*el, old*/) {
                var $K = voltmx.$kwebfw$, $KA = $K.app,
                    title = this.title || $KA.title || $KA.id;

                if(title !== document.title) {
                    document.title = title;
                }

            },

            verticalScrollIndicator: function Form2$_view_verticalScrollIndicator(/*el, old*/) {
                _handleScrollBar.call(this);
            }
        }
    };


    Object.defineProperty(voltmx.ui, 'Form2', {configurable:false, enumerable:false, writable:false, value:(function() {
        var $K = voltmx.$kwebfw$;


        /**
         * voltmx.ui.Form2 constructor.
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

        var Form2 = function Form2(bconfig, lconfig, pspconfig) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils, self = this,
                dependentPropertiesValidationMessage = '', prop = null, p = null;

            if(!$KU.is(bconfig, 'object')) bconfig = {};

            if(!bconfig.isPreValidated) {
                prop = {
                    allowHorizontalBounce: true,
                    allowVerticalBounce: true,
                    bounces: true, //Should this property be supported ???
                    breakpoints: [],
                    contentOffset: {x:'0dp', y:'0dp'},
                    contentOffsetMeasured: {x:0, y:0}, //Must be in dp unit
                    contentSize: {width:'100%', height:'100%'},
                    contentSizeMeasured: {height:0, width:0}, //Must be in dp unit
                    displayOrientation: constants.FORM_DISPLAY_ORIENTATION_BOTH, //In doc not available, but in SPA code available
                    dockableAppmenu: false, //TODO:: In doc not available, but in SPA code available
                    dockableFooter: false, //TODO:: In doc not available, but in SPA code available
                    dockableHeader: false, //TODO:: In doc not available, but in SPA code available
                    enabledForIdleTimeout: false,
                    enableOnScrollWidgetPositionForSubwidgets: false,
                    enableScrolling: true,
                    footers: null, //In doc not available, but in SPA code available
                    formType: '', //TODO:: OLD, may be backward compatibility
                    headers: null, //In doc not available, but in SPA code available
                    i18n_title: '',
                    inTransitionConfig: null,
                    masterDataLoad: false, //TODO:: OLD, may be backward compatibility
                    needAppLevelMenu: true, //TODO:: OLD, may be backward compatibility
                    needAppMenu: true,
                    onDeviceBack: null,
                    onOrientationChange: null,
                    onScrollEnd: null,
                    onScrolling: null,
                    onScrollStart: null,
                    onScrollTouchReleased: null,
                    outTransitionConfig: null,
                    preOrientationChange: null, //TODO:: In doc not available, but in SPA code available
                    resetFocusToTop: false, //TODO:: In doc not available, but in SPA code available
                    retainScrollPosition: false,
                    scrollDirection: voltmx.flex.SCROLL_VERTICAL,
                    title: '',
                    transactionalDataLoad: false, //TODO:: OLD, may be backward compatibility
                    type: '', //TODO:: In doc not available, but in SPA code available
                    useTransform: false, //TODO:: In doc not available, but in SPA code available
                    verticalScrollIndicator: true
                };
            }

            _populateUnderscore.Form2.call(this);

            if(!$KU.is(bconfig.id, 'string') || !bconfig.id) {
                bconfig.id = (this._kwebfw_.name+$KU.uid());
            }

            Form2.base.call(this, bconfig, lconfig, pspconfig);

            if(!bconfig.isPreValidated) {
                if($KU.is(_dependentPropertiesValidationMessage.Form2, 'function')) {
                    dependentPropertiesValidationMessage = _dependentPropertiesValidationMessage.Form2.call(this, prop, bconfig, lconfig, pspconfig);
                }
            }

            if(dependentPropertiesValidationMessage) {
                throw new Error(dependentPropertiesValidationMessage);
            } else {
                if(!bconfig.isPreValidated) {
                //Defaulting to platfom values specific to Form2
                    $KU.each(prop, function(value, key) {
                        var $K = voltmx.$kwebfw$, $KU = $K.utils,
                            $KW = $K.widget, valid = false, message = '';

                        if(!Object.prototype.hasOwnProperty.call(bconfig, key)) {
                            bconfig[key] = value;
                        } else if($KW.getNonConstructorProperties(self._kwebfw_.name).indexOf(key) >= 0) {
                            throw new Error('<'+key+'> is a non-constructor property of <'+self._kwebfw_.ns+'> class.');
                        } else if(!$KU.is(_valid.Form2[key], 'function')) {
                            throw new Error('<'+key+'> is available in default widget properties of <voltmx.ui.Form2>, but not in <_valid.Form2> namespace.');
                        } else {
                            valid = _valid.Form2[key].call(self, bconfig[key]);
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

                //Defining Getters/Setters specific to Form2
                $KU.each(_view.Form2, function(value, key) {
                    var $K = voltmx.$kwebfw$, $KU = $K.utils;

                    $KU.defineProperty(self._kwebfw_.prop, key, bconfig[key], {configurable:false, enumerable:true, writable:true});

                    $KU.defineGetter(self, key, function Form2$_getter() {
                        var $K = voltmx.$kwebfw$, $KU = $K.utils;

                        if($KU.is(_getter.Form2[key], 'function')) {
                            return _getter.Form2[key].call(this, this._kwebfw_.prop[key]);
                        }
                        return this._kwebfw_.prop[key];
                    }, true);

                    $KU.defineSetter(self, key, function Form2$_setter(val) {
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
                                valid = _valid.Form2[key].call(this, val);
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

                                    if($KU.is(_setter.Form2[key], 'function')) {
                                        _setter.Form2[key].call(this, old);
                                    }

                                    if(_relayoutActiveTriggerer.Form2().indexOf(key) >= 0) {
                                        $KW.markRelayout(this);
                                    }

                                    if(_relayoutPassiveTriggerer.Form2().indexOf(key) >= 0) {
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

                if($KU.is(_postInitialization.Form2, 'function')) {
                    _postInitialization.Form2.call(this);
                }
            }

            pspconfig = lconfig = bconfig = null; //For GC
        };


        $K.utils.inherits(Form2, voltmx.ui.ContainerWidget);


        /**
         * Builds the view layer for Form2 widget.
         *
         * @override
         * @access      protected
         * @method      _render
         * @memberof    voltmx.ui.Form2
         * @author      Goutam Sahu <goutam.sahu@voltmx.com>
         *
         * @returns     {HTMLElement} – Form2 view.
         */
        var form2__render = function Form2$_render(/*tag*/) {
            var $super = voltmx.ui.Form2.base.prototype, _ = this._kwebfw_,
                view = _.view, $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget,
                $KD = $K.dom, el = $KW.el(view), hScroll = null, vScroll = null,
                viewport = null, scrolee = null, footer = null, header = null;

            if(this.isVisible || $K.F.RIVW) {
                if(!view) {
                    header = $KD.create('DIV', {kr:'header'});
                    viewport = $KD.create('DIV', {kr:'viewport'});
                    footer = $KD.create('DIV', {kr:'footer'});

                    if($KU.scrollType() !== 'native') {
                        $KD.style(viewport, {overflowX:'hidden', overflowY:'hidden'});

                        scrolee = $KD.create('DIV', {kr:'scrolee'});
                        hScroll = $KD.create('DIV', {kr:'h-scroll'}, {display:'none'});
                        vScroll = $KD.create('DIV', {kr:'v-scroll'}, {display:'none'});

                        $KD.add(viewport, scrolee);
                        $KD.add(viewport, hScroll);
                        $KD.add(viewport, vScroll);
                    }

                    view = $super._render.call(this, 'FORM', [header, viewport, footer]);

                    $KD.on(view, 'submit', 'nosubmit', function(e) {
                        var $K = voltmx.$kwebfw$, $KD = $K.dom;
                        $KD.preventDefault(e);
                    });

                    $KD.addCls(view, 'kvp');
                    _handleScrollBar.call(this);
                    $KW.registerNativeScrollEvent(this);

                    el = $KW.el(view);
                }

                $KW.accessibility(this);
                $KD.style(view, 'visibility', 'hidden');

                $KU.each($KW.children(this), function(cmodel/*, index*/) {
                    if(cmodel.isVisible || $K.F.RIVW) {
                        $KD.add((el.scrolee || el.viewport), cmodel._render());
                    }
                });
            }

            return view;
        };


        //TODO::
        var form2_replaceAt = function Form2$replaceAt() {
            //
        };


        var form2_setZoomScale = function Form2$setZoomScale() {
            var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget;

            if($KW.isFlexContainer(this)) {
                $KU.unsupportedAPI('voltmx.ui.Form2.setZoomScale');
            } else {
                //Throw Error
            }
        };


        var form2_show = function Form2$show(arg0) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils, $KG = $K.globals, $KA = $K.app,
                $KW = $K.widget, $KD = $K.dom, cv = null, sameFormId = false,
                pv = null, cf = null, pf = null, modal = null, context = null;

            context = ($KU.is(arg0, 'object')) ? arg0 : {};

            if(this._voltmxControllerName && context.forced !== true) {
                throw new Error('Cannot call <show> method on a MVC form.');
            } else {
                if(!$KU.is($KW.model($KA.currentFormUID), 'widget')) {
                    cf = this;
                    $KA.currentFormUID = cf._kwebfw_.uid;
                    $K.apm.send(this, 'AppLoad');
                    $K.apm.send(this, 'AppTransition', {status: 'Foreground'});
                } else {
                    cf = $KW.model($KA.currentFormUID);
                    $K.apm.send(cf, 'FormExit');
                    $KW.dismissPickers(cf);
                    $KW.invokeLifeCycleEvent(cf, 'onHide', true);
                    $KW.removeSensitiveText(cf);
                    if(cf.id !== this.id) {
                        $KA.previousFormUID = cf._kwebfw_.uid;
                    } else {
                        sameFormId = true;
                        $KD.remove(cf._kwebfw_.view);
                    }

                    cf = this;
                    $KA.currentFormUID = cf._kwebfw_.uid;
                }

                pf = $KW.model($KA.previousFormUID);
                pv = (pf) ? pf._kwebfw_.view : null;
                $KA.currentBreakpoint = -1;

                _updateURLhash.call(cf, pf);

                modal = $KW.deduceModalContainer(cf);
                $KW.updateModalContainer(cf, modal);

                if(!cf._kwebfw_.view) {
                    $KW.invokeLifeCycleEvent(cf, 'init', false);
                }

                $KW.invokeLifeCycleEvent(cf, 'preShow', false);
                $K.ui[cf._kwebfw_.name].onResize.call(cf);

                $KD.html($KG.appScrap, '');
                cv = cf._render();

                if(!pf || sameFormId) { //No animation required
                    _renderCurrentForm.call(cf, $KG.appForms, cv, (sameFormId ? null : true));
                } else {
                    if(!cf.inTransitionConfig && !pf.outTransitionConfig) { //No animation required
                        _renderCurrentForm.call(cf, $KG.appForms, cv, true);
                    } else { //Animation required
                        _handleAnimation(cf, cv, pf, pv);
                    }
                }

                cf = pf = cv = pv = null; //For GC
            }
        };


        $K.defVoltmxProp(Form2.prototype, [
            {keey:'_render', value:form2__render},
            {keey:'replaceAt', value:form2_replaceAt},
            {keey:'setZoomScale', value:form2_setZoomScale},
            {keey:'show', value:form2_show}
        ]);


        return Form2;
    }())});
}());
