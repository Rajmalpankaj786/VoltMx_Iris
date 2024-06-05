Object.defineProperty(voltmx.$kwebfw$, 'Animator', {configurable:false, enumerable:false, writable:false, value:(function() {
    var $K = voltmx.$kwebfw$, _isPresent = {transform:false, anchorPoint:false}, _vendor = null;


    var _calculateSizeAndUnit = function $K_Anim_calculateSizeAndUnit(value, unit) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, data = {value:-1, unit:''};

        if($KU.is(value, 'number')) {
            data.unit = unit;
            data.value = value;
        } else {
            value = value.toLowerCase();

            if(value.indexOf('%') > 0
            || value.indexOf('dp') > 0
            || value.indexOf('px') > 0) {
                if(value.indexOf('%') > 0) unit = '%';
                if(value.indexOf('dp') > 0) unit = 'dp';
                if(value.indexOf('px') > 0) unit = 'px';

                data.unit = unit;
                data.value = value.replace(unit, '');
                data.value = parseFloat(data.value, 10);
            }
        }

        if(unit === 'px') {
            data.value = (data.value/$K.device.DPI);
        } else if(unit === 'dp') {
            data.unit = 'px';
        }

        return data;
    };


    var _createKeyFrames = function $K_Anim_createKeyFrames(widget, name, keyframes, animType, animateHeightOnly) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget, cssRule = '', keyframesSum = {};

        cssRule += ('@'+_vendor.prefix+'keyframes ' + name + '{');

        $KU.each(keyframes, function(stepConfig, step) {
            cssRule += (step + '%{');

            if([
                voltmx.anim.EASE,
                voltmx.anim.EASE_IN,
                voltmx.anim.EASE_IN_OUT,
                voltmx.anim.EASE_OUT,
                voltmx.anim.LINEAR
            ].indexOf(stepConfig.timingFunction) === -1) {
                stepConfig.timingFunction = voltmx.anim.EASE;
            }
            if(animateHeightOnly) {
                stepConfig = stepConfig.height ? {height: stepConfig.height} : {};
            } else {
                //delete postion properties from stepconfig in case of template animations
                $KU.each(stepConfig, function(value, key) {
                    if(widget._kwebfw_.is.template && animType === 'rowAnimation'
                       && ($KW.getFlexProperties().indexOf(key) > -1)) {
                        delete stepConfig[key];
                    }
                });
            }
            //merge keyframesSum with stepConfig
            $KU.each(keyframesSum, function(value, key) {
                if(!Object.prototype.hasOwnProperty.call(stepConfig, key)) {
                    stepConfig[key] = value;
                }
            });
            keyframesSum = stepConfig;
            keyframes[step] = stepConfig;
            $KU.each(stepConfig, function(value, key) {
                if($KU.is(_style[key], 'function')) {
                    cssRule += _style[key](value, widget);
                } else {
                    cssRule += (key + ':' + value + ';');
                }
            });

            if(_isPresent.transform && !_isPresent.anchorPoint) {
                cssRule += (_vendor.prefix+'transform-origin:50% 50%;');
            }

            cssRule += '}';

            _isPresent = {transform:false, anchorPoint:false};
        });

        return (cssRule + '}');
    };


    var _getAnimStyleSheet = function $K_Anim_getAnimStyleSheet() {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, stylesheet = null;

        $KU.each(document.styleSheets, function(sheet) {
            var link = sheet.ownerNode;

            if(link.tagName === 'LINK' && link.getAttribute('kfwss') === 'voltmx') {
                if(link.href.indexOf('anim.css') >= 0) {
                    stylesheet = sheet;
                    return true;
                }
            }
        });

        return stylesheet;
    };


    var _serializeKeyFrames = function $K_Anim_serializeKeyFrames(keyframes) {
        return JSON.stringify(keyframes, function(key, value) {
            var $K = voltmx.$kwebfw$, t = null;

            if(key === 'transform' && value instanceof $K.Transform) {
                t = value.transform;

                return {
                    rotate: t.rotate,
                    scale: t.scale,
                    perspective: t.perspective,
                    translate: t.translate
                };
            }
            return value;
        });
    };


    var _style = {
        anchorPoint: function $K_Anim_style_anchorPoint(value) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils, rule = '';

            if($KU.is(value, 'object') && $KU.is(value.x, 'number') && $KU.is(value.y, 'number')
            && value.x >= 0 && value.x <= 1 && value.y >= 0 && value.y <= 1) {
                _isPresent.anchorPoint = true;
                rule = (_vendor.prefix + 'transform-origin:' + (value.x*100) + '% ' + (value.y*100) + '%;');
            }

            return rule;
        },

        backgroundColor: function $K_Anim_style_backgroundColor(value) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils, background = '', rule = '';

            if($KU.is(value, 'color')) {
                background = $KU.convertHexToRGBA(value);
                rule = 'background-color:' + background + ';';
            }

            return rule;
        },

        borderColor: function $K_Anim_style_borderColor(value) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils, rule = '', border = '';

            if($KU.is(value, 'color')) {
                border = $KU.convertHexToRGBA(value);
                rule = 'border-color:' + border + ';';
            }

            return rule;
        },

        borderWidth: function $K_Anim_style_borderWidth(value) {
            return ('border-width:' + value + 'px;');
        },

        bottom: function $K_Anim_style_bottom(value, widget) {
            var $K = voltmx.$kwebfw$, $KW = $K.widget, $KU = $K.utils, rule = '', key = '', data,
                parent = $KW.pmodel(widget), layout = $KW.layout(parent), msg ='';

            data = _calculateSizeAndUnit(value, widget._kwebfw_.layoutUnit);
            key = (['fflex', 'hflex'].indexOf(layout) >= 0) ? 'bottom' : 'margin-bottom';

            if(layout !== voltmx.flex.RESPONSIVE_GRID) {
                rule = (key + ':' + data.value + data.unit + ';');
            } else {
                rule = '';
            }

            if(data.unit === '%' && data.value !== 0
            && ['hflex', 'vflex'].indexOf(layout) >= 0) {
                msg += 'KFW-ANIM:: Animation doesn\'t work, if widget\'s ';
                msg += 'bottom is in %, inside parent with ';
                if(layout === 'hflex') msg += 'FlowHorizontal';
                if(layout === 'vflex') msg += 'FlowVertical';
                msg += ' layout.';

                $KU.log('warn', msg+' <<'+widget._kwebfw_.wap+'>>');
            }

            return rule;
        },

        centerX: function $K_Anim_style_centerX(value, widget) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils, msg = '';

            $KU.log('warn', msg+'KFW-ANIM:: Animation is skipped on widget\'s centerX property. <<'+widget._kwebfw_.wap+'>>');

            return '';
        },

        centerY: function $K_Anim_style_centerY(value, widget) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils, msg = '';

            $KU.log('warn', msg+'KFW-ANIM:: Animation is skipped on widget\'s centerY property. <<'+widget._kwebfw_.wap+'>>');

            return '';
        },

        cornerRadius: function $K_Anim_style_cornerRadius(value) {
            return ('border-radius:' + value + ';');
        },

        height: function $K_Anim_style_height(value, widget) {
            var rule = '', data = null;

            data = _calculateSizeAndUnit(value, widget._kwebfw_.layoutUnit);

            rule = ('height:' + data.value + data.unit + ';');

            return rule;
        },

        left: function $K_Anim_style_left(value, widget) {
            var $K = voltmx.$kwebfw$, $KW = $K.widget, rule = '', data = null, key = '',
                parent = $KW.pmodel(widget), layout = $KW.layout(parent);
            if(layout !== voltmx.flex.RESPONSIVE_GRID) {
                data = _calculateSizeAndUnit(value, widget._kwebfw_.layoutUnit);
                key = (layout === 'fflex') ? 'left' : 'margin-left';
                rule = (key + ':' + data.value + data.unit + ';');
            } else {
                rule = '';
            }

            return rule;
        },

        margintop: function $K_Anim_style_margintop(value) {
            return ('margin-top:' + value + 'px;');
        },

        maxHeight: function $K_Anim_style_maxHeight(value, widget) {
            var rule = '', data = null;

            data = _calculateSizeAndUnit(value, widget._kwebfw_.layoutUnit);

            rule = ('max-height:' + data.value + data.unit + ';');

            return rule;
        },

        maxWidth: function $K_Anim_style_maxWidth(value, widget) {
            var $K = voltmx.$kwebfw$, $KW = $K.widget, rule = '', data = null,
                parent = $KW.pmodel(widget), layout = $KW.layout(parent);
            if(layout !== voltmx.flex.RESPONSIVE_GRID) {
                data = _calculateSizeAndUnit(value, widget._kwebfw_.layoutUnit);
                rule = ('max-width:' + data.value + data.unit + ';');
            } else {
                rule = '';
            }
            return rule;
        },

        minHeight: function $K_Anim_style_minHeight(value, widget) {
            var rule = '', data = null;

            data = _calculateSizeAndUnit(value, widget._kwebfw_.layoutUnit);

            rule = ('min-height:' + data.value + data.unit + ';');

            return rule;
        },

        minWidth: function $K_Anim_style_minWidth(value, widget) {
            var $K = voltmx.$kwebfw$, $KW = $K.widget, rule = '', data = null,
                parent = $KW.pmodel(widget), layout = $KW.layout(parent);
            if(layout !== voltmx.flex.RESPONSIVE_GRID) {
                data = _calculateSizeAndUnit(value, widget._kwebfw_.layoutUnit);
                rule = ('min-width:' + data.value + data.unit + ';');
            } else {
                rule = '';
            }
            return rule;
        },

        right: function $K_Anim_style_right(value, widget) {
            var $K = voltmx.$kwebfw$, $KW = $K.widget, rule = '', data = null, key = '',
                parent = $KW.pmodel(widget), layout = $KW.layout(parent);
            if(layout !== voltmx.flex.RESPONSIVE_GRID) {
                data = _calculateSizeAndUnit(value, widget._kwebfw_.layoutUnit);
                key = (layout === 'fflex') ? 'right' : 'margin-right';
                rule = (key + ':' + data.value + data.unit + ';');
            } else {
                rule = '';
            }

            return rule;
        },

        shadow: function $K_Anim_style_shadow(value) {
            return ('box-shadow:' + value + ';');
        },

        timingFunction: function $K_Anim_style_timingFunction(value) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils, rule = '';

            if($KU.is(value, 'string')) {
                rule = (_vendor.prefix + 'animation-timing-function:' + value + ';');
            } else {
                rule = (_vendor.prefix + 'animation-timing-function:cubic-bezier(' + value + ');');
            }

            return rule;
        },

        top: function $K_Anim_style_top(value, widget) {
            var $K = voltmx.$kwebfw$, $KW = $K.widget, $KU = $K.utils, rule = '', data = null, key = '',
                parent = $KW.pmodel(widget), layout = $KW.layout(parent), msg = '';

            data = _calculateSizeAndUnit(value, widget._kwebfw_.layoutUnit);
            key = (['fflex', 'hflex'].indexOf(layout) >= 0) ? 'top' : 'margin-top';
            if(layout !== voltmx.flex.RESPONSIVE_GRID) {
                rule = (key + ':' + data.value + data.unit + ';');
            } else {
                rule = '';
            }

            if(data.unit === '%' && data.value !== 0 && layout === 'vflex') {
                msg += 'KFW-ANIM:: Animation doesn\'t work, if widget\'s ';
                msg += 'top is in %, inside parent with FlowVertical layout.';

                $KU.log('warn', msg+' <<'+widget._kwebfw_.wap+'>>');
            }

            return rule;
        },

        transform: function $K_Anim_style_transform(value) {
            var rule = '';

            if(value) {
                _isPresent.transform = true;

                rule += value.perspective;
                rule += value.scale;
                rule += value.translate;
                rule += value.rotate;

                if(rule) {
                    rule = (rule.substr(0, (rule.length-1)) + ';');
                }
            }

            return (rule) ? (_vendor.prefix + 'transform:' + rule + ';') : '';
        },

        width: function $K_Anim_style_width(value, widget) {
            var $K = voltmx.$kwebfw$, $KW = $K.widget, rule = '', data = null,
                parent = $KW.pmodel(widget), layout = $KW.layout(parent);
            if(layout !== voltmx.flex.RESPONSIVE_GRID) {
                data = _calculateSizeAndUnit(value, widget._kwebfw_.layoutUnit);
                rule = ('width:' + data.value + data.unit + ';');
            } else {
                rule = '';
            }

            return rule;
        },

        zIndex: function $K_Anim_style_zIndex(value) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils, rule = '';

            if($KU.is(value, 'integer') && value <= 2147482647) {
                rule = ('z-index:' + value + ';');
            }

            return rule;
        }
    };


    var _validKeyFrames = function $K_Anim_validKeyFrames(keyframes) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = true;

        if($KU.is(keyframes, 'object')) {
            $KU.each(keyframes, function(value, key) {
                var step = parseFloat(key);

                if(step < 0 || step > 100) {
                    flag = false;
                    return true;
                } else if(key === '100' && !$KU.is(value, 'object')) {
                    flag = false;
                    return true;
                }
            });
        }

        return flag;
    };


    var Animator = function Animator(keyframes) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils;

        if(_validKeyFrames(keyframes)) {
            $KU.defineProperty(this, 'keyframes', _serializeKeyFrames(keyframes), null);
        } else {
            $KU.defineProperty(this, 'keyframes', '', null);
            throw new Error('Invalid animDefinition passed.');
        }
    };


    var animator_animate = function Animator$animate(widget, config, callback, animType, animateHeightOnly) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget, cssRule = null,
            $KD = $K.dom, _ = null, animStyleSheet = null, animName = '', animEl = null,
            animStyle = '', keyframes = null, browser = '', meta = {
                delay: 0,
                direction: voltmx.anim.DIRECTION_NONE,
                duration: 0,
                fillMode: voltmx.anim.FILL_MODE_NONE,
                iterationCount: 1
            };

        if(arguments.length === 1) {
            config = JSON.parse(this.config);
            callback = {
                animationEnd: this.onEnd,
                animationStart: this.onStart
            };
        } else {
            //START:: Argument validation
            if($KU.is(this.widget, 'null')) {
                this.widget = widget._kwebfw_.uid;
            }

            if($KU.is(config, 'object')) {
                if($KU.is(config.delay, 'number') && config.delay > 0) {
                    meta.delay = config.delay;
                }

                if([voltmx.anim.DIRECTION_ALTERNATE].indexOf(config.direction) != -1) {
                    meta.direction = config.direction;
                }

                if($KU.is(config.duration, 'number') && config.duration > 0) {
                    meta.duration = config.duration;
                }

                if([voltmx.anim.FILL_MODE_BACKWARDS, voltmx.anim.FILL_MODE_BOTH, voltmx.anim.FILL_MODE_FORWARDS].indexOf(config.fillMode) != -1) {
                    meta.fillMode = config.fillMode;
                }

                if($KU.is(config.iterationCount, 'integer') && config.iterationCount >= 0) {
                    meta.iterationCount = config.iterationCount || 'infinite';
                }
            }

            $KU.defineProperty(this, 'config', JSON.stringify(meta), null);
            config = JSON.parse(this.config);

            if($KU.is(callback, 'object') && !animateHeightOnly) {
                if($KU.is(callback.animationEnd, 'function')) {
                    this.onEnd = callback.animationEnd;
                } else {
                    this.onEnd = null;
                }

                if($KU.is(callback.animationStart, 'function')) {
                    this.onStart = callback.animationStart;
                } else {
                    this.onStart = null;
                }
            } else {
                this.onEnd = null;
                this.onStart = null;
            }

            callback = {
                animationEnd: this.onEnd,
                animationStart: this.onStart
            };
            //END:: Argument validation
        }

        if(this.keyframes && $KU.is(widget, 'widget')) {
            _ = widget._kwebfw_;

            if($KU.is(widget, 'widget', 'Image2') && !_.loaded) {
                _.animator = this;
            } else {
                if($KU.is(widget, 'widget', 'Image2')) {
                    delete _.animator;
                }

                if($KW.isRendered(widget)) {
                    if(!_vendor) {
                        browser = $KU.browser('name');
                        _vendor = {prefix:''};

                        if(['msie'].indexOf(browser) >= 0) {
                            _vendor.prefix = '-ms-';
                        }
                    }

                    keyframes = JSON.parse(this.keyframes);
                    animName = ('anim_' + $KU.uid());
                    animStyleSheet = _getAnimStyleSheet();
                    animStyle += (animName + ' ' + config.duration+'s ');
                    animStyle += (config.delay + 's ' + config.iterationCount + ' ');
                    animStyle += (config.direction + ' ' + config.fillMode);

                    cssRule = _createKeyFrames(widget, animName, keyframes, animType, animateHeightOnly);
                    animStyleSheet.insertRule(cssRule, animStyleSheet.cssRules.length);
                    if(animateHeightOnly) {
                        animEl = $KD.parent(_.view);
                    } else {
                        animEl = _.view;
                    }

                    $KD.on(animEl, 'animationstart', 'anim', function(/*e*/) {
                        //TODO:: More paramenters to be passed
                        callback.animationStart && callback.animationStart(widget);
                    });

                    $KD.on(animEl, 'animationend', 'anim', function(e) {
                        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget, $KD = $K.dom,
                            keyframe = null, fmodel = null, flexProps = [], otherProps = [], transformObj = null;

                        $KD.style(e.target, (_vendor.prefix+'animation'), null);
                        $KD.off(e.target, ['animationend', 'animationstart'], 'anim');

                        if(config.fillMode === voltmx.anim.FILL_MODE_FORWARDS
                        || config.fillMode === voltmx.anim.FILL_MODE_BOTH) {
                            if(config.direction === voltmx.anim.DIRECTION_NONE) {
                                keyframe = keyframes['100'];
                            } else if(config.direction === voltmx.anim.DIRECTION_ALTERNATE) {
                                keyframe = (config.iterationCount === 'infinite'
                                            || config.iterationCount % 2 === 0)
                                    ? keyframes['0'] : keyframes['100'];
                            }
                        }

                        if(keyframe) {
                            flexProps = $KW.getFlexProperties();
                            otherProps = ['zIndex', 'opacity', 'transform', 'anchorPoint', 'backgroundColor'];
                            fmodel = $KW.fmodel(widget);

                            $KU.each(keyframe, function(value, key) {
                                if(flexProps.indexOf(key) >= 0) {
                                    widget[key] = value;
                                }
                                if(otherProps.indexOf(key) >= 0) {
                                    if(key === 'transform') {
                                        transformObj = new voltmx.ui.makeAffineTransform();
                                        transformObj.transform = value;
                                        value = transformObj;
                                    }
                                    widget[key] = value;
                                }
                            });

                            fmodel && fmodel.forceLayout();
                        }

                        //TODO:: More paramenters to be passed
                        callback.animationEnd && callback.animationEnd(widget);
                    });

                    $KD.style(animEl, (_vendor.prefix+'animation'), animStyle);
                }
            }
        }
    };

    var animator_applyRowAnimation = function Animator$applyRowAnimation(elements, config, callbacks) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget,
            model = null;
        if($KU.is(callbacks, 'object')) {
            $KU.each(callbacks, function(cb, cbName) {
                if(cb) {
                    callbacks[cbName] = _decorateCallback(cb, elements.length);
                }
            });
        }

        $KU.each(elements, function(el/*, key*/) {
            model = $KW.model(el);
            this.animate(model, config, callbacks, 'rowAnimation');
            if(model._kwebfw_.is.template) {
                //template row height should apply on li. Treating the height animation separately
                this.animate(model, config, callbacks, 'rowAnimation', true);
            }
        }, this);

        return;
    };

    var _decorateCallback = function Animator$decorateCallback(callback, totalCount) {
        var counter = 0;
        var wrapper = function() {
            counter ++;
            if(counter === totalCount) {
                callback.apply(this, arguments);
            }
        };

        return wrapper;
    };

    $K.defVoltmxProp(Animator.prototype, [
        {keey:'animate', value: animator_animate},
        {keey:'applyRowAnimation', value: animator_applyRowAnimation}
    ]);


    return Animator;
}())});


