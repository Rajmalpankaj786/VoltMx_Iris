$KI.os.time = function() {
    var timeStr = (new Date()).toTimeString();
    return timeStr.slice(0, timeStr.indexOf(" "));
};

$KI.os.diffdatetime = function(time1, time2) {
    if(typeof(time1) !== "string" || typeof(time2) !== "string") {
        throw new Error("Invalid argument(s) to os.diffdatetime");
    }

    var t1 = time1.split(":");
    t1[2] = t1[2] - 0;
    var t2 = time2.split(":");
    t2[2] = t2[2] - 0;
    var one_day = 86400;
    var t1sec = t1[0] * 3600 + t1[1] * 60 + t1[2];
    var t2sec = t2[0] * 3600 + t2[1] * 60 + t2[2];

    return(t1sec > one_day || t2sec > one_day) ? null : t1sec - t2sec;
};

$KI.os.date = function() {
    var result;
    var currentDate = new Date();

    if(0 === arguments.length) {
        var timeStr = currentDate.toTimeString();
        result = $KI.os.padZero(currentDate.getMonth() + 1) + "/" + $KI.os.padZero(currentDate.getDate()) + "/" + $KI.os.padZero(currentDate.getFullYear() % 100) + " " + timeStr.slice(0, timeStr.indexOf(" "));
        return result;
    } else if(typeof(arguments[0]) == "string") {

        if(arguments[0].toLowerCase().indexOf("dd") != -1) {

            return $KI.os.formatDate(arguments[0], currentDate);
        } else {
            var utc = arguments[0].charAt(0) === '!';
            var index = utc ? 1 : 0;
            if('*' === arguments[0].charAt(index) && 't' === arguments[0].charAt(index + 1)) {
                var day = utc ? currentDate.getUTCDate() : currentDate.getDate();
                var mon = (utc ? currentDate.getUTCMonth() : currentDate.getMonth()) + 1;
                var year = utc ? currentDate.getUTCFullYear() : currentDate.getFullYear();

                result = new Object();
                result["year"] = year;
                result["month"] = mon;
                result["day"] = day;
                result["hour"] = utc ? currentDate.getUTCHours() : currentDate.getHours();
                result["min"] = utc ? currentDate.getUTCMinutes() : currentDate.getMinutes();
                result["sec"] = utc ? currentDate.getUTCSeconds() : currentDate.getSeconds();
                result["wday"] = utc ? currentDate.getUTCDay() : currentDate.getDay() + 1;
                result["yday"] = $KU.getDayOfYear(day, mon, year);
                result["isdst"] = utc ? false : $KI.os.checkForDst();
                return result;
            } else
                return null;
        }
    } else
        return null;
};

$KI.os.tocurrency = function(arg) {
    $KU.logExecuting('voltmx.os.toCurrency');
    arg -= 0;
    if(isNaN(arg)) {
        $KU.logErrorMessage('Invalid argument to os.tocurrency');
        throw new Error("Invalid argument to os.tocurrency");
    }
    $KU.logExecutingWithParams('voltmx.os.toCurrency', arg);
    if(arg < 0) arg *= -1;
    var str = arg.toFixed(3);
    str = str.substr(0, str.length - 1);
    var outStr = "";
    for(var i = 0; i < str.length - 4; i++) {
        outStr += str.charAt(i);
        if((str.length - i - 1) % 3 === 0) outStr += ",";
    }

    for(; i < str.length; i++) {
        outStr += str.charAt(i);
    }

    $KU.logExecutingFinished('voltmx.os.toCurrency');
    return "$" + outStr;
};

$KI.os.tonumber = function(arg) {
    $KU.logExecuting('voltmx.os.toNumber');
    if(arguments.length != 1) {
        $KU.logErrorMessage('Invalid argument to os.number');
        throw new Error("Invalid argument to os.tonumber");
    }
    $KU.logExecutingWithParams('voltmx.os.toNumber', arg);
    $KU.logExecutingFinished('voltmx.os.toNumber');
    if(typeof(arg) === "number") {
        return arg;
    } else if(typeof(arg) === "string") {

        var str = arg.replace(/^\s*/, '').replace(/\s*$/, '');
        if(str === '') {
            return null;
        } else {
            var num = str - 0;
            return(isNaN(num) ? null : num);
        }

    } else {
        $KU.logWarnMessage('Request aborted on user request');
        return null;
    }
};

