Object.defineProperty(voltmx, 'i18n', {configurable:false, enumerable:false, writable:false, value:(function() {
    var _ns = {}, $K = voltmx.$kwebfw$;


    var _cleanupI18nCache = function $KI18N_cleanupI18nCache() {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KA = $K.app;

        $KU.log({api:'voltmx.i18n.cleanupI18nCache', enter:true});

        $KU.each($KA.supportedLocales, function(locale) {
            var $K = voltmx.$kwebfw$, $KA = $K.app, $KS = $K.store,
                $KL = $K.locale, key = ($KA.id+'_'+locale);

            $KS.remove('local', key);
            delete $KL[locale];
        });

        $KU.log({api:'voltmx.i18n.cleanupI18nCache', exit:true});
    };


    var _deleteResourceBundle = function $KI18N_deleteResourceBundle(locale) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KA = $K.app, $KL = $K.locale,
            $KS = $K.store, key = ($KA.id+'_'+locale), index = -1;

        $KU.log({api:'voltmx.i18n.deleteResourceBundle', enter:true});

        $KS.remove('local', key);
        delete $KL[locale];

        index = $KA.supportedLocales.indexOf(locale);
        if(index >= 0) $KA.supportedLocales.splice(index, 1);

        $KU.log({api:'voltmx.i18n.deleteResourceBundle', exit:true});
    };


    var _determineCurrentLocale = function $KI18N_determineCurrentLocale() {
        var $K = voltmx.$kwebfw$, $KA = $K.app, locales = $KA.supportedLocales,
            deviceLocale = _getBrowserLanguage(), current = $KA.defaultLocale;

        deviceLocale = deviceLocale.replace('-', '_');

        if(locales.indexOf(deviceLocale) >= 0) {
            current = deviceLocale;
        } else {
            deviceLocale = deviceLocale.split('_')[0];

            if(locales.indexOf(deviceLocale) >= 0) {
                current = deviceLocale;
            }
        }

        return current;
    };


    var _getBrowserLanguage = function $KI18N_getBrowserLanguage() {
        var $K = voltmx.$kwebfw$, $KG = $K.globals, $KA = $K.app,
            httpheaders = $KG.httpheaders, language = '';

        if(httpheaders && httpheaders['Accept-Language']) {
            language = httpheaders['Accept-Language'].split(',')[0];
        } else {
            language = navigator.language || navigator.userLanguage || $KA.defaultLocale;
        }

        return language;
    };


    var _getCurrentDeviceLocale = function $KI18N_getCurrentDeviceLocale() {
        var $K = voltmx.$kwebfw$, $KU = $K.utils,
            lang = _getBrowserLanguage(),
            list = lang.split('-');

        $KU.log({api:'voltmx.i18n.getCurrentDeviceLocale', enter:true});
        $KU.log({api:'voltmx.i18n.getCurrentDeviceLocale', exit:true});

        return {language:list[0], country:list[1], name:lang};
    };


    var _getCurrentLocale = function $KI18N_getCurrentLocale() {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KA = $K.app;

        $KU.log({api:'voltmx.i18n.getCurrentLocale', enter:true});
        $KU.log({api:'voltmx.i18n.getCurrentLocale', exit:true});

        return $KA.currentLocale;
    };


    var _getLocalizedString = function $KI18N_getLocalizedString(i18nKey) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KL = $K.locale,
            $KA = $K.app, i18nValue = $KL[$KA.currentLocale];

        $KU.log({api:'voltmx.i18n.getLocalizedString', enter:true});

        if(i18nValue) i18nValue = i18nValue[i18nKey];

        $KU.log({api:'voltmx.i18n.getLocalizedString', exit:true});

        return ($KU.is(i18nValue, 'undefined')) ? '' : i18nValue;
    };


    var _getResource = function $KI18N_getResource(locale, initializeFn, successcallback, errorcallback, info) {
        var $K = voltmx.$kwebfw$, $KG = $K.globals,
            $KU = $K.utils, filePath = '', timer = '';

        filePath = $K.constants.RESOURCES_PATH + '/'
                 + $K.constants.TRANSLATION_PATH + '/'
                 + locale + '.' + $K.constants.TRANSLATION_EXT
                 + '?ver=' + $KG.version;

        filePath = ($KG.platform + '/' + filePath);

        timer = setTimeout(function() {
            var $K = voltmx.$kwebfw$, $KU = $K.utils, $KA = $K.app;

            if(timer) {
                clearTimeout(timer);
                timer = '';
            }

            $KU.log('error', 'Timeout while loading resource bundle.');
            $KA.localeInitialized = true;
            initializeFn && initializeFn();
        }, 60000);

        $KU.loadScript(filePath, false,
            function() { //Success Callback
                var $K = voltmx.$kwebfw$, $KU = $K.utils, $KD = $K.dom,
                    $KA = $K.app, $KL = $K.locale, $KS = $K.store,
                    success = true, key = ($KA.id+'_'+locale);

                //Resource file exists so store it in the database
                //voltmx.print('i18n resource loaded successfully');
                if(timer) {
                    clearTimeout(timer);
                    timer = '';
                }

                $KA.localeInitialized = true;
                $KA.currentLocale = locale;
                $KD.setAttr($KD.find(document, 'html')[0],
                    'lang', locale.split('_')[0].toLowerCase());

                if(window.i18nObject) { //STARTS:: Saving to localstore
                    success = $KS.put('local', key,
                        ($KU.is(window.i18nObject, 'object')
                            ? JSON.stringify(window.i18nObject)
                            : window.i18nObject
                        )
                    );

                    if(!success) {
                        $KS.remove('local', ($KA.id+'_'+'i18nVersion'));
                    }

                    $KL[locale] = (
                        $KU.is(window.i18nObject, 'object')
                            ? window.i18nObject
                            : JSON.parse(window.i18nObject)
                    );

                    window.i18nObject = null;
                } //ENDS:: Saving to localstore

                initializeFn && initializeFn();

                if($KU.is(successcallback, 'function')) {
                    successcallback($KA.previousLocale, $KA.currentLocale, info);
                }
            },

            function() { //Error Callback
                var $K = voltmx.$kwebfw$, $KU = $K.utils, $KA = $K.app;

                $KU.log('error', 'An error has occurred while loading i18 locales');

                if(timer) {
                    clearTimeout(timer);
                    timer = '';
                }

                $KA.localeInitialized = true;
                initializeFn && initializeFn();

                if($KU.is(errorcallback, 'function')) {
                    errorcallback($KA.previousLocale, $KA.currentLocale, info);
                }
            }
        );
    };


    //Returns only current locale instead of all locales supported by the browser
    var _getSupportedLocales = function $KI18N_getSupportedLocales() {
        var $K = voltmx.$kwebfw$, $KU =$K.utils, lang = '';

        $KU.log({api:'voltmx.i18n.getSupportedLocales', enter:true});
        $KU.log('warn', 'getsupportedlocales: Not supported!');
        lang = _getBrowserLanguage();
        $KU.log({api:'voltmx.i18n.getSupportedLocales', exit:true});

        return [lang];
    };


    var _initializeI18n = function $KI18N_initializeI18n(locale, initializeFn, successcallback, errorcallback, info) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KD = $K.dom, $KA = $K.app,
            $KS = $K.store, $KL = $K.locale, key = ($KA.id+'_'+locale), value = '';

        value = $KS.fetch('local', key);

        if(!value) {
            _getResource(locale, initializeFn, successcallback, errorcallback, info);
        } else {
            value = JSON.parse(value);
            $KA.localeInitialized = true;
            $KA.currentLocale = locale;
            $KL[locale] = value;

            $KD.setAttr($KD.find(document, 'html')[0],
                'lang', locale.split('_')[0].toLowerCase());

            initializeFn && initializeFn();

            if($KU.is(successcallback, 'function')) {
                successcallback($KA.previousLocale, locale, info);
            }
        }
    };


    var _isResourceBundlePresent = function $KI18N_isResourceBundlePresent(locale) {
        var $K = voltmx.$kwebfw$, $KA = $K.app;

        return ($KA.supportedLocales.indexOf(locale) >= 0);
    };


    var _setCurrentLocaleAsync = function $KI18N_setCurrentLocaleAsync(localename, onsuccesscallback, onfailurecallback, info) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KA = $K.app, locales = $KA.supportedLocales;

        $KU.log({api:'voltmx.i18n.setCurrentLocaleAsync', enter:true});

        if($KU.is(localename, 'string') && localename
        && locales.indexOf(localename) >= 0) {
            if($KA.currentLocale !== localename) {
                $KA.previousLocale = $KA.currentLocale;
                _initializeI18n(localename, null, onsuccesscallback, onfailurecallback, info);
            } else if($KU.is(onsuccesscallback, 'function')) {
                onsuccesscallback($KA.previousLocale, localename, info);
            }
        } else {
            //LOG:: LOG WARNING
        }

        $KU.log({api:'voltmx.i18n.setCurrentLocaleAsync', exit:true});
    };


    var _setDefaultLocale = function $KI18N_setDefaultLocale(localename, onsuccesscallback, onerrorcallback, initializeFn) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KA = $K.app,
            $KS = $K.store, locales = $KA.supportedLocales,
            version = '', key = ($KA.id+'_i18nVersion');

        $KU.log({api:'voltmx.i18n.setDefaultLocale', enter:true});

        if(!localename) localename = '';
        if(!onsuccesscallback) onsuccesscallback = null;
        if(!onerrorcallback) onerrorcallback = null;
        if(!initializeFn) initializeFn = null;

        if((!$KA.currentLocale || $KA.defaultLocale !== localename)
        && $KU.is(localename, 'string') && localename
        && locales.indexOf(localename) >= 0) {
            if(initializeFn) {
                version = $KS.fetch('local', key) || '';

                if(version !== $KA.i18nVersion) {
                    $KS.put('local', key, $KA.i18nVersion);
                    _cleanupI18nCache();
                }
            }

            $KA.defaultLocale = localename;

            _initializeI18n(_determineCurrentLocale(), initializeFn, onsuccesscallback, onerrorcallback);
        } else {
            //LOG:: LOG WARNING
        }

        $KU.log({api:'voltmx.i18n.setDefaultLocale', exit:true});
    };


    var _setDefaultLocaleAsync = function $KI18N_setDefaultLocaleAsync(localename, onsuccesscallback, onfailurecallback, info) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KA = $K.app, $KS = $K.store,
            locales = $KA.supportedLocales, version = '', key = ($KA.id+'_i18nVersion');

        $KU.log({api:'voltmx.i18n.setDefaultLocaleAsync', enter:true});

        if((!$KA.currentLocale || $KA.defaultLocale !== localename)
        && $KU.is(localename, 'string') && localename
        && locales.indexOf(localename) >= 0) {
            version = $KS.fetch('local', key) || '';

            if(version !== $KA.i18nVersion) {
                $KS.put('local', key, $KA.i18nVersion);
                _cleanupI18nCache();
            }

            $KA.defaultLocale = localename;

            _initializeI18n(_determineCurrentLocale(), null, onsuccesscallback, onfailurecallback, info);
        } else {
            //LOG:: LOG WARNING
        }

        $KU.log({api:'voltmx.i18n.setDefaultLocaleAsync', exit:true});
    };


    var _setLocaleLayoutConfig = function $KI18N_setLocaleLayoutConfig(config) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KA = $K.app;

        $KU.log({api:'voltmx.i18n.setLocaleLayoutConfig', enter:true});

        if($KU.is(config, 'object')) {
            $KA.localeLayoutConfig = config;
        }

        $KU.log({api:'voltmx.i18n.setLocaleLayoutConfig', exit:true});
    };


    var _setResourceBundle = function $KI18N_setResourceBundle(inputtable, locale) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KA = $K.app,
            $KL = $K.locale, $KS = $K.store, key = ($KA.id+'_'+locale);

        $KU.log({api:'voltmx.i18n.setResourceBundle', enter:true});

        if($KU.is(inputtable, 'object') && $KU.is(locale, 'string') && locale) {
            $KS.put('local', key, JSON.stringify(inputtable)); // overrides existing key
            $KL[locale] = inputtable;

            if($KA.supportedLocales.indexOf(locale) === -1) {
                $KA.supportedLocales.push(locale);
            }
        }

        $KU.log({api:'voltmx.i18n.setResourceBundle', exit:true});
    };


    var _updateResourceBundle = function $KI18N_updateResourceBundle(inputtable, locale) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KA = $K.app, bundle = null,
            $KL = $K.locale, $KS = $K.store, key = ($KA.id+'_'+locale);

        $KU.log({api:'voltmx.i18n.updateResourceBundle', enter:true});

        if($KU.is(inputtable, 'object') && $KU.is(locale, 'string') && locale) {
            bundle = $KS.fetch('local', key);
            bundle = JSON.parse(bundle);

            $KU.each(inputtable, function(value, keey) {
                bundle[keey] = value;
            });

            $KS.put('local', key, JSON.stringify(bundle)); //Overrides existing key
            $KL[locale] = bundle;

            if($KA.supportedLocales.indexOf(locale) === -1) {
                $KA.supportedLocales.push(locale);
            }
        }

        $KU.log({api:'voltmx.i18n.updateResourceBundle', exit:true});
    };


    $K.defVoltmxProp(_ns, [
        {keey:'deleteResourceBundle', value:_deleteResourceBundle},
        {keey:'getCurrentDeviceLocale', value:_getCurrentDeviceLocale},
        {keey:'getCurrentLocale', value:_getCurrentLocale},
        {keey:'getLocalizedString', value:_getLocalizedString},
        {keey:'getSupportedLocales', value:_getSupportedLocales},
        {keey:'isResourceBundlePresent', value:_isResourceBundlePresent},
        {keey:'setCurrentLocaleAsync', value:_setCurrentLocaleAsync},
        {keey:'setDefaultLocale', value:_setDefaultLocale},
        {keey:'setDefaultLocaleAsync', value:_setDefaultLocaleAsync},
        {keey:'setLocaleLayoutConfig', value:_setLocaleLayoutConfig},
        {keey:'setResourceBundle', value:_setResourceBundle},
        {keey:'updateResourceBundle', value:_updateResourceBundle}
    ]);


    return _ns;
}())});
