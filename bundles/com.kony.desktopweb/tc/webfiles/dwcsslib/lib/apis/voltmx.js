(function() {
    var $K = voltmx.$kwebfw$;

    //Available on SPA and DesktopWeb
    var _convertToBase64 = function voltmx_convertToBase64(rawbytes) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils;
        var b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
        var o1, o2, o3, h1, h2, h3, h4, bits, i = 0, ac = 0, enc='', tmp_arr = [];

        $KU.log({api:'voltmx.convertToBase64', enter:true});

        if(!rawbytes) {
            enc = rawbytes;
        } else if('btoa' in window) {
            enc = window.btoa(unescape(encodeURIComponent(rawbytes)));
        } else {
            do{ //Pack three octets into four hexets
                o1 = rawbytes.charCodeAt(i++) & 0xff;
                o2 = rawbytes.charCodeAt(i++) & 0xff;
                o3 = rawbytes.charCodeAt(i++) & 0xff;

                bits = o1<<16 | o2<<8 | o3;

                h1 = bits>>18 & 0x3f;
                h2 = bits>>12 & 0x3f;
                h3 = bits>>6 & 0x3f;
                h4 = bits & 0x3f;

                tmp_arr[ac++] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
            } while(i < rawbytes.length);

            enc = tmp_arr.join('');

            switch(rawbytes.length % 3) {
                case 1: enc = enc.slice(0, -2) + '==';
                    break;
                case 2: enc = enc.slice(0, -1) + '=';
                    break;
                default: break;
            }
        }

        $KU.log({api:'voltmx.convertToBase64', exit:true});

        return enc;
    };

    //Available on SPA but not on except DesktopWeb
    //On SPA, reading base64 from an image src is not supported.
    //But you can read the base64 from an image which is displayed through base64.
    //eslint-disable-next-line no-unused-vars
    var _convertToRawBytes = function voltmx_convertToRawBytes(base64String) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils;

        $KU.log({api:'voltmx.convertToRawBytes', enter:true});
        $KU.log({api:'voltmx.convertToRawBytes', exit:true});

        return null; //Dummy implementation
    };


    var _getError = function voltmx_getError(error) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils;

        $KU.log({api:'voltmx.getError', enter:true});
        $KU.log({api:'voltmx.getError', exit:true});

        return error;
    };


    var _getProperty = function(group, key) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, value = null;

        $KU.log({api:'voltmx.getProperty', enter:true});

        if(arguments.length === 2) {
            if(typeof _voltmxAppProperties === 'object' && _voltmxAppProperties
            && typeof key === 'string' && key) {
                value = _voltmxAppProperties[key] || null;
            }
        }

        $KU.log({api:'voltmx.getProperty', exit:true});

        return value;
    };


    var _screenshot = function voltmx_screenshot(config) {
        var $K = voltmx.$kwebfw$, $KD = $K.dom, $KW = $K.widget, $KA = $K.app,
            $KU = $K.utils, parent = $KW.model($KA.currentFormUID),
            pel = $KD.parent($KW.el(parent, 'node')), cssscript = '',
            filereader = new FileReader(), viewportMain = $KW.el(parent, 'viewport'),
            viewportHeight = viewportMain.scrollHeight, i = 0, j = 0,
            viewportWidth = viewportMain.scrollWidth, data = '', svg = [],
            tempCSS = document.styleSheets, Script = '', formMain = null, csstext = '';

        if($KU.browser('name') === 'msie' || $KU.browser('name') === 'unknown') {
            return;
        }

        formMain = $KD.first(pel);
        csstext = formMain.style.cssText;
        $KD.setAttr(formMain, 'style', csstext +'height:'+ viewportHeight.toString() + 'px !important;' + 'width:' + viewportWidth.toString() + 'px !important;');

        for(i = 0; i < tempCSS.length; i++) {
            if(tempCSS[i].href) {
                for(j = 0; j < tempCSS[i].rules.length; j++) {
                    cssscript = cssscript + tempCSS[i].rules[j].cssText;
                }
            }
        }

        for(i = 0; i < pel.childNodes.length; i++) {
            Script = Script + (new XMLSerializer).serializeToString(pel.childNodes[i]);
        }

        data = '<svg xmlns="http://www.w3.org/2000/svg" width="' + viewportWidth + '" height="' + viewportHeight + '">'
                + '<foreignObject width="100%" height="100%">'
                + '<div xmlns="http://www.w3.org/1999/xhtml" style="font-size:40px" >'
                + '<style>'
                + cssscript
                + '</style>'
                +Script
                + '</div>'
                + '</foreignObject>'
                + '</svg>';
        svg = new Blob([data], {type: 'image/svg+xml;charset=utf-8'});
        filereader.readAsDataURL(svg);
        filereader.onload = function() {
            var img = $KD.create('IMG');
            this.onload = null;
            $KD.setAttr(img, 'crossOrigin', 'anonymous');
            $KD.setAttr(img, 'src', filereader.result);
            $KD.setAttr(img, 'height', viewportHeight);
            $KD.setAttr(img, 'width', viewportWidth);
            $KD.style(img, 'display', 'none');
            $KD.add($KD.body(), img);
            img.onload = function() {
                var canvas = $KD.create('canvas'),
                    ctx = [];
                this.onload = null;
                $KD.setAttr(canvas, 'src', filereader.result);
                $KD.setAttr(canvas, 'height', viewportHeight);
                $KD.setAttr(canvas, 'width', viewportWidth);
                $KD.style(canvas, 'display', 'none');
                $KD.add($KD.body(), canvas);
                ctx = canvas.getContext('2d');
                ctx.imageSmoothingEnabled = true;
                ctx.drawImage(img, 0, 0);
                $KD.remove(img);
                $KD.remove(canvas);
                config.callback && config.callback(canvas.toDataURL().split(',')[1]);
            };
        };

        $KD.setAttr(formMain, 'style', csstext);
    };

    var _print = function voltmx_print(str) {
        //eslint-disable-next-line no-console
        if(console && typeof console.log === 'function'
        && constants.PRINTSTUB !== 'true') {
            if(typeof str === 'string'
            || typeof str === 'number'
            || typeof str === 'boolean'
            || str === null || str === undefined) {
                //eslint-disable-next-line no-console
                console.log(str);
            } else if(typeof str === 'object' && str) {
                if(JSON) {
                    //eslint-disable-next-line no-console
                    console.log(JSON.stringify(str));
                } else if(typeof str.toString === 'function') {
                    //eslint-disable-next-line no-console
                    console.log(str.toString());
                }
            }
        }
    };


    var _type = function voltmx_type(variable) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget, datatype = '';

        $KU.log({api:'voltmx.type', enter:true});

        if($KU.is(variable, 'string')) {
            datatype = 'string';
        } else if($KU.is(variable, 'number')) {
            datatype = 'number';
        } else if($KU.is(variable, 'function')) {
            datatype = 'function';
        } else if($KU.is(variable, 'null')) {
            datatype = 'null';
        } else if($KU.is(variable, 'widget')) {
            variable = $KW.proxy(variable);
            datatype = (variable) ? variable._kwebfw_.ns : 'userdata';
        } else {
            datatype = 'userdata';
        }

        $KU.log({api:'voltmx.type', exit:true});

        return datatype;
    };

    $K.defVoltmxProp(voltmx, [
        {keey:'convertToBase64', value:_convertToBase64},
        {keey:'convertToRawBytes', value:_convertToRawBytes},
        {keey:'getError', value:_getError},
        {keey:'screenshot', value:_screenshot},
        {keey:'print', value:_print, writable: true},
        {keey:'type', value:_type}
    ]);


    $K.defVoltmxProp(voltmx.props, [
        {keey:'getProperty', value:_getProperty}
    ]);
}());
