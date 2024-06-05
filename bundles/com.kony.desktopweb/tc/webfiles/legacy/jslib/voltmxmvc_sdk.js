voltmx.mvc = voltmx.mvc || {};
_voltmx = _voltmx || {};
_voltmx.mvc = _voltmx.mvc || {};
Object.defineProperty(_voltmx, "def", {
    configurable: false,
    enumerable: false,
    writable: true,
    value: function() {
        return function(target, keey, value) {
            Object.defineProperty(target, keey, {
                configurable: false,
                enumerable: false,
                value: value,
                writable: true
            })
        }
    }()
});
(function() {
    var _appContextMap = {},
        _currentAppName = null;
    var _setAppData = function(userDataConfig) {
        if (_isValidData(userDataConfig)) {
            _setOrUpdateData(userDataConfig.appName, userDataConfig.context)
        } else {
            throw new Error("Passed Invalid context to this API.")
        }
    };
    var _isValidData = function(userDataConfig) {
        var flag = false;
        if (userDataConfig.appName && typeof userDataConfig.context === "object") {
            flag = true
        }
        return flag
    };
    var _setOrUpdateData = function(appName, data) {
        var key = null;
        if (!_appContextMap[appName]) {
            _appContextMap[appName] = data
        } else {
            for (key in data) {
                if (data.hasOwnProperty(key)) {
                    _appContextMap[appName][key] = data[key]
                }
            }
        }
    };
    var _getCurrentAppData = function() {
        return _appContextMap[_currentAppName]
    };
    var _getCurrentAppName = function() {
        return _currentAppName || appConfig.appName
    };
    var _appManager = function() {
        var _ns = {};
        _voltmx.def(_ns, "getCurrentAppContext", _getCurrentAppData);
        _voltmx.def(_ns, "setAppContext", _setAppData);
        _voltmx.def(_ns, "getCurrentAppName", _getCurrentAppName);
        _voltmx.def(_ns, "isCompositeApp", _voltmx.mvc.isCompositeApp);
        return _ns
    };
    Object.defineProperty(voltmx.mvc, "getApplicationManager", {
        configurable: false,
        enumerable: false,
        writable: true,
        value: function() {
            return _appManager
        }()
    });
    var _getAppData = function(appName) {
        return _appContextMap[appName]
    };
    var _setCurrentAppName = function(appName) {
        _currentAppName = appName
    };
    _voltmx.def(_voltmx.mvc, "setCurrentAppName", _setCurrentAppName);
    _voltmx.def(_voltmx.mvc, "getCurrentAppName", _getCurrentAppName);
    _voltmx.def(_voltmx.mvc, "getAppData", _getAppData)
})();
voltmx.mvc = voltmx.mvc || {};
_kony = _voltmx = _voltmx || {};
voltmx.mvc.BaseController = function() {
    function BaseController(viewId1) {
        this.viewId = viewId1;
        var viewModel;
        defineGetter(this, "view", function() {
            if (viewModel === undefined) {
                viewModel = this.__initializeView(this);
                if (Object.prototype.hasOwnProperty.call(this, "onViewCreated")) {
                    this["onViewCreated"].apply(this)
                }
            }
            return viewModel
        });
        defineSetter(this, "view", function(val) {
            viewModel = val
        })
    }
    BaseController.prototype.destroy = function() {
        if (this.onDestroy) {
            this.onDestroy()
        }
        this.view = null;
        this.viewId = null
    };
    return BaseController
}();
_voltmx.mvc.ModelController = function() {
    function ModelController() {}
    return ModelController
}();
(function() {
    var _resolveNameFromContextMap = {},
        _ctrlname2ControllerMap = {},
        _viewId2ControllerNameMap = {},
        _viewName2viewId = {},
        _isCompositeApp = false,
        _tmAppsList = [],
        _isInitializeRegistriesDone = false;
    var _initializeRuntimeRegistries = function(isCompositeFlag) {
        var apps, appName, microApps;
        if (typeof isCompositeFlag === "boolean") {
            _isCompositeApp = isCompositeFlag
        }
        if (appConfig) {
            if (appConfig.appName) {
                _voltmx.mvc.setCurrentAppName(appConfig.appName);
                _tmAppsList.push(appConfig.appName)
            }
            microApps = appConfig.microApps
        }
        if (microApps && _isCompositeApp) {
            for (apps in microApps) {
                appName = microApps[apps].appName;
                if (appName) {
                    _ctrlname2ControllerMap[appName] = {};
                    _viewId2ControllerNameMap[appName] = {};
                    _viewName2viewId[appName] = {};
                    _tmAppsList.push(appName)
                } else {
                    throw new Error("Invalid appName in appConfig for MicroApps")
                }
            }
        }
        _voltmx.mvc.initializeRegistries(_tmAppsList, _isCompositeApp)
    };
    _voltmx.def(_voltmx.mvc, "getAppsList", function() {
        return _tmAppsList
    });
    Object.defineProperty(_voltmx.mvc, "initCompositeApp", {
        configurable: false,
        enumerable: false,
        writable: true,
        value: function() {
            return function(isCompositeFlag) {
                if (!_isInitializeRegistriesDone) {
                    _initializeRuntimeRegistries(isCompositeFlag);
                    _isInitializeRegistriesDone = true
                }
            }
        }()
    });
    Object.defineProperty(_voltmx.mvc, "isCompositeApp", {
        configurable: false,
        enumerable: false,
        writable: true,
        value: function() {
            return function() {
                return _isCompositeApp
            }
        }()
    });
    _voltmx.mvc.getViewId2ControllerNameMap = function(appName) {
        var ret;
        if (_isCompositeApp) {
            appName = appName || _voltmx.mvc.getCurrentAppName();
            ret = _viewId2ControllerNameMap[appName]
        }
        return ret || _viewId2ControllerNameMap
    };
    _voltmx.mvc.getControllerName2ControllerMap = function(appName) {
        var ret;
        if (_isCompositeApp) {
            appName = appName || _voltmx.mvc.getCurrentAppName();
            ret = _ctrlname2ControllerMap[appName]
        }
        return ret || _ctrlname2ControllerMap
    };
    _voltmx.mvc.getViewName2viewIdMap = function(appName) {
        var ret;
        if (_isCompositeApp) {
            appName = appName || _voltmx.mvc.getCurrentAppName();
            ret = _viewName2viewId[appName]
        }
        return ret || _viewName2viewId
    };
    var _getFriendlyNameById = function(id, appName) {
        var friendlyName = null,
            viewIdctrlMap, ctrl;
        if (_isCompositeApp) {
            appName = appName || _voltmx.mvc.getCurrentAppName();
            viewIdctrlMap = _viewId2ControllerNameMap[appName][id];
            ctrl = _ctrlname2ControllerMap[appName][viewIdctrlMap]
        } else {
            viewIdctrlMap = _viewId2ControllerNameMap[id];
            ctrl = _ctrlname2ControllerMap[viewIdctrlMap]
        }
        if (ctrl) friendlyName = ctrl.formFriendlyName;
        return friendlyName
    };
    _voltmx.mvc.getPath = function(fileName, appName) {
        if (!(typeof fileName === "string")) return;
        if (_isCompositeApp) fileName = appName + "/" + fileName;
        return fileName
    };
    _voltmx.mvc.getNameSpacedValue = function(fileName, appName) {
        if (_isCompositeApp) {
            if (!appName) appName = _voltmx.mvc.getCurrentAppName();
            fileName = appName + "_" + fileName
        }
        return fileName
    };
    var _getResolvedFilePath = function(fileName, appName) {
        var navConfig, path = _voltmx.mvc.getPath(fileName, appName);
        if (!_resolveNameFromContextMap[path]) {
            navConfig = {
                friendlyName: fileName,
                appName: appName
            };
            _resolveNameFromContextMap[path] = navConfig
        }
        return path
    };
    var _getResolvedNameFromMap = function(path) {
        return _resolveNameFromContextMap[path]
    };
    _voltmx.mvc.getControllerFromViewID = function(viewID, appName) {
        var ctrlName2ControllerMap = _voltmx.mvc.getControllerName2ControllerMap(appName);
        var viewId2ControllerNameMap = _voltmx.mvc.getViewId2ControllerNameMap(appName);
        var controllerName = viewId2ControllerNameMap[viewID];
        return ctrlName2ControllerMap[controllerName]
    };
    Object.defineProperty(voltmx.mvc, "resolveNameFromContext", {
        configurable: false,
        enumerable: false,
        writable: true,
        value: function() {
            return function(configObj) {
                var pathStr, appName, friendlyName;
                if (typeof configObj === "object" && configObj.appName && configObj.friendlyName) {
                    appName = configObj.appName;
                    friendlyName = configObj.friendlyName;
                    if (_tmAppsList.indexOf(appName) === -1) {
                        throw new Error("Invalid appName for resolveNameFromContext API !!!")
                    }
                    if (!_voltmx.mvc.getFormRegistryInfo(friendlyName, appName)) {
                        throw new Error("Invalid name for resolveNameFromContext API !!!")
                    }
                    pathStr = _getResolvedFilePath(friendlyName, appName)
                } else {
                    throw new Error("Mandatory parameters missing for resolveNameFromContext API !!!")
                }
                return pathStr
            }
        }()
    });
    Object.defineProperty(_voltmx.mvc, "navigate", {
        configurable: false,
        enumerable: false,
        writable: true,
        value: function() {
            return function(idOrPath, appName) {
                var friendlyName, deeplinkFormNav, navConfig = _getResolvedNameFromMap(idOrPath);
                if (!navConfig) {
                    navConfig = idOrPath;
                    friendlyName = _getFriendlyNameById(idOrPath, appName);
                    if (friendlyName) {
                        navConfig = {
                            friendlyName: friendlyName,
                            appName: appName
                        }
                    }
                }
                deeplinkFormNav = new voltmx.mvc.Navigation(navConfig);
                deeplinkFormNav.navigate()
            }
        }()
    });
    _voltmx.mvc.initializeSubViewController = function(nameOrPath, appName) {
        var appName = appName || _voltmx.mvc.getCurrentAppName(),
            friendlyName = nameOrPath,
            resolvedMap = _getResolvedNameFromMap(nameOrPath),
            tmpController = null;
        if (resolvedMap) {
            appName = resolvedMap.appName;
            friendlyName = resolvedMap.friendlyName
        }
        tmpController = _voltmx.mvc.GetController(friendlyName, false, {
            appName: appName
        });
        return tmpController.view
    };
    _voltmx.mvc.initializeFormViewController = function(nameOrPath) {
        var appName = _voltmx.mvc.getCurrentAppName(),
            friendlyName = nameOrPath,
            resolvedMap = _getResolvedNameFromMap(nameOrPath),
            tmpController = null;
        if (resolvedMap) {
            appName = resolvedMap.appName;
            friendlyName = resolvedMap.friendlyName
        }
        tmpController = _voltmx.mvc.GetController(friendlyName, true, {
            appName: appName
        });
        return tmpController.view
    };
    var _web = {
        componentInSegment: function(controllerID, appName) {
            var ctrl;
            if (_isCompositeApp) {
                appName = appName || _voltmx.mvc.getCurrentAppName();
                ctrl = _ctrlname2ControllerMap[appName][controllerID]
            } else {
                ctrl = _ctrlname2ControllerMap[controllerID]
            }
            return ctrl
        }
    };
    _voltmx.def(_voltmx.mvc, "getComponentController", function(controllerID, appName) {
        return _web.componentInSegment(controllerID, appName)
    });
    var _webHotReload = {
        deleteRuntimeRegistries: function(formID, appName) {
            var info = {},
                friendlyName, viewIdctrlMap, ctrl, formName, registryInfo;
            if (!appConfig.hotReloadURL) throw new Error("This API not supported !!!");
            if (appConfig.isDebug) {
                if (_isCompositeApp) {
                    appName = appName || _voltmx.mvc.getCurrentAppName();
                    viewIdctrlMap = _viewId2ControllerNameMap[appName][formID];
                    ctrl = _ctrlname2ControllerMap[appName][viewIdctrlMap];
                    if (ctrl) {
                        friendlyName = ctrl.formFriendlyName;
                        formName = ctrl.viewId;
                        delete _viewId2ControllerNameMap[appName][formID];
                        delete _ctrlname2ControllerMap[appName][viewIdctrlMap];
                        delete _viewName2viewId[appName][formName]
                    }
                } else {
                    viewIdctrlMap = _viewId2ControllerNameMap[formID];
                    ctrl = _ctrlname2ControllerMap[viewIdctrlMap];
                    if (ctrl) {
                        friendlyName = ctrl.formFriendlyName;
                        formName = ctrl.viewId;
                        delete _viewId2ControllerNameMap[formID];
                        delete _ctrlname2ControllerMap[viewIdctrlMap];
                        delete _viewName2viewId[formName]
                    }
                }
                info.navigationObject = {
                    friendlyName: friendlyName,
                    appName: appName
                };
                registryInfo = _voltmx.mvc.getFormRegistryInfo(friendlyName, appName);
                if (registryInfo) {
                    info.registryInfo = JSON.parse(JSON.stringify(registryInfo))
                }
            }
            return info
        }
    };
    _voltmx.def(_voltmx.mvc, "resetBookKeepersAndGetFormInfo", function(formID, appName) {
        return _webHotReload.deleteRuntimeRegistries(formID, appName)
    })
})();
voltmx.mvc = voltmx.mvc || {};
inheritsFrom = function(child, parent) {
    child.prototype = Object.create(parent.prototype)
};
voltmx.mvc.FormController = function() {
    function FormController(viewId1) {
        var navContext;
        this.navigationMode = 0;
        this.__initializeView = function(objController) {
            var retForm = null;
            var viewFileName = objController.viewId;
            var appName = objController.appName;
            var viewName2viewIdMap = _voltmx.mvc.getViewName2viewIdMap(appName);
            var ctrlName2ControllerMap = _voltmx.mvc.getControllerName2ControllerMap(appName);
            var viewId2ControllerNameMap = _voltmx.mvc.getViewId2ControllerNameMap(appName);
            if (Object.prototype.hasOwnProperty.call(this, "onCreateView")) {
                viewFileName = this["onCreateView"].apply(this, null);
                if (typeof viewFileName === "object" && Object.prototype.hasOwnProperty.call(viewFileName, "id")) {
                    retForm = viewFileName
                } else {
                    var path = _voltmx.mvc.getPath(viewFileName, objController.appName);
                    formCreateFunc = voltmx.utils.LoadJSFile(path);
                    if (!formCreateFunc) {
                        throw new Error("Invalid file : " + path)
                    }
                    var formConfig = formCreateFunc(objController);
                    if (Object.prototype.toString.call(formConfig) === "[object Array]") {
                        formConfig[0]._voltmxControllerName = objController.Name;
                        retForm = new _voltmx.mvc.Form2(formConfig[0], formConfig[1], formConfig[2])
                    } else {
                        formConfig._voltmxControllerName = objController.Name;
                        retForm = new _voltmx.mvc.Form2(formConfig)
                    }
                }
            } else {
                var path = _voltmx.mvc.getPath(viewFileName, objController.appName);
                formCreateFunc = voltmx.utils.LoadJSFile(path);
                if (!formCreateFunc) {
                    throw new Error("Invalid file : " + path)
                }
                var formConfig = formCreateFunc(objController);
                if (Object.prototype.toString.call(formConfig) === "[object Array]") {
                    formConfig[0]._voltmxControllerName = objController.Name;
                    retForm = new _voltmx.mvc.Form2(formConfig[0], formConfig[1], formConfig[2])
                } else {
                    formConfig._voltmxControllerName = objController.Name;
                    retForm = new _voltmx.mvc.Form2(formConfig)
                }
            }
            retForm.mvcInitializeView = false;
            retForm._appName = appName;
            retForm._voltmxControllerName = objController.Name;
            ctrlName2ControllerMap[retForm._voltmxControllerName] = objController;
            viewId2ControllerNameMap[retForm.id] = objController.Name;
            viewName2viewIdMap[objController.viewId] = retForm.id;
            retForm.mvcInitializeView = true;
            return retForm
        };
        this.__showView = function(param) {
            if (null != this.view) {
                navContext = param;
                _voltmx.mvc.showForm(this.view)
            }
        };
        defineGetter(this, "navigationContext", function() {
            return navContext
        });
        defineSetter(this, "navigationContext", function(val) {
            throw new Error("Setter for Navigation context is not allowed.")
        });
        voltmx.mvc.BaseController.call(this, viewId1)
    }
    inheritsFrom(FormController, voltmx.mvc.BaseController);
    FormController.prototype.pauseNavigation = function() {
        if (this.navigationMode == 1) {
            this.navigationMode = 2
        } else {
            voltmx.print("No form navigation is in progress hence cannot be paused.")
        }
    };
    FormController.prototype.resumeNavigation = function() {
        if (this.navigationMode == 2) {
            this.navigationMode = 0;
            this.__showView()
        } else {
            voltmx.print("No form navigation is in paused state hence cannot be resumed.")
        }
    };
    FormController.prototype.show = function(param, isBackNavigation) {
        this.navigationMode = 1;
        if (this.onNavigate) {
            this.onNavigate.call(this, param, isBackNavigation)
        }
        if (this.navigationMode == 1) {
            this.navigationMode = 0;
            this.__showView(param)
        }
    };
    FormController.prototype.getPreviousForm = function() {
        var prevForm = voltmx.application.getPreviousForm();
        if (null != prevForm) {
            if (prevForm._voltmxControllerName) return prevForm.id;
            else return prevForm
        }
        return null
    };
    FormController.prototype.getPreviousFormFriendlyName = function() {
        var prevForm = voltmx.application.getPreviousForm();
        if (null != prevForm) {
            var appName = _voltmx.mvc.getCurrentAppName();
            var controller = _voltmx.mvc.getControllerFromViewID(prevForm.id, appName);
            var fName = voltmx.mvc.registry.getFriendlyName(controller.viewId, appName);
            if (null != fName) return fName;
            else return prevForm.id
        }
        return null
    };
    FormController.prototype.getCurrentForm = function() {
        var currForm = voltmx.application.getCurrentForm();
        if (null != currForm) {
            if (currForm._voltmxControllerName) return currForm.id;
            else return currForm
        }
        return null
    };
    FormController.prototype.getCurrentFormFriendlyName = function() {
        var currForm = voltmx.application.getCurrentForm();
        var appName = _voltmx.mvc.getCurrentAppName();
        var controller = _voltmx.mvc.getControllerFromViewID(currForm.id, appName);
        var fName = voltmx.mvc.registry.getFriendlyName(controller.viewId, appName);
        if (null != fName) return fName;
        else return currForm.id;
        return null
    };
    FormController.prototype.destroy = function() {
        if (null != this.view) {
            if (this.view.onDestroy) {
                var destroyFunc = this.view.onDestroy;
                this.view.onDestroy = null;
                destroyFunc.call(this)
            }
            _voltmx.mvc.destroyForm(this.view)
        }
        voltmx.mvc.BaseController.prototype.destroy.call(this)
    };
    FormController.prototype.executeOnAppLevelWidget = function(paramsObject) {
        if (paramsObject == null || paramsObject == undefined || paramsObject.container == null || paramsObject.container == undefined || paramsObject.eventName == null || paramsObject.eventName == undefined) {
            return false
        }
        var widgetName = paramsObject.container;
        var appName = _voltmx.mvc.getCurrentAppName();
        var tmpWidgetName = voltmx.mvc.registry.get(widgetName, appName);
        if (null != tmpWidgetName) {
            widgetName = tmpWidgetName
        }
        var controller = _voltmx.mvc.appLevelWidget2Controller[widgetName];
        if (controller == null || controller == undefined) {
            return false
        }
        if (Object.prototype.hasOwnProperty.call(controller, paramsObject.eventName)) {
            return controller[paramsObject.eventName].call(controller, paramsObject.params)
        }
        return false
    };
    return FormController
}();
_voltmx = _voltmx || {};
_voltmx.mvc = _voltmx.mvc || {};
voltmx.mvc = voltmx.mvc || {};
voltmx.utils = voltmx.utils || {};

function accessorDescriptor(field, fun) {
    var desc = {
        enumerable: true,
        configurable: true
    };
    desc[field] = fun;
    return desc
}

function defineGetter(obj, prop, get) {
    if (Object.defineProperty) return Object.defineProperty(obj, prop, accessorDescriptor("get", get));
    if (Object.prototype.__defineGetter__) return obj.__defineGetter__(prop, get);
    throw new Error("browser does not support getters")
}

