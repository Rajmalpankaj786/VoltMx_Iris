
$KI.themes = (function() {
    
    

    var module = {

        initialCssLoadDone: false,

        setcurrenttheme: function(themeid, successcallback, errorcallback) {
            var dwCssFile = "voltmxdesktop.css", headTag = null, link = null,
                i = 0, cssFile = null, existingTag = null, linktags = null,
                currentTheme = null;

            $KU.logExecuting('voltmx.theme.setCurrentTheme');
            $KU.logExecutingWithParams('voltmx.theme.setCurrentTheme', themeid, successcallback, errorcallback);
            if(!($KU.inArray($KG["themes"], themeid, true))) {
                errorcallback();
                $KU.logExecutingFinished('voltmx.theme.setCurrentTheme VIA if !($KU.inArray($KG["themes"], themeid, true)) is true');
            } else  if(module.initialCssLoadDone && themeid == module.getcurrenttheme()) {
                successcallback();
                $KU.logExecutingFinished('voltmx.theme.setCurrentTheme VIA if themeid == module.getcurrenttheme() is true');
            } else {
                headTag = document.head;
                cssFile = $KG.platformver + (themeid == "default" ? '' : themeid+'/') + dwCssFile;
                if($KG[themeid+'remoteurl']) cssFile = $KG[themeid+'remoteurl'];
                currentTheme = $KG["theme"];
                if($KG[currentTheme+'remoteurl']) dwCssFile = $KG[currentTheme+'remoteurl'];
                link = document.createElement("link");
                link.rel = "stylesheet";
                link.type = "text/css";
                link.href = cssFile;
                if(module.initialCssLoadDone) {
                    link.onload = function() {
                        $KG["theme"] = themeid;
                        successcallback();
                    };
                    link.onerror = function() {
                        errorcallback();
                    };
                }

                linktags = headTag.querySelectorAll('link');
                for(i = 0;i < linktags.length; i++) {
                    if(linktags[i].href.indexOf(dwCssFile) >= 0) {
                       existingTag = linktags[i];
                       break;
                    }
                }
                if(existingTag != null) {
                    headTag.replaceChild(link, existingTag);
                } else {
                    existingTag = headTag.querySelector('style');
                    headTag.insertBefore(link, existingTag);
                }

                if(!module.initialCssLoadDone) {
                    module.initialCssLoadDone = true;
                    $KG["theme"] = themeid;
                    successcallback();
                }

                $KU.logExecutingFinished('voltmx.theme.setCurrentTheme return 3');
            }
        },

        deletetheme: function(theme, successcallback, errorcallback) {
            $KU.logExecuting('voltmx.theme.deleteTheme');
            $KU.logExecutingWithParams('voltmx.theme.deleteTheme', theme, successcallback, errorcallback);
            var themeList = $KG["themes"];
            var initialThemeListLength = themeList.length;
            var finalThemeListLength = themeList.length;
            try {
                for(var i = 0; i < themeList.length; i++) {
                    if(themeList[i] == theme)
                        themeList.splice(i, 1);
                }
                $KG["themes"] = themeList;
                if($KG["theme"] == theme) {
                    module.setcurrenttheme("default", successcallback, errorcallback);
                    $KU.logExecutingFinished('voltmx.theme.deleteTheme VIA if ($KG["theme"] == theme) is true');
                    return;
                }
                finalThemeListLength = themeList.length;
                $KU.logExecutingFinished('voltmx.theme.deleteTheme VIA end of the function');
                if(initialThemeListLength - 1 == finalThemeListLength)
                    successcallback();
                else
                    errorcallback();
            } catch(e) {
                $KU.logErrorMessage('Error' + e);
                errorcallback();
            }
        },

        isthemepresent: function(theme) {
            $KU.logExecuting('voltmx.theme.isThemePresent');
            $KU.logExecutingWithParams('voltmx.theme.isThemePresent', theme);
            $KU.logExecutingFinished('voltmx.theme.isThemePresent');
            return $KU.inArray($KG["themes"], theme, true);
        },

        createtheme: function(url, themeIdentifer, onsuccesscallback, onerrorcallback) {
            
            $KU.logExecuting('voltmx.theme.createTheme');
            $KU.logExecutingWithParams('voltmx.theme.createTheme', url, themeIdentifer, onsuccesscallback, onerrorcallback);
            if(($KU.inArray($KG["themes"], themeIdentifer, true))) {
                onsuccesscallback();
                $KU.logExecutingFinished('voltmx.theme.createTheme VIA if ($KU.inArray($KG["themes"], themeIdentifer, true)) is true');
                return;
            }
            try {
                var req = new XMLHttpRequest();
                var cssFile = url;
                req.open("GET", cssFile, true);
                req.timeout = 60000;
                var headTag = document.getElementsByTagName("head");
                $KG[themeIdentifer + 'remoteurl'] = url;

                req.onreadystatechange = function() {
                    if(this.readyState == 4) {
                        if(this.status == 200) {
                            $KG["themes"].push(themeIdentifer);
                            onsuccesscallback();
                            req = null;
                        } else {
                            onerrorcallback();
                        }

                    }
                };
                req.ontimeout = function() {
                    onerrorcallback();
                };
                req.send(null);
                $KU.logExecutingFinished('voltmx.theme.createTheme VIA try block');
            } catch(e) {
                $KU.logErrorMessage('Error ' + e);
                onerrorcallback();
            }
        },

        allthemes: function() {
            return $KG["themes"];
        },

        getcurrentthemedata: function() {
            $KU.logExecuting('voltmx.theme.getCurrentThemeData');
            $KU.logExecutingWithParams('voltmx.theme.getCurrentThemeData');
            $KU.logExecutingFinished('voltmx.theme.getCurrentThemeData');
            return true;
        },

        getcurrenttheme: function() {
            $KU.logExecuting('voltmx.theme.getCurrentTheme');
            $KU.logExecutingWithParams('voltmx.theme.getCurrentTheme');
            $KU.logExecutingFinished('voltmx.theme.getCurrentTheme');
            return $KG["theme"];
        },

        packagedthemes: function(list) {
            var themeArray = ['default'];
            if(IndexJL == 1) themeArray.push(null);
            for(var i = IndexJL; i < (list.length); i++) {
                themeArray.push(list[i]);
            }
            $KG["themes"] = themeArray;
            $KG["theme"] = "default";
        }
    };


    return module;
}());
