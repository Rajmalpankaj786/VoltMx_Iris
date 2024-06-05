(function() {
    var $K = voltmx.$kwebfw$, $KW = $K.widget, _map = {}, _root = {},
        _dirty = {cascade:{}, widgets:{}, templates:{}},
        _measures = {}, _mutates = [], _doLayoutWidgtsList = [];

    //window.gmap = _map; window.groot = _root;
    /* Mock Data
    _measures = {
        uid: {
            cview: dom, pview: dom,
            cheight: -1, pheight: -1,
            properties: [{position:'centerY'}]
        }
    }
    //*/


    //Here widget can be an instanceof voltmx.ui.BasicWidget or voltmx.ui.UseWidget
    //This function must be called in the scope of widget instance
    var _addRemovedWidget = function UI$_addRemovedWidget(widget) {
        var $K = voltmx.$kwebfw$, $KW = $K.widget,
            proxy = $KW.proxy(widget), _ = proxy._kwebfw_;

        //Instead of deleting "removed" key set it to "false"
        //Indication of, once widget was removed and then added
        _.is.removed = false;

        //Adding widgets back to _map
        $KW.iterate(proxy, function(model) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils, _ = model._kwebfw_;

            if(_.uwi instanceof voltmx.ui.UserWidget) {
                _map[_.uwi._kwebfw_.uid] = _.uwi;
            }

            if($KU.is(_.is.removed, 'null')) {
                delete _.is.removed;
            }

            _map[_.uid] = model;
        }, {scope:this, tabs:true});
    };


    //Here widget can be an instanceof voltmx.ui.BasicWidget or voltmx.ui.UseWidget
    //This function must be called in the scope of widget instance
    var _addWidget = function UI$_addWidget(widget, fmodel, rmodel, init, append, index) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget,
            proxy = $KW.proxy(widget), iterateForDefaultUnit = true,
            iterateForDisabled = true, iterateForInModalContainer = true;

        if(this._kwebfw_.inModalContainer === true) {
            iterateForInModalContainer = false;
        }

        if(this.layoutType === voltmx.flex.RESPONSIVE_GRID) {
            if(!$KU.is(widget, 'widget', 'FlexContainer')) {
                throw new $KU.error('100', 'Error',
                    'Unable to add widget, invalid widget type, widget id is ' + widget.id);
            }
        }

        if(_isWidgetIdExists(widget.id, this, rmodel)) {
            throw new Error('Duplicate widget ID <'+widget.id+'> encountered.');
        } else if($KU.is(proxy._kwebfw_.is.removed, 'null')) {
            throw new Error('Can\'t add any inner widget of a removed widget.');
        } else {
            if(proxy._kwebfw_.is.removed === true) {
                _addRemovedWidget.call(this, widget);
            }

            this[widget.id] = widget;
            widget._kwebfw_.prop.parent = this;
            widget._kwebfw_.pid = this._kwebfw_.uid;

            if(append) {
                this._kwebfw_.children.push(widget);
            } else {
                this._kwebfw_.children.splice(index, 0, widget);
            }

            if(init) {
                //NOTE:: Similar call, inside a loop, can be found in "$KW.root()" function of this file.
                _createWidgetHierarchy.call(rmodel, widget);
            }

            $KW.iterate(proxy, function(model) {
                var $K = voltmx.$kwebfw$, $KW = $K.widget,
                    $KA = $K.app, _ = model._kwebfw_;

                if(iterateForDefaultUnit) {
                    if(_.defaultUnit) {
                        iterateForDefaultUnit = false;
                    } else {
                        _.layoutUnit = this._kwebfw_.defaultUnit;
                    }
                }

                if(iterateForDisabled) {
                    if(this._kwebfw_.disabled && !_.disabled) {
                        _.disabled = true;
                        $KW.handleTabPaneEnablement(model);
                    } else {
                        iterateForDisabled = false;
                    }
                }

                if(iterateForInModalContainer) {
                    _.inModalContainer = false;
                }

                if(fmodel && fmodel === $KW.model($KA.currentFormUID)) {
                    $KW.markRelayout(model);
                }
            }, {scope:this, tabs:false});

            _createFullHierarchy(widget);
        }
    };


    /***************************************************************************
    * Widgets are created and getting added to their parent.                   *
    *     None of the widgets are added to FORM widget yet.                    *
    *         - Expect top-level container, other nested widgets,
    *           will have their parent populated, but not root.                *
    *         - As root is null, widget hierarchy will not be created.         *
    *                                                                          *
    *                                                                          *
    *     Widgets are added directly to FORM/COMPONENT for the first time.     *
    *     ------------------------------ OR -----------------------------      *
    *     Widgets are added to a CONTAINER widget...                           *
    *     ... which is already a part of FORM/COMPONENT widget.                *
    *         - Container to which, widgets getting added has root defined.    *
    *         - Either root===parent or root has children (zero or more)       *
    *         - In either case, widget hierarchy will be created recursively.  *
    ****************************************************************************/
    //Here widgets can hold both widget, which is an instanceof voltmx.ui.BasicWidget/UseWidget
    //This function must be called in the scope of widget instance
    var _addWidgets = function UI$_addWidgets(widgets, index) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget,
            $KA = $K.app, rmodel = $KW.rmodel(this), modal = null,
            fmodel = $KW.fmodel(this), append = false, init = false;

        if(index >= $KW.children(this).length) append = true;

        if($KU.is(rmodel, 'widget')
        && (rmodel === this || $KU.is(rmodel._kwebfw_.children, 'array'))) {
            init = true;
        }

        if(!$KU.is(this._kwebfw_.children, 'array')) {
            $KU.defineProperty(this._kwebfw_, 'children', []);
        }

        $KU.each(widgets, function(widget) {
            _addWidget.call(this, widget, fmodel, rmodel, init, append, index);
        }, this);

        _markRelayoutOnAdd.call(this, index);

        if(fmodel && fmodel === $KW.model($KA.currentFormUID)
        && _shouldDeduceModalContainer.onAdd.call(this)) {
            modal = $KW.deduceModalContainer(fmodel);
            $KW.updateModalContainer(fmodel, modal);
        }

        if(append) {
            _addWidgetsToView.call(this, widgets);
        } else {
            _addWidgetsToView.call(this, widgets, index);
        }
    };


    //This function must be called in the scope of widget instance
    var _addWidgetsToView = function UI$_addWidgetsToView(widgets, index) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget,
            $KD = $K.dom, fragment = null, holder = null, ref = null,
            fmodel = $KW.fmodel(this), fchildren = null,
            rendered = (fmodel && $KW.isRendered(fmodel));

        if($KU.is(widgets, 'widget')) {
            widgets = [widgets];
        }

        if(rendered) {
            $KU.each(widgets, function(widget) {
                var $K = voltmx.$kwebfw$, $KW = $K.widget, _ = widget._kwebfw_;

                if(_.is.component) {
                    $KW.invokeLifeCycleEvent(widget, 'preShow', false);

                    if($K.behavior.responsive === true) {
                        $KW.invokeLifeCycleEvent(widget, 'onBreakpointHandler', true);
                        $KW.invokeLifeCycleEvent(widget, 'onBreakpointChange', true);
                    }
                }
            });
        }

        if(this.isVisible || $K.F.RIVW) {
            holder = $KW.holder(this);

            if(widgets.length > 0 && $KU.is(holder, 'dom')) {
                if(widgets.length > 1) {
                    fragment = document.createDocumentFragment();

                    $KU.each(widgets, function(widget) {
                        if(widget.isVisible || $K.F.RIVW) {
                            if(widget instanceof voltmx.ui.UserWidget) {
                                widget = widget._kwebfw_.proxy;
                            }

                            fragment.appendChild(widget._render());
                        }
                    });

                    if($KD.children(fragment).length === 0) {
                        fragment = null;
                    }
                } else if(widgets[0].isVisible || $K.F.RIVW) {
                    if(widgets[0] instanceof voltmx.ui.UserWidget) {
                        fragment = widgets[0]._kwebfw_.proxy._render();
                    } else {
                        fragment = widgets[0]._render();
                    }
                }

                if(fragment) {
                    if($KU.is(fragment, 'fragment')) {
                        fchildren = Array.prototype.slice.call($KD.children(fragment));
                    }

                    if($KU.is(index, 'number')) {
                        ref = $KW.nextVisible(widgets[widgets.length-1]);

                        if(ref) {
                            $KD.before(ref._kwebfw_.view, fragment);
                        } else {
                            $KW.addToView(holder, fragment);
                        }
                    } else {
                        $KW.addToView(holder, fragment);
                    }

                    rendered && $KW.onRender(fchildren || fragment);
                }
            }
        }

        if(rendered) {
            $KU.each(widgets, function(widget) {
                var $K = voltmx.$kwebfw$, $KW = $K.widget, _ = widget._kwebfw_;

                if(_.is.component) {
                    $KW.invokeLifeCycleEvent(widget, 'postShow', true);
                }
            });
        }
    };


    //All the functions will be called in the scope of widget instance
    var _applyFlexCSS = {
        fflex: {
            heightDefined: function UI$_applyFlexCSS_fflex_heightDefined(final, cmodel, pmodel, cview, pview) {
                var $K = voltmx.$kwebfw$, $KD = $K.dom;

                $KD.style(cview, 'height', final.height);

                if(final.top && !final.centerY && !final.bottom) {
                    _applyFrame.fflex.heightDefined.withOnlyTop(cmodel, pmodel, cview, pview);
                } else if(final.centerY && !final.top && !final.bottom) {
                    _applyFrame.fflex.heightDefined.withOnlyCenterY(cmodel, pmodel, cview, pview);
                } else if(final.bottom && !final.top && !final.centerY) {
                    _applyFrame.fflex.heightDefined.withOnlyBottom(cmodel, pmodel, cview, pview);
                } else if(final.centerY && final.bottom && !final.top) {
                    _applyFrame.fflex.heightDefined.withCenterYBottom(cmodel, pmodel, cview, pview);
                } else if(final.top && final.bottom && !final.centerY) {
                    _applyFrame.fflex.heightDefined.withTopBottom(cmodel, pmodel, cview, pview);
                }
            },

            heightNotDefined: function UI$_applyFlexCSS_fflex_heightNotDefined(final, cmodel, pmodel, cview, pview) {
                if(final.top && !final.centerY && !final.bottom) {
                    _applyFrame.fflex.heightNotDefined.withOnlyTop(cmodel, pmodel, cview, pview);
                } else if(final.centerY && !final.top && !final.bottom) {
                    _applyFrame.fflex.heightNotDefined.withOnlyCenterY(cmodel, pmodel, cview, pview);
                } else if(final.bottom && !final.top && !final.centerY) {
                    _applyFrame.fflex.heightNotDefined.withOnlyBottom(cmodel, pmodel, cview, pview);
                } else if(final.top && final.centerY && !final.bottom) {
                    _applyFrame.fflex.heightNotDefined.withTopCenterY(cmodel, pmodel, cview, pview);
                } else if(final.centerY && final.bottom && !final.top) {
                    _applyFrame.fflex.heightNotDefined.withCenterYBottom(cmodel, pmodel, cview, pview);
                } else if(final.top && final.bottom && !final.centerY) {
                    _applyFrame.fflex.heightNotDefined.withTopBottom(cmodel, pmodel, cview, pview);
                }
            },

            horizontal: function UI$_applyFlexCSS_fflex_horizontal(cmodel, pmodel, cview, pview, forced, rendered) {
                var $K = voltmx.$kwebfw$, $KW = $K.widget, $KD = $K.dom, final = null;

                final = cmodel._kwebfw_.flex.final = _deduceFinalFlexPropeties.fflex(cmodel, cmodel._kwebfw_.prop, {}, forced, rendered);

                //Populate style object WRT zIndex
                $KD.style(cview, 'zIndex', final.zIndex);

                if(cmodel.reverseLayoutDirection) {
                    if($KW.layout(cmodel) === 'hflex') {
                        $KD.style(cview, 'flexDirection', 'row-reverse');
                    } else if($KW.layout(cmodel) === 'vflex') {
                        $KD.style(cview, 'flexDirection', 'column-reverse');
                    }
                }

                if(!final.width) {
                    _applyFlexCSS.fflex.widthNotDefined(final, cmodel, pmodel, cview, pview);
                } else {
                    _applyFlexCSS.fflex.widthDefined(final, cmodel, pmodel, cview, pview);
                }
            },

            vertical: function UI$_applyFlexCSS_fflex_vertical(cmodel, pmodel, cview, pview/*, forced, rendered*/) {
                var final = cmodel._kwebfw_.flex.final;

                if(!final.height) {
                    _applyFlexCSS.fflex.heightNotDefined(final, cmodel, pmodel, cview, pview);
                } else {
                    _applyFlexCSS.fflex.heightDefined(final, cmodel, pmodel, cview, pview);
                }
            },

            widthDefined: function UI$_applyFlexCSS_fflex_widthDefined(final, cmodel, pmodel, cview, pview) {
                var $K = voltmx.$kwebfw$, $KD = $K.dom;

                $KD.style(cview, 'width', final.width);

                if(final.left && !final.centerX && !final.right) {
                    _applyFrame.fflex.widthDefined.withOnlyLeft(cmodel, pmodel, cview, pview);
                } else if(final.centerX && !final.left && !final.right) {
                    _applyFrame.fflex.widthDefined.withOnlyCenterX(cmodel, pmodel, cview, pview);
                } else if(final.right && !final.left && !final.centerX) {
                    _applyFrame.fflex.widthDefined.withOnlyRight(cmodel, pmodel, cview, pview);
                } else if(final.centerX && final.right && !final.left) {
                    _applyFrame.fflex.widthDefined.withCenterXRight(cmodel, pmodel, cview, pview);
                } else if(final.left && final.right && !final.centerX) {
                    _applyFrame.fflex.widthDefined.withLeftRight(cmodel, pmodel, cview, pview);
                }
            },

            widthNotDefined: function UI$_applyFlexCSS_fflex_widthNotDefined(final, cmodel, pmodel, cview, pview) {
                var $K = voltmx.$kwebfw$, $KW = $K.widget, $KD = $K.dom;

                if(final.left && !final.centerX && !final.right) {
                    $KD.style(cview, 'width', $KW.getDefaultWidth(cmodel));
                    _applyFrame.fflex.widthNotDefined.withOnlyLeft(cmodel, pmodel, cview, pview);
                } else if(final.centerX && !final.left && !final.right) {
                    $KD.style(cview, 'width', $KW.getDefaultWidth(cmodel));
                    _applyFrame.fflex.widthNotDefined.withOnlyCenterX(cmodel, pmodel, cview, pview);
                } else if(final.right && !final.left && !final.centerX) {
                    $KD.style(cview, 'width', $KW.getDefaultWidth(cmodel));
                    _applyFrame.fflex.widthNotDefined.withOnlyRight(cmodel, pmodel, cview, pview);
                } else if(final.left && final.centerX && !final.right) {
                    _applyFrame.fflex.widthNotDefined.withLeftCenterX(cmodel, pmodel, cview, pview);
                } else if(final.centerX && final.right && !final.left) {
                    _applyFrame.fflex.widthNotDefined.withCenterXRight(cmodel, pmodel, cview, pview);
                } else if(final.left && final.right && !final.centerX) {
                    _applyFrame.fflex.widthNotDefined.withLeftRight(cmodel, pmodel, cview, pview);
                }
            }
        },

        hflex: {
            heightDefined: function UI$_applyFlexCSS_hflex_heightDefined(final, cmodel, pmodel, cview, pview) {
                var $K = voltmx.$kwebfw$, $KD = $K.dom;

                $KD.style(cview, 'height', final.height);

                if(final.top && !final.centerY && !final.bottom) {
                    _applyFrame.hflex.heightDefined.withOnlyTop(cmodel, pmodel, cview, pview);
                } else if(final.centerY && !final.top && !final.bottom) {
                    _applyFrame.hflex.heightDefined.withOnlyCenterY(cmodel, pmodel, cview, pview);
                } else if(final.bottom && !final.top && !final.centerY) {
                    _applyFrame.hflex.heightDefined.withOnlyBottom(cmodel, pmodel, cview, pview);
                } else if(final.centerY && final.bottom && !final.top) {
                    _applyFrame.hflex.heightDefined.withCenterYBottom(cmodel, pmodel, cview, pview);
                } else if(final.top && final.bottom && !final.centerY) {
                    _applyFrame.hflex.heightDefined.withTopBottom(cmodel, pmodel, cview, pview);
                }
            },

            heightNotDefined: function UI$_applyFlexCSS_hflex_heightNotDefined(final, cmodel, pmodel, cview, pview) {
                if(final.top && !final.centerY && !final.bottom) {
                    _applyFrame.hflex.heightNotDefined.withOnlyTop(cmodel, pmodel, cview, pview);
                } else if(final.centerY && !final.top && !final.bottom) {
                    _applyFrame.hflex.heightNotDefined.withOnlyCenterY(cmodel, pmodel, cview, pview);
                } else if(final.bottom && !final.top && !final.centerY) {
                    _applyFrame.hflex.heightNotDefined.withOnlyBottom(cmodel, pmodel, cview, pview);
                } else if(final.top && final.centerY && !final.bottom) {
                    _applyFrame.hflex.heightNotDefined.withTopCenterY(cmodel, pmodel, cview, pview);
                } else if(final.centerY && final.bottom && !final.top) {
                    _applyFrame.hflex.heightNotDefined.withCenterYBottom(cmodel, pmodel, cview, pview);
                } else if(final.top && final.bottom && !final.centerY) {
                    _applyFrame.hflex.heightNotDefined.withTopBottom(cmodel, pmodel, cview, pview);
                }
            },

            horizontal: function UI$_applyFlexCSS_hflex_horizontal(cmodel, pmodel, cview, pview, forced, rendered) {
                var $K = voltmx.$kwebfw$, $KW = $K.widget, $KD = $K.dom, final = null;

                final = cmodel._kwebfw_.flex.final = _deduceFinalFlexPropeties.hflex(cmodel, cmodel._kwebfw_.prop, {}, forced, rendered);

                //Populate style object WRT zIndex
                $KD.style(cview, 'zIndex', final.zIndex);

                if(cmodel.reverseLayoutDirection) {
                    if($KW.layout(cmodel) === 'hflex') {
                        $KD.style(cview, 'flexDirection', 'row-reverse');
                    } else if($KW.layout(cmodel) === 'vflex') {
                        $KD.style(cview, 'flexDirection', 'column-reverse');
                    }
                }

                if(!final.width) {
                    _applyFlexCSS.hflex.widthNotDefined(final, cmodel, pmodel, cview, pview);
                } else {
                    _applyFlexCSS.hflex.widthDefined(final, cmodel, pmodel, cview, pview);
                }
            },

            vertical: function UI$_applyFlexCSS_hflex_vertical(cmodel, pmodel, cview, pview/*, forced, rendered*/) {
                var final = cmodel._kwebfw_.flex.final;

                if(!final.height) {
                    _applyFlexCSS.hflex.heightNotDefined(final, cmodel, pmodel, cview, pview);
                } else {
                    _applyFlexCSS.hflex.heightDefined(final, cmodel, pmodel, cview, pview);
                }
            },

            widthDefined: function UI$_applyFlexCSS_hflex_widthDefined(final, cmodel, pmodel, cview, pview) {
                var $K = voltmx.$kwebfw$, $KD = $K.dom;

                $KD.style(cview, 'width', final.width);

                if(final.left && !final.centerX && !final.right) {
                    _applyFrame.hflex.widthDefined.withOnlyLeft(cmodel, pmodel, cview, pview);
                } else if(final.centerX && !final.left && !final.right) {
                    _applyFrame.hflex.widthDefined.withOnlyCenterX(cmodel, pmodel, cview, pview);
                } else if(final.centerX && final.right && !final.left) {
                    _applyFrame.hflex.widthDefined.withCenterXRight(cmodel, pmodel, cview, pview);
                } else if(final.left && final.right && !final.centerX) {
                    _applyFrame.hflex.widthDefined.withLeftRight(cmodel, pmodel, cview, pview);
                }
            },

            widthNotDefined: function UI$_applyFlexCSS_hflex_widthNotDefined(final, cmodel, pmodel, cview, pview) {
                var $K = voltmx.$kwebfw$, $KW = $K.widget, $KD = $K.dom;

                $KD.style(cview, 'width', $KW.getDefaultWidth(cmodel));

                if(final.left && !final.centerX && !final.right) {
                    _applyFrame.hflex.widthNotDefined.withOnlyLeft(cmodel, pmodel, cview, pview);
                } else if(final.centerX && !final.left && !final.right) {
                    _applyFrame.hflex.widthNotDefined.withOnlyCenterX(cmodel, pmodel, cview, pview);
                } else if(final.left && final.centerX && !final.right) {
                    _applyFrame.hflex.widthNotDefined.withLeftCenterX(cmodel, pmodel, cview, pview);
                } else if(final.centerX && final.right && !final.left) {
                    _applyFrame.hflex.widthNotDefined.withCenterXRight(cmodel, pmodel, cview, pview);
                } else if(final.left && final.right && !final.centerX) {
                    _applyFrame.hflex.widthNotDefined.withLeftRight(cmodel, pmodel, cview, pview);
                }
            }
        },

        rflex: {
            //eslint-disable-next-line no-unused-vars
            heightDefined: function UI$_applyFlexCSS_rflex_heightDefined(final, cmodel, pmodel, cview/*, pview*/) {
                var $K = voltmx.$kwebfw$, $KD = $K.dom;

                //set margin-top  for vertical spacing(gutterY)
                $KD.style(cview, 'margin-top', final.gutterY);

                //set calculated height
                $KD.style(cview, 'height', final.height);
            },

            //eslint-disable-next-line no-unused-vars
            heightNotDefined: function UI$_applyFlexCSS_rflex_heightNotDefined(final, cmodel, pmodel, cview/*, pview*/) {
                var $K = voltmx.$kwebfw$, $KD = $K.dom;

                //set margin-top  for vertical spacing(gutterY)
                $KD.style(cview, 'margin-top', final.gutterY);
            },

            horizontal: function UI$_applyFlexCSS_rflex_horizontal(cmodel, pmodel, cview, pview, forced, rendered) {
                var $K = voltmx.$kwebfw$, $KD = $K.dom, final = null;

                final = cmodel._kwebfw_.flex.final = _deduceFinalFlexPropeties.rflex(cmodel, cmodel._kwebfw_.prop, {}, forced, rendered);

                //Populate style object WRT zIndex
                $KD.style(cview, 'zIndex', final.zIndex);

                //width will be always in case of rflex.
                _applyFlexCSS.rflex.widthDefined(final, cmodel, pmodel, cview, pview);
            },

            vertical: function UI$_applyFlexCSS_rflex_vertical(cmodel, pmodel, cview, pview/*, forced, rendered*/) {
                var final = cmodel._kwebfw_.flex.final;

                if(!final.height) {
                    _applyFlexCSS.rflex.heightNotDefined(final, cmodel, pmodel, cview, pview);
                } else {
                    _applyFlexCSS.rflex.heightDefined(final, cmodel, pmodel, cview, pview);
                }
            },

            //eslint-disable-next-line no-unused-vars
            widthDefined: function UI$_applyFlexCSS_rflex_widthDefined(final, cmodel, pmodel, cview/*, pview*/) {
                var $K = voltmx.$kwebfw$, $KD = $K.dom, calcMarginLeft = '', calcMarginRight = '',
                    calcWidthWithGutterX = '';

                if(final.gutterX) {
                    //Get margin-left by adding gutterX and offset
                    calcMarginLeft = 'calc(' + final.gutterX +' + ' + final.offset + ')';
                    calcMarginRight = final.gutterX;

                    //As spacing should be in the given width, calculate width by reducing the
                    //gutterX * 2(margin left and right) from the final width
                    calcWidthWithGutterX = 'calc('+final.width +' - calc(2 * ' +final.gutterX +'))';
                } else {
                    calcMarginLeft = final.offset;
                    calcMarginRight = '0px';
                    calcWidthWithGutterX = final.width;
                }

                //set margin-left and right for horizontal spacing(gutterX)
                $KD.style(cview, 'margin-left', calcMarginLeft);
                $KD.style(cview, 'margin-right', calcMarginRight);

                //set the calculated width
                $KD.style(cview, 'width', calcWidthWithGutterX);

                //width is not maintaining in flex if it is more than 100%
                $KD.style(cview, 'min-width', calcWidthWithGutterX);
            },

            widthNotDefined: function UI$_applyFlexCSS_rflex_widthNotDefined(/*final, cmodel, pmodel, cview, pview*/) {
                //
            }
        },

        vflex: {
            heightDefined: function UI$_applyFlexCSS_vflex_heightDefined(final, cmodel, pmodel, cview, pview) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget, $KD = $K.dom,
                    _ = cmodel._kwebfw_, is = _.is, omodel = null, pnode = null;

                if(!pmodel && is.template && is.cloned && _.oid) {
                    omodel = $KW.omodel(cmodel);
                    pnode = $KD.parent(cview);

                    if(!pnode) {
                        $KD.style(cview, 'height', final.height);
                    } else {
                        if($KU.is(omodel, 'widget', 'SegmentedUI2')) {
                            $KD.style(cview, 'height', '100%');
                            $KD.style(pnode, 'height', final.height); //Here pnode.tagName === 'LI'
                        } else if($KU.is(omodel, 'widget', 'DataGrid')) {
                            $KD.style(cview, 'height', '100%');
                            $KD.style(pnode, 'height', '100%'); //Here pnode.tagName === 'TD'/'TH'
                            pnode = $KD.parent(pnode); //Here pnode.tagName === 'TR'
                            $KD.style(pnode, 'height', final.height);
                        } else { //For all other owner widgets
                            $KD.style(cview, 'height', final.height);
                        }
                    }
                } else {
                    $KD.style(cview, 'height', final.height);
                }

                if(final.top && !final.centerY && !final.bottom) {
                    _applyFrame.vflex.heightDefined.withOnlyTop(cmodel, pmodel, cview, pview);
                } else if(final.centerY && !final.top && !final.bottom) {
                    _applyFrame.vflex.heightDefined.withOnlyCenterY(cmodel, pmodel, cview, pview);
                } else if(final.centerY && final.bottom && !final.top) {
                    _applyFrame.vflex.heightDefined.withCenterYBottom(cmodel, pmodel, cview, pview);
                } else if(final.top && final.bottom && !final.centerY) {
                    _applyFrame.vflex.heightDefined.withTopBottom(cmodel, pmodel, cview, pview);
                }
            },

            heightNotDefined: function UI$_applyFlexCSS_vflex_heightNotDefined(final, cmodel, pmodel, cview, pview) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget, $KD = $K.dom,
                    _ = cmodel._kwebfw_, is = _.is, omodel = null, pnode = null;

                if(!pmodel && is.template && is.cloned && _.oid) {
                    omodel = $KW.omodel(cmodel);
                    pnode = $KD.parent(cview);

                    if(pnode) {
                        if($KU.is(omodel, 'widget', 'SegmentedUI2')) {
                            $KD.style(pnode, 'height', null); //Here pnode.tagName === 'LI'
                        } else if($KU.is(omodel, 'widget', 'DataGrid')) {
                            $KD.style(pnode, 'height', null); //Here pnode.tagName === 'TD'/'TH'
                            pnode = $KD.parent(pnode); //Here pnode.tagName === 'TR'
                            $KD.style(pnode, 'height', null);
                        }
                    }
                }

                if(final.top && !final.centerY && !final.bottom) {
                    _applyFrame.vflex.heightNotDefined.withOnlyTop(cmodel, pmodel, cview, pview);
                } else if(final.centerY && !final.top && !final.bottom) {
                    _applyFrame.vflex.heightNotDefined.withOnlyCenterY(cmodel, pmodel, cview, pview);
                } else if(final.top && final.centerY && !final.bottom) {
                    _applyFrame.vflex.heightNotDefined.withTopCenterY(cmodel, pmodel, cview, pview);
                } else if(final.centerY && final.bottom && !final.top) {
                    _applyFrame.vflex.heightNotDefined.withCenterYBottom(cmodel, pmodel, cview, pview);
                } else if(final.top && final.bottom && !final.centerY) {
                    _applyFrame.vflex.heightNotDefined.withTopBottom(cmodel, pmodel, cview, pview);
                }
            },

            horizontal: function UI$_applyFlexCSS_vflex_horizontal(cmodel, pmodel, cview, pview, forced, rendered) {
                var $K = voltmx.$kwebfw$, $KW = $K.widget, $KD = $K.dom, final = null;

                final = cmodel._kwebfw_.flex.final = _deduceFinalFlexPropeties.vflex(cmodel, cmodel._kwebfw_.prop, {}, forced, rendered);

                //Populate style object WRT zIndex
                $KD.style(cview, 'zIndex', final.zIndex);

                if(cmodel.reverseLayoutDirection) {
                    if($KW.layout(cmodel) === 'hflex') {
                        $KD.style(cview, 'flexDirection', 'row-reverse');
                    } else if($KW.layout(cmodel) === 'vflex') {
                        $KD.style(cview, 'flexDirection', 'column-reverse');
                    }
                }

                if(!final.width) {
                    _applyFlexCSS.vflex.widthNotDefined(final, cmodel, pmodel, cview, pview);
                } else {
                    _applyFlexCSS.vflex.widthDefined(final, cmodel, pmodel, cview, pview);
                }
            },

            vertical: function UI$_applyFlexCSS_vflex_vertical(cmodel, pmodel, cview, pview/*, forced, rendered*/) {
                var final = cmodel._kwebfw_.flex.final;

                if(!final.height) {
                    _applyFlexCSS.vflex.heightNotDefined(final, cmodel, pmodel, cview, pview);
                } else {
                    _applyFlexCSS.vflex.heightDefined(final, cmodel, pmodel, cview, pview);
                }
            },

            widthDefined: function UI$_applyFlexCSS_vflex_widthDefined(final, cmodel, pmodel, cview, pview) {
                var $K = voltmx.$kwebfw$, $KD = $K.dom;

                $KD.style(cview, 'width', final.width);

                if(final.left && !final.centerX && !final.right) {
                    _applyFrame.vflex.widthDefined.withOnlyLeft(cmodel, pmodel, cview, pview);
                } else if(final.centerX && !final.left && !final.right) {
                    _applyFrame.vflex.widthDefined.withOnlyCenterX(cmodel, pmodel, cview, pview);
                } else if(final.right && !final.left && !final.centerX) {
                    _applyFrame.vflex.widthDefined.withOnlyRight(cmodel, pmodel, cview, pview);
                } else if(final.centerX && final.right && !final.left) {
                    _applyFrame.vflex.widthDefined.withCenterXRight(cmodel, pmodel, cview, pview);
                } else if(final.left && final.right && !final.centerX) {
                    _applyFrame.vflex.widthDefined.withLeftRight(cmodel, pmodel, cview, pview);
                }
            },

            widthNotDefined: function UI$_applyFlexCSS_vflex_widthNotDefined(final, cmodel, pmodel, cview, pview) {
                var $K = voltmx.$kwebfw$, $KW = $K.widget, $KD = $K.dom;

                $KD.style(cview, 'width', $KW.getDefaultWidth(cmodel));

                if(final.left && !final.centerX && !final.right) {
                    _applyFrame.vflex.widthNotDefined.withOnlyLeft(cmodel, pmodel, cview, pview);
                } else if(final.centerX && !final.left && !final.right) {
                    _applyFrame.vflex.widthNotDefined.withOnlyCenterX(cmodel, pmodel, cview, pview);
                } else if(final.right && !final.left && !final.centerX) {
                    _applyFrame.vflex.widthNotDefined.withOnlyRight(cmodel, pmodel, cview, pview);
                } else if(final.left && final.centerX && !final.right) {
                    _applyFrame.vflex.widthNotDefined.withLeftCenterX(cmodel, pmodel, cview, pview);
                } else if(final.centerX && final.right && !final.left) {
                    _applyFrame.vflex.widthNotDefined.withCenterXRight(cmodel, pmodel, cview, pview);
                } else if(final.left && final.right && !final.centerX) {
                    _applyFrame.vflex.widthNotDefined.withLeftRight(cmodel, pmodel, cview, pview);
                }
            }
        }
    };


    //This function must be called in the scope of widget instance
    var _applyFlexRule = function UI$_applyFlexRule(playout, direction, view, forced, rendered) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget,
            $KD = $K.dom, horizontalFn = null, verticalFn = null, pview = null,
            cmodel = this, cview = view || cmodel._kwebfw_.view,
            pmodel = $KW.pmodel(cmodel), cfinal = null;

        if(cview) {
            pview = ($KU.is(pmodel, 'widget')) ? pmodel._kwebfw_.view : null;

            if(direction === 'horizontal') {
                _cleanFlexCSS(cmodel, cview, pview);
                horizontalFn = _applyFlexCSS[playout].horizontal;
                horizontalFn(cmodel, pmodel, cview, pview, forced, rendered);

                cfinal = cmodel._kwebfw_.flex.final;
                if(cfinal.minWidth) $KD.style(cview, 'minWidth', cfinal.minWidth);
                if(cfinal.maxWidth) $KD.style(cview, 'maxWidth', cfinal.maxWidth);

                if($KW.isTextDrivenWidget(cmodel)) {
                    if($KW.isFixedWidth(cmodel)) {
                        $KD.style(cview, 'whiteSpace', 'pre-wrap');
                    } else {
                        $KD.style(cview, 'whiteSpace', 'nowrap');
                    }
                }
            } else if(direction === 'vertical') {
                verticalFn = _applyFlexCSS[playout].vertical;
                verticalFn(cmodel, pmodel, cview, pview, forced, rendered);

                cfinal = cmodel._kwebfw_.flex.final;
                if(cfinal.minHeight) $KD.style(cview, 'minHeight', cfinal.minHeight);
                if(cfinal.maxHeight) $KD.style(cview, 'maxHeight', cfinal.maxHeight);

                _flagForMutate(cmodel, cview);
            }
        }
    };


    var _applyFrame = {
        fflex: {
            heightDefined: {
                //eslint-disable-next-line no-unused-vars
                withOnlyTop: function UI$_applyFrame_fflex_heightDefined_withOnlyTop(cmodel, pmodel, cview/*, pview*/) {
                    var $K = voltmx.$kwebfw$, $KD = $K.dom;

                    $KD.style(cview, 'top', cmodel._kwebfw_.flex.final.top);
                },

                //eslint-disable-next-line no-unused-vars
                withOnlyCenterY: function UI$_applyFrame_fflex_heightDefined_withOnlyCenterY(cmodel, pmodel, cview/*, pview*/) {
                    var $K = voltmx.$kwebfw$, $KD = $K.dom,
                        calc = '', final = cmodel._kwebfw_.flex.final;

                    calc = ('calc('+final.centerY+' - '+final.height+'/2)');
                    $KD.style(cview, 'top', calc);
                },

                //eslint-disable-next-line no-unused-vars
                withOnlyBottom: function UI$_applyFrame_fflex_heightDefined_withOnlyBottom(cmodel, pmodel, cview/*, pview*/) {
                    var $K = voltmx.$kwebfw$, $KD = $K.dom;

                    $KD.style(cview, 'bottom', cmodel._kwebfw_.flex.final.bottom);
                },

                //eslint-disable-next-line no-unused-vars
                withCenterYBottom: function UI$_applyFrame_fflex_heightDefined_withCenterYBottom(cmodel, pmodel, cview/*, pview*/) {
                    var $K = voltmx.$kwebfw$, $KD = $K.dom,
                        calc = '', final = cmodel._kwebfw_.flex.final;

                    calc = ('calc('+final.centerY+' - '+final.height+'/2)');
                    $KD.style(cview, 'top', calc);
                    $KD.style(cview, 'bottom', final.bottom);
                },

                //eslint-disable-next-line no-unused-vars
                withTopBottom: function UI$_applyFrame_fflex_heightDefined_withTopBottom(cmodel, pmodel, cview/*, pview*/) {
                    var $K = voltmx.$kwebfw$, $KD = $K.dom, final = cmodel._kwebfw_.flex.final;

                    $KD.style(cview, 'top', final.top);
                    $KD.style(cview, 'bottom', final.bottom);
                }
            },

            heightNotDefined: {
                //eslint-disable-next-line no-unused-vars
                withOnlyTop: function UI$_applyFrame_fflex_heightNotDefined_withOnlyTop(cmodel, pmodel, cview/*, pview*/) {
                    var $K = voltmx.$kwebfw$, $KD = $K.dom;

                    $KD.style(cview, 'top', cmodel._kwebfw_.flex.final.top);
                },

                //eslint-disable-next-line no-unused-vars
                withOnlyCenterY: function UI$_applyFrame_fflex_heightNotDefined_withOnlyCenterY(cmodel, pmodel, cview/*, pview*/) {
                    _flagForMeasure(cmodel._kwebfw_.uid, 'centerY', 'vertical', cview);
                },

                //eslint-disable-next-line no-unused-vars
                withOnlyBottom: function UI$_applyFrame_fflex_heightNotDefined_withOnlyBottom(cmodel, pmodel, cview/*, pview*/) {
                    var $K = voltmx.$kwebfw$, $KD = $K.dom;

                    $KD.style(cview, 'bottom', cmodel._kwebfw_.flex.final.bottom);
                },

                //eslint-disable-next-line no-unused-vars
                withTopCenterY: function UI$_applyFrame_fflex_heightNotDefined_withTopCenterY(cmodel, pmodel, cview/*, pview*/) {
                    var $K = voltmx.$kwebfw$, $KD = $K.dom, calc = '',
                        final = cmodel._kwebfw_.flex.final;

                    $KD.style(cview, 'top', final.top);
                    calc = 'calc(('+final.centerY+' - '+final.top+')*2)';
                    $KD.style(cview, 'height', calc);

                    if(final.minHeight || final.maxHeight) {
                        _flagForMeasure(cmodel._kwebfw_.uid, 'centerY', 'vertical', cview);
                    }
                },

                //eslint-disable-next-line no-unused-vars
                withCenterYBottom: function UI$_applyFrame_fflex_heightNotDefined_withCenterYBottom(cmodel, pmodel, cview/*, pview*/) {
                    var $K = voltmx.$kwebfw$, $KD = $K.dom, calc = '',
                        final = cmodel._kwebfw_.flex.final;

                    $KD.style(cview, 'bottom', final.bottom);
                    calc = 'calc(('+ '100% - ' + final.centerY+' - '+final.bottom+')*2)';
                    $KD.style(cview, 'height', calc);

                    if(final.minHeight || final.maxHeight) {
                        _flagForMeasure(cmodel._kwebfw_.uid, 'centerY', 'vertical', cview, null, true);
                    }
                },

                //eslint-disable-next-line no-unused-vars
                withTopBottom: function UI$_applyFrame_fflex_heightNotDefined_withTopBottom(cmodel, pmodel, cview/*, pview*/) {
                    var $K = voltmx.$kwebfw$, $KU = $K.utils,
                        $KD = $K.dom, final = cmodel._kwebfw_.flex.final;

                    $KD.style(cview, 'top', final.top);
                    $KD.style(cview, 'bottom', final.bottom);

                    if($KU.is(cmodel, 'widget', 'TextBox2')
                    || $KU.is(cmodel, 'widget', 'ListBox')
                    || $KU.is(cmodel, 'widget', 'Button')) {
                        $KD.style(cview, 'height', ('calc(100% - '+final.top+' - '+final.bottom+')'));
                    }
                }
            },

            widthDefined: {

                //eslint-disable-next-line no-unused-vars
                withOnlyLeft: function UI$_applyFrame_fflex_widthDefined_withOnlyLeft(cmodel, pmodel, cview/*, pview*/) {
                    var $K = voltmx.$kwebfw$, $KD = $K.dom;

                    $KD.style(cview, 'left', cmodel._kwebfw_.flex.final.left);
                },

                //eslint-disable-next-line no-unused-vars
                withOnlyCenterX: function UI$_applyFrame_fflex_widthDefined_withOnlyCenterX(cmodel, pmodel, cview/*, pview*/) {
                    var $K = voltmx.$kwebfw$, $KD = $K.dom,
                        calc = '', final = cmodel._kwebfw_.flex.final;

                    calc = ('calc('+final.centerX+' - '+final.width+'/2)');
                    $KD.style(cview, 'left', calc);
                },

                //eslint-disable-next-line no-unused-vars
                withOnlyRight: function UI$_applyFrame_fflex_widthDefined_withOnlyRight(cmodel, pmodel, cview/*, pview*/) {
                    var $K = voltmx.$kwebfw$, $KD = $K.dom;

                    $KD.style(cview, 'right', cmodel._kwebfw_.flex.final.right);
                },

                //eslint-disable-next-line no-unused-vars
                withCenterXRight: function UI$_applyFrame_fflex_widthDefined_withCenterXRight(cmodel, pmodel, cview/*, pview*/) {
                    var $K = voltmx.$kwebfw$, $KD = $K.dom,
                        calc = '', final = cmodel._kwebfw_.flex.final;

                    calc = ('calc('+final.centerX+' - '+final.width+'/2)');
                    $KD.style(cview, 'left', calc);
                    $KD.style(cview, 'right', final.right);
                },

                //eslint-disable-next-line no-unused-vars
                withLeftRight: function UI$_applyFrame_fflex_widthDefined_withLeftRight(cmodel, pmodel, cview/*, pview*/) {
                    var $K = voltmx.$kwebfw$, $KD = $K.dom, final = cmodel._kwebfw_.flex.final;

                    $KD.style(cview, 'left', final.left);
                    $KD.style(cview, 'right', final.right);
                }
            },

            widthNotDefined: {
                //eslint-disable-next-line no-unused-vars
                withOnlyLeft: function UI$_applyFrame_fflex_widthNotDefined_withOnlyLeft(cmodel, pmodel, cview/*, pview*/) {
                    var $K = voltmx.$kwebfw$, $KD = $K.dom;

                    $KD.style(cview, 'left', cmodel._kwebfw_.flex.final.left);
                },

                //eslint-disable-next-line no-unused-vars
                withOnlyCenterX: function UI$_applyFrame_fflex_widthNotDefined_withOnlyCenterX(cmodel, pmodel, cview/*, pview*/) {
                    _flagForMeasure(cmodel._kwebfw_.uid, 'centerX', 'horizontal', cview);
                },

                //eslint-disable-next-line no-unused-vars
                withOnlyRight: function UI$_applyFrame_fflex_widthNotDefined_withOnlyRight(cmodel, pmodel, cview/*, pview*/) {
                    var $K = voltmx.$kwebfw$, $KD = $K.dom;

                    $KD.style(cview, 'right', cmodel._kwebfw_.flex.final.right);
                },

                //eslint-disable-next-line no-unused-vars
                withLeftCenterX: function UI$_applyFrame_fflex_widthNotDefined_withLeftCenterX(cmodel, pmodel, cview/*, pview*/) {
                    var $K = voltmx.$kwebfw$, $KD = $K.dom, calc = '',
                        final = cmodel._kwebfw_.flex.final;

                    $KD.style(cview, 'left', final.left);
                    calc = 'calc(('+final.centerX+' - '+final.left+')*2)';
                    $KD.style(cview, 'width', calc);

                    if(final.minWidth || final.maxWidth) {
                        _flagForMeasure(cmodel._kwebfw_.uid, 'centerX', 'horizontal', cview);
                    }
                },

                //eslint-disable-next-line no-unused-vars
                withCenterXRight: function UI$_applyFrame_fflex_widthNotDefined_withCenterXRight(cmodel, pmodel, cview/*, pview*/) {
                    var $K = voltmx.$kwebfw$, $KD = $K.dom, calc = '',
                        final = cmodel._kwebfw_.flex.final;

                    $KD.style(cview, 'right', final.right);
                    calc = 'calc(('+'100% - ' + final.centerX+' - '+final.right+')*2)';
                    $KD.style(cview, 'width', calc);

                    if(final.minWidth || final.maxWidth) {
                        _flagForMeasure(cmodel._kwebfw_.uid, 'centerX', 'horizontal', cview, null, true);
                    }
                },

                //eslint-disable-next-line no-unused-vars
                withLeftRight: function UI$_applyFrame_fflex_widthNotDefined_withLeftRight(cmodel, pmodel, cview/*, pview*/) {
                    var $K = voltmx.$kwebfw$, $KU = $K.utils,
                        $KD = $K.dom, final = cmodel._kwebfw_.flex.final;

                    $KD.style(cview, 'left', final.left);
                    $KD.style(cview, 'right', final.right);

                    if($KU.is(cmodel, 'widget', 'TextBox2')
                    || $KU.is(cmodel, 'widget', 'ListBox')
                    || $KU.is(cmodel, 'widget', 'Button')) {
                        $KD.style(cview, 'width', ('calc(100% - '+final.left+' - '+final.right+')'));
                    }
                }
            }
        },

        hflex: {
            heightDefined: {
                //Exactly same as that of UI$_applyFrame_hflex_heightNotDefined_withOnlyTop
                //eslint-disable-next-line no-unused-vars
                withOnlyTop: function UI$_applyFrame_hflex_heightDefined_withOnlyTop(cmodel, pmodel, cview/*, pview*/) {
                    var $K = voltmx.$kwebfw$, $KW = $K.widget, $KD = $K.dom,
                        final = cmodel._kwebfw_.flex.final, property = 'marginTop';

                    if($KW.inPercent(final.top)) property = 'top';

                    $KD.style(cview, property, final.top);
                },

                //eslint-disable-next-line no-unused-vars
                withOnlyCenterY: function UI$_applyFrame_hflex_heightDefined_withOnlyCenterY(cmodel, pmodel, cview/*, pview*/) {
                    var $K = voltmx.$kwebfw$, $KW = $K.widget, $KD = $K.dom, calc = '',
                        final = cmodel._kwebfw_.flex.final, property = 'marginTop';

                    if($KW.inPercent(final.centerY)
                    || $KW.inPercent(final.height)) {
                        property = 'top';
                    }

                    calc = ('calc('+final.centerY+' - '+final.height+'/2)');
                    $KD.style(cview, property, calc);
                },

                //Exactly same as that of UI$_applyFrame_hflex_heightNotDefined_withOnlyBottom
                //eslint-disable-next-line no-unused-vars
                withOnlyBottom: function UI$_applyFrame_hflex_heightDefined_withOnlyBottom(cmodel, pmodel, cview/*, pview*/) {
                    var $K = voltmx.$kwebfw$, $KW = $K.widget, $KD = $K.dom,
                        final = cmodel._kwebfw_.flex.final, property = 'marginBottom';

                    if($KW.inPercent(final.bottom)) {
                        property = 'bottom';
                        $KD.style(cview, 'top', 'auto');
                    } else {
                        $KD.style(cview, 'marginTop', 'auto');
                    }

                    $KD.style(cview, property, final.bottom);
                    $KD.style(cview, 'alignSelf', 'flex-end');
                },

                //Exactly same (except centerY) as that of UI$_applyFrame_hflex_heightNotDefined_withCenterYBottom
                //eslint-disable-next-line no-unused-vars
                withCenterYBottom: function UI$_applyFrame_hflex_heightDefined_withCenterYBottom(cmodel, pmodel, cview/*, pview*/) {
                    var $K = voltmx.$kwebfw$, $KW = $K.widget, $KD = $K.dom, calc = '',
                        final = cmodel._kwebfw_.flex.final, property = 'marginTop';

                    if($KW.inPercent(final.centerY)
                    || $KW.inPercent(final.height)) {
                        property = 'top';
                    }

                    calc = ('calc('+final.centerY+' - '+final.height+'/2)');
                    $KD.style(cview, property, calc);

                    property = ($KW.inPercent(final.bottom)) ? 'bottom' : 'marginBottom';
                    $KD.style(cview, property, final.bottom);
                },

                //Exactly same as that of UI$_applyFrame_hflex_heightNotDefined_withTopBottom
                //eslint-disable-next-line no-unused-vars
                withTopBottom: function UI$_applyFrame_hflex_heightDefined_withTopBottom(cmodel, pmodel, cview/*, pview*/) {
                    var $K = voltmx.$kwebfw$, $KW = $K.widget, $KD = $K.dom,
                        final = cmodel._kwebfw_.flex.final, property = '';

                    property = ($KW.inPercent(final.top)) ? 'top' : 'marginTop';
                    $KD.style(cview, property, final.top);

                    property = ($KW.inPercent(final.bottom)) ? 'bottom' : 'marginBottom';
                    $KD.style(cview, property, final.bottom);
                }
            },

            heightNotDefined: {
                //Exactly same as that of UI$_applyFrame_hflex_heightDefined_withOnlyTop
                //eslint-disable-next-line no-unused-vars
                withOnlyTop: function UI$_applyFrame_hflex_heightNotDefined_withOnlyTop(cmodel, pmodel, cview/*, pview*/) {
                    var $K = voltmx.$kwebfw$, $KW = $K.widget, $KD = $K.dom,
                        final = cmodel._kwebfw_.flex.final, property = 'marginTop';

                    if($KW.inPercent(final.top)) property = 'top';

                    $KD.style(cview, property, final.top);
                },

                //eslint-disable-next-line no-unused-vars
                withOnlyCenterY: function UI$_applyFrame_hflex_heightNotDefined_withOnlyCenterY(cmodel, pmodel, cview/*, pview*/) {
                    _flagForMeasure(cmodel._kwebfw_.uid, 'centerY', 'vertical', cview);
                },

                //Exactly same as that of UI$_applyFrame_hflex_heightDefined_withOnlyBottom
                //eslint-disable-next-line no-unused-vars
                withOnlyBottom: function UI$_applyFrame_hflex_heightNotDefined_withOnlyBottom(cmodel, pmodel, cview/*, pview*/) {
                    var $K = voltmx.$kwebfw$, $KW = $K.widget, $KD = $K.dom,
                        final = cmodel._kwebfw_.flex.final, property = 'marginBottom';

                    if($KW.inPercent(final.bottom)) {
                        property = 'bottom';
                        $KD.style(cview, 'top', 'auto');
                    } else {
                        $KD.style(cview, 'marginTop', 'auto');
                    }

                    $KD.style(cview, property, final.bottom);
                    $KD.style(cview, 'alignSelf', 'flex-end');
                },

                //Exactly same (except centerY) as that of UI$_applyFrame_hflex_heightDefined_withCenterYBottom
                //eslint-disable-next-line no-unused-vars
                withCenterYBottom: function UI$_applyFrame_hflex_heightNotDefined_withCenterYBottom(cmodel, pmodel, cview/*, pview*/) {
                    var $K = voltmx.$kwebfw$, $KW = $K.widget, $KD = $K.dom,
                        final = cmodel._kwebfw_.flex.final, property = '';

                    property = ($KW.inPercent(final.bottom)) ? 'bottom' : 'marginBottom';
                    $KD.style(cview, property, final.bottom);

                    _flagForMeasure(cmodel._kwebfw_.uid, 'centerY', 'vertical', cview);
                },

                //Exactly same as that of UI$_applyFrame_hflex_heightDefined_withTopBottom
                //eslint-disable-next-line no-unused-vars
                withTopBottom: function UI$_applyFrame_hflex_heightNotDefined_withTopBottom(cmodel, pmodel, cview/*, pview*/) {
                    var $K = voltmx.$kwebfw$, $KW = $K.widget, $KD = $K.dom,
                        final = cmodel._kwebfw_.flex.final, property = '';

                    property = ($KW.inPercent(final.top)) ? 'top' : 'marginTop';
                    $KD.style(cview, property, final.top);

                    property = ($KW.inPercent(final.bottom)) ? 'bottom' : 'marginBottom';
                    $KD.style(cview, property, final.bottom);
                }
            },

            widthDefined: {
                //eslint-disable-next-line no-unused-vars
                withOnlyLeft: function UI$_applyFrame_hflex_widthDefined_withOnlyLeft(cmodel, pmodel, cview/*, pview*/) {
                    var $K = voltmx.$kwebfw$, $KD = $K.dom;

                    $KD.style(cview, 'marginLeft', cmodel._kwebfw_.flex.final.left);
                },

                //eslint-disable-next-line no-unused-vars
                withOnlyCenterX: function UI$_applyFrame_hflex_widthDefined_withOnlyCenterX(cmodel, pmodel, cview/*, pview*/) {
                    var $K = voltmx.$kwebfw$, $KD = $K.dom,
                        calc = '', final = cmodel._kwebfw_.flex.final;

                    calc = ('calc('+final.centerX+' - '+final.width+'/2)');
                    $KD.style(cview, 'marginLeft', calc);
                },

                //eslint-disable-next-line no-unused-vars
                withCenterXRight: function UI$_applyFrame_hflex_widthDefined_withCenterXRight(cmodel, pmodel, cview/*, pview*/) {
                    var $K = voltmx.$kwebfw$, $KD = $K.dom,
                        calc = '', final = cmodel._kwebfw_.flex.final;

                    calc = ('calc('+final.centerX+' - '+final.width+'/2)');
                    $KD.style(cview, 'marginLeft', calc);
                    $KD.style(cview, 'marginRight', final.right);
                },

                //eslint-disable-next-line no-unused-vars
                withLeftRight: function UI$_applyFrame_hflex_widthDefined_withLeftRight(cmodel, pmodel, cview/*, pview*/) {
                    var $K = voltmx.$kwebfw$, $KD = $K.dom, final = cmodel._kwebfw_.flex.final;

                    $KD.style(cview, 'marginLeft', final.left);
                    $KD.style(cview, 'marginRight', final.right);
                }
            },

            widthNotDefined: {
                //eslint-disable-next-line no-unused-vars
                withOnlyLeft: function UI$_applyFrame_hflex_widthNotDefined_withOnlyLeft(cmodel, pmodel, cview/*, pview*/) {
                    var $K = voltmx.$kwebfw$, $KD = $K.dom;

                    $KD.style(cview, 'marginLeft', cmodel._kwebfw_.flex.final.left);
                },

                //eslint-disable-next-line no-unused-vars
                withOnlyCenterX: function UI$_applyFrame_hflex_widthNotDefined_withOnlyCenterX(cmodel, pmodel, cview/*, pview*/) {
                    _flagForMeasure(cmodel._kwebfw_.uid, 'centerX', 'horizontal', cview);
                },

                //eslint-disable-next-line no-unused-vars
                withCenterXRight: function UI$_applyFrame_hflex_widthNotDefined_withCenterXRight(cmodel, pmodel, cview/*, pview*/) {
                    var $K = voltmx.$kwebfw$, $KD = $K.dom;

                    $KD.style(cview, 'marginRight', cmodel._kwebfw_.flex.final.right);

                    _flagForMeasure(cmodel._kwebfw_.uid, 'centerX', 'horizontal', cview);
                },

                //eslint-disable-next-line no-unused-vars
                withLeftRight: function UI$_applyFrame_hflex_widthNotDefined_withLeftRight(cmodel, pmodel, cview/*, pview*/) {
                    var $K = voltmx.$kwebfw$, $KD = $K.dom, final = cmodel._kwebfw_.flex.final;

                    $KD.style(cview, 'marginLeft', final.left);
                    $KD.style(cview, 'marginRight', final.right);
                }
            }
        },

        rflex: {
            heightDefined: {

            },

            heightNotDefined: {
            },

            widthDefined: {

            },

            widthNotDefined: {

            }
        },

        vflex: {
            heightDefined: {
                //eslint-disable-next-line no-unused-vars
                withOnlyTop: function UI$_applyFrame_vflex_heightDefined_withOnlyTop(cmodel, pmodel, cview, pview) {
                    var final = cmodel._kwebfw_.flex.final, needMeasure = false;

                    needMeasure = _setTopOrBottomStyleInsideVerticalLayout(final.top, 'top', cmodel, cview, pview);
                    if(needMeasure) {
                        _flagForMeasure(cmodel._kwebfw_.uid, 'top', 'vertical', cview, pview);
                    }
                },

                //eslint-disable-next-line no-unused-vars
                withOnlyCenterY: function UI$_applyFrame_vflex_heightDefined_withOnlyCenterY(cmodel, pmodel, cview, pview) {
                    var final = cmodel._kwebfw_.flex.final, needMeasure = false;

                    needMeasure = _setCenterYStyleInsideVerticalLayout(final.centerY, 'top', cmodel, cview, pview);
                    if(needMeasure) {
                        _flagForMeasure(cmodel._kwebfw_.uid, 'centerY', 'vertical', cview, pview);
                    }
                },

                //eslint-disable-next-line no-unused-vars
                withCenterYBottom: function UI$_applyFrame_vflex_heightDefined_withCenterYBottom(cmodel, pmodel, cview, pview) {
                    var final = cmodel._kwebfw_.flex.final, needMeasure = false;

                    needMeasure = _setCenterYStyleInsideVerticalLayout(final.centerY, 'top', cmodel, cview, pview);
                    if(needMeasure) {
                        _flagForMeasure(cmodel._kwebfw_.uid, 'centerY', 'vertical', cview, pview);
                    }

                    needMeasure = _setTopOrBottomStyleInsideVerticalLayout(final.bottom, 'bottom', cmodel, cview, pview);
                    if(needMeasure) {
                        _flagForMeasure(cmodel._kwebfw_.uid, 'bottom', 'vertical', cview, pview);
                    }
                },

                //eslint-disable-next-line no-unused-vars
                withTopBottom: function UI$_applyFrame_vflex_heightDefined_withTopBottom(cmodel, pmodel, cview, pview) {
                    var final = cmodel._kwebfw_.flex.final, needMeasure = false;

                    needMeasure = _setTopOrBottomStyleInsideVerticalLayout(final.top, 'top', cmodel, cview, pview);
                    if(needMeasure) {
                        _flagForMeasure(cmodel._kwebfw_.uid, 'top', 'vertical', cview, pview);
                    }

                    needMeasure = _setTopOrBottomStyleInsideVerticalLayout(final.bottom, 'bottom', cmodel, cview, pview);
                    if(needMeasure) {
                        _flagForMeasure(cmodel._kwebfw_.uid, 'bottom', 'vertical', cview, pview);
                    }
                }
            },

            heightNotDefined: {
                //eslint-disable-next-line no-unused-vars
                withOnlyTop: function UI$_applyFrame_vflex_heightNotDefined_withOnlyTop(cmodel, pmodel, cview, pview) {
                    var final = cmodel._kwebfw_.flex.final, needMeasure = false;

                    needMeasure = _setTopOrBottomStyleInsideVerticalLayout(final.top, 'top', cmodel, cview, pview);
                    if(needMeasure) {
                        _flagForMeasure(cmodel._kwebfw_.uid, 'top', 'vertical', cview, pview);
                    }
                },

                //eslint-disable-next-line no-unused-vars
                withOnlyCenterY: function UI$_applyFrame_vflex_heightNotDefined_withOnlyCenterY(cmodel, pmodel, cview, pview) {
                    var final = cmodel._kwebfw_.flex.final, needMeasure = false;

                    needMeasure = _setCenterYStyleInsideVerticalLayout(final.centerY, 'top', cmodel, cview, pview);
                    if(needMeasure) {
                        _flagForMeasure(cmodel._kwebfw_.uid, 'centerY', 'vertical', cview, pview);
                    }
                },

                //eslint-disable-next-line no-unused-vars
                withCenterYBottom: function UI$_applyFrame_vflex_heightNotDefined_withCenterYBottom(cmodel, pmodel, cview, pview) {
                    var final = cmodel._kwebfw_.flex.final, needMeasure = false;

                    needMeasure = _setCenterYStyleInsideVerticalLayout(final.centerY, 'top', cmodel, cview, pview);
                    if(needMeasure) {
                        _flagForMeasure(cmodel._kwebfw_.uid, 'centerY', 'vertical', cview, pview);
                    }

                    needMeasure = _setTopOrBottomStyleInsideVerticalLayout(final.bottom, 'bottom', cmodel, cview, pview);
                    if(needMeasure) {
                        _flagForMeasure(cmodel._kwebfw_.uid, 'bottom', 'vertical', cview, pview);
                    }
                },

                //eslint-disable-next-line no-unused-vars
                withTopBottom: function UI$_applyFrame_vflex_heightNotDefined_withTopBottom(cmodel, pmodel, cview, pview) {
                    var final = cmodel._kwebfw_.flex.final, needMeasure = false;

                    needMeasure = _setTopOrBottomStyleInsideVerticalLayout(final.top, 'top', cmodel, cview, pview);
                    if(needMeasure) {
                        _flagForMeasure(cmodel._kwebfw_.uid, 'top', 'vertical', cview, pview);
                    }

                    needMeasure = _setTopOrBottomStyleInsideVerticalLayout(final.bottom, 'bottom', cmodel, cview, pview);
                    if(needMeasure) {
                        _flagForMeasure(cmodel._kwebfw_.uid, 'bottom', 'vertical', cview, pview);
                    }
                }
            },

            widthDefined: {
                //eslint-disable-next-line no-unused-vars
                withOnlyLeft: function UI$_applyFrame_vflex_widthDefined_withOnlyLeft(cmodel, pmodel, cview/*, pview*/) {
                    var $K = voltmx.$kwebfw$, $KD = $K.dom;

                    $KD.style(cview, 'marginLeft', cmodel._kwebfw_.flex.final.left);
                },

                //eslint-disable-next-line no-unused-vars
                withOnlyCenterX: function UI$_applyFrame_vflex_widthDefined_withOnlyCenterX(cmodel, pmodel, cview/*, pview*/) {
                    var $K = voltmx.$kwebfw$, $KD = $K.dom,
                        calc = '', final = cmodel._kwebfw_.flex.final;

                    calc = ('calc('+final.centerX+' - '+final.width+'/2)');
                    $KD.style(cview, 'marginLeft', calc);
                },

                //eslint-disable-next-line no-unused-vars
                withOnlyRight: function UI$_applyFrame_vflex_widthDefined_withOnlyRight(cmodel, pmodel, cview/*, pview*/) {
                    var $K = voltmx.$kwebfw$, $KD = $K.dom;

                    $KD.style(cview, 'marginRight', cmodel._kwebfw_.flex.final.right);
                    $KD.style(cview, 'alignSelf', 'flex-end');
                },

                //eslint-disable-next-line no-unused-vars
                withCenterXRight: function UI$_applyFrame_vflex_widthDefined_withCenterXRight(cmodel, pmodel, cview/*, pview*/) {
                    var $K = voltmx.$kwebfw$, $KD = $K.dom,
                        calc = '', final = cmodel._kwebfw_.flex.final;

                    calc = ('calc('+final.centerX+' - '+final.width+'/2)');
                    $KD.style(cview, 'marginLeft', calc);
                    $KD.style(cview, 'marginRight', final.right);
                },

                //eslint-disable-next-line no-unused-vars
                withLeftRight: function UI$_applyFrame_vflex_widthDefined_withLeftRight(cmodel, pmodel, cview/*, pview*/) {
                    var $K = voltmx.$kwebfw$, $KD = $K.dom, final = cmodel._kwebfw_.flex.final;

                    $KD.style(cview, 'marginLeft', final.left);
                    $KD.style(cview, 'marginRight', final.right);
                }
            },

            widthNotDefined: {
                //eslint-disable-next-line no-unused-vars
                withOnlyLeft: function UI$_applyFrame_vflex_widthNotDefined_withOnlyLeft(cmodel, pmodel, cview/*, pview*/) {
                    var $K = voltmx.$kwebfw$, $KD = $K.dom;

                    $KD.style(cview, 'marginLeft', cmodel._kwebfw_.flex.final.left);
                },

                //eslint-disable-next-line no-unused-vars
                withOnlyCenterX: function UI$_applyFrame_vflex_widthNotDefined_withOnlyCenterX(cmodel, pmodel, cview/*, pview*/) {
                    _flagForMeasure(cmodel._kwebfw_.uid, 'centerX', 'horizontal', cview);
                },

                //eslint-disable-next-line no-unused-vars
                withOnlyRight: function UI$_applyFrame_vflex_widthNotDefined_withOnlyRight(cmodel, pmodel, cview/*, pview*/) {
                    var $K = voltmx.$kwebfw$, $KD = $K.dom;

                    $KD.style(cview, 'marginRight', cmodel._kwebfw_.flex.final.right);
                    $KD.style(cview, 'alignSelf', 'flex-end');
                },

                //eslint-disable-next-line no-unused-vars
                withCenterXRight: function UI$_applyFrame_vflex_widthNotDefined_withCenterXRight(cmodel, pmodel, cview/*, pview*/) {
                    var $K = voltmx.$kwebfw$, $KD = $K.dom, final = cmodel._kwebfw_.flex.final;

                    $KD.style(cview, 'marginRight', final.right);

                    _flagForMeasure(cmodel._kwebfw_.uid, 'centerX', 'horizontal', cview);
                },

                //eslint-disable-next-line no-unused-vars
                withLeftRight: function UI$_applyFrame_vflex_widthNotDefined_withLeftRight(cmodel, pmodel, cview/*, pview*/) {
                    var $K = voltmx.$kwebfw$, $KD = $K.dom, final = cmodel._kwebfw_.flex.final;

                    $KD.style(cview, 'marginLeft', final.left);
                    $KD.style(cview, 'marginRight', final.right);
                }
            }
        }
    };


    var _canMeasureHeight = function UI$_canMeasureHeight(model/*, context*/) {
        //Context says if the model is inside a Segment/CollectionView/Header/Footer
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget,
            _ = model._kwebfw_, pmodel = $KW.pmodel(model), w = 0, wlen = 0, child = null,
            prop = _.prop, widgets = null, flag = false, omodel = null;

        if(model.autogrowMode === voltmx.flex.AUTOGROW_HEIGHT) {
            flag = true;
        } else if($KW.isFlexPropertyDefined(prop, 'height')) {
            omodel = $KW.omodel(model);
            if($KW.inPercent(prop.height) && _.is.template
               && $KU.is(omodel, 'widget', 'SegmentedUI2')
               && omodel.autogrowMode === voltmx.flex.AUTOGROW_HEIGHT) {
                flag = false;
            } else {
                flag = true;
            }
        } else if($KW.isFlexPropertyDefined(prop, 'maxHeight')
        || $KW.isFlexPropertyDefined(prop, 'minHeight')) {
            flag = true;
        } else if($KW.layout(pmodel) === 'fflex') {
            //Condition for implicit height checking
            if(!(($KW.isFlexPropertyDefined(prop, 'top') //Only top defined
            && !$KW.isFlexPropertyDefined(prop, 'centerY')
            && !$KW.isFlexPropertyDefined(prop, 'bottom'))
            || ($KW.isFlexPropertyDefined(prop, 'centerY') //Only centerY defined
            && !$KW.isFlexPropertyDefined(prop, 'top')
            && !$KW.isFlexPropertyDefined(prop, 'bottom'))
            || ($KW.isFlexPropertyDefined(prop, 'bottom') //Only bottom defined
            && !$KW.isFlexPropertyDefined(prop, 'top')
            && !$KW.isFlexPropertyDefined(prop, 'centerY')))) {
                flag = true;
            }
        }

        if(flag && model.autogrowMode === voltmx.flex.AUTOGROW_HEIGHT
        && $KW.isFlexContainer(model) && !$KU.is(model, 'widget', 'Form2')) {
            widgets = $KW.children(model);
            wlen = widgets.length;

            for(w=0; w<wlen; w++) {
                child = widgets[w];
                prop = child._kwebfw_.prop;

                if(($KW.inPercent(prop.top) && prop.top !== '0%')
                || ($KW.inPercent(prop.bottom) && prop.bottom !== '0%')
                || ($KW.inPercent(prop.centerY) && prop.centerY !== '0%')
                || ($KW.inPercent(prop.height) && prop.height !== '0%')
                || ($KW.inPercent(prop.minHeight) && prop.minHeight !== '0%')
                || ($KW.inPercent(prop.maxHeight) && prop.maxHeight !== '0%')) {
                    flag = false;
                    break;
                }
            }
        }

        return flag;
    };


    var _canMeasureWidth = function UI$_canMeasureWidth(model/*, context*/) {
        //Context says if the model is inside a Segment/CollectionView/Header/Footer
        var $K = voltmx.$kwebfw$, $KW = $K.widget, flag = false,
            prop = model._kwebfw_.prop, pmodel = $KW.pmodel(model);

        if($KW.isFlexPropertyDefined(prop, 'width')
        || $KW.isFlexPropertyDefined(prop, 'maxWidth')
        || $KW.isFlexPropertyDefined(prop, 'minWidth')) {
            flag = true;
        } else if($KW.layout(pmodel) === 'fflex') {
            //Condition for implicit width checking
            if(!(($KW.isFlexPropertyDefined(prop, 'left') //Only left defined
            && !$KW.isFlexPropertyDefined(prop, 'centerX')
            && !$KW.isFlexPropertyDefined(prop, 'right'))
            || ($KW.isFlexPropertyDefined(prop, 'centerX') //Only centerX defined
            && !$KW.isFlexPropertyDefined(prop, 'left')
            && !$KW.isFlexPropertyDefined(prop, 'right'))
            || ($KW.isFlexPropertyDefined(prop, 'right') //Only right defined
            && !$KW.isFlexPropertyDefined(prop, 'left')
            && !$KW.isFlexPropertyDefined(prop, 'centerX')))) {
                flag = true;
            }
        }

        return flag;
    };


    //This function must be called in the scope of form instance
    var _cascadeRelayout = function UI$_cascadeRelayout(model, ignoreSiblingCascade) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget,
            slen = 0, index = -1, siblings = [], omodel = null,
            s = 0, pmodel = $KW.pmodel(model, {tabs : true}), templates = null,
            tmodel = null;
        if(model && model._kwebfw_.relayout !== true) {
            model._kwebfw_.relayout = true;
            _dirty.widgets[model._kwebfw_.uid] = model;

            //Populate _dirty.templates
            if(model._kwebfw_.is.cloned) {
                tmodel = $KW.tmodel(model);
                omodel = $KW.omodel(model);

                if(tmodel && omodel) {
                    templates = _dirty.templates;

                    if(!templates[omodel._kwebfw_.uid]) {
                        templates[omodel._kwebfw_.uid] = {};
                    }

                    templates[omodel._kwebfw_.uid][tmodel._kwebfw_.uid] = tmodel;
                }
            }

            //Handle nested children of model
            if(model.isVisible || $K.F.RIVW) {
                $KU.each($KW.children(model), function(widget) {
                    if(_shouldRelayoutChild(widget, model)) {
                        _cascadeRelayout.call(this, widget);
                    }
                }, this);
            }

            if(pmodel) {
                index = $KW.index(model);

                //Handle direct siblings of model
                if(index !== -1 && !ignoreSiblingCascade && _shouldRelayoutSiblings(pmodel)) {
                    siblings = $KW.children(pmodel);
                    slen = siblings.length;

                    if(index < (slen-1)) {
                        for(s=(index+1); s<slen; s++) {
                            _cascadeRelayout.call(this, siblings[s], true);
                        }
                    }
                }

                //Handle direct parent of model
                if(_shouldRelayoutParent(pmodel)) {
                    _cascadeRelayout.call(this, pmodel);
                }
            } else if(model._kwebfw_.is.template && model._kwebfw_.is.cloned) {
                if(omodel && _shouldRelayoutTemplate(model)) {
                    _cascadeRelayout.call(this, omodel);
                }
            }
        }
    };


    var _cleanFlexCSS = function UI$_cleanFlexCSS(cmodel, cview, pview) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KD = $K.dom,
            cfinal = cmodel._kwebfw_.flex.final, style = null;

        if(cview) {
            style = {
                'align-self': null,
                'flex-direction': null,
                'margin-bottom': null,
                'margin-left': null,
                'margin-right': null,
                'margin-top': null,
                'bottom': null,
                'left': null,
                'right': null,
                'top': null
            };

            if(cfinal.maxHeight) style['max-height'] = null;
            if(cfinal.maxWidth) style['max-width'] = null;
            if(cfinal.minHeight) style['min-height'] = null;
            if(cfinal.minWidth) style['min-width'] = null;
            if(cfinal.height) style.height = null;
            if(cfinal.width) style.width = null;

            $KD.style(cview, style);

            //NOTE:: Above BLINDLY removed flex-direction style, because...
            //       layoutType of a container MIGHT have modified.
            //       To fix side-effect of above BLIND-ASSUMPTION...
            //       Assigning back correct value of flex-direction style
            if(cmodel instanceof voltmx.ui.ContainerWidget
            && cmodel.reverseLayoutDirection === true) {
                _view.ContainerWidget.reverseLayoutDirection.call(
                    cmodel, {node:cview}, true
                );
            }

            if(pview && $KD.contains(pview, cview)) {
                if($KU.is(cmodel._kwebfw_.viewPrev, 'dom')
                && $KD.contains(pview, cmodel._kwebfw_.viewPrev)) {
                    $KD.remove(cmodel._kwebfw_.viewPrev);
                    delete cmodel._kwebfw_.viewPrev;
                }

                if($KU.is(cmodel._kwebfw_.viewNext, 'dom')
                && $KD.contains(pview, cmodel._kwebfw_.viewNext)) {
                    $KD.remove(cmodel._kwebfw_.viewNext);
                    delete cmodel._kwebfw_.viewNext;
                }
            }
        }
    };


    var _cleanMeasuresAndMutates = function UI$_cleanMeasuresAndMutates(uid) {
        var model = _map[uid], _ = null, index = -1;

        delete _measures[uid];

        if(model) {
            _ = model._kwebfw_;

            if(_.view) {
                index = _mutates.indexOf(_.view);

                if(index !== -1) {
                    _mutates.splice(index, 1);
                }
            }
        }
    };


    //This function must be called in the scope of widget instance
    var _cleanUnderscore = function UI$_cleanUnderscore(meta) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, _ = this._kwebfw_;

        if(!$KU.is(meta, 'object')) meta = {};

        //iterate and delete each key
        $KU.each(_.context, function(value, key) {
            delete this[key];
        }, _.context);

        //iterate and delete each key
        $KU.each(_.is, function(value, key) {
            var list = ['cloned', 'component', 'removed', 'template'];

            if(list.indexOf(key) === -1) {
                delete this[key];
            }
        }, _.is);

        _.modalContainer = null;
        _.inModalContainer = true;
        _.disabled = !_.prop.enable;

        if(_.flex) { //NOTE:: If "this" is a UserWidget, then _.flex is "undefined"
            _.flex.frame = {x:null, y:null, width:-1, height:-1, doLayout:false};

            //iterate and delete each key
            $KU.each(_.flex.final, function(value, key) {
                delete this[key];
            }, _.flex.final);
        }

        //iterate and delete each key
        $KU.each(_.ui, function(value, key) {
            if(key === 'scroll') {
                this[key] = {x:0, y:0, width:-1, height:-1, registered:false, status:'ended'};
            } else if(key === 'offset') {
                this[key] = {width:-1, height:-1};
            } else if(key === 'size') {
                this.size = 0;
            } else {
                delete this[key];
            }
        }, _.ui);

        if(_.selectedRows) {
            _.selectedRows.splice(0, _.selectedRows.length);
        }

        if(_.selectedItems) {
            _.selectedItems.splice(0, _.selectedItems.length);
        }

        if(_.rows) {
            _.rows.splice(0, _.rows.length);
        }

        if(_.items) {
            _.items.splice(0, _.items.length);
        }

        //TODO:: Other book keeping properties of SegmentedUI2 needs to be cleared

        if(meta.pid !== false) {
            _.pid = '';
            _.prop.parent = null;
        }

        if(meta.rid !== false) {
            _.rid = '';
        }
    };


    var _convertFlexPropertyToCssUnit = function UI$_convertFlexPropertyToCssUnit(value, layoutUnit) {
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


    var _createFullHierarchy = function UI$_createFullHierarchy(widget) {
        var $K = voltmx.$kwebfw$, $KW = $K.widget,
            mode = $K.behavior.fullWidgetHierarchy;

        if(mode !== true) {
            return;
        }

        $KW.iterate(widget, function(model) {
            var $K = voltmx.$kwebfw$, $KW = $K.widget, id = '',
                pmodel = null, rmodel = null, uid = '';

            if(model._kwebfw_.uwi instanceof voltmx.ui.UserWidget) {
                model = model._kwebfw_.uwi;
            }

            pmodel = $KW.pmodel(model);
            rmodel = $KW.rmodel(model);
            uid = model._kwebfw_.uid;
            id = model.id;

            $KW.closest(model, function(parent) {
                if(parent._kwebfw_.uwi === model) {
                    parent = model;
                }

                if(parent === rmodel) {
                    return true;
                } else if(parent[id] !== _map[uid]) {
                    if(Object.prototype.hasOwnProperty.call(parent, id)) {
                        throw new Error('Key <'+id+'> already exists on container <'+parent.id+'>.');
                    } else if(!(parent === model || parent === pmodel)) {
                        parent[id] = _map[uid];
                    }
                }
            });
        });
    };


    //Though model can be an instanceof voltmx.ui.BasicWidget or voltmx.ui.UseWidget
    //But, ultimately it always operates on widget, which is an instance of voltmx.ui.BasicWidget
    //This function must be called in the scope of widget instance
    //And this widget instance must be a FORM/TAB/TEMPLATE/COMPONENT widget.
    //Here this can never be an instanceof voltmx.ui.UserWidget
    var _createWidgetHierarchy = function UI$_createWidgetHierarchy(model) {
        var $K = voltmx.$kwebfw$, $KW = $K.widget;

        $KW.iterate(model, function(widget) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget,
                _ = widget._kwebfw_, parent = $KW.pmodel(widget), tabpane = null;

            if(this !== parent && $KU.is(this[widget.id], 'widget') && !widget.childHierarchy) {
                throw new Error('Duplicate widget ID <'+widget.id+'> encountered.\nAlready added to parent with id="'+parent.id+'".');
            } else {
                if(this._kwebfw_.is.tab === true) {
                    tabpane = $KW.model(this._kwebfw_.tpid);

                    if($KU.is(tabpane[widget.id], 'widget')) {
                        throw new Error('Duplicate widget ID <'+widget.id+'> encountered.\nAlready added to TabPane with id="'+tabpane.id+'".');
                    } else {
                        _.wap = ((this._kwebfw_.wap || this.id) + '_' + widget.id);
                    }
                } else {
                    _.wap = ((this._kwebfw_.wap || this.id) + '_' + widget.id);
                }

                if(_.uwi instanceof voltmx.ui.UserWidget) {
                    _.uwi._kwebfw_.wap = _.wap;
                }

                //Not adding Form2 and is.template in the condition, as ...
                //Only component can be placed inside Form2/is.template/component
                _.rid = (_.is.component) ? _.uid : this._kwebfw_.uid;

                if(this !== parent) {
                    if(_.uwi instanceof voltmx.ui.UserWidget) {
                        this[_.uwi.id] = _.uwi;
                    } else {
                        this[widget.id] = widget;
                        widget.childHierarchy = true;
                    }
                }

                if(tabpane) {
                    if(_.uwi instanceof voltmx.ui.UserWidget) {
                        tabpane[_.uwi.id] = _.uwi;
                    } else {
                        tabpane[widget.id] = widget;
                    }
                }

                if(_.is.component) {
                    _updateComponentWidgetPath.call(widget, widget);
                    return true; //Do not loop over component children.
                } else if($KU.is(widget, 'widget', 'TabPane')) {
                    _updateTabPaneWidgetPath.call(widget);
                }
            }
        }, {scope:this, tabs:false});
    };


    var _deduceFinalFlexPropeties = {
        common: function UI$_deduceFinalFlexPropeties_common(model, prop, context, flex, forced, rendered) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget,
                layoutUnit = model._kwebfw_.layoutUnit, minHeight = '',
                maxHeight = '', minWidth = '', maxWidth = '', omodel = null;

            flex.zIndex = prop.zIndex;

            if(!$KU.is(model, 'widget', 'Form2')) {
                if(!_canMeasureWidth(model, context)) {
                    flex.width = $KW.getDefaultWidth(model, context);

                    if($KU.is(flex.width, 'null')) delete flex.width;
                    else flex.width = flex.width.replace('dp', 'px');
                } else if($KW.isFlexPropertyDefined(prop, 'width')) {
                    flex.width = _convertFlexPropertyToCssUnit(prop.width, layoutUnit);
                }

                if(!_canMeasureHeight(model, context)) {
                    flex.height = $KW.getDefaultHeight(model, context);

                    if($KU.is(flex.height, 'null')) delete flex.height;
                    else flex.height = flex.height.replace('dp', 'px');
                } else if($KW.isFlexPropertyDefined(prop, 'height')) {
                    flex.height = _convertFlexPropertyToCssUnit(prop.height, layoutUnit);
                }

                if(model._kwebfw_.is.template) {
                    omodel = $KW.omodel(model);
                    if($KU.is(omodel, 'widget', 'CollectionView')
                    && omodel.layout !== voltmx.collectionview.LAYOUT_CUSTOM) {
                        if($K.ui.CollectionView.isHeaderOrFooter.call(omodel, model)) {
                            // Header/footer behavior for vertical/horizontal layout types - width/height taken from template, height/width inferred from collectionVIew size.
                            if(omodel.layout === voltmx.collectionview.LAYOUT_VERTICAL) {
                                flex.height = '100%';
                            } else {
                                flex.width = '100%';
                            }
                        }
                    }
                }
            }

            if(!flex.width && $KW.isFlexPropertyDefined(prop, 'minWidth')
            && $KW.isFlexPropertyDefined(prop, 'maxWidth')) {
                flex.minWidth = _convertFlexPropertyToCssUnit(prop.minWidth, layoutUnit);
                flex.maxWidth = _convertFlexPropertyToCssUnit(prop.maxWidth, layoutUnit);

                if(($KW.inPercent(flex.minWidth) && $KW.inPercent(flex.maxWidth))
                || (!$KW.inPercent(flex.minWidth) && !$KW.inPercent(flex.maxWidth))) {
                    if($KW.inPercent(minWidth)) {
                        minWidth = flex.minWidth.replace('%', '');
                        maxWidth = flex.maxWidth.replace('%', '');
                    } else {
                        minWidth = flex.minWidth.replace('px', '');
                        maxWidth = flex.maxWidth.replace('px', '');
                    }

                    minWidth = parseFloat(minWidth, 10);
                    maxWidth = parseFloat(maxWidth, 10);

                    if(minWidth > maxWidth) {
                        flex.minWidth = ($KW.inPercent(minWidth)) ? '0%' : '0px';
                    }
                } else if(rendered) {
                    $KU.log('warn', 'KFW-FEP:: Can\'t determine if minWidth is greater than maxWidth or not. << '+model._kwebfw_.wap+' >>');
                }
            }

            if(!flex.height && $KW.isFlexPropertyDefined(prop, 'minHeight')
            && $KW.isFlexPropertyDefined(prop, 'maxHeight')) {
                flex.minHeight = _convertFlexPropertyToCssUnit(prop.minHeight, layoutUnit);
                flex.maxHeight = _convertFlexPropertyToCssUnit(prop.maxHeight, layoutUnit);

                if(($KW.inPercent(flex.minHeight) && $KW.inPercent(flex.maxHeight))
                || (!$KW.inPercent(flex.minHeight) && !$KW.inPercent(flex.maxHeight))) {
                    if($KW.inPercent(minHeight)) {
                        minHeight = flex.minHeight.replace('%', '');
                        maxHeight = flex.maxHeight.replace('%', '');
                    } else {
                        minHeight = flex.minHeight.replace('px', '');
                        maxHeight = flex.maxHeight.replace('px', '');
                    }

                    minHeight = parseFloat(minHeight, 10);
                    maxHeight = parseFloat(maxHeight, 10);

                    if(minHeight > maxHeight) {
                        flex.minHeight = ($KW.inPercent(minHeight)) ? '0%' : '0px';
                    }
                } else if(rendered) {
                    $KU.log('warn', 'KFW-FEP:: Can\'t determine if minHeight is greater than maxHeight or not. << '+model._kwebfw_.wap+' >>');
                }
            }
        },

        fflex: function UI$_deduceFinalFlexPropeties_fflex(model, prop, context, forced, rendered) {
            var flex = {};

            _deduceFinalFlexPropeties.common(model, prop, context, flex, forced, rendered);

            if(!Object.prototype.hasOwnProperty.call(flex, 'width')) {
                _deduceFinalFlexPropeties.fflexWidthNotDefined(model, prop, context, flex);
            } else { //Width is defined
                _deduceFinalFlexPropeties.fflexWidthDefined(model, prop, context, flex);
            }

            if(!Object.prototype.hasOwnProperty.call(flex, 'height')) {
                _deduceFinalFlexPropeties.fflexHeightNotDefined(model, prop, context, flex);
            } else { //Height is defined
                _deduceFinalFlexPropeties.fflexHeightDefined(model, prop, context, flex);
            }

            var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget;

            if(rendered) {
                if(flex.centerX || flex.centerY) {
                    $KU.log('warn', 'KFW-FEP:: centerX/centerY has performance implications on page rendering and has no direct/indirect/cascaded animation effect. << '+model._kwebfw_.wap+' >>');
                }
                if($KU.is(model, 'widget', 'Image2') && !$KW.isFixedHeight(model)) {
                    $KU.log('warn', 'KFW-FEP:: Image with preferred height has performance implications on page rendering. << '+model._kwebfw_.wap+' >>');
                }
                if($KW.layout(model) === 'fflex' && !$KW.isFixedHeight(model)) {
                    $KU.log('warn', 'KFW-FEP:: FreeForm preferred height container has performance implications on page rendering and has no direct/indirect/cascaded animation effect. << '+model._kwebfw_.wap+' >>');
                }
            }

            return flex;
        },

        fflexHeightDefined: function UI$_deduceFinalFlexPropeties_fflexHeightDefined(model, prop, context, flex) {
            var $K = voltmx.$kwebfw$, $KW = $K.widget, layoutUnit = model._kwebfw_.layoutUnit;

            if($KW.isFlexPropertyDefined(prop, 'centerY')) {
                flex.centerY = _convertFlexPropertyToCssUnit(prop.centerY, layoutUnit);
            } else if($KW.isFlexPropertyDefined(prop, 'top')) {
                flex.top = _convertFlexPropertyToCssUnit(prop.top, layoutUnit);
            }

            if($KW.isFlexPropertyDefined(prop, 'bottom')) {
                flex.bottom = _convertFlexPropertyToCssUnit(prop.bottom, layoutUnit);
            }
        },

        fflexHeightNotDefined: function UI$_deduceFinalFlexPropeties_fflexHeightNotDefined(model, prop, context, flex) {
            var $K = voltmx.$kwebfw$, $KW = $K.widget, layoutUnit = model._kwebfw_.layoutUnit;

            if($KW.isFlexPropertyDefined(prop, 'top')
            && $KW.isFlexPropertyDefined(prop, 'centerY')
            && $KW.isFlexPropertyDefined(prop, 'bottom')) {
                flex.centerY = _convertFlexPropertyToCssUnit(prop.centerY, layoutUnit);
                flex.top = _convertFlexPropertyToCssUnit(prop.top, layoutUnit);
            } else if($KW.isFlexPropertyDefined(prop, 'top')
            && $KW.isFlexPropertyDefined(prop, 'centerY')) {
                flex.top = _convertFlexPropertyToCssUnit(prop.top, layoutUnit);
                flex.centerY = _convertFlexPropertyToCssUnit(prop.centerY, layoutUnit);
            } else if($KW.isFlexPropertyDefined(prop, 'centerY')
            && $KW.isFlexPropertyDefined(prop, 'bottom')) {
                flex.centerY = _convertFlexPropertyToCssUnit(prop.centerY, layoutUnit);
                flex.bottom = _convertFlexPropertyToCssUnit(prop.bottom, layoutUnit);
            } else if($KW.isFlexPropertyDefined(prop, 'top')
            && $KW.isFlexPropertyDefined(prop, 'bottom')) {
                flex.top = _convertFlexPropertyToCssUnit(prop.top, layoutUnit);
                flex.bottom = _convertFlexPropertyToCssUnit(prop.bottom, layoutUnit);
            } else {
                if($KW.isFlexPropertyDefined(prop, 'centerY')) {
                    flex.centerY = _convertFlexPropertyToCssUnit(prop.centerY, layoutUnit);
                } else if($KW.isFlexPropertyDefined(prop, 'top')) {
                    flex.top = _convertFlexPropertyToCssUnit(prop.top, layoutUnit);
                } else if($KW.isFlexPropertyDefined(prop, 'bottom')) {
                    flex.bottom = _convertFlexPropertyToCssUnit(prop.bottom, layoutUnit);
                } else {
                    flex.top = '0px';
                }
            }

            if(!flex.minHeight && $KW.isFlexPropertyDefined(prop, 'minHeight')) {
                flex.minHeight = _convertFlexPropertyToCssUnit(prop.minHeight, layoutUnit);
            }

            if(!flex.maxHeight && $KW.isFlexPropertyDefined(prop, 'maxHeight')) {
                flex.maxHeight = _convertFlexPropertyToCssUnit(prop.maxHeight, layoutUnit);
            }
        },

        fflexWidthDefined: function UI$_deduceFinalFlexPropeties_fflexWidthDefined(model, prop, context, flex) {
            var $K = voltmx.$kwebfw$, $KW = $K.widget, layoutUnit = model._kwebfw_.layoutUnit;

            if($KW.isFlexPropertyDefined(prop, 'centerX')) {
                flex.centerX = _convertFlexPropertyToCssUnit(prop.centerX, layoutUnit);
            } else if($KW.isFlexPropertyDefined(prop, 'left')) {
                flex.left = _convertFlexPropertyToCssUnit(prop.left, layoutUnit);
            }

            if($KW.isFlexPropertyDefined(prop, 'right')) {
                flex.right = _convertFlexPropertyToCssUnit(prop.right, layoutUnit);
            }
        },

        fflexWidthNotDefined: function UI$_deduceFinalFlexPropeties_fflexWidthNotDefined(model, prop, context, flex) {
            var $K = voltmx.$kwebfw$, $KW = $K.widget, layoutUnit = model._kwebfw_.layoutUnit;

            if($KW.isFlexPropertyDefined(prop, 'left')
            && $KW.isFlexPropertyDefined(prop, 'centerX')
            && $KW.isFlexPropertyDefined(prop, 'right')) {
                flex.centerX = _convertFlexPropertyToCssUnit(prop.centerX, layoutUnit);
                flex.left = _convertFlexPropertyToCssUnit(prop.left, layoutUnit);
            } else if($KW.isFlexPropertyDefined(prop, 'left')
            && $KW.isFlexPropertyDefined(prop, 'centerX')) {
                flex.left = _convertFlexPropertyToCssUnit(prop.left, layoutUnit);
                flex.centerX = _convertFlexPropertyToCssUnit(prop.centerX, layoutUnit);
            } else if($KW.isFlexPropertyDefined(prop, 'centerX')
            && $KW.isFlexPropertyDefined(prop, 'right')) {
                flex.centerX = _convertFlexPropertyToCssUnit(prop.centerX, layoutUnit);
                flex.right = _convertFlexPropertyToCssUnit(prop.right, layoutUnit);
            } else if($KW.isFlexPropertyDefined(prop, 'left')
            && $KW.isFlexPropertyDefined(prop, 'right')) {
                flex.left = _convertFlexPropertyToCssUnit(prop.left, layoutUnit);
                flex.right = _convertFlexPropertyToCssUnit(prop.right, layoutUnit);
            } else {
                if($KW.isFlexPropertyDefined(prop, 'centerX')) {
                    flex.centerX = _convertFlexPropertyToCssUnit(prop.centerX, layoutUnit);
                } else if($KW.isFlexPropertyDefined(prop, 'left')) {
                    flex.left = _convertFlexPropertyToCssUnit(prop.left, layoutUnit);
                } else if($KW.isFlexPropertyDefined(prop, 'right')) {
                    flex.right = _convertFlexPropertyToCssUnit(prop.right, layoutUnit);
                } else {
                    flex.left = '0px';
                }
            }

            if(!flex.minWidth && $KW.isFlexPropertyDefined(prop, 'minWidth')) {
                flex.minWidth = _convertFlexPropertyToCssUnit(prop.minWidth, layoutUnit);
            }

            if(!flex.maxWidth && $KW.isFlexPropertyDefined(prop, 'maxWidth')) {
                flex.maxWidth = _convertFlexPropertyToCssUnit(prop.maxWidth, layoutUnit);
            }
        },

        hflex: function UI$_deduceFinalFlexPropeties_hflex(model, prop, context, forced, rendered) {
            var flex = {};

            _deduceFinalFlexPropeties.common(model, prop, context, flex, forced, rendered);

            if(!Object.prototype.hasOwnProperty.call(flex, 'width')) {
                _deduceFinalFlexPropeties.hflexWidthNotDefined(model, prop, context, flex);
            } else { //Width is defined
                _deduceFinalFlexPropeties.hflexWidthDefined(model, prop, context, flex);
            }

            if(!Object.prototype.hasOwnProperty.call(flex, 'height')) {
                _deduceFinalFlexPropeties.hflexHeightNotDefined(model, prop, context, flex);
            } else { //Height is defined
                _deduceFinalFlexPropeties.hflexHeightDefined(model, prop, context, flex);
            }

            var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget;

            if(rendered) {
                if(flex.centerX || flex.centerY) {
                    $KU.log('warn', 'KFW-FEP:: centerX/centerY has performance implications on page rendering and has no direct/indirect animation effect. << '+model._kwebfw_.wap+' >>');
                }
                if($KU.is(model, 'widget', 'Image2') && !$KW.isFixedHeight(model)) {
                    $KU.log('warn', 'KFW-FEP:: Image with preferred height has performance implications on page rendering. << '+model._kwebfw_.wap+' >>');
                }
                if($KW.layout(model) === 'fflex' && !$KW.isFixedHeight(model)) {
                    $KU.log('warn', 'KFW-FEP:: FreeForm preferred height container has performance implications on page rendering and has no direct/indirect/cascaded animation effect. << '+model._kwebfw_.wap+' >>');
                }
                if($KW.inPercent(model.bottom)) {
                    $KU.log('warn', 'KFW-FEP:: UI reflection doesn\'t work if widget\'s bottom are in %, inside parent with FlowHorizontal layout. << '+model._kwebfw_.wap+' >>');
                }
            }

            return flex;
        },

        hflexHeightDefined: function UI$_deduceFinalFlexPropeties_hflexHeightDefined(model, prop, context, flex) {
            var $K = voltmx.$kwebfw$, $KW = $K.widget, layoutUnit = model._kwebfw_.layoutUnit;

            if($KW.isFlexPropertyDefined(prop, 'centerY')) {
                flex.centerY = _convertFlexPropertyToCssUnit(prop.centerY, layoutUnit);
            } else if($KW.isFlexPropertyDefined(prop, 'top')) {
                flex.top = _convertFlexPropertyToCssUnit(prop.top, layoutUnit);
            }

            if($KW.isFlexPropertyDefined(prop, 'bottom')) {
                flex.bottom = _convertFlexPropertyToCssUnit(prop.bottom, layoutUnit);
            }
        },

        hflexHeightNotDefined: function UI$_deduceFinalFlexPropeties_hflexHeightNotDefined(model, prop, context, flex) {
            var $K = voltmx.$kwebfw$, $KW = $K.widget, layoutUnit = model._kwebfw_.layoutUnit;

            if($KW.isFlexPropertyDefined(prop, 'top')
            && $KW.isFlexPropertyDefined(prop, 'centerY')) {
                flex.centerY = _convertFlexPropertyToCssUnit(prop.centerY, layoutUnit);

                if($KW.isFlexPropertyDefined(prop, 'bottom')) {
                    flex.bottom = _convertFlexPropertyToCssUnit(prop.bottom, layoutUnit);
                }
            } else if($KW.isFlexPropertyDefined(prop, 'centerY')
            && $KW.isFlexPropertyDefined(prop, 'bottom')) {
                flex.centerY = _convertFlexPropertyToCssUnit(prop.centerY, layoutUnit);
                flex.bottom = _convertFlexPropertyToCssUnit(prop.bottom, layoutUnit);
            } else if($KW.isFlexPropertyDefined(prop, 'top')
            && $KW.isFlexPropertyDefined(prop, 'bottom')) {
                flex.top = _convertFlexPropertyToCssUnit(prop.top, layoutUnit);
                flex.bottom = _convertFlexPropertyToCssUnit(prop.bottom, layoutUnit);
            } else {
                if($KW.isFlexPropertyDefined(prop, 'centerY')) {
                    flex.centerY = _convertFlexPropertyToCssUnit(prop.centerY, layoutUnit);
                } else if($KW.isFlexPropertyDefined(prop, 'top')) {
                    flex.top = _convertFlexPropertyToCssUnit(prop.top, layoutUnit);
                }

                if($KW.isFlexPropertyDefined(prop, 'bottom')) {
                    flex.bottom = _convertFlexPropertyToCssUnit(prop.bottom, layoutUnit);
                }
            }

            if(!flex.minHeight && $KW.isFlexPropertyDefined(prop, 'minHeight')) {
                flex.minHeight = _convertFlexPropertyToCssUnit(prop.minHeight, layoutUnit);
            }

            if(!flex.maxHeight && $KW.isFlexPropertyDefined(prop, 'maxHeight')) {
                flex.maxHeight = _convertFlexPropertyToCssUnit(prop.maxHeight, layoutUnit);
            }
        },

        hflexWidthDefined: function UI$_deduceFinalFlexPropeties_hflexWidthDefined(model, prop, context, flex) {
            var $K = voltmx.$kwebfw$, $KW = $K.widget, layoutUnit = model._kwebfw_.layoutUnit;

            if($KW.isFlexPropertyDefined(prop, 'centerX')) {
                flex.centerX = _convertFlexPropertyToCssUnit(prop.centerX, layoutUnit);
            } else if($KW.isFlexPropertyDefined(prop, 'left')) {
                flex.left = _convertFlexPropertyToCssUnit(prop.left, layoutUnit);
            }

            if($KW.isFlexPropertyDefined(prop, 'right')) {
                flex.right = _convertFlexPropertyToCssUnit(prop.right, layoutUnit);

                if(!flex.left && !flex.centerX) {
                    flex.left = '0' + (($KW.inPercent(flex.right)) ? '%' : 'px');
                }
            }
        },

        hflexWidthNotDefined: function UI$_deduceFinalFlexPropeties_hflexWidthNotDefined(model, prop, context, flex) {
            var $K = voltmx.$kwebfw$, $KW = $K.widget, layoutUnit = model._kwebfw_.layoutUnit;

            if($KW.isFlexPropertyDefined(prop, 'left')
            && $KW.isFlexPropertyDefined(prop, 'centerX')) {
                flex.centerX = _convertFlexPropertyToCssUnit(prop.centerX, layoutUnit);

                if($KW.isFlexPropertyDefined(prop, 'right')) {
                    flex.right = _convertFlexPropertyToCssUnit(prop.right, layoutUnit);
                }
            } else if($KW.isFlexPropertyDefined(prop, 'centerX')
            && $KW.isFlexPropertyDefined(prop, 'right')) {
                flex.centerX = _convertFlexPropertyToCssUnit(prop.centerX, layoutUnit);
                flex.right = _convertFlexPropertyToCssUnit(prop.right, layoutUnit);
            } else if($KW.isFlexPropertyDefined(prop, 'left')
            && $KW.isFlexPropertyDefined(prop, 'right')) {
                flex.left = _convertFlexPropertyToCssUnit(prop.left, layoutUnit);
                flex.right = _convertFlexPropertyToCssUnit(prop.right, layoutUnit);
            } else {
                if($KW.isFlexPropertyDefined(prop, 'centerX')) {
                    flex.centerX = _convertFlexPropertyToCssUnit(prop.centerX, layoutUnit);
                } else if($KW.isFlexPropertyDefined(prop, 'left')) {
                    flex.left = _convertFlexPropertyToCssUnit(prop.left, layoutUnit);
                }

                if($KW.isFlexPropertyDefined(prop, 'right')) {
                    flex.right = _convertFlexPropertyToCssUnit(prop.right, layoutUnit);

                    if(!flex.left && !flex.centerX) {
                        flex.left = '0' + (($KW.inPercent(flex.right)) ? '%' : 'px');
                    }
                }
            }

            if(!flex.minWidth && $KW.isFlexPropertyDefined(prop, 'minWidth')) {
                flex.minWidth = _convertFlexPropertyToCssUnit(prop.minWidth, layoutUnit);
            }

            if(!flex.maxWidth && $KW.isFlexPropertyDefined(prop, 'maxWidth')) {
                flex.maxWidth = _convertFlexPropertyToCssUnit(prop.maxWidth, layoutUnit);
            }
        },

        rflex: function UI$_deduceFinalFlexPropeties_rflex(model, prop, context, forced, rendered) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget,
                layoutUnit = model._kwebfw_.layoutUnit, minHeight = '',
                maxHeight = '', flex = {};

            if($KU.is(prop.zIndex, 'number')) {
                flex.zIndex = prop.zIndex;
            }


            if(!$KU.is(model, 'widget', 'Form2')) {
                if(!_canMeasureHeight(model, context)) {
                    flex.height = $KW.getDefaultHeight(model, context);

                    if($KU.is(flex.height, 'null')) delete flex.height;
                    else flex.height = flex.height.replace('dp', 'px');
                } else if($KW.isFlexPropertyDefined(prop, 'height')) {
                    flex.height = _convertFlexPropertyToCssUnit(prop.height, layoutUnit);
                }
            }

            if(!flex.height && $KW.isFlexPropertyDefined(prop, 'minHeight')
            && $KW.isFlexPropertyDefined(prop, 'maxHeight')) {
                flex.minHeight = _convertFlexPropertyToCssUnit(prop.minHeight, layoutUnit);
                flex.maxHeight = _convertFlexPropertyToCssUnit(prop.maxHeight, layoutUnit);

                if(($KW.inPercent(flex.minHeight) && $KW.inPercent(flex.maxHeight))
                || (!$KW.inPercent(flex.minHeight) && !$KW.inPercent(flex.maxHeight))) {
                    if($KW.inPercent(minHeight)) {
                        minHeight = flex.minHeight.replace('%', '');
                        maxHeight = flex.maxHeight.replace('%', '');
                    } else {
                        minHeight = flex.minHeight.replace('px', '');
                        maxHeight = flex.maxHeight.replace('px', '');
                    }

                    minHeight = parseFloat(minHeight, 10);
                    maxHeight = parseFloat(maxHeight, 10);

                    if(minHeight > maxHeight) {
                        flex.minHeight = ($KW.inPercent(minHeight)) ? '0%' : '0px';
                    }
                } else if(rendered) {
                    $KU.log('warn', 'KFW-FEP:: Can\'t determine if minHeight is greater than maxHeight or not. << '+model._kwebfw_.wap+' >>');
                }
            }

            _deduceFinalFlexPropeties.rflexWidthDefined(model, prop, context, flex);

            if(!Object.prototype.hasOwnProperty.call(flex, 'height')) {
                _deduceFinalFlexPropeties.rflexHeightNotDefined(model, prop, context, flex);
            } else { //Height is defined
                _deduceFinalFlexPropeties.rflexHeightDefined(model, prop, context, flex);
            }

            return flex;
        },

        rflexHeightDefined: function UI$_deduceFinalFlexPropeties_rflexHeightDefined(model, prop, context, flex) {
            var $K = voltmx.$kwebfw$, $KW = $K.widget, layoutUnit = model._kwebfw_.layoutUnit,
                pmodel = $KW.pmodel(model);

            if($KW.isFlexPropertyDefined(pmodel._kwebfw_.prop, 'gutterY')) {
                layoutUnit = pmodel._kwebfw_.layoutUnit;
                flex.gutterY = _convertFlexPropertyToCssUnit(pmodel._kwebfw_.prop.gutterY, layoutUnit);
            } else {
                flex.gutterY = '0px';
            }
        },

        rflexHeightNotDefined: function UI$_deduceFinalFlexPropeties_rflexHeightNotDefined(model, prop, context, flex) {
            var $K = voltmx.$kwebfw$, $KW = $K.widget, layoutUnit = model._kwebfw_.layoutUnit,
                pmodel = $KW.pmodel(model);

            if(!flex.minHeight && $KW.isFlexPropertyDefined(prop, 'minHeight')) {
                flex.minHeight = _convertFlexPropertyToCssUnit(prop.minHeight, layoutUnit);
            }

            if(!flex.maxHeight && $KW.isFlexPropertyDefined(prop, 'maxHeight')) {
                flex.maxHeight = _convertFlexPropertyToCssUnit(prop.maxHeight, layoutUnit);
            }

            if($KW.isFlexPropertyDefined(pmodel._kwebfw_.prop, 'gutterY')) {
                layoutUnit = pmodel._kwebfw_.layoutUnit;
                flex.gutterY = _convertFlexPropertyToCssUnit(pmodel._kwebfw_.prop.gutterY, layoutUnit);
            } else {
                flex.gutterY = '0px';
            }
        },


        rflexWidthDefined: function UI$_deduceFinalFlexPropeties_rflexWidthDefined(model, prop, context, flex) {
            var $K = voltmx.$kwebfw$, $KW = $K.widget, layoutUnit = model._kwebfw_.layoutUnit;
            var $KU = $K.utils, $KA = $K.app, curBrkPoint = $KA.currentBreakpoint,
                brkPoints = null, curBrkPointIndex = null, i, cf = $KW.getRootNode(model),
                spanConfig = null, span, offsetConfig = null, offset, pmodel = $KW.pmodel(model);

            if(model.responsiveConfig) {
                spanConfig = model.responsiveConfig.span;
                if(spanConfig) {
                    brkPoints = cf.breakpoints;
                    brkPoints = brkPoints.concat(Object.keys(spanConfig));
                    brkPoints.push(constants.BREAKPOINT_MAX_VALUE);
                    //brkPoints array have duplicates, but it not be a problem.
                    brkPoints.sort(function(a, b) {
                        return a-b;
                    });

                    curBrkPointIndex = brkPoints.indexOf(curBrkPoint);
                    for(i = curBrkPointIndex; i >= 0; i--) {
                        if($KU.is(spanConfig[brkPoints[i]], 'number')) {
                            span = spanConfig[brkPoints[i]];
                            break;
                        }
                    }
                }

                offsetConfig = model.responsiveConfig.offset;
                if(offsetConfig) {
                    brkPoints = cf.breakpoints;
                    brkPoints = brkPoints.concat(Object.keys(offsetConfig));
                    brkPoints.push(constants.BREAKPOINT_MAX_VALUE);
                    brkPoints.sort(function(a, b) {
                        return a-b;
                    });

                    curBrkPointIndex = brkPoints.indexOf(curBrkPoint);
                    for(i = curBrkPointIndex; i >= 0; i--) {
                        if($KU.is(offsetConfig[brkPoints[i]], 'number')) {
                            offset = offsetConfig[brkPoints[i]];
                            break;
                        }
                    }
                }
            }
            if($KU.is(span, 'undefined') || span > 12 || span < 0) {
                span = 12;
            }

            flex.width = (100 * span)/12 + '%';

            if($KU.is(offset, 'undefined') || offset > 12 || offset < 0) {
                offset = 0;
            }
            flex.offset = (100 * offset)/12 + '%';

            if($KW.isFlexPropertyDefined(pmodel._kwebfw_.prop, 'gutterX')) {
                layoutUnit = pmodel._kwebfw_.layoutUnit;
                flex.gutterX = _convertFlexPropertyToCssUnit(pmodel._kwebfw_.prop.gutterX, layoutUnit);
            }
        },

        vflex: function UI$_deduceFinalFlexPropeties_vflex(model, prop, context, forced, rendered) {
            var flex = {};

            _deduceFinalFlexPropeties.common(model, prop, context, flex, forced, rendered);

            if(!Object.prototype.hasOwnProperty.call(flex, 'width')) {
                _deduceFinalFlexPropeties.vflexWidthNotDefined(model, prop, context, flex);
            } else { //Width is defined
                _deduceFinalFlexPropeties.vflexWidthDefined(model, prop, context, flex);
            }

            if(!Object.prototype.hasOwnProperty.call(flex, 'height')) {
                _deduceFinalFlexPropeties.vflexHeightNotDefined(model, prop, context, flex);
            } else { //Height is defined
                _deduceFinalFlexPropeties.vflexHeightDefined(model, prop, context, flex);
            }

            var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget;

            if(rendered) {
                if(flex.centerX || flex.centerY) {
                    $KU.log('warn', 'KFW-FEP:: centerX/centerY has performance implications on page rendering and has no direct/indirect animation effect. << '+model._kwebfw_.wap+' >>');
                }
                if($KU.is(model, 'widget', 'Image2') && !$KW.isFixedHeight(model)) {
                    $KU.log('warn', 'KFW-FEP:: Image with preferred height has performance implications on page rendering. << '+model._kwebfw_.wap+' >>');
                }
                if($KW.layout(model) === 'fflex' && !$KW.isFixedHeight(model)) {
                    $KU.log('warn', 'KFW-FEP:: FreeForm preferred height container has performance implications on page rendering and has no direct/indirect/cascaded animation effect. << '+model._kwebfw_.wap+' >>');
                }
                if($KW.inPercent(model.top) || $KW.inPercent(model.bottom)) {
                    $KU.log('warn', 'KFW-FEP:: Animation doesn\'t work properly if widget\'s top/bottom are in %, inside parent with FlowVertical layout. << '+model._kwebfw_.wap+' >>');

                    if(model.top[0] === '-' || model.bottom[0] === '-') {
                        $KU.log('warn', 'KFW-FEP:: Negetive % of top/bottom, inside parent with FlowVertical layout, has performance implications on page rendering. << '+model._kwebfw_.wap+' >>');
                    }
                }
            }

            return flex;
        },

        vflexHeightDefined: function UI$_deduceFinalFlexPropeties_vflexHeightDefined(model, prop, context, flex) {
            var $K = voltmx.$kwebfw$, $KW = $K.widget, layoutUnit = model._kwebfw_.layoutUnit;

            if($KW.isFlexPropertyDefined(prop, 'centerY')) {
                flex.centerY = _convertFlexPropertyToCssUnit(prop.centerY, layoutUnit);
            } else if($KW.isFlexPropertyDefined(prop, 'top')) {
                flex.top = _convertFlexPropertyToCssUnit(prop.top, layoutUnit);
            }

            if($KW.isFlexPropertyDefined(prop, 'bottom')) {
                flex.bottom = _convertFlexPropertyToCssUnit(prop.bottom, layoutUnit);

                if(!flex.top && !flex.centerY) {
                    flex.top = '0' + (($KW.inPercent(flex.bottom)) ? '%' : 'px');
                }
            }
        },

        vflexHeightNotDefined: function UI$_deduceFinalFlexPropeties_vflexHeightNotDefined(model, prop, context, flex) {
            var $K = voltmx.$kwebfw$, $KW = $K.widget, layoutUnit = model._kwebfw_.layoutUnit;

            if($KW.isFlexPropertyDefined(prop, 'top')
            && $KW.isFlexPropertyDefined(prop, 'centerY')) {
                flex.centerY = _convertFlexPropertyToCssUnit(prop.centerY, layoutUnit);

                if($KW.isFlexPropertyDefined(prop, 'bottom')) {
                    flex.bottom = _convertFlexPropertyToCssUnit(prop.bottom, layoutUnit);
                }
            } else if($KW.isFlexPropertyDefined(prop, 'centerY')
            && $KW.isFlexPropertyDefined(prop, 'bottom')) {
                flex.centerY = _convertFlexPropertyToCssUnit(prop.centerY, layoutUnit);
                flex.bottom = _convertFlexPropertyToCssUnit(prop.bottom, layoutUnit);
            } else if($KW.isFlexPropertyDefined(prop, 'top')
            && $KW.isFlexPropertyDefined(prop, 'bottom')) {
                flex.top = _convertFlexPropertyToCssUnit(prop.top, layoutUnit);
                flex.bottom = _convertFlexPropertyToCssUnit(prop.bottom, layoutUnit);
            } else {
                if($KW.isFlexPropertyDefined(prop, 'centerY')) {
                    flex.centerY = _convertFlexPropertyToCssUnit(prop.centerY, layoutUnit);
                } else if($KW.isFlexPropertyDefined(prop, 'top')) {
                    flex.top = _convertFlexPropertyToCssUnit(prop.top, layoutUnit);
                }

                if($KW.isFlexPropertyDefined(prop, 'bottom')) {
                    flex.bottom = _convertFlexPropertyToCssUnit(prop.bottom, layoutUnit);

                    if(!flex.top && !flex.centerY) {
                        flex.top = '0' + (($KW.inPercent(flex.bottom)) ? '%' : 'px');
                    }
                }
            }

            if(!flex.minHeight && $KW.isFlexPropertyDefined(prop, 'minHeight')) {
                flex.minHeight = _convertFlexPropertyToCssUnit(prop.minHeight, layoutUnit);
            }

            if(!flex.maxHeight && $KW.isFlexPropertyDefined(prop, 'maxHeight')) {
                flex.maxHeight = _convertFlexPropertyToCssUnit(prop.maxHeight, layoutUnit);
            }
        },

        vflexWidthDefined: function UI$_deduceFinalFlexPropeties_vflexWidthDefined(model, prop, context, flex) {
            var $K = voltmx.$kwebfw$, $KW = $K.widget, layoutUnit = model._kwebfw_.layoutUnit;

            if($KW.isFlexPropertyDefined(prop, 'centerX')) {
                flex.centerX = _convertFlexPropertyToCssUnit(prop.centerX, layoutUnit);
            } else if($KW.isFlexPropertyDefined(prop, 'left')) {
                flex.left = _convertFlexPropertyToCssUnit(prop.left, layoutUnit);
            }

            if($KW.isFlexPropertyDefined(prop, 'right')) {
                flex.right = _convertFlexPropertyToCssUnit(prop.right, layoutUnit);
            }
        },

        vflexWidthNotDefined: function UI$_deduceFinalFlexPropeties_vflexWidthNotDefined(model, prop, context, flex) {
            var $K = voltmx.$kwebfw$, $KW = $K.widget, layoutUnit = model._kwebfw_.layoutUnit;

            if($KW.isFlexPropertyDefined(prop, 'left')
            && $KW.isFlexPropertyDefined(prop, 'centerX')) {
                flex.centerX = _convertFlexPropertyToCssUnit(prop.centerX, layoutUnit);

                if($KW.isFlexPropertyDefined(prop, 'right')) {
                    flex.right = _convertFlexPropertyToCssUnit(prop.right, layoutUnit);
                }
            } else if($KW.isFlexPropertyDefined(prop, 'centerX')
            && $KW.isFlexPropertyDefined(prop, 'right')) {
                flex.centerX = _convertFlexPropertyToCssUnit(prop.centerX, layoutUnit);
                flex.right = _convertFlexPropertyToCssUnit(prop.right, layoutUnit);
            } else if($KW.isFlexPropertyDefined(prop, 'left')
            && $KW.isFlexPropertyDefined(prop, 'right')) {
                flex.left = _convertFlexPropertyToCssUnit(prop.left, layoutUnit);
                flex.right = _convertFlexPropertyToCssUnit(prop.right, layoutUnit);
            } else {
                if($KW.isFlexPropertyDefined(prop, 'centerX')) {
                    flex.centerX = _convertFlexPropertyToCssUnit(prop.centerX, layoutUnit);
                } else if($KW.isFlexPropertyDefined(prop, 'left')) {
                    flex.left = _convertFlexPropertyToCssUnit(prop.left, layoutUnit);
                }

                if($KW.isFlexPropertyDefined(prop, 'right')) {
                    flex.right = _convertFlexPropertyToCssUnit(prop.right, layoutUnit);
                }
            }

            if(!flex.minWidth && $KW.isFlexPropertyDefined(prop, 'minWidth')) {
                flex.minWidth = _convertFlexPropertyToCssUnit(prop.minWidth, layoutUnit);
            }

            if(!flex.maxWidth && $KW.isFlexPropertyDefined(prop, 'maxWidth')) {
                flex.maxWidth = _convertFlexPropertyToCssUnit(prop.maxWidth, layoutUnit);
            }
        }
    };


    //All widget file must have this variable
    //All the functions will be called in the scope of widget instance
    var _dependentPropertiesValidationMessage = {};


    var _distanceBetweenFromWidgetToWidget = function UI$_distanceBetweenFromWidgetToWidget(point, from, to) {
        var $K = voltmx.$kwebfw$, $KW = $K.widget, $KD = $K.dom,
            pos = null, fpos = null, tpos = null;

        if(!$KW.isRendered(from) || !$KW.isRendered(to)) {
            return {x:'0dp', y:'0dp'};
        }
        pos = {};
        fpos = $KD.point(from._kwebfw_.view);
        tpos = $KD.point(to._kwebfw_.view);

        if(point.x.indexOf('dp') > 0) {
            pos.x = parseFloat(point.x.replace('dp', ''), 10);
        } else if(point.x.indexOf('px') > 0) {
            pos.x = parseFloat(point.x.replace('px', ''), 10);
            pos.x = (pos.x/$K.device.DPI);
        } else if(point.x.indexOf('%') > 0) {
            pos.x = parseFloat(point.x.replace('%', ''), 10);
            pos.x = (pos.x / 100) * from._kwebfw_.view.offsetWidth;
        }

        if(point.y.indexOf('dp') > 0) {
            pos.y = parseFloat(point.y.replace('dp', ''), 10);
        } else if(point.y.indexOf('px') > 0) {
            pos.y = parseFloat(point.y.replace('px', ''), 10);
            pos.y = (pos.y/$K.device.DPI);
        } else if(point.y.indexOf('%') > 0) {
            pos.y = parseFloat(point.y.replace('%', ''), 10);
            pos.y = (pos.y / 100) * from._kwebfw_.view.offsetHeight;
        }

        return {
            x: ((tpos.x - fpos.x - pos.x) + 'dp'),
            y: ((tpos.y - fpos.x - pos.y) + 'dp')
        };
    };


    //This function must be called in the scope of widget instance
    var _doLayout = function UI$_doLayout() {
        var $K = voltmx.$kwebfw$, $KU = $K.utils,
            $KW = $K.widget, _ = this._kwebfw_,
            view = _.view, prop = _.prop,
            flex = _.flex, frameworkDoLayout = null;

        if($KW.isRendered(this)) {
            if($KU.is($K.ui[$KW.name(this)], 'object')) {
                frameworkDoLayout = $K.ui[$KW.name(this)].doLayout;
            }

            if($KU.is(prop.doLayout, 'function') || $KU.is(frameworkDoLayout, 'function')) {
                if(!$KU.is(prop.frame.x, 'number')) prop.frame.x = view.offsetLeft;
                if(!$KU.is(prop.frame.y, 'number')) prop.frame.y = view.offsetTop;

                if(!$KU.is(prop.frame.width, 'number') || prop.frame.width < 0) {
                    prop.frame.width = view.offsetWidth;
                }
                if(!$KU.is(prop.frame.height, 'number') || prop.frame.height < 0) {
                    prop.frame.height = view.offsetHeight;
                }

                if(prop.frame.x !== flex.frame.x
                || prop.frame.y !== flex.frame.y
                || prop.frame.width !== flex.frame.width
                || prop.frame.height !== flex.frame.height) {
                    //Sync this._kwebfw_.prop.frame and this._kwebfw_.flex.frame
                    flex.frame.x = prop.frame.x;
                    flex.frame.y = prop.frame.y;
                    flex.frame.width = prop.frame.width;
                    flex.frame.height = prop.frame.height;

                    if(frameworkDoLayout) {
                        frameworkDoLayout.call(this, {
                            x:      prop.frame.x,
                            y:      prop.frame.y,
                            width:  prop.frame.width,
                            height: prop.frame.height
                        });
                    }

                    if($KU.is(prop.doLayout, 'function')) {
                        prop.frame.doLayout = true;
                        prop.doLayout.call(this, this);
                    }
                }            }
        }
    };


    var _flagForMeasure = function UI$_flagForMeasure(uid, position, direction, cview, pview, reverse) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, measure = null;

        if(!$KU.is(reverse, 'boolean')) reverse = false;

        if(!_measures[uid]) {
            _measures[uid] = {height:false, width:false, position:{}};
        }

        measure = _measures[uid];

        if(!measure.cview && $KU.is(cview, 'dom')) measure.cview = cview;
        if(!measure.pview && $KU.is(pview, 'dom')) measure.pview = pview;
        if(!$KU.is(measure.cheight, 'number')) measure.cheight = -1;
        if(!$KU.is(measure.pheight, 'number')) measure.pheight = -1;

        if(direction === 'horizontal') measure.width = true;
        else if(direction === 'vertical') measure.height = true;

        measure.position[position] = true;
        measure.position[(position+'_reverse')] = reverse;
    };


    var _flagForMutate = function UI$_flagForMutate(cmodel, cview) {
        var $K = voltmx.$kwebfw$, $KW = $K.widget, clayout = $KW.layout(cmodel);

        if(cview && _mutates[0] !== cview && !$KW.isFixedHeight(cmodel)) {
            if(clayout === 'fflex' && $KW.isFlexContainer(cmodel)) {
                _mutates.splice(0, 0, cview);
            }
        }
    };


    //All widget file must have this variable
    //All the functions will be called in the scope of widget instance
    var _getter = {
        BasicWidget: {
            accessibilityConfig: function BasicWidget$_getter_accessibilityConfig(value) {
                var $K = voltmx.$kwebfw$, $KW = $K.widget;

                return $KW.getAccessibilityConfig(value);
            },

            focusSkin: function BasicWidget$_getter_focusSkin(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils;

                return ($KU.is(value, 'null')) ? '' : value;
            },

            focusStateSkinProperties: function BasicWidget$_getter_focusStateSkinProperties(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils;

                return ($KU.is(value, 'null')) ? '' : value;
            },

            fontColor: function BasicWidget$_getter_fontColor(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils;

                return ($KU.is(value, 'null')) ? '' : value;
            },

            fontFamily: function BasicWidget$_getter_fontFamily(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils;

                return ($KU.is(value, 'null')) ? '' : value;
            },

            fontSize: function BasicWidget$_getter_fontSize(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils;

                return ($KU.is(value, 'null')) ? '' : value;
            },

            fontStyle: function BasicWidget$_getter_fontStyle(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils;

                return ($KU.is(value, 'null')) ? '' : value;
            },

            fontWeight: function BasicWidget$_getter_fontWeight(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils;

                return ($KU.is(value, 'null')) ? '' : value;
            },

            frame: function BasicWidget$_getter_frame(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils,
                    frame = {x:0, y:0, height:0, width:0};

                if(value.doLayout === true) {
                    if($KU.is(value.x, 'number')) frame.x = value.x;
                    if($KU.is(value.y, 'number')) frame.y = value.y;

                    if($KU.is(value.width, 'number') && value.width >= 0) {
                        frame.width = value.width;
                    }
                    if($KU.is(value.height, 'number') && value.height >= 0) {
                        frame.height = value.height;
                    }
                }

                return frame;
            },

            hoverStateSkinProperties: function BasicWidget$_getter_hoverStateSkinProperties(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils;

                return ($KU.is(value, 'null')) ? '' : value;
            },

            padding: function BasicWidget$_getter_padding(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils;

                return ($KU.is(value, 'null')) ? [0, 0, 0, 0] : value.slice(0);
            },

            skin: function BasicWidget$_getter_skin(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils;

                return ($KU.is(value, 'null')) ? '' : value;
            }
        },

        ContainerWidget: {
            reverseLayoutDirection: function ContainerWidget$_getter_reverseLayoutDirection(value) {
                var $K = voltmx.$kwebfw$, $KW = $K.widget, prop = this._kwebfw_.prop;

                if((prop.layoutType === voltmx.flex.FLOW_HORIZONTAL
                || prop.layoutType === voltmx.flex.RESPONSIVE_GRID)
                && $KW.shouldApplyRTL(this, 'layoutAlignment')) {
                    return !value;
                }
                return value;
            },

            responsiveConfig: function ContainerWidget$_getter_responsiveConfig(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils;

                return $KU.clone(value);
            }
        },

        GroupWidget: {
            masterDataMap: function GroupWidget$_getter_masterDataMap(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils;

                return $KU.clone(value);
            }
        },

        UserWidget: {
            //
        }
    };


    var _handleVisibilityWhen = {
        notVisibleAndHasParent: function(view) {
            var $K = voltmx.$kwebfw$, $KD = $K.dom;

            if($K.F.RIVW) {
                $KD.setAttr(view, 'hidden', true);
            } else if($KD.parent(view)) {
                $KD.remove(view);
            }
        },

        notVisibleAndNoParent: function(view) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils, $KD = $K.dom;

            if($K.F.RIVW || $KU.is(this, 'widget', 'Form2')) {
                $KD.setAttr(view, 'hidden', true);
            } else if($KD.parent(view)) {
                $KD.remove(view);
            }
        },

        visibleAndHasParent: function(view) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget,
                $KD = $K.dom, index = -1, widgets = null,
                pmodel = null, holder = null, next = null;

            if($K.F.RIVW) {
                $KD.removeAttr(view, 'hidden');
            } else {
                holder = $KW.holder($KW.pmodel(this));

                if(holder && !$KD.contains(holder, view)) {
                    index = $KW.index(this);
                    pmodel = $KW.pmodel(this);
                    widgets = $KW.children(pmodel);
                    next = widgets[++index];

                    if(!$K.F.RIVW) {
                        while($KU.is(next, 'widget') && !next.isVisible) {
                            next = widgets[++index];
                        }
                    }

                    if(!$KU.is(next, 'widget')) {
                        $KW.addToView(holder, view);
                    } else {
                        $KD.before(next._kwebfw_.view, view);
                    }

                    _ifContainsMediaWidgetThenPlay(this);
                    _ifContainsSegmentHandleLazyLoad(this);
                }
            }
        },

        visibleAndNoParent: function(view) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils,
                $KW = $K.widget, $KD = $K.dom, $KG = $K.globals,
                _ = this._kwebfw_, owner = null, holder = null;

            if($K.F.RIVW || $KU.is(this, 'widget', 'Form2')) {
                $KD.removeAttr(view, 'hidden');
            } else if($KU.is(this, 'widget', 'Form2')) {
                $KD.add($KG.appForms, view);
            } else if(_.is.template && _.is.cloned && _.oid) {
                owner = $KW.model(_.oid);
                holder = $KW.holder(owner);

                if(!$KD.contains(holder, view)) {
                    $KD.addAt(holder, view/* , index */); //TODO:: Which index ???
                }
            }
        }
    };


    var _ifContainsMediaWidgetThenPlay = function UI$_ifContainsMediaWidgetThenPlay(model) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget;

        if($KU.is(model, 'widget', 'Camera')) {
            _playMediaWidget(model);
        } else if($KU.is(model, 'widget', 'Video')) {
            if(model._kwebfw_.playstate) {
                _playMediaWidget(model);
            }
        } else {
            $KU.each($KW.children(model), function(cmodel) {
                if($KU.is(cmodel, 'widget', 'Camera')) {
                    _playMediaWidget(cmodel);
                } else if($KU.is(cmodel, 'widget', 'Video')) {
                    if(cmodel._kwebfw_.playstate) {
                        _playMediaWidget(cmodel);
                    }
                }
            });
        }
    };

    var _ifContainsSegmentHandleLazyLoad = function UI$_ifContainsSegmentHandleLazyLoad(model) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget;

        if($KU.is(model, 'widget', 'SegmentedUI2')) {
            if($KW.shouldLazyLoad.SegmentedUI2.call(model)) {
                model.data = model.data; //eslint-disable-line no-self-assign
            }
        } else {
            $KU.each($KW.children(model), function(cmodel) {
                _ifContainsSegmentHandleLazyLoad(cmodel);
            });
        }
    };

    //This functions will be called in the scope of widget instance
    //And this widget instance must be a FORM/COMPONENT widget.
    var _invokeAddWidgets = function UI$_invokeAddWidgets(arg0) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, self = null;

        if(arg0 === true) {
            self = this;

            $KU.defineGetter(window, this.id, function() {
                return self;
            });
        }

        if(!$KU.is(this._kwebfw_.children, 'array')
        && ($KU.is(this.addWidgets, 'function')
        || ($KU.is(this.addWidgets, 'string') && this.addWidgets))) {
            if($KU.is(this.addWidgets, 'function')) {
                if(this instanceof voltmx.ui.Form2)
                    currentFormName = this.id;
                this.addWidgets.call(this, this);
            } else if($KU.is(this.addWidgets, 'string') && this.addWidgets) {
                //Not sure when this condition arises
                window[this.addWidgets].call(this, this);
            }
        }
    };


    var _isWidgetIdExists = function UI$_isWidgetIdExists(id, pmodel, rmodel) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

        if($KU.is(pmodel[id], 'widget')) {
            flag = true;
        } else if($KU.is(rmodel, 'widget')
        && $KU.is(rmodel[id], 'widget')) {
            flag = true;
        }

        return flag;
    };


    //This functions will be called in the scope of widget instance
    var _markRelayoutOnAdd = function UI$_markRelayoutOnAdd(position) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget;

        if($KW.isFlexContainer(this)) {
            $KW.markRelayout(this);

            if($KW.layout(this) !== 'fflex') {
                $KU.each($KW.children(this), function(cmodel, index) {
                    var $K = voltmx.$kwebfw$, $KW = $K.widget;

                    if(index > position) {
                        $KW.markRelayout(cmodel);
                    }
                }, this);
            }
        }
    };


    //This functions will be called in the scope of widget instance
    var _markRelayoutOnRemove = function UI$_markRelayoutOnRemove(position) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget;

        if($KW.isFlexContainer(this)) {
            $KW.markRelayout(this);

            if($KW.layout(this) !== 'fflex') {
                $KU.each($KW.children(this), function(cmodel, index) {
                    var $K = voltmx.$kwebfw$, $KW = $K.widget;

                    if(index >= position) {
                        $KW.markRelayout(cmodel);
                    }
                }, this);
            }
        }
    };


    //This functions will be called in the scope of widget instance
    var _mirrorContentAlignment = function UI$_mirrorContentAlignment() {
        var prop = this._kwebfw_.prop, mirrorMap = {};

        mirrorMap[constants.CONTENT_ALIGN_TOP_LEFT] = constants.CONTENT_ALIGN_TOP_RIGHT;
        mirrorMap[constants.CONTENT_ALIGN_TOP_CENTER] = constants.CONTENT_ALIGN_TOP_CENTER;
        mirrorMap[constants.CONTENT_ALIGN_TOP_RIGHT] = constants.CONTENT_ALIGN_TOP_LEFT;
        mirrorMap[constants.CONTENT_ALIGN_MIDDLE_LEFT] = constants.CONTENT_ALIGN_MIDDLE_RIGHT;
        mirrorMap[constants.CONTENT_ALIGN_CENTER] = constants.CONTENT_ALIGN_CENTER;
        mirrorMap[constants.CONTENT_ALIGN_MIDDLE_RIGHT] = constants.CONTENT_ALIGN_MIDDLE_LEFT;
        mirrorMap[constants.CONTENT_ALIGN_BOTTOM_LEFT] = constants.CONTENT_ALIGN_BOTTOM_RIGHT;
        mirrorMap[constants.CONTENT_ALIGN_BOTTOM_CENTER] = constants.CONTENT_ALIGN_BOTTOM_CENTER;
        mirrorMap[constants.CONTENT_ALIGN_BOTTOM_RIGHT] = constants.CONTENT_ALIGN_BOTTOM_LEFT;

        prop.contentAlignment = mirrorMap[prop.contentAlignment];
    };


    //This functions will be called in the scope of widget instance
    var _mirrorFlexPosition = function UI$_mirrorFlexPosition() {
        var prop = this._kwebfw_.prop, left = prop.left, right = prop.right;

        prop.left = right;
        prop.right = left;
    };


    //This functions will be called in the scope of widget instance
    var _mirrorPadding = function UI$_mirrorPadding() {
        var prop = this._kwebfw_.prop, left = 0, right = 0;

        if(prop.padding) {
            left = prop.padding[0];
            right = prop.padding[2];
            prop.padding[0] = right;
            prop.padding[2] = left;
        }
    };


    //All widget file must have this variable
    //This functions will be called in the scope of widget instance
    var _populateUnderscore = {
        BasicWidget: function BasicWidget$_populateUnderscore() {
            var $K = voltmx.$kwebfw$, $KU = $K.utils, _ = null;

            if(!$KU.is(this._kwebfw_, 'object')) {
                $KU.defineProperty(this, '_kwebfw_', {}, null);
            }
            _ = this._kwebfw_;

            //NOTE:: Any changes to _ (underscore) may need a change in
            //       _cleanUnderscore function of voltmxui.js file.
            if(!_.ns) $KU.defineProperty(_, 'ns', 'voltmx.ui.BasicWidget', null);
            if(!_.name) $KU.defineProperty(_, 'name', 'BasicWidget', null);
            if(!_.layoutUnit) $KU.defineProperty(_, 'layoutUnit', '', true);
            if(!_.context) $KU.defineProperty(_, 'context', {}, null);
            if(!_.is) $KU.defineProperty(_, 'is', {}, null);
            if(!_.prop) $KU.defineProperty(_, 'prop', {}, null);
            if(!_.flex) {
                $KU.defineProperty(_, 'flex', {}, null);

                //This stores the resultant/final flex properties to be used.
                $KU.defineProperty(_.flex, 'final', {}, true);

                //This holds widget frame, helps to find if any change happened or not
                $KU.defineProperty(_.flex, 'frame', {x:null, y:null, width:-1, height:-1, doLayout:false});
            }
            if(!_.skinStateObj) $KU.defineProperty(_, 'skinStateObj', {bgType:voltmx.skin.BACKGROUND_TYPE_SINGLE_COLOR}, null);
            if(!_.ui) $KU.defineProperty(_, 'ui', {}, null);
            if(!_.pid) $KU.defineProperty(_, 'pid', '', true);
            if(!_.rid) $KU.defineProperty(_, 'rid', '', true);
            if(!_.uid) $KU.defineProperty(_, 'uid', '', true);
            if(typeof _.tabIndex !== 'number') {
                $KU.defineProperty(_, 'tabIndex', '', true);
            }
            if(typeof _.disabled !== 'boolean') {
                $KU.defineProperty(_, 'disabled', false, true);
            }
            if(typeof _.inModalContainer !== 'boolean') {
                $KU.defineProperty(_, 'inModalContainer', true, true);
            }
        },

        ContainerWidget: function ContainerWidget$_populateUnderscore() {
            var $K = voltmx.$kwebfw$, $KU = $K.utils, _ = null;

            if(!$KU.is(this._kwebfw_, 'object')) {
                $KU.defineProperty(this, '_kwebfw_', {}, null);
            }
            _ = this._kwebfw_;

            //NOTE:: Any changes to _ (underscore) may need a change in
            //       _cleanUnderscore function of voltmxui.js file.
            if(!_.ns) $KU.defineProperty(_, 'ns', 'voltmx.ui.ContainerWidget', null);
            if(!_.name) $KU.defineProperty(_, 'name', 'ContainerWidget', null);
        },

        GroupWidget: function GroupWidget$_populateUnderscore() {
            var $K = voltmx.$kwebfw$, $KU = $K.utils, _ = null;

            if(!$KU.is(this._kwebfw_, 'object')) {
                $KU.defineProperty(this, '_kwebfw_', {}, null);
            }
            _ = this._kwebfw_;

            //NOTE:: Any changes to _ (underscore) may need a change in
            //       _cleanUnderscore function of voltmxui.js file.
            if(!_.ns) $KU.defineProperty(_, 'ns', 'voltmx.ui.GroupWidget', null);
            if(!_.name) $KU.defineProperty(_, 'name', 'GroupWidget', null);
        },

        UserWidget: function UserWidget$_populateUnderscore() {
            var $K = voltmx.$kwebfw$, $KU = $K.utils, _ = null;

            if(!$KU.is(this._kwebfw_, 'object')) {
                $KU.defineProperty(this, '_kwebfw_', {}, null);
            }
            _ = this._kwebfw_;

            //NOTE:: Any changes to _ (underscore) may need a change in
            //       _cleanUnderscore function of voltmxui.js file.
            if(!_.ns) $KU.defineProperty(_, 'ns', 'voltmx.ui.UserWidget', null);
            if(!_.name) $KU.defineProperty(_, 'name', 'UserWidget', null);
            if(!_.context) $KU.defineProperty(_, 'context', {}, null);
            if(!_.is) $KU.defineProperty(_, 'is', {}, null);
            if(!_.prop) $KU.defineProperty(_, 'prop', {}, null);
            if(!_.rid) $KU.defineProperty(_, 'rid', '', true);
            if(!_.uid) $KU.defineProperty(_, 'uid', '', true);
        }
    };


    //All widget file must have this variable
    //This function will be called in the scope of widget instance
    var _postInitialization = {
        BasicWidget: function BasicWidget$_postInitialization(bconfig/*, lconfig, pspconfig*/) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget, _ = this._kwebfw_,
                _setRootContextOfForm = function(fmodel, id, appName) {
                    if($K.behavior.isCompositeApp) {
                        if(!_root[appName]) _root[appName] = {};

                        _root[appName][id] = fmodel;
                    } else {
                        _root[id] = fmodel;
                    }
                };

            $KU.defineProperty(_, 'uid', ('K'+$KU.uid()), false);
            $KU.defineProperty(_, 'rid', '', true); //_.rid will be updated in _createWidgetHierarchy function
            _map[_.uid] = this;
            $KU.defineProperty(_, 'wap', '', true); //_.wap will be updated in _createWidgetHierarchy function
            _.disabled = !this.enable;

            if($KW.shouldApplyRTL(this, 'contentAligment')) {
                _mirrorContentAlignment.call(this);
            }

            if($KW.shouldApplyRTL(this, 'flexPosition')) {
                _mirrorPadding.call(this);
                _mirrorFlexPosition.call(this);
            }

            if(_.is.component || $KU.is(this, 'widget', 'Form2')) {
                //NOTE:: Below 3 lines also there, in $KW.root() definition of this file.
                _.rid = _.uid;
                _.wap = _.prop.id;

                if($KU.is(this, 'widget', 'Form2')) {
                    _setRootContextOfForm(this, _.prop.id, bconfig.appName);
                }
            }
        },

        ContainerWidget: function ContainerWidget$_postInitialization(/*bconfig, lconfig, pspconfig*/) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils, _ = this._kwebfw_, self = this;

            if(_.is.component || $KU.is(this, 'widget', 'Form2')) {
                if(this._voltmxControllerName) {
                    _invokeAddWidgets.call(this);
                } else if($KU.is(this, 'widget', 'Form2')) {
                    $KU.defineGetter(window, this.id, function() {
                        _invokeAddWidgets.call(self, true);
                        return self;
                    });

                    $KU.defineSetter(window, this.id, function() {
                        return self;
                    });
                }
            }
        },

        UserWidget: function UserWidget$_postInitialization(/*bconfig, lconfig, pspconfig*/) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils, _ = this._kwebfw_;

            $KU.defineProperty(_, 'uid', ('K'+$KU.uid()), false);
            $KU.defineProperty(_, 'rid', '', true); //_.rid will be updated in _createWidgetHierarchy function
            _map[_.uid] = this;
            $KU.defineProperty(_, 'wap', '', true); //_.wap will be updated in _createWidgetHierarchy function

            _.rid = _.uid;
            _.wap = _.prop.id;
        }
    };


    var _playMediaWidget = function UI$_playMediaWidget(model) {
        var $K = voltmx.$kwebfw$, $KW = $K.widget, el = $KW.el(model);

        if(el.video) {
            if(el.video.src || el.video.srcObject || model.source) {
                el.video.play();
            }
        }
    };


    //This functions will be called in the scope of widget instance
    var _preparePaddingStyle = function UI$_preparePaddingStyle() {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget,
            padding = this.padding, unit = '', style = '';

        if(padding) {
            if($KU.is(this, 'widget', 'Button')
            || $KU.is(this, 'widget', 'Browser')
            || $KU.is(this, 'widget', 'Calendar')
            || $KU.is(this, 'widget', 'CheckBoxGroup')
            || $KU.is(this, 'widget', 'Label')
            || $KU.is(this, 'widget', 'ListBox')
            || $KU.is(this, 'widget', 'RadioButtonGroup')
            || $KU.is(this, 'widget', 'RichText')
            || $KU.is(this, 'widget', 'TextArea2')
            || $KU.is(this, 'widget', 'TextBox2')
            || $KU.is(this, 'widget', 'DataGrid')
            || $KW.isResponsiveContainer(this)) {
                padding = this.padding;
                unit = (this.paddingInPixel ? 'px' : '%');

                style += (padding[1]+unit+' '+ padding[2]+unit
                    +' '+ padding[3]+unit +' '+ padding[0]+unit);
            }
        }

        return style;
    };


    //This function must be called in the scope of form instance
    var _relayout = function UI$_relayout(model, forced, callback) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget, playout = '',
            _ = model._kwebfw_, pmodel = null, frameworkDoLayout = null;

        if(_.view && (model.isVisible || $K.F.RIVW)) {
            forced = (forced === true) ? true : false;

            if(!forced && _.relayout !== true
            && $KW.isOwnerWidget(model)
            && _dirty.templates[_.uid]) {
                _relayoutOwner.call(this, model, forced, callback);
            } else if(forced || _.relayout === true) {
                pmodel = $KW.pmodel(model);

                if(pmodel) {
                    playout = $KW.layout(pmodel);
                } else if(model === this || _.is.tab === true || _.is.template === true) {
                    playout = $KW.layout(voltmx.flex.FLOW_VERTICAL);
                }

                if($KU.is($K.ui[$KW.name(model)], 'object')) {
                    frameworkDoLayout = $K.ui[$KW.name(model)].doLayout;
                }

                if((forced || _.relayout === true)
                && ($KU.is(model.doLayout, 'function')
                || $KU.is(frameworkDoLayout, 'function'))) {
                    _doLayoutWidgtsList.push(model);
                }

                delete _.relayout;
                delete _dirty.cascade[_.uid];
                delete _dirty.widgets[_.uid];

                _.prop.frame = {x:null, y:null, width:-1, height:-1, doLayout:false};


                _applyFlexRule.call(model, playout, 'horizontal', null, forced, true);
                _applyFlexRule.call(model, playout, 'vertical', null, forced, true);

                _relayoutOwner.call(this, model, true, callback);

                if($KU.is(callback, 'function')) {
                    callback(model);
                }
            }
        }
    };


    //This function must be called in the scope of form instance
    var _relayoutOwner = function UI$_relayoutOwner(model, forced, callback) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget,
            _ = model._kwebfw_, relayoutTemplate = null;

        if($KW.isOwnerWidget(model)) {
            //This function must be called in the scope of form instance
            relayoutTemplate = function(tpl, cb) {
                var $K = voltmx.$kwebfw$, $KW = $K.widget;

                $KW.iterate(tpl, function(widget) {
                    var $K = voltmx.$kwebfw$, _ = widget._kwebfw_;

                    if(_.view && (widget.isVisible || $K.F.RIVW)) {
                        _relayout.call(this, widget, forced, cb);
                    } else {
                        delete _.relayout;
                        return true;
                    }
                }, {scope:this, tabs:false});
            };

            if(forced) {
                $KU.each(_.rows, function(tmodel) {
                    relayoutTemplate.call(this, tmodel, callback);
                }, this);

                $KU.each(_.items, function(tmodel) {
                    relayoutTemplate.call(this, tmodel, callback);
                }, this);
            } else {
                $KU.each(_dirty.templates[_.uid], function(tmodel) {
                    relayoutTemplate.call(this, tmodel, callback);
                }, this);
            }

            delete _dirty.templates[_.uid];
        }
    };


    //All widget file must have this variable
    //This functions will be called in the scope of widget instance
    var _relayoutActiveTriggerer = {
        BasicWidget: function BasicWidget$_relayoutActiveTriggerer() {
            return [
                'bottom', 'centerX', 'centerY', 'height',
                'isVisible', 'left', 'maxHeight',
                'maxWidth', 'minHeight', 'minWidth', 'right',
                'top', 'width'
            ];
        },

        ContainerWidget: function ContainerWidget$_relayoutActiveTriggerer() {
            return ['layoutType', 'reverseLayoutDirection'];
        },

        GroupWidget: function GroupWidget$_relayoutActiveTriggerer() {
            return [];
        },

        UserWidget: function UserWidget$_relayoutActiveTriggerer() {
            //
        }
    };


    //All widget file must have this variable
    //This functions will be called in the scope of widget instance
    var _relayoutPassiveTriggerer = {
        BasicWidget: function BasicWidget$_relayoutPassiveTriggerer() {
            return ['activeStateSkin', 'focusSkin', 'hoverSkin', 'skin'];
        },

        ContainerWidget: function ContainerWidget$_relayoutPassiveTriggerer() {
            return [];
        },

        GroupWidget: function GroupWidget$_relayoutPassiveTriggerer() {
            return [];
        },

        UserWidget: function UserWidget$_relayoutPassiveTriggerer() {
            //
        }
    };


    var _removeFullHierarchy = function UI$_removeFullHierarchy(widget) {
        var $K = voltmx.$kwebfw$, $KW = $K.widget,
            mode = $K.behavior.fullWidgetHierarchy;

        if(mode !== true) {
            return;
        }

        $KW.iterate(widget, function(model) {
            var $K = voltmx.$kwebfw$, $KW = $K.widget,
                pmodel = null, rmodel = null, id = '';

            if(model._kwebfw_.uwi instanceof voltmx.ui.UserWidget) {
                model = model._kwebfw_.uwi;
            }

            pmodel = $KW.pmodel(model);
            rmodel = $KW.rmodel(model);
            id = model.id;

            $KW.closest(model, function(parent) {
                if(parent._kwebfw_.uwi === model) {
                    parent = model;
                }

                if(parent === rmodel) {
                    return true;
                } else if(parent[id] === model) {
                    if(!(parent === model || parent === pmodel)) {
                        delete parent[id];
                    }
                }
            });
        });
    };


    //This function must be called in the scope of widget instance
    var _removeWidget = function UI$_removeWidget(widget) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget, $KA = $K.app,
            fmodel = $KW.fmodel(this), rmodel = null, widgets = null,
            proxy = $KW.proxy(widget), pmodel = $KW.pmodel(proxy), wlen = -1,
            _ = (proxy) ? proxy._kwebfw_ : null, modal = null, index = -1;

        if($KU.is(proxy, 'widget')) {
            if(pmodel === this) {
                index = $KW.index(proxy);
                widgets = $KW.children(this);
                wlen = widgets.length;
            }

            if(index >= 0 && index < wlen) {
                rmodel = $KW.rmodel(this);
                _removeWidgetFromView.call(proxy);
                _removeFullHierarchy(widget);
                this._kwebfw_.children.splice(index, 1);

                if(_.uwi instanceof voltmx.ui.UserWidget) {
                    delete this[_.uwi.id];
                } else {
                    delete this[proxy.id];
                }

                _removeWidgetHierarchy.call(this, proxy, rmodel, true);

                _markRelayoutOnRemove.call(this, index);

                if(fmodel && fmodel === $KW.model($KA.currentFormUID)
                && $KW.contains(widget, fmodel._kwebfw_.modalContainer, false)) {
                    modal = $KW.deduceModalContainer(fmodel);
                    $KW.updateModalContainer(fmodel, modal);
                }
            }
        }
    };


    //This function must be called in the scope of widget instance
    var _removeWidgetFromView = function UI$_removeWidgetFromView() {
        var $K = voltmx.$kwebfw$, $KW = $K.widget;

        $KW.removeView(this);
    };


    //Here cmodel can never be an instanceof voltmx.ui.UserWidget
    //This function must be called in the scope of widget instance
    var _removeWidgetHierarchy = function UI$_removeWidgetHierarchy(cmodel, rmodel, remove) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget, _ = cmodel._kwebfw_;

        if($KU.is(rmodel, 'widget')) {
            if(remove === true) {
                _.is.removed = true;
            }

            $KW.iterate(cmodel, function(widget) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget,
                    _ = widget._kwebfw_, meta = {pid:false, rid:false},
                    tpmodel = null;

                if(remove === false || _.is.removed !== true) {
                    _.is.removed = null;
                }

                if(remove === true) {
                    if(!_.is.component && !(_.is.tab === true && _.tpid)) {
                        meta.rid = true;
                    }

                    if(_.is.removed === true) {
                        meta.pid = true;
                    }

                    tpmodel = (!_.is.component) ? rmodel : $KW.rmodel($KW.pmodel(widget));

                    if(tpmodel && tpmodel._kwebfw_.is.tab && tpmodel._kwebfw_.tpid) {
                        tpmodel = $KW.model(tpmodel._kwebfw_.tpid);
                    } else tpmodel = null; //IMPORTANT:: Don't remove this else condition

                    if(tpmodel) delete tpmodel[widget.id];

                    if(_.uwi instanceof voltmx.ui.UserWidget) {
                        delete rmodel[_.uwi.id];
                        _.uwi._kwebfw_.wap = '';
                        _cleanUnderscore.call(_.uwi, meta);
                    } else {
                        delete rmodel[widget.id];
                    }

                    _.wap = '';
                    _cleanUnderscore.call(widget, meta);

                    if(_.is.component || $KU.is(widget, 'widget', 'TabPane')) {
                        $KU.each($KW.children(widget, {tabs:true}), function(model) {
                            _removeWidgetHierarchy.call(this, model, this, false);
                        }, widget);

                        widget._flush();
                        return true;
                    }
                }

                widget._flush();
            }, {scope:this, tabs:false});
        }
    };


    var _resolveMeasures = function UI$_resolveMeasures() {
        var $K = voltmx.$kwebfw$, $KU = $K.utils;

        //Populate height/width
        $KU.each(_measures, function $each_resolveMeasures_height_width_pheight(info/*, uid*/) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils, pelement = null;

            if(info.cview) {
                if(info.height && (!$KU.is(info.cheight, 'number') || info.cheight < 0)) {
                    info.cheight = info.cview.offsetHeight;
                }

                if(info.width && (!$KU.is(info.cwidth, 'number') || info.cwidth < 0)) {
                    info.cwidth = info.cview.offsetWidth;
                }
            }

            if(info.pview) {
                if(!$KU.is(info.pheight, 'number') || info.pheight < 0) {
                    if(!pelement) pelement = $KW.el(info.pview);

                    if($KU.is(pelement.scrolee, 'dom')) {
                        info.pheight = pelement.scrolee.offsetHeight;
                    } else if($KU.is(pelement.viewport, 'dom')) {
                        info.pheight = pelement.viewport.offsetHeight;
                    } else if($KU.is(pelement.node, 'dom')) {
                        info.pheight = pelement.node.offsetHeight;
                    }
                }
            }
        });

        $KU.each(_measures, function $each_resolveMeasures_position(info, uid) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils, calc = '',
                $KW = $K.widget, $KD = $K.dom, sprop = '',
                cfinal = null, cmodel = null, pmodel = null, playout = '';

            if(info.cview) {
                cmodel = $KW.model(uid);
                pmodel = $KW.pmodel(cmodel);
                playout = $KW.layout(pmodel);

                $KU.each(info.position, function(flag, position) {
                    var $K = voltmx.$kwebfw$, $KW = $K.widget;

                    if(flag === true && position.indexOf('_reverse') === -1) {
                        cfinal = cmodel._kwebfw_.flex.final;

                        if(position === 'centerX') {
                            if(playout === 'fflex') {
                                if(info.position[(position+'_reverse')] === true) {
                                    calc = 'calc(100% - '+info.cwidth+'px - ('+cfinal.centerX+' - '+info.cwidth+'px/2))';
                                    sprop = 'right';
                                } else {
                                    calc = 'calc('+cfinal.centerX+' - '+info.cwidth+'px/2)';
                                    sprop = 'left';
                                }
                            } else {
                                calc = 'calc('+cfinal.centerX+' - '+info.cwidth+'px/2)';
                                sprop = 'marginLeft';
                            }

                            $KD.style(info.cview, sprop, calc);
                        } else if(position === 'centerY') {
                            if(playout === 'vflex') {
                                if($KW.inPercent(cfinal.centerY)) {
                                    sprop = cfinal.centerY.replace('%', '');
                                    sprop = parseFloat(sprop, 10);
                                    sprop = ((sprop * info.pheight) / 100);
                                } else {
                                    sprop = cfinal.centerY.replace('px', '');
                                    sprop = parseFloat(sprop, 10);
                                }
                                calc = 'calc('+sprop+'px - '+info.cheight+'px/2)';
                                sprop = 'marginTop';
                            } else if(playout === 'fflex') {
                                if(info.position[(position+'_reverse')] === true) {
                                    calc = 'calc(100% - '+info.cheight+'px - ('+cfinal.centerY+' - '+info.cheight+'px/2))';
                                    sprop = 'bottom';
                                } else {
                                    calc = 'calc('+cfinal.centerY+' - '+info.cheight+'px/2)';
                                    sprop = 'top';
                                }
                            } else if(playout === 'hflex') {
                                calc = 'calc('+cfinal.centerY+' - '+info.cheight+'px/2)';
                                sprop = ($KW.inPercent(cfinal.centerY)) ? 'top' : 'marginTop';
                            }

                            $KD.style(info.cview, sprop, calc);
                        } else if(playout === 'vflex'
                        && ['top', 'bottom'].indexOf(position) >= 0) {
                            calc = cfinal[position].replace('%', '');
                            calc = parseFloat(calc, 10);
                            calc = ((calc * info.pheight) / 100);
                            sprop = (position === 'top') ? 'marginTop' : 'marginBottom';

                            $KD.style(info.cview, sprop, (calc+'px'));
                        }
                    }
                });
            }
        });

        _measures = {}; //Reset
    };


    var _resolveMutates = function UI$_resolveMutates() {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, cacheOverflowY = {};

        //Save scroll position, before setting height to zero
        if($KU.scrollType() === 'native') {
            $KU.each(_mutates, function $each_resolveMutates_getScrollPosition(view) {
                var $K = voltmx.$kwebfw$, scroll = null, el = null,
                    $KW = $K.widget, model = $KW.model(view);

                if(view && $KW.isFlexContainer(model)
                && $KW.name(model) !== 'FlexContainer') {
                    el = $KW.el(view);
                    scroll = model._kwebfw_.ui.scroll;

                    scroll.left = el.viewport.scrollLeft;
                    scroll.top = el.viewport.scrollTop;
                }
            });
        }

        //Set height to zero
        $KU.each(_mutates, function $each_resolveMutates_setHeightToZero(view) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget,
                $KD = $K.dom, model = $KW.model(view);

            if(view) {
                $KD.style(view, 'height', '0px');

                $KU.each($KW.children(model), function $each_resolveMutates_cacheOverflowY(cmodel) {
                    var $K = voltmx.$kwebfw$, $KD = $K.dom, _ = cmodel._kwebfw_, overflow = '';

                    if(_.view && (cmodel.isVisible || $K.F.RIVW)) {
                        overflow = $KD.style(_.view, 'overflow-y');

                        if(overflow !== 'hidden') {
                            cacheOverflowY[_.uid] = overflow;
                            $KD.style(_.view, 'overflowY', 'hidden');
                        }
                    }
                });
            }
        });

        //Set height to scrollHeight
        $KU.each(_mutates, function $each_resolveMutates_setToScrollHeight(view) {
            var $K = voltmx.$kwebfw$, $KD = $K.dom;

            view && $KD.style(view, 'height', (view.scrollHeight+'px'));
        });

        $KU.each(cacheOverflowY, function $each_resolveMutates_applyOverflowY(value, uid) {
            var $K = voltmx.$kwebfw$, $KW = $K.widget, $KD = $K.dom,
                model = $KW.model(uid), _ = model._kwebfw_;

            if(value) {
                $KD.style(_.view, 'overflowY', value);
            } else {
                $KD.style(_.view, 'overflow-y', null);
            }
        });

        //Reassign scroll position
        $KU.each(_mutates, function $each_resolveMutates_setScrollPosition(view) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils, scroll = null,
                $KW = $K.widget, model = $KW.model(view), el = null;

            if(view && $KW.isFlexContainer(model)
            && $KW.name(model) !== 'FlexContainer') {
                el = $KW.el(view);
                scroll = model._kwebfw_.ui.scroll;

                if($KU.scrollType() === 'native') {
                    el.viewport.scrollLeft = scroll.left;
                    el.viewport.scrollTop = scroll.top;
                    delete scroll.left; delete scroll.top;
                } else {
                    //TODO:: Scroll instance x,y to be set
                }
            }
        });

        _mutates = []; //Reset
    };


    var _setCenterYStyleInsideVerticalLayout = function UI$_setCenterYStyleInsideVerticalLayout(value, fprop, cmodel, cview, pview) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget, flag = true,
            inPercent = false, final = cmodel._kwebfw_.flex.final, size = final.height;

        if($KU.is(value, 'number')) value += 'px';
        inPercent = $KW.inPercent(value);

        if(size) {
            if((inPercent && $KW.inPercent(size))
            ||(!inPercent && !$KW.inPercent(size))) {
                value = parseFloat(value.replace('%', ''), 10);
                size = parseFloat(size.replace('%', ''), 10);
                value = (value - (size / 2));

                if(!inPercent || (inPercent && value > 0)) {
                    value += (inPercent) ? '%' : 'px';
                    flag = _setTopOrBottomStyleInsideVerticalLayout(value, fprop, cmodel, cview, pview);
                }
            }
        }

        return flag;
    };


    //All widget file must have this variable
    //All the functions will be called in the scope of widget instance
    var _setter = {
        BasicWidget: {
            accessibilityConfig: function BasicWidget$_setter_accessibilityConfig(old) {
                var prop = this._kwebfw_.prop, a11y = prop.accessibilityConfig;

                if(!old && a11y && a11y.tagName) {
                    delete a11y.tagName;
                } else if(old && old.tagName && !a11y) {
                    prop.accessibilityConfig = {tagName: old.tagName};
                } else if(old && a11y) {
                    if(!old.tagName && a11y.tagName) {
                        delete a11y.tagName;
                    } else if(old.tagName && !a11y.tagName) {
                        a11y.tagName = old.tagName;
                    } else if(old.tagName && a11y.tagName) {
                        a11y.tagName = old.tagName;
                    }
                }
            },

            contentAligment: function BasicWidget$_setter_contentAligment() {
                var $K = voltmx.$kwebfw$, $KW = $K.widget;

                if($KW.shouldApplyRTL(this, 'contentAligment')
                    && $K.behavior.rtlMirroringInWidgetPropertySetter === true) {
                    _mirrorContentAlignment.call(this);
                }
            },

            enable: function BasicWidget$_setter_enable(/*old*/) {
                var $K = voltmx.$kwebfw$, $KW = $K.widget;

                $KW.iterate(this, function(model) {
                    var $K = voltmx.$kwebfw$, $KW = $K.widget,
                        _ = model._kwebfw_, pmodel = $KW.pmodel(model);

                    _.disabled = !model.enable;
                    $KW.handleTabPaneEnablement(model, true);
                    $KW.setupUIInteraction(model, $KW.focusableElement(model));

                    if(pmodel) {
                        if(pmodel._kwebfw_.disabled && !_.disabled) {
                            _.disabled = true;

                            $KW.handleTabPaneEnablement(model, true);
                            //For performance, not to again iterate over each widget again
                            //Calling DOM manipulation API "$KW.setupUIInteraction()" here.
                            $KW.setupUIInteraction(model, $KW.focusableElement(model));
                        }
                    } else {
                        return true; //Break the loop
                    }
                }, {scope:this, tabs:false});
            },

            isVisible: function BasicWidget$_setter_isVisible(old) {
                var $K = voltmx.$kwebfw$, $KW = $K.widget;

                if(old === false) {
                    $KW.iterate(this, function(model) {
                        var $K = voltmx.$kwebfw$, $KW = $K.widget;

                        if(model !== this) {
                            if(model.isVisible) {
                                $KW.markRelayout(model);
                            } else {
                                return true; //Break the loop
                            }
                        }
                    }, {scope:this, tabs:true});
                }
            },

            left: function BasicWidget$_setter_left(old) {
                var $K = voltmx.$kwebfw$, $KW = $K.widget,
                    prop = this._kwebfw_.prop,
                    left = prop.left;

                if($KW.shouldApplyRTL(this, 'flexPosition')
                    && $K.behavior.rtlMirroringInWidgetPropertySetter === true) {
                    prop.right = left;
                    prop.left = old;
                }
            },

            padding: function BasicWidget$_setter_padding() {
                var $K = voltmx.$kwebfw$, $KW = $K.widget;

                if($KW.shouldApplyRTL(this, 'flexPosition')
                && $K.behavior.rtlMirroringInWidgetPropertySetter === true) {
                    _mirrorPadding.call(this);
                }
            },

            right: function BasicWidget$_setter_right(old) {
                var $K = voltmx.$kwebfw$, $KW = $K.widget,
                    prop = this._kwebfw_.prop, right = prop.right;

                if($KW.shouldApplyRTL(this, 'flexPosition')
                && $K.behavior.rtlMirroringInWidgetPropertySetter === true) {
                    prop.left = right;
                    prop.right = old;
                }
            }
        },

        ContainerWidget: {
            addWidgets: function ContainerWidget$_setter_addWidgets(/*old*/) {
                delete this._kwebfw_.children;
            },

            layoutType: function ContainerWidget$_setter_layoutType(/*old*/) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget;

                if($KW.isFlexContainer(this)) {
                    $KU.each($KW.children(this), function(cmodel) {
                        var $K = voltmx.$kwebfw$, $KW = $K.widget;

                        $KW.markRelayout(cmodel);
                    });
                }
            },

            gutterX: function ContainerWidget$_setter_gutterX() {
                var $K = voltmx.$kwebfw$, $KW = $K.widget, $KU = $K.utils,
                    prop = this._kwebfw_.prop;

                if(prop.layoutType === voltmx.flex.RESPONSIVE_GRID) {
                    $KU.each($KW.children(this), function(cmodel) {
                        $KW.markRelayout(cmodel);
                    }, this);
                }
            },

            gutterY: function ContainerWidget$_setter_gutterY() {
                var $K = voltmx.$kwebfw$, $KW = $K.widget, $KU = $K.utils,
                    prop = this._kwebfw_.prop;

                if(prop.layoutType === voltmx.flex.RESPONSIVE_GRID) {
                    $KU.each($KW.children(this), function(cmodel) {
                        $KW.markRelayout(cmodel);
                    }, this);
                }
            }
        },

        GroupWidget: {
            //
        },

        UserWidget: {
            //
        }
    };


    var _setTopOrBottomStyleInsideVerticalLayout = function UI$_setTopOrBottomStyleInsideVerticalLayout(value, fprop, cmodel, cview, pview) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget,
            $KD = $K.dom, shim = null, sprop = '', flag = true;

        if($KU.is(value, 'number')) value += 'px';

        if(!$KW.inPercent(value) || value === '0%') { //value not in percentage
            sprop = (fprop === 'top') ? 'marginTop' : 'marginBottom';
            $KD.style(cview, sprop, value);

            flag = false;
        } else if(value[0] !== '-') { //value in +ve percentage
            if((!$KU.is(cmodel._kwebfw_.viewPrev, 'dom') && fprop === 'top')
            || (!$KU.is(cmodel._kwebfw_.viewNext, 'dom') && fprop === 'bottom')) {
                shim = $KD.create('DIV');
                $KD.setAttr(shim, 'kr', 'spacer');
            }

            if(!$KU.is(cmodel._kwebfw_.viewPrev, 'dom') && fprop === 'top') {
                cmodel._kwebfw_.viewPrev = shim;
            } else if(!$KU.is(cmodel._kwebfw_.viewNext, 'dom') && fprop === 'bottom') {
                cmodel._kwebfw_.viewNext = shim;
            }

            if($K.F.RIVW) {
                if(cmodel.isVisible) {
                    if(fprop === 'bottom') {
                        $KD.removeAttr(cmodel._kwebfw_.viewNext, 'hidden');
                    } else if(fprop === 'top') {
                        $KD.removeAttr(cmodel._kwebfw_.viewPrev, 'hidden');
                    }
                } else {
                    if(fprop === 'bottom') {
                        $KD.setAttr(cmodel._kwebfw_.viewNext, 'hidden', true);
                    } else if(fprop === 'top') {
                        $KD.setAttr(cmodel._kwebfw_.viewPrev, 'hidden', true);
                    }
                }
            }

            if(pview && $KD.contains(pview, cview)) {
                if(fprop === 'top') {
                    if(!$KD.contains(pview, cmodel._kwebfw_.viewPrev)) {
                        $KD.before(cview, cmodel._kwebfw_.viewPrev);
                        $KD.style(cmodel._kwebfw_.viewPrev, 'height', value);
                    }
                } else if(fprop === 'bottom') {
                    if(!$KD.contains(pview, cmodel._kwebfw_.viewNext)) {
                        $KD.next(cview, cmodel._kwebfw_.viewNext);
                        $KD.style(cmodel._kwebfw_.viewNext, 'height', value);
                    }
                }
            }

            flag = false;
        }

        return flag;
    };


    //All the functions will be called in the scope of widget instance
    var _shouldDeduceModalContainer = {
        onAdd: function UI$_shouldDeduceModalContainer_onAdd() {
            var $K = voltmx.$kwebfw$, $KW = $K.widget, flag = false;

            $KW.iterate(this, function(widget) {
                if(widget.isModalContainer) {
                    flag = true;
                    return true;
                }
            }, {tabs:false});

            return flag;
        },

        onZindexChange: function UI$_shouldDeduceModalContainer_onZindexChange(newVal, oldVal) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget, flag = false,
                fmodel = $KW.fmodel(this), modal = fmodel._kwebfw_.modalContainer;

            if(modal) {
                if($KU.is(newVal, 'integer') && oldVal === voltmx.flex.ZINDEX_AUTO) {
                    flag = true;
                } else if($KU.is(oldVal, 'integer') && newVal === voltmx.flex.ZINDEX_AUTO) {
                    if(this.isModalContainer || $KW.contains(this, modal, false)) {
                        flag = true;
                    }
                } else if($KU.is(newVal, 'integer') && $KU.is(oldVal, 'integer')) {
                    if($KW.contains(this, modal, false) && (newVal < oldVal)) {
                        flag = true;
                    } else if((newVal > oldVal) && this.isModalContainer) {
                        flag = true;
                    }
                }
            }

            return flag;
        }
    };


    var _shouldRelayoutChild = function UI$_shouldRelayoutChild(model, pmodel) {
        var $K = voltmx.$kwebfw$, $KW = $K.widget,
            possibilityOfParentHeightChange = false,
            possibilityOfParentWidthChange = false,
            pfinal = pmodel._kwebfw_.flex.final,
            flag = false, final = model._kwebfw_.flex.final;

        if(!flag) {
            if(!pfinal.height
            || pfinal.height !== pmodel.height
            || $KW.isImplicitHeight(pmodel)) {
                possibilityOfParentHeightChange = true;
            }

            if(possibilityOfParentHeightChange) {
                if((final.height && $KW.inPercent(final.height) && final.height !== '0%')
                || (final.minHeight && $KW.inPercent(final.minHeight) && final.minHeight !== '0%')
                || (final.maxHeight && $KW.inPercent(final.maxHeight) && final.maxHeight !== '0%')
                || (final.centerY && $KW.inPercent(final.centerY) && final.centerY !== '0%')
                || (final.top && $KW.inPercent(final.top) && final.top !== '0%')
                || final.bottom || $KW.isImplicitHeight(model)) {
                    flag = true;
                }
            }
        }

        if(!flag) {
            if((pfinal.width !== pmodel.width
            && !(pfinal.width === '100%' && !pmodel.width))
            || $KW.isImplicitWidth(pmodel)) {
                possibilityOfParentWidthChange = true;
            }

            if(possibilityOfParentWidthChange) {
                if((final.width && $KW.inPercent(final.width) && final.width !== '0%')
                || (final.minWidth && $KW.inPercent(final.minWidth) && final.minWidth !== '0%')
                || (final.maxWidth && $KW.inPercent(final.maxWidth) && final.maxWidth !== '0%')
                || (final.centerX && $KW.inPercent(final.centerX) && final.centerX !== '0%')
                || (final.left && $KW.inPercent(final.left) && final.left !== '0%')
                || final.right || $KW.isImplicitWidth(model)) {
                    flag = true;
                }
            }
        }

        return flag;
    };


    var _shouldRelayoutParent = function UI$_shouldRelayoutParent(pmodel) {
        var $K = voltmx.$kwebfw$, $KW = $K.widget, flag = false;

        if(!$KW.isFixedHeight(pmodel) || !$KW.isFixedWidth(pmodel)) {
            flag = true;
        }

        return flag;
    };


    var _shouldRelayoutSiblings = function UI$_shouldRelayoutSiblings(pmodel) {
        var $K = voltmx.$kwebfw$, $KW = $K.widget, flag = false;

        if(['hflex', 'vflex'].indexOf($KW.layout(pmodel) >= 0)) {
            flag = true;
        }

        return flag;
    };


    var _shouldRelayoutTemplate = function UI$_shouldRelayoutTemplate(tmodel) {
        var $K = voltmx.$kwebfw$, $KW = $K.widget, flag = false;

        if(!$KW.isFixedHeight(tmodel)) {
            flag = true;
        }

        return flag;
    };


    //Here model can never be an instance of voltmx.ui.UserWidget
    //This function must be called in the scope of widget instance
    var _updateComponentWidgetPath = function UI$_updateComponentWidgetPath(model) {
        var $K = voltmx.$kwebfw$, $KW = $K.widget;

        $KW.iterate(model, function(widget) {
            var _ = widget._kwebfw_;

            if(widget !== this) {
                _.wap = (this._kwebfw_.wap + '_' + widget.id);

                if(_.uwi instanceof voltmx.ui.UserWidget) {
                    _.uwi._kwebfw_.wap = _.wap;
                }

                if(_.is.component) {
                    _updateComponentWidgetPath.call(widget, widget);
                    return true; //Do not loop over component children.
                }
            }
        }, {scope:this, tabs:false});
    };


    //This function must be called in the scope of TabPane widget instance
    var _updateTabPaneWidgetPath = function UI$_updateTabPaneWidgetPath() {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, _ = this._kwebfw_;

        $KU.each(_.tabs, function(tab/*, index*/) {
            var $K = voltmx.$kwebfw$, $KW = $K.widget;

            $KW.iterate(this[tab.id], function(model) {
                var _ = model._kwebfw_;

                _.wap = (this._kwebfw_.wap + _.wap);

                if(_.uwi instanceof voltmx.ui.UserWidget) {
                    _.uwi._kwebfw_._wap = _.wap;
                }
            }, {scope:this, tabs:false});
        }, this);
    };


    //All widget file must have this variable
    //All the functions will be called in the scope of widget instance
    //These function should always return a boolean value
    var _valid = {
        BasicWidget: {
            accessibilityConfig: function BasicWidget$_valid_accessibilityConfig(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils,
                    $KW = $K.widget, flag = false, tag = '',
                    name = '', supportedTags = {
                        FlexContainer: ['div', 'th', 'td', 'tr'],
                        FlexScrollContainer: ['div', 'th', 'td'],
                        Label: ['label', 'div', 'span', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
                        SegmentedUI2: ['ul', 'ol', 'div', 'table']
                    };

                if($KU.is(value, 'object') || $KU.is(value, 'null')) {
                    flag = true;

                    if(value && Object.prototype.hasOwnProperty.call(value, 'tagName')) {
                        tag = value.tagName;
                        name = $KW.name(this);

                        if(!($KU.is(tag, 'string') && supportedTags[name]
                        && supportedTags[name].indexOf(tag.toLowerCase()) >= 0)) {
                            flag = false;
                        }
                    }
                }

                return flag;
            },

            activeStateSkin: function BasicWidget$_valid_activeStateSkin(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'object')
                || ($KU.is(value, 'string') && value.split(' ').length === 1)) {
                    flag = true;
                }

                return flag;
            },

            anchorPoint: function BasicWidget$_valid_anchorPoint(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'null')) {
                    flag = true;
                } else if($KU.is(value, 'object')
                && $KU.is(value.x, 'number')
                && value.x >= 0 && value.x <= 1
                && $KU.is(value.y, 'number')
                && value.y >= 0 && value.y <= 1) {
                    flag = true;
                }

                return flag;
            },

            autogrowMode: function BasicWidget$_valid_autogrowMode(value) {
                var flag = false;

                if(value === voltmx.flex.AUTOGROW_HEIGHT
                || value === voltmx.flex.AUTOGROW_NONE) {
                    flag = true;
                }

                return flag;
            },

            backgroundColor: function BasicWidget$_valid_backgroundColor(value) {
                var $K = voltmx.$kwebfw$, $KW = $K.widget;

                return $KW.skinUtils.validColorValue(value);
            },

            backgroundColorMultiStepGradient: function BasicWidget$_valid_backgroundColorMultiStepGradient(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'object') || $KU.is(value, 'null')) {
                    flag = true;
                }

                return flag;
            },

            backgroundColorTwoStepGradient: function BasicWidget$_valid_backgroundColorTwoStepGradient(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'object') || $KU.is(value, 'null')) {
                    flag = true;
                }

                return flag;
            },

            backgroundImage: function BasicWidget$_valid_backgroundImage(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'string') || $KU.is(value, 'null')) {
                    flag = true;
                }

                return flag;
            },

            blur: function BasicWidget$_valid_blur(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'object')
                && $KU.is(value.enabled, 'boolean')
                && $KU.is(value.value, 'number')) {
                    flag = true;
                }
                if(flag) {
                    if(value.value < 0) {
                        flag = [{enabled:value.enabled, value: 0}, true];
                    } else if(value.value > 100) {
                        flag = [{enabled:value.enabled, value: 100}, true];
                    }
                }

                return flag;
            },

            borderColor: function BasicWidget$_valid_borderColor(value) {
                var $K = voltmx.$kwebfw$, $KW = $K.widget;

                return $KW.skinUtils.validColorValue(value);
            },

            borderWidth: function BasicWidget$_valid_borderWidth(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils;

                return _validPositionalUnit(value, true) || $KU.is(value, 'object') || $KU.is(value, 'null');
            },

            blockedUISkin: function BasicWidget$_valid_blockedUISkin(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'object')
                || ($KU.is(value, 'string') && value.split(' ').length === 1)) {
                    flag = true;
                }

                return flag;
            },

            bottom: function BasicWidget$_valid_bottom(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils,
                    flag = _validPositionalUnit(value);

                if(!flag && $K.F.EIWP) {
                    if($KU.is(value, 'null')
                    || $KU.is(value, 'undefined')) {
                        flag = ['', true];
                    }
                }

                return flag;
            },

            centerX: function BasicWidget$_valid_centerX(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils,
                    flag = _validPositionalUnit(value);

                if(!flag && $K.F.EIWP) {
                    if($KU.is(value, 'null')
                    || $KU.is(value, 'undefined')) {
                        flag = ['', true];
                    }
                }

                return flag;
            },

            centerY: function BasicWidget$_valid_centerY(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils,
                    flag = _validPositionalUnit(value);

                if(!flag && $K.F.EIWP) {
                    if($KU.is(value, 'null')
                    || $KU.is(value, 'undefined')) {
                        flag = ['', true];
                    }
                }

                return flag;
            },

            contentAlignment: function BasicWidget$_valid_contentAlignment(value) {
                var flag = false, options = [
                    constants.CONTENT_ALIGN_BOTTOM_CENTER,
                    constants.CONTENT_ALIGN_BOTTOM_LEFT,
                    constants.CONTENT_ALIGN_BOTTOM_RIGHT,
                    constants.CONTENT_ALIGN_MIDDLE_LEFT,
                    constants.CONTENT_ALIGN_MIDDLE_RIGHT,
                    constants.CONTENT_ALIGN_TOP_CENTER,
                    constants.CONTENT_ALIGN_TOP_LEFT,
                    constants.CONTENT_ALIGN_TOP_RIGHT,
                    constants.CONTENT_ALIGN_CENTER
                ];

                if(options.indexOf(value) >= 0) {
                    flag = true;
                }

                return flag;
            },

            cornerRadius: function BasicWidget$_valid_cornerRadius(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils;

                return _validPositionalUnit(value, true) || $KU.is(value, 'object') || $KU.is(value, 'null');
            },

            cursorType: function BasicWidget$_valid_cursorType(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'string')) {
                    flag = true;
                }

                return flag;
            },

            doLayout: function BasicWidget$_valid_doLayout(value) {
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

            enable: function BasicWidget$_valid_enable(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'boolean')) {
                    flag = true;
                }

                return flag;
            },

            focusSkin: function BasicWidget$_valid_focusSkin(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'object')
                || ($KU.is(value, 'string') && value.split(' ').length === 1)) {
                    flag = true;
                }

                return flag;
            },

            focusStateSkinProperties: function BasicWidget$_valid_focusStateSkinProperties(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'object') || $KU.is(value, 'null')) {
                    flag = true;
                }

                return flag;
            },

            fontColor: function BasicWidget$_valid_fontColor(value) {
                var $K = voltmx.$kwebfw$, $KW = $K.widget;

                return $KW.skinUtils.validColorValue(value);
            },

            fontFamily: function BasicWidget$_valid_fontFamily(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'string') || $KU.is(value, 'null')) {
                    flag = true;
                }

                return flag;
            },

            fontSize: function BasicWidget$_valid_fontSize(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'number') || $KU.is(value, 'null')) {
                    flag = true;
                }

                return flag;
            },

            fontStyle: function BasicWidget$_valid_fontStyle(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false, options = [
                    '',
                    voltmx.skin.FONT_STYLE_ITALIC,
                    voltmx.skin.FONT_STYLE_NONE,
                    voltmx.skin.FONT_STYLE_UNDERLINE
                ];

                if(($KU.is(value, 'string')&& (options.indexOf(value) >= 0))
                || $KU.is(value, 'null')) {
                    flag = true;
                }

                return flag;
            },

            fontWeight: function BasicWidget$_valid_fontWeight(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false, options = [
                    '',
                    voltmx.skin.FONT_WEIGHT_BOLD,
                    voltmx.skin.FONT_WEIGHT_NORMAL
                ];

                if(($KU.is(value, 'string')&& (options.indexOf(value) >= 0))
                || $KU.is(value, 'null')) {
                    flag = true;
                }

                return flag;
            },

            frame: function BasicWidget$_valid_frame(value) {
                var flag = false, $K = voltmx.$kwebfw$, $KU = $K.utils;

                if($KU.is(value, 'object')
                && ($KU.is(value.x, 'null') || $KU.is(value.x, 'number'))
                && ($KU.is(value.y, 'null') || $KU.is(value.y, 'number'))
                && ($KU.is(value.height, 'null') || ($KU.is(value.height, 'number') && value.height >= 0))
                && ($KU.is(value.width, 'null') || ($KU.is(value.width, 'number') && value.width >= 0))) {
                    flag = true;
                }

                return flag;
            },

            //It specifies, height of the widget and measured along the y-axis.
            height: function BasicWidget$_valid_height(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils,
                    flag = _validPositionalUnit(value);

                if(!flag && $K.F.EIWP) {
                    if($KU.is(value, 'null')
                    || $KU.is(value, 'undefined')) {
                        flag = ['', true];
                    }
                }

                return flag;
            },

            hoverSkin: function BasicWidget$_valid_hoverSkin(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'object')
                || ($KU.is(value, 'string') && value.split(' ').length === 1)) {
                    flag = true;
                }

                return flag;
            },

            hoverStateSkinProperties: function BasicWidget$_valid_hoverStateSkinProperties(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'object') || $KU.is(value, 'null')) {//todo
                    flag = true;
                }

                return flag;
            },


            id: function BasicWidget$_valid_id(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, regexp = null, flag = false;

                regexp = /^[a-zA-Z][a-zA-Z0-9]*$/;

                if($KU.is(value, 'string') && value && regexp.test(value)) {
                    flag = true;
                }

                if(flag && ['metaInfo', 'template', 'onRowClick', 'onItemSelect'].indexOf(value) >= 0) {
                    flag = false;
                }

                return flag;
            },

            info: function BasicWidget$_valid_info(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'object')) {
                    flag = true;
                } else if(!flag && $K.F.EIWP && $KU.is(value, 'null')) {
                    flag = [null, true];
                }

                return flag;
            },

            isVisible: function BasicWidget$_valid_isVisible(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'boolean')) {
                    flag = true;
                } else if(!flag && $K.F.EIWP) {
                    flag = [!!value, true];
                }

                return flag;
            },

            left: function BasicWidget$_valid_left(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils,
                    flag = _validPositionalUnit(value);

                if(!flag && $K.F.EIWP) {
                    if($KU.is(value, 'null')
                    || $KU.is(value, 'undefined')) {
                        flag = ['', true];
                    }
                }

                return flag;
            },

            maxHeight: function BasicWidget$_valid_maxHeight(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils,
                    flag = _validPositionalUnit(value);

                if(!flag && $K.F.EIWP) {
                    if($KU.is(value, 'null')
                    || $KU.is(value, 'undefined')) {
                        flag = ['', true];
                    }
                }

                return flag;
            },

            maxWidth: function BasicWidget$_valid_maxWidth(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils,
                    flag = _validPositionalUnit(value);

                if(!flag && $K.F.EIWP) {
                    if($KU.is(value, 'null')
                    || $KU.is(value, 'undefined')) {
                        flag = ['', true];
                    }
                }

                return flag;
            },

            minHeight: function BasicWidget$_valid_minHeight(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils,
                    flag = _validPositionalUnit(value);

                if(!flag && $K.F.EIWP) {
                    if($KU.is(value, 'null')
                    || $KU.is(value, 'undefined')) {
                        flag = ['', true];
                    }
                }

                return flag;
            },

            minWidth: function BasicWidget$_valid_minWidth(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils,
                    flag = _validPositionalUnit(value);

                if(!flag && $K.F.EIWP) {
                    if($KU.is(value, 'null')
                    || $KU.is(value, 'undefined')) {
                        flag = ['', true];
                    }
                }

                return flag;
            },

            onBlur: function BasicWidget$_valid_onBlur(value) {
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

            onClick: function BasicWidget$_valid_onClick(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget,
                    flag = false, widgets = [
                        'Button', 'Map', 'RichText',
                        'FlexContainer', 'FlexScrollContainer'
                    ];

                if($KU.is(value, 'function') || $KU.is(value, 'null')) {
                    flag = true;
                }

                if(flag && $KU.is(value, 'function')
                && ($KU.is(this, 'widget', 'CustomWidget')
                || widgets.indexOf($KW.name(this)) === -1)) {
                    flag = false;
                } else if(!flag && $K.F.EIWP) {
                    if($KU.is(value, 'undefined')) {
                        flag = [null, true];
                    }
                }

                return flag;
            },

            onFocus: function BasicWidget$_valid_onFocus(value) {
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

            onHover: function BasicWidget$_valid_onHover(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget,
                    flag = false, widgets = ['FlexContainer'];

                if($KU.is(value, 'function') || $KU.is(value, 'null')) {
                    flag = true;
                }

                if(flag && $KU.is(value, 'function')
                && ($KU.is(this, 'widget', 'CustomWidget')
                || widgets.indexOf($KW.name(this)) === -1)) {
                    flag = false;
                } else if(!flag && $K.F.EIWP) {
                    if($KU.is(value, 'undefined')) {
                        flag = [null, true];
                    }
                }

                return flag;
            },

            onScrollWidgetPosition: function BasicWidget$_valid_onScrollWidgetPosition(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'function') || $KU.is(value, 'null')) {
                    flag = true;
                }

                if(flag && $KU.is(value, 'function')
                && ($KU.is(this, 'widget', 'CustomWidget'))) {
                    flag = false;
                } else if(!flag && $K.F.EIWP) {
                    if($KU.is(value, 'undefined')) {
                        flag = [null, true];
                    }
                }

                return flag;
            },

            onTouchEnd: function BasicWidget$_valid_onTouchEnd(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'function') || $KU.is(value, 'null')) {
                    flag = true;
                }

                if(flag && $KU.is(value, 'function')
                && ($KU.is(this, 'widget', 'CustomWidget'))) {
                    flag = false;
                } else if(!flag && $K.F.EIWP) {
                    if($KU.is(value, 'undefined')) {
                        flag = [null, true];
                    }
                }

                return flag;
            },

            onTouchMove: function BasicWidget$_valid_onTouchMove(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'function') || $KU.is(value, 'null')) {
                    flag = true;
                }

                if(flag && $KU.is(value, 'function')
                && ($KU.is(this, 'widget', 'CustomWidget'))) {
                    flag = false;
                } else if(!flag && $K.F.EIWP) {
                    if($KU.is(value, 'undefined')) {
                        flag = [null, true];
                    }
                }

                return flag;
            },

            onTouchStart: function BasicWidget$_valid_onTouchStart(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'function') || $KU.is(value, 'null')) {
                    flag = true;
                }

                if(flag && $KU.is(value, 'function')
                && ($KU.is(this, 'widget', 'CustomWidget'))) {
                    flag = false;
                } else if(!flag && $K.F.EIWP) {
                    if($KU.is(value, 'undefined')) {
                        flag = [null, true];
                    }
                }

                return flag;
            },

            opacity: function BasicWidget$_valid_opacity(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'number')) {
                    flag = true;
                }

                if(flag) {
                    if(value < 0) {
                        flag = [0, true];
                    } else if(value > 1) {
                        flag = [1, true];
                    }
                }

                return flag;
            },

            padding: function BasicWidget$_valid_padding(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'null')) {
                    flag = true;
                } else if($KU.is(value, 'array') && value.length === 4
                && $KU.is(value[0], 'number') && value[0] >= 0
                && $KU.is(value[1], 'number') && value[1] >= 0
                && $KU.is(value[2], 'number') && value[2] >= 0
                && $KU.is(value[3], 'number') && value[3] >= 0) {
                    flag = true;
                }

                return flag;
            },

            paddingInPixel: function BasicWidget$_valid_paddingInPixel(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = true;

                if($KU.is(value, 'boolean')) {
                    flag = true;
                }

                return flag;
            },

            parent: function BasicWidget$_valid_parent(value) {
                var flag = false, $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget;

                if($KW.isContainer(value) || $KU.is(value, 'null')) {
                    flag = true;
                }

                return flag;
            },

            retainContentAlignment: function BasicWidget$_valid_retainContentAlignment(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'boolean')) {
                    flag = true;
                }

                return flag;
            },

            retainFlexPositionProperties: function BasicWidget$_valid_retainFlexPositionProperties(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'boolean')) {
                    flag = true;
                }

                return flag;
            },

            right: function BasicWidget$_valid_right(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils,
                    flag = _validPositionalUnit(value);

                if(!flag && $K.F.EIWP) {
                    if($KU.is(value, 'null')
                    || $KU.is(value, 'undefined')) {
                        flag = ['', true];
                    }
                }

                return flag;
            },

            shadowColor: function BasicWidget$_valid_shadowColor(value) {
                var $K = voltmx.$kwebfw$, $KW = $K.widget;

                return $KW.skinUtils.validColorValue(value);
            },

            shadowOffset: function BasicWidget$_valid_shadowOffset(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'null')) {
                    flag = true;
                } else if($KU.is(value, 'object')) {
                    if($KU.is(value.x, 'number')
                    && $KU.is(value.y, 'number')) {
                        flag = true;
                    }
                }

                return flag;
            },

            shadowRadius: function BasicWidget$_valid_shadowRadius(value) {
                return _validPositionalUnit(value, true);
            },

            skin: function BasicWidget$_valid_skin(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'object')
                || ($KU.is(value, 'string') && value.split(' ').length === 1)) {
                    flag = true;
                }

                return flag;
            },

            textShadowColor: function BasicWidget$_valid_textShadowColor(value) {
                var $K = voltmx.$kwebfw$, $KW = $K.widget;

                return $KW.skinUtils.validColorValue(value);
            },

            textShadowOffset: function BasicWidget$_valid_textShadowOffset(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'null')) {
                    flag = true;
                } else if($KU.is(value, 'object')) {
                    if($KU.is(value.x, 'number')
                    && $KU.is(value.y, 'number')) {
                        flag = true;
                    }
                }

                return flag;
            },

            textShadowRadius: function BasicWidget$_valid_textShadowRadius(value) {
                return _validPositionalUnit(value, true);
            },

            top: function BasicWidget$_valid_top(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils,
                    flag = _validPositionalUnit(value);

                if(!flag && $K.F.EIWP) {
                    if($KU.is(value, 'null')
                    || $KU.is(value, 'undefined')) {
                        flag = ['', true];
                    }
                }

                return flag;
            },

            transform: function BasicWidget$_valid_transform(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'null')
                || value instanceof voltmx.$kwebfw$.Transform) {
                    flag = true;
                }

                return flag;
            },

            width: function BasicWidget$_valid_width(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils,
                    flag = _validPositionalUnit(value);

                if(!flag && $K.F.EIWP) {
                    if($KU.is(value, 'null')
                    || $KU.is(value, 'undefined')) {
                        flag = ['', true];
                    }
                }

                return flag;
            },

            zIndex: function BasicWidget$_valid_zIndex(value) {
                var flag = false, $K = voltmx.$kwebfw$, $KU = $K.utils;

                if(value === voltmx.flex.ZINDEX_AUTO
                || ($KU.is(value, 'integer') && value <= 2147482647)) {
                    flag = true;
                }

                return flag;
            }
        },

        ContainerWidget: {
            _voltmxControllerName: function ContainerWidget$_valid__voltmxControllerName(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'string') && value
                && (!this._voltmxControllerName
                || value === this._voltmxControllerName)) {
                    if($KU.is(this, 'widget', 'Form2')) {
                        flag = true;
                    } else if($KU.is(this, 'widget', 'component')) {
                        flag = true;
                    } else if($KU.is(this, 'widget', 'FlexContainer')) {
                        if($K.app.allowSetter_voltmxControllerName
                        || this._kwebfw_.is.template || _root[this.id]) {
                            flag = true;
                        }
                    }
                }

                return flag;
            },

            addWidgets: function ContainerWidget$_valid_addWidgets(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'null')) {
                    flag = true;
                } else if($KU.is(value, 'function')) {
                    if($KU.is(this, 'widget', 'Form2')) {
                        flag = true;
                    } else if($KU.is(this, 'widget', 'component')) {
                        flag = true;
                    }
                }

                return flag;
            },

            appName: function ContainerWidget$_valid_appName(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'string') && value) {
                    flag = true;
                }

                return flag;
            },

            gutterX : function ContainerWidget$_valid_gutterX(value) {
                return _validPositionalUnit(value, true);
            },

            gutterY: function ContainerWidget$_valid_gutterY(value) {
                return _validPositionalUnit(value, true);
            },

            init: function ContainerWidget$_valid_init(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'null')) {
                    flag = true;
                } else if($KU.is(value, 'function')) {
                    if($KU.is(this, 'widget', 'Form2')) {
                        flag = true;
                    } else if($KU.is(this, 'widget', 'component')) {
                        flag = true;
                    }
                }

                if(!flag && $K.F.EIWP) {
                    if($KU.is(value, 'undefined')) {
                        flag = [null, true];
                    }
                }

                return flag;
            },

            layoutType: function ContainerWidget$_valid_layoutType(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget, $KA = $K.app,
                    $KF = voltmx.flex, flag = false, children = null, options = [
                        $KF.FREE_FORM,
                        $KF.FLOW_HORIZONTAL,
                        $KF.FLOW_VERTICAL,
                        $KF.VBOX_LAYOUT,
                        $KF.RESPONSIVE_GRID
                    ];

                if(options.indexOf(value) >= 0) {
                    flag = true;
                }
                if(value === voltmx.flex.RESPONSIVE_GRID
                && $KA.allowSetter_responsiveGridLayoutType !== true) {
                    children = $KW.children(this);
                    $KU.each(children, function(child) {
                        if(!$KU.is(child, 'widget', 'FlexContainer')) {
                            throw new $KU.error(
                                '100', 'Error',
                                'Unable to change layout, invalid widget ' + child.id
                            );
                        }
                    });
                }

                return flag;
            },

            onBreakpointHandler: function ContainerWidget$_valid_onBreakpointHandler(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'null')) {
                    flag = true;
                } else if($KU.is(value, 'function')) {
                    if($KU.is(this, 'widget', 'Form2')) {
                        flag = true;
                    } else if($KU.is(this, 'widget', 'component')) {
                        flag = true;
                    }
                }

                if(!flag && $K.F.EIWP) {
                    if($KU.is(value, 'undefined')) {
                        flag = [null, true];
                    }
                }

                return flag;
            },

            onBreakpointChange: function ContainerWidget$_valid_onBreakpointChange(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'null')) {
                    flag = true;
                } else if($KU.is(value, 'function')) {
                    if($KU.is(this, 'widget', 'Form2')) {
                        flag = true;
                    } else if($KU.is(this, 'widget', 'component')) {
                        flag = true;
                    }
                }

                if(!flag && $K.F.EIWP) {
                    if($KU.is(value, 'undefined')) {
                        flag = [null, true];
                    }
                }

                return flag;
            },

            onDestroy: function ContainerWidget$_valid_onDestroy(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'null')) {
                    flag = true;
                } else if($KU.is(value, 'function')) {
                    if($KU.is(this, 'widget', 'Form2')) {
                        flag = true;
                    } else if($KU.is(this, 'widget', 'component')) {
                        flag = true;
                    }
                }

                if(!flag && $K.F.EIWP) {
                    if($KU.is(value, 'undefined')) {
                        flag = [null, true];
                    }
                }

                return flag;
            },

            onHide: function ContainerWidget$_valid_onHide(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'null')) {
                    flag = true;
                } else if($KU.is(value, 'function')) {
                    if($KU.is(this, 'widget', 'Form2')) {
                        flag = true;
                    } else if($KU.is(this, 'widget', 'component')) {
                        flag = true;
                    }
                }

                if(!flag && $K.F.EIWP) {
                    if($KU.is(value, 'undefined')) {
                        flag = [null, true];
                    }
                }

                return flag;
            },

            onInit: function ContainerWidget$_valid_onInit(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                //This is applicable if this container is a TAB_CONTAINER
                //It's validity is checked at basic__render function
                if($KU.is(value, 'null') || $KU.is(value, 'function')) {
                    flag = true;
                }

                if(!flag && $K.F.EIWP) {
                    if($KU.is(value, 'undefined')) {
                        flag = [null, true];
                    }
                }

                return flag;
            },

            onResize: function ContainerWidget$_valid_onResize(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'null')) {
                    flag = true;
                } else if($KU.is(value, 'function')) {
                    if($KU.is(this, 'widget', 'Form2')) {
                        flag = true;
                    }
                }

                if(!flag && $K.F.EIWP) {
                    if($KU.is(value, 'undefined')) {
                        flag = [null, true];
                    }
                }

                return flag;
            },

            postShow: function ContainerWidget$_valid_postShow(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'null')) {
                    flag = true;
                } else if($KU.is(value, 'function')) {
                    if($KU.is(this, 'widget', 'Form2')) {
                        flag = true;
                    } else if($KU.is(this, 'widget', 'component')) {
                        flag = true;
                    }
                }

                if(!flag && $K.F.EIWP) {
                    if($KU.is(value, 'undefined')) {
                        flag = [null, true];
                    }
                }

                return flag;
            },

            preShow: function ContainerWidget$_valid_preShow(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'null')) {
                    flag = true;
                } else if($KU.is(value, 'function')) {
                    if($KU.is(this, 'widget', 'Form2')) {
                        flag = true;
                    } else if($KU.is(this, 'widget', 'component')) {
                        flag = true;
                    }
                }

                if(!flag && $K.F.EIWP) {
                    if($KU.is(value, 'undefined')) {
                        flag = [null, true];
                    }
                }

                return flag;
            },

            responsiveConfig: function ContainerWidget$_valid_responsiveConfig(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'object') || $KU.is(value, 'null')) {
                    flag = true;
                }

                return flag;
            },

            retainFlowHorizontalAlignment: function ContainerWidget$_valid_retainFlowHorizontalAlignment(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget, flag = false;

                if($KW.isFlexContainer(this) && $KU.is(value, 'boolean')) {
                    flag = true;
                }

                return flag;
            },

            reverseLayoutDirection: function ContainerWidget$_valid_reverseLayoutDirection(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget, flag = false;

                if($KW.isFlexContainer(this) && $KU.is(value, 'boolean')) {
                    flag = true;
                }

                return flag;
            }
        },

        GroupWidget: {
            onSelection: function GroupWidget$_valid_onSelection(value) {
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
            }
        },

        UserWidget: {
            addWidgets: function UserWidget$_valid_addWidgets(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'null')) {
                    flag = true;
                } else if($KU.is(value, 'function')) {
                    if($KU.is(this, 'widget', 'Form2')) {
                        flag = true;
                    } else if($KU.is(this, 'widget', 'component')) {
                        flag = true;
                    }
                }

                return flag;
            },

            anchorPoint: function UserWidget$_valid_anchorPoint(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'null')) {
                    flag = true;
                } else if($KU.is(value, 'object')
                && $KU.is(value.x, 'number')
                && value.x >= 0 && value.x <= 1
                && $KU.is(value.y, 'number')
                && value.y >= 0 && value.y <= 1) {
                    flag = true;
                }

                return flag;
            },

            appName: function UserWidget$_valid_appName(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'string') && value) {
                    flag = true;
                }

                return flag;
            },

            backgroundColor: function UserWidget$_valid_backgroundColor(value) {
                var $K = voltmx.$kwebfw$, $KW = $K.widget;

                return $KW.skinUtils.validColorValue(value);
            },

            backgroundColorMultiStepGradient: function UserWidget$_valid_backgroundColorMultiStepGradient(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'object') || $KU.is(value, 'null')) {
                    flag = true;
                }

                return flag;
            },

            backgroundColorTwoStepGradient: function UserWidget$_valid_backgroundColorTwoStepGradient(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'object') || $KU.is(value, 'null')) {
                    flag = true;
                }

                return flag;
            },

            backgroundImage: function UserWidget$_valid_backgroundImage(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'string') || $KU.is(value, 'null')) {
                    flag = true;
                }

                return flag;
            },

            borderColor: function UserWidget$_valid_borderColor(value) {
                var $K = voltmx.$kwebfw$, $KW = $K.widget;

                return $KW.skinUtils.validColorValue(value);
            },

            borderWidth: function UserWidget$_valid_borderWidth(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils;

                return _validPositionalUnit(value, true) || $KU.is(value, 'object') || $KU.is(value, 'null');
            },

            bottom: function UserWidget$_valid_bottom(value) {
                return _validPositionalUnit(value);
            },

            centerX: function UserWidget$_valid_centerX(value) {
                return _validPositionalUnit(value);
            },

            centerY: function UserWidget$_valid_centerY(value) {
                return _validPositionalUnit(value);
            },

            contentAlignment: function UserWidget$_valid_contentAlignment(value) {
                var flag = false, options = [
                    constants.CONTENT_ALIGN_BOTTOM_CENTER,
                    constants.CONTENT_ALIGN_BOTTOM_LEFT,
                    constants.CONTENT_ALIGN_BOTTOM_RIGHT,
                    constants.CONTENT_ALIGN_MIDDLE_LEFT,
                    constants.CONTENT_ALIGN_MIDDLE_RIGHT,
                    constants.CONTENT_ALIGN_TOP_CENTER,
                    constants.CONTENT_ALIGN_TOP_LEFT,
                    constants.CONTENT_ALIGN_TOP_RIGHT,
                    constants.CONTENT_ALIGN_CENTER
                ];

                if(options.indexOf(value) >= 0) {
                    flag = true;
                }

                return flag;
            },

            cornerRadius: function UserWidget$_valid_cornerRadius(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils;

                return _validPositionalUnit(value, true) || $KU.is(value, 'object') || $KU.is(value, 'null');
            },

            focusSkin: function UserWidget$_valid_focusSkin(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'object')
                || ($KU.is(value, 'string') && value.split(' ').length === 1)) {
                    flag = true;
                }

                return flag;
            },

            focusStateSkinProperties: function UserWidget$_valid_focusStateSkinProperties(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'object') || $KU.is(value, 'null')) {
                    flag = true;
                }

                return flag;
            },

            doLayout: function UserWidget$_valid_doLayout(value) {
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

            frame: function UserWidget$_valid_frame(value) {
                var flag = false, $K = voltmx.$kwebfw$, $KU = $K.utils;

                if($KU.is(value, 'object')
                && ($KU.is(value.x, 'null') || $KU.is(value.x, 'number'))
                && ($KU.is(value.y, 'null') || $KU.is(value.y, 'number'))
                && ($KU.is(value.height, 'null') || ($KU.is(value.height, 'number') && value.height >= 0))
                && ($KU.is(value.width, 'null') || ($KU.is(value.width, 'number') && value.width >= 0))) {
                    flag = true;
                }

                return flag;
            },

            //It specifies, height of the widget and measured along the y-axis.
            height: function UserWidget$_valid_height(value) {
                return _validPositionalUnit(value, true);
            },

            hoverStateSkinProperties: function UserWidget$_valid_hoverStateSkinProperties(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'object') || $KU.is(value, 'null')) {
                    flag = true;
                }

                return flag;
            },

            id: function UserWidget$_valid_id(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, regexp = null, flag = false;

                regexp = new RegExp('^[a-zA-Z][a-zA-Z0-9]*$');

                if($KU.is(value, 'string') && value && regexp.test(value)) {
                    flag = true;
                }

                if(flag && ['metaInfo', 'template', 'onRowClick', 'onItemSelect'].indexOf(value) >= 0) {
                    flag = false;
                }

                return flag;
            },

            info: function UserWidget$_valid_info(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'object')) {
                    flag = true;
                } else if(!flag && $K.F.EIWP && $KU.is(value, 'null')) {
                    flag = [null, true];
                }

                return flag;
            },

            init: function UserWidget$_valid_init(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'null')) {
                    flag = true;
                } else if($KU.is(value, 'function')) {
                    if($KU.is(this, 'widget', 'Form2')) {
                        flag = true;
                    } else if($KU.is(this, 'widget', 'component')) {
                        flag = true;
                    }
                }

                if(!flag && $K.F.EIWP) {
                    if($KU.is(value, 'undefined')) {
                        flag = [null, true];
                    }
                }

                return flag;
            },

            isVisible: function UserWidget$_valid_isVisible(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'boolean')) {
                    flag = true;
                } else if(!flag && $K.F.EIWP) {
                    flag = [!!value, true];
                }

                return flag;
            },

            left: function UserWidget$_valid_left(value) {
                return _validPositionalUnit(value);
            },

            maxHeight: function UserWidget$_valid_maxHeight(value) {
                return _validPositionalUnit(value, true);
            },

            maxWidth: function UserWidget$_valid_maxWidth(value) {
                return _validPositionalUnit(value, true);
            },

            minHeight: function UserWidget$_valid_minHeight(value) {
                return _validPositionalUnit(value, true);
            },

            minWidth: function UserWidget$_valid_minWidth(value) {
                return _validPositionalUnit(value, true);
            },

            onTouchEnd: function UserWidget$_valid_onTouchEnd(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'function') || $KU.is(value, 'null')) {
                    flag = true;
                }

                if(flag && $KU.is(value, 'function')
                && ($KU.is(this, 'widget', 'CustomWidget'))) {
                    flag = false;
                } else if(!flag && $K.F.EIWP) {
                    if($KU.is(value, 'undefined')) {
                        flag = [null, true];
                    }
                }

                return flag;
            },

            onTouchMove: function UserWidget$_valid_onTouchMove(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'function') || $KU.is(value, 'null')) {
                    flag = true;
                }

                if(flag && $KU.is(value, 'function')
                && ($KU.is(this, 'widget', 'CustomWidget'))) {
                    flag = false;
                } else if(!flag && $K.F.EIWP) {
                    if($KU.is(value, 'undefined')) {
                        flag = [null, true];
                    }
                }

                return flag;
            },

            onTouchStart: function UserWidget$_valid_onTouchStart(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'function') || $KU.is(value, 'null')) {
                    flag = true;
                }

                if(flag && $KU.is(value, 'function')
                && ($KU.is(this, 'widget', 'CustomWidget'))) {
                    flag = false;
                } else if(!flag && $K.F.EIWP) {
                    if($KU.is(value, 'undefined')) {
                        flag = [null, true];
                    }
                }

                return flag;
            },

            opacity: function UserWidget$_valid_opacity(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'number')) {
                    flag = true;
                }

                if(flag) {
                    if(value < 0) {
                        flag = [0, true];
                    } else if(value > 1) {
                        flag = [1, true];
                    }
                }

                return flag;
            },

            padding: function UserWidget$_valid_padding(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'null')) {
                    flag = true;
                } else if($KU.is(value, 'array') && value.length === 4
                && $KU.is(value[0], 'number') && value[0] >= 0
                && $KU.is(value[1], 'number') && value[1] >= 0
                && $KU.is(value[2], 'number') && value[2] >= 0
                && $KU.is(value[3], 'number') && value[3] >= 0) {
                    flag = true;
                }

                return flag;
            },

            paddingInPixel: function UserWidget$_valid_paddingInPixel(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = true;

                if($KU.is(value, 'boolean')) {
                    flag = true;
                }

                return flag;
            },

            parent: function UserWidget$_valid_parent(value) {
                var flag = false, $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget;

                if($KW.isContainer(value) || $KU.is(value, 'null')) {
                    flag = true;
                }

                return flag;
            },

            right: function UserWidget$_valid_right(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils,
                    flag = _validPositionalUnit(value);

                if(!flag && $K.F.EIWP) {
                    if($KU.is(value, 'null')
                    || $KU.is(value, 'undefined')) {
                        flag = ['', true];
                    }
                }

                return flag;
            },

            skin: function UserWidget$_valid_skin(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'object')
                || ($KU.is(value, 'string') && value.split(' ').length === 1)) {
                    flag = true;
                }

                return flag;
            },

            top: function UserWidget$_valid_top(value) {
                return _validPositionalUnit(value);
            },

            transform: function UserWidget$_valid_transform(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'null')
                || value instanceof voltmx.$kwebfw$.Transform) {
                    flag = true;
                }

                return flag;
            },

            width: function UserWidget$_valid_width(value) {
                return _validPositionalUnit(value, true);
            },

            zIndex: function UserWidget$_valid_zIndex(value) {
                var flag = false, $K = voltmx.$kwebfw$, $KU = $K.utils;

                if(value === voltmx.flex.ZINDEX_AUTO
                || ($KU.is(value, 'integer') && value <= 2147482647)) {
                    flag = true;
                }

                return flag;
            }
        }
    };


    var _validPositionalUnit = function UI$_validPositionalUnit(value, positive) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

        if($KU.is(value, 'string')) {
            value = value.toLowerCase();

            if($K.F.EIWP && $KU.is(value, 'numeric')) {
                value = parseFloat(value, 10);
            }
        }

        flag = $KU.is(value, 'size', positive);

        return (flag ? [value, flag] : flag);
    };


    //All widget file must have this variable
    //All the functions will be called in the scope of widget instance
    //Any property here, which is set to "false", will not create a setter
    var _view = {
        BasicWidget: {
            accessibilityConfig: function BasicWidget$_view_accessibilityConfig(/*el, old*/) {
                var $K = voltmx.$kwebfw$, $KW = $K.widget;

                $KW.accessibility(this);
            },

            activeStateSkin: function BasicWidget$_view_activeStateSkin(/*el, old*/) {},

            anchorPoint: function BasicWidget$_view_anchorPoint(el/*, old*/) {
                var $K = voltmx.$kwebfw$, $KD = $K.dom, tOrigin = '50% 50%';

                if(this.anchorPoint) {
                    tOrigin = $KW.skinUtils.stringifyAnchorPoint(this.anchorPoint);
                }
                $KD.style(el.node, 'transformOrigin', tOrigin);
            },

            autogrowMode: false,

            backgroundColor: function BasicWidget$_view_backgroundColor(el, old) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget, $KD = $K.dom, backgroundStyle;

                this._kwebfw_.skinStateObj.bgType = voltmx.skin.BACKGROUND_TYPE_SINGLE_COLOR;

                backgroundStyle = $KW.skinUtils.background({
                    backgroundType: this._kwebfw_.skinStateObj.bgType,
                    backgroundColor: this.backgroundColor,
                    backgroundImage: this.backgroundImage,
                    backgroundColorMultiStepGradient: this.backgroundColorMultiStepGradient,
                    backgroundColorTwoStepGradient: this.backgroundColorTwoStepGradient
                });

                if(backgroundStyle) {
                    $KD.style(el.node, 'background', backgroundStyle);
                } else if(!$KU.is(old, 'null') && old !== '') {
                    $KD.style(el.node, 'background', null);
                }
            },


            backgroundColorMultiStepGradient: function BasicWidget$_view_backgroundColorMultiStepGradient(el, old) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget, $KD = $K.dom, backgroundStyle;

                this._kwebfw_.skinStateObj.bgType = voltmx.skin.BACKGROUND_TYPE_MULTI_STEP_GRADIENT;

                backgroundStyle = $KW.skinUtils.background({
                    backgroundType: this._kwebfw_.skinStateObj.bgType,
                    backgroundColor: this.backgroundColor,
                    backgroundImage: this.backgroundImage,
                    backgroundColorMultiStepGradient: this.backgroundColorMultiStepGradient,
                    backgroundColorTwoStepGradient: this.backgroundColorTwoStepGradient
                });

                if(backgroundStyle) {
                    $KD.style(el.node, 'background', backgroundStyle);
                } else if(!$KU.is(old, 'null') && old !== '') {
                    $KD.style(el.node, 'background', null);
                }
            },

            backgroundColorTwoStepGradient: function BasicWidget$_view_backgroundColorTwoStepGradient(el, old) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget, $KD = $K.dom, backgroundStyle;

                this._kwebfw_.skinStateObj.bgType = voltmx.skin.BACKGROUND_TYPE_TWO_STEP_GRADIENT;

                backgroundStyle = $KW.skinUtils.background({
                    backgroundType: this._kwebfw_.skinStateObj.bgType,
                    backgroundColor: this.backgroundColor,
                    backgroundImage: this.backgroundImage,
                    backgroundColorMultiStepGradient: this.backgroundColorMultiStepGradient,
                    backgroundColorTwoStepGradient: this.backgroundColorTwoStepGradient
                });

                if(backgroundStyle) {
                    $KD.style(el.node, 'background', backgroundStyle);
                } else if(!$KU.is(old, 'null') && old !== '') {
                    $KD.style(el.node, 'background', null);
                }
            },

            backgroundImage: function BasicWidget$_view_backgroundImage(el, old) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget, $KD = $K.dom, backgroundStyle;

                this._kwebfw_.skinStateObj.bgType = voltmx.skin.BACKGROUND_TYPE_IMAGE;

                backgroundStyle = $KW.skinUtils.background({
                    backgroundType: this._kwebfw_.skinStateObj.bgType,
                    backgroundColor: this.backgroundColor,
                    backgroundImage: this.backgroundImage,
                    backgroundColorMultiStepGradient: this.backgroundColorMultiStepGradient,
                    backgroundColorTwoStepGradient: this.backgroundColorTwoStepGradient
                });

                if(backgroundStyle) {
                    $KD.style(el.node, 'background', backgroundStyle);
                } else if(!$KU.is(old, 'null') && old !== '') {
                    $KD.style(el.node, 'background', null);
                }
            },

            blur: function BasicWidget$_view_blur(el/*, old*/) {
                var $K = voltmx.$kwebfw$, $KD = $K.dom, filter = '';

                if(this.blur.enabled) {
                    filter = ('blur(' + this.blur.value + 'px)');
                    $KD.style(el.node, 'filter', filter);
                } else {
                    $KD.style(el.node, 'filter', null);
                }
            },

            borderColor: function BasicWidget$_view_borderColor(el/*, old*/) {
                var $K = voltmx.$kwebfw$, $KW = $K.widget, $KD = $K.dom;

                if(this.borderColor) {
                    $KD.style(el.node, 'borderStyle', 'solid');
                    $KD.style(el.node, 'borderColor', $KW.skinUtils.processColorValue(this.borderColor));
                } else {
                    $KD.style(el.node, 'border-style', null);
                    $KD.style(el.node, 'border-color', null);
                }
            },

            borderWidth: function BasicWidget$_view_borderWidth(el/*, old*/) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, $KD = $K.dom, value;

                if($KU.is(this.borderWidth, 'number')) {
                    $KD.style(el.node, 'borderWidth', (this.borderWidth+'px'));
                } else if($KU.is(this.borderWidth, 'string')) {
                    if(this.borderWidth) {
                        $KD.style(el.node, 'borderWidth', this.borderWidth);
                    } else {
                        $KD.style(el.node, 'border-width', 'null');
                    }
                } else if($KU.is(this.borderWidth, 'object')) {
                    value = (this.borderWidth.top || 0) + 'px'
                        + ' ' + (this.borderWidth.right || 0) + 'px'
                        + ' ' + (this.borderWidth.bottom || 0) + 'px'
                        + ' ' + (this.borderWidth.left || 0) + 'px';

                    $KD.style(el.node, 'borderWidth', value);
                }
            },

            blockedUISkin: function BasicWidget$_view_blockedUISkin(/*el, old*/) {},

            bottom: function BasicWidget$_view_bottom(/*el, old*/) {}, //Not required, because change in flex layout properties does not reflect immediately

            centerX: function BasicWidget$_view_centerX(/*el, old*/) {}, //Not required, because change in flex layout properties does not reflect immediately

            centerY: function BasicWidget$_view_centerY(/*el, old*/) {}, //Not required, because change in flex layout properties does not reflect immediately

            contentAlignment: function BasicWidget$_view_contentAlignment(el, old) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, $KD = $K.dom;

                if($KU.is(this, 'widget', 'Button')
                || $KU.is(this, 'widget', 'Label')
                || $KU.is(this, 'widget', 'ListBox')
                || $KU.is(this, 'widget', 'RichText')
                || $KU.is(this, 'widget', 'TextArea2')
                || $KU.is(this, 'widget', 'TextBox2')) {
                    $KD.removeCls(el.node, ('-voltmx-ca-'+old));
                    $KD.addCls(el.node, ('-voltmx-ca-'+this.contentAlignment));
                } else if($KU.is(this, 'widget', 'Calendar')) {
                    $KD.removeCls(el.input, ('-voltmx-ca-'+old));
                    $KD.addCls(el.input, ('-voltmx-ca-'+this.contentAlignment));
                }
            },

            cornerRadius: function BasicWidget$_view_cornerRadius(el/*, old*/) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, $KD = $K.dom, value;

                if($KU.is(this.cornerRadius, 'number')) {
                    $KD.style(el.node, 'borderRadius', (this.cornerRadius+'px'));
                } else if($KU.is(this.cornerRadius, 'string')) {
                    if(this.cornerRadius) {
                        $KD.style(el.node, 'borderRadius', this.cornerRadius);
                    } else {
                        $KD.style(el.node, 'border-radius', null);
                    }
                } else if($KU.is(this.cornerRadius, 'object')) {
                    value = (this.cornerRadius.top || 0) + 'px'
                    + ' ' + (this.cornerRadius.right || 0) + 'px'
                    + ' ' + (this.cornerRadius.bottom || 0) + 'px'
                    + ' ' + (this.cornerRadius.left || 0) + 'px';

                    $KD.style(el.node, 'borderRadius', value);
                }
            },

            cursorType: function BasicWidget$_view_cursorType(el/*, old*/) {
                var $K = voltmx.$kwebfw$, $KD = $K.dom;

                if(this.cursorType) {
                    $KD.style(el.node, 'cursor', this.cursorType);
                } else {
                    $KD.style(el.node, 'cursor', null);
                }
            },

            doLayout: function BasicWidget$_view_doLayout(/*el, old*/) {},

            enable: true,

            focusSkin: function BasicWidget$_view_focusSkin(/*el, old*/) {},

            focusStateSkinProperties: true,

            fontColor: function BasicWidget$_view_fontColor(el/*, old*/) {
                var $K = voltmx.$kwebfw$, $KW = $K.widget, $KD = $K.dom,
                    widgets = ['FlexScrollContainer', 'FlexContainer', 'Form2', 'Map', 'Video', 'Browser'];

                if(widgets.indexOf($KW.name(this)) !== -1) return;

                if(this.fontColor) {
                    $KD.style(el.node, 'color', $KW.skinUtils.processColorValue(this.fontColor));
                } else {
                    $KD.style(el.node, 'color', null);
                }
            },

            fontFamily: function BasicWidget$_view_fontFamily(el/*, old*/) {
                var $K = voltmx.$kwebfw$, $KD = $K.dom, $KW = $K.widget,
                    widgets = ['FlexScrollContainer', 'FlexContainer', 'Form2', 'Map', 'Video', 'Browser'];

                if(widgets.indexOf($KW.name(this)) !== -1) return;

                if(this.fontFamily) {
                    $KD.style(el.node, 'fontFamily', $KW.skinUtils.processFontFamily(this.fontFamily));
                } else {
                    $KD.style(el.node, 'font-family', null);
                }
            },

            fontSize: function BasicWidget$_view_fontSize(el/*, old*/) {
                var $K = voltmx.$kwebfw$, $KD = $K.dom, $KW = $K.widget,
                    baseFont, value,
                    widgets = ['FlexScrollContainer', 'FlexContainer', 'Form2', 'Map', 'Video', 'Browser'];

                if(widgets.indexOf($KW.name(this)) !== -1) return;

                if(this.fontSize) {
                    baseFont = $KW.skinUtils.getBaseFontSize();
                    value = Math.round((this.fontSize * baseFont) /100) + 'px';
                    $KD.style(el.node, 'fontSize', value);
                } else {
                    $KD.style(el.node, 'font-size', null);
                }
            },

            fontStyle: function BasicWidget$_view_fontStyle(el, old) {
                var $K = voltmx.$kwebfw$, $KD = $K.dom, $KW = $K.widget, fontStyle = this.fontStyle,
                    widgets = ['FlexScrollContainer', 'FlexContainer', 'Form2', 'Map', 'Video', 'Browser'],
                    textStyle = this.textStyle ? this.textStyle.strikeThrough : null;

                if(widgets.indexOf($KW.name(this)) !== -1
                || ($KW.name(this) === 'Label' && textStyle
                && fontStyle === voltmx.skin.FONT_STYLE_UNDERLINE)) {
                    return;
                }

                if(old === voltmx.skin.FONT_STYLE_UNDERLINE) {
                    $KD.style(el.node, 'text-decoration', null);//todo
                }

                if(this.fontStyle) {
                    if(fontStyle === voltmx.skin.FONT_STYLE_UNDERLINE) {//TODO: label has to verify
                        $KD.style(el.node, 'textDecoration', this.fontStyle);
                        $KD.style(el.node, 'font-style', null);
                    } else {
                        $KD.style(el.node, 'fontStyle', this.fontStyle);
                    }
                } else {
                    $KD.style(el.node, 'font-style', null);
                }
            },

            fontWeight: function BasicWidget$_view_fontWeight(el/*, old*/) {
                var $K = voltmx.$kwebfw$, $KD = $K.dom, $KW = $K.widget,
                    widgets = ['FlexScrollContainer', 'FlexContainer', 'Form2', 'Map', 'Video', 'Browser'];

                if(widgets.indexOf($KW.name(this)) !== -1) return;

                if(this.fontWeight) {
                    $KD.style(el.node, 'fontWeight', this.fontWeight);
                } else {
                    $KD.style(el.node, 'font-weight', null);
                }
            },

            frame: false,

            height: function BasicWidget$_view_height(/*el, old*/) {}, //Not required, because change in flex layout properties does not reflect immediately

            hoverSkin: function BasicWidget$_view_hoverSkin(/*el, old*/) {},

            hoverStateSkinProperties: true,

            id: false,

            info: true,

            isVisible: function BasicWidget$_view_isVisible(el/*, old*/) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget,
                    $KA = $K.app, init = true, modal = null,
                    fmodel = $KW.fmodel(this), view = el.node;

                if(view || this.isVisible) {
                    if(!view && this.isVisible) {
                        init = false;
                        view = this._render();
                    }

                    if($KU.is($KW.pmodel(this), 'widget')) {
                        if(this.isVisible) {
                            _handleVisibilityWhen.visibleAndHasParent.call(this, view);
                        } else { //this.isVisible = false
                            _handleVisibilityWhen.notVisibleAndHasParent.call(this, view);
                        }
                    } else { //Form2 or top level templates of 'SegmentedUI2', 'CollectionView', 'DataGrid' or 'MenuContainer'
                        if(this.isVisible) {
                            _handleVisibilityWhen.visibleAndNoParent.call(this, view);
                        } else { //this.isVisible = false
                            _handleVisibilityWhen.notVisibleAndNoParent.call(this, view);
                        }
                    }

                    if(!init && this.isVisible) {
                        $KW.onRender(view);
                    }
                }

                if(fmodel && fmodel === $KW.model($KA.currentFormUID)) {
                    modal = fmodel._kwebfw_.modalContainer;

                    if(!modal) {
                        modal = $KW.deduceModalContainer(fmodel);
                    }

                    if(modal) {
                        if(this.isVisible) {
                            if(_shouldDeduceModalContainer.onAdd.call(this)) {
                                modal = $KW.deduceModalContainer(fmodel);
                                $KW.updateModalContainer(fmodel, modal);
                            }
                        } else if($KW.contains(this, modal, false)) {
                            modal = $KW.deduceModalContainer(fmodel);
                            $KW.updateModalContainer(fmodel, modal);
                        }
                    }
                }
            },

            left: function BasicWidget$_view_left(/*el, old*/) {}, //Not required, because change in flex layout properties does not reflect immediately

            maxHeight: function BasicWidget$_view_maxHeight(/*el, old*/) {}, //Not required, because change in flex layout properties does not reflect immediately

            maxWidth: function BasicWidget$_view_maxWidth(/*el, old*/) {}, //Not required, because change in flex layout properties does not reflect immediately

            minHeight: function BasicWidget$_view_minHeight(/*el, old*/) {}, //Not required, because change in flex layout properties does not reflect immediately

            minWidth: function BasicWidget$_view_minWidth(/*el, old*/) {}, //Not required, because change in flex layout properties does not reflect immediately

            onBlur: function BasicWidget$_view_onBlur(/*el, old*/) {},

            onClick: function BasicWidget$_view_onClick(/*el, old*/) {
                var $K = voltmx.$kwebfw$, $KW = $K.widget;

                $KW.setupUIInteraction(this, $KW.focusableElement(this));
            },

            onFocus: function BasicWidget$_view_onFocus(/*el, old*/) {},

            onHover: function BasicWidget$_view_onHover(/*el, old*/) {},

            onScrollWidgetPosition: function BasicWidget$_view_onScrollWidgetPosition(/*el, old*/) {},

            onTouchEnd: function BasicWidget$_view_onTouchEnd(/*el, old*/) {},

            onTouchMove: function BasicWidget$_view_onTouchMove(/*el, old*/) {},

            onTouchStart: function BasicWidget$_view_onTouchStart(/*el, old*/) {},

            opacity: function BasicWidget$_view_opacity(el/*, old*/) {
                var $K = voltmx.$kwebfw$, $KD = $K.dom;

                $KD.style(el.node, 'opacity', this.opacity);
            },

            padding: function BasicWidget$_view_padding(el/*, old*/) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget,
                    $KD = $K.dom, padding = '', target = el.node, self = null;

                padding = _preparePaddingStyle.call(this);

                if($KU.is(this, 'widget', 'ListBox')
                && this.viewType === constants.LISTBOX_VIEW_TYPE_EDITVIEW) {
                    target = el.input;
                } else if($KW.isResponsiveContainer(this)) {
                    target = el.viewport || el.node;
                }

                if(padding) {
                    if($KU.is(this, 'widget', 'DataGrid')) {
                        self = this;

                        $KU.each(el.table, function(tr) {
                            $KU.each($KD.children(tr), function(td, index) {
                                if(self.columnHeadersConfig[index].columnType !== 'template'
                                || !self.columnHeadersConfig[index].columnHeaderTemplate) {
                                    $KD.style(td, 'padding', padding);
                                }
                            });
                        });
                        if(self.dockingHeader) {
                            $KU.each(el.docker, function(tr) {
                                $KU.each($KD.children(tr), function(td, index) {
                                    if(!self.columnHeadersConfig[index].columnHeaderTemplate) {
                                        $KD.style(td, 'padding', padding);
                                    }
                                });
                            });
                        }
                    } else {
                        $KD.style(target, 'padding', padding);
                    }
                } else {
                    $KD.style(target, 'padding', null);
                }
            },

            paddingInPixel: false,

            parent: false,

            retainContentAlignment: false,

            retainFlexPositionProperties: false,

            right: function BasicWidget$_view_right(/*el, old*/) {}, //Not required, because change in flex layout properties does not reflect immediately

            shadowColor: function BasicWidget$_view_shadowColor(el/*, old*/) {
                var $K = voltmx.$kwebfw$, $KD = $K.dom, $KW = $K.widget, shadowStyle = '';

                shadowStyle = $KW.skinUtils.prepareShadowStyle({
                    shadowColor: this.shadowColor,
                    shadowOffset: this.shadowOffset,
                    shadowRadius: this.shadowRadius
                });

                if(shadowStyle) {
                    $KD.style(el.node, 'boxShadow', shadowStyle);
                } else {
                    $KD.style(el.node, 'box-shadow', null);
                }
            },

            shadowOffset: function BasicWidget$_view_shadowOffset(el/*, old*/) {
                var $K = voltmx.$kwebfw$, $KD = $K.dom, $KW = $K.widget, shadowStyle = '';

                shadowStyle = $KW.skinUtils.prepareShadowStyle({
                    shadowColor: this.shadowColor,
                    shadowOffset: this.shadowOffset,
                    shadowRadius: this.shadowRadius
                });

                if(shadowStyle) {
                    $KD.style(el.node, 'boxShadow', shadowStyle);
                } else {
                    $KD.style(el.node, 'box-shadow', null);
                }
            },

            shadowRadius: function BasicWidget$_view_shadowRadius(el/*, old*/) {
                var $K = voltmx.$kwebfw$, $KD = $K.dom, $KW = $K.widget, shadowStyle = '';

                shadowStyle = $KW.skinUtils.prepareShadowStyle({
                    shadowColor: this.shadowColor,
                    shadowOffset: this.shadowOffset,
                    shadowRadius: this.shadowRadius
                });

                if(shadowStyle) {
                    $KD.style(el.node, 'boxShadow', shadowStyle);
                } else {
                    $KD.style(el.node, 'box-shadow', null);
                }
            },

            skin: function BasicWidget$_view_skin(el, old) {
                var $K = voltmx.$kwebfw$, $KW = $K.widget, prop = this._kwebfw_.prop;

                $KW.removeAllSkinsFromUI(this);
                $KW.removeSkin(old, el.node);
                $KW.addSkin(prop.skin, el.node);
            },

            textShadowColor: function BasicWidget$_view_textShadowColor(el/*, old*/) {
                var $K = voltmx.$kwebfw$, $KD = $K.dom, $KW = $K.widget, shadowStyle = '';

                if(['Label', 'Button'].indexOf($KW.name(this)) === -1) return;

                shadowStyle = $KW.skinUtils.prepareTextShadowStyle({
                    textShadowColor: this.textShadowColor,
                    textShadowOffset: this.textShadowOffset,
                    textShadowRadius: this.textShadowRadius
                });

                if(shadowStyle) {
                    $KD.style(el.node, 'textShadow', shadowStyle);
                } else {
                    $KD.style(el.node, 'text-shadow', null);
                }
            },

            textShadowOffset: function BasicWidget$_view_textShadowOffset(el/*, old*/) {
                var $K = voltmx.$kwebfw$, $KD = $K.dom, $KW = $K.widget, shadowStyle = '';

                if(['Label', 'Button'].indexOf($KW.name(this)) === -1) return;

                shadowStyle = $KW.skinUtils.prepareTextShadowStyle({
                    textShadowColor: this.textShadowColor,
                    textShadowOffset: this.textShadowOffset,
                    textShadowRadius: this.textShadowRadius
                });

                if(shadowStyle) {
                    $KD.style(el.node, 'textShadow', shadowStyle);
                } else {
                    $KD.style(el.node, 'text-shadow', null);
                }
            },

            textShadowRadius: function BasicWidget$_view_textShadowRadius(el/*, old*/) {
                var $K = voltmx.$kwebfw$, $KD = $K.dom, $KW = $K.widget, shadowStyle = '';

                if(['Label', 'Button'].indexOf($KW.name(this)) === -1) return;

                shadowStyle = $KW.skinUtils.prepareTextShadowStyle({
                    textShadowColor: this.textShadowColor,
                    textShadowOffset: this.textShadowOffset,
                    textShadowRadius: this.textShadowRadius
                });

                if(shadowStyle) {
                    $KD.style(el.node, 'textShadow', shadowStyle);
                } else {
                    $KD.style(el.node, 'text-shadow', null);
                }
            },

            top: function BasicWidget$_view_top(/*el, old*/) {}, //Not required, because change in flex layout properties does not reflect immediately

            transform: function BasicWidget$_view_transform(el/*, old*/) {
                var $K = voltmx.$kwebfw$, $KW = $K.widget, $KD = $K.dom,
                    transform = '';

                transform = $KW.skinUtils.stringifyTrasnsform(this.transform);

                if(transform) {
                    $KD.style(el.node, 'transform', transform);
                } else {
                    $KD.style(el.node, 'transform', null);
                }
            },

            width: function BasicWidget$_view_width(/*el, old*/) {}, //Not required, because change in flex layout properties does not reflect immediately

            zIndex: function BasicWidget$_view_zIndex(el, old) {
                var $K = voltmx.$kwebfw$, $KW = $K.widget, $KD = $K.dom,
                    fmodel = $KW.fmodel(this), modal = null;

                $KD.style(el.node, 'zIndex', this.zIndex);

                if(fmodel && fmodel === $KW.getRootNode(this)
                && _shouldDeduceModalContainer.onZindexChange.call(this, this.zIndex, old)) {
                    modal = $KW.deduceModalContainer(fmodel);
                    $KW.updateModalContainer(fmodel, modal);
                }
            }
        },

        ContainerWidget: {
            appName: false,

            _voltmxControllerName: true,

            addWidgets: true,

            init: true,

            layoutType: function ContainerWidget$_view_layoutType(el/*, old*/) {
                var $K = voltmx.$kwebfw$, $KW = $K.widget, $KD = $K.dom;

                $KD.setAttr(el.node, 'kcl', $KW.layout(this));
            },

            gutterX: true,

            gutterY: true,

            onBreakpointChange: true,

            onBreakpointHandler: false,

            onDestroy: true,

            onHide: true,

            onInit: true,

            onResize: true,

            postShow: true,

            preShow: true,

            responsiveConfig: false,

            retainFlowHorizontalAlignment: false,

            reverseLayoutDirection: function ContainerWidget$_view_reverseLayoutDirection(el/*, old*/) {
                var $K = voltmx.$kwebfw$, $KW = $K.widget,
                    $KD = $K.dom, layout = $KW.layout(this);

                if(['hflex', 'rflex', 'vflex'].indexOf(layout) >= 0) {
                    if(this.reverseLayoutDirection) {
                        if(['hflex', 'rflex'].indexOf(layout) >= 0) {
                            $KD.style(el.node, 'flexDirection', 'row-reverse');
                        } else if(layout === 'vflex') {
                            $KD.style(el.node, 'flexDirection', 'column-reverse');
                        }
                    } else {
                        $KD.style(el.node, 'flex-direction', null);
                    }
                }
            }
        },

        GroupWidget: {
            onSelection: true
        },

        UserWidget: {
            addWidgets: false,

            anchorPoint: true,

            appName: false,

            backgroundColor: true,

            backgroundColorMultiStepGradient: true,

            backgroundColorTwoStepGradient: true,

            backgroundImage: true,

            borderColor: true,

            borderWidth: true,

            bottom: true,

            centerX: true,

            centerY: true,

            contentAlignment: false,

            cornerRadius: true,

            doLayout: true,

            focusSkin: true,

            focusStateSkinProperties: true,

            frame: false,

            height: true,

            hoverStateSkinProperties: true,

            id: false,

            info: true,

            init: false,

            isVisible: true,

            left: true,

            maxHeight: true,

            maxWidth: true,

            minHeight: true,

            minWidth: true,

            onTouchEnd: true,

            onTouchMove: true,

            onTouchStart: true,

            opacity: true,

            padding: false, //with flex this is not applicable

            paddingInPixel: false, //with flex this is not applicable

            parent: false, //non-constructor & readonly property

            right: true,

            skin: true,

            top: true,

            transform: true,

            width: true,

            zIndex: true
        }
    };


    $K.defVoltmxProp($KW, [
        {keey:'auditPerformance', value:function UI$_$KW_auditPerformance() {
            //fflex_centerX
            //fflex_centerY
            //hflex_centerX
            //hflex_centerY
            //vflex_centerX
            //vflex_centerY
            //fflex_AGH
            //image_AGHW
        }},
        {keey:'model', value:function UI$_$KW_model(view) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils,
                $KW = $K.widget, $KD = $K.dom;


            if($KU.is(view, 'widget')) {
                return view;
            } else if($KU.is(view, 'dom')) {
                return _map[$KD.getAttr(view, 'id')] || null;
            } else if($KU.is(view, 'string') && view) {
                return _map[view] || $KW.getModelByPath(view) || null;
            } else if($KU.is(view, 'array') && view.length) {
                return $KW.getModelByPath(view) || null;
            }
            return null;
        }},
        {keey:'rootOfForm', value:function UI$_$KW_rootOfForm(hash) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils, model = null;

            if($KU.is(hash, 'string')) {
                if($K.behavior.isCompositeApp && (hash.indexOf('/') > 0)) {
                    hash = hash.split('/');
                    model = _root[hash[0]][hash[1]] || null;
                } else {
                    model = _root[hash] || null;
                }
            }

            return model;
        }},
        {keey:'root', value:function UI$_$KW_root(view, arg1, arg2) {
            var $K = voltmx.$kwebfw$, $KW = $K.widget, _ = null,
                $KU = $K.utils, model = $KW.model(view);

            if(model) {
                _ = model._kwebfw_;

                if(arguments.length === 1) {
                    return _root[model.id] || null;
                } else if(arguments.length > 1 && $KW.isContainer(model)
                && ['tab', 'template'].indexOf(arg1) >= 0
                && !_.rid && !_.pid && Object.prototype.hasOwnProperty.call(_.is, arg1)
                && !$KU.is(model, 'widget', 'FlexScrollContainer')) {
                    //NOTE:: Below 3 lines also there, in "_postInitialization.BasicWidget" function of this file.
                    _.rid = _.uid;
                    _.wap = model.id;

                    if(arg1 === 'tab') {
                        _.wap = (arg2+'_'+_.wap);
                    }

                    //NOTE:: Similar loop can be found in "_addWidgets" function of this file.
                    $KU.each($KW.children(model), function(widget) {
                        _createWidgetHierarchy.call(this, widget);
                    }, model);
                }
            } else if($KU.is(view, 'string') && view) {
                return _root[view] || null;
            } else {
                return null;
            }
        }}
    ]);


    /***************************************************************************
    *                                                                          *
    *                                                                          *
    *                           voltmx.ui.BasicWidget                            *
    *                                                                          *
    *                                                                          *
    ****************************************************************************/
    Object.defineProperty(voltmx.ui, 'BasicWidget', {configurable:false, enumerable:false, writable:false, value:(function() {
        var $K = voltmx.$kwebfw$;


        /**
         * voltmx.ui.BasicWidget constructor.
         *
         * @class
         * @namespace   voltmx.ui
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
        var BasicWidget = function BasicWidget(bconfig, lconfig, pspconfig) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget, self = null,
                dependentPropertiesValidationMessage = '', prop = null, p = null;

            if(this === voltmx.ui) {
                throw new Error('This is a class and must be instantiated.');
            } else {
                _populateUnderscore.BasicWidget.call(this);

                if(['voltmx.ui.BasicWidget', 'voltmx.ui.ContainerWidget', 'voltmx.ui.GroupWidget'].indexOf(this._kwebfw_.ns) >= 0) {
                    delete this._;
                    throw new Error('This class cannot be instantiated.');
                } else {
                    self = this;

                    if(!bconfig.isPreValidated) {
                        prop = {
                            accessibilityConfig: null,
                            activeStateSkin: '',
                            anchorPoint: {x: 0.5, y: 0.5},
                            autogrowMode: voltmx.flex.AUTOGROW_NONE,
                            backgroundColor: '',
                            backgroundColorMultiStepGradient: null,
                            backgroundColorTwoStepGradient: null,
                            backgroundImage: '',
                            blur: {enabled: false, value: 0},
                            borderColor: '',
                            borderWidth: '',
                            blockedUISkin: '',
                            bottom: '',
                            centerX: '',
                            centerY: '',
                            contentAlignment: constants.CONTENT_ALIGN_CENTER,
                            cornerRadius: '',
                            cursorType: '',
                            doLayout: null,
                            enable: true,
                            focusSkin: null,
                            focusStateSkinProperties: null,
                            fontColor: '',
                            fontFamily: '',
                            fontSize: null,
                            fontStyle: null,
                            fontWeight: null,
                            frame: {x: null, y: null, width: -1, height: -1, doLayout: false},
                            height: '',
                            hoverSkin: '',
                            hoverStateSkinProperties: null,
                            id: '',
                            info: {},
                            isVisible: true,
                            left: '',
                            maxHeight: '',
                            maxWidth: '',
                            minHeight: '',
                            minWidth: '',
                            onBlur: null,
                            onClick: null,
                            onFocus: null,
                            onHover: null,
                            onRightClick: null,
                            onScrollWidgetPosition: null,
                            onTouchEnd: null,
                            onTouchMove: null,
                            onTouchStart: null,
                            opacity: 1,
                            padding: null,
                            paddingInPixel: false,
                            parent: null,
                            retainContentAlignment: false,
                            retainFlexPositionProperties: false,
                            right: '',
                            shadowColor: '',
                            shadowOffset: null,
                            shadowRadius: 0,
                            textShadowColor: '',
                            textShadowOffset: null,
                            textShadowRadius: 0,
                            skin: null,
                            top: '',
                            transform: null,
                            width: '',
                            zIndex: 1
                        };

                        if($KU.is(_dependentPropertiesValidationMessage.BasicWidget, 'function')) {
                            dependentPropertiesValidationMessage = _dependentPropertiesValidationMessage.BasicWidget.call(this, prop, bconfig, lconfig, pspconfig);
                        }
                    }

                    if(dependentPropertiesValidationMessage) {
                        throw new Error(dependentPropertiesValidationMessage);
                    } else {
                        if(!bconfig.isPreValidated) {
                        //Copying lconfig properties to bconfig
                            $KU.each(lconfig, function(value, key) {
                                if(!Object.prototype.hasOwnProperty.call(bconfig, key)) {
                                    bconfig[key] = value;
                                } else {
                                //Throw Error
                                }
                            });

                            //Copying pspconfig properties to bconfig
                            $KU.each(pspconfig, function(value, key) {
                                if(!Object.prototype.hasOwnProperty.call(bconfig, key)) {
                                    bconfig[key] = value;
                                } else {
                                //Throw Error
                                }
                            });

                            if(!$KW.isFlexPropertyDefined(bconfig, 'left')
                        && !$KW.isFlexPropertyDefined(bconfig, 'right')
                        && !$KW.isFlexPropertyDefined(bconfig, 'centerX')) {
                                bconfig.left = '0%';
                            }

                            if(!$KW.isFlexPropertyDefined(bconfig, 'top')
                        && !$KW.isFlexPropertyDefined(bconfig, 'bottom')
                        && !$KW.isFlexPropertyDefined(bconfig, 'centerY')) {
                                bconfig.top = '0%';
                            }
                        }

                        if(bconfig.isMaster === true) {
                            this._kwebfw_.is.component = {};
                        }

                        if(bconfig.isPreValidated === true) {
                            this._kwebfw_.isPreValidated = true;
                        }

                        if(!bconfig.isPreValidated) {
                            //Defaulting to platfom values specific to BasicWidget
                            $KU.each(prop, function(value, key) {
                                var $K = voltmx.$kwebfw$, $KU = $K.utils,
                                    $KW = $K.widget, valid = false, message = '';

                                if(!Object.prototype.hasOwnProperty.call(bconfig, key)) {
                                    bconfig[key] = value;
                                } else if($KW.getNonConstructorProperties(self._kwebfw_.name).indexOf(key) >= 0) {
                                    throw new Error('<'+key+'> is a non-constructor property of <'+self._kwebfw_.ns+'> class.');
                                } else if(!$KU.is(_valid.BasicWidget[key], 'function')) {
                                    throw new Error('<'+key+'> is available in default widget properties of <voltmx.ui.BasicWidget>, but not in <_valid.BasicWidget> namespace.');
                                } else {
                                    valid = _valid.BasicWidget[key].call(self, bconfig[key]);
                                    if($KU.is(valid, 'array')) {
                                        bconfig[key] = valid[0]; valid = valid[1];
                                    }

                                    if(valid === false || ($KU.is(valid, 'string') && valid)) {
                                        message = ('Invalid value passed to property <'+key+'> of widget <'+self._kwebfw_.ns+'>.');

                                        if($KU.is(valid, 'string')) {
                                            message += ('\n' + valid);
                                        }

                                        throw new Error(message);
                                    }
                                }
                            });
                        }

                        //Defining Getters/Setters specific to BasicWidget
                        $KU.each(_view.BasicWidget, function(value, key) {
                            var $K = voltmx.$kwebfw$, $KU = $K.utils;

                            $KU.defineProperty(self._kwebfw_.prop, key, bconfig[key], {configurable:false, enumerable:true, writable:true});

                            $KU.defineGetter(self, key, function BasicWidget$_getter() {
                                var $K = voltmx.$kwebfw$, $KU = $K.utils;

                                if($KU.is(_getter.BasicWidget[key], 'function')) {
                                    return _getter.BasicWidget[key].call(this, this._kwebfw_.prop[key]);
                                }
                                return this._kwebfw_.prop[key];
                            }, true);

                            $KU.defineSetter(self, key, function BasicWidget$_setter(val) {
                                var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget, rmodel = null,
                                    valid = false, message = '', final = null, el = null, old = null;

                                if(value === false) {
                                    throw new Error('<'+key+'> is a readonly property of <'+this._kwebfw_.ns+'> widget.');
                                } else if(this._kwebfw_.prop[key] !== val) {
                                    rmodel = $KW.rmodel(this);

                                    if(rmodel && rmodel._kwebfw_.is.template && !rmodel._kwebfw_.is.cloned) {
                                        throw new Error('Cannot set any value of a widget, which is either a raw template or any of its widget.');
                                    } else {
                                        valid = _valid.BasicWidget[key].call(this, val);
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

                                            if($KU.is(_setter.BasicWidget[key], 'function')) {
                                                _setter.BasicWidget[key].call(this, old);
                                            }

                                            if(_relayoutActiveTriggerer.BasicWidget().indexOf(key) >= 0) {
                                                $KW.markRelayout(this);
                                            }

                                            if(_relayoutPassiveTriggerer.BasicWidget().indexOf(key) >= 0) {
                                                final = this._kwebfw_.flex.final;

                                                if(!(final.height && final.width)) {
                                                    $KW.markRelayout(this);
                                                }
                                            }

                                            $KW.onPropertyChange(this, key, old);

                                            if($KU.is(value, 'function')) {
                                                el = $KW.el(this);
                                                if(key === 'isVisible' || el.node) {
                                                    value.call(this, el, old);
                                                }
                                            }
                                        }
                                    }
                                }
                            }, false);
                        });

                        if(bconfig.isPreValidated) {
                            p = this._kwebfw_.prop;

                            p.frame = {x:null, y:null, width:-1, height:-1, doLayout:false};
                            p.parent = null;
                            if(p.padding === undefined) p.padding = null;
                            if(p.focusSkin === undefined) p.focusSkin = null;
                            if(p.skin === undefined) p.skin = null;
                        }

                        if($KU.is(_postInitialization.BasicWidget, 'function')) {
                            _postInitialization.BasicWidget.call(this, bconfig, lconfig, pspconfig);
                        }
                    }
                }
            }

            pspconfig = lconfig = bconfig = null; //For GC
        };


        /**
         * Takes care of flushing out the widget reference to clean memory.
         *
         * @access      protected
         * @method      _flush
         * @memberof    voltmx.ui.BasicWidget
         * @author      Goutam Sahu <goutam.sahu@voltmx.com>
         *
         * @returns     void
         */
        var basic__flush = function BasicWidget$_flush(config) {
            var $K = voltmx.$kwebfw$, $KD = $K.dom, _ = this._kwebfw_,
                prop = _.prop, voltmxControllerName = prop._voltmxControllerName,
                uid = _.uid, hint = document.getElementById(uid+'_hint');

            if(!config) {
                config = {};
            }

            hint && $KD.remove(hint);

            if(_.view) {
                $KD.off(_.view); //Remove all event listeners to avoid memory leaks
                _.view = null; //Cleaning cached view (DOM) of this widget instance
            }

            _cleanMeasuresAndMutates(uid);
            delete _map[uid];

            if(voltmxControllerName && !config.fromDestoryCallstack) {
                _voltmx.mvc.destroyController(voltmxControllerName);
            }
        };


        /**
         * Builds the view layer for voltmx.ui.BasicWidget.
         *
         * @access      protected
         * @method      _render
         * @memberof    voltmx.ui.BasicWidget
         * @author      Goutam Sahu <goutam.sahu@voltmx.com>
         *
         * @returns     {HTMLElement} – BasicWidget view.
         */
        var basic__render = function BasicWidget$_render(tag, children) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils, $KD = $K.dom, $KW = $K.widget, el = null,
                $KF = voltmx.flex, omodel = null, parent = $KW.pmodel(this), _ = this._kwebfw_,
                playout = $KW.layout($KF.FLOW_VERTICAL), is = _.is, prop = _.prop, view = _.view;

            if(is.tab !== true && $KU.is(prop.onInit, 'function')) {
                throw new Error(('<'+_.name+'> does not support the event <onInit>.'));
            } else if(this.isVisible || $KU.is(this, 'widget', 'Form2') || $K.F.RIVW) {
                if(!view) {
                    tag = tag || 'DIV';
                    view = $KD.create(tag);
                    $KU.defineProperty(_, 'view', view);

                    $KD.setAttr(view, 'id', _.uid);
                    $KD.setAttr(view, 'kw', _.name);
                    $KD.setAttr(view, 'kwp', _.wap);

                    if(['td', 'th'].indexOf(tag.toLowerCase()) >= 0) {
                        $KD.setAttr(view, 'align', 'left');
                        $KD.setAttr(view, 'valign', 'top');
                    }

                    if(_.oid) {
                        $KD.setAttr(view, 'kwo', _.oid);
                    }

                    if($KU.is(_.ii, 'string') && _.ii) {
                        $KD.setAttr(view, 'kwi', _.ii);
                    }

                    $KU.each(children, function(child) {
                        var $K = voltmx.$kwebfw$, $KW = $K.widget;

                        $KW.addToView(this, child);
                    }, view);

                    el = $KW.el(view);

                    _view.BasicWidget.anchorPoint.call(this, el, this.anchorPoint);
                    _view.BasicWidget.backgroundColor.call(this, el, this.backgroundColor);
                    _view.BasicWidget.backgroundColorMultiStepGradient.call(this, el, this.backgroundColorMultiStepGradient);
                    _view.BasicWidget.backgroundColorTwoStepGradient.call(this, el, this.backgroundColorTwoStepGradient);
                    _view.BasicWidget.backgroundImage.call(this, el, this.backgroundImage);
                    _view.BasicWidget.borderWidth.call(this, el, this.borderWidth);
                    _view.BasicWidget.blur.call(this, el, this.blur);
                    _view.BasicWidget.contentAlignment.call(this, el, this.contentAlignment);
                    _view.BasicWidget.cursorType.call(this, el, this.cursorType);
                    _view.BasicWidget.cornerRadius.call(this, el, this.cornerRadius);
                    _view.BasicWidget.fontColor.call(this, el, this.fontColor);
                    _view.BasicWidget.fontSize.call(this, el, this.fontSize);
                    _view.BasicWidget.fontStyle.call(this, el, this.fontStyle);
                    _view.BasicWidget.fontWeight.call(this, el, this.fontWeight);
                    _view.BasicWidget.fontFamily.call(this, el, this.fontFamily);
                    _view.BasicWidget.opacity.call(this, el, this.opacity);
                    _view.BasicWidget.shadowColor.call(this, el, this.shadowColor);
                    _view.BasicWidget.shadowRadius.call(this, el, this.shadowRadius);
                    _view.BasicWidget.shadowOffset.call(this, el, this.shadowOffset);
                    _view.BasicWidget.textShadowColor.call(this, el, this.textShadowColor);
                    _view.BasicWidget.textShadowOffset.call(this, el, this.textShadowOffset);
                    _view.BasicWidget.textShadowRadius.call(this, el, this.textShadowRadius);
                    _view.BasicWidget.transform.call(this, el, this.transform);
                    if($K.F.RIVW && !this.isVisible) {
                        _view.BasicWidget.isVisible.call(this, el, this.isVisible);
                    }
                    _view.BasicWidget.padding.call(this, el, this.padding);
                    _view.BasicWidget.skin.call(this, el, this.skin);
                    if(parent) {
                        if($KW.isFlexContainer(parent)) {
                            playout = $KW.layout(parent);
                        }
                    } else {
                        omodel = $KW.omodel(this);
                        if(omodel && $KU.is(omodel, 'widget', 'CollectionView')
                           && omodel.layout === voltmx.collectionview.LAYOUT_CUSTOM) {
                            playout = $KF.FREE_FORM;
                        }
                    }

                    _applyFlexRule.call(this, playout, 'horizontal', view, false, false);
                    _applyFlexRule.call(this, playout, 'vertical', view, false, false);
                }
            }

            return view;
        };


        //TODO:: addGestureRecognizer
        var basic_addGestureRecognizer = function BasicWidget$addGestureRecognizer(type, options, callback) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils, gesture = null, identifier = '';

            if(!$KU.is(this._kwebfw_.gesture, 'object')) this._kwebfw_.gesture = {};
            gesture = this._kwebfw_.gesture[type];
            if(!$KU.is(gesture, 'array')) gesture = [];

            gesture.push({cb:callback, id:identifier, opt:options});

            return identifier;
        };


        var basic_animate = function BasicWidget$animate(animInstance, animConfig, animCallback) {
            var $K = voltmx.$kwebfw$;

            if(animInstance instanceof $K.Animator) {
                animInstance.animate(this, animConfig, animCallback);
            }
        };


        var basic_clone = function BasicWidget$clone(prefix) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils,
                clone = $KU.clone(this, prefix);

            return clone;
        };


        var basic_convertPointFromWidget = function BasicWidget$convertPointFromWidget(point, widget) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils;

            if($KU.is(widget, 'widget') && $KU.is(point, 'object')
            && $KU.is(point.x, 'string') && $KU.is(point.y, 'string')) {
                return _distanceBetweenFromWidgetToWidget(point, this, widget);
            }
            throw new Error('Invalid argument passed.');
        };


        var basic_convertPointToWidget = function BasicWidget$convertPointToWidget(point, widget) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils;

            if($KU.is(widget, 'widget') && $KU.is(point, 'object')
            && $KU.is(point.x, 'string') && $KU.is(point.y, 'string')) {
                return _distanceBetweenFromWidgetToWidget(point, widget, this);
            }
            throw new Error('Invalid argument passed.');
        };


        var basic_removeFromParent = function BasicWidget$removeFromParent() {
            var $K = voltmx.$kwebfw$, $KW = $K.widget,
                _ = this._kwebfw_, pmodel = $KW.pmodel(this);

            pmodel && _removeWidget.call(pmodel, (_.uwi || this));
        };


        //TODO:: removeGestureRecognizer
        var basic_removeGestureRecognizer = function BasicWidget$removeGestureRecognizer(identifier) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils, position = -1, gtype = '',
                on = this._kwebfw_.on, gesture = this._kwebfw_.gesture, removed = false;

            //Remove from gesture registered via setGestureRecognizer
            if($KU.is(on, 'object')) {
                $KU.each(on, function(value, type) {
                    if(value.id === identifier) {
                        delete on[type];
                        removed = true;
                        return true;
                    }
                });
            }

            //Remove from gesture registered via addGestureRecognizer
            if(!removed && $KU.is(gesture, 'object')) {
                $KU.each(gesture, function(value, type) {
                    if(removed) return true;

                    gtype = type;

                    $KU.each(value, function(data, index) {
                        if(data.id === identifier) {
                            position = index;
                            removed = true;
                            return true;
                        }
                    });
                });

                if(position !== -1) {
                    gesture[gtype].splice(position, 1);

                    if(!gesture[gtype].length) {
                        delete gesture.gtype;
                    }
                }
            }
        };

        var basic_setActive = function BasicWidget$setActive() {
            var $K = kony.$kwebfw$, $KW = $K.widget,
                $KD = $K.dom, dom = null;
            
            if ($KW.interactable(this)) {
                dom = $KW.focusableElement(this);
                dom && $KD.focus(dom);
            }
        };

        var basic_setEnabled = function BasicWidget$setEnabled(enable) {
            this.enable = enable;
        };


        var basic_setFocus = function BasicWidget$setFocus(value) {
            var $K = voltmx.$kwebfw$, $KW = $K.widget;

            if(value === true) {
                $KW.setFocus(this);
            }
        };


        //TODO:: setGestureRecognizer
        var basic_setGestureRecognizer = function BasicWidget$setGestureRecognizer(type, options, callback) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils, identifier = '';

            if(!$KU.is(this._kwebfw_.on, 'object')) this._kwebfw_.on = {};

            this._kwebfw_.on[type] = {cb:callback, id:identifier, opt:options};

            return identifier;
        };


        var basic_setVisibility = function BasicWidget$setVisibility(flag) {
            this.isVisible = flag;
        };

        var basic_getPreferredSize = function(frame) {
            var $K = voltmx.$kwebfw$, $KW = $K.widget, $KD = $K.dom,
                el = $KW.el(this),
                preferredSize = {
                    width: 0,
                    height: 0
                };

            if(el.node && frame) {
                preferredSize.width = _getPrefferedWidth.call(this, el, frame.width);
                preferredSize.height = _getPrefferedHeight.call(this, el, frame.height);

                $KD.style(el.node, 'max-width', null);
                $KD.style(el.node, 'max-height', null);
            }

            return preferredSize;
        };

        var _getPrefferedWidth = function(el, maxWidth) {
            var wrapper = el.node;
            var element = wrapper;

            var initialWidth = wrapper.style.width;

            var defaultWidth = _getDefaultWidth.call(this);
            wrapper.style.width = defaultWidth ? defaultWidth : 'auto';


            if(maxWidth !== Number.MAX_VALUE)
                wrapper.style.maxWidth = maxWidth + 'px';

            if(!defaultWidth) { //content driven widgets
                var initialWrap = element.style.whiteSpace;
                element.style.whiteSpace = 'nowrap';
                element.style.whiteSpace = (wrapper.offsetWidth >= Math.floor(maxWidth)) ? 'pre-wrap' : 'nowrap';
            }

            var finalWidth = wrapper.offsetWidth;
            wrapper.style.width = initialWidth;
            if(!defaultWidth)
                element.style.whiteSpace = initialWrap;

            return finalWidth;
        };

        var _getPrefferedHeight = function(el, maxHeight) {
            var wrapper = el.node;
            var initialHeight = wrapper.style.height;
            var defaultHeight = _getDefaultHeight.call(this);
            wrapper.style.height = defaultHeight ? defaultHeight : 'auto';

            if(maxHeight !== Number.MAX_VALUE)
                wrapper.style.maxHeight = maxHeight + 'px';

            var finalHeight = wrapper.offsetHeight;
            wrapper.style.height = initialHeight;
            return finalHeight;
        };
        var _getDefaultHeight = function() {
            return '';
        };
        var _getDefaultWidth = function() {
            return '';
        };

        $K.defVoltmxProp(BasicWidget.prototype, [
            {keey:'_flush', value:basic__flush},
            {keey:'_render', value:basic__render},
            {keey:'addGestureRecognizer', value:basic_addGestureRecognizer},
            {keey:'animate', value:basic_animate},
            {keey:'clone', value:basic_clone},
            {keey:'convertPointFromWidget', value:basic_convertPointFromWidget},
            {keey:'convertPointToWidget', value:basic_convertPointToWidget},
            {keey:'removeFromParent', value:basic_removeFromParent},
            {keey:'removeGestureRecognizer', value:basic_removeGestureRecognizer},
            {keey:'setActive', value:basic_setActive},
            {keey:'setEnabled', value:basic_setEnabled},
            {keey:'setFocus', value:basic_setFocus},
            {keey:'setGestureRecognizer', value:basic_setGestureRecognizer},
            {keey:'setVisibility', value:basic_setVisibility}
        ]);

        return BasicWidget;
    }())});


    /***************************************************************************
    *                                                                          *
    *                                                                          *
    *                         voltmx.ui.ContainerWidget                          *
    *                                                                          *
    *                                                                          *
    ****************************************************************************/
    Object.defineProperty(voltmx.ui, 'ContainerWidget', {configurable:false, enumerable:false, writable:false, value:(function() {
        var $K = voltmx.$kwebfw$;


        /**
         * voltmx.ui.ContainerWidget constructor.
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
        var ContainerWidget = function ContainerWidget(bconfig, lconfig, pspconfig) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils, self = this,
                dependentPropertiesValidationMessage = '', prop = null;

            if(!bconfig.isPreValidated) {
                prop = { //Do not add event properties here
                    _voltmxControllerName: '',
                    addWidgets: null,
                    appName: $K.app.id,
                    gutterX: '',
                    gutterY: '',
                    init: null,
                    layoutType: voltmx.flex.FREE_FORM,
                    onBreakpointChange: null,
                    onBreakpointHandler: null,
                    onDestroy: null,
                    onHide: null,
                    onInit: null,
                    onResize: null,
                    postShow: null,
                    preShow: null,
                    responsiveConfig: null,
                    retainFlowHorizontalAlignment: false,
                    reverseLayoutDirection: false
                };
            }

            _populateUnderscore.ContainerWidget.call(this);

            if(!bconfig.appName) bconfig.appName = prop.appName;

            ContainerWidget.base.call(this, bconfig, lconfig, pspconfig);

            if(!bconfig.isPreValidated) {
                if($KU.is(_dependentPropertiesValidationMessage.ContainerWidget, 'function')) {
                    dependentPropertiesValidationMessage = _dependentPropertiesValidationMessage.ContainerWidget.call(this, prop, bconfig, lconfig, pspconfig);
                }
            }

            if(dependentPropertiesValidationMessage) {
                throw new Error(dependentPropertiesValidationMessage);
            } else {
                if(!bconfig.isPreValidated) {
                //Defaulting to platfom values specific to ContainerWidget
                    $KU.each(prop, function(value, key) {
                        var $K = voltmx.$kwebfw$, $KU = $K.utils,
                            $KW = $K.widget, valid = false, message = '';

                        if(!Object.prototype.hasOwnProperty.call(bconfig, key)) {
                            bconfig[key] = value;
                        } else if($KW.getNonConstructorProperties(self._kwebfw_.name).indexOf(key) >= 0) {
                            throw new Error('<'+key+'> is a non-constructor property of <'+self._kwebfw_.ns+'> class.');
                        } else if(!$KU.is(_valid.ContainerWidget[key], 'function')) {
                            throw new Error('<'+key+'> is available in default widget properties of <voltmx.ui.ContainerWidget>, but not in <_valid.ContainerWidget> namespace.');
                        } else {
                            valid = _valid.ContainerWidget[key].call(self, bconfig[key]);
                            if($KU.is(valid, 'array')) {
                                bconfig[key] = valid[0]; valid = valid[1];
                            }

                            if(valid === false || ($KU.is(valid, 'string') && valid)) {
                                message = ('Invalid value passed to property <'+key+'> of widget <'+self._kwebfw_.ns+'>.');

                                if($KU.is(valid, 'string')) {
                                    message += ('\n' + valid);
                                }

                                throw new Error(message);
                            }
                        }
                    });
                }

                //Defining Getters/Setters specific to ContainerWidget
                $KU.each(_view.ContainerWidget, function(value, key) {
                    var $K = voltmx.$kwebfw$, $KU = $K.utils;

                    $KU.defineProperty(self._kwebfw_.prop, key, bconfig[key], {configurable:false, enumerable:true, writable:true});

                    $KU.defineGetter(self, key, function ContainerWidget$_getter() {
                        var $K = voltmx.$kwebfw$, $KU = $K.utils;

                        if($KU.is(_getter.ContainerWidget[key], 'function')) {
                            return _getter.ContainerWidget[key].call(this, this._kwebfw_.prop[key]);
                        }
                        return this._kwebfw_.prop[key];
                    }, true);

                    $KU.defineSetter(self, key, function ContainerWidget$_setter(val) {
                        var $K = voltmx.$kwebfw$, $KU = $K.utils,
                            $KW = $K.widget, rmodel = null, final = null,
                            valid = false, message = '', el = null, old = null;

                        if(value === false) {
                            throw new Error('<'+key+'> is a readonly property of <'+this._kwebfw_.ns+'> widget.');
                        } else if(this._kwebfw_.prop[key] !== val) {
                            rmodel = $KW.rmodel(this);

                            if(rmodel && rmodel._kwebfw_.is.template && !rmodel._kwebfw_.is.cloned) {
                                throw new Error('Cannot set any value of a widget, which is either a raw template or any of its widget.');
                            } else {
                                valid = _valid.ContainerWidget[key].call(this, val);
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

                                    if($KU.is(_setter.ContainerWidget[key], 'function')) {
                                        _setter.ContainerWidget[key].call(this, old);
                                    }

                                    if(_relayoutActiveTriggerer.ContainerWidget().indexOf(key) >= 0) {
                                        $KW.markRelayout(this);
                                    }

                                    if(_relayoutPassiveTriggerer.ContainerWidget().indexOf(key) >= 0) {
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

                if($KU.is(_postInitialization.ContainerWidget, 'function')) {
                    _postInitialization.ContainerWidget.call(this, bconfig, lconfig, pspconfig);
                }
            }

            pspconfig = lconfig = bconfig = null; //For GC
        };


        $K.utils.inherits(ContainerWidget, voltmx.ui.BasicWidget);


        /**
         * Takes care of flushing out the widget reference to clean memory.
         *
         * @override
         * @access      protected
         * @method      _flush
         * @memberof    voltmx.ui.ContainerWidget
         * @author      Goutam Sahu <goutam.sahu@voltmx.com>
         *
         * @param       {object} config - An object with config properties.
         * @returns     void
         */
        var container__flush = function ContainerWidget$_flush(config) {
            var $super = voltmx.ui.ContainerWidget.base.prototype, _ = this._kwebfw_,
                $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget, id = _.prop.id;

            if(!config) {
                config = {};
                config.iterate = false;
            }

            if(config.iterate) {
                $KU.each($KW.children(this), function(widget) {
                    widget._flush(config);
                });
            }

            $super._flush.call(this, config);

            if($KU.is(this, 'widget', 'Form2')) {
                delete _root[id];
            } else if(_.uwi instanceof voltmx.ui.UserWidget) {
                _cleanMeasuresAndMutates(_.uwi._kwebfw_.uid);
                delete _map[_.uwi._kwebfw_.uid];
            }
        };


        var container__render = function ContainerWidget$_render(tag, children) {
            var $super = voltmx.ui.ContainerWidget.base.prototype,
                el = null, view = this._kwebfw_.view, $K = voltmx.$kwebfw$,
                $KU = $K.utils, $KW = $K.widget, $KD = $K.dom;

            if(this.isVisible || $K.F.RIVW) {
                if(!view) {
                    if($KW.isFlexContainer(this) && !$KU.is(this, 'widget', 'Form2')) {
                        if(!$KU.is(children, 'array')) children = [];

                        if($K.F.RFB) {
                            children.push($KD.create('DIV', {class:'kvp', kr:'kfb'}));
                        }
                    }

                    view = $super._render.call(this, tag, children);
                    el = $KW.el(view);

                    _view.ContainerWidget.layoutType.call(this, el, this.layoutType);
                    _view.ContainerWidget.reverseLayoutDirection.call(this, el, this.reverseLayoutDirection);
                }
            }

            return view;
        };


        var container_add = function ContainerWidget$add() {
            var $K = voltmx.$kwebfw$, $KW = $K.widget;

            _addWidgets.call(this, [].slice.call(arguments), $KW.children(this).length);
        };


        var container_addAt = function ContainerWidget$addAt(widget, index) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget, children = null;

            if($KU.is(index, 'number')) {
                if(index < 0) index = 0;

                children = $KW.children(this);

                if(index > children.length) {
                    index = children.length;
                }

                _addWidgets.call(this, [widget], index);
            } else {
                //Log index must be of number datatype
            }
        };


        var container_destroy = function ContainerWidget$destroy(arg0) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils, _ = null, context = null,
                $KW = $K.widget, $KA = $K.app, self = null, valid = false, config = {fromDestoryCallstack : true};

            context = ($KU.is(arg0, 'object')) ? arg0 : {};

            if($KU.is(this, 'widget', 'Form2')) {
                if(this._voltmxControllerName && context.forced !== true) {
                    throw new Error('Cannot call <destroy> method on a MVC form.');
                } else if($KW.model($KA.currentFormUID) === this) {
                    throw new Error('Cannot call <destroy> method on current form.');
                } else {
                    valid = true;
                }
            } else if($KU.is(this, 'widget', 'component')) {
                valid = true;
            }

            if(valid) {
                _ = this._kwebfw_;
                $KW.invokeLifeCycleEvent(this, 'onDestroy', true);

                //Remove all widgets from root hierarchy and _map
                $KW.iterate(this, function(widget) {
                    _cleanUnderscore.call(widget);
                    delete this[widget.id];
                    widget._flush(config);
                }, {scope:this, tabs:false});

                delete _.children;

                if(this._voltmxControllerName) {
                    if($KU.is(this, 'widget', 'Form2')) {
                        _cleanMeasuresAndMutates(_.uid);
                        _cleanUnderscore.call(this);
                        delete _map[_.uid];
                        delete _root[_.prop.id];
                    }
                } else if($KU.is(this, 'widget', 'Form2')) {
                    self = this;

                    _cleanUnderscore.call(this, {rid:false});

                    $KU.defineGetter(window, this.id, function() {
                        _invokeAddWidgets.call(self, true);
                        return self;
                    });
                }
            }
        };


        var container_executeOnParent = function Container$executeOnParent(callback) {
            var $K = voltmx.$kwebfw$, $KW = $K.widget, pmodel = null, args = [];

            if(this._voltmxControllerName) {
                pmodel = $KW.closest($KW.model(this._kwebfw_.owner), function(widget) {
                    return (widget._voltmxControllerName) ? true : null;
                }, {owner:false, tabs:false});

                if(pmodel) {
                    if(arguments.length >= 2) {
                        args = [].slice.call(arguments);
                        args = args.slice(1, args.length);
                    }
                    _voltmx.mvc.executeInJsContext(pmodel, callback, args);
                }
            }
        };


        //One suppose to call this method on a fixed size container.
        var container_forceLayout = function ContainerWidget$forceLayout(arg0) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget,
                fmodel = null, isForm = true, forced = false;

            if(!$KW.isFlexContainer(this)) {
                //Throw Error
            } else {
                fmodel = $KW.fmodel(this) || this;

                if($KW.isRendered(fmodel)) {
                    if($KU.loadedFromOtherFramework()) {
                        isForm = true;
                        fmodel = $KW.getRootNode(fmodel);
                    } else if($KU.is(arg0, 'boolean')) {
                        forced = arg0;
                    } else if(!$KU.is(this, 'widget', 'Form2')
                    && this._kwebfw_.forceLayout === true) {
                        //e.g. forceLayout of voltmx.ui.Map callout template
                        forced = true;
                        isForm = false;
                        delete this._kwebfw_.forceLayout;
                    } else if(!$KU.is(fmodel, 'widget', 'Form2')) {
                        forced = false;
                        delete fmodel._kwebfw_.relayout;
                        delete fmodel._kwebfw_.forceLayout;
                    }

                    if(forced || fmodel._kwebfw_.relayout) {
                        if(!forced) {
                            _dirty.cascade = fmodel._kwebfw_.relayout;
                            delete fmodel._kwebfw_.relayout;

                            $KU.each(_dirty.cascade, function(widget) {
                                _cascadeRelayout.call(fmodel, widget);
                            });
                        }

                        $KW.iterate(fmodel, function(widget) {
                            var $K = voltmx.$kwebfw$;

                            if(widget.isVisible || $K.F.RIVW) {
                                _relayout.call(this, widget, forced);
                            } else {
                                delete widget._kwebfw_.relayout;
                                return true;
                            }
                        }, {scope:fmodel, tabs:true});

                        _dirty = {cascade:{}, widgets:{}, templates:{}};

                        _resolveMeasures();
                        _resolveMutates();

                        if(isForm) {
                            //NOTE:: It is considered that doLayout should not be fired
                            //       for widgets of voltmx.ui.Map callout template
                            //       This consideration can be changed, but it needs time.
                            //       As we don't have time proceeding with this consideration.
                            //Current challenge is, calling doLayout might make,
                            //that callout template dirty and will run into...
                            //... infitine forceLayout call stack (as, for !isForm, forced is set to true)
                            //If noone wants to make any widget of callout template dirty,
                            //then he/she should not need any widget's frame too.
                            $KU.each(_doLayoutWidgtsList, function(widget) {
                                _doLayout.call(widget);
                            });
                        }

                        _doLayoutWidgtsList = [];

                        isForm && fmodel.forceLayout();
                        $KW.evaluateScrollPosition(fmodel);
                    }
                }
            }
        };


        var container_remove = function ContainerWidget$remove(widget) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils;

            if($KU.is(widget, 'widget') && widget.parent) {
                _removeWidget.call(widget.parent, widget);
            }
        };


        var container_removeAll = function ContainerWidget$removeAll() {
            var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget;

            $KU.each($KW.children(this), function(widget) {
                _removeWidget.call(this, widget);
            }, this);
        };


        var container_removeAt = function ContainerWidget$removeAt(index) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget, widget = null;

            if($KU.is(index, 'number')) {
                widget = $KW.children(this)[index];

                if($KU.is(widget, 'widget')) {
                    _removeWidget.call(this, widget);
                }
            } else {
                //Log invalid datatype for index
            }

            return widget;
        };


        var container_scrollToBeginning = function Container$scrollToBeginning() {
            var $K = voltmx.$kwebfw$, $KU = $K.utils,
                $KW = $K.widget, el = null;

            if(this instanceof voltmx.ui.Form2
            || this instanceof voltmx.ui.FlexScrollContainer) {
                el = $KW.el(this);

                if(el.viewport) {
                    $KW.populateScrollDetails(this);

                    if($KU.scrollType() === 'native') {
                        el.viewport.scrollLeft = 0;
                        el.viewport.scrollTop = 0;
                    }
                }
            } else {
                throw new Error('Cannot call <scrollToBeginning> method on <'+ this._kwebfw_.ns+'>');
            }
        };


        var container_scrollToEnd = function Container$scrollToEnd() {
            var $K = voltmx.$kwebfw$, $KU = $K.utils,
                $KW = $K.widget, scroll = null, el = null;

            if(this instanceof voltmx.ui.Form2
            || this instanceof voltmx.ui.FlexScrollContainer) {
                el = $KW.el(this);

                if(el.viewport) {
                    $KW.populateScrollDetails(this);
                    scroll = this._kwebfw_.ui.scroll;

                    if($KU.scrollType() === 'native') {
                        el.viewport.scrollLeft = scroll.maxX;
                        el.viewport.scrollTop = scroll.maxY;
                    }
                }
            } else {
                throw new Error('Cannot call <scrollToEnd> method on <'+ this._kwebfw_.ns+'>');
            }
        };


        var container_scrollToWidget = function Container$scrollToWidget(widget/*, animate*/) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget;

            if($KU.is(widget, 'widget')) {
                $KW.setFocus(widget);
            }
        };


        var container_setContentOffset = function Container$setContentOffset(offset, animate) {
            var $K = voltmx.$kwebfw$, $KW = $K.widget;

            $KW.setContentOffset(this, offset, animate);
        };


        var container_setDefaultUnit = function ContainerWidget$setDefaultUnit(unit) {
            var $K = voltmx.$kwebfw$, $KW = $K.widget, $KF = voltmx.flex;

            if($KW.isFlexContainer(this) && this._kwebfw_.defaultUnit !== unit
            && [$KF.PERCENTAGE, $KF.DP, $KF.PX, ''].indexOf(unit) >= 0) {
                if(unit) {
                    this._kwebfw_.defaultUnit = unit;
                } else {
                    delete this._kwebfw_.defaultUnit;
                }

                $KW.iterate(this, function(widget) {
                    var _ = widget._kwebfw_;

                    if(this !== widget && _.defaultUnit) {
                        return true;
                    }
                    if(unit) {
                        _.layoutUnit = unit;
                    } else {
                        delete _.layoutUnit;
                    }
                }, {scope:this, tabs:false});
            }
        };


        var container_widgets = function ContainerWidget$widgets() {
            var $K = voltmx.$kwebfw$, $KU = $K.utils, _ = this._kwebfw_;

            return ($KU.is(_.children, 'array')) ? _.children.slice(0) : [];
        };


        $K.defVoltmxProp(ContainerWidget.prototype, [
            {keey:'_flush', value:container__flush},
            {keey:'_render', value:container__render},
            {keey:'add', value:container_add},
            {keey:'addAt', value:container_addAt},
            {keey:'destroy', value:container_destroy},
            {keey:'executeOnParent', value:container_executeOnParent},
            {keey:'forceLayout', value:container_forceLayout},
            {keey:'remove', value:container_remove},
            {keey:'removeAt', value:container_removeAt},
            {keey:'removeAll', value:container_removeAll},
            {keey:'scrollToBeginning', value:container_scrollToBeginning},
            {keey:'scrollToEnd', value:container_scrollToEnd},
            {keey:'scrollToWidget', value:container_scrollToWidget},
            {keey:'scrollToWidget', value:container_scrollToWidget},
            {keey:'setContentOffset', value:container_setContentOffset},
            {keey:'setDefaultUnit', value:container_setDefaultUnit},
            {keey:'widgets', value:container_widgets}
        ]);


        return ContainerWidget;
    }())});


    /***************************************************************************
    *                                                                          *
    *                                                                          *
    *                           voltmx.ui.GroupWidget                            *
    *                                                                          *
    *                                                                          *
    ****************************************************************************/
    Object.defineProperty(voltmx.ui, 'GroupWidget', {configurable:false, enumerable:false, writable:false, value:(function() {
        var $K = voltmx.$kwebfw$;


        /**
         * voltmx.ui.GroupWidget constructor.
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
        var GroupWidget = function GroupWidget(bconfig, lconfig, pspconfig) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils, self = this,
                dependentPropertiesValidationMessage = '', prop = null;

            if(!bconfig.isPreValidated) {
                prop = { //Do not add event properties here
                    onSelection: null
                };
            }

            _populateUnderscore.GroupWidget.call(this);

            GroupWidget.base.call(this, bconfig, lconfig, pspconfig);

            if(!bconfig.isPreValidated) {
                if($KU.is(_dependentPropertiesValidationMessage.GroupWidget, 'function')) {
                    dependentPropertiesValidationMessage = _dependentPropertiesValidationMessage.GroupWidget.call(this, prop, bconfig, lconfig, pspconfig);
                }
            }

            if(dependentPropertiesValidationMessage) {
                throw new Error(dependentPropertiesValidationMessage);
            } else {
                if(!bconfig.isPreValidated) {
                    //Defaulting to platfom values specific to GroupWidget
                    $KU.each(prop, function(value, key) {
                        var $K = voltmx.$kwebfw$, $KU = $K.utils,
                            $KW = $K.widget, valid = false, message = '';

                        if(!Object.prototype.hasOwnProperty.call(bconfig, key)) {
                            bconfig[key] = value;
                        } else if($KW.getNonConstructorProperties(self._kwebfw_.name).indexOf(key) >= 0) {
                            throw new Error('<' + key + '> is a non-constructor property of <' + self._kwebfw_.ns + '> class.');
                        } else if(!$KU.is(_valid.GroupWidget[key], 'function')) {
                            throw new Error('<' + key + '> is available in default widget properties of <voltmx.ui.GroupWidget>, but not in <_valid.GroupWidget> namespace.');
                        } else {
                            valid = _valid.GroupWidget[key].call(self, bconfig[key]);
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

                //Defining Getters/Setters specific to GroupWidget
                $KU.each(_view.GroupWidget, function(value, key) {
                    var $K = voltmx.$kwebfw$, $KU = $K.utils;

                    $KU.defineProperty(self._kwebfw_.prop, key, bconfig[key], {configurable:false, enumerable:true, writable:true});

                    $KU.defineGetter(self, key, function GroupWidget$_getter() {
                        var $K = voltmx.$kwebfw$, $KU = $K.utils;

                        if($KU.is(_getter.GroupWidget[key], 'function')) {
                            return _getter.GroupWidget[key].call(this, this._kwebfw_.prop[key]);
                        }
                        return this._kwebfw_.prop[key];
                    }, true);

                    $KU.defineSetter(self, key, function GroupWidget$_setter(val) {
                        var $K = voltmx.$kwebfw$, $KU = $K.utils, rmodel = null, valid = false,
                            $KW = $K.widget, old = null, final = null, el = null, message = '';

                        if(value === false) {
                            throw new Error('<'+key+'> is a readonly property of <'+this._kwebfw_.ns+'> widget.');
                        } else if(this._kwebfw_.prop[key] !== val) {
                            rmodel = $KW.rmodel(this);

                            if(rmodel && rmodel._kwebfw_.is.template && !rmodel._kwebfw_.is.cloned) {
                                throw new Error('Cannot set any value of a widget, which is either a raw template or any of its widget.');
                            } else {
                                valid = _valid.GroupWidget[key].call(this, val);
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

                                    if($KU.is(_setter.GroupWidget[key], 'function')) {
                                        _setter.GroupWidget[key].call(this, old);
                                    }

                                    if(_relayoutActiveTriggerer.GroupWidget().indexOf(key) >= 0) {
                                        $KW.markRelayout(this);
                                    }

                                    if(_relayoutPassiveTriggerer.GroupWidget().indexOf(key) >= 0) {
                                        final = this._kwebfw_.flex.final;

                                        if(!(final.height && final.width)) {
                                            $KW.markRelayout(this);
                                        }
                                    }

                                    $KW.onPropertyChange(this, key, old);

                                    if($KU.is(value, 'function')) {
                                        el = $KW.el(this);
                                        el.node && value.call(this, old);
                                    }
                                }
                            }
                        }
                    }, false);
                });

                if($KU.is(_postInitialization.GroupWidget, 'function')) {
                    _postInitialization.GroupWidget.call(this, bconfig, lconfig, pspconfig);
                }
            }

            pspconfig = lconfig = bconfig = null; //For GC
        };


        $K.utils.inherits(GroupWidget, voltmx.ui.BasicWidget);


        /**
         * Takes care of flushing out the widget reference to clean memory.
         *
         * @override
         * @access      protected
         * @method      _flush
         * @memberof    voltmx.ui.GroupWidget
         * @author      Goutam Sahu <goutam.sahu@voltmx.com>
         *
         * @returns     void
         */
        var group__flush = function GroupWidget$_flush() {
            var $super = voltmx.ui.GroupWidget.base.prototype,
                $K = voltmx.$kwebfw$, $KW = $K.widget;

            $KW.clearGroupA11y(this, this.masterData, this.masterDataMap);
            $super._flush.call(this);
        };


        /**
         * Builds the view layer for voltmx.ui.GroupWidget.
         *
         * @override
         * @access      protected
         * @method      _render
         * @memberof    voltmx.ui.GroupWidget
         * @author      Goutam Sahu <goutam.sahu@voltmx.com>
         *
         * @returns     {HTMLElement} – GroupWidget view.
         */
        var group__render = function GroupWidget$_render(tag, children) {
            var $super = voltmx.ui.GroupWidget.base.prototype,
                view = this._kwebfw_.view, $K = voltmx.$kwebfw$;

            if(this.isVisible || $K.F.RIVW) {
                if(!view) {
                    view = $super._render.call(this, tag, children);
                }
            }

            return view;
        };


        $K.defVoltmxProp(GroupWidget.prototype, [
            {keey:'_flush', value:group__flush},
            {keey:'_render', value:group__render}
        ]);


        return GroupWidget;
    }())});


    /***************************************************************************
    *                                                                          *
    *                                                                          *
    *                            voltmx.ui.UserWidget                            *
    *                                                                          *
    *                                                                          *
    ****************************************************************************/
    Object.defineProperty(voltmx.ui, 'UserWidget', {configurable:false, enumerable:false, writable:false, value:(function() {
        var $K = voltmx.$kwebfw$;


        /**
         * voltmx.ui.UserWidget constructor.
         *
         * @class
         * @namespace   voltmx.ui
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
        var UserWidget = function UserWidget(bconfig, lconfig, pspconfig) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget, self = null,
                dependentPropertiesValidationMessage = '', prop = null, p = null;

            _populateUnderscore.UserWidget.call(this);

            self = this;

            if(!bconfig.isPreValidated) {
                prop = {
                    addWidgets: undefined,
                    anchorPoint: undefined,
                    appName: $K.app.id,
                    backgroundColor: undefined,
                    backgroundColorMultiStepGradient: undefined,
                    backgroundColorTwoStepGradient: undefined,
                    backgroundImage: undefined,
                    borderColor: undefined,
                    borderWidth: undefined,
                    bottom: undefined,
                    centerX: undefined,
                    centerY: undefined,
                    contentAlignment: undefined,
                    cornerRadius: undefined,
                    doLayout: undefined,
                    focusSkin: undefined, //non-constructor property
                    focusStateSkinProperties: undefined,
                    frame: undefined, //{x:undefined, y:undefined, width:-1, height:-1, doLayout:false}, //non-constructor & readonly property
                    height: undefined,
                    hoverStateSkinProperties: undefined,
                    id: undefined, //constructor only
                    info: undefined,
                    init: undefined, //constructor only
                    isVisible: true,
                    left: undefined,
                    maxHeight: undefined,
                    maxWidth: undefined,
                    minHeight: undefined,
                    minWidth: undefined,
                    onTouchEnd: undefined,
                    onTouchMove: undefined,
                    onTouchStart: undefined,
                    opacity: undefined,
                    padding: undefined, //constructor only - with flex this is not applicable
                    paddingInPixel: undefined, //constructor only - with flex this is not applicable
                    parent: undefined, //non-constructor & readonly property
                    right: undefined,
                    skin: undefined,
                    top: undefined,
                    transform: undefined, //non-constructor property
                    width: undefined,
                    zIndex: undefined
                };
            }

            if(!bconfig.isPreValidated) {
                if($KU.is(_dependentPropertiesValidationMessage.UserWidget, 'function')) {
                    dependentPropertiesValidationMessage = _dependentPropertiesValidationMessage.UserWidget.call(this, prop, bconfig, lconfig, pspconfig);
                }
            }

            if(dependentPropertiesValidationMessage) {
                throw new Error(dependentPropertiesValidationMessage);
            } else {
                if(!bconfig.isPreValidated) {
                    //Copying lconfig properties to bconfig
                    $KU.each(lconfig, function(value, key) {
                        if(!Object.prototype.hasOwnProperty.call(bconfig, key)) {
                            bconfig[key] = value;
                        } else {
                            //Throw Error
                        }
                    });

                    //Copying pspconfig properties to bconfig
                    $KU.each(pspconfig, function(value, key) {
                        if(!Object.prototype.hasOwnProperty.call(bconfig, key)) {
                            bconfig[key] = value;
                        } else {
                            //Throw Error
                        }
                    });

                    if(!$KW.isFlexPropertyDefined(bconfig, 'left')
                        && !$KW.isFlexPropertyDefined(bconfig, 'right')
                        && !$KW.isFlexPropertyDefined(bconfig, 'centerX')) {
                        bconfig.left = '0%';
                    }

                    if(!$KW.isFlexPropertyDefined(bconfig, 'top')
                        && !$KW.isFlexPropertyDefined(bconfig, 'bottom')
                        && !$KW.isFlexPropertyDefined(bconfig, 'centerY')) {
                        bconfig.top = '0%';
                    }
                }

                if(bconfig.isMaster === true) {
                    this._kwebfw_.is.component = {};
                }

                if(!bconfig.isPreValidated) {
                    //Defaulting to platfom values specific to UserWidget
                    $KU.each(prop, function(value, key) {
                        var $K = voltmx.$kwebfw$, $KU = $K.utils,
                            $KW = $K.widget, valid = false, message = '';

                        if(!Object.prototype.hasOwnProperty.call(bconfig, key)) {
                            bconfig[key] = value;
                        } else if($KW.getNonConstructorProperties(self._kwebfw_.name).indexOf(key) >= 0) {
                            throw new Error('<' + key + '> is a non-constructor property of <' + self._kwebfw_.ns + '> class.');
                        } else if(!$KU.is(_valid.UserWidget[key], 'function')) {
                            throw new Error('<' + key + '> is available in default widget properties of <voltmx.ui.UserWidget>, but not in <_valid.UserWidget> namespace.');
                        } else {
                            valid = _valid.UserWidget[key].call(self, bconfig[key]);
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

                //Defining Getters/Setters specific to UserWidget
                $KU.each(_view.UserWidget, function(value, key) {
                    var $K = voltmx.$kwebfw$, $KU = $K.utils;

                    $KU.defineGetter(self, key, function UserWidget$_getter() {
                        return (key === 'parent') ? this._kwebfw_.prop[key] : this._kwebfw_.proxy[key];
                    }, true);

                    $KU.defineSetter(self, key, function UserWidget$_setter(val) {
                        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget,
                            valid = false, message = '', rmodel = null;

                        if(value === false) {
                            throw new Error('<'+key+'> is a readonly property of <'+this._kwebfw_.ns+'> widget.');
                        } else if(this._kwebfw_.prop[key] !== val) {
                            rmodel = $KW.rmodel(this);

                            if(rmodel && rmodel._kwebfw_.is.template && !rmodel._kwebfw_.is.cloned) {
                                throw new Error('Cannot set any value of a widget, which is either a raw template or any of its widget.');
                            } else {
                                valid = _valid.UserWidget[key].call(this, val);
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
                                    this._kwebfw_.proxy[key] = val;
                                }
                            }
                        }
                    }, false);
                });

                if(bconfig.isPreValidated) {
                    p = this._kwebfw_.prop;

                    p.frame = null;
                    p.parent = null;
                    if(p.padding === undefined) p.padding = null;
                    if(p.focusSkin === undefined) p.focusSkin = null;
                    if(p.skin === undefined) p.skin = null;
                    if(p.anchorPoint === undefined) p.anchorPoint = null;
                    if(p.backgroundColor === undefined) p.backgroundColor = null;
                    if(p.transform === undefined) p.transform = null;
                }

                if($KU.is(_postInitialization.UserWidget, 'function')) {
                    _postInitialization.UserWidget.call(this, bconfig, lconfig, pspconfig);
                }
            }

            pspconfig = lconfig = bconfig = null; //For GC
        };


        var userwidget_addGestureRecognizer = function UserWidget$addGestureRecognizer(type, options, callback) {
            this._kwebfw_.proxy.addGestureRecognizer(type, options, callback);
        };


        var userwidget_animate = function UserWidget$animate(animInstance, animConfig, animCallback) {
            this._kwebfw_.proxy.animate(animInstance, animConfig, animCallback);
        };


        var userwidget_convertPointFromWidget = function UserWidget$convertPointFromWidget(point, widget) {
            this._kwebfw_.proxy.convertPointFromWidget(point, widget);
        };


        var userwidget_convertPointToWidget = function UserWidget$convertPointToWidget(point, widget) {
            this._kwebfw_.proxy.convertPointToWidget(point, widget);
        };


        var userwidget_removeFromParent = function UserWidget$removeFromParent() {
            this._kwebfw_.proxy.removeFromParent();
        };


        var userwidget_removeGestureRecognizer = function UserWidget$removeGestureRecognizer(identifier) {
            this._kwebfw_.proxy.removeGestureRecognizer(identifier);
        };

        var userwidget_setActive = function UserWidget$setActive() {
            this._kwebfw_.proxy.setActive();
        };

        var userwidget_setEnabled = function UserWidget$setEnabled(enable) {
            this._kwebfw_.proxy.setEnabled(enable);
        };


        var userwidget_setFocus = function UserWidget$setFocus(value) {
            this._kwebfw_.proxy.setFocus(value);
        };


        var userwidget_setGestureRecognizer = function UserWidget$setGestureRecognizer(type, options, callback) {
            this._kwebfw_.proxy.setGestureRecognizer(type, options, callback);
        };


        var userwidget_setVisibility = function UserWidget$setVisibility(flag) {
            this._kwebfw_.proxy.setVisibility(flag);
        };


        $K.defVoltmxProp(UserWidget.prototype, [
            {keey:'addGestureRecognizer', value:userwidget_addGestureRecognizer},
            {keey:'animate', value:userwidget_animate},
            {keey:'convertPointFromWidget', value:userwidget_convertPointFromWidget},
            {keey:'convertPointToWidget', value:userwidget_convertPointToWidget},
            {keey:'removeFromParent', value:userwidget_removeFromParent},
            {keey:'removeGestureRecognizer', value:userwidget_removeGestureRecognizer},
            {keey:'setActive', value:userwidget_setActive},
            {keey:'setEnabled', value:userwidget_setEnabled},
            {keey:'setFocus', value:userwidget_setFocus},
            {keey:'setGestureRecognizer', value:userwidget_setGestureRecognizer},
            {keey:'setVisibility', value:userwidget_setVisibility}
        ]);


        return UserWidget;
    }())});


    /***************************************************************************
    *                                                                          *
    *                              voltmx.ui.Alert                               *
    *                          voltmx.ui.createAnimation                         *
    *                        voltmx.ui.makeAffineTransform                       *
    *                                                                          *
    ****************************************************************************/
    Object.defineProperty(voltmx.ui, 'Alert', {configurable:false, enumerable:false, writable:false, value:(function() {
        var Alert = function Alert(config, arg1, arg2) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils, ret = false,
                message = '', callback = null, type = '';

            if($KU.is(config, 'object')) {
                message = config.message;
                type = config.alerttype || config.alertType || constants.ALERT_TYPE_INFO;
                callback = config.alerthandler || config.alertHandler || null;
            } else if($KU.is(config, 'string')) {
                message = config;
                callback = arg1;
                type = arg2 || constants.ALERT_TYPE_INFO;
            }

            callback = $KU.is(callback, 'function') ? callback : null;

            if(type === constants.ALERT_TYPE_INFO
            || type === constants.ALERT_TYPE_ERROR) {
                //eslint-disable-next-line no-alert
                alert(message);
                callback && callback();
            } else if(type === constants.ALERT_TYPE_CONFIRMATION) {
                //eslint-disable-next-line no-alert
                ret = confirm(message);
                callback && callback(ret);
            }
        };


        return Alert;
    }())});


    Object.defineProperty(voltmx.ui, 'createAnimation', {configurable:false, enumerable:false, writable:false, value:(function() {
        var createAnimation = function createAnimation(animDef) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils, animator = null;

            $KU.log({api:'voltmx.ui.createAnimation', enter:true});
            animator = new $K.Animator(animDef);
            $KU.log({api:'voltmx.ui.createAnimation', exit:true});

            return animator;
        };


        return createAnimation;
    }())});


    Object.defineProperty(voltmx.ui, 'defineExtendedWidget', {configurable:false, enumerable:false, writable:false, value:function(child, parent, protoFunctionDictionary) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, ns = child, name = '', pkg = window;

        if(!(parent === voltmx.ui.Button || parent === voltmx.ui.Image2
        || parent === voltmx.ui.Label || parent === voltmx.ui.Switch
        || parent === voltmx.ui.TextArea2 || parent === voltmx.ui.TextBox2)) {
            //TODO:: Throw error - ParentClass is not supported to be inherited.
        } else {
            if(!($KU.is(child, 'string') && child)) {
                //TODO:: Throw error - Invalid argument(s) passed.
            } else {
                child = child.split('.');
                name = child.splice((child.length-1), 1)[0];
                $KU.each(child, function(val) {
                    var $K = voltmx.$kwebfw$, $KU = $K.utils;

                    if(!$KU.is(pkg[val], 'object')) {
                        pkg[val] = {};
                    }

                    pkg = pkg[val];
                });

                if($KU.is(pkg[name], 'function')) {
                    //TODO:: Throw error - Class is already defined.
                } else {
                    pkg[name] = function ExtendedWidget() {
                        this.preInitializeCall.apply(this, [].slice.call(arguments));
                    };

                    child = pkg[name];
                    $KU.inherits(child, parent);

                    $KU.each(protoFunctionDictionary, function(value, keey) {
                        child.prototype[keey] = value;
                    });

                    if($KU.is(parent.prototype.__$kwebfw$name__, 'string')
                    && parent.prototype.__$kwebfw$name__) {
                        name = parent.prototype.__$kwebfw$name__;
                    } else {
                        name = new parent({id:'kwebfw'}, {}, {});
                        name = name._kwebfw_.name;
                    }

                    $KU.defineProperty(child.prototype, '__$kwebfw$ns__', ns, null);
                    $KU.defineProperty(child.prototype, '__$kwebfw$name__', name, null);
                }
            }
        }
    }});


    Object.defineProperty(voltmx.ui, 'makeAffineTransform', {configurable:false, enumerable:false, writable:false, value:(function() {
        var makeAffineTransform = function makeAffineTransform() {
            var $K = voltmx.$kwebfw$, $KU = $K.utils, transform = null;

            $KU.log({api:'voltmx.ui.makeAffineTransform', enter:true});
            transform = new $K.Transform();
            $KU.log({api:'voltmx.ui.makeAffineTransform', exit:true});

            return transform;
        };


        return makeAffineTransform;
    }())});

    Object.defineProperty(voltmx.ui, 'renderTo', {configurable:false, enumerable:false, writable:false, value:(function() {
        var renderTo = function renderTo(model, elementRefById) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget, supportedWidget = false,
                flag = $KU.loadedFromOtherFramework(), _render = null, ele = null;

            supportedWidget = (model instanceof voltmx.ui.FlexContainer || model instanceof voltmx.ui.UserWidget);

            if(supportedWidget && flag) {
                if($KU.is(model, 'widget', 'UserWidget')) {
                    _render = model._kwebfw_.proxy._render();
                } else {
                    _render = model._render();
                }

                $KW.invokeLifeCycleEvent(model, 'preShow', false);

                $KW.registerEvents(_render);

                if(elementRefById) {
                    ele = document.getElementById(elementRefById);
                    ele.appendChild(_render);
                }

                $KW.invokeLifeCycleEvent(model, 'postShow', true);
            }
        };

        return renderTo;
    }())});
}());