$KI.os.freememory = function() {
    $KU.logExecuting('voltmx.os.freeMemory');
    $KU.logExecutingWithParams('voltmx.os.freeMemory');
    $KU.logExecutingFinished('voltmx.os.freeMemory');
    return 100 * 1024 * 1024;
};


$KI.os.comparedates = function(d1, d2, frmt) {
    if(d1 == null || d2 == null || frmt == null || !$KU.isValidDate(d1, frmt) || !$KU.isValidDate(d2, frmt))
        return null

    var date1 = $KU.getDate(d1, frmt);
    var date2 = $KU.getDate(d2, frmt);
    var oneday = 24 * 60 * 60 * 1000;

    return parseInt((date1.getTime() - date2.getTime()) / oneday);
};



$KI.os.addtodate = function(d1, frmt, unt, cnt) {
    if(d1 == null || frmt == null || unt == null || cnt == null) {
        return null;
    }
    var inputDate = d1;
    var fmt = frmt.split(" ")[0];
    var unit = unt;
    var count = cnt;
    var parts = inputDate.split(" ");
    var dateParts = parts[0].split("/");
    var time = parts[1];

    if(!$KU.isValidDate(parts[0], fmt))
        return null;

    if(time) {
        var t = time.split(":");
        var one_day = 86400;
        var tSec = t[0] * 3600 + t[1] * 60 + (t[2] - 0);
        if(tSec > one_day) return null;
    }

    var dateObj = $KU.getDate(inputDate, fmt);

    if(dateObj) {
        switch(unit) {
            case "years":
                dateObj.setFullYear(dateObj.getFullYear() + count);
                break;
            case "months":
                dateObj.setMonth(dateObj.getMonth() + count);
                break;
            case "days":
                dateObj.setDate(dateObj.getDate() + count);
                break;
            case "hours":
                dateObj.setHours(dateObj.getHours() + count);
                break;
            case "minutes":
                dateObj.setMinutes(dateObj.getMinutes() + count);
                break;
            default:
                break;
        }
        if($KI.os.isleapyear([d1, fmt]) && dateObj.getMonth() >= 1 && (unit == "years" || (unit == "months" && (count == -12 || count == 12))))
            dateObj.setDate(dateObj.getDate() - 1);

        return $KI.os.formatDate(fmt, dateObj) + (time ? " " + dateObj.toTimeString().split(" ")[0] : "");
    }
    return null;
};


$KI.os.isleapyear = function(d1, frmt) {
    var year;
    var date = new Date(); 
    year = date.getFullYear();

    if(typeof(d1) == "string" && typeof(frmt) == "string") {

        if(!$KU.isValidDate(d1, frmt))
            return false;

        var yearPart = d1.split("/")[2];
        year = (yearPart.length == 2) ? parseInt(date.getFullYear().toString().substr(0, 2) + yearPart) : parseInt(yearPart);
    }

    if((year % 400 == 0) || ((year % 4 == 0) && (year % 100 != 0))) {
        return true;
    } else {
        return false;
    }
};


