/* global Volt MX */
function addScript() {} //This is to bypass loading of "app.js" in legacy "index.jsp"
(function() {
    var script = null, platform = '', src = '',
        supportedPlatforms = ['desktopweb', 'spaandroid', 'spaandroidtablet', 'spabbnth', 'spablackberry', 'spaipad', 'spaiphone', 'spaplaybook', 'spawindows', 'spawindowstablet', 'spawinphone8'],
        determinePlatform = function() {
            var scripts = document.scripts, index = -1,
                s = 0, slen = scripts.length, src = '';

            for(s=0; s<slen; s++) {
                src = scripts[s].src;

                if(typeof src === 'string') {
                    index = src.indexOf('/jslib/voltmxframework.js');

                    if(index === -1) {
                        index = src.indexOf('/jslib/voltmxinit.js');
                    }
                }

                if(index >= 0) {
                    src = src.substr(0, index).split('/');
                    return src[(src.length-1)];
                }
            }

            return '';
        };

    window.voltmx = {
        appinit: {},
        globals: {}
    };
    window.$KG = voltmx.globals;

    platform = determinePlatform();

    if(typeof platform === 'string' && platform) {
        voltmx.legacy = true;
        voltmx.appinit.initappcache = function() {
            console.log('//TODO::');
        };

        src = 'lib/voltmxinit.js';
        if(supportedPlatforms.indexOf(platform) >= 0) {
            src = (platform+'/'+src);
        }

        script = document.createElement('SCRIPT');
        script.type = 'text/javascript';
        script.src = src;

        script.onerror = function() {
            script.onerror = null; //For GC
            throw new Error('Could not initialize the framework.');
        };

        document.head.appendChild(script);
    } else {
        throw new Error('Could not determine the platform.');
    }
}());