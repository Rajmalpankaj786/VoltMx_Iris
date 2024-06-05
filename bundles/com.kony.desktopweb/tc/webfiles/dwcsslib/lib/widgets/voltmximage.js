(function() {
    var $K = voltmx.$kwebfw$, _cache = {}; //e.g. _cache['image_name.png'] = {path:'', height:-1, width:-1}


    $K.defVoltmxProp($K.ui, [
        {keey:'Image2', value:{}, items:[
            {keey:'setupUIInteraction', value:function(dom, clone) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget,
                    $KD = $K.dom, tabindex = '';

                if($KW.disabled(this)) {
                    $KD.setAttr(dom, 'aria-disabled', true);
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


    //This function must be called in the scope of widget instance
    var _applyScaleMode = function() {
        var offset = this._kwebfw_.ui.offset;

        switch(this.imageScaleMode) {
            case constants.IMAGE_SCALE_MODE_CROP:
                _scaleMode.crop.call(this, offset.height, offset.width);
                break;

            case constants.IMAGE_SCALE_MODE_FIT_TO_DIMENSIONS:
                _scaleMode.fit.call(this, offset.height, offset.width);
                break;

            case constants.IMAGE_SCALE_MODE_MAINTAIN_ASPECT_RATIO:
                _scaleMode.maintain.call(this, offset.height, offset.width);
                break;
            default :
                throw new Error('SPADW: Invalid Scale Mode applied' + this.imageScaleMode);
        }
    };


    //All widget file must have this variable
    //All the functions will be called in the scope of widget instance
    var _dependentPropertiesValidationMessage = {};


    //All widget file must have this variable
    //All the functions will be called in the scope of widget instance
    var _getter = {
        Image2: {
            toolTip: function Image2$_getter_toolTip() {
                var $K = voltmx.$kwebfw$, $KU = $K.utils,
                    prop = this._kwebfw_.prop, toolTip = prop.toolTip;

                if(prop.i18n_toolTip) {
                    toolTip = $KU.getI18Nvalue(prop.i18n_toolTip);
                }

                return toolTip;
            }
        }


    };


    var _imageErrorHandler = function Image2$_imageErrorHandler(/*e*/) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget,
            $KD = $K.dom, model = $KW.model($KD.parent(this));

        if(model.imageWhenFailed) {
            this.src = $KU.getImageURL(model.imageWhenFailed);
        } else {
            $KW.fire(model, 'onDownloadComplete', model, {
                src: (model.base64 || model.src),
                isSuccess: false
            });
        }
    };


    var _imageLoadHandler = function Image2$_imageLoadHandler(/*e*/) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget, $KD = $K.dom,
            model = $KW.model($KD.parent(this)), _ = model._kwebfw_,
            el = $KW.el(model), src = this.src, fmodel = null,
            failedSrc = $KU.getImageURL(model.imageWhenFailed);

        if(src) {
            if(!_cache[src]) {
                _cache[src] = {
                    height:this.naturalHeight,
                    width:this.naturalWidth
                };
            }

            _.ui.offset.height = _cache[src].height;
            _.ui.offset.width = _cache[src].width;
        }

        if(model.base64 && src === ('data:image/png;base64,'+model.base64)) {
            _.ui.offset.height = this.naturalHeight;
            _.ui.offset.width = this.naturalWidth;
        }

        _applyScaleMode.call(model);
        $KD.style(el.node, 'background-image', null);
        $KD.style(el.image, 'visibility', null);

        if(!$KW.isFixedHeight(model) || !$KW.isFixedWidth(model)) {
            $KW.markRelayout(model);
            fmodel = $KW.model($K.app.currentFormUID);
            fmodel.forceLayout();
        }

        if(src !== failedSrc) {
            _.loaded = true;
            _.animator && _.animator.animate(model);
        }

        $KW.fire(model, 'onDownloadComplete', model, {
            src: (model.base64 || model.src),
            isSuccess: _.loaded
        });
    };


    //All widget file must have this variable
    //This functions will be called in the scope of widget instance
    var _populateUnderscore = {
        Image2: function Image2$_populateUnderscore() {
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
                    $KU.defineProperty(_, 'ns', 'voltmx.ui.Image2', null);
                }
            }
            if(!_.name) {
                if($KU.is(this.__$kwebfw$name__, 'string') && this.__$kwebfw$name__) {
                    $KU.defineProperty(_, 'name', this.__$kwebfw$name__, null);
                } else {
                    $KU.defineProperty(_, 'name', 'Image2', null);
                }
            }

            if(!_.ui) $KU.defineProperty(_, 'ui', {}, null);
            $KU.defineProperty(_, 'loaded', false, true);
            $KU.defineProperty(_.ui, 'offset', {width:-1, height:-1}, true);
        }
    };


    //All widget file must have this variable
    //This function will be called in the scope of widget instance
    var _postInitialization = {
        Image2: function Image2$_postInitialization() {
            var _ = this._kwebfw_, prop = _.prop;

            if(prop.i18n_toolTip) {
                prop.toolTip = prop.i18n_toolTip;
            }
        }
    };


    //All widget file must have this variable
    //This functions will be called in the scope of widget instance
    var _relayoutActiveTriggerer = {
        Image2: function Image2$_relayoutActiveTriggerer() {
            return [];
        }
    };


    //All widget file must have this variable
    //This functions will be called in the scope of widget instance
    var _relayoutPassiveTriggerer = {
        Image2: function Image2$_relayoutPassiveTriggerer() {
            return ['base64', 'src'];
        }
    };


    //All the functions will be called in the scope of widget instance
    var _scaleMode = {
        maintain: function(height, width) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget, $KD = $K.dom,
                el = $KW.el(this), referenceHeight = -1, referenceWidth = -1,
                view = null, frame = null, computedHeight = -1, computedWidth = -1;

            if($KU.is(height, 'number') && height >= 0
            && $KU.is(width, 'number') && width >= 0) {
                if($KW.isFixedHeight(this) || $KW.isFixedWidth(this)) {
                    view = this._kwebfw_.view;
                    frame = this._kwebfw_.prop.frame;

                    if(frame.width === -1 && $KW.isFixedWidth(this)) {
                        frame.width = view.offsetWidth;
                    }

                    if(frame.height === -1 && $KW.isFixedHeight(this)) {
                        frame.height = view.offsetHeight;
                    }
                }

                referenceWidth = ($KW.isFixedWidth(this)) ? frame.width : width;
                referenceHeight = ($KW.isFixedHeight(this)) ? frame.height : height;

                if(referenceHeight >= height && referenceWidth >= width) {
                    computedHeight = height;
                    computedWidth = width;
                } else {
                    computedHeight = ((height/width) * referenceWidth);

                    if(computedHeight <= referenceHeight) {
                        computedWidth = referenceWidth;
                    } else {
                        computedWidth = ((width/height) * referenceHeight);
                        computedHeight = referenceHeight;
                    }
                }

                $KD.style(el.image, {width:(computedWidth+'px'), height:(computedHeight+'px')});
            }
        },

        crop: function(/*height, width*/) {
            var $K = voltmx.$kwebfw$, $KW = $K.widget,
                $KD = $K.dom, el = $KW.el(this);

            $KD.style(el.image, {'max-width':'100%'});
        },

        fit: function(height, width) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget,
                $KD = $K.dom, el = $KW.el(this);

            if($KU.is(height, 'number') && height >= 0
            && $KU.is(width, 'number') && width >= 0) {
                if(!$KW.isFixedHeight(this)) {
                    $KD.style(el.node, 'height', (height+'px'));
                }
                if(!$KW.isFixedWidth(this)) {
                    $KD.style(el.node, 'width', (width+'px'));
                }

                $KD.style(el.image, {height:'100%', width:'100%'});
            }
        }
    };


    //All widget file must have this variable
    //All the functions will be called in the scope of widget instance
    var _setter = {
        Image2: {
            toolTip: function Image2$_setter_toolTip(/*old*/) {
                this._kwebfw_.prop.i18n_toolTip = '';
            }
        }
    };


    //All widget file must have this variable
    //All the functions will be called in the scope of widget instance
    //These function should always return a boolean value
    var _valid = {
        Image2: {
            base64: function Image2$_valid_base64(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'string')) {
                    flag = true;
                }

                return flag;
            },

            rawBytes: function Image2$_valid_rawBytes(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'string')) {
                    flag = true;
                }

                return flag;
            },

            imageScaleMode: function Image2$_valid_imageScaleMode(value) {
                var flag = false, options = [
                    constants.IMAGE_SCALE_MODE_CROP,
                    constants.IMAGE_SCALE_MODE_FIT_TO_DIMENSIONS,
                    constants.IMAGE_SCALE_MODE_MAINTAIN_ASPECT_RATIO
                ];

                if(options.indexOf(value) >= 0) {
                    flag = true;
                }

                return flag;
            },

            imageWhenFailed: function Image2$_valid_imageWhenFailed(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'string')) {
                    flag = true;
                }

                return flag;
            },

            imageWhileDownloading: function Image2$_valid_imageWhileDownloading(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'string')) {
                    flag = true;
                }

                return flag;
            },

            i18n_toolTip: function Image2$_valid_i18n_toolTip(value) {
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

            onDownloadComplete: function Image2$_valid_onDownloadComplete(value) {
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

            src: function Image2$_valid_src(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'string')) {
                    flag = true;
                }

                return flag;
            },

            toolTip: function Image2$_valid_toolTip(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'string')) {
                    flag = true;
                }

                return flag;
            },

            zoomEnabled: function Image2$_valid_zoomEnabled(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'boolean')) {
                    flag = true;
                }

                return flag;
            },

            zoomValue: function Image2$_valid_zoomValue(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'number') && value >= 1) {
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
        Image2: {
            base64: function Image2$_view_base64(el/*, old*/) {
                var $K = voltmx.$kwebfw$, $KD = $K.dom;

                this._kwebfw_.loaded = false;

                if(this.base64) {
                    $KD.setAttr(el.image, 'src', (this.base64).includes('data:image/png;base64') ? (this.base64) : ('data:image/png;base64,'+ this.base64));
                    $KD.setAttr(el.image, 'alt', '');
                } else {
                    $KD.removeAttr(el.image, 'src');
                    $KD.removeAttr(el.image, 'alt');
                }
            },

            rawBytes: function Image2$_view_rawBytes(el) {
                var $K = voltmx.$kwebfw$, $KD = $K.dom;

                this._kwebfw_.loaded = false;

                if(this.rawBytes) {
                    $KD.setAttr(el.image, 'src', (this.rawBytes).includes('data:image/png;base64') ? (this.rawBytes) : ('data:image/png;base64,'+ this.rawBytes));
                    $KD.setAttr(el.image, 'alt', '');
                } else {
                    $KD.removeAttr(el.image, 'src');
                    $KD.removeAttr(el.image, 'alt');
                }
            },

            imageScaleMode: function Image2$_view_imageScaleMode(/*el, old*/) {
                _applyScaleMode.call(this);
            },

            imageWhenFailed: true,

            imageWhileDownloading: true,

            i18n_toolTip: false,

            onDownloadComplete: true,

            src: function Image2$_view_src(el/*, old*/) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, $KD = $K.dom;

                this._kwebfw_.loaded = false;

                if(this.src) {
                    if(this.imageWhileDownloading) {
                        $KD.style(el.node, {
                            backgroundImage: ('url('+$KU.getImageURL(this.imageWhileDownloading)+')')
                        });
                    }

                    $KD.style(el.image, 'visibility', 'hidden');
                    $KD.setAttr(el.image, 'src', $KU.getImageURL(this.src));
                    $KD.setAttr(el.image, 'alt', '');
                } else {
                    $KD.style(el.node, 'background-image', null);
                    $KD.removeAttr(el.image, 'src');
                    $KD.removeAttr(el.image, 'alt');
                }
            },

            toolTip: function Image2$_view_toolTip(el/*, old*/) {
                var $K = voltmx.$kwebfw$, $KD = $K.dom;

                if(this.toolTip) {
                    $KD.setAttr(el.node, 'title', this.toolTip);
                } else {
                    $KD.removeAttr(el.node, 'title');
                }
            },

            zoomEnabled: true,

            zoomValue: true
        }
    };


    Object.defineProperty(voltmx.ui, 'Image2', {configurable:false, enumerable:false, writable:false, value:(function() {
        var $K = voltmx.$kwebfw$;


        /**
         * voltmx.ui.Image2 constructor.
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
        var Image2 = function Image2(bconfig, lconfig, pspconfig) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils, self = this,
                dependentPropertiesValidationMessage = '', prop = null;

            if(!$KU.is(bconfig, 'object')) bconfig = {};

            if(!bconfig.isPreValidated) {
                prop = {
                    base64: '',
                    rawBytes: '',
                    imageScaleMode: constants.IMAGE_SCALE_MODE_MAINTAIN_ASPECT_RATIO,
                    imageWhenFailed: '',
                    imageWhileDownloading: '',
                    i18n_toolTip: '',
                    onDownloadComplete: null,
                    src: 'imagedrag.png',
                    toolTip: '',
                    zoomEnabled: false,
                    zoomValue: 1
                };
            }

            _populateUnderscore.Image2.call(this);

            if(!$KU.is(bconfig.id, 'string') || !bconfig.id) {
                bconfig.id = (this._kwebfw_.name + $KU.uid());
            }

            Image2.base.call(this, bconfig, lconfig, pspconfig);

            if(!bconfig.isPreValidated) {
                if($KU.is(_dependentPropertiesValidationMessage.Image2, 'function')) {
                    dependentPropertiesValidationMessage = _dependentPropertiesValidationMessage.Image2.call(this, prop, bconfig, lconfig, pspconfig);
                }
            }

            if(dependentPropertiesValidationMessage) {
                throw new Error(dependentPropertiesValidationMessage);
            } else {
                if(!bconfig.isPreValidated) {
                    //Defaulting to platfom values specific to Image2
                    $KU.each(prop, function(value, key) {
                        var $K = voltmx.$kwebfw$, $KU = $K.utils,
                            $KW = $K.widget, valid = false, message = '';

                        if(!Object.prototype.hasOwnProperty.call(bconfig, key)) {
                            bconfig[key] = value;
                        } else if($KW.getNonConstructorProperties(self._kwebfw_.name).indexOf(key) >= 0) {
                            throw new Error('<' + key + '> is a non-constructor property of <' + self._kwebfw_.ns + '> class.');
                        } else if(!$KU.is(_valid.Image2[key], 'function')) {
                            throw new Error('<' + key + '> is available in default widget properties of <voltmx.ui.Image2>, but not in <_valid.Image2> namespace.');
                        } else {
                            valid = _valid.Image2[key].call(self, bconfig[key]);
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

                //Defining Getters/Setters specific to Image2
                $KU.each(_view.Image2, function(value, key) {
                    var $K = voltmx.$kwebfw$, $KU = $K.utils;

                    $KU.defineProperty(self._kwebfw_.prop, key, bconfig[key], {configurable:false, enumerable:true, writable:true});

                    $KU.defineGetter(self, key, function Image2$_getter() {
                        var $K = voltmx.$kwebfw$, $KU = $K.utils;

                        if($KU.is(_getter.Image2[key], 'function')) {
                            return _getter.Image2[key].call(this, this._kwebfw_.prop[key]);
                        }
                        return this._kwebfw_.prop[key];
                    }, true);

                    $KU.defineSetter(self, key, function Image2$_setter(val) {
                        var $K = voltmx.$kwebfw$, $KU = $K.utils, el = null,
                            old = null, valid = false, $KW = $K.widget,
                            rmodel = null, final = null, message = '';

                        if(value === false) {
                            throw new Error('<'+key+'> is a readonly property of <'+this._kwebfw_.ns+'> widget.');
                        } else if(this._kwebfw_.prop[key] !== val) {
                            rmodel = $KW.rmodel(this);

                            if(rmodel && rmodel._kwebfw_.is.template && !rmodel._kwebfw_.is.cloned) {
                                throw new Error('Cannot set any value of a widget, which is either a raw template or any of its widget.');
                            } else {
                                valid = _valid.Image2[key].call(this, val);
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

                                    if($KU.is(_setter.Image2[key], 'function')) {
                                        _setter.Image2[key].call(this, old);
                                    }

                                    if(_relayoutActiveTriggerer.Image2().indexOf(key) >= 0) {
                                        $KW.markRelayout(this);
                                    }

                                    if(_relayoutPassiveTriggerer.Image2().indexOf(key) >= 0) {
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

                if($KU.is(_postInitialization.Image2, 'function')) {
                    _postInitialization.Image2.call(this);
                }
            }

            pspconfig = lconfig = bconfig = null; //For GC
        };


        $K.utils.inherits(Image2, voltmx.ui.BasicWidget);


        /**
         * Takes care of flushing out the widget reference to clean memory.
         *
         * @override
         * @access      protected
         * @method      _flush
         * @memberof    voltmx.ui.Image2
         * @author      Goutam Sahu <goutam.sahu@voltmx.com>
         *
         * @returns     void
         */
        var image2__flush = function Image2$_flush() {
            var $super = voltmx.ui.Image2.base.prototype,
                $K = voltmx.$kwebfw$, $KW = $K.widget, $KD = $K.dom, el = $KW.el(this);

            if(el.image) {
                $KD.removeAttr(el.image, 'loading');
                $KD.off(el.image); //Remove all event listeners to avoid memory leaks
                $KD.style(el.image, 'visibility', null);
            }

            $super._flush.call(this);
        };


        /**
         * Builds the view layer for voltmx.ui.Image2 widget.
         *
         * @override
         * @access      protected
         * @method      _render
         * @memberof    voltmx.ui.Image2
         * @author      Goutam Sahu <goutam.sahu@voltmx.com>
         *
         * @returns     {HTMLElement} – Image2 view.
         */
        var image2__render = function Image2$_render(tag) {
            var $super = voltmx.ui.Image2.base.prototype, _ = this._kwebfw_,
                $K = voltmx.$kwebfw$, $KD = $K.dom, $KW = $K.widget,
                view = _.view, el = $KW.el(view), img = null, prop = _.prop;

            if(this.isVisible || $K.F.RIVW) {
                if(!view) {
                    img = $KD.create('IMG');
                    if(this.height !== voltmx.flex.USE_PREFERRED_SIZE) {
                        $KD.setAttr(img, 'loading', 'lazy');
                    }

                    $KD.on(img, 'mousedown', 'image', function(evt) {
                        $KD.preventDefault(evt);
                    });
                    $KD.on(img, 'load', 'image', _imageLoadHandler);
                    $KD.on(img, 'error', 'image', _imageErrorHandler);
                    view = $super._render.call(this, tag, [img]);

                    el = $KW.el(view);

                    if(prop.base64) {
                        _view.Image2.base64.call(this, el, this.base64);
                    } else {
                        _view.Image2.src.call(this, el, this.src);
                    }
                }

                _view.Image2.toolTip.call(this, el, this.toolTip);

                $KW.accessibility(this);
            }

            return view;
        };


        var image2_addOverlayWidgets = function Image2$addOverlayWidgets() {
            var $K = voltmx.$kwebfw$, $KW = $K.widget, final = null;

            //TODO:: addOverlayWidgets API

            if(_relayoutActiveTriggerer.Image2().indexOf('addOverlayWidgets') >= 0) {
                $KW.markRelayout(this);
            }

            if(_relayoutPassiveTriggerer.Image2().indexOf('addOverlayWidgets') >= 0) {
                final = this._kwebfw_.flex.final;

                if(!(final.height && final.width)) {
                    $KW.markRelayout(this);
                }
            }
        };

        /*eslint-disable  no-console*/
        var image2_cropToRect = function Image2$cropToRect() {
            console.warn('This Image method is not supported in SPA.');
        };


        var image2_getImageAsRawBytes = function Image2$getImageAsRawBytes() {
            console.warn('This Image method is not supported in SPA.');
        };


        var image2_getImageHeight = function Image2$getImageHeight() {
            console.warn('This Image method is not supported in SPA.');
        };


        var image2_getImageWidth = function Image2$getImageWidth() {
            console.warn('This Image method is not supported in SPA.');
        };
        /*eslint-enable no-console*/


        var image2_removeOverlayWidgets = function Image2$removeOverlayWidgets() {
            var $K = voltmx.$kwebfw$, $KW = $K.widget, final = null;

            //TODO:: removeOverlayWidgets API

            if(_relayoutActiveTriggerer.Image2().indexOf('removeOverlayWidgets') >= 0) {
                $KW.markRelayout(this);
            }

            if(_relayoutPassiveTriggerer.Image2().indexOf('removeOverlayWidgets') >= 0) {
                final = this._kwebfw_.flex.final;

                if(!(final.height && final.width)) {
                    $KW.markRelayout(this);
                }
            }
        };

        /*eslint-disable no-console*/
        var image2_scale = function Image2$scale() {
            console.warn('This Image method is not supported in SPA.');
        };
        /*eslint-enable no-console*/


        $K.defVoltmxProp(Image2.prototype, [
            {keey:'_flush', value:image2__flush},
            {keey:'_render', value:image2__render},
            {keey:'addOverlayWidgets', value:image2_addOverlayWidgets},
            {keey:'cropToRect', value:image2_cropToRect},
            {keey:'getImageAsRawBytes', value:image2_getImageAsRawBytes},
            {keey:'getImageHeight', value:image2_getImageHeight},
            {keey:'getImageWidth', value:image2_getImageWidth},
            {keey:'removeOverlayWidgets', value:image2_removeOverlayWidgets},
            {keey:'scale', value:image2_scale}
        ]);


        return Image2;
    }())});
}());
