$KI.net = {

    integrityProperties: null,

    postdataparams: function(postobj) {
        var postdata = "",
            value;

        for(var i in postobj) {

            if(postobj.hasOwnProperty(i) && i != "httpheaders") {
                value = postobj[i];
                voltmx.print("postdataparams:key  = " + i + "  value  =  " + value);
                postdata += i + '=' + encodeURIComponent(value);
                postdata += "&";
            }
        }
        return postdata;
    },
    
    FormData: function(formdataparam) {

        function makeIterator(_formdata, arg) {
            var arrKey = Object.keys(_formdata);
            var index =0;
            var index1=0;
            if(arg == "entries") {
                return {
                    next: function() {
                        if(index < arrKey.length && index1 >= _formdata[arrKey[index]].length) {
                            index1 = 0;
                            index++;
                        }
                        return (index < arrKey.length)? {done: false, value: [arrKey[index],_formdata[arrKey[index]][index1++]]} : {done: true, value: undefined};
                    }
                };
            } else if (arg == "keys") {
                return {
                    next: function() {
                        return (index < arrKey.length)? {done: false, value: arrKey[index++]} : {done: true, value: undefined};
                    }
                };
            } else if(arg == "values") {
                return {
                    next: function() {
                        if(index < arrKey.length && index1 >= _formdata[arrKey[index]].length) {
                            index1 = 0;
                            index++;
                        }
                        return (index < arrKey.length)? {done: false, value: _formdata[arrKey[index]][index1++]} : {done: true, value: undefined};
                    }
                };
            }
        }
        $KU.logExecuting('voltmx.net.FormData');
        if(formdataparam && formdataparam.isMultiPart && (window.FormData != undefined)) {
            $KU.logExecutingWithParams('voltmx.net.FormData', formdataparam);
            $KU.logExecutingFinished('voltmx.net.FormData VIA if (formdataparam && formdataparam.isMultiPart && (window.FormData != undefined)) is true');
            return new FormData();
        } else {
            $KU.logExecutingWithParams('voltmx.net.FormData', formdataparam);
            var _formdata = {},
            that = this;
            that.append = function(key, value) {
                if(key == "undefined" || key == "") {
                    $KU.logErrorMessage('FormData append Error: key cannot be empty');
                    throw new Error("FormData append Error: key cannot be empty");
                }
                
                
                if(!$KG.appbehaviors.doNotEncodeFormValue) {
                    value = encodeURIComponent(value);
                }
                if(!_formdata[key]) {
                    _formdata[key] = [value];
                } else {
                    _formdata[key].push(value);
                }
            },
            that.toString = function() {
                var formdata = "";
                for(var key in _formdata) {
                    if(formdata == "") {
                        formdata = key + '=' + _formdata[key].join('&' + key + '=');
                    } else {
                        formdata += '&' + key + '=' + _formdata[key].join('&' + key + '=');
                    }
                }
                return formdata;
            },
            that.delete = function(key) {
                delete _formdata[key];
            },
            that.entries = function() {
                return makeIterator(_formdata, "entries");
            },
            that.get = function(key) {
                return _formdata[key][0];
            },
            that.getAll = function(key) {
                return _formdata[key];
            },
            that.has = function(key) {
                return _formdata.hasOwnProperty(key);
            },
            that.keys = function() {
                return makeIterator(_formdata, "keys");
            },
            that.set = function(key, value) {
                if(_formdata.hasOwnProperty(key)) {
                    delete _formdata[key];
                }
                _formdata[key] = [value];
            },
            that.values = function() {
                return makeIterator(_formdata, "values");
            }
            $KU.logExecutingFinished('voltmx.net.FormData VIA VIA if (formdataparam && formdataparam.isMultiPart && (window.FormData != undefined)) is false');
        }
    },

    HttpRequest: function() {
        var _openflag = false,
            _requestMethod = null,
            _sendcount = 0,
            that = this,
            _xhr = null,
            _isIntegrityCheckRequired = false,
            _url = null,
            _xhrtimeout = null;
        $KU.logExecuting('voltmx.net.HttpRequest');
        $KU.logExecutingWithParams('voltmx.net.HttpRequest');
        if(window.XMLHttpRequest) {
            _xhr = new XMLHttpRequest();
        } else {
            _xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }

        that.onReadyStateChange = null;
        that.disableIntegrityCheck = false;
        that.readyState = undefined;
        that.response = "";
        that._ismultipartorbinary = false;
        that.responseType = "";
        that.status = null;
        that.statusText = null;
        that.timeout = 0;
        that.enableWithCredentials = false; 
        that.randomString = '';
        that.integrityStatus = constants.HTTP_INTEGRITY_CHECK_NOT_DONE;

        _xhr.onreadystatechange = function() {
            
            that.status = _xhr.status;
            switch(_xhr.readyState) {
                case 0: 
                case 1: 
                case 2: 
                case 3: 
                    that.readyState = _xhr.readyState;
                    that.response = "";
                    !!that.onReadyStateChange && that.onReadyStateChange(that);
                    break;

                case 4: 
                    that.statusText = "Request Completed";
                    that.readyState = _xhr.readyState;
                    
                    if(_xhr.responseType == "" || _xhr.responseType == "text") {
                        that.response = _xhr.responseText;
                    } else {
                        that.response = _xhr.response;
                    }
                    if(_isIntegrityCheckRequired) {
                        $KI.net.generateResponseCheckSumAndCheckIntegrity($KI.net.integrityProperties, that, that.response);
                    }
                    if(_xhr.status === 200) {
                        that.statusText += ": OK";
                        if(_xhrtimeout) clearTimeout(_xhrtimeout);
                    }
                    if(_xhr.status === 400) {
                        that.statusText += ": Error";
                        if(_xhrtimeout) clearTimeout(_xhrtimeout);
                    }!!that.onReadyStateChange && that.onReadyStateChange(that); 
                    break;

                default:
                    $KU.logErrorMessage('Unknown Error : XMLHttpRequest error');
                    throw new Error("Unknown Error : XMLHttpRequest Error");
            }
        };

        that.timeoutFunction = function() {
            that.abort();
            that.readyState = _xhr.readyState;
            that.status = 0;
            that.statusText = "Request timed out";
            that.response = "";
            !!that.onReadyStateChange && that.onReadyStateChange();
        };

        that.open = function(requestMethod, url, async, username, password) {
            if(!requestMethod && requestMethod !== "GET" && requestMethod !== "POST") {
                $KU.logErrorMessage('Syntax Error : Request Method is not defined');
                throw new Error("Syntax Error : Request Method is not defined");
                return;
            }
            if(!url) {
                $KU.logErrorMessage('Syntax Error : URL is not defined');
                throw new Error("Syntax Error : URL is not defined");
                return;
            }
            _url = url;
            async = ((async === true) || (async === false)) && async || true;
            _requestMethod = requestMethod;
            _openflag = true;
            _xhr.open(_requestMethod, url, async, username, password);
        };

        that.send = function(data) {
            if(_openflag === false) {
                $KU.logErrorMessage("InvalidStateError : 'send' called before 'open'");
                throw new Error("InvalidStateError : 'send' called before 'open' ");
                return;
            }

            if(_sendcount > 1) {
                $KU.logErrorMessage("InvalidStateError : 'send' called more than once ");
                throw new Error("InvalidStateError : 'send' called more than once ");
                return;
            }

            if(data instanceof voltmx.net.FormData) {
                data = data.toString(); 
            } else if(!data) {
                data = "";
            } else if((window.FormData !== undefined) && data instanceof window.FormData) {
                that._ismultipartorbinary = true;
            }

            if(that.enableWithCredentials) {
                _xhr.withCredentials = true;
            }
            _sendcount++;
            _xhr.timeout = !!that.timeout && that.timeout;
            if(_xhr.timeout) {
                _xhrtimeout = setTimeout(that.timeoutFunction, that.timeout);
            }
            _xhr.responseType = that.responseType;
            _isIntegrityCheckRequired = $KI.net.isIntegrityCheckRequired(_url, that.disableIntegrityCheck);
            if(_isIntegrityCheckRequired) {
                $KI.net.generateRequestCheckSumAndSetRequestHeader($KI.net.integrityProperties, that, data);
            }
            _xhr.send(data);
        };

        that.abort = function() {
            _xhr.abort();
        };

        that.setRequestHeader = function(header, value) {
            var binaryFormats = ['application/octet-stream', 'multipart/form-data'];

            if(_openflag === false) {
                $KU.logErrorMessage("InvalidStateError : 'setRequestHeader' called before 'open' ");
                throw new Error("InvalidStateError : 'setRequestHeader' called before 'open' ");
                return;
            }
            if(_sendcount > 1) {
                $KU.logErrorMessage("InvalidStateError : 'setRequestHeader' called after 'send' ");
                throw new Error("InvalidStateError : 'setRequestHeader' called after 'send' ");
                return;
            }

            if(header && header.toLowerCase() === 'content-type'
            && value && binaryFormats.indexOf(value.toLowerCase()) !== -1) {
                that._ismultipartorbinary = true;
            }

            _xhr.setRequestHeader(header, value);

        };
        that.getResponseHeader = function(headerfield) {
            return !!_xhr.getResponseHeader(headerfield) && _xhr.getResponseHeader(headerfield) || null;
        };
        that.getAllResponseHeaders = function() {
            var headers, arr, parts, header, value, line, count = 0,
                headerMap = {}; 
            headers = !!_xhr.getAllResponseHeaders() && _xhr.getAllResponseHeaders() || null;
            
            if($KG.appbehaviors.isResponseHeaderString) {
                return headers;
            }
            
            
            if(headers) {
                arr = headers.trim().split(/[\r\n]+/);
                for(count = 0; count < arr.length; count++) {
                    line = arr[count];
                    parts = line.split(': ');
                    header = parts.shift();
                    value = parts.join(': ');
                    headerMap[header] = value;
                }
            }
            return headerMap;
        };
        $KU.logExecutingFinished('voltmx.net.HttpRequest');
    },

    generateRequestCheckSumAndSetRequestHeader: function(integrityProperties, ajaxobj, data) {
        var algo = integrityProperties.algo, salt = integrityProperties.salt,
            headerName = integrityProperties.headerName, createCheckSumOnReq = null,
            requestChecksum = '', headerValue = '' ;

        ajaxobj.randomString = $KI.crypto.generateRandomString();
        if(ajaxobj._ismultipartorbinary) {
            createCheckSumOnReq = ajaxobj.randomString;
        }

        requestChecksum = $KI.net.generateRequestCheckSum(algo, salt, data, ajaxobj, createCheckSumOnReq);
        headerValue = ajaxobj.randomString + ";" + requestChecksum;
        ajaxobj.setRequestHeader(headerName, headerValue);
    },

    generateResponseCheckSumAndCheckIntegrity: function(integrityProperties, ajaxobj, response) {
        var responseChecksum = '', headers = {}, createCheckSumOnResp = null,
            integrityHeaderName = integrityProperties.headerName,
            passthroughHeaderName = integrityProperties.passthroughHeaderName,
            responseContentTypes = ["application/text", "application/json", "application/xml",
            "text/xml", "text/html", "application/rss+xml", "text/plain"];

        var _getResponseHeader = function(headerName) {
            var headerVal = '';
            if(headerName
            && (headers.hasOwnProperty(headerName) || headers.hasOwnProperty(headerName.toLowerCase()))) {
                headerVal = ajaxobj.getResponseHeader(headerName);
            }
            return headerVal;
        };

        if(integrityProperties.validateResp) {
            headers = ajaxobj.getAllResponseHeaders();
            if(_getResponseHeader(passthroughHeaderName).trim().toLowerCase() == 'true') {
                createCheckSumOnResp = ajaxobj.randomString;
            } else if(responseContentTypes.indexOf(_getResponseHeader('Content-Type').split(';')[0]) == -1) {
                createCheckSumOnResp = ajaxobj.randomString;
            }
            responseChecksum = $KI.net.generateResponseCheckSum(integrityProperties.algo, integrityProperties.salt, response, ajaxobj.randomString, createCheckSumOnResp);
            $KI.net.setIntegrityStatus(responseChecksum, _getResponseHeader(integrityHeaderName), ajaxobj);
        }
    },

    isIntegrityCheckRequired: function(url, userDisabledIntegrityCheck) {
        var returnCheckRequired = false, properties = $KI.net.integrityProperties,
            currHost = null, hyperLink = null;

        if(properties && !userDisabledIntegrityCheck) {
            if(properties.hostNamesList) {
                if(typeof document !== 'undefined') {
                    hyperLink = document.createElement('a');
                    hyperLink.href = url;
                    currHost = hyperLink.host;
                } else {
                    currHost = url.replace('http://', '').replace('https://', '').replace('wwww.','').split('/')[0];
                }
                currHost = currHost.toLowerCase();
                returnCheckRequired = $KI.net.isIntegrityCheckRequiredForThisHost(properties.hostNamesList, currHost);
            } else {
                returnCheckRequired = true;
            }
        }

        return returnCheckRequired;
    },

    isIntegrityCheckRequiredForThisHost: function(hostNamesList, currHost) {
        var i = 0, host = '', hostsLen = 0, returnCheckRequired = false;

        hostsLen = hostNamesList.length;
        if(hostsLen > 0) {
            for(i = 0; i < hostsLen; i++) {
                host = hostNamesList[i];
                if(host.startsWith('*.')) {
                    host = host.replace('*.', '').toLowerCase();
                    if(currHost.endsWith(host)) {
                        returnCheckRequired = true;
                        break;
                    }
                } else if(host == currHost) {
                    returnCheckRequired = true;
                    break;
                }
            }
        } else {
            returnCheckRequired = true;
        }

        return returnCheckRequired;
    },


    setIntegrityStatus: function(responseChecksum, checkSum, ajaxobj) {
        if(responseChecksum == checkSum) {
            voltmx.print("Integrity Successful");
            ajaxobj.integrityStatus = constants.HTTP_INTEGRITY_CHECK_SUCCESSFUL;
        } else {
            ajaxobj.integrityStatus = constants.HTTP_INTEGRITY_CHECK_FAILED;
        }
    },

    checkIntegrityPropertyType: function(propertyName, propertyValue, propertyType) {
        if(typeof propertyValue != propertyType) {
            throw new VoltmxError("100", "Error", "Invalid argument :- " + propertyName);
        }
        return true;
    },

    validateHostNamesList: function(properties) {
        var i = 0, j = 0, domain = null, domainArr = null, domainLen = 0,
            regex = /^[A-Za-z0-9\\\-]+$/;

        if(typeof properties.hostNamesList !== 'undefined' && properties.hostNamesList !== 'null') {
            if(!$KU.isArray(properties.hostNamesList)) {
                throw new VoltmxError('100', 'Error', 'Invalid argument :- hostNamesList');
            }
            for (i = properties.hostNamesList.length - 1; i >= 0; i--) {
                domain = properties.hostNamesList[i];
                if(typeof domain === 'undefined' || domain === null || domain.trim() === '') {
                    throw new VoltmxError('100', 'Error', 'Invalid argument :- hostNamesList');
                }
                if(domain.startsWith('*.')){
                    domain = domain.replace('*.', '');
                }
                domainArr = domain.split('.');
                domainLen = domainArr.length;
                if(domainLen <= 1) {
                     throw new VoltmxError('100', 'Error', 'Invalid argument :- hostNamesList');
                }
                for (j = domainLen - 1; j >= 0; j--) {
                    if(!regex.test(domainArr[j])) {
                        throw new VoltmxError('100', 'Error', 'Invalid argument :- hostNamesList');
                    }
                }
            }
        }
    },

    validateIntegrityParams: function(properties) {
        var algoList;

        if(Object.keys(properties).length > 0) {
            if(($KI.net.checkIntegrityPropertyType('validateResp', properties.validateResp, 'boolean'))
            &&($KI.net.checkIntegrityPropertyType('algo', properties.algo, 'string'))
            &&($KI.net.checkIntegrityPropertyType('salt', properties.salt, 'string'))
            &&($KI.net.checkIntegrityPropertyType('headerName', properties.headerName, 'string'))) {
                
                algoList = ($KG.appbehaviors.strictMode)?['sha256', 'sha512']:['md5', 'sha1', 'sha256', 'sha512'];
                if((algoList.indexOf(properties.algo.toLowerCase())) == -1) {
                    throw new VoltmxError("100", "Error", "Invalid argument" + properties.algo);
                }

                if(properties.salt.length > 1024) {
                    properties.salt = properties.salt.substring(0, 1024);
                }

                if(properties.headerName.length > 64) {
                    properties.headerName = properties.headerName.substring(0, 64);
                }

                if(properties.passthroughHeaderName) {
                    $KI.net.checkIntegrityPropertyType('passthroughHeaderName', properties.passthroughHeaderName, 'string');
                    if(properties.passthroughHeaderName.length > 64) {
                        properties.passthroughHeaderName = properties.passthroughHeaderName.substring(0, 64);
                    }
                }

                $KI.net.validateHostNamesList(properties);
            }

        } else {
            throw new VoltmxError("101", "Error", "Invalid number of arguments");
        }
        return true;
    },

    generateRequestCheckSum: function(algo, salt, requestBody, ajaxobj, passThroughOrFileMultipart) {
      var requestCheckSum, toHash,
          requestBodyHash = 'EMPTY_BODY';

      if(passThroughOrFileMultipart !== null) {
          requestBodyHash = passThroughOrFileMultipart;
      } else if(requestBody) {
          requestBodyHash = $KI.crypto.createHashToUpperCase(algo, requestBody);
      }

      toHash = "Request:" + salt + ":" + ajaxobj.randomString + ":" + requestBodyHash;
      requestCheckSum = $KI.crypto.createHashToUpperCase(algo, toHash);
      return requestCheckSum;
    },

    generateResponseCheckSum: function(algo, salt, responseBody, randomString, passThroughOrFileMultipart) {
      var responseBodyHash, responseCheckSum, toHash,
          responseBodyHash = 'EMPTY_BODY';

        if(passThroughOrFileMultipart !== null) {
            responseBodyHash = passThroughOrFileMultipart;
        } else if(responseBody) {
            responseBodyHash = $KI.crypto.createHashToUpperCase(algo, responseBody);
        }
      toHash = "Response:" + salt + ":" + randomString + ":" + responseBodyHash;
      responseCheckSum = $KI.crypto.createHashToUpperCase(algo, toHash);
      return responseCheckSum;
    },

    setIntegrityCheck: function(properties) {
        var checkIntegrityParams = $KI.net.validateIntegrityParams(properties);
        $KU.logExecuting('voltmx.net.setIntegrityCheck');
        if(checkIntegrityParams) {
            $KU.logExecutingWithParams('voltmx.net.setIntegrityCheck', properties);
            $KI.net.integrityProperties = properties;
        }
        $KU.logExecutingFinished('voltmx.net.setIntegrityCheck');
    },

    removeIntegrityCheck: function() {
        $KU.logExecuting('voltmx.net.removeIntegrityCheck');
        $KU.logExecutingWithParams('voltmx.net.removeIntegrityCheck');
        $KI.net.integrityProperties = null;
        $KU.logExecutingFinished('voltmx.net.removeIntegrityCheck');
    },

    sethttpheaders: function(ajaxobj, headers) {

        var headerdata = [],
            value, index = 0;

        for(var i in headers) {
            if(headers.hasOwnProperty(i) && headers[i]) {
                value = headers[i] ? headers[i] : "";
                headerdata.push(i);
                voltmx.print("sethttpheaders: key: " + i + "value: " + value);
                ajaxobj.setRequestHeader(i, value);
            }
        }
        return headerdata;
    },

    loadJSFile: function(fileurl, async, callback) {
        var status = 0;
        var timeout = 30000;
        var options = {
            type: "GET",
            url: fileurl,
            timeout: timeout,
            paramstr: null,
            callback: callback,
            info: ""
        };
        voltmx.print("loadJSFile: options: " + options);

        return(function ajax() {

            function invokecallback(callback) {
                if(callback) callback();
            };

            var requestDone = false; 
            var ajaxobj = new XMLHttpRequest(); 
            ajaxobj.open(options.type, options.url, async);
            ajaxobj.onLoaded = function() {
                if(this.userCancelled) {
                    voltmx.print(" onLoaded: on Abort Mission");
                    this.onAbort();
                }
            };

            ajaxobj.onInteractive = function() {
                if(this.userCancelled) {
                    voltmx.print(" onInteractive: on Abort Mission");
                    this.onAbort();
                } else
                if(!this.firstByte) {
                    this.firstByte = true;
                }
            };

            
            ajaxobj.onAbort = function(transport) {

                
                voltmx.print(" onInteractive: <- Abort Mission");
                if(this.userCancelled) {

                    this.userCancelled = false;
                    this.ignoreCallback = true;
                    rettable = {
                        "opstatus": 1,
                        "errcode": 1022,
                        "errmsg": "Request cancelled by user"
                    };
                    voltmx.print(" onInteractive: Abort Mission Success");
                }
                voltmx.print(" onInteractive: -> Abort Mission");
            };

            ajaxobj.onTimeout = function() {

                requestDone = true;
                rettable = {
                    "opstatus": 1,
                    "errcode": 1014,
                    "errmsg": "Request timed out"
                };
                voltmx.print("Request timed out.");
            };

            ajaxobj.onreadystatechange = function() {
                
                switch(!this.ignoreCallback && ajaxobj.readyState) {

                    case 1:
                        voltmx.print("onreadystatechange: ReadyState 1");
                        ajaxobj.onLoaded(ajaxobj);
                        break;

                    case 2:
                        voltmx.print("onreadystatechange: ReadyState 2");
                        ajaxobj.onInteractive(ajaxobj);
                        break;

                    case 3:
                        voltmx.print("onreadystatechange: ReadyState 3");
                        ajaxobj.onAbort(ajaxobj);
                        break;

                    case 4:
                        voltmx.print("onreadystatechange: ReadyState 4");
                        if(!requestDone) {
                            ajaxobj.onComplete(ajaxobj);
                            
                            ajaxobj = null;
                        }
                        break;

                    default:
                        voltmx.print("onreadystatechange: ReadyState Invalid: " + ajaxobj.readyState);
                }
            };

            ajaxobj.addResponseText = function(transport) {
                
                rettable = transport.responseText;
                
                if(typeof document != "undefined") {
                    var script = document.createElement('script');
                    script.type = "text/javascript";
                    script.text = transport.responseText;
                    document.getElementsByTagName('head')[0].appendChild(script);
                    if(options.callback) options.callback();
                    document.getElementsByTagName('head')[0].removeChild(script);
                }
            };

            ajaxobj.onComplete = function(transport) {

                
                window.clearTimeout(transport.timeoutid);
                voltmx.print("status: " + transport.status + "readystate: " + transport.readyState);

                this.firstByte = false;

                if(this.userCancelled) {
                    voltmx.print(" onComplete: on Abort Mission");
                    this.onAbort();
                    return;
                }

                if(transport.status == 200) {
                    if(transport.responseText && transport.responseText.length > 0) {
                        if(options.callback) {
                            options.callback(transport.responseText);
                        }
                    }
                    
                    else {
                        voltmx.print("errcode: 1013, No JS Code");
                        rettable = {
                            "opstatus": "1",
                            "errcode": "1013",
                            "errmsg": "Request returned no JS code"
                        };
                    }
                } else {
                    
                    if(transport.status == 0 || (/5+/.test(transport.status.toString()) == true)) {
                        
                        if(transport.responseText && transport.responseText.length > 0) {
                            if(options.callback) {
                                options.callback(transport.responseText);
                            }
                            return;
                        }
                        voltmx.print("errcode: 1012, Request Failed");
                        rettable = {
                            "opstatus": 1,
                            "errcode": "1012",
                            "errmsg": "Request Failed"
                        };
                    } else {
                        
                        if(/4+/.test(transport.status.toString()) == true) {
                            voltmx.print("errcode: 1012, Request Failed");
                            rettable = {
                                "opstatus": 1,
                                "errcode": "1015",
                                "errmsg": "Request Failed"
                            };
                        } else {
                            if(transport.responseText != "") {
                                voltmx.print("Status != 200 but response exists");
                                rettable = transport.responseText;
                            } else
                                voltmx.print("Empty response received.");
                        }
                    }
                }
            };

            
            ajaxobj.timeoutid = setTimeout(ajaxobj.onTimeout, options.timeout);
            ajaxobj.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            
            if(typeof(headerobj) == "object")
                options.httpheaders = $KI.net.sethttpheaders(ajaxobj, headerobj);

            
            ajaxobj.send(options.paramstr);

            return ajaxobj;
        })();
    },

    invokeserviceasync: function(posturl, postdata, Callback, info, method, timeout) {
        var status = 0;
        var rettable = null;
        var usertimeout = timeout || 60000; 
        var origin = window.location.protocol + "//" + window.location.host;
        var proxyurl = "";
        var postorigin = "";
        var appmode = $KG["appmode"];
        var middlewarecontext = $KI.props.getProperty(null, 'appmiddlewarecontext') || ((typeof appConfig != "undefined") && appConfig && appConfig.middlewareContext) || ((typeof config != "undefined") && config && config.middlewarecontext) || "middleware";

        voltmx.print("invokeServiceAsync<- " + posturl);
        voltmx.print("middlewarecontext<- " + middlewarecontext);
        if(appmode == constants.APPLICATION_MODE_NATIVE) {

            var i = posturl.indexOf(middlewarecontext);
            if(i != -1) {
                postorigin = posturl.slice(0, i);
            }
            
            if($KG["skipproxy"] || ($KI.net.checkOriginandPostOrigin(origin, postorigin) && posturl)) {
                proxyurl = origin + "/" + middlewarecontext + "/MWServlet"; 
            } else {
                proxyurl = origin + "/" + $KG["appid"] + "/spa";
                voltmx.print("using proxy: URL " + proxyurl);

                if(postdata) {
                    postdata["_desturl"] = posturl;
                } else {
                    postdata = {};
                    postdata["_desturl"] = posturl;
                    voltmx.print("Without postdata " + posturl);
                }
            }
            postdata["rcid"] = $KG["rcid"] || "";
        }

        var headerobj = postdata && postdata["httpheaders"];
        var postdatastr = (postdata && $KI.net.postdataparams(postdata)) || "";

        voltmx.print("invokeServiceAsync: URL: " + posturl);
        voltmx.print("invokeServiceAsync: Args are: " + postdatastr);
        voltmx.print("middleware origin: " + postorigin);
        voltmx.print("location origin: " + origin);

        
        if(posturl && posturl.indexOf("/IST") != -1 || posturl.indexOf("/CMS") != -1) {
            proxyurl = posturl;
        } else if(posturl) {
            if(typeof document != "undefined") {
                var anchor = document.createElement('a');
                anchor.href = posturl;
                
                var posturlorigin = anchor.protocol + "//" + anchor.host;
                if($KI.net.checkOriginandPostOrigin(posturlorigin, origin)) {
                    proxyurl = posturl;
                }
            }
        }

        if(appmode == constants.APPLICATION_MODE_HYBRID || appmode == constants.APPLICATION_MODE_WRAPPER) {
            proxyurl = posturl;
            voltmx.print("!!!!!!!!!!appmode hybrid/wrapper: " + proxyurl);
        }

        var httpconfig = postdata && postdata["httpconfig"];
        if(httpconfig && httpconfig.timeout && !isNaN(httpconfig.timeout))
            usertimeout = parseInt(httpconfig.timeout) * 1000;

        var options = {
            type: "POST",
            url: proxyurl,
            timeout: usertimeout,
            paramstr: postdatastr,
            callback: Callback,
            info: info || null
        };

        if(method && typeof method != "undefined" && "GET".toLowerCase() === method.toLowerCase()) {
            options.type = "GET";
            options.url = options.url + "?" + postdatastr;
        }

        voltmx.print("invokeServiceAsync: options: " + options);
        voltmx.system.activity.increment();

        return(function ajax() {

            
            if(spaAPM !== null) {
                var timeTaken = new Date().getTime();
                var urlOrID = null;
                if(postdata["serviceID"])
                    urlOrID = postdata["serviceID"];
                else
                    urlOrID = options.url;
                spaAPM.sendMsg(urlOrID, 'servicerequest');
            }

            function invokecallback(callback, status, rettable, info) {
                
                voltmx.system.activity.decrement();
                if(!voltmx.system.activity.hasActivity()) {
                    if(typeof $KW !== "undefined") {
                        $KW.unLoadWidget();
                    }
                }
                
                if(callback) {
                    callback(status, rettable, info);
                    $KU.onEventHandler();
                }

                
                if(spaAPM !== null) {
                    if(timeTaken)
                        var ts = new Date().getTime() - timeTaken;
                    else
                        var ts = null;
                    spaAPM.sendMsg(urlOrID, 'serviceresponse', {
                        "opstatus": (rettable && rettable.opstatus) ? rettable.opstatus : null,
                        "httpcode": status ? status : null,
                        "resptime": ts
                    });
                }
            };

            var requestDone = false; 
            var ajaxobj = new XMLHttpRequest(); 
            ajaxobj.open(options.type, options.url, true);
            ajaxobj.onLoaded = function() {
                if(this.userCancelled) {
                    voltmx.print(" onLoaded: on Abort Mission");
                    this.onAbort();
                } else
                    invokecallback(options.callback, 100, null);
            };

            ajaxobj.onInteractive = function() {
                if(this.userCancelled) {
                    voltmx.print(" onInteractive: on Abort Mission");
                    this.onAbort();
                } else
                if(!this.firstByte) {
                    this.firstByte = true;
                    invokecallback(options.callback, 200, null);
                }
            };

            
            ajaxobj.onAbort = function(transport) {

                
                voltmx.print(" onInteractive: <- Abort Mission");
                if(this.userCancelled) {

                    this.userCancelled = false;
                    this.ignoreCallback = true;
                    rettable = {
                        "opstatus": 1,
                        "errcode": 1022,
                        "errmsg": "Request cancelled by user"
                    };
                    invokecallback(options.callback, 300, rettable);
                    voltmx.print(" onInteractive: Abort Mission Success");
                }
                voltmx.print(" onInteractive: -> Abort Mission");
            };

            ajaxobj.onTimeout = function() {
                if(ajaxobj.userCancelled) {
                    ajaxobj.onAbort();
                } else {
                    requestDone = true;
                    rettable = {
                        "opstatus": 1,
                        "errcode": 1014,
                        "errmsg": "Request timed out"
                    };
                    invokecallback(options.callback, 400, rettable);
                }
            };

            ajaxobj.onreadystatechange = function() {
                
                switch(!this.ignoreCallback && ajaxobj.readyState) {

                    case 1:
                        voltmx.print("onreadystatechange: ReadyState 1");
                        ajaxobj.onLoaded(ajaxobj);
                        break;

                    case 2:
                        voltmx.print("onreadystatechange: ReadyState 2");
                        ajaxobj.onInteractive(ajaxobj);
                        break;

                    case 3:
                        voltmx.print("onreadystatechange: ReadyState 3");
                        ajaxobj.onAbort(ajaxobj);
                        break;

                    case 4:
                        voltmx.print("onreadystatechange: ReadyState 4");
                        if(!requestDone) {
                            ajaxobj.onComplete(ajaxobj);
                            
                            ajaxobj = null; 
                        }
                        break;

                    default:
                        voltmx.print("onreadystatechange: ReadyState Invalid: " + ajaxobj.readyState);
                }
            };

            ajaxobj.onComplete = function(transport) {

                
                window.clearTimeout(transport.timeoutid);
                voltmx.print("status: " + transport.status + "readystate: " + transport.readyState + "res: " + transport.response);

                this.firstByte = false;

                if(this.userCancelled) {
                    voltmx.print(" onComplete: on Abort Mission");
                    this.onAbort();
                    return;
                }

                if(transport.status == 200) {
                    if(transport.responseText && transport.responseText.length > 0) {
                        
                        rettable = transport.responseText;
                        try {
                            if(IndexJL == 1)
                                rettable = $KU.convertjsontoluaobject(rettable);
                            else
                                rettable = JSON.parse(rettable);
                        } catch(error) {
                            voltmx.print("errcode: 1013, Invalid JSON string - Unable to parse the returned JSON from server");
                            
                            rettable = {
                                "opstatus": "1",
                                "errcode": "1013",
                                "errmsg": "Middleware returned invalid JSON string",
                                "response": rettable
                            };
                        }
                        

                    }
                    
                    else {
                        voltmx.print("errcode: 1013, Invalid JSON string");
                        rettable = {
                            "opstatus": "1",
                            "errcode": "1013",
                            "errmsg": "Middleware returned invalid JSON string"
                        };
                    }
                } else {
                    
                    
                    if(transport.status == 0 || transport.status == 12200 || (/5+/.test(transport.status.toString()) == true)) {
                        if(typeof navigator.onLine !== "undefined" && !navigator.onLine) {
                            voltmx.print("errcode: 1011, Device has no WIFI or mobile connectivity. Please try the operation after establishing connectivity.");
                            rettable = {
                                "opstatus": 1,
                                "errcode": "1011",
                                "errmsg": "Device has no WIFI or mobile connectivity. Please try the operation after establishing connectivity."
                            };
                        } else {
                            voltmx.print("errcode: 1012, Request Failed");
                            rettable = {
                                "opstatus": 1,
                                "errcode": "1012",
                                "errmsg": "Request Failed"
                            };
                        }
                    } else {
                        
                        if(/4+/.test(transport.status.toString()) == true) {
                            voltmx.print("errcode: 1015, Cannot find host");
                            rettable = {
                                "opstatus": 1,
                                "errcode": "1015",
                                "errmsg": "Cannot find host"
                            };
                        } else {
                            if(transport.responseText != "") {
                                voltmx.print("Status != 200 but response exists");
                                rettable = transport.responseText;
                            } else
                                voltmx.print("Empty response received.");
                        }
                    }
                }
                invokecallback(options.callback, 400, rettable, options.info);
            };

            
            ajaxobj.timeoutid = setTimeout(ajaxobj.onTimeout, options.timeout);
            
            if(typeof(headerobj) == "object") {
                if(options.url.indexOf("/spa") > 0) {
                    ajaxobj.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                    var contentType = headerobj["Content-Type"];
                    if(typeof contentType != "undefined")
                        delete headerobj["Content-Type"];
                } else {
                    if(typeof headerobj["Content-Type"] == "undefined") {
                        headerobj["Content-Type"] = "application/x-www-form-urlencoded";
                    }
                }
                options.httpheaders = $KI.net.sethttpheaders(ajaxobj, headerobj);
                if(options.httpheaders.length > 0 && options.url.indexOf("/spa") > 0) {
                    if(typeof contentType != "undefined") {
                        options.httpheaders["Content-Type"] = contentType;
                    }
                    options.paramstr = options.paramstr + "kCustomHeaders=" + options.httpheaders;
                }
            }


            if("POST".toLowerCase() === (options.type).toLowerCase()) {
                
                ajaxobj.send(options.paramstr);
            } else {
                ajaxobj.send();
            }

            return ajaxobj;
        })();
        voltmx.print("invokeServiceAsync-> ");
    },
    
    invokeService: function(posturl, postdata, Callback, info, timeout) {
        var status = 0;
        var rettable = null;
        var usertimeout = timeout || 60000; 
        var origin = window.location.protocol + "//" + window.location.host;
        var proxyurl = "";
        var postorigin = "";
        var appmode = $KG["appmode"];
        var middlewarecontext = $KI.props.getProperty(null, 'appmiddlewarecontext') || ((typeof appConfig != "undefined") && appConfig && appConfig.middlewareContext) || ((typeof config != "undefined") && config && config.middlewarecontext) || "middleware";

        voltmx.print("invokeServiceAsync<- ");
        if(appmode == constants.APPLICATION_MODE_NATIVE) {

            var i = posturl.indexOf(middlewarecontext);
            if(i != -1) {
                postorigin = posturl.slice(0, i);
            }
            
            if($KG["skipproxy"] || ($KI.net.checkOriginandPostOrigin(origin, postorigin) && posturl)) {
                proxyurl = origin + "/" + middlewarecontext + "/MWServlet"; 
            } else {
                proxyurl = origin + "/" + $KG["appid"] + "/spa";
                voltmx.print("using proxy: URL " + proxyurl);

                if(postdata) {
                    postdata["_desturl"] = posturl;
                } else {
                    postdata = {};
                    postdata["_desturl"] = posturl;
                    voltmx.print("Without postdata " + posturl);
                }
            }
            postdata["rcid"] = $KG["rcid"] || "";
        }

        var headerobj = postdata && postdata["httpheaders"];
        var postdatastr = (postdata && $KI.net.postdataparams(postdata)) || "";

        
        if(posturl.indexOf("/IST") != -1 || posturl.indexOf("/CMS") != -1) {
            proxyurl = posturl;
        }

        voltmx.print("invokeServiceAsync: URL: " + posturl);
        voltmx.print("invokeServiceAsync: Args are: " + postdatastr);
        voltmx.print("middleware origin: " + postorigin);
        voltmx.print("location origin: " + origin);

        if(appmode == constants.APPLICATION_MODE_HYBRID || appmode == constants.APPLICATION_MODE_WRAPPER) {
            proxyurl = posturl;
            voltmx.print("!!!!!!!!!!appmode hybrid/wrapper: " + proxyurl);
        }

        var options = {
            type: "POST",
            url: proxyurl,
            timeout: usertimeout,
            paramstr: postdatastr,
            callback: Callback,
            info: info || null
        };

        voltmx.system.activity.increment();


        var requestDone = false; 
        var ajaxobj = new XMLHttpRequest(); 
        ajaxobj.open(options.type, options.url, false);

        if(typeof(headerobj) == "object") {
            if(options.url.indexOf("/spa") > 0) {
                ajaxobj.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                var contentType = headerobj["Content-Type"];
                if(typeof contentType != "undefined")
                    delete headerobj["Content-Type"];
            } else {
                if(typeof headerobj["Content-Type"] == "undefined") {
                    headerobj["Content-Type"] = "application/x-www-form-urlencoded";
                }
            }
            options.httpheaders = $KI.net.sethttpheaders(ajaxobj, headerobj);
            if(options.httpheaders.length > 0 && options.url.indexOf("/spa") > 0) {
                if(typeof contentType != "undefined") {
                    options.httpheaders["Content-Type"] = contentType;
                }
                options.paramstr = options.paramstr + "kCustomHeaders=" + options.httpheaders;
            }
        }

        
        if(spaAPM !== null) {
            var timeTaken = new Date().getTime();
            var urlOrID = null;
            if(postdata["serviceID"])
                urlOrID = postdata["serviceID"];
            else
                urlOrID = options.url;
            spaAPM.sendMsg(urlOrID, 'servicerequest');
        }

        
        ajaxobj.send(options.paramstr);

        voltmx.print("status: " + ajaxobj.status + "readystate: " + ajaxobj.readyState + "res: " + ajaxobj.response);

        if(ajaxobj.status == 200) {
            if(ajaxobj.responseText && ajaxobj.responseText.length > 0) {
                voltmx.print(" onComplete: JSON obj: " + ajaxobj.responseText);
                rettable = ajaxobj.responseText;
                try {
                    if(IndexJL == 1)
                        rettable = $KU.convertjsontoluaobject(rettable);
                    else
                        rettable = JSON.parse(rettable);

                    voltmx.print(" onComplete: Lua obj: " + JSON.stringify(rettable));
                } catch(error) {
                    voltmx.print("errcode: 1013, Invalid JSON string - Unable to parse the returned JSON from server");
                    
                    rettable = {
                        "opstatus": "1",
                        "errcode": "1013",
                        "errmsg": "Middleware returned invalid JSON string",
                        "response": rettable
                    };
                }
            }
            
            else {
                voltmx.print("errcode: 1013, Invalid JSON string");
                rettable = {
                    "opstatus": "1",
                    "errcode": "1013",
                    "errmsg": "Middleware returned invalid JSON string"
                };
            }
        } else {
            
            if(ajaxobj.status == 0 || (/5+/.test(ajaxobj.status.toString()) == true)) {
                if(typeof navigator.onLine !== "undefined" && !navigator.onLine) {
                    voltmx.print("errcode: 1011, Device has no WIFI or mobile connectivity. Please try the operation after establishing connectivity.");
                    rettable = {
                        "opstatus": 1,
                        "errcode": "1011",
                        "errmsg": "Device has no WIFI or mobile connectivity. Please try the operation after establishing connectivity."
                    };
                } else {
                    voltmx.print("errcode: 1012, Request Failed");
                    rettable = {
                        "opstatus": 1,
                        "errcode": "1012",
                        "errmsg": "Request Failed"
                    };
                }
            } else {
                
                if(/4+/.test(ajaxobj.status.toString()) == true) {
                    voltmx.print("errcode: 1015, Cannot find host");
                    rettable = {
                        "opstatus": 1,
                        "errcode": "1015",
                        "errmsg": "Cannot find host"
                    };
                } else {
                    if(ajaxobj.responseText != "") {
                        voltmx.print("Status != 200 but response exists");
                        rettable = ajaxobj.responseText;
                    } else
                        voltmx.print("Empty response received.");
                }
            }
        }

        if(typeof $KW !== "undefined") {
            $KW.unLoadWidget();
        }
        
        if(spaAPM !== null) {
            if(timeTaken)
                var ts = new Date().getTime() - timeTaken;
            else
                var ts = null;
            spaAPM.sendMsg(urlOrID, 'serviceresponse', {
                "opstatus": (rettable && rettable.opstatus) ? rettable.opstatus : null,
                "httpcode": status ? status : null,
                "resptime": ts
            });
        }

        return rettable;
    },

    cancel: function(nwhndl) {
        $KU.logExecuting('voltmx.net.cancel');
        voltmx.print("networkcancel<- ");
        
        if(nwhndl) {
            
            $KU.logExecutingWithParams('voltmx.net.cancel', nwhndl);
            nwhndl.userCancelled = true;
            nwhndl.abort();
            $KU.logWarnMessage('Request aborted on user request');
            voltmx.print("Request aborted on user request");
        }
        voltmx.print("networkcancel-> ");
        $KU.logExecutingFinished('voltmx.net.cancel');
    },

    checkOriginandPostOrigin: function(origin, postorigin) {
        return origin.replace(/([^=]*):(80|443){1}(.*)/, '$1$3') == postorigin.replace(/([^=]*):(80|443){1}(.*)/, '$1$3') ? true : false;
    },

    
    isNetworkAvailable: function(connectionType) {
        $KU.logExecuting('voltmx.net.isNetworkAvailable');
        if(!!connectionType) {
            $KU.logExecutingWithParams('voltmx.net.isNetworkAvailable', connectionType);
            if(connectionType === constants.NETWORK_TYPE_ANY) {
                if(typeof navigator.onLine !== "undefined") {
                    $KU.logExecutingFinished('voltmx.net.isNetworkAvailable');
                    return navigator.onLine;
                } else {
                    $KU.logWarnMessage('navigator.online is undefined');
                    return false;
                }
            } else if(connectionType === constants.NETWORK_TYPE_3G ||connectionType === constants.NETWORK_TYPE_WIFI || connectionType === constants.NETWORK_TYPE_ETHERNET) {
                $KU.logWarnMessage('Invalid connectionType');
                return false;
            } else {
                $KU.logErrorMessage('Invalid Network Type or connectionType');
                throw new Error("Invalid Network Type");
            }
        } else {
            $KU.logErrorMessage('Invalid arguments');
            throw new Error("Invalid Network Type");
        }
    },

    setNetworkCallbacks: function(config) {
        $KU.logExecuting('voltmx.net.setNetworkCallbacks');
        if(config && config.statusChange) {
            $KU.logExecutingWithParams('voltmx.net.setNetworkCallbacks', config);
            if(typeof window.ononline === "object") {
                window.addEventListener("online", function() {
                    config.statusChange(navigator.onLine)
                }, false);
            }
            if(typeof window.onoffline === "object") {
                window.addEventListener("offline", function() {
                    config.statusChange(navigator.onLine)
                }, false);
            }
            $KU.logExecutingFinished('voltmx.net.setNetworkCallbacks');
        } else {
            $KU.logErrorMessage('Invalid argument or argument is not of valid type');
            throw new Error("Invalid Input : config is not of valid type");
        }
    },

    getActiveNetworkType: function() {
        $KU.logExecuting('voltmx.net.getActiveNetworkType');
        $KU.logExecutingWithParams('voltmx.net.getActiveNetworkType');
        $KU.logExecutingFinished('voltmx.net.getActiveNetworkType');
        if(typeof navigator.onLine === "undefined") {
            return constants.NETWORK_TYPE_ANY;
        } else {
            if(navigator.onLine) {
                return constants.NETWORK_TYPE_ANY;
            } else {
                $KU.logWarnMessage('problem with network status');
                return null;
            }
        }
    },

    
    getCookies: function(url) {
        $KU.logExecuting('voltmx.net.getCookies');
        if(url) {
            $KU.logExecutingWithParams('voltmx.net.getCookies', url);
            if(window && url.indexOf(window.location.origin) != -1) {
                var allCookies = document && document.cookie;
                if(allCookies && allCookies.length > 0) {
                    $KU.logExecutingFinished('voltmx.net.getCookies');
                    return allCookies.split(";");
                }
            }
        }
        $KU.logWarnMessage('Invalid argument');
        return null;
    },

    clearCookies: function(url, cookies) {
        $KU.logExecuting('voltmx.net.clearCookies');
        var allCookies = document && document.cookie.split(";");
        url = url || document.URL;
        if(window && url.indexOf(window.location.origin) != -1) {
            cookies = cookies || allCookies;
            if(cookies) {
                $KU.logExecutingWithParams('voltmx.net.clearCookies', url, cookies);
                var pathBits = window.location.pathname.split("/");
                for(var i = 0; i < cookies.length; i++) {
                    var pathCurrent = "/";
                    var cookieName = cookies[i].trim();
                    if(document.cookie.indexOf(cookieName) != -1)
                        for(var j = 0; j < pathBits.length; j++) {
                            pathCurrent += ((pathCurrent.substr(-1) != '/') ? '/' : '') + pathBits[j];
                            if(cookieName.indexOf('=') != -1) {
                                document.cookie = cookieName + '; expires=Thu, 01-Jan-1970 00:00:01 GMT;path=' + pathCurrent + ';';
                            } else
                                document.cookie = cookieName + '=; expires=Thu, 01-Jan-1970 00:00:01 GMT;path=' + pathCurrent + ';';
                            if(document.cookie.indexOf(cookieName) == -1)
                                break;
                        }
                }
            }
            $KU.logExecutingFinished('voltmx.net.clearCookies');
        } else {
            $KU.logErrorMessage('Invalid input url');
            throw new VoltmxError(1005, "invalid input url", "invalid input url");
        }
    },

    loadClientCertificate: function() {
        $KU.logWarnMessage('The loadClientCertificate API is not supported.');
    },

    removeClientCertificate: function() {
        $KU.logWarnMessage('The removeClientCertificate API is not supported.');
    },

    removeAllCachedResponses: function() {
        $KU.logWarnMessage('The removeAllCachedResponses API is not supported.');
    },

    urlDecode: function() {
        $KU.logWarnMessage('The urlDecode API is not supported.');
    },

    urlEncode: function() {
        $KU.logWarnMessage('The urlEncode API is not supported.');
    }
};


$KI.props = {
    getProperty: function(group, key) {
        $KU.logExecuting('voltmx.props.getProperty');
        $KU.logExecutingWithParams('voltmx.props.getProperty', group, key);
        if(typeof _voltmxAppProperties != "undefined" && _voltmxAppProperties != null && key) {
            $KU.logExecutingFinished('voltmx.props.getProperty');
            return _voltmxAppProperties[key] || null;
        }
    }
};