$KI.os.formatdate = function(d1, sfrmt, tgtfrmt) {
    var year;
    if(d1 == null || sfrmt == null || tgtfrmt == null) {
        return null;
    } else if(typeof(d1) === "string" && typeof(sfrmt) === "string" && typeof(tgtfrmt) === "string") {

        var inputDate = d1
        var srcfmt = sfrmt;
        var targetfmt = tgtfrmt;

        var datePos = srcfmt.indexOf("dd");
        var monthPos = srcfmt.indexOf("mm");
        var yearPos = (srcfmt.indexOf("yyyy") != -1) ? srcfmt.indexOf("yyyy") : srcfmt.indexOf("yy");

        if((srcfmt == "dd/mm/yyyy" && !$KU.isValidDate(inputDate, srcfmt)) || datePos == -1 || monthPos == -1 || yearPos == -1 || srcfmt.indexOf("ddd") != -1 || srcfmt.indexOf("mmm") != -1) {
            return null;
        }

        var dateStrSep = srcfmt.charAt(datePos - 1);
        var dateEndSep = srcfmt.charAt(datePos + 2);
        dateEndSep = (dateEndSep == "(") ? "" : dateEndSep;

        var monthStrSep = srcfmt.charAt(monthPos - 1);
        var monthEndSep = srcfmt.charAt(monthPos + 2);

        var yearStrSep = srcfmt.charAt(yearPos - 1);
        var yearEndSep = srcfmt.charAt(yearPos + 4);

        var startDateIndex = (dateStrSep == "") ? inputDate.indexOf(dateStrSep, datePos - 1) : inputDate.indexOf(dateStrSep, datePos - 2) + 1;
        var startMonthIndex = (monthStrSep == "") ? inputDate.indexOf(monthStrSep, monthPos - 1) : inputDate.indexOf(monthStrSep, monthPos - 2) + 1;
        var startYearIndex = (yearStrSep == "") ? inputDate.indexOf(yearStrSep, yearPos - 1) : ((inputDate.indexOf(yearStrSep, yearPos - 2) != -1) ? inputDate.indexOf(yearStrSep, yearPos - 2) + 1 : inputDate.indexOf(yearStrSep, yearPos - 4) + 1);

        var endDateIndex = (dateEndSep != "") ? inputDate.indexOf(dateEndSep, datePos) : inputDate.indexOf(dateEndSep, datePos + 2);
        var endMonthIndex = (monthEndSep != "") ? inputDate.indexOf(monthEndSep, monthPos) : inputDate.indexOf(monthEndSep, monthPos + 2);
        var endYearIndex = (yearEndSep != "") ? inputDate.indexOf(yearEndSep, yearPos) : inputDate.indexOf(yearEndSep, yearPos + 4);

        var dateVal = inputDate.substring(startDateIndex, endDateIndex);
        var monthVal = inputDate.substring(startMonthIndex, endMonthIndex);
        var yearVal = inputDate.substring(startYearIndex, endYearIndex);

        if((yearVal.length == 2 && targetfmt.indexOf("yyyy") != -1))
            var fullyr = new Date().getFullYear().toString().substr(0, 2) + yearVal;

        targetfmt = targetfmt.replace(/dd/, $KI.os.padZero(parseInt(dateVal, 10)));
        targetfmt = targetfmt.replace(/mm/, $KI.os.padZero(parseInt(monthVal, 10)));
        targetfmt = targetfmt.replace(/(yyyy|yy)/, fullyr ? fullyr : ((targetfmt.indexOf("yyyy") == -1 && yearVal.length == 4) ? yearVal.substr(2, 2) : yearVal));

        return targetfmt;
    }
    return null;
};


$KI.os.isvaliddate = function(date, frmt) {
    return(arguments.length != 2 || date == null || frmt == null) ? false : $KU.isValidDate(date, frmt);
};

$KI.os.checkForDst = function() {
    var rightNow = new Date();
    var jan1 = new Date(rightNow.getFullYear(), 0, 1, 0, 0, 0, 0);
    var temp = jan1.toGMTString();
    var jan2 = new Date(temp.substring(0, temp.lastIndexOf(" ") - 1));
    var std_time_offset = (jan1 - jan2) / (1000 * 60 * 60);

    var june1 = new Date(rightNow.getFullYear(), 6, 1, 0, 0, 0, 0);
    temp = june1.toGMTString();
    var june2 = new Date(temp.substring(0, temp.lastIndexOf(" ") - 1));
    var daylight_time_offset = (june1 - june2) / (1000 * 60 * 60);
    var dst;
    if(std_time_offset == daylight_time_offset) {
        
        return false;
    } else {
        
        return true;
    }
};



