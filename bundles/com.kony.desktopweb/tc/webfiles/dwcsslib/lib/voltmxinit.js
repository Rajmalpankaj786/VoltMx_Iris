/* global initializeApp */
/* global appConfig */
/* global Windows */
/* global requirejs */

//Pollyfill starts
if(!String.prototype.startsWith) {
    String.prototype.startsWith = function(str) {
        return this.slice(0, str.length) === str;
    };
}


//pollyfill ends

(function() {
    var VERSION = '9.5.31.v202405151900',
        BUILD = 'debug',
        ECMAENABLE = '@ECMAENABLE', PUBLISH = false,
        UWPAPIS = (/true/i).test('-- UWPAPIS --'),
        UWPOFFLINEAPIS = (/true/i).test('-- UWPOFFLINEAPIS --'),
        UWPBUILD = (UWPAPIS || UWPOFFLINEAPIS);

    //eslint-disable-next-line no-unused-vars
    var PLATFORMBUILT = '-- platform --';

    // DESKTOPWEB CODE ONLY  - JS PREPROCESSOR

    var legacy = (window.voltmx && window.voltmx.legacy) ? true : false,
        $K = null, body = document.body, head = document.head,
        staticPath = '', device = null;

    //eslint-disable-next-line no-unused-vars
    var supportedPlatforms = ['desktopweb', 'spaandroid', 'spaandroidtablet', 'spabbnth', 'spablackberry', 'spaipad', 'spaiphone', 'spaplaybook', 'spawindows', 'spawindowstablet', 'spawinphone8'];


    var kof = {loadedFromOtherFramework: false, appName:'', fabricUrl:'', cacheId: ''};

    if(window.kof) {
        kof = window.kof;
        kof.loadedFromOtherFramework = true;
        kof.appUrl = kof.fabricUrl +'/apps/'+ kof.appName +'/'+ kof.cacheId;
    }

    function _isEcmaEnabledForIE() {
        var ua = navigator.userAgent.toLowerCase();

        if(ua.indexOf('trident/') >= 0 && ua.indexOf('rv:11.0') >= 0
        && ECMAENABLE && typeof ECMAENABLE === 'boolean') {
            return true;
        }
        return false;
    }


    function applySplashScreen(body) {
        var $K = voltmx.$kwebfw$, $KG = $K.globals,
            splash = document.getElementById('app_splash_img');

        if(splash && body.contains(splash)) {
            var imgsrc = splash.getAttribute('data-src');
            if(imgsrc) {
                splash.src = './' + $KG.platform +'/images/'+imgsrc;
                splash.onload = function() {
                    this.style.animationDuration = '1.5s';
                    this.style.animationName = 'splash';
                };
            }
        } else { //splash.firstChild.src not available
            //
        }
    }


    function boot(head/*, body*/) {
        var $K = voltmx.$kwebfw$, i = 0, uwpfiles = null, scripts = getFrameworkFiles(),
            loadPath = 'lib';

        if(kof.loadedFromOtherFramework) {
            loadPath = kof.appUrl+'/desktopweb/lib';
        }

        loadStyle(head, loadPath+'/fw.css');


        if(UWPAPIS || UWPOFFLINEAPIS) {
            if(window && window.Windows && Windows && Windows.UI && Windows.UI.Popups) {
                uwpfiles = getUWPFiles();

                for(i = 0; i < uwpfiles.utils.length; i++) {
                    scripts.push(uwpfiles.utils[i]);
                }
                if(UWPAPIS) {
                    for(i = 0; i < uwpfiles.apis.length; i++) {
                        scripts.push(uwpfiles.apis[i]);
                    }
                }
                if(UWPOFFLINEAPIS) {
                    for(i = 0; i < uwpfiles.offline.length; i++) {
                        scripts.push(uwpfiles.offline[i]);
                    }
                }
            }
        }

        loadStyle(head, loadPath+'/anim.css');
        if(_isEcmaEnabledForIE()) {
            $K.ecmaEnable = true;
        }
        if(_isEcmaEnabledForIE()) {
            scripts.unshift('https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/7.12.1/polyfill.min.js');
            scripts.push('es5appjs/app.js');
        } else {
            scripts.push('appjs/app.js');
        }


        loadFiles(head, scripts, true, function() {
            if($K.legacy) {
                removeLegacyStyleTags();
                injectFrameworkStyleTag();
            }
            populateDeviceResolution();
            initializeLocalStorage();
            migrateLocalStorage();
            populateDeepLinkParams();
            voltmx.appinit.voltmxLoadFunctionalModules();

            initializeSDKLogger();

            if(typeof initializeApp === 'function') {
                if(appConfig.hotReloadURL) {
                    loadFiles(head, ['lib/utils/voltmxhotreload.js'], true, function() {
                        var $K = voltmx.$kwebfw$, $KH = $K.hotreload;
                        $KH.initializeHotReloadConnection();
                        $KH.extendFormApis();
                    });
                }

                if(appConfig.testAutomation) {
                    loadFiles(head, getAutomationFiles(), true, function() {
                        initializeApp();
                    });
                } else {
                    initializeApp();
                }
            }

            body = null; //For GC
        });
    }


    function convertBase64ToString(base64) {
        var e = {}, i = 0, c = '', x = 0, l = 0,
            a, b, r = '', w = String.fromCharCode, L = base64.length,
            A = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

        for(i=0; i<64; i++) {
            e[A.charAt(i)] = i;
        }

        for(x=0; x<L; x++) {
            c = e[base64.charAt(x)];
            b = (b << 6) + c;
            l += 6;

            while(l >= 8) {
                ((a = (b >>> (l -= 8)) & 0xff) || (x < (L - 2))) && (r += w(a));
            }
        }

        return r;
    }


    function getUWPFiles() {
        return {"utils":["lib/tparty/uwp/utils/voltmxUWPWrapperutils.js"],"apis":["lib/tparty/uwp/apis/voltmxApplication.js","lib/tparty/uwp/apis/voltmxBattery.js","lib/tparty/uwp/apis/voltmxContacts.js","lib/tparty/uwp/apis/voltmxCrypto.js","lib/tparty/uwp/apis/voltmxio.js","lib/tparty/uwp/apis/voltmxLocation.js","lib/tparty/uwp/apis/voltmxNetwork.js","lib/tparty/uwp/apis/voltmxOS.js","lib/tparty/uwp/apis/voltmxSpeech2Text.js","lib/tparty/uwp/apis/voltmxStore.js"],"offline":["lib/tparty/uwp/offline/voltmxUWPOfflineObjects.js","lib/tparty/uwp/offline/voltmxUWPOfflineSDKObject.js","lib/tparty/uwp/offline/voltmxUWPOfflineSDKObjectService.js"]};
    }


    function getFrameworkFiles() {
        if(PUBLISH) {
            if(_isEcmaEnabledForIE()) {
                return ['es5lib/fw.js'];
            }
            return ['lib/fw.js'];
        }
        return ['jslib/tparty/requirejs/require.js', 'jslib/tparty/crypto/cryptojslib.js', 'lib/utils/voltmxconstants.js', 'lib/utils/voltmxutils.js', 'lib/utils/voltmxapm.js', 'lib/utils/voltmxstore.js', 'lib/utils/voltmxdom.js', 'lib/utils/voltmxanim.js', 'lib/apis/voltmx.js', 'lib/apis/voltmxapplication.js', 'lib/apis/voltmxconstants.js', 'lib/apis/voltmxcrypto.js', 'lib/apis/voltmxdb.js', 'lib/apis/voltmxds.js', 'lib/apis/voltmxi18n.js', 'lib/apis/voltmxio.js', 'lib/apis/voltmxlistener.js', 'lib/apis/voltmxlocation.js', 'lib/apis/voltmxmodules.js', 'lib/apis/voltmxmedia.js', 'lib/apis/voltmxnet.js', 'lib/apis/voltmxnosql.js', 'lib/apis/voltmxos.js', 'lib/apis/voltmxphone.js', 'lib/apis/voltmxpush.js', 'lib/apis/voltmxtheme.js', 'lib/apis/voltmxtimer.js', 'lib/apis/voltmxworker.js', 'lib/utils/voltmxwidget.js', 'lib/utils/voltmxevent.js', 'lib/apis/voltmxui.js', 'lib/apis/voltmxunsupported.js', 'lib/plugins/voltmxdropdown.js', 'lib/widgets/voltmxform.js', 'lib/widgets/voltmxflexcontainer.js', 'lib/widgets/voltmxflexscrollcontainer.js', 'lib/widgets/voltmxcanvas.js', 'lib/widgets/voltmxcamera.js', 'lib/widgets/voltmxcomponent.js', 'lib/widgets/voltmxbrowser.js', 'lib/widgets/voltmxbutton.js', 'lib/widgets/voltmxcalendar.js', 'lib/widgets/voltmxcheckboxgroup.js', 'lib/widgets/voltmxcollectionview.js', 'lib/widgets/voltmxcustomwidget.js', 'lib/widgets/voltmxdatagrid.js', 'lib/widgets/voltmximage.js', 'lib/widgets/voltmxlabel.js', 'lib/widgets/voltmxlistbox.js', 'lib/widgets/voltmxmap.js', 'lib/widgets/voltmxradiobuttongroup.js', 'lib/widgets/voltmxrichtext.js', 'lib/widgets/voltmxsegment.js', 'lib/widgets/voltmxslider.js', 'lib/widgets/voltmxswitch.js', 'lib/widgets/voltmxtabpane.js', 'lib/widgets/voltmxtextarea.js', 'lib/widgets/voltmxtextbox.js', 'lib/widgets/voltmxvideo.js', 'lib/widgets/voltmxunsupported.js', 'lib/utils/voltmxmvc.js', 'lib/tparty/voltmxmvc_sdk.js', 'lib/tparty/voltmxlicense.js'];
    }


    function getAutomationFiles() {
        var files = ['lib/automation/voltmxautomationrecorder.js',
            'lib/automation/voltmxautomationtouchevents.js',
            'lib/automation/voltmxautomationutils.js',
            'lib/automation/voltmxautomationwidgets.js',
            'jslib/tparty/jasmine/jasmine.js',
            'jslib/tparty/jasmine/jamsinecucumber.js',
            'jslib/tparty/jasmine/jasmine-feature-runner.js',
            'jslib/tparty/jasmine/testDefinitions.js'
        ];
        return files;
    }


    function initializeLocalStorage() {
        var $K = voltmx.$kwebfw$, $KA = $K.app, store = null;

        var $KU = $K.utils, $KG = $K.globals, data = null;

        try{
            if(typeof(localStorage) === 'object') {
                store = $KU.getLocalStorage();

                if(typeof store === 'object' && store
                && store.migrated === true) {
                    if($KU.is(store.data, 'array')) {
                        //Storing to migrated to namespaced localStorage
                        data = JSON.stringify(store.data);
                    } else if($KU.is(store.ds, 'array')
                    && $KU.is(store.store, 'array')) {
                        return; //If already a namespaced localStorage
                    }
                } else if(store !== '' && store !== null) {
                    $KG.localStorageBackup = store; //Already JSON parsed
                }

                store = {migrated: false, store: [], ds: [], ns: {}};

                if(data) { //Migrating here to namespaced localStorage
                    store.ds = JSON.parse(data);
                    store.store = JSON.parse(data);
                }

                localStorage.setItem($KA.id, JSON.stringify(store));
            }
        } catch(e) {
            return e;
        }
    }

    function initializeSDKLogger() {
        var $K = voltmx.$kwebfw$, $KA = $K.app;

        $K.defVoltmxProp($KA, [
            {keey:'logger', value:voltmx.logger.createNewLogger('VoltmxFrameworkLogger', new voltmx.logger.createLoggerConfig())}
        ]);

        if(appConfig.isDebug === true) {
            voltmx.logger.activatePersistors(voltmx.logger.consolePersistor);
            voltmx.logger.currentLogLevel = voltmx.logger.logLevel.ALL;
            $KA.logger.setIndirectionLevel(3);
        }
    }


    function injectFrameworkStyleTag() {
        var rules = '*{box-sizing:border-box !important;user-select:none;cursor:inherit;margin:0px;padding:0px;border:none;}html,body,div.kvp{overflow-x:hidden !important;overflow-y:hidden !important;overflow:hidden !important;height:100% !important;width:100% !important;padding:0px !important;margin:0px !important;min-width:100% !important;max-width:100%;min-height:100% !important;max-height:100% !important;}[hidden]{display:none !important;}input,textarea{user-select:auto;}textarea{resize:none;font-size:inherit;font-family:inherit;}div#app_splash{position:absolute;top:0px;left:0px;opacity:0;background-color:rgb(69, 186, 221);}div#app_splash>img{display:none;}div[kr="app_forms"]{position:absolute;left:0px;right:0px;top:0px;bottom:0px;overflow-x:hidden;overflow-y:hidden;}div[kr="app_dialogs"]{position:absolute;left:0px;top:0px;}div[kr="app_scrap"]{position:absolute;left:-999999999px;top:-999999999px;width:1px;height:1px;max-width:1px;max-height:1px;opacity:0;border:0;margin-left:-1px;margin-top:-1px;clip:rect(1px, 1px, 1px, 1px);clip-path:inset(50%);-webkit-clip-path:inset(50%);}div[kr="app_blocker"]{display:flex;flex-direction:column;justify-content:center;align-items:center;position:absolute;left:0px;top:0px;width:100%;height:100%;max-width:100%;max-height:100%;overflow-x:hidden;overflow-y:hidden;}',
            firstScriptTag = null, style = document.createElement('STYLE'),
            children = document.head.children, c = 0, clen = children.length;

        style.setAttribute('type', 'text/css');
        style.innerHTML = rules;

        for(c=0; c<clen; c++) {
            if(children[c].tagName === 'SCRIPT') {
                firstScriptTag = children[c];
                break;
            }
        }

        if(firstScriptTag) {
            firstScriptTag.parentElement.insertBefore(style, firstScriptTag);
        }
    }


    function loadFiles(head, sources, sync, onsuccess, onerror) {
        var s = 0, slen = sources.length, iv = null,
            failed = false, counter = 0, start = new Date(), loadPath='';

        if(kof.loadedFromOtherFramework) {
            loadPath = kof.appUrl+'/desktopweb/';
        }

        for(s=0; s<slen; s++) {
            if(typeof sync === 'boolean') {
                loadScript(head, loadPath+sources[s], sync, function() {
                    counter++;
                }, function() {
                    failed = true;
                });
            } else {
                loadStyle(head, loadPath+sources[s], function() {
                    counter++;
                }, function() {
                    failed = true;
                });
            }
        }

        iv = setInterval(function() {
            var $K = voltmx.$kwebfw$, $KU = $K.utils;

            if(failed || (counter >= slen) || (new Date() - start) > 300000) {
                clearInterval(iv);
                iv = null; //For GC
            }

            //NOTE:: For firefox I had to keep >=, else === works fine in chrome
            if(counter >= slen) { //Now all framework scripts are loaded
                if($KU.is(onsuccess, 'function')) onsuccess();
            } else if(failed) {
                if($KU.is(onerror, 'function')) onerror();
            } else if((new Date() - start) > 300000) { //i.e. 5 mins
                throw new Error('Could not load all files in 5 minutes.');
            }
        });
    }


    function loadScript(head, src, sync, onsuccess, onerror) {
        var $K = voltmx.$kwebfw$, $KG = $K.globals,
            script = document.createElement('SCRIPT');

        if(sync) script.async = false;
        if(src.indexOf('http') !== 0) {
            src = ($KG.platform+'/'+src);
        }

        script.type = 'text/javascript';
        script.src = src;

        script.onload = function() {
            script.onload = script.onerror = null; //For GC

            if(typeof onsuccess === 'function') {
                onsuccess.call(this);
            }
        };

        script.onerror = function() {
            script.onload = script.onerror = null; //For GC

            if(typeof onerror === 'function') {
                onerror.call(this);
            }
        };

        head.appendChild(script);
    }


    function loadStyle(head, src, onsuccess, onerror) {
        var $K = voltmx.$kwebfw$, $KG = $K.globals,
            link = document.createElement('link');

        if(!kof.loadedFromOtherFramework) {
            src = ($KG.platform+'/'+src);
        }

        link.href = src;
        link.media = 'none';
        link.type = 'text/css';
        link.rel = 'stylesheet';
        link.setAttribute('kfwss', 'voltmx');

        link.onload = function(/*e*/) {
            link.onload = link.onerror = null; //For GC
            this.media = 'all';

            if(typeof onsuccess === 'function') {
                onsuccess.call(this);
            }
        };

        link.onerror = function(/*e*/) {
            link.onload = link.onerror = null; //For GC

            if(typeof onerror === 'function') {
                onerror.call(this);
            }
        };

        head.appendChild(link);
    }


    function migrateLocalStorage() {
        var $K = voltmx.$kwebfw$, $KA = $K.app,
            $KU = $K.utils, $KG = $K.globals;

        try{
            if(typeof(localStorage) === 'object') {
                var store = $KU.getLocalStorage(),
                    keysToBeRemoved = [], parsed = null,
                    l = 0, len = 0, key = '', value = '';

                //initializeLocalStorage is already called by this time
                //So store is an object for sure, possibly not migrated.
                if(store.migrated === true) return;

                store.migrated = true;

                if($K.behavior[constants.API_LEVEL] < constants.API_LEVEL_8200) {
                    localStorage.removeItem('i18nVersion');

                    len = localStorage.length;
                    for(l = 0; l < len; l++) {
                        key = localStorage.key(l);

                        if(key === $KA.id) {
                            if(Object.prototype.hasOwnProperty.call($KG, 'localStorageBackup')) {
                                //NOTE:: $KG.localStorageBackup is already JSON parsed
                                store.data.push({
                                    key: key,
                                    value: $KG.localStorageBackup
                                });
                            }
                        } else {
                            //Filter out keys like, for i18n
                            if(key.indexOf($KA.id + '_') !== 0
                                && key.split('_').length < 2) {
                                value = localStorage.getItem(key);
                                try{
                                    parsed = JSON.parse(value);
                                } catch(e) {
                                    parsed = value;
                                }

                                //Filter out any other migrated app data
                                if(!(typeof parsed === 'object' && parsed
                                        && parsed.migrated === true
                                        && $KU.is(parsed.data, 'array'))) {
                                    keysToBeRemoved.push(key);
                                    store.data.push({
                                        key: key,
                                        value: parsed
                                    });
                                }
                            }
                        }
                    }

                    //Migration cleanup
                    len = keysToBeRemoved.length;
                    for(l=0; l<len; l++) {
                        localStorage.removeItem(keysToBeRemoved[l]);
                    }
                }

                localStorage.setItem($KA.id, JSON.stringify(store));
            }
        } catch(e) {
            return e;
        }
    }


    function parseRequestHeaders(requestHeaders) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils;

        if(requestHeaders && requestHeaders !== 'null') {
            if(requestHeaders[0] === '{') {
                requestHeaders = convertBase64ToString(requestHeaders);
            }

            requestHeaders = requestHeaders.replace(/"="/g, '":"');

            try{
                requestHeaders = JSON.parse(requestHeaders);

                $KU.each(requestHeaders, function(value, key) {
                    requestHeaders[key] = unescape(decodeURIComponent(value));
                });
            } catch(e) {
                requestHeaders = {};
            }
        } else {
            requestHeaders = {};
        }

        return requestHeaders;
    }


    function parseRequestParams(requestParams) {
        if(requestParams && requestParams !== 'null') {
            if(requestParams[0] === '{') {
                requestParams = convertBase64ToString(requestParams);
            }

            try{
                requestParams = JSON.parse(requestParams);
            } catch(e) {
                requestParams = {};
            }
        } else {
            requestParams = {};
        }

        return requestParams;
    }


    function populateDeepLinkParams() {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KG = $K.globals,
            qs = location.search.slice(1), path = location.href.split('?');

        $K.defVoltmxProp($KG, [
            {keey:'launchmode', value:(qs ? 3 : 1)},
            {keey:'deeplinkParams', value:{deeplinkPath:path[0], deeplinkpath:path[0]}}
        ]);

        if($KG.requestHeaders) {
            $KG.deeplinkParams.requestHeaders = $KG.requestHeaders;
        }

        $KU.each($KG.requestParams, function(value, keey) {
            $KG.deeplinkParams[keey] = value;
        });

        if(qs) {
            qs = qs.split('&');

            $KU.each(qs, function(value) {
                var s = value.replace(/\+/g, ' ').split('=');

                if(s[0]) s[0] = decodeURIComponent(s[0]);
                if(s[1]) s[1] = decodeURIComponent(s[1]);
                if(s[0]) $KG.deeplinkParams[s[0]] = s[1];
            });
        }
    }


    function populateDeviceResolution() {
        var $K = voltmx.$kwebfw$, $KU = $K.utils,
            device = $K.device, resolution = '';
        /* For future use. Do not delete this commented block.
            dpi = device.DPI, os = $KU.browser('os'),
            channel = $KU.browser('channel');

        if(os === 'ios') {
            resolution = 'retina';
        } else if(os === 'windows') {
            if(channel === 'phone') {
                resolution = '320';
            }
        } else if(os === 'android') {
            if(channel === 'tablet') {
                if(dpi <= 1) {
                    resolution = 'mdpi';
                } else if(dpi <= 1.5) {
                    resolution = 'hdpi';
                } else if(dpi > 1.5) {
                    resolution = 'xhdpi';
                }
            } else {
                if(dpi <= 1) {
                    resolution = '320';
                } else if(dpi > 1 && dpi <= 1.5) {
                    resolution = '360';
                } else if(dpi > 1.5 && dpi <= 2) {
                    resolution = '400';
                } else if(dpi > 2) {
                    resolution = '440';
                }
            }
        }
        //*/

        $KU.defineProperty(device, 'resolution', resolution, null);
    }


    function populateGlobalVariablesFromDOM() {
        var $K = voltmx.$kwebfw$, $KG = $K.globals, staticContentPath = null,
            isNewSession = null, requestParams = null, requestHeaders = null,
            voltmxAppProperties = null, appid = null;

        //TODO:: if(!$K.legacy) DOM id's might be different
        staticContentPath = document.getElementsByName('staticContentPath')[0];
        requestParams = document.getElementsByName('_reqParams')[0];
        requestHeaders = document.getElementsByName('_reqHeaders')[0];
        voltmxAppProperties = document.getElementsByName('_voltmxAppProperties')[0];
        appid = document.getElementsByName('appid')[0];
        isNewSession = document.getElementById('isnewsession');

        if(staticContentPath) staticPath = staticContentPath.value;
        if(requestParams) $K.defVoltmxProp($KG, [{keey:'requestParams', value:parseRequestParams(requestParams.value)}]);
        if(requestHeaders) $K.defVoltmxProp($KG, [{keey:'requestHeaders', value:parseRequestHeaders(requestHeaders.value)}]);
        if(voltmxAppProperties) $K.defVoltmxProp($KG, [{keey:'voltmxAppProperties', value:voltmxAppProperties.value}]);
        if(appid) $K.defVoltmxProp($KG, [{keey:'appid', value:appid.value}]);
        if(isNewSession) $K.defVoltmxProp($KG, [{keey:'isNewSession', value:(isNewSession.innerText === 'true')}]);
    }


    function populateGlobalVariablesFromURL() {
        var $K = voltmx.$kwebfw$, src = '', scripts = document.scripts,
            publish = '', zipId = '', id = '', platform = '',
            l = 0, s = 0, slen = scripts.length, index = -1;

        for(s=0; s<slen; s++) {
            src = scripts[s].src;

            index = (typeof src === 'string') ? src.indexOf('/lib/voltmxinit.js') : -1;

            if(index >= 0) {
                src = src.substr(0, index).split('/');
                l = src.length;

                publish = (src[(l-4)] === 'apps') ? 'zip' : 'war';
                zipId = (publish === 'zip') ? src[(l-2)] : '';
                id = (publish === 'zip') ? 3 : 2;
                id = src[(l - id)];
                platform = src[(l-1)];

                $K.defVoltmxProp($K.globals, [
                    {keey:'platform', value:platform},
                    {keey:'publish', value:publish}
                ]);

                $K.defVoltmxProp($K.app, [
                    {keey:'id', value:id},
                    {keey:'zipId', value:zipId}
                ]);

                src.splice(-1, 1);
                staticPath = (src.join('/') + '/'); // + platform + '/'

                break;
            }
        }
    }


    function populateGlobalVariablesFromOtherSource() {
        var $K = voltmx.$kwebfw$;

        $K.defVoltmxProp($K, [
            {keey:'build', value:BUILD},
            {keey:'version', value:VERSION}
        ]);

        if(kof.loadedFromOtherFramework) {
            $K.globals.kof = kof;
        }

        //TODO:: Any other variable to populate
    }


    function populateRequiredGlobalVariables() {
        var $K = voltmx.$kwebfw$, $KG = $K.globals;

        populateGlobalVariablesFromURL();

        if(typeof $KG.platform === 'string' && $KG.platform) {
            populateGlobalVariablesFromDOM();
            populateGlobalVariablesFromOtherSource();

            $K.defVoltmxProp($K.app, [
                {keey:'startedAt', value:new Date()},
                {keey:'staticContentPath', value:staticPath}
            ]);

            window._voltmx = {mvc:{}};

            return true;
        }
        return false;
    }


    function removeLegacyStyleTags() {
        var sheets = document.styleSheets, s = 0,
            sheet = null, slen = sheets.length;

        for(s=0; s<slen; s++) {
            sheet = sheets[s];

            if(sheet.ownerNode && sheet.ownerNode.tagName === 'STYLE') {
                s--; slen--; sheet.disabled = true;
                sheet.ownerNode.parentElement.removeChild(sheet.ownerNode);
            }
        }
    }


    if(legacy) {
        delete window.$KA;
        delete window.$KG;
        delete window.$KI;
        delete window.$KIO;
        delete window.$KU;
        delete window.$KW;

        if(document.documentElement) {
            document.documentElement.setAttribute('lang', 'en');
            document.documentElement.setAttribute('dir', 'ltr');
        }
    }

    Object.defineProperty(window, 'voltmx', {configurable:false, enumerable:false, writable:false, value:(function() {
        var _ns = {}, _props = null, _def = function(obj, items) {
                var i = 0, ilen = (items instanceof Array) ? items.length : 0;

                for(i=0; i<ilen; i++) {
                    (function(target, item) {
                        item.writable = _defWritable(item.writable);

                        //NOTE:: When a function scope is changed using bind API.
                        //Then that new function does not contain "prototype" property
                        if(typeof item.value === 'function') {
                            item.value.toLocaleString = item.value.__proto__.toLocaleString;
                            item.value.toSource = item.value.__proto__.toSource;
                            item.value.toString = item.value.__proto__.toString;
                        }

                        Object.defineProperty(target, item.keey, {
                            configurable: false,
                            enumerable: false,
                            value: item.value,
                            writable: item.writable
                        });

                        if(item.items && item.items.length) {
                            _def(item.value, item.items);
                        }
                    }(obj, items[i]));
                }
            }, _defWritable = function(writable) {
                if(UWPBUILD === true) {
                    writable = true;
                } else
                if(typeof writable !== 'boolean') {
                    writable = false;
                }

                return writable;
            };
        _props = [
            {keey:'$kwebfw$', value:{}, items:[
                {keey:'app', value:{}, items:[
                    {keey:'blocked', value:null, writable:true},
                    {keey:'build', value:'', writable:true},
                    {keey:'currentBreakpoint', value:-1, writable:true},
                    {keey:'currentFormUID', value:'', writable:true},
                    {keey:'currentLocale', value:'', writable:true},
                    {keey:'currentTheme', value:'', writable:true},
                    {keey:'defaultLocale', value:'', writable:true},
                    {keey:'focusedWidget', value:null, writable:true},
                    {keey:'gesture', value:null, writable:true},
                    {keey:'hoveredWidget', value:null, writable:true},
                    {keey:'id', value:'', writable:true},
                    {keey:'idleCallback', value:null, writable:true},
                    {keey:'idleTime', value:0, writable:true},
                    {keey:'idleTimeout', value:null, writable:true},
                    {keey:'lastInteractionAt', value:null, writable:true},
                    {keey:'localeInitialized', value:false, writable:true},
                    {keey:'localeLayoutConfig', value:null, writable:true},
                    {keey:'localization', value:false, writable:true},
                    {keey:'mode', value:1, writable:true},
                    {keey:'previousFormUID', value:'', writable:true},
                    {keey:'previousLocale', value:'', writable:true},
                    {keey:'supportedLocales', value:[], writable:true},
                    {keey:'supportedThemes', value:[], writable:true},
                    {keey:'title', value:'', writable:true}
                ]},
                {keey:'automation', value:{}},
                {keey:'behavior', value:{}},
                {keey:'defVoltmxProp', value:_def},
                {keey:'defWritable', value:_defWritable},
                {keey:'device', value:{}, items:[
                    {keey:'DPI', value:1}, //window.devicePixelRatio
                    {keey:'height', value:-1, writable:true},
                    {keey:'width', value:-1, writable:true}
                ]},
                {keey:'ecmaEnable', value:false, writable:true},
                {keey:'F', value:{}, items:[ //Experimental features
                    {keey:'EIWP', value:true}, //false:: escape invalid widget property (whereever possible)
                    {keey:'RFB', value:true}, //false:: render fake border
                    {keey:'RIVW', value:false} //false:: render invisible widget
                ]},
                {keey:'flag', value:{}},

                {keey:'globals', value:{}, items:[
                    {keey:'kof', value: {}, writable: true}
                ]},
                {keey:'legacy', value:legacy},
                {keey:'locale', value:{}},
                {keey:'plugins', value:{}},
                {keey:'theme', value:{}}, //value:{<themeName>:{stylesheet:DOM, lastIndex:-1, rule:{<skinName>:{index:-1}}}}
                {keey:'ui', value:{}} //Widget file specific properties will be available here
            ]},
            {keey:'automation', value:{}},
            {keey:'props', value:{}},
            {keey:'ui', value:{}}
        ]; _def(_ns, _props);

        return _ns;
    }())});


    Object.defineProperty(voltmx, 'appinit', {configurable:false, enumerable:false, writable:false, value:(function() {
        var _ns = {}, $K = voltmx.$kwebfw$;


        var _getStaticContentPath = function() {
            if(kof.loadedFromOtherFramework) {
                return kof.appUrl+'/';
            }

            return '';
            /*
            var $K = voltmx.$kwebfw$, $KA = $K.app;

            return $KA.staticContentPath;
            //*/
        };


        //TODO:: voltmx.appinit.voltmxLoadFunctionalModules
        var _voltmxLoadFunctionalModules = function() {
            var $K = voltmx.$kwebfw$, $KU = $K.utils;

            $KU.log({api:'voltmx.appinit.voltmxLoadFunctionalModules', enter:true});

            //

            $KU.log({api:'voltmx.appinit.voltmxLoadFunctionalModules', exit:true});
        };


        var _setApplicationMetaConfiguration = function(ckey, cval) {
            var k = '', putIntoAppConfig = function(id, val) {
                var $K = voltmx.$kwebfw$, $KA = $K.app;

                if(id === 'appid') $KA.id = val;
                else if(id === 'locales') $KA.supportedLocales = val;
                else if(id === 'build') $KA.build = val;
                else if(id === 'apptitle') $KA.title = val;
                else if(id === 'i18nArray') {
                    //TODO:: Not sure, if it is even needed.
                }
            };

            if(typeof ckey === 'string') {
                putIntoAppConfig(ckey, cval);
            } else if(typeof ckey === 'object' && ckey) {
                for(k in ckey) {
                    if(Object.prototype.hasOwnProperty.call(ckey, k)) {
                        putIntoAppConfig(k, ckey[k]);
                    }
                }
            }
        };

        var _setRequireBasepath = function() {
            if(_isEcmaEnabledForIE()) {
                requirejs.config({
                    baseUrl: voltmx.appinit.getStaticContentPath() + 'desktopweb/es5appjs'
                });
            } else {
                requirejs.config({
                    baseUrl: voltmx.appinit.getStaticContentPath() + 'desktopweb/appjs'
                });
            }
        };

        $K.defVoltmxProp(_ns, [
            {keey:'getStaticContentPath', value:_getStaticContentPath},
            {keey:'voltmxLoadFunctionalModules', value:_voltmxLoadFunctionalModules},
            {keey:'setApplicationMetaConfiguration', value:_setApplicationMetaConfiguration},
            {keey:'setRequireBasepath', value:_setRequireBasepath}
        ]);


        return _ns;
    }())});


    if(populateRequiredGlobalVariables()) {
        $K = voltmx.$kwebfw$; device = $K.device;
        device.height = body.offsetHeight;
        device.width = body.offsetWidth;

        body.setAttribute('aria-busy', 'true');

        applySplashScreen(body);
        boot(head, body);
        body = head = null; //For GC
    } else {
        throw new Error('Your platform is not suported.');
    }
}());
