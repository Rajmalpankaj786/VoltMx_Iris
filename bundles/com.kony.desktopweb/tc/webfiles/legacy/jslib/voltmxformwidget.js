
$KW.Form = (function() {
    
    var _newFormTransitionApplicable = function(model, type) {
        var applicable = false, transition = model[(type+'transitionconfig')];

        if(!transition) return applicable;

        if(typeof transition.formAnimation === 'number'
        || typeof transition.formanimation === 'number') {
            applicable = true;
        }

        return applicable;
    };

    var _normalizeTransition = {
        number: function(inConfig, outConfig) {
            var inTrans = {effect:'none', duration:'0.5s'},
                outTrans = {effect:'none', duration:'0.5s'};

            if(typeof inConfig.formAnimation === 'number') {
                inTrans.effect = inConfig.formAnimation.toString();
            } else if(typeof inConfig.formanimation === 'number') {
                inTrans.effect = inConfig.formanimation.toString();
            }
            if(inTrans.effect === '0') inTrans.effect = 'none';
            else inTrans.effect = $KW.formTransitionsMatrix[('anim'+inTrans.effect)];

            if(outConfig) {
                if(typeof outConfig.formAnimation === 'number') {
                    outTrans.effect = outConfig.formAnimation.toString();
                } else if(typeof outConfig.formAnimation === 'number') {
                    outTrans.effect = outConfig.formanimation.toString();
                }
            }
            if(outTrans.effect === '0') outTrans.effect = 'none';
            else outTrans.effect = $KW.formEndTransitionsMatrix[('anim'+outTrans.effect)];

            if(!inTrans.effect || inTrans.effect === 'none') inTrans = null;
            if(!outTrans.effect || outTrans.effect === 'none') outTrans = null;

            return {inTrans:inTrans, outTrans:outTrans};
        },

        string: function(inConfig) {
            var inTrans = {effect:'none', duration:'0.5s'},
                effect = inConfig.formTransition || inConfig.formtransition;

            if(!effect || effect === 'none') inTrans = null;
            else inTrans.effect = $KW.formTransitionsMatrix[effect];

            return {inTrans:inTrans, outTrans:null};
        }
    };
    

    var module = {
        initialize: function() {
            voltmx.events.addEvent("onresize", "Form", this.resizeHandler);
            voltmx.events.addEvent("onorientationchange", "Form", this.orientationHandler);
        },

        initializeView: function(formId, isForm) {
            
            var widgetsSupported = [$KW.Label, $KW.Calendar, $KW.Segment, $KW.TabPane, $KW.Line, $KW.Switch, $KW.TextField, $KW.DataGrid, $KW.Media, $KW.Slider, $KW.Map, $KW.FlexContainer, $KW.FlexScrollContainer, $KW.Browser, $KW.CollectionView, $KW.ListBox];
            for(var i = 0; i < widgetsSupported.length; i++) {
                if(widgetsSupported[i]) {
                    widgetsSupported[i].initializeView && widgetsSupported[i].initializeView(formId);
                }
            }
            if(isForm) {
                module.resizeForm(formId);
            }

            var pageBody = document.getElementsByTagName('body')[0];
            var bodywidth = pageBody.style.width;
            if(!pageBody.hasAttribute("bodywidth") && bodywidth.indexOf("%") !== -1) {
                pageBody.setAttribute("bodywidth", bodywidth);
            }
            var width = ($KG.appbehaviors["responsive"] === true) ? $KU.getWindowWidth() : screen.width;
            module.adjustBodyWidth(formId, width);
        },

        updateView: function(formModel, propertyName, propertyValue, oldPropertyValue) {
            switch(propertyName) {
                case "title":
                    document.title = propertyValue || $KG.apptitle || $KG.appid;
                    formModel.i18n_title = "";
                    break;

                case "padding":
                    var element = document.getElementById(formModel.id);
                    if(!$KG.needScroller)
                        element && (element.style[propertyName] = $KU.joinArray(propertyValue, "% ") + "%");
                    break;
            }
        },

        breakpointChanged: function(formModel, width) {
            var flag = false,
                previousBreakPoint = -1,
                currentBreakpoint = -1;

            previousBreakPoint = (typeof $KG["__currentFormBreakpoint"] === 'number') ? $KG["__currentFormBreakpoint"] : -1;
            currentBreakpoint = module.getCurrentBreakpoint(formModel, width);

            if(previousBreakPoint !== currentBreakpoint) {
                flag = true;
                $KG["__currentFormBreakpoint"] = currentBreakpoint;
            }
            return flag;
        },

        resizeHandler: function(formModel, width) {
            var resizeEventRef = null;

            if($KG.appbehaviors["responsive"] !== true) return;

            if(module.breakpointChanged(formModel, width)) {
                voltmx.events.executeActionOnComponent([formModel], {
                        "eventType": "onbreakpointhandler",
                        "execActionBeforeChildFlag": false,
                        "bodyWidth": $KG["__currentFormBreakpoint"]
                });
                voltmx.events.executeActionOnComponent([formModel], {
                        "eventType": "onbreakpointchange",
                        "execActionBeforeChildFlag": false,
                        "bodyWidth": $KG["__currentFormBreakpoint"]
                });
            }

            resizeEventRef = $KU.returnEventReference(formModel.onresize);
            if(resizeEventRef) {
                $KU.executeWidgetEventHandler(formModel, resizeEventRef, width);
            }

            module.adjustBodyWidth(formModel.id, width);

            if(window.scrollY && voltmx.appinit.isiPhone && voltmx.appinit.isSafari) {
                window.scrollTo(0, 0);
            }
        },
        orientationHandler: function(formId, orientation) {
            var formModel = $KU.getFormModel(formId);
            var formevntref = $KU.returnEventReference(formModel.preorientationchange);
            formevntref && $KU.executeWidgetEventHandler(formModel, formevntref, orientation);
            
            if(formModel) {
                spaAPM && spaAPM.sendMsg(formModel, 'onorientationchange', {
                    "orientation": orientation
                });
                var formref = $KU.returnEventReference(formModel.onorientationchange);
                formref && $KU.executeWidgetEventHandler(formModel, formref, orientation);
                module.initializeFlexContainersIfNeeded(formModel, function() {
                    module.setFormDimensions($KG["__currentForm"]);
                });
            }
        },

        setFormDimensions: function(formModel) {
            if($KW.FlexUtils.isFlexContainer(formModel)) {
                var formNode = document.getElementById(formModel.id);
                if(formNode) {
                    formNode.style.height = module.getFormHeight();
                    module.adjustBodyWidth(formModel.id, $KU.getWindowWidth());
                }
            }
        },

        generateAppmenu: function(formModel) {
            var more_container = document.getElementById('appmenumore_container');
            if(more_container)
                more_container.parentNode.removeChild(more_container);
            if($KG.__appmenu && formModel.needappmenu)
                return $KW["Appmenu"] && $KW["Appmenu"].render($KG.__appmenu);
            else
                return "";
        },

        initializeTemplates: function(tempID) {
            $KW.touch.computeSnapWidths(tempID, "Segment");
            this.initializeTouchWidgets(tempID);
        },

        initializeTouchWidgets: function(formId, isForm) {
            $KW.Scroller.initializeScrollBoxes(formId); 
            $KW.Scroller.initializePageViews(formId); 
            this.initializeView(formId, isForm);
        },

        initializeFlexContainers: function(formModel) {
            $KG.isUILayedOut = false;
            if(!formModel)
                return;
            var formId = $KG.needScroller ? formModel.id + "_container" : formModel.id;
            $KW.touch.computeSnapWidths(formId, "Segment"); 
            this.initializeFlexContainersInTemplate(formModel);
            
            if($KG[formModel.id + '_scroller']) 
                $KW.Scroller.setHeight(formModel.id);
            this.initializeAllFlexContainers(formModel);
            $KG.isUILayedOut = true;
        },

        initializeFlexContainersInTemplate: function(formModel) {
            if(formModel.headers && formModel.headers.length > 0) {
                this.initializeBox(formModel.headers[0], $KG["needScroller"] ? formModel.id + "_header" : 'header_container');
            }
            if(formModel.footers && formModel.footers.length > 0) {
                this.initializeBox(formModel.footers[0], $KG["needScroller"] ? formModel.id + "_footer" : 'footer_container');
            }
        },

        initializeBox: function(boxModel, id){
            var flexNode;
            if(boxModel.wType == 'FlexContainer') {
                flexNode = document.querySelector('#' + id + ' div[kwidgettype="FlexContainer"]');
                if(flexNode) {
                    flexNode = flexNode.parentNode;
                }
                $KW.FlexContainer.forceLayout(boxModel, flexNode);
            } else {
                this.initializeFlexContainersInBox(boxModel);
            }
        },

        initializeAllFlexContainers: function(containerModel) {
            if($KW.FlexUtils.isFlexContainer(containerModel)) {
                containerModel.forceLayout();
                module.initializeAllFlexScrollContainers(containerModel);
                return;
            }
            this.initializeFlexContainersInBox(containerModel);
        },

        initializeAllFlexScrollContainers: function(formModel) {
            var flexNode, flexScrollModel, id, flexScrollElements, i, flexScrollNode;
            id = formModel.id;
            flexScrollElements = document.querySelectorAll('#' + id + ' div[kwidgettype="FlexScrollContainer"]');
            if(flexScrollElements) {
                for(i = 0; i < flexScrollElements.length; i++) {
                    flexScrollNode = flexScrollElements[i];
                    flexScrollModel = $KU.getModelByNode(flexScrollNode);
                    $KW.FlexContainer.forceLayout(flexScrollModel);
                }
            }
        },

        initializeFlexContainersInBox: function(boxModel) {
            var wArray = boxModel.ownchildrenref;
            var containerType = boxModel.wType;
            for(var i = 0; i < wArray.length; i++) {
                var widgetModel = wArray[i];
                var wType = widgetModel.wType;
                if(containerType == 'TabPane' && !$KW.TabPane.isActiveTab(boxModel, widgetModel)) {
                    if(boxModel.viewtype != constants.TABPANE_VIEW_TYPE_PAGEVIEW)
                        continue;
                }
                switch(wType) {
                    case "FlexContainer":
                    case "FlexScrollContainer":
                        widgetModel.forceLayout();
                        break;
                    case "Segment":
                        var segNode = $KU.getNodeByModel(widgetModel);
                        if(segNode) {
                            if(widgetModel.layoutConfig.self)
                                $KU.needOptimization = false;
                            widgetModel.isvisible && $KW.FlexContainer.adjustFlexContainers(widgetModel, segNode);
                            if(widgetModel.viewtype == constants.SEGUI_VIEW_TYPE_PAGEVIEW)
                                $KW.touch.computeWidths(segNode, widgetModel);
                            $KU.needOptimization = true;
                        }
                        break;
                }

                if((widgetModel.wType == 'TabPane') && widgetModel.ownchildrenref) {
                    this.initializeFlexContainersInBox(widgetModel);
                }
            }
        },

        updateContaineri18nProperties: function(formModel) {
            if(formModel.headers && formModel.headers.length > 0) {
                for(var header in formModel.headers) {
                    $KI.i18n.translateFormModel(formModel.headers[header]);
                }
            }

            if(formModel.footers && formModel.footers.length > 0) {
                for(var footer in formModel.footers) {
                    $KI.i18n.translateFormModel(formModel.footers[footer]);
                }
            }
        },

        destroyTouchWidgets: function(formId, isNonForm) {
            $KW.Utils.removeSensitiveText(formId);
            if(!isNonForm)
                $KW.Scroller.destroyFormScroller(formId);

            $KW.Scroller.destroyScrollBoxes(formId);
            $KW.Scroller.destroyCollectionViewScroller(formId);
            $KW.Scroller.destroyImageStripStripViews(formId);
            $KW.Scroller.destroyPageViews(formId);
            $KW.Segment && $KW.Segment.destroyAnimations(formId);
            $KW.Scroller.destroyListBoxEditableInstances();
        },

        handleFormVisibility: function(containerModel) {
            var childList, i, childModel;
            childList = containerModel.children;
            for(i = 0; i < childList.length; i++) {
                childModel = containerModel[containerModel.children[i]];
                childModel = $KW.Utils.getActualWidgetModel(childModel);
                delete childModel._isRendered;
                
                if(childModel.children && childModel.children.length > 0) {
                    module.handleFormVisibility(childModel)
                }
            }
        },


        formRendered: function(formModel) {
            voltmx.events.browserback.updateURLWithLocation(formModel.id, formModel.appName);
            module.enlistSystemTimerActions();
            if($KU.isWindowsPhone && $KU.isIE9)
                window.scrollTo(0, 0);
            else if($KG.nativeScroll)
                window.scrollTo(0, 1);
        },

        resizeForm: function(formId, orientation) {
            var formModel = $KU.getFormModel(formId);
            
            if($KG["nativeScroll"]) {
                var viewPortHeight = ($KU.isWindowsPhone && $KU.getPlatform().version == "7.5") ? ($KW.Utils.getViewPortHeight() + 10) : $KW.Utils.getViewPortHeight();
                document.body.style.minHeight = viewPortHeight + "px";
            }

            if(voltmx.appinit.isTablet && voltmx.appinit.isAndroid && (voltmx.constants.APPLICATION_MODE_HYBRID || voltmx.constants.APPLICATION_MODE_WRAPPER)) {
                document.body.style.minHeight = (screen.height / window.devicePixelRatio - window.screenTop) + 'px';
            }

            if(formModel.resizeForm && $KG["nativeScroll"]) {
                var windowHeight = window.innerHeight || document.body.clientHeight;
                var formNode = document.getElementById(formId);
                var totalHeight, formHeight;

                var totalHeight = __MainContainer.clientHeight;
                var formHeight = formNode.clientHeight;

                
                if(!orientation) {
                    totalHeight = __MainContainer.__clientHeight = __MainContainer.clientHeight;
                    formHeight = formNode.__clientHeight = formNode.clientHeight;
                } else {
                    totalHeight = __MainContainer.__clientHeight;
                    formHeight = formNode.__clientHeight;
                }

                
                if(totalHeight < windowHeight) {
                    var bias = windowHeight - totalHeight;
                    formHeight = formHeight + bias;
                    formNode.style.minHeight = formHeight + "px";

                    if($KU.isWindowsPhone && $KU.isIE9)
                        setTimeout(function() {
                            window.scrollTo(0, 0)
                        }, 10);
                    else
                        setTimeout(function() {
                            window.scrollTo(0, 1)
                        }, 10);
                }
            }
        },

        enlistSystemTimerActions: function() {
            
            if($KU.hashChange) {
                voltmx.events.addEventListener(window, 'hashchange', voltmx.events.browserback.handleBrowserBackEvent);
            } else {
                var browserBackAction = new voltmx.system.timers.TimerAction(voltmx.events.browserback.handleBrowserBackEvent, 300);
                voltmx.system.timers.registerTimerAction(browserBackAction);
            }
        },


        addChild: function(formModel, wArray, bVisibility) {
            if($KG.__hotReload) return;
            if($KG["__currentForm"] && formModel.id == $KG["__currentForm"].id) {

                var formNode = $KU.getElementById(formModel.id);
                if(!formNode)
                    return;
                if(!$KW.FlexUtils.isWidgetAllowedIntoResponsive(formModel, wArray)) {
                    throw new VoltmxError(100, "Error",
                            "Invalid Input, trying to add a invalid widget added to FlexContainer responsive layout");
                }
                voltmx.events.executeActionOnComponent(wArray, {
                        "eventType" : "preshow",
                        "execActionBeforeChildFlag" : true
                        });


                $KU.updatei18nProperties(wArray);
                var htmlString = "";
                if(wArray.length > 0) {
                    htmlString = this.renderChildren(formModel, wArray);
                }

                    var wrapper = document.createElement("div");
                wrapper.innerHTML = htmlString;
                while(wrapper.children.length > 0) {
                    formNode.appendChild(wrapper.children[0]);
                }
                $KU.layoutNewWidgets(formModel, wArray);
                $KW.Utils.initializeNewWidgets(wArray);
                voltmx.events.executeActionOnComponent(wArray, {
                        "eventType" : "postshow",
                        "execActionBeforeChildFlag" : false
                        });
            }
        },

        addChildAt: function(formModel, widget, index) {
            if($KG.__hotReload) return;
            if($KG["__currentForm"] && formModel.id == $KG["__currentForm"].id) {
                var formNode = $KU.getElementById(formModel.id);
                var wArray = [widget];
                if(!$KW.FlexUtils.isWidgetAllowedIntoResponsive(formModel, wArray)) {
                    throw new VoltmxError(100, "Error",
                            "Invalid Input, trying to add a invalid widget added to FlexContainer responsive layout");
                }
                voltmx.events.executeActionOnComponent(wArray, {
                        "eventType" : "preshow",
                        "execActionBeforeChildFlag" : true
                        });

                if(!formNode)
                    return;
                $KU.updatei18nProperties(wArray);

                var htmlString = "";
                var isFlexContainer = $KW.FlexUtils.isFlexContainer(formModel);
                if(isFlexContainer)
                    htmlString = $KW.FlexContainer.renderChildren(formModel, [formModel[widget.id]], {});
                else
                    htmlString = module.generateWidget(formModel, formModel[widget.id]);

                
                var outerDiv = document.createElement("div");
                outerDiv.innerHTML = htmlString;


                formNode.insertBefore(outerDiv.childNodes[0], formNode.children[index] || null);
                $KU.layoutNewWidgets(formModel, wArray);
                $KW.Utils.initializeNewWidgets(wArray);
                voltmx.events.executeActionOnComponent(wArray, {
                        "eventType" : "postshow",
                        "execActionBeforeChildFlag" : false
                        });
            }
        },

        DOMremove: function(formModel, widgetref) {
            if($KG["__currentForm"] && (formModel.id == $KG["__currentForm"].id) && widgetref) {
                var isFlexContainer = $KW.FlexUtils.isFlexContainer(formModel);
                if(isFlexContainer) {
                    var node = $KW.Utils.getWidgetNode(widgetref);
                    if(node) {
                        node = node.parentNode;
                        node.parentNode.removeChild(node);
                    }
                } else {
                    var node = document.getElementById(formModel.id + "_" + widgetref.id);
                    if(node) {
                        node = $KU.returnParentChildBloatAdjustedNode(widgetref, node);
                        node.parentNode.removeChild(node);
                    }
                }
            }
        },

        DOMremoveAt: function(formModel, index) {
            module.DOMremove(formModel, formModel.ownchildrenref[index]);
        },

        DOMremoveAll: function(formModel) {
            var form = document.getElementById(formModel.id);
            if(form) {
                form.innerHTML = "";
            }
        },

        
        add: function() {
            var formmodel = arguments[0];
            if("add" in formmodel) {
                var widarray = [].slice.call(arguments, 1);
                formmodel.add(widarray)
            }
        },

        addAt: function(formModel, widgetref, index) {
            if(widgetref == null) return;
            formModel.addAt && formModel.addAt(widgetref, index);
        },

        remove: function(formModel, widgetref) {
            formModel.remove && formModel.remove(widgetref);
        },

        removeAt: function(formModel, index) {
            if(formModel.removeAt)
                return formModel.removeAt(index);
        },

        widgets: function(formModel) {
            return formModel.widgets && formModel.widgets();
        },

        scrollToBeginning: function(formModel) {
            var form = $KU.getElementById(formModel.id + "_container");
            form && $KW.Utils.animateY(window.pageYOffset, 0);
        },

        scrollToEnd: function(formModel) {
            var form = $KU.getElementById(formModel.id + "_container");
            form && $KW.Utils.animateY(window.pageYOffset, form.scrollHeight);
        },

        scrollToWidget: function(formref, widgetref) {
            $KW.APIUtils.setfocus(widgetref);
        },

        destroy: function(formID) {
            if(formID && "destroy" in formID) formID.destroy();
        },

        getCurrentBreakpoint: function() {
            var formModel = null,
                width = -1,
                breakpoints = [],
                b = 0,
                blen = 0,
                currentBreakpoint = -1;

            if($KG.appbehaviors["responsive"] === true) {
                if(typeof $KG["__currentFormBreakpoint"] === 'number' &&
                    $KG["__currentFormBreakpoint"] >= 0 && arguments.length < 2) {
                    currentBreakpoint = $KG["__currentFormBreakpoint"];
                } else {
                    formModel = (arguments.length >= 1) ? arguments[0] : $KG["__currentForm"];
                    breakpoints = (formModel) ? formModel.breakpoints : null;

                    if(!(breakpoints instanceof Array && breakpoints.length > 0)) {
                        breakpoints = $KG.appbehaviors["breakpoints"];

                        if(!(breakpoints instanceof Array && breakpoints.length > 0)) {
                            breakpoints = null;
                        }
                    }

                    if(breakpoints && breakpoints.length > 0) {
                        width = (arguments.length >= 2) ? arguments[1] : $KU.getWindowWidth();
                        blen = breakpoints.length;

                        if(width > breakpoints[(blen - 1)]) {
                            currentBreakpoint = constants.BREAKPOINT_MAX_VALUE;
                        } else if(width <= breakpoints[0]) {
                            currentBreakpoint = breakpoints[0];
                        } else {
                            for(b = 1; b < blen; b++) {
                                if(width <= breakpoints[b]) {
                                    currentBreakpoint = breakpoints[b];
                                    break;
                                }
                            }
                        }
                    }
                }
            }

            return currentBreakpoint;
        },

        getCurrentForm: function() {
            $KU.logExecuting('voltmx.application.getCurrentForm');
            $KU.logExecutingWithParams('voltmx.application.getCurrentForm');
            $KU.logExecutingFinished('voltmx.application.getCurrentForm');
            return $KG["__currentForm"];
        },

        getPreviousForm: function() {

            $KU.logExecuting('voltmx.application.getPreviousForm');
            $KU.logExecutingWithParams('voltmx.application.getPreviousForm');
            $KU.logExecutingFinished('voltmx.application.getPreviousForm');
            return $KG["__previousForm"];
        },

        
        handleshow: function(formModel) {
            if("show" in formModel)
                formModel.show();
        },

        
        generateWidget: function(formModel, childModel) {
            var context = new $KW.WidgetGenerationContext(formModel.id);
            var childType = childModel.wType;
            var htmlString = "";

            
            if(childType == "Line" || childType == "TabPane") {
                context.setTopLevelBox(true);
                htmlString += $KW[childType] && $KW[childType].render(childModel, context);
                context.setTopLevelBox(false);
            } else {
                if(childType == "Image") childModel.containerweight = 100;
                var layoutDirection = $KW.skins.getWidgetAlignmentSkin(childModel);
                htmlString += "<div class = ' kwt100 " + layoutDirection + "' >";
                htmlString += $KW[childType] && $KW[childType].render(childModel, context);
                htmlString += "</div>";
            }
            return htmlString;
        },



        

        

        getDeviceSpecificClass: function() {
            var deviceName = this.getDeviceDetails(),
            browserName = this.getBrowserDetails(),
            clientDetails = deviceName + ' ' + browserName;

            return clientDetails;
        },

        getDeviceDetails: function() {
            var deviceName = '';

            if(voltmx.appinit.isiPhone) {
                deviceName = 'iPhone';
            } else if(voltmx.appinit.isiPad) {
                deviceName = 'iPad';
            }

            return deviceName;
        },

        getBrowserDetails: function() {
            var browserName = '';

            if(voltmx.appinit.isSafari) {
                browserName = 'safari';
            } else if(voltmx.appinit.isChrome) {
                browserName = 'chrome';
            }

            return browserName;
        },
        render: function(formModel) {
            var htmlString = "", fClass = "", tempDiv = null;
            var pageBody = document.getElementsByTagName('body')[0];

            var main = $KU.getElementById("__MainContainer"); 
            if(!($KG.appbehaviors && $KG.appbehaviors["stopLoadingScreenDismissOnFormNavigation"] === true) && !main) {
                pageBody.innerHTML = "<div id='__MainContainer'>";
                main = $KU.getElementById("__MainContainer");
            }
            
            if($KG["__previousForm"]) {
                var prevformhintid = $KG["__previousForm"].id + "-hint";
                var hintwraper = document.getElementById(prevformhintid);
                if(hintwraper) {
                    document.body.removeChild(hintwraper);
                }
            }

            htmlString += "<div id='" + formModel.id + "_container'"+(formModel.skin ? (" class='"+formModel.skin+"'") : "")+" style='padding:" + $KU.joinArray(formModel.padding, "% ") + "%" + "'>";
            htmlString += formModel.header ? this.generateHeader(formModel.header, "header") : "";
            htmlString += this.generateForm(formModel);
            htmlString += formModel.footer ? this.generateHeader(formModel.footer, "footer") : "";
            htmlString += "</div>";

            if(_newFormTransitionApplicable(formModel, 'in')
            || _newFormTransitionApplicable(formModel, 'out')) {
                tempDiv = document.createElement('DIV');
                tempDiv.innerHTML = htmlString;
                main.appendChild(tempDiv.firstChild);
            } else {
                main.innerHTML = htmlString;
            }

            var wrapper = document.createElement("div");
            var appMenuHtml = "<div id='appmenu_container' style='position:fixed;bottom:0px;width:100%'>" + this.generateAppmenu(formModel) + "</div>";
            wrapper.innerHTML = appMenuHtml;

            main.appendChild(wrapper.firstChild);

            if($KW.Map && $KW.Map.isMainContaineraVailable == false)
                $KW.Map.loadMapScripts();

            var appMenu = $KU.getElementById("appmenu_container");
            if(appMenu) { 
                appMenu.parentNode.style.paddingBottom = appMenu.offsetHeight + "px";
            }

            formModel.header && this.initializeTemplates(formModel.header);
            formModel.footer && this.initializeTemplates(formModel.footer);
            pageBody.className = this.getDeviceSpecificClass();
            document.title = formModel.title || $KG["apptitle"] || $KG["appid"];

            $KU.deduceTopLevelFlexModal(formModel);
        },

        generateForm: function(formModel) {
            var htmlString = "";

            if(formModel.layouttype == voltmx.flex.RESPONSIVE_GRID) {
                var style = $KW.FlexUtils.getResponsiveContainerLayoutStyle(formModel);
                htmlString += "<form id='" + formModel.id + "' action= 'javascript:;' class='kwt100' style='"+ style +"'>";
            } else {
               htmlString += "<form id='" + formModel.id + "' action= 'javascript:;' class='kwt100' style='position:relative;' " + ">";
            }


            
            if(formModel.children) {

                if(formModel.layouttype == constants.CONTAINER_LAYOUT_GRID) { 
                    var context = new $KW.WidgetGenerationContext(formModel.id);
                    htmlString += $KW.Grid.render(formModel, context);
                } else {

                    var wArrary = formModel.widgets();
                    htmlString += this.renderChildren(formModel, wArrary);
                }
            }


            htmlString += "</form>";
            return htmlString;
        },

        renderChildren: function(formModel, wArrary) {
            var htmlString = "";
            if(formModel.layouttype == voltmx.flex.VBOX_LAYOUT) {
                for(var i = 0; i < wArrary.length; i++) {
                    var childModel = wArrary[i];
                    htmlString += module.generateWidget(formModel, childModel);
                }
            } else {
                var context = new $KW.WidgetGenerationContext(formModel.id);
                htmlString += $KW.FlexContainer.renderChildren(formModel, wArrary, context);
            }
            return htmlString;
        },

        generateHeader: function(headerID, type) {
            var htmlString = "";
            htmlString += "<div id='" + type + "_container' class='kwt100'>";
            htmlString += this.generateTemplate(headerID, type);
            htmlString += "</div>";
            return htmlString;
        },

        
        generateTemplate: function(headerID, type, context) {
            var headerModel = voltmx.model.getWidgetModel(headerID);
            var htmlString = "";
            if(headerModel.children) {
                if(context && context.rowtemplate) {
                    return $KW[context.rowtemplate.wType].render(headerModel, context);
                }
                htmlString = "<div id='" + headerModel.id + "' kformname='" + headerModel.pf + "'";
                if(type == "menu" || type == "menuitem") {
                    if(headerModel.skin) htmlString += " class='" + headerModel.skin + "'";
                    htmlString += " mtype='" + type + "' ";
                }

                if(context && context.menuType === constants.MENU_CONTAINER_VIEW_TYPE_TREEVIEW && type == "menu") {
                    htmlString += " class='toggle' ";
                }

                htmlString += ">";
                for(var i = IndexJL; i < headerModel.children.length; i++) {
                    var childModel = headerModel[headerModel.children[i]];
                    var tempContext = new $KW.WidgetGenerationContext(headerModel.id);
                    if(context) {
                        tempContext.tabpaneID = context.tabpaneID;
                        tempContext.container = context.container;
                    }
                    tempContext.setTopLevelBox(true);
                    htmlString += $KW[childModel.wType].render(childModel, tempContext);
                    tempContext.setTopLevelBox(false);
                }
                htmlString += "</div>"
            }
            return htmlString;
        },

        show: function(formModel) {
            if($KG.appbehaviors["recording"] == true) {
                this.removeDomChangeEvents();
            }

            if($KG["localization"] && !$KG["i18nInitialized"])
                $KI.i18n.setdefaultlocale($KG["defaultlocale"], module.extendShow(formModel))
            else
                module.extendShow(formModel)();
        },

        extendShow: function(formModel) {
            return function() {
                var formNode = null,
                    fHeight = '',
                    prevNode = null;

                if(formModel) {
                    
                    if(formModel.enabledforidletimeout && $KG["__idletimeout"] && $KG["__idletimeout"].expired && $KG["__idletimeout"].enabled) {
                        $KG["__idletimeout"].cb && $KG["__idletimeout"].cb(formModel);
                        $KG["__idletimeout"].expired = false;
                        $KG["__idletimeout"].cb = null;
                        return;
                    }

                    
                    
                    if(!$KG["transitAll"])
                        $KG["transitAll"] = true;

                    if(!formModel.initialized) {
                        
                        
                        
                        
                        
                        
                        
                    }

                    var curForm = $KG["__currentForm"];
                    if(curForm && curForm.id != formModel.id) {
                        voltmx.events.executeActionOnContainer(curForm, {
                            "eventType" : "onhide",
                            "execActionBeforeChildFlag" : false
                        });
                        spaAPM && spaAPM.sendMsg(curForm, 'onhide');
                        var curref = $KU.returnEventReference(curForm.onhide);
                        curref && $KU.executeWidgetEventHandler(curForm, curref);
                    }
                    if($KG["__currentForm"] && formModel.id !== curForm.id) {
                        $KG["__previousForm"] = $KG["__currentForm"];
                    }

                    var rendered = false;
                    voltmx.isformRendered = false;
                    $KG["__currentForm"] = formModel;
                    $KG["__currentFormBreakpoint"] = -1;

                    var prevForm = $KG["__previousForm"];
                    if(prevForm && curForm.id == formModel.id) {
                        rendered = true;
                        voltmx.isformRendered = true;
                    }
                    if($KG.__hotReload) {
                        rendered = false;
                        voltmx.isformRendered = false;
                        $KG.__hotReload = false;
                    }

                    if(formModel.preshow) {
                        var preref = $KU.returnEventReference(formModel.preshow);
                        $KU.executeWidgetEventHandler(formModel, preref);
                    }

                    voltmx.events.executeActionOnContainer(formModel, {
                        "eventType" : "preshow",
                        "execActionBeforeChildFlag" : true
                        });

                    
                    if(!rendered) {
                        if($KG["localization"]) {
                            $KI.i18n.translateFormModel(formModel);
                            module.updateContaineri18nProperties(formModel);
                        }
                        if(prevForm) {
                            if(prevForm.retainscrollposition) {
                                var prevFormNode = document.getElementById(prevForm.id);
                                if(prevFormNode)
                                    prevForm.y =   document.getElementById(prevForm.id).scrollTop;

                            }
                            prevFormNode && module.destroyTouchWidgets(prevForm.id, "");
                            if($KG.appbehaviors["lazyLoadDOM"] == true) {
                                module.handleFormVisibility(prevForm);
                            }
                        }
                        module.resizeHandler(formModel, $KU.getWindowWidth());
                        if(prevForm && (voltmx.appinit.isMob || voltmx.appinit.isTablet)) { 
                            prevNode = $KU.getNodeByModel(prevForm);
                            fHeight = prevNode.style.height;
                        }
                        module.render(formModel);
                        module.formRendered(formModel);
                        module.adjustBodyWidth(formModel.id);
                        if((voltmx.appinit.isMob || voltmx.appinit.isTablet) && prevForm && $KW.FlexUtils.isFlexContainer(formModel) && $KW.FlexUtils.isFlexContainer(prevForm)) {
                            formNode = $KU.getNodeByModel(formModel);
                            formNode.style.height = fHeight;
                            formNode.style.overflowY = "auto";
                            formNode.style.overflowX = "hidden";
                        } else {
                            module.setFormHeight(formModel);
                        }
                        module.initializeFlexContainers(formModel);
                        $KW.Utils.initializeFormGestures(formModel);

                        if($KW.FlexUtils.isFlexContainer(formModel)) {
                            $KW.Utils.initializeScrollEvents(document.querySelectorAll('#' + formModel.id), formModel);
                        }

                        module.applyTransition($KG["__previousForm"], formModel);


                        if(!voltmx.system.activity.hasActivity()) {
                            $KW.unLoadWidget();
                        }
                        if(appConfig.testAutomation && window.jasmineOnload) {
                            window.jasmineOnload();
                        }
                        if(voltmx.constants.APPSTATE === 0) {
                            voltmx.constants.APPSTATE = 1;
                            if(!voltmx.events.isFrameworkEventsRegistered)
                                voltmx.events.registerDocumentEvents();
                            $KIO.fs.init(); 
                        }
                        voltmx.isformRendered = true;
                        spaAPM && spaAPM.sendMsg(formModel, 'show');
                    } else {
                        module.resizeHandler(formModel, $KU.getWindowWidth());
                        voltmx.events.executeActionOnContainer(formModel, {
                            "eventType" : "postshow",
                            "execActionBeforeChildFlag" : false
                            });
                        if(formModel.postshow) {
							var postref = $KU.returnEventReference(formModel.postshow);
							$KU.executeWidgetEventHandler(formModel, postref);
						}
                        $KW.FlexUtils.isFlexContainer(formModel) && formModel.forceLayout();
                        if($KC.widgetDataRecording == true) {
                            $KC.generateFormJSONAfterRender(formModel);
                        }
                    }

                    if($KC.widgetDataRecording == true) {
                        $KI.setupWidgetDataRecording({mode:1}); 
                    }

                    $KW.TPW.renderWidget(formModel.id);
                    formModel.initialized = true;
                }
            }
        },

        applyTransition: function(previousForm, currentForm) {
            var src, dest, ev, outTrans, inTrans, trans;

            src = previousForm && $KU.getElementById(previousForm.id + "_container");
            dest = $KU.getElementById(currentForm.id + "_container");

            if(previousForm && $KW.FlexUtils.isFlexContainer(previousForm)) {
                clearInterval(previousForm.scrollerTimer);
            }

            inTrans = currentForm.intransitionconfig;
            outTrans = (previousForm && inTrans) ? previousForm.outtransitionconfig : null;

            if(inTrans) {
                if(_newFormTransitionApplicable(currentForm, 'in')) {
                    if(typeof inTrans.formAnimation === 'number'
                    || typeof inTrans.formanimation === 'number') {
                        trans = _normalizeTransition.number(inTrans, outTrans);
                    }
                } else {
                    trans = _normalizeTransition.string(inTrans);
                }

                inTrans = trans.inTrans;
                outTrans = trans.outTrans;
            }

            if(!$KG["disableTransition"] && (inTrans || outTrans)) {
                ev = (voltmx.appinit.isFirefox || voltmx.appinit.isIE11) ? "animationend" : $KU.animationEnd;

                currentForm.__ev = function(srcForm, destForm, currForm, prevForm, ev) {
                    return function(event) {
                        if(!event)
                            event = window.event;
                        currForm.__ev = "";
                        if(event.type == ev) {
                            voltmx.events.removeEventListener(destForm, event.type, arguments.callee);
                            destForm.style[$KU.animationName] = "";
                            destForm.style[$KU.animationDuration] = "";
                        }
                        module.endTransition(srcForm, destForm, currForm, prevForm);
                    }
                }(src, dest, currentForm, previousForm, ev);

                voltmx.events.addEventListener(dest, ev, currentForm.__ev);
                var isFlexForm = $KW.FlexUtils.isFlexContainer(currentForm);
                if(isFlexForm) {
                    document.body.style.overflowX = document.body.style.overflowY = 'hidden';
                    dest.parentNode.style.height = dest.firstChild.style.height;
                }

                if(src && outTrans) {
                    src.style.position = 'absolute';
                    src.style.left = '0px';
                    src.style.top = '0px';
                    src.style.overflow = 'hidden';
                    src.style.width = '100%';
                }

                if(inTrans) {
                    dest.style.zIndex = 2147483646;
                    dest.style.position = 'absolute';
                    dest.style.left = '0px';
                    dest.style.top = '0px';
                    dest.style.overflow = 'hidden';
                    dest.style.width = '100%';
                }

                if(src && outTrans) {
                    src.style[$KU.animationDuration] = outTrans.duration;
                    src.style[$KU.animationName] = outTrans.effect;
                }

                if(inTrans) {
                    dest.style[$KU.animationDuration] = inTrans.duration;
                    dest.style[$KU.animationName] = inTrans.effect;
                }
            } else {
                $KU.removeClassName(dest, "hidden");
                dest.style.display = "";
                this.endTransition(src, dest, currentForm, previousForm);
            }
        },

        endTransition: function(src, dest, currentForm, previousForm) {
            var main = $KU.getElementById("__MainContainer");

            if(src) {
                if(previousForm.__ev) {
                    
                    previousForm.__ev();

                }

                if(src.nextSibling.id === 'appmenu_container') {
                    main.removeChild(src.nextSibling);
                }
                main.removeChild(src);
            }

            
            
            document.body.style.removeProperty('overflow-y');
            main.style.removeProperty('height');
            dest.style.removeProperty('position');
            dest.style.removeProperty('left');
            dest.style.removeProperty('right');
            dest.style.removeProperty('width');
            dest.style.removeProperty('overflow');
            dest.style.removeProperty('z-index');

            module.initializeTouchWidgets(currentForm.id);
            var mapCanvasElement = document.querySelectorAll('[name=map_canvas]')[0];
            var scriptloaded = $KG["mapScriptLoaded"];
            if(mapCanvasElement && scriptloaded)
                $KW.Map.setUpInteractiveCanvasMap();

            $KG["__previousForm"] && window.scrollTo(0, 0);
            
            if(currentForm.retainscrollposition) {
                if(typeof currentForm.y == "undefined")
                    currentForm.y = 0;
                var isFlexForm = $KW.FlexUtils.isFlexContainer(currentForm);
                if(isFlexForm) {
                    var currformid = currentForm.id;
                    document.getElementById(currformid).scrollTop = currentForm.y;
                }
                else {
                    window.scrollTo(0, currentForm.y);
                }
            }
            voltmx.events.executeActionOnContainer(currentForm, {
                                        "eventType" : "postshow",
                                        "execActionBeforeChildFlag" : false
                                        });
            if($KC.widgetDataRecording == true) {
                $KC.generateFormJSONAfterRender(currentForm);
            }
            if(currentForm.postshow) {
                var postref = $KU.returnEventReference(currentForm.postshow);
                $KU.executeWidgetEventHandler(currentForm, postref);
            }
            $KW.FlexUtils.isFlexContainer(currentForm) && currentForm.forceLayout();
            if(spaAPM && typeof appStartTime !== "undefined") {
                var curTime = new Date().getTime();
                var timeDiff = curTime - appStartTime;
                spaAPM.sendMsg(currentForm, 'AppLoad', {
                    "loaddur": timeDiff
                });
            }
        },

        getScrollbarWidth: function() {
            var el = document.createElement('div');
            el.style.cssText += 'width:100px;height:100px;overflow:scroll;position:absolute;';
            document.body.appendChild(el);
            var diff = el.offsetWidth - el.clientWidth;
            document.body.removeChild(el);
            return diff;

        },

        adjustBodyWidth: function(formId, width) {
            var pageBody = document.getElementsByTagName('body')[0];
            var formWidth = '',
                bodywidth = pageBody.getAttribute("bodywidth");

            if(($KG.appbehaviors["responsive"] === true) && (!bodywidth || typeof width !== 'number')) {
                return;
            }

            if(!bodywidth) { 
                return;
            }

            if(bodywidth.indexOf("%") != -1) {
                bodywidth = parseInt(bodywidth.replace("%", ""), 10);
                pageBody.setAttribute("percentage", "true");
                formWidth = (width / 100) * bodywidth;
                pageBody.setAttribute("formWidth", formWidth);
            }

            formWidth = pageBody.getAttribute("formWidth");

            pageBody.style["overflow-x"] = "auto";
            pageBody.style["overflowX"] = "auto";

            var scroller = document.getElementById(formId + "_wrapper");

            var scrollerWidth = this.getScrollbarWidth();

            
            
            var hasVScroll = document.body.scrollHeight - (window.innerHeight || document.documentElement.clientHeight);
            
            if(hasVScroll > 1) {
                pageBody.style.width = (formWidth - scrollerWidth) + "px";
            } else {
                pageBody.style.width = formWidth + "px";
            }
        },

        getFormHeight: function() {
            var computedStyle = $KU.getComputedStyle(document.body);
            var formBorderTop = parseInt(computedStyle['border-top-width'], 10);
            var formBorderBottom = parseInt(computedStyle['border-bottom-width'], 10);
            formBorderTop = (isNaN(formBorderTop)) ? 0 : formBorderTop;
            formBorderBottom = (isNaN(formBorderBottom)) ? 0 : formBorderBottom;
            return($KU.getWindowHeight() - (formBorderTop + formBorderBottom)) + "px";
        },

        setFormHeight: function(formModel) {
            if($KW.FlexUtils.isFlexContainer(formModel)) {
                var formNode = $KU.getElementById(formModel.id);
                formNode.style.height = module.getFormHeight();
                formNode.style.overflowY = "auto";
                formNode.style.overflowX = "hidden";
                if(voltmx.appinit.isMob || voltmx.appinit.isTablet) {
                    return;
                }
                formModel.scrollerTimer = setInterval(function(formModel) {
                    return function() {
                        var frame = null, formNode = null, previousHeight = null, currentHeight = null;
                        if(formModel.media && formModel.media.type === 'print') return;

                        $KW.Form.initializeFlexContainersIfNeeded(formModel, function(formNode) {
                            formNode.style.height = module.getFormHeight();
                        });
                    };
                }(formModel), 1000);
            }
        },

        initializeFlexContainersIfNeeded: function(formModel, callback) {
            var frame = formModel.frame;
            var formNode = $KU.getElementById(formModel.id);
            var previousHeight = formNode.style.height;
            var currentHeight = module.getFormHeight();

            callback(formNode);

            if(formNode && (frame.width != formNode.offsetWidth || previousHeight != currentHeight)) {
                module.initializeFlexContainers(formModel);
            }
        }

        


        

    };


    return module;
}());


var domChangeObserver = null;