$KI.os.datecomponents = function(date, frmt) {
    var result;
    var dateObject;
    if(arguments.length == 0) {
        dateObject = new Date();
    } else if(date != null && frmt != null) {
        if(!$KU.isValidDate(date, frmt))
            return null;
        dateObject = $KU.getDate(date, frmt);
        var yearfmt = frmt.split("/")[2];
    }
    if(dateObject) {

        var day = dateObject.getDate();
        var mon = dateObject.getMonth() + 1;
        var year = (yearfmt && yearfmt.length == 2) ? parseInt(dateObject.getFullYear().toString().substr(2, 2)) : dateObject.getFullYear();

        result = new Object();
        result["year"] = year;
        result["month"] = mon;
        result["day"] = day;
        result["hour"] = dateObject.getHours();
        result["min"] = dateObject.getMinutes();
        result["sec"] = dateObject.getSeconds();
        result["wday"] = dateObject.getDay() + 1;
        result["yday"] = $KU.getDayOfYear(day, mon, year);
        result["isdst"] = $KI.os.checkForDst();
        return result;
    } else
        return null;

};

$KI.os.padZero = function(num) {
    return num < 10 ? ("0" + num) : num;
};

$KI.os.formatDate = function(fmt, dateObj) {
    fmt = fmt.toLowerCase();
    fmt = fmt.replace(/dd/, $KI.os.padZero(dateObj.getDate()));
    fmt = fmt.replace(/mm/, $KI.os.padZero(dateObj.getMonth() + 1));
    return fmt.replace(/(yyyy|yy)/, fmt.indexOf("yyyy") == -1 ? dateObj.getFullYear().toString().substr(2, 2) : dateObj.getFullYear());
};

$KI.os.getappcontext = function() {
    var appcontext = {};
    var flag = "standalone" in window.navigator && window.navigator.standalone ? 1 : 0;
    $KU.logExecuting('voltmx.os.getAppContext');
    $KU.logExecutingWithParams('voltmx.os.getAppContext');
    $KU.logExecutingFinished('voltmx.os.getAppContext');
    appcontext["launchmode"] = flag;
    return appcontext;
};

$KI.os.hasgpssupport = function() {
    $KU.logExecuting('voltmx.os.hasGPSSupport');
    $KU.logExecutingWithParams('voltmx.os.hasGPSSupport');
    $KU.logExecutingFinished('voltmx.os.hasGPSSupport');
    return 'navigator' in window && 'geolocation' in navigator;
};

($KI.os.hascamerasupport = function() {
    if(navigator.mediaDevices && navigator.mediaDevices.enumerateDevices) {
        navigator.mediaDevices.enumerateDevices().then(function(device) {
            var i = 0;
            for(i; i < device.length; i++) {
                if(device[i].kind === 'videoinput') {
                    voltmx.appinit.isCameraSupported = true;
                }
            }
        });
    }
})();

$KI.os.hastouchsupport = function() {
    $KU.logExecuting('voltmx.os.hasTouchSupport');
    $KU.logExecutingWithParams('voltmx.os.hasTouchSupport');
    $KU.logExecutingFinished('voltmx.os.hasTouchSupport');
    $KU.logErrorMessage('hasTouchSupport failed');
    return false;
};

$KI.os.hasorientationsupport = function() {
    $KU.logExecuting('voltmx.os.hasOrientationSupport');
    $KU.logExecutingWithParams('voltmx.os.hasOrientationSupport');
    $KU.logExecutingFinished('voltmx.os.hasOrientationSupport');
    $KU.logErrorMessage('hasOrientationSupport failed');
    return false;
};

$KI.os.hasaccelerometersupport = function() {
    return false;
};

$KI.os.httpheaders = function() {
    if($KG["httpheaders"])
        return JSON.stringify($KG["httpheaders"]);
};

$KI.os.getdevicecurrentorientation = function() {
    $KU.logExecuting('voltmx.os.getDeviceCurrentOrientation');
    $KU.logExecutingWithParams('voltmx.os.getDeviceCurrentOrientation');
    var orientation = $KU.detectOrientation();
    $KU.logExecutingFinished('voltmx.os.getDeviceCurrentOrientation');
    return(orientation == "portrait") ? constants.DEVICE_ORIENTATION_PORTRAIT : constants.DEVICE_ORIENTATION_LANDSCAPE;
};


