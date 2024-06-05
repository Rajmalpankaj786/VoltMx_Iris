voltmx.automation.widget = (function() {

    var module = {

        getWidgetProperty: function(widgetPath, propertyName){
            var value;
            $KU.logExecuting('voltmx.automation.widget.getWidgetProperty');
            if(arguments.length !== 2) {
                $KAUtils.throwExceptionInsufficientArguments();
            }

            $KU.logExecutingWithParams('voltmx.automation.widget.getWidgetProperty', widgetPath, propertyName);
            if(!$KU.isArray(widgetPath) || typeof propertyName !== 'string') {
                $KAUtils.throwExceptionInvalidArgumentType();
            }

            var widgetConfig = $KAUtils.getWidgetInstance(widgetPath);
            var widgetModel = widgetConfig.widgetInstance;
            if(!widgetModel) {
                $KAUtils.throwExceptionWidgetPathNotFound();
            }
            $KU.logExecutingFinished('voltmx.automation.widget.getWidgetProperty');
            value = widgetModel[propertyName];
            if(widgetConfig && widgetConfig.containerModel && widgetConfig.containerModel.wType === "Segment") {
                propertyName = $KW.Utils.getSegProperty(propertyName).toLowerCase();
                if(propertyName === "disabled") {
                    value = !widgetModel["enable"]
                }else{
                    value = widgetModel[propertyName];;
                }
            }
            return value;
        },

        getProperty: function(widgetPath, propertyName){
            var value;
            $KU.logExecuting('voltmx.automation.widget.getProperty');
            if(arguments.length !== 2) {
                $KAUtils.throwExceptionInsufficientArguments();
            }

            $KU.logExecutingWithParams('voltmx.automation.widget.getProperty', widgetPath, propertyName);
            if(!$KU.isArray(widgetPath) || typeof propertyName !== 'string') {
                $KAUtils.throwExceptionInvalidArgumentType();
            }

            var widgetConfig = $KAUtils.getWidgetInstance(widgetPath);
            var widgetModel = widgetConfig.widgetInstance;
            if(!widgetModel) {
                $KAUtils.throwExceptionWidgetPathNotFound();
            }
            $KU.logExecutingFinished('voltmx.automation.widget.getProperty');
            value = widgetModel[propertyName];
            if(widgetConfig && widgetConfig.containerModel  && widgetConfig.containerModel.wType === "Segment") {
                propertyName = $KW.Utils.getSegProperty(propertyName).toLowerCase();
                if(propertyName === "disabled") {
                    value = !widgetModel["enable"]
                }else{
                    value = widgetModel[propertyName];;
                }
            }
            return value;
        },

        
        touch: function(widgetPath, startPoint, movePoint, endPoint) {

            if(arguments.length !== 4) {
                $KAUtils.throwExceptionInsufficientArguments();
            }

            if(!$KU.isArray(widgetPath)
            || (startPoint && (!$KU.isArray(startPoint) || startPoint.length !== 2))
            || (movePoint && (!$KU.isArray(movePoint) || movePoint.length === 0))
            || (endPoint && (!$KU.isArray(endPoint) || endPoint.length !== 2))) {
                $KAUtils.throwExceptionInvalidArgumentType();
            }

            var node = null, ontouchstart = null, ontouchmove = null, ontouchend = null;
            var widgetConfig = $KAUtils.getWidgetInstance(widgetPath);
            var widgetModel = widgetConfig.widgetInstance;
            if(!widgetModel) {
                $KAUtils.throwExceptionWidgetPathNotFound();
            }
            var scrollerInstance = widgetConfig.widgetInstance.scrollerInstance;
            node = $KAUtils.getNodeByModel(widgetConfig);

            if(startPoint) {
                if(widgetModel.onTouchStart) {
                    ontouchstart = widgetModel.onTouchStart;
                } else {
                    ontouchstart = widgetModel.ontouchstart;
                }

                ontouchstart && ontouchstart(widgetModel, startPoint[0], startPoint[1]);
            }

            if(movePoint) {
                if(widgetModel.onTouchMove) {
                    ontouchmove = widgetModel.onTouchMove;
                } else {
                    ontouchmove = widgetModel.ontouchmove;
                }

                for(var i = 0; i < movePoint.length; i++) {
                    var point = movePoint[i];
                    ontouchmove && ontouchmove(widgetModel, point[0], point[1]);
                }
            }

            if(endPoint) {
                if(widgetModel.onTouchEnd) {
                    ontouchend = widgetModel.onTouchEnd;
                } else {
                    ontouchend = widgetModel.ontouchend;
                }

                ontouchend && ontouchend(widgetModel, endPoint[0], endPoint[1]);
            }
        },

        
        scroll: function() {
            if(arguments.length == 2 || arguments.length == 4) {
                if(arguments.length == 4) {
                    this.scrollByPoints(arguments[0], arguments[1], arguments[2], arguments[3]);
                } else {
                    this.scrollByDirection(arguments[0], arguments[1]);
                }
            } else {
                $KAUtils.throwExceptionInsufficientArguments();
            }
        },

        scrollByPoints: function(widgetPath, startPoint, movePoint, endPoint) {

            if(!$KU.isArray(widgetPath)
            || (startPoint && (!$KU.isArray(startPoint) || startPoint.length !== 2))
            || (movePoint && (!$KU.isArray(movePoint) || movePoint.length === 0))
            || (endPoint && (!$KU.isArray(endPoint) || endPoint.length !== 2))) {
                $KAUtils.throwExceptionInvalidArgumentType();
            }

            var node = null;
            var widgetConfig = $KAUtils.getWidgetInstance(widgetPath);
            var widgetModel = widgetConfig.widgetInstance;
            if(!widgetModel) {
                $KAUtils.throwExceptionWidgetPathNotFound();
            }

            var scrollerInstance = $KW.Utils.getScrollerInstance(widgetModel);
            node = $KAUtils.getNodeByModel(widgetConfig);
            if(startPoint) {
                node.scrollTo(startPoint[0], startPoint[1]);
            }

            if(movePoint) {
                for(var i = 0; i < movePoint.length; i++) {
                    var point = movePoint[i];
                    node.scrollTo(point[0], point[1]);
                }
            }

            if(endPoint) {
                node.scrollTo(endPoint[0], endPoint[1]);
            }
        },

        scrollByDirection: function(widgetPath, direction) {

            if(!$KU.isArray(widgetPath) || typeof direction !== 'string') {
                $KAUtils.throwExceptionInvalidArgumentType();
            }

            var node = null;
            var widgetConfig = $KAUtils.getWidgetInstance(widgetPath);
            var widgetModel = widgetConfig.widgetInstance;
            if(!widgetModel) {
                $KAUtils.throwExceptionWidgetPathNotFound();
            }
            var scrollerInstance = $KW.Utils.getScrollerInstance(widgetModel);
            node = $KAUtils.getNodeByModel(widgetConfig);
            

            
            var sLeft = node.scrollLeft;
            var sTop = node.scrollTop;

            var movement = 100; 

            if(direction == voltmx.automation.scrollDirection.Bottom) {
                node.scrollTop = sTop + movement;
            } else if(direction == voltmx.automation.scrollDirection.Top) {
                node.scrollTop = sTop - movement;
            } else if(direction == voltmx.automation.scrollDirection.Right) {
                node.scrollLeft = sLeft + movement;
            } else if(direction == voltmx.automation.scrollDirection.Left) {
                node.scrollLeft = sLeft - movement;
            }
        },

        canScroll: function(widgetPath, direction) {

            if(arguments.length !== 2) {
                $KAUtils.throwExceptionInsufficientArguments();
            }

            if(!$KU.isArray(widgetPath) || typeof direction !== 'string') {
                $KAUtils.throwExceptionInvalidArgumentType();
            }

            var node = null;
            var widgetConfig = $KAUtils.getWidgetInstance(widgetPath);
            var widgetModel = widgetConfig.widgetInstance;
            if(!widgetModel) {
                $KAUtils.throwExceptionWidgetPathNotFound();
            }

            node = $KAUtils.getNodeByModel(widgetConfig);
            var sTop = node.scrollTop;
            var sLeft = node.scrollLeft;
            var isScroll = true;

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

        }
    };

    return module;


}());


