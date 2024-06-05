var voltmx = {
        appid: '',
        filesToCache: '',
        cacheName: '',
        contextName: '/',
        path: 'desktopweb',
        returnObj: null,
        cacheid:'',
        buildtype: 'zip',
        cssmode:false,
        isSWHelperAvailable: false
    },
    constants = {
        CACHE_VERSION: '@cacheversion@',
        NONE: 'none',
        NETWORK_ONLY: 'networkonly',
        NETWORKFIRST_CACHELATER: 'networkfirstcachelater',
        CACHEFIRST_NETWORKLATER: 'cachefirstnetworklater'
    };

importScripts('./nocache/sw-ext.js');


voltmx.cacheid = cacheid;
voltmx.cssmode = @cssmode@;
voltmx.buildtype = '@buildtype@';
voltmx.isSWHelperAvailable = @isSWHelperAvailable@;
voltmx.appid = location.pathname.split('/')[1];
voltmx.returnObj = {"cachestrategy": constants.CACHEFIRST_NETWORKLATER};

if(voltmx.buildtype === 'zip') {
    voltmx.path = voltmx.cacheid + '/' + voltmx.path;
    voltmx.contextName = '/'+location.pathname.split('/')[1]+'/';
    voltmx.appid = location.pathname.split('/')[2];
}
voltmx.cacheName = voltmx.appid + '-v' + constants.CACHE_VERSION;
if(!voltmx.cssmode){
    voltmx.filesToCache = [
        './',
        voltmx.path + '/voltmxdesktop.css',
        voltmx.path + '/appjs/app.js',
        voltmx.path + '/appjs/kvmodules.js',
        voltmx.path + '/jslib/voltmxframework.js'
    ];
} else {
    voltmx.filesToCache = [
        './',
        voltmx.path + '/voltmxdesktop.css',
        voltmx.path + '/themes/default/theme.css',
        voltmx.path + '/lib/fw.css',
        voltmx.path + '/appjs/app.js',
        voltmx.path + '/appjs/kvmodules.js',
        voltmx.path + '/jslib/voltmxframework.js',
        voltmx.path + '/lib/voltmxinit.js',
        voltmx.path + '/lib/fw.js'
    ];
}

if(voltmx.isSWHelperAvailable) {
    importScripts('./nocache/sw-helper.js');
}

self.addEventListener('install', function(e) {
    //console.log('[ServiceWorker] Install');
    e.waitUntil(
        caches.open(voltmx.cacheName).then(function(cache) {
            //console.log('[ServiceWorker] Caching app shell');
            return cache.addAll(voltmx.filesToCache);
        }));
    self.skipWaiting();
});

self.addEventListener('activate', function(e) {
    //console.log('[ServiceWorker] Activate');
    e.waitUntil(
        caches.keys().then(function(keyList) {
            return Promise.all(keyList.map(function(key) {
                if(key !== voltmx.cacheName) {
                    if(key.split('-')[0] === voltmx.appid) { // delete only if same app
                        //console.log('[ServiceWorker] Removing old cache', key);
                        return caches.delete(key);
                    }
                }
            }));
        }));
    return self.clients.claim();
});

self.addEventListener('fetch', function(event) {
    //console.log('[ServiceWorker] Fetch', event.request.url);
    var requestUrl = event.request.url;
    var selfLocation = self.location.origin;

    if(voltmx.isSWHelperAvailable) {
        if(event.request.method === 'GET' && typeof cacheMechanism === 'function') {
            if(handleAppshellFiles(requestUrl)) {
                event.respondWith(cacheFirstNetworkLater(event, caches));
            } else {
                voltmx.returnObj = cacheMechanism(requestUrl);
                if(voltmx.returnObj && voltmx.returnObj.cachestrategy == constants.CACHEFIRST_NETWORKLATER) {
                    event.respondWith(cacheFirstNetworkLater(event, caches));
                } else if (voltmx.returnObj && voltmx.returnObj.cachestrategy == constants.NETWORKFIRST_CACHELATER) {
                    event.respondWith(networkFirstCacheLater(event, caches));
                }
            }
        }
    } else {
        if(requestUrl.startsWith(selfLocation+voltmx.contextName+voltmx.appid)) {
            if(requestUrl.indexOf('nocache') == -1) {
                event.respondWith(cacheFirstNetworkLater(event, caches));
            } else {
                return fetch(event.request).then(function(response) {
                    return response;
                });
            }
        }
    }
});

var handleAppshellFiles = function(requestUrl) {
    var handleAppshell = false, i = 0, fileLen = voltmx.filesToCache.length;

    if(requestUrl.indexOf(voltmx.appid+'/#_') > 0 || requestUrl.indexOf(voltmx.appid+'/?') > 0){
        handleAppshell = true;
    } else {
        for( i = 0 ; i< fileLen; i++) {
            if(requestUrl.indexOf(voltmx.filesToCache[i]) > 0){
                handleAppshell = true;
                break;
            }
        }
    }
    return handleAppshell;
};


var cacheFirstNetworkLater = function(event, caches) {
    return caches.match(event.request).then(function(response) {
        if(response) {
            return response;
        } else {
            return fetchAndCache(event, caches);
        }
    });
}


var fetchAndCache = function(event, caches) {
    return fetch(event.request).then(function(response) {
         if((response.ok && response.status === 200)
         || (response.status === 0 && response.type === 'opaque')) {
            return caches.open(voltmx.cacheName).then(function(cache) {
                return cache.put(event.request, response.clone()).then(function() {
                    return response;
                }).catch(function() {
                    return response;
                });
            }).catch(function() {
                return response;
            });
        } else {
            return response;
        }
    });
}


var networkFirstCacheLater = function(event, caches) {
    return fetch(event.request).then(function(response) {
         if((response.ok && response.status === 200)
         || (response.status === 0 && response.type === 'opaque')) {
            return caches.open(voltmx.cacheName).then(function(cache) {
                return cache.put(event.request, response.clone()).then(function() {
                    return response;
                }).catch(function() {
                    return response;
                });
            }).catch(function() {
                return response;
            });
        } else {
            return caches.match(event.request).then(function(cacheresponse) {
                if(cacheresponse) {
                    return cacheresponse;
                } else {
                    return response;
                }
            });
        }
    }).catch(function(error) {
        return caches.match(event.request).then(function(cacheresponse) {
            return cacheresponse;
        });
    });
};