$KI.os.setapplicationscrollmode = function(paramObj) {
    if(!paramObj)
        return;

    var platform = $KU.getPlatform();
    var platformName = platform.name.toLowerCase();
    var platformVersion = platform.version;

    if(platformName == "blackberryNTH" || (platformName == "windowsphone" && $KU.isIE9))
        return;

    var custom = paramObj.customscroll;
    var mixed = paramObj.mixedscroll;
    var native2 = paramObj.nativescroll;
    var nomodify;

    
    if(mixed) {
        var platforms = mixed.platforms;
        if(platforms) {
            for(var i = IndexJL; i < platforms.length; i++) {
                var platform = platforms[i];
                if(platformName == platform.name.toLowerCase()) {
                    
                    var useragents = platform.useragents;
                    if(useragents) {
                        for(var j = IndexJL; j < useragents.length; j++) {
                            if(navigator.userAgent.toLowerCase().indexOf(useragents[j].toLowerCase()) != -1) {
                                $KG["useMixedScroll"] = true;
                                nomodify = true;
                                break;
                            }
                        }
                        if(nomodify)
                            break;
                    }

                    
                    var versions = platform.versions;
                    if((!useragents && !versions) || versions[IndexJL] == -1) {
                        $KG["useMixedScroll"] = true;
                        break;
                    }
                    for(var j = IndexJL; j < versions.length; j++) {
                        if(platformVersion == versions[j]) {
                            $KG["useMixedScroll"] = true;
                            break;
                        }
                    }
                }
            }
        }
    }
    
    if(native2 && !nomodify) {
        var platforms = native2.platforms;
        if(platforms) {
            for(var i = IndexJL; i < platforms.length; i++) {
                var platform = platforms[i];
                if(platformName == platform.name.toLowerCase()) {
                    
                    var useragents = platform.useragents;
                    if(useragents) {
                        for(var j = IndexJL; j < useragents.length; j++) {
                            if(navigator.userAgent.toLowerCase().indexOf(useragents[j].toLowerCase()) != -1) {
                                $KG["useNativeScroll"] = true;
                                $KG["useMixedScroll"] = false;
                                nomodify = true;
                                break;
                            }
                        }
                        if(nomodify)
                            break;
                    }

                    
                    var versions = platform.versions;
                    if((!useragents && !versions) || versions[IndexJL] == -1) {
                        if(!$KG["useMixedScroll"])
                            $KG["useNativeScroll"] = true;
                        break;
                    }
                    for(var j = IndexJL; j < versions.length; j++) {
                        if(platformVersion == versions[j]) {
                            $KG["useNativeScroll"] = true;
                            $KG["useMixedScroll"] = false;
                            break;
                        }
                    }
                }
            }
        }
    }
    
    if(!$KG["useMixedScroll"] && !$KG["useNativeScroll"])
        $KG["useCustomScroll"] = true;
};

$KI.os.print = function(container, autoClose) {
    $KU.logExecuting('voltmx.os.print');
    $KU.logExecutingWithParams('voltmx.os.print', container, container);
    if(container && container.id && !(container.wType === "Form")) {
        var domNode = document.getElementById(container.id);
        if(!domNode)
            domNode = $KU.getNodeByModel(container);
        if(domNode) {
            var printContents = domNode.outerHTML;
            var headTag = document.getElementsByTagName("head")[0];
            var baseTag;
            for(var i = 0; i < headTag.childNodes.length; i++) {
                if(headTag.childNodes[i].nodeName == "BASE") {
                    baseTag = headTag.childNodes[i];
                    break;
                }
            }

            var w = window.open();
            if(w) {
                w.document.write('<!DOCTYPE html><html>');
                w.document.write('<head>');
                
                
                if(baseTag) {
                    w.document.write("<base href='");
                    w.document.write(baseTag.href);
                    w.document.write("' target = '_blank'>");
                }
                var tempCSS = document.styleSheets;
                for(var i = 0; i < tempCSS.length; i++) {
                    if(tempCSS[i].href) {
                        w.document.write("<link rel='stylesheet' href='");
                        w.document.write(tempCSS[i].href);
                        w.document.write("' type='text/css'></link>");
                    }
                }
                if(voltmx.appinit.isSafari)
                    w.document.write('<style>table{table-layout: auto !important;} .ktable {table-layout: auto !important;} .kcell {display: table !important;}</style>');
                w.document.write('</head>');
                if(voltmx.appinit.isSafari)
                    w.document.write("<body style='" + window.document.body.style.cssText + "' >");
                else
                    w.document.write('<body>');
                w.document.write(printContents);
                
                setTimeout(function() {
                    w.document.write('</body>');
                    w.document.write('</html>');
                    w.document.close(); 
                    w.focus();
                    w.print();
                }, 1000);

                setTimeout(function() {
                    w.close();
                }, 2000); 
            } else {
                voltmx.print("Allow popup to open for this site.");
            }
        }
    } else if(container && !(container.wType && container.wType === "Form")) {
        var w = window.open();
        if(w) {
            w.document.write(container);
            w.onload = new function() {
                w.document.close();
                w.focus();
                w.print();
            }

            if(autoClose) {
                setTimeout(function() {
                    w.close();
                }, 2000); 
            }
        } else {
            voltmx.print("Allow popup to open for this site.");
        }

    } else {
        window.print();
    }
    $KU.logExecutingFinished('voltmx.os.print');
};

