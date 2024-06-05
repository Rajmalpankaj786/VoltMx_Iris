/* eslint-disable no-implicit-globals */


$KAUtils = (function() {


    var utils = {};

    function _validateContainerIndexes(containerModel, sectionIndex, rowIndex) {
        var raiseInvalidRowError, clonedModels, data;

        if(containerModel.wType == "Segment") {
            if(Number.isNaN(sectionIndex) || Number.isNaN(rowIndex)
            || sectionIndex < 0 || rowIndex < 0) {
                $KAUtils.throwExceptionInvalidSegementRowInfo();
            }
            clonedModels = containerModel.clonedTemplates;
            data = containerModel.data;

            if(!data || data.length ===0) {
                $KAUtils.throwExceptionSegmentInvalidRow();
            }

            if(!clonedModels || clonedModels.length ===0) {
                $KAUtils.throwExceptionSegmentRowNotRendered();
            }

            if(containerModel.hasSections) {
                if(data.length - 1 < sectionIndex) {
                    $KAUtils.throwExceptionSegmentInvalidRow();
                }
                if(data[sectionIndex].length - 1 < rowIndex) {
                    $KAUtils.throwExceptionSegmentInvalidRow();
                }

                if(clonedModels.length - 1 < sectionIndex) {
                    $KAUtils.throwExceptionWidgetPathNotFound();
                }
                if(clonedModels[sectionIndex].length - 1 < rowIndex) {
                    $KAUtils.throwExceptionSegmentRowNotRendered();
                }
            } else {
                if(data.length - 1 < rowIndex) {
                    $KAUtils.throwExceptionSegmentInvalidRow();
                }

                if(clonedModels.length - 1 < rowIndex) {
                    $KAUtils.throwExceptionSegmentRowNotRendered();
                }
            }
        }

    }

    function _isNodeAvailableOnDOM(model) {
        if(model) {
            if(model._kwebfw_.uid) {
                return document.getElementById(model._kwebfw_.uid);
            }
        } else {
            return null;
        }
    }

    var _infoAtIndex = {
        CollectionView: function(index) {
            //
        },

        DataGrid: function(index) {
            //
        },

        MenuContainer: function(index) {
            //
        },

        SegmentedUI2: function(index) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget, oid = '',
                template = null, info = null, prop = this._kwebfw_.prop, ii = '',
                meta = null, data = this.data, clones = this._kwebfw_.clones;

            if($KU.is(data, 'array')) {
                oid = this._kwebfw_.uid;

                if(index.length == 1) {
                    index.unshift('-1');
                }
                ii = (index[0] + ','+index[1]);

                if(index[0] >= 0 && index[1] >= 0) { //Row inside section
                    if($KU.is(data[index[0]], 'array')
                    && $KU.is(data[index[0]][1], 'array')
                    && $KU.is(data[index[0]][1][index[1]], 'object')) {
                        info = {data:data[index[0]][1][index[1]], index:index, template:null};

                        if($KU.is(clones[index[0]][1][index[1]], 'widget')) {
                            info.template = clones[index[0]][1][index[1]];
                        } else {
                            template = info.data.template || this.rowTemplate;
                            if($KU.is(template, 'string')) {
                                template = $KW.getTemplate(this, template);
                            }
                            info.template = $KW.cloneTemplate(template, info.data, prop.widgetDataMap, function(widget, pwidget, windex) {
                                widget._kwebfw_.oid = oid;
                                widget._kwebfw_.ii = ii;
                            });
                            clones[index[0]][1][index[1]] = info.template;
                        }
                    }
                } else if(index[0] >= 0 && index[1] < 0) { //Section not row
                    if($KU.is(data[index[0]], 'array')
                    && $KU.is(data[index[0]][0], 'object')) {
                        info = {data:data[index[0]][0], index:index, template:null};

                        if($KU.is(clones[index[0]][0], 'widget')) {
                            info.template = clones[index[0]][0];
                        } else {
                            template = info.data.template || this.sectionHeaderTemplate;
                            if($KU.is(template, 'string')) {
                                template = $KW.getTemplate(this, template);
                            }
                            info.template = $KW.cloneTemplate(template, info.data, prop.widgetDataMap, function(widget, pwidget, windex) {
                                widget._kwebfw_.oid = oid;
                                widget._kwebfw_.ii = ii;
                            });
                            clones[index[0]][0] = info.template;
                        }
                    }
                } else if(index[0] < 0 && index[1] >= 0) { //Row that does not have a section
                    if($KU.is(data[index[1]], 'object')) {
                        info = {data:data[index[1]], index:index, template:null};

                        if($KU.is(clones[index[1]], 'widget')) {
                            info.template = clones[index[1]];
                        } else {
                            template = info.data.template || this.rowTemplate;
                            if($KU.is(template, 'string')) {
                                template = $KW.getTemplate(this, template);
                            }
                            info.template = $KW.cloneTemplate(template, info.data, prop.widgetDataMap, function(widget, pwidget, windex) {
                                widget._kwebfw_.oid = oid;
                                widget._kwebfw_.ii = ii;
                            });
                            clones[index[1]] = info.template;
                        }
                    }
                }
            }

            return info;
        }
    };

    var _isOwnerWidget = function $KW_isOwnerWidget(model) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget, flag = false;

        model = $KW.model(model);

        if($KU.is(model, 'widget', 'SegmentedUI2')) {
            flag = true;
        }

        return flag;
    };

    var _name = function $KW_name(model) {
        var $K = voltmx.$kwebfw$, $KW = $K.widget, name = '';

        model = $KW.model(model);

        if(model) {
            name = model._kwebfw_.name;

            if(['ComponentWithContract', 'ComponentWithoutContract'].indexOf(name) >= 0) {
                if(model instanceof voltmx.ui.FlexScrollContainer) {
                    name = 'FlexScrollContainer';
                } else if(model instanceof voltmx.ui.FlexContainer) {
                    name = 'FlexContainer';
                }
            }
        }

        return name;
    };



    utils.getWidgetModel  = function(path) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget, $KA = $K.app,
        startSquareBracketIndex = -1, endSquareBracketIndex = -1, cf = null,
        info = null, fmodel = null, omodel = null, model = null, appName = '';

        if($KU.is(path, 'array')) {
            if(path.length === 1){
                fmodel = path[0];
                if(fmodel.split('/').length > 1){ 
                    fmodel = fmodel.split('/');
                    appName = fmodel[0];
                    fmodel = fmodel[fmodel.length-1];
                } 
                if($K.behavior.isCompositeApp && appName) {
                    model = $KW.rootOfForm(appName + '/' + fmodel);
                } else {
                    model = $KW.rootOfForm(fmodel);
                }
                
                if(appName && appName !== _voltmx.mvc.getCurrentAppName()){
                    model = null;
                } 
            } else {
                path = path.join('_');
            }
        }

        if($KU.is(path, 'string') && path) {
            startSquareBracketIndex = path.indexOf('[');
            endSquareBracketIndex = path.indexOf(']');

            cf = $KW.model($KA.currentFormUID);
            fmodel = path.indexOf('_');
            fmodel = path.substr(0, fmodel);
            if(fmodel.split('/').length > 1){
                fmodel = fmodel.split('/');
                appName = fmodel[0];
                fmodel = fmodel[fmodel.length-1];
            }
            if($K.behavior.isCompositeApp && appName) {
                fmodel = $KW.rootOfForm(appName + '/' + fmodel);
            } else {
                fmodel = $KW.rootOfForm(fmodel);
            }

            if(cf && fmodel && cf.id !== fmodel.id) {
                fmodel = null;
            }

            if(appName && appName !== _voltmx.mvc.getCurrentAppName()){
                fmodel = null;
            }

            if(startSquareBracketIndex === -1) {
                if(fmodel) {
                    model = path.split('_');
                    model.shift();
                    model = (!model.length) ? fmodel : $KU.get(model, fmodel);
                    if(!_isNodeAvailableOnDOM(model)) {
                        model = null;
                    }
                }
            } else if(startSquareBracketIndex > 0
            && endSquareBracketIndex > startSquareBracketIndex) {

                if(fmodel) {
                    omodel = path.substr(0, startSquareBracketIndex);
                    omodel = omodel.split('_');
                    omodel.shift();
                    omodel = (!omodel.length) ? fmodel : $KU.get(omodel, fmodel);

                    if(_isOwnerWidget(omodel)) {
                        info = path.substr(
                            (startSquareBracketIndex+1),
                            (endSquareBracketIndex-startSquareBracketIndex-1)
                        );

                        if($KU.is(_infoAtIndex[_name(omodel)], 'function')) {
                            info = _infoAtIndex[_name(omodel)].call(omodel, info.split(','));

                            if(info && info.template) {
                                model = path.substr(
                                    (endSquareBracketIndex+2),
                                    (path.length-endSquareBracketIndex-2)
                                );
                                model = model.split('_');
                                if(model[0] == info.template.id || model[0] == '') {
                                    model = info.template
                                } else {
                                    model = $KU.get(model, info.template);
                                }
                            }
                        }
                    }
                }
            }
        }

        return ($KU.is(model, 'widget') ? model : null);
    }

    utils.getModelType = function(widgetModel) {
        var type, widgetMap, widgetType;

        type = voltmx.type(widgetModel);
        widgetMap = {
            "voltmx.ui.Browser" : "Browser",
            "voltmx.ui.Button" : "Button",
            "voltmx.ui.Calendar" : "Calendar",
            "voltmx.ui.Camera" : "Camera",
            "voltmx.ui.Canvas" : "Canvas",
            "voltmx.ui.CheckBoxGroup" : "CheckBoxGroup",
            "voltmx.ui.CollectionView" : "CollectionView",
            "voltmx.ui.CustomWidget" : "CustomWidget",
            "voltmx.ui.DataGrid" : "DataGrid",
            "voltmx.ui.FlexContainer" : "FlexContainer",
            "voltmx.ui.FlexScrollContainer" : "FlexScrollContainer",
            "voltmx.ui.Form2" : "Form",
            "voltmx.ui.Image2" : "Image",
            "voltmx.ui.Label"  : "Label",
            "voltmx.ui.ListBox" : "ListBox",
            "voltmx.ui.Map" : "Map",
            "voltmx.ui.RadioButtonGroup" : "RadioButtonGroup",
            "voltmx.ui.RichText" : "RichText",
            "voltmx.ui.SegmentedUI2" : "Segment",
            "voltmx.ui.Slider" : "Slider",
            "voltmx.ui.Switch" : "Switch",
            "voltmx.ui.TabPane" : "TabPane",
            "voltmx.ui.TextArea2" : "TextArea",
            "voltmx.ui.TextBox2" : "TextBox",
            "voltmx.ui.Video" : "Video"
        }

        widgetType = widgetMap[type];

        return widgetType;
    }

    utils.isEventApplicable = function(widgetModel) {
        return widgetModel.isVisible && !widgetModel.disabled;
    };

    utils.getMenuNodeByContext = function(containerModel, context) {
        var element = $KU.getNodeByModel(containerModel);
        if(!element || !context)
            return;

        var menuIndex = context.menuIndex;
        var querySelector;

        querySelector = "menuindex='" + menuIndex + "'";

        if(querySelector) {
            var listItem = element.querySelector("[" + querySelector + "]");
            if(listItem) {
                return listItem;
            }
        }
    };

    utils.scrollToWidgetRecursively = function(widgetModel) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget;
        widgetModel.setFocus(true);

    };

    utils.getAllowedLeafWidgetPath = function(widgetPath) {
        var allowedWidgetPath, rowIndex;

        allowedWidgetPath = widgetPath.join('.');
        rowIndex = allowedWidgetPath.indexOf("[");

        if(rowIndex !== -1) {
            allowedWidgetPath = allowedWidgetPath.substr(0, rowIndex);
        }
        allowedWidgetPath = allowedWidgetPath.split('.');

        return allowedWidgetPath;
    };

    utils.throwExceptionWidgetPathNotFound = function() {
        throw new AutomationVoltmxError(201, 'jasmineException', 'The widget could not be found at the widgetpath. If the widgetpath is right, try using waitFor API before performing widget actions.');
    };

    utils.throwExceptionInsufficientArguments = function() {
        throw new AutomationVoltmxError(202, 'jasmineException', 'Invalid number of arguments passed');
    };

    utils.throwExceptionInvalidArgumentType = function() {
        throw new AutomationVoltmxError(203, 'jasmineException', 'Invalid type of argument');
    };

    utils.throwExceptionSegmentInvalidRow = function() {
        throw new AutomationVoltmxError(204, 'jasmineException', 'The row to be scrolled to exceeds the available no of rows in the segment. use scrollToBottom/Top appropriately if data is loaded dynamically');
    };

    utils.throwExceptionFormDoesnotMatchCurrentForm = function() {
        throw new AutomationVoltmxError(205, 'jasmineException', 'Ensure that the form in the widgetpath matches the current form. Try using waitFor API before performing widget actions');
    };

    utils.throwExceptionNoCurrentFormFound = function() {
        throw new AutomationVoltmxError(205, 'jasmineException', 'Ensure that current form is rendered. Try using waitFor API before performing widget actions');
    };

    utils.throwExceptionSegmentRowNotRendered = function() {
        throw new AutomationVoltmxError(206, 'jasmineException', 'The row index of the segment mentioned in the widgetpath is still not rendered. Please use scrollToRow API before performing widget actions');
    };

    utils.throwExceptionMapPinNotFound = function() {
        throw new AutomationVoltmxError(206, 'jasmineException', 'No pin is present for the specified co-ordinates');
    };

    utils.throwExceptionNoOpenCalloutFound = function() {
        throw new AutomationVoltmxError(206, 'jasmineException', 'No callout is shown for the specified co-ordinates');
    };

    utils.throwExceptionInvalidSegementRowInfo = function() {
        throw new AutomationVoltmxError(207, 'jasmineException', 'Invalid row info found. Excepted positive integer type for section and row index.');
    };

    utils.throwExceptionInvalidAppName = function() {
        throw new AutomationVoltmxError(207, 'jasmineException', 'AppName not found in IntegrationTests. AppName provided must be available in integrationTests.json');
    };
    
    utils.throwExceptionMultipleConnections = function() {
        throw new AutomationVoltmxError(208, 'jasmineException', 'Connection Already Exists.');
    };

    utils.throwExceptionNoConnectionAvailable = function() {
        throw new AutomationVoltmxError(208, 'jasmineException', 'No websockt connection available.');
    };

    utils.throwExceptionInvalidEventTypeOrOptions = function() {
        throw new AutomationVoltmxError(208, 'jasmineException', 'Invalid event type or options.');
    };

    utils.throwExceptionMultipleConnections = function() {
        throw new AutomationVoltmxError(208, 'jasmineException', 'Connection Already Exists.');
    };

    utils.throwExceptionNoConnectionAvailable = function() {
        throw new AutomationVoltmxError(208, 'jasmineException', 'No websockt connection available.');
    };

    utils.throwExceptionInvalidEventTypeOrOptions = function() {
        throw new AutomationVoltmxError(208, 'jasmineException', 'Invalid event type or options.');
    };

    utils.throwExceptionNoPageObjectFound = function() {
        throw new AutomationVoltmxError(209, 'jasmineException', 'No Page Object Found.');
    };

    utils.fire = function(el, type, options) {
        var evt = null, keyboardEvents = ['keyup', 'keydown'],
        mouseEvents = ['mousedown', 'mousemove', 'mouseup', 'mouseout'];

        if(!options) {
            options = {};
        }

        if(type === 'click') {
            el[type] && el[type]();
        } else if(mouseEvents.indexOf(type) >= 0){
            evt = new MouseEvent(type, options);
            evt.initEvent(type, true, true);
        } else if(keyboardEvents.indexOf(type) >= 0) {
            evt = new KeyboardEvent(type, options)
            evt.initEvent(type, true, true);
        }
        return !el.dispatchEvent(evt);
    };

    AutomationVoltmxError = function(errorcode, name, message) {
        this.errorCode = this.errorcode = errorcode;
        this.name = name;
        this.message = message;
        if(Error.captureStackTrace) {
            Error.captureStackTrace(this, AutomationVoltmxError);
        }
    };
    AutomationVoltmxError.prototype = new Error();
    AutomationVoltmxError.constructor = AutomationVoltmxError;

    return utils;
}());