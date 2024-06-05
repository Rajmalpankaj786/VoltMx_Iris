KOAuth._constants={VERSION_1_0:"1.0A",ENCODING:"UTF-8",FORM_ENCODED:"application/x-www-form-urlencoded",HTTP_AUTHORIZATION_HEADER:"Authorization",OAUTH_CONSUMER_KEY:"oauth_consumer_key",OAUTH_TOKEN:"oauth_token",OAUTH_TOKEN_SECRET:"oauth_token_secret",OAUTH_SIGNATURE_METHOD:"oauth_signature_method",OAUTH_SIGNATURE:"oauth_signature",OAUTH_TIMESTAMP:"oauth_timestamp",OAUTH_NONCE:"oauth_nonce",OAUTH_VERSION:"oauth_version",OAUTH_CALLBACK:"oauth_callback",OAUTH_VERIFIER:"oauth_verifier",HTTP_CONTENT_TYPE:"Content-Type",SIGNATURE_PLAINTEXT:"PLAINTEXT",SIGNATURE_SHA1:"HMAC-SHA1"};function KOAuth(a,b,c,d,e,f,g,h){this._requestUrl=a;this._accessUrl=b;this._consumerKey=c;this._consumerSecret=this._encodeData(d);this._version=e;if(f===void 0){this._authorize_callback="oob"}else{this._authorize_callback=f}if(g!=KOAuth._constants.SIGNATURE_PLAINTEXT&&g!=KOAuth._constants.SIGNATURE_SHA1)throw new Error("Un-supported signature method: "+g);this._signatureMethod=g;this._headers=h||{Accept:"*/*",Connection:"close","User-Agent":"Kony authentication",preview_type:"native"};this._clientOptions=this._defaultClientOptions={requestTokenHttpMethod:"POST",accessTokenHttpMethod:"POST"};this._oauthParameterSeperator=","}KOAuth.prototype.getOAuthRequestToken=function(a){this._performSecureRequest(null,null,this._clientOptions.requestTokenHttpMethod,this._requestUrl,null,null,null,function(b,c){if(b)a(b);else{var d=_parseQuerystring(c),e=d[KOAuth._constants.OAUTH_TOKEN],f=d[KOAuth._constants.OAUTH_TOKEN_SECRET];delete d[KOAuth._constants.OAUTH_TOKEN];delete d[KOAuth._constants.OAUTH_TOKEN_SECRET];a(null,e,f,d)}})};KOAuth.prototype.getOAuthTokenAuthorized=function(a,b,c,d,e){this._performSecureRequest(a,b,this._clientOptions.requestTokenHttpMethod,c,d,null,null,function(a){if(a)e(a);else{e(null,"SUCCESS")}})};KOAuth.prototype.getOAuthAccessToken=function(a,b,c,d){var e={};if("function"==typeof c){d=c}else{e.oauth_verifier=c}this._performSecureRequest(a,b,this._clientOptions.accessTokenHttpMethod,this._accessUrl,e,null,null,function(a,b){if(a)d(a);else{var c=_parseQuerystring(b),e=c[KOAuth._constants.OAUTH_TOKEN];delete c[KOAuth._constants.OAUTH_TOKEN];var f=c[KOAuth._constants.OAUTH_TOKEN_SECRET];delete c[KOAuth._constants.OAUTH_TOKEN_SECRET];d(null,e,f,c)}})};KOAuth.prototype.getSecureData=function(a,b,c,d,e){this._performSecureRequest(c,d,b,a,null,null,null,function(a,b,c){if(a)e(a);else{e(null,b,c)}})};KOAuth.prototype._performSecureRequest=function(a,b,c,d,e,f,g,h){var i=this._prepareParameters(a,b,c,d,e);if(!g){g=KOAuth._constants.FORM_ENCODED}var j={},k=this._buildAuthorizationHeaders(i);voltmx.print("Final build "+k);j[KOAuth._constants.HTTP_AUTHORIZATION_HEADER]=k;for(var l in this._headers){if(this._headers.hasOwnProperty(l)){j[l]=this._headers[l]}}for(var l in e){if("oauth_"==l.substring(0,6)){delete e[l]}}var m=!1;if("GET"==c){req_method=constants.HTTP_METHOD_GET;m=!0}else req_method=constants.HTTP_METHOD_POST;if(("POST"==c||"PUT"==c)&&null==f&&null!=e){f=this._paramStringify(e).replace(/\!/g,"%21").replace(/\'/g,"%27").replace(/\(/g,"%28").replace(/\)/g,"%29").replace(/\*/g,"%2A")}j[KOAuth._constants.HTTP_CONTENT_TYPE]=g;voltmx.print("Headers Used "+JSON.stringify(j));if("android"==voltmx.os.deviceInfo().name.toLowerCase())nativelogin.nativecreaterequest(d);else{var n=new voltmx.net.HttpRequest;n.timeout=5e3;n.open(req_method,d,m)}var o="";if("android"!=voltmx.os.deviceInfo().name.toLowerCase()){n.onReadyStateChange=function(){voltmx.print("statusText = "+this.statusText+" Number  "+this.status);if("server error"==this.statusText){errorMsgFP("Unable to reach host.");return}if(this.readyState==constants.HTTP_READY_STATE_DONE){voltmx.print("Status = "+this.statusText+" Number  "+this.status);voltmx.print("RESPONSE HEADERS "+JSON.stringify(n.getAllResponseHeaders()));o=this.response;voltmx.print("JS Received response1 "+JSON.stringify(o));if(null!=o){var a=_parseQuerystring(""+o);voltmx.print("JS Received Data  "+JSON.stringify(a));if(200<=this.status&&299>=this.status){voltmx.print("SUCCESS CODE ");h(null,o,o)}else{voltmx.print("FAILURE CODE");h(o,o,o)}}}}}for(var l in j){if("android"==voltmx.os.deviceInfo().name.toLowerCase())nativelogin.nativesetrequesthdr(l,j[l]);else n.setRequestHeader(l,j[l])}if(("POST"==c||"PUT"==c)&&null!=f&&""!=f){voltmx.print("Sending Form Data "+f);if("android"==voltmx.os.deviceInfo().name.toLowerCase())o=nativelogin.nativesenddata(f);else{var f=new voltmx.net.FormData;f.append("primary_email",encodeURIComponent(e.primary_email));f.append("password",encodeURIComponent(e.password));n.send(f)}}else{if("android"==voltmx.os.deviceInfo().name.toLowerCase())o=nativelogin.nativesenddata(null);else{n.send()}}if("android"==voltmx.os.deviceInfo().name.toLowerCase()){voltmx.print("JS Received response1 "+o);var p=_parseQuerystring(""+o),q=o.indexOf("&");o=o.substring(q+1,o.length);voltmx.print("JS Received Data  "+JSON.stringify(p));if(200<=p.status&&299>=p.status){voltmx.print("SUCCESS CODE ");h(null,o,o)}else{voltmx.print("FAILURE CODE");h(o,o,o)}}};var _addUrlPath=function(a,b){var c=a;if("/"==a.substring(a.length-1,a.length)){if("/"==b.substring(0,1)){c=a+b.substring(1,b.length)}else{c=a+b}}else{if("/"==b.substring(0,1)){c=a+b}else{c=a+"/"+b}}return c},_addToURL=function(a,b){newURL=a;if(null!=b){var c=OAuth.formEncode(b);if(0<c.length){var d=a.indexOf("?");if(0>d)newURL+="?";else newURL+="&";newURL+=c}}return newURL},_parseURL=function(a){var b=a.indexOf("?");if(0<b){var c=a.substring(b+1),d=_parseQuerystring(c)}return d},_parseQuerystring=function(a){var b={},c,d,e,f;c=a.split("&");for(e=0,f=c.length;e<f;e++){d=c[e].split("=");b[d[0]]=d[1]}return b};KOAuth.prototype._paramStringify=function(a){var b="";for(var c in a){if(""!=b)b+="&";b+=this._encodeData(c)+"="+this._encodeData(a[c])}return b};var _formEncode=function(a){for(var b="",c=a,d=0,e;d<c.length;++d){e=c[d][1];if(null==e)e="";if(""!=b)b+="&";b+=_encodeData(c[d][0])+"="+_encodeData(e)}return b};KOAuth.prototype._encodeData=function(a){if(null==a||""==a)return"";else{var b=encodeURIComponent(a);return b.replace(/\!/g,"%21").replace(/\'/g,"%27").replace(/\(/g,"%28").replace(/\)/g,"%29").replace(/\*/g,"%2A")}};KOAuth.prototype._prepareParameters=function(a,b,c,d,e){var f={consumerSecret:this._consumerSecret,consumerKey:this._consumerKey,token:a,tokenSecret:b},g={action:d,method:c,parameters:[]};g.parameters.push([KOAuth._constants.OAUTH_TIMESTAMP,""]);g.parameters.push([KOAuth._constants.OAUTH_NONCE,""]);g.parameters.push([KOAuth._constants.OAUTH_VERSION,this._version]);g.parameters.push([KOAuth._constants.OAUTH_SIGNATURE_METHOD,this._signatureMethod]);g.parameters.push([KOAuth._constants.OAUTH_CONSUMER_KEY,this._consumerKey]);if(a){g.parameters.push([KOAuth._constants.OAUTH_TOKEN,a])}if(e){for(var h in e){g.parameters[h]=e[h]}}var i=_parseURL(d);if(i){for(var h in i){var j=i[h];if("object"==typeof j){for(var k in j){g.parameters[h+"["+k+"]"]=j[k]}}else{g.parameters[h]=j}}}OAuth.setTimestampAndNonce(g);OAuth.completeRequest(g,f);var l=OAuth.getParameterMap(g.parameters);return l};KOAuth.prototype._parseURL=function(a){if(null==a||""==a)return"";else{var b=encodeURIComponent(a);return b.replace(/\!/g,"%21").replace(/\'/g,"%27").replace(/\(/g,"%28").replace(/\)/g,"%29").replace(/\*/g,"%2A")}};KOAuth.prototype._decodeData=function(a){if(null!=a){a=a.replace(/\+/g," ")}return decodeURIComponent(a)};KOAuth.prototype._buildAuthorizationHeaders=function(a){var b="OAuth ";for(var c in a){if("oauth_"==c.substring(0,6)){b+=""+this._encodeData(c)+"=\""+this._encodeData(a[c])+"\","}}b=b.substring(0,b.length-this._oauthParameterSeperator.length);return b};