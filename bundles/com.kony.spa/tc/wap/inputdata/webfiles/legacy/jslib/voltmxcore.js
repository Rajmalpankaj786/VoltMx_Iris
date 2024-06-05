voltmx.events = {
    widgetEventMap: {},
    hiddenIFrame: null,
    isFrameworkEventsRegistered: false,

    addEvent: function(kEventType, kWidgetType, kEventHandler) {
        voltmx.events.widgetEventMap[kWidgetType] = voltmx.events.widgetEventMap[kWidgetType] || {};
        voltmx.events.widgetEventMap[kWidgetType][kEventType] = kEventHandler;
    },

    getEventHandler: function(eventObject) {
        eventObject = eventObject || window.event;
        var targetWidget = eventObject.target || eventObject.srcElement;
        var preventDefault = true, widget;
        var eventData, cellTemplateNode = null;

        if($KAR && $KAR.isAssertMode()) {
            voltmx.events.preventDefault(eventObject);
            return;
        }

        
        if($KG["__idletimeout"] && $KG["__idletimeout"]["enabled"]) {
            var reset = $KI.appevents.resettimer();
            if(reset === false) return;
        }

        $KW.Appmenu && $KW.Appmenu.hidemoreappmenuitems();


        cellTemplateNode = $KU.getParentByAttribute(targetWidget, 'kcelltemplate');
        if(cellTemplateNode != null) {
            targetWidget = cellTemplateNode.parentElement;
        }

        
        if(targetWidget.getAttribute('w-type') != "Calendar" && targetWidget.getAttribute('kwidgettype') != "Calendar") {
            $KW.Calendar && $KW.Calendar.destroyCalendar(null, null, targetWidget);
        }
        if(targetWidget.getAttribute('w-type-inactive')) {
            return;
        }

        widget = $KU.getParentByAttribute(targetWidget, voltmx.constants.VOLTMX_WIDGET_TYPE);
        if(widget && widget.hasAttribute('overlay')) {
            $KW.Image.onClickHandler(widget);
            return;
        }

        
        if(eventObject.type == "click" && typeof cvox == "undefined" && ($KU.isTouchSupported || $KU.isPointerSupported) && $KG["targetWidget"] && ($KG["moved"] || ($KG["targetWidget"] && targetWidget != $KG["targetWidget"] && (targetWidget.getAttribute('w-type') != "Calendar")))) {
            
            if(targetWidget.tagName == 'A' && targetWidget.getAttribute('href')) {
                voltmx.events.stopPropagation(eventObject);
                voltmx.events.preventDefault(eventObject);
            }
            
            $KG["targetWidget"] = "";
            $KG["moved"] = false;

            var src = eventObject.srcElement;
            
            if((src.getAttribute && src.getAttribute("kwidgettype") == "Calendar") || (src.parentNode && src.parentNode.getAttribute && src.parentNode.getAttribute("kwidgettype") == "Calendar")) {
                
            } else {
                return;
            }
        }

        if(targetWidget) {
            var targetWidgetType = targetWidget.getAttribute(voltmx.constants.VOLTMX_WIDGET_TYPE);

            if(targetWidget.tagName == 'A')
                eventData = [targetWidget.innerText, targetWidget.getAttribute('href')];

            if(targetWidget.getAttribute('tpwidgettype')) {
                return;
            } else if(!targetWidgetType) {
                
                var targetChild = targetWidget.childNodes[0];
                if(targetWidget.getAttribute("index") && targetChild && targetChild.getAttribute("kwidgettype") == "Segment") {
                    targetWidget = targetChild;
                    targetWidgetType = "Segment";
                } else {
                    
                    var voltmxWidget = $KU.getParentByAttribute(targetWidget, voltmx.constants.VOLTMX_WIDGET_TYPE);
                    
                    if(targetWidget && targetWidget.tagName == "CANVAS" && $KU.isIE11 && voltmxWidget && voltmxWidget.getAttribute("kwidgettype") == "googlemap") {
                        return;
                    }
                    var thirdPartyWidget = $KU.getParentByAttribute(targetWidget, 'tpwidgettype');
                    targetWidget = voltmxWidget;
                    
                    if(!targetWidget || thirdPartyWidget) {
                        return;
                    }
                    targetWidgetType = targetWidget.getAttribute(voltmx.constants.VOLTMX_WIDGET_TYPE);
                }
            }

            if(targetWidgetType == 'RadioButtonGroup' || targetWidgetType == 'CheckBoxGroup' || targetWidgetType == 'ListBox') {
                
                if($KU.preventClickEvent(eventObject, targetWidget))
                    return;
            }

            
            var widgetModel = $KU.getModelByNode(targetWidget);
            if(widgetModel && widgetModel.disabled)
                return;


            var widgetEventObj = voltmx.events.widgetEventMap[targetWidgetType];
            if(widgetEventObj && widgetEventObj[eventObject.type]) {
                

                
                if(!$KW.Utils.isWidgetInteractable(targetWidget, true)) {
                    return;
                }

                
                var eventHandler = widgetEventObj[eventObject.type];
                if(targetWidgetType == 'RichText') {
                    
                    if(!widgetModel.onclick)
                        preventDefault = false;
                }
                var target = eventObject.target || eventObject.srcElement;
                if(!(targetWidgetType == "TextField" || targetWidgetType == "CheckBoxGroup" || targetWidgetType == "TextArea" ||
                        targetWidgetType == "RadioButtonGroup" || targetWidgetType == "ListBox" || (targetWidgetType == "DataGrid" && target.type == "checkbox"))) {
                    if(eventObject.type == 'keydown' ) {
                        preventDefault = false;
                        if(eventObject.keyCode == 13 || eventObject.keyCode == 32) {
                            preventDefault = true;
                        }
                    }
                    if(preventDefault) {
                        voltmx.events.stopPropagation(eventObject);
                        voltmx.events.preventDefault(eventObject);
                    }
                }

                var editableCombos = document.querySelectorAll("div[name='SelectOptions']");
                if(editableCombos) {
                    for(var i = 0; i < editableCombos.length; i++) {
                        if(editableCombos[i].style.display == "block") {
                            if(targetWidget.id != editableCombos[i].parentNode.id)
                                editableCombos[i].style.display = "none";
                        }
                    }
                }

                
                
                if(targetWidgetType == 'RichText' && eventData) 
                    eventHandler(eventObject, targetWidget, eventData);
                else
                    eventHandler(eventObject, targetWidget, target);

                if(!voltmx.system.activity.hasActivity()) {
                    $KW.unLoadWidget();
                }
            }
        }
    },

    addEventListener: function(object, type, listener, bCapture) {
        if(!object)
            return;
        if(!listener)
            listener = voltmx.events.getEventHandler;
        if(!bCapture)
            bCapture = false;

        if(object.addEventListener)
            object.addEventListener(type, listener, bCapture); 
        else if(object.attachEvent)
            object.attachEvent('on' + type, listener); 
    },

    removeEventListener: function(object, type, listener, bCapture) {
        if(!object)
            return;
        if(!listener)
            listener = voltmx.events.getEventHandler;
        if(!bCapture)
            bCapture = false;

        if(object.removeEventListener)
            object.removeEventListener(type, listener, bCapture); 
        else if(object.attachEvent)
            object.detachEvent('on' + type, listener); 
    },

    preventDefault: function(eventObject) {
        if(!eventObject)
            return;

        if(eventObject.preventDefault)
            eventObject.preventDefault();
        else
            eventObject.returnValue = false;
    },

    stopPropagation: function(eventObject) {
        if(!eventObject)
            return;
        
        var isNonModelPopupDismissEvent = arguments[1];
        if(voltmx.touchClickNotifier && !isNonModelPopupDismissEvent)
            voltmx.touchClickNotifier.handleEvent(eventObject);
        if(eventObject.stopPropagation) {
            eventObject.stopPropagation();
            eventObject.stopImmediatePropagation && eventObject.stopImmediatePropagation();
        } else
            eventObject.cancelBubble = true;
    },

    ontouchstartHandler: function(e) {
        if(($KU.isIE || $KU.isPointerSupported ? e : e.changedTouches)) {
            var target = e.changedTouches ? (e.changedTouches[0].target || e.changedTouches[0].srcElement) : (e.target || e.srcElement);
            var widgetNode;
            if(target.nodeType == 3)
                target = target.parentNode;
            $KG["targetWidget"] = target;
            $KG["moved"] = false;
            if($KU.isIE || $KU.isPointerSupported) { 
                var touch = e.touches && e.touches[0] || e;
                $KG.pointX = touch.pageX;
                $KG.pointY = touch.pageY;
            }
            
            if($KU.isiPhone) {
                this.allowUp = (this.scrollTop > 0);
                this.allowDown = (this.scrollTop < this.scrollHeight - this.clientHeight);
                if(typeof e.pageY === 'number') this.slideBeginY = e.pageY;
            }
            widgetNode = $KU.getParentByAttribute(e.target, voltmx.constants.VOLTMX_WIDGET_TYPE);
            if($KW.Utils.belongsToSegment(widgetNode)) {
                $KW.Segment.resetSwipeMoveConfigOnTouchStart(widgetNode);
            }
        }
    },

    ontouchmoveHandler: function(e) {
        var up = false;
        var down = false;
        
        
        

        if($KU.isIE || $KU.isPointerSupported || $KU.isAndroid) {
            var touch = e.touches && e.touches[0] || e;
            var deltaX = touch.pageX - $KG.pointX,
                deltaY = touch.pageY - $KG.pointY;
            if(Math.abs(deltaX) > 0 || Math.abs(deltaY) > 0) {
                $KG["moved"] = true;
            }
        } else {
            $KG["moved"] = true;
        }
        
        if($KU.isiPhone) {
            if(typeof e.pageY === 'number') {
                up = (e.pageY > this.slideBeginY);
                down = (e.pageY < this.slideBeginY);
                this.slideBeginY = e.pageY;
            }
            if(!((up && this.allowUp) || (down && this.allowDown))) {
                e.preventDefault();
            }
        }

    },

    registerDocumentEvents: function() {
        var main = ($KU.isWindowsPhone && $KU.isIE9) ? document : document.getElementById("__MainContainer");
        if(voltmx.touchClickNotifier) {
            var reqEvents = ['touchstart', 'touchmove', 'touchend', 'touchcancel', 'click'];
            for(var i = 0; i < reqEvents.length; i++)
                voltmx.events.addEventListener(main, reqEvents[i], voltmx.touchClickNotifier, false);
        }

        voltmx.events.addEventListener(main, 'click');
        voltmx.events.addEventListener(main, 'input');
        voltmx.events.addEventListener(main, 'change');
        voltmx.events.addEventListener(main, 'keydown');
        voltmx.events.addEventListener(main, 'keyup');
        if($KG["useNativeScroll"]) {
            voltmx.events.addEventListener(main, 'touchstart', function() {});
            voltmx.events.addEventListener(main, 'touchmove', function() {});
        }
        else {
            if($KU.isTouchSupported) {
                voltmx.events.addEventListener(main, 'touchstart', voltmx.events.ontouchstartHandler);
                voltmx.events.addEventListener(main, 'touchmove', voltmx.events.ontouchmoveHandler);
            } else if($KU.isPointerSupported) {
                voltmx.events.addEventListener(main, 'MSPointerDown', voltmx.events.ontouchstartHandler);
                voltmx.events.addEventListener(main, 'MSPointerMove', voltmx.events.ontouchmoveHandler);
            }
        }
        voltmx.appinit.initializeWidgets();
        voltmx.events.orientationregistration();
        voltmx.events.isFrameworkEventsRegistered = true;
    },


    

    windowOrientationChange: function() {
        var event = window.event;
        var orientation = $KU.detectOrientation();
        var winNewWidth = $KU.getWindowWidth();
        var winNewHeight = $KU.getWindowHeight();

        if(orientation != undefined && orientation == $KG["__orientation"] && event && event.type == 'resize') {
            
            window.clearTimeout(voltmx.events.resizeTimeoutId);
            voltmx.events.resizeTimeoutId = setTimeout(function() {
                if($KG.activeInput && !$KG["nativeScroll"] && winNewHeight > $KG['__viewportHeight']) {
                    
                    if(voltmx.appinit.isChrome && $KU.isAndroid && $KG["__orientation"] == "portrait" && (winNewHeight - $KG['__viewportHeight']) > 50) {
                        if($KG.appbehaviors.disableScrollOnInputFocus == true) {
                            $KG.activeInput.blur();
                        }
                    } else if(!voltmx.appinit.isChrome) {
                        if($KG.appbehaviors.disableScrollOnInputFocus == true) {
                            $KG.activeInput.blur();
                        }
                    }

                    $KU.onHideKeypad();
                } else {
                    $KU.adjustScrollBoxesOnResize(true);
                }
                $KG['__viewportHeight'] = winNewHeight;
            }, $KU.orientationDelay);
            return;
        }
        else
            $KG["__orientation"] = orientation;
        if($KG["__currentForm"]) {
            if($KU.isOrientationSupported && $KU.isAndroid) {
                if(event && event.type == 'resize')
                    return;
            }
            
            $KU.getInnerHeight($KU.orientationDelay);
            $KU.setActiveInput();
            $KG['__viewportHeight'] = winNewHeight;

            
            window.clearTimeout(voltmx.events.orientationTimeoutId);
            voltmx.events.orientationTimeoutId = setTimeout(function() {
                
                var eventList = voltmx.events.widgetEventMap || {};
                for(var k in eventList) {
                    var widgetType = eventList[k];
                    var eventHandler = widgetType["onorientationchange"] || widgetType["onresize"];
                    eventHandler && eventHandler($KG["__currentForm"].id, $KG["__orientation"]);
                }

                $KW.Form.resizeForm($KG["__currentForm"].id, true);

            }, $KU.orientationDelay);
        }
        

    },

    orientationregistration: function() {
        $KG["__orientation"] = $KU.detectOrientation();
        var orientationEvent = ($KU.isOrientationSupported && !$KU.isAndroid) ? "orientationchange" : "resize";
        voltmx.events.addEventListener(window, orientationEvent, voltmx.events.windowOrientationChange);
        if($KU.isOrientationSupported && $KU.isAndroid)
            voltmx.events.addEventListener(window, "orientationchange", voltmx.events.windowOrientationChange);
    },

    canExecuteEventHandler: function(widgetModel, event) {
        if(widgetModel[event]) {
            return true;
        }
        return false;
    },

    executeBoxEvent: function(wModel, rowdata, containerModel) {
        if(rowdata && containerModel) { 
            var rowModelData = null,
                clickHandler = null,
                extendedModel = null,
                context;

            if(containerModel.wType == 'Segment' || containerModel.wType == "CollectionView") {
                var sectionIndex = containerModel.currentIndex[0];
                var rowIndex = containerModel.currentIndex[1];
                var clonedTemplate = $KW.Utils.getClonedModelByContainerUsingIndex(containerModel, rowIndex, sectionIndex);

                if(!clonedTemplate) {
                    return false;
                }
                wModel = $KU.getValueFromObjectByPath($KW.Utils.getWidgetPathByModel(wModel), clonedTemplate);
                if(containerModel.wType == 'Segment') {
                    context = {
                        sectionIndex: sectionIndex,
                        rowIndex: rowIndex,
                        widgetInfo: containerModel
                    };
                } else {
                    context = {
                        sectionIndex: sectionIndex,
                        itemIndex: rowIndex,
                        widgetInfo: containerModel
                    };
                }
            }

            parentModel = wModel;

            while(parentModel) {
                var widgetData = containerModel.widgetdatamap ? rowdata[containerModel.widgetdatamap[parentModel.id]] : rowdata[parentModel.id];

                if(widgetData && (containerModel.wType != 'Segment') && (containerModel.wType != 'CollectionView')) {
                    rowModelData = $KU.cloneObj(widgetData);
                    if(typeof rowModelData === 'string') {
                        rowModelData = (parentModel.wType === 'Image') ? {
                            "src": rowModelData
                        } : {
                            "text": rowModelData
                        };
                    }
                    if(!IndexJL) {
                        for(var p in rowModelData) {
                            if(rowModelData.hasOwnProperty(p) && p !== p.toLowerCase()) {
                                rowModelData[p.toLowerCase()] = rowModelData[p];
                            }
                        }
                    }

                    clickHandler = rowModelData.onclick || parentModel.onclick;
                    if(clickHandler && rowModelData.enable !== false) {
                        extendedModel = $KU.extend(rowModelData, parentModel);
                        this.fireBoxEvent(extendedModel, context);
                        return true;
                    }
                } else if(this.canExecuteEventHandler(parentModel, "onclick") && parentModel.enable !== false) {
                    this.fireBoxEvent(parentModel, context);
                    return true;
                }

                parentModel = parentModel.parent;
                if(!parentModel) return false;
            }
        } else {
            var formId = wModel.pf;
            var pModel = wModel;
            var form = $KG['__currentForm'] || $KU.getTemplateModel(formId, wModel.appName);
            while(pModel) {
                
                if(this.canExecuteEventHandler(pModel, "onclick") || (pModel.parent && formId == pModel.parent.id && pModel.parent.wType != 'HBox') || pModel.id == form.id) {
                    if(this.canExecuteEventHandler(pModel, "onclick")) {
                        this.fireBoxEvent(pModel);
                        return true;
                    }
                    return false;
                }
                
                if(form.topLayerFCModal && pModel === form.topLayerFCModal) {
                    return true;
                }
                pModel = pModel.parent;
            }
            return false;
        }
    },



    
    fireBoxEvent: function(widgetModel, context) {
        var eventReference = $KU.returnEventReference(widgetModel.onclick);
        eventReference && (context ? $KU.executeWidgetEventHandler(widgetModel, eventReference, context) : $KU.executeWidgetEventHandler(widgetModel, eventReference));
        $KU.onEventHandler(widgetModel);
    },

    
    executeActionOnContainer: function(containerModel, params) {
        var execActionBeforeChildFlag = params.execActionBeforeChildFlag;

        for(var i = 0; i < containerModel.children.length; i++) {
            var childModel = containerModel[containerModel.children[i]];
            childModel = $KW.Utils.getActualWidgetModel(childModel);

            if(childModel.isContainerWidget) {
                if(execActionBeforeChildFlag) {
                    voltmx.events.executeActionEvt(childModel, params);
                }
                voltmx.events.executeActionOnContainer(childModel, params);
                if(!execActionBeforeChildFlag) {
                    voltmx.events.executeActionEvt(childModel, params);
                }
            }
        }
    },

    
    executeActionOnComponent: function(wArray, params) {
        var i = 0,
            wModel = null;
        var execActionBeforeChildFlag = params.execActionBeforeChildFlag;

        for(i; i < wArray.length; i++) {
            if(wArray[i].isContainerWidget) {
                wModel = $KW.Utils.getActualWidgetModel(wArray[i]);
                if(execActionBeforeChildFlag) {
                    voltmx.events.executeActionEvt(wModel, params);
                }
                voltmx.events.executeActionOnContainer(wModel, params);
                if(!execActionBeforeChildFlag) {
                    voltmx.events.executeActionEvt(wModel, params);
                }
            }
        }
    },

    executeActionEvt: function(widgetModel, params) {
        var eventType = params.eventType;
        var actionEvt = widgetModel[eventType];

        if(!actionEvt) return;
        if(widgetModel.isMaster || widgetModel.wType == "Form") {
            var actionref = $KU.returnEventReference(actionEvt);
            if(eventType == "onbreakpointhandler" || eventType == "onbreakpointchange") {
                actionref && $KU.executeWidgetEventHandler(widgetModel, actionref, params.bodyWidth);
            } else {
                actionref && $KU.executeWidgetEventHandler(widgetModel, actionref);
            }
        }
    },

    browserback: {
        currentHash: window.location.hash,

        HASH_LENGTH: 2,

        
        handleBrowserBackEvent: function() {
            var showForm = false;
            var prevFormId, prevHash, prevAppName;
            if($KG["__idletimeout"] && $KG["__idletimeout"]["enabled"]) {
                $KI.appevents.resettimer();
            }
            
            

            if(location.hash && voltmx.events.browserback.currentHash && location.hash !== voltmx.events.browserback.currentHash) {
                showForm = true;
            }

            var formModel = $KG["__currentForm"];
            if(showForm && formModel) {
                var ondeviceback = $KU.returnEventReference(formModel.ondeviceback);
                if(ondeviceback) {
                    
                    voltmx.events.browserback.updateURLWithLocation(formModel.id, formModel.appName);
                    ondeviceback();
                    return;
                }
                $KI.window.dismissLoadingScreen();
                $KW.Calendar && $KW.Calendar.destroyCalendar();
                prevHash = location.hash.substr(voltmx.events.browserback.HASH_LENGTH);

                if(prevHash === "") {
                    
                    window.history.go(-1);
                    return;
                }

                prevFormId = $KU.getFormInfoFromURL().formId;
                prevAppName = $KU.getFormInfoFromURL().appName;

                var previousFormModel = $KU.getFormModel(prevFormId, prevAppName);
                if(previousFormModel && prevFormId !== formModel.id) {
                    previousFormModel["isfromBrowserBack"] = true;
                    if(previousFormModel.voltmxControllerName) {
                        _voltmx.mvc.navigate(prevFormId, prevAppName);
                    } else {
                        previousFormModel.show();
                    }

                }
            }
        },

        
        
        updateURLWithLocation: function(formID, appName) {
            if(formID) {
                if($KG.appbehaviors['isCompositeApp'] == true) {
                    location.hash = voltmx.events.browserback.currentHash =
                    '#/' + appName +'/' +formID;
                } else {
                    location.hash = voltmx.events.browserback.currentHash =
                    '#_' + formID;
                }
            }
        },

        setHistory: function() {
            if(voltmx.events.hiddenIFrame.location.hash != location.hash) {
                
                voltmx.events.hiddenIFrame.document.open();
                voltmx.events.hiddenIFrame.document.close();
                voltmx.events.hiddenIFrame.location.hash = location.hash;
            }
        }
    }
};


window.onload = function() {
    setTimeout(function() {
        window.scrollTo(0, 1);
    }, 100);
};

window.onbeforeprint = function(e) {
    var formModel = voltmx.application.getCurrentForm(),
        formNode = $KU.getNodeByModel(formModel);

    formModel.media = {type:'print', height:formNode.style.height, width:document.body.style.width};
    formNode.style.height = formNode.scrollHeight + 'px';
    document.body.style.width = formModel.media.width;
};

window.onafterprint = function(e) {
    var formModel = voltmx.application.getCurrentForm(),
        formNode = $KU.getNodeByModel(formModel);

    document.body.style.width = formModel.media.width;
    formNode.style.height = formModel.media.height;
    delete formModel.media;
};
