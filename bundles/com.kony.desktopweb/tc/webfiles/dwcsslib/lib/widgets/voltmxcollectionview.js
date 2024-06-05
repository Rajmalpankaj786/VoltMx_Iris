//All widget file must have this variable
//All the functions will be called in the scope of widget instance
//These function should always return a boolean value
(function() {
    var $K = voltmx.$kwebfw$, _extraHeightToRender = 200;


    $K.defVoltmxProp($K.ui, [
        {keey:'CollectionView', value:{}, items:[
            {keey:'onKeyDown', value:function(evt) {
                var $K = voltmx.$kwebfw$, $KD = $K.dom,
                    model = this._kwebfw_.items[0],
                    code = evt.keyCode || evt.which;

                if(model && model._kwebfw_.view) {
                    if([40].indexOf(code) >= 0) {
                        $KD.preventDefault(evt);

                        if(code === 40) { //Down Arrow
                            $KD.focus($KD.parent(model._kwebfw_.view));
                        }
                    }
                }

                return false;
            }},

            {keey:'doLayout', value:function(/*frame*/) {
                _applyLineSpaceAndItemSpace.call(this);
            }},

            {keey:'onItemSelect', value:function(evt) {
                var $K = voltmx.$kwebfw$, $KW = $K.widget, $KD = $K.dom,
                    index = null, secIndex = -1, itemIndex = -1;

                index = $KD.closest(evt.target, 'kr', 'cvitem');

                if(index) {
                    index = $KD.getAttr(index, 'kii').split(',');
                    secIndex = parseInt(index[0], 10);
                    itemIndex = parseInt(index[1], 10);

                    $K.apm.send(this, 'Touch', {type:(this._kwebfw_.name+'_Item_Click')});
                    $KW.fire(this, 'onItemSelect', this, {secIndex:secIndex, itemIndex:itemIndex});
                }

                return false;
            }},

            {keey:'onItemKeyDown', value:function(evt) {
                var $K = voltmx.$kwebfw$, $KD = $K.dom, li = null,
                    code = evt.keyCode || evt.which;
                    //TODO
                if([38, 40].indexOf(code) >= 0) {
                    if(code === 38) { //Up Arrow
                        li = $KD.prev(evt.target);
                    } else if(code === 40) { //Down Arrow
                        li = $KD.next(evt.target);
                    }

                    if(li) {
                        $KD.preventDefault(evt);
                        $KD.focus(li);
                    }
                }

                return false;
            }},

            {keey:'onItemKeyUp', value:function(evt) {
                var $K = voltmx.$kwebfw$, $KW = $K.widget, $KD = $K.dom,
                    code = evt.keyCode || evt.which, secIndex = -1, itemIndex = -1;
                    //TODO
                if([13, 32].indexOf(code) >= 0) {
                    $KD.preventDefault(evt);

                    if(code === 13 || code === 32) { //Enter or Space
                        itemIndex = $KD.getAttr(evt.target, 'kii').split(',');
                        secIndex = parseInt(itemIndex[0], 10);
                        itemIndex = parseInt(itemIndex[1], 10);

                        $KW.fire(this, 'onItemSelect', this, {secIndex:secIndex, itemIndex:itemIndex});
                    }
                }

                return false;
            }},

            {keey: 'handleOnItemDisplay', value: function() {
                _animator.CollectionView.handleOnItemDisplay.call(this);
            }},

            {keey: 'isHeaderOrFooter', value: function(template) {
                return _deduceIndex.call(this, template._kwebfw_.ii)[1] < 0;
            }}

        ]}
    ]);


    //All the functions will be called in the scope of widget instance
    //Segment APIs actions - add, update and remove will be called
    var _action = {
        CollectionView: {

            _remove: function CollectionView$_action_remove(secIndex, itemIndex, count) {
                var $K = voltmx.$kwebfw$, $KW = $K.widget, $KD = $K.dom,
                    el = $KW.el(this), _ = this._kwebfw_, $KU = $K.utils,
                    data = _.prop.data, section = _isSectionDS(data[0]),
                    absIndex = 0, i =0,
                    isItemRendered = _isItemRendered.call(this, secIndex, itemIndex),
                    removeSelectedIndex = -1;

                for(i = 0; i < count; i++) {
                    absIndex = _absoluteItemIndex.call(this, secIndex, itemIndex);

                    if(section) data[secIndex][1].splice(itemIndex, 1);
                    else data.splice(itemIndex, 1);


                    if(_.selectedItems.length > 0) {
                        $KU.each(_.selectedItems, function(item, index) {
                            if(item[0] === secIndex && item[1] > itemIndex) {
                                item[1] = item[1] - 1;
                            } else if(item[0] === secIndex && item[1] === itemIndex) {
                                removeSelectedIndex = index;
                            }
                        });
                        if(removeSelectedIndex !== -1) {
                            _.selectedItems.splice(removeSelectedIndex, 1);
                        }
                        _setSelectedItemsRelatedProperties.call(this);
                    }

                    if(el.node) {
                        if(section) {
                            _flushClones(_.clones[secIndex][1][itemIndex]);
                            _.clones[secIndex][1].splice(itemIndex, 1);
                        } else {
                            _flushClones(_.clones[itemIndex]);
                            _.clones.splice(itemIndex, 1);
                        }

                        if(isItemRendered) {
                            _.items.splice(absIndex, 1);
                            $KD.removeAt(el.scrolee, absIndex);
                        }
                    }
                }
                if(el.node) _updateIndexes.call(this, 0, -1);
            },

            _removeAll: function CollectionView$_action_removeAll() {
                var $K = voltmx.$kwebfw$, $KW = $K.widget, $KD = $K.dom,
                    el = null, _ = this._kwebfw_;

                _.prop.data = [];
                _.items = [];
                _flushClones(_.clones);
                _.clones = [];
                _clearSelectedIndices.call(this);

                if(_.view) {
                    el = $KW.el(this);
                    $KD.html(el.scrolee, '');
                    $KD.setAttr(el.scrolee, 'aria-itemcount', 0);
                }
            },

            _removeSectionAt: function CollectionView$_action_removeSectionAt(secIndex, itemIndex, updateIndicesFlag, count) {
                var $K = voltmx.$kwebfw$, $KW = $K.widget, $KD = $K.dom,
                    $KU =$K.utils, _ = this._kwebfw_, data = _.prop.data,
                    clones = null, el = $KW.el(this), removeSelectedSectionIndices = [],
                    absIndex = 0, i = 0;


                if(!$KU.is(updateIndicesFlag, 'boolean')) updateIndicesFlag = true;

                if(updateIndicesFlag && _.selectedItems.length > 0) {
                    $KU.each(_.selectedItems, function(item, index) {
                        if(item[0] > secIndex + count) {
                            item[0] = item[0] - count;
                        } else if(item[0] >= secIndex && item[0] <= secIndex + count) {
                            removeSelectedSectionIndices.push(index);
                        }
                    });
                    $KU.each(removeSelectedSectionIndices, function(index) {
                        _.selectedItems.splice(index, 1);
                    });
                    _setSelectedItemsRelatedProperties.call(this);
                }

                if(el.node) {
                    for(i = 0; i < count; i++) {
                        absIndex = _absoluteItemIndex.call(this, secIndex, itemIndex);
                        clones = _.clones[secIndex];
                        //remove data of the given section index
                        data.splice(secIndex, 1);
                        //header node removal of given section index
                        if(clones[0] && clones[0].isVisible) {
                            $KD.removeAt(el.scrolee, absIndex);
                            _.items.splice(absIndex, 1);
                        }

                        //item nodes removal of given section index
                        $KU.each(clones[1], function(clone) {
                            if(clone && clone.isVisible) {
                                $KD.removeAt(el.scrolee, absIndex);
                                _.items.splice(absIndex, 1);
                            }
                        });

                        if(clones[2] && clones[2].isVisible) {
                            $KD.removeAt(el.scrolee, absIndex);
                            _.items.splice(absIndex, 1);
                        }

                        _flushClones(_.clones[secIndex]);
                        _.clones.splice(secIndex, 1);
                    }
                    if(updateIndicesFlag) _updateIndexes.call(this, 0, -1);
                }
            },


            add: function CollectionView$_action_add(secIndex, itemIndex, widgetdata, anim) {
                var $K = voltmx.$kwebfw$, $KW = $K.widget, $KD = $K.dom, $KU = $K.utils,
                    clone = null, el = $KW.el(this), _ = this._kwebfw_,
                    data = _.prop.data, section = _isSectionDS(data[0]),
                    absIndex = null, itemNode = null,
                    /*eslint-disable no-unused-vars*/ widgetData = null /*eslint-enable no-unused-vars*/;

                if($KU.is(widgetdata, 'object')) {
                    widgetData = [widgetdata];
                }

                _iterateOverData.call(this, widgetdata, function(widgetdata, counter) {
                    if(section) data[secIndex][1].splice(itemIndex + counter, 0, widgetdata);
                    else data.splice(itemIndex + counter, 0, widgetdata);

                    absIndex = _absoluteItemIndex.call(this, secIndex, itemIndex + counter);

                    if(_.selectedItems.length > 0) {
                        $KU.each(_.selectedItems, function(item) {
                            if(item[1] >= itemIndex + counter) {
                                item[1] = item[1] + 1;
                            }
                        });
                        _setSelectedItemsRelatedProperties.call(this);
                    }

                    if(el.node) {
                        if(section) _.clones[secIndex][1].splice(itemIndex + counter, 0, null);
                        else _.clones.splice(itemIndex + counter, 0, null);

                        clone = _getClonedTemplate.call(this, [secIndex, itemIndex + counter]);

                        if(clone) {
                            itemNode = _renderItems.call(this, [clone]);
                            if(absIndex === _.items.length) {
                                _.items.push(clone);
                                $KD.add(el.scrolee, itemNode);
                            } else {
                                _.items.splice(absIndex, 0, clone);
                                $KD.addAt(el.scrolee, itemNode, absIndex);
                            }

                            if(secIndex === -1) secIndex = 0;

                            if(_animator.CollectionView.canAnimate.call(this, anim)) {
                                _animator.CollectionView.onItemDisplayHandler.call(this, voltmx.segment.ADD, [clone]);
                                _animator.CollectionView.applyItemsAnimationByAPI.call(this, 'adddataat', itemNode, itemIndex + counter, secIndex, anim);
                            }
                        }
                    }
                });

                if(el.node) {
                    _updateIndexes.call(this, 0, -1);
                }
            },

            update: function CollectionView$_action_update(secIndex, itemIndex, widgetdata, anim) {
                var $K = voltmx.$kwebfw$, $KW = $K.widget, $KD = $K.dom, $KU = $K.utils,
                    clone = null, el = $KW.el(this), _ = this._kwebfw_,
                    data = _.prop.data, section = _isSectionDS(data[0]),
                    absIndex = 0,
                    isItemRendered = _isItemRendered.call(this, secIndex, itemIndex),
                    itemNode = null,
                    /*eslint-disable no-unused-vars*/ widgetData = null /*eslint-enable no-unused-vars*/;

                if($KU.is(widgetdata, 'object')) {
                    widgetData = [widgetdata];
                }

                _iterateOverData.call(this, widgetdata, function(widgetdata, counter) {
                    if(section) data[secIndex][1][itemIndex + counter] = widgetdata;
                    else data[itemIndex + counter] = widgetdata;

                    if(_.selectedItems.length > 0) {
                        $KU.each(_.selectedItems, function(item, index) {
                            if(item[0] === secIndex && item[1] === itemIndex + counter) {
                                _.selectedItems.splice(index, 1);
                                return true;
                            }
                        });
                        _setSelectedItemsRelatedProperties.call(this);
                    }

                    if(el.node) {
                        absIndex = _absoluteItemIndex.call(this, secIndex, itemIndex + counter);
                        if(section) {
                            _flushClones(_.clones[secIndex][1][itemIndex + counter]);
                            _.clones[secIndex][1][itemIndex + counter] = null;
                        } else {
                            _flushClones(_.clones[itemIndex + counter]);
                            _.clones[itemIndex + counter] = null;
                        }

                        clone = _getClonedTemplate.call(this, [secIndex, itemIndex + counter]);

                        if(clone) {
                            itemNode = _renderItems.call(this, [clone]);
                            if(isItemRendered) {
                                _.items[absIndex] = clone;
                                $KD.replace(itemNode, $KD.childAt(el.scrolee, absIndex));
                            } else {
                                if(absIndex === _.items.length) {
                                    _.items.push(clone);
                                    $KD.add(el.scrolee, itemNode);
                                } else {
                                    _.items.splice(absIndex, 0, clone);
                                    $KD.addAt(el.scrolee, itemNode, absIndex);
                                }
                            }

                            if(secIndex === -1) secIndex = 0;

                            if(_animator.CollectionView.canAnimate.call(this, anim)) {
                                _animator.CollectionView.onItemDisplayHandler.call(this, voltmx.segment.UPDATE, [clone]);
                                _animator.CollectionView.applyItemsAnimationByAPI.call(this, 'setdataat', itemNode, itemIndex, secIndex, anim);
                            }
                        }
                    }
                });
            },

            remove: function CollectionView$_action_remove(secIndex, itemIndex, count, anim) {
                var $K = voltmx.$kwebfw$, $KD = $K.dom,
                    _ = this._kwebfw_, absIndex = null, itemNode = null;
                if(_animator.CollectionView.canAnimate.call(this, anim)) {
                    absIndex = _absoluteItemIndex.call(this, secIndex, itemIndex);
                    itemNode = $KD.parent(_.items[absIndex]._kwebfw_.view);
                    _animator.CollectionView.onItemDisplayHandler.call(this, voltmx.segment.REMOVE, [_.items[absIndex]]);
                    _animator.CollectionView.applyItemsAnimationByAPI.call(this, 'removeat', itemNode, itemIndex, secIndex, anim);
                } else {
                    _action.CollectionView._remove.call(this, secIndex, itemIndex, count);
                }
            },

            addall: function CollectionView$_action_addall(secIndex, itemIndex, newdata, anim) {
                var $K = voltmx.$kwebfw$, $KW = $K.widget, $KD = $K.dom,
                    clones = null, el = $KW.el(this), _ = this._kwebfw_,
                    data = _.prop.data, items = null, prevLength;

                data.push.apply(data, newdata);

                if(el.node) {
                    clones = _getRenderableClones.call(this, [secIndex, itemIndex]);
                    if(clones.length > 0) {
                        prevLength = $KD.children(el.scrolee).length;
                        $KD.add(el.scrolee, _renderItems.call(this, clones));
                        _.items.push.apply(_.items, clones);

                        if(_animator.CollectionView.canAnimate.call(this, anim)) {
                            items = [].slice.call($KD.children(el.scrolee), prevLength);
                            _animator.CollectionView.onItemDisplayHandler.call(this, voltmx.segment.ADD, clones);
                            _animator.CollectionView.applyItemsAnimationByAPI.call(this, 'addall', items, -1, -1, anim);
                        }
                    }
                    //_updateIndexes.call(this, 0, -1);
                }
            },

            addsectionat: function CollectionView$_action_addsectionat(secIndex, itemIndex, newdata, updateIndicesFlag, anim) {
                var $K = voltmx.$kwebfw$, $KW = $K.widget, $KD = $K.dom, $KU = $K.utils,
                    clones = null, el = $KW.el(this), _ = this._kwebfw_, data = _.prop.data,
                    absIndex = 0, prevLength, items = [], item = null;

                if(!$KU.is(updateIndicesFlag, 'boolean')) updateIndicesFlag = true;


                if(updateIndicesFlag && _.selectedItems.length > 0) {
                    $KU.each(_.selectedItems, function(item) {
                        if(item[0] >= secIndex) {
                            item[0] = item[0] + newdata.length;
                        }
                    });
                    _setSelectedItemsRelatedProperties.call(this);
                }

                if(el.node) {
                    $KU.each(newdata, function(newdata, counter) {
                        data.splice(secIndex + counter, 0, newdata);
                        _.clones.splice(secIndex + counter, 0, null);
                        clones = _getRenderableClones.call(this, [secIndex + counter, itemIndex], [secIndex + counter, newdata.length]);//TODO
                        absIndex = _absoluteItemIndex.call(this, secIndex + counter, itemIndex);
                        if(absIndex === _.items.length) {
                            if(clones.length > 0) {
                                prevLength = $KD.children(el.scrolee).length;
                                $KD.add(el.scrolee, _renderItems.call(this, clones));
                                _.items.splice.apply(_.items, [absIndex, 0].concat(clones));
                                if(_animator.CollectionView.canAnimate.call(this, anim)) {
                                    items = [].slice.call($KD.children(el.scrolee), prevLength);
                                    _animator.CollectionView.onItemDisplayHandler.call(this, updateIndicesFlag ? voltmx.segment.ADD: voltmx.segment.UPDATE, clones);
                                    _animator.CollectionView.applyItemsAnimationByAPI.call(this, 'addsectionat', items, -1, -1, anim);
                                }
                            }
                        } else {
                            _.items.splice.apply(_.items, [absIndex, 0].concat(clones));
                            $KU.each(clones, function(clone/*, ii*/) {
                                item = _renderItems.call(this, [clone]);
                                items.push(item);
                                $KD.addAt(el.scrolee, item, absIndex++);
                            }, this);
                            if(_animator.CollectionView.canAnimate.call(this, anim)) {
                                _animator.CollectionView.onItemDisplayHandler.call(this, updateIndicesFlag ? voltmx.segment.ADD: voltmx.segment.UPDATE, clones);
                                _animator.CollectionView.applyItemsAnimationByAPI.call(this, 'addsectionat', items, -1, -1, anim);
                            }
                        }
                    }, this);
                    if(updateIndicesFlag) _updateIndexes.call(this, 0, -1);
                } else {
                    $KU.each(newdata, function(newdata, counter) {
                        data.splice(secIndex + counter, 0, newdata);
                    }, this);
                }
            },

            setsectionat: function CollectionView$_action_setsectionat(secIndex, itemIndex, newdata, anim) {
                var $K = voltmx.$kwebfw$, $KW = $K.widget, el = $KW.el(this),
                    _ = this._kwebfw_;

                _action.CollectionView.removesectionat.call(this, secIndex, itemIndex, false, newdata.length);
                _action.CollectionView.addsectionat.call(this, secIndex, itemIndex, newdata, false, anim);
                if(_.selectedItems.length > 0) {
                    _.selectedItems.splice(0, _.selectedItems.length);
                    _setSelectedItemsRelatedProperties.call(this);
                }
                if(el.node) _updateIndexes.call(this, 0, -1);
            },

            removesectionat: function CollectionView$_action_removesectionat(secIndex, itemIndex, updateIndicesFlag, count, anim) {
                var $K = voltmx.$kwebfw$, $KW = $K.widget, $KD = $K.dom,
                    $KU =$K.utils, _ = this._kwebfw_, clones = null, counter = 0,
                    el = $KW.el(this), absIndex = null, items = [], cloneModels = [];

                if(_animator.CollectionView.canAnimate.call(this, anim)) {
                    absIndex = _absoluteItemIndex.call(this, secIndex, itemIndex);
                    if(el.node) {
                        clones = _.clones[secIndex];
                        //header node removal of given section index
                        if(clones[0] && clones[0].isVisible) {
                            items.push($KD.childAt(el.scrolee, absIndex));
                            counter ++;
                        }

                        //item nodes removal of given section index
                        $KU.each(clones[1], function(clone) {
                            if(clone && clone.isVisible) {
                                items.push($KD.childAt(el.scrolee, absIndex + counter));
                                cloneModels.push(clone);
                                counter ++;
                            }
                        });
                    }
                    _animator.CollectionView.onItemDisplayHandler.call(this, voltmx.segment.REMOVE, cloneModels);
                    _animator.CollectionView.applyItemsAnimationByAPI.call(this, 'removesectionat', items, itemIndex, secIndex, anim);
                } else {
                    _action.CollectionView._removeSectionAt.call(this, secIndex, itemIndex, updateIndicesFlag, count);
                }
            }

        }
    };


    //All the functions will be called in the scope of widget instance
    var _animator = {
        CollectionView: {
            applyItemsAnimationByAPI: function CollectionView$_animator_applyItemsAnimationByAPI(action, listItems, itemIndex, secIndex, animObj) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils,
                    animDef = null, segmodel = this, item = null,
                    items = [],
                    _wrapRemoveAtCallback = function(callback) {
                        var wrapper = function() {
                            _action.CollectionView._remove.call(segmodel, secIndex, itemIndex);
                            callback && callback.apply(this, arguments);
                        };
                        return wrapper;
                    },
                    _wrapRemoveAllCallback = function(callback) {
                        var wrapper = function() {
                            _action.CollectionView._removeAll.call(segmodel);
                            callback && callback.apply(this, arguments);
                        };
                        return wrapper;
                    },
                    _wrapRemoveSectionAtCallback = function(callback) {
                        var wrapper = function() {
                            _action.CollectionView._removeSectionAt.call(segmodel, secIndex, itemIndex, true);
                            callback && callback.apply(this, arguments);
                        };
                        return wrapper;
                    };

                animDef = animObj.definition;

                if(action === 'removeat') {
                    if(!animObj.callbacks) animObj.callbacks = {};
                    animObj.callbacks.animationEnd = _wrapRemoveAtCallback(animObj.callbacks.animationEnd);
                }

                if(action === 'removeall') {
                    if(!animObj.callbacks) animObj.callbacks = {};
                    animObj.callbacks.animationEnd = _wrapRemoveAllCallback(animObj.callbacks.animationEnd);
                }

                if(action === 'removesectionat') {
                    if(!animObj.callbacks) animObj.callbacks = {};
                    animObj.callbacks.animationEnd = _wrapRemoveSectionAtCallback(animObj.callbacks.animationEnd);
                }

                switch(action) {
                    case 'adddataat':
                    case 'setdataat':
                    case 'removeat':
                        item = listItems.firstChild;
                        animDef.applyItemAnimation([item], animObj.config, animObj.callbacks);
                        break;

                    case 'addall':
                    case 'addsectionat':
                    case 'removesectionat':
                        $KU.each(listItems, function(item) {
                            items.push(item.firstChild);
                        });
                        animDef.applyItemAnimation(items, animObj.config, animObj.callbacks);
                        break;

                    case 'setdata':
                    case 'removeall':
                        $KU.each(listItems, function(item) {
                            items.push(item._kwebfw_.view);
                        });
                        animDef.applyItemAnimation(items, animObj.config, animObj.callbacks);
                        break;
                    default:
                        break;
                }
            },

            animateItems: function CollectionView$_animator_animateItems(animContext) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget, animInfo = {},
                    el = $KW.el(this), items = [], widgetId, widgets = [], elsToAnimate = [];

                if($KU.is(el.node, 'null')) {
                    return;
                }

                if(animContext) {
                    items = animContext.context || animContext.items;
                    animInfo = animContext.animation;
                    if(!items || !$KU.is(items, 'array') || !animInfo || !animInfo.definition) {
                        return;
                    }

                    widgetId = animContext.widgetID;
                    widgets = animContext.widgets || [];

                    if(widgetId) widgets.push(widgetId);

                    $KU.each(items, function(itemContext/*, key*/) {
                        var absIndex = 0, model = null, templateModel = null,
                            el = null;

                        absIndex = _absoluteItemIndex.call(this, itemContext.sectionIndex, itemContext.itemIndex);
                        templateModel = this._kwebfw_.items[absIndex];
                        if(templateModel._kwebfw_.view) {//template visible false case
                            if(widgets.length) {
                                $KU.each(widgets, function(widgetId/*, key*/) {
                                    model = templateModel[widgetId];
                                    el = model._kwebfw_.view;
                                    elsToAnimate.push(el);
                                });
                            } else {
                                model = templateModel;
                                el = model._kwebfw_.view;
                                elsToAnimate.push(el);
                            }
                        }
                    }, this);
                }
                animInfo.definition.applyItemAnimation(elsToAnimate, animInfo.config, animInfo.callbacks);
            },

            caf: function CollectionView$_animator_caf(callback) {
                cancelAnimationFrame(callback);
            },

            canAnimate: function CollectionView$_animator_canAnimate(animObj) {
                var $K = voltmx.$kwebfw$, $KW = $K.widget, result = true;


                if(!animObj || !animObj.definition || !animObj.definition.applyItemAnimation) {
                    result = false;
                }

                if(!$KW.visible(this)) {
                    result = false;
                }

                return result;
            },

            getItemVisibleState: function CollectionView$_animator_getItemVisibleState(li) {
                var $K = voltmx.$kwebfw$, $KW = $K.widget, el = null, offsetTop,
                    offsetHeight, scrollTop, segHeight, state;

                el = $KW.el(this);

                offsetTop = li.offsetTop;
                offsetHeight = li.offsetHeight;

                scrollTop = el.viewport.scrollTop;
                segHeight = el.viewport.offsetHeight;

                if(offsetTop + offsetHeight <= scrollTop) {
                    state = 'past';
                } else if(offsetTop >= scrollTop + segHeight) {
                    state = 'future';
                } else {
                    state = 'present';
                }

                return state;
            },

            handleStateAnimations: function CollectionView$_animator_handleStateAnimations() {
                var $K = voltmx.$kwebfw$, $KW = $K.widget, $KU = $K.utils, $KD = $K.dom,
                    visibleFirstItem = null, visibleLastItem = null, _ = this._kwebfw_;

                if(_.prop.onItemDisplay) {
                    visibleFirstItem = _getVisibleItem.call(this, {firstItem: true, lastItem: false});
                    visibleLastItem = _getVisibleItem.call(this, {firstItem: false, lastItem: true});
                }

                $KU.each(_.items, function(clone/*, index*/) {
                    var li = null, state = null, animObj = null, visibleState = null, currentItemContext = null;

                    if(!$KU.is(clone, 'null') && clone._kwebfw_.view) {
                        li = $KD.closest(clone._kwebfw_.view, 'kr', 'cvitem');
                    }

                    if(li) {
                        state = _animator.CollectionView.getItemVisibleState.call(this, li);
                        if(clone._kwebfw_.animState !== state) {
                            if(state === 'present') {
                                animObj = _.visibleAnim;
                                visibleState = voltmx.segment.VISIBLE;
                            } else {
                                animObj = _.invisibleAnim;
                                visibleState = voltmx.segment.INVISIBLE;
                            }

                            currentItemContext = _getItemContext(clone);
                            if(this._kwebfw_.prop.onItemDisplay && currentItemContext.itemIndex !== -1) {
                                $KW.fire(this, 'onItemDisplay', this,
                                    {
                                        model: this,
                                        state : visibleState,
                                        currentItemContext: currentItemContext,
                                        startItemContext: visibleFirstItem,
                                        endItemContext: visibleLastItem
                                    }
                                );
                            }

                            if(animObj) {
                                animObj.definition.applyItemAnimation([clone], animObj.config, animObj.callbacks);
                            }
                            clone._kwebfw_.animState = state;
                        }
                    }
                }, this);

                this._kwebfw_.rafValue = _animator.CollectionView.raf(_animator.CollectionView.handleStateAnimations.bind(this));
            },

            handleOnItemDisplay: function() {
                var $K = voltmx.$kwebfw$, $KW = $K.widget, $KU = $K.utils,
                    visibleItems, allItems = this._kwebfw_.items, config, itemContext;
                if(this._kwebfw_.view && this.onItemDisplay) {
                    visibleItems = _getVisibleItems.call(this, {indices: false});
                    $KU.each(visibleItems, function(item) {
                        if(!item._kwebfw_.onItemDisplayExecuted) {
                            item._kwebfw_.onItemDisplayExecuted = true;
                            itemContext = _getItemContext(item);
                            config = {
                                sectionIndex: itemContext.sectionIndex,
                                itemIndex: itemContext.itemIndex,
                                itemModel: item
                            };
                            $KW.fire(this, 'onItemDisplay', this, config);
                        }
                    }, this);
                    $KU.each(allItems, function(item) {
                        if(visibleItems.indexOf(item) === -1) {
                            item._kwebfw_.onItemDisplayExecuted = false;
                        }
                    }, this);
                }
            },

            onItemDisplayHandler: function CollectionView$_animator_onItemDisplayHandler(action, items) {
                var $K = voltmx.$kwebfw$, $KW = $K.widget, $KU = $K.utils, _ = this._kwebfw_,
                    visibleFirstItem = null, visibleLastItem = null,
                    config = {}, currentItemContext = null;

                if(_.prop.onItemDisplay) {
                    visibleFirstItem = _getVisibleItem.call(this, {firstItem: true, lastItem: false});
                    visibleLastItem = _getVisibleItem.call(this, {firstItem: false, lastItem: true});

                    $KU.each(items, function(clone/*, index*/) {
                        currentItemContext = _getItemContext(clone);
                        config = {
                            model: this,
                            state : action,
                            currentItemContext: currentItemContext,
                            startItemContext: visibleFirstItem,
                            endItemContext: visibleLastItem
                        };
                        if(currentItemContext.itemIndex !== -1) {
                            $KW.fire(this, 'onItemDisplay', this, config);
                        }
                    }, this);
                }
            },

            raf: function CollectionView$_animator_raf(callback) {
                return requestAnimationFrame(callback);
            },

            scrolled: false,

            scrollEnd: function CollectionView$_animator_scrollEnd() {
                this._kwebfw_.rafValue && _animator.CollectionView.caf(this._kwebfw_.rafValue);
            },

            scrollStart: function CollectionView$_animator_scrollStart() {
                var $K = voltmx.$kwebfw$, $KW = $K.widget, $KD = $K.dom,
                    segNode = null, model = null;

                segNode = $KD.closest(this, 'kw');
                if(segNode) {
                    model = $KW.model(segNode);

                    if(!_animator.CollectionView.scrolled) {
                        if(model._kwebfw_.visibleAnim
                               || model._kwebfw_.invisibleAnim
                               || model._kwebfw_.prop.onItemDisplay) {
                            _animator.CollectionView.setAnimationStates.call(model);
                            model._kwebfw_.rafValue = _animator.CollectionView.raf(_animator.CollectionView.handleStateAnimations.bind(model));
                        }
                        _animator.CollectionView.scrolled = true;
                    }

                    if(_animator.CollectionView.scrollTimer) {
                        clearTimeout(_animator.CollectionView.scrollTimer);
                    }

                    _animator.CollectionView.scrollTimer = setTimeout(function() {
                        _animator.CollectionView.scrollEnd.call(model);
                        clearTimeout(_animator.CollectionView.scrollTimer);
                        _animator.CollectionView.scrollTimer = null;
                        _animator.CollectionView.scrolled = false;
                    }, 250);
                }
            },

            scrollTimer: null,

            setAnimations: function CollectionView$_animator_setAnimations(animInfo) {
                var animObj = null, _ = this._kwebfw_;

                _.visibleAnim = null;
                _.invisibleAnim = null;

                if(animInfo) {
                    if(animInfo.visible) {
                        animObj = animInfo.visible;
                        if(animObj && animObj.definition && animObj.definition.applyItemAnimation) {
                            _.visibleAnim = animObj;
                        }
                    }

                    if(animInfo.invisible) {
                        animObj = animInfo.invisible;
                        if(animObj && animObj.definition && animObj.definition.applyItemAnimation) {
                            _.invisibleAnim = animObj;
                        }
                    }
                }
            },

            setAnimationStates: function CollectionView$_animator_setAnimationStates() {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, $KD = $K.dom;

                $KU.each(this._kwebfw_.items, function(clone/*, index*/) {
                    var li = null, state = null;

                    if(!$KU.is(clone, 'null') && clone._kwebfw_.view) {
                        li = $KD.closest(clone._kwebfw_.view, 'kr', 'cvitem');
                    }

                    if(li) {
                        state = _animator.CollectionView.getItemVisibleState.call(this, li);
                        clone._kwebfw_.animState = state;
                    }
                }, this);
            }
        }
    };


    //This function will be called in the scope of widget instance
    //This function is not yet tested, specially when section index value is there
    var _absoluteIndex = function CollectionView$_absoluteIndex(index) {
        var data = this._kwebfw_.prop.data, absIndex = -1, secIndex = -1, itemIndex = -1;

        index = _deduceIndex.call(this, index);
        secIndex = index[0]; itemIndex = index[1];

        if(!(secIndex === -1 && itemIndex === -1)) {
            if(_isSectionDS(data[0])) {
                if(secIndex >= 0) {
                    if(secIndex < data.length) {
                        for(index=0; index<=secIndex; index++) {
                            absIndex += 1;

                            if(index < secIndex) {
                                absIndex += data[index][1].length;
                            } else if(itemIndex > -1 && itemIndex < data[index][1].length) {
                                absIndex += (itemIndex + 1);
                            }
                        }
                    } else {
                        //SectionIndex exceeds its max boundary for a sectionable segment.
                    }
                } else {
                    //Negative SectionIndex found for a sectionable segment.
                }
            } else { //Non sectionable segment
                if(itemIndex >= 0) {
                    if(itemIndex < data.length) {
                        absIndex = itemIndex;
                    } else {
                        //ItemIndex exceeds its max boundary for a non-sectionable segment.
                    }
                } else {
                    //Negative ItemIndex found for a non-sectionable segment.
                }
            }
        }


        return absIndex;
    };


    //This function will be called in the scope of widget instance
    //This function is not yet tested, specially when section index value is there
    var _absoluteItemIndex = function CollectionView$_absoluteItemIndex(secIndex, itemIndex) {
        var absIndex = 0, _ = this._kwebfw_, data = _.prop.data, clones = _.clones;

        var increment = function(clone, index) {
            if(clone && clone.isVisible) index++;

            return index;
        };

        if(clones.length <= 0) {
            return absIndex;
        }


        if(_isSectionDS(data[0])) {
            if(itemIndex === -1) {
                secIndex--;
                if(secIndex >= 0) {
                    itemIndex = data[secIndex][1].length - 1;
                    if(data[secIndex][2]) itemIndex++;
                }
            } else {
                itemIndex = itemIndex - 1;
            }
            while(secIndex < data.length && secIndex >= 0) {
                if(itemIndex === -1) {
                    absIndex = increment(clones[secIndex][0], absIndex);
                    secIndex--;
                    if(secIndex >= 0) {
                        itemIndex = data[secIndex][1].length - 1;
                        if(data[secIndex][2]) itemIndex++;
                    }
                } else {
                    if(itemIndex <= data[secIndex][1].length && itemIndex > -1) {
                        if(itemIndex === data[secIndex][1].length) {
                            absIndex = increment(clones[secIndex][2], absIndex);
                        } else {
                            absIndex = increment(clones[secIndex][1][itemIndex], absIndex);
                        }
                        itemIndex--;
                    }
                }
            }
        } else {
            itemIndex = itemIndex - 1;
            while(itemIndex < data.length && itemIndex >= 0) {
                absIndex = increment(clones[itemIndex], absIndex);
                itemIndex--;
            }
        }


        return absIndex;
    };

    //This function will be called in the scope of widget instance
    var _applyNodeStyles = function CollectionView$_applyNodeStyles() {
        var $K = voltmx.$kwebfw$, $KU = $K.utils;

        $KU.each(this._kwebfw_.items, function(clone, index) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils,
                div = null;

            if(!$KU.is(clone, 'null')) {
                div = clone._kwebfw_.view;
            }

            if(div) {
                _applyItemAndHeaderSkin.call(this, div, clone, index);
            }
        }, this);
    };

    var _applyLineSpaceAndItemSpace = function CollectionView$__applyLineSpaceAndItemSpace() {
        var $K = voltmx.$kwebfw$, $KD = $K.dom, $KW = $K.widget;
        var _applyMarginForLastItem = function(model, width, height) {//TODO
                var parentNode = $KW.el(model).node;
                if(model.layout === voltmx.collectionview.LAYOUT_HORIZONTAL) {
                    var hBorder = parseInt($KD.style(parentNode, 'border-left-width'), 10) + parseInt($KD.style(parentNode, 'border-right-width'), 10);
                    var cvWidth = model._kwebfw_.prop.frame.width - hBorder;
                    let gapWidth = getGapCollectionViewGrid(cvWidth, collectionViewItemWidth, itemNodes.length - countHeaderFooter, itemSpace);//Issue fix for collection view remove extra margin-right to the div
                    if(gapWidth == 0) {
                        $KD.style(prevWidget.flexNode, 'margin-right','0px');
                    } else {
                        $KD.style(prevWidget.flexNode, 'margin-right', cvWidth - width - gapWidth+ 'px');
                    }
                    if (isFirstItem && totalBoxes == 1) {
                        $KD.style(prevWidget.flexNode, 'margin-left', (cvWidth - collectionViewItemWidth) / 2 + 'px');
                        $KD.style(prevWidget.flexNode, 'margin-right', (cvWidth - collectionViewItemWidth) / 2 + 'px');
                    }
                } else if(model.layout === voltmx.collectionview.LAYOUT_VERTICAL) {
                    var vBorder = parseInt($KD.style(parentNode, 'border-top-width'), 10) + parseInt($KD.style(parentNode, 'border-bottom-width'), 10);
                    var cvHeight = model._kwebfw_.prop.frame.height - vBorder;
                    let gapHeight = getGapCollectionViewGrid(cvHeight, collectionViewItemHeight, itemNodes.length - countHeaderFooter, itemSpace);//Issue fix for collection view remove extra margin-bottom to the div
                    if(gapHeight == 0) {
                        $KD.style(prevWidget.flexNode, 'margin-bottom','0px');
                    } else {
                        $KD.style(prevWidget.flexNode, 'margin-bottom', cvHeight - height - gapHeight + 'px');
                    }
                    if (isFirstItem && totalBoxes == 1) {
                        $KD.style(prevWidget.flexNode, 'margin-top', (cvHeight - collectionViewItemHeight) / 2 + 'px');
                        $KD.style(prevWidget.flexNode, 'margin-bottom', (cvHeight - collectionViewItemHeight) / 2 + 'px');
                    }
                }
            },
            //Issue fix for collection view remove extra margin-right to the div
            getGapCollectionViewGrid = function(parentWidth, childWidth, totalData, itemSpace) {
                let noOfBoxLeft = getNumberOfDivLeft(parentWidth, childWidth, totalData, itemSpace);
                  if(itemSpace == 0) {
                    totalBoxes = parseInt(parentWidth / childWidth);
                  }
                  let totalGapWidth = parentWidth - (totalBoxes * childWidth);
                  let gapBetweenEachBox = totalGapWidth / (totalBoxes - 1);
                  if(noOfBoxLeft == 0) {
                    return 0;
                  } else if(itemSpace > 0){
                    let x = gapBetweenEachBox*(box - 1);
                    let y = ((box > 1) ? (box - 1)*itemSpace : box*itemSpace);
                    console.log("X=>",x);
                    console.log("Y=>",y);
                    return (Math.abs(x - y));                    
                  }
                  return (gapBetweenEachBox*(noOfBoxLeft -1));
            },
            getNumberOfDivLeft = function(parentWidth, childWidth, totalData, itemSpace) {
              let noOfBoxLeft = 0;
              if(itemSpace == 0) {
                totalBoxes = parseInt(parentWidth / childWidth);
                let totalGapWidth = parentWidth - (totalBoxes * childWidth);
                noOfBoxLeft = totalData % totalBoxes;
              } else {
                totalBoxes = 0;
                let widthSum = 0;
                while(widthSum <= parentWidth) {                   
                  widthSum = widthSum + childWidth;                   
                  if(widthSum < parentWidth){
                   widthSum = widthSum + itemSpace; 
                   totalBoxes++;                   
                  }
                  if(widthSum == parentWidth || widthSum > parentWidth){
                   break; 
                  }                  
                }
                box = totalData % totalBoxes;
                noOfBoxLeft = (box == 0) ? 0 : (totalBoxes - box);
              }
              return noOfBoxLeft;
            },
            _isItOfNewRow = function(width, currentSum, parentWidth) {
                return width + currentSum > parentWidth;
            },
            _isItOfNewColumn = function(height, currentSum, parentHieght) {
                return height + currentSum > parentHieght;
            },
            _getNodeAndModel = function(itemNode) {//TODO
                var flexModel = null, index;

                if(itemNode) {
                    index = itemNode.getAttribute('kii').split(',');
                    flexModel = _getClonedTemplate.call(this, parseInt(index[0]), parseInt(index[1]));

                    return {
                        flexNode: itemNode,
                        flexModel: flexModel
                    };
                }
            },
            _resetMargin = function(wNode) {
                $KD.style(wNode, 'margin', null);
            },
            canApplyTop = false, //in Horizontal layout need to apply top(to achieve line space).This will set to true once second row is reached.
            canApplyLeft = false, //in Vertical layout need to apply left(to achieve line space).This will set to true once second column is reached.
            currSectionIndex = -1,
            currWidget = null,
            cvWidth = this._kwebfw_.prop.frame.width,
            cvHeight = this._kwebfw_.prop.frame.height,
            data = this.data,
            el = $KW.el(this),
            height = 0,
            heightSum = 0, //Sume of the widgtes height while iterating.User for setting flag canApplyLeft
            i = 0,
            itemNode = null,
            itemNodes = [],
            isFirstItem = true,
            itemSpace = parseInt(_convertFlexPropertyToCssUnit(this.minItemSpace, 'px'), 10),
            lineSpace = parseInt(_convertFlexPropertyToCssUnit(this.minLineSpace, 'px'), 10),
            prevSecIndex = -1,
            prevHeight = 0,
            prevWidget = null,
            width = 0,
            WidthSum = 0; //sum of the widgets width while iterating.User for setting flag canApplyTop
            countHeaderFooter = 0; // this is used for is header and footer both are present 
            collectionViewItemWidth = 0;
            collectionViewItemHeight = 0;
            totalBoxes = 0;
            box = 0;

        if(data && data.length > 0) {
            //checking for negative input
            itemSpace = (itemSpace < 0) ? 0 : itemSpace;
            lineSpace = (lineSpace < 0) ? 0 : lineSpace;

            itemNodes = el.scrolee.children;
            for(i = 0; i < itemNodes.length; i++) {
                itemNode = itemNodes[i];
                if(itemNode) {
                    if(_isSectionDS(data[0])) {
                        currSectionIndex = parseInt($KD.getAttr(itemNode, 'kii').split(',')[0]);
                        if(prevSecIndex !== currSectionIndex) {
                            prevWidget && _applyMarginForLastItem(this, WidthSum, heightSum);
                            prevWidget = undefined;
                            canApplyTop = canApplyLeft = 0;
                            heightSum = WidthSum = 0;
                            isFirstItem = true;
                            prevSecIndex = currSectionIndex;
                        }
                    }
                    /*eslint-disable no-continue*/
                    if(parseInt($KD.getAttr(itemNode, 'kii').split(',')[1]) < 0) {//header or footer case
                        countHeaderFooter++;
                        continue;
                    }
                    /*eslint-enable no-continue*/
                    currWidget = _getNodeAndModel.call(this, itemNode);//TODO
                    _resetMargin(currWidget.flexNode);
                    if(this.layout === voltmx.collectionview.LAYOUT_HORIZONTAL) {
                        width = itemNode.offsetWidth;//TODO
                        collectionViewItemWidth = itemNode.offsetWidth;
                        if(prevWidget && _isItOfNewRow(width, WidthSum + itemSpace, cvWidth)) {
                            WidthSum = 0;
                            canApplyTop = true;
                            if(isFirstItem) {
                                var prevWidth = prevWidget.flexNode.offsetWidth;//TODO
                                $KD.style(prevWidget.flexNode, 'margin-left', (cvWidth - prevWidth) / 2 + 'px');//TODO
                                $KD.style(prevWidget.flexNode, 'margin-right', (cvWidth - prevWidth) / 2 + 'px');//TODO
                            }
                            isFirstItem = true;
                        } else if(prevWidget) {
                            $KD.style(prevWidget.flexNode, 'margin-right', itemSpace + 'px');//TODO
                            WidthSum += itemSpace;
                            isFirstItem = false;
                        }
                        WidthSum += width;
                        if(canApplyTop) {
                            $KD.style(currWidget.flexNode, 'margin-top', lineSpace + 'px');//TODO
                        }
                    } else if(this.layout === voltmx.collectionview.LAYOUT_VERTICAL) {
                        height = itemNode.offsetHeight;
                        collectionViewItemHeight = itemNode.offsetHeight;
                        if(prevWidget && _isItOfNewColumn(height, heightSum + itemSpace, cvHeight)) {
                            heightSum = 0;
                            canApplyLeft = true;
                            if(isFirstItem) {
                                prevHeight = prevWidget.flexNode.offsetHeight;//TODO
                                $KD.style(prevWidget.flexNode, 'margin-top', (cvHeight - prevHeight) / 2 + 'px');//TODO
                                $KD.style(prevWidget.flexNode, 'margin-bottom', (cvHeight - prevHeight) / 2 + 'px');//TODO
                            }
                            isFirstItem = true;
                        } else if(prevWidget) {
                            $KD.style(prevWidget.flexNode, 'margin-bottom', itemSpace + 'px');//TODO
                            heightSum += itemSpace;
                            isFirstItem = false;
                        }
                        heightSum += height;
                        if(canApplyLeft) {
                            $KD.style(currWidget.flexNode, 'margin-left', lineSpace + 'px');//TODO
                        }
                    }
                    prevWidget = currWidget;
                }
            }
            prevWidget && _applyMarginForLastItem(this, WidthSum, heightSum);
        }
    };


    //This function will be called in the scope of widget instance
    var _applyItemAndHeaderSkin = function CollectionView$_applyItemAndHeaderSkin(div, clone/*, index*/) {
        var $K = voltmx.$kwebfw$, $KD = $K.dom, ii = clone._kwebfw_.ii,
            prop = this._kwebfw_.prop, itemSkin = prop.itemSkin;

        if(ii.indexOf(',-1') !== -1) {
            $KD.setAttr(div, 'class', prop.sectionHeaderSkin);
        } else if(ii.indexOf(',-2') !== -1) {
            $KD.setAttr(div, 'class', prop.sectionFooterSkin);
        } else {
            $KD.setAttr(div, 'class', itemSkin);
        }
    };


    //This function will be called in the scope of widget instance
    var _canRenderItem = function CollectionView$_canRenderItem(index, clone, item, tpl) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, _ = this._kwebfw_,
            secIndex = -1, itemIndex = -1, flag = false;

        if($K.F.RIVW) {
            flag = true;
        } else {
            index = _deduceIndex.call(this, index);
            secIndex = index[0]; itemIndex = index[1];

            if(arguments.length === 1 && !(secIndex === -1 && itemIndex === -1)) {
                if(secIndex === -1) {
                    clone = _.clones[itemIndex];
                    item = _.prop.data[itemIndex];
                    tpl = this.itemTemplate;
                } else {
                    if(itemIndex === -1) {
                        clone = _.clones[secIndex][0];
                        item = _.prop.data[secIndex][0];
                        tpl = this.sectionHeaderTemplate;
                    } else if(itemIndex === -2) {
                        clone = _.clones[secIndex][2];
                        item = _.prop.data[secIndex][2];
                        tpl = this.sectionFooterTemplate;
                    } else if(!_isSectionCollapsed.call(this, secIndex)) {
                        clone = _.clones[secIndex][1][itemIndex];
                        item = _.prop.data[secIndex][1][itemIndex];
                        tpl = this.itemTemplate;
                    }
                }
            }

            if(secIndex !== -1 && itemIndex !== -1
                && _isSectionCollapsed.call(this, secIndex)) {
                flag = false;
            } else if($KU.is(clone, 'widget')) {
                flag = clone.isVisible;
            } else if($KU.is(item, 'object')
                && $KU.is(tpl, 'widget')
                && !$KU.is(item[_.prop.widgetDataMap[tpl.id]], 'undefined')
                && Object.prototype.hasOwnProperty.call(item[_.prop.widgetDataMap[tpl.id]], 'isVisible')
                && $KU.is(item[_.prop.widgetDataMap[tpl.id]].isVisible, 'boolean')) {
                flag = item[_.prop.widgetDataMap[tpl.id]].isVisible;
            } else if($KU.is(tpl, 'widget')) {
                flag = tpl.isVisible;
            }
        }

        return flag;
    };

    //This function will be called in the scope of widget instance
    var _clearSelectedIndices = function CollectionView$_clearSelectedIndices() {
        var _ = this._kwebfw_, items = _.selectedItems;

        items.splice(0, items.length);
        _setSelectedItemsRelatedProperties.call(this);
    };

    var _cleanupLayoutProps = function CollectionView$_cleanupLayoutProps(model, layouttype/*, isHeaderOrFooter*/) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils;
        var props = ['left', 'right', 'centerX', 'centerY', 'top', 'bottom'];
        if(layouttype === voltmx.collectionview.LAYOUT_CUSTOM)
            return;
        $KU.each(props, function(prop) {
            model[prop] = '';
        });
    };

    var _convertFlexPropertyToCssUnit = function CollectionView$_convertFlexPropertyToCssUnit(value, layoutUnit) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KF = voltmx.flex, unit = '', len = 0;

        if($KU.is(value, 'number')) {
            unit = layoutUnit || $KF.DEFAULT_UNIT;

            if(unit === $KF.PX) {
                value = (value / $K.device.DPI);
                value = Math.round(value);
            } else if(unit === $KF.DP) {
                unit = $KF.PX;
            }
        } else if($KU.is(value, 'string')) {
            len = value.length;

            if(value.substr((len-1), 1) === $KF.PERCENTAGE) {
                unit = $KF.PERCENTAGE;
                value = parseFloat(value.replace($KF.PERCENTAGE, ''), 10);
            } else if(value.substr((len-2), 2) === $KF.PX) {
                unit = $KF.PX;
                value = (parseFloat(value.replace($KF.PX, ''), 10) / $K.device.DPI);
                value = Math.round(value);
            } else if(value.substr((len-2), 2) === $KF.DP) {
                unit = $KF.PX;
                value = parseFloat(value.replace($KF.DP, ''), 10);
            }
        }

        return (value + unit);
    };


    //This function will be called in the scope of widget instance
    var _deduceIndex = function CollectionView$_deduceIndex(index) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, secIndex = -1,
            data = this._kwebfw_.prop.data, itemIndex = -1;

        if(data && data.length > 0) {
            if($KU.is(index, 'widget')) {
                index = index._kwebfw_.ii;
            }

            if($KU.is(index, 'string') && index) {
                index = index.split(',');
                if(index.length === 2) {
                    secIndex = parseInt(index[0], 10);
                    itemIndex = parseInt(index[1], 10);

                    if(!$KU.is(secIndex, 'number')) {
                        secIndex = -1;
                    }
                    if(!$KU.is(itemIndex, 'number')) {
                        itemIndex = -1;
                    }
                }
            } else if($KU.is(index, 'number')) {
                secIndex = -1;
                itemIndex = index;
            } else if($KU.is(index, 'array')
                && $KU.is(index[0], 'number')
                && $KU.is(index[1], 'number')) {
                secIndex = index[0];
                itemIndex = index[1];
            }

            if(secIndex < -1) secIndex = -1;
            if(itemIndex < -2) itemIndex = -2;
        }

        return [secIndex, itemIndex];
    };

    /*eslint-disable no-unused-vars*/
    //This function will be called in the scope of widget instance
    //This <index> should be the this._kwebfw_.items[0]
    var _deduceTop = function CollectionView$_deduceTop(index) {
        var data = this._kwebfw_.prop.data, top = 0, secIndex = -1, itemIndex = -1;

        index = _deduceIndex.call(this, index);
        secIndex = index[0]; itemIndex = index[1];

        if(secIndex === -1 && itemIndex === -1) return top;

        if(secIndex === -1) {
            itemIndex--;

            while(itemIndex >= 0) {
                top += _getItemHeight.call(this, [secIndex, itemIndex]);
                itemIndex--;
            }
        } else {
            if(itemIndex === -1) {
                secIndex--;
                itemIndex = (data[secIndex][1].length - 1);
            } else {
                itemIndex--;
            }

            while(secIndex >= 0) {
                top += _getItemHeight.call(this, [secIndex, itemIndex]);

                if(itemIndex === -1) {
                    secIndex--;
                    itemIndex = (data[secIndex][1].length - 1);
                } else {
                    itemIndex--;
                }
            }
        }

        return top;
    };
    /*eslint-enable no-unused-vars*/

    //All widget file must have this variable
    //All the functions will be called in the scope of widget instance
    var _dependentPropertiesValidationMessage = {
        CollectionView: function CollectionView$_dependentPropertiesValidationMessage(prop, bconfig/*, lconfig, pspconfig*/) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false, message = '',
                sectionable = false, data = bconfig.data || prop.data,
                index = bconfig.selectedItemIndex || prop.selectedItemIndex;

            if($KU.is(index, 'null')) {
                flag = true;
            } else if(data && data.length && $KU.is(index, 'array') && index.length === 2
                && $KU.is(index[0], 'number') && $KU.is(index[1], 'number')) {
                sectionable = _isSectionDS(data[0]);

                if(!sectionable) {
                    if(index[0] === 0 && index[1] >= 0 && index[1] < data.length) {
                        flag = true;
                    }
                } else if(index[0] >= 0 && index[0] < data.length) {
                    if(index[1] >= -1 && index[1] < data[index[0]][1].length) {
                        flag = true;
                    }
                }
            }

            if(!flag) {
                message += 'Segment <selectedItemIndex> value is invalid';
            }

            return message;
        }
    };


    //This function will be called in the scope of widget instance
    var _executeOnItem = function CollectionView$_executeOnItem(index, callback, args) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget, tpl = null,
            data = this._kwebfw_.prop.data, item = null, secIndex = -1, itemIndex = -1;

        index = _deduceIndex.call(this, index);
        secIndex = index[0]; itemIndex = index[1];

        if(secIndex === -1 && itemIndex === -1) return;

        if(_isSectionDS(data[0])) {
            if(secIndex >= 0 && secIndex < data.length) {
                if(itemIndex < 0) {
                    if($KU.is(callback, 'function')) {
                        if(!$KU.is(args, 'array')) args = [];
                        if(itemIndex === -1) {
                            item = data[secIndex][0];
                            if(item) {
                                if($KU.is(item, 'string')) {
                                    tpl = _getFrameworkHeaderTemplate();
                                } else {
                                    tpl = item.template || this.sectionHeaderTemplate;
                                }
                                tpl = $KW.getTemplate(this, tpl);
                            }

                            if(!$KU.is(this._kwebfw_.clones[secIndex], 'array')) {
                                this._kwebfw_.clones[secIndex] = [null, [], null];
                            }

                            if(!$KU.is(this._kwebfw_.heights[secIndex], 'array')) {
                                this._kwebfw_.heights[secIndex] = [-1, [], null];
                            }

                            args.splice(0, 0, [secIndex, itemIndex]);
                            args.splice(1, 0, item);
                            args.splice(2, 0, tpl);
                            args.splice(3, 0, this._kwebfw_.clones[secIndex][0]);
                            args.splice(4, 0, this._kwebfw_.heights[secIndex][0]);
                        } else {
                            item = data[secIndex][2];
                            if(item) {
                                if($KU.is(item, 'string')) {
                                    tpl = _getFrameworkHeaderTemplate();
                                } else {
                                    tpl = item.template || this.sectionFooterTemplate;
                                }
                                tpl = $KW.getTemplate(this, tpl);
                            }

                            args.splice(0, 0, [secIndex, itemIndex]);
                            args.splice(1, 0, item);
                            args.splice(2, 0, tpl);
                            args.splice(3, 0, this._kwebfw_.clones[secIndex][2]);
                            args.splice(4, 0, this._kwebfw_.heights[secIndex][2]);
                        }

                        callback.apply(this, args);
                    }
                } else if(itemIndex >= 0 && itemIndex < data[secIndex][1].length) {
                    if($KU.is(callback, 'function')) {
                        if(!$KU.is(args, 'array')) args = [];
                        item = data[secIndex][1][itemIndex];
                        tpl = item.template || this.itemTemplate;
                        tpl = $KW.getTemplate(this, tpl);

                        if(!$KU.is(this._kwebfw_.clones[secIndex], 'array')) {
                            this._kwebfw_.clones[secIndex] = [null, []];
                        }
                        if($KU.is(this._kwebfw_.clones[secIndex][1][itemIndex], 'undefined')) {
                            this._kwebfw_.clones[secIndex][1][itemIndex] = null;
                        }

                        if(!$KU.is(this._kwebfw_.heights[secIndex], 'array')) {
                            this._kwebfw_.heights[secIndex] = [-1, []];
                        }
                        if($KU.is(this._kwebfw_.heights[secIndex][1][itemIndex], 'undefined')) {
                            this._kwebfw_.heights[secIndex][1][itemIndex] = -1;
                        }

                        args.splice(0, 0, [secIndex, itemIndex]);
                        args.splice(1, 0, item);
                        args.splice(2, 0, tpl);
                        args.splice(3, 0, this._kwebfw_.clones[secIndex][1][itemIndex]);
                        args.splice(4, 0, this._kwebfw_.heights[secIndex][1][itemIndex]);

                        callback.apply(this, args);
                    }
                }
            }
        } else if(secIndex < 0) {
            if(itemIndex >= 0 && itemIndex < data.length) {
                if($KU.is(callback, 'function')) {
                    if(!$KU.is(args, 'array')) args = [];
                    item = data[itemIndex];
                    tpl = item.template || this.itemTemplate;
                    tpl = $KW.getTemplate(this, tpl);

                    if(!$KU.is(this._kwebfw_.clones[itemIndex], 'undefined')) {
                        this._kwebfw_.clones[itemIndex] = null;
                    }

                    if(!$KU.is(this._kwebfw_.heights[itemIndex], 'undefined')) {
                        this._kwebfw_.heights[itemIndex] = -1;
                    }

                    args.splice(0, 0, [secIndex, itemIndex]);
                    args.splice(1, 0, item);
                    args.splice(2, 0, tpl);
                    args.splice(3, 0, this._kwebfw_.clones[itemIndex]);
                    args.splice(4, 0, this._kwebfw_.heights[itemIndex]);

                    callback.apply(this, args);
                }
            }
        }
    };


    //This function will be called in the scope of widget instance
    var _firstRenderableItem = function CollectionView$_firstRenderableItem() {
        var data = this._kwebfw_.prop.data, item = null, secIndex = -1, itemIndex = -1;

        if(data) {
            if(!_isSectionDS(data[0])) {
                itemIndex = 0;

                while(itemIndex < data.length) {
                    if(_canRenderItem.call(this, [-1, itemIndex])) {
                        item = _getClonedTemplate.call(this, [-1, itemIndex], true);
                        break;
                    } else {
                        itemIndex++;
                    }
                }
            } else {
                secIndex = 0;

                while(secIndex < data.length) {
                    if(_canRenderItem.call(this, [secIndex, itemIndex])) {
                        item = _getClonedTemplate.call(this, [secIndex, itemIndex], true);
                        break;
                    } else {
                        if(itemIndex === (data[secIndex][1].length - 1)) {
                            secIndex++;
                            itemIndex = -1;
                        } else {
                            itemIndex++;
                        }
                    }
                }
            }
        }

        return item;
    };


    //This function will be called in the scope of widget instance
    var _flushClones = function CollectionView$_flushClones(clones, config) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils;

        if(config) {
            config.iterate = true;
        } else {
            config = {iterate : true};
        }

        if($KU.is(clones, 'widget')) clones = [clones];

        if($KU.is(clones, 'array')) {
            $KU.each(clones, function(section) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils;

                if($KU.is(section, 'array')) {
                    if($KU.is(section[0], 'widget')) {
                        section[0]._flush(config);
                    }

                    $KU.each(section[1], function(item) {
                        var $K = voltmx.$kwebfw$, $KU = $K.utils;

                        if($KU.is(item, 'widget')) {
                            item._flush(config);
                        }
                    });

                    if($KU.is(section[2], 'widget')) {
                        section[2]._flush(config);
                    }
                } else if($KU.is(section, 'widget')) {
                    section._flush(config);
                }
            }, this);
        }
    };


    var _getFrameworkHeaderTemplate = function CollectionView$_getFrameworkHeaderTemplate() {
        var flx = null, lbl = null,
            bconfig = {
                'id': 'flxkwebfwHeader',
                'layoutType': voltmx.flex.FREE_FORM,
                'height': voltmx.flex.USE_PREFERRED_SIZE,
                'autogitemMode': voltmx.flex.AUTOGROW_HEIGHT
            };

        flx = new voltmx.ui.FlexContainer(bconfig);
        lbl = new voltmx.ui.Label({'id': 'labelkwebfwHeader'});

        flx.add(lbl);

        return flx;
    };


    var _getIndex = function CollectionView$_getIndex(find, list) {
        var position = -1, i = 0, ilen = list.length;

        for(i=0; i<ilen; i++) {
            if(list[i][0] === find[0] && list[i][1] === find[1]) {
                position = i;
                break;
            }
        }

        return position;
    };

    //This function will be called in the scope of widget instance
    var _getIndexedInfo = function CollectionView$_getIndexedInfo(index, data) {
        var item = null, _ = this._kwebfw_, prop =_.prop, secIndex = -1,
            itemIndex = -1;

        index = _deduceIndex.call(this, index);
        secIndex = index[0]; itemIndex = index[1];

        if(secIndex === -1 && itemIndex === -1) return null;

        if(_isSectionDS(prop.data[0])) {
            if(secIndex >= 0 && secIndex < prop.data.length) {
                if(itemIndex === -1) {
                    item = data[secIndex][0];
                } else if(itemIndex === -2) {
                    item = data[secIndex][2];
                } else if(itemIndex >= 0 && itemIndex < prop.data[secIndex][1].length) {
                    item = data[secIndex][1][itemIndex];
                }
            }
        } else if(secIndex < 0) {
            if(itemIndex >= 0 && itemIndex < prop.data.length) {
                item = data[itemIndex];
            }
        }

        return item;
    };

    //This function will be called in the scope of widget instance
    var _getClonedTemplate = function CollectionView$_getClonedTemplate(index, forced) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget, template = null;

        _executeOnItem.call(this, index, function(index, item, tpl, clone/*, height*/) {
            var secIndex = index[0], itemIndex = index[1],
                prop = this._kwebfw_.prop, self = this;

            if($KU.is(clone, 'widget')) {
                template = clone;
            } else {
                if(forced) {
                    template = $KW.cloneTemplate(tpl, item, prop.widgetDataMap, function(model/*, pmodel, windex*/) {
                        model._kwebfw_.ii = index.join(',');
                        _updateSpecialProperties.call(self, model);
                    });
                } else if(_canRenderItem.call(this, index, clone, item, tpl)) {
                    template = $KW.cloneTemplate(tpl, item, prop.widgetDataMap, function(model/*, pmodel, windex*/) {
                        model._kwebfw_.ii = index.join(',');
                        _updateSpecialProperties.call(self, model);
                    });
                }

                if(secIndex === -1) {
                    this._kwebfw_.clones[itemIndex] = template;
                } else {
                    if(itemIndex === -1) {
                        this._kwebfw_.clones[secIndex][0] = template;
                    } else if(itemIndex === -2) {
                        this._kwebfw_.clones[secIndex][2] = template;
                    } else {
                        this._kwebfw_.clones[secIndex][1][itemIndex] = template;
                    }
                }
            }
        });

        return template;
    };


    var _getInvertedDataMap = function CollectionView$_getInvertedDataMap(map) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, invertedMap = {};

        if($KU.is(map, 'object')) {
            $KU.each(map, function(value, key) {
                invertedMap[value] = key;
            });
        }

        return invertedMap;
    };


    //This function will be called in the scope of widget instance
    var _getRenderableClones = function CollectionView$_getRenderableClones(startIndex, endIndex) {
        var data = this._kwebfw_.prop.data, items = [], startSecIndex = startIndex[0],
            startItemIndex = startIndex[1], endSecIndex = -1, endItemIndex = -1,
            datalen = 0;

        var cloneItem = function(model, index) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils,
                tpl = _getClonedTemplate.call(model, index);

            if($KU.is(tpl, 'widget') && _canRenderItem.call(model, tpl)) {
                items.push(tpl);
            }
        };

        if(startSecIndex <= -1 && startItemIndex <= -2) return items;

        if(data) {
            datalen = data.length - 1;

            if(!endIndex) {
                if(_isSectionDS(data[0])) endSecIndex = datalen;
                else endItemIndex = datalen;
            } else {
                endSecIndex = endIndex[0];
                endItemIndex = endIndex[1];
                if(_isSectionDS(data[0])) {
                    if(endSecIndex > datalen) endSecIndex = datalen;
                } else {
                    if(endItemIndex > datalen) endItemIndex = datalen;
                }
            }
            if(_isSectionDS(data[0])) {
                while(startSecIndex <= endSecIndex) {
                    if(startItemIndex >= data[startSecIndex][1].length) {
                        startSecIndex++;
                        startItemIndex = -1;
                    } else {
                        cloneItem(this, [startSecIndex, startItemIndex]);
                        if(startItemIndex === -2) {
                            startSecIndex++;
                            startItemIndex = -1;
                        } else {
                            startItemIndex++;
                            if(startItemIndex === data[startSecIndex][1].length) {
                                startItemIndex = -2;
                            }
                        }
                    }
                }
            } else {
                while(startItemIndex <= endItemIndex && startItemIndex >= 0) {
                    cloneItem(this, [startSecIndex, startItemIndex]);
                    startItemIndex++;
                }
            }
        }

        return items;
    };

    //This function will be called in the scope of widget instance
    var _getItemContext = function CollectionView$_getItemContext(clone) {
        var cindex = clone._kwebfw_.ii.split(','),
            secIndex = parseInt(cindex[0], 10),
            itemIndex = parseInt(cindex[1], 10);
        return {
            sectionIndex: (secIndex === -1 ? 0 :secIndex),
            itemIndex: itemIndex
        };
    };

    //This function will be called in the scope of widget instance
    var _getItemCount = function CollectionView$_getItemCount() {
        var prop = this._kwebfw_.prop, itemcount = 0,
            secIndex = -1, itemIndex = -1;

        if(prop.data && prop.data.length) {
            if(_isSectionDS(prop.data[0])) {
                secIndex = (prop.data.length - 1);
                itemIndex = (prop.data[secIndex][1].length - 1);
            } else {
                itemIndex = (prop.data.length - 1);
            }
            itemcount = (_absoluteIndex.call(this, [secIndex, itemIndex]) + 1);
        }

        return itemcount;
    };


    //This function will be called in the scope of widget instance
    var _getItemHeight = function CollectionView$_getItemHeight(index) {
        var size = 0;

        _executeOnItem.call(this, index, function(index, item, tpl, clone, height) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils;

            var updateHeightAndClone = function(index, height, clone) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils,
                    secIndex = index[0], itemIndex = index[1];

                if(secIndex === -1) {
                    if(height !== -1) {
                        this._kwebfw_.heights[itemIndex] = height;
                    }
                    if($KU.is(clone, 'widget')) {
                        this._kwebfw_.clones[itemIndex] = clone;
                    }
                } else {
                    if(itemIndex === -1) {
                        if(height !== -1) {
                            this._kwebfw_.heights[secIndex][0] = height;
                        }
                        if($KU.is(clone, 'widget')) {
                            this._kwebfw_.clones[secIndex][0] = clone;
                        }
                    } else if(itemIndex === -2) {
                        if(height !== -1) {
                            this._kwebfw_.heights[secIndex][2] = height;
                        }
                        if($KU.is(clone, 'widget')) {
                            this._kwebfw_.clones[secIndex][2] = clone;
                        }
                    } else {
                        if(height !== -1) {
                            this._kwebfw_.heights[secIndex][1][itemIndex] = height;
                        }
                        if($KU.is(clone, 'widget')) {
                            this._kwebfw_.clones[secIndex][1][itemIndex] = clone;
                        }
                    }
                }
            };

            if(height !== -1) {
                size = height;
            } else {
                if($KU.is(clone, 'widget')) {
                    /* TODO:: Calculate "size" from clone
                        if(clone.height is autogitem) {
                            clone._render() and append to el.scrolee with css properties visibility:hidden;
                            then run clone.forceLayout() and size = clone.frame.height
                            then remove the DOM from view and update this._kwebfw_.minScroleeHeight += size
                            then set el.scrolee.style.height = this._kwebfw_.minScroleeHeight + 'px'
                        } else { //clone.height can not be in percent
                            //
                        }

                        updateHeightAndClone.call(this, index, size);
                        //*/
                } else {
                    if(!Object.prototype.hasOwnProperty.call(item, 'height')) {
                        /* TODO:: Calculate "size" from tpl
                            if(tpl.height is autogitem) {
                                create a clone, then clone._render()
                                and append to el.scrolee with css properties visibility:hidden;
                                then run clone.forceLayout() and size = clone.frame.height
                                then remove the DOM from view and update this._kwebfw_.minScroleeHeight += size
                                then set el.scrolee.style.height = this._kwebfw_.minScroleeHeight + 'px'
                            } else { //tpl.height can not be in percent
                                //
                            }
                            //*/
                    } else {
                        /* TODO:: Calculate "size" from item
                            if(item.height is autogitem) {
                                create a clone, then clone._render()
                                and append to el.scrolee with css properties visibility:hidden;
                                then run clone.forceLayout() and size = clone.frame.height
                                then remove the DOM from view and update this._kwebfw_.minScroleeHeight += size
                                then set el.scrolee.style.height = this._kwebfw_.minScroleeHeight + 'px'
                            } else { //item.height can not be in percent
                                //
                            }
                            //*/
                    }

                    updateHeightAndClone.call(this, index, size, clone);
                }
            }
        });

        return size;
    };


    var _getVisibleItem = function CollectionView$_getVisibleItem(config) {
        var $K = voltmx.$kwebfw$, $KW = $K.widget, $KU = $K.utils,
            $KD = $K.dom, el = $KW.el(this), visibleItem = null,
            scrollTop = 0, scrollBottom = 0, index = null, visibleIndex = null,
            prop = this._kwebfw_.prop;

        if(el.node && prop.data) {
            scrollTop = el.viewport.scrollTop;
            scrollBottom = scrollTop + el.scrolee.offsetHeight;

            $KU.each($KD.children(el.scrolee), function(li) {
                var itemTop = li.offsetTop, itemBottom = itemTop + li.offsetHeight;

                if(config.firstItem && scrollTop < itemBottom) {
                    visibleItem = li;
                    return true;
                }

                if(config.lastItem
                    && (scrollBottom < itemTop || scrollBottom <= itemBottom + 1)) {
                    visibleItem = li;
                    return true;
                }
            });

            index = $KD.getAttr(visibleItem, 'kii');
            index = _deduceIndex.call(this, index);

            if(_isSectionDS(prop.data[0])) {
                visibleIndex = {sectionIndex: index[0]};
                if(index[1] !== -1) visibleIndex['itemIndex'] = index[1];
            } else {
                visibleIndex = {itemIndex: index[1]};
            }
        }

        return visibleIndex;
    };

    var _getVisibleItems = function CollectionView$_getVisibleItems(config) {
        var $K = voltmx.$kwebfw$, $KW = $K.widget, $KU = $K.utils,
            $KD = $K.dom, el = $KW.el(this), visibleItems = [], visibleIndices = [],
            scrollRight = 0, scrollLeft = 0, scrollBottom = 0, scrollTop = 0,
            index = null, visibleItem = null, prop = this._kwebfw_.prop;

        if(el.node && prop.data) {
            scrollTop = el.viewport.scrollTop;
            scrollLeft = el.viewport.scrollLeft;
            scrollBottom = scrollTop + el.scrolee.offsetHeight;
            scrollRight = scrollLeft + el.scrolee.offsetWidth;

            $KU.each($KD.children(el.scrolee), function(div) {
                var itemLeft = div.offsetLeft, itemTop = div.offsetTop, itemBottom = itemTop + div.offsetHeight,
                    itemRight = itemLeft + div.offsetWidth;

                if((scrollTop < itemBottom && itemTop < scrollBottom)
                        && (scrollLeft < itemRight && itemLeft < scrollRight)) {
                    visibleItem = div;
                    index = $KD.getAttr(visibleItem, 'kii');
                    index = _deduceIndex.call(this, index);
                    if(config.indices) {
                        if(_isSectionDS(prop.data[0])) {
                            if(index[1] > -1) {
                                visibleIndices.push({sectionIndex: index[0], itemIndex: index[1]});
                            }
                        } else {
                            visibleIndices.push({itemIndex: index[1]});
                        }
                    } else if(index[1] > -1) {
                        visibleItems.push($KW.model(visibleItem));
                    }
                }
            }, this);
        }

        return config.indices ? visibleIndices : visibleItems;
    };


    //All widget file must have this variable
    //All the functions will be called in the scope of widget instance
    var _getter = {
        CollectionView: {
            contentOffset: function FlexScrollContainer$_getter_contentOffset(value) {
                return {x:value.x, y:value.y};
            },

            contentOffsetMeasured: function FlexScrollContainer$_getter_contentOffsetMeasured(value) {
                var scroll = this._kwebfw_.ui.scroll;

                value.x = scroll.x;
                value.y = scroll.y;

                return {x:value.x, y:value.y};
            },

            data: function CollectionView$_getter_data(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, data = [];

                if(!value) {
                    return value;
                }
                if(!_isSectionDS(value)) {
                    data = value.slice(0);
                } else {
                    $KU.each(value, function(section) {
                        data.push([section[0], section[1].slice(0), section[2]]);
                    });
                }

                return data;
            },

            selectedItemIndex: function CollectionView$_getter_selectedItemIndex(value) {
                var prop = this._kwebfw_.prop, index = null;

                if(prop.selectedItemIndex) {
                    if(value[0] === -1) {
                        index = [0, value[1]];
                    } else {
                        index = value.slice(0);
                    }
                }

                return index;
            },

            selectedItemIndices: function CollectionView$_getter_selectedItemIndices(/*value*/) {
                var prop = this._kwebfw_.prop, indices = null, s = 0,
                    slen = 0, sindex = 0, rindexes = null;

                if(prop.selectedItemIndices) {
                    indices = [];
                    slen = prop.selectedItemIndices.length;

                    for(s=0; s<slen; s++) {
                        sindex = prop.selectedItemIndices[s][0];
                        rindexes = prop.selectedItemIndices[s][1];

                        if(sindex === -1) sindex = 0;
                        indices.push([sindex, rindexes.slice(0)]);
                    }
                }

                return indices;
            },

            widgetDataMap: function CollectionView$_getter_widgetDataMap(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils;

                return $KU.clone(value);
            }
        }
    };

    //This function will be called in the scope of widget instance
    var _handleScrollDirection = function CollectionView$_handleScrollDirection(el) {
        var $K = voltmx.$kwebfw$, $KD = $K.dom;
        if(this.layout === voltmx.collectionview.LAYOUT_CUSTOM) {
            switch(this.scrollDirection) {
                case voltmx.collectionview.SCROLL_DIRECTION_BOTH:
                    $KD.style(el, 'overflow', 'auto');
                    break;
                case voltmx.collectionview.SCROLL_DIRECTION_VERTICAL:
                    $KD.style(el, {overflowY: 'auto', overflowX: 'hidden'});
                    break;
                case voltmx.collectionview.SCROLL_DIRECTION_HORIZONTAL:
                    $KD.style(el, {overflowY: 'hidden', overflowX: 'auto'});
                    break;
                default:
                    break;
            }
        } else {
            $KD.style(el, {overflowX:'auto', overflowY:'auto'});
        }
    };


    //This function will be called in the scope of widget instance
    var _iterateOverData = function CollectionView$_iterateOverData(data, callback) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils,
            s = 0, r = 0, slen = 0, rlen = 0;

        if(!$KU.is(callback, 'function')) return;

        if($KU.is(data, 'array')) {
            if(_isSectionDS(data[0])) {
                slen = data.length;

                for(s=0; s<slen; s++) {
                    rlen = data[s][1].length;

                    if(data[s][0] && callback.call(this, data[s][0], -1, s) === true) {
                        break;
                    }

                    for(r=0; r<rlen; r++) {
                        if(callback.call(this, data[s][1][r], r, s) === true) {
                            break;
                        }
                    }

                    if(data[s][2] && callback.call(this, data[s][2], -2, s) === true) {
                        break;
                    }
                }
            } else {
                rlen = data.length;

                for(r=0; r<rlen; r++) {
                    if(callback.call(this, data[r], r, -1) === true) {
                        break;
                    }
                }
            }
        }
    };


    //This function will be called in the scope of widget instance
    var _isSectionCollapsed = function CollectionView$_isSectionCollapsed(index) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, data = null,
            _ = this._kwebfw_, prop = _.prop, collapsed = false;

        if(prop.data) {
            if($KU.is(index, 'number') && index >= 0
                && index < prop.data.length) {
                data = prop.data[index][0];

                if(data && $KU.is(data.metaInfo, 'object')
                    && data.metaInfo.collapsed === true) {
                    collapsed = true;
                }
            }
        }

        return collapsed;
    };


    var _isSectionDS = function CollectionView$_isSectionDS(data) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

        if($KU.is(data, 'array')
            && ($KU.is(data[0], 'object') || $KU.is(data[0], 'string') || $KU.is(data[0], 'null'))
            && $KU.is(data[1], 'array')) {
            flag = true;
        }

        return flag;
    };


    //This function will be called in the scope of widget instance
    var _isItemRendered = function CollectionView$_isItemRendered(secIndex, itemIndex) {
        var flag = false, clone = null, r = 0, _ = this._kwebfw_,
            clones = _.clones, items = _.items, rlen = items.length;

        if(clones.length > 0) {
            if(_isSectionDS(_.prop.data[0])) {
                if(itemIndex <= -1) clone = clones[secIndex];
                else clone = clones[secIndex][1][itemIndex];
            } else {
                clone = clones[itemIndex];
            }

            if(clone) {
                for(r=0; r<rlen; r++) {
                    if(items[r] === clone) {
                        flag = true;
                        break;
                    }
                }
            }
        }

        return flag;
    };

    /*eslint-disable no-unused-vars*/
    //This function will be called in the scope of widget instance
    var _isScrollReachingBottom = function CollectionView$_isScrollReachingBottom(scrollTop, offset) {
        var scroleeHeight = -1, viewportHeight = -1, result = -1, flag = false;

        scroleeHeight = this._kwebfw_.minScroleeHeight;
        viewportHeight = this.frame.height;
        result = scrollTop - scroleeHeight - viewportHeight - offset;

        flag = (result >= 0) ? true : false;

        return flag;
    };


    //This function will be called in the scope of widget instance
    var _isScrollReachingTop = function CollectionView$_isScrollReachingTop(scrollTop, offset) {
        var flag = false, result = scrollTop - offset;

        flag = (result <= 0) ? true : false;

        return flag;
    };
    /*eslint-enable no-unused-vars*/


    //This function will be called in the scope of widget instance
    var _lastRenderableItem = function CollectionView$_lastRenderableItem() {
        var data = this._kwebfw_.prop.data, item = null, secIndex = -1, itemIndex = -1;

        if(data) {
            if(!_isSectionDS(data[0])) {
                itemIndex = data.length - 1;

                while(itemIndex >= 0) {
                    if(_canRenderItem.call(this, [-1, itemIndex])) {
                        item = _getClonedTemplate.call(this, [-1, itemIndex], true);
                        break;
                    } else {
                        itemIndex--;
                    }
                }
            } else {
                secIndex = data.length - 1;
                itemIndex = data[secIndex][1].length - 1;

                while(secIndex >= 0) {
                    if(_canRenderItem.call(this, [secIndex, itemIndex])) {
                        item = _getClonedTemplate.call(this, [secIndex, itemIndex], true);
                        break;
                    } else {
                        if(itemIndex === -1) {
                            secIndex--;
                            itemIndex = data[secIndex][1].length - 1;
                        } else {
                            itemIndex--;
                        }
                    }
                }
            }
        }

        return item;
    };


    //This function will be called in the scope of widget instance
    var _nextRenderableItems = function CollectionView$_nextRenderableItems(index, count) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, data = this._kwebfw_.prop.data,
            items = [], tpl = null, startSecIndex = -1, startItemIndex = -1,
            itemIndex = -1, lastItemIndex = -1, lastSecIndex = -1, secIndex = -1;

        index = _deduceIndex.call(this, index);
        startSecIndex = index[0];
        startItemIndex = index[1];

        if(startSecIndex === -1 && startItemIndex === -1) return items;

        if(startSecIndex === -1) {
            itemIndex = startItemIndex + 1;
            lastItemIndex = (data.length - 1);

            while(count > 0 && itemIndex <= lastItemIndex) {
                tpl = _getClonedTemplate.call(this, [-1, itemIndex]);

                if($KU.is(tpl, 'widget') && _canRenderItem.call(this, tpl)) {
                    items.push(tpl);
                    count--;
                }

                itemIndex++;
            }
        } else {
            if(startItemIndex === (data[startSecIndex][1].length - 1)) {
                secIndex = startSecIndex + 1;
                itemIndex = -1;
            } else {
                secIndex = startSecIndex;
                itemIndex = startItemIndex + 1;
            }

            lastSecIndex = (data.length - 1);

            while(count > 0 && secIndex <= lastSecIndex) {
                if(itemIndex === -1) {
                    tpl = _getClonedTemplate.call(this, [secIndex, -1]);

                    if($KU.is(tpl, 'widget') && _canRenderItem.call(this, tpl)) {
                        items.push(tpl);
                        count--;
                    }

                    itemIndex++;
                } else {
                    if(itemIndex === data[secIndex][1].length) {
                        secIndex++;
                        itemIndex = -1;
                    } else {
                        tpl = _getClonedTemplate.call(this, [secIndex, itemIndex]);

                        if($KU.is(tpl, 'widget') && _canRenderItem.call(this, tpl)) {
                            items.push(tpl);
                            count--;
                        }

                        itemIndex++;
                    }
                }
            }
        }

        return items;
    };

    /*eslint-disable*/
    //This function will be called in the scope of widget instance
    var _nextTemplate = function CollectionView$_nextTemplate(index) {
        var data = this._kwebfw_.prop.data, secIndex = -1, itemIndex = -1, next = null;

        index = _deduceIndex.call(this, index);

        if(!(secIndex === -1 && itemIndex === -1)) {
            if(secIndex >= 0) {
                if(secIndex < data.length) {
                    if(itemIndex >= 0) {
                        if(itemIndex < data[secIndex][1].length) {
                            if(itemIndex === (data[secIndex][1].length - 1)) {
                                next = _getClonedTemplate.call(this, [(secIndex + 1), -1], true);
                            } else {
                                next = _getClonedTemplate.call(this, [secIndex, (itemIndex + 1)], true);
                            }
                        }
                    } else {
                        if(data[secIndex][1].length > 0) {
                            next = _getClonedTemplate.call(this, [secIndex, 0], true);
                        }
                    }
                }
            } else if(itemIndex >= 0) {
                if(itemIndex < data.length) {
                    if(itemIndex !== (data.length - 1)) {
                        next = _getClonedTemplate.call(this, [-1, (itemIndex + 1)], true);
                    }
                }
            }
        }

        return next;
    };
    /*eslint-enable*/


    //This function will be called in the scope of widget instance
    var _onDataSet = function CollectionView$_onDataSet() {
        var self = this;

        _resetBookKeepers.call(this, function(index) {
            var secIndex = index[0], itemIndex = index[1];

            /*eslint-disable no-constant-condition*/
            if('TODO:: height of the collectionview can be calculated') {
            /*eslint-enable no-constant-condition*/
                if(secIndex === -1) {
                    if(this._kwebfw_.heights[itemIndex] >= 0) {
                        self._kwebfw_.minScroleeHeight += this._kwebfw_.heights[itemIndex];
                    }
                } else {
                    if(itemIndex === -1) {
                        if(this._kwebfw_.heights[secIndex][0] >= 0) {
                            self._kwebfw_.minScroleeHeight += this._kwebfw_.heights[secIndex][0];
                        }
                    } else {
                        if(this._kwebfw_.heights[secIndex][1][itemIndex] >= 0) {
                            self._kwebfw_.minScroleeHeight += this._kwebfw_.heights[secIndex][1][itemIndex];
                        }
                    }
                }
            }
        });
    };


    //This function will be called in the scope of widget instance
    var _onItemChange = function CollectionView$_onItemChange(secIndex, itemIndex, action, data, count, anim) {
        //<action> can be one of "add" / "remove" / "update"/ addsectionat, setsectionat, removesectionat, addall
        var $K = voltmx.$kwebfw$, $KD = $K.dom, $KW = $K.widget, el = $KW.el(this);

        if(secIndex === -1 && itemIndex === -1) return;

        if(['add', 'update', 'remove'].indexOf(action) !== -1
            && !_isSectionDS(this._kwebfw_.prop.data[0])) secIndex = -1;

        if(action === 'addsectionat') {
            _action.CollectionView[action].call(this, secIndex, itemIndex, data, true, anim);
        } else {
            _action.CollectionView[action].call(this, secIndex, itemIndex, data, count, anim);
        }

        $KD.setAttr(el.scrolee, 'aria-itemcount', _getItemCount.call(this));

        _applyNodeStyles.call(this);
        //Update this._kwebfw_.clones
        //Update this._kwebfw_.heights
        //Update this._kwebfw_.items
        //Update this._kwebfw_.top
        //Update this._kwebfw_.scrollTop
        //Update this._kwebfw_.minScroleeHeight
    };

    /*eslint-disable no-unused-vars*/
    //This function will be called in the scope of widget instance
    var _onScroll = function CollectionView$_onScroll(scrollTop) { //scrollTop can never be less than zero
        var $K = voltmx.$kwebfw$, $KW = $K.widget, el = $KW.el(this), delta = 0;

        if(this._kwebfw_.scrollTop === scrollTop) return;

        delta = Math.abs(this._kwebfw_.scrollTop - scrollTop);

        if(delta <= (_extraHeightToRender - 100)) return;

        if(delta > Math.floor(this._kwebfw_.prop.frame.height/3)) {
            _scrollToRenderNewItems.call(this, scrollTop, el);
        } else {
            if(scrollTop > this._kwebfw_.scrollTop) {
                _scrollDownWithDeltaItems.call(this, delta, el);
            } else {
                _scrollUpWithDeltaItems.call(this, delta, el);
            }
        }
    };


    //This function will be called in the scope of widget instance
    var _onSectionChange = function CollectionView$_onSectionChange(index/*, action*/) {
        //<action> can be one of "add" / "remove" / "update"
        var $K = voltmx.$kwebfw$, $KU = $K.utils, data = this._kwebfw_.prop.data;

        if(!data || !($KU.is(index, 'number') && index >= 0 && index < data.length)) return;

        //Update this._kwebfw_.clones
        //Update this._kwebfw_.heights
        //Update this._kwebfw_.items
        //Update this._kwebfw_.top
        //Update this._kwebfw_.scrollTop
        //Update this._kwebfw_.minScroleeHeight
    };
    /*eslint-enable no-unused-vars*/


    //All widget file must have this variable
    //This functions will be called in the scope of widget instance
    var _populateUnderscore = {
        CollectionView: function CollectionView$_populateUnderscore() {
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
                    $KU.defineProperty(_, 'ns', 'voltmx.ui.CollectionView', null);
                }
            }
            if(!_.name) {
                if($KU.is(this.__$kwebfw$name__, 'string') && this.__$kwebfw$name__) {
                    $KU.defineProperty(_, 'name', this.__$kwebfw$name__, null);
                } else {
                    $KU.defineProperty(_, 'name', 'CollectionView', null);
                }
            }

            if(!_.selectedItems) $KU.defineProperty(_, 'selectedItems', [], null);
            if(!_.ui) $KU.defineProperty(_, 'ui', {}, null);
            $KU.defineProperty(_.ui, 'scroll', {x:0, y:0, width:-1, height:-1, minX:-1, maxX:-1, minY:-1, maxY:-1, status:'ended'}, true);
            if(typeof _.tabIndex !== 'number') {
                $KU.defineProperty(_, 'tabIndex', 0, true);
            }

            //This holds the templateControllers used in this Segment Items
            if(!_.templates) $KU.defineProperty(_, 'templates', {}, null);

            /* ====================== Book keeping properties starts here ====================== */

            //This holds the cloned templates, those will be rendered, and it is a flat list
            if(!_.items) $KU.defineProperty(_, 'items', [], true);

            //This holds the cloned templates, in the same DS as that of this.data
            if(!_.clones) $KU.defineProperty(_, 'clones', [], true);

            //This holds the height of cloned templates, in the same DS as that of this.data
            if(!_.heights) $KU.defineProperty(_, 'heights', [], true);

            //This holds the amount of top padding required for scroll behavior
            if(typeof _.top !== 'number') $KU.defineProperty(_, 'top', 0, true);

            //This holds the last scrolled position
            if(typeof _.scrollTop !== 'number') {
                $KU.defineProperty(_, 'scrollTop', 0, true);
            }

            //This needed for lazy loading, to determine the best size of scrollbar
            if(typeof _.minScroleeHeight !== 'number') {
                $KU.defineProperty(_, 'minScroleeHeight', 0, true);
            }

            if(typeof _.topCutOffAbsoluteIndex !== 'number') {
                $KU.defineProperty(_, 'topCutOffAbsoluteIndex', 0, true);
            }
            if(typeof _.bottomCutOffAbsoluteIndex !== 'number') {
                $KU.defineProperty(_, 'bottomCutOffAbsoluteIndex', 0, true);
            }

            /* ======================= Book keeping properties ends here ======================= */
        }
    };


    //All widget file must have this variable
    //This function will be called in the scope of widget instance
    var _postInitialization = {
        CollectionView: function CollectionView$_postInitialization() {
            this._kwebfw_.invertedDataMap = _getInvertedDataMap(this._kwebfw_.prop.widgetDataMap);
            _onDataSet.call(this);
        }
    };


    //This function will be called in the scope of widget instance
    var _prevRenderableItems = function CollectionView$_prevRenderableItems(index, count) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, data = this._kwebfw_.prop.data,
            items = [], tpl = null, startSecIndex = -1, startItemIndex = -1,
            itemIndex = -1, lastItemIndex = -1, lastSecIndex = -1, secIndex = -1;

        index = _deduceIndex.call(this, index);
        startSecIndex = index[0];
        startItemIndex = index[1];

        if(startSecIndex === -1 && startItemIndex === -1) return items;

        if(startSecIndex === -1) {
            itemIndex = startItemIndex - 1;
            lastItemIndex = 0;

            while(count > 0 && itemIndex >= lastItemIndex) {
                tpl = _getClonedTemplate.call(this, [-1, itemIndex]);

                if($KU.is(tpl, 'widget') && _canRenderItem.call(this, tpl)) {
                    items.splice(0, 0, tpl);
                    count--;
                }

                itemIndex--;
            }
        } else {
            if(startItemIndex === -1) {
                secIndex = startSecIndex - 1;
                itemIndex = (data[secIndex][1].length - 1);
            } else {
                secIndex = startSecIndex;
                itemIndex = startItemIndex - 1;
            }

            lastSecIndex = 0;
            lastItemIndex = 0;

            while(count > 0 && secIndex >= lastSecIndex) {
                if(itemIndex === -1) {
                    tpl = _getClonedTemplate.call(this, [secIndex, -1]);

                    if($KU.is(tpl, 'widget') && _canRenderItem.call(this, tpl)) {
                        items.splice(0, 0, tpl);
                        count--;
                    }

                    secIndex--;
                    itemIndex = this._kwebfw_.clones[secIndex][1].length - 1;
                } else {
                    tpl = _getClonedTemplate.call(this, [secIndex, itemIndex]);

                    if($KU.is(tpl, 'widget') && _canRenderItem.call(this, tpl)) {
                        items.splice(0, 0, tpl);
                        count--;
                    }

                    itemIndex--;
                }
            }
        }

        return items;
    };


    //This function will be called in the scope of widget instance
    /*eslint-disable no-unused-vars*/
    var _prevTemplate = function CollectionView$_prevTemplate(index) {
        var data = this._kwebfw_.prop.data, secIndex = -1, itemIndex = -1, prev = null;

        index = _deduceIndex.call(this, index);

        if(secIndex >= 0
        && !(secIndex === -1 && itemIndex === -1)) {
            if(secIndex < data.length) {
                if(itemIndex >= 0) {
                    if(itemIndex < data[secIndex][1].length) {
                        if(itemIndex === 0) {
                            prev = _getClonedTemplate.call(this, [secIndex, -1], true);
                        } else {
                            prev = _getClonedTemplate.call(this, [secIndex, (itemIndex - 1)], true);
                        }
                    }
                } else {
                    if(secIndex > 0 && data[(secIndex - 1)][1].length > 0) {
                        prev = _getClonedTemplate.call(this, [(secIndex - 1), 0], true);
                    }
                }
            }
        } else if(itemIndex >= 0
        && !(secIndex === -1 && itemIndex === -1)) {
            if(itemIndex < data.length) {
                if(itemIndex > 0) {
                    prev = _getClonedTemplate.call(this, [-1, (itemIndex - 1)], true);
                }
            }
        }


        return prev;
    };
    /*eslint-enable no-unused-vars*/
    //All widget file must have this variable
    //This functions will be called in the scope of widget instance
    var _relayoutActiveTriggerer = {
        CollectionView: function CollectionView$_relayoutActiveTriggerer() {
            return ['data', 'layout'];
        }
    };


    //All widget file must have this variable
    //This functions will be called in the scope of widget instance
    var _relayoutPassiveTriggerer = {
        CollectionView: function CollectionView$_relayoutPassiveTriggerer() {
            return [];
        }
    };


    //This function will be called in the scope of widget instance
    var _renderItems = function CollectionView$_renderItems(clones) {
        var $K = voltmx.$kwebfw$, $KD = $K.dom,
            c = 0, clen = clones.length, fragment = null,
            createItem = function(clone) {
                var $K = voltmx.$kwebfw$, $KW = $K.widget, $KD = $K.dom,
                    item = null, index = _deduceIndex.call(this, clone),
                    absIndex = (_absoluteIndex.call(this, index) + 1);

                item = clone._render();
                $KD.setAttr(item, 'kr', 'cvitem'); //NOTE:: This attr/val has high importance
                $KD.setAttr(item, 'kii', index.join(','));
                //$KD.setAttr(item, 'kwh-click', 'onItemSelect'); //TODO:
                //$KD.setAttr(item, 'kwh-keydown', 'onItemKeyDown');
                //$KD.setAttr(item, 'kwh-keyup', 'onItemKeyUp');
                $KD.setAttr(item, 'role', 'row');
                $KD.setAttr(item, 'tabindex', -1);
                $KD.setAttr(item, 'aria-colcount', 1);
                $KD.setAttr(item, 'aria-itemindex', absIndex);


                $KD.setAttr(item, 'role', 'gridcell');

                $KW.iterate(clone, function(widget) {
                    var $K = voltmx.$kwebfw$, $KD = $K.dom,
                        view = widget._kwebfw_.view;

                    if(view) {
                        $KD.setAttr(view, 'aria-colindex', 1);
                        $KD.setAttr(view, 'aria-colcount', 1);
                        $KD.setAttr(view, 'aria-itemindex', absIndex);
                    }
                }, {tabs:false});


                return item;
            };

        if(clen === 1) {
            fragment = createItem.call(this, clones[0]);
        } else if(clen > 1) {
            fragment = $KD.create();

            for(c=0; c<clen; c++) {
                fragment.appendChild(createItem.call(this, clones[c]));
            }
        }

        return fragment;
    };


    //This function will be called in the scope of widget instance
    var _resetBookKeepers = function CollectionView$_resetBookKeepers(callback) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, data = this._kwebfw_.prop.data;

        this._kwebfw_.top = 0; this._kwebfw_.scrollTop = 0; this._kwebfw_.minScroleeHeight = 0;
        this._kwebfw_.topCutOffAbsoluteIndex = 0; this._kwebfw_.bottomCutOffAbsoluteIndex = 0;
        _flushClones(this._kwebfw_.clones);
        this._kwebfw_.items = []; this._kwebfw_.clones = []; this._kwebfw_.heights = [];

        if(data && data.length > 0 && _shouldLazyLoad.call(this)) {
            if(_isSectionDS(data[0])) {
                $KU.each(data, function(secItem, secIndex) {
                    this._kwebfw_.clones.push([null, []]);
                    this._kwebfw_.heights.push([-1, []]);
                    this._kwebfw_.heights[secIndex][0] = _getItemHeight.call(this, [secIndex, -1]);

                    if($KU.is(callback, 'function')) {
                        callback.call(this, [secIndex, -1]);
                    }

                    $KU.each(secItem[1], function(item, itemIndex) {
                        this._kwebfw_.clones[secIndex][1].push(null);
                        this._kwebfw_.heights[secIndex][1].push(-1);
                        this._kwebfw_.heights[secIndex][1][itemIndex] = _getItemHeight.call(this, [secIndex, itemIndex]);

                        if($KU.is(callback, 'function')) {
                            callback.call(this, [secIndex, itemIndex]);
                        }
                    }, this);
                }, this);
            } else if($KU.is(data[0], 'object')) {
                $KU.each(data, function(item, index) {
                    this._kwebfw_.clones.push(null);
                    this._kwebfw_.heights.push(-1);
                    this._kwebfw_.heights[index] = _getItemHeight.call(this, [-1, index]);

                    if($KU.is(callback, 'function')) {
                        callback.call(this, [-1, index]);
                    }
                }, this);
            }
        }
    };


    //This function will be called in the scope of widget instance
    var _scrollDownWithDeltaItems = function CollectionView$_scrollDownWithDeltaItems(delta, el) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KD = $K.dom, cloneToAdd = null,
            cloneToRemove = null, deltaForAdd = 0, deltaForRemove = 0, count = 0,
            itemsToBeRemovedFromTop = [], itemsToBeAddedToBottom = [], removeIndex = -1;

        cloneToAdd = _nextRenderableItems.call(this, this._kwebfw_.items[(this._kwebfw_.items.length - 1)], 1)[0];
        cloneToRemove = this._kwebfw_.items[0];

        while((cloneToAdd || cloneToRemove) && (delta > deltaForAdd || delta > deltaForRemove)) {
            if(cloneToAdd && delta > deltaForAdd) {
                deltaForAdd += _getItemHeight.call(this, cloneToAdd);
                itemsToBeAddedToBottom.push(cloneToAdd);
            }

            if(cloneToRemove && delta > deltaForRemove) {
                deltaForRemove += _getItemHeight.call(this, cloneToRemove);
                itemsToBeRemovedFromTop.push(cloneToRemove);
            }

            count++;

            cloneToAdd = _nextRenderableItems.call(this, this._kwebfw_.items[(this._kwebfw_.items.length - 1 - count)], 1)[0];
            cloneToRemove = this._kwebfw_.items[count];
        }

        this._kwebfw_.scrollTop += delta;

        if(_absoluteIndex.call(this, itemsToBeRemovedFromTop[0]) <= this._kwebfw_.topCutOffAbsoluteIndex) {
            removeIndex = itemsToBeRemovedFromTop.length - 1;
            deltaForRemove = _getItemHeight.call(this, itemsToBeRemovedFromTop[removeIndex]);

            while(deltaForRemove <= _extraHeightToRender) {
                removeIndex--;
                deltaForRemove += _getItemHeight.call(this, itemsToBeRemovedFromTop[removeIndex]);
            }

            itemsToBeRemovedFromTop.splice((removeIndex + 1 /* 1 or 0 ??? */), (itemsToBeRemovedFromTop.length - removeIndex + 1 /* 1 or 0 ??? */));
        }

        $KU.each(itemsToBeRemovedFromTop, function(clone) {
            var $K = voltmx.$kwebfw$, $KD = $K.dom;
            $KD.removeAt(el.scrolee, 0);
            this._kwebfw_.top += _getItemHeight.call(this, clone);
            this._kwebfw_.items.pop();
        }, this);

        $KU.each(itemsToBeAddedToBottom, function(clone) {
            this._kwebfw_.items.push(clone);
        }, this);

        $KD.add(el.scrolee, _renderItems.call(this, itemsToBeAddedToBottom));

        el.scrolee.style.paddingTop = this._kwebfw_.top + 'px';
    };

    /*eslint-disable no-unused-vars*/
    //This function will be called in the scope of widget instance
    var _scrollReachedBottom = function CollectionView$_scrollReachedBottom() {
        //TODO::
    };


    //This function will be called in the scope of widget instance
    var _scrollReachedTop = function CollectionView$_scrollReachedTop() {
        //TODO::
    };
    /*eslint-enable no-unused-vars*/


    //This function will be called in the scope of widget instance
    var _scrollUpWithDeltaItems = function CollectionView$_scrollUpWithDeltaItems(delta, el) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KD = $K.dom, cloneToAdd = null,
            cloneToRemove = null, deltaForAdd = 0, deltaForRemove = 0, count = 0,
            itemsToBeAddedToTop = [], itemsToBeRemovedFromBottom = [], removeIndex = -1;

        cloneToAdd = _prevRenderableItems.call(this, this._kwebfw_.items[0], 1)[0];
        cloneToRemove = this._kwebfw_.items[(this._kwebfw_.items.length - 1)];

        while((cloneToAdd || cloneToRemove) && (delta > deltaForAdd || delta > deltaForRemove)) {
            if(cloneToAdd && delta > deltaForAdd) {
                deltaForAdd += _getItemHeight.call(this, cloneToAdd);
                itemsToBeAddedToTop.push(cloneToAdd);
            }

            if(cloneToRemove && delta > deltaForRemove) {
                deltaForRemove += _getItemHeight.call(this, cloneToRemove);
                itemsToBeRemovedFromBottom.push(cloneToRemove);
            }

            count++;

            cloneToAdd = _prevRenderableItems.call(this, this._kwebfw_.items[count], 1)[0];
            cloneToRemove = this._kwebfw_.items[(this._kwebfw_.items.length - 1 - count)];
        }

        this._kwebfw_.scrollTop -= delta;

        $KU.each(itemsToBeAddedToTop, function(clone) {
            this._kwebfw_.items.splice(0, 0, clone);
            this._kwebfw_.top -= _getItemHeight.call(this, clone);
        }, this);

        if(_absoluteIndex.call(this, itemsToBeRemovedFromBottom[0]) >= this._kwebfw_.topCutOffAbsoluteIndex) {
            removeIndex = 0;
            deltaForRemove = _getItemHeight.call(this, itemsToBeRemovedFromBottom[removeIndex]);

            while(deltaForRemove <= _extraHeightToRender) {
                removeIndex++;
                deltaForRemove += _getItemHeight.call(this, itemsToBeRemovedFromBottom[removeIndex]);
            }

            itemsToBeRemovedFromBottom.splice((removeIndex + 1 /* 1 or 0 ??? */), (itemsToBeRemovedFromBottom.length - removeIndex + 1 /* 1 or 0 ??? */));
        }

        count = itemsToBeRemovedFromBottom.length;
        while(count > 0) {
            $KD.remove($KD.last(el.scrolee));
            this._kwebfw_.items.splice((this._kwebfw_.items.length-1), 1);
            count--;
        }

        $KD.addAt(el.scrolee, _renderItems.call(this, itemsToBeAddedToTop), 0);

        el.scrolee.style.paddingTop = this._kwebfw_.top + 'px';
    };


    //This function will be called in the scope of widget instance
    var _scrollToRenderNewItems = function CollectionView$_scrollToRenderNewItems(scrollTop, el) {
        var $K = voltmx.$kwebfw$, $KD = $K.dom, height = 0, clone = null;

        clone = _firstRenderableItem.call(this);
        this._kwebfw_.top = 0;
        this._kwebfw_.items = [];
        this._kwebfw_.scrollTop = scrollTop;

        //Populate this._kwebfw_.top
        scrollTop -= _extraHeightToRender;
        while(clone && this._kwebfw_.top <= scrollTop) {
            height = _getItemHeight(clone);
            this._kwebfw_.top += height;
            clone = _nextRenderableItems.call(this, clone, 1);
        }

        //Populate this._kwebfw_.items
        scrollTop = this.frame.height + _extraHeightToRender;
        height = 0;
        while(clone && height <= scrollTop) {
            height += _getItemHeight(clone);
            this._kwebfw_.items.push(clone);
            clone = _nextRenderableItems.call(this, clone, 1);
        }

        $KD.html(el.scrolee, '');
        $KD.add(el.scrolee, _renderItems.call(this, this._kwebfw_.items));
        el.scrolee.style.paddingTop = this._kwebfw_.top + 'px';
    };


    //All the functions will be called in the scope of widget instance
    var _setHorizontalLayout = function CollectionView$_setHorizontalLayout(el) {
        var $K = voltmx.$kwebfw$, $KD = $K.dom;

        $KD.setAttr(el.scrolee, 'kv', voltmx.collectionview.LAYOUT_HORIZONTAL);
        $KD.style(el.scrolee, {'transition': null, 'transform': null, 'width': null});
    };

    var _setVerticalLayout = function CollectionView$_setVerticalLayout(el) {
        var $K = voltmx.$kwebfw$, $KD = $K.dom;

        $KD.setAttr(el.scrolee, 'kv', voltmx.collectionview.LAYOUT_VERTICAL);
        $KD.style(el.scrolee, {'transition': null, 'transform': null, 'width': null});
    };

    var _setCustomLayout = function CollectionView$_setCustomLayout(el) {
        var $K = voltmx.$kwebfw$, $KD = $K.dom;

        $KD.setAttr(el.scrolee, 'kv', voltmx.collectionview.LAYOUT_CUSTOM);
        $KD.style(el.scrolee, {'transition': null, 'transform': null, 'width': null});
    };


    //All widget file must have this variable
    //All the functions will be called in the scope of widget instance
    var _setter = {
        CollectionView: {
            data: function CollectionView$_setter_data(/*old*/) {
                _onDataSet.call(this);
            },

            /*eslint-disable no-unused-vars */
            selectedItemIndex: function CollectionView$_setter_selectedItemIndex(/*old*/) {
                var _ = this._kwebfw_, prop = _.prop, index = -1, deSelectedItem = [];

                if(!_isSectionDS(prop.data[0])) {
                    prop.selectedItemIndex[0] = -1;
                }

                if(!prop.selectedItemIndex) {
                    //TODO
                    deSelectedItem = _.selectedItems.splice(0, _.selectedItems.length);
                } else {
                    if(prop.selectionBehavior === voltmx.collectionview.SINGLE_SELECT) {
                        deSelectedItem = _.selectedItems.splice(0, _.selectedItems.length, prop.selectedItemIndex.slice(0));
                    } else if(prop.selectionBehavior === voltmx.collectionview.MULTI_SELECT) {
                        index = _getIndex(prop.selectedItemIndex, _.selectedItems);

                        if(index !== -1) {
                            deSelectedItem = _.selectedItems.splice(index, 1);
                        } else {
                            _.selectedItems.push(prop.selectedItemIndex.slice(0));
                        }
                    }
                }

                _setSelectedItemsRelatedProperties.call(this);

                if(deSelectedItem.length>0) {
                    _resetItemSelectedSkin.call(this, deSelectedItem);
                }

                _setItemSelectedSkin.call(this);
            },
            /*eslint-enable no-unused-vars */

            selectedItemIndices: function CollectionView$_setter_selectedItemIndices(/*old*/) {
                var prop = this._kwebfw_.prop, items = this._kwebfw_.selectedItems,
                    itemIndexes = null, s = 0, slen = 0, r = 0, rlen = 0,
                    deSelectedItems = items.splice(0, items.length),
                    itemIndices = prop.selectedItemIndices;

                if(itemIndices) {
                    slen = itemIndices.length;

                    for(s=0; s<slen; s++) {
                        itemIndexes = itemIndices[s][1];
                        rlen = itemIndexes.length;

                        for(r=0; r<rlen; r++) {
                            items.push([itemIndices[s][0], itemIndexes[r]]);
                        }
                    }
                }
                _setSelectedItemsRelatedProperties.call(this);

                if(deSelectedItems.length>0) {
                    _resetItemSelectedSkin.call(this, deSelectedItems);
                }

                _setItemSelectedSkin.call(this);
            },

            widgetDataMap: function CollectionView$_setter_widgetDataMap(old) {
                this._kwebfw_.invertedDataMap = _getInvertedDataMap(old);
            }
        }
    };

    var _resetItemSelectedSkin = function CollectionView$_resetItemSelectedSkin(deSelectedItems) {
        var $K = voltmx.$kwebfw$, _ = this._kwebfw_, $KD = $K.dom, prop = _.prop,
            selectedItem = null, selectedSkin = prop.itemSelectedSkin, i = 0;

        if(prop.selectionBehavior === voltmx.collectionview.SINGLE_SELECT) {
            selectedItem = _getIndexedInfo.call(this, deSelectedItems[0], _.clones);
            selectedItem && $KD.removeCls(selectedItem._kwebfw_.view, selectedSkin);
        } else if(prop.selectionBehavior === voltmx.collectionview.MULTI_SELECT) {
            for(i=0; i<deSelectedItems.length; i++) {
                selectedItem = _getIndexedInfo.call(this, deSelectedItems[i], _.clones);
                selectedItem && $KD.removeCls(selectedItem._kwebfw_.view, selectedSkin);
            }
        }
    };

    var _setItemSelectedSkin = function CollectionView$_setItemSelectedSkin() {
        var $K = voltmx.$kwebfw$, _ = this._kwebfw_, $KD = $K.dom, prop = _.prop,
            selectedItem = null, selectedSkin = prop.itemSelectedSkin, i = 0;

        if(prop.selectionBehavior === voltmx.collectionview.SINGLE_SELECT) {
            selectedItem = _getIndexedInfo.call(this, _.selectedItems[0], _.clones);
            selectedItem && $KD.addCls(selectedItem._kwebfw_.view, selectedSkin);
        } else if(prop.selectionBehavior === voltmx.collectionview.MULTI_SELECT) {
            for(i=0; i<_.selectedItems.length; i++) {
                selectedItem = _getIndexedInfo.call(this, _.selectedItems[i], _.clones);
                selectedItem && $KD.addCls(selectedItem._kwebfw_.view, selectedSkin);
            }
        }
    };


    //This function will be called in the scope of widget instance
    var _setSelectedItemsRelatedProperties = function CollectionView$_setSelectedItemsRelatedProperties() {
        var prop = this._kwebfw_.prop, items = this._kwebfw_.selectedItems,
            section = false, indices = {}, r = 0,
            rlen = items.length, sindex = -1, rindex = -1, key = '';

        prop.selectedItemItems = [];

        if(prop.data && prop.data.length > 0) {
            section = _isSectionDS(prop.data[0]);
            prop.selectedItemIndex = (!rlen) ? null : items[(rlen-1)].slice(0);
            prop.selectedItemIndices = (!rlen) ? null : [];

            for(r=0; r<rlen; r++) {
                sindex = items[r][0];
                rindex = items[r][1];

                if(!section) {
                    if(sindex === 0) sindex = -1;
                    prop.selectedItemItems.push(prop.data[rindex]);
                } else {
                    prop.selectedItemItems.push(prop.data[sindex][1][rindex]);
                }

                key = sindex.toString();
                if(!Object.prototype.hasOwnProperty.call(indices, key)) {
                    indices[key] = [];
                }
                indices[key].push(rindex);
            }

            for(key in indices) {
                prop.selectedItemIndices.push([parseInt(key, 10), indices[key]]);
            }
        } else {
            prop.selectedItemIndex = null;
            prop.selectedItemIndices = null;
            items.splice(0, rlen);
        }
    };


    //This function will be called in the scope of widget instance
    var _shouldLazyLoad = function CollectionView$_shouldLazyLoad() {
        /*eslint-disable no-unused-vars */
        var $K = voltmx.$kwebfw$, $KW = $K.widget, flag = false;

        if($KW.isFixedHeight(this)
            && this._kwebfw_.prop.viewType === constants.SEGUI_VIEW_TYPE_TABLEVIEW) {
            flag = true;
        }
        /*eslint-enable no-unused-vars */

        return false; //TODO:: return flag;
    };


    //This function will be called in the scope of widget instance
    var _validateInputIndices = function CollectionView$_validateInputIndices(secIndex, itemIndex, action) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, index = -1,
            data = this._kwebfw_.prop.data, itemIndexBoundary = 0,
            errorMessage = '', secIndexBoundary = 0;

        if(!$KU.is(itemIndex, 'number')) {
            errorMessage = 'Invalid item Index.';
        }

        if(!$KU.is(secIndex, 'undefined') && !$KU.is(secIndex, 'number')) {
            errorMessage = 'Invalid section Index.';
        }

        if(data && data.length > 0) {
            if(_isSectionDS(data[0])) {//TODO header can be null
                index = _deduceIndex.call(this, secIndex+','+itemIndex);
                secIndexBoundary = data.length;

                if(action === 'addsectionat') secIndexBoundary = secIndexBoundary + 1;

                if(index[0] === -1 || index[0] >= secIndexBoundary) {
                    errorMessage = 'Invalid section index.';
                } else if(['add', 'update', 'remove'].indexOf(action) !== -1) {
                    itemIndexBoundary = data[secIndex][1].length;
                    if(action === 'add') itemIndexBoundary = itemIndexBoundary + 1;
                }
            } else {
                if(!$KU.is(secIndex, 'undefined') && secIndex !== 0) {
                    errorMessage = 'Invalid section index.';
                }

                index = _deduceIndex.call(this, '-1,'+itemIndex);
                itemIndexBoundary = data.length;
                if(action === 'add') itemIndexBoundary = itemIndexBoundary + 1;
            }

            if(action !== 'addsectionat' && errorMessage === ''
                && (index[1] === -2 || index[1] >= itemIndexBoundary)) {
                errorMessage = 'Invalid item index.';
            }
        } else {
            if(action !== 'add' && action !== 'addsectionat') {
                errorMessage = 'No data exists.';
            } else if(action === 'addsectionat' && secIndex !== 0) {
                // addsectionat action secIndex rather than ZERO not allowed
                errorMessage = 'Invalid section index.';
            } else if(action === 'add') {
                if(itemIndex !== 0) {
                    // add action itemIndex rather than ZERO not allowed
                    errorMessage = 'Invalid item index.';
                } else if(!$KU.is(secIndex, 'undefined') && secIndex !== 0) {
                    // add action secIndex should be either -1 or undefined
                    errorMessage = 'Invalid section index.';
                }
            }
        }

        return errorMessage;
    };


    //All the functions will be called in the scope of widget instance
    var _updateSelectionBehavior = function CollectionView$_updateSelectionBehavior() {
        _clearSelectedIndices.call(this);
    };


    //This function will be called in the scope of widget instance
    var _updateBottomCutOffAbsoluteIndex = function CollectionView$_updateBottomCutOffAbsoluteIndex() {
        var height = 0, clone = null;

        clone = _lastRenderableItem.call(this);

        while(clone && height < _extraHeightToRender) {
            height += _getItemHeight.call(this, clone);

            if(height < _extraHeightToRender) {
                clone = _prevRenderableItems.call(this, clone, 1)[0];
            }
        }

        this._kwebfw_.bottomCutOffAbsoluteIndex = _absoluteIndex.call(this, clone);
    };


    //This function will be called in the scope of widget instance
    var _updateIndexes = function CollectionView$_updateIndexes(fromIndex, ofSectionIndex) {
        var $K = voltmx.$kwebfw$, $KW = $K.widget, $KD = $K.dom,
            prop = this._kwebfw_.prop, data = prop.data, r = 0, rlen = 0,
            clones = this._kwebfw_.clones, s = 0, slen = 0, el = null;

        var updateIndex = function(collectionviewmodel, clone, index) {
            var $K = voltmx.$kwebfw$, $KW = $K.widget, $KU = $K.utils,
                $KD = $K.dom, absIndex = null, li = null;

            if(!$KU.is(clone, 'null') && clone._kwebfw_.view) {
                li = $KD.closest(clone._kwebfw_.view, 'kr', 'cvitem');

                if(li) {
                    absIndex = (_absoluteIndex.call(collectionviewmodel, index) + 1);
                    $KD.setAttr(li, 'kii', index);
                    $KD.setAttr(li, 'aria-itemindex', absIndex);
                }
            }

            $KW.iterate(clone, function(model) {
                var $K = voltmx.$kwebfw$, $KW = $K.widget,
                    $KD = $K.dom, _ = model._kwebfw_;

                _.ii = index;

                if(_.view) {
                    $KD.setAttr(_.view, 'kwi', index);
                    $KW.replaceWAPIndex(model, index);
                    $KD.setAttr(_.view, 'kwp', _.wap);
                }
            }, {tabs:false});
        };

        if(data) {
            if(_isSectionDS(data[0])) {//TODO header can be null
                slen = clones.length;
                if(ofSectionIndex === -1) { //Section has changed
                    //Change index of items[s][0] and items[s][1][r]
                    for(s=fromIndex; s<slen; s++) {
                        updateIndex(this, clones[s][0], (s + ',-1'));

                        rlen = clones[s][1].length;
                        for(r=0; r<rlen; r++) {
                            updateIndex(this, clones[s][1][r], (s + ',' + r));
                        }
                        updateIndex(this, clones[s][2], (s + ',-2'));
                    }
                } else { //Item of a particular section has changed
                    //Change index of items[r]
                    clones = clones[ofSectionIndex][1];

                    rlen = clones.length;
                    for(r=fromIndex; r<rlen; r++) {
                        updateIndex(this, clones[r], (ofSectionIndex + ',' + r));
                    }
                }
            } else { //Item of a non-sectionable segment has changed
                //Change index of items[r]
                rlen = clones.length;
                for(r=fromIndex; r<rlen; r++) {
                    updateIndex(this, clones[r], ('-1,' + r));
                }
            }

            el = $KW.el(this);
            $KD.setAttr(el.scrolee, 'aria-itemcount', _getItemCount.call(this));
        }
    };

    //This function will be called in the scope of widget instance
    var _updateSectionFooterSkin = function CollectionView$_updateSectionFooterSkin() {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, headerItems = [];

        $KU.each(this._kwebfw_.clones, function(record/*, index*/) {
            headerItems.push(record[2]);
        });

        $KU.each(headerItems, function(clone, index) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils, $KD = $K.dom,
                div = null;

            if(!$KU.is(clone, 'null') && clone._kwebfw_.view) {
                div = $KD.closest(clone._kwebfw_.view, 'kr', 'cvitem');
            }

            if(div) {
                _applyItemAndHeaderSkin.call(this, div, clone, index);
            }
        }, this);
    };

    //This function will be called in the scope of widget instance
    var _updateSectionHeaderSkin = function CollectionView$_updateSectionHeaderSkin() {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, headerItems = [];

        $KU.each(this._kwebfw_.clones, function(record/*, index*/) {
            headerItems.push(record[0]);
        });

        $KU.each(headerItems, function(clone, index) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils, $KD = $K.dom,
                div = null;

            if(!$KU.is(clone, 'null') && clone._kwebfw_.view) {
                div = $KD.closest(clone._kwebfw_.view, 'kr', 'cvitem');
            }

            if(div) {
                _applyItemAndHeaderSkin.call(this, div, clone, index);
            }
        }, this);
    };


    //This function will be called in the scope of widget instance
    var _updateItemSkin = function CollectionView$_updateItemSkin() {
        var $K = voltmx.$kwebfw$, $KU = $K.utils;
        $KU.each(this._kwebfw_.items, function(clone, index) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils, $KD = $K.dom,
                div = null;

            if(!$KU.is(clone, 'null') && clone._kwebfw_.view) {
                div = $KD.closest(clone._kwebfw_.view, 'kr', 'cvitem');
            }

            if(div) {
                _applyItemAndHeaderSkin.call(this, div, clone, index);
            }
        }, this);
    };


    var _updateScrollDirection = function CollectionView$__updateScrollDirection() {
        var $K = voltmx.$kwebfw$, $KW = $K.widget, el = $KW.el(this);
        _handleScrollDirection.call(this, el.scrolee);
    };


    //This function will be called in the scope of widget instance
    var _updateSpecialProperties = function CollectionView$_updateSpecialProperties(widget) {
        widget._kwebfw_.oid = this._kwebfw_.uid;
        widget._kwebfw_.wap = this._kwebfw_.wap + ('[' + widget._kwebfw_.ii + ']_') + widget._kwebfw_.wap;
    };


    //This function will be called in the scope of widget instance
    var _updateTopCutOffAbsoluteIndex = function CollectionView$_updateTopCutOffAbsoluteIndex() {
        var height = 0, clone = null;

        clone = _firstRenderableItem.call(this);

        while(clone && height < _extraHeightToRender) {
            height += _getItemHeight.call(this, clone);

            if(height < _extraHeightToRender) {
                clone = _nextRenderableItems.call(this, clone, 1)[0];
            }
        }

        this._kwebfw_.topCutOffAbsoluteIndex = _absoluteIndex.call(this, clone);
    };
    var _valid = {
        CollectionView: {
            bounces: function CollectionView$_valid_bounces(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'boolean')) {
                    flag = true;
                }

                return flag;
            },

            contentOffset: function CollectionView$_valid_contentOffset(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'object')
                && $KU.is(value.x, 'size')
                && $KU.is(value.y, 'size')) {
                    flag = true;
                }

                return flag;
            },

            data: function CollectionView$_valid_data(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'array') || $KU.is(value, 'null')) {
                    flag = true;
                }

                return flag;
            },

            dockSectionHeaders: function CollectionView$_valid_dockSectionHeaders(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'boolean')) {
                    flag = true;
                }

                return flag;
            },

            itemFocusSkin: function CollectionView$_valid_itemFocusSkin(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'object')
                || ($KU.is(value, 'string') && value.split(' ').length === 1)) {
                    flag = true;
                }

                return flag;
            },

            itemSelectedSkin: function CollectionView$_valid_itemSelectedSkin(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'object')
                || ($KU.is(value, 'string') && value.split(' ').length === 1)) {
                    flag = true;
                }

                return flag;
            },


            itemSkin: function CollectionView$_valid_itemSkin(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'object')
                || ($KU.is(value, 'string') && value.split(' ').length === 1)) {
                    flag = true;
                }

                return flag;
            },

            itemTemplate: function CollectionView$_valid_itemTemplate(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'widget', 'FlexContainer') || $KU.is(value, 'string')) {
                    flag = true;
                }

                return flag;
            },

            layout: function CollectionView$_valid_layout(value) {
                var flag = false, options = [
                    voltmx.collectionview.LAYOUT_VERTICAL,
                    voltmx.collectionview.LAYOUT_HORIZONTAL,
                    voltmx.collectionview.LAYOUT_CUSTOM
                ];

                if(options.indexOf(value) >= 0) {
                    flag = true;
                }

                return flag;
            },

            minItemSpace: function CollectionView$_valid_minItemSpace(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'string')) {
                    value = value.toLowerCase();

                    if($K.F.EIWP && $KU.is(value, 'numeric')) {
                        value = parseFloat(value, 10);
                    }
                }

                flag = $KU.is(value, 'size', true);

                return (flag ? [value, flag] : flag);
            },

            minLineSpace: function CollectionView$_valid_minLineSpace(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'string')) {
                    value = value.toLowerCase();

                    if($K.F.EIWP && $KU.is(value, 'numeric')) {
                        value = parseFloat(value, 10);
                    }
                }

                flag = $KU.is(value, 'size', 'positive');

                return (flag ? [value, flag] : true);
            },

            onItemSelect: function CollectionView$_valid_onItemSelect(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'function') || $KU.is(value, 'null')) {
                    flag = true;
                }

                if(!flag && $K.F.EIWP) {
                    if($KU.is(value, 'undefined')) {
                        flag = [null, true];
                    }
                }

                return flag;
            },

            onItemDisplay: function CollectionView$_valid_onItemDisplay(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'function') || $KU.is(value, 'null')) {
                    flag = true;
                }

                return flag;
            },

            onScrollStart: function CollectionView$_valid_onScrollStart(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'function') || $KU.is(value, 'null')) {
                    flag = true;
                }

                if(!flag && $K.F.EIWP) {
                    if($KU.is(value, 'undefined')) {
                        flag = [null, true];
                    }
                }

                return flag;
            },

            onScrolling: function CollectionView$_valid_onScrolling(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'function') || $KU.is(value, 'null')) {
                    flag = true;
                }

                if(!flag && $K.F.EIWP) {
                    if($KU.is(value, 'undefined')) {
                        flag = [null, true];
                    }
                }

                return flag;
            },

            onScrollEnd: function CollectionView$_valid_onScrollEnd(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'function') || $KU.is(value, 'null')) {
                    flag = true;
                }

                if(!flag && $K.F.EIWP) {
                    if($KU.is(value, 'undefined')) {
                        flag = [null, true];
                    }
                }

                return flag;
            },

            pullToRefreshView: function CollectionView$_valid_pullToRefreshView(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'widget') || $KU.is(value, 'string')) {
                    flag = true;
                }

                return flag;
            },

            pushToRefreshView: function CollectionView$_valid_pushToRefreshView(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'widget') || $KU.is(value, 'string')) {
                    flag = true;
                }

                return flag;
            },

            reachingBeginningOffset: function CollectionView$_valid_reachingBeginningOffset(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'object')
                && $KU.is(value.x, 'string')
                && $KU.is(value.x, 'size')
                && $KU.is(value.y, 'string')
                && $KU.is(value.y, 'size')) {
                    flag = true;
                }

                if($KU.is(value, 'null')) {
                    //TODO:
                    flag = true;
                }

                return flag;
            },

            reachingEndOffset: function CollectionView$_valid_reachingEndOffset(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'object')
                && $KU.is(value.x, 'string')
                && $KU.is(value.x, 'size')
                && $KU.is(value.y, 'string')
                && $KU.is(value.y, 'size')) {
                    flag = true;
                }

                if($KU.is(value, 'null')) {
                    //TODO:
                    flag = true;
                }

                return flag;
            },

            releaseToPullRefreshView: function CollectionView$_valid_releaseToPullRefreshView(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'widget') || $KU.is(value, 'string')) {
                    flag = true;
                }

                return flag;
            },

            releaseToPushRefreshView: function CollectionView$_valid_releaseToPushRefreshView(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'widget') || $KU.is(value, 'string')) {
                    flag = true;
                }

                return flag;
            },

            retainSelection: function CollectionView$_valid_retainSelection(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'boolean')) {
                    flag = true;
                }

                return flag;
            },

            scrollDirection: function CollectionView$_valid_scrollDirection(value) {
                var flag = false, options = [
                    voltmx.collectionview.SCROLL_DIRECTION_BOTH,
                    voltmx.collectionview.SCROLL_DIRECTION_HORIZONTAL,
                    voltmx.collectionview.SCROLL_DIRECTION_VERTICAL
                ];

                if(options.indexOf(value) >= 0) {
                    flag = true;
                }

                return flag;
            },

            scrollingEvents: function SegmentUI2$_valid_scrollingEvents(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'object')) {
                    flag = true;
                }

                return flag;
            },

            sectionFooterSkin: function CollectionView$_valid_sectionFooterSkin(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'object')
                || ($KU.is(value, 'string') && value.split(' ').length === 1)) {
                    flag = true;
                }

                return flag;
            },

            sectionFooterTemplate: function CollectionView$_valid_sectionFooterTemplate(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'widget', 'FlexContainer') || $KU.is(value, 'string')) {
                    flag = true;
                }

                return flag;
            },

            sectionHeaderSkin: function CollectionView$_valid_sectionHeaderSkin(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'object')
                || ($KU.is(value, 'string') && value.split(' ').length === 1)) {
                    flag = true;
                }

                return flag;
            },

            sectionHeaderTemplate: function CollectionView$_valid_sectionHeaderTemplate(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'widget', 'FlexContainer') || $KU.is(value, 'string')) {
                    flag = true;
                }

                return flag;
            },

            selectedItemIndex: function CollectionView$_valid_selectedItemIndex(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false,
                    prop = this._kwebfw_.prop;

                if($KU.is(value, 'array') || $KU.is(value, 'null')) {
                    flag = true;
                }

                if($KU.is(value, 'array') && Object.prototype.hasOwnProperty.call(prop, 'data')
                && Object.prototype.hasOwnProperty.call(prop, 'selectedItemIndex')) {
                    flag = _validIndex.call(this, value.slice(0), true);
                }

                return flag;
            },

            /*eslint-disable no-unused-vars */
            selectedItemIndices: function CollectionView$_valid_selectedItemIndices(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = true,
                    s = 0, slen = 0, r = 0, rlen = 0, _ = this._kwebfw_,
                    prop = _.prop, secIndex = -1, itemIndexes = [], count = 0;

                if($KU.is(value, 'array')) {
                    slen = value.length;
                    for(s=0; s<slen; s++) {
                        if(flag === false) {
                            break;
                        } else {
                            secIndex = value[s][0];
                            itemIndexes = value[s][1];

                            rlen = itemIndexes.length;
                            for(r=0; r<rlen; r++) {
                                flag = _validIndex.call(this, [secIndex, itemIndexes[r]]);
                                if(flag === false) break;
                                else count++;
                                //TODO
                                /*if(!(prop.viewType === constants.SEGUI_VIEW_TYPE_TABLEVIEW
                                && prop.selectionBehavior === constants.SEGUI_MULTI_SELECT_BEHAVIOR)) {
                                    if(count > 1) flag = false;
                                }*/
                            }
                        }
                    }
                    if(flag && value[0][0] === 0 && !_isSectionDS(prop.data[0])) {
                        value[0][0] = -1;
                        flag = [value, true];
                    }
                } else if(!$KU.is(value, 'null')) {
                    flag = false;
                }

                return flag;
            },
            /*eslint-enable no-unused-vars */

            selectedItemItems: function CollectionView$_valid_selectedItemItems(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'array')) {
                    flag = true;
                }

                return flag;
            },

            selectionBehavior: function CollectionView$_valid_selectionBehavior(value) {
                var flag = false, options = [
                    voltmx.collectionview.SINGLE_SELECT,
                    voltmx.collectionview.MULTI_SELECT
                ];

                if(options.indexOf(value) >= 0) {
                    flag = true;
                }

                return flag;
            },

            showScrollbars: function CollectionView$_valid_showScrollbars(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'boolean')) {
                    flag = true;
                }

                return flag;
            },


            widgetDataMap: function CollectionView$_valid_widgetDataMap(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'object')) {
                    flag = true;
                }

                return flag;
            }
        }
    };


    //This function will be called in the scope of widget instance
    var _validIndex = function CollectionView$_validIndex(index, mutate) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false,
            data = this._kwebfw_.prop.data, sectionable = false;

        if(data && data.length && $KU.is(index, 'array') && index.length === 2
        && $KU.is(index[0], 'number') && $KU.is(index[1], 'number')) {
            sectionable = _isSectionDS(data[0]);//TODO header can be null

            if(index[0] === 0 && !sectionable) {
                index[0] = -1;
            }

            if(index[0] < -1) index[0] = -1;
            if(index[1] < -1) index[1] = -1;

            if(!sectionable) {
                if(index[0] === -1 && index[1] >= 0 && index[1] < data.length) {
                    flag = true;
                }
            } else if(index[0] >= 0 && index[0] < data.length) {
                if(index[1] >= -1 && index[1] < data[index[0]][1].length) {
                    flag = true;
                }
            }
        }

        return (mutate === true && flag) ? [index, true] : flag;
    };


    //All widget file must have this variable
    //All the functions will be called in the scope of widget instance
    //Any property here, which is set to "false", will not create a setter
    var _view = {
        CollectionView: {
            alternateItemSkin: function CollectionView$_view_alternateItemSkin(/*el, old*/) {
                _updateItemSkin.call(this);
            },

            bounces: true,

            contentOffset: function CollectionView$_view_contentOffset(/*el, old*/) {
                this.setContentOffset(this.contentOffset, true);
            },

            contentOffsetMeasured: false,

            data: function CollectionView$_view_data(el/*, old*/) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, $KD = $K.dom,
                    prop = this._kwebfw_.prop, clone = null,
                    height = 0;

                $KD.setAttr(el.scrolee, 'aria-itemcount', _getItemCount.call(this));
                $KD.html(el.scrolee, '');
                this._kwebfw_.items = [];

                if(prop.data && prop.data.length) {
                    if(_shouldLazyLoad.call(this)) {
                        clone = _firstRenderableItem.call(this);
                        _updateTopCutOffAbsoluteIndex.call(this);
                        _updateBottomCutOffAbsoluteIndex.call(this);

                        if($KU.is(clone, 'widget')) {
                            this._kwebfw_.items.push(clone);
                            height += _getItemHeight.call(this, clone);

                            while($KU.is(clone, 'widget') && height < (prop.frame.height + _extraHeightToRender)) {
                                clone = _nextRenderableItems.call(this, clone._kwebfw_.ii, 1)[0];

                                if($KU.is(clone, 'widget')) {
                                    this._kwebfw_.items.push(clone);
                                    height += _getItemHeight.call(this, clone);
                                }
                            }
                        }


                        if(this._kwebfw_.items.length) {
                            $KD.add(el.scrolee, _renderItems.call(this, this._kwebfw_.items));
                        }

                        //TODO:: this._kwebfw_.top and this._kwebfw_.minScroleeHeight
                        $KD.style(el.scrolee, {paddingTop:(this._kwebfw_.top + 'px'), height:(this._kwebfw_.minScroleeHeight + 'px')});
                    } else {
                        _iterateOverData.call(this, prop.data, function(data, itemIndex, secIndex) {
                            clone = _getClonedTemplate.call(this, [secIndex, itemIndex]);
                            clone && _cleanupLayoutProps(clone, this.layout, itemIndex < 0);
                            clone && this._kwebfw_.items.push(clone);
                        });

                        if(this._kwebfw_.items.length) {
                            $KD.add(el.scrolee, _renderItems.call(this, this._kwebfw_.items));
                        }
                        _applyNodeStyles.call(this);
                    }
                }
            },

            dockSectionHeaders: true,

            itemFocusSkin: true,

            itemSelectedSkin: true,

            itemSkin: function CollectionView$_view_itemSkin(/*el, old*/) {
                _updateItemSkin.call(this);
            },

            scrollDirection: function CollectionView$_view_scrollDirection(/*el, old*/) {
                _updateScrollDirection.call(this);
            },

            itemTemplate: true,

            layout: function CollectionView$_view_layout(el/*, old*/) {
                if(this._kwebfw_.prop.layout === voltmx.collectionview.LAYOUT_HORIZONTAL) {
                    _setHorizontalLayout.call(this, el);
                } else if(this._kwebfw_.prop.layout === voltmx.collectionview.LAYOUT_VERTICAL) {
                    _setVerticalLayout.call(this, el);
                } else {
                    _setCustomLayout.call(this, el);
                }
            },

            minItemSpace: function CollectionView$_view_minItemSpace(/*el, old*/) {
                _applyLineSpaceAndItemSpace.call(this);
            },

            minLineSpace: function CollectionView$_view_minLineSpace(/*el, old*/) {
                _applyLineSpaceAndItemSpace.call(this);
            },

            onItemSelect: true,

            onItemDisplay: true,

            pullToRefreshView: true,

            pushToRefreshView: true,

            reachingBeginningOffset: true,

            reachingEndOffset: true,

            releaseToPullRefreshView: true,

            releaseToPushRefreshView: true,

            retainSelection: true,

            scrollingEvents: true,

            sectionFooterSkin: function CollectionView$_view_sectionHeaderSkin(/*el, old*/) {
                var prop = this._kwebfw_.prop;

                if(prop.data && prop.data.length > 0 && _isSectionDS(prop.data[0])) {
                    _updateSectionFooterSkin.call(this);
                }
            },

            sectionFooterTemplate: true,

            sectionHeaderSkin: function CollectionView$_view_sectionHeaderSkin(/*el, old*/) {
                var prop = this._kwebfw_.prop;

                if(prop.data && prop.data.length > 0 && _isSectionDS(prop.data[0])) {
                    _updateSectionHeaderSkin.call(this);
                }
            },

            sectionHeaderTemplate: true,

            selectedItemIndex: function CollectionView$_view_selectedItemIndex(/*el, old*/) {
                var $K = voltmx.$kwebfw$, $KW = $K.widget, _ = this._kwebfw_,
                    prop = _.prop, selectedItem = null;

                if($KW.visible(this) && prop.selectedItemIndex) {
                    //_.setFocus is set in voltmxevent.js _setOwnerSelectedIndex.CollectionView function
                    if(_.setFocus !== false) { //IMP:: Must compare with boolean false
                        selectedItem = _getIndexedInfo.call(this, prop.selectedItemIndex, _.clones);
                        selectedItem.setFocus(true); // selectedItem might be null ??

                        if($KW.isFixedHeight(this)) {
                            $KW.scrollElementToParentScroller(selectedItem);
                        }
                    }
                }
            },

            selectedItemIndices: true,

            selectedItemItems: false,

            selectionBehavior: function CollectionView$_view_selectionBehavior(/*el, old*/) {
                _updateSelectionBehavior.call(this);
            },

            showScrollbars: true,

            widgetDataMap: true
        }
    };


    Object.defineProperty(voltmx.ui, 'CollectionView', {configurable:false, enumerable:false, writable:false, value:(function() {
        var $K = voltmx.$kwebfw$;


        /**
         * voltmx.ui.CollectionView constructor.
         *
         * @class
         * @namespace   voltmx.ui
         * @extends     voltmx.ui.BasicWidget
         * @author      Goutam Sahu <goutam.sahu@voltmx.com>
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
        var CollectionView = function CollectionView(bconfig, lconfig, pspconfig) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils, self = this,
                dependentPropertiesValidationMessage = '', prop = null, p = null;

            if(!$KU.is(bconfig, 'object')) bconfig = {};

            if(!bconfig.isPreValidated) {
                prop = {
                    alternateItemSkin: '',
                    bounces: true, //Only for TABLE_VIEW //In doc available, but in SPA code not available
                    containerHeight: '', //In doc not available, but in SPA code available
                    containerHeightReference: '', //In doc not available, but in SPA code available
                    contentOffset: null, //In doc not available, but in SPA code available
                    contentOffsetMeasured: {x: 0, y: 0},
                    data: null,
                    dockSectionHeaders: false,
                    enableScrollBounce: true, //In doc not available, but in SPA code available
                    layout: voltmx.collectionview.LAYOUT_VERTICAL,
                    needPageIndicator: true,
                    onItemSelect: null,
                    onItemDisplay: null,
                    onScrollStart: null,
                    onScrolling: null,
                    onScrollEnd: null,
                    retainSelection: false,
                    itemFocusSkin: '',
                    itemSelectedSkin: '',
                    itemSkin: '',
                    itemTemplate: null,
                    scrollingEvents: {},
                    sectionFooterSkin: '',
                    sectionFooterTemplate: null,
                    sectionHeaderSkin: '',
                    sectionHeaderTemplate: null,
                    selectedItemIndex: null,
                    selectedItemIndices: null,
                    selectedItemItems: [],
                    selectionBehavior: voltmx.collectionview.SINGLE_SELECT,
                    showScrollbars: true,
                    widgetDataMap: {}
                };
            }

            _populateUnderscore.CollectionView.call(this);

            if(!$KU.is(bconfig.id, 'string') || !bconfig.id) {
                bconfig.id = (this._kwebfw_.name + $KU.uid());
            }

            CollectionView.base.call(this, bconfig, lconfig, pspconfig);

            if(!bconfig.isPreValidated) {
                if($KU.is(_dependentPropertiesValidationMessage.CollectionView, 'function')) {
                    dependentPropertiesValidationMessage = _dependentPropertiesValidationMessage.CollectionView.call(this, prop, bconfig, lconfig, pspconfig);
                }
            }

            if(dependentPropertiesValidationMessage) {
                throw new Error(dependentPropertiesValidationMessage);
            } else {
                if(!bconfig.isPreValidated) {
                    //Defaulting to platfom values specific to CollectionView
                    $KU.each(prop, function(value, key) {
                        var $K = voltmx.$kwebfw$, $KU = $K.utils,
                            $KW = $K.widget, valid = false, message = '';

                        if(!Object.prototype.hasOwnProperty.call(bconfig, key)) {
                            bconfig[key] = value;
                        } else if($KW.getNonConstructorProperties(self._kwebfw_.name).indexOf(key) >= 0) {
                            throw new Error('<' + key + '> is a non-constructor property of <' + self._kwebfw_.ns + '> class.');
                        } else if(!$KU.is(_valid.CollectionView[key], 'function')) {
                            throw new Error('<' + key + '> is available in default widget properties of <voltmx.ui.CollectionView>, but not in <_valid.CollectionView> namespace.');
                        } else {
                            valid = _valid.CollectionView[key].call(self, bconfig[key]);
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

                //Defining Getters/Setters specific to CollectionView
                $KU.each(_view.CollectionView, function(value, key) {
                    var $K = voltmx.$kwebfw$, $KU = $K.utils;

                    $KU.defineProperty(self._kwebfw_.prop, key, bconfig[key], {configurable:false, enumerable:true, writable:true});

                    $KU.defineGetter(self, key, function CollectionView$_getter() {
                        var $K = voltmx.$kwebfw$, $KU = $K.utils;

                        if($KU.is(_getter.CollectionView[key], 'function')) {
                            return _getter.CollectionView[key].call(this, this._kwebfw_.prop[key]);
                        }
                        return this._kwebfw_.prop[key];
                    }, true);

                    $KU.defineSetter(self, key, function CollectionView$_setter(val) {
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
                                valid = _valid.CollectionView[key].call(this, val);
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

                                    if($KU.is(_setter.CollectionView[key], 'function')) {
                                        _setter.CollectionView[key].call(this, old);
                                    }

                                    if(_relayoutActiveTriggerer.CollectionView().indexOf(key) >= 0) {
                                        $KW.markRelayout(this);
                                    }

                                    if(_relayoutPassiveTriggerer.CollectionView().indexOf(key) >= 0) {
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

                if(bconfig.isPreValidated) {
                    p = this._kwebfw_.prop;

                    if($KU.is(p.contentOffset, undefined)) p.contentOffset = null;
                    if($KU.is(p.contentOffsetMeasured, undefined)) p.contentOffsetMeasured = {x: 0, y: 0};
                    if($KU.is(p.selectedItemIndex, undefined)) p.selectedItemIndex = null;
                }

                if($KU.is(_postInitialization.CollectionView, 'function')) {
                    _postInitialization.CollectionView.call(this);
                }
            }

            pspconfig = lconfig = bconfig = null; //For GC
        };


        $K.utils.inherits(CollectionView, voltmx.ui.BasicWidget);


        /**
         * Takes care of flushing out the widget reference to clean memory.
         *
         * @access      protected
         * @method      _flush
         * @memberof    voltmx.ui.CollectionView
         * @author      Goutam Sahu <goutam.sahu@voltmx.com>
         *
         * @returns     void
         */
        var collectionview_flush = function CollectionView$_flush(config) {
            var $super = voltmx.ui.CollectionView.base.prototype;

            _flushClones.call(this, this._kwebfw_.clones, config);
            $super._flush.call(this);
        };


        /**
         * Builds the view layer for CollectionView widget.
         *
         * @override
         * @access      protected
         * @method      _render
         * @memberof    voltmx.ui.CollectionView
         * @author      Goutam Sahu <goutam.sahu@voltmx.com>
         *
         * @returns     {HTMLElement} – CollectionView view.
         */
        var collectionview_render = function CollectionView$_render(tag, context) {
            var $super = voltmx.ui.CollectionView.base.prototype, _ = this._kwebfw_,
                $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget,
                $KD = $K.dom, docker = null, view = _.view, blocker = null,
                scrolee = null, hScroll = null, vScroll = null, el = null;

            if(!$KU.is(context, 'object')) context = {};

            if(this.isVisible || $K.F.RIVW) {
                if(!view) {
                    scrolee = $KD.create('DIV', {role:'grid', 'kv': this.layout});//todo
                    docker = $KD.create('DIV', {kr:'docker'}, {position:'absolute', top:'0px', left:'left', width:'100%'});
                    blocker = $KD.create('DIV', {kr:'blocker'}, {position:'absolute', top:'0px', left:'left', width:'100%', height:'100%'});

                    $KD.add(docker, blocker);

                    if($KU.scrollType() !== 'native') {
                        $KD.setAttr(scrolee, 'kr', 'scrolee');
                        hScroll = $KD.create('DIV', {kr:'h-scroll'});
                        vScroll = $KD.create('DIV', {kr:'v-scroll'});
                    }

                    //pageNav = $KD.create('DIV', {align:'center'}, {display:'none', position:'absolute', bottom:'0px', width:'100%'});

                    view = $super._render.call(this, tag, [scrolee, docker, hScroll, vScroll]);

                    $KD.setAttr(view, 'kwh-keydown', 'onKeyDown');
                    $KD.setAttr(scrolee, 'aria-colcount', 1);

                    el = $KW.el(view);

                    $KW.registerNativeScrollEvent(this);
                    //$KD.on(el.viewport, 'scroll', 'segment', _animator.CollectionView.scrollStart, {scope: this});
                }

                el = $KW.el(view);

                if($KU.scrollType() !== 'native') {
                    $KD.style(el.node, {overflowX:'hidden', overflowY:'hidden'});
                } else {
                    _handleScrollDirection.call(this, el.scrolee);
                    $KD.style(el.viewport, {overflowX:'auto', overflowY:'auto'});
                    $KD.style(el.node, {overflowX:'hidden'});
                }

                _view.CollectionView.data.call(this, el, _.prop.data);
                //TODO: accessibility
                //$KW.accessibility(this);
            }

            return view;
        };


        var collectionview_addAll = function CollectionView$addAll(data, anim) {
            var prop = this._kwebfw_.prop, secIndex = -1, itemIndex = -1;

            if(!_valid.CollectionView.data.call(this, data)) {
                throw new Error('Invalid data.');
            }
            if(!prop.data) prop.data = [];

            if(prop.data.length === 0
            || (_isSectionDS(prop.data[0]) && _isSectionDS(data[0]))
            || (!_isSectionDS(prop.data[0]) && !_isSectionDS(data[0]))) {
                if(_isSectionDS(data[0])) secIndex = prop.data.length;
                else itemIndex = prop.data.length;

                _onItemChange.call(this, secIndex, itemIndex, 'addall', data, anim);
            } else {
                //throw Error:: Existing data structure of Segment do not match with that of passed data
                throw new Error('Invalid data.');
            }
        };


        var collectionview_addDataAt = function CollectionView$addDataAt(data, itemIndex, secIndex, anim) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils, errorMessage = null;

            if($KU.is(data, 'object') || $KU.is(data, 'array')) {
                errorMessage = _validateInputIndices.call(this, secIndex, itemIndex, 'add');

                if(errorMessage === '') {
                    if(!$KU.is(secIndex, 'number')) secIndex = -1;
                    if(!this._kwebfw_.prop.data) this._kwebfw_.prop.data = [];
                    _onItemChange.call(this, secIndex, itemIndex, 'add', data, anim);
                } else {
                    throw new Error(errorMessage);
                }
            } else {
                throw new Error('Invalid data.');
            }
        };


        var collectionview_addSectionAt = function CollectionView$addSectionAt(data, index, anim) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils,
                prop = this._kwebfw_.prop, errorMessage = '';

            if(!$KU.is(data, 'array')) {
                throw new Error('Invalid data.');
            }

            errorMessage = _validateInputIndices.call(this, index, 0, 'addsectionat');

            if(errorMessage === '') {
                if(!prop.data) prop.data = [];

                if(prop.data.length === 0 || _isSectionDS(prop.data[0])) {
                    _onItemChange.call(this, index, -1, 'addsectionat', data, anim);
                } else {
                    throw new Error('Invalid data.');
                }
            } else {
                throw new Error(errorMessage);
            }
        };

        /*eslint-disable no-unused-vars*/
        var collectionview_animateItems = function CollectionView$animateItems(animContext) {
            _animator.CollectionView.animateItems.call(this, animContext);
        };
        /*eslint-enable no-unused-vars*/


        var collectionview_appendLayoutDataAt = function CollectionView$appendLayoutDataAt(data, itemIndex, sectionIndex) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget, itemModel = null,
                _ = this._kwebfw_, prop = _.prop, flexProps = $KW.getFlexProperties(),
                widgetDataMap = prop.widgetDataMap;

            if($KU.is(data, 'object')) data = [data];

            if($KU.is(sectionIndex, 'undefined')) sectionIndex = -1;
            $KU.each(data, function(data, counter) {
                itemModel = _getIndexedInfo.call(this, [sectionIndex, itemIndex + counter], _.clones);

                $KW.iterate(itemModel, function(model/*, pmodel, index*/) {
                    var $K = voltmx.$kwebfw$, $KU = $K.utils,
                        dataId = '', prop = null;

                    dataId = widgetDataMap[model.id];//TODO component

                    if($KU.is(dataId, 'string') && dataId
                        && Object.prototype.hasOwnProperty.call(data, dataId)) {
                        prop = data[dataId];
                    }

                    if($KU.is(prop, 'object')) {
                        $KU.each(prop, function(value, keey) {
                            if(flexProps.indexOf(keey) > -1) {
                                model[keey] = value;
                            }
                        });
                    }
                }, {tabs:false});

                if(itemModel) {
                    var rootContainer = $KW.getRootNode(this);
                    //itemModel._kwebfw_.forceLayout = true
                    rootContainer.forceLayout();
                }
            }, this);
        };


        var collectionview_getIndicesForVisibleItems = function CollectionView$getIndicesForVisibleItems() {
            return _getVisibleItems.call(this, {indices: true});
        };

        var collectionview_getVisibleItems = function CollectionView$getVisibleItems() {
            return _getVisibleItems.call(this, {indices: false});
        };


        var collectionview_removeAll = function CollectionView$removeAll(anim) {
            if(_animator.CollectionView.canAnimate.call(this, anim)) {
                _animator.CollectionView.onItemDisplayHandler.call(this, voltmx.segment.REMOVE, this._kwebfw_.items);
                _animator.CollectionView.applyItemsAnimationByAPI.call(this, 'removeall', this._kwebfw_.items, -1, -1, anim);
            } else {
                _action.CollectionView._removeAll.call(this);
            }
        };


        var collectionview_removeAt = function CollectionView$removeAt(itemIndex, secIndex, count, anim) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils, errorMessage = null;

            errorMessage = _validateInputIndices.call(this, secIndex, itemIndex, 'remove');
            if(errorMessage === '') {
                if(!$KU.is(secIndex, 'number')) secIndex = -1;
                _onItemChange.call(this, secIndex, itemIndex, 'remove', count || 1, anim);
            } else {
                throw new Error(errorMessage);
            }
        };


        var collectionview_removeSectionAt = function CollectionView$removeSectionAt(index, count, anim) {
            var prop = this._kwebfw_.prop;

            if(prop.data && prop.data.length > 0 && _isSectionDS(prop.data[0])) {
                if(index >= 0 && index < prop.data.length) {
                    _onItemChange.call(this, index, -1, 'removesectionat', prop.data, count || 1, anim);
                } else {
                    throw new Error('Invalid index passed.');
                }
            } else {
                throw new Error('Invalid input or no data exists.');
            }
        };

        var collectionview_scrollToItemAtIndex = function CollectionView$scrollToItemAtIndex(context) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget, _ = this._kwebfw_,
                item = null, sectionIndex = context.sectionIndex, itemIndex = context.itemIndex;

            if($KU.is(sectionIndex, 'undefined')) sectionIndex = -1;
            item = _getIndexedInfo.call(this, [sectionIndex, itemIndex], _.clones);
            item.setFocus(true); // item might be null ??

            $KW.scrollElementToParentScroller(item);
        };

        /*eslint-disable no-unused-vars*/
        var collectionview_setAnimations = function CollectionView$setAnimations(animInfo) {
            _animator.CollectionView.setAnimations.call(this, animInfo);
        };
        /*eslint-enable no-unused-vars*/

        var collectionview_setActive = function CollectionView$setActive(itemIndex, secIndex) {
            var $K = kony.$kwebfw$, $KD = $K.dom, $KU = $K.utils, $KW = $K.widget,
                $super = kony.ui.CollectionView.base.prototype, flag = false,
                index = '', li = null, view = this._kwebfw_.view;

            if (!$KU.is(itemIndex, 'number')) itemIndex = -1;
            if (!$KU.is(secIndex, 'number')) secIndex = -1;

            if (itemIndex < 0 && secIndex < 0) {
                $super.setActive.call(this);
            } else {
                flag = _validIndex.call(this, [secIndex, itemIndex]);

                if (flag && $KW.isRendered(this)) {
                    index = secIndex + ',' + itemIndex;
                    li = $KD.find(view, '[kii="' + index + '"]')[0];
                    li && $KD.focus(li);
                } else {
                    if (!flag) {
                        throw new Error('Invalid index passed');
                    } else {
                        throw new Error('Cannot focus the widget befor rendering it');
                    }
                }
            }
        };

        var collectionview_setContentOffset = function segmentedUI2$setAnimations(offset, animate) {
            var $K = voltmx.$kwebfw$, $KW = $K.widget;

            $KW.setContentOffset(this, offset, animate);
        };

        var collectionview_setData = function CollectionView$setData(data, anim) {
            _clearSelectedIndices.call(this);
            this.data = data;
            if(_animator.CollectionView.canAnimate.call(this, anim)) {
                _animator.CollectionView.onItemDisplayHandler.call(this, voltmx.segment.UPDATE, this._kwebfw_.items);
                _animator.CollectionView.applyItemsAnimationByAPI.call(this, 'setdata', this._kwebfw_.items, -1, -1, anim);
            }
        };


        var collectionview_setDataAt = function CollectionView$setDataAt(data, itemIndex, secIndex, anim, arg4) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget, widget = null, key = '',
                _ = this._kwebfw_, prop = _.prop, errorMessage = null,
                _constructObject = function(widget, data, key) {
                    var defaultProp = null, value = null;

                    if($KU.is(data, 'string')) {
                        defaultProp = $KW.getDefaultProperty(widget);
                        value = data;
                        data = {};
                        data[defaultProp] = value;
                    } else {
                        data = {};
                    }

                    data[key] = widget[key];
                    return data;
                };

            if(arguments.length === 5 && $KU.is(data, 'widget')) {
                //Will get into this, when setter of cloned model is called
                widget = data;
                key = itemIndex;
                itemIndex = anim;
                secIndex = arg4;

                if(secIndex === -1 && itemIndex !== -1) {
                    if($KU.is(prop.data[itemIndex][widget.id], 'object')) {
                        prop.data[itemIndex][widget.id][key] = widget[key];
                    } else {
                        prop.data[itemIndex][widget.id] = _constructObject(widget, prop.data[itemIndex][widget.id], key);
                    }
                } else if(secIndex !== -1 && itemIndex === -1) {
                    if($KU.is(prop.data[secIndex][0][widget.id], 'object')) {
                        prop.data[secIndex][0][widget.id][key] = widget[key];
                    } else {
                        prop.data[secIndex][0][widget.id] = _constructObject(widget, prop.data[secIndex][0][widget.id], key);
                    }
                } else if(secIndex !== -1 && itemIndex === -2) {
                    if($KU.is(prop.data[secIndex][2][widget.id], 'object')) {
                        prop.data[secIndex][2][widget.id][key] = widget[key];
                    } else {
                        prop.data[secIndex][2][widget.id] = _constructObject(widget, prop.data[secIndex][0][widget.id], key);
                    }
                } else if(secIndex !== -1 && itemIndex !== -1) {
                    if($KU.is(prop.data[secIndex][1][itemIndex][widget.id], 'object')) {
                        prop.data[secIndex][1][itemIndex][widget.id][key] = widget[key];
                    } else {
                        prop.data[secIndex][1][itemIndex][widget.id] = _constructObject(widget, prop.data[secIndex][1][itemIndex][widget.id], key);
                    }
                }
            } else { //This is actual implementation of setDataAt
                if($KU.is(data, 'array')) {
                    errorMessage = _validateInputIndices.call(this, secIndex, itemIndex, 'update');

                    if(errorMessage === '') {
                        if(!$KU.is(secIndex, 'number')) secIndex = -1;
                        _onItemChange.call(this, secIndex, itemIndex, 'update', data, anim);
                    } else {
                        throw new Error(errorMessage);
                    }
                } else {
                    throw new Error('Invalid data.');
                }
            }
        };


        var collectionview_setSectionAt = function CollectionView$setSectionAt(data, index, anim) {
            var prop = this._kwebfw_.prop;

            if(prop.data && prop.data.length > 0 && _isSectionDS(prop.data[0])) {
                if(index >= 0 && index < prop.data.length) {
                    _onItemChange.call(this, index, -1, 'setsectionat', data, anim);
                } else {
                    throw new Error('Invalid index passed.');
                }
            } else {
                throw new Error('Invalid input or no data exists.');
            }
        };


        $K.defVoltmxProp(CollectionView.prototype, [
            {keey:'_flush', value:collectionview_flush},
            {keey:'_render', value:collectionview_render},
            {keey:'addAll', value:collectionview_addAll},
            {keey:'addDataAt', value:collectionview_addDataAt},
            {keey:'addSectionAt', value:collectionview_addSectionAt},
            {keey:'appendLayoutDataAt', value:collectionview_appendLayoutDataAt},
            {keey:'getIndicesForVisibleItems', value:collectionview_getIndicesForVisibleItems},
            {keey:'getVisibleItems', value:collectionview_getVisibleItems},
            {keey:'removeAll', value:collectionview_removeAll},
            {keey:'removeDataAt', value:collectionview_removeAt},
            {keey:'removeSectionAt', value:collectionview_removeSectionAt},
            {keey:'scrollToItemAtIndex', value:collectionview_scrollToItemAtIndex},
            {keey:'setActive', value:collectionview_setActive},
            {keey:'setContentOffset', value:collectionview_setContentOffset},
            {keey:'setData', value:collectionview_setData},
            {keey:'setDataAt', value:collectionview_setDataAt},
            {keey:'setSectionAt', value:collectionview_setSectionAt}
        ]);


        return CollectionView;
    }())});
}());