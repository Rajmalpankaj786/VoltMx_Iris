(function() {
    var $K = voltmx.$kwebfw$, _frameworkHeaderTemplate = null;


    $K.defVoltmxProp($K.ui, [
        {keey:'SegmentedUI2', value:{}, items:[
            {keey:'onKeyDown', value:function(evt) {
                var $K = voltmx.$kwebfw$, $KD = $K.dom,
                    model = this._kwebfw_.rows[0],
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
                var $K = voltmx.$kwebfw$, $KW = $K.widget,
                    prop = this._kwebfw_.prop, el = $KW.el(this);

                if(prop.viewType === constants.SEGUI_VIEW_TYPE_PAGEVIEW) {
                    _view.SegmentedUI2.data.call(this, el, prop.data);
                } else if(prop.viewType === constants.SEGUI_VIEW_TYPE_TABLEVIEW
                        && _shouldLazyLoad.call(this)) {
                    if(prop.frame.height > 0 && this._kwebfw_.height !== prop.frame.height) {//this._kwebfw_.height stores prev segment height to prevent from re-render if height doesnt change
                        _lazyLoad.SegmentedUI2._adjustRowsOnViewUpdate.call(this);
                    }

                    this._kwebfw_.height = prop.frame.height;
                }
            }},

            {keey:'onRowClick', value:function(evt) {
                var $K = voltmx.$kwebfw$, $KW = $K.widget, $KD = $K.dom,
                    index = null, secIndex = -1, rowIndex = -1;

                index = $KD.closest(evt.target, 'kr', 'item');

                if(index) {
                    index = $KD.getAttr(index, 'kii').split(',');
                    secIndex = parseInt(index[0], 10);
                    rowIndex = parseInt(index[1], 10);

                    $K.apm.send(this, 'Touch', {type:(this._kwebfw_.name+'_Row_Click')});
                    $KW.fire(this, 'onRowClick', this, {secIndex:secIndex, rowIndex:rowIndex});
                }

                return false;
            }},

            {keey:'onRowKeyDown', value:function(evt) {
                var $K = voltmx.$kwebfw$, $KD = $K.dom, li = null,
                    code = evt.keyCode || evt.which;

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

            {keey:'onRowKeyUp', value:function(evt) {
                var $K = voltmx.$kwebfw$, $KW = $K.widget, $KD = $K.dom,
                    code = evt.keyCode || evt.which, secIndex = -1, rowIndex = -1, li = null;

                if([13, 32].indexOf(code) >= 0) {
                    $KD.preventDefault(evt);

                    if(code === 13 || code === 32) { //Enter or Space
                        li = $KD.closest(evt.target, 'kr', 'item');
                        rowIndex = $KD.getAttr(li, 'kii').split(',');
                        secIndex = parseInt(rowIndex[0], 10);
                        rowIndex = parseInt(rowIndex[1], 10);
                        $K.apm.send(this, 'Touch', {type:(this._kwebfw_.name+'_Row_Click')});
                        $KW.fire(this, 'onRowClick', this, {secIndex:secIndex, rowIndex:rowIndex});
                    }
                }

                return false;
            }}
        ]}
    ]);


    //All the functions will be called in the scope of widget instance
    //Segment APIs actions - add, update and remove will be called
    var _action = {
        SegmentedUI2: {
            _remove: function SegmentedUI2$_action_remove(secIndex, rowIndex) {
                var $K = voltmx.$kwebfw$, $KW = $K.widget, $KD = $K.dom,
                    el = $KW.el(this), _ = this._kwebfw_, $KU = $K.utils,
                    data = _.prop.data, section = _isSectionDS(data[0]), absIndex = null,
                    isRowRendered = _isRowRendered.call(this, secIndex, rowIndex),
                    removeSelectedIndex = -1;

                if(section) data[secIndex][1].splice(rowIndex, 1);
                else data.splice(rowIndex, 1);

                if(_.selectedRows.length > 0) {
                    $KU.each(_.selectedRows, function(row, index) {
                        if(row[0] === secIndex && row[1] > rowIndex) {
                            row[1] = row[1] - 1;
                        } else if(row[0] === secIndex && row[1] === rowIndex) {
                            removeSelectedIndex = index;
                        }
                    });
                    if(removeSelectedIndex !== -1) {
                        _.selectedRows.splice(removeSelectedIndex, 1);
                    }
                    _setSelectedRowsRelatedProperties.call(this);
                }
                if(el.node) {
                    if(section) {
                        _flushClones(_.clones[secIndex][1][rowIndex]);
                        _.clones[secIndex][1].splice(rowIndex, 1);
                    } else {
                        _flushClones(_.clones[rowIndex]);
                        _.clones.splice(rowIndex, 1);
                    }

                    if(_shouldLazyLoad.call(this)) {
                        _lazyLoad.SegmentedUI2._action._removeAt.call(this, secIndex, rowIndex);
                    } else {
                        absIndex = _absoluteIndexInClones.call(this, secIndex, rowIndex);
                        if(isRowRendered) {
                            _.rows.splice(absIndex, 1);
                            $KD.removeAt(el.scrolee, absIndex);
                        }
                        if(section) _searcher.SegmentedUI2.removeAtHeaderVisibility.call(this, secIndex);
                        _updateIndexes.call(this, rowIndex, secIndex);
                    }
                    if(_.swipeContext) {
                        if(_.swipeContext.currentPage === 0) {
                            _.swipeContext = null;
                        } else if(rowIndex <= _.swipeContext.currentPage) {
                            _.swipeContext.currentPage = _.swipeContext.currentPage - 1;
                        } else {
                            _.swipeContext.currentPage = _.swipeContext.currentPage + 1;
                        }
                    }
                }
            },

            _removeAll: function SegmentedUI2$_action_removeAll() {
                var $K = voltmx.$kwebfw$, $KW = $K.widget, $KD = $K.dom,
                    el = null, _ = this._kwebfw_;

                _.prop.data = [];
                _.rows = [];
                _flushClones(_.clones);
                _.clones = [];
                _clearSelectedIndices.call(this);
                $KW.markRelayout(this);

                if(_.view) {
                    el = $KW.el(this);
                    $KD.html(el.scrolee, '');
                    _updateAriaRowCount.call(this, 0, el);

                    if(_.prop.viewType === constants.SEGUI_VIEW_TYPE_PAGEVIEW) {
                        _setPageView.call(this, el);
                    }

                    if(_shouldLazyLoad.call(this)) {
                        _lazyLoad.SegmentedUI2._resetParity.call(this, el);
                    }
                }
            },

            _removeSectionAt: function SegmentedUI2$_action_removeSectionAt(secIndex, rowIndex, updateIndicesFlag) {
                var $K = voltmx.$kwebfw$, $KW = $K.widget, $KD = $K.dom,
                    $KU =$K.utils, _ = this._kwebfw_, data = _.prop.data,
                    clones = null, el = $KW.el(this), index = 0, removeSelectedSectionIndices = [],
                    absIndex = null;

                if(!$KU.is(updateIndicesFlag, 'boolean')) updateIndicesFlag = true;
                data.splice(secIndex, 1);

                if(updateIndicesFlag && _.selectedRows.length > 0) {
                    $KU.each(_.selectedRows, function(row, index) {
                        if(row[0] > secIndex) {
                            row[0] = row[0] - 1;
                        } else if(row[0] === secIndex) {
                            removeSelectedSectionIndices.push(index);
                        }
                    });

                    for(index = removeSelectedSectionIndices.length - 1; index >= 0; index--) {
                        _.selectedRows.splice(removeSelectedSectionIndices[index], 1);
                    }

                    _setSelectedRowsRelatedProperties.call(this);
                }

                if(el.node) {
                    clones = _.clones[secIndex];
                    _flushClones([_.clones[secIndex]]);
                    _.clones.splice(secIndex, 1);

                    if(_shouldLazyLoad.call(this)) {
                        _lazyLoad.SegmentedUI2._action._removeSectionAt.call(this, secIndex, rowIndex);
                    } else {
                        absIndex = _absoluteIndexInClones.call(this, secIndex, rowIndex);
                        //header node removal of given section index
                        if(clones[0] && clones[0].isVisible) {
                            $KD.removeAt(el.scrolee, absIndex);
                            _.rows.splice(absIndex, 1);
                        }

                        //row nodes removal of given section index
                        $KU.each(clones[1], function(clone) {
                            if(clone && clone.isVisible) {
                                $KD.removeAt(el.scrolee, absIndex);
                                _.rows.splice(absIndex, 1);
                            }
                        });
                        if(updateIndicesFlag) _updateIndexes.call(this, secIndex, -1);
                    }
                }
                if(_.swipeContext) _.swipeContext = null;
            },

            add: function SegmentedUI2$_action_add(secIndex, rowIndex, widgetdata, anim) {
                var $K = voltmx.$kwebfw$, $KW = $K.widget, $KD = $K.dom, $KU = $K.utils,
                    clone = null, el = $KW.el(this), _ = this._kwebfw_,
                    data = _.prop.data, section = _isSectionDS(data[0]),
                    absIndex = null, rowNode = null;

                if(section) data[secIndex][1].splice(rowIndex, 0, widgetdata);
                else data.splice(rowIndex, 0, widgetdata);

                if(_.selectedRows.length > 0) {
                    $KU.each(_.selectedRows, function(row) {
                        if(row[0] === secIndex && row[1] >= rowIndex) {
                            row[1] = row[1] + 1;
                        }
                    });
                    _setSelectedRowsRelatedProperties.call(this);
                }
                if(el.node) {
                    if(section) _.clones[secIndex][1].splice(rowIndex, 0, undefined);
                    else _.clones.splice(rowIndex, 0, undefined);

                    if(_shouldLazyLoad.call(this)) {
                        _lazyLoad.SegmentedUI2._action._addDataAt.call(this, secIndex, rowIndex, widgetdata, anim);
                    } else {
                        absIndex = _absoluteIndexInClones.call(this, secIndex, rowIndex);
                        clone = _getClonedTemplate.call(this, [secIndex, rowIndex]);
                        if(clone) {
                            rowNode = _renderRows.call(this, [clone]);
                            if(absIndex === _.rows.length) {
                                _.rows.push(clone);
                                $KD.add(el.scrolee, rowNode);
                            } else {
                                _.rows.splice(absIndex, 0, clone);
                                $KD.addAt(el.scrolee, rowNode, absIndex);
                            }

                            if(secIndex === -1) secIndex = 0;
                            _searcher.SegmentedUI2.updateSearchText.call(this, [clone], section);

                            if(_animator.SegmentedUI2.canAnimate.call(this, anim)) {
                                _animator.SegmentedUI2.onRowDisplayHandler.call(this, voltmx.segment.ADD, [clone]);
                                _animator.SegmentedUI2.applyRowsAnimationByAPI.call(this, 'adddataat', rowNode, rowIndex, secIndex, anim);
                            }
                        }
                        _updateIndexes.call(this, rowIndex, secIndex);
                    }
                }
            },

            update: function SegmentedUI2$_action_update(secIndex, rowIndex, widgetdata, anim) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget, $KD = $K.dom,
                    clone = null, el = $KW.el(this), _ = this._kwebfw_, rowNode = null,
                    data = _.prop.data, section = _isSectionDS(data[0]), absIndex = null,
                    isRowRendered = _isRowRendered.call(this, secIndex, rowIndex);


                if(section) data[secIndex][1][rowIndex] = widgetdata;
                else data[rowIndex] = widgetdata;

                if(_.selectedRows.length > 0) {
                    $KU.each(_.selectedRows, function(row, index) {
                        if(row[0] === secIndex && row[1] === rowIndex) {
                            _.selectedRows.splice(index, 1);
                            return true;
                        }
                    });
                    _setSelectedRowsRelatedProperties.call(this);
                }
                if(el.node) {
                    if(_shouldLazyLoad.call(this)) {
                        _lazyLoad.SegmentedUI2._action._setDataAt.call(this, secIndex, rowIndex, widgetdata, anim);
                    } else {
                        absIndex = _absoluteIndexInClones.call(this, secIndex, rowIndex);
                        clone = _getClonedTemplate.call(this, [secIndex, rowIndex]);

                        if(clone) {
                            rowNode = _renderRows.call(this, [clone]);
                            if(isRowRendered) {
                                _.rows[absIndex] = clone;
                                $KD.replace(rowNode, $KD.childAt(el.scrolee, absIndex));
                            } else {
                                if(absIndex === _.rows.length) {
                                    _.rows.push(clone);
                                    $KD.add(el.scrolee, rowNode);
                                } else {
                                    _.rows.splice(absIndex, 0, clone);
                                    $KD.addAt(el.scrolee, rowNode, absIndex);
                                }
                            }

                            if(secIndex === -1) secIndex = 0;
                            _searcher.SegmentedUI2.updateSearchText.call(this, [clone], section);

                            if(_animator.SegmentedUI2.canAnimate.call(this, anim)) {
                                _animator.SegmentedUI2.onRowDisplayHandler.call(this, voltmx.segment.UPDATE, [clone]);
                                _animator.SegmentedUI2.applyRowsAnimationByAPI.call(this, 'setdataat', rowNode, rowIndex, secIndex, anim);
                            }
                        } else if(isRowRendered && $KU.is(_.rows[absIndex], 'widget')) {
                            _.rows.splice(absIndex, 1);
                            $KD.removeAt(el.scrolee, absIndex);
                        }
                    }
                }
            },

            remove: function SegmentedUI2$_action_remove(secIndex, rowIndex, anim) {
                var $K = voltmx.$kwebfw$, $KD = $K.dom,
                    _ = this._kwebfw_, absIndex = null, rowNode = null;
                if(_animator.SegmentedUI2.canAnimate.call(this, anim)) {
                    if(_shouldLazyLoad.call(this)) {
                        absIndex = _lazyLoad.SegmentedUI2._absoluteIndexInRows.call(this, secIndex, rowIndex);
                    } else {
                        absIndex = _absoluteIndexInClones.call(this, secIndex, rowIndex);
                    }

                    if(absIndex !== -1) {
                        rowNode = $KD.parent(_.rows[absIndex]._kwebfw_.view);
                        _animator.SegmentedUI2.onRowDisplayHandler.call(this, voltmx.segment.REMOVE, [_.rows[absIndex]]);
                        _animator.SegmentedUI2.applyRowsAnimationByAPI.call(this, 'removeat', rowNode, rowIndex, secIndex, anim);
                    }
                } else {
                    _action.SegmentedUI2._remove.call(this, secIndex, rowIndex);
                }
            },

            addall: function SegmentedUI2$_action_addall(secIndex, rowIndex, newdata, anim) {
                var $K = voltmx.$kwebfw$, $KW = $K.widget, $KD = $K.dom,
                    clones = null, el = $KW.el(this), _ = this._kwebfw_,
                    data = _.prop.data, rows = null, prevLength;

                data.push.apply(data, newdata);

                if(el.node) {
                    if(_shouldLazyLoad.call(this)) {
                        _lazyLoad.SegmentedUI2._action._addAll.call(this, el, [secIndex, rowIndex], anim);
                    } else {
                        clones = _getRenderableClones.call(this, [secIndex, rowIndex]);
                        if(clones.length > 0) {
                            prevLength = $KD.children(el.scrolee).length;
                            $KD.add(el.scrolee, _renderRows.call(this, clones));
                            _.rows.push.apply(_.rows, clones);

                            if(_animator.SegmentedUI2.canAnimate.call(this, anim)) {
                                rows = [].slice.call($KD.children(el.scrolee), prevLength);
                                _animator.SegmentedUI2.onRowDisplayHandler.call(this, voltmx.segment.ADD, clones);
                                _animator.SegmentedUI2.applyRowsAnimationByAPI.call(this, 'addall', rows, -1, -1, anim);
                            }
                        }
                        _searcher.SegmentedUI2.updateSearchText.call(this, clones, _isSectionDS(data[0]));
                    }
                }
            },

            addsectionat: function SegmentedUI2$_action_addsectionat(secIndex, rowIndex, newdata, updateIndicesFlag, anim) {
                var $K = voltmx.$kwebfw$, $KW = $K.widget, $KD = $K.dom, $KU = $K.utils,
                    clones = null, el = $KW.el(this), _ = this._kwebfw_, data = _.prop.data,
                    absIndex = null, prevLength, rows = [], row = null;

                if(!$KU.is(updateIndicesFlag, 'boolean')) updateIndicesFlag = true;

                data.splice(secIndex, 0, newdata);

                if(updateIndicesFlag && _.selectedRows.length > 0) {
                    $KU.each(_.selectedRows, function(row) {
                        if(row[0] >= secIndex) {
                            row[0] = row[0] + 1;
                        }
                    });

                    _setSelectedRowsRelatedProperties.call(this);
                }

                if(el.node) {
                    //modify clones
                    _.clones.splice(secIndex, 0, new Array(2));
                    _.clones[secIndex][1] = new Array(data[secIndex][1].length);

                    if(_shouldLazyLoad.call(this)) {
                        _lazyLoad.SegmentedUI2._action._addSectionAt.call(this, secIndex, rowIndex, newdata, anim);
                    } else {
                        absIndex = _absoluteIndexInClones.call(this, secIndex, rowIndex);
                        clones = _getRenderableClones.call(this, [secIndex, rowIndex], [secIndex, newdata.length]);

                        if(absIndex === _.rows.length) {
                            if(clones.length > 0) {
                                prevLength = $KD.children(el.scrolee).length;
                                $KD.add(el.scrolee, _renderRows.call(this, clones));
                                _.rows.splice.apply(_.rows, [absIndex, 0].concat(clones));
                                if(_animator.SegmentedUI2.canAnimate.call(this, anim)) {
                                    rows = [].slice.call($KD.children(el.scrolee), prevLength);
                                    _animator.SegmentedUI2.onRowDisplayHandler.call(this, updateIndicesFlag ? voltmx.segment.ADD: voltmx.segment.UPDATE, clones);
                                    _animator.SegmentedUI2.applyRowsAnimationByAPI.call(this, 'addsectionat', rows, -1, -1, anim);
                                }
                            }
                        } else {
                            _.rows.splice.apply(_.rows, [absIndex, 0].concat(clones));
                            $KU.each(clones, function(clone/*, ii*/) {
                                row = _renderRows.call(this, [clone]);
                                rows.push(row);
                                $KD.addAt(el.scrolee, row, absIndex++);
                            }, this);
                            if(_animator.SegmentedUI2.canAnimate.call(this, anim)) {
                                _animator.SegmentedUI2.onRowDisplayHandler.call(this, updateIndicesFlag ? voltmx.segment.ADD: voltmx.segment.UPDATE, clones);
                                _animator.SegmentedUI2.applyRowsAnimationByAPI.call(this, 'addsectionat', rows, -1, -1, anim);
                            }
                        }
                        if(updateIndicesFlag) _updateIndexes.call(this, secIndex, -1);
                        _searcher.SegmentedUI2.updateSearchText.call(this, clones, true);
                    }
                }
            },

            setsectionat: function SegmentedUI2$_action_setsectionat(secIndex, rowIndex, newdata, anim) {
                var $K = voltmx.$kwebfw$, $KW = $K.widget, el = $KW.el(this),
                    _ = this._kwebfw_;

                if(_.selectedRows.length > 0) {
                    _.selectedRows.splice(0, _.selectedRows.length);
                    _setSelectedRowsRelatedProperties.call(this);
                }

                if(_shouldLazyLoad.call(this)) {
                    _lazyLoad.SegmentedUI2._action._setSectionAt.call(this, secIndex, rowIndex, newdata, anim);
                } else {
                    _action.SegmentedUI2.removesectionat.call(this, secIndex, rowIndex, false);
                    _action.SegmentedUI2.addsectionat.call(this, secIndex, rowIndex, newdata, false, anim);
                    if(el.node) _updateIndexes.call(this, secIndex, -1);
                }
            },

            removesectionat: function SegmentedUI2$_action_removesectionat(secIndex, rowIndex, updateIndicesFlag, anim) {
                var $K = voltmx.$kwebfw$, $KW = $K.widget, $KD = $K.dom,
                    $KU =$K.utils, _ = this._kwebfw_, clones = null, counter = 0,
                    el = $KW.el(this), absIndex = null, rows = [], cloneModels = [];

                if(_animator.SegmentedUI2.canAnimate.call(this, anim)) {
                    if(el.node) {
                        if(_shouldLazyLoad.call(this)) {
                            _lazyLoad.SegmentedUI2._action._removesectionat.call(this, secIndex, rowIndex, anim);
                        } else {
                            absIndex = _absoluteIndexInClones.call(this, secIndex, rowIndex);
                            clones = _.clones[secIndex];
                            //header node removal of given section index
                            if(clones[0] && clones[0].isVisible) {
                                rows.push($KD.childAt(el.scrolee, absIndex));
                                counter ++;
                            }

                            //row nodes removal of given section index
                            $KU.each(clones[1], function(clone) {
                                if(clone && clone.isVisible) {
                                    rows.push($KD.childAt(el.scrolee, absIndex + counter));
                                    cloneModels.push(clone);
                                    counter ++;
                                }
                            });
                            _animator.SegmentedUI2.onRowDisplayHandler.call(this, voltmx.segment.REMOVE, cloneModels);
                            _animator.SegmentedUI2.applyRowsAnimationByAPI.call(this, 'removesectionat', rows, rowIndex, secIndex, anim);
                        }
                    }
                } else {
                    _action.SegmentedUI2._removeSectionAt.call(this, secIndex, rowIndex, updateIndicesFlag);
                }
            }
        }
    };


    //All the functions will be called in the scope of widget instance
    var _animator = {
        SegmentedUI2: {
            applyRowsAnimationByAPI: function SegmentedUI2$_animator_applyRowsAnimationByAPI(action, listItems, rowIndex, secIndex, animObj) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, animDef = null,
                    segmodel = this, row = null, rows = [],

                    _wrapRemoveAtCallback = function(callback) {
                        var wrapper = function() {
                            _action.SegmentedUI2._remove.call(segmodel, secIndex, rowIndex);
                            callback && callback.apply(this, arguments);
                        };
                        return wrapper;
                    },
                    _wrapRemoveAllCallback = function(callback) {
                        var wrapper = function() {
                            _action.SegmentedUI2._removeAll.call(segmodel);
                            callback && callback.apply(this, arguments);
                        };
                        return wrapper;
                    },
                    _wrapRemoveSectionAtCallback = function(callback) {
                        var wrapper = function() {
                            _action.SegmentedUI2._removeSectionAt.call(segmodel, secIndex, rowIndex, true);
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
                        row = listItems.firstChild;
                        animDef.applyRowAnimation([row], animObj.config, animObj.callbacks);
                        break;

                    case 'addall':
                    case 'addsectionat':
                    case 'removesectionat':
                        $KU.each(listItems, function(row) {
                            rows.push(row.firstChild);
                        });
                        animDef.applyRowAnimation(rows, animObj.config, animObj.callbacks);
                        break;

                    case 'setdata':
                    case 'removeall':
                        $KU.each(listItems, function(row) {
                            rows.push(row._kwebfw_.view);
                        });
                        animDef.applyRowAnimation(rows, animObj.config, animObj.callbacks);
                        break;
                    default:
                        break;
                }
            },

            animateRows: function SegmentedUI2$_animator_animateRows(animContext) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget, animInfo = {},
                    el = $KW.el(this), rows = [], widgetId, widgets = [], elsToAnimate = [];

                if($KU.is(el.node, 'null')) {
                    return;
                }

                if(animContext) {
                    rows = animContext.context || animContext.rows;
                    animInfo = animContext.animation;
                    if(!rows || !$KU.is(rows, 'array') || !animInfo || !animInfo.definition) {
                        return;
                    }

                    widgetId = animContext.widgetID;
                    widgets = animContext.widgets || [];

                    if(widgetId) widgets.push(widgetId);

                    $KU.each(rows, function(rowContext/*, key*/) {
                        var absIndex = 0, model = null, templateModel = null,
                            el = null;

                        if(!_shouldLazyLoad.call(this)) {
                            absIndex = _absoluteIndexInClones.call(this, rowContext.sectionIndex, rowContext.rowIndex);
                        } else {
                            absIndex = _lazyLoad.SegmentedUI2._absoluteIndexInRows.call(this, rowContext.sectionIndex, rowContext.rowIndex);
                        }

                        templateModel = this._kwebfw_.rows[absIndex];
                        if(templateModel && templateModel._kwebfw_.view) {//template visible false case
                            if(widgets.length) {
                                $KU.each(widgets, function(widgetId/*, key*/) {
                                    model = $KU.get(widgetId, templateModel);
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
                animInfo.definition.applyRowAnimation(elsToAnimate, animInfo.config, animInfo.callbacks);
            },

            caf: function SegmentedUI2$_animator_caf(callback) {
                cancelAnimationFrame(callback);
            },

            canAnimate: function SegmentedUI2$_animator_canAnimate(animObj) {
                var $K = voltmx.$kwebfw$, $KW = $K.widget, result = true;


                if(!animObj || !animObj.definition || !animObj.definition.applyRowAnimation) {
                    result = false;
                }

                if(!$KW.visible(this)) {
                    result = false;
                }

                return result;
            },

            getRowVisibleState: function SegmentedUI2$_animator_getRowVisibleState(li) {
                var $K = voltmx.$kwebfw$, $KW = $K.widget, el = null, offsetTop,
                    offsetHeight, scrollTop, segHeight, state;

                el = $KW.el(this);

                offsetTop = li.offsetTop + el.scrolee.offsetTop;
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

            handleStateAnimations: function SegmentedUI2$_animator_handleStateAnimations() {
                var $K = voltmx.$kwebfw$, $KW = $K.widget, $KU = $K.utils, $KD = $K.dom,
                    visibleFirstRow = null, visibleLastRow = null, _ = this._kwebfw_;

                if(_.prop.onRowDisplay) {
                    visibleFirstRow = _getVisibleRow.call(this, {firstRow: true, lastRow: false});
                    visibleLastRow = _getVisibleRow.call(this, {firstRow: false, lastRow: true});
                }

                $KU.each(_.rows, function(clone/*, index*/) {
                    var li = null, state = null, animObj = null, visibleState = null, currentRowContext = null;

                    if(clone && clone._kwebfw_.view) {
                        li = $KD.closest(clone._kwebfw_.view, 'kr', 'item');
                    }

                    if(li) {
                        state = _animator.SegmentedUI2.getRowVisibleState.call(this, li);
                        if(clone._kwebfw_.animState !== state) {
                            if(state === 'present') {
                                animObj = _.visibleAnim;
                                visibleState = voltmx.segment.VISIBLE;
                            } else {
                                animObj = _.invisibleAnim;
                                visibleState = voltmx.segment.INVISIBLE;
                            }

                            currentRowContext = _getRowContext(clone);
                            if(this._kwebfw_.prop.onRowDisplay
                            && currentRowContext.rowIndex !== -1) {
                                $KW.fire(this, 'onRowDisplay', this,
                                    {
                                        model: this,
                                        state : visibleState,
                                        currentRowContext: currentRowContext,
                                        startRowContext: visibleFirstRow,
                                        endRowContext: visibleLastRow
                                    }
                                );
                            }

                            if(animObj) {
                                animObj.definition.applyRowAnimation([clone], animObj.config, animObj.callbacks);
                            }
                            clone._kwebfw_.animState = state;
                        }
                    }
                }, this);

                this._kwebfw_.rafValue = _animator.SegmentedUI2.raf(_animator.SegmentedUI2.handleStateAnimations.bind(this));
            },

            onRowDisplayHandler: function SegmentedUI2$_animator_onRowDisplayHandler(action, rows) {
                var $K = voltmx.$kwebfw$, $KW = $K.widget, $KU = $K.utils, _ = this._kwebfw_,
                    visibleLastRow = null, visibleFirstRow = null, config = {}, currentRowContext = null;

                if(_.prop.onRowDisplay) {
                    visibleFirstRow = _getVisibleRow.call(this, {firstRow: true, lastRow: false});
                    visibleLastRow = _getVisibleRow.call(this, {firstRow: false, lastRow: true});

                    $KU.each(rows, function(clone/*, index*/) {
                        currentRowContext = _getRowContext(clone);
                        config = {
                            model: this,
                            state : action,
                            currentRowContext: currentRowContext,
                            startRowContext: visibleFirstRow,
                            endRowContext: visibleLastRow
                        };
                        if(currentRowContext.rowIndex !== -1) {
                            $KW.fire(this, 'onRowDisplay', this, config);
                        }
                    }, this);
                }
            },

            raf: function SegmentedUI2$_animator_raf(callback) {
                return requestAnimationFrame(callback);
            },

            scrolled: false,

            scrollEnd: function SegmentedUI2$_animator_scrollEnd() {
                this._kwebfw_.rafValue && _animator.SegmentedUI2.caf(this._kwebfw_.rafValue);
            },

            scrollStart: function SegmentedUI2$_animator_scrollStart() {
                var $K = voltmx.$kwebfw$, $KW = $K.widget, $KD = $K.dom,
                    segNode = null, model = null;

                segNode = $KD.closest(this, 'kw');
                if(segNode) {
                    model = $KW.model(segNode);

                    if(!_animator.SegmentedUI2.scrolled) {
                        if(model._kwebfw_.visibleAnim
                           || model._kwebfw_.invisibleAnim
                           || model._kwebfw_.prop.onRowDisplay) {
                            _animator.SegmentedUI2.setAnimationStates.call(model);
                            model._kwebfw_.rafValue = _animator.SegmentedUI2.raf(_animator.SegmentedUI2.handleStateAnimations.bind(model));
                        }
                        _animator.SegmentedUI2.scrolled = true;
                    }

                    if(_animator.SegmentedUI2.scrollTimer) {
                        clearTimeout(_animator.SegmentedUI2.scrollTimer);
                    }

                    _animator.SegmentedUI2.scrollTimer = setTimeout(function() {
                        _animator.SegmentedUI2.scrollEnd.call(model);
                        clearTimeout(_animator.SegmentedUI2.scrollTimer);
                        _animator.SegmentedUI2.scrollTimer = null;
                        _animator.SegmentedUI2.scrolled = false;
                    }, 250);
                }
            },

            scrollTimer: null,

            setAnimations: function SegmentedUI2$_animator_setAnimations(animInfo) {
                var animObj = null, _ = this._kwebfw_;

                _.visibleAnim = null;
                _.invisibleAnim = null;

                if(animInfo) {
                    if(animInfo.visible) {
                        animObj = animInfo.visible;
                        if(animObj && animObj.definition && animObj.definition.applyRowAnimation) {
                            _.visibleAnim = animObj;
                        }
                    }

                    if(animInfo.invisible) {
                        animObj = animInfo.invisible;
                        if(animObj && animObj.definition && animObj.definition.applyRowAnimation) {
                            _.invisibleAnim = animObj;
                        }
                    }
                }
            },

            setAnimationStates: function SegmentedUI2$_animator_setAnimationStates() {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, $KD = $K.dom;

                $KU.each(this._kwebfw_.rows, function(clone/*, index*/) {
                    var li = null, state = null;

                    if(!$KU.is(clone, 'null') && clone._kwebfw_.view) {
                        li = $KD.closest(clone._kwebfw_.view, 'kr', 'item');
                    }

                    if(li) {
                        state = _animator.SegmentedUI2.getRowVisibleState.call(this, li);
                        clone._kwebfw_.animState = state;
                    }
                }, this);
            }
        }
    };


    //This function will be called in the scope of widget instance
    //This function is not yet tested, specially when section index value is there
    var _absoluteIndexInData = function SegmentedUI2$_absoluteIndexInData(index) {
        var data = this._kwebfw_.prop.data, absIndex = -1, secIndex = -1, rowIndex = -1;

        index = _deduceIndex.call(this, index);
        secIndex = index[0]; rowIndex = index[1];

        if(!(secIndex === -1 && rowIndex === -1)) {
            if(_isSectionDS(data[0])) {
                if(secIndex >= 0) {
                    if(secIndex < data.length) {
                        for(index=0; index<=secIndex; index++) {
                            absIndex += 1;

                            if(index < secIndex) {
                                absIndex += data[index][1].length;
                            } else if(rowIndex > -1 && rowIndex < data[index][1].length) {
                                absIndex += (rowIndex + 1);
                            }
                        }
                    } else {
                        //SectionIndex exceeds its max boundary for a sectionable segment.
                    }
                } else {
                    //Negative SectionIndex found for a sectionable segment.
                }
            } else { //Non sectionable segment
                if(rowIndex >= 0) {
                    if(rowIndex < data.length) {
                        absIndex = rowIndex;
                    } else {
                        //RowIndex exceeds its max boundary for a non-sectionable segment.
                    }
                } else {
                    //Negative RowIndex found for a non-sectionable segment.
                }
            }
        }

        return absIndex;
    };


    //This function will be called in the scope of widget instance
    //This function is not yet tested, specially when section index value is there
    var _absoluteIndexInClones = function SegmentedUI2$_absoluteIndexInClones(secIndex, rowIndex) {
        var absIndex = 0, _ = this._kwebfw_, data = _.prop.data, clones = _.clones;

        var increment = function(clone, index) {
            if(clone && clone.isVisible) index++;

            return index;
        };

        if(clones.length > 0) {
            if(_isSectionDS(data[0])) {
                if(rowIndex === -1) {
                    secIndex--;
                    if(secIndex >= 0) rowIndex = data[secIndex][1].length - 1;
                } else {
                    rowIndex = rowIndex - 1;
                }
                while(secIndex < data.length && secIndex >= 0) {
                    if(rowIndex === -1) {
                        absIndex = increment(clones[secIndex][0], absIndex);
                        secIndex--;
                        if(secIndex >= 0) rowIndex = data[secIndex][1].length - 1;
                    } else if(rowIndex < data[secIndex][1].length && rowIndex > -1) {
                        absIndex = increment(clones[secIndex][1][rowIndex], absIndex);
                        rowIndex--;
                    }
                }
            } else {
                rowIndex = rowIndex - 1;
                while(rowIndex < data.length && rowIndex >= 0) {
                    absIndex = increment(clones[rowIndex], absIndex);
                    rowIndex--;
                }
            }
        }

        return absIndex;
    };

    var _applyNodeStyles = function SegmentedUI2$__applyNodeStyles() {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, index = 0, isHeaderNode = false,
            firstRow = null, firstRowIndex = null;

        firstRow = _getFirstRederedRow.call(this);
        firstRowIndex = _deduceIndex.call(this, firstRow);

        if(firstRowIndex[1] !== -1) {
            index = firstRowIndex[1];
        }

        $KU.each(this._kwebfw_.rows, function(clone) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils, $KD = $K.dom,
                li = null, ii = clone._kwebfw_.ii;

            if(!$KU.is(clone, 'null') && clone._kwebfw_.view) {
                li = $KD.closest(clone._kwebfw_.view, 'kr', 'item');
            }

            if(isHeaderNode) {
                firstRowIndex = _deduceIndex.call(this, clone);
                if(firstRowIndex[1] !== -1) {
                    index = firstRowIndex[1];
                }
                isHeaderNode = false;
            }

            if(li) {
                _applyRowAndHeaderSkin.call(this, li, clone, index);
                _applyRowSeparator.call(this, li, clone);

                if(ii.indexOf(',-1') !== -1) {
                    isHeaderNode = true;
                } else {
                    index++;
                }
            }
        }, this);
    };


    //This function will be called in the scope of widget instance
    var _applyRowSeparator = function SegmentedUI2$_applyRowSeparator(li, clone) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KD = $K.dom, color = '',
            index = _deduceIndex.call(this, clone), thickness = '',
            rowIndex = index[1], prop = this._kwebfw_.prop;

        if(prop.separatorRequired && prop.viewType === constants.SEGUI_VIEW_TYPE_TABLEVIEW) {
            //If not the first row, then add separator
            if(!((rowIndex === -1) || (rowIndex === 0))) {
                thickness = (prop.separatorThickness + 'px');
                color = $KU.convertHexToRGBA(prop.separatorColor);
                $KD.style(li, 'borderTop', (thickness+' solid '+(color || 'transparent')));
            } else {
                $KD.style(li, 'border-top', null);
            }
        } else {
            $KD.style(li, 'border-top', null);
        }
    };


    //This function will be called in the scope of widget instance
    var _applyRowAndHeaderSkin = function SegmentedUI2$_applyRowAndHeaderSkin(li, clone, index) {
        var $K = voltmx.$kwebfw$, $KD = $K.dom, ii = clone._kwebfw_.ii,
            prop = this._kwebfw_.prop, rowSkin = prop.rowSkin;

        if(ii.indexOf(',-1') !== -1) {
            // sectionHeaderSkin
            $KD.setAttr(li, 'class', prop.sectionHeaderSkin);
        } else {
            // Row Skin and alternate Row Skin
            if(prop.alternateRowSkin && prop.viewType === constants.SEGUI_VIEW_TYPE_TABLEVIEW) {
                if(index % 2 !== 0) rowSkin = prop.alternateRowSkin;
            }
            $KD.setAttr(li, 'class', rowSkin);
        }
    };

    //This function will be called in the scope of widget instance
    var _clearSelectedIndices = function SegmentedUI2$_clearSelectedIndices() {
        var _ = this._kwebfw_, rows = _.selectedRows;

        rows.splice(0, rows.length);

        _setSelectedRowsRelatedProperties.call(this);

        if(_.swipeContext) _.swipeContext = null;
    };


    //This function will be called in the scope of widget instance
    var _deduceIndex = function SegmentedUI2$_deduceIndex(index) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, secIndex = -1,
            rowIndex = -1;

        if($KU.is(index, 'widget')) {
            index = index._kwebfw_.ii;
        }

        if($KU.is(index, 'string') && index) {
            index = index.split(',');
            if(index.length === 2) {
                secIndex = parseInt(index[0], 10);
                rowIndex = parseInt(index[1], 10);

                if(!$KU.is(secIndex, 'number')) {
                    secIndex = -1;
                }
                if(!$KU.is(rowIndex, 'number')) {
                    rowIndex = -1;
                }
            }
        } else if($KU.is(index, 'number')) {
            secIndex = -1;
            rowIndex = index;
        } else if($KU.is(index, 'array')
        && $KU.is(index[0], 'number')
        && $KU.is(index[1], 'number')) {
            secIndex = index[0];
            rowIndex = index[1];
        }

        if(secIndex < -1) secIndex = -1;
        if(rowIndex < -1) rowIndex = -1;

        return [secIndex, rowIndex];
    };

    //This function must be called in the scope of widget instance
    var _deduceTagName = function SegmentedUI2$_deduceTagName(tag) {
        var a11y = this._kwebfw_.prop.accessibilityConfig;

        tag = (a11y && a11y.tagName) ? a11y.tagName.toLowerCase() : 'ul';

        return tag;
    };


    //All widget file must have this variable
    //All the functions will be called in the scope of widget instance
    var _dependentPropertiesValidationMessage = {
        SegmentedUI2: function SegmentedUI2$_dependentPropertiesValidationMessage(prop, bconfig/*, lconfig, pspconfig*/) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false, message = '',
                sectionable = false, data = bconfig.data || prop.data,
                index = bconfig.selectedRowIndex || prop.selectedRowIndex;

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
                message += 'Segment <selectedRowIndex> value is invalid';
            }

            return message;
        }
    };


    //This function will be called in the scope of widget instance
    var _executeOnRow = function SegmentedUI2$_executeOnRow(index, callback, args) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget, tpl = null,
            data = this._kwebfw_.prop.data, item = null, secIndex = -1, rowIndex = -1;

        index = _deduceIndex.call(this, index);
        secIndex = index[0]; rowIndex = index[1];

        if(secIndex === -1 && rowIndex === -1) return;

        if(_isSectionDS(data[0])) {
            if(secIndex >= 0 && secIndex < data.length) {
                if(rowIndex < 0) {
                    if($KU.is(callback, 'function')) {
                        if(!$KU.is(args, 'array')) args = [];
                        item = data[secIndex][0];
                        if($KU.is(item, 'string')) {
                            tpl = _getFrameworkHeaderTemplate();
                        } else {
                            tpl = item.template || this.sectionHeaderTemplate;
                        }

                        tpl = $KW.getTemplate(this, tpl);

                        if(!$KU.is(this._kwebfw_.clones[secIndex], 'array')) {
                            this._kwebfw_.clones[secIndex] = [null, []];
                        } else if($KU.is(this._kwebfw_.clones[secIndex][0], 'widget')) {
                            _flushClones(this._kwebfw_.clones[secIndex][0]);
                            this._kwebfw_.clones[secIndex][0] = null;
                        }

                        args.splice(0, 0, [secIndex, rowIndex]);
                        args.splice(1, 0, item);
                        args.splice(2, 0, tpl);
                        args.splice(3, 0, this._kwebfw_.clones[secIndex][0]);

                        callback.apply(this, args);
                    }
                } else if(rowIndex >= 0 && rowIndex < data[secIndex][1].length) {
                    if($KU.is(callback, 'function')) {
                        if(!$KU.is(args, 'array')) args = [];
                        item = data[secIndex][1][rowIndex];
                        tpl = item.template || this.rowTemplate;
                        tpl = $KW.getTemplate(this, tpl);

                        if(!$KU.is(this._kwebfw_.clones[secIndex], 'array')) {
                            this._kwebfw_.clones[secIndex] = [null, []];
                        }

                        if($KU.is(this._kwebfw_.clones[secIndex][1][rowIndex], 'widget')) {
                            _flushClones(this._kwebfw_.clones[secIndex][1][rowIndex]);
                            this._kwebfw_.clones[secIndex][1][rowIndex] = null;
                        }

                        args.splice(0, 0, [secIndex, rowIndex]);
                        args.splice(1, 0, item);
                        args.splice(2, 0, tpl);
                        args.splice(3, 0, this._kwebfw_.clones[secIndex][1][rowIndex]);

                        callback.apply(this, args);
                    }
                }
            }
        } else if(secIndex < 0) {
            if(rowIndex >= 0 && rowIndex < data.length) {
                if($KU.is(callback, 'function')) {
                    if(!$KU.is(args, 'array')) args = [];
                    item = data[rowIndex];
                    tpl = item.template || this.rowTemplate;
                    tpl = $KW.getTemplate(this, tpl);

                    if($KU.is(this._kwebfw_.clones[rowIndex], 'widget')) {
                        _flushClones(this._kwebfw_.clones[rowIndex]);
                        this._kwebfw_.clones[rowIndex] = null;
                    }

                    args.splice(0, 0, [secIndex, rowIndex]);
                    args.splice(1, 0, item);
                    args.splice(2, 0, tpl);
                    args.splice(3, 0, this._kwebfw_.clones[rowIndex]);

                    callback.apply(this, args);
                }
            }
        }
    };

    //This function will be called in the scope of widget instance
    var _flushClones = function SegmentedUI2$_flushClones(clones, config) {
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

                    $KU.each(section[1], function(row) {
                        var $K = voltmx.$kwebfw$, $KU = $K.utils;

                        if($KU.is(row, 'widget')) {
                            row._flush(config);
                        }
                    });
                } else if($KU.is(section, 'widget')) {
                    section._flush(config);
                }
            }, this);
        }
    };

    var _flushPageNav = function SegmentedUI2$_flushClones(el) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KD = $K.dom;

        $KU.each($KD.children(el), function(img) {
            $KD.off(img);
            $KD.removeAttr(img, 'loading');
        });
    };

    //This function will be called in the scope of widget instance
    var _getClonedTemplate = function SegmentedUI2$_getClonedTemplate(index) {
        var $K = voltmx.$kwebfw$, $KW = $K.widget, template = null;

        _executeOnRow.call(this, index, function(index, item, tpl/*, clone*/) {
            var secIndex = index[0], rowIndex = index[1],
                prop = this._kwebfw_.prop, self = this;

            template = $KW.cloneTemplate(tpl, item, prop.widgetDataMap, function(model/*, pmodel, windex*/) {
                model._kwebfw_.ii = index.join(',');
                _updateSpecialProperties.call(self, model);
                _setBehaviorConfig.call(self, model);
            });

            if(secIndex === -1) {
                this._kwebfw_.clones[rowIndex] = template;
            } else {
                if(rowIndex === -1) {
                    this._kwebfw_.clones[secIndex][0] = template;
                } else {
                    this._kwebfw_.clones[secIndex][1][rowIndex] = template;
                }
            }

            //if segment lazy load enabled the cloned template and its children need not marked for relayout
            if(_shouldLazyLoad.call(this)) {
                _lazyLoad.SegmentedUI2._removeFromRelayout.call(this, template);
            }
        });

        return (template && template.isVisible) ? template : null;
    };


    var _getFrameworkHeaderTemplate = function SegmentedUI2$_getFrameworkHeaderTemplate() {
        var flx = null, lbl = null, bconfig = null;

        if(_frameworkHeaderTemplate === null) {
            bconfig = {
                'id': 'flxkwebfwHeader',
                'layoutType': voltmx.flex.FREE_FORM,
                'height': voltmx.flex.USE_PREFERRED_SIZE,
                'autogrowMode': voltmx.flex.AUTOGROW_HEIGHT
            };

            flx = new voltmx.ui.FlexContainer(bconfig);
            lbl = new voltmx.ui.Label({'id': 'labelkwebfwHeader'});
            flx.add(lbl);
            _frameworkHeaderTemplate = flx;
        }


        return _frameworkHeaderTemplate;
    };


    var _getIndex = function SegmentedUI2$_getIndex(find, list) {
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
    var _getIndexedInfo = function SegmentedUI2$_getIndexedInfo(index, data) {
        var item = null, _ = this._kwebfw_, prop =_.prop, secIndex = -1, rowIndex = -1;

        index = _deduceIndex.call(this, index);
        secIndex = index[0]; rowIndex = index[1];

        if(secIndex === -1 && rowIndex === -1) return null;

        if(secIndex < 0) {
            if(rowIndex >= 0 && rowIndex < prop.data.length) {
                item = data[rowIndex];
            }
        } else if(_isSectionDS(prop.data[0])) {
            if(secIndex >= 0 && secIndex < prop.data.length) {
                if(rowIndex < 0) {
                    item = data[secIndex][0];
                } else if(rowIndex >= 0 && rowIndex < prop.data[secIndex][1].length) {
                    item = data[secIndex][1][rowIndex];
                }
            }
        }

        return item;
    };


    var _getInvertedDataMap = function SegmentedUI2$_getInvertedDataMap(map) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, invertedMap = {};

        if($KU.is(map, 'object')) {
            $KU.each(map, function(value, key) {
                invertedMap[value] = key;
            });
        }

        return invertedMap;
    };

    var _getFirstRederedRow = function SegmentedUI2$_getFirstRederedRow() {
        var rows = this._kwebfw_.rows;

        return rows[0];
    };

    var _getLastRenderedRow = function SegmentedUI2$_getLastRenderedRow() {
        var rows = this._kwebfw_.rows;

        return rows[rows.length-1];
    };


    //This function will be called in the scope of widget instance
    var _getRenderableClones = function SegmentedUI2$_getRenderableClones(startIndex, endIndex) {
        var data = this._kwebfw_.prop.data, rows = [], startSecIndex = startIndex[0],
            startRowIndex = startIndex[1], endSecIndex = -1, endRowIndex = -1,
            datalen = 0;

        var cloneRow = function(model, index) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils,
                tpl = _getClonedTemplate.call(model, index);

            if($KU.is(tpl, 'widget')) {
                rows.push(tpl);
            }
        };

        if(startSecIndex <= -1 && startRowIndex <= -1) return rows;

        if(data) {
            datalen = data.length - 1;

            if(!endIndex) {
                if(_isSectionDS(data[0])) endSecIndex = datalen;
                else endRowIndex = datalen;
            } else {
                endSecIndex = endIndex[0];
                endRowIndex = endIndex[1];
                if(_isSectionDS(data[0])) {
                    if(endSecIndex > datalen) endSecIndex = datalen;
                } else {
                    if(endRowIndex > datalen) endRowIndex = datalen;
                }
            }

            if(_isSectionDS(data[0])) {
                while(startSecIndex <= endSecIndex) {
                    if(startRowIndex >= data[startSecIndex][1].length) {
                        startSecIndex++;
                        startRowIndex = -1;
                    } else {
                        cloneRow(this, [startSecIndex, startRowIndex]);
                        startRowIndex++;
                    }
                }
            } else {
                while(startRowIndex <= endRowIndex && startRowIndex >= 0) {
                    cloneRow(this, [startSecIndex, startRowIndex]);
                    startRowIndex++;
                }
            }
        }

        return rows;
    };


    //This function will be called in the scope of widget instance
    var _getRowContext = function SegmentedUI2$_getRowContext(clone) {
        var cindex = clone._kwebfw_.ii.split(','),
            secIndex = parseInt(cindex[0], 10),
            rowIndex = parseInt(cindex[1], 10);
        return {
            sectionIndex: (secIndex === -1 ? 0 :secIndex),
            rowIndex: rowIndex
        };
    };


    //This function will be called in the scope of widget instance
    var _getRowCount = function SegmentedUI2$_getRowCount() {
        var prop = this._kwebfw_.prop, rowcount = 0,
            secIndex = -1, rowIndex = -1;

        if(prop.data && prop.data.length) {
            if(_isSectionDS(prop.data[0])) {
                secIndex = (prop.data.length - 1);
                rowIndex = (prop.data[secIndex][1].length - 1);
            } else {
                rowIndex = (prop.data.length - 1);
            }
            rowcount = (_absoluteIndexInData.call(this, [secIndex, rowIndex]) + 1);
        }

        return rowcount;
    };

    //This function will be called in the scope of widget instance
    var _getTemplateByIndex = function SegmentedUI2$_getTemplateByIndex(index) {
        var tpl = null,  _ = this._kwebfw_, data = _.prop.data,
            clones = _.clones, secIndex = -1, rowIndex = -1;

        index = _deduceIndex.call(this, index);
        secIndex = index[0];
        rowIndex = index[1];

        if (secIndex === -1 && rowIndex === -1) return null;

        if (secIndex < 0) {
            if (rowIndex >= 0 && rowIndex < data.length) {
                tpl = clones[rowIndex];
            }
        } else if (_isSectionDS(data[0])) {
            if (secIndex >= 0 && secIndex < data.length) {
                if (rowIndex < 0) {
                    tpl = clones[secIndex][0];
                } else if (
                    rowIndex >= 0 &&
                    rowIndex < data[secIndex][1].length
                ) {
                    tpl = clones[secIndex][1][rowIndex];
                }
            }
        }

        return tpl;
    };

    var _getVisibleRow = function SegmentedUI2$_getVisibleRow(config) {
        var $K = voltmx.$kwebfw$, $KW = $K.widget, $KU = $K.utils,
            $KD = $K.dom, el = $KW.el(this), visibleRow = null,
            scrollTop = 0, scrollBottom = 0, index = null, visibleIndex = null,
            prop = this._kwebfw_.prop, rowNodes = [];

        if(el.node) {
            rowNodes = $KD.children(el.scrolee);
        }

        if(rowNodes.length > 0) {
            scrollTop = el.viewport.scrollTop;
            scrollBottom = scrollTop + el.viewport.offsetHeight;

            $KU.each(rowNodes, function(li, index) {
                var rowTop = li.offsetTop + el.scrolee.offsetTop, rowBottom = rowTop + li.offsetHeight;

                if(config.firstRow && scrollTop < rowBottom) {
                    visibleRow = li;
                    return true;
                }

                if(config.lastRow
                && (scrollBottom < rowTop || scrollBottom <= rowBottom + 1
                    || index === rowNodes.length - 1)) {
                    visibleRow = li;
                    return true;
                }
            });

            index = visibleRow && $KD.getAttr(visibleRow, 'kii');
            index = _deduceIndex.call(this, index);

            if(_isSectionDS(prop.data[0])) {
                visibleIndex = {sectionIndex: index[0]};
                if(index[1] !== -1) visibleIndex['rowIndex'] = index[1];
            } else {
                visibleIndex = {rowIndex: index[1]};
            }
        }

        return visibleIndex;
    };


    //All widget file must have this variable
    //All the functions will be called in the scope of widget instance
    var _getter = {
        SegmentedUI2: {
            contentOffset: function FlexScrollContainer$_getter_contentOffset(value) {
                return {x:value.x, y:value.y};
            },

            contentOffsetMeasured: function SegmentedUI2$_getter_contentOffsetMeasured(value) {
                var _ = this._kwebfw_, prop = _.prop, scroll = _.ui.scroll, rowIndex = -1;

                if(prop.viewType === constants.SEGUI_VIEW_TYPE_TABLEVIEW) {
                    value.x = scroll.x;
                    value.y = scroll.y;
                } else {
                    if(_.swipeContext && _.swipeContext.currentPage > -1) {
                        rowIndex = _.swipeContext.currentPage;
                    } else if(prop.selectedRowIndex && prop.selectedRowIndex.length === 2) {
                        rowIndex = prop.selectedRowIndex[1];
                    }
                    if(_.swipeContext && _.swipeContext.imageWidth) {
                        value.x = rowIndex * (_.swipeContext.imageWidth);
                    } else {
                        value.x = 0;
                    }
                    value.y = 0;
                }
                return {x:value.x, y:value.y};
            },

            data: function SegmentedUI2$_getter_data(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, data = [];

                if(!value) {
                    return value;
                }
                if(!_isSectionDS(value)) {
                    data = value.slice(0);
                } else {
                    $KU.each(value, function(section) {
                        data.push([section[0], section[1].slice(0)]);
                    });
                }

                return data;
            },

            scrollingEvents: function SegmentedUI2$_getter_scrollingEvents(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils,
                    scrollingEvents = value ? {} : null;

                $KU.each(value, function(val, key) {
                    scrollingEvents[key] = val;
                });

                return scrollingEvents;
            },

            selectedRowIndex: function SegmentedUI2$_getter_selectedRowIndex(value) {
                var prop = this._kwebfw_.prop, index = null;

                if(prop.selectedRowIndex) {
                    if(value[0] === -1) {
                        index = [0, value[1]];
                    } else {
                        index = value.slice(0);
                    }
                }

                return index;
            },

            selectedRowIndices: function SegmentedUI2$_getter_selectedRowIndices(/*value*/) {
                var prop = this._kwebfw_.prop, indices = null, s = 0,
                    slen = 0, sindex = 0, rindexes = null;

                if(prop.selectedRowIndices) {
                    indices = [];
                    slen = prop.selectedRowIndices.length;

                    for(s=0; s<slen; s++) {
                        sindex = prop.selectedRowIndices[s][0];
                        rindexes = prop.selectedRowIndices[s][1];

                        if(sindex === -1) sindex = 0;
                        indices.push([sindex, rindexes.slice(0)]);
                    }
                }

                return indices;
            },

            widgetDataMap: function SegmentedUI2$_getter_widgetDataMap(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils;

                return $KU.clone(value);
            }
        }
    };


    //This function will be called in the scope of widget instance
    var _iterateOverData = function SegmentedUI2$_iterateOverData(data, callback) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils,
            s = 0, r = 0, slen = 0, rlen = 0;

        if(!$KU.is(callback, 'function')) return;

        if($KU.is(data, 'array')) {
            if(_isSectionDS(data[0])) {
                slen = data.length;

                for(s=0; s<slen; s++) {
                    rlen = data[s][1].length;

                    if(callback.call(this, data[s][0], -1, s) === true) {
                        break;
                    }

                    for(r=0; r<rlen; r++) {
                        if(callback.call(this, data[s][1][r], r, s) === true) {
                            break;
                        }
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
    //eslint-disable-next-line no-unused-vars
    var _isSectionCollapsed = function SegmentedUI2$_isSectionCollapsed(index) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, data = null,
            _ = this._kwebfw_, prop = _.prop, collapsed = false;

        if(prop.data) {
            if($KU.is(index, 'number') && index >= 0
            && index < prop.data.length) {
                data = prop.data[index][0];

                if($KU.is(data.metaInfo, 'object')
                && data.metaInfo.collapsed === true) {
                    collapsed = true;
                }
            }
        }

        return collapsed;
    };


    var _isSectionDS = function SegmentedUI2$_isSectionDS(data) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

        if($KU.is(data, 'array')
        && ($KU.is(data[0], 'object') || $KU.is(data[0], 'string'))
        && $KU.is(data[1], 'array')) {
            flag = true;
        }

        return flag;
    };


    //This function will be called in the scope of widget instance
    var _isRowRendered = function SegmentedUI2$_isRowRendered(secIndex, rowIndex) {
        var flag = false, clone = null, r = 0, _ = this._kwebfw_,
            clones = _.clones, rows = _.rows, rlen = rows.length;

        if(clones.length > 0) {
            if(_isSectionDS(_.prop.data[0])) {
                if(rowIndex <= -1) clone = clones[secIndex];
                else clone = clones[secIndex][1][rowIndex];
            } else {
                clone = clones[rowIndex];
            }

            if(clone) {
                for(r=0; r<rlen; r++) {
                    if(rows[r] === clone) {
                        flag = true;
                        break;
                    }
                }
            }
        }

        return flag;
    };

    var _lazyLoad = {
        SegmentedUI2: {
            _action: {
                _addAll: function SegmentedUI2$_lazyLoad_action_addAll(el, index, anim) {
                    var $K = voltmx.$kwebfw$, $KW = $K.widget, $KD = $K.dom,
                        _ = this._kwebfw_, clones = _.clones, data = _.prop.data,
                        rows = null, prevLength, isSec = _isSectionDS(data[0]),
                        rowIndex = index[1], sectionIndex = index[0];

                    if(_.searcher) {
                        _searcher.SegmentedUI2.updateFilterResult.call(this);
                    }
                    if(el.node && $KW.visible(this)) {
                        //check scroll before update and store in _.hasScroll
                        _.hasScroll = _lazyLoad.SegmentedUI2._hasScroll.call(this, el);

                        if(isSec) {
                            for(sectionIndex; sectionIndex < data.length; sectionIndex++) {
                                if(clones[sectionIndex] === undefined) {
                                    _.clones[sectionIndex] = new Array(2);
                                    _.clones[sectionIndex][1] = new Array(data[sectionIndex].length);
                                }
                            }
                        } else {
                            for(rowIndex; rowIndex < data.length; rowIndex++) {
                                if(clones[rowIndex] === undefined) {
                                    _.clones.length++;
                                }
                            }
                        }

                        if(_.rows.length === 0) {
                            index = isSec ? [0, -1] : [-1, 0];
                        } else {
                            index = null;
                        }
                        _lazyLoad.SegmentedUI2._addBottomBuffer.call(this, _lazyLoad.SegmentedUI2._getBufferSize(), index);
                        _lazyLoad.SegmentedUI2._adjustRowsOnViewUpdate.call(this);

                        if(_animator.SegmentedUI2.canAnimate.call(this, anim)) {
                            prevLength = $KD.children(el.scrolee).length;
                            rows = [].slice.call($KD.children(el.scrolee), prevLength);
                            _animator.SegmentedUI2.onRowDisplayHandler.call(this, voltmx.segment.ADD, clones);
                            _animator.SegmentedUI2.applyRowsAnimationByAPI.call(this, 'addall', rows, -1, -1, anim);
                        }
                    }
                },

                _addDataAt: function SegmentedUI2$_lazyLoad_action_addDataAt(secIndex, rowIndex, widgetdata, anim) {
                    var $K = voltmx.$kwebfw$, $KW = $K.widget, $KD = $K.dom, clone = null,
                        el = $KW.el(this), _ = this._kwebfw_, data = _.prop.data,
                        needToTouchView = false, section = _isSectionDS(data[0]), absIndex = null,
                        rowNode = null, firstRowIndex = null, lastRowIndex = null;

                    if($KW.visible(this)) {
                        _.hasScroll = _lazyLoad.SegmentedUI2._hasScroll.call(this, el);

                        //update indices(ii)
                        _updateIndexes.call(this, rowIndex, secIndex);

                        firstRowIndex = _deduceIndex.call(this, _getFirstRederedRow.call(this));
                        lastRowIndex = _deduceIndex.call(this, _getLastRenderedRow.call(this));

                        needToTouchView = _lazyLoad.SegmentedUI2._needToTouchView(secIndex, rowIndex, firstRowIndex, lastRowIndex, section);

                        if(needToTouchView) {
                            clone = _getClonedTemplate.call(this, [secIndex, rowIndex]);
                            if(clone) {
                                rowNode = _renderRows.call(this, [clone]);
                                absIndex = _lazyLoad.SegmentedUI2._absoluteIndexInRows.call(this, secIndex, rowIndex, true);
                                if(absIndex === _.rows.length) {
                                    _.rows.push(clone);
                                    $KD.add(el.scrolee, rowNode);
                                } else {
                                    _.rows.splice(absIndex, 0, clone);
                                    $KD.addAt(el.scrolee, rowNode, absIndex);
                                }

                                _lazyLoad.SegmentedUI2._getRowsHeight.call(this, [clone]);
                            }
                        } else if(firstRowIndex[0] === -1 && firstRowIndex[1] === -1) {
                            //if there are no rows in the view port, render from first section
                            _lazyLoad.SegmentedUI2._renderFromIndex.call(this, [secIndex, rowIndex], el);
                        }

                        if(section) {
                            if(secIndex > lastRowIndex[0]
                                || (secIndex === lastRowIndex[0] && rowIndex > lastRowIndex[1])) {
                                _lazyLoad.SegmentedUI2._checkScrollHeightandAddBufferByDir.call(this, el, 'bottom');
                            } else if(secIndex < firstRowIndex[0]
                                || (secIndex === firstRowIndex[0] && rowIndex < firstRowIndex[1])) {
                                _lazyLoad.SegmentedUI2._checkScrollHeightandAddBufferByDir.call(this, el, 'top', [secIndex, rowIndex]);
                            }
                        } else {
                            if(rowIndex > lastRowIndex[1]) {
                                _lazyLoad.SegmentedUI2._checkScrollHeightandAddBufferByDir.call(this, el, 'bottom');
                            } else if(rowIndex < firstRowIndex[1]) {
                                _lazyLoad.SegmentedUI2._checkScrollHeightandAddBufferByDir.call(this, el, 'top', [secIndex, rowIndex]);
                            }
                        }
                        _lazyLoad.SegmentedUI2._adjustRowsOnViewUpdate.call(this);

                        if(clone && _animator.SegmentedUI2.canAnimate.call(this, anim)) {
                            _animator.SegmentedUI2.onRowDisplayHandler.call(this, voltmx.segment.ADD, [clone]);
                            _animator.SegmentedUI2.applyRowsAnimationByAPI.call(this, 'adddataat', rowNode, rowIndex, secIndex, anim);
                        }

                        if(_.searcher) {
                            _searcher.SegmentedUI2.updateFilterResult.call(this);
                            _searcher.SegmentedUI2.updateSearchText.call(this, clone);
                        }
                    }
                },

                _addSectionAt: function SegmentedUI2$_lazyLoad_action_addSectionAt(secIndex, rowIndex, newdata, anim) {
                    var $K = voltmx.$kwebfw$, $KW = $K.widget, removedHeight = 0,
                        clones = [], el = $KW.el(this), _ = this._kwebfw_,
                        firstRowIndex = null, lastRowIndex = null, rows = [];

                    //Handle Search
                    if(_.searcher) {
                        _searcher.SegmentedUI2.updateFilterResult.call(this);
                    }
                    if($KW.visible(this)) {
                        _.hasScroll = _lazyLoad.SegmentedUI2._hasScroll.call(this, el);

                        _updateIndexes.call(this, secIndex, -1);

                        //get firstRowIndex and lastRowIndex in the view port
                        firstRowIndex = _deduceIndex.call(this, _getFirstRederedRow.call(this));
                        lastRowIndex = _deduceIndex.call(this, _getLastRenderedRow.call(this));

                        if(firstRowIndex[0] === -1 && firstRowIndex[1] === -1) {
                            //if there are no rows in the view port, render from first section
                            _lazyLoad.SegmentedUI2._renderFromIndex.call(this, [secIndex, -1], el);
                        } else if(secIndex > firstRowIndex[0] && secIndex < lastRowIndex[0]) {
                            //if the section to be set with in the view port, then remove all rows from the given section index
                            //and re-render from the given section index
                            removedHeight = _lazyLoad.SegmentedUI2._removeRowsFromViewFromIndex.call(this, [secIndex, rowIndex]);
                            _lazyLoad.SegmentedUI2._addRowsTillGivenHeight.call(this, removedHeight);
                            _lazyLoad.SegmentedUI2._checkScrollHeightandAddBufferByDir.call(this, el, 'bottom');
                        } else {
                            if(secIndex < firstRowIndex[0]) {
                                _lazyLoad.SegmentedUI2._checkScrollHeightandAddBufferByDir.call(this, el, 'top', [secIndex, -1]);
                            } else if(secIndex > lastRowIndex[0]) {
                                _lazyLoad.SegmentedUI2._checkScrollHeightandAddBufferByDir.call(this, el, 'bottom');
                            }
                        }
                        _lazyLoad.SegmentedUI2._adjustRowsOnViewUpdate.call(this);

                        //Handle Animation
                        if(_animator.SegmentedUI2.canAnimate.call(this, anim)) {
                            _lazyLoad.SegmentedUI2._getRowsToAnimate.call(this, secIndex, rowIndex, clones, rows);
                            _animator.SegmentedUI2.onRowDisplayHandler.call(this, voltmx.segment.ADD, clones);
                            _animator.SegmentedUI2.applyRowsAnimationByAPI.call(this, 'addsectionat', rows, -1, -1, anim);
                        }
                    }
                },

                _removeAt: function SegmentedUI2$_lazyLoad_action_removeAt(secIndex, rowIndex) {
                    var $K = voltmx.$kwebfw$, $KW = $K.widget, $KD = $K.dom,
                        el = $KW.el(this), _ = this._kwebfw_, data = _.prop.data,
                        needToTouchView = false, section = _isSectionDS(data[0]),
                        firstRowIndex = null, lastRowIndex = null, absIndex = null;

                    if(_.searcher) {
                        _searcher.SegmentedUI2.updateFilterResult.call(this);
                    }
                    if($KW.visible(this)) {
                        _.hasScroll = _lazyLoad.SegmentedUI2._hasScroll.call(this, el);

                        firstRowIndex = _deduceIndex.call(this, _getFirstRederedRow.call(this));
                        lastRowIndex = _deduceIndex.call(this, _getLastRenderedRow.call(this));

                        needToTouchView = _lazyLoad.SegmentedUI2._needToTouchView(secIndex, rowIndex, firstRowIndex, lastRowIndex, section);

                        if(needToTouchView) {
                            absIndex = _lazyLoad.SegmentedUI2._absoluteIndexInRows.call(this, secIndex, rowIndex);
                            if(absIndex !== -1) {
                                _.rows.splice(absIndex, 1);
                                $KD.removeAt(el.scrolee, absIndex);
                            }
                        }

                        _updateIndexes.call(this, rowIndex, secIndex);
                        _lazyLoad.SegmentedUI2._adjustRowsOnViewUpdate.call(this);
                    }
                },

                _removesectionat: function SegmentedUI2$_lazyLoad_action_removesectionat(secIndex, rowIndex, anim) {
                    var $K = voltmx.$kwebfw$, $KW = $K.widget, $KD = $K.dom,
                        $KU =$K.utils, _ = this._kwebfw_, clones = null,
                        el = $KW.el(this), rows = [], cloneModels = [];

                    clones = _.clones[secIndex];
                    $KU.each(_.rows, function(row, nodeIndex) {
                        var index = _deduceIndex.call(this, row);
                        if(index[0] === secIndex) {
                            rows.push($KD.childAt(el.scrolee, nodeIndex));
                        }
                    }, this);

                    $KU.each(clones[1], function(clone/*, index*/) {
                        if(clone && $KU.is(clone, 'widget') && clone.isVisible) {
                            cloneModels.push(clone);
                        }
                    });
                    _animator.SegmentedUI2.onRowDisplayHandler.call(this, voltmx.segment.REMOVE, cloneModels);
                    _animator.SegmentedUI2.applyRowsAnimationByAPI.call(this, 'removesectionat', rows, rowIndex, secIndex, anim);
                },

                _removeSectionAt: function SegmentedUI2$_lazyLoad_action_removeSectionAt(secIndex, rowIndex) {
                    var $K = voltmx.$kwebfw$, $KW = $K.widget, $KD = $K.dom,
                        $KU =$K.utils, _ = this._kwebfw_, absIndex = -1, delCount = 0,
                        el = $KW.el(this), firstRowIndex = [], lastRowIndex = [],
                        rows = _.rows;

                    if(_.searcher) {
                        _searcher.SegmentedUI2.updateFilterResult.call(this);
                    }
                    if($KW.visible(this)) {
                        _.hasScroll = _lazyLoad.SegmentedUI2._hasScroll.call(this, el);

                        firstRowIndex = _deduceIndex.call(this, _getFirstRederedRow.call(this));
                        lastRowIndex = _deduceIndex.call(this, _getLastRenderedRow.call(this));

                        if(secIndex >= firstRowIndex[0] && secIndex <= lastRowIndex[0]) {
                            $KU.each(rows, function(row, rowindex) {
                                rowIndex = _deduceIndex.call(this, row);
                                if(rowIndex[0] === secIndex && row.isVisible) {
                                    if(absIndex === -1) {
                                        absIndex = rowindex;
                                    }
                                    $KD.removeAt(el.scrolee, absIndex);
                                    delCount++;
                                }
                            }, this);
                            _.rows.splice(absIndex, delCount);
                        }
                        _updateIndexes.call(this, secIndex, -1);
                        _lazyLoad.SegmentedUI2._adjustRowsOnViewUpdate.call(this);
                    }
                },

                _setDataAt: function SegmentedUI2$_lazyLoad_action_setDataAt(secIndex, rowIndex, widgetdata, anim) {
                    var $K = voltmx.$kwebfw$, $KW = $K.widget, $KD = $K.dom,
                        clone = null, el = $KW.el(this), _ = this._kwebfw_, rowNode = null,
                        data = _.prop.data, needToTouchView = false, section = _isSectionDS(data[0]),
                        lastRowIndex = null, firstRowIndex = null, absIndex = null, prevIndex = null;

                    if(_.searcher) {
                        _searcher.SegmentedUI2.updateFilterResult.call(this);
                    }

                    if($KW.visible(this)) {
                        _.hasScroll = _lazyLoad.SegmentedUI2._hasScroll.call(this, el);

                        if(section && _.clones[secIndex][1][rowIndex]) {
                            _flushClones(_.clones[secIndex][1][rowIndex]);
                            _.clones[secIndex][1][rowIndex] = undefined;
                        } else if(!section && _.clones[rowIndex]) {
                            _flushClones(_.clones[rowIndex]);
                            _.clones[rowIndex] = undefined;
                        }

                        firstRowIndex = _deduceIndex.call(this, _getFirstRederedRow.call(this));
                        lastRowIndex = _deduceIndex.call(this, _getLastRenderedRow.call(this));
                        needToTouchView = _lazyLoad.SegmentedUI2._needToTouchView(secIndex, rowIndex, firstRowIndex, lastRowIndex, section);

                        if(needToTouchView) {
                            clone = _getClonedTemplate.call(this, [secIndex, rowIndex]);

                            //if the row can be rendered, them clone is not null
                            if(clone) {
                                rowNode = _renderRows.call(this, [clone]);

                                absIndex = _lazyLoad.SegmentedUI2._absoluteIndexInRows.call(this, secIndex, rowIndex, true);
                                prevIndex = _deduceIndex.call(this, _.rows[absIndex]);

                                if(secIndex !== prevIndex[0] || (secIndex === prevIndex[0] && rowIndex !== prevIndex[1])) {
                                    _.rows.splice(absIndex, 0, clone);
                                    $KD.addAt(el.scrolee, rowNode, absIndex);
                                } else {
                                    _.rows[absIndex] = clone;
                                    $KD.replace(rowNode, $KD.childAt(el.scrolee, absIndex));
                                }
                                if(_.searcher) {
                                    _searcher.SegmentedUI2.updateSearchText.call(this, clone);
                                }
                                _lazyLoad.SegmentedUI2._getRowsHeight.call(this, [clone]);

                                if(_animator.SegmentedUI2.canAnimate.call(this, anim)) {
                                    _animator.SegmentedUI2.onRowDisplayHandler.call(this, voltmx.segment.UPDATE, [clone]);
                                    _animator.SegmentedUI2.applyRowsAnimationByAPI.call(this, 'setdataat', rowNode, rowIndex, secIndex, anim);
                                }
                            } else {
                                //if the row cannot be rendered in case of visibility false on row template,
                                //then clone will be null
                                absIndex = _lazyLoad.SegmentedUI2._absoluteIndexInRows.call(this, secIndex, rowIndex, false);

                                //if the clone is null, and the row is already present in view port we need to remove it
                                if(absIndex >= 0) {
                                    _.rows.splice(absIndex, 1);
                                    $KD.removeAt(el.scrolee, absIndex);
                                }
                            }
                        }

                        if(secIndex < firstRowIndex[0] || (secIndex === firstRowIndex[0] && rowIndex < firstRowIndex[1])) {
                            _lazyLoad.SegmentedUI2._checkScrollHeightandAddBufferByDir.call(this, el, 'top', [secIndex, rowIndex]);
                        }
                        if(secIndex > lastRowIndex[0] || (secIndex === lastRowIndex[0] && rowIndex > lastRowIndex[1])) {
                            _lazyLoad.SegmentedUI2._checkScrollHeightandAddBufferByDir.call(this, el, 'bottom');
                        }

                        _lazyLoad.SegmentedUI2._adjustRowsOnViewUpdate.call(this);
                    }
                },

                _setSectionAt: function SegmentedUI2$_lazyLoad_action_setSectionAt(secIndex, rowIndex, newdata, anim) {
                    var $K = voltmx.$kwebfw$, $KW = $K.widget, $KD = $K.dom, removedHeight = 0,
                        clones = [], el = $KW.el(this), _ = this._kwebfw_, data = _.prop.data,
                        firstRowIndex = null, lastRowIndex = null, rows = [];

                    //Add new data to data
                    data.splice(secIndex, 1, newdata);

                    //Handle Search
                    if(_.searcher) {
                        _searcher.SegmentedUI2.updateFilterResult.call(this);
                    }

                    if($KW.visible(this)) {
                        _.hasScroll = _lazyLoad.SegmentedUI2._hasScroll.call(this, el);

                        //Remove old section from clone and create space for new section
                        _flushClones([_.clones[secIndex]]);
                        _.clones.splice(secIndex, 1, new Array(2));
                        _.clones[secIndex][1] = new Array(data[secIndex][1].length);

                        //update Indices
                        _updateIndexes.call(this, secIndex, -1);

                        //get firstRowIndex and lastRowIndex in the view port
                        firstRowIndex = _deduceIndex.call(this, _getFirstRederedRow.call(this));
                        lastRowIndex = _deduceIndex.call(this, _getLastRenderedRow.call(this));

                        if(firstRowIndex[0] === -1 && firstRowIndex[1] === -1) {
                            //if there are no rows in the view port, render from first section
                            _lazyLoad.SegmentedUI2._renderFromIndex.call(this, [secIndex, -1], el);
                        } else if(secIndex === firstRowIndex[0]) {
                            //if the section to be set is 1st section in the view port, remove all rows from the view port
                            //and re-render from the given section index
                            removedHeight = el.scrolee.scrollHeight;
                            this._kwebfw_.rows = [];
                            $KD.html(el.scrolee, '');
                            _lazyLoad.SegmentedUI2._addRowsTillGivenHeight.call(this, removedHeight, [secIndex, firstRowIndex[1]]);
                            //Check scroll Height and add Top buffer
                            _lazyLoad.SegmentedUI2._checkScrollHeightandAddBufferByDir.call(this, el, 'top', [secIndex, -1]);
                        } else if(secIndex > firstRowIndex[0] && secIndex <= lastRowIndex[0]) {
                            //if the section to be set with in the view port, then remove all rows from the given section index
                            //and re-render from the given section index
                            removedHeight = _lazyLoad.SegmentedUI2._removeRowsFromViewFromIndex.call(this, [secIndex, rowIndex]);
                            _lazyLoad.SegmentedUI2._addRowsTillGivenHeight.call(this, removedHeight);
                            //Check scroll Height and add Bottom buffer
                            _lazyLoad.SegmentedUI2._checkScrollHeightandAddBufferByDir.call(this, el, 'bottom');
                        } else {
                            if(secIndex < firstRowIndex[0]) {
                                //Check scroll Height and add Top buffer
                                _lazyLoad.SegmentedUI2._checkScrollHeightandAddBufferByDir.call(this, el, 'top', [secIndex, -1]);
                            } else if(secIndex > lastRowIndex[0]) {
                                //Check scroll Height and add bottom buffer
                                _lazyLoad.SegmentedUI2._checkScrollHeightandAddBufferByDir.call(this, el, 'bottom');
                            }
                        }
                        _lazyLoad.SegmentedUI2._adjustRowsOnViewUpdate.call(this);

                        //Handle Animation
                        if(_animator.SegmentedUI2.canAnimate.call(this, anim)) {
                            _lazyLoad.SegmentedUI2._getRowsToAnimate.call(this, secIndex, rowIndex, clones, rows);
                            _animator.SegmentedUI2.onRowDisplayHandler.call(this, voltmx.segment.UPDATE, clones);
                            _animator.SegmentedUI2.applyRowsAnimationByAPI.call(this, 'addsectionat', rows, -1, -1, anim);
                        }
                    }
                }
            },

            _addBottomBuffer: function SegmentedUI2$_lazyLoad_addBottomBuffer(bufferSize, index) {
                var $K = voltmx.$kwebfw$, $KW = $K.widget,
                    count = _lazyLoad.SegmentedUI2._getNextRenderableRowCount(),
                    el = $KW.el(this), lastRow = null, rows = null, nextRowObj = null;

                if(!index) {
                    lastRow = _getLastRenderedRow.call(this);

                    // if the last row is null which means there are no rows in the view port then return
                    if(!lastRow) {
                        return;
                    }

                    index = _deduceIndex.call(this, lastRow);
                }

                //Add row to bottom till bufferSize
                while(bufferSize > 0) {
                    nextRowObj = _lazyLoad.SegmentedUI2._getNextRenderableRows.call(this, index, count, 'bottom');
                    rows = nextRowObj.rows;
                    index = nextRowObj.index;

                    if(!rows.length) {
                        break;
                    }

                    _lazyLoad.SegmentedUI2._addRows.call(this, 'bottom', rows);

                    this._kwebfw_.rows = this._kwebfw_.rows.concat(rows);
                    bufferSize = bufferSize - _lazyLoad.SegmentedUI2._getRowsHeight.call(this, rows);
                }

                //set bottom parity
                _lazyLoad.SegmentedUI2._keepBottomParity.call(this, el);
            },

            //this function will add row to view in bottom and then top direction till given height
            _addRowsTillGivenHeight : function SegmentUI2$_lazyLoad_addRowsTillGivenHeight(height, firstIndexToRender) {
                var index = [-1, -1], lastRow = null, firstRow = null, rowsObject = null,
                    rows = [];

                if(height === 0) return;

                var addRowsToViewByDir = function(count, dir, index) {
                    var nextRowObj = null, rows = [];

                    nextRowObj = _lazyLoad.SegmentedUI2._getNextRenderableRows.call(this, index, count, dir);
                    rows = nextRowObj.rows;
                    index = nextRowObj.index;

                    _lazyLoad.SegmentedUI2._addRows.call(this, dir, rows);

                    return nextRowObj;
                };

                if(firstIndexToRender) {
                    height = height - _lazyLoad.SegmentedUI2._renderFirstRow.call(this, firstIndexToRender);
                }

                //Add rows To bottom
                lastRow = _getLastRenderedRow.call(this);

                if(lastRow) {
                    index = _deduceIndex.call(this, lastRow);

                    while(height > 0) {
                        rowsObject = addRowsToViewByDir.call(this, 1, 'bottom', index);
                        rows = rowsObject.rows;
                        index = rowsObject.index;

                        if(!rows.length) {
                            break;
                        }

                        this._kwebfw_.rows = this._kwebfw_.rows.concat(rows);
                        height = height - _lazyLoad.SegmentedUI2._getRowsHeight.call(this, rows);
                    }
                }

                // Add rows to top
                firstRow = _getFirstRederedRow.call(this);

                if(firstRow) {
                    index = _deduceIndex.call(this, firstRow);

                    while(height > 0) {
                        rowsObject = addRowsToViewByDir.call(this, 1, 'top', index);
                        rows = rowsObject.rows;
                        index = rowsObject.index;

                        if(!rows.length) {
                            break;
                        }

                        this._kwebfw_.rows = rows.concat(this._kwebfw_.rows);
                        height = height - _lazyLoad.SegmentedUI2._getRowsHeight.call(this, rows);
                    }
                }
            },

            _addTopBuffer: function SegmentedUI2$_lazyLoad_addTopBuffer(bufferSize, index) {
                var $K = voltmx.$kwebfw$, $KW = $K.widget,
                    count = _lazyLoad.SegmentedUI2._getNextRenderableRowCount(),
                    el = $KW.el(this), firstRow = null, nextRowObj = null, rows= null;

                if(!index) {
                    firstRow = _getFirstRederedRow.call(this);

                    if(!firstRow) {
                        return;
                    }

                    index = _deduceIndex.call(this, firstRow);
                }

                while(bufferSize > 0) {
                    nextRowObj = _lazyLoad.SegmentedUI2._getNextRenderableRows.call(this, index, count, 'top');
                    rows = nextRowObj.rows;
                    index = nextRowObj.index;

                    if(!rows.length) {
                        break;
                    }

                    _lazyLoad.SegmentedUI2._addRows.call(this, 'top', rows);
                    this._kwebfw_.rows = rows.concat(this._kwebfw_.rows);
                    bufferSize = bufferSize - _lazyLoad.SegmentedUI2._getRowsHeight.call(this, rows);
                }

                _lazyLoad.SegmentedUI2._keepTopParity.call(this, el);
            },

            _addRows: function SegmentedUI2$_lazyLoad_addRows(direction, rows) {
                var $K = voltmx.$kwebfw$, $KD = $K.dom, $KW = $K.widget, el = $KW.el(this);

                if(!rows.length) {
                    return;
                }

                if(direction === 'bottom') {
                    $KD.add(el.scrolee, _renderRows.call(this, rows));
                } else if(direction === 'top') {
                    if(!el.scrolee.children.length) {
                        $KD.add(el.scrolee, _renderRows.call(this, rows));
                    } else {
                        $KD.addAt(el.scrolee, _renderRows.call(this, rows), 0);
                    }
                }
            },

            _adjustRowsOnViewUpdate: function SegmentedUI2$_lazyLoad_adjustRowsOnViewUpdate() {
                var $K = voltmx.$kwebfw$, $KW = $K.widget, _ = this._kwebfw_, el = $KW.el(this),
                    bufferSize = _lazyLoad.SegmentedUI2._getBufferSize.call(this), heightDiff = 0,
                    rowsHeight = _lazyLoad.SegmentedUI2._getRowsHeight.call(this, _.rows),
                    segHeight = _.prop.frame.height, rootContainer = $KW.getRootNode(this);

                if(_.rows.length > 0) {
                    if(rowsHeight <= (segHeight + (2*bufferSize))) {
                        heightDiff = segHeight - rowsHeight;

                        _lazyLoad.SegmentedUI2._addRowsTillGivenHeight.call(this, heightDiff);
                        _lazyLoad.SegmentedUI2._addTopBuffer.call(this, bufferSize);
                        _lazyLoad.SegmentedUI2._addBottomBuffer.call(this, bufferSize);

                        //All Rows in the view should go for relayout in twoCases
                        //case1 : Segment without scroll, on Updation scroll bar added
                        //case2 : Segment with scroll, on Updation scroll bar removed
                        if(_lazyLoad.SegmentedUI2._hasScroll.call(this, el) !== _.hasScroll) {
                            //Mark the segment for relayout only if there is a difference
                            //in hasScroll Flag already stored in the model and after updating
                            $KW.markRelayout(this);
                            rootContainer.forceLayout();
                        }
                    } else {
                        _lazyLoad.SegmentedUI2._keepTopParity.call(this, el);
                        _lazyLoad.SegmentedUI2._keepBottomParity.call(this, el);
                    }

                    _applyNodeStyles.call(this);
                    _lazyLoad.SegmentedUI2._handleSelectionBehavior.call(this);
                    this._kwebfw_.scrollTop = el.node.scrollTop;
                } else if(_.prop.data && _.prop.data.length) {
                    if(_isSectionDS(_.prop.data[0])) {
                        _lazyLoad.SegmentedUI2._renderFromIndex.call(this, [0, -1], el);
                    } else {
                        _lazyLoad.SegmentedUI2._renderFromIndex.call(this, [-1, 0], el);
                    }
                } else {
                    //if there are no rows in the view and the data is empty, then reset parities to 0px
                    _lazyLoad.SegmentedUI2._resetParity.call(this, el);
                }
            },

            _applySkin: function(li, clone, index) {
                var $K = voltmx.$kwebfw$, $KD = $K.dom,
                    ii = clone._kwebfw_.ii, prop = this._kwebfw_.prop,
                    rowSkin = prop.rowSkin;

                if(ii.indexOf(',-1') !== -1) {
                    $KD.setAttr(li, 'class', prop.sectionHeaderSkin);
                } else {
                    if(prop.alternateRowSkin) {
                        if(index % 2 !== 0) {
                            rowSkin = prop.alternateRowSkin;
                        }
                    }

                    $KD.setAttr(li, 'class', rowSkin);
                }
            },

            _canAddRow: function SegmentedUI2$_lazyLoad_canAddRow(row) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget, flag = false;

                if($KU.is(row, 'widget') && $KW.visible(row)) {
                    flag = true;
                }

                return flag;
            },

            _checkScrollHeightandAddBufferByDir: function SegmentedUI2$_lazyLoad_checkScrollHeightandAddBufferByDir(el, dir, index) {
                var bufferSize = _lazyLoad.SegmentedUI2._getBufferSize.call(this),
                    segHeight = this._kwebfw_.prop.frame.height, scrollHeight = 0;

                if(dir === 'bottom') {
                    //if the direction is bottom get the scrollBottom
                    scrollHeight = (el.node.scrollHeight - el.node.scrollTop) - segHeight;

                    //if the scroll Bottom is less than buffer size, add Bottom buffer
                    if(scrollHeight <= bufferSize) {
                        _lazyLoad.SegmentedUI2._addBottomBuffer.call(this, bufferSize);
                        _lazyLoad.SegmentedUI2._removeTopBuffer.call(this, bufferSize);
                    }
                } else if(dir === 'top') {
                    //if the direction is top get the scrolTop
                    scrollHeight = el.node.scrollTop;

                    if(scrollHeight === 0) {
                        //if the scroll Top is 0, then render from the given index
                        _lazyLoad.SegmentedUI2._renderFromIndex.call(this, index, el);
                    } else if(scrollHeight <= bufferSize) {
                        //if the scroll Top less than bufferSize, then just add TopBuffer and remove bottom buffer
                        _lazyLoad.SegmentedUI2._addTopBuffer.call(this, bufferSize);
                        _lazyLoad.SegmentedUI2._removeBottomBuffer.call(this, bufferSize);
                    }
                }
            },

            _deduceHeightTillSelectedIndex: function SegmentedUI2$_lazyLoad_deduceHeightTillSelectedIndex(el, selectedIndex) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, height = 0, rows = this._kwebfw_.rows,
                    rowIndex = selectedIndex[1], sectionIndex = selectedIndex[0], self = this,
                    topscroleeHeight = el.topscrolee.offsetHeight;

                $KU.each(rows, function(clone) {
                    var currentIndex = [];

                    currentIndex = _deduceIndex.call(self, clone);

                    if(currentIndex[0] === sectionIndex && currentIndex[1] === rowIndex) {
                        return true;
                    }

                    height += clone._kwebfw_.rowHeight;
                });

                return (height + topscroleeHeight);
            },

            _absoluteIndexInRows: function SegmentedUI2$_lazyLoad_absoluteIndexInRows(secIndex, rowIndex, getNext) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, rows = this._kwebfw_.rows,
                    absIndex = -1, index = [-1, -1], data = this._kwebfw_.prop.data;

                if(!_isSectionDS(data[0])) {
                    secIndex = -1;
                }

                $KU.each(rows, function(row, rindex) {
                    index = _deduceIndex.call(this, row);
                    if(index[0] === secIndex && index[1] === rowIndex) {
                        absIndex = rindex;
                    }
                }, this);

                if(absIndex === -1 && getNext) {
                    index[0] = secIndex;
                    index[1] = rowIndex;
                    index = _lazyLoad.SegmentedUI2._updateIndexWithDirection.call(this, index, 'bottom');
                    absIndex = _lazyLoad.SegmentedUI2._absoluteIndexInRows.call(this, index[0], index[1], getNext);
                }

                return absIndex;
            },

            _getBufferSize: function SegmentedUI2$_lazyLoad_getBufferSize() {
                return 200;
            },

            _getNextRenderableRowCount: function SegmentedUI2$_lazyLoad_getNextRenderableRowCount() {
                return 2;
            },

            _getNextRenderableRows: function SegmentedUI2$_lazyLoad_getNextRenderableRows(index, count, dir) {
                var row = null, rows = [], data = this._kwebfw_.prop.data,
                    obj = {rows : rows, index : index}, temp = null;

                index = _lazyLoad.SegmentedUI2._getNextIndexByDirection.call(this, index, dir, data);
                while(count > 0 && index) {// if count exceed bottom most or topmost
                    row = _lazyLoad.SegmentedUI2._getRow.call(this, index);

                    if(dir === 'bottom') {
                        if(_lazyLoad.SegmentedUI2._canAddRow.call(this, row)) {
                            rows.push(row);
                        } else {
                            temp = _lazyLoad.SegmentedUI2._getNextRenderableRows.call(this, index, 1, 'bottom');
                            rows = rows.concat(temp.rows);
                            index = temp.index;
                        }
                    } else {
                        if(_lazyLoad.SegmentedUI2._canAddRow.call(this, row)) {
                            rows.unshift(row);
                        } else {
                            temp = _lazyLoad.SegmentedUI2._getNextRenderableRows.call(this, index, 1, 'top');
                            rows = temp.rows.concat(rows);
                            index = temp.index;
                        }
                    }
                    obj.index = index;
                    obj.rows = rows;
                    index = _lazyLoad.SegmentedUI2._getNextIndexByDirection.call(this, index, dir, data);
                    count--;
                }

                return obj;
            },

            _getRow: function SegmentedUI2$_lazyLoad_getRow(index) {
                var _ = this._kwebfw_, row = null;

                //this internal function checks for index in the clones and returns valid row
                var _getRowIfCached = function() {
                    var clones = _.clones, data = _.prop.data[0];

                    if(_isSectionDS(data)) {
                        if(index[1] === -1) {
                            if(clones[index[0]][0] !== undefined) {
                                row = clones[index[0]][0];
                            }
                        } else {
                            if(clones[index[0]][1][index[1]] !== undefined) {
                                row = clones[index[0]][1][index[1]];
                            }
                        }
                    } else {
                        if(clones[index[1]] !== undefined) {
                            row = clones[index[1]];
                        }
                    }
                    return row;
                };

                row = _getRowIfCached();

                //if the row is not in clone, then clone the row
                if(!row) {
                    row = _getClonedTemplate.call(this, index);
                }

                return row;
            },

            _getRowsHeight: function SegmentedUI2$_lazyLoad_getRowsHeight(rows) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, height = 0,
                    prop = this._kwebfw_.prop, separatorThickness = 0;

                if(prop.separatorRequired) {
                    separatorThickness = prop.separatorThickness;
                }

                $KU.each(rows, function(clone/*, index*/) {
                    if(typeof clone._kwebfw_.rowHeight === 'undefined') {
                        //TO-DO - do we need to have it for fixed template?
                        clone.forceLayout();
                        clone._kwebfw_.rowHeight = clone._kwebfw_.view.offsetHeight;
                        clone._kwebfw_.prop.doLayout = _lazyLoad.SegmentedUI2._wrapDoLayout.call(this, clone.doLayout);
                    }
                    height += (clone._kwebfw_.rowHeight + separatorThickness);
                }, this);

                return height;
            },

            _getAverageRowHeight: function SegmentedUI2$_lazyLoad_getAverageRowHeight() {
                var _ = this._kwebfw_, rows = _.rows, avgRowHeight = 0,
                    rowsHeight = _lazyLoad.SegmentedUI2._getRowsHeight.call(this, rows);

                avgRowHeight = (rowsHeight/rows.length).toFixed();

                return avgRowHeight;
            },

            _getTotalHeight: function SegmentedUI2$_lazyLoad_getTotalHeight() {
                var noOfRows = _getRowCount.call(this), totalHeight = 0,
                    avgRowHeight = _lazyLoad.SegmentedUI2._getAverageRowHeight.call(this);

                totalHeight = avgRowHeight * noOfRows;

                return totalHeight;
            },

            _getRowsToAnimate : function SegmentedUI2$_lazyLoad_getRowsToAnimate(sectionIndex, rowIndex, clones, rowNodes) {
                var $K = voltmx.$kwebfw$, $KD = $K.dom, rows = this._kwebfw_.rows,
                    absoluteRowIndex = -1, index = [];

                absoluteRowIndex = _lazyLoad.SegmentedUI2._absoluteIndexInRows.call(this, sectionIndex, rowIndex);

                for(absoluteRowIndex; absoluteRowIndex < rows.length; absoluteRowIndex++) {
                    index = _deduceIndex.call(this, rows[absoluteRowIndex]);

                    if(index[0] !== sectionIndex) {
                        break;
                    }

                    clones.push(rows[absoluteRowIndex]);
                    //push li's for animation
                    rowNodes.push($KD.parent(rows[absoluteRowIndex]._kwebfw_.view));
                }
            },

            //This function takes absolute value and returns the valid row index for the given value
            _getIndexFromAbsoluteValue: function SegmentedUI2$_lazyLoad_getIndexFromAbsoluteValue(value) {
                var _ = this._kwebfw_, data = _.prop.data, rowCount = _getRowCount.call(this),
                    sectionIndex = -1, rowIndex = -1, noOfSections = 0, rowsInSection = 0,
                    index = 0;

                if(_isSectionDS(data[0])) {
                    noOfSections = data.length;

                    if(value >= rowCount) {
                        sectionIndex = noOfSections - 1; //last section
                        rowIndex = data[noOfSections - 1][1].length - 1; // last row in last section
                    } else {
                        for(index = 0; index < noOfSections; index++) {
                            rowsInSection = data[index][1].length;
                            if(value <= rowsInSection) {
                                sectionIndex = index;
                                rowIndex = value - 1;
                                break;
                            } else {
                                value = value - (rowsInSection + 1); // considering section also as a row
                            }
                        }
                    }
                } else {
                    if(value >= rowCount) {
                        rowIndex = rowCount - 1;
                    } else {
                        rowIndex = value;
                    }
                }

                return [sectionIndex, rowIndex];
            },

            _getUpdatedRowHeight: function SegmentedUI2$_lazyLoad_getUpdatedRowHeight(row) {
                var rowHeight = 0, prop = this._kwebfw_.prop, separatorThickness = 0;

                if(prop.separatorRequired) {
                    separatorThickness = prop.separatorThickness;
                }

                if(row) {
                    rowHeight = row._kwebfw_.rowHeight;
                }

                return (rowHeight + separatorThickness);
            },

            //this function checks if the node contains scrollbar or not
            _hasScroll: function SegmentedUI2$_lazyLoad_hasScroll(el) {
                if(el.node.scrollHeight === this._kwebfw_.prop.frame.height) {
                    //if the scrollHeight and frameHeight is same then, there is no scrollbar, so returns false
                    return false;
                }

                return true;
            },

            //set top scrolee height
            _keepTopParity: function SegmentedUI2$_lazyLoad_keepTopParity(el, height) {
                var $K = voltmx.$kwebfw$, $KD = $K.dom, topScroleeHeight = el.topscrolee.offsetHeight,
                    topHeight = 0, firstRow = null, index = [], nextRow = null;

                if(height === undefined) {
                    //get first rendered row
                    firstRow = _getFirstRederedRow.call(this);
                    index = _deduceIndex.call(this, firstRow);

                    //get next renderable row
                    nextRow = _lazyLoad.SegmentedUI2._getNextRenderableRows.call(this, index, 1, 'top');
                    // if there is no next renderable row, then top parity height should be 0
                    if(nextRow.rows.length) {
                        //absolute index gives the gives the number of rows till the given index with/without section
                        topHeight = _absoluteIndexInData.call(this, index) * _lazyLoad.SegmentedUI2._getAverageRowHeight.call(this);
                    }
                } else {
                    topHeight = topScroleeHeight + height;
                }

                if(topHeight === 0) {
                    this._kwebfw_.topPendingHeight = -(_lazyLoad.SegmentedUI2._getBufferSize.call(this));
                }

                $KD.style(el.topscrolee, {height : topHeight+'px'});
            },

            //set bottom scrolee height and top
            _keepBottomParity: function SegmentedUI2$_lazyLoad_keepBottomParity(el, height) {
                var $K = voltmx.$kwebfw$, $KD = $K.dom, bottomHeight = 0, bottomScrolleeHeight = el.bottomscrolee.offsetHeight,
                    lastRow = null, nextRow = null, index = [], top = 0;

                if(height === undefined) {
                    lastRow = _getLastRenderedRow.call(this);
                    index = _deduceIndex.call(this, lastRow);
                    nextRow = _lazyLoad.SegmentedUI2._getNextRenderableRows.call(this, index, 1, 'bottom');

                    if(nextRow.rows.length) {
                        bottomHeight = (_getRowCount.call(this) - _absoluteIndexInData.call(this, index)) * _lazyLoad.SegmentedUI2._getAverageRowHeight.call(this);
                    }
                } else {
                    bottomHeight = bottomScrolleeHeight + height;
                }

                if(bottomHeight === 0) {
                    this._kwebfw_.bottomPendingHeight = -(_lazyLoad.SegmentedUI2._getBufferSize.call(this));
                }

                //As the UL(scrolee) height is 100%, if the content inside the UL(scrolee) exceeds 100%
                //then fix the top of the bottomscrolee by calculating top as below
                top = el.scrolee.scrollHeight - el.scrolee.offsetHeight;

                $KD.style(el.bottomscrolee, {height : bottomHeight+'px', top : top+'px'});
            },

            //This function returns a boolean whether there is a need to touch the view or not on update openations
            _needToTouchView: function SegmentUI2$_lazyLoad_needToTouchView(secIndex, rowIndex, firstRowIndex, lastRowIndex, isSection) {
                var flag = false;

                //in case of section, need to touch view in four cases
                //case1 : if the given section index is the only section in the view and given rowIndex is with in the view
                //case2 : if the given section index is equals to firstSection in the view and given rowIndex is with in the view
                //case3 : if the given section index is equals to lastSection in the view and given rowIndex is with in the view
                //case4 : if the given section index is between first and last section in the view
                if(isSection) {
                    if(((secIndex === firstRowIndex[0] && secIndex === lastRowIndex[0])
                    && (rowIndex >= firstRowIndex[1] && rowIndex <= lastRowIndex[1]))
                    || ((secIndex === firstRowIndex[0] && secIndex !== lastRowIndex[0]) && rowIndex >= firstRowIndex[1])
                    || ((secIndex === lastRowIndex[0] && secIndex !== firstRowIndex[0]) && rowIndex <= lastRowIndex[1])
                    || (secIndex > firstRowIndex[0] && secIndex < lastRowIndex[0])) {
                        flag =true;
                    }
                } else { // in case of with out section, if the given rowindex is between firstRowIndex and lastRowIndex
                    if(rowIndex >= firstRowIndex[1] && rowIndex <= lastRowIndex[1]) {
                        flag =true;
                    }
                }

                return flag;
            },

            _onScroll : function SegmentedUI2$_lazyLoad_onScroll(scrollTop) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget, el = $KW.el(this), delta = 0,
                    bufferSize = _lazyLoad.SegmentedUI2._getBufferSize(), _ = this._kwebfw_, sections = [],
                    segHeight = this._kwebfw_.prop.frame.height, index = [], rowHeight = 0, rowToRender = null;


                if(this._kwebfw_.scrollTop === scrollTop) {
                    return;
                }

                delta = Math.abs(this._kwebfw_.scrollTop - scrollTop);

                if(delta > (segHeight + bufferSize)) { // To handle the fast scroll
                    rowHeight = _lazyLoad.SegmentedUI2._getAverageRowHeight.call(this);
                    rowToRender = parseInt((scrollTop / rowHeight).toFixed());
                    index = _lazyLoad.SegmentedUI2._getIndexFromAbsoluteValue.call(this, rowToRender);

                    _lazyLoad.SegmentedUI2._renderFromIndex.call(this, index, el);
                } else {
                    if(scrollTop > this._kwebfw_.scrollTop) {
                        //scroll down
                        if(delta > bufferSize) {
                            _lazyLoad.SegmentedUI2._addBottomBuffer.call(this, delta);
                            _lazyLoad.SegmentedUI2._removeTopBuffer.call(this, bufferSize);
                            _applyNodeStyles.call(this);
                            _lazyLoad.SegmentedUI2._handleSelectionBehavior.call(this);
                            this._kwebfw_.scrollTop = scrollTop;
                        }
                    } else {
                        //scroll up
                        if(delta > bufferSize) {
                            _lazyLoad.SegmentedUI2._addTopBuffer.call(this, delta);
                            _lazyLoad.SegmentedUI2._removeBottomBuffer.call(this, bufferSize);
                            _applyNodeStyles.call(this);
                            _lazyLoad.SegmentedUI2._handleSelectionBehavior.call(this);
                            this._kwebfw_.scrollTop = scrollTop;
                        }
                    }
                }

                if(_isSectionDS(_.prop.data[0]) && _.searcher) {
                    $KU.each(_.rows, function(record, index) {
                        sections.push(index);
                    });
                    _searcher.SegmentedUI2.updateHeaderVisibility.call(this, sections, _.searcher.filterResultWithHeader);
                }
            },

            //This function remove Rows from given given Index in the view port and returns removed height
            _removeRowsFromViewFromIndex: function SegmentedUI2$_lazyload_removeRowsFromViewFromIndex(index) {
                var $K = voltmx.$kwebfw$, $KD = $K.dom, $KW = $K.widget, $KU = $K.utils, absIndex = -1,
                    _ = this._kwebfw_, rows = _.rows, secIndex = index[0], el = $KW.el(this), removedHeight = 0, removeCount = 0;

                if(el.node) {
                    $KU.each(rows, function(row, rowindex) {
                        var rowIndex = _deduceIndex.call(this, row);
                        if(rowIndex[0] >= secIndex && row.isVisible) {
                            if(absIndex === -1) {
                                absIndex = rowindex;
                            }

                            removedHeight += row._kwebfw_.rowHeight;
                            $KD.removeAt(el.scrolee, absIndex);
                            removeCount++;
                        }
                    }, this);
                    rows.splice(absIndex, removeCount);
                }

                return removedHeight;
            },

            _removeTopBuffer: function SegmentedUI2$_lazyLoad_removeTopBuffer(bufferSize) {
                var $K = voltmx.$kwebfw$, $KD = $K.dom, $KW = $K.widget, el = $KW.el(this),
                    rowToRemove = _getFirstRederedRow.call(this), heightToRemove = 0,
                    parityHeight = 0;

                bufferSize = bufferSize + this._kwebfw_.topPendingHeight;

                if(bufferSize < 0) {
                    return;
                }

                heightToRemove = _lazyLoad.SegmentedUI2._getUpdatedRowHeight.call(this, rowToRemove);

                while(heightToRemove < bufferSize) {
                    //Remove From View
                    $KD.removeAt(el.scrolee, 0);

                    //remove from rows
                    this._kwebfw_.rows.shift();

                    //update top parity
                    parityHeight += heightToRemove;


                    bufferSize = bufferSize - heightToRemove;
                    rowToRemove = _getFirstRederedRow.call(this);
                    heightToRemove = _lazyLoad.SegmentedUI2._getUpdatedRowHeight.call(this, rowToRemove);
                }

                _lazyLoad.SegmentedUI2._keepTopParity.call(this, el, parityHeight);

                this._kwebfw_.topPendingHeight = bufferSize;
            },

            _removeBottomBuffer: function SegmentedUI2$_lazyLoad_removeBottomBuffer(bufferSize) {
                var $K = voltmx.$kwebfw$, $KD = $K.dom, $KW = $K.widget, el = $KW.el(this),
                    rowToRemove = _getLastRenderedRow.call(this), heightToRemove = 0,
                    parityHeight = 0;

                bufferSize += this._kwebfw_.bottomPendingHeight;

                heightToRemove = _lazyLoad.SegmentedUI2._getUpdatedRowHeight.call(this, rowToRemove);

                while(heightToRemove < bufferSize) {
                    //Remove From View
                    $KD.remove($KD.last(el.scrolee));

                    //remove from rows
                    this._kwebfw_.rows.pop();


                    parityHeight += heightToRemove;
                    bufferSize = bufferSize - heightToRemove;
                    rowToRemove = _getLastRenderedRow.call(this);
                    heightToRemove = _lazyLoad.SegmentedUI2._getUpdatedRowHeight.call(this, rowToRemove);
                }

                _lazyLoad.SegmentedUI2._keepBottomParity.call(this, el, parityHeight);

                this._kwebfw_.bottomPendingHeight = bufferSize;
            },

            //This function render first row in the view port from the given index
            _renderFirstRow : function SegmentedUI2$_lazyLoad_renderFirstRow(index) {
                var nextRowObj = null, height = 0, row = null, rows = [];

                row = _lazyLoad.SegmentedUI2._getRow.call(this, index);

                if(_lazyLoad.SegmentedUI2._canAddRow.call(this, row)) {
                    rows = row && [row];
                } else {
                    nextRowObj = _lazyLoad.SegmentedUI2._getNextRenderableRows.call(this, index, 1, 'bottom');
                    index = nextRowObj.index;
                    rows = nextRowObj.rows;
                }

                if(rows.length) {
                    _lazyLoad.SegmentedUI2._addRows.call(this, 'bottom', rows);

                    this._kwebfw_.rows = this._kwebfw_.rows.concat(rows);
                    height = _lazyLoad.SegmentedUI2._getRowsHeight.call(this, rows);
                }

                return height;
            },

            _renderFromIndex: function SegmentedUI2$_lazyLoad_renderFromIndex(index, el) {
                var $K = voltmx.$kwebfw$, $KD = $K.dom, $KW = $K.widget,
                    dir = 'bottom', _ = this._kwebfw_, nextRowObj = null,
                    height = this._kwebfw_.prop.frame.height, row = null,
                    rows = [], selectedIndex = index, scrollTop = null,
                    rootContainer = $KW.getRootNode(this);

                _updateAriaRowCount.call(this, _getRowCount.call(this), el);
                $KD.html(el.scrolee, '');

                this._kwebfw_.rows = [];

                if(height> 0 && el.node && $KW.visible(this)) {
                    //First Row generation
                    if(_.searcher && _getIndex(index, _.searcher.filterResultWithHeader) === -1) {
                        index = _searcher.SegmentedUI2.getNextIndexFromFilterList.call(this, index);
                    }

                    row = _lazyLoad.SegmentedUI2._getRow.call(this, index);

                    if(_lazyLoad.SegmentedUI2._canAddRow.call(this, row)) {
                        rows = row && [row];
                    } else {
                        nextRowObj = _lazyLoad.SegmentedUI2._getNextRenderableRows.call(this, index, 1, dir);
                        index = nextRowObj.index;
                        selectedIndex = index;
                        rows = nextRowObj.rows;
                    }

                    if(rows.length) {
                        _lazyLoad.SegmentedUI2._addRows.call(this, 'bottom', rows);

                        this._kwebfw_.rows = this._kwebfw_.rows.concat(rows);
                        height -= _lazyLoad.SegmentedUI2._getRowsHeight.call(this, rows);
                    }

                    _lazyLoad.SegmentedUI2._addRowsTillGivenHeight.call(this, height);
                    _lazyLoad.SegmentedUI2._addTopBuffer.call(this, _lazyLoad.SegmentedUI2._getBufferSize());
                    _lazyLoad.SegmentedUI2._addBottomBuffer.call(this, _lazyLoad.SegmentedUI2._getBufferSize());
                    _applyNodeStyles.call(this);
                    _lazyLoad.SegmentedUI2._handleSelectionBehavior.call(this);


                    scrollTop = _lazyLoad.SegmentedUI2._deduceHeightTillSelectedIndex.call(this, el, selectedIndex);
                    el.node.scrollTop = scrollTop;
                    this._kwebfw_.scrollTop = el.node.scrollTop;


                    //Added forcelayout to handle layout issues after rows are added in lazy load
                    $KW.markRelayout(this);
                    //To-do : need change to parent.forceLayout Logic
                    rootContainer.forceLayout();
                }
            },

            //This function iterates through the given model and remove from relayout
            _removeFromRelayout: function SegmentedUI2$_lazyload_removeFromRelayout(model) {
                var $K = voltmx.$kwebfw$, $KW = $K.widget;

                $KW.iterate(model, function(widget) {
                    //Iterate over childrens and remove from relayout
                    $KW.removeMarkedLayout(widget);
                });
            },

            //This function sets top scrolee and bottom scrolee height to 0px
            _resetParity : function SegmentedUI2$_lazyLoad_resetParity(el) {
                var $K = voltmx.$kwebfw$, $KD = $K.dom;

                $KD.style(el.topscrolee, {height : '0px'});
                $KD.style(el.bottomscrolee, {height : '0px'});
            },

            _setLoadingPlaceholder : function SegmentedUI2$_lazyLoad_setLoadingPlaceholder(el) {
                var $K = voltmx.$kwebfw$, $KD = $K.dom, $KU = $K.utils, _ = this._kwebfw_,
                    loadingPlaceholderImage = _.prop.loadingPlaceholderImage,
                    style = null;

                if(!loadingPlaceholderImage) {
                    loadingPlaceholderImage = 'loadingplaceholder.gif';
                }

                style = {
                    'background-image': 'url(' +$KU.getImageURL(loadingPlaceholderImage)+ ')',
                    'background-attachment': 'scroll',
                    'background-repeat': 'repeat-y',
                    'background-position': 'top left'
                };

                $KD.style(el.topscrolee, style);
                $KD.style(el.bottomscrolee, style);
            },

            _handleSelectionBehavior: function SegmentedUI2$_lazyLoad__handleSelectionBehavior() {
                var _ = this._kwebfw_, prop = _.prop;

                if(!prop.selectedRowIndex) {
                    if(prop.selectionBehavior !== constants.SEGUI_DEFAULT_BEHAVIOR) {
                        _updateBehaviorImgs.call(this, true);
                    }
                } else if(prop.viewType === constants.SEGUI_VIEW_TYPE_TABLEVIEW) {
                    if(prop.selectionBehavior === constants.SEGUI_SINGLE_SELECT_BEHAVIOR) {
                        _updateBehaviorImgs.call(this, false, _.deSelectedRows, [prop.selectedRowIndex.slice(0)]);
                    } else if(prop.selectionBehavior === constants.SEGUI_MULTI_SELECT_BEHAVIOR) {
                        _updateBehaviorImgs.call(this, false, _.deSelectedRows, _.selectedRows);
                    }
                }
            },

            _getNextIndexByDirection : function(index, dir, data) {
                var nextIndex = null;

                nextIndex = _lazyLoad.SegmentedUI2._updateIndexWithDirection.call(this, index, dir);

                if(!_lazyLoad.SegmentedUI2._validateIndex.call(this, data, nextIndex)) {
                    nextIndex = null;
                }

                return nextIndex;
            },

            _updateIndexWithDirection: function SegmentedUI2$_lazyLoad_updateRowandSectionIndex(index, dir) {
                var _ = this._kwebfw_, secIndex = index[0], rowIndex = index[1], data = this._kwebfw_.prop.data,
                    retIndex = null, filterRes = null, lastIndex;

                if(_.searcher) {
                    if(_isSectionDS(data[0])) {
                        filterRes = _.searcher.filterResultWithHeader;
                    } else {
                        filterRes = _.searcher.filteredResult;
                    }
                }

                if(dir === 'bottom') {
                    if(filterRes) {
                        if(_isSectionDS(data[0])) {
                            lastIndex = _getIndex([secIndex, rowIndex], filterRes);
                            retIndex = filterRes[lastIndex+1] ? [filterRes[lastIndex+1][0], filterRes[lastIndex+1][1]] : null;
                        } else {
                            lastIndex = _getIndex([0, rowIndex], filterRes);
                            retIndex = filterRes[lastIndex+1] ? [secIndex, filterRes[lastIndex+1][1]] : null;
                        }

                        if(lastIndex === -1) {
                            retIndex = _searcher.SegmentedUI2.getNextIndexFromFilterList.call(this, [secIndex, rowIndex]);
                        }
                    } else {
                        if(_isSectionDS(data[0]) && data[secIndex][1].length - 1 === rowIndex && secIndex !== data.length -1) {
                            retIndex = [++secIndex, -1];
                        } else {
                            retIndex = [secIndex, ++rowIndex];
                        }
                    }
                } else if(dir === 'top') {
                    if(filterRes) {
                        if(_isSectionDS(data[0])) {
                            lastIndex = _getIndex([secIndex, rowIndex], filterRes);
                            retIndex = filterRes[lastIndex-1] ? [filterRes[lastIndex-1][0], filterRes[lastIndex-1][1]] : null;
                        } else {
                            lastIndex = _getIndex([0, rowIndex], filterRes);
                            retIndex = filterRes[lastIndex-1] ? [secIndex, filterRes[lastIndex-1][1]] : null;
                        }
                    } else {
                        if(_isSectionDS(data[0]) && rowIndex === -1 && secIndex !== 0) {
                            secIndex--;
                            retIndex = [secIndex, data[secIndex][1].length-1];
                        } else {
                            retIndex = [secIndex, --rowIndex];
                        }
                    }
                }

                return retIndex;
            },

            _validateIndex: function SegmentedUI2$_lazyLoad_validateIndex(data, index) {
                var firstRowIndex = -1, lastRowIndex = -1, lastSectionIndex = -1, flag = false;

                if(index && _isSectionDS(data[0])) {
                    lastSectionIndex = data.length - 1;

                    if(index[0] >= 0 && index[0] <= lastSectionIndex) {
                        firstRowIndex = -1;
                        lastRowIndex = data[index[0]][1].length - 1;
                        if(index[1] >= firstRowIndex && index[1] <= lastRowIndex) {
                            flag = true;
                        }
                    }
                } else if(index) {
                    firstRowIndex = 0;
                    lastRowIndex = data.length -1;
                    if(index[1] >= firstRowIndex && index[1] <= lastRowIndex) {
                        flag = true;
                    }
                }

                return flag;
            },

            //doLayout wrapper for clones
            _wrapDoLayout : function SegmentedUI2$_lazyLoad_wrapDoLayout(callback) {
                var self = this;
                var wrapper = function(clone) {
                    if(clone.frame.height !== clone._kwebfw_.rowHeight) {
                        clone._kwebfw_.rowHeight = clone.frame.height;
                        _lazyLoad.SegmentedUI2._adjustRowsOnViewUpdate.call(self);
                    }
                    callback && callback.apply(this, arguments);
                };
                return wrapper;
            }
        }
    };


    var _nextPage = function SegmentedUI2$_nextPage(el, swipeContext) {
        var $K = voltmx.$kwebfw$, $KD = $K.dom,
            noOfSwipePages = $KD.children(el.scrolee).length, currentPage = 0;

        currentPage = Math.min(swipeContext.currentPage + 1, noOfSwipePages - 1);
        _setPageViewIndicator.call(this, el, currentPage);
        swipeContext.ignoreRowSelection = true;
    };


    //This function will be called in the scope of widget instance
    var _onDataSet = function SegmentedUI2$_onDataSet() {
        _clearSelectedIndices.call(this);
        _resetBookKeepers.call(this);
    };


    //This function will be called in the scope of widget instance
    var _onRowChange = function SegmentedUI2$_onRowChange(secIndex, rowIndex, action, data, anim) {
        //<action> can be one of "add" / "remove" / "update"/ addsectionat, setsectionat, removesectionat, addall
        var $K = voltmx.$kwebfw$, $KW = $K.widget, el = $KW.el(this);

        if(secIndex === -1 && rowIndex === -1) return;

        if(['add', 'update', 'remove'].indexOf(action) !== -1
        && !_isSectionDS(this._kwebfw_.prop.data[0])) secIndex = -1;

        if(action === 'addsectionat') {
            _action.SegmentedUI2[action].call(this, secIndex, rowIndex, data, true, anim);
        } else {
            _action.SegmentedUI2[action].call(this, secIndex, rowIndex, data, anim);
        }

        if(el.node && this._kwebfw_.prop.viewType === constants.SEGUI_VIEW_TYPE_PAGEVIEW) {
            _setPageView.call(this, el);
        }

        if(el.scrolee) {
            _updateAriaRowCount.call(this, _getRowCount.call(this), el);
        }

        //Apply styles and mark for relayout only if the segment is not enabled for lazy load
        if(!_shouldLazyLoad.call(this)) {
            _applyNodeStyles.call(this);
            $KW.markRelayout(this);
        }
    };

    var _onScrollCallback = function SegmentUI2$_onScrollCallback(segModel, scrollTop) {
        _animator.SegmentedUI2.scrollStart.call(this);
        if(_shouldLazyLoad.call(segModel)) {
            _lazyLoad.SegmentedUI2._onScroll.call(segModel, scrollTop);
        }
    };

    //All widget file must have this variable
    //This functions will be called in the scope of widget instance
    var _populateUnderscore = {
        SegmentedUI2: function SegmentedUI2$_populateUnderscore() {
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
                    $KU.defineProperty(_, 'ns', 'voltmx.ui.SegmentedUI2', null);
                }
            }
            if(!_.name) {
                if($KU.is(this.__$kwebfw$name__, 'string') && this.__$kwebfw$name__) {
                    $KU.defineProperty(_, 'name', this.__$kwebfw$name__, null);
                } else {
                    $KU.defineProperty(_, 'name', 'SegmentedUI2', null);
                }
            }

            if(!_.selectedRows) $KU.defineProperty(_, 'selectedRows', [], null);
            if(!_.deSelectedRows) $KU.defineProperty(_, 'deSelectedRows', [], true);
            if(!_.ui) $KU.defineProperty(_, 'ui', {}, null);
            $KU.defineProperty(_.ui, 'scroll', {x:0, y:0, width:-1, height:-1, minX:-1, maxX:-1, minY:-1, maxY:-1, status:'ended'}, true);
            if(typeof _.tabIndex !== 'number') {
                $KU.defineProperty(_, 'tabIndex', 0, true);
            }

            //This holds the searcher condition and config when searchText API invoked
            if(!_.searcher) $KU.defineProperty(_, 'searcher', null, true);

            //This holds the swipe context of page view
            if(!_.swipeContext) $KU.defineProperty(_, 'swipeContext', null, true);

            /* ====================== Book keeping properties starts here ====================== */

            //This holds the cloned templates, those will be rendered, and it is a flat list
            if(!_.rows) $KU.defineProperty(_, 'rows', [], true);

            //This holds the cloned templates, in the same DS as that of this.data
            if(!_.clones) $KU.defineProperty(_, 'clones', [], true);

            //This holds prev segment height of the segment to prevent from re-render if height doesnt change
            if(typeof _.height !== 'number') {
                $KU.defineProperty(_, 'height', 0, true);
            }

            //This holds the last scrolled position
            if(typeof _.scrollTop !== 'number') {
                $KU.defineProperty(_, 'scrollTop', 0, true);
            }

            //This is used in lazyloading which holds remaing height to be added to top buffer
            if(typeof _.topPendingHeight !== 'number') {
                $KU.defineProperty(_, 'topPendingHeight', 0, true);
            }

            //This is used in lazyloading which holds remaing height to be added to bottom buffer
            if(typeof _.bottomPendingHeight !== 'number') {
                $KU.defineProperty(_, 'bottomPendingHeight', 0, true);
            }

            /* ======================= Book keeping properties ends here ======================= */
        }
    };


    //All widget file must have this variable
    //This function will be called in the scope of widget instance
    var _postInitialization = {
        SegmentedUI2: function SegmentedUI2$_postInitialization() {
            this._kwebfw_.invertedDataMap = _getInvertedDataMap(this._kwebfw_.prop.widgetDataMap);
            _onDataSet.call(this);
        }
    };


    //This function will be called in the scope of widget instance
    var _previousPage = function SegmentedUI2$_previousPage(el, swipeContext) {
        var currentPage = 0;

        currentPage = Math.max(swipeContext.currentPage - 1, 0);
        _setPageViewIndicator.call(this, el, currentPage);
        swipeContext.ignoreRowSelection = true;
    };


    //This function will be called in the scope of widget instance
    var _registerSwipeGesture = function SegmentedUI2$_registerSwipeGesture(scrolee) {
        var $K = voltmx.$kwebfw$, $KD = $K.dom, $KU = $K.utils;

        $KD.on(scrolee, 'swipe', 'segment', function(g) {
            var $K = voltmx.$kwebfw$, $KD = $K.dom, $KW = $K.widget,
                _ = this._kwebfw_, prop = _.prop, el = $KW.el(this);

            if(!$KW.interactable(this)) return; /* ---------------------------------------------- */
            if(prop.viewType === constants.SEGUI_VIEW_TYPE_TABLEVIEW) return;

            if(g.status === 'started') {
                $KD.style(el.scrolee, 'transition', null);
                if($KU.is(_.swipeContext, 'null')) {
                    _.swipeContext = {};
                    _.swipeContext.imageWidth = el.scrolee.firstChild.offsetWidth;
                    _.swipeContext.currentPage = 0;
                }
                //cnutodo need to update swipeContext whenever there is a change in segment width
            }
            if(g.status === 'moving') {
                _translatePage(el.scrolee, (-(_.swipeContext.imageWidth * _.swipeContext.currentPage) + g.distance.x), 0);
            }
            if(g.status === 'ended') {
                if(g.distance.x <= -7) {
                    _nextPage.call(this, el, _.swipeContext);
                    $KW.fire(this, 'onSwipe', this, {rowIndex:_.swipeContext.currentPage});
                } else if(g.distance.x >= 7) {
                    _previousPage.call(this, el, _.swipeContext);
                    $KW.fire(this, 'onSwipe', this, {rowIndex:_.swipeContext.currentPage});
                } else {
                    _translatePage(el.scrolee, (-(_.swipeContext.imageWidth * _.swipeContext.currentPage)), 0);
                }
            }
        }, {scope:this});
    };


    //All widget file must have this variable
    //This functions will be called in the scope of widget instance
    var _relayoutActiveTriggerer = {
        SegmentedUI2: function SegmentedUI2$_relayoutActiveTriggerer() {
            return ['data'];
        }
    };


    //All widget file must have this variable
    //This functions will be called in the scope of widget instance
    var _relayoutPassiveTriggerer = {
        SegmentedUI2: function SegmentedUI2$_relayoutPassiveTriggerer() {
            return [];
        }
    };


    //This function will be called in the scope of widget instance
    var _renderRows = function SegmentedUI2$_renderRows(clones) {
        var $K = voltmx.$kwebfw$, $KD = $K.dom, c = 0,
            clen = clones.length, fragment = null,
            createRow = function(clone) {
                var $K = voltmx.$kwebfw$, $KW = $K.widget, $KD = $K.dom,
                    tag = '', li = null, role = '', row = null, a11y = null,
                    index = _deduceIndex.call(this, clone), height = '',
                    absIndex = (_absoluteIndexInData.call(this, index) + 1);

                tag = _deduceTagName.call(this);
                li = (tag === 'div') ? 'div' : (tag === 'table') ? 'tbody' : 'li';
                li = $KD.create(li);
                $KD.setAttr(li, 'kr', 'item'); //NOTE:: This attr/val has high importance
                $KD.setAttr(li, 'kii', index.join(','));
                $KD.setAttr(li, 'kwh-click', 'onRowClick');
                $KD.setAttr(li, 'kwh-keydown', 'onRowKeyDown');
                $KD.setAttr(li, 'kwh-keyup', 'onRowKeyUp');
                $KD.setAttr(li, 'tabindex', -1);

                if(tag === 'div') {
                    a11y = this._kwebfw_.prop.accessibilityConfig;
                    role = (a11y && a11y.a11yARIA
                         && a11y.a11yARIA.role === 'button')
                        ? 'button' : 'row';

                    $KD.setAttr(li, 'role', role);
                    $KD.setAttr(li, 'aria-rowindex', absIndex);
                }

                row = clone._render();
                height = clone._kwebfw_.flex.final.height;

                $KW.iterate(clone, function(widget) {
                    var $K = voltmx.$kwebfw$, $KD = $K.dom,
                        view = widget._kwebfw_.view;

                    if(view && tag === 'div') {
                        $KD.setAttr(view, 'aria-sort', 'none');
                    }
                }, {tabs:false});

                if(height) {
                    $KD.style(row, 'height', '100%');
                    $KD.style(li, 'height', height);
                }

                $KD.add(li, row);

                return li;
            };

        if(clen === 1) {
            fragment = createRow.call(this, clones[0]);
        } else if(clen > 1) {
            fragment = $KD.create();

            for(c=0; c<clen; c++) {
                fragment.appendChild(createRow.call(this, clones[c]));
            }
        }

        return fragment;
    };


    //This function will be called in the scope of widget instance
    var _resetBookKeepers = function SegmentedUI2$_resetBookKeepers(/*callback*/) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, data = this._kwebfw_.prop.data;

        this._kwebfw_.scrollTop = 0;
        _flushClones(this._kwebfw_.clones);
        this._kwebfw_.rows = [];
        this._kwebfw_.clones = [];

        if(data && data.length > 0) {
            if(_isSectionDS(data[0])) {
                this._kwebfw_.clones = new Array(data.length);
                $KU.each(data, function(secItem, secIndex) {
                    this._kwebfw_.clones[secIndex] = new Array(2);
                    this._kwebfw_.clones[secIndex][1] = new Array(secItem[1].length);
                }, this);
            } else if($KU.is(data[0], 'object')) {
                this._kwebfw_.clones = new Array(data.length);
            }
        }
    };

    var _searcher = {
        SegmentedUI2: {
            //This function will be called in the scope of widget instance
            clearSearchResult: function SegmentedUI2$_searcher_clearSearchResult() {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget,
                    $KD = $K.dom, firstRow = null, index = [-1, -1],
                    el = $KW.el(this), li = null;



                if(_shouldLazyLoad.call(this)) {
                    firstRow = _getFirstRederedRow.call(this);
                    index = _deduceIndex.call(this, firstRow);
                    _lazyLoad.SegmentedUI2._renderFromIndex.call(this, index, el);
                } else {
                    _iterateOverData.call(this, this._kwebfw_.clones, function(clone) {
                        if(!$KU.is(clone, 'null') && clone._kwebfw_.view) {
                            li = $KD.parent(clone._kwebfw_.view);
                            if(li) {
                                $KD.style(li, 'display', 'block');
                            }
                        }
                    });
                }
            },


            convertDateToNumber: function SegmentedUI2$_searcher_convertDateToNumber(dc) {
                var dateNumber, valid = false;

                var isLeapYear = function(year) {
                    var date = new Date(year, 1, 29, 0, 0, 0);
                    return (date.getMonth() === 2) ? false : true;
                };

                var isValidDate = function(date, month, year) {
                    if([1, 3, 5, 7, 8, 10, 12].indexOf(month) !== -1
                    && date >= 1 && date <= 31) {
                        return true;
                    } else if([4, 6, 9, 11].indexOf(month) !== -1
                    && date >= 1 && date <= 30) {
                        return true;
                    } else if(month === 2 && date >= 1) {
                        if(isLeapYear(year)) {
                            if(date <= 29) return true;
                        } else {
                            if(date <= 28) return true;
                        }
                    } else {
                        return false;
                    }
                };

                if(dc instanceof Array && [0, 3, 6].indexOf(dc.length) >= 0) {
                    if(dc.length === 0) {
                        return 0;
                    }

                    //NOTE:: Calendar widget has valid year range from 1900-2099
                    if(typeof dc[2] === 'number' && dc[2] >= 1900 && dc[2] <= 2099
                    && typeof dc[1] === 'number' && dc[1] >= 1 && dc[1] <= 12
                    && isValidDate(dc[0], dc[1], dc[2])) {
                        valid = true;
                        dateNumber = new Date(dc[2], dc[1], dc[0]).getTime();
                    } else return null;

                    if(valid && dc.length === 6
                    && typeof dc[3] === 'number' && dc[3] >= 0 && dc[3] <= 23
                    && typeof dc[4] === 'number' && dc[4] >= 0 && dc[4] <= 59
                    && typeof dc[5] === 'number' && dc[5] >= 0 && dc[5] <= 59) {
                        dateNumber = new Date(dc[2], dc[1], dc[0], dc[3], dc[4], dc[5]).getTime();
                    }
                } else if(dc === null) {
                    return 0;
                } else return null;

                return dateNumber;
            },


            convertStringToNumber: function SegmentedUI2$_searcher_convertStringToNumber(widgetData) {
                var regx = new RegExp(/^\s*((\d+(\.\d+)?)|(\.\d+))\s*$/);

                if(regx.test(widgetData)) {
                    widgetData = parseFloat(widgetData);
                }

                return widgetData;
            },


            createFilterResultWithHeader: function SegmentedUI2$_searcher_createFilterResultWithHeader(filterList) {
                var filterResultWithHeader = JSON.parse(JSON.stringify(filterList)), _ = this._kwebfw_;

                if(_isSectionDS(_.prop.data[0])) {
                    filterResultWithHeader.splice(0, 0, [filterList[0][0], -1]);
                    for(var i = 1; i < filterResultWithHeader.length; i++) {
                        if(filterResultWithHeader[i][0] > filterResultWithHeader[i-1][0]) {
                            filterResultWithHeader.splice(i, 0, [filterResultWithHeader[i][0], -1]);
                        }
                    }
                }
                _.searcher.filterResultWithHeader = filterResultWithHeader;
            },


            //This function will be called in the scope of widget instance
            generateExpression: function SegmentedUI2$_searcher_generateExpression(index, rowData, searchCondition) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, matchStr = '';

                $KU.each(searchCondition, function(condition) {
                    var operator = '||';

                    if($KU.is(condition, 'string')) {
                        if(condition === constants.SEGUI_SEARCH_CRITERIA_OPERATOR_AND) {
                            operator = '&&';
                        }
                        matchStr += (' ' + operator + ' ');
                    } else if($KU.is(condition, 'array')) {
                        matchStr += _searcher.SegmentedUI2.generateExpression.call(this, index, rowData, condition);
                    } else {
                        matchStr += _searcher.SegmentedUI2.isOperandPassed.call(this, index, rowData, condition);
                    }
                }, this);

                return ('(' + matchStr + ')');
            },


            //This function will be called in the scope of widget instance
            getFilteredData: function SegmentedUI2$_searcher_getFilteredData() {
                var filterList = [];

                _iterateOverData.call(this, this._kwebfw_.prop.data, function(rowData, rowIndex, secIndex) {
                    var index = null;

                    if(rowIndex !== -1) {
                        if(secIndex === -1) secIndex = 0;
                        index = [secIndex, rowIndex];

                        if(_searcher.SegmentedUI2.isRowMatchingSearchCriteria.call(this, index, rowData)) {
                            filterList.push(index);
                        }
                    }
                });

                return filterList;
            },


            //This function will be called in the scope of widget instance
            getNextIndexFromFilterList: function SegmentedUI2$_searcher_getNextIndexFromList(index) {
                var _ = this._kwebfw_, list = _.searcher.filterResultWithHeader,
                    i = 0, section = _isSectionDS(_.prop.data[0]),
                    secIndex = index[0], rowIndex = index[1], retIndex = [-1, -1];

                if(!section) secIndex = 0;

                if(secIndex < list[0][0]
                ||(secIndex === list[0][0]
                && rowIndex < list[0][1])) retIndex = list[0];

                if(!section) {
                    for(i = 1; i < list.length; i++) {
                        if(rowIndex > list[i-1][1] && rowIndex < list[i][1]) {
                            retIndex = list[i];
                            break;
                        }
                    }
                } else {
                    for(i = 1; i < list.length; i++) {
                        if(secIndex >= list[i-1][0] && (secIndex < list[i][0] || rowIndex < list[i][1])) {
                            retIndex = list[i];
                            break;
                        }
                    }
                }

                if(!section) retIndex[0] = -1;
                return retIndex;
            },


            //This function will be called in the scope of widget instance
            getWidgetIdsFromRowData: function SegmentedUI2$_searcher_getWidgetIdsFromRowData(rowData) {
                var rowDataIds = Object.keys(rowData), r = 0,
                    widgetdatamap = this._kwebfw_.prop.widgetDataMap,
                    rlen = rowDataIds.length, widgetId = '',
                    invertedDataMap = {}, widgetIds = [], rowDataId = '';

                for(widgetId in widgetdatamap) {
                    if(Object.prototype.hasOwnProperty.call(widgetdatamap, widgetId)) {
                        rowDataId = widgetdatamap[widgetId];
                        invertedDataMap[rowDataId] = widgetId;
                    }
                }

                for(r = 0; r < rlen; r++) {
                    widgetIds.push(invertedDataMap[rowDataIds[r]]);
                }

                return widgetIds;
            },


            //This utility might not needed if similar function availbe in utils ??
            getValueFromObjectByPath: function SegmentedUI2$_searcher_getValueFromObjectByPath(keys, obj, delimiter) {
                var k=0, klen = 0, ref = null;

                if(!(typeof delimiter === 'string' && delimiter)) {
                    delimiter = '.';
                }

                if(typeof keys === 'string' && keys) {
                    keys = keys.split(delimiter);
                }

                if(keys instanceof Array && typeof obj === 'object' && obj) {
                    ref = obj;
                    klen = keys.length;

                    for(k=0; k<klen; k++) {
                        if(typeof ref === 'object' && ref && ref[keys[k]]) {
                            ref = ref[keys[k]];
                        } else {
                            break;
                        }
                    }
                }

                return ref;
            },


            //This function will be called in the scope of widget instance
            infoOfSearchableWidgetInRow: function SegmentedUI2$_searcher_infoOfSearchableWidgetInRow(index, rowData, rowDataId, widgetId) {
                var _ = this._kwebfw_, secIndex = index[0], rowIndex = index[1],
                    info = {isValid: false}, cloneModel = null, widget = null, widgetData = null,
                    validWidgetList = ['Button', 'Label', 'TextArea2', 'TextBox2', 'Calendar'];

                if(typeof rowDataId === 'string' && rowDataId
                && typeof widgetId === 'string' && widgetId
                && Object.prototype.hasOwnProperty.call(rowData, rowDataId)) {
                    widgetData = rowData[rowDataId];

                    if(_isSectionDS(_.prop.data[0])) {
                        cloneModel = _.clones[secIndex] ? _.clones[secIndex][1][rowIndex] : null;
                    } else {
                        cloneModel = _.clones[rowIndex];
                    }

                    // clonedModel might be null incase of toplevel flx is invisible.
                    if(!cloneModel) {
                        cloneModel = rowData.template || this.rowTemplate;

                        if(typeof cloneModel === 'string') {
                            cloneModel = _voltmx.mvc.initializeSubViewController(cloneModel);
                        }
                    }

                    widget = _searcher.SegmentedUI2.getValueFromObjectByPath(widgetId, cloneModel);

                    if(widget) {
                        info.widgetType = widget._kwebfw_.name;

                        if(validWidgetList.indexOf(info.widgetType) !== -1) {
                            info.isValid = true;

                            if(info.widgetType === 'Calendar') {
                                info.widgetText = (widgetData instanceof Array)
                                    ? widgetData : widgetData.dateComponents;
                            } else {
                                info.widgetText = (typeof widgetData === 'string')
                                    ? widgetData : widgetData.text;
                            }
                        }
                    }
                }

                return info;
            },


            //This function will be called in the scope of widget instance
            isOperandPassed: function SegmentedUI2$_searcher_isOperandPassed(index, rowData, searchCondition) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, caseSensitive = true,
                    widgetList = null, searchFound = false,
                    searchType = constants.SEGUI_SEARCH_CRITERIA_CONTAINS;

                if(searchCondition.textToSearch) {
                    if($KU.is(searchCondition.caseSensitive, 'boolean')) {
                        caseSensitive = searchCondition.caseSensitive;
                    }

                    if(searchCondition.searchableWidgets) {
                        widgetList = searchCondition.searchableWidgets;
                    } else {
                        widgetList = _searcher.SegmentedUI2.getWidgetIdsFromRowData.call(this, rowData);
                    }

                    if(searchCondition.searchType) searchType = searchCondition.searchType;

                    $KU.each(widgetList, function(widget) {
                        if(_searcher.SegmentedUI2.isOperandPassedByWidgetId.call(
                            this, index, rowData, widget, caseSensitive, searchType, searchCondition.textToSearch)) {
                            searchFound = true;
                            return true;
                        }
                    }, this);
                }

                return searchFound;
            },


            //This function will be called in the scope of widget instance
            isOperandPassedByWidgetId: function SegmentedUI2$_searcher_isOperandPassedByWidgetId(index, rowData, widgetId, caseSensitive, searchType, searchText) {
                var passed = false, rowDataId = this._kwebfw_.prop.widgetDataMap[widgetId],
                    info = _searcher.SegmentedUI2.infoOfSearchableWidgetInRow.call(this, index, rowData, rowDataId, widgetId);

                if(info.isValid) {
                    passed = _searcher.SegmentedUI2.matchWithConditionalOperator(info.widgetType, searchType, searchText, info.widgetText, caseSensitive);
                }

                return passed;
            },


            //This function will be called in the scope of widget instance
            isRowMatchingSearchCriteria: function SegmentedUI2$_searcher_isRowMatchingSearchCriteria(index, rowData) {
                var macthStr = null, searchCondition = this._kwebfw_.searcher.searchCondition;

                macthStr = _searcher.SegmentedUI2.generateExpression.call(this, index, rowData, searchCondition);

                //eslint-disable-next-line no-eval
                return eval(macthStr);
            },


            matchWithConditionalOperator: function SegmentedUI2$_searcher_matchWithConditionalOperator(widgetType, searchType, searchText, widgetText, caseSensitive) {
                var matched = false, substring = '';

                if(!caseSensitive && typeof searchText === 'string') {
                    searchText = searchText.toUpperCase();
                }

                if(!caseSensitive && typeof widgetText === 'string') {
                    widgetText = widgetText.toUpperCase();
                }

                switch(searchType) {
                    case constants.SEGUI_SEARCH_CRITERIA_CONTAINS :
                        if(typeof widgetText === 'string' && widgetText.indexOf(searchText) !== -1) {
                            matched = true;
                        }
                        break;

                    case constants.SEGUI_SEARCH_CRITERIA_ENDSWITH :
                        substring = typeof widgetText === 'string'
                            ? widgetText.substr(-searchText.length) : null;

                        if(searchText === substring) matched = true;
                        break;

                    case constants.SEGUI_SEARCH_CRITERIA_STARTSWITH :
                        substring = typeof widgetText === 'string'
                            ? widgetText.substr(0, searchText.length) : null;

                        if(searchText === substring) matched = true;
                        break;

                    case constants.SEGUI_SEARCH_CRITERIA_GREATER :
                        if(widgetType === 'Calendar' && searchText instanceof Array) {
                            widgetText = _searcher.SegmentedUI2.convertDateToNumber(widgetText);
                            searchText = _searcher.SegmentedUI2.convertDateToNumber(searchText);
                        } else {
                            widgetText = _searcher.SegmentedUI2.convertStringToNumber(widgetText);
                            searchText = _searcher.SegmentedUI2.convertStringToNumber(searchText);
                        }

                        if(typeof widgetText === 'number' && typeof searchText === 'number') {
                            matched = (widgetText > searchText) ? true : false;
                        }
                        break;

                    case constants.SEGUI_SEARCH_CRITERIA_GREATER_EQUAL :
                        if(widgetType === 'Calendar' && searchText instanceof Array) {
                            widgetText = _searcher.SegmentedUI2.convertDateToNumber(widgetText);
                            searchText = _searcher.SegmentedUI2.convertDateToNumber(searchText);
                        } else {
                            widgetText = _searcher.SegmentedUI2.convertStringToNumber(widgetText);
                            searchText = _searcher.SegmentedUI2.convertStringToNumber(searchText);
                        }

                        if(typeof widgetText === 'number' && typeof searchText === 'number') {
                            matched = (widgetText >= searchText) ? true : false;
                        }
                        break;

                    case constants.SEGUI_SEARCH_CRITERIA_LESSER :
                        if(widgetType === 'Calendar' && searchText instanceof Array) {
                            widgetText = _searcher.SegmentedUI2.convertDateToNumber(widgetText);
                            searchText = _searcher.SegmentedUI2.convertDateToNumber(searchText);
                        } else {
                            widgetText = _searcher.SegmentedUI2.convertStringToNumber(widgetText);
                            searchText = _searcher.SegmentedUI2.convertStringToNumber(searchText);
                        }

                        if(typeof widgetText === 'number' && typeof searchText === 'number') {
                            matched = (widgetText < searchText) ? true : false;
                        }
                        break;

                    case constants.SEGUI_SEARCH_CRITERIA_LESSER_EQUAL :
                        if(widgetType === 'Calendar' && searchText instanceof Array) {
                            widgetText = _searcher.SegmentedUI2.convertDateToNumber(widgetText);
                            searchText = _searcher.SegmentedUI2.convertDateToNumber(searchText);

                            if(typeof widgetText === 'number' && typeof searchText === 'number') {
                                matched = (widgetText <= searchText) ? true : false;
                            } else matched = true;
                        } else {
                            widgetText = _searcher.SegmentedUI2.convertStringToNumber(widgetText);
                            searchText = _searcher.SegmentedUI2.convertStringToNumber(searchText);

                            if(typeof widgetText === 'number' && typeof searchText === 'number') {
                                matched = (widgetText <= searchText) ? true : false;
                            }
                        }
                        break;

                    case constants.SEGUI_SEARCH_CRITERIA_STRICT_EQUAL :
                        if(widgetType === 'Calendar' && searchText instanceof Array) {
                            widgetText = _searcher.SegmentedUI2.convertDateToNumber(widgetText);
                            searchText = _searcher.SegmentedUI2.convertDateToNumber(searchText);

                            if(typeof widgetText === 'number' && typeof searchText === 'number') {
                                matched = (widgetText === searchText) ? true : false;
                            } else matched = true;
                        } else {
                            widgetText = _searcher.SegmentedUI2.convertStringToNumber(widgetText);
                            searchText = _searcher.SegmentedUI2.convertStringToNumber(searchText);

                            matched = (widgetText === searchText) ? true : false;
                        }
                        break;

                    case constants.SEGUI_SEARCH_CRITERIA_NOT_EQUAL :
                        if(widgetType === 'Calendar' && searchText instanceof Array) {
                            widgetText = _searcher.SegmentedUI2.convertDateToNumber(widgetText);
                            searchText = _searcher.SegmentedUI2.convertDateToNumber(searchText);

                            if(typeof widgetText === 'number' && typeof searchText === 'number') {
                                matched = (widgetText === searchText) ? true : false;
                            } else matched = true;
                        } else {
                            widgetText = _searcher.SegmentedUI2.convertStringToNumber(widgetText);
                            searchText = _searcher.SegmentedUI2.convertStringToNumber(searchText);

                            matched = (widgetText !== searchText) ? true : false;
                        }
                        break;

                    case constants.SEGUI_SEARCH_CRITERIA_NOT_CONTAINS :
                        if(typeof widgetText === 'string'
                        && widgetText.indexOf(searchText) === -1) {
                            matched = true;
                        }
                        break;

                    case constants.SEGUI_SEARCH_CRITERIA_NOT_ENDSWITH :
                        substring = typeof widgetText === 'string'
                            ? widgetText.substr(-searchText.length) : null;

                        if(searchText !== substring) {
                            matched = true;
                        }
                        break;

                    case constants.SEGUI_SEARCH_CRITERIA_NOT_STARTSWITH :
                        substring = typeof widgetText === 'string'
                            ? widgetText.substr(searchText.length) : null;

                        if(searchText !== substring) {
                            matched = true;
                        }
                        break;
                    default:
                        break;
                }

                return matched;
            },

            //This function will be called in the scope of widget instance
            removeAtHeaderVisibility: function SegmentedUI2$_searcher_removeAtHeaderVisibility(secIndex) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, $KD = $K.dom, _ = this._kwebfw_,
                    clones = _.clones[secIndex], found = false, li = null, display = '';

                if(_.searcher && _.searcher.config.updateSegment && _.searcher.config.showSectionHeaderFooter) {
                    $KU.each(clones[1], function(clone) {
                        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KD = $K.dom;

                        if(!$KU.is(clone, 'null') && clone._kwebfw_.view) {
                            li = $KD.parent(clone._kwebfw_.view);

                            if(li && $KD.style(li, 'display') === 'block') {
                                found = true;
                                return true;
                            }
                        }
                    });

                    // header visibility change
                    if(!$KU.is(clones[0], 'null') && clones[0]._kwebfw_.view) {
                        li = $KD.parent(clones[0]._kwebfw_.view);

                        if(found) {
                            display = 'block';
                        } else {
                            display = 'none';
                        }

                        if(li) $KD.style(li, 'display', display);
                    }
                }
            },


            //This function will be called in the scope of widget instance
            searchText: function SegmentedUI2$_searcher_searchText() {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, _ = this._kwebfw_,
                    config = _.searcher.config, sections = [],
                    filterList = _searcher.SegmentedUI2.getFilteredData.call(this);

                _.searcher.filteredResult = filterList;
                _searcher.SegmentedUI2.createFilterResultWithHeader.call(this, filterList);
                if(config.updateSegment) {
                    _searcher.SegmentedUI2.setResultOnView.call(this, filterList);

                    if(_isSectionDS(_.prop.data[0])) {
                        $KU.each(this._kwebfw_.clones, function(record, index) {
                            sections.push(index);
                        });
                        _searcher.SegmentedUI2.updateHeaderVisibility.call(this, sections, filterList);
                    }
                }

                return filterList;
            },


            //All the functions will be called in the scope of widget instance
            setResultOnView: function SegmentedUI2$_searcher_setResultOnView(filteredResult) {
                if(_shouldLazyLoad.call(this)) {
                    _searcher.SegmentedUI2.setResultOnViewWithLazyLoad.call(this, filteredResult);
                } else {
                    _iterateOverData.call(this, this._kwebfw_.clones, function(clone, rowIndex, secIndex) {
                        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KD = $K.dom, display = 'block', li = null;

                        if(rowIndex !== -1) {
                            if(secIndex === -1) secIndex = 0;

                            if(_getIndex([secIndex, rowIndex], filteredResult) === -1) {
                                display = 'none';
                            }

                            if(!$KU.is(clone, 'null') && clone._kwebfw_.view) {
                                li = $KD.parent(clone._kwebfw_.view);
                                if(li) {
                                    $KD.style(li, 'display', display);
                                }
                            }
                        }
                    });
                }
            },


            setResultOnViewWithLazyLoad: function SegmentedUI2$_searcher_setResultOnViewWithLazyLoad(filteredResult) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget,
                    index = [-1, -1], el = $KW.el(this), secIndex = 0;

                $KU.each(this._kwebfw_.rows, function(row) {
                    index = _deduceIndex.call(this, row);
                    if(index[0] !== -1) secIndex = index[0];
                    if(_getIndex([secIndex, index[1]], filteredResult) !== -1) {
                        return true;
                    }
                }, this);
                _lazyLoad.SegmentedUI2._renderFromIndex.call(this, index, el);
            },


            updateHeaderVisibility: function SegmentedUI2$_searcher_updateHeaderVisibility(sections, filteredResult) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, _ = this._kwebfw_,
                    config = _.searcher.config;

                var findSecIndex = function(find, list) {
                    var position = -1, i = 0, ilen = list.length;

                    for(i=0; i<ilen; i++) {
                        if(list[i][0] === find) {
                            position = i;
                            break;
                        }
                    }

                    return position;
                };

                if(_shouldLazyLoad.call(this)) {
                    $KU.each(this._kwebfw_.rows, function(row) {
                        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KD = $K.dom,
                            li = null, index = _deduceIndex.call(this, row),
                            display = 'none', secIndex = index[0];

                        if(!$KU.is(row, 'null') && index[1] === -1) {
                            if(sections.indexOf(secIndex) !== -1) {
                                li = $KD.parent(row._kwebfw_.view);
                                if(config.showSectionHeaderFooter && findSecIndex(secIndex, filteredResult) !== -1) {
                                    display = 'block';
                                }

                                if(li) $KD.style(li, 'display', display);
                            }
                        }
                    }, this);
                } else {
                    $KU.each(this._kwebfw_.clones, function(clones, secIndex) {
                        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KD = $K.dom,
                            li = null, display = 'none', clone = clones[0];

                        if(!$KU.is(clone, 'null') && clone._kwebfw_.view) {
                            if(sections.indexOf(secIndex) !== -1) {
                                li = $KD.parent(clone._kwebfw_.view);
                                if(config.showSectionHeaderFooter && findSecIndex(secIndex, filteredResult) !== -1) {
                                    display = 'block';
                                }

                                if(li) $KD.style(li, 'display', display);
                            }
                        }
                    });
                }
            },


            //All the functions will be called in the scope of widget instance
            updateSearchText: function SegmentedUI2$_searcher_updateSearchText(clones, section) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, _ = this._kwebfw_, sections = [],
                    updateFilterList = [];

                var updateNodeVisibility = function(segmodel, clone, index, widgetdata) {
                    var $K = voltmx.$kwebfw$, $KD = $K.dom, display = 'none',
                        li = $KD.parent(clone._kwebfw_.view);

                    if(_searcher.SegmentedUI2.isRowMatchingSearchCriteria.call(segmodel, index, widgetdata)) {
                        updateFilterList.push(index);
                        display = 'block';
                    }

                    if(li) $KD.style(li, 'display', display);
                };

                if(_.searcher && _.searcher.config.updateSegment) {
                    if(_shouldLazyLoad.call(this)) {
                        _searcher.SegmentedUI2.updateRowsAfterAPIForLazyLoad.call(this, clones);
                    } else {
                        $KU.each(clones, function(clone) {
                            var prop = this._kwebfw_.prop, data = null,
                                cindex = clone._kwebfw_.ii.split(','),
                                secIndex = parseInt(cindex[0], 10),
                                rowIndex = parseInt(cindex[1], 10);

                            if(rowIndex !== -1) {
                                if(section) {
                                    sections.push(secIndex);
                                    data = prop.data[secIndex][1][rowIndex];
                                    updateNodeVisibility(this, clone, [secIndex, rowIndex], data);
                                } else {
                                    data = prop.data[rowIndex];
                                    updateNodeVisibility(this, clone, [0, rowIndex], data);
                                }
                            }
                        }, this);
                    }

                    if(section) {
                        _searcher.SegmentedUI2.updateHeaderVisibility.call(this, sections, updateFilterList);
                    }
                }
            },


            updateRowsAfterAPIForLazyLoad: function SegmentedUI2$_searcher_updateRowsAfterAPIForLazyLoad(row) {
                var $K = voltmx.$kwebfw$, $KW = $K.widget, $KD = $K.dom, _ = this._kwebfw_, absIndex,
                    filterList = _.searcher.filteredResult, el = $KW.el(this),
                    index = _deduceIndex.call(this, row), secIndex = index[0];

                if(index[0] === -1) secIndex = 0;
                if(_getIndex([secIndex, index[1]], filterList) === -1) {
                    absIndex = _lazyLoad.SegmentedUI2._absoluteIndexInRows.call(this, index[0], index[1]);
                    $KD.removeAt(el.scrolee, absIndex);
                    this._kwebfw_.rows.splice(absIndex, 1);
                }
            },


            updateFilterResult: function SegmentedUI2$_searcher_updateFilterResult() {
                var _ = this._kwebfw_, filterList = _searcher.SegmentedUI2.getFilteredData.call(this);

                _.searcher.filteredResult = filterList;
                _searcher.SegmentedUI2.createFilterResultWithHeader.call(this, filterList);
            }
        }
    };


    //All the functions will be called in the scope of widget instance
    var _setBehaviorConfig = function SegmentedUI2$_setBehaviorConfig(widget) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, prop = this._kwebfw_.prop,
            imgId = null, img = null, selImg = null, unSelImg = null;

        if(prop.selectionBehaviorConfig && prop.selectionBehavior !== constants.SEGUI_DEFAULT_BEHAVIOR) {
            imgId = prop.selectionBehaviorConfig.imageIdentifier;
            selImg = prop.selectionBehaviorConfig.selectedStateImage;
            unSelImg = prop.selectionBehaviorConfig.unselectedStateImage;

            if(widget.id === imgId && $KU.is(widget, 'widget', 'Image2')) {
                img = unSelImg;
                $KU.each(this._kwebfw_.selectedRows, function(row) {
                    if(row.join(',') === widget._kwebfw_.ii) {
                        img = selImg;
                        return true;
                    }
                });

                widget._kwebfw_.prop.src = img;
            }
        }
    };


    //All the functions will be called in the scope of widget instance
    var _setPageView = function SegmentedUI2$_setPageView(el) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KD = $K.dom,
            _ = this._kwebfw_, prop = _.prop, rows = _.rows, rowIndex = 0,
            datalen = rows.length;

        var navigationDotsHandler = function(event) {
            rowIndex = event.target.getAttribute('index');

            rowIndex = parseInt(rowIndex, 10);
            _setPageViewIndicator.call(this, el, rowIndex);
        };


        $KD.setAttr(el.scrolee, 'kv', 'pageview');
        _flushPageNav(el.pageNav);
        $KD.html(el.pageNav, '');

        if(datalen > 0) {
            $KU.each(rows, function(clone, index) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, $KD = $K.dom,
                    _ = this._kwebfw_, prop = _.prop, img = null,
                    src = prop.pageOffDotImage, li = null;

                img = $KD.create('IMG', {loading: 'lazy'});

                $KD.setAttr(img, 'src', $KU.getImageURL(src));
                $KD.setAttr(img, 'alt', '');
                $KD.setAttr(img, 'index', index);
                $KD.style(img, 'padding-left', '4px');

                $KD.on(img, 'click', 'image', navigationDotsHandler.bind(this));
                $KD.on(img, 'mousedown', 'image', function(evt) {
                    $KD.preventDefault(evt);
                });

                $KD.add(el.pageNav, img);

                if(!$KU.is(clone, 'null') && clone._kwebfw_.view) {
                    li = $KD.closest(clone._kwebfw_.view, 'kr', 'item');
                    if(li) {
                        $KD.style(li, 'width', (100/datalen) + '%');
                        _applyRowSeparator.call(this, li, clone);
                        _applyRowAndHeaderSkin.call(this, li, clone, index);
                    }
                }
            }, this);
            $KD.style(el.scrolee, 'width', (datalen * 100) + '%');

            if(_.swipeContext && _.swipeContext.currentPage) {
                rowIndex = _.swipeContext.currentPage;
            } else if(prop.selectedRowIndex && prop.selectedRowIndex.length === 2) {
                rowIndex = prop.selectedRowIndex[1];
            }
            _setPageViewIndicator.call(this, el, rowIndex);
        }

        if(prop.needPageIndicator) $KD.style(el.pageNav, 'display', 'block');
    };


    //All the functions will be called in the scope of widget instance
    var _setPageViewIndicator = function SegmentedUI2$_setPageViewIndicator(el, rowIndex) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KD = $K.dom, _ = this._kwebfw_,
            datalen = 0, rows = _.rows, value = 0;

        if(el.scrolee) {
            datalen = rows.length;
            value = -(rowIndex * (100/datalen));
            $KD.style(el.scrolee, 'transition', 'transform 0.5s ease 0s');
            $KD.style(el.scrolee, 'transform', 'translate3d(' + value + '%, 0, 0)');

            if(!$KU.is(_.swipeContext, 'null')) {
                _.swipeContext.currentPage = rowIndex;
            } else {
                _.swipeContext = {};
                _.swipeContext.imageWidth = el.scrolee.firstChild.offsetWidth;
                _.swipeContext.currentPage = rowIndex;
            }

            $KU.each($KD.children(el.pageNav), function(img, index) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils,
                    src = null, prop = this._kwebfw_.prop;

                src = (rowIndex === index) ? prop.pageOnDotImage : prop.pageOffDotImage;

                if(img.src && img.src.substring(img.src.lastIndexOf('/') + 1) !== src) {
                    img.src = $KU.getImageURL(src);
                }
            }, this);
        }
    };


    var _setTableView = function SegmentedUI2$_setTableView(el) {
        var $K = voltmx.$kwebfw$, $KD = $K.dom, $KU = $K.utils,
            _ = this._kwebfw_, rows = _.rows;

        if(_shouldLazyLoad.call(this)) {
            //In case of lazyload, on view type change reset all the clones and render from first index
            _onDataSet.call(this);
            _view.SegmentedUI2.data.call(this, el);
        } else if(rows.length > 0) {
            $KU.each(rows, function(clone, index) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, $KD = $K.dom,
                    li = null;

                if(!$KU.is(clone, 'null') && clone._kwebfw_.view) {
                    li = $KD.closest(clone._kwebfw_.view, 'kr', 'item');
                    if(li) {
                        $KD.style(li, 'width', null);
                        _applyRowSeparator.call(this, li, clone);
                        _applyRowAndHeaderSkin.call(this, li, clone, index);
                    }
                }
            }, this);
        }

        _flushPageNav(el.pageNav);

        $KD.html(el.pageNav, '');
        $KD.style(el.pageNav, 'display', 'none');
        $KD.setAttr(el.scrolee, 'kv', 'tableview');
        $KD.style(el.scrolee, {'transition': null, 'transform': null, 'width': null});
    };

    //All widget file must have this variable
    //All the functions will be called in the scope of widget instance
    var _setter = {
        SegmentedUI2: {
            data: function SegmentedUI2$_setter_data(/*old*/) {
                _onDataSet.call(this);
            },

            selectedRowIndex: function SegmentedUI2$_setter_selectedRowIndex(/*old*/) {
                var _ = this._kwebfw_, prop = _.prop, index = -1, deSelectedRow = [];

                _.deSelectedRows = [];

                if(prop.selectedRowIndex && !_isSectionDS(prop.data[0])) {
                    prop.selectedRowIndex[0] = -1;
                }

                if(!prop.selectedRowIndex) {
                    deSelectedRow = _.selectedRows.splice(0, _.selectedRows.length);
                    if(prop.selectionBehavior !== constants.SEGUI_DEFAULT_BEHAVIOR) {
                        _updateBehaviorImgs.call(this, false, deSelectedRow);
                    }
                } else if(prop.viewType !== constants.SEGUI_VIEW_TYPE_TABLEVIEW
                || prop.selectionBehavior === constants.SEGUI_DEFAULT_BEHAVIOR) {
                    _.selectedRows.splice(0, _.selectedRows.length, prop.selectedRowIndex.slice(0));
                } else if(prop.viewType === constants.SEGUI_VIEW_TYPE_TABLEVIEW) {
                    if(prop.selectionBehavior === constants.SEGUI_SINGLE_SELECT_BEHAVIOR) {
                        deSelectedRow = _.selectedRows.splice(0, _.selectedRows.length, prop.selectedRowIndex.slice(0));
                        _updateBehaviorImgs.call(this, false, [deSelectedRow], [prop.selectedRowIndex.slice(0)]);
                    } else if(prop.selectionBehavior === constants.SEGUI_MULTI_SELECT_BEHAVIOR) {
                        index = _getIndex(prop.selectedRowIndex, _.selectedRows);

                        if(index !== -1) {
                            deSelectedRow = _.selectedRows.splice(index, 1);
                            _updateBehaviorImgs.call(this, false, [deSelectedRow]);
                        } else {
                            _.selectedRows.push(prop.selectedRowIndex.slice(0));
                            _updateBehaviorImgs.call(this, false, [deSelectedRow], [prop.selectedRowIndex.slice(0)]);
                        }
                    }
                }

                _.deSelectedRows = deSelectedRow;
                _setSelectedRowsRelatedProperties.call(this);
            },

            selectedRowIndices: function SegmentedUI2$_setter_selectedRowIndices(/*old*/) {
                var _=this._kwebfw_, prop = _.prop, rows = _.selectedRows,
                    rowIndexes = null, s = 0, slen = 0, r = 0, rlen = 0,
                    deSelectedRows = rows.splice(0, rows.length),
                    rowIndices = prop.selectedRowIndices;

                _.deSelectedRows = [];

                if(rowIndices) {
                    slen = rowIndices.length;

                    for(s=0; s<slen; s++) {
                        rowIndexes = rowIndices[s][1];
                        rlen = rowIndexes.length;

                        for(r=0; r<rlen; r++) {
                            rows.push([rowIndices[s][0], rowIndexes[r]]);
                        }
                    }
                }
                _updateBehaviorImgs.call(this, false, deSelectedRows, rows);
                _.deSelectedRows = deSelectedRows;
                _setSelectedRowsRelatedProperties.call(this);
            },

            widgetDataMap: function SegmentedUI2$_setter_widgetDataMap(old) {
                this._kwebfw_.invertedDataMap = _getInvertedDataMap(old);
            }
        }
    };


    //This function will be called in the scope of widget instance
    var _setSelectedRowsRelatedProperties = function SegmentedUI2$_setSelectedRowsRelatedProperties() {
        var prop = this._kwebfw_.prop, rows = this._kwebfw_.selectedRows,
            section = false, indices = {}, r = 0,
            rlen = rows.length, sindex = -1, rindex = -1, key = '';

        prop.selectedRowItems = [];

        if(prop.data && prop.data.length > 0) {
            section = _isSectionDS(prop.data[0]);
            prop.selectedRowIndex = (!rlen) ? null : rows[(rlen-1)].slice(0);
            prop.selectedRowIndices = (!rlen) ? null : [];

            for(r=0; r<rlen; r++) {
                sindex = rows[r][0];
                rindex = rows[r][1];

                if(!section) {
                    if(sindex === 0) sindex = -1;
                    prop.selectedRowItems.push(prop.data[rindex]);
                } else {
                    prop.selectedRowItems.push(prop.data[sindex][1][rindex]);
                }

                key = sindex.toString();
                if(!Object.prototype.hasOwnProperty.call(indices, key)) {
                    indices[key] = [];
                }
                indices[key].push(rindex);
            }

            for(key in indices) {
                prop.selectedRowIndices.push([parseInt(key, 10), indices[key]]);
            }
        } else {
            prop.selectedRowIndex = null;
            prop.selectedRowIndices = null;
            rows.splice(0, rlen);
        }
    };


    //This function will be called in the scope of widget instance
    var _shouldLazyLoad = function SegmentedUI2$_shouldLazyLoad() {
        var $K = voltmx.$kwebfw$, $KW = $K.widget;

        return $KW.shouldLazyLoad.SegmentedUI2.call(this);
    };


    var _translatePage = function SegmentedUI2$_translatePage(el, distance/*, duration*/) {
        var $K = voltmx.$kwebfw$, $KD = $K.dom;

        //cnutodo handle duration

        var transformObj = voltmx.ui.makeAffineTransform();
        transformObj.translate(distance, 0);
        $KD.style(el, 'transform', transformObj.transform.translate);
    };


    //This function will be called in the scope of widget instance
    var _validateInputIndices = function SegmentedUI2$_validateInputIndices(secIndex, rowIndex, action) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, index = -1,
            data = this._kwebfw_.prop.data, rowIndexBoundary = 0,
            errorMessage = '', secIndexBoundary = 0;

        if(!$KU.is(rowIndex, 'number')) {
            errorMessage = 'Invalid row Index.';
        }

        if(!$KU.is(secIndex, 'undefined') && !$KU.is(secIndex, 'number')) {
            errorMessage = 'Invalid section Index.';
        }

        if(data && data.length > 0) {
            if(_isSectionDS(data[0])) {
                index = _deduceIndex.call(this, secIndex+','+rowIndex);
                secIndexBoundary = data.length;

                if(action === 'addsectionat') secIndexBoundary = secIndexBoundary + 1;

                if(index[0] === -1 || index[0] >= secIndexBoundary) {
                    errorMessage = 'Invalid section index.';
                } else if(['add', 'update', 'remove'].indexOf(action) !== -1) {
                    rowIndexBoundary = data[secIndex][1].length;
                    if(action === 'add') rowIndexBoundary = rowIndexBoundary + 1;
                }
            } else {
                if(!$KU.is(secIndex, 'undefined') && secIndex !== 0) {
                    errorMessage = 'Invalid section index.';
                }

                index = _deduceIndex.call(this, '-1,'+rowIndex);
                rowIndexBoundary = data.length;
                if(action === 'add') rowIndexBoundary = rowIndexBoundary + 1;
            }

            if(action !== 'addsectionat' && errorMessage === ''
            && (index[1] === -1 || index[1] >= rowIndexBoundary)) {
                errorMessage = 'Invalid row index.';
            }
        } else {
            if(action !== 'add' && action !== 'addsectionat') {
                errorMessage = 'No data exists.';
            } else if(action === 'addsectionat' && secIndex !== 0) {
                // addsectionat action secIndex rather than ZERO not allowed
                errorMessage = 'Invalid section index.';
            } else if(action === 'add') {
                if(rowIndex !== 0) {
                    // add action rowIndex rather than ZERO not allowed
                    errorMessage = 'Invalid row index.';
                } else if(!$KU.is(secIndex, 'undefined') && secIndex !== 0) {
                    // add action secIndex should be either -1 or undefined
                    errorMessage = 'Invalid section index.';
                }
            }
        }

        return errorMessage;
    };


    //All the functions will be called in the scope of widget instance
    var _updateAriaRowCount = function SegmentedUI2$_updateAriaRowCount(count, el) {
        var $K = voltmx.$kwebfw$, $KW = $K.widget, $KD = $K.dom,
            tag = _deduceTagName.call(this);

        el = el || $KW.el(this);

        if(tag === 'div' && el.scrolee) {
            $KD.setAttr(el.scrolee, 'aria-rowcount', count);
        }
    };


    //All the functions will be called in the scope of widget instance
    var _updateBehaviorImgs = function SegmentedUI2$_updateBehaviorImgs(deSelectedAll, deSelectedRows, selectedRows) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, imgId = null,
            _ = this._kwebfw_, prop = _.prop, rows = _.rows,
            deSelectedIndexes = [], selectedIndexes = [], selImg = null, unSelImg = null;

        var joinRowIndexAsString = function(fromArray, toArray) {
            $KU.each(fromArray, function(row) {
                toArray.push(row.join(','));
            });
        };

        var updateImage = function(clone, imgId, imgUrl) {
            var $K = voltmx.$kwebfw$, $KW = $K.widget, len = 0,
                imgPath = imgId.split('.'), containerId = '';

            if(imgPath.length === 1) {
                imgId = imgPath[0];
                containerId = clone.id;
            } else { // incase the image is inside component
                len = imgPath.length;
                imgId = imgPath[len - 1];
                containerId = imgPath[len - 2];
            }
            if(clone) {
                $KW.iterate(clone, function(widget) {
                    var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget,
                        container = null, el = null;

                    if($KU.is(widget, 'widget', 'Image2')) {
                        if(widget.id === imgId) {
                            container = $KW.rmodel(widget);
                            if(container.id === containerId) {
                                widget._kwebfw_.prop.src = imgUrl;
                                el = $KW.el(widget);
                                if(el && el.image) el.image.src = $KU.getImageURL(imgUrl);
                                return true;
                            }
                        }
                    }
                }, {tabs:false});
            }
        };

        if(prop.selectionBehaviorConfig && prop.selectionBehavior !== constants.SEGUI_DEFAULT_BEHAVIOR) {
            imgId = prop.selectionBehaviorConfig.imageIdentifier;
            selImg = prop.selectionBehaviorConfig.selectedStateImage;
            unSelImg = prop.selectionBehaviorConfig.unselectedStateImage;

            if(deSelectedAll) {
                _iterateOverData.call(this, _.rows, function(clone) {
                    updateImage(clone, imgId, unSelImg);
                });
            } else {
                joinRowIndexAsString(selectedRows, selectedIndexes);
                joinRowIndexAsString(deSelectedRows, deSelectedIndexes);
                $KU.each(rows, function(clone) {
                    if(selectedIndexes.indexOf(clone._kwebfw_.ii) !== -1) {
                        updateImage(clone, imgId, selImg);
                    } else if(deSelectedIndexes.indexOf(clone._kwebfw_.ii) !== -1) {
                        updateImage(clone, imgId, unSelImg);
                    }
                });
            }
        }
    };


    //All the functions will be called in the scope of widget instance
    var _updateSelectionBehaviorConfig = function SegmentedUI2$_updateSelectionBehaviorConfig() {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, _ = this._kwebfw_, imgId = null,
            clones = _.clones, prop = _.prop, selImg = null, unSelImg = null, imgPath = [],
            containerId = '', len = 0, templateMap = {};

        if(prop.selectionBehaviorConfig && prop.selectionBehavior !== constants.SEGUI_DEFAULT_BEHAVIOR) {
            imgId = prop.selectionBehaviorConfig.imageIdentifier;
            selImg = prop.selectionBehaviorConfig.selectedStateImage;
            unSelImg = prop.selectionBehaviorConfig.unselectedStateImage;
            imgPath = imgId.split('.');

            if(imgPath.length === 1) {
                imgId = imgPath[0];
                containerId = this.rowTemplate.id;
            } else { // incase the image is inside component
                len = imgPath.length;
                imgId = imgPath[len - 1];
                containerId = imgPath[len - 2];
            }
        }

        if(_isSectionDS(prop.data[0])) { //with sections
            $KU.each(clones, function(clone) {
                $KU.each(clone[1], function(row) {
                    if($KU.is(row, 'widget')) {
                        _updateSelectionBehaviorConfigonRow.call(this, row, imgId, selImg, unSelImg, containerId, templateMap);
                    }
                }, this);
            }, this);
        } else { // without sections
            $KU.each(clones, function(row) {
                if($KU.is(row, 'widget')) {
                    _updateSelectionBehaviorConfigonRow.call(this, row, imgId, selImg, unSelImg, containerId, templateMap);
                }
            }, this);
        }

        $KU.each(templateMap, function(tplWidget) {
            _flushClones.call(this, tplWidget);
        }, this);
    };


    //All the functions will be called in the scope of widget instance
    var _updateSelectionBehavior = function SegmentedUI2$_updateSelectionBehavior() {
        _clearSelectedIndices.call(this);
        if(this._kwebfw_.prop.selectionBehavior !== constants.SEGUI_DEFAULT_BEHAVIOR) {
            _updateBehaviorImgs.call(this, true);
        } else {
            _updateSelectionBehaviorConfig.call(this);
        }
    };

    //this function for updation of selection behavior on each row.
    var _updateSelectionBehaviorConfigonRow = function SegmentedUI2$_updateSelectionBehaviorConfigonRow(clone, imgId, selImg, unSelImg, containerId, templateMap) {
        var $K = voltmx.$kwebfw$, $KW = $K.widget;

        $KW.iterate(clone, function(widget) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils, index = null, _ = this._kwebfw_,
                secIndex = -1, rowIndex = -1, item = null, itemimg = null,
                dataId = null, prop = this._kwebfw_.prop, data = prop.data, img = unSelImg,
                container = null, el = null, widgetDataMap = prop.widgetDataMap, currTpl = null;

            if($KU.is(widget, 'widget', 'Image2')) {
                if(widget.id === imgId && prop.selectionBehavior !== constants.SEGUI_DEFAULT_BEHAVIOR) {
                    container = $KW.rmodel(widget);
                    if(container.id === containerId) {
                        $KU.each(_.selectedRows, function(row) {
                            if(row === widget._kwebfw_.ii) {
                                img = selImg;
                                return true;
                            }
                        });
                    }
                } else {
                    index = _deduceIndex.call(this, widget);
                    secIndex = index[0];
                    rowIndex = index[1];
                    if(secIndex === -1) item = data[rowIndex];
                    else item = data[secIndex][1][rowIndex];

                    dataId = widgetDataMap[widget.id];

                    if($KU.is(dataId, 'string') && dataId
                    && Object.prototype.hasOwnProperty.call(item, dataId)) {
                        itemimg = item[dataId];
                    }

                    if(!itemimg) {
                        currTpl = item.template || this.rowTemplate;

                        if($KU.is(currTpl, 'string')) {
                            if(templateMap[currTpl]) {
                                currTpl = templateMap[currTpl];
                            } else {
                                currTpl = $KW.getTemplate(this, currTpl);
                                templateMap[currTpl.id] = currTpl;
                            }
                        }

                        $KW.iterate(currTpl, function(tplwidget) {
                            if(tplwidget.id === widget.id) {
                                img = tplwidget.src;
                                return true;
                            }
                        }, {tabs:false});
                    } else {
                        if($KU.is(itemimg, 'string')) {
                            img = itemimg;
                        } else if($KU.is(itemimg, 'object')) {
                            img = itemimg['src'];
                        }
                    }
                }

                widget._kwebfw_.prop.src = img;
                el = $KW.el(widget);
                if(el && el.image) el.image.src = $KU.getImageURL(img);
            }
        }, {scope:this, tabs:false});
    };


    //This function will be called in the scope of widget instance
    var _updateIndexes = function SegmentedUI2$_updateIndexes(fromIndex, ofSectionIndex) {
        var prop = this._kwebfw_.prop, data = prop.data, rlen = 0,
            clones = this._kwebfw_.clones, r = 0, s = 0, slen = 0;

        var updateIndex = function(segmentmodel, clone, index) {
            var $K = voltmx.$kwebfw$, $KW = $K.widget, $KD = $K.dom, li = null,
                tag = _deduceTagName.call(segmentmodel), absIndex = null;

            if(clone && clone._kwebfw_.view) {
                li = $KD.closest(clone._kwebfw_.view, 'kr', 'item');

                if(li) {
                    absIndex = (_absoluteIndexInData.call(segmentmodel, index) + 1);
                    $KD.setAttr(li, 'kii', index);

                    if(tag === 'div') {
                        $KD.setAttr(li, 'aria-rowindex', absIndex);
                    }
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
            if(_isSectionDS(data[0])) {
                slen = clones.length;
                if(ofSectionIndex === -1) { //Section has changed
                    //Change index of items[s][0] and items[s][1][r]
                    for(s = fromIndex; s < slen; s++) {
                        updateIndex(this, clones[s][0], (s + ',-1'));

                        rlen = clones[s][1].length;
                        for(r = 0; r < rlen; r++) {
                            updateIndex(this, clones[s][1][r], (s + ',' + r));
                        }
                    }
                } else { //Row of a particular section has changed
                    //Change index of items[r]
                    for(s = ofSectionIndex; s < slen; s++) {
                        rlen = clones[s][1].length;
                        for(r = fromIndex; r < rlen; r++) {
                            updateIndex(this, clones[s][1][r], (s + ',' + r));
                        }
                    }
                }
            } else { //Row of a non-sectionable segment has changed
                //Change index of items[r]
                rlen = clones.length;
                for(r = fromIndex; r < rlen; r++) {
                    updateIndex(this, clones[r], ('-1,' + r));
                }
            }

            _updateAriaRowCount.call(this, _getRowCount.call(this));
        }
    };


    //This function will be called in the scope of widget instance
    var _updateSectionHeaderSkin = function SegmentedUI2$_updateSectionHeaderSkin() {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, headerRows = [];

        $KU.each(this._kwebfw_.clones, function(record/*, index*/) {
            headerRows.push(record[0]);
        });

        $KU.each(headerRows, function(clone, index) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils, $KD = $K.dom,
                li = null;

            if(!$KU.is(clone, 'null') && clone._kwebfw_.view) {
                li = $KD.closest(clone._kwebfw_.view, 'kr', 'item');
            }

            if(li) {
                _applyRowAndHeaderSkin.call(this, li, clone, index);
            }
        }, this);
    };


    //This function will be called in the scope of widget instance
    var _updateRowSkin = function SegmentedUI2$_updateRowSkin() {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, index = 0, isSection = false,
            firstRow = null, firstRowIndex = null;

        firstRow = _getFirstRederedRow.call(this);
        firstRowIndex = _deduceIndex.call(this, firstRow);

        if(firstRowIndex[1] !== -1) {
            index = firstRowIndex[1];
        }

        $KU.each(this._kwebfw_.rows, function(clone) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils, $KD = $K.dom,
                li = null, ii = clone._kwebfw_.ii;

            if(!$KU.is(clone, 'null') && clone._kwebfw_.view) {
                li = $KD.closest(clone._kwebfw_.view, 'kr', 'item');
            }

            if(isSection) {
                firstRowIndex = _deduceIndex.call(this, clone);
                if(firstRowIndex[1] !== -1) {
                    index = firstRowIndex[1];
                }
            }

            if(li) {
                _applyRowAndHeaderSkin.call(this, li, clone, index);

                if(ii.indexOf(',-1') !== -1) {
                    isSection = true;
                } else {
                    index++;
                }
            }
        }, this);
    };


    //This function will be called in the scope of widget instance
    var _updateSeparator = function SegmentedUI2$_updateSeparator() {
        var $K = voltmx.$kwebfw$, $KU = $K.utils,
            prop = this._kwebfw_.prop;

        if(prop.viewType === constants.SEGUI_VIEW_TYPE_TABLEVIEW) {
            $KU.each(this._kwebfw_.rows, function(clone/*, index*/) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, $KD = $K.dom,
                    li = null;

                if(!$KU.is(clone, 'null') && clone._kwebfw_.view) {
                    li = $KD.closest(clone._kwebfw_.view, 'kr', 'item');
                }

                if(li) {
                    _applyRowSeparator.call(this, li, clone);
                }
            }, this);
        }
    };


    //This function will be called in the scope of widget instance
    var _updateSpecialProperties = function SegmentedUI2$_updateSpecialProperties(widget) {
        widget._kwebfw_.oid = this._kwebfw_.uid;
        widget._kwebfw_.wap = this._kwebfw_.wap + ('[' + widget._kwebfw_.ii + ']_') + widget._kwebfw_.wap;
    };


    //All widget file must have this variable
    //All the functions will be called in the scope of widget instance
    //These function should always return a boolean value
    var _valid = {
        SegmentedUI2: {
            alternateRowSkin: function SegmentedUI2$_valid_alternateRowSkin(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'object')
                || ($KU.is(value, 'string') && value.split(' ').length === 1)) {
                    flag = true;
                }

                return flag;
            },

            bounces: function SegmentedUI2$_valid_bounces(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'boolean')) {
                    flag = true;
                }

                return flag;
            },

            contentOffset: function SegmentedUI2$_valid_contentOffset(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'object')
                && $KU.is(value.x, 'size')
                && $KU.is(value.y, 'size')) {
                    flag = true;
                }

                return flag;
            },

            data: function SegmentedUI2$_valid_data(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'array') || $KU.is(value, 'null')) {
                    flag = true;
                }

                return flag;
            },

            enableLazyLoad: function SegmentedUI2$_valid_enableLazyLoad(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'boolean')) {
                    flag = true;
                }

                return flag;
            },

            dockSectionHeaders: function SegmentedUI2$_valid_dockSectionHeaders(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'boolean')) {
                    flag = true;
                }

                return flag;
            },

            loadingPlaceholderImage : function SegmentedUI2$_valid_loadingPlaceholderImage(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'string') || $KU.is(value, 'null')) {
                    flag = true;
                }

                return flag;
            },

            needPageIndicator: function SegmentedUI2$_valid_needPageIndicator(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'boolean')) {
                    flag = true;
                }

                return flag;
            },

            onRowClick: function SegmentedUI2$_valid_onRowClick(value) {
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

            onRowDisplay: function SegmentedUI2$_valid_onRowDisplay(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'function') || $KU.is(value, 'null')) {
                    flag = true;
                }

                return flag;
            },


            onSwipe: function SegmentedUI2$_valid_onSwipe(value) {
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

            pageOffDotImage: function SegmentedUI2$_valid_pageOffDotImage(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'string')) {
                    flag = true;
                }

                return flag;
            },

            pageOnDotImage: function SegmentedUI2$_valid_pageOnDotImage(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'string')) {
                    flag = true;
                }

                return flag;
            },

            retainScrollPositionMode: function SegmentedUI2$_valid_retainScrollPositionMode(value) {
                var flag = false,
                    options = [constants.SEGUI_SCROLL_POSITION_DEFAULT, constants.SEGUI_SCROLL_POSITION_RETAIN,
                        constants.SEGUI_SCROLL_POSITION_TOP];

                if(options.indexOf(value) >= 0) {
                    flag = true;
                }

                return flag;
            },

            retainSelection: function SegmentedUI2$_valid_retainSelection(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'boolean')) {
                    flag = true;
                }

                return flag;
            },

            rowFocusSkin: function SegmentedUI2$_valid_rowFocusSkin(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'object')
                || ($KU.is(value, 'string') && value.split(' ').length === 1)) {
                    flag = true;
                }

                return flag;
            },

            rowSkin: function SegmentedUI2$_valid_rowSkin(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'object')
                || ($KU.is(value, 'string') && value.split(' ').length === 1)) {
                    flag = true;
                }

                return flag;
            },

            rowTemplate: function SegmentedUI2$_valid_rowTemplate(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'widget', 'FlexContainer') || $KU.is(value, 'string') || value === null) {
                    flag = true;
                }

                return flag;
            },

            scrollingEvents: function SegmentUI2$_valid_scrollingEvents(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false, subflag = true,
                    names = ['onPush', 'onPull', 'onReachingBegining', 'onReachingEnd'];

                if($KU.is(value, 'null')) {
                    flag = true;
                } else if($KU.is(value, 'object')) {
                    flag = true;

                    $KU.each(names, function(name) {
                        var $K = voltmx.$kwebfw$, $KU = $K.utils;

                        if(Object.prototype.hasOwnProperty.call(value, name)
                        && !$KU.is(value[name], 'function')) {
                            subflag = false;
                            return true;
                        }
                    });
                }

                return (flag && subflag);
            },

            sectionHeaderSkin: function SegmentedUI2$_valid_sectionHeaderSkin(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'object')
                || ($KU.is(value, 'string') && value.split(' ').length === 1)) {
                    flag = true;
                }

                return flag;
            },

            sectionHeaderTemplate: function SegmentedUI2$_valid_sectionHeaderTemplate(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'widget', 'FlexContainer') || $KU.is(value, 'string') || value === null) {
                    flag = true;
                }

                return flag;
            },

            selectedRowIndex: function SegmentedUI2$_valid_selectedRowIndex(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false,
                    prop = this._kwebfw_.prop;

                if($KU.is(value, 'array') || $KU.is(value, 'null')) {
                    flag = true;
                }

                if($KU.is(value, 'array') && Object.prototype.hasOwnProperty.call(prop, 'data')
                && Object.prototype.hasOwnProperty.call(prop, 'selectedRowIndex')) {
                    flag = _validIndex.call(this, value.slice(0), true);
                }

                return flag;
            },

            selectedRowIndices: function SegmentedUI2$_valid_selectedRowIndices(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, count = 0, flag = true,
                    s = 0, slen = 0, r = 0, rlen = 0, _ = this._kwebfw_,
                    prop = _.prop, secIndex = -1, rowIndexes = [];

                if($KU.is(value, 'array')) {
                    slen = value.length;
                    for(s=0; s<slen; s++) {
                        if(flag === false) {
                            break;
                        } else {
                            secIndex = value[s][0];
                            rowIndexes = value[s][1];

                            rlen = rowIndexes.length;
                            for(r=0; r<rlen; r++) {
                                flag = _validIndex.call(this, [secIndex, rowIndexes[r]]);
                                if(flag === false) break;
                                else count++;

                                if(!(prop.viewType === constants.SEGUI_VIEW_TYPE_TABLEVIEW
                                && prop.selectionBehavior === constants.SEGUI_MULTI_SELECT_BEHAVIOR)) {
                                    if(count > 1) flag = false;
                                }
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

            selectedRowItems: function SegmentedUI2$_valid_selectedRowItems(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'array')) {
                    flag = true;
                }

                return flag;
            },

            selectionBehavior: function SegmentedUI2$_valid_selectionBehavior(value) {
                var flag = false, options = [
                    constants.SEGUI_DEFAULT_BEHAVIOR,
                    constants.SEGUI_MULTI_SELECT_BEHAVIOR,
                    constants.SEGUI_SINGLE_SELECT_BEHAVIOR
                ];

                if(options.indexOf(value) >= 0) {
                    flag = true;
                }

                return flag;
            },

            selectionBehaviorConfig: function SegmentedUI2$_valid_selectionBehaviorConfig(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'object')) {
                    flag = true;
                }

                return flag;
            },

            separatorColor: function SegmentedUI2$_valid_separatorColor(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'string')) {
                    value = value.toUpperCase();
                    flag = $KU.is(value, 'color');
                }

                return (flag ? [value, flag] : flag);
            },

            separatorRequired: function SegmentedUI2$_valid_separatorRequired(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'boolean')) {
                    flag = true;
                }

                return flag;
            },

            separatorThickness: function SegmentedUI2$_valid_separatorThickness(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'number') && value >= 0) {
                    flag = true;
                }

                return flag;
            },

            showScrollbars: function SegmentedUI2$_valid_showScrollbars(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'boolean')) {
                    flag = true;
                }

                return flag;
            },

            viewType: function SegmentedUI2$_valid_viewType(value) {
                var flag = false, options = [
                    constants.SEGUI_VIEW_TYPE_PAGEVIEW,
                    constants.SEGUI_VIEW_TYPE_TABLEVIEW
                ];

                if(options.indexOf(value) >= 0) {
                    flag = true;
                }

                return flag;
            },

            widgetDataMap: function SegmentedUI2$_valid_widgetDataMap(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'object')) {
                    flag = true;
                }

                return flag;
            },

            widgetSkin: function SegmentedUI2$_valid_widgetSkin(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'object')
                || ($KU.is(value, 'string') && value.split(' ').length === 1)) {
                    flag = true;
                }

                return flag;
            }
        }
    };


    //This function will be called in the scope of widget instance
    var _validIndex = function SegmentedUI2$_validIndex(index, mutate) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false,
            data = this._kwebfw_.prop.data, sectionable = false;

        if(data && data.length && $KU.is(index, 'array') && index.length === 2
        && $KU.is(index[0], 'number') && $KU.is(index[1], 'number')) {
            sectionable = _isSectionDS(data[0]);

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
        SegmentedUI2: {
            alternateRowSkin: function SegmentedUI2$_view_alternateRowSkin(/*el, old*/) {
                _updateRowSkin.call(this);
            },

            bounces: true,

            contentOffset: function SegmentedUI2$_view_contentOffset(/*el, old*/) {
                this.setContentOffset(this.contentOffset, true);
            },

            contentOffsetMeasured: false,

            data: function SegmentedUI2$_view_data(el/*, old*/) {
                var $K = voltmx.$kwebfw$, $KD = $K.dom,
                    prop = this._kwebfw_.prop, clone = null;

                _updateAriaRowCount.call(this, _getRowCount.call(this), el);
                $KD.html(el.scrolee, '');
                $KD.style(el.topscrolee, 'height', '0px');
                $KD.style(el.bottomscrolee, 'height', '0px');

                this._kwebfw_.rows = [];

                if(prop.data && prop.data.length) {
                    if(_shouldLazyLoad.call(this)) {
                        if(_isSectionDS(prop.data[0])) {
                            _lazyLoad.SegmentedUI2._renderFromIndex.call(this, [0, -1], el);
                        } else {
                            _lazyLoad.SegmentedUI2._renderFromIndex.call(this, [-1, 0], el);
                        }
                    } else {
                        _iterateOverData.call(this, prop.data, function(data, rowIndex, secIndex) {
                            clone = _getClonedTemplate.call(this, [secIndex, rowIndex]);
                            clone && this._kwebfw_.rows.push(clone);
                        });

                        if(this._kwebfw_.rows.length) {
                            $KD.add(el.scrolee, _renderRows.call(this, this._kwebfw_.rows));
                        }

                        if(prop.viewType === constants.SEGUI_VIEW_TYPE_PAGEVIEW) {
                            _setPageView.call(this, el);
                        }
                        _applyNodeStyles.call(this);
                    }

                    if(this._kwebfw_.searcher) _searcher.SegmentedUI2.searchText.call(this);
                }
            },

            dockSectionHeaders: true,

            enableLazyLoad : true,

            loadingPlaceholderImage : function SegmentedUI2$_view_loadingPlaceholderImage(el/*, old*/) {
                if(_shouldLazyLoad.call(this)) {
                    _lazyLoad.SegmentedUI2._setLoadingPlaceholder.call(this, el);
                }
            },

            needPageIndicator: function SegmentedUI2$_view_needPageIndicator(el/*, old*/) {
                var $K = voltmx.$kwebfw$, $KD = $K.dom;

                if(this._kwebfw_.prop.needPageIndicator) {
                    $KD.style(el.pageNav, 'display', 'block');
                } else {
                    $KD.style(el.pageNav, 'display', 'none');
                }
            },

            onRowClick: true,

            onRowDisplay: true,

            onSwipe: true,

            pageOffDotImage: function SegmentedUI2$_view_pageOffDotImage(el/*, old*/) {
                if(this._kwebfw_.prop.viewType === constants.SEGUI_VIEW_TYPE_PAGEVIEW) {
                    _setPageView.call(this, el);
                }
            },

            pageOnDotImage: function SegmentedUI2$_view_pageOnDotImage(el/*, old*/) {
                if(this._kwebfw_.prop.viewType === constants.SEGUI_VIEW_TYPE_PAGEVIEW) {
                    _setPageView.call(this, el);
                }
            },

            retainScrollPositionMode: true,

            retainSelection: true,

            rowFocusSkin: true,

            rowSkin: function SegmentedUI2$_view_rowSkin(/*el, old*/) {
                _updateRowSkin.call(this);
            },

            rowTemplate: true,

            scrollingEvents: true,

            sectionHeaderSkin: function SegmentedUI2$_view_sectionHeaderSkin(/*el, old*/) {
                var prop = this._kwebfw_.prop;

                if(prop.data && prop.data.length > 0 && _isSectionDS(prop.data[0])) {
                    _updateSectionHeaderSkin.call(this);
                }
            },

            sectionHeaderTemplate: true,

            selectedRowIndex: function SegmentedUI2$_view_selectedRowIndex(el/*, old*/) {
                var $K = voltmx.$kwebfw$, $KW = $K.widget, _ = this._kwebfw_,
                    prop = _.prop, rowIndex = 0, selectedRow = null;

                if($KW.visible(this) && prop.selectedRowIndex) {
                    rowIndex = prop.selectedRowIndex[1];

                    //_.setFocus is set in voltmxevent.js _setOwnerSelectedIndex.SegmentedUI2 function
                    if(prop.viewType === constants.SEGUI_VIEW_TYPE_PAGEVIEW) {
                        _setPageViewIndicator.call(this, el, rowIndex);
                        if(_.setFocus !== false) this.setFocus(true);
                    } else if(_.setFocus !== false) { //IMP:: Must compare with boolean false
                        if(_shouldLazyLoad.call(this)) {
                            _lazyLoad.SegmentedUI2._renderFromIndex.call(this, prop.selectedRowIndex, el);
                        } else {
                            selectedRow = _getIndexedInfo.call(this, prop.selectedRowIndex, _.clones);
                            selectedRow.setFocus(true); // selectedRow might be null ??

                            if($KW.isFixedHeight(this)) {
                                $KW.scrollElementToParentScroller(selectedRow);
                            }
                        }
                    }
                }
            },

            selectedRowIndices: true,

            selectedRowItems: false,

            selectionBehavior: function SegmentedUI2$_view_selectionBehavior(/*el, old*/) {
                _updateSelectionBehavior.call(this);
            },

            selectionBehaviorConfig: function SegmentedUI2$_view_selectionBehaviorConfig(/*el, old*/) {
                _updateSelectionBehaviorConfig.call(this);
            },

            separatorColor: function SegmentedUI2$_view_separatorColor(/*el, old*/) {
                _updateSeparator.call(this);
            },

            separatorRequired: function SegmentedUI2$_view_separatorRequired(/*el, old*/) {
                _updateSeparator.call(this);
                if(_shouldLazyLoad.call(this)) {
                    _lazyLoad.SegmentedUI2._adjustRowsOnViewUpdate.call(this);
                }
            },

            separatorThickness: function SegmentedUI2$_view_separatorThickness(/*el, old*/) {
                _updateSeparator.call(this);
                if(_shouldLazyLoad.call(this)) {
                    _lazyLoad.SegmentedUI2._adjustRowsOnViewUpdate.call(this);
                }
            },

            showScrollbars: true,

            viewType: function SegmentedUI2$_view_viewType(el, old) {
                var $K = voltmx.$kwebfw$, $KD = $K.dom, prop = this._kwebfw_.prop;

                if(prop.viewType === constants.SEGUI_VIEW_TYPE_PAGEVIEW) {
                    _registerSwipeGesture.call(this, el.scrolee);
                } else {
                    $KD.off(el.scrolee, 'swipe', 'segment');
                }

                if(old !== prop.viewType) {
                    _clearSelectedIndices.call(this);
                    if(prop.viewType === constants.SEGUI_VIEW_TYPE_PAGEVIEW) {
                        _view.SegmentedUI2.data.call(this, el, prop.data);
                    } else {
                        _setTableView.call(this, el);
                    }
                }
            },

            widgetDataMap: true,

            widgetSkin: function SegmentedUI2$_view_widgetSkin(el, old) {
                var $K = voltmx.$kwebfw$, $KD = $K.dom, prop = this._kwebfw_.prop;

                if(old !== '') $KD.removeCls(el.node, old);
                if(prop.widgetSkin !== '') $KD.addCls(el.node, prop.widgetSkin);
            }
        }
    };


    Object.defineProperty(voltmx.ui, 'SegmentedUI2', {configurable:false, enumerable:false, writable:false, value:(function() {
        var $K = voltmx.$kwebfw$;


        /**
         * voltmx.ui.SegmentedUI2 constructor.
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
        var SegmentedUI2 = function SegmentedUI2(bconfig, lconfig, pspconfig) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils, self = this,
                dependentPropertiesValidationMessage = '', prop = null, p = null;

            if(!$KU.is(bconfig, 'object')) bconfig = {};

            if(!bconfig.isPreValidated) {
                prop = {
                    alternateRowSkin: '',
                    bounces: true, //Only for TABLE_VIEW //In doc available, but in SPA code not available
                    containerHeight: '', //In doc not available, but in SPA code available
                    containerHeightReference: '', //In doc not available, but in SPA code available
                    contentOffset: null, //In doc not available, but in SPA code available
                    contentOffsetMeasured: {x: 0, y: 0},
                    data: null,
                    dockSectionHeaders: false,
                    enableScrollBounce: true, //In doc not available, but in SPA code available
                    enableLazyLoad: false, // Temporary prop for lazy loading at segment level
                    needPageIndicator: true,
                    onRowClick: null,
                    onRowDisplay: null,
                    onSwipe: null, //Only for PAGE_VIEW
                    pageOffDotImage: 'blackdot.gif',
                    pageOnDotImage: 'whitedot.gif',
                    retainScrollPositionMode: constants.SEGUI_SCROLL_POSITION_DEFAULT, //In doc not available, but in SPA code available
                    retainSelection: false,
                    rowFocusSkin: 'seg2Focus',
                    rowSkin: 'seg2Normal',
                    rowTemplate: null,
                    scrollingEvents: null,
                    sectionHeaderSkin: '',
                    sectionHeaderTemplate: null,
                    selectedRowIndex: null,
                    selectedRowIndices: null,
                    selectedRowItems: [],
                    selectionBehavior: constants.SEGUI_DEFAULT_BEHAVIOR,
                    selectionBehaviorConfig: null,
                    separatorColor: '00000000',
                    separatorRequired: false,
                    separatorThickness: 1,
                    showScrollbars: true,
                    viewType: constants.SEGUI_VIEW_TYPE_TABLEVIEW,
                    widgetDataMap: {},
                    widgetSkin: ''
                };
            }

            _populateUnderscore.SegmentedUI2.call(this);

            if(!$KU.is(bconfig.id, 'string') || !bconfig.id) {
                bconfig.id = (this._kwebfw_.name + $KU.uid());
            }

            SegmentedUI2.base.call(this, bconfig, lconfig, pspconfig);

            if(!bconfig.isPreValidated) {
                if($KU.is(_dependentPropertiesValidationMessage.SegmentedUI2, 'function')) {
                    dependentPropertiesValidationMessage = _dependentPropertiesValidationMessage.SegmentedUI2.call(this, prop, bconfig, lconfig, pspconfig);
                }
            }

            if(dependentPropertiesValidationMessage) {
                throw new Error(dependentPropertiesValidationMessage);
            } else {
                if(!bconfig.isPreValidated) {
                    //Defaulting to platfom values specific to SegmentedUI2
                    $KU.each(prop, function(value, key) {
                        var $K = voltmx.$kwebfw$, $KU = $K.utils,
                            $KW = $K.widget, valid = false, message = '';

                        if(!Object.prototype.hasOwnProperty.call(bconfig, key)) {
                            bconfig[key] = value;
                        } else if($KW.getNonConstructorProperties(self._kwebfw_.name).indexOf(key) >= 0) {
                            throw new Error('<' + key + '> is a non-constructor property of <' + self._kwebfw_.ns + '> class.');
                        } else if(!$KU.is(_valid.SegmentedUI2[key], 'function')) {
                            throw new Error('<' + key + '> is available in default widget properties of <voltmx.ui.SegmentedUI2>, but not in <_valid.SegmentedUI2> namespace.');
                        } else {
                            valid = _valid.SegmentedUI2[key].call(self, bconfig[key]);
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

                //Defining Getters/Setters specific to SegmentedUI2
                $KU.each(_view.SegmentedUI2, function(value, key) {
                    var $K = voltmx.$kwebfw$, $KU = $K.utils;

                    $KU.defineProperty(self._kwebfw_.prop, key, bconfig[key], {configurable:false, enumerable:true, writable:true});

                    $KU.defineGetter(self, key, function SegmentedUI2$_getter() {
                        var $K = voltmx.$kwebfw$, $KU = $K.utils;

                        if($KU.is(_getter.SegmentedUI2[key], 'function')) {
                            return _getter.SegmentedUI2[key].call(this, this._kwebfw_.prop[key]);
                        }
                        return this._kwebfw_.prop[key];
                    }, true);

                    $KU.defineSetter(self, key, function SegmentedUI2$_setter(val) {
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
                                valid = _valid.SegmentedUI2[key].call(this, val);
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

                                    if($KU.is(_setter.SegmentedUI2[key], 'function')) {
                                        _setter.SegmentedUI2[key].call(this, old);
                                    }

                                    if(_relayoutActiveTriggerer.SegmentedUI2().indexOf(key) >= 0) {
                                        $KW.markRelayout(this);
                                    }

                                    if(_relayoutPassiveTriggerer.SegmentedUI2().indexOf(key) >= 0) {
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
                    if($KU.is(p.selectionBehaviorConfig, undefined)) p.selectionBehaviorConfig = null;
                    if($KU.is(p.rowTemplate, undefined)) p.rowTemplate = null;
                    if($KU.is(p.sectionHeaderTemplate, undefined)) p.sectionHeaderTemplate = null;
                }

                if($KU.is(_postInitialization.SegmentedUI2, 'function')) {
                    _postInitialization.SegmentedUI2.call(this);
                }
            }

            pspconfig = lconfig = bconfig = null; //For GC
        };


        $K.utils.inherits(SegmentedUI2, voltmx.ui.BasicWidget);


        /**
         * Takes care of flushing out the widget reference to clean memory.
         *
         * @access      protected
         * @method      _flush
         * @memberof    voltmx.ui.SegmentedUI2
         * @author      Goutam Sahu <goutam.sahu@voltmx.com>
         *
         * @returns     void
         */
        var segment2__flush = function SegmentedUI2$_flush(config) {
            var $super = voltmx.ui.SegmentedUI2.base.prototype;

            _flushClones.call(this, this._kwebfw_.clones, config);
            $super._flush.call(this);
        };


        /**
         * Builds the view layer for SegmentedUI2 widget.
         *
         * @override
         * @access      protected
         * @method      _render
         * @memberof    voltmx.ui.SegmentedUI2
         * @author      Goutam Sahu <goutam.sahu@voltmx.com>
         *
         * @returns     {HTMLElement} – SegmentedUI2 view.
         */
        var segment2__render = function SegmentedUI2$_render(tag, context) {
            var $super = voltmx.ui.SegmentedUI2.base.prototype, _ = this._kwebfw_,
                $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget, $KD = $K.dom,
                ulTag = '', docker = null, view = _.view, blocker = null,
                scrolee = null, hScroll = null, vScroll = null, el = null,
                pageNav = null, topscrolee = null, bottomscrolee = null;

            if(!$KU.is(context, 'object')) context = {};

            if(this.isVisible || $K.F.RIVW) {
                if(!view) {
                    ulTag = _deduceTagName.call(this);

                    scrolee = $KD.create(ulTag, {kv: 'tableview'});
                    topscrolee = $KD.create('DIV', {kr:'topscrolee'}, {position:'relative', width: '100%', height: '0px', top:'0px'});
                    bottomscrolee = $KD.create('DIV', {kr:'bottomscrolee'}, {position:'relative', width: '100%', height: '0px', top:'0px'});
                    docker = $KD.create('DIV', {kr:'docker'}, {position:'absolute', top:'0px', left:'left', width:'100%'});
                    blocker = $KD.create('DIV', {kr:'blocker'}, {position:'absolute', top:'0px', left:'left', width:'100%', height:'100%'});

                    $KD.add(docker, blocker);

                    if($KU.scrollType() !== 'native') {
                        $KD.setAttr(scrolee, 'kr', 'scrolee');
                        hScroll = $KD.create('DIV', {kr:'h-scroll'});
                        vScroll = $KD.create('DIV', {kr:'v-scroll'});
                    }

                    pageNav = $KD.create('DIV', {align:'center'}, {display:'none', position:'absolute', bottom:'0px', width:'100%'});

                    view = $super._render.call(this, tag, [topscrolee, scrolee, bottomscrolee, docker, pageNav, hScroll, vScroll]);

                    $KD.setAttr(view, 'kwh-keydown', 'onKeyDown');

                    if(ulTag === 'div') {
                        $KD.setAttr(scrolee, 'role', 'table');
                    } else if(ulTag === 'table') {
                        $KD.setAttr(scrolee, 'cellpadding', '0');
                        $KD.setAttr(scrolee, 'cellspacing', '0');
                    }

                    el = $KW.el(view);
                    if(_.prop.viewType === constants.SEGUI_VIEW_TYPE_PAGEVIEW) {
                        _view.SegmentedUI2.viewType.call(this, el, _.prop.viewType);
                    } else {
                        $KW.registerNativeScrollEvent(this);
                        var segmodel = $KW.model(this);
                        $KD.on(el.viewport, 'scroll', 'segment', function() {
                            _onScrollCallback.call(this, segmodel, this.scrollTop);
                        });
                    }
                }

                el = $KW.el(view);

                if($KU.scrollType() !== 'native') {
                    $KD.style(el.node, {overflowX:'hidden', overflowY:'hidden'});
                } else {
                    $KD.style(el.viewport, {overflowX:'auto', overflowY:'auto'});
                    $KD.style(el.node, {overflowX:'hidden'});
                }

                if(_.prop.widgetSkin !== '') $KD.addCls(el.node, _.prop.widgetSkin);

                if(_.prop.viewType !== constants.SEGUI_VIEW_TYPE_PAGEVIEW) {
                    _view.SegmentedUI2.data.call(this, el, _.prop.data);
                    if(_shouldLazyLoad.call(this)) {
                        _lazyLoad.SegmentedUI2._setLoadingPlaceholder.call(this, el);
                    }
                }

                $KW.accessibility(this);
            }

            return view;
        };


        var segment2_addAll = function SegmentedUI2$addAll(data, anim) {
            var prop = this._kwebfw_.prop, secIndex = -1, rowIndex = -1;

            if(!_valid.SegmentedUI2.data.call(this, data)) {
                throw new Error('Invalid data.');
            }
            if(!prop.data) prop.data = [];

            if(prop.data.length === 0
            || (_isSectionDS(prop.data[0]) && _isSectionDS(data[0]))
            || (!_isSectionDS(prop.data[0]) && !_isSectionDS(data[0]))) {
                if(_isSectionDS(data[0])) secIndex = prop.data.length;
                else rowIndex = prop.data.length;

                _onRowChange.call(this, secIndex, rowIndex, 'addall', data, anim);
            } else {
                //Throw Error:: Existing data structure of Segment do not match with that of passed data
                throw new Error('Invalid data.');
            }
        };


        var segment2_addDataAt = function SegmentedUI2$addDataAt(data, rowIndex, secIndex, anim) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils, errorMessage = null;

            if($KU.is(data, 'object')) {
                errorMessage = _validateInputIndices.call(this, secIndex, rowIndex, 'add');

                if(errorMessage === '') {
                    if(!$KU.is(secIndex, 'number')) secIndex = -1;
                    if(!this._kwebfw_.prop.data) this._kwebfw_.prop.data = [];
                    _onRowChange.call(this, secIndex, rowIndex, 'add', data, anim);
                } else {
                    throw new Error(errorMessage);
                }
            } else {
                throw new Error('Invalid data.');
            }
        };


        var segment2_addSectionAt = function SegmentedUI2$addSectionAt(data, index, anim) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils,
                prop = this._kwebfw_.prop, errorMessage = '';

            if($KU.is(data, 'array') && !_isSectionDS(data)) {
                throw new Error('Invalid data.');
            }

            errorMessage = _validateInputIndices.call(this, index, 0, 'addsectionat');

            if(errorMessage === '') {
                if(!prop.data) prop.data = [];

                if(prop.data.length === 0 || _isSectionDS(prop.data[0])) {
                    _onRowChange.call(this, index, -1, 'addsectionat', data, anim);
                } else {
                    throw new Error('Invalid data.');
                }
            } else {
                throw new Error(errorMessage);
            }
        };


        var segment2_animateRows = function SegmentedUI2$animateRows(animContext) {
            _animator.SegmentedUI2.animateRows.call(this, animContext);
        };


        var segment2_clearSearch = function SegmentedUI2$clearSearch() {
            var _ = this._kwebfw_;

            if(_.searcher) {
                _.searcher = null;
                _searcher.SegmentedUI2.clearSearchResult.call(this);
            }
        };


        var segment2_getFirstVisibleRow = function SegmentedUI2$getFirstVisibleRow() {
            return _getVisibleRow.call(this, {firstRow:true, lastRow:false});
        };


        var segment2_getLastVisibleRow = function SegmentedUI2$getLastVisibleRow() {
            return _getVisibleRow.call(this, {firstRow:false, lastRow:true});
        };


        var segment2_getUpdatedSearchResults = function SegmentedUI2$getUpdatedSearchResults() {
            var _ = this._kwebfw_, filteredResult = null;

            if(_.searcher) {
                filteredResult = _searcher.SegmentedUI2.getFilteredData.call(this);
            }

            return filteredResult;
        };


        var segment2_removeAll = function SegmentedUI2$removeAll(anim) {
            if(_animator.SegmentedUI2.canAnimate.call(this, anim)) {
                _animator.SegmentedUI2.onRowDisplayHandler.call(this, voltmx.segment.REMOVE, this._kwebfw_.rows);
                _animator.SegmentedUI2.applyRowsAnimationByAPI.call(this, 'removeall', this._kwebfw_.rows, -1, -1, anim);
            } else {
                _action.SegmentedUI2._removeAll.call(this);
            }
        };


        var segment2_removeAt = function SegmentedUI2$removeAt(rowIndex, secIndex, anim) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils, errorMessage = null;

            errorMessage = _validateInputIndices.call(this, secIndex, rowIndex, 'remove');
            if(errorMessage === '') {
                if(!$KU.is(secIndex, 'number')) secIndex = -1;
                _onRowChange.call(this, secIndex, rowIndex, 'remove', anim);
            } else {
                throw new Error(errorMessage);
            }
        };


        var segment2_removeSectionAt = function SegmentedUI2$removeSectionAt(index, anim) {
            var prop = this._kwebfw_.prop;

            if(prop.data && prop.data.length > 0 && _isSectionDS(prop.data[0])) {
                if(index >= 0 && index < prop.data.length) {
                    _onRowChange.call(this, index, -1, 'removesectionat', prop.data, anim);
                } else {
                    throw new Error('Invalid index passed.');
                }
            } else {
                throw new Error('Invalid input or no data exists.');
            }
        };


        var segment2_searchText = function SegmentedUI2$searchText(searchCondition, config) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils, _ = this._kwebfw_, filteredResult = null;

            if(!$KU.is(searchCondition, 'array')) {
                throw new Error('searchCondition is missing or not an array.');
            } else {
                if($KU.is(config, 'undefined') || !$KU.is(config, 'object')) {
                    config = {updateSegment: true, showSectionHeaderFooter: true};
                } else {
                    if(!$KU.is(config.updateSegment, 'boolean')) {
                        config.updateSegment = true;
                    }

                    if(!$KU.is(config.showSectionHeaderFooter, 'boolean')) {
                        config.showSectionHeaderFooter = true;
                    }
                }

                if(_.searcher) {
                    _searcher.SegmentedUI2.clearSearchResult.call(this);
                }

                _.searcher = {searchCondition: searchCondition, config: config, filteredResult: null, filterResultWithHeader: null};

                filteredResult = _searcher.SegmentedUI2.searchText.call(this);
            }

            return filteredResult;
        };

        var segment2_setActive = function SegmentedUI2$setActive(rowIndex, secIndex, widgetPath) {
            var $K = kony.$kwebfw$, $KU = $K.utils, $KW = $K.widget, $KD = $K.dom,
                $super = kony.ui.SegmentedUI2.base.prototype, dom = null, tpl = null,
                _ = this._kwebfw_, view = _.view, el = $KW.el(this);

            if (arguments.length === 0) {
                $super.setActive.call(this);
            } else {
                rowIndex = _validIndex.call(this, [secIndex, rowIndex], true);

                if (rowIndex === false) {
                    throw new Error('Invalid index passed.');
                } else if (rowIndex[1] === true) {
                    rowIndex = rowIndex[0];
                    secIndex = rowIndex[0];
                    rowIndex = rowIndex[1];

                    if (_shouldLazyLoad.call(this) && $KW.isRendered(this)) {
                        if (_.searcher) {
                            _searcher.SegmentedUI2.updateFilterResult.call(this);
                        }

                        _lazyLoad.SegmentedUI2._renderFromIndex.call(this, [secIndex, rowIndex], el);
                    }

                    if (!widgetPath) {
                        if (view && $KW.interactable(this)) {
                            dom = $KD.find(view, '[kii="' + secIndex + ',' + rowIndex + '"]')[0];
                        }
                    } else {
                        widgetPath = widgetPath.split('.');
                        tpl = _getTemplateByIndex.call(this, [secIndex, rowIndex, ]);

                        if (widgetPath.length > 1) {
                            tpl = $KU.get(widgetPath.slice(1), tpl);
                        } else if (tpl.id !== widgetPath[0]) {
                            tpl = null;
                        }

                        if (tpl && $KW.interactable(tpl)) {
                            dom = $KW.focusableElement(tpl);
                        }
                    }

                    dom && $KD.focus(dom);
                }
            }
        };
        
        var segment2_setAnimations = function SegmentedUI2$setAnimations(animInfo) {
            _animator.SegmentedUI2.setAnimations.call(this, animInfo);
        };


        var segment2_setContentOffset = function segmentedUI2$setContentOffset(offset, animate) {
            var $K = voltmx.$kwebfw$, $KW = $K.widget, _ = this._kwebfw_,
                prop = _.prop, rowIndex = -1, value = {}, view = _.view;
            if(view) {
                if(prop.viewType === constants.SEGUI_VIEW_TYPE_TABLEVIEW) {
                    $KW.setContentOffset(this, offset, animate);
                } else {
                    value = $KW.getContentOffsetValues(this, offset);
                    rowIndex = value.x && parseInt(value.x / _.swipeContext.imageWidth);
                    if(rowIndex < 0) {
                        rowIndex = 0;
                    } else if(rowIndex >= prop.data.length) {
                        rowIndex = prop.data.length - 1;
                    }
                    _setPageViewIndicator.call(this, $KW.el(this), rowIndex);
                }
            }
        };

        var segment2_setData = function SegmentedUI2$setData(data, anim) {
            this.data = data;
            if(_animator.SegmentedUI2.canAnimate.call(this, anim)) {
                _animator.SegmentedUI2.onRowDisplayHandler.call(this, voltmx.segment.UPDATE, this._kwebfw_.rows);
                _animator.SegmentedUI2.applyRowsAnimationByAPI.call(this, 'setdata', this._kwebfw_.rows, -1, -1, anim);
            }
        };


        var segment2_setDataAt = function SegmentedUI2$setDataAt(data, rowIndex, secIndex, anim, arg4) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget, widget = null, key = '',
                _ = this._kwebfw_, prop = _.prop, errorMessage = null, wap = [], widgetId = '',
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
                key = rowIndex;
                rowIndex = anim;
                secIndex = arg4;
                wap = $KW.getWidgetDataMapPath(widget);
                widgetId = this.widgetDataMap[wap];

                if(widgetId) {
                    if(secIndex === -1 && rowIndex !== -1) {
                        if($KU.is(prop.data[rowIndex][widgetId], 'object')) {
                            prop.data[rowIndex][widgetId][key] = widget[key];
                        } else {
                            prop.data[rowIndex][widgetId] = _constructObject(widget, prop.data[rowIndex][widgetId], key);
                        }
                    } else if(secIndex !== -1 && rowIndex === -1) {
                        if($KU.is(prop.data[secIndex][0][widgetId], 'object')) {
                            prop.data[secIndex][0][widgetId][key] = widget[key];
                        } else {
                            prop.data[secIndex][0][widgetId] = _constructObject(widget, prop.data[secIndex][0][widgetId], key);
                        }
                    } else if(secIndex !== -1 && rowIndex !== -1) {
                        if($KU.is(prop.data[secIndex][1][rowIndex][widgetId], 'object')) {
                            prop.data[secIndex][1][rowIndex][widgetId][key] = widget[key];
                        } else {
                            prop.data[secIndex][1][rowIndex][widgetId] = _constructObject(widget, prop.data[secIndex][1][rowIndex][widgetId], key);
                        }
                    }
                }
            } else { //This is actual implementation of setDataAt
                if($KU.is(data, 'object')) {
                    errorMessage = _validateInputIndices.call(this, secIndex, rowIndex, 'update');

                    if(errorMessage === '') {
                        if(!$KU.is(secIndex, 'number')) secIndex = -1;
                        _onRowChange.call(this, secIndex, rowIndex, 'update', data, anim);
                    } else {
                        throw new Error(errorMessage);
                    }
                } else {
                    throw new Error('Invalid data.');
                }
            }
        };


        var segment2_setSectionAt = function SegmentedUI2$setSectionAt(data, index, anim) {
            var prop = this._kwebfw_.prop;

            if(prop.data && prop.data.length > 0 && _isSectionDS(prop.data[0])) {
                if(index >= 0 && index < prop.data.length) {
                    _onRowChange.call(this, index, -1, 'setsectionat', data, anim);
                } else {
                    throw new Error('Invalid index passed.');
                }
            } else {
                throw new Error('Invalid input or no data exists.');
            }
        };


        $K.defVoltmxProp(SegmentedUI2.prototype, [
            {keey:'_flush', value:segment2__flush},
            {keey:'_render', value:segment2__render},
            {keey:'addAll', value:segment2_addAll},
            {keey:'addDataAt', value:segment2_addDataAt},
            {keey:'addSectionAt', value:segment2_addSectionAt},
            {keey:'animateRows', value:segment2_animateRows},
            {keey:'clearSearch', value:segment2_clearSearch},
            {keey:'getFirstVisibleRow', value:segment2_getFirstVisibleRow},
            {keey:'getLastVisibleRow', value:segment2_getLastVisibleRow},
            {keey:'getUpdatedSearchResults', value:segment2_getUpdatedSearchResults},
            {keey:'removeAll', value:segment2_removeAll},
            {keey:'removeAt', value:segment2_removeAt},
            {keey:'removeSectionAt', value:segment2_removeSectionAt},
            {keey:'searchText', value:segment2_searchText},
            {keey:'setActive', value: segment2_setActive},
            {keey:'setAnimations', value:segment2_setAnimations},
            {keey:'setContentOffset', value:segment2_setContentOffset},
            {keey:'setData', value:segment2_setData},
            {keey:'setDataAt', value:segment2_setDataAt},
            {keey:'setSectionAt', value:segment2_setSectionAt}
        ]);


        return SegmentedUI2;
    }())});
}());
