(function() {
    var _getInternalHandlers = function $KE_getInternalHandlers(evt) {
        var $K = voltmx.$kwebfw$, $KD = $K.dom, target = null;

        target = $KD.closest(evt.target, function(dom) {
            var $K = voltmx.$kwebfw$, $KD = $K.dom;

            if($KD.hasAttr(dom, ('kwh-'+evt.type))) {
                return true;
            } else if($KD.hasAttr(dom, 'kw')) {
                return false;
            }
        });

        return (target) ? $KD.getAttr(target, ('kwh-'+evt.type)) : '';
    };


    var _getVoltmxEventType = function $KE_getVoltmxEventType(evt) {
        var event = {
            click:       'onClick',
            focusin:     'onFocus',
            focusout:    'onBlur',
            keydown:     'onKeyDown',
            keyup:       'onKeyUp',
            mousedown:   'onTouchStart',
            mousemove:   'onTouchMove',
            mouseout:    'onTouchEnd',
            mouseup:     'onTouchEnd',
            touchend:    'onTouchEnd',
            touchmove:   'onTouchMove',
            touchstart:  'onTouchStart',
            touchcancel: 'onTouchEnd'
        };

        return event[evt.type] || evt.type;
    };


    var _handleKeyBoardClick = function $KE_handleKeyBoardClick(evt, model) {
        var $K = voltmx.$kwebfw$, $KW = $K.widget, $KD = $K.dom, prioritisedSkin = '';

        model.onClick && $KD.preventDefault(evt);
        if(evt.type === 'keydown') {
            _handleSkinEvent.focusModel = model;
            _handleSkinEvent.focusNode = evt.target;

            prioritisedSkin = _handleSkinEvent.getPrioritisedSkinType(model);
            if(prioritisedSkin === 'focusSkin') {
                _handleSkinEvent.setSkinRecursively(model, 'focus');
                _handleSkinEvent.resetSkinRecursively(model, 'active');
                _handleSkinEvent.resetSkinRecursively(model, 'hover');
            }
        } else if(evt.type === 'keyup') {
            _handleSkinEvent.focusModel = null;
            _handleSkinEvent.focusNode = null;

            _handleSkinEvent.resetSkinRecursively(model, 'focus');

            prioritisedSkin = _handleSkinEvent.getPrioritisedSkinType(model);
            if(prioritisedSkin === 'hoverSkin') {
                _handleSkinEvent.setSkinRecursively(model, 'hover');
            } else if(prioritisedSkin === 'activeStateSkin') {
                _handleSkinEvent.setSkinRecursively(model, 'active');
            }

            $KW.fire(model, 'onClick', model);
        }
    };


    var _handleOwnerItemBlur = function $KE_handleOwnerItemBlur(evt, model) {
        var $K = voltmx.$kwebfw$, $KW = $K.widget, $KD = $K.dom,
            omodel = null, item = null, prevItem = null, nextItem = null,
            rmodel = null, prevRmodel = null, nextRmodel = null;

        if($KD.getAttr(evt.target, 'kr') === 'item') {
            model = $KD.first(evt.target);
            model = (model) ? $KW.model(model) : null;
        }

        if(model && model._kwebfw_.view) {
            omodel = $KW.omodel(model);
            rmodel = $KW.rmodel(model);
            item = $KD.closest(model._kwebfw_.view, 'kr', 'item');

            if(omodel && rmodel && item) {
                prevItem = $KD.prev(item);
                nextItem = $KD.next(item);

                $KD.setAttr(item, 'tabindex', -1);
                $KW.iterate(rmodel, function(widget) {
                    var $K = voltmx.$kwebfw$, $KW = $K.widget;

                    $KW.setupUIInteraction(widget, $KW.focusableElement(widget), false);
                }, {tabs:false});

                if(prevItem) {
                    prevRmodel = $KW.model(prevItem);
                    if(!prevRmodel) {
                        prevRmodel = $KW.model($KD.first(prevItem));
                    }

                    $KD.setAttr(prevItem, 'tabindex', -1);
                    $KW.iterate(prevRmodel, function(widget) {
                        var $K = voltmx.$kwebfw$, $KW = $K.widget;

                        $KW.setupUIInteraction(widget, $KW.focusableElement(widget), false);
                    }, {tabs:false});
                }

                if(nextItem) {
                    nextRmodel = $KW.model(nextItem);
                    if(!nextRmodel) {
                        nextRmodel = $KW.model($KD.first(nextItem));
                    }

                    $KD.setAttr(nextItem, 'tabindex', -1);
                    $KW.iterate(nextRmodel, function(widget) {
                        var $K = voltmx.$kwebfw$, $KW = $K.widget;

                        $KW.setupUIInteraction(widget, $KW.focusableElement(widget), false);
                    }, {tabs:false});
                }
            }
        }
    };


    var _handleOwnerItemClick = function $KE_handleOwnerItemClick(evt, model) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, omodel = null,
            $KW = $K.widget, $KD = $K.dom, nonTemplated = false;

        if($KU.is(model, 'widget', 'DataGrid')
        && (['IMG', 'DIV'].indexOf(evt.target.tagName) >= 0)) {
            nonTemplated = true;
        } else if($KD.getAttr(evt.target, 'kr') === 'item') {
            model = $KD.first(evt.target);
            model = (model) ? $KW.model(model) : null;
        }

        if(model && model._kwebfw_.view && $KW.interactable(model)) {
            if(nonTemplated) {
                _setOwnerSelectedIndex[$KW.name(model)].call(model, evt.target);
            } else {
                omodel = $KW.omodel(model);

                if(omodel && $KU.is(_setOwnerSelectedIndex[$KW.name(omodel)], 'function')) {
                    _setOwnerSelectedIndex[$KW.name(omodel)].call(omodel, model);
                }
            }
        }
    };


    var _handleOwnerItemEvents = function $KE_handleOwnerItemEvents(evt, model, code) {
        if(evt.type === 'click'
        || (evt.type === 'keyup' && ([13, 32].indexOf(code) >= 0))) {
            _handleOwnerItemClick(evt, model);
        } else if(evt.type === 'focusin') {
            _handleOwnerItemFocus(evt, model);
        } else if(evt.type === 'focusout') {
            _handleOwnerItemBlur(evt, model);
        }
    };


    var _handleOwnerItemFocus = function $KE_handleOwnerItemFocus(evt, model) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget, $KD = $K.dom,
            omodel = null, tabindex = '', item = null, prevItem = null, nextItem = null,
            rmodel = null, prevRmodel = null, nextRmodel = null, nonTemplated = false;

        if($KU.is(model, 'widget', 'DataGrid')
        && (['IMG', 'DIV'].indexOf(evt.target.tagName) >= 0)) {
            nonTemplated = true;
        } else if($KD.getAttr(evt.target, 'kr') === 'item') {
            model = $KD.first(evt.target);
            model = (model) ? $KW.model(model) : null;
        }

        if(model && model._kwebfw_.view && $KW.interactable(model)) {
            if(nonTemplated) {
                tabindex = $KW.tabIndex(model);

                if($KU.is(tabindex, 'integer') && tabindex >= 0) {
                    $KD.setAttr(evt.target, 'tabindex', tabindex);
                }
            } else {
                omodel = $KW.omodel(model);
                rmodel = $KW.rmodel(model);
                item = $KD.closest(model._kwebfw_.view, 'kr', 'item');

                if(omodel && rmodel && item) {
                    tabindex = $KW.tabIndex(omodel);

                    if($KU.is(tabindex, 'integer') && tabindex >= 0) {
                        prevItem = $KD.prev(item);
                        nextItem = $KD.next(item);

                        $KD.setAttr(item, 'tabindex', tabindex);
                        $KW.iterate(rmodel, function(widget) {
                            var $K = voltmx.$kwebfw$, $KW = $K.widget;

                            $KW.setupUIInteraction(widget, $KW.focusableElement(widget), true);
                        }, {tabs:false});

                        if(prevItem) {
                            prevRmodel = $KW.model(prevItem);
                            if(!prevRmodel) {
                                prevRmodel = $KW.model($KD.first(prevItem));
                            }

                            $KD.setAttr(prevItem, 'tabindex', tabindex);
                            $KW.iterate(prevRmodel, function(widget) {
                                var $K = voltmx.$kwebfw$, $KW = $K.widget;

                                $KW.setupUIInteraction(widget, $KW.focusableElement(widget), true);
                            }, {tabs:false});
                        }

                        if(nextItem) {
                            nextRmodel = $KW.model(nextItem);
                            if(!nextRmodel) {
                                nextRmodel = $KW.model($KD.first(nextItem));
                            }

                            $KD.setAttr(nextItem, 'tabindex', tabindex);
                            $KW.iterate(nextRmodel, function(widget) {
                                var $K = voltmx.$kwebfw$, $KW = $K.widget;

                                $KW.setupUIInteraction(widget, $KW.focusableElement(widget), true);
                            }, {tabs:false});
                        }
                    }
                }
            }
        }
    };


    var _handleSkinEvent = {
        target: null,

        mouseOverModel: null,

        focusModel: null,

        hoverModel: null,

        activeModel: null,

        focusNode: null,

        hoverNode: null,

        activeTargetNode: null,

        dealWithActiveStateSkin: function(evt) {
            var $K = voltmx.$kwebfw$, $KW = $K.widget, $KD = $K.dom, model = null,
                prioritisedSkin = '';


            model = $KD.closest(evt.target, function(node) {
                var $K = voltmx.$kwebfw$, $KD = $K.dom;

                if($KD.hasAttr(node, 'kw') || $KD.hasAttr(node, 'kwf')) {
                    return true;
                }
            });

            if(model) {
                if($KD.hasAttr(model, 'kw')) {
                    model = $KW.model(model);
                } else if($KD.hasAttr(model, 'kwf')) {
                    model = $KW.model($KD.getAttr(model, 'kwf'));
                }

                if(['focusin'].indexOf(evt.type) >= 0) {
                    _handleSkinEvent.activeModel = model;
                    _handleSkinEvent.activeTargetNode = evt.target;

                    prioritisedSkin = _handleSkinEvent.getPrioritisedSkinType(model);

                    if(prioritisedSkin === 'activeStateSkin') {
                        _handleSkinEvent.resetSkinRecursively(model, 'active');
                        _handleSkinEvent.setSkinRecursively(model, 'active');
                    }
                } else if(['focusout'].indexOf(evt.type) >= 0) {
                    _handleSkinEvent.resetSkinRecursively(model, 'active');

                    _handleSkinEvent.activeModel = null;
                    _handleSkinEvent.activeTargetNode = null;
                }
            }
        },

        dealWithCalendarHoverSkin: function(model) {//deal with calendar picker
            var skin = '';

            skin = _handleSkinEvent.getHoverSkinForCalendar(model);// skin to be reset
            _handleSkinEvent.resetSkinForCalendar(model, (skin +'-hover'), 'hover');

            skin = _handleSkinEvent.getHoverSkinForCalendar(model);// skin to be set
            _handleSkinEvent.setSkinForCalendar(model, (skin+'-hover'), 'hover');
        },

        dealWithFocusSkin: function(evt) {
            var $K = voltmx.$kwebfw$, $KW = $K.widget, $KD = $K.dom, model = null, prioritisedSkin = '';
            _handleSkinEvent.target = evt.target;

            model = $KD.closest(evt.target, function(node) {
                var $K = voltmx.$kwebfw$, $KD = $K.dom;

                if($KD.hasAttr(node, 'kw') || $KD.hasAttr(node, 'kwf')) {
                    return true;
                }
            });

            if(model) {
                if($KD.hasAttr(model, 'kw')) {
                    model = $KW.model(model);
                } else if($KD.hasAttr(model, 'kwf')) {
                    model = $KW.model($KD.getAttr(model, 'kwf'));
                }

                if(['mousedown', 'touchstart'].indexOf(evt.type) >= 0) {
                    _handleSkinEvent.focusModel = model;
                    _handleSkinEvent.focusNode = evt.target;

                    _handleSkinEvent.resetSkinRecursively(model, 'active');

                    prioritisedSkin = _handleSkinEvent.getPrioritisedSkinType(model);
                    if(prioritisedSkin === 'focusSkin') {
                        _handleSkinEvent.setSkinRecursively(model, 'focus');
                        _handleSkinEvent.resetSkinRecursively(model, 'hover');
                    } else if(prioritisedSkin === 'activeStateSkin') {
                        _handleSkinEvent.setSkinRecursively(model, 'active'); //to set activeStateSkin on rows of cbg/rbg
                    }
                } else if(['touchend', 'touchcancel', 'mouseup', 'mouseout'].indexOf(evt.type) >= 0) {
                    _handleSkinEvent.focusModel = null;
                    _handleSkinEvent.focusNode = null;

                    _handleSkinEvent.resetSkinRecursively(model, 'focus');

                    prioritisedSkin = _handleSkinEvent.getPrioritisedSkinType(model);
                    if(prioritisedSkin === 'hoverSkin') {
                        _handleSkinEvent.resetSkinRecursively(model, 'active');
                        _handleSkinEvent.setSkinRecursively(model, 'hover');
                    } else if(prioritisedSkin === 'activeStateSkin') {
                        _handleSkinEvent.resetSkinRecursively(model, 'hover');
                        _handleSkinEvent.resetSkinRecursively(model, 'active');
                        _handleSkinEvent.setSkinRecursively(model, 'active');
                    }
                }
            }
        },


        dealWithGroupWidgetHoverSkin: function(model) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget,
                $KD = $K.dom, option = null, hSkin = '', aSkin = '',
                isListBoxWidget = $KU.is(model, 'widget', 'ListBox'),
                commonNode = model._kwebfw_.fSkinNode || model._kwebfw_.hSkinNode;

            if((isListBoxWidget && model.viewType === constants.LISTBOX_VIEW_TYPE_EDITVIEW)
            || ['CheckBoxGroup', 'RadioButtonGroup'].indexOf($KW.name(model)) >= 0) {
                if(isListBoxWidget && model.itemHoverSkin !== '') {
                    hSkin = model.itemHoverSkin+'-hover';
                } else if(model.hoverSkin !== '') {
                    hSkin = model.hoverSkin+'-hover';
                }

                if(model.activeStateSkin !== '') {
                    aSkin = model.activeStateSkin+'-active';
                }

                option = $KD.closest(_handleSkinEvent.target, function(node) {
                    var $K = voltmx.$kwebfw$, $KD = $K.dom;

                    if($KD.getAttr(node, 'kr') === 'option') {
                        return true;
                    } else if($KD.hasAttr(node, 'kw') || $KD.hasAttr(node, 'kwf')) {
                        if(model._kwebfw_.hSkinNode && $KD.hasAttr(node, 'kw')) {
                            _handleSkinEvent.resetSkin(model, hSkin, 'hover');
                        }

                        if((_handleSkinEvent.activeModel === model) && aSkin) {
                            _handleSkinEvent.setSkin(model, aSkin, 'active');
                        }

                        return false;
                    }
                });


                if(hSkin && option && model._kwebfw_.hSkinNode !== option) {
                    _handleSkinEvent.resetSkin(model, hSkin, 'hover');

                    commonNode = model._kwebfw_.fSkinNode || model._kwebfw_.hSkinNode;

                    if((_handleSkinEvent.activeModel === model)
                    && (_handleSkinEvent.activeTargetNode !== commonNode)) {
                        _handleSkinEvent.setSkin(model, aSkin, 'active');
                    }
                }

                if(hSkin && (isListBoxWidget || (option && commonNode !== option))) {
                    _handleSkinEvent.setSkin(model, hSkin, 'hover');

                    if((_handleSkinEvent.activeTargetNode === model._kwebfw_.hSkinNode) || isListBoxWidget) {
                        _handleSkinEvent.resetSkin(model, aSkin, 'active');
                    }
                }
            }
        },

        dealWithHoverSkin: function(evt) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget, $KD = $K.dom,
                model = null, relatedModel = null, commonModel = null, target = null,
                prioritisedSkin = '';

            _handleSkinEvent.target = evt.target;
            _handleSkinEvent.hoverNode = evt.target;

            model = $KD.closest(evt.target, function(node) {
                var $K = voltmx.$kwebfw$, $KD = $K.dom;

                if($KD.hasAttr(node, 'kw') || $KD.hasAttr(node, 'kwf')) {
                    return true;
                }
            });

            if(model) {
                target = model;

                if($KD.hasAttr(model, 'kw')) {
                    model = $KW.model(model);
                } else if($KD.hasAttr(model, 'kwf')) {
                    model = $KW.model($KD.getAttr(model, 'kwf'));
                }

                _handleSkinEvent.hoverModel = model;
                relatedModel = _handleSkinEvent.mouseOverModel;

                if(model !== relatedModel) {
                    commonModel = _handleSkinEvent.getLCA(model, relatedModel);
                    _handleSkinEvent.executeHoverEvent(
                        model, constants.ONHOVER_MOUSE_ENTER, evt, commonModel
                    );

                    if(relatedModel) {
                        _handleSkinEvent.executeHoverEvent(
                            relatedModel, constants.ONHOVER_MOUSE_LEAVE, evt, commonModel
                        );
                    }

                    _handleSkinEvent.executeHoverEvent(
                        commonModel, constants.ONHOVER_MOUSE_MOVE, evt
                    );
                } else {
                    _handleSkinEvent.executeHoverEvent(
                        model, constants.ONHOVER_MOUSE_MOVE, evt
                    );
                }

                if(relatedModel === model) {
                    if(model instanceof voltmx.ui.GroupWidget) {
                        _handleSkinEvent.dealWithGroupWidgetHoverSkin(model);
                    } else if($KU.is(model, 'widget', 'Calendar') && model._kwebfw_.picker === target) {
                        _handleSkinEvent.dealWithCalendarHoverSkin(model);
                    } else if($KU.is(model, 'widget', 'DataGrid')) {
                        _handleSkinEvent.resetSkinRecursively(model, 'hover');
                        _handleSkinEvent.setSkinRecursively(model, 'hover');
                    }
                } else {
                    if(relatedModel) {
                        if($KU.is(relatedModel, 'widget', 'Calendar') && relatedModel._kwebfw_.hSkinNode) {
                            _handleSkinEvent.dealWithCalendarHoverSkin(relatedModel);//handle for picker
                        } else {
                            if(_handleSkinEvent.activeModel === relatedModel) {
                                _handleSkinEvent.setSkinRecursively(relatedModel, 'active');
                            }

                            _handleSkinEvent.resetSkinRecursively(
                                relatedModel, 'hover', commonModel
                            );
                        }
                    }

                    if(($KU.is(model, 'widget', 'Calendar') && model._kwebfw_.picker === target)) {
                        _handleSkinEvent.dealWithCalendarHoverSkin(model);//handle for picker
                    } else {
                        prioritisedSkin = _handleSkinEvent.getPrioritisedSkinType(model);
                        if(prioritisedSkin === 'hoverSkin') {
                            _handleSkinEvent.setSkinRecursively(model, 'hover', commonModel);
                            _handleSkinEvent.resetSkinRecursively(model, 'active');
                        }
                    }
                }

                _handleSkinEvent.mouseOverModel = model;
            }
        },

        dealWithSkinStateConfig: function(model, el, type, action) {
            var _ = model._kwebfw_,
                props = {
                    hover: 'hoverStateSkinProperties',
                    focus: 'focusStateSkinProperties'
                };

            if(model[props[type]]) {
                if(action === 'set') {
                    _.skinStateObj[type] = el.style.cssText;
                    _handleSkinEvent.setSkinConfig(el, model[props[type]], _.skinStateObj[type], model);
                } else if(action === 'reset') {
                    el.style.cssText = _.skinStateObj[type];
                    _.skinStateObj[type] = {};
                }
            }
        },

        executeHoverEvent: function(model, type, evt, commonModel) {
            var $K = voltmx.$kwebfw$, $KW = $K.widget;

            if(model && model._kwebfw_.view) {
                $KW.closest(model, function(widget) {
                    var $K = voltmx.$kwebfw$, $KW = $K.widget, $KD = $K.dom, payload, touch;

                    if(!$KW.interactable(widget)) {
                        return false;
                    } else if(commonModel && commonModel === widget) {
                        return false;
                    }
                    if(!payload) payload = {};

                    payload.eventType = type;
                    payload.pageX = evt.pageX || evt.clientX;
                    payload.pageY = evt.pageY || evt.clientY;
                    touch = $KD.point(model._kwebfw_.view);
                    payload.pageX = (payload.pageX - touch.x);
                    payload.pageY = (payload.pageY - touch.y);

                    payload.screenX = evt.clientX || null;
                    payload.screenY = evt.clientY || null;

                    $KW.fire(widget, 'onHover', widget, payload);
                }, {owner:true, tabs:true});
            }
        },

        getHoverSkinForCalendar: function(model) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils, $KD = $K.dom,
                _ = model._kwebfw_, prop = _.prop, el = '', kr = '',
                viewConfig = prop.viewConfig ? prop.viewConfig.gridConfig : null, skin = '',
                cellHoverSkin = viewConfig ? viewConfig.gridCellHoverSkin : null,
                monthYearHoverSkin = viewConfig ? viewConfig.gridMonthYearHoverSkin : null;

            if(model._kwebfw_.hSkinNode) {
                el = model._kwebfw_.hSkinNode;
            } else {
                el = $KD.parent(_handleSkinEvent.target);
            }

            kr = $KD.getAttr(el, 'kr');

            if(kr === 'date' && $KD.getAttr(el, 'cellskintype') !== 'gridCellInactiveDaysSkin') {
                if($KU.is(cellHoverSkin, 'string')) {
                    skin = cellHoverSkin;
                } else {
                    skin = '-voltmx-calendar-cell';
                }
            } else if(kr === 'month' || kr === 'year') {
                if($KU.is(monthYearHoverSkin, 'string')) {
                    skin = monthYearHoverSkin;
                } else {
                    skin = '-voltmx-calendar-cell';
                }
            } else if($KD.getAttr(el, 'kw') === 'Calendar') {
                skin = prop.hoverSkin;
            }

            return skin;
        },

        getLCA: function(toModel, fromModel) {
            var $K = voltmx.$kwebfw$, $KW = $K.widget, $KA = $K.app, i = 0,
                toPath = [], fromPath = [], LCA = $KW.model($KA.currentFormUID);

            $KW.closest(fromModel, function(widget) {
                fromPath.splice(0, 0, widget);
            }, {owner:true, tabs:true});

            $KW.closest(toModel, function(widget) {
                toPath.splice(0, 0, widget);
            }, {owner:true, tabs:true});

            for(i = 0; i < fromPath.length && i < toPath.length; i++) {
                if(fromPath[i] !== toPath[i]) {
                    break;
                }
                LCA = fromPath[i];
            }

            return LCA;
        },

        getPrioritisedSkinType: function(model) {
            var $K = voltmx.$kwebfw$, $KW = $K.widget, skinType = '',
                aSkin = model.activeStateSkin, fSkin = model.focusSkin, hSkin = model.hoverSkin,
                aModel = _handleSkinEvent.activeModel, fModel = _handleSkinEvent.focusModel,
                hModel = _handleSkinEvent.hoverModel, currModel = model, pModel = null,
                aNode = null, fNode = null, hNode = null, currNode = null, nodes = null;
			
			if (model) {
				const kwebfw = model._kwebfw_;			
				if (kwebfw.oid && kwebfw.ii && kwebfw.is && kwebfw.is.cloned) {
					pModel = $KW.model(kwebfw.oid);
				} else if (kwebfw.rid && kwebfw.tpid) {
					pModel = $KW.model(kwebfw.tpid).parent;
				} else {
					pModel = model.parent;
				}
			}

			if(pModel && fSkin === '' ) {
				fSkin = $KU.is(pModel, 'widget', 'SegmentedUI2') ? pModel.rowFocusSkin :
								$KU.is(pModel, 'widget', 'FlexContainer') ? pModel.focusSkin : 
								'';
			}		
			
            if(['CheckBoxGroup', 'RadioButtonGroup'].indexOf($KW.name(model)) >= 0) {
                nodes = _handleSkinEvent.getTargetNodes(model);
                fNode = nodes.fNode;
                hNode = nodes.hNode;
                aNode = nodes.aNode;
                currNode = _handleSkinEvent.activeTargetNode = aNode;

                if(fSkin && fNode && (currNode === fNode)) {
                    skinType = 'focusSkin';
                } else if(hSkin && hNode && (currNode === hNode)) {
                    skinType = 'hoverSkin';
                } else if(aSkin && aNode && (currNode === aNode)) {
                    skinType = 'activeStateSkin';
                }
            } else {
                if(fSkin && fModel && (currModel === fModel)) {
                    skinType = 'focusSkin';
                } else if(hSkin && hModel && (currModel === hModel)) {
                    skinType = 'hoverSkin';
                } else if(aSkin && aModel && (currModel === aModel)) {
                    skinType = 'activeStateSkin';
                }
            }

            return skinType;
        },

        getSkinValueByType: function(model, closestModel, type) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils, skin = '';

            if(type === 'active') {
                skin = closestModel.activeStateSkin;
            } else {
                skin = closestModel[(type + 'Skin')];
            }

            if($KU.is(closestModel, 'widget', 'SegmentedUI2')) {
                if(type === 'focus') {
                    skin = closestModel.rowFocusSkin;
                }
            } else if($KU.is(model, 'widget', 'ListBox')) {
                if(closestModel.itemHoverSkin !== ''
                    && model.viewType === constants.LISTBOX_VIEW_TYPE_EDITVIEW) {
                    skin = closestModel.itemHoverSkin;
                }
            } else if($KU.is(closestModel, 'widget', 'TabPane')) {
                skin = closestModel.activeFocusSkin;
            }

            return skin;
        },

        getTargetNodes: function(model) {
            var $K = voltmx.$kwebfw$, $KD = $K.dom, $KW = $K.widget,
                fNode = _handleSkinEvent.focusNode, hNode = _handleSkinEvent.hoverNode,
                aNode = _handleSkinEvent.activeTargetNode,
                nodes = {
                    fNode: fNode,
                    hNode: hNode,
                    aNode: aNode
                };

            if(['CheckBoxGroup', 'RadioButtonGroup'].indexOf($KW.name(model)) >= 0) {
                aNode = fNode ? fNode : aNode;
                fNode = fNode && $KD.hasAttr(fNode, 'kw') ? null : fNode;
                hNode = hNode && $KD.hasAttr(hNode, 'kw') ? null : hNode;

                if(aNode && !$KD.hasAttr(aNode, 'kw')
                && ($KD.getAttr(aNode, 'kr') !== 'option')) {
                    aNode = $KD.parent(aNode);
                    fNode = model._kwebfw_.fSkinNode ? model._kwebfw_.fSkinNode : null;
                    hNode = model._kwebfw_.hSkinNode ? model._kwebfw_.hSkinNode : null;
                }

                nodes.fNode = fNode;
                nodes.hNode = hNode;
                nodes.aNode = aNode;
            }

            return nodes;
        },

        isUpperBoundModel: function(widget, upperBoundModel) {
            var flag = false;

            if(upperBoundModel && upperBoundModel._kwebfw_.uid === widget._kwebfw_.uid) {
                flag = true;
            }

            return flag;
        },

        resetSkin: function(model, skin, type) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils,
                $KD = $K.dom, el = model._kwebfw_.view;

            if(el) {
                if($KU.is(model, 'widget', 'SegmentedUI2')) {
                    if(type === 'focus') {
                        el = $KD.closest(_handleSkinEvent.target, 'kr', 'item');
                    } else if(type === 'active') {
                        el = _handleSkinEvent.activeTargetNode;
                    }
                } else if($KU.is(model, 'widget', 'RadioButtonGroup')
                || $KU.is(model, 'widget', 'CheckBoxGroup')
                || ($KU.is(model, 'widget', 'ListBox')
                && model.viewType === constants.LISTBOX_VIEW_TYPE_EDITVIEW)) {
                    if($KU.is(model, 'widget', 'ListBox')) {
                        if(type === 'hover' && model.hoverSkin) {
                            $KD.removeCls(el, model.hoverSkin + '-hover');
                        } else if(type === 'focus' && model.focusSkin) {
                            $KD.removeCls(el, model.focusSkin + '-focus');
                        } else if(type === 'active' && model.activeStateSkin) {
                            $KD.removeCls(el, model.activeStateSkin + '-active');
                        }
                    }

                    if(type === 'hover' && model._kwebfw_.hSkinNode) {
                        el = model._kwebfw_.hSkinNode;
                        model._kwebfw_.hSkinNode = null;
                    } else if(type === 'focus' && model._kwebfw_.fSkinNode) {
                        el = model._kwebfw_.fSkinNode;
                        model._kwebfw_.fSkinNode = null;
                    } else if((type === 'active') && model._kwebfw_.aSkinNode) {
                        el = model._kwebfw_.aSkinNode;
                        model._kwebfw_.aSkinNode = null;
                    } else {
                        return;
                    }
                } else if($KU.is(model, 'widget', 'TabPane')) {
                    if(type === 'focus') {
                        el = _handleSkinEvent.target;
                        if(($KD.hasAttr(el, 'kw')) || ($KD.hasAttr(el, 'kr'))) {
                            return;
                        }
                        //To handle the div inside li in case of tab pane (li -> div -> label(tab name))
                        //get the closest el that contains tabid
                        el = $KD.closest(el, 'tabid');
                    } else {
                        return;
                    }
                } else if($KU.is(model, 'widget', 'DataGrid')) {
                    if(type === 'hover' && model._kwebfw_.hSkinNode) {
                        el = $KD.closest(_handleSkinEvent.target, 'kr', 'row');
                        if(el !== model._kwebfw_.hSkinNode) {
                            el = model._kwebfw_.hSkinNode;
                        } else {
                            return;
                        }
                    } else if(type === 'active') {
                        el = _handleSkinEvent.activeTargetNode;
                    }
                } else if(['Image2', 'Video', 'Slider', 'Switch'].indexOf($KW.name(model)) >= 0) {
                    if(type === 'active') {
                        el = _handleSkinEvent.activeTargetNode;
                    }
                }

                _handleSkinEvent.dealWithSkinStateConfig(model, el, type, 'reset');
                el && $KD.removeCls(el, skin);
            }
        },

        resetSkinRecursively: function(model, type, upperBoundModel) {
            var $K = voltmx.$kwebfw$, $KW = $K.widget;

            $KW.closest(model, function(closestModel) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, skin = '';

                if(!_handleSkinEvent.shouldPropagateSkin(closestModel, type)
                || _handleSkinEvent.isUpperBoundModel(closestModel, upperBoundModel)) {
                    return false;
                }
                skin = _handleSkinEvent.getSkinValueByType(model, closestModel, type);
                if(($KU.is(skin, 'string') && skin) || closestModel[type+'StateSkinProperties']) {
                    _handleSkinEvent.resetSkin(closestModel, (skin+'-'+type), type);
                }
            }, {owner:true, tabs:true});
        },

        setSkin: function(model, skin, type) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils,
                $KD = $K.dom, el = model._kwebfw_.view, disabled = false,
                disabledkeys= model._kwebfw_.prop.disabledKeys;

            if(el) {
                if($KU.is(model, 'widget', 'SegmentedUI2')) {
                    if(type === 'focus') {
                        el = $KD.closest(_handleSkinEvent.target, 'kr', 'item');
                    } else if(type === 'active') {
                        el = _handleSkinEvent.activeTargetNode;
                    }
                } else if($KU.is(model, 'widget', 'RadioButtonGroup')
                || $KU.is(model, 'widget', 'CheckBoxGroup')
                || ($KU.is(model, 'widget', 'ListBox')
                && model.viewType === constants.LISTBOX_VIEW_TYPE_EDITVIEW)) {
                    if($KU.is(model, 'widget', 'ListBox')) {
                        if(type === 'hover' && model.hoverSkin) {
                            $KD.addCls(el, model.hoverSkin + '-hover');
                        } else if(type === 'focus' && model.focusSkin) {
                            $KD.addCls(el, model.focusSkin + '-focus');
                            return;
                        } else if(type === 'active' && model.activeStateSkin) {
                            $KD.addCls(el, model.activeStateSkin + '-active');
                            return;
                        }
                    }

                    if(type === 'active') {
                        el = _handleSkinEvent.activeTargetNode;
                    } else {
                        el = _handleSkinEvent.target;
                    }

                    if($KU.is(model, 'widget', 'ListBox') && type === 'hover'
                    && $KD.getAttr(el, 'kr') === 'option') {// prevent hover on disabled option
                        if(disabledkeys && disabledkeys.indexOf(el.getAttribute('value')) !== -1) {
                            disabled = true;
                        }
                    }
                    if(type !== 'active') {
                        if($KD.hasAttr(el, 'kw') || $KD.hasAttr(el, 'kwf') || disabled) {
                            return;
                        }
                    }

                    while(!$KD.getAttr(el, 'kr') === 'option') {
                        el = $KD.parent(el);
                    }

                    if(type === 'hover') {
                        model._kwebfw_.hSkinNode = el;
                    } else if(type === 'focus') {
                        model._kwebfw_.fSkinNode = el;
                    } else {
                        model._kwebfw_.aSkinNode = el;
                    }
                } else if($KU.is(model, 'widget', 'TabPane')) {
                    if(type === 'focus') {
                        el = _handleSkinEvent.target;

                        if(($KD.hasAttr(el, 'kw')) || ($KD.hasAttr(el, 'kr'))) {
                            return;
                        }

                        el = $KD.closest(el, 'tabid');
                        $KD.removeCls(el, model.inactiveSkin);
                    } else {
                        return;
                    }
                } else if($KU.is(model, 'widget', 'Calendar')) {
                    if(type === 'focus') {
                        if(model._kwebfw_.picker && $KD.contains(model._kwebfw_.picker, _handleSkinEvent.target)) {
                            return;
                        }
                    }
                } else if($KU.is(model, 'widget', 'DataGrid')) {
                    if(type === 'hover') {
                        el = $KD.closest(_handleSkinEvent.target, 'kr', 'row');

                        if(el) {
                            model._kwebfw_.hSkinNode = el;
                        } else {
                            return;
                        }
                    } else if(type === 'active') {
                        el = _handleSkinEvent.activeTargetNode;
                    }
                } else if(['Image2', 'Video', 'Slider', 'Switch'].indexOf($KW.name(model)) >= 0) {
                    if(type === 'active') {
                        el = _handleSkinEvent.activeTargetNode;
                    }
                }

                _handleSkinEvent.dealWithSkinStateConfig(model, el, type, 'set');
                el && $KD.addCls(el, skin);
            }
        },

        setSkinConfig: function(el, skinObj, stateObj, model) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils,
                $KW = $K.widget, _handlers = $KW.skinHandlers();

            $KU.each(skinObj, function(value, keey) {
                _handlers[keey] && _handlers[keey]({el: el, config: value, model: model});
            });
        },

        setSkinForCalendar: function(model, skin, type) {
            var $K = voltmx.$kwebfw$, $KD = $K.dom,
                el = '', kr = '', prop = model._kwebfw_.prop,
                viewConfig = prop.viewConfig ? prop.viewConfig.gridConfig : null,
                selectedSkin = '-voltmx-calendar-cell-selected';

            if(type === 'hover') {
                el = $KD.parent(_handleSkinEvent.target);
                kr = $KD.getAttr(el, 'kr');
                if(kr === 'month' || kr === 'year' || kr === 'date') {
                    model._kwebfw_.hSkinNode = el;
                    if($KD.getAttr(el, 'aria-selected')) {
                        if(viewConfig) {
                            if((kr === 'month' || kr === 'year') && viewConfig.gridMonthYearSelectedSkin) {
                                selectedSkin = viewConfig.gridMonthYearSelectedSkin;
                            } else if(kr === 'date' && viewConfig.gridCellSelectedSkin) {
                                selectedSkin = viewConfig.gridCellSelectedSkin;
                            }
                        }
                        $KD.removeCls(el, selectedSkin);
                    }
                } else {
                    return;
                }
                el && $KD.addCls(el, skin);
            }
        },

        resetSkinForCalendar: function(model, skin, type) {
            var $K = voltmx.$kwebfw$, $KD = $K.dom,
                el = '', kr = '', prop = model._kwebfw_.prop,
                viewConfig = prop.viewConfig ? prop.viewConfig.gridConfig : null,
                selectedSkin = '-voltmx-calendar-cell-selected';

            if(type === 'hover' && model._kwebfw_.hSkinNode) {
                el = model._kwebfw_.hSkinNode;
                kr = $KD.getAttr(el, 'kr');
                model._kwebfw_.hSkinNode = null;
                if($KD.getAttr(el, 'aria-selected')) {
                    if(viewConfig) {
                        if(viewConfig.gridMonthYearSelectedSkin && (kr === 'month' || kr === 'year')) {
                            selectedSkin = viewConfig.gridMonthYearSelectedSkin;
                        } else if(kr === 'date' && viewConfig.gridCellSelectedSkin) {
                            selectedSkin = viewConfig.gridCellSelectedSkin;
                        }
                    }
                    /*[MADPSPA-2860] In Calendar 2 months and 2 Years is getting focused at a time.
                    Previously applied classes removed and added selected skin.Please refer git commit description for detailed flow.*/
                    $KD.setAttr(el, 'class', selectedSkin);
                } else {
                    el && $KD.removeCls(el, skin);
                }
            }
        },

        setSkinRecursively: function(model, type, upperBoundModel) {
            var $K = voltmx.$kwebfw$, $KW = $K.widget;

            $KW.closest(model, function(closestModel) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, skin = '';

                if(!_handleSkinEvent.shouldPropagateSkin(closestModel, type)
                || _handleSkinEvent.isUpperBoundModel(closestModel, upperBoundModel)) {
                    return false;
                }
                skin = _handleSkinEvent.getSkinValueByType(model, closestModel, type);

                if(($KU.is(skin, 'string') && skin)
                    || closestModel[type+'StateSkinProperties']) {
                    _handleSkinEvent.setSkin(closestModel, (skin+'-'+type), type);
                }
            }, {owner:true, tabs:true});
        },

        //type can be focus|hover|active
        shouldPropagateSkin: function(model/*, type*/) {
            var $K = voltmx.$kwebfw$, $KW = $K.widget, flag = true;

            if(!$KW.interactable(model)) {
                flag = false;
            }

            return flag;
        }
    };


    var _handleSystemEvent = {
        blur: function $KE_handleSystemEvent_blur(/*evt*/) {
            var $K = voltmx.$kwebfw$, $KW = $K.widget, $KA = $K.app,
                cf = $KW.model($KA.currentFormUID);

            $K.apm.send(cf, 'AppTransition', {status: 'Background'});
            $K.apm.send(cf, 'FormExit');
        },

        error: function $KE_handleSystemEvent_error(evt) {
            var $K = voltmx.$kwebfw$, errInfo = {};

            if(evt.errorcode) {
                errInfo.exceptioncode = evt.errorcode;

                if(evt.name) errInfo.exceptionmsg = evt.name;
                if(evt.stack) errInfo.exceptionstacktrace = evt.stack;
                if(evt.fileName) errInfo.exceptionfile = evt.fileName;
                if(evt.lineNumber) errInfo.exceptionline = evt.lineNumber;
                if(evt.message) errInfo.exceptioncustommsg = evt.message;

                $K.apm.send(errInfo.exceptioncode, 'Exception', errInfo);
            } else {
                errInfo.errcode = '';

                if(evt.name) errInfo.errmsg = evt.name;
                if(evt.stack) errInfo.errstacktrace = evt.stack;
                if(evt.fileName) errInfo.errfile = evt.fileName;
                if(evt.lineNumber) errInfo.errline = evt.lineNumber;
                if(evt.message) errInfo.errcustommsg = evt.message;

                $K.apm.send(errInfo.errcode, 'Error', errInfo);
            }
        },

        focus: function $KE_handleSystemEvent_focus(/*evt*/) {
            var $K = voltmx.$kwebfw$, $KW = $K.widget, $KA = $K.app,
                cf = $KW.model($KA.currentFormUID);

            $K.apm.send(cf, 'AppTransition', {status: 'Foreground'});
            $K.apm.send(cf, 'FormEntry');
        },

        hashchange: function $KE_handleSystemEvent_hashchange(/*evt*/) {
            var $K = voltmx.$kwebfw$, $KW = $K.widget, $KA = $K.app,
                hash = location.hash, isFormAlreadyNavigated = null,
                cf = $KW.model($KA.currentFormUID), cfhash = null,
                _getHashString = function(fmodel) {
                    var _hash;
                    if($K.behavior.isCompositeApp) {
                        _hash = '#/'+fmodel.appName+'/'+fmodel.id;
                    } else {
                        _hash = '#_' + fmodel.id;
                    }
                    return _hash;
                },
                _splitHashString = function(hashStr) {
                    return hashStr.split('/');
                },
                formid = null, appName = null;

            $KA.lastInteractionAt = new Date();
            $KW.registerForIdleTimeout();

            cfhash = _getHashString(cf);

            if(hash !== cfhash) {
                hash = hash.substr(2, hash.length);
                isFormAlreadyNavigated = $KW.rootOfForm(hash);

                if(!isFormAlreadyNavigated) {
                    location.hash = cfhash;
                } else {
                    if($KA.blocked || $KW.fire(cf, 'onDeviceBack', cf)) {
                        location.hash = cfhash;
                    } else {
                        hash = _splitHashString(hash);

                        if(window[hash[0]]) {
                            window[hash[0]].show();
                        } else {
                            formid = isFormAlreadyNavigated.id;
                            appName = isFormAlreadyNavigated.appName;
                            _voltmx.mvc.navigate(formid, appName);
                        }
                    }
                }
            }
        },

        orientationchange: function $KE_handleSystemEvent_orientationchange(evt) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget, $KA = $K.app,
                cf = $KW.model($KA.currentFormUID), orientation = '', from = '';

            $KA.lastInteractionAt = new Date();
            $KW.registerForIdleTimeout();

            $K.ui.Form2.onOrientation.call(cf, evt);

            orientation = $KU.browser('orientation');

            if(orientation === 'portrait') {
                from = 'LANDSCAPE_TO_PORTRAIT';
            } else if(orientation === 'landscape') {
                from = 'PORTRAIT_TO_LANDSCAPE';
            }

            $K.apm.send(cf, 'Orientation', {from:from});
        },

        resize: function $KE_handleSystemEvent_resize(evt) {
            var $K = voltmx.$kwebfw$, $KW = $K.widget, $KA = $K.app,
                cf = $KW.model($KA.currentFormUID);

            $KA.lastInteractionAt = new Date();
            $KW.registerForIdleTimeout();
            $K.ui.Form2.onResize.call(cf, evt);
        }
    };


    var _registerEvents = function $KE_registerEvents(ele) {
        var $K = voltmx.$kwebfw$, $KD = $K.dom;

        if(!ele) {
            ele = $KD.body();
        }

        _registerSystemEvents();
        _registerNormalEvents(ele);
        _registerTouchEvents(ele);
        _registerSkinEvents(ele);
    };


    var _registerFocusSkinEvent = function $KE_registerFocusSkinEvent(body) {
        var $K = voltmx.$kwebfw$, $KD = $K.dom, touchStartFired = false;

        $KD.on(body, ['mousedown', 'touchstart'], 'fskin', function(evt) {
            var $K = voltmx.$kwebfw$, $KW = $K.widget, $KD = $K.dom,
                $KA = $K.app, model = null, endEvent = '';

            if(evt.type === 'touchstart') touchStartFired = true;

            if(touchStartFired && evt.type === 'mousedown') {
                touchStartFired = false;
            } else {
                if(evt.type === 'touchstart') {
                    endEvent = ['touchend', 'touchcancel'];
                } else {
                    endEvent = ['mouseup', 'mouseout'];
                }

                //console.error(evt.type+' :: '+touchStartFired); //Don't delete this line
                model = $KW.getModelByNode(evt.target);
                $KA.lastInteractionAt = new Date();
                $KW.registerForIdleTimeout();

                if(model) { //Here evt.type === 'mousedown/touchstart'
                    $KD.on(body, endEvent, 'fskin', function(evt) {
                        var $K = voltmx.$kwebfw$, $KW = $K.widget, $KD = $K.dom, model = null;

                        //console.error(evt.type+' :: '+touchStartFired); //Don't delete this line
                        $KD.off(body, endEvent, 'fskin');
                        model = $KW.getModelByNode(evt.target);

                        if(model) { //Here evt.type === 'mouseup/mouseout/touchend/touchcancel'
                            if(!$KW.interactable(model)) {
                                $KD.preventDefault(evt);
                            } else {
                                _handleSkinEvent.dealWithFocusSkin(evt);
                            }
                        }
                    }, {passive:false});

                    if(!$KW.interactable(model)) {
                        $KD.preventDefault(evt);
                    } else {
                        _handleSkinEvent.dealWithFocusSkin(evt);
                    }
                }
            }
        }, {passive:false});
    };


    var _registerHoverSkinEvent = function $KE_registerHoverSkinEvent(body) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KD = $K.dom;
        $KD.on(
            body, 'mousemove', 'hskin',
            $KU.debounce(_handleSkinEvent.dealWithHoverSkin, 17),
            {passive:false}
        );
    };


    var _registerNormalEvents = function $KE_registerNormalEvents(body) {
        var $K = voltmx.$kwebfw$, $KD = $K.dom, events = [
            'click',
            'dblclick',
            'focusin', //This will map to "focus"
            'focusout', //This will map to "blur"
            'input', //Needed for character restriction, without any flickering
            'keyup',
            'keydown',
            'change'
        ];

        $KD.on(body, events, 'wnevent', function(evt) {
            var $K = voltmx.$kwebfw$, $KW = $K.widget, $KA = $K.app, propagate = true,
                model = $KW.getModelByNode(evt.target), internalHandlers = '',
                $KAR = $K.automation.recorder, code = evt.keyCode || evt.which,
                widgets = ['Button', 'RichText', 'FlexContainer', 'FlexScrollContainer'];

            $KA.lastInteractionAt = new Date();
            $KW.registerForIdleTimeout();
            $KAR && $KAR.normalEventRecording(evt);

            if(model) {
                _handleOwnerItemEvents(evt, model, code);

                if(!$KW.interactable(model)) {
                    $KD.preventDefault(evt);
                } else {
                    if((evt.type === 'focusin') || (evt.type === 'focusout')) {
                        _handleSkinEvent.dealWithActiveStateSkin(evt);
                    } else if([13, 32].indexOf(code) >= 0 //Enter or Space
                    && ['keydown', 'keyup'].indexOf(evt.type) >= 0
                    && widgets.indexOf($KW.name(model)) >= 0) {
                        _handleKeyBoardClick(evt, model);
                    }

                    internalHandlers = _getInternalHandlers(evt);

                    if(internalHandlers) {
                        propagate = _widgetInternalEventCallback(internalHandlers, evt, model);
                    }

                    propagate && _widgetEventCallback(evt, model);
                }
            }
        }, {passive:false});
    };


    var _registerSkinEvents = function $KE_registerSkinEvents(body) {
        _registerFocusSkinEvent(body);
        _registerHoverSkinEvent(body);
    };


    var _registerSystemEvents = function $KE_registerSystemEvents() {
        var $K = voltmx.$kwebfw$, $KD = $K.dom, $KU = $K.utils, events = [
                'blur',
                'error',
                'focus',
                'hashchange',
                'orientationchange',
                'resize'
            ], eventsExcluded = ['resize'], i;

        if($KU.loadedFromOtherFramework()) {
            for(i = 0; i < eventsExcluded.length; i++) {
                if(events.indexOf(eventsExcluded[i]) !== -1) {
                    events.splice(events.indexOf(events.indexOf(eventsExcluded[i])), 1);
                }
            }
        }

        $KD.on(window, events, 'sysevent', function(evt) {
            _handleSystemEvent[evt.type](evt);
        });
    };


    var _registerTouchEvents = function $KE_registerTouchEvents(body) {
        var $K = voltmx.$kwebfw$, $KD = $K.dom, propagate = true,
            touchStartFired = false, internalHandlers = '';

        $KD.on(body, ['mousedown', 'touchstart'], 'wtevent', function(evt) {
            var $K = voltmx.$kwebfw$, $KW = $K.widget, $KD = $K.dom,
                $KA = $K.app, $KAR = $K.automation.recorder,
                model = null, moveEvent = '', endEvent = '';

            if(evt.type === 'touchstart') touchStartFired = true;

            if(touchStartFired && evt.type === 'mousedown') {
                touchStartFired = false;
            } else {
                if(evt.type === 'touchstart') {
                    moveEvent = 'touchmove';

                    endEvent = 'touchend touchcancel';
                } else {
                    moveEvent = 'mousemove';
                    endEvent = 'mouseup mouseout';
                }

                //console.error(evt.type+' :: '+touchStartFired); //Don't delete this line
                model = $KW.getModelByNode(evt.target);
                $KA.lastInteractionAt = new Date();
                $KW.registerForIdleTimeout();
                $KAR && $KAR.touchEventRecording(evt);

                if(model) { //Here evt.type === 'mousedown/touchstart'
                    $KD.on(body, moveEvent, 'wtevent', function(evt) {
                        var $K = voltmx.$kwebfw$, $KW = $K.widget,
                            $KD = $K.dom, $KAR = $K.automation.recorder,
                            model = $KW.getModelByNode(evt.target);

                        $KAR && $KAR.touchEventRecording(evt);

                        if(model) { //Here evt.type === 'mousemove/touchmove'
                            if(!$KW.interactable(model)) {
                                $KD.preventDefault(evt);
                            } else {
                                internalHandlers = _getInternalHandlers(evt);

                                if(internalHandlers) {
                                    propagate = _widgetInternalEventCallback(internalHandlers, evt, model);
                                }

                                propagate && _widgetEventCallback(evt, model);
                            }
                        }
                    }, {passive:false});

                    $KD.on(body, endEvent, 'wtevent', function(evt) {
                        var $K = voltmx.$kwebfw$, $KW = $K.widget, $KD = $K.dom,
                            $KAR = $K.automation.recorder, model = null;

                        //console.error(evt.type+' :: '+touchStartFired); //Don't delete this line
                        propagate = true; //Reinitialize
                        $KD.off(body, moveEvent, 'wtevent');
                        $KD.off(body, endEvent, 'wtevent');
                        model = $KW.getModelByNode(evt.target);
                        $KAR && $KAR.touchEventRecording(evt);

                        if(model) { //Here evt.type === 'mouseup/mouseout/touchend/touchcancel'
                            if(!$KW.interactable(model)) {
                                $KD.preventDefault(evt);
                            } else {
                                internalHandlers = _getInternalHandlers(evt);

                                if(internalHandlers) {
                                    propagate = _widgetInternalEventCallback(internalHandlers, evt, model);
                                }

                                propagate && _widgetEventCallback(evt, model);
                            }
                        }
                    }, {passive:false});

                    if(!$KW.interactable(model)) {
                        $KD.preventDefault(evt);
                    } else {
                        internalHandlers = _getInternalHandlers(evt);

                        if(internalHandlers) {
                            propagate = _widgetInternalEventCallback(internalHandlers, evt, model);
                        }

                        propagate && _widgetEventCallback(evt, model);
                    }
                }
            }
        }, {passive:false});
    };


    //All the functions will be called in the scope of owner widget instance
    var _setOwnerSelectedIndex = {
        CollectionView: function $KE_setOwnerSelectedIndex_CollectionView(model) {
            //TODO
            var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget,
                _ = this._kwebfw_,
                index = model._kwebfw_.ii.split(',');

            if($KW.isContainer(model)
            || $KU.is(model, 'widget', 'Image2')
            || $KU.is(model, 'widget', 'Label')) {
                index[0] = parseInt(index[0], 10);
                index[1] = parseInt(index[1], 10);

                _.setFocus = false;
                this.selectedItemIndex = [index[0], index[1]];
                delete _.setFocus;
            }
        },

        DataGrid: function $KE_setOwnerSelectedIndex_DataGrid(model) {
            var $K = voltmx.$kwebfw$, $KD = $K.dom, $KU = $K.utils,
                $KW = $K.widget, index = null, target = null,
                el = $KW.el(this, 'node');

            if($KU.is(model, 'dom')) { //Here model is evt.target
                $K.ui[$KW.name(this)].performSelection.call(this, model);
            } else if($KU.is(model, 'widget')) {
                //TODO:: need to improve logic
                index = model._kwebfw_.ii.split(',');
                index[0] = parseInt(index[0], 10);
                if(index[0] > -1 && el) {
                    target = $KD.find(el, '[kii="' + model._kwebfw_.ii + '"]')[0];
                    $K.ui[$KW.name(this)].performSelection.call(this, target);
                }
            }
        },

        SegmentedUI2: function $KE_setOwnerSelectedIndex_SegmentedUI2(model) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget,
                _ = this._kwebfw_, prop = _.prop,
                selectedIndex = prop.selectedRowIndex,
                index = model._kwebfw_.ii.split(',');

            if($KW.isContainer(model)
            || $KU.is(model, 'widget', 'Image2')
            || $KU.is(model, 'widget', 'Label')) {
                index[0] = parseInt(index[0], 10);
                index[1] = parseInt(index[1], 10);

                if(prop.viewType !== constants.SEGUI_VIEW_TYPE_TABLEVIEW
                || prop.selectionBehavior === constants.SEGUI_DEFAULT_BEHAVIOR) {
                    if(!selectedIndex
                    || index[0] !== selectedIndex[0]
                    || index[1] !== selectedIndex[1]) {
                        if($KU.is(_.swipeContext, 'null') || !_.swipeContext.ignoreRowSelection) {
                            _.setFocus = false;
                            this.selectedRowIndex = [index[0], index[1]];
                            delete _.setFocus;
                        } else {
                            _.swipeContext.ignoreRowSelection = false;
                        }
                    }
                } else if(prop.viewType === constants.SEGUI_VIEW_TYPE_TABLEVIEW) {
                    _.setFocus = false;
                    this.selectedRowIndex = [index[0], index[1]];
                    delete _.setFocus;
                }
            }
        }
    };


    var _shouldPropagate = function $KE_shouldPropagate(voltmxEventType, model, fired) {
        var propogationEvents = ['onTouchStart', 'onTouchMove', 'onTouchEnd'],
            propagate = true, stopPropagation = {
                onClick: function(widget) {
                    var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget,
                        passList = ['Image2', 'Label'];

                    if($KW.isContainer(widget) && !$KU.is(widget, 'widget', 'Form2')) {
                        return false;
                    } else if(passList.indexOf($KW.name(widget)) >= 0) {
                        return false;
                    }
                    return true;
                }
            };


        if(propogationEvents.indexOf(voltmxEventType) >= 0) {
            propagate = true;
        } else if(fired || (stopPropagation[voltmxEventType]
        && stopPropagation[voltmxEventType](model) === true)) {
            propagate = false;
        }

        return propagate;
    };


    var _widgetEventCallback = function $KE_widgetEventCallback(evt, model) {
        var $K = voltmx.$kwebfw$, $KU= $K.utils, $KW = $K.widget, $KD = $K.dom, payload = null,
            touch = null, voltmxEventType = _getVoltmxEventType(evt), hrefValue = null, el = null, $KAR = $K.automation.recorder;

        if($KAR && $KAR.isAssertMode()) {
            $KAR.handleEventOnWidget(evt, model);
        } else {
            if(voltmxEventType === 'onClick') {
                $K.apm.send(model, 'Touch', {type:(model._kwebfw_.name+'_Click')});
            } else if(['onTouchStart', 'onTouchEnd'].indexOf(voltmxEventType) >= 0) {
                $K.apm.send(model, 'Touch', {type:voltmxEventType});
            }

            if(voltmxEventType === 'onClick' && $KU.is(model, 'widget', 'RichText')) {
                hrefValue = evt.target.getAttribute('href');

                if(hrefValue) {
                    if($KU.is(model.onClick, 'function')) {
                        $KD.preventDefault(evt);
                        if(!payload) payload = {};
                        payload.name = evt.target.innerText;
                        payload.href = {href:hrefValue};
                    } else if(hrefValue.charAt(0) === '#') {
                        $KD.preventDefault(evt);
                        hrefValue = hrefValue.substring(1, hrefValue.length);
                        el = document.getElementById(hrefValue);
                        if(!el) el = document.querySelector('a[name="' + hrefValue + '"]');
                        el && el.scrollIntoView(); //TODO:
                    }
                }
            }

            if(['onTouchStart', 'onTouchMove', 'onTouchEnd'].indexOf(voltmxEventType) >= 0) {
                touch = (evt.touches && evt.touches[0])
                    || (evt.changedTouches && evt.changedTouches[0])
                    || evt;

                if(!payload) payload = {};
                payload.x = touch.pageX || touch.clientX;
                payload.y = touch.pageY || touch.clientY;
                touch = $KD.point(model._kwebfw_.view);
                payload.x = (payload.x - touch.x);
                payload.y = (payload.y - touch.y);
            }

            $KW.closest(model, function(widget) {
                var $K = voltmx.$kwebfw$, $KW = $K.widget, $KD = $K.dom, $KU = $K.utils,
                    omodel = null, item = null, propagate = true, fired = false;

                if(!$KW.interactable(widget)) {
                    return false;
                }
                fired = $KW.fire(widget, voltmxEventType, widget, payload);

                if(['focusin', 'focusout'].indexOf(evt.type) === -1
                    && !fired && !$KW.pmodel(widget)) { //e.g. To fire Segment onRowClick
                    omodel = $KW.omodel(widget);

                    if(omodel) {
                        if($KU.is(omodel, 'widget', 'CollectionView')
                               && ['click', 'keydown', 'keyup'].indexOf(evt.type) > -1) {
                            item = ['onItemSelect', 'onItemKeyDown', 'onItemKeyUp'][['click', 'keydown', 'keyup'].indexOf(evt.type)];
                            propagate = _widgetInternalEventCallback(item, evt, omodel);
                        } else {
                            item = $KD.closest(widget._kwebfw_.view, 'kr', 'item');

                            if(item && $KD.hasAttr(item, ('kwh-'+evt.type))) {
                                item = $KD.getAttr(item, ('kwh-'+evt.type));
                                propagate = _widgetInternalEventCallback(item, evt, omodel);
                            }
                        }
                    } else {
                        //Handling Tab onclick event for tab header with template
                        item = (widget._kwebfw_.view) ? $KD.parent(widget._kwebfw_.view) : null;

                        if(item && $KD.hasAttr(item, 'tabid') && $KD.hasAttr(item, ('kwh-'+evt.type))) {
                            omodel = $KW.getModelByNode(item);

                            if(omodel) {
                                item = $KD.getAttr(item, ('kwh-'+evt.type));
                                propagate = _widgetInternalEventCallback(item, evt, omodel);
                            }
                        }
                    }
                }

                if(!propagate || !_shouldPropagate(voltmxEventType, widget, fired)) {
                    return false;
                }
            }, {owner:true, tabs:false});
        }
    };


    var _widgetInternalEventCallback = function $KE_widgetInternalEventCallback(handlers, evt, model) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, finalPropagation = true, $KAR = $K.automation.recorder;

        if($KAR && $KAR.isAssertMode()) {
            finalPropagation = false;
            $KAR.handleEventOnWidget(evt, model);
        } else {
            $KU.each(handlers.split(','), function(handler) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget, propagate = false;

                if(!$KU.is($K.ui[$KW.name(model)], 'object')) {
                    throw new Error('<$K.ui.'+$KW.name(model)+'> is not defined as an object.');
                } else {
                    if(!$KU.is($K.ui[$KW.name(model)][handler], 'function')) {
                        throw new Error('<$K.ui.'+$KW.name(model)+'.'+handler+'> is not defined as a function.');
                    } else {
                        propagate = $K.ui[$KW.name(model)][handler].call(this, evt);

                        if(!$KU.is(propagate, 'boolean')) {
                            throw new Error('Internal event should strictly return a boolean value.');
                        } else if(!propagate) {
                            finalPropagation = false;
                        }
                    }
                }
            }, model);
        }

        return finalPropagation;
    };

    var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget;

    $K.defVoltmxProp($KW, [
        {
            keey: 'registerEvents', value: function KE$_$KW_registerEvents(el) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils;

                if(!$KU.loadedFromOtherFramework()) {
                    _registerEvents();
                } else {
                    _registerEvents(el);
                }
            }
        }
    ]);

    if(!$KU.loadedFromOtherFramework()) {
        $KW.registerEvents();
    }
}());
