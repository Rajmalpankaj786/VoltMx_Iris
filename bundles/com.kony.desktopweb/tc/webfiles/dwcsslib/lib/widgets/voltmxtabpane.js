(function() {
    var $K = voltmx.$kwebfw$;

    $K.defVoltmxProp($K.ui, [
        {keey:'TabPane', value:{}, items:[
            {keey:'onTabClick', value:function(evt) {
                var $K = voltmx.$kwebfw$, $KW = $K.widget, $KD = $K.dom, pos = 0,
                    _ = this._kwebfw_, prop = _.prop, li = $KD.closest(evt.target, 'tabid'),
                    index = _getIndexByTabId.call(this, $KD.getAttr(li, 'tabid'));

                //Model should be marked for relayout only if the viewtype is collapsible/tabview
                if(prop.viewType !== constants.TABPANE_VIEW_TYPE_PAGEVIEW) {
                    $KW.markRelayout(this[_.tabs[index].id]);
                }

                if(prop.viewType !== constants.TABPANE_VIEW_TYPE_COLLAPSIBLEVIEW) {
                    prop.activeTabs.splice(pos, 1, index);
                } else {
                    pos = prop.activeTabs.indexOf(index);

                    if(prop.viewConfig.collapsibleViewConfig.toggleTabs === true) {
                        //If the pos is 0, it means the tab clicked is active
                        //and the tab body should be collapsed
                        if(pos === 0) {
                            prop.activeTabs = [];
                        } else {
                            prop.activeTabs = [index];
                        }
                    } else {
                        if(pos >= 0) {
                            prop.activeTabs.splice(pos, 1);
                        } else {
                            prop.activeTabs.push(index);
                        }
                    }
                }

                _handleViewReflection.call(this);
                $KW.fire(this, 'onTabClick', this, {tabIndex:index});

                return false;
            }},

            {keey:'onTabKeyDown', value:function(evt) {
                var $K = voltmx.$kwebfw$, $KD = $K.dom,
                    code = evt.keyCode || evt.which;

                if([13, 32].indexOf(code) >= 0) {
                    $KD.preventDefault(evt);

                    if(code === 13 || code === 32) { //Enter or Space
                        //TODO:: Tab switch should not happen here, rather in "onTabKeyUp"
                    }
                }

                return false;
            }},

            {keey:'onTabKeyUp', value:function(evt) {
                var $K = voltmx.$kwebfw$, $KD = $K.dom,
                    code = evt.keyCode || evt.which;

                if([13, 32].indexOf(code) >= 0) {
                    $KD.preventDefault(evt);

                    if(code === 13 || code === 32) { //Enter or Space
                        //TODO:: Tab switch should happen here
                    }
                }

                return false;
            }},

            {keey:'setupUIInteraction', value:function(/*dom, clone*/) {
                //TODO::
            }}
        ]}
    ]);


    //This function will be called in the scope of widget instance
    var _addTab = function TabPane$_addTab(tabId, tabName, tabImage, tabContainer, index, tpl) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget,
            _ = this._kwebfw_, prop = _.prop, append = false,
            disabled = _.disabled, clone = null, tab = null;

        if($KU.is(this[tabId], 'widget')) {
            throw new Error('Duplicate widget ID <'+tabId+'> encountered.\nAlready added to TabPane with id="'+this.id+'".');
        } else {
            if($KU.is(tabContainer, 'string')) {
                tabContainer = _voltmx.mvc.initializeSubViewController(tabContainer);
            }

            if($KU.is(tabContainer, 'widget', 'FlexContainer')) {
                if($KU.is(tpl, 'string') || $KU.is(tpl, 'widget', 'FlexContainer'))
                    tab = $KW.getTemplate(this, tpl);

                if($KU.is(tab, 'widget', 'FlexContainer')) {
                    //TODO:: How each tab will get their respective tabName ???
                    clone = $KU.clone(tab); //TODO:: May need a revisit
                }

                tabContainer._kwebfw_.is.tab = true;
                $KU.defineProperty(tabContainer._kwebfw_, 'tpid', _.uid, null);
                $KW.root(tabContainer, 'tab', this._kwebfw_.wap);

                if(index === _.tabs.length) append = true;
                tab = {id:tabId, image:tabImage, name:tabName, tab:clone, scroll:{x:0, y:0}};

                if(append) {
                    _.tabs.push(tab);
                } else {
                    _.tabs.splice(index, 0, tab);
                }

                this[tabId] = tabContainer;

                $KW.iterate(tabContainer, function(widget) {
                    var $K = voltmx.$kwebfw$, $KW = $K.widget, _ = widget._kwebfw_;

                    if(disabled && !_.disabled) {
                        _.disabled = true;
                        $KW.handleTabPaneEnablement(widget);
                    } else {
                        return true; //Break the loop
                    }
                }, {scope:tabContainer, tabs:false});

                if(prop.viewType === constants.TABPANE_VIEW_TYPE_COLLAPSIBLEVIEW) {
                    if(prop.activeTabs.length > 1
                    && prop.viewConfig.collapsibleViewConfig.toggleTabs === true) {
                        prop.activeTabs = [prop.activeTabs[(prop.activeTabs.length-1)]];
                    }
                } else {
                    if(prop.activeTabs.length === 0 && _.tabs.length === 1) {
                        prop.activeTabs.push(0);
                    }
                }

                _addTabToView.call(this, index);
            }
        }
    };


    //This function will be called in the scope of widget instance
    var _addTabToView = function TabPane$_addTabToView(index) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget,
            $KD = $K.dom, _ = this._kwebfw_, el = $KW.el(this), tab = null,
            comingFromRenderCall = false, tag = 'LI', holder = 'tabs';

        if(el.node && _.prop.viewType !== constants.TABPANE_VIEW_TYPE_PAGEVIEW) {
            if(_.prop.viewType !== constants.TABPANE_VIEW_TYPE_TABVIEW) {
                tag = 'DIV';
                holder = 'scrolee';
            }

            if($KU.is(index, 'integer')) {
                tab = _.tabs[index]; //Call stack is from API call
            } else if($KU.is(index, 'object')) {
                comingFromRenderCall = true;
                tab = index; //Call stack is from render call
                index = _getIndexByTabId.call(this, tab.id);
            }

            if(comingFromRenderCall || index === (_.tabs.length-1)) {
                //NOTE:: Don't switch the order of below 2 lines
                $KD.add(el[holder], _createTab.call(this, tab, tag));
                $KD.add(el.scrolee, this[tab.id]._render());
            } else {
                if(_.prop.viewType === constants.TABPANE_VIEW_TYPE_COLLAPSIBLEVIEW) {
                    index = (index * 2);
                }

                //NOTE:: Don't switch the order of below 2 lines
                $KD.addAt(el.scrolee, this[tab.id]._render(), index);
                $KD.addAt(el[holder], _createTab.call(this, tab, tag), index);
            }

            if(!comingFromRenderCall) _handleViewReflection.call(this);
        } else if(el.node && _.prop.viewType === constants.TABPANE_VIEW_TYPE_PAGEVIEW) {
            if($KU.is(index, 'integer')) {
                tab = _.tabs[index];
            } else if($KU.is(index, 'object')) {
                comingFromRenderCall = true;
                tab = index;
                index = _getIndexByTabId.call(this, tab.id);
            }

            if(comingFromRenderCall || index === (_.tabs.length-1)) {
                $KD.add(el.scrolee, this[tab.id]._render());
                $KD.add(el[holder], _createTab.call(this, tab, tag));
            } else {
                $KD.addAt(el.scrolee, this[tab.id]._render(), index);
                $KD.addAt(el[holder], _createTab.call(this, tab, tag), index);
            }

            if(!comingFromRenderCall) _handleViewReflection.call(this);
        }
    };


    //This function will be called in the scope of widget instance
    var _createTab = function TabPane$_createTab(tab, tag) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KD = $K.dom, $KW = $K.widget,
            _ = this._kwebfw_, prop = _.prop, li = null, html = '',
            tpl = null, clonetemp = null, final = null, img = null;

        //tab = {id:<tabId>, image:<tabImage>, name:<tabName>, tab:<clone>};
        li = $KD.create(tag, {tabid:tab.id});
        $KD.setAttr(li, 'kwh-click', 'onTabClick');
        $KD.setAttr(li, 'kwh-keydown', 'onTabKeyDown');
        $KD.setAttr(li, 'kwh-keyup', 'onTabKeyUp');

        if(_.prop.viewType !== constants.TABPANE_VIEW_TYPE_PAGEVIEW) {
            if($KU.is(tab.tab, 'widget', 'FlexContainer')) {
                tpl = $KW.cloneTemplate(tab.tab);
                clonetemp = tpl._render();
                final = tpl._kwebfw_.flex.final;

                if($KW.inPercent(final.width)
                && prop.viewType === constants.TABPANE_VIEW_TYPE_TABVIEW) {
                    $KD.style(li, 'width', final.width);
                    $KD.style(clonetemp, 'width', '100%');
                }

                $KD.add(li, clonetemp);
            } else {
                html += '<img loading="lazy" onmousedown="return false;"';
                if($KU.is(tab.image, 'string') && tab.image) {
                    html += (' src="'+$KU.getImageURL(tab.image)+'"');
                } else {
                    html += ' style="display:none;"';
                }
                html += '/>';

                html += '<label style="width:100%">'+tab.name+'</label>';

                //create div, add tab image and tab name
                html = '<div style="padding:3px 7px; display:flex; width:100%; align-self:center">' + html + '</div>';

                html += '<img loading="lazy" onmousedown="return false;" src="" />';

                if(prop.viewType === constants.TABPANE_VIEW_TYPE_COLLAPSIBLEVIEW) {
                    $KD.style(li, 'display', 'flex');
                }

                $KD.html(li, html);
            }
        } else if(_.prop.viewType === constants.TABPANE_VIEW_TYPE_PAGEVIEW) {
            $KD.style(li, {paddingLeft: '4px', display: 'inline-block'});

            img = $KD.create('IMG', {onmousedown:'return false;'});

            $KD.setAttr(img, 'src', $KU.getImageURL(prop.viewConfig.pageViewConfig.pageOffDotImage));
            $KD.setAttr(img, 'alt', '');
            $KD.setAttr(img, 'index', _getIndexByTabId.call(this, tab.id));

            $KD.add(li, img);
        }

        return li;
    };


    //All widget file must have this variable
    //All the functions will be called in the scope of widget instance
    var _dependentPropertiesValidationMessage = {};


    //This function will be called in the scope of widget instance
    var _flushTabs = function TabPane$_flushTabs(tabs, keepHierarchy) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils;

        if($KU.is(tabs, 'array')) {
            $KU.each(tabs, function(tab) {
                if(this[tab.id] && this[tab.id]._kwebfw_.is.tab
                && this[tab.id] instanceof voltmx.ui.FlexContainer) {
                    _removeWidgetHierarchy.call(this, this[tab.id], this, keepHierarchy);

                    if(tab.tab) {
                        _removeWidgetHierarchy.call(this, tab.tab, this, keepHierarchy);
                    }
                }
            }, this);
        }
    };


    //This function will be called in the scope of widget instance
    var _getIndexByTabId = function TabPane$_getIndexByTabId(tabId) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, _ = this._kwebfw_, index = -1;

        $KU.each(_.tabs, function(tab, pos) {
            if(tab.id === tabId) {
                index = pos;
                return true;
            }
        });

        return index;
    };


    //All widget file must have this variable
    //All the functions will be called in the scope of widget instance
    var _getter = {
        TabPane: {
            activeTabs: function TabPane$_getter_activeTabs(value) {
                var _ = this._kwebfw_;

                if(_.activeTabs) {
                    return _.activeTabs.slice(0);
                }
                return value.slice(0);
            },

            viewConfig: function TabPane$_getter_viewConfig(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils;

                return $KU.clone(value);
            }
        }
    };


    //All the functions will be called in the scope of widget instance
    var _handleViewReflection = function TabPane$_handleViewReflection() {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KD = $K.dom, $KW = $K.widget,
            _ = this._kwebfw_, el = $KW.el(this), prop = _.prop;

        if(prop.viewType === constants.TABPANE_VIEW_TYPE_PAGEVIEW) {
            //when the view is pageview, then the scrolee width should be 100 * no.of.tabs
            $KD.style(el.scrolee, {'width': (100 * (_.tabs.length))+'%'});
        } else {
            $KD.style(el.scrolee, {'width': '100%'});
        }

        $KU.each(_.tabs, function(tab, index) {
            var $K = voltmx.$kwebfw$, $KW = $K.widget, $KD = $K.dom,
                _ = this._kwebfw_, prop = _.prop, el = $KW.el(this),
                config = null, li = null, src = '', value = 0;

            if(prop.viewType === constants.TABPANE_VIEW_TYPE_COLLAPSIBLEVIEW) {
                li = $KD.childAt(el.scrolee, (index*2));
                $KD.style(li, {display:'flex', flexDirection: 'row'});

                if(prop.viewConfig && prop.viewConfig.collapsibleViewConfig) {
                    config = prop.viewConfig.collapsibleViewConfig;
                }

                if(config && !(tab.tab)) {
                    if(config.imagePosition === constants.TABPANE_COLLAPSIBLE_IMAGE_POSITION_LEFT) {
                        $KD.style(li, 'flexDirection', 'row-reverse');
                    }

                    //get the first div inside the li, and then align the text of the label
                    if(config.tabNameAlignment === constants.TABPANE_COLLAPSIBLE_TABNAME_ALIGNMENT_RIGHT) {
                        $KD.style($KD.childAt($KD.first(li), 1), 'text-align', 'right');
                    } else if(config.tabNameAlignment === constants.TABPANE_COLLAPSIBLE_TABNAME_ALIGNMENT_CENTER) {
                        $KD.style($KD.childAt($KD.first(li), 1), 'text-align', 'center');
                    } else {
                        $KD.style($KD.childAt($KD.first(li), 1), 'text-align', 'left');
                    }
                }
            } else if(prop.viewType === constants.TABPANE_VIEW_TYPE_PAGEVIEW) {
                li = $KD.childAt(el.tabs, index);
            } else if(prop.viewType === constants.TABPANE_VIEW_TYPE_TABVIEW) {
                li = $KD.childAt(el.tabs, index);

                $KD.style(li, {display:'flex', flexDirection: 'row'});
                if(prop.viewConfig && prop.viewConfig.tabViewConfig) {
                    config = prop.viewConfig.tabViewConfig;

                    if(config.headerContainerWeight) {
                        if(config.headerPosition === constants.TAB_HEADER_POSITION_TOP
                        || config.headerPosition === constants.TAB_HEADER_POSITION_BOTTOM) {
                            $KD.style(li, 'width', config.headerContainerWeight + '%');
                        } else {
                            $KD.style(li, 'width', '100%');
                        }
                    }
                }
            }

            if(li && prop.viewType !== constants.TABPANE_VIEW_TYPE_PAGEVIEW) {
                if(prop.activeTabs.indexOf(index) >= 0) {
                    if(_.inited[tab.id] !== true) {
                        _.inited[tab.id] = true;
                        $KW.fire(this[tab.id], 'onInit', this[tab.id]);
                    }

                    $KD.removeCls(li, prop.inactiveSkin);
                    $KD.addCls(li, prop.activeSkin);
                    $KD.removeAttr(this[tab.id]._kwebfw_.view, 'hidden');

                    if(config && config.expandedImage
                    && prop.viewType === constants.TABPANE_VIEW_TYPE_COLLAPSIBLEVIEW) {
                        src = config.expandedImage;
                    }
                } else {
                    $KD.removeCls(li, prop.activeSkin);
                    $KD.addCls(li, prop.inactiveSkin);
                    $KD.setAttr(this[tab.id]._kwebfw_.view, 'hidden', true);

                    if(config && config.collapsedImage
                    && prop.viewType === constants.TABPANE_VIEW_TYPE_COLLAPSIBLEVIEW) {
                        src = config.collapsedImage;
                    }
                }

                if(src) {
                    $KD.setAttr($KD.last(li), 'src', $KU.getImageURL(src));
                    $KD.style($KD.last(li), 'display', null);
                } else if(prop.viewType === constants.TABPANE_VIEW_TYPE_COLLAPSIBLEVIEW) {
                    if(!config.collapsedImage || !config.expandedImage) {
                        $KD.removeAttr($KD.last(li), 'src');
                    }
                } else if(prop.viewType === constants.TABPANE_VIEW_TYPE_TABVIEW) {
                    $KD.removeAttr($KD.last(li), 'src');
                }
            } else if(li && prop.viewType === constants.TABPANE_VIEW_TYPE_PAGEVIEW) {
                if(prop.activeTabs.indexOf(index) >= 0) {
                    if(_.inited[tab.id] !== true) {
                        _.inited[tab.id] = true;
                        $KW.fire(this[tab.id], 'onInit', this[tab.id]);
                    }

                    //the value for translate left to the view port
                    value = -(index * (100/(_.tabs.length)));

                    //Adding style to view port for transition with calculated value
                    $KD.style(el.scrolee, 'transition', 'transform 0.5s ease 0s');
                    $KD.style(el.scrolee, 'transform', 'translate3d(' + value + '%, 0, 0)');

                    $KD.setAttr($KD.last(li), 'src', $KU.getImageURL(prop.viewConfig.pageViewConfig.pageOnDotImage));
                } else {
                    $KD.setAttr($KD.last(li), 'src', $KU.getImageURL(prop.viewConfig.pageViewConfig.pageOffDotImage));
                }
            }
        }, this);
    };

    //This function will be called on swipe of Tabpane page view (Left swipe)
    var _nextPage = function TabPane$_nextPage() {
        var currentPage = 0, _ = this._kwebfw_, prop = _.prop, noOfPages = (_.tabs.length) - 1,
            nextPage = prop.activeTabs[0] + 1;

        if(nextPage > noOfPages) {
            currentPage = noOfPages;
        } else {
            currentPage = nextPage;
        }

        this.activeTabs = [currentPage];
    };

    //All the functions will be called in the scope of widget instance
    var _normalizeActiveTabs = function TabPane$_normalizeActiveTabs() {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, _ = this._kwebfw_, prop = _.prop;

        if(_.activeTabs) {
            prop.activeTabs = [];

            $KU.each(_.activeTabs, function(tabIndex) {
                var _ = this._kwebfw_, prop = _.prop;

                if(tabIndex >= 0 && tabIndex < _.tabs.length) {
                    prop.activeTabs.push(tabIndex);
                }
            }, this);

            if(prop.activeTabs.length > 1
            && (prop.viewType !== constants.TABPANE_VIEW_TYPE_COLLAPSIBLEVIEW
            || prop.viewConfig.collapsibleViewConfig.toggleTabs === true)) {
                prop.activeTabs = [prop.activeTabs[0]];
            } else if(!prop.activeTabs.length && _.tabs.length
            && prop.viewType !== constants.TABPANE_VIEW_TYPE_COLLAPSIBLEVIEW) {
                prop.activeTabs = [0];
            }

            delete _.activeTabs;
        }
    };

    var _normalizeViewConfig = function TabPane$_normalizeViewConfig() {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, _ = this._kwebfw_, prop = _.prop;

        if(prop.viewConfig.tabViewConfig) {
            if(!($KU.is(prop.viewConfig.tabViewConfig.image1, 'string'))) {
                prop.viewConfig.tabViewConfig.image1 = 'arrow-left.png';
            }

            if(!($KU.is(prop.viewConfig.tabViewConfig.image2, 'string'))) {
                prop.viewConfig.tabViewConfig.image2 = 'arrow-right.png';
            }
        } else {
            prop.viewConfig.tabViewConfig = {
                headerPosition: constants.TAB_HEADER_POSITION_TOP,
                image1: 'arrow-left.png',
                image2: 'arrow-right.png'
            };
        }

        if(prop.viewConfig.pageViewConfig) {
            if($KU.is(prop.viewConfig.pageViewConfig.needPageIndicator, 'boolean')) {
                prop.viewConfig.pageViewConfig.needPageIndicator = true;
            }

            if(prop.viewConfig.pageViewConfig.needPageIndicator) {
                if(!($KU.is(prop.viewConfig.pageViewConfig.pageOnDotImage, 'string'))) {
                    prop.viewConfig.pageViewConfig.pageOnDotImage = 'pageondot.png';
                }
                if(!($KU.is(prop.viewConfig.pageViewConfig.pageOffDotImage, 'string'))) {
                    prop.viewConfig.pageViewConfig.pageOffDotImage = 'pageoffdot.png';
                }
            }
        } else {
            prop.viewConfig.pageViewConfig = {
                needPageIndicator: true,
                pageOffDotImage: 'pageoffdot.png',
                pageOnDotImage: 'pageondot.png'
            };
        }

        if(!prop.viewConfig.collapsibleViewConfig) {
            prop.viewConfig.collapsibleViewConfig = {
                imagePosition: constants.TABPANE_COLLAPSIBLE_IMAGE_POSITION_RIGHT,
                tabNameAlignment: constants.TABPANE_COLLAPSIBLE_TABNAME_ALIGNMENT_LEFT,
                toggleTabs: false
            };
        }
    };


    //All widget file must have this variable
    //This functions will be called in the scope of widget instance
    var _populateUnderscore = {
        TabPane: function TabPane$_populateUnderscore() {
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
                    $KU.defineProperty(_, 'ns', 'voltmx.ui.TabPane', null);
                }
            }
            if(!_.name) {
                if($KU.is(this.__$kwebfw$name__, 'string') && this.__$kwebfw$name__) {
                    $KU.defineProperty(_, 'name', this.__$kwebfw$name__, null);
                } else {
                    $KU.defineProperty(_, 'name', 'TabPane', null);
                }
            }

            if(!_.tabs) $KU.defineProperty(_, 'tabs', [], null);
            if(!_.inited) $KU.defineProperty(_, 'inited', {}, null);

            //This holds the templateControllers used in this TabPane tabHeaderTemplate
            if(!_.templates) $KU.defineProperty(_, 'templates', {}, null);
        }
    };


    //All widget file must have this variable
    //This function will be called in the scope of widget instance
    var _postInitialization = {
        TabPane: function TabPane$_postInitialization() {
            var $K = voltmx.$kwebfw$, $KU = $K.utils,
                _ = this._kwebfw_, prop = _.prop;

            if(prop.activeTabs.length) {
                _.activeTabs = prop.activeTabs.slice(0);
                prop.activeTabs = [];
            }

            if($KU.is(prop.padding, 'null')) {
                prop.padding = [0, 0, 0, 0];
            }

            _normalizeViewConfig.call(this);
        }
    };

    //This function will be called on swipe of Tabpane page view (Right swipe)
    var _previousPage = function TabPane$_previousPage() {
        var currentPage = 0, _ = this._kwebfw_, prop = _.prop,
            prevPage = prop.activeTabs[0] - 1;

        if(prevPage > 0) {
            currentPage = prevPage;
        }

        this.activeTabs = [currentPage];
    };

    //Registers swipe gesture for tabpane page view and handles the same
    var _registerSwipeGesture = function TabPane$_registerSwipeGesture(scrolee) {
        var $K = voltmx.$kwebfw$, $KD = $K.dom;

        $KD.on(scrolee, 'swipe', 'TabPane', function(g) {
            var $K = voltmx.$kwebfw$, $KD = $K.dom, $KW = $K.widget,
                _ = this._kwebfw_, distance = 0, el = $KW.el(this), pageWidth = 0,
                prop = _.prop;

            if(g.status === 'started') {
                $KD.style(el.scrolee, 'transition', null);
            }

            if(g.status === 'moving') {
                pageWidth = $KD.first(el.scrolee).offsetWidth;
                distance = -(pageWidth * prop.activeTabs[0]) + g.distance.x;
                $KD.style(el.scrolee, 'transform', 'translate3d(' + distance + 'px, 0, 0)');
            }

            if(g.status === 'ended') {
                if(g.distance.x <= -7) {
                    _nextPage.call(this, el, _.swipeContext);
                    $KW.fire(this, 'onTabClick', this, {tabIndex:prop.activeTabs[0]});
                } else if(g.distance.x >= 7) {
                    _previousPage.call(this, el, _.swipeContext);
                    $KW.fire(this, 'onTabClick', this, {tabIndex:prop.activeTabs[0]});
                } else {
                    pageWidth = $KD.first(el.scrolee).offsetWidth;
                    distance = -(pageWidth * prop.activeTabs[0]) + g.distance.x;
                    $KD.style(el.scrolee, 'transform', 'translate3d(' + distance + 'px, 0, 0)');
                }
            }
        }, {scope:this});
    };

    //All widget file must have this variable
    //This functions will be called in the scope of widget instance
    var _relayoutActiveTriggerer = {
        TabPane: function TabPane$_relayoutActiveTriggerer() {
            return [];
        }
    };


    //All widget file must have this variable
    //This functions will be called in the scope of widget instance
    var _relayoutPassiveTriggerer = {
        TabPane: function TabPane$_relayoutPassiveTriggerer() {
            return [];
        }
    };


    //This function will be called in the scope of widget instance
    var _removeTab = function TabPane$_removeTab(index) {
        var _ = this._kwebfw_, tabid = _.tabs[index].id,
            prop = _.prop, pos = prop.activeTabs.indexOf(index);

        _removeTabFromView.call(this, index);

        delete _.inited[tabid];
        _flushTabs.call(this, [_.tabs[index]]);
        _.tabs.splice(index, 1);

        if(pos >= 0) {
            prop.activeTabs.splice(pos, 1);

            if(prop.viewType !== constants.TABPANE_VIEW_TYPE_COLLAPSIBLEVIEW) {
                if(!_.tabs[index]) { //Choose previous tab
                    index = ((_.tabs.length) ? (_.tabs.length-1) : -1);
                } //else same index points to next tab

                if(index !== -1) {
                    this.activeTabs = [index];
                }
            }
        } else {
            // if the deleted index is not an active tab and less than active index,
            // then the active tab index should be reduced by one
            if(prop.viewType !== constants.TABPANE_VIEW_TYPE_COLLAPSIBLEVIEW) {
                if(index < prop.activeTabs[0]) {
                    prop.activeTabs = [prop.activeTabs[0] - 1];
                }

                //if the view type is page view then the view port width should be updated for every removal
                if(prop.viewType === constants.TABPANE_VIEW_TYPE_PAGEVIEW) {
                    _handleViewReflection.call(this);
                }
            }
        }
    };


    //This function will be called in the scope of widget instance
    var _removeTabFromView = function TabPane$_removeTabFromView(index) {
        var $K = voltmx.$kwebfw$, $KW = $K.widget, $KD = $K.dom, tab = null,
            _ = this._kwebfw_, prop = _.prop, el = $KW.el(this), li = null;

        if(prop.viewType === constants.TABPANE_VIEW_TYPE_COLLAPSIBLEVIEW) {
            li = $KD.childAt(el.scrolee, (index*2));
        } else if(prop.viewType === constants.TABPANE_VIEW_TYPE_PAGEVIEW) {
            li = $KD.childAt(el.tabs, index);
        } else if(prop.viewType === constants.TABPANE_VIEW_TYPE_TABVIEW) {
            li = $KD.childAt(el.tabs, index);
        }

        $KD.remove(li);
        tab = this[_.tabs[index].id];
        $KD.remove(tab._kwebfw_.view);
    };

    //This function must be called in the scope of widget instance
    //This function has to be moved to voltmxui
    var _removeWidgetHierarchy = function UI$_removeWidgetHierarchy(cmodel, rmodel, keepHierarchy) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget;

        if($KU.is(rmodel, 'widget')) {
            $KW.iterate(cmodel, function(widget) {
                widget._flush();

                if(keepHierarchy !== true) {
                    delete rmodel[widget.id];
                }
            }, {scope:this, tabs:false});
        }
    };


    //All widget file must have this variable
    //All the functions will be called in the scope of widget instance
    var _setter = {
        TabPane: {
            activeTabs: function TabPane$_setter_activeTabs(old) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils,
                    $KW = $K.widget, _ = this._kwebfw_, prop = _.prop;

                //Model should be marked for relayout only if the viewtype is collapsible/tabview
                if(prop.viewType !== constants.TABPANE_VIEW_TYPE_PAGEVIEW) {
                    //Active tabs should be marked for relayout, when activeTabs Property is triggered
                    $KU.each(prop.activeTabs, function(tab) {
                        // if the current tab is not a active tab already, then mark for relayout
                        if(old.indexOf(tab) === -1) {
                            _.tabs[tab] && $KW.markRelayout(this[_.tabs[tab].id]);
                        }
                    }, this);
                }
            },

            viewType: function TabPane$_setter_viewType(old) {
                if(this.viewType !== old) {
                    _normalizeViewConfig.call(this);
                }
            }
        }
    };

    //All widget file must have this variable
    //All the functions will be called in the scope of widget instance
    //These function should always return a boolean value
    var _valid = {
        TabPane: {
            activeFocusSkin: function TabPane$_valid_activeFocusSkin(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'object')
                || ($KU.is(value, 'string') && value.split(' ').length === 1)) {
                    flag = true;
                }

                return flag;
            },

            activeSkin: function TabPane$_valid_activeSkin(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'object')
                || ($KU.is(value, 'string') && value.split(' ').length === 1)) {
                    flag = true;
                }

                return flag;
            },

            activeTabs: function TabPane$_valid_activeTabs(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false,
                    _ = this._kwebfw_, prop = _.prop;

                if($KU.is(value, 'array')) {
                    flag = true;

                    if(prop.viewType !== constants.TABPANE_VIEW_TYPE_COLLAPSIBLEVIEW
                    || prop.viewConfig.collapsibleViewConfig.toggleTabs === true) {
                        if(value.length > 1) {
                            flag = false;
                        }
                    }
                }

                return flag;
            },

            inactiveSkin: function TabPane$_valid_inactiveSkin(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'object')
                || ($KU.is(value, 'string') && value.split(' ').length === 1)) {
                    flag = true;
                }

                return flag;
            },

            onTabClick: function TabPane$_valid_onTabClick(value) {
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

            retainPositionInTab: function TabPane$_valid_retainPositionInTab(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'boolean')) {
                    flag = true;
                }

                return flag;
            },

            tabHeaderHeight: function TabPane$_valid_tabHeaderHeight(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'integer') && value >= 0) {
                    flag = true;
                }

                return flag;
            },

            tabHeaderTemplate: function TabPane$_valid_tabHeaderTemplate(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'widget', 'FlexContainer')
                || $KU.is(value, 'null') || $KU.is(value, 'string')) {
                    flag = true;
                }

                return flag;
            },

            viewConfig: function TabPane$_valid_viewConfig(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'null')) {
                    flag = true;
                } else if($KU.is(value, 'object')) {
                    if($KU.is(value.collapsibleViewConfig, 'object')
                    || $KU.is(value.pageViewConfig, 'object')
                    || $KU.is(value.tabViewConfig, 'object')) {
                        flag = true;
                    }
                }

                return flag;
            },

            viewType: function TabPane$_valid_viewType(value) {
                var flag = false, options = [
                    constants.TABPANE_VIEW_TYPE_COLLAPSIBLEVIEW,
                    constants.TABPANE_VIEW_TYPE_PAGEVIEW,
                    constants.TABPANE_VIEW_TYPE_TABVIEW
                ];

                if(options.indexOf(value) >= 0) {
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
        TabPane: {
            activeFocusSkin: function TabPane$_view_activeFocusSkin(/*el, old*/) {
                _handleViewReflection.call(this);
            },

            activeSkin: function TabPane$_view_activeSkin(/*el, old*/) {
                _handleViewReflection.call(this);
            },

            activeTabs: function TabPane$_view_activeTabs(/*el, old*/) {
                _handleViewReflection.call(this);
            },

            inactiveSkin: function TabPane$_view_inactiveSkin(/*el, old*/) {
                _handleViewReflection.call(this);
            },

            onTabClick: true,

            retainPositionInTab: true,

            tabHeaderHeight: function TabPane$_view_tabHeaderHeight(/*el, old*/) {

                //TODO::
            },

            tabHeaderTemplate: function TabPane$_view_tabHeaderTemplate(/*el, old*/) {
                
                //TODO::
            },

            viewConfig: function TabPane$_view_viewConfig(el, old) {
                var $K = voltmx.$kwebfw$, $KD = $K.dom, $KU = $K.utils, li = null,
                    _ = this._kwebfw_, prop = _.prop, config = null, tabHeaderWeight = '';

                _normalizeViewConfig.call(this);

                if(prop.viewType === constants.TABPANE_VIEW_TYPE_COLLAPSIBLEVIEW) {
                    if(prop.viewConfig && prop.viewConfig.collapsibleViewConfig) {
                        config = prop.viewConfig.collapsibleViewConfig;
                    }

                    if(config) {
                        if(config.toggleTabs === true && prop.activeTabs.length > 1) {
                            prop.activeTabs = [prop.activeTabs[(prop.activeTabs.length-1)]];
                        }
                    }

                    if(prop.viewConfig !== old) _handleViewReflection.call(this);
                } else if(prop.viewType === constants.TABPANE_VIEW_TYPE_PAGEVIEW) {
                    if(prop.viewConfig && prop.viewConfig.pageViewConfig) {
                        config = prop.viewConfig.pageViewConfig;
                    }

                    //TODO::
                } else if(prop.viewType === constants.TABPANE_VIEW_TYPE_TABVIEW) {
                    if(prop.viewConfig && prop.viewConfig.tabViewConfig) {
                        config = prop.viewConfig.tabViewConfig;
                    }

                    if(config) {
                        if(config.headerPosition === constants.TAB_HEADER_POSITION_TOP) {
                            $KD.style(el.wrapper, 'flexDirection', 'column');
                            $KD.style(el.tabs, 'flexDirection', 'row');
                        } else if(config.headerPosition === constants.TAB_HEADER_POSITION_BOTTOM) {
                            $KD.style(el.wrapper, 'flexDirection', 'column-reverse');
                            $KD.style(el.tabs, 'flexDirection', 'row');
                        } else if(config.headerPosition === constants.TAB_HEADER_POSITION_LEFT) {
                            $KD.style(el.wrapper, 'flexDirection', 'row');
                            $KD.style(el.tabs, 'flexDirection', 'column');
                        } else if(config.headerPosition === constants.TAB_HEADER_POSITION_RIGHT) {
                            $KD.style(el.wrapper, 'flexDirection', 'row-reverse');
                            $KD.style(el.tabs, 'flexDirection', 'column');
                        }

                        if($KU.is(config.headerContainerWeight, 'number')) {
                            tabHeaderWeight = config.headerContainerWeight + '%';
                        }

                        if(config.headerPosition === constants.TAB_HEADER_POSITION_TOP
                        || config.headerPosition === constants.TAB_HEADER_POSITION_BOTTOM) {
                            $KD.style(el.tabs, 'width', '100%');
                        } else if(tabHeaderWeight) {
                            $KD.style(el.tabs, 'width', tabHeaderWeight);
                        }

                        $KU.each(_.tabs, function(tab, index) {
                            li = $KD.childAt(el.tabs, index);

                            if(config.headerPosition === constants.TAB_HEADER_POSITION_TOP
                            || config.headerPosition === constants.TAB_HEADER_POSITION_BOTTOM) {
                                $KD.style(li, 'width', tabHeaderWeight);
                            } else {
                                $KD.style(li, 'width', '100%');
                            }
                        });
                    }
                }
            },

            viewType: function TabPane$_view_viewType(el, old) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils,
                    $KD = $K.dom, _ = this._kwebfw_, prop = _.prop;

                if(prop.viewType !== constants.TABPANE_VIEW_TYPE_TABVIEW && prop.viewType !== constants.TABPANE_VIEW_TYPE_PAGEVIEW) {
                    $KD.setAttr(el.tabs, 'hidden', true);
                } else {
                    $KD.removeAttr(el.tabs, 'hidden');
                }

                if(prop.viewType !== old) {
                    //updating kv to the current view type
                    $KD.setAttr(el.node, 'kv', prop.viewType);

                    if(old === constants.TABPANE_VIEW_TYPE_TABVIEW) {
                        $KU.each(_.tabs, function(tab, index) {
                            var $K = voltmx.$kwebfw$, $KD = $K.dom, a = 0, alen = 0,
                                div = $KD.create('DIV'), li = $KD.first(el.tabs),
                                html = li.innerHTML, name = '', value = '';

                            alen = li.attributes.length;
                            for(a=0; a<alen; a++) {
                                name = li.attributes[a].name;
                                value = li.attributes[a].value;
                                $KD.setAttr(div, name, value);
                            }

                            $KD.style(div, 'width', '');
                            $KD.html(div, html);
                            $KD.remove(li);
                            $KD.addAt(el.scrolee, div, (index*2));
                        }, this);

                        if(!_.tabs.length && prop.activeTabs.length) {
                            prop.activeTabs = [];
                        }
                    } else {
                        $KU.each(_.tabs, function(tab, index) {
                            var $K = voltmx.$kwebfw$, $KD = $K.dom, a = 0,
                                li = $KD.create('LI'), alen = 0,
                                div = $KD.childAt(el.scrolee, index),
                                html = div.innerHTML, name = '', value = '';

                            alen = div.attributes.length;
                            for(a=0; a<alen; a++) {
                                name = div.attributes[a].name;
                                value = div.attributes[a].value;
                                $KD.setAttr(li, name, value);
                            }

                            $KD.html(li, html);
                            $KD.remove(div);
                            $KD.add(el.tabs, li);
                        }, this);

                        if(old === constants.TABPANE_VIEW_TYPE_COLLAPSIBLEVIEW) {
                            if(!_.tabs.length) {
                                if(prop.activeTabs.length) {
                                    prop.activeTabs = [];
                                }
                            } else {
                                if(!prop.activeTabs.length) {
                                    prop.activeTabs = [0];
                                } else if(prop.activeTabs.length > 1) {
                                    prop.activeTabs = [prop.activeTabs[(prop.activeTabs.length-1)]];
                                }
                            }
                        } else if(old === constants.TABPANE_VIEW_TYPE_PAGEVIEW) {
                            //TODO:: prop.activeTabs
                        }
                    }

                    _handleViewReflection.call(this);
                }
            }
        }
    };


    Object.defineProperty(voltmx.ui, 'TabPane', {configurable:false, enumerable:false, writable:false, value:(function() {
        var $K = voltmx.$kwebfw$;


        /**
         * voltmx.ui.TabPane constructor.
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
        var TabPane = function TabPane(bconfig, lconfig, pspconfig) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils, self = this,
                dependentPropertiesValidationMessage = '', prop = null;

            if(!$KU.is(bconfig, 'object')) bconfig = {};

            if(!bconfig.isPreValidated) {
                prop = {
                    activeFocusSkin: 'tabCanvas',
                    activeSkin: 'tabCanvas',
                    activeTabs: [0],
                    inactiveSkin: 'tabCanvasInactive',
                    onTabClick: null,
                    retainPositionInTab: false,
                    tabHeaderHeight: 64, //Might be there
                    tabHeaderTemplate: null, //Allowed widgets are, Label, Link, Richtext, Button and Image
                    viewConfig: {
                        tabViewConfig: {
                            headerPosition: constants.TAB_HEADER_POSITION_TOP
                        },
                        pageViewConfig: {
                            needPageIndicator: true,
                            pageOffDotImage: 'blackdot.gif',
                            pageOnDotImage: 'whitedot.gif'
                        },
                        collapsibleViewConfig: {
                            collapsedImage: '', expandedImage: '', toggleTabs: false,
                            imagePosition: constants.TABPANE_COLLAPSIBLE_IMAGE_POSITION_RIGHT,
                            tabNameAlignment: constants.TABPANE_COLLAPSIBLE_TABNAME_ALIGNMENT_LEFT
                        }
                    },
                    viewType: constants.TABPANE_VIEW_TYPE_TABVIEW
                };
            }

            _populateUnderscore.TabPane.call(this);

            if(!$KU.is(bconfig.id, 'string') || !bconfig.id) {
                bconfig.id = (this._kwebfw_.name + $KU.uid());
            }

            TabPane.base.call(this, bconfig, lconfig, pspconfig);

            if(!bconfig.isPreValidated) {
                if($KU.is(_dependentPropertiesValidationMessage.TabPane, 'function')) {
                    dependentPropertiesValidationMessage = _dependentPropertiesValidationMessage.TabPane.call(this, prop, bconfig, lconfig, pspconfig);
                }
            }

            if(dependentPropertiesValidationMessage) {
                throw new Error(dependentPropertiesValidationMessage);
            } else {
                if(!bconfig.isPreValidated) {
                    //Defaulting to platfom values specific to TabPane
                    $KU.each(prop, function(value, key) {
                        var $K = voltmx.$kwebfw$, $KU = $K.utils,
                            $KW = $K.widget, valid = false, message = '';

                        if(!Object.prototype.hasOwnProperty.call(bconfig, key)) {
                            bconfig[key] = value;
                        } else if($KW.getNonConstructorProperties(self._kwebfw_.name).indexOf(key) >= 0) {
                            throw new Error('<' + key + '> is a non-constructor property of <' + self._kwebfw_.ns + '> class.');
                        } else if(!$KU.is(_valid.TabPane[key], 'function')) {
                            throw new Error('<' + key + '> is available in default widget properties of <voltmx.ui.TabPane>, but not in <_valid.TabPane> namespace.');
                        } else {
                            valid = _valid.TabPane[key].call(self, bconfig[key]);
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

                //Defining Getters/Setters specific to TabPane
                $KU.each(_view.TabPane, function(value, key) {
                    var $K = voltmx.$kwebfw$, $KU = $K.utils;

                    $KU.defineProperty(self._kwebfw_.prop, key, bconfig[key], {configurable:false, enumerable:true, writable:true});

                    $KU.defineGetter(self, key, function TabPane$_getter() {
                        var $K = voltmx.$kwebfw$, $KU = $K.utils;

                        if($KU.is(_getter.TabPane[key], 'function')) {
                            return _getter.TabPane[key].call(this, this._kwebfw_.prop[key]);
                        }
                        return this._kwebfw_.prop[key];
                    }, true);

                    $KU.defineSetter(self, key, function TabPane$_setter(val) {
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
                                valid = _valid.TabPane[key].call(this, val);
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

                                    if($KU.is(_setter.TabPane[key], 'function')) {
                                        _setter.TabPane[key].call(this, old);
                                    }

                                    if(_relayoutActiveTriggerer.TabPane().indexOf(key) >= 0) {
                                        $KW.markRelayout(this);
                                    }

                                    if(_relayoutPassiveTriggerer.TabPane().indexOf(key) >= 0) {
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

                if($KU.is(_postInitialization.TabPane, 'function')) {
                    _postInitialization.TabPane.call(this);
                }
            }


            pspconfig = lconfig = bconfig = null; //For GC
        };


        $K.utils.inherits(TabPane, voltmx.ui.BasicWidget);


        /**
         * Takes care of flushing out the widget reference to clean memory.
         *
         * @access      protected
         * @method      _flush
         * @memberof    voltmx.ui.TabPane
         * @author      Goutam Sahu <goutam.sahu@voltmx.com>
         *
         * @returns     void
         */
        var tabpane__flush = function TabPane$_flush() {
            var $super = voltmx.ui.TabPane.base.prototype;

            _flushTabs.call(this, this._kwebfw_.tabs, true);
            $super._flush.call(this);
        };


        /**
         * Builds the view layer for voltmx.ui.TabPane widget.
         *
         * @override
         * @access      protected
         * @method      _render
         * @memberof    voltmx.ui.TabPane
         * @author      Goutam Sahu <goutam.sahu@voltmx.com>
         *
         * @returns     {HTMLElement} – TabPane view.
         */
        var tabpane__render = function TabPane$_render(tag) {
            var $super = voltmx.ui.TabPane.base.prototype, _ = this._kwebfw_,
                $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget, $KD = $K.dom,
                view = _.view, wrapper = null, tabs = null, viewport = null,
                scrolee = null, hScroll = null, vScroll = null, el = $KW.el(view);

            if(this.isVisible || $K.F.RIVW) {
                if(!view) {
                    wrapper = $KD.create('DIV', {kr:'wrapper'});
                    tabs = $KD.create('UL', {kr:'tabs'});
                    //tabs.innerHTML = '<li>abc-01</li><li>abc-02</li><li>abc-03</li><li>abc-04</li><li>abc-05</li><li>abc-06</li><li>abc-07</li><li>abc-08</li><li>abc-09</li><li>abc-10</li><li>abc-11</li><li>abc-12</li><li>abc-13</li><li>abc-14</li><li>abc-15</li><li>abc-16</li><li>abc-17</li><li>abc-18</li><li>abc-19</li><li>abc-20</li>';
                    viewport = $KD.create('DIV', {kr:'viewport'});
                    if(_.prop.viewType === constants.TABPANE_VIEW_TYPE_PAGEVIEW) {
                        $KD.style(tabs, {display:'table', margin: '0 auto'});
                        $KD.style(viewport, {display:'flex', overflowX : 'hidden', overflowY : 'auto'});

                        //To Do .. need to handle this in toggle view
                        $KD.style(wrapper, {overflowX : 'hidden', overflowY : 'hidden'});

                        $KD.add(wrapper, viewport);
                        $KD.add(wrapper, tabs); // Added tabs after viewport to have the page dots at the bottom
                    } else {
                        $KD.add(wrapper, tabs);
                        $KD.add(wrapper, viewport);
                    }

                    if($KU.scrollType() !== 'native') {
                        $KD.style(viewport, {overflowX:'hidden', overflowY:'hidden'});

                        scrolee = $KD.create('DIV', {kr:'scrolee'});
                        hScroll = $KD.create('DIV', {kr:'h-scroll'}, {display:'none'});
                        vScroll = $KD.create('DIV', {kr:'v-scroll'}, {display:'none'});

                        $KD.add(viewport, scrolee);
                        $KD.add(viewport, hScroll);
                        $KD.add(viewport, vScroll);
                    }

                    view = $super._render.call(this, tag, [wrapper]);
                    $KD.setAttr(view, 'kv', _.prop.viewType);

                    el = $KW.el(view);

                    $KU.each(_.tabs, function(tab/*, index*/) {
                        _addTabToView.call(this, tab);
                    }, this);

                    _normalizeActiveTabs.call(this);
                }

                _view[_.name].tabHeaderHeight.call(this, el, _.prop.tabHeaderHeight);
                _view[_.name].viewType.call(this, el, _.prop.viewType);
                _view[_.name].viewConfig.call(this, el, _.prop.viewConfig);

                //TODO:: $KW.accessibility(this);

                //TODO:: This IF/ELSE block should move to flex engine
                if($KW.isFixedHeight(this)) {
                    $KD.style(el.viewport, 'height', '100%');

                    if($KU.scrollType() === 'native' && _.prop.viewType !== constants.TABPANE_VIEW_TYPE_PAGEVIEW) {
                        $KD.style(el.viewport, {'overflowX':'auto', 'overflowY':'auto'});
                    }
                }

                if(_.prop.viewType === constants.TABPANE_VIEW_TYPE_PAGEVIEW) {
                    _registerSwipeGesture.call(this, el.scrolee);
                }
                _handleViewReflection.call(this);
            }

            return view;
        };


        var tabpane_addTab = function TabPane$addTab(tabId, tabName, tabImage, tabContainer) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils, _ = this._kwebfw_, headtemp = null;
            if(arguments.length === 3) {
                tabContainer = tabName;
                tabName = '';
                headtemp = tabImage;
                tabImage = '';
            }

            if($KU.is(tabId, 'string') && tabId && $KU.is(tabName, 'string')
            && ($KU.is(tabImage, 'string') || $KU.is(tabImage, 'null'))
            && (($KU.is(tabContainer, 'string') && tabContainer)
            || $KU.is(tabContainer, 'widget', 'FlexContainer'))) {
                _addTab.call(this, tabId, tabName, tabImage, tabContainer, _.tabs.length, headtemp);
            } else {
                throw new Error('Invalid paramenters passed.');
            }
        };


        var tabpane_addTabAt = function TabPane$addTabAt(tabId, tabName, tabImage, tabContainer, index) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils, _ = this._kwebfw_, headtemp = null;
            if(arguments.length === 3) {
                tabContainer = tabName;
                tabName = '';
                headtemp = tabImage;
                tabImage = '';
            }

            if($KU.is(tabId, 'string') && tabId && $KU.is(tabName, 'string')
            && ($KU.is(tabImage, 'string') || $KU.is(tabImage, 'null'))
            && (($KU.is(tabContainer, 'string') && tabContainer)
            || $KU.is(tabContainer, 'widget', 'FlexContainer'))
            && $KU.is(index, 'integer') && index >= 0 && index < _.tabs.length) {
                _addTab.call(this, tabId, tabName, tabImage, tabContainer, index, headtemp);
            } else {
                throw new Error('Invalid paramenters passed.');
            }
        };


        var tabpane_removeTabAt = function TabPane$removeTabAt(index) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils, _ = this._kwebfw_;

            if($KU.is(index, 'integer') && index >= 0 && index < _.tabs.length) {
                _removeTab.call(this, index);
            } else {
                throw new Error('Invalid paramenter passed.');
            }
        };


        var tabpane_removeTabById = function TabPane$removeTabById(tabId) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils, _ = this._kwebfw_, index = -1;

            if($KU.is(tabId, 'string') && tabId
            && $KU.is(this[tabId], 'widget', 'FlexContainer')) {
                index = _getIndexByTabId.call(this, tabId);

                if(index >= 0 && index < _.tabs.length) {
                    _removeTab.call(this, index);
                }
            } else {
                throw new Error('Invalid paramenter passed.');
            }
        };


        $K.defVoltmxProp(TabPane.prototype, [
            {keey:'_flush', value:tabpane__flush},
            {keey:'_render', value:tabpane__render},
            {keey:'addTab', value:tabpane_addTab},
            {keey:'addTabAt', value:tabpane_addTabAt},
            {keey:'removeTabAt', value:tabpane_removeTabAt},
            {keey:'removeTabById', value:tabpane_removeTabById}
        ]);


        return TabPane;
    }())});
}());