voltmx.automation.gesture = (function() {

    var module = {};

    module.tap = function(widgetPath, gestureInfo) {
        if(arguments.length !== 2) {
            $KAUtils.throwExceptionInsufficientArguments();
        }

        if(!$KU.isArray(widgetPath) || typeof gestureInfo !== 'object') {
            $KAUtils.throwExceptionInvalidArgumentType();
        }

        var gestureInfoObj = {};
        var widgetConfig = $KAUtils.getWidgetInstance(widgetPath);
        var widgetModel = widgetConfig.widgetInstance;
        if(!widgetModel) {
            $KAUtils.throwExceptionWidgetPathNotFound();
        }

        node = $KAUtils.getNodeByModel(widgetConfig);

        gestureInfoObj = this.getGestureInfoObj(gestureInfo, 1, node);
        var callback = this.getCallbackFunc(widgetModel, gestureInfoObj)
        if(callback) {
            this.executeCallback(widgetModel, callback, gestureInfoObj);
        }
    };

    module.swipe = function(widgetPath, gestureInfo) {
        if(arguments.length !== 2) {
            $KAUtils.throwExceptionInsufficientArguments();
        }

        if(!$KU.isArray(widgetPath) || typeof gestureInfo !== 'object') {
            $KAUtils.throwExceptionInvalidArgumentType();
        }

        var gestureInfoObj = {};
        var widgetConfig = $KAUtils.getWidgetInstance(widgetPath);
        var widgetModel = widgetConfig.widgetInstance;
        if(!widgetModel) {
            $KAUtils.throwExceptionWidgetPathNotFound();
        }

        node = $KAUtils.getNodeByModel(widgetConfig);
        gestureInfoObj = this.getGestureInfoObj(gestureInfo, 2, node);
        var callback = this.getCallbackFunc(widgetModel, gestureInfoObj)
        if(callback) {
            this.executeCallback(widgetModel, callback, gestureInfoObj);
        }
    };


    module.longpress = function(widgetPath, gestureInfo) {
        if(arguments.length !== 2) {
            $KAUtils.throwExceptionInsufficientArguments();
        }

        if(!$KU.isArray(widgetPath) || typeof gestureInfo !== 'object') {
            $KAUtils.throwExceptionInvalidArgumentType();
        }

        var gestureInfoObj = {};
        var widgetConfig = $KAUtils.getWidgetInstance(widgetPath);
        var widgetModel = widgetConfig.widgetInstance;
        if(!widgetModel) {
            $KAUtils.throwExceptionWidgetPathNotFound();
        }
        node = $KAUtils.getNodeByModel(widgetConfig);
        gestureInfoObj = this.getGestureInfoObj(gestureInfo, 3, node);
        var callback = this.getCallbackFunc(widgetModel, gestureInfoObj)
        if(callback) {
            this.executeCallback(widgetModel, callback, gestureInfoObj);
        }
    };

    
    module.rightTap = function(widgetPath, gestureInfo) {

    };

    module.pan = function(widgetPath, startPointGestureInfo, movePointGestureInfo, endPointGestureInfo) {
        if(arguments.length !== 4) {
            $KAUtils.throwExceptionInsufficientArguments();
        }

        if(!$KU.isArray(widgetPath) || typeof startPointGestureInfo !== 'object' || typeof movePointGestureInfo !== 'object' || typeof endPointGestureInfo !== 'object') {
            $KAUtils.throwExceptionInvalidArgumentType();
        }

        var gestureInfoObj = {};
        var widgetConfig = $KAUtils.getWidgetInstance(widgetPath);
        var widgetModel = widgetConfig.widgetInstance;
        if(!widgetModel) {
            $KAUtils.throwExceptionWidgetPathNotFound();
        }

        node = $KAUtils.getNodeByModel(widgetConfig);
        
        gestureInfoObj = this.getGestureInfoObj(startPointGestureInfo, 4, node, 1);
        var callback = this.getCallbackFunc(widgetModel, gestureInfoObj)
        if(callback) {
            this.executeCallback(widgetModel, callback, gestureInfoObj);
        }

        gestureInfoObj = this.getGestureInfoObj(movePointGestureInfo, 4, node, 2);
        var callback = this.getCallbackFunc(widgetModel, gestureInfoObj)
        if(callback) {
            this.executeCallback(widgetModel, callback, gestureInfoObj);
        }

        gestureInfoObj = this.getGestureInfoObj(endPointGestureInfo, 4, node, 3);
        var callback = this.getCallbackFunc(widgetModel, gestureInfoObj)
        if(callback) {
            this.executeCallback(widgetModel, callback, gestureInfoObj);
        }
    };

    module.rotation = function(widgetPath, startPointGestureInfo, movePointGestureInfo, endPointGestureInfo) {
        if(arguments.length !== 4) {
            $KAUtils.throwExceptionInsufficientArguments();
        }

        if(!$KU.isArray(widgetPath) || typeof startPointGestureInfo !== 'object' || typeof movePointGestureInfo !== 'object' || typeof endPointGestureInfo !== 'object') {
            $KAUtils.throwExceptionInvalidArgumentType();
        }

        var gestureInfoObj = {};
        var widgetConfig = $KAUtils.getWidgetInstance(widgetPath);
        var widgetModel = widgetConfig.widgetInstance;
        if(!widgetModel) {
            $KAUtils.throwExceptionWidgetPathNotFound();
        }

        node = $KAUtils.getNodeByModel(widgetConfig);
        gestureInfoObj = this.getGestureInfoObj(startPointGestureInfo, 5, node, 1);
        var callback = this.getCallbackFunc(widgetModel, gestureInfoObj)
        if(callback) {
            this.executeCallback(widgetModel, callback, gestureInfoObj);
        }

        gestureInfoObj = this.getGestureInfoObj(movePointGestureInfo, 5, node, 2);
        var callback = this.getCallbackFunc(widgetModel, gestureInfoObj)
        if(callback) {
            this.executeCallback(widgetModel, callback, gestureInfoObj);
        }

        gestureInfoObj = this.getGestureInfoObj(endPointGestureInfo, 5, node, 3);
        var callback = this.getCallbackFunc(widgetModel, gestureInfoObj)
        if(callback) {
            this.executeCallback(widgetModel, callback, gestureInfoObj);
        }
    };

    module.pinch = function(widgetPath, startPointGestureInfo, movePointGestureInfo, endPointGestureInfo) {
        if(arguments.length !== 4) {
            $KAUtils.throwExceptionInsufficientArguments();
        }

        if(!$KU.isArray(widgetPath) || typeof startPointGestureInfo !== 'object' || typeof movePointGestureInfo !== 'object' || typeof endPointGestureInfo !== 'object') {
            $KAUtils.throwExceptionInvalidArgumentType();
        }

        var gestureInfoObj = {};
        var widgetConfig = $KAUtils.getWidgetInstance(widgetPath);
        var widgetModel = widgetConfig.widgetInstance;

        if(!widgetModel) {
            $KAUtils.throwExceptionWidgetPathNotFound();
        }
        node = $KAUtils.getNodeByModel(widgetConfig);
        gestureInfoObj = this.getGestureInfoObj(startPointGestureInfo, 6, node, 1);
        var callback = this.getCallbackFunc(widgetModel, gestureInfoObj)
        if(callback) {
            this.executeCallback(widgetModel, callback, gestureInfoObj);
        }

        gestureInfoObj = this.getGestureInfoObj(movePointGestureInfo, 6, node, 2);
        var callback = this.getCallbackFunc(widgetModel, gestureInfoObj)
        if(callback) {
            this.executeCallback(widgetModel, callback, gestureInfoObj);
        }

        gestureInfoObj = this.getGestureInfoObj(endPointGestureInfo, 6, node, 3);
        var callback = this.getCallbackFunc(widgetModel, gestureInfoObj)
        if(callback) {
            this.executeCallback(widgetModel, callback, gestureInfoObj);
        }
    };

    module.getGestureInfoObj = function(gestureInfo, gestureType, widgetNode, gestureState) {
        var gestureInfoObj = {};
        gestureInfoObj.gesturePosition = gestureInfoObj.gesturePosition ? gestureInfoObj.gesturePosition : 10; 
        gestureInfoObj.gestureType = gestureInfo.gestureType ? gestureInfo.gestureType : gestureType;
        gestureInfoObj.gesturesetUpParams = this.getGestureParams(gestureInfo, gestureType);
        gestureInfoObj.scale = gestureInfo.scale ? gestureInfo.scale : 1
        if(gestureType == 2) {
            gestureInfoObj.swipeDirection = gestureInfo.swipeDirection ? gestureInfo.swipeDirection : 1; 
        }
        if(gestureType == 4) {
            gestureInfoObj.gestureState = gestureInfo.gestureState ? gestureInfo.gestureState : gestureState;
            gestureInfoObj.translationX = gestureInfo.translationX ? gestureInfo.translationX : 0;
            gestureInfoObj.translationY = gestureInfo.translationY ? gestureInfo.translationY : 0;
        }
        if(gestureType == 5 || gestureType == 6) {
            gestureInfoObj.gestureState = gestureInfo.gestureState ? gestureInfo.gestureState : gestureState;
            gestureInfoObj.velocity = gestureInfo.velocity ? gestureInfo.velocity : 0;
            gestureInfoObj.velocityX = gestureInfo.velocityX ? gestureInfo.velocityX : 0;
            gestureInfoObj.velocityY = gestureInfo.velocityY ? gestureInfo.velocityY : 0;
        }
        if(gestureType == 5) {
            gestureInfoObj.rotation = gestureInfoObj.rotation ? gestureInfoObj.rotation : 0;
        }
        gestureInfoObj.gestureX = gestureInfo.gestureX ? gestureInfo.gestureX : 0;
        gestureInfoObj.gestureY = gestureInfo.gestureY ? gestureInfo.gestureY : 0;
        gestureInfoObj.widgetWidth = gestureInfo.widgetWidth ? gestureInfo.widgetWidth : node.clientWidth;
        gestureInfoObj.widgetHeight = gestureInfo.widgetHeight ? gestureInfo.widgetHeight : node.clientHeight;
        
        
        return gestureInfoObj;
    };

    module.getGestureParams = function(gestureInfo, gestureType) {
        var setupParams = {};

        if(gestureInfo.gesturesetUpParams && (gestureType == 1 || gestureType == 2)) {
            setupParams.fingers = gestureInfo.gesturesetUpParams.fingers ? gestureInfo.gesturesetUpParams.fingers : 1;
            if(gestureType == 2) {
                if($KU.isAndroid) {
                    setupParams.swipeDistance = gestureInfo.getDefaultSetupParams.swipeDistance ? gestureInfo.getDefaultSetupParams.swipeDistance : 50;
                    setupParams.swipeVelocity = gestureInfo.getDefaultSetupParams.swipeVelocity ? gestureInfo.getDefaultSetupParams.swipeVelocity : 75;
                }
                return setupParams;
            }
            setupParams.taps = gestureInfo.gesturesetUpParams.taps ? gestureInfo.gesturesetUpParams.taps : 1;
        } else if(gestureInfo.gesturesetUpParams && gestureType == 3) {
            setupParams.pressDuration = gestureInfo.gesturesetUpParams.pressDuration ? gestureInfo.gesturesetUpParams.pressDuration : 1;
        } else if(gestureInfo.gesturesetUpParams && (gestureType == 4 || gestureType == 5 || gestureType == 6)) {
            setupParams.fingers = gestureInfo.gesturesetUpParams.fingers ? gestureInfo.gesturesetUpParams.fingers : 1;
            setupParams.continuousEvents = gestureInfo.gesturesetUpParams.continuousEvents ? estureInfo.gesturesetUpParams.continuousEvents : false;
        } else {
            setupParams = this.getDefaultSetupParams(gestureType);
        }

        return setupParams;
    };

    module.getDefaultSetupParams = function(gestureType) {
        var defaultParams = {};
        switch(gestureType) {
            case 1:
                defaultParams = {
                    fingers: 1,
                    taps: 1
                };
                break;
            case 2:
                defaultParams = {
                    fingers: 1
                };
                if($KU.isAndroid) {
                    defaultParams = {
                        fingers: 1,
                        swipeDistance: 50,
                        swipeVelocity: 75
                    };
                }
                break;
            case 3:
                defaultParams = {
                    pressDuration: 1
                };
                break;
            case 4:
                defaultParams = {
                    fingers: 1,
                    continuousEvents: false
                };
                break;
            case 5:
                defaultParams = {
                    fingers: 1,
                    continuousEvents: false
                };
                break;
            case 6:
                defaultParams = {
                    fingers: 1,
                    continuousEvents: false
                };
                break;
        }
        return defaultParams;
    };

    module.getCallbackFunc = function(widgetModel, gestureInfoObj) {
        var gestureType = (gestureInfoObj.gestureType == 1 ? (gestureInfoObj.gesturesetUpParams.taps == 1 ? 10 : 11) : gestureInfoObj.gestureType);
        if(widgetModel.gestures[gestureType]) {
            var gestureIdentifier = Object.keys(widgetModel.gestures[gestureType])[0];
            return widgetModel.gestures[gestureType][gestureIdentifier].callback;
        }
    };

    module.executeCallback = function(widgetModel, callback, gestureInfoObj) {

        var currentForm = widgetModel["__currentForm"];
        if(currentForm) {
            $KU.executeWidgetEventHandler(currentForm, callback, gestureInfoObj);
        } else {
            $KU.executeWidgetEventHandler(widgetModel, callback, gestureInfoObj);
        }
    };

    return module;

}());

