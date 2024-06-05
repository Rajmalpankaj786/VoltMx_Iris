(function() {
    var $K = voltmx.$kwebfw$;

    $K.defVoltmxProp($K.ui, [
        {keey:'Video', value:{}, items:[
            {keey:'onClick', value:function(/*evt*/) {
                var $K = voltmx.$kwebfw$, $KW = $K.widget,
                    _ = this._kwebfw_, el = $KW.el(this);

                if(el && el.video) {
                    if(el.video.paused || el.video.ended) {
                        _.playstate = true;
                    } else {
                        _.playstate = false;
                    }
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
    var _dependentPropertiesValidationMessage = {};


    //All widget file must have this variable
    //All the functions will be called in the scope of widget instance
    var _getter = {
        Video: {
            source: function Video$_getter_source(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils;

                return $KU.clone(value);
            }
        }
    };


    //All widget file must have this variable
    //This functions will be called in the scope of widget instance
    var _populateUnderscore = {
        Video: function Video$_populateUnderscore() {
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
                    $KU.defineProperty(_, 'ns', 'voltmx.ui.Video', null);
                }
            }
            if(!_.name) {
                if($KU.is(this.__$kwebfw$name__, 'string') && this.__$kwebfw$name__) {
                    $KU.defineProperty(_, 'name', this.__$kwebfw$name__, null);
                } else {
                    $KU.defineProperty(_, 'name', 'Video', null);
                }
            }
        }
    };


    //All widget file must have this variable
    //This function will be called in the scope of widget instance
    var _postInitialization = {
        Video: function Video$_postInitialization() {
            var $K = voltmx.$kwebfw$, $KU = $K.utils,
                _ = this._kwebfw_, prop = _.prop;

            if($KU.is(prop.skin, 'null')) {
                prop.skin = 'slVideo';
            }
        }
    };


    //All widget file must have this variable
    //This functions will be called in the scope of widget instance
    var _relayoutActiveTriggerer = {
        Video: function Video$_relayoutActiveTriggerer() {
            return [];
        }
    };


    //All widget file must have this variable
    //This functions will be called in the scope of widget instance
    var _relayoutPassiveTriggerer = {
        Video: function Video$_relayoutPassiveTriggerer() {
            return [];
        }
    };


    //All widget file must have this variable
    //All the functions will be called in the scope of widget instance
    var _setter = {
        Video: {
            source : function Video$_setter_Source(/*old*/) {
                this._kwebfw_.prop.tracks = null;
            }
        }
    };


    //All widget file must have this variable
    //All the functions will be called in the scope of widget instance
    //These function should always return a boolean value
    var _valid = {
        Video: {
            controls: function Video$_valid_controls(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'boolean')) {
                    flag = true;
                }

                return flag;
            },

            enableCaptions : function Video$_valid_enableCaptions(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'boolean')) {
                    flag = true;
                }

                return flag;
            },

            poster: function Video$_valid_poster(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'string')) {
                    flag = true;
                }

                return flag;
            },

            source: function Video$_valid_source(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'null')) {
                    flag = true;
                } else if($KU.is(value, 'object')
                && ($KU.is(value.mp4, 'string')
                || $KU.is(value.ogg, 'string')
                || $KU.is(value.webm, 'string'))) {
                    flag = true;
                }

                return flag;
            },

            tracks : function Video$_valid_tracks(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'null')) {
                    flag = true;
                } else if($KU.is(value, 'array')) {
                    flag = true;

                    $KU.each(value, function(item) {
                        if(!$KU.is(item, 'object')
                        || !$KU.is(item.src, 'string')) {
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
        Video: {
            controls: false,

            poster: false,

            source: function Video$_view_source(el/*, old*/) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, $KD = $K.dom;

                $KD.html(el.video, '');

                $KU.each(this._kwebfw_.prop.source, function(url, type) {
                    var $K = voltmx.$kwebfw$, $KD = $K.dom, source = null;

                    source = $KD.create('SOURCE', {src:$KU.getResourceURL(url), type:('video/'+type)});
                    $KD.add(this, source); //Here scope of "this" points to el.video
                    el.video.load();
                }, el.video);
            },

            tracks : function Video$_view_tracks(el/*, old*/) {
                var $K = voltmx.$kwebfw$, $KD = $K.dom, $KU = $K.utils,
                    tracks = $KD.find(el.video, 'TRACK'), prop = this._kwebfw_.prop;

                //Remove Existing tracks
                $KU.each(tracks, function(track) {
                    $KD.remove(track);
                });

                //Adding new tracks
                $KU.each(prop.tracks, function(track/*, index*/) {
                    var trackNode = null;

                    trackNode = $KD.create('TRACK', {src:$KU.getImageURL(track.src), kind: 'subtitles'});

                    //Setting display name
                    if(track.displayName) {
                        $KD.setAttr(trackNode, 'label', track.displayName);
                    }

                    //setting source language
                    if(track.srclang) {
                        $KD.setAttr(trackNode, 'srclang', track.srclang);
                    }

                    $KD.add(this, trackNode);
                }, el.video);

                _setEnableCaptions.call(this, el);
            },

            enableCaptions : function Video$_view_enableCaptions(el/*, old*/) {
                _setEnableCaptions.call(this, el);
            }
        }
    };

    var _setEnableCaptions = function Video$_setEnableCaptions(el) {
        var defaultIndex = 0, index = 0, prop = this._kwebfw_.prop,
            textTracks = el.video.textTracks, tracks = prop.tracks;

        if(textTracks && textTracks.length > 0) {
            for(index = 0; index < textTracks.length; index++) {
                if(tracks[index].default) {
                    defaultIndex = index;
                }
                textTracks[index].mode = 'hidden';
            }

            if(prop.enableCaptions) {
                textTracks[defaultIndex].mode = 'showing';
            }
        }
    };


    Object.defineProperty(voltmx.ui, 'Video', {configurable:false, enumerable:false, writable:false, value:(function() {
        var $K = voltmx.$kwebfw$;


        /**
         * voltmx.ui.Video constructor.
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
        var Video = function Video(bconfig, lconfig, pspconfig) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils, self = this,
                dependentPropertiesValidationMessage = '', prop = null;

            if(!$KU.is(bconfig, 'object')) bconfig = {};

            if(!bconfig.isPreValidated) {
                prop = {
                    controls: true,
                    poster: 'defvideoposter.png',
                    source: null,
                    tracks: null,
                    enableCaptions: true
                };
            }

            _populateUnderscore.Video.call(this);

            if(!$KU.is(bconfig.id, 'string') || !bconfig.id) {
                bconfig.id = (this._kwebfw_.name + $KU.uid());
            }

            Video.base.call(this, bconfig, lconfig, pspconfig);

            if(!bconfig.isPreValidated) {
                if($KU.is(_dependentPropertiesValidationMessage.Video, 'function')) {
                    dependentPropertiesValidationMessage = _dependentPropertiesValidationMessage.Video.call(this, prop, bconfig, lconfig, pspconfig);
                }
            }

            if(dependentPropertiesValidationMessage) {
                throw new Error(dependentPropertiesValidationMessage);
            } else {
                if(!bconfig.isPreValidated) {
                    //Defaulting to platfom values specific to Video
                    $KU.each(prop, function(value, key) {
                        var $K = voltmx.$kwebfw$, $KU = $K.utils,
                            $KW = $K.widget, valid = false, message = '';

                        if(!Object.prototype.hasOwnProperty.call(bconfig, key)) {
                            bconfig[key] = value;
                        } else if($KW.getNonConstructorProperties(self._kwebfw_.name).indexOf(key) >= 0) {
                            throw new Error('<' + key + '> is a non-constructor property of <' + self._kwebfw_.ns + '> class.');
                        } else if(!$KU.is(_valid.Video[key], 'function')) {
                            throw new Error('<' + key + '> is available in default widget properties of <voltmx.ui.Video>, but not in <_valid.Video> namespace.');
                        } else {
                            valid = _valid.Video[key].call(self, bconfig[key]);
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

                //Defining Getters/Setters specific to Video
                $KU.each(_view.Video, function(value, key) {
                    var $K = voltmx.$kwebfw$, $KU = $K.utils;

                    $KU.defineProperty(self._kwebfw_.prop, key, bconfig[key], {configurable:false, enumerable:true, writable:true});

                    $KU.defineGetter(self, key, function Video$_getter() {
                        var $K = voltmx.$kwebfw$, $KU = $K.utils;

                        if($KU.is(_getter.Video[key], 'function')) {
                            return _getter.Video[key].call(this, this._kwebfw_.prop[key]);
                        }
                        return this._kwebfw_.prop[key];
                    }, true);

                    $KU.defineSetter(self, key, function Video$_setter(val) {
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
                                valid = _valid.Video[key].call(this, val);
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

                                    if($KU.is(_setter.Video[key], 'function')) {
                                        _setter.Video[key].call(this, old);
                                    }

                                    if(_relayoutActiveTriggerer.Video().indexOf(key) >= 0) {
                                        $KW.markRelayout(this);
                                    }

                                    if(_relayoutPassiveTriggerer.Video().indexOf(key) >= 0) {
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

                if($KU.is(_postInitialization.Video, 'function')) {
                    _postInitialization.Video.call(this);
                }
            }

            pspconfig = lconfig = bconfig = null; //For GC
        };


        $K.utils.inherits(Video, voltmx.ui.BasicWidget);


        /**
         * Builds the view layer for voltmx.ui.Video widget.
         *
         * @override
         * @access      protected
         * @method      _render
         * @memberof    voltmx.ui.Video
         * @author      Goutam Sahu <goutam.sahu@voltmx.com>
         *
         * @returns     {HTMLElement} – Video view.
         */
        var video__render = function Video$_render(tag) {
            var $super = voltmx.ui.Video.base.prototype, _ = this._kwebfw_,
                view = _.view, $K = voltmx.$kwebfw$, $KU = $K.utils,
                $KW = $K.widget, $KD = $K.dom, el = null, video = null;

            if(this.isVisible || $K.F.RIVW) {
                if(!view) {
                    video = $KD.create('VIDEO', {});
                    view = $super._render.call(this, tag, [video]);

                    el = $KW.el(view);

                    $KD.setAttr(video, 'kwh-click', 'onClick');
                    $KD.setAttr(video, 'preload', 'none'); //Indicates that the video should not be preloaded.
                    this.controls && $KD.setAttr(video, 'controls', 'controls');
                    this.poster && $KD.setAttr(video, 'poster', $KU.getImageURL(this.poster));

                    _view.Video.source.call(this, el, this._kwebfw_.prop.source);
                    _view.Video.tracks.call(this, el, this._kwebfw_.prop.tracks);
                }

                $KW.accessibility(this);
            }

            return view;
        };


        var video_getBufferPercentage = function Video$getBufferPercentage() {
            var $K = voltmx.$kwebfw$, $KW = $K.widget, el = $KW.el(this),
                duration = 0, buffer = 0, bufferDuration = 0, b = 0, blen = 0;

            if(el.video) {
                duration = el.video.duration;
                blen = el.video.buffered.length;

                for(b=0; b<blen; b++) {
                    bufferDuration = bufferDuration + el.video.buffered.end(b) - el.video.buffered.start(b);
                }

                buffer = ((100 * bufferDuration) / duration);
            }

            return buffer;
        };


        var video_getCurrentPosition = function Video$getCurrentPosition() {
            var $K = voltmx.$kwebfw$, $KW = $K.widget,
                el = $KW.el(this), position = 0;

            if(el.video) {
                position = el.video.currentTime;
            }

            return position;
        };


        var video_getDuration = function Video$getDuration() {
            var $K = voltmx.$kwebfw$, $KW = $K.widget,
                el = $KW.el(this), duration = 0;

            if(el.video) {
                duration = el.video.duration;
            }

            return duration;
        };


        var video_isPlaying = function Video$isPlaying() {
            var $K = voltmx.$kwebfw$, $KW = $K.widget,
                el = $KW.el(this), playing = false;

            if(el.video) {
                playing = (!el.video.paused && !el.video.ended);
            }

            return playing;
        };


        var video_pause = function Video$pause() {
            var $K = voltmx.$kwebfw$, $KW = $K.widget, _ = this._kwebfw_,
                el = $KW.el(this);

            if(el.video && $KW.visible(this)) {
                el.video.pause();
            }
            _.playstate = false;
        };


        var video_play = function Video$play() {
            var $K = voltmx.$kwebfw$, $KW = $K.widget, _ = this._kwebfw_,
                el = $KW.el(this);

            if(el.video && $KW.visible(this)) {
                el.video.currentTime = 0;
                el.video.play();
                _.playstate = true;
            }
        };


        var video_resume = function Video$resume() {
            var $K = voltmx.$kwebfw$, $KW = $K.widget, _ = this._kwebfw_,
                el = $KW.el(this);

            if(el.video && $KW.visible(this)) {
                el.video.play();
                _.playstate = true;
            }
        };


        var video_seekTo = function Video$seekTo(time) {
            var $K = voltmx.$kwebfw$, $KW = $K.widget, el = $KW.el(this);

            if(el.video && $KW.visible(this)) {
                el.video.pause();
                el.video.currentTime = time;
                el.video.play();
            }
        };


        var video_setSource = function Video$setSource(source) {
            this.source = source;
        };

        var video_setTracks = function Video$setTracks(source) {
            this.tracks = source;
        };

        var video_stop = function Video$stop() {
            var $K = voltmx.$kwebfw$, $KW = $K.widget, _ = this._kwebfw_,
                el = $KW.el(this);

            if(el.video && $KW.visible(this)) {
                el.video.pause();
                el.video.currentTime = 0;
                _.playstate = false;
            }
        };


        $K.defVoltmxProp(Video.prototype, [
            {keey:'_render', value:video__render},
            {keey:'getBufferPercentage', value:video_getBufferPercentage},
            {keey:'getCurrentPosition', value:video_getCurrentPosition},
            {keey:'getDuration', value:video_getDuration},
            {keey:'isPlaying', value:video_isPlaying},
            {keey:'pause', value:video_pause},
            {keey:'play', value:video_play},
            {keey:'resume', value:video_resume},
            {keey:'seekTo', value:video_seekTo},
            {keey:'setSource', value:video_setSource},
            {keey: 'setTracks', value:video_setTracks},
            {keey:'stop', value:video_stop}
        ]);


        return Video;
    }())});
}());
