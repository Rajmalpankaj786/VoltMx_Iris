
(function () {
    var $K = voltmx.$kwebfw$;
    var widget_getWidgetProperty = function(widgetPath, propertyName) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget,
            node = null, widgetModel = null;

        $KU.log({api:'voltmx.automation.widget.getWidgetProperty', enter:true});

        if(arguments.length !== 2) {
            $KAUtils.throwExceptionInsufficientArguments();
        }

        //$KU.logExecutingWithParams('voltmx.automation.widget.getWidgetProperty', widgetPath, propertyName);
        if(!$KU.is(widgetPath, "array")  || typeof propertyName !== 'string') {
            $KAUtils.throwExceptionInvalidArgumentType();
        }

        widgetModel = $KAUtils.getWidgetModel(widgetPath);
        if(!widgetModel) {
            $KAUtils.throwExceptionWidgetPathNotFound();
        }
        $KU.log({api:'voltmx.automation.widget.getWidgetProperty', exit:true});

        return widgetModel[propertyName];
    };

    var widget_getProperty = function(widgetPath, propertyName) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget,
            node = null, widgetModel = null;

        $KU.log({api:'voltmx.automation.widget.getProperty', enter:true});
        if(arguments.length !== 2) {
            $KAUtils.throwExceptionInsufficientArguments();
        }

       //$KU.logExecutingWithParams('voltmx.automation.widget.getProperty', widgetPath, propertyName);
        if(!$KU.is(widgetPath, "array") || typeof propertyName !== 'string') {
            $KAUtils.throwExceptionInvalidArgumentType();
        }

        widgetModel = $KAUtils.getWidgetModel(widgetPath);
        if(!widgetModel) {
            $KAUtils.throwExceptionWidgetPathNotFound();
        }

        $KU.log({api:'voltmx.automation.widget.getProperty', exit:true});
        return widgetModel[propertyName];
    };

    var widget_touch = function(widgetPath, startPoint, movePoint, endPoint, options) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KD = $K.dom,
            node = null, widgetModel = null, i, points = {};

        if(arguments.length !== 4 && arguments.length !== 5) {
            $KAUtils.throwExceptionInsufficientArguments();
        }

        if(!$KU.is(widgetPath, "array")
        || (startPoint && (!$KU.is(startPoint, "array")  || startPoint.length !== 2))
        || (movePoint && (!$KU.is(movePoint, "array") || movePoint.length === 0))
        || (endPoint && (!$KU.is(endPoint, "array") || endPoint.length !== 2))
        || (options && (!$KU.is(options, "object")))) {
            $KAUtils.throwExceptionInvalidArgumentType();
        }

        widgetModel = $KAUtils.getWidgetModel(widgetPath);;
        if(!widgetModel) {
            $KAUtils.throwExceptionWidgetPathNotFound();
        }

        node = widgetModel._kwebfw_.view;

        if(!options) {
            options = points;
        }

        if(startPoint && widgetModel.onTouchStart) {
            options.clientX = startPoint[0];
            options.clientY = startPoint[1];

            $KAUtils.fire(node, 'mousedown', options);

        } else {
            // Dispatching mousedown by default for touchend to be available.
            $KAUtils.fire(node, 'mousedown', {});
        }

        if(movePoint && widgetModel.onTouchMove) {
            for(var i = 0; i < movePoint.length; i++) {
                var point = movePoint[i];
                options.clientX = point[0];
                options.clientY = point[1];

                $KAUtils.fire(node, 'mousemove', options);

            }
        }

        if(endPoint && widgetModel.onTouchEnd) {
            options.clientX = endPoint[0];
            options.clientY = endPoint[1];

            $KAUtils.fire(node, 'mouseup', options);
        } else {
            // Dispatching mouseup by default for reseting the focus skin.
            $KAUtils.fire(node, 'mouseup', {});
        }
    };

    var widget_scroll = function() {
        if(arguments.length == 2 || arguments.length == 4) {
            if(arguments.length == 4) {
                _scrollByPoints(arguments[0], arguments[1], arguments[2], arguments[3]);
            } else {
                _scrollByDirection(arguments[0], arguments[1]);
            }
        } else {
            $KAUtils.throwExceptionInsufficientArguments();
        }
    };

    var _scrollByPoints = function(widgetPath, startPoint, movePoint, endPoint)  {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget,
            node = null, widgetModel = null, i, point;

        if(!$KU.is(widgetPath, "array")
            || (startPoint && (!$KU.is(startPoint, "array") || startPoint.length !== 2))
            || (movePoint && (!$KU.is(movePoint, "array") || movePoint.length === 0))
            || (endPoint && (!$KU.is(endPoint, "array") || endPoint.length !== 2))) {
                $KAUtils.throwExceptionInvalidArgumentType();
        }

        widgetModel = $KAUtils.getWidgetModel(widgetPath);
        if(!widgetModel) {
            $KAUtils.throwExceptionWidgetPathNotFound();
        }

        node = widgetModel._kwebfw_.view;
        if(startPoint) {
            node.scrollTo(startPoint[0], startPoint[1]);
        }

        if(movePoint) {
            for(i = 0; i < movePoint.length; i++) {
                point = movePoint[i];
                node.scrollTo(point[0], point[1]);
            }
        }

        if(endPoint) {
            node.scrollTo(endPoint[0], endPoint[1]);
        }
    };


    var _scrollByDirection = function(widgetPath, direction)  {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget,
            node = null, widgetModel = null, movement =100, sLeft, sTop;

        if(!$KU.is(widgetPath, "array") || typeof direction !== 'string') {
            $KAUtils.throwExceptionInvalidArgumentType();
        }

        widgetModel = $KAUtils.getWidgetModel(widgetPath);
        if(!widgetModel) {
            $KAUtils.throwExceptionWidgetPathNotFound();
        }

        node = widgetModel._kwebfw_.view;
        sLeft = node.scrollLeft;
        sTop = node.scrollTop;
        movement = 100; //default value is 100dp inherited from native android.

        if(direction == voltmx.automation.scrollDirection.Bottom) {
            node.scrollTop = sTop + movement;
        } else if(direction == voltmx.automation.scrollDirection.Top) {
            node.scrollTop = sTop - movement;
        } else if(direction == voltmx.automation.scrollDirection.Right) {
            node.scrollLeft = sLeft + movement;
        } else if(direction == voltmx.automation.scrollDirection.Left) {
            node.scrollLeft = sLeft - movement;
        }
    };


    var widget_canScroll = function(widgetPath, direction)  {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget,
            node = null, widgetModel = null, sTop, sLeft, isScroll = true;

      if(arguments.length !== 2) {
            $KAUtils.throwExceptionInsufficientArguments();
        }

        if(!$KU.is(widgetPath, "array") || typeof direction !== 'string') {
            $KAUtils.throwExceptionInvalidArgumentType();
        }

        widgetModel = $KAUtils.getWidgetModel(widgetPath);
        if(!widgetModel) {
            $KAUtils.throwExceptionWidgetPathNotFound();
        }

        node = widgetModel._kwebfw_.view;
        sTop = node.scrollTop;
        sLeft = node.scrollLeft;

        if(direction == voltmx.automation.scrollDirection.Bottom) {
            isScroll = node.scrollHeight > (node.clientHeight + node.scrollTop) ? true : false;
        } else if(direction == voltmx.automation.scrollDirection.Top) {
            isScroll = node.scrollTop > 0 ? true : false;
        } else if(direction == voltmx.automation.scrollDirection.Right) {
            isScroll = node.scrollWidth > (node.clientWidth + node.scrollLeft) ? true : false;
        } else if(direction == voltmx.automation.scrollDirection.Left) {
            isScroll = node.scrollLeft > 0 ? true : false;
        }

        return isScroll;
    };

    //All gesture API's in desktop are not supported
    var gesture_tap = function()  {

    };

    var gesture_swipe = function()  {

    };

    var gesture_longpress = function()  {

    };

    var gesture_rightTap = function() {

    };

    var gesture_pan = function() {

    };

    var gesture_rotation = function() {

    };

    var gesture_pinch = function() {

    };

    var playback_wait = function(delaytime)  {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget;
        $KU.log({api:'voltmx.automation.playback.wait', enter:true});
        if(arguments.length !== 1) {
            $KAUtils.throwExceptionInsufficientArguments();
        }

        //$KU.logExecutingWithParams('voltmx.automation.playback.wait', delaytime);
        if(typeof delaytime !== 'number') {
            $KAUtils.throwExceptionInvalidArgumentType();
        }

        $KU.log({api:'voltmx.automation.playback.wait', exit:true});

        return new Promise(function(resolve, reject) {
            setTimeout(function() {
                resolve();
            }, delaytime);
        });
    };

    var playback_waitFor = function(widgetPath, timeOut)  {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget,
            node = null, widgetModel;

        $KU.log({api:'voltmx.automation.playback.waitFor', enter:true});
        if(arguments.length !== 1 && arguments.length !== 2) { //timeout is optional
            $KAUtils.throwExceptionInsufficientArguments();
        }

        //$KU.logExecutingWithParams('voltmx.automation.playback.waitFor', widgetPath, timeOut);
        if(!$KU.is(widgetPath, "array") || (timeOut && typeof timeOut !== 'number')) {
            $KAUtils.throwExceptionInvalidArgumentType();
        }

        widgetModel = $KAUtils.getWidgetModel(widgetPath);
        if(widgetModel != null) {
            node = widgetModel._kwebfw_.view;
        }

        $KU.log({api:'voltmx.automation.playback.waitFor', exit:true});

        if(node) {
            return new Promise(function(resolve, reject) {
                resolve(true);
            });
        }

        return new Promise(function(resolve, reject) {
            widgetPath = $KAUtils.getAllowedLeafWidgetPath(widgetPath);
            _waitForElement(widgetPath, timeOut, resolve, reject);
        });
    };

    var _waitForElement = function(widgetPath, timeOut, resolve, reject) {
        var waitTime;

        if(typeof timeOut !== 'undefined' && timeOut !== null) {
            waitTime = (timeOut < 1000) ? timeOut : 1000;
            timeOut = (timeOut < 1000) ? timeOut : (timeOut - 1000);
        } else {
            waitTime = 1000;
        }
        setTimeout(function() {
            var node = null, widgetModel;

            widgetModel = $KAUtils.getWidgetModel(widgetPath);
            if(widgetModel != null) {
                node = widgetModel._kwebfw_.view;
            }
            if(node) {
                resolve(true);
            } else {
                if(typeof timeOut !== 'undefined' && timeOut !== null  && timeOut === 0) {
                    resolve(false);
                } else {
                    _waitForElement(widgetPath, timeOut, resolve, reject);
                }
            }
        }, waitTime);
    };

    var playback_waitForAlert = function()  {
        //Not supported.
    };

    var device_rotate = function(orientation)  {
        //Not supported.
    };

    var device_deviceBack = function()  {
        history.go(-1);
        return voltmx.automation.playback.wait(100);
    };

    var _capture = function() {
        //Not supported.
    };

    var _scrollToWidget = function(widgetPath) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget;
        var widgetConfig, scrollToWidget;

        if(arguments.length !== 1) {
            $KAUtils.throwExceptionInsufficientArguments();
        }

        if(!$KU.is(widgetPath, "array")) {
            $KAUtils.throwExceptionInvalidArgumentType();
        }

        widgetPath = $KAUtils.getAllowedLeafWidgetPath(widgetPath);
        scrollToWidget = $KAUtils.getWidgetModel(widgetPath);

        if(!scrollToWidget) {
            $KAUtils.throwExceptionWidgetPathNotFound();
        }

        $KAUtils.scrollToWidgetRecursively(scrollToWidget);
        return voltmx.automation.playback.wait(100);
    };

    function percentToByte(p) {
        return String.fromCharCode(parseInt(p.slice(1), 16));
    }

    var _captureAsBase64 = function(){
        var $K = voltmx.$kwebfw$, $KD = $K.dom, $KW = $K.widget, $KA = $K.app,
            $KU = $K.utils, parent = $KW.model($KA.currentFormUID), pel = $KD.parent($KW.el(parent, 'node')),
            filereader = new FileReader(), cssscript = '', viewportMain = $KW.el(parent, 'viewport'),
            viewportHeight = viewportMain.scrollHeight, viewportWidth = viewportMain.scrollWidth, i = 0, j = 0,
            data = '', svg = [], tempCSS = null, Script = '', formMain = null, csstext = '';

            tempCSS = Array.from(document.styleSheets).filter(
                (styleSheet) => !styleSheet.href || styleSheet.href.startsWith(window.location.origin)
              );
        if($KU.browser('name') === 'msie' || $KU.browser('name') === 'unknown') {
            return;
        }

        formMain = $KD.first(pel);
        csstext = formMain.style.cssText;
        $KD.setAttr(formMain, 'style', csstext +'height:'+ viewportHeight.toString() + "px !important;" + 'width:' +  viewportWidth.toString() + "px !important;");

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

        data =  '<svg xmlns="http://www.w3.org/2000/svg" width="' + viewportWidth + '" height="' + viewportHeight + '">' +
                '<foreignObject width="100%" height="100%">' +
                '<div xmlns="http://www.w3.org/1999/xhtml" style="font-size:40px" >' +
                '<style>' +
                cssscript +
                '</style>'+
                Script +
                '</div>' +
                '</foreignObject>' +
                '</svg>';

        return 'data:image/svg+xml;base64,'+window.btoa(encodeURIComponent(data).replace(/%[0-9A-F]{2}/g, percentToByte))
    }


    var getParentInfo = function() {
        var result = {};
        result.appName = _voltmx.automation.params.parentApp;
        result.windowRef = window.opener;
        if(_voltmx.automation.params) {
            result.queryParams = _voltmx.automation.params;
        } else {
            result.queryParams = null;
        }
        _voltmx.automation.parentApp = {"appName" : result.AppName, "windowRef" : result.windowRef};
        return result;
    }

    var launchApp = function(config) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils,appInfo = null, appURL = "";

        $KU.log({api:'voltmx.automation.launchApp', enter:true});
        if(config === null || config === undefined || JSON.stringify(config) === JSON.stringify({}) || !config.appName) {
            $KAUtils.throwExceptionInsufficientArguments();
        }

        if(!_voltmx.automation.IntegrationTests[config.appName]) {
            $KAUtils.throwExceptionInvalidAppName();
        }

        appInfo = _voltmx.automation.IntegrationTests[config.appName];
        if(config.queryParams && JSON.stringify(config.queryParams) !== JSON.stringify({})) {
            appInfo.queryParams = config.queryParams;
        }

        appURL = constructURLWithParams(appInfo);
        if(appURL === null) {
            return null;
        }
        $KU.log('Launched URL : ' + appURL);

        $KU.log({api:'voltmx.automation.launchApp', exit:true});
        return window.open(appURL);
    }

    var constructURLWithParams = function(appInfo) {
        var url = "";

        if(appInfo.URL) {
            url = url + appInfo.URL;

            if(!url.endsWith('/')) {
                url = url + '/';
            }
        } else {
            return null;
        }

        url = url + "?parentApp=" + appConfig.appId;

        if(appInfo.protocol && appInfo.ScriptURL) {
            url = url + '&protocol=' + appInfo.protocol + '&testurl=' + appInfo.ScriptURL;
        }

        if(appInfo.queryParams) {
            for(var key in appInfo.queryParams) {
                if(appInfo.queryParams.hasOwnProperty(key)) {
                    url = url + '&' + key+ '=' + appInfo.queryParams[key];
                }
            }
        }

        return url;
    }

    var _waitForEvent = function(options) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils,maxWaitTime = null;

        $KU.log({api:'voltmx.automation.waitForEvent', enter:true});
        if(options.maxWait && typeof options.maxWait === 'number') {
            maxWaitTime = options.maxWait;
        }

        _voltmx.automation.eventDetails.pauseTest = true;
        _voltmx.automation.eventDetails.eventName = options.eventName;

        $KU.log({api:'voltmx.automation.waitForEvent', exit:true});
        return new Promise(function(resolve, reject) {
                  _waitForResume(maxWaitTime, resolve, reject);
              });
    }

    var _waitForResume = function(timeOut, resolve, reject) {
        var waitTime;

        if(typeof timeOut !== 'undefined' && timeOut !== null) {
            waitTime = (timeOut < 1000) ? timeOut : 1000;
            timeOut = (timeOut < 1000) ? timeOut : (timeOut - 1000);
        } else {
            waitTime = 1000;
        }

        setTimeout(function() {
            if(_voltmx.automation.eventDetails.pauseTest){
                if(typeof timeOut !== 'undefined' && timeOut !== null  && timeOut === 0) {
                    resolve({"eventReceived" : false});
                } else {
                    _waitForResume(timeOut, resolve, reject);
                }
            } else {
                if(_voltmx.automation.eventDetails.data) {
                    resolve({"eventReceived" : true, "data" : _voltmx.automation.eventDetails.data});
                } else {
                    resolve({"eventReceived" : true});
                }
            }
        }, waitTime);
    }

    var _sendEvent = function(targetDetails) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, targetWindow = null, appInfo = null;

        $KU.log({api:'voltmx.automation.sendEvent', enter:true});
        if(targetDetails.windowRef) {
            targetWindow = targetDetails.windowRef;
        } else {
            return false;
        }
        if(!_voltmx.automation.IntegrationTests[targetDetails.appName] || !targetDetails.eventName) {
            return false;
        }

        appInfo = _voltmx.automation.IntegrationTests[targetDetails.appName];

        targetWindow.postMessage({"mode":"CAT", "event" : targetDetails.eventName, "data" : targetDetails.data}, appInfo.URL);
        $KU.log({api:'voltmx.automation.sendEvent', exit:true});
        return true;
    }

    var _sendEventToParent = function(targetDetails) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, targetWindow = null, parentAppURL = "", parentApp = _voltmx.automation.parentApp;

        $KU.log({api:'voltmx.automation.sendEventToParent', enter:true});
        if(parentApp.windowRef) {
            targetWindow = parentApp.windowRef;
        } else {
            return false;
        }
        if(!targetDetails.eventName) {
            return false;
        }

        parentAppURL = _voltmx.automation.IntegrationTests[parentApp.appName]["URL"];

        targetWindow.postMessage({"mode":"CAT", "event" : targetDetails.eventName, "data" : targetDetails.data}, parentAppURL);
        $KU.log({api:'voltmx.automation.sendEventToParent', exit:true});
        return true;
    }

    /**
     * API call from platform
     * Returns a list of widget paths matching the given criteria
     * @param widgetPath Path of the target widget (container) as aray of strings
     * @param filters Array of objects defining the filters/criteria to be satisfied
     * @param widgetFilters Array of widget constants defining on which the filters can apply.
     */
    var _getWidgetsByFilter = function(widgetPath, filters, searchableWidgets) {
        var widgetModel = null, widgetsList=[], validWidgetsList=[],
        $K = voltmx.$kwebfw$, $KD = $K.dom, $KW = $K.widget, $KA = $K.app, $KU = $K.utils;

        if(!searchableWidgets)
            searchableWidgets=[];

        if(!$KU.is(widgetPath, "array") || !$KU.is(filters, "array") || !$KU.is(searchableWidgets, "array")) {
            $KAUtils.throwExceptionInvalidArgumentType();
        }
        widgetModel = $KAUtils.getWidgetModel(widgetPath);

        if(!widgetModel) {
            $KAUtils.throwExceptionWidgetPathNotFound();
        }

        if (["Form", "FlexContainer", "FlexScrollContainer"].indexOf($KAUtils.getModelType(widgetModel) >= 0)) {
            widgetsList = _getWidgetsRecursively(widgetModel,searchableWidgets, filters);
            if(widgetsList.length > 0 && widgetsList[0] === widgetModel)
                widgetsList.shift();
        }

        return widgetsList;
    }
    /**
     * Returns a list of widget models inside the given container widget (recursively)
     * @param parentWidget Parent Widget model for which the children are required
     */
    var _getWidgetsRecursively = function (parentWidget,searchableWidgets, filters) {
        var widgetsList = [], widgetPath = "", validWidget = false, widgets = null;

        if(searchableWidgets.length>0) {
            if(searchableWidgets.includes($KAUtils.getModelType(parentWidget)) && _checkCriteria(parentWidget, filters))
                validWidget = true;
        }
        else if(_checkCriteria(parentWidget, filters)){
            validWidget = true;
        }

        if(validWidget) {
            widgetPath = _getWidgetPath(parentWidget);
            widgetsList.push(widgetPath);
        }

        if (typeof parentWidget.widgets === 'function')
            widgets = parentWidget.widgets();

        if (widgets && widgets.length > 0) {
            for (var i = 0; i < widgets.length; i++) {
                widgetsList = widgetsList.concat(_getWidgetsRecursively(widgets[i],searchableWidgets, filters));
            }
        }
        return widgetsList;
    }
    /**
     * Returns a list of widget models matching the given criteria
     * @param widgetsList List of the widget models which need to be filtered
     * @param filters Array of objects defining the filters/criteria to be satisfied
     */
    var _checkCriteria = function(widget,filters) {
        var filter = null, criteria = 0, caseSensitive=true, validWidget = false,
        passed= false, propertyName = "", actualValue = "", valueToCompare = "";

        for(var i = 0; i < filters.length; i++) {
            filter = filters[i];
            passed = false;

            if(!(filter.hasOwnProperty('property') && filter.hasOwnProperty('value')))
                continue;

            if(filter.hasOwnProperty('searchCriteria') && typeof criteria === 'number')
                criteria = filter['searchCriteria'];

            if(filter.hasOwnProperty('caseSensitive') && typeof filter['caseSensitive'] === 'boolean')
                caseSensitive = filter['caseSensitive']

            propertyName = filter['property'];
            actualValue = widget[propertyName];

            valueToCompare = filter['value'];

            if(actualValue === undefined)
                continue;

            switch (criteria) {
                case 0: {//voltmx.automation.SEARCH_CRITERIA_EQUAL
                    if(typeof valueToCompare === 'string' && typeof actualValue === 'string' && !caseSensitive )
                    {
                        if(valueToCompare.toLowerCase() === actualValue.toLowerCase())
                            passed = true;
                    }
                    else if (valueToCompare === actualValue) {
                        passed = true;
                    }
                    break;
                }
                case 1: {//voltmx.automation.SEARCH_CRITERIA_CONTAINS
                    if(typeof valueToCompare === 'string' && typeof actualValue === 'string' )
                    {
                        if(caseSenitive) {
                            if(actualValue.includes(valueToCompare)) passed = true;
                        }
                        else if(actualValue.toLowerCase().includes(valueToCompare.toLowerCase()))
                        {
                            passed = true;
                        }
                    }
                    break;
                }
                case 2: {//voltmx.automation.SEARCH_CRITERIA_STARTSWITH
                    if(typeof valueToCompare === 'string' && typeof actualValue === 'string' )
                    {
                        if(caseSensitive){
                            if(actualValue.startsWith(valueToCompare)) passed = true;
                        }
                        else if(actualValue.toLowerCase().startsWith(valueToCompare.toLowerCase()))
                        {
                            passed = true;
                        }

                    }
                    break;
                }
                case 3: {//voltmx.automation.SEARCH_CRITERIA_ENDSWITH
                    if(typeof valueToCompare === 'string' && typeof actualValue === 'string' )
                    {
                        if(caseSensitive){
                            if(actualValue.endsWith(valueToCompare)) passed = true;
                        }
                        else if(actualValue.toLowerCase().endsWith(valueToCompare.toLowerCase())) {
                            passed = true;
                        }

                    }
                    break;
                }
                case 4: {//voltmx.automation.SEARCH_CRITERIA_GREATER
                    if(typeof valueToCompare == 'number' && typeof actualValue == 'number') {
                        if( actualValue > valueToCompare ) {
                            passed = true;
                        }
                    }
                    break;
                }
                case 5: {//voltmx.automation.SEARCH_CRITERIA_GREATER_EQUAL
                    if(typeof valueToCompare == 'number' && typeof actualValue == 'number') {
                        if( actualValue >= valueToCompare ) {
                            passed = true;
                        }
                    }
                    break;
                }
                case 6: {//voltmx.automation.SEARCH_CRITERIA_LESSER
                    if(typeof valueToCompare == 'number' && typeof actualValue == 'number') {
                        if( actualValue < valueToCompare ) {
                            passed = true;
                        }
                    }
                    break;
                }
                case 7: {//voltmx.automation.SEARCH_CRITERIA_LESSER_EQUAL
                    if(typeof valueToCompare == 'number' && typeof actualValue == 'number') {
                        if( actualValue <= valueToCompare ) {
                            passed = true;
                        }
                    }
                    break;
                }
            }
            if(passed){
                validWidget = true;
            } else {
                return false;
            }
        };
        return validWidget;
    }

    /**
     * Returns a list of widget models matching the given criteria
     * @param widget Widget Model for which the path is required
     */
    var _getWidgetPath = function(widgetModel) {
        var id = widgetModel._kwebfw_.wap;
        return id.split('_');
    }

    var _getCurrentForm = function() {
        var $K = voltmx.$kwebfw$, $KW = $K.widget, $KA = $K.app,
            cf = $KW.model($KA.currentFormUID);

        return (cf ? cf.id : '');
    }

    var _isLoadingScreenVisible = function() {
        var $K = voltmx.$kwebfw$, $KD = $K.dom,
            $KG = $K.globals;

        if($KD.hasAttr($KG.appBlocker, 'hidden')) {
            return false;
        } else {
            return true;
        }
    }

    var _waitForLoadingScreenToDismiss = function(timeout) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils;

        $KU.log({api:'voltmx.automation.waitForLoadingScreenToDismiss', enter:true});
        if(timeout && typeof timeout !== 'number') {
            $KAUtils.throwExceptionInvalidArgumentType();
        }

        $KU.log({api:'voltmx.automation.waitForLoadingScreenToDismiss', exit:true});
        return new Promise(function(resolve, reject) {
                  _waitOnLoadingScreen(timeout, resolve, reject);
              });
    }

    var _waitOnLoadingScreen = function(timeOut, resolve, reject) {
        var waitTime;

        if(typeof timeOut !== 'undefined' && timeOut !== null) {
            waitTime = (timeOut < 1000) ? timeOut : 1000;
            timeOut = (timeOut < 1000) ? timeOut : (timeOut - 1000);
        } else {
            waitTime = 1000;
        }

        setTimeout(function() {
            if(_isLoadingScreenVisible()){
                if(typeof timeOut !== 'undefined' && timeOut !== null  && timeOut === 0) {
                    resolve(false);
                } else {
                    _waitOnLoadingScreen(timeOut, resolve, reject);
                }
            } else {
                resolve(true);
            }
        }, waitTime);
    }

    var getParentInfo = function() {
        var result = {};
        result.appName = _voltmx.automation.params.parentApp;
        result.windowRef = window.opener;
        _voltmx.automation.parentApp = {"appName" : result.appName, "windowRef" : result.windowRef};
        return result;
    }
    var launchApp = function(config) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils,appInfo = null, appURL = "";

        $KU.log({api:'voltmx.automation.launchApp', enter:true});
        if(config === null || config === undefined || JSON.stringify(config) === JSON.stringify({}) || !config.appName) {
            $KAUtils.throwExceptionInsufficientArguments();
        }

        if(!_voltmx.automation.IntegrationTests[config.appName]) {
            $KAUtils.throwExceptionInvalidAppName();
        }

        appInfo = _voltmx.automation.IntegrationTests[config.appName];
        if(config.queryParams && config.queryParams.testPlan && typeof config.queryParams.testPlan === 'string') {
            appInfo.testPlan = config.queryParams.testPlan;
        }

        appURL = constructURLWithParams(appInfo);
        if(appURL === null) {
            return null;
        }
        $KU.log('Launched URL : ' + appURL);

        $KU.log({api:'voltmx.automation.launchApp', exit:true});
        return window.open(appURL);
    }

    var constructURLWithParams = function(appInfo) {
        var url = "";

        if(appInfo.URL) {
            url = url + appInfo.URL;

            if(!url.endsWith('/')) {
                url = url + '/';
            }
        } else {
            return null;
        }

        url = url + "?parentApp=" + appConfig.appId;

        if(appInfo.protocol && appInfo.ScriptURL) {
            url = url + '&protocol=' + appInfo.protocol + '&testurl=' + appInfo.ScriptURL;
        }

        if(appInfo.testPlan) {
            url = url + '&testPlan=' + appInfo.testPlan;
        }

        return url;
    }

    var _waitForEvent = function(options) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils,maxWaitTime = null;

        $KU.log({api:'voltmx.automation.waitForEvent', enter:true});
        if(options.maxWait && typeof options.maxWait === 'number') {
            maxWaitTime = options.maxWait;
        }

        _voltmx.automation.eventDetails.pauseTest = true;
        _voltmx.automation.eventDetails.eventName = options.eventName;

        $KU.log({api:'voltmx.automation.waitForEvent', exit:true});
        return new Promise(function(resolve, reject) {
                  _waitForResume(maxWaitTime, resolve, reject);
              });
    }

    var _waitForResume = function(timeOut, resolve, reject) {
        var waitTime;

        if(typeof timeOut !== 'undefined' && timeOut !== null) {
            waitTime = (timeOut < 1000) ? timeOut : 1000;
            timeOut = (timeOut < 1000) ? timeOut : (timeOut - 1000);
        } else {
            waitTime = 1000;
        }

        setTimeout(function() {
            if(_voltmx.automation.eventDetails.pauseTest){
                if(typeof timeOut !== 'undefined' && timeOut !== null  && timeOut === 0) {
                    resolve({"eventReceived" : false});
                } else {
                    _waitForResume(timeOut, resolve, reject);
                }
            } else {
                if(_voltmx.automation.eventDetails.data) {
                    resolve({"eventReceived" : true, "data" : _voltmx.automation.eventDetails.data});
                } else {
                    resolve({"eventReceived" : true});
                }
            }
        }, waitTime);
    }

    var _sendEvent = function(targetDetails) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, targetWindow = null, appInfo = null;

        $KU.log({api:'voltmx.automation.sendEvent', enter:true});
        if(targetDetails.windowRef) {
            targetWindow = targetDetails.windowRef;
        } else {
            return false;
        }
        if(!_voltmx.automation.IntegrationTests[targetDetails.appName] || !targetDetails.eventName) {
            return false;
        }

        appInfo = _voltmx.automation.IntegrationTests[targetDetails.appName];

        targetWindow.postMessage({"mode":"CAT", "event" : targetDetails.eventName, "data" : targetDetails.data}, appInfo.URL);
        $KU.log({api:'voltmx.automation.sendEvent', exit:true});
        return true;
    }

    var _sendEventToParent = function(targetDetails) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, targetWindow = null, parentAppURL = "", parentApp = _voltmx.automation.parentApp;

        $KU.log({api:'voltmx.automation.sendEventToParent', enter:true});
        if(parentApp.windowRef) {
            targetWindow = parentApp.windowRef;
        } else {
            return false;
        }
        if(!targetDetails.eventName) {
            return false;
        }

        parentAppURL = _voltmx.automation.IntegrationTests[parentApp.appName]["URL"];

        targetWindow.postMessage({"mode":"CAT", "event" : targetDetails.eventName, "data" : targetDetails.data}, parentAppURL);
        $KU.log({api:'voltmx.automation.sendEventToParent', exit:true});
        return true;
    }

    var _isLoadingScreenVisible = function() {
        var $K = voltmx.$kwebfw$, $KD = $K.dom,
            $KG = $K.globals;
        
        if($KD.hasAttr($KG.appBlocker, 'hidden')) {
            return false;
        } else {
            return true;
        }
    }

    var _waitForLoadingScreenToDismiss = function(timeout) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils;

        $KU.log({api:'voltmx.automation.waitForLoadingScreenToDismiss', enter:true});
        if(timeout && typeof timeout !== 'number') {
            $KAUtils.throwExceptionInvalidArgumentType();
        }

        $KU.log({api:'voltmx.automation.waitForLoadingScreenToDismiss', exit:true});
        return new Promise(function(resolve, reject) {
                  _waitOnLoadingScreen(timeout, resolve, reject);
              });
    }

    var _waitOnLoadingScreen = function(timeOut, resolve, reject) {
        var waitTime;

        if(typeof timeOut !== 'undefined' && timeOut !== null) {
            waitTime = (timeOut < 1000) ? timeOut : 1000;
            timeOut = (timeOut < 1000) ? timeOut : (timeOut - 1000);
        } else {
            waitTime = 1000;
        }

        setTimeout(function() {
            if(_isLoadingScreenVisible()){
                if(typeof timeOut !== 'undefined' && timeOut !== null  && timeOut === 0) {
                    resolve(false);
                } else {
                    _waitOnLoadingScreen(timeOut, resolve, reject);
                }
            } else {
                resolve(true);
            }
        }, waitTime);
    }
    
    var _connectToHost = function() {
        var karConfig = _voltmx.automation;

        if(karConfig.params && karConfig.params.wsport) {
            var socket = new WebSocket("ws://localhost:"+ karConfig.params.wsport);
            socket.onopen = _onOpenListener;
            socket.onmessage = _messageListner;
            socket.onclose = _onCloseListener;
            socket.onerror = _onErrorListner;

            if(!karConfig.server) {
                karConfig.server = {
                                        "wSocket": socket, 
                                        "pauseTest" : false,
                                        "connectionStatus": false
                                    };
            } else {
                $KAUtils.throwExceptionMultipleConnections();
            }
        }
        return new Promise(function(resolve, reject) {
            _waitForConnection(2000, resolve, reject);
              });
    }


    var _waitForConnection = function(timeOut, resolve, reject) {
        var waitTime, karConfig = _voltmx.automation;

        if(typeof timeOut !== 'undefined' && timeOut !== null) {
            waitTime = (timeOut < 1000) ? timeOut : 1000;
            timeOut = (timeOut < 1000) ? timeOut : (timeOut - 1000);
        } else {
            waitTime = 1000;
        }

        setTimeout(function() {
            if(karConfig.server.connectionStatus){
                if(typeof timeOut !== 'undefined' && timeOut !== null  && timeOut === 0) {
                    resolve(false);
                } else {
                    _waitForMessageResume(timeOut, resolve, reject);
                }
            } else {
                resolve(true);
            }
        }, waitTime);
    };

    var _onOpenListener = function(event) {
        var karConfig = _voltmx.automation.server, wSocket = karConfig.wSocket;
        wSocket.id = appConfig.appId;
        wSocket.send(JSON.stringify({
                        "eventName":"registerClientID",
                        "clientID" : appConfig.appId, 
                        "to":"Server"
                    }));
        karConfig.connectionStatus = true;
    };

    var _messageListner = function(messageEvent) {
        var karConfig = _voltmx.automation.server,message = JSON.parse(messageEvent.data);
        
        if(message && message.eventName && karConfig.eventName === message.eventName){
            karConfig.pauseTest = false;
            karConfig.data = message;
        }
    };

    var _onCloseListener = function(message) {
        console.log('Socket connection closed : ' + message);
    };
    
    var _onErrorListner = function(error) {
        console.log('Socket connection closed' + error);
    };

    var _sendMessage = function(options) {
        var karConfig = null, wSocket = null;

        if(_voltmx.automation.server) {
            karConfig = _voltmx.automation.server;
            wSocket = karConfig.wSocket;
        } else {
            $KAUtils.throwExceptionNoConnectionAvailable();
        }
        if(!options && !options.eventName && typeof options.eventName !== 'string'){
            $KAUtils.throwExceptionInvalidEventTypeOrOptions();
        }
        if(options && !options.to) {
            options.to = "afwsclient";
        }

        wSocket.send(JSON.stringify(options));
    }

    var _waitForMessage = function(options) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils,maxWaitTime = null, karConfig = _voltmx.automation;

        $KU.log({api:'voltmx.automation.waitForMessage', enter:true});
        if(options.maxWait && typeof options.maxWait === 'number') {
            maxWaitTime = options.maxWait;
        }
        if(!karConfig.server) {
            $KAUtils.throwExceptionNoConnectionAvailable();
        }

        karConfig.server.pauseTest = true;
        karConfig.server.eventName = options.eventName;

        $KU.log({api:'voltmx.automation.waitForMessage', exit:true});
        return new Promise(function(resolve, reject) {
            _waitForMessageResume(maxWaitTime, resolve, reject);
              });
    }

    var _waitForMessageResume = function(timeOut, resolve, reject) {
        var waitTime, karConfig = _voltmx.automation;

        if(typeof timeOut !== 'undefined' && timeOut !== null) {
            waitTime = (timeOut < 1000) ? timeOut : 1000;
            timeOut = (timeOut < 1000) ? timeOut : (timeOut - 1000);
        } else {
            waitTime = 1000;
        }

        setTimeout(function() {
            if(karConfig.server.pauseTest){
                if(typeof timeOut !== 'undefined' && timeOut !== null  && timeOut === 0) {
                    resolve({"eventReceived" : false});
                } else {
                    _waitForMessageResume(timeOut, resolve, reject);
                }
            } else {
                if(karConfig.server.data) {
                    resolve({"eventReceived" : true, "data" : karConfig.server.data});
                } else {
                    resolve({"eventReceived" : true});
                }
            }
        }, waitTime);
    }

    var _connectToHost = function() {
        var karConfig = _voltmx.automation;

        if(karConfig.params && karConfig.params.wsport) {
            var socket = new WebSocket("ws://localhost:"+ karConfig.params.wsport);
            socket.onopen = _onOpenListener;
            socket.onmessage = _messageListner;

            if(!karConfig.server) {
                karConfig.server = {
                                        "wSocket": socket, 
                                        "pauseTest" : false,
                                        "connectionStatus": false
                                    };
            } else {
                $KAUtils.throwExceptionMultipleConnections();
            }
        }
        return new Promise(function(resolve, reject) {
            _waitForConnection(2000, resolve, reject);
              });
    }


    var _waitForConnection = function(timeOut, resolve, reject) {
        var waitTime, karConfig = _voltmx.automation;

        if(typeof timeOut !== 'undefined' && timeOut !== null) {
            waitTime = (timeOut < 1000) ? timeOut : 1000;
            timeOut = (timeOut < 1000) ? timeOut : (timeOut - 1000);
        } else {
            waitTime = 1000;
        }

        setTimeout(function() {
            if(karConfig.server.connectionStatus){
                if(typeof timeOut !== 'undefined' && timeOut !== null  && timeOut === 0) {
                    resolve(false);
                } else {
                    _waitForConnection(timeOut, resolve, reject);
                }
            } else {
                resolve(true);
            }
        }, waitTime);
    };

    var _onOpenListener = function(event) {
        var karConfig = _voltmx.automation.server, wSocket = karConfig.wSocket;
        wSocket.id = appConfig.appId;
        wSocket.send(JSON.stringify({
                        "eventName":"registerClientID",
                        "clientID" : appConfig.appId, 
                        "to":"Server"
                    }));
        karConfig.connectionStatus = true;
    };

    var _messageListner = function(messageEvent) {
        var karConfig = _voltmx.automation.server,message = JSON.parse(messageEvent.data);
        
        if(message && message.eventName && karConfig.eventName === message.eventName){
            karConfig.pauseTest = false;
            karConfig.data = message;
        }
    }

    var _sendMessage = function(options) {
        var karConfig = null, wSocket = null;

        if(_voltmx.automation.server) {
            karConfig = _voltmx.automation.server;
            wSocket = karConfig.wSocket;
        } else {
            $KAUtils.throwExceptionNoConnectionAvailable();
        }
        if(!options && !options.eventName && typeof options.eventName !== 'string'){
            $KAUtils.throwExceptionInvalidEventTypeOrOptions();
        }
        if(options && !options.to) {
            options.to = "afwsclient";
        }

        wSocket.send(JSON.stringify(options));
    }

    var _waitForMessage = function(options) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils,maxWaitTime = null, karConfig = _voltmx.automation;

        $KU.log({api:'voltmx.automation.waitForMessage', enter:true});
        if(options.maxWait && typeof options.maxWait === 'number') {
            maxWaitTime = options.maxWait;
        }
        if(!karConfig.server) {
            $KAUtils.throwExceptionNoConnectionAvailable();
        }

        karConfig.server.pauseTest = true;
        karConfig.server.eventName = options.eventName;

        $KU.log({api:'voltmx.automation.waitForMessage', exit:true});
        return new Promise(function(resolve, reject) {
            _waitForMessageResume(maxWaitTime, resolve, reject);
              });
    }

    var _waitForMessageResume = function(timeOut, resolve, reject) {
        var waitTime, karConfig = _voltmx.automation;

        if(typeof timeOut !== 'undefined' && timeOut !== null) {
            waitTime = (timeOut < 1000) ? timeOut : 1000;
            timeOut = (timeOut < 1000) ? timeOut : (timeOut - 1000);
        } else {
            waitTime = 1000;
        }

        setTimeout(function() {
            if(karConfig.server.pauseTest){
                if(typeof timeOut !== 'undefined' && timeOut !== null  && timeOut === 0) {
                    resolve({"eventReceived" : false});
                } else {
                    _waitForMessageResume(timeOut, resolve, reject);
                }
            } else {
                if(karConfig.server.data) {
                    resolve({"eventReceived" : true, "data" : karConfig.server.data});
                } else {
                    resolve({"eventReceived" : true});
                }
            }
        }, waitTime);
    }

    var getPageObjects = function (filters) { 
        var $K = voltmx.$kwebfw$, $KU = $K.utils,resultObject = [];

        $KU.log({ api: 'voltmx.automation.getPageObjectModel', enter: true });
        if (arguments.length !== 1 || filters.length <= 0) {
            $KAUtils.throwExceptionInsufficientArguments();
        }

        if (!$KU.is(filters, 'array')) {
            $KAUtils.throwExceptionInvalidArgumentType();
        }
        
        for(var i = 0; i < filters.length; i++) {
            resultObject.push(getPageObject(filters[i]));
        }
        
        $KU.log({ api: 'voltmx.automation.getPageObjectModel', exit: true });
        return resultObject;
    };

    var getPageObject = function(filter){
        var pomObject = _voltmx.automation.__PAGEOBJECTS__,
            keys = ["appName", "type", "id"];

        if(pomObject == null) {
            $KAUtils.throwExceptionNoPageObjectFound();
        }

        if(filter && !filter.hasOwnProperty("type")){
            filter.type = "Forms"
        }

        if(!filter || !filter.hasOwnProperty("appName") || !filter.hasOwnProperty("id")) {
            $KAUtils.throwExceptionInsufficientArguments();
        }

        if(typeof filter.appName !== 'string' || typeof filter.id !== 'string') {
            $KAUtils.throwExceptionInvalidArgumentType();
        }

        keys.forEach(key => {
            if(pomObject != null && pomObject.hasOwnProperty(filter[key])) {
                if(pomObject[filter[key]] !== null || pomObject[filter[key]] !== undefined) {
                pomObject = pomObject[filter[key]];
                } else {
                    pomObject = null;
                }
            }
        });

        return pomObject;
    }

    $K.defVoltmxProp(voltmx.automation, [
        {keey:'widget', value:{}, items:[
            {keey:'getWidgetProperty', value:widget_getWidgetProperty},
            {keey:'getProperty', value:widget_getProperty},
            {keey:'touch', value:widget_touch},
            {keey:'scroll', value:widget_scroll},
            {keey:'canScroll', value:widget_canScroll},
            {keey:'BUTTON', value:'Button'},
            {keey:'CALENDAR', value:'Calendar'},
            {keey:'CHECKBOXGROUP', value:'CheckBoxGroup'},
            {keey:'FLEXCONTAINER', value:'FlexContainer'},
            {keey:'FLEXSCROLLCONTAINER', value:'FlexScrollContainer'},
            {keey:'LABEL', value:'Label'},
            {keey:'LISTBOX', value:'ListBox'},
            {keey:'RADIOBUTTONGROUP', value:'RadioButtonGroup'},
            {keey:'SEGMENTEDUI', value:'Segment'},
            {keey:'SLIDER', value:'Slider'},
            {keey:'SWITCH', value:'Switch'},
            {keey:'TABPANE', value:'TabPane'},
            {keey:'TEXTAREA', value:'TextArea'},
            {keey:'TEXTBOX', value:'TextBox'}
        ]},
        {keey: 'gesture', value: {}, items: [
            {keey:'tap', value: gesture_tap},
            {keey:'swipe', value: gesture_swipe},
            {keey:'longpress', value: gesture_longpress},
            {keey:'rightTap', value: gesture_rightTap},
            {keey:'pan', value: gesture_pan},
            {keey:'rotation', value: gesture_rotation},
            {keey:'pinch', value: gesture_pinch}
        ]},
        {keey: 'playback', value: {}, items: [
            {keey:'wait', value: playback_wait},
            {keey:'waitFor', value: playback_waitFor},
            {keey:'waitForAlert', value: playback_waitForAlert},
            {keey: 'isLoadingScreenVisible', value: _isLoadingScreenVisible},
            {keey: 'waitForLoadingScreenToDismiss', value: _waitForLoadingScreenToDismiss}
        ]},
        {keey: 'device', value: {}, items: [
            {keey:'deviceBack', value: device_deviceBack},
            {keey:'rotate', value: device_rotate}
        ]},
        {keey: 'capture', value: _capture},
        {keey: 'scrollDirection', value: {}, items: [
            {keey:'Top', value: "top"},
            {keey:'Bottom', value: "bottom"},
            {keey:'Left', value: "left"},
            {keey:'Right', value: "right"}
        ]},
        {keey: 'webSocket', value: {}, items: [
            {keey:'connectToHost', value: _connectToHost},
            {keey:'sendMessage', value: _sendMessage},
            {keey:'waitForMessage', value: _waitForMessage}
        ]},
        {keey: 'pageObjectModel', value: {}, items: [
            {keey:'getPageObjects', value: getPageObjects},
            {keey:'TYPE_FORM', value: "Forms"},
            {keey:'TYPE_COMPONENT', value: 'Components'},
            {keey:'TYPE_TEMPLATE', value: 'Templates'}
        ]},
        {keey: 'scrollToWidget', value: _scrollToWidget},
        {keey: 'captureAsBase64', value: _captureAsBase64},
        {keey: 'waitForEvent', value: _waitForEvent},
        {keey: 'sendEvent', value: _sendEvent},
        {keey: 'sendEventToParent', value: _sendEventToParent},
        {keey: 'launchApp', value: launchApp},
        {keey: 'getParentInfo', value: getParentInfo},
        {keey: 'getWidgetsByFilter', value: _getWidgetsByFilter},
        {keey: 'SEARCH_CRITERIA_EQUAL', value: 0},
        {keey: 'SEARCH_CRITERIA_CONTAINS', value: 1},
        {keey: 'SEARCH_CRITERIA_STARTSWITH', value: 2},
        {keey: 'SEARCH_CRITERIA_ENDSWITH', value: 3},
        {keey: 'SEARCH_CRITERIA_GREATER', value: 4},
        {keey: 'SEARCH_CRITERIA_GREATER_EQUAL', value: 5},
        {keey: 'SEARCH_CRITERIA_LESSER', value: 6},
        {keey: 'SEARCH_CRITERIA_LESSER_EQUAL', value: 7},
        {keey: 'getCurrentForm', value: _getCurrentForm}
    ]);

}());
