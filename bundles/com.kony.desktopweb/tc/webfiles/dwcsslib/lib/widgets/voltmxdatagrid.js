(function() {
    var $K = voltmx.$kwebfw$;

    $K.defVoltmxProp($K.ui, [
        {keey:'DataGrid', value:{}, items:[
            {keey:'onCellKeyDown', value:function(evt) {
                var $K = voltmx.$kwebfw$, $KD = $K.dom, $KW = $K.widget, tr = null,
                    td = null, code = evt.keyCode || evt.which, el = $KW.el(this),
                    index = -1, nextFocusRow = function(tr, code) {
                        var rowIndex = $KD.index(tr);

                        if(code === 38) {
                            if(el.dockedheader && rowIndex === 1) {
                                tr = el.dockedheader;
                            } else {
                                tr = $KD.prev(tr);
                            }
                        } else if(code === 40) {
                            if(el.dockedheader && rowIndex === 0) {
                                tr = $KD.childAt(el.table, 1);
                            } else {
                                tr = $KD.next(tr);
                            }
                        }
                        return tr;
                    };

                if([37, 38, 39, 40].indexOf(code) >= 0) {
                    if(code === 37) { //Left Arrow
                        td = $KD.prev(evt.target);
                    } else if(code === 38) { //Up Arrow
                        index = $KD.index(evt.target);
                        tr = nextFocusRow.call(this, $KD.parent(evt.target), code);
                        td = (tr) ? $KD.childAt(tr, index) : null;
                    } else if(code === 39) { //Right Arrow
                        td = $KD.next(evt.target);
                    } else if(code === 40) { //Down Arrow
                        index = $KD.index(evt.target);
                        tr = nextFocusRow.call(this, $KD.parent(evt.target), code);
                        td = (tr) ? $KD.childAt(tr, index) : null;
                    }

                    if(td) {
                        $KD.preventDefault(evt);
                        $KD.focus(td);
                    }
                }

                return false;
            }},

            {keey:'onCellKeyUp', value:function(evt) {
                var $K = voltmx.$kwebfw$, $KD = $K.dom, $KW = $K.widget,
                    $KU = $K.utils, cell = $KD.closest(evt.target, 'kr', 'item'),
                    cellIndex = null, code = evt.keyCode || evt.which, parent = null;
                if([13, 32].indexOf(code) >= 0) {
                    $KD.preventDefault(evt);
                    if(cell) {
                        cellIndex = $KD.index(cell);
                        parent = $KD.parent(cell);
                        if($KD.getAttr(parent, 'kr') === 'header') {
                            if($KU.is(cellIndex, 'integer')
                            && $KU.is(this.columnHeadersConfig[cellIndex].columnOnClick, 'function')) {
                                $KW.fire(this, 'columnOnClick', this, {cellIndex:cellIndex});
                            }
                        } else if($KD.getAttr(parent, 'kr') === 'row') {
                            $KW.fire(this, 'onRowSelected', this);
                        }
                    }
                }
                return false;
            }},

            {keey:'onColumnClick', value:function(evt) {
                var $K = voltmx.$kwebfw$, $KD = $K.dom, $KW = $K.widget,
                    $KU = $K.utils, cell = $KD.closest(evt.target, 'kr', 'item'),
                    cellIndex = null, parent = null;

                if(cell) {
                    cellIndex = $KD.index(cell);
                    parent = $KD.parent(cell);
                    if($KD.getAttr(parent, 'kr') === 'header' && $KU.is(cellIndex, 'integer')
                    && $KU.is(this.columnHeadersConfig[cellIndex].columnOnClick, 'function')) {
                        $KW.fire(this, 'columnOnClick', this, {cellIndex:cellIndex});
                    }
                }

                return false;
            }},

            {keey:'onKeyDown', value:function(evt) {
                var $K = voltmx.$kwebfw$, $KD = $K.dom, $KW = $K.widget,
                    prop = this._kwebfw_.prop, el = $KW.el(this), code = evt.keyCode || evt.which,
                    focusElement = null;

                if(prop.showColumnHeaders) {
                    if(prop.dockingHeader) {
                        focusElement = $KD.childAt(el.dockedheader, 0);
                    } else {
                        focusElement = $KD.childAt(el.header, 0);
                    }
                } else {
                    focusElement = $KD.childAt($KD.next(el.header), 0);
                }

                if([40].indexOf(code) >= 0) {
                    $KD.preventDefault(evt);

                    if(code === 40 && focusElement) { //Down Arrow
                        $KD.focus(focusElement);
                    }
                }

                return false;
            }},

            {keey:'onRowSelect', value:function(evt) {
                var $K = voltmx.$kwebfw$, $KD = $K.dom, $KW = $K.widget,
                    target = $KD.closest(evt.target, 'kr', 'row');

                if(target) {
                    $KW.fire(this, 'onRowSelected', this);
                }

                return false;
            }},

            {keey:'performSelection', value:function(target) {
                var $K = voltmx.$kwebfw$, $KD = $K.dom, _ = this._kwebfw_,
                    cellIndex = null, prop = _.prop, rowIndex = null, parent = null;

                target = $KD.closest(target, 'tag', 'DIV');
                parent = target ? $KD.closest(target, 'kr', 'row') : null;

                if(target && parent) {
                    cellIndex = $KD.index(target);
                    rowIndex = $KD.index(parent);
                    rowIndex = _deduceRowIndexGivenDomIndex.call(this, rowIndex);
                    _.selectedCellPos = [rowIndex, cellIndex];
                    if(prop.isMultiSelect) {
                        if(_.selectedIndices.indexOf(rowIndex) >= 0) {
                            _.selectedItems.splice(_.selectedIndices.indexOf(rowIndex), 1);
                            _.selectedIndices.splice(_.selectedIndices.indexOf(rowIndex), 1);
                        } else {
                            _.selectedIndices.push(rowIndex);
                            _.selectedItems.push(prop.data[rowIndex]);
                        }
                    } else {
                        _.selectedIndices = [rowIndex];
                        _.selectedItems = [prop.data[rowIndex]];
                    }

                    _setSelectedRowRelatedProperties.call(this);
                    _applyRowsSkin.call(this);
                }
                return false;
            }}
        ]}
    ]);


    //All the functions will be called in the scope of widget instance
    //DataGrid APIs actions - add, update and remove will be called
    var _action = {
        DataGrid : {
            _removeAll: function DataGrid$_action_removeAll() {
                var _ = this._kwebfw_, prop = _.prop;

                prop.data = [];
                prop.rowCount = 0;
                _flushClones(_.clones[1]);
                _.clones[1] = [];
                _.rows = [];
                _.selectedIndices = [];
                _.selectedItems = [];
                _removeAllRows.call(this);
                _setSelectedRowRelatedProperties.call(this);
            },

            addAll: function DataGrid$_action_addAll(rowindex, data) {
                var $K = voltmx.$kwebfw$, $KD = $K.dom, $KU = $K.utils, $KW = $K.widget,
                    _ = this._kwebfw_, prop = _.prop, el = $KW.el(this);


                _generateClones.call(this, data);
                $KU.each(data, function(row) {
                    var $K = voltmx.$kwebfw$, $KU = $K.utils, $KD = $K.dom;

                    if($KU.is(row, 'object')) {
                        prop.data.push(row);
                        el.table && $KD.add(el.table, _createRow.call(this, row, prop.rowCount, null, _.clones[1][prop.rowCount]));
                        _.rows.push(_.clones[1][prop.rowCount]);
                        prop.rowCount += 1;
                    } else {
                        throw new Error('Invalid row data');
                    }
                }, this);
                $KD.setAttr(el.table, 'aria-rowcount', prop.rowCount);
            },

            addDataAt: function DataGrid$_action_addDataAt(index, data) {
                var $K = voltmx.$kwebfw$, $KD = $K.dom, $KW = $K.widget,
                    _ = this._kwebfw_, prop = _.prop, el = $KW.el(this),
                    pos = 0, row = null;

                if(index === prop.data.length) {
                    prop.data.push(data);
                    row = _generateClones.call(this, [data], index);
                    el.table && $KD.add(el.table, _createRow.call(this, data, prop.rowCount, null, row[0]));
                    _.rows.push(_.clones[1][prop.rowCount]);
                } else {
                    prop.data.splice(index, 0, data);
                    _.clones[1].splice(index, 0, []);
                    row = _generateClones.call(this, [data], index);
                    for(pos = 0;pos< _.selectedIndices.length;pos++) {
                        if(_.selectedIndices[pos] >= index) {
                            _.selectedIndices[pos] = _.selectedIndices[pos] + 1;
                        }
                    }
                    if(_.selectedCellPos[0] >= index) {
                        _.selectedCellPos[0] += 1;
                    }
                    _.rows.splice(index, 0, _.clones[1][index]);
                    _setSelectedRowRelatedProperties.call(this);
                    el.table && $KD.addAt(el.table, _createRow.call(this, data, index, null, row[0]), _deduceRowIndexGivenModelIndex.call(this, index));
                    _updateDomIndex.call(this);
                }
                prop.rowCount += 1;
                $KD.setAttr(el.table, 'aria-rowcount', prop.rowCount);
            },

            removeAt: function DataGrid$_action_removeAt(index) {
                var $K = voltmx.$kwebfw$, $KW = $K.widget, $KD = $K.dom,
                    el = $KW.el(this), _ = this._kwebfw_, pos = 0, prop = _.prop,
                    updatedIndex = null;

                prop.data.splice(index, 1);
                prop.rowCount -= 1;
                _flushClones(_.clones[1][index]);
                _.clones[1].splice(index, 1);
                _.rows.splice(index, 1);

                if(_.selectedIndices.indexOf(index) >= 0) {
                    updatedIndex = prop.selectedIndices.indexOf(index);
                    _.selectedIndices.splice(updatedIndex, 1);
                    _.selectedItems.splice(updatedIndex, 1);
                }
                for(pos= 0; pos<_.selectedIndices.length; pos++) {
                    if(_.selectedIndices[pos] >= index) {
                        _.selectedIndices[pos] = _.selectedIndices[pos] - 1;
                    }
                }
                if(_.selectedCellPos[0] > index) {
                    _.selectedCellPos[0] -= 1;
                } else if(_.selectedCellPos[0] === index) {
                    _.selectedCellPos = [];
                }
                el.table && $KD.removeAt(el.table, _deduceRowIndexGivenModelIndex.call(this, index));
                _setSelectedRowRelatedProperties.call(this);
                _updateDomIndex.call(this);
                $KD.setAttr(el.table, 'aria-rowcount', prop.rowCount);
            },

            update: function DataGrid$_action_update(index, data) {
                var $K = voltmx.$kwebfw$, $KD = $K.dom, $KW = $K.widget, row = null,
                    _ = this._kwebfw_, el = $KW.el(this), prop = _.prop, tr = null;

                prop.data[index] = data;
                if(_.selectedIndices.indexOf(index) >= 0) {
                    _.selectedItems.splice(prop.selectedIndices.indexOf(index), 1);
                    _.selectedIndices.splice(prop.selectedIndices.indexOf(index), 1);
                    if(_.selectedCellPos[0] === index) {
                        _.selectedCellPos = [];
                    }
                }

                _flushClones(_.clones[1][index]);
                _.clones[1][index] = [];
                row = _generateClones.call(this, [data], index);
                if(el.table) {
                    tr = $KD.childAt(el.table, _deduceRowIndexGivenModelIndex.call(this, index));
                    tr && $KD.html(tr, '');
                    _createRow.call(this, data, index, tr, row[0]);
                    _.rows.splice(index, 1, _.clones[1][index]);
                }
                _setSelectedRowRelatedProperties.call(this);
            }
        }
    };


    //This function will be called in the scope of widget instance
    var _applyHeaderSkin = function DataGrid$_applyHeaderSkin() {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget, $KD = $K.dom,
            _ = this._kwebfw_, prop = _.prop, el = $KW.el(this),
            _applySkinToHeaderRows = function(el) {
                $KU.each($KD.children(el), function(item, index) {
                    $KD.setAttr(item, 'class', prop.headerSkin);
                    _setContentAlignment.call(this, item, prop.columnHeadersConfig[index]);
                }, this);
            };

        if(el.header) {
            _applySkinToHeaderRows.call(this, el.header);
            if(prop.dockingHeader && el.dockedheader) {
                _applySkinToHeaderRows.call(this, el.dockedheader);
            }
        }
    };


    //This function will be called in the scope of widget instance
    var _applyHeightinPercent = function DataGrid$_applyHeightinPercent(config, cell, tr, isColumn, docker) {
        var $K = voltmx.$kwebfw$, $KD = $K.dom, tplheight = '', template = null, rowheight = null;

        if((config.columnType !== 'template' && !isColumn)
        || (config.columnHeaderType !== 'template' && isColumn)) {
            return;
        }

        template = $KD.first(cell);
        tplheight = template.style.height;
        rowheight = tr.style.height;
        if(tplheight && tplheight.substring(tplheight.length - 1) === '%') {
            if(rowheight) {
                if(parseFloat(rowheight) < parseFloat(tplheight)) {
                    if(isColumn && docker) {
                        $KD.style(docker, 'height', tplheight);
                        $KD.style(tr, 'height', '100%');
                    } else {
                        $KD.style(tr, 'height', tplheight);
                    }
                }
            } else {
                if(isColumn && docker) {
                    $KD.style(docker, 'height', tplheight);
                    $KD.style(tr, 'height', '100%');
                } else {
                    $KD.style(tr, 'height', tplheight);
                }
            }
            $KD.style(cell, 'height', '100%');
            $KD.style(template, 'height', '100%');
        }
    };


    //This function will be called in the scope of widget instance
    var _applyRowsSkin = function DataGrid$_applyRowsSkin() {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget, $KD = $K.dom,
            _ = this._kwebfw_, prop = _.prop, el = $KW.el(this);

        if(el.table) {
            $KU.each($KD.children(el.table), function(tr, index) {
                if(index > 0) {
                    if((index % 2) !== 0) {
                        tr.className = prop.rowNormalSkin;
                    } else {
                        tr.className = prop.rowAlternateSkin;
                    }

                    if(prop.rowFocusSkin && prop.selectedIndices
                    && prop.selectedIndices.indexOf(_deduceRowIndexGivenDomIndex.call(this, index)) >= 0) {
                        tr.className = prop.rowFocusSkin;
                    }
                }
            }, this);
        }
    };


    //This function will be called in the scope of widget instance
    var _clearSelectedIndices = function DataGrid$_clearSelectedIndices() {
        var _ = this._kwebfw_;

        _.selectedIndices = [];
        _.selectedItems = [];
        _.selectedCellItems = [];
        _.selectedCellPos = [];
        _setSelectedRowRelatedProperties.call(this);
    };


    //This function will be called in the scope of widget instance
    var _removeAllRows = function DataGrid$_removeAllRows() {
        var $K = voltmx.$kwebfw$, $KD = $K.dom, $KW = $K.widget,
            $KU = $K.utils, prop = this._kwebfw_.prop, el = $KW.el(this), index = null;

        if(el.table) {
            $KU.each($KD.find(el.table, 'LI'), function(item) {
                index = $KD.index(item);
                if(index > 0) {
                    $KD.remove(item);
                }
            });
            $KD.setAttr(el.table, 'aria-rowcount', prop.rowCount + 1);
        }
    };


    //This function will be called in the scope of widget instance
    var _createColumnHeaderCell = function DataGrid$_createColumnHeaderCell(config, index) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KD = $K.dom, $KW = $K.widget,
            ariaindex = index + 1, tpl = null, th = $KD.create('DIV',
                {kr:'item', tabindex:-1}, {width:(config.columnWidthInPercentage + '%')});

        // Creation of empty div for column UI resizable feature
        var div = $KD.create('DIV', {}, {
            top: '0px',
            right: '0px',
            width: '1px',
            position: 'absolute',
            cursor: 'col-resize',
            userSelect: 'none',
            height: '100%'
        });

        $KD.setAttr(th, 'kwh-click', 'onColumnClick');
        $KD.setAttr(th, 'kwh-keydown', 'onCellKeyDown');
        $KD.setAttr(th, 'kwh-keyup', 'onCellKeyUp');
        $KD.setAttr(th, 'aria-colindex', ariaindex);
        index = [-1, index];
        $KD.setAttr(th, 'kii', index.join(','));

        if($KU.is(config.columnHeaderTemplate, 'string')
        || $KU.is(config.columnHeaderTemplate, 'object')) {
            tpl = _getClonedTemplateCell.call(this, config, config.columnHeaderTemplate.data, index, true);
            tpl = tpl._render();
            $KW.iterate(tpl, function(widget) {
                var $K = voltmx.$kwebfw$, $KD = $K.dom,
                    view = widget._kwebfw_.view;

                if(view) {
                    $KD.setAttr(view, 'aria-colindex', ariaindex);
                }
            }, {tabs:false});
            $KD.style(tpl, {position: 'relative'});
            $KD.add(th, tpl);
            $KD.add(th, div);
        } else if($KU.is(config.columnHeaderText, 'string')) {
            if(config.columnHeaderText.toLowerCase().indexOf('voltmx.i18n.getlocalizedstring') !== -1) {
                $KD.text(th, $KU.getI18Nvalue(config.columnHeaderText));
            } else {
                $KD.text(th, config.columnHeaderText);
            }
            $KD.add(th, div);
        }
        _setContentAlignment.call(this, th, config);
        return th;
    };


    //This function will be called in the scope of widget instance
    var _createRow = function DataGrid$_createRow(data, rowIndex, tr, row) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KD = $K.dom,
            _ = this._kwebfw_, prop = _.prop, td = null;

        tr = tr || $KD.create('LI', {kr:'row', tabindex:-1});

        //Don't delete this line. $KD.setAttr(tr, 'kwh-keydown', 'onRowKeyDown');
        $KD.setAttr(tr, 'aria-rowindex', rowIndex + 1);
        $KD.setAttr(tr, 'aria-colcount', _getColumnCount.call(this));

        $KU.each(prop.columnHeadersConfig, function(config, index) {
            td = _createRowCell.call(this, config, data, [rowIndex, index], row[index]);
            _applyHeightinPercent.call(this, config, td, tr);
            $KD.add(tr, td);
        }, this);

        return tr;
    };


    //This function will be called in the scope of widget instance
    var _createRowCell = function DataGrid$_createRowCell(config, data, index, clone) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KD = $K.dom, $KW = $K.widget,
            image = null, tpl = null,
            td = $KD.create('DIV', {
                kr:'item', tabindex:-1
            }, {
                width:(config.columnWidthInPercentage+'%')
            });

        $KD.setAttr(td, 'kwh-keydown', 'onCellKeyDown');
        $KD.setAttr(td, 'kwh-keyup', 'onCellKeyUp');
        $KD.setAttr(td, 'kwh-click', 'onRowSelect');
        $KD.setAttr(td, 'aria-colindex', index[1] + 1);
        $KD.setAttr(td, 'aria-rowindex', index[0] + 1);
        $KD.setAttr(td, 'kii', index.join(','));
        if(config.columnType === constants.DATAGRID_COLUMN_TYPE_TEXT) {
            if($KU.is(data[config.columnID], 'string')
            || $KU.is(data[config.columnID], 'number')
            || $KU.is(data[config.columnID], 'boolean')) {
                if($KU.is(data[config.columnID], 'string')
                && data[config.columnID].toLowerCase().indexOf('voltmx.i18n.getlocalizedstring') !== -1) {
                    $KD.text(td, $KU.getI18Nvalue(data[config.columnID]));
                } else {
                    $KD.text(td, data[config.columnID]);
                }
            }
        } else if(config.columnType === constants.DATAGRID_COLUMN_TYPE_IMAGE) {
            if($KU.is(data[config.columnID], 'string') && data[config.columnID]) {
                image = $KD.create('IMG', {
                    tabindex:-1, loading:'lazy',
                    src:$KU.getImageURL(data[config.columnID])
                });
                $KD.on(image, 'mousedown', 'image', function(e) {
                    $KD.preventDefault(e);
                });
                $KD.add(td, image);
            }
        } else if(config.columnType === constants.DATAGRID_COLUMN_TYPE_TEMPLATE
        && $KU.is(clone, 'widget', 'FlexContainer')) {
            tpl = clone._render();
            $KW.iterate(tpl, function(widget) {
                var $K = voltmx.$kwebfw$, $KD = $K.dom,
                    view = widget._kwebfw_.view;

                if(view) {
                    $KD.setAttr(view, 'aria-colindex', index[1] + 1);
                    $KD.setAttr(view, 'aria-rowindex', index[0] + 1);
                }
            }, {tabs:false});
            $KD.style(tpl, {position: 'relative'});
            $KD.add(td, tpl);
        }
        _setContentAlignment.call(this, td, config);
        return td;
    };


    //All widget file must have this variable
    //All the functions will be called in the scope of widget instance
    var _dependentPropertiesValidationMessage = {};


    //All the functions will be called in the scope of widget instance
    var _deduceRowIndexGivenDomIndex = function DataGrid$_deduceActualRowIndex(index) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils;

        if($KU.is(index, 'number') && index >= 0) {
            index = index - 1;
        }
        return index;
    };


    //All the functions will be called in the scope of widget instance
    var _deduceRowIndexGivenModelIndex = function DataGrid$_deduceRowIndexGivenModelIndex(index) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils;

        if($KU.is(index, 'number') && index >= 0) {
            index = index + 1;
        }
        return index;
    };


    //All the functions will be called in the scope of widget instance
    var _dockColumnHeader = function DataGrid$_dockColumnHeader(docker) {
        var $K = voltmx.$kwebfw$, $KD = $K.dom, $KW = $K.widget,
            $KU = $K.utils, prop = this._kwebfw_.prop, dockheader = null;

        if(prop.dockingHeader && docker) {
            dockheader = $KD.first(docker);
            $KU.each(prop.columnHeadersConfig, function(config, columnIndex) {
                var $K = voltmx.$kwebfw$, $KD = $K.dom, dockth = null;

                dockth = _createColumnHeaderCell.call(this, config, columnIndex);
                _applyHeightinPercent.call(this, config, dockth, dockheader, true, docker);
                $KD.add(dockheader, dockth);
            }, this);
            $KD.removeAttr(docker, 'hidden');
            $KW.registerNativeScrollEvent(this);
        }
    };


    //This function will be called in the scope of widget instance
    var _enableScrollBar = function DataGrid$_enableScrollBar(el) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KD = $K.dom,
            hScroll = null, vScroll = null;

        if(this.enableScrollBar === constants.DATAGRID_SCROLLBAR_VERTICAL) {
            if($KU.scrollType() === 'native') {
                $KD.style(el.node, {overflowX:'hidden', overflowY:'auto'});
            } else {
                $KD.setAttr(el.node, 'kr', 'scrolee');
                hScroll = $KD.create('DIV', {kr:'h-scroll'});
                vScroll = $KD.create('DIV', {kr:'v-scroll'});
                $KD.add(el.node, hScroll); $KD.add(el.node, vScroll);
            }
        } else if($KU.scrollType() === 'native') {
            $KD.style(el.node, {overflowX:'hidden', overflowY:'hidden'});
        }
    };


    //All the functions will be called in the scope of widget instance
    var _executeOnRow = function DataGrid$_executeOnRow(index, config, data, isColumn, callback, args) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget, tpl = null,
            columnIndex = index[1], widgetDataMap = {}, rowIndex = index[0];

        if(columnIndex === -1 && rowIndex === -1) return;

        if($KU.is(callback, 'function')) {
            if(!$KU.is(args, 'array')) args = [];

            if(isColumn) {
                tpl = config.columnHeaderTemplate.template;
                if(!$KU.is(this._kwebfw_.clones[0][columnIndex], 'undefined')) {
                    this._kwebfw_.clones[0][columnIndex] = null;
                }
            } else {
                tpl = config.columnDataTemplate;

                if($KU.is(this._kwebfw_.clones[1][rowIndex], 'undefined')) {
                    this._kwebfw_.clones[1][rowIndex] = [];
                }

                if($KU.is(this._kwebfw_.clones[1][rowIndex], 'array')
                && !$KU.is(this._kwebfw_.clones[1][rowIndex][columnIndex], 'undefined')) {
                    this._kwebfw_.clones[1][rowIndex][columnIndex] = null;
                }
            }

            tpl = $KW.getTemplate(this, tpl);
            $KU.each(tpl, function(value, keey) {
                if($KU.is(value, 'widget')) {
                    widgetDataMap[keey] = keey;
                }
            });

            args.splice(0, 0, index);
            args.splice(2, 0, tpl);
            if(isColumn) {
                args.splice(1, 0, data);
                args.splice(3, 0, this._kwebfw_.clones[0][columnIndex]);
            } else {
                if(data[config.columnID] === undefined) {
                    data[config.columnID] = {};
                }
                args.splice(1, 0, data[config.columnID]);
                args.splice(3, 0, this._kwebfw_.clones[1][rowIndex][columnIndex]);
            }
            args.splice(4, 0, widgetDataMap);

            callback.apply(this, args);
        }
    };


    //All the functions will be called in the scope of widget instance
    var _flushClones = function DataGrid$_flushClones(clones, config) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils;

        if(config) {
            config.iterate = true;
        } else {
            config = {iterate : true};
        }

        if($KU.is(clones, 'widget')) clones = [clones];

        if($KU.is(clones, 'array')) {
            $KU.each(clones, function(rows) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils;

                if($KU.is(rows, 'array')) {
                    $KU.each(rows, function(cell) {
                        var $K = voltmx.$kwebfw$, $KU = $K.utils;
                        if($KU.is(cell, 'widget')) {
                            cell._flush(config);
                        }
                    });
                } else if($KU.is(rows, 'widget')) {
                    rows._flush(config);
                }
            }, this);
        }
    };


    //All the functions will be called in the scope of widget instance
    var _getColumnCount = function DataGrid$_getColumnCount() {
        var _ = this._kwebfw_, prop = _.prop;

        if(prop.columnHeadersConfig && prop.columnHeadersConfig.length >= 0) {
            return prop.columnHeadersConfig.length;
        }
    };


    //This function will be called in the scope of widget instance
    var _getColumnIndexById = function DataGrid$_getColumnIndexById(id) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, index = -1,
            _ = this._kwebfw_, prop = _.prop;

        $KU.each(prop.columnHeadersConfig, function(config, count) {
            if(config.columnID === id) {
                index = count;
                return true;
            }
        }, this);

        return index;
    };


    //This function will be called in the scope of widget instance
    var _getColumnIdByIndex = function DataGrid$_getcolumnIdByIndex(index) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, colId = null,
            _ = this._kwebfw_, prop = _.prop;

        $KU.each(prop.columnHeadersConfig, function(config, count) {
            if(count === index) {
                colId = config.columnID;
                return true;
            }
        }, this);

        return colId;
    };


    //All the functions will be called in the scope of widget instance
    var _getClonedTemplate = function DataGrid$_getClonedTemplate(config, data, index, isColumn) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget, template = null;

        _executeOnRow.call(this, index, config, data, isColumn, function(index, data, tpl, clone, widgetDataMap) {
            var self = this, columnIndex = index[1], rowIndex = index[0];

            if($KU.is(clone, 'widget')) {
                template = clone;
            } else {
                template = $KW.cloneTemplate(tpl, data, widgetDataMap, function(model) {
                    model._kwebfw_.ii = index.join(',');
                    _updateSpecialProperties(self, model, index);
                });
            }

            if(rowIndex === -1) { // only columns
                this._kwebfw_.clones[0][columnIndex] = template;
            } else {
                this._kwebfw_.clones[1][rowIndex][columnIndex] = template;
            }
        });

        return template;
    };


    //All the functions will be called in the scope of widget instance
    var _generateClones = function DataGrid$_generateClones(data, startIndex/*, endIndex*/) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, _ = this._kwebfw_,
            prop = _.prop, rowIndex = prop.data.length, clones = [];

        if(startIndex >= 0) {
            rowIndex = startIndex; //if wanted to generate clones for specific set rows
        }

        $KU.each(data, function(/*data*/) {
            $KU.each(prop.columnHeadersConfig, function(config, colIndex) {
                if(config.columnType !== constants.DATAGRID_COLUMN_TYPE_TEMPLATE) {
                    if($KU.is(_.clones[1][rowIndex], 'undefined')) {
                        _.clones[1][rowIndex] = [];
                    }
                    _.clones[1][rowIndex][colIndex] = null;
                }
            }, this);
            clones.push(_.clones[1][rowIndex]);
            rowIndex +=1;
        }, this);

        return clones;
    };


    //All the functions will be called in the scope of widget instance
    var _onRowChange = function DataGrid$_onRowChange(rowIndex, action, data) {
        var $K = voltmx.$kwebfw$, $KW = $K.widget, el = $KW.el(this);

        _action.DataGrid[action].call(this, rowIndex, data);
        _applyRowsSkin.call(this);
        _view.DataGrid.gridlineColor.call(this, el);
    };


    //All the functions will be called in the scope of widget instance
    var _getClonedTemplateCell = function DataGrid$_getClonedTemplateCell(config, data, index, isColumn) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, clone = null;

        if(isColumn) {
            if(config.columnHeaderTemplate.data
            && $KU.is(config.columnHeaderTemplate.data, 'object')
            && config.columnHeaderTemplate.template
            && ($KU.is(config.columnHeaderTemplate.template, 'widget', 'FlexContainer')
            || $KU.is(config.columnHeaderTemplate.template, 'string'))) {
                clone = _getClonedTemplate.call(this, config, data, index, isColumn);
            }
        } else {
            if(data && $KU.is(data, 'object')
            && config.columnDataTemplate
            && ($KU.is(config.columnDataTemplate, 'widget', 'FlexContainer')
            || $KU.is(config.columnDataTemplate, 'string'))) {
                clone = _getClonedTemplate.call(this, config, data, index);
            }
        }
        return clone;
    };


    var _getter = {
        DataGrid: {
            columnHeadersConfig:  function DataGrid$_getter_columnHeadersConfig(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, config = [];

                $KU.each(value, function(v) {
                    var $K = voltmx.$kwebfw$, $KU = $K.utils, item = {};

                    if($KU.is(v.columnHeaderText, 'string')
                    && v.columnHeaderText.toLowerCase().indexOf('voltmx.i18n.getlocalizedstring') !== -1) {
                        item = $KU.getI18Nvalue(v);
                    } else {
                        item = v;
                    }

                    config.push(item);
                });

                return config;
            },

            data: function DataGrid$_getter_data(/*value*/) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils,
                    _ = this._kwebfw_, prop = _.prop, data = [];

                if(!prop.data) {
                    data = prop.data;
                } else {
                    $KU.each(prop.data, function(val) {
                        var $K = voltmx.$kwebfw$, $KU = $K.utils, item = {};

                        $KU.each(val, function(v, k) {
                            var $K = voltmx.$kwebfw$, $KU = $K.utils;

                            if($KU.is(v, 'string')
                            && v.toLowerCase().indexOf('voltmx.i18n.getlocalizedstring') !== -1) {
                                item[k] = $KU.getI18Nvalue(v);
                            } else {
                                item[k] = v;
                            }
                        });
                        data.push(item);
                    });
                }

                return data;
            }
        }
    };


    //All widget file must have this variable
    //This functions will be called in the scope of widget instance
    var _populateUnderscore = {
        DataGrid: function DataGrid$_populateUnderscore() {
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
                    $KU.defineProperty(_, 'ns', 'voltmx.ui.DataGrid', null);
                }
            }
            if(!_.name) {
                if($KU.is(this.__$kwebfw$name__, 'string') && this.__$kwebfw$name__) {
                    $KU.defineProperty(_, 'name', this.__$kwebfw$name__, null);
                } else {
                    $KU.defineProperty(_, 'name', 'DataGrid', null);
                }
            }

            if(!_.ui) $KU.defineProperty(_, 'ui', {}, null);
            if(!_.templates) $KU.defineProperty(_, 'templates', {}, null);
            //This holds the cloned templates, those will be rendered, and it is a flat list
            if(!_.rows) $KU.defineProperty(_, 'rows', [], true);
            //This holds the cloned templates, in the same DS as that of this.data
            if(!_.clones) $KU.defineProperty(_, 'clones', [[], []], true);
            if(!_.selectedIndices) $KU.defineProperty(_, 'selectedIndices', []);
            if(!_.selectedItems) $KU.defineProperty(_, 'selectedItems', []);
            if(!_.selectedCellIndex) $KU.defineProperty(_, 'selectedCellPos', []);
            $KU.defineProperty(_.ui, 'scroll', {x:0, y:0, width:-1, height:-1, minX:-1, maxX:-1, minY:-1, maxY:-1, status:'ended'}, true);
            if(typeof _.tabIndex !== 'number') {
                $KU.defineProperty(_, 'tabIndex', 0, true);
            }
        }
    };


    //All widget file must have this variable
    //This function will be called in the scope of widget instance
    var _postInitialization = {};


    //All widget file must have this variable
    //This functions will be called in the scope of widget instance
    var _relayoutActiveTriggerer = {
        DataGrid: function DataGrid$_relayoutActiveTriggerer() {
            return ['data'];
        }
    };


    //All widget file must have this variable
    //This functions will be called in the scope of widget instance
    var _relayoutPassiveTriggerer = {
        DataGrid: function DataGrid$_relayoutPassiveTriggerer() {
            return [];
        }
    };


    //This function will be called in the scope of widget instance
    var _setContentAlignment = function DataGrid$_setContentAlignment(el, config) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KD = $K.dom;

        if($KU.is(config.columnContentAlignment, 'string')) {
            $KD.addCls(el, '-voltmx-ca-' + config.columnContentAlignment);
        }
    };


    //This function will be called in the scope of widget instance
    var _setSelectedRowRelatedProperties = function DataGrid$_setSelectedRowRelatedProperties() {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, _ = this._kwebfw_,
            prop = _.prop, selectedIndices = _.selectedIndices, updatedIndex = null,
            cellId = null, indicesLength = selectedIndices.length;

        if(prop.data && prop.data.length > 0) {
            if(indicesLength > 0) {
                prop.selectedIndex = selectedIndices[indicesLength - 1];
                prop.selectedItem = _.selectedItems[indicesLength - 1];
                if(prop.isMultiSelect) {
                    prop.selectedIndices = selectedIndices;
                    prop.selectedItems = _.selectedItems;
                    if(prop.selectedIndex === selectedIndices[indicesLength -1]) {
                        updatedIndex = prop.selectedIndices[indicesLength - 1];
                        prop.selectedIndex = (updatedIndex >= 0) ? updatedIndex : null;
                        prop.selectedItem = prop.data[updatedIndex] ? prop.data[updatedIndex] : null;
                    }
                } else {
                    prop.selectedIndices = [selectedIndices[indicesLength -1]];
                    prop.selectedItems = [_.selectedItems[indicesLength - 1]];
                }
            } else {
                prop.selectedIndex = null;
                prop.selectedItem = null;
                prop.selectedIndices = [];
                prop.selectedItems = [];
            }
            if($KU.is(_.selectedCellPos[1], 'integer'))
                cellId = prop.columnHeadersConfig[_.selectedCellPos[1]].columnID;
            if(!$KU.is(cellId, 'null')) {
                prop.selectedCellIndex = [_.selectedCellPos[1], cellId];
                prop.selectedCellItem = prop.data[_.selectedCellPos[0]][cellId];
            } else {
                prop.selectedCellIndex = null;
                prop.selectedCellItem = null;
            }
        } else {
            prop.selectedIndex = null;
            prop.selectedItem = null;
            prop.selectedIndices = [];
            prop.selectedItems = [];
            prop.selectedCellIndex = null;
            prop.selectedCellItem = null;
        }
    };


    //All widget file must have this variable
    //All the functions will be called in the scope of widget instance
    var _setter = {
        DataGrid: {
            data: function DataGrid$_setter_data(/*old*/) {
                var prop = this._kwebfw_.prop;

                prop.rowCount = (prop.data) ? prop.data.length : 0;
            }
        }
    };


    //All the functions will be called in the scope of widget instance
    var _shouldLazyLoad = function DataGrid$_shouldLazyLoad() {
        // var $K = voltmx.$kwebfw$, $KW = $K.widget, flag = false;
        //TODO: IF LAZY LOADING IS REQ
        /*if($KW.isFixedHeight(this)
        && this._kwebfw_.prop.viewType === constants.SEGUI_VIEW_TYPE_TABLEVIEW) {
            flag = true;
        }*/

        return false;
    };


    //All the functions will be called in the scope of widget instance
    var _sortDataBasedOnColumnId = function DataGrid$_sortDataBasedOnColumnId(columnId) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, prop = this._kwebfw_.prop,
            columnData = [], sortedData = [], i = 0,
            index = null;

        $KU.each(prop.data, function(val) {
            if(parseInt(val[columnId])) {
                columnData.push(parseInt(val[columnId]));
            } else {
                columnData.push(val[columnId]);
            }
        });

        columnData.sort();

        for(i = 0; i < columnData.length; i++) {
            if(columnData.indexOf(prop.data[i][columnId]) >= 0) {
                index = columnData.indexOf(prop.data[i][columnId]);
            } else if(columnData.indexOf(parseInt(prop.data[i][columnId])) >= 0) {
                index = columnData.indexOf(parseInt(prop.data[i][columnId]));
            }
            if(index > -1) {
                columnData[index] = null;
                sortedData[index] = prop.data[i];
            }
        }

        prop.data = sortedData;
    };


    //All the functions will be called in the scope of widget instance
    var _sortDataIfNeeded = function DataGrid$_sortDataIfNeeded() {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, _ = this._kwebfw_,
            prop = _.prop;

        $KU.each(prop.columnHeadersConfig, function(config) {
            if(config.isColumnSortable && config.columnType === constants.DATAGRID_COLUMN_TYPE_TEXT) {
                _sortDataBasedOnColumnId.call(this, config.columnID);
                return true;
            }
        }, this);
    };


    //All the functions will be called in the scope of widget instance
    var _updateDomIndex = function DataGrid$_updateDomIndex() {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KD = $K.dom, $KW = $K.widget,
            _ = this._kwebfw_, prop = _.prop, el = $KW.el(this), row = null, item = null, index = null,
            updateTemplateIndexes = function(clone, index) {
                var $K = voltmx.$kwebfw$, $KW = $K.widget, $KU = $K.utils;

                if(!$KU.is(clone, null) && clone._kwebfw_.view) {
                    $KW.iterate(clone, function(model) {
                        var $K = voltmx.$kwebfw$, $KW = $K.widget,
                            $KD = $K.dom, _ = model._kwebfw_;

                        _.ii = index;

                        if(_.view) {
                            $KD.setAttr(_.view, 'kwi', index);
                            $KW.replaceWAPIndex(model, index);
                            $KD.setAttr(_.view, 'kwp', _.wap);
                            $KD.setAttr(_.view, 'aria-rowindex', index[0] + 1);
                            $KD.setAttr(_.view, 'aria-colindex', index[1] + 1);
                        }
                    }, {tabs:false});
                }
            };

        $KU.each(prop.data, function(value, rowindex) {
            $KU.each(prop.columnHeadersConfig, function(col, colindex) {
                index = [rowindex, colindex];
                row = $KD.childAt(el.table, _deduceRowIndexGivenModelIndex(rowindex));
                $KD.setAttr(row, 'aria-rowindex', rowindex + 1);
                item = $KD.childAt(row, colindex);
                $KD.setAttr(item, 'kii', index.join(','));
                $KD.setAttr(item, 'aria-rowindex', rowindex + 1);
                if(col.columnType === 'template') {
                    updateTemplateIndexes.call(this, _.clones[1][rowindex][colindex], [rowindex, colindex]);
                }
            });
        });
    };


    //All the functions will be called in the scope of widget instance
    var _updateSpecialProperties = function DataGrid$_updateSpecialProperties(self, model/*, index*/) {
        model._kwebfw_.oid = self._kwebfw_.uid;
        model._kwebfw_.wap = self._kwebfw_.wap + ('[' + model._kwebfw_.ii + ']_') + model._kwebfw_.wap;
    };


    //All widget file must have this variable
    //All the functions will be called in the scope of widget instance
    //These function should always return a boolean value
    var _valid = {
        DataGrid: {
            allowColumnResize: function DataGrid$_valid_allowColumnResize(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'boolean')) {
                    flag = true;
                }

                return flag;
            },

            columnHeadersConfig: function DataGrid$_valid_columnHeadersConfig(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'array')) {
                    flag = true;

                    $KU.each(value, function(config) {
                        var $K = voltmx.$kwebfw$, $KU = $K.utils;

                        if(!$KU.is(config, 'object')) {
                            flag = false;
                            return true;
                        } else if(!($KU.is(config.columnID, 'string') && config.columnID
                        && [constants.DATAGRID_COLUMN_TYPE_TEXT,
                            constants.DATAGRID_COLUMN_TYPE_IMAGE,
                            constants.DATAGRID_COLUMN_TYPE_TEMPLATE].indexOf(config.columnType) >= 0
                        && ($KU.is(config.columnHeaderText, 'string')
                        || $KU.is(config.columnHeaderTemplate, 'widget', 'FlexContainer')
                        || ($KU.is(config.columnHeaderTemplate, 'string') && config.columnHeaderTemplate))
                        && $KU.is(config.columnWidthInPercentage, 'number')
                        && config.columnWidthInPercentage >= 0)) {
                            flag = false;
                            return true;
                        } else if(config.columnType === constants.DATAGRID_COLUMN_TYPE_TEMPLATE
                        && (!($KU.is(config.columnDataTemplate, 'widget', 'FlexContainer')
                        || ($KU.is(config.columnDataTemplate, 'string') && config.columnDataTemplate)))) {
                            flag = false;
                            return true;
                        } else if(Object.prototype.hasOwnProperty.call(config, 'isColumnSortable')
                        && !$KU.is(config.isColumnSortable, 'boolean')) {
                            flag = false;
                            return true;
                        } else if(Object.prototype.hasOwnProperty.call(config, 'columnOnClick')
                        && !$KU.is(config.columnOnClick, 'function')) {
                            flag = false;
                            return true;
                        } else if(Object.prototype.hasOwnProperty.call(config, 'columnContentAlignment')
                        && [constants.CONTENT_ALIGN_TOP_LEFT,
                            constants.CONTENT_ALIGN_TOP_CENTER,
                            constants.CONTENT_ALIGN_TOP_RIGHT,
                            constants.CONTENT_ALIGN_MIDDLE_LEFT,
                            constants.CONTENT_ALIGN_CENTER,
                            constants.CONTENT_ALIGN_MIDDLE_RIGHT,
                            constants.CONTENT_ALIGN_BOTTOM_LEFT,
                            constants.CONTENT_ALIGN_BOTTOM_CENTER,
                            constants.CONTENT_ALIGN_BOTTOM_RIGHT
                        ].indexOf(config.columnContentAlignment) === -1) {
                            flag = false;
                            return true;
                        }
                    });
                }

                return flag;
            },

            data: function DataGrid$_valid_data(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'array') || $KU.is(value, 'null')) {
                    flag = true;
                }

                return flag;
            },

            dockingHeader: function DataGrid$_valid_dockingHeader(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'boolean')) {
                    flag = true;
                }

                return flag;
            },

            enableScrollBar: function DataGrid$_valid_enableScrollBar(value) {
                var flag = false, options = [
                    constants.DATAGRID_SCROLLBAR_NONE,
                    constants.DATAGRID_SCROLLBAR_VERTICAL
                ];

                if(options.indexOf(value) >= 0) {
                    flag = true;
                }

                return flag;
            },

            gridlineColor: function DataGrid$_valid_gridlineColor(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'string')) {
                    value = value.toUpperCase();
                    flag = $KU.is(value, 'color');
                }

                return (flag ? [value, flag] : flag);
            },

            headerSkin: function DataGrid$_valid_headerSkin(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'object')
                || ($KU.is(value, 'string') && value.split(' ').length === 1)) {
                    flag = true;
                }

                return flag;
            },

            isMultiSelect: function DataGrid$_valid_isMultiSelect(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'boolean')) {
                    flag = true;
                }

                return flag;
            },

            onRowSelected: function DataGrid$_valid_onRowSelected(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'function') || $KU.is(value, 'null')) {
                    flag = true;
                } else if(!flag && $K.F.EIWP) {
                    if($KU.is(value, 'undefined')) {
                        flag = [null, true];
                    }
                }

                return flag;
            },

            rowAlternateSkin: function DataGrid$_valid_rowAlternateSkin(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'object')
                || ($KU.is(value, 'string') && value.split(' ').length === 1)) {
                    flag = true;
                }

                return flag;
            },

            rowCount: function DataGrid$_valid_rowCount(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'integer') && value >= 0) {
                    flag = true;
                }

                return flag;
            },

            rowFocusSkin: function DataGrid$_valid_rowFocusSkin(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'object')
                || ($KU.is(value, 'string') && value.split(' ').length === 1)) {
                    flag = true;
                }

                return flag;
            },

            rowNormalSkin: function DataGrid$_valid_rowNormalSkin(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'object')
                || ($KU.is(value, 'string') && value.split(' ').length === 1)) {
                    flag = true;
                }

                return flag;
            },

            selectedCellIndex: function DataGrid$_valid_selectedCellIndex(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'null')) {
                    flag = true;
                } else if($KU.is(value, 'array') && value.length === 2
                && $KU.is(value[0], 'integer') && value[0] >= 0
                && $KU.is(value[1], 'string')) {
                    flag = true;
                }

                return flag;
            },

            selectedCellItem: function DataGrid$_valid_selectedCellItem(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'string')
                || $KU.is(value, 'object')
                || $KU.is(value, 'null')) {
                    flag = true;
                }

                return flag;
            },

            selectedIndex: function DataGrid$_valid_selectedIndex(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'null')) {
                    flag = true;
                } else if($KU.is(value, 'integer') && value >= 0) {
                    flag = true;
                }

                return flag;
            },

            selectedIndices: function DataGrid$_valid_selectedIndices(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'array') || $KU.is(value, 'null')) {
                    flag = true;
                }

                return flag;
            },

            selectedItem: function DataGrid$_valid_selectedItem(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'null') || $KU.is(value, 'object')) {
                    flag = true;
                }

                return flag;
            },

            selectedItems: function DataGrid$_valid_selectedItems(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'array') || $KU.is(value, 'null')) {
                    flag = true;
                }

                return flag;
            },

            showColumnHeaders: function DataGrid$_valid_showColumnHeaders(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'boolean')) {
                    flag = true;
                }

                return flag;
            }
        }
    };


    //All widget file must have this variable
    //All the functions will be called in the scope of widget instance
    //Any property here, which is set to "false", will not create a setter
    var _view = {
        DataGrid: {
            allowColumnResize: false,

            columnHeadersConfig: false,

            data: function DataGrid$_view_data(el/*, old*/) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, $KD = $K.dom,
                    _ = this._kwebfw_, prop =_.prop, rowIndex = -1;

                _clearSelectedIndices.call(this);
                _removeAllRows.call(this);
                _flushClones(_.clones[1]);
                _.rows = [];
                _.clones[1] = [];

                if(prop.data) {
                    prop.rowCount = 0;
                    _sortDataIfNeeded.call(this);

                    if(_shouldLazyLoad.call(this)) {
                        //todo
                    } else {
                        $KU.each(prop.data, function(data, rowIndex) {
                            $KU.each(prop.columnHeadersConfig, function(config, colIndex) {
                                if(config.columnType === constants.DATAGRID_COLUMN_TYPE_TEMPLATE) {
                                    _getClonedTemplateCell.call(this, config, data, [rowIndex, colIndex]);
                                } else {
                                    if($KU.is(_.clones[1][rowIndex], 'undefined')) {
                                        _.clones[1][rowIndex] = [];
                                    }
                                    _.clones[1][rowIndex][colIndex] = null;
                                }
                            }, this);
                            _.rows.push(_.clones[1][rowIndex]);
                        }, this);

                        $KU.each(prop.data, function(data) {
                            var $K = voltmx.$kwebfw$, $KD = $K.dom;
                            rowIndex = prop.rowCount;
                            $KD.add(el.table, _createRow.call(this, data, rowIndex, null, _.rows[rowIndex]));
                            prop.rowCount +=1;
                        }, this);
                    }
                    _view.DataGrid.gridlineColor.call(this, el);
                    _applyRowsSkin.call(this);
                    $KD.setAttr(el.table, 'aria-rowcount', prop.rowCount);
                }
            },

            dockingHeader: false,

            enableScrollBar: false,

            gridlineColor: function DataGrid$_view_gridlineColor(el/*, old*/) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget, $KD = $K.dom,
                    color = '', prop = this._kwebfw_.prop, header = null,
                    columnlength = null, rowlength = null;

                el = $KW.el(this);

                if(prop.gridlineColor && prop.columnHeadersConfig) {
                    columnlength = prop.columnHeadersConfig.length;
                    color = $KU.convertHexToRGBA(this.gridlineColor);
                    header = prop.dockingHeader ? el.dockedheader : el.header;
                    $KU.each($KD.children(header), function(cell, colindex) {
                        $KD.style(cell, 'border-top', ('1px solid '+color));
                        $KD.style(cell, 'border-bottom', ('1px solid '+color));
                        $KD.style(cell, 'border-left', ('1px solid '+color));
                        if(colindex === columnlength - 1) {
                            $KD.style(cell, 'border-right', ('1px solid '+color));
                        }
                    });
                    if(prop.data) {
                        rowlength = prop.data.length;
                        $KU.each($KD.children(el.table), function(row, rowindex) {
                            if($KD.getAttr(row, 'kr') === 'row') {
                                $KU.each($KD.children(row), function(cell, colindex) {
                                    $KD.style(cell, 'border-bottom', ('1px solid '+color));
                                    $KD.style(cell, 'border-left', ('1px solid '+color));
                                    if(colindex === columnlength - 1) {
                                        $KD.style(cell, 'border-right', ('1px solid '+color));
                                    }
                                    if(rowindex === rowlength) {
                                        $KD.style(cell, 'border-bottom', ('1px solid '+color));
                                    }
                                    if(!prop.showColumnHeaders && rowindex === 1) {
                                        $KD.style(cell, 'border-top', ('1px solid' +color));
                                    }
                                });
                            }
                        });
                    }
                }
            },

            headerSkin: function DataGrid$_view_headerSkin(/*el, old*/) {
                _applyHeaderSkin.call(this);
            },

            isMultiSelect: true,

            onRowSelected: true,

            rowAlternateSkin: function DataGrid$_view_rowAlternateSkin(/*el, old*/) {
                _applyRowsSkin.call(this);
            },

            rowCount: false,

            rowFocusSkin: function DataGrid$_view_rowFocusSkin(/*el, old*/) {
                _applyRowsSkin.call(this);
            },

            rowNormalSkin: function DataGrid$_view_rowNormalSkin(/*el, old*/) {
                _applyRowsSkin.call(this);
            },

            selectedCellIndex: false,

            selectedCellItem: false,

            selectedIndex: false,

            selectedIndices: false,

            selectedItem: false,

            selectedItems: false,

            showColumnHeaders: function DataGrid$_view_showColumnHeaders(el/*, old*/) {
                var $K = voltmx.$kwebfw$, $KD = $K.dom;

                if(this.showColumnHeaders && this.dockingHeader) {
                    $KD.removeAttr(el.header, 'hidden');
                    $KD.removeAttr(el.dockedheader, 'hidden');
                } else if(this.showColumnHeaders && !this.dockingHeader) {
                    $KD.removeAttr(el.header, 'hidden');
                } else if(!this.showColumnHeaders && this.dockingHeader) {
                    $KD.setAttr(el.header, 'hidden', true);
                    $KD.setAttr(el.dockedheader, 'hidden', true);
                } else {
                    $KD.setAttr(el.header, 'hidden', true);
                }
            }
        }
    };


    Object.defineProperty(voltmx.ui, 'DataGrid', {configurable:false, enumerable:false, writable:false, value:(function() {
        var $K = voltmx.$kwebfw$;


        /**
         * voltmx.ui.DataGrid constructor.
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
        var DataGrid = function DataGrid(bconfig, lconfig, pspconfig) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils, self = this,
                dependentPropertiesValidationMessage = '', prop = null;

            if(!$KU.is(bconfig, 'object')) bconfig = {};

            if(!bconfig.isPreValidated) {
                prop = {
                    allowColumnResize: false, //Readonly
                    columnHeadersConfig: [],
                    data: null,
                    dockingHeader: false, //Readonly
                    enableScrollBar: constants.DATAGRID_SCROLLBAR_NONE, //Readonly
                    gridlineColor: '666666',
                    headerSkin: 'slDataGridHead',
                    isMultiSelect: false,
                    onRowSelected: null,
                    rowAlternateSkin: 'slDataGridAltRow',
                    rowCount: 0, //Readonly
                    rowFocusSkin: 'slDataGridFocusedRow',
                    rowNormalSkin: 'slDataGridRow',
                    selectedCellIndex: null, //Readonly
                    selectedCellItem: null, //Readonly
                    selectedIndex: null, //Readonly
                    selectedIndices: [], //Readonly
                    selectedItem: null, //Readonly
                    selectedItems: [], //Readonly
                    showColumnHeaders: true
                };
            }

            _populateUnderscore.DataGrid.call(this);

            if(!$KU.is(bconfig.id, 'string') || !bconfig.id) {
                bconfig.id = (this._kwebfw_.name + $KU.uid());
            }

            DataGrid.base.call(this, bconfig, lconfig, pspconfig);

            if(!bconfig.isPreValidated) {
                if($KU.is(_dependentPropertiesValidationMessage.DataGrid, 'function')) {
                    dependentPropertiesValidationMessage = _dependentPropertiesValidationMessage.DataGrid.call(this, prop, bconfig, lconfig, pspconfig);
                }
            }

            if(dependentPropertiesValidationMessage) {
                throw new Error(dependentPropertiesValidationMessage);
            } else {
                if(!bconfig.isPreValidated) {
                    //Defaulting to platfom values specific to DataGrid
                    $KU.each(prop, function(value, key) {
                        var $K = voltmx.$kwebfw$, $KU = $K.utils,
                            $KW = $K.widget, valid = false, message = '';

                        if(!Object.prototype.hasOwnProperty.call(bconfig, key)) {
                            bconfig[key] = value;
                        } else if($KW.getNonConstructorProperties(self._kwebfw_.name).indexOf(key) >= 0) {
                            throw new Error('<' + key + '> is a non-constructor property of <' + self._kwebfw_.ns + '> class.');
                        } else if(!$KU.is(_valid.DataGrid[key], 'function')) {
                            throw new Error('<' + key + '> is available in default widget properties of <voltmx.ui.DataGrid>, but not in <_valid.DataGrid> namespace.');
                        } else {
                            valid = _valid.DataGrid[key].call(self, bconfig[key]);
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

                //Defining Getters/Setters specific to DataGrid
                $KU.each(_view.DataGrid, function(value, key) {
                    var $K = voltmx.$kwebfw$, $KU = $K.utils;

                    $KU.defineProperty(self._kwebfw_.prop, key, bconfig[key], {configurable:false, enumerable:true, writable:true});

                    $KU.defineGetter(self, key, function DataGrid$_getter() {
                        var $K = voltmx.$kwebfw$, $KU = $K.utils;

                        if($KU.is(_getter.DataGrid[key], 'function')) {
                            return _getter.DataGrid[key].call(this, this._kwebfw_.prop[key]);
                        }
                        return this._kwebfw_.prop[key];
                    }, true);

                    $KU.defineSetter(self, key, function DataGrid$_setter(val) {
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
                                valid = _valid.DataGrid[key].call(this, val);
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

                                    if($KU.is(_setter.DataGrid[key], 'function')) {
                                        _setter.DataGrid[key].call(this, old);
                                    }

                                    if(_relayoutActiveTriggerer.DataGrid().indexOf(key) >= 0) {
                                        $KW.markRelayout(this);
                                    }

                                    if(_relayoutPassiveTriggerer.DataGrid().indexOf(key) >= 0) {
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

                if($KU.is(_postInitialization.DataGrid, 'function')) {
                    _postInitialization.DataGrid.call(this);
                }
            }


            pspconfig = lconfig = bconfig = null; //For GC
        };


        $K.utils.inherits(DataGrid, voltmx.ui.BasicWidget);


        /**
         * Takes care of flushing out the widget reference to clean memory.
         *
         * @access      protected
         * @method      _flush
         * @memberof    voltmx.ui.DataGrid
         * @author      Goutam Sahu <goutam.sahu@voltmx.com>
         *
         * @returns     void
         */
        var datagrid__flush = function DataGrid$_flush(config) {
            var $super = voltmx.ui.DataGrid.base.prototype;

            _flushClones.call(this, this._kwebfw_.clones[0], config);
            _flushClones.call(this, this._kwebfw_.clones[1], config);
            $super._flush.call(this);
        };


        /**
         * Builds the view layer for voltmx.ui.DataGrid widget.
         *
         * @override
         * @access      protected
         * @method      _render
         * @memberof    voltmx.ui.DataGrid
         * @author      Goutam Sahu <goutam.sahu@voltmx.com>
         *
         * @returns     {HTMLElement} – DataGrid view.
         */
        var datagrid__render = function DataGrid$_render(tag) {
            var $super = voltmx.ui.DataGrid.base.prototype, el = null,
                _ = this._kwebfw_, $K = voltmx.$kwebfw$, $KU = $K.utils,
                $KW = $K.widget, $KD = $K.dom, view = _.view,
                docker = null, table = null, header = null;

            if(this.isVisible || $K.F.RIVW) {
                if(!view) {
                    docker = $KD.create('UL', {kr:'docker'}, {
                        position:'absolute', top:'0px', left:'0px', zIndex: 1
                    }); $KD.setAttr(docker, 'hidden', true);
                    table = $KD.create('UL', {role:'grid'}, {height: '100%'});
                    header = $KD.create('LI', {kr:'header'});

                    if(this.dockingHeader) {
                        $KD.add(docker, $KU.clone(header));
                    }

                    $KU.each(_.prop.columnHeadersConfig, function(config, columnIndex) {
                        var $K = voltmx.$kwebfw$, $KD = $K.dom, th = null;

                        th = _createColumnHeaderCell.call(this, config, columnIndex);
                        _applyHeightinPercent.call(this, config, th, header, true);
                        $KD.add(header, th);
                    }, this);

                    $KD.add(table, header);

                    view = $super._render.call(this, tag, [table, docker]);
                    $KD.setAttr(table, 'kwh-keydown', 'onKeyDown');
                    $KD.setAttr(table, 'aria-colcount', _getColumnCount.call(this));
                    _dockColumnHeader.call(this, docker);
                }

                el = $KW.el(view);

                _enableScrollBar.call(this, el);
                _view.DataGrid.gridlineColor.call(this, el);
                _view.DataGrid.headerSkin.call(this, el, this.headerSkin);
                _view.DataGrid.data.call(this, el, _.prop.data);
                _view.DataGrid.showColumnHeaders.call(this, el, _.prop.showColumnHeaders);
                $KW.accessibility(this);
            }

            return view;
        };


        var datagrid_addAll = function DataGrid$addAll(data) {
            var _ = this._kwebfw_, prop = _.prop, rowIndex = null;

            if(!_valid.DataGrid.data.call(this, data)) {
                throw new Error('Invalid data.');
            } else {
                if(!prop.data) prop.data = [];
                rowIndex = prop.data.length;
                _onRowChange.call(this, rowIndex, 'addAll', data);
            }
        };


        var datagrid_addDataAt = function DataGrid$addDataAt(data, index) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils, prop = this._kwebfw_.prop;

            if(!prop.data) prop.data = [];
            if($KU.is(data, 'object') && $KU.is(index, 'integer')
            && index >= 0 && index <= prop.data.length) {
                _onRowChange.call(this, index, 'addDataAt', data);
            } else {
                throw new Error('Invalid data or index.');
            }
        };


        var datagrid_applyCellSkin = function DataGrid$applyCellSkin(rowIndex, columnID, skin) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget, $KD = $K.dom,
                prop = this._kwebfw_.prop, tr = null, td = null, columnIndex = -1,
                el = null;

            if($KU.is(rowIndex, 'integer') && rowIndex >= 0 && rowIndex < prop.data.length
            && (($KU.is(skin, 'string') && skin.split(' ').length === 1) || $KU.is(skin, 'object'))) {
                columnIndex = _getColumnIndexById.call(this, columnID);

                if(columnIndex !== -1) {
                    el = $KW.el(this);

                    if(el.table) {
                        tr = $KD.childAt(el.table, _deduceRowIndexGivenModelIndex.call(this, rowIndex));
                        td = $KD.childAt(tr, columnIndex);

                        td.className = skin;
                        _setContentAlignment.call(this, td, prop.columnHeadersConfig[columnIndex]);
                    }
                } else {
                    throw new Error('Invalid column ID');
                }
            } else {
                throw new Error('Invalid parameter');
            }
        };


        var datagrid_removeAll = function DataGrid$removeAll() {
            _action.DataGrid._removeAll.call(this);
        };


        var datagrid_removeAt = function DataGrid$removeAt(rowIndex) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils, _ = this._kwebfw_,
                prop = _.prop;
            if($KU.is(rowIndex, 'number') && rowIndex >= 0 && rowIndex < prop.data.length) {
                _onRowChange.call(this, rowIndex, 'removeAt');
            } else {
                throw new Error('Invalid parameter');
            }
        };


        var datagrid_selectAllRows = function DataGrid$selectAllRows(select) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils, _ = this._kwebfw_,
                prop = _.prop;

            if($KU.is(select, 'boolean')) {
                if(prop.isMultiSelect) {
                    if(select) {
                        _.selectedIndices = [];
                        _.selectedItems = [];
                        $KU.each(prop.data, function(row, index) {
                            _.selectedItems.push(row);
                            _.selectedIndices.push(index);
                        }, this);
                    } else {
                        _.selectedIndices = [];
                        _.selectedItems = [];
                    }
                    _setSelectedRowRelatedProperties.call(this);
                    _applyRowsSkin.call(this);
                } else {
                    throw new Error('isMultiSelect is false');
                }
            } else {
                throw new Error('Invalid parameter');
            }
        };


        var datagrid_setCellDataAt = function DataGrid$setCellDataAt(rowIndex, columnID, data) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget, $KD = $K.dom,
                _ = this._kwebfw_, prop = _.prop, config = prop.columnHeadersConfig,
                tr = null, td = null, columnIndex = -1, el = null, index = null,
                tempdata = {}, tpl = null;

            if($KU.is(rowIndex, 'integer') && rowIndex >= 0
            && rowIndex < prop.data.length
            && $KU.is(columnID, 'string') && columnID) {
                columnIndex = _getColumnIndexById.call(this, columnID);
                index = [rowIndex, columnIndex];

                if(columnIndex !== -1) {
                    config = config[columnIndex];
                    prop.data[rowIndex][columnID] = data;
                    if(_.selectedIndices.indexOf(rowIndex)>=0) {
                        if($KU.is(prop.selectedCellIndex, 'equals', [columnIndex, columnID])) {
                            _.selectedCellPos = [];
                        }
                        _.selectedItems.splice(_.selectedIndices.indexOf(rowIndex), 1);
                        _.selectedIndices.splice(_.selectedIndices.indexOf(rowIndex), 1);
                    }
                    _flushClones(_.clones[1][rowIndex][columnIndex]);
                    _.clones[1][rowIndex][columnIndex] = null;

                    if((config.columnType === constants.DATAGRID_COLUMN_TYPE_TEXT && $KU.is(data, 'string'))
                    || (config.columnType === constants.DATAGRID_COLUMN_TYPE_IMAGE && $KU.is(data, 'string') && data)
                    || (config.columnType === constants.DATAGRID_COLUMN_TYPE_TEMPLATE && $KU.is(data, 'object'))) {
                        el = $KW.el(this);

                        if(el.table) {
                            tr = $KD.childAt(el.table, _deduceRowIndexGivenModelIndex.call(this, rowIndex));
                            td = $KD.childAt(tr, columnIndex);

                            if(config.columnType === constants.DATAGRID_COLUMN_TYPE_TEXT) {
                                $KD.text(td, data);
                            } else if(config.columnType === constants.DATAGRID_COLUMN_TYPE_IMAGE) {
                                $KD.setAttr($KD.first(td), 'src', $KU.getImageURL(data));
                            } else if(config.columnType === constants.DATAGRID_COLUMN_TYPE_TEMPLATE) {
                                $KD.html(td, '');
                                tempdata[columnID] = data;
                                tpl = _getClonedTemplateCell.call(this, config, tempdata, index);
                                tpl = tpl._render();
                                $KW.iterate(tpl, function(widget) {
                                    var $K = voltmx.$kwebfw$, $KD = $K.dom,
                                        view = widget._kwebfw_.view;

                                    if(view) {
                                        $KD.setAttr(view, 'aria-colindex', index[1] + 1);
                                        $KD.setAttr(view, 'aria-rowindex', index[0] + 1);
                                    }
                                }, {tabs:false});
                                $KD.style(tpl, {position: 'relative'});
                                $KD.add(td, tpl);
                                _applyHeightinPercent.call(this, config, td, tr);
                                _.rows[rowIndex][columnIndex] = _.clones[1][rowIndex][columnIndex];
                            }
                        }
                        _setSelectedRowRelatedProperties.call(this);
                        _applyRowsSkin.call(this);
                        _view.DataGrid.gridlineColor.call(this, el);
                    } else {
                        throw new Error('Invalid data');
                    }
                } else {
                    throw new Error('Invalid column ID');
                }
            } else {
                throw new Error('Invalid parameter');
            }
        };


        var datagrid_setData = function DataGrid$setData(data) {
            var _ = this._kwebfw_;

            _flushClones(_.clones[1]);
            _.clones[1] = [];
            _.rows = [];
            this.data = data;
        };


        var datagrid_setDataAt = function DataGrid$setDataAt(data, index, arg2, arg3, arg4) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget, _ = this._kwebfw_,
                prop = _.prop, widget = null, colIndex = null,
                key = null, colId = null, rowIndex = null,
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
                widget = data;
                key = index;
                rowIndex = arg3;
                colIndex = arg4;

                if(rowIndex === -1 && colIndex > -1) {
                    if($KU.is(prop.columnHeadersConfig[colIndex].columnHeaderTemplate.data[widget.id], 'object')) {
                        prop.columnHeadersConfig[colIndex].columnHeaderTemplate.data[widget.id][key] = widget[key];
                    } else {
                        prop.columnHeadersConfig[colIndex].columnHeaderTemplate.data[widget.id] = _constructObject(widget, prop.data[rowIndex][colId][widget.id], key);
                    }
                } else {
                    colId = _getColumnIdByIndex.call(this, colIndex);

                    if(colId) {
                        if($KU.is(prop.data[rowIndex][colId][widget.id], 'object')) {
                            prop.data[rowIndex][colId][widget.id][key] = widget[key];
                        } else {
                            prop.data[rowIndex][colId][widget.id] = _constructObject(widget, prop.data[rowIndex][colId][widget.id], key);
                        }
                    }
                }
            } else if(prop.data) {
                if($KU.is(data, 'object') && $KU.is(index, 'integer')
                && index >= 0 && index < prop.data.length) {
                    _onRowChange.call(this, index, 'update', data);
                } else {
                    throw new Error('Invalid parameter');
                }
            }
        };


        var datagrid_setHeaderCellDataAt = function DataGrid$setHeaderCellDataAt(columnID, data) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget, prop = this._kwebfw_.prop,
                $KD = $K.dom, columnIndex = -1, tpl = null, tr = null, th = null, el = null;

            if($KU.is(columnID, 'string') && columnID
            && ($KU.is(data, 'string') || $KU.is(data, 'number') || $KU.is(data, 'object'))) {
                columnIndex = _getColumnIndexById.call(this, columnID);

                if(columnIndex !== -1) {
                    el = $KW.el(this);

                    if(el.head) {
                        tr = $KD.first(el.table);
                    } else if(el.dockedheader) {
                        tr = $KD.first(el.docker);
                    }
                    if(tr) {
                        th = $KD.childAt(tr, columnIndex);
                        if(!prop.columnHeadersConfig[columnIndex].columnHeaderTemplate) {
                            $KD.text(th, data);
                            prop.columnHeadersConfig[columnIndex].columnHeaderText = data;
                        } else {
                            tpl = _getClonedTemplateCell.call(this, prop.columnHeadersConfig[columnIndex], data, [-1, columnIndex], true);
                            tpl = tpl._render();
                            $KW.iterate(tpl, function(widget) {
                                var $K = voltmx.$kwebfw$, $KD = $K.dom,
                                    view = widget._kwebfw_.view;

                                if(view) {
                                    $KD.setAttr(view, 'aria-colindex', columnIndex);
                                }
                            }, {tabs:false});
                            prop.columnHeadersConfig[columnIndex].columnHeaderTemplate.data = data;
                            $KD.html(th, '');
                            $KD.style(tpl, {position: 'relative'});
                            $KD.add(th, tpl);
                        }
                    }
                } else {
                    throw new Error('Invalid column ID');
                }
            } else {
                throw new Error('Invalid parameter');
            }
        };


        $K.defVoltmxProp(DataGrid.prototype, [
            {keey:'_flush', value:datagrid__flush},
            {keey:'_render', value:datagrid__render},
            {keey:'addAll', value:datagrid_addAll},
            {keey:'addDataAt', value:datagrid_addDataAt},
            {keey:'applyCellSkin', value:datagrid_applyCellSkin},
            {keey:'removeAll', value:datagrid_removeAll},
            {keey:'removeAt', value:datagrid_removeAt},
            {keey:'selectAllRows', value:datagrid_selectAllRows},
            {keey:'setCellDataAt', value:datagrid_setCellDataAt},
            {keey:'setData', value:datagrid_setData},
            {keey:'setDataAt', value:datagrid_setDataAt},
            {keey:'setHeaderCellDataAt', value:datagrid_setHeaderCellDataAt}
        ]);


        return DataGrid;
    }())});
}());
