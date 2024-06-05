
$KW.Canvas = (function() {
    

    var DEFAULT_DASHLINECONFIG  = [1, 1],
        DEFAULT_SHAPECOLOR = "00000000",
        SOLIDLINECONFIG = [],
        DEFAULT_THICKNESS = 1;

    var clearRect = function(canvasModel, ctx) {
        ctx.clearRect(0, 0, canvasModel.frame.width, canvasModel.frame.height);
    };

    var drawLine = function(ctx, shape, widgetFrame){
        var lconfiglen = 0, index = 0, lineConfig = shape.lineStyleConfig,
            lineWidth = DEFAULT_THICKNESS, points = shape.points, linepts = [];
        if(points && points.length == 2) {
            linepts.push(getValue(points[0][0], 'x', widgetFrame));
            linepts.push(getValue(points[0][1], 'y', widgetFrame));
            linepts.push(getValue(points[1][0], 'x', widgetFrame));
            linepts.push(getValue(points[1][1], 'y', widgetFrame));
            ctx.beginPath();
            if(voltmx.canvas.LINE_STYLE_DASHED === shape.lineStyle
            || voltmx.canvas.LINE_STYLE_DOTTED === shape.lineStyle) {
                if(lineConfig){
                    lconfiglen = lineConfig.length -1;
                    for(index = 0; index <= lconfiglen; index++) {
                        lineConfig[index] = getValue(lineConfig[index]);
                    }
                } else {
                    lineConfig = DEFAULT_DASHLINECONFIG;
                }
                ctx.setLineDash(lineConfig);
            } else {
                ctx.setLineDash(SOLIDLINECONFIG);
            }

            

            if(shape.thickness) {
                lineWidth = getValue(shape.thickness);
            }
            ctx.lineWidth = lineWidth;
            ctx.strokeStyle = getStrokeStyle(ctx, shape.strokeColor, linepts, lineWidth);
            ctx.moveTo(linepts[0], linepts[1]);
            ctx.lineTo(linepts[2], linepts[3]);
            ctx.stroke();
        }
    };

    var getStrokeStyle = function(ctx, strokeColor, points, lineThickness) {
        var strokeStyle = $KW.skins.convertHexValuetoRGBA(DEFAULT_SHAPECOLOR);

        if(strokeColor) {
            if(typeof strokeColor === 'string') {
                strokeStyle = $KW.skins.convertHexValuetoRGBA(strokeColor);
            } else if(typeof strokeColor === 'object') {
                switch(strokeColor.color_type) {
                    case 'one':
                        strokeStyle = $KW.skins.convertHexValuetoRGBA(strokeColor.color);
                        break;
                    case 'two':
                        strokeStyle = getStrokeStyleTwoStepGradient(ctx, strokeColor, points, lineThickness);
                        break;
                    case 'ms_gradient':
                        strokeStyle = getStrokeStyleMSGradient(ctx, strokeColor, points, lineThickness);
                        break;
                }
            }
        }
        return strokeStyle;
    };

    var getStrokeStyleTwoStepGradient = function(ctx, strokeColor, points, lineThickness) {
        var gradient = null, x1 = 0, x2 = 0, y1 = 0, y2 = 0, topcolor = '',
            bottomcolor = '', thinknessby2 = parseFloat(lineThickness/2);

        topcolor = $KW.skins.convertHexValuetoRGBA(strokeColor.top_color);
        bottomcolor = $KW.skins.convertHexValuetoRGBA(strokeColor.bottom_color);
        if(strokeColor.style == "hg" || strokeColor.style == "hs") {
            x1 = points[0];
            y1 = points[1];
            x2 = points[2];
            y2 = points[3];
        } else if(strokeColor.style == "vg" || strokeColor.style == "vs") {
            x1 = points[0];
            y1 = (points[1] - thinknessby2);
            x2 = points[0];
            y2 = (points[1] + thinknessby2);
        }
        gradient = ctx.createLinearGradient(x1, y1, x2, y2);
        gradient.addColorStop(0, topcolor);
        if(strokeColor.style == "vs" || strokeColor.style == "hs") {
            gradient.addColorStop(0.5, topcolor);
            gradient.addColorStop(0.5, bottomcolor);
        }
        gradient.addColorStop(1, bottomcolor);

        return gradient;
    };

    var getStrokeStyleMSGradient = function(ctx, strokeColor, points, lineThickness) {
        var gradient = null, x1 = 0, x2 = 0, y1 = 0, y2 = 0,
            i = 0, thinknessby2 = parseFloat(lineThickness/2);

        if('toRight' == strokeColor.gradientType) {
            x1 = points[0];
            y1 = points[1];
            x2 = points[2];
            y2 = points[3];
        } else if('toLeft' == strokeColor.gradientType) {
            x1 = points[2];
            y1 = points[3];
            x2 = points[0];
            y2 = points[1];
        } else if('toBottom' == strokeColor.gradientType) {
            x1 = points[0];
            y1 = (points[1] - thinknessby2);
            x2 = points[0];
            y2 = (points[1] + thinknessby2);
        } else if('toTop' == strokeColor.gradientType) {
            x1 = points[0];
            y1 = (points[1] + thinknessby2);
            x2 = points[0];
            y2 = (points[1] - thinknessby2);
        }
        gradient = ctx.createLinearGradient(x1, y1, x2, y2);
        for(i = 0; i < strokeColor.colors.length && i < strokeColor.cs.length; i++) {
            gradient.addColorStop(parseFloat(strokeColor.cs[i])/100,  $KW.skins.convertHexValuetoRGBA(strokeColor.colors[i]));
        }

        return gradient;
    };

    var getIndexFromShapesData = function(canvasModel, shapeId) {
        var i = 0, data = canvasModel.shapesdata, returnIndex = -1;
        if(data && data.length > 0) {
            for(i = 0; i < data.length; i++) {
                if(data[i].shapeid === shapeId) returnIndex = i;
            }
        }
        return returnIndex;
    };

    var getValue = function(value, axis, widgetFrame){
        var valueObj = $KW.FlexUtils.splitValueAndUnit(value);
        return $KW.FlexUtils.getValueByWidgetFrame(valueObj, axis, widgetFrame);
    };

    var updateShapeData = function(canvasModel, shapeData) {
        var key, returnflag = false, existingShapeData = {}, updateData = {},
            index = getIndexFromShapesData(canvasModel, shapeData.shapeid);

        if(index !== -1) {
            existingShapeData = canvasModel.shapesdata[index];
            for(key in existingShapeData) {
                if(existingShapeData.hasOwnProperty(key)) {
                    updateData[key] = existingShapeData[key]
                }
            }
            for(key in shapeData) {
                if(shapeData.hasOwnProperty(key) || key !== 'shapeType') {
                    updateData[key] = shapeData[key]
                }
            }

            if(voltmx.canvas.SHAPE_TYPE_LINE === updateData.shapeType) {
                validateLineData(updateData);
            }

            canvasModel.shapesdata[index] = updateData;
            returnflag = true;
        }
        return returnflag;
    };

    var getDataObj = function(dataArr) {
        var i = 0, returnDataObj = {};
        if(dataArr && dataArr.length > 0) {
            for(i = 0; i < dataArr.length; ++i) {
                returnDataObj[dataArr[i].shapeid] = dataArr[i];
            }
        }
        return returnDataObj;
    };

    var validateShapesData = function(dataArr) {
        var i = 0, len = 0, validDataObj = {};
        if(dataArr instanceof Array) {
            len = dataArr.length - 1;
            for(i = 0; i <= len; ++i) {
                if(!dataArr[i].shapeid) {
                    throw new VoltmxError(6001, "Invalid shapesData", "shapesData does not have mandatory value shapeid.");
                } else if(!dataArr[i].shapeType) {
                    throw new VoltmxError(6001, "Invalid shapesData", "shapesData does not have mandatory value shapeType.");

                } else if(validDataObj[dataArr[i].shapeid]) {
                    throw new VoltmxError(6002, "Invalid shapesData", "shapesData has duplicate shape identifier. " + dataArr[i].shapeid);
                } else {
                    if(voltmx.canvas.SHAPE_TYPE_LINE === dataArr[i].shapeType) {
                        validateLineData(dataArr[i]);
                    } else {
                        throw new VoltmxError(6001, "Invalid shapesData", "Not a valid shapeType.");
                    }
                    validDataObj[dataArr[i].shapeid] = dataArr[i];
                }
            }
        }
    };

    var validateLineData = function(shapeLineData) {
        validateLinePts(shapeLineData.points);
    };

    var validateLinePts = function(points, flag) {
        var innerDataValidDataFlag = (typeof flag != 'undefined' ? flag : true);

        if(points instanceof Array) {
            if(points.length != 2 ) {
                throw new VoltmxError(6001, "Invalid shapesData", "shapesData does not have mandatory value points for shapeType line.");
            } else if(innerDataValidDataFlag) {
               validateLinePts(points[0], false);
               validateLinePts(points[1], false);
            }
        } else {
            throw new VoltmxError(6001, "Invalid shapesData", "shapesData does not have mandatory value points for shapeType line.");
        }
    };

    
    var _addShapes = function(canvasModel, shapesDataArr) {
        var i = 0, addData = [], existingDataObj = getDataObj(canvasModel.shapesdata);
        if(shapesDataArr && shapesDataArr.length > 0) {
            for(i = 0; i < shapesDataArr.length; ++i) {
                 if(existingDataObj[shapesDataArr[i].shapeid]) {
                    throw new VoltmxError('CanvasError', 'addShapes:: already shapeid exists');
                 } else {
                    addData.push(shapesDataArr[i]);
                 }
            }
            canvasModel.shapesdata = canvasModel.shapesdata.concat(addData);
            _drawShapesOnCanvas(canvasModel);
        }
    };

    var _clearCanvas = function(canvasModel) {
        var ctx, canvasNode = $KU.getNodeByModel(canvasModel);;
        ctx = canvasNode.getContext('2d');
        canvasModel.shapesdata = [];
        clearRect(canvasModel, ctx);
    };

    var _drawShapesOnCanvas = function(canvasModel, canvasNode) {
        var index = 0, shape = null, ctx = null, scale = $KU.dpi,
        shapesdata = canvasModel.shapesdata, len = 0;
        canvasNode = canvasNode || $KU.getNodeByModel(canvasModel);
        canvasNode.width = canvasModel.frame.width * scale;
        canvasNode.height = canvasModel.frame.height * scale;
        ctx = canvasNode.getContext('2d');
        ctx.scale(scale, scale);
        clearRect(canvasModel, ctx);
        len = shapesdata ? shapesdata.length - 1 : -1;
        for(index = 0; index <= len ; index++) {
            shape = shapesdata[index];
            if(voltmx.canvas.SHAPE_TYPE_LINE === shape.shapeType) {
                drawLine(ctx, shape, canvasModel.frame);
            }
        }
    };

    var _removeShapes = function(canvasModel, shapeIds) {
        var index = -1, loopIndex = 0, isremoved = false;
        for(loopIndex = 0; loopIndex < shapeIds.length; ++loopIndex) {
            index = getIndexFromShapesData(canvasModel, shapeIds[loopIndex]);
            if(index != -1) {
                canvasModel.shapesdata.splice(index, 1);
                isremoved = true;
            }
        }
        isremoved && _drawShapesOnCanvas(canvasModel);
    };

    var _updateShapes = function(canvasModel, shapesData) {
        var loopIndex = 0, isupdated = false;
        for(loopIndex = 0; loopIndex < shapesData.length; ++loopIndex) {
            isupdated = updateShapeData(canvasModel, shapesData[loopIndex]) || isupdated;
        }
        isupdated && _drawShapesOnCanvas(canvasModel);
    };

    

    var module = {

        onWidgetLayout: function(canvasModel, canvasNode) {
            validateShapesData(canvasModel.shapesdata);
            _drawShapesOnCanvas(canvasModel, canvasNode);
        },

        addShapes: function(canvasModel, shapesData) {
            validateShapesData(shapesData);
            _addShapes(canvasModel, shapesData);
        },

        updateShapes: function(canvasModel, shapesData) {
            _updateShapes(canvasModel, shapesData);
        },

        removeShapes: function(canvasModel, shapeIds) {
            _removeShapes(canvasModel, shapeIds);
        },

        clear: function(canvasModel) {
            _clearCanvas(canvasModel);
        },

        updateView: function(canvasModel, propertyName, propertyValue, oldPropertyValue) {
            switch(propertyName) {
                case "shapesdata":
                    var element = $KU.getNodeByModel(canvasModel);
                    if(element) {
                        validateShapesData(canvasModel.shapesdata);
                        _drawShapesOnCanvas(canvasModel, element);
                    }
                    break;
            }
        },

        render: function(canvasModel, context) {
            var htmlString = "";
            var baseHtmlStr = $KW.Utils.getBaseHtml(canvasModel, context);
            var computedSkin = $KW.skins.getWidgetSkinList(canvasModel, context);
            htmlString += "<canvas " + baseHtmlStr + " style='" + $KW.skins.getBaseStyle(canvasModel, context) + "' class='" + computedSkin + "'>";
            htmlString += "</canvas>";
            return htmlString;
        }
     };


    return module;
}());