$KI.os.addbookmark = function(url, title, params) {
    var url = url || window.location.href.split("#")[0];
    url = url.split("?")[0];
    if(params && params instanceof Object) {
        var searchStr = "";
        for(var prop in params) {
            searchStr += escape(prop) + "=" + escape(params[prop]) + "&";
        }
        searchStr && (searchStr = searchStr.substring(0, searchStr.length - 1))
    }
    try {
        title = title || document.title;
        url += searchStr ? ("?" + searchStr) : "";
        if((typeof window.sidebar == "object") && (typeof window.sidebar.addPanel == "function")) {
            window.sidebar.addPanel(title, url, ""); 
        } else if(voltmx.appinit.isIE && typeof window.external == "object") {
            window.external.AddFavorite(url, title); 
        } else if(voltmx.appinit.isOpera) {
            var elem = document.createElement('a');
            elem.setAttribute('href', url);
            elem.setAttribute('title', title);
            elem.setAttribute('rel', 'sidebar');
            elem.click();
        }
    } catch(err) {
        voltmx.web.logger("log", err);
    }
};



$KIO.FileSystem = $KIO.fs = {
    callback: function() {}, 

    ieFileUploadObj: {},

    init: function() {
        if(!$KU.isAjaxUploadSupported) {
            var htmlString = "<iframe id='voltmxiframeElem' name='voltmxiframeElem' src='about:blank' style='opacity:0;width:0px;height:0px;' ></iframe>";
            var wrapper = document.createElement('div');
            wrapper.innerHTML = htmlString;
            document.body.appendChild(wrapper);
        }
    },

    browse: function(browseConfig, browseCallback) { 

        if(!browseConfig instanceof Object || !browseCallback instanceof Function)
            return;

        this.callback = browseCallback;
        var htmlString = "";

        if($KU.isAjaxUploadSupported) {
            var fileElement = document.getElementById("voltmxFileElem");
            if(!fileElement) {
                htmlString = "<form name='uploadForm'><input type='file' multiple id='voltmxFileElem' onchange='$KIO.fs.afterBrowse(arguments[0])' onclick='uploadForm.reset();' style='opacity:0;width:0px;height:0px;display:none;' /></form>";
                var wrapper = document.createElement('div');
                wrapper.innerHTML = htmlString;
                document.body.appendChild(wrapper);
                fileElement = document.getElementById("voltmxFileElem");
            }

            if(browseConfig.selectMultipleFiles == false)
                fileElement.removeAttribute("multiple");
            else
                fileElement.setAttribute("multiple", "multiple");
            if(browseConfig.filter)
                fileElement.setAttribute("accept", browseConfig.filter.join(","));
            else
                fileElement.removeAttribute("accept");

            fileElement.click();
        } else {
            var iFrameWindow = document.getElementById("voltmxiframeElem").contentWindow || document.getElementById("voltmxiframeElem").documentWindow;
            var frmElem = iFrameWindow.document.getElementById("uploadForm");
            if(!frmElem) {
                var wrapper = document.createElement('div');
                wrapper.innerHTML = '<form id="uploadForm" method="POST" action="" enctype="multipart/form-data" ></form>';
                if(iFrameWindow.document.body) iFrameWindow.document.body.appendChild(wrapper);
                frmElem = iFrameWindow.document.getElementById("uploadForm");
            }
            var unique = new Date().getTime();
            var fileInput = document.createElement('input');
            fileInput.setAttribute('type', 'file');
            fileInput.setAttribute('name', 'file_' + unique);
            fileInput.setAttribute('id', 'file_' + unique);
            fileInput.setAttribute('onchange', 'window.parent.$KIO.fs.afterBrowse(this)');
            fileInput.setAttribute('onclick', 'uploadForm.reset()');
            frmElem.appendChild(fileInput);

            var file = iFrameWindow.document.getElementsByTagName("input");
            file = file[file.length - 1];
            if(file) file.click();
        }
    },

    afterBrowse: function(event) { 

        var fileList = [];
        if($KU.isAjaxUploadSupported) {
            for(var i = 0, f; f = event.target.files[i]; ++i) {
                fileList.push(new $KIO.File(f)); 
            }
        } else {
            var path = event.value;
            var fName = path.substring(path.lastIndexOf('\\') + 1);
            var pName = path.substring(0, path.lastIndexOf('\\')); 
            pName = pName.substring(pName.lastIndexOf('\\') + 1); 
            fileList.push(new $KIO.File({
                name: fName,
                fullPath: path,
                parent: pName,
                file: event
            }));
        }
        $KIO.fs.callback(event, fileList); 
    },

    uploadFiles: function(URL, fileList, upLoadCallBack, upLoadConfig) { 
        if(!URL || !fileList || (fileList && fileList.length < 1))
            return;

        var uploadState = [];
        for(var i = 0, f; f = fileList[i]; ++i) {
            uploadState.push({
                file: f,
                status: null,
                uploadBytes: null
            });
        }
        if($KU.isAjaxUploadSupported) {
            for(var index = 0; index < uploadState.length; index++) {
                this.uploadFile(URL, uploadState, index, upLoadCallBack, upLoadConfig); 
            }
        } else {
            var voltmxFrame = document.getElementById("voltmxiframeElem");
            if($KU.isIE) {
                voltmxFrame.attachEvent("onload", $KIO.fs.ieCallback);
                voltmxFrame.attachEvent("onerror", $KIO.fs.ieErrorCallback);
            } else {
                voltmxFrame.onload = $KIO.fs.ieCallback;
                voltmxFrame.onerror = $KIO.fs.ieErrorCallback;
            }

            $KIO.fs.ieFileUploadObj.state = uploadState;
            $KIO.fs.ieFileUploadObj.url = URL;
            $KIO.fs.ieFileUploadObj.callback = upLoadCallBack;

            var re = /^(http|https):\/\/?/;
            if(!re.test(URL)) {
                $KIO.fs.ieErrorCallback();
                return;
            } 

            var frame = document.getElementById('voltmxiframeElem');
            var iFrameWindow = frame.contentWindow || frame.documentWindow;
            var form = iFrameWindow.document.getElementById("uploadForm");
            form.action = URL;
            form.submit();
        }
    },

    uploadFile: function(url, uploadObj, fIndex, callback, config) { 
        try {
            var f = uploadObj[fIndex].file;
            var formData = new FormData();
            formData.append(f.name, f.file); 

            var re = /^(http|https):\/\/?/;
            if(!re.test(url)) {
                uploadObj[fIndex].status = constants.FILE_UPLOAD_ERROR_STATE;
                callback && callback(url, uploadObj);
                return;
            } 

            var xhr = new XMLHttpRequest();
            xhr.open('POST', url, true);

            xhr.upload.onloadstart = function(e) {
                uploadObj[fIndex].status = constants.FILE_UPLOAD_START_STATE;
                uploadObj[fIndex].uploadBytes = 0;
                callback && callback(url, uploadObj);
            }
            xhr.upload.onprogress = function(e) { 
                if(e.lengthComputable) {
                    uploadObj[fIndex].uploadBytes = e.loaded;
                }
                uploadObj[fIndex].status = constants.FILE_UPLOAD_PROGRESS_STATE;
                callback && callback(url, uploadObj);
            };
            xhr.upload.onerror = function(e) { 
                uploadObj[fIndex].status = constants.FILE_UPLOAD_ERROR_STATE;
                uploadObj[fIndex].uploadBytes = 0;
                callback && callback(url, uploadObj);
            };
            xhr.upload.onabort = function(e) { 
                uploadObj[fIndex].status = constants.FILE_UPLOAD_ERROR_STATE;
                callback && callback(url, uploadObj);
            };
            xhr.onload = function(e) {
                if(this.status == 200) { 
                    uploadObj[fIndex].status = constants.FILE_UPLOAD_COMPLETE_STATE;
                    uploadObj[fIndex].uploadBytes = uploadObj[fIndex].file.size;
                    callback && callback(url, uploadObj);
                }
            };
            xhr.onerror = function(e) { 
                uploadObj[fIndex].status = constants.FILE_UPLOAD_ERROR_STATE;
                uploadObj[fIndex].uploadBytes = 0;
                callback && callback(url, uploadObj);
            };
            var requestTimer = setTimeout(function() { 
                xhr.abort();
            }, constants.UPLOAD_MAX_WAIT_TIME);
            xhr.onreadystatechange = function() { 
                if(xhr.readyState != 4) {
                    return;
                }
                clearTimeout(requestTimer);
                if(xhr.status != 200) {
                    uploadObj[fIndex].status = constants.FILE_UPLOAD_ERROR_STATE;
                    uploadObj[fIndex].uploadBytes = 0;
                    callback && callback(url, uploadObj);
                }
            };
            xhr.send(formData); 
        } catch(e) {
            voltmx.web.logger("log", e.message);
        }
    },

    ieCallback: function() {
        var uObj = $KIO.fs.ieFileUploadObj;
        try {
            var response = document.getElementById("voltmxiframeElem").contentWindow.document.body.innerHTML;
            if(response) {
                for(var i = 0; i < uObj.state.length; i++)
                    uObj.state[i].status = constants.FILE_UPLOAD_COMPLETE_STATE;
                uObj.callback && uObj.callback(uObj.url, uObj.state);
                voltmx.web.logger("log", response);
            }
        } catch(e) {
            voltmx.web.logger("log", e.message);
            for(var i = 0; i < uObj.state.length; i++)
                uObj.state[i].status = constants.FILE_UPLOAD_ERROR_STATE;
            uObj.callback && uObj.callback(uObj.url, uObj.state);
        }
    },

    ieErrorCallback: function() {
        var uObj = $KIO.fs.ieFileUploadObj;
        for(var i = 0; i < uObj.state.length; i++)
            uObj.state[i].status = constants.FILE_UPLOAD_ERROR_STATE;
        uObj.callback && uObj.callback(uObj.url, uObj.state);
    },

    copyBundledRawFileTo : tobeimplemented,
    getAppGroupDirectoryPath : tobeimplemented,
    getApplicationDirectoryPath : tobeimplemented,
    getCacheDirectoryPath : tobeimplemented,
    getDatabaseDirectoryPath : tobeimplemented,
    getDataDirectoryPath : tobeimplemented,
    getExternalStorageDirectoryPath : tobeimplemented,
    getFile : tobeimplemented,
    getRawDirectoryPath : tobeimplemented,
    getSupportDirectoryPath : tobeimplemented,
    isExternalStorageAvailable : tobeimplemented

};



$KIO.File = function(file) {
    if($KU.isAjaxUploadSupported) {
        this.name = file.name;
        this.file = file; 
    } else {
        for(var prop in file) this[prop] = file[prop];
    }
    this.readable = true;
    this.writable = false;
    if(file.lastModifiedDate)
        this.modificationTime = new Date(file.lastModifiedDate).toISOString();
    if(file.size)
        this.size = file.size;
    return this;
};
