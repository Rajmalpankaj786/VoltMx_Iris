(function() {
    var $K = voltmx.$kwebfw$;

    $K.defVoltmxProp($K.ui, [
        {keey:'Camera', value:{}, items:[
            {keey:'onClick', value:function(/*evt*/) {
                var $K = voltmx.$kwebfw$, $KW = $K.widget, el = $KW.el(this);
                if(!el.video.srcObject) {
                    this.openCamera();
                }
                return false;
            }},

            {keey:'setupUIInteraction', value:function(dom, clone) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils,
                    $KW = $K.widget, $KD = $K.dom, tabindex = '';

                if(!$KW.interactable(this)) {
                    if($KW.disabled(this)) {
                        $KD.setAttr(dom, 'aria-disabled', true);
                    }

                    $KD.setAttr(dom, 'tabindex', -1);
                    $KD.addCls(this._kwebfw_.view, '-voltmx-blocker');
                } else {
                    tabindex = $KW.tabIndex(this, clone);
                    $KD.removeAttr(dom, 'aria-disabled');
                    $KD.removeCls(this._kwebfw_.view, '-voltmx-blocker');

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
    var _dataAvailableCreateBlob = function Camera$_dataAvailableCreateBlob(callback) {
        var _ = this._kwebfw_;
        _.Recorder.ondataavailable = function(e) {
            _.videoData.push(e.data);
            if(_.Recorder && _.Recorder.state === 'inactive') {
                _.blob = new Blob(_.videoData, {type:'video/mp4'});
                _.videoUrl = URL.createObjectURL(_.blob);
                //eslint-disable-next-line no-console
                console.log(_.videoUrl);
                _.Recorder = null;
                callback && callback(this, _.videoUrl);
            }
        };
    };

    var _dependentPropertiesValidationMessage = {};

    var _getter = {
        Camera: {
            //
        }
    };

    var _populateUnderscore = {
        Camera: function Camera$_populateUnderscore() {
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
                    $KU.defineProperty(_, 'ns', 'voltmx.ui.Camera', null);
                }
            }
            if(!_.name) {
                if($KU.is(this.__$kwebfw$name__, 'string') && this.__$kwebfw$name__) {
                    $KU.defineProperty(_, 'name', this.__$kwebfw$name__, null);
                } else {
                    $KU.defineProperty(_, 'name', 'Camera', null);
                }
            }
        }
    };

    var _postInitialization = {};

    var _relayoutActiveTriggerer = {
        Camera: function Camera$_relayoutActiveTriggerer() {
            return [];
        }
    };

    var _relayoutPassiveTriggerer = {
        Camera: function Camera$_relayoutPassiveTriggerer() {
            return [];
        }
    };

    var _setter = {
        Camera: {
            //
        }
    };

    //All widget file must have this variable
    //All the functions will be called in the scope of widget instance
    //These function should always return a boolean value
    var _valid = {
        Camera: {
            cameraSource: function Camera$_valid_camerSource(value) {
                var flag = false, options = [
                    constants.CAMERA_SOURCE_DEFAULT,
                    constants.CAMERA_SOURCE_FRONT,
                    constants.CAMERA_SOURCE_REAR
                ];

                if(options.indexOf(value) >= 0) {
                    flag = true;
                }

                return flag;
            },

            poster: function Camera$_valid_poster(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'string')) {
                    flag = true;
                }

                return flag;
            },

            rawBytes: function Camera$_valid_rawBytes(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'string')) {
                    flag = true;
                }

                return flag;
            },

            base64: function Camera$_valid_base64(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'string')) {
                    flag = true;
                }

                return flag;
            },

            videoDuration: function Camera$_valid_videoDuration(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'number') || ($KU.is(value, 'null'))) {
                    flag = true;
                }

                return flag;
            },

            onCapture: function Camera$_valid_onCapture(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'function') || $KU.is(value, 'null')) {
                    flag = true;
                }

                return flag;
            },

            onCaptureFailed: function Camera$_valid_onCaptureFailed(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'function') || $KU.is(value, 'null')) {
                    flag = true;
                }

                return flag;
            },

            onFailure: function Camera$_valid_onFailure(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'function') || $KU.is(value, 'null')) {
                    flag = true;
                }

                return flag;
            }
        }
    };

    //All widget file must have this variable
    //All the functions will be called in the scope of widget instance
    //Any property here, which is set to 'false', will not create a setter
    var _view = {
        Camera: {
            poster: function Camera$_view_poster(/*el, old*/) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, $KD = $K.dom,
                    $KW = $K.widget, video = $KW.el(this, 'video');

                if(this.poster && video) {
                    $KD.setAttr(video, 'poster', $KU.getImageURL(this.poster));
                }
            },

            cameraSource: true,

            rawBytes: true,

            base64: true,

            onCapture:true,

            onCaptureFailed:true,

            onFailure:true,

            videoDuration: true
        }
    };

    Object.defineProperty(voltmx.ui, 'Camera', {configurable:false, enumerable:false, writable:false, value:(function() {
        var $K = voltmx.$kwebfw$;


        /**
         * voltmx.ui.Camera constructor.
         *
         * @class
         * @namespace   voltmx.ui
         * @extends     voltmx.ui.BasicWidget
         * @author      Kasam SaiTeja <saiteja.kasam@voltmx.com>
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
        var Camera = function Camera(bconfig, lconfig, pspconfig) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils, self = this,
                dependentPropertiesValidationMessage = '', prop = null, p = null;

            if(!$KU.is(bconfig, 'object')) bconfig = {};

            if(!bconfig.isPreValidated) {
                prop = {
                    cameraSource: constants.CAMERA_SOURCE_DEFAULT,
                    poster: 'cameraicon.png',
                    onCapture: null,
                    onCaptureFailed: null,
                    onFailure: null,
                    rawBytes: null,
                    base64: null,
                    videoDuration: null
                };
            }

            _populateUnderscore.Camera.call(this);

            if(!$KU.is(bconfig.id, 'string') || !bconfig.id) {
                bconfig.id = (this._kwebfw_.name + $KU.uid());
            }

            Camera.base.call(this, bconfig, lconfig, pspconfig);

            if(!bconfig.isPreValidated) {
                if($KU.is(_dependentPropertiesValidationMessage.Camera, 'function')) {
                    dependentPropertiesValidationMessage = _dependentPropertiesValidationMessage.Camera.call(this, prop, bconfig, lconfig, pspconfig);
                }
            }

            if(dependentPropertiesValidationMessage) {
                throw new Error(dependentPropertiesValidationMessage);
            } else {
                if(!bconfig.isPreValidated) {
                    //Defaulting to platfom values specific to Camera
                    $KU.each(prop, function(value, key) {
                        var $K = voltmx.$kwebfw$, $KU = $K.utils,
                            $KW = $K.widget, valid = false, message = '';

                        if(!Object.prototype.hasOwnProperty.call(bconfig, key)) {
                            bconfig[key] = value;
                        } else if($KW.getNonConstructorProperties(self._kwebfw_.name).indexOf(key) >= 0) {
                            throw new Error('<' + key + '> is a non-constructor property of <' + self._kwebfw_.ns + '> class.');
                        } else if(!$KU.is(_valid.Camera[key], 'function')) {
                            throw new Error('<' + key + '> is available in default widget properties of <voltmx.ui.Camera>, but not in <_valid.Camera> namespace.');
                        } else {
                            valid = _valid.Camera[key].call(self, bconfig[key]);
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

                //Defining Getters/Setters specific to Camera
                $KU.each(_view.Camera, function(value, key) {
                    var $K = voltmx.$kwebfw$, $KU = $K.utils;

                    $KU.defineProperty(self._kwebfw_.prop, key, bconfig[key], {configurable:false, enumerable:true, writable:true});

                    $KU.defineGetter(self, key, function Camera$_getter() {
                        var $K = voltmx.$kwebfw$, $KU = $K.utils;

                        if($KU.is(_getter.Camera[key], 'function')) {
                            return _getter.Camera[key].call(this, this._kwebfw_.prop[key]);
                        }
                        return this._kwebfw_.prop[key];
                    }, true);

                    $KU.defineSetter(self, key, function Camera$_setter(val) {
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
                                valid = _valid.Camera[key].call(this, val);
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

                                    if($KU.is(_setter.Camera[key], 'function')) {
                                        _setter.Camera[key].call(this, old);
                                    }

                                    if(_relayoutActiveTriggerer.Camera().indexOf(key) >= 0) {
                                        $KW.markRelayout(this);
                                    }

                                    if(_relayoutPassiveTriggerer.Camera().indexOf(key) >= 0) {
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

                    if($KU.is(p.videoDuration, undefined)) p.videoDuration = null;
                    if($KU.is(p.rawBytes, undefined)) p.rawBytes = null;
                }

                if($KU.is(_postInitialization.Camera, 'function')) {
                    _postInitialization.Camera.call(this);
                }
            }

            pspconfig = lconfig = bconfig = null; //For GC
        };


        $K.utils.inherits(Camera, voltmx.ui.BasicWidget);

        /**
         * Builds the view layer for voltmx.ui.Camera widget.
         *
         * @override
         * @access      protected
         * @method      _render
         * @memberof    voltmx.ui.Camera
         * @author      Kasam SaiTeja <saiteja.kasam@voltmx.com>
         *
         * @returns     {HTMLElement} – Camera view.
         */

        var camera__render = function Camera$_render(tag) {
            var $super = voltmx.ui.Camera.base.prototype, _ = this._kwebfw_,
                $K = voltmx.$kwebfw$, $KD = $K.dom, $KW = $K.widget,
                el = null, canvas = null, view = _.view, video = null;

            if(this.isVisible || $K.F.RIVW) {
                if(!view) {
                    video = $KD.create('VIDEO', {});
                    canvas = $KD.create('CANVAS', {});
                    view = $super._render.call(this, tag, [video, canvas]);

                    el = $KW.el(view);
                    $KD.setAttr(el.node, 'kwh-click', 'onClick');
                    $KD.setAttr(el.video, 'autoplay', '');
                    $KD.setAttr(el.video, 'playsinline', '');
                    $KD.style(el.canvas, 'visibility', 'hidden');
                    $KD.style(el.video, {'height':'100%', 'width':'100%'});

                    _view.Camera.poster.call(this, el.video, this.poster);
                }

                $KW.accessibility(this);
            }
            return view;
        };

        var camera_closeCamera = function Camera$closeCamera() {
            var $K = voltmx.$kwebfw$, $KW = $K.widget, el = $KW.el(this),
                tracks = [], i = 0;

            if(el.video.srcObject && $KW.visible(this)) {
                tracks = el.video.srcObject.getTracks();
                for(i = 0; i < tracks.length; i++) {
                    tracks[i].stop();
                }
                el.video.srcObject = null;
            }
        };

        var camera_openCamera = function Camera$openCamera() {
            var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget,
                model = this, _ = model._kwebfw_, el = $KW.el(this),
                constraints = null, feedSource = null;

            if(el.video && !el.video.srcObject && $KW.visible(this)) {
                if(_.prop.cameraSource === constants.CAMERA_SOURCE_REAR) {
                    feedSource = 'environment';
                    constraints = {video: {facingMode: {exact: feedSource}}, audio: false};
                } else {
                    feedSource = 'user';
                    if((($KU.browser('name') === "chrome" || $KU.browser('name') === "edge") && voltmx.os.deviceInfo().userAgent.includes('Macintosh')) || $KU.browser('name') === 'firefox') {
                        constraints = {video: {facingMode:  feedSource}, audio: false};
                    } else {
                        constraints = {video: {facingMode: {exact: feedSource}}, audio: false};
                    }
                }
                if($KU.browser('supports', 'usermedia')) {
                    navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
                        el.video.srcObject = stream;
                        el.video.play();
                    }).catch(function(err) {
                        if(err.name === 'NotAllowedError' && $KU.is(_.prop.onFailure, 'function')) {
                            $KW.fire(model, 'onFailure', model, constants.CAMERA_PERMISSION_DENIED);
                        } else {
                            if(_.prop.cameraSource === constants.CAMERA_SOURCE_REAR) {
                                $KW.fire(model, 'onFailure', model, constants.CAMERA_SOURCE_REAR_UNAVAILABLE);
                            } else {
                                $KW.fire(model, 'onFailure', model, constants.CAMERA_SOURCE_FRONT_UNAVAILABLE);
                            }
                        }
                    });
                } else {
                    $KW.fire(model, 'onFailure', model, constants.CAMERA_NOT_SUPPORTED);
                }
            }
        };

        var camera_takePicture = function Camera$takePicture() {
            var $K = voltmx.$kwebfw$, $KW = $K.widget, $KD = $K.dom,
                el = $KW.el(this), imgCanvas = null, context = null,
                _ = this._kwebfw_, canvasHeight = null, canvasWidth = null;

            if(el.video.srcObject && $KW.visible(this)) {
                imgCanvas = el.canvas;
                canvasHeight = el.video.offsetHeight ? el.video.videoHeight : 0;
                canvasWidth = el.video.offsetWidth ? el.video.videoWidth : 0;
                $KD.setAttr(imgCanvas, 'height', canvasHeight);
                $KD.setAttr(imgCanvas, 'width', canvasWidth);
                context = imgCanvas.getContext('2d');
                try{
                    context.drawImage(el.video, 0, 0);
                    _.prop.base64 = imgCanvas.toDataURL();
                    _.prop.rawBytes = imgCanvas.toDataURL().split(',')[1];
                    $KW.fire(this, 'onCapture', this);
                } catch(err) {
                    $KW.fire(this, 'onCaptureFailed', this, constants.CAMERA_CAPTURE_FAILED);
                }
            }
        };

        var camera_startVideoCapture = function Camera$startVideoCapture(config) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget,
                model = this, _ = model._kwebfw_, el = $KW.el(this),
                constraints = null, feedSource = null, tracks = null,
                i = null;

            if(el.video && $KW.visible(this)) {
                if(_.prop.cameraSource === constants.CAMERA_SOURCE_REAR) {
                    feedSource = 'environment';
                    constraints = {video: {facingMode: {exact: feedSource}}, audio: true};
                } else {
                    feedSource = 'user';
                    if((($KU.browser('name') === "chrome" || $KU.browser('name') === "edge") && voltmx.os.deviceInfo().userAgent.includes('Macintosh')) || $KU.browser('name') === 'firefox') {
                        constraints = {video: {facingMode:  feedSource}, audio: true};
                    } else {
                        constraints = {video: {facingMode: {exact:  feedSource}}, audio:true};
                    }
                }
                if($KU.browser('supports', 'usermedia') && $KU.browser('supports', 'mediarecorder')) {
                    if(el.video.srcObject) {
                        navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
                            _.videoData = [];
                            _.Recorder = new MediaRecorder(stream);
                            _.Recorder.start();
                            if(_.prop.videoDuration && config && config.callback) {
                                setTimeout(function() {
                                    if(_.Recorder.state === 'recording') {
                                        _.Recorder.stop();
                                        tracks = _.Recorder.stream.getTracks();
                                        for(i = 0; i < tracks.length; i++) {
                                            tracks[i].stop();
                                        }
                                    }
                                    _dataAvailableCreateBlob.call(model, config.callback);
                                }, _.prop.videoDuration*1000);
                            }
                        }).catch(function(/*err*/) {
                            $KW.fire(model, 'onFailure', model, constants.CAMERA_VIDEO_RECORDING_FAILED);
                        });
                    }
                } else {
                    $KW.fire(model, 'onFailure', model, constants.CAMERA_NOT_SUPPORTED);
                }
            }
        };

        var camera_stopVideoCapture = function Camera$stopVideoCapture(config) {
            var $K = voltmx.$kwebfw$, $KW = $K.widget, _ = this._kwebfw_,
                tracks = [], i = null;

            if(config && config.callback && _.Recorder && _.Recorder.state === 'recording' && $KW.visible(this)) {
                _.Recorder.stop();
                tracks = _.Recorder.stream.getTracks();
                for(i = 0; i < tracks.length; i++) {
                    tracks[i].stop();
                }
                _dataAvailableCreateBlob.call(this, config.callback);
            } else {
                $KW.fire(this, 'onFailure', this, constants.CAMERA_VIDEO_RECORDING_FAILED);
            }
        };

        $K.defVoltmxProp(Camera.prototype, [
            {keey:'_render', value:camera__render},
            {keey:'closeCamera', value:camera_closeCamera},
            {keey:'openCamera', value:camera_openCamera},
            {keey:'takePicture', value:camera_takePicture},
            {keey:'startVideoCapture', value:camera_startVideoCapture},
            {keey:'stopVideoCapture', value:camera_stopVideoCapture}
        ]);

        return Camera;
    }())});
}());