function defineSetter(obj, prop, set) {
    if (Object.defineProperty) return Object.defineProperty(obj, prop, accessorDescriptor("set", set));
    if (Object.prototype.__defineSetter__) return obj.__defineSetter__(prop, set);
    throw new Error("browser does not support setters")
}
inheritsFrom = function(child, parent) {
    child.prototype = Object.create(parent.prototype)
};
_voltmx.mvc.ctrlname2ControllerMap = {};
_voltmx.mvc.viewId2ControllerNameMap = {};
_voltmx.mvc.formNavigateInProgress = [];
_voltmx.mvc.formNavigateCounter = 0;
_voltmx.mvc.viewName2viewId = {};
_voltmx.mvc.appLevelWidget2Controller = {};
voltmx.utils.LoadJSFile = function(fileName) {
    var retForm = null;
    controllerConfig = require(fileName); {
        retForm = controllerConfig
    }
    return retForm
};
voltmx.mvc.isControllerAvailable = function(formFriendlyName, appName) {
    var ctrlName = null,
        tmpFormName = null,
        formID = formFriendlyName,
        returnFlag = false;
    var viewName2viewIdMap = _voltmx.mvc.getViewName2viewIdMap(appName);
    var ctrlName2ControllerMap = _voltmx.mvc.getControllerName2ControllerMap(appName);
    var viewId2ControllerNameMap = _voltmx.mvc.getViewId2ControllerNameMap(appName);
    tmpFormName = voltmx.mvc.registry.get(formID, appName);
    if (null != tmpFormName) formID = tmpFormName;
    if (formID in viewName2viewIdMap) {
        formID = viewName2viewIdMap[formID]
    }
    if (null != formID) {
        if (formID in viewId2ControllerNameMap) {
            ctrlName = viewId2ControllerNameMap[formID];
            if (ctrlName in ctrlName2ControllerMap) {
                returnFlag = true
            }
        }
    }
    return returnFlag
};
voltmx.application.setAppLevelWidget = function(paramsObject) {
    if (paramsObject == null || paramsObject == undefined) {
        return 8001
    }
    if (paramsObject.container == null || paramsObject.container == undefined) {
        return 8003
    }
    var appName;
    if (!paramsObject.appName) {
        appName = _voltmx.mvc.getCurrentAppName()
    } else {
        appName = paramsObject.appName
    }
    var widget = paramsObject.container;
    var ctrlName2ControllerMap = _voltmx.mvc.getControllerName2ControllerMap(appName);
    if (typeof widget === "string" || widget instanceof String) {
        var tmpWidget = voltmx.mvc.registry.get(widget, appName);
        if (null != tmpWidget) {
            widget = tmpWidget
        }
        var controller = _voltmx.mvc.appLevelWidget2Controller[widget];
        var view;
        if (controller == null || controller == undefined) {
            if (!voltmx.mvc.registry.getFriendlyName(widget, appName)) {
                return 8004
            }
            view = _voltmx.mvc.initializeSubViewController(widget, appName);
            controller = ctrlName2ControllerMap[view._voltmxControllerName];
            _voltmx.mvc.appLevelWidget2Controller[widget] = controller;
            controller.executeOnCurrentForm = function(paramsObject) {
                if (paramsObject == null || paramsObject == undefined || paramsObject.eventName == null || paramsObject.eventName == undefined) {
                    return false
                }
                var currentFormControllerName = voltmx.application.getCurrentForm()._voltmxControllerName;
                var currentFormController = ctrlName2ControllerMap[currentFormControllerName];
                if (Object.prototype.hasOwnProperty.call(currentFormController, paramsObject.eventName)) return currentFormController[paramsObject.eventName].call(currentFormController, paramsObject.params);
                return false
            }
        } else {
            view = controller.view
        }
        paramsObject.container = view
    }
    return _voltmx.mvc.setAppLevelWidget(paramsObject)
};
voltmx.application.destroyForm = function(params) {
    var tmpController = null;
    var formID;
    var appName;
    if (typeof params == "object") {
        formID = params.friendlyName;
        appName = params.appName
    } else {
        formID = params;
        appName = _voltmx.mvc.getCurrentAppName()
    }
    var viewName2viewId = _voltmx.mvc.getViewName2viewIdMap(appName);
    var ctrlName2ControllerMap = _voltmx.mvc.getControllerName2ControllerMap(appName);
    var viewId2ControllerNameMap = _voltmx.mvc.getViewId2ControllerNameMap(appName);
    var tmpFormName = voltmx.mvc.registry.get(formID, appName);
    if (null != tmpFormName) {
        formID = tmpFormName
    }
    var fileName = formID;
    if (formID in viewName2viewId) {
        formID = viewName2viewId[formID]
    }
    if (null != formID) {
        if (formID in viewId2ControllerNameMap) {
            var ctrlName = viewId2ControllerNameMap[formID];
            if (ctrlName in ctrlName2ControllerMap) {
                tmpController = ctrlName2ControllerMap[ctrlName];
                if (null != tmpController) tmpController.destroy();
                delete ctrlName2ControllerMap[ctrlName];
                delete viewId2ControllerNameMap[formID];
                if (fileName in viewName2viewId) {
                    delete viewName2viewId[fileName]
                }
            }
        }
    }
};
_voltmx.mvc.destroyController = function(voltmxControllerName) {
    var tmpController = null;
    var ctrlName2ControllerMap = _voltmx.mvc.getControllerName2ControllerMap();
    if (voltmxControllerName in ctrlName2ControllerMap) {
        tmpController = ctrlName2ControllerMap[voltmxControllerName];
        if (null != tmpController) {
            tmpController.destroy()
        }
        tmpController = null;
        delete ctrlName2ControllerMap[voltmxControllerName]
    }
};
_voltmx.mvc.executeInJsContext = function(templateView, functionName, subargs) {
    var appName = templateView._appName ? templateView._appName : _voltmx.mvc.getCurrentAppName();
    var ctrlName2ControllerMap = _voltmx.mvc.getControllerName2ControllerMap(appName);
    if (templateView._voltmxControllerName in ctrlName2ControllerMap) {
        var viewName = templateView._voltmxControllerName;
        var tmpController = ctrlName2ControllerMap[viewName];
        if (null != tmpController) {
            if (typeof functionName === "string" || functionName instanceof String) {
                tmpController[functionName].apply(tmpController, subargs)
            } else {
                functionName.apply(tmpController, subargs)
            }
        }
    } else {
        var eventobject = null;
        if (subargs.length > 0) {
            var tempCallerObject = subargs[0];
            if (typeof tempCallerObject === "object" && Object.prototype.hasOwnProperty.call(tempCallerObject, "id")) {
                eventobject = tempCallerObject;
                subargs.shift()
            }
        }
        if (null != eventobject) {
            functionName.apply(eventobject, subargs)
        } else {
            if (typeof templateView === "object" && Object.prototype.hasOwnProperty.call(templateView, "id")) {
                functionName.apply(templateView, subargs)
            } else {
                subargs.unshift(templateView);
                functionName.apply(null, subargs)
            }
        }
    }
};
_voltmx.mvc.assignFunctions2Controller = function(tmpController, controllers) {
    if (controllers.length > 1) {
        var allFunctions = {};
        for (var i = 0; i < controllers.length; i++) {
            var extensionLevel = "extensionLevel" + i;
            tmpController[extensionLevel] = {};
            if (i == 0) tmpController["parent"] = {};
            for (var key in controllers[i]) {
                if (i < controllers.length && _voltmx.mvc.isValidControllerKey(key)) {
                    if (typeof controllers[i][key] === "function") {
                        tmpController[extensionLevel][key] = controllers[i][key].bind(tmpController);
                        if (i == 0) tmpController["parent"][key] = controllers[i][key].bind(tmpController)
                    } else {
                        tmpController[extensionLevel][key] = controllers[i][key];
                        if (i == 0) tmpController["parent"][key] = controllers[i][key]
                    }
                }
                allFunctions[key] = controllers[i][key]
            }
        }
        for (var key in allFunctions) {
            if (_voltmx.mvc.isValidControllerKey(key)) {
                if (typeof allFunctions[key] === "function") {
                    tmpController[key] = allFunctions[key].bind(tmpController)
                } else {
                    tmpController[key] = allFunctions[key]
                }
            }
        }
    } else {
        var config2 = controllers[0];
        for (var key in config2) {
            if (_voltmx.mvc.isValidControllerKey(key) && typeof config2 === "object" && Object.prototype.hasOwnProperty.call(config2, key)) {
                if (typeof config2[key] === "function") {
                    tmpController[key] = config2[key].bind(tmpController)
                } else {
                    tmpController[key] = config2[key]
                }
            }
        }
    }
};
_voltmx.mvc.isValidControllerKey = function(key) {
    return key != "prototype" && key != "view" && key != "viewId" && key != "userWidgetName" && key != "__initializeView" && key != "name"
};
_voltmxControllerCounter = 0;
globalObj = this;
var stringToFunction = function(str) {
    var arr = str.split(".");
    var fn = globalObj || this;
    for (var i = 0, len = arr.length; i < len; i++) {
        fn = fn[arr[i]]
    }
    if (typeof fn !== "function") {
        throw new Error("function not found")
    }
    return fn
};
_voltmx.mvc.GetControllerAsync = function(formFriendlyName, context, successCallBack, errorCallback) {
    var tmpController = null,
        ctrlName = null,
        levels = null,
        i = 0,
        formID = formFriendlyName,
        requireFileList = [],
        controllerTypePath = null,
        tmpControllerName = null,
        controllerType = null,
        controllerTypeFile = null,
        extensionControllersList = null;
    var appName = context.appName;
    var tmpFormName = voltmx.mvc.registry.get(formID, appName);
    var viewName2viewIdMap = _voltmx.mvc.getViewName2viewIdMap(appName);
    var ctrlName2ControllerMap = _voltmx.mvc.getControllerName2ControllerMap(appName);
    var viewId2ControllerNameMap = _voltmx.mvc.getViewId2ControllerNameMap(appName);
    if (null != tmpFormName) {
        formID = tmpFormName
    }
    var formName = formID;
    if (formID in viewName2viewIdMap) {
        formID = viewName2viewIdMap[formID]
    }
    if (null != formID) {
        if (formID in viewId2ControllerNameMap) {
            ctrlName = viewId2ControllerNameMap[formID];
            if (ctrlName in ctrlName2ControllerMap) {
                tmpController = ctrlName2ControllerMap[ctrlName]
            }
            successCallBack(tmpController)
        } else {
            requireFileList = [];
            tmpControllerName = voltmx.mvc.registry.getControllerName(formFriendlyName, appName);
            controllerType = voltmx.mvc.registry.getControllerType(formFriendlyName, appName);
            controllerTypeFile = voltmx.mvc.registry.getControllerTypeFile(formFriendlyName, appName);
            extensionControllersList = voltmx.mvc.registry.getControllerExtName(formFriendlyName, appName);
            if (null == tmpControllerName) {
                tmpControllerName = formID + "Controller"
            }
            requireFileList.push(_voltmx.mvc.getPath(tmpControllerName, appName));
            if (null != controllerType) {
                if (null == controllerTypeFile) {
                    controllerTypePath = controllerType.replace(/\./g, "/")
                } else {
                    controllerTypePath = controllerTypeFile.replace(/\./g, "/")
                }
                requireFileList.push(controllerTypePath)
            }
            if (null != extensionControllersList) {
                if (typeof extensionControllersList === "string") {
                    requireFileList.push(extensionControllersList, appName)
                } else {
                    levels = extensionControllersList.length;
                    for (i = 0; i < levels; i++) {
                        if (null != extensionControllersList[i]) {
                            requireFileList.push(_voltmx.mvc.getPath(extensionControllersList[i], appName))
                        } else {
                            break
                        }
                    }
                }
            }
            requireFileList.push(_voltmx.mvc.getPath(formID, appName));
            require(requireFileList, function(config) {
                var ctor = null;
                if (null == controllerType) {
                    tmpController = new voltmx.mvc.FormController(formName)
                } else {
                    ctor = stringToFunction(controllerType);
                    tmpController = new ctor(formName)
                }
                tmpController.appName = appName;
                tmpController.formFriendlyName = formFriendlyName;
                tmpController.Name = tmpControllerName + "_" + (++_voltmxControllerCounter).toString();
                _voltmx.mvc.loadAllExtensionControllers(tmpController, config, formFriendlyName);
                successCallBack(tmpController)
            }, function(err) {
                errorCallback(err)
            })
        }
    }
};
_voltmx.mvc.GetController = function(formFriendlyName, isForm, metaObj) {
    if (!metaObj) {
        metaObj = {
            appName: _voltmx.mvc.getCurrentAppName()
        }
    }
    var tmpController = _voltmx.mvc.GetControllerWithoutView(formFriendlyName, isForm, metaObj);
    var x = tmpController.view;
    return tmpController
};
_voltmx.mvc.GetControllerWithoutView = function(formFriendlyName, isForm, metaObj) {
    var tmpController = null;
    var formID = formFriendlyName;
    var appName = metaObj.appName;
    var viewName2viewIdMap = _voltmx.mvc.getViewName2viewIdMap(appName);
    var viewId2ControllerNameMap = _voltmx.mvc.getViewId2ControllerNameMap(appName);
    var ctrlname2ControllerMap = _voltmx.mvc.getControllerName2ControllerMap(appName);
    var tmpFormName = voltmx.mvc.registry.get(formID, appName);
    if (null != tmpFormName) {
        formID = tmpFormName
    }
    var formName = formID;
    if (formID in viewName2viewIdMap) {
        formID = viewName2viewIdMap[formID]
    }
    if (null != formID) {
        if (isForm && formID in viewId2ControllerNameMap) {
            var ctrlName = viewId2ControllerNameMap[formID];
            if (ctrlName in ctrlname2ControllerMap) {
                tmpController = ctrlname2ControllerMap[ctrlName]
            }
        } else {
            var tmpControllerName = voltmx.mvc.registry.getControllerName(formFriendlyName, appName);
            if (null == tmpControllerName) {
                tmpControllerName = formID + "Controller"
            }
            var path = _voltmx.mvc.getPath(tmpControllerName, appName);
            var config = voltmx.utils.LoadJSFile(path);
            if (isForm) {
                var controllerType = voltmx.mvc.registry.getControllerType(formFriendlyName, appName);
                if (null == controllerType) {
                    tmpController = new voltmx.mvc.FormController(formName)
                } else {
                    var controllerTypeFile = voltmx.mvc.registry.getControllerTypeFile(formFriendlyName, appName);
                    var controllerTypePath = null;
                    if (null == controllerTypeFile) {
                        controllerTypePath = controllerType.replace(/\./g, "/")
                    } else {
                        controllerTypePath = controllerTypeFile.replace(/\./g, "/")
                    }
                    var path = controllerTypePath;
                    voltmx.utils.LoadJSFile(path);
                    var ctor = stringToFunction(controllerType);
                    tmpController = new ctor(formID)
                }
            } else {
                var controllerType = voltmx.mvc.registry.getControllerType(formFriendlyName, appName);
                if (null == controllerType) {
                    tmpController = new voltmx.mvc.TemplateController(formName)
                } else {
                    var controllerTypeFile = voltmx.mvc.registry.getControllerTypeFile(formFriendlyName, appName);
                    var controllerTypePath = null;
                    if (null == controllerTypeFile) {
                        controllerTypePath = controllerType.replace(/\./g, "/")
                    } else {
                        controllerTypePath = controllerTypeFile.replace(/\./g, "/")
                    }
                    voltmx.utils.LoadJSFile(controllerTypePath);
                    var ctor = stringToFunction(controllerType);
                    tmpController = new ctor(formName)
                }
            }
            tmpController.appName = appName;
            tmpController.formFriendlyName = formFriendlyName;
            tmpController.Name = tmpControllerName + "_" + (++_voltmxControllerCounter).toString();
            _voltmx.mvc.loadAllExtensionControllers(tmpController, config, formFriendlyName)
        }
    }
    return tmpController
};
_voltmx.mvc.loadAllExtensionControllers = function(tmpController, config, friendlyName) {
    var controllers = [];
    controllers.push(config);
    var config2 = {};
    var appName = tmpController.appName;
    var tmpControllerName2 = voltmx.mvc.registry.getControllerExtName(friendlyName, appName);
    if (null != tmpControllerName2) {
        if (typeof tmpControllerName2 === "string") {
            var uwPath = friendlyName.replace(/\./g, "/");
            config2 = voltmx.utils.LoadJSFile(uwPath + "/" + tmpControllerName2);
            controllers.push(config2)
        } else {
            var levels = tmpControllerName2.length;
            var path;
            for (var i = 0; i < levels; i++) {
                if (null != tmpControllerName2[i]) {
                    if (tmpController.masterType) {
                        path = tmpControllerName2[i]
                    } else {
                        path = _voltmx.mvc.getPath(tmpControllerName2[i], appName)
                    }
                    config2 = voltmx.utils.LoadJSFile(path);
                    controllers.push(config2)
                } else {
                    break
                }
            }
        }
    }
    _voltmx.mvc.assignFunctions2Controller(tmpController, controllers)
};
_voltmx.mvc.CreateMasterWidgetController = function(userWidgetName, uwInstanceName, args, hasMultipleViews) {
    var appName = _voltmx.mvc.getCurrentAppName();
    if (args[0]) {
        appName = args[0].appName || appName
    }
    var tmpController = null;
    var formID = userWidgetName;
    var tmpFormName = voltmx.mvc.registry.get(formID, appName);
    if (null != tmpFormName) {
        formID = tmpFormName
    }
    if (null != formID) {
        var tmpControllerName = voltmx.mvc.registry.getControllerName(userWidgetName, appName);
        if (null == tmpControllerName) {
            tmpControllerName = formID + "Controller"
        }
        var uwPath = userWidgetName.replace(/\./g, "/");
        if (hasMultipleViews) uwPath = uwPath.substring(0, uwPath.lastIndexOf("/"));
        var config = voltmx.utils.LoadJSFile(uwPath + "/" + tmpControllerName);
        var controllerType = voltmx.mvc.registry.getControllerType(userWidgetName, appName);
        if (null == controllerType) {
            tmpController = new voltmx.mvc.MasterController(userWidgetName, formID, uwInstanceName)
        } else {
            var path = getControllerTypeFile(userWidgetName, appName);
            var controllerTypeFile = path;
            var controllerTypePath = null;
            if (null == controllerTypeFile) {
                controllerTypePath = controllerType.replace(/\./g, "/")
            } else {
                controllerTypePath = controllerTypeFile.replace(/\./g, "/")
            }
            voltmx.utils.LoadJSFile(controllerTypePath);
            var ctor = stringToFunction(controllerType);
            tmpController = new ctor(userWidgetName, formID, uwInstanceName)
        }
        tmpController.args = args;
        tmpController.Name = tmpControllerName + "_" + (++_voltmxControllerCounter).toString();
        var masterType = constants.MASTER_TYPE_USERWIDGET;
        if (Object.prototype.toString.call(args) === "[object Array]") {
            if (null != args[0]["masterType"]) {
                masterType = args[0]["masterType"]
            }
        } else {
            masterType = args["masterType"]
        }
        tmpController.masterType = masterType;
        tmpController.appName = appName;
        if (masterType == constants.MASTER_TYPE_USERWIDGET) {
            _voltmx.mvc.loadAllExtensionControllers(tmpController, config, userWidgetName)
        } else {
            var controllers = [];
            controllers.push(config);
            _voltmx.mvc.assignFunctions2Controller(tmpController, controllers)
        }
        if (tmpController.initializeProperties) {
            tmpController.initializeProperties()
        }
        if (Object.prototype.hasOwnProperty.call(tmpController, "constructor")) {
            tmpController["constructor"].apply(tmpController, args)
        }
    }
    return tmpController
};
_voltmx.mvc.initializeViewController = function(viewController, modelController) {
    if (modelController) {
        viewController._baseUserWidgetName = modelController._baseUserWidgetName;
        viewController.controller = modelController;
        viewController.controller.onPropertyChanged = function(propName, val) {
            var propChangedCallbackName = "on_" + propName + "_Changed";
            if (this[propChangedCallbackName] !== undefined) {
                this[propChangedCallbackName].call(this, val)
            }
        }.bind(viewController);
        viewController.createVNProperty = function(Prop1) {
            var num1 = this.controller[Prop1];
            defineSetter(this.controller, Prop1, function(val) {
                num1 = val;
                if (this.controller.onPropertyChanged !== undefined) {
                    this.controller.onPropertyChanged(Prop1, val)
                }
            }.bind(viewController));
            defineGetter(this.controller, Prop1, function() {
                return num1
            })
        }
    }
};
_voltmx.mvc.initializeModelController = function(modelController) {
    if (modelController && Object.prototype.hasOwnProperty.call(modelController, "constructor")) {
        modelController["constructor"].apply(modelController)
    }
};
_voltmx.mvc.initializeMasterController = function(userWidgetName, uwInstanceName, args) {
    var appName = _voltmx.mvc.getCurrentAppName();
    if (args[0]) {
        appName = args[0].appName || appName
    }
    if (typeof voltmx.mvc.registry.get(userWidgetName, appName) == "object") {
        var modelController = _voltmx.mvc.createModelController(userWidgetName, appName);
        var viewName;
        if (modelController && modelController.hasOwnProperty("onCreateView")) {
            viewName = modelController.onCreateView(args)
        } else if (args != null && args != undefined && args[0] != null && args[0] != undefined && args[0].viewType != null && args[0].viewType != undefined) {
            viewName = args[0].viewType
        }
        if (viewName == null || viewName == undefined) {
            voltmx.print("Undefined/Null viewName");
            return
        }
        var viewController = _voltmx.mvc.CreateMasterWidgetController(userWidgetName + "." + viewName, uwInstanceName, args, true);
        if (!viewController) {
            voltmx.print("Undefined/Null _voltmx.mvc.CreateMasterWidgetController() value");
            return
        }
        _voltmx.mvc.initializeViewController(viewController, modelController);
        _voltmx.mvc.initializeModelController(modelController);
        return viewController.view
    } else {
        var tmpController = _voltmx.mvc.CreateMasterWidgetController(userWidgetName, uwInstanceName, args, false);
        return tmpController.view
    }
};
_voltmx = _voltmx || {};
_voltmx.mvc = _voltmx.mvc || {};
_voltmx.mvc.setData2UserWidget = function(userWidgetInstance, newClonedRowView, data, isSetViewProps) {
    var controllerName = userWidgetInstance._voltmxControllerName;
    var ctrlName2ControllerMap = _voltmx.mvc.getControllerName2ControllerMap();
    if (controllerName in ctrlName2ControllerMap) {
        var tmpController = ctrlName2ControllerMap[controllerName];
        if (null == tmpController) return;
        var tempView = tmpController.view;
        tmpController.view = newClonedRowView;
        var xx = tmpController.view.bottom;
        if (typeof data === "object") {
            for (var m in data) {
                if (Object.prototype.hasOwnProperty.call(tmpController, m)) {
                    tmpController[m] = data[m]
                } else if (isSetViewProps) {
                    tempView[m] = data[m]
                }
            }
        }
        tmpController.view = tempView
    }
};
_voltmx.mvc.setMasterWidgetContract = function(userWidgetInstance, tmpController) {
    var lstFunctions = Object.getOwnPropertyNames(tmpController).filter(function(p) {
        return typeof tmpController[p] === "function" && p != "__initializeView"
    });
    _voltmx.mvc.setFunctions(userWidgetInstance, lstFunctions, tmpController);
    var lstProperties = Object.getOwnPropertyNames(tmpController).filter(function(p) {
        return typeof tmpController[p] != "function" && p != "masterType" && p != "viewId" && p != "view" && p != "userWidgetName" && p != "appName"
    });
    _voltmx.mvc.setProperties(userWidgetInstance, lstProperties, tmpController);
    var view111 = tmpController.view;
    var lstFunctionsOnMaster = _voltmx.mvc.getMethods(userWidgetInstance);
    var lstFunctions = _voltmx.mvc.getMethods(view111).filter(function(p) {
        return lstFunctionsOnMaster.indexOf(p) <= -1
    });
    _voltmx.mvc.setFunctions(userWidgetInstance, lstFunctions, view111, true);
    var lstPropertiesOnMaster = _voltmx.mvc.getProperties(userWidgetInstance);
    var lstProperties = _voltmx.mvc.getProperties(view111).filter(function(p) {
        return lstPropertiesOnMaster.indexOf(p) <= -1
    });
    _voltmx.mvc.setProperties(userWidgetInstance, lstProperties, view111);
    var children = _voltmx.mvc.getAllChildren(view111);
    _voltmx.mvc.setProperties(userWidgetInstance, children, view111)
};
_voltmx.mvc.getAllChildren = function(viewInstance) {
    var childIds = [];
    if (viewInstance.widgets) {
        var children = viewInstance.widgets();
        for (var i = 0; i < children.length; i++) {
            var child = children[i];
            childIds.push(child.id);
            if (child._voltmxControllerName == null) {
                var grandChildren = _voltmx.mvc.getAllChildren(child);
                for (var j = 0; j < grandChildren.length; j++) {
                    childIds.push(grandChildren[j])
                }
            }
        }
    }
    return childIds
};
_voltmx.mvc.getMethods = function(obj) {
    var res = Object.getOwnPropertyNames(obj).filter(function(p) {
        return typeof obj[p] === "function"
    });
    for (var m in obj) {
        if (typeof obj[m] == "function") {
            res.push(m)
        }
    }
    return res
};
_voltmx.mvc.getProperties = function(obj) {
    var res = Object.getOwnPropertyNames(obj).filter(function(p) {
        return typeof obj[p] != "function"
    });
    for (var m in obj) {
        if (typeof obj[m] != "function") {
            res.push(m)
        }
    }
    return res
};
_voltmx.mvc.getClonedController = function(templateView) {
    var appName = templateView.appName || _voltmx.mvc.getCurrentAppName();
    var tmpController = _voltmx.mvc.GetControllerWithoutView(templateView.id, false, {
        appName: appName
    });
    var ctrlName2ControllerMap = _voltmx.mvc.getControllerName2ControllerMap(appName);
    tmpController.view = templateView;
    ctrlName2ControllerMap[tmpController.Name] = tmpController;
    return tmpController
};
_voltmx.mvc.getClonedMasterController = function(masterView) {
    var appName = masterView.appName || _voltmx.mvc.getCurrentAppName();
    var ctrlName2ControllerMap = _voltmx.mvc.getControllerName2ControllerMap(appName);
    var tmpController = ctrlName2ControllerMap[masterView._voltmxControllerName];
    var tmpController = _voltmx.mvc.CreateMasterWidgetController(tmpController.userWidgetName, tmpController.viewId, [{
        masterType: tmpController.masterType,
        appName: appName
    }]);
    tmpController.view = masterView;
    ctrlName2ControllerMap[tmpController.Name] = tmpController;
    return tmpController
};
_voltmx.mvc.createModelController = function(baseUserWidgetName, appName) {
    var modelControllerName = voltmx.mvc.registry.getControllerName(baseUserWidgetName, appName);
    if (!modelControllerName) {
        voltmx.print("Undefined/Null Controller Name in registry");
        return
    }
    var uwPath = baseUserWidgetName.replace(/\./g, "/");
    var config = voltmx.utils.LoadJSFile(uwPath + "/" + modelControllerName);
    if (!config) {
        voltmx.print("Requiring Model controller failed.");
        return
    }
    var modelController = new _voltmx.mvc.ModelController(baseUserWidgetName);
    modelController._baseUserWidgetName = baseUserWidgetName;
    modelController.Name = modelControllerName + "_" + (++_voltmxControllerCounter).toString();
    modelController.appName = appName;
    _voltmx.mvc.ctrlname2ControllerMap[modelController.Name] = modelController;
    _voltmx.mvc.loadAllExtensionControllers(modelController, config, baseUserWidgetName);
    return modelController
};
_voltmx.mvc.bindController = function(masterView) {
    var appName = masterView.appName || _voltmx.mvc.getCurrentAppName();
    var ctrlName2ControllerMap = _voltmx.mvc.getControllerName2ControllerMap(appName);
    var tmpController = ctrlName2ControllerMap[masterView.controller.Name];
    tmpController.view = masterView;
    masterView._voltmxControllerName = tmpController.Name;
    tmpController.onDestroy = null
};
_voltmx.mvc.bindMasterController = function(userwidget, masterView, controllerName) {
    var appName = userwidget.appName || _voltmx.mvc.getCurrentAppName();
    var ctrlName2ControllerMap = _voltmx.mvc.getControllerName2ControllerMap(appName);
    var tmpController = ctrlName2ControllerMap[controllerName];
    masterView._voltmxControllerName = tmpController.Name;
    userwidget._voltmxControllerName = tmpController.Name;
    tmpController.view = masterView;
    userwidget._voltmxInitialized = false;
    if (tmpController.initializeProperties) {
        tmpController.initializeProperties()
    }
    _voltmx.mvc.setMasterContract(userwidget);
    tmpController.onDestroy = null
};
_voltmx.mvc.setMasterContract = function(userWidgetInstance) {
    var config = {};
    if (null == userWidgetInstance || userWidgetInstance._voltmxInitialized) return;
    var usInstanceName = userWidgetInstance._voltmxControllerName;
    var appName = userWidgetInstance.appName || _voltmx.mvc.getCurrentAppName();
    var ctrlName2ControllerMap = _voltmx.mvc.getControllerName2ControllerMap(appName);
    if (usInstanceName in ctrlName2ControllerMap) {
        var tmpController = ctrlName2ControllerMap[usInstanceName];
        if (null == tmpController) return;
        var xx = tmpController.view.bottom;
        if (tmpController.masterType == constants.MASTER_TYPE_USERWIDGET) {
            if (appConfig && appConfig.testAutomation && appConfig.testAutomation.scriptsURL) {
                _voltmx.mvc.setMasterWidgetContract(userWidgetInstance, tmpController)
            }
            _voltmx.mvc.setUserWidgetContract(userWidgetInstance, tmpController)
        } else {
            _voltmx.mvc.setMasterWidgetContract(userWidgetInstance, tmpController)
        }
        userWidgetInstance._voltmxInitialized = true
    }
};
_voltmx.mvc.setUserWidgetContract = function(userWidgetInstance, tmpController) {
    var userWidgetName = tmpController.userWidgetName;
    var uwPath = userWidgetName;
    var n = userWidgetName.lastIndexOf(".");
    var configFileName = userWidgetName + "Config";
    if (n >= 0) {
        configFileName = configFileName.substring(n + 1);
        uwPath = userWidgetName.replace(/\./g, "/")
    }
    var configFileName = uwPath + "/" + configFileName;
    var master = require(configFileName);
    if (null == master) return;
    if (null != master["properties"]) {
        var propertiesOnMaster = master["properties"];
        _voltmx.mvc.setProperties(userWidgetInstance, propertiesOnMaster, tmpController)
    }
    if (null != master["apis"]) {
        var apisOnMaster = master["apis"];
        _voltmx.mvc.setFunctions(userWidgetInstance, apisOnMaster, tmpController)
    }
    if (null != master["events"]) {
        var eventsOnMaster = master["events"];
        _voltmx.mvc.setEvents(userWidgetInstance, eventsOnMaster, tmpController)
    }
    return
};
_voltmx.mvc.setProperties = function(userWidgetInstance, properties, tmpController) {
    if (null == properties || null == userWidgetInstance || null == tmpController) return;
    if (userWidgetInstance === tmpController) return;
    for (i = 0; i < properties.length; i++) {
        var oneProperty = properties[i];
        if (typeof oneProperty === "string") {
            oneProperty = {
                name: oneProperty,
                writable: true,
                enumerable: true,
                configurable: true
            }
        }
        var propName = oneProperty["name"];
        defineGetter(userWidgetInstance, propName, function(propertyName) {
            return function() {
                return tmpController[propertyName]
            }
        }(propName));
        if (null != oneProperty["writable"] && oneProperty["writable"]) {
            defineSetter(userWidgetInstance, propName, function(propertyName) {
                return function(val) {
                    tmpController[propertyName] = val
                }
            }(propName))
        }
    }
};
_voltmx.mvc.setFunctions = function(userWidgetInstance, lstAPIs, tmpController, isView) {
    if (null == lstAPIs || null == userWidgetInstance || null == tmpController) return;
    for (i = 0; i < lstAPIs.length; i++) {
        var propName = lstAPIs[i];
        if (isView) {
            userWidgetInstance[propName] = function(propertyName) {
                return function() {
                    tmpController[propertyName].apply(tmpController, arguments)
                }
            }(propName)
        } else {
            userWidgetInstance[propName] = tmpController[propName].bind(tmpController)
        }
    }
};
_voltmx.mvc.setEvents = function(userWidgetInstance, lstEvents, tmpController) {
    if (null == lstEvents || null == userWidgetInstance || null == tmpController) return;
    if (userWidgetInstance === tmpController) return;
    for (i = 0; i < lstEvents.length; i++) {
        var propName = lstEvents[i];
        defineGetter(userWidgetInstance, propName, function(propertyName) {
            return function() {
                return tmpController[propertyName]
            }
        }(propName));
        defineSetter(userWidgetInstance, propName, function(propertyName) {
            return function(val) {
                tmpController[propertyName] = val
            }
        }(propName))
    }
};
voltmx.mvc = voltmx.mvc || {};
voltmx.utils = voltmx.utils || {};
voltmx.mvc.Navigation = function() {
    var isPathResolved = false;
    var appName;

    function Navigation(formname, objModel) {
        var model = objModel;
        this.getModel = function() {
            if (null == model) {
                var controller = _voltmx.mvc.GetController(formFriendlyName, true);
                if (!controller) {
                    voltmx.print("########## No controller is found to navigate #####");
                    throw "Controller Not Found"
                }
                if (controller.getModel) model = controller.getModel()
            }
            return model
        };
        this.setModel = function(objModel) {
            model = objModel
        };
        var formFriendlyName = formname;
        appName = _voltmx.mvc.getCurrentAppName();
        if (typeof formname == "object") {
            formFriendlyName = formname.friendlyName;
            if (formname.appName != appName) {
                appName = formname.appName;
                _voltmx.mvc.setCurrentAppName(appName)
            }
        } else {
            formFriendlyName = formname
        }
        this.navigate = function(param) {
            var context = {
                appName: appName
            };
            if (_voltmx.mvc.isSyncLoad()) {
                var controller = _voltmx.mvc.GetController(formFriendlyName, true, context);
                if (!controller) {
                    voltmx.print("########## No controller is found to navigate for form " + formFriendlyNamePath);
                    throw "Controller Not Found"
                }
                if (null == model) {
                    if (controller.getModel) model = controller.getModel.call(controller)
                }
                if (controller.setModel) controller.setModel.call(controller, model);
                controller.show.call(controller, param, false)
            } else {
                var len = _voltmx.mvc.formNavigateInProgress.length;
                if (len == 0) {
                    _voltmx.mvc.formNavigateCounter = 0
                } else {
                    _voltmx.mvc.formNavigateCounter++
                }
                _voltmx.mvc.formNavigateInProgress.push("Form" + _voltmx.mvc.formNavigateCounter);
                if (_voltmx.mvc.formNavigateCounter == 0) {
                    navigateCallback(formFriendlyName, param, _voltmx.mvc.formNavigateCounter, context)
                } else {
                    scheduleNavigateTimer(formFriendlyName, param, _voltmx.mvc.formNavigateCounter, context)
                }
            }
        };
        var scheduleNavigateTimer = function(formFriendlyName, param, navigateCounter, context) {
            voltmx.timer.schedule("Form" + navigateCounter, function() {
                if (_voltmx.mvc.formNavigateInProgress.indexOf("Form" + (navigateCounter - 1)) < 0) {
                    voltmx.timer.cancel("Form" + navigateCounter);
                    navigateCallback(formFriendlyName, param, navigateCounter, context)
                }
            }, .01, true)
        };
        var navigateCallback = function(formFriendlyName, param, navigateCounter, context) {
            _voltmx.mvc.GetControllerAsync(formFriendlyName, context, function(controller) {
                var index;
                if (!controller) {
                    voltmx.print("########## No controller is found to navigate for form " + formFriendlyName);
                    throw "Controller Not Found"
                }
                if (null == model) {
                    if (controller.getModel) model = controller.getModel.call(controller)
                }
                if (controller.setModel) controller.setModel.call(controller, model);
                controller.show.call(controller, param, false);
                index = _voltmx.mvc.formNavigateInProgress.indexOf("Form" + navigateCounter);
                _voltmx.mvc.formNavigateInProgress.splice(index, 1)
            }, function(err) {
                voltmx.print("Error: Unable to load Form Controller -" + err);
                throw "Controller or Form Not Found"
            })
        }
    }
    return Navigation
}();
(function() {
    var _navigationManagerMap = {},
        _isSyncFlow = null;
    var _loader = {
        appNavigationManager: function(config) {
            var controllerFile = _loader.navManagerFilePath.call(this, "NavigationController"),
                modelFile = _loader.navManagerFilePath.call(this, "NavigationModel");
            config = config || {};
            if (_isSyncLoad()) {
                _loader.syncLoad.call(this, controllerFile, modelFile, config)
            } else {
                _loader.asyncLoad.call(this, controllerFile, modelFile, config)
            }
        },
        syncLoad: function(controllerFile, modelFile, config) {
            var controller = null,
                model = null;
            controller = require(controllerFile);
            model = require(modelFile);
            _loader.callback.call(this, controller, model, config)
        },
        asyncLoad: function(controllerFile, modelFile, config) {
            var self = this;
            require([controllerFile, modelFile], function(controller, model) {
                _loader.callback.call(self, controller, model, config)
            }, function(err) {
                voltmx.print("Fail to load navigation manager for " + self.appName)
            })
        },
        callback: function(controller, model, config) {
            this._.controller = controller;
            this._.model = model;
            _navigationManagerMap[this.appName] = this;
            if (config.userNavigate) {
                _navManager.userNavigate.call(this, config.navConfig)
            } else if (config.resumeNavigate) {
                _navManager.resumeNavigate.call(config.currentContext, config.targetFormInfo)
            }
        },
        navManagerFilePath: function(fileName) {
            var path = "";
            if (_voltmx.mvc.isCompositeApp()) path = this.appName + "/";
            return path + "navigation/" + fileName
        }
    };
    var _conditions = {
        applicationPreconditionsValidator: function(targetFormInfo) {
            var preConditions = _navManager.getApplicationPrecondtions(targetFormInfo),
                targetAppData, flag = true;
            if (Array.isArray(preConditions) && preConditions.length > 0) {
                targetAppData = _voltmx.mvc.getAppData(targetFormInfo.appName);
                flag = _conditions.checkSrcOnTarget(preConditions, targetAppData)
            }
            return flag
        },
        checkSrcOnTarget: function(sourceArr, targetObj) {
            var i, flag = true,
                len = sourceArr.length;
            if (!targetObj) flag = false;
            for (i = 0; flag && i < len; i++) {
                if (!targetObj.hasOwnProperty(sourceArr[i])) {
                    flag = false
                }
            }
            return flag
        },
        formPreconditionsValidator: function(targetFormInfo) {
            var flag = true,
                preConditions = _navManager.getFormPrecondtions(targetFormInfo);
            if (Array.isArray(preConditions) && preConditions.length > 0) {
                flag = _conditions.checkSrcOnTarget(preConditions, targetFormInfo.params)
            }
            return flag
        },
        isValidCBFormOnTargetFormsConfig: function(targetFormInfo, targetFormsList) {
            var i, flag = false,
                len = 0;
            if (Array.isArray(targetFormsList)) len = targetFormsList.length;
            for (i = 0; !flag && i < len; i++) {
                if (targetFormsList[i].friendlyName === targetFormInfo.friendlyName) {
                    flag = true
                }
            }
            return flag
        }
    };
    var _navManager = {
        userNavigate: function(config) {
            var destinationConfig = _sourceConfig.getUserDestinationConfig.call(this, config.context),
                targetFormInfo = null;
            if (!destinationConfig) {
                throw new Error("Current Form destinationConfig not available.")
            }
            targetFormInfo = _sourceConfig.getTargetFormInfo.call(this, destinationConfig, config);
            targetFormInfo.params = config.params;
            if (targetFormInfo.appName === _voltmx.mvc.getCurrentAppName()) {
                _navManager.targetFormNavigate.call(this, targetFormInfo)
            } else {
                var appsList = _voltmx.mvc.getAppsList();
                if (appsList.indexOf(targetFormInfo.appName) === -1) {
                    throw new Error("Invalid App Name in Navigation Manager : " + targetFormInfo.appName)
                }
                if (_navigationManagerMap[targetFormInfo.appName]) {
                    _navManager.appPreConditions.call(this, targetFormInfo)
                } else {
                    _navManager.pauseNavigate.call(this, targetFormInfo)
                }
            }
        },
        appPreConditions: function(targetFormInfo) {
            var isPassed = _conditions.applicationPreconditionsValidator(targetFormInfo);
            if (!isPassed) throw new Error("Application preConditions not met.");
            _navManager.targetFormNavigate.call(this, targetFormInfo)
        },
        resumeNavigate: function(targetFormInfo) {
            _navManager.appPreConditions.call(this, targetFormInfo)
        },
        pauseNavigate: function(targetFormInfo) {
            return new NavigationManager(targetFormInfo.appName, {
                targetFormInfo: targetFormInfo,
                currentContext: this,
                resumeNavigate: true
            })
        },
        getApplicationPrecondtions: function(targetFormInfo) {
            var navManager = _navigationManagerMap[targetFormInfo.appName],
                application = navManager._.model.Application,
                ret = null;
            if (application) ret = application.preConditionConfig;
            return ret
        },
        getFormPrecondtions: function(targetFormInfo) {
            var navManager = _navigationManagerMap[targetFormInfo.appName],
                forms = navManager._.model.Forms,
                formConfig = null,
                ret = null;
            if (forms) formConfig = forms[targetFormInfo.friendlyName];
            if (formConfig) ret = formConfig.preConditionConfig;
            return ret
        },
        targetFormNavigate: function(targetFormInfo) {
            var isPassed = false,
                manager = null,
                params = targetFormInfo.params;
            isPassed = _conditions.formPreconditionsValidator(targetFormInfo);
            if (!isPassed) throw new Error("Mandatory params not passed to Target Form.");
            targetFormInfo.params = null;
            manager = new voltmx.mvc.Navigation(targetFormInfo);
            manager.navigate(params)
        }
    };
    var _sourceConfig = {
        getUserDestinationConfig: function(context) {
            var destinations = null,
                tempObj = null,
                destinationConfig = null;
            if (context instanceof voltmx.mvc.FormController) {
                tempObj = this._.model.Forms
            } else {
                tempObj = this._.model.UIModules
            }
            if (tempObj) destinations = tempObj[context.formFriendlyName];
            if (destinations) destinationConfig = destinations.destinationConfig;
            return destinationConfig
        },
        isValidateUserContext: function(context) {
            var flag = false;
            if (context instanceof voltmx.mvc.FormController || context instanceof voltmx.mvc.Presentation.BasePresenter) {
                flag = true
            }
            return flag
        },
        getTargetFormInfo: function(destinationConfig, navConfig) {
            var targetFormInfo = null;
            if (destinationConfig.friendlyName) {
                targetFormInfo = destinationConfig
            } else if (destinationConfig.callback) {
                targetFormInfo = _sourceConfig.getFormFromUserCallback.call(this, destinationConfig, navConfig)
            } else {
                throw new Error("Current Form destinationConfig value is not proper.")
            }
            targetFormInfo.appName = targetFormInfo.appName || _voltmx.mvc.getCurrentAppName();
            return targetFormInfo
        },
        getFormFromUserCallback: function(destinationConfig, navConfig) {
            var controller = this._.controller,
                flag = false,
                destinationCallback = controller[destinationConfig.callback],
                targetNavFormInfo = null;
            if (typeof destinationCallback !== "function") {
                throw new Error("Current Form destination callback is not a function")
            }
            targetNavFormInfo = destinationCallback.call(this, navConfig.callbackModelConfig);
            if (targetNavFormInfo && targetNavFormInfo.friendlyName) {
                flag = _conditions.isValidCBFormOnTargetFormsConfig.call(this, targetNavFormInfo, destinationConfig.targetForms)
            }
            if (!flag) {
                throw new Error("Not a valid target friendlyName or targetForms not available for callback.")
            }
            return targetNavFormInfo
        }
    };
    var NavigationManager = function(appName, config) {
        this.appName = appName;
        this._ = {};
        if (!_navigationManagerMap[this.appName]) {
            _loader.appNavigationManager.call(this, config)
        }
    };
    var _navigate = function(config) {
        var navConfig = null,
            flag = _sourceConfig.isValidateUserContext(config.context);
        if (!flag) throw new Error("Invalid Context Param passed to navigate.");
        if (_navigationManagerMap[this.appName]) {
            _navManager.userNavigate.call(this, config)
        } else {
            navConfig = {
                navConfig: config,
                userNavigate: true
            };
            _loader.appNavigationManager.call(this, navConfig)
        }
    };
    _voltmx.def(NavigationManager.prototype, "navigate", _navigate);
    Object.defineProperty(voltmx.mvc, "getNavigationManager", {
        configurable: false,
        enumerable: false,
        writable: true,
        value: function() {
            return function() {
                var appName = _voltmx.mvc.getCurrentAppName(),
                    navManager = _navigationManagerMap[appName];
                if (!navManager) {
                    navManager = new NavigationManager(appName)
                }
                return navManager
            }
        }()
    });
    var _isSyncLoad = function() {
        var sync;
        if (_isSyncFlow === null) {
            sync = voltmx.application.getApplicationBehavior("FormControllerSyncLoad");
            if (undefined === sync || null === sync || sync) _isSyncFlow = true;
            else _isSyncFlow = false
        }
        return _isSyncFlow
    };
    Object.defineProperty(_voltmx.mvc, "isSyncLoad", {
        configurable: false,
        enumerable: false,
        writable: true,
        value: function() {
            return _isSyncLoad
        }()
    })
})();
voltmx.mvc = voltmx.mvc || {};
inheritsFrom = function(child, parent) {
    child.prototype = Object.create(parent.prototype)
};
voltmx.mvc.TemplateController = function(viewId1) {
    this.__initializeView = function(objController) {
        var retForm = null;
        var viewFileName = objController.viewId;
        if (Object.prototype.hasOwnProperty.call(this, "onCreateView")) {
            viewFileName = this["onCreateView"].apply(this, null);
            if (typeof viewFileName === "object" && Object.prototype.hasOwnProperty.call(viewFileName, "id")) {
                retForm = viewFileName
            } else {
                var path = _voltmx.mvc.getPath(viewFileName, objController.appName);
                formCreateFunc = require(path);
                retForm = formCreateFunc(objController)
            }
        } else {
            var path = _voltmx.mvc.getPath(viewFileName, objController.appName);
            formCreateFunc = voltmx.utils.LoadJSFile(path);
            retForm = formCreateFunc(objController)
        }
        retForm._voltmxControllerName = objController.Name;
        var appName = objController.appName;
        var ctrlName2ControllerMap = _voltmx.mvc.getControllerName2ControllerMap(appName);
        ctrlName2ControllerMap[retForm._voltmxControllerName] = objController;
        var viewName2viewId = _voltmx.mvc.getViewName2viewIdMap(appName);
        var viewId2ControllerNameMap = _voltmx.mvc.getViewId2ControllerNameMap(appName);
        viewId2ControllerNameMap[retForm.id] = objController.Name;
        viewName2viewId[objController.viewId] = retForm.id;
        retForm._appName = appName;
        return retForm
    };
    voltmx.mvc.BaseController.call(this, viewId1);
    this.executeOnParent = function(callback, args) {
        this.view.executeOnParent(callback, args)
    };
    this.getCurrentView = function(childWidget) {
        while (childWidget.parent != null) {
            if (childWidget.id == this.view.id) break;
            childWidget = childWidget.parent
        }
        return childWidget
    }
};
inheritsFrom(voltmx.mvc.TemplateController, voltmx.mvc.BaseController);
voltmx.mvc.MasterController = function(uwName, viewId1, newID) {
    this.__initializeView = function(objController) {
        var retForm = null;
        var uwPath = this.userWidgetName.replace(/\./g, "/");
        var viewFileName = objController.viewId;
        var appName = objController.appName;
        var viewName2viewIdMap = _voltmx.mvc.getViewName2viewIdMap(appName);
        var viewId2ControllerNameMap = _voltmx.mvc.getViewId2ControllerNameMap(appName);
        var ctrlName2ControllerMap = _voltmx.mvc.getControllerName2ControllerMap(appName);
        if (Object.prototype.hasOwnProperty.call(this, "onCreateView")) {
            viewFileName = this["onCreateView"].apply(this, null);
            if (typeof viewFileName === "object" && Object.prototype.hasOwnProperty.call(viewFileName, "id")) {
                retForm = viewFileName
            } else if (typeof viewFileName === "string" && viewFileName.length > 0) {
                viewFileName = viewFileName.replace(/\./g, "/");
                var formCreateFunc = voltmx.utils.LoadJSFile(viewFileName);
                retForm = formCreateFunc(objController)
            } else {
                var formCreateFunc = voltmx.utils.LoadJSFile(uwPath + "/" + viewFileName);
                retForm = formCreateFunc(objController)
            }
        } else {
            var formCreateFunc = voltmx.utils.LoadJSFile(uwPath + "/" + viewFileName);
            retForm = formCreateFunc(objController)
        }
        retForm._voltmxControllerName = objController.Name;
        retForm._appName = appName;
        ctrlName2ControllerMap[retForm._voltmxControllerName] = objController;
        if (newID != null) {
            viewId2ControllerNameMap[newID] = objController.Name;
            viewName2viewIdMap[objController.viewId] = newID
        } else {
            viewId2ControllerNameMap[retForm.id] = objController.Name;
            viewName2viewIdMap[objController.viewId] = retForm.id
        }
        return retForm
    };
    this.userWidgetName = uwName;
    this.getCurrentView = function(childWidget) {
        while (childWidget.parent != null) {
            if (childWidget.id == this.view.id) break;
            childWidget = childWidget.parent
        }
        return childWidget
    };
    voltmx.mvc.BaseController.call(this, viewId1)
};
inheritsFrom(voltmx.mvc.MasterController, voltmx.mvc.BaseController);
_voltmx = _voltmx || {};
_voltmx.mvc = _voltmx.mvc || {};
if (voltmx.mvc == undefined) voltmx.mvc = {};
if (voltmx.mvc.registry == undefined) voltmx.mvc.registry = {};
(function() {
    var _registryMap = {},
        _isCompositeApp = false,
        _isInitializeRegistriesDone = false;
    var _initializeRegistries = function(microAppsList, isCompositeFlag) {
        if (!_isInitializeRegistriesDone) {
            _isInitializeRegistriesDone = true
        } else {
            throw new Error("Registries initialized already !!!")
        }
        _isCompositeApp = isCompositeFlag;
        if (microAppsList && _isCompositeApp) {
            for (var i = 0; i < microAppsList.length; i++) {
                _registryMap[microAppsList[i]] = {}
            }
        }
    };
    _voltmx.def(_voltmx.mvc, "initializeRegistries", _initializeRegistries);
    var _getRegistryFromObject = function(context) {
        var _ret;
        if (_isCompositeApp) {
            var appName = _voltmx.mvc.getCurrentAppName();
            if (typeof context === "object") {
                appName = context.appName
            }
            _ret = _registryMap[appName];
            if (!_ret) throw new Error("Invalid entry in registry add API.")
        }
        return _ret || _registryMap
    };
    var _getRegistry = function(appName) {
        var _ret;
        if (_isCompositeApp) {
            appName = appName || _voltmx.mvc.getCurrentAppName();
            _ret = _registryMap[appName]
        }
        return _ret || _registryMap
    };
    var _isOldNotation4RegistryAdd = function(context) {
        if (typeof context === "string" || Array.isArray(context)) return true;
        else return false
    };
    var _getFormRegistryInfo = function(friendlyName, appName) {
        var _ret, registryMap = _getRegistry(appName),
            formProps = registryMap[friendlyName];
        if (formProps) _ret = formProps;
        return _ret
    };
    _voltmx.def(_voltmx.mvc, "getFormRegistryInfo", _getFormRegistryInfo);
    voltmx.mvc.registry.add = function(friendlyName, formid, formCtrllrName, contextORcontrollerExtName) {
        if (_isOldNotation4RegistryAdd(formid)) {
            var registryMap = _getRegistryFromObject(contextORcontrollerExtName);
            var formCtrllrExtName;
            if (friendlyName in registryMap) {
                voltmx.print("########## A form with friendly name " + friendlyName + " is already exists in registry.")
            } else {
                var formProps = {};
                formProps["name"] = formid;
                if (typeof formCtrllrName === "string") {
                    formProps["controllerName"] = formCtrllrName;
                    if (typeof contextORcontrollerExtName === "string") formProps["controllerExtName"] = contextORcontrollerExtName
                } else {
                    for (var propName in formCtrllrName) {
                        if (propName != "name") {
                            formProps[propName] = formCtrllrName[propName]
                        }
                    }
                }
                registryMap[friendlyName] = formProps
            }
        } else {
            var registryMap = _getRegistryFromObject(formid);
            var formProps = {};
            for (var propName in formid) {
                if (propName != "viewName") {
                    formProps[propName] = formid[propName]
                } else {
                    formProps["name"] = formid["viewName"]
                }
            }
            registryMap[friendlyName] = formProps
        }
    };
    voltmx.mvc.registry.remove = function(friendlyName, context) {
        var registryMap = _getRegistryFromObject(context);
        if (friendlyName in registryMap) {
            delete registryMap[friendlyName]
        } else {
            voltmx.print("########## No form with friendly name " + friendlyName + " is found in registry")
        }
    };
    voltmx.mvc.registry.get = function(friendlyName, appName) {
        var registryMap = _getRegistry(appName);
        if (friendlyName in registryMap) {
            var formProps = registryMap[friendlyName];
            if (null != formProps) {
                return formProps["name"]
            }
        } else {
            voltmx.print("########## No form with friendly name " + friendlyName + " is found in registry");
            return null
        }
    };
    voltmx.mvc.registry.getFriendlyName = function(formID, appName) {
        var registryMap = _getRegistry(appName);
        for (var friendlyName in registryMap) {
            if (registryMap.hasOwnProperty(friendlyName)) {
                var formProps = registryMap[friendlyName];
                if (null != formProps) {
                    if (formID == formProps["name"]) return friendlyName
                }
            }
        }
        return null
    };
    voltmx.mvc.registry.getControllerName = function(friendlyName, appName) {
        var registryMap = _getRegistry(appName);
        if (friendlyName in registryMap) {
            var formProps = registryMap[friendlyName];
            if (null != formProps) {
                return formProps["controllerName"]
            }
        } else {
            voltmx.print("########## No form with friendly name " + friendlyName + " is found in registry");
            return null
        }
    };
    voltmx.mvc.registry.getControllerType = function(friendlyName, appName) {
        var registryMap = _getRegistry(appName);
        if (friendlyName in registryMap) {
            var formProps = registryMap[friendlyName];
            if (null != formProps) {
                return formProps["controllerType"]
            }
        } else {
            voltmx.print("########## No form with friendly name " + friendlyName + " is found in registry");
            return null
        }
    };
    voltmx.mvc.registry.getControllerTypeFile = function(friendlyName, appName) {
        var registryMap = _getRegistry(appName);
        if (friendlyName in registryMap) {
            var formProps = registryMap[friendlyName];
            if (null != formProps) {
                return formProps["controllerTypeFileName"]
            }
        } else {
            voltmx.print("########## No form with friendly name " + friendlyName + " is found in registry");
            return null
        }
    };
    voltmx.mvc.registry.getControllerExtName = function(friendlyName, appName) {
        var registryMap = _getRegistry(appName);
        if (friendlyName in registryMap) {
            var formProps = registryMap[friendlyName];
            if (null != formProps) {
                return formProps["controllerExtName"]
            }
        } else {
            voltmx.print("########## No form with friendly name " + friendlyName + " is found in registry");
            return null
        }
    }
})();
voltmx = voltmx || {};
voltmx.model = voltmx.model || {};
voltmx.model.Util = voltmx.model.Util || {};
voltmx.model.Util.perfStats = [];
voltmx.model.Util.perftimecal = function(startTag, endTag, startTS, endTS) {
    if (voltmx.model.Util.isPerfTestReq === false) return;
    var formattedStartTS = startTS.getMinutes() + ":" + startTS.getSeconds() + ":" + startTS.getMilliseconds();
    var formattedEndTS = endTS.getMinutes() + ":" + endTS.getSeconds() + ":" + endTS.getMilliseconds();
    var starttime = startTS.getTime();
    var endtime = endTS.getTime();
    var res = endtime - starttime;
    var caliculatedTS = new Date;
    caliculatedTS.setTime(res);
    var formattedCalicutedTS = caliculatedTS.getUTCMinutes() + ":" + caliculatedTS.getUTCSeconds() + ":" + caliculatedTS.getUTCMilliseconds();
    voltmx.model.Util.perfStats.push(startTag + " " + formattedStartTS);
    voltmx.model.Util.perfStats.push(endTag + " " + formattedEndTS);
    voltmx.model.Util.perfStats.push("Total time taken is >> " + formattedCalicutedTS)
};
voltmx.model.Util.perlogout = function() {
    if (voltmx.model.Util.isPerfTestReq === false) return;
    for (var i = 0; i < voltmx.model.Util.perfStats.length; i++) {
        voltmx.model.log.info("[PERF][INFO] :" + voltmx.model.Util.perfStats[i])
    }
    voltmx.model.Util.perfStats = []
};
voltmx.model.Util.matchIgnoreCase = function(string1, string2) {
    if (string1 === null || string2 === null || string1 === undefined || string2 === undefined) {
        return false
    } else if (string1.toUpperCase() === string2.toUpperCase()) {
        return true
    } else {
        return false
    }
};
voltmx.model.Util.clone = function(src) {
    return clone(src);

    function clone(src) {
        function mixin(dest, source, copyFunc) {
            var name, s, i, empty = {};
            for (name in source) {
                s = source[name];
                if (!(name in dest) || dest[name] !== s && (!(name in empty) || empty[name] !== s)) {
                    dest[name] = copyFunc ? copyFunc(s) : s
                }
            }
            return dest
        }
        if (!src || typeof src != "object" || Object.prototype.toString.call(src) === "[object Function]") {
            return src
        }
        if (src.nodeType && "cloneNode" in src) {
            return src.cloneNode(true)
        }
        if (src instanceof Date) {
            return new Date(src.getTime())
        }
        if (src instanceof RegExp) {
            return new RegExp(src)
        }
        var r, i, l;
        if (src instanceof Array) {
            r = [];
            for (i = 0, l = src.length; i < l; ++i) {
                if (i in src) {
                    r.push(clone(src[i]))
                }
            }
        } else {
            r = src.constructor ? new src.constructor : {}
        }
        return mixin(r, src, clone)
    }
};
voltmx.model.Util.mergeJSONs = function(json1, json2) {
    if (!json1) return json2;
    if (!json2) return json1;
    var result = {};
    for (var key in json1) {
        result[key] = json1[key]
    }
    for (var key in json2)
        if (!result.hasOwnProperty(key)) result[key] = json2[key];
    return result
};
voltmx = voltmx || {};
voltmx.model = voltmx.model || {};
voltmx.model.log = voltmx.model.log || {};
voltmx.model.constants = voltmx.model.constants || {};
voltmx.model.constants.isForTesting = undefined;
voltmx.model.constants.TestConstants = {};
voltmx.model.constants["picklist"] = "picklist";
voltmx.model.constants["reference"] = "reference";
voltmx.model.constants["picklistmultiselect"] = "picklistmultiselect";
voltmx.model.constants["extendedfield"] = "extendedfield";
voltmx.model.constants["entityMetadataMap"] = {};
voltmx.model.constants["INTEGER_MIN_VALUE"] = -2147483648;
voltmx.model.constants["INTEGER_MAX_VALUE"] = 2147483647;
voltmx.model.constants.credStoreUsername = "username";
voltmx.model.constants.credStorePassword = "password";
voltmx.model.constants.credStoreOptions = "options";
voltmx.model.constants.credStoreIdentityService = "identityServiceName";
voltmx.model.constants.credStoreName = "credentials";
voltmx.model.constants.OperationType = {
    NO_FILTER: 1,
    FILTER_BY_PRIMARY_KEY: 2,
    ADD: 3
};
voltmx.model.constants.ValidationType = {
    CREATE: 1,
    UPDATE: 1
};
voltmx.model.constants.MatchType = {
    EQUALS: {
        value: "=",
        name: "EQUALS"
    },
    GREATER: {
        value: ">",
        name: "GREATER"
    },
    GREATEREQUAL: {
        value: ">=",
        name: "GREATEREQUAL"
    },
    LESS: {
        value: "<",
        name: "LESS"
    },
    LESSEQUAL: {
        value: "<=",
        name: "LESSEQUAL"
    },
    STARTSWITH: {
        value: "LIKE",
        name: "STARTSWITH"
    },
    CONTAINS: {
        value: "LIKE",
        name: "CONTAINS"
    },
    LIKE: {
        value: "LIKE",
        name: "LIKE"
    },
    ENDSWITH: {
        value: "LIKE",
        name: "ENDSWITH"
    },
    NOTEQUAL: {
        value: "<>",
        name: "NOTEQUAL"
    },
    ISNULL: {
        value: "IS NULL",
        name: "ISNULL"
    },
    ISNOTNULL: {
        value: "IS NOT NULL",
        name: "ISNOTNULL"
    }
};
voltmx = voltmx || {};
voltmx.model = voltmx.model || {};
voltmx.model.DataStore = function() {
    function DataStore() {
        var inMemoryData = {};
        this.getDataByKey = function(key) {
            if (inMemoryData.hasOwnProperty(key)) return inMemoryData[key]
        };
        this.setDataByKey = function(key, data) {
            inMemoryData[key] = data
        }
    }
    DataStore.prototype.storeData = function(key, data, inMemory) {
        if (inMemory == true) this.setDataByKey(key, data);
        else voltmx.store.setItem(key, data)
    };
    DataStore.prototype.getData = function(key, inMemory) {
        if (inMemory == true) return this.getDataByKey(key);
        else return voltmx.store.getItem(key)
    };
    return DataStore
}();
voltmx.model.AuthenticationManager = function() {
    function AuthenticationManager() {}
    AuthenticationManager.prototype.authenticate = function(params, successCallback, errorCallback) {
        try {
            var appFactoryInstance = voltmx.model.ApplicationContext.getFactorySharedInstance();
            var authParams = params["authParams"];
            var options = params["options"];
            var identityServiceName = params["identityServiceName"];
            var appLoginDetails = {
                authParams: authParams,
                options: options,
                identityServiceName: identityServiceName
            };
            var dataStoreObj = voltmx.model.ApplicationContext.getFactorySharedInstance().createDataStoreObject();
            dataStoreObj.storeData("UserCredentials", appLoginDetails, true);
            voltmx.model.ApplicationContext.setUserCredentialObj(dataStoreObj);
            authenticateService()
        } catch (e) {
            voltmx.model.log.error("Error while authentication: " + e.toString());
            var exception = appFactoryInstance.createExceptionObject(voltmx.model.ExceptionCode.CD_ERROR_OFFLINE_LOGIN_FAILURE, voltmx.model.ExceptionCode.MSG_ERROR_OFFLINE_LOGIN_FAILURE);
            errorCallback(exception)
        }

        function authenticateService() {
            voltmx.model.log.info("Getting SDK IdentityService");
            var identityClient = voltmx.sdk.getCurrentInstance().getIdentityService(identityServiceName);
            voltmx.model.ApplicationContext.setIdentityService(identityClient);
            voltmx.model.log.info("Making SDK login Call");
            identityClient.login(authParams, authSuccess, authError)
        }

        function authSuccess() {
            voltmx.model.log.info("SDK login Success");
            var isAppSyncEnabled = options["access"] === "offline" ? true : false;
            voltmx.model.ApplicationContext.setOnlineStatus(!isAppSyncEnabled);
            successCallback()
        }

        function authError(err) {
            voltmx.model.log.error("SDK login Failed " + err);
            var exception = appFactoryInstance.createExceptionObject(voltmx.model.ExceptionCode.CD_ERROR_LOGIN_FAILURE, voltmx.model.ExceptionCode.MSG_ERROR_LOGIN_FAILURE, err);
            errorCallback(exception)
        }
    };
    AuthenticationManager.prototype.saveUserDetails = function() {
        var storeObj = voltmx.model.ApplicationContext.getFactorySharedInstance().createDataStoreObject();
        var credentialObj = voltmx.model.ApplicationContext.getUserCredentialObj().getData("UserCredentials", true);
        var authParams = credentialObj["authParams"];
        var username = authParams["userid"];
        var options = credentialObj["options"];
        var identityServiceName = credentialObj["identityServiceName"];
        var credentials_store = {};
        credentials_store[voltmx.model.constants.credStoreUsername] = username;
        credentials_store[voltmx.model.constants.credStoreOptions] = options;
        credentials_store[voltmx.model.constants.credStoreIdentityService] = identityServiceName;
        storeObj.storeData(voltmx.model.constants.credStoreName, credentials_store)
    };
    AuthenticationManager.prototype.getSavedUserDetails = function() {
        var storeObj = voltmx.model.ApplicationContext.getFactorySharedInstance().createDataStoreObject();
        var credentialObj = storeObj.getData(voltmx.model.constants.credStoreName);
        return credentialObj
    };
    AuthenticationManager.prototype.execute = function(params, success, error) {
        this.authenticate(params, success, error)
    };
    return AuthenticationManager
}();
voltmx = voltmx || {};
voltmx.model = voltmx.model || {};
voltmx.model.AppFactory = function() {
    function AppFactory() {}
    AppFactory.prototype.createExceptionObject = function(errCode, errMsg, errorObj) {
        return new voltmx.model.Exception(errCode, errMsg, errorObj)
    };
    AppFactory.prototype.createSyncManagerObject = function() {
        return new voltmx.model.SyncManagerMF
    };
    AppFactory.prototype.createDataObject = function(data) {
        return new voltmx.model.Data(data)
    };
    AppFactory.prototype.createModelObject = function(context, entityName, serviceName, options) {
        if (entityName) {
            var modelObj;
            var modelHandler = voltmx.model[serviceName][entityName + "Model"];
            var modelExtensionHandler = voltmx.model[serviceName][entityName + "ModelExtension"];
            var metadataStore = context.getMetadataStore();
            var entityMetadata = metadataStore.getEntityMetadata(entityName, serviceName, options);
            if (entityMetadata) {
                var configOptions = {};
                configOptions["serviceName"] = serviceName;
                configOptions["options"] = options;
                modelObj = new modelHandler(context, entityMetadata, configOptions)
            } else {
                voltmx.model.log.error("error in entity controller factory, entity meta data for " + entityName + " undefined")
            }
            if (modelExtensionHandler !== undefined && typeof modelExtensionHandler === "function") {
                modelExtensionObj = new modelExtensionHandler(modelObj);
                modelObj.setControllerExtensionObject(modelExtensionObj)
            } else {
                voltmx.model.log.error("error in entity controller factory, model Extension Object for " + entityName + " is undefined")
            }
            return modelObj
        }
    };
    AppFactory.prototype.createViewObject = function(modelConfig, voltmxForm) {
        return new voltmx.model.View(modelConfig, voltmxForm)
    };
    AppFactory.prototype.createConfigClassObject = function(configObj) {
        return new voltmx.model.ConfigClass(configObj)
    };
    AppFactory.prototype.createAuthenticationManager = function() {
        var authManager = new voltmx.model.AuthenticationManager;
        if (voltmx.model.ApplicationContext) voltmx.model.ApplicationContext.setAuthManager(authManager);
        return authManager
    };
    AppFactory.prototype.getAuthManager = function() {
        if (voltmx.model.ApplicationContext && voltmx.model.ApplicationContext.getAuthManager()) return voltmx.model.ApplicationContext.getAuthManager();
        else return this.createAuthManager()
    };
    AppFactory.prototype.createDataStoreObject = function() {
        return new voltmx.model.DataStore
    };
    AppFactory.prototype.createAppInitManagerObject = function() {
        return new voltmx.model.AppInitManager
    };
    AppFactory.prototype.createMetadataServiceManagerObject = function() {
        return new voltmx.model.MetadataServiceManagerMF
    };
    AppFactory.prototype.createSegmentFieldObject = function(widgetid, fieldInfo) {
        return new voltmx.model.SegmentField(widgetid, fieldInfo)
    };
    AppFactory.prototype.createSearchInfoObject = function(widgetid, searchVal) {
        return new voltmx.model.searchInfo(widgetid, searchVal)
    };
    AppFactory.prototype.createSegmentWidgetConfigObject = function(widgetid, widgetConfig) {
        return new voltmx.model.SegmentWidgetConfig(widgetid, widgetConfig)
    };
    AppFactory.prototype.createWidgetConfigObject = function(widgetid, widgetConfig) {
        return new voltmx.model.widgetConfig(widgetid, widgetConfig)
    };
    AppFactory.prototype.createORMControllerObject = function(appContext, options) {
        return new voltmx.model.persistent.ORMControllerMFAPP(appContext, options)
    };
    AppFactory.prototype.createORMControllerOdataObject = function(applicationContext) {
        return new voltmx.model.persistent.ORMControllerMFAPPOData(applicationContext)
    };
    AppFactory.prototype.createORMControllerOdataExpandObject = function(applicationContext) {
        return new voltmx.model.persistent.ORMControllerMFAPPODataExpand(applicationContext)
    };
    AppFactory.prototype.createORMControllerSQLObject = function(applicationContext) {
        return new voltmx.model.persistent.ORMControllerMFAPPSQL(applicationContext)
    };
    AppFactory.prototype.createGroupWidgetsContextOffline = function(config, contextData) {
        return new voltmx.model.persistent.GroupWidgetsContextOffline(config, contextData)
    };
    AppFactory.prototype.createGroupWidgetsContextOnline = function(config, contextData) {
        return new voltmx.model.persistent.GroupWidgetsContextOnline(config, contextData)
    };
    AppFactory.prototype.createGroupWidgetsContextCommon = function(config, contextData) {
        return new voltmx.model.persistent.GroupWidgetsContextCommon(config, contextData)
    };
    AppFactory.prototype.createMetadataStore = function() {
        return new voltmx.model.MetadataStore
    };
    return AppFactory
}();
voltmx = voltmx || {};
voltmx.model = voltmx.model || {};
voltmx.model.ApplicationContext = function() {
    function ApplicationContext() {
        var storedCredentialObj;
        this.formObjects = undefined;
        this.metadataStore = undefined;
        this.configParams = undefined;
        this.modelObjects = {};
        this.authManager = undefined;
        this.metadataOptions = {};
        this.setCredentialObj = function(obj) {
            storedCredentialObj = obj
        };
        this.getCredentialObj = function() {
            return storedCredentialObj
        }
    }
    var appContextInstance = new ApplicationContext;
    var factoryObj;
    var IS_ONLINE = true;
    var identityService = undefined;
    var metaDataServiceManager = undefined;
    ApplicationContext.prototype.getAppInstance = function() {
        if (!appContextInstance) appContextInstance = new ApplicationContext;
        return appContextInstance
    };
    ApplicationContext.prototype.getFactorySharedInstance = function() {
        if (!factoryObj) factoryObj = new voltmx.model.AppFactory;
        return factoryObj
    };
    ApplicationContext.prototype.getMetadataServiceManager = function() {
        if (!metaDataServiceManager) {
            metaDataServiceManager = new voltmx.model.MetadataServiceManagerMF
        }
        return metaDataServiceManager
    };
    ApplicationContext.prototype.isAppsFirstLogin = function(params) {
        var username = params["username"];
        if (!username && params["authParams"]) {
            username = params["authParams"]["userid"]
        }
        var options = params["options"];
        var identityServiceName = params["identityServiceName"];
        var credStore = voltmx.store.getItem(voltmx.model.constants.credStoreName);
        if (credStore !== null && credStore !== undefined) {
            var storedOptions = credStore[voltmx.model.constants.credStoreOptions];
            var storedIdentityServiceName = credStore[voltmx.model.constants.credStoreIdentityService];
            var storedUsername = credStore[voltmx.model.constants.credStoreUsername];
            if (storedUsername !== undefined && storedOptions !== undefined && voltmx.model.Util.matchIgnoreCase(storedUsername, username) && voltmx.model.Util.matchIgnoreCase(storedOptions.access, options.access) && voltmx.model.Util.matchIgnoreCase(storedIdentityServiceName, identityServiceName)) {
                return false
            }
        }
        return true
    };
    ApplicationContext.prototype.appServicesLogin = function(params, loginSuccessCallback, loginErrorCallback) {
        try {
            var options = params["options"];
            var syncOptions = params["syncOptions"];
            var isOffline = options["access"] === "offline" ? true : false;
            var configParams = params["configParams"];
            var metadataOptions = params["metadataOptions"];
            var syncParams = {
                syncOptions: syncOptions
            };
            var authConfig = {};
            authConfig["authParams"] = params["authParams"];
            authConfig["options"] = params["options"];
            authConfig["identityServiceName"] = params["identityServiceName"];
            authConfig["showLoadingscreen"] = true;
            var appfactoryInstance = this.getFactorySharedInstance();
            if (configParams && configParams.constructor === Object && Object.keys(configParams).length > 0) {
                voltmx.model.ApplicationContext.setConfigParams(configParams)
            }
            var initManager = appfactoryInstance.createAppInitManagerObject();
            initManager.registerService("AuthenticationServiceManager", {
                object: appfactoryInstance.createAuthenticationManager(),
                params: authConfig
            });
            initManager.registerService("MetadataServiceManager", {
                object: appfactoryInstance.createMetadataServiceManagerObject(),
                params: {
                    options: options,
                    metadataOptions: metadataOptions
                }
            });
            if (isOffline) {
                initManager.registerService("SyncManager", {
                    object: appfactoryInstance.createSyncManagerObject(),
                    params: syncParams
                })
            }
            initManager.executeRegistedServices(loginSuccessCallback, loginErrorCallback)
        } catch (err) {
            var exception;
            voltmx.model.ApplicationContext.dismissLoadingScreen();
            voltmx.model.log.error("Error while authentication: " + err.toString());
            if (err !== undefined && err !== null) {
                exception = this.getFactorySharedInstance().createExceptionObject(voltmx.model.ExceptionCode.CD_ERROR_APP_INITIALIZATION_FAILED, voltmx.model.ExceptionCode.MSG_ERROR_APP_INITIALIZATION_FAILED)
            } else exception = this.getFactorySharedInstance().createExceptionObject(voltmx.model.ExceptionCode.CD_ERROR_APP_INITIALIZATION_FAILED, voltmx.model.ExceptionCode.MSG_ERROR_APP_INITIALIZATION_FAILED);
            loginErrorCallback(exception)
        }
    };
    ApplicationContext.prototype.getObjectService = function(options, objectServiceName) {
        try {
            var objectService;
            if (options.hasOwnProperty("mock") && options["mock"] == true) {
                voltmx.model.log.info("Initialising mocked object service");
                voltmx.model.log.info("Getting SDK ObjectService");
                objectService = voltmx.sdk.getCurrentInstance().getObjectService(objectServiceName, {
                    access: objectServiceName
                })
            } else {
                voltmx.model.log.info("Getting SDK ObjectService");
                objectService = voltmx.sdk.getCurrentInstance().getObjectService(objectServiceName, options)
            }
            return objectService
        } catch (error) {
            throw this.getFactorySharedInstance().createExceptionObject(voltmx.model.ExceptionCode.CD_ERROR_INITIALIZING_METADATA_PROVIDER, voltmx.model.ExceptionCode.MSG_ERROR_INITIALIZING_METADATA_PROVIDER + " -- " + error.message)
        }
    };
    ApplicationContext.prototype.logout = function(logoutSucCallback, logoutErrCallback) {
        var logoutTS = new Date;
        try {
            this.reset();
            var identityService = voltmx.model.ApplicationContext.getIdentityService();
            if (identityService) {
                identityService.logout(success, logoutErrCallback)
            } else {
                success()
            }

            function success() {
                var logoutEndTS = new Date;
                voltmx.model.Util.perftimecal("Logout >>", "Logout Ended >>", logoutTS, logoutEndTS);
                voltmx.model.Util.perlogout();
                logoutSucCallback()
            }
        } catch (err) {
            logoutErrCallback(this.getFactorySharedInstance().createExceptionObject(voltmx.model.ExceptionCode.CD_ERROR_FAILED_TO_LOGOUT, voltmx.model.ExceptionCode.MSG_ERROR_FAILED_TO_LOGOUT + " : " + err.toString(), err))
        }
    };
    ApplicationContext.prototype.showLoadingScreen = function(text) {
        var configParams = voltmx.model.ApplicationContext.getConfigParams();
        if (configParams && configParams["ShowLoadingScreenFunction"]) {
            var userDefinedLoadingScreen = configParams["ShowLoadingScreenFunction"];
            userDefinedLoadingScreen(text)
        } else {
            text = " " + text + " \n";
            voltmx.application.showLoadingScreen(null, text, constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, null)
        }
    };
    ApplicationContext.prototype.showSyncLoadingScreen = function(text) {
        var configParams = voltmx.model.ApplicationContext.getConfigParams();
        if (configParams && configParams["ShowSyncLoadingScreenFunction"]) {
            var userDefinedLoadingScreen = configParams["ShowSyncLoadingScreenFunction"];
            userDefinedLoadingScreen(text)
        } else {
            text = " " + text + " \n";
            voltmx.application.showLoadingScreen(null, text, constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, null)
        }
    };
    ApplicationContext.prototype.dismissLoadingScreen = function() {
        var configParams = voltmx.model.ApplicationContext.getConfigParams();
        if (configParams && configParams["DismissLoadingScreenFunction"]) {
            var userDefinedLoadingScreen = configParams["DismissLoadingScreenFunction"];
            userDefinedLoadingScreen()
        } else {
            voltmx.application.dismissLoadingScreen()
        }
    };
    ApplicationContext.prototype.dismissSyncLoadingScreen = function() {
        var configParams = voltmx.model.ApplicationContext.getConfigParams();
        if (configParams && configParams["DismissSyncLoadingScreenFunction"]) {
            var userDefinedLoadingScreen = configParams["DismissSyncLoadingScreenFunction"];
            userDefinedLoadingScreen()
        } else {
            voltmx.application.dismissLoadingScreen()
        }
    };
    ApplicationContext.prototype.getAuthManager = function() {
        return this.authManager
    };
    ApplicationContext.prototype.setAuthManager = function(authManager) {
        this.authManager = authManager
    };
    ApplicationContext.prototype.setUserCredentialObj = function(obj) {
        this.setCredentialObj(obj)
    };
    ApplicationContext.prototype.getUserCredentialObj = function() {
        return this.getCredentialObj()
    };
    ApplicationContext.prototype.setOnlineStatus = function(isOnline) {
        IS_ONLINE = isOnline === true ? true : false
    };
    ApplicationContext.prototype.isAppSyncEnabled = function() {
        return IS_ONLINE === false ? true : false
    };
    ApplicationContext.prototype.getMetadataStore = function() {
        if (!this.metadataStore) this.metadataStore = new voltmx.model.MetadataStore;
        return this.metadataStore
    };
    ApplicationContext.prototype.getSyncManager = function() {
        if (!this.syncManager) this.syncManager = this.getFactorySharedInstance().createSyncManagerObject();
        return this.syncManager
    };
    ApplicationContext.prototype.reset = function() {
        this.metadataStore = undefined;
        this.formObjects = undefined
    };
    ApplicationContext.prototype.setConfigParams = function(params) {
        if (this.configParams) {
            for (var key in params) this.configParams[key] = params[key]
        } else this.configParams = params
    };
    ApplicationContext.prototype.getConfigParams = function() {
        return this.configParams
    };
    ApplicationContext.prototype.getModel = function(entityName, serviceName, options) {
        var modelName = serviceName + "." + entityName;
        if (!this.modelObjects[modelName]) {
            this.modelObjects[modelName] = this.getFactorySharedInstance().createModelObject(this, entityName, serviceName, options)
        }
        this.modelObjects[modelName].setOptions(options);
        return this.modelObjects[modelName]
    };
    ApplicationContext.prototype.setIdentityService = function(identservice) {
        identityService = identservice
    };
    ApplicationContext.prototype.getIdentityService = function() {
        return identityService
    };
    ApplicationContext.prototype.login = function(params, loginSucCallback, loginErrCallback) {
        var authenticationManager = this.getFactorySharedInstance().createAuthenticationManager();
        authenticationManager.execute(params, loginSucCallback, loginErrCallback)
    };
    ApplicationContext.prototype.createModel = function(entityName, serviceName, options, metadataOptions, successCallback, errorCallback) {
        var model = serviceName + "." + entityName;
        var scopeObj = this;
        var modelObj;
        try {
            var modelHandler = voltmx.model[serviceName][entityName + "Model"];
            var modelExtensionHandler = voltmx.model[serviceName][entityName + "ModelExtension"];
            if (metadataOptions.getFromServer) {
                voltmx.model.ApplicationContext.getMetadataServiceManager().fetchForObject(serviceName, entityName, options, metadataOptions, metadataSuccCallback.bind(this), metadataErrCallback.bind(this))
            } else {
                if (scopeObj.modelObjects.hasOwnProperty(model)) {
                    scopeObj.modelObjects[model].setOptions(options);
                    successCallback(scopeObj.modelObjects[model])
                } else {
                    var metadataStore = scopeObj.getMetadataStore();
                    try {
                        if (!metadataStore.getEntityMetadata(entityName, serviceName, options)) {
                            voltmx.model.ApplicationContext.getMetadataServiceManager().fetchForObject(serviceName, entityName, options, metadataOptions, metadataSuccCallback, metadataErrCallback)
                        } else {
                            metadataSuccCallback()
                        }
                    } catch (err) {
                        voltmx.model.log.error("Error in fetching metadata for object service : " + objServiceName, err);
                        errorCallback.call(err)
                    }
                }
            }

            function metadataSuccCallback() {
                var metadataStore = scopeObj.getMetadataStore();
                var entityMetadata = metadataStore.getEntityMetadata(entityName, serviceName, options);
                if (entityMetadata) {
                    var configOptions = {};
                    configOptions["serviceName"] = serviceName;
                    configOptions["options"] = options;
                    modelObj = new modelHandler(scopeObj, entityMetadata, configOptions)
                } else {
                    voltmx.model.log.error("error in entity controller factory, entity meta data for " + entityName + " undefined")
                }
                if (modelExtensionHandler !== undefined && typeof modelExtensionHandler === "function") {
                    modelExtensionObj = new modelExtensionHandler(modelObj);
                    modelObj.setControllerExtensionObject(modelExtensionObj)
                } else {
                    voltmx.model.log.error("error in entity controller factory, model Extension Object for " + entityName + " is undefined")
                }
                scopeObj.modelObjects[model] = modelObj;
                scopeObj.modelObjects[model].setOptions(options);
                successCallback(scopeObj.modelObjects[model])
            }

            function metadataErrCallback(err) {
                voltmx.model.log.error("Error in fetching metadata for object service : " + objServiceName);
                errorCallback(err)
            }
        } catch (err) {
            errorCallback.call(err)
        }
    };
    ApplicationContext.prototype.initializeObjectServices = function(serviceEntityMap, successCallback, errorCallback) {
        var scopeObj = this;
        var indx1 = 0;
        var services = Object.keys(serviceEntityMap);
        initialiseServices();

        function initialiseServices() {
            if (indx1 >= services.length) {
                successCallback();
                return
            }
            var indx2 = 0;
            var entities;
            var options = serviceEntityMap[services[indx1]]["options"];
            var serviceName = services[indx1];
            var serviceMetadataOptions = serviceEntityMap[services[indx1]]["metadataOptions"];
            if (serviceEntityMap[services[indx1]]["entities"]) {
                entities = Object.keys(serviceEntityMap[services[indx1]]["entities"]);
                initialiseObject()
            } else {
                initialiseService()
            }

            function initialiseObject() {
                if (indx2 >= entities.length) {
                    metaSuccess();
                    return
                }
                var entityName = entities[indx2];
                var metadataOptions = serviceEntityMap[services[indx1]]["entities"][entities[indx2]]["metadataOptions"];
                if (!metadataOptions) metadataOptions = serviceMetadataOptions;
                if (metadataOptions.getFromServer) {
                    var model = serviceName + "." + entityName;
                    scopeObj.modelObjects[model] = null
                }
                voltmx.model.ApplicationContext.getMetadataServiceManager().fetchForObject(serviceName, entityName, options, metadataOptions, successCbk, errorCbk);

                function successCbk(data) {
                    indx2++;
                    initialiseObject()
                }

                function errorCbk(err) {
                    metaError(err)
                }
            }

            function initialiseService() {
                voltmx.model.ApplicationContext.getMetadataServiceManager().fetchForObjectService(serviceName, options, serviceMetadataOptions, metaSuccess, metaError)
            }

            function metaSuccess() {
                indx1++;
                initialiseServices()
            }

            function metaError(err) {
                errorCallback(err)
            }
        }
    };
    return appContextInstance
}();
voltmx = voltmx || {};
voltmx.model = voltmx.model || {};
voltmx.model.BaseModel = function() {
    function BaseModel(applicationContext, entityMetaData, configOptions) {
        var appContext = applicationContext;
        var entityMetadata = entityMetaData;
        var fields = entityMetaData.fields;
        var columnsMap = entityMetaData.columnsMap;
        var relatedEntities = entityMetaData.relatedEntities;
        var entityDefinition = undefined;
        var controllerExtensionObject = undefined;
        var serviceName = configOptions.serviceName;
        var options = configOptions.options;
        this.getServiceName = function() {
            return serviceName
        }, this.setServiceName = function(serviceNameVal) {
            serviceName = serviceNameVal
        }, this.getOptions = function() {
            return options
        }, this.setOptions = function(optionsObj) {
            options = optionsObj
        }, this.getObjectService = function() {
            return this.getApplicationContext().getObjectService(this.getOptions(), this.getServiceName())
        }, this.getControllerExtensionObject = function() {
            return controllerExtensionObject
        };
        this.setControllerExtensionObject = function(controllerExtension) {
            controllerExtensionObject = controllerExtension
        };
        this.getApplicationContext = function() {
            return appContext
        };
        this.getEntityMetaData = function() {
            return entityMetadata
        };
        this.getFields = function() {
            return fields
        };
        this.getColumnsMap = function() {
            return columnsMap
        };
        this.getRelatedEntities = function() {
            return relatedEntities
        };
        this.getAccessType = function() {
            if (options && options.hasOwnProperty("access") && options.access.toLowerCase() === "offline") return "offline";
            else return "online"
        };
        this.getDataObjectOnline = function(columnNames, dataModel) {
            var entityName = this.getValueForProperty("name");
            var self = this;
            var columnNamesString = "*";
            var primaryKeyColumns = this.getValueForProperty("primaryKey");
            for (var i = 0; i < primaryKeyColumns.length; i++) {
                if (columnNames.indexOf(primaryKeyColumns[i]) === -1) {
                    columnNames.push(primaryKeyColumns[i])
                }
            }
            for (var column in columnNames) {
                if (columnNamesString === "*") {
                    columnNamesString = columnNames[column]
                } else {
                    columnNamesString = columnNamesString + "," + columnNames[column]
                }
            }
            var queryStr = "$select=" + columnNamesString;
            voltmx.model.log.info("columnNamesString : " + columnNamesString);
            if (dataModel) {
                voltmx.model.log.info("DataModel object --\x3e ", dataModel);
                var primaryKeyValueMap = dataModel.getPrimaryKeyValueMap();
                if (primaryKeyValueMap) {
                    queryStr = queryStr.concat("&$filter=");
                    var primaryKeyValuesArr = Object.keys(primaryKeyValueMap);
                    for (var j = 1; j < primaryKeyValuesArr.length; j++) {
                        queryStr = queryStr.concat(primaryKeyValuesArr[j - 1] + " eq " + primaryKeyValueMap[primaryKeyValuesArr[j - 1]] + " and ")
                    }
                    queryStr = queryStr.concat(primaryKeyValuesArr[j - 1] + " eq " + primaryKeyValueMap[primaryKeyValuesArr[j - 1]])
                }
            }
            var dataObject = new voltmx.sdk.dto.DataObject(self.getValueForProperty("name"));
            dataObject.setOdataUrl(queryStr);
            return dataObject
        };
        this.getDataObjectOffline = function(columnNames, dataModel) {
            var self = this;
            var entityName = this.getValueForProperty("name");
            var tblDto = new voltmx.sdk.dto.Table(entityName, entityName, false);
            var selQuery = new voltmx.sdk.dto.SelectQuery(self.getServiceName(), tblDto);
            var primaryKeyColumns = this.getValueForProperty("primaryKey");
            for (var i = 0; i < primaryKeyColumns.length; i++) {
                if (columnNames.indexOf(primaryKeyColumns[i]) === -1) {
                    columnNames.push(primaryKeyColumns[i])
                }
            }
            for (var index in columnNames) {
                var colObj = new voltmx.sdk.dto.Column(tblDto, columnNames[index]);
                selQuery.addColumn(colObj)
            }
            if (dataModel) {
                var primaryKeyValueMap = dataModel.getPrimaryKeyValueMap();
                if (primaryKeyValueMap) {
                    var primaryKeyValuesArr = Object.keys(primaryKeyValueMap);
                    for (var j = 0; j < primaryKeyValuesArr.length; j++) {
                        var colObj = new voltmx.sdk.dto.Column(tblDto, primaryKeyValuesArr[j]);
                        var crtObj = new voltmx.sdk.dto.Match(colObj, voltmx.sdk.constants.MatchType.EQUALS, primaryKeyValueMap[primaryKeyValuesArr[j]]);
                        selQuery.addCriteria(crtObj)
                    }
                }
            }
            var dataObject = new voltmx.sdk.dto.DataObject(self.getValueForProperty("name"));
            dataObject.setSelectQueryObject(selQuery);
            return dataObject
        };
        this.getRequestOptions = function(options) {
            if (options && !options.hasOwnProperty("dataObject")) {
                var newOptions = {};
                newOptions["dataObject"] = options;
                return newOptions
            } else {
                return options
            }
        }
    }
    BaseModel.prototype.getValueForColumnProperty = function(columnName, key) {
        var propertyVal = null;
        if (columnName && key) {
            propertyVal = this.getColumnInfo(columnName)[key]
        }
        return propertyVal
    };
    BaseModel.prototype.getColumnNames = function() {
        var columnNames = [];
        for (var key in this.getColumnsMap()) {
            columnNames.push(key)
        }
        return columnNames
    };
    BaseModel.prototype.getValueForProperty = function(propertyName) {
        return this.getEntityMetaData()[propertyName]
    };
    BaseModel.prototype.getColumnInfo = function(columnName) {
        return this.getColumnsMap()[columnName]
    };
    BaseModel.prototype.getFieldPickListValues = function(columnName) {
        return this.getColumnInfo(columnName)["pickListValues"]
    };
    BaseModel.prototype.getChildRelationshipList = function(successCallback, errorCallback) {
        var scopeObj = this;
        var childRelationships = this.getValueForProperty("relationshipList");
        successCallback.call(scopeObj, childRelationships)
    };
    BaseModel.prototype.getRelationshipForChildEntityName = function(childEntityName, successCallback, errorCallback) {
        var scopeObj = this;
        var relatedEntities = this.getValueForProperty("relatedEntities");
        if (relatedEntities) {
            successCallback.call(scopeObj, relatedEntities[childEntityName])
        } else {
            errorCallback.call(scopeObj, relatedEntities)
        }
    };
    BaseModel.prototype.fetchDataForColumns = function(columnNames, onSuccess, onError, dataModel) {
        try {
            var self = this;
            var dataObject;
            if (this.getAccessType() === "offline") dataObject = this.getDataObjectOffline(columnNames, dataModel);
            else dataObject = this.getDataObjectOnline(columnNames, dataModel);
            this.fetch(dataObject, success, error)
        } catch (err) {
            voltmx.model.log.error("Error fetching data for columns in entity controller");
            var exception;
            exception = self.getApplicationContext().getFactorySharedInstance().createExceptionObject(voltmx.model.ExceptionCode.CD_ERROR_FETCHING_DATA_FOR_COLUMNS, voltmx.model.ExceptionCode.MSG_ERROR_FETCHING_DATA_FOR_COLUMNS, err);
            onError(exception)
        }

        function success(response) {
            voltmx.model.log.info("Success fetching data for columns in entity controller");
            onSuccess(response)
        }

        function error(err) {
            voltmx.model.log.error("Error fetching data for columns in entity controller");
            var exception = self.getApplicationContext().getFactorySharedInstance().createExceptionObject(voltmx.model.ExceptionCode.CD_ERROR_FETCHING_DATA_FOR_COLUMNS, voltmx.model.ExceptionCode.MSG_ERROR_FETCHING_DATA_FOR_COLUMNS, err);
            onError(exception)
        }
    };
    BaseModel.prototype.fetch = function(options, onSuccess, onError) {
        this.fetchResponseWithRecords(options, success, onError);

        function success(response) {
            response = response["records"];
            onSuccess(response)
        }
    };
    BaseModel.prototype.create = function(options, onSuccess, onError) {
        try {
            var scopeObj = this;
            var requestOptions = scopeObj.getRequestOptions(options);
            if (false === this.validate(requestOptions["dataObject"], voltmx.model.constants.ValidationType.CREATE)) {
                var exception = this.getApplicationContext().getFactorySharedInstance().createExceptionObject(voltmx.model.ExceptionCode.CD_ERROR_VALIDATION_CREATE, voltmx.model.ExceptionCode.MSG_ERROR_VALIDATION_CREATE);
                throw exception
            }
            var createInEntityCntrlTS = new Date;
            voltmx.model.log.info("Making SDK create Call");
            scopeObj.getObjectService().create(requestOptions, success, error)
        } catch (e) {
            var exception = scopeObj.getApplicationContext().getFactorySharedInstance().createExceptionObject(voltmx.model.ExceptionCode.CD_ERROR_CREATE, voltmx.model.ExceptionCode.MSG_ERROR_CREATE, e);
            onError(exception)
        }

        function success(response) {
            voltmx.model.log.info("SDK create Success");
            var createEndInEntityCntrlTS = new Date;
            voltmx.model.Util.perftimecal("Create in entity controller >>", "Create in entity controller done >>", createInEntityCntrlTS, createEndInEntityCntrlTS);
            onSuccess(response)
        }

        function error(e) {
            voltmx.model.log.error("SDK create Failed " + e);
            var exception = scopeObj.getApplicationContext().getFactorySharedInstance().createExceptionObject(voltmx.model.ExceptionCode.CD_ERROR_CREATE, voltmx.model.ExceptionCode.MSG_ERROR_CREATE, e);
            onError(exception)
        }
    };
    BaseModel.prototype.update = function(options, onSuccess, onError) {
        var updateInEntityCntrlTS = new Date;
        try {
            var scopeObj = this;
            var requestOptions = scopeObj.getRequestOptions(options);
            if (false === this.validate(requestOptions["dataObject"], voltmx.model.constants.ValidationType.UPDATE)) {
                var exception = this.getApplicationContext().getFactorySharedInstance().createExceptionObject(voltmx.model.ExceptionCode.CD_ERROR_VALIDATION_UPDATE, voltmx.model.ExceptionCode.MSG_ERROR_VALIDATION_UPDATE);
                throw exception
            }
            if (this.getAccessType() === "offline") {
                voltmx.model.log.info("Making SDK update Call");
                scopeObj.getObjectService().update(requestOptions, success, error)
            } else {
                voltmx.model.log.info("Making SDK partialUpdate Call");
                scopeObj.getObjectService().partialUpdate(requestOptions, success, error)
            }
        } catch (err) {
            var exception = scopeObj.getApplicationContext().getFactorySharedInstance().createExceptionObject(voltmx.model.ExceptionCode.CD_ERROR_UPDATE, voltmx.model.ExceptionCode.MSG_ERROR_UPDATE, err);
            onError(exception)
        }

        function success(response) {
            voltmx.model.log.info("SDK update Success");
            var updateEndInEntityCntrlTS = new Date;
            voltmx.model.Util.perftimecal("Update in entity controller >>", "Update in entity controller done >>", updateInEntityCntrlTS, updateEndInEntityCntrlTS);
            onSuccess(response)
        }

        function error(err) {
            voltmx.model.log.error("SDK update Failed " + err);
            var exception = scopeObj.getApplicationContext().getFactorySharedInstance().createExceptionObject(voltmx.model.ExceptionCode.CD_ERROR_UPDATE, voltmx.model.ExceptionCode.MSG_ERROR_UPDATE, err);
            onError(exception)
        }
    };
    BaseModel.prototype.partialUpdate = function(options, onSuccess, onError) {
        var scopeObj = this;
        scopeObj.update(options, onSuccess, onError)
    };
    BaseModel.prototype.completeUpdate = function(options, onSuccess, onError) {
        var updateInEntityCntrlTS = new Date;
        try {
            var scopeObj = this;
            var requestOptions = scopeObj.getRequestOptions(options);
            if (false === this.validate(requestOptions["dataObject"], voltmx.model.constants.ValidationType.UPDATE)) {
                var exception = this.getApplicationContext().getFactorySharedInstance().createExceptionObject(voltmx.model.ExceptionCode.CD_ERROR_VALIDATION_UPDATE, voltmx.model.ExceptionCode.MSG_ERROR_VALIDATION_UPDATE);
                throw exception
            }
            voltmx.model.log.info("Making SDK update Call");
            scopeObj.getObjectService().update(requestOptions, success, error)
        } catch (err) {
            var exception = scopeObj.getApplicationContext().getFactorySharedInstance().createExceptionObject(voltmx.model.ExceptionCode.CD_ERROR_UPDATE, voltmx.model.ExceptionCode.MSG_ERROR_UPDATE, err);
            onError(exception)
        }

        function success(response) {
            voltmx.model.log.info("SDK update Success");
            var updateEndInEntityCntrlTS = new Date;
            voltmx.model.Util.perftimecal("Update in entity controller >>", "Update in entity controller done >>", updateInEntityCntrlTS, updateEndInEntityCntrlTS);
            onSuccess(response)
        }

        function error(err) {
            voltmx.model.log.error("SDK update Failed " + err);
            var exception = scopeObj.getApplicationContext().getFactorySharedInstance().createExceptionObject(voltmx.model.ExceptionCode.CD_ERROR_UPDATE, voltmx.model.ExceptionCode.MSG_ERROR_UPDATE, err);
            onError(exception)
        }
    };
    BaseModel.prototype.remove = function(options, onSuccess, onError) {
        try {
            var scopeObj = this;
            var removeInEntityCntrlTS = new Date;
            var requestOptions = scopeObj.getRequestOptions(options);
            voltmx.model.log.info("Making SDK deleteRecord Call");
            scopeObj.getObjectService().deleteRecord(requestOptions, success, error)
        } catch (err) {
            var exception = scopeObj.getApplicationContext().getFactorySharedInstance().createExceptionObject(voltmx.model.ExceptionCode.CD_ERROR_DELETE, voltmx.model.ExceptionCode.MSG_ERROR_DELETE, err);
            onError(exception)
        }

        function success(response) {
            voltmx.model.log.info("SDK deleteRecord Success");
            var removeEndInEntityCntrlTS = new Date;
            voltmx.model.Util.perftimecal("Remove in entity controller >>", "Remove in entity controller done >>", removeInEntityCntrlTS, removeEndInEntityCntrlTS);
            onSuccess(response)
        }

        function error(err) {
            voltmx.model.log.error("SDK deleteRecord Failed " + err);
            var exception = scopeObj.getApplicationContext().getFactorySharedInstance().createExceptionObject(voltmx.model.ExceptionCode.CD_ERROR_DELETE, voltmx.model.ExceptionCode.MSG_ERROR_DELETE, err);
            onError(exception)
        }
    };
    BaseModel.prototype.removeByPrimaryKey = function(primaryKeyValueMap, onSuccess, onError) {
        try {
            var scopeObj = this;
            var entityName = this.getValueForProperty("name");
            var dataObject = new voltmx.sdk.dto.DataObject(scopeObj.getValueForProperty("name"));
            dataObject.setRecord(primaryKeyValueMap);
            this.remove(dataObject, success, error)
        } catch (err) {
            var exception = scopeObj.getApplicationContext().getFactorySharedInstance().createExceptionObject(voltmx.model.ExceptionCode.CD_ERROR_DELETE_BY_PRIMARY_KEY, voltmx.model.ExceptionCode.MSG_ERROR_DELETE_BY_PRIMARY_KEY, err);
            onError(exception)
        }

        function success(response) {
            voltmx.model.log.info("Record with primaryFieldValue - " + primaryKeyValueMap + " - of entity '" + entityName + "' deleted successfully");
            onSuccess(response)
        }

        function error(err) {
            var exception = scopeObj.getApplicationContext().getFactorySharedInstance().createExceptionObject(voltmx.model.ExceptionCode.CD_ERROR_DELETE_BY_PRIMARY_KEY, voltmx.model.ExceptionCode.MSG_ERROR_DELETE_BY_PRIMARY_KEY, err);
            onError(exception)
        }
    };
    BaseModel.prototype.executeSelectQuery = function(query, succCallback, errCallback) {
        try {
            var self = this;
            voltmx.model.log.info("Making SDK executeSelectQuery Call");
            this.getObjectService().executeSelectQuery(query, success, error);

            function success(response) {
                voltmx.model.log.info("SDK executeSelectQuery Call Success");
                var primaryKeyColumns = self.getValueForProperty("primaryKey");
                if (response && response.length > 0) {
                    for (var key in response) {
                        var primaryKeyValueMap = {};
                        for (var i = 0; i < primaryKeyColumns.length; i++) {
                            if (response[key].hasOwnProperty(primaryKeyColumns[i])) {
                                primaryKeyValueMap[primaryKeyColumns[i]] = response[key][primaryKeyColumns[i]]
                            }
                        }
                        response[key]["primaryKeyValueMap"] = primaryKeyValueMap
                    }
                }
                succCallback(response)
            }

            function error(err) {
                voltmx.model.log.error("SDK executeSelectQuery Call Failed " + err);
                var exception = self.getApplicationContext().getFactorySharedInstance().createExceptionObject(-1, "Error executing executeSelectQuery", err);
                errCallback(exception)
            }
        } catch (err) {
            voltmx.model.log.error("Error fetching data for columns in entity controller");
            var exception = self.getApplicationContext().getFactorySharedInstance().createExceptionObject(-1, "Error executing executeSelectQuery", err);
            errCallback(exception)
        }
    };
    BaseModel.prototype.fetchResponse = function(options, onSuccess, onError) {
        var fetchInEntityCntrlTS = new Date;
        try {
            var self = this;
            var requestOptions = self.getRequestOptions(options);
            voltmx.model.log.info("Making SDK fetch Call");
            self.getObjectService().fetch(requestOptions, success, error)
        } catch (e) {
            var exception;
            if (e instanceof voltmx.model.Exception) exception = self.getApplicationContext().getFactorySharedInstance().createExceptionObject(e.code, e.message, e);
            else exception = self.getApplicationContext().getFactorySharedInstance().createExceptionObject(voltmx.model.ExceptionCode.CD_ERROR_FETCH, voltmx.model.ExceptionCode.MSG_ERROR_FETCH, e);
            onError(exception)
        }

        function success(response) {
            voltmx.model.log.info("SDK fetch Success");
            var records = response["records"];
            var primaryKeyColumns = self.getValueForProperty("primaryKey");
            if (records && records.length > 0) {
                for (var key in records) {
                    var primaryKeyValueMap = {};
                    for (var i = 0; i < primaryKeyColumns.length; i++) {
                        if (records[key].hasOwnProperty(primaryKeyColumns[i])) {
                            primaryKeyValueMap[primaryKeyColumns[i]] = records[key][primaryKeyColumns[i]]
                        }
                    }
                    records[key]["primaryKeyValueMap"] = primaryKeyValueMap
                }
            }
            var fetchEndInEntityCntrlTS = new Date;
            voltmx.model.Util.perftimecal("Fetch in entity controller >>", "Fetch in entity controller done >>", fetchInEntityCntrlTS, fetchEndInEntityCntrlTS);
            onSuccess(response)
        }

        function error(err) {
            voltmx.model.log.error("Error in fetching data for given query", err);
            var exception = self.getApplicationContext().getFactorySharedInstance().createExceptionObject(voltmx.model.ExceptionCode.CD_ERROR_FETCH, voltmx.model.ExceptionCode.MSG_ERROR_FETCH, err);
            onError(exception)
        }
    };
    BaseModel.prototype.fetchResponseWithRecords = function(options, onSuccess, onError) {
        var self = this;
        this.fetchResponse(options, success, onError);

        function success(response) {
            if (!response.hasOwnProperty("records")) {
                for (var key in response) {
                    if (response[key] instanceof Array) {
                        response["records"] = response[key];
                        break
                    }
                }
                var records = response["records"];
                var primaryKeyColumns = self.getValueForProperty("primaryKey");
                if (records && records.length > 0) {
                    for (var key in records) {
                        var primaryKeyValueMap = {};
                        for (var i = 0; i < primaryKeyColumns.length; i++) {
                            if (records[key].hasOwnProperty(primaryKeyColumns[i])) {
                                primaryKeyValueMap[primaryKeyColumns[i]] = records[key][primaryKeyColumns[i]]
                            }
                        }
                        records[key]["primaryKeyValueMap"] = primaryKeyValueMap
                    }
                }
            }
            onSuccess(response)
        }
    };
    BaseModel.prototype.customVerb = function(verbName, options, success, error) {
        var customVerbStartInEntityCtrlTS = new Date;
        try {
            var self = this;
            var requestOptions = self.getRequestOptions(options);
            voltmx.model.log.info("Making SDK custom verb Call");
            this.getApplicationContext().getObjectService({
                access: "online"
            }, this.getServiceName()).customVerb(verbName, options, onSuccess, onError)
        } catch (e) {
            var exception;
            if (e instanceof voltmx.model.Exception) exception = self.getApplicationContext().getFactorySharedInstance().createExceptionObject(e.code, e.message, e);
            else exception = self.getApplicationContext().getFactorySharedInstance().createExceptionObject(voltmx.model.ExceptionCode.CD_ERROR_CUSTOMVERB, voltmx.model.ExceptionCode.MSG_ERROR_CUSTOMVERB, e);
            onError(exception)
        }

        function onSuccess(response) {
            voltmx.model.log.info("SDK fetch Success");
            var records = response["records"];
            var primaryKeyColumns = self.getValueForProperty("primaryKey");
            if (records && records.length > 0) {
                for (var key in records) {
                    var primaryKeyValueMap = {};
                    for (var i = 0; i < primaryKeyColumns.length; i++) {
                        if (records[key].hasOwnProperty(primaryKeyColumns[i])) {
                            primaryKeyValueMap[primaryKeyColumns[i]] = records[key][primaryKeyColumns[i]]
                        }
                    }
                    records[key]["primaryKeyValueMap"] = primaryKeyValueMap
                }
            }
            var customVerbEndInEntityCtrlTS = new Date;
            voltmx.model.Util.perftimecal("Customverb call in entity controller >>", "CustomVerb call in entity controller done >>", customVerbStartInEntityCtrlTS, customVerbEndInEntityCtrlTS);
            success(response)
        }

        function onError(err) {
            voltmx.model.log.error("Error in custom verb call", err);
            var exception = self.getApplicationContext().getFactorySharedInstance().createExceptionObject(voltmx.model.ExceptionCode.CD_ERROR_CUSTOMVERB, voltmx.model.ExceptionCode.MSG_ERROR_CUSTOMVERB, err);
            error(exception)
        }
    };
    BaseModel.prototype.validate = function(dataObject, validationType) {
        return this.getControllerExtensionObject().validate(dataObject, validationType)
    };
    return BaseModel
}();
voltmx = voltmx || {};
voltmx.model = voltmx.model || {};
voltmx.model.MetadataServiceManagerMF = function() {
    function MetadataServiceManagerMF() {}
    MetadataServiceManagerMF.prototype.fetch = function(options, serviceName, metadataOptions, successcallback, errorCallback) {
        var objectService = voltmx.model.ApplicationContext.getObjectService(options, serviceName);
        voltmx.model.log.info("Making SDK metadata Call");
        objectService.getMetadataOfAllObjects(metadataOptions, successcallback, errorCallback)
    };
    MetadataServiceManagerMF.prototype.apply = function(response, options, serviceName, successcallback, errorCallback) {
        var entityMetaDataMap = {};
        for (var objectName in response) {
            var metadata = response[objectName];
            entityMetaDataMap[objectName] = metadata;
            var fields = metadata.columns;
            entityMetaDataMap[objectName]["columnsMap"] = {};
            for (var j = 0; j < fields.length; j++) {
                var field = fields[j];
                entityMetaDataMap[objectName]["columnsMap"][field.name] = field
            }
            setRelatedEntities(metadata);
            if (voltmx.model.ApplicationContext) {
                var metadataStore = voltmx.model.ApplicationContext.getMetadataStore();
                metadataStore.setEntityMetadata(entityMetaDataMap[objectName], objectName, serviceName, options)
            }
        }

        function setRelatedEntities(metadata) {
            var relationList = metadata["relationshipList"];
            var relatedEntities = {};
            for (var idx in relationList) {
                var relation = relationList[idx];
                var relatedEntity = {};
                relatedEntity["relationshipFields"] = relation.relationshipFields;
                relatedEntity["relationshipType"] = relation.relationshipType;
                relatedEntity["relationshipName"] = relation.relationshipName;
                relatedEntities[relation.relatedEntity] = relatedEntity
            }
            metadata["relatedEntities"] = relatedEntities
        }
        var result = {};
        result["dataModel"] = entityMetaDataMap;
        if (successcallback) successcallback(result)
    };
    MetadataServiceManagerMF.prototype.fetchForAllObjectServices = function(options, metadataOptions, success, error) {
        var self = this;

        function getAllObjectServicesFromSdk() {
            var objectServicesMapFromSdk = voltmx.model.Util.clone(voltmx.sdk.getCurrentInstance().objectsvc);
            if (voltmx.sdk.registeredobjsvcs)
                if (objectServicesMapFromSdk) objectServicesMapFromSdk = voltmx.model.Util.mergeJSONs(objectServicesMapFromSdk, voltmx.sdk.registeredobjsvcs);
                else objectServicesMapFromSdk = voltmx.sdk.registeredobjsvcs;
            var objectServicesNames = [];
            for (var key in objectServicesMapFromSdk) {
                if (key.indexOf("_metadata") === -1) {
                    objectServicesNames.push(key)
                }
            }
            return objectServicesNames
        }
        var objectServicesList = getAllObjectServicesFromSdk();
        var osvIndx = 0;
        self.fetch(options, objectServicesList[osvIndx], metadataOptions, successCbk, errorCbk);

        function successCbk(response) {
            voltmx.model.log.info("SDK metadata Call Success for ObjectService " + objectServicesList[osvIndx]);
            self.apply(response, options, objectServicesList[osvIndx]);
            osvIndx++;
            if (osvIndx >= objectServicesList.length) {
                success(response);
                return
            }
            self.fetch(options, objectServicesList[osvIndx], metadataOptions, successCbk, errorCbk)
        }

        function errorCbk(err) {
            voltmx.model.log.error("error fetching metadata" + JSON.stringify(err));
            error(err)
        }
    };
    MetadataServiceManagerMF.prototype.fetchForObjectService = function(serviceName, options, metadataOptions, success, error) {
        var self = this;
        self.fetch(options, serviceName, metadataOptions, successCbk, errorCbk);

        function successCbk(response) {
            self.apply(response, options, serviceName);
            success(response)
        }

        function errorCbk(err) {
            voltmx.model.log.error("error fetching metadata" + JSON.stringify(err));
            error(err)
        }
    };
    MetadataServiceManagerMF.prototype.fetchForObject = function(serviceName, entityName, options, metadataOptions, success, error) {
        var self = this;
        var objectService = voltmx.model.ApplicationContext.getObjectService(options, serviceName);
        voltmx.model.log.info("Making SDK metadata Call");
        objectService.getMetadataOfObject(entityName, metadataOptions, successCbk, errorCbk);

        function successCbk(response) {
            voltmx.model.log.info("SDK metadata Call Success for Object " + entityName);
            var res = {};
            res[entityName] = response;
            self.apply(res, options, serviceName);
            success(response)
        }

        function errorCbk(err) {
            voltmx.model.log.error("error fetching metadata" + JSON.stringify(err));
            error(err)
        }
    };
    MetadataServiceManagerMF.prototype.execute = function(params, success, error) {
        var scopeObj = this;
        this.fetchForAllObjectServices(params["options"], params["metadataOptions"], fetchSuccess, fetchError);

        function fetchSuccess(response) {
            success(response);
            return
        }

        function fetchError(err) {
            error(err);
            return
        }
    };
    return MetadataServiceManagerMF
}();
voltmx = voltmx || {};
voltmx.model = voltmx.model || {};
voltmx.model.MetadataStore = function() {
    function MetadataStore() {
        var serviceMetadata = {};
        this.getServiceMetadata = function(serviceName, options) {
            return serviceMetadata[serviceName]
        };
        this.setServiceMetadata = function(metadata, serviceName, options) {
            serviceMetadata[serviceName] = metadata
        }
    }
    MetadataStore.prototype.getEntityMetadata = function(entity, serviceName, options) {
        var svcMetadata = this.getServiceMetadata(serviceName, options);
        if (svcMetadata && svcMetadata[entity]) return svcMetadata[entity]
    };
    MetadataStore.prototype.setEntityMetadata = function(metadata, entity, serviceName, options) {
        var svcMetadata = this.getServiceMetadata(serviceName, options);
        if (!svcMetadata) svcMetadata = {};
        svcMetadata[entity] = metadata;
        this.setServiceMetadata(svcMetadata, serviceName, options)
    };
    return MetadataStore
}();
voltmx = voltmx || {};
voltmx.model = voltmx.model || {};
voltmx.model.log = voltmx.model.log || {};
voltmx.model.Util = voltmx.model.Util || {};
if (typeof voltmx.model.log === "undefined") {
    voltmx.model.log = {}
}
voltmx.model.log.NONE = {
    value: 0,
    name: "none",
    code: "NONE"
};
voltmx.model.log.FATAL = {
    value: 1,
    name: "fatal",
    code: "FATAL"
};
voltmx.model.log.ERROR = {
    value: 2,
    name: "error",
    code: "ERROR"
};
voltmx.model.log.WARN = {
    value: 3,
    name: "warn",
    code: "WARN"
};
voltmx.model.log.INFO = {
    value: 4,
    name: "info",
    code: "INFO"
};
voltmx.model.log.DEBUG = {
    value: 5,
    name: "debug",
    code: "DEBUG"
};
voltmx.model.log.TRACE = {
    value: 6,
    name: "trace",
    code: "TRACE"
};
voltmx.model.currentLogLevel = voltmx.model.log.INFO;
voltmx.model.log.trace = function(msg, params) {
    voltmx.model.logger(voltmx.model.log.TRACE, "MVVM", msg, params)
};
voltmx.model.log.debug = function(msg, params) {
    voltmx.model.logger(voltmx.model.log.DEBUG, "MVVM", msg, params)
};
voltmx.model.log.info = function(msg, params) {
    voltmx.model.logger(voltmx.model.log.INFO, "MVVM", msg, params)
};
voltmx.model.log.warn = function(msg, params) {
    voltmx.model.logger(voltmx.model.log.WARN, "MVVM", msg, params)
};
voltmx.model.log.error = function(msg, params) {
    voltmx.model.logger(voltmx.model.log.ERROR, "MVVM", msg, params)
};
voltmx.model.log.fatal = function(msg, params) {
    voltmx.model.logger(voltmx.model.log.FATAL, "MVVM", msg, params)
};
voltmx.model.log.setLogLevel = function(level, logSuccessCallback, logFailureCallback) {
    switch (level) {
        case voltmx.model.log.NONE:
            voltmx.model.currentLogLevel = voltmx.model.log.NONE;
            break;
        case voltmx.model.log.TRACE:
            voltmx.model.currentLogLevel = voltmx.model.log.TRACE;
            break;
        case voltmx.model.log.INFO:
            voltmx.model.currentLogLevel = voltmx.model.log.INFO;
            break;
        case voltmx.model.log.WARN:
            voltmx.model.currentLogLevel = voltmx.model.log.WARN;
            break;
        case voltmx.model.log.ERROR:
            voltmx.model.currentLogLevel = voltmx.model.log.ERROR;
            break;
        case voltmx.model.log.FATAL:
            voltmx.model.currentLogLevel = voltmx.model.log.FATAL;
            break;
        case voltmx.model.log.DEBUG:
            voltmx.model.currentLogLevel = voltmx.model.log.DEBUG;
            break;
        default:
            voltmx.model.log.error("Failed in setting log level " + level);
            logFailureCallback("Failed in setting log level " + level);
            return
    }
    voltmx.model.log.info("Log Level successfully set to " + voltmx.model.currentLogLevel.name);
    logSuccessCallback("Log Level successfully set to " + voltmx.model.currentLogLevel.name)
};
voltmx.model.log.isDebugEnabled = function() {
    return voltmx.model.currentLogLevel.value >= voltmx.model.log.DEBUG.value
};
voltmx.model.log.isTraceEnabled = function() {
    return voltmx.model.currentLogLevel.value >= voltmx.model.log.TRACE.value
};
voltmx.model.log.isInfoEnabled = function() {
    return voltmx.model.currentLogLevel.value >= voltmx.model.log.INFO.value
};
voltmx.model.log.isWarnEnabled = function() {
    return voltmx.model.currentLogLevel.value >= voltmx.model.log.WARN.value
};
voltmx.model.log.isFatalEnabled = function() {
    return voltmx.model.currentLogLevel.value >= voltmx.model.log.FATAL.value
};
voltmx.model.log.isErrorEnabled = function() {
    return voltmx.model.currentLogLevel.value >= voltmx.model.log.ERROR.value
};
voltmx.model.log.isNoneEnabled = function() {
    return voltmx.model.currentLogLevel.value === voltmx.model.log.NONE.value
};
voltmx.model.log.getCurrentLogLevel = function() {
    return voltmx.model.currentLogLevel
};
voltmx.model.Util.isNullOrUndefined = function(val) {
    if (val === null || val === undefined) {
        return true
    } else {
        return false
    }
};
voltmx.model.Util.isValidJs = function(inputTable) {
    if (voltmx.model.Util.isNullOrUndefined(inputTable)) {
        return false
    }
    return voltmx.type(inputTable) === "object" || voltmx.type(inputTable) === "Object" || voltmx.type(inputTable) === "Array"
};
voltmx.model.logger = function(logLevel, tag, msg, params) {
    if (logLevel.value <= voltmx.model.currentLogLevel.value) {
        params = typeof params === "undefined" ? "" : params;
        if (tag === undefined || tag === null) {
            tag = "AFN"
        }
        if (voltmx.model.Util.isValidJs(params)) {
            params = voltmx.model.Util.stringifyObject(params)
        }
        var date = (new Date).toLocaleDateString();
        var time = (new Date).toLocaleTimeString();
        var level = logLevel.code;
        var formattedMessage = "[" + date + "][" + time + "][" + tag + "][" + level + "] : " + msg + " " + params;
        if (voltmx.model.error_alert && logLevel.value == voltmx.model.log.ERROR.value) alert(formattedMessage);
        voltmx.print(formattedMessage)
    }
};
voltmx.model.Util.stringifyObject = function(obj) {
    var str;
    try {
        if (obj instanceof Error || obj instanceof voltmx.model.Exception) {
            str = obj.toString()
        } else {
            str = JSON.stringify(obj)
        }
    } catch (e) {
        str = ""
    }
    return str
};
voltmx.model.print = function(statement) {
    if (typeof voltmx !== "undefined" && typeof voltmx.print === "function") {
        voltmx.print(statement)
    } else if (typeof console !== "undefined" && typeof console.log === "function") {
        console.log(statement)
    }
};
voltmx = voltmx || {};
voltmx.model = voltmx.model || {};
voltmx.model.DataAccessAppsExceptionCode = {
    CD_ERROR_10000: 1e4,
    CD_ERROR_10001: 10001,
    CD_ERROR_10002: 10002,
    CD_ERROR_10003: 10003,
    CD_ERROR_10004: 10004,
    CD_ERROR_10005: 10005,
    CD_ERROR_10006: 10006,
    CD_ERROR_10007: 10007,
    CD_ERROR_10008: 10008,
    CD_ERROR_10009: 10009,
    CD_ERROR_10010: 10010,
    CD_ERROR_10011: 10011,
    CD_ERROR_10012: 10012,
    CD_ERROR_10013: 10013,
    CD_ERROR_10014: 10014,
    CD_ERROR_10015: 10015,
    CD_ERROR_10016: 10016,
    CD_ERROR_10017: 10017,
    CD_ERROR_10018: 10018,
    CD_ERROR_10019: 10019,
    CD_ERROR_10020: 10020,
    CD_ERROR_10021: 10021,
    CD_ERROR_10022: 10022,
    CD_ERROR_10023: 10023,
    CD_ERROR_10024: 10024,
    CD_ERROR_10025: 10025,
    CD_ERROR_10026: 10026,
    CD_ERROR_10027: 10027,
    CD_ERROR_10028: 10028,
    CD_ERROR_10029: 10029,
    CD_ERROR_10030: 10030,
    CD_ERROR_10031: 10031,
    CD_ERROR_10032: 10032,
    CD_ERROR_10033: 10033,
    CD_ERROR_10034: 10034,
    CD_ERROR_10035: 10035,
    CD_ERROR_10036: 10036,
    CD_ERROR_10037: 10037,
    CD_ERROR_10038: 10038,
    CD_ERROR_10039: 10039,
    CD_ERROR_10040: 10040,
    CD_ERROR_10041: 10041,
    CD_ERROR_10042: 10042,
    CD_ERROR_10043: 10043,
    CD_ERROR_10044: 10044,
    CD_ERROR_10045: 10045,
    CD_ERROR_10046: 10046,
    CD_ERROR_10047: 10047,
    CD_ERROR_10048: 10048,
    CD_ERROR_10049: 10049,
    CD_ERROR_10050: 10050,
    CD_ERROR_10051: 10051,
    CD_ERROR_10052: 10052,
    CD_ERROR_10053: 10053,
    CD_ERROR_10054: 10054,
    CD_ERROR_10055: 10055,
    CD_ERROR_10056: 10056,
    CD_ERROR_10057: 10057,
    CD_ERROR_10058: 10058,
    CD_ERROR_10059: 10059,
    CD_ERROR_10060: 10060,
    CD_ERROR_10061: 10061,
    CD_ERROR_10062: 10062,
    CD_ERROR_10063: 10063,
    CD_ERROR_10064: 10064,
    CD_ERROR_10065: 10065,
    CD_ERROR_10066: 10066,
    CD_ERROR_10067: 10067,
    CD_ERROR_10068: 10068,
    CD_ERROR_10069: 10069,
    CD_ERROR_10070: 10070,
    CD_ERROR_10071: 10071,
    CD_ERROR_10072: 10072,
    CD_ERROR_10073: 10073,
    CD_ERROR_10074: 10074,
    CD_ERROR_10075: 10075,
    CD_ERROR_10076: 10076,
    CD_ERROR_10077: 10077,
    CD_ERROR_10078: 10078,
    CD_ERROR_10079: 10079,
    CD_ERROR_10080: 10080,
    CD_ERROR_10081: 10081,
    CD_ERROR_10082: 10082,
    CD_ERROR_10083: 10083,
    CD_ERROR_10084: 10084,
    CD_ERROR_10085: 10085,
    CD_ERROR_10086: 10086,
    CD_ERROR_10087: 10087,
    CD_ERROR_10088: 10088,
    CD_ERROR_10089: 10089,
    CD_ERROR_10090: 10090,
    CD_ERROR_10091: 10091,
    CD_ERROR_10092: 10092,
    CD_ERROR_10094: 10094,
    CD_ERROR_10095: 10095,
    CD_ERROR_10096: 10096,
    CD_ERROR_10097: 10097,
    CD_ERROR_10098: 10098,
    CD_ERROR_10099: 10099,
    CD_ERROR_10100: 10100,
    CD_ERROR_10101: 10101,
    CD_ERROR_10102: 10102,
    CD_ERROR_10104: 10104,
    CD_ERROR_10105: 10105,
    CD_ERROR_10106: 10106,
    CD_ERROR_10108: 10108,
    CD_ERROR_10109: 10109,
    CD_ERROR_10110: 10110,
    CD_ERROR_10111: 10111,
    CD_ERROR_10112: 10112,
    CD_ERROR_10113: 10113,
    CD_ERROR_10114: 10114,
    CD_ERROR_10115: 10115,
    CD_ERROR_10116: 10116,
    CD_ERROR_10117: 10117,
    CD_ERROR_10118: 10118,
    CD_ERROR_10119: 10119,
    CD_ERROR_10120: 10120,
    CD_ERROR_10121: 10121,
    CD_ERROR_10122: 10122,
    CD_ERROR_10123: 10123,
    CD_ERROR_10124: 10124,
    CD_ERROR_10125: 10125,
    CD_ERROR_10126: 10126,
    CD_ERROR_10127: 10127,
    CD_ERROR_10128: 10128,
    CD_ERROR_10129: 10129,
    CD_ERROR_10130: 10130,
    CD_ERROR_10131: 10131,
    CD_ERROR_10132: 10132,
    CD_ERROR_10133: 10133,
    CD_ERROR_10134: 10134,
    CD_ERROR_10135: 10135,
    CD_ERROR_10136: 10136,
    CD_ERROR_10137: 10137,
    CD_ERROR_10138: 10138,
    CD_ERROR_10139: 10139,
    CD_ERROR_10140: 10140,
    CD_ERROR_10141: 10141,
    CD_ERROR_10142: 10142,
    CD_ERROR_10143: 10143,
    CD_ERROR_10144: 10144,
    CD_ERROR_10145: 10145,
    CD_ERROR_10146: 10146,
    CD_ERROR_10147: 10147,
    CD_ERROR_10148: 10148,
    CD_ERROR_10149: 10149,
    MSG_ERROR_10000: "Unable to execute delete query",
    MSG_ERROR_10001: "SQLLite Error occurred",
    MSG_ERROR_10002: "Invalid Table configuration in the Database",
    MSG_ERROR_10003: "Entity does not exist in the Database",
    MSG_ERROR_10004: "There is no relationship/definiton defined for the Entity in Enterprise DB",
    MSG_ERROR_10005: "Invalid column name",
    MSG_ERROR_10006: "Column does not exist in the Database",
    MSG_ERROR_10007: "Unable to execute Insert query",
    MSG_ERROR_10008: "Specified column datatype doesnot match with datatype from field mapping",
    MSG_ERROR_10009: "Unique constraint check failed as the data already exist in DB",
    MSG_ERROR_10010: "Specified foreign key is not found",
    MSG_ERROR_10011: "Unable to execute Select query",
    MSG_ERROR_10012: "Invalid Meta Column Name Usage. Correct usage is COLUMNNAME__f",
    MSG_ERROR_10013: "Invalid Meta Column Name Usage in Join Clause. Correct usage is COLUMNNAME__f",
    MSG_ERROR_10014: "Unable to execute update query",
    MSG_ERROR_10015: "No columns specified for updating",
    MSG_ERROR_10016: "Column name either null or empty in update builder",
    MSG_ERROR_10017: "Specified foreign key is not found, Rolled back transaction",
    MSG_ERROR_10018: "Value is null",
    MSG_ERROR_10019: "Column data type does not match the value",
    MSG_ERROR_10020: "No columns specified for update",
    MSG_ERROR_10021: "Invalid table name",
    MSG_ERROR_10022: "Connection NOT created from pool",
    MSG_ERROR_10023: "User id invalid",
    MSG_ERROR_10024: "Invalid arguments to com.kony.common.DataAccess.Query.Between Constructor",
    MSG_ERROR_10025: "Invalid arguments to setColumn of com.kony.common.DataAccess.Query.Between",
    MSG_ERROR_10026: "Invalid arguments to setRange of com.kony.common.DataAccess.Query.Between",
    MSG_ERROR_10027: "Invalid Column name passed to com.kony.common.DataAccess.Query.Column Constructor .\nExpected:Table\nActual:",
    MSG_ERROR_10028: "Invalid data type for the attribute in com.kony.common.DataAccess.Query.Column Constructor",
    MSG_ERROR_10029: "Invalid ColumnName to SetName of com.kony.common.DataAccess.Query.Column",
    MSG_ERROR_10030: "Invalid arguments to setTable of com.kony.common.DataAccess.Query.Column",
    MSG_ERROR_10031: "Invalid arguments to com.kony.common.DataAccess.Query.Range.DateRange Constructor",
    MSG_ERROR_10032: "Invalid arguments to setEnd of com.kony.common.DataAccess.Query.Range.DateRange",
    MSG_ERROR_10033: "Invalid arguments to setStart of com.kony.common.DataAccess.Query.Range.DateRange",
    MSG_ERROR_10034: "Invalid arguments to com.kony.common.DataAccess.Query.Range.DecimalRange Constructor",
    MSG_ERROR_10035: "Invalid arguments to setEnd of com.kony.common.DataAccess.Query.Range.DecimalRange",
    MSG_ERROR_10036: "Invalid arguments to setStart of com.kony.common.DataAccess.Query.Range.DecimalRange",
    MSG_ERROR_10037: "Invalid data type for the attribute subSelect in com.kony.common.DataAccess.Query.Exists Constructor \nExpected:SelectQuery\nActual:",
    MSG_ERROR_10038: "Invalid data type for the attribute subSelect in com.kony.common.DataAccess.Query.Exists.prototype.setSubSelect \nExpected:SelectQuery\nActual:",
    MSG_ERROR_10039: "Invalid arguments to com.kony.common.DataAccess.Query.Expression Constructor",
    MSG_ERROR_10040: "Invalid number of arguments to com.kony.common.DataAccess.Query.Expression",
    MSG_ERROR_10041: "Invalid Operator type passed to com.kony.common.DataAccess.Query.Expression",
    MSG_ERROR_10042: "Invalid arguments for the attribute com.kony.common.DataAccess.Query.Expression initExpression",
    MSG_ERROR_10043: "Invalid arguments for the attribute com.kony.common.DataAccess.Query.Expression setExpression",
    MSG_ERROR_10044: "Invalid arguments for the attribute com.kony.common.DataAccess.Query.Expression setTerm",
    MSG_ERROR_10045: "Invalid arguments to setEnd of com.kony.common.DataAccess.Query.Range.FloatRange",
    MSG_ERROR_10046: "Invalid arguments to setStart of com.kony.common.DataAccess.Query.Range.FloatRange",
    MSG_ERROR_10047: "Invalid argument for the attribute in com.kony.common.DataAccess.Query.Group",
    MSG_ERROR_10048: "Invalid arguments for the attribute in com.kony.common.DataAccess.Query.Group.prototype.setColumn",
    MSG_ERROR_10049: "Invalid number of arguments passed to com.kony.common.DataAccess.Query.InCriteria",
    MSG_ERROR_10050: "Invalid arguments for getInCriteriaByTableAndCollection in com.kony.common.DataAccess.Query.InCriteria",
    MSG_ERROR_10051: "Invalid arguments for getInCriteriaByColumnAndCollection in com.kony.common.DataAccess.Query.InCriteria",
    MSG_ERROR_10052: "Invalid arguments for getColumnForTable in com.kony.common.DataAccess.Query.InCriteria",
    MSG_ERROR_10053: "Invalid arguments to com.kony.common.DataAccess.Query.Range.IntegerRange Constructor",
    MSG_ERROR_10054: "Invalid arguments to setEnd of com.kony.common.DataAccess.Query.Range.IntegerRange",
    MSG_ERROR_10055: "Invalid arguments to setStart of com.kony.common.DataAccess.Query.Range.IntegerRange",
    MSG_ERROR_10056: "Invalid arguments passed for  com.kony.common.DataAccess.Query.Join",
    MSG_ERROR_10057: "Invalid arguments passed for the method in com.kony.common.DataAccess.Query.Join",
    MSG_ERROR_10058: "Invalid arguments passed for the method setCriteria in com.kony.common.DataAccess.Query.Join",
    MSG_ERROR_10059: "Invalid arguments passed for the method setTable in com.kony.common.DataAccess.Query.Join",
    MSG_ERROR_10060: "Invalid arguments passed for the method setJoinType in com.kony.common.DataAccess.Query.Join",
    MSG_ERROR_10061: "Invalid arguments passed for the method initCriteria in com.kony.common.DataAccess.Query.Join",
    MSG_ERROR_10062: "Insufficient input passed to com.kony.common.DataAccess.Query.And Constructor",
    MSG_ERROR_10063: "Invalid data type for com.kony.common.DataAccess.Query.And Expected value Criteria",
    MSG_ERROR_10064: "Insufficient input passed to com.kony.common.DataAccess.Query.Or Constructor",
    MSG_ERROR_10065: "Invalid data type for com.kony.common.DataAccess.Query.Or Expected value Criteria",
    MSG_ERROR_10066: "Insufficient input passed to com.kony.common.DataAccess.Query.Not Constructor",
    MSG_ERROR_10067: "Invalid data type for com.kony.common.DataAccess.Query.Not Expected value Criteria",
    MSG_ERROR_10068: "Invalid match type passed in com.kony.common.DataAccess.Query.Match.prototype.initMatchByColumn",
    MSG_ERROR_10069: "Invalid value passed in com.kony.common.DataAccess.Query.Match.prototype.initMatchByColumn",
    MSG_ERROR_10070: "Invalid arguments passed for the method initMatchByColumn in com.kony.common.DataAccess.Query.Match.prototype.initMatchByColumn.",
    MSG_ERROR_10071: "Invalid match type passed in com.kony.common.DataAccess.Query.Match.prototype.initMatchByTableAndColName",
    MSG_ERROR_10072: "Invalid value passed in com.kony.common.DataAccess.Query.Match.prototype.initMatchByTableAndColName",
    MSG_ERROR_10073: "Invalid columnName passed in com.kony.common.DataAccess.Query.Match.prototype.initMatchByTableAndColName",
    MSG_ERROR_10074: "Invalid arguments passed for the method initMatchByTableAndColName in com.kony.common.DataAccess.Query.Match",
    MSG_ERROR_10075: "Match object not initialized properly  in com.kony.common.DataAccess.Query.Match",
    MSG_ERROR_10076: "Invalid arguments passed for the constructor in com.kony.common.DataAccess.Query.Order",
    MSG_ERROR_10077: "Invalid arguments for the method setColumn in com.kony.common.DataAccess.Query.Order",
    MSG_ERROR_10078: "Invalid arguments to com.kony.common.DataAccess.Query.Range.StringRange Constructor",
    MSG_ERROR_10079: "Invalid arguments to setEnd of com.kony.common.DataAccess.Query.Range.StringRange",
    MSG_ERROR_10080: "Invalid arguments to setStart of com.kony.common.DataAccess.Query.Range.StringRange",
    MSG_ERROR_10081: "Invalid Arguments passed to DeleteBuilder.addCriteria",
    MSG_ERROR_10082: "Invalid data type for the attribute in DeleteBuilder.addCriteria. Expected: Criteria | Actual:",
    MSG_ERROR_10083: "Invalid data type for the attribute in DeleteBuilder . Expected: Table | Actual:",
    MSG_ERROR_10084: "Invalid data type for the attribute in com.kony.common.DataAccess.Query.InsertQuery .\nExpected:Table\nActual:",
    MSG_ERROR_10085: "Invalid data type for the attribute in com.kony.common.DataAccess.Query.InsertQuery.prototype.addColumn .\nExpected:Column\nActual:",
    MSG_ERROR_10086: "Invalid data type for the attribute in com.kony.common.DataAccess.Query.InsertQuery.prototype.addColumnToTable .\nExpected:String\nActual:",
    MSG_ERROR_10087: "Invalid data type for the attribute in com.kony.common.DataAccess.Query.InsertQuery.prototype.addColumnToTable .\nExpected:Table\nActual:",
    MSG_ERROR_10088: "Invalid data type for the attribute in com.kony.common.DataAccess.Query.InsertQuery.prototype.removeColumn .\nExpected:Table\nActual:",
    MSG_ERROR_10089: "Invalid Arguments passed to SelectBuilder",
    MSG_ERROR_10090: "Invalid data type for the attribute in SelectBuilder .\nExpected:Table\nActual:",
    MSG_ERROR_10091: "Invalid Arguments passed to selectBuilder.addColumn",
    MSG_ERROR_10092: "Invalid data type for the attribute in selectBuilder.addColumn .\nExpected:Column\nActual:",
    MSG_ERROR_10094: "Invalid data type for the attribute in SelectBuilder.\nExpected:Table\nActual:",
    MSG_ERROR_10095: "Invalid Arguments of Alias passed to selectBuilder ",
    MSG_ERROR_10096: "Invalid data type for the attribute in selectBuilder.\nExpected:Table\nActual:",
    MSG_ERROR_10097: "Invalid Arguments passed to selectBuilder.addCriteria",
    MSG_ERROR_10098: "Invalid data type for the attribute in selectBuilder.addCriteria .\nExpected:Criteria\nActual:",
    MSG_ERROR_10099: "Invalid Arguments passed to selectBuilder.addGroup",
    MSG_ERROR_10100: "Invalid data type for the attribute in selectBuilder.addGroup .\nExpected:Group\nActual:",
    MSG_ERROR_10101: "Invalid Arguments passed to selectBuilder.addJoin",
    MSG_ERROR_10102: "Invalid data type for the attribute in SelectBuilder.addJoin .\nExpected:Criteria\nActual:",
    MSG_ERROR_10104: "Invalid data type for the attribute in SelectBuilder",
    MSG_ERROR_10105: "Invalid Arguments passed to selectBuilder.addOrder",
    MSG_ERROR_10106: "Invalid data type for the attribute in selectBuilder.addOrder \nExpected:Order\nActual:",
    MSG_ERROR_10108: "Invalid data type for the attribute in SelectBuilder \nExpected:Table\nActual:",
    MSG_ERROR_10109: "Invalid Arguments passed to selectBuilder.removeColumn",
    MSG_ERROR_10110: "Invalid data type for the attribute in selectBuilder.removeColumn \nExpected:Column\nActual:",
    MSG_ERROR_10111: "Invalid Arguments passed to selectBuilder.removeCriteria",
    MSG_ERROR_10112: "Invalid data type for the attribute in selectBuilder.removeCriteria \nExpected:Criteria\nActual:",
    MSG_ERROR_10113: "Invalid Arguments passed to selectBuilder.removeGroup",
    MSG_ERROR_10114: "Invalid data type for the attribute in selectBuilder.removeGroup \nExpected:Group\nActual:",
    MSG_ERROR_10115: "Invalid Arguments passed to selectBuilder.removeJoin",
    MSG_ERROR_10116: "Invalid data type for the attribute in selectBuilder.removeJoin \nExpected:Group\nActual:",
    MSG_ERROR_10117: "Invalid data type for the attribute in SelectBuilder \nExpected:Group\nActual:",
    MSG_ERROR_10118: "Invalid Arguments passed to UpdateQuery",
    MSG_ERROR_10119: "Invalid data type for the attribute in UpdateQuery .\nExpected:Table\nActual:",
    MSG_ERROR_10120: "Invalid Arguments passed to UpdateBuilder.addColumn method",
    MSG_ERROR_10121: "Invalid data type for the attribute in UpdateBuilder.addColumn method",
    MSG_ERROR_10122: "Invalid Arguments passed to UpdateBuilder.addColumnByColumnNameAndValue",
    MSG_ERROR_10123: "Invalid data type for the attribute in UpdateBuilder.addColumnByColumnNameAndValue",
    MSG_ERROR_10124: "Invalid Arguments passed to UpdateBuilder.addCriteria",
    MSG_ERROR_10125: "Invalid data type for the attribute in UpdateBuilder.addCriteria .\nExpected:Criteria\nActual:",
    MSG_ERROR_10126: "Invalid Arguments passed to UpdateBuilder.removeCriteria",
    MSG_ERROR_10127: "Invalid data type for the attribute in UpdateBuilder.removeCriteria .\nExpected:Criteria\nActual:",
    MSG_ERROR_10128: "Invalid Arguments passed to UpdateBuilder",
    MSG_ERROR_10129: "Invalid data type for the attribute in UpdateBuilder .\nExpected:Table\nActual:",
    MSG_ERROR_10130: "Invalid number of arguments to com.kony.common.DataAccess.Query.InsertQuery.prototype.addColumn",
    MSG_ERROR_10131: "unknown database error occured. please verify the table and columns names.",
    MSG_ERROR_10132: "No parent keys found.",
    MSG_ERROR_10133: "field object is empty",
    MSG_ERROR_10134: "Given JoinType doesn't support",
    MSG_ERROR_10135: "Cannot insert record as the integrity failed with",
    MSG_ERROR_10136: "error occurred during language fetch",
    MSG_ERROR_10137: "No logical fields exist for the table",
    MSG_ERROR_10138: "unknown database error occured. please verify the table and column names/values.",
    MSG_ERROR_10139: "Invalid number of arguments to com.kony.common.DataAccess.Query.Match",
    MSG_ERROR_10140: "Invalid number of arguments to com.kony.common.DataAccess.Query.Join",
    MSG_ERROR_10141: "Entity with name doesn't exist",
    MSG_ERROR_10142: "Invalid Meta Column Name Usage, Correct usage COLUMNNAME__f",
    MSG_ERROR_10143: "Table does not exist in the database",
    MSG_ERROR_10144: "Column does not exist in table",
    MSG_ERROR_10145: "Table is undefined.Please provide valid table name",
    MSG_ERROR_10146: "Invalid Arguments passed to DeleteBuilder",
    MSG_ERROR_10147: "Invalid Arguments passed to InsertBuilder",
    MSG_ERROR_10148: "No data found to update with the selected criteria",
    MSG_ERROR_10149: "The request could not be completed."
};
voltmx.model.Exception = function() {
    function toStringRecursive(exception, output) {
        var intermOutput;
        if (exception == undefined) return output.append("");
        if (exception.getErrorObj()) {
            if (exception.getErrorObj().name && exception.getErrorObj().message) output.append(exception.getErrorObj().name + ": " + exception.getErrorObj().message + ": " + exception.getErrorObj().sourceURL);
            else output.append(JSON.stringify(exception.getErrorObj()));
            output.append("\n");
            return output.append(exception.code + ":" + exception.message + "\n")
        }
        intermOutput = toStringRecursive(exception.exceptionObj, output);
        intermOutput.append(exception.code + ":" + exception.message);
        intermOutput.append("\n");
        return intermOutput
    }

    function getRootErrObj(exception) {
        if (exception && exception.exceptionObj != undefined && exception.getErrorObj() == undefined) {
            var intermErrObj = getRootErrObj(exception.exceptionObj);
            return intermErrObj
        } else if (exception && exception.exceptionObj == undefined && exception.getErrorObj() != undefined) {
            return exception.getErrorObj()
        } else {
            return undefined
        }
    }

    function Exception(code, message, exceptionObj) {
        this.code = typeof code === "number" ? code : -1;
        this.message = typeof message === "string" ? message : "";
        this.name = "Exception";
        var actualErrorObj;
        if (exceptionObj instanceof voltmx.model.Exception) {
            this.exceptionObj = exceptionObj;
            actualErrorObj = undefined
        } else {
            actualErrorObj = exceptionObj;
            this.exceptionObj = undefined
        }
        this.getErrorObj = function() {
            return actualErrorObj
        };
        this.getParentException = function() {
            return this.exceptionObj
        }
    }
    inheritsFrom(Exception, Error);
    Exception.prototype.toString = function() {
        var output = new voltmx.model.Util.StringBuffer;
        output = toStringRecursive(this, output);
        return output.toString()
    };
    Exception.prototype.alert = function(full) {
        if (full === true) {
            var output = new voltmx.model.Util.StringBuffer;
            output = toStringRecursive(this, output);
            alert(output.toString())
        } else alert(this.code + ":" + this.name + ":" + this.message)
    };
    Exception.prototype.setSyncResponse = function(response) {
        this.syncresponse = response
    };
    Exception.prototype.getRootErrorObj = function() {
        var rootErrObj = getRootErrObj(this);
        return rootErrObj
    };
    return Exception
}();
voltmx.model.ExceptionCode = {
    CD_ERROR_LOADING_TEMPLATES: 3,
    CD_ERROR_FAILED_TO_CREATE_RECORD: 9,
    CD_ERROR_FAILED_TO_UPDATE_RECORD: 10,
    CD_ERROR_CALLBACK_NOT_A_FUNCTION: 11,
    CD_ERROR_LOGIN_FAILURE: 12,
    CD_ERROR_SESSION_TOKEN_INVALID: 13,
    CD_ERROR_FAILED_TO_SAVE_FORM: 14,
    CD_ERROR_FAILED_TO_FETCH_DATA: 15,
    CD_ERROR_FAILED_TO_INITIALIZE_FORM: 16,
    CD_ERROR_FETCHING_METADATA: 17,
    CD_ERROR_MORE_RECORDS_FOUND: 18,
    CD_ERROR_FETCHING_TEMPLATES: 19,
    CD_ERROR_FETCHING_FORMS: 20,
    CD_ERROR_INITIALIZING_UI_CONFIG_DATA_PROVIDER: 21,
    CD_ERROR_INITIALIZING_METADATA_PROVIDER: 22,
    CD_ERROR_INITIALIZING_DATA_PROVIDER: 23,
    CD_ERROR_FAILED_TO_LOAD_APPLICATION: 24,
    CD_ERROR_APP_INITIALIZATION_FAILED: 25,
    CD_ERROR_INITIALIZING_SAAS_APP: 26,
    CD_ERROR_FORMVIEWCONTROLLER_NOT_FOUND: 27,
    CD_ERROR_NAVIGATION_STACK_EMPTY: 28,
    CD_ERROR_FORM_NOT_FOUND: 29,
    CD_ERROR_METADATA_FOR_ENTITY_NOT_FOUND: 30,
    CD_ERROR_NO_FIELDS_MODIFIED_UPDATE_FAILED: 31,
    CD_ERROR_PRIMARY_FIELD_VALUE_NOT_FOUND: 32,
    CD_ERROR_UNDEFINED_WIDGET_CONTROLLER: 33,
    CD_ERROR_FAILED_TO_LOGOUT: 35,
    CD_ERROR_FAILED_LOADING_MASTER_DATA: 36,
    CD_ERROR_FAILED_TO_NAVIGATE_TO_FORM: 37,
    CD_ERROR_PARSING_JSONS: 38,
    CD_ERROR_FAILED_LOADING_FORMS: 39,
    CD_ERROR_FAILED_FORM_INIT_WHILE_CALLBACK: 40,
    CD_ERROR_KONY_FORM_OBJECT_UNDEFINED: 41,
    CD_ERROR_SAVE_CANNOT_SET_PRIMARY_KEY: 42,
    CD_ERROR_FETCH_FAILED_FOR_CHILD_ENTITY: 43,
    CD_ERROR_GET_NEXT_LIST: 44,
    CD_ERROR_UNSUPPORTED_SEGMENT_TYPE: 45,
    CD_ERROR_NOT_INHERITING_VIEW_CONTROLLER: 46,
    CD_ERROR_NOT_INHERITING_WIDGET_CONTROLLER: 47,
    CD_ERROR_FAILED_BINDING_DATA_TO_WIDGET: 48,
    CD_ERROR_PAGINATION_NOT_ENABLED_FOR_SEGMENT: 49,
    CD_ERROR_PARAM_VALUE_NOT_DEFINED_IN_QUERYPARAM: 50,
    CD_ERROR_BRACES_ARE_NOT_DEFINED_PROPERLY: 51,
    CD_ERROR_ADDITIONAL_FIELDS_ARE_NOT_DEFINED_PROPERLY: 52,
    CD_ERROR_QUERY_NOT_DEFINED_PROPERLY: 53,
    CD_ERROR_QUERYPARAMS_NOT_DEFINED_PROPERLY: 54,
    CD_ERROR_MATCHOPERATOR_NOT_DEFINED_PROPERLY: 55,
    CD_ERROR_DATA_VALIDATION_FIELD_NOT_CREATEABLE: 56,
    CD_ERROR_DATA_VALIDATION_FIELD_NOT_UPDATEABLE: 57,
    CD_ERROR_DATA_VALIDATION_FIELD_NOT_NULLABLE: 58,
    CD_ERROR_DATA_VALIDATION_INVALID_INPUT_DATA: 59,
    CD_ERROR_DATA_VALIDATION_INVALID_MODEL: 60,
    CD_ERROR_DATA_VALIDATION_INVALID_ENTITY: 61,
    CD_ERROR_DATA_VALIDATION_ENTITYMETADATA_NOTFOUND: 62,
    CD_ERROR_CREATING_APPMENU: 63,
    CD_ERROR_FETCHING_APPMENU_DATA: 64,
    CD_ERROR_FIELD_NOT_PRESENT: 65,
    cd_ERROR_ENITTY_NOT_PRESENT: 66,
    CD_TENANT_NOT_SYNC_ENABLED: 67,
    CD_INVALID_QUERY: 68,
    CD_ERROR_FETCH_USER_PROFILE_FAILURE: 69,
    CD_RESOURCE_NO_CREATE_PERMISSION: 74,
    CD_RESOURCE_NO_READ_PERMISSION: 75,
    CD_RESOURCE_NO_UPDATE_PERMISSION: 76,
    CD_RESOURCE_NO_DELETE_PERMISSION: 77,
    CD_ERROR_OFFLINE_LOGIN_FAILURE: 70,
    CD_ERROR_UNABLE_TO_SYNC: 71,
    CD_ERROR_UNABLE_TO_GET_SYNC_CONFIG: 72,
    CD_ERROR_UNABLE_TO_RESET_SYNC: 73,
    CD_ERROR_NO_RESPONSE_RECEIVED: 78,
    CD_ERROR_NETWORK_UNAVAILABLE: 79,
    CD_ERROR_IN_SET_ADDITIONAL_FIELDS: 80,
    CD_ERROR_IN_SET_QUERY: 81,
    CD_ERROR_IN_SET_QUERY_PARAMS: 82,
    CD_ERROR_ENTER_VALID_TENANT_NAME: 83,
    CD_ERROR_NAVIGATION_CONTROLLER_NOT_DEFINED: 84,
    CD_ERROR_ENTITY_NOT_SPECIFIED: 85,
    CD_ERROR_FORMTYPE_NOT_SPECIFIED: 86,
    CD_ERROR_FORM_NOT_DEFINED_FOR_RECORDTYPE: 87,
    CD_ERROR_RECORDTYPES_NOT_AVAILABLE: 88,
    CD_ERROR_FORMSFORRECORDTYPES_MAP_NOT_DEFINED: 89,
    CD_ERROR_SAAS_INSTANCE_NOTDEFINED: 90,
    CD_ERROR_INVALID_ENTITY: 91,
    CD_VERSION_UNSUPPORTED_ERROR: 92,
    CD_ERROR_ASSOCIATING_RECORD: 93,
    CD_ERROR_DISOCIATING_RECORD: 94,
    CD_ERROR_NOT_INSTANCE_OF_CUSTOMINFO: 95,
    CD_ERROR_FORM_ENTITY_NOT_FOUND: 96,
    CD_ERROR_FORM_PRIMARY_FIELDVALUE_NOT_FOUND: 97,
    CD_ERROR_CANNOT_ASSOCIATE_DISSOCIATE_OF_SAME_ENTITY: 98,
    CD_ERROR_SAVING_MULTI_ENTITY_LABEL: 99,
    CD_ERROR_SAVING_CHILD_CONTAINER: 100,
    CD_ERROR_DECODING_BASE64_FORMJS: 102,
    CD_ERROR_BATCH_INSERT: 103,
    CD_ERROR_LOCAL_DB_CONNECTION: 104,
    CD_ERROR_EXECUTE_SINGLE_SQL_QUERY: 105,
    CD_UPGRADE_UNAVAILABLE: 106,
    CD_ERROR_I18N: 107,
    CD_INVALID_LOGIN_HANDLER_RESPONSE: 108,
    CD_ERROR_FAILED_TO_QUERY_DATA: 109,
    CD_ERROR_LOADING_THEME: 110,
    CD_ERROR_SETTING_THEME: 111,
    CD_ERROR_FETCHING_THEME: 112,
    CD_ERROR_MULTIPLE_DEFAULT_THEME: 113,
    CD_ERROR_CREATING_THEME: 114,
    CD_ERROR_METHOD_INVALID: 115,
    CD_ERROR_INVALID_HTTPCUSTOMREQUEST_INPUT: 116,
    CD_ERROR_INVALID_INPUT: 117,
    CD_ERROR_INVALID_INPUT_TYPE: 118,
    CD_ERROR_INVALID_PAYLOAD: 119,
    CD_ERROR_INVALID_DATAPROVIDER_TYPE: 120,
    CD_ERROR_DATAPROVIDER_NOT_INTIALIZED: 121,
    CD_ERROR_INVALID_CUSTOMSERVICE_INPUT_PARAM: 122,
    CD_ERROR_UNEXPECTED_CUSTOMRESPONSE: 123,
    CD_CLOUD_UNAUTHORISED_FOR_DATAPROVIDER: 124,
    CD_CREDSTORE_NOT_FOUND: 125,
    CD_CREDENTIAL_MISMATCH_WITH_CREDSTORE: 126,
    CD_ERROR_TENANT_NOT_SPECIFIED: 50003,
    CD_ERROR_UNABLE_TO_CONNECT: 50004,
    CD_ERROR_SYNC_FAILURE: 50005,
    CD_ERROR_LANDING_PAGE_NOT_DEFINED: 50007,
    CD_ERROR_INVALID_PARAM1: 50008,
    CD_ERROR_ENTITY_CONTROLLER_NOT_DEFINED: 10001,
    CD_ERROR_IN_ENTITY_DEFINITION: 10002,
    CD_ERROR_IN_RETREIVNING_CHILD_RELATIONSHIPLIST: 10003,
    CD_ERROR_FETCHING_DATA_FOR_COLUMNS: 10004,
    CD_ERROR_FETCHING_CHILD_RELATIONSHP_FOR_ENTITY: 10005,
    CD_ERROR_PROCESSING_CHILD_RELATIONSHIPLIST: 10006,
    CD_ERROR_FETCH: 10007,
    CD_ERROR_CREATE: 10008,
    CD_ERROR_UPDATE: 10009,
    CD_ERROR_UPDATE_BY_PRIMARY_KEY: 10010,
    CD_ERROR_DELETE: 10011,
    CD_ERROR_DELETE_BY_PRIMARY_KEY: 10012,
    CD_ERROR_VALIDATION_UPDATE: 10013,
    CD_ERROR_VALIDATION_CREATE: 10014,
    CD_ERROR_GET_WIDGET_DATA_FORMMODEL: 20001,
    CD_ERROR_SET_WIDGET_DATA_FORMMODEL: 20002,
    CD_ERROR_FORMMODEL_PROPERTY_VALUE_CHANGED: 20003,
    CD_ERROR_FORMMODEL_CLEAR: 20004,
    CD_ERROR_FORMMODEL_DESTROY: 20005,
    CD_ERROR_FORMMODEL_UPDATE: 20006,
    CD_ERROR_FORMMODEL_SHOWVIEW: 20007,
    CD_ERROR_FORMMODEL_SET_MASTERDATA: 20008,
    CD_ERROR_FORMMODEL_GET_MASTERDATA: 20009,
    CD_ERROR_FORMMODEL_SET_VIEW_ATTRIBUTE: 20010,
    CD_ERROR_FORMMODEL_GET_VIEW_ATTRIBUTE: 20011,
    CD_ERROR_FORMMODEL_PERFORM_ACTION_ONVIEW: 20012,
    CD_ERROR_FORMMODEL_PERFORM_ACTION: 20013,
    CD_ERROR_NOTIFYING_OBSERVERS: 20014,
    CD_ERROR_FORMMODEL_PROPERTIES_INIT: 20015,
    CD_ERROR_FETCH_IN_CONTROLLER: 30001,
    CD_ERROR_BIND_IN_CONTROLLER: 30002,
    CD_ERROR_SAVE_IN_CONTROLLER: 30003,
    CD_ERROR_DELETE_IN_CONTROLLER: 30004,
    CD_ERROR_LOADDATA_SHOWFORM_CONTROLLER: 30005,
    CD_ERROR_GETTING_ENTITY_CONTROLLER: 30006,
    CD_ERROR_GETTING_ENTITY_METADATA: 30007,
    CD_ERROR_FETCH_IN_BASE_CONTROLLER_EXTENSION: 30008,
    CD_ERROR_BIND_IN_BASE_CONTROLLER_EXTENSION: 30009,
    CD_ERROR_SAVE_IN_BASE_CONTROLLER_EXTENSION: 30010,
    CD_ERROR_ACTION_NOT_FOUND_IN_CONTROLLER: 30011,
    CD_ERROR_FORMATDATA_IN_BASE_CONTROLLER_EXTENSION: 30012,
    CD_ERROR_FORMATDATA_IN_CONTROLLER: 30013,
    CD_ERROR_DELETE_IN_BASE_CONTROLLER_EXTENSION: 30014,
    CD_ERROR_GENERATE_RECORDS_IN_BASE_CONTROLLER_EXTENSION: 30015,
    CD_ERROR_FETCH_IN_CONTROLLER_EXTENSION: 40013,
    CD_ERROR_BINDDATA_IN_CONTROLLER_EXTENSION: 40014,
    CD_ERROR_SAVEDATA_IN_CONTROLLER_EXTENSION: 40015,
    CD_ERROR_DELETEDATA_IN_CONTROLLER_EXTENSION: 40016,
    CD_ERROR_PROCESSDATA_IN_CONTROLLER_EXTENSION: 40017,
    CD_ERROR_SHOWFORM_IN_CONTROLLER_EXTENSION: 40018,
    CD_ERROR_GET_DATA_WIDGETS_OF_FORM: 60001,
    CD_ERROR_GETTING_QUERY_WIDGETS_MAPPING: 60002,
    CD_ERROR_ORM_CONTROLLER_FETCH_RECORDS: 70001,
    CD_ERROR_ORM_CONTROLLER_FETCH_RECORDS_QUERIES_NOT_DEFINED: 70002,
    CD_ERROR_ORM_CONTROLLER_FETCH_RECORD_PK_NOT_DEFINED: 70003,
    CD_ERROR_ORM_CONTROLLER_FETCH_RECORD_PK: 70004,
    CD_ERROR_ORM_CONTROLLER_FETCH_RECORDS_BY_NATIVE_QUERY: 70005,
    CD_ERROR_ORM_CONTROLLER_FETCH_RECORDS_BY_COLUMN_DEFINITION: 70006,
    CD_ERROR_ORM_CONTROLLER_SAVE_RECORD: 70007,
    CD_ERROR_ORM_CONTROLLER_SAVE_RECORDS: 70008,
    CD_ERROR_ORM_CONTROLLER_REMOVE_RECORD: 70009,
    CD_ERROR_ORM_CONTROLLER_REMOVE_RECORDS: 70010,
    CD_ERROR_ORM_CONTROLLER_FETCH_CHILD_RELATIONSHIP: 70011,
    CD_ERROR_ORM_CONTROLLER_RESULTSET_TO_OBJECT_CONVERSION: 70012,
    CD_ERROR_ORM_CONTROLLER_PREPARE_FETCH_QUERY: 70013,
    CD_ERROR_ORM_CONTROLLER_UNMARSHALL_TO_MODEL_OBJECT: 70014,
    CD_ERROR_ORM_CONTROLLER_FETCH_AND_BIND_DATA_STRATEGY: 70015,
    CD_ERROR_PREPARING_QUERY_STRING: 90001,
    CD_ERROR_APP_INIT_FORMS: 90002,
    CD_ERROR_INVALID_DATA_OBJECT: 90003,
    CD_ERROR_CUSTOMVERB: 90004,
    MSG_ERROR_CUSTOMVERB: "Error while invoking custom verb",
    MSG_ERROR_SAAS_INSTANCE_NOTDEFINED: "voltmx.model.ApplicationContext.INSTANCE is not defined",
    MSG_ERROR_FORMSFORRECORDTYPES_MAP_NOT_DEFINED: "FormsForRecordTypes map is not defined or it has no entities",
    MSG_ERROR_RECORDTYPES_NOT_AVAILABLE: "No record types available from service",
    MSG_ERROR_FORM_NOT_DEFINED_FOR_RECORDTYPE: "no default forms for given formType ",
    MSG_ERROR_FORMTYPE_NOT_SPECIFIED: "Please specify formType for record type",
    MSG_ERROR_ENTITY_NOT_SPECIFIED: "Please specify entity to get record types",
    MSG_ERROR_MATCHOPERATOR_NOT_DEFINED_PROPERLY: "Match Operator is not mentioned properly in the query",
    MSG_ERROR_QUERYPARAMS_NOT_DEFINED_PROPERLY: "Queryparams are not defined properly",
    MSG_ERROR_QUERY_NOT_DEFINED_PROPERLY: "Query is not defined properly",
    MSG_ERROR_ADDITIONAL_FIELDS_ARE_NOT_DEFINED_PROPERLY: "Additinal Fields should be described in an Array Format Only",
    MSG_ERROR_BRACES_ARE_NOT_DEFINED_PROPERLY: "Braces are not defined properly in the query",
    MSG_ERROR_PARAM_VALUE_NOT_DEFINED_IN_QUERYPARAM: "Parameter value is not defined for this parameter",
    MSG_ERROR_DATA_VALIDATION_FIELD_NOT_CREATEABLE: "Form Validation Error- Field is not createable",
    MSG_ERROR_DATA_VALIDATION_FIELD_NOT_UPDATEABLE: "Form Validation Error - Field is not updateable",
    MSG_ERROR_DATA_VALIDATION_FIELD_NOT_NULLABLE: "Form Validation Error - Field is not nullable",
    MSG_ERROR_DATA_VALIDATION_INVALID_INPUT_DATA: "Form Validation Error - Invalid input data",
    MSG_ERROR_DATA_VALIDATION_INVALID_MODEL: "Form Validation Error - Invalid Model",
    MSG_ERROR_DATA_VALIDATION_INVALID_ENTITY: "Form Validation Error - Invalid Entity",
    MSG_ERROR_DATA_VALIDATION_ENTITYMETADATA_NOTFOUND: "Form Validation Error - EntityMetaData Not Found",
    MSG_ERROR_FETCHING_APPMENU_DATA: "Error fetching data for app menu",
    MSG_ERROR_CREATING_APPMENU: "Error creating app menu",
    CD_ERROR_WIDGETID_NOT_DEFINED: 50,
    CD_ERROR_PROCESSING_FORMCONFIG: 51,
    CD_ERROR_TAGNAME_NOTVALID: 52,
    CD_ERROR_EVENTNAME_NOT_DEFINED: 53,
    CD_ERROR_WIDGET_INSTANCE_NOT: 54,
    CD_ERROR_WHILE_PROCESSING_WIDGETCONFIG: 55,
    CD_ERROR_PRESAVECALLBACK_NOT_A_FUNCTION: 56,
    CD_ERROR_IN_DATACALLBACK: 57,
    CD_ERROR_IN_PRESAVECALLBACK: 58,
    CD_ERROR_NOT_MODEL_INSTANCE: 59,
    MSG_ERROR_NOT_MODEL_INSTANCE: "result of callback is not a model instance",
    MSG_ERROR_IN_PRESAVECALLBACK: "PreSave callback execution got failed",
    MSG_ERROR_IN_DATACALLBACK: "Data Call Back Execution got failed",
    MSG_ERROR_PRESAVECALLBACK_NOT_A_FUNCTION: "presave call back is not a function",
    MSG_ERROR_WHILE_PROCESSING_WIDGETCONFIG: "error while processing widget config of ",
    MSG_ERROR_WIDGET_INSTANCE_NOT: "it should be instance of voltmx.model.widgetConfig",
    MSG_ERROR_EVENTNAME_NOT_DEFINED: "event name is not defined",
    MSG_ERROR_WIDGETID_NOT_DEFINED: "Widget id is not specifed",
    MSG_ERROR_PROCESSING_FORMCONFIG: "error while processing form config",
    MSG_ERROR_TAGNAME_NOTVALID: "specified tag name not valid ",
    MSG_ERROR_PAGINATION_NOT_ENABLED_FOR_SEGMENT: "Pagination not enabled for this segment",
    MSG_ERROR_FAILED_BINDING_DATA_TO_WIDGET: "Failed to bind data to widget",
    MSG_ERROR_NOT_INHERITING_WIDGET_CONTROLLER: "Does not inherit WidgetController class ",
    MSG_ERROR_NOT_INHERITING_VIEW_CONTROLLER: "Does not inherit ViewController class ",
    MSG_ERROR_UNSUPPORTED_SEGMENT_TYPE: "segment widget type is not yet supported",
    MSG_ERROR_GET_NEXT_LIST: "Get next list error - Data Records recieved < 0 ",
    MSG_ERROR_FETCH_FAILED_FOR_CHILD_ENTITY: "failed to get data for child entity",
    MSG_ERROR_SAVE_CANNOT_SET_PRIMARY_KEY: "cannot save form, cannot explicitly set primary key value",
    MSG_ERROR_KONY_FORM_OBJECT_UNDEFINED: "Volt MX form object is undefined",
    MSG_ERROR_FAILED_FORM_INIT_WHILE_CALLBACK: "failed to initilaize the form while executing datacallback",
    MSG_ERROR_FAILED_LOADING_FORMS: "Failed to load form",
    MSG_ERROR_PARSING_JSONS: "Error while parsing forms JSON",
    MSG_ERROR_FAILED_TO_NAVIGATE_TO_FORM: "failed to navigate to form ",
    MSG_ERROR_FAILED_LOADING_MASTER_DATA: "failed to laod master data",
    MSG_ERROR_FAILED_TO_LOGOUT: "Failed to logout",
    MSG_ERROR_UNDEFINED_WIDGET_CONTROLLER: "Undefined widget controller",
    MSG_ERROR_PRIMARY_FIELD_VALUE_NOT_FOUND: "cannot save form, primary field value not found",
    MSG_ERROR_NO_FIELDS_MODIFIED_UPDATE_FAILED: "Cannot save form, no fields are modified",
    MSG_ERROR_METADATA_FOR_ENTITY_NOT_FOUND: "metadata could not found for entity ",
    MSG_ERROR_FORM_NOT_FOUND: "Form not found",
    MSG_ERROR_EXPECTED_BOOLEAN: "First parameter must be boolean",
    MSG_ERROR_NAVIGATION_STACK_EMPTY: "Navigation stack is empty",
    MSG_ERROR_FORMVIEWCONTROLLER_NOT_FOUND: "form view controller not found",
    MSG_ERROR_INITIALIZING_SAAS_APP: "Error Initializing SaaS Application",
    MSG_ERROR_APP_INITIALIZATION_FAILED: "Application initialization failed",
    MSG_ERROR_FAILED_TO_LOAD_APPLICATION: "Failed to Load Application",
    MSG_ERROR_INITIALIZING_DATA_PROVIDER: "Unable to initialize data provider",
    MSG_ERROR_INITIALIZING_METADATA_PROVIDER: "Unable to initialize meta data provider",
    MSG_ERROR_INITIALIZING_UI_CONFIG_DATA_PROVIDER: "Unable to initialize UI Config data provider",
    MSG_ERROR_FETCHING_FORMS: "Error fetching forms",
    MSG_ERROR_FETCHING_TEMPLATES: "Error fetching templates",
    MSG_ERROR_MORE_RECORDS_FOUND: "Expected one record but found more than one",
    MSG_ERROR_FETCHING_METADATA: "Error fetching metadata for entity",
    MSG_ERROR_FAILED_TO_INITIALIZE_FORM: "Failed to initialize form",
    MSG_ERROR_FAILED_TO_FETCH_DATA: "Failed to fetch data for form",
    MSG_ERROR_FAILED_TO_SAVE_FORM: "Failed to save form",
    MSG_ERROR_SESSION_TOKEN_INVALID: "Invalid session token",
    MSG_ERROR_LOGIN_FAILURE: "Login failure",
    MSG_ERROR_OFFLINE_LOGIN_FAILURE: "Login failure in offline mode",
    MSG_ERROR_CALLBACK_NOT_A_FUNCTION: "Callbacks not a function",
    MSG_ERROR_FAILED_TO_CREATE_RECORD: "Failed to create record",
    MSG_ERROR_FAILED_TO_UPDATE_RECORD: "Failed to update record",
    MSG_ERROR_LOADING_TEMPLATES: "Error loading templates",
    MSG_ERROR_FIELD_NOT_PRESENT: "Invalid field mapped",
    MSG_ERROR_ENITTY_NOT_PRESENT: "Invalid Entity mapped",
    MSG_TENANT_NOT_SYNC_ENABLED: "Cloud is not sync enabled",
    MSG_INVALID_QUERY: "Query framed is invalid",
    MSG_ERROR_FETCH_USER_PROFILE_FAILURE: "Unable to fetch the user profile",
    MSG_ERROR_UNABLE_TO_SYNC: "Sync failed",
    MSG_ERROR_UNABLE_TO_GET_SYNC_CONFIG: "Unable to get sync configuration",
    MSG_ERROR_NETWORK_UNAVAILABLE: "Device is not connected to network. Please check your connection and try again.",
    MSG_ERROR_UNABLE_TO_RESET_SYNC: "Sync reset failed",
    MSG_HAMBURGER_MENU_WRONG_CONFIG: "Wrong Hamburger Menu config",
    MSG_HAMBURGER_MENU_INITIALIZATION_FAILED: "Failed to initialize Hamburger Menu",
    MSG_HAMBURGER_MENU_WRONG_FORM_TYPE: "Hamburger Menu wrong form type",
    MSG_HAMBURGER_MENU_WRONG_SKIN: "Main flex form skin is not provided with form bg color",
    MSG_RESOURCE_NO_CREATE_PERMISSION: "User does not have permission to create {}",
    MSG_RESOURCE_NO_READ_PERMISSION: "User does not have permission to read{}",
    MSG_RESOURCE_NO_UPDATE_PERMISSION: "User does not have permission to update {}",
    MSG_RESOURCE_NO_DELETE_PERMISSION: "User does not have permission to delete {}",
    MSG_NETWORK_UNAVAILABLE: "Network unavailable or disconnected",
    MSG_ERROR_NO_RESPONSE_RECEIVED: "No response received",
    MSG_ERROR_IN_SET_ADDITIONAL_FIELDS: "Error in setAdditionalFields",
    MSG_ERROR_IN_SET_QUERY: "Error in setQuery",
    MSG_ERROR_IN_SET_QUERY_PARAMS: "Error in setQueryParams",
    MSG_ERROR_ENTER_VALID_TENANT_NAME: "Enter a valid cloud name",
    MSG_ERROR_NAVIGATION_CONTROLLER_NOT_DEFINED: "Navigation controller not defined",
    MSG_ERROR_INVALID_ENTITY: "Invalid Entity Name",
    MSG_VERSION_UNSUPPORTED_ERROR: " You are trying to connect to older version of the Volt MX Foundry App Services. This app requires Volt MX Foundry App Services version to be $VERSION or greater ",
    MSG_ERROR_ASSOCIATING_RECORD: "Error associating record",
    MSG_ERROR_DISOCIATING_RECORD: "Error dissociating record",
    MSG_ERROR_NOT_INSTANCE_OF_CUSTOMINFO: "info object not an instance of voltmx.model.CustomInfo class",
    MSG_ERROR_FORM_ENTITY_NOT_FOUND: "Entity of form not found",
    MSG_ERROR_FORM_PRIMARY_FIELDVALUE_NOT_FOUND: "Primary field value for form is not found",
    MSG_ERROR_CANNOT_ASSOCIATE_DISSOCIATE_OF_SAME_ENTITY: "Cannot associate/dissociate records of same entity",
    MSG_ERROR_SAVING_MULTI_ENTITY_LABEL: "Error saving mutli entity label data",
    MSG_ERROR_SAVING_CHILD_CONTAINER: "Error saving child container data",
    MSG_UPGRADE_UNAVAILABLE: "upgraded version of this cloud is not available, please try diabling connect to upgraded version",
    MSG_ERROR_I18N: "I18n Error ",
    MSG_INVALID_LOGIN_HANDLER_RESPONSE: "invalid response object returned by login handler",
    MSG_ERROR_FAILED_TO_QUERY_DATA: "failed to query data for the widget",
    MSG_ERROR_BATCH_INSERT: "Exception occurred while batchInsert",
    MSG_ERROR_LOCAL_DB_CONNECTION: "Error in getting localdb connection",
    MSG_ERROR_EXECUTE_SINGLE_SQL_QUERY: "Exception occurred while executeSingleSqlQuery",
    MSG_ERROR_DECODING_BASE64_FORMJS: "Error while decoding base64 formJS",
    MSG_ERROR_LOADING_THEME: "error loading theme",
    MSG_ERROR_SETTING_THEME: "error setting theme to the application",
    MSG_ERROR_FETCHING_THEME: "error fetching theme from datasource",
    MSG_ERROR_MULTIPLE_DEFAULT_THEME: "error, more than once default themes returned",
    MSG_ERROR_CREATING_THEME: "error while creating theme",
    MSG_ERROR_METHOD_INVALID: "method type invalid , should be either GET/POST/PUT/DELETE",
    MSG_ERROR_INVALID_HTTPCUSTOMREQUEST_INPUT: "method type expected, httpcustomrequest accepts a string parameter of the method type",
    MSG_ERROR_INVALID_INPUT: "expected two string inputs",
    MSG_ERROR_INVALID_INPUT_TYPE: "expected string type as input",
    MSG_ERROR_INVALID_PAYLOAD: "invalid payload, expected only one parameter",
    MSG_ERROR_INVALID_DATAPROVIDER_TYPE: "expected rest dataprovider object",
    MSG_ERROR_DATAPROVIDER_NOT_INTIALIZED: "dataprovider object not intialized",
    MSG_ERROR_INVALID_CUSTOMSERVICE_INPUT_PARAM: "expected httpcustomrequest input param",
    MSG_ERROR_UNEXPECTED_CUSTOMRESPONSE: "expected customresponse key in response",
    MSG_CLOUD_UNAUTHORISED_FOR_DATAPROVIDER: "Invalid dataProviderKey or Present cloud is not authorised for the suggested data provider",
    MSG_CREDSTORE_NOT_FOUND: "Login failure in offline mode. CredStore is not created yet",
    MSG_CREDENTIAL_MISMATCH_WITH_CREDSTORE: "Login failure in offline mode. User Credentials did not match with credStore",
    MSG_ERROR_IN_ENTITY_DEFINITION: "Error in getting entity definition in model",
    MSG_ERROR_IN_RETREIVNING_CHILD_RELATIONSHIPLIST: "Error in retreiving child relationship list in model",
    MSG_ERROR_FETCHING_DATA_FOR_COLUMNS: "Error fetching data for columns in model",
    MSG_ERROR_FETCHING_CHILD_RELATIONSHP_FOR_ENTITY: "Error fetching relationship for child entity in model",
    MSG_ERROR_PROCESSING_CHILD_RELATIONSHIPLIST: "Error processing child relationship list in getRelationshipForChildEntityName in model",
    MSG_ERROR_FETCH: "Error in fetching data in model",
    MSG_ERROR_CREATE: "Error in create in model",
    MSG_ERROR_UPDATE: "Error in update in model",
    MSG_ERROR_UPDATE_BY_PRIMARY_KEY: "Error in update by primarykey in model",
    MSG_ERROR_DELETE: "Error in delete in model",
    MSG_ERROR_DELETE_BY_PRIMARY_KEY: "Error in delete by primarykey in model",
    MSG_ERROR_FETCH_IN_CONTROLLER_EXTENSION: "Error in fetch in controller extension",
    MSG_ERROR_BINDDATA_IN_CONTROLLER_EXTENSION: "Error in bindData in controller extension",
    MSG_ERROR_SAVEDATA_IN_CONTROLLER_EXTENSION: "Error in saveData in controller extension",
    MSG_ERROR_DELETEDATA_IN_CONTROLLER_EXTENSION: "Error in deleteData in controller extension",
    MSG_ERROR_ENTITY_CONTROLLER_NOT_DEFINED: "Model is not defined",
    MSG_ERROR_FETCH_IN_BASE_CONTROLLER_EXTENSION: "Error in fetchData of BaseControllerExtension",
    MSG_ERROR_BIND_IN_BASE_CONTROLLER_EXTENSION: "Error in bindData of BaseControllerExtension",
    MSG_ERROR_SAVE_IN_BASE_CONTROLLER_EXTENSION: "Error in saveData of BaseControllerExtension",
    MSG_ERROR_DELETE_IN_BASE_CONTROLLER_EXTENSION: "Error in saveData of BaseControllerExtension",
    MSG_ERROR_GENERATE_RECORDS_IN_BASE_CONTROLLER_EXTENSION: "Error in generateRecords of BaseControllerExtension",
    MSG_ERROR_ACTION_NOT_FOUND_IN_CONTROLLER: "Error action not found in controller for actionName",
    MSG_ERROR_APP_INIT_FORMS: "Error in application init forms",
    MSG_ERROR_ORM_CONTROLLER_FETCH_RECORDS: "Error in persistent controller's fetch records",
    MSG_ERROR_ORM_CONTROLLER_FETCH_RECORDS_QUERIES_NOT_DEFINED: "Error in persistent controller's fetch records, odata queries not defined",
    MSG_ERROR_ORM_CONTROLLER_FETCH_RECORD_PK_NOT_DEFINED: "Error in persistent controller's fetch by PK, PK not defined",
    MSG_ERROR_ORM_CONTROLLER_FETCH_RECORD_PK: "Error in persistent controller's fetch by PK",
    MSG_ERROR_ORM_CONTROLLER_FETCH_RECORDS_BY_NATIVE_QUERY: "Error in persistent controller's fetch with native query",
    MSG_ERROR_ORM_CONTROLLER_FETCH_RECORDS_BY_COLUMN_DEFINITION: "Error in persistent controller's fetch by columns",
    MSG_ERROR_ORM_CONTROLLER_SAVE_RECORD: "Error in persistent controller's save record",
    MSG_ERROR_ORM_CONTROLLER_SAVE_RECORDS: "Error in persistent controller's save records",
    MSG_ERROR_ORM_CONTROLLER_REMOVE_RECORD: "Error in persistent controller's remove record",
    MSG_ERROR_ORM_CONTROLLER_REMOVE_RECORDS: "Error in persistent controller's remove records",
    MSG_ERROR_ORM_CONTROLLER_FETCH_CHILD_RELATIONSHIP: "Error in persistent controller's fetch child relationship",
    MSG_ERROR_ORM_CONTROLLER_RESULTSET_TO_OBJECT_CONVERSION: "Error in persistent controller's resultset to record object conversion",
    MSG_ERROR_ORM_CONTROLLER_PREPARE_FETCH_QUERY: "Error in persistent controller's prepare fetch query",
    MSG_ERROR_ORM_CONTROLLER_UNMARSHALL_TO_MODEL_OBJECT: "Error in persistent controller's unmarshall record object to form model object",
    MSG_ERROR_ORM_CONTROLLER_FETCH_AND_BIND_DATA_STRATEGY: "Error in persistent controller's fetch and bind data strategy",
    MSG_ERROR_GET_DATA_WIDGETS_OF_FORM: "Error getting data widgets of form",
    MSG_ERROR_GETTING_QUERY_WIDGETS_MAPPING: "Error getting queryWidgetsMapping",
    MSG_ERROR_PREPARING_QUERY_STRING: "Error in preparing query string",
    MSG_ERROR_NOTIFYING_OBSERVERS: "Error notifying observers of formmodel",
    MSG_ERROR_GET_WIDGET_DATA_FORMMODEL: "Error getting widget data of formmodel",
    MSG_ERROR_SET_WIDGET_DATA_FORMMODEL: "Error setting widget data of formmodel",
    MSG_ERROR_FORMMODEL_PROPERTY_VALUE_CHANGED: "Error in propertyValueChanged of formmodel",
    MSG_ERROR_FORMMODEL_CLEAR: "Error in clear of formmodel",
    MSG_ERROR_FORMMODEL_DESTROY: "Error in destroy of formmodel",
    MSG_ERROR_FORMMODEL_UPDATE: "Error in update of formmodel",
    MSG_ERROR_FORMMODEL_SET_MASTERDATA: "Error in setMasterData of formmodel",
    MSG_ERROR_FORMMODEL_GET_MASTERDATA: "Error in getMasterData of formmodel",
    MSG_ERROR_FORMMODEL_SET_VIEW_ATTRIBUTE: "Error settingView attribute by property in formmodel",
    MSG_ERROR_FORMMODEL_GET_VIEW_ATTRIBUTE: "Error gettingView attribute by property in formmodel",
    MSG_ERROR_FORMMODEL_PERFORM_ACTION_ONVIEW: "Error in performActionOnView of formmodel",
    MSG_ERROR_FORMMODEL_PERFORM_ACTION: "Error in performAction of formmodel",
    MSG_ERROR_FORMMODEL_PROPERTIES_INIT: "Error in initialization of formmodel properties",
    MSG_ERROR_FETCH_IN_CONTROLLER: "Error in fetch of controller",
    MSG_ERROR_BIND_IN_CONTROLLER: "Error in bind of controller",
    MSG_ERROR_SAVE_IN_CONTROLLER: "Error in save of controller",
    MSG_ERROR_DELETE_IN_CONTROLLER: "Error in delete of controller",
    MSG_ERROR_LOADDATA_SHOWFORM_CONTROLLER: "Error in load data and show form of controller",
    MSG_ERROR_GETTING_ENTITY_CONTROLLER: "Error getting model from formcontroller",
    MSG_ERROR_GETTING_ENTITY_METADATA: "Error getting entity metadata from formcontroller",
    MSG_ERROR_INVALID_DATA_OBJECT: "Error while reading data, expected data object",
    MSG_ERROR_PROCESSDATA_IN_CONTROLLER_EXTENSION: "Error while formatting data in controller extension",
    MSG_ERROR_FORMATDATA_IN_BASE_CONTROLLER_EXTENSION: "Error while formatting data in base controller extension",
    MSG_ERROR_FORMATDATA_IN_CONTROLLER: "Error while formatting data in controller",
    MSG_ERROR_VALIDATION_UPDATE: "Error validating data in update model",
    MSG_ERROR_VALIDATION_CREATE: "Error validating data in create model",
    MSG_ERROR_SHOWFORM_IN_CONTROLLER_EXTENSION: "Error in showForm in controller extension"
};