
if (!document.querySelectorAll) 
    document.querySelectorAll = function(selector){
        return $(selector);
    }
    
if (!document.querySelector || voltmx.appinit.isIE8) 
    document.querySelector = function(selector){
        var nodes = $(selector);
        return (nodes && nodes[0]) || null;
    }

try{	

if (typeof window.localStorage == 'undefined') 
    (function(){
        var localStorage = function(type){
            var        
            _storage = {}; 
            _storage_elm = null;
            _storage_service = {
                lStorage: "{}"
            };
            function _save(){
                try {
                    _storage_service.lStorage = JSON.stringify(_storage);
                    
                    if (_storage_elm) {
                        _storage_elm.setAttribute("lStorage", _storage_service.lStorage);
                        _storage_elm.save("lStorage");
                    }                    
                } 
                catch (e) {
                }
            }
            function init(){
                _storage_elm = document.createElement('link');
                if (_storage_elm.addBehavior) {
                    
                    _storage_elm.style.behavior = 'url(#default#userData)';
                    
                    document.getElementsByTagName('head')[0].appendChild(_storage_elm);
                    _storage_elm.load("lStorage");
                    var data = "{}";
                    try {
                        data = _storage_elm.getAttribute("lStorage");
                    } 
                    catch (e) {
                    }
                    _storage_service.lStorage = data;
                }
                else {                    
                    return;
                }
                _load_storage();
            }
            function _load_storage(){
                
                if (_storage_service.lStorage) {
                    try {
                        _storage = JSON.parse(String(_storage_service.lStorage));
                    } 
                    catch (e) {
                        _storage_service.lStorage = "{}";
                    }
                }                             
            }
            
            init();
            return {
                clear: function(){
                    _storage = {};
                    _save();
                },
                getItem: function(key){
                    return _storage[key];
                },
                key: function(i){
                    
                    var ctr = 0;
                    for (var k in _storage) {
                        if (ctr == i) 
                            return k;
                        else 
                            ctr++;
                    }
                    return null;
                },
                removeItem: function(key){
                    if (key in _storage) {
                        delete _storage[key];
                        _save();
                    }
                },
                setItem: function(key, value){
                    _storage[key] = value;
                    _save();
                }
            };
        };
        if (typeof window.localStorage == 'undefined') 
            window.localStorage = new localStorage();
    })();



if(typeof sessionStorage === "undefined")(function(window){



var 
    top = window
;
try {
    while(top !== top.top)
        top = top.top;
} catch(e) {
};


 var RC4 = (function(fromCharCode, random){
    return {

        
        decode:function(key, data){
            return this.encode(key, data);
        },

        
        encode:function(key, data){
            
            
            for(var
                length = key.length, len = data.length,
                decode = [], a = [],
                i = 0, j = 0, k = 0, l = 0, $;
                i < 256; ++i
            )   a[i] = i;
            for(i = 0; i < 256; ++i){
                j = (j + ($ = a[i]) + key.charCodeAt(i % length)) % 256;
                a[i] = a[j];
                a[j] = $;
            };
            for(j = 0; k < len; ++k){
                i = k % 256;
                j = (j + ($ = a[i])) % 256;
                length = a[i] = a[j];
                a[j] = $;
                decode[l++] = fromCharCode(data.charCodeAt(k) ^ a[(length + $) % 256]);
            };
            return decode.join("");
        },

        
        key:function(length){
            for(var i = 0, key = []; i < length; ++i)
                key[i] = fromCharCode(1 + ((random() * 255) << 0));
            return key.join("");
        }
    }
    
    
    
})(window.String.fromCharCode, window.Math.random);


var LSS = (function(window){

    
    function LSS(_storage, _key, _data){
        this._i = (this._data = _data || "").length;
        if(this._key = _key)
            this._storage = _storage;
        else {
            this._storage = {_key:_storage || ""};
            this._key = "_key";
        };
    };

    
    LSS.prototype.c = String.fromCharCode(1);

    
    LSS.prototype._c = ".";

    
    LSS.prototype.clear = function(){
        this._storage[this._key] = this._data;
    };

    
    LSS.prototype.del = function(key){
        var data = this.get(key);
        if(data !== null)
            this._storage[this._key] = this._storage[this._key].replace(escape.call(this, key, data), "");
    };

    
    LSS.prototype.escape   = window.escape;

    
    LSS.prototype.get = function(key){
        var _storage = this._storage[this._key],
            c = this.c,
            i = _storage.indexOf(key = c.concat(this._c, this.escape(key), c, c), this._i),
            data = null
        ;
        if(-1 < i){
            i = _storage.indexOf(c, i + key.length - 1) + 1;
            data = _storage.substring(i, i = _storage.indexOf(c, i));
            data = this.unescape(_storage.substr(++i, data));
        };
        return data;
    };

    
    LSS.prototype.key = function(){
        var _storage = this._storage[this._key],
            c = this.c,
            _c = c + this._c,
            i = this._i,
            data = [],
            length = 0,
            l = 0
        ;
        while(-1 < (i = _storage.indexOf(_c, i))){
            data[l++] = this.unescape(_storage.substring(i += 2, length = _storage.indexOf(c, i)));
            i = _storage.indexOf(c, length) + 2;
            length = _storage.indexOf(c, i);
            i = 1 + length + 1 * _storage.substring(i, length);
        };
        return data;
    };

    
    LSS.prototype.set = function(key, data){
        this.del(key);
        this._storage[this._key] += escape.call(this, key, data);
    };

    
    LSS.prototype.unescape = window.unescape;

    
    function escape(key, data){
        var c = this.c;
        return c.concat(this._c, this.escape(key), c, c, (data = this.escape(data)).length, c, data);
    };

    return LSS;

})(window);


 


if(Object.prototype.toString.call(window.opera) === "[object Opera]"){

    
    
    history.navigationMode="compatible";

    
    
    LSS.prototype.escape = window.encodeURIComponent;
    LSS.prototype.unescape = window.decodeURIComponent;
};



function sessionStorage(){
    
    
    
    
    
    function clear(){
        
        document.cookie = [
            "sessionStorage=" + window.encodeURIComponent($key = RC4.key(128))
        ].join(';');
        
        domain = RC4.encode($key, domain);
        
        LSS = new LSS(top, "name", top.name);
    };
    var 
        name = top.name,
        
        document = top.document,
        
        cookie = /\bsessionStorage\b=([^;]+)(;|$)/,
        
        data = cookie.exec(document.cookie),
        
        i
    ;
    
    if(data){
        
        $key = window.decodeURIComponent(data[1]);
        
        domain = RC4.encode($key, domain);
        
        LSS = new LSS(top, "name");
        
        for(var key = LSS.key(), i = 0, length = key.length, $cache = {}; i < length; ++i){
            if((data = key[i]).indexOf(domain) === 0){
                
                cache.push(data);
                $cache[data] = LSS.get(data);
                
                
                LSS.del(data);
            };
        };
        
        LSS = new LSS.constructor(top, "name", top.name);
        
        if(0 < (this.length = cache.length)){
            
            
            for(i = 0, length = cache.length, c = LSS.c, data = []; i < length; ++i)
                
                data[i] = c.concat(LSS._c, LSS.escape(key = cache[i]), c, c, (key = LSS.escape($cache[key])).length, c, key);
            top.name += data.join("");
        };
    } else {
        
        clear();
        
        if(!cookie.exec(document.cookie))
            
            cache = null;
    };
};


sessionStorage.prototype = {

    
    
    length:0,

    
    
    
    
    
    
    key:function(index){
        
        if(typeof index !== "number" || index < 0 || cache.length <= index)
            
            throw "Invalid argument";
        return cache[index];
    },

    
    
    
    getItem:function(key){
        
        
        key = domain + key;
        
        
        
        
        
        
        
        if(hasOwnProperty.call($cache, key))
            return $cache[key];
        
        var data = LSS.get(key);
        if(data !== null)
            
            data = $cache[key] = RC4.decode($key, data);
        return data;
    },

    
    
    
    
    
    setItem:function(key, data){
        
        this.removeItem(key);
        
        key = domain + key;
        
        LSS.set(key, RC4.encode($key, $cache[key] = "" + data));
        
        this.length = cache.push(key);
    },

    
    
    
    removeItem:function(key){
        var data = LSS.get(key = domain + key);
        if(data !== null){
            
            delete $cache[key];
            LSS.del(key);
            
            this.length = cache.remove(key);
        };
    },

    
    
    clear:function(){
        LSS.clear();
        $cache = {};
        cache.length = 0;
    }
};


var
    
    domain = top.document.domain,

    
    cache = [],

    
    $cache = {}, hasOwnProperty = $cache.hasOwnProperty,

    
    $key
;



cache.remove = function(data){
    var i = this.indexOf(data);
    if(-1 < i)
        this.splice(i, 1);
    return this.length;
};


if(!cache.indexOf) cache.indexOf = function(data){
        for(var i = 0, length = this.length; i < length; ++i){
            if(this[i] === data)
                return i;
        };
        return -1;
    };



if(top.sessionStorage){
    
    sessionStorage = function(){};
    sessionStorage.prototype = top.sessionStorage;
};

sessionStorage = new sessionStorage;


if(cache !== null)
    
    window.sessionStorage = sessionStorage;

})(window);
}catch(e){}