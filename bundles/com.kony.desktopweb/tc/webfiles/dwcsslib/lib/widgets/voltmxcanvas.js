//check
(function() {
    var $K = voltmx.$kwebfw$,
        DEFAULT_DASHLINECONFIG = [1, 1], DEFAULT_THICKNESS = 1,
        SOLIDLINECONFIG = [], DEFAULT_SHAPECOLOR = '00000000';


    $K.defVoltmxProp($K.ui, [
        {keey:'Canvas', value:{}, items:[
            {keey:'doLayout', value:function(/*frame*/) {
                _drawShapesOnCanvas.call(this);
            }}
        ]}
    ]);


    var _clearRect = function Canvas$_clearRect(ctx) {
        var frame = this._kwebfw_.prop.frame;

        ctx.clearRect(0, 0, frame.width, frame.height);
    };

    //All widget file must have this variable
    //All the functions will be called in the scope of widget instance
    var _dependentPropertiesValidationMessage = {};

    var _drawLine = function Canvas$_drawLine(ctx, shape) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils,
            lineConfig = shape.lineStyleConfig, lineWidth = DEFAULT_THICKNESS,
            points = shape.points, linepts = [], widgetFrame = this._kwebfw_.prop.frame;

        if(points && points.length === 2) {
            linepts.push($KU.getValueUnitByWidgetFrame(points[0][0], 'x', widgetFrame).value);
            linepts.push($KU.getValueUnitByWidgetFrame(points[0][1], 'y', widgetFrame).value);
            linepts.push($KU.getValueUnitByWidgetFrame(points[1][0], 'x', widgetFrame).value);
            linepts.push($KU.getValueUnitByWidgetFrame(points[1][1], 'y', widgetFrame).value);
            ctx.beginPath();
            if(voltmx.canvas.LINE_STYLE_DASHED === shape.lineStyle
            || voltmx.canvas.LINE_STYLE_DOTTED === shape.lineStyle) {
                if(lineConfig) {
                    $KU.each(lineConfig, function(lineConfigData, index) {
                        lineConfig[index] = $KU.getValueUnitByWidgetFrame(lineConfigData).value;
                    }, this);
                } else {
                    lineConfig = DEFAULT_DASHLINECONFIG;
                }
                ctx.setLineDash(lineConfig);
            } else {
                ctx.setLineDash(SOLIDLINECONFIG);
            }

            /*
            *  Next canvas enhancements, we need to support lineCap / Round corner
            *
            if(voltmx.canvas.LINE_STYLE_DASHED === shape.lineStyle) {
               ctx.lineCap   = 'solid'; //think cross platform and do it
            } else if(voltmx.canvas.LINE_STYLE_DOTTED === shape.lineStyle) {
               ctx.lineCap   = 'round';
            }
            */

            if(shape.thickness) {
                lineWidth = $KU.getValueUnitByWidgetFrame(shape.thickness).value;
            }
            ctx.lineWidth = lineWidth;
            ctx.strokeStyle = _getStrokeStyle(ctx, shape.strokeColor, linepts, lineWidth);
            ctx.moveTo(linepts[0], linepts[1]);
            ctx.lineTo(linepts[2], linepts[3]);
            ctx.stroke();
        }
    };

    var _drawShapesOnCanvas = function Canvas$_drawShapesOnCanvas() {
        var $K = voltmx.$kwebfw$, $KW = $K.widget, $KU = $K.utils,
            $KD = $K.dom, shapesdata = this._kwebfw_.prop.shapesData,
            el = $KW.el(this), scale = $K.device.DPI,
            ctx = el.canvas.getContext('2d'), frame = this._kwebfw_.prop.frame;

        $KD.setAttr(el.canvas, 'width', frame.width * scale);
        $KD.setAttr(el.canvas, 'height', frame.height * scale);
        ctx.scale(scale, scale);
        _clearRect.call(this, ctx);
        $KU.each(shapesdata, function(shape/* , index */) {
            if(voltmx.canvas.SHAPE_TYPE_LINE === shape.shapeType) {
                _drawLine.call(this, ctx, shape);
            }
        }, this);
    };

    var _getDataObj = function Canvas$_getDataObj(dataArr) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, returnDataObj = {};

        $KU.each(dataArr, function(data/* , index */) {
            returnDataObj[data.shapeid] = data;
        });

        return returnDataObj;
    };

    var _getIndexFromShapesData = function Canvas$_getIndexFromShapesData(shapeId) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, returnIndex = -1,
            dataArr = this._kwebfw_.prop.shapesData;

        $KU.each(dataArr, function(data, index) {
            if(data.shapeid === shapeId) returnIndex = index;
        });

        return returnIndex;
    };

    var _getStrokeStyle = function Canvas$_getStrokeStyle(ctx, strokeColor, points, lineThickness) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils,
            strokeStyle = $KU.convertHexToRGBA(DEFAULT_SHAPECOLOR);

        if(strokeColor) {
            if(typeof strokeColor === 'string') {
                strokeStyle = $KU.convertHexToRGBA(strokeColor);
            } else if(typeof strokeColor === 'object') {
                switch(strokeColor.color_type) {
                    case 'one':
                        strokeStyle = $KU.convertHexToRGBA(strokeColor.color);
                        break;
                    case 'two':
                        strokeStyle = _getStrokeStyleTwoStepGradient(ctx, strokeColor, points, lineThickness);
                        break;
                    case 'ms_gradient':
                        strokeStyle = _getStrokeStyleMSGradient(ctx, strokeColor, points, lineThickness);
                        break;
                    default:
                        break;
                }
            }
        }

        return strokeStyle;
    };

    var _getStrokeStyleTwoStepGradient = function Canvas$_getStrokeStyleTwoStepGradient(ctx, strokeColor, points, lineThickness) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, bottomcolor = '',
            gradient = null, x1 = 0, x2 = 0, y1 = 0, y2 = 0, topcolor = '',
            thinknessby2 = parseFloat(lineThickness/2);

        topcolor = $KU.convertHexToRGBA(strokeColor.top_color);
        bottomcolor = $KU.convertHexToRGBA(strokeColor.bottom_color);

        if(strokeColor.style === 'hg' || strokeColor.style === 'hs') {
            x1 = points[0];
            y1 = points[1];
            x2 = points[2];
            y2 = points[3];
        } else if(strokeColor.style === 'vg' || strokeColor.style === 'vs') {
            x1 = points[0];
            y1 = (points[1] - thinknessby2);
            x2 = points[0];
            y2 = (points[1] + thinknessby2);
        }

        gradient = ctx.createLinearGradient(x1, y1, x2, y2);
        gradient.addColorStop(0, topcolor);

        if(strokeColor.style === 'vs' || strokeColor.style === 'hs') {
            gradient.addColorStop(0.5, topcolor);
            gradient.addColorStop(0.5, bottomcolor);
        }

        gradient.addColorStop(1, bottomcolor);

        return gradient;
    };

    var _getStrokeStyleMSGradient = function(ctx, strokeColor, points, lineThickness) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, gradient = null,
            i = 0, x1 = 0, x2 = 0, y1 = 0, y2 = 0,
            thinknessby2 = parseFloat(lineThickness/2);

        if('toRight' === strokeColor.gradientType) {
            x1 = points[0];
            y1 = points[1];
            x2 = points[2];
            y2 = points[3];
        } else if('toLeft' === strokeColor.gradientType) {
            x1 = points[2];
            y1 = points[3];
            x2 = points[0];
            y2 = points[1];
        } else if('toBottom' === strokeColor.gradientType) {
            x1 = points[0];
            y1 = (points[1] - thinknessby2);
            x2 = points[0];
            y2 = (points[1] + thinknessby2);
        } else if('toTop' === strokeColor.gradientType) {
            x1 = points[0];
            y1 = (points[1] + thinknessby2);
            x2 = points[0];
            y2 = (points[1] - thinknessby2);
        }

        gradient = ctx.createLinearGradient(x1, y1, x2, y2);

        for(i=0; i<strokeColor.colors.length && i<strokeColor.cs.length; i++) {
            gradient.addColorStop(parseFloat(strokeColor.cs[i])/100, $KU.convertHexToRGBA(strokeColor.colors[i]));
        }

        return gradient;
    };

    var _getter = {
        Canvas: {
        }
    };


    var _populateUnderscore = {
        Canvas: function Canvas$_populateUnderscore() {
            var $K = voltmx.$kwebfw$, $KU = $K.utils, _ = null;

            if(!$KU.is(this._kwebfw_, 'object')) {
                $KU.defineProperty(this, '_kwebfw_', {}, null);
            }
            _ = this._kwebfw_;

            //NOTE:: Any changes to _ (underscore) may need a change in
            //       _cleanUnderscore function of voltmxui.js file.
            if(!_.ns) {
                if($KU.is(this.__$kwebfw$ns__, 'string') && this.__$kwebfw$ns__) {
                    $KU.defineProperty(_, 'ns', this.__$kwebfw$ns__, null);
                } else {
                    $KU.defineProperty(_, 'ns', 'voltmx.ui.Canvas', null);
                }
            }
            if(!_.name) {
                if($KU.is(this.__$kwebfw$name__, 'string') && this.__$kwebfw$name__) {
                    $KU.defineProperty(_, 'name', this.__$kwebfw$name__, null);
                } else {
                    $KU.defineProperty(_, 'name', 'Canvas', null);
                }
            }
        }
    };

    var _postInitialization = {};

    var _relayoutActiveTriggerer = {
        Canvas: function Canvas$_relayoutActiveTriggerer() {
            return [];
        }
    };

    var _relayoutPassiveTriggerer = {
        Canvas: function Canvas$_relayoutPassiveTriggerer() {
            return [];
        }
    };

    var _setter = {
        Canvas: {
        }
    };

    var _updateShapeData = function Canvas$_updateShapeData(shapeData) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, returnflag = false,
            existingShapeData = {}, updateData = {}, index = -1;

        index = _getIndexFromShapesData.call(this, shapeData.shapeid);

        if(index !== -1) {
            existingShapeData = this._kwebfw_.prop.shapesData[index];
            $KU.each(existingShapeData, function(data, key) {
                updateData[key] = data;
            });
            $KU.each(shapeData, function(data, key) {
                if(key !== 'shapeType') {
                    updateData[key] = data;
                }
            });
            if(voltmx.canvas.SHAPE_TYPE_LINE === updateData.shapeType) {
                _valid.Canvas.validateLineData.call(this, updateData);
            }
            this._kwebfw_.prop.shapesData[index] = updateData;
            returnflag = true;
        }

        return returnflag;
    };


    //All widget file must have this variable
    //All the functions will be called in the scope of widget instance
    //These function should always return a boolean value
    var _valid = {
        Canvas: {
            shapesData: function Canvas$_valid_shapesData(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'array')) {
                    $KU.each(value, function(data/* , index */) {
                        var validDataObj = {};

                        if(!data.shapeid) {
                            throw new $KU.error(6001, 'Invalid shapesData', 'shapesData does not have mandatory value shapeid.');
                        } else if(!data.shapeType) {
                            throw new $KU.error(6001, 'Invalid shapesData', 'shapesData does not have mandatory value shapeType.');
                        } else if(validDataObj[data.shapeid]) {
                            throw new $KU.error(6002, 'Invalid shapesData', 'shapesData has duplicate shape identifier.'+ data.shapeid);
                        } else {
                            if(voltmx.canvas.SHAPE_TYPE_LINE === data.shapeType) {
                                _valid.Canvas.validateLineData.call(this, data);
                            } else {
                                throw new $KU.error(6001, 'Invalid shapesData', 'Not a valid shapeType.');
                            }

                            validDataObj[data.shapeid] = data;
                        }
                    }, this);

                    flag = true;
                } else if($KU.is(value, 'undefined')) {
                    flag = true;
                }

                return flag;
            },

            validateLineData: function Canvas$_valid_validateLineData(shapeLineData) {
                _valid.Canvas.validateLinePoints.call(this, shapeLineData.points);
            },

            validateLinePoints: function Canvas$_valid_validateLinePoints(points, flag) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils,
                    innerDataValidDataFlag = ($KU.is(flag, 'boolean')) ? flag : true;

                if(points instanceof Array) {
                    if(points.length !== 2) {
                        throw new $KU.error(6001, 'Invalid shapesData', 'shapesData does not have mandatory value points for shapeType line.');
                    } else if(innerDataValidDataFlag) {
                        _valid.Canvas.validateLinePoints.call(this, points[0], false);
                        _valid.Canvas.validateLinePoints.call(this, points[1], false);
                    }
                } else {
                    throw new $KU.error(6001, 'Invalid shapesData', 'shapesData does not have mandatory value points for shapeType line.');
                }
            }
        }
    };


    //All widget file must have this variable
    //All the functions will be called in the scope of widget instance
    //Any property here, which is set to 'false', will not create a setter
    var _view = {
        Canvas: {
            shapesData: function Canvas$_view_shapesData(/* el, old */) {
                _drawShapesOnCanvas.call(this);
            }
        }
    };


    Object.defineProperty(voltmx.ui, 'Canvas', {configurable:false, enumerable:false, writable:false, value:(function() {
        var $K = voltmx.$kwebfw$;


        /**
         * voltmx.ui.Canvas constructor.
         *
         * @class
         * @namespace   voltmx.ui
         * @extends     voltmx.ui.BasicWidget
         * @author      Shanker Pulugam <shanker.pulugam@voltmx.com>
         *
         * @param       {object} bconfig - An object with basic properties.
         * @param       {object} lconfig - An object with layout properties.
         * @param       {object} pspconfig - An object with platform specific properties.
         *
         * @throws      {InvalidArgumentException} - Invalid argument is passed.
         * @throws      {InvalidPropertyException} - Invalid property or invalid value of a property is passed.
         *
         * @classdesc   A brief description about the class.
         *              -
         *              -
         *
         * @todo        Anything that thought for but not yet implemented.
         *              -
         *              -
         */
        var Canvas = function Canvas(bconfig, lconfig, pspconfig) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils, self = this,
                dependentPropertiesValidationMessage = '', prop = null;

            if(!$KU.is(bconfig, 'object')) bconfig = {};

            if(!bconfig.isPreValidated) {
                prop = {
                    shapesData: []
                };
            }

            _populateUnderscore.Canvas.call(this);

            if(!$KU.is(bconfig.id, 'string') || !bconfig.id) {
                bconfig.id = (this._kwebfw_.name + $KU.uid());
            }

            Canvas.base.call(this, bconfig, lconfig, pspconfig);

            if(!bconfig.isPreValidated) {
                if($KU.is(_dependentPropertiesValidationMessage.Canvas, 'function')) {
                    dependentPropertiesValidationMessage = _dependentPropertiesValidationMessage.Canvas.call(this, prop, bconfig, lconfig, pspconfig);
                }
            }

            if(dependentPropertiesValidationMessage) {
                throw new Error(dependentPropertiesValidationMessage);
            } else {
                if(!bconfig.isPreValidated) {
                    //Defaulting to platfom values specific to Canvas
                    $KU.each(prop, function(value, key) {
                        var $K = voltmx.$kwebfw$, $KU = $K.utils,
                            $KW = $K.widget, valid = false, message = '';

                        if(!Object.prototype.hasOwnProperty.call(bconfig, key)) {
                            bconfig[key] = value;
                        } else if($KW.getNonConstructorProperties(self._kwebfw_.name).indexOf(key) >= 0) {
                            throw new Error('<' + key + '> is a non-constructor property of <' + self._kwebfw_.ns + '> class.');
                        } else if(!$KU.is(_valid.Canvas[key], 'function')) {
                            throw new Error('<' + key + '> is available in default widget properties of <voltmx.ui.Canvas>, but not in <_valid.Canvas> namespace.');
                        } else {
                            valid = _valid.Canvas[key].call(self, bconfig[key]);
                            if($KU.is(valid, 'array')) {
                                bconfig[key] = valid[0]; valid = valid[1];
                            }

                            if(valid === false || ($KU.is(valid, 'string') && valid)) {
                                message = ('Invalid value passed to property <' + key + '> of widget <' + self._kwebfw_.ns + '>.');

                                if($KU.is(valid, 'string')) {
                                    message += ('\n' + valid);
                                }

                                throw new Error(message);
                            }
                        }
                    });
                }

                //Defining Getters/Setters specific to Canvas
                $KU.each(_view.Canvas, function(value, key) {
                    var $K = voltmx.$kwebfw$, $KU = $K.utils;

                    $KU.defineProperty(self._kwebfw_.prop, key, bconfig[key], {configurable:false, enumerable:true, writable:true});

                    $KU.defineGetter(self, key, function Canvas$_getter() {
                        var $K = voltmx.$kwebfw$, $KU = $K.utils;

                        if($KU.is(_getter.Canvas[key], 'function')) {
                            return _getter.Canvas[key].call(this, this._kwebfw_.prop[key]);
                        }
                        return this._kwebfw_.prop[key];
                    }, true);

                    $KU.defineSetter(self, key, function Canvas$_setter(val) {
                        var $K = voltmx.$kwebfw$, $KU = $K.utils, old = null,
                            valid = false, $KW = $K.widget, rmodel = null,
                            final = null, message = '', el = null;

                        if(value === false) {
                            throw new Error('<'+key+'> is a readonly property of <'+this._kwebfw_.ns+'> widget.');
                        } else if(this._kwebfw_.prop[key] !== val) {
                            rmodel = $KW.rmodel(this);

                            if(rmodel && rmodel._kwebfw_.is.template && !rmodel._kwebfw_.is.cloned) {
                                throw new Error('Cannot set any value of a widget, which is either a raw template or any of its widget.');
                            } else {
                                valid = _valid.Canvas[key].call(this, val);
                                if($KU.is(valid, 'array')) {
                                    val = valid[0]; valid = valid[1];
                                }

                                if(valid === false || ($KU.is(valid, 'string') && valid)) {
                                    message = ('Invalid value passed to property <'+key+'> of widget <'+self._kwebfw_.ns+'>.');

                                    if($KU.is(valid, 'string')) {
                                        message += ('\n' + valid);
                                    }

                                    throw new Error(message);
                                } else {
                                    old = this._kwebfw_.prop[key];
                                    this._kwebfw_.prop[key] = val;

                                    if($KU.is(_setter.Canvas[key], 'function')) {
                                        _setter.Canvas[key].call(this, old);
                                    }

                                    if(_relayoutActiveTriggerer.Canvas().indexOf(key) >= 0) {
                                        $KW.markRelayout(this);
                                    }

                                    if(_relayoutPassiveTriggerer.Canvas().indexOf(key) >= 0) {
                                        final = this._kwebfw_.flex.final;

                                        if(!(final.height && final.width)) {
                                            $KW.markRelayout(this);
                                        }
                                    }

                                    $KW.onPropertyChange(this, key, old);

                                    if($KU.is(value, 'function')) {
                                        el = $KW.el(this);
                                        el.node && value.call(this, el, old);
                                    }
                                }
                            }
                        }
                    }, false);
                });

                if($KU.is(_postInitialization.Canvas, 'function')) {
                    _postInitialization.Canvas.call(this);
                }
            }

            pspconfig = lconfig = bconfig = null; //For GC
        };


        $K.utils.inherits(Canvas, voltmx.ui.BasicWidget);


        /**
         * Builds the view layer for voltmx.ui.Canvas widget.
         *
         * @override
         * @access      protected
         * @method      _render
         * @memberof    voltmx.ui.Canvas
         * @author      Shanker Pulugam <shanker.pulugam@voltmx.com>
         *
         * @returns     {HTMLElement} – Canvas view.
         */
        var canvas__render = function Canvas$_render(tag) {
            var $super = voltmx.ui.Canvas.base.prototype,
                $K = voltmx.$kwebfw$, $KW = $K.widget, $KD = $K.dom,
                _ = this._kwebfw_, view = _.view, canvas = null;

            if(this.isVisible || $K.F.RIVW) {
                if(!view) {
                    canvas = $KD.create('CANVAS', {}, {width:'100%', height:'100%'});
                    view = $super._render.call(this, tag, [canvas]);
                }

                $KW.accessibility(this);
            }

            return view;
        };


        /**
         * This method is used to shapes data to existing shapesData.
         *
         * @access      public
         * @method      addShapes
         * @memberof    voltmx.ui.Canvas
         * @author      Shanker Pulugam <shanker.pulugam@voltmx.com>
         *
         * @param       {array} shapesData - array of shapes data to draw on canvas.
         *
         * @throws      {InvalidArgumentException} - One liner description about this exception.
         *
         * @returns     void.
         *
         * @desc        A brief description about the class.
         */
        var canvas_addShapes = function Canvas$addShapes(shapesData) {
            var $K = voltmx.$kwebfw$, $KW = $K.widget, final = null, $KU = $K.utils,
                addData = [], existingDataObj = _getDataObj(this._kwebfw_.prop.shapesData);

            _valid.Canvas.shapesData.call(this, shapesData);

            $KU.each(shapesData, function(data/* , index */) {
                if(existingDataObj[data.shapeid]) {
                    throw new $KU.error('CanvasError', 'addShapes:: already shapeid exists');
                } else {
                    addData.push(data);
                }
            });
            this._kwebfw_.prop.shapesData = this._kwebfw_.prop.shapesData.concat(addData);
            _drawShapesOnCanvas.call(this);

            if(_relayoutActiveTriggerer.Canvas().indexOf('addShapes') >= 0) {
                $KW.markRelayout(this);
            }

            if(_relayoutPassiveTriggerer.Canvas().indexOf('addShapes') >= 0) {
                final = this._kwebfw_.flex.final;

                if(!(final.height && final.width)) {
                    $KW.markRelayout(this);
                }
            }
        };


        /**
         * This method is used to shapes data to existing shapesData.
         *
         * @access      public
         * @method      clear
         * @memberof    voltmx.ui.Canvas
         * @author      Shanker Pulugam <shanker.pulugam@voltmx.com>
         *
         * @param       No Arguments to this API.
         *
         * @throws      Not applicable.
         *
         * @returns     void.
         *
         * @desc        A brief description about the class.
         */
        var canvas_clear = function Canvas$clear() {
            var $K = voltmx.$kwebfw$, $KW = $K.widget, final = null,
                el = $KW.el(this), ctx = null;

            ctx = el.canvas.getContext('2d');
            this._kwebfw_.prop.shapesData = [];
            _clearRect.call(this, ctx);

            if(_relayoutActiveTriggerer.Canvas().indexOf('clear') >= 0) {
                $KW.markRelayout(this);
            }

            if(_relayoutPassiveTriggerer.Canvas().indexOf('clear') >= 0) {
                final = this._kwebfw_.flex.final;

                if(!(final.height && final.width)) {
                    $KW.markRelayout(this);
                }
            }
        };

        /**
         * This method is used to shapes data to existing shapesData.
         *
         * @access      public
         * @method      removeShapes
         * @memberof    voltmx.ui.Canvas
         * @author      Shanker Pulugam <shanker.pulugam@voltmx.com>
         *
         * @param       {array} shapesData - array of shapes data to draw on canvas.
         *
         * @throws      {InvalidArgumentException} - One liner description about this exception.
         *
         * @returns     void.
         *
         * @desc        A brief description about the class.
         */
        var canvas_removeShapes = function Canvas$removeShapes(shapeIds) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget, final = null,
                isremoved = false;


            $KU.each(shapeIds, function(shapeId/* , index */) {
                var existingIndex = _getIndexFromShapesData.call(this, shapeId);

                if(existingIndex !== -1) {
                    this._kwebfw_.prop.shapesData.splice(existingIndex, 1);
                    isremoved = true;
                }
            }, this);

            isremoved && _drawShapesOnCanvas.call(this);

            if(_relayoutActiveTriggerer.Canvas().indexOf('removeShapes') >= 0) {
                $KW.markRelayout(this);
            }

            if(_relayoutPassiveTriggerer.Canvas().indexOf('removeShapes') >= 0) {
                final = this._kwebfw_.flex.final;

                if(!(final.height && final.width)) {
                    $KW.markRelayout(this);
                }
            }
        };

        /**
         * This method is used to shapes data to existing shapesData.
         *
         * @access      public
         * @method      updateShapes
         * @memberof    voltmx.ui.Canvas
         * @author      Shanker Pulugam <shanker.pulugam@voltmx.com>
         *
         * @param       {array} shapesData - array of shapes data to draw on canvas.
         *
         * @throws      {InvalidArgumentException} - One liner description about this exception.
         *
         * @returns     void.
         *
         * @desc        A brief description about the class.
         */
        var canvas_updateShapes = function Canvas$updateShapes(shapesData) {
            var $K = voltmx.$kwebfw$, $KW = $K.widget, final = null, isupdated = false,
                $KU = $K.utils;


            $KU.each(shapesData, function(shapeData/* , index */) {
                isupdated = _updateShapeData.call(this, shapeData) || isupdated;
            }, this);

            isupdated && _drawShapesOnCanvas.call(this);

            if(_relayoutActiveTriggerer.Canvas().indexOf('updateShapes') >= 0) {
                $KW.markRelayout(this);
            }

            if(_relayoutPassiveTriggerer.Canvas().indexOf('updateShapes') >= 0) {
                final = this._kwebfw_.flex.final;

                if(!(final.height && final.width)) {
                    $KW.markRelayout(this);
                }
            }
        };

        $K.defVoltmxProp(Canvas.prototype, [
            {keey:'_render', value:canvas__render},
            {keey:'addShapes', value:canvas_addShapes},
            {keey:'clear', value:canvas_clear},
            {keey:'removeShapes', value:canvas_removeShapes},
            {keey:'updateShapes', value:canvas_updateShapes}
        ]);

        return Canvas;
    }())});
}());
