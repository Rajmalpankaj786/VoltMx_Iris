

$KC = (function() {

    
    var _directPropertyMap = {
        'margin': 'Margin',
        'padding': 'Padding',
        'children': 'Children',
        'visiblecells': 'visibleCells'
    };
    var _variancePropertyMap = {
        'Properties': '',
        'VaryingTops': '',
        'varyingLefts': '',
        'varyingHeights': '',
        'varyingWidths': '',
        'VisibilityChanged': ''
    };
    var _dataSet = {};
    var _inlinePropertyMap = {
        'name': 'Type',
        'id': 'ID',
        '__name': 'Type'
    };
    var _inlineFramePropertyMap = {
        'height': 'Height',
        'width': 'Width',
        'x': 'Left',
        'y': 'Top'
    };
    var _inlineClientBounds = {
        'x': 'LeftFromScreen',
        'y': 'TopFromScreen',
        'scrollheight': 'scrollheight',
        'scrollwidth': 'scrollwidth',
        'contentWidth': 'contentWidth',
        'contentHeight': 'contentHeight',
        'numberOfLines': 'numberOfLines'
    };

    var _timeConsumingEventData = {
        'touchstart': 'onTouchStart',
        'mousedown': 'onTouchStart',
        'touchmove': 'onTouchMove',
        'mousemove': 'onTouchMove',
        'touchend': 'onTouchEnd',
        'mouseup': 'onTouchEnd'
    };

    var _widgetSpecificProperties = {
        'Form': {'enableScrolling': 'enableScrolling', 'contentSizeMeasured': {'height': 'contentHeight', 'width': 'contentWidth'}},
        'FlexScrollContainer': {'enableScrolling': 'enableScrolling', 'contentSizeMeasured': {'height': 'contentHeight', 'width': 'contentWidth'}, 'layoutType': 'layoutType'},
        'Segment': {'enableScrolling': 'enableScrolling'},
        'FlexContainer': {'layoutType': 'layoutType'}

    };

    

    var _addDirectProperties = function(widgetModel, formID) {
        var directProperties = {};
        var key, margin, mappedMargin = {}, child, children, childMap, flatClonedModels, count;

        for(key in _directPropertyMap) {
            if(key === 'children' || key === 'visiblecells') {
                children = [];
                if(key === 'children') { 
                    children = widgetModel.widgets && widgetModel.widgets();
                } else if(key === 'visiblecells') { 
                    if(widgetModel.wType === 'Segment') {
                        children = widgetModel.clonedTemplates || [];
                        if(widgetModel.hasSections) {
                            flatClonedModels = [];
                            for(count = 0; count < children.length; count++) {
                                flatClonedModels.push(children[count][0]);
                                flatClonedModels = flatClonedModels.concat(children[count][1]);
                            }
                            children = flatClonedModels;
                        }
                    }
                }
                if(children && children.length > 0) {
                    childMap = [];
                    for(child = 0; child <children.length; child++) {
                        if(children[child].isVisible === true) {
                            childMap.push(_recursivelyGetWidgetData(children[child], formID));
                        }
                    }
                    directProperties[_directPropertyMap[key]] = childMap;
                } else {
                    if(key === 'children') {
                        directProperties[_directPropertyMap[key]] = [];
                    }
                }
            } else if(key === 'margin' || key === 'padding') {
                margin = widgetModel[key];
                mappedMargin = {
                    'left': margin[0],
                    'top': margin[1],
                    'right': margin[2],
                    'bottom': margin[3]
                };
                directProperties[_directPropertyMap[key]] = mappedMargin;
            }
        }

        return directProperties;
    };

    var _addVarianceProperties = function(widgetModel, formID) {
        
        var varianceProperties = {};

        varianceProperties = _variancePropertyMap;

        return varianceProperties;
    };

    var _addInlineProperties = function(widgetModel, formID) {
        var inlineProperties = {}, contentSize;
        var key, wType = widgetModel.wType, widgetSpecificProperties, subKey,
        subProperty, value;

        for(key in _inlinePropertyMap) {
            if(!inlineProperties[_inlinePropertyMap[key]] && typeof _inlinePropertyMap[key] !== "undefined") {
                if(_inlinePropertyMap[key] === 'Type' &&
                   widgetModel.masterType === constants.MASTER_TYPE_DEFAULT || widgetModel.name === "voltmx.ui.KComponent") {
                    inlineProperties[_inlinePropertyMap[key]] = 'voltmx.ui.User';
                } else {
                    inlineProperties[_inlinePropertyMap[key]] = widgetModel[key];
                }
            }
        }

        for(key in _inlineFramePropertyMap) {
            inlineProperties[_inlineFramePropertyMap[key]] = widgetModel.frame[key];
        }

        for(key in _inlineClientBounds) {
            if(widgetModel._internals.clientBounds[key]) {
                inlineProperties[_inlineClientBounds[key]] = widgetModel._internals.clientBounds[key] || 0;
            }
        }

        widgetSpecificProperties = _widgetSpecificProperties[wType];

        if(widgetSpecificProperties) {
            for(key in widgetSpecificProperties) {
                subKey = widgetSpecificProperties[key];
                value = widgetModel[key];
                if(key === "layoutType") {
                    if(value == voltmx.flex.FLOW_HORIZONTAL) {
                        value = "FLOW_HORIZONTAL";
                    } else if(value == voltmx.flex.FLOW_VERTICAL) {
                        value = "FLOW_VERTICAL";
                    } else {
                        value = "FREE_FORM";
                    }
                }
                if(typeof subKey === 'object') {
                    for(subProperty in subKey) {
                        inlineProperties[subKey[subProperty]] = value[subProperty];
                    }
                } else {
                    inlineProperties[subKey] = value;
                }
            }
        }

        return inlineProperties;
    };

    var _formatXML = function(xml) {
        var formatted = '', indent= '', i, node;
        var tab = '\t', nodes = xml.split(/>\s*</);
        for(i = 0; i < nodes.length; i++) {
            node = nodes[i];
            if(node.match( /^\/\w/ )) {
               indent = indent.substring(tab.length); 
            }
            formatted += indent + '<' + node + '>\r\n';
            if(node.match( /^<?\w[^>]*[^\/]$/ )) {
                indent += tab;              
            }
        }

        return formatted.substring(1, formatted.length-3);
    }

    var _generateAllWidgetsXML = function(data) {
        var widget, xml = '', key;

        if(data) {
            if(data instanceof Array) {
                for(key = 0; key < data.length; key++) {
                    widget = data[key];

                    xml += '<WidgetData ' + _generateInlineXML(widget) + '>';

                    xml += _generateDirectXML(widget);

                    xml += _generateTimeConsumingEventXML(widget);

                    xml += _generateVarianceXML(widget);

                    xml += '</WidgetData>';
                }

            } else {
                for(key in data) {
                    if($KG.appbehaviors["responsive"] === true) {
                        xml += _generateFormXMLforDesktop(data[key]);
                    } else {
                        xml += _generateFormXMLforSpa(data[key]);
                                                                 
                                                                 
                    }
                }
            }
        }

        return xml;
    };

    var _generateFormXMLforDesktop = function(formData) {
        var widget, xml = '', isInlineSet = false;

        xml += '<WidgetData ' + _generateInlineXMLForDesktopForm(formData[Object.keys(formData)[0]])  + '>';
        for(key in formData) {

            widget = formData[key];

            xml += '<Breakpoint value = "' + key +'" '+ _generateInlineXMLForDesktopForm(widget, true) + '>';

            xml += _generateDirectXML(widget);

            xml += _generateTimeConsumingEventXML(widget);

            xml += _generateVarianceXML(widget);

            xml += '</Breakpoint>';
        }
        xml += '</WidgetData>';

        return xml;
    };

    var _generateFormXMLforSpa = function(formData) {
        var xml = '';

        xml += '<WidgetData ' + _generateInlineXML(formData) + '>';

        xml += _generateDirectXML(formData);

        xml += _generateTimeConsumingEventXML(formData);

        xml += _generateVarianceXML(formData);

        xml += '</WidgetData>';

        return xml;
    };

    var _generateDirectXML = function(data) {
        var key, directProperties = data.directProperties, xml = '', subKey, subProperty;

        for(key in directProperties) {
            subProperty = directProperties[key];
            if(key === 'Children' || key === 'visibleCells') {
                xml += '<' + key + '>';
                xml += _generateAllWidgetsXML(subProperty);
                xml += '</' + key + '>';
            } else if(key === 'Margin' || key === 'Padding') {
                xml += '<' + key + '>';
                for(subKey in subProperty) {
                    xml += '<' + subKey + '>';
                    xml += subProperty[subKey];
                    xml += '</' + subKey + '>';
                }
                xml += '</' + key + '>';
            }
        }

        return xml;
    };

    var _generateTimeConsumingEventXML = function(data) {
        var xml, widgetInternals = data._model._internals, touchEventData = {}, key;

        xml = '<touchEventsTimeConsumed>';
        if(widgetInternals && widgetInternals.touchEventsTimeConsumed) {
            touchEventData = widgetInternals.touchEventsTimeConsumed;
            for(key in _timeConsumingEventData) {
                if(touchEventData[key]) {
                    xml += '<' + _timeConsumingEventData[key] + '>';
                    xml += touchEventData[key];
                    xml += '</' + _timeConsumingEventData[key] + '>';
                }
            }
        }
        xml += '</touchEventsTimeConsumed>';

        return xml;
    };

    var _setFormAccessDetails = function() {
        var key, subKey;

        for(key in _dataSet) {
            if($KG.appbehaviors["responsive"] === true)  {
                for(subKey in _dataSet[key]) {
                    _dataSet[key][subKey].inlineProperties.FormLoadedBeforeShow = $KC.voltmxCOPPrerenderFormAccessedData[key];
                    if($KC.voltmxCOPFormAccess && $KC.voltmxCOPFormAccess[key]) {
                        _dataSet[key][subKey].inlineProperties.FormLoadedBeforeShow = $KC.voltmxCOPFormAccess[key];
                    }
                }
            } else {
                _dataSet[key].inlineProperties.FormLoadedBeforeShow = $KC.voltmxCOPPrerenderFormAccessedData[key];
                if($KC.voltmxCOPFormAccess && $KC.voltmxCOPFormAccess[key]) {
                    _dataSet[key].inlineProperties.FormLoadedBeforeShow = $KC.voltmxCOPFormAccess[key];
                }
            }
        }
    };

    var _generateInlineXML = function(data) {
        var key, inlineProperties = data.inlineProperties, seperator = ' ', xml = '', equator = '=', quotes = '"';

        for(key in inlineProperties) {
            xml += key + equator + quotes + inlineProperties[key] + quotes + seperator;
        }
        xml = xml.trim();

        return xml;
    };

    var _generateInlineXMLForDesktopForm = function(data, breakpointInline) {
        var key, inlineProperties = data.inlineProperties, seperator = ' ', xml = '', equator = '=', quotes = '"';
        if(breakpointInline) {

            for(key in inlineProperties) {
                if(key != 'Type' && key != 'ID') {
                    xml += key + equator + quotes + inlineProperties[key] + quotes + seperator;
                }
            }

        } else {
            xml += 'Type = "'+ inlineProperties.Type +'" ID = "' + inlineProperties.ID  +'"';
        }

        xml = xml.trim();
        return xml;
    };

    var _generateVarianceXML = function(data) {
        var key, varianceProperties = data.varianceProperties, xml = '';

        for(key in varianceProperties) {
            xml += '<' + key + '>' + varianceProperties[key] + '</' + key + '>';
        }

        return xml;
    };

    var _recursivelyGetWidgetData = function(widgetModel, formID) {
        

        var dataSet= {};

        
        dataSet.inlineProperties = _addInlineProperties(widgetModel, formID);

        widgetModel = $KW.Utils.getActualWidgetModel(widgetModel);

        
        dataSet.directProperties = _addDirectProperties(widgetModel, formID);

        
        dataSet.varianceProperties = _addVarianceProperties(widgetModel, formID);

        dataSet._model = widgetModel;

        return dataSet;
    };

    var module = {
        voltmxCOPFormAccess : {},
        voltmxCOPPrerenderFormAccessedData : {},
        widgetDataRecording : false,
        isRecording : false,

        setClientBoundsForXML: function(wModel, wNode) {
            var height, childNode, lineHeight, lineSize, display, noOfLines;

            wModel._internals.clientBounds = wNode.getBoundingClientRect();
            if(wModel.wType === 'FlexContainer') {
                wModel._internals.clientBounds.scrollheight = wNode.firstChild.firstChild.scrollHeight;
                wModel._internals.clientBounds.scrollwidth = wNode.firstChild.firstChild.scrollWidth;
            } else if(['Label', 'Button', 'RichText'].indexOf(wModel.wType) != -1) {
                childNode = $KW.Utils.getWidgetNode(wModel, wNode);

                height = childNode.style.height;
                display = childNode.style.display;

                childNode.style.display = 'block';
                childNode.style.height ='auto';
                wModel._internals.clientBounds.contentWidth = childNode.scrollWidth;
                wModel._internals.clientBounds.contentHeight = childNode.scrollHeight;

                if(wModel.wType != 'RichText') {
                    fontSize = parseInt($KU.getStyle(childNode, "font-size"));
                    lineHeight = $KU.getStyle(childNode, "line-height");
                    if(lineHeight == "normal") {
                      lineSize = fontSize * 1.2;
                    } else {
                      lineSize = fontSize * parseInt(lineHeight);
                    }
                    noOfLines = wModel._internals.clientBounds.contentHeight/lineSize;
                    wModel._internals.clientBounds.numberOfLines = Math.ceil(noOfLines);
                }

                childNode.style.height = height;
                childNode.style.display = display;
            }
        },
        generateFormJSONAfterRender: function(formModel) {
            var widgetData = _recursivelyGetWidgetData(formModel, formModel.id);
            var breakpoints, breakpointValue;
            if($KG.appbehaviors["responsive"] === true) {
                breakpointValue = $KW.Form.getCurrentBreakpoint();
                if(breakpointValue == constants.BREAKPOINT_MAX_VALUE) {
                    breakpoints = formModel.breakpoints;
                    breakpointValue = breakpoints[breakpoints.length -1];
                }
                if(!_dataSet[formModel.id]) _dataSet[formModel.id] = {};
                _dataSet[formModel.id][breakpointValue] = widgetData;
            } else {
                _dataSet[formModel.id] = widgetData;
            }
            
        },
        generateXMLFormJSON: function() {
            module.generateFormJSONAfterRender($KG.__currentForm);
            _setFormAccessDetails();
            var xml = '<?xml version="1.0" encoding="UTF-8"?><AppData xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">'
            var channel, _appLoadTime, loadTimeXML = "", platform = $KG.platformver;

            if(window.performance.getEntriesByType('paint').length > 0) {
                _appLoadTime = window.performance.getEntriesByType('paint')[1].startTime;
            }

            loadTimeXML += _appLoadTime ? '<AppLoadTime>'+ _appLoadTime +'</AppLoadTime>' : '';
            if(voltmx.appinit.isMob) channel = "MOBILE";
            else if(voltmx.appinit.isTablet) channel = "TABLET";
            else channel = "DESKTOP";

            platform = platform.slice(0, -1);
            xml += '<AppName>' + $KG.appid + '</AppName>' +
                    loadTimeXML +
                   '<ScreenHeight>' + screen.availHeight + '</ScreenHeight>' +
                   '<ScreenWidth>' + screen.availWidth + '</ScreenWidth>' +
                   '<Channel>' + channel + '</Channel>' +
                   '<Platform>' + platform + '</Platform>' +
                   '<DevicePixelRatio>' + window.devicePixelRatio + '</DevicePixelRatio>';



            xml += '<AllWidgets>';

            xml += _generateAllWidgetsXML(_dataSet);

            xml += '</AllWidgets>';

            xml += '</AppData>'

            xml = _formatXML(xml);

            return xml;
        }
    };

    return module;
})();