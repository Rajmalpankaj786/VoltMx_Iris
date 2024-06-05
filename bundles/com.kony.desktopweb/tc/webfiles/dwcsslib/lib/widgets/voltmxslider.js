(function() {
    var $K = voltmx.$kwebfw$;

    $K.defVoltmxProp($K.ui, [
        {keey:'Slider', value:{}, items:[
            {keey:'onClick', value:function(evt) {
                var $K = voltmx.$kwebfw$, $KW = $K.widget,
                    sliderPosition = null, _ = this._kwebfw_, finalPosition = null,
                    value = null, clickPosition = null, sliderEndPosition = null;


                if(this.orientation === constants.SLIDER_HORIZONTAL_ORIENTATION) {
                    sliderPosition = Math.round(_.view.getBoundingClientRect().left);
                    sliderEndPosition = sliderPosition + _.view.offsetWidth;
                    clickPosition = (evt.clientX <= sliderPosition) ? sliderPosition : evt.clientX;
                    clickPosition = (clickPosition >= sliderEndPosition) ? sliderEndPosition : clickPosition;
                    finalPosition = Math.abs(clickPosition - sliderPosition);

                    value = _calculateDeltaValueFromDisplacement.call(this, finalPosition, _.view.offsetWidth);

                    if($KW.shouldApplyRTL(this, 'layoutAlignment')) {
                        value = this.max - value;
                    }
                } else if(this.orientation === constants.SLIDER_VERTICAL_ORIENTATION) {
                    sliderPosition = Math.round(_.view.getBoundingClientRect().bottom);
                    sliderEndPosition = sliderPosition - _.view.offsetHeight;
                    clickPosition = (evt.clientY >= sliderPosition) ? sliderPosition : evt.clientY;
                    clickPosition = (clickPosition <= sliderEndPosition) ? sliderEndPosition : clickPosition;
                    finalPosition = Math.abs(clickPosition - sliderPosition);

                    value = _calculateDeltaValueFromDisplacement.call(this, finalPosition, _.view.offsetHeight);
                }

                this.selectedValue = value;
                $KW.fire(this, 'onSelection', this);

                return false;
            }},

            {keey:'onKeyDown', value:function(evt) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget,
                    $KD = $K.dom, el = $KW.el(this), _ = this._kwebfw_,
                    prop = _.prop, value = null, code = evt.keyCode || evt.which;

                if([37, 39].indexOf(code) >= 0
                && prop.orientation === constants.SLIDER_HORIZONTAL_ORIENTATION) {
                    $KD.preventDefault(evt);

                    if(!Object.prototype.hasOwnProperty.call(_.ui, 'keydown')) {
                        _.ui.keydown = true;
                        _.selectedValueBeforeSlideStarted = prop.selectedValue;

                        if(prop.focusThumbImage) {
                            $KD.setAttr(el.thumb, 'src', $KU.getImageURL(prop.focusThumbImage));
                        }
                    }

                    if(code === 37) { //Left Arrow
                        value = $KW.shouldApplyRTL(this, 'layoutAlignment') ? (prop.selectedValue + prop.step)
                            : (prop.selectedValue - prop.step);
                    } else if(code === 39) { //Right Arrow
                        value = $KW.shouldApplyRTL(this, 'layoutAlignment') ? (prop.selectedValue - prop.step)
                            :(prop.selectedValue + prop.step);
                    }
                } else if([38, 40].indexOf(code) >= 0
                && this.orientation === constants.SLIDER_VERTICAL_ORIENTATION) {
                    $KD.preventDefault(evt);

                    if(!Object.prototype.hasOwnProperty.call(_.ui, 'keydown')) {
                        _.ui.keydown = true;
                        _.selectedValueBeforeSlideStarted = prop.selectedValue;
                    }

                    if(code === 38) { //Up Arrow
                        value = prop.selectedValue + prop.step;
                    } else if(code === 40) { //Down Arrow
                        value = prop.selectedValue - prop.step;
                    }
                }

                if(!$KU.is(value, 'null')
                && prop.selectedValue !== value
                && value >= prop.min && value <= prop.max) {
                    this.selectedValue = value;
                    $KW.fire(this, 'onSlide', this);
                }

                return false;
            }},

            {keey:'onKeyUp', value:function(/*evt*/) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget, $KD = $K.dom,
                    el = $KW.el(this), _ = this._kwebfw_, prop = _.prop;

                if(_.ui.keydown) {
                    if(prop.focusThumbImage) {
                        $KD.setAttr(el.thumb, 'src', $KU.getImageURL(prop.thumbImage));
                    }

                    delete _.ui.keydown;

                    if(prop.selectedValue !== _.selectedValueBeforeSlideStarted) {
                        $KW.fire(this, 'onSelection', this);
                    }
                }

                return false;
            }},

            {keey:'onTouchEnd', value:function(evt) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, $KD = $K.dom,
                    _ = this._kwebfw_, prop = _.prop, timeout = null;

                if(prop.focusThumbImage) {
                    //NOTE:: Without timeout updated image src is not reflected
                    timeout = setTimeout(function() {
                        clearTimeout(timeout);
                        $KD.setAttr(evt.target, 'src', $KU.getImageURL(prop.thumbImage));
                        $K = $KU = $KD = _ = prop = timeout = null; //For GC
                    }, 0);
                }

                return false;
            }},

            {keey:'onTouchStart', value:function(evt) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, $KD = $K.dom,
                    _ = this._kwebfw_, prop = _.prop;

                if(prop.focusThumbImage) {
                    $KD.setAttr(evt.target, 'src', $KU.getImageURL(prop.focusThumbImage));
                }

                return false;
            }},

            {keey:'setupUIInteraction', value:function(dom, clone) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget,
                    $KD = $K.dom, tabindex = '';

                if($KW.disabled(this)) {
                    $KD.setAttr(dom, 'aria-disabled', 'true');
                    $KD.setAttr(dom, 'tabindex', -1);
                } else if(!$KW.interactable(this)) {
                    $KD.setAttr(dom, 'tabindex', -1);
                } else {
                    tabindex = $KW.tabIndex(this, clone);
                    $KD.removeAttr(dom, 'aria-disabled');

                    if($KU.is(tabindex, 'integer')) {
                        $KD.setAttr(dom, 'tabindex', tabindex);
                    } else {
                        $KD.removeAttr(dom, 'tabindex');
                    }
                }
            }}
        ]}
    ]);


    //This functions will be called in the scope of widget instance
    var _calculateDeltaValueFromDisplacement = function Slider$_calculateDeltaValueFromDisplacement(displacement, size) {
        var diffMaxMin = (this.max - this.min), value = null;

        value = Math.round((displacement/size) * diffMaxMin);
        value = Math.round(value/this.step) * this.step;

        value = this.min + value;

        if(value < this.min) value = value + this.step;
        if(value > this.max) value = value - this.step;

        if(value < this.min) value = this.min;
        if(value > this.max) value = this.max;

        return value;
    };

    //All widget file must have this variable
    //All the functions will be called in the scope of widget instance
    var _dependentPropertiesValidationMessage = {
        Slider: function Slider$_dependentPropertiesValidationMessage(prop, bconfig /*, lconfig, pspconfig*/) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils, message = '',
                min = 0, max = 100, selectedValue = null, step = 1;

            min = ($KU.is(bconfig.min, 'integer')) ? bconfig.min : prop.min;
            max = ($KU.is(bconfig.max, 'integer')) ? bconfig.max : prop.max;
            selectedValue = ($KU.is(bconfig.selectedValue, 'integer')) ? bconfig.selectedValue : prop.selectedValue;
            step = ($KU.is(bconfig.selectedValue, 'integer')) ? bconfig.step : prop.step;

            if(min >= max) {
                message += 'Slider <min> value cannot be greater or equal to <max> value.';
            } else if(!$KU.is(selectedValue, 'null')
            && (selectedValue < min || selectedValue > max)) {
                message += 'Slider <selectedValue> must be between <min> and <max> value (boundary inclusive).';
            } else if(((max - min) % step) !== 0) {
                message += 'Slider <step>, <min>, <max> values combination is invalid.';
            }

            return message;
        }
    };


    //All widget file must have this variable
    //All the functions will be called in the scope of widget instance
    var _getter = {
        Slider: {
            maxLabel: function Slider$_getter_maxLabel(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, prop = this._kwebfw_.prop;

                if(prop.i18n_maxLabel) {
                    value = $KU.getI18Nvalue(prop.i18n_maxLabel);
                }

                return value;
            },

            minLabel: function Slider$_getter_minLabel(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, prop = this._kwebfw_.prop;

                if(prop.i18n_minLabel) {
                    value = $KU.getI18Nvalue(prop.i18n_minLabel);
                }

                return value;
            },

            selectedValue: function Slider$_getter_selectedValue(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, prop = this._kwebfw_.prop;

                if($KU.is(value, 'null')) {
                    value = Math.abs((prop.min + (prop.min - prop.max) / 2));
                } else if(value < prop.min) {
                    value = prop.min;
                } else if(value > prop.max) {
                    value = prop.max;
                }

                return value;
            },

            thickness: function Slider$_getter_thickness(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils,
                    device = $KU.browser('device');

                if(!value) {
                    value = (['ipad', 'iphone'].indexOf(device) >= 0) ? 2 : 5;
                }

                return value;
            }
        }
    };


    //All widget file must have this variable
    //This functions will be called in the scope of widget instance
    var _populateUnderscore = {
        Slider: function Slider$_populateUnderscore() {
            var $K = voltmx.$kwebfw$, $KU = $K.utils, _ = null;

            if(!$KU.is(this._kwebfw_, 'object')) {
                $KU.defineProperty(this, '_kwebfw_', {}, null);
            }
            _ = this._kwebfw_;

            if(!_.ui) {
                $KU.defineProperty(_, 'ui', {}, null);
                $KU.defineProperty(_.ui, 'size', -1, true);
            }

            //NOTE:: Any changes to _ (underscore) may need a change in
            //       _cleanUnderscore function of voltmxui.js file.
            if(!_.ns) {
                if($KU.is(this.__$kwebfw$ns__, 'string') && this.__$kwebfw$ns__) {
                    $KU.defineProperty(_, 'ns', this.__$kwebfw$ns__, null);
                } else {
                    $KU.defineProperty(_, 'ns', 'voltmx.ui.Slider', null);
                }
            }
            if(!_.name) {
                if($KU.is(this.__$kwebfw$name__, 'string') && this.__$kwebfw$name__) {
                    $KU.defineProperty(_, 'name', this.__$kwebfw$name__, null);
                } else {
                    $KU.defineProperty(_, 'name', 'Slider', null);
                }
            }

            if(!_.percent) $KU.defineProperty(_, 'percent', -1, true);
            if(typeof _.tabIndex !== 'number') {
                $KU.defineProperty(_, 'tabIndex', 0, true);
            }
        }
    };


    //All widget file must have this variable
    //This function will be called in the scope of widget instance
    var _postInitialization = {
        Slider: function Slider$_postInitialization() {
            var _ = this._kwebfw_, prop = _.prop;

            if(prop.i18n_maxLabel) {
                prop.maxLabel = prop.i18n_maxLabel;
            }

            if(prop.i18n_minLabel) {
                prop.minLabel = prop.i18n_minLabel;
            }
        }
    };


    //This functions will be called in the scope of widget instance
    var _registerSlideGesture = function Slider$_registerSlideGesture(thumb) {
        var $K = voltmx.$kwebfw$, $KD = $K.dom;

        $KD.on(thumb, 'basic', 'slider', function(g) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget,
                $KD = $K.dom, _ = this._kwebfw_, prop = _.prop, dist = 0,
                el = $KW.el(this), moved = false, percent = 0, value = 0, deltaX;

            if(!$KW.interactable(this)) return; /* ---------------------------------------------- */

            if(g.status === 'started') {
                _.selectedValueBeforeSlideStarted = prop.selectedValue;

                if(prop.orientation === constants.SLIDER_HORIZONTAL_ORIENTATION) {
                    _.ui.size = _.view.offsetWidth;
                } else if(prop.orientation === constants.SLIDER_VERTICAL_ORIENTATION) {
                    _.ui.size = _.view.offsetHeight;
                }

                if(prop.focusThumbImage) {
                    $KD.setAttr(el.thumb, 'src', $KU.getImageURL(prop.focusThumbImage));
                }
            }

            if(g.delta.x && prop.orientation === constants.SLIDER_HORIZONTAL_ORIENTATION) {
                moved = true;

                if($KW.shouldApplyRTL(this, 'layoutAlignment')) {
                    deltaX = (-1*g.delta.x);
                } else {
                    deltaX = (g.delta.x);
                }

                percent = ((100/_.ui.size) * deltaX);
            } else if(g.delta.y && prop.orientation === constants.SLIDER_VERTICAL_ORIENTATION) {
                moved = true;
                percent = ((100/_.ui.size) * g.delta.y * -1);
            }

            if(moved && percent) {
                percent += _.percent;
                dist = ((_.ui.size/100) * percent);
                value = _calculateDeltaValueFromDisplacement.call(this, dist, _.ui.size);

                if(prop.selectedValue !== value) {
                    this.selectedValue = value;

                    if(g.status === 'moving') $KW.fire(this, 'onSlide', this);
                }
            }

            if(g.status === 'ended' && prop.selectedValue !== _.selectedValueBeforeSlideStarted) {
                if(prop.focusThumbImage) {
                    $KD.setAttr(el.thumb, 'src', $KU.getImageURL(prop.thumbImage));
                }

                delete _.selectedValueBeforeSlideStarted;
                _.ui.size = -1;
                $KW.fire(this, 'onSelection', this);
            }
        }, {scope:this});
    };


    //All widget file must have this variable
    //This functions will be called in the scope of widget instance
    var _relayoutActiveTriggerer = {
        Slider: function Slider$_relayoutActiveTriggerer() {
            return [];
        }
    };


    //All widget file must have this variable
    //This functions will be called in the scope of widget instance
    var _relayoutPassiveTriggerer = {
        Slider: function Slider$_relayoutPassiveTriggerer() {
            return [];
        }
    };


    //All widget file must have this variable
    //All the functions will be called in the scope of widget instance
    var _setter = {
        Slider: {
            maxLabel: function Slider$_setter_maxLabel(/*old*/) {
                this._kwebfw_.prop.i18n_maxLabel = '';
            },

            minLabel: function Slider$_setter_minLabel(/*old*/) {
                this._kwebfw_.prop.i18n_minLabel = '';
            }
        }
    };


    //All widget file must have this variable
    //All the functions will be called in the scope of widget instance
    //These function should always return a boolean value
    var _valid = {
        Slider: {
            focusThumbImage: function Slider$_valid_focusThumbImage(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'string')) {
                    flag = true;
                }

                return flag;
            },

            i18n_maxLabel: function Slider$_valid_i18n_maxLabel(value) {
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

            i18n_minLabel: function Slider$_valid_i18n_minLabel(value) {
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

            leftSkin: function Slider$_valid_leftSkin(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'object')
                || ($KU.is(value, 'string') && value.split(' ').length === 1)) {
                    flag = true;
                }

                return flag;
            },

            max: function Slider$_valid_max(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils,
                    prop = this._kwebfw_.prop, flag = false;

                if($KU.is(value, 'integer')) {
                    flag = true;
                }

                if(flag && Object.prototype.hasOwnProperty.call(prop, 'min')
                && Object.prototype.hasOwnProperty.call(prop, 'selectedValue')) {
                    flag = (value > prop.min) ? true : 'Slider <max> value cannot be lesser or equal to <min> value.';

                    if(flag) {
                        flag = (value >= prop.selectedValue) ? true : 'Slider <max> value cannot be lesser than <selectedValue> value.';
                    }
                }

                return flag;
            },

            maxLabel: function Slider$_valid_maxLabel(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'string')) {
                    flag = true;
                }

                return flag;
            },

            maxLabelSkin: function Slider$_valid_maxLabelSkin(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'object')
                || ($KU.is(value, 'string') && value.split(' ').length === 1)) {
                    flag = true;
                }

                return flag;
            },

            min: function Slider$_valid_min(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils,
                    prop = this._kwebfw_.prop, flag = false;

                if($KU.is(value, 'integer')) {
                    flag = true;
                }

                if(flag && Object.prototype.hasOwnProperty.call(prop, 'max')
                && Object.prototype.hasOwnProperty.call(prop, 'selectedValue')) {
                    flag = (value < prop.max) ? true : 'Slider <min> value cannot be greater or equal to <max> value.';

                    if(flag) {
                        flag = (value <= prop.selectedValue) ? true : 'Slider <min> value cannot be greater than <selectedValue> value.';
                    }
                }

                return flag;
            },

            minLabel: function Slider$_valid_minLabel(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'string')) {
                    flag = true;
                }

                return flag;
            },

            minLabelSkin: function Slider$_valid_minLabelSkin(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'object')
                || ($KU.is(value, 'string') && value.split(' ').length === 1)) {
                    flag = true;
                }

                return flag;
            },

            retainFlowHorizontalAlignment: function ContainerWidget$_valid_retainFlowHorizontalAlignment(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'boolean')) {
                    flag = true;
                }

                return flag;
            },

            onSelection:  function Slider$_valid_onSelection(value) {
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

            onSlide:  function Slider$_valid_onSlide(value) {
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

            orientation: function Slider$_valid_orientation(value) {
                var flag = false, options = [
                    constants.SLIDER_HORIZONTAL_ORIENTATION,
                    constants.SLIDER_VERTICAL_ORIENTATION
                ];

                if(options.indexOf(value) >= 0) {
                    flag = true;
                }

                return flag;
            },

            rightSkin: function Slider$_valid_rightSkin(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'object')
                || ($KU.is(value, 'string') && value.split(' ').length === 1)) {
                    flag = true;
                }

                return flag;
            },

            selectedValue: function Slider$_valid_selectedValue(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils,
                    prop = this._kwebfw_.prop, flag = false;

                if($KU.is(value, 'integer')) {
                    flag = true;
                }

                if(flag && Object.prototype.hasOwnProperty.call(prop, 'min')
                && Object.prototype.hasOwnProperty.call(prop, 'max')) {
                    flag = (value >= this.min && value <= this.max) ? true : 'Slider <selectedValue> must be between <min> and <max> value (boundary inclusive).';
                }

                return flag;
            },

            step: function Slider$_valid_step(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils,
                    prop = this._kwebfw_.prop, flag = false;

                if($KU.is(value, 'integer')) {
                    flag = true;
                }

                if(flag && Object.prototype.hasOwnProperty.call(prop, 'min')
                && Object.prototype.hasOwnProperty.call(prop, 'max')) {
                    if((this.max-this.min) % value !== 0) {
                        flag = 'Slider <step>, <min>, <max> values combination is invalid.';
                    } else {
                        flag = true;
                    }
                }

                return flag;
            },

            thickness: function Slider$_valid_thickness(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'number') && value >= 1 && value <= 25) {
                    flag = true;
                }

                return flag;
            },

            thumbHeight: function Slider$_valid_thumbHeight(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'number') && value >= 0) {
                    flag = true;
                }

                return flag;
            },

            thumbImage: function Slider$_valid_thumbImage(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'string') && value) {
                    flag = true;
                }

                return flag;
            },

            thumbOffset: function Slider$_valid_thumbOffset(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'number') || $KU.is(value, 'null')) {
                    flag = true;
                }

                return flag;
            },

            thumbWidth: function Slider$_valid_thumbWidth(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'number') && value >= 0) {
                    flag = true;
                }

                return flag;
            },

            viewType: function Slider$_valid_viewType(value) {
                var flag = false, options = [
                    constants.SLIDER_VIEW_TYPE_DEFAULT,
                    constants.SLIDER_VIEW_TYPE_PROGRESS
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
        Slider: {
            focusThumbImage: true,

            i18n_maxLabel: false,

            i18n_minLabel: false,

            leftSkin: function Slider$_view_leftSkin(el, old) {
                var $K = voltmx.$kwebfw$, $KW = $K.widget;

                $KW.removeSkin(old, el.min);
                $KW.addSkin(this.leftSkin, el.min);
            },

            max: function Slider$_view_max(el/*, old*/) {
                var $K = voltmx.$kwebfw$, $KD = $K.dom;

                $KD.setAttr(el.thumb, 'aria-valuemax', this.max);
            },

            maxLabel: function Slider$_view_maxLabel(el/*, old*/) {
                var $K = voltmx.$kwebfw$, $KD = $K.dom;

                $KD.text(el.maxLabel, this.maxLabel);

                if(this.maxLabel) {
                    $KD.removeAttr(el.maxLabel, 'hidden');
                } else {
                    $KD.setAttr(el.maxLabel, 'hidden', true);
                }
            },

            maxLabelSkin: function Slider$_view_maxLabelSkin(el, old) {
                var $K = voltmx.$kwebfw$, $KW = $K.widget;

                $KW.removeSkin(old, el.min);
                $KW.addSkin(this.maxLabelSkin, el.maxLabel);
            },

            min: function Slider$_view_min(el/*, old*/) {
                var $K = voltmx.$kwebfw$, $KD = $K.dom;

                $KD.setAttr(el.thumb, 'aria-valuemin', this.min);
            },

            minLabel: function Slider$_view_minLabel(el/*, old*/) {
                var $K = voltmx.$kwebfw$, $KD = $K.dom;

                $KD.text(el.minLabel, this.minLabel);

                if(this.minLabel) {
                    $KD.removeAttr(el.minLabel, 'hidden');
                } else {
                    $KD.setAttr(el.minLabel, 'hidden', true);
                }
            },

            minLabelSkin: function Slider$_view_minLabelSkin(el, old) {
                var $K = voltmx.$kwebfw$, $KW = $K.widget;

                $KW.removeSkin(old, el.min);
                $KW.addSkin(this.minLabelSkin, el.minLabel);
            },

            onSelection: true,

            onSlide: true,

            orientation: false,

            retainFlowHorizontalAlignment : false,

            rightSkin: function Slider$_view_rightSkin(el, old) {
                var $K = voltmx.$kwebfw$, $KW = $K.widget;

                $KW.removeSkin(old, el.max);
                $KW.addSkin(this.rightSkin, el.max);
            },

            selectedValue: function Slider$_view_selectedValue(el/*, old*/) {
                var $K = voltmx.$kwebfw$, $KD = $K.dom, $KW = $K.widget, min = this.min,
                    value = this.selectedValue, percent = 0, max = this.max;

                if(max - min !== 0){
                    percent = ((100 / (max - min)) * (value - min));
                }

                if(percent < 0) percent = 0;
                if(percent > 100) percent = 100;

                this._kwebfw_.percent = percent;

                if(this.orientation === constants.SLIDER_HORIZONTAL_ORIENTATION) {
                    $KD.style(el.min, 'width', (percent+'%'));

                    if($KW.shouldApplyRTL(this, 'layoutAlignment')) {
                        $KD.style(el.thumb, 'left', ((100 - percent)+'%'));
                    } else {
                        $KD.style(el.thumb, 'left', (percent+'%'));
                    }

                    $KD.style(el.max, 'width', ((100-percent)+'%'));
                } else if(this.orientation === constants.SLIDER_VERTICAL_ORIENTATION) {
                    $KD.style(el.min, 'height', (percent+'%'));
                    $KD.style(el.thumb, 'bottom', (percent+'%'));
                    $KD.style(el.max, 'height', ((100-percent)+'%'));
                }

                $KD.setAttr(el.thumb, 'aria-valuenow', value);
            },

            step: true,

            thickness: function Slider$_view_thickness(el/*, old*/) {
                var $K = voltmx.$kwebfw$, $KD = $K.dom;

                if(this.orientation === constants.SLIDER_HORIZONTAL_ORIENTATION) {
                    $KD.style(el.slider, {height:(this.thickness+'px')});
                } else if(this.orientation === constants.SLIDER_VERTICAL_ORIENTATION) {
                    $KD.style(el.slider, {width:(this.thickness+'px')});
                }
            },

            thumbHeight: function Slider$_view_thumbHeight(el/*, old*/) {
                var $K = voltmx.$kwebfw$, $KD = $K.dom;


                $KD.style(el.thumb, {height:(this.thumbHeight+'px')});
            },

            thumbImage: function Slider$_view_thumbImage(el/*, old*/) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, $KD = $K.dom;

                $KD.setAttr(el.thumb, 'src', $KU.getImageURL(this.thumbImage));
            },

            thumbOffset: function Slider$_view_thumbOffset(el/*, old*/) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, $KD = $K.dom;

                if(this.orientation === constants.SLIDER_HORIZONTAL_ORIENTATION) {
                    if($KU.is(this.thumbOffset, 'null')) {
                        $KD.style(el.thumb, {transform: 'translate(-50%, -50%)'});
                    } else {
                        $KD.style(el.thumb, {transform: 'translate('+this.thumbOffset+'px, -50%)'});
                    }
                } else if(this.orientation === constants.SLIDER_VERTICAL_ORIENTATION) {
                    if($KU.is(this.thumbOffset, 'null')) {
                        $KD.style(el.thumb, {transform: 'translate(-50%, 50%)'});
                    } else {
                        $KD.style(el.thumb, {transform: 'translate(-50%, '+this.thumbOffset+'px)'});
                    }
                }
            },

            thumbWidth: function Slider$_view_thumbWidth(el/*, old*/) {
                var $K = voltmx.$kwebfw$, $KD = $K.dom;

                $KD.style(el.thumb, {width:(this.thumbWidth+'px')});
            },

            viewType: function Slider$_view_viewType(el/*, old*/) {
                var $K = voltmx.$kwebfw$, $KD = $K.dom;

                if(this.viewType === constants.SLIDER_VIEW_TYPE_PROGRESS) {
                    $KD.setAttr(el.thumb, 'hidden', true);
                } else if(this.viewType === constants.SLIDER_VIEW_TYPE_DEFAULT) {
                    $KD.removeAttr(el.thumb, 'hidden');
                }
            }
        }
    };


    Object.defineProperty(voltmx.ui, 'Slider', {configurable:false, enumerable:false, writable:false, value:(function() {
        var $K = voltmx.$kwebfw$;


        /**
         * voltmx.ui.Slider constructor.
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
        var Slider = function Slider(bconfig, lconfig, pspconfig) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils, self = this,
                dependentPropertiesValidationMessage = '', prop = null, p = null;

            if(!$KU.is(bconfig, 'object')) bconfig = {};

            if(!bconfig.isPreValidated) {
                prop = {
                    focusThumbImage: '',
                    i18n_maxLabel: '',
                    i18n_minLabel: '',
                    leftSkin: 'slSliderLeftBlue',
                    max: 100, //Must be a non-decimal (+/-) value
                    maxLabel: '',
                    maxLabelSkin: 'slSliderRightBlue',
                    min: 0, //Must be a non-decimal (+/-) value
                    minLabel: '',
                    minLabelSkin: 'slSliderLeftBlue',
                    onSelection: null,
                    onSlide: null,
                    orientation: constants.SLIDER_HORIZONTAL_ORIENTATION,
                    retainFlowHorizontalAlignment: false,
                    rightSkin: 'slSliderRightBlue',
                    selectedValue: null, //must be a non-decimal (+/-) value
                    step: 1, //Must be a non-decimal (+) value
                    thickness: 15, //Must be between 1-25
                    thumbHeight: 21, //Must be a non-decimal (+) value
                    thumbImage: 'slider.png',
                    thumbOffset: null, //If provided, must be a non-decimal (+) value
                    thumbWidth: 20, //Must be a non-decimal (+) value
                    viewType: constants.SLIDER_VIEW_TYPE_DEFAULT
                };
            }

            _populateUnderscore.Slider.call(this);

            if(!$KU.is(bconfig.id, 'string') || !bconfig.id) {
                bconfig.id = (this._kwebfw_.name + $KU.uid());
            }

            Slider.base.call(this, bconfig, lconfig, pspconfig);

            if(!bconfig.isPreValidated) {
                if($KU.is(_dependentPropertiesValidationMessage.Slider, 'function')) {
                    dependentPropertiesValidationMessage = _dependentPropertiesValidationMessage.Slider.call(this, prop, bconfig, lconfig, pspconfig);
                }
            }

            if(dependentPropertiesValidationMessage) {
                throw new Error(dependentPropertiesValidationMessage);
            } else {
                if(!bconfig.isPreValidated) {
                    //Defaulting to platfom values specific to Slider
                    $KU.each(prop, function(value, key) {
                        var $K = voltmx.$kwebfw$, $KU = $K.utils,
                            $KW = $K.widget, valid = false, message = '';

                        if(!Object.prototype.hasOwnProperty.call(bconfig, key)) {
                            bconfig[key] = value;
                        } else if($KW.getNonConstructorProperties(self._kwebfw_.name).indexOf(key) >= 0) {
                            throw new Error('<' + key + '> is a non-constructor property of <' + self._kwebfw_.ns + '> class.');
                        } else if(!$KU.is(_valid.Slider[key], 'function')) {
                            throw new Error('<' + key + '> is available in default widget properties of <voltmx.ui.Slider>, but not in <_valid.Slider> namespace.');
                        } else {
                            valid = _valid.Slider[key].call(self, bconfig[key]);
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

                //Defining Getters/Setters specific to Slider
                $KU.each(_view.Slider, function(value, key) {
                    var $K = voltmx.$kwebfw$, $KU = $K.utils;

                    $KU.defineProperty(self._kwebfw_.prop, key, bconfig[key], {configurable:false, enumerable:true, writable:true});

                    $KU.defineGetter(self, key, function Slider$_getter() {
                        var $K = voltmx.$kwebfw$, $KU = $K.utils;

                        if($KU.is(_getter.Slider[key], 'function')) {
                            return _getter.Slider[key].call(this, this._kwebfw_.prop[key]);
                        }
                        return this._kwebfw_.prop[key];
                    }, true);

                    $KU.defineSetter(self, key, function Slider$_setter(val) {
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
                                valid = _valid.Slider[key].call(this, val);
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

                                    if($KU.is(_setter.Slider[key], 'function')) {
                                        _setter.Slider[key].call(this, old);
                                    }

                                    if(_relayoutActiveTriggerer.Slider().indexOf(key) >= 0) {
                                        $KW.markRelayout(this);
                                    }

                                    if(_relayoutPassiveTriggerer.Slider().indexOf(key) >= 0) {
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

                    if($KU.is(p.selectedValue, undefined)) p.selectedValue = null;
                }

                if($KU.is(_postInitialization.Slider, 'function')) {
                    _postInitialization.Slider.call(this);
                }
            }

            pspconfig = lconfig = bconfig = null; //For GC
        };


        $K.utils.inherits(Slider, voltmx.ui.BasicWidget);


        /**
         * Takes care of flushing out the widget reference to clean memory.
         *
         * @override
         * @access      protected
         * @method      _flush
         * @memberof    voltmx.ui.Slider
         * @author      Goutam Sahu <goutam.sahu@voltmx.com>
         *
         * @returns     void
         */
        var slider__flush = function Slider$_flush() {
            var $super = voltmx.ui.Slider.base.prototype,
                $K = voltmx.$kwebfw$, $KW = $K.widget, $KD = $K.dom, el = $KW.el(this);

            el.thumb && $KD.off(el.thumb); //Remove all event listeners to avoid memory leaks
            $super._flush.call(this);
        };


        /**
         * Builds the view layer for voltmx.ui.Slider widget.
         *
         * @override
         * @access      protected
         * @method      _render
         * @memberof    voltmx.ui.Slider
         * @author      Goutam Sahu <goutam.sahu@voltmx.com>
         *
         * @returns     {HTMLElement} – Slider view.
         */
        var slider__render = function Slider$_render(tag) {
            var $super = voltmx.ui.Slider.base.prototype, _ = this._kwebfw_,
                view = _.view, min = null, $K = voltmx.$kwebfw$, $KW = $K.widget,
                $KD = $K.dom, seekbar = null, slider = null, max = null,
                minLabel = null, maxLabel = null, thumb = null, el = $KW.el(view),
                dir = constants.WIDGET_DIRECTION_LTR;

            if($KW.shouldApplyRTL(this, 'layoutAlignment')) {
                dir = constants.WIDGET_DIRECTION_RTL;
            }

            if(this.isVisible || $K.F.RIVW) {
                if(!view) {
                    slider = $KD.create('DIV', {kr:'slider', ko:this.orientation});
                    minLabel = $KD.create('DIV', {kr:'min-label'});
                    seekbar = $KD.create('DIV', {kr:'seekbar'});
                    min = $KD.create('DIV', {kr:'min'});
                    max = $KD.create('DIV', {kr:'max'});
                    maxLabel = $KD.create('DIV', {kr:'max-label'});
                    thumb = $KD.create('IMG', {
                        kr:'thumb', loading:'lazy'
                    });
                    $KD.on(thumb, 'mousedown', 'image', function(e) {
                        $KD.preventDefault(e);
                    });
                    $KD.setAttr(seekbar, 'kwh-click', 'onClick');
                    $KD.setAttr(thumb, 'role', 'slider');
                    //DONOT DELETE THIS LINE:: $KD.setAttr(thumb, 'kwg', 'Slider');
                    $KD.setAttr(thumb, 'kwh-keydown', 'onKeyDown');
                    $KD.setAttr(thumb, 'kwh-keyup', 'onKeyUp');
                    $KD.setAttr(thumb, 'kwh-mousedown', 'onTouchStart');
                    $KD.setAttr(thumb, 'kwh-mouseup', 'onTouchEnd');
                    $KD.setAttr(thumb, 'kwh-touchstart', 'onTouchStart');
                    $KD.setAttr(thumb, 'kwh-touchend', 'onTouchEnd');
                    $KD.setAttr(thumb, 'aria-orientation', this.orientation);

                    $KD.add(slider, minLabel);
                    $KD.add(slider, seekbar);
                    $KD.add(seekbar, min);
                    $KD.add(seekbar, max);
                    $KD.add(seekbar, thumb);
                    $KD.add(slider, maxLabel);

                    view = $super._render.call(this, tag, [slider]);

                    $KD.setAttr(view, 'kdir', dir);

                    el = $KW.el(view);

                    _view.Slider.thickness.call(this, el, this.thickness);
                    _view.Slider.minLabelSkin.call(this, el, this.minLabelSkin);
                    _view.Slider.leftSkin.call(this, el, this.leftSkin);
                    _view.Slider.rightSkin.call(this, el, this.rightSkin);
                    _view.Slider.maxLabelSkin.call(this, el, this.maxLabelSkin);
                    _view.Slider.thumbOffset.call(this, el, this.thumbOffset);
                    _view.Slider.thumbHeight.call(this, el, this.thumbHeight);
                    _view.Slider.thumbWidth.call(this, el, this.thumbWidth);
                    _view.Slider.thumbImage.call(this, el, this.thumbImage);
                    _view.Slider.viewType.call(this, el, this.viewType);
                    _view.Slider.selectedValue.call(this, el, this.selectedValue);

                    _registerSlideGesture.call(this, el.thumb);
                }

                _view.Slider.minLabel.call(this, el, this.minLabel);
                _view.Slider.maxLabel.call(this, el, this.maxLabel);

                $KW.accessibility(this);
            }

            return view;
        };


        $K.defVoltmxProp(Slider.prototype, [
            {keey:'_flush', value:slider__flush},
            {keey:'_render', value:slider__render}
        ]);


        return Slider;
    }())});
}());
