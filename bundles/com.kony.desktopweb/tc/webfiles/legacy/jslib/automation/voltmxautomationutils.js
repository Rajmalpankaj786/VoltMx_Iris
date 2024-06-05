$KAUtils = (function() {


    var utils = {};

    function getFormModel(id) {
        var formModel, formID;

        formModel = $KG.allforms[id];


        if(!formModel) {
            formID = voltmx.mvc.registry.get(id);
            if(formID) {
                formID = formID.split("/");
                formID = formID[formID.length - 1];
                formModel = $KG.allforms[formID];
            }
        }

        if(!$KG.__currentForm) {
            $KAUtils.throwExceptionNoCurrentFormFound();
        }

        if(!formModel || $KG.__currentForm.id !== formModel.id) {
            $KAUtils.throwExceptionFormDoesnotMatchCurrentForm();
        }

        
        return formModel;
    }

    function _validateContainerIndexes(containerModel, sectionIndex, rowIndex) {
        var raiseInvalidRowError, clonedModels, data;

        if(containerModel.wType == "Segment") {
            if(Number.isNaN(sectionIndex) || Number.isNaN(rowIndex)
            || sectionIndex < 0) {
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


    
    utils.getrowbyIndex = function(containerModel, index) {
        var config = {};
        var result = [];
        var context = {
            "sectionIndex": '0',
            "rowIndex": '0',
            "itemIndex": '0',
            "menuIndex": '0'
        };
        if(index) {
            config["containerModel"] = containerModel;

            if(containerModel.wType == "Segment") {

                index = index.split(',');

                if(index.length !== 1 && index.length !== 2) {
                    $KAUtils.throwExceptionInvalidSegementRowInfo();
                }

                if(index.length === 2) {
                    result = [parseInt(index[0]), parseInt(index[1])];
                    context["sectionIndex"] = result[0];
                } else {
                    result = [0, parseInt(index[0])];
                }
                context["rowIndex"] = result[1];
                config["context"] = context;

                _validateContainerIndexes(containerModel, result[0], result[1]);

                var widgetModel = $KW.Segment && $KW.Segment.getClonedModel(containerModel, context.rowIndex, context.sectionIndex);
                config["widgetInstance"] = widgetModel;
            } else if(containerModel.wType == "CollectionView") {
                index = index.split(',');
                if(containerModel.hasSections) {
                    result = [parseInt(index[0]), parseInt(index[1])];
                    context["sectionIndex"] = result[0];
                } else {
                    result = [0, parseInt(index[0])];
                }
                context["itemIndex"] = result[1];
                config["context"] = context;
                var widgetModel = $KW.CollectionView && $KW.CollectionView.Utils.getClonedModel(containerModel, result[1], result[0]);
                config["widgetInstance"] = widgetModel;
            } else if(containerModel.wType == "MenuContainer") {
                context["menuIndex"] = index;
                config["context"] = context;
                config["widgetInstance"] = containerModel.menuItemTemplate;
            }
        } else {
            $KAUtils.throwExceptionInvalidSegementRowInfo();
        }
        return config;
    };

    
    utils.getWidgetInstance = function(widgetIdentifiers) {
        var config = {};
        var parentWidget = null;

        for(i = 0; i < widgetIdentifiers.length; i++) {
            var widgetid = widgetIdentifiers[i];

            if(i === 0) {
                if(widgetid.split('/').length > 1){
                    widgetid = widgetid.split('/');
                    if($KG.appbehaviors['isCompositeApp'] == true && widgetid[0] !== _voltmx.mvc.getCurrentAppName()) {
                        parentWidget = $KU.getFormModel(widgetid[widgetid.length-1], widgetid[0]);
                    } else {
                        parentWidget = $KU.getFormModel(widgetid[widgetid.length-1]);
                    }
                } else {
                    parentWidget = $KU.getFormModel(widgetid);
                }
                if(!parentWidget) {
                    break;
                }
                
            } else {
                var temp = null;
                if(widgetid.indexOf("[") !== -1) {
                    
                    var widget = widgetid.substring(0, widgetid.indexOf("["));
                    var index = widgetid.substring(widgetid.indexOf("[") + 1, widgetid.indexOf("]"));
                    temp = parentWidget[widget];
                    if(!temp) {
                        parentWidget = null;
                        break;
                    }
                    config = this.getrowbyIndex(temp, index);
                    temp = config["widgetInstance"];
                } else {
                    temp = parentWidget[widgetid];
                }

                if(temp) {
                    parentWidget = temp;
                } else {
                    parentWidget = null;
                    break;
                }
            }
        }

        config["widgetInstance"] = parentWidget;
        return config;
    };

    utils.getNodeByModel = function(config) {
        var widgetNode = null;
        var rowNode = null;
        var widgetModel = config.widgetInstance;
        var containerModel = config.containerModel;
        var context = config.context;
        if(context && containerModel) {
            if(containerModel.wType == "Segment") {
                rowNode = $KW.Segment && $KW.Segment.getNodeByContext(containerModel, context);
                widgetNode = $KW.Utils.getView(widgetModel, rowNode);
            } else if(containerModel.wType == "CollectionView") {
                
                rowNode = $KW.CollectionView && $KW.CollectionView.Utils.getNodeByContext(containerModel, context)
                widgetNode = $KW.Utils.getView(widgetModel, rowNode);
            } else if(containerModel.wType == "MenuContainer") {
                rowNode = this.getMenuNodeByContext(containerModel, context);
                widgetNode = $KW.Utils.getView(widgetModel, rowNode);
            } else {
                voltmx.web.logger("warn", "if containerModel exists it should not come to this location");
                widgetNode = $KU.getNodeByModel(widgetModel);
            }
        } else {
            widgetNode = $KU.getNodeByModel(widgetModel);
        }

        return widgetNode;
    };

    utils.isEventApplicable = function(widgetModel) {
        return widgetModel.isvisible && !widgetModel.disabled;
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
        var offset = {
            x: 0,
            y: 0
        };
        var parent, node, scrollerInstance, scrollConfig = [], currentScroll;

        if(widgetModel.parent) {
            parent = $KW.Utils.getActualWidgetModel(widgetModel.parent);
        }

        while(parent) {
            offset.x += widgetModel.frame.x;
            offset.y += widgetModel.frame.y;

            if(['FlexScrollContainer', 'Form'].indexOf(parent.wType) >= 0) {
                node = $KAUtils.getNodeByModel({
                    'widgetInstance': parent
                });
                scrollConfig.push([node, offset.x, offset.y]);
                offset = {
                    x: 0,
                    y: 0
                };
            }
            widgetModel = parent;
            if(parent.parent) {
                parent = $KW.Utils.getActualWidgetModel(parent.parent);
            } else {
                parent = null;
            }
        }
        while(scrollConfig.length > 0) {
            currentScroll = scrollConfig.pop();
            currentScroll[0].scrollTo(currentScroll[1], currentScroll[2]);
        }
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