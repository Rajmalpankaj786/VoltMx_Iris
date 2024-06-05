Object.defineProperty(voltmx, 'io', {configurable:false, enumerable:false, writable:false, value:(function() {
    var _ns = {}, $K = voltmx.$kwebfw$, _iframe = null,
        _form = null, _input = null, _scrap = null;


    var _ajaxBrowse = function(e, callback) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, files = [];

        $KU.each(this.files, function(file) {
            files.push(new File(file));
        });

        callback(e, files);
    };


    var _ajaxUpload = function(url, state, index, callback/*, config*/) {
        var xhr = new XMLHttpRequest(), formData = new FormData();

        formData.append(state.file.name, state.file.file);
        if(!url.match(new RegExp(/^(http|https):\/\/?/))) {
            state.status = constants.FILE_UPLOAD_ERROR_STATE;
            callback && callback(url, state);
            return;
        }

        xhr.open('POST', url, true);

        xhr.upload.onloadstart = function(/*e*/) {
            state.status = constants.FILE_UPLOAD_START_STATE;
            state.uploadBytes = 0;
            callback && callback(url, state);
        };
        xhr.upload.onprogress = function(e) {
            if(e.lengthComputable) {
                state.uploadBytes = e.loaded;
            }
            state.status = constants.FILE_UPLOAD_PROGRESS_STATE;
            callback && callback(url, state);
        };
        xhr.upload.onerror = function(/*e*/) {
            state.status = constants.FILE_UPLOAD_ERROR_STATE;
            state.uploadBytes = 0;
            callback && callback(url, state);
        };
        xhr.upload.onabort = function(/*e*/) {
            state.status = constants.FILE_UPLOAD_ERROR_STATE;
            callback && callback(url, state);
        };
        xhr.onload = function(/*e*/) {
            if(this.status === 200) {
                state.status = constants.FILE_UPLOAD_COMPLETE_STATE;
                state.uploadBytes = state.file.size;
                callback && callback(url, state);
            }
        };
        xhr.onerror = function(/*e*/) {
            state.status = constants.FILE_UPLOAD_ERROR_STATE;
            state.uploadBytes = 0;
            callback && callback(url, state);
        };
        xhr.onreadystatechange = function() {
            if(xhr.readyState !== 4)
                return;
            clearTimeout(setTimeout(function() {
                xhr.abort();
            }, constants.UPLOAD_MAX_WAIT_TIME));
            if(xhr.status !== 200) {
                state.status = constants.FILE_UPLOAD_ERROR_STATE;
                state.uploadBytes = 0;
                callback && callback(url, state);
            }
        };
        xhr.send(formData);
    };

    var _iframeBrowse = function(e, callback) {
        var path = e.value, files = [],
            name = path.substring(path.lastIndexOf('\\') + 1),
            parent = path.substring(0, path.lastIndexOf('\\')); // get path of parent directory

        parent = parent.substring(parent.lastIndexOf('\\') + 1); // name of parent directory

        files.push(new File({name:name, fullPath:path, parent:parent, file:e}));

        callback(e, files);
    };


    var _iframeUpload = function() {
        //
    };

    var File = function(file) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils;

        $KU.log({api:'voltmx.io.File', enter:true});

        if(_isAjaxUploadSupported()) {
            $KU.defineProperty(this, 'name', file.name);
            $KU.defineProperty(this, 'file', file); // original file object return via browser
        } else {
            $KU.each(file, function(value, key) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils;

                $KU.defineProperty(this, key, value);
            });
        }

        $KU.defineProperty(this, 'readable', true);
        $KU.defineProperty(this, 'writable', false);

        if(file.lastModifiedDate) {
            $KU.defineProperty(this, 'modificationTime', new Date(file.lastModifiedDate).toISOString());
        }

        if(file.size) {
            $KU.defineProperty(this, 'size', file.size);
        }

        $KU.log({api:'voltmx.io.File', exit:true});
    };


    var FileSystem_browse = function(config, callback) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KD = $K.dom, $KG = $K.globals;

        $KU.log({api:'voltmx.io.FileSystem.browse', enter:true});

        if(!_scrap) _scrap = $KG.appScrap;

        if($KU.is(config, 'object') && $KU.is(callback, 'function')) {
            _form = $KD.create('form');
            _input = $KD.create('input', {type:'file'});

            $KD.on(_input, 'click', 'upload', function(/*e*/) {
                var $K = voltmx.$kwebfw$, $KD = $K.dom;

                $KD.parent(this).reset();
            });

            $KD.add(_form, _input);

            if(_isAjaxUploadSupported()) {
                if(config.selectMultipleFiles === true) {
                    $KD.setAttr(_input, 'multiple', 'multiple');
                } else {
                    $KD.removeAttr(_input, 'multiple');
                }

                if($KU.is(config.filter, 'array')) {
                    $KD.setAttr(_input, 'accept', config.filter.join(','));
                } else {
                    $KD.removeAttr(_input, 'accept');
                }

                $KD.on(_input, 'change', 'upload', function(e) {
                    var $K = voltmx.$kwebfw$, $KD = $K.dom;

                    _ajaxBrowse.call(this, e, callback);
                    $KD.remove($KD.parent(e.target));
                });

                if(!$KD.contains(_scrap, _form)) {
                    $KD.add($KG.appScrap, _form);
                }
            } else {
                if(!_iframe) {
                    _iframe = $KD.create('iframe');
                    $KD.add(_iframe.document.body, _form);

                    $KD.add(_scrap, _iframe);
                }

                $KD.setAttr(_form, 'method', 'POST');
                $KD.setAttr(_form, 'enctype', 'multipart/form-data');

                $KD.on(_input, 'click', 'upload', function(e) {
                    _iframeBrowse.call(this, e, callback);
                });
            }

            $KD.fire(_input, 'click');
        }

        $KU.log({api:'voltmx.io.FileSystem.browse', exit:true});
    };


    var FileSystem_uploadFiles = function(url, files, callBack, config) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils;

        $KU.log({api:'voltmx.io.FileSystem.uploadFiles', enter:true});

        if($KU.is(url, 'string') && url
        && $KU.is(files, 'array') && files.length > 0) {
            $KU.each(files, function(file, index) {
                var state = {file:file, status:null, uploadBytes:null};

                if(_isAjaxUploadSupported()) {
                    _ajaxUpload(url, state, index, callBack, config);
                } else {
                    _iframeUpload();
                }
            });
        }

        $KU.log({api:'voltmx.io.FileSystem.uploadFiles', exit:true});
    };


    var _isAjaxUploadSupported = function() {
        if(window.File && window.FileList
        && new XMLHttpRequest().upload) {
            return true;
        } return false;
    };


    $K.defVoltmxProp(_ns, [
        {keey:'File', value:File},
        {keey:'FileSystem', value:{}, items:[
            {keey:'browse', value:FileSystem_browse},
            {keey:'uploadFiles', value:FileSystem_uploadFiles}
        ]}
    ]);


    return _ns;
}())});