Object.defineProperty(voltmx.$kwebfw$, 'Transform', {configurable:false, enumerable:false, writable:false, value:(function() {
    var $K = voltmx.$kwebfw$;


    var Transform = function Transform() {
        this.transform = {rotate:'', scale:'', perspective:'', translate:''};
        this.is3D = false;
    };


    var transform_rotate = function Transform$rotate(angle) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, rotate = '';

        if($KU.is(angle, 'number')) {
            if(this.is3D) {
                if(this.transform.scale.indexOf('3d') === -1
                && this.transform.translate.indexOf('3d') === -1) {
                    this.is3D = false;
                }
            }

            rotate = (angle <= 0) ? Math.abs(angle) : ('-' + angle);
            this.transform.rotate = ('rotate(' + rotate + 'deg) ');
        }

        return this;
    };


    var transform_rotate3D = function Transform$rotate3D(angle, x, y, z) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, rotate = '';

        if($KU.is(angle, 'number')) {
            this.is3D = true;
            rotate = (angle <= 0) ? Math.abs(angle) : ('-' + angle);
            this.transform.rotate = ('rotate3d(' + x + ', ' + y + ', ' + z + ', ' + rotate + 'deg) ');
        }

        return this;
    };


    var transform_scale = function Transform$scale(x, y) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils;

        if($KU.is(x, 'number') && $KU.is(y, 'number')) {
            if(this.is3D) {
                if(this.transform.rotate.indexOf('3d') === -1
                && this.transform.translate.indexOf('3d') === -1) {
                    this.is3D = false;
                }
            }

            this.transform.scale = ('scale(' + x + ', ' + y + ') ');
        }

        return this;
    };


    var transform_scale3D = function Transform$scale3D(x, y, z) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils;

        if($KU.is(x, 'number') && $KU.is(y, 'number') && $KU.is(z, 'number')) {
            this.is3D = true;
            this.transform.scale = ('scale3d(' + x + ', ' + y + ', ' + z + ') ');
        }

        return this;
    };


    var transform_setPerspective = function Transform$setPerspective(p) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils;

        if($KU.is(p, 'number') && p > 0) {
            this.transform.perspective = ('perspective(' + p + 'px) ');
        }

        return this;
    };


    var transform_translate = function Transform$translate(x, y) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils;

        if($KU.is(x, 'number') && $KU.is(y, 'number')) {
            if(this.is3D) {
                if(this.transform.rotate.indexOf('3d') === -1
                && this.transform.scale.indexOf('3d') === -1) {
                    this.is3D = false;
                }
            }

            this.transform.translate = ('translate(' + x + 'px, ' + y + 'px) ');
        }

        return this;
    };


    var transform_translate3D = function Transform$translate3D(x, y, z) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils;

        if($KU.is(x, 'number') && $KU.is(y, 'number') && $KU.is(z, 'number')) {
            this.is3D = true;
            this.transform.translate = ('translate3d(' + x + 'px, ' + y + 'px, ' + z + 'px) ');
        }

        return this;
    };


    $K.defVoltmxProp(Transform.prototype, [
        {keey:'rotate', value:transform_rotate},
        {keey:'rotate3D', value:transform_rotate3D},
        {keey:'scale', value:transform_scale},
        {keey:'scale3D', value:transform_scale3D},
        {keey:'setPerspective', value:transform_setPerspective},
        {keey:'translate', value:transform_translate},
        {keey:'translate3D', value:transform_translate3D}
    ]);


    return Transform;
}())});