voltmx.automation.playback = (function() {

    var _waitForElement = function(widgetPath, timeOut, resolve, reject) {
        var waitTime;

        if(typeof timeOut !== 'undefined' && timeOut !== null) {
            waitTime = (timeOut < 1000) ? timeOut : 1000;
            timeOut = (timeOut < 1000) ? timeOut : (timeOut - 1000);
        } else {
            waitTime = 1000;
        }
        setTimeout(function() {
            var node = null, widgetConfig, formID, formModel = null;

            var id = widgetPath[0];
            if(id.split('/').length > 1){
                id = id.split('/');
                if($KG.appbehaviors['isCompositeApp'] == true && id[0] !== _voltmx.mvc.getCurrentAppName()) {
                    formModel = $KU.getFormModel(id[id.length-1], id[0]);
                } else {
                    formModel = $KU.getFormModel(id[id.length-1]);
                }
            } else {
                formModel = $KU.getFormModel(id);
            }

            if(formModel && formModel.id === $KG.__currentForm.id) {
                widgetConfig = $KAUtils.getWidgetInstance(widgetPath);
                if(widgetConfig.widgetInstance) {
                    node = $KAUtils.getNodeByModel(widgetConfig);
                }
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

    var _waitOnLoadingScreen = function(timeOut, resolve, reject) {
        var waitTime;

        if(typeof timeOut !== 'undefined' && timeOut !== null) {
            waitTime = (timeOut < 1000) ? timeOut : 1000;
            timeOut = (timeOut < 1000) ? timeOut : (timeOut - 1000);
        } else {
            waitTime = 1000;
        }

        setTimeout(function() {
            if(module.isLoadingScreenVisible()){
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

    var module = {};
    module.wait = function(delaytime) {
        $KU.logExecuting('voltmx.automation.playback.wait');
        if(arguments.length !== 1) {
            $KAUtils.throwExceptionInsufficientArguments();
        }

        $KU.logExecutingWithParams('voltmx.automation.playback.wait', delaytime);
        if(typeof delaytime !== 'number') {
            $KAUtils.throwExceptionInvalidArgumentType();
        }
        $KU.logExecutingFinished('voltmx.automation.playback.wait');

        return new Promise(function(resolve, reject) {
            setTimeout(function() {
                resolve();
            }, delaytime);
        });
    };

    module.waitFor = function(widgetPath, timeOut) {
        var node = null, widgetConfig, formModel = null;

        $KU.logExecuting('voltmx.automation.playback.waitFor');
        if(arguments.length !== 1 && arguments.length !== 2) { 
            $KAUtils.throwExceptionInsufficientArguments();
        }

        $KU.logExecutingWithParams('voltmx.automation.playback.waitFor', widgetPath, timeOut);
        if(!$KU.isArray(widgetPath) || (timeOut && typeof timeOut !== 'number')) {
            $KAUtils.throwExceptionInvalidArgumentType();
        }
        $KU.logExecutingFinished('voltmx.automation.playback.waitFor');

        var id = widgetPath[0];
        if(id.split('/').length > 1){
            id = id.split('/');
            if($KG.appbehaviors['isCompositeApp'] == true && id[0] !== _voltmx.mvc.getCurrentAppName()) {
                formModel = $KU.getFormModel(id[id.length-1], id[0]);
            } else {
                formModel = $KU.getFormModel(id[id.length-1]);
            }
        } else {
            formModel = $KU.getFormModel(id);
        }

        if(formModel && formModel.id === $KG.__currentForm.id) {
            widgetConfig = $KAUtils.getWidgetInstance(widgetPath);
            if(widgetConfig.widgetInstance) {
                node = $KAUtils.getNodeByModel(widgetConfig);
            }
        }

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

    module.waitForAlert = function() {

    };

    module.isLoadingScreenVisible = function() {
        var loadingScreenNode = document.getElementById("__loadingScreenDiv");

        if(loadingScreenNode && loadingScreenNode.style.display === "block") {
            return true;
        } else {
            return false;
        }
    }

    module.waitForLoadingScreenToDismiss = function(timeout) {
        $KU.logExecuting({api:'voltmx.automation.waitForLoadingScreenToDismiss', enter:true});
        if(timeout && typeof timeout !== 'number') {
            $KAUtils.throwExceptionInvalidArgumentType();
        }
        $KU.logExecutingFinished({api:'voltmx.automation.waitForLoadingScreenToDismiss', exit:true});
        return new Promise(function(resolve, reject) {
                  _waitOnLoadingScreen(timeout, resolve, reject);
              });
    }



    return module;
}());

voltmx.automation.device = (function() {

    var module = {};

    module.deviceBack = function() {
        history.go(-1);

        return voltmx.automation.playback.wait(100);
    };

    module.rotate = function(newOrientation) {
    };
    return module;

}());




voltmx.automation.capture = (function() {

}());


voltmx.automation.scrollDirection = {
    Top: "top",
    Bottom: "bottom",
    Left: "left",
    Right: "right"
};

voltmx.automation.scrollToWidget = function(widgetPath) {
    var widgetConfig;
    var scrollToWidget;

    if(arguments.length !== 1) {
        $KAUtils.throwExceptionInsufficientArguments();
    }

    if(!$KU.isArray(widgetPath)) {
        $KAUtils.throwExceptionInvalidArgumentType();
    }

    widgetPath = $KAUtils.getAllowedLeafWidgetPath(widgetPath);
    widgetConfig = $KAUtils.getWidgetInstance(widgetPath);
    scrollToWidget = widgetConfig.widgetInstance;

    if(!scrollToWidget) {
        $KAUtils.throwExceptionWidgetPathNotFound();
    }

    $KAUtils.scrollToWidgetRecursively(scrollToWidget);

    return voltmx.automation.playback.wait(100);

};

voltmx.automation.captureAsBase64 = function(){

    function percentToByte(p) {
        return String.fromCharCode(parseInt(p.slice(1), 16));
    }

    var filereader = new FileReader();
    var cssscript = '',
        i = 0,
        j = 0,
        data = '',
        svg = [];
    var formModel = voltmx.application.getCurrentForm(),
        formNode = $KU.getNodeByModel(formModel),
        clone = formNode.cloneNode([true]),
        headerNode = document.getElementById('header_container'),
        footerNode = document.getElementById('footer_container'),
        appmenuNode = document.getElementById('voltmxappmenudiv');
    var sWidth = formNode.scrollWidth;
    var sHeight = formNode.scrollHeight;
    var Script = '';
    var tempCSS = document.styleSheets;
    if(voltmx.appinit.isIE11) {
        return;
    }
    for(i = 0; i < tempCSS.length; i++) {
        if(tempCSS[i].href) {
            for(j = 0; j < tempCSS[i].rules.length; j++) {
                cssscript = cssscript + tempCSS[i].rules[j].cssText;
            }
        }
    }
    if(headerNode) {
        sHeight = sHeight + headerNode.clientHeight;
        Script = Script + (new XMLSerializer).serializeToString(headerNode);
    }
    for(i = 0; i < clone.childNodes.length; i++) {
        Script = Script + (new XMLSerializer).serializeToString(clone.childNodes[i]);
    }
    if(footerNode) {
        sHeight = sHeight + footerNode.clientHeight;
        Script = Script + (new XMLSerializer).serializeToString(footerNode);
    }
    if(appmenuNode) {
        sHeight = sHeight + appmenuNode.clientHeight;
        Script = Script + (new XMLSerializer).serializeToString(appmenuNode.parentElement);
    }
    data =  '<svg xmlns="http://www.w3.org/2000/svg" width="' + sWidth + '" height="' + sHeight + '">' +
            '<foreignObject width="100%" height="100%">' +
            '<div xmlns="http://www.w3.org/1999/xhtml" style="font-size:40px">' +
            '<style>' +
            cssscript +
            '</style>'+
            Script +
            '</div>' +
            '</foreignObject>' +
            '</svg>';

    return 'data:image/svg+xml;base64,'+window.btoa(encodeURIComponent(data).replace(/%[0-9A-F]{2}/g, percentToByte));
}

voltmx.automation.getParentInfo = function() {
    var result = {};
    result.appName = _voltmx.automation.params.parentApp;
    result.windowRef = window.opener;
    _voltmx.automation.parentApp = {"appName" : result.appName, "windowRef" : result.windowRef};
    return result;
}
voltmx.automation.launchApp = function(config) {
    function constructURLWithParams(appInfo) {
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

        if(appInfo.testPlan)
            url = url + '&testPlan=' + appInfo.testPlan;

        return url;
    }

    var appInfo = null, appURL = "";

    if(config === null || config === undefined || JSON.stringify(config) === JSON.stringify({}) || !config.appName) {
        $KAUtils.throwExceptionInsufficientArguments();
    }

    if(!_voltmx.automation.IntegrationTests[config.appName])
        $KAUtils.throwExceptionInvalidAppName();

    appInfo = _voltmx.automation.IntegrationTests[config.appName];
    if(config.queryParams && config.queryParams.testPlan && typeof config.queryParams.testPlan === 'string') {
        appInfo.testPlan = config.queryParams.testPlan;
    }
    appURL = constructURLWithParams(appInfo);
    if(appURL === null) {
        return null;
    }

    return window.open(appURL);
}

voltmx.automation.waitForEvent = function(options) {

    function _waitForResume(timeOut, resolve, reject) {
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

    var maxWaitTime = null;
    if(options.maxWait && typeof options.maxWait === 'number')
        maxWaitTime = options.maxWait;

    _voltmx.automation.eventDetails.pauseTest = true;
    _voltmx.automation.eventDetails.eventName = options.eventName;
    return new Promise(function(resolve, reject) {
              _waitForResume(maxWaitTime, resolve, reject);
          });
}

voltmx.automation.sendEvent = function(targetDetails) {
    var targetWindow = null, appInfo = null;

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
}

voltmx.automation.sendEventToParent = function(targetDetails) {
    var targetWindow = null, parentAppURL = "", parentApp = _voltmx.automation.parentApp;

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
    return true;
}

voltmx.automation.webSocket = (function(){
    var module = {};
    module.connectToHost = function() {
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

    module.sendMessage = function(options) {
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

    module.waitForMessage = function(options) {
        var maxWaitTime = null, karConfig = _voltmx.automation;
        $KU.logExecuting('voltmx.automation.waitForMessage');

        if(options.maxWait && typeof options.maxWait === 'number') {
            maxWaitTime = options.maxWait;
        }
        if(!karConfig.server) {
            $KAUtils.throwExceptionNoConnectionAvailable();
        }

        karConfig.server.pauseTest = true;
        karConfig.server.eventName = options.eventName;

        $KU.logExecutingFinished('voltmx.automation.waitForMessage');
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
    return module;
})();