Object.defineProperty(voltmx, 'net', {configurable:false, enumerable:false, writable:false, value:(function() {
    var _ns = {}, $K = voltmx.$kwebfw$, $KU = $K.utils, _http = {},
        _integrityProperties = null;


    var _cancel = function(connection) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils;

        $KU.log({api:'voltmx.net.cancel', enter:true});

        if($KU.is(connection, 'object')
        && $KU.is(connection.abort, 'function')) {
            connection.userCancelled = true;
            connection.abort();
        }

        $KU.log({api:'voltmx.net.cancel', exit:true});
    };


    var _clearCookies = function(url, cookies) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils,
            allCookies = document && document.cookie.split(';'),
            pathBits = null, i = 0, ilen = 0, pathCurrent = '/',
            cookieName = '', j = 0, jlen = 0;

        $KU.log({api:'voltmx.net.clearCookies', enter:true});

        url = url || document.URL;

        if(window && url.indexOf(window.location.origin) !== -1) {
            cookies = cookies || allCookies;

            if(cookies) {
                pathBits = window.location.pathname.split('/');
                ilen = cookies.length;

                for(i=0; i<ilen; i++) {
                    cookieName = cookies[i].trim();

                    if(document.cookie.indexOf(cookieName) !== -1) {
                        jlen = pathBits.length;

                        for(j=0; j<jlen; j++) {
                            pathCurrent += ((pathCurrent.substr(-1) !== '/') ? '/' : '') + pathBits[j];

                            if(cookieName.indexOf('=') !== -1) {
                                document.cookie = cookieName + '; expires=Thu, 01-Jan-1970 00:00:01 GMT;path=' + pathCurrent + ';';
                            } else {
                                document.cookie = cookieName + '=; expires=Thu, 01-Jan-1970 00:00:01 GMT;path=' + pathCurrent + ';';
                            }

                            if(document.cookie.indexOf(cookieName) === -1) break;
                        }
                    }
                }
            }

            $KU.log({api:'voltmx.net.clearCookies', exit:true});
        } else {
            throw new $KU.error(1005, 'invalid input url', 'invalid input url');
        }
    };


    var _FormData = function(param) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, _formdata = {};

        $KU.log({api:'voltmx.net.FormData', enter:true});

        if($KU.is(param, 'object')
        && param.isMultiPart && window.FormData) {
            return new FormData();
        }
        this.append = function(key, value) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils, $KB = $K.behavior;

            if($KU.is(key, 'string') && key) {
                if(!$KB.doNotEncodeFormValue) {
                    value = encodeURIComponent(value);
                }

                if(!_formdata[key]) {
                    _formdata[key] = [value];
                } else {
                    _formdata[key].push(value);
                }
            } else {
                throw new Error('FormData append Error: key cannot be empty');
            }
        };

        this.toString = function() {
            var formdata = '', key = '';

            for(key in _formdata) {
                if(formdata === '') {
                    formdata = key + '=' + _formdata[key].join('&' + key + '=');
                } else {
                    formdata += '&' + key + '=' + _formdata[key].join('&' + key + '=');
                }
            }

            return formdata;
        };

        this.delete = function(key) {
            delete _formdata[key];
        };

        this.entries = function() {
            return _iterator(_formdata, 'entries');
        };

        this.get = function(key) {
            return _formdata[key][0];
        };

        this.getAll = function(key) {
            return _formdata[key];
        };

        this.has = function(key) {
            //eslint-disable-next-line no-prototype-builtins
            return _formdata.hasOwnProperty(key);
        };

        this.keys = function() {
            return _iterator(_formdata, 'keys');
        };

        this.set = function(key, value) {
            _formdata[key] = [value];
        };

        this.values = function() {
            return _iterator(_formdata, 'values');
        };

        $KU.log({api:'voltmx.net.FormData', exit:true});
    };


    var _getActiveNetworkType = function() {
        var $K = voltmx.$kwebfw$, $KU = $K.utils;

        $KU.log({api:'voltmx.net.getActiveNetworkType', enter:true});

        if($KU.is(navigator.onLine, 'undefined')) {
            $KU.log({api:'voltmx.net.getActiveNetworkType', exit:true});
            return constants.NETWORK_TYPE_ANY;
        }
        if(navigator.onLine) {
            $KU.log({api:'voltmx.net.getActiveNetworkType', exit:true});
            return constants.NETWORK_TYPE_ANY;
        }
        $KU.log({api:'voltmx.net.getActiveNetworkType', exit:true});
        return null;
    };


    var _getCookies = function(url) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, allCookies = null;

        $KU.log({api:'voltmx.net.getCookies', enter:true});

        if($KU.is(url, 'string') && url) {
            if(url.indexOf(window.location.origin) !== -1) {
                allCookies = document && document.cookie;

                if(allCookies && allCookies.length > 0) {
                    allCookies = allCookies.split(';');
                }
            }
        }

        $KU.log({api:'voltmx.net.getCookies', exit:true});

        return allCookies;
    };

    var _getResponseHeader = function(headerfield) {
        var xhr = this.xhr;

        if(xhr.getResponseHeader(headerfield)) {
            return xhr.getResponseHeader(headerfield);
        }
        return null;
    };

    var _getAllResponseHeaders = function() {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KB = $K.behavior,
            xhr = this.xhr, headers = null, arr, parts, header,
            value, line, count = 0, len = 0, map = {};

        if(xhr.getAllResponseHeaders()) {
            headers = xhr.getAllResponseHeaders();
        }

        if(!$KB.isResponseHeaderString && $KU.is(headers, 'string')) {
            // Convert the header string into an array
            // of individual headers
            arr = headers.trim().split(/[\r\n]+/);
            len = arr.length;

            for(count=0; count<len; count++) {
                line = arr[count];
                parts = line.split(': ');
                header = parts.shift();
                value = parts.join(': ');
                map[header] = value;
            }

            headers = map;
        }
        return headers;
    };


    var _HttpRequest = function() {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, id = $KU.uid();

        $KU.log({api:'voltmx.net.HttpRequest', enter:true});

        _http[id] = {
            disableIntegrityCheck: false,
            enableWithCredentials: false,
            integrityCheckRequired: false,
            integrityStatus: constants.HTTP_INTEGRITY_CHECK_NOT_DONE,
            isMultiPartOrBinary: false,
            onReadyStateChange: function() {},
            randomString: null,
            response: '',
            responseType: '',
            status: null,
            statusText: null,
            timeout: 0,
            url: null,
            xhr: new XMLHttpRequest()

        };

        _http[id].xhr.onreadystatechange = function() {
            var $K = voltmx.$kwebfw$, $KW = $K.widget, $KA = $K.app,
                http = _http[id], xhr = http.xhr, cf = null;

            http.status = xhr.status;
            http.readyState = xhr.readyState;

            switch(xhr.readyState) {
                case 0: // UNINITIALIZED
                case 1: // LOADING
                case 2: // LOADED
                case 3: // INTERACTIVE
                    http.readyState = xhr.readyState;
                    http.statusText = (xhr.readyState === 0)
                        ? 'Request Uninitialised'
                        : (xhr.readyState === 1)
                            ? 'Request Loading'
                            : (xhr.readyState === 2)
                                ? 'Request Loaded'
                                : (xhr.readyState === 3)
                                    ? 'Request Interactive' : '';
                    http.onReadyStateChange({
                        enableWithCredentials: http.enableWithCredentials,
                        integrityStatus: http.integrityStatus,
                        readyState: http.readyState,
                        response: http.response,
                        responseType: http.responseType,
                        status: http.status,
                        statusText: http.statusText,
                        timeout: http.timeout
                    });
                    break;

                case 4: // COMPLETED
                    http.readyState = xhr.readyState;
                    http.statusText = 'Request Completed';

                    if(xhr.responseType === '' || xhr.responseType === 'text') {
                        http.response = xhr.responseText;
                    } else {
                        http.response = xhr.response;
                    }

                    if(http.integrityCheckRequired) {
                        _integrity.generateResponseCheckSumAndCheckIntegrity.call(http, http.response);
                    }

                    if(xhr.status === 200) {
                        http.statusText += ': OK';

                        if(http.timeout) {
                            clearTimeout(http.timeout);
                        }
                    }

                    if(xhr.status === 400) {
                        http.statusText += ': Error';

                        if(http.timeout) {
                            clearTimeout(http.timeout);
                        }
                    }

                    http.onReadyStateChange({
                        enableWithCredentials: http.enableWithCredentials,
                        integrityStatus: http.integrityStatus,
                        readyState: http.readyState,
                        response: http.response,
                        responseType: http.responseType,
                        status: http.status,
                        statusText: http.statusText,
                        timeout: http.timeout
                    }); //MADPSPA-425: SDK expecting result obj in callback handler

                    cf = $KW.model($KA.currentFormUID);
                    cf && cf.forceLayout();

                    xhr = http = null; //For GC
                    delete _http[id];
                    break;

                default:
                    xhr = http = null; //For GC
                    delete _http[id];
                    //$KU.logErrorMessage('Unknown Error: XMLHttpRequest Error');
            }
        };

        $KU.defineProperty(this, 'id', id);

        $KU.defineGetter(this, 'disableIntegrityCheck', function() {
            return _http[this.id].disableIntegrityCheck;
        });
        $KU.defineSetter(this, 'disableIntegrityCheck', function(value) {
            if(typeof value === 'boolean') {
                _http[this.id].disableIntegrityCheck = value;
            }
        });

        $KU.defineGetter(this, 'enableWithCredentials', function() {
            return _http[this.id].enableWithCredentials;
        });
        $KU.defineSetter(this, 'enableWithCredentials', function(value) {
            if(typeof value === 'boolean') {
                _http[this.id].enableWithCredentials = value;
            }
        });

        $KU.defineGetter(this, 'integrityStatus', function() {
            return _http[this.id].integrityStatus;
        });
        //eslint-disable-next-line no-unused-vars
        $KU.defineSetter(this, 'integrityStatus', function(value) {
            //Readonly:: Throw error
        });

        $KU.defineGetter(this, 'onReadyStateChange', function() {
            return _http[this.id].onReadyStateChange;
        });
        $KU.defineSetter(this, 'onReadyStateChange', function(value) {
            if(typeof value === 'function') {
                _http[this.id].onReadyStateChange = value;
            }
        });

        $KU.defineGetter(this, 'readyState', function() {
            return _http[this.id].readyState;
        });
        //eslint-disable-next-line no-unused-vars
        $KU.defineSetter(this, 'readyState', function(value) {
            //Readonly:: Throw error
        });

        $KU.defineGetter(this, 'response', function() {
            return _http[this.id].response;
        });
        //eslint-disable-next-line no-unused-vars
        $KU.defineSetter(this, 'response', function(value) {
            //Readonly:: Throw error
        });

        $KU.defineGetter(this, 'responseType', function() {
            return _http[this.id].responseType;
        });
        $KU.defineSetter(this, 'responseType', function(value) {
            _http[this.id].responseType = value;
        });

        $KU.defineGetter(this, 'status', function() {
            return _http[this.id].status;
        });
        //eslint-disable-next-line no-unused-vars
        $KU.defineSetter(this, 'status', function(value) {
            //Readonly:: Throw error
        });

        $KU.defineGetter(this, 'statusText', function() {
            return _http[this.id].statusText;
        });
        //eslint-disable-next-line no-unused-vars
        $KU.defineSetter(this, 'statusText', function(value) {
            //Readonly:: Throw error
        });

        $KU.defineGetter(this, 'timeout', function() {
            return _http[this.id].timeout;
        });
        $KU.defineSetter(this, 'timeout', function(value) {
            if(typeof value === 'number' && !isNaN(value)) {
                _http[this.id].timeout = value;
            }
        });

        $KU.log({api:'voltmx.net.HttpRequest', exit:true});
    };

    $KU.defineProperty(_HttpRequest.prototype, 'abort', function() {
        var $K = voltmx.$kwebfw$, $KU = $K.utils,
            http = _http[this.id], xhr = http.xhr;

        $KU.log({api:'voltmx.net.HttpRequest.abort', enter:true});

        if(http.timeout) {
            clearTimeout(http.timeout);
        }

        xhr.abort();
        delete _http[this.id];

        $KU.log({api:'voltmx.net.HttpRequest.abort', exit:true});
    });

    $KU.defineProperty(_HttpRequest.prototype, 'getAllResponseHeaders', function() {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, http = _http[this.id], headers = null;

        $KU.log({api:'voltmx.net.HttpRequest.getAllResponseHeaders', enter:true});

        headers = _getAllResponseHeaders.call(http);

        $KU.log({api:'voltmx.net.HttpRequest.getAllResponseHeaders', exit:true});

        return headers;
    });

    $KU.defineProperty(_HttpRequest.prototype, 'getResponseHeader', function(headerfield) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, http = _http[this.id], header = null;

        $KU.log({api:'voltmx.net.HttpRequest.getResponseHeader', enter:true});

        header = _getResponseHeader.call(http, headerfield);

        $KU.log({api:'voltmx.net.HttpRequest.getResponseHeader', exit:true});

        return header;
    });

    $KU.defineProperty(_HttpRequest.prototype, 'open', function(method, url, async, username, password) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils,
            http = _http[this.id], xhr = http.xhr;

        $KU.log({api:'voltmx.net.HttpRequest.open', enter:true});

        if($KU.is(method, 'string')) {
            method = method.toUpperCase();
        }

        if($KU.is(url, 'string') && url) {
            http.url = url;
            http.open = true;
            http.method = method;
            async = ($KU.is(async, 'boolean')) ? async : true;

            xhr.open(method, url, async, username, password);
        }

        $KU.log({api:'voltmx.net.HttpRequest.open', exit:true});
    });

    $KU.defineProperty(_HttpRequest.prototype, 'send', function(data) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils,
            http = _http[this.id], xhr = http.xhr, self = null;

        $KU.log({api:'voltmx.net.HttpRequest.send', enter:true});

        if(data instanceof voltmx.net.FormData) {
            //Calling toString() if it is Voltmx.net.FormData
            //otherwise send the data directly to send method.
            data = data.toString();
        } else if(!data) {
            data = '';
        } else if((window.FormData !== undefined) && data instanceof window.FormData) {
            http.isMultiPartOrBinary = true;
        }

        if(this.enableWithCredentials) {
            xhr.withCredentials = true;
        }

        xhr.count++;
        xhr.timeout = !!this.timeout && this.timeout;

        if(xhr.timeout) {
            self = this;

            http.timeout = setTimeout(function() {
                self.abort();
                self.readyState = xhr.readyState;
                self.status = 0;
                self.statusText = 'Request timed out';
                self.response = '';

                self.onReadyStateChange();
            }, this.timeout);
        }

        if(this.responseType) {
            xhr.responseType = this.responseType;
        }


        http.integrityCheckRequired = _integrity.isIntegrityCheckRequired(http.url, http.disableIntegrityCheck);

        if(http.integrityCheckRequired) {
            _integrity.generateRequestCheckSumAndSetRequestHeader.call(http, data);
        }
        xhr.send(data);

        $KU.log({api:'voltmx.net.HttpRequest.send', exit:true});
    });

    $KU.defineProperty(_HttpRequest.prototype, 'setRequestHeader', function(header, value) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils,
            http = _http[this.id],
            binaryFormats = ['application/octet-stream', 'multipart/form-data'];

        $KU.log({api:'voltmx.net.HttpRequest.setRequestHeader', enter:true});

        if(header && header.toLowerCase() === 'content-type'
        && value && binaryFormats.indexOf(value.toLowerCase()) !== -1) {
            http.isMultiPartOrBinary = true;
        }

        _setRequestHeader.call(http, header, value);

        $KU.log({api:'voltmx.net.HttpRequest.setRequestHeader', exit:true});
    });


    //Dummy implementation
    //eslint-disable-next-line no-unused-vars
    var _invokeService = function(url, inputParamTable, isblocking) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils;

        $KU.log({api:'voltmx.net.invokeService', enter:true});
        $KU.log({api:'voltmx.net.invokeService', exit:true});
    };


    //Dummy implementation
    //eslint-disable-next-line no-unused-vars
    var _invokeServiceAsync = function(url, inputParamTable, callback, info) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils;

        $KU.log({api:'voltmx.net.invokeServiceAsync', enter:true});
        $KU.log({api:'voltmx.net.invokeServiceAsync', exit:true});
    };

    var _integrity = {

        //This function will be called in the scope of http instance
        generateRequestCheckSum: function Integrity$generateRequestCheckSum(data, passThroughOrFileMultipart) {
            var requestCheckSum = null, toHash = null, requestBodyHash = 'EMPTY_BODY';

            if(passThroughOrFileMultipart !== null) {
                requestBodyHash = passThroughOrFileMultipart;
            } else if(data) {
                requestBodyHash = voltmx.crypto.createHashToUpperCase(_integrityProperties.algo, data);
            }

            toHash = 'Request:' + _integrityProperties.salt + ':' + this.randomString + ':' + requestBodyHash;
            requestCheckSum = voltmx.crypto.createHashToUpperCase(_integrityProperties.algo, toHash);
            return requestCheckSum;
        },

        //This function will be called in the scope of http instance
        generateResponseCheckSum: function Integrity$generateResponseCheckSum(data, passThroughOrFileMultipart) {
            var responseCheckSum = null, toHash = null, responseBodyHash = 'EMPTY_BODY';

            if(passThroughOrFileMultipart !== null) {
                responseBodyHash = passThroughOrFileMultipart;
            } else if(data) {
                responseBodyHash = voltmx.crypto.createHashToUpperCase(_integrityProperties.algo, data);
            }
            toHash = ('Response:' + _integrityProperties.salt + ':' + this.randomString + ':' + responseBodyHash);
            responseCheckSum = voltmx.crypto.createHashToUpperCase(_integrityProperties.algo, toHash);

            return responseCheckSum;
        },

        //This function will be called in the scope of http instance
        generateRequestCheckSumAndSetRequestHeader: function Integrity$generateRequestCheckSumAndSetRequestHeader(data) {
            var createCheckSumOnReq = null, requestChecksum = null, headerValue = null;

            this.randomString = voltmx.crypto.generateRandomString();

            if(this.isMultiPartOrBinary) {
                createCheckSumOnReq = this.randomString;
            }

            requestChecksum = _integrity.generateRequestCheckSum.call(this, data, createCheckSumOnReq);
            headerValue = (this.randomString + ';' + requestChecksum);

            _setRequestHeader.call(this, _integrityProperties.headerName, headerValue);
        },

        //This function will be called in the scope of http instance
        generateResponseCheckSumAndCheckIntegrity: function Integrity$generateResponseCheckSumAndCheckIntegrity(data) {
            var responseChecksum = null, responseHeaders = null, checkSum =null,
                passthroughHeaderVal = null, createCheckSumOnResp = null,
                responseContentTypes = ['application/text', 'application/json', 'application/xml',
                    'text/xml', 'text/html', 'application/rss+xml', 'text/plain'];

            var getHeaderValue = function(http, headers, headerName) {
                var headerVal = '';
                //eslint-disable-next-line no-prototype-builtins
                if(headerName && (headers.hasOwnProperty(headerName) || headers.hasOwnProperty(headerName.toLowerCase()))) {
                    headerVal = _getResponseHeader.call(http, headerName);
                }
                return headerVal;
            };

            if(_integrityProperties.validateResp) {
                responseHeaders = _getAllResponseHeaders.call(this);
                passthroughHeaderVal = getHeaderValue(this, responseHeaders, _integrityProperties.passthroughHeaderName);
                if(passthroughHeaderVal.trim().toLowerCase() === 'true') {
                    createCheckSumOnResp = this.randomString;
                } else if(responseContentTypes.indexOf(_getResponseHeader.call(this, 'Content-Type').split(';')[0]) === -1) {
                    createCheckSumOnResp = this.randomString;
                }
                responseChecksum = _integrity.generateResponseCheckSum.call(this, data, createCheckSumOnResp);
                checkSum = getHeaderValue(this, responseHeaders, _integrityProperties.headerName);
                _integrity.setIntegrityStatus.call(this, responseChecksum, checkSum);
            }
        },


        isIntegrityCheckRequired: function Integrity$isIntegrityCheckRequired(url, userDisabledIntegrityCheck) {
            var isIntegrityRequired = false, currHost = null, hyperLink = null;

            if(_integrityProperties && !userDisabledIntegrityCheck) {
                if(_integrityProperties.hostNamesList) {
                    if(typeof document !== 'undefined') {
                        hyperLink = document.createElement('a');
                        hyperLink.href = url;
                        currHost = hyperLink.host;
                    } else {
                        currHost = url.replace('http://', '').replace('https://', '').replace('wwww.', '').split('/')[0];
                    }
                    currHost = currHost.toLowerCase();
                    isIntegrityRequired = _integrity.isIntegrityCheckRequiredForThisHost(currHost);
                } else {
                    isIntegrityRequired = true;
                }
            }

            return isIntegrityRequired;
        },

        isIntegrityCheckRequiredForThisHost: function Integrity$isIntegrityCheckRequiredForThisHost(currHost) {
            var i = 0, host = '', hostsLen = 0, isIntegrityRequired = false,
                hostNamesList = _integrityProperties.hostNamesList;

            hostsLen = hostNamesList.length;
            if(hostsLen > 0) {
                for(i = 0; i < hostsLen; i++) {
                    host = hostNamesList[i];
                    if(host.startsWith('*.')) {
                        host = host.replace('*.', '').toLowerCase();
                        if(currHost.endsWith(host)) {
                            isIntegrityRequired = true;
                            break;
                        }
                    } else if(host === currHost) {
                        isIntegrityRequired = true;
                        break;
                    }
                }
            } else {
                isIntegrityRequired = true;
            }

            return isIntegrityRequired;
        },

        //This function will be called in the scope of http instance
        setIntegrityStatus: function Integrity$setIntegrityStatus(responseChecksum, checkSum) {
            if(responseChecksum === checkSum) {
                voltmx.print('Integrity Successful');
                this.integrityStatus = constants.HTTP_INTEGRITY_CHECK_SUCCESSFUL;
            } else {
                this.integrityStatus = constants.HTTP_INTEGRITY_CHECK_FAILED;
            }
        },

        validateHostNamesList: function Integrity$validateHostNamesList(hostNamesList) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils, i = 0, j = 0, domain = null,
                domainArr = null, domainLen = 0;

            //eslint-disable-next-line no-useless-escape
            var regex = /^[A-Za-z0-9\\\-]+$/;

            if(!$KU.is(hostNamesList, 'undefined') && !$KU.is(hostNamesList, 'null')) {
                if(!$KU.is(hostNamesList, 'array')) {
                    throw new $KU.error('100', 'Error', 'Invalid argument :- hostNamesList');
                }

                for(i = hostNamesList.length - 1; i >= 0; i--) {
                    domain = hostNamesList[i];
                    if(typeof domain === 'undefined' || domain === null || domain.trim() === '') {
                        throw new $KU.error('100', 'Error', 'Invalid argument :- hostNamesList');
                    }
                    if(domain.startsWith('*.')) {
                        domain = domain.replace('*.', '');
                    }
                    domainArr = domain.split('.');
                    domainLen = domainArr.length;
                    if(domainLen <= 1) {
                        throw new $KU.error('100', 'Error', 'Invalid argument :- hostNamesList');
                    }
                    for(j = domainLen - 1; j >= 0; j--) {
                        if(!regex.test(domainArr[j])) {
                            throw new $KU.error('100', 'Error', 'Invalid argument :- hostNamesList');
                        }
                    }
                }
            }
        },

        validateIntegrityParams: function Integrity$validateIntegrityParams(properties) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils,
                algoList = ($K.behavior.strictMode)?['sha256', 'sha512']:['md5', 'sha1', 'sha256', 'sha512'];

            if(Object.keys(properties).length > 0) {
                _integrity.validateIntegrityPropertyType('validateResp', properties.validateResp, 'boolean');
                _integrity.validateIntegrityPropertyType('algo', properties.algo, 'string');
                _integrity.validateIntegrityPropertyType('salt', properties.salt, 'string');
                _integrity.validateIntegrityPropertyType('headerName', properties.headerName, 'string');

                if((algoList.indexOf(properties.algo.toLowerCase())) === -1) {
                    throw new $KU.error('100', 'Error', 'Invalid argumment' + properties.algo);
                }

                if(properties.salt.length > 1024) {
                    properties.salt = properties.salt.substring(0, 1024);
                }

                if(properties.headerName.length > 64) {
                    properties.headerName = properties.headerName.substring(0, 64);
                }

                if(properties.passthroughHeaderName) {
                    _integrity.validateIntegrityPropertyType('passthroughHeaderName', properties.passthroughHeaderName, 'string');
                    if(properties.passthroughHeaderName.length > 64) {
                        properties.passthroughHeaderName = properties.passthroughHeaderName.substring(0, 64);
                    }
                }

                _integrity.validateHostNamesList(properties.hostNamesList);
            } else {
                throw new $KU.error('101', 'Error', 'Invalid number of arguments');
            }

            return true;
        },

        validateIntegrityPropertyType: function Integrity$validateIntegrityPropertyType(propertyName, propertyValue, propertyType) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils;

            if(typeof propertyValue !== propertyType) {
                throw new $KU.error('100', 'Error', 'Invalid argument' + propertyName);
            }

            return true;
        }

    };


    var _iterator = function(data, arg) {
        var keys = Object.keys(data),
            keyIndex = 0, valueIndex = 0;

        if(arg === 'entries') {
            return {
                next: function() {
                    var key = '', value = null;

                    if(keyIndex < keys.length) {
                        key = keys[keyIndex];
                        value = data[key];

                        if(valueIndex >= value.length) {
                            valueIndex = 0;
                            keyIndex++;
                        }

                        return {
                            done: false,
                            value: [key, value[valueIndex++]]
                        };
                    }
                    return {
                        done: true,
                        value: undefined
                    };
                }
            };
        } else if(arg === 'keys') {
            return {
                next: function() {
                    if(keyIndex < keys.length) {
                        return {
                            done: false,
                            value: keys[keyIndex++]
                        };
                    }
                    return {
                        done: true,
                        value: undefined
                    };
                }
            };
        } else if(arg === 'values') {
            return {
                next: function() {
                    var key = '', value = null;

                    if(keyIndex < keys.length) {
                        key = keys[keyIndex];
                        value = data[key];

                        if(valueIndex >= value.length) {
                            valueIndex = 0;
                            keyIndex++;
                        }
                        return {
                            done: false,
                            value: value[valueIndex++]
                        };
                    }
                    return {
                        done: true,
                        value: undefined
                    };
                }
            };
        }
    };


    var _isNetworkAvailable = function(networkType) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils;

        $KU.log({api:'voltmx.net.isNetworkAvailable', enter:true});

        if(networkType) {
            if(networkType === constants.NETWORK_TYPE_ANY) {
                if(!$KU.is(navigator.onLine, 'undefined')) {
                    $KU.log({api:'voltmx.net.isNetworkAvailable', exit:true});
                    return navigator.onLine;
                }
                $KU.log({api:'voltmx.net.isNetworkAvailable', exit:true});
                return false;
            } else if(networkType === constants.NETWORK_TYPE_3G
            || networkType === constants.NETWORK_TYPE_WIFI
            || networkType === constants.NETWORK_TYPE_ETHERNET) {
                $KU.log({api:'voltmx.net.isNetworkAvailable', exit:true});
                return false;
            }
            throw new Error('Invalid Network Type');
        } else {
            throw new Error('Invalid Network Type');
        }
    };


    var _loadClientCertificate = function() {
        var $K = voltmx.$kwebfw$, $KU = $K.utils;

        $KU.unsupportedAPI('voltmx.net.loadClientCertificate');
    };


    var _removeAllCachedResponses = function() {
        var $K = voltmx.$kwebfw$, $KU = $K.utils;

        $KU.unsupportedAPI('voltmx.net.removeAllCachedResponses');
    };


    var _removeClientCertificate = function() {
        var $K = voltmx.$kwebfw$, $KU = $K.utils;

        $KU.unsupportedAPI('voltmx.net.removeClientCertificate');
    };


    var _removeIntegrityCheck = function() {
        var $K = voltmx.$kwebfw$, $KU = $K.utils;

        $KU.log({api:'voltmx.net.removeIntegrityCheck', enter:true});

        _integrityProperties = null;

        $KU.log({api:'voltmx.net.removeIntegrityCheck', exit:true});
    };


    //This function will be called in the scope of http instance
    var _setRequestHeader = function(header, value) {
        var xhr = this.xhr;

        xhr.setRequestHeader(header, value);
    };


    var _setIntegrityCheck = function(properties) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils;

        $KU.log({api:'voltmx.net.setIntegrityCheck', enter:true});

        if(_integrity.validateIntegrityParams(properties)) {
            $KU.log('voltmx.net.setIntegrityCheck', properties);

            _integrityProperties = properties;
        }

        $KU.log({api:'voltmx.net.setIntegrityCheck', exit:true});
    };


    var _setNetworkCallbacks = function(config) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils;

        $KU.log({api:'voltmx.net.setNetworkCallbacks', enter:true});

        if($KU.is(config, 'object') && $KU.is(config.statusChange, 'function')) {
            if($KU.is(window.ononline, 'object')) {
                window.addEventListener('online', function() {
                    config.statusChange(navigator.onLine);
                }, false);
            }
            if($KU.is(window.onoffline, 'object')) {
                window.addEventListener('offline', function() {
                    config.statusChange(navigator.onLine);
                }, false);
            }

            $KU.log({api:'voltmx.net.setNetworkCallbacks', enter:true});
        } else {
            throw new Error('Invalid Input : config is not of valid type');
        }
    };

    $K.defVoltmxProp(_ns, [
        {keey:'cancel', value:_cancel},
        {keey:'clearCookies', value:_clearCookies},
        {keey:'FormData', value:_FormData},
        {keey:'getActiveNetworkType', value:_getActiveNetworkType},
        {keey:'getCookies', value:_getCookies},
        {keey:'HttpRequest', value:_HttpRequest},
        {keey:'invokeService', value:_invokeService},
        {keey:'invokeServiceAsync', value:_invokeServiceAsync, writable:true},
        {keey:'isNetworkAvailable', value:_isNetworkAvailable},
        {keey:'loadClientCertificate', value:_loadClientCertificate},
        {keey:'removeAllCachedResponses', value:_removeAllCachedResponses},
        {keey:'removeClientCertificate', value:_removeClientCertificate},
        {keey:'removeIntegrityCheck', value:_removeIntegrityCheck},
        {keey:'setIntegrityCheck', value:_setIntegrityCheck},
        {keey:'setNetworkCallbacks', value:_setNetworkCallbacks}
    ]);


    return _ns;
}())});
