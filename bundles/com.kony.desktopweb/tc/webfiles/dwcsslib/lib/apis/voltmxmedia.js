Object.defineProperty(voltmx, 'media', {configurable:false, enumerable:false, writable:false, value:(function() {
    var _ns = {}, $K = voltmx.$kwebfw$;

    var _record = function(config, arg1) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, _audioRecorder = null,
            _recordMedia = null, tracks = null;

        $KU.log({api:'voltmx.media.record', enter:true});

        if(arguments.length === 2) config = arg1;

        if($KU.browser('supports', 'usermedia') && $KU.browser('supports', 'mediarecorder')) {
            _recordMedia = {
                startRecording: function() {
                    if(!_audioRecorder || (_audioRecorder && _audioRecorder.state === 'inactive')) {
                        navigator.mediaDevices.getUserMedia({audio:true}).then(function(stream) {
                            _audioRecorder = new MediaRecorder(stream);
                            _audioRecorder.start();
                        }).catch(function(err) {
                            config.onFailure && config.onFailure('Error :' + err);
                        });
                    }
                },

                stopRecording: function() {
                    var i = 0, ilen = 0;

                    if(_audioRecorder && _audioRecorder.state === 'recording') {
                        _audioRecorder.ondataavailable = function(e) {
                            config.onSuccess && config.onSuccess(URL.createObjectURL(e.data));
                            _audioRecorder = null;
                        };

                        _audioRecorder.stop();
                        tracks = _audioRecorder.stream.getTracks();
                        ilen = tracks.length;

                        for(i=0; i<ilen; i++) {
                            tracks[i].stop();
                        }
                    } else {
                        config.onFailure && config.onFailure('Failed during stop recording');
                    }
                }
            };
        } else {
            config.onFailure && config.onFailure('Audio API is not supported in your browser');
        }

        $KU.log({api:'voltmx.media.record', exit:true});
        return _recordMedia;
    };


    $K.defVoltmxProp(_ns, [
        {keey:'record', value:_record}
    ]);


    return _ns;
}())});

Object.defineProperty(voltmx, 'screenrecorder', {configurable:false, enumerable:false, writable:false, value:(function() {
    var _ns = {}, $K = voltmx.$kwebfw$, _ScreenRecorder = [], _videoData = [], _tracks = [];

    var _start = function(config) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, frameRate = 30,
            constraints = null, videoTracks = null;

        $KU.log({api:'voltmx.screenrecorder.start', enter:true});
        if(config && config.frameRate) {
            frameRate = config.frameRate;
        }
        constraints = {video: {frameRate: frameRate}};
        if($KU.browser('supports', 'displaymedia') && $KU.browser('supports', 'mediarecorder')) {
            navigator.mediaDevices.getDisplayMedia(constraints).then(function(stream) {
                _ScreenRecorder = new MediaRecorder(stream);
                _ScreenRecorder.start();
                videoTracks = _ScreenRecorder.stream.getVideoTracks();
                videoTracks[0].onended = function() {
                    if(_ScreenRecorder.state === 'recording') {
                        _stop();
                    } else if(_ScreenRecorder.state === 'paused') {
                        _resume();
                        _stop();
                    }
                };
                $KU.log({api:'voltmx.screenrecorder.start', exit:true});
            }).catch(function(err) {
                if(config && config.onFailure) {
                    config.onFailure(err);
                }
            });
        } else {
            if(config && config.onFailure) {
                config.onFailure('ScreenRecorder API is not supported by your browser');
            }
        }
    };

    var _stop = function() {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, i = 0;
        if(_ScreenRecorder && !(_ScreenRecorder.state === 'inactive')) {
            $KU.log({api:'voltmx.screenrecorder.stop', enter:true});
            _ScreenRecorder.stop();
            _tracks = _ScreenRecorder.stream.getTracks();
            _ScreenRecorder.ondataavailable = function(e) {
                _videoData.push(e.data);
            };
            for(i = 0; i < _tracks.length; i++) {
                _tracks[i].stop();
            }
            $KU.log({api:'voltmx.screenrecorder.stop', exit:true});
        }
    };

    var _pause = function() {
        var $K = voltmx.$kwebfw$, $KU = $K.utils;
        if(_ScreenRecorder && _ScreenRecorder.state === 'recording') {
            $KU.log({api:'voltmx.screenrecorder.pause', enter:true});
            _ScreenRecorder.pause();
            $KU.log({api:'voltmx.screenrecorder.pause', exit:true});
        }
    };

    var _resume = function() {
        var $K = voltmx.$kwebfw$, $KU = $K.utils;
        if(_ScreenRecorder && _ScreenRecorder.state === 'paused') {
            $KU.log({api:'voltmx.screenrecorder.resume', enter:true});
            _ScreenRecorder.resume();
            $KU.log({api:'voltmx.screenrecorder.resume', exit:true});
        }
    };

    var _getrecordeddata = function() {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, blob = null, videoBlobURL = null;
        if(_ScreenRecorder && _ScreenRecorder.state && _ScreenRecorder.state === 'inactive') {
            $KU.log({api:'voltmx.screenrecorder.getrecordeddata', enter:true});
            blob = new Blob(_videoData, {type:'video/webm'});
            window.URL = window.URL || window.webkitURL;
            videoBlobURL = window.URL.createObjectURL(blob);
            $KU.log({api:'voltmx.screenrecorder.getrecordeddata', exit:true});
        }
        return videoBlobURL;
    };

    var _getrecordingstate = function() {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, state = 'inactive';
        $KU.log({api:'voltmx.screenrecorder.getrecordedstate', enter:true});
        if(_ScreenRecorder && _ScreenRecorder.state) {
            $KU.log({api:'voltmx.screenrecorder.getrecordedstate', exit:true});
            state = _ScreenRecorder.state;
        }
        return state;
    };


    $K.defVoltmxProp(_ns, [
        {keey:'getrecordeddata', value:_getrecordeddata},
        {keey:'getrecordingstate', value:_getrecordingstate},
        {keey:'pause', value:_pause},
        {keey:'resume', value:_resume},
        {keey:'start', value:_start},
        {keey:'stop', value:_stop}
    ]);

    return _ns;
}())});